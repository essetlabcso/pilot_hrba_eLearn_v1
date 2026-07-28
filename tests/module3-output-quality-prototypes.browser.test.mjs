import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';

const PORT = 43239;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const EVIDENCE_DIR = process.env.MODULE3_OUTPUT_QUALITY_EVIDENCE_DIR || '';

async function waitForApp() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(ORIGIN);
      if (response.ok) return;
    } catch {
      // Retry until Vite is listening.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error('Timed out waiting for the Module 3 output-quality server.');
}

function progressThrough(number) {
  const hidden = new Set([15, 16, 18, 19]);
  return Array.from({ length: number }, (_, index) => index + 1)
    .filter((item) => !hidden.has(item))
    .map((item) => `M3-R${String(item).padStart(2, '0')}`);
}

async function seed(page, screenNumber, practiceCheckState = {}) {
  const screenId = `M3-R${String(screenNumber).padStart(2, '0')}`;
  await page.goto(ORIGIN);
  await page.evaluate(({ key, id, progress, practices }) => {
    const current = JSON.parse(localStorage.getItem(key) || '{}');
    const nextPractices = {
      ...current.practiceCheckState,
      ...practices,
    };
    delete nextPractices[`module3_revised_${id.toLowerCase().replaceAll('-', '_')}`];
    localStorage.setItem(key, JSON.stringify({
      ...current,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: 'module_03_project_design',
      currentScreenId: id,
      completedModules: ['module_01_hrba_foundations', 'module_02_everyday_cso_work'],
      screenProgress: {
        ...current.screenProgress,
        module_03_project_design: progress,
      },
      practiceCheckState: {
        ...nextPractices,
      },
    }));
  }, {
    key: STORAGE_KEY,
    id: screenId,
    progress: progressThrough(screenNumber - 1),
    practices: practiceCheckState,
  });
  await page.goto(`${ORIGIN}/module-3/screen-3-${screenNumber}`);
  await page.locator('.m3-oq-canvas').waitFor();
}

async function capture(page, screenNumber, state) {
  if (!EVIDENCE_DIR) return;
  mkdirSync(EVIDENCE_DIR, { recursive: true });
  await page.screenshot({
    path: join(EVIDENCE_DIR, `m3-r${String(screenNumber).padStart(2, '0')}-${state}.png`),
    fullPage: true,
  });
}

async function assertLayout(page, label) {
  const result = await page.evaluate(() => {
    const canvas = document.querySelector('.m3-oq-canvas');
    const activeSurfaces = Array.from(document.querySelectorAll('.m3-oq-interaction, .m3-oq-output'));
    const controls = Array.from(document.querySelectorAll('.m3-oq-screen button:not([disabled]), .m3-oq-screen input:not([disabled]), .m3-oq-screen textarea:not([disabled])'));
    const textBlocks = Array.from(document.querySelectorAll('.m3-oq-screen h1, .m3-oq-screen h2, .m3-oq-screen h3, .m3-oq-screen p'));
    if (!canvas) throw new Error('Missing output-quality canvas');
    const canvasBox = canvas.getBoundingClientRect();
    return {
      documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      bodyOverflow: document.body.scrollWidth - document.body.clientWidth,
      canvasWidth: canvasBox.width,
      viewportWidth: document.documentElement.clientWidth,
      surfacesBounded: activeSurfaces.every((element) => {
        const box = element.getBoundingClientRect();
        return box.left >= canvasBox.left - 1 && box.right <= canvasBox.right + 1;
      }),
      stableBackgrounds: activeSurfaces.every((element) => {
        const color = getComputedStyle(element).backgroundColor;
        return color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent';
      }),
      controlsAtLeast44: controls
        .filter((element) => element.tagName !== 'INPUT' || ['radio', 'checkbox'].includes(element.type))
        .every((element) => {
          const target = element.closest('label') || element;
          return target.getBoundingClientRect().height >= 43;
        }),
      textReadable: textBlocks.every((element) => {
        const box = element.getBoundingClientRect();
        return box.width >= 100 || box.width >= canvasBox.width * 0.28;
      }),
    };
  });
  assert.ok(result.documentOverflow <= 1, `${label}: document overflow ${result.documentOverflow}px`);
  assert.ok(result.bodyOverflow <= 1, `${label}: body overflow ${result.bodyOverflow}px`);
  assert.ok(result.canvasWidth >= result.viewportWidth * 0.62, `${label}: canvas is too narrow`);
  assert.equal(result.surfacesBounded, true, `${label}: active surface escaped the canvas`);
  assert.equal(result.stableBackgrounds, true, `${label}: active content has a transparent background`);
  assert.equal(result.controlsAtLeast44, true, `${label}: an active control target is below 44px`);
  assert.equal(result.textReadable, true, `${label}: text collapsed into an unreadable narrow block`);
}

