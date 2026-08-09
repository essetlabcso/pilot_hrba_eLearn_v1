import m1Sequence from '../data/module1/module_1_screen_sequence.json';
import { module2FinalScreenIds } from '../data/module2-final/module2FinalScreens';
import { module3PlayerSequence } from '../data/module3/module3RevisedScreens';
import {
  MODULE4_ENHANCED_CONTENT_REVISION,
  MODULE4_ENHANCED_SCHEMA_VERSION,
} from '../data/module4/module4EnhancedModel';
import {
  MODULE5_CANONICAL_SCREEN_IDS,
} from '../data/module5/module5EnhancedModel';
import {
  MODULE5_PRESENTATION_CONTENT_REVISION,
  MODULE5_PRESENTATION_SCHEMA_VERSION,
} from '../data/module5/module5PresentationContent';
import {
  initialLearningState,
  validateLearningState,
  type LearningState,
} from '../state/learningState';
import { REQUIRED_HRBA_MODULE_IDS } from '../state/coursePrerequisites';

export const HRBA_RESUME_CONTRACT_VERSION = 1 as const;
export const HRBA_COURSE_STATE_VERSION = 'hrba-course-progress-v1' as const;
export const HRBA_COURSE_STRUCTURE_REVISION = 'hrba-course-structure-7e4b8b4-v1' as const;
export const HRBA_RESUME_MAX_BYTES = 512_000;

export type ResumeJsonValue = null | boolean | number | string | ResumeJsonValue[] | {
  [key: string]: ResumeJsonValue;
};

export type HrbaResumeModuleKey = 'module1' | 'module2' | 'module3' | 'module4' | 'module5';
export type HrbaResumeState = {
  contractVersion: 1;
  courseStateVersion: typeof HRBA_COURSE_STATE_VERSION;
  courseStructureRevision: typeof HRBA_COURSE_STRUCTURE_REVISION;
  baseRevision: string | null;
  navigation: {
    currentLayer: 'platform' | 'player';
    currentModuleId: string | null;
    currentScreenId: string | null;
  };
  completedModuleIds: string[];
  completedScreenIdsByModule: Record<string, string[]>;
  moduleState: Record<HrbaResumeModuleKey, {
    version: 1;
    data: Record<string, ResumeJsonValue>;
  }>;
  assessmentDraft?: {
    answers: Record<string, string>;
  };
};

export type TrustedAssessmentState = {
  attemptNumber: number;
  evidenceId: string;
  maxScore: number;
  passed: boolean;
  percentage: number;
  score: number;
  submittedAt: string;
} | null;

export type LegacyResumeMigrationIssue = {
  category:
    | 'invalid_payload'
    | 'unsupported_storage_version'
    | 'invalid_completed_modules'
    | 'prerequisite_jump'
    | 'invalid_navigation'
    | 'invalid_module_state'
    | 'serialization_failed';
  path: string;
};

export type LegacyResumeMigrationResult =
  | {
    ok: true;
    learningState: LearningState;
    resumeState: HrbaResumeState;
    meaningful: boolean;
    warnings: LegacyResumeMigrationIssue[];
  }
  | {
    ok: false;
    issues: LegacyResumeMigrationIssue[];
  };

const assessmentEvidencePattern = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|[A-Za-z0-9_-]{42}[AEIMQUYcgkosw048])$/iu;

