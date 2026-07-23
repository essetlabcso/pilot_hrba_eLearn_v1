export const REQUIRED_HRBA_MODULE_IDS = [
  'module_01_hrba_foundations',
  'module_02_everyday_cso_work',
  'module_03_project_design',
  'module_04_implementation',
  'module_05_hrba_meal',
] as const;

export const FINAL_ASSESSMENT_MODULE_ID = 'final_assessment';

export function hasFinalAssessmentPrerequisites(completedModules: readonly string[]) {
  const completed = new Set(completedModules);
  return REQUIRED_HRBA_MODULE_IDS.every((moduleId) => completed.has(moduleId));
}

export function canAccessCourseModule(moduleId: string, completedModules: readonly string[]) {
  if (moduleId === REQUIRED_HRBA_MODULE_IDS[0]) return true;

  const orderedModuleIds = [...REQUIRED_HRBA_MODULE_IDS, FINAL_ASSESSMENT_MODULE_ID];
  const requestedIndex = orderedModuleIds.indexOf(moduleId);
  if (requestedIndex < 0) return false;

  return orderedModuleIds
    .slice(0, requestedIndex)
    .every((requiredModuleId) => completedModules.includes(requiredModuleId));
}

type FinalAssessmentState = {
  completedModules: string[];
  currentLayer: 'platform' | 'player';
  currentModuleId: string | null;
  currentScreenId: string | null;
  finalAssessmentAnswers: Record<string, string>;
  finalAssessmentResult: unknown | null;
  screenProgress: Record<string, string[]>;
};

export function enforceFinalAssessmentPrerequisites<T extends FinalAssessmentState>(state: T): T {
  if (hasFinalAssessmentPrerequisites(state.completedModules)) return state;

  const hasAssessmentState =
    state.currentModuleId === FINAL_ASSESSMENT_MODULE_ID ||
    state.completedModules.includes(FINAL_ASSESSMENT_MODULE_ID) ||
    Object.keys(state.finalAssessmentAnswers).length > 0 ||
    state.finalAssessmentResult !== null ||
    (state.screenProgress[FINAL_ASSESSMENT_MODULE_ID] || []).length > 0;

  if (!hasAssessmentState) return state;

  const assessmentIsActive = state.currentModuleId === FINAL_ASSESSMENT_MODULE_ID;

  return {
    ...state,
    completedModules: state.completedModules.filter((moduleId) => moduleId !== FINAL_ASSESSMENT_MODULE_ID),
    currentLayer: assessmentIsActive ? 'platform' : state.currentLayer,
    currentModuleId: assessmentIsActive ? null : state.currentModuleId,
    currentScreenId: assessmentIsActive ? null : state.currentScreenId,
    finalAssessmentAnswers: {},
    finalAssessmentResult: null,
    screenProgress: {
      ...state.screenProgress,
      [FINAL_ASSESSMENT_MODULE_ID]: [],
    },
  };
}

export function shouldRenderPlayerScreenImmediately(moduleId: string | null) {
  return moduleId === FINAL_ASSESSMENT_MODULE_ID;
}
