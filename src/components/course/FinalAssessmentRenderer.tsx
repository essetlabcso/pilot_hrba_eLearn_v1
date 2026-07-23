import { useMemo } from 'react';
import type { LearningState } from '../../state/learningState';
import {
  FINAL_ASSESSMENT_MODULE_ID,
  FINAL_ASSESSMENT_PASS_THRESHOLD,
  finalAssessmentQuestions,
  scoreFinalAssessment,
} from '../../data/finalAssessment';
import { hasFinalAssessmentPrerequisites } from '../../state/coursePrerequisites';
import './finalAssessment.css';

interface FinalAssessmentRendererProps {
  screenId: string;
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}

export default function FinalAssessmentRenderer({
  screenId,
  state,
  onChangeState,
  onNext,
}: FinalAssessmentRendererProps) {
  const answeredCount = finalAssessmentQuestions.filter((question) => state.finalAssessmentAnswers[question.id]).length;
  const allAnswered = answeredCount === finalAssessmentQuestions.length;
  const result = state.finalAssessmentResult;
  const prerequisitesMet = hasFinalAssessmentPrerequisites(state.completedModules);
  const missedQuestions = useMemo(() => {
    if (!result) return [];

    return finalAssessmentQuestions.filter(
      (question) => state.finalAssessmentAnswers[question.id] !== question.correctOptionId,
    );
  }, [result, state.finalAssessmentAnswers]);

  const updateAnswer = (questionId: string, optionId: string) => {
    if (!prerequisitesMet) return;
    onChangeState((prev) => ({
      ...prev,
      finalAssessmentAnswers: {
        ...prev.finalAssessmentAnswers,
        [questionId]: optionId,
      },
    }));
  };

  const submitAssessment = () => {
    if (!allAnswered || !prerequisitesMet) return;

    onChangeState((prev) => {
      if (!hasFinalAssessmentPrerequisites(prev.completedModules)) return prev;
      const attemptNumber = prev.finalAssessmentAttemptNumber + 1;
      const nextResult = scoreFinalAssessment(prev.finalAssessmentAnswers, attemptNumber);
      const currentProgress = prev.screenProgress[FINAL_ASSESSMENT_MODULE_ID] || [];
      const nextProgress = nextResult.passed
        ? currentProgress.includes('FINAL-ASSESSMENT-COMPLETE')
          ? currentProgress
          : [...currentProgress, 'FINAL-ASSESSMENT-COMPLETE']
        : currentProgress.filter((screenProgressId) => screenProgressId !== 'FINAL-ASSESSMENT-COMPLETE');

      return {
        ...prev,
        currentScreenId: 'FINAL-ASSESSMENT-COMPLETE',
        finalAssessmentResult: nextResult,
        finalAssessmentAttemptNumber: attemptNumber,
        completedModules: nextResult.passed
          ? Array.from(new Set([...prev.completedModules, FINAL_ASSESSMENT_MODULE_ID]))
          : prev.completedModules.filter((moduleId) => moduleId !== FINAL_ASSESSMENT_MODULE_ID),
        screenProgress: {
          ...prev.screenProgress,
          [FINAL_ASSESSMENT_MODULE_ID]: nextProgress,
        },
      };
    });
  };

  const retakeAssessment = () => {
    if (!prerequisitesMet) return;
    onChangeState((prev) => {
      if (!hasFinalAssessmentPrerequisites(prev.completedModules)) return prev;
      return {
        ...prev,
        currentScreenId: 'FINAL-ASSESSMENT-QUESTIONS',
        finalAssessmentAnswers: {},
        finalAssessmentResult: null,
        completedModules: prev.completedModules.filter((moduleId) => moduleId !== FINAL_ASSESSMENT_MODULE_ID),
        screenProgress: {
          ...prev.screenProgress,
          [FINAL_ASSESSMENT_MODULE_ID]: (prev.screenProgress[FINAL_ASSESSMENT_MODULE_ID] || []).filter(
            (screenProgressId) => screenProgressId !== 'FINAL-ASSESSMENT-COMPLETE',
          ),
        },
      };
    });
  };

  if (!prerequisitesMet) {
    return (
      <section className="final-assessment-cover" role="alert" aria-labelledby="final-assessment-locked-title">
        <div className="final-assessment-cover__copy">
          <p className="final-assessment-eyebrow">Assessment locked</p>
          <h1 id="final-assessment-locked-title">Complete Modules 1–5 first</h1>
          <p>
            Your saved module progress is preserved. Return to the course page and complete the required
            learning pathway before opening the Final Assessment.
          </p>
        </div>
      </section>
    );
  }

  if (screenId === 'FINAL-ASSESSMENT-PLAYER-00') {
    return (
      <section className="final-assessment-cover" aria-labelledby="final-assessment-cover-title">
        <div className="final-assessment-cover__copy">
          <p className="final-assessment-eyebrow">Final course checkpoint</p>
          <h1 id="final-assessment-cover-title">Final Assessment</h1>
          <p>
            Complete a 10-question objective assessment covering practical HRBA judgment across the course:
            actor roles, participation, inclusion, accountability, safe evidence, implementation adaptation,
            and MEAL.
          </p>
          <div className="final-assessment-meta" aria-label="Assessment rules">
            <div>
              <span className="final-assessment-tag">Pass mark</span>
              <strong>{FINAL_ASSESSMENT_PASS_THRESHOLD}%</strong>
            </div>
            <div>
              <span className="final-assessment-tag">Questions</span>
              <strong>{finalAssessmentQuestions.length} objective items</strong>
            </div>
            <div>
              <span className="final-assessment-tag">Retakes</span>
              <strong>Allowed</strong>
            </div>
          </div>
          <p>
            Your certificate is issued by the CSO Learning Hub. In Hub portal mode, your submitted final
            assessment result is shared with the Hub for certificate eligibility.
          </p>
          <button type="button" className="final-assessment-primary" onClick={onNext}>
            Start assessment
          </button>
        </div>
        <figure className="final-assessment-cover__visual">
          <img
            src="/assets/hrba/modules/final-assessment.png"
            alt="Final assessment checkpoint after the HRBA learning pathway."
          />
        </figure>
      </section>
    );
  }

  if (screenId === 'FINAL-ASSESSMENT-COMPLETE') {
    return (
      <section className="final-assessment-screen" aria-labelledby="final-assessment-result-title">
        <div className="final-assessment-shell">
          <p className="final-assessment-eyebrow">Assessment result</p>
          <h1 id="final-assessment-result-title">Final Assessment Result</h1>
          {!result ? (
            <div className="final-assessment-card">
              <p>No final assessment result has been submitted yet.</p>
              <button type="button" className="final-assessment-primary" onClick={retakeAssessment}>
                Go to assessment
              </button>
            </div>
          ) : (
            <>
              <div className={`final-assessment-score-card ${result.passed ? 'is-passed' : 'is-failed'}`}>
                <div className="final-assessment-score" aria-label={`Score ${result.percentage} percent`}>
                  <strong>{result.percentage}%</strong>
                  <span>
                    {result.score} of {result.maxScore}
                  </span>
                </div>
                <div className="final-assessment-card">
                  <p className="final-assessment-tag">Attempt {result.attemptNumber}</p>
                  <h2>{result.passed ? 'Passed' : 'Not passed yet'}</h2>
                  {result.passed ? (
                    <p>
                      You passed the final assessment. Your result is being shared with the CSO Learning Hub so your
                      certificate can be issued and verified from the Hub.
                    </p>
                  ) : (
                    <p>
                      You have not reached the 80% pass mark yet. Review the suggested areas and try again. A
                      certificate is not issued until you pass.
                    </p>
                  )}
                </div>
              </div>

              {!result.passed && (
                <div className="final-assessment-review">
                  <h2>Suggested review areas</h2>
                  <ul>
                    {missedQuestions.map((question) => (
                      <li key={question.id}>
                        <strong>{question.topic}:</strong> {question.feedback}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="final-assessment-actions">
                <button type="button" className="final-assessment-secondary" onClick={retakeAssessment}>
                  Retake assessment
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="final-assessment-screen" aria-labelledby="final-assessment-questions-title">
      <div className="final-assessment-shell">
        <div className="final-assessment-card">
          <p className="final-assessment-eyebrow">Final assessment</p>
          <h1 id="final-assessment-questions-title">Final Assessment</h1>
          <p>
            Answer every question, then submit for scoring. You need {FINAL_ASSESSMENT_PASS_THRESHOLD}% or higher
            to mark the final assessment complete locally.
          </p>
          <p className="final-assessment-status" aria-live="polite">
            {answeredCount} of {finalAssessmentQuestions.length} questions answered.
            {!allAnswered ? ' Complete all questions before submitting.' : ' Ready to submit.'}
          </p>
        </div>

        {finalAssessmentQuestions.map((question, index) => (
          <fieldset className="final-assessment-question" key={question.id}>
            <legend>
              <span className="final-assessment-tag">Question {index + 1}</span>
              <span className="final-assessment-question__prompt">{question.prompt}</span>
            </legend>
            <div className="final-assessment-options">
              {question.options.map((option) => {
                const optionInputId = `${question.id}-${option.id}`;
                const selected = state.finalAssessmentAnswers[question.id] === option.id;

                return (
                  <label
                    key={option.id}
                    htmlFor={optionInputId}
                    className={`final-assessment-option ${selected ? 'is-selected' : ''}`}
                  >
                    <input
                      id={optionInputId}
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={selected}
                      onChange={() => updateAnswer(question.id, option.id)}
                    />
                    <span className="final-assessment-option__marker">{option.id.toUpperCase()}</span>
                    <span className="final-assessment-option__text">{option.text}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="final-assessment-actions">
          <button
            type="button"
            className="final-assessment-primary"
            disabled={!allAnswered}
            onClick={submitAssessment}
          >
            Submit final assessment
          </button>
        </div>
      </div>
    </section>
  );
}
