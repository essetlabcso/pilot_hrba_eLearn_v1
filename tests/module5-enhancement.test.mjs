import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import {
  MODULE5_CANONICAL_SCREEN_IDS,
  MODULE5_COMPLETION_SCREEN_TITLE,
  MODULE5_LEGACY_ID_MAP,
  buildModule5DownloadText,
  canonicalizeModule5ScreenId,
  containsPotentiallySensitiveModule5Text,
  getAllowedModule5ScreenId,
  isModule5OutputReady,
  migrateModule5PracticeState,
} from '../src/data/module5/module5EnhancedModel.ts';

test('all canonical Module 5 screen IDs remain canonical', () => {
  for (const id of MODULE5_CANONICAL_SCREEN_IDS) assert.equal(canonicalizeModule5ScreenId(id), id);
  assert.equal(canonicalizeModule5ScreenId('M5-PLAYER-00'), 'M5-PLAYER-00');
});

test('legacy IDs have one deterministic canonical route and unknown IDs fail closed', () => {
  for (const [legacy, canonical] of Object.entries(MODULE5_LEGACY_ID_MAP)) {
    assert.equal(canonicalizeModule5ScreenId(legacy), canonical);
  }
  assert.equal(canonicalizeModule5ScreenId('M5-UNKNOWN'), 'M5-R01');
  assert.equal(canonicalizeModule5ScreenId(null), 'M5-R01');
});

test('direct-route locking returns the first incomplete screen', () => {
  assert.equal(getAllowedModule5ScreenId('M5-R06', []), 'M5-R01');
  assert.equal(getAllowedModule5ScreenId('M5-R06', ['M5-R01', 'M5-R02']), 'M5-R03');
  assert.equal(
    getAllowedModule5ScreenId('M5-R06', ['M5-R01', 'M5-R02', 'M5-R03', 'M5-R04', 'M5-R05']),
    'M5-R06',
  );
  assert.equal(getAllowedModule5ScreenId('M5-S1-25', []), 'M5-R01');
});

test('legacy completed learners retain access when canonical screen progress is absent', () => {
  assert.equal(getAllowedModule5ScreenId('M5-PLAYER-COMPLETE', [], true), 'M5-PLAYER-COMPLETE');
  assert.equal(getAllowedModule5ScreenId('M5-R14', [], true), 'M5-R14');
});

test('unrelated state is unchanged when Module 5 has never been touched', () => {
  const practice = { module3_value: { answer: 'preserve me' } };
  const migrated = migrateModule5PracticeState({
    practiceCheckState: practice,
    screenProgress: {},
    completedModules: [],
  });
  assert.deepEqual(migrated, practice);
  assert.notEqual(migrated, practice);
});

test('partial legacy state is recovered as review-required without inventing answers', () => {
  const migrated = migrateModule5PracticeState({
    practiceCheckState: {
      module3_value: { answer: 'preserve me' },
      module5_m5_r13: { repairNoteText: 'Generalized earlier learning note', selectedIds: ['a', 'b'] },
    },
    screenProgress: { module_05_hrba_meal: ['M5-R01'] },
    completedModules: [],
  });
  assert.deepEqual(migrated.module3_value, { answer: 'preserve me' });
  assert.equal(migrated.m5_s15.status, 'needs_review');
  assert.equal(migrated.m5_s15.migration.sourceKey, 'module5_m5_r13');
  assert.equal(migrated.m5_s15.migration.recoveredSelectionCount, 2);
  assert.equal(migrated.m5_s15.recoveredLearningNote, 'Generalized earlier learning note');
  assert.equal('answers' in migrated.m5_s15, false);
});

test('migration is idempotent and never overwrites revised state', () => {
  const first = migrateModule5PracticeState({
    practiceCheckState: {
      module5_m5_r13: { repairNoteText: 'Earlier note' },
      m5_s15: { schemaVersion: 2, fields: { learning: 'Revised note' }, status: 'completed' },
    },
    screenProgress: { module_05_hrba_meal: ['M5-R14'] },
    completedModules: [],
  });
  const second = migrateModule5PracticeState({
    practiceCheckState: first,
    screenProgress: { module_05_hrba_meal: ['M5-R14'] },
    completedModules: [],
  });
  assert.deepEqual(second.m5_s15, { schemaVersion: 2, fields: { learning: 'Revised note' }, status: 'completed' });
  assert.deepEqual(second, first);
});

test('prior Module 5 completion is preserved additively', () => {
  const migrated = migrateModule5PracticeState({
    practiceCheckState: { module5_m5_r14: { commitmentText: 'Earlier generalized commitment' } },
    screenProgress: { module_05_hrba_meal: ['M5-R14'] },
    completedModules: ['module_05_hrba_meal'],
  });
  assert.equal(migrated.m5_s16.status, 'completed');
  assert.equal(migrated.m5_s16.legacyCompletionPreserved, true);
  assert.equal(migrated.m5_s16.recoveredPlanSummary, 'Earlier generalized commitment');
});

test('malformed practice data degrades safely without changing unrelated values', () => {
  const migrated = migrateModule5PracticeState({
    practiceCheckState: 'bad data',
    screenProgress: { module_03_project_design: ['M3-R01'] },
    completedModules: [],
  });
  assert.deepEqual(migrated, {});
});

