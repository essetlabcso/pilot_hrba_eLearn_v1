import {
  MODULE5_BATCH1_PRESENTATION_SCREEN_IDS,
  MODULE5_PRESENTATION_CONTENT_REVISION,
  MODULE5_PRESENTATION_SCHEMA_VERSION,
} from './module5PresentationContent.ts';

export const MODULE5_ID = 'module_05_hrba_meal';
export const MODULE5_COMPLETION_SCREEN_TITLE = 'Portfolio Review and Module Closure';

export const MODULE5_CANONICAL_SCREEN_IDS = [
  'M5-R01', 'M5-R02', 'M5-R03', 'M5-R04', 'M5-R05', 'M5-R06', 'M5-R07',
  'M5-R08', 'M5-R09', 'M5-R10', 'M5-R11', 'M5-R12', 'M5-R13', 'M5-R14',
  'M5-PLAYER-COMPLETE',
] as const;

export type Module5CanonicalScreenId = typeof MODULE5_CANONICAL_SCREEN_IDS[number];

export const MODULE5_SCREEN_ROUTES: Record<string, string> = {
  'M5-PLAYER-00': '/module-5/cover',
  'M5-R01': '/module-5/screen-5-1',
  'M5-R02': '/module-5/screen-5-2',
  'M5-R03': '/module-5/screen-5-3',
  'M5-R04': '/module-5/screen-5-4',
  'M5-R05': '/module-5/screen-5-5',
  'M5-R06': '/module-5/screen-5-6',
  'M5-R07': '/module-5/screen-5-7',
  'M5-R08': '/module-5/screen-5-8',
  'M5-R09': '/module-5/screen-5-9',
  'M5-R10': '/module-5/screen-5-10',
  'M5-R11': '/module-5/screen-5-11',
  'M5-R12': '/module-5/screen-5-12',
  'M5-R13': '/module-5/screen-5-13',
  'M5-R14': '/module-5/screen-5-14',
  'M5-PLAYER-COMPLETE': '/module-5/complete',
};

const LEGACY_ID_MAP: Record<string, Module5CanonicalScreenId> = {
  'M5-S1-01': 'M5-R01',
  'M5-S1-02': 'M5-R02',
  'M5-S1-03': 'M5-R03',
  'M5-S1-04': 'M5-R04',
  'M5-S1-05': 'M5-R05',
  'M5-S1-06': 'M5-R06',
  'M5-S1-07': 'M5-R07',
  'M5-S1-07A': 'M5-R07',
  'M5-S1-07B': 'M5-R07',
  'M5-S1-07C': 'M5-R07',
  'M5-S1-08': 'M5-R08',
  'M5-S1-09': 'M5-R09',
  'M5-S1-09A': 'M5-R07',
  'M5-S1-09B': 'M5-R07',
  'M5-S1-09C': 'M5-R07',
  'M5-S1-09D': 'M5-R07',
  'M5-S1-10': 'M5-R10',
  'M5-S1-11': 'M5-R11',
  'M5-S1-12': 'M5-R12',
  'M5-S1-13': 'M5-R13',
  'M5-S1-14': 'M5-R14',
  'M5-S1-15': 'M5-R14',
  'M5-S1-15A': 'M5-R11',
  'M5-S1-16': 'M5-R12',
  'M5-S1-17': 'M5-R12',
  'M5-S1-18': 'M5-R13',
  'M5-S1-19': 'M5-R13',
  'M5-S1-20': 'M5-R14',
  'M5-S1-21': 'M5-R14',
  'M5-S1-22': 'M5-R14',
  'M5-S1-23': 'M5-R14',
  'M5-S1-24': 'M5-R14',
  'M5-S1-25': 'M5-R14',
};

export const MODULE5_LEGACY_ID_MAP = Object.freeze({ ...LEGACY_ID_MAP });

