import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';

const PORT = 43253;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const EVIDENCE_DIR = process.env.MODULE3_FINAL_GATE_EVIDENCE_DIR || '';

async function waitForApp() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(ORIGIN);
      if (response.ok) return;
    } catch {
      // Retry while Vite starts.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 150));
  }
  throw new Error('Timed out waiting for Module 3 final-gate server.');
}

async function seed(page, screenNumber) {
  const screenId = `M3-R${String(screenNumber).padStart(2, '0')}`;
  await page.goto(ORIGIN);
  await page.evaluate(({ key, id, number }) => {
    const current = JSON.parse(localStorage.getItem(key) || '{}');
    const progress = Array.from(
      { length: Math.max(0, number - 1) },
      (_, index) => `M3-R${String(index + 1).padStart(2, '0')}`,
    );
    localStorage.setItem(key, JSON.stringify({
      ...current,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: 'module_03_project_design',
      currentScreenId: id,
      completedModules: ['module_01_hrba_foundations', 'module_02_everyday_cso_work'],
      screenProgress: {
        ...(current.screenProgress || {}),
        module_03_project_design: progress,
      },
    }));
  }, { key: STORAGE_KEY, id: screenId, number: screenNumber });
  await page.goto(`${ORIGIN}/module-3/screen-3-${screenNumber}`);
  const preparing = page.getByText('Preparing this screen...');
  if (await preparing.count()) {
    await preparing.waitFor({ state: 'hidden', timeout: 10_000 });
  }
}

async function capture(page, name) {
  if (!EVIDENCE_DIR) return;
  mkdirSync(EVIDENCE_DIR, { recursive: true });
  await page.screenshot({ path: join(EVIDENCE_DIR, `${name}.png`), fullPage: true });
}

async function assertNoOverflow(page) {
  const metrics = await page.evaluate(() => ({
    documentOverflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth,
    internalOverflow: [...document.querySelectorAll('.m3-orientation-screen *, .m3-roadmap-screen *, .m3-case-screen *, .m3-snapshot-screen *')]
      .filter((element) => {
        const style = getComputedStyle(element);
        return element.scrollWidth > element.clientWidth + 2
          && ['auto', 'scroll'].includes(style.overflowX);
      })
      .map((element) => element.className)
      .slice(0, 5),
  }));
  assert.ok(metrics.documentOverflow <= 1, `document overflow: ${metrics.documentOverflow}px`);
  assert.deepEqual(metrics.internalOverflow, []);
}