export function validateTrustedAssessmentState(value: unknown): TrustedAssessmentState | undefined {
  if (value === null) return null;
  if (!isRecord(value)) return undefined;
  const submittedAt = typeof value.submittedAt === 'string' ? Date.parse(value.submittedAt) : Number.NaN;
  if (!Number.isInteger(value.attemptNumber) || (value.attemptNumber as number) < 1
    || typeof value.evidenceId !== 'string' || !assessmentEvidencePattern.test(value.evidenceId)
    || !Number.isInteger(value.score) || !Number.isInteger(value.maxScore) || (value.maxScore as number) <= 0
    || (value.score as number) < 0 || (value.score as number) > (value.maxScore as number)
    || !Number.isInteger(value.percentage) || (value.percentage as number) < 0 || (value.percentage as number) > 100
    || typeof value.passed !== 'boolean'
    || !Number.isFinite(submittedAt) || new Date(submittedAt).toISOString() !== value.submittedAt) return undefined;
  const expectedPercentage = Math.round(((value.score as number) / (value.maxScore as number)) * 100);
  if (value.percentage !== expectedPercentage || value.passed !== (expectedPercentage >= 80)) return undefined;
  return structuredClone(value) as Exclude<TrustedAssessmentState, null>;
}

const module1Fields = [
  'agreementAccepted', 'orientationAnswers', 'orientationCompleted', 'surveyAnswers', 'surveyPriorities',
  'surveyNote', 'surveyCompleted', 'sortingState', 'sortingCompleted', 'matchingState', 'matchingCompleted',
  'scenarioAnswers', 'scenarioCompleted', 'm1JourneyActiveStep', 'm1JourneyVisitedSteps',
  'm1WaterPointVisitedClues', 'm1WaterPointSelectedOption', 'm1WaterPointSummaryViewed',
  'm1EverydayWorkExplored', 'm1InclusionPerspectivesExplored', 'm1ConnectedRightsExplored',
  'm1RightsHolderLensViewed', 'm1RightsHolderCheckAnswer', 'm1ActorCategoriesExplored',
  'm1ActorMatchingAnswers', 'm1ActorMatchingCompleted', 'm1ParticipationLevelsViewed',
  'm1ParticipationScenarioAnswer', 'm1ParticipationScenarioCompleted', 'm1HrbaShiftStepsExplored',
  'm1HrbaShiftAnswer', 'm1KnowledgeCheckStarted', 'm1KnowledgeCheckCurrentIndex',
  'm1KnowledgeCheckSelectedAnswers', 'm1KnowledgeCheckCheckedQuestions', 'm1KnowledgeCheckCorrectness',
  'm1KnowledgeCheckScore', 'm1KnowledgeCheckCompleted', 'm1KnowledgeCheckRetryCount', 'assessmentFocus',
  'm1SelfAssessmentPage', 'selfAssessmentScores', 'selfAssessmentTotal', 'selfAssessmentCategory',
  'suggestedPriorityOne', 'suggestedPriorityTwo', 'screen16Completed', 'screen17ActionCommitment',
  'screen18Completion', 'module1Completion', 'portfolioShiftSelected', 'portfolioShiftAreas',
  'portfolioShiftNote', 'quizAnswers', 'quizCompleted', 'quizScore',
] as const;

const module2Fields = [
  'm2PlainLanguageRightsExplanation', 'm2EverydayRightsIssue', 'm2EverydayRightsDimension',
  'm2EverydayRightsMap', 'm2RightsType', 'm2RightsTypeNote', 'm2SafeLearningReminderAccepted',
  'm2StandardsChecklistReviewed', 'm2RightsRelevanceWorksheet', 'm2DecisionChangeType',
  'm2DecisionChangeNote', 'm2EverydayRightsLens', 'm2QuizAnswers', 'm2QuizCompleted',
  'm2SortingState', 'm2SortingCompleted', 'm2MatchingState', 'm2MatchingCompleted',
  'm2ObjectiveCardsViewed', 'm2FinalPortfolio', 'm2FinalKnowledgeCheckAnswers',
  'm2FinalKnowledgeCheckCompleted', 'm2HotspotViewed', 'm2FlashcardsViewed', 'm2TabsViewed',
  'm2ProcessViewed', 'm2TimelineViewed',
] as const;

const allowedDataFields: Record<HrbaResumeModuleKey, ReadonlySet<string>> = {
  module1: new Set([...module1Fields, 'practice']),
  module2: new Set([...module2Fields, 'practice']),
  module3: new Set(['practice']),
  module4: new Set(['practice']),
  module5: new Set(['practice']),
};

