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
  await page.getByRole('heading', { level: 1, name: 'Duty-Bearer and Actor Responsibility Map' }).waitFor();
  await page.getByRole('button', { name: 'See worked example' }).click();
  await page.getByRole('button', { name: 'Practice with Jiru Amba' }).click();

  const screen8Panel = page.getByTestId('m3-s08-generate-panel');
  assert.equal(await screen8Panel.count(), 1);
  await screen8Panel.getByText('Select one or two priority barriers.').waitFor();
  assert.equal(await page.getByRole('heading', { name: 'Your draft Actor Responsibility Map' }).count(), 0);

  const barrierOptions = page.locator('.m3-responsibility-map-barrier-tiles .m3-responsibility-map-option');
  assert.ok(await barrierOptions.count() > 0);
  await barrierOptions.first().click();
  for (const testId of ['m3-s08-public-selector', 'm3-s08-service-selector', 'm3-s08-cso-selector', 'm3-s08-capacity-selector']) {
    const field = page.getByTestId(testId);
    assert.equal(await field.count(), 1);
    assert.equal(await field.isVisible(), true);
    await field.selectOption({ index: 1 });
  }
  const optionalDetails = page.locator('.m3-responsibility-map-secondary-guidance');
  assert.equal(await optionalDetails.count(), 1);
  assert.equal(await page.getByTestId('m3-s08-community-selector').isVisible(), false);
  await optionalDetails.locator('summary').click();
  assert.equal(await page.getByTestId('m3-s08-community-selector').isVisible(), true);
  await screen8Panel.getByText('5 of 5 requirements complete').waitFor();
  await screen8Panel.getByText('Ready to generate', { exact: true }).waitFor();
  await screenshot(page, 'screen-08-practice-desktop.png');

  const screen8Metrics390 = await measureActorUnit(
    page,
    '.m3-responsibility-map-role-row',
    '.m3-responsibility-map-row-field',
    390,
    'Screen 8',
  );
  await page.locator('.m3-responsibility-map-role-row').scrollIntoViewIfNeeded();
  await screenshot(page, 'screen-08-practice-390.png');
  const screen8Metrics320 = await measureActorUnit(
    page,
    '.m3-responsibility-map-role-row',
    '.m3-responsibility-map-row-field',
    320,
    'Screen 8',
  );
  await page.getByTestId('m3-s08-public-selector').focus();
  await page.keyboard.press('Tab');
  const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
  assert.ok(['SELECT', 'BUTTON', 'SUMMARY'].includes(focusedTag));

  await page.setViewportSize({ width: 1440, height: 1000 });
  await screen8Panel.getByTestId('m3-s08-generate-map').click();
  await page.getByRole('heading', { name: 'Your draft Actor Responsibility Map' }).waitFor();
  await screenshot(page, 'screen-08-review-desktop.png');
  await page.getByRole('button', { name: 'Go to Apply/Download' }).click();
  await page.getByTestId('m3-s08-final-continue').click();
  await page.waitForURL(/\/module-3\/screen-3-9$/);
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-8`);
  await page.getByRole('heading', { name: 'Your draft Actor Responsibility Map' }).waitFor();
  await page.reload();
  await page.getByRole('heading', { name: 'Your draft Actor Responsibility Map' }).waitFor();

  await seedModule3(page, 'M3-R09', 8);
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-9`);
  await page.getByRole('heading', { level: 1, name: 'Power and Influence Map' }).waitFor();
  await page.getByRole('button', { name: 'Some actors may have informal influence even without formal responsibility.' }).click();
  await page.getByRole('button', { name: 'Continue to worked example' }).click();
  await page.getByRole('button', { name: 'Start actor selection' }).click();

  const chooseFirstActor = async () => {
    const actorCards = page.locator('.m3-power-studio-actor-card');
    assert.ok(await actorCards.count() > 0);
    await actorCards.first().click();
  };
  await chooseFirstActor();
  await page.getByRole('button', { name: 'Service and committee actors' }).click();
  await chooseFirstActor();
  await page.getByRole('button', { name: 'Rights-holder groups' }).click();
  await chooseFirstActor();

  const ratingRows = page.getByTestId('m3-s09-rating-row');
  assert.equal(await ratingRows.count(), 3);
  for (let index = 0; index < 3; index += 1) {
    const row = ratingRows.nth(index);
    await row.getByTestId('m3-s09-authority-select').selectOption({ index: 1 });
    await row.getByTestId('m3-s09-influence-select').selectOption({ index: 1 });
    await row.getByTestId('m3-s09-support-select').selectOption({ index: 1 });
    await row.getByTestId('m3-s09-engagement-select').selectOption({ index: 1 });
    assert.equal(await row.locator('.m3-power-studio-row-implication textarea').isVisible(), true);
  }

  const screen9Panel = page.getByTestId('m3-s09-generate-panel');
  assert.equal(await screen9Panel.count(), 1);
  await screen9Panel.getByText('7 of 7 requirements complete').waitFor();
  await screen9Panel.getByText('Ready to generate', { exact: true }).waitFor();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await screenshot(page, 'screen-09-practice-desktop.png');

  const screen9Metrics390 = await measureActorUnit(
    page,
    '.m3-power-studio-rating-row',
    'label',
    390,
    'Screen 9',
  );
  await page.locator('.m3-power-studio-rating-row').first().scrollIntoViewIfNeeded();
  await screenshot(page, 'screen-09-practice-390.png');
  const screen9Metrics320 = await measureActorUnit(
    page,
    '.m3-power-studio-rating-row',
    'label',
    320,
    'Screen 9',
  );
  await ratingRows.first().getByTestId('m3-s09-authority-select').focus();
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement?.tagName), 'SELECT');

  await page.setViewportSize({ width: 1440, height: 1000 });
  await screen9Panel.getByTestId('m3-s09-generate-map').click();
  await page.getByRole('heading', { name: 'Your draft Power and Influence Map' }).waitFor();
  await assertNoHorizontalOverflow(page, 'Screen 9 Review desktop');
  await page.setViewportSize({ width: 390, height: 1000 });
  await assertNoHorizontalOverflow(page, 'Screen 9 Review 390px');
  await screenshot(page, 'screen-09-review-390.png');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByTestId('m3-s09-final-continue').click();
  await page.waitForURL(/\/module-3\/screen-3-10$/);
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-9`);
  await page.getByRole('heading', { name: 'Your draft Power and Influence Map' }).waitFor();
  await page.reload();
  await page.getByRole('heading', { name: 'Your draft Power and Influence Map' }).waitFor();

  t.diagnostic(
    `Screen 8 actor-unit widths — 390px: ${screen8Metrics390.unitWidth.toFixed(1)}px; `
    + `320px: ${screen8Metrics320.unitWidth.toFixed(1)}px. `
    + `Screen 9 actor-unit widths — 390px: ${screen9Metrics390.unitWidth.toFixed(1)}px; `
    + `320px: ${screen9Metrics320.unitWidth.toFixed(1)}px.`,
  );

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
