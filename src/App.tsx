import { useState, useEffect, useMemo, useRef } from 'react';
import {
  STANDALONE_STORAGE_KEY,
  initialLearningState,
  loadLearningState,
  readLearningStateSnapshot,
  resetLearningState,
  saveLearningState,
} from './state/learningState';
import type { LearningState } from './state/learningState';
import PlatformShell from './components/platform/PlatformShell';
import CoursePlayerShell from './components/player/CoursePlayerShell';
import { HRBA_COURSE_MODULES, getHRBAModuleById } from './data/hrbaCourseModules';
import {
  buildPortalContextRoute,
  buildPortalHistoryState,
  getPortalLaunchContextFromWindow,
  isPortalLaunchRequested,
} from './integration/portalContext';
import type { PortalLaunchContext } from './integration/portalContext';
import {
  sendCourseReadyMessage,
  sendHubProgressEvent,
  sendPortalIntegrationError,
} from './integration/hubProgress';
import {
  derivePortalStorageKey,
  isExternalCourseLaunchContextMessage,
  isExternalCourseResumeResultMessage,
  type PortalLearnerStateContext,
} from './integration/portalLearnerState';
import {
  getResumeContentSignature,
  hydrateLearningStateFromResume,
  isMeaningfulLearningState,
  migrateLegacyLearningState,
  serializeLearningStateForResume,
  validateHrbaResumeState,
  validateTrustedAssessmentState,
  type TrustedAssessmentState,
} from './integration/resumeState';
import {
  canAccessCourseModule,
  FINAL_ASSESSMENT_MODULE_ID,
  hasFinalAssessmentPrerequisites,
  REQUIRED_HRBA_MODULE_IDS,
} from './state/coursePrerequisites';

import m1Sequence from './data/module1/module_1_screen_sequence.json';
import {
  module2FinalRouteTargets,
  module2FinalSequence,
} from './data/module2-final/module2FinalScreens';
import {
  module3PlayerSequence,
  module3RevisedRouteTargets,
  module3RevisedScreenRoutes,
} from './data/module3/module3RevisedScreens';
import {
  finalAssessmentRouteTargets,
  finalAssessmentSequence,
} from './data/finalAssessment';
import {
  MODULE5_COMPLETION_SCREEN_TITLE,
  MODULE5_SCREEN_ROUTES,
  canonicalizeModule5ScreenId,
  getAllowedModule5ScreenId,
} from './data/module5/module5EnhancedModel';

const TRACKABLE_PORTAL_MODULE_IDS: string[] = [...REQUIRED_HRBA_MODULE_IDS];
const FINAL_PORTAL_MODULE_IDS: string[] = [
  ...TRACKABLE_PORTAL_MODULE_IDS,
  FINAL_ASSESSMENT_MODULE_ID,
];

type PortalResumeSession = {
  initialMode: 'server' | 'legacy' | 'empty';
  revision: string;
  trustedAssessmentState: TrustedAssessmentState;
};

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

function getAllowedModule1ScreenId(requestedScreenId: string, screenIds: string[], completedScreenIds: string[]) {
  const requestedIndex = screenIds.indexOf(requestedScreenId);
  if (requestedIndex <= 0) return requestedScreenId;

  const completed = new Set(completedScreenIds);
  const previousScreensComplete = screenIds.slice(0, requestedIndex).every((screenId) => completed.has(screenId));
  if (previousScreensComplete) return requestedScreenId;

  const firstIncompleteIndex = screenIds.findIndex((screenId) => !completed.has(screenId));
  return screenIds[Math.max(0, firstIncompleteIndex)];
}

function getAllowedModule2ScreenId(requestedScreenId: string, screenIds: string[], completedScreenIds: string[]) {
  const requestedIndex = screenIds.indexOf(requestedScreenId);
  if (requestedIndex <= 0) return requestedScreenId;

  const completed = new Set(completedScreenIds);
  const previousScreensComplete = screenIds.slice(0, requestedIndex).every((screenId) => completed.has(screenId));
  if (previousScreensComplete) return requestedScreenId;

  const firstIncompleteIndex = screenIds.findIndex((screenId) => !completed.has(screenId));
  return screenIds[Math.max(0, firstIncompleteIndex)];
}

