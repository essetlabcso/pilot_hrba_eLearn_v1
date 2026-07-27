import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43196;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const SCREENSHOT_DIR = process.env.MODULE2_TARGETED_SCREENSHOT_DIR || '';
const module2Ids = [
  'M2-00', 'M2-Intro', 'M2-Objectives', '1.1', '1.2', '1.3', '2.1', '2.2', '2.3',
  '3.1', '3.2', '3.3', '4.1', '4.2', '4.3', '5.1', '5.2', '5.3', '6.1', '6.2',
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
  throw lastError || new Error('Timed out waiting for the Module 2 targeted UI/UX server.');
}

async function seedModule2(page, currentScreenId, completedBefore) {
  await page.goto(APP_ORIGIN);
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(({ storageKey, screenId, progress }) => {
    const current = JSON.parse(localStorage.getItem(storageKey)) || {};
    localStorage.setItem(storageKey, JSON.stringify({
      ...current,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: 'module_02_everyday_cso_work',
      currentScreenId: screenId,
      completedModules: ['module_01_hrba_foundations'],
      screenProgress: {
        ...current.screenProgress,
        module_02_everyday_cso_work: progress,
      },
    }));
  }, {
    storageKey: STORAGE_KEY,
    screenId: currentScreenId,
    progress: module2Ids.slice(0, completedBefore),
  });
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    body: document.body.scrollWidth - document.body.clientWidth,
  }));
  assert.ok(overflow.document <= 1, `${label}: document overflow was ${overflow.document}px`);
  assert.ok(overflow.body <= 1, `${label}: body overflow was ${overflow.body}px`);
}

async function assertControlsInsideViewport(page, selector, label) {
  const result = await page.locator(selector).evaluateAll((elements) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return {
      left: box.left,
      right: box.right,
      width: box.width,
      viewport: document.documentElement.clientWidth,
    };
  }));
  assert.ok(result.length > 0, `${label}: expected at least one control.`);
  for (const box of result) {
    assert.ok(box.width > 40, `${label}: control width must remain usable.`);
    assert.ok(box.left >= -1 && box.right <= box.viewport + 1, `${label}: control must remain visible.`);
  }
}

async function capture(page, name) {
  if (!SCREENSHOT_DIR) return;
  mkdirSync(SCREENSHOT_DIR, { recursive: true });
  await page.screenshot({ path: join(SCREENSHOT_DIR, name), fullPage: true });
}

async function assertFocusVisible(locator, label) {
  await locator.focus();
  const focus = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
  });
  assert.notEqual(focus.outlineStyle, 'none', `${label}: focus outline must be visible.`);
  assert.notEqual(focus.outlineWidth, '0px', `${label}: focus outline must have width.`);
}

