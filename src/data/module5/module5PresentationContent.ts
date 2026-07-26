export const MODULE5_PRESENTATION_SCHEMA_VERSION = 1;
export const MODULE5_PRESENTATION_CONTENT_REVISION = 'm5-presentation-batch1-v1';

export const MODULE5_BATCH1_PRESENTATION_SCREEN_IDS = [
  'M5-R01',
  'M5-R02',
  'M5-R03',
  'M5-R04',
] as const;

export type Module5PresentationScreenId = typeof MODULE5_BATCH1_PRESENTATION_SCREEN_IDS[number];
export type Module5KnowledgeQuestionType = 'single' | 'multiple';
export type Module5ReflectionControl = 'short-text' | 'single-choice' | 'rating' | 'stage-pair';

export type Module5KnowledgeOption = {
  id: string;
  label: string;
  feedback: string;
};

export type Module5KnowledgeQuestion = {
  id: string;
  type: Module5KnowledgeQuestionType;
  prompt: string;
  options: Module5KnowledgeOption[];
  correctOptionIds: string[];
};

export type Module5ReflectionPrompt = {
  id: string;
  prompt: string;
  whyItMatters: string;
  responseType: string;
  control: Module5ReflectionControl;
  required: boolean;
  carryForwardField?: string;
  options?: string[];
  maxWords?: number;
  detailMaxWords?: number;
};

export type Module5PresentationContent = {
  screenId: Module5PresentationScreenId;
  number: number;
  nextScreenId: string;
  title: string;
  videoId: string;
  watchUrl: string;
  embedUrl: string;
  accessibilitySummary: string;
  questions: Module5KnowledgeQuestion[];
  reflections: Module5ReflectionPrompt[];
};

const option = (id: string, label: string, feedback: string): Module5KnowledgeOption => ({
  id,
  label,
  feedback,
});