export function canonicalizeModule5ScreenId(screenId: string | null | undefined): Module5CanonicalScreenId | 'M5-PLAYER-00' {
  if (screenId === 'M5-PLAYER-00') return screenId;
  if ((MODULE5_CANONICAL_SCREEN_IDS as readonly string[]).includes(String(screenId))) {
    return screenId as Module5CanonicalScreenId;
  }
  return LEGACY_ID_MAP[String(screenId)] || 'M5-R01';
}

export function getAllowedModule5ScreenId(
  requestedId: string,
  completedScreenIds: string[],
  moduleCompleted = false,
) {
  const canonicalId = canonicalizeModule5ScreenId(requestedId);
  if (canonicalId === 'M5-PLAYER-00') return canonicalId;
  if (moduleCompleted) return canonicalId;
  const requestedIndex = MODULE5_CANONICAL_SCREEN_IDS.indexOf(canonicalId);
  if (requestedIndex <= 0) return canonicalId;
  const completed = new Set(completedScreenIds.map((id) => canonicalizeModule5ScreenId(id)));
  if (MODULE5_CANONICAL_SCREEN_IDS.slice(0, requestedIndex).every((id) => completed.has(id))) return canonicalId;
  return MODULE5_CANONICAL_SCREEN_IDS.find((id) => !completed.has(id)) || 'M5-PLAYER-COMPLETE';
}

type RecordValue = Record<string, unknown>;

