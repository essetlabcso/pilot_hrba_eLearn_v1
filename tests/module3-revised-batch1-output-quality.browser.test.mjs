import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';

const PORT = 43248;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const EVIDENCE_DIR = process.env.MODULE3_REVISED_BATCH1_EVIDENCE_DIR || '';

function progressThrough(number) {
  return Array.from({ length: number }, (_, index) => `M3-R${String(index + 1).padStart(2, '0')}`);
}

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
  throw new Error('Timed out waiting for revised Module 3 Batch 1 server.');
}

async function seed(page, number, practices = {}) {
  const screenId = `M3-R${String(number).padStart(2, '0')}`;
  await page.goto(ORIGIN);
  await page.evaluate(({ key, id, progress, practices }) => {
    const current = JSON.parse(localStorage.getItem(key) || '{}');
    const screenKey = `module3_revised_${id.toLowerCase().replaceAll('-', '_')}`;
    const nextPractice = {
      ...(current.practiceCheckState || {}),
      ...practices,
    };
    if (!Object.prototype.hasOwnProperty.call(practices, screenKey)) {
      delete nextPractice[screenKey];
    }
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
      practiceCheckState: {
        ...nextPractice,
      },
    }));
  }, {
    key: STORAGE_KEY,
    id: screenId,
    progress: progressThrough(number - 1),
    practices,
  });
  await page.goto(`${ORIGIN}/module-3/screen-3-${number}`);
  await waitForSettled(page);
}

async function waitForSettled(page) {
  const overlay = page.getByText('Preparing this screen...');
  if (await overlay.count()) {
    await overlay.waitFor({ state: 'hidden', timeout: 10_000 });
  }
}

async function capture(page, name) {
  if (!EVIDENCE_DIR) return;
  await waitForSettled(page);
  mkdirSync(EVIDENCE_DIR, { recursive: true });
  await page.screenshot({ path: join(EVIDENCE_DIR, `${name}.png`), fullPage: true });
}

async function chooseCorrectStandards(page) {
  await page.locator('input[name="m3-r06-non-discrimination"][value="unequal-access"]').check();
  await page.locator('input[name="m3-r06-participation"][value="influence-before-decision"]').check();
  await page.locator('input[name="m3-r06-accountability"][value="response-explanation"]').check();
}

async function generateScreen7(page) {
  const groups = page.locator('.m3-oq-choice-group').first().locator('input[type="checkbox"]');
  await groups.nth(0).check();
  await groups.nth(1).check();
  await page.locator('input[name="m3-r07-women-vendors"][value="distance-time"]').check();
  await page.locator('input[name="m3-r07-remote-residents"][value="information"]').check();
  await page.getByTestId('m3-b1-generate').click();
}

async function generateScreen8(page) {
  await page.locator('input[name="m3-r08-primary"][value="water-office"]').check();
  await page.locator('input[name="m3-r08-supporting"][value="women-committee"]').check();
  await page.locator('input[name="m3-r08-cso"][value="facilitate"]').check();
  await page.getByTestId('m3-b1-generate').click();
}

async function layoutResult(page) {
  return page.evaluate(() => {
    const canvas = document.querySelector('.m3-oq-canvas, .m3-orientation-shell, .m3-roadmap-shell, .m3-case-shell, .m3-snapshot-shell');
    const active = [...document.querySelectorAll('.m3-oq-interaction, .m3-oq-output')];
    const text = [...document.querySelectorAll('.m3-screen h1, .m3-screen h2, .m3-screen h3, .m3-screen p, .m3-screen dd')];
    const canvasBox = canvas?.getBoundingClientRect();
    return {
      documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      bodyOverflow: document.body.scrollWidth - document.body.clientWidth,
      canvasWidth: canvasBox?.width || 0,
      viewportWidth: document.documentElement.clientWidth,
      activeSolid: active.every((element) => {
        const color = getComputedStyle(element).backgroundColor;
        return color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent';
      }),
      activeBounded: active.every((element) => {
        const box = element.getBoundingClientRect();
        return !canvasBox || (box.left >= canvasBox.left - 1 && box.right <= canvasBox.right + 1);
      }),
      naturalWrap: text.every((element) => {
        const style = getComputedStyle(element);
        return style.wordBreak === 'normal' && style.overflowWrap !== 'anywhere';
      }),
      minimumTextWidth: Math.min(...text.filter((element) => element.textContent?.trim()).map((element) => element.getBoundingClientRect().width)),
    };
  });
}

