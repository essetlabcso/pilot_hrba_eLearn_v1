import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43193;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const SCREENSHOT_DIR = process.env.MODULE3_M3A_SCREENSHOT_DIR || '';
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
  throw lastError || new Error('Timed out waiting for the Module 3 M3-A server.');
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

async function assertReadableScreen5Snapshot(page, width) {
  await page.setViewportSize({ width, height: 900 });
  await assertNoHorizontalOverflow(page, `Screen 5 ${width}px Review`);
  const metrics = await page.evaluate(() => {
    const banner = document.querySelector('.m3-context-review-banner');
    const bannerCopy = banner?.querySelector('div');
    const bannerStatus = banner?.querySelector(':scope > strong');
    const bannerHeading = banner?.querySelector('h2');
    const snapshot = document.querySelector('.m3-context-snapshot');
    const snapshotHeader = snapshot?.querySelector('.m3-context-snapshot-header');
    const snapshotHeaderCopy = snapshotHeader?.querySelector('div');
    const snapshotStatus = snapshotHeader?.querySelector('.m3-context-snapshot-status');
    const snapshotHeading = snapshotHeader?.querySelector('h3');
    const snapshotMessage = snapshot?.querySelector('.m3-context-snapshot-status-message');
    if (
      !banner || !bannerCopy || !bannerStatus || !bannerHeading
      || !snapshot || !snapshotHeader || !snapshotHeaderCopy
      || !snapshotStatus || !snapshotHeading || !snapshotMessage
    ) {
      throw new Error('Screen 5 Review readability elements are missing.');
    }
    const rect = (element) => {
      const box = element.getBoundingClientRect();
      return {
        width: box.width,
        height: box.height,
        top: box.top,
        bottom: box.bottom,
        left: box.left,
        right: box.right,
      };
    };
    return {
      viewportWidth: document.documentElement.clientWidth,
      banner: rect(banner),
      bannerCopy: rect(bannerCopy),
      bannerStatus: rect(bannerStatus),
      bannerHeading: rect(bannerHeading),
      snapshot: rect(snapshot),
      snapshotHeaderCopy: rect(snapshotHeaderCopy),
      snapshotStatus: rect(snapshotStatus),
      snapshotHeading: rect(snapshotHeading),
      snapshotMessage: rect(snapshotMessage),
      snapshotClientWidth: snapshot.clientWidth,
      snapshotScrollWidth: snapshot.scrollWidth,
      visibleSnapshotChildren: Array.from(snapshot.children).every((element) => {
        const box = element.getBoundingClientRect();
        return box.width > 0 && box.height > 0 && box.left >= snapshot.getBoundingClientRect().left - 1
          && box.right <= snapshot.getBoundingClientRect().right + 1;
      }),
    };
  });
  assert.ok(
    metrics.snapshot.width >= metrics.viewportWidth * 0.65,
    `${width}px snapshot width ${metrics.snapshot.width}px must use at least 65% of the viewport.`,
  );
  assert.ok(
    metrics.snapshot.width >= metrics.banner.width * 0.98,
    `${width}px snapshot width ${metrics.snapshot.width}px must use the available Review-stage width.`,
  );
  assert.ok(
    metrics.bannerCopy.width >= metrics.banner.width * 0.8,
    `${width}px Review banner copy width ${metrics.bannerCopy.width}px must not collapse.`,
  );
  assert.ok(
    metrics.snapshotHeaderCopy.width >= metrics.snapshot.width * 0.8,
    `${width}px snapshot header width ${metrics.snapshotHeaderCopy.width}px must not collapse.`,
  );
  assert.ok(
    metrics.snapshotMessage.width >= metrics.snapshot.width * 0.75,
    `${width}px snapshot content width ${metrics.snapshotMessage.width}px must remain readable.`,
  );
  assert.ok(
    metrics.bannerHeading.height / metrics.bannerHeading.width < 1,
    `${width}px Review heading must not wrap letter-by-letter.`,
  );
  assert.ok(
    metrics.snapshotHeading.height / metrics.snapshotHeading.width < 1,
    `${width}px snapshot heading must not wrap letter-by-letter.`,
  );
  assert.ok(
    metrics.bannerStatus.top >= metrics.bannerCopy.bottom - 1,
    `${width}px Review status must stack below the heading copy.`,
  );
  assert.ok(
    metrics.snapshotStatus.top >= metrics.snapshotHeaderCopy.bottom - 1,
    `${width}px snapshot status must stack below the header copy.`,
  );
  assert.ok(
    metrics.snapshotScrollWidth <= metrics.snapshotClientWidth + 1,
    `${width}px snapshot must not clip or scroll horizontally.`,
  );
  assert.equal(metrics.visibleSnapshotChildren, true, `${width}px snapshot children must remain fully visible.`);
  return metrics;
}

