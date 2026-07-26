import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  confirmModule4FieldReview,
  createInitialModule4EnhancedState,
  migrateModule4EnhancedState,
  recordModule4EnhancedScreenCompletion,
  updateModule4Field,
} from '../src/data/module4/module4EnhancedModel.ts';
import {
  canCompleteBatch3Screen,
  isScreen10ConditionalSupportCorrect,
  isScreen10DiagnosisCorrect,
  isScreen11DecisionPracticeCorrect,
  isScreen11MatchCorrect,
  isScreen12MinimumInformationCorrect,
  isScreen12NoteCorrect,
  isScreen9FollowUpComplete,
  isScreen9RoleMappingCorrect,
} from '../src/data/module4/module4EnhancedBatch3Rules.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

function read(relativePath) {
  return readFileSync(resolve(repoRoot, relativePath), 'utf8');
}

test('Batch 3 routes Screens 9-12 correctly and maps elements', () => {
  const renderer = read('src/components/course/Module4Renderer.tsx');
  const batch3 = read('src/components/course/module4/Module4EnhancedBatch3.tsx');

  assert.match(renderer, /Module4EnhancedBatch3/);
  assert.match(renderer, /\['M4-S1-08', 'M4-S1-09', 'M4-S1-10', 'M4-S1-11'\]/);
  for (const id of ['M4-S1-08', 'M4-S1-09', 'M4-S1-10', 'M4-S1-11']) {
    assert.match(batch3, new RegExp(id));
  }
});

test('Batch 3 state defaults hydrate additively and remain idempotent', () => {
  const initial = createInitialModule4EnhancedState('2026-07-25T12:00:00.000Z');
  assert.equal(initial.batch3.roles.activeStage, 1);
  assert.deepEqual(initial.batch3.roles.assignments, {});
  assert.deepEqual(initial.batch3.roles.confirmItems, []);
  assert.deepEqual(initial.batch3.roles.explainItems, []);
  assert.equal(initial.batch3.roles.reviewTiming, '');
  assert.equal(initial.batch3.roles.confirmFeedback, 'idle');
  assert.equal(initial.batch3.support.activeStage, 1);
  assert.deepEqual(initial.batch3.support.classifications, {});
  assert.equal(initial.batch3.pathways.activeStage, 1);
  assert.deepEqual(initial.batch3.pathways.matches, {});
  assert.deepEqual(initial.batch3.pathways.decisions, {});
  assert.equal(initial.batch3.pathways.decisionsFeedback, 'idle');
  assert.equal(initial.batch3.information.activeStage, 1);

  const oldBatch2Shape = structuredClone(initial);
  delete oldBatch2Shape.batch3;
  oldBatch2Shape.batch1.bridge = { selectedAnswer: 'B', feedbackViewed: true };
  oldBatch2Shape.batch2.fairAccess.selectedEvidence = ['criteria'];
  oldBatch2Shape.batch3 = {
    ...initial.batch3,
    pathways: {
      activeStage: 3,
      matches: { sit1: 'adjust', sit2: 'engage', sit3: 'protect' },
      matchesFeedback: 'correct',
      whyConfirmed: true,
      planSaved: true,
    },
  };

  const first = migrateModule4EnhancedState({
    practiceCheckState: { module4Enhanced: oldBatch2Shape, unrelated: 'preserved' },
    screenProgress: { module_03_project_design: ['M3-R01'] },
    completedModules: ['module_03_project_design'],
    appliedAt: '2026-07-25T12:05:00.000Z',
  });

  assert.deepEqual(first.practiceCheckState.module4Enhanced.batch3.roles.assignments, initial.batch3.roles.assignments);
  assert.deepEqual(first.practiceCheckState.module4Enhanced.batch3.roles.confirmItems, initial.batch3.roles.confirmItems);
  assert.deepEqual(first.practiceCheckState.module4Enhanced.batch2.fairAccess.selectedEvidence, ['criteria']);
  assert.deepEqual(first.practiceCheckState.module4Enhanced.batch1.bridge, {
    selectedAnswer: 'B',
    feedbackViewed: true,
  });
  assert.equal(first.practiceCheckState.unrelated, 'preserved');
  assert.equal(first.practiceCheckState.module4Enhanced.batch3.pathways.activeStage, 2);
  assert.equal(first.practiceCheckState.module4Enhanced.batch3.pathways.planSaved, false);
  assert.equal(first.practiceCheckState.module4Enhanced.batch3.pathways.whyConfirmed, false);

  first.practiceCheckState.module4Enhanced.batch3.roles.assignments = { info_share: 'coordinate' };
  first.practiceCheckState.module4Enhanced.batch3.roles.confirmItems = ['inspection', 'role'];
  first.practiceCheckState.module4Enhanced.batch3.pathways.decisions = {
    adjust: 'change_timing_format',
  };
  const second = migrateModule4EnhancedState({
    practiceCheckState: first.practiceCheckState,
    screenProgress: first.screenProgress,
    completedModules: first.completedModules,
    appliedAt: '2026-07-25T12:10:00.000Z',
  });
  assert.deepEqual(second.practiceCheckState.module4Enhanced.batch3.roles.assignments, { info_share: 'coordinate' });
  assert.deepEqual(second.practiceCheckState.module4Enhanced.batch3.roles.confirmItems, ['inspection', 'role']);
  assert.deepEqual(second.practiceCheckState.module4Enhanced.batch3.pathways.decisions, {
    adjust: 'change_timing_format',
  });
});

