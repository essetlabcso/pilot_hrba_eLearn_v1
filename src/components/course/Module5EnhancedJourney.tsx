import { useEffect, useMemo, useRef, useState } from 'react';
import type { LearningState } from '../../state/learningState';
import {
  MODULE5_ID,
  MODULE5_SCREEN_ROUTES,
  buildModule5DownloadText,
} from '../../data/module5/module5EnhancedModel';
import './module5-enhanced.css';

type ChangeState = (updater: (previous: LearningState) => LearningState) => void;
type Props = { screenId: string; state: LearningState; onChangeState: ChangeState };
type Choice = { id: string; label: string; feedback: string; strong?: boolean };
type Task = { id: string; prompt: string; choices: Choice[]; multiple?: boolean; required?: number };
type ScreenSpec = {
  number: number;
  id: string;
  key: string;
  next: string;
  stage: string;
  title: string;
  explanation: string;
  example: string;
  learn: Array<[string, string]>;
  tasks: Task[];
  output: string;
  safety: string;
};

const safeEntry = 'Use only fictional Jiru Amba information or generalized CSO practice. Do not enter real names, exact locations, medical or disability details, survivor information, identifiable complaints, political accusations, contact details, or confidential records.';
const choice = (id: string, label: string, feedback: string, strong = false): Choice => ({ id, label, feedback, strong });

