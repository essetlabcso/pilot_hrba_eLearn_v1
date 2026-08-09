import { useEffect, useMemo, useRef, useState } from 'react';
import type { LearningState } from '../../../state/learningState';
import {
  MODULE5_ID,
  MODULE5_SCREEN_ROUTES,
  createEmptyModule5PresentationScreenState,
  ensureModule5PresentationState,
  getModule5PresentationState,
  containsPotentiallySensitiveModule5Text,
  invalidateModule5FinalSummaryForReflection,
  type Module5PresentationReflectionValue,
  type Module5PresentationScreenState,
} from '../../../data/module5/module5EnhancedModel';
import {
  MODULE5_PRESENTATION_CONTENT,
  MODULE5_FINAL_SUMMARY_FIELD_IDS,
  isModule5KnowledgeAnswerCorrect,
  isModule5ReflectionValueReady,
  type Module5KnowledgeQuestion,
  type Module5PresentationScreenId,
  type Module5ReflectionPrompt,
} from '../../../data/module5/module5PresentationContent';
import ResponsiveYouTubePresentation from './ResponsiveYouTubePresentation';
import Module5KnowledgeCheck from './Module5KnowledgeCheck';
import Module5Reflection from './Module5Reflection';
import './module5-presentation.css';

type Props = {
  screenId: Module5PresentationScreenId;
  state: LearningState;
  onChangeState: (updater: (previous: LearningState) => LearningState) => void;
};

function navigate(screenId: string) {
  const route = MODULE5_SCREEN_ROUTES[screenId];
  if (route) window.history.pushState(window.history.state, '', route);
}

