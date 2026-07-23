import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43173;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const REQUIRED_MODULES = [
  'module_01_hrba_foundations',
  'module_02_everyday_cso_work',
  'module_03_project_design',
  'module_04_implementation',
  'module_05_hrba_meal',
];
const CORRECT_RADIO_IDS = [
  'q1_hrba_shift-a',
  'q2_actor_roles-a',
  'q3_participation-b',
  'q4_inclusion-c',
  'q5_accountability-b',
  'q6_power_barriers-c',
  'q7_safe_evidence-b',
  'q8_design_repair-c',
  'q9_adaptation-c',
  'q10_meal_reporting-b',
];
const APPROVED_ROUTE_KEYS = [
  'courseSlug',
  'embed',
  'launchToken',
  'portalOrigin',
];
const RAW_HUB_KEYS = [
  'learnerId',
  'enrollmentId',
  'organizationId',
  'courseVersionId',
];

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve(`http://127.0.0.1:${address.port}`);
    });
  });
}

function closeServer(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
}

async function waitForApp() {
  const deadline = Date.now() + 30_000;
  let lastError;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(APP_ORIGIN);
      if (response.ok) return;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw lastError || new Error('Timed out waiting for the HRBA test server.');
}

function buildCourseUrl(parentOrigin, {
  completed = true,
  claimedPortalOrigin = parentOrigin,
  path = '/final-assessment',
} = {}) {
  const url = new URL(path, APP_ORIGIN);
  if (completed) {
    url.searchParams.set('completed', REQUIRED_MODULES.join(','));
  }
  url.searchParams.set('embed', 'portal');
  url.searchParams.set('portalOrigin', claimedPortalOrigin);
  url.searchParams.set('courseSlug', 'hrba-approved-opaque');
  url.searchParams.set('launchToken', 'launch-approved-opaque');
  url.searchParams.set('learnerId', 'raw-learner-must-not-propagate');
  url.searchParams.set('enrollmentId', 'raw-enrollment-must-not-propagate');
  url.searchParams.set('organizationId', 'raw-organization-must-not-propagate');
  url.searchParams.set('courseVersionId', 'raw-version-must-not-propagate');
  return url.toString();
}

function createParentServer(getIframeUrl) {
  return createServer((request, response) => {
    if (request.url !== '/') {
      response.writeHead(404).end();
      return;
    }

    const iframeUrl = getIframeUrl();
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    });
    response.end(`<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>HRBA portal integration parent</title>
          <style>
            html, body { height: 100%; margin: 0; }
            body { display: grid; grid-template-rows: auto 1fr; }
            iframe { width: 100%; height: 100%; border: 0; }
          </style>
        </head>
        <body>
          <strong id="parent-marker">Approved parent remains mounted</strong>
          <iframe id="course-frame" title="Embedded HRBA course" src="${iframeUrl.replaceAll('&', '&amp;')}"></iframe>
          <script>
            window.receivedMessages = [];
            window.addEventListener('message', (event) => {
              window.receivedMessages.push({ origin: event.origin, data: event.data });
            });
          </script>
        </body>
      </html>`);
  });
}

async function getCourseFrame(page) {
  await page.locator('#course-frame').waitFor({ state: 'attached' });
  const existingFrame = page.frames().find((candidate) => candidate.url().startsWith(APP_ORIGIN));
  const frame = existingFrame || await page.waitForEvent('framenavigated', {
    predicate: (candidate) => candidate.url().startsWith(APP_ORIGIN),
    timeout: 10_000,
  });
  assert.ok(frame, 'Expected the cross-origin HRBA iframe to be attached.');
  return frame;
}

function assertNoRawHubIdentifiers(value) {
  const serialized = JSON.stringify(value);
  for (const key of RAW_HUB_KEYS) {
    assert.equal(serialized.includes(key), false, `Unexpected raw Hub key: ${key}`);
  }
  assert.equal(serialized.includes('raw-learner-must-not-propagate'), false);
  assert.equal(serialized.includes('raw-enrollment-must-not-propagate'), false);
  assert.equal(serialized.includes('raw-organization-must-not-propagate'), false);
  assert.equal(serialized.includes('raw-version-must-not-propagate'), false);
}

