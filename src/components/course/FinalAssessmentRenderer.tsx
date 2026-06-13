import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { LearningState } from '../../state/learningState';
import {
  FINAL_ASSESSMENT_PASSING_SCORE,
  FINAL_ASSESSMENT_TOTAL,
  finalAssessmentQuestions,
  scoreFinalAssessment,
} from '../../data/finalAssessment';

type FinalAssessmentRendererProps = {
  screenId: string;
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
};

const MODULE_ID = 'final_assessment';
const REQUIRED_MODULE_ID = 'module_05_hrba_meal';

const finalAssessmentRoutes: Record<string, string> = {
  'FINAL-ASSESSMENT-PLAYER-00': '/final-assessment',
  'FINAL-ASSESSMENT-SUBMIT': '/final-assessment/submit',
  'FINAL-ASSESSMENT-RESULT': '/final-assessment/result',
};

finalAssessmentQuestions.forEach((_, index) => {
  finalAssessmentRoutes[`FINAL-ASSESSMENT-Q${String(index + 1).padStart(2, '0')}`] =
    `/final-assessment/question-${index + 1}`;
});

function setRoute(path: string) {
  if (typeof window !== 'undefined') window.history.pushState(null, '', path);
}

function addProgress(prev: LearningState, screenId: string) {
  const progress = new Set(prev.screenProgress[MODULE_ID] || []);
  progress.add(screenId);
  return {
    ...prev.screenProgress,
    [MODULE_ID]: Array.from(progress),
  };
}

function goHome(onChangeState: FinalAssessmentRendererProps['onChangeState']) {
  onChangeState((prev) => ({
    ...prev,
    currentLayer: 'platform',
    currentModuleId: null,
    currentScreenId: null,
    currentSubState: null,
    activeModal: null,
  }));
  setRoute('/');
}

function goToScreen(
  screenId: string,
  onChangeState: FinalAssessmentRendererProps['onChangeState'],
  progressScreenId?: string,
) {
  onChangeState((prev) => ({
    ...prev,
    currentScreenId: screenId,
    screenProgress: progressScreenId ? addProgress(prev, progressScreenId) : prev.screenProgress,
  }));
  setRoute(finalAssessmentRoutes[screenId] || '/final-assessment');
}

function firstUnansweredScreenId(answers: Record<string, string>) {
  const nextIndex = finalAssessmentQuestions.findIndex((question) => !answers[question.id]);
  if (nextIndex === -1) return 'FINAL-ASSESSMENT-SUBMIT';
  return `FINAL-ASSESSMENT-Q${String(nextIndex + 1).padStart(2, '0')}`;
}

function PrimaryButton({
  children,
  onClick,
  disabled = false,
}: {
  children: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button type="button" className="final-assessment-button final-assessment-button--primary" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className="final-assessment-button final-assessment-button--secondary" onClick={onClick}>
      {children}
    </button>
  );
}

function AssessmentShell({
  children,
  labelledBy,
  tone = 'default',
}: {
  children: ReactNode;
  labelledBy: string;
  tone?: 'default' | 'success' | 'support';
}) {
  return (
    <main className={`final-assessment-screen final-assessment-screen--${tone}`} aria-labelledby={labelledBy}>
      {children}
    </main>
  );
}

function LockedScreen({ onChangeState }: Pick<FinalAssessmentRendererProps, 'onChangeState'>) {
  return (
    <AssessmentShell labelledBy="final-assessment-locked-title">
      <section className="final-assessment-panel final-assessment-panel--locked">
        <p className="final-assessment-eyebrow">Final Assessment</p>
        <h1 id="final-assessment-locked-title">Complete Module 5 to unlock the Final Assessment</h1>
        <p>
          The Final Assessment becomes available after Module 5 is completed. Return to the course home
          and finish Module 5 before starting this scored checkpoint.
        </p>
        <PrimaryButton onClick={() => goHome(onChangeState)}>Return to Course Home</PrimaryButton>
      </section>
    </AssessmentShell>
  );
}