const screenIdsByModule: Record<string, ReadonlySet<string>> = {
  module_01_hrba_foundations: new Set(m1Sequence.map((item) => item['Screen/State ID'])),
  module_02_everyday_cso_work: new Set(module2FinalScreenIds),
  module_03_project_design: new Set(module3PlayerSequence.map((item) => item['Screen/State ID'])),
  module_04_implementation: new Set([
    'M4-PLAYER-00', ...Array.from({ length: 14 }, (_, index) => `M4-S1-${String(index + 1).padStart(2, '0')}`),
  ]),
  module_05_hrba_meal: new Set(['M5-PLAYER-00', ...MODULE5_CANONICAL_SCREEN_IDS]),
  final_assessment: new Set([
    'FINAL-ASSESSMENT-PLAYER-00', 'FINAL-ASSESSMENT-QUESTIONS', 'FINAL-ASSESSMENT-COMPLETE',
  ]),
};

const prohibitedKeys = new Set([
  'userid', 'learnerid', 'participantid', 'enrollmentid', 'organizationid', 'orgid',
  'courseversionid', 'learnerstatekey', 'launchtoken', 'certificateid', 'certificatecode',
  'finalassessmentresult', 'finalassessmentattemptnumber',
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>, required: string[], optional: string[] = []) {
  const allowed = new Set([...required, ...optional]);
  return required.every((key) => Object.hasOwn(value, key))
    && Object.keys(value).every((key) => allowed.has(key));
}

function isBoundedJson(value: unknown, depth = 0): value is ResumeJsonValue {
  if (depth > 12) return false;
  if (value === null || typeof value === 'boolean') return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value === 'string') return value.length <= 10_000;
  if (Array.isArray(value)) {
    return value.length <= 500 && value.every((item) => isBoundedJson(item, depth + 1));
  }
  if (!isRecord(value) || Object.keys(value).length > 500) return false;
  return Object.entries(value).every(([key, nested]) => {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    return key.length > 0
      && key.length <= 128
      && !prohibitedKeys.has(normalizedKey)
      && isBoundedJson(nested, depth + 1);
  });
}

function isValidRevision(value: unknown) {
  if (value === null) return true;
  if (typeof value !== 'string' || value.length > 64) return false;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString() === value;
}

function isValidPracticeKey(moduleKey: HrbaResumeModuleKey, key: string) {
  if (moduleKey === 'module1') return /^(?:m1|module1)/iu.test(key);
  if (moduleKey === 'module2') return /^(?:m2|module2)/iu.test(key);
  if (moduleKey === 'module3') {
    return /^(?:m3|module3|screen3)/iu.test(key)
      || ['rights_actors_map', 'knowledge_check', 'PortfolioSnapshot'].includes(key);
  }
  if (moduleKey === 'module4') return /^(?:m4|module4)/iu.test(key);
  return /^(?:m5|module5)/iu.test(key);
}

function getPracticeModuleKey(key: string): HrbaResumeModuleKey | null {
  return (['module1', 'module2', 'module3', 'module4', 'module5'] as const)
    .find((moduleKey) => isValidPracticeKey(moduleKey, key)) || null;
}

function validateModuleState(moduleKey: HrbaResumeModuleKey, value: unknown) {
  if (!isRecord(value) || !hasExactKeys(value, ['version', 'data']) || value.version !== 1 || !isRecord(value.data)) {
    return false;
  }
  if (!Object.keys(value.data).every((key) => allowedDataFields[moduleKey].has(key)) || !isBoundedJson(value.data)) {
    return false;
  }
  const practice = value.data.practice;
  if (practice !== undefined
    && (!isRecord(practice) || !Object.keys(practice).every((key) => isValidPracticeKey(moduleKey, key)))) {
    return false;
  }
  if (moduleKey === 'module4' && isRecord(practice) && practice.module4Enhanced !== undefined) {
    const enhanced = practice.module4Enhanced;
    if (!isRecord(enhanced)
      || enhanced.schemaVersion !== MODULE4_ENHANCED_SCHEMA_VERSION
      || enhanced.contentRevision !== MODULE4_ENHANCED_CONTENT_REVISION) return false;
  }
  if (moduleKey === 'module5' && isRecord(practice) && practice.module5Presentation !== undefined) {
    const presentation = practice.module5Presentation;
    if (!isRecord(presentation)
      || presentation.schemaVersion !== MODULE5_PRESENTATION_SCHEMA_VERSION
      || presentation.contentRevision !== MODULE5_PRESENTATION_CONTENT_REVISION) return false;
  }
  return true;
}