function isRecord(value: unknown): value is RecordValue {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export type Module5PresentationReflectionValue = string | string[];

export type Module5PresentationScreenState = {
  answers: Record<string, string[]>;
  checkedIds: string[];
  correctIds: string[];
  reflectionValues: Record<string, Module5PresentationReflectionValue>;
  reflectionDetails: Record<string, string>;
  reflectionRevision: number;
  gateSatisfied: boolean;
  status: 'in_progress' | 'completed' | 'needs_review';
  completedAt: string | null;
  updatedAt: string | null;
};

export type Module5PresentationState = {
  schemaVersion: number;
  contentRevision: string;
  migration: {
    appliedVersion: number;
    legacyWorkspacePresent: boolean;
    historicalCompletionPreserved: boolean;
  };
  screens: Record<string, Module5PresentationScreenState>;
  summary: {
    values: Record<string, string>;
    provenance: Record<string, { screenId: string; reflectionId: string; revision: number }>;
    dependencyRevisions: Record<string, number>;
    reviewRequiredFields: string[];
    confirmed: boolean;
  };
  finalKnowledgeCheck: {
    revision: string;
    answers: Record<string, string[]>;
    correctIds: string[];
    retryIds: string[];
    passed: boolean;
    passedAt: string | null;
  };
  finalConfirmation: {
    summaryReviewed: boolean;
    peerSupportReviewed: boolean;
    readyToComplete: boolean;
  };
};

export function createEmptyModule5PresentationScreenState(): Module5PresentationScreenState {
  return {
    answers: {},
    checkedIds: [],
    correctIds: [],
    reflectionValues: {},
    reflectionDetails: {},
    reflectionRevision: 0,
    gateSatisfied: false,
    status: 'in_progress',
    completedAt: null,
    updatedAt: null,
  };
}

export function createEmptyModule5PresentationState(
  legacyWorkspacePresent = false,
  historicalCompletionPreserved = false,
): Module5PresentationState {
  return {
    schemaVersion: MODULE5_PRESENTATION_SCHEMA_VERSION,
    contentRevision: MODULE5_PRESENTATION_CONTENT_REVISION,
    migration: {
      appliedVersion: MODULE5_PRESENTATION_SCHEMA_VERSION,
      legacyWorkspacePresent,
      historicalCompletionPreserved,
    },
    screens: {},
    summary: {
      values: {},
      provenance: {},
      dependencyRevisions: {},
      reviewRequiredFields: [],
      confirmed: false,
    },
    finalKnowledgeCheck: {
      revision: 'pending-content-approval',
      answers: {},
      correctIds: [],
      retryIds: [],
      passed: false,
      passedAt: null,
    },
    finalConfirmation: {
      summaryReviewed: false,
      peerSupportReviewed: false,
      readyToComplete: false,
    },
  };
}

function normalizeStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function normalizePresentationScreenState(value: unknown, invalidateGate: boolean): Module5PresentationScreenState {
  const source = isRecord(value) ? value : {};
  const reflectionValues = isRecord(source.reflectionValues)
    ? Object.entries(source.reflectionValues).reduce<Record<string, Module5PresentationReflectionValue>>((result, [id, item]) => {
      if (typeof item === 'string') result[id] = item;
      if (Array.isArray(item) && item.every((part) => typeof part === 'string')) result[id] = item as string[];
      return result;
    }, {})
    : {};
  const answers = isRecord(source.answers)
    ? Object.fromEntries(Object.entries(source.answers).map(([id, answer]) => [id, normalizeStringArray(answer)]))
    : {};
  return {
    answers,
    checkedIds: invalidateGate ? [] : normalizeStringArray(source.checkedIds),
    correctIds: invalidateGate ? [] : normalizeStringArray(source.correctIds),
    reflectionValues,
    reflectionDetails: isRecord(source.reflectionDetails)
      ? Object.entries(source.reflectionDetails).reduce<Record<string, string>>((result, [id, item]) => {
        if (typeof item === 'string') result[id] = item;
        return result;
      }, {})
      : {},
    reflectionRevision: typeof source.reflectionRevision === 'number' ? source.reflectionRevision : 0,
    gateSatisfied: invalidateGate ? false : source.gateSatisfied === true,
    status: invalidateGate ? 'needs_review' : source.status === 'completed' ? 'completed' : source.status === 'needs_review' ? 'needs_review' : 'in_progress',
    completedAt: invalidateGate ? null : typeof source.completedAt === 'string' ? source.completedAt : null,
    updatedAt: typeof source.updatedAt === 'string' ? source.updatedAt : null,
  };
}

export function ensureModule5PresentationState(
  practiceCheckState: Record<string, unknown>,
  completedModules: unknown,
) {
  const completed = Array.isArray(completedModules) && completedModules.includes(MODULE5_ID);
  const legacyWorkspacePresent = Object.keys(practiceCheckState).some((key) =>
    (key.startsWith('module5') && key !== 'module5Presentation') ||
    /^m5_s(?:0[2-9]|1[0-6])$/.test(key));
  const current = isRecord(practiceCheckState.module5Presentation)
    ? practiceCheckState.module5Presentation
    : null;
  if (!current) return createEmptyModule5PresentationState(legacyWorkspacePresent, completed);

  const revisionChanged = current.contentRevision !== MODULE5_PRESENTATION_CONTENT_REVISION;
  const invalidateGate = revisionChanged && !completed;
  const currentScreens = isRecord(current.screens) ? current.screens : {};
  const screens = Object.fromEntries(
    Object.entries(currentScreens).map(([screenId, screen]) => [
      screenId,
      normalizePresentationScreenState(screen, invalidateGate),
    ]),
  );
  const base = createEmptyModule5PresentationState(legacyWorkspacePresent, completed);
  const currentSummary = isRecord(current.summary) ? current.summary : {};
  const summaryValues = isRecord(currentSummary.values)
    ? Object.fromEntries(Object.entries(currentSummary.values).filter(([, item]) => typeof item === 'string'))
    : {};
  const summaryProvenance = isRecord(currentSummary.provenance)
    ? currentSummary.provenance as Module5PresentationState['summary']['provenance']
    : {};
  const dependencyRevisions = isRecord(currentSummary.dependencyRevisions)
    ? Object.fromEntries(Object.entries(currentSummary.dependencyRevisions).filter(([, item]) => typeof item === 'number')) as Record<string, number>
    : {};

  return {
    ...base,
    migration: {
      ...base.migration,
      ...(isRecord(current.migration) ? current.migration : {}),
      appliedVersion: MODULE5_PRESENTATION_SCHEMA_VERSION,
      legacyWorkspacePresent,
      historicalCompletionPreserved: completed || (isRecord(current.migration) && current.migration.historicalCompletionPreserved === true),
    },
    screens,
    summary: {
      values: summaryValues,
      provenance: summaryProvenance,
      dependencyRevisions: invalidateGate ? {} : dependencyRevisions,
      reviewRequiredFields: invalidateGate
        ? Object.keys(summaryValues)
        : normalizeStringArray(currentSummary.reviewRequiredFields),
      confirmed: invalidateGate ? false : currentSummary.confirmed === true,
    },
    finalKnowledgeCheck: invalidateGate ? base.finalKnowledgeCheck : {
      ...base.finalKnowledgeCheck,
      ...(isRecord(current.finalKnowledgeCheck) ? current.finalKnowledgeCheck : {}),
    } as Module5PresentationState['finalKnowledgeCheck'],
    finalConfirmation: invalidateGate ? base.finalConfirmation : {
      ...base.finalConfirmation,
      ...(isRecord(current.finalConfirmation) ? current.finalConfirmation : {}),
    } as Module5PresentationState['finalConfirmation'],
  };
}

export function getModule5PresentationState(practiceCheckState: unknown) {
  if (!isRecord(practiceCheckState) || !isRecord(practiceCheckState.module5Presentation)) return null;
  return practiceCheckState.module5Presentation as unknown as Module5PresentationState;
}

export function migrateModule5PresentationScreenProgress(input: Module5MigrationInput) {
  const progressMap = isRecord(input.screenProgress) ? { ...input.screenProgress } : {};
  const completed = Array.isArray(input.completedModules) && input.completedModules.includes(MODULE5_ID);
  if (completed) return progressMap;
  const practice = isRecord(input.practiceCheckState) ? input.practiceCheckState : {};
  const current = isRecord(practice.module5Presentation) ? practice.module5Presentation : null;
  if (current?.contentRevision === MODULE5_PRESENTATION_CONTENT_REVISION) return progressMap;
  const moduleProgress = Array.isArray(progressMap[MODULE5_ID])
    ? progressMap[MODULE5_ID].filter((id) =>
      typeof id === 'string' && !(MODULE5_BATCH1_PRESENTATION_SCREEN_IDS as readonly string[]).includes(canonicalizeModule5ScreenId(id)))
    : [];
  if (Array.isArray(progressMap[MODULE5_ID])) progressMap[MODULE5_ID] = moduleProgress;
  return progressMap;
}

const NEW_TO_RELEASE_LEGACY: Record<string, string> = {
  m5_s02: 'module5IntroVideo',
  m5_s03: 'module5LearningObjectives',
  m5_s04: 'module5_m5_r03',
  m5_s05: 'module5_m5_r04',
  m5_s06: 'module5_m5_r05',
  m5_s07: 'module5_m5_r06',
  m5_s08: 'module5_m5_r07',
  m5_s09: 'module5_m5_r08',
  m5_s10: 'module5_m5_r09',
  m5_s11: 'module5_m5_r10',
  m5_s12: 'module5_m5_r11',
  m5_s13: 'module5_m5_r12',
  m5_s14: 'module5_m5_r12',
  m5_s15: 'module5_m5_r13',
  m5_s16: 'module5_m5_r14',
};

export const MODULE5_STATE_MIGRATION_MAP = Object.freeze({ ...NEW_TO_RELEASE_LEGACY });

function recoverText(source: RecordValue) {
  for (const key of ['repairNoteText', 'commitmentText']) {
    if (typeof source[key] === 'string' && source[key].trim()) return source[key].trim();
  }
  return '';
}

function recoveredSelectionCount(source: RecordValue) {
  const candidates = [source.answers, source.selected, source.selectedIds, source.reviewedObjectives];
  return candidates.reduce<number>((count, value) => {
    if (Array.isArray(value)) return count + value.length;
    if (isRecord(value)) return count + Object.values(value).filter(Boolean).length;
    return count;
  }, 0);
}

export type Module5MigrationInput = {
  practiceCheckState: unknown;
  screenProgress: unknown;
  completedModules: unknown;
};

export function migrateModule5PracticeState(input: Module5MigrationInput) {
  const practice = isRecord(input.practiceCheckState) ? { ...input.practiceCheckState } : {};
  const progress = isRecord(input.screenProgress) && Array.isArray(input.screenProgress[MODULE5_ID])
    ? input.screenProgress[MODULE5_ID] as unknown[]
    : [];
  const completed = Array.isArray(input.completedModules) && input.completedModules.includes(MODULE5_ID);
  const hasLegacy = Object.keys(practice).some((key) => key.startsWith('module5'));
  const hasNew = Object.keys(practice).some((key) => /^m5_s(?:0[2-9]|1[0-6])$/.test(key));
  const hasPresentationState = isRecord(practice.module5Presentation);
  if (!hasLegacy && !hasNew && !hasPresentationState && progress.length === 0 && !completed) return practice;

  Object.entries(NEW_TO_RELEASE_LEGACY).forEach(([targetKey, sourceKey]) => {
    if (isRecord(practice[targetKey])) return;
    const source = isRecord(practice[sourceKey]) ? practice[sourceKey] as RecordValue : null;
    if (!source) return;
    const recoveredText = recoverText(source);
    practice[targetKey] = {
      schemaVersion: 2,
      status: completed && targetKey === 'm5_s16' ? 'completed' : 'needs_review',
      migration: {
        sourceKey,
        reviewRequired: !completed,
        recoveredSelectionCount: recoveredSelectionCount(source),
        ...(recoveredText ? { recoveredText } : {}),
      },
      ...(targetKey === 'm5_s15' && recoveredText ? { recoveredLearningNote: recoveredText } : {}),
      ...(targetKey === 'm5_s16' && recoveredText ? { recoveredPlanSummary: recoveredText } : {}),
      ...(completed && targetKey === 'm5_s16' ? { legacyCompletionPreserved: true } : {}),
    };
  });
  practice.module5Presentation = ensureModule5PresentationState(practice, input.completedModules);
  return practice;
}

export type DownloadCanvasField = { label: string; value: string; sourceLabel: string };

export function containsPotentiallySensitiveModule5Text(value: string) {
  const text = value.toLowerCase();
  return /\b(name|phone|email|diagnos|survivor|child|complainant|accus|village|kebele|address)\b/.test(text) ||
    /\b\d{3}[- .]?\d{3}[- .]?\d{3,4}\b/.test(text) ||
    /@[a-z0-9.-]+\.[a-z]{2,}/.test(text);
}

export function isModule5OutputReady(
  values: Record<string, string>,
  requiredKeys: readonly string[],
  confirmations: readonly boolean[],
) {
  return requiredKeys.every((key) => String(values[key] || '').trim()) &&
    !Object.values(values).some(containsPotentiallySensitiveModule5Text) &&
    confirmations.every(Boolean);
}

export const MODULE5_SCREEN13_DEPENDENT_CANVAS_FIELDS = ['adaptation', 'followup'] as const;
export const MODULE5_SCREEN13_DEPENDENT_PLAN_FIELDS = ['days90', 'trigger'] as const;

export function isModule5CurrentScreenReady(taskComplete: boolean, allReviewed: boolean) {
  return taskComplete && allReviewed;
}

export function areModule5Screen13DependenciesReady(values: Record<string, string>) {
  return MODULE5_SCREEN13_DEPENDENT_CANVAS_FIELDS.every((field) => {
    const value = String(values[field] || '').trim();
    return Boolean(value) && !containsPotentiallySensitiveModule5Text(value);
  });
}

export function isModule5Screen13CarryForwardReady(values: Record<string, string>, status: unknown) {
  return status === 'completed' && areModule5Screen13DependenciesReady(values);
}

export function moveModule5Order(items: readonly string[], index: number, direction: -1 | 1) {
  const target = index + direction;
  if (index < 0 || index >= items.length || target < 0 || target >= items.length) return [...items];
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function isModule5OrderCorrect(items: readonly string[], correctOrder: readonly string[]) {
  return items.length === correctOrder.length && items.every((item, index) => item === correctOrder[index]);
}

export function isModule5BuilderReady(values: Record<string, string>, requiredKeys: readonly string[]) {
  return requiredKeys.every((key) => String(values[key] || '').trim()) &&
    !requiredKeys.some((key) => containsPotentiallySensitiveModule5Text(String(values[key] || '')));
}

export function invalidateModule5Screen13Dependents(practiceCheckState: Record<string, unknown>) {
  const next = { ...practiceCheckState };
  const canvas = isRecord(next.m5_s15) ? next.m5_s15 : null;
  const finalPlan = isRecord(next.m5_s16) ? next.m5_s16 : null;
  if (canvas) {
    const fields = isRecord(canvas.fields) ? canvas.fields : {};
    next.m5_s15 = {
      ...canvas,
      fields: {
        ...fields,
        ...Object.fromEntries(MODULE5_SCREEN13_DEPENDENT_CANVAS_FIELDS.map((field) => [field, ''])),
      },
      status: 'needs_review',
      previewReviewed: false,
      confirmedSafe: false,
      dependencyReview: {
        sourceScreenId: 'M5-R12',
        fields: [...MODULE5_SCREEN13_DEPENDENT_CANVAS_FIELDS],
        reason: 'upstream_changed',
      },
    };
  }
  if (finalPlan) {
    const plan = isRecord(finalPlan.plan) ? finalPlan.plan : {};
    next.m5_s16 = {
      ...finalPlan,
      plan: {
        ...plan,
        ...Object.fromEntries(MODULE5_SCREEN13_DEPENDENT_PLAN_FIELDS.map((field) => [field, ''])),
      },
      status: 'needs_review',
      dashboardReviewed: false,
      carryReviewed: false,
      confirmedSafe: false,
      dependencyReview: {
        sourceScreenId: 'M5-R12',
        reason: 'upstream_changed',
      },
    };
  }
  return next;
}

export function mergeModule5CanvasFields(
  projected: Record<string, string>,
  stored: Record<string, string>,
  dependencyFields: readonly string[] = [],
) {
  const next = { ...projected, ...stored };
  dependencyFields.forEach((field) => {
    next[field] = projected[field] || '';
  });
  return next;
}

export function refreshModule5PlanFromCanvas(plan: Record<string, string>, canvas: Record<string, string>) {
  return {
    ...plan,
    days90: canvas.adaptation || '',
    trigger: canvas.adaptation || '',
    ...(canvas.followup ? { learningNote: plan.learningNote || canvas.followup } : {}),
  };
}

export function buildModule5DownloadText(
  fields: DownloadCanvasField[],
  plan: Record<string, string>,
) {
  return [
    'HRBA MEAL, ACCOUNTABILITY AND ADAPTATION CANVAS',
    'Generalized learning output. Review before sharing and keep it in an approved, access-controlled location.',
    '',
    ...fields.map((field) => `${field.label}: ${field.value || 'Not yet completed'}\nSource: ${field.sourceLabel}`),
    '',
    '90-DAY LEARNING AND ACCOUNT-BACK PLAN',
    `Days 1–30 — Prepare: ${plan.days30 || plan.nearTermAction || 'Not yet completed'}`,
    `Days 31–60 — Test and interpret: ${plan.days60 || plan.adaptation || 'Not yet completed'}`,
    `Days 61–90 — Act and account back: ${plan.days90 || plan.followUp || 'Not yet completed'}`,
    `Rights-holder participation method: ${plan.participation || 'Not yet completed'}`,
    `Decision trigger: ${plan.trigger || 'Not yet completed'}`,
    `Accessible or low-bandwidth communication route: ${plan.communication || 'Not yet completed'}`,
    `Responsible role or institution: ${plan.referral || plan.responsibility || 'Not yet completed'}`,
    `Risk or stop condition: ${plan.stopCondition || 'Not yet completed'}`,
    `General review date: ${plan.reviewDate || 'Not yet completed'}`,
    `Learning note: ${plan.learningNote || 'Not yet completed'}`,
  ].join('\n');
}