function getAllowedModule3ScreenId(requestedScreenId: string, screenIds: string[], completedScreenIds: string[]) {
  const requestedIndex = screenIds.indexOf(requestedScreenId);
  if (requestedIndex <= 0) return requestedScreenId;

  const completed = new Set(completedScreenIds);
  const previousScreensComplete = screenIds.slice(0, requestedIndex).every((screenId) => completed.has(screenId));
  if (previousScreensComplete) return requestedScreenId;

  const firstIncompleteIndex = screenIds.findIndex((screenId) => !completed.has(screenId));
  return screenIds[Math.max(0, firstIncompleteIndex)];
}

function getAllowedModule4ScreenId(requestedScreenId: string, screenIds: string[], completedScreenIds: string[]) {
  const requestedIndex = screenIds.indexOf(requestedScreenId);
  if (requestedIndex <= 0) return requestedScreenId;

  const completed = new Set(completedScreenIds);
  const previousScreensComplete = screenIds.slice(0, requestedIndex).every((screenId) => completed.has(screenId));
  if (previousScreensComplete) return requestedScreenId;

  const firstIncompleteIndex = screenIds.findIndex((screenId) => !completed.has(screenId));
  return screenIds[Math.max(0, firstIncompleteIndex)];
}

function CourseApplication({
  initialState,
  learnerStateKey,
  portalContext,
  resumeSession,
  storageKey,
}: {
  initialState?: LearningState;
  learnerStateKey: string | null;
  portalContext: PortalLaunchContext | null;
  resumeSession?: PortalResumeSession;
  storageKey: string;
}) {
  const reportedFinalAssessmentAttemptsRef = useRef<Set<string>>(new Set());
  const [state, setState] = useState<LearningState>(() => {
    const defaultState = initialState
      ? structuredClone(initialState)
      : loadLearningState(storageKey, Boolean(portalContext));
    const routePortalContext = portalContext;
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const screenIdParam = params.get('screenId');
    const moduleIdParam = params.get('moduleId');
    const allowQaProgressOverride = !portalContext && typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === ''
    );
    const completedParam = allowQaProgressOverride ? params.get('completed') : null;
    const routeTargets: Record<string, { moduleId: string; screenId: string }> = {
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
      : routeTargets[pathname] || null;

    const canOpenModule = (moduleId: string, completedModules: string[]) => {
      return canAccessCourseModule(moduleId, completedModules);
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
          const requestedScreenId = routeTarget?.screenId || screenIdParam;
          const module1ScreenIds = [
            'M1-PLAYER-00',
            'M1-S1-01',
            'M1-S1-02',
            'M1-S1-03',
            'M1-S1-04',
            'M1-S1-05',
            'M1-S1-06',
            'M1-S1-06A',
            'M1-S1-06B',
            'M1-PLAYER-COMPLETE',
          ];
          const module2ScreenIds = module2FinalSequence.map((screen) => screen['Screen/State ID']);
          const module3ScreenIds = module3PlayerSequence
            .filter((screen) => (
              String(screen['Screen/State ID']).startsWith('M3-R') &&
              (screen as { HiddenFromLearnerSequence?: boolean }).HiddenFromLearnerSequence !== true
            ))
            .map((screen) => screen['Screen/State ID']);
          const module4ScreenIds = [
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
          ];
          const targetScreenId =
            targetModuleId === 'module_01_hrba_foundations' && requestedScreenId
              ? getAllowedModule1ScreenId(requestedScreenId, module1ScreenIds, nextState.screenProgress[targetModuleId] || [])
              : targetModuleId === 'module_02_everyday_cso_work' && requestedScreenId
              ? getAllowedModule2ScreenId(requestedScreenId, module2ScreenIds, nextState.screenProgress[targetModuleId] || [])
              : targetModuleId === 'module_03_project_design' && requestedScreenId
                ? getAllowedModule3ScreenId(requestedScreenId, module3ScreenIds, nextState.screenProgress[targetModuleId] || [])
              : targetModuleId === 'module_04_implementation' && requestedScreenId
                ? getAllowedModule4ScreenId(requestedScreenId, module4ScreenIds, nextState.screenProgress[targetModuleId] || [])
              : targetModuleId === 'module_05_hrba_meal' && requestedScreenId
                ? getAllowedModule5ScreenId(
                    requestedScreenId,
                    nextState.screenProgress[targetModuleId] || [],
                    nextState.completedModules.includes(targetModuleId),
                  )
              : requestedScreenId;

          nextState.currentLayer = 'player';
          nextState.currentModuleId = targetModuleId;
          nextState.currentScreenId = targetScreenId;

          const requestedVisibleModule3ScreenIsLocked =
            targetModuleId === 'module_03_project_design' &&
            typeof requestedScreenId === 'string' &&
            typeof targetScreenId === 'string' &&
            module3ScreenIds.includes(requestedScreenId) &&
            targetScreenId !== requestedScreenId;
          const canonicalModule3Route = requestedVisibleModule3ScreenIsLocked
            ? module3RevisedScreenRoutes[targetScreenId]
            : undefined;

          if (canonicalModule3Route && typeof window !== 'undefined') {
            const canonicalParams = new URLSearchParams(window.location.search);
            canonicalParams.delete('screenId');
            canonicalParams.delete('moduleId');
            canonicalParams.delete('completed');
            const canonicalQuery = canonicalParams.toString();
            const canonicalUrl = `${canonicalModule3Route}${canonicalQuery ? `?${canonicalQuery}` : ''}${window.location.hash}`;
            window.history.replaceState(window.history.state, '', canonicalUrl);
          }

          const canonicalRequestedModule5Screen = targetModuleId === 'module_05_hrba_meal' && requestedScreenId
            ? canonicalizeModule5ScreenId(requestedScreenId)
            : null;
          const module5RouteNeedsRepair =
            targetModuleId === 'module_05_hrba_meal' &&
            typeof targetScreenId === 'string' &&
            (canonicalRequestedModule5Screen !== requestedScreenId || targetScreenId !== canonicalRequestedModule5Screen);
          const canonicalModule5Route = module5RouteNeedsRepair
            ? MODULE5_SCREEN_ROUTES[targetScreenId]
            : undefined;

          if (canonicalModule5Route && typeof window !== 'undefined') {
            const canonicalParams = new URLSearchParams(window.location.search);
            canonicalParams.delete('screenId');
            canonicalParams.delete('moduleId');
            canonicalParams.delete('completed');
            const canonicalQuery = canonicalParams.toString();
            const canonicalUrl = `${canonicalModule5Route}${canonicalQuery ? `?${canonicalQuery}` : ''}${window.location.hash}`;
            window.history.replaceState(window.history.state, '', canonicalUrl);
          }
        } else {
          nextState.currentLayer = 'platform';
          nextState.currentModuleId = null;
          nextState.currentScreenId = null;
          nextState.currentSubState = null;
          nextState.activeModal = null;
          if (typeof window !== 'undefined' && pathname.startsWith('/final-assessment')) {
            window.history.replaceState(
              buildPortalHistoryState(routePortalContext),
              '',
              buildPortalContextRoute('/', routePortalContext),
            );
          }
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
  const [resumeSaveEpoch, setResumeSaveEpoch] = useState(0);
  const resumeRevisionRef = useRef(resumeSession?.revision ?? null);
  const resumePendingSignatureRef = useRef<string | null>(null);
  const resumeAcknowledgedSignatureRef = useRef(
    portalContext && resumeSession?.initialMode === 'server'
      ? getResumeContentSignature(serializeLearningStateForResume(state, null))
      : null,
  );
  const legacyBootstrapRef = useRef(resumeSession?.initialMode === 'legacy');
  const legacyCacheLockedRef = useRef(resumeSession?.initialMode === 'legacy');
  const resumeBlockedRef = useRef(false);
  const latestStateRef = useRef(state);

  useEffect(() => {
    latestStateRef.current = state;
  }, [state]);

  useEffect(() => {
    const restoreRouteFromHistory = () => window.location.reload();
    window.addEventListener('popstate', restoreRouteFromHistory);
    return () => window.removeEventListener('popstate', restoreRouteFromHistory);
  }, []);
  const finalAssessmentPrerequisitesMet = useMemo(
    () => hasFinalAssessmentPrerequisites(state.completedModules),
    [state.completedModules],
  );
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
    if (!portalContext || !resumeSession) return;

    const handleResumeResult = (event: MessageEvent) => {
      if (
        event.source !== window.parent
        || event.origin !== portalContext.portalOrigin
        || !isExternalCourseResumeResultMessage(event.data, portalContext)
      ) return;

      const authoritativeResume = event.data.resumeState === null
        ? null
        : validateHrbaResumeState(event.data.resumeState);
      if (event.data.resumeState !== null && !authoritativeResume) return;

      resumeRevisionRef.current = event.data.resumeRevision;
      const wasLegacyBootstrap = legacyBootstrapRef.current;
      if (event.data.status === 'accepted' && wasLegacyBootstrap) {
        const acknowledgedSignature = authoritativeResume
          ? getResumeContentSignature(authoritativeResume)
          : null;
        if (!resumePendingSignatureRef.current
          || acknowledgedSignature !== resumePendingSignatureRef.current) {
          resumeBlockedRef.current = true;
          resumePendingSignatureRef.current = null;
          sendPortalIntegrationError(portalContext, 'legacy_bootstrap_rejected');
          setResumeSaveEpoch((value) => value + 1);
          return;
        }
      }
      if (event.data.status === 'accepted') {
        if (resumePendingSignatureRef.current) {
          resumeAcknowledgedSignatureRef.current = resumePendingSignatureRef.current;
        }
        legacyBootstrapRef.current = false;
        resumeBlockedRef.current = false;
        if (wasLegacyBootstrap) {
          legacyCacheLockedRef.current = false;
          saveLearningState(latestStateRef.current, storageKey, true);
        }
      } else if (authoritativeResume) {
        const authoritativeState = hydrateLearningStateFromResume(
          authoritativeResume,
          resumeSession.trustedAssessmentState,
        );
        legacyBootstrapRef.current = false;
        legacyCacheLockedRef.current = false;
        resumeBlockedRef.current = false;
        resumeAcknowledgedSignatureRef.current = getResumeContentSignature(
          serializeLearningStateForResume(authoritativeState, null),
        );
        setState(authoritativeState);
      } else if (wasLegacyBootstrap) {
        resumeBlockedRef.current = true;
        sendPortalIntegrationError(portalContext, 'legacy_bootstrap_rejected');
      } else {
        const authoritativeState = structuredClone(initialLearningState);
        resumeAcknowledgedSignatureRef.current = getResumeContentSignature(
          serializeLearningStateForResume(authoritativeState, null),
        );
        setState(authoritativeState);
      }
      resumePendingSignatureRef.current = null;
      setResumeSaveEpoch((value) => value + 1);
    };

    window.addEventListener('message', handleResumeResult);
    return () => window.removeEventListener('message', handleResumeResult);
  }, [portalContext, resumeSession, storageKey]);

  useEffect(() => {
    if (legacyCacheLockedRef.current) return;
    if (portalContext && resumeSession?.initialMode === 'empty' && !isMeaningfulLearningState(state)) {
      return;
    }
    saveLearningState(state, storageKey, Boolean(portalContext));
  }, [portalContext, resumeSession, state, storageKey]);

  useEffect(() => {
    if (state.finalAssessmentResult) {
      return;
    }

    if (!portalContext || !resumeSession) return;
    if (resumeBlockedRef.current) return;
    const resumeState = serializeLearningStateForResume(state, resumeRevisionRef.current);
    const contentSignature = getResumeContentSignature(resumeState);
    if (
      contentSignature === resumeAcknowledgedSignatureRef.current
      || contentSignature === resumePendingSignatureRef.current
      || (resumeSession.initialMode === 'empty' && !isMeaningfulLearningState(state))
    ) return;
    if (resumePendingSignatureRef.current) return;

    const sent = sendHubProgressEvent(portalContext, learnerStateKey, 'progress_updated', {
      baseRevision: resumeRevisionRef.current,
      completedModuleIds: portalCompletedModuleIds,
      currentModuleId: state.currentModuleId,
      currentScreenId: state.currentScreenId,
      legacyBootstrap: legacyBootstrapRef.current,
      progressPercent: portalProgressPercent,
      resumeState,
    });
    if (sent) resumePendingSignatureRef.current = contentSignature;
  }, [
    portalContext,
    learnerStateKey,
    portalCompletedModuleIds,
    portalProgressPercent,
    state.currentModuleId,
    state.currentScreenId,
    screenProgressSignature,
    state.finalAssessmentResult,
    state,
    resumeSaveEpoch,
    resumeSession,
  ]);

  useEffect(() => {
    const result = state.finalAssessmentResult;

    if (!portalContext || !result || !finalAssessmentPrerequisitesMet) {
      return;
    }

    const attemptSignature = `${result.attemptNumber}:${result.evidenceId}:${result.submittedAt}`;
    if (reportedFinalAssessmentAttemptsRef.current.has(attemptSignature)) {
      return;
    }

    const completedModuleIds = result.passed
      ? FINAL_PORTAL_MODULE_IDS.filter(
          (moduleId) => moduleId === 'final_assessment' || state.completedModules.includes(moduleId),
        )
      : portalCompletedModuleIds;

    const assessment = {
      attemptNumber: result.attemptNumber,
      evidenceId: result.evidenceId,
      maxScore: result.maxScore,
      passed: result.passed,
      percentage: result.percentage,
      score: result.score,
      submittedAt: result.submittedAt,
    };
    const assessmentSent = sendHubProgressEvent(
      portalContext,
      learnerStateKey,
      'assessment_completed',
      {
        assessment,
        completedModuleIds,
        currentModuleId: 'final_assessment',
        currentScreenId: 'FINAL-ASSESSMENT-COMPLETE',
        progressPercent: result.passed ? 100 : portalProgressPercent,
      },
    );
    const completionSent = !result.passed || sendHubProgressEvent(
      portalContext,
      learnerStateKey,
      'course_completed',
      {
        assessment,
        completedModuleIds,
        currentModuleId: 'final_assessment',
        currentScreenId: 'FINAL-ASSESSMENT-COMPLETE',
        progressPercent: 100,
      },
    );

    if (assessmentSent && completionSent) {
      reportedFinalAssessmentAttemptsRef.current.add(attemptSignature);
    }
  }, [
    finalAssessmentPrerequisitesMet,
    learnerStateKey,
    portalContext,
    portalCompletedModuleIds,
    portalProgressPercent,
    state.completedModules,
    state.finalAssessmentResult,
  ]);

  const launchModule = (moduleId: string, reviewMode: boolean) => {
    setState((prev) => {
      const moduleDefinition = getHRBAModuleById(moduleId) || HRBA_COURSE_MODULES[0];
      const isUnlocked = canAccessCourseModule(moduleId, prev.completedModules);

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
    setState(resetLearningState(storageKey));
    if (typeof window !== 'undefined') {
      window.history.pushState(
        buildPortalHistoryState(portalContext),
        '',
        buildPortalContextRoute('/', portalContext),
      );
    }
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
    if (typeof window !== 'undefined') {
      window.history.pushState(
        buildPortalHistoryState(portalContext),
        '',
        buildPortalContextRoute('/', portalContext),
      );
    }
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
      ['M5-R01', 'Why HRBA Matters in MEAL', 'Introduce the shift from activity counting to rights-based evidence, feedback, learning, and reporting.'],
      ['M5-R02', 'Learning Objectives and MEAL Roadmap', 'Orient learners to the Module 5 MEAL pathway, HRBA lens, learning objectives, safe practice rules, and final repair-note output.'],
      ['M5-R03', 'The MEAL Cycle Through an HRBA Lens', 'Connect monitoring, evaluation, accountability and learning to the practical HRBA questions each stage adds.'],
      ['M5-R04', 'Planning MEAL: Define Results, Success and Learning Questions', 'Build a coherent result, success-sign and rights-sensitive learning-question chain.'],
      ['M5-R05', 'Monitoring: Build Rights-Based Indicators', 'Connect the decision, rights question, indicator, safe source and action trigger.'],
      ['M5-R06', 'Data Collection: Choose the Right Methods', 'Choose a proportionate quantitative, qualitative and participatory method mix.'],
      ['M5-R07', 'Safe Disaggregation and Ethical Data Collection', 'Choose necessary and safe disaggregation without exposing people.'],
      ['M5-R08', 'Data Management: Organize, Clean and Protect Evidence', 'Clean a fictional evidence table transparently and set access, storage and retention rules.'],
      ['M5-R09', 'Analysis: Combine Numbers, Feedback and Stories', 'Tag comments, compare sources, preserve contradiction and build a bounded mixed-evidence statement.'],
      ['M5-R10', 'Evaluation: Understand Change, Equity and Contribution', 'Assess change for whom, HRBA process, alternative influences and credible contribution.'],
      ['M5-R11', 'Accountability: Feedback, Response and Community Scorecards', 'Close the feedback-response-account-back loop and agree responsible action.'],
      ['M5-R12', 'Learning and Adaptation: Dashboard, Decisions and Account-Back', 'Turn evidence signals into role-appropriate decisions, adaptation and account-back.'],
      ['M5-R13', 'Knowledge Check: From Evidence to Action', 'Review applied judgement across the complete HRBA MEAL evidence journey.'],
      ['M5-R14', 'Build Your HRBA MEAL, Accountability and Adaptation Canvas', 'Review and confirm the concise carried-forward learning and future-support summary.'],
      ['M5-PLAYER-COMPLETE', MODULE5_COMPLETION_SCREEN_TITLE, 'Review the Module 5 learning summary, then explicitly confirm Module 5 completion.'],
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
              'Screen/State Title': 'From Design to Rights-Responsive Implementation',
              'Learning/Purpose': 'Bridge from Module 3 and interpret what rights-responsive implementation requires.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-02',
              'Screen/State Title': 'What You Will Practise and Produce',
              'Learning/Purpose': 'Review the connected practice journey and the Implementation Decision and Follow-Up Note.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-03',
              'Screen/State Title': 'The Everyday Rights Lens in Action',
              'Learning/Purpose': 'Apply a six-step rights lens to an implementation concern in Jiru Amba.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-04',
              'Screen/State Title': 'Jiru Amba: Two Months into Implementation',
              'Learning/Purpose': 'Explore five workstreams, distinguish confirmed information from assumptions, and choose one issue to carry forward.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-05',
              'Screen/State Title': 'Fair Access — Evidence, Action and Follow-Up',
              'Learning/Purpose': 'Use evidence to choose a proportionate fair-access response and define accountable follow-up.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-06',
              'Screen/State Title': 'Participation with Real Influence',
              'Learning/Purpose': 'Open a real decision, include relevant voices and show how participation influenced the outcome.',
            },
            {
              Layer: 'Layer 2 Player',
              'Screen/State ID': 'M4-S1-07',
              'Screen/State Title': 'Accountable Concern, Response and Follow-Up',
              'Learning/Purpose': 'Turn an access concern into an owned, recorded response with explanation and follow-up.',
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
      portalContext={portalContext}
      portalModeActive={Boolean(portalContext)}
    />
  );
}

function PortalUnavailableState({ sanitizeInvalidRoute = false }: { sanitizeInvalidRoute?: boolean }) {
  useEffect(() => {
    if (sanitizeInvalidRoute) {
      window.history.replaceState(null, '', `${window.location.pathname}?embed=portal`);
    }
  }, [sanitizeInvalidRoute]);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem',
        background: '#f8fafc',
        color: '#0f2742',
      }}
    >
      <section
        role="alert"
        style={{
          width: 'min(100%, 42rem)',
          border: '1px solid #d7e0ea',
          borderRadius: '1rem',
          padding: '2rem',
          background: '#fff',
          boxShadow: '0 12px 30px rgba(15, 39, 66, 0.08)',
        }}
      >
        <p style={{ margin: 0, fontWeight: 800, color: '#2d6a4f' }}>Secure course connection</p>
        <h1 style={{ margin: '0.75rem 0', fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
          Return to the Learning Hub
        </h1>
        <p style={{ margin: 0, lineHeight: 1.7 }}>
          We could not confirm the learner context for this course. No course progress was loaded or shared.
          Return using the Learning Hub controls and launch the course again.
        </p>
      </section>
    </main>
  );
}

function PortalLaunchGate({ portalContext }: { portalContext: PortalLaunchContext }) {
  const [learnerContext, setLearnerContext] = useState<(
    PortalLearnerStateContext & {
      initialState: LearningState;
      resumeSession: PortalResumeSession;
    }
  ) | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    let accepted = false;
    let readyAttempts = 0;

    const stopWaiting = () => {
      window.clearInterval(readyInterval);
    };

    const failClosed = () => {
      if (!active || accepted) return;
      stopWaiting();
      setFailed(true);
      sendPortalIntegrationError(portalContext, 'launch_context_unavailable');
    };

    const sendReady = () => {
      if (!active || accepted) return;
      readyAttempts += 1;
      sendCourseReadyMessage(portalContext);
      if (readyAttempts >= 8) {
        failClosed();
      }
    };

    const handleLaunchContext = (event: MessageEvent) => {
      if (
        accepted
        || event.source !== window.parent
        || event.origin !== portalContext.portalOrigin
        || !isExternalCourseLaunchContextMessage(event.data, portalContext)
      ) {
        return;
      }

      accepted = true;
      stopWaiting();
      const learnerStateKey = event.data.learnerStateKey;
      const serverResumeState = event.data.resumeState === null
        ? null
        : validateHrbaResumeState(event.data.resumeState);
      const trustedAssessmentState = validateTrustedAssessmentState(event.data.trustedAssessmentState);
      if ((event.data.resumeState !== null && !serverResumeState) || trustedAssessmentState === undefined) {
        setFailed(true);
        sendPortalIntegrationError(portalContext, 'launch_context_invalid');
        return;
      }
      void derivePortalStorageKey(learnerStateKey)
        .then((storageKey) => {
          if (!active) return;
          if (serverResumeState) {
            const initialState = hydrateLearningStateFromResume(serverResumeState, trustedAssessmentState);
            saveLearningState(initialState, storageKey, true);
            setLearnerContext({
              initialState,
              learnerStateKey,
              resumeSession: {
                initialMode: 'server',
                revision: event.data.resumeRevision,
                trustedAssessmentState,
              },
              storageKey,
            });
            return;
          }

          const localSnapshot = readLearningStateSnapshot(storageKey);
          if (localSnapshot.status === 'malformed' || localSnapshot.status === 'unavailable') {
            console.warn('HRBA legacy resume read failed.', { issue: localSnapshot.issue });
            setFailed(true);
            sendPortalIntegrationError(portalContext, 'legacy_resume_invalid');
            return;
          }
          if (localSnapshot.status === 'empty') {
            setLearnerContext({
              initialState: structuredClone(initialLearningState),
              learnerStateKey,
              resumeSession: {
                initialMode: 'empty',
                revision: event.data.resumeRevision,
                trustedAssessmentState,
              },
              storageKey,
            });
            return;
          }

          const migration = migrateLegacyLearningState(localSnapshot.value, event.data.resumeRevision);
          if (!migration.ok) {
            console.warn('HRBA legacy resume migration failed.', { issues: migration.issues });
            setFailed(true);
            sendPortalIntegrationError(portalContext, 'legacy_resume_migration_failed');
            return;
          }
          if (migration.warnings.length > 0) {
            console.warn('HRBA legacy resume migration applied safe fallbacks.', { warnings: migration.warnings });
          }
          setLearnerContext({
            initialState: migration.meaningful
              ? migration.learningState
              : structuredClone(initialLearningState),
            learnerStateKey,
            resumeSession: {
              initialMode: migration.meaningful ? 'legacy' : 'empty',
              revision: event.data.resumeRevision,
              trustedAssessmentState,
            },
            storageKey,
          });
        })
        .catch(() => {
          if (active) {
            setFailed(true);
            sendPortalIntegrationError(portalContext, 'launch_context_invalid');
          }
        });
    };

    window.addEventListener('message', handleLaunchContext);
    const readyInterval = window.setInterval(sendReady, 1_000);
    sendReady();

    return () => {
      active = false;
      stopWaiting();
      window.removeEventListener('message', handleLaunchContext);
    };
  }, [portalContext]);

  if (failed) {
    return <PortalUnavailableState />;
  }

  if (!learnerContext) {
    return (
      <main
        aria-busy="true"
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '2rem',
          background: '#f8fafc',
          color: '#0f2742',
          textAlign: 'center',
        }}
      >
        <section>
          <p style={{ fontWeight: 800, color: '#2d6a4f' }}>Secure course connection</p>
          <h1>Preparing your HRBA course</h1>
          <p>Waiting for the Learning Hub to confirm your learner context. No progress has been loaded yet.</p>
        </section>
      </main>
    );
  }

  return (
    <CourseApplication
      initialState={learnerContext.initialState}
      learnerStateKey={learnerContext.learnerStateKey}
      portalContext={portalContext}
      resumeSession={learnerContext.resumeSession}
      storageKey={learnerContext.storageKey}
    />
  );
}

export default function App() {
  const portalRequested = typeof window !== 'undefined'
    && isPortalLaunchRequested(window.location.search);
  const portalContext = useMemo(() => getPortalLaunchContextFromWindow(), []);

  if (portalRequested) {
    return portalContext
      ? <PortalLaunchGate portalContext={portalContext} />
      : <PortalUnavailableState sanitizeInvalidRoute />;
  }

  return (
    <CourseApplication
      learnerStateKey={null}
      portalContext={null}
      storageKey={STANDALONE_STORAGE_KEY}
    />
  );
}
