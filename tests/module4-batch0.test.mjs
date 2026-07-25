import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  MODULE4_CANONICAL_SCREEN_IDS,
  MODULE4_ENHANCED_CONTENT_REVISION,
  MODULE4_ENHANCED_MIGRATION_MARKER,
  MODULE4_ENHANCED_SCHEMA_VERSION,
  MODULE4_ID,
  MODULE4_SCREEN_ROUTES,
  confirmModule4FieldReview,
  createInitialModule4EnhancedState,
  migrateModule4EnhancedState,
  recordModule4EnhancedScreenCompletion,
  updateModule4Field,
} from '../src/data/module4/module4EnhancedModel.ts';
import {
  MODULE4_CODE_RENDERED_VISUALS,
  MODULE4_ENHANCED_ASSETS,
} from '../src/data/module4/module4EnhancedAssets.ts';
const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const fixtureRoot = resolve(__dirname, 'fixtures', 'module4');
const assetRoot = resolve(repoRoot, 'public', 'assets', 'hrba', 'modules', 'module-4-enhanced');
const FIXED_TIME = '2026-07-25T08:00:00.000Z';

function fixture(name) {
  return JSON.parse(readFileSync(resolve(fixtureRoot, name), 'utf8'));
}

test('canonical Module 4 IDs and routes remain stable', () => {
  assert.equal(MODULE4_ID, 'module_04_implementation');
  assert.deepEqual(MODULE4_CANONICAL_SCREEN_IDS, [
    'M4-S1-01', 'M4-S1-02', 'M4-S1-03', 'M4-S1-04', 'M4-S1-05',
    'M4-S1-06', 'M4-S1-07', 'M4-S1-08', 'M4-S1-09', 'M4-S1-10',
    'M4-S1-11', 'M4-S1-12', 'M4-S1-13', 'M4-S1-14',
  ]);
  assert.equal(MODULE4_SCREEN_ROUTES['M4-PLAYER-00'], '/module-4/cover');
  MODULE4_CANONICAL_SCREEN_IDS.forEach((screenId, index) => {
    assert.equal(MODULE4_SCREEN_ROUTES[screenId], `/module-4/screen-4-${index + 1}`);
  });

  const app = readFileSync(resolve(repoRoot, 'src', 'App.tsx'), 'utf8');
  const renderer = readFileSync(resolve(repoRoot, 'src', 'components', 'course', 'Module4Renderer.tsx'), 'utf8');
  const shell = readFileSync(resolve(repoRoot, 'src', 'components', 'player', 'CoursePlayerShell.tsx'), 'utf8');
  for (const [screenId, route] of Object.entries(MODULE4_SCREEN_ROUTES)) {
    assert.match(app, new RegExp(route.replaceAll('/', '\\/')));
    assert.match(shell, new RegExp(screenId));
    if (screenId !== 'M4-PLAYER-00') assert.match(renderer, new RegExp(screenId));
  }
});

test('Batch 0 does not switch the learner-facing Module 4 renderer', () => {
  const screenRenderer = readFileSync(
    resolve(repoRoot, 'src', 'components', 'course', 'ScreenRenderer.tsx'),
    'utf8',
  );
  assert.match(screenRenderer, /import Module4Renderer from '\.\/Module4Renderer'/);
  assert.match(screenRenderer, /<Module4Renderer/);
  assert.doesNotMatch(screenRenderer, /Module4EnhancedFoundation/);
});

test('new and incomplete fixtures receive an idempotent enhanced migration marker without completion translation', () => {
  for (const name of ['new-pilot.json', 'incomplete-legacy.json']) {
    const source = fixture(name);
    const first = migrateModule4EnhancedState({ ...source, appliedAt: FIXED_TIME });
    const second = migrateModule4EnhancedState({ ...first, appliedAt: '2026-07-25T09:00:00.000Z' });
    const enhanced = first.practiceCheckState.module4Enhanced;
    assert.equal(enhanced.schemaVersion, MODULE4_ENHANCED_SCHEMA_VERSION);
    assert.equal(enhanced.contentRevision, MODULE4_ENHANCED_CONTENT_REVISION);
    assert.equal(enhanced.migration.marker, MODULE4_ENHANCED_MIGRATION_MARKER);
    assert.equal(enhanced.completion.enhancedJourneyCompleted, false);
    assert.deepEqual(second, first);
  }
});

test('legacy implementation note is captured read-only and never counts toward enhanced completion', () => {
  const source = fixture('incomplete-legacy.json');
  const migrated = migrateModule4EnhancedState({ ...source, appliedAt: FIXED_TIME });
  const snapshot = migrated.practiceCheckState.module4Enhanced.migration.legacySnapshot;
  assert.equal(snapshot.readOnly, true);
  assert.equal(snapshot.countsTowardEnhancedCompletion, false);
  assert.match(snapshot.implementationNote, /generalized access concern/);
  assert.equal(migrated.practiceCheckState.module4ImplementationNote.status, 'saved');
});

