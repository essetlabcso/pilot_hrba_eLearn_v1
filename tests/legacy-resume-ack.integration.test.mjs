import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43197;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const COURSE_SLUG = 'applying-human-rights-based-approach-in-cso-practice';
const EVENT_TYPE = 'cso-learning-hub:external-course-event';
const CONTEXT_TYPE = 'cso-learning-hub:external-course-launch-context';
const RESULT_TYPE = 'cso-learning-hub:external-course-resume-result';
const STATE_KEY = Buffer.alloc(32, 0x71).toString('base64url');
const STORAGE_KEY = `hrba-course-progress-v1:portal:sha256:${createHash('sha256').update(STATE_KEY).digest('hex')}`;

const legacyState = {
  storageVersion: 'hrba-course-progress-v1',
  currentModuleId: 'module_04_implementation',
  currentScreenId: 'M4-S1-04',
  completedModules: [
    'module_01_hrba_foundations',
    'module_02_everyday_cso_work',
    'module_03_project_design',
  ],
  screenProgress: {
    module_04_implementation: ['M4-PLAYER-00', 'M4-S1-01', 'M4-S1-02', 'M4-S1-03'],
  },
  practiceCheckState: {
    module4ImplementationNote: { note: 'Historical implementation reflection.' },
  },
  activeModal: 'help',
  finalAssessmentResult: { passed: true, attemptNumber: 55 },
};

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
  throw new Error('Timed out waiting for the legacy ACK test server.');
}

function createParentServer(getOrigin) {
  return createServer((request, response) => {
    const mode = new URL(request.url || '/', 'http://parent.invalid').pathname.slice(1) || 'ack';
    const parentOrigin = getOrigin();
    const iframeUrl = new URL('/', APP_ORIGIN);
    iframeUrl.searchParams.set('embed', 'portal');
    iframeUrl.searchParams.set('portalOrigin', parentOrigin);
    iframeUrl.searchParams.set('courseSlug', COURSE_SLUG);
    iframeUrl.searchParams.set('launchToken', `launch-${mode}-opaque`);
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(`<!doctype html><iframe id="course" src="${iframeUrl.toString().replaceAll('&', '&amp;')}"></iframe>
      <script>
        const mode = ${JSON.stringify(mode)};
        const appOrigin = ${JSON.stringify(APP_ORIGIN)};
        const courseSlug = ${JSON.stringify(COURSE_SLUG)};
        const stateKey = ${JSON.stringify(STATE_KEY)};
        window.messages = [];
        window.addEventListener('message', (event) => {
          if (event.origin !== appOrigin) return;
          window.messages.push(event.data);
          if (event.data?.type === ${JSON.stringify(EVENT_TYPE)} && event.data?.event === 'course_ready') {
            document.getElementById('course').contentWindow.postMessage({
              type: ${JSON.stringify(CONTEXT_TYPE)}, version: 1, courseSlug,
              learnerStateKey: stateKey,
              resumeRevision: '2026-08-10T10:00:00.000Z',
              resumeState: null,
              trustedAssessmentState: null,
            }, appOrigin);
          }
        });
        window.acceptLegacy = () => {
          const progress = window.messages.find((message) => message?.event === 'progress_updated');
          if (!progress) return false;
          const resumeRevision = '2026-08-10T10:01:00.000Z';
          document.getElementById('course').contentWindow.postMessage({
            type: ${JSON.stringify(RESULT_TYPE)}, version: 1, courseSlug,
            status: 'accepted', resumeRevision,
            resumeState: { ...progress.resumeState, baseRevision: resumeRevision },
          }, appOrigin);
          return true;
        };
        window.rejectLegacy = () => {
          const progress = window.messages.find((message) => message?.event === 'progress_updated');
          if (!progress) return false;
          document.getElementById('course').contentWindow.postMessage({
            type: ${JSON.stringify(RESULT_TYPE)}, version: 1, courseSlug,
            status: 'rejected', resumeRevision: '2026-08-10T10:01:00.000Z',
            resumeState: null, error: 'resume_rejected',
          }, appOrigin);
          return true;
        };
      </script>`);
  });
}

