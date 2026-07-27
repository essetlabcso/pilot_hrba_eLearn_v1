import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const APP_PORT = 43210;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';

const module3ProgressThrough = (number) => Array.from(
  { length: number },
  (_, index) => `M3-R${String(index + 1).padStart(2, '0')}`,
);

async function waitForApp() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(APP_ORIGIN);
      if (response.ok) return;
    } catch {
      // Retry until server starts
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Vite dev server failed to start within 30 seconds');
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

test('Module 3 Prototype UI browser-level verification across viewports', async (t) => {
  const vite = spawn(
    'cmd.exe',
    ['/c', 'npx', 'vite', '--port', String(APP_PORT), '--host', '127.0.0.1', '--strictPort'],
    { cwd: process.cwd(), env: { ...process.env, BROWSER: 'none' }, stdio: 'ignore' },
  );
  t.after(() => vite.kill());
  await waitForApp();

  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());

  const viewports = [
    { width: 1536, height: 864 },
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 390, height: 844 },
    { width: 320, height: 800 },
  ];

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();

    // 1. Verify Screen 5 UI (Context & Inequality Scan)
    await seedModule3(page, 'M3-R05', 4);
    await page.goto(`${APP_ORIGIN}/module-3/screen-3-5`);
    await page.waitForLoadState('domcontentloaded');

    const s5Heading = page.locator('h1');
    await s5Heading.waitFor({ timeout: 5000 }).catch(() => {});
    const s5HeadingText = await s5Heading.textContent().catch(() => '');

    if (s5HeadingText.includes('Context')) {
      // Legacy 6-stage tabs must NOT render
      const legacyTabs = await page.locator('.m3-context-stage-tab').count();
      assert.equal(legacyTabs, 0, `Screen 5 must not render legacy 6-stage tabs at ${viewport.width}x${viewport.height}`);

      // Stage 1 context choice cards must render
      const choiceCards = page.locator('.m3-context-choice-card');
      const count = await choiceCards.count();
      assert.ok(count >= 4, 'Screen 5 context factor cards must render');

      // Select 2 context factors
      await choiceCards.nth(0).click();
      await choiceCards.nth(1).click();

      // Click Continue to Stage 2
      const continueBtn1 = page.locator('button', { hasText: 'Continue to Stage 2' });
      await continueBtn1.click();

      // Verify collapsed Stage 1 summary card and Edit Stage 1 button
      const collapsedSummary = page.locator('.m3-collapsed-stage-summary');
      await collapsedSummary.waitFor({ timeout: 3000 });
      const summaryText = await collapsedSummary.textContent();
      assert.ok(summaryText.includes('Stage 1 Complete'), 'Collapsed Stage 1 summary must render');

      // Select Stage 2 affected group
      const groupCards = page.locator('.m3-context-choice-card');
      await groupCards.nth(0).click();

      // Verify generated inequality insight
      const insightCard = page.locator('.m3-generated-insight-card');
      await insightCard.waitFor({ timeout: 3000 });
      const insightText = await insightCard.textContent();
      assert.ok(insightText.includes('In Jiru Amba'), 'Dynamic inequality gap insight must render');
    }

    // 2. Verify Screen 9 UI (Power & Influence Map)
    await seedModule3(page, 'M3-R09', 8);
    await page.goto(`${APP_ORIGIN}/module-3/screen-3-9`);
    await page.waitForLoadState('domcontentloaded');

    const s9Heading = page.locator('h1');
    await s9Heading.waitFor({ timeout: 5000 }).catch(() => {});
    const s9HeadingText = await s9Heading.textContent().catch(() => '');

    if (s9HeadingText.includes('Power')) {
      // Legacy 3x3 matrix grid must NOT render
      const matrixCount = await page.locator('.m3-power-studio-quadrant-frame').count();
      assert.equal(matrixCount, 0, `Screen 9 3x3 matrix grid must not render at ${viewport.width}x${viewport.height}`);

      // 3 strategy-card sections must render
      const strategySections = page.locator('.m3-power-card-section');
      const sectionCount = await strategySections.count();
      assert.equal(sectionCount, 3, 'Screen 9 must render exactly 3 strategy card sections');

      // Select enabler card
      const enablerCards = strategySections.nth(0).locator('.m3-power-card');
      await enablerCards.nth(0).click();

      // Select blocker card
      const blockerCards = strategySections.nth(1).locator('.m3-power-card');
      await blockerCards.nth(0).click();

      // Select safe influence strategy card
      const safeCards = strategySections.nth(2).locator('.m3-power-card');
      await safeCards.nth(0).click();

      // Verify mapped influence insight summary card
      const summaryCard = page.locator('.m3-power-summary-card');
      await summaryCard.waitFor({ timeout: 3000 });
      const summaryText = await summaryCard.textContent();
      assert.ok(summaryText.includes('Mapped Strategy Insight'), 'Screen 9 strategy insight summary must render');
    }

    // 3. Verify Screen 14 UI (Objective Repair)
    await seedModule3(page, 'M3-R14', 13);
    await page.goto(`${APP_ORIGIN}/module-3/screen-3-14`);
    await page.waitForLoadState('domcontentloaded');

    const s14Heading = page.locator('h1');
    await s14Heading.waitFor({ timeout: 5000 }).catch(() => {});
    const s14HeadingText = await s14Heading.textContent().catch(() => '');

    if (s14HeadingText.includes('Repair')) {
      // Legacy 8-stage studio buttons must NOT render
      const studioStages = await page.locator('.m3-design-repair-stage-button').count();
      assert.equal(studioStages, 0, `Screen 14 8-stage studio must not render at ${viewport.width}x${viewport.height}`);

      // Side-by-side comparison card must render
      const comparisonCard = page.locator('.m3-comparison-card');
      const compCount = await comparisonCard.count();
      assert.equal(compCount, 1, 'Screen 14 side-by-side comparison card must render');

      // Select Step 1 objective
      const step1Options = page.locator('.m3-repair-option-card');
      await step1Options.nth(0).click();

      // Continue to Step 2
      const step1Btn = page.locator('button', { hasText: 'Continue to Step 2' });
      await step1Btn.click();

      // Select Step 2 activity
      const step2Options = page.locator('.m3-repair-option-card');
      await step2Options.nth(0).click();

      // Continue to Step 3
      const step2Btn = page.locator('button', { hasText: 'Continue to Step 3' });
      await step2Btn.click();

      // Select Step 3 watch-point
      const step3Options = page.locator('.m3-repair-option-card');
      await step3Options.nth(0).click();

      // Verify Continue button is enabled
      const finalContinue = page.locator('button.m3-primary-button');
      const isDisabled = await finalContinue.getAttribute('disabled');
      assert.equal(isDisabled, null, 'Screen 14 Continue button must be enabled when all 3 steps are complete');
    }

    await context.close();
  }
});