export function validateHrbaResumeState(value: unknown): HrbaResumeState | null {
  let serialized: string;
  try {
    serialized = JSON.stringify(value);
  } catch {
    return null;
  }
  if (new TextEncoder().encode(serialized).byteLength > HRBA_RESUME_MAX_BYTES
    || !isRecord(value)
    || !hasExactKeys(value, [
      'contractVersion', 'courseStateVersion', 'courseStructureRevision', 'baseRevision', 'navigation',
      'completedModuleIds', 'completedScreenIdsByModule', 'moduleState',
    ], ['assessmentDraft'])
    || value.contractVersion !== HRBA_RESUME_CONTRACT_VERSION
    || value.courseStateVersion !== HRBA_COURSE_STATE_VERSION
    || value.courseStructureRevision !== HRBA_COURSE_STRUCTURE_REVISION
    || !isValidRevision(value.baseRevision)
    || !isRecord(value.navigation)
    || !hasExactKeys(value.navigation, ['currentLayer', 'currentModuleId', 'currentScreenId'])
    || !['platform', 'player'].includes(String(value.navigation.currentLayer))) return null;

  const completed = value.completedModuleIds;
  if (!Array.isArray(completed)
    || completed.length > REQUIRED_HRBA_MODULE_IDS.length
    || !completed.every((moduleId, index) => moduleId === REQUIRED_HRBA_MODULE_IDS[index])) return null;

  const currentModuleId = value.navigation.currentModuleId;
  const currentScreenId = value.navigation.currentScreenId;
  if (currentModuleId !== null
    && (typeof currentModuleId !== 'string' || !Object.hasOwn(screenIdsByModule, currentModuleId))) return null;
  if (currentScreenId !== null
    && (typeof currentScreenId !== 'string'
      || typeof currentModuleId !== 'string'
      || !screenIdsByModule[currentModuleId]?.has(currentScreenId))) return null;

  if (!isRecord(value.completedScreenIdsByModule)
    || !Object.entries(value.completedScreenIdsByModule).every(([moduleId, screenIds]) => (
      REQUIRED_HRBA_MODULE_IDS.includes(moduleId as typeof REQUIRED_HRBA_MODULE_IDS[number])
      && Array.isArray(screenIds)
      && screenIds.length <= 100
      && new Set(screenIds).size === screenIds.length
      && screenIds.every((screenId) => typeof screenId === 'string' && screenIdsByModule[moduleId]?.has(screenId))
    ))) return null;
  const currentRequiredIndex = typeof currentModuleId === 'string'
    ? REQUIRED_HRBA_MODULE_IDS.indexOf(currentModuleId as typeof REQUIRED_HRBA_MODULE_IDS[number])
    : -1;
  if ((currentRequiredIndex >= 0 && currentRequiredIndex > completed.length)
    || (currentModuleId === 'final_assessment' && completed.length !== REQUIRED_HRBA_MODULE_IDS.length)
    || Object.keys(value.completedScreenIdsByModule).some((moduleId) => (
      REQUIRED_HRBA_MODULE_IDS.indexOf(moduleId as typeof REQUIRED_HRBA_MODULE_IDS[number]) > completed.length
    ))) return null;

  if (!isRecord(value.moduleState)) return null;
  const moduleState = value.moduleState;
  if (!hasExactKeys(moduleState, ['module1', 'module2', 'module3', 'module4', 'module5'])
    || !(['module1', 'module2', 'module3', 'module4', 'module5'] as const)
      .every((moduleKey) => validateModuleState(moduleKey, moduleState[moduleKey]))) return null;

  if (value.assessmentDraft !== undefined
    && (!isRecord(value.assessmentDraft)
      || !hasExactKeys(value.assessmentDraft, ['answers'])
      || !isRecord(value.assessmentDraft.answers)
      || Object.keys(value.assessmentDraft.answers).length > 20
      || !Object.entries(value.assessmentDraft.answers).every(([key, answer]) => (
        key.length > 0 && key.length <= 128 && typeof answer === 'string' && answer.length <= 256
      )))) return null;

  return JSON.parse(serialized) as HrbaResumeState;
}

