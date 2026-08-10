import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const PORT = 43321;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';

const coverCases = [
  ['module_01_hrba_foundations', 'M1-PLAYER-00', '/?moduleId=module_01_hrba_foundations&screenId=M1-PLAYER-00', 'module-1-cover.webp', []],
  ['module_02_everyday_cso_work', 'M2-00', '/module-2', 'module-2-cover.webp', ['module_01_hrba_foundations']],
  ['module_03_project_design', 'M3-PLAYER-00', '/module-3/cover', 'module-3-cover.webp', ['module_01_hrba_foundations', 'module_02_everyday_cso_work']],
  ['module_04_implementation', 'M4-PLAYER-00', '/module-4/cover', 'module-4-cover.webp', ['module_01_hrba_foundations', 'module_02_everyday_cso_work', 'module_03_project_design']],
  ['module_05_hrba_meal', 'M5-PLAYER-00', '/module-5/cover', 'module-5-cover.webp', ['module_01_hrba_foundations', 'module_02_everyday_cso_work', 'module_03_project_design', 'module_04_implementation']],
];

const videoCases = [
  [5, 'Context and Inequality Scan', '1lm4e7v1aLE'],
  [9, 'Power and Influence Map', 'L_C-p01fyT0'],
  [11, 'Gender and Disability Design Check', 'p13LHt0n_Ck'],
  [14, 'HRBA Project Design Repair', 'pi-aD_N2CUA'],
];

async function waitForApp() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(ORIGIN);
      if (response.ok) return;
    } catch {
      // Retry while Vite starts.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error('Timed out waiting for the HRBA asset-patch server.');
}

async function seed(page, { moduleId, screenId, completedModules, completedScreens = [] }) {
  await page.goto(ORIGIN);
  await page.evaluate(({ key, moduleId: id, screenId: screen, completed, progress }) => {
    const current = JSON.parse(localStorage.getItem(key) || '{}');
    localStorage.setItem(key, JSON.stringify({
      ...current,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: id,
      currentScreenId: screen,
      completedModules: completed,
      screenProgress: {
        ...(current.screenProgress || {}),
        [id]: progress,
      },
    }));
  }, { key: STORAGE_KEY, moduleId, screenId, completed: completedModules, progress: completedScreens });
}

test('course cards omit covers, module openings use the uploaded WebPs, and Module 3 support videos stay optional', {
  timeout: 180_000,
}, async (t) => {
  const vite = spawn(
    process.execPath,
    [resolve('node_modules/vite/bin/vite.js'), '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    { cwd: process.cwd(), env: { ...process.env, BROWSER: 'none' }, stdio: 'ignore' },
  );
  t.after(() => vite.kill());
  await waitForApp();

  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  t.after(() => context.close());
  await context.route('https://fonts.googleapis.com/**', (route) => route.fulfill({ contentType: 'text/css', body: '' }));
  await context.route('https://www.youtube-nocookie.com/**', (route) => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><html><body>Optional support video</body></html>',
  }));

  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await page.goto(ORIGIN);
  await page.locator('.module-launch-card').first().waitFor();
  assert.equal(await page.locator('.module-launch-card').count(), 6);
  assert.equal(await page.locator('.module-launch-card img').count(), 0);
  assert.equal(await page.locator('.module-launch-card__media').count(), 0);

  for (const [moduleId, screenId, route, fileName, completedModules] of coverCases) {
    await seed(page, { moduleId, screenId, completedModules });
    await page.goto(`${ORIGIN}${route}`);
    const cover = page.locator('.m2-cover-screen__image, .m2-final-cover__visual img');
    await cover.waitFor();
    assert.equal(new URL(await cover.getAttribute('src'), ORIGIN).pathname, `/assets/hrba/modules/${fileName}`);
    assert.ok(await cover.evaluate((image) => image.complete && image.naturalWidth > 0), `${fileName} failed to load`);
  }

  for (const [screenNumber, title, videoId] of videoCases) {
    const screenId = `M3-R${String(screenNumber).padStart(2, '0')}`;
    const completedScreens = Array.from({ length: screenNumber - 1 }, (_, index) => `M3-R${String(index + 1).padStart(2, '0')}`);
    await seed(page, {
      moduleId: 'module_03_project_design',
      screenId,
      completedModules: ['module_01_hrba_foundations', 'module_02_everyday_cso_work'],
      completedScreens,
    });
    await page.goto(`${ORIGIN}/module-3/screen-3-${screenNumber}`);
    await page.getByRole('heading', { level: 1, name: title }).waitFor();
    const support = page.getByRole('region', { name: title });
    const iframe = support.getByTitle(`Support video: ${title}`);
    assert.equal(await iframe.getAttribute('src'), `https://www.youtube-nocookie.com/embed/${videoId}`);
    assert.equal(await page.locator('.m3-screen-with-support-video').evaluate((wrapper) => {
      const video = wrapper.querySelector('.m3-support-video');
      const main = wrapper.querySelector('main');
      return Boolean(video && main && (video.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING));
    }), true);
    const persistedProgress = await page.evaluate((key) => (
      JSON.parse(localStorage.getItem(key) || '{}').screenProgress?.module_03_project_design || []
    ), STORAGE_KEY);
    assert.deepEqual(persistedProgress, completedScreens);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  const mobileFrame = page.locator('.m3-support-video__frame');
  await mobileFrame.waitFor();
  const mobileBounds = await mobileFrame.boundingBox();
  assert.ok(mobileBounds && mobileBounds.x >= 0 && mobileBounds.x + mobileBounds.width <= 390);
  assert.ok(Math.abs((mobileBounds.width / mobileBounds.height) - (16 / 9)) < 0.08);

  assert.deepEqual(errors, []);
});
