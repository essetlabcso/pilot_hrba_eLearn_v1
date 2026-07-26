import { useState } from 'react';
import type { LearningState } from '../../state/learningState';
import Module4EnhancedBatch1 from './module4/Module4EnhancedBatch1';
import Module4EnhancedBatch2 from './module4/Module4EnhancedBatch2';
import Module4EnhancedBatch3 from './module4/Module4EnhancedBatch3';

type Module4RendererProps = {
  screenId: string;
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
};

type Choice = {
  id: string;
  text: string;
  feedback: string;
  correct?: boolean;
};

type Question = {
  id: string;
  title: string;
  scenario: string;
  choices: Choice[];
};

const MODULE_ID = 'module_04_implementation';

const module4Routes: Record<string, string> = {
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

const summaryCards = [
  ['Non-discrimination and equality', 'Are all rights-holders able to access and benefit from the project fairly?'],
  ['Meaningful participation', 'Are rights-holders able to express views and influence decisions during implementation?'],
  ['Accountability and transparency', 'Are decisions, criteria, feedback, and results clearly explained and followed up?'],
  ['Rights-holders and duty-bearers', 'Are roles and responsibilities clear?'],
  ['Empowerment and capacity development', 'Are rights-holders and duty-bearers becoming more able to act?'],
  ['Safe use of information', 'Are feedback, photos, stories, complaints, and monitoring information handled safely?'],
];



const portfolioFields = [
  {
    id: 'issue',
    prompt: 'What issue needs attention?',
    options: [
      'Some people may not be benefiting equally.',
      'Selection criteria may not be clear.',
      'Rights-holders are present but not influencing decisions.',
      'Feedback is collected but not answered.',
      'A duty-bearer commitment is not followed up.',
      'Photos, stories, or complaints may not be handled safely.',
      'Another safe issue.',
    ],
  },
  {
    id: 'group',
    prompt: 'Who may be affected differently?',
    options: [
      'Women or girls',
      'Youth',
      'Persons with disabilities',
      'Low-income households',
      'Informal workers',
      'People from remote kebeles',
      'Older persons',
      'People with less access to information',
      'Another safe group.',
    ],
  },
  {
    id: 'concern',
    prompt: 'What may be the main concern?',
    options: [
      'Information is not reaching everyone.',
      'Criteria or decisions are unclear.',
      'Local power may be influencing access.',
      'Support is not useful for some groups.',
      'Feedback is not receiving a response.',
      'The duty-bearer role is unclear.',
      'Privacy or safety is not protected.',
    ],
  },
  {
    id: 'action',
    prompt: 'What action should the CSO take?',
    options: [
      'Review the evidence safely and explain criteria or decisions clearly.',
      'Consult affected groups in a safe way and adjust the activity or support process.',
      'Engage the responsible duty-bearer constructively and document the change.',
      'Strengthen the feedback and response process and protect data, photos, stories, or complaints.',
    ],
  },
  {
    id: 'followUp',
    prompt: 'How will the CSO document and follow up?',
    options: [
      'Record what changed and why, without names.',
      'Share a safe response with rights-holders.',
      'Follow up with the responsible actor.',
      'Review the issue again in the next monitoring visit.',
      'Save the lesson for Module 5.',
    ],
  },
] as const;

const knowledgeQuestions: Question[] = [
  {
    id: 'q1',
    title: 'Non-discrimination',
    scenario: 'A project support list changes after a local committee discussion. Some low-income households are no longer included. A few people privately say the criteria were not followed. What should the CSO do first?',
    choices: [
      { id: 'A', text: 'Accept the list because local committee members understand the community context.', feedback: 'Local knowledge is useful, but it should not replace clear criteria and wider checking.' },
      { id: 'B', text: 'Review the list against the agreed criteria, protect people who raised concerns, and explain the process clearly.', feedback: 'B is the best answer. The CSO should check fairness, protect people, and explain the process.', correct: true },
      { id: 'C', text: 'Replace the list with a new list prepared only by the CSO field team.', feedback: 'This replaces one unclear process with another unclear process.' },
    ],
  },
  {
    id: 'q2',
    title: 'Meaningful participation',
    scenario: 'Youth attend project activities, but they are not included when follow-up support is discussed. What is the strongest response?',
    choices: [
      { id: 'A', text: 'Include youth attendance numbers in the next report.', feedback: 'Attendance numbers do not show meaningful participation.' },
      { id: 'B', text: 'Ask one adult leader to summarize youth concerns.', feedback: 'This is incomplete because it does not give youth a safe way to influence decisions directly.' },
      { id: 'C', text: 'Create a safe way for different youth groups to share views before follow-up decisions are made.', feedback: 'C is the best answer. Meaningful participation means rights-holders can influence decisions that affect them.', correct: true },
    ],
  },
  {
    id: 'q3',
    title: 'Accountability and transparency',
    scenario: 'The CSO receives many comments about delayed follow-up support. The comments are recorded and included in the donor report, but no response is shared with rights-holders. What is missing?',
    choices: [
      { id: 'A', text: 'A public response and follow-up process.', feedback: 'A is the best answer. Feedback becomes accountability when it is reviewed, answered, followed up, and used.', correct: true },
      { id: 'B', text: 'More detailed reporting to the donor.', feedback: 'Donor reporting alone does not answer rights-holders.' },
      { id: 'C', text: 'A new feedback form.', feedback: 'A new form does not solve the missing response and follow-up.' },
    ],
  },
  {
    id: 'q4',
    title: 'Duty-bearer responsibility',
    scenario: 'A woreda sector office agreed to improve a service but has not followed up. Community members ask the CSO to solve the full issue alone. What should the CSO do?',
    choices: [
      { id: 'A', text: 'Take over the whole duty-bearer role so the community is not disappointed.', feedback: 'The CSO should not replace the duty-bearer.' },
      { id: 'B', text: 'Engage the office constructively, document the commitment, inform rights-holders, and adjust CSO support where possible.', feedback: 'B is the best answer. The CSO supports accountability but should not replace the duty-bearer.', correct: true },
      { id: 'C', text: 'Stop discussing the issue because it is outside the CSO’s responsibility.', feedback: 'The CSO can still support communication, documentation, and constructive engagement.' },
    ],
  },
  {
    id: 'q5',
    title: 'Safe use of information',
    scenario: 'A donor asks for photos and personal stories. Some people do not understand how the photos and stories will be used. What should the CSO do?',
    choices: [
      { id: 'A', text: 'Use clear consent, collect only what is needed, avoid sensitive details, and use safer evidence where possible.', feedback: 'A is the best answer. Evidence should be useful, safe, respectful, and based on clear consent.', correct: true },
      { id: 'B', text: 'Collect photos quickly because the donor request is urgent.', feedback: 'Urgency does not remove the need for clear consent and safety.' },
      { id: 'C', text: 'Ask local leaders to select people whose stories can be shared.', feedback: 'This may create pressure and does not ensure clear consent.' },
    ],
  },
  {
    id: 'q6',
    title: 'Necessary adjustment',
    scenario: 'The project is behind schedule. The team notices that some groups are not benefiting equally. The team wants to continue without change. What is the best response?',
    choices: [
      { id: 'A', text: 'Continue without change and explain the issue in the final report.', feedback: 'Recording the issue later does not address the immediate fairness concern.' },
      { id: 'B', text: 'Check the issue quickly, protect people, adjust what can be adjusted, explain the change, and document it safely.', feedback: 'B is the best answer. A necessary adjustment can protect fairness, safety, and accountability.', correct: true },
      { id: 'C', text: 'Ask people who raised concerns to identify themselves publicly so the team can verify the issue.', feedback: 'This is unsafe. People who raise concerns should not be exposed.' },
    ],
  },
];

function setRoute(path: string) {
  if (typeof window !== 'undefined') window.history.pushState(null, '', path);
}

function addProgress(prev: LearningState, screenId: string) {
  const progress = new Set(prev.screenProgress[MODULE_ID] || []);
  progress.add(screenId);
  return { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) };
}

