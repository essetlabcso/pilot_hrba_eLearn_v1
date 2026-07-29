import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';

const PORT = 43250;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const EVIDENCE_DIR = process.env.MODULE3_REVISED_BATCH3_EVIDENCE_DIR || '';
const key = (id) => `module3_revised_${id.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
const visibleProgressThrough = (number) => Array.from({ length: number }, (_, index) => `M3-R${String(index + 1).padStart(2, '0')}`)
  .filter((id) => !['M3-R15', 'M3-R16', 'M3-R18', 'M3-R19'].includes(id));

const dependencies = {
  [key('M3-R05')]: {
    contextInsight: {
      priorityAffectedGroup: 'Women market vendors and traders',
      contextFactors: ['late information', 'distance and timing'],
      inequalityPattern: 'Lower-influence groups receive information later.',
      accessParticipationEffect: 'Late information limits preparation and influence.',
      evidenceGap: 'Verify notice access before decisions.',
      designImplication: 'Use accessible early information and supported preparation.',
      sourceSignature: 'context-current',
    },
  },
  [key('M3-R09')]: {
    actorPowerInsight: {
      actorRelationships: 'The planning office holds authority; local gatekeepers shape access.',
      formalResponsibility: 'The woreda planning office retains the decision.',
      practicalInfluence: 'Local gatekeepers influence who receives information.',
      likelyPosition: 'The focal point may enable an early review.',
      recommendation: 'Use accessible information, non-identifying evidence and an alternative route.',
      sourceSignature: 'actor-current',
    },
  },
  [key('M3-R10')]: {
    canonicalCausalCapacityPathway: {
      capacityResponseGap: 'Coordination and response timing are not assigned.',
      issueRequiringVerification: 'Verify the responsible review point.',
      sourceSignature: 'capacity-current',
    },
  },
  [key('M3-R11')]: { inclusionDesignScorecard: { sourceSignature: 'inclusion-current' } },
  [key('M3-R12')]: { canonicalPathwaySummary: { sourceSignature: 'pathway-current' } },
  [key('M3-R13')]: { canonicalRiskMatrix: { sourceSignature: 'risk-current' } },
  [key('M3-R14')]: {
    repairedDesignElement: {
      originalWeakness: 'Participation occurs after decisions.',
      repairedObjective: 'Priority groups influence planning decisions.',
      activityPackage: 'Early accessible information and supported preparation.',
      participationMechanism: 'Small-group preparation before the decision meeting.',
      accountabilityMechanism: 'Response, explanation and follow-up by the responsible office.',
      inclusionAccessibilityFeature: 'Accessible formats and reasonable accommodation.',
      riskSafeguard: 'Non-identifying evidence and alternative channels.',
      indicatorWatchPoint: 'Evidence that priorities changed the plan.',
      implementationImplication: 'Review whether the mechanism works and adapt.',
      sourceSignature: 'repair-current',
    },
  },
};

async function waitForApp() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(ORIGIN)).ok) return;
    } catch {
      // Wait for Vite.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 150));
  }
  throw new Error('Timed out waiting for revised Module 3 Batch 3 server.');
}

async function settle(page) {
  const overlay = page.getByText('Preparing this screen...');
  if (await overlay.count()) await overlay.waitFor({ state: 'hidden', timeout: 10_000 });
}

async function seed(page, screenNumber, practices = dependencies, overrides = {}) {
  const screenId = `M3-R${String(screenNumber).padStart(2, '0')}`;
  await page.goto(ORIGIN);
  await page.evaluate(({ storageKey, practices, screenId, screenNumber, overrides }) => {
    const current = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const progress = Array.from({ length: screenNumber - 1 }, (_, index) => `M3-R${String(index + 1).padStart(2, '0')}`)
      .filter((id) => !['M3-R15', 'M3-R16', 'M3-R18', 'M3-R19'].includes(id));
    localStorage.setItem(storageKey, JSON.stringify({
      ...current,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: 'module_03_project_design',
      currentScreenId: screenId,
      completedModules: overrides.completedModules || ['module_01_hrba_foundations', 'module_02_everyday_cso_work'],
      screenProgress: {
        ...(current.screenProgress || {}),
        module_03_project_design: overrides.progress || progress,
      },
      practiceCheckState: {
        ...(current.practiceCheckState || {}),
        ...practices,
        ...(overrides.practiceCheckState || {}),
      },
    }));
  }, { storageKey: STORAGE_KEY, practices, screenId, screenNumber, overrides });
  await page.goto(`${ORIGIN}/module-3/screen-3-${screenNumber}`);
  await settle(page);
}

async function capture(page, name) {
  if (!EVIDENCE_DIR) return;
  await settle(page);
  mkdirSync(EVIDENCE_DIR, { recursive: true });
  await page.screenshot({ path: join(EVIDENCE_DIR, `${name}.png`), fullPage: true });
}

async function assertLayout(page) {
  const metrics = await page.evaluate(() => {
    const canvas = document.querySelector('.m3-oq-canvas');
    const canvasBox = canvas?.getBoundingClientRect();
    const textBlocks = [...document.querySelectorAll('.m3-b3-canvas p, .m3-b3-canvas dd, .m3-b3-canvas label span')]
      .filter((element) => (element.textContent || '').trim().length > 20);
    const controls = [...document.querySelectorAll('.m3-b3-canvas button, .m3-b3-canvas input, .m3-b3-canvas textarea')];
    return {
      documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      bodyOverflow: document.body.scrollWidth - document.body.clientWidth,
      canvasWidth: canvasBox?.width || 0,
      narrowestText: textBlocks.length ? Math.min(...textBlocks.map((element) => element.getBoundingClientRect().width)) : 999,
      anywhere: textBlocks.some((element) => getComputedStyle(element).overflowWrap === 'anywhere'),
      clippedControls: controls.some((element) => {
        const box = element.getBoundingClientRect();
        return canvasBox && (box.left < canvasBox.left - 1 || box.right > canvasBox.right + 1);
      }),
      internalScroll: [...document.querySelectorAll('.m3-b3-canvas *')].some((element) => {
        const style = getComputedStyle(element);
        return element.scrollWidth > element.clientWidth + 1 && ['auto', 'scroll'].includes(style.overflowX);
      }),
    };
  });
  assert.ok(metrics.documentOverflow <= 1, JSON.stringify(metrics));
  assert.ok(metrics.bodyOverflow <= 1, JSON.stringify(metrics));
  assert.ok(metrics.canvasWidth > 250, JSON.stringify(metrics));
  assert.ok(metrics.narrowestText > 85, JSON.stringify(metrics));
  assert.equal(metrics.anywhere, false, JSON.stringify(metrics));
  assert.equal(metrics.clippedControls, false, JSON.stringify(metrics));
  assert.equal(metrics.internalScroll, false, JSON.stringify(metrics));
  return metrics;
}

test('Revised Batch 3 proposal, assessment, four-product portfolio and closure remain coherent', { timeout: 300_000 }, async (t) => {
  const server = spawn(process.execPath, [resolve('node_modules/vite/bin/vite.js'), '--host', '127.0.0.1', '--port', String(PORT)], {
    cwd: process.cwd(),
    stdio: 'ignore',
  });
  await waitForApp();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  try {
    await t.test('R17 uses two decisions, optional bounded editing, eight-section generation and resume', async () => {
      await seed(page, 17);
      await capture(page, 'm3-r17-default-desktop');
      const gap = page.locator('input[name="m3-r17-gap"]').first();
      await gap.check();
      const edit = page.locator('.m3-b3-edit textarea');
      await edit.fill('Record priorities before approval and publish a concise response.');
      await capture(page, 'm3-r17-selected-edited-desktop');
      await page.getByRole('button', { name: 'Generate insight' }).click();
      assert.equal(await page.locator('.m3-b3-review-sequence article').count(), 5);
      assert.equal(await page.getByRole('heading', { name: 'Proposal-Review Insight' }).isVisible(), true);
      assert.equal(await page.getByRole('button', { name: 'Continue' }).isEnabled(), true);
      await capture(page, 'm3-r17-generated-desktop');
      await page.reload();
      await settle(page);
      assert.equal(await page.getByRole('button', { name: 'Continue' }).isEnabled(), true);
      await capture(page, 'm3-r17-resumed-desktop');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL('**/module-3/screen-3-20');
    });

    await t.test('R20 preserves all ten answers, unanswered guidance, review, feedback and result', async () => {
      const correct = ['b', 'c', 'a', 'd', 'b', 'c', 'a', 'd', 'b', 'c'];
      await capture(page, 'm3-r20-question-desktop');
      for (let index = 0; index < 10; index += 1) {
        const id = `m3-akc-q${String(index + 1).padStart(2, '0')}`;
        await page.locator(`input[name="${id}"][value="${correct[index]}"]`).check();
        if (index < 9) await page.getByRole('button', { name: 'Next', exact: true }).click();
        else await page.getByRole('button', { name: 'Review answers' }).click();
      }
      assert.equal(await page.getByRole('button', { name: 'Submit all answers' }).isEnabled(), true);
      await capture(page, 'm3-r20-review-desktop');
      await page.getByRole('button', { name: 'Submit all answers' }).click();
      assert.equal(await page.getByRole('heading', { name: '10/10 · Strong application' }).isVisible(), true);
      await capture(page, 'm3-r20-result-desktop');
      await page.getByText('Question feedback', { exact: true }).click();
      await capture(page, 'm3-r20-feedback-desktop');
      await page.reload();
      await settle(page);
      assert.equal(await page.getByRole('heading', { name: '10/10 · Strong application' }).isVisible(), true);
      await page.getByRole('button', { name: 'Continue to portfolio' }).click();
      await page.waitForURL('**/module-3/screen-3-21');
    });

    let currentSnapshotState;
    await t.test('R21 shows exactly four products, saves idempotently and keeps download optional', async () => {
      assert.equal(await page.locator('.m3-b3-product').count(), 4);
      assert.equal(await page.getByText('Review all 14 snapshot sections').count(), 0);
      assert.equal(await page.getByRole('button', { name: 'Save Snapshot' }).isEnabled(), true);
      await capture(page, 'm3-r21-four-products-current-desktop');
      await page.getByRole('button', { name: 'Save Snapshot' }).click();
      await page.getByText('Four-product portfolio snapshot saved.').waitFor();
      assert.equal(await page.getByRole('button', { name: 'Download Module 3 four-product portfolio' }).isEnabled(), true);
      await page.getByRole('button', { name: 'Save Snapshot' }).click();
      assert.equal(await page.getByText('Four-product portfolio snapshot saved.').isVisible(), true);
      currentSnapshotState = await page.evaluate((storageKey) => JSON.parse(localStorage.getItem(storageKey)), STORAGE_KEY);
      assert.equal(currentSnapshotState.practiceCheckState[key('M3-R21')].finalSnapshot.products.length, 4);
      assert.ok(currentSnapshotState.practiceCheckState[key('M3-R21')].finalSnapshot.savedAt);
      await page.getByRole('button', { name: 'Continue to Module 3 Closure' }).click();
      await page.waitForURL('**/module-3/screen-3-22');
    });

    await t.test('R22 records one completion and preserves the first timestamp while opening Module 4', async () => {
      assert.equal(await page.getByRole('button', { name: 'Continue to Module 4' }).isEnabled(), false);
      await page.getByLabel('I reviewed the current four-product snapshot and will carry its watch-points into implementation.').check();
      assert.equal(await page.getByRole('button', { name: 'Continue to Module 4' }).isEnabled(), true);
      await capture(page, 'm3-r22-current-completion-desktop');
      await page.getByRole('button', { name: 'Continue to Module 4' }).click();
      await page.waitForURL('**/module-4/cover');
      const state = await page.evaluate((storageKey) => JSON.parse(localStorage.getItem(storageKey)), STORAGE_KEY);
      assert.equal(state.completedModules.filter((id) => id === 'module_03_project_design').length, 1);
      assert.equal(state.screenProgress.module_03_project_design.filter((id) => id === 'M3-R22').length, 1);
      assert.ok(state.practiceCheckState[key('M3-R22')].completedAt);
    });

    await t.test('historical and legacy learners retain completion without rebuilding four products', async () => {
      const legacy = {
        ...dependencies,
        [key('M3-R17')]: { draftPlanReviewNote: 'Earlier proposal review note' },
        [key('M3-R21')]: { finalSnapshot: { snapshotStatus: 'saved', savedAt: '2025-01-01T00:00:00.000Z' } },
        [key('M3-R22')]: { completed: true, completedAt: '2025-01-02T00:00:00.000Z' },
      };
      const historicalProgress = [...visibleProgressThrough(22), 'M3-R22'];
      await seed(page, 21, legacy, { completedModules: ['module_01_hrba_foundations', 'module_02_everyday_cso_work', 'module_03_project_design'], progress: historicalProgress });
      assert.equal(await page.getByText('Historical Module 3 completion remains valid.').isVisible(), true);
      assert.equal(await page.locator('.m3-b3-product').count(), 4);
      await capture(page, 'm3-r21-historical-legacy-desktop');
      await seed(page, 22, legacy, { completedModules: ['module_01_hrba_foundations', 'module_02_everyday_cso_work', 'module_03_project_design'], progress: historicalProgress });
      assert.equal(await page.getByText('Your valid earlier Module 3 completion remains preserved.').isVisible(), true);
      assert.equal(await page.getByRole('button', { name: 'Continue to Module 4' }).isEnabled(), true);
      await capture(page, 'm3-r22-historical-completion-desktop');
    });

    await t.test('R21 shows stale and missing source guidance without duplicating products', async () => {
      const staleSnapshot = {
        snapshotStatus: 'saved',
        sourceSignatures: {
          contextInsight: 'context-earlier',
          actorPowerInsight: 'actor-earlier',
          repairedDesignElement: 'repair-earlier',
          proposalReviewInsight: 'proposal-earlier',
        },
      };
      await seed(page, 21, {
        ...dependencies,
        [key('M3-R17')]: currentSnapshotState.practiceCheckState[key('M3-R17')],
        [key('M3-R21')]: { finalSnapshot: staleSnapshot },
      });
      assert.equal(await page.locator('.m3-b3-product').count(), 4);
      assert.ok(await page.getByText('Updated source available', { exact: true }).count() >= 1);
      await capture(page, 'm3-r21-stale-source-desktop');

      await seed(page, 21, {
        ...dependencies,
        [key('M3-R17')]: {},
        [key('M3-R21')]: {},
      });
      assert.equal(await page.locator('.m3-b3-product').count(), 4);
      assert.equal(await page.getByText('Missing source', { exact: true }).count(), 1);
      await capture(page, 'm3-r21-missing-source-desktop');
    });

    await t.test('hidden routes preserve IDs, expose no workflow, create no progress and do not loop', async () => {
      for (const [number, destination] of [[15, 'screen-3-14'], [16, 'screen-3-14'], [18, 'screen-3-17'], [19, 'screen-3-20']]) {
        await seed(page, number);
        const hasCompatibility = await page.getByTestId('m3-hidden-compatibility').count();
        const currentUrl = page.url();
        const reachedCanonicalIntegrationPoint = [
          '/module-3/screen-3-14',
          '/module-3/screen-3-17',
          '/module-3/screen-3-20',
        ].some((route) => currentUrl.includes(route));
        assert.ok(
          hasCompatibility === 1 || reachedCanonicalIntegrationPoint,
          `Hidden Screen ${number} should show its compatibility notice or resolve to a canonical integration point; received ${currentUrl}`,
        );
        const before = await page.evaluate((storageKey) => JSON.parse(localStorage.getItem(storageKey)).screenProgress.module_03_project_design, STORAGE_KEY);
        if (hasCompatibility === 1) {
          const link = page.locator(`[href="/module-3/${destination}"]`);
          assert.equal(await link.count(), 1);
          await link.click();
          await page.waitForURL(`**/module-3/${destination}`);
          await page.goBack();
          await settle(page);
          assert.ok(page.url().includes(`/module-3/screen-3-${number}`));
          assert.equal(await page.getByTestId('m3-hidden-compatibility').count(), 1);
        }
        const after = await page.evaluate((storageKey) => JSON.parse(localStorage.getItem(storageKey)).screenProgress.module_03_project_design, STORAGE_KEY);
        assert.deepEqual(after, before);
      }
    });

    await t.test('R17, R20, R21 and R22 reflow at every target viewport with visible focus', async () => {
      const savedState = currentSnapshotState;
      for (const viewport of [
        { width: 1536, height: 864 },
        { width: 1440, height: 900 },
        { width: 1366, height: 768 },
        { width: 390, height: 844 },
        { width: 320, height: 800 },
      ]) {
        await page.setViewportSize(viewport);
        for (const screenNumber of [17, 20, 21, 22]) {
          await seed(page, screenNumber, savedState.practiceCheckState, {
            completedModules: savedState.completedModules,
            progress: savedState.screenProgress.module_03_project_design,
          });
          const metrics = await assertLayout(page);
          if (screenNumber === 21 && viewport.width <= 390) {
            const columns = await page.locator('.m3-b3-portfolio-grid').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length);
            assert.equal(columns, 1);
          }
          if (viewport.width === 390) await capture(page, `m3-r${screenNumber}-mobile-390`);
          assert.ok(metrics.narrowestText > 85);
        }
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await seed(page, 20, dependencies, {
        progress: visibleProgressThrough(19),
        practiceCheckState: { [key('M3-R20')]: {} },
      });
      const firstRadio = page.locator('input[name="m3-akc-q01"]').first();
      await firstRadio.focus();
      await firstRadio.press('ArrowDown');
      const focus = await page.evaluate(() => {
        const active = document.activeElement;
        const label = active?.closest('label');
        return {
          tag: active?.tagName,
          checked: active instanceof HTMLInputElement ? active.checked : false,
          outline: label ? getComputedStyle(label).outlineStyle : 'none',
        };
      });
      assert.equal(focus.tag, 'INPUT');
      assert.equal(focus.checked, true);
      assert.notEqual(focus.outline, 'none');
    });

    assert.deepEqual(errors, []);
  } finally {
    await context.close();
    await browser.close();
    server.kill();
  }
});