test('legacy cache bytes remain untouched until an accepted durable resume ACK', {
  timeout: 120_000,
}, async (t) => {
  const vite = spawn(process.execPath, [
    resolve('node_modules/vite/bin/vite.js'), '--host', '127.0.0.1', '--port', String(APP_PORT), '--strictPort',
  ], { cwd: process.cwd(), env: { ...process.env, BROWSER: 'none' }, stdio: 'ignore' });
  t.after(() => vite.kill());
  await waitForApp();

  let parentOrigin = '';
  const parentServer = createParentServer(() => parentOrigin);
  parentOrigin = await listen(parentServer);
  t.after(() => new Promise((resolvePromise) => parentServer.close(resolvePromise)));

  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());
  const context = await browser.newContext();
  const rawLegacy = JSON.stringify(legacyState);
  await context.addInitScript(({ appOrigin, storageKey, raw }) => {
    if (window.location.origin === appOrigin) localStorage.setItem(storageKey, raw);
  }, { appOrigin: APP_ORIGIN, storageKey: STORAGE_KEY, raw: rawLegacy });
  const page = await context.newPage();
  await page.goto(`${parentOrigin}/ack`);
  await page.waitForFunction(() => window.messages.some((message) => (
    message?.event === 'progress_updated' && message?.legacyBootstrap === true
  )), undefined, { timeout: 60_000 });
  const frame = page.frames().find((candidate) => candidate.url().startsWith(APP_ORIGIN));
  assert.ok(frame);
  assert.equal(await frame.evaluate((key) => localStorage.getItem(key), STORAGE_KEY), rawLegacy);

  assert.equal(await page.evaluate(() => window.acceptLegacy()), true);
  await frame.waitForFunction(({ key, original }) => localStorage.getItem(key) !== original, {
    key: STORAGE_KEY,
    original: rawLegacy,
  });
  const canonical = JSON.parse(await frame.evaluate((key) => localStorage.getItem(key), STORAGE_KEY));
  assert.equal(Boolean(canonical.practiceCheckState.module4Enhanced), true);
  assert.equal('activeModal' in canonical && canonical.activeModal === 'help', false);
  assert.equal(canonical.finalAssessmentResult, null);
  assert.equal(canonical.finalAssessmentAttemptNumber, 0);

  const rejectedContext = await browser.newContext();
  await rejectedContext.addInitScript(({ appOrigin, storageKey, raw }) => {
    if (window.location.origin === appOrigin) localStorage.setItem(storageKey, raw);
  }, { appOrigin: APP_ORIGIN, storageKey: STORAGE_KEY, raw: rawLegacy });
  const rejectedPage = await rejectedContext.newPage();
  await rejectedPage.goto(`${parentOrigin}/rejected`);
  await rejectedPage.waitForFunction(() => window.messages.some((message) => (
    message?.event === 'progress_updated' && message?.legacyBootstrap === true
  )), undefined, { timeout: 60_000 });
  assert.equal(await rejectedPage.evaluate(() => window.rejectLegacy()), true);
  await rejectedPage.waitForFunction(() => window.messages.some((message) => (
    message?.event === 'integration_error' && message?.error?.code === 'legacy_bootstrap_rejected'
  )), undefined, { timeout: 60_000 });
  const rejectedFrame = rejectedPage.frames().find((candidate) => candidate.url().startsWith(APP_ORIGIN));
  assert.ok(rejectedFrame);
  assert.equal(await rejectedFrame.evaluate((key) => localStorage.getItem(key), STORAGE_KEY), rawLegacy);

  const unsafeContext = await browser.newContext();
  const unsafe = JSON.stringify({
    ...legacyState,
    completedModules: ['module_01_hrba_foundations', 'module_03_project_design'],
  });
  await unsafeContext.addInitScript(({ appOrigin, storageKey, raw }) => {
    if (window.location.origin === appOrigin) localStorage.setItem(storageKey, raw);
  }, { appOrigin: APP_ORIGIN, storageKey: STORAGE_KEY, raw: unsafe });
  const unsafePage = await unsafeContext.newPage();
  await unsafePage.goto(`${parentOrigin}/invalid`);
  await unsafePage.waitForFunction(
    () => window.messages.some((message) => message?.event === 'integration_error'),
    undefined,
    { timeout: 60_000 },
  );
  const errorCode = await unsafePage.evaluate(() => (
    window.messages.find((message) => message?.event === 'integration_error')?.error?.code
  ));
  assert.equal(errorCode, 'legacy_resume_migration_failed');
  const unsafeFrame = unsafePage.frames().find((candidate) => candidate.url().startsWith(APP_ORIGIN));
  assert.ok(unsafeFrame);
  assert.equal(await unsafeFrame.evaluate((key) => localStorage.getItem(key), STORAGE_KEY), unsafe);
  assert.equal(await unsafePage.evaluate(() => (
    window.messages.some((message) => message?.event === 'progress_updated')
  )), false);
});