function pickFields(state: LearningState, fields: readonly string[]) {
  const source = state as unknown as Record<string, unknown>;
  return Object.fromEntries(fields.map((field) => [field, structuredClone(source[field])])) as Record<string, ResumeJsonValue>;
}

function pickPractice(state: LearningState, moduleKey: HrbaResumeModuleKey) {
  return Object.fromEntries(
    Object.entries(state.practiceCheckState)
      .filter(([key]) => isValidPracticeKey(moduleKey, key))
      .map(([key, value]) => [key, structuredClone(value)]),
  ) as Record<string, ResumeJsonValue>;
}

export function serializeLearningStateForResume(state: LearningState, baseRevision: string | null): HrbaResumeState {
  const completedModuleIds = REQUIRED_HRBA_MODULE_IDS.filter((moduleId) => state.completedModules.includes(moduleId));
  const completedScreenIdsByModule = Object.fromEntries(
    REQUIRED_HRBA_MODULE_IDS.flatMap((moduleId) => {
      const allowed = screenIdsByModule[moduleId];
      const ids = [...new Set(state.screenProgress[moduleId] || [])].filter((screenId) => allowed.has(screenId));
      return ids.length > 0 ? [[moduleId, ids]] : [];
    }),
  );
  const result: HrbaResumeState = {
    contractVersion: HRBA_RESUME_CONTRACT_VERSION,
    courseStateVersion: HRBA_COURSE_STATE_VERSION,
    courseStructureRevision: HRBA_COURSE_STRUCTURE_REVISION,
    baseRevision,
    navigation: {
      currentLayer: state.currentLayer,
      currentModuleId: state.currentModuleId,
      currentScreenId: state.currentScreenId,
    },
    completedModuleIds,
    completedScreenIdsByModule,
    moduleState: {
      module1: { version: 1, data: { ...pickFields(state, module1Fields), practice: pickPractice(state, 'module1') } },
      module2: { version: 1, data: { ...pickFields(state, module2Fields), practice: pickPractice(state, 'module2') } },
      module3: { version: 1, data: { practice: pickPractice(state, 'module3') } },
      module4: { version: 1, data: { practice: pickPractice(state, 'module4') } },
      module5: { version: 1, data: { practice: pickPractice(state, 'module5') } },
    },
    ...(Object.keys(state.finalAssessmentAnswers).length > 0
      ? { assessmentDraft: { answers: structuredClone(state.finalAssessmentAnswers) } }
      : {}),
  };
  const validated = validateHrbaResumeState(result);
  if (!validated) throw new Error('Learning state could not be serialized for resume.');
  return validated;
}

function firstIncompleteScreen(moduleId: string, completedScreenIds: readonly string[]) {
  const allowed = screenIdsByModule[moduleId];
  if (!allowed) return null;
  return [...allowed].find((screenId) => !completedScreenIds.includes(screenId)) || [...allowed][0] || null;
}

function isCompatibleLegacyField(value: unknown, initialValue: unknown) {
  if (!isBoundedJson(value)) return false;
  if (Array.isArray(initialValue)) return Array.isArray(value);
  if (isRecord(initialValue)) return isRecord(value);
  return typeof value === typeof initialValue;
}

