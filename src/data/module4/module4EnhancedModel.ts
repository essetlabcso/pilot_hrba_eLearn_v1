export const MODULE4_ID = 'module_04_implementation';
export const MODULE4_ENHANCED_SCHEMA_VERSION = 1 as const;
export const MODULE4_ENHANCED_CONTENT_REVISION = 'module4-enhanced-2026-07-25';
export const MODULE4_ENHANCED_MIGRATION_MARKER = 'module4-enhanced-v1';
export const MODULE4_FINAL_SCREENS_SCHEMA_VERSION = 1 as const;
export const MODULE4_KNOWLEDGE_CHECK_REVISION = 'm4-kc-v1' as const;

export const MODULE4_CANONICAL_SCREEN_IDS = [
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
  'M4-S1-13',
  'M4-S1-14',
] as const;

export type Module4CanonicalScreenId = typeof MODULE4_CANONICAL_SCREEN_IDS[number];

export const MODULE4_SCREEN_ROUTES: Readonly<Record<'M4-PLAYER-00' | Module4CanonicalScreenId, string>> =
  Object.freeze({
    'M4-PLAYER-00': '/module-4/cover',
    'M4-S1-01': '/module-4/screen-4-1',
    'M4-S1-02': '/module-4/screen-4-2',
    'M4-S1-03': '/module-4/screen-4-3',
    'M4-S1-04': '/module-4/screen-4-4',
    'M4-S1-05': '/module-4/screen-4-5',
    'M4-S1-06': '/module-4/screen-4-6',
    'M4-S1-07': '/module-4/screen-4-7',
    'M4-S1-08': '/module-4/screen-4-8',
    'M4-S1-09': '/module-4/screen-4-9',
    'M4-S1-10': '/module-4/screen-4-10',
    'M4-S1-11': '/module-4/screen-4-11',
    'M4-S1-12': '/module-4/screen-4-12',
    'M4-S1-13': '/module-4/screen-4-13',
    'M4-S1-14': '/module-4/screen-4-14',
  });

export type Module4Workstream =
  | ''
  | 'market'
  | 'water_service'
  | 'youth_livelihoods'
  | 'health_post'
  | 'consultation_feedback';

export type Module4ResponsePathway = '' | 'adjust' | 'engage' | 'protect';
export type Module4EvidenceClassification = '' | 'confirmed' | 'needs_checking';

export const MODULE4_WORKSTREAMS = [
  'market',
  'water_service',
  'youth_livelihoods',
  'health_post',
  'consultation_feedback',
] as const satisfies readonly Exclude<Module4Workstream, ''>[];

export const MODULE4_KNOWLEDGE_QUESTION_IDS = [
  'M4-KC-Q01',
  'M4-KC-Q02',
  'M4-KC-Q03',
  'M4-KC-Q04',
  'M4-KC-Q05',
  'M4-KC-Q06',
  'M4-KC-Q07',
  'M4-KC-Q08',
] as const;

export type Module4KnowledgeQuestionId = typeof MODULE4_KNOWLEDGE_QUESTION_IDS[number];
export type Module4KnowledgeChoiceId = 'A' | 'B' | 'C';

export type Module4FinalScreensState = {
  schemaVersion: typeof MODULE4_FINAL_SCREENS_SCHEMA_VERSION;
  knowledgeCheck: {
    questionRevision: typeof MODULE4_KNOWLEDGE_CHECK_REVISION;
    mode: 'first-attempt' | 'retry' | 'results' | 'passed';
    questionQueue: Module4KnowledgeQuestionId[];
    activeQuestionIndex: number;
    checkedQuestionIds: Module4KnowledgeQuestionId[];
    answers: Partial<Record<Module4KnowledgeQuestionId, Module4KnowledgeChoiceId>>;
    correctQuestionIds: Module4KnowledgeQuestionId[];
    missedQuestionIds: Module4KnowledgeQuestionId[];
    attemptsByQuestion: Partial<Record<Module4KnowledgeQuestionId, number>>;
    score: number;
    passed: boolean;
    passedAt: string | null;
  };
  completionConfirmation: {
    noteConfirmed: boolean;
    reviewCommitmentConfirmed: boolean;
    readyToCompleteConfirmed: boolean;
    confirmedAt: string | null;
  };
};

export type Module4Batch1State = {
  bridge: {
    selectedAnswer: '' | 'A' | 'B' | 'C';
    feedbackViewed: boolean;
  };
  practiceJourney: {
    exampleExpanded: boolean;
    acknowledged: boolean;
  };
  everydayRightsLens: {
    activeStep: number;
    exploredSteps: number[];
    finalAnswer: '' | 'A' | 'B' | 'C';
    feedbackViewed: boolean;
  };
  workstreamExploration: {
    activeWorkstream: Exclude<Module4Workstream, ''>;
    exploredWorkstreams: Exclude<Module4Workstream, ''>[];
    classifications: Partial<
      Record<Exclude<Module4Workstream, ''>, Record<string, Module4EvidenceClassification>>
    >;
  };
};

