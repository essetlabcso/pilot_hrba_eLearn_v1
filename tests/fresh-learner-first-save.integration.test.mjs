import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43207;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const COURSE_SLUG = 'applying-human-rights-based-approach-in-cso-practice';
const EVENT_TYPE = 'cso-learning-hub:external-course-event';
const CONTEXT_TYPE = 'cso-learning-hub:external-course-launch-context';
const RESULT_TYPE = 'cso-learning-hub:external-course-resume-result';
const INITIAL_REVISION = '2026-08-10T12:00:00.000Z';
const STATE_KEYS = {
  a: Buffer.alloc(32, 0x31).toString('base64url'),
  b: Buffer.alloc(32, 0x32).toString('base64url'),
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
  throw new Error('Timed out waiting for the first-save test server.');
}

function createParentServer(getOrigin) {
  return createServer((request, response) => {
    const learner = new URL(request.url || '/', 'http://parent.invalid').pathname.slice(1) || 'a';
    const parentOrigin = getOrigin();
    const iframeUrl = new URL('/', APP_ORIGIN);
    iframeUrl.searchParams.set('embed', 'portal');
    iframeUrl.searchParams.set('portalOrigin', parentOrigin);
    iframeUrl.searchParams.set('courseSlug', COURSE_SLUG);
    iframeUrl.searchParams.set('launchToken', `fresh-${learner}-opaque`);
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(`<!doctype html>
      <iframe
        id="course"
        title="Embedded HRBA course"
        sandbox="allow-downloads allow-forms allow-popups allow-same-origin allow-scripts"
        src="${iframeUrl.toString().replaceAll('&', '&amp;')}"
      ></iframe>
      <script>
        const learner = ${JSON.stringify(learner)};
        const appOrigin = ${JSON.stringify(APP_ORIGIN)};
        const courseSlug = ${JSON.stringify(COURSE_SLUG)};
        const stateKeys = ${JSON.stringify(STATE_KEYS)};
        const initialRevision = ${JSON.stringify(INITIAL_REVISION)};
        window.progressMessages = [];
        window.apiCalls = 0;
        window.ackCount = 0;
        window.serverResumeState = null;
        window.serverRevision = initialRevision;
        let frameStabilized = false;
        document.getElementById('course').addEventListener('load', () => {
          if (frameStabilized) return;
          frameStabilized = true;
          window.setTimeout(() => {
            const frame = document.getElementById('course');
            frame.src = frame.src;
          }, 500);
        });
        window.addEventListener('message', (event) => {
          if (event.origin !== appOrigin || event.source !== document.getElementById('course').contentWindow) return;
          if (event.data?.type !== ${JSON.stringify(EVENT_TYPE)}) return;
          if (event.data.event === 'course_ready') {
            document.getElementById('course').contentWindow.postMessage({
              type: ${JSON.stringify(CONTEXT_TYPE)},
              version: 1,
              courseSlug,
              learnerStateKey: stateKeys[learner],
              resumeRevision: window.serverRevision,
              resumeState: window.serverResumeState,
              trustedAssessmentState: null,
            }, appOrigin);
            return;
          }
          if (event.data.event !== 'progress_updated') return;
          window.progressMessages.push(event.data);
          window.apiCalls += 1;
          window.serverRevision = new Date(Date.parse(initialRevision) + window.apiCalls * 60_000).toISOString();
          window.serverResumeState = { ...event.data.resumeState, baseRevision: window.serverRevision };
          document.getElementById('course').contentWindow.postMessage({
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

test('fresh learner first meaningful Module 1 state creates one durable save and uses its ACK revision', {
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
  const page = await context.newPage();
  await page.goto(`${parentOrigin}/a`);
  const frame = page.frames().find((candidate) => candidate.url().startsWith(APP_ORIGIN));
  assert.ok(frame);
  const startModule = frame.getByRole('button', { name: 'Start Module 1', exact: true });
  await startModule.waitFor();

  await page.waitForTimeout(250);
  assert.equal(await page.evaluate(() => window.progressMessages.length), 0);
  assert.equal(await page.evaluate(() => window.apiCalls), 0);

  await startModule.click();
  await page.waitForFunction(() => window.progressMessages.length === 1 && window.ackCount === 1);
  const first = await page.evaluate(() => window.progressMessages[0]);
  assert.equal(first.currentModuleId, 'module_01_hrba_foundations');
  assert.equal(first.currentScreenId, 'M1-PLAYER-00');
  assert.deepEqual(first.completedModuleIds, []);
  assert.deepEqual(first.resumeState.completedScreenIdsByModule, {});
  assert.equal(first.baseRevision, INITIAL_REVISION);
  assert.equal(first.resumeState.baseRevision, INITIAL_REVISION);
  assert.equal(first.legacyBootstrap, false);

  const serializedFirst = JSON.stringify(first.resumeState).toLowerCase();
  for (const prohibited of [
    'finalassessmentresult', 'finalassessmentattemptnumber', 'certificatecode',
    'userid', 'learnerid', 'enrollmentid', 'courseversionid',
  ]) {
    assert.equal(serializedFirst.includes(prohibited), false, `Unexpected authority field: ${prohibited}`);
  }

  await frame.getByRole('button', { name: /Next/i }).click();
  await page.waitForFunction(() => window.progressMessages.length === 2 && window.ackCount === 2);
  const second = await page.evaluate(() => window.progressMessages[1]);
  assert.equal(second.baseRevision, '2026-08-10T12:01:00.000Z');
  assert.equal(second.resumeState.baseRevision, '2026-08-10T12:01:00.000Z');
  assert.equal(second.currentModuleId, 'module_01_hrba_foundations');
  assert.notEqual(second.currentScreenId, first.currentScreenId);
  assert.equal(second.resumeState.completedScreenIdsByModule.module_01_hrba_foundations.length, 1);

  await page.evaluate(() => {
    const courseFrame = document.getElementById('course');
    courseFrame.src = courseFrame.src;
  });
  await frame.getByRole('button', { name: /Next/i }).waitFor();
  await page.waitForTimeout(1_000);
  assert.equal(await page.evaluate(() => window.progressMessages.length), 2);
  assert.equal(await page.evaluate(() => window.apiCalls), 2);

  const isolatedContext = await browser.newContext();
  const isolatedPage = await isolatedContext.newPage();
  await isolatedPage.goto(`${parentOrigin}/b`);
  const isolatedFrame = isolatedPage.frames().find((candidate) => candidate.url().startsWith(APP_ORIGIN));
  assert.ok(isolatedFrame);
  await isolatedFrame.getByRole('button', { name: 'Start Module 1', exact: true }).waitFor();
  await isolatedPage.waitForTimeout(250);
  assert.equal(await isolatedPage.evaluate(() => window.progressMessages.length), 0);
  assert.equal(await isolatedFrame.getByText(/Start your HRBA learning pathway/i).isVisible(), true);
});