const specs: Record<string, ScreenSpec> = {
  'M5-R01': {
    number: 2, id: 'M5-R01', key: 'm5_s02', next: 'M5-R02', stage: 'Recognise the evidence gap',
    title: 'Why HRBA Matters in MEAL',
    explanation: 'Activity totals are useful, but they cannot show by themselves who was excluded, whether participation influenced a decision, or whether feedback received a response.',
    example: 'Jiru Amba reports six meetings, 240 attendances, one feedback box and four positive stories. The figures show delivery, not equal access, influence, safety or accountability.',
    learn: [['Look beyond totals', 'Ask who participated, who was missing, and which barriers shaped access.'], ['Connect evidence to action', 'Collect evidence because it can inform a responsible decision, referral, adaptation or account-back.']],
    tasks: [{ id: 'gap', prompt: 'Choose the three questions that most affect whether Awra can call the work successful.', multiple: true, required: 3, choices: [
      choice('missing', 'Who was missing, and what barriers affected access?', 'Strong: totals cannot reveal exclusion or barriers.', true),
      choice('influence', 'Did people’s views influence a decision?', 'Strong: meaningful participation includes influence.', true),
      choice('response', 'What happened after feedback was received?', 'Strong: accountability requires response, referral or explanation.', true),
      choice('stories', 'Should Awra collect more positive stories?', 'More stories do not resolve missing evidence about exclusion or response.'),
      choice('wording', 'Should the report use stronger success language?', 'Stronger language cannot replace evidence.'),
    ] }],
    output: 'Evidence-gap statement', safety: safeEntry,
  },
  'M5-R02': {
    number: 3, id: 'M5-R02', key: 'm5_s03', next: 'M5-R03', stage: 'Choose a safe route',
    title: 'Learning Objectives and MEAL Roadmap',
    explanation: 'The journey moves through planning, monitoring, safe evidence, interpretation, accountability, learning and adaptation. At every stage, use four moves: see, protect, act and account.',
    example: 'You may stay with the fictional Jiru Amba case or apply the same questions to a generalized CSO activity. Both routes avoid personal or confidential information.',
    learn: [['See', 'Notice who is reached, excluded or influential.'], ['Protect', 'Minimize data and prevent exposure, retaliation and harm.'], ['Act', 'Match evidence to realistic responsibility.'], ['Account', 'Explain what was heard, decided and done.']],
    tasks: [{ id: 'route', prompt: 'Choose your practice route.', choices: [
      choice('jiru', 'Jiru Amba fictional case', 'Recommended: all examples are fictional and safe for practice.', true),
      choice('general', 'My generalized CSO activity', 'Suitable when you use no names, precise locations or sensitive details.', true),
    ] }],
    output: 'Safe practice route', safety: safeEntry,
  },
  'M5-R03': {
    number: 4, id: 'M5-R03', key: 'm5_s04', next: 'M5-R04', stage: 'Apply the HRBA lens',
    title: 'The MEAL Cycle Through an HRBA Lens',
    explanation: 'HRBA strengthens familiar MEAL practice: monitoring sees access and barriers; evaluation examines change and difference; accountability makes response visible; learning turns evidence into adaptation.',
    example: 'A participation barrier is monitored, interpreted with affected people, addressed through a timing change, and explained back through an accessible route.',
    learn: [['Monitoring', 'Track progress, participation, barriers and emerging risk.'], ['Evaluation', 'Examine what changed, for whom and why.'], ['Accountability', 'Receive, respond, refer and account back.'], ['Learning', 'Continue, adapt, consult, refer or pause.']],
    tasks: [
      { id: 'track', prompt: 'Track who could not reach a consultation.', choices: [choice('monitoring', 'Monitoring', 'Correct: this tracks access during implementation.', true), choice('evaluation', 'Evaluation', 'Evaluation may use it later, but routine tracking comes first.')] },
      { id: 'sustain', prompt: 'Examine whether improved water access lasted.', choices: [choice('evaluation', 'Evaluation', 'Correct: this examines sustained change.', true), choice('accountability', 'Accountability', 'Accountability concerns response and explanation.')] },
      { id: 'adapt', prompt: 'Change meeting timing after reviewing barriers.', choices: [choice('learning', 'Learning and adaptation', 'Correct: evidence is changing practice.', true), choice('monitoring', 'Monitoring only', 'Monitoring found the barrier; adaptation is the next step.')] },
    ],
    output: 'HRBA MEAL cycle decisions', safety: 'If evidence suggests harm, retaliation or safeguarding risk, do not investigate through a learning exercise. Pause, protect confidentiality and use the approved specialist pathway.',
  },
  'M5-R04': {
    number: 5, id: 'M5-R04', key: 'm5_s05', next: 'M5-R05', stage: 'Plan what matters',
    title: 'Define Results, Success and Learning Questions',
    explanation: 'Begin with the change that matters, whose rights are involved, and the decision the evidence should support. A coherent chain links result, success signs and a usable MEAL question.',
    example: 'Result: people facing barriers participate and influence follow-up. Success signs include accessible information, participation, influence and response.',
    learn: [['Result', 'Describe the meaningful change, not only delivery.'], ['Success signs', 'Include what rights-holders and responsible actors would notice.'], ['Learning question', 'Ask a question that can guide a decision.']],
    tasks: [
      { id: 'result', prompt: 'Choose the strongest priority result.', choices: [choice('meaningful', 'People facing barriers can participate and influence follow-up decisions.', 'Strong: this joins access and influence.', true), choice('meetings', 'All planned meetings take place.', 'This is an output, not yet a rights-sensitive result.')] },
      { id: 'question', prompt: 'Choose the strongest MEAL question.', choices: [choice('groups', 'Which broad groups participated, what barriers remained, and how did input influence follow-up?', 'Strong: it examines difference and decision use.', true), choice('count', 'How many attendances were recorded?', 'This cannot explain unequal access or influence.')] },
    ],
    output: 'Priority result and learning question', safety: safeEntry,
  },
  'M5-R05': {
    number: 6, id: 'M5-R05', key: 'm5_s06', next: 'M5-R06', stage: 'Build decision-useful indicators',
    title: 'Monitoring: Build Rights-Based Indicators',
    explanation: 'A useful indicator connects a decision, rights question, measure, safe source and action trigger. Combine output, process and outcome evidence where it improves the decision.',
    example: 'Instead of attendance alone: number and percentage of participants using broad voluntary access categories who say their views influenced a decision, using an anonymous pulse question and decision record.',
    learn: [['Output', 'What was delivered.'], ['Process', 'How access, participation and accountability were supported.'], ['Outcome', 'What changed for people, practices or institutions.']],
    tasks: [
      { id: 'indicator', prompt: 'Choose the safer, stronger indicator.', choices: [choice('influence', 'Percentage in broad voluntary access categories reporting influence on a follow-up decision.', 'Strong: it combines reach, difference and influence.', true), choice('names', 'Named list with diagnoses and complaint histories.', 'Unsafe and unnecessary: do not collect this.'), choice('total', 'Total attendance only.', 'Useful output evidence, but insufficient alone.')] },
      { id: 'trigger', prompt: 'Choose an action trigger.', choices: [choice('adapt', 'If access or influence is lower, adapt timing, communication, support or facilitation.', 'Strong: the evidence leads to a realistic action.', true), choice('hide', 'Remove low results from the dashboard.', 'Hiding results undermines learning and accountability.')] },
    ],
    output: 'Rights-based indicator and action trigger', safety: 'Gender- and disability-related information must be voluntary, broadly described, necessary for a decision and possible to protect. Never request a diagnosis or intimate detail here.',
  },
  'M5-R06': {
    number: 7, id: 'M5-R06', key: 'm5_s07', next: 'M5-R07', stage: 'Choose a proportionate evidence mix',
    title: 'Data Collection: Choose the Right Methods',
    explanation: 'Choose methods for the question, people, context and decision. Balance access, burden, literacy, language, confidentiality, facilitation capacity and analysis.',
    example: 'A monitoring log can compare information routes; a short anonymous pulse question adds participant experience. Neither requires names.',
    learn: [['Fit', 'Match method to question and decision.'], ['Access', 'Offer realistic language, format and participation adaptations.'], ['Burden', 'Collect only what will be used and can be protected.']],
    tasks: [
      { id: 'routes', prompt: 'How should Awra check information routes and timeliness?', multiple: true, required: 2, choices: [choice('log', 'General monitoring log', 'Strong for comparable route and timing records.', true), choice('pulse', 'Anonymous short pulse question', 'Strong for participant experience.', true), choice('story', 'One positive story only', 'A story cannot provide comparable reach evidence.')] },
      { id: 'access', prompt: 'How should Awra understand why service access remained difficult?', multiple: true, required: 2, choices: [choice('observe', 'Accessibility observation checklist', 'Strong for physical and practical conditions.', true), choice('discussion', 'Accessible facilitated discussion', 'Strong for reasons and experience when safely facilitated.', true), choice('attendance', 'Attendance record only', 'Attendance cannot explain why access was difficult.')] },
    ],
    output: 'Proportionate mixed-method evidence plan', safety: safeEntry,
  },
  'M5-R07': {
    number: 8, id: 'M5-R07', key: 'm5_s08', next: 'M5-R08', stage: 'Protect people and minimize data',
    title: 'Safe Evidence and Disaggregation',
    explanation: 'Disaggregate only when the category is necessary, voluntary, understood, broad enough to protect people and linked to action. Small groups and combined categories can make people identifiable.',
    example: 'Awra uses optional broad age, gender and access-requirement categories, suppresses very small cells, limits access and deletes raw data on schedule.',
    learn: [['Data minimization', 'Collect the least detail needed for the decision.'], ['Informed participation', 'Explain purpose, choice, use, access and limits.'], ['Protection', 'Use aggregation, restricted access, retention limits and safe referral.']],
    tasks: [
      { id: 'category', prompt: 'Choose the safest useful disaggregation decision.', choices: [choice('broad', 'Optional broad categories, only where an action is possible.', 'Strong: proportionate and decision-linked.', true), choice('diagnosis', 'Exact diagnoses linked to names.', 'Unsafe and unnecessary for this task.')] },
      { id: 'small', prompt: 'A table has a cell with one person. What should Awra do?', choices: [choice('suppress', 'Suppress or combine the cell and explain the limitation.', 'Strong: reduces re-identification risk.', true), choice('publish', 'Publish it because no name appears.', 'A person may still be identifiable from context.')] },
    ],
    output: 'Safe disaggregation and data-minimization rules', safety: 'Do not record sensitive incidents, identifiable complaints or safeguarding disclosures in this learning activity. Follow the approved confidential pathway and need-to-know access rules.',
  },
  'M5-R08': {
    number: 9, id: 'M5-R08', key: 'm5_s09', next: 'M5-R09', stage: 'Use qualitative evidence ethically',
    title: 'Qualitative Evidence, Consent and Dignity',
    explanation: 'Stories, quotes and interviews can explain change, but consent to participate is not automatic consent to publish. Remove unnecessary identifiers and be honest about limits.',
    example: 'Instead of a named survivor story, Awra reports an aggregated theme, the method and limitations, and routes any disclosure through safeguarding procedures.',
    learn: [['Separate permissions', 'Participation, recording, internal use and publication require clear choices.'], ['Do no harm', 'Do not pressure people to disclose or trade services for stories.'], ['Truthful limits', 'A story illustrates experience; it does not prove prevalence.']],
    tasks: [
      { id: 'quote', prompt: 'A donor asks for a named quote and photograph. Choose the safest response.', choices: [choice('decline', 'Decline the request; use a generalized theme unless freely informed publication consent and safety checks exist.', 'Strong: dignity and safety come before visibility.', true), choice('ask', 'Ask quickly after the interview and publish.', 'Power pressure and future exposure still need careful assessment.')] },
      { id: 'incident', prompt: 'A participant mentions a serious sensitive incident.', choices: [choice('refer', 'Pause ordinary questioning, explain limits and use the approved safeguarding or referral pathway.', 'Strong: protect and refer; do not investigate here.', true), choice('detail', 'Collect full details for the evaluation report.', 'Unsafe: this learning process is not a specialist investigation.')] },
    ],
    output: 'Ethical qualitative-evidence decisions', safety: safeEntry,
  },
  'M5-R09': {
    number: 10, id: 'M5-R09', key: 'm5_s10', next: 'M5-R10', stage: 'Interpret with affected people',
    title: 'Participation in Analysis and Evaluation',
    explanation: 'Meaningful participation includes interpretation, not only data provision. Compare perspectives, look for missing voices and create safe ways to disagree.',
    example: 'Awra shares broad findings in accessible formats, invites separate and mixed review options, records alternative interpretations, and does not expose who raised a concern.',
    learn: [['Share power', 'Let affected people question findings and propose explanations.'], ['Make access real', 'Use language, timing, format and support options.'], ['Manage risk', 'Avoid public attribution, forced consensus and retaliation.']],
    tasks: [
      { id: 'review', prompt: 'Choose the strongest participatory review design.', choices: [choice('options', 'Accessible summaries, more than one review route, safe disagreement and documented responses.', 'Strong: participation can influence interpretation and action.', true), choice('presentation', 'Present final conclusions and ask for agreement.', 'This is consultation after the decision, not shared interpretation.')] },
      { id: 'retaliation', prompt: 'A participant fears retaliation for disagreeing.', choices: [choice('protect', 'Offer a confidential route, avoid attribution, assess risk and do not require public participation.', 'Strong: participation must be safe and voluntary.', true), choice('public', 'Ask them to explain publicly so the record is transparent.', 'Unsafe: transparency does not justify exposure.')] },
    ],
    output: 'Participatory interpretation plan', safety: 'Feedback and complaints must be voluntary, accessible and linked to a response owner. Never promise confidentiality or remedy beyond what the mechanism can provide.',
  },
  'M5-R10': {
    number: 11, id: 'M5-R10', key: 'm5_s11', next: 'M5-R11', stage: 'Turn evidence into responsible action',
    title: 'Evidence-to-Action Decisions',
    explanation: 'Evidence may support continuing, adapting, consulting, engaging a duty-bearer, referring, narrowing a claim or pausing because of risk. Name who can act and what follow-up evidence is needed.',
    example: 'Lower participation among people using mobility support leads Awra to change venue access and timing, assign an operations role, consult safely and check the next two meetings.',
    learn: [['Interpret cautiously', 'Distinguish finding, explanation and uncertainty.'], ['Assign responsibility', 'Separate CSO-controlled action, engagement and specialist referral.'], ['Test adaptation', 'Specify what evidence will show whether the change helped.']],
    tasks: [
      { id: 'signal', prompt: 'Access is lower for a broad group. Choose the first responsible decision.', choices: [choice('adapt', 'Check the barrier safely, adapt what Awra controls, assign responsibility and test again.', 'Strong: proportionate action with follow-up.', true), choice('blame', 'Conclude the group is not interested.', 'Unsupported and potentially discriminatory.')] },
      { id: 'claim', prompt: 'Evidence is mixed and incomplete.', choices: [choice('narrow', 'State the limitation, avoid a universal claim and collect proportionate follow-up evidence.', 'Strong: truthful reporting supports learning.', true), choice('success', 'Report full success to maintain confidence.', 'This overstates what is known.')] },
    ],
    output: 'Adaptation, responsible actor and follow-up evidence', safety: safeEntry,
  },
  'M5-R11': {
    number: 12, id: 'M5-R11', key: 'm5_s12', next: 'M5-R12', stage: 'Close the feedback loop',
    title: 'Feedback, Complaints and Account-Back',
    explanation: 'A channel is not a mechanism until people know how to use it, can access it safely, receive acknowledgement, see responsibility and escalation, and hear what happened.',
    example: 'Awra offers verbal, written and supported routes; separates ordinary feedback from confidential safeguarding referrals; records only necessary status data; and publishes generalized response updates.',
    learn: [['Accessible entry', 'Offer multiple safe routes and assistance.'], ['Response pathway', 'Acknowledge, assess, assign, respond, refer or escalate.'], ['Account-back', 'Explain themes, decisions, actions and limits without exposing people.']],
    tasks: [
      { id: 'pathway', prompt: 'Choose the complete feedback loop.', choices: [choice('loop', 'Receive → acknowledge → assess risk → assign or refer → respond → account back → learn.', 'Strong: the loop includes safety, responsibility and closure.', true), choice('box', 'Install a box and count submissions.', 'A box alone has no visible response or closure.')] },
      { id: 'overdue', prompt: 'A response is overdue. What should happen?', choices: [choice('escalate', 'Notify the responsible role, use the escalation rule and update the person safely.', 'Strong: delay becomes an accountable action.', true), choice('delete', 'Delete the record to protect privacy.', 'Retention must follow policy; deletion cannot hide an unresolved obligation.')] },
    ],
    output: 'Accessible feedback and account-back pathway', safety: 'Do not copy identifiable complaints into dashboards, downloads or portfolio outputs. Store operational complaint records only in approved restricted systems.',
  },
  'M5-R12': {
    number: 13, id: 'M5-R12', key: 'm5_s13', next: 'M5-R13', stage: 'Learn and adapt',
    title: 'Learning, Adaptation and Responsible Follow-Up',
    explanation: 'Learning is complete only when evidence changes a decision, role, resource, communication or follow-up question. Document why a change was made and how its effect will be checked.',
    example: 'After under-representation and delayed responses, Awra changes meeting timing, assigns a response owner, explains the change and reviews access and closure rates after two cycles.',
    learn: [['Decide', 'Continue, adapt, consult, engage, refer, narrow or pause.'], ['Document', 'Record rationale, responsibility and time frame.'], ['Follow up', 'Check intended and unintended effects and account back.']],
    tasks: [
      { id: 'adaptation', prompt: 'Choose a complete adaptation record.', choices: [choice('complete', 'Evidence signal, decision, responsible role, timing, follow-up measure and account-back route.', 'Strong: the record supports action and learning.', true), choice('note', '“Team will improve participation.”', 'Too vague to assign or test.')] },
      { id: 'risk', prompt: 'The adaptation may increase retaliation risk.', choices: [choice('pause', 'Pause, assess with the safeguarding focal role and redesign before proceeding.', 'Strong: do no harm overrides delivery pressure.', true), choice('continue', 'Continue because the activity was approved.', 'Approval does not remove a newly identified risk.')] },
    ],
    output: 'Adaptation and follow-up record', safety: safeEntry,
  },
  'M5-R13': {
    number: 14, id: 'M5-R13', key: 'm5_s14', next: 'M5-R14', stage: 'Check evidence-to-action decisions',
    title: 'Module Knowledge Check',
    explanation: 'Apply the full chain: meaningful result, rights-sensitive question, proportionate indicator, safe evidence, participatory interpretation, responsible action and account-back.',
    example: 'The best answer is not always “collect more data.” It may be minimize, consult, adapt, refer, narrow a claim or pause.',
    learn: [['Evidence quality', 'Use enough evidence for the decision and state limitations.'], ['Protection', 'Minimize, aggregate, restrict and refer safely.'], ['Accountability', 'Connect evidence to response and account-back.']],
    tasks: [
      { id: 'q1', prompt: 'A participation total meets target, but an access category is missing. Best response?', choices: [choice('investigate', 'Check the barrier safely, adapt access and follow up.', 'Correct.', true), choice('complete', 'Mark success because the total was met.', 'Totals can hide exclusion.')] },
      { id: 'q2', prompt: 'A tiny disaggregated cell could identify someone. Best response?', choices: [choice('suppress', 'Suppress or combine it and explain the limitation.', 'Correct.', true), choice('publish', 'Publish without a name.', 'Context can still identify someone.')] },
      { id: 'q3', prompt: 'A complaint suggests safeguarding risk. Best response?', choices: [choice('refer', 'Use the approved confidential safeguarding pathway.', 'Correct.', true), choice('dashboard', 'Add details to the learning dashboard.', 'Never expose the complaint in a learning output.')] },
      { id: 'q4', prompt: 'Evidence is mixed. Best reporting choice?', choices: [choice('limit', 'State uncertainty and narrow the claim.', 'Correct.', true), choice('certain', 'Choose the most positive interpretation.', 'That overstates evidence.')] },
      { id: 'q5', prompt: 'What closes an accountability loop?', choices: [choice('account', 'Response or referral, explanation back, and learning.', 'Correct.', true), choice('receive', 'Receiving feedback only.', 'Receipt alone is not closure.')] },
      { id: 'q6', prompt: 'When should a new data field be collected?', choices: [choice('needed', 'Only when necessary, voluntary, protectable and linked to action.', 'Correct.', true), choice('possible', 'Whenever the tool allows it.', 'Technical possibility is not a purpose.')] },
    ],
    output: 'Checked evidence-to-action decisions', safety: safeEntry,
  },
};

