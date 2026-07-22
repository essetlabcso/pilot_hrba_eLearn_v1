export const MODULE5_ID = 'module_05_hrba_meal';

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
  if (!hasLegacy && !hasNew && progress.length === 0 && !completed) return practice;

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
  return practice;
}

export type DownloadCanvasField = { label: string; value: string; sourceLabel: string };

export function buildModule5DownloadText(
  fields: DownloadCanvasField[],
  plan: { adaptation: string; responsibility: string; nearTermAction: string; followUp: string },
) {
  return [
    'HRBA MEAL, ACCOUNTABILITY AND ADAPTATION CANVAS',
    'Generalized learning output. Review before sharing and keep it in an approved, access-controlled location.',
    '',
    ...fields.map((field) => `${field.label}: ${field.value || 'Not yet completed'}\nSource: ${field.sourceLabel}`),
    '',
    '90-DAY LEARNING AND ACCOUNT-BACK PLAN',
    `Final adaptation decision: ${plan.adaptation || 'Not yet completed'}`,
    `Responsible role or institution: ${plan.responsibility || 'Not yet completed'}`,
    `Near-term action: ${plan.nearTermAction || 'Not yet completed'}`,
    `Follow-up evidence and review: ${plan.followUp || 'Not yet completed'}`,
  ].join('\n');
}
