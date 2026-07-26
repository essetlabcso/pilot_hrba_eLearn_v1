import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  createInitialModule4EnhancedState,
  migrateModule4EnhancedState,
  updateModule4Field,
} from '../src/data/module4/module4EnhancedModel.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

function read(relativePath) {
  return readFileSync(resolve(repoRoot, relativePath), 'utf8');
}

test('Batch 2 owns only the canonical Screen 6-8 renderer slots', () => {
  const renderer = read('src/components/course/Module4Renderer.tsx');
  const batch2 = read('src/components/course/module4/Module4EnhancedBatch2.tsx');

  assert.match(renderer, /Module4EnhancedBatch2/);
  assert.match(renderer, /\['M4-S1-05', 'M4-S1-06', 'M4-S1-07'\]/);
  assert.match(renderer, /M4-S1-12'\) return <PortfolioScreen/);
  for (const id of ['M4-S1-05', 'M4-S1-06', 'M4-S1-07']) {
    assert.match(batch2, new RegExp(id));
  }
  assert.doesNotMatch(batch2, /screenId === 'M4-S1-(?:08|09|10|11|12|13|14)'/);
});

test('Batch 2 state defaults hydrate additively and remain idempotent', () => {
  const initial = createInitialModule4EnhancedState('2026-07-25T12:00:00.000Z');
  assert.equal(initial.batch2.fairAccess.activeStage, 1);
  assert.deepEqual(initial.batch2.participation.perspectives, []);
  assert.deepEqual(initial.batch2.feedbackLoop.exploredHotspots, []);

  const oldBatch1Shape = structuredClone(initial);
  delete oldBatch1Shape.batch2;
  oldBatch1Shape.batch1.bridge = { selectedAnswer: 'B', feedbackViewed: true };
  const first = migrateModule4EnhancedState({
    practiceCheckState: { module4Enhanced: oldBatch1Shape, unrelated: 'preserved' },
    screenProgress: { module_03_project_design: ['M3-R01'] },
    completedModules: ['module_03_project_design'],
    appliedAt: '2026-07-25T12:05:00.000Z',
  });
  assert.deepEqual(first.practiceCheckState.module4Enhanced.batch2, initial.batch2);
  assert.deepEqual(first.practiceCheckState.module4Enhanced.batch1.bridge, {
    selectedAnswer: 'B',
    feedbackViewed: true,
  });
  assert.equal(first.practiceCheckState.unrelated, 'preserved');

  first.practiceCheckState.module4Enhanced.batch2.fairAccess.selectedEvidence = ['criteria'];
  const second = migrateModule4EnhancedState({
    practiceCheckState: first.practiceCheckState,
    screenProgress: first.screenProgress,
    completedModules: first.completedModules,
    appliedAt: '2026-07-25T12:10:00.000Z',
  });
  assert.deepEqual(second.practiceCheckState.module4Enhanced.batch2.fairAccess.selectedEvidence, ['criteria']);
  assert.deepEqual(second.screenProgress.module_03_project_design, ['M3-R01']);
});

test('upstream workstream revision flags Batch 2 fields without overwriting learner work', () => {
  let state = createInitialModule4EnhancedState('2026-07-25T12:00:00.000Z');
  state = updateModule4Field(state, 'selectedWorkstream', 'market', {
    learnerEdited: true,
    sourceScreenId: 'M4-S1-04',
  });
  state = updateModule4Field(state, 'evidenceClassifications', {
    criteria: 'confirmed',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-05' });
  state = updateModule4Field(state, 'participationDecisions', {
    openDecision: 'B',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-06' });
  state = updateModule4Field(state, 'feedbackAccountBackActions', {
    responseAction: 'B',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-07' });

  const changed = updateModule4Field(state, 'selectedWorkstream', 'health_post', {
    learnerEdited: true,
    sourceScreenId: 'M4-S1-04',
  });
  assert.deepEqual(changed.fields.evidenceClassifications.value, { criteria: 'confirmed' });
  assert.deepEqual(changed.fields.participationDecisions.value, { openDecision: 'B' });
  assert.deepEqual(changed.fields.feedbackAccountBackActions.value, { responseAction: 'B' });
  assert.equal(changed.fields.evidenceClassifications.reviewRequired, true);
  assert.equal(changed.fields.participationDecisions.reviewRequired, true);
  assert.equal(changed.fields.feedbackAccountBackActions.reviewRequired, true);
});

test('Screens 6-8 implement staged validation, correction, revision, hydration and final gates', () => {
  const batch2 = read('src/components/course/module4/Module4EnhancedBatch2.tsx');
  for (const heading of [
    'Fair Access — Evidence, Action and Follow-Up',
    'Participation with Real Influence',
    'Accountable Concern, Response and Follow-Up',
  ]) assert.match(batch2, new RegExp(heading));

  for (const token of [
    'Check evidence',
    'Revise evidence',
    'Choose action',
    'Agree follow-up',
    'Include relevant voices',
    'Make participation workable',
    'Explain the outcome',
    'Hear the concern',
    'Complete the record',
    'Assign response',
    'Prepare account-back',
    'Plan follow-up',
    'corrective',
    'recordModule4EnhancedScreenCompletion',
  ]) assert.match(batch2, new RegExp(token));

  assert.match(batch2, /selectedProfile\(enhanced\)/);
  assert.match(batch2, /reviewRequired/);
  assert.match(batch2, /aria-live="polite"/);
  assert.match(batch2, /aria-current=\{activeStage === stage \? 'step'/);
  assert.match(batch2, /aria-pressed=/);
  assert.doesNotMatch(batch2, /<select/);
});

test('Batch 2 uses approved assets plus semantic controls and responsive reflow', () => {
  const batch2 = read('src/components/course/module4/Module4EnhancedBatch2.tsx');
  const css = read('src/components/course/module4/module4-enhanced.css');
  const manifest = read('src/data/module4/module4EnhancedAssets.ts');

  for (const id of ['m4-s06', 'm4-s07', 'm4-s08']) assert.match(manifest, new RegExp(id));
  assert.match(batch2, /m4-b2-hotspot-alternative/);
  assert.match(batch2, /numbered HTML controls provide the same information as the image hotspots/);
  assert.match(css, /@media \(max-width: 56\.25rem\)/);
  assert.match(css, /@media \(max-width: 38rem\)/);
  assert.match(css, /focus-visible/);
  assert.match(css, /@media \(forced-colors: active\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /overflow-x:\s*auto/);
});

test('Batch 2 leaves approved Screens 2-5 and platform contracts byte-identical', () => {
  const protectedFiles = [
    'src/components/course/module4/Module4EnhancedBatch1.tsx',
    'src/components/course/ScreenRenderer.tsx',
    'src/components/course/Module5Renderer.tsx',
    'src/components/player/CoursePlayerShell.tsx',
    'src/data/finalAssessment.ts',
    'src/integration/hubProgress.ts',
    'src/integration/portalLearnerState.ts',
  ];
  assert.doesNotThrow(() => execFileSync(
    'git',
    ['diff', '--exit-code', '9bd57d1c2be80639a22920661b3df6b293696436', '--', ...protectedFiles],
    { cwd: repoRoot },
  ));

  const app = read('src/App.tsx');
  for (const route of [
    '/module-4/screen-4-5',
    '/module-4/screen-4-6',
    '/module-4/screen-4-7',
  ]) assert.match(app, new RegExp(route.replaceAll('/', '\\/')));
  assert.match(app, /'assessment_completed'/);
  assert.match(app, /'course_completed'/);
});