function addProgress(state: LearningState, screenId: string) {
  const current = state.screenProgress[MODULE5_ID] || [];
  return current.includes(screenId) ? current : [...current, screenId];
}

function navigate(screenId: string) {
  const route = MODULE5_SCREEN_ROUTES[screenId];
  if (route) window.history.pushState(window.history.state, '', route);
}

function isSensitive(value: string) {
  const text = value.toLowerCase();
  return /\b(name|phone|email|diagnos|survivor|child|complainant|accus|village|kebele|address)\b/.test(text) ||
    /\b\d{3}[- .]?\d{3}[- .]?\d{3,4}\b/.test(text) ||
    /@[a-z0-9.-]+\.[a-z]{2,}/.test(text);
}

function GeneralScreen({ spec, state, onChangeState }: { spec: ScreenSpec; state: LearningState; onChangeState: ChangeState }) {
  const stored = (state.practiceCheckState[spec.key] || {}) as {
    schemaVersion?: number; answers?: Record<string, string[]>; reviewed?: string[];
    status?: string; migration?: { sourceKey?: string; recoveredText?: string };
  };
  const [answers, setAnswers] = useState<Record<string, string[]>>(stored.answers || {});
  const [reviewed, setReviewed] = useState<string[]>(stored.reviewed || []);
  const [message, setMessage] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { titleRef.current?.focus(); }, [spec.id]);

  const taskComplete = spec.tasks.every((task) => (answers[task.id] || []).length === (task.required || 1));
  const allReviewed = spec.tasks.every((task) => reviewed.includes(task.id));
  const previouslyCompleted = stored.schemaVersion === 2 && stored.status === 'completed';
  const moduleCompleted = state.completedModules.includes(MODULE5_ID);
  const canContinue = taskComplete && allReviewed || previouslyCompleted || moduleCompleted;

  const persist = (nextAnswers: Record<string, string[]>, nextReviewed: string[], status = 'in_progress') => {
    onChangeState((previous) => ({
      ...previous,
      practiceCheckState: {
        ...previous.practiceCheckState,
        [spec.key]: { ...previous.practiceCheckState[spec.key], schemaVersion: 2, answers: nextAnswers, reviewed: nextReviewed, status, updatedAt: new Date().toISOString() },
      },
    }));
  };

  const select = (task: Task, id: string) => {
    const current = answers[task.id] || [];
    const limit = task.required || 1;
    const nextValues = task.multiple
      ? current.includes(id) ? current.filter((item) => item !== id) : [...current, id].slice(-limit)
      : [id];
    const next = { ...answers, [task.id]: nextValues };
    const nextReviewed = reviewed.filter((taskId) => taskId !== task.id);
    setAnswers(next); setReviewed(nextReviewed); setMessage('');
    persist(next, nextReviewed);
  };

  const check = (task: Task) => {
    if ((answers[task.id] || []).length !== (task.required || 1)) {
      setMessage('Choose ' + (task.required || 1) + ' response' + ((task.required || 1) === 1 ? '' : 's') + ' before checking.');
      return;
    }
    const nextReviewed = reviewed.includes(task.id) ? reviewed : [...reviewed, task.id];
    setReviewed(nextReviewed); setMessage('');
    persist(answers, nextReviewed);
  };

  const continueJourney = () => {
    if (!canContinue) { setMessage('Complete and check each required activity before continuing. Your current work remains saved on this device.'); return; }
    onChangeState((previous) => ({
      ...previous,
      currentScreenId: spec.next,
      screenProgress: { ...previous.screenProgress, [MODULE5_ID]: addProgress(previous, spec.id) },
      practiceCheckState: { ...previous.practiceCheckState, [spec.key]: { ...previous.practiceCheckState[spec.key], schemaVersion: 2, answers, reviewed, status: 'completed', updatedAt: new Date().toISOString() } },
    }));
    navigate(spec.next);
  };

  return (
    <main className="m5e-screen" aria-labelledby={'m5e-title-' + spec.number}>
      <article className="m5e-shell">
        <header className="m5e-hero">
          <p className="m5e-kicker">MODULE 5 · SCREEN {spec.number} OF 16</p>
          <span className="m5e-stage">{spec.stage}</span>
          <h1 id={'m5e-title-' + spec.number} ref={titleRef} tabIndex={-1}>{spec.title}</h1>
          <p>{spec.explanation}</p>
        </header>
        {stored.migration && (
          <aside className="m5e-notice m5e-notice--info" role="note">
            <strong>Previous Module 5 work recovered for review</strong>
            <span>Earlier progress was preserved, but old choices were not treated as answers to this revised activity. Review the current task before continuing.{stored.migration.recoveredText ? ' A generalized earlier note is available in the final review.' : ''}</span>
          </aside>
        )}
        <section className="m5e-example" aria-labelledby={'m5e-example-' + spec.number}>
          <p className="m5e-kicker">Worked example</p><h2 id={'m5e-example-' + spec.number}>Jiru Amba practice</h2><p>{spec.example}</p>
        </section>
        <section aria-labelledby={'m5e-learn-' + spec.number}>
          <h2 id={'m5e-learn-' + spec.number}>What to notice</h2>
          <div className="m5e-grid">{spec.learn.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>
        <aside className="m5e-notice m5e-notice--safety" role="note"><strong>Safe practice reminder</strong><span>{spec.safety}</span></aside>
        <section className="m5e-practice" aria-labelledby={'m5e-practice-' + spec.number}>
          <h2 id={'m5e-practice-' + spec.number}>Practice and check</h2>
          {spec.tasks.map((task) => {
            const selected = answers[task.id] || [];
            const checked = reviewed.includes(task.id);
            return (
              <fieldset key={task.id}>
                <legend>{task.prompt}{task.multiple ? ' Choose ' + task.required + '.' : ''}</legend>
                <div className="m5e-choices">{task.choices.map((item) => (
                  <label key={item.id}>
                    <input type={task.multiple ? 'checkbox' : 'radio'} name={spec.id + '-' + task.id} checked={selected.includes(item.id)} onChange={() => select(task, item.id)} />
                    <span>{item.label}</span>
                  </label>
                ))}</div>
                <button type="button" className="m5e-secondary" onClick={() => check(task)}>Check response</button>
                {checked && <div className="m5e-feedback" role="status" aria-live="polite">{selected.map((id) => { const item = task.choices.find((candidate) => candidate.id === id); return item ? <p key={id}><strong>{item.strong ? 'Good evidence decision: ' : 'Review this choice: '}</strong>{item.feedback}</p> : null; })}</div>}
              </fieldset>
            );
          })}
        </section>
        {message && <p className="m5e-alert" role="alert">{message}</p>}
        <section className="m5e-saved" role="status" aria-live="polite"><strong>Saved output</strong><span>{spec.output}: {canContinue ? 'ready to carry forward' : 'in progress'}. Work is saved locally in this browser.</span></section>
        <footer className="m5e-actions"><div><h2>Continue the evidence-to-action journey</h2><p>Complete and check each activity to unlock the next screen.</p></div><button type="button" className="m5e-primary" disabled={!canContinue} onClick={continueJourney}>Continue</button></footer>
      </article>
    </main>
  );
}

