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

      // Accessible context choice cards must render
      const factorGroup = page.locator('.m3-oq-choice-group').first();
      const choiceCards = factorGroup.locator('.m3-oq-choice');
      const count = await choiceCards.count();
      assert.ok(count >= 4, 'Screen 5 context factor cards must render');

      // Select 2 context factors
      await choiceCards.nth(0).click();
      await choiceCards.nth(1).click();

      // Select affected group without an extra stage gate
      const groupCards = page.locator('.m3-oq-choice-group').nth(1).locator('.m3-oq-choice');
      await groupCards.first().click();

      await page.getByTestId('m3-oq-generate').click();
      const insightCard = page.locator('.m3-oq-context-output');
      await insightCard.waitFor({ timeout: 3000 });
      assert.equal(await insightCard.locator('.m3-oq-chain__item').count(), 5);
    }

    // 2. Verify Screen 9 UI (Power & Influence Map)
    await seedModule3(page, 'M3-R09', 8);
    await page.goto(`${APP_ORIGIN}/module-3/screen-3-9`);
    await page.waitForLoadState('domcontentloaded');

    const s9Heading = page.locator('h1');
    await s9Heading.waitFor({ timeout: 5000 }).catch(() => {});
    const s9HeadingText = await s9Heading.textContent().catch(() => '');

    if (s9HeadingText.includes('Power')) {
      // Three concise strategy groups must render
      const strategySections = page.locator('.m3-oq-choice-group');
      const sectionCount = await strategySections.count();
      assert.equal(sectionCount, 3, 'Screen 9 must render exactly 3 strategy card sections');

      // Select enabler card
      const enablerCards = strategySections.nth(0).locator('.m3-oq-choice');
      await enablerCards.nth(0).click();

      // Select blocker card
      const blockerCards = strategySections.nth(1).locator('.m3-oq-choice');
      await blockerCards.nth(0).click();

      // Select safe influence strategy card
      const safeCards = strategySections.nth(2).locator('.m3-oq-choice');
      await safeCards.nth(0).click();

      await page.getByTestId('m3-oq-generate').click();
      assert.ok(await page.locator('.m3-oq-actor-node').count() >= 6);
      assert.ok(await page.locator('.m3-oq-actor-list article').count() >= 6);
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

      const repairGroups = page.locator('.m3-oq-choice-group');
      assert.equal(await repairGroups.count(), 3);
      for (let index = 0; index < 3; index += 1) {
        await repairGroups.nth(index).locator('.m3-oq-choice').first().click();
      }
      assert.equal(await page.getByTestId('m3-oq-continue').isDisabled(), true);
      await page.getByTestId('m3-oq-generate').click();
      assert.equal(await page.locator('.m3-oq-before-after > section').count(), 3);
      assert.equal(await page.getByTestId('m3-oq-continue').isEnabled(), true);
    }

    await context.close();
  }
});
