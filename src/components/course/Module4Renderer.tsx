import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LearningState } from '../../state/learningState';

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

const projectCycle = ['Situation Analysis', 'Planning and Design', 'Implementation', 'Monitoring and Evaluation'];

const objectives = [
  'Explain what HRBA means during project implementation.',
  'Identify implementation issues that may affect HRBA principles.',
  'Check whether project activities are being implemented in a non-discriminatory way.',
  'Explain how meaningful participation should continue during implementation.',
  'Identify how accountability and transparency should be practiced during implementation.',
  'Distinguish the role of the CSO, rights-holders, duty-bearers, and other actors.',
  'Prepare a short and safe implementation note for your portfolio.',
];

const objectiveFrontLabels = [
  'HRBA during implementation',
  'Implementation issues',
  'Non-discrimination',
  'Meaningful participation',
  'Accountability and transparency',
  'Roles and responsibilities',
  'Portfolio note',
];

const principleCards = [
  ['Participation', 'Are rights-holders participating in a meaningful way?'],
  ['Non-discrimination and equality', 'Are some groups being excluded or benefiting less?'],
  ['Accountability and transparency', 'Are decisions, criteria, feedback, and results clear?'],
  ['Roles and responsibilities', 'Are duty-bearers fulfilling their responsibilities?'],
  ['Empowerment and capacity development', 'Is the project helping rights-holders to claim their rights and duty-bearers to fulfil their obligations?'],
  ['Safe use of information', 'Are complaints, photos, stories, feedback, and monitoring information handled safely?'],
];

const summaryCards = [
  ['Non-discrimination and equality', 'Are all rights-holders able to access and benefit from the project fairly?'],
  ['Meaningful participation', 'Are rights-holders able to express views and influence decisions during implementation?'],
  ['Accountability and transparency', 'Are decisions, criteria, feedback, and results clearly explained and followed up?'],
  ['Rights-holders and duty-bearers', 'Are roles and responsibilities clear?'],
  ['Empowerment and capacity development', 'Are rights-holders and duty-bearers becoming more able to act?'],
  ['Safe use of information', 'Are feedback, photos, stories, complaints, and monitoring information handled safely?'],
];

const scenarioIssues: [string, string, string[]][] = [
  ['support-list', 'The support list changed after a local committee discussion.', ['Non-discrimination and equality', 'Accountability and transparency']],
  ['market-fees', 'Some informal women vendors say the market improvement may increase fees.', ['Non-discrimination and equality']],
  ['youth-follow-up', 'Youth attend activities but are not included in follow-up decisions.', ['Meaningful participation']],
  ['accessibility-delay', 'Persons with disabilities are counted in the report, but accessibility actions are delayed.', ['Non-discrimination and equality', 'Accountability and transparency']],
  ['woreda-follow-up', 'Woreda sector staff attended the launch but have not followed up on agreed actions.', ['Roles and responsibilities']],
  ['feedback-no-answer', 'Feedback forms are collected, but people have not heard what happened next.', ['Accountability and transparency']],
  ['consent-unclear', 'Field staff are collecting photos and stories, but consent is not always clear.', ['Safe use of information']],
];

const principleOptions = [
  'Non-discrimination and equality',
  'Meaningful participation',
  'Accountability and transparency',
  'Roles and responsibilities',
  'Safe use of information',
];

const feedbackSteps = ['Receive feedback', 'Review feedback', 'Decide what can be changed', 'Respond to rights-holders', 'Follow up', 'Record safely'];
const feedbackStepPositions = Object.fromEntries(feedbackSteps.map((step, index) => [step, String(index + 1)]));

const roleActions = [
  ['commitment-info', 'Explain the service commitment and provide follow-up information.', 'CSO and duty-bearer together'],
  ['raise-concerns', 'Raise concerns and share experience safely.', 'Rights-holders'],
  ['document-issue', 'Review its own project actions and document the issue.', 'CSO'],
  ['respond-service', 'Respond to the public service commitment.', 'Duty-bearer'],
  ['support-communication', 'Support communication, but not control access to support.', 'Community structure'],
];

const roleOptions = ['Rights-holders', 'CSO', 'Duty-bearer', 'Community structure', 'CSO and duty-bearer together'];

