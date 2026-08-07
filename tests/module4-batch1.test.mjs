import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  MODULE4_ENHANCED_MIGRATION_MARKER,
  MODULE4_WORKSTREAMS,
  createInitialModule4EnhancedState,
  migrateModule4EnhancedState,
  updateModule4Field,
} from '../src/data/module4/module4EnhancedModel.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

function read(relativePath) {
  return readFileSync(resolve(repoRoot, relativePath), 'utf8');
}

test('Batch 1 replaces only the canonical Screens 2-5 renderer slots', () => {
  const renderer = read('src/components/course/Module4Renderer.tsx');
  const batch1 = read('src/components/course/module4/Module4EnhancedBatch1.tsx');

  assert.match(renderer, /Module4EnhancedBatch1/);
  assert.match(renderer, /\['M4-S1-01', 'M4-S1-02', 'M4-S1-03', 'M4-S1-04'\]/);
  assert.match(renderer, /Module4EnhancedBatch2/);
  for (const id of ['M4-S1-01', 'M4-S1-02', 'M4-S1-03', 'M4-S1-04']) {
    assert.match(batch1, new RegExp(id));
  }
  assert.doesNotMatch(batch1, /M4-S1-(?:06|07|08|09|10|11|12|13|14)/);
});

test('the approved Batch 1 state is additive, typed by workstream, hydrated, and idempotent', () => {
  const initial = createInitialModule4EnhancedState('2026-07-25T10:00:00.000Z');
  assert.equal(initial.migration.marker, MODULE4_ENHANCED_MIGRATION_MARKER);
  assert.deepEqual(initial.batch1.bridge, { selectedAnswer: '', feedbackViewed: false });
  assert.deepEqual(initial.batch1.everydayRightsLens.exploredSteps, []);
  assert.deepEqual(initial.batch1.workstreamExploration.exploredWorkstreams, []);
  assert.deepEqual(MODULE4_WORKSTREAMS, [
    'market',
    'water_service',
    'youth_livelihoods',
    'health_post',
    'consultation_feedback',
  ]);

  const legacyBatch0Shape = structuredClone(initial);
  delete legacyBatch0Shape.batch1;
  const migrated = migrateModule4EnhancedState({
    practiceCheckState: { module4Enhanced: legacyBatch0Shape, unrelated: { retained: true } },
    screenProgress: { module_03_project_design: ['M3-R01'] },
    completedModules: ['module_03_project_design'],
    appliedAt: '2026-07-25T10:30:00.000Z',
  });
  const hydrated = migrated.practiceCheckState.module4Enhanced;
  assert.deepEqual(hydrated.batch1, initial.batch1);
  assert.deepEqual(migrated.practiceCheckState.unrelated, { retained: true });

  hydrated.batch1.bridge = { selectedAnswer: 'B', feedbackViewed: true };
  const second = migrateModule4EnhancedState({
    practiceCheckState: migrated.practiceCheckState,
    screenProgress: migrated.screenProgress,
    completedModules: migrated.completedModules,
    appliedAt: '2026-07-25T11:00:00.000Z',
  });
  assert.deepEqual(second.practiceCheckState.module4Enhanced.batch1.bridge, {
    selectedAnswer: 'B',
    feedbackViewed: true,
  });
});

test('Screens 2-5 include the approved content, interactions, validation, feedback, and final gates', () => {
  const batch1 = read('src/components/course/module4/Module4EnhancedBatch1.tsx');
  for (const heading of [
    'From Design to Rights-Responsive Implementation',
    'What You Will Practise and Produce',
    'The Everyday Rights Lens in Action',
    'Jiru Amba: Two Months into Implementation',
  ]) assert.match(batch1, new RegExp(heading));

  assert.match(batch1, /Revise answer/);
  assert.match(batch1, /View'\} a fictional example/);
  assert.match(batch1, /exploredSteps/);
  assert.match(batch1, /Explore each step in order/);
  assert.match(batch1, /Current step/);
  assert.match(batch1, /Available next/);
  assert.match(batch1, /m4-enhanced-lens__number/);
  assert.match(batch1, /Review and confirm the prepared evidence distinction/);
  assert.match(batch1, /Use distinction and review next area/);
  assert.match(batch1, /Confirmed evidence/);
  assert.match(batch1, /Still needs checking/);
  assert.match(batch1, /preparedClassifications/);
  assert.match(batch1, /All five areas are explored/);
  assert.match(batch1, /recordModule4EnhancedScreenCompletion/);
  assert.match(batch1, /disabled=\{!ready\}/);
  assert.match(batch1, /onClick=\{finishArea\}/);
  assert.match(batch1, /disabled=\{!selectedWorkstream\}/);
});

test('workstream selection uses field provenance and invalidates dependants without overwriting them', () => {
  let state = createInitialModule4EnhancedState('2026-07-25T10:00:00.000Z');
  state = updateModule4Field(state, 'implementationDecisionNote', {
    concern: 'Learner concern',
    evidence: 'Learner evidence',
    response: 'Learner response',
    rolesAndInclusion: 'Learner roles',
    accountBack: 'Learner account-back',
    followUpQuestion: 'Learner follow-up',
    reviewPoint: 'Learner review',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-12' });
  state = updateModule4Field(state, 'selectedWorkstream', 'health_post', {
    learnerEdited: true,
    sourceScreenId: 'M4-S1-04',
  });

  assert.equal(state.fields.selectedWorkstream.value, 'health_post');
  assert.equal(state.fields.selectedWorkstream.sourceScreenId, 'M4-S1-04');
  assert.equal(state.fields.implementationDecisionNote.value.concern, 'Learner concern');
  assert.equal(state.fields.implementationDecisionNote.reviewRequired, true);
});

test('assets remain semantic HTML controls and the scoped CSS supports keyboard, mobile, zoom and forced colours', () => {
  const batch1 = read('src/components/course/module4/Module4EnhancedBatch1.tsx');
  const css = read('src/components/course/module4/module4-enhanced.css');
  assert.match(batch1, /m4-enhanced-map__hotspots/);
  assert.match(batch1, /aria-label="Jiru Amba work areas"/);
  assert.match(batch1, /role="radiogroup"/);
  assert.match(batch1, /aria-live="polite"/);
  assert.match(css, /\.m4-enhanced-screen :focus-visible/);
  assert.match(css, /\.m4-enhanced-lens__step\.is-available/);
  assert.match(css, /\.m4-enhanced-lens__step\.is-locked/);
  assert.match(css, /@media \(max-width: 30rem\)/);
  assert.match(css, /@media \(forced-colors: active\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /overflow-x:\s*auto/);
});

test('Batch 1 leaves assessment renderer and certificate contracts untouched', () => {
  // Hub bridge behavior is protected by the dedicated Task 3 contract and portal integration tests.
  const protectedFiles = [
    'src/components/course/ScreenRenderer.tsx',
    'src/data/finalAssessment.ts',
  ];
  assert.doesNotThrow(() => execFileSync(
    'git',
    ['diff', '--exit-code', '8a966d4b811b628947a204a6b6a0fdfaa12bf4cc', '--', ...protectedFiles],
    { cwd: repoRoot },
  ));

  const app = read('src/App.tsx');
  for (const route of [
    '/module-4/screen-4-1',
    '/module-4/screen-4-2',
    '/module-4/screen-4-3',
    '/module-4/screen-4-4',
  ]) assert.match(app, new RegExp(route.replaceAll('/', '\\/')));
  assert.match(app, /'assessment_completed'/);
  assert.match(app, /'course_completed'/);
});
