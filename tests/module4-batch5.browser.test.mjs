import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import {
  MODULE4_ID,
  createInitialModule4EnhancedState,
} from '../src/data/module4/module4EnhancedModel.ts';
import {
  MODULE4_KNOWLEDGE_QUESTIONS,
  MODULE4_REQUIRED_ACTIVITY_SCREEN_IDS,
} from '../src/data/module4/module4EnhancedFinalRules.ts';
import {
  saveImplementationDecisionNote,
} from '../src/data/module4/module4EnhancedBatch4Rules.ts';

const APP_PORT = 43175;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const SCREEN_14_URL = `${APP_ORIGIN}/module-4/screen-4-13`;
const SCREENSHOT_DIR = resolve('docs/module-review/module4/screenshots/final-batch');

const COMPLETE_NOTE = {
  concern: 'Check whether the health-post access improvement works in practice.',
  evidence: 'Completion was reported; usability still needs checking.',
  affectedPeople: 'People with disabilities and caregivers may be excluded.',
  response: 'Adjust the consultation venue and engage the responsible actor.',
  rolesAndInclusion: 'Awra coordinates follow-up; the public actor owns the repair.',
  participationAction: 'Review the adjustment with affected groups.',
  accountBack: 'Explain the action, reasons and next review through accessible channels.',
  followUpQuestion: 'Is the accessible entrance ready and usable?',
  responsibleActor: 'Health-post management',
  reviewPoint: 'Within fourteen days',
};

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
  throw lastError || new Error('Timed out waiting for the Module 4 final-batch server.');
}

function browserSeedState() {
  let enhanced = createInitialModule4EnhancedState('2026-07-26T10:00:00.000Z');
  enhanced = saveImplementationDecisionNote(enhanced, COMPLETE_NOTE, {
    learnerEditedSections: ['followUpQuestion'],
    updatedAt: '2026-07-26T10:10:00.000Z',
  });
  enhanced = {
    ...enhanced,
    screens: {
      ...enhanced.screens,
      ...Object.fromEntries(MODULE4_REQUIRED_ACTIVITY_SCREEN_IDS.map((screenId) => [
        screenId,
        { gateSatisfied: true, completedAt: '2026-07-26T10:20:00.000Z' },
      ])),
    },
  };
  return {
    storageVersion: STORAGE_KEY,
    currentLayer: 'player',
    currentCourseId: 'hrba_course',
    currentModuleId: MODULE4_ID,
    currentScreenId: 'M4-S1-13',
    completedModules: [
      'module_01_hrba_foundations',
      'module_02_everyday_cso_work',
      'module_03_project_design',
    ],
    screenProgress: {
      [MODULE4_ID]: [...MODULE4_REQUIRED_ACTIVITY_SCREEN_IDS],
    },
    practiceCheckState: { module4Enhanced: enhanced },
  };
}

function questionById(questionId) {
  return MODULE4_KNOWLEDGE_QUESTIONS.find((question) => question.id === questionId);
}

function choiceFor(questionId, correct) {
  const question = questionById(questionId);
  return question.choices.find((choice) => Boolean(choice.correct) === correct);
}

async function chooseWithKeyboard(page, choiceText) {
  const radio = page.getByRole('radio', { name: choiceText });
  await page.keyboard.press('Tab');
  await radio.focus();
  assert.equal(await radio.evaluate((element) => document.activeElement === element), true);
  const focusStyle = await radio.evaluate((element) => {
    const label = element.closest('label');
    return label ? getComputedStyle(label).outlineStyle : 'none';
  });
  assert.notEqual(focusStyle, 'none', 'keyboard focus must be visibly outlined');
  await page.keyboard.press('Space');
  assert.equal(await radio.isChecked(), true);
}

async function assertNoHorizontalOverflow(page, width, height = 900) {
  await page.setViewportSize({ width, height });
  assert.equal(
    await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth),
    false,
    `final screens must not overflow horizontally at ${width}px`,
  );
}

