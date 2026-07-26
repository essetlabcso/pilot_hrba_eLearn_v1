import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  MODULE4_ID,
  MODULE4_KNOWLEDGE_CHECK_REVISION,
  MODULE4_KNOWLEDGE_QUESTION_IDS,
  createInitialModule4EnhancedState,
  migrateModule4EnhancedState,
} from '../src/data/module4/module4EnhancedModel.ts';
import {
  MODULE4_KNOWLEDGE_PASS_SCORE,
  MODULE4_KNOWLEDGE_QUESTIONS,
  MODULE4_REQUIRED_ACTIVITY_SCREEN_IDS,
  advanceModule4KnowledgeQuestion,
  checkModule4KnowledgeAnswer,
  completeModule4FinalScreen,
  getModule4FinalReadiness,
  retryMissedModule4KnowledgeQuestions,
  selectModule4KnowledgeAnswer,
  updateModule4CompletionConfirmation,
} from '../src/data/module4/module4EnhancedFinalRules.ts';
import {
  saveImplementationDecisionNote,
} from '../src/data/module4/module4EnhancedBatch4Rules.ts';

const COMPLETE_NOTE = {
  concern: 'Check whether the health-post access improvement works in practice.',
  evidence: 'Completion was reported; usability still needs checking.',
  affectedPeople: 'People with disabilities and caregivers may be excluded.',
  response: 'Adjust the consultation venue and engage the responsible actor.',
  rolesAndInclusion: 'Awra coordinates follow-up; the public actor owns the repair.',
  participationAction: 'Review the adjustment with affected groups.',
  accountBack: 'Explain the action, reasons and next review through accessible channels.',
  followUpQuestion: 'Is the accessible entrance ready and usable?',
  responsibleActor: 'Health-post management',
  reviewPoint: 'Within fourteen days',
};

const correctAnswer = (questionId) =>
  MODULE4_KNOWLEDGE_QUESTIONS
    .find((question) => question.id === questionId)
    .choices.find((choice) => choice.correct).id;

const wrongAnswer = (questionId) =>
  MODULE4_KNOWLEDGE_QUESTIONS
    .find((question) => question.id === questionId)
    .choices.find((choice) => !choice.correct).id;

function answerCurrent(state, answer) {
  const check = state.finalScreens.knowledgeCheck;
  const questionId = check.questionQueue[check.activeQuestionIndex];
  let next = selectModule4KnowledgeAnswer(state, questionId, answer);
  next = checkModule4KnowledgeAnswer(next, questionId, `2026-07-26T12:00:0${check.activeQuestionIndex}.000Z`);
  return next;
}

function runRound(state, wrongQuestionIds = []) {
  let current = state;
  const queue = [...current.finalScreens.knowledgeCheck.questionQueue];
  queue.forEach((questionId, index) => {
    current = answerCurrent(
      current,
      wrongQuestionIds.includes(questionId)
        ? wrongAnswer(questionId)
        : correctAnswer(questionId),
    );
    if (index < queue.length - 1) current = advanceModule4KnowledgeQuestion(current);
  });
  return current;
}

function readyEnhancedState() {
  let enhanced = createInitialModule4EnhancedState('2026-07-26T10:00:00.000Z');
  enhanced = saveImplementationDecisionNote(enhanced, COMPLETE_NOTE, {
    learnerEditedSections: ['followUpQuestion'],
    updatedAt: '2026-07-26T10:10:00.000Z',
  });
  enhanced = {
    ...enhanced,
    screens: {
      ...enhanced.screens,
      ...Object.fromEntries(MODULE4_REQUIRED_ACTIVITY_SCREEN_IDS.map((screenId) => [
        screenId,
        { gateSatisfied: true, completedAt: '2026-07-26T10:20:00.000Z' },
      ])),
    },
  };
  return enhanced;
}

test('Screen 14 has eight stable questions with one correct answer and concise feedback', () => {
  assert.deepEqual(MODULE4_KNOWLEDGE_QUESTIONS.map((question) => question.id), [
    ...MODULE4_KNOWLEDGE_QUESTION_IDS,
  ]);
  for (const question of MODULE4_KNOWLEDGE_QUESTIONS) {
    assert.equal(question.choices.length, 3);
    assert.equal(question.choices.filter((choice) => choice.correct).length, 1);
    assert.ok(question.question.length < 190);
    assert.ok(question.choices.every((choice) => choice.feedback.length > 0));
  }
  assert.equal(MODULE4_KNOWLEDGE_PASS_SCORE, 7);
});

