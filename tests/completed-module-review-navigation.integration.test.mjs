import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import { canAccessCourseModule } from '../src/state/coursePrerequisites.ts';

const APP_PORT = 43219;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const COURSE_SLUG = 'applying-human-rights-based-approach-in-cso-practice';
const EVENT_TYPE = 'cso-learning-hub:external-course-event';
const CONTEXT_TYPE = 'cso-learning-hub:external-course-launch-context';
const RESULT_TYPE = 'cso-learning-hub:external-course-resume-result';
const INITIAL_REVISION = '2026-08-10T14:00:00.000Z';
const LEARNER_STATE_KEY = Buffer.alloc(32, 0x41).toString('base64url');
const MODULE_1_ID = 'module_01_hrba_foundations';
const MODULE_2_ID = 'module_02_everyday_cso_work';
const MODULE_1_SCREENS = [
  'M1-PLAYER-00',
  'M1-S1-01',
  'M1-S1-02',
  'M1-S1-03',
  'M1-S1-04',
  'M1-S1-05',
  'M1-S1-06',
  'M1-S1-06A',
  'M1-S1-06B',
  'M1-PLAYER-COMPLETE',
];

test('Module 2 gating remains dependent on completed Module 1', () => {
  assert.equal(canAccessCourseModule(MODULE_2_ID, []), false);
  assert.equal(canAccessCourseModule(MODULE_2_ID, [MODULE_1_ID]), true);
  assert.equal(canAccessCourseModule('module_03_project_design', [MODULE_1_ID]), false);
});

function listen(server) {
  return new Promise((resolvePromise, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolvePromise(`http://127.0.0.1:${address.port}`);
    });
  });
}

async function waitForApp() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(APP_ORIGIN)).ok) return;
    } catch {
      // Keep waiting for Vite.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 100));
  }
  throw new Error('Timed out waiting for the completed-module review test server.');
}

function createParentServer(getOrigin, initialResumeState) {
  return createServer((_request, response) => {
    const parentOrigin = getOrigin();
    const iframeUrl = new URL('/', APP_ORIGIN);
    iframeUrl.searchParams.set('embed', 'portal');
    iframeUrl.searchParams.set('portalOrigin', parentOrigin);
    iframeUrl.searchParams.set('courseSlug', COURSE_SLUG);
    iframeUrl.searchParams.set('launchToken', 'completed-module-review-token');
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(`<!doctype html>
      <iframe
        id="course"
        title="Embedded HRBA course"
        style="display:block;width:1180px;height:720px;border:0"
        sandbox="allow-downloads allow-forms allow-popups allow-same-origin allow-scripts"
        src="${iframeUrl.toString().replaceAll('&', '&amp;')}"
      ></iframe>
      <script>
        const appOrigin = ${JSON.stringify(APP_ORIGIN)};
        const courseSlug = ${JSON.stringify(COURSE_SLUG)};
        window.progressMessages = [];
        window.ackCount = 0;
        window.serverRevision = ${JSON.stringify(INITIAL_REVISION)};
        window.initialResumeState = ${JSON.stringify(initialResumeState)};
        window.serverResumeState = ${JSON.stringify(initialResumeState)};
        window.addEventListener('message', (event) => {
          const frame = document.getElementById('course');
          if (event.origin !== appOrigin || event.source !== frame.contentWindow) return;
          if (event.data?.type !== ${JSON.stringify(EVENT_TYPE)}) return;
          if (event.data.event === 'course_ready') {
            frame.contentWindow.postMessage({
              type: ${JSON.stringify(CONTEXT_TYPE)},
              version: 1,
              courseSlug,
              learnerStateKey: ${JSON.stringify(LEARNER_STATE_KEY)},
              resumeRevision: window.serverRevision,
              resumeState: window.serverResumeState,
              trustedAssessmentState: null,
            }, appOrigin);
            return;
          }
          if (event.data.event !== 'progress_updated') return;
          window.progressMessages.push(event.data);
          window.serverRevision = new Date(
            Date.parse(${JSON.stringify(INITIAL_REVISION)}) + window.progressMessages.length * 60_000,
          ).toISOString();
          window.serverResumeState = { ...event.data.resumeState, baseRevision: window.serverRevision };
          frame.contentWindow.postMessage({
            type: ${JSON.stringify(RESULT_TYPE)},
            version: 1,
            courseSlug,
            status: 'accepted',
            resumeRevision: window.serverRevision,
            resumeState: window.serverResumeState,
          }, appOrigin);
          window.ackCount += 1;
        });
      </script>`);
  });
}