function countWords(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function serializeReflectionValue(value: Module5PresentationReflectionValue, detail: string) {
  const primary = Array.isArray(value)
    ? `Most confident: ${value[0] || 'Not selected'}; priority: ${value[1] || 'Not selected'}`
    : value.trim();
  return detail.trim() ? `${primary} — ${detail.trim()}` : primary;
}

function reflectionTextIsSafe(
  prompt: Module5ReflectionPrompt,
  value: Module5PresentationReflectionValue | undefined,
  detail: string,
) {
  const parts = Array.isArray(value) ? value : [String(value || '')];
  if ([...parts, detail].some((item) => containsPotentiallySensitiveModule5Text(item))) return false;
  const maxWords = prompt.maxWords;
  if (maxWords && parts.some((item) => countWords(item) > maxWords)) return false;
  if (prompt.detailMaxWords && countWords(detail) > prompt.detailMaxWords) return false;
  return true;
}

export default function Module5PresentationScreen({ screenId, state, onChangeState }: Props) {
  const content = MODULE5_PRESENTATION_CONTENT[screenId];
  const presentationState = getModule5PresentationState(state.practiceCheckState);
  const stored = presentationState?.screens[screenId] || createEmptyModule5PresentationScreenState();
  const [message, setMessage] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, [screenId]);

  const questionsReady = content.questions.every((question) =>
    stored.checkedIds.includes(question.id) &&
    stored.correctIds.includes(question.id) &&
    isModule5KnowledgeAnswerCorrect(question, stored.answers[question.id] || []));
  const reflectionsReady = content.reflections.every((prompt) =>
    isModule5ReflectionValueReady(prompt, stored.reflectionValues[prompt.id]) &&
    reflectionTextIsSafe(prompt, stored.reflectionValues[prompt.id], stored.reflectionDetails[prompt.id] || ''));
  const canContinue = questionsReady && reflectionsReady;
  const completedCount = content.questions.filter((question) => stored.correctIds.includes(question.id)).length;
  const requiredReflections = content.reflections.filter((prompt) => prompt.required);
  const completedReflections = requiredReflections.filter((prompt) =>
    isModule5ReflectionValueReady(prompt, stored.reflectionValues[prompt.id])).length;

  const status = useMemo(() => {
    if (canContinue) return 'Ready to continue. All knowledge checks and required reflections are complete.';
    return `${completedCount} of 3 knowledge checks correct; ${completedReflections} of ${requiredReflections.length} required reflections complete.`;
  }, [canContinue, completedCount, completedReflections, requiredReflections.length]);

  const updateScreen = (
    update: (current: Module5PresentationScreenState) => Module5PresentationScreenState,
    summaryUpdate?: { prompt: Module5ReflectionPrompt; value: Module5PresentationReflectionValue; detail: string },
  ) => {
    onChangeState((previous) => {
      const nextPresentation = ensureModule5PresentationState(previous.practiceCheckState, previous.completedModules);
      const currentScreen = nextPresentation.screens[screenId] || createEmptyModule5PresentationScreenState();
      const updatedScreen = update(currentScreen);
      let summary = nextPresentation.summary;
      if (summaryUpdate?.prompt.carryForwardField || summaryUpdate?.prompt.carryForwardFields) {
        const revision = updatedScreen.reflectionRevisions[summaryUpdate.prompt.id]
          ?? updatedScreen.reflectionRevision;
        const updates = summaryUpdate.prompt.carryForwardFields && Array.isArray(summaryUpdate.value)
          ? summaryUpdate.prompt.carryForwardFields.map((field, index) => ({
            field,
            value: String(summaryUpdate.value[index] || '').trim(),
          }))
          : [{
            field: summaryUpdate.prompt.carryForwardField as string,
            value: serializeReflectionValue(summaryUpdate.value, summaryUpdate.detail),
          }];
        const values = { ...summary.values };
        const provenance = { ...summary.provenance };
        const reviewRequiredFields = new Set(summary.reviewRequiredFields);
        for (const update of updates) {
          const isFinalizedSummaryField = (
            MODULE5_FINAL_SUMMARY_FIELD_IDS as readonly string[]
          ).includes(update.field) && Boolean(summary.selectedSourceIds[update.field]);
          if (summary.values[update.field]) reviewRequiredFields.add(update.field);
          if (!isFinalizedSummaryField) {
            values[update.field] = update.value;
            provenance[update.field] = {
              screenId,
              reflectionId: summaryUpdate.prompt.id,
              revision,
            };
          }
        }
        summary = {
          ...summary,
          values,
          provenance,
          reviewRequiredFields: [...reviewRequiredFields],
          confirmed: false,
        };
      }
      const moduleCompleted = previous.completedModules.includes(MODULE5_ID);
      const currentProgress = previous.screenProgress[MODULE5_ID] || [];
      let updatedPresentation = {
        ...nextPresentation,
        screens: { ...nextPresentation.screens, [screenId]: updatedScreen },
        summary,
        finalConfirmation: {
          ...nextPresentation.finalConfirmation,
          summaryReviewed: false,
          readyToComplete: false,
        },
      };
      if (summaryUpdate) {
        updatedPresentation = invalidateModule5FinalSummaryForReflection(
          updatedPresentation,
          summaryUpdate.prompt.id,
        );
      }
      return {
        ...previous,
        screenProgress: moduleCompleted
          ? previous.screenProgress
          : {
            ...previous.screenProgress,
            [MODULE5_ID]: currentProgress.filter((id) => id !== screenId),
          },
        practiceCheckState: {
          ...previous.practiceCheckState,
          module5Presentation: updatedPresentation,
        },
      };
    });
  };

  const changeAnswer = (question: Module5KnowledgeQuestion, selected: string[]) => {
    setMessage('Answer saved. Check it to review the approved feedback.');
    updateScreen((current) => ({
      ...current,
      answers: { ...current.answers, [question.id]: selected },
      checkedIds: current.checkedIds.filter((id) => id !== question.id),
      correctIds: current.correctIds.filter((id) => id !== question.id),
      gateSatisfied: false,
      status: 'in_progress',
      completedAt: null,
      updatedAt: new Date().toISOString(),
    }));
  };

  const checkAnswer = (question: Module5KnowledgeQuestion) => {
    const selected = stored.answers[question.id] || [];
    if (!selected.length) {
      setMessage('Choose an answer before checking.');
      return;
    }
    const correct = isModule5KnowledgeAnswerCorrect(question, selected);
    setMessage(correct ? 'Answer checked and saved.' : 'Review the feedback, revise the answer and check again.');
    updateScreen((current) => ({
      ...current,
      checkedIds: [...new Set([...current.checkedIds, question.id])],
      correctIds: correct
        ? [...new Set([...current.correctIds, question.id])]
        : current.correctIds.filter((id) => id !== question.id),
      gateSatisfied: false,
      status: 'in_progress',
      completedAt: null,
      updatedAt: new Date().toISOString(),
    }));
  };

  const changeReflection = (prompt: Module5ReflectionPrompt, value: Module5PresentationReflectionValue) => {
    const currentDetail = stored.reflectionDetails[prompt.id] || '';
    setMessage('Reflection saved.');
    updateScreen((current) => ({
      ...current,
      reflectionValues: { ...current.reflectionValues, [prompt.id]: value },
      reflectionRevision: current.reflectionRevision + 1,
      reflectionRevisions: {
        ...current.reflectionRevisions,
        [prompt.id]: (current.reflectionRevisions[prompt.id] || 0) + 1,
      },
      gateSatisfied: false,
      status: 'in_progress',
      completedAt: null,
      updatedAt: new Date().toISOString(),
    }), { prompt, value, detail: currentDetail });
  };

  const changeReflectionDetail = (prompt: Module5ReflectionPrompt, detail: string) => {
    const currentValue = stored.reflectionValues[prompt.id] || '';
    setMessage('Reflection detail saved.');
    updateScreen((current) => ({
      ...current,
      reflectionDetails: { ...current.reflectionDetails, [prompt.id]: detail },
      reflectionRevision: current.reflectionRevision + 1,
      reflectionRevisions: {
        ...current.reflectionRevisions,
        [prompt.id]: (current.reflectionRevisions[prompt.id] || 0) + 1,
      },
      gateSatisfied: false,
      status: 'in_progress',
      completedAt: null,
      updatedAt: new Date().toISOString(),
    }), { prompt, value: currentValue, detail });
  };

  const continueJourney = () => {
    if (!canContinue) {
      setMessage('Complete all three knowledge checks and every required reflection before continuing.');
      return;
    }
    onChangeState((previous) => {
      const nextPresentation = ensureModule5PresentationState(previous.practiceCheckState, previous.completedModules);
      const currentScreen = nextPresentation.screens[screenId] || stored;
      const progress = previous.screenProgress[MODULE5_ID] || [];
      return {
        ...previous,
        currentScreenId: content.nextScreenId,
        screenProgress: {
          ...previous.screenProgress,
          [MODULE5_ID]: progress.includes(screenId) ? progress : [...progress, screenId],
        },
        practiceCheckState: {
          ...previous.practiceCheckState,
          module5Presentation: {
            ...nextPresentation,
            screens: {
              ...nextPresentation.screens,
              [screenId]: {
                ...currentScreen,
                gateSatisfied: true,
                status: 'completed',
                completedAt: currentScreen.completedAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            },
          },
        },
      };
    });
    navigate(content.nextScreenId);
  };

  return (
    <main className="m5p-screen" aria-labelledby={`m5p-title-${content.number}`}>
      <article className="m5p-shell">
        <header className="m5p-hero">
          <p className="m5p-eyebrow">MODULE 5 · SCREEN {content.number} OF 16</p>
          <span className="m5p-stage">Presentation · Check · Reflect</span>
          <h1 id={`m5p-title-${content.number}`} ref={titleRef} tabIndex={-1}>{content.title}</h1>
          <p>Watch or review the accessible presentation summary, apply the idea, and retain a concise reflection for the later Module 5 summary.</p>
        </header>

        {presentationState?.migration.legacyWorkspacePresent && !presentationState.screens[screenId] && (
          <aside className="m5p-notice" role="note">
            <strong>Earlier Module 5 work preserved</strong>
            <span>Your earlier saved work remains preserved, but it does not answer or complete this presentation screen.</span>
          </aside>
        )}

        <ResponsiveYouTubePresentation
          title={content.title}
          embedUrl={content.embedUrl}
          watchUrl={content.watchUrl}
        />

        <details className="m5p-summary">
          <summary>Read the accessible presentation summary</summary>
          <p>{content.accessibilitySummary}</p>
        </details>

        <Module5KnowledgeCheck
          questions={content.questions}
          answers={stored.answers}
          checkedIds={stored.checkedIds}
          correctIds={stored.correctIds}
          onChangeAnswer={changeAnswer}
          onCheckAnswer={checkAnswer}
        />

        <Module5Reflection
          prompts={content.reflections}
          values={stored.reflectionValues}
          details={stored.reflectionDetails}
          safeInputGuidance={content.safeInputGuidance}
          onChangeValue={changeReflection}
          onChangeDetail={changeReflectionDetail}
        />

        {message && (
          <p className="m5p-message" role="status" aria-live="polite">{message}</p>
        )}
        <section className="m5p-saved" role="status" aria-live="polite">
          <strong>Saved status</strong>
          <span>{status} Work is retained for this learner after refresh.</span>
        </section>
        <footer className="m5p-actions">
          <div>
            <h2>{canContinue ? 'Ready for the next screen' : 'Complete this screen'}</h2>
            <p>Progress is recorded only when the complete screen gate is satisfied and you select Continue.</p>
          </div>
          <button type="button" className="m5p-primary" disabled={!canContinue} onClick={continueJourney}>
            Continue
          </button>
        </footer>
      </article>
    </main>
  );
}
