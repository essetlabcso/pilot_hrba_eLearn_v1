/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LearningState {
  storageVersion: 'hrba-course-progress-v1';
  currentLayer: 'platform' | 'player';
  currentCourseId: string | null;
  currentModuleId: string | null;
  currentScreenId: string | null;
  currentSubState: string | null;
  activeModal: 'help' | 'accessibility' | 'glossary' | 'resources' | 'menu' | null;
  completedModules: string[];
  screenProgress: Record<string, string[]>; // Map of moduleId -> completedScreenIds
  quizAttempts: Record<string, number>;
  practiceCheckState: Record<string, any>;
  transcriptVisible: boolean;
  soundState: boolean;
  captionState: boolean;
  resourceView: string | null;

  // Module 1 Specific State
  agreementAccepted: boolean;
  orientationAnswers: Record<string, string>; // Q1, Q2 responses
  orientationCompleted: boolean;
  surveyAnswers: Record<string, number | 'N/A'>; // Q1-Q16 ratings
  surveyPriorities: string[]; // exactly 2 selected areas
  surveyNote: string;
  surveyCompleted: boolean;
  sortingState: Record<string, string>; // Example ID -> Category
  sortingCompleted: boolean;
  matchingState: Record<string, string>; // Actor ID -> Role Match
  matchingCompleted: boolean;
  scenarioAnswers: Record<string, string>; // Screen ID -> Option chosen
  scenarioCompleted: Record<string, boolean>;
  m1JourneyActiveStep: number;
  m1JourneyVisitedSteps: number[];
  m1WaterPointVisitedClues: string[];
  m1WaterPointSelectedOption: string;
  m1WaterPointSummaryViewed: boolean;
  m1EverydayWorkExplored: string[];
  m1InclusionPerspectivesExplored: string[];
  m1ConnectedRightsExplored: string[];
  m1RightsHolderLensViewed: string[];
  m1RightsHolderCheckAnswer: string;
  m1ActorCategoriesExplored: string[];
  m1ActorMatchingAnswers: Record<string, string>;
  m1ActorMatchingCompleted: boolean;
  m1ParticipationLevelsViewed: number[];
  m1ParticipationScenarioAnswer: string;
  m1ParticipationScenarioCompleted: boolean;
  m1HrbaShiftStepsExplored: number[];
  m1HrbaShiftAnswer: string;
  m1KnowledgeCheckStarted: boolean;
  m1KnowledgeCheckCurrentIndex: number;
  m1KnowledgeCheckSelectedAnswers: Record<string, string>;
  m1KnowledgeCheckCheckedQuestions: Record<string, boolean>;
  m1KnowledgeCheckCorrectness: Record<string, boolean>;
  m1KnowledgeCheckScore: number;
  m1KnowledgeCheckCompleted: boolean;
  m1KnowledgeCheckRetryCount: number;
  assessmentFocus: '' | 'own_understanding' | 'cso_practice' | 'project_activity';
  m1SelfAssessmentPage: number;
  selfAssessmentScores: Record<string, 1 | 2 | 3 | 4>;
  selfAssessmentTotal: number;
  selfAssessmentCategory: '' | 'good_starting_point' | 'building_confidence' | 'ready_to_strengthen_practice';
  suggestedPriorityOne: string;
  suggestedPriorityTwo: string;
  screen16Completed: boolean;
  screen17ActionCommitment: {
    selectedPriorityAreas: string[];
    selectedAction: string | null;
    commitmentSentence: string | null;
    optionalNote: string | null;
    completed: boolean;
  };
  screen18Completion: {
    reviewedTakeaways: string[];
    completed: boolean;
  };
  module1Completion: {
    completed: boolean;
    completedAt: string;
  };
  portfolioShiftSelected: string;
  portfolioShiftAreas: string[];
  portfolioShiftNote: string;
  quizAnswers: Record<string, string>; // Quiz Q1-Q5 responses
  quizCompleted: boolean;
  quizScore: number;

  // Module 2 Specific State
  m2PlainLanguageRightsExplanation: string;
  m2EverydayRightsIssue: string;
  m2EverydayRightsDimension: string;
  m2EverydayRightsMap: Record<string, string>;
  m2RightsType: string;
  m2RightsTypeNote: string;
  m2SafeLearningReminderAccepted: boolean;
  m2StandardsChecklistReviewed: boolean;
  m2RightsRelevanceWorksheet: Record<string, string>;
  m2DecisionChangeType: string;
  m2DecisionChangeNote: string;
  m2EverydayRightsLens: Record<string, any>;
  m2QuizAnswers: Record<string, string>;
  m2QuizCompleted: boolean;
  m2SortingState: Record<string, string>;
  m2SortingCompleted: boolean;
  m2MatchingState: Record<string, string>;
  m2MatchingCompleted: boolean;
  m2ObjectiveCardsViewed: string[];
  m2HotspotViewed: string[];
  m2FlashcardsViewed: string[];
  m2TabsViewed: string[];
  m2ProcessViewed: string[];
  m2TimelineViewed: string[];

  // Final Assessment State
  finalAssessmentStarted: boolean;
  finalAssessmentAnswers: Record<string, string>;
  finalAssessmentSubmitted: boolean;
  finalAssessmentScore: number;
  finalAssessmentSubmittedAt: string;
}

