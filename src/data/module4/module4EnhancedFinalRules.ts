import {
  MODULE4_ID,
  recordModule4EnhancedScreenCompletion,
  type Module4EnhancedState,
  type Module4KnowledgeChoiceId,
  type Module4KnowledgeQuestionId,
} from './module4EnhancedModel.ts';
import {
  affectedImplementationNoteSections,
  canContinueFromImplementationNote,
  isImplementationDecisionNoteComplete,
} from './module4EnhancedBatch4Rules.ts';

export const MODULE4_KNOWLEDGE_PASS_SCORE = 7;

export type Module4KnowledgeChoice = {
  id: Module4KnowledgeChoiceId;
  text: string;
  feedback: string;
  correct?: true;
};

export type Module4KnowledgeQuestion = {
  id: Module4KnowledgeQuestionId;
  title: string;
  question: string;
  choices: readonly Module4KnowledgeChoice[];
};

export const MODULE4_KNOWLEDGE_QUESTIONS: readonly Module4KnowledgeQuestion[] = [
  {
    id: 'M4-KC-Q01',
    title: 'Evidence or assumption',
    question: 'A monitoring note says the health-post ramp was completed. No one has checked whether it is usable. What can the CSO conclude?',
    choices: [
      { id: 'A', text: 'The ramp is confirmed usable.', feedback: 'A report does not confirm that the ramp works in practice.' },
      { id: 'B', text: 'Completion was reported, but usability still needs checking.', feedback: 'Correct. The report is evidence, but its practical result still needs verification.', correct: true },
      { id: 'C', text: 'There is no evidence at all.', feedback: 'The report is evidence. Its limitation should be recorded rather than ignored.' },
    ],
  },
  {
    id: 'M4-KC-Q02',
    title: 'Who may be excluded',
    question: 'An update meeting is upstairs, held during working hours and announced only in writing. Who should the team check may be excluded?',
    choices: [
      { id: 'A', text: 'Only people who were not registered.', feedback: 'Registration status does not reveal all exclusion risks.' },
      { id: 'B', text: 'No one, because the invitation was public.', feedback: 'A public invitation can still be inaccessible.' },
      { id: 'C', text: 'People with mobility or visual-access needs, caregivers and people unable to leave work.', feedback: 'Correct. The team should check practical barriers affecting different groups.', correct: true },
    ],
  },
  {
    id: 'M4-KC-Q03',
    title: 'Proportionate response',
    question: 'The CSO controls the consultation venue, but the entrance to the public service building remains inaccessible. What is the most proportionate response?',
    choices: [
      { id: 'A', text: 'Move the consultation to an accessible venue now and engage the responsible authority about the building.', feedback: 'Correct. Adjust what the CSO controls and engage the actor responsible for the wider barrier.', correct: true },
      { id: 'B', text: 'Cancel participation until the public building is repaired.', feedback: 'Delaying participation leaves the immediate exclusion unaddressed.' },
      { id: 'C', text: 'Promise that the CSO will repair the public building.', feedback: 'The CSO should not take over another actor’s responsibility.' },
    ],
  },
  {
    id: 'M4-KC-Q04',
    title: 'Responsibility boundaries',
    question: 'A woreda office agreed to restore water service. What is the appropriate CSO role?',
    choices: [
      { id: 'A', text: 'Take over the repair so it happens quickly.', feedback: 'Taking over would blur responsibility and create an unsafe promise.' },
      { id: 'B', text: 'Document the commitment, support communication, follow up and adjust CSO support where appropriate.', feedback: 'Correct. The office remains responsible while the CSO supports follow-up and accountability.', correct: true },
      { id: 'C', text: 'Stop following the issue because the CSO is not responsible for the repair.', feedback: 'The CSO can still document, communicate and follow up without replacing the responsible actor.' },
    ],
  },
  {
    id: 'M4-KC-Q05',
    title: 'Participation and account-back',
    question: 'Community members shared their views, but the team chose a different action. What completes the participation process?',
    choices: [
      { id: 'A', text: 'Recording how many people attended.', feedback: 'Attendance alone does not show influence or account-back.' },
      { id: 'B', text: 'Reporting the consultation to the donor.', feedback: 'Donor reporting does not explain the decision to affected people.' },
      { id: 'C', text: 'Explain the decision, the reasons and next steps through accessible channels, with a way to follow up.', feedback: 'Correct. Meaningful participation includes influence, explanation and account-back.', correct: true },
    ],
  },
  {
    id: 'M4-KC-Q06',
    title: 'Adjust, Engage or Protect',
    question: 'A person may face retaliation if a concern is raised through the normal channel. Which pathway should be used?',
    choices: [
      { id: 'A', text: 'Adjust the current activity and use the same channel.', feedback: 'An activity adjustment alone does not address the protection risk.' },
      { id: 'B', text: 'Engage the normal channel publicly.', feedback: 'Public engagement could expose the person to harm.' },
      { id: 'C', text: 'Protect the person and use another safe process.', feedback: 'Correct. Protection takes priority when the normal process creates a credible risk.', correct: true },
    ],
  },
  {
    id: 'M4-KC-Q07',
    title: 'Minimum necessary information',
    question: 'What is the minimum information needed to follow up an accessibility concern safely?',
    choices: [
      { id: 'A', text: 'The issue, responsible actor, agreed action and date, current status and account-back step.', feedback: 'Correct. Record what is needed for action and follow-up without unnecessary personal details.', correct: true },
      { id: 'B', text: 'Names, personal histories and medical information from everyone affected.', feedback: 'These details are unnecessary and may increase risk.' },
      { id: 'C', text: 'The complete complaint file and every related message.', feedback: 'Collecting everything conflicts with information minimization.' },
    ],
  },
  {
    id: 'M4-KC-Q08',
    title: 'Follow-up and review',
    question: 'The team has agreed an implementation action. What makes the follow-up usable?',
    choices: [
      { id: 'A', text: 'Wait until the project ends and describe the action in the final report.', feedback: 'Waiting until the end prevents timely review and correction.' },
      { id: 'B', text: 'Set a follow-up question, responsible actor, review date and account-back step.', feedback: 'Correct. Clear ownership, timing and account-back make review actionable.', correct: true },
      { id: 'C', text: 'Collect more information without deciding who will review it.', feedback: 'More information is not useful without responsibility and a review point.' },
    ],
  },
] as const;

