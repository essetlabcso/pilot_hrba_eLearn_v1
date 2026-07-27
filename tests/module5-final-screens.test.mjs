import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  MODULE5_BATCH3_PRESENTATION_CONTENT_REVISION,
  MODULE5_FINAL_KNOWLEDGE_PASS_SCORE,
  MODULE5_FINAL_KNOWLEDGE_QUESTIONS,
  MODULE5_FINAL_KNOWLEDGE_REVISION,
  MODULE5_FINAL_SUMMARY_FIELDS,
  MODULE5_PRESENTATION_CONTENT,
} from '../src/data/module5/module5PresentationContent.ts';
import {
  MODULE5_ID,
  advanceModule5FinalKnowledgeQuestion,
  checkModule5FinalKnowledgeAnswer,
  completeModule5FinalJourney,
  confirmModule5FinalSummary,
  createEmptyModule5PresentationScreenState,
  createEmptyModule5PresentationState,
  editModule5FinalSummaryField,
  ensureModule5PresentationState,
  getModule5FinalCompletionReadiness,
  getModule5FinalSummaryCandidates,
  getModule5FinalSummaryReadiness,
  invalidateModule5FinalSummaryForReflection,
  keepEditedModule5FinalSummaryField,
  migrateModule5PresentationScreenProgress,
  retryMissedModule5FinalKnowledgeQuestions,
  seedModule5FinalSummary,
  selectModule5FinalKnowledgeAnswer,
  selectModule5FinalSummaryCandidate,
  updateModule5FinalConfirmation,
} from '../src/data/module5/module5EnhancedModel.ts';

function answerRound(state, wrongIds = new Set()) {
  let next = state;
  while (!['results', 'passed'].includes(next.finalKnowledgeCheck.mode)) {
    const check = next.finalKnowledgeCheck;
    const id = check.questionQueue[check.activeQuestionIndex];
    const question = MODULE5_FINAL_KNOWLEDGE_QUESTIONS.find((item) => item.id === id);
    const answer = wrongIds.has(id)
      ? question.options.find((item) => !question.correctOptionIds.includes(item.id)).id
      : question.correctOptionIds[0];
    next = selectModule5FinalKnowledgeAnswer(next, id, answer);
    next = checkModule5FinalKnowledgeAnswer(next, id, '2026-07-27T12:00:00.000Z');
    if (!['results', 'passed'].includes(next.finalKnowledgeCheck.mode)) {
      next = advanceModule5FinalKnowledgeQuestion(next);
    }
  }
  return next;
}

function completedPresentationState() {
  const state = createEmptyModule5PresentationState();
  for (const [screenId, content] of Object.entries(MODULE5_PRESENTATION_CONTENT)) {
    const screen = createEmptyModule5PresentationScreenState();
    for (const prompt of content.reflections) {
      const value = prompt.control === 'paired-text'
        ? ['Triangulation', 'Review template']
        : prompt.control === 'stage-pair'
          ? ['Monitor', 'Account']
          : prompt.options?.[0] || `Generalized ${prompt.id}`;
      screen.reflectionValues[prompt.id] = value;
      screen.reflectionRevisions[prompt.id] = 1;
    }
    screen.reflectionRevision = content.reflections.length;
    screen.gateSatisfied = true;
    screen.status = 'completed';
    state.screens[screenId] = screen;
  }
  return state;
}

test('Screen 14 bank has the exact eight stable IDs, keys, synthesis sources and metadata', () => {
  assert.deepEqual(
    MODULE5_FINAL_KNOWLEDGE_QUESTIONS.map((question) => question.id),
    Array.from({ length: 8 }, (_, index) => `M5-S14-KC0${index + 1}`),
  );
  assert.deepEqual(
    MODULE5_FINAL_KNOWLEDGE_QUESTIONS.map((question) => question.correctOptionIds),
    [['B'], ['C'], ['C'], ['B'], ['C'], ['B'], ['C'], ['B']],
  );
  assert.equal(MODULE5_FINAL_KNOWLEDGE_PASS_SCORE, 7);
  assert.equal(MODULE5_FINAL_KNOWLEDGE_REVISION, 'm5-final-knowledge-v1');
  assert.deepEqual(MODULE5_FINAL_KNOWLEDGE_QUESTIONS[5].sourceQuestionIds, ['M5-S09-KC01', 'M5-S10-KC01']);
  assert.deepEqual(MODULE5_FINAL_KNOWLEDGE_QUESTIONS[6].sourceQuestionIds, ['M5-S11-KC01', 'M5-S11-KC02']);
  assert.deepEqual(MODULE5_FINAL_KNOWLEDGE_QUESTIONS[7].sourceQuestionIds, ['M5-S12-KC01', 'M5-S13-KC01', 'M5-S13-KC02']);
  for (const question of MODULE5_FINAL_KNOWLEDGE_QUESTIONS) {
    assert.equal(question.type, 'single');
    assert.equal(question.options.length, 4);
    assert.equal(question.options.every((option) => option.feedback.length > 20), true);
    assert.ok(question.learningOutcome);
  }
});

