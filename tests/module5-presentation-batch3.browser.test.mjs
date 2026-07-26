import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import {
  MODULE5_BATCH2_PRESENTATION_CONTENT_REVISION,
  MODULE5_BATCH3_PRESENTATION_SCREEN_IDS,
  MODULE5_PRESENTATION_CONTENT,
} from '../src/data/module5/module5PresentationContent.ts';
import {
  createEmptyModule5PresentationState,
} from '../src/data/module5/module5EnhancedModel.ts';

const APP_PORT = 43187;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const ALL_PRESENTATION_IDS = [
  'M5-R01', 'M5-R02', 'M5-R03', 'M5-R04',
  'M5-R05', 'M5-R06', 'M5-R07', 'M5-R08',
  ...MODULE5_BATCH3_PRESENTATION_SCREEN_IDS,
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
  throw lastError || new Error('Timed out waiting for the Module 5 Batch 3 server.');
}

async function assertNoHorizontalOverflow(page, width) {
  await page.setViewportSize({ width, height: 1000 });
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth),
    false,
    `Module 5 Batch 3 must not overflow horizontally at ${width}px`,
  );
}

test('Module 5 Batch 3 supports presentation checks, concise reflections, hydration, navigation and final gates', {
  timeout: 120_000,
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
  await context.route('https://www.youtube-nocookie.com/**', (route) => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><title>Presentation test frame</title>',
  }));

  const page = await context.newPage();
  const screenshotDirectory = process.env.MODULE5_BATCH3_SCREENSHOT_DIR;
  if (screenshotDirectory) await mkdir(screenshotDirectory, { recursive: true });
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });
  await page.goto(APP_ORIGIN);
  await page.getByRole('heading', { level: 1, name: 'CSO Learning Hub' }).waitFor();

  for (const screenId of MODULE5_BATCH3_PRESENTATION_SCREEN_IDS) {
    const content = MODULE5_PRESENTATION_CONTENT[screenId];
    const priorProgress = ALL_PRESENTATION_IDS.slice(0, ALL_PRESENTATION_IDS.indexOf(screenId));
    const presentationState = createEmptyModule5PresentationState();
    if (screenId === 'M5-R09') {
      presentationState.contentRevision = MODULE5_BATCH2_PRESENTATION_CONTENT_REVISION;
    }
    await page.evaluate(({ storageKey, currentScreenId, priorProgressIds, state }) => {
      const current = JSON.parse(localStorage.getItem(storageKey));
      localStorage.setItem(storageKey, JSON.stringify({
        ...current,
        currentLayer: 'player',
        currentCourseId: 'hrba_course',
        currentModuleId: 'module_05_hrba_meal',
        currentScreenId,
        completedModules: [
          'module_01_hrba_foundations',
          'module_02_everyday_cso_work',
          'module_03_project_design',
          'module_04_implementation',
        ],
        screenProgress: {
          ...current.screenProgress,
          module_05_hrba_meal: priorProgressIds,
        },
        practiceCheckState: { module5Presentation: state },
      }));
    }, {
      storageKey: STORAGE_KEY,
      currentScreenId: screenId,
      priorProgressIds: priorProgress,
      state: presentationState,
    });

    const route = `/module-5/screen-5-${content.number - 1}`;
    await page.goto(`${APP_ORIGIN}${route}`);
    await page.getByRole('heading', { level: 1, name: content.title }).waitFor();
    await page.getByText('Preparing this screen...').waitFor({ state: 'hidden' });

    const frame = page.locator(`iframe[title="${content.title}"]`);
    assert.equal(await frame.getAttribute('src'), content.embedUrl);
    assert.equal(await frame.getAttribute('loading'), 'lazy');
    assert.equal(
      await page.getByRole('link', { name: 'open the presentation on YouTube' }).getAttribute('href'),
      content.watchUrl,
    );
    await page.getByText('Read the accessible presentation summary').click();
    await page.getByText(content.accessibilitySummary, { exact: true }).waitFor();

    await assertNoHorizontalOverflow(page, 1440);
    await assertNoHorizontalOverflow(page, 390);
    await assertNoHorizontalOverflow(page, 320);
    if (screenshotDirectory) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.screenshot({
        path: resolve(screenshotDirectory, `screen-${content.number}-desktop.png`),
        fullPage: false,
      });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({
        path: resolve(screenshotDirectory, `screen-${content.number}-mobile-390.png`),
        fullPage: false,
      });
    }
    await page.setViewportSize({ width: 1440, height: 1000 });

    const continueButton = page.getByRole('button', { name: 'Continue' });
    assert.equal(await continueButton.isEnabled(), false);
    for (const [questionIndex, question] of content.questions.entries()) {
      const questionCard = page.locator('.m5p-question').nth(questionIndex);
      const correctOption = question.options.find((item) => question.correctOptionIds.includes(item.id));
      const control = questionCard.locator(`#${question.id}-${correctOption.id}`);
      await control.focus();
      assert.equal(await control.evaluate((element) => document.activeElement === element), true);
      await page.keyboard.press('Space');
      assert.equal(await control.isChecked(), true);
      await questionCard.getByRole('button', { name: 'Check answer' }).press('Enter');
      await questionCard.getByText(correctOption.feedback, { exact: true }).waitFor();
    }

    const requiredPrompts = content.reflections.filter((prompt) => prompt.required);
    for (const [promptIndex, prompt] of requiredPrompts.entries()) {
      const fieldset = page.locator('.m5p-reflection').filter({ hasText: prompt.prompt });
      if (prompt.control === 'short-text') {
        const input = fieldset.getByLabel('Your concise response');
        await input.type(`Generalized priority ${promptIndex + 1}`);
        assert.equal(await input.evaluate((element) => document.activeElement === element), true);
      } else if (prompt.control === 'paired-text') {
        await fieldset.getByLabel('MEAL skill').type('Sensemaking');
        await fieldset.getByLabel('Tool or template').type('Review checklist');
      } else {
        await fieldset.getByRole('radio', { name: prompt.options[0], exact: true }).check();
      }
    }

    if (content.safeInputGuidance) {
      await page.getByText(content.safeInputGuidance, { exact: true }).waitFor();
      assert.doesNotMatch(await page.locator('.m5p-reflection-list').innerText(), /complaint details|case record/i);
    }
    assert.equal(
      await continueButton.isEnabled(),
      true,
      `${screenId}: ${await page.locator('.m5p-saved').innerText()} ${
        screenId === 'M5-R12'
          ? `${await page.getByLabel('MEAL skill').inputValue()} / ${await page.getByLabel('Tool or template').inputValue()}`
          : ''
      }`,
    );
    assert.equal(
      await page.locator('.m5p-reflection legend span').filter({ hasText: /^Optional$/ }).count(),
      content.reflections.filter((prompt) => !prompt.required).length,
    );

    const before = await page.evaluate((storageKey) => {
      const state = JSON.parse(localStorage.getItem(storageKey));
      return {
        progress: state.screenProgress.module_05_hrba_meal || [],
        completedModules: state.completedModules,
      };
    }, STORAGE_KEY);
    assert.equal(before.progress.includes(screenId), false);
    assert.equal(before.completedModules.includes('module_05_hrba_meal'), false);

    await page.reload();
    await page.getByRole('heading', { level: 1, name: content.title }).waitFor();
    for (const question of content.questions) {
      const correctOption = question.options.find((item) => question.correctOptionIds.includes(item.id));
      assert.equal(await page.locator(`#${question.id}-${correctOption.id}`).isChecked(), true);
    }
    const firstTextPrompt = requiredPrompts.find((prompt) => prompt.control === 'short-text');
    if (firstTextPrompt) {
      assert.match(
        await page.locator('.m5p-reflection').filter({ hasText: firstTextPrompt.prompt })
          .getByLabel('Your concise response').inputValue(),
        /Generalized priority/,
      );
    }
    if (screenId === 'M5-R12') {
      assert.equal(await page.getByLabel('MEAL skill').inputValue(), 'Sensemaking');
      assert.equal(await page.getByLabel('Tool or template').inputValue(), 'Review checklist');
      const mapped = await page.evaluate((storageKey) => {
        const state = JSON.parse(localStorage.getItem(storageKey));
        return state.practiceCheckState.module5Presentation.summary.values;
      }, STORAGE_KEY);
      assert.equal(mapped.future_meal_skill, 'Sensemaking');
      assert.equal(mapped.future_meal_tool, 'Review checklist');
    }

    await continueButton.press('Enter');
    const nextRoute = content.nextScreenId === 'M5-R13'
      ? '/module-5/screen-5-13'
      : `/module-5/screen-5-${content.number}`;
    await page.waitForURL(new RegExp(`${nextRoute}$`));
    const after = await page.evaluate((storageKey) => {
      const state = JSON.parse(localStorage.getItem(storageKey));
      return {
        progress: state.screenProgress.module_05_hrba_meal || [],
        completedModules: state.completedModules,
      };
    }, STORAGE_KEY);
    assert.equal(after.progress.filter((id) => id === screenId).length, 1);
    assert.equal(after.completedModules.includes('module_05_hrba_meal'), false);

    await page.getByRole('button', { name: 'Previous screen' }).click();
    await page.waitForURL(new RegExp(`${route}$`));
    await page.getByRole('heading', { level: 1, name: content.title }).waitFor();
    await page.getByRole('button', { name: 'Next screen' }).click();
    await page.waitForURL(new RegExp(`${nextRoute}$`));
  }

  const lockedState = createEmptyModule5PresentationState();
  await page.evaluate(({ storageKey, state }) => {
    const current = JSON.parse(localStorage.getItem(storageKey));
    localStorage.setItem(storageKey, JSON.stringify({
      ...current,
      currentScreenId: 'M5-R12',
      screenProgress: { ...current.screenProgress, module_05_hrba_meal: [] },
      practiceCheckState: { module5Presentation: state },
    }));
  }, { storageKey: STORAGE_KEY, state: lockedState });
  await page.goto(`${APP_ORIGIN}/module-5/screen-5-12`);
  await page.waitForURL(/\/module-5\/screen-5-1$/);
  assert.deepEqual(browserErrors, []);
});