test('Module 3 R01-R04 final release gate is responsive, accessible, and visually stable', {
  timeout: 240_000,
}, async (t) => {
  const vite = spawn(
    process.execPath,
    [
      resolve('node_modules/vite/bin/vite.js'),
      '--host',
      '127.0.0.1',
      '--port',
      String(PORT),
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
  await context.route('https://fonts.googleapis.com/**', (route) => route.fulfill({ contentType: 'text/css', body: '' }));
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await t.test('R01 exposes a dignified non-blocking fallback and coherent focus order', async () => {
    await seed(page, 1);
    assert.equal(await page.locator('.m3-video-container-169 iframe').count(), 0);
    const fallback = page.locator('.m3-orientation-media-fallback');
    assert.equal(await fallback.getAttribute('role'), 'status');
    assert.match(await fallback.innerText(), /Continue with the accessible transcript/);
    assert.equal(await page.getByRole('button', { name: 'View transcript' }).isVisible(), true);
    assert.equal(await page.getByRole('button', { name: 'Skip video' }).isVisible(), true);
    assert.equal(await page.getByRole('button', { name: 'Continue to the module roadmap' }).isVisible(), true);
    await page.getByRole('button', { name: 'View transcript' }).focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.getByRole('region', { name: 'Module 3 orientation video transcript' }).isVisible(), true);
    await page.keyboard.press('Tab');
    assert.match(await page.evaluate(() => document.activeElement?.textContent || ''), /Skip video/i);
    await capture(page, 'm3-r01-fallback-desktop');
  });

  for (const viewport of [
    { width: 1536, height: 864 },
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 390, height: 844 },
    { width: 320, height: 800 },
  ]) {
    await t.test(`R01 media bounds remain valid at ${viewport.width}x${viewport.height}`, async () => {
      await page.setViewportSize(viewport);
      await seed(page, 1);
      const bounds = await page.evaluate(() => {
        const container = document.querySelector('.m3-video-container-169');
        const parent = container?.parentElement;
        const content = document.querySelector('.m3-orientation-shell');
        const fallback = document.querySelector('.m3-orientation-media-fallback');
        const containerRect = container?.getBoundingClientRect();
        const parentRect = parent?.getBoundingClientRect();
        const contentRect = content?.getBoundingClientRect();
        const fallbackRect = fallback?.getBoundingClientRect();
        return {
          viewport: innerWidth,
          containerWidth: containerRect?.width ?? 0,
          containerRight: containerRect?.right ?? 0,
          parentWidth: parentRect?.width ?? 0,
          parentRight: parentRect?.right ?? 0,
          contentWidth: contentRect?.width ?? 0,
          fallbackWidth: fallbackRect?.width ?? 0,
          ratio: containerRect ? containerRect.width / containerRect.height : 0,
          documentOverflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth,
        };
      });
      assert.ok(bounds.containerWidth <= bounds.parentWidth + 1);
      assert.ok(bounds.containerRight <= bounds.parentRight + 1);
      assert.ok(bounds.parentWidth <= bounds.contentWidth + 1);
      assert.ok(Math.abs(bounds.ratio - (16 / 9)) < 0.04, `ratio ${bounds.ratio}`);
      assert.ok(bounds.fallbackWidth <= bounds.containerWidth + 1);
      assert.ok(bounds.documentOverflow <= 1);
      await assertNoOverflow(page);
      for (const name of ['View transcript', 'Skip video', 'Continue to the module roadmap']) {
        const button = page.getByRole('button', { name });
        assert.equal(await button.isVisible(), true);
        const box = await button.boundingBox();
        assert.ok(box && box.x >= 0 && box.x + box.width <= viewport.width + 1, `${name} is clipped`);
      }
      if (viewport.width === 320) await capture(page, 'm3-r01-fallback-mobile-320');
    });
  }

  await t.test('R02-R04 preserve polished desktop and mobile structures', async () => {
    for (const viewport of [
      { width: 1440, height: 900, suffix: 'desktop' },
      { width: 390, height: 844, suffix: 'mobile-390' },
    ]) {
      await page.setViewportSize(viewport);

      await seed(page, 2);
      assert.match(await page.locator('.m3-roadmap-subtitle').innerText(), /90–105 minutes/);
      assert.equal(await page.locator('.m3-roadmap-pathway-grid').evaluate((element) => element.tagName), 'OL');
      assert.equal(await page.locator('.m3-roadmap-card').count(), 3);
      assert.equal(await page.locator('.m3-b1-roadmap-destinations li').count(), 4);
      await assertNoOverflow(page);
      await capture(page, `m3-r02-roadmap-${viewport.suffix}`);

      await seed(page, 3);
      assert.equal(await page.locator('.m3-case-summary-card').count(), 2);
      assert.equal(await page.locator('.m3-b1-plan-areas li').count(), 5);
      assert.match(await page.locator('.m3-case-contradiction').innerText(), /Invited, Counted, but Not Heard/);
      await assertNoOverflow(page);
      await capture(page, `m3-r03-case-briefing-${viewport.suffix}`);

      await seed(page, 4);
      assert.equal(await page.locator('.m3-b1-portfolio-preview').evaluate((element) => element.tagName), 'OL');
      assert.equal(await page.locator('.m3-snapshot-card').count(), 4);
      const columns = await page.locator('.m3-snapshot-preview-grid').evaluate(
        (element) => getComputedStyle(element).gridTemplateColumns.split(' ').length,
      );
      assert.equal(columns, viewport.width === 1440 ? 2 : 1);
      await assertNoOverflow(page);
      await capture(page, `m3-r04-portfolio-preview-${viewport.suffix}`);
    }
  });

  assert.deepEqual(errors, []);
});