test('Screen 9 rejects incorrect role mapping, accepts correction, and blocks incomplete follow-up', () => {
  const incorrect = {
    info_share: 'duty_bearer',
    interim_agree: 'coordinate',
    tech_inspect: 'duty_bearer',
    replace_desk: 'avoid',
    doc_request: 'cso_directly',
  };
  assert.equal(isScreen9RoleMappingCorrect(incorrect), false);

  const revised = { ...incorrect, info_share: 'coordinate' };
  assert.equal(isScreen9RoleMappingCorrect(revised), true);

  const incompleteFollowUp = {
    followUpWho: 'water_desk',
    followUpWhen: '',
    followUpPurpose: 'confirm_time',
    followUpDocumented: 'follow_up_note',
    followUpInformed: 'meeting_update',
    formalTriggers: ['repeated_fail', 'impacts_continue', 'remedy_required'],
  };
  assert.equal(isScreen9FollowUpComplete(incompleteFollowUp), false);
  assert.equal(isScreen9FollowUpComplete({ ...incompleteFollowUp, followUpWhen: '14_days' }), true);
});

test('Screen 10 validates diagnosis and conditional support behavior', () => {
  const diagnosis = {
    sig1: 'access_scheduling',
    sig2: 'communication_understanding',
    sig3: 'follow_up_inclusion',
    sig4: 'follow_up_inclusion',
    sig5: 'communication_understanding',
  };
  assert.equal(isScreen10DiagnosisCorrect({ ...diagnosis, sig4: 'access_scheduling' }), false);
  assert.equal(isScreen10DiagnosisCorrect(diagnosis), true);
  assert.equal(isScreen10ConditionalSupportCorrect({
    condition1: 'clearer_example',
    condition2: 'send_message',
    condition3: 'assume_resolved',
  }), false);
  assert.equal(isScreen10ConditionalSupportCorrect({
    condition1: 'clearer_example',
    condition2: 'send_message',
    condition3: 'review_strengthen',
  }), true);
});

test('Screen 11 requires matching and scenario decisions for all three pathways', () => {
  assert.equal(isScreen11MatchCorrect({
    sit1: 'adjust',
    sit2: 'engage',
    sit3: 'protect',
  }), true);
  assert.equal(isScreen11DecisionPracticeCorrect({
    adjust: 'change_timing_format',
    engage: 'agree_action_role_date',
    protect: 'raise_publicly',
  }), false);
  assert.equal(isScreen11DecisionPracticeCorrect({
    adjust: 'change_timing_format',
    engage: 'agree_action_role_date',
    protect: 'pause_protect_process',
  }), true);
});

test('Screen 12 enforces minimum information and complete Information-Use Note', () => {
  assert.equal(isScreen12MinimumInformationCorrect([
    'reviewed',
    'assigned',
    'explained',
    'followed_up',
    'names',
  ]), false);
  assert.equal(isScreen12MinimumInformationCorrect([
    'reviewed',
    'assigned',
    'explained',
    'followed_up',
  ]), true);
  assert.equal(isScreen12NoteCorrect({
    improveFields: ['owner', 'explanation', 'follow_up'],
    limitation: 'loop_completed',
    nextSteps: ['review_updated'],
  }), false);
  assert.equal(isScreen12NoteCorrect({
    improveFields: ['owner', 'explanation', 'follow_up'],
    limitation: 'loop_completed',
    nextSteps: ['review_updated', 'explain_group'],
  }), true);
});