function IntroScreen({ state, onChangeState }: FinalAssessmentRendererProps) {
  const answeredCount = Object.keys(state.finalAssessmentAnswers).length;
  const ctaLabel = state.finalAssessmentSubmitted
    ? 'View Final Assessment Result'
    : answeredCount > 0
      ? 'Continue Final Assessment'
      : 'Start Final Assessment';

  const start = () => {
    const target = state.finalAssessmentSubmitted
      ? 'FINAL-ASSESSMENT-RESULT'
      : firstUnansweredScreenId(state.finalAssessmentAnswers);
    onChangeState((prev) => ({
      ...prev,
      finalAssessmentStarted: true,
      currentScreenId: target,
      screenProgress: addProgress(prev, 'FINAL-ASSESSMENT-PLAYER-00'),
    }));
    setRoute(finalAssessmentRoutes[target]);
  };

  return (
    <AssessmentShell labelledBy="final-assessment-title">
      <section className="final-assessment-hero">
        <div className="final-assessment-hero__copy">
          <p className="final-assessment-eyebrow">HRBA Course Final Assessment</p>
          <h1 id="final-assessment-title">Final Assessment</h1>
          <p className="final-assessment-lead">Complete 20 questions to finish the HRBA course.</p>
          <p>
            You are about to complete the final assessment for the HRBA course. The assessment has 20
            questions. Each question has one best answer. Your first response will be saved, and you
            will move to the next question. You will not receive feedback during the assessment.
          </p>
          <PrimaryButton onClick={start}>{ctaLabel}</PrimaryButton>
        </div>
        <aside className="final-assessment-rules" aria-label="Final assessment rules">
          {[
            '20 questions',
            'One answer per question',
            'No immediate feedback',
            'First response is saved',
            'Score shown after submission',
          ].map((rule) => (
            <div key={rule}>
              <span aria-hidden="true">✓</span>
              <p>{rule}</p>
            </div>
          ))}
        </aside>
      </section>
    </AssessmentShell>
  );
}

function QuestionScreen({
  questionIndex,
  state,
  onChangeState,
}: FinalAssessmentRendererProps & { questionIndex: number }) {
  const question = finalAssessmentQuestions[questionIndex];
  const savedAnswer = state.finalAssessmentAnswers[question.id] || '';
  const [selectedAnswer, setSelectedAnswer] = useState(savedAnswer);
  const isSaved = Boolean(savedAnswer);
  const questionNumber = questionIndex + 1;
  const progressPercent = Math.round((questionNumber / FINAL_ASSESSMENT_TOTAL) * 100);

  useEffect(() => {
    setSelectedAnswer(savedAnswer);
  }, [question.id, savedAnswer]);

  const next = () => {
    const answerToSave = savedAnswer || selectedAnswer;
    if (!answerToSave) return;

    const nextScreenId =
      questionIndex === finalAssessmentQuestions.length - 1
        ? 'FINAL-ASSESSMENT-SUBMIT'
        : `FINAL-ASSESSMENT-Q${String(questionIndex + 2).padStart(2, '0')}`;

    onChangeState((prev) => {
      const existingAnswer = prev.finalAssessmentAnswers[question.id];
      return {
        ...prev,
        finalAssessmentStarted: true,
        finalAssessmentAnswers: existingAnswer
          ? prev.finalAssessmentAnswers
          : {
              ...prev.finalAssessmentAnswers,
              [question.id]: answerToSave,
            },
        currentScreenId: nextScreenId,
        screenProgress: addProgress(prev, `FINAL-ASSESSMENT-Q${String(questionNumber).padStart(2, '0')}`),
      };
    });
    setRoute(finalAssessmentRoutes[nextScreenId]);
  };

  return (
    <AssessmentShell labelledBy={`final-assessment-question-${question.id}`}>
      <section className="final-assessment-question-card">
        <div className="final-assessment-question-meta">
          <p className="final-assessment-eyebrow">Question {questionNumber} of {FINAL_ASSESSMENT_TOTAL}</p>
          <span aria-label={`${progressPercent}% complete`}>{progressPercent}% complete</span>
        </div>
        <div className="final-assessment-progress" aria-hidden="true">
          <span style={{ width: `${progressPercent}%` }} />
        </div>
        <h1 id={`final-assessment-question-${question.id}`}>{question.question}</h1>
        <fieldset className="final-assessment-options" aria-describedby="final-assessment-question-help">
          <legend className="sr-only">Choose one answer</legend>
          <p id="final-assessment-question-help">
            Select one answer, then choose Next. No feedback is shown during the assessment.
          </p>
          {question.options.map((option) => {
            const selected = selectedAnswer === option.id;
            return (
              <label
                key={option.id}
                className={`final-assessment-option ${selected ? 'is-selected' : ''} ${isSaved ? 'is-locked' : ''}`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.id}
                  checked={selected}
                  disabled={isSaved}
                  onChange={() => setSelectedAnswer(option.id)}
                />
                <span className="final-assessment-option__mark" aria-hidden="true">
                  {selected ? '✓' : option.id}
                </span>
                <span>
                  <strong>{option.id}</strong>
                  {option.text}
                </span>
              </label>
            );
          })}
        </fieldset>
        {isSaved && (
          <p className="final-assessment-saved-note" role="status">
            Your first response for this question has already been saved.
          </p>
        )}
        <footer className="final-assessment-actions">
          <PrimaryButton disabled={!selectedAnswer} onClick={next}>
            {questionNumber === FINAL_ASSESSMENT_TOTAL ? 'Next to Submit' : 'Next'}
          </PrimaryButton>
        </footer>
      </section>
    </AssessmentShell>
  );
}

