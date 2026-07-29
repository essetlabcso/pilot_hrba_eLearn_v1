import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43261;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const REQUIRED_MODULES = [
  'module_01_hrba_foundations',
  'module_02_everyday_cso_work',
  'module_03_project_design',
  'module_04_implementation',
  'module_05_hrba_meal',
];

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
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw lastError || new Error('Timed out waiting for the final content integration test server.');
}

async function seedState(page, overrides = {}) {
  await page.goto(APP_ORIGIN);
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(({ storageKey, stateOverrides, requiredModules }) => {
    const current = JSON.parse(localStorage.getItem(storageKey) || '{}');
    localStorage.setItem(storageKey, JSON.stringify({
      ...current,
      currentLayer: 'player',
      completedModules: requiredModules,
      ...stateOverrides,
    }));
  }, { storageKey: STORAGE_KEY, stateOverrides: overrides, requiredModules: REQUIRED_MODULES });
}

function assessmentResult(passed) {
  return {
    evidenceId: passed ? 'passed-assessment-evidence' : 'failed-assessment-evidence',
    score: passed ? 8 : 7,
    maxScore: 10,
    percentage: passed ? 80 : 70,
    passed,
    submittedAt: '2026-07-29T09:00:00.000Z',
    attemptNumber: 1,
  };
}

async function assertNoHorizontalOverflow(page, label) {
  const metrics = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    body: document.body.scrollWidth - document.body.clientWidth,
    canvas: (() => {
      const element = document.querySelector('.main-screen-canvas__content');
      return element ? element.scrollWidth - element.clientWidth : 0;
    })(),
  }));
  assert.ok(metrics.document <= 1, `${label}: document overflow was ${metrics.document}px`);
  assert.ok(metrics.body <= 1, `${label}: body overflow was ${metrics.body}px`);
  assert.ok(metrics.canvas <= 1, `${label}: course canvas overflow was ${metrics.canvas}px`);
}

test('external course resources use the approved privacy and safety contracts', async () => {
  const config = await readFile(resolve('src/config/externalCourseResources.ts'), 'utf8');
  const module1 = await readFile(resolve('src/components/course/Module1Renderer.tsx'), 'utf8');
  const assessment = await readFile(resolve('src/components/course/FinalAssessmentRenderer.tsx'), 'utf8');

  assert.match(config, /https:\/\/www\.youtube-nocookie\.com\/embed\/oVO2oj4_xJQ/);
  assert.match(config, /https:\/\/youtu\.be\/oVO2oj4_xJQ/);
  assert.match(config, /https:\/\/ee\.kobotoolbox\.org\/x\/8Plk5gtY/);
  assert.doesNotMatch(config, /autoplay/i);
  assert.match(module1, /allowFullScreen/);
  assert.match(module1, /rel="noopener noreferrer"/);
  assert.match(module1, /The full transcript remains available below\./);
  assert.match(assessment, /result\.passed &&/);
  assert.match(assessment, /Complete Pilot Feedback/);
  assert.match(assessment, /the course does not track whether you/);
  assert.match(assessment, /target="_blank"/);
  assert.match(assessment, /rel="noopener noreferrer"/);
});