export type Module4Batch2State = {
  fairAccess: {
    activeStage: 1 | 2 | 3 | 4;
    selectedEvidence: string[];
    evidenceFeedback: 'idle' | 'correct' | 'corrective';
    selectedAction: '' | 'A' | 'B' | 'C';
    actionFeedback: 'idle' | 'correct' | 'corrective';
    followUpOwner: string;
    followUpRole: string;
    followUpActions: string[];
    followUpFeedback: 'idle' | 'correct' | 'corrective';
    decisionSaved: boolean;
  };
  participation: {
    activeStage: 1 | 2 | 3 | 4 | 5;
    openDecision: '' | 'A' | 'B' | 'C';
    decisionFeedback: 'idle' | 'correct' | 'corrective';
    perspectives: string[];
    perspectivesFeedback: 'idle' | 'correct' | 'corrective';
    measures: string[];
    measuresFeedback: 'idle' | 'correct' | 'corrective';
    explanationItems: string[];
    explanationOwner: string;
    explanationChannels: string[];
    outcomeFeedback: 'idle' | 'correct' | 'corrective';
    pathwaySaved: boolean;
  };
  feedbackLoop: {
    activeStage: 1 | 2 | 3 | 4 | 5 | 6;
    exploredHotspots: string[];
    concernParts: string[];
    concernFeedback: 'idle' | 'correct' | 'corrective';
    recordNeeds: string[];
    recordFeedback: 'idle' | 'correct' | 'corrective';
    responseOwner: string;
    responseAction: '' | 'A' | 'B' | 'C';
    responseFeedback: 'idle' | 'correct' | 'corrective';
    accountBackItems: string[];
    accountBackFeedback: 'idle' | 'correct' | 'corrective';
    followUpPriorities: string[];
    followUpTiming: string;
    followUpFeedback: 'idle' | 'correct' | 'corrective';
    pathwaySaved: boolean;
  };
};

export type Module4Batch3State = {
  roles: {
    activeStage: 1 | 2 | 3 | 4 | 5 | 6;
    assignments: Record<string, string>;
    assignmentsFeedback: 'idle' | 'correct' | 'corrective';
    selectedResponse: '' | 'A' | 'B' | 'C';
    responseFeedback: 'idle' | 'correct' | 'corrective';
    selectedPosition: '' | 'A' | 'B' | 'C';
    positionFeedback: 'idle' | 'correct' | 'corrective';
    formalTriggers: string[];
    formalFeedback: 'idle' | 'correct' | 'corrective';
    followUpWho: string;
    followUpWhen: string;
    followUpPurpose: string;
    followUpDocumented: string;
    followUpInformed: string;
    followUpFeedback: 'idle' | 'correct' | 'corrective';
    confirmItems: string[];
    explainItems: string[];
    reviewTiming: string;
    confirmFeedback: 'idle' | 'correct' | 'corrective';
    planSaved: boolean;
  };
  support: {
    activeStage: 1 | 2 | 3 | 4 | 5;
    classifications: Record<string, string>;
    classificationsFeedback: 'idle' | 'correct' | 'corrective';
    firstSupport: '' | 'A' | 'B' | 'C';
    firstSupportFeedback: 'idle' | 'correct' | 'corrective';
    condition1: string;
    condition2: string;
    condition3: string;
    pathwayFeedback: 'idle' | 'correct' | 'corrective';
    reviewItems: string[];
    reviewTiming: string;
    updateUse: string[];
    reviewFeedback: 'idle' | 'correct' | 'corrective';
    planSaved: boolean;
  };
  pathways: {
    activeStage: 1 | 2 | 3;
    matches: Record<string, string>;
    matchesFeedback: 'idle' | 'correct' | 'corrective';
    decisions: Record<string, string>;
    decisionsFeedback: 'idle' | 'correct' | 'corrective';
    whyConfirmed: boolean;
    planSaved: boolean;
  };
  information: {
    activeStage: 1 | 2 | 3 | 4 | 5;
    selectedEvidence: '' | 'A' | 'B' | 'C';
    evidenceFeedback: 'idle' | 'correct' | 'corrective';
    selectedMinNeeded: string[];
    minNeededFeedback: 'idle' | 'correct' | 'corrective';
    selectedResponse: '' | 'A' | 'B' | 'C';
    responseFeedback: 'idle' | 'correct' | 'corrective';
    improveFields: string[];
    limitation: string;
    nextSteps: string[];
    noteFeedback: 'idle' | 'correct' | 'corrective';
    noteSaved: boolean;
  };
};

export type Module4ImplementationNote = {
  concern: string;
  evidence: string;
  affectedPeople?: string;
  response: string;
  rolesAndInclusion: string;
  participationAction?: string;
  accountBack: string;
  followUpQuestion: string;
  responsibleActor?: string;
  reviewPoint: string;
};

export type Module4FieldValues = {
  selectedWorkstream: Module4Workstream;
  evidenceClassifications: Record<string, string>;
  unresolvedQuestions: string[];
  participationDecisions: Record<string, string>;
  actorResponsibilities: Record<string, string>;
  engagementDecisions: Record<string, string>;
  feedbackAccountBackActions: Record<string, string>;
  supportDiagnosis: Record<string, string>;
  selectedResponsePathway: Module4ResponsePathway;
  minimumNecessaryInformation: string[];
  implementationDecisionNote: Module4ImplementationNote;
};

export type Module4FieldKey = keyof Module4FieldValues;

