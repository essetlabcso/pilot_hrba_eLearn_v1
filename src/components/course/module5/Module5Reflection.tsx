import type {
  Module5ReflectionPrompt,
} from '../../../data/module5/module5PresentationContent';
import type {
  Module5PresentationReflectionValue,
} from '../../../data/module5/module5EnhancedModel';
import { containsPotentiallySensitiveModule5Text } from '../../../data/module5/module5EnhancedModel';

type Props = {
  prompts: Module5ReflectionPrompt[];
  values: Record<string, Module5PresentationReflectionValue>;
  details: Record<string, string>;
  onChangeValue: (prompt: Module5ReflectionPrompt, value: Module5PresentationReflectionValue) => void;
  onChangeDetail: (prompt: Module5ReflectionPrompt, value: string) => void;
};

function countWords(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function textInput(
  prompt: Module5ReflectionPrompt,
  value: string,
  onChange: (value: string) => void,
  label = 'Your concise response',
) {
  const wordCount = countWords(value);
  const tooLong = Boolean(prompt.maxWords && wordCount > prompt.maxWords);
  const sensitive = containsPotentiallySensitiveModule5Text(value);
  const helpId = `${prompt.id}-help`;
  const errorId = `${prompt.id}-error`;
  return (
    <label className="m5p-text-field" htmlFor={`${prompt.id}-value`}>
      <span>{label}</span>
      <textarea
        id={`${prompt.id}-value`}
        rows={3}
        maxLength={360}
        value={value}
        aria-describedby={`${helpId}${tooLong || sensitive ? ` ${errorId}` : ''}`}
        aria-invalid={tooLong || sensitive || undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      <small id={helpId}>
        Use generalized wording. Do not include names, contact details, case details or exact locations.
        {prompt.maxWords ? ` Maximum ${prompt.maxWords} words; ${wordCount} entered.` : ''}
      </small>
      {(tooLong || sensitive) && (
        <small id={errorId} className="m5p-field-error">
          {sensitive
            ? 'Remove possible identifying or sensitive detail.'
            : `Shorten this response to ${prompt.maxWords} words or fewer.`}
        </small>
      )}
    </label>
  );
}

export default function Module5Reflection({
  prompts,
  values,
  details,
  onChangeValue,
  onChangeDetail,
}: Props) {
  return (
    <section className="m5p-section" aria-labelledby="m5p-reflection-title">
      <div className="m5p-section-heading">
        <p className="m5p-eyebrow">Portfolio reflection</p>
        <h2 id="m5p-reflection-title">Retain one concise priority, gap or support need</h2>
        <p>Required reflections feed the later Module 5 summary. Optional prompts are clearly marked.</p>
      </div>
      <aside className="m5p-safety" role="note">
        <strong>Keep the reflection safe and generalized</strong>
        <span>Do not enter names, contact details, confidential cases, diagnoses or exact locations.</span>
      </aside>
      <div className="m5p-reflection-list">
        {prompts.map((prompt) => {
          const value = values[prompt.id];
          const stringValue = typeof value === 'string' ? value : '';
          const pairValue = Array.isArray(value) ? value : ['', ''];
          const detail = details[prompt.id] || '';
          return (
            <fieldset className="m5p-reflection" key={prompt.id}>
              <legend>
                <span>{prompt.required ? 'Required' : 'Optional'}</span>
                {prompt.prompt}
              </legend>
              <p>{prompt.whyItMatters}</p>
              <p className="m5p-response-type"><strong>Response:</strong> {prompt.responseType}</p>

              {prompt.control === 'short-text' && textInput(
                prompt,
                stringValue,
                (next) => onChangeValue(prompt, next),
              )}

              {(prompt.control === 'single-choice' || prompt.control === 'rating') && (
                <div className="m5p-options">
                  {prompt.options?.map((item) => {
                    const optionId = `${prompt.id}-${item.replace(/\s+/g, '-').toLowerCase()}`;
                    return (
                      <label key={item} htmlFor={optionId}>
                        <input
                          id={optionId}
                          type="radio"
                          name={prompt.id}
                          value={item}
                          checked={stringValue === item}
                          onChange={() => onChangeValue(prompt, item)}
                        />
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {prompt.control === 'stage-pair' && (
                <div className="m5p-stage-pair">
                  <label htmlFor={`${prompt.id}-confident`}>
                    <span>Most confident stage</span>
                    <select
                      id={`${prompt.id}-confident`}
                      value={pairValue[0] || ''}
                      onChange={(event) => onChangeValue(prompt, [event.target.value, pairValue[1] || ''])}
                    >
                      <option value="">Choose a stage</option>
                      {prompt.options?.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </label>
                  <label htmlFor={`${prompt.id}-priority`}>
                    <span>Stage most needing attention</span>
                    <select
                      id={`${prompt.id}-priority`}
                      value={pairValue[1] || ''}
                      onChange={(event) => onChangeValue(prompt, [pairValue[0] || '', event.target.value])}
                    >
                      <option value="">Choose a stage</option>
                      {prompt.options?.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </label>
                </div>
              )}

              {prompt.detailMaxWords && textInput(
                { ...prompt, maxWords: prompt.detailMaxWords },
                detail,
                (next) => onChangeDetail(prompt, next),
                'Optional short detail',
              )}
            </fieldset>
          );
        })}
      </div>
    </section>
  );
}