test('download output labels missing work honestly and contains no offline-app claim', () => {
  const text = buildModule5DownloadText(
    [{ label: 'Priority result', value: '', sourceLabel: 'Module 5 Screen 5' }],
    { adaptation: '', responsibility: 'MEAL role', nearTermAction: '', followUp: '' },
  );
  assert.match(text, /Priority result: Not yet completed/);
  assert.match(text, /Responsible role or institution: MEAL role/);
  assert.doesNotMatch(text, /works offline|offline application/i);
});

test('current output safety readiness cannot be bypassed by historical completion', () => {
  const safePlan = { days30: 'Prepare tools', days60: 'Test evidence', days90: 'Account back' };
  const required = ['days30', 'days60', 'days90'];
  assert.equal(isModule5OutputReady(safePlan, required, [true, true, true]), true);
  assert.equal(isModule5OutputReady(safePlan, required, [true, true, false]), false);
  assert.equal(isModule5OutputReady({ ...safePlan, days60: 'complainant name Alice' }, required, [true, true, true]), false);
  assert.equal(containsPotentiallySensitiveModule5Text('complainant name Alice'), true);

  const journey = readFileSync('src/components/course/Module5EnhancedJourney.tsx', 'utf8');
  assert.doesNotMatch(journey, /const ready = alreadyCompleted \|\|/);
  assert.match(journey, /Save reviewed Module 5 output/);
  assert.match(journey, /role="alert"/);
  assert.match(journey, /Remove possible identifying or sensitive detail from the highlighted field/);
});

test('Screens 9–11 use the authoritative data-management, analysis and evaluation sequence', () => {
  const journey = readFileSync('src/components/course/Module5EnhancedJourney.tsx', 'utf8');
  assert.match(journey, /Data Management: Organize, Clean and Protect Evidence/);
  assert.match(journey, /Analysis: Combine Numbers, Feedback and Stories/);
  assert.match(journey, /Evaluation: Understand Change, Equity and Contribution/);
  for (const taskId of ['duplicate', 'category', 'missing', 'identifier', 'smallCell', 'comment1', 'comment6', 'mixed', 'sensemaking', 'change', 'equity', 'process', 'influence', 'contribution']) {
    assert.match(journey, new RegExp(`id: '${taskId}'`));
  }
});

test('Screens 12–13 restore the accountability loop, scorecard and six evidence-to-action signals', () => {
  const journey = readFileSync('src/components/course/Module5EnhancedJourney.tsx', 'utf8');
  for (const taskId of ['scorecardIssue', 'jointAction', 'responsibleActor', 'reviewDate', 'accountBack', 'underrepresented', 'timing', 'overdueSignal', 'sensitiveRecord', 'publicActor', 'mixedClaim', 'heard', 'change', 'limit', 'nextUpdate']) {
    assert.match(journey, new RegExp(`id: '${taskId}'`));
  }
  assert.match(journey, /Eight-step feedback loop/);
  assert.match(journey, /Reach and access/);
});

test('Screen 15 canvas and Screen 16 plan retain the approved carry-forward structure', () => {
  const journey = readFileSync('src/components/course/Module5EnhancedJourney.tsx', 'utf8');
  for (const fieldId of ['project', 'decision', 'question', 'groups', 'dutyBearer', 'existingEvidence', 'evidenceLayers', 'methodMix', 'disaggregation', 'participatoryRole', 'safetyEthics', 'synthesis', 'finding', 'uncertainty', 'responsibleActor', 'closure', 'adaptation', 'followup', 'learning', 'peerQuestion']) {
    assert.match(journey, new RegExp(`\\['${fieldId}'`));
  }
  for (const planId of ['days30', 'days60', 'days90', 'participation', 'trigger', 'communication', 'referral', 'stopCondition', 'reviewDate', 'learningNote']) {
    assert.match(journey, new RegExp(`\\['${planId}'`));
  }
});

test('Screen 16 shell language does not announce completion before confirmation', () => {
  assert.equal(MODULE5_COMPLETION_SCREEN_TITLE, 'Portfolio Review and Module Closure');
  const app = readFileSync('src/App.tsx', 'utf8');
  assert.match(app, /\['M5-PLAYER-COMPLETE', MODULE5_COMPLETION_SCREEN_TITLE/);
  assert.doesNotMatch(app, /\['M5-PLAYER-COMPLETE', 'Module 5 Complete'/);
});

test('Screen 1 renderer and Module 3/4 sources are byte-identical to approved release', () => {
  const protectedFiles = [
    'src/components/course/ScreenRenderer.tsx',
    'src/components/course/Module3Batch2Screens.tsx',
    'src/components/course/Module3Renderer.tsx',
    'src/components/course/Module3RevisedRenderer.tsx',
    'src/components/course/Module4Renderer.tsx',
  ];
  assert.doesNotThrow(() => execFileSync('git', ['diff', '--exit-code', '4644156', '--', ...protectedFiles]));
});

test('only the canonical enhanced component is reachable from Module5Renderer', () => {
  const renderer = readFileSync('src/components/course/Module5Renderer.tsx', 'utf8');
  assert.match(renderer, /Module5EnhancedJourney/);
  assert.doesNotMatch(renderer, /Module5IntroVideoScreen|Module5CanvasScreen|coming soon/);
});

test('the player shell cannot auto-complete Module 5 on route entry', () => {
  const shell = readFileSync('src/components/player/CoursePlayerShell.tsx', 'utf8');
  assert.match(shell, /const isModule5CompletionTarget = false/);
  assert.match(shell, /explicit confirmation on Screen 16/);
});
