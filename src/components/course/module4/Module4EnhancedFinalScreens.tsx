import type { LearningState } from '../../../state/learningState';
import {
  MODULE4_SCREEN_ROUTES,
  migrateModule4EnhancedState,
  recordModule4EnhancedScreenCompletion,
  type Module4EnhancedState,
  type Module4KnowledgeChoiceId,
} from '../../../data/module4/module4EnhancedModel';
import {
  MODULE4_KNOWLEDGE_PASS_SCORE,
  MODULE4_KNOWLEDGE_QUESTIONS,
  advanceModule4KnowledgeQuestion,
  checkModule4KnowledgeAnswer,
  completeModule4FinalScreen,
  getModule4FinalReadiness,
  retryMissedModule4KnowledgeQuestions,
  selectModule4KnowledgeAnswer,
  updateModule4CompletionConfirmation,
} from '../../../data/module4/module4EnhancedFinalRules';

type Props = {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
};

function setRoute(path: string) {
  if (typeof window !== 'undefined') window.history.pushState(null, '', path);
}

function currentEnhancedState(state: LearningState): Module4EnhancedState {
  const migration = migrateModule4EnhancedState({
    practiceCheckState: state.practiceCheckState,
    screenProgress: state.screenProgress,
    completedModules: state.completedModules,
  });
  return migration.practiceCheckState.module4Enhanced as Module4EnhancedState;
}

function updateEnhancedState(
  onChangeState: Props['onChangeState'],
  updater: (state: Module4EnhancedState) => Module4EnhancedState,
) {
  onChangeState((prev) => {
    const migration = migrateModule4EnhancedState({
      practiceCheckState: prev.practiceCheckState,
      screenProgress: prev.screenProgress,
      completedModules: prev.completedModules,
    });
    const enhanced = migration.practiceCheckState.module4Enhanced as Module4EnhancedState;
    return {
      ...prev,
      screenProgress: migration.screenProgress,
      completedModules: migration.completedModules,
      practiceCheckState: {
        ...migration.practiceCheckState,
        module4Enhanced: updater(enhanced),
      },
    };
  });
}

function FinalScreenHeader({
  screenNumber,
  titleId,
  title,
  children,
}: {
  screenNumber: number;
  titleId: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="m4-enhanced-final__header">
      <p className="m4-enhanced-screen__eyebrow">Module 4 · Screen {screenNumber}</p>
      <h1 id={titleId}>{title}</h1>
      <div className="m4-enhanced-final__introduction">{children}</div>
    </header>
  );
}

