import type { Module5KnowledgeQuestion } from '../../../data/module5/module5PresentationContent';
import { isModule5KnowledgeAnswerCorrect } from '../../../data/module5/module5PresentationContent';

type Props = {
  questions: Module5KnowledgeQuestion[];
  answers: Record<string, string[]>;
  checkedIds: string[];
  correctIds: string[];
  onChangeAnswer: (question: Module5KnowledgeQuestion, selected: string[]) => void;
  onCheckAnswer: (question: Module5KnowledgeQuestion) => void;
};

export default function Module5KnowledgeCheck({
  questions,
  answers,
  checkedIds,
  correctIds,
  onChangeAnswer,
  onCheckAnswer,
}: Props) {
  return (
    <section className="m5p-section" aria-labelledby="m5p-knowledge-title">
      <div className="m5p-section-heading">
        <p className="m5p-eyebrow">Knowledge check</p>
        <h2 id="m5p-knowledge-title">Apply the presentation to a practical judgement</h2>
        <p>Answer and check all three questions. You can correct an answer without penalty.</p>
      </div>
      <div className="m5p-question-list">
        {questions.map((question, index) => {
          const selected = answers[question.id] || [];
          const checked = checkedIds.includes(question.id);
          const correct = correctIds.includes(question.id);
          const feedbackOptions = checked
            ? question.options.filter((item) =>
              selected.includes(item.id) || (question.correctOptionIds.includes(item.id) && !correct))
            : [];
          const feedbackId = `${question.id}-feedback`;
          return (
            <fieldset className="m5p-question" key={question.id}>
              <legend>
                <span>Question {index + 1} of {questions.length}</span>
                {question.prompt}
              </legend>
              <div className="m5p-options">
                {question.options.map((item) => {
                  const optionId = `${question.id}-${item.id}`;
                  const isSelected = selected.includes(item.id);
                  return (
                    <label key={item.id} htmlFor={optionId}>
                      <input
                        id={optionId}
                        type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                        name={question.id}
                        checked={isSelected}
                        aria-describedby={checked ? feedbackId : undefined}
                        onChange={() => {
                          const next = question.type === 'multiple'
                            ? isSelected
                              ? selected.filter((id) => id !== item.id)
                              : [...selected, item.id]
                            : [item.id];
                          onChangeAnswer(question, next);
                        }}
                      />
                      <span><strong>{item.id}.</strong> {item.label}</span>
                    </label>
                  );
                })}
              </div>
              <button
                type="button"
                className="m5p-secondary"
                disabled={selected.length === 0}
                onClick={() => onCheckAnswer(question)}
              >
                Check answer
              </button>
              {checked && (
                <div
                  id={feedbackId}
                  className={`m5p-feedback ${correct ? 'm5p-feedback--correct' : 'm5p-feedback--review'}`}
                  role="status"
                  aria-live="polite"
                >
                  <strong>{correct ? 'Correct.' : 'Review and try again.'}</strong>
                  {feedbackOptions.map((item) => <p key={item.id}>{item.feedback}</p>)}
                </div>
              )}
              {!checked && selected.length > 0 && isModule5KnowledgeAnswerCorrect(question, selected) && (
                <span className="m5p-visually-hidden">Answer selected. Check the answer to review feedback.</span>
              )}
            </fieldset>
          );
        })}
      </div>
    </section>
  );
}
