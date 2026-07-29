import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright';
import {
  createInitialModule4EnhancedState,
  updateModule4Field,
} from '../src/data/module4/module4EnhancedModel.ts';

const APP_PORT = 43179;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const MODULE4_SCREEN_IDS = Array.from({ length: 14 }, (_, index) => (
  `M4-S1-${String(index + 1).padStart(2, '0')}`
));

async function waitForApp() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(APP_ORIGIN);
      if (response.ok) return;
    } catch {
      // Vite has not started yet.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error('Timed out waiting for the focused Module 4 test server.');
}

function enhancedWithWorkstream() {
  return updateModule4Field(
    createInitialModule4EnhancedState('2026-07-29T09:00:00.000Z'),
    'selectedWorkstream',
    'health_post',
    {
      learnerEdited: true,
      sourceScreenId: 'M4-S1-04',
      updatedAt: '2026-07-29T09:00:00.000Z',
    },
  );
}

async function seedScreen(page, screenId, enhanced = createInitialModule4EnhancedState('2026-07-29T09:00:00.000Z')) {
  await page.goto(APP_ORIGIN);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForFunction((storageKey) => Boolean(localStorage.getItem(storageKey)), STORAGE_KEY);
  await page.evaluate(({ storageKey, screen, module4Enhanced, module4ScreenIds }) => {
    const current = JSON.parse(localStorage.getItem(storageKey));
    localStorage.setItem(storageKey, JSON.stringify({
      ...current,
      currentLayer: 'player',
      currentModuleId: 'module_04_implementation',
      currentScreenId: screen,
      completedModules: [
        'module_01_hrba_foundations',
        'module_02_everyday_cso_work',
        'module_03_project_design',
      ],
      screenProgress: {
        ...current.screenProgress,
        module_04_implementation: module4ScreenIds.slice(0, module4ScreenIds.indexOf(screen)),
      },
      practiceCheckState: {
        ...current.practiceCheckState,
        module4Enhanced,
      },
    }));
  }, {
    storageKey: STORAGE_KEY,
    screen: screenId,
    module4Enhanced: enhanced,
    module4ScreenIds: MODULE4_SCREEN_IDS,
  });
}

async function noHorizontalOverflow(page, label) {
  const widths = await page.evaluate(() => {
    const shell = document.querySelector('.module-player__content, .course-player__content, main');
    return {
      documentClient: document.documentElement.clientWidth,
      documentScroll: document.documentElement.scrollWidth,
      shellClient: shell?.clientWidth || 0,
      shellScroll: shell?.scrollWidth || 0,
    };
  });
  assert.ok(widths.documentScroll <= widths.documentClient + 1, `${label}: page must not overflow`);
  assert.ok(widths.shellScroll <= widths.shellClient + 1, `${label}: learning canvas must not overflow`);
  return widths;
}