async function assertRealPointerTarget(locator) {
  await locator.scrollIntoViewIfNeeded();
  const result = await locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const hit = document.elementFromPoint(x, y);
    return {
      hit: hit === element || element.contains(hit),
      hitTag: hit?.tagName ?? null,
      hitClass: typeof hit?.className === 'string' ? hit.className : null,
    };
  });
  assert.equal(
    result.hit,
    true,
    `Expected the CTA to win pointer hit-testing, got ${result.hitTag}.${result.hitClass}`,
  );
  await locator.click();
}

async function assertShellBounds(frame, viewportLabel) {
  const bounds = await frame.locator('.course-shell').evaluate((shell) => {
    const header = shell.querySelector('.player-header');
    const content = shell.querySelector('.player-split-canvas');
    const footer = shell.querySelector('.partner-logo-strip');
    if (!header || !content || !footer) throw new Error('Shared player shell elements are missing.');
    const headerRect = header.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const headerControl = header.querySelector('button');
    return {
      headerBottom: headerRect.bottom,
      contentTop: contentRect.top,
      contentBottom: contentRect.bottom,
      footerTop: footerRect.top,
      footerInteractiveCount: footer.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ).length,
      headerPointerEvents: getComputedStyle(header).pointerEvents,
      headerControlPointerEvents: headerControl ? getComputedStyle(headerControl).pointerEvents : null,
      footerPointerEvents: getComputedStyle(footer).pointerEvents,
      logosVisible: [...footer.querySelectorAll('img')].every((logo) => {
        const rect = logo.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }),
    };
  });
  assert.ok(bounds.headerBottom <= bounds.contentTop + 1, `${viewportLabel} header must not obscure content.`);
  assert.ok(bounds.contentBottom <= bounds.footerTop + 1, `${viewportLabel} footer must not obscure content.`);
  assert.equal(bounds.footerInteractiveCount, 0, 'The partner-logo footer is intentionally non-interactive.');
  assert.equal(bounds.headerPointerEvents, 'none', `${viewportLabel} header surface must not intercept content.`);
  assert.equal(bounds.headerControlPointerEvents, 'auto', `${viewportLabel} header controls must remain clickable.`);
  assert.equal(bounds.footerPointerEvents, 'none', `${viewportLabel} partner-logo surface must not intercept content.`);
  assert.equal(bounds.logosVisible, true, `${viewportLabel} partner logos must remain visible.`);
}

async function resetCompletedFrame(page, width, height) {
  await page.evaluate(({ revision, width, height }) => {
    const frame = document.getElementById('course');
    window.progressMessages = [];
    window.ackCount = 0;
    window.serverRevision = revision;
    window.serverResumeState = structuredClone(window.initialResumeState);
    frame.style.width = `${width}px`;
    frame.style.height = `${height}px`;
    frame.src = frame.src;
  }, { revision: INITIAL_REVISION, width, height });
  const frameLocator = page.frameLocator('#course');
  const proceed = frameLocator.getByRole('button', { name: 'Proceed to Module 2', exact: true });
  await proceed.waitFor();
  await frameLocator.locator('.course-screen-loading').waitFor({ state: 'detached' });
  const frame = page.frames().find((candidate) => candidate.url().startsWith(APP_ORIGIN));
  assert.ok(frame);
  return { frame, proceed };
}

