import { useState, useEffect, useMemo, useRef } from 'react';
import { loadLearningState, resetLearningState, saveLearningState } from './state/learningState';
import type { LearningState } from './state/learningState';
import PlatformShell from './components/platform/PlatformShell';
import CoursePlayerShell from './components/player/CoursePlayerShell';
import { HRBA_COURSE_MODULES, getHRBAModuleById } from './data/hrbaCourseModules';
import { getPortalLaunchContextFromWindow } from './integration/portalContext';
import { sendHubProgressMessage } from './integration/hubProgress';

import m1Sequence from './data/module1/module_1_screen_sequence.json';
import {
  module2FinalRouteTargets,
  module2FinalSequence,
} from './data/module2-final/module2FinalScreens';
import {
  module3PlayerSequence,
  module3RevisedRouteTargets,
} from './data/module3/module3RevisedScreens';
import {
  finalAssessmentRouteTargets,
  finalAssessmentSequence,
} from './data/finalAssessment';

const TRACKABLE_PORTAL_MODULE_IDS = [
  'module_01_hrba_foundations',
  'module_02_everyday_cso_work',
  'module_03_project_design',
  'module_04_implementation',
  'module_05_hrba_meal',
];
const FINAL_PORTAL_MODULE_IDS = [...TRACKABLE_PORTAL_MODULE_IDS, 'final_assessment'];

function getPortalCompletedModuleIds(completedModules: string[]) {
  return TRACKABLE_PORTAL_MODULE_IDS.filter((moduleId) => completedModules.includes(moduleId));
}

function getPortalProgressPercent(completedModules: string[]) {
  const completedCount = getPortalCompletedModuleIds(completedModules).length;
  return Math.min(90, Math.round((completedCount / TRACKABLE_PORTAL_MODULE_IDS.length) * 90));
}

function getScreenProgressSignature(screenProgress: Record<string, string[]>) {
  return Object.entries(screenProgress)
    .filter(([moduleId]) => TRACKABLE_PORTAL_MODULE_IDS.includes(moduleId))
    .sort(([moduleA], [moduleB]) => moduleA.localeCompare(moduleB))
    .map(([moduleId, screenIds]) => `${moduleId}:${[...screenIds].sort().join('|')}`)
    .join(';');
}

