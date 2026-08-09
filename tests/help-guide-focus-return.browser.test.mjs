import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43214;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const MODULE_ID = 'module_01_hrba_foundations';
const SCREEN_ID = 'M1-S1-06A';

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

  throw lastError || new Error('Timed out waiting for the Help Guide test server.');
}

async function seedModule1(page) {
  await page.goto(APP_ORIGIN);
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(({ storageKey, moduleId, screenId }) => {
    localStorage.setItem(storageKey, JSON.stringify({
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: moduleId,
      currentScreenId: screenId,
      completedModules: [moduleId],
      screenProgress: {
        [moduleId]: [
          'M1-PLAYER-00',
          'M1-S1-01',
          'M1-S1-02',
          'M1-S1-03',
          'M1-S1-04',
          'M1-S1-05',
          'M1-S1-06',
          screenId,
        ],
      },
      practiceCheckState: {},
      activeModal: null,
      transcriptVisible: false,
      soundState: true,
      captionState: true,
    }));
  }, { storageKey: STORAGE_KEY, moduleId: MODULE_ID, screenId: SCREEN_ID });
}

async function openToolsIfNeeded(page) {
  const toggle = page.locator('.player-tools-toggle');
  if (await toggle.getAttribute('aria-expanded') !== 'true') {
    await toggle.click();
  }
}

async function rememberLauncher(page) {
  return page.evaluate(() => {
    const launcher = document.querySelector(
      '.player-sidebar-button[aria-label="Open player help guide"]',
    );
    window.__helpGuideLauncherUnderTest = launcher;
    return {
      count: document.querySelectorAll(
        '.player-sidebar-button[aria-label="Open player help guide"]',
      ).length,
      tagName: launcher?.tagName ?? null,
      role: launcher?.getAttribute('role') || launcher?.tagName.toLowerCase() || null,
      accessibleName: launcher?.getAttribute('aria-label') ?? null,
      connected: launcher?.isConnected ?? false,
    };
  });
}

async function assertDialogFocus(page) {
  const dialog = page.getByRole('dialog', { name: 'Focused Course Player Guide' });
  await dialog.waitFor();
  assert.equal(
    await page.evaluate(() => {
      const dialogElement = document.querySelector('#player-help-overlay');
      return dialogElement?.contains(document.activeElement) ?? false;
    }),
    true,
    'Opening Help Guide should move focus into its dialog',
  );
  return dialog;
}

async function assertLauncherFocus(page, label) {
  const focusState = await page.evaluate(() => ({
    sameElement: document.activeElement === window.__helpGuideLauncherUnderTest,
    activeTag: document.activeElement?.tagName ?? null,
    accessibleName: document.activeElement?.getAttribute('aria-label') ?? null,
    connected: window.__helpGuideLauncherUnderTest?.isConnected ?? false,
  }));

  assert.deepEqual(focusState, {
    sameElement: true,
    activeTag: 'BUTTON',
    accessibleName: 'Open player help guide',
    connected: true,
  }, `${label}: focus should return immediately to the same connected launcher`);
}

test('Help Guide restores focus to its exact launcher across layouts and close paths', {
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
  const context = await browser.newContext({ viewport: { width: 1536, height: 864 } });
  t.after(() => context.close());
  const page = await context.newPage();

  await seedModule1(page);

  for (const viewport of [
    { width: 1536, height: 864 },
    { width: 390, height: 844 },
    { width: 320, height: 800 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(`${APP_ORIGIN}/?moduleId=${MODULE_ID}&screenId=${SCREEN_ID}`);
    await page.getByRole('main', { name: 'Course screen content' }).waitFor();
    await openToolsIfNeeded(page);

    const launcher = page.getByRole('button', { name: 'Open player help guide' });
    assert.equal(await launcher.count(), 1, `${viewport.width}px should expose one Help Guide launcher`);
    const launcherContract = await rememberLauncher(page);
    assert.deepEqual(launcherContract, {
      count: 1,
      tagName: 'BUTTON',
      role: 'button',
      accessibleName: 'Open player help guide',
      connected: true,
    }, `${viewport.width}px launcher should have a stable accessible contract`);

    await launcher.focus();
    await launcher.press('Enter');
    let dialog = await assertDialogFocus(page);
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'detached' });
    await assertLauncherFocus(page, `${viewport.width}px keyboard open and Escape close`);

    await launcher.press('Enter');
    dialog = await assertDialogFocus(page);
    const closeButton = dialog.getByRole('button', { name: 'Got it! Start Learning' });
    await closeButton.focus();
    await closeButton.press('Enter');
    await dialog.waitFor({ state: 'detached' });
    await assertLauncherFocus(page, `${viewport.width}px keyboard close-button path`);

    await launcher.click();
    dialog = await assertDialogFocus(page);
    await dialog.getByRole('button', { name: 'Got it! Start Learning' }).click();
    await dialog.waitFor({ state: 'detached' });
    await assertLauncherFocus(page, `${viewport.width}px pointer close-button path`);

    await launcher.click();
    dialog = await assertDialogFocus(page);
    const overlayBox = await dialog.boundingBox();
    assert.ok(overlayBox, 'Help Guide backdrop should have a rendered box');
    await dialog.click({
      position: {
        x: Math.max(1, overlayBox.width - 4),
        y: Math.max(1, overlayBox.height - 4),
      },
    });
    await dialog.waitFor({ state: 'detached' });
    await assertLauncherFocus(page, `${viewport.width}px backdrop close path`);

    await launcher.click();
    dialog = await assertDialogFocus(page);
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'detached' });
    await assertLauncherFocus(page, `${viewport.width}px repeated open-close cycle`);

    assert.equal(
      await launcher.getAttribute('aria-label'),
      'Open player help guide',
      `${viewport.width}px Help Guide should be immediately reopenable`,
    );
  }
});
