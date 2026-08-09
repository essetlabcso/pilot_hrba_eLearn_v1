import { useEffect, useRef, useState } from 'react';
import type { LearningState } from '../../../state/learningState';
import {
  MODULE5_ID,
  advanceModule5FinalKnowledgeQuestion,
  checkModule5FinalKnowledgeAnswer,
  completeModule5FinalJourney,
  confirmModule5FinalSummary,
  containsPotentiallySensitiveModule5Text,
  editModule5FinalSummaryField,
  ensureModule5PresentationState,
  getModule5FinalCompletionReadiness,
  getModule5FinalSummaryCandidates,
  getModule5FinalSummaryReadiness,
  keepEditedModule5FinalSummaryField,
  retryMissedModule5FinalKnowledgeQuestions,
  seedModule5FinalSummary,
  selectModule5FinalKnowledgeAnswer,
  selectModule5FinalSummaryCandidate,
  updateModule5FinalConfirmation,
  type Module5CanonicalScreenId,
  type Module5PresentationState,
} from '../../../data/module5/module5EnhancedModel';
import {
  MODULE5_FINAL_KNOWLEDGE_PASS_SCORE,
  MODULE5_FINAL_KNOWLEDGE_QUESTIONS,
  MODULE5_FINAL_SUMMARY_FIELDS,
  type Module5FinalSummaryFieldId,
} from '../../../data/module5/module5PresentationContent';
import './module5-final.css';

type Props = {
  screenId: Extract<Module5CanonicalScreenId, 'M5-R13' | 'M5-R14' | 'M5-PLAYER-COMPLETE'>;
  state: LearningState;
  onChangeState: (updater: (previous: LearningState) => LearningState) => void;
};

function setRoute(path: string) {
  window.history.pushState(window.history.state, '', path);
}