test('completed Module 1 review is non-mutating and Proceed opens canonical Module 2 start', {
  timeout: 120_000,
}, async (t) => {
  const vite = spawn(process.execPath, [
    resolve('node_modules/vite/bin/vite.js'), '--host', '127.0.0.1', '--port', String(APP_PORT), '--strictPort',
  ], { cwd: process.cwd(), env: { ...process.env, BROWSER: 'none' }, stdio: 'ignore' });
  t.after(() => vite.kill());
  await waitForApp();

  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());

  const bootstrapContext = await browser.newContext();
  const bootstrapPage = await bootstrapContext.newPage();
  await bootstrapPage.goto(APP_ORIGIN);
  const initialResumeState = await bootstrapPage.evaluate(async ({ revision, moduleId, screens }) => {
    const learning = await import('/src/state/learningState.ts');
    const resume = await import('/src/integration/resumeState.ts');
    const state = structuredClone(learning.initialLearningState);
    state.currentLayer = 'player';
    state.currentCourseId = 'hrba_course';
    state.currentModuleId = moduleId;
    state.currentScreenId = 'M1-PLAYER-COMPLETE';
    state.completedModules = [moduleId];
    state.screenProgress = { [moduleId]: screens };
    state.agreementAccepted = true;
    state.surveyNote = 'Synthetic retained review-state marker.';
    state.m1JourneyActiveStep = 4;
    state.m1JourneyVisitedSteps = [1, 2, 3, 4];
    state.module1Completion = {
      completed: true,
      completedAt: '2026-08-10T13:55:00.000Z',
    };
    return resume.serializeLearningStateForResume(state, revision);
  }, { revision: INITIAL_REVISION, moduleId: MODULE_1_ID, screens: MODULE_1_SCREENS });
  await bootstrapContext.close();

  let parentOrigin = '';
  const parentServer = createParentServer(() => parentOrigin, initialResumeState);
  parentOrigin = await listen(parentServer);
  t.after(() => new Promise((resolvePromise) => parentServer.close(resolvePromise)));

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(parentOrigin);
  let frame = page.frames().find((candidate) => candidate.url().startsWith(APP_ORIGIN));
  assert.ok(frame);

  let proceed = frame.getByRole('button', { name: 'Proceed to Module 2', exact: true });
  await proceed.waitFor();
  await assertShellBounds(frame, 'Desktop');

  const previousScreen = frame.getByRole('button', { name: 'Previous screen', exact: true });
  await previousScreen.click();
  await proceed.waitFor({ state: 'detached' });
  const desktopReset = await resetCompletedFrame(page, 1180, 720);
  frame = desktopReset.frame;
  proceed = desktopReset.proceed;

  await assertRealPointerTarget(proceed);
  await page.waitForFunction(
    ({ moduleId }) => window.progressMessages.some(
      (message) => message.currentModuleId === moduleId && message.currentScreenId === 'M2-00',
    ),
    { moduleId: MODULE_2_ID },
  );
  await frame.getByRole('heading', {
    name: 'HRBA Foundations — The Everyday Rights Lens',
    exact: true,
  }).waitFor();

  const module2Message = await page.evaluate(
    ({ moduleId }) => window.progressMessages.find(
      (message) => message.currentModuleId === moduleId && message.currentScreenId === 'M2-00',
    ),
    { moduleId: MODULE_2_ID },
  );
  assert.ok(module2Message);
  assert.deepEqual(module2Message.completedModuleIds, [MODULE_1_ID]);
  assert.equal(module2Message.progressPercent, 18);

  await frame.getByRole('button', { name: 'Back to course page', exact: true }).click();
  const reviewModule1 = frame.getByRole('button', { name: /Review Module 1:/ });
  await reviewModule1.waitFor();
  await page.waitForFunction(() => window.ackCount === window.progressMessages.length);
  const messagesBeforeReview = await page.evaluate(() => window.progressMessages.length);

  await reviewModule1.click();
  await page.waitForFunction(
    ({ before, moduleId }) => window.progressMessages.length === before + 1
      && window.progressMessages.at(-1).currentModuleId === moduleId
      && window.progressMessages.at(-1).currentScreenId === 'M1-PLAYER-00'
      && window.ackCount === window.progressMessages.length,
    { before: messagesBeforeReview, moduleId: MODULE_1_ID },
  );
  await page.waitForTimeout(500);

  const reviewResult = await page.evaluate(() => ({
    messageCount: window.progressMessages.length,
    latest: window.progressMessages.at(-1),
  }));
  assert.equal(reviewResult.messageCount, messagesBeforeReview + 1);
  assert.deepEqual(reviewResult.latest.completedModuleIds, [MODULE_1_ID]);
  assert.equal(reviewResult.latest.progressPercent, 18);
  assert.deepEqual(
    reviewResult.latest.resumeState.completedScreenIdsByModule[MODULE_1_ID],
    initialResumeState.completedScreenIdsByModule[MODULE_1_ID],
  );
  assert.deepEqual(
    reviewResult.latest.resumeState.moduleState.module1.data,
    initialResumeState.moduleState.module1.data,
  );

  const mobile = await resetCompletedFrame(page, 390, 720);
  await assertShellBounds(mobile.frame, 'Mobile');
  await assertRealPointerTarget(mobile.proceed);
  await page.waitForFunction(
    ({ moduleId }) => window.progressMessages.some(
      (message) => message.currentModuleId === moduleId && message.currentScreenId === 'M2-00',
    ),
    { moduleId: MODULE_2_ID },
  );
});