const CORRECT_ANSWERS = Object.freeze(Object.fromEntries(
  MODULE4_KNOWLEDGE_QUESTIONS.map((question) => [
    question.id,
    question.choices.find((choice) => choice.correct)?.id,
  ]),
) as Record<Module4KnowledgeQuestionId, Module4KnowledgeChoiceId>);

export function selectModule4KnowledgeAnswer(
  state: Module4EnhancedState,
  questionId: Module4KnowledgeQuestionId,
  answer: Module4KnowledgeChoiceId,
): Module4EnhancedState {
  const check = state.finalScreens.knowledgeCheck;
  if (
    check.passed
    || check.correctQuestionIds.includes(questionId)
    || check.checkedQuestionIds.includes(questionId)
    || check.questionQueue[check.activeQuestionIndex] !== questionId
  ) return state;
  return {
    ...state,
    finalScreens: {
      ...state.finalScreens,
      knowledgeCheck: {
        ...check,
        answers: { ...check.answers, [questionId]: answer },
      },
    },
  };
}

export function checkModule4KnowledgeAnswer(
  state: Module4EnhancedState,
  questionId: Module4KnowledgeQuestionId,
  checkedAt = new Date().toISOString(),
): Module4EnhancedState {
  const check = state.finalScreens.knowledgeCheck;
  const answer = check.answers[questionId];
  if (
    !answer
    || check.passed
    || check.correctQuestionIds.includes(questionId)
    || check.checkedQuestionIds.includes(questionId)
    || check.questionQueue[check.activeQuestionIndex] !== questionId
  ) return state;

  const correct = CORRECT_ANSWERS[questionId] === answer;
  const correctQuestionIds = correct
    ? [...new Set([...check.correctQuestionIds, questionId])]
    : check.correctQuestionIds.filter((id) => id !== questionId);
  const missedQuestionIds = correct
    ? check.missedQuestionIds.filter((id) => id !== questionId)
    : [...new Set([...check.missedQuestionIds, questionId])];
  const checkedQuestionIds = [...new Set([...check.checkedQuestionIds, questionId])];
  const score = correctQuestionIds.length;
  const roundComplete = check.questionQueue.every((id) => checkedQuestionIds.includes(id));
  const passed = roundComplete && score >= MODULE4_KNOWLEDGE_PASS_SCORE;

  return {
    ...state,
    finalScreens: {
      ...state.finalScreens,
      knowledgeCheck: {
        ...check,
        checkedQuestionIds,
        correctQuestionIds,
        missedQuestionIds,
        attemptsByQuestion: {
          ...check.attemptsByQuestion,
          [questionId]: (check.attemptsByQuestion[questionId] || 0) + 1,
        },
        score,
        passed,
        passedAt: passed ? check.passedAt || checkedAt : null,
        mode: passed ? 'passed' : roundComplete ? 'results' : check.mode,
      },
    },
  };
}

