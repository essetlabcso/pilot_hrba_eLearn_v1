import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import {
  MODULE5_FINAL_KNOWLEDGE_QUESTIONS,
  MODULE5_PRESENTATION_CONTENT,
} from '../src/data/module5/module5PresentationContent.ts';
import {
  MODULE5_ID,
  createEmptyModule5PresentationScreenState,
  createEmptyModule5PresentationState,
} from '../src/data/module5/module5EnhancedModel.ts';

const APP_PORT = 43192;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const SCREENSHOT_DIR = process.env.MODULE5_FINAL_SCREENSHOT_DIR;

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
  throw lastError || new Error('Timed out waiting for the Module 5 final-screen server.');
}

function finalScreenSeed() {
  const presentation = createEmptyModule5PresentationState();
  for (const [screenId, content] of Object.entries(MODULE5_PRESENTATION_CONTENT)) {
    const screen = createEmptyModule5PresentationScreenState();
    for (const question of content.questions) {
      screen.answers[question.id] = [...question.correctOptionIds];
      screen.checkedIds.push(question.id);
      screen.correctIds.push(question.id);
    }
    for (const prompt of content.reflections) {
      const value = prompt.control === 'paired-text'
        ? ['Triangulation', 'Review template']
        : prompt.control === 'stage-pair'
          ? ['Monitor', 'Account']
          : prompt.options?.[0] || `Generalized ${prompt.id}`;
      screen.reflectionValues[prompt.id] = value;
      screen.reflectionRevisions[prompt.id] = 1;
    }
    screen.reflectionRevision = content.reflections.length;
    screen.gateSatisfied = true;
    screen.status = 'completed';
    screen.completedAt = '2026-07-27T10:00:00.000Z';
    presentation.screens[screenId] = screen;
  }
  return presentation;
}

async function assertNoHorizontalOverflow(page, width, height = 900) {
  await page.setViewportSize({ width, height });
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth),
    false,
    `Module 5 final screens must not overflow horizontally at ${width}px`,
  );
}

