import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';

const PORT = 43249;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';
const EVIDENCE_DIR = process.env.MODULE3_REVISED_BATCH2_EVIDENCE_DIR || '';

function progressThrough(number) {
  return Array.from({ length: number }, (_, index) => `M3-R${String(index + 1).padStart(2, '0')}`);
}

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
  throw new Error('Timed out waiting for revised Module 3 Batch 2 server.');
}

async function settle(page) {
  const overlay = page.getByText('Preparing this screen...');
  if (await overlay.count()) await overlay.waitFor({ state: 'hidden', timeout: 10_000 });
}

async function seed(page, number, practices = {}) {
  const screenId = `M3-R${String(number).padStart(2, '0')}`;
  await page.goto(ORIGIN);
  await page.evaluate(({ key, id, progress, practices }) => {
    const current = JSON.parse(localStorage.getItem(key) || '{}');
    localStorage.setItem(key, JSON.stringify({
      ...current,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: 'module_03_project_design',
      currentScreenId: id,
      completedModules: ['module_01_hrba_foundations', 'module_02_everyday_cso_work'],
      screenProgress: { ...(current.screenProgress || {}), module_03_project_design: progress },
      practiceCheckState: { ...(current.practiceCheckState || {}), ...practices },
    }));
  }, { key: STORAGE_KEY, id: screenId, progress: progressThrough(number - 1), practices });
  await page.goto(`${ORIGIN}/module-3/screen-3-${number}`);
  await settle(page);
}

async function capture(page, name) {
  if (!EVIDENCE_DIR) return;
  mkdirSync(EVIDENCE_DIR, { recursive: true });
  await page.screenshot({ path: join(EVIDENCE_DIR, `${name}.png`), fullPage: true });
}

async function assertLayout(page, selector = '.m3-oq-canvas') {
  const result = await page.evaluate((selector) => {
    const root = document.querySelector(selector);
    const rootBox = root?.getBoundingClientRect();
    const readable = [...document.querySelectorAll('.m3-oq-output h2, .m3-oq-output h3, .m3-oq-output p, .m3-oq-output dd')]
      .filter((item) => (item.textContent || '').trim().length >= 24);
    const controls = [...document.querySelectorAll('.m3-oq-interaction input, .m3-oq-interaction textarea, .m3-oq-actions button')];
    return {
      documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      bodyOverflow: document.body.scrollWidth - document.body.clientWidth,
      rootWidth: rootBox?.width || 0,
      minimumReadableWidth: readable.length
        ? Math.min(...readable.map((item) => item.getBoundingClientRect().width))
        : 999,
      anywhere: readable.some((item) => getComputedStyle(item).overflowWrap === 'anywhere'),
      clippedControls: controls.some((item) => {
        const box = item.getBoundingClientRect();
        return rootBox && (box.left < rootBox.left - 1 || box.right > rootBox.right + 1);
      }),
      internalScroll: [...document.querySelectorAll('.m3-oq-output *')].some((item) => {
        const style = getComputedStyle(item);
        return item.scrollWidth > item.clientWidth + 1 && ['auto', 'scroll'].includes(style.overflowX);
      }),
    };
  }, selector);
  assert.ok(result.documentOverflow <= 1, JSON.stringify(result));
  assert.ok(result.bodyOverflow <= 1, JSON.stringify(result));
  assert.ok(result.rootWidth > 250, JSON.stringify(result));
  assert.ok(result.minimumReadableWidth > 90, JSON.stringify(result));
  assert.equal(result.anywhere, false, JSON.stringify(result));
  assert.equal(result.clippedControls, false, JSON.stringify(result));
  assert.equal(result.internalScroll, false, JSON.stringify(result));
  return result;
}

