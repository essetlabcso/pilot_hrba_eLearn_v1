import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43173;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const COURSE_SLUG = 'applying-human-rights-based-approach-in-cso-practice';
const EVENT_TYPE = 'cso-learning-hub:external-course-event';
const CONTEXT_TYPE = 'cso-learning-hub:external-course-launch-context';
const STANDALONE_STORAGE_KEY = 'hrba-course-progress-v1';
const PORTAL_STORAGE_PREFIX = 'hrba-course-progress-v1:portal:sha256:';
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
const STATE_KEYS = {
  a: Buffer.alloc(32, 0x11).toString('base64url'),
  b: Buffer.alloc(32, 0x22).toString('base64url'),
  c: Buffer.alloc(32, 0x33).toString('base64url'),
  d: Buffer.alloc(32, 0x44).toString('base64url'),
};
const APPROVED_ROUTE_KEYS = ['courseSlug', 'embed', 'launchToken', 'portalOrigin'];
const PROHIBITED_KEYS = [
  'userId',
  'learnerId',
  'participantId',
  'enrollmentId',
  'organizationId',
  'orgId',
  'courseVersionId',
];
const EVIDENCE_PATTERN =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|[A-Za-z0-9_-]{42}[AEIMQUYcgkosw048])$/i;

function portalStorageKey(learnerStateKey) {
  return `${PORTAL_STORAGE_PREFIX}${createHash('sha256').update(learnerStateKey).digest('hex')}`;
}

function minimalState({
  completedModules = [],
  finalAssessmentResult = null,
  currentLayer = 'platform',
  currentModuleId = null,
  currentScreenId = null,
} = {}) {
  return {
    storageVersion: STANDALONE_STORAGE_KEY,
    completedModules,
    currentLayer,
    currentModuleId,
    currentScreenId,
    finalAssessmentAnswers: {},
    finalAssessmentAttemptNumber: finalAssessmentResult?.attemptNumber || 0,
    finalAssessmentResult,
    screenProgress: finalAssessmentResult
      ? { final_assessment: ['FINAL-ASSESSMENT-COMPLETE'] }
      : {},
  };
}

function assertNoProhibitedIdentifiers(value) {
  const serialized = JSON.stringify(value);
  const normalized = serialized.toLowerCase();
  for (const key of PROHIBITED_KEYS) {
    assert.equal(
      normalized.includes(key.toLowerCase()),
      false,
      `Unexpected prohibited Hub key: ${key}`,
    );
  }
  assert.equal(serialized.includes('raw-learner-must-not-propagate'), false);
  assert.equal(serialized.includes('raw-enrollment-must-not-propagate'), false);
  assert.equal(serialized.includes('raw-organization-must-not-propagate'), false);
  assert.equal(serialized.includes('raw-version-must-not-propagate'), false);
  for (const detailedField of [
    'canvas',
    'complaint',
    'finalassessmentanswers',
    'portfolio',
    'practicecheckstate',
    'reflection',
  ]) {
    assert.equal(normalized.includes(detailedField), false);
  }
}

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

function buildCourseUrl(parentOrigin, mode) {
  const url = new URL('/', APP_ORIGIN);
  url.searchParams.set('embed', 'portal');
  url.searchParams.set(
    'portalOrigin',
    mode === 'wrong-origin' ? 'https://unapproved.example.org' : parentOrigin,
  );
  url.searchParams.set('courseSlug', COURSE_SLUG);
  url.searchParams.set('launchToken', `launch-${mode}-opaque`);
  url.searchParams.set('learnerId', 'raw-learner-must-not-propagate');
  url.searchParams.set('enrollmentId', 'raw-enrollment-must-not-propagate');
  url.searchParams.set('organizationId', 'raw-organization-must-not-propagate');
  url.searchParams.set('courseVersionId', 'raw-version-must-not-propagate');
  return url.toString();
}

function keyForMode(mode) {
  if (mode === 'learner-b') return STATE_KEYS.b;
  if (mode === 'replacement') return STATE_KEYS.c;
  if (mode === 'malformed-evidence') return STATE_KEYS.d;
  return STATE_KEYS.a;
}