async function selectFirstInEachFieldset(page, count) {
  const fieldsets = page.locator('.m3-oq-choice-group');
  assert.equal(await fieldsets.count(), count);
  for (let index = 0; index < count; index += 1) {
    await fieldsets.nth(index).locator('label').first().click();
  }
}

test('four Module 3 output-quality prototypes are light, substantive, responsive and resumable', {
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

  const carriedState = {
    module3_revised_m3_r07: {
      selectedGroups: ['Women traders', 'remote kebele residents'],
      barriersToTest: ['Late information', 'transport cost'],
    },
    module3_revised_m3_r08: {
      selectedDutyBearers: ['Woreda Water & Energy Office'],
      selectedSupportingActor: 'Market Vendor Women Committee',
      selectedCsoRole: 'Facilitate accessible evidence and follow-up',
    },
    module3_revised_m3_r11: {
      selectedRepairs: ['Accessible formats', 'reasonable accommodation'],
    },
    module3_revised_m3_r13: {
      riskDoNoHarmBoard: { monitoringSignal: 'unanswered feedback or missing accommodation' },
    },
  };

  await t.test('Screen 5 requires two factors and one group, then generates six analytical elements', async () => {
    await seed(page, 5);
    await capture(page, 5, 'default-desktop');
    const factorLabels = page.locator('.m3-oq-choice-group').first().locator('label');
    await factorLabels.nth(0).click();
    await factorLabels.nth(1).click();
    await page.locator('.m3-oq-choice-group').nth(1).locator('label').first().click();
    await capture(page, 5, 'selected-desktop');
    assert.equal(await page.getByTestId('m3-oq-continue').isDisabled(), true);
    await page.getByTestId('m3-oq-generate').click();
    await page.getByRole('heading', { name: 'Context and Inequality Insight' }).waitFor();
    assert.equal(await page.locator('.m3-oq-chain__item').count(), 5);
    await capture(page, 5, 'generated-desktop');
    const note = page.locator('.m3-oq-optional-note textarea');
    await note.fill('Generalized implementation note.');
    await capture(page, 5, 'edited-desktop');
    await page.reload();
    await page.getByRole('heading', { name: 'Context and Inequality Insight' }).waitFor();
    assert.equal(await note.inputValue(), 'Generalized implementation note.');
    await capture(page, 5, 'resumed-desktop');
  });

  await t.test('Screen 9 renders a spatial map and equivalent actor list', async () => {
    await seed(page, 9, carriedState);
    await capture(page, 9, 'default-desktop');
    await selectFirstInEachFieldset(page, 3);
    await capture(page, 9, 'selected-desktop');
    await page.getByTestId('m3-oq-generate').click();
    assert.ok(await page.locator('.m3-oq-actor-node').count() >= 6);
    assert.equal(await page.locator('.m3-oq-actor-list article').count(), await page.locator('.m3-oq-actor-node').count());
    await capture(page, 9, 'generated-desktop');
    await page.locator('.m3-oq-choice-group').nth(2).locator('label').nth(1).click();
    assert.equal(await page.locator('.m3-oq-output').count(), 0);
    await capture(page, 9, 'edited-desktop');
    await page.getByTestId('m3-oq-generate').click();
    await page.reload();
    await page.getByRole('heading', { name: 'Actor and Power Insight' }).waitFor();
    await capture(page, 9, 'resumed-desktop');
  });

  await t.test('Screen 12 requires three decisions and generates four broad phases', async () => {
    await seed(page, 12, carriedState);
    await capture(page, 12, 'default-desktop');
    await selectFirstInEachFieldset(page, 3);
    await capture(page, 12, 'selected-desktop');
    await page.getByTestId('m3-oq-generate').click();
    assert.equal(await page.locator('.m3-oq-pathway > li').count(), 4);
    await capture(page, 12, 'generated-desktop');
    await page.locator('.m3-oq-choice-group').nth(1).locator('label').nth(1).click();
    assert.equal(await page.locator('.m3-oq-output').count(), 0);
    await capture(page, 12, 'edited-desktop');
    await page.getByTestId('m3-oq-generate').click();
    await page.reload();
    await page.getByRole('heading', { level: 2, name: 'Participation and Accountability Pathway' }).waitFor();
    await capture(page, 12, 'resumed-desktop');
  });

  await t.test('Screen 14 generates the before, repaired-design and reasoning regions', async () => {
    await seed(page, 14, carriedState);
    await capture(page, 14, 'default-desktop');
    await selectFirstInEachFieldset(page, 3);
    await capture(page, 14, 'selected-desktop');
    await page.getByTestId('m3-oq-generate').click();
    assert.equal(await page.locator('.m3-oq-before-after > section').count(), 3);
    await capture(page, 14, 'generated-desktop');
    await page.locator('.m3-oq-optional-note textarea').fill('Review at the first quarterly implementation meeting.');
    assert.equal(await page.locator('.m3-oq-output').count(), 0);
    await capture(page, 14, 'edited-desktop');
    await page.getByTestId('m3-oq-generate').click();
    await page.reload();
    await page.getByRole('heading', { name: 'Repaired Project-Design Element' }).waitFor();
    await capture(page, 14, 'resumed-desktop');
  });

  for (const width of [1536, 1440, 1366, 390, 320]) {
    await page.setViewportSize({ width, height: width <= 390 ? 844 : 900 });
    for (const screenNumber of [5, 9, 12, 14]) {
      await seed(page, screenNumber, carriedState);
      await selectFirstInEachFieldset(page, screenNumber === 5 ? 2 : 3);
      if (screenNumber === 5) {
        const factorLabels = page.locator('.m3-oq-choice-group').first().locator('label');
        if (!(await factorLabels.nth(1).locator('input').isChecked())) await factorLabels.nth(1).click();
      }
      await page.getByTestId('m3-oq-generate').click();
      await page.locator('.m3-oq-output').waitFor();
      await assertLayout(page, `Screen ${screenNumber} at ${width}px`);
      if (width === 390) await capture(page, screenNumber, 'generated-mobile-390');
    }
  }

  await page.setViewportSize({ width: 768, height: 432 });
  for (const screenNumber of [5, 9, 12, 14]) {
    await seed(page, screenNumber, carriedState);
    await assertLayout(page, `Screen ${screenNumber} 200% reflow equivalent`);
  }

  assert.deepEqual(errors, []);
});