export type Module4FieldEnvelope<T> = {
  value: T;
  sourceScreenId: Module4CanonicalScreenId | 'migration';
  revision: number;
  dependencyRevisions: Partial<Record<Module4FieldKey, number>>;
  sectionDependencyRevisions?: Partial<
    Record<string, Partial<Record<Module4FieldKey, number>>>
  >;
  learnerEditedSections?: string[];
  learnerEdited: boolean;
  reviewRequired: boolean;
  updatedAt: string | null;
};

export type Module4EnhancedFields = {
  [K in Module4FieldKey]: Module4FieldEnvelope<Module4FieldValues[K]>;
};

export type Module4EnhancedScreenState = {
  gateSatisfied: boolean;
  completedAt: string | null;
};

export type Module4LegacySnapshot = {
  implementationNote: string;
  capturedAt: string;
  readOnly: true;
  countsTowardEnhancedCompletion: false;
};

export type Module4EnhancedState = {
  schemaVersion: typeof MODULE4_ENHANCED_SCHEMA_VERSION;
  contentRevision: typeof MODULE4_ENHANCED_CONTENT_REVISION;
  migration: {
    marker: typeof MODULE4_ENHANCED_MIGRATION_MARKER;
    appliedAt: string;
    historicalCompletionPreserved: boolean;
    syntheticLegacyReset: boolean;
    legacySnapshot: Module4LegacySnapshot | null;
  };
  fields: Module4EnhancedFields;
  batch1: Module4Batch1State;
  batch2: Module4Batch2State;
  batch3: Module4Batch3State;
  finalScreens: Module4FinalScreensState;
  screens: Record<Module4CanonicalScreenId, Module4EnhancedScreenState>;
  reviewRequiredFields: Module4FieldKey[];
  completion: {
    enhancedJourneyCompleted: boolean;
    completedAt: string | null;
  };
};

const EMPTY_IMPLEMENTATION_NOTE: Module4ImplementationNote = {
  concern: '',
  evidence: '',
  affectedPeople: '',
  response: '',
  rolesAndInclusion: '',
  participationAction: '',
  accountBack: '',
  followUpQuestion: '',
  responsibleActor: '',
  reviewPoint: '',
};

const FIELD_SOURCE_SCREENS: Record<Module4FieldKey, Module4CanonicalScreenId> = {
  selectedWorkstream: 'M4-S1-04',
  evidenceClassifications: 'M4-S1-05',
  unresolvedQuestions: 'M4-S1-05',
  participationDecisions: 'M4-S1-06',
  feedbackAccountBackActions: 'M4-S1-07',
  actorResponsibilities: 'M4-S1-08',
  engagementDecisions: 'M4-S1-08',
  supportDiagnosis: 'M4-S1-09',
  selectedResponsePathway: 'M4-S1-10',
  minimumNecessaryInformation: 'M4-S1-11',
  implementationDecisionNote: 'M4-S1-12',
};

export const MODULE4_FIELD_DEPENDENCIES: Readonly<
  Partial<Record<Module4FieldKey, readonly Module4FieldKey[]>>
> = Object.freeze({
  selectedWorkstream: [
    'evidenceClassifications',
    'unresolvedQuestions',
    'participationDecisions',
    'feedbackAccountBackActions',
    'actorResponsibilities',
    'engagementDecisions',
    'supportDiagnosis',
    'selectedResponsePathway',
    'minimumNecessaryInformation',
    'implementationDecisionNote',
  ],
  evidenceClassifications: [
    'unresolvedQuestions',
    'supportDiagnosis',
    'selectedResponsePathway',
    'minimumNecessaryInformation',
    'implementationDecisionNote',
  ],
  unresolvedQuestions: ['supportDiagnosis', 'selectedResponsePathway', 'implementationDecisionNote'],
  participationDecisions: [
    'feedbackAccountBackActions',
    'actorResponsibilities',
    'engagementDecisions',
    'implementationDecisionNote',
  ],
  feedbackAccountBackActions: ['actorResponsibilities', 'engagementDecisions', 'implementationDecisionNote'],
  actorResponsibilities: ['engagementDecisions', 'selectedResponsePathway', 'implementationDecisionNote'],
  engagementDecisions: ['selectedResponsePathway', 'implementationDecisionNote'],
  supportDiagnosis: ['selectedResponsePathway', 'minimumNecessaryInformation', 'implementationDecisionNote'],
  selectedResponsePathway: ['minimumNecessaryInformation', 'implementationDecisionNote'],
  minimumNecessaryInformation: ['implementationDecisionNote'],
});

function emptyEnvelope<K extends Module4FieldKey>(
  key: K,
  value: Module4FieldValues[K],
): Module4FieldEnvelope<Module4FieldValues[K]> {
  return {
    value,
    sourceScreenId: FIELD_SOURCE_SCREENS[key],
    revision: 0,
    dependencyRevisions: {},
    learnerEdited: false,
    reviewRequired: false,
    updatedAt: null,
  };
}