test('revised Module 3 Batch 1 is concise, substantive, compatible and responsive', {
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
  await context.route('https://www.youtube.com/embed/**', (route) => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><html><body><p>Local automated video placeholder</p></body></html>',
  }));
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await t.test('Screens 1–4 use one clear path and concise solid destination surfaces', async () => {
    await seed(page, 1);
    await capture(page, 'm3-r01-default-desktop');
    assert.equal(await page.locator('.m3-orientation-actions .m3-primary-button').count(), 1);
    const skip = page.getByRole('button', { name: 'Skip video' });
    await skip.click();
    assert.equal(page.url().endsWith('/module-3/screen-3-1'), true, 'Skip records the choice without competing route completion');
    assert.equal(await page.getByRole('button', { name: 'Video skipped — continue below' }).isDisabled(), true);
    assert.equal(await page.locator('.m3-video-container-169 iframe').count(), 0);
    assert.match(
      await page.locator('.m3-orientation-media-fallback').innerText(),
      /Continue with the accessible transcript/,
    );

    await seed(page, 2);
    await capture(page, 'm3-r02-roadmap-desktop');
    assert.equal(await page.locator('.m3-roadmap-card').count(), 3);
    assert.deepEqual(await page.locator('.m3-b1-roadmap-destinations li').allTextContents(), [
      'Context and Inequality Insight',
      'Actor and Power Insight',
      'Repaired Project-Design Element',
      'Proposal-Review Insight',
    ]);
    assert.equal(await page.getByRole('button', { name: 'Start the First Design Lesson' }).isEnabled(), true);

    await seed(page, 3);
    await capture(page, 'm3-r03-case-briefing-desktop');
    assert.equal(await page.locator('[role="tab"]').count(), 0);
    assert.equal(await page.locator('.m3-b1-plan-areas li').count(), 5);
    assert.match(await page.locator('.m3-case-summary-card').first().innerText(), /invited,\s*counted,\s*but not heard/i);

    await seed(page, 4);
    await capture(page, 'm3-r04-portfolio-preview-desktop');
    assert.equal(await page.locator('.m3-b1-portfolio-preview').evaluate((element) => element.tagName), 'OL');
    assert.deepEqual(await page.locator('.m3-b1-portfolio-preview h2').allTextContents(), [
      'Context and Inequality Insight',
      'Actor and Power Insight',
      'Repaired Project-Design Element',
      'Proposal-Review Insight',
    ]);
    assert.equal(await page.locator('.m3-b1-portfolio-preview input, .m3-b1-portfolio-preview textarea').count(), 0);
  });

  const carried = {
    module3_revised_m3_r05: {
      prototypeSelectedFactors: [
        'Market infrastructure and trading space',
        'Public water-service access and timing',
      ],
      prototypeSelectedGroup: 'Women market vendors and traders',
      contextInsight: {
        priorityAffectedGroup: 'Women market vendors and traders',
        selectedContextualConditions: [
          'Market infrastructure and trading space',
          'Public water-service access and timing',
        ],
        sourceSignature: JSON.stringify([
          ['Market infrastructure and trading space', 'Public water-service access and timing'],
          'Women market vendors and traders',
        ]),
      },
    },
  };

  await t.test('Screen 6 requires correction, generates a substantive map, and resumes', async () => {
    await seed(page, 6, carried);
    await capture(page, 'm3-r06-default-desktop');
    await page.locator('input[name="m3-r06-non-discrimination"][value="response-explanation"]').check();
    assert.match(await page.locator('.m3-b1-inline-feedback').first().innerText(), /Review this relationship/i);
    assert.equal(await page.getByTestId('m3-b1-generate').isDisabled(), true);
    await chooseCorrectStandards(page);
    await capture(page, 'm3-r06-selected-desktop');
    await page.getByTestId('m3-b1-generate').click();
    assert.equal(await page.locator('.m3-b1-output-rows > li').count(), 3);
    assert.equal(await page.locator('.m3-b1-output-rows dd').count(), 9);
    assert.match(await page.locator('.m3-b1-output-rows').innerText(), /Jiru Amba evidence/i);
    assert.doesNotMatch(await page.locator('.m3-b1-output-rows').innerText(), /Correct Match/i);
    await capture(page, 'm3-r06-generated-desktop');
    await page.reload();
    await page.getByRole('heading', { name: 'Standards-to-Practice Map' }).waitFor();
    assert.equal(await page.getByTestId('m3-b1-continue').isEnabled(), true);
    await capture(page, 'm3-r06-resumed-desktop');
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForSettled(page);
    await page.locator('.m3-oq-output').scrollIntoViewIfNeeded();
    await capture(page, 'm3-r06-generated-mobile-390');
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  await t.test('Screen 7 generates two carried relationships and resumes', async () => {
    await seed(page, 7);
    await capture(page, 'm3-r07-default-desktop');
    await generateScreen7(page);
    assert.equal(await page.locator('.m3-b1-relationship-list > li').count(), 2);
    assert.match(await page.locator('.m3-b1-relationship-list').innerText(), /Reinforcing case barrier/i);
    assert.match(await page.locator('.m3-b1-relationship-list').innerText(), /Practical design response/i);
    await capture(page, 'm3-r07-generated-desktop');
    await page.reload();
    await page.getByRole('heading', { name: 'Rights-Holder-to-Barrier Map' }).waitFor();
    assert.equal(await page.getByTestId('m3-b1-continue').isEnabled(), true);
    await capture(page, 'm3-r07-resumed-desktop');
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForSettled(page);
    await page.locator('.m3-oq-output').scrollIntoViewIfNeeded();
    await capture(page, 'm3-r07-generated-mobile-390');
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  await t.test('Screen 8 has no fresh defaults, preserves boundaries, and carries into Screen 9', async () => {
    await seed(page, 8);
    await capture(page, 'm3-r08-default-desktop');
    assert.equal(await page.locator('.m3-oq-interaction input:checked').count(), 0);
    assert.equal(await page.getByTestId('m3-b1-continue').isDisabled(), true);
    await generateScreen8(page);
    assert.equal(await page.locator('.m3-b1-actor-constellation > li').count(), 4);
    const output = await page.locator('.m3-b1-actor-output').innerText();
    assert.match(output, /Formal responsibility/);
    assert.match(output, /Supporting influence/);
    assert.match(output, /CSO facilitation/);
    assert.match(output, /retains the mandate and response responsibility/i);
    await capture(page, 'm3-r08-generated-desktop');
    await page.reload();
    await page.getByRole('heading', { name: 'Actor Responsibility and Relationship Map' }).waitFor();
    await capture(page, 'm3-r08-resumed-desktop');
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForSettled(page);
    await page.locator('.m3-oq-output').scrollIntoViewIfNeeded();
    await capture(page, 'm3-r08-generated-mobile-390');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.getByTestId('m3-b1-continue').click();
    await page.waitForURL(/screen-3-9/);
    const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) || '{}'), STORAGE_KEY);
    const screen8 = saved.practiceCheckState.module3_revised_m3_r08;
    assert.deepEqual(screen8.selectedDutyBearers, ['Woreda Water & Energy Office']);
    assert.equal(screen8.selectedSupportingActor, 'Market Vendor Women Committee');
    assert.equal(screen8.selectedCsoRole, 'Facilitate accessible evidence and early participation');
    assert.equal(screen8.generatedResponsibilityRows.length, 1);
  });

  await t.test('legacy partial Screen 8 values hydrate without inventing or losing selections', async () => {
    await seed(page, 8, {
      module3_revised_m3_r08: {
        selectedDutyBearers: ['Woreda Water & Energy Office', 'Kebele Administration & Development Agents'],
        selectedSupportingActor: 'Market Vendor Women Committee',
        selectedCsoRole: 'Facilitate early pre-consultation briefings and safe feedback channels',
      },
    });
    assert.equal(await page.locator('input[name="m3-r08-primary"]:checked').count(), 1);
    assert.equal(await page.locator('input[type="checkbox"]:checked').count(), 1);
    assert.equal(await page.locator('input[name="m3-r08-supporting"]:checked').count(), 1);
    assert.equal(await page.locator('input[name="m3-r08-cso"]:checked').count(), 1);
    assert.equal(await page.getByTestId('m3-b1-generate').isEnabled(), true);
  });

  await t.test('legacy Screen 6 and Screen 7 option identifiers hydrate additively', async () => {
    await seed(page, 6, {
      module3_revised_m3_r06: {
        matches: {
          'non-discrimination': 'access-barriers',
          participation: 'influence-not-headcount',
          accountability: 'feedback-response',
        },
      },
    });
    assert.equal(await page.locator('.m3-oq-interaction input:checked').count(), 3);
    assert.equal(await page.getByTestId('m3-b1-generate').isEnabled(), true);

    await seed(page, 7, {
      module3_revised_m3_r07: {
        selectedGroups: ['women-traders', 'remote-rural-residents'],
        assignedBarriers: {
          'women-traders': 'social',
          'remote-rural-residents': 'power',
        },
      },
    });
    assert.equal(await page.locator('.m3-oq-choice-group').first().locator('input:checked').count(), 2);
    assert.equal(await page.locator('input[name="m3-r07-women-vendors"]:checked').count(), 1);
    assert.equal(await page.locator('input[name="m3-r07-remote-residents"]:checked').count(), 1);
    assert.equal(await page.getByTestId('m3-b1-generate').isEnabled(), true);
  });

  await t.test('semantic controls complete the required decisions with keyboard input and visible focus', async () => {
    await seed(page, 6, carried);
    const firstStandard = page.locator('input[name="m3-r06-non-discrimination"]').first();
    await firstStandard.focus();
    await page.keyboard.press('Space');
    assert.equal(await firstStandard.isChecked(), true);
    const focusedLabelOutline = await firstStandard.locator('xpath=ancestor::label').evaluate(
      (element) => getComputedStyle(element).outlineStyle,
    );
    assert.notEqual(focusedLabelOutline, 'none');

    const participationFirst = page.locator('input[name="m3-r06-participation"]').first();
    await participationFirst.focus();
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowRight');
    assert.equal(
      await page.locator('input[name="m3-r06-participation"][value="influence-before-decision"]').isChecked(),
      true,
    );

    const accountabilityFirst = page.locator('input[name="m3-r06-accountability"]').first();
    await accountabilityFirst.focus();
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    assert.equal(
      await page.locator('input[name="m3-r06-accountability"][value="response-explanation"]').isChecked(),
      true,
    );

    const generate = page.getByTestId('m3-b1-generate');
    await generate.focus();
    await page.keyboard.press('Enter');
    await page.getByRole('heading', { name: 'Standards-to-Practice Map' }).waitFor();
    assert.equal(await page.getByTestId('m3-b1-continue').isEnabled(), true);
  });

  await t.test('generated outputs reflow across every target viewport without decoration or wrapping failures', async () => {
    for (const [number, heading] of [
      [6, 'Standards-to-Practice Map'],
      [7, 'Rights-Holder-to-Barrier Map'],
      [8, 'Actor Responsibility and Relationship Map'],
    ]) {
      await seed(page, number);
      if (number === 6) {
        await chooseCorrectStandards(page);
        await page.getByTestId('m3-b1-generate').click();
      }
      if (number === 7) await generateScreen7(page);
      if (number === 8) await generateScreen8(page);
      await page.getByRole('heading', { name: heading }).waitFor();

      for (const viewport of [
        { width: 1536, height: 864 },
        { width: 1440, height: 900 },
        { width: 1366, height: 768 },
        { width: 390, height: 844 },
        { width: 320, height: 800 },
        { width: 768, height: 432 },
      ]) {
        await page.setViewportSize(viewport);
        await waitForSettled(page);
        const result = await layoutResult(page);
        assert.ok(result.documentOverflow <= 1, `R${number} ${viewport.width}: document overflow ${result.documentOverflow}`);
        assert.ok(result.bodyOverflow <= 1, `R${number} ${viewport.width}: body overflow ${result.bodyOverflow}`);
        assert.ok(result.canvasWidth >= result.viewportWidth * 0.62, `R${number} ${viewport.width}: canvas too narrow`);
        assert.equal(result.activeSolid, true, `R${number} ${viewport.width}: active content is not on a solid surface`);
        assert.equal(result.activeBounded, true, `R${number} ${viewport.width}: active content escaped the canvas`);
        assert.equal(result.naturalWrap, true, `R${number} ${viewport.width}: character-level wrapping detected`);
        assert.ok(result.minimumTextWidth >= 90, `R${number} ${viewport.width}: text collapsed to ${result.minimumTextWidth}px`);
      }
      await page.setViewportSize({ width: 1440, height: 900 });
    }
  });

  assert.deepEqual(errors, []);
});