test('Module 1 video and optional pilot feedback render responsively without changing course gates', {
  timeout: 180_000,
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

  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  t.after(() => context.close());
  await context.route('https://fonts.googleapis.com/**', (route) => route.fulfill({
    contentType: 'text/css',
    body: '',
  }));
  await context.route('https://www.youtube-nocookie.com/**', (route) => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><html><body><main>Module 1 introduction video loaded</main></body></html>',
  }));

  const page = await context.newPage();
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await seedState(page, {
    currentModuleId: 'module_01_hrba_foundations',
    currentScreenId: 'M1-S1-01',
    screenProgress: { module_01_hrba_foundations: ['M1-PLAYER-00'] },
  });
  await page.goto(`${APP_ORIGIN}/?moduleId=module_01_hrba_foundations&screenId=M1-S1-01`);
  await page.getByRole('heading', { level: 1, name: 'Why This Course, Why Now?' }).waitFor();

  const iframe = page.getByTitle('Why This Course, Why Now? — HRBA course introduction video');
  assert.equal(await iframe.count(), 1);
  assert.equal(await iframe.getAttribute('src'), 'https://www.youtube-nocookie.com/embed/oVO2oj4_xJQ');
  assert.equal(await iframe.getAttribute('loading'), 'lazy');
  assert.notEqual(await iframe.getAttribute('allowfullscreen'), null);
  assert.equal((await iframe.getAttribute('src')).includes('autoplay'), false);
  const fallback = page.getByRole('link', { name: 'Open the introduction video in a new tab' });
  assert.equal(await fallback.getAttribute('href'), 'https://youtu.be/oVO2oj4_xJQ');
  assert.equal(await fallback.getAttribute('target'), '_blank');
  assert.match(await fallback.getAttribute('rel'), /noopener/);
  assert.match(await fallback.getAttribute('rel'), /noreferrer/);
  await iframe.focus();
  await page.keyboard.press('Tab');
  assert.equal(
    await fallback.evaluate((element) => element === document.activeElement),
    true,
    'Keyboard focus should move from the embedded player to its fallback link.',
  );
  assert.notEqual(await fallback.evaluate((element) => getComputedStyle(element).outlineStyle), 'none');
  await page.getByText('Transcript', { exact: true }).waitFor();

  const continueButton = page.getByRole('button', { name: 'Continue' });
  assert.equal(await continueButton.isDisabled(), true, 'Video playback must not satisfy the existing learning gate.');
  await page.locator('.m1-next-choice').first().click();
  assert.equal(await continueButton.isEnabled(), true, 'The existing relevance choice must remain the only Continue gate.');

  for (const width of [1440, 1366, 390, 360, 320]) {
    await page.setViewportSize({ width, height: width > 600 ? 900 : 800 });
    await assertNoHorizontalOverflow(page, `Module 1 Screen 2 at ${width}px`);
    const dimensions = await page.locator('.m1-welcome-video__frame').evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    });
    assert.ok(
      dimensions.width >= Math.min(width * 0.55, 700),
      `${width}px video should use meaningful width (rendered ${dimensions.width}px).`,
    );
    assert.ok(Math.abs((dimensions.width / dimensions.height) - (16 / 9)) < 0.04, `${width}px video should remain 16:9.`);
  }

  const blockedPage = await context.newPage();
  await blockedPage.route('https://www.youtube-nocookie.com/**', (route) => route.fulfill({
    status: 403,
    contentType: 'text/plain',
    body: 'Video unavailable',
  }));
  await seedState(blockedPage, {
    currentModuleId: 'module_01_hrba_foundations',
    currentScreenId: 'M1-S1-01',
  });
  await blockedPage.goto(`${APP_ORIGIN}/?moduleId=module_01_hrba_foundations&screenId=M1-S1-01`);
  assert.equal(
    await blockedPage.getByRole('link', { name: 'Open the introduction video in a new tab' }).isVisible(),
    true,
    'The external fallback must remain available if the embedded player is blocked.',
  );
  assert.equal(await blockedPage.getByText('Transcript', { exact: true }).isVisible(), true);
  await blockedPage.close();

  await seedState(page, {
    currentModuleId: 'final_assessment',
    currentScreenId: 'FINAL-ASSESSMENT-COMPLETE',
    finalAssessmentResult: assessmentResult(true),
    screenProgress: { final_assessment: ['FINAL-ASSESSMENT-COMPLETE'] },
  });
  await page.goto(`${APP_ORIGIN}/final-assessment/result`);
  await page.getByRole('heading', { level: 1, name: 'Final Assessment Result' }).waitFor();
  const feedback = page.getByRole('link', { name: /Complete Pilot Feedback/ });
  assert.equal(await feedback.count(), 1);
  assert.equal(await feedback.getAttribute('href'), 'https://ee.kobotoolbox.org/x/8Plk5gtY');
  assert.equal(await feedback.getAttribute('target'), '_blank');
  assert.equal(await feedback.getAttribute('rel'), 'noopener noreferrer');
  await page.getByText(/assessment and certificate eligibility are already complete/i).waitFor();

  for (const width of [1440, 1366, 390, 360, 320]) {
    await page.setViewportSize({ width, height: width > 600 ? 900 : 800 });
    await assertNoHorizontalOverflow(page, `Passed assessment feedback at ${width}px`);
    assert.equal(await feedback.isVisible(), true);
  }

  await seedState(page, {
    currentModuleId: 'final_assessment',
    currentScreenId: 'FINAL-ASSESSMENT-COMPLETE',
    finalAssessmentResult: assessmentResult(false),
    screenProgress: { final_assessment: ['FINAL-ASSESSMENT-COMPLETE'] },
  });
  await page.goto(`${APP_ORIGIN}/final-assessment/result`);
  assert.equal(await page.getByRole('link', { name: /Complete Pilot Feedback/ }).count(), 0);

  await seedState(page, {
    currentModuleId: 'final_assessment',
    currentScreenId: 'FINAL-ASSESSMENT-QUESTIONS',
    finalAssessmentResult: null,
    screenProgress: { final_assessment: [] },
  });
  await page.goto(`${APP_ORIGIN}/final-assessment/questions`);
  assert.equal(await page.getByRole('link', { name: /Complete Pilot Feedback/ }).count(), 0);

  assert.deepEqual(browserErrors, [], `Browser console errors: ${browserErrors.join(' | ')}`);
});
