import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43211;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const MODULE_ID = 'module_01_hrba_foundations';
const SCREEN_IDS = [
  'M1-PLAYER-00',
  'M1-S1-01',
  'M1-S1-02',
  'M1-S1-03',
  'M1-S1-04',
  'M1-S1-05',
  'M1-S1-06',
  'M1-S1-06A',
  'M1-S1-06B',
  'M1-PLAYER-COMPLETE',
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
  throw lastError || new Error('Timed out waiting for the Module 1 test server.');
}

async function seedCompletedModule1(page) {
  await page.goto(APP_ORIGIN);
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(({ storageKey, moduleId, screenIds }) => {
    const current = JSON.parse(localStorage.getItem(storageKey) || '{}');
    localStorage.setItem(storageKey, JSON.stringify({
      ...current,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: moduleId,
      currentScreenId: 'M1-PLAYER-00',
      completedModules: Array.from(new Set([...(current.completedModules || []), moduleId])),
      screenProgress: {
        ...(current.screenProgress || {}),
        [moduleId]: screenIds,
      },
      practiceCheckState: {
        ...(current.practiceCheckState || {}),
        module1WelcomeCourseReason: 'We want to improve participation and inclusion.',
        module1AboutCourseCardsViewed: ['course', 'why', 'audience', 'method'],
        module1PracticalLensQuestion: 'Who is affected?',
        module1CourseJourneyViewed: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
        module1LearningMethodViewed: ['1', '2', '3', '4', '5', '6'],
        module1PortfolioFocus: ['advocacy'],
        module1StartingConfidence: {
          ratings: Object.fromEntries(Array.from({ length: 10 }, (_, index) => [`q${index + 1}`, 2])),
          submitted: true,
        },
        module1PriorityCommitment: {
          priority: 'I want to improve participation and inclusion.',
          text: 'I will improve inclusive participation safely.',
        },
        module1PriorityCommitmentSaved: true,
      },
    }));
  }, { storageKey: STORAGE_KEY, moduleId: MODULE_ID, screenIds: SCREEN_IDS });
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    body: document.body.scrollWidth - document.body.clientWidth,
    canvas: (() => {
      const canvas = document.querySelector('.main-screen-canvas__content');
      return canvas ? canvas.scrollWidth - canvas.clientWidth : 0;
    })(),
  }));
  assert.ok(overflow.document <= 1, `${label}: document overflow was ${overflow.document}px`);
  assert.ok(overflow.body <= 1, `${label}: body overflow was ${overflow.body}px`);
  assert.ok(overflow.canvas <= 1, `${label}: learning canvas overflow was ${overflow.canvas}px`);
}

async function readMobileLayout(page) {
  return page.evaluate(() => {
    const canvas = document.querySelector('.main-screen-canvas__content');
    const screen = document.querySelector('.m1-b2-first-commitment, .m1-revised-finished-screen');
    const closureShell = document.querySelector('.m1-closure-shell');
    const fieldset = document.querySelector('.m1-b2-first-commitment fieldset');
    const textarea = document.querySelector('#m1-priority-commitment');
    const heading = document.querySelector('.m1-b2-first-commitment h1');
    const rect = (element) => element?.getBoundingClientRect().toJSON() ?? null;

    return {
      viewportWidth: window.innerWidth,
      canvas: canvas
        ? {
            clientWidth: canvas.clientWidth,
            scrollWidth: canvas.scrollWidth,
            rect: rect(canvas),
          }
        : null,
      screen: screen
        ? {
            clientWidth: screen.clientWidth,
            scrollWidth: screen.scrollWidth,
            rect: rect(screen),
          }
        : null,
      closureShell: closureShell
        ? {
            clientWidth: closureShell.clientWidth,
            scrollWidth: closureShell.scrollWidth,
            rect: rect(closureShell),
          }
        : null,
      fieldset: rect(fieldset),
      textarea: rect(textarea),
      heading: heading
        ? {
            rect: rect(heading),
            lineHeight: Number.parseFloat(getComputedStyle(heading).lineHeight),
          }
        : null,
    };
  });
}