test('incorrect feedback is retained, correct answers lock, and attempts increment once', () => {
  let enhanced = createInitialModule4EnhancedState('2026-07-26T10:00:00.000Z');
  const questionId = 'M4-KC-Q01';
  enhanced = selectModule4KnowledgeAnswer(enhanced, questionId, 'A');
  enhanced = checkModule4KnowledgeAnswer(enhanced, questionId);
  assert.deepEqual(enhanced.finalScreens.knowledgeCheck.missedQuestionIds, [questionId]);
  assert.equal(enhanced.finalScreens.knowledgeCheck.attemptsByQuestion[questionId], 1);
  const unchanged = selectModule4KnowledgeAnswer(enhanced, questionId, 'B');
  assert.equal(unchanged.finalScreens.knowledgeCheck.answers[questionId], 'A');

  let correct = createInitialModule4EnhancedState('2026-07-26T10:00:00.000Z');
  correct = selectModule4KnowledgeAnswer(correct, questionId, 'B');
  correct = checkModule4KnowledgeAnswer(correct, questionId);
  assert.deepEqual(correct.finalScreens.knowledgeCheck.correctQuestionIds, [questionId]);
  assert.equal(
    selectModule4KnowledgeAnswer(correct, questionId, 'A'),
    correct,
    'a correct question remains locked',
  );
});

test('7/8 passes, while 6/8 retries only missed questions and updates the score', () => {
  const seven = runRound(
    createInitialModule4EnhancedState('2026-07-26T10:00:00.000Z'),
    ['M4-KC-Q08'],
  );
  assert.equal(seven.finalScreens.knowledgeCheck.score, 7);
  assert.equal(seven.finalScreens.knowledgeCheck.passed, true);
  assert.equal(seven.finalScreens.knowledgeCheck.mode, 'passed');

  let six = runRound(
    createInitialModule4EnhancedState('2026-07-26T10:00:00.000Z'),
    ['M4-KC-Q07', 'M4-KC-Q08'],
  );
  assert.equal(six.finalScreens.knowledgeCheck.score, 6);
  assert.equal(six.finalScreens.knowledgeCheck.passed, false);
  assert.equal(six.finalScreens.knowledgeCheck.mode, 'results');
  six = retryMissedModule4KnowledgeQuestions(six);
  assert.deepEqual(six.finalScreens.knowledgeCheck.questionQueue, ['M4-KC-Q07', 'M4-KC-Q08']);
  assert.deepEqual(six.finalScreens.knowledgeCheck.checkedQuestionIds, []);
  six = answerCurrent(six, correctAnswer('M4-KC-Q07'));
  assert.equal(six.finalScreens.knowledgeCheck.score, 7);
  six = advanceModule4KnowledgeQuestion(six);
  six = answerCurrent(six, wrongAnswer('M4-KC-Q08'));
  assert.equal(six.finalScreens.knowledgeCheck.score, 7);
  assert.equal(six.finalScreens.knowledgeCheck.passed, true);
  assert.equal(six.finalScreens.knowledgeCheck.attemptsByQuestion['M4-KC-Q08'], 2);
});