test('focused Module 4 screens reflow and simplified decisions persist', {
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

  for (const viewport of [
    { width: 1536, height: 864 },
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 390, height: 844 },
    { width: 360, height: 800 },
    { width: 320, height: 800 },
  ]) {
    const context = await browser.newContext({ viewport });
    await context.route('https://fonts.googleapis.com/**', (route) => route.fulfill({
      contentType: 'text/css',
      body: '',
    }));
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(String(error)));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    await seedScreen(page, 'M4-S1-03');
    await page.goto(`${APP_ORIGIN}/module-4/screen-4-3`);
    const lensHeading = page.getByRole('heading', { level: 1, name: 'The Everyday Rights Lens in Action' });
    await page.waitForTimeout(300);
    assert.equal(
      await lensHeading.isVisible(),
      true,
      `Expected Screen 4 at ${page.url()}; received ${(await page.locator('body').innerText()).slice(0, 260)}`,
    );
    await noHorizontalOverflow(page, `Screen 4 at ${viewport.width}`);
    const lensButtons = page.locator('.m4-enhanced-lens__step');
    assert.equal(await lensButtons.count(), 6);
    assert.equal(await lensButtons.nth(0).getAttribute('aria-current'), 'step');
    await lensButtons.nth(0).click();
    await lensButtons.nth(1).click();
    assert.match(await lensButtons.nth(0).getAttribute('class'), /is-complete/);
    assert.equal(await lensButtons.nth(1).getAttribute('aria-current'), 'step');

    await seedScreen(page, 'M4-S1-04');
    await page.goto(`${APP_ORIGIN}/module-4/screen-4-4`);
    await page.getByRole('heading', { level: 1, name: 'Jiru Amba: Two Months into Implementation' }).waitFor();
    await noHorizontalOverflow(page, `Screen 5 at ${viewport.width}`);
    const evidenceColumns = page.locator('.m4-enhanced-evidence-review__columns');
    const evidenceWidth = await evidenceColumns.evaluate((element) => element.getBoundingClientRect().width);
    assert.ok(
      evidenceWidth >= Math.min(240, viewport.width * 0.6),
      `Screen 5 evidence width ${evidenceWidth}px is too narrow at ${viewport.width}px`,
    );

    await seedScreen(page, 'M4-S1-06', enhancedWithWorkstream());
    await page.goto(`${APP_ORIGIN}/module-4/screen-4-6`);
    await page.getByRole('heading', { level: 1, name: 'Participation with Real Influence' }).waitFor();
    await noHorizontalOverflow(page, `Screen 7 at ${viewport.width}`);
    const stageCards = page.locator('.m4-b2-stage-path > li');
    assert.equal(await stageCards.count(), 4);
    const stageTops = await stageCards.evaluateAll((elements) => (
      [...new Set(elements.map((element) => Math.round(element.getBoundingClientRect().top)))]
    ));
    if (viewport.width <= 390) assert.equal(stageTops.length, 4, 'mobile stage cards must form one column');
    else assert.ok(stageTops.length <= 2, 'desktop and tablet stage cards must use a 4-column or 2×2 rail');

    await seedScreen(page, 'M4-S1-07', enhancedWithWorkstream());
    await page.goto(`${APP_ORIGIN}/module-4/screen-4-7`);
    await page.getByRole('heading', { level: 1, name: 'Accountable Concern, Response and Follow-Up' }).waitFor();
    await noHorizontalOverflow(page, `Screen 8 at ${viewport.width}`);
    assert.equal(await page.locator('.m4-focused-decisions > fieldset').count(), 4);

    await seedScreen(page, 'M4-S1-08', enhancedWithWorkstream());
    await page.goto(`${APP_ORIGIN}/module-4/screen-4-8`);
    await page.getByRole('heading', { level: 1, name: 'Roles, Boundaries and Responsible Action' }).waitFor();
    await noHorizontalOverflow(page, `Screen 9 at ${viewport.width}`);
    assert.equal(await page.locator('.m4-focused-role-map select').count(), 5);

    assert.deepEqual(errors, [], `no browser errors expected at ${viewport.width}px`);
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.route('https://fonts.googleapis.com/**', (route) => route.fulfill({
    contentType: 'text/css',
    body: '',
  }));
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await seedScreen(page, 'M4-S1-04');
  await page.goto(`${APP_ORIGIN}/module-4/screen-4-4`);
  for (let index = 0; index < 4; index += 1) {
    await page.getByRole('button', { name: /Use distinction and review next area/ }).click();
  }
  await page.getByRole('button', { name: /Use distinction and choose a work area/ }).click();
  await page.getByRole('radio', { name: /Health Post/ }).click();
  await page.getByRole('button', { name: 'Continue →' }).click();
  const screen5State = await page.evaluate((storageKey) => JSON.parse(localStorage.getItem(storageKey)), STORAGE_KEY);
  assert.equal(screen5State.practiceCheckState.module4Enhanced.fields.selectedWorkstream.value, 'health_post');
  assert.equal(
    Object.keys(screen5State.practiceCheckState.module4Enhanced.fields.evidenceClassifications.value).length,
    15,
  );

  await seedScreen(page, 'M4-S1-07', enhancedWithWorkstream());
  await page.goto(`${APP_ORIGIN}/module-4/screen-4-7`);
  for (const name of [
    /Awra alone/,
    /Record and wait/,
    /Only what was heard and what will change/,
    /Review only at project end/,
  ]) {
    const radio = page.getByRole('radio', { name });
    await radio.focus();
    await page.keyboard.press('Space');
  }
  await page.getByRole('button', { name: 'Generate response pathway' }).click();
  await page.getByText('Review the evidence.').waitFor();
  for (const name of [
    /responsible actor, supported by Awra/,
    /Adjust now and review/,
    /Concern, change, responsibility, limits and update/,
    /Review participation and response at the next meeting/,
  ]) {
    const radio = page.getByRole('radio', { name });
    await radio.focus();
    await page.keyboard.press('Space');
    assert.equal(await radio.isChecked(), true);
  }
  await page.getByRole('button', { name: 'Generate response pathway' }).click();
  await page.getByRole('heading', { name: 'Generated concern-response pathway' }).waitFor();
  await page.reload();
  await page.getByRole('heading', { name: 'Generated concern-response pathway' }).waitFor();
  const screen8State = await page.evaluate((storageKey) => JSON.parse(localStorage.getItem(storageKey)), STORAGE_KEY);
  assert.equal(screen8State.practiceCheckState.module4Enhanced.batch2.feedbackLoop.pathwaySaved, true);
  assert.ok(screen8State.practiceCheckState.module4Enhanced.fields.feedbackAccountBackActions.updatedAt);

  await seedScreen(page, 'M4-S1-08', enhancedWithWorkstream());
  await page.goto(`${APP_ORIGIN}/module-4/screen-4-8`);
  const roleValues = ['coordinate', 'coordinate', 'duty_bearer', 'avoid', 'cso_directly'];
  const selects = page.locator('.m4-focused-role-map select');
  assert.equal(await selects.count(), 5);
  for (let index = 0; index < roleValues.length; index += 1) {
    await selects.nth(index).selectOption(roleValues[index]);
  }
  for (const name of [
    /Take over the repair/,
    /Escalate immediately in public/,
    /Review only at project end/,
  ]) {
    const radio = page.getByRole('radio', { name });
    await radio.focus();
    await page.keyboard.press('Space');
  }
  await page.getByRole('button', { name: 'Generate responsibility plan' }).click();
  await page.getByText('Review the evidence.').waitFor();
  for (const name of [
    /Support access and seek accountable action/,
    /Engage constructively, with escalation conditions/,
    /Document, update and review after the agreed date/,
  ]) {
    const radio = page.getByRole('radio', { name });
    await radio.focus();
    await page.keyboard.press('Space');
    assert.equal(await radio.isChecked(), true);
  }
  await page.getByRole('button', { name: 'Generate responsibility plan' }).click();
  await page.getByRole('heading', { name: 'Generated responsibility and engagement plan' }).waitFor();
  await page.reload();
  await page.getByRole('heading', { name: 'Generated responsibility and engagement plan' }).waitFor();
  const screen9State = await page.evaluate((storageKey) => JSON.parse(localStorage.getItem(storageKey)), STORAGE_KEY);
  assert.equal(screen9State.practiceCheckState.module4Enhanced.batch3.roles.planSaved, true);
  assert.ok(screen9State.practiceCheckState.module4Enhanced.fields.actorResponsibilities.updatedAt);
  assert.ok(screen9State.practiceCheckState.module4Enhanced.fields.engagementDecisions.updatedAt);
  assert.deepEqual(errors, []);

  await page.getByRole('button', { name: 'Revise decisions' }).focus();
  assert.equal(
    await page.getByRole('button', { name: 'Revise decisions' }).evaluate((element) => document.activeElement === element),
    true,
  );
  await context.close();
});