const content: Record<Module5PresentationScreenId, Module5PresentationContent> = {
  'M5-R01': {
    screenId: 'M5-R01',
    number: 2,
    nextScreenId: 'M5-R02',
    title: 'Why HRBA Matters in MEAL',
    videoId: '2F9_x3WF2sQ',
    watchUrl: 'https://youtu.be/2F9_x3WF2sQ',
    embedUrl: 'https://www.youtube-nocookie.com/embed/2F9_x3WF2sQ',
    accessibilitySummary: 'This six-slide deck explains why activity information is necessary but insufficient for rights-based MEAL. It presents a fictional Jiru Amba report with six meetings, 240 attendances, one feedback box, four positive stories and a monthly report submitted on time. The evidence can show delivery, recorded scale, the existence of routines and issues to investigate. It cannot by itself show who was excluded, who influenced priorities, whether feedback was answered or what changed for whom. The familiar HRBA moves—See, Protect, Act and Account—add questions about inclusion, safety, response and responsibility. The closing guidance is to state what happened, test who experienced it, trace influence, response and change, and name remaining limitations.',
    questions: [
      {
        id: 'M5-S02-KC01',
        type: 'single',
        prompt: 'Awra has evidence that six Jiru Amba meetings were held and 240 attendances were recorded. Which conclusion is best supported?',
        correctOptionIds: ['B'],
        options: [
          option('A', 'Participation was equitable across all groups.', 'Not supported. Total attendance does not show who was represented, who was missing or what barriers different groups faced.'),
          option('B', 'The planned meetings occurred and recorded attendance reached 240.', 'Correct. This conclusion stays within the activity and attendance evidence available.'),
          option('C', 'The community was satisfied with the Futures Plan.', 'Not supported. Four positive stories cannot represent the views of everyone who participated or did not participate.'),
          option('D', 'The feedback mechanism was effective.', 'Not supported. A feedback box shows that a channel existed, not that feedback was accessible, acknowledged, answered or closed.'),
        ],
      },
      {
        id: 'M5-S02-KC02',
        type: 'single',
        prompt: 'Awra wants to understand whether different people could influence the meeting priorities. Which additional evidence mix is most useful and proportionate?',
        correctOptionIds: ['B'],
        options: [
          option('A', 'More photographs of the meetings.', 'Weak choice. Photographs may show that an event occurred but usually do not show whether people understood options or influenced decisions.'),
          option('B', 'Broad, necessary participation categories plus brief accounts of who could speak and what suggestions affected priorities.', 'Correct. This combines a safe participation pattern with qualitative evidence of influence and connects both to the decision.'),
          option('C', 'A longer narrative written only by project staff.', 'Incomplete. Staff interpretation may help, but it does not make rights-holder perspectives visible on its own.'),
          option('D', 'The total number of comments placed in the feedback box.', 'Incomplete. A total does not show accessibility, whose issues were raised or whether comments affected a decision.'),
        ],
      },
      {
        id: 'M5-S02-KC03',
        type: 'multiple',
        prompt: 'Which statements require qualification before they appear in the Jiru Amba report? Select all that apply.',
        correctOptionIds: ['B', 'C', 'D'],
        options: [
          option('A', 'Six meetings were recorded as completed.', 'Do not select. This is a bounded activity statement if completion records are available.'),
          option('B', 'All groups could participate equally.', 'Select. Attendance totals alone cannot establish equal access or participation.'),
          option('C', 'The feedback box ensured that concerns were resolved.', 'Select. A channel does not prove acknowledgement, response, responsibility or closure.'),
          option('D', 'Four positive stories prove lasting change.', 'Select. Stories can signal experience, but they do not establish how common or lasting change was.'),
        ],
      },
    ],
    reflections: [
      {
        id: 'M5-S02-R01',
        prompt: 'Which result does your organisation report regularly but understand poorly?',
        whyItMatters: 'It identifies a real evidence gap that can anchor later Module 5 reflection.',
        responseType: 'Select one result area; optional 20-word note',
        control: 'short-text',
        required: true,
        carryForwardField: 'priority_result',
        maxWords: 20,
      },
      {
        id: 'M5-S02-R02',
        prompt: 'Whose perspective is currently least visible in that evidence?',
        whyItMatters: 'It makes exclusion and unequal visibility concrete without requiring personal or sensitive data.',
        responseType: "Choose a broad stakeholder group; optional 'not yet known'",
        control: 'short-text',
        required: true,
        carryForwardField: 'missing_perspective',
        maxWords: 20,
      },
      {
        id: 'M5-S02-R03',
        prompt: 'What question about evidence limits would you most value discussing with another local CSO?',
        whyItMatters: 'It turns uncertainty into a focused peer-learning need.',
        responseType: 'Select a topic or enter one short question',
        control: 'short-text',
        required: false,
        maxWords: 25,
      },
    ],
  },
  'M5-R02': {
    screenId: 'M5-R02',
    number: 3,
    nextScreenId: 'M5-R03',
    title: 'Learning Objectives and MEAL Roadmap',
    videoId: 'RKqECrl4PQs',
    watchUrl: 'https://youtu.be/RKqECrl4PQs',
    embedUrl: 'https://www.youtube-nocookie.com/embed/RKqECrl4PQs',
    accessibilitySummary: 'This six-slide deck locates Module 5 on the familiar MEAL route: Plan; Monitor; Collect and Manage; Analyse and Evaluate; Account; Learn and Adapt. Learning returns to planning. The four HRBA moves—See, Protect, Act and Account—apply across every stage. Learners are expected to judge results and success, choose useful and safe indicators and methods, interpret mixed evidence and contribution, and connect findings to responsibility and account-back. Screens 2 to 13 move from orientation through planning, monitoring, collection, management, analysis, evaluation, accountability and adaptation. Each screen follows presentation learning, a short judgement-focused knowledge check and lightweight portfolio reflection.',
    questions: [
      {
        id: 'M5-S03-KC01',
        type: 'single',
        prompt: 'Before choosing a data-collection method, Awra asks which people may be missing from the consultation and whose definition of success has not been heard. Where does this judgement sit?',
        correctOptionIds: ['A'],
        options: [
          option('A', 'Plan + See', 'Correct. The question shapes the result and learning questions during planning and uses See to examine visibility and exclusion.'),
          option('B', 'Monitor + Account', 'Not the strongest match. Monitoring may later track participation, but the scenario is shaping the plan before a method is selected.'),
          option('C', 'Analyse and Evaluate + Act', 'Too late for the scenario. Analysis will interpret evidence later; this decision is about whose success matters at the planning stage.'),
          option('D', 'Learn and Adapt + Protect', 'Not the strongest match. Protection is relevant throughout, but the specific judgement is about visibility and planning.'),
        ],
      },
      {
        id: 'M5-S03-KC02',
        type: 'single',
        prompt: 'Awra finds that a proposed attendance register would collect unnecessary personal identifiers. Which statement best uses the roadmap?',
        correctOptionIds: ['B'],
        options: [
          option('A', 'Protect applies only after data have been collected.', 'Incorrect. Protection begins when deciding what is necessary to collect and continues through management, use, retention and deletion.'),
          option('B', 'Protect should shape Plan and Collect and Manage by removing information that has no clear use.', 'Correct. Data minimisation is a planning and collection decision, and protection travels across MEAL stages.'),
          option('C', 'The issue belongs only to Accountability because identifiers concern responsibility.', 'Incomplete. Accountability matters, but the immediate decisions occur during planning and collection and management.'),
          option('D', 'The full register should be collected first so analysts can decide later.', 'Unsafe and unnecessary. Collecting first creates avoidable risk and ignores the decision-first approach.'),
        ],
      },
      {
        id: 'M5-S03-KC03',
        type: 'single',
        prompt: 'Which learner action best fits the Module 5 screen sequence?',
        correctOptionIds: ['A'],
        options: [
          option('A', 'Watch the presentation, complete a judgement question, then retain one concise portfolio reflection.', 'Correct. This is the intended presentation-learning, knowledge-check and reflection sequence.'),
          option('B', 'Copy every definition, skip the judgement question and move to the next screen.', 'Incorrect. The knowledge check is needed to apply the learning to a realistic decision.'),
          option('C', 'Write a long general reflection before viewing the example.', 'Incorrect. Reflection follows the learning and judgement check, and it should be specific and lightweight.'),
          option('D', 'Treat each screen as separate and ignore how evidence returns across the MEAL route.', 'Incorrect. The screens build a connected sequence in which evidence supports decisions and returns to planning.'),
        ],
      },
    ],
    reflections: [
      {
        id: 'M5-S03-R01',
        prompt: 'Which MEAL stage is your organisation most confident in, and which stage most needs attention?',
        whyItMatters: 'It captures a balanced self-assessment and locates the learner’s priority on the familiar route.',
        responseType: 'Select one strongest stage and one priority stage',
        control: 'stage-pair',
        required: true,
        carryForwardField: 'meal_stage_priority',
        options: ['Plan', 'Monitor', 'Collect and Manage', 'Analyse and Evaluate', 'Account', 'Learn and Adapt'],
      },
      {
        id: 'M5-S03-R02',
        prompt: 'How confident are you in connecting evidence to a decision and account-back?',
        whyItMatters: 'It establishes a baseline for the later learning and accountability screens.',
        responseType: 'Rate 1–5; optional short reason',
        control: 'rating',
        required: false,
        options: ['1', '2', '3', '4', '5'],
        detailMaxWords: 20,
      },
      {
        id: 'M5-S03-R03',
        prompt: 'Which skill, tool, template or support would help at your priority MEAL stage?',
        whyItMatters: 'It translates a broad capacity gap into a future support need.',
        responseType: 'Choose one support type; optional 15-word detail',
        control: 'single-choice',
        required: true,
        carryForwardField: 'support_need',
        options: ['Skill', 'Tool', 'Template', 'Support'],
        detailMaxWords: 15,
      },
    ],
  },
  'M5-R03': {
    screenId: 'M5-R03',
    number: 4,
    nextScreenId: 'M5-R04',
    title: 'The MEAL Cycle Through an HRBA Lens',
    videoId: 'B0Y988AKdeg',
    watchUrl: 'https://youtu.be/B0Y988AKdeg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/B0Y988AKdeg',
    accessibilitySummary: 'This seven-slide deck explains Monitoring, Evaluation, Accountability and Learning as connected functions. Monitoring tracks delivery, early results, access and participation patterns but does not establish cause from routine trends alone. Evaluation examines outcomes, different experiences, equity, context and contribution. Accountability requires accessible information, safe feedback channels, acknowledgement, responsibility, response and account-back. Learning reviews evidence and limitations, makes a proportionate decision, names an owner and review time, and communicates the change. A Jiru Amba example follows lower caregiver participation through evaluation of timing, feedback about preferred options, an adaptation, and revised planning. The cycle is incomplete when evidence does not return to people and decisions.',
    questions: [
      {
        id: 'M5-S04-KC01',
        type: 'single',
        prompt: 'Awra’s routine records show lower caregiver participation at morning meetings. It changes the time for the next round and plans to review the new pattern. Which MEAL functions are most directly connected?',
        correctOptionIds: ['A'],
        options: [
          option('A', 'Monitoring and Learning', 'Correct. Monitoring identified the pattern; learning used it for an adaptation and a future review.'),
          option('B', 'Evaluation only', 'Incomplete. Evaluation may deepen the explanation, but the scenario specifically describes a routine signal and an adaptation.'),
          option('C', 'Accountability only', 'Incomplete. Feedback and account-back may be important, but the described actions are monitoring and learning.'),
          option('D', 'Planning only', 'Incomplete. The next plan changes, but the decision arose from monitoring and becomes a learning action.'),
        ],
      },
      {
        id: 'M5-S04-KC02',
        type: 'single',
        prompt: 'Awra receives feedback about inaccessible meeting times. The concern is recorded, but no one acknowledges it, owns a response or explains what happened. Where is the clearest break in the MEAL cycle?',
        correctOptionIds: ['C'],
        options: [
          option('A', 'Monitoring', 'Not the clearest break. The issue has been noticed and recorded.'),
          option('B', 'Evaluation', 'Not the clearest break. A deeper explanation may help, but the immediate failure is the missing response and account-back.'),
          option('C', 'Accountability', 'Correct. A feedback channel without acknowledgement, responsibility, response and closure does not complete accountability.'),
          option('D', 'Data collection', 'Not the clearest break. The feedback was collected; the failure occurs after collection.'),
        ],
      },
      {
        id: 'M5-S04-KC03',
        type: 'single',
        prompt: 'Meeting influence improved after Awra changed timing, a local service actor improved information and seasonal workload decreased. Which evaluation conclusion is strongest?',
        correctOptionIds: ['C'],
        options: [
          option('A', 'Awra alone caused the improvement.', 'Too strong. Several plausible influences are present, so sole attribution is unsupported.'),
          option('B', 'No conclusion is possible because more than one influence existed.', 'Too weak. Evaluation can assess a plausible contribution while acknowledging other influences.'),
          option('C', 'Awra’s changes plausibly contributed to improved influence alongside other factors.', 'Correct. This is a bounded contribution conclusion that reflects the available explanation.'),
          option('D', 'The attendance total proves that influence improved.', 'Incorrect. Attendance is not the same as influence and does not explain why change occurred.'),
        ],
      },
    ],
    reflections: [
      {
        id: 'M5-S04-R01',
        prompt: 'Where does your organisation’s MEAL cycle most often break: monitoring, evaluation, accountability or learning?',
        whyItMatters: 'It identifies the point where evidence stops moving toward response or adaptation.',
        responseType: 'Select one function; optional 15-word example',
        control: 'single-choice',
        required: true,
        carryForwardField: 'cycle_break_point',
        options: ['Monitoring', 'Evaluation', 'Accountability', 'Learning'],
        detailMaxWords: 15,
      },
      {
        id: 'M5-S04-R02',
        prompt: 'Which evidence currently reaches a report but not a clear decision?',
        whyItMatters: 'It focuses attention on decision use rather than additional collection.',
        responseType: 'Choose an evidence type; optional short decision note',
        control: 'short-text',
        required: true,
        carryForwardField: 'decision_use_gap',
        maxWords: 25,
      },
      {
        id: 'M5-S04-R03',
        prompt: 'What would you ask peers who have successfully connected feedback to adaptation and account-back?',
        whyItMatters: 'It creates a focused peer-learning question about closing the cycle.',
        responseType: 'One short question, maximum 25 words',
        control: 'short-text',
        required: false,
        maxWords: 25,
      },
    ],
  },
  'M5-R04': {
    screenId: 'M5-R04',
    number: 5,
    nextScreenId: 'M5-R05',
    title: 'Planning MEAL: Define Results, Success and Learning Questions',
    videoId: 'VsYQSEEejv4',
    watchUrl: 'https://youtu.be/VsYQSEEejv4',
    embedUrl: 'https://www.youtube-nocookie.com/embed/VsYQSEEejv4',
    accessibilitySummary: 'This seven-slide deck explains decision-first MEAL planning. An activity is what the organisation does, such as holding six meetings. An output is what the activity directly produces, such as attendance and documented feedback. A result is a change for people or practice, such as more people understanding options and influencing priorities. Rights-based success signs include access, safe participation, influence and response. Success should reflect the perspectives of Awra staff, rights-holders and responsible actors. The planning chain begins with a result and a real decision, then identifies success signs, a focused learning question, proportionate evidence and intended use. Final checks ask which decision evidence will inform, whether each item is necessary, whose perspective is missing and how the decision will be accounted back.',
    questions: [
      {
        id: 'M5-S05-KC01',
        type: 'single',
        prompt: 'Which statement is a result rather than an activity or output?',
        correctOptionIds: ['C'],
        options: [
          option('A', 'Awra holds six consultation meetings.', 'This is an activity—what Awra does.'),
          option('B', 'The meetings record 240 attendances.', 'This is an output signal produced directly by the activity.'),
          option('C', 'More people understand the options and influence the priorities selected.', 'Correct. This describes a change for people and the decision process.'),
          option('D', 'Facilitators submit the meeting forms on time.', 'This is an operational output or process measure, not the intended result for rights-holders.'),
        ],
      },
      {
        id: 'M5-S05-KC02',
        type: 'single',
        prompt: 'Awra must decide whether to change consultation timing. Which learning question is strongest?',
        correctOptionIds: ['C'],
        options: [
          option('A', 'How many meetings did Awra hold?', 'Too narrow. The activity count does not explain who can participate or which barrier should change.'),
          option('B', 'Did participants like the project?', 'Too broad and vague. It does not identify the decision, participation barrier or evidence needed.'),
          option('C', 'Who can participate at current times, who cannot, and which barrier should Awra address before the next round?', 'Correct. The question identifies different experiences and connects directly to the timing decision.'),
          option('D', 'Can Awra collect more information about every participant?', 'Collection volume is not a learning purpose. The option also risks unnecessary personal data.'),
        ],
      },
      {
        id: 'M5-S05-KC03',
        type: 'single',
        prompt: 'Which evidence plan is most proportionate for the timing decision?',
        correctOptionIds: ['C'],
        options: [
          option('A', 'Collect names, detailed household histories and unrelated personal information from everyone.', 'Disproportionate and risky. Most of this information has no clear use for the timing decision.'),
          option('B', 'Use only the total attendance figure because it is easy to report.', 'Insufficient. A total cannot show who faces a timing barrier or why.'),
          option('C', 'Use broad necessary participation categories, short accounts of access barriers and facilitator observation, then state how the findings will guide timing and account-back.', 'Correct. This is a mixed, decision-linked and proportionate evidence plan.'),
          option('D', 'Delay the decision until Awra can run a large survey covering every possible issue.', 'Disproportionate. The method exceeds the focused decision need and may delay a reasonable adaptation.'),
        ],
      },
    ],
    reflections: [
      {
        id: 'M5-S05-R01',
        prompt: 'Which priority result does your organisation report through activities or outputs but understand poorly as change?',
        whyItMatters: 'It converts the Screen 2 evidence gap into a clearer result focus.',
        responseType: 'Select one result area; optional 20-word result statement',
        control: 'short-text',
        required: true,
        carryForwardField: 'priority_result',
        maxWords: 20,
      },
      {
        id: 'M5-S05-R02',
        prompt: 'Which rights-holder sign of success is missing from the way that result is currently defined?',
        whyItMatters: 'It adds a perspective-based success sign to the later Canvas.',
        responseType: 'Choose access, participation, influence, response or another short sign',
        control: 'single-choice',
        required: true,
        carryForwardField: 'rights_holder_success_sign',
        options: ['Access', 'Participation', 'Influence', 'Response', 'Another short sign'],
        detailMaxWords: 12,
      },
      {
        id: 'M5-S05-R03',
        prompt: 'What one learning question would help your organisation make a real decision about that result?',
        whyItMatters: 'It anchors future evidence choices in decision use.',
        responseType: 'One question, maximum 30 words',
        control: 'short-text',
        required: true,
        carryForwardField: 'learning_question',
        maxWords: 30,
      },
      {
        id: 'M5-S05-R04',
        prompt: 'What support would help you define results or learning questions more confidently?',
        whyItMatters: 'It identifies a concrete future capacity-support need.',
        responseType: 'Select skill, template, facilitation, coaching or peer example',
        control: 'single-choice',
        required: true,
        carryForwardField: 'support_need',
        options: ['Skill', 'Template', 'Facilitation', 'Coaching', 'Peer example'],
      },
    ],
  },
};

export const MODULE5_PRESENTATION_CONTENT = Object.freeze(content);

export function isModule5PresentationScreenId(screenId: string): screenId is Module5PresentationScreenId {
  return (MODULE5_BATCH1_PRESENTATION_SCREEN_IDS as readonly string[]).includes(screenId);
}

export function isModule5KnowledgeAnswerCorrect(
  question: Module5KnowledgeQuestion,
  selectedOptionIds: readonly string[],
) {
  const selected = [...new Set(selectedOptionIds)].sort();
  const correct = [...question.correctOptionIds].sort();
  return selected.length === correct.length && selected.every((id, index) => id === correct[index]);
}

export function isModule5ReflectionValueReady(
  prompt: Module5ReflectionPrompt,
  value: unknown,
) {
  if (!prompt.required) return true;
  if (Array.isArray(value)) {
    return value.length === 2 && value.every((item) => typeof item === 'string' && item.trim());
  }
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) return false;
  return !prompt.maxWords || text.split(/\s+/).length <= prompt.maxWords;
}