test('first-attempt and retry state hydrate additively across refresh', () => {
  let firstAttempt = createInitialModule4EnhancedState('2026-07-26T10:00:00.000Z');
  firstAttempt = answerCurrent(firstAttempt, correctAnswer('M4-KC-Q01'));
  firstAttempt = advanceModule4KnowledgeQuestion(firstAttempt);
  firstAttempt = selectModule4KnowledgeAnswer(firstAttempt, 'M4-KC-Q02', 'A');
  const firstHydrated = migrateModule4EnhancedState({
    practiceCheckState: { module4Enhanced: firstAttempt },
    screenProgress: {},
    completedModules: [],
  }).practiceCheckState.module4Enhanced;
  assert.equal(firstHydrated.finalScreens.knowledgeCheck.activeQuestionIndex, 1);
  assert.equal(firstHydrated.finalScreens.knowledgeCheck.answers['M4-KC-Q02'], 'A');
  assert.deepEqual(firstHydrated.finalScreens.knowledgeCheck.correctQuestionIds, ['M4-KC-Q01']);

  let retry = runRound(
    createInitialModule4EnhancedState('2026-07-26T10:00:00.000Z'),
    ['M4-KC-Q07', 'M4-KC-Q08'],
  );
  retry = retryMissedModule4KnowledgeQuestions(retry);
  retry = selectModule4KnowledgeAnswer(retry, 'M4-KC-Q07', 'A');
  const retryHydrated = migrateModule4EnhancedState({
    practiceCheckState: { module4Enhanced: retry },
    screenProgress: {},
    completedModules: [],
  }).practiceCheckState.module4Enhanced;
  assert.equal(retryHydrated.finalScreens.knowledgeCheck.mode, 'retry');
  assert.deepEqual(retryHydrated.finalScreens.knowledgeCheck.questionQueue, ['M4-KC-Q07', 'M4-KC-Q08']);
  assert.equal(retryHydrated.finalScreens.knowledgeCheck.answers['M4-KC-Q07'], 'A');

  const tampered = structuredClone(firstAttempt);
  tampered.finalScreens.knowledgeCheck.mode = 'passed';
  tampered.finalScreens.knowledgeCheck.passed = true;
  tampered.finalScreens.knowledgeCheck.score = 8;
  const failClosed = migrateModule4EnhancedState({
    practiceCheckState: { module4Enhanced: tampered },
    screenProgress: {},
    completedModules: [],
  }).practiceCheckState.module4Enhanced;
  assert.equal(failClosed.finalScreens.knowledgeCheck.passed, false);
  assert.equal(failClosed.finalScreens.knowledgeCheck.mode, 'first-attempt');
});

test('a question revision change invalidates only incomplete learner final-screen gates', () => {
  const enhanced = runRound(
    createInitialModule4EnhancedState('2026-07-26T10:00:00.000Z'),
    ['M4-KC-Q08'],
  );
  const stale = structuredClone(enhanced);
  stale.finalScreens.knowledgeCheck.questionRevision = 'stale-revision';
  stale.screens['M4-S1-13'] = { gateSatisfied: true, completedAt: 'earlier' };
  stale.screens['M4-S1-14'] = { gateSatisfied: true, completedAt: 'earlier' };
  const migrated = migrateModule4EnhancedState({
    practiceCheckState: { module4Enhanced: stale },
    screenProgress: { [MODULE4_ID]: [...MODULE4_REQUIRED_ACTIVITY_SCREEN_IDS, 'M4-S1-13', 'M4-S1-14'] },
    completedModules: [],
  });
  assert.equal(migrated.practiceCheckState.module4Enhanced.finalScreens.knowledgeCheck.questionRevision, MODULE4_KNOWLEDGE_CHECK_REVISION);
  assert.equal(migrated.practiceCheckState.module4Enhanced.finalScreens.knowledgeCheck.passed, false);
  assert.equal(migrated.practiceCheckState.module4Enhanced.screens['M4-S1-13'].gateSatisfied, false);
  assert.equal(migrated.screenProgress[MODULE4_ID].includes('M4-S1-13'), false);

  const historical = migrateModule4EnhancedState({
    practiceCheckState: { module4Enhanced: stale },
    screenProgress: { [MODULE4_ID]: [...MODULE4_REQUIRED_ACTIVITY_SCREEN_IDS, 'M4-S1-13', 'M4-S1-14'] },
    completedModules: [MODULE4_ID],
  });
  assert.deepEqual(historical.completedModules, [MODULE4_ID]);
  assert.equal(historical.screenProgress[MODULE4_ID].includes('M4-S1-14'), true);
});

test('Screen 14 passing never completes Module 4', () => {
  const enhanced = runRound(
    createInitialModule4EnhancedState('2026-07-26T10:00:00.000Z'),
    ['M4-KC-Q08'],
  );
  assert.equal(enhanced.finalScreens.knowledgeCheck.passed, true);
  assert.equal(enhanced.completion.enhancedJourneyCompleted, false);
  assert.equal(enhanced.screens['M4-S1-14'].gateSatisfied, false);
});