export function advanceModule4KnowledgeQuestion(
  state: Module4EnhancedState,
): Module4EnhancedState {
  const check = state.finalScreens.knowledgeCheck;
  const activeId = check.questionQueue[check.activeQuestionIndex];
  if (
    !activeId
    || !check.checkedQuestionIds.includes(activeId)
    || check.activeQuestionIndex >= check.questionQueue.length - 1
  ) return state;
  return {
    ...state,
    finalScreens: {
      ...state.finalScreens,
      knowledgeCheck: {
        ...check,
        activeQuestionIndex: check.activeQuestionIndex + 1,
      },
    },
  };
}

export function retryMissedModule4KnowledgeQuestions(
  state: Module4EnhancedState,
): Module4EnhancedState {
  const check = state.finalScreens.knowledgeCheck;
  if (check.mode !== 'results' || check.missedQuestionIds.length === 0) return state;
  return {
    ...state,
    finalScreens: {
      ...state.finalScreens,
      knowledgeCheck: {
        ...check,
        mode: 'retry',
        questionQueue: [...check.missedQuestionIds],
        activeQuestionIndex: 0,
        checkedQuestionIds: [],
      },
    },
  };
}

export function updateModule4CompletionConfirmation(
  state: Module4EnhancedState,
  key: keyof Module4EnhancedState['finalScreens']['completionConfirmation'],
  value: boolean,
): Module4EnhancedState {
  if (key === 'confirmedAt') return state;
  return {
    ...state,
    finalScreens: {
      ...state.finalScreens,
      completionConfirmation: {
        ...state.finalScreens.completionConfirmation,
        [key]: value,
        confirmedAt: null,
      },
    },
  };
}

export const MODULE4_REQUIRED_ACTIVITY_SCREEN_IDS = [
  'M4-S1-01',
  'M4-S1-02',
  'M4-S1-03',
  'M4-S1-04',
  'M4-S1-05',
  'M4-S1-06',
  'M4-S1-07',
  'M4-S1-08',
  'M4-S1-09',
  'M4-S1-10',
  'M4-S1-11',
  'M4-S1-12',
] as const;

export function getModule4FinalReadiness(state: Module4EnhancedState) {
  const note = state.fields.implementationDecisionNote;
  const activitiesComplete = MODULE4_REQUIRED_ACTIVITY_SCREEN_IDS.every(
    (screenId) => state.screens[screenId as keyof typeof state.screens]?.gateSatisfied,
  );
  const noteCurrent = Boolean(note.updatedAt)
    && isImplementationDecisionNoteComplete(note.value)
    && canContinueFromImplementationNote(state, note.value)
    && affectedImplementationNoteSections(state).length === 0
    && state.reviewRequiredFields.length === 0;
  const knowledgePassed = state.finalScreens.knowledgeCheck.passed
    && state.finalScreens.knowledgeCheck.score >= MODULE4_KNOWLEDGE_PASS_SCORE;
  const confirmations = state.finalScreens.completionConfirmation;
  const confirmationsComplete = confirmations.noteConfirmed
    && confirmations.reviewCommitmentConfirmed
    && confirmations.readyToCompleteConfirmed;
  return {
    activitiesComplete,
    noteCurrent,
    knowledgePassed,
    confirmationsComplete,
    ready: activitiesComplete && noteCurrent && knowledgePassed && confirmationsComplete,
  };
}

export type CompleteModule4FinalState = {
  screenProgress: Record<string, string[]>;
  completedModules: string[];
  module4Enhanced: Module4EnhancedState;
};

export function completeModule4FinalScreen(
  state: CompleteModule4FinalState,
  completedAt = new Date().toISOString(),
): CompleteModule4FinalState {
  if (!getModule4FinalReadiness(state.module4Enhanced).ready) return state;
  const firstCompletedAt = state.module4Enhanced.completion.completedAt || completedAt;
  const recorded = recordModule4EnhancedScreenCompletion(
    {
      screenProgress: state.screenProgress,
      module4Enhanced: state.module4Enhanced,
    },
    'M4-S1-14',
    true,
    firstCompletedAt,
  );
  return {
    screenProgress: recorded.screenProgress,
    completedModules: state.completedModules.includes(MODULE4_ID)
      ? state.completedModules
      : [...state.completedModules, MODULE4_ID],
    module4Enhanced: {
      ...recorded.module4Enhanced,
      completion: {
        enhancedJourneyCompleted: true,
        completedAt: firstCompletedAt,
      },
      finalScreens: {
        ...recorded.module4Enhanced.finalScreens,
        completionConfirmation: {
          ...recorded.module4Enhanced.finalScreens.completionConfirmation,
          confirmedAt: recorded.module4Enhanced.finalScreens.completionConfirmation.confirmedAt
            || firstCompletedAt,
        },
      },
    },
  };
}