const safeInfoOptions = [
  ['A', 'Full names, photos, exact kebele, and personal complaint details.', 'Do not use'],
  ['B', 'A general example showing the type of change, without names or identifying details.', 'Safer to use'],
  ['C', 'A group-level summary of feedback trends and actions taken.', 'Safer to use'],
  ['D', 'A personal story shared with clear consent, no sensitive details, and no identifying information.', 'Use with caution'],
  ['E', 'A photo collected quickly because the donor requested it.', 'Do not use'],
];

const nonDiscriminationQuestions = [
  'Who is receiving project support?',
  'Who is not receiving support?',
  'Are the selection criteria clear?',
  'Are some groups benefiting more than others?',
  'Are any groups facing barriers to information, participation, or benefit?',
  'Is the project reinforcing existing inequalities?',
];

const participationQuestions = [
  'Are rights-holders receiving information in a way they understand?',
  'Are different groups able to express their views safely?',
  'Are women, youth, persons with disabilities, low-income households, informal workers, and people from remote kebeles able to influence decisions?',
  'Are rights-holders involved when changes are made to the project?',
  'Are their views used in follow-up decisions?',
];

const accountabilityQuestions = [
  'Do rights-holders know the project criteria, activities, and changes?',
  'Do people know who is responsible for decisions?',
  'Can people ask questions or raise concerns safely?',
  'Is feedback reviewed and answered?',
  'Are results and changes shared with rights-holders in a clear accessible way?',
  'Is project information documented properly?',
];

const csoMayActions = [
  'support rights-holders to understand and claim their rights;',
  'facilitate dialogue between rights-holders and duty-bearers;',
  'monitor whether commitments are followed up;',
  'document concerns and project learning;',
  'adjust its own activities when needed;',
  'engage duty-bearers constructively.',
];

const csoAvoidActions = [
  'taking over all duty-bearer responsibilities;',
  'blaming actors publicly without checking evidence and risk;',
  'exposing people who raise concerns;',
  'creating confusion about who is responsible for what.',
];

const empowermentQuestions = [
  'Do rights-holders understand the project, the criteria, and their rights?',
  'Are they able to ask questions or raise concerns safely?',
  'Are excluded groups receiving the support they need to participate?',
  'Do duty-bearers understand the commitments made during the project?',
  'Does the project strengthen the ability of both rights-holders and duty-bearers to act?',
];

const adjustmentQuestions = [
  'What is the issue?',
  'Who may be affected differently?',
  'What information do we have?',
  'What information can be collected safely?',
  'What can the CSO change?',
  'Which duty-bearer or actor should be engaged?',
  'How will the change be explained?',
  'How will the change be documented?',
];