function createParentServer(getOrigin) {
  return createServer((request, response) => {
    const mode = new URL(request.url || '/', 'http://parent.invalid').pathname.slice(1) || 'learner-a';
    if (mode === 'signed-out') {
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end('<!doctype html><title>Signed out</title><h1>Signed out of the Learning Hub</h1>');
      return;
    }

    const parentOrigin = getOrigin();
    const iframeUrl = buildCourseUrl(parentOrigin, mode);
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    });
    response.end(`<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>HRBA learner-isolation parent</title>
          <style>
            html, body { height: 100%; margin: 0; }
            body { display: grid; grid-template-rows: auto 1fr; }
            iframe { width: 100%; height: 100%; border: 0; }
          </style>
        </head>
        <body>
          <strong id="parent-marker">Learning Hub parent: ${mode}</strong>
          <iframe id="course-frame" title="Embedded HRBA course" src="${iframeUrl.replaceAll('&', '&amp;')}"></iframe>
          <script>
            const mode = ${JSON.stringify(mode)};
            const appOrigin = ${JSON.stringify(APP_ORIGIN)};
            const courseSlug = ${JSON.stringify(COURSE_SLUG)};
            const stateKeys = ${JSON.stringify(STATE_KEYS)};
            window.receivedMessages = [];
            window.addEventListener('message', (event) => {
              window.receivedMessages.push({ origin: event.origin, data: event.data });
              if (
                event.origin !== appOrigin ||
                event.data?.type !== ${JSON.stringify(EVENT_TYPE)} ||
                event.data?.event !== 'course_ready' ||
                mode === 'missing' ||
                mode === 'wrong-origin'
              ) {
                return;
              }

              const learnerStateKey = mode === 'learner-b'
                ? stateKeys.b
                : mode === 'replacement'
                  ? stateKeys.c
                  : mode === 'malformed-evidence'
                    ? stateKeys.d
                    : mode === 'malformed-context'
                      ? stateKeys.a + '='
                      : stateKeys.a;
              const frame = document.getElementById('course-frame');
              frame.contentWindow.postMessage({
                type: ${JSON.stringify(CONTEXT_TYPE)},
                version: 1,
                courseSlug,
                learnerStateKey,
              }, appOrigin);

              if (mode === 'mismatch') {
                setTimeout(() => frame.contentWindow.postMessage({
                  type: ${JSON.stringify(CONTEXT_TYPE)},
                  version: 1,
                  courseSlug,
                  learnerStateKey: stateKeys.b,
                }, appOrigin), 50);
              }
            });
          </script>
        </body>
      </html>`);
  });
}

async function getCourseFrame(page) {
  await page.locator('#course-frame').waitFor({ state: 'attached' });
  const existingFrame = page.frames().find((candidate) => candidate.url().startsWith(APP_ORIGIN));
  return existingFrame || page.waitForEvent('framenavigated', {
    predicate: (candidate) => candidate.url().startsWith(APP_ORIGIN),
    timeout: 10_000,
  });
}

async function reloadFrame(frame) {
  await Promise.all([
    frame.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    frame.evaluate(() => window.location.reload()),
  ]);
}

async function clearParentMessages(page) {
  await page.evaluate(() => {
    window.receivedMessages = [];
  });
}

async function getParentMessages(page) {
  return page.evaluate(() => window.receivedMessages);
}

async function waitForEvent(page, eventName, learnerStateKey) {
  await page.waitForFunction(
    ({ eventName: expectedEvent, learnerStateKey: expectedKey }) => (
      window.receivedMessages.some(({ data }) => (
        data?.type === 'cso-learning-hub:external-course-event'
        && data.event === expectedEvent
        && data.learnerStateKey === expectedKey
      ))
    ),
    { eventName, learnerStateKey },
  );
}