function createInitialFields(): Module4EnhancedFields {
  return {
    selectedWorkstream: emptyEnvelope('selectedWorkstream', ''),
    evidenceClassifications: emptyEnvelope('evidenceClassifications', {}),
    unresolvedQuestions: emptyEnvelope('unresolvedQuestions', []),
    participationDecisions: emptyEnvelope('participationDecisions', {}),
    actorResponsibilities: emptyEnvelope('actorResponsibilities', {}),
    engagementDecisions: emptyEnvelope('engagementDecisions', {}),
    feedbackAccountBackActions: emptyEnvelope('feedbackAccountBackActions', {}),
    supportDiagnosis: emptyEnvelope('supportDiagnosis', {}),
    selectedResponsePathway: emptyEnvelope('selectedResponsePathway', ''),
    minimumNecessaryInformation: emptyEnvelope('minimumNecessaryInformation', []),
    implementationDecisionNote: emptyEnvelope(
      'implementationDecisionNote',
      { ...EMPTY_IMPLEMENTATION_NOTE },
    ),
  };
}

function createInitialScreens(): Record<Module4CanonicalScreenId, Module4EnhancedScreenState> {
  return Object.fromEntries(
    MODULE4_CANONICAL_SCREEN_IDS.map((screenId) => [
      screenId,
      { gateSatisfied: false, completedAt: null },
    ]),
  ) as Record<Module4CanonicalScreenId, Module4EnhancedScreenState>;
}

export function createInitialModule4Batch1State(): Module4Batch1State {
  return {
    bridge: {
      selectedAnswer: '',
      feedbackViewed: false,
    },
    practiceJourney: {
      exampleExpanded: false,
      acknowledged: false,
    },
    everydayRightsLens: {
      activeStep: 1,
      exploredSteps: [],
      finalAnswer: '',
      feedbackViewed: false,
    },
    workstreamExploration: {
      activeWorkstream: 'market',
      exploredWorkstreams: [],
      classifications: {},
    },
  };
}

export function createInitialModule4Batch2State(): Module4Batch2State {
  return {
    fairAccess: {
      activeStage: 1,
      selectedEvidence: [],
      evidenceFeedback: 'idle',
      selectedAction: '',
      actionFeedback: 'idle',
      followUpOwner: '',
      followUpRole: '',
      followUpActions: [],
      followUpFeedback: 'idle',
      decisionSaved: false,
    },
    participation: {
      activeStage: 1,
      openDecision: '',
      decisionFeedback: 'idle',
      perspectives: [],
      perspectivesFeedback: 'idle',
      measures: [],
      measuresFeedback: 'idle',
      explanationItems: [],
      explanationOwner: '',
      explanationChannels: [],
      outcomeFeedback: 'idle',
      pathwaySaved: false,
    },
    feedbackLoop: {
      activeStage: 1,
      exploredHotspots: [],
      concernParts: [],
      concernFeedback: 'idle',
      recordNeeds: [],
      recordFeedback: 'idle',
      responseOwner: '',
      responseAction: '',
      responseFeedback: 'idle',
      accountBackItems: [],
      accountBackFeedback: 'idle',
      followUpPriorities: [],
      followUpTiming: '',
      followUpFeedback: 'idle',
      pathwaySaved: false,
    },
  };
}

export function createInitialModule4Batch3State(): Module4Batch3State {
  return {
    roles: {
      activeStage: 1,
      assignments: {},
      assignmentsFeedback: 'idle',
      selectedResponse: '',
      responseFeedback: 'idle',
      selectedPosition: '',
      positionFeedback: 'idle',
      formalTriggers: [],
      formalFeedback: 'idle',
      followUpWho: '',
      followUpWhen: '',
      followUpPurpose: '',
      followUpDocumented: '',
      followUpInformed: '',
      followUpFeedback: 'idle',
      confirmItems: [],
      explainItems: [],
      reviewTiming: '',
      confirmFeedback: 'idle',
      planSaved: false,
    },
    support: {
      activeStage: 1,
      classifications: {},
      classificationsFeedback: 'idle',
      firstSupport: '',
      firstSupportFeedback: 'idle',
      condition1: '',
      condition2: '',
      condition3: '',
      pathwayFeedback: 'idle',
      reviewItems: [],
      reviewTiming: '',
      updateUse: [],
      reviewFeedback: 'idle',
      planSaved: false,
    },
    pathways: {
      activeStage: 1,
      matches: {},
      matchesFeedback: 'idle',
      decisions: {},
      decisionsFeedback: 'idle',
      whyConfirmed: false,
      planSaved: false,
    },
    information: {
      activeStage: 1,
      selectedEvidence: '',
      evidenceFeedback: 'idle',
      selectedMinNeeded: [],
      minNeededFeedback: 'idle',
      selectedResponse: '',
      responseFeedback: 'idle',
      improveFields: [],
      limitation: '',
      nextSteps: [],
      noteFeedback: 'idle',
      noteSaved: false,
    },
  };
}

export function createInitialModule4FinalScreensState(): Module4FinalScreensState {
  return {
    schemaVersion: MODULE4_FINAL_SCREENS_SCHEMA_VERSION,
    knowledgeCheck: {
      questionRevision: MODULE4_KNOWLEDGE_CHECK_REVISION,
      mode: 'first-attempt',
      questionQueue: [...MODULE4_KNOWLEDGE_QUESTION_IDS],
      activeQuestionIndex: 0,
      checkedQuestionIds: [],
      answers: {},
      correctQuestionIds: [],
      missedQuestionIds: [],
      attemptsByQuestion: {},
      score: 0,
      passed: false,
      passedAt: null,
    },
    completionConfirmation: {
      noteConfirmed: false,
      reviewCommitmentConfirmed: false,
      readyToCompleteConfirmed: false,
      confirmedAt: null,
    },
  };
}