test('hidden compatibility routes do not expose legacy workflow controls or create progress', {
  timeout: 120_000,
}, async (t) => {
  const vite = spawn(
    process.execPath,
    [resolve('node_modules/vite/bin/vite.js'), '--host', '127.0.0.1', '--port', String(PORT + 1), '--strictPort'],
    { cwd: process.cwd(), env: { ...process.env, BROWSER: 'none' }, stdio: 'ignore' },
  );
  t.after(() => vite.kill());
  const hiddenOrigin = `http://127.0.0.1:${PORT + 1}`;
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(hiddenOrigin)).ok) break;
    } catch {
      // Retry.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(hiddenOrigin);
  await page.evaluate(({ key, progress }) => {
    const current = JSON.parse(localStorage.getItem(key) || '{}');
    localStorage.setItem(key, JSON.stringify({
      ...current,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: 'module_03_project_design',
      currentScreenId: 'M3-R15',
      completedModules: ['module_01_hrba_foundations', 'module_02_everyday_cso_work'],
      screenProgress: { ...current.screenProgress, module_03_project_design: progress },
    }));
  }, { key: STORAGE_KEY, progress: progressThrough(14) });
  await page.goto(`${hiddenOrigin}/module-3/screen-3-15`);
  await page.waitForLoadState('domcontentloaded');
  assert.equal(await page.locator('[data-testid="m3-s15-draft-section-tile"]').count(), 0);
  const url = page.url();
  const hasCompatibility = await page.locator('[data-testid="m3-hidden-compatibility"]').count();
  assert.ok(hasCompatibility === 1 || url.includes('/screen-3-14') || url.includes('/screen-3-17'));
});