const dependencies = {
  module3_revised_m3_r05: {
    contextInsight: {
      priorityAffectedGroup: 'Women market vendors and traders',
      selectedContextualConditions: ['Market infrastructure and trading space', 'Public water-service access and timing'],
      sourceSignature: 'context-1',
    },
  },
  module3_revised_m3_r07: {
    selectedGroups: ['Women market vendors and traders', 'Residents of remote rural kebeles'],
    assignedBarriers: { women: 'distance-time', remote: 'information' },
    rightsHolderBarrierMap: { sourceSignature: 'rights-1' },
  },
  module3_revised_m3_r08: {
    selectedDutyBearers: ['Woreda Water & Energy Office'],
    selectedSupportingActor: 'Market Vendor Women Committee',
    selectedCsoRole: 'Facilitate accessible evidence and early participation',
    actorRelationshipMap: {
      primaryDutyBearer: 'Woreda Water & Energy Office',
      sourceSignature: 'actors-1',
    },
  },
  module3_revised_m3_r09: {
    actorPowerInsight: {
      selectedEnabler: 'Woreda Water & Energy Office focal point',
      selectedBlocker: 'District Finance & Allocation Committee',
      safeInfluenceStrategy: 'Joint multi-stakeholder monitoring reviews',
      recommendation: 'Use joint review and non-identifying evidence.',
      sourceSignature: 'power-1',
    },
  },
};

