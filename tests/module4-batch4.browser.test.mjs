import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import {
  createInitialModule4EnhancedState,
  updateModule4Field,
} from '../src/data/module4/module4EnhancedModel.ts';

const APP_PORT = 43174;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const SCREEN_13_URL = `${APP_ORIGIN}/module-4/screen-4-12`;

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
  throw lastError || new Error('Timed out waiting for the Screen 13 test server.');
}

function screen13StateWithMissingFields() {
  let enhanced = createInitialModule4EnhancedState('2026-07-26T12:00:00.000Z');
  const update = (key, value, sourceScreenId) => {
    enhanced = updateModule4Field(enhanced, key, value, {
      learnerEdited: true,
      sourceScreenId,
      updatedAt: '2026-07-26T12:00:00.000Z',
    });
  };

  update('selectedWorkstream', 'health_post', 'M4-S1-04');
  update('evidenceClassifications', {}, 'M4-S1-05');
  update('unresolvedQuestions', [], 'M4-S1-05');
  update('participationDecisions', {}, 'M4-S1-06');
  update('feedbackAccountBackActions', {
    response: 'Agree the immediate accessibility action',
    accountBack: 'Explain the action through accessible channels',
    followUp: 'Review at the next community update',
  }, 'M4-S1-07');
  update('actorResponsibilities', {
    responsibleActor: 'Woreda Water Desk',
    awraRole: 'Coordinate communication and support follow-up',
  }, 'M4-S1-08');
  update('engagementDecisions', {
    followUpPurpose: 'Confirm implementation progress',
    followUpWhen: 'After the agreed update date',
    reviewTiming: 'Within fourteen days',
  }, 'M4-S1-08');
  update('supportDiagnosis', {
    firstResponse: 'Adjust access arrangements',
    conditionalAdjustments: 'Engage if the barrier remains',
    reviewCommitment: 'Review the adjustment',
  }, 'M4-S1-09');
  update('selectedResponsePathway', 'engage', 'M4-S1-10');
  update('minimumNecessaryInformation', [
    'Record whether the concern was assigned and explained back.',
  ], 'M4-S1-11');

  return {
    storageVersion: STORAGE_KEY,
    currentLayer: 'player',
    currentCourseId: 'hrba_course',
    currentModuleId: 'module_04_implementation',
    currentScreenId: 'M4-S1-12',
    completedModules: [
      'module_01_hrba_foundations',
      'module_02_everyday_cso_work',
      'module_03_project_design',
    ],
    screenProgress: {
      module_04_implementation: [
        'M4-S1-01',
        'M4-S1-02',
        'M4-S1-03',
        'M4-S1-04',
        'M4-S1-05',
        'M4-S1-06',
        'M4-S1-07',
        'M4-S1-08',
        'M4-S1-09',
        'M4-S1-10',
        'M4-S1-11',
      ],
    },
    practiceCheckState: { module4Enhanced: enhanced },
  };
}

async function typeAndCorrectCharacterByCharacter(page, locator, value) {
  await locator.focus();
  for (const character of value) {
    await page.keyboard.insertText(character);
    assert.equal(await locator.count(), 1, 'textarea must remain mounted after every character');
    assert.equal(
      await locator.evaluate((element) => document.activeElement === element),
      true,
      'focus must remain in the active textarea',
    );
  }
  assert.equal(await locator.inputValue(), value);

  const finalCharacter = value.at(-1);
  await page.keyboard.press('Backspace');
  assert.equal(await locator.inputValue(), value.slice(0, -1));
  assert.equal(await locator.evaluate((element) => document.activeElement === element), true);
  await page.keyboard.insertText(finalCharacter);
  assert.equal(await locator.inputValue(), value);
}

test('Screen 13 keeps Stage 2 missing fields mounted during character-by-character editing', {
  timeout: 60_000,
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
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
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
  }, {
    storageKey: STORAGE_KEY,
    seedState: screen13StateWithMissingFields(),
  });
  await page.goto(SCREEN_13_URL);
  const screenHeading = page.getByRole('heading', {
    level: 1,
    name: 'Implementation Decision and Follow-Up Note',
  });
  await page.waitForTimeout(500);
  const loadedState = JSON.parse(await page.evaluate(
    (storageKey) => localStorage.getItem(storageKey),
    STORAGE_KEY,
  ));
  assert.equal(
    await screenHeading.isVisible(),
    true,
    `Expected Screen 13 at ${page.url()} with ${JSON.stringify({
      currentLayer: loadedState.currentLayer,
      currentModuleId: loadedState.currentModuleId,
      currentScreenId: loadedState.currentScreenId,
    })}; received: ${(await page.locator('body').innerText()).slice(0, 300)}`,
  );
  await page.getByRole('button', { name: 'Complete essentials' }).click();

  const evidence = page.getByRole('textbox', {
    name: /^Confirmed evidence and remaining uncertainty /,
  });
  const affectedPeople = page.getByRole('textbox', {
    name: /^Who is affected or may be excluded /,
  });
  assert.equal(await evidence.count(), 1);
  assert.equal(await affectedPeople.count(), 1);

  const evidenceValue = 'Confirmed access audit; completion timing still needs checking.';
  await typeAndCorrectCharacterByCharacter(page, evidence, evidenceValue);
  await page.keyboard.press('Tab');
  assert.equal(
    await affectedPeople.evaluate((element) => document.activeElement === element),
    true,
    'Tab must move focus to the next stable missing field',
  );

  const affectedValue = 'People with disabilities and caregivers may be excluded.';
  await typeAndCorrectCharacterByCharacter(page, affectedPeople, affectedValue);
  assert.equal(await evidence.count(), 1);
  assert.equal(await affectedPeople.count(), 1);

  await page.getByRole('textbox', { name: /^Follow-up question / })
    .fill('Is the accessible entrance ready and usable?');
  await page.getByRole('textbox', { name: /^Participation or inclusion action / })
    .fill('Review the adjustment with affected groups.');
  const reviewFinal = page.getByRole('button', { name: 'Review final note' });
  assert.equal(await reviewFinal.isEnabled(), true);
  await reviewFinal.click();

  await page.getByRole('checkbox', { name: /^I confirm that this note/ }).check();
  await page.getByRole('button', { name: 'Save note' }).click();
  await page.getByRole('button', { name: 'Continue' }).waitFor();

  const beforeContinue = JSON.parse(await page.evaluate(
    (storageKey) => localStorage.getItem(storageKey),
    STORAGE_KEY,
  ));
  assert.equal(
    beforeContinue.screenProgress.module_04_implementation.includes('M4-S1-12'),
    false,
    'Save note must not record screen completion',
  );

  await page.reload();
  await page.getByRole('button', { name: 'Continue' }).waitFor();
  assert.equal(await page.getByText(evidenceValue, { exact: true }).count(), 1);
  assert.equal(await page.getByText(affectedValue, { exact: true }).count(), 1);

  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    assert.equal(
      await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth),
      false,
      `Screen 13 must not overflow horizontally at ${width}px`,
    );
  }

  await page.getByRole('button', { name: 'Continue' }).click();
  const afterContinue = JSON.parse(await page.evaluate(
    (storageKey) => localStorage.getItem(storageKey),
    STORAGE_KEY,
  ));
  assert.equal(
    afterContinue.screenProgress.module_04_implementation
      .filter((screenId) => screenId === 'M4-S1-12').length,
    1,
  );
  assert.deepEqual(browserErrors, []);
});