async function answerActiveQuestion(page, correct) {
  const questionId = await page.locator('.m5f-question .m5f-eyebrow').textContent();
  const question = MODULE5_FINAL_KNOWLEDGE_QUESTIONS.find((item) => item.id === questionId.trim());
  const option = question.options.find((item) =>
    correct === question.correctOptionIds.includes(item.id));
  const radio = page.getByRole('radio', { name: new RegExp(option.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
  await radio.focus();
  await page.keyboard.press('Space');
  assert.equal(await radio.isChecked(), true);
  await page.getByRole('button', { name: 'Check answer' }).press('Enter');
  await page.getByText(option.feedback, { exact: true }).waitFor();
}

test('Module 5 final screens support retry, carry-forward review, dependency reconfirmation and final completion', {
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

  await page.goto(APP_ORIGIN);
  await page.getByRole('heading', { level: 1, name: 'CSO Learning Hub' }).waitFor();
  const presentation = finalScreenSeed();
  await page.evaluate(({ storageKey, presentationState }) => {
    const current = JSON.parse(localStorage.getItem(storageKey));
    localStorage.setItem(storageKey, JSON.stringify({
      ...current,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: 'module_05_hrba_meal',
      currentScreenId: 'M5-R13',
      completedModules: [
        'module_01_hrba_foundations',
        'module_02_everyday_cso_work',
        'module_03_project_design',
        'module_04_implementation',
      ],
      screenProgress: {
        ...current.screenProgress,
        module_05_hrba_meal: [
          'M5-R01', 'M5-R02', 'M5-R03', 'M5-R04', 'M5-R05', 'M5-R06',
          'M5-R07', 'M5-R08', 'M5-R09', 'M5-R10', 'M5-R11', 'M5-R12',
        ],
      },
      practiceCheckState: { module5Presentation: presentationState },
      finalAssessmentResult: null,
    }));
  }, { storageKey: STORAGE_KEY, presentationState: presentation });

  await page.goto(`${APP_ORIGIN}/module-5/screen-5-13`);
  await page.getByRole('heading', { level: 1, name: 'Knowledge Check: From Evidence to Action' }).waitFor();
  await page.getByText('Preparing this screen...').waitFor({ state: 'hidden' });
  assert.equal(await page.getByRole('radio').count(), 4);
  await assertNoHorizontalOverflow(page, 1440);
  await assertNoHorizontalOverflow(page, 390, 844);
  await assertNoHorizontalOverflow(page, 320, 760);
  if (SCREENSHOT_DIR) {
    await mkdir(SCREENSHOT_DIR, { recursive: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.screenshot({ path: resolve(SCREENSHOT_DIR, 'screen-14-desktop.png'), fullPage: false });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });

  for (let index = 0; index < 8; index += 1) {
    await answerActiveQuestion(page, index < 6);
    if (index < 7) await page.getByRole('button', { name: 'Next question' }).click();
  }
  const result = page.getByRole('heading', { level: 2, name: 'You answered 6 out of 8 correctly.' });
  await result.waitFor();
  assert.equal(await result.evaluate((element) => element.parentElement === document.activeElement), true);
  await page.getByRole('button', { name: 'Retry missed questions' }).press('Enter');
  await answerActiveQuestion(page, true);
  await page.getByRole('button', { name: 'Next question' }).click();
  const retryRadio = page.getByRole('radio').first();
  await retryRadio.focus();
  await page.reload();
  await page.getByRole('heading', { level: 1, name: 'Knowledge Check: From Evidence to Action' }).waitFor();
  assert.equal(await page.getByText('Retry', { exact: true }).isVisible(), true);
  assert.match(await page.getByText(/Question 2 of 2/).textContent(), /Question 2 of 2/);
  await answerActiveQuestion(page, true);
  await page.getByRole('heading', { level: 2, name: 'You passed with 8 out of 8.' }).waitFor();

  let saved = JSON.parse(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY));
  assert.equal(saved.screenProgress[MODULE5_ID].includes('M5-R13'), true);
  assert.equal(saved.completedModules.includes(MODULE5_ID), false);

  await page.getByRole('button', { name: 'Continue to learning summary' }).click();
  await page.getByRole('heading', { level: 1, name: 'Build Your HRBA MEAL, Accountability and Adaptation Canvas' }).waitFor();
  await page.getByText('Preparing this screen...').waitFor({ state: 'hidden' });
  await page.waitForTimeout(150);
  assert.equal(await page.locator('.m5f-summary-card').count(), 9);
  assert.equal(await page.locator('.m5f-summary-card textarea').count(), 0);
  assert.equal(await page.getByText('Carried forward', { exact: true }).count() > 0, true);
  await assertNoHorizontalOverflow(page, 1440);
  await assertNoHorizontalOverflow(page, 390, 844);
  await assertNoHorizontalOverflow(page, 320, 760);
  if (SCREENSHOT_DIR) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: resolve(SCREENSHOT_DIR, 'screen-15-mobile-390.png'), fullPage: false });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });

  const priorityCard = page.locator('.m5f-summary-card').filter({ hasText: 'Priority result or learning question' });
  await priorityCard.getByRole('radio', { name: /M5-S05-R03/ }).click();
  const knowledgeCard = page.locator('.m5f-summary-card').filter({ hasText: 'MEAL knowledge to deepen' });
  await knowledgeCard.getByRole('button', { name: 'Make a limited edit' }).click();
  const knowledgeEdit = knowledgeCard.getByLabel('Edit MEAL knowledge to deepen');
  await knowledgeEdit.fill('Bounded contribution');
  await page.waitForTimeout(250);
  const beforeSummaryRefresh = JSON.parse(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY));
  assert.equal(beforeSummaryRefresh.practiceCheckState.module5Presentation.summary.values.future_meal_knowledge, 'Bounded contribution');
  await page.reload();
  await page.getByRole('heading', { level: 1, name: 'Build Your HRBA MEAL, Accountability and Adaptation Canvas' }).waitFor();
  assert.equal(await page.locator('.m5f-current-value').filter({ hasText: 'Bounded contribution' }).count() > 0, true);

  await page.goto(`${APP_ORIGIN}/module-5/screen-5-12`);
  await page.getByRole('heading', { level: 1, name: 'Learning and Adaptation: Dashboard, Decisions and Account-Back' }).waitFor();
  const reflection = page.locator('.m5p-reflection').filter({ hasText: 'What future MEAL knowledge do you most need to deepen?' });
  const reflectionInput = reflection.getByLabel('Your concise response');
  await reflectionInput.fill('Equity-focused contribution');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('heading', { level: 1, name: 'Knowledge Check: From Evidence to Action' }).waitFor();
  await page.getByRole('button', { name: 'Continue to learning summary' }).click();
  await page.getByRole('heading', { level: 1, name: 'Build Your HRBA MEAL, Accountability and Adaptation Canvas' }).waitFor();
  const reviewedKnowledge = page.locator('.m5f-summary-card').filter({ hasText: 'MEAL knowledge to deepen' });
  await reviewedKnowledge.getByText('Needs review', { exact: true }).waitFor();
  assert.equal(await page.getByRole('button', { name: 'Confirm learning summary' }).isEnabled(), false);
  assert.equal(await reviewedKnowledge.locator('.m5f-current-value').filter({ hasText: 'Bounded contribution' }).count() > 0, true);
  await reviewedKnowledge.getByRole('button', { name: 'Keep my edited wording' }).click();

  const confirmation = page.getByRole('checkbox', {
    name: /I reviewed this concise learning and future-support summary/,
  });
  await confirmation.focus();
  await page.keyboard.press('Space');
  await page.getByRole('button', { name: 'Confirm learning summary' }).press('Enter');
  await page.getByRole('heading', { level: 1, name: 'Portfolio Review and Module Closure' }).waitFor();
  await page.locator('.course-screen-loading').waitFor({ state: 'detached' });
  assert.equal(await page.locator('.m5f-closure-review textarea').count(), 0);
  assert.equal(await page.getByText('Bounded contribution', { exact: true }).count() > 0, true);
  await assertNoHorizontalOverflow(page, 1440);
  await assertNoHorizontalOverflow(page, 390, 844);
  await assertNoHorizontalOverflow(page, 320, 760);
  if (SCREENSHOT_DIR) {
    await page.setViewportSize({ width: 320, height: 760 });
    await page.screenshot({ path: resolve(SCREENSHOT_DIR, 'screen-16-mobile-320.png'), fullPage: false });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });

  for (const label of [
    'I have reviewed my Module 5 learning summary.',
    'I understand that MEAL evidence should support decisions, accountability and learning.',
    'I am ready to complete Module 5 and continue to the Final Assessment.',
  ]) {
    const box = page.getByRole('checkbox', { name: label });
    await box.focus();
    await page.keyboard.press('Space');
    assert.equal(await box.isChecked(), true);
  }
  await page.getByRole('button', {
    name: 'Complete Module 5 and continue to Final Assessment',
  }).press('Enter');
  await page.waitForURL(`${APP_ORIGIN}/final-assessment/cover`);
  await page.getByRole('heading', { level: 1, name: 'Final Assessment' }).waitFor();

  saved = JSON.parse(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY));
  assert.equal(saved.completedModules.filter((id) => id === MODULE5_ID).length, 1);
  assert.equal(saved.screenProgress[MODULE5_ID].filter((id) => id === 'M5-PLAYER-COMPLETE').length, 1);
  assert.equal(saved.finalAssessmentResult, null);
  assert.deepEqual(browserErrors, []);
});