function wordCount(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function updatePresentation(
  onChangeState: Props['onChangeState'],
  update: (current: Module5PresentationState) => Module5PresentationState,
) {
  onChangeState((previous) => {
    const current = ensureModule5PresentationState(
      previous.practiceCheckState,
      previous.completedModules,
    );
    const next = update(current);
    if (next === current) return previous;
    return {
      ...previous,
      practiceCheckState: {
        ...previous.practiceCheckState,
        module5Presentation: next,
      },
    };
  });
}

function FinalHeader({
  screen,
  title,
  children,
}: {
  screen: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="m5f-hero">
      <p className="m5f-eyebrow">MODULE 5 · SCREEN {screen} OF 16</p>
      <h1 tabIndex={-1}>{title}</h1>
      <div>{children}</div>
    </header>
  );
}

function FinalKnowledgeCheck({ state, onChangeState }: Omit<Props, 'screenId'>) {
  const presentation = ensureModule5PresentationState(
    state.practiceCheckState,
    state.completedModules,
  );
  const check = presentation.finalKnowledgeCheck;
  const activeId = check.questionQueue[check.activeQuestionIndex];
  const question = MODULE5_FINAL_KNOWLEDGE_QUESTIONS.find((item) => item.id === activeId)
    || MODULE5_FINAL_KNOWLEDGE_QUESTIONS[0];
  const selected = check.answers[question.id]?.[0] || '';
  const checked = check.checkedIds.includes(question.id);
  const correct = check.correctIds.includes(question.id);
  const selectedOption = question.options.find((option) => option.id === selected);
  const resultRef = useRef<HTMLElement>(null);
  const questionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (check.mode === 'passed' || check.mode === 'results') {
      resultRef.current?.focus();
    } else {
      questionRef.current?.focus();
    }
  }, [check.mode, check.activeQuestionIndex]);

  const selectAnswer = (optionId: string) => {
    updatePresentation(onChangeState, (current) =>
      selectModule5FinalKnowledgeAnswer(current, question.id, optionId));
  };

  const checkAnswer = () => {
    onChangeState((previous) => {
      const current = ensureModule5PresentationState(
        previous.practiceCheckState,
        previous.completedModules,
      );
      const next = checkModule5FinalKnowledgeAnswer(current, question.id);
      if (next === current) return previous;
      const passedNow = next.finalKnowledgeCheck.passed;
      const progress = previous.screenProgress[MODULE5_ID] || [];
      return {
        ...previous,
        screenProgress: passedNow
          ? {
            ...previous.screenProgress,
            [MODULE5_ID]: [...new Set([...progress, 'M5-R13'])],
          }
          : previous.screenProgress,
        practiceCheckState: {
          ...previous.practiceCheckState,
          module5Presentation: next,
        },
      };
    });
  };

  const advance = () => {
    updatePresentation(onChangeState, advanceModule5FinalKnowledgeQuestion);
  };

  const retry = () => {
    updatePresentation(onChangeState, retryMissedModule5FinalKnowledgeQuestions);
  };

  const continueToSummary = () => {
    if (!check.passed || check.score < MODULE5_FINAL_KNOWLEDGE_PASS_SCORE) return;
    onChangeState((previous) => ({ ...previous, currentScreenId: 'M5-R14' }));
    setRoute('/module-5/screen-5-14');
  };

  const retainedQuestions = MODULE5_FINAL_KNOWLEDGE_QUESTIONS.filter((item) =>
    check.correctIds.includes(item.id));
  const missedReview = MODULE5_FINAL_KNOWLEDGE_QUESTIONS.flatMap((item) => {
    if (!check.retryIds.includes(item.id)) return [];
    const selectedId = check.answers[item.id]?.[0];
    const selectedAnswer = item.options.find((option) => option.id === selectedId);
    return selectedAnswer ? [{ question: item, option: selectedAnswer }] : [];
  });

  if (check.mode === 'passed') {
    return (
      <main className="m5f-screen" aria-labelledby="m5f-kc-title">
        <article className="m5f-shell">
          <FinalHeader screen={14} title="Knowledge Check: From Evidence to Action">
            <p>You have completed the integrated Module 5 knowledge check.</p>
          </FinalHeader>
          <section className="m5f-result" ref={resultRef} tabIndex={-1} role="status" aria-live="polite">
            <p className="m5f-eyebrow">Knowledge-check result</p>
            <h2 id="m5f-kc-title">You passed with {check.score} out of 8.</h2>
            <p>Your correct answers and first valid pass time are retained after refresh.</p>
            {selectedOption && (
              <div className="m5f-feedback is-correct">
                <strong>Latest checked answer</strong>
                <p>{selectedOption.feedback}</p>
              </div>
            )}
            <details>
              <summary>Review retained correct answers</summary>
              <ol>
                {retainedQuestions.map((item) => (
                  <li key={item.id}>
                    <strong>{item.id}</strong> — {item.prompt}
                  </li>
                ))}
              </ol>
            </details>
            {missedReview.length > 0 && (
              <details>
                <summary>Review the missed answer</summary>
                {missedReview.map(({ question: missedQuestion, option: missedOption }) => (
                  <div key={missedQuestion.id}>
                    <strong>{missedQuestion.id}</strong>
                    <p>{missedOption.feedback}</p>
                  </div>
                ))}
              </details>
            )}
            <button type="button" className="m5f-primary" onClick={continueToSummary}>
              Continue to learning summary
            </button>
          </section>
        </article>
      </main>
    );
  }

  if (check.mode === 'results') {
    return (
      <main className="m5f-screen" aria-labelledby="m5f-kc-title">
        <article className="m5f-shell">
          <FinalHeader screen={14} title="Knowledge Check: From Evidence to Action">
            <p>Review the result, then retry only the questions you missed.</p>
          </FinalHeader>
          <section className="m5f-result" ref={resultRef} tabIndex={-1} role="status" aria-live="polite">
            <p className="m5f-eyebrow">Knowledge-check result</p>
            <h2 id="m5f-kc-title">You answered {check.score} out of 8 correctly.</h2>
            <p>You need 7 out of 8. Your {check.correctIds.length} correct answer(s) remain retained.</p>
            <div className="m5f-missed-feedback">
              {missedReview.map(({ question: missedQuestion, option: missedOption }) => (
                <div key={missedQuestion.id}>
                  <strong>{missedQuestion.id}</strong>
                  <p>{missedOption.feedback}</p>
                </div>
              ))}
            </div>
            <button type="button" className="m5f-primary" onClick={retry}>
              Retry missed questions
            </button>
          </section>
        </article>
      </main>
    );
  }

  const lastQuestion = check.activeQuestionIndex === check.questionQueue.length - 1;
  return (
    <main className="m5f-screen" aria-labelledby="m5f-kc-title">
      <article className="m5f-shell">
        <FinalHeader screen={14} title="Knowledge Check: From Evidence to Action">
          <p>Apply the complete HRBA MEAL journey to eight concise decisions.</p>
          <p>You need <strong>7 out of 8</strong>. There is no penalty, and any retry contains only missed questions.</p>
        </FinalHeader>

        <section className="m5f-progress" aria-label={`Question ${check.activeQuestionIndex + 1} of ${check.questionQueue.length}`}>
          <span>{check.mode === 'retry' ? 'Retry' : 'First attempt'}</span>
          <strong>Question {check.activeQuestionIndex + 1} of {check.questionQueue.length}</strong>
          <progress value={check.activeQuestionIndex + 1} max={check.questionQueue.length} />
        </section>

        {check.mode === 'retry' && retainedQuestions.length > 0 && (
          <details className="m5f-retained">
            <summary>{retainedQuestions.length} correct answer(s) retained</summary>
            <ul>{retainedQuestions.map((item) => <li key={item.id}>{item.id}</li>)}</ul>
          </details>
        )}

        <section className="m5f-question" ref={questionRef} tabIndex={-1}>
          <p className="m5f-eyebrow">{question.id}</p>
          <fieldset>
            <legend id="m5f-kc-title">{question.prompt}</legend>
            <div className="m5f-options">
              {question.options.map((option) => (
                <label key={option.id} className={selected === option.id ? 'is-selected' : ''}>
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={selected === option.id}
                    disabled={checked}
                    onChange={() => selectAnswer(option.id)}
                  />
                  <span aria-hidden="true">{option.id}</span>
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {checked && selectedOption && (
            <div className={correct ? 'm5f-feedback is-correct' : 'm5f-feedback is-review'} role="status" aria-live="polite">
              <strong>{correct ? 'Correct.' : 'Review this decision.'}</strong>
              <p>{selectedOption.feedback}</p>
            </div>
          )}

          <div className="m5f-actions">
            {!checked ? (
              <button type="button" className="m5f-primary" disabled={!selected} onClick={checkAnswer}>
                Check answer
              </button>
            ) : (
              <button type="button" className="m5f-primary" onClick={advance} disabled={lastQuestion}>
                Next question
              </button>
            )}
          </div>
        </section>
      </article>
    </main>
  );
}

function SummaryScreen({ state, onChangeState }: Omit<Props, 'screenId'>) {
  const presentation = ensureModule5PresentationState(
    state.practiceCheckState,
    state.completedModules,
  );
  const [editing, setEditing] = useState<Module5FinalSummaryFieldId | null>(null);
  const [explicitConfirmation, setExplicitConfirmation] = useState(false);
  const [message, setMessage] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
    updatePresentation(onChangeState, seedModule5FinalSummary);
  }, [onChangeState]);

  const readiness = getModule5FinalSummaryReadiness(presentation);
  const values = presentation.summary.values;

  const chooseCandidate = (fieldId: Module5FinalSummaryFieldId, reflectionId: string) => {
    setExplicitConfirmation(false);
    setMessage('Carried response selected. Review the summary before confirming.');
    updatePresentation(onChangeState, (current) =>
      selectModule5FinalSummaryCandidate(current, fieldId, reflectionId));
  };

  const editField = (fieldId: Module5FinalSummaryFieldId, value: string) => {
    setExplicitConfirmation(false);
    setMessage('Limited edit saved. Review the summary before confirming.');
    updatePresentation(onChangeState, (current) =>
      editModule5FinalSummaryField(current, fieldId, value));
  };

  const keepEdit = (fieldId: Module5FinalSummaryFieldId) => {
    setMessage('Your learner-edited wording is preserved and its carried-forward source is current.');
    updatePresentation(onChangeState, (current) =>
      keepEditedModule5FinalSummaryField(current, fieldId));
  };

  const confirm = () => {
    if (!explicitConfirmation || !readiness.ready) return;
    onChangeState((previous) => {
      const current = seedModule5FinalSummary(ensureModule5PresentationState(
        previous.practiceCheckState,
        previous.completedModules,
      ));
      const confirmed = confirmModule5FinalSummary(current, true);
      if (!confirmed.summary.confirmed) return previous;
      const progress = previous.screenProgress[MODULE5_ID] || [];
      return {
        ...previous,
        currentScreenId: 'M5-PLAYER-COMPLETE',
        screenProgress: {
          ...previous.screenProgress,
          [MODULE5_ID]: [...new Set([...progress, 'M5-R14'])],
        },
        practiceCheckState: {
          ...previous.practiceCheckState,
          module5Presentation: confirmed,
        },
      };
    });
    setRoute('/module-5/complete');
  };

  return (
    <main className="m5f-screen" aria-labelledby="m5f-summary-title">
      <article className="m5f-shell">
        <header className="m5f-hero">
          <p className="m5f-eyebrow">MODULE 5 · SCREEN 15 OF 16</p>
          <h1 id="m5f-summary-title" ref={titleRef} tabIndex={-1}>
            Build Your HRBA MEAL, Accountability and Adaptation Canvas
          </h1>
          <p>Review a concise learning and future-support summary carried from Screens 2–13. Select the strongest response where alternatives exist; rewriting is optional.</p>
        </header>

        <aside className="m5f-note" role="note">
          This Canvas is not an organisational diagnostic or workplace MEAL plan. Keep every value generalized and non-identifying.
        </aside>

        <section className="m5f-summary-grid" aria-label="Nine-field Module 5 learning summary">
          {MODULE5_FINAL_SUMMARY_FIELDS.map((field) => {
            const candidates = getModule5FinalSummaryCandidates(presentation, field.id);
            const selectedSourceId = presentation.summary.selectedSourceIds[field.id]
              || candidates[0]?.reflectionId;
            const value = values[field.id] || candidates[0]?.value || '';
            const needsReview = presentation.summary.reviewRequiredFields.includes(field.id);
            const learnerEdited = presentation.summary.learnerEditedFields.includes(field.id);
            const unsafe = containsPotentiallySensitiveModule5Text(value);
            const tooLong = wordCount(value) > field.maxWords;
            const badge = needsReview
              ? 'Needs review'
              : learnerEdited
                ? 'Learner edited'
                : 'Carried forward';
            return (
              <article className={needsReview ? 'm5f-summary-card needs-review' : 'm5f-summary-card'} key={field.id}>
                <div className="m5f-summary-card__heading">
                  <div>
                    <h2>{field.label}</h2>
                    <p>{field.guidance}</p>
                  </div>
                  <span>{badge}</span>
                </div>

                {candidates.length > 1 && (
                  <fieldset className="m5f-candidates">
                    <legend>Choose one carried response</legend>
                    {candidates.map((candidate) => (
                      <label key={`${candidate.reflectionId}-${candidate.value}`}>
                        <input
                          type="radio"
                          name={`source-${field.id}`}
                          checked={selectedSourceId === candidate.reflectionId}
                          onChange={() => chooseCandidate(field.id, candidate.reflectionId)}
                        />
                        <span>
                          <strong>{candidate.reflectionId}</strong>
                          {candidate.value}
                        </span>
                      </label>
                    ))}
                  </fieldset>
                )}

                {candidates.length === 1 && (
                  <p className="m5f-carried">
                    <strong>{candidates[0].reflectionId}</strong>
                    {candidates[0].value}
                  </p>
                )}

                <p className="m5f-current-value"><strong>Selected summary value:</strong> {value || 'Not yet available'}</p>

                <button
                  type="button"
                  className="m5f-secondary"
                  aria-expanded={editing === field.id}
                  onClick={() => setEditing(editing === field.id ? null : field.id)}
                >
                  {editing === field.id ? 'Close limited edit' : 'Make a limited edit'}
                </button>

                {editing === field.id && (
                  <label className="m5f-edit">
                    <span>Edit {field.label}</span>
                    <textarea
                      rows={2}
                      value={value}
                      onChange={(event) => editField(field.id, event.target.value)}
                      aria-invalid={unsafe || tooLong || undefined}
                    />
                    <small>{wordCount(value)} of {field.maxWords} words. Use generalized wording.</small>
                  </label>
                )}

                {needsReview && (
                  <div className="m5f-review-actions" role="status">
                    <p>An earlier carried response changed. Select a current response above or explicitly keep your edited wording.</p>
                    {selectedSourceId && (
                      <button
                        type="button"
                        className="m5f-secondary"
                        onClick={() => chooseCandidate(field.id, selectedSourceId)}
                      >
                        Use refreshed response
                      </button>
                    )}
                    {learnerEdited && (
                      <button type="button" className="m5f-secondary" onClick={() => keepEdit(field.id)}>
                        Keep my edited wording
                      </button>
                    )}
                  </div>
                )}
                {(unsafe || tooLong) && (
                  <p className="m5f-error" role="alert">
                    {unsafe ? 'Remove possible identifying or sensitive detail. ' : ''}
                    {tooLong ? `Shorten this value to ${field.maxWords} words.` : ''}
                  </p>
                )}
              </article>
            );
          })}
        </section>

        {message && <p className="m5f-message" role="status" aria-live="polite">{message}</p>}
        <section className="m5f-confirm-card">
          <label>
            <input
              type="checkbox"
              checked={explicitConfirmation}
              disabled={!readiness.ready}
              onChange={(event) => setExplicitConfirmation(event.target.checked)}
            />
            <span>I reviewed this concise learning and future-support summary and confirm that it reflects my current Module 5 priorities.</span>
          </label>
          <p role="status" aria-live="polite">
            {readiness.ready
              ? 'All nine fields are current and ready for confirmation.'
              : `${readiness.invalidFields.length} field(s) are incomplete or invalid; ${readiness.reviewRequiredFields.length} field(s) need review.`}
          </p>
          <button
            type="button"
            className="m5f-primary"
            disabled={!readiness.ready || !explicitConfirmation}
            onClick={confirm}
          >
            Confirm learning summary
          </button>
        </section>
      </article>
    </main>
  );
}

