import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43194;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const SCREENSHOT_DIR = process.env.MODULE3_M3B_SCREENSHOT_DIR || '';
const module3ProgressThrough = (number) => Array.from(
  { length: number },
  (_, index) => `M3-R${String(index + 1).padStart(2, '0')}`,
);

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
  throw lastError || new Error('Timed out waiting for the Module 3 M3-B server.');
}

async function seedModule3(page, currentScreenId, completedBefore) {
  await page.goto(APP_ORIGIN);
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(({ storageKey, currentScreenId: screenId, progress }) => {
    const current = JSON.parse(localStorage.getItem(storageKey)) || {};
    localStorage.setItem(storageKey, JSON.stringify({
      ...current,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: 'module_03_project_design',
      currentScreenId: screenId,
      completedModules: [
        'module_01_hrba_foundations',
        'module_02_everyday_cso_work',
      ],
      screenProgress: {
        ...current.screenProgress,
        module_03_project_design: progress,
      },
    }));
  }, {
    storageKey: STORAGE_KEY,
    currentScreenId,
    progress: module3ProgressThrough(completedBefore),
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

async function screenshot(page, name) {
  if (!SCREENSHOT_DIR) return;
  mkdirSync(SCREENSHOT_DIR, { recursive: true });
  await page.screenshot({ path: join(SCREENSHOT_DIR, name), fullPage: true });
}

async function getTextContrastRatio(page, containerSelector) {
  return page.evaluate((selector) => {
    const container = document.querySelector(selector);
    const text = container?.querySelector('h1, h2, h3, p');
    if (!container || !text) throw new Error(`Missing contrast target: ${selector}`);
    const parseRgb = (value) => {
      const values = value.match(/[\d.]+/g)?.map(Number);
      const channels = values?.slice(0, 3);
      if (!channels || channels.length !== 3) throw new Error(`Unsupported color: ${value}`);
      return { channels, alpha: values?.[3] ?? 1 };
    };
    const luminance = (channels) => {
      const normalized = channels.map((channel) => {
        const value = channel / 255;
        return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      });
      return (0.2126 * normalized[0]) + (0.7152 * normalized[1]) + (0.0722 * normalized[2]);
    };
    const foreground = luminance(parseRgb(getComputedStyle(text).color).channels);
    let backgroundElement = container;
    let parsedBackground = parseRgb(getComputedStyle(backgroundElement).backgroundColor);
    while (parsedBackground.alpha === 0 && backgroundElement.parentElement) {
      backgroundElement = backgroundElement.parentElement;
      parsedBackground = parseRgb(getComputedStyle(backgroundElement).backgroundColor);
    }
    const background = luminance(parsedBackground.channels);
    return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
  }, containerSelector);
}

async function measureActorUnit(page, selector, fieldSelector, width, label) {
  await page.setViewportSize({ width, height: 1000 });
  await assertNoHorizontalOverflow(page, `${label} ${width}px`);
  const metrics = await page.evaluate(({ unitSelector, childSelector }) => {
    const unit = document.querySelector(unitSelector);
    const children = Array.from(unit?.querySelectorAll(childSelector) || []);
    if (!unit || children.length === 0) throw new Error(`Missing responsive actor unit: ${unitSelector}`);
    const unitBox = unit.getBoundingClientRect();
    const childBoxes = children.map((child) => {
      const box = child.getBoundingClientRect();
      return { width: box.width, left: box.left, right: box.right };
    });
    return {
      viewportWidth: document.documentElement.clientWidth,
      unitWidth: unitBox.width,
      childWidths: childBoxes.map((box) => box.width),
      childrenBounded: childBoxes.every((box) => box.left >= unitBox.left - 1 && box.right <= unitBox.right + 1),
      scrollWidth: unit.scrollWidth,
      clientWidth: unit.clientWidth,
    };
  }, { unitSelector: selector, childSelector: fieldSelector });
  assert.ok(metrics.unitWidth >= metrics.viewportWidth * 0.58, `${label}: actor unit must retain a meaningful width at ${width}px.`);
  assert.ok(metrics.childWidths.every((value) => value >= metrics.unitWidth * 0.78), `${label}: controls must stack at readable widths at ${width}px.`);
  assert.equal(metrics.childrenBounded, true, `${label}: controls must remain within the actor unit.`);
  assert.ok(metrics.scrollWidth <= metrics.clientWidth + 1, `${label}: actor unit must not scroll horizontally.`);
  return metrics;
}

test('Module 3 M3-B keeps Screens 8 and 9 complete, responsive and persistent', {
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

  await seedModule3(page, 'M3-R08', 7);
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-8`);
  await page.getByRole('heading', { level: 1, name: 'Duty-Bearers, Supporting Actors, and CSO Roles' }).waitFor();
  // Screen 8: Select duty-bearers, supporting actor and CSO role
  const dutyBearerTiles = page.locator('.m3-actor-section-card').first().locator('.m3-actor-tile');
  assert.ok(await dutyBearerTiles.count() >= 2);
  await dutyBearerTiles.first().click();

  const supportTiles = page.locator('.m3-actor-section-card').nth(1).locator('.m3-actor-tile');
  assert.ok(await supportTiles.count() >= 2);
  await supportTiles.first().click();

  const csoTiles = page.locator('.m3-actor-section-card').nth(2).locator('.m3-actor-tile');
  assert.ok(await csoTiles.count() >= 2);
  await csoTiles.first().click();

  // Continue should be enabled with all selections made
  const screen8Continue = page.locator('button.m3-primary-button');
  assert.equal(await screen8Continue.getAttribute('disabled'), null);
  await screenshot(page, 'screen-08-practice-desktop.png');

  // Screen 8 responsive check
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await assertNoHorizontalOverflow(page, `Screen 8 ${width}px`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });

  // Save and navigate to Screen 9
  await screen8Continue.click();
  await page.waitForURL(/\/module-3\/screen-3-9$/);

  // Verify persistence: return to Screen 8
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-8`);
  await page.getByRole('heading', { level: 1, name: 'Duty-Bearers, Supporting Actors, and CSO Roles' }).waitFor();

  // Navigate to Screen 9
  await seedModule3(page, 'M3-R09', 8);
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-9`);
  await page.getByRole('heading', { level: 1, name: 'Power and Influence Map' }).waitFor();

  // Select enabler, blocker and safe strategy
  const choiceGroups = page.locator('.m3-oq-choice-group');
  const enablerCards = choiceGroups.nth(0).locator('.m3-oq-choice');
  assert.ok(await enablerCards.count() >= 3);
  await enablerCards.first().click();

  const blockerCards = choiceGroups.nth(1).locator('.m3-oq-choice');
  assert.ok(await blockerCards.count() >= 3);
  await blockerCards.first().click();

  const strategyCards = choiceGroups.nth(2).locator('.m3-oq-choice');
  assert.ok(await strategyCards.count() >= 3);
  await strategyCards.first().click();

  // Verify the substantive actor map and equivalent list appear after Generate
  await page.getByTestId('m3-oq-generate').click();
  await page.getByRole('heading', { name: 'Actor and Power Insight' }).waitFor();
  assert.ok(await page.locator('.m3-oq-actor-node').count() >= 6);
  assert.ok(await page.locator('.m3-oq-actor-list article').count() >= 6);
  await screenshot(page, 'screen-09-practice-desktop.png');

  // Screen 9 responsive check
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await assertNoHorizontalOverflow(page, `Screen 9 ${width}px`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });

  // Save and navigate to Screen 10
  const screen9Continue = page.getByTestId('m3-oq-continue');
  assert.equal(await screen9Continue.getAttribute('disabled'), null);
  await screen9Continue.click();
  await page.waitForURL(/\/module-3\/screen-3-10$/);

  // Verify persistence: return to Screen 9
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-9`);
  await page.getByRole('heading', { level: 1, name: 'Power and Influence Map' }).waitFor();
  await page.reload();
  await page.getByRole('heading', { level: 1, name: 'Power and Influence Map' }).waitFor();

  t.diagnostic('Screen 8 and Screen 9 simplified flows completed successfully.');

  await seedModule3(page, 'M3-R10', 9);
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-10`);
  await page.getByRole('button', { name: 'Continue to worked example' }).click();
  await page.getByRole('button', { name: 'Start practice' }).click();
  await page.getByText('Select one priority barrier first. The cause-and-capacity row will appear here.').waitFor();
  const screen10BarrierTiles = page.getByTestId('m3-s10-barrier-tile');
  assert.ok(await screen10BarrierTiles.count() > 0);
  await screen10BarrierTiles.first().click();
  await page.getByTestId('m3-s10-cause-map-row').waitFor();
  const classificationSelects = page.locator('.m3-root-cause-map-statement-card select');
  for (let index = 0; index < await classificationSelects.count(); index += 1) {
    await classificationSelects.nth(index).selectOption({ index: 1 });
  }
  const causeMapSelects = page.locator('[data-testid^="m3-s10-"][data-testid$="-select"]');
  assert.ok(await causeMapSelects.count() >= 4);
  for (let index = 0; index < await causeMapSelects.count(); index += 1) {
    await causeMapSelects.nth(index).selectOption({ index: 1 });
  }
  const screen10Generate = page.getByTestId('m3-s10-generate-canvas');
  assert.equal(await screen10Generate.isEnabled(), true);
  await screen10Generate.click();
  await page.getByRole('heading', { name: 'Your draft Root-Cause and Capacity-Gap Map' }).waitFor();
  await page.setViewportSize({ width: 390, height: 1000 });
  await assertNoHorizontalOverflow(page, 'Screen 10 Review 390px');
  await page.setViewportSize({ width: 320, height: 1000 });
  await assertNoHorizontalOverflow(page, 'Screen 10 Review 320px');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole('button', { name: 'Go to Apply/Download' }).click();
  await page.getByTestId('m3-s10-final-continue').click();
  await page.waitForURL(/\/module-3\/screen-3-11$/);
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-10`);
  await page.getByRole('heading', { name: 'Your draft Root-Cause and Capacity-Gap Map' }).waitFor();
  await page.reload();
  await page.getByRole('heading', { name: 'Your draft Root-Cause and Capacity-Gap Map' }).waitFor();

  const verificationScreens = [
    { id: 'M3-R06', completedBefore: 5, route: 'screen-3-6', label: 'Screen 6' },
    { id: 'M3-R07', completedBefore: 6, route: 'screen-3-7', label: 'Screen 7' },
    { id: 'M3-R10', completedBefore: 9, route: 'screen-3-10', label: 'Screen 10' },
    { id: 'M3-R12', completedBefore: 11, route: 'screen-3-12', label: 'Screen 12' },
    { id: 'M3-R13', completedBefore: 12, route: 'screen-3-13', label: 'Screen 13' },
  ];
  for (const verification of verificationScreens) {
    await seedModule3(page, verification.id, verification.completedBefore);
    await page.goto(`${APP_ORIGIN}/module-3/${verification.route}`);
    await page.locator('.m3-screen').waitFor();
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await assertNoHorizontalOverflow(page, `${verification.label} ${width}px`);
    }
  }
  await seedModule3(page, 'M3-R07', 6);
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-7`);
  const screen7Contrast = await getTextContrastRatio(page, '.m3-rights-map-header');
  assert.ok(screen7Contrast >= 4.5, `Screen 7 header contrast was ${screen7Contrast.toFixed(2)}:1.`);
  t.diagnostic(`Screen 7 header text contrast: ${screen7Contrast.toFixed(2)}:1.`);

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${APP_ORIGIN}/module-4/screen-4-1`);
  await page.getByRole('main').waitFor();
  await assertNoHorizontalOverflow(page, 'Module 4 shell smoke');
  await page.goto(`${APP_ORIGIN}/module-5/screen-5-1`);
  await page.getByRole('main').waitFor();
  await assertNoHorizontalOverflow(page, 'Module 5 shell smoke');

  assert.deepEqual(browserErrors, []);
});
