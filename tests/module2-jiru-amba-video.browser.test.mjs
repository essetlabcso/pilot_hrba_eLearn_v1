import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43198;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const module2Ids = ['M2-00', 'M2-Intro', 'M2-Objectives', '1.1', '1.2'];

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
  throw lastError || new Error('Timed out waiting for the Module 2 Jiru Amba video server.');
}

async function seedModule2(page, currentScreenId, completedBefore) {
  await page.goto(APP_ORIGIN);
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(({ storageKey, screenId, progress }) => {
    const current = JSON.parse(localStorage.getItem(storageKey)) || {};
    localStorage.setItem(storageKey, JSON.stringify({
      ...current,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: 'module_02_everyday_cso_work',
      currentScreenId: screenId,
      completedModules: ['module_01_hrba_foundations'],
      screenProgress: {
        ...current.screenProgress,
        module_02_everyday_cso_work: progress,
      },
    }));
  }, {
    storageKey: STORAGE_KEY,
    screenId: currentScreenId,
    progress: module2Ids.slice(0, completedBefore),
  });
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    body: document.body.scrollWidth - document.body.clientWidth,
  }));
  assert.ok(overflow.document <= 1, `${label}: document overflow was ${overflow.document}px`);
  assert.ok(overflow.body <= 1, `${label}: body overflow was ${overflow.body}px`);
}

test('Module 2 Jiru Amba introduction video remains accessible, responsive and contract-safe', {
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
  await context.route('https://www.youtube-nocookie.com/**', (route) => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><html><body><main>Jiru Amba video embed loaded</main></body></html>',
  }));

  const page = await context.newPage();
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await seedModule2(page, 'M2-Intro', 1);
  await page.goto(`${APP_ORIGIN}/module-2/intro-video`);
  await page.getByRole('heading', { level: 1, name: 'The Jiru Amba Initiative: A New Perspective' }).waitFor();

  const iframe = page.getByTitle('Jiru Amba case introduction video');
  assert.equal(await iframe.count(), 1);
  assert.equal(await iframe.getAttribute('src'), 'https://www.youtube-nocookie.com/embed/A-60i7LvlBM');
  assert.equal(await iframe.getAttribute('loading'), 'lazy');
  assert.notEqual(await iframe.getAttribute('allowfullscreen'), null);
  assert.equal((await iframe.getAttribute('src')).includes('autoplay'), false);
  const frame = page.frames().find((candidate) => candidate.url().includes('youtube-nocookie.com/embed/A-60i7LvlBM'));
  assert.ok(frame, 'The privacy-enhanced iframe must load.');
  await frame.getByText('Jiru Amba video embed loaded', { exact: true }).waitFor();

  const fallback = page.getByRole('link', { name: 'watch the Jiru Amba case introduction on YouTube' });
  assert.equal(await fallback.count(), 1);
  assert.equal(await fallback.getAttribute('href'), 'https://youtu.be/A-60i7LvlBM');
  await fallback.focus();
  const fallbackFocus = await fallback.evaluate((element) => getComputedStyle(element).outline);
  assert.notEqual(fallbackFocus, 'none');

  const transcript = page.locator('.m2-final-intro-transcript details');
  const transcriptSummary = transcript.locator('summary');
  assert.equal(await transcriptSummary.count(), 1);
  assert.equal(await transcript.getAttribute('open'), null);
  await transcriptSummary.press('Enter');
  assert.notEqual(await transcript.getAttribute('open'), null);
  await page.getByText(/^Welcome to Jiru Amba, a fictional Ethiopian local development setting created for this course\./).waitFor();

  const storyImage = page.getByRole('img', { name: 'Four illustrated Jiru Amba scenes: Awra delivering support, examining a broken water point with a public official, observing unequal participation in a community meeting, and planning the Jiru Amba Futures Plan.' });
  assert.equal(await storyImage.count(), 1);
  assert.ok(await storyImage.evaluate((image) => image.complete && image.naturalWidth > 0));

  for (const width of [1440, 1024, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await assertNoHorizontalOverflow(page, `Screen 2 ${width}px`);
    const metrics = await page.evaluate(() => {
      const video = document.querySelector('.m2-final-intro-video');
      const frameElement = document.querySelector('.m2-final-intro-video__frame');
      const transcriptElement = document.querySelector('.m2-final-intro-transcript');
      const story = document.querySelector('.m2-final-intro-story');
      if (!video || !frameElement || !transcriptElement || !story) throw new Error('Screen 2 sections missing.');
      const rect = (element) => element.getBoundingClientRect();
      return {
        viewport: document.documentElement.clientWidth,
        video: rect(video),
        frame: rect(frameElement),
        transcript: rect(transcriptElement),
        story: rect(story),
      };
    });
    assert.ok(metrics.video.width >= metrics.viewport * 0.6, `${width}px video must use the available content width.`);
    assert.ok(Math.abs((metrics.frame.width / metrics.frame.height) - (16 / 9)) < 0.03, `${width}px video must remain 16:9.`);
    assert.ok(metrics.transcript.top >= metrics.video.bottom - 1, `${width}px transcript must follow the video.`);
    assert.ok(metrics.story.top >= metrics.transcript.bottom - 1, `${width}px story summary must follow the transcript.`);
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole('button', { name: 'Continue to Module 2 Content' }).click();
  await page.waitForURL(/\/module-2\/objectives$/);

  await seedModule2(page, '1.3', 5);
  await page.goto(`${APP_ORIGIN}/module-2/screen-1-3`);
  await page.getByRole('heading', { level: 1, name: 'A Tale of Two Water Projects' }).waitFor();
  await page.getByText('Module 2 · Screen 6', { exact: true }).waitFor();
  await page.getByText('From the Jiru Amba case: Water-service repair is one activity in the Jiru Amba Futures Plan. Compare how the same water challenge looks through a Needs Lens and a Rights Lens.', { exact: true }).waitFor();
  await page.getByText('Drag the blue divider left or right to compare the Needs Lens and the Rights Lens.', { exact: true }).waitFor();
  await assertNoHorizontalOverflow(page, 'Screen 6 case bridge');

  assert.deepEqual(browserErrors, [], `Browser console errors: ${browserErrors.join(' | ')}`);
});