export const initialLearningState: LearningState = {
  storageVersion: 'hrba-course-progress-v1',
  currentLayer: 'platform',
  currentCourseId: 'hrba_course',
  currentModuleId: null,
  currentScreenId: null,
  currentSubState: null,
  activeModal: null,
  completedModules: [],
  screenProgress: {},
  quizAttempts: {},
  practiceCheckState: {},
  transcriptVisible: false,
  soundState: true,
  captionState: true,
  resourceView: null,

  agreementAccepted: false,
  orientationAnswers: {},
  orientationCompleted: false,
  surveyAnswers: {},
  surveyPriorities: [],
  surveyNote: '',
  surveyCompleted: false,
  sortingState: {},
  sortingCompleted: false,
  matchingState: {},
  matchingCompleted: false,
  scenarioAnswers: {},
  scenarioCompleted: {},
  m1JourneyActiveStep: 1,
  m1JourneyVisitedSteps: [],
  m1WaterPointVisitedClues: [],
  m1WaterPointSelectedOption: '',
  m1WaterPointSummaryViewed: false,
  m1EverydayWorkExplored: [],
  m1InclusionPerspectivesExplored: [],
  m1ConnectedRightsExplored: [],
  m1RightsHolderLensViewed: [],
  m1RightsHolderCheckAnswer: '',
  m1ActorCategoriesExplored: [],
  m1ActorMatchingAnswers: {},
  m1ActorMatchingCompleted: false,
  m1ParticipationLevelsViewed: [],
  m1ParticipationScenarioAnswer: '',
  m1ParticipationScenarioCompleted: false,
  m1HrbaShiftStepsExplored: [],
  m1HrbaShiftAnswer: '',
  m1KnowledgeCheckStarted: false,
  m1KnowledgeCheckCurrentIndex: 0,
  m1KnowledgeCheckSelectedAnswers: {},
  m1KnowledgeCheckCheckedQuestions: {},
  m1KnowledgeCheckCorrectness: {},
  m1KnowledgeCheckScore: 0,
  m1KnowledgeCheckCompleted: false,
  m1KnowledgeCheckRetryCount: 0,
  assessmentFocus: '',
  m1SelfAssessmentPage: 0,
  selfAssessmentScores: {},
  selfAssessmentTotal: 0,
  selfAssessmentCategory: '',
  suggestedPriorityOne: '',
  suggestedPriorityTwo: '',
  screen16Completed: false,
  screen17ActionCommitment: {
    selectedPriorityAreas: [],
    selectedAction: null,
    commitmentSentence: null,
    optionalNote: null,
    completed: false,
  },
  screen18Completion: {
    reviewedTakeaways: [],
    completed: false,
  },
  module1Completion: {
    completed: false,
    completedAt: '',
  },
  portfolioShiftSelected: '',
  portfolioShiftAreas: [],
  portfolioShiftNote: '',
  quizAnswers: {},
  quizCompleted: false,
  quizScore: 0,

  m2PlainLanguageRightsExplanation: '',
  m2EverydayRightsIssue: '',
  m2EverydayRightsDimension: '',
  m2EverydayRightsMap: {},
  m2RightsType: '',
  m2RightsTypeNote: '',
  m2SafeLearningReminderAccepted: false,
  m2StandardsChecklistReviewed: false,
  m2RightsRelevanceWorksheet: {},
  m2DecisionChangeType: '',
  m2DecisionChangeNote: '',
  m2EverydayRightsLens: {},
  m2QuizAnswers: {},
  m2QuizCompleted: false,
  m2SortingState: {},
  m2SortingCompleted: false,
  m2MatchingState: {},
  m2MatchingCompleted: false,
  m2ObjectiveCardsViewed: [],
  m2HotspotViewed: [],
  m2FlashcardsViewed: [],
  m2TabsViewed: [],
  m2ProcessViewed: [],
  m2TimelineViewed: [],

  finalAssessmentStarted: false,
  finalAssessmentAnswers: {},
  finalAssessmentSubmitted: false,
  finalAssessmentScore: 0,
  finalAssessmentSubmittedAt: '',
};

