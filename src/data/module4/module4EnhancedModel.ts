export const MODULE4_ID = 'module_04_implementation';
export const MODULE4_ENHANCED_SCHEMA_VERSION = 1 as const;
export const MODULE4_ENHANCED_CONTENT_REVISION = 'module4-enhanced-2026-07-25';
export const MODULE4_ENHANCED_MIGRATION_MARKER = 'module4-enhanced-v1';

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

export type Module4ImplementationNote = {
  concern: string;
  evidence: string;
  response: string;
  rolesAndInclusion: string;
  accountBack: string;
  followUpQuestion: string;
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
  response: '',
  rolesAndInclusion: '',
  accountBack: '',
  followUpQuestion: '',
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
  const batch1: Record<string, unknown> = isRecord(value.batch1) ? value.batch1 : {};
  const bridge: Record<string, unknown> = isRecord(batch1.bridge) ? batch1.bridge : {};
  const practiceJourney: Record<string, unknown> = isRecord(batch1.practiceJourney) ? batch1.practiceJourney : {};
  const everydayRightsLens: Record<string, unknown> = isRecord(batch1.everydayRightsLens) ? batch1.everydayRightsLens : {};
  const workstreamExploration: Record<string, unknown> = isRecord(batch1.workstreamExploration)
    ? batch1.workstreamExploration
    : {};

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
  const enhanced = isCurrentModule4EnhancedState(existing)
    ? hydrateCurrentModule4EnhancedState(existing)
    : createInitialModule4EnhancedState(appliedAt, {
      historicalCompletionPreserved,
      legacySnapshot: captureLegacySnapshot(practice, appliedAt),
    });

  practice.module4Enhanced = enhanced;

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