test('Module 2 targeted instructions, interaction states, and responsive layouts remain usable', {
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
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  t.after(() => context.close());
  await context.route('https://fonts.googleapis.com/**', (route) => route.fulfill({
    contentType: 'text/css',
    body: '',
  }));
  const page = await context.newPage();
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await seedModule2(page, '1.3', 5);
  await page.goto(`${APP_ORIGIN}/module-2/screen-1-3`);
  await page.getByRole('heading', { level: 1, name: 'A Tale of Two Water Projects' }).waitFor();
  const screen6Instruction = page.getByText('Drag the blue divider left or right to compare the two approaches.', { exact: true });
  await screen6Instruction.waitFor();
  const range = page.getByRole('slider', { name: 'Compare Needs Lens and Rights Lens' });
  assert.equal(await range.getAttribute('aria-describedby'), 'm2-final-water-compare-instruction');
  await assertFocusVisible(range, 'Screen 6 range');
  await range.press('ArrowRight');
  assert.equal(await range.inputValue(), '55');
  await range.click();
  assert.equal(await range.evaluate((element) => element === document.activeElement), true);
  await range.fill('75');
  assert.equal(await range.inputValue(), '75', 'The native range input must update the divider.');
  await screen6Instruction.evaluate((element) => element.scrollIntoView({ block: 'start' }));
  await capture(page, 'screen-06-desktop.png');
  for (const width of [1024, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await assertNoHorizontalOverflow(page, `Screen 6 ${width}px`);
    await assertControlsInsideViewport(page, '.m2-final-slider-label input', `Screen 6 ${width}px`);
  }
  await page.setViewportSize({ width: 390, height: 900 });
  await screen6Instruction.evaluate((element) => element.scrollIntoView({ block: 'start' }));
  await capture(page, 'screen-06-mobile-390.png');

  await seedModule2(page, '2.1', 6);
  await page.goto(`${APP_ORIGIN}/module-2/screen-2-1`);
  await page.getByRole('heading', { level: 1, name: 'Who Holds the Rights?' }).waitFor();
  const screen7Instruction = page.getByText('Select each group card to reveal why the group holds rights.', { exact: true });
  await screen7Instruction.waitFor();
  const rightsGrid = page.locator('.m2-final-rights-grid');
  assert.equal(await rightsGrid.getAttribute('aria-describedby'), 'm2-final-rights-card-instruction');
  const rightsButtons = rightsGrid.getByRole('button');
  assert.equal(await rightsButtons.count(), 3);
  await rightsButtons.nth(0).focus();
  await page.keyboard.press('Enter');
  await rightsButtons.nth(1).focus();
  await page.keyboard.press('Space');
  await rightsButtons.nth(2).click();
  for (let index = 0; index < 3; index += 1) {
    assert.equal(await rightsButtons.nth(index).getAttribute('aria-expanded'), 'true');
  }
  assert.equal(await rightsGrid.getByText('Viewed', { exact: true }).count(), 3);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await screen7Instruction.evaluate((element) => element.scrollIntoView({ block: 'start' }));
  await capture(page, 'screen-07-desktop.png');
  for (const width of [1024, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await assertNoHorizontalOverflow(page, `Screen 7 ${width}px`);
    await assertControlsInsideViewport(page, '.m2-final-rights-card button', `Screen 7 ${width}px`);
  }
  await page.setViewportSize({ width: 390, height: 900 });
  await screen7Instruction.evaluate((element) => element.scrollIntoView({ block: 'start' }));
  await capture(page, 'screen-07-mobile-390.png');

  await seedModule2(page, '3.1', 9);
  await page.goto(`${APP_ORIGIN}/module-2/screen-3-1`);
  await page.getByRole('heading', { level: 1, name: 'The PANEL Principles' }).waitFor();
  await page.getByText('Open each card to review the practical rule.', { exact: true }).waitFor();
  const panelButtons = page.locator('.m2-final-panel-card').getByRole('button');
  await assertFocusVisible(panelButtons.first(), 'Screen 10 PANEL card');
  await panelButtons.first().press('Enter');
  assert.equal(await panelButtons.first().getAttribute('aria-expanded'), 'true');
  await page.setViewportSize({ width: 320, height: 900 });
  await assertNoHorizontalOverflow(page, 'Screen 10 320px');

  await seedModule2(page, 'M2-KC', 20);
  await page.goto(`${APP_ORIGIN}/module-2/knowledge-check`);
  await page.getByRole('heading', { level: 1, name: 'Module 2 Knowledge Check' }).waitFor();
  const questions = page.locator('.m2-final-kc-question');
  assert.ok(await questions.count() > 0);
  const firstRadio = questions.first().getByRole('radio').first();
  await assertFocusVisible(firstRadio, 'Screen 21 radio');
  await firstRadio.check();
  assert.equal(await firstRadio.isChecked(), true);
  await page.setViewportSize({ width: 320, height: 900 });
  await assertNoHorizontalOverflow(page, 'Screen 21 320px');

  assert.deepEqual(browserErrors, [], `Browser console errors: ${browserErrors.join(' | ')}`);
});