test('Revised Batch 2 Screens 9–14 generate, persist, carry forward, and reflow', { timeout: 300_000 }, async (t) => {
  const server = spawn(process.execPath, [
    resolve('node_modules/vite/bin/vite.js'),
    '--host', '127.0.0.1',
    '--port', String(PORT),
    '--strictPort',
  ], { cwd: process.cwd(), env: { ...process.env, BROWSER: 'none' }, stdio: 'ignore' });
  t.after(() => server.kill());
  await waitForApp();

  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  t.after(() => context.close());
  await context.route('https://fonts.googleapis.com/**', (route) => route.fulfill({ contentType: 'text/css', body: '' }));
  await context.route('https://www.youtube.com/embed/**', (route) => route.fulfill({ contentType: 'text/html', body: '<p>Local video placeholder</p>' }));
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await t.test('R09 preserves the six-record map and consumes R08 and R07 carry-forward', async () => {
    await seed(page, 9, dependencies);
    await capture(page, 'm3-r09-default-desktop');
    for (const name of ['m3-r09-enabler', 'm3-r09-blocker', 'm3-r09-strategy']) {
      await page.locator(`input[name="${name}"]`).first().check();
    }
    await capture(page, 'm3-r09-selected-desktop');
    await page.getByTestId('m3-oq-generate').click();
    assert.equal(await page.locator('.m3-oq-actor-list article').count(), 6);
    assert.match(await page.locator('.m3-oq-actor-list').innerText(), /Formal responsibility/);
    assert.match(await page.locator('.m3-oq-actor-list').innerText(), /Practical influence/);
    assert.match(await page.locator('.m3-oq-actor-list').innerText(), /Safe engagement implication/);
    assert.match(await page.locator('.m3-oq-actor-list article').first().innerText(), /Women market vendors/i);
    await capture(page, 'm3-r09-generated-desktop');
    await page.reload();
    await page.getByRole('heading', { name: 'Actor and Power Insight' }).waitFor();
    assert.equal(await page.getByTestId('m3-oq-continue').isEnabled(), true);
    await capture(page, 'm3-r09-resumed-desktop');
  });

  await t.test('R10 uses four decisions and generates the eight-section causal pathway', async () => {
    await seed(page, 10, dependencies);
    await capture(page, 'm3-r10-default-desktop');
    for (const [name, value] of [
      ['m3-r10-direct', 'late-information'],
      ['m3-r10-deeper', 'unequal-influence'],
      ['m3-r10-gap', 'coordination'],
      ['m3-r10-response', 'roles-review'],
    ]) await page.locator(`input[name="${name}"][value="${value}"]`).check();
    await page.getByLabel('Optional analysis note').fill('Verify the main cause without collecting personal details.');
    await capture(page, 'm3-r10-selected-desktop');
    await page.getByRole('button', { name: 'Generate output' }).click();
    assert.equal(await page.locator('.m3-b2-output-details > div').count(), 8);
    assert.deepEqual(await page.locator('.m3-b2-status').allTextContents(), ['Observed', 'Likely', 'Possible', 'Requires verification']);
    await capture(page, 'm3-r10-generated-desktop');
    await page.reload();
    assert.equal(await page.getByRole('button', { name: /Update generated output/ }).count(), 1);
    assert.equal(await page.locator('.m3-oq-primary-action').isEnabled(), true);
    assert.equal(await page.getByLabel('Optional analysis note').inputValue(), 'Verify the main cause without collecting personal details.');
    await capture(page, 'm3-r10-resumed-desktop');
  });

  let savedAfter11;
  await t.test('R11 generates three domain sections and adapts legacy partial state', async () => {
    const legacy = {
      ...dependencies,
      module3_revised_m3_r10: {
        canonicalCausalCapacityPathway: {
          capacityResponseGap: 'Coordination and role clarity gap',
          sourceSignature: 'causal-1',
        },
      },
      module3_revised_m3_r11: {
        markerLiteDashboard: {
          selectedDomainStatuses: {
            participation: 'Partially addressed',
            accessibility: 'Missing',
          },
        },
      },
    };
    await seed(page, 11, legacy);
    assert.equal(await page.locator('input[name="m3-r11-participation"][value="partial"]').isChecked(), true);
    assert.equal(await page.locator('input[name="m3-r11-accessibility"][value="improve"]').isChecked(), true);
    await page.locator('input[name="m3-r11-influence"][value="adequate"]').check();
    await capture(page, 'm3-r11-selected-desktop');
    await page.getByRole('button', { name: 'Generate output' }).click();
    assert.equal(await page.locator('.m3-b2-scorecard article').count(), 3);
    assert.equal(await page.locator('.m3-b2-scorecard dd').count(), 15);
    assert.equal(await page.getByText('Overall score', { exact: false }).count(), 0);
    await capture(page, 'm3-r11-generated-desktop');
    await page.reload();
    assert.equal(await page.locator('.m3-oq-primary-action').isEnabled(), true);
    savedAfter11 = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) || '{}'), STORAGE_KEY);
    assert.equal(savedAfter11.practiceCheckState.module3_revised_m3_r11.selectedRepairs.length, 3);
    await capture(page, 'm3-r11-resumed-desktop');
  });

  await t.test('R12 incorporates inclusion and capacity into the accepted four-phase ordered pathway', async () => {
    const practices = savedAfter11.practiceCheckState;
    await seed(page, 12, practices);
    for (const name of ['m3-r12-information', 'm3-r12-participation', 'm3-r12-response']) {
      await page.locator(`input[name="${name}"]`).first().check();
    }
    await capture(page, 'm3-r12-selected-desktop');
    await page.getByTestId('m3-oq-generate').click();
    assert.equal(await page.locator('.m3-oq-pathway > li').count(), 4);
    assert.match(await page.locator('.m3-oq-pathway').innerText(), /capacity or response gap/i);
    assert.match(await page.locator('.m3-oq-pathway').innerText(), /saved safe engagement strategy/i);
    await capture(page, 'm3-r12-generated-desktop');
    await page.reload();
    assert.equal(await page.getByTestId('m3-oq-continue').isEnabled(), true);
    await capture(page, 'm3-r12-resumed-desktop');
  });

  let savedAfter13;
  await t.test('R13 requires only two risks and two mitigations and generates full operational rows', async () => {
    const practices = (await page.evaluate((key) => JSON.parse(localStorage.getItem(key) || '{}'), STORAGE_KEY)).practiceCheckState;
    await seed(page, 13, practices);
    const checks = page.locator('.m3-oq-choice-group').first().locator('input[type="checkbox"]');
    await checks.nth(0).check();
    await checks.nth(1).check();
    await page.locator('input[name="m3-r13-exclusion"]').first().check();
    await page.locator('input[name="m3-r13-exposure"]').nth(1).check();
    await capture(page, 'm3-r13-selected-desktop');
    await page.getByRole('button', { name: 'Generate output' }).click();
    assert.equal(await page.locator('.m3-b2-risk-list > li').count(), 2);
    assert.equal(await page.locator('.m3-b2-risk-list dd').count(), 14);
    assert.match(await page.locator('.m3-b2-risk-list').innerText(), /Responsible responder/i);
    assert.match(await page.locator('.m3-b2-risk-list').innerText(), /Monitoring signal/i);
    assert.match(await page.locator('.m3-b2-safety-note').innerText(), /does not guarantee/i);
    await capture(page, 'm3-r13-generated-desktop');
    await page.reload();
    assert.equal(await page.locator('.m3-oq-primary-action').isEnabled(), true);
    savedAfter13 = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) || '{}'), STORAGE_KEY);
    await capture(page, 'm3-r13-resumed-desktop');
  });

  await t.test('R14 synthesizes causal, inclusion, pathway, and risk inputs into ten design elements', async () => {
    await seed(page, 14, savedAfter13.practiceCheckState);
    for (const name of ['m3-r14-objective', 'm3-r14-activity', 'm3-r14-watch']) {
      await page.locator(`input[name="${name}"]`).first().check();
    }
    await page.getByLabel('Optional short implementation edit').fill('Confirm the review date with the responsible office.');
    await capture(page, 'm3-r14-selected-desktop');
    await page.getByTestId('m3-oq-generate').click();
    const output = await page.locator('.m3-oq-output').innerText();
    for (const label of [
      'HRBA objective',
      'Activity package',
      'Participation mechanism',
      'Accountability and feedback',
      'Inclusion and accessibility',
      'Risk safeguard',
      'Indicator/watch-point',
      'Implementation implication',
      'Learner edit',
    ]) assert.match(output, new RegExp(label, 'i'), label);
    assert.match(output, /capacity or response gap/i);
    await capture(page, 'm3-r14-generated-desktop');
    await page.reload();
    assert.equal(await page.getByTestId('m3-oq-continue').isEnabled(), true);
    await capture(page, 'm3-r14-resumed-desktop');
  });

  await t.test('R09–R14 retain meaning at all target viewports and keyboard focus is visible', async () => {
    const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) || '{}'), STORAGE_KEY);
    for (const viewport of [
      { width: 1536, height: 864, label: '1536x864' },
      { width: 1440, height: 900, label: '1440x900' },
      { width: 1366, height: 768, label: '1366x768' },
      { width: 390, height: 844, label: '390x844' },
      { width: 320, height: 800, label: '320x800' },
    ]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      for (let screen = 9; screen <= 14; screen += 1) {
        await seed(page, screen, saved.practiceCheckState);
        const output = page.locator('.m3-oq-output');
        if (await output.count()) await output.scrollIntoViewIfNeeded();
        const layout = await assertLayout(page);
        assert.ok(layout.minimumReadableWidth > (viewport.width <= 320 ? 90 : 120));
        if (screen === 13 && viewport.width <= 390) {
          const riskFlowLayout = await page.locator('.m3-b2-risk-flow').first().evaluate((flow) => {
            const box = flow.getBoundingClientRect();
            const parentBox = flow.parentElement?.getBoundingClientRect();
            return {
              columns: getComputedStyle(flow).gridTemplateColumns.split(' ').filter(Boolean).length,
              fitsParent: !parentBox || (box.left >= parentBox.left - 1 && box.right <= parentBox.right + 1),
              overflows: flow.scrollWidth > flow.clientWidth + 1,
            };
          });
          assert.equal(riskFlowLayout.columns, 1, JSON.stringify(riskFlowLayout));
          assert.equal(riskFlowLayout.fitsParent, true, JSON.stringify(riskFlowLayout));
          assert.equal(riskFlowLayout.overflows, false, JSON.stringify(riskFlowLayout));
        }
        if (viewport.width === 390) await capture(page, `m3-r${String(screen).padStart(2, '0')}-generated-mobile-390`);
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await seed(page, 10, saved.practiceCheckState);
    const firstRadio = page.locator('input[name="m3-r10-direct"]').first();
    await firstRadio.focus();
    await firstRadio.press('ArrowDown');
    const focus = await page.evaluate(() => {
      const active = document.activeElement;
      const style = active ? getComputedStyle(active) : null;
      return {
        tag: active?.tagName,
        checked: active instanceof HTMLInputElement ? active.checked : false,
        outline: style?.outlineStyle,
        outlineWidth: style?.outlineWidth,
      };
    });
    assert.equal(focus.tag, 'INPUT');
    assert.equal(focus.checked, true);
    assert.notEqual(focus.outline, 'none');
  });

  assert.deepEqual(errors, []);
});