const safeInformationQuestions = [
  'Why do we need this information?',
  'Is the information necessary?',
  'Did people understand how the information will be used?',
  'Is consent clear?',
  'Could the information expose or harm anyone?',
  'Can the information be reported in a general or anonymous way?',
  'Who will have access to the information?',
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

function markOnly(screenId: string, onChangeState: Module4RendererProps['onChangeState'], practiceKey: string, payload: Record<string, unknown> = {}) {
  onChangeState((prev) => ({
    ...prev,
    screenProgress: addProgress(prev, screenId),
    practiceCheckState: updatePracticeState(prev, practiceKey, payload),
  }));
}

function ModuleContextLabel({ children }: { children: string }) {
  return <p className="m4-context-label">{children}</p>;
}

function PrimaryButton({ children, onClick, disabled = false }: { children: string; onClick: () => void; disabled?: boolean }) {
  return <button type="button" className="m4-primary-button" onClick={onClick} disabled={disabled}>{children}</button>;
}

function QuestionList({ title, items }: { title: string; items: string[] }) {
  return (
    <aside className="m4-question-list">
      <h2>{title}</h2>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </aside>
  );
}

function IntroScreen({ onChangeState }: Module4RendererProps) {
  const [selected, setSelected] = useState(false);
  return (
    <main className="m4-screen m4-final-screen" aria-labelledby="m4-s1-title">
      <section className="m4-final-two-col">
        <article className="m4-final-card">
          <ModuleContextLabel>MODULE 4</ModuleContextLabel>
          <h1 id="m4-s1-title">Applying HRBA During Implementation</h1>
          <p>A Human Rights-Based Approach should be applied in all stages of a CSO project.</p>
          <ul><li>situation analysis;</li><li>planning and design;</li><li>implementation;</li><li>monitoring and evaluation.</li></ul>
          <p>This module focuses on implementation.</p>
          <p>During implementation, a CSO should not only ask whether activities are completed. It should also ask whether the project is being carried out in a way that respects human rights principles.</p>
          <ul><li>non-discrimination and equality;</li><li>meaningful participation;</li><li>accountability and transparency;</li><li>empowerment and capacity development;</li><li>the roles of rights-holders and duty-bearers;</li><li>safe and responsible use of information.</li></ul>
          <div className="m4-final-key"><strong>Key message</strong><p>HRBA during implementation means carrying out project activities in a way that is fair, participatory, accountable, transparent, and respectful of human dignity.</p></div>
        </article>
        <aside className="m4-final-card m4-final-visual">
          <p className="m4-card-kicker">Project cycle highlight</p>
          <div className="m4-cycle-strip" aria-label="Project cycle">
            {projectCycle.map((step) => (
              <button key={step} type="button" className={step === 'Implementation' && selected ? 'is-selected' : ''} onClick={() => step === 'Implementation' && setSelected(true)}>
                {step}
              </button>
            ))}
          </div>
          <p>Click <strong>Implementation</strong> in the project-cycle strip.</p>
          <PrimaryButton disabled={!selected} onClick={() => completeScreen('M4-S1-01', 'M4-S1-02', onChangeState, 'module4ProjectCycleHighlight', { selected: 'Implementation' })}>Continue</PrimaryButton>
        </aside>
      </section>
    </main>
  );
}

function ObjectivesScreen({ onChangeState }: Module4RendererProps) {
  const [opened, setOpened] = useState<string[]>([]);
  const openCard = (id: string) => setOpened((prev) => prev.includes(id) ? prev : [...prev, id]);
  return (
    <main className="m4-screen m4-final-screen" aria-labelledby="m4-s2-title">
      <section className="m4-final-stack">
        <article className="m4-final-card">
          <ModuleContextLabel>MODULE 4</ModuleContextLabel>
          <h1 id="m4-s2-title">Learning Objectives</h1>
          <p>By the end of this module, you will be able to:</p>
        </article>
        <section className="m4-final-grid" aria-label="Learning objective cards">
          {objectives.map((objective, index) => (
            <button key={objective} type="button" className={`m4-final-reveal ${opened.includes(objective) ? 'is-open' : ''}`} onClick={() => openCard(objective)}>
              <span>{index + 1}</span>
              <strong>{opened.includes(objective) ? objective : objectiveFrontLabels[index]}</strong>
            </button>
          ))}
        </section>
        <PrimaryButton disabled={opened.length < objectives.length} onClick={() => completeScreen('M4-S1-02', 'M4-S1-03', onChangeState, 'module4ObjectivesViewed', { opened })}>Continue</PrimaryButton>
      </section>
    </main>
  );
}

function PrinciplesScreen({ onChangeState }: Module4RendererProps) {
  const [opened, setOpened] = useState<string[]>([]);
  const openCard = (id: string) => setOpened((prev) => prev.includes(id) ? prev : [...prev, id]);
  return (
    <main className="m4-screen m4-final-screen" aria-labelledby="m4-s3-title">
      <section className="m4-final-stack">
        <article className="m4-final-card">
          <ModuleContextLabel>MODULE 4</ModuleContextLabel>
          <h1 id="m4-s3-title">HRBA in the Project Cycle</h1>
          <p>HRBA is not an additional activity that is added after a project has already been designed. It should guide the whole project cycle.</p>
          <p>During implementation, the CSO should continue to ask the questions below. The local context should always guide the way HRBA is applied. If the situation changes, the CSO may need to adjust the project in a safe and responsible way.</p>
          <div className="m4-final-key"><strong>Key message</strong><p>Implementation is not only delivery. It is also a time to check whether the project continues to respect HRBA principles.</p></div>
        </article>
        <section className="m4-principle-cluster" aria-label="Implementation principle cards">
          <div className="m4-principle-center">Implementation</div>
          {principleCards.map(([title, text]) => (
            <button key={title} type="button" className={`m4-final-reveal ${opened.includes(title) ? 'is-open' : ''}`} onClick={() => openCard(title)}>
              <strong>{title}</strong>
              {opened.includes(title) && <p>{text}</p>}
            </button>
          ))}
        </section>
        <PrimaryButton disabled={opened.length < principleCards.length} onClick={() => completeScreen('M4-S1-03', 'M4-S1-04', onChangeState, 'module4PrinciplesViewed', { opened })}>Continue</PrimaryButton>
      </section>
    </main>
  );
}

function ScenarioMatchScreen({ onChangeState }: Module4RendererProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const complete = scenarioIssues.every(([id]) => answers[id]);
  return (
    <main className="m4-screen m4-final-screen" aria-labelledby="m4-s4-title">
      <section className="m4-final-two-col">
        <article className="m4-final-card">
          <ModuleContextLabel>MODULE 4</ModuleContextLabel>
          <h1 id="m4-s4-title">Practical Example: The Project Is Being Implemented</h1>
          <p>Awra Grassroots Initiative is implementing a project in Jiru Amba.</p>
          <p>The project supports livelihood support for women vendors and youth groups; follow-up with woreda offices on market, water, and health-post commitments; community feedback on service improvements; basic accessibility and communication improvements; public dialogue between community members, CSOs, and duty-bearers; and monitoring and reporting to the donor.</p>
          <p>After two months, activities are taking place. Reports show progress. However, the CSO notices some issues.</p>
        </article>
        <section className="m4-final-card">
          <h2>Match each issue with the main HRBA principle the CSO should check first.</h2>
          <div className="m4-final-form-list">
            {scenarioIssues.map(([id, issue, correctOptions]) => (
              <label key={id}>
                <span>{issue}</span>
                <select value={answers[id] || ''} onChange={(event) => setAnswers({ ...answers, [id]: event.target.value })}>
                  <option value="">Choose a principle</option>
                  {principleOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
                {submitted && <small>{correctOptions.includes(answers[id]) ? 'Useful match.' : `Suggested first check: ${correctOptions.join(' / ')}.`}</small>}
              </label>
            ))}
          </div>
          {submitted && <div className="m4-final-key"><p>These issues are not only implementation delays. They may affect HRBA principles. The CSO should check who is affected, what responsibility exists, what information is needed, and what should be adjusted safely.</p></div>}
          {!submitted ? <PrimaryButton disabled={!complete} onClick={() => { setSubmitted(true); markOnly('M4-S1-04', onChangeState, 'module4ScenarioMatch', { answers }); }}>Check matches</PrimaryButton> : <PrimaryButton onClick={() => completeScreen('M4-S1-04', 'M4-S1-05', onChangeState, 'module4ScenarioMatch', { answers, submitted: true })}>Continue</PrimaryButton>}
        </section>
      </section>
    </main>
  );
}

function RankingScreen({ onChangeState }: Module4RendererProps) {
  const [rank, setRank] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const actions = {
    A: 'Accept the revised list because the local committee has knowledge of the community, but ask the committee to explain the changes later.',
    B: 'Review the revised list against the agreed criteria, check whether any group has been unfairly excluded, protect people who raised concerns, and explain the process clearly.',
    C: 'Reject the revised list immediately and prepare a new list using only the CSO field team’s judgment.',
  };
  return (
    <DecisionScreenShell
      screenId="M4-S1-05"
      nextId="M4-S1-06"
      title="Ensuring Non-Discriminatory Practices"
      intro={['Non-discrimination and equality are core principles of HRBA.', 'During implementation, the CSO should check whether all rights-holders are able to access and benefit from the project fairly.', 'Some groups may face barriers because of gender, age, disability, income, language, location, social status, lack of information, or local power relations.', 'A livelihood support list was agreed during planning. During implementation, the list changes after a local committee discussion. Some low-income households and informal workers are no longer included. This may raise a concern about fairness and non-discrimination.']}
      visual="Criteria -> Review -> Explain"
      onChangeState={onChangeState}
      completeKey="module4NonDiscriminationRanking"
      completedPayload={{ rank, submitted: true }}
      canComplete={submitted}
    >
      <QuestionList title="The CSO should ask:" items={nonDiscriminationQuestions} />
      <h2>Rank the three possible first actions from strongest to weakest.</h2>
      <div className="m4-final-form-list">
        {Object.entries(actions).map(([id, text]) => (
          <label key={id}><span><strong>Action {id}.</strong> {text}</span><select value={rank[id] || ''} onChange={(event) => setRank({ ...rank, [id]: event.target.value })}><option value="">Choose rank</option><option>Strongest</option><option>Partly useful but incomplete</option><option>Weak</option></select></label>
        ))}
      </div>
      {submitted && <FeedbackBlock lines={['Strongest: B. This action checks fairness, uses the agreed criteria, protects people, and explains the process.', 'Partly useful but incomplete: A. Local knowledge is useful, but it should not replace clear criteria and wider checking.', 'Weak: C. The CSO should not replace one unclear process with another unclear process.']} />}
      {!submitted && <PrimaryButton disabled={Object.keys(rank).length < 3 || new Set(Object.values(rank)).size < 3} onClick={() => { setSubmitted(true); markOnly('M4-S1-05', onChangeState, 'module4NonDiscriminationRanking', { rank, correct: rank.B === 'Strongest' && rank.A === 'Partly useful but incomplete' && rank.C === 'Weak' }); }}>Check ranking</PrimaryButton>}
    </DecisionScreenShell>
  );
}

function ParticipationScreen({ onChangeState }: Module4RendererProps) {
  const choices: Choice[] = [
    { id: 'A', text: 'Invite youth to the next meeting and ask one youth representative to report back to others.', feedback: 'A is partly useful but incomplete. Representation may help, but one representative may not reflect different youth experiences.' },
    { id: 'B', text: 'Create a safe way for different youth groups to share views before follow-up decisions are made, explain how their views will be used, and include them in the follow-up discussion.', feedback: 'B is strongest. It gives youth a real way to influence the follow-up decision.', correct: true },
    { id: 'C', text: 'Record youth attendance carefully and include the attendance number in the next donor report.', feedback: 'C is weak. Attendance numbers do not show meaningful participation.' },
  ];
  return <ChoicePractice screenId="M4-S1-06" nextId="M4-S1-07" title="Realizing Meaningful Participation" intro={['Participation is a core principle of HRBA.', 'In HRBA, participation is not only attending an activity. It is also about being able to influence decisions that affect people’s lives.', 'Youth attend training sessions and sign the attendance sheet. However, when the project discusses follow-up support, only adults and local leaders are invited. Youth are present, but they are not influencing decisions that affect them.']} visual="Present -> Consulted -> Influencing decisions" prompt="Choose the response that best strengthens meaningful participation." choices={choices} keyMessage="Meaningful participation means rights-holders can take part, express views safely, and influence decisions that affect them." stateKey="module4ParticipationDecision" questionTitle="During implementation, the CSO should ask:" questionItems={participationQuestions} onChangeState={onChangeState} />;
}

function FeedbackSequenceScreen({ onChangeState }: Module4RendererProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  return (
    <DecisionScreenShell screenId="M4-S1-07" nextId="M4-S1-08" title="Accountability and Transparency" intro={['Accountability means that duty-bearers and other responsible actors should explain their actions and respond to concerns.', 'Transparency means that people have access to clear and relevant information.', 'The CSO collects feedback forms every month. Many people ask why follow-up support has not happened. The team records the comments and includes the number of feedback forms in the donor report, but no response is shared with the people who raised the issue.']} visual="Receive -> Review -> Decide -> Respond -> Follow up -> Record safely" onChangeState={onChangeState} completeKey="module4FeedbackSequence" completedPayload={{ answers, submitted: true }} canComplete={submitted}>
      <QuestionList title="During implementation, the CSO should ask:" items={accountabilityQuestions} />
      <h2>Arrange the feedback process in the correct order.</h2>
      <div className="m4-final-form-list">
        {feedbackSteps.map((step) => <label key={step}><span>{step}</span><select value={answers[step] || ''} onChange={(event) => setAnswers({ ...answers, [step]: event.target.value })}><option value="">Choose position</option>{feedbackSteps.map((_, index) => <option key={index}>{index + 1}</option>)}</select></label>)}
      </div>
      {submitted && <FeedbackBlock lines={['A feedback system is not complete when feedback is only collected and reported.', 'It should be reviewed, answered, followed up, and used to improve the project.', 'Suggested order: Receive, Review, Decide, Respond, Follow up, Record safely.']} />}
      {!submitted && <PrimaryButton disabled={Object.keys(answers).length < feedbackSteps.length || new Set(Object.values(answers)).size < feedbackSteps.length} onClick={() => { setSubmitted(true); markOnly('M4-S1-07', onChangeState, 'module4FeedbackSequence', { answers, correct: feedbackSteps.every((step) => answers[step] === feedbackStepPositions[step]) }); }}>Check sequence</PrimaryButton>}
    </DecisionScreenShell>
  );
}

function RoleMatchScreen({ onChangeState }: Module4RendererProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  return (
    <DecisionScreenShell screenId="M4-S1-08" nextId="M4-S1-09" title="Rights-Holders, Duty-Bearers, and the Role of CSOs" intro={['In HRBA, every person is a rights-holder. Every right also has corresponding duty-bearers.', 'The State is the primary duty-bearer. This includes public institutions and officials with responsibility to respect, protect, and fulfil rights.', 'During implementation, CSOs should support accountability, but they should not replace duty-bearers.', 'A woreda sector office agreed to follow up on a water service issue, but no action has happened. Community members ask the CSO to solve the full issue alone.']} visual="Rights-holders / CSO / Duty-bearers / Community structures" onChangeState={onChangeState} completeKey="module4RoleMatching" completedPayload={{ answers, submitted: true }} canComplete={submitted}>
      <div className="m4-balanced-panels">
        <QuestionList title="A CSO may:" items={csoMayActions} />
        <QuestionList title="A CSO should avoid:" items={csoAvoidActions} />
      </div>
      <h2>Match each action to the most appropriate actor.</h2>
      <div className="m4-final-form-list">
        {roleActions.map(([id, action, correct]) => <label key={id}><span>{action}</span><select value={answers[id] || ''} onChange={(event) => setAnswers({ ...answers, [id]: event.target.value })}><option value="">Choose actor</option>{roleOptions.map((option) => <option key={option}>{option}</option>)}</select>{submitted && <small>{answers[id] === correct ? 'Useful match.' : `Suggested match: ${correct}.`}</small>}</label>)}
      </div>
      {submitted && <FeedbackBlock lines={['HRBA implementation requires clear roles.', 'The CSO can support communication and accountability, but it should not replace the duty-bearer.', 'HRBA accountability does not always mean confrontation. It can also mean clear roles, constructive engagement, follow-up, and support for duty-bearers to fulfil their responsibilities.']} />}
      {!submitted && <PrimaryButton disabled={Object.keys(answers).length < roleActions.length} onClick={() => { setSubmitted(true); markOnly('M4-S1-08', onChangeState, 'module4RoleMatching', { answers }); }}>Check roles</PrimaryButton>}
    </DecisionScreenShell>
  );
}

function EmpowermentScreen({ onChangeState }: Module4RendererProps) {
  const choices: Choice[] = [
    { id: 'A', text: 'Tell people once that they can give feedback, and leave the feedback box at the project office.', feedback: 'A is incomplete. Information given once may not be enough.' },
    { id: 'B', text: 'Explain what issues can be raised, who reviews feedback, how people will receive a response, and how privacy will be protected.', feedback: 'B is strongest. It helps rights-holders understand and use the feedback process safely.', correct: true },
    { id: 'C', text: 'Ask local leaders to collect all concerns and report them to the CSO.', feedback: 'C may create risk. Local leaders can support communication, but they should not control who can raise concerns.' },
  ];
  return <ChoicePractice screenId="M4-S1-09" nextId="M4-S1-10" title="Empowerment and Capacity Development" intro={['Empowerment and capacity development are important principles of HRBA.', 'Rights-holders should be supported to know their rights, participate in decisions, ask questions, and claim their rights.', 'Duty-bearers should be supported to understand and fulfil their responsibilities.', 'Community members are told that they can give feedback. However, many do not know what issues they can raise, who will review the feedback, or whether it is safe to complain.']} visual="Rights-holders strengthened / Duty-bearers supported" prompt="Choose the strongest capacity-development action." choices={choices} keyMessage="Empowerment is not only giving information. It is helping rights-holders use information, participate, and claim their rights safely." stateKey="module4EmpowermentDecision" questionTitle="During implementation, the CSO should ask:" questionItems={empowermentQuestions} onChangeState={onChangeState} />;
}

function AdjustmentScreen({ onChangeState }: Module4RendererProps) {
  const choices: Choice[] = [
    { id: 'A', text: 'Continue with the current plan, but include the concern in the final report.', feedback: 'A is incomplete. Recording the concern later does not address the immediate risk.' },
    { id: 'B', text: 'Pause the relevant part of the activity briefly, review the concern safely, explain the criteria, protect people who raised the issue, and adjust the process if it is unfair.', feedback: 'B is strongest. It checks the issue, protects people, explains the process, and allows a necessary adjustment.', correct: true },
    { id: 'C', text: 'Ask the local committee to identify the people who complained so that the CSO can speak with them directly.', feedback: 'C is unsafe. People who raise concerns should not be exposed.' },
  ];
  return <ChoicePractice screenId="M4-S1-10" nextId="M4-S1-11" title="Making Necessary Adjustments During Implementation" intro={['A project plan is important. However, implementation may show that something needs to change.', 'A CSO should make necessary adjustments when evidence shows that the project is excluding people, creating risk, or not meeting HRBA principles.', 'The project is behind schedule. The team wants to continue quickly. However, feedback shows that some people do not understand the selection criteria and are afraid to ask questions.']} visual="Issue -> People affected -> Evidence -> Action -> Follow-up" prompt="Select the most appropriate adjustment." choices={choices} keyMessage="Making adjustments is part of good implementation when the change is based on evidence, protects people, and is documented safely." stateKey="module4AdjustmentDecision" questionTitle="Before making an adjustment, the CSO should ask:" questionItems={adjustmentQuestions} onChangeState={onChangeState} />;
}

function SafeInformationScreen({ onChangeState }: Module4RendererProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  return (
    <DecisionScreenShell screenId="M4-S1-11" nextId="M4-S1-12" title="Safe Use of Information During Implementation" intro={['During implementation, CSOs collect information for monitoring, reporting, learning, and accountability.', 'This information may include attendance, feedback, photos, stories, complaints, case examples, and monitoring notes.', 'The CSO should collect and use information carefully.', 'A donor asks for photos and personal stories to show project results. Some people do not clearly understand how the photos and stories will be used.']} visual="Safer to use / Use with caution / Do not use" onChangeState={onChangeState} completeKey="module4SafeInformationSort" completedPayload={{ answers, submitted: true }} canComplete={submitted}>
      <QuestionList title="The CSO should ask:" items={safeInformationQuestions} />
      <h2>Select the information that is safer to use in a project report.</h2>
      <div className="m4-final-form-list">
        {safeInfoOptions.map(([id, text, correct]) => <label key={id}><span><strong>{id}.</strong> {text}</span><select value={answers[id] || ''} onChange={(event) => setAnswers({ ...answers, [id]: event.target.value })}><option value="">Choose category</option><option>Safer to use</option><option>Use with caution</option><option>Do not use</option></select>{submitted && <small>{answers[id] === correct ? 'Useful category.' : `Suggested category: ${correct}.`}</small>}</label>)}
      </div>
      {submitted && <FeedbackBlock lines={['B and C are generally safer.', 'D may be acceptable only if consent is clear and the story does not expose the person.', 'A and E are unsafe. Good reporting should not expose rights-holders or create risk.']} />}
      {!submitted && <PrimaryButton disabled={Object.keys(answers).length < safeInfoOptions.length} onClick={() => { setSubmitted(true); markOnly('M4-S1-11', onChangeState, 'module4SafeInformationSort', { answers }); }}>Check sorting</PrimaryButton>}
    </DecisionScreenShell>
  );
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

function DecisionScreenShell({
  screenId,
  nextId,
  title,
  intro,
  visual,
  children,
  onChangeState,
  completeKey,
  completedPayload,
  canComplete,
}: {
  screenId: string;
  nextId: string;
  title: string;
  intro: string[];
  visual: string;
  children: ReactNode;
  onChangeState: Module4RendererProps['onChangeState'];
  completeKey: string;
  completedPayload: Record<string, unknown>;
  canComplete: boolean;
}) {
  return (
    <main className="m4-screen m4-final-screen" aria-labelledby={`${screenId}-title`}>
      <section className="m4-final-two-col">
        <article className="m4-final-card">
          <ModuleContextLabel>MODULE 4</ModuleContextLabel>
          <h1 id={`${screenId}-title`}>{title}</h1>
          {intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="m4-process-line">{visual}</div>
        </article>
        <section className="m4-final-card">
          {children}
          {canComplete && <PrimaryButton onClick={() => completeScreen(screenId, nextId, onChangeState, completeKey, completedPayload)}>Continue</PrimaryButton>}
        </section>
      </section>
    </main>
  );
}

function ChoicePractice({
  screenId,
  nextId,
  title,
  intro,
  visual,
  prompt,
  choices,
  keyMessage,
  stateKey,
  questionTitle,
  questionItems,
  onChangeState,
}: {
  screenId: string;
  nextId: string;
  title: string;
  intro: string[];
  visual: string;
  prompt: string;
  choices: Choice[];
  keyMessage: string;
  stateKey: string;
  questionTitle?: string;
  questionItems?: string[];
  onChangeState: Module4RendererProps['onChangeState'];
}) {
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <DecisionScreenShell screenId={screenId} nextId={nextId} title={title} intro={intro} visual={visual} onChangeState={onChangeState} completeKey={stateKey} completedPayload={{ selected, submitted: true }} canComplete={submitted}>
      {questionTitle && questionItems && <QuestionList title={questionTitle} items={questionItems} />}
      <h2>{prompt}</h2>
      <div className="m4-choice-list" role="radiogroup" aria-label={prompt}>
        {choices.map((choice) => <button key={choice.id} type="button" role="radio" aria-checked={selected === choice.id} className={`${selected === choice.id ? 'is-selected' : ''} ${submitted && choice.correct ? 'is-correct' : ''}`} onClick={() => !submitted && setSelected(choice.id)}><span>{choice.id}</span>{choice.text}</button>)}
      </div>
      {submitted && <FeedbackBlock lines={[...choices.map((choice) => choice.feedback), keyMessage]} />}
      {!submitted && <PrimaryButton disabled={!selected} onClick={() => { setSubmitted(true); markOnly(screenId, onChangeState, stateKey, { selected }); }}>Submit answer</PrimaryButton>}
    </DecisionScreenShell>
  );
}

function FeedbackBlock({ lines }: { lines: string[] }) {
  return <div className="m4-final-key" aria-live="polite">{lines.map((line) => <p key={line}>{line}</p>)}</div>;
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
  if (props.screenId === 'M4-S1-01') return <IntroScreen {...props} />;
  if (props.screenId === 'M4-S1-02') return <ObjectivesScreen {...props} />;
  if (props.screenId === 'M4-S1-03') return <PrinciplesScreen {...props} />;
  if (props.screenId === 'M4-S1-04') return <ScenarioMatchScreen {...props} />;
  if (props.screenId === 'M4-S1-05') return <RankingScreen {...props} />;
  if (props.screenId === 'M4-S1-06') return <ParticipationScreen {...props} />;
  if (props.screenId === 'M4-S1-07') return <FeedbackSequenceScreen {...props} />;
  if (props.screenId === 'M4-S1-08') return <RoleMatchScreen {...props} />;
  if (props.screenId === 'M4-S1-09') return <EmpowermentScreen {...props} />;
  if (props.screenId === 'M4-S1-10') return <AdjustmentScreen {...props} />;
  if (props.screenId === 'M4-S1-11') return <SafeInformationScreen {...props} />;
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
