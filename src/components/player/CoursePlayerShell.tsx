import { useCallback, useEffect, useRef, useState } from 'react';
import type { LearningState } from '../../state/learningState';
import { getHRBAModuleById } from '../../data/hrbaCourseModules';

import PlayerHeader from './PlayerHeader';
import PlayerSidebar from './PlayerSidebar';
import ProgressStrip from './ProgressStrip';
import MainScreenCanvas from './MainScreenCanvas';
import PartnerLogoFooter from './PartnerLogoFooter';
import HelpOverlay from './HelpOverlay';
import AccessibilityModal from './AccessibilityModal';
import type { AccessibilityPreferences } from './AccessibilityModal';
import GlossaryModal from './GlossaryModal';
import ResourcesModal from './ResourcesModal';
import ScreenRenderer from '../course/ScreenRenderer';
import { module3RevisedScreenRoutes } from '../../data/module3/module3RevisedScreens';
import {
  module2FinalScreenIds,
  module2FinalScreenRoutes,
} from '../../data/module2-final/module2FinalScreens';
import { finalAssessmentScreenRoutes } from '../../data/finalAssessment';

interface CoursePlayerShellProps {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onExit: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sequenceData: any[];
  portalModeActive?: boolean;
}

const menuDrawerFocusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

const module2ScreenRoutes: Record<string, string> = module2FinalScreenRoutes;
const module3ScreenRoutes: Record<string, string> = module3RevisedScreenRoutes;
const module4ScreenRoutes: Record<string, string> = {
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
};
const finalAssessmentRoutes: Record<string, string> = finalAssessmentScreenRoutes;
const module5ScreenRoutes: Record<string, string> = {
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

function focusHTMLElement(element: Element | null | undefined) {
  if (!(element instanceof HTMLElement)) {
    return false;
  }

  element.focus();
  return document.activeElement === element;
}

function syncRouteToScreen(moduleId: string | null | undefined, screenId: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const route = moduleId === 'module_02_everyday_cso_work'
    ? module2ScreenRoutes[screenId]
    : moduleId === 'module_03_project_design'
      ? module3ScreenRoutes[screenId]
      : moduleId === 'module_04_implementation'
        ? module4ScreenRoutes[screenId]
      : moduleId === 'module_05_hrba_meal'
        ? module5ScreenRoutes[screenId]
        : moduleId === 'final_assessment'
          ? finalAssessmentRoutes[screenId]
        : undefined;

  if (route && window.location.pathname !== route) {
    window.history.pushState(null, '', route);
  }
}

export default function CoursePlayerShell({
  state,
  onChangeState,
  onExit,
  sequenceData,
  portalModeActive = false
}: CoursePlayerShellProps) {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const helpButtonRef = useRef<HTMLButtonElement>(null);
  const accessibilityButtonRef = useRef<HTMLButtonElement>(null);
  const menuDrawerRef = useRef<HTMLDivElement>(null);
  const menuDrawerTitleRef = useRef<HTMLHeadingElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);
  const focusMainContentAfterMenuSelectionRef = useRef(false);
  const previousScreenIdRef = useRef<string | null>(null);
  const [hiddenModule3RedirectQa, setHiddenModule3RedirectQa] = useState<string | null>(null);
  const [accessibilityPreferences, setAccessibilityPreferences] = useState<AccessibilityPreferences>({
    highContrast: false,
    textSize: 'standard',
    reduceMotion: false,
  });

  // Filter player-specific screens from the sequence data
  const allPlayerScreens = sequenceData.filter(
    (item) => item.Layer === 'Layer 2 Player'
  );
  const module1ActiveScreenIds = [
    'M1-PLAYER-00',
    'M1-S1-01',
    'M1-S1-02',
    'M1-S1-03',
    'M1-S1-04',
    'M1-S1-05',
    'M1-S1-06',
    'M1-S1-06A',
    'M1-S1-06B',
    'M1-PLAYER-COMPLETE'
  ];
  const module1ScreenById = new Map(
    allPlayerScreens.map((item) => [item['Screen/State ID'], item])
  );
  const playerScreens = state.currentModuleId === 'module_01_hrba_foundations'
    ? module1ActiveScreenIds
      .map((screenId) => module1ScreenById.get(screenId))
      .filter((item): item is (typeof allPlayerScreens)[number] => Boolean(item))
    : state.currentModuleId === 'module_03_project_design'
      ? allPlayerScreens.filter((item) => item.HiddenFromLearnerSequence !== true)
      : allPlayerScreens;

  // totalScreens is derived dynamically from filtered playerScreens — not hardcoded
  const totalScreens = playerScreens.length;

  // playerIndex: derived position within playerScreens (0-based)
  const playerIndex = Math.max(
    0,
    playerScreens.findIndex(
      (item) => item['Screen/State ID'] === state.currentScreenId
    )
  );

  // Current screen resolved from playerScreens via playerIndex
  const currentScreen = playerScreens[playerIndex];
  const screenTitle = currentScreen ? currentScreen['Screen/State Title'] : '';
  const screenId = currentScreen ? currentScreen['Screen/State ID'] : '';
  const isModule3RevisedFlow = state.currentModuleId === 'module_03_project_design';
  const module3InstructionalScreens = isModule3RevisedFlow
    ? playerScreens.filter((item) => String(item['Screen/State ID']).startsWith('M3-R'))
    : [];
  const module3InstructionalIndex = module3InstructionalScreens.findIndex(
    (item) => item['Screen/State ID'] === screenId
  );
  const displayedCurrentIndex = isModule3RevisedFlow
    ? screenId === 'M3-PLAYER-00'
      ? 0
      : Math.max(1, module3InstructionalIndex + 1)
    : playerIndex + 1;
  const displayedTotalScreens = isModule3RevisedFlow ? module3InstructionalScreens.length : totalScreens;
  const isWaterPointSequenceScreen = screenId === 'M1-S1-04' || screenId === 'M1-S1-05' || screenId === 'M1-S1-06' || screenId === 'M1-S1-06A' || screenId === 'M1-S1-06B' || screenId === 'M1-PLAYER-COMPLETE';

  useEffect(() => {
    if (state.currentModuleId !== 'module_03_project_design') {
      return;
    }

    if (!state.currentScreenId) {
      return;
    }

    const hiddenRouteTargets = ['M3-R15', 'M3-R16', 'M3-R18', 'M3-R19'];
    if (!hiddenRouteTargets.includes(state.currentScreenId)) {
      return;
    }

    const module3Progress = state.screenProgress.module_03_project_design || [];
    const screen14Complete = module3Progress.includes('M3-R14');
    const screen17Complete = module3Progress.includes('M3-R17');
    const isDesignRepairHiddenRoute = state.currentScreenId === 'M3-R15' || state.currentScreenId === 'M3-R16';
    const targetScreenId = isDesignRepairHiddenRoute
      ? screen14Complete ? 'M3-R17' : 'M3-R14'
      : screen17Complete ? 'M3-R20' : 'M3-R17';
    const redirectQa = `m3-s${state.currentScreenId.slice(-2)}-hidden-redirect`;
    const markerTimeout = window.setTimeout(() => setHiddenModule3RedirectQa(redirectQa), 0);
    syncRouteToScreen(state.currentModuleId, targetScreenId);
    onChangeState((prev) => ({
      ...prev,
      currentScreenId: targetScreenId,
    }));
    return () => window.clearTimeout(markerTimeout);
  }, [onChangeState, state.currentModuleId, state.currentScreenId, state.screenProgress.module_03_project_design]);

  // Handle Navigation — operates entirely on playerScreens array bounds
  const handlePrev = () => {
    if (playerIndex > 0) {
      const nextIdx = playerIndex - 1;
      const targetScreen = playerScreens[nextIdx];
      syncRouteToScreen(state.currentModuleId, targetScreen['Screen/State ID']);
      onChangeState((prev) => ({
        ...prev,
        currentScreenId: targetScreen['Screen/State ID']
      }));
    }
  };

  const handleNext = () => {
    if (playerIndex < totalScreens - 1) {
      const nextIdx = playerIndex + 1;
      const targetScreen = playerScreens[nextIdx];
      syncRouteToScreen(state.currentModuleId, targetScreen['Screen/State ID']);
      onChangeState((prev) => {
        // Record screen progress
        const currentProgress = prev.screenProgress[prev.currentModuleId || 'module_01_hrba_foundations'] || [];
        const shouldRecordScreenProgress = !(
          prev.currentModuleId === 'module_03_project_design' && screenId === 'M3-PLAYER-00'
        );
        const targetScreenId = targetScreen['Screen/State ID'];
        const targetModuleId = prev.currentModuleId || 'module_01_hrba_foundations';
        const isModule5CompletionTarget =
          prev.currentModuleId === 'module_05_hrba_meal' && targetScreenId === 'M5-PLAYER-COMPLETE';
        const updatedProgressBase = !shouldRecordScreenProgress || currentProgress.includes(screenId)
          ? currentProgress
          : [...currentProgress, screenId];
        const updatedProgress =
          isModule5CompletionTarget && !updatedProgressBase.includes('M5-PLAYER-COMPLETE')
            ? [...updatedProgressBase, 'M5-PLAYER-COMPLETE']
            : updatedProgressBase;

        return {
          ...prev,
          currentScreenId: targetScreenId,
          completedModules:
            isModule5CompletionTarget && !prev.completedModules.includes('module_05_hrba_meal')
              ? [...prev.completedModules, 'module_05_hrba_meal']
              : prev.completedModules,
          screenProgress: {
            ...prev.screenProgress,
            [targetModuleId]: updatedProgress
          }
        };
      });
    }
  };

  const handleToggleModal = useCallback((modal: LearningState['activeModal']) => {
    onChangeState((prev) => ({
      ...prev,
      activeModal: modal
    }));
  }, [onChangeState]);

  useEffect(() => {
    if (state.activeModal !== 'menu') {
      return;
    }

    const drawerElement = menuDrawerRef.current;

    window.setTimeout(() => {
      if (focusHTMLElement(menuDrawerTitleRef.current)) {
        return;
      }

      focusHTMLElement(drawerElement?.querySelector(menuDrawerFocusableSelector));
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        focusMainContentAfterMenuSelectionRef.current = false;
        handleToggleModal(null);
        return;
      }

      if (event.key !== 'Tab' || !drawerElement) {
        return;
      }

      const focusableElements = Array.from(
        drawerElement.querySelectorAll<HTMLElement>(menuDrawerFocusableSelector)
      ).filter((element) => !element.hasAttribute('disabled'));

      if (focusableElements.length === 0) {
        event.preventDefault();
        focusHTMLElement(menuDrawerTitleRef.current);
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (!drawerElement.contains(activeElement)) {
        event.preventDefault();
        firstFocusableElement.focus();
        return;
      }

      if (
        !(activeElement instanceof HTMLElement) ||
        !focusableElements.includes(activeElement)
      ) {
        event.preventDefault();

        if (event.shiftKey) {
          lastFocusableElement.focus();
          return;
        }

        firstFocusableElement.focus();
        return;
      }

      if (event.shiftKey && activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      window.setTimeout(() => {
        if (focusMainContentAfterMenuSelectionRef.current) {
          focusMainContentAfterMenuSelectionRef.current = false;

          if (focusHTMLElement(mainContentRef.current)) {
            return;
          }
        }

        if (focusHTMLElement(menuButtonRef.current)) {
          return;
        }

        focusHTMLElement(document.querySelector('.player-sidebar-button'));
      }, 0);
    };
  }, [handleToggleModal, state.activeModal]);

  useEffect(() => {
    if (state.activeModal !== 'help') {
      return;
    }

    return () => {
      window.setTimeout(() => {
        if (focusHTMLElement(helpButtonRef.current)) {
          return;
        }

        if (focusHTMLElement(document.querySelector('.player-sidebar-button'))) {
          return;
        }

        focusHTMLElement(mainContentRef.current);
      }, 0);
    };
  }, [state.activeModal]);

  useEffect(() => {
    if (state.activeModal !== 'accessibility') {
      return;
    }

    const accessibilityButtonElement = accessibilityButtonRef.current;

    return () => {
      window.setTimeout(() => {
        if (focusHTMLElement(accessibilityButtonElement)) {
          return;
        }

        focusHTMLElement(document.querySelector('.player-sidebar-button[aria-label="Open accessibility options"]'));
      }, 0);
    };
  }, [state.activeModal]);

  useEffect(() => {
    if (!screenId || previousScreenIdRef.current === null) {
      previousScreenIdRef.current = screenId || null;
      return;
    }

    if (previousScreenIdRef.current === screenId) {
      return;
    }

    previousScreenIdRef.current = screenId;

    if (state.activeModal !== null) {
      return;
    }

    window.setTimeout(() => {
      focusHTMLElement(mainContentRef.current);
    }, 0);
  }, [screenId, state.activeModal]);

  const handleReplay = () => {
    // Reload state: toggle and reset state variables to clear local interactive inputs
    if (state.currentModuleId === 'module_02_everyday_cso_work') {
      onChangeState((prev) => {
        const nextScreenProgress = screenId
          ? Object.fromEntries(
              Object.entries(prev.screenProgress).map(([moduleId, completedScreenIds]) => [
                moduleId,
                completedScreenIds.filter((completedScreenId) => completedScreenId !== screenId),
              ])
            )
          : prev.screenProgress;
        const remainingPracticeCheckState = { ...prev.practiceCheckState };
        if (screenId === 'M2-S01A') {
          delete remainingPracticeCheckState.module2_intro_video;
        } else if (screenId === 'M2-S02') {
          delete remainingPracticeCheckState.m2_s02_learning_objectives;
        } else if (screenId === 'M2-S03') {
          delete remainingPracticeCheckState.m2_s03_everyday_claims;
        } else if (screenId === 'M2-S05') {
          delete remainingPracticeCheckState.module2_screen24_characteristics;
        } else if (screenId === 'M2-S06') {
          delete remainingPracticeCheckState.module2_screen25_characteristics_match;
        } else if (screenId === 'M2-S07') {
          delete remainingPracticeCheckState.module2_screen26_working_principles;
        } else if (screenId === 'M2-S08') {
          delete remainingPracticeCheckState.module2_screen27_rights_holders;
        } else if (screenId === 'M2-S09') {
          delete remainingPracticeCheckState.module2_screen28_intersectionality;
        } else if (screenId === 'M2-S10') {
          delete remainingPracticeCheckState.module2_screen29_actor_ecosystem;
        } else if (screenId === 'M2-S11') {
          delete remainingPracticeCheckState.module2_screen210_cso_roles;
        } else if (screenId === 'M2-S12') {
          delete remainingPracticeCheckState.module2_screen212_safe_standards;
        } else if (screenId === 'M2-S13') {
          delete remainingPracticeCheckState.module2_screen213_sdg_lnob;
        } else if (screenId === 'M2-S14') {
          delete remainingPracticeCheckState.module2_screen214_participation_attendance;
        } else if (screenId === 'M2-S15') {
          delete remainingPracticeCheckState.module2_screen215_participation_practice;
        } else if (screenId === 'M2-S16') {
          delete remainingPracticeCheckState.module2_screen216_accountability_loop;
        } else if (screenId === 'M2-S17') {
          delete remainingPracticeCheckState.module2_screen217_feedback_loop_repair;
        } else if (screenId === 'M2-S18') {
          delete remainingPracticeCheckState.module2_screen218_power_exclusion;
        } else if (screenId === 'M2-S19') {
          delete remainingPracticeCheckState.module2_screen219_trace_exclusion_pathway;
        } else if (screenId === 'M2-S20') {
          delete remainingPracticeCheckState.module2_screen221_everyday_rights_lens;
        } else if (screenId === 'M2-S21') {
          delete remainingPracticeCheckState.module2_screen222_portfolio_checkpoint_lens;
        } else if (screenId === 'M2-S22') {
          delete remainingPracticeCheckState.module2_screen223_knowledge_check;
        } else if (screenId === 'M2-S23') {
          delete remainingPracticeCheckState.module2_screen224_close_transition;
        }

        return {
          ...prev,
          m2ObjectiveCardsViewed: screenId === 'M2-S02' ? [] : prev.m2ObjectiveCardsViewed,
          m2HotspotViewed: screenId === 'M2-S04' ? [] : prev.m2HotspotViewed,
          screenProgress: nextScreenProgress,
          practiceCheckState: remainingPracticeCheckState,
          m2MatchingState: screenId === 'M2-S06' ? {} : prev.m2MatchingState,
          m2MatchingCompleted: screenId === 'M2-S06' ? false : prev.m2MatchingCompleted,
          m2FlashcardsViewed: screenId === 'M2-S05' ? [] : prev.m2FlashcardsViewed,
          m2TabsViewed: screenId === 'M2-S08' ? [] : prev.m2TabsViewed,
          m2SortingState: screenId === 'M2-S09' ? {} : prev.m2SortingState,
          m2SortingCompleted: screenId === 'M2-S09' ? false : prev.m2SortingCompleted,
          m2TimelineViewed: screenId === 'M2-S13' ? [] : prev.m2TimelineViewed,
        };
      });
    } else {
      if (screenId === 'M1-S1-06A') {
        onChangeState((prev) => {
          const nextPracticeCheckState = { ...prev.practiceCheckState };
          delete nextPracticeCheckState.module1StartingConfidence;
          return { ...prev, practiceCheckState: nextPracticeCheckState };
        });
      } else if (screenId === 'M1-S1-06B') {
        onChangeState((prev) => {
          const nextPracticeCheckState = { ...prev.practiceCheckState };
          delete nextPracticeCheckState.module1LearningPriority;
          delete nextPracticeCheckState.module1PriorityCommitment;
          delete nextPracticeCheckState.module1PriorityCommitmentSaved;
          return { ...prev, practiceCheckState: nextPracticeCheckState };
        });
      } else if (screenId === 'M1-S1-07') {
        onChangeState((prev) => ({ ...prev, m1ConnectedRightsExplored: [] }));
      } else if (screenId === 'M1-S1-08') {
        onChangeState((prev) => ({ ...prev, m1RightsHolderLensViewed: [], m1RightsHolderCheckAnswer: '' }));
      } else if (screenId === 'M1-S2-01') {
        onChangeState((prev) => ({ ...prev, m1ActorCategoriesExplored: [], m1ActorMatchingAnswers: {}, m1ActorMatchingCompleted: false }));
      } else if (screenId === 'M1-S2-02') {
        onChangeState((prev) => ({ ...prev, m1ParticipationLevelsViewed: [], m1ParticipationScenarioAnswer: '', m1ParticipationScenarioCompleted: false }));
      } else if (screenId === 'M1-S2-03') {
        onChangeState((prev) => ({ ...prev, m1HrbaShiftStepsExplored: [], m1HrbaShiftAnswer: '' }));
      } else if (screenId === 'M1-S2-04') {
        onChangeState((prev) => ({
          ...prev,
          m1KnowledgeCheckStarted: false,
          m1KnowledgeCheckCurrentIndex: 0,
          m1KnowledgeCheckSelectedAnswers: {},
          m1KnowledgeCheckCheckedQuestions: {},
          m1KnowledgeCheckCorrectness: {},
          m1KnowledgeCheckScore: 0,
          m1KnowledgeCheckCompleted: false,
          m1KnowledgeCheckRetryCount: 0
        }));
      } else if (screenId === 'M1-S2-05') {
        onChangeState((prev) => ({
          ...prev,
          assessmentFocus: '',
          m1SelfAssessmentPage: 0,
          selfAssessmentScores: {},
          selfAssessmentTotal: 0,
          selfAssessmentCategory: '',
          suggestedPriorityOne: '',
          suggestedPriorityTwo: '',
          screen16Completed: false
        }));
      } else if (screenId === 'M1-S3-01') {
        onChangeState((prev) => ({
          ...prev,
          screen17ActionCommitment: {
            selectedPriorityAreas: [],
            selectedAction: null,
            commitmentSentence: null,
            optionalNote: null,
            completed: false
          }
        }));
      } else if (screenId === 'M1-S3-02') {
        onChangeState((prev) => {
          const moduleId = prev.currentModuleId || 'module_01_hrba_foundations';
          const moduleProgress = prev.screenProgress[moduleId] || [];
          return {
            ...prev,
            screen18Completion: {
              reviewedTakeaways: [],
              completed: false
            },
            module1Completion: {
              completed: false,
              completedAt: ''
            },
            completedModules: prev.completedModules.filter((id) => id !== 'module_01_hrba_foundations'),
            screenProgress: {
              ...prev.screenProgress,
              [moduleId]: moduleProgress.filter((id) => id !== 'M1-S3-02' && id !== 'M1-PLAYER-COMPLETE')
            }
          };
        });
      } else if (screenId === 'M1-S1-01') {
        onChangeState((prev) => {
          const nextPracticeCheckState = { ...prev.practiceCheckState };
          delete nextPracticeCheckState.module1WelcomeCourseReason;
          return { ...prev, practiceCheckState: nextPracticeCheckState };
        });
      } else if (screenId === 'M1-S1-02') {
        onChangeState((prev) => {
          const nextPracticeCheckState = { ...prev.practiceCheckState };
          delete nextPracticeCheckState.module1AboutCourseViewedCards;
          return { ...prev, practiceCheckState: nextPracticeCheckState };
        });
      } else if (screenId === 'M1-S1-03') {
        onChangeState((prev) => {
          const nextPracticeCheckState = { ...prev.practiceCheckState };
          delete nextPracticeCheckState.module1HrbaLensFirstQuestion;
          return { ...prev, practiceCheckState: nextPracticeCheckState };
        });
      } else if (screenId === 'M1-S1-04') {
        onChangeState((prev) => {
          const nextPracticeCheckState = { ...prev.practiceCheckState };
          delete nextPracticeCheckState.module1LearningJourneyViewedCards;
          return { ...prev, practiceCheckState: nextPracticeCheckState };
        });
      } else if (screenId === 'M1-S1-05') {
        onChangeState((prev) => {
          const nextPracticeCheckState = { ...prev.practiceCheckState };
          delete nextPracticeCheckState.module1LearningCycleViewedSteps;
          return { ...prev, practiceCheckState: nextPracticeCheckState };
        });
      } else if (screenId === 'M1-S1-06') {
        onChangeState((prev) => {
          const nextPracticeCheckState = { ...prev.practiceCheckState };
          delete nextPracticeCheckState.module1FirstSafePortfolioFocus;
          delete nextPracticeCheckState.module1FirstSafePortfolioNote;
          return { ...prev, practiceCheckState: nextPracticeCheckState };
        });
      } else if (screenId === 'M1-S4-02') {
        onChangeState((prev) => ({ ...prev, sortingState: {}, sortingCompleted: false }));
      } else if (screenId === 'M1-S5-03') {
        onChangeState((prev) => ({ ...prev, matchingState: {}, matchingCompleted: false }));
      } else if (screenId === 'M1-S6-05') {
        onChangeState((prev) => ({ ...prev, surveyAnswers: {}, surveyCompleted: false }));
      } else if (screenId === 'M1-S7-02') {
        onChangeState((prev) => ({ ...prev, quizAnswers: {}, quizCompleted: false, quizScore: 0 }));
      }
    }

    // Toggle activeModal momentarily to trigger re-render of ScreenRenderer
    const currentId = state.currentScreenId;
    onChangeState(prev => ({ ...prev, currentScreenId: null }));
    setTimeout(() => {
      onChangeState(prev => ({ ...prev, currentScreenId: currentId }));
    }, 10);
  };

  // Progress percentage derived from playerIndex position within playerScreens — fully dynamic
  const progressPercent = isModule3RevisedFlow
    ? screenId === 'M3-PLAYER-00'
      ? 0
      : Math.round(((module3InstructionalIndex + 1) / Math.max(1, module3InstructionalScreens.length)) * 100)
    : Math.round(((playerIndex + 1) / totalScreens) * 100);

  // Disable Next button logic based on screen rules
  const isNextDisabled = () => {
    if (state.currentModuleId === 'module_02_everyday_cso_work') {
      if ((module2FinalScreenIds as readonly string[]).includes(screenId)) {
        return screenId === 'M2-KC' && !state.m2FinalKnowledgeCheckCompleted;
      }

      if (
        screenId === 'M2-S02' &&
        (
          (state.m2ObjectiveCardsViewed || []).length < 6 &&
          !(state.screenProgress.module_02_everyday_cso_work || []).includes('M2-S02')
        )
      ) {
        return true;
      }
      
      const lockedScreens = [
        'M2-S01A', 'M2-S03', 'M2-S04', 'M2-S05', 'M2-S06', 'M2-S07', 'M2-S08', 'M2-S09', 'M2-S10',
        'M2-S11', 'M2-S12', 'M2-S13', 'M2-S14', 'M2-S15', 'M2-S16', 'M2-S17', 'M2-S18',
        'M2-S19', 'M2-S20', 'M2-S21', 'M2-S22'
      ];
      
      if (lockedScreens.includes(screenId) && !(state.screenProgress.module_02_everyday_cso_work || []).includes(screenId)) {
        return true;
      }
      
      return false;
    } else if (state.currentModuleId === 'module_03_project_design') {
      if (
        screenId.startsWith('M3-R') &&
        !(state.screenProgress.module_03_project_design || []).includes(screenId)
      ) {
        return true;
      }
      return false;
    } else if (state.currentModuleId === 'module_04_implementation') {
      if (
        screenId.startsWith('M4-S1-') &&
        !(state.screenProgress.module_04_implementation || []).includes(screenId)
      ) {
        return true;
      }
      return false;
    } else if (state.currentModuleId === 'module_05_hrba_meal') {
      if (
        (screenId.startsWith('M5-S1-') || screenId.startsWith('M5-R')) &&
        !(state.screenProgress.module_05_hrba_meal || []).includes(screenId)
      ) {
        return true;
      }
      return false;
    } else if (state.currentModuleId === 'final_assessment') {
      return screenId === 'FINAL-ASSESSMENT-QUESTIONS' && !state.finalAssessmentResult;
    } else {
      const practiceCheckState = state.practiceCheckState || {};
      const aboutCardsViewed = Array.isArray(practiceCheckState.module1AboutCourseViewedCards)
        ? practiceCheckState.module1AboutCourseViewedCards
        : [];
      const journeyCardsViewed = Array.isArray(practiceCheckState.module1LearningJourneyViewedCards)
        ? practiceCheckState.module1LearningJourneyViewedCards
        : [];
      const learningCycleViewed = Array.isArray(practiceCheckState.module1LearningCycleViewedSteps)
        ? practiceCheckState.module1LearningCycleViewedSteps
        : [];
      const portfolioFocus = Array.isArray(practiceCheckState.module1FirstSafePortfolioFocus)
        ? practiceCheckState.module1FirstSafePortfolioFocus
        : [];
      const portfolioNote = String(practiceCheckState.module1FirstSafePortfolioNote || '').trim();
      const startingConfidence = practiceCheckState.module1StartingConfidence || {};

      if (screenId === 'M1-S1-01' && !practiceCheckState.module1WelcomeCourseReason) {
        return true; // one relevance point must be selected
      }
      if (screenId === 'M1-S1-02' && aboutCardsViewed.length < 4) {
        return true; // all four about-course cards must be viewed
      }
      if (screenId === 'M1-S1-03' && !practiceCheckState.module1HrbaLensFirstQuestion) {
        return true; // one HRBA lens question must be selected
      }
      if (screenId === 'M1-S1-04' && journeyCardsViewed.length < 5) {
        return true; // all five module roadmap cards must be viewed
      }
      if (screenId === 'M1-S1-05' && learningCycleViewed.length < 6) {
        return true; // all six learning-cycle steps must be viewed
      }
      if (screenId === 'M1-S1-06' && portfolioFocus.length === 0 && !portfolioNote) {
        return true; // safe portfolio focus or note required
      }
      if (screenId === 'M1-S1-06A' && !startingConfidence.submitted) {
        return true; // self-assessment must be submitted
      }
      if (screenId === 'M1-S1-06B' && !practiceCheckState.module1PriorityCommitmentSaved) {
        return true; // commitment must be saved to portfolio
      }
      if (screenId === 'M1-S1-07' && state.m1ConnectedRightsExplored.length < 6) {
        return true; // explore all six connected rights before advancing
      }
      if (screenId === 'M1-S1-08' && state.m1RightsHolderLensViewed.length < 2) {
        return true; // compare both lenses before advancing
      }
      if (
        screenId === 'M1-S2-01' &&
        (
          state.m1ActorCategoriesExplored.length < 3 ||
          state.m1ActorMatchingAnswers['community-members'] !== 'rights-holders' ||
          state.m1ActorMatchingAnswers['water-office'] !== 'duty-bearers' ||
          state.m1ActorMatchingAnswers['local-cso'] !== 'supporting' ||
          state.m1ActorMatchingAnswers['water-committee'] !== 'supporting'
        )
      ) {
        return true; // explore actor categories and complete 4-item matching before advancing
      }
      if (screenId === 'M1-S2-02' && state.m1ParticipationLevelsViewed.length < 5) {
        return true; // explore participation levels before advancing
      }
      if (screenId === 'M1-S2-03' && state.m1HrbaShiftStepsExplored.length < 5) {
        return true; // explore all five HRBA shifts before advancing
      }
      if (screenId === 'M1-S2-04' && !state.m1KnowledgeCheckCompleted) {
        return true; // finish the Module 1 knowledge check result step before advancing
      }
      if (screenId === 'M1-S2-05' && !state.screen16Completed) {
        return true; // complete the self-assessment before choosing a priority area
      }
      if (screenId === 'M1-S3-01' && !state.screen17ActionCommitment.completed) {
        return true; // choose a priority and action commitment before advancing
      }
      if (screenId === 'M1-S3-02' && !state.screen18Completion.completed) {
        return true; // review all five takeaways before moving to the final closing screen
      }
      if (screenId === 'M1-S6-05' && !state.surveyCompleted) {
        // Allow moving on only if survey completed/submitted
        return Object.keys(state.surveyAnswers).length < 16;
      }
      if (screenId === 'M1-S6-08' && state.surveyPriorities.length !== 2) {
        return true; // choose exactly 2 priorities
      }
      if (screenId === 'M1-S7-02' && !state.quizCompleted) {
        return true; // formative quiz required
      }
      return false;
    }
  };

  const activeModule = getHRBAModuleById(state.currentModuleId);
  const moduleTitle = activeModule
    ? activeModule.itemLabel === activeModule.title
      ? activeModule.title
      : `${activeModule.itemLabel}: ${activeModule.title}`
    : 'Module 1: Starting the HRBA Learning Journey';
  return (
    <div
      className="player-container course-shell"
      data-a11y-high-contrast={accessibilityPreferences.highContrast ? 'true' : 'false'}
      data-a11y-text-size={accessibilityPreferences.textSize}
      data-a11y-reduce-motion={accessibilityPreferences.reduceMotion ? 'true' : 'false'}
    >
      <ProgressStrip percentage={progressPercent} />
      {isModule3RevisedFlow && hiddenModule3RedirectQa && (
        <span
          data-qa={hiddenModule3RedirectQa}
          style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)' }}
        >
          Hidden Module 3 route redirected.
        </span>
      )}

      {portalModeActive && (
        <p
          role="status"
          style={{
            margin: '0',
            padding: '0.5rem 1rem',
            backgroundColor: '#ecfdf5',
            borderBottom: '1px solid rgba(22, 163, 74, 0.2)',
            color: '#14532d',
            fontSize: '0.8rem',
            fontWeight: 700,
            lineHeight: 1.4,
            textAlign: 'center',
          }}
        >
          Your course progress is being shared with the CSO Learning Hub. Certificates are issued and verified from the Hub after a passing final assessment result is received.
        </p>
      )}

      <PlayerHeader
        moduleTitle={moduleTitle}
        screenTitle={screenTitle}
        currentIndex={displayedCurrentIndex}
        totalScreens={displayedTotalScreens}
        onPrev={handlePrev}
        onNext={handleNext}
        onExit={onExit}
        prevDisabled={playerIndex === 0}
        nextDisabled={playerIndex >= totalScreens - 1 || isNextDisabled()}
      />

      <div className="player-split-canvas">
        <PlayerSidebar
          onToggleModal={handleToggleModal}
          activeModal={state.activeModal}
          menuButtonRef={menuButtonRef}
          helpButtonRef={helpButtonRef}
          accessibilityButtonRef={accessibilityButtonRef}
          transcriptVisible={state.transcriptVisible}
          onToggleTranscript={() => onChangeState(p => ({ ...p, transcriptVisible: !p.transcriptVisible }))}
          soundEnabled={state.soundState}
          onToggleSound={() => onChangeState(p => ({ ...p, soundState: !p.soundState }))}
          playEnabled={state.captionState}
          onTogglePlay={() => onChangeState(p => ({ ...p, captionState: !p.captionState }))}
          onReplay={handleReplay}
          onExit={onExit}
        />

        <MainScreenCanvas
          ref={mainContentRef}
          className={isWaterPointSequenceScreen ? 'player-main-content--water-sequence' : ''}
        >
          <ScreenRenderer
            screenId={screenId}
            state={state}
            onChangeState={onChangeState}
            onNext={handleNext}
          />

          {state.transcriptVisible && currentScreen && (
            <div
              id="player-transcript-panel"
              className="player-transcript-panel"
            >
              <h4>Closed Captions / Screen Text Transcript</h4>
              <p>
                {currentScreen['Learning/Purpose'] || 'Audio transcript and closed captions descriptions for this learning screen state.'}
              </p>
            </div>
          )}
        </MainScreenCanvas>
      </div>

      <PartnerLogoFooter />

      {/* Menu Drawer Modal */}
      {state.activeModal === 'menu' && (
        <div
          onClick={() => handleToggleModal(null)}
          style={{ position: 'fixed', top: '68px', left: '180px', right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', zIndex: 100 }}
        >
          <div
            id="player-menu-drawer"
            ref={menuDrawerRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '320px',
              height: '100%',
              backgroundColor: 'var(--player-sidebar-bg)',
              borderRight: '1px solid var(--player-sidebar-border)',
              padding: '1.5rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <h3
              ref={menuDrawerTitleRef}
              tabIndex={-1}
              style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-family-headings)' }}
            >
              Jump to Screen
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {playerScreens.map((screen, idx) => {
                const active = idx === playerIndex;
                const menuScreenId = String(screen['Screen/State ID']);
                const menuNumber = isModule3RevisedFlow
                  ? menuScreenId === 'M3-PLAYER-00'
                    ? '0'
                    : String(module3InstructionalScreens.findIndex((item) => item['Screen/State ID'] === menuScreenId) + 1)
                  : String(idx + 1);

                return (
                  <button
                    key={screen['Screen/State ID']}
                    onClick={() => {
                      syncRouteToScreen(state.currentModuleId, menuScreenId);
                      focusMainContentAfterMenuSelectionRef.current = true;
                      onChangeState(prev => ({ ...prev, currentScreenId: screen['Screen/State ID'] }));
                      handleToggleModal(null);
                    }}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '4px',
                      border: active ? '1px solid var(--color-primary)' : '1px solid transparent',
                      backgroundColor: active ? 'rgba(59, 153, 212, 0.15)' : 'transparent',
                      color: active ? '#fff' : '#cbd5e1',
                      textAlign: 'left',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {menuNumber}. {screen['Screen/State Title']}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Help Overlay Guide */}
      {state.activeModal === 'help' && (
        <HelpOverlay onClose={() => handleToggleModal(null)} />
      )}

      {/* Accessibility Modal */}
      {state.activeModal === 'accessibility' && (
        <AccessibilityModal
          onClose={() => handleToggleModal(null)}
          preferences={accessibilityPreferences}
          onUpdatePreferences={setAccessibilityPreferences}
        />
      )}

      {/* Glossary Modal */}
      {state.activeModal === 'glossary' && (
        <GlossaryModal onClose={() => handleToggleModal(null)} />
      )}

      {/* Resources Modal */}
      {state.activeModal === 'resources' && (
        <ResourcesModal onClose={() => handleToggleModal(null)} />
      )}
    </div>
  );
}