const canvasFields = [
  ['project', 'Generalized project or practice route', 'M5-R02', 'route'],
  ['result', 'Priority result', 'M5-R04', 'result'],
  ['question', 'Rights-sensitive MEAL question', 'M5-R04', 'question'],
  ['indicator', 'Rights-based indicator', 'M5-R05', 'indicator'],
  ['trigger', 'Action trigger', 'M5-R05', 'trigger'],
  ['methods', 'Evidence methods', 'M5-R06', 'routes'],
  ['accessMethod', 'Accessibility evidence method', 'M5-R06', 'access'],
  ['disaggregation', 'Safe disaggregation decision', 'M5-R07', 'category'],
  ['smallCells', 'Small-cell protection rule', 'M5-R07', 'small'],
  ['qualitative', 'Ethical qualitative evidence decision', 'M5-R08', 'quote'],
  ['safeguarding', 'Sensitive-incident pathway', 'M5-R08', 'incident'],
  ['participation', 'Participatory interpretation method', 'M5-R09', 'review'],
  ['retaliation', 'Retaliation-risk safeguard', 'M5-R09', 'retaliation'],
  ['adaptation', 'Evidence-informed adaptation', 'M5-R10', 'signal'],
  ['limitation', 'Evidence limitation and claim', 'M5-R10', 'claim'],
  ['feedback', 'Feedback-response pathway', 'M5-R11', 'pathway'],
  ['closure', 'Overdue-response action', 'M5-R11', 'overdue'],
  ['responsibility', 'Adaptation responsibility and follow-up', 'M5-R12', 'adaptation'],
  ['stopRule', 'Risk or stop condition', 'M5-R12', 'risk'],
  ['learning', 'My short learning note', 'M5-R14', 'learning'],
] as const;