test('Screen 15 blocks incomplete activities, stale notes, failed checks and missing confirmations', () => {
  const base = readyEnhancedState();
  assert.equal(getModule4FinalReadiness(base).activitiesComplete, true);
  assert.equal(getModule4FinalReadiness(base).knowledgePassed, false);

  const passed = runRound(base, ['M4-KC-Q08']);
  assert.equal(getModule4FinalReadiness(passed).confirmationsComplete, false);

  const incomplete = {
    ...passed,
    screens: {
      ...passed.screens,
      'M4-S1-08': { gateSatisfied: false, completedAt: null },
    },
  };
  assert.equal(getModule4FinalReadiness(incomplete).activitiesComplete, false);

  const staleNote = {
    ...passed,
    fields: {
      ...passed.fields,
      implementationDecisionNote: {
        ...passed.fields.implementationDecisionNote,
        reviewRequired: true,
      },
    },
    reviewRequiredFields: ['implementationDecisionNote'],
  };
  assert.equal(getModule4FinalReadiness(staleNote).noteCurrent, false);
});

test('the final confirmation completes Module 4 exactly once and preserves its timestamp', () => {
  let enhanced = runRound(readyEnhancedState(), ['M4-KC-Q08']);
  for (const key of ['noteConfirmed', 'reviewCommitmentConfirmed', 'readyToCompleteConfirmed']) {
    enhanced = updateModule4CompletionConfirmation(enhanced, key, true);
  }
  assert.equal(getModule4FinalReadiness(enhanced).ready, true);
  const first = completeModule4FinalScreen({
    screenProgress: { [MODULE4_ID]: [...MODULE4_REQUIRED_ACTIVITY_SCREEN_IDS, 'M4-S1-13'] },
    completedModules: [],
    module4Enhanced: enhanced,
  }, '2026-07-26T15:00:00.000Z');
  assert.deepEqual(first.completedModules, [MODULE4_ID]);
  assert.equal(first.module4Enhanced.completion.completedAt, '2026-07-26T15:00:00.000Z');
  assert.equal(first.screenProgress[MODULE4_ID].filter((id) => id === 'M4-S1-14').length, 1);

  const repeated = completeModule4FinalScreen(first, '2026-07-27T15:00:00.000Z');
  assert.deepEqual(repeated.completedModules, [MODULE4_ID]);
  assert.equal(repeated.module4Enhanced.completion.completedAt, '2026-07-26T15:00:00.000Z');
  assert.equal(repeated.screenProgress[MODULE4_ID].filter((id) => id === 'M4-S1-14').length, 1);
});

test('canonical routing blocks direct and generic navigation until final gates are recorded', () => {
  const app = readFileSync('src/App.tsx', 'utf8');
  const shell = readFileSync('src/components/player/CoursePlayerShell.tsx', 'utf8');
  const renderer = readFileSync('src/components/course/Module4Renderer.tsx', 'utf8');
  assert.match(app, /getAllowedModule4ScreenId/);
  assert.match(app, /'M4-S1-13',[\s\S]*'M4-S1-14'/);
  assert.match(shell, /screenId\.startsWith\('M4-S1-'\)[\s\S]*screenProgress\.module_04_implementation/);
  assert.match(renderer, /M4-S1-13'.*Module4EnhancedKnowledgeCheck/);
  assert.match(renderer, /M4-S1-14'.*Module4EnhancedCompletion/);
});

test('final screens use the existing Hub progress contract without assessment or course events', () => {
  const component = readFileSync('src/components/course/module4/Module4EnhancedFinalScreens.tsx', 'utf8');
  assert.doesNotMatch(component, /sendHubProgressEvent/);
  assert.doesNotMatch(component, /assessment_completed/);
  assert.doesNotMatch(component, /course_completed/);
  assert.doesNotMatch(component, /certificate/i);
  assert.match(component, /currentModuleId: 'module_05_hrba_meal'/);
  assert.match(component, /currentScreenId: 'M5-PLAYER-00'/);
});