const STORAGE_KEY = 'hrba-course-progress-v1';
const LEGACY_STORAGE_KEYS = ['hrba_course_learning_state'];
const VALID_MODULE_IDS = new Set([
  'module_01_hrba_foundations',
  'module_02_everyday_cso_work',
  'module_03_project_design',
  'module_04_implementation',
  'module_05_hrba_meal',
  'final_assessment',
]);

function cloneInitialLearningState(): LearningState {
  return structuredClone(initialLearningState);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isValidModuleList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((moduleId) => typeof moduleId === 'string' && VALID_MODULE_IDS.has(moduleId));
}

function isValidProgressMap(value: unknown): value is Record<string, string[]> {
  if (!isObject(value)) return false;

  return Object.entries(value).every(([moduleId, screenIds]) =>
    VALID_MODULE_IDS.has(moduleId) &&
    Array.isArray(screenIds) &&
    screenIds.every((screenId) => typeof screenId === 'string'),
  );
}

function hasCompletionDependencyIssue(completedModules: string[]) {
  const requiredOrder = [
    'module_01_hrba_foundations',
    'module_02_everyday_cso_work',
    'module_03_project_design',
    'module_04_implementation',
    'module_05_hrba_meal',
  ];

  return requiredOrder.some((moduleId, index) => {
    if (!completedModules.includes(moduleId)) return false;
    const requiredPrevious = requiredOrder.slice(0, index);
    return requiredPrevious.some((previousModuleId) => !completedModules.includes(previousModuleId));
  });
}

function validateLearningState(candidate: unknown): LearningState | null {
  if (!isObject(candidate)) return null;
  if (candidate.storageVersion !== STORAGE_KEY) return null;
  if (!isValidModuleList(candidate.completedModules)) return null;
  if (!isValidProgressMap(candidate.screenProgress)) return null;
  if (hasCompletionDependencyIssue(candidate.completedModules)) return null;

  if (
    candidate.completedModules.includes('final_assessment') &&
    !candidate.completedModules.includes('module_05_hrba_meal')
  ) {
    return null;
  }

  if (
    candidate.finalAssessmentSubmitted === true &&
    !candidate.completedModules.includes('module_05_hrba_meal')
  ) {
    return null;
  }

  if (
    candidate.finalAssessmentScore !== undefined &&
    (typeof candidate.finalAssessmentScore !== 'number' || candidate.finalAssessmentScore < 0 || candidate.finalAssessmentScore > 20)
  ) {
    return null;
  }

  return {
    ...cloneInitialLearningState(),
    ...candidate,
    storageVersion: STORAGE_KEY,
  };
}

export function loadLearningState(): LearningState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const validated = validateLearningState(parsed);
      if (validated) return validated;
      localStorage.removeItem(STORAGE_KEY);
    }
    LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  } catch (e) {
    console.error('Failed to load learning state from localStorage:', e);
  }
  return cloneInitialLearningState();
}

export function saveLearningState(state: LearningState): void {
  try {
    const validated = validateLearningState({ ...state, storageVersion: STORAGE_KEY });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validated || cloneInitialLearningState()));
    LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  } catch (e) {
    console.error('Failed to save learning state to localStorage:', e);
  }
}

export function resetLearningState(): LearningState {
  try {
    localStorage.removeItem(STORAGE_KEY);
    LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  } catch (e) {
    console.error('Failed to reset learning state in localStorage:', e);
  }
  return cloneInitialLearningState();
}