test('historical completion and unrelated evidence are preserved without granting enhanced completion', () => {
  const source = fixture('completed-history.json');
  const migrated = migrateModule4EnhancedState({ ...source, appliedAt: FIXED_TIME });
  const enhanced = migrated.practiceCheckState.module4Enhanced;
  assert.equal(enhanced.migration.historicalCompletionPreserved, true);
  assert.equal(enhanced.completion.enhancedJourneyCompleted, false);
  assert.deepEqual(migrated.completedModules, source.completedModules);
  assert.deepEqual(migrated.screenProgress.final_assessment, ['FINAL-ASSESSMENT-COMPLETE']);
  assert.deepEqual(migrated.practiceCheckState.module5EnhancedPractice, { schemaVersion: 2 });
});

test('synthetic reset removes only obsolete Module 4 state and progress', () => {
  const source = fixture('synthetic-internal.json');
  const migrated = migrateModule4EnhancedState({
    ...source,
    appliedAt: FIXED_TIME,
    resetSyntheticInternalTest: true,
  });
  assert.equal(migrated.practiceCheckState.module4ScenarioMatch, undefined);
  assert.equal(migrated.practiceCheckState.module4ImplementationNote, undefined);
  assert.equal(migrated.practiceCheckState.module4Enhanced.migration.syntheticLegacyReset, true);
  assert.deepEqual(migrated.screenProgress[MODULE4_ID], []);
  assert.deepEqual(migrated.screenProgress.module_05_hrba_meal, ['M5-R01']);
  assert.equal(migrated.completedModules.includes(MODULE4_ID), false);
  assert.equal(migrated.completedModules.includes('module_03_project_design'), true);
  assert.deepEqual(migrated.practiceCheckState.module5EnhancedPractice, { schemaVersion: 2 });
});

test('enhanced state survives serialization and hydration without mutation', () => {
  const initial = createInitialModule4EnhancedState(FIXED_TIME);
  const selected = updateModule4Field(initial, 'selectedWorkstream', 'health_post', {
    learnerEdited: true,
    updatedAt: FIXED_TIME,
  });
  const hydrated = JSON.parse(JSON.stringify(selected));
  const migrated = migrateModule4EnhancedState({
    practiceCheckState: { module4Enhanced: hydrated },
    screenProgress: {},
    completedModules: [],
    appliedAt: '2026-07-25T10:00:00.000Z',
  });
  assert.deepEqual(migrated.practiceCheckState.module4Enhanced, selected);
});

test('upstream changes flag only dependents and never overwrite learner-authored note text', () => {
  let state = createInitialModule4EnhancedState(FIXED_TIME);
  state = updateModule4Field(state, 'implementationDecisionNote', {
    concern: 'Learner-authored concern',
    evidence: 'Learner-authored evidence',
    response: 'Learner-authored response',
    rolesAndInclusion: 'Learner-authored roles',
    accountBack: 'Learner-authored account-back plan',
    followUpQuestion: 'Learner-authored follow-up question',
    reviewPoint: 'Learner-authored review point',
  }, { learnerEdited: true, updatedAt: FIXED_TIME });
  state = updateModule4Field(state, 'minimumNecessaryInformation', ['Anonymous attendance trend'], {
    learnerEdited: true,
    updatedAt: '2026-07-25T08:10:00.000Z',
  });

  const changed = updateModule4Field(state, 'selectedWorkstream', 'market', {
    learnerEdited: true,
    updatedAt: '2026-07-25T08:20:00.000Z',
  });
  assert.deepEqual(
    changed.fields.implementationDecisionNote.value,
    state.fields.implementationDecisionNote.value,
  );
  assert.equal(changed.fields.implementationDecisionNote.learnerEdited, true);
  assert.equal(changed.fields.implementationDecisionNote.reviewRequired, true);
  assert.equal(changed.fields.minimumNecessaryInformation.reviewRequired, true);
  assert.equal(
    changed.fields.implementationDecisionNote.dependencyRevisions.selectedWorkstream,
    changed.fields.selectedWorkstream.revision,
  );
  assert.equal(changed.fields.participationDecisions.reviewRequired, false);

  const reviewed = confirmModule4FieldReview(
    changed,
    'implementationDecisionNote',
    '2026-07-25T08:30:00.000Z',
  );
  assert.equal(reviewed.fields.implementationDecisionNote.reviewRequired, false);
  assert.equal(reviewed.reviewRequiredFields.includes('implementationDecisionNote'), false);
  assert.deepEqual(reviewed.fields.implementationDecisionNote.value, state.fields.implementationDecisionNote.value);
});