test('HRBA isolates portal state and evidence across learners in one browser profile', {
  timeout: 120_000,
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

  let parentOrigin = '';
  const parentServer = createParentServer(() => parentOrigin);
  parentOrigin = await listen(parentServer);
  t.after(() => closeServer(parentServer));

  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  t.after(() => context.close());
  await context.route('https://fonts.googleapis.com/**', (route) => route.fulfill({
    contentType: 'text/css',
    body: '',
  }));
  await context.addInitScript(({ appOrigin, standaloneKey, standaloneState }) => {
    if (window.location.origin === appOrigin) {
      localStorage.setItem(standaloneKey, JSON.stringify(standaloneState));
      localStorage.setItem('hrba_course_learning_state', JSON.stringify(standaloneState));
    }
  }, {
    appOrigin: APP_ORIGIN,
    standaloneKey: STANDALONE_STORAGE_KEY,
    standaloneState: minimalState({
      completedModules: [...REQUIRED_MODULES, 'final_assessment'],
      finalAssessmentResult: {
        attemptNumber: 99,
        evidenceId: '550e8400-e29b-41d4-a716-446655440000',
        maxScore: 10,
        passed: true,
        percentage: 100,
        score: 10,
        submittedAt: '2026-07-23T10:00:00.000Z',
      },
    }),
  });

  const page = await context.newPage();
  const browserErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      browserErrors.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on('pageerror', (error) => browserErrors.push(`pageerror: ${error.message}`));

  await t.test('Learner A completes and retains one immutable assessment evidence record', async () => {
    await page.goto(`${parentOrigin}/learner-a`);
    let frame = await getCourseFrame(page);
    await waitForEvent(page, 'progress_updated', STATE_KEYS.a);
    let messages = await getParentMessages(page);
    const firstProgress = messages.find(({ data }) => data?.event === 'progress_updated');
    assert.equal(firstProgress.data.progressPercent, 0);
    assert.deepEqual(firstProgress.data.completedModuleIds, []);
    assert.equal(new URL(frame.url()).searchParams.has('learnerId'), false);

    const storageKeyA = portalStorageKey(STATE_KEYS.a);
    await frame.evaluate(({ storageKey, state }) => {
      localStorage.setItem(storageKey, JSON.stringify(state));
    }, {
      storageKey: storageKeyA,
      state: minimalState({ completedModules: REQUIRED_MODULES }),
    });
    await reloadFrame(frame);

    const launchAssessment = frame.getByRole('button', {
      name: 'Start Final Assessment: Final Assessment',
      exact: true,
    });
    await launchAssessment.waitFor({ state: 'visible' });
    await launchAssessment.click();
    await frame.waitForURL(`${APP_ORIGIN}/final-assessment/cover?**`);
    assert.equal(await frame.locator('.course-screen-loading').count(), 0);

    await frame.getByRole('button', { name: 'Start assessment', exact: true }).click();
    await frame.waitForURL(`${APP_ORIGIN}/final-assessment/questions?**`);
    const questionsUrl = new URL(frame.url());
    assert.deepEqual([...questionsUrl.searchParams.keys()].sort(), APPROVED_ROUTE_KEYS);
    assert.equal(questionsUrl.toString().includes(STATE_KEYS.a), false);
    assertNoProhibitedIdentifiers(questionsUrl.toString());

    await reloadFrame(frame);
    await frame.locator('.final-assessment-status').waitFor({ state: 'visible' });
    await waitForEvent(page, 'progress_updated', STATE_KEYS.a);

    await clearParentMessages(page);
    for (const radioId of CORRECT_RADIO_IDS) {
      await frame.locator(`#${radioId}`).check();
    }
    await frame.getByRole('button', { name: 'Submit final assessment', exact: true }).click();
    await frame.locator('.final-assessment-score').waitFor({ state: 'visible' });
    await waitForEvent(page, 'assessment_completed', STATE_KEYS.a);
    await waitForEvent(page, 'course_completed', STATE_KEYS.a);

    messages = await getParentMessages(page);
    const assessmentMessage = messages.find(({ data }) => data?.event === 'assessment_completed');
    const completionMessage = messages.find(({ data }) => data?.event === 'course_completed');
    assert.ok(assessmentMessage);
    assert.ok(completionMessage);
    assert.equal(assessmentMessage.origin, APP_ORIGIN);
    assert.equal(completionMessage.origin, APP_ORIGIN);
    assert.equal(assessmentMessage.data.courseSlug, COURSE_SLUG);
    assert.equal(assessmentMessage.data.progressPercent, 100);
    assert.equal(completionMessage.data.progressPercent, 100);
    assert.equal(assessmentMessage.data.learnerStateKey, STATE_KEYS.a);
    assert.equal(completionMessage.data.learnerStateKey, STATE_KEYS.a);
    assert.match(assessmentMessage.data.assessment.evidenceId, EVIDENCE_PATTERN);
    assert.equal(
      assessmentMessage.data.assessment.evidenceId,
      completionMessage.data.assessment.evidenceId,
    );
    assert.equal(
      assessmentMessage.data.assessment.submittedAt,
      completionMessage.data.assessment.submittedAt,
    );
    assert.equal('launchToken' in assessmentMessage.data, false);
    assertNoProhibitedIdentifiers(assessmentMessage);
    assertNoProhibitedIdentifiers(completionMessage);

    const immutableEvidence = structuredClone(assessmentMessage.data.assessment);
    await clearParentMessages(page);
    await reloadFrame(frame);
    await frame.locator('.final-assessment-score').waitFor({ state: 'visible' });
    await waitForEvent(page, 'assessment_completed', STATE_KEYS.a);
    const resend = (await getParentMessages(page))
      .find(({ data }) => data?.event === 'assessment_completed');
    assert.deepEqual(resend.data.assessment, immutableEvidence);

    const storageKeys = await frame.evaluate(() => Object.keys(localStorage).sort());
    assert.equal(storageKeys.includes(storageKeyA), true);
    assert.equal(storageKeys.includes(STANDALONE_STORAGE_KEY), true);
    assert.equal(storageKeys.some((key) => key.includes(STATE_KEYS.a)), false);
    assert.equal(storageKeys.filter((key) => key.startsWith(PORTAL_STORAGE_PREFIX)).length, 1);

    await page.goto(`${parentOrigin}/signed-out`);
    await page.getByRole('heading', { name: 'Signed out of the Learning Hub' }).waitFor();
    frame = null;

    await page.goto(`${parentOrigin}/learner-b`);
    const frameB = await getCourseFrame(page);
    await waitForEvent(page, 'progress_updated', STATE_KEYS.b);
    const learnerBMessages = await getParentMessages(page);
    const learnerBProgress = learnerBMessages.find(
      ({ data }) => data?.event === 'progress_updated' && data.learnerStateKey === STATE_KEYS.b,
    );
    assert.equal(learnerBProgress.data.progressPercent, 0);
    assert.deepEqual(learnerBProgress.data.completedModuleIds, []);
    assert.equal(
      await frameB.getByRole('button', {
        name: 'Complete Module 5 to unlock: Final Assessment',
        exact: true,
      }).count(),
      1,
    );
    assert.equal(await frameB.locator('.final-assessment-score').count(), 0);
    assert.equal(
      JSON.stringify(learnerBMessages).includes(immutableEvidence.evidenceId),
      false,
    );
    assert.equal(
      learnerBMessages.some(({ data }) => (
        data?.learnerStateKey === STATE_KEYS.b
        && data?.assessment?.evidenceId === immutableEvidence.evidenceId
      )),
      false,
    );

    const storageKeysB = await frameB.evaluate(() => Object.keys(localStorage).sort());
    assert.equal(storageKeysB.includes(storageKeyA), true);
    assert.equal(storageKeysB.includes(portalStorageKey(STATE_KEYS.b)), true);
    assert.equal(
      storageKeysB.filter((key) => key.startsWith(PORTAL_STORAGE_PREFIX)).length,
      2,
    );

    await page.goto(`${parentOrigin}/learner-a`);
    const restoredA = await getCourseFrame(page);
    await restoredA.locator('.final-assessment-score').waitFor({ state: 'visible' });
    assert.equal(await restoredA.locator('.final-assessment-score').innerText(), '100%\n10 of 10');
    await waitForEvent(page, 'assessment_completed', STATE_KEYS.a);
    const laterLaunchEvidence = (await getParentMessages(page))
      .find(({ data }) => data?.event === 'assessment_completed' && data.learnerStateKey === STATE_KEYS.a)
      .data.assessment;
    assert.deepEqual(laterLaunchEvidence, immutableEvidence);

    await page.goto(`${parentOrigin}/replacement`);
    const replacementFrame = await getCourseFrame(page);
    await waitForEvent(page, 'progress_updated', STATE_KEYS.c);
    const replacementProgress = (await getParentMessages(page)).find(
      ({ data }) => data?.event === 'progress_updated' && data.learnerStateKey === STATE_KEYS.c,
    );
    assert.equal(replacementProgress.data.progressPercent, 0);
    assert.deepEqual(replacementProgress.data.completedModuleIds, []);
    assert.equal(await replacementFrame.locator('.final-assessment-score').count(), 0);
    assert.equal(
      JSON.stringify(await getParentMessages(page)).includes(immutableEvidence.evidenceId),
      false,
    );
  });

  await t.test('missing, malformed, mismatched and wrong-origin contexts fail closed', async () => {
    await page.goto(`${parentOrigin}/missing`);
    const missingFrame = await getCourseFrame(page);
    await missingFrame.getByRole('heading', { name: 'Return to the Learning Hub' }).waitFor({
      state: 'visible',
      timeout: 10_000,
    });
    let messages = await getParentMessages(page);
    assert.equal(messages.some(({ data }) => data?.event === 'progress_updated'), false);

    await page.goto(`${parentOrigin}/malformed-context`);
    const malformedFrame = await getCourseFrame(page);
    await malformedFrame.getByRole('heading', { name: 'Return to the Learning Hub' }).waitFor({
      state: 'visible',
      timeout: 10_000,
    });
    messages = await getParentMessages(page);
    assert.equal(messages.some(({ data }) => data?.event === 'progress_updated'), false);

    await page.goto(`${parentOrigin}/mismatch`);
    await getCourseFrame(page);
    await waitForEvent(page, 'assessment_completed', STATE_KEYS.a);
    messages = await getParentMessages(page);
    const progressBearing = messages.filter(({ data }) => (
      ['progress_updated', 'assessment_completed', 'course_completed'].includes(data?.event)
    ));
    assert.ok(progressBearing.length > 0);
    assert.equal(progressBearing.every(({ data }) => data.learnerStateKey === STATE_KEYS.a), true);
    assert.equal(progressBearing.some(({ data }) => data.learnerStateKey === STATE_KEYS.b), false);

    await page.goto(`${parentOrigin}/wrong-origin`);
    const wrongOriginFrame = await getCourseFrame(page);
    await wrongOriginFrame.getByRole('heading', { name: 'Return to the Learning Hub' }).waitFor();
    messages = await getParentMessages(page);
    assert.deepEqual(messages, []);
    assert.equal(new URL(wrongOriginFrame.url()).search, '?embed=portal');
  });

  await t.test('malformed evidence is cleared and never emitted', async () => {
    await page.goto(`${parentOrigin}/malformed-evidence`);
    const frame = await getCourseFrame(page);
    const storageKey = portalStorageKey(STATE_KEYS.d);
    await frame.evaluate(({ storageKey: key, state }) => {
      localStorage.setItem(key, JSON.stringify(state));
    }, {
      storageKey,
      state: minimalState({
        completedModules: [...REQUIRED_MODULES, 'final_assessment'],
        currentLayer: 'player',
        currentModuleId: 'final_assessment',
        currentScreenId: 'FINAL-ASSESSMENT-COMPLETE',
        finalAssessmentResult: {
          attemptNumber: 1,
          evidenceId: `${STATE_KEYS.d}=`,
          maxScore: 10,
          passed: true,
          percentage: 100,
          score: 10,
          submittedAt: '2026-07-23T12:00:00.000Z',
        },
      }),
    });
    await clearParentMessages(page);
    await reloadFrame(frame);
    await waitForEvent(page, 'progress_updated', STATE_KEYS.d);
    const messages = await getParentMessages(page);
    assert.equal(messages.some(({ data }) => data?.assessment), false);
    assert.equal(messages.some(({ data }) => data?.event === 'course_completed'), false);
    assert.equal(JSON.stringify(messages).includes(`${STATE_KEYS.d}=`), false);
    assert.equal(await frame.locator('.final-assessment-score').count(), 0);
  });

  await t.test('standalone mode remains separate and mobile-safe', async () => {
    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await mobile.route('https://fonts.googleapis.com/**', (route) => route.fulfill({
      contentType: 'text/css',
      body: '',
    }));
    const standalonePage = await mobile.newPage();
    const standaloneErrors = [];
    standalonePage.on('console', (message) => {
      if (message.type() === 'error' || message.type() === 'warning') {
        standaloneErrors.push(`${message.type()}: ${message.text()}`);
      }
    });
    standalonePage.on('pageerror', (error) => standaloneErrors.push(`pageerror: ${error.message}`));
    const completedQuery = encodeURIComponent(REQUIRED_MODULES.join(','));
    await standalonePage.goto(`${APP_ORIGIN}/final-assessment?completed=${completedQuery}`);
    const start = standalonePage.getByRole('button', { name: 'Start assessment', exact: true });
    await start.waitFor({ state: 'visible' });
    assert.equal(await standalonePage.getByText(
      'Your course progress is being shared with the CSO Learning Hub. Certificates are issued and verified from the Hub after a passing final assessment result is received.',
      { exact: true },
    ).count(), 0);
    await start.click();
    await standalonePage.waitForURL(`${APP_ORIGIN}/final-assessment/questions`);
    await standalonePage.reload();
    await standalonePage.locator('.final-assessment-status').waitFor({ state: 'visible' });
    const dimensions = await standalonePage.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    assert.equal(dimensions.clientWidth, 390);
    assert.equal(dimensions.scrollWidth, 390);
    assert.deepEqual(standaloneErrors, []);
    await mobile.close();
  });

  assert.deepEqual(browserErrors, []);
});