test('7/8 and 8/8 pass, while 6/8 enters missed-only retry with correct answers retained', () => {
  const seven = answerRound(
    createEmptyModule5PresentationState(),
    new Set(['M5-S14-KC08']),
  );
  assert.equal(seven.finalKnowledgeCheck.passed, true);
  assert.equal(seven.finalKnowledgeCheck.score, 7);
  assert.equal(seven.finalKnowledgeCheck.passedAt, '2026-07-27T12:00:00.000Z');

  const eight = answerRound(createEmptyModule5PresentationState());
  assert.equal(eight.finalKnowledgeCheck.passed, true);
  assert.equal(eight.finalKnowledgeCheck.score, 8);

  const six = answerRound(
    createEmptyModule5PresentationState(),
    new Set(['M5-S14-KC07', 'M5-S14-KC08']),
  );
  assert.equal(six.finalKnowledgeCheck.passed, false);
  assert.equal(six.finalKnowledgeCheck.mode, 'results');
  assert.equal(six.finalKnowledgeCheck.score, 6);
  assert.deepEqual(six.finalKnowledgeCheck.retryIds, ['M5-S14-KC07', 'M5-S14-KC08']);
  const retry = retryMissedModule5FinalKnowledgeQuestions(six);
  assert.equal(retry.finalKnowledgeCheck.mode, 'retry');
  assert.deepEqual(retry.finalKnowledgeCheck.questionQueue, ['M5-S14-KC07', 'M5-S14-KC08']);
  assert.equal(retry.finalKnowledgeCheck.correctIds.length, 6);
});

test('initial-attempt and retry state hydrate without losing position or retained answers', () => {
  let state = createEmptyModule5PresentationState();
  state = selectModule5FinalKnowledgeAnswer(state, 'M5-S14-KC01', 'B');
  state = checkModule5FinalKnowledgeAnswer(state, 'M5-S14-KC01');
  state = advanceModule5FinalKnowledgeQuestion(state);
  state = selectModule5FinalKnowledgeAnswer(state, 'M5-S14-KC02', 'A');
  const hydrated = ensureModule5PresentationState({ module5Presentation: state }, []);
  assert.equal(hydrated.finalKnowledgeCheck.activeQuestionIndex, 1);
  assert.deepEqual(hydrated.finalKnowledgeCheck.answers['M5-S14-KC02'], ['A']);
  assert.deepEqual(hydrated.finalKnowledgeCheck.correctIds, ['M5-S14-KC01']);

  const failed = answerRound(createEmptyModule5PresentationState(), new Set(['M5-S14-KC07', 'M5-S14-KC08']));
  const retry = retryMissedModule5FinalKnowledgeQuestions(failed);
  const retryHydrated = ensureModule5PresentationState({ module5Presentation: retry }, []);
  assert.equal(retryHydrated.finalKnowledgeCheck.mode, 'retry');
  assert.deepEqual(retryHydrated.finalKnowledgeCheck.questionQueue, ['M5-S14-KC07', 'M5-S14-KC08']);
});