export function createInitialModule4EnhancedState(
  appliedAt: string,
  options: {
    historicalCompletionPreserved?: boolean;
    syntheticLegacyReset?: boolean;
    legacySnapshot?: Module4LegacySnapshot | null;
  } = {},
): Module4EnhancedState {
  return {
    schemaVersion: MODULE4_ENHANCED_SCHEMA_VERSION,
    contentRevision: MODULE4_ENHANCED_CONTENT_REVISION,
    migration: {
      marker: MODULE4_ENHANCED_MIGRATION_MARKER,
      appliedAt,
      historicalCompletionPreserved: options.historicalCompletionPreserved === true,
      syntheticLegacyReset: options.syntheticLegacyReset === true,
      legacySnapshot: options.legacySnapshot || null,
    },
    fields: createInitialFields(),
    batch1: createInitialModule4Batch1State(),
    batch2: createInitialModule4Batch2State(),
    batch3: createInitialModule4Batch3State(),
    finalScreens: createInitialModule4FinalScreensState(),
    screens: createInitialScreens(),
    reviewRequiredFields: [],
    completion: {
      enhancedJourneyCompleted: false,
      completedAt: null,
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isCurrentModule4EnhancedState(value: unknown): value is Module4EnhancedState {
  if (!isRecord(value) || !isRecord(value.migration)) return false;
  return value.schemaVersion === MODULE4_ENHANCED_SCHEMA_VERSION
    && value.contentRevision === MODULE4_ENHANCED_CONTENT_REVISION
    && value.migration.marker === MODULE4_ENHANCED_MIGRATION_MARKER
    && isRecord(value.fields)
    && isRecord(value.screens)
    && isRecord(value.completion);
}

function hydrateCurrentModule4EnhancedState(value: Module4EnhancedState): Module4EnhancedState {
  const defaults = createInitialModule4Batch1State();
  const batch2Defaults = createInitialModule4Batch2State();
  const batch1: Record<string, unknown> = isRecord(value.batch1) ? value.batch1 : {};
  const bridge: Record<string, unknown> = isRecord(batch1.bridge) ? batch1.bridge : {};
  const practiceJourney: Record<string, unknown> = isRecord(batch1.practiceJourney) ? batch1.practiceJourney : {};
  const everydayRightsLens: Record<string, unknown> = isRecord(batch1.everydayRightsLens) ? batch1.everydayRightsLens : {};
  const workstreamExploration: Record<string, unknown> = isRecord(batch1.workstreamExploration)
    ? batch1.workstreamExploration
    : {};
  const batch2: Record<string, unknown> = isRecord(value.batch2) ? value.batch2 : {};
  const fairAccess: Record<string, unknown> = isRecord(batch2.fairAccess) ? batch2.fairAccess : {};
  const participation: Record<string, unknown> = isRecord(batch2.participation) ? batch2.participation : {};
  const feedbackLoop: Record<string, unknown> = isRecord(batch2.feedbackLoop) ? batch2.feedbackLoop : {};

  const batch3Defaults = createInitialModule4Batch3State();
  const batch3: Record<string, unknown> = isRecord(value.batch3) ? value.batch3 : {};
  const roles: Record<string, unknown> = isRecord(batch3.roles) ? batch3.roles : {};
  const support: Record<string, unknown> = isRecord(batch3.support) ? batch3.support : {};
  const pathways: Record<string, unknown> = isRecord(batch3.pathways) ? batch3.pathways : {};
  const information: Record<string, unknown> = isRecord(batch3.information) ? batch3.information : {};
  const finalDefaults = createInitialModule4FinalScreensState();
  const finalScreens: Record<string, unknown> = isRecord(value.finalScreens) ? value.finalScreens : {};
  const knowledgeCheck: Record<string, unknown> = isRecord(finalScreens.knowledgeCheck)
    ? finalScreens.knowledgeCheck
    : {};
  const completionConfirmation: Record<string, unknown> = isRecord(finalScreens.completionConfirmation)
    ? finalScreens.completionConfirmation
    : {};
  const questionRevisionCurrent =
    knowledgeCheck.questionRevision === MODULE4_KNOWLEDGE_CHECK_REVISION;
  const validQuestionIds = (input: unknown): Module4KnowledgeQuestionId[] =>
    Array.isArray(input)
      ? input.filter(
        (item): item is Module4KnowledgeQuestionId =>
          MODULE4_KNOWLEDGE_QUESTION_IDS.includes(item as Module4KnowledgeQuestionId),
      )
      : [];
  const validAnswers = isRecord(knowledgeCheck.answers)
    ? Object.fromEntries(
      Object.entries(knowledgeCheck.answers).filter(([questionId, answer]) =>
        MODULE4_KNOWLEDGE_QUESTION_IDS.includes(questionId as Module4KnowledgeQuestionId)
          && ['A', 'B', 'C'].includes(String(answer))),
    )
    : {};
  const validAttempts = isRecord(knowledgeCheck.attemptsByQuestion)
    ? Object.fromEntries(
      Object.entries(knowledgeCheck.attemptsByQuestion).filter(([questionId, attempts]) =>
        MODULE4_KNOWLEDGE_QUESTION_IDS.includes(questionId as Module4KnowledgeQuestionId)
          && typeof attempts === 'number'
          && Number.isInteger(attempts)
          && attempts >= 0),
    )
    : {};
  const hydratedCorrectQuestionIds = validQuestionIds(knowledgeCheck.correctQuestionIds);
  const hydratedPassed = knowledgeCheck.passed === true
    && hydratedCorrectQuestionIds.length >= 7;
  const hydratedMode = hydratedPassed
    ? 'passed'
    : ['first-attempt', 'retry', 'results'].includes(String(knowledgeCheck.mode))
      ? knowledgeCheck.mode as 'first-attempt' | 'retry' | 'results'
      : 'first-attempt';
  const pathwayDecisions = isRecord(pathways.decisions) ? pathways.decisions : {};
  const pathwayPracticeComplete = ['adjust', 'engage', 'protect'].every(
    (key) => typeof pathwayDecisions[key] === 'string' && pathwayDecisions[key].length > 0,
  );

  return {
    ...value,
    batch1: {
      bridge: {
        ...defaults.bridge,
        ...bridge,
      } as Module4Batch1State['bridge'],
      practiceJourney: {
        ...defaults.practiceJourney,
        ...practiceJourney,
      } as Module4Batch1State['practiceJourney'],
      everydayRightsLens: {
        ...defaults.everydayRightsLens,
        ...everydayRightsLens,
        exploredSteps: Array.isArray(everydayRightsLens.exploredSteps)
          ? everydayRightsLens.exploredSteps.filter(
            (step: unknown): step is number => typeof step === 'number'
              && Number.isInteger(step)
              && step >= 1
              && step <= 6,
          )
          : [],
      } as Module4Batch1State['everydayRightsLens'],
      workstreamExploration: {
        ...defaults.workstreamExploration,
        ...workstreamExploration,
        exploredWorkstreams: Array.isArray(workstreamExploration.exploredWorkstreams)
          ? workstreamExploration.exploredWorkstreams.filter(
            (workstream: unknown): workstream is Exclude<Module4Workstream, ''> =>
              MODULE4_WORKSTREAMS.includes(workstream as Exclude<Module4Workstream, ''>),
          )
          : [],
        classifications: isRecord(workstreamExploration.classifications)
          ? workstreamExploration.classifications as Module4Batch1State['workstreamExploration']['classifications']
          : {},
      } as Module4Batch1State['workstreamExploration'],
    },
    batch2: {
      fairAccess: {
        ...batch2Defaults.fairAccess,
        ...fairAccess,
        selectedEvidence: Array.isArray(fairAccess.selectedEvidence)
          ? fairAccess.selectedEvidence.filter((item): item is string => typeof item === 'string')
          : [],
        followUpActions: Array.isArray(fairAccess.followUpActions)
          ? fairAccess.followUpActions.filter((item): item is string => typeof item === 'string')
          : [],
      } as Module4Batch2State['fairAccess'],
      participation: {
        ...batch2Defaults.participation,
        ...participation,
        perspectives: Array.isArray(participation.perspectives)
          ? participation.perspectives.filter((item): item is string => typeof item === 'string')
          : [],
        measures: Array.isArray(participation.measures)
          ? participation.measures.filter((item): item is string => typeof item === 'string')
          : [],
        explanationItems: Array.isArray(participation.explanationItems)
          ? participation.explanationItems.filter((item): item is string => typeof item === 'string')
          : [],
        explanationChannels: Array.isArray(participation.explanationChannels)
          ? participation.explanationChannels.filter((item): item is string => typeof item === 'string')
          : [],
      } as Module4Batch2State['participation'],
      feedbackLoop: {
        ...batch2Defaults.feedbackLoop,
        ...feedbackLoop,
        exploredHotspots: Array.isArray(feedbackLoop.exploredHotspots)
          ? feedbackLoop.exploredHotspots.filter((item): item is string => typeof item === 'string')
          : [],
        concernParts: Array.isArray(feedbackLoop.concernParts)
          ? feedbackLoop.concernParts.filter((item): item is string => typeof item === 'string')
          : [],
        recordNeeds: Array.isArray(feedbackLoop.recordNeeds)
          ? feedbackLoop.recordNeeds.filter((item): item is string => typeof item === 'string')
          : [],
        accountBackItems: Array.isArray(feedbackLoop.accountBackItems)
          ? feedbackLoop.accountBackItems.filter((item): item is string => typeof item === 'string')
          : [],
        followUpPriorities: Array.isArray(feedbackLoop.followUpPriorities)
          ? feedbackLoop.followUpPriorities.filter((item): item is string => typeof item === 'string')
          : [],
      } as Module4Batch2State['feedbackLoop'],
    },
    batch3: {
      roles: {
        ...batch3Defaults.roles,
        ...roles,
        assignments: isRecord(roles.assignments) ? roles.assignments : {},
        formalTriggers: Array.isArray(roles.formalTriggers)
          ? roles.formalTriggers.filter((item): item is string => typeof item === 'string')
          : [],
        confirmItems: Array.isArray(roles.confirmItems)
          ? roles.confirmItems.filter((item): item is string => typeof item === 'string')
          : [],
        explainItems: Array.isArray(roles.explainItems)
          ? roles.explainItems.filter((item): item is string => typeof item === 'string')
          : [],
      } as Module4Batch3State['roles'],
      support: {
        ...batch3Defaults.support,
        ...support,
        classifications: isRecord(support.classifications) ? support.classifications : {},
        reviewItems: Array.isArray(support.reviewItems)
          ? support.reviewItems.filter((item): item is string => typeof item === 'string')
          : [],
        updateUse: Array.isArray(support.updateUse)
          ? support.updateUse.filter((item): item is string => typeof item === 'string')
          : [],
      } as Module4Batch3State['support'],
      pathways: {
        ...batch3Defaults.pathways,
        ...pathways,
        matches: isRecord(pathways.matches) ? pathways.matches : {},
        decisions: pathwayDecisions,
        whyConfirmed: pathwayPracticeComplete && pathways.whyConfirmed === true,
        planSaved: pathwayPracticeComplete && pathways.planSaved === true,
        activeStage: !pathwayPracticeComplete && pathways.activeStage === 3
          ? (pathways.matchesFeedback === 'correct' ? 2 : 1)
          : pathways.activeStage || batch3Defaults.pathways.activeStage,
      } as Module4Batch3State['pathways'],
      information: {
        ...batch3Defaults.information,
        ...information,
        selectedMinNeeded: Array.isArray(information.selectedMinNeeded)
          ? information.selectedMinNeeded.filter((item): item is string => typeof item === 'string')
          : [],
        improveFields: Array.isArray(information.improveFields)
          ? information.improveFields.filter((item): item is string => typeof item === 'string')
          : [],
        nextSteps: Array.isArray(information.nextSteps)
          ? information.nextSteps.filter((item): item is string => typeof item === 'string')
          : [],
      } as Module4Batch3State['information'],
    },
    finalScreens: questionRevisionCurrent
      ? {
        schemaVersion: MODULE4_FINAL_SCREENS_SCHEMA_VERSION,
        knowledgeCheck: {
          ...finalDefaults.knowledgeCheck,
          ...knowledgeCheck,
          questionRevision: MODULE4_KNOWLEDGE_CHECK_REVISION,
          mode: hydratedMode,
          questionQueue: validQuestionIds(knowledgeCheck.questionQueue).length > 0
            ? validQuestionIds(knowledgeCheck.questionQueue)
            : [...MODULE4_KNOWLEDGE_QUESTION_IDS],
          activeQuestionIndex: typeof knowledgeCheck.activeQuestionIndex === 'number'
            ? Math.max(0, Math.min(
              validQuestionIds(knowledgeCheck.questionQueue).length - 1,
              Math.floor(knowledgeCheck.activeQuestionIndex),
            ))
            : 0,
          checkedQuestionIds: validQuestionIds(knowledgeCheck.checkedQuestionIds),
          answers: validAnswers,
          correctQuestionIds: hydratedCorrectQuestionIds,
          missedQuestionIds: validQuestionIds(knowledgeCheck.missedQuestionIds),
          attemptsByQuestion: validAttempts,
          score: hydratedCorrectQuestionIds.length,
          passed: hydratedPassed,
          passedAt: hydratedPassed
            && typeof knowledgeCheck.passedAt === 'string'
            ? knowledgeCheck.passedAt
            : null,
        } as Module4FinalScreensState['knowledgeCheck'],
        completionConfirmation: {
          ...finalDefaults.completionConfirmation,
          ...completionConfirmation,
          noteConfirmed: completionConfirmation.noteConfirmed === true,
          reviewCommitmentConfirmed: completionConfirmation.reviewCommitmentConfirmed === true,
          readyToCompleteConfirmed: completionConfirmation.readyToCompleteConfirmed === true,
          confirmedAt: typeof completionConfirmation.confirmedAt === 'string'
            ? completionConfirmation.confirmedAt
            : null,
        },
      }
      : finalDefaults,
  };
}

function hasMeaningfulValue(value: unknown) {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (isRecord(value)) return Object.values(value).some(hasMeaningfulValue);
  return value !== null && value !== undefined;
}

function captureLegacySnapshot(practice: Record<string, unknown>, capturedAt: string) {
  const legacyNote = isRecord(practice.module4ImplementationNote)
    ? practice.module4ImplementationNote
    : null;
  const note = legacyNote && typeof legacyNote.note === 'string'
    ? legacyNote.note.trim()
    : '';
  if (!note) return null;
  return {
    implementationNote: note,
    capturedAt,
    readOnly: true,
    countsTowardEnhancedCompletion: false,
  } satisfies Module4LegacySnapshot;
}

export type Module4MigrationInput = {
  practiceCheckState: unknown;
  screenProgress: unknown;
  completedModules: unknown;
  appliedAt?: string;
  resetSyntheticInternalTest?: boolean;
};

export type Module4MigrationResult = {
  practiceCheckState: Record<string, unknown>;
  screenProgress: Record<string, string[]>;
  completedModules: string[];
};

export function migrateModule4EnhancedState(input: Module4MigrationInput): Module4MigrationResult {
  const appliedAt = input.appliedAt || new Date().toISOString();
  const practice = isRecord(input.practiceCheckState) ? { ...input.practiceCheckState } : {};
  const screenProgress = isRecord(input.screenProgress)
    ? Object.fromEntries(
      Object.entries(input.screenProgress).map(([moduleId, value]) => [
        moduleId,
        Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [],
      ]),
    )
    : {};
  const completedModules = Array.isArray(input.completedModules)
    ? input.completedModules.filter((item): item is string => typeof item === 'string')
    : [];
  const historicalCompletionPreserved = completedModules.includes(MODULE4_ID);
  const existing = practice.module4Enhanced;
  const storedFinalScreens = isRecord(existing) && isRecord(existing.finalScreens)
    ? existing.finalScreens
    : null;
  const storedKnowledgeCheck = storedFinalScreens && isRecord(storedFinalScreens.knowledgeCheck)
    ? storedFinalScreens.knowledgeCheck
    : null;
  const questionRevisionChanged = isCurrentModule4EnhancedState(existing)
    && storedKnowledgeCheck?.questionRevision !== MODULE4_KNOWLEDGE_CHECK_REVISION;
  const enhanced = isCurrentModule4EnhancedState(existing)
    ? hydrateCurrentModule4EnhancedState(existing)
    : createInitialModule4EnhancedState(appliedAt, {
      historicalCompletionPreserved,
      legacySnapshot: captureLegacySnapshot(practice, appliedAt),
    });

  practice.module4Enhanced = questionRevisionChanged && !historicalCompletionPreserved
    ? {
      ...enhanced,
      screens: {
        ...enhanced.screens,
        'M4-S1-13': { gateSatisfied: false, completedAt: null },
        'M4-S1-14': { gateSatisfied: false, completedAt: null },
      },
      completion: {
        enhancedJourneyCompleted: false,
        completedAt: null,
      },
    }
    : enhanced;
  if (questionRevisionChanged && !historicalCompletionPreserved) {
    screenProgress[MODULE4_ID] = (screenProgress[MODULE4_ID] || [])
      .filter((screenId) => screenId !== 'M4-S1-13' && screenId !== 'M4-S1-14');
  }

  if (!input.resetSyntheticInternalTest) {
    return { practiceCheckState: practice, screenProgress, completedModules };
  }

  Object.keys(practice).forEach((key) => {
    if (key.startsWith('module4') && key !== 'module4Enhanced') delete practice[key];
  });
  practice.module4Enhanced = {
    ...enhanced,
    migration: {
      ...enhanced.migration,
      syntheticLegacyReset: true,
    },
  };
  screenProgress[MODULE4_ID] = [];

  return {
    practiceCheckState: practice,
    screenProgress,
    completedModules: completedModules.filter((moduleId) => moduleId !== MODULE4_ID),
  };
}

export function updateModule4Field<K extends Module4FieldKey>(
  state: Module4EnhancedState,
  key: K,
  value: Module4FieldValues[K],
  options: {
    sourceScreenId?: Module4CanonicalScreenId;
    learnerEdited?: boolean;
    updatedAt?: string;
  } = {},
): Module4EnhancedState {
  const previous = state.fields[key];
  const nextRevision = previous.revision + 1;
  const fields = { ...state.fields };
  fields[key] = {
    ...previous,
    value,
    sourceScreenId: options.sourceScreenId || FIELD_SOURCE_SCREENS[key],
    revision: nextRevision,
    learnerEdited: options.learnerEdited === true || previous.learnerEdited,
    reviewRequired: false,
    updatedAt: options.updatedAt || new Date().toISOString(),
  } as Module4EnhancedFields[K];

  const reviewRequiredFields = new Set(state.reviewRequiredFields);
  reviewRequiredFields.delete(key);

  for (const dependentKey of MODULE4_FIELD_DEPENDENCIES[key] || []) {
    const dependent = fields[dependentKey];
    fields[dependentKey] = {
      ...dependent,
      dependencyRevisions: {
        ...dependent.dependencyRevisions,
        [key]: nextRevision,
      },
      reviewRequired: hasMeaningfulValue(dependent.value),
    } as never;
    if (hasMeaningfulValue(dependent.value)) reviewRequiredFields.add(dependentKey);
  }

  return {
    ...state,
    fields,
    reviewRequiredFields: [...reviewRequiredFields],
  };
}

export function confirmModule4FieldReview(
  state: Module4EnhancedState,
  key: Module4FieldKey,
  updatedAt = new Date().toISOString(),
): Module4EnhancedState {
  const field = state.fields[key];
  return {
    ...state,
    fields: {
      ...state.fields,
      [key]: {
        ...field,
        reviewRequired: false,
        updatedAt,
      },
    },
    reviewRequiredFields: state.reviewRequiredFields.filter((fieldKey) => fieldKey !== key),
  };
}

export type Module4ProgressContainer = {
  screenProgress: Record<string, string[]>;
  module4Enhanced: Module4EnhancedState;
};

export function recordModule4EnhancedScreenCompletion(
  state: Module4ProgressContainer,
  screenId: Module4CanonicalScreenId,
  finalGateSatisfied: boolean,
  completedAt = new Date().toISOString(),
): Module4ProgressContainer {
  if (!finalGateSatisfied) return state;
  const completed = new Set(state.screenProgress[MODULE4_ID] || []);
  completed.add(screenId);
  return {
    ...state,
    screenProgress: {
      ...state.screenProgress,
      [MODULE4_ID]: [...completed],
    },
    module4Enhanced: {
      ...state.module4Enhanced,
      screens: {
        ...state.module4Enhanced.screens,
        [screenId]: {
          gateSatisfied: true,
          completedAt,
        },
      },
    },
  };
}