function selectedLabels(state: LearningState, screenId: string, taskId: string) {
  const spec = specs[screenId];
  if (!spec) return '';
  const entry = state.practiceCheckState[spec.key] as { answers?: Record<string, string[]> } | undefined;
  const selected = entry?.answers?.[taskId] || [];
  const task = spec.tasks.find((candidate) => candidate.id === taskId);
  return selected.map((id) => task?.choices.find((item) => item.id === id)?.label || '').filter(Boolean).join('; ');
}

function deriveModule5Canvas(state: LearningState) {
  return Object.fromEntries(canvasFields.map(([id, , screenId, taskId]) => [id, screenId === 'M5-R14' ? '' : selectedLabels(state, screenId, taskId)]));
}

function CanvasScreen({ state, onChangeState }: Omit<Props, 'screenId'>) {
  const key = 'm5_s15';
  const stored = (state.practiceCheckState[key] || {}) as { fields?: Record<string, string>; confirmedSafe?: boolean; previewReviewed?: boolean; status?: string };
  const projected = useMemo(() => deriveModule5Canvas(state), [state]);
  const [fields, setFields] = useState<Record<string, string>>({ ...projected, ...(stored.fields || {}) });
  const [editing, setEditing] = useState<string | null>('learning');
  const [confirmedSafe, setConfirmedSafe] = useState(Boolean(stored.confirmedSafe));
  const [previewReviewed, setPreviewReviewed] = useState(Boolean(stored.previewReviewed));
  const [message, setMessage] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { titleRef.current?.focus(); }, []);

  const gaps = canvasFields.filter(([id]) => !String(fields[id] || '').trim());
  const risky = canvasFields.filter(([id]) => isSensitive(String(fields[id] || '')));
  const alreadyCompleted = state.completedModules.includes(MODULE5_ID) || stored.status === 'completed';
  const ready = alreadyCompleted || gaps.length === 0 && risky.length === 0 && confirmedSafe && previewReviewed;
  const persist = (nextFields = fields, safe = confirmedSafe, reviewed = previewReviewed) => onChangeState((previous) => ({
    ...previous,
    practiceCheckState: { ...previous.practiceCheckState, [key]: { ...previous.practiceCheckState[key], schemaVersion: 2, fields: nextFields, confirmedSafe: safe, previewReviewed: reviewed, status: 'in_progress', updatedAt: new Date().toISOString() } },
  }));
  const update = (id: string, value: string) => {
    const next = { ...fields, [id]: value };
    setFields(next); setConfirmedSafe(false); setPreviewReviewed(false); setMessage('Changes saved locally. Review the preview and safety confirmation again.');
    persist(next, false, false);
  };
  const continueJourney = () => {
    if (!ready) {
      setMessage(risky.length ? 'Remove possible identifying or sensitive detail from the highlighted field. This prompt is a precaution and cannot guarantee confidentiality.' : gaps.length ? 'Complete the fields marked “Not yet completed”. Use the source link to review earlier work or add a short generalized entry.' : 'Review the readable preview and confirm the final safety check.');
      return;
    }
    onChangeState((previous) => ({
      ...previous,
      currentScreenId: 'M5-PLAYER-COMPLETE',
      screenProgress: { ...previous.screenProgress, [MODULE5_ID]: addProgress(previous, 'M5-R14') },
      practiceCheckState: { ...previous.practiceCheckState, [key]: { ...previous.practiceCheckState[key], schemaVersion: 2, fields, confirmedSafe: true, previewReviewed: true, status: 'completed', updatedAt: new Date().toISOString() } },
    }));
    navigate('M5-PLAYER-COMPLETE');
  };

  return (
    <main className="m5e-screen" aria-labelledby="m5e-canvas-title">
      <article className="m5e-shell">
        <header className="m5e-hero"><p className="m5e-kicker">MODULE 5 · SCREEN 15 OF 16</p><span className="m5e-stage">Apply and save</span><h1 id="m5e-canvas-title" ref={titleRef} tabIndex={-1}>HRBA MEAL, Accountability and Adaptation Canvas</h1><p>Your saved practice is carried forward below. Review one field at a time, complete the short learning note, and correct only what needs attention.</p></header>
        <aside className="m5e-notice m5e-notice--safety" role="note"><strong>Before editing</strong><span>{safeEntry} The automatic check is only a prompt; you remain responsible for safe wording.</span></aside>
        <section aria-labelledby="m5e-canvas-fields"><h2 id="m5e-canvas-fields">Connected portfolio fields</h2><p>Missing work is shown honestly and never replaced by a sample answer.</p>
          <div className="m5e-canvas-list">{canvasFields.map(([id, label, screenId], index) => {
            const value = fields[id] || '';
            const isRisky = isSensitive(value);
            return <article key={id} className={!value || isRisky ? 'm5e-canvas-card m5e-canvas-card--attention' : 'm5e-canvas-card'}>
              <div><p className="m5e-kicker">{index + 1} · Source: Screen {specs[screenId]?.number || 15}</p><h3>{label}</h3><p>{value || 'Not yet completed'}</p><a href={MODULE5_SCREEN_ROUTES[screenId]} onClick={(event) => { event.preventDefault(); onChangeState((previous) => ({ ...previous, currentScreenId: screenId })); navigate(screenId); }}>Review source activity</a></div>
              <button type="button" className="m5e-secondary" aria-expanded={editing === id} onClick={() => setEditing(editing === id ? null : id)}>{editing === id ? 'Close editor' : 'Edit this field'}</button>
              {editing === id && <label><span className="sr-only">Edit {label}</span><textarea rows={3} maxLength={320} value={value} onChange={(event) => update(id, event.target.value)} /><small>{isRisky ? 'Remove possible identifying or sensitive detail.' : 'Use short, generalized, non-identifying wording.'}</small></label>}
            </article>;
          })}</div>
        </section>
        <section className="m5e-preview" aria-labelledby="m5e-preview-title"><h2 id="m5e-preview-title">Readable canvas preview</h2><dl>{canvasFields.map(([id, label]) => <div key={id}><dt>{label}</dt><dd>{fields[id] || 'Not yet completed'}</dd></div>)}</dl></section>
        <label className="m5e-confirm"><input type="checkbox" checked={previewReviewed} onChange={(event) => { setPreviewReviewed(event.target.checked); persist(fields, confirmedSafe, event.target.checked); }} /><span>I reviewed the canvas, including missing fields and evidence limitations.</span></label>
        <label className="m5e-confirm"><input type="checkbox" checked={confirmedSafe} onChange={(event) => { setConfirmedSafe(event.target.checked); persist(fields, event.target.checked, previewReviewed); }} /><span>I confirm this contains only fictional or generalized information and no identifying or confidential details.</span></label>
        {message && <p className={ready ? 'm5e-status' : 'm5e-alert'} role={ready ? 'status' : 'alert'}>{message}</p>}
        <section className="m5e-saved" role="status"><strong>Portfolio status</strong><span>{ready ? 'Canvas ready for final review.' : gaps.length + ' field(s) not yet completed; ' + risky.length + ' field(s) need a safety review.'}</span></section>
        <footer className="m5e-actions"><div><h2>Review and complete</h2><p>The final screen converts this canvas into four practical decisions.</p></div><button type="button" className="m5e-primary" disabled={!ready} onClick={continueJourney}>Review portfolio and plan</button></footer>
      </article>
    </main>
  );
}