test('Screen 15 seeds exactly nine fields using approved precedence without merging learner text', () => {
  const seeded = seedModule5FinalSummary(completedPresentationState());
  assert.equal(MODULE5_FINAL_SUMMARY_FIELDS.length, 9);
  assert.deepEqual(
    Object.keys(seeded.summary.values).filter((id) =>
      MODULE5_FINAL_SUMMARY_FIELDS.some((field) => field.id === id)).sort(),
    MODULE5_FINAL_SUMMARY_FIELDS.map((field) => field.id).sort(),
  );
  assert.equal(seeded.summary.selectedSourceIds.priority_result_or_question, 'M5-S07-R02');
  assert.equal(seeded.summary.selectedSourceIds.missing_perspective, 'M5-S12-R02');
  assert.equal(seeded.summary.selectedSourceIds.cycle_break_point, 'M5-S12-R01');
  assert.equal(seeded.summary.selectedSourceIds.future_meal_skill, 'M5-S13-R02');
  assert.equal(seeded.summary.selectedSourceIds.peer_learning_question, 'M5-S13-R03');
  for (const field of MODULE5_FINAL_SUMMARY_FIELDS) {
    const selected = getModule5FinalSummaryCandidates(seeded, field.id)
      .find((candidate) => candidate.reflectionId === seeded.summary.selectedSourceIds[field.id]);
    assert.equal(seeded.summary.values[field.id], selected.value);
  }
  assert.equal(getModule5FinalSummaryReadiness(seeded).ready, true);
});

test('legacy summary review markers do not block current fields while recognized markers still do', () => {
  const seeded = seedModule5FinalSummary(completedPresentationState());
  const legacy = {
    ...seeded,
    summary: {
      ...seeded.summary,
      reviewRequiredFields: ['legacy_priority_interpretation_gap'],
    },
  };
  assert.deepEqual(getModule5FinalSummaryReadiness(legacy).reviewRequiredFields, []);
  assert.equal(getModule5FinalSummaryReadiness(legacy).ready, true);

  const current = {
    ...seeded,
    summary: {
      ...seeded.summary,
      reviewRequiredFields: ['missing_perspective'],
    },
  };
  assert.deepEqual(getModule5FinalSummaryReadiness(current).reviewRequiredFields, ['missing_perspective']);
  assert.equal(getModule5FinalSummaryReadiness(current).ready, false);
});

test('only mapped fields become Needs review and unrelated learner text remains intact', () => {
  let state = seedModule5FinalSummary(completedPresentationState());
  const originalSupport = state.summary.values.support_need;
  state = editModule5FinalSummaryField(state, 'peer_learning_question', 'How can peers test a bounded finding?');
  state = invalidateModule5FinalSummaryForReflection(state, 'M5-S10-R02');
  assert.deepEqual(state.summary.reviewRequiredFields, ['missing_perspective']);
  assert.equal(state.summary.values.support_need, originalSupport);
  assert.equal(state.summary.values.peer_learning_question, 'How can peers test a bounded finding?');

  state.screens['M5-R11'].reflectionValues['M5-S12-R02'] = 'Updated broad perspective';
  state.screens['M5-R11'].reflectionRevisions['M5-S12-R02'] = 2;
  const refreshed = selectModule5FinalSummaryCandidate(state, 'missing_perspective', 'M5-S12-R02');
  assert.equal(refreshed.summary.reviewRequiredFields.length, 0);
  assert.equal(refreshed.summary.values.missing_perspective, 'Updated broad perspective');
});

test('learner-edited wording is preserved and reconfirmed against the current selected source revision', () => {
  let state = seedModule5FinalSummary(completedPresentationState());
  state = editModule5FinalSummaryField(state, 'future_meal_skill', 'Facilitated triangulation');
  state.screens['M5-R12'].reflectionRevisions['M5-S13-R02'] = 2;
  state = invalidateModule5FinalSummaryForReflection(state, 'M5-S13-R02');
  assert.equal(state.summary.reviewRequiredFields.includes('future_meal_skill'), true);
  assert.equal(state.summary.values.future_meal_skill, 'Facilitated triangulation');
  state = keepEditedModule5FinalSummaryField(state, 'future_meal_skill');
  assert.equal(state.summary.values.future_meal_skill, 'Facilitated triangulation');
  assert.equal(state.summary.reviewRequiredFields.includes('future_meal_skill'), false);
  assert.equal(state.summary.provenance.future_meal_skill.revision, 2);
});

