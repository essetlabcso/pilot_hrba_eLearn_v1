import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import { createInitialModule4EnhancedState } from '../src/data/module4/module4EnhancedModel.ts';
import { createEmptyModule5PresentationState } from '../src/data/module5/module5EnhancedModel.ts';

const PORT = 43199;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';

async function waitForApp() {
  const deadline = Date.now() + 45_000;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(ORIGIN);
      if (res.ok) return;
    } catch (e) {
      lastError = e;
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw lastError || new Error('Timed out waiting for test app server.');
}

test('HRBA Layout Hotfix - Module 4 & Module 5 Responsive Canvas Verification', async (t) => {
  const server = spawn('cmd.exe', ['/c', 'npx', 'vite', '--port', String(PORT), '--host', '127.0.0.1'], {
    stdio: 'ignore',
    cwd: process.cwd(),
  });

  try {
    await waitForApp();

    const browser = await chromium.launch();
    const viewports = [
      { name: '1536x864', width: 1536, height: 864 },
      { name: '1440x900', width: 1440, height: 900 },
      { name: '1366x768', width: 1366, height: 768 },
      { name: '390x844', width: 390, height: 844 },
      { name: '320x800', width: 320, height: 800 },
    ];

    const targetScreens = [
      { id: 'M4-S1-02', route: '/module-4/screen-4-2', moduleId: 'module_04_implementation' },
      { id: 'M4-S1-04', route: '/module-4/screen-4-4', moduleId: 'module_04_implementation' },
      { id: 'M4-S1-06', route: '/module-4/screen-4-6', moduleId: 'module_04_implementation' },
      { id: 'M4-S1-07', route: '/module-4/screen-4-7', moduleId: 'module_04_implementation' },
      { id: 'M5-R13', route: '/module-5/screen-5-15', moduleId: 'module_05_meal_accountability' },
    ];

    const m4State = createInitialModule4EnhancedState('2026-07-26T10:00:00.000Z');
    const m5State = createEmptyModule5PresentationState();

    const seedObj = {
      storageVersion: 'hrba-course-progress-v1',
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: 'module_04_implementation',
      currentScreenId: 'M4-S1-02',
      currentSubState: null,
      activeModal: null,
      completedModules: [
        'module_01_hrba_foundations',
        'module_02_everyday_cso_work',
        'module_03_project_design',
        'module_04_implementation',
      ],
      screenProgress: {
        module_01_hrba_foundations: ['M1-PLAYER-00', 'M1-S1-01'],
        module_02_everyday_cso_work: ['M2-S01'],
        module_03_project_design: ['M3-PLAYER-00'],
        module_04_implementation: [
          'M4-S1-01', 'M4-S1-02', 'M4-S1-03', 'M4-S1-04', 'M4-S1-05', 'M4-S1-06', 'M4-S1-07', 'M4-S1-08', 'M4-S1-09', 'M4-S1-10', 'M4-S1-11', 'M4-S1-12', 'M4-S1-13', 'M4-S1-14'
        ],
        module_05_hrba_meal: [
          'M5-R01', 'M5-R02', 'M5-R03', 'M5-R04', 'M5-R05', 'M5-R06', 'M5-R07', 'M5-R08', 'M5-R09', 'M5-R10', 'M5-R11', 'M5-R12', 'M5-R13', 'M5-R14'
        ],
      },
      quizAttempts: {},
      practiceCheckState: {
        module4Enhanced: m4State,
        module5Presentation: m5State,
      },
      finalAssessmentAttemptNumber: 0,
    };

    for (const vp of viewports) {
      await t.test(`Viewport ${vp.name}`, async () => {
        const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
        const page = await context.newPage();

        await page.goto(ORIGIN, { timeout: 60000, waitUntil: 'domcontentloaded' });
        await page.evaluate(({ key, seed }) => {
          localStorage.setItem(key, JSON.stringify(seed));
        }, { key: STORAGE_KEY, seed: seedObj });

        for (const scr of targetScreens) {
          await page.evaluate(({ key, moduleId, screenId }) => {
            const state = JSON.parse(localStorage.getItem(key));
            state.currentModuleId = moduleId;
            state.currentScreenId = screenId;
            localStorage.setItem(key, JSON.stringify(state));
          }, { key: STORAGE_KEY, moduleId: scr.moduleId, screenId: scr.id });

          await page.goto(`${ORIGIN}${scr.route}`, { timeout: 60000, waitUntil: 'networkidle' });
          await page.waitForTimeout(300);

          const overflowMetrics = await page.evaluate(() => {
            const doc = document.documentElement;
            const canvas = document.querySelector('.m4-enhanced-screen, .m5f-screen, .main-screen-canvas__content') || doc;
            const leftPanel = document.querySelector('.m4-enhanced-screen__context, .m5f-summary-card');
            const rightPanel = document.querySelector('.m4-enhanced-screen__activity, .m5f-candidates');

            return {
              docScrollWidth: doc.scrollWidth,
              docClientWidth: doc.clientWidth,
              canvasScrollWidth: canvas.scrollWidth,
              canvasClientWidth: canvas.clientWidth,
              leftWidth: leftPanel ? Math.round(leftPanel.getBoundingClientRect().width) : 0,
              rightWidth: rightPanel ? Math.round(rightPanel.getBoundingClientRect().width) : 0,
              canvasWidth: canvas ? Math.round(canvas.getBoundingClientRect().width) : 0,
            };
          });

          assert.ok(
            overflowMetrics.docScrollWidth <= overflowMetrics.docClientWidth + 2,
            `[${vp.name}] ${scr.id} document horizontal overflow detected: scrollWidth=${overflowMetrics.docScrollWidth}, clientWidth=${overflowMetrics.docClientWidth}`
          );

          if (vp.width >= 1366 && (scr.id === 'M4-S1-02' || scr.id === 'M4-S1-04')) {
            assert.ok(
              overflowMetrics.leftWidth >= 380,
              `[${vp.name}] ${scr.id} left panel too narrow: ${overflowMetrics.leftWidth}px (expected >= 380px)`
            );
          }

          const controlsCount = await page.locator('button, input[type="radio"], input[type="checkbox"]').count();
          assert.ok(controlsCount > 0, `[${vp.name}] ${scr.id} must have active operable controls`);
        }

        await context.close();
      });
    }

    await browser.close();

  } finally {
    server.kill('SIGTERM');
  }
});
