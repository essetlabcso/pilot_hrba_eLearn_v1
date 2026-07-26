export const MODULE5_PRESENTATION_SCHEMA_VERSION = 1;
export const MODULE5_BATCH1_PRESENTATION_CONTENT_REVISION = 'm5-presentation-batch1-v1';
export const MODULE5_PRESENTATION_CONTENT_REVISION = 'm5-presentation-batch2-v1';

export const MODULE5_BATCH1_PRESENTATION_SCREEN_IDS = [
  'M5-R01',
  'M5-R02',
  'M5-R03',
  'M5-R04',
] as const;

export const MODULE5_BATCH2_PRESENTATION_SCREEN_IDS = [
  'M5-R05',
  'M5-R06',
  'M5-R07',
  'M5-R08',
] as const;

export const MODULE5_PRESENTATION_SCREEN_IDS = [
  ...MODULE5_BATCH1_PRESENTATION_SCREEN_IDS,
  ...MODULE5_BATCH2_PRESENTATION_SCREEN_IDS,
] as const;

export type Module5PresentationScreenId = typeof MODULE5_PRESENTATION_SCREEN_IDS[number];
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
  safeInputGuidance?: string;
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
  'M5-R05': {
    screenId: 'M5-R05',
    number: 6,
    nextScreenId: 'M5-R06',
    title: 'Monitoring: Build Rights-Based Indicators',
    videoId: 'i6rVGG6reGo',
    watchUrl: 'https://youtu.be/i6rVGG6reGo',
    embedUrl: 'https://www.youtube-nocookie.com/embed/i6rVGG6reGo',
    accessibilitySummary: 'This seven-slide narrated deck teaches rights-based monitoring through a continuous Evidence Path. It opens by defining indicators as bounded signals, then distinguishes output, process and outcome indicators. The process section makes access, participation, influence and response observable. A pairing slide shows how numbers reveal pattern while qualitative evidence explains experience. The final Jiru Amba set combines delivery, participation quality, influence and change. All information shown by colour is also stated in labels and narration; diagrams are simple reading-order sequences; the complete narration, slide descriptions and sources are available in speaker notes and the production script.',
    questions: [
      {
        id: 'M5-S06-KC01',
        type: 'single',
        prompt: 'Which is the strongest process indicator for meaningful participation in Jiru Amba consultations?',
        correctOptionIds: ['B'],
        options: [
          option('A', 'Number of consultation meetings held', 'This is an output indicator. It shows delivery, not the quality of participation.'),
          option('B', 'Percentage of participants who say they understood the options and could speak safely', 'Correct. It measures how participation was experienced, while still requiring interpretation.'),
          option('C', 'Number of pages in the consultation report', 'This counts a product but does not reveal participation quality.'),
          option('D', 'Percentage of planned funds spent', 'This may be useful management information, but it does not measure meaningful participation.'),
        ],
      },
      {
        id: 'M5-S06-KC02',
        type: 'single',
        prompt: 'Which indicator set best supports the result “more people understand options and influence priorities”?',
        correctOptionIds: ['C'],
        options: [
          option('A', 'Meetings held; total attendance; reports submitted', 'These are useful delivery signals, but they do not show understanding or influence.'),
          option('B', 'Total attendance only, disaggregated into many categories', 'Disaggregation may reveal patterns, but attendance alone still does not show understanding or influence and excessive detail may create risk.'),
          option('C', 'Accessible meetings held; broad participation pattern; accounts of views used; change in understanding', 'Correct. This set covers output, process, influence and outcome with mixed evidence.'),
          option('D', 'Four positive quotations from participants', 'Positive stories can illustrate experience but cannot show the overall pattern or represent everyone.'),
        ],
      },
      {
        id: 'M5-S06-KC03',
        type: 'single',
        prompt: 'Awra reports that 80% of respondents understood the options. Which limitation is most important to state?',
        correctOptionIds: ['B'],
        options: [
          option('A', 'The result proves that every community member understood the options.', 'This overstates the evidence. The figure applies only to the respondents and depends on how understanding was measured.'),
          option('B', 'The measure reflects respondents, the question used and the collection point; it does not by itself show influence.', 'Correct. It bounds both the population and the claim.'),
          option('C', 'No limitation is needed because percentages are objective.', 'Percentages still depend on who responded, how the question was framed and what was measured.'),
          option('D', 'The only limitation is that the figure is below 100%.', 'The size of the percentage is not the key evidence limitation.'),
        ],
      },
    ],
    reflections: [
      {
        id: 'M5-S06-R01',
        prompt: 'Which indicator you use regularly counts delivery but misses people’s experience?',
        whyItMatters: 'It identifies the most important gap between output monitoring and rights-based process evidence.',
        responseType: 'Name one indicator; optional 20-word note',
        control: 'short-text',
        required: true,
        carryForwardField: 'priority_indicator_gap',
        maxWords: 20,
      },
      {
        id: 'M5-S06-R02',
        prompt: 'Which dimension is least visible in your current monitoring: access, participation, influence or response?',
        whyItMatters: 'It locates the rights dimension that most needs attention.',
        responseType: 'Select one; optional reason',
        control: 'single-choice',
        required: true,
        carryForwardField: 'missing_rights_dimension',
        options: ['Access', 'Participation', 'Influence', 'Response'],
        detailMaxWords: 20,
      },
      {
        id: 'M5-S06-R03',
        prompt: 'What would you ask a peer about combining a number with an account of experience?',
        whyItMatters: 'It creates a focused peer-learning question about mixed indicators.',
        responseType: 'One short question',
        control: 'short-text',
        required: false,
        maxWords: 25,
      },
    ],
  },
  'M5-R06': {
    screenId: 'M5-R06',
    number: 7,
    nextScreenId: 'M5-R07',
    title: 'Data Collection: Choose the Right Methods',
    videoId: 'Qo4Tf5Jv9JI',
    watchUrl: 'https://youtu.be/Qo4Tf5Jv9JI',
    embedUrl: 'https://www.youtube-nocookie.com/embed/Qo4Tf5Jv9JI',
    accessibilitySummary: 'This seven-slide narrated deck presents the Method Navigator as a linear decision pathway. It first compares routine records, surveys, interviews, group discussions, observation and participatory ranking. The pathway then asks five questions about the decision, evidence type, people, protection and feasibility. Separate slides explain participation, sensitivity, accessibility and offline-first feasibility. A final Jiru Amba sequence assigns one job to each selected method and records the remaining limitation. All method distinctions are stated in text and narration, the Navigator has a clear left-to-right reading order, and complete descriptions and sources are included in notes and the production script.',
    questions: [
      {
        id: 'M5-S07-KC01',
        type: 'single',
        prompt: 'Awra wants to know how common a timing barrier is and why it affects participation. Which mix best fits?',
        correctOptionIds: ['B'],
        options: [
          option('A', 'Attendance totals only', 'Totals may show a pattern but cannot explain why timing creates a barrier.'),
          option('B', 'A short accessible question for a broad pattern plus a few private conversations for explanation', 'Correct. The methods have distinct jobs and answer both scale and meaning.'),
          option('C', 'One large group discussion with community leaders only', 'This may exclude people experiencing the barrier and may not support safe participation.'),
          option('D', 'Observation only', 'Observation may show timing and access conditions but cannot reliably explain people’s reasons.'),
        ],
      },
      {
        id: 'M5-S07-KC02',
        type: 'single',
        prompt: 'Which Method Navigator question should come first?',
        correctOptionIds: ['C'],
        options: [
          option('A', 'Which method does the organisation usually use?', 'Familiarity may matter for feasibility, but it should not define the evidence need.'),
          option('B', 'How many questions can fit on the form?', 'Form length is a later design consideration, not the first judgement.'),
          option('C', 'What decision will the evidence inform?', 'Correct. Decision use anchors the learning question and prevents unnecessary collection.'),
          option('D', 'Which method produces the most data?', 'More data is not the same as decision-useful, safe evidence.'),
        ],
      },
      {
        id: 'M5-S07-KC03',
        type: 'single',
        prompt: 'A proposed group discussion concerns a sensitive experience, and participants may fear speaking in front of others. What is the strongest response?',
        correctOptionIds: ['C'],
        options: [
          option('A', 'Keep the group method because it is faster.', 'Speed does not resolve sensitivity or power risk.'),
          option('B', 'Ask community leaders to answer for everyone.', 'Leaders cannot safely represent every person’s experience and may intensify exclusion.'),
          option('C', 'Offer a private, voluntary and accessible method, with clear confidentiality limits and referral information where relevant.', 'Correct. This choice improves method fit, protection and meaningful participation.'),
          option('D', 'Collect names so the answers are more credible.', 'Names can increase risk and are unnecessary for many learning questions.'),
        ],
      },
    ],
    reflections: [
      {
        id: 'M5-S07-R01',
        prompt: 'Which method does your organisation use mainly because it is familiar?',
        whyItMatters: 'It surfaces a habit that may not match the decision or learning question.',
        responseType: 'Select one method; optional note',
        control: 'single-choice',
        required: false,
        options: ['Routine records', 'Survey', 'Interview', 'Group discussion', 'Observation', 'Participatory ranking'],
        detailMaxWords: 20,
      },
      {
        id: 'M5-S07-R02',
        prompt: 'What priority decision or learning question should guide your next evidence choice?',
        whyItMatters: 'It carries forward the question that method selection must answer.',
        responseType: 'One concise question',
        control: 'short-text',
        required: true,
        carryForwardField: 'priority_decision_question',
        maxWords: 30,
      },
      {
        id: 'M5-S07-R03',
        prompt: 'Which participation, sensitivity or accessibility factor most changes the method choice?',
        whyItMatters: 'It identifies the human factor that method selection must address.',
        responseType: 'Select one factor; optional reason',
        control: 'single-choice',
        required: true,
        carryForwardField: 'method_fit_gap',
        options: ['Participation', 'Sensitivity', 'Accessibility'],
        detailMaxWords: 20,
      },
      {
        id: 'M5-S07-R04',
        prompt: 'What method-choice question would you bring to peers?',
        whyItMatters: 'It supports peer exchange on practical method trade-offs.',
        responseType: 'One short question',
        control: 'short-text',
        required: false,
        maxWords: 25,
      },
    ],
  },
  'M5-R07': {
    screenId: 'M5-R07',
    number: 8,
    nextScreenId: 'M5-R08',
    title: 'Safe Disaggregation and Ethical Data Collection',
    videoId: 'TtvXvb00UH0',
    watchUrl: 'https://youtu.be/TtvXvb00UH0',
    embedUrl: 'https://www.youtube-nocookie.com/embed/TtvXvb00UH0',
    accessibilitySummary: 'This eight-slide narrated deck follows an ethical evidence route from purpose to safe account-back. It explains necessity, informed and voluntary participation, broad useful categories and the risk created by combinations of details. A fictional small-cell example shows how a subgroup and quotation can identify a person. Layered protection is then presented through anonymisation, aggregation, suppression and access control, followed by referral and the decision to stop or narrow collection. The final Jiru Amba sequence uses limited collection and safe summary reporting. Risks are never communicated by colour alone; every step has a text label, linear reading order, narration, slide description and source list.',
    safeInputGuidance: 'Do not enter names, identifiable participant information, case details, confidential complaints, sensitive personal information or raw organisational datasets.',
    questions: [
      {
        id: 'M5-S08-KC01',
        type: 'single',
        prompt: 'Awra wants to compare access barriers by age. Which collection choice is strongest?',
        correctOptionIds: ['B'],
        options: [
          option('A', 'Collect full name, exact birth date and exact address from everyone.', 'This is more detailed than the stated decision requires and increases identification risk.'),
          option('B', 'Use the broadest useful age bands, collect only necessary barrier information and explain the purpose and choice.', 'Correct. It supports disaggregation while applying necessity, proportion and informed participation.'),
          option('C', 'Collect age only from people who report a problem, without explaining why.', 'Selective unexplained collection can create bias and does not support informed participation.'),
          option('D', 'Avoid all disaggregation because it is always unsafe.', 'Disaggregation can be valuable when purpose, necessity and protection are clear.'),
        ],
      },
      {
        id: 'M5-S08-KC02',
        type: 'single',
        prompt: 'A table cell and quotation may identify the only person in a small subgroup. What is the strongest response?',
        correctOptionIds: ['C'],
        options: [
          option('A', 'Publish both because the name is absent.', 'Indirect details can identify someone even when the name is removed.'),
          option('B', 'Replace the name with initials.', 'Initials may still identify the person and do not address the small-cell risk.'),
          option('C', 'Broaden or merge categories, remove identifying detail and suppress the cell or quotation if risk remains.', 'Correct. This layers reduction, aggregation and suppression.'),
          option('D', 'Ask the collector to decide informally after publication.', 'Risk should be assessed and managed before sharing.'),
        ],
      },
      {
        id: 'M5-S08-KC03',
        type: 'single',
        prompt: 'When is “do not collect” the strongest decision?',
        correctOptionIds: ['A'],
        options: [
          option('A', 'When the information is interesting but has no clear use and no safe protection or response plan.', 'Correct. Curiosity alone does not justify avoidable risk.'),
          option('B', 'Whenever a question is qualitative.', 'Qualitative collection can be ethical and useful when purpose, consent and protection are clear.'),
          option('C', 'Whenever a participant has a different view.', 'Different views are important evidence; disagreement is not a reason to stop collection.'),
          option('D', 'Only after all details have already been collected.', 'Necessity and protection should be considered before and throughout collection.'),
        ],
      },
    ],
    reflections: [
      {
        id: 'M5-S08-R01',
        prompt: 'Which personal or sensitive item is collected without a clear decision use?',
        whyItMatters: 'It identifies an immediate data-minimisation priority.',
        responseType: 'Name one item or enter “none”',
        control: 'short-text',
        required: true,
        carryForwardField: 'unnecessary_data_item',
        maxWords: 20,
      },
      {
        id: 'M5-S08-R02',
        prompt: 'Where could a small group or combination of details identify a person?',
        whyItMatters: 'It locates the most important disclosure risk.',
        responseType: 'One short risk statement',
        control: 'short-text',
        required: true,
        carryForwardField: 'priority_protection_risk',
        maxWords: 25,
      },
      {
        id: 'M5-S08-R03',
        prompt: 'Which protection response is most needed: minimise, aggregate, suppress, restrict access, refer or stop?',
        whyItMatters: 'It converts the risk into a concise protection priority.',
        responseType: 'Select one; optional reason',
        control: 'single-choice',
        required: true,
        carryForwardField: 'protection_response',
        options: ['Minimise', 'Aggregate', 'Suppress', 'Restrict access', 'Refer', 'Stop'],
        detailMaxWords: 20,
      },
      {
        id: 'M5-S08-R04',
        prompt: 'What ethical collection question would you discuss with peers?',
        whyItMatters: 'It supports peer exchange on difficult collection choices.',
        responseType: 'One short question',
        control: 'short-text',
        required: false,
        maxWords: 25,
      },
    ],
  },
  'M5-R08': {
    screenId: 'M5-R08',
    number: 9,
    nextScreenId: 'M5-R09',
    title: 'Data Management: Organize, Clean and Protect Evidence',
    videoId: 'RwnBCFx2tfI',
    watchUrl: 'https://youtu.be/RwnBCFx2tfI',
    embedUrl: 'https://www.youtube-nocookie.com/embed/RwnBCFx2tfI',
    accessibilitySummary: 'This eight-slide narrated deck presents data management as a full evidence lifecycle. It begins with six common risks: duplicates, inconsistent labels, missing information, unnecessary identifiers, sensitive feedback and small groups. It then shows how stable definitions, non-identifying record codes, versions and separate raw, cleaned and final evidence support careful cleaning. Later slides cover audit trails, separation of sensitive evidence, role-based access, paper and digital protection, transfers, incidents, retention and deletion. A final Jiru Amba flow moves from receipt to documented disposal. Every relationship is labelled in text, colour is redundant, and full narration, descriptions and sources are provided in notes and the production script.',
    safeInputGuidance: 'Do not enter names, identifiable participant information, case details, confidential complaints, sensitive personal information or raw organisational datasets.',
    questions: [
      {
        id: 'M5-S09-KC01',
        type: 'single',
        prompt: 'Two records look similar, but one has a different time and participant code. What should Awra do first?',
        correctOptionIds: ['B'],
        options: [
          option('A', 'Delete one immediately to avoid double counting.', 'Similarity alone does not confirm a duplicate; deletion could remove valid evidence.'),
          option('B', 'Confirm the duplicate using the documented rule and retain an audit trail of any change.', 'Correct. Cleaning should be evidence-based and traceable.'),
          option('C', 'Average the two records.', 'Averaging changes the evidence and does not resolve whether the records are duplicates.'),
          option('D', 'Give both records the same participant name.', 'Adding identifiers increases risk and does not confirm duplication.'),
        ],
      },
      {
        id: 'M5-S09-KC02',
        type: 'single',
        prompt: 'Who should access a file containing direct identifiers and sensitive feedback?',
        correctOptionIds: ['B'],
        options: [
          option('A', 'Everyone involved in the programme, for convenience.', 'Broad access increases exposure and is not tied to a defined purpose.'),
          option('B', 'Only authorised roles with a defined need, with identifiers and sensitive feedback separated where access needs differ.', 'Correct. Access follows purpose, role and data sensitivity.'),
          option('C', 'Anyone who already has the link.', 'Possession of a link is not authorisation.'),
          option('D', 'All participants, so the process is transparent.', 'Transparency does not require exposing other people’s identifiable or sensitive information.'),
        ],
      },
      {
        id: 'M5-S09-KC03',
        type: 'single',
        prompt: 'Which retention approach is strongest?',
        correctOptionIds: ['C'],
        options: [
          option('A', 'Keep every copy indefinitely in case it becomes useful.', 'Indefinite retention can increase risk without a defined use.'),
          option('B', 'Delete all evidence immediately after collection.', 'Some evidence may be needed for analysis, accountability or approved duties.'),
          option('C', 'Set a purpose- and policy-based period, review continuing need, then delete or archive through an approved process and record exceptions.', 'Correct. This treats retention and deletion as managed lifecycle decisions.'),
          option('D', 'Leave retention to each staff member’s preference.', 'Individual preference creates inconsistency and weak accountability.'),
        ],
      },
    ],
    reflections: [
      {
        id: 'M5-S09-R01',
        prompt: 'Which data-quality problem recurs most often: duplicates, labels or missing information?',
        whyItMatters: 'It identifies the highest-value cleaning priority.',
        responseType: 'Select one; optional example',
        control: 'single-choice',
        required: true,
        carryForwardField: 'priority_data_quality_issue',
        options: ['Duplicates', 'Labels', 'Missing information'],
        detailMaxWords: 20,
      },
      {
        id: 'M5-S09-R02',
        prompt: 'Which role or location currently has more access than the purpose requires?',
        whyItMatters: 'It identifies a concrete access-control gap without requesting sensitive detail.',
        responseType: 'Name a role or storage point; enter “none” if there is no gap',
        control: 'short-text',
        required: true,
        carryForwardField: 'priority_access_gap',
        maxWords: 20,
      },
      {
        id: 'M5-S09-R03',
        prompt: 'Where is the largest retention or deletion gap?',
        whyItMatters: 'It locates the lifecycle step most likely to create unnecessary risk.',
        responseType: 'Select paper, digital, copies, backups or none',
        control: 'single-choice',
        required: true,
        carryForwardField: 'retention_deletion_gap',
        options: ['Paper', 'Digital', 'Copies', 'Backups', 'None'],
      },
      {
        id: 'M5-S09-R04',
        prompt: 'What data-management question would you discuss with peers?',
        whyItMatters: 'It supports peer learning on practical evidence management.',
        responseType: 'One short question',
        control: 'short-text',
        required: false,
        maxWords: 25,
      },
    ],
  },
};

export const MODULE5_PRESENTATION_CONTENT = Object.freeze(content);

export function isModule5PresentationScreenId(screenId: string): screenId is Module5PresentationScreenId {
  return (MODULE5_PRESENTATION_SCREEN_IDS as readonly string[]).includes(screenId);
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
