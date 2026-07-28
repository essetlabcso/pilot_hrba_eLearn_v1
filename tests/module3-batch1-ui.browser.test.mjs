import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const APP_PORT = 43211;
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
      // Retry
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
  await page.goto(`${APP_ORIGIN}/?moduleId=module_03_project_design&screenId=${currentScreenId}`);
  await page.waitForLoadState('domcontentloaded');
}

test('Module 3 Batch 1 (Screens 1-8) browser UI verification across viewports', async (t) => {
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

    // 1. Verify Screen 1 (Orientation Video & Takeaways)
    await seedModule3(page, 'M3-R01', 0);
    await page.goto(`${APP_ORIGIN}/module-3/screen-3-1`);
    const skipBtn = page.locator('button', { hasText: 'Skip to Roadmap' });
    await skipBtn.waitFor({ timeout: 5000 });
    assert.ok(await skipBtn.isVisible(), `Screen 1 Skip button must be visible at ${viewport.width}x${viewport.height}`);

    // 2. Verify Screen 2 (Learning Objectives & Roadmap)
    await seedModule3(page, 'M3-R02', 1);
    await page.goto(`${APP_ORIGIN}/module-3/screen-3-2`);
    const s2StartBtn = page.locator('button', { hasText: 'Start the First Design Lesson' });
    await s2StartBtn.waitFor({ timeout: 5000 });
    assert.ok(await s2StartBtn.isEnabled(), `Screen 2 Start button must be enabled at ${viewport.width}x${viewport.height}`);

    // 3. Verify Screen 3 (Meet the Jiru Amba Futures Plan)
    await seedModule3(page, 'M3-R03', 2);
    await page.goto(`${APP_ORIGIN}/module-3/screen-3-3`);
    const s3ContinueBtn = page.locator('button.m3-primary-button');
    await s3ContinueBtn.waitFor({ timeout: 5000 });
    assert.ok(await s3ContinueBtn.isVisible(), `Screen 3 Continue button must be visible at ${viewport.width}x${viewport.height}`);

    // 4. Verify Screen 4 (Snapshot Preview)
    await seedModule3(page, 'M3-R04', 3);
    await page.goto(`${APP_ORIGIN}/module-3/screen-3-4`);
    const s4ContinueBtn = page.locator('button.m3-primary-button');
    await s4ContinueBtn.waitFor({ timeout: 5000 });
    assert.ok(await s4ContinueBtn.isVisible(), `Screen 4 Continue button must be visible at ${viewport.width}x${viewport.height}`);

    // 5. Verify Screen 6 (Policy and Standards Map — 3-match activity)
    await seedModule3(page, 'M3-R06', 5);
    await page.goto(`${APP_ORIGIN}/module-3/screen-3-6`);
    const s6Selects = page.locator('.m3-matching-card select');
    await s6Selects.nth(0).waitFor({ timeout: 5000 });
    await s6Selects.nth(0).selectOption('access-barriers');
    await s6Selects.nth(1).selectOption('influence-not-headcount');
    await s6Selects.nth(2).selectOption('feedback-response');

    const s6Continue = page.locator('button.m3-primary-button');
    await s6Continue.waitFor({ timeout: 3000 });
    assert.equal(await s6Continue.getAttribute('disabled'), null, 'Screen 6 Continue button must be enabled when 3 matches are complete');

    // 6. Verify Screen 7 (Rights-Holders and Barriers — 2-part mini practice)
    await seedModule3(page, 'M3-R07', 6);
    await page.goto(`${APP_ORIGIN}/module-3/screen-3-7`);
    const groupBtns = page.locator('.m3-rights-choice-btn');
    await groupBtns.nth(0).waitFor({ timeout: 5000 });
    await groupBtns.nth(0).click();
    await groupBtns.nth(1).click();

    const barrierSelects = page.locator('.m3-assignment-row select');
    await barrierSelects.nth(0).waitFor({ timeout: 3000 });
    await barrierSelects.nth(0).selectOption('access');
    await barrierSelects.nth(1).selectOption('power');

    const s7Continue = page.locator('button.m3-primary-button');
    assert.equal(await s7Continue.getAttribute('disabled'), null, 'Screen 7 Continue button must be enabled when 2 groups and 2 barriers are assigned');

    // 7. Verify Screen 8 (Duty-Bearers, Supporting Actors and CSO Roles)
    await seedModule3(page, 'M3-R08', 7);
    const s8Continue = page.locator('button.m3-primary-button');
    await s8Continue.waitFor({ timeout: 5000 });
    assert.equal(await s8Continue.getAttribute('disabled'), null, 'Screen 8 Continue button must be enabled with default valid selections');

    await context.close();
  }
});