export function Module4EnhancedKnowledgeCheck({ state, onChangeState }: Props) {
  const enhanced = currentEnhancedState(state);
  const check = enhanced.finalScreens.knowledgeCheck;
  const activeQuestionId = check.questionQueue[check.activeQuestionIndex];
  const question = MODULE4_KNOWLEDGE_QUESTIONS.find((item) => item.id === activeQuestionId)
    || MODULE4_KNOWLEDGE_QUESTIONS[0];
  const selected = check.answers[question.id];
  const checked = check.checkedQuestionIds.includes(question.id);
  const selectedChoice = question.choices.find((choice) => choice.id === selected);
  const retrying = check.mode === 'retry';

  const selectAnswer = (answer: Module4KnowledgeChoiceId) => {
    updateEnhancedState(
      onChangeState,
      (current) => selectModule4KnowledgeAnswer(current, question.id, answer),
    );
  };

  const checkAnswer = () => {
    updateEnhancedState(
      onChangeState,
      (current) => checkModule4KnowledgeAnswer(current, question.id),
    );
  };

  const nextQuestion = () => {
    updateEnhancedState(onChangeState, advanceModule4KnowledgeQuestion);
  };

  const retryMissed = () => {
    updateEnhancedState(onChangeState, retryMissedModule4KnowledgeQuestions);
  };

  const continueToConfirmation = () => {
    if (!check.passed || check.score < MODULE4_KNOWLEDGE_PASS_SCORE) return;
    onChangeState((prev) => {
      const migration = migrateModule4EnhancedState({
        practiceCheckState: prev.practiceCheckState,
        screenProgress: prev.screenProgress,
        completedModules: prev.completedModules,
      });
      const current = migration.practiceCheckState.module4Enhanced as Module4EnhancedState;
      const completed = recordModule4EnhancedScreenCompletion(
        { screenProgress: migration.screenProgress, module4Enhanced: current },
        'M4-S1-13',
        current.finalScreens.knowledgeCheck.passed
          && current.finalScreens.knowledgeCheck.score >= MODULE4_KNOWLEDGE_PASS_SCORE,
      );
      if (!completed.module4Enhanced.screens['M4-S1-13'].gateSatisfied) return prev;
      return {
        ...prev,
        currentScreenId: 'M4-S1-14',
        screenProgress: completed.screenProgress,
        practiceCheckState: {
          ...migration.practiceCheckState,
          module4Enhanced: completed.module4Enhanced,
        },
      };
    });
    setRoute(MODULE4_SCREEN_ROUTES['M4-S1-14']);
  };

  if (check.mode === 'passed') {
    return (
      <main className="m4-enhanced-screen m4-enhanced-final" aria-labelledby="m4-final-kc-title">
        <FinalScreenHeader screenNumber={14} titleId="m4-final-kc-title" title="Check your implementation decisions">
          <p>You completed the Module 4 knowledge check.</p>
        </FinalScreenHeader>
        <section className="m4-enhanced-final__card m4-enhanced-final__result" role="status" aria-live="polite">
          <p className="m4-enhanced-kicker">Knowledge check result</p>
          <h2>You passed with {check.score} out of 8.</h2>
          <p>Continue to the Module 4 confirmation.</p>
          <button type="button" className="m4-enhanced-button is-primary" onClick={continueToConfirmation}>
            Continue to final confirmation
          </button>
        </section>
      </main>
    );
  }

  if (check.mode === 'results') {
    return (
      <main className="m4-enhanced-screen m4-enhanced-final" aria-labelledby="m4-final-kc-title">
        <FinalScreenHeader screenNumber={14} titleId="m4-final-kc-title" title="Check your implementation decisions">
          <p>You have completed this round of the knowledge check.</p>
        </FinalScreenHeader>
        <section className="m4-enhanced-final__card m4-enhanced-final__result" role="status" aria-live="polite">
          <p className="m4-enhanced-kicker">Knowledge check result</p>
          <h2>You answered {check.score} out of 8 correctly.</h2>
          <p>Retry the missed questions.</p>
          <button type="button" className="m4-enhanced-button is-primary" onClick={retryMissed}>
            Retry missed questions
          </button>
        </section>
      </main>
    );
  }

  const lastQuestion = check.activeQuestionIndex === check.questionQueue.length - 1;
  return (
    <main className="m4-enhanced-screen m4-enhanced-final" aria-labelledby="m4-final-kc-title">
      <FinalScreenHeader screenNumber={14} titleId="m4-final-kc-title" title="Check your implementation decisions">
        <p>Answer eight short questions about applying HRBA during implementation.</p>
        <p>Choose one answer for each question. You need <strong>7 out of 8</strong> to pass. If needed, you will retry only the questions you missed.</p>
      </FinalScreenHeader>

      <div className="m4-enhanced-final__progress" aria-label={`Question ${check.activeQuestionIndex + 1} of ${check.questionQueue.length}`}>
        <div>
          <strong>{retrying ? 'Retry' : 'Knowledge check'}</strong>
          <span>Question {check.activeQuestionIndex + 1} of {check.questionQueue.length}</span>
        </div>
        <progress value={check.activeQuestionIndex + 1} max={check.questionQueue.length}>
          Question {check.activeQuestionIndex + 1} of {check.questionQueue.length}
        </progress>
      </div>

      <section className="m4-enhanced-final__card m4-enhanced-final__question-card">
        <p className="m4-enhanced-kicker">{question.title}</p>
        <fieldset>
          <legend>{question.question}</legend>
          <div className="m4-enhanced-final__choices">
            {question.choices.map((choice) => (
              <label
                key={choice.id}
                className={[
                  selected === choice.id ? 'is-selected' : '',
                  checked && choice.correct ? 'is-correct' : '',
                ].filter(Boolean).join(' ')}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={choice.id}
                  checked={selected === choice.id}
                  disabled={checked}
                  onChange={() => selectAnswer(choice.id)}
                />
                <span className="m4-enhanced-final__choice-id" aria-hidden="true">{choice.id}</span>
                <span>{choice.text}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="m4-enhanced-final__feedback" role="status" aria-live="polite" aria-atomic="true">
          <h2>Feedback</h2>
          {checked && selectedChoice
            ? <p>{selectedChoice.feedback}</p>
            : <p>Select one answer, then check it.</p>}
        </div>

        <div className="m4-enhanced-actions">
          <div className="m4-enhanced-actions__secondary">
            <span>Current score: {check.score} of 8</span>
          </div>
          <div className="m4-enhanced-actions__primary">
            {!checked ? (
              <button
                type="button"
                className="m4-enhanced-button is-primary"
                disabled={!selected}
                onClick={checkAnswer}
              >
                Check answer
              </button>
            ) : !lastQuestion ? (
              <button type="button" className="m4-enhanced-button is-primary" onClick={nextQuestion}>
                Next question
              </button>
            ) : (
              <span className="m4-enhanced-final__checking">Result ready</span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

const CONFIRMATIONS = [
  {
    key: 'noteConfirmed',
    text: 'I confirm that my saved note reflects my current implementation decision.',
  },
  {
    key: 'reviewCommitmentConfirmed',
    text: 'I will review the action, account back to affected people and revise the plan when evidence changes.',
  },
  {
    key: 'readyToCompleteConfirmed',
    text: 'I am ready to complete Module 4 and continue to Module 5.',
  },
] as const;

export function Module4EnhancedCompletion({ state, onChangeState }: Props) {
  const enhanced = currentEnhancedState(state);
  const readiness = getModule4FinalReadiness(enhanced);
  const confirmations = enhanced.finalScreens.completionConfirmation;
  const score = enhanced.finalScreens.knowledgeCheck.score;

  const updateConfirmation = (
    key: 'noteConfirmed' | 'reviewCommitmentConfirmed' | 'readyToCompleteConfirmed',
    value: boolean,
  ) => {
    updateEnhancedState(
      onChangeState,
      (current) => updateModule4CompletionConfirmation(current, key, value),
    );
  };

  const completeModule = () => {
    if (!readiness.ready) return;
    onChangeState((prev) => {
      const migration = migrateModule4EnhancedState({
        practiceCheckState: prev.practiceCheckState,
        screenProgress: prev.screenProgress,
        completedModules: prev.completedModules,
      });
      const current = migration.practiceCheckState.module4Enhanced as Module4EnhancedState;
      const completed = completeModule4FinalScreen({
        screenProgress: migration.screenProgress,
        completedModules: migration.completedModules,
        module4Enhanced: current,
      });
      if (!completed.module4Enhanced.completion.enhancedJourneyCompleted) return prev;
      return {
        ...prev,
        currentLayer: 'player',
        currentCourseId: 'hrba_course',
        currentModuleId: 'module_05_hrba_meal',
        currentScreenId: 'M5-PLAYER-00',
        activeModal: null,
        currentSubState: null,
        screenProgress: completed.screenProgress,
        completedModules: completed.completedModules,
        practiceCheckState: {
          ...migration.practiceCheckState,
          module4Enhanced: completed.module4Enhanced,
        },
      };
    });
    setRoute('/module-5');
  };

  return (
    <main className="m4-enhanced-screen m4-enhanced-final" aria-labelledby="m4-final-completion-title">
      <FinalScreenHeader screenNumber={15} titleId="m4-final-completion-title" title="Confirm Module 4 completion">
        <p>You have used the Everyday Rights Lens to make implementation decisions that are fair, practical, accountable and safe.</p>
      </FinalScreenHeader>

      <section className="m4-enhanced-final__card" aria-labelledby="m4-final-practised-title">
        <h2 id="m4-final-practised-title">What you practised</h2>
        <ul className="m4-enhanced-final__summary-list">
          <li>Checked what was confirmed and what still needed verification.</li>
          <li>Identified exclusion risks and chose proportionate responses.</li>
          <li>Kept responsibility clear while supporting participation and account-back.</li>
          <li>Used minimum necessary information and planned follow-up and review.</li>
        </ul>
      </section>

      <section
        className={[
          'm4-enhanced-final__card',
          'm4-enhanced-final__note-status',
          readiness.noteCurrent ? 'is-ready' : 'needs-review',
        ].join(' ')}
        role="status"
        aria-live="polite"
      >
        <p className="m4-enhanced-kicker">Your implementation note</p>
        <h2>{readiness.noteCurrent ? 'Saved and current' : 'Needs review'}</h2>
        <p>
          {readiness.noteCurrent
            ? 'Your Implementation Decision and Follow-Up Note reflects your current decisions.'
            : 'An earlier decision has changed. Return to Screen 13 and refresh the affected sections before completing Module 4.'}
        </p>
      </section>

      <section className="m4-enhanced-final__card" aria-labelledby="m4-final-check-title">
        <h2 id="m4-final-check-title">Completion check</h2>
        <dl className="m4-enhanced-final__status-list">
          <div>
            <dt>Required Module 4 activities</dt>
            <dd className={readiness.activitiesComplete ? 'is-ready' : 'is-blocked'}>
              {readiness.activitiesComplete ? 'Complete' : 'Incomplete'}
            </dd>
          </div>
          <div>
            <dt>Implementation note</dt>
            <dd className={readiness.noteCurrent ? 'is-ready' : 'is-blocked'}>
              {readiness.noteCurrent ? 'Saved and current' : 'Needs review'}
            </dd>
          </div>
          <div>
            <dt>Knowledge check</dt>
            <dd className={readiness.knowledgePassed ? 'is-ready' : 'is-blocked'}>
              {readiness.knowledgePassed ? `Passed — ${score}/8` : 'Not yet passed'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="m4-enhanced-final__card" aria-labelledby="m4-final-confirm-title">
        <h2 id="m4-final-confirm-title">Final confirmation</h2>
        <fieldset className="m4-enhanced-final__confirmations">
          <legend>Confirm all three statements</legend>
          {CONFIRMATIONS.map(({ key, text }) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={confirmations[key]}
                onChange={(event) => updateConfirmation(key, event.target.checked)}
              />
              <span>{text}</span>
            </label>
          ))}
        </fieldset>
      </section>

      <section className="m4-enhanced-final__bridge">
        <p className="m4-enhanced-kicker">Next: Module 5 — Using Evidence for Accountability and Learning</p>
        <p>You will use monitoring, feedback and safe evidence to check results, adapt responsibly and account back.</p>
      </section>

      <div className="m4-enhanced-final__completion-action">
        {!readiness.ready && (
          <p role="status" aria-live="polite">
            Complete every status and confirmation above before completing Module 4.
          </p>
        )}
        <button
          type="button"
          className="m4-enhanced-button is-primary"
          disabled={!readiness.ready}
          onClick={completeModule}
        >
          Complete Module 4 and continue to Module 5
        </button>
      </div>
    </main>
  );
}
