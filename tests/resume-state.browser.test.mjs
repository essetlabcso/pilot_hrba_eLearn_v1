import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43191;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;

async function waitForApp() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(APP_ORIGIN);
      if (response.ok) return;
    } catch {
      // Keep waiting for Vite.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 100));
  }
  throw new Error('Timed out waiting for the HRBA resume test server.');
}

test('HRBA serializes and hydrates only the versioned durable resume contract', {
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

  const result = await page.evaluate(async () => {
    const resume = await import('/src/integration/resumeState.ts');
    const learning = await import('/src/state/learningState.ts');
    const module4 = await import('/src/data/module4/module4EnhancedModel.ts');
    const module5 = await import('/src/data/module5/module5EnhancedModel.ts');
    const sample = structuredClone(learning.initialLearningState);
    sample.currentLayer = 'player';
    sample.currentModuleId = 'module_04_implementation';
    sample.currentScreenId = 'M4-S1-04';
    sample.completedModules = [
      'module_01_hrba_foundations',
      'module_02_everyday_cso_work',
      'module_03_project_design',
    ];
    sample.screenProgress = {
      module_01_hrba_foundations: ['M1-PLAYER-00', 'M1-PLAYER-COMPLETE'],
      module_02_everyday_cso_work: ['M2-00', 'M2-Close'],
      module_03_project_design: ['M3-PLAYER-00', 'M3-R22'],
      module_04_implementation: ['M4-PLAYER-00', 'M4-S1-01', 'M4-S1-02', 'M4-S1-03'],
    };
    sample.agreementAccepted = true;
    sample.surveyNote = 'A bounded learner reflection.';
    sample.m2PlainLanguageRightsExplanation = 'Rights-holders can claim rights.';
    sample.practiceCheckState = {
      module3_design_snapshot: { selected: ['participation'] },
      module4Enhanced: module4.createInitialModule4EnhancedState('2026-08-09T00:00:00.000Z'),
      module5Presentation: module5.createEmptyModule5PresentationState(),
    };
    sample.activeModal = 'help';
    sample.transcriptVisible = true;
    sample.soundState = false;
    sample.captionState = true;
    sample.resourceView = 'glossary';
    sample.finalAssessmentResult = {
      attemptNumber: 9,
      evidenceId: '123e4567-e89b-42d3-a456-426614174000',
      maxScore: 10,
      passed: true,
      percentage: 100,
      score: 10,
      submittedAt: '2026-08-09T00:00:00.000Z',
    };
    sample.finalAssessmentAttemptNumber = 9;

    const revision = '2026-08-09T01:00:00.000Z';
    const serialized = resume.serializeLearningStateForResume(sample, revision);
    const hydrated = resume.hydrateLearningStateFromResume(serialized, null);
    const invalidUnknown = structuredClone(serialized);
    invalidUnknown.moduleState.module3.data.unknown = true;
    const invalidScreen = structuredClone(serialized);
    invalidScreen.navigation.currentScreenId = 'M4-UNKNOWN';
    const oversized = structuredClone(serialized);
    oversized.moduleState.module1.data.surveyNote = 'x'.repeat(520_000);

    return {
      assessmentExcluded: !JSON.stringify(serialized).includes('finalAssessmentResult')
        && !JSON.stringify(serialized).includes('finalAssessmentAttemptNumber'),
      derivedAuthorityCleared: hydrated.finalAssessmentResult === null
        && hydrated.finalAssessmentAttemptNumber === 0
        && !hydrated.completedModules.includes('final_assessment'),
      module1: hydrated.agreementAccepted && hydrated.surveyNote === sample.surveyNote,
      module2: hydrated.m2PlainLanguageRightsExplanation === sample.m2PlainLanguageRightsExplanation,
      module3: Boolean(hydrated.practiceCheckState.module3_design_snapshot),
      module4: Boolean(hydrated.practiceCheckState.module4Enhanced),
      module5: Boolean(hydrated.practiceCheckState.module5Presentation),
      navigation: hydrated.currentModuleId === 'module_04_implementation'
        && hydrated.currentScreenId === 'M4-S1-04',
      oversizedRejected: resume.validateHrbaResumeState(oversized) === null,
      presentationExcluded: !JSON.stringify(serialized).includes('activeModal')
        && !JSON.stringify(serialized).includes('transcriptVisible')
        && !JSON.stringify(serialized).includes('soundState')
        && !JSON.stringify(serialized).includes('captionState')
        && !JSON.stringify(serialized).includes('resourceView'),
      progress: hydrated.completedModules.length === 3,
      revision: serialized.baseRevision === revision,
      unknownRejected: resume.validateHrbaResumeState(invalidUnknown) === null,
      invalidScreenRejected: resume.validateHrbaResumeState(invalidScreen) === null,
    };
  });

  assert.deepEqual(result, {
    assessmentExcluded: true,
    derivedAuthorityCleared: true,
    invalidScreenRejected: true,
    module1: true,
    module2: true,
    module3: true,
    module4: true,
    module5: true,
    navigation: true,
    oversizedRejected: true,
    presentationExcluded: true,
    progress: true,
    revision: true,
    unknownRejected: true,
  });
});