export default function App() {
  const reportedFinalAssessmentAttemptsRef = useRef<Set<string>>(new Set());
  const [state, setState] = useState<LearningState>(() => {
    const defaultState = loadLearningState();
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const screenIdParam = params.get('screenId');
    const moduleIdParam = params.get('moduleId');
    const allowQaProgressOverride = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === ''
    );
    const completedParam = allowQaProgressOverride ? params.get('completed') : null;
    const module2RouteTargets: Record<string, { moduleId: string; screenId: string }> = {
      '/module-1': { moduleId: 'module_01_hrba_foundations', screenId: 'M1-PLAYER-00' },
      '/module-1/cover': { moduleId: 'module_01_hrba_foundations', screenId: 'M1-PLAYER-00' },
      '/module-2': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S01' },
      '/module-2/cover': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S01' },
      '/module-2/intro-video': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S01A' },
      '/module-2/learning-objectives': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S02' },
      '/module-2/screen-2-1': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S01' },
      '/module-2/screen-2-1a': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S01A' },
      '/module-2/screen-2-2': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S02' },
      '/module-2/screen-2-3': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S03' },
      '/module-2/screen-2-4': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S04' },
      '/module-2/screen-2-5': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S05' },
      '/module-2/screen-2-6': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S06' },
      '/module-2/screen-2-7': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S07' },
      '/module-2/screen-2-8': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S08' },
      '/module-2/screen-2-9': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S09' },
      '/module-2/screen-2-10': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S10' },
      '/module-2/screen-2-11': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S11' },
      '/module-2/screen-2-12': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S12' },
      '/module-2/screen-2-13': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S13' },
      '/module-2/screen-2-14': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S14' },
      '/module-2/screen-2-15': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S15' },
      '/module-2/screen-2-16': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S16' },
      '/module-2/screen-2-17': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S17' },
      '/module-2/screen-2-18': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S18' },
      '/module-2/screen-2-19': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S19' },
      '/module-2/screen-2-20': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S20' },
      '/module-2/screen-2-21': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S21' },
      '/module-2/screen-2-22': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S22' },
      '/module-2/screen-2-23': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S23' },
      '/module-2/complete': { moduleId: 'module_02_everyday_cso_work', screenId: 'M2-S23' },
      ...module3RevisedRouteTargets,
      '/module-4': { moduleId: 'module_04_implementation', screenId: 'M4-PLAYER-00' },
      '/module-4/cover': { moduleId: 'module_04_implementation', screenId: 'M4-PLAYER-00' },
      '/module-4/screen-4-1': { moduleId: 'module_04_implementation', screenId: 'M4-S1-01' },
      '/module-4/screen-4-2': { moduleId: 'module_04_implementation', screenId: 'M4-S1-02' },
      '/module-4/screen-4-3': { moduleId: 'module_04_implementation', screenId: 'M4-S1-03' },
      '/module-4/screen-4-4': { moduleId: 'module_04_implementation', screenId: 'M4-S1-04' },
      '/module-4/screen-4-5': { moduleId: 'module_04_implementation', screenId: 'M4-S1-05' },
      '/module-4/screen-4-6': { moduleId: 'module_04_implementation', screenId: 'M4-S1-06' },
      '/module-4/screen-4-7': { moduleId: 'module_04_implementation', screenId: 'M4-S1-07' },
      '/module-4/screen-4-8': { moduleId: 'module_04_implementation', screenId: 'M4-S1-08' },
      '/module-4/screen-4-9': { moduleId: 'module_04_implementation', screenId: 'M4-S1-09' },
      '/module-4/screen-4-10': { moduleId: 'module_04_implementation', screenId: 'M4-S1-10' },
      '/module-4/screen-4-11': { moduleId: 'module_04_implementation', screenId: 'M4-S1-11' },
      '/module-4/screen-4-12': { moduleId: 'module_04_implementation', screenId: 'M4-S1-12' },
      '/module-4/screen-4-13': { moduleId: 'module_04_implementation', screenId: 'M4-S1-13' },
      '/module-4/screen-4-14': { moduleId: 'module_04_implementation', screenId: 'M4-S1-14' },
      '/module-5': { moduleId: 'module_05_hrba_meal', screenId: 'M5-PLAYER-00' },
      '/module-5/cover': { moduleId: 'module_05_hrba_meal', screenId: 'M5-PLAYER-00' },
      '/module-5/screen-5-1': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R01' },
      '/module-5/screen-5-2': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R02' },
      '/module-5/screen-5-3': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R03' },
      '/module-5/screen-5-4': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R04' },
      '/module-5/screen-5-5': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R05' },
      '/module-5/screen-5-6': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R06' },
      '/module-5/screen-5-7': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R07' },
      '/module-5/screen-5-7a': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R07' },
      '/module-5/screen-5-7b': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R07' },
      '/module-5/screen-5-7c': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R07' },
      '/module-5/screen-5-8': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R08' },
      '/module-5/screen-5-9': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R09' },
      '/module-5/screen-5-9a': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R07' },
      '/module-5/screen-5-9b': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R07' },
      '/module-5/screen-5-9c': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R07' },
      '/module-5/screen-5-9d': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R07' },
      '/module-5/screen-5-10': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R10' },
      '/module-5/screen-5-11': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R11' },
      '/module-5/screen-5-12': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R12' },
      '/module-5/screen-5-13': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R13' },
      '/module-5/screen-5-14': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R14' },
      '/module-5/screen-5-15': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R14' },
      '/module-5/screen-5-15a': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R11' },
      '/module-5/screen-5-16': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R12' },
      '/module-5/screen-5-17': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R12' },
      '/module-5/screen-5-18': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R13' },
      '/module-5/screen-5-19': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R13' },
      '/module-5/screen-5-20': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R14' },
      '/module-5/screen-5-21': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R14' },
      '/module-5/screen-5-22': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R14' },
      '/module-5/screen-5-23': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R14' },
      '/module-5/screen-5-24': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R14' },
      '/module-5/screen-5-25': { moduleId: 'module_05_hrba_meal', screenId: 'M5-R14' },
      '/module-5/complete': { moduleId: 'module_05_hrba_meal', screenId: 'M5-PLAYER-COMPLETE' },
      ...finalAssessmentRouteTargets,
    };
    const isModule2Path = pathname === '/module-2' || pathname.startsWith('/module-2/');
    const routeTarget = isModule2Path
      ? module2FinalRouteTargets[pathname] || {
          moduleId: 'module_02_everyday_cso_work',
          screenId: 'M2-00',
        }
      : module2RouteTargets[pathname] || null;

    const canOpenModule = (moduleId: string, completedModules: string[]) => {
      const moduleDefinition = getHRBAModuleById(moduleId);
      if (!moduleDefinition) return false;
      if (moduleDefinition.moduleSeq === 1) return true;
      const previousModules = HRBA_COURSE_MODULES.filter((module) => module.moduleSeq < moduleDefinition.moduleSeq);
      return previousModules.every((module) => completedModules.includes(module.moduleId));
    };
    
    if (routeTarget || screenIdParam || completedParam) {
      const nextState = { ...defaultState };
      
      if (completedParam !== null) {
        nextState.completedModules = completedParam ? completedParam.split(',').filter(Boolean) : [];
        nextState.screenProgress = {};
        nextState.practiceCheckState = {};
        nextState.m2ObjectiveCardsViewed = [];
        if (!routeTarget && !screenIdParam) {
          nextState.currentLayer = 'platform';
          nextState.currentModuleId = null;
          nextState.currentScreenId = null;
          nextState.currentSubState = null;
          nextState.activeModal = null;
        }
      }
      
      if (routeTarget || screenIdParam) {
        const targetModuleId = routeTarget?.moduleId || moduleIdParam || 'module_02_everyday_cso_work';
        if (canOpenModule(targetModuleId, nextState.completedModules)) {
          nextState.currentLayer = 'player';
          nextState.currentModuleId = targetModuleId;
          nextState.currentScreenId = routeTarget?.screenId || screenIdParam;
        } else {
          nextState.currentLayer = 'platform';
          nextState.currentModuleId = null;
          nextState.currentScreenId = null;
          nextState.currentSubState = null;
          nextState.activeModal = null;
          return nextState;
        }
      }

      if (screenIdParam) {
        
        // Configure individual states based on query parameters or defaults
        const checkAccepted = params.get('m2SafeLearningReminderAccepted');
        nextState.m2SafeLearningReminderAccepted = checkAccepted === 'false' ? false : true;
        
        const checklistReviewed = params.get('m2StandardsChecklistReviewed');
        nextState.m2StandardsChecklistReviewed = checklistReviewed === 'false' ? false : true;
        
        // Preset matching and sorting to show feedback / completion
        nextState.m2MatchingCompleted = params.get('m2MatchingCompleted') === 'false' ? false : true;
        nextState.m2SortingCompleted = params.get('m2SortingCompleted') === 'false' ? false : true;
        nextState.m2QuizCompleted = params.get('m2QuizCompleted') === 'false' ? false : true;
        
        // Preset quiz answers to show quiz feedback
        nextState.m2QuizAnswers = {
          q_0: 'A',
          q_1: 'B',
          q_2: 'C',
          q_3: 'A',
          q_4: 'B',
          standards_check: 'A',
          scenario_decision: 'B',
          check_0: 'A',
          check_1: 'B',
          check_2: 'C',
          check_3: 'D'
        };
        
        // Preset portfolio and worksheet fields
        nextState.m2EverydayRightsIssue = 'Water Access';
        nextState.m2EverydayRightsDimension = 'Accountability';
        nextState.m2RightsType = 'Economic rights';
        nextState.m2RightsTypeNote = 'Fictional note for rights types.';
        nextState.m2PlainLanguageRightsExplanation = 'Dignity represents core respect.';
        nextState.m2DecisionChangeType = 'Policy adjustment';
        nextState.m2DecisionChangeNote = 'Reflections on project cycle change.';
        nextState.m2EverydayRightsLens = {
          m2_issue_area: 'Water Access',
          m2_rights_dimensions: ['Accountability', 'Participation'],
          m2_private_note: 'This is a local portfolio entry note.'
        };
        nextState.m2RightsRelevanceWorksheet = {
          situation: 'Remote community lack of service.',
          dimension: 'Participation',
          rights_types: 'Economic and Social rights',
          cso_action: 'Hold community dialogue with local elders.'
        };
        
        // Preset hotspot/timeline/process viewed states so interactive elements are shown as completed
        nextState.m2HotspotViewed = ['Dignity', 'Fairness', 'Participation', 'Accountability'];
        nextState.m2FlashcardsViewed = ['Universal', 'Indivisible', 'Interdependent', 'Inalienable'];
        nextState.m2TabsViewed = ['Civil rights', 'Political rights', 'Economic rights', 'Social rights', 'Cultural rights', 'Collective rights'];
        nextState.m2ProcessViewed = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'];
        nextState.m2TimelineViewed = ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'];
      }
      return nextState;
    }
    
    return defaultState;
  });
  const portalContext = useMemo(() => getPortalLaunchContextFromWindow(), []);
  const portalCompletedModuleIds = useMemo(
    () => getPortalCompletedModuleIds(state.completedModules),
    [state.completedModules],
  );
  const portalProgressPercent = useMemo(
    () => getPortalProgressPercent(state.completedModules),
    [state.completedModules],
  );
  const screenProgressSignature = useMemo(
    () => getScreenProgressSignature(state.screenProgress),
    [state.screenProgress],
  );

  useEffect(() => {
    saveLearningState(state);
  }, [state]);

  useEffect(() => {
    if (state.finalAssessmentResult) {
      return;
    }

    sendHubProgressMessage(portalContext, {
      completed: false,
      completedModuleIds: portalCompletedModuleIds,
      currentModuleId: state.currentModuleId,
      currentScreenId: state.currentScreenId,
      progressPercent: portalProgressPercent,
    });
  }, [
    portalContext,
    portalCompletedModuleIds,
    portalProgressPercent,
    state.currentModuleId,
    state.currentScreenId,
    screenProgressSignature,
    state.finalAssessmentResult,
  ]);

  useEffect(() => {
    const result = state.finalAssessmentResult;

    if (!portalContext || !result) {
      return;
    }

    const attemptSignature = `${result.attemptNumber}:${result.submittedAt}`;
    if (reportedFinalAssessmentAttemptsRef.current.has(attemptSignature)) {
      return;
    }

    const completedModuleIds = result.passed
      ? FINAL_PORTAL_MODULE_IDS.filter(
          (moduleId) => moduleId === 'final_assessment' || state.completedModules.includes(moduleId),
        )
      : portalCompletedModuleIds;

    const sent = sendHubProgressMessage(portalContext, {
      assessment: {
        attemptNumber: result.attemptNumber,
        maxScore: result.maxScore,
        passed: result.passed,
        percentage: result.percentage,
        score: result.score,
        submittedAt: result.submittedAt,
      },
      completed: result.passed,
      completedModuleIds,
      currentModuleId: 'final_assessment',
      currentScreenId: 'FINAL-ASSESSMENT-COMPLETE',
      progressPercent: result.passed ? 100 : portalProgressPercent,
    });

    if (sent) {
      reportedFinalAssessmentAttemptsRef.current.add(attemptSignature);
    }
  }, [portalContext, portalCompletedModuleIds, portalProgressPercent, state.completedModules, state.finalAssessmentResult]);

  const launchModule = (moduleId: string, reviewMode: boolean) => {
    setState((prev) => {
      const moduleDefinition = getHRBAModuleById(moduleId) || HRBA_COURSE_MODULES[0];
      const previousModules = HRBA_COURSE_MODULES.filter((module) => module.moduleSeq < moduleDefinition.moduleSeq);
      const isUnlocked = previousModules.every((module) => prev.completedModules.includes(module.moduleId));

      if (!isUnlocked) {
        return prev;
      }

      const targetScreenId = moduleDefinition.startScreenId;
      
      const updatedState = {
        ...prev,
        currentLayer: 'player' as const,
        currentModuleId: moduleId,
        currentScreenId: targetScreenId,
      };

      if (reviewMode) {
        if (moduleId === 'module_02_everyday_cso_work') {
          updatedState.m2PlainLanguageRightsExplanation = '';
          updatedState.m2EverydayRightsIssue = '';
          updatedState.m2EverydayRightsDimension = '';
          updatedState.m2EverydayRightsMap = {};
          updatedState.m2RightsType = '';
          updatedState.m2RightsTypeNote = '';
          updatedState.m2SafeLearningReminderAccepted = false;
          updatedState.m2StandardsChecklistReviewed = false;
          updatedState.m2RightsRelevanceWorksheet = {};
          updatedState.m2DecisionChangeType = '';
          updatedState.m2DecisionChangeNote = '';
          updatedState.m2EverydayRightsLens = {};
          updatedState.m2QuizAnswers = {};
          updatedState.m2QuizCompleted = false;
          updatedState.m2FinalPortfolio = {
            reframedLanguageNote: '',
            actorRightsHolder: '',
            actorDutyBearer: '',
            inclusionAudit: '',
            inclusionGroupOftenMissing: '',
            inclusionPracticalStep: '',
            powerInsight: '',
            safeFeedbackMethod: '',
            updatedAt: '',
          };
          updatedState.m2FinalKnowledgeCheckAnswers = {};
          updatedState.m2FinalKnowledgeCheckCompleted = false;
          updatedState.m2SortingState = {};
          updatedState.m2SortingCompleted = false;
          updatedState.m2MatchingState = {};
          updatedState.m2MatchingCompleted = false;
          updatedState.m2ObjectiveCardsViewed = [];
          updatedState.m2HotspotViewed = [];
          updatedState.m2FlashcardsViewed = [];
          updatedState.m2TabsViewed = [];
          updatedState.m2ProcessViewed = [];
          
          updatedState.screenProgress = {
            ...prev.screenProgress,
            'module_02_everyday_cso_work': []
          };
        } else if (moduleId === 'module_01_hrba_foundations') {
          updatedState.practiceCheckState = {};
          updatedState.agreementAccepted = false;
          updatedState.orientationAnswers = {};
          updatedState.orientationCompleted = false;
          updatedState.surveyAnswers = {};
          updatedState.surveyPriorities = [];
          updatedState.surveyNote = '';
          updatedState.surveyCompleted = false;
          updatedState.sortingState = {};
          updatedState.sortingCompleted = false;
          updatedState.matchingState = {};
          updatedState.matchingCompleted = false;
          updatedState.scenarioAnswers = {};
          updatedState.scenarioCompleted = {};
          updatedState.m1JourneyActiveStep = 1;
          updatedState.m1JourneyVisitedSteps = [1];
          updatedState.m1WaterPointVisitedClues = [];
          updatedState.m1WaterPointSelectedOption = '';
          updatedState.m1WaterPointSummaryViewed = false;
          updatedState.m1EverydayWorkExplored = [];
          updatedState.m1InclusionPerspectivesExplored = [];
          updatedState.m1ConnectedRightsExplored = [];
          updatedState.m1RightsHolderLensViewed = [];
          updatedState.m1RightsHolderCheckAnswer = '';
          updatedState.m1ActorCategoriesExplored = [];
          updatedState.m1ActorMatchingAnswers = {};
          updatedState.m1ActorMatchingCompleted = false;
          updatedState.m1ParticipationLevelsViewed = [];
          updatedState.m1ParticipationScenarioAnswer = '';
          updatedState.m1ParticipationScenarioCompleted = false;
          updatedState.m1HrbaShiftStepsExplored = [];
          updatedState.m1HrbaShiftAnswer = '';
          updatedState.m1KnowledgeCheckStarted = false;
          updatedState.m1KnowledgeCheckCurrentIndex = 0;
          updatedState.m1KnowledgeCheckSelectedAnswers = {};
          updatedState.m1KnowledgeCheckCheckedQuestions = {};
          updatedState.m1KnowledgeCheckCorrectness = {};
          updatedState.m1KnowledgeCheckScore = 0;
          updatedState.m1KnowledgeCheckCompleted = false;
          updatedState.m1KnowledgeCheckRetryCount = 0;
          updatedState.assessmentFocus = '';
          updatedState.selfAssessmentScores = {};
          updatedState.selfAssessmentTotal = 0;
          updatedState.selfAssessmentCategory = '';
          updatedState.suggestedPriorityOne = '';
          updatedState.suggestedPriorityTwo = '';
          updatedState.screen16Completed = false;
          updatedState.screen17ActionCommitment = {
            selectedPriorityAreas: [],
            selectedAction: null,
            commitmentSentence: null,
            optionalNote: null,
            completed: false,
          };
          updatedState.screen18Completion = {
            reviewedTakeaways: [],
            completed: false,
          };
          updatedState.module1Completion = {
            completed: false,
            completedAt: '',
          };
          updatedState.portfolioShiftSelected = '';
          updatedState.portfolioShiftAreas = [];
          updatedState.portfolioShiftNote = '';
          updatedState.quizAnswers = {};
          updatedState.quizCompleted = false;
          updatedState.quizScore = 0;
          
          updatedState.screenProgress = {
            ...prev.screenProgress,
            'module_01_hrba_foundations': []
          };
        } else if (moduleId === 'final_assessment') {
          updatedState.finalAssessmentAnswers = {};
          updatedState.finalAssessmentResult = null;
          updatedState.completedModules = prev.completedModules.filter((id) => id !== 'final_assessment');
          updatedState.screenProgress = {
            ...prev.screenProgress,
            final_assessment: [],
          };
        } else {
          updatedState.screenProgress = {
            ...prev.screenProgress,
            [moduleId]: []
          };
        }
      }
      
      return updatedState;
    });
  };

  const resetCourseProgress = () => {
    setState(resetLearningState());
    if (typeof window !== 'undefined') window.history.pushState(null, '', '/');
  };

  const exitPlayer = () => {
    setState((prev) => {
      const activeMod = prev.currentModuleId || 'module_01_hrba_foundations';
      const progressList = prev.screenProgress[activeMod] || [];
      const completeScreenId = getHRBAModuleById(activeMod)?.completionScreenId || 'M1-PLAYER-COMPLETE';
      const isCompleted = activeMod === 'final_assessment'
        ? Boolean(prev.finalAssessmentResult?.passed)
        : progressList.includes(completeScreenId);
      
      const completedModules = isCompleted && !prev.completedModules.includes(activeMod)
        ? [...prev.completedModules, activeMod]
        : prev.completedModules;

      return {
        ...prev,
        currentLayer: 'platform' as const,
        completedModules,
      };
    });
  };

  const currentModule = getHRBAModuleById(state.currentModuleId) || HRBA_COURSE_MODULES[0];
  const module5Sequence = [
    {
      Layer: 'Layer 2 Player',
      'Screen/State ID': 'M5-PLAYER-00',
      'Screen/State Title': 'Module 5 Cover Screen',
      'Learning/Purpose': 'Launch Module 5: HRBA in MEAL.',
    },
    ...[
      ['M5-R01', 'The Numbers Look Good, But Who Is Missing?', 'Introduce the shift from activity counting to rights-based evidence, feedback, learning, and reporting.'],
      ['M5-R02', 'What Is Missing from the Report?', 'Diagnose what a strong-looking activity report does not yet show.'],
      ['M5-R03', 'The HRBA MEAL Lens', 'Use five practical questions to read MEAL evidence through an HRBA lens.'],
      ['M5-R04', 'From Counting to Learning About Change', 'Practice moving from activity counts to evidence about access, barriers, change, and learning.'],
      ['M5-R05', 'Indicator Repair Lab', 'Repair weak output indicators into safer HRBA-informed indicators.'],
      ['M5-R06', 'Safe and Inclusive Evidence', 'Choose minimum necessary evidence that makes exclusion visible without exposing people.'],
      ['M5-R07', 'Feedback, Complaints, and Trust', 'Turn feedback collection into accountable response, referral, adaptation, and account-back.'],
      ['M5-R08', 'Ethical Stories and Responsible Data', 'Respond to risky story requests with consent, dignity, privacy, and truthful alternatives.'],
      ['M5-R09', 'Interpreting Evidence with Rights-Holders', 'Plan safe participatory interpretation without exposing sensitive details.'],
      ['M5-R10', 'Reading the Signals: When the Plan Should Change', 'Match evidence signals with responsible adaptation, referral, repair, or account-back actions.'],
      ['M5-R11', 'Reporting Without Losing the Rights Lens', 'Repair risky report claims into truthful, safe, rights-based reporting.'],
      ['M5-R12', 'Capstone: Evidence-to-Action Simulator', 'Synthesize the Module 5 cycle from evidence to safe action and account-back.'],
      ['M5-R13', 'My HRBA MEAL, Accountability, and Learning Repair Note', 'Create a safe structured repair note using choices only.'],
      ['M5-R14', '90-Day Practice Bridge and Account-Back Commitment', 'Choose a realistic next step and bridge from course learning to practice.'],
      ['M5-PLAYER-COMPLETE', 'Module 5 Complete', 'Record Module 5 completion and return to the course page.'],
    ].map(([id, title, purpose]) => ({
      Layer: 'Layer 2 Player',
      'Screen/State ID': id,
      'Screen/State Title': title,
      'Learning/Purpose': purpose,
    })),
  ];
  const currentSequence = state.currentModuleId === 'module_02_everyday_cso_work'
    ? module2FinalSequence
    : state.currentModuleId === 'module_01_hrba_foundations'
      ? m1Sequence
    : state.currentModuleId === 'module_03_project_design'
        ? module3PlayerSequence
    : state.currentModuleId === 'module_04_implementation'
        ? [
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-PLAYER-00',
              'Screen/State Title': 'Module 4 Cover Screen',
              'Learning/Purpose': 'Launch Module 4: Applying HRBA During Implementation.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-01',
              'Screen/State Title': 'Applying HRBA During Implementation',
              'Learning/Purpose': 'Introduce HRBA during implementation and highlight the implementation stage of the project cycle.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-02',
              'Screen/State Title': 'Learning Objectives',
              'Learning/Purpose': 'Review what you will be able to do while applying HRBA during implementation.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-03',
              'Screen/State Title': 'HRBA in the Project Cycle',
              'Learning/Purpose': 'Reveal the HRBA principles a CSO should continue checking during implementation.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-04',
              'Screen/State Title': 'Practical Example: The Project Is Being Implemented',
              'Learning/Purpose': 'Match implementation issues with the main HRBA principle the CSO should check first.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-05',
              'Screen/State Title': 'Ensuring Non-Discriminatory Practices',
              'Learning/Purpose': 'Rank plausible actions for reviewing a changed support list fairly and safely.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-06',
              'Screen/State Title': 'Realizing Meaningful Participation',
              'Learning/Purpose': 'Choose the response that best strengthens youth participation during follow-up decisions.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-07',
              'Screen/State Title': 'Accountability and Transparency',
              'Learning/Purpose': 'Sequence a feedback process from receiving feedback to safe recording.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-08',
              'Screen/State Title': 'Rights-Holders, Duty-Bearers, and the Role of CSOs',
              'Learning/Purpose': 'Match responsibilities to rights-holders, the CSO, duty-bearers, and community structures.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-09',
              'Screen/State Title': 'Empowerment and Capacity Development',
              'Learning/Purpose': 'Choose the strongest capacity-development action for a safe feedback process.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-10',
              'Screen/State Title': 'Making Necessary Adjustments During Implementation',
              'Learning/Purpose': 'Choose an appropriate adjustment when implementation evidence shows risk or unfairness.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-11',
              'Screen/State Title': 'Safe Use of Information During Implementation',
              'Learning/Purpose': 'Sort reporting information into safer, caution, and unsafe categories.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-12',
              'Screen/State Title': 'Activity: Preparing an Implementation Note',
              'Learning/Purpose': 'Build and save a safe generalized implementation note for the learner portfolio.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-13',
              'Screen/State Title': 'Knowledge Check',
              'Learning/Purpose': 'Answer six scenario-based knowledge check questions with plausible distractors.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-14',
              'Screen/State Title': 'Module Summary and Completion',
              'Learning/Purpose': 'Review Module 4 principles, confirm portfolio save, and transition to Module 5.',
            },
          ]
    : state.currentModuleId === 'module_05_hrba_meal'
        ? module5Sequence
      : state.currentModuleId === 'final_assessment'
        ? finalAssessmentSequence
      : [
          {
            Layer: 'Layer 2 Player',
            'Screen/State ID': currentModule.startScreenId,
            'Screen/State Title': currentModule.title,
            'Learning/Purpose': currentModule.description,
          },
          {
            Layer: 'Layer 2 Player',
            'Screen/State ID': currentModule.completionScreenId,
            'Screen/State Title': `${currentModule.title} Content Placeholder`,
            'Learning/Purpose': currentModule.description,
          },
        ];

  if (state.currentLayer === 'platform') {
    return (
      <PlatformShell
        completedModules={state.completedModules}
        screenProgress={state.screenProgress}
        currentModuleId={state.currentModuleId}
        currentScreenId={state.currentScreenId}
        onLaunchModule={launchModule}
        onResetProgress={resetCourseProgress}
        portalModeActive={Boolean(portalContext)}
      />
    );
  }

  return (
    <CoursePlayerShell
      state={state}
      onChangeState={setState}
      onExit={exitPlayer}
      sequenceData={currentSequence}
      portalModeActive={Boolean(portalContext)}
    />
  );
}