function SubmitScreen({ state, onChangeState }: FinalAssessmentRendererProps) {
  const answeredCount = finalAssessmentQuestions.filter((question) => state.finalAssessmentAnswers[question.id]).length;
  const allAnswered = answeredCount === FINAL_ASSESSMENT_TOTAL;

  const submit = () => {
    if (!allAnswered) {
      const target = firstUnansweredScreenId(state.finalAssessmentAnswers);
      goToScreen(target, onChangeState);
      return;
    }

    const score = scoreFinalAssessment(state.finalAssessmentAnswers);
    onChangeState((prev) => ({
      ...prev,
      finalAssessmentSubmitted: true,
      finalAssessmentScore: score,
      finalAssessmentSubmittedAt: new Date().toISOString(),
      currentScreenId: 'FINAL-ASSESSMENT-RESULT',
      completedModules: prev.completedModules.includes(MODULE_ID)
        ? prev.completedModules
        : [...prev.completedModules, MODULE_ID],
      screenProgress: addProgress(
        {
          ...prev,
          screenProgress: addProgress(prev, 'FINAL-ASSESSMENT-SUBMIT'),
        },
        'FINAL-ASSESSMENT-RESULT',
      ),
    }));
    setRoute(finalAssessmentRoutes['FINAL-ASSESSMENT-RESULT']);
  };

  return (
    <AssessmentShell labelledBy="final-assessment-submit-title">
      <section className="final-assessment-panel">
        <p className="final-assessment-eyebrow">Final step</p>
        <h1 id="final-assessment-submit-title">Submit Final Assessment</h1>
        <p>
          You have answered all 20 questions. Submit your final assessment to see your score and
          completion result.
        </p>
        <div className="final-assessment-submit-meter" aria-label={`${answeredCount} of ${FINAL_ASSESSMENT_TOTAL} questions answered`}>
          <strong>{answeredCount}/{FINAL_ASSESSMENT_TOTAL}</strong>
          <span>questions answered</span>
        </div>
        {!allAnswered && (
          <p className="final-assessment-saved-note" role="status">
            One or more answers are missing. Continue to the next unanswered question before submitting.
          </p>
        )}
        <PrimaryButton onClick={submit}>
          {allAnswered ? 'Submit Final Assessment' : 'Continue Assessment'}
        </PrimaryButton>
      </section>
    </AssessmentShell>
  );
}