test('screen progress is written only after the final gate', () => {
  const module4Enhanced = createInitialModule4EnhancedState(FIXED_TIME);
  const initial = { screenProgress: {}, module4Enhanced };
  const beforeGate = recordModule4EnhancedScreenCompletion(
    initial,
    'M4-S1-01',
    false,
    FIXED_TIME,
  );
  assert.equal(beforeGate, initial);
  assert.deepEqual(beforeGate.screenProgress, {});

  const afterGate = recordModule4EnhancedScreenCompletion(
    initial,
    'M4-S1-01',
    true,
    FIXED_TIME,
  );
  assert.deepEqual(afterGate.screenProgress[MODULE4_ID], ['M4-S1-01']);
  assert.equal(afterGate.module4Enhanced.screens['M4-S1-01'].gateSatisfied, true);
});

test('normalized asset manifest contains only approved runtime WebPs with accessibility metadata', () => {
  assert.equal(MODULE4_ENHANCED_ASSETS.length, 39);
  assert.equal(new Set(MODULE4_ENHANCED_ASSETS.map((item) => item.id)).size, 39);
  assert.equal(readdirSync(assetRoot).filter((name) => name.endsWith('.webp')).length, 39);
  for (const item of MODULE4_ENHANCED_ASSETS) {
    assert.match(item.src, /^\/assets\/hrba\/modules\/module-4-enhanced\/[a-z0-9-]+\.webp$/);
    assert.equal(existsSync(resolve(repoRoot, 'public', item.src.slice(1))), true, item.src);
    assert.ok(item.width > 0 && item.height > 0);
    assert.ok(item.alt.length > 12);
    assert.doesNotMatch(item.src, /idea|zip|\.png/i);
  }
  assert.deepEqual(MODULE4_CODE_RENDERED_VISUALS.map((item) => item.id), [
    'm4-s04-everyday-rights-lens',
    'm4-s10-support-progress',
  ]);
});

test('scoped accessibility foundation covers focus, mobile, zoom reflow, reduced motion, and forced colours', () => {
  const component = readFileSync(
    resolve(repoRoot, 'src', 'components', 'course', 'module4', 'Module4EnhancedFoundation.tsx'),
    'utf8',
  );
  const styles = readFileSync(
    resolve(repoRoot, 'src', 'components', 'course', 'module4', 'module4-enhanced.css'),
    'utf8',
  );
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /aria-current=\{stage\.id === activeStage \? 'step'/);
  assert.match(styles, /\.m4-enhanced-screen :focus-visible/);
  assert.match(styles, /min-height: 2\.75rem/);
  assert.match(styles, /@media \(max-width: 30rem\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /@media \(forced-colors: active\)/);
  assert.doesNotMatch(styles, /overflow-x:\s*auto/);
});

test('Modules 1-3, Module 5, Final Assessment, Hub launch, completion, and certificate contracts remain protected', () => {
  const modules = readFileSync(resolve(repoRoot, 'src', 'data', 'hrbaCourseModules.ts'), 'utf8');
  const hub = readFileSync(resolve(repoRoot, 'src', 'integration', 'hubProgress.ts'), 'utf8');
  const portal = readFileSync(resolve(repoRoot, 'src', 'integration', 'portalLearnerState.ts'), 'utf8');
  const assessment = readFileSync(resolve(repoRoot, 'src', 'data', 'finalAssessment.ts'), 'utf8');
  const app = readFileSync(resolve(repoRoot, 'src', 'App.tsx'), 'utf8');

  for (const moduleId of [
    'module_01_hrba_foundations',
    'module_02_everyday_cso_work',
    'module_03_project_design',
    'module_04_implementation',
    'module_05_hrba_meal',
  ]) assert.match(modules, new RegExp(moduleId));
  assert.match(portal, /HRBA_COURSE_SLUG = 'applying-human-rights-based-approach-in-cso-practice'/);
  assert.match(portal, /EXTERNAL_COURSE_EVENT_MESSAGE = 'cso-learning-hub:external-course-event'/);
  assert.match(portal, /PORTAL_STORAGE_PREFIX = 'hrba-course-progress-v1:portal:sha256:'/);
  assert.match(assessment, /FINAL_ASSESSMENT_PASS_THRESHOLD = 80/);
  assert.match(hub, /window\.parent\.postMessage\(message, portalContext\.portalOrigin\)/);
  assert.match(hub, /'course_completed'/);
  assert.doesNotMatch(hub, /postMessage\([^)]*, ['"]\*['"]\)/);
  assert.doesNotMatch(portal, /localStorage\.setItem\([^,]+,\s*learnerStateKey/);
  assert.match(app, /'assessment_completed'/);
  assert.match(app, /'course_completed'/);
});