test('Screen 15 confirmation and Screen 16 completion are gated, final-gate-only and idempotent', () => {
  let presentation = seedModule5FinalSummary(completedPresentationState());
  presentation = confirmModule5FinalSummary(presentation, true, '2026-07-27T13:00:00.000Z');
  assert.equal(presentation.summary.confirmed, true);
  const progress = Array.from({ length: 14 }, (_, index) => `M5-R${String(index + 1).padStart(2, '0')}`);
  assert.equal(getModule5FinalCompletionReadiness(presentation, progress).ready, false);
  presentation = updateModule5FinalConfirmation(presentation, 'summaryReviewed', true);
  presentation = updateModule5FinalConfirmation(presentation, 'evidenceUseUnderstood', true);
  presentation = updateModule5FinalConfirmation(presentation, 'readyToComplete', true);
  assert.equal(getModule5FinalCompletionReadiness(presentation, progress).ready, false);

  presentation = answerRound(presentation);
  assert.equal(getModule5FinalCompletionReadiness(presentation, progress).ready, true);
  const first = completeModule5FinalJourney({
    screenProgress: { [MODULE5_ID]: progress },
    completedModules: [],
    module5Presentation: presentation,
  }, '2026-07-27T14:00:00.000Z');
  assert.equal(first.completedModules.filter((id) => id === MODULE5_ID).length, 1);
  assert.equal(first.screenProgress[MODULE5_ID].filter((id) => id === 'M5-PLAYER-COMPLETE').length, 1);
  assert.equal(first.module5Presentation.completion.completedAt, '2026-07-27T14:00:00.000Z');
  const repeated = completeModule5FinalJourney(first, '2026-07-28T14:00:00.000Z');
  assert.deepEqual(repeated, first);
});

test('final revision preserves Screens 2–13 but clears incomplete legacy final progress and old workspace authority', () => {
  const state = completedPresentationState();
  state.contentRevision = MODULE5_BATCH3_PRESENTATION_CONTENT_REVISION;
  state.finalKnowledgeCheck.passed = true;
  state.finalKnowledgeCheck.revision = 'pending-content-approval';
  const migrated = ensureModule5PresentationState({ module5Presentation: state, m5_s15: { fields: { old: 'legacy' } } }, []);
  assert.equal(Object.keys(migrated.screens).length, 12);
  assert.equal(migrated.screens['M5-R12'].gateSatisfied, true);
  assert.equal(migrated.finalKnowledgeCheck.passed, false);
  assert.equal(JSON.stringify(migrated.summary.values).includes('legacy'), false);
  const progress = migrateModule5PresentationScreenProgress({
    practiceCheckState: { module5Presentation: state, m5_s15: { fields: { old: 'legacy' } } },
    screenProgress: { [MODULE5_ID]: ['M5-R01', 'M5-R12', 'M5-R13', 'M5-R14', 'M5-PLAYER-COMPLETE'] },
    completedModules: [],
  });
  assert.deepEqual(progress[MODULE5_ID], ['M5-R01', 'M5-R12']);
});

test('historical completion and first timestamp are preserved without a duplicate completion event', () => {
  const migrated = ensureModule5PresentationState({
    module5Presentation: createEmptyModule5PresentationState(),
    m5_s16: { status: 'completed', completedAt: '2026-07-01T00:00:00.000Z' },
  }, [MODULE5_ID]);
  assert.equal(migrated.migration.historicalCompletionPreserved, true);
  assert.equal(migrated.completion.completedAt, '2026-07-01T00:00:00.000Z');
  const preserved = completeModule5FinalJourney({
    screenProgress: { [MODULE5_ID]: ['M5-PLAYER-COMPLETE'] },
    completedModules: [MODULE5_ID],
    module5Presentation: migrated,
  });
  assert.equal(preserved.completedModules.filter((id) => id === MODULE5_ID).length, 1);
  assert.equal(preserved.module5Presentation.completion.completedAt, '2026-07-01T00:00:00.000Z');
});

test('final-screen implementation preserves event separation and does not remove legacy journey code', () => {
  const component = readFileSync('src/components/course/module5/Module5FinalScreens.tsx', 'utf8');
  const renderer = readFileSync('src/components/course/Module5Renderer.tsx', 'utf8');
  const legacy = readFileSync('src/components/course/Module5EnhancedJourney.tsx', 'utf8');
  assert.doesNotMatch(component, /assessment_completed|course_completed|certificate/i);
  assert.match(component, /FINAL-ASSESSMENT-PLAYER-00/);
  assert.equal(component.includes("setRoute('/final-assessment/cover')"), true);
  assert.match(renderer, /Module5FinalScreens/);
  assert.match(legacy, /function CanvasScreen/);
  assert.match(legacy, /function CompletionScreen/);
});
