import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43196;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const MODULES = [
  'module_01_hrba_foundations',
  'module_02_everyday_cso_work',
  'module_03_project_design',
  'module_04_implementation',
  'module_05_hrba_meal',
];

async function waitForApp() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(APP_ORIGIN)).ok) return;
    } catch {
      // Keep waiting for Vite.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 100));
  }
  throw new Error('Timed out waiting for the legacy migration test server.');
}

test('legacy HRBA state migrates through a strict, non-throwing compatibility boundary', {
  timeout: 120_000,
}, async (t) => {
  const vite = spawn(process.execPath, [
    resolve('node_modules/vite/bin/vite.js'), '--host', '127.0.0.1', '--port', String(APP_PORT), '--strictPort',
  ], { cwd: process.cwd(), env: { ...process.env, BROWSER: 'none' }, stdio: 'ignore' });
  t.after(() => vite.kill());
  await waitForApp();

  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());
  const page = await browser.newPage();
  await page.goto(APP_ORIGIN);

  const result = await page.evaluate(async ({ modules }) => {
    const resume = await import('/src/integration/resumeState.ts');
    const revision = '2026-08-10T10:00:00.000Z';
    const legacy54 = {
      storageVersion: 'hrba-course-progress-v1',
      currentLayer: 'player',
      currentModuleId: modules[3],
      currentScreenId: 'M4-REMOVED-SCREEN',
      completedModules: modules.slice(0, 3),
      screenProgress: {
        [modules[0]]: ['M1-PLAYER-00', 'M1-PLAYER-COMPLETE'],
        [modules[1]]: ['M2-00', 'M2-Close'],
        [modules[2]]: ['M3-PLAYER-00', 'M3-R22'],
        [modules[3]]: ['M4-PLAYER-00', 'M4-S1-01', 'M4-S1-02', 'M4-S1-03', 'M4-OBSOLETE'],
        old_presentation_module: ['PRESENTATION-01'],
      },
      practiceCheckState: {
        module3_design_snapshot: { selected: ['participation'] },
        module4ImplementationNote: { note: 'Historical implementation reflection.' },
        obsoletePresentationState: { drawerOpen: true },
      },
      agreementAccepted: true,
      m2PlainLanguageRightsExplanation: 'Rights-holders can claim rights.',
      activeModal: 'help',
      transcriptVisible: true,
      learnerStateKey: 'must-not-survive',
      finalAssessmentAnswers: { q1: 'a' },
      finalAssessmentResult: {
        attemptNumber: 99,
        passed: true,
        score: 10,
      },
      finalAssessmentAttemptNumber: 99,
      completed: true,
    };
    const migrated54 = resume.migrateLegacyLearningState(legacy54, revision);

    const legacy5 = {
      storageVersion: 'hrba-course-progress-v1',
      currentModuleId: modules[4],
      currentScreenId: 'M5-R03',
      completedModules: modules.slice(0, 4),
      screenProgress: { [modules[4]]: ['M5-PLAYER-00', 'M5-R02'] },
      practiceCheckState: {
        module5IntroVideo: { completed: true },
        module5_m5_r03: { repairNoteText: 'Historical note' },
      },
    };
    const migrated5 = resume.migrateLegacyLearningState(legacy5, revision);
    const authorityOnly = resume.migrateLegacyLearningState({
      ...legacy54,
      currentScreenId: 'M4-S1-04',
      screenProgress: { [modules[3]]: ['M4-PLAYER-00'] },
    }, revision);
    const unsupportedCompletion = resume.migrateLegacyLearningState({
      ...legacy54,
      completedModules: [...modules.slice(0, 3), 'unknown_module'],
    }, revision);
    const prerequisiteJump = resume.migrateLegacyLearningState({
      ...legacy54,
      completedModules: [modules[0], modules[2]],
    }, revision);
    const malformed = resume.migrateLegacyLearningState({
      ...legacy54,
      screenProgress: [],
    }, revision);
    const cannotMigrate = resume.migrateLegacyLearningState({
      ...legacy54,
      practiceCheckState: { module4Unsafe: { learnerStateKey: 'forbidden' } },
    }, revision);
    const empty = resume.migrateLegacyLearningState({
      storageVersion: 'hrba-course-progress-v1',
      currentModuleId: null,
      currentScreenId: null,
      completedModules: [],
      screenProgress: {},
      practiceCheckState: {},
    }, revision);
    const eligibleAssessmentNavigation = resume.migrateLegacyLearningState({
      storageVersion: 'hrba-course-progress-v1',
      currentLayer: 'player',
      currentModuleId: 'final_assessment',
      currentScreenId: 'FINAL-ASSESSMENT-QUESTIONS',
      completedModules: modules,
      screenProgress: { final_assessment: ['FINAL-ASSESSMENT-COMPLETE'] },
      practiceCheckState: {},
      finalAssessmentResult: { passed: true, attemptNumber: 77 },
      finalAssessmentAttemptNumber: 77,
    }, revision);

    const migrated54Json = migrated54.ok ? JSON.stringify(migrated54.resumeState) : '';
    return {
      migrated54Ok: migrated54.ok,
      meaningful54: migrated54.ok && migrated54.meaningful,
      progress54: migrated54.ok && migrated54.resumeState.completedModuleIds.length === 3,
      navigationFallback: migrated54.ok
        && migrated54.resumeState.navigation.currentModuleId === modules[3]
        && migrated54.resumeState.navigation.currentScreenId === 'M4-S1-04',
      unknownScreenDropped: migrated54.ok
        && !JSON.stringify(migrated54.resumeState.completedScreenIdsByModule).includes('M4-OBSOLETE'),
      module4Migrated: migrated54.ok
        && Boolean(migrated54.learningState.practiceCheckState.module4Enhanced),
      obsoleteDropped: !migrated54Json.includes('obsoletePresentationState')
        && !migrated54Json.includes('activeModal')
        && !migrated54Json.includes('transcriptVisible'),
      authorityDropped: !migrated54Json.includes('finalAssessmentResult')
        && !migrated54Json.includes('finalAssessmentAttemptNumber')
        && !migrated54Json.includes('finalAssessmentAnswers')
        && !migrated54Json.includes('learnerStateKey'),
      safeWarnings: migrated54.ok && migrated54.warnings.every((warning) => (
        typeof warning.category === 'string'
        && typeof warning.path === 'string'
        && Object.keys(warning).length === 2
      )),
      module5Migrated: migrated5.ok
        && Boolean(migrated5.learningState.practiceCheckState.module5Presentation),
      authorityOnlyStillSafe: authorityOnly.ok
        && authorityOnly.learningState.finalAssessmentResult === null
        && authorityOnly.learningState.finalAssessmentAttemptNumber === 0,
      unsupportedCompletionRejected: !unsupportedCompletion.ok,
      prerequisiteJumpRejected: !prerequisiteJump.ok,
      malformedRejected: !malformed.ok,
      cannotMigrateRejected: !cannotMigrate.ok,
      emptyRemainsEmpty: empty.ok
        && !empty.meaningful
        && empty.resumeState.navigation.currentModuleId === null
        && empty.resumeState.navigation.currentScreenId === null,
      eligibleAssessmentNavigationSafe: eligibleAssessmentNavigation.ok
        && eligibleAssessmentNavigation.resumeState.navigation.currentModuleId === 'final_assessment'
        && eligibleAssessmentNavigation.resumeState.navigation.currentScreenId === 'FINAL-ASSESSMENT-QUESTIONS'
        && !eligibleAssessmentNavigation.resumeState.completedModuleIds.includes('final_assessment')
        && !JSON.stringify(eligibleAssessmentNavigation.resumeState).includes('finalAssessmentResult'),
    };
  }, { modules: MODULES });

  assert.deepEqual(result, {
    migrated54Ok: true,
    meaningful54: true,
    progress54: true,
    navigationFallback: true,
    unknownScreenDropped: true,
    module4Migrated: true,
    obsoleteDropped: true,
    authorityDropped: true,
    safeWarnings: true,
    module5Migrated: true,
    authorityOnlyStillSafe: true,
    unsupportedCompletionRejected: true,
    prerequisiteJumpRejected: true,
    malformedRejected: true,
    cannotMigrateRejected: true,
    emptyRemainsEmpty: true,
    eligibleAssessmentNavigationSafe: true,
  });
});