function CompletionScreen({ state, onChangeState }: Omit<Props, 'screenId'>) {
  const presentation = ensureModule5PresentationState(
    state.practiceCheckState,
    state.completedModules,
  );
  const moduleProgress = state.screenProgress[MODULE5_ID] || [];
  const historicalCompletion = state.completedModules.includes(MODULE5_ID);
  const readiness = getModule5FinalCompletionReadiness(presentation, moduleProgress);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reviewFields = [
    'priority_result_or_question',
    'missing_perspective',
    'cycle_break_point',
    'future_meal_knowledge',
    'future_meal_skill',
    'future_meal_tool',
    'peer_learning_question',
    'support_need',
  ] as const;

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const updateConfirmation = (
    key: 'summaryReviewed' | 'evidenceUseUnderstood' | 'readyToComplete',
    checked: boolean,
  ) => {
    updatePresentation(onChangeState, (current) =>
      updateModule5FinalConfirmation(current, key, checked));
  };

  const complete = () => {
    if (!readiness.ready && !historicalCompletion) return;
    onChangeState((previous) => {
      const current = ensureModule5PresentationState(
        previous.practiceCheckState,
        previous.completedModules,
      );
      const completed = completeModule5FinalJourney({
        screenProgress: previous.screenProgress,
        completedModules: previous.completedModules,
        module5Presentation: current,
      });
      return {
        ...previous,
        currentLayer: 'player',
        currentModuleId: 'final_assessment',
        currentScreenId: 'FINAL-ASSESSMENT-PLAYER-00',
        completedModules: completed.completedModules,
        screenProgress: completed.screenProgress,
        practiceCheckState: {
          ...previous.practiceCheckState,
          module5Presentation: completed.module5Presentation,
        },
      };
    });
    setRoute('/final-assessment/cover');
  };

  const confirmations = [
    {
      key: 'summaryReviewed' as const,
      label: 'I have reviewed my Module 5 learning summary.',
    },
    {
      key: 'evidenceUseUnderstood' as const,
      label: 'I understand that MEAL evidence should support decisions, accountability and learning.',
    },
    {
      key: 'readyToComplete' as const,
      label: 'I am ready to complete Module 5 and continue to the Final Assessment.',
    },
  ];

  return (
    <main className="m5f-screen" aria-labelledby="m5f-complete-title">
      <article className="m5f-shell">
        <header className="m5f-hero">
          <p className="m5f-eyebrow">MODULE 5 · SCREEN 16 OF 16</p>
          <h1 id="m5f-complete-title" ref={titleRef} tabIndex={-1}>Portfolio Review and Module Closure</h1>
          <p>Review the priorities you are carrying forward from Module 5. This is a learning and support summary, not a workplace MEAL plan.</p>
        </header>

        {historicalCompletion && (
          <aside className="m5f-note" role="status">
            Your historical Module 5 completion remains preserved. You may review this closure without losing or duplicating completion.
          </aside>
        )}

        <section className="m5f-closure-review" aria-labelledby="m5f-review-title">
          <h2 id="m5f-review-title">Your concise learning summary</h2>
          <dl>
            {reviewFields.map((fieldId) => {
              const definition = MODULE5_FINAL_SUMMARY_FIELDS.find((field) => field.id === fieldId);
              return (
                <div key={fieldId}>
                  <dt>{definition?.label}</dt>
                  <dd>{presentation.summary.values[fieldId] || 'Not yet confirmed'}</dd>
                </div>
              );
            })}
          </dl>
        </section>

        <section className="m5f-confirm-card" aria-labelledby="m5f-confirm-title">
          <h2 id="m5f-confirm-title">Confirm module closure</h2>
          {confirmations.map((confirmation) => (
            <label key={confirmation.key}>
              <input
                type="checkbox"
                checked={presentation.finalConfirmation[confirmation.key]}
                disabled={!presentation.summary.confirmed && !historicalCompletion}
                onChange={(event) => updateConfirmation(confirmation.key, event.target.checked)}
              />
              <span>{confirmation.label}</span>
            </label>
          ))}
          <p role="status" aria-live="polite">
            {historicalCompletion
              ? 'Earlier completion is preserved. Continue when you are ready.'
              : readiness.ready
                ? 'All Module 5 completion requirements are satisfied.'
                : 'Complete the current learning summary and all three confirmations before finishing Module 5.'}
          </p>
          <button
            type="button"
            className="m5f-primary"
            disabled={!readiness.ready && !historicalCompletion}
            onClick={complete}
          >
            Complete Module 5 and continue to Final Assessment
          </button>
        </section>
      </article>
    </main>
  );
}

export default function Module5FinalScreens(props: Props) {
  if (props.screenId === 'M5-R13') return <FinalKnowledgeCheck {...props} />;
  if (props.screenId === 'M5-R14') return <SummaryScreen {...props} />;
  return <CompletionScreen {...props} />;
}