test('Module 3 M3-A preserves workflow while fixing Screen 5 and Screen 11 responsive presentation', {
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

  await seedModule3(page, 'M3-R05', 4);
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-5`);
  await page.getByRole('heading', { level: 1, name: 'Context and Inequality Scan' }).waitFor();

  // Stage 1: Select 2 context factors
  await page.getByRole('heading', { name: 'Stage 1: Select priority context factors' }).waitFor();
  const contextCards = page.locator('.m3-context-choice-card');
  assert.ok(await contextCards.count() >= 4);
  await contextCards.nth(0).click();
  await contextCards.nth(1).click();

  // Advance to Stage 2
  await page.getByRole('button', { name: 'Continue to Stage 2' }).click();

  // Stage 2: Select affected group
  await page.getByRole('heading', { name: /Stage 2.*Select primary affected group/ }).waitFor();
  const groupCards = page.locator('.m3-context-choice-card');
  await groupCards.first().click();

  // Verify generated insight appears
  await page.getByRole('heading', { name: 'Generated Context & Inequality Insight' }).waitFor();
  const insightText = await page.locator('.m3-insight-statement').textContent();
  assert.ok(insightText.includes('Jiru Amba'));

  await screenshot(page, 'screen-05-practice-desktop.png');
  await assertNoHorizontalOverflow(page, 'Screen 5 desktop Practice');

  // Save and continue to Screen 6
  await page.getByRole('button', { name: /Save scan and continue/ }).click();
  await page.waitForURL(/\/module-3\/screen-3-6$/);

  // Verify persistence: return to Screen 5 and check collapsed Stage 1 summary
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-5`);
  await page.getByRole('heading', { level: 1, name: 'Context and Inequality Scan' }).waitFor();


  await seedModule3(page, 'M3-R11', 10);
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-11`);
  await page.getByRole('heading', { level: 1, name: 'Gender and Disability Design Check' }).waitFor();
  const stageIds = [
    'm3-s11-stage-understand',
    'm3-s11-stage-example',
    'm3-s11-stage-practice',
    'm3-s11-stage-review',
    'm3-s11-stage-apply',
  ];
  for (const stageId of stageIds) {
    assert.equal(await page.locator(`[data-testid="${stageId}"]`).count(), 1);
  }
  await page.getByRole('button', { name: 'Continue to worked example' }).click();
  await page.getByRole('button', { name: 'Start practice' }).click();
  assert.equal(await page.locator('[data-testid="m3-s11-generate-panel"]').count(), 1);
  await page.locator('[data-testid="m3-s11-generate-panel"]').getByText('0 of 12 requirements complete').waitFor();

  const classificationSelects = page.getByLabel(/^Classification for /);
  assert.equal(await classificationSelects.count(), 6);
  await classificationSelects.first().focus();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  assert.equal(await classificationSelects.first().inputValue(), 'mentioned');
  for (let index = 1; index < 6; index += 1) {
    await classificationSelects.nth(index).selectOption('mentioned');
  }
  await page.locator('[data-testid="m3-s11-design-area-tile"]').first().click();
  for (const field of [
    'genderConsideration',
    'disabilityConsideration',
    'designAdaptation',
    'responsibleRole',
    'watchPoint',
  ]) {
    await page.locator(`[data-testid="m3-s11-${field}-select"]`).selectOption({ index: 1 });
  }
  const screen11Panel = page.locator('[data-testid="m3-s11-generate-panel"]');
  await screen11Panel.getByText('12 of 12 requirements complete').waitFor();
  await screen11Panel.getByText('Ready to generate', { exact: true }).waitFor();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await assertNoHorizontalOverflow(page, 'Screen 11 desktop Practice');
  const desktopRow = page.locator('[data-testid="m3-s11-classification-row"]').first();
  const desktopBoxes = await desktopRow.locator('span, select').evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect()));
  assert.ok(desktopBoxes[1].x > desktopBoxes[0].x, 'Desktop classification keeps the clear two-column row.');
  await screenshot(page, 'screen-11-practice-desktop.png');

  for (const [width, name] of [
    [768, 'screen-11-practice-tablet.png'],
    [390, 'screen-11-practice-390.png'],
    [320, 'screen-11-practice-320.png'],
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await assertNoHorizontalOverflow(page, `Screen 11 ${width}px Practice`);
    const row = page.locator('[data-testid="m3-s11-classification-row"]').first();
    const statement = await row.locator('span').first().boundingBox();
    const select = await row.locator('select').boundingBox();
    assert.ok(select.y >= statement.y + statement.height - 1, `${width}px row must stack the classification below its statement.`);
    await screenshot(page, name);
  }

  await page.setViewportSize({ width: 390, height: 900 });
  const firstClassification = classificationSelects.first();
  await firstClassification.focus();
  assert.equal(await firstClassification.evaluate((element) => document.activeElement === element), true);
  assert.notEqual(await firstClassification.evaluate((element) => getComputedStyle(element).outlineStyle), 'none');
  await firstClassification.press('Tab');
  assert.notEqual(await page.evaluate(() => document.activeElement?.tagName), 'BODY');
  await firstClassification.press('Shift+Tab');
  const generateInclusion = screen11Panel.getByRole('button', { name: 'Generate inclusion check' });
  await generateInclusion.focus();
  await page.keyboard.press('Enter');
  await page.locator('[data-testid="m3-s11-stage-review"][aria-current="step"]').waitFor();
  await screenshot(page, 'screen-11-review-390.png');
  await page.getByRole('button', { name: 'Go to Apply/Download' }).click();
  await page.locator('[data-testid="m3-s11-stage-apply"][aria-current="step"]').waitFor();
  await page.locator('[data-testid="m3-s11-final-continue"]').click();
  await page.waitForURL(/\/module-3\/screen-3-12$/);
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-11`);
  await page.locator('[data-testid="m3-s11-stage-review"][aria-current="step"]').waitFor();
  assert.equal(await page.locator('[data-testid="m3-s11-final-continue"]').count(), 0);

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${APP_ORIGIN}/module-3/screen-3-4`);
  await page.getByRole('heading', { level: 1, name: 'HRBA Project Design Improvement Snapshot' }).waitFor();
  await screenshot(page, 'screen-04-improvement-snapshot-desktop.png');

  await page.goto(`${APP_ORIGIN}/module-4/screen-4-1`);
  await page.getByRole('main').waitFor();
  await assertNoHorizontalOverflow(page, 'Module 4 shell smoke');
  await page.goto(`${APP_ORIGIN}/module-5/screen-5-1`);
  await page.getByRole('main').waitFor();
  await assertNoHorizontalOverflow(page, 'Module 5 shell smoke');

  assert.deepEqual(browserErrors, []);
});