/**
 * Converts known historical browser state into the strict RESUME-2 contract.
 * It never mutates storage, never trusts client assessment/completion authority,
 * and reports only safe category/path diagnostics.
 */
export function migrateLegacyLearningState(
  value: unknown,
  baseRevision: string | null,
): LegacyResumeMigrationResult {
  const fail = (
    category: LegacyResumeMigrationIssue['category'],
    path: string,
  ): LegacyResumeMigrationResult => ({ ok: false, issues: [{ category, path }] });

  try {
    let serialized: string;
    try {
      serialized = JSON.stringify(value);
    } catch {
      return fail('invalid_payload', '$');
    }
    if (new TextEncoder().encode(serialized).byteLength > HRBA_RESUME_MAX_BYTES || !isRecord(value)) {
      return fail('invalid_payload', '$');
    }
    if (value.storageVersion !== undefined && value.storageVersion !== HRBA_COURSE_STATE_VERSION) {
      return fail('unsupported_storage_version', 'storageVersion');
    }

    const rawCompleted = value.completedModules;
    if (!Array.isArray(rawCompleted) || !rawCompleted.every((moduleId) => typeof moduleId === 'string')) {
      return fail('invalid_completed_modules', 'completedModules');
    }
    if (rawCompleted.some((moduleId) => moduleId === 'final_assessment'
      || !REQUIRED_HRBA_MODULE_IDS.includes(moduleId as typeof REQUIRED_HRBA_MODULE_IDS[number]))) {
      return fail('invalid_completed_modules', 'completedModules');
    }
    const completedModuleIds = [...new Set(rawCompleted)];
    if (completedModuleIds.some((moduleId, index) => moduleId !== REQUIRED_HRBA_MODULE_IDS[index])) {
      return fail('prerequisite_jump', 'completedModules');
    }

    if (value.screenProgress !== undefined && !isRecord(value.screenProgress)) {
      return fail('invalid_module_state', 'screenProgress');
    }
    const warnings: LegacyResumeMigrationIssue[] = [];
    const screenProgress: Record<string, string[]> = {};
    for (const [moduleId, rawScreenIds] of Object.entries(isRecord(value.screenProgress) ? value.screenProgress : {})) {
      const moduleIndex = REQUIRED_HRBA_MODULE_IDS.indexOf(moduleId as typeof REQUIRED_HRBA_MODULE_IDS[number]);
      if (moduleId === 'final_assessment') {
        warnings.push({ category: 'invalid_module_state', path: 'screenProgress.final_assessment' });
        continue;
      }
      if (moduleIndex < 0) {
        warnings.push({ category: 'invalid_module_state', path: 'screenProgress.unknown' });
        continue;
      }
      if (moduleIndex > completedModuleIds.length) {
        return fail('prerequisite_jump', 'screenProgress');
      }
      if (!Array.isArray(rawScreenIds) || !rawScreenIds.every((screenId) => typeof screenId === 'string')) {
        return fail('invalid_module_state', 'screenProgress');
      }
      const allowed = screenIdsByModule[moduleId];
      const canonical = [...new Set(rawScreenIds)].filter((screenId) => allowed.has(screenId));
      if (canonical.length !== new Set(rawScreenIds).size) {
        warnings.push({ category: 'invalid_module_state', path: 'screenProgress.screenId' });
      }
      if (canonical.length > 0) screenProgress[moduleId] = canonical;
    }

    if (value.practiceCheckState !== undefined && !isRecord(value.practiceCheckState)) {
      return fail('invalid_module_state', 'practiceCheckState');
    }
    const practiceCheckState: Record<string, unknown> = {};
    for (const [key, practiceValue] of Object.entries(
      isRecord(value.practiceCheckState) ? value.practiceCheckState : {},
    )) {
      const moduleKey = getPracticeModuleKey(key);
      if (!moduleKey) {
        warnings.push({ category: 'invalid_module_state', path: 'practiceCheckState.unknown' });
        continue;
      }
      const moduleIndex = (['module1', 'module2', 'module3', 'module4', 'module5'] as const).indexOf(moduleKey);
      if (moduleIndex > completedModuleIds.length) {
        warnings.push({ category: 'invalid_module_state', path: `practiceCheckState.${moduleKey}` });
        continue;
      }
      if (!isBoundedJson(practiceValue)) {
        return fail('invalid_module_state', `practiceCheckState.${moduleKey}`);
      }
      practiceCheckState[key] = structuredClone(practiceValue);
    }

    const candidate = structuredClone(initialLearningState);
    const source = value as Record<string, unknown>;
    let hasFieldEvidence = false;
    for (const field of [...module1Fields, ...module2Fields]) {
      if (!Object.hasOwn(source, field)) continue;
      const initialValue = (initialLearningState as unknown as Record<string, unknown>)[field];
      if (!isCompatibleLegacyField(source[field], initialValue)) {
        return fail('invalid_module_state', `moduleState.${field}`);
      }
      (candidate as unknown as Record<string, unknown>)[field] = structuredClone(source[field]);
      if (JSON.stringify(source[field]) !== JSON.stringify(initialValue)) hasFieldEvidence = true;
    }
    candidate.completedModules = completedModuleIds;
    candidate.screenProgress = screenProgress;
    candidate.practiceCheckState = practiceCheckState;
    candidate.finalAssessmentAnswers = {};
    candidate.finalAssessmentResult = null;
    candidate.finalAssessmentAttemptNumber = 0;

    const rawCurrentModuleId = value.currentModuleId;
    const rawCurrentScreenId = value.currentScreenId;
    const currentModuleIndex = typeof rawCurrentModuleId === 'string'
      ? REQUIRED_HRBA_MODULE_IDS.indexOf(rawCurrentModuleId as typeof REQUIRED_HRBA_MODULE_IDS[number])
      : -1;
    const currentIsEligibleAssessment = rawCurrentModuleId === 'final_assessment'
      && completedModuleIds.length === REQUIRED_HRBA_MODULE_IDS.length;
    if ((rawCurrentModuleId === 'final_assessment' && !currentIsEligibleAssessment)
      || (currentModuleIndex >= 0 && currentModuleIndex > completedModuleIds.length)) {
      return fail('prerequisite_jump', 'navigation.currentModuleId');
    }

    const hasLegacyEvidence = currentModuleIndex >= 0
      || currentIsEligibleAssessment
      || completedModuleIds.length > 0
      || Object.keys(screenProgress).length > 0
      || Object.keys(practiceCheckState).length > 0
      || hasFieldEvidence;
    if (!hasLegacyEvidence) {
      const learningState = structuredClone(initialLearningState);
      return {
        ok: true,
        learningState,
        resumeState: serializeLearningStateForResume(learningState, baseRevision),
        meaningful: false,
        warnings,
      };
    }

    const hasProgressEvidence = completedModuleIds.length > 0
      || Object.keys(screenProgress).length > 0
      || Object.keys(practiceCheckState).length > 0;
    const fallbackModuleId = (typeof rawCurrentModuleId === 'string' || hasProgressEvidence)
      ? REQUIRED_HRBA_MODULE_IDS[completedModuleIds.length] || null
      : null;
    const currentModuleId = currentIsEligibleAssessment
      ? 'final_assessment'
      : currentModuleIndex >= 0 ? rawCurrentModuleId as string : fallbackModuleId;
    const completedScreens = currentModuleId ? screenProgress[currentModuleId] || [] : [];
    const currentScreenValid = typeof rawCurrentScreenId === 'string'
      && Boolean(currentModuleId && screenIdsByModule[currentModuleId]?.has(rawCurrentScreenId));
    candidate.currentModuleId = currentModuleId;
    candidate.currentScreenId = currentScreenValid
      ? rawCurrentScreenId as string
      : currentModuleId ? firstIncompleteScreen(currentModuleId, completedScreens) : null;
    candidate.currentLayer = value.currentLayer === 'platform' || value.currentLayer === 'player'
      ? value.currentLayer
      : currentModuleId ? 'player' : 'platform';
    if (rawCurrentModuleId !== currentModuleId || rawCurrentScreenId !== candidate.currentScreenId) {
      warnings.push({ category: 'invalid_navigation', path: 'navigation' });
    }
    if (value.currentLayer !== undefined
      && value.currentLayer !== 'platform'
      && value.currentLayer !== 'player') {
      warnings.push({ category: 'invalid_navigation', path: 'navigation.currentLayer' });
    }

    const migrated = validateLearningState(candidate, true);
    if (!migrated) return fail('invalid_module_state', '$');
    migrated.finalAssessmentAnswers = {};
    migrated.finalAssessmentResult = null;
    migrated.finalAssessmentAttemptNumber = 0;

    let resumeState: HrbaResumeState;
    try {
      resumeState = serializeLearningStateForResume(migrated, baseRevision);
    } catch {
      return fail('serialization_failed', '$');
    }
    const initialSignature = getResumeContentSignature(serializeLearningStateForResume(initialLearningState, null));
    return {
      ok: true,
      learningState: migrated,
      resumeState,
      meaningful: getResumeContentSignature(resumeState) !== initialSignature,
      warnings,
    };
  } catch {
    return fail('serialization_failed', '$');
  }
}