test('Screens 14–15 support persisted retry, keyboard completion, mobile reflow and final-gate-only completion', {
  timeout: 90_000,
}, async (t) => {
  await mkdir(SCREENSHOT_DIR, { recursive: true });
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

  const page = await context.newPage();
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });
  await page.goto(APP_ORIGIN);
  await page.getByRole('heading', { level: 1, name: 'CSO Learning Hub' }).waitFor();
  await page.evaluate(({ storageKey, seedState }) => {
    const current = JSON.parse(localStorage.getItem(storageKey));
    localStorage.setItem(storageKey, JSON.stringify({
      ...current,
      ...seedState,
      practiceCheckState: {
        ...current.practiceCheckState,
        ...seedState.practiceCheckState,
      },
    }));
  }, { storageKey: STORAGE_KEY, seedState: browserSeedState() });
  await page.goto(SCREEN_14_URL);
  await page.getByRole('heading', {
    level: 1,
    name: 'Check your implementation decisions',
  }).waitFor();
  await page.waitForTimeout(650);

  await assertNoHorizontalOverflow(page, 1440, 1200);
  await page.screenshot({ path: resolve(SCREENSHOT_DIR, 'screen14-desktop.png') });
  await assertNoHorizontalOverflow(page, 390, 2000);
  await page.screenshot({ path: resolve(SCREENSHOT_DIR, 'screen14-mobile-390.png') });
  await assertNoHorizontalOverflow(page, 320, 2200);
  await page.screenshot({ path: resolve(SCREENSHOT_DIR, 'screen14-mobile-320.png') });
  await page.setViewportSize({ width: 1440, height: 900 });

  const firstWrong = choiceFor('M4-KC-Q01', false);
  await chooseWithKeyboard(page, firstWrong.text);
  await page.getByRole('button', { name: 'Check answer' }).click();
  assert.equal(await page.getByText(firstWrong.feedback, { exact: true }).count(), 1);
  assert.equal(await page.getByRole('radio', { name: firstWrong.text }).isDisabled(), true);
  await page.getByRole('button', { name: 'Next question' }).click();

  const secondCorrect = choiceFor('M4-KC-Q02', true);
  await chooseWithKeyboard(page, secondCorrect.text);
  await page.waitForTimeout(150);
  await page.reload();
  assert.equal(
    await page.getByRole('radio', { name: secondCorrect.text }).isChecked(),
    true,
    'first-attempt selection must survive refresh',
  );
  await page.getByRole('button', { name: 'Check answer' }).click();
  await page.getByRole('button', { name: 'Next question' }).click();

  for (const questionId of ['M4-KC-Q03', 'M4-KC-Q04', 'M4-KC-Q05', 'M4-KC-Q06', 'M4-KC-Q07']) {
    const choice = choiceFor(questionId, true);
    await chooseWithKeyboard(page, choice.text);
    await page.getByRole('button', { name: 'Check answer' }).click();
    await page.getByRole('button', { name: 'Next question' }).click();
  }

  const eighthWrong = choiceFor('M4-KC-Q08', false);
  await chooseWithKeyboard(page, eighthWrong.text);
  await page.getByRole('button', { name: 'Check answer' }).click();
  await page.getByRole('heading', { level: 2, name: 'You answered 6 out of 8 correctly.' }).waitFor();
  const beforeRetry = JSON.parse(await page.evaluate(
    (storageKey) => localStorage.getItem(storageKey),
    STORAGE_KEY,
  ));
  assert.equal(beforeRetry.completedModules.includes(MODULE4_ID), false);
  assert.equal(beforeRetry.screenProgress[MODULE4_ID].includes('M4-S1-13'), false);

  await page.getByRole('button', { name: 'Retry missed questions' }).click();
  const firstCorrect = choiceFor('M4-KC-Q01', true);
  await chooseWithKeyboard(page, firstCorrect.text);
  await page.getByRole('button', { name: 'Check answer' }).click();
  await page.reload();
  assert.equal(
    await page.getByText(firstCorrect.feedback, { exact: true }).count(),
    1,
    'checked retry feedback must survive refresh',
  );
  await page.getByRole('button', { name: 'Next question' }).click();
  const eighthCorrect = choiceFor('M4-KC-Q08', true);
  await chooseWithKeyboard(page, eighthCorrect.text);
  await page.getByRole('button', { name: 'Check answer' }).click();
  await page.getByRole('heading', { level: 2, name: 'You passed with 8 out of 8.' }).waitFor();

  await page.getByRole('button', { name: 'Continue to final confirmation' }).click();
  await page.getByRole('heading', { level: 1, name: 'Confirm Module 4 completion' }).waitFor();
  await page.waitForTimeout(650);
  assert.equal(await page.getByText('Complete', { exact: true }).count() >= 1, true);
  assert.equal(await page.getByText('Saved and current', { exact: true }).count() >= 1, true);
  assert.equal(await page.getByText('Passed — 8/8', { exact: true }).count(), 1);
  const finalAction = page.getByRole('button', {
    name: 'Complete Module 4 and continue to Module 5',
  });
  assert.equal(await finalAction.isDisabled(), true);

  await assertNoHorizontalOverflow(page, 1440, 1500);
  await page.screenshot({ path: resolve(SCREENSHOT_DIR, 'screen15-desktop.png') });
  await assertNoHorizontalOverflow(page, 390, 2400);
  await page.screenshot({ path: resolve(SCREENSHOT_DIR, 'screen15-mobile-390.png') });
  await assertNoHorizontalOverflow(page, 320, 2600);
  await page.screenshot({ path: resolve(SCREENSHOT_DIR, 'screen15-mobile-320.png') });

  const confirmations = page.getByRole('checkbox');
  assert.equal(await confirmations.count(), 3);
  for (let index = 0; index < 3; index += 1) {
    const checkbox = confirmations.nth(index);
    await checkbox.focus();
    await page.keyboard.press('Space');
    assert.equal(await checkbox.isChecked(), true);
    if (index < 2) {
      await page.keyboard.press('Tab');
      assert.equal(
        await confirmations.nth(index + 1).evaluate((element) => document.activeElement === element),
        true,
      );
    }
  }
  assert.equal(await finalAction.isEnabled(), true);

  const beforeCompletion = JSON.parse(await page.evaluate(
    (storageKey) => localStorage.getItem(storageKey),
    STORAGE_KEY,
  ));
  assert.equal(beforeCompletion.completedModules.includes(MODULE4_ID), false);
  assert.equal(beforeCompletion.screenProgress[MODULE4_ID].includes('M4-S1-14'), false);

  await finalAction.click();
  await page.waitForTimeout(250);
  assert.equal(page.url(), `${APP_ORIGIN}/module-5/cover`);
  const completed = JSON.parse(await page.evaluate(
    (storageKey) => localStorage.getItem(storageKey),
    STORAGE_KEY,
  ));
  assert.equal(completed.completedModules.filter((id) => id === MODULE4_ID).length, 1);
  assert.equal(completed.screenProgress[MODULE4_ID].filter((id) => id === 'M4-S1-14').length, 1);
  assert.equal(completed.currentModuleId, 'module_05_hrba_meal');
  assert.equal(completed.currentScreenId, 'M5-PLAYER-00');
  assert.deepEqual(browserErrors, []);
});