function CompletionScreen({ state, onChangeState }: Omit<Props, 'screenId'>) {
  const key = 'm5_s16';
  const stored = (state.practiceCheckState[key] || {}) as { plan?: Record<string, string>; confirmedSafe?: boolean; dashboardReviewed?: boolean; carryReviewed?: boolean; status?: string };
  const canvas = ((state.practiceCheckState.m5_s15 || {}) as { fields?: Record<string, string> }).fields || deriveModule5Canvas(state);
  const initialPlan = { adaptation: canvas.adaptation || '', responsibility: canvas.responsibility || '', nearTerm: '', followUp: canvas.trigger || '' };
  const [plan, setPlan] = useState<Record<string, string>>({ ...initialPlan, ...(stored.plan || {}) });
  const [dashboardReviewed, setDashboardReviewed] = useState(Boolean(stored.dashboardReviewed));
  const [carryReviewed, setCarryReviewed] = useState(Boolean(stored.carryReviewed));
  const [confirmedSafe, setConfirmedSafe] = useState(Boolean(stored.confirmedSafe));
  const [message, setMessage] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { titleRef.current?.focus(); }, []);
  const alreadyCompleted = state.completedModules.includes(MODULE5_ID);
  const risky = Object.values(plan).some(isSensitive);
  const ready = alreadyCompleted || Object.values(plan).every((value) => value.trim()) && !risky && dashboardReviewed && carryReviewed && confirmedSafe;
  const planFields: Array<[string, string, string]> = [
    ['adaptation', 'Final adaptation decision', 'What will continue, change, pause, be referred or be tested?'],
    ['responsibility', 'Responsible role or pathway', 'Use a role or institution, not a person’s name.'],
    ['nearTerm', 'Near-term action', 'What realistic action will happen in the next 30 days?'],
    ['followUp', 'Follow-up and account-back', 'What will be checked, and how will people hear what happened?'],
  ];
  const persist = (next = plan, dashboard = dashboardReviewed, carry = carryReviewed, safe = confirmedSafe) => onChangeState((previous) => ({
    ...previous,
    practiceCheckState: { ...previous.practiceCheckState, [key]: { ...previous.practiceCheckState[key], schemaVersion: 2, plan: next, dashboardReviewed: dashboard, carryReviewed: carry, confirmedSafe: safe, status: 'in_progress', updatedAt: new Date().toISOString() } },
  }));
  const downloadFields = canvasFields.map(([id, label, screenId]) => ({
    label,
    value: canvas[id] || '',
    sourceLabel: 'Module 5 Screen ' + (specs[screenId]?.number || 15),
  }));
  const outputText = buildModule5DownloadText(downloadFields, {
    adaptation: plan.adaptation || '',
    responsibility: plan.responsibility || '',
    nearTermAction: plan.nearTerm || '',
    followUp: plan.followUp || '',
  });
  const downloadHref = 'data:text/plain;charset=utf-8,' + encodeURIComponent(outputText);
  const copy = async () => {
    try { await navigator.clipboard.writeText(outputText); setMessage('Output copied. Store it only in an approved, access-controlled location.'); }
    catch {
      const box = document.createElement('textarea'); box.value = outputText; box.setAttribute('readonly', ''); box.style.position = 'fixed'; box.style.opacity = '0'; document.body.appendChild(box); box.select();
      const copied = document.execCommand('copy'); document.body.removeChild(box);
      setMessage(copied ? 'Output copied using the browser fallback.' : 'Copy did not complete. Select the readable summary and copy it manually. Completion is not blocked.');
    }
  };
  const complete = () => {
    if (!ready) { setMessage(risky ? 'Remove possible identifying or sensitive detail before completion.' : 'Complete the four decisions, review both summaries and confirm the safety check.'); return; }
    onChangeState((previous) => ({
      ...previous,
      completedModules: previous.completedModules.includes(MODULE5_ID) ? previous.completedModules : [...previous.completedModules, MODULE5_ID],
      screenProgress: { ...previous.screenProgress, [MODULE5_ID]: addProgress(previous, 'M5-PLAYER-COMPLETE') },
      practiceCheckState: { ...previous.practiceCheckState, [key]: { ...previous.practiceCheckState[key], schemaVersion: 2, plan, dashboardReviewed: true, carryReviewed: true, confirmedSafe: true, status: 'completed', completedAt: new Date().toISOString() } },
    }));
    setMessage('Module 5 complete. Your generalized portfolio output remains available for review and download.');
  };

  const dashboard = [
    ['Priority and question', (canvas.result || 'Not yet completed') + ' — ' + (canvas.question || 'Not yet completed')],
    ['Reach and access', canvas.disaggregation || 'Not yet completed'],
    ['Participation and influence', canvas.participation || 'Not yet completed'],
    ['Safe evidence', canvas.methods || 'Not yet completed'],
    ['Qualitative evidence', canvas.qualitative || 'Not yet completed'],
    ['Feedback response', canvas.feedback || 'Not yet completed'],
    ['Evidence limitation', canvas.limitation || 'Not yet completed'],
    ['Decision and responsibility', (canvas.adaptation || 'Not yet completed') + ' — ' + (canvas.responsibility || 'Not yet completed')],
    ['Account-back', canvas.closure || 'Not yet completed'],
  ];

  return (
    <main className="m5e-screen" aria-labelledby="m5e-complete-title">
      <article className="m5e-shell">
        <header className="m5e-hero"><p className="m5e-kicker">MODULE 5 · SCREEN 16 OF 16</p><span className="m5e-stage">Review, plan and confirm</span><h1 id="m5e-complete-title" ref={titleRef} tabIndex={-1}>Portfolio Review and Module Closure</h1><p>Review the evidence-to-action summary, make four final practical decisions, and explicitly confirm completion.</p></header>
        {alreadyCompleted && <aside className="m5e-notice m5e-notice--info" role="status"><strong>Earlier completion preserved</strong><span>This module remains complete. You may review or improve the revised portfolio without losing completion.</span></aside>}
        <section aria-labelledby="m5e-dashboard-title"><h2 id="m5e-dashboard-title">Evidence-to-Action Dashboard</h2><p>This is a readable generalized summary, not a data upload.</p><div className="m5e-grid">{dashboard.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>
        <label className="m5e-confirm"><input type="checkbox" checked={dashboardReviewed} onChange={(event) => { setDashboardReviewed(event.target.checked); persist(plan, event.target.checked, carryReviewed, confirmedSafe); }} /><span>I reviewed the dashboard, including limitations and responsibility.</span></label>
        <section className="m5e-plan" aria-labelledby="m5e-plan-title"><h2 id="m5e-plan-title">Four final practice decisions</h2>{planFields.map(([id, label, help]) => <label key={id}><span><strong>{label}</strong><small>{help}</small></span><textarea rows={3} maxLength={320} value={plan[id] || ''} onChange={(event) => { const next = { ...plan, [id]: event.target.value }; setPlan(next); setConfirmedSafe(false); persist(next, dashboardReviewed, carryReviewed, false); }} /></label>)}</section>
        <aside className="m5e-notice m5e-notice--safety" role="note"><strong>Final privacy and do-no-harm check</strong><span>Carry forward only generalized results, questions, evidence decisions, limitations, responsibilities and account-back commitments. Do not include identifiable complaints, sensitive incidents or personal information.</span></aside>
        <label className="m5e-confirm"><input type="checkbox" checked={carryReviewed} onChange={(event) => { setCarryReviewed(event.target.checked); persist(plan, dashboardReviewed, event.target.checked, confirmedSafe); }} /><span>I reviewed what will carry forward to the portfolio.</span></label>
        <label className="m5e-confirm"><input type="checkbox" checked={confirmedSafe} onChange={(event) => { setConfirmedSafe(event.target.checked); persist(plan, dashboardReviewed, carryReviewed, event.target.checked); }} /><span>I removed identifying and confidential information and understand the automatic check is not a guarantee.</span></label>
        {message && <p className={ready ? 'm5e-status' : 'm5e-alert'} role={ready ? 'status' : 'alert'} aria-live="polite">{message}</p>}
        <section className="m5e-download" aria-labelledby="m5e-download-title"><div><h2 id="m5e-download-title">Portable, low-bandwidth output</h2><p>Copy or download a plain-text version, or print this page. The file can be completed away from the course and entered later; the course itself must already be loaded and is not an offline application. Downloads never gate completion.</p></div><div><button type="button" className="m5e-secondary" onClick={copy}>Copy output</button><a className="m5e-secondary" href={downloadHref} download="module-5-hrba-meal-portfolio.txt" onClick={() => setMessage('Text download started. If it does not appear, use Copy output or print this page.')}>Download text</a></div></section>
        <details className="m5e-readable"><summary>Read the complete downloadable text</summary><pre>{outputText}</pre></details>
        <footer className="m5e-actions"><div><h2>{ready ? 'Ready for explicit confirmation' : 'Complete the remaining review checks'}</h2><p>Completion records the module; it does not claim every real-world issue is solved.</p></div><button type="button" className="m5e-primary" disabled={!ready} onClick={complete}>{alreadyCompleted ? 'Module 5 complete' : 'Confirm and complete Module 5'}</button></footer>
      </article>
    </main>
  );
}

export default function Module5EnhancedJourney(props: Props) {
  if (props.screenId === 'M5-R14') return <CanvasScreen state={props.state} onChangeState={props.onChangeState} />;
  if (props.screenId === 'M5-PLAYER-COMPLETE') return <CompletionScreen state={props.state} onChangeState={props.onChangeState} />;
  const spec = specs[props.screenId];
  return spec ? <GeneralScreen key={spec.id} spec={spec} state={props.state} onChangeState={props.onChangeState} /> : null;
}
