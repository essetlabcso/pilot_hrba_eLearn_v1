import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43185;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const SCREEN_2_URL = `${APP_ORIGIN}/module-5/screen-5-1`;

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
  throw lastError || new Error('Timed out waiting for the Module 5 presentation server.');
}

async function assertNoHorizontalOverflow(page, width, height) {
  await page.setViewportSize({ width, height });
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth),
    false,
    `Screen 2 must not overflow horizontally at ${width}px`,
  );
}

async function chooseWithKeyboard(locator, page) {
  await page.keyboard.press('Tab');
  await locator.focus();
  assert.equal(await locator.evaluate((element) => document.activeElement === element), true);
  const outline = await locator.evaluate((element) => getComputedStyle(element).outlineStyle);
  assert.notEqual(outline, 'none');
  await page.keyboard.press('Space');
  assert.equal(await locator.isChecked(), true);
}

test('Module 5 presentation Screen 2 supports keyboard, refresh, mobile and final-gate-only progress', {
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

  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  t.after(() => context.close());
  await context.route('https://fonts.googleapis.com/**', (route) => route.fulfill({
    contentType: 'text/css',
    body: '',
  }));
  await context.route('https://www.youtube-nocookie.com/**', (route) => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><title>Presentation test frame</title>',
  }));

  const page = await context.newPage();
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await page.goto(APP_ORIGIN);
  await page.getByRole('heading', { level: 1, name: 'CSO Learning Hub' }).waitFor();
  await page.evaluate(({ storageKey }) => {
    const current = JSON.parse(localStorage.getItem(storageKey));
    localStorage.setItem(storageKey, JSON.stringify({
      ...current,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: 'module_05_hrba_meal',
      currentScreenId: 'M5-R01',
      completedModules: [
        'module_01_hrba_foundations',
        'module_02_everyday_cso_work',
        'module_03_project_design',
        'module_04_implementation',
      ],
      screenProgress: {
        ...current.screenProgress,
        module_05_hrba_meal: [],
      },
      practiceCheckState: {},
    }));
  }, { storageKey: STORAGE_KEY });

  await page.goto(SCREEN_2_URL);
  await page.getByRole('heading', { level: 1, name: 'Why HRBA Matters in MEAL' }).waitFor();
  await page.waitForTimeout(350);

  const frame = page.locator('iframe[title="Why HRBA Matters in MEAL"]');
  assert.equal(await frame.getAttribute('src'), 'https://www.youtube-nocookie.com/embed/2F9_x3WF2sQ');
  assert.equal(await frame.getAttribute('loading'), 'lazy');
  assert.notEqual(await frame.getAttribute('allowfullscreen'), null);
  const fallback = page.getByRole('link', { name: 'open the presentation on YouTube' });
  assert.equal(await fallback.getAttribute('href'), 'https://youtu.be/2F9_x3WF2sQ');

  await assertNoHorizontalOverflow(page, 1440, 1000);
  await assertNoHorizontalOverflow(page, 390, 1000);
  await assertNoHorizontalOverflow(page, 320, 1000);
  await page.setViewportSize({ width: 1440, height: 1000 });

  const questions = page.locator('.m5p-question');
  const first = questions.nth(0);
  await chooseWithKeyboard(first.getByRole('radio', {
    name: /The planned meetings occurred and recorded attendance reached 240/,
  }), page);
  await first.getByRole('button', { name: 'Check answer' }).click();
  await first.getByText('Correct. This conclusion stays within the activity and attendance evidence available.', { exact: true }).waitFor();

  const second = questions.nth(1);
  await chooseWithKeyboard(second.getByRole('radio', {
    name: /Broad, necessary participation categories/,
  }), page);
  await second.getByRole('button', { name: 'Check answer' }).click();

  const third = questions.nth(2);
  for (const option of [
    /All groups could participate equally/,
    /The feedback box ensured that concerns were resolved/,
    /Four positive stories prove lasting change/,
  ]) {
    await chooseWithKeyboard(third.getByRole('checkbox', { name: option }), page);
  }
  await third.getByRole('button', { name: 'Check answer' }).click();
  await third.getByText('Correct.', { exact: true }).waitFor();

  const resultField = page.getByLabel('Your concise response').nth(0);
  await resultField.fill('Participation influence');
  await resultField.press('Tab');
  assert.notEqual(await page.evaluate(() => document.activeElement?.tagName), 'BODY');
  await page.reload();
  await page.getByRole('heading', { level: 1, name: 'Why HRBA Matters in MEAL' }).waitFor();
  assert.equal(await page.getByLabel('Your concise response').nth(0).inputValue(), 'Participation influence');
  assert.equal(await page.getByRole('radio', {
    name: /The planned meetings occurred and recorded attendance reached 240/,
  }).isChecked(), true);

  await page.getByLabel('Your concise response').nth(1).fill('People unable to attend meetings');
  const continueButton = page.getByRole('button', { name: 'Continue' });
  assert.equal(await continueButton.isEnabled(), true);
  const before = await page.evaluate((storageKey) => {
    const state = JSON.parse(localStorage.getItem(storageKey));
    return state.screenProgress.module_05_hrba_meal || [];
  }, STORAGE_KEY);
  assert.deepEqual(before, []);

  await continueButton.click();
  await page.waitForURL(/\/module-5\/screen-5-2$/);
  const after = await page.evaluate((storageKey) => {
    const state = JSON.parse(localStorage.getItem(storageKey));
    return {
      progress: state.screenProgress.module_05_hrba_meal,
      completedModules: state.completedModules,
    };
  }, STORAGE_KEY);
  assert.deepEqual(after.progress, ['M5-R01']);
  assert.equal(after.completedModules.includes('module_05_hrba_meal'), false);
  assert.deepEqual(browserErrors, []);
});