function updatePracticeState(prev: LearningState, key: string, value: Record<string, unknown>) {
  return { ...prev.practiceCheckState, [key]: { ...(prev.practiceCheckState[key] || {}), ...value } };
}

function completeScreen(
  screenId: string,
  nextScreenId: string,
  onChangeState: Module4RendererProps['onChangeState'],
  practiceKey: string,
  payload: Record<string, unknown> = {},
) {
  onChangeState((prev) => ({
    ...prev,
    currentScreenId: nextScreenId,
    screenProgress: addProgress(prev, screenId),
    practiceCheckState: updatePracticeState(prev, practiceKey, {
      ...payload,
      status: 'completed',
      completedAt: new Date().toISOString(),
    }),
  }));
  setRoute(module4Routes[nextScreenId]);
}



function ModuleContextLabel({ children }: { children: string }) {
  return <p className="m4-context-label">{children}</p>;
}

function PrimaryButton({ children, onClick, disabled = false }: { children: string; onClick: () => void; disabled?: boolean }) {
  return <button type="button" className="m4-primary-button" onClick={onClick} disabled={disabled}>{children}</button>;
}




function PortfolioScreen({ state, onChangeState }: Module4RendererProps) {
  const saved = state.practiceCheckState.module4ImplementationNote || {};
  const initialSignature = JSON.stringify({
    issue: saved.issue || '',
    group: saved.group || '',
    concern: saved.concern || '',
    action: saved.action || '',
    followUp: saved.followUp || '',
  });
  const [answers, setAnswers] = useState<Record<string, string>>(() => ({
    issue: String(saved.issue || ''),
    group: String(saved.group || ''),
    concern: String(saved.concern || ''),
    action: String(saved.action || ''),
    followUp: String(saved.followUp || ''),
  }));
  const [activeStep, setActiveStep] = useState(0);
  const [savedSignature, setSavedSignature] = useState(String(saved.status || '') === 'saved' ? initialSignature : '');
  const allDone = portfolioFields.every((field) => answers[field.id]);
  const note = buildPortfolioNote(answers);
  const activeField = portfolioFields[activeStep];
  const currentSignature = JSON.stringify({
    issue: answers.issue || '',
    group: answers.group || '',
    concern: answers.concern || '',
    action: answers.action || '',
    followUp: answers.followUp || '',
  });
  const savedCurrentNote = allDone && savedSignature === currentSignature && state.practiceCheckState.module4ImplementationNote?.status === 'saved';
  const updateAnswer = (fieldId: string, value: string) => {
    setAnswers({ ...answers, [fieldId]: value });
    setSavedSignature('');
  };
  const save = () => {
    const signatureToSave = currentSignature;
    onChangeState((prev) => ({
      ...prev,
      screenProgress: addProgress(prev, 'M4-S1-12'),
      practiceCheckState: updatePracticeState(prev, 'module4ImplementationNote', {
        ...answers,
        note,
        status: 'saved',
        savedAt: new Date().toISOString(),
      }),
    }));
    setSavedSignature(signatureToSave);
  };
  return (
    <main className="m4-screen m4-final-screen" aria-labelledby="m4-s12-title">
      <section className="m4-final-two-col">
        <article className="m4-final-card">
          <ModuleContextLabel>MODULE 4</ModuleContextLabel>
          <h1 id="m4-s12-title">Activity: Preparing an Implementation Note</h1>
          <p>In this activity, you will prepare a short implementation note for your portfolio.</p>
          <p>The note should be general and safe. Do not include real names, phone numbers, exact sensitive locations, complaint details, survivor stories, children’s details, officials’ names, or unsupported accusations.</p>
          <div className="m4-step-tabs" role="tablist" aria-label="Implementation note steps">
            {portfolioFields.map((field, index) => (
              <button
                key={field.id}
                type="button"
                role="tab"
                aria-selected={activeStep === index}
                className={`${activeStep === index ? 'is-active' : ''} ${answers[field.id] ? 'is-complete' : ''}`}
                onClick={() => setActiveStep(index)}
              >
                Step {index + 1}
              </button>
            ))}
          </div>
          <div className="m4-final-form-list">
            <label>
              <span>Step {activeStep + 1} - {activeField.prompt}</span>
              <select value={answers[activeField.id] || ''} onChange={(event) => updateAnswer(activeField.id, event.target.value)}>
                <option value="">Choose one</option>
                {activeField.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          </div>
          <div className="m4-final-actions m4-final-actions--inline">
            <button type="button" className="m4-portfolio-secondary" disabled={activeStep === 0} onClick={() => setActiveStep(Math.max(0, activeStep - 1))}>Previous step</button>
            <button type="button" className="m4-portfolio-secondary" disabled={activeStep === portfolioFields.length - 1 || !answers[activeField.id]} onClick={() => setActiveStep(Math.min(portfolioFields.length - 1, activeStep + 1))}>Next step</button>
          </div>
        </article>
        <aside className="m4-final-card m4-note-card">
          <p className="m4-card-kicker">My Implementation Note</p>
          <h2>Generated note</h2>
          <p>{note}</p>
          <div className="m4-final-actions">
            <button type="button" className="m4-portfolio-secondary" onClick={() => { setAnswers({ issue: '', group: '', concern: '', action: '', followUp: '' }); setActiveStep(0); setSavedSignature(''); }}>Revise my note</button>
            <PrimaryButton disabled={!allDone} onClick={save}>Save to My Portfolio</PrimaryButton>
            <p className="m4-save-status" aria-live="polite">{savedCurrentNote ? 'Saved to My Portfolio.' : allDone ? 'Save your current note before continuing.' : 'Complete all five steps to save your note.'}</p>
            <PrimaryButton disabled={!savedCurrentNote} onClick={() => completeScreen('M4-S1-12', 'M4-S1-13', onChangeState, 'module4ImplementationNote', { ...answers, note })}>Continue</PrimaryButton>
          </div>
        </aside>
      </section>
    </main>
  );
}

function KnowledgeCheckScreen({ onChangeState }: Module4RendererProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const question = knowledgeQuestions[index];
  const selected = answers[question.id];
  const isSubmitted = submitted[question.id];
  const score = knowledgeQuestions.filter((item) => item.choices.some((choice) => choice.id === answers[item.id] && choice.correct)).length;
  return (
    <main className="m4-screen m4-final-screen" aria-labelledby="m4-s13-title">
      <section className="m4-final-stack">
        <article className="m4-final-card">
          <ModuleContextLabel>MODULE 4</ModuleContextLabel>
          <h1 id="m4-s13-title">Knowledge Check</h1>
          <p>Choose the best HRBA-informed answer.</p>
          <p className="m4-final-progress">Question {index + 1} of {knowledgeQuestions.length}</p>
        </article>
        <section className="m4-final-two-col">
          <article className="m4-final-card">
            <p className="m4-card-kicker">{question.title}</p>
            <h2>{question.scenario}</h2>
            <div className="m4-choice-list" role="radiogroup" aria-label={question.title}>
              {question.choices.map((choice) => <button key={choice.id} type="button" role="radio" aria-checked={selected === choice.id} className={`${selected === choice.id ? 'is-selected' : ''} ${isSubmitted && choice.correct ? 'is-correct' : ''}`} onClick={() => !isSubmitted && setAnswers({ ...answers, [question.id]: choice.id })}><span>{choice.id}</span>{choice.text}</button>)}
            </div>
          </article>
          <aside className="m4-final-card" aria-live="polite">
            <h2>Feedback</h2>
            {!isSubmitted ? <p>Select an answer, then submit.</p> : question.choices.map((choice) => <p key={choice.id}><strong>{choice.id}.</strong> {choice.feedback}</p>)}
            {!isSubmitted ? <PrimaryButton disabled={!selected} onClick={() => setSubmitted({ ...submitted, [question.id]: true })}>Submit answer</PrimaryButton> : index < knowledgeQuestions.length - 1 ? <PrimaryButton onClick={() => setIndex(index + 1)}>Next question</PrimaryButton> : <PrimaryButton onClick={() => completeScreen('M4-S1-13', 'M4-S1-14', onChangeState, 'module4KnowledgeCheck', { answers, score, total: knowledgeQuestions.length, completed: true })}>Continue</PrimaryButton>}
          </aside>
        </section>
      </section>
    </main>
  );
}

function CompletionScreen({ state, onChangeState }: Module4RendererProps) {
  const portfolio = state.practiceCheckState.module4ImplementationNote || {};
  const completeModule = (target: 'module5' | 'overview') => {
    onChangeState((prev) => {
      const completedModules = prev.completedModules.includes(MODULE_ID) ? prev.completedModules : [...prev.completedModules, MODULE_ID];
      return {
        ...prev,
        currentLayer: target === 'module5' ? 'player' : 'platform',
        currentCourseId: 'hrba_course',
        currentModuleId: target === 'module5' ? 'module_05_hrba_meal' : MODULE_ID,
        currentScreenId: target === 'module5' ? 'M5-PLAYER-00' : 'M4-S1-14',
        activeModal: null,
        currentSubState: null,
        completedModules,
        screenProgress: addProgress(prev, 'M4-S1-14'),
        practiceCheckState: updatePracticeState(prev, 'module4Completion', { completed: true, completedAt: new Date().toISOString() }),
      };
    });
    setRoute(target === 'module5' ? '/module-5' : '/');
  };
  return (
    <main className="m4-screen m4-final-screen" aria-labelledby="m4-s14-title">
      <section className="m4-final-stack">
        <article className="m4-final-card">
          <ModuleContextLabel>MODULE 4</ModuleContextLabel>
          <h1 id="m4-s14-title">Module Summary and Completion</h1>
          <p>You have completed Module 4.</p>
          <p>In this module, you practiced how to apply HRBA during implementation.</p>
        </article>
        <section className="m4-final-grid">
          {summaryCards.map(([title, text]) => <article key={title} className="m4-final-card"><h2>{title}</h2><p>{text}</p></article>)}
        </section>
        <section className="m4-final-two-col">
          <article className="m4-final-card">
            <h2>Final message</h2>
            <p>Strong implementation is not only completing activities. It is carrying out the project in a way that respects human dignity, supports rights-holders, engages duty-bearers, and applies HRBA principles in everyday work.</p>
            <p>In Module 5, you will continue with HRBA in monitoring, evaluation, accountability, and learning.</p>
          </article>
          <aside className="m4-final-card m4-note-card">
            <p className="m4-card-kicker">Portfolio confirmation</p>
            <h2>Your implementation note has been saved to your portfolio.</h2>
            <p>{String(portfolio.note || 'Your Module 4 implementation note is saved.')}</p>
          </aside>
        </section>
        <div className="m4-final-actions">
          <button type="button" className="m4-portfolio-secondary" onClick={() => { onChangeState((prev) => ({ ...prev, currentScreenId: 'M4-S1-01' })); setRoute(module4Routes['M4-S1-01']); }}>Review Module 4</button>
          <PrimaryButton onClick={() => completeModule('module5')}>Continue to Module 5</PrimaryButton>
          <button type="button" className="m4-portfolio-secondary" onClick={() => completeModule('overview')}>Return to course overview</button>
        </div>
      </section>
    </main>
  );
}





function buildPortfolioNote(answers: Record<string, string>) {
  if (!answers.issue && !answers.group && !answers.concern && !answers.action && !answers.followUp) {
    return 'Your safe implementation note will appear here as you make choices.';
  }
  return `The CSO noticed that ${sentenceEnd(lowerFirst(answers.issue || 'an implementation issue may need attention'))} This may affect ${sentenceEnd(lowerFirst(answers.group || 'a rights-holder group'))} The main concern may be that ${sentenceEnd(lowerFirst(answers.concern || 'an HRBA principle needs to be checked'))} The CSO should ${sentenceEnd(lowerFirst(answers.action || 'review the issue safely'))} The CSO will ${sentenceEnd(lowerFirst(answers.followUp || 'document and follow up safely'))}`;
}

function lowerFirst(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function sentenceEnd(value: string) {
  return /[.!?]$/.test(value.trim()) ? value.trim() : `${value.trim()}.`;
}

export default function Module4Renderer(props: Module4RendererProps) {
  if (['M4-S1-01', 'M4-S1-02', 'M4-S1-03', 'M4-S1-04'].includes(props.screenId)) {
    return <Module4EnhancedBatch1 {...props} screenId={props.screenId as 'M4-S1-01' | 'M4-S1-02' | 'M4-S1-03' | 'M4-S1-04'} />;
  }
  if (['M4-S1-05', 'M4-S1-06', 'M4-S1-07'].includes(props.screenId)) {
    return <Module4EnhancedBatch2 {...props} screenId={props.screenId as 'M4-S1-05' | 'M4-S1-06' | 'M4-S1-07'} />;
  }
  if (['M4-S1-08', 'M4-S1-09', 'M4-S1-10', 'M4-S1-11'].includes(props.screenId)) {
    return <Module4EnhancedBatch3 {...props} screenId={props.screenId as 'M4-S1-08' | 'M4-S1-09' | 'M4-S1-10' | 'M4-S1-11'} />;
  }
  if (props.screenId === 'M4-S1-12') return <PortfolioScreen {...props} />;
  if (props.screenId === 'M4-S1-13') return <KnowledgeCheckScreen {...props} />;
  if (props.screenId === 'M4-S1-14') return <CompletionScreen {...props} />;

  return (
    <main className="m4-screen m4-final-screen" aria-labelledby="m4-placeholder-title">
      <section className="m4-final-card">
        <ModuleContextLabel>Module 4</ModuleContextLabel>
        <h1 id="m4-placeholder-title">Module 4 screen unavailable</h1>
        <p>The requested Module 4 screen is not in the active sequence.</p>
      </section>
    </main>
  );
}