function ResultScreen({ state, onChangeState }: FinalAssessmentRendererProps) {
  const score = state.finalAssessmentSubmitted
    ? state.finalAssessmentScore
    : scoreFinalAssessment(state.finalAssessmentAnswers);
  const percentage = Math.round((score / FINAL_ASSESSMENT_TOTAL) * 100);
  const passed = score >= FINAL_ASSESSMENT_PASSING_SCORE;
  const certificateText = encodeURIComponent(
    `HRBA Course Certificate\n\nCongratulations, you have passed the HRBA course.\nScore: ${score}/${FINAL_ASSESSMENT_TOTAL} (${percentage}%)\n`,
  );

  if (!state.finalAssessmentSubmitted) {
    return <SubmitScreen screenId="FINAL-ASSESSMENT-SUBMIT" state={state} onChangeState={onChangeState} />;
  }

  return (
    <AssessmentShell labelledBy="final-assessment-result-title" tone={passed ? 'success' : 'support'}>
      <section className="final-assessment-result-card">
        <p className="final-assessment-eyebrow">{passed ? 'Course completion achieved' : 'Supportive review step'}</p>
        <div className="final-assessment-score-badge" aria-label={`Score ${score} out of ${FINAL_ASSESSMENT_TOTAL}, ${percentage}%`}>
          <strong>{score}/{FINAL_ASSESSMENT_TOTAL}</strong>
          <span>{percentage}%</span>
        </div>
        {passed ? (
          <>
            <h1 id="final-assessment-result-title">Congratulations, you passed the HRBA course</h1>
            <p className="final-assessment-result-message">Congratulations, you have passed the HRBA course.</p>
            <p>
              You scored 80% or above on the final assessment. This means you have met the course
              completion requirement and demonstrated the minimum learning achievement for the HRBA course.
            </p>
            <div className="final-assessment-certificate-card">
              <span aria-hidden="true">✓</span>
              <div>
                <h2>Your certificate is now available.</h2>
                <p>You can download it using the link below.</p>
              </div>
            </div>
            <div className="final-assessment-actions final-assessment-actions--result">
              <a
                className="final-assessment-button final-assessment-button--primary"
                href={`data:text/plain;charset=utf-8,${certificateText}`}
                download="hrba-course-certificate.txt"
              >
                Download Certificate
              </a>
              <SecondaryButton onClick={() => goHome(onChangeState)}>Return to Course Home</SecondaryButton>
            </div>
          </>
        ) : (
          <>
            <h1 id="final-assessment-result-title">Review and try again when you are ready</h1>
            <p className="final-assessment-result-message">
              Please review the course materials and try the final assessment again when you are ready.
            </p>
            <p>
              Your score is below 80% for this attempt. Use the course review to revisit the areas
              you want to strengthen before your next attempt.
            </p>
            <div className="final-assessment-actions final-assessment-actions--result">
              <PrimaryButton onClick={() => goHome(onChangeState)}>Return to Course Review</PrimaryButton>
              <SecondaryButton onClick={() => goHome(onChangeState)}>Go to Course Home</SecondaryButton>
            </div>
          </>
        )}
      </section>
    </AssessmentShell>
  );
}

export default function FinalAssessmentRenderer(props: FinalAssessmentRendererProps) {
  const module5Completed = props.state.completedModules.includes(REQUIRED_MODULE_ID);
  if (!module5Completed) {
    return <LockedScreen onChangeState={props.onChangeState} />;
  }

  if (props.screenId === 'FINAL-ASSESSMENT-PLAYER-00') {
    return <IntroScreen {...props} />;
  }

  if (props.screenId === 'FINAL-ASSESSMENT-SUBMIT') {
    return <SubmitScreen {...props} />;
  }

  if (props.screenId === 'FINAL-ASSESSMENT-RESULT' || props.screenId === 'FINAL-ASSESSMENT-COMPLETE') {
    return <ResultScreen {...props} />;
  }

  const questionMatch = props.screenId.match(/^FINAL-ASSESSMENT-Q(\d{2})$/);
  const questionIndex = questionMatch ? Number(questionMatch[1]) - 1 : -1;
  if (questionIndex >= 0 && questionIndex < finalAssessmentQuestions.length) {
    return <QuestionScreen {...props} questionIndex={questionIndex} />;
  }

  return <IntroScreen {...props} />;
}