test('Module 1 remains responsive and its mobile help dialog is readable and focus-safe', {
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
  const context = await browser.newContext({ viewport: { width: 320, height: 900 } });
  t.after(() => context.close());
  const page = await context.newPage();
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await seedCompletedModule1(page);

  for (const width of [1440, 1024, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const screenId of SCREEN_IDS) {
      await page.goto(`${APP_ORIGIN}/?moduleId=${MODULE_ID}&screenId=${screenId}`);
      await page.getByRole('main', { name: 'Course screen content' }).waitFor();
      await assertNoHorizontalOverflow(page, `${screenId} at ${width}px`);
      assert.ok(
        await page.getByRole('main', { name: 'Course screen content' }).getByRole('heading', { level: 1 }).isVisible(),
        `${screenId} at ${width}px should retain a visible screen heading`,
      );
    }
  }

  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(`${APP_ORIGIN}/?moduleId=${MODULE_ID}&screenId=M1-PLAYER-00`);
  const module1Cover = page.locator('.m2-cover-screen--module-1');
  const coverImage = module1Cover.locator('.m2-cover-screen__image-wrap');
  const [coverRect, imageRect] = await Promise.all([
    module1Cover.boundingBox(),
    coverImage.boundingBox(),
  ]);
  assert.ok(coverRect && imageRect, 'Module 1 cover and its image should be rendered');
  assert.ok(imageRect.width <= coverRect.width + 1, 'Module 1 cover image should fit its 320px card');
  assert.ok(
    imageRect.x + imageRect.width <= coverRect.x + coverRect.width + 1,
    'Module 1 cover image should not clip or overflow',
  );
  await assertNoHorizontalOverflow(page, 'Module 1 cover at 320px');

  await page.goto(`${APP_ORIGIN}/?moduleId=${MODULE_ID}&screenId=M1-S1-06A`);
  const mobileToolsToggle = page.locator('.player-mobile-tools-toggle');
  await mobileToolsToggle.click();
  const helpButton = page.getByRole('button', { name: 'Open player help guide' });
  await helpButton.click();

  const dialog = page.getByRole('dialog', { name: 'Focused Course Player Guide' });
  await dialog.waitFor();
  const prompt = dialog.locator('.help-overlay__prompt');
  const callouts = dialog.locator('.help-overlay__callout');
  const calloutCount = await callouts.count();
  assert.equal(calloutCount, 4, 'The help dialog should retain all four guidance callouts');
  const promptRect = await prompt.boundingBox();
  assert.ok(
    promptRect && promptRect.x >= 0 && promptRect.x + promptRect.width <= 320,
    'The help prompt should fit the mobile viewport',
  );
  let previousBottom = promptRect.y + promptRect.height;
  for (let index = 0; index < calloutCount; index += 1) {
    const calloutRect = await callouts.nth(index).boundingBox();
    assert.ok(calloutRect, `Help callout ${index + 1} should be visible`);
    assert.ok(
      calloutRect.x >= 0 && calloutRect.x + calloutRect.width <= 320,
      `Help callout ${index + 1} should fit the viewport`,
    );
    assert.ok(calloutRect.y >= previousBottom - 1, `Help callout ${index + 1} should not overlap the preceding content`);
    previousBottom = calloutRect.y + calloutRect.height;
  }
  await assertNoHorizontalOverflow(page, 'Mobile help dialog');

  await page.keyboard.press('Tab');
  assert.equal(
    await page.evaluate(() => document.activeElement?.textContent?.trim()),
    'Got it! Start Learning',
    'Tab should remain trapped on the only dialog action',
  );
  await page.keyboard.press('Shift+Tab');
  assert.equal(
    await page.evaluate(() => document.activeElement?.textContent?.trim()),
    'Got it! Start Learning',
    'Shift+Tab should remain trapped on the only dialog action',
  );

  await page.keyboard.press('Escape');
  assert.equal(await dialog.count(), 0, 'Escape should close the help dialog');
  assert.equal(await mobileToolsToggle.getAttribute('aria-expanded'), 'true', 'Closing the dialog should keep mobile tools available');
  assert.equal(
    await page.evaluate(() => document.activeElement?.getAttribute('aria-label')),
    'Open player help guide',
    'Focus should return to the help launcher after the dialog closes',
  );

  await page.keyboard.press('Escape');
  assert.equal(await mobileToolsToggle.getAttribute('aria-expanded'), 'false', 'A second Escape should collapse mobile tools');
  assert.equal(
    await page.evaluate(() => document.activeElement?.classList.contains('player-mobile-tools-toggle')),
    true,
    'Focus should return to the mobile tools disclosure after it collapses',
  );

  await page.goto(`${APP_ORIGIN}/?moduleId=${MODULE_ID}&screenId=M1-S1-06B`);
  const firstPriority = page.getByRole('radio', { name: 'I want to better understand HRBA foundations.' });
  const secondPriority = page.getByRole('radio', { name: 'I want to identify rights-holders and duty-bearers more clearly.' });
  await firstPriority.focus();
  const focusAppearance = await firstPriority.evaluate((element) => {
    const style = getComputedStyle(element);
    return { outline: style.outlineStyle, boxShadow: style.boxShadow };
  });
  assert.ok(
    focusAppearance.outline !== 'none' || focusAppearance.boxShadow !== 'none',
    'Module 1 controls should expose a visible keyboard-focus treatment',
  );
  await page.keyboard.press('ArrowDown');
  assert.equal(await secondPriority.isChecked(), true, 'Arrow keys should operate the native priority radio group');
  await page.keyboard.press('Tab');
  assert.equal(
    await page.evaluate(() => document.activeElement?.tagName),
    'TEXTAREA',
    'Tab should move logically from the priority radio group to the commitment field',
  );
  await page.keyboard.press('Shift+Tab');
  assert.equal(await secondPriority.evaluate((element) => element === document.activeElement), true);

  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto(`${APP_ORIGIN}/?moduleId=${MODULE_ID}&screenId=M1-S1-06B`);
  const mobileCommitmentScreen = page.locator('.m1-b2-first-commitment');
  await mobileCommitmentScreen.waitFor();
  const mobileFieldset = mobileCommitmentScreen.locator('fieldset');
  const mobileTextarea = page.locator('#m1-priority-commitment');
  const commitmentLayout = await readMobileLayout(page);
  assert.ok(
    commitmentLayout.canvas
      && commitmentLayout.screen
      && commitmentLayout.fieldset
      && commitmentLayout.textarea
      && commitmentLayout.heading,
  );
  assert.ok(
    commitmentLayout.canvas.scrollWidth - commitmentLayout.canvas.clientWidth <= 1,
    `Screen 9 canvas overflow was ${commitmentLayout.canvas.scrollWidth - commitmentLayout.canvas.clientWidth}px`,
  );
  assert.ok(
    commitmentLayout.screen.scrollWidth - commitmentLayout.screen.clientWidth <= 1,
    `Screen 9 content overflow was ${commitmentLayout.screen.scrollWidth - commitmentLayout.screen.clientWidth}px`,
  );
  assert.ok(
    commitmentLayout.fieldset.width >= commitmentLayout.screen.rect.width * 0.75,
    `Screen 9 fieldset width ${commitmentLayout.fieldset.width}px was not meaningful`,
  );
  assert.ok(
    commitmentLayout.textarea.width >= commitmentLayout.fieldset.width * 0.75,
    `Screen 9 textarea width ${commitmentLayout.textarea.width}px was not meaningful`,
  );
  assert.ok(
    commitmentLayout.heading.rect.width >= commitmentLayout.screen.rect.width * 0.75
      && commitmentLayout.heading.rect.height <= commitmentLayout.heading.lineHeight * 4,
    'Screen 9 heading should wrap in normal lines rather than a narrow letter-by-letter column',
  );
  assert.ok(
    commitmentLayout.fieldset.x >= commitmentLayout.screen.rect.x - 1
      && commitmentLayout.fieldset.right <= commitmentLayout.screen.rect.right + 1,
    'Screen 9 fieldset should remain fully inside the learning screen',
  );
  assert.ok(
    commitmentLayout.textarea.x >= commitmentLayout.screen.rect.x - 1
      && commitmentLayout.textarea.right <= commitmentLayout.screen.rect.right + 1,
    'Screen 9 textarea should remain fully inside the learning screen',
  );

  await page.getByRole('radio', { name: 'I want to improve participation and inclusion.' }).check();
  const savedCommitment = 'I will check whose voice is missing before each activity.';
  await mobileTextarea.fill(savedCommitment);
  await page.getByRole('button', { name: 'Save commitment to portfolio' }).click();
  await page.reload();
  await mobileCommitmentScreen.waitFor();
  assert.equal(await mobileTextarea.inputValue(), savedCommitment, 'Saved Screen 9 text should survive refresh');
  assert.match(
    await mobileCommitmentScreen.locator('[aria-live="polite"]').last().textContent(),
    /saved/i,
    'Screen 9 should restore its saved confirmation after refresh',
  );
  await assertNoHorizontalOverflow(page, 'Saved Screen 9 at 320px');

  await page.goto(`${APP_ORIGIN}/?moduleId=${MODULE_ID}&screenId=M1-PLAYER-COMPLETE`);
  await page.locator('.m1-revised-finished-screen').waitFor();
  const completionLayout = await readMobileLayout(page);
  assert.ok(completionLayout.canvas && completionLayout.screen && completionLayout.closureShell);
  assert.ok(
    completionLayout.canvas.scrollWidth - completionLayout.canvas.clientWidth <= 1,
    `Screen 10 canvas overflow was ${completionLayout.canvas.scrollWidth - completionLayout.canvas.clientWidth}px`,
  );
  assert.ok(
    completionLayout.screen.scrollWidth - completionLayout.screen.clientWidth <= 1,
    `Screen 10 content overflow was ${completionLayout.screen.scrollWidth - completionLayout.screen.clientWidth}px`,
  );
  assert.ok(
    completionLayout.closureShell.scrollWidth - completionLayout.closureShell.clientWidth <= 1,
    `Screen 10 closure-shell overflow was ${
      completionLayout.closureShell.scrollWidth - completionLayout.closureShell.clientWidth
    }px`,
  );
  await assertNoHorizontalOverflow(page, 'Module 1 completion at 320px');

  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto(`${APP_ORIGIN}/?moduleId=${MODULE_ID}&screenId=M1-S1-03`);
  await page.getByRole('button', { name: 'Open player help guide' }).click();
  const tabletDialog = page.getByRole('dialog', { name: 'Focused Course Player Guide' });
  await tabletDialog.waitFor();
  const tabletPromptRect = await tabletDialog.locator('.help-overlay__prompt').boundingBox();
  const tabletCallouts = tabletDialog.locator('.help-overlay__callout');
  const tabletCalloutCount = await tabletCallouts.count();
  assert.ok(tabletPromptRect, 'The tablet help prompt should be visible');
  let tabletPreviousBottom = tabletPromptRect.y + tabletPromptRect.height;
  for (let index = 0; index < tabletCalloutCount; index += 1) {
    const calloutRect = await tabletCallouts.nth(index).boundingBox();
    assert.ok(calloutRect, `Tablet help callout ${index + 1} should be visible`);
    assert.ok(
      calloutRect.y >= tabletPreviousBottom - 1,
      `Tablet help callout ${index + 1} should not overlap the preceding content`,
    );
    tabletPreviousBottom = calloutRect.y + calloutRect.height;
  }
  await assertNoHorizontalOverflow(page, 'Tablet help dialog');

  assert.deepEqual(browserErrors, [], `Browser errors were reported:\n${browserErrors.join('\n')}`);
});
