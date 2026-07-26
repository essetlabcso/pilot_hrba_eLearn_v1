import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import {
  MODULE5_BATCH1_PRESENTATION_CONTENT_REVISION,
  MODULE5_BATCH2_PRESENTATION_SCREEN_IDS,
  MODULE5_PRESENTATION_CONTENT,
} from '../src/data/module5/module5PresentationContent.ts';
import {
  createEmptyModule5PresentationState,
} from '../src/data/module5/module5EnhancedModel.ts';

const APP_PORT = 43186;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const ALL_SCREEN_IDS = ['M5-R01', 'M5-R02', 'M5-R03', 'M5-R04', ...MODULE5_BATCH2_PRESENTATION_SCREEN_IDS];

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
  throw lastError || new Error('Timed out waiting for the Module 5 Batch 2 server.');
}

async function assertNoHorizontalOverflow(page, width) {
  await page.setViewportSize({ width, height: 1000 });
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth),
    false,
    `Module 5 Batch 2 must not overflow horizontally at ${width}px`,
  );
}

test('Module 5 Batch 2 supports direct routes, knowledge, reflection, hydration, responsive layout and final gates', {
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
  const screenshotDirectory = process.env.MODULE5_BATCH2_SCREENSHOT_DIR;
  if (screenshotDirectory) await mkdir(screenshotDirectory, { recursive: true });
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });
  await page.goto(APP_ORIGIN);
  await page.getByRole('heading', { level: 1, name: 'CSO Learning Hub' }).waitFor();

  for (const screenId of MODULE5_BATCH2_PRESENTATION_SCREEN_IDS) {
    const content = MODULE5_PRESENTATION_CONTENT[screenId];
    const priorProgress = ALL_SCREEN_IDS.slice(0, ALL_SCREEN_IDS.indexOf(screenId));
    const batch1State = createEmptyModule5PresentationState();
    if (screenId === 'M5-R05') {
      batch1State.contentRevision = MODULE5_BATCH1_PRESENTATION_CONTENT_REVISION;
    }
    await page.evaluate(({ storageKey, currentScreenId, priorProgressIds, presentationState }) => {
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
        practiceCheckState: { module5Presentation: presentationState },
      }));
    }, {
      storageKey: STORAGE_KEY,
      currentScreenId: screenId,
      priorProgressIds: priorProgress,
      presentationState: batch1State,
    });

    const route = `/module-5/screen-5-${content.number - 1}`;
    await page.goto(`${APP_ORIGIN}${route}`);
    await page.getByRole('heading', { level: 1, name: content.title }).waitFor();
    await page.getByText('Preparing this screen...').waitFor({ state: 'hidden' });

    const frame = page.locator(`iframe[title="${content.title}"]`);
    assert.equal(await frame.getAttribute('src'), content.embedUrl);
    assert.equal(await frame.getAttribute('loading'), 'lazy');
    assert.equal(await page.getByRole('link', { name: 'open the presentation on YouTube' }).getAttribute('href'), content.watchUrl);
    await assertNoHorizontalOverflow(page, 1440);
    await assertNoHorizontalOverflow(page, 390);
    await assertNoHorizontalOverflow(page, 320);
    if (screenshotDirectory) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.screenshot({
        path: resolve(screenshotDirectory, `screen-${String(content.number).padStart(2, '0')}-desktop.png`),
        fullPage: false,
      });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({
        path: resolve(screenshotDirectory, `screen-${String(content.number).padStart(2, '0')}-mobile-390.png`),
        fullPage: false,
      });
    }
    await page.setViewportSize({ width: 1440, height: 1000 });

    for (const [questionIndex, question] of content.questions.entries()) {
      const questionCard = page.locator('.m5p-question').nth(questionIndex);
      const correctOption = question.options.find((item) => question.correctOptionIds.includes(item.id));
      const control = questionCard.locator(`#${question.id}-${correctOption.id}`);
      await control.focus();
      assert.equal(await control.evaluate((element) => document.activeElement === element), true);
      await page.keyboard.press('Space');
      assert.equal(await control.isChecked(), true);
      await questionCard.getByRole('button', { name: 'Check answer' }).click();
      await questionCard.getByText(correctOption.feedback, { exact: true }).waitFor();
    }

    const requiredPrompts = content.reflections.filter((prompt) => prompt.required);
    for (const [promptIndex, prompt] of requiredPrompts.entries()) {
      const fieldset = page.locator('.m5p-reflection').filter({ hasText: prompt.prompt });
      if (prompt.control === 'short-text') {
        const input = fieldset.getByLabel('Your concise response');
        await input.type(`Generalized priority ${promptIndex + 1}`);
        assert.equal(await input.evaluate((element) => document.activeElement === element), true);
      } else {
        const control = fieldset.getByRole('radio', { name: prompt.options[0], exact: true });
        await control.check();
      }
    }

    if (content.safeInputGuidance) {
      await page.getByText(content.safeInputGuidance, { exact: true }).waitFor();
      assert.doesNotMatch(await page.locator('.m5p-reflection-list').innerText(), /full name|exact address/i);
    }

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
        await page.locator('.m5p-reflection').filter({ hasText: firstTextPrompt.prompt }).getByLabel('Your concise response').inputValue(),
        /Generalized priority/,
      );
    }

    const continueButton = page.getByRole('button', { name: 'Continue' });
    assert.equal(await continueButton.isEnabled(), true);
    await continueButton.press('Enter');
    await page.waitForURL(new RegExp(`${content.nextScreenId === 'M5-R09' ? '/module-5/screen-5-9' : `/module-5/screen-5-${content.number}`}$`));
    const after = await page.evaluate((storageKey) => {
      const state = JSON.parse(localStorage.getItem(storageKey));
      return {
        progress: state.screenProgress.module_05_hrba_meal || [],
        completedModules: state.completedModules,
      };
    }, STORAGE_KEY);
    assert.equal(after.progress.filter((id) => id === screenId).length, 1);
    assert.equal(after.completedModules.includes('module_05_hrba_meal'), false);

  }

  assert.deepEqual(browserErrors, []);
});