export function hydrateLearningStateFromResume(
  resumeState: HrbaResumeState,
  trustedAssessmentState: TrustedAssessmentState,
) {
  const candidate = structuredClone(initialLearningState);
  const module1 = resumeState.moduleState.module1.data;
  const module2 = resumeState.moduleState.module2.data;
  Object.assign(candidate, Object.fromEntries(Object.entries(module1).filter(([key]) => key !== 'practice')));
  Object.assign(candidate, Object.fromEntries(Object.entries(module2).filter(([key]) => key !== 'practice')));
  candidate.practiceCheckState = {
    ...(module1.practice as Record<string, unknown> || {}),
    ...(module2.practice as Record<string, unknown> || {}),
    ...(resumeState.moduleState.module3.data.practice as Record<string, unknown> || {}),
    ...(resumeState.moduleState.module4.data.practice as Record<string, unknown> || {}),
    ...(resumeState.moduleState.module5.data.practice as Record<string, unknown> || {}),
  };
  candidate.currentLayer = resumeState.navigation.currentLayer;
  candidate.currentModuleId = resumeState.navigation.currentModuleId;
  candidate.currentScreenId = resumeState.navigation.currentScreenId;
  candidate.completedModules = [...resumeState.completedModuleIds];
  candidate.screenProgress = structuredClone(resumeState.completedScreenIdsByModule);
  candidate.finalAssessmentAnswers = structuredClone(resumeState.assessmentDraft?.answers || {});
  candidate.finalAssessmentAttemptNumber = trustedAssessmentState?.attemptNumber || 0;
  candidate.finalAssessmentResult = trustedAssessmentState;
  if (trustedAssessmentState) {
    candidate.currentLayer = 'player';
    candidate.currentModuleId = 'final_assessment';
    candidate.currentScreenId = 'FINAL-ASSESSMENT-COMPLETE';
  }
  if (trustedAssessmentState?.passed) {
    candidate.completedModules.push('final_assessment');
    candidate.screenProgress.final_assessment = ['FINAL-ASSESSMENT-COMPLETE'];
  }
  return validateLearningState(candidate, true) || structuredClone(initialLearningState);
}

export function getResumeContentSignature(state: HrbaResumeState) {
  return JSON.stringify({ ...state, baseRevision: null });
}

export function isMeaningfulLearningState(state: LearningState) {
  const initial = serializeLearningStateForResume(initialLearningState, null);
  return getResumeContentSignature(serializeLearningStateForResume(state, null))
    !== getResumeContentSignature(initial);
}