test('upstream changes require review and reconfirmation before readiness', () => {
  let state = createInitialModule4EnhancedState('2026-07-25T12:00:00.000Z');
  state = updateModule4Field(state, 'selectedWorkstream', 'market', {
    learnerEdited: true,
    sourceScreenId: 'M4-S1-04',
  });
  state = updateModule4Field(state, 'actorResponsibilities', {
    responsibleActor: 'Water Desk',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-08' });
  state = updateModule4Field(state, 'engagementDecisions', {
    position: 'Constructive rights-based engagement',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-08' });
  state = updateModule4Field(state, 'supportDiagnosis', {
    firstResponse: 'Adjust timing',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-09' });
  state = updateModule4Field(state, 'selectedResponsePathway', 'protect', {
    learnerEdited: true,
    sourceScreenId: 'M4-S1-10',
  });
  state = updateModule4Field(state, 'minimumNecessaryInformation', ['reviewed'], {
    learnerEdited: true,
    sourceScreenId: 'M4-S1-11',
  });

  const changed = updateModule4Field(state, 'selectedWorkstream', 'health_post', {
    learnerEdited: true,
    sourceScreenId: 'M4-S1-04',
  });

  assert.equal(changed.fields.actorResponsibilities.reviewRequired, true);
  assert.equal(changed.fields.engagementDecisions.reviewRequired, true);
  assert.equal(changed.fields.supportDiagnosis.reviewRequired, true);
  assert.equal(changed.fields.selectedResponsePathway.reviewRequired, true);
  assert.equal(changed.fields.minimumNecessaryInformation.reviewRequired, true);

  assert.equal(canCompleteBatch3Screen(true, changed.fields.supportDiagnosis.reviewRequired), false);
  const reconfirmed = confirmModule4FieldReview(
    changed,
    'supportDiagnosis',
    '2026-07-25T12:15:00.000Z',
  );
  assert.equal(reconfirmed.fields.supportDiagnosis.reviewRequired, false);
  assert.equal(canCompleteBatch3Screen(true, reconfirmed.fields.supportDiagnosis.reviewRequired), true);
});

test('progress records only after the final screen gate', () => {
  const module4Enhanced = createInitialModule4EnhancedState('2026-07-25T12:00:00.000Z');
  const before = {
    screenProgress: { module_04_implementation: [] },
    module4Enhanced,
  };
  const blocked = recordModule4EnhancedScreenCompletion(before, 'M4-S1-10', false);
  assert.strictEqual(blocked, before);
  assert.deepEqual(blocked.screenProgress.module_04_implementation, []);

  const completed = recordModule4EnhancedScreenCompletion(
    before,
    'M4-S1-10',
    true,
    '2026-07-25T12:20:00.000Z',
  );
  assert.deepEqual(completed.screenProgress.module_04_implementation, ['M4-S1-10']);
  assert.equal(completed.module4Enhanced.screens['M4-S1-10'].gateSatisfied, true);
});

test('Screens 9-12 content and interaction hooks', () => {
  const batch3 = read('src/components/course/module4/Module4EnhancedBatch3.tsx');

  assert.doesNotMatch(batch3, /selectedProfile|workstreamProfiles/);
  for (const fixedLabel of [
    'label="Water Service"',
    'label="Youth Livelihoods"',
    'label="Consultation & Feedback"',
  ]) assert.match(batch3, new RegExp(fixedLabel));

  for (const heading of [
    'Roles, Boundaries and Responsible Action',
    'Diagnose the Gap, Then Choose Support',
    'Adjust, Engage or Protect',
    'Use the Information Needed for the Decision',
  ]) assert.match(batch3, new RegExp(heading));

  for (const token of [
    'assignments',
    'assignmentsFeedback',
    'selectedResponse',
    'responseFeedback',
    'selectedPosition',
    'formalTriggers',
    'followUpWho',
    'confirmItems',
    'explainItems',
    'reviewTiming',
    'confirmFeedback',
    'classifications',
    'classificationsFeedback',
    'firstSupport',
    'condition1',
    'reviewItems',
    'matches',
    'decisions',
    'Check scenario decisions',
    'selectedEvidence',
    'selectedMinNeeded',
    'improveFields',
    'limitation',
    'nextSteps',
    'updateModule4Field',
  ]) assert.match(batch3, new RegExp(token));
});