test('Final Assessment preserves validated portal context through iframe refresh and completion', {
  timeout: 90_000,
}, async (t) => {
  const vite = spawn(
    process.execPath,
    [
      resolve('node_modules/vite/bin/vite.js'),
      '--host',
      '127.0.0.1',
      '--port',
      String(APP_PORT),
      '--strictPort',
    ],
    { cwd: process.cwd(), env: { ...process.env, BROWSER: 'none' }, stdio: 'ignore' },
  );
  t.after(() => vite.kill());
  await waitForApp();

  let approvedOrigin = '';
  let unapprovedOrigin = '';
  const approvedParent = createParentServer(() => buildCourseUrl(approvedOrigin, { path: '/' }));
  approvedOrigin = await listen(approvedParent);
  t.after(() => closeServer(approvedParent));

  const unapprovedParent = createParentServer(() => buildCourseUrl(
    unapprovedOrigin,
    { claimedPortalOrigin: approvedOrigin },
  ));
  unapprovedOrigin = await listen(unapprovedParent);
  t.after(() => closeServer(unapprovedParent));

  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());

  await t.test('cross-origin assessment refresh keeps exact-origin Hub reporting', async () => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const browserErrors = [];
    page.on('console', (message) => {
      if (message.type() === 'error' || message.type() === 'warning') {
        browserErrors.push(`${message.type()}: ${message.text()}`);
      }
    });
    page.on('pageerror', (error) => browserErrors.push(`pageerror: ${error.message}`));
    await page.goto(approvedOrigin);
    const frame = await getCourseFrame(page);

    const launchAssessment = frame.getByRole('button', {
      name: 'Start Final Assessment: Final Assessment',
      exact: true,
    });
    await launchAssessment.waitFor({ state: 'visible' });
    await launchAssessment.click();
    await frame.waitForURL(`${APP_ORIGIN}/final-assessment/cover?**`);

    const startButton = frame.getByRole('button', { name: 'Start assessment', exact: true });
    await startButton.waitFor({ state: 'visible' });
    assert.equal(await frame.locator('.course-screen-loading').count(), 0);
    await startButton.click();
    await frame.waitForURL(`${APP_ORIGIN}/final-assessment/questions?**`);

    const questionsUrl = new URL(frame.url());
    assert.equal(questionsUrl.pathname, '/final-assessment/questions');
    assert.deepEqual([...questionsUrl.searchParams.keys()].sort(), APPROVED_ROUTE_KEYS);
    assert.equal(questionsUrl.searchParams.get('portalOrigin'), approvedOrigin);
    assertNoRawHubIdentifiers(questionsUrl.toString());
    assert.equal(await frame.locator('.course-screen-loading').count(), 0);

    await Promise.all([
      frame.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      frame.evaluate(() => window.location.reload()),
    ]);
    await frame.locator('.final-assessment-status').waitFor({ state: 'visible' });
    const refreshedReferrer = await frame.evaluate(() => document.referrer);
    assert.equal(new URL(refreshedReferrer).origin, APP_ORIGIN);
    assert.equal(
      await frame.getByText(
        'Your course progress is being shared with the CSO Learning Hub. Certificates are issued and verified from the Hub after a passing final assessment result is received.',
        { exact: true },
      ).count(),
      1,
    );

    await page.waitForFunction(() => window.receivedMessages.some(
      ({ data }) => data?.type === 'cso-learning-hub:external-course-progress'
        && data.currentScreenId === 'FINAL-ASSESSMENT-QUESTIONS',
    ));

    for (const radioId of CORRECT_RADIO_IDS) {
      await frame.locator(`#${radioId}`).check();
    }
    await frame.getByRole('button', { name: 'Submit final assessment', exact: true }).click();
    await frame.locator('.final-assessment-score').waitFor({ state: 'visible' });

    await page.waitForFunction(() => window.receivedMessages.some(
      ({ data }) => data?.type === 'cso-learning-hub:external-course-progress'
        && data.completed === true
        && data.assessment?.passed === true,
    ));
    const messages = await page.evaluate(() => window.receivedMessages);
    const completionMessage = messages.find(
      ({ data }) => data?.completed === true && data.assessment?.passed === true,
    );

    assert.ok(completionMessage);
    assert.equal(completionMessage.origin, APP_ORIGIN);
    assert.equal(completionMessage.data.progressPercent, 100);
    assert.equal(completionMessage.data.currentModuleId, 'final_assessment');
    assert.equal(completionMessage.data.currentScreenId, 'FINAL-ASSESSMENT-COMPLETE');
    assert.equal(completionMessage.data.courseSlug, 'hrba-approved-opaque');
    assert.equal(completionMessage.data.launchToken, 'launch-approved-opaque');
    assertNoRawHubIdentifiers(completionMessage);
    assert.equal(new URL(frame.url()).searchParams.get('portalOrigin'), approvedOrigin);

    await Promise.all([
      frame.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      frame.evaluate(() => window.location.reload()),
    ]);
    await frame.locator('.final-assessment-score').waitFor({ state: 'visible' });
    assert.equal(await frame.locator('.final-assessment-score').innerText(), '100%\n10 of 10');
    assert.equal(
      await frame.getByText(
        'Your course progress is being shared with the CSO Learning Hub. Certificates are issued and verified from the Hub after a passing final assessment result is received.',
        { exact: true },
      ).count(),
      1,
    );

    await frame.getByRole('button', { name: 'Return to course page', exact: true }).click();
    await frame.getByRole('heading', {
      name: 'Applying the Human Rights-Based Approach in CSO Practice',
      exact: true,
    }).waitFor({ state: 'visible' });
    const returnUrl = new URL(frame.url());
    assert.equal(returnUrl.pathname, '/');
    assert.deepEqual([...returnUrl.searchParams.keys()].sort(), APPROVED_ROUTE_KEYS);
    assert.equal(returnUrl.searchParams.get('portalOrigin'), approvedOrigin);
    assertNoRawHubIdentifiers(returnUrl.toString());
    assert.deepEqual(browserErrors, []);

    await context.close();
  });

  await t.test('origin-mismatched iframe launch fails closed and sends no parent message', async () => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(unapprovedOrigin);
    const frame = await getCourseFrame(page);
    await frame.getByRole('button', { name: 'Start assessment', exact: true }).waitFor({ state: 'visible' });
    assert.equal(await frame.getByText(
      'Your course progress is being shared with the CSO Learning Hub. Certificates are issued and verified from the Hub after a passing final assessment result is received.',
      { exact: true },
    ).count(), 0);
    await page.waitForTimeout(300);
    assert.deepEqual(await page.evaluate(() => window.receivedMessages), []);
    await context.close();
  });

  await t.test('top-level and incomplete direct routes remain fail-closed', async () => {
    const completedContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const completedPage = await completedContext.newPage();
    await completedPage.goto(buildCourseUrl(approvedOrigin));
    const topLevelStart = completedPage.getByRole('button', { name: 'Start assessment', exact: true });
    await topLevelStart.waitFor({ state: 'visible' });
    assert.equal(await completedPage.getByText(
      'Your course progress is being shared with the CSO Learning Hub. Certificates are issued and verified from the Hub after a passing final assessment result is received.',
      { exact: true },
    ).count(), 0);
    assert.equal(await completedPage.locator('.course-screen-loading').count(), 0);
    await topLevelStart.click();
    await completedPage.waitForURL(`${APP_ORIGIN}/final-assessment/questions`);
    await completedPage.reload();
    await completedPage.locator('.final-assessment-status').waitFor({ state: 'visible' });
    assert.equal(await completedPage.locator('.course-screen-loading').count(), 0);
    await completedContext.close();

    const incompleteContext = await browser.newContext();
    const incompletePage = await incompleteContext.newPage();
    await incompletePage.goto(buildCourseUrl(approvedOrigin, {
      completed: false,
      path: '/final-assessment/questions',
    }));
    await incompletePage.getByRole('button', {
      name: 'Complete Module 5 to unlock: Final Assessment',
      exact: true,
    }).waitFor({ state: 'visible' });
    assert.equal(new URL(incompletePage.url()).pathname, '/');
    assert.equal(new URL(incompletePage.url()).search, '');
    await incompleteContext.close();
  });
});
