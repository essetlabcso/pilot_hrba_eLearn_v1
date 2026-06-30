import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { LearningState } from '../../state/learningState';
import {
  getModule3RevisedScreen,
  module3RevisedScreenRoutes,
  type Module3RevisedScreen,
} from '../../data/module3/module3RevisedScreens';
import { module3ApprovedCaseNarrativeParagraphs } from '../../data/module3/jiruAmbaCaseNarrative';
import './module3-revised.css';

type Module3RevisedRendererProps = {
  screenId: string;
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
};

const MODULE_ID = 'module_03_project_design';

const snapshotFields = [
  'Project or plan title',
  'Main design problem',
  'Key rights-holders affected',
  'Main barriers or risks',
  'Duty-bearers and responsible actors',
  'Most important design repair',
  'Stronger indicator or sign of change',
  'Implementation watch-point',
];

const knowledgeCheckPrompts = [
  'Main design problem in the Jiru Amba plan',
  'Rights-holder-specific barrier',
  'Accountability improvement',
  'Stronger HRBA indicator',
  'Revised objective quality',
];

const module3IntroVideoAsset = {
  video: '/assets/hrba/modules/module-3-redesign/m3-intro-video.mp4',
  poster: '/assets/hrba/modules/module-3-redesign/m3-intro-video-poster.webp',
  posterAlt: 'Intro video poster for Module 3 on applying HRBA in project design.',
};

const module3IntroTranscript = `Welcome to Module 3: Applying HRBA in Project Design. In this module, you will practice looking beneath a project activity list to understand who is affected, what barriers shape participation and benefit, who has responsibility, and what risks or accountability gaps need to be addressed before implementation begins. You will work with one shared planning case and use practical design tools to review context, standards, rights-holders, duty-bearers, power, root causes, gender and disability, participation, accountability, risk, objectives, activities, and indicators. By the end of the module, you will complete an HRBA Project Design Improvement Snapshot that captures the most important improvements needed in a project design.`;

const module3RoadmapVisualAsset = {
  src: '/assets/hrba/modules/module-3/m3-s02-learning-roadmap-strip.svg',
  alt: 'Seven-part roadmap for Module 3 showing the learning journey from seeing the design problem to saving the HRBA project design snapshot.',
};

const module3RoadmapIntro = [
  'In Module 2, you explored the everyday rights lens. In this module, you will use that lens in project design.',
  'This module is about how to design a project or plan so that HRBA is built into the analysis, objectives, activities, participation, accountability, inclusion, risk management, evidence, and intervention logic.',
  'You will work with one shared planning case and use practical tools to examine what looks strong, what is missing, and what should be improved before implementation begins.',
  'By the end of the module, you will complete an HRBA Project Design Improvement Snapshot. This is a practical review tool that helps you identify and organize the key improvements needed in a project design.',
];

const module3LearningObjectives = [
  {
    title: 'Explain HRBA in project design',
    description: 'Explain why HRBA is not only wording in a proposal or plan, but a way of shaping project choices before implementation begins.',
  },
  {
    title: 'Review a project design beneath the surface',
    description: 'Look beyond activities, budget, timeline, and indicators to identify hidden HRBA gaps.',
  },
  {
    title: 'Identify specific rights-holders and barriers',
    description: 'Move beyond broad labels and identify who is affected differently, who may be missing, and what barriers they face.',
  },
  {
    title: 'Clarify responsibilities and CSO roles',
    description: 'Distinguish rights-holders, duty-bearers, supporting actors, informal influencers, and the realistic role of the CSO.',
  },
  {
    title: 'Strengthen participation, accountability, inclusion, and risk management',
    description: 'Check whether people can influence decisions, receive feedback, participate safely, and benefit without avoidable harm.',
  },
  {
    title: 'Repair project design choices',
    description: 'Improve objectives, activities, intervention logic, indicators, and plan or proposal sections using HRBA analysis.',
  },
  {
    title: 'Complete a practical design snapshot',
    description: 'Prepare a safe, non-sensitive HRBA Project Design Improvement Snapshot that can be carried into later implementation and MEAL work.',
  },
];

const module3RoadmapSteps = [
  'See the design problem',
  'Analyze before activities',
  'Identify rights-holders and barriers',
  'Clarify responsibility, power, and causes',
  'Check inclusion, accountability, and risk',
  'Repair the design and review the plan',
  'Save your design snapshot and prepare for implementation',
];

const module3CaseAssets = {
  introPoster: {
    src: '/assets/hrba/modules/module-3/m3-s03-jiru-amba-case-intro-poster.webp',
    alt: 'Illustration of a local planning consultation for the Jiru Amba Futures Plan, with community members, officials, and CSO facilitators present.',
  },
  readerCover: {
    src: '/assets/hrba/modules/module-3/m3-s03-jiru-amba-case-reader-cover.webp',
    alt: 'Illustration of the Jiru Amba local development context, including market activity, a water point, public buildings, and community services.',
  },
};

const module3CaseIntroParagraphs = [
  'For the rest of this module, you will work with one shared fictional case: the Jiru Amba Futures Plan.',
  'The plan looks active and well organized. Consultations were held. Priorities were ranked. Activities, budgets, and indicators were written. On paper, the proposal appears ready to implement.',
  'But HRBA asks a deeper design question: did participation actually influence the plan, and does the plan respond to the different barriers, responsibilities, risks, and power relations affecting people in Jiru Amba?',
  'You do not need to solve the whole case on this screen. You are only meeting the case. You will return to it step by step as you practice context analysis, standards mapping, stakeholder and power analysis, rights-holder and duty-bearer mapping, root-cause analysis, risk review, objective repair, activity repair, intervention logic, indicators, and final plan review.',
];

const module3VideoSummary =
  'The Jiru Amba Futures Plan is a fictional planning case supported by Awra Grassroots Initiative. On paper, the plan looks participatory: people attended consultations, activities were listed, and the report says the community validated the plan. A deeper HRBA review asks whether participation actually changed decisions, budgets, responsibilities, risks, and accountability before implementation begins.';

const module3CaseSignals = [
  'Who attended, but may not have influenced decisions',
  'Which barriers are visible only after deeper analysis',
  'Which responsibilities belong to duty-bearers or service actors',
  'Where informal power may shape participation and benefit',
  'What risks need careful, safe design choices',
  'What the CSO can realistically facilitate, and what it should not replace',
];

const module3SnapshotPreviewAsset = {
  src: '/assets/hrba/modules/module-3/m3-s04-snapshot-preview-canvas.svg',
  alt: 'Preview of the HRBA Project Design Improvement Snapshot with eight connected sections for reviewing and improving a project design.',
};

const module3SnapshotIntroParagraphs = [
  'As you move through this module, you will build toward one practical output: an HRBA Project Design Improvement Snapshot.',
  'The snapshot is a short design-review tool. It helps you organize what should be improved in a project or plan before implementation begins.',
  'You will use the Jiru Amba Futures Plan as the shared practice case. Later, you can adapt the same thinking to your own safe, non-sensitive project examples.',
  'The snapshot is not a full proposal. It is a concise way to capture the most important HRBA design improvements: who is affected, what barriers matter, who has responsibility, what risks need attention, and what should change in the design.',
];

const module3SnapshotSections = [
  {
    title: 'Project issue and standards',
    description: 'What problem is the project addressing, and which rights, standards, or commitments matter?',
  },
  {
    title: 'Rights-holders and barriers',
    description: 'Who is affected differently, who may be missing, and what barriers shape access, voice, safety, or benefit?',
  },
  {
    title: 'Duty-bearers, supporting actors, and CSO role',
    description: 'Who has public or service responsibility, who supports the process, and what can the CSO realistically do?',
  },
  {
    title: 'Power, root causes, and capacity gaps',
    description: 'What deeper causes, informal influence, or capacity gaps explain why the issue continues?',
  },
  {
    title: 'Gender and disability checks',
    description: 'How do gender, disability, age, livelihood, location, or social position change people’s experience of the plan?',
  },
  {
    title: 'Participation, accountability, and risk',
    description: 'Can people influence decisions, receive response, participate safely, and avoid preventable harm?',
  },
  {
    title: 'Objective, activities, logic, and indicators',
    description: 'Do the objective, activities, intervention logic, and indicators respond to the real barriers and responsibilities?',
  },
  {
    title: 'Plan repair and implementation watch-points',
    description: 'What needs to be changed now, and what should be watched carefully during implementation?',
  },
];

const module3ContextScanAssets = {
  review: {
    src: '/assets/hrba/modules/module-3/m3-s05-context-analysis-jiru-amba-review.webp',
    alt: 'Illustration showing a Jiru Amba planning consultation alongside evidence that reveals hidden inequality, barriers, and unequal influence.',
  },
  signals: {
    src: '/assets/hrba/modules/module-3/m3-s05-context-signals-cards.svg',
    alt: 'Visual card set comparing visible planning evidence with hidden warning signs that may reveal inequality, exclusion, or barriers in the Jiru Amba project design.',
  },
};

const module3ContextScanIntro = [
  'A project idea can look useful and still be weak if the team does not understand the context well enough.',
  'A normal needs assessment may ask: “What problem should we respond to?” An HRBA context and inequality scan goes further. It asks: “Who is affected differently, what barriers shape the problem, what is still assumed, and what must be checked safely before we design activities?”',
  'This matters because many project designs move too quickly from a visible problem to a familiar activity. HRBA asks the project team to pause first and check whether the design is responding to the real barriers behind the issue.',
];

const module3ContextConceptChips = [
  'What is visible?',
  'Who is affected differently?',
  'What barriers may exist?',
  'What is still assumed?',
  'What evidence should be verified safely?',
];

const module3ContextEvidence = [
  {
    label: '1. What is visible?',
    items: [
      'A planning meeting took place.',
      'A service improvement plan was drafted.',
      'Activities and budget lines were included.',
    ],
  },
  {
    label: '2. Who may experience this differently?',
    items: [
      'Women',
      'Youth',
      'Persons with disabilities',
      'Low-income households',
      'Remote kebele residents',
    ],
  },
  {
    label: '3. What barriers may explain this difference?',
    items: [
      'Information does not reach everyone in time.',
      'Meeting times conflict with work or care responsibilities.',
      'Materials or venues are not accessible.',
      'People do not know how feedback will be used.',
    ],
  },
  {
    label: '4. What is still assumed?',
    items: [
      '“The community participated” may not prove influence.',
      '“Women were invited” may not prove safe or equal participation.',
      '“Youth were consulted” may not prove their priorities shaped the final plan.',
    ],
  },
  {
    label: '5. What should be checked safely before design is finalized?',
    items: [
      'Disaggregated participation information where available.',
      'Facilitation notes and planning records.',
      'Anonymized feedback summaries.',
      'Safe discussion with trusted community facilitators.',
    ],
  },
];

type ContextScanCategory = 'group' | 'barrier' | 'evidence' | 'visible';
type ContextScanQuality = 'strong' | 'partial' | 'surface';

type Module3ContextChoice = {
  id: string;
  label: string;
  text: string;
  tag: string;
  quality: ContextScanQuality;
  feedback: string;
  outputGroup: string;
  categories: ContextScanCategory[];
  affectedGroups: string[];
  barriers: string[];
  evidence: string[];
  visibleEvidence?: string[];
};

const module3ContextChoices: Module3ContextChoice[] = [
  {
    id: 'influence',
    label: 'Option A',
    text: 'Some people were present, but it is not clear whether they meaningfully influenced the priorities.',
    tag: 'Unequal influence',
    quality: 'strong',
    feedback: 'This is a strong HRBA signal. Presence does not prove influence. The design should check whether different groups shaped the priorities, not only whether they attended.',
    outputGroup: 'voice',
    categories: ['barrier', 'evidence'],
    affectedGroups: ['People present but less able to shape decisions'],
    barriers: ['Unequal influence'],
    evidence: ['Facilitation notes', 'Planning records showing whether priorities changed after consultation'],
  },
  {
    id: 'women-barriers',
    label: 'Option B',
    text: 'Women may face time, location, safety, care-work, livelihood, or information barriers, especially in relation to household water responsibilities and water-service decisions.',
    tag: 'Gendered access and livelihood barriers',
    quality: 'strong',
    feedback: 'This is a strong selection. A project may invite women but still miss the barriers that affect whether they can participate, speak, influence decisions, or benefit.',
    outputGroup: 'livelihood',
    categories: ['group', 'barrier'],
    affectedGroups: ['Women — in the context of household water responsibilities and water-service decisions'],
    barriers: ['Time and care-work barriers', 'Location and safety barriers', 'Livelihood and information barriers'],
    evidence: ['Anonymized feedback summaries from women', 'Observation of timing, location, and information barriers'],
  },
  {
    id: 'disability-access',
    label: 'Option C',
    text: 'Persons with disabilities may be invited but still face inaccessible meetings, materials, facilities, or feedback channels.',
    tag: 'Accessibility barriers',
    quality: 'strong',
    feedback: 'This is a strong selection. Disability inclusion is not proven by invitation. The design must check whether access, accommodation, communication, and feedback are built in.',
    outputGroup: 'access',
    categories: ['group', 'barrier', 'evidence'],
    affectedGroups: ['Persons with disabilities'],
    barriers: ['Inaccessible meetings, materials, facilities, or feedback channels'],
    evidence: ['Observation of accessibility barriers', 'Accessible-format and accommodation records where available'],
  },
  {
    id: 'youth-pathway',
    label: 'Option D',
    text: 'Youth livelihood activities are listed, but the pathway from training to practical opportunity is unclear.',
    tag: 'Activity-to-outcome assumption',
    quality: 'strong',
    feedback: 'This is a strong selection. Training may be useful, but HRBA design should check whether young people can access information, resources, markets, networks, decision spaces, and follow-up support.',
    outputGroup: 'livelihood',
    categories: ['group', 'barrier', 'evidence'],
    affectedGroups: ['Youth'],
    barriers: ['Unclear pathway from training to practical opportunity'],
    evidence: ['Service or committee records', 'Anonymized feedback on access to markets, networks, and follow-up support'],
  },
  {
    id: 'remote-information',
    label: 'Option E',
    text: 'Remote kebele residents may be counted late or may receive information after decisions are already shaped.',
    tag: 'Information and geographic access barriers',
    quality: 'strong',
    feedback: 'This is a strong selection. If information reaches some groups late, participation may become symbolic rather than meaningful.',
    outputGroup: 'poverty',
    categories: ['group', 'barrier', 'evidence'],
    affectedGroups: ['Remote kebele residents'],
    barriers: ['Late or uneven information', 'Distance or location barriers'],
    evidence: ['Communication records', 'Disaggregated participation information where available'],
  },
  {
    id: 'admin-plan',
    label: 'Option F',
    text: 'The plan includes activities, budget lines, and indicators.',
    tag: 'Visible project structure',
    quality: 'surface',
    feedback: 'This shows the plan is organized, but it does not prove that the design is rights-based. HRBA analysis still needs to check barriers, influence, accountability, and safe evidence.',
    outputGroup: 'surface',
    categories: ['visible'],
    affectedGroups: [],
    barriers: [],
    evidence: [],
    visibleEvidence: ['The plan includes activities, budget lines, and indicators.'],
  },
  {
    id: 'consulted-claim',
    label: 'Option G',
    text: 'The committee says the community was consulted.',
    tag: 'Claim needing verification',
    quality: 'partial',
    feedback: 'This may be useful, but it is not enough by itself. The scan should ask who was consulted, who was missing, who influenced decisions, and how feedback changed the plan.',
    outputGroup: 'surface',
    categories: ['visible', 'evidence'],
    affectedGroups: [],
    barriers: ['Consultation claim may hide missing influence'],
    evidence: ['Planning records', 'Facilitation notes', 'Before-and-after notes showing how feedback changed the plan'],
    visibleEvidence: ['The committee says the community was consulted.'],
  },
  {
    id: 'final-meeting',
    label: 'Option H',
    text: 'The project team plans to hold a public meeting to explain the final plan.',
    tag: 'Late-stage communication',
    quality: 'partial',
    feedback: 'Explaining a final plan is not the same as meaningful participation. The scan should check whether rights-holders influenced the plan before decisions were finalized.',
    outputGroup: 'voice',
    categories: ['barrier'],
    affectedGroups: ['Rights-holders invited only after decisions are finalized'],
    barriers: ['Participation happens too late to influence decisions'],
    evidence: ['Planning timeline records', 'Evidence of whether rights-holder feedback changed priorities before finalization'],
  },
  {
    id: 'feedback-boxes',
    label: 'Option I',
    text: 'Feedback boxes were placed near public offices.',
    tag: 'Weak accountability evidence',
    quality: 'strong',
    feedback: 'This is a strong selection if the design does not explain who can use the boxes safely, who responds, how complaints are protected, and how people know what changed.',
    outputGroup: 'accountability',
    categories: ['barrier', 'evidence'],
    affectedGroups: ['People who cannot safely or practically use public feedback boxes'],
    barriers: ['Weak feedback response', 'Safety and confidentiality concerns'],
    evidence: ['Non-identifying feedback and response logs', 'Safe feedback from trusted channels'],
  },
  {
    id: 'ranking-gap',
    label: 'Option J',
    text: 'Service priorities were ranked, but the ranking process is not explained.',
    tag: 'Decision-making transparency gap',
    quality: 'strong',
    feedback: 'This is a strong selection. HRBA context analysis asks how priorities were set, who influenced them, and whether the process was transparent and inclusive.',
    outputGroup: 'voice',
    categories: ['barrier', 'evidence'],
    affectedGroups: ['Groups whose priorities may not have shaped the ranking'],
    barriers: ['Unclear ranking process', 'Decision-making transparency gap'],
    evidence: ['Priority ranking records', 'Facilitation notes', 'Anonymized summaries of who shaped the final ranking'],
  },
];

const module3ContextOutputGroups = [
  {
    id: 'voice',
    label: 'Unequal influence and decision transparency',
    emptyText: 'No influence or decision-transparency signals selected yet.',
  },
  {
    id: 'access',
    label: 'Access and accommodation barriers',
    emptyText: 'No access or accommodation signals selected yet.',
  },
  {
    id: 'livelihood',
    label: 'Livelihood, care-work, safety, and information barriers',
    emptyText: 'No livelihood, care-work, safety, or information signals selected yet.',
  },
  {
    id: 'poverty',
    label: 'Income, location, and information barriers',
    emptyText: 'No income, location, or information signals selected yet.',
  },
  {
    id: 'accountability',
    label: 'Feedback and accountability gaps',
    emptyText: 'No feedback or accountability signals selected yet.',
  },
  {
    id: 'surface',
    label: 'Visible evidence selected',
    emptyText: 'No visible-only evidence selected.',
    note: 'Useful evidence, but it does not by itself show meaningful participation, barrier removal, or rights-holder influence.',
  },
];

const module3ContextCarryForward = [
  {
    label: 'Learning from the Jiru Amba case',
    text: 'The plan should not rely on attendance, activity lists, budget lines, or inclusion statements alone. It should explain who may be affected differently, what barriers shape participation and benefit, and what evidence still needs safe verification.',
  },
  {
    label: 'Groups to examine further',
    text: 'Women, youth, persons with disabilities, low-income households, remote kebele residents, informal workers, and people who rely on public services but rarely influence decisions.',
  },
  {
    label: 'Barriers to test next',
    text: 'Influence, information, accessibility, timing, safety, livelihood risk, distance, decision transparency, and feedback response.',
  },
];

const contextScanTemplateMarkdown = `# Context and Inequality Scan Template

Use this template before finalizing project activities. It helps your CSO check whether the project idea is based on real HRBA analysis, not only visible needs, activities, or attendance.

Do not include real names, exact sensitive locations, complaint details, survivor stories, or identifiable personal information.

## 1. Project idea or issue

What project idea, service issue, advocacy issue, or community concern are you analyzing?

## 2. What is visible?

What does the current proposal, assessment, meeting note, report, or project idea already show?

## 3. Who may be affected differently?

Which groups may experience the issue differently because of gender, age, disability, income, location, livelihood, language, social position, displacement, or other barriers?

## 4. What barriers may exist?

Check all that may apply:

- information does not reach everyone equally;
- participation happens too late to influence decisions;
- meeting times or locations exclude some groups;
- materials, venues, services, or feedback channels are inaccessible;
- social norms or power relations limit voice;
- informal leaders or brokers filter priorities;
- costs, distance, transport, or livelihood demands reduce access;
- safety, stigma, or retaliation concerns reduce participation;
- service rules or committee decisions are unclear;
- feedback is collected but not answered;
- disaggregated evidence is missing;
- other: ______.

## 5. What is still assumed?

Which positive statements need to be checked before the design is finalized?

Examples:

- "The community supports this."
- "Women and men can participate equally."
- "Persons with disabilities are included."
- "Youth will benefit from training."
- "Feedback channels are available."
- "Remote kebeles are represented."

## 6. What evidence can be verified safely?

What can be reviewed without exposing people or creating risk?

Examples:

- disaggregated participation information where available;
- facilitation notes;
- anonymized feedback summaries;
- planning records;
- service or committee records;
- observation of accessibility barriers;
- safe discussion with trusted community facilitators;
- existing secondary data;
- other: ______.

## 7. What should change in the design?

Based on the scan, what should change before activities, budget, indicators, participation arrangements, or feedback systems are finalized?

## 8. Carry-forward note

Which issue should be carried into the next design tools?

- standards and policy map;
- rights-holder and barrier map;
- duty-bearer and actor responsibility map;
- power and influence analysis;
- root-cause and capacity-gap analysis;
- gender and disability design check;
- participation and accountability pathway;
- risk and do-no-harm board;
- intervention logic and indicators.
`;

type PolicyAnchorId =
  | 'meaningful_participation'
  | 'non_discrimination_equality'
  | 'disability_accessibility'
  | 'transparency_information'
  | 'accountability_response'
  | 'livelihood_service_commitment';

type JiruAmbaSignalId =
  | 'presence_without_influence'
  | 'different_barriers_across_groups'
  | 'disability_access_barriers'
  | 'information_gaps'
  | 'weak_follow_up_response'
  | 'unclear_livelihood_pathway'
  | 'service_improvement_uncertainty';

type SourceLayer =
  | 'HRBA principle / local planning commitment'
  | 'HRBA principle / rights standard'
  | 'Rights standard / accessibility principle'
  | 'HRBA principle / accountability standard'
  | 'HRBA principle / project accountability commitment'
  | 'Sector/service commitment / project commitment';
type FeedbackLevel = 'strong' | 'good_with_gap' | 'partial' | 'surface';

type PolicyAnchor = {
  id: PolicyAnchorId;
  title: string;
  sourceLayer: SourceLayer;
  plainMeaning: string;
  relatedReferences: string[];
  useWhen: string;
  protectsOrRequires: string;
  designImplication: string;
  designQuestionPreview: string;
  relatedSignalIds: JiruAmbaSignalId[];
  defaultSignalId: JiruAmbaSignalId;
  designQuestion: string;
  responsibilityQuestion: string;
  snapshotTag: string;
  priority: 'core' | 'supporting';
};

type SignalOption = {
  id: JiruAmbaSignalId;
  label: string;
  plainDescription: string;
};

type AnchorSignalMatch = {
  anchorId: PolicyAnchorId;
  signalId: JiruAmbaSignalId;
};

type SignalReferenceMatch = {
  signalId: JiruAmbaSignalId;
  anchorId: PolicyAnchorId;
};

type GeneratedStandardsMapRow = {
  anchorId: PolicyAnchorId;
  anchorTitle: string;
  sourceLayer: SourceLayer;
  relatedReferences: string[];
  signalId: JiruAmbaSignalId;
  signalLabel: string;
  designQuestion: string;
  responsibilityQuestion: string;
  designImplication: string;
  snapshotTag: string;
};

const module3PolicyMapAssets = {
  main: {
    src: '/assets/hrba/modules/module-3/m3-s06-policy-standards-jiru-amba.webp',
    alt: 'Illustration of a Jiru Amba planning discussion using a standards and policy map to connect accessibility, accountability, livelihood, service, and participation questions to project design.',
  },
  strip: {
    src: '/assets/hrba/modules/module-3/m3-s06-standards-anchors-icons.svg',
    alt: 'Icon strip showing examples of rights and policy references for accessibility, accountability, livelihood, service quality, and meaningful participation.',
  },
};

const module3RightsHolderBarrierAssets = {
  defaultPreview: {
    src: '/assets/hrba/modules/module-3/m3-s07-rights-holders-jiru-amba.webp',
    alt: 'Illustration of a local planning discussion with different community groups present, including women, youth, people from remote areas, and a person with disability, showing why specific rights-holder and barrier analysis is needed.',
  },
};

const policyMapConceptChips = [
  'What rights or commitments apply?',
  'Who may be excluded?',
  'Who has responsibility?',
  'What should change in the design?',
];

const policyAnchors: PolicyAnchor[] = [
  {
    id: 'meaningful_participation',
    title: 'Participation and consultation',
    sourceLayer: 'HRBA principle / local planning commitment',
    plainMeaning: 'People should have timely, informed, inclusive, and meaningful opportunities to influence decisions that affect them.',
    relatedReferences: ['HRBA participation principle', 'Local planning or consultation commitment', 'Project participation commitment'],
    useWhen: 'Weak influence, late consultation, decisions shaped before people can respond, or participation that does not affect priorities.',
    protectsOrRequires: 'People should have timely, informed, inclusive, and meaningful opportunities to influence decisions that affect them.',
    designImplication: 'Build participation into the design before decisions are finalized, not only as a meeting or information-sharing event.',
    designQuestionPreview: 'How will different groups influence priorities before the plan is finalized?',
    relatedSignalIds: ['presence_without_influence', 'different_barriers_across_groups', 'weak_follow_up_response'],
    defaultSignalId: 'presence_without_influence',
    designQuestion: 'How will different groups influence priorities before the plan is finalized?',
    responsibilityQuestion: 'Which planning or facilitation actor ensures that consultation happens early enough to influence decisions?',
    snapshotTag: 'Participation and consultation reference',
    priority: 'core',
  },
  {
    id: 'non_discrimination_equality',
    title: 'Equality and non-discrimination',
    sourceLayer: 'HRBA principle / rights standard',
    plainMeaning: 'The design should respond to different barriers faced by different groups, not assume one equal process works for everyone.',
    relatedReferences: ['HRBA non-discrimination and equality principle', 'Rights standard on equality', 'Project inclusion commitment'],
    useWhen: 'Different barriers by gender, age, disability, income, location, livelihood, language, or social position.',
    protectsOrRequires: 'The design should respond to different barriers faced by different groups, not assume one equal process works for everyone.',
    designImplication: 'Adjust outreach, access, information, budget, timing, indicators, and feedback so the design does not reproduce exclusion.',
    designQuestionPreview: 'Which groups face different barriers, and what design changes are needed to reduce them?',
    relatedSignalIds: ['different_barriers_across_groups', 'disability_access_barriers', 'service_improvement_uncertainty'],
    defaultSignalId: 'different_barriers_across_groups',
    designQuestion: 'Which groups face different barriers, and what design changes are needed to reduce them?',
    responsibilityQuestion: 'Who must check whether the design responds differently to different barriers?',
    snapshotTag: 'Equality and non-discrimination reference',
    priority: 'core',
  },
  {
    id: 'disability_accessibility',
    title: 'Disability inclusion and accessibility',
    sourceLayer: 'Rights standard / accessibility principle',
    plainMeaning: 'Participation, information, services, and feedback must be accessible.',
    relatedReferences: ['Disability inclusion and accessibility standard', 'Reasonable accommodation principle', 'Project accessibility commitment'],
    useWhen: 'Inaccessible venues, materials, services, transport, communication, or feedback channels.',
    protectsOrRequires: 'Participation, information, services, and feedback must be accessible.',
    designImplication: 'Include accessibility checks, accessible formats, reasonable accommodation, and disability-sensitive feedback in the project design.',
    designQuestionPreview: 'What accessibility, reasonable accommodation, and communication measures are built into the plan?',
    relatedSignalIds: ['disability_access_barriers', 'information_gaps'],
    defaultSignalId: 'disability_access_barriers',
    designQuestion: 'What accessibility, reasonable accommodation, and communication measures are built into the plan?',
    responsibilityQuestion: 'Who budgets, provides, and monitors accessibility measures?',
    snapshotTag: 'Disability accessibility reference',
    priority: 'core',
  },
  {
    id: 'transparency_information',
    title: 'Transparency and access to information',
    sourceLayer: 'HRBA principle / accountability standard',
    plainMeaning: 'People need clear, timely, and accessible information to participate and follow up.',
    relatedReferences: ['HRBA transparency and access to information principle', 'Public information or service-notice commitment', 'Project communication commitment'],
    useWhen: 'Information gaps, late communication, unclear criteria, or inaccessible information.',
    protectsOrRequires: 'People need clear, timely, and accessible information to participate and follow up.',
    designImplication: 'Add a clear information-sharing plan before consultations, selection, budgeting, implementation, and feedback.',
    designQuestionPreview: 'What information will be shared, when, in what format, and through which channels?',
    relatedSignalIds: ['information_gaps', 'presence_without_influence', 'weak_follow_up_response'],
    defaultSignalId: 'information_gaps',
    designQuestion: 'What information will be shared, when, in what format, and through which channels?',
    responsibilityQuestion: 'Who is responsible for making information clear, timely, accessible, and safe?',
    snapshotTag: 'Transparency and information reference',
    priority: 'core',
  },
  {
    id: 'accountability_response',
    title: 'Accountability and response',
    sourceLayer: 'HRBA principle / project accountability commitment',
    plainMeaning: 'People should know how to raise concerns safely and how responses will be made.',
    relatedReferences: ['HRBA accountability principle', 'Project accountability or feedback commitment', 'Service response or follow-up commitment'],
    useWhen: 'Unclear feedback channels, no response process, complaint risks, or weak follow-up.',
    protectsOrRequires: 'People should know how to raise concerns safely and how responses will be made.',
    designImplication: 'Build a safe feedback-and-response pathway into the design, not only a suggestion box or informal promise.',
    designQuestionPreview: 'How will feedback, concerns, and complaints be received, protected, answered, and used?',
    relatedSignalIds: ['weak_follow_up_response', 'information_gaps', 'service_improvement_uncertainty'],
    defaultSignalId: 'weak_follow_up_response',
    designQuestion: 'How will feedback, concerns, and complaints be received, protected, answered, and used?',
    responsibilityQuestion: 'Who receives feedback, who responds, and how will people know what changed?',
    snapshotTag: 'Accountability and response reference',
    priority: 'core',
  },
  {
    id: 'livelihood_service_commitment',
    title: 'Livelihood and service-improvement commitments',
    sourceLayer: 'Sector/service commitment / project commitment',
    plainMeaning: 'Activities should connect to real service improvement or practical livelihood benefit.',
    relatedReferences: ['Sector or service-improvement commitment', 'Livelihood or market-access commitment', 'Project commitment on practical benefit'],
    useWhen: 'Training-to-opportunity gaps, unclear service improvement pathways, or weak connection between activities and practical benefits.',
    protectsOrRequires: 'Activities should connect to practical improvements in access, quality, livelihood opportunity, or service response.',
    designImplication: 'Clarify the pathway from activity to practical outcome, including follow-up support, service linkages, and realistic access conditions.',
    designQuestionPreview: 'How will training, service support, market access, or service activities lead to practical benefit?',
    relatedSignalIds: ['unclear_livelihood_pathway', 'service_improvement_uncertainty'],
    defaultSignalId: 'unclear_livelihood_pathway',
    designQuestion: 'How will training, service support, market access, or service activities lead to practical benefit?',
    responsibilityQuestion: 'Which service actor, CSO actor, or livelihood actor must support the pathway from activity to benefit?',
    snapshotTag: 'Service and livelihood commitment reference',
    priority: 'supporting',
  },
];

const jiruAmbaSignalOptions: SignalOption[] = [
  {
    id: 'presence_without_influence',
    label: 'Decisions shaped before people influence them',
    plainDescription: 'Some people may be present after priorities are already shaped, so participation cannot meaningfully influence decisions.',
  },
  {
    id: 'different_barriers_across_groups',
    label: 'Different barriers across groups',
    plainDescription: 'Women, low-income households, remote kebele residents, informal workers, and other groups may face different barriers.',
  },
  {
    id: 'disability_access_barriers',
    label: 'Disability and accessibility barriers',
    plainDescription: 'Persons with disabilities may be invited but still face inaccessible meetings, materials, facilities, or feedback channels.',
  },
  {
    id: 'information_gaps',
    label: 'Information gaps',
    plainDescription: 'Some groups may not receive clear, timely, or accessible information.',
  },
  {
    id: 'weak_follow_up_response',
    label: 'Weak follow-up or response',
    plainDescription: 'Consultation or feedback may not show who responds, what changes, or how people know.',
  },
  {
    id: 'unclear_livelihood_pathway',
    label: 'Activities listed but practical benefit is unclear',
    plainDescription: 'Activities are listed, but the pathway from training, service support, or market access to practical benefit is unclear.',
  },
  {
    id: 'service_improvement_uncertainty',
    label: 'Service-improvement uncertainty',
    plainDescription: 'Water or service-improvement activities are listed, but it is unclear how decisions will reflect rights-holder priorities.',
  },
];

const corePolicyAnchorIds: PolicyAnchorId[] = [
  'meaningful_participation',
  'non_discrimination_equality',
  'disability_accessibility',
  'transparency_information',
  'accountability_response',
];

const defaultJiruAmbaSignalIds: JiruAmbaSignalId[] = [
  'presence_without_influence',
  'different_barriers_across_groups',
  'disability_access_barriers',
  'information_gaps',
  'weak_follow_up_response',
  'unclear_livelihood_pathway',
  'service_improvement_uncertainty',
];

const screen6ContextSignalIds: JiruAmbaSignalId[] = [
  'different_barriers_across_groups',
  'information_gaps',
  'disability_access_barriers',
  'weak_follow_up_response',
  'presence_without_influence',
  'unclear_livelihood_pathway',
];

const policySignalMatchLogic: Record<JiruAmbaSignalId, { strongest: PolicyAnchorId; acceptable: PolicyAnchorId[] }> = {
  different_barriers_across_groups: {
    strongest: 'non_discrimination_equality',
    acceptable: ['meaningful_participation', 'disability_accessibility'],
  },
  information_gaps: {
    strongest: 'transparency_information',
    acceptable: ['accountability_response', 'disability_accessibility'],
  },
  disability_access_barriers: {
    strongest: 'disability_accessibility',
    acceptable: ['non_discrimination_equality'],
  },
  weak_follow_up_response: {
    strongest: 'accountability_response',
    acceptable: ['transparency_information'],
  },
  presence_without_influence: {
    strongest: 'meaningful_participation',
    acceptable: ['accountability_response', 'transparency_information'],
  },
  unclear_livelihood_pathway: {
    strongest: 'livelihood_service_commitment',
    acceptable: ['accountability_response', 'transparency_information'],
  },
  service_improvement_uncertainty: {
    strongest: 'livelihood_service_commitment',
    acceptable: ['accountability_response', 'transparency_information'],
  },
};

const policyMapTemplateMarkdown = `# Policy and Standards Map Template

Use this template after your context and inequality scan. It helps your CSO connect context findings to rights, standards, policies, commitments, design questions, responsibility questions, and practical design implications.

This is a project design tool. It is not a legal complaint or formal legal opinion.

## Safety reminder

Do not enter real names, exact sensitive locations, complaint details, survivor stories, political accusations, or identifiable personal information.

## 1. Project issue

What project issue, service issue, advocacy issue, or community concern are you analyzing?

## 2. Context signal

What did your context scan reveal?

Examples:

- different barriers across groups;
- information gaps;
- disability or accessibility barriers;
- weak feedback or response;
- decisions shaped before people influence them;
- activities listed but practical benefit is unclear.

## 3. Reference source

Which reference applies?

Check one or more:

- HRBA principle;
- human rights standard;
- national policy;
- sector standard;
- local service commitment;
- project commitment;
- organizational accountability commitment;
- other: ______.

## 4. What does the reference help you ask?

Write the design question.

## 5. Who has a role or responsibility?

Write the responsibility question.

## 6. What should change in the design?

Write the design implication.

## 7. Safe evidence or source to check

What public document, project record, anonymized feedback, observation, or safe source can help verify this?

## 8. Carry-forward

Which later design tool should use this reference?

- rights-holder and barrier map;
- duty-bearer and actor responsibility map;
- power and influence analysis;
- root-cause and capacity-gap analysis;
- gender and disability design check;
- participation and accountability pathway;
- risk and do-no-harm board;
- intervention logic and indicators.
`;

const screen5SignalMap: Record<string, JiruAmbaSignalId[]> = {
  influence: ['presence_without_influence'],
  'women-barriers': ['different_barriers_across_groups', 'information_gaps'],
  'disability-access': ['disability_access_barriers'],
  'youth-pathway': ['unclear_livelihood_pathway'],
  'remote-information': ['different_barriers_across_groups', 'information_gaps'],
  'consulted-claim': ['presence_without_influence'],
  'final-meeting': ['presence_without_influence'],
  'feedback-boxes': ['weak_follow_up_response'],
  'ranking-gap': ['presence_without_influence', 'weak_follow_up_response'],
  'admin-plan': ['service_improvement_uncertainty'],
};

const policyMapSummary =
  'Based on the Jiru Amba case selections, the draft map links case-study signals to practical rights and policy references for participation, equality, accessibility, transparency, accountability, and service or livelihood benefit.';

function uniqueSignalIds(ids: JiruAmbaSignalId[]) {
  return Array.from(new Set(ids));
}

function getScreen5Signals(state: LearningState): JiruAmbaSignalId[] {
  const stored = state.practiceCheckState?.[practiceKey('M3-R05')];
  const selectedContextSignals = Array.isArray(stored?.selectedContextSignals)
    ? stored.selectedContextSignals as string[]
    : [];
  const mappedSignals = selectedContextSignals.flatMap((id) => screen5SignalMap[id] || []);

  if (mappedSignals.length > 0) {
    return uniqueSignalIds(mappedSignals);
  }

  return defaultJiruAmbaSignalIds;
}

function isPlausiblePolicyMatch(anchorId: PolicyAnchorId, signalId: JiruAmbaSignalId) {
  const logic = policySignalMatchLogic[signalId];
  return Boolean(
    logic && (logic.strongest === anchorId || logic.acceptable.includes(anchorId)),
  );
}

function getAnchorById(anchorId: PolicyAnchorId) {
  return policyAnchors.find((anchor) => anchor.id === anchorId);
}

function getSignalById(signalId: JiruAmbaSignalId) {
  return jiruAmbaSignalOptions.find((signal) => signal.id === signalId);
}

function generateStandardsMapRows(
  signalReferenceMatches: SignalReferenceMatch[],
): GeneratedStandardsMapRow[] {
  return signalReferenceMatches.flatMap((match) => {
    const anchorId = match.anchorId;
    const anchor = getAnchorById(anchorId);
    const signalId = match.signalId;
    const signal = signalId ? getSignalById(signalId) : null;

    if (!anchor || !signal) return [];

    return [{
      anchorId: anchor.id,
      anchorTitle: anchor.title,
      sourceLayer: anchor.sourceLayer,
      relatedReferences: anchor.relatedReferences,
      signalId: signal.id,
      signalLabel: signal.label,
      designQuestion: anchor.designQuestion,
      responsibilityQuestion: anchor.responsibilityQuestion,
      designImplication: anchor.designImplication,
      snapshotTag: anchor.snapshotTag,
    }];
  });
}

function calculatePolicyMapFeedback(
  selectedAnchorIds: PolicyAnchorId[],
  anchorSignalMatches: AnchorSignalMatch[],
  screen5SignalIds: JiruAmbaSignalId[],
) {
  const selectedCoreAnchorIds = selectedAnchorIds.filter((id) => corePolicyAnchorIds.includes(id));
  const missingCoreAnchorIds = corePolicyAnchorIds.filter((id) => !selectedAnchorIds.includes(id));
  const plausibleMatches = anchorSignalMatches.filter((match) =>
    isPlausiblePolicyMatch(match.anchorId, match.signalId),
  );
  const coverageScore = selectedAnchorIds.length / policyAnchors.length;
  const relevanceScore = selectedAnchorIds.length > 0 ? plausibleMatches.length / selectedAnchorIds.length : 0;
  const usefulnessScore =
    selectedAnchorIds.length > 0 && anchorSignalMatches.length === selectedAnchorIds.length ? 1 : 0;
  const warnings: string[] = [];

  if (!selectedAnchorIds.includes('meaningful_participation')) {
    warnings.push('Participation reference missing: the map does not yet test whether consultation changed the plan.');
  }

  if (!selectedAnchorIds.includes('non_discrimination_equality')) {
    warnings.push('Equality reference missing: the map does not yet test whether different groups face different barriers.');
  }

  if (screen5SignalIds.includes('disability_access_barriers') && !selectedAnchorIds.includes('disability_accessibility')) {
    warnings.push('Accessibility reference missing: disability inclusion may remain a mention rather than a design requirement.');
  }

  if (screen5SignalIds.includes('information_gaps') && !selectedAnchorIds.includes('transparency_information')) {
    warnings.push('Transparency reference missing: information access is not yet visible.');
  }

  if (!selectedAnchorIds.includes('accountability_response')) {
    warnings.push('Accountability reference missing: the map does not yet show who responds or how people know what changed.');
  }

  if (selectedAnchorIds.length === 1 && selectedAnchorIds.includes('livelihood_service_commitment')) {
    warnings.push('Service benefit matters, but HRBA also checks participation, equality, access, information, and accountability.');
  }

  const feedbackLevel: FeedbackLevel =
    selectedAnchorIds.length >= 5 &&
    selectedCoreAnchorIds.length >= 4 &&
    selectedAnchorIds.includes('meaningful_participation') &&
    selectedAnchorIds.includes('non_discrimination_equality') &&
    (selectedAnchorIds.includes('transparency_information') || selectedAnchorIds.includes('accountability_response')) &&
    relevanceScore >= 0.8 &&
    usefulnessScore === 1
      ? 'strong'
      : selectedAnchorIds.length >= 3 &&
          selectedAnchorIds.length <= 4 &&
          selectedCoreAnchorIds.length >= 2 &&
          relevanceScore >= 0.6 &&
          usefulnessScore === 1
        ? 'good_with_gap'
        : selectedAnchorIds.length >= 1 && usefulnessScore === 1
          ? 'partial'
          : 'surface';

  return {
    feedbackLevel,
    warnings,
    missingCoreAnchorIds,
    coverageScore,
    relevanceScore,
    usefulnessScore,
    selectedCoreAnchorIds,
    plausibleMatches,
  };
}

type RightsHolderGroupId =
  | 'women_traders'
  | 'women_rely_water_services'
  | 'youth_livelihood'
  | 'persons_with_disabilities'
  | 'low_income_households'
  | 'remote_kebele_residents'
  | 'informal_workers'
  | 'community_as_whole'
  | 'custom_group';

type BarrierTagId =
  | 'limited_influence'
  | 'information_barrier'
  | 'accessibility_accommodation'
  | 'timing_care_work'
  | 'distance_transport'
  | 'safety_comfort'
  | 'livelihood_market_risk'
  | 'feedback_response'
  | 'income_cost_barrier'
  | 'unclear_pathway_to_benefit';

type BarrierCategory =
  | 'voice_influence'
  | 'information'
  | 'accessibility'
  | 'timing_distance_cost'
  | 'safety'
  | 'livelihood_benefit'
  | 'feedback_response';

type Screen7FeedbackLevel = 'strong' | 'good_with_gap' | 'too_unfocused' | 'too_broad';

type RightsHolderGroup = {
  id: RightsHolderGroupId;
  label: string;
  affectedBenefit: string;
  caseClue: string;
  isSpecific: boolean;
  suggestedBarrierIds: BarrierTagId[];
  designEnablement: string;
  whatBarrierMayBlock: string;
  designResponse: string;
  screen8Question: string;
  isCustom?: boolean;
};

type BarrierTag = {
  id: BarrierTagId;
  label: string;
  category: BarrierCategory;
  plainMeaning: string;
  designRisk: string;
};

type GeneratedRightsHolderBarrierRow = {
  groupId: RightsHolderGroupId;
  groupLabel: string;
  affectedBenefit: string;
  barrierIds: BarrierTagId[];
  barrierLabels: string[];
  barrierCategories: BarrierCategory[];
  whatBarrierMayBlock: string;
  designResponse: string;
  screen8Question: string;
};

type Screen7OwnCsoOutput = {
  projectIdea: string;
  group: string;
  affectedBenefit: string;
  priorityBarrier: string;
  whatBarrierMayBlock: string;
  designResponse: string;
  actorQuestion: string;
};

type Screen7Submission = {
  screenId: 'M3-R07';
  submitted: true;
  selectedGroupIds: RightsHolderGroupId[];
  selectedSpecificGroupIds: RightsHolderGroupId[];
  customGroupLabel?: string;
  groupBarrierLinks: Array<{ groupId: RightsHolderGroupId; groupLabel: string; barrierIds: BarrierTagId[]; barrierLabels: string[] }>;
  selectedBarrierIds: BarrierTagId[];
  selectedSpecificGroupCount: number;
  barrierCategoryCount: number;
  feedbackLevel: Screen7FeedbackLevel;
  warnings: string[];
  overlapInsights: string[];
  generatedMapRows: GeneratedRightsHolderBarrierRow[];
  barrierPatternSummary: Array<{ groupLabel: string; barrierLabels: string[]; barrierCategories: BarrierCategory[] }>;
  rightsHolderBarrierSummary: string;
  ownCsoOutput?: Screen7OwnCsoOutput;
  safetyConfirmation: string;
  portfolioSummary: string;
  carryForward: {
    snapshotField: 'rightsHolderBarrierMap';
    issue: string;
    nextUse: string;
  };
};

const rightsHolderConceptChips = [
  'Who holds rights?',
  'Who may face barriers?',
  'What should the design enable?',
  'What should be checked before implementation?',
];

const rightsHolderGroups: RightsHolderGroup[] = [
  {
    id: 'women_traders',
    label: 'Women traders',
    affectedBenefit: 'Livelihood participation, access to information, and influence over market-related priorities.',
    caseClue: 'Women traders may have information, timing, care-work, safety, or influence barriers linked to market decisions and service priorities.',
    isSpecific: true,
    suggestedBarrierIds: [
      'limited_influence',
      'information_barrier',
      'timing_care_work',
    ],
    designEnablement:
      'The design should enable women traders to influence market-related decisions, access information, participate safely, and benefit from livelihood or market support.',
    whatBarrierMayBlock:
      'Women traders may be consulted after priorities are already shaped, may miss information because of work and care schedules, or may not see how market decisions affect their livelihood.',
    designResponse:
      'Share information earlier, use market-accessible communication channels, schedule consultation around livelihood realities, and show how women traders’ priorities changed the plan.',
    screen8Question:
      'Which planning, market, or service actor must respond to these barriers, and what role should Awra realistically play?',
  },
  {
    id: 'women_rely_water_services',
    label: 'Women',
    affectedBenefit: 'Access to water-related services, information, feedback, and response.',
    caseClue:
      'Women, in the context of household water responsibilities and water-service decisions, may face time, location, safety, information, or service-response barriers.',
    isSpecific: true,
    suggestedBarrierIds: ['information_barrier', 'feedback_response', 'timing_care_work'],
    designEnablement:
      'The design should enable Women, in the context of household water responsibilities and water-service decisions, to receive water-service information, use feedback channels, and see how concerns are answered.',
    whatBarrierMayBlock:
      'Women, in the context of household water responsibilities and water-service decisions, may not receive information early enough, may not have safe or practical ways to report service problems, or may not know whether feedback leads to action.',
    designResponse:
      'Use accessible and trusted information channels, clarify how service concerns are received and answered, and include follow-up arrangements linked to water service actors.',
    screen8Question:
      'Which water committee, sector office, or service actor must respond to water-service concerns, and what role should Awra play without replacing them?',
  },
  {
    id: 'youth_livelihood',
    label: 'Youth seeking livelihood opportunities',
    affectedBenefit: 'Livelihood opportunity, training relevance, market access, and follow-up support.',
    caseClue: 'Youth activities may be listed, but the pathway from training to practical opportunity may be unclear.',
    isSpecific: true,
    suggestedBarrierIds: ['livelihood_market_risk', 'unclear_pathway_to_benefit', 'limited_influence', 'information_barrier'],
    designEnablement:
      'The design should enable youth to see a clear pathway from training or participation to practical livelihood opportunity.',
    whatBarrierMayBlock:
      'Youth may complete training without access to practical opportunities, market linkages, follow-up support, or influence over which livelihood options are prioritized.',
    designResponse:
      'Clarify the pathway from training to opportunity, include follow-up support, link training to realistic market conditions, and involve youth before livelihood priorities are finalized.',
    screen8Question:
      'Which livelihood actor, market actor, training provider, or public office must support the pathway from activity to practical benefit?',
  },
  {
    id: 'persons_with_disabilities',
    label: 'Persons with disabilities',
    affectedBenefit: 'Accessible participation, accessible services, information, feedback, and reasonable accommodation.',
    caseClue: 'Persons with disabilities may be invited but still face inaccessible venues, information formats, service points, or feedback channels.',
    isSpecific: true,
    suggestedBarrierIds: [
      'accessibility_accommodation',
      'information_barrier',
      'feedback_response',
    ],
    designEnablement:
      'The design should enable persons with disabilities to participate through accessible venues, materials, communication, transport, and feedback channels.',
    whatBarrierMayBlock:
      'Persons with disabilities may be named in the project but still unable to access meetings, materials, service points, information, or feedback channels.',
    designResponse:
      'Include accessibility checks, accessible information formats, reasonable accommodation, accessible feedback channels, and disability-sensitive follow-up.',
    screen8Question:
      'Who budgets, provides, and monitors accessibility measures, and what role should Awra play in supporting this?',
  },
  {
    id: 'low_income_households',
    label: 'Low-income households',
    affectedBenefit: 'Affordable access to services, participation, transport, information, and follow-up.',
    caseClue: 'Low-income households may face cost, distance, transport, livelihood, or information barriers.',
    isSpecific: true,
    suggestedBarrierIds: [
      'income_cost_barrier',
      'distance_transport',
      'information_barrier',
    ],
    designEnablement:
      'The design should enable low-income households to participate and benefit without unrealistic cost, time, transport, or income burdens.',
    whatBarrierMayBlock:
      'Low-income households may be unable to participate, travel, pay related costs, access services, or follow up on decisions.',
    designResponse:
      'Reduce cost-related barriers, adjust location and timing, use low-cost communication channels, and consider transport or decentralized access options.',
    screen8Question:
      'Which service actor, planning office, or project actor can reduce cost, transport, or access barriers?',
  },
  {
    id: 'remote_kebele_residents',
    label: 'Communities in remote kebeles',
    affectedBenefit: 'Equal access to information, participation, service improvement, and follow-up.',
    caseClue: 'Remote kebele residents may receive information late or be represented after decisions are already shaped.',
    isSpecific: true,
    suggestedBarrierIds: [
      'distance_transport',
      'information_barrier',
      'feedback_response',
    ],
    designEnablement:
      'The design should enable communities in remote kebeles to receive information, participate, access services, and receive follow-up despite distance and transport barriers.',
    whatBarrierMayBlock:
      'Remote kebele residents may receive information late, participate indirectly, or have weak follow-up when decisions are made at central locations.',
    designResponse:
      'Decentralize information-sharing, use trusted local communication channels, plan outreach before decisions are finalized, and clarify feedback and response pathways.',
    screen8Question:
      'Which kebele, woreda, service, or CSO actor must ensure remote communities are reached before priorities are finalized?',
  },
  {
    id: 'informal_workers',
    label: 'Informal workers',
    affectedBenefit: 'Livelihood recognition, access to information, market/service decisions, and safe participation.',
    caseClue: 'Informal workers may be affected by market or service decisions but remain outside formal consultation channels.',
    isSpecific: true,
    suggestedBarrierIds: [
      'livelihood_market_risk',
      'information_barrier',
      'safety_comfort',
    ],
    designEnablement:
      'The design should enable informal workers to participate without losing livelihood time and to influence decisions that affect practical benefit.',
    whatBarrierMayBlock:
      'Informal workers may not be recognized in formal planning processes, may miss information, or may avoid participation if they fear loss of income, stigma, or consequences.',
    designResponse:
      'Use flexible consultation methods, protect participation from livelihood harm, include informal workers in market/service analysis, and avoid channels that expose them to risk.',
    screen8Question:
      'Which market, service, planning, or CSO actor can recognize and respond to informal workers’ concerns safely?',
  },
  {
    id: 'community_as_whole',
    label: 'The community as a whole',
    affectedBenefit: 'Too broad to identify a specific affected right, service, benefit, decision, or follow-up.',
    caseClue: 'This broad label can orient the issue, but it is not enough for a rights-holder and barrier map.',
    isSpecific: false,
    suggestedBarrierIds: [],
    designEnablement: 'Use this only as a broad orientation label. The map becomes useful when specific groups are added.',
    whatBarrierMayBlock: 'Broad labels can hide who is excluded, who has influence, and who needs design changes.',
    designResponse: 'Replace the broad label with specific rights-holder groups before generating the map.',
    screen8Question: 'Which specific group and barrier should be carried into actor mapping?',
  },
  {
    id: 'custom_group',
    label: 'Another generalized group',
    affectedBenefit: 'To be clarified safely through further analysis.',
    caseClue: 'Use a generalized group label only. Do not enter real names, complaint details, exact sensitive locations, or identifiable personal information.',
    isSpecific: true,
    isCustom: true,
    suggestedBarrierIds: [],
    designEnablement:
      'The design should examine what this generalized group needs in order to participate, access information, benefit, and receive follow-up safely.',
    whatBarrierMayBlock: 'The selected barrier may block access, participation, influence, safety, benefit, or response.',
    designResponse: 'Clarify the design response through safe, generalized analysis before using this in project work.',
    screen8Question: 'Who should be explored in the next actor and responsibility map?',
  },
];

const barrierTags: BarrierTag[] = [
  {
    id: 'limited_influence',
    label: 'Limited influence',
    category: 'voice_influence',
    plainMeaning: 'People may attend but not shape priorities, budgets, or decisions.',
    designRisk: 'Participation becomes symbolic if people are present but cannot influence what changes.',
  },
  {
    id: 'information_barrier',
    label: 'Information barrier',
    category: 'information',
    plainMeaning: 'People may not receive clear, timely, accessible, or trusted information.',
    designRisk: 'People cannot participate meaningfully or follow up if information comes late or is hard to use.',
  },
  {
    id: 'accessibility_accommodation',
    label: 'Accessibility or accommodation barrier',
    category: 'accessibility',
    plainMeaning: 'Meetings, materials, venues, transport, services, or feedback channels may not be accessible.',
    designRisk: 'Persons with disabilities or others with access needs may be named but still excluded.',
  },
  {
    id: 'timing_care_work',
    label: 'Timing or care-work barrier',
    category: 'timing_distance_cost',
    plainMeaning: 'Meeting times or activity schedules may exclude people with work, care, or livelihood responsibilities.',
    designRisk: 'The project may hear from those who are available, not those most affected.',
  },
  {
    id: 'distance_transport',
    label: 'Distance or transport barrier',
    category: 'timing_distance_cost',
    plainMeaning: 'Location, distance, cost, road conditions, or transport availability may limit participation and follow-up.',
    designRisk: 'Remote or low-income groups may be counted late or represented indirectly.',
  },
  {
    id: 'safety_comfort',
    label: 'Safety, trust, or social-risk barrier',
    category: 'safety',
    plainMeaning: 'People may not feel safe or comfortable speaking freely because of stigma, backlash, social pressure, or low trust.',
    designRisk: 'Sensitive concerns may remain hidden, especially where feedback channels are not trusted.',
  },
  {
    id: 'livelihood_market_risk',
    label: 'Livelihood or market-risk barrier',
    category: 'livelihood_benefit',
    plainMeaning: 'People may join activities but lose income, miss market opportunities, or receive support that does not connect to real livelihood pathways.',
    designRisk: 'Activities may be completed without creating practical benefit.',
  },
  {
    id: 'feedback_response',
    label: 'Feedback or response barrier',
    category: 'feedback_response',
    plainMeaning: 'People may give feedback without knowing who responds or what changes.',
    designRisk: 'Feedback becomes extractive if the project collects concerns but does not respond or explain decisions.',
  },
  {
    id: 'income_cost_barrier',
    label: 'Income or cost barrier',
    category: 'timing_distance_cost',
    plainMeaning: 'Cost, transport, service fees, materials, time away from work, or unpaid participation may prevent access.',
    designRisk: 'The project may unintentionally favor people who can afford to participate.',
  },
  {
    id: 'unclear_pathway_to_benefit',
    label: 'Unclear pathway to benefit',
    category: 'livelihood_benefit',
    plainMeaning: 'Activities may be listed, but the design does not show how people will access real services, livelihood opportunities, influence, or follow-up.',
    designRisk: 'The project may deliver activities without changing access, accountability, or rights enjoyment.',
  },
];

const barrierCategoryLabels: Record<BarrierCategory, string> = {
  voice_influence: 'Voice / influence',
  information: 'Information',
  accessibility: 'Accessibility',
  timing_distance_cost: 'Timing / distance / cost',
  safety: 'Safety',
  livelihood_benefit: 'Livelihood benefit',
  feedback_response: 'Feedback / response',
};

const barrierCategoryOrder: BarrierCategory[] = [
  'voice_influence',
  'information',
  'accessibility',
  'timing_distance_cost',
  'safety',
  'livelihood_benefit',
  'feedback_response',
];

const emptyBarrierMap: Record<RightsHolderGroupId, BarrierTagId[]> = {
  women_traders: [],
  women_rely_water_services: [],
  youth_livelihood: [],
  persons_with_disabilities: [],
  low_income_households: [],
  remote_kebele_residents: [],
  informal_workers: [],
  community_as_whole: [],
  custom_group: [],
};

const rightsHolderBarrierSummary =
  'Based on the Jiru Amba case selections, the draft map identifies specific rights-holder groups, priority barriers, what those barriers may block, design responses, and questions to carry into responsibility mapping.';

const rightsHolderCarryForward = {
  snapshotField: 'rightsHolderBarrierMap' as const,
  issue:
    'The plan should not treat “the community” as one group. It should identify specific rights-holder groups, the barriers they face, and what the design should change before activities are finalized.',
  nextUse: 'Use this map in the next screen to identify duty-bearers, supporting actors, and realistic CSO roles.',
};

const rightsHolderPortfolioSummary =
  'You completed a Rights-Holder and Barrier Map. You moved beyond broad labels and identified specific rights-holder groups, the barriers they may face, what those barriers may block, and what the design should change. You will use this map next to identify duty-bearers, supporting actors, and realistic CSO roles.';

const rightsHolderBarrierTemplateMarkdown = `# Rights-Holder and Barrier Map Template

Use this template after your context and inequality scan and policy/standards map. It helps your CSO move beyond broad target-group labels and identify specific rights-holder groups, the barriers they face, what the design should change, and what actor/responsibility questions should be explored next.

## Safety reminder

Do not enter real names, exact sensitive locations, complaint details, survivor stories, political accusations, or identifiable personal information.

## 1. Project issue or idea

What project issue, service issue, advocacy issue, or community concern are you analyzing?

## 2. Specific rights-holder group

Which group may experience the issue differently?

Avoid broad labels such as "the community" or "beneficiaries." Be specific but safe.

Examples:

- women traders;
- Women, in the context of household water responsibilities and water-service decisions;
- low-income households;
- remote kebele residents;
- youth seeking livelihood opportunities;
- informal workers;
- persons with disabilities;
- caregivers;
- people with limited literacy.

## 3. Affected right, service, or project benefit

What access, service, decision, benefit, or follow-up is affected?

## 4. Priority barrier

What barrier may block access, participation, influence, safety, benefit, or response?

Check one or more:

- limited influence;
- information barrier;
- accessibility or accommodation barrier;
- timing or care-work barrier;
- distance or transport barrier;
- safety, trust, or social-risk barrier;
- livelihood or market-risk barrier;
- feedback or response barrier;
- income or cost barrier;
- unclear pathway to benefit;
- other: ______.

## 5. What the barrier may block

What might not happen if this barrier is ignored?

## 6. Design response

What should change in the project design?

## 7. Actor/responsibility question for the next step

Who should be explored in the next actor and responsibility map?

Examples:

- woreda planning office;
- kebele structure;
- sector office;
- service committee;
- market committee;
- water committee;
- health post staff;
- CSO facilitator;
- community representative;
- training provider;
- livelihood actor.

## 8. Carry-forward note

Which later design tool should use this map?

- duty-bearer and actor responsibility map;
- power and influence analysis;
- root-cause and capacity-gap analysis;
- gender and disability design check;
- participation and accountability pathway;
- risk and do-no-harm board;
- intervention logic and indicators.
`;

function validateSafeLearningText(value: string) {
  const trimmed = value.trim();
  const unsafePattern =
    /(\b\d{5,}\b)|(\b(complaint|survivor|accused|accusation|corrupt|abusive|attacked|political|party|named official|exact location|village|kebele\s+\w+)\b)|[@#<>[\]{}\\/]/i;
  const looksLikeName = /^[A-Z][a-z]+ [A-Z][a-z]+/.test(trimmed);
  return unsafePattern.test(trimmed) || looksLikeName;
}

function buildRightsHolderBarrierTemplateHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Rights-Holder and Barrier Map Template</title></head><body>${rightsHolderBarrierTemplateMarkdown
    .split('\n')
    .map((line) => {
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('- ')) return `<p>${line}</p>`;
      if (!line.trim()) return '<p></p>';
      return `<p>${line}</p>`;
    })
    .join('')}</body></html>`;
}

function getRightsHolderGroupById(groupId: RightsHolderGroupId) {
  return rightsHolderGroups.find((group) => group.id === groupId);
}

function getBarrierById(barrierId: BarrierTagId) {
  return barrierTags.find((barrier) => barrier.id === barrierId);
}

function validateCustomGroupLabel(value: string) {
  const trimmed = value.trim();
  const blockedCharacters = ['@', '#', '/', '\\', '<', '>', '{', '}', '[', ']'];
  const unsafePattern =
    /(\b\d{5,}\b)|(\b(complaint|survivor|accused|accusation|corrupt|abusive|attacked|political|party|named|official|village|kebele\s+\w+)\b)/i;
  const looksLikeName = /^[A-Z][a-z]+ [A-Z][a-z]+/.test(trimmed);
  const invalid =
    trimmed.length < 3 ||
    trimmed.length > 50 ||
    /[\r\n]/.test(trimmed) ||
    blockedCharacters.some((character) => trimmed.includes(character)) ||
    trimmed.split(/\s+/).filter(Boolean).length > 8 ||
    unsafePattern.test(trimmed) ||
    looksLikeName;

  return {
    trimmed,
    isValid: !invalid,
    error: invalid
      ? 'Use a generalized group label only. Do not enter real names, complaint details, exact sensitive locations, or identifiable personal information.'
      : '',
  };
}

function orderedRightsHolderGroupIds(groupIds: RightsHolderGroupId[]) {
  return rightsHolderGroups.map((group) => group.id).filter((groupId) => groupIds.includes(groupId));
}

function getSpecificGroupIds(groupIds: RightsHolderGroupId[], customGroupValid: boolean) {
  return orderedRightsHolderGroupIds(groupIds).filter((groupId) => {
    const group = getRightsHolderGroupById(groupId);
    if (!group?.isSpecific) return false;
    if (group.id === 'custom_group') return customGroupValid;
    return true;
  });
}

function getRightsHolderDisplayLabel(groupId: RightsHolderGroupId, customGroupLabel: string) {
  if (groupId === 'custom_group') {
    const validation = validateCustomGroupLabel(customGroupLabel);
    return validation.isValid ? validation.trimmed : 'Another generalized group';
  }

  return getRightsHolderGroupById(groupId)?.label || groupId;
}

function getGroupBarrierIds(
  groupBarrierLinks: Record<RightsHolderGroupId, BarrierTagId[]>,
  groupId: RightsHolderGroupId,
) {
  return barrierTags.map((barrier) => barrier.id).filter((barrierId) => groupBarrierLinks[groupId].includes(barrierId));
}

function getPreviewStatus(barrierIds: BarrierTagId[]) {
  const barrierLabels = barrierIds.flatMap((barrierId) => {
    const barrier = getBarrierById(barrierId);
    return barrier ? [barrier.label] : [];
  });

  if (barrierIds.length === 0) return 'No barriers added yet';
  if (barrierIds.length === 1) return '1 barrier added';
  if (barrierIds.length <= 3) return `Ready · ${barrierLabels.join(', ')}`;
  if (barrierIds.length <= 7) return 'Too many selected. Prioritize one or two barriers.';
  return 'Too broad — focus priority barriers';
}

function getActiveGroupStatus(barrierCount: number, isBroad = false) {
  if (isBroad) return 'Too broad';
  if (barrierCount === 0) return 'Needs at least 1 barrier';
  if (barrierCount <= 3) return 'Ready';
  if (barrierCount <= 7) return 'Prioritize';
  return 'Too broad';
}

function generateRightsHolderBarrierRows(
  selectedSpecificGroupIds: RightsHolderGroupId[],
  groupBarrierLinks: Record<RightsHolderGroupId, BarrierTagId[]>,
  customGroupLabel: string,
): GeneratedRightsHolderBarrierRow[] {
  return selectedSpecificGroupIds.flatMap((groupId) => {
    const group = getRightsHolderGroupById(groupId);
    if (!group) return [];

    const barrierIds = getGroupBarrierIds(groupBarrierLinks, groupId);
    const groupLabel = getRightsHolderDisplayLabel(groupId, customGroupLabel);
    const barrierLabels = barrierIds.flatMap((barrierId) => {
      const barrier = getBarrierById(barrierId);
      return barrier ? [barrier.label] : [];
    });
    const barrierCategories = Array.from(new Set(barrierIds.flatMap((barrierId) => {
      const barrier = getBarrierById(barrierId);
      return barrier ? [barrier.category] : [];
    })));

    return [{
      groupId,
      groupLabel,
      affectedBenefit: group.id === 'custom_group' ? 'To be clarified safely through further analysis.' : group.affectedBenefit,
      barrierIds,
      barrierLabels,
      barrierCategories,
      whatBarrierMayBlock: group.whatBarrierMayBlock,
      designResponse: group.designResponse,
      screen8Question: group.screen8Question,
    }];
  });
}

function deriveRightsHolderFeedback(
  selectedGroupIds: RightsHolderGroupId[],
  selectedSpecificGroupIds: RightsHolderGroupId[],
  groupBarrierLinks: Record<RightsHolderGroupId, BarrierTagId[]>,
) {
  const selectedBarrierIds = Array.from(new Set(selectedSpecificGroupIds.flatMap((groupId) => getGroupBarrierIds(groupBarrierLinks, groupId))));
  const selectedBarrierCategories = Array.from(new Set(selectedBarrierIds.flatMap((barrierId) => {
    const barrier = getBarrierById(barrierId);
    return barrier ? [barrier.category] : [];
  })));
  const selectedSpecificGroupCount = selectedSpecificGroupIds.length;
  const allSelectedSpecificGroupsHaveBarrier = selectedSpecificGroupIds.every(
    (groupId) => getGroupBarrierIds(groupBarrierLinks, groupId).length > 0,
  );
  const totalBarrierLinks = selectedSpecificGroupIds.reduce(
    (sum, groupId) => sum + getGroupBarrierIds(groupBarrierLinks, groupId).length,
    0,
  );
  const averageBarriersPerGroup =
    selectedSpecificGroupCount > 0 ? totalBarrierLinks / selectedSpecificGroupCount : 0;
  const groupsWithFourOrMoreBarriers = selectedSpecificGroupIds.filter(
    (groupId) => getGroupBarrierIds(groupBarrierLinks, groupId).length > 3,
  ).length;
  const groupsWithEightOrMoreBarriers = selectedSpecificGroupIds.filter(
    (groupId) => getGroupBarrierIds(groupBarrierLinks, groupId).length >= 8,
  ).length;
  const tooUnfocused =
    groupsWithEightOrMoreBarriers > 0 ||
    averageBarriersPerGroup > 3 ||
    groupsWithFourOrMoreBarriers > 0;
  const tooManyBarriersSelected = tooUnfocused;
  const hasInfluence = selectedBarrierIds.includes('limited_influence');
  const hasInformation = selectedBarrierIds.includes('information_barrier');
  const hasFeedback = selectedBarrierIds.includes('feedback_response');
  const personsWithDisabilitiesSelected = selectedSpecificGroupIds.includes('persons_with_disabilities');
  const personsWithDisabilitiesHasAccessibility =
    getGroupBarrierIds(groupBarrierLinks, 'persons_with_disabilities').includes('accessibility_accommodation');
  const feedbackLevel: Screen7FeedbackLevel =
    tooManyBarriersSelected
      ? 'too_unfocused'
      : selectedSpecificGroupCount >= 3 &&
          allSelectedSpecificGroupsHaveBarrier &&
          selectedBarrierCategories.length >= 4 &&
          (hasInfluence || hasInformation || hasFeedback) &&
          (!personsWithDisabilitiesSelected || personsWithDisabilitiesHasAccessibility)
        ? 'strong'
        : selectedSpecificGroupCount >= 2 && allSelectedSpecificGroupsHaveBarrier
          ? 'good_with_gap'
          : 'too_broad';
  const warnings: string[] = [];
  const communitySelected = selectedGroupIds.includes('community_as_whole');
  const customSelected = selectedGroupIds.includes('custom_group');
  const womenGroupIds: RightsHolderGroupId[] = ['women_traders', 'women_rely_water_services'];
  const selectedWomenGroupIds = womenGroupIds.filter((groupId) => selectedSpecificGroupIds.includes(groupId));
  const womenBarrierIds: BarrierTagId[] = [
    'timing_care_work',
    'safety_comfort',
    'limited_influence',
    'livelihood_market_risk',
    'information_barrier',
  ];
  const womenBarriersVisible = selectedWomenGroupIds.some((groupId) =>
    getGroupBarrierIds(groupBarrierLinks, groupId).some((barrierId) => womenBarrierIds.includes(barrierId)),
  );

  if (tooUnfocused) {
    warnings.push('Try to prioritize. Choose the one or two barriers most likely to change the design for this group.');
  }

  if (communitySelected && selectedSpecificGroupCount === 0) {
    warnings.push('“The community” is useful for orientation, but not enough for HRBA design. Add specific groups who may face different barriers.');
  }

  if (communitySelected && selectedSpecificGroupCount > 0) {
    warnings.push('“The community” can remain as a broad label, but the specific groups are what make the HRBA map useful.');
  }

  if (personsWithDisabilitiesSelected && !personsWithDisabilitiesHasAccessibility) {
    warnings.push('Persons with disabilities are selected, but accessibility is not mapped. Check venue, communication, transport, materials, and feedback channels.');
  }

  if (selectedWomenGroupIds.length > 0 && !womenBarriersVisible) {
    warnings.push('Women are visible, but gendered barriers are not yet clear. Check timing, care work, safety, influence, information, and livelihood effects.');
  }

  if (
    selectedSpecificGroupIds.includes('youth_livelihood') &&
    !getGroupBarrierIds(groupBarrierLinks, 'youth_livelihood').some((barrierId) =>
      ['livelihood_market_risk', 'unclear_pathway_to_benefit'].includes(barrierId),
    )
  ) {
    warnings.push('Youth are selected, but the livelihood pathway is not yet clear. Check how activities connect to practical opportunity.');
  }

  if (
    selectedSpecificGroupIds.includes('low_income_households') &&
    !getGroupBarrierIds(groupBarrierLinks, 'low_income_households').some((barrierId) =>
      ['income_cost_barrier', 'distance_transport'].includes(barrierId),
    )
  ) {
    warnings.push('Low-income households are selected, but cost, time, or transport barriers are not yet visible.');
  }

  if (
    selectedSpecificGroupIds.includes('remote_kebele_residents') &&
    !getGroupBarrierIds(groupBarrierLinks, 'remote_kebele_residents').some((barrierId) =>
      ['distance_transport', 'information_barrier'].includes(barrierId),
    )
  ) {
    warnings.push('Communities in remote kebeles are selected, but distance or information barriers are not yet visible.');
  }

  if (!selectedBarrierIds.includes('information_barrier')) {
    warnings.push('Information barriers are not visible. Check whether all groups receive clear, timely, and accessible information.');
  }

  if (!selectedBarrierIds.includes('feedback_response')) {
    warnings.push('Feedback and response are not visible. Check whether groups know who responds and how decisions change.');
  }

  if (customSelected) {
    warnings.push('Custom group labels must stay general. Do not include names, complaints, exact locations, or identifying details.');
  }

  const overlapInsights = selectedSpecificGroupIds.flatMap((groupId) => {
    const barrierCount = getGroupBarrierIds(groupBarrierLinks, groupId).length;
    return barrierCount >= 2 ? [groupId] : [];
  });

  return {
    selectedBarrierIds,
    selectedBarrierCategories,
    selectedSpecificGroupCount,
    barrierCategoryCount: selectedBarrierCategories.length,
    allSelectedSpecificGroupsHaveBarrier,
    tooManyBarriersSelected,
    feedbackLevel,
    warnings,
    overlapInsights,
  };
}

type ActorCategory =
  | 'primary_public_responsibility'
  | 'service_or_local_implementation'
  | 'community_influence_actor'
  | 'participation_actor'
  | 'rights_holder_voice_support'
  | 'support_ally_actor'
  | 'careful_engagement_actor'
  | 'cso_role'
  | 'rights_holder_group'
  | 'generalized_custom_actor';

type Screen8BarrierId =
  | 'limited_influence'
  | 'information_barrier'
  | 'accessibility_barrier'
  | 'timing_care_work_barrier'
  | 'distance_transport_barrier'
  | 'safety_comfort_barrier'
  | 'livelihood_market_risk'
  | 'feedback_response_gap'
  | 'income_related_barrier'
  | 'unclear_pathway_to_benefit';

type CapacityGapHintId =
  | 'mandate_unclear'
  | 'limited_budget_resources'
  | 'weak_coordination'
  | 'limited_accessibility_capacity'
  | 'weak_feedback_system'
  | 'limited_information_flow'
  | 'low_rights_holder_voice'
  | 'limited_technical_skill'
  | 'low_trust_weak_dialogue'
  | 'safety_sensitivity_concern';

type Screen8FeedbackLevel = 'strong' | 'good_with_gap' | 'cso_overload' | 'missing_responsibility' | 'too_broad';
type Screen9FeedbackLevel =
  | 'strong'
  | 'good_with_gap'
  | 'voice_gap'
  | 'responsibility_gap'
  | 'power_concentration'
  | 'too_broad'
  | 'unsafe_label';

type Module3Actor = {
  actorId: string;
  label: string;
  category: ActorCategory;
  sourceScreen: 'screen7' | 'screen8' | 'screen9_default' | 'custom';
  linkedBarrierIds: string[];
  responsibilityActionIds?: string[];
  capacityGapHintIds?: CapacityGapHintId[];
  safeCustom?: boolean;
};

type Screen8BarrierOption = {
  id: Screen8BarrierId;
  label: string;
  description: string;
  sourceGroupLabels?: string[];
};

type Screen8ActorOption = {
  id: string;
  label: string;
  category: ActorCategory;
  useFor?: string;
  safeNote?: string;
};

type Screen8BarrierMapping = {
  publicActorIds: string[];
  serviceActorIds: string[];
  communityActorIds: string[];
  participationActorIds: string[];
  voiceActorIds: string[];
  supportActorIds: string[];
  carefulActorIds: string[];
  csoRoleIds: string[];
  actionIdsByActor: Record<string, string[]>;
  capacityGapHintIds: CapacityGapHintId[];
};

type Screen8BarrierActorLink = {
  barrierId: string;
  barrierLabel: string;
  actorSelections: {
    actorId: string;
    actorLabel: string;
    category: ActorCategory;
    actionIds: string[];
  }[];
  capacityGapHintIds: CapacityGapHintId[];
};

type Screen8GeneratedRow = {
  barrierId: string;
  barrierLabel: string;
  rightsHolderGroupAffected: string;
  primaryPublicResponsibility: string[];
  serviceOrSectorActors: string[];
  communityOrInfluenceActors: string[];
  csoRoles: string[];
  supportOrAllyActors: string[];
  capacityGapHints: CapacityGapHintId[];
  safeEngagementQuestion: string;
  nextQuestion: string;
};

type Screen8OwnCsoOutput = {
  projectIssueOrBarrier: string;
  rightsHolderGroupAffected: string;
  primaryDutyBearer: string;
  serviceOrSectorActor: string;
  communityOrInfluenceActor: string;
  realisticCsoRole: string;
  capacityGap: string;
  safeEngagementQuestion: string;
};

type Screen8Submission = {
  screenId: 'M3-R08';
  submitted: true;
  mappedBarrierIds: string[];
  barrierActorLinks: Screen8BarrierActorLink[];
  generatedResponsibilityRows: Screen8GeneratedRow[];
  hasPublicResponsibility: boolean;
  hasRightsHolderVoice: boolean;
  hasCsoRole: boolean;
  hasCapacityGapHint: boolean;
  overloadWarning: boolean;
  missingResponsibilityWarning: boolean;
  feedbackLevel: Screen8FeedbackLevel;
  warnings: string[];
  responsibilitySummary: string;
  dutyBearerActorResponsibilityMap: {
    selectedBarriers: string[];
    selectedActorCategories: ActorCategory[];
    generatedRows: Screen8GeneratedRow[];
    safeEngagementQuestions: string[];
    nextQuestionsForScreen9: string[];
  };
  exportedActorsForScreen9: Module3Actor[];
  ownCsoOutput?: Screen8OwnCsoOutput;
  safetyConfirmation: string;
  portfolioSummary: string;
  optionalReflection?: string;
  carryForward: {
    snapshotField: 'dutyBearerActorResponsibilityMap';
    issue: string;
    nextUse: string;
  };
};

type Screen9InfluenceLevel = 'low' | 'medium' | 'high';
type Screen9SupportLevel = 'low' | 'uncertain' | 'high';
type LikelyChangeRole =
  | 'enabler'
  | 'blocker'
  | 'gatekeeper'
  | 'ally'
  | 'undecided_actor'
  | 'low_power_rights_holder_group'
  | 'responsible_actor_needing_engagement'
  | 'support_actor';
type Screen9EngagementApproach =
  | 'work_closely'
  | 'engage_carefully'
  | 'strengthen_voice_safely'
  | 'keep_informed'
  | 'monitor_lightly'
  | 'build_interest'
  | 'reduce_risk_before_engagement'
  | 'support_capacity';

type Screen9ActorRating = {
  actorId: string;
  actorLabel: string;
  category: ActorCategory;
  roleFromResponsibilityMap: string;
  influenceLevel: Screen9InfluenceLevel | '';
  supportInterestLevel: Screen9SupportLevel | '';
  likelyChangeRole: LikelyChangeRole | '';
  engagementApproach: Screen9EngagementApproach | '';
  designImplication: string;
  questionForScreen10: string;
};

type Screen9PowerMapZone = {
  zoneId:
    | 'work_closely'
    | 'engage_carefully'
    | 'strengthen_voice'
    | 'monitor_lightly';
  zoneLabel: string;
  actorIds: string[];
};

type Screen9OwnCsoDraft = {
  projectIssueOrBarrier: string;
  actorOrRoleCategory: string;
  formalResponsibility: string;
  practicalInfluence: Screen9InfluenceLevel | '';
  supportOrInterest: Screen9SupportLevel | '';
  likelyRole: LikelyChangeRole | '';
  safeEngagementApproach: Screen9EngagementApproach | '';
  designImplication: string;
  rootCauseQuestion: string;
  safetyNote: string;
};

type Screen9OwnCsoOutput = Screen9OwnCsoDraft & {
  generatedAt: string;
};

type ProblemLayerId = 'visible' | 'direct' | 'root' | 'capacity';
type Screen10FeedbackState =
  | 'strong'
  | 'capacity_missing'
  | 'visible_heavy'
  | 'root_heavy'
  | 'activity_jump'
  | 'unsafe_wording'
  | 'needs_refinement';

type Screen10Statement = {
  id: string;
  shortLabel: string;
  statement: string;
  suggestedLayer: ProblemLayerId;
  rationale: string;
};

type Screen10OwnCsoDraft = {
  projectIssueOrBarrier: string;
  visibleSign: string;
  directCause: string;
  deeperRootCause: string;
  capacityGap: string;
  actorWhoseCapacityMatters: string;
  designImplication: string;
  questionForDesignRepair: string;
};

type Screen10OwnCsoOutput = Screen10OwnCsoDraft & {
  generatedAt: string;
};

type Screen10Submission = {
  screenId: 'M3-R10';
  completed: true;
  submittedAt: string;
  problemLayerSelections: Array<{
    statementId: string;
    statement: string;
    selectedLayer: ProblemLayerId;
    suggestedLayer: ProblemLayerId;
    aligned: boolean;
  }>;
  problemLayers: {
    visibleSigns: string[];
    directCauses: string[];
    deeperRootCauses: string[];
    capacityGaps: string[];
  };
  generatedProblemLayersCanvas: Array<{
    problemPattern: string;
    visibleSign: string;
    directCause: string;
    deeperRootCause: string;
    capacityGap: string;
    designImplication: string;
    questionForLaterDesignRepair: string;
  }>;
  rootCauseCapacityGapMap: {
    learnerClassifications: Screen10Submission['problemLayerSelections'];
    visibleSigns: string[];
    directCauses: string[];
    deeperRootCauses: string[];
    capacityGaps: string[];
    generatedProblemLayersCanvas: Screen10Submission['generatedProblemLayersCanvas'];
    designImplications: string[];
    questionsForLaterDesignRepair: string[];
    diagnosisInterpretation: string;
    safetyConfirmation: string;
  };
  alignedCount: number;
  feedbackState: Screen10FeedbackState;
  diagnosisInterpretation: string;
  rootCauseSummary: string;
  ownCsoPracticeOutput?: Screen10OwnCsoOutput;
  portfolioSummary: string;
  carryForward: {
    snapshotField: 'rootCauseCapacityGapMap';
    issue: string;
    nextUse: string;
  };
};

type InclusionStatus = 'missing' | 'mentioned' | 'built';
type M3Screen11SignalId =
  | 'meetingInvitation'
  | 'meetingTimeVenue'
  | 'womensInfluence'
  | 'disabilityAccessibility'
  | 'feedbackChannels'
  | 'indicatorsFollowUp';
type M3Screen11RepairId =
  | 'checkParticipationBarriers'
  | 'strengthenWomensInfluence'
  | 'improveAccessibilityAccommodation'
  | 'safePreConsultation'
  | 'strengthenFeedbackChannels'
  | 'addInfluenceFollowUpIndicators'
  | 'assignResponsibility'
  | 'checkOverlappingBarriers';
type Screen11GenderStatus = 'strongerDesign' | 'visibleNotBuiltIn' | 'needsDesignRepair';
type Screen11DisabilityStatus = 'strongerDesign' | 'partlyBuiltIn' | 'needsDesignRepair';
type Screen11FeedbackState =
  | 'strongerInclusionDesign'
  | 'tokenism'
  | 'disabilityAccessGap'
  | 'genderInfluenceGap'
  | 'missingRepair'
  | 'unsafeWording'
  | 'mixedPattern';

type Screen11Signal = {
  id: M3Screen11SignalId;
  title: string;
  text: string;
  hint: string;
  explanation: string;
  icon: string;
  implication: Record<InclusionStatus, string>;
};

type Screen11Repair = {
  id: M3Screen11RepairId;
  title: string;
  explanation: string;
  whyItMatters: string;
  laterUse: string;
  icon: string;
  tags: Array<'gender' | 'disability' | 'cross_cutting' | 'feedback' | 'responsibility' | 'indicator'>;
};

type Screen11DashboardRow = {
  signalId: M3Screen11SignalId;
  designArea: string;
  currentDesignSignal: string;
  markerResult: InclusionStatus;
  whatIsWeakOrStrong: string;
  designRepair: string;
  responsibilityFollowUp: string;
  carryForwardUse: string;
};

type Screen11OwnCsoDraft = {
  projectIssueOrActivity: string;
  genderDesignSignal: string;
  disabilityDesignSignal: string;
  markerResult: InclusionStatus | '';
  weakOrStrong: string;
  designRepair: string;
  responsibleActor: string;
  indicatorOrFollowUpQuestion: string;
  safeEvidenceToCheck: string;
};

type Screen11OwnCsoOutput = Screen11OwnCsoDraft & {
  generatedAt: string;
};

type Screen11Submission = {
  screenId: 'M3-R11';
  route: '/module-3/screen-3-11';
  title: 'Gender and Disability Design Check';
  classifications: Record<M3Screen11SignalId, InclusionStatus>;
  selectedRepairs: M3Screen11RepairId[];
  markerLiteDashboard: {
    rows: Screen11DashboardRow[];
    selectedRepairRows: Array<{
      repairSelected: string;
      whyItMatters: string;
      whereToUseItNext: string;
    }>;
    dashboardInterpretation: string;
    safetyConfirmation: string;
  };
  genderDesignStatus: Screen11GenderStatus;
  disabilityDesignStatus: Screen11DisabilityStatus;
  primaryFeedbackState: Screen11FeedbackState;
  warningIds: string[];
  carryForwardQuestion: 'Who needs to participate, what support do they need to participate safely, how can they influence decisions, and how will they receive feedback?';
  ownCsoPracticeOutput?: Screen11OwnCsoOutput;
  portfolioSummary: string;
  savedAt: string;
};

type Screen9Submission = {
  screenId: 'M3-R09';
  submitted: true;
  selectedActorIds: string[];
  actorRatings: Screen9ActorRating[];
  generatedPowerMapZones: Screen9PowerMapZone[];
  generatedActorRows: Array<{
    actor: string;
    roleFromResponsibilityMap: string;
    influenceLevel: string;
    supportInterestLevel: string;
    likelyRoleInChange: string;
    engagementApproach: string;
    designImplication: string;
    questionForScreen10: string;
  }>;
  powerInfluenceMap: {
    selectedActors: string[];
    actorRatings: Screen9ActorRating[];
    generatedRows: Screen9Submission['generatedActorRows'];
    summaryMessages: string[];
    safetyConfirmation: string;
  };
  detectedInsights: {
    hasHighInterestLowInfluenceRightsHolder: boolean;
    hasHighInfluenceLowOrUncertainSupport: boolean;
    hasGatekeeper: boolean;
    hasCsoOverloadRisk: boolean;
    hasUnsafeLabel: boolean;
  };
  feedbackLevel: Screen9FeedbackLevel;
  warnings: string[];
  powerMapSummary: string;
  ownCsoPracticeOutput?: Screen9OwnCsoOutput;
  portfolioSummary: string;
  carryForward: {
    snapshotField: 'powerInfluenceMap';
    issue: string;
    nextUse: string;
  };
};

const module3ActorAnalysisAssets = {
  screen8Hero: {
    src: '/assets/hrba/modules/module-3/m3-s08-duty-bearers-roles-jiru-amba.webp',
    alt: 'Illustration of Jiru Amba actors mapping responsibilities, supporting roles, and rights-holder voice around a local plan.',
  },
  screen9Hero: {
    src: '/assets/hrba/modules/module-3/m3-s09-power-influence-jiru-amba.webp',
    alt: 'Illustration of Jiru Amba actors using a local map to examine power, influence, responsibility, and lived knowledge.',
  },
  screen9Grid: {
    src: '/assets/hrba/modules/module-3/m3-s09-power-influence-grid.svg',
    alt: 'Support visual showing a power and influence grid for actor analysis.',
  },
};

const module3RootCauseAssets = {
  hero: {
    src: '/assets/hrba/modules/module-3/m3-s10-root-cause-capacity-jiru-amba.webp',
    alt: 'CSO team reviewing the Jiru Amba case in layers before choosing project fixes.',
  },
  template: {
    src: '/assets/hrba/modules/module-3/m3-s10-problem-layers-canvas-template.svg',
    alt: 'Support visual showing a four-layer problem canvas template.',
  },
  workedFlow: {
    src: '/assets/hrba/modules/module-3/m3-s10-worked-example-layer-flow.svg',
    alt: 'Support visual showing a case signal moving through visible sign, direct cause, deeper cause, and capacity gap layers.',
  },
};

const module3Screen11Assets = {
  hero: {
    src: '/assets/hrba/modules/module-3/m3-s11-gender-disability-design-check.webp',
    alt: 'CSO team reviewing a gender and disability inclusion dashboard with community representatives, including women, youth, and persons with disabilities, focusing on access, participation, accessibility, feedback, and follow-up.',
  },
  emptyDashboard: {
    src: '/assets/hrba/modules/module-3/m3-s11-inclusion-dashboard-empty-state.svg',
    alt: 'Support visual showing an empty inclusion dashboard before learner selections are submitted.',
  },
  scale: {
    src: '/assets/hrba/modules/module-3/m3-s11-missing-mentioned-built-scale.svg',
    alt: 'Support visual showing the Missing, Mentioned only, and Built into the design scale.',
  },
  icons: {
    information: '/assets/hrba/modules/module-3/m3-s11-icon-information-access.svg',
    participation: '/assets/hrba/modules/module-3/m3-s11-icon-participation-influence.svg',
    accessibility: '/assets/hrba/modules/module-3/m3-s11-icon-accessibility-accommodation.svg',
    safety: '/assets/hrba/modules/module-3/m3-s11-icon-safety-dignity.svg',
    feedback: '/assets/hrba/modules/module-3/m3-s11-icon-feedback-channels.svg',
    indicators: '/assets/hrba/modules/module-3/m3-s11-icon-indicators-followup.svg',
  },
};

const inclusionStatusLabels: Record<InclusionStatus, string> = {
  missing: 'Missing',
  mentioned: 'Mentioned only',
  built: 'Built into the design',
};

const screen11Signals: Screen11Signal[] = [
  {
    id: 'meetingInvitation',
    title: 'Meeting invitation',
    text: 'Women, youth, and persons with disabilities are invited to the planning meeting.',
    hint: 'Invitation is useful, but does it prove meaningful inclusion?',
    explanation: 'Invitation is useful, but it does not prove meaningful inclusion. The design should check whether different groups receive information early, can attend safely and practically, can communicate needs, and can influence decisions.',
    icon: module3Screen11Assets.icons.participation,
    implication: {
      missing: 'The design does not yet name who should be reached. Start by identifying specific rights-holder groups.',
      mentioned: 'Invitation is not enough. The design must show how barriers to participation will be removed.',
      built: 'This is stronger if invitation is linked to access support, safe facilitation, and influence over decisions.',
    },
  },
  {
    id: 'meetingTimeVenue',
    title: 'Meeting time and venue',
    text: 'The plan does not explain whether meeting time, venue, transport, care responsibilities, safety, or accessibility were checked before consultations.',
    hint: 'What design barriers could make equal invitation unequal in practice?',
    explanation: 'This is missing design detail. Gender and disability barriers often appear through timing, location, transport, care responsibilities, safety, physical access, communication, and support needs.',
    icon: module3Screen11Assets.icons.accessibility,
    implication: {
      missing: 'Access barriers are not yet checked. This can turn equal invitation into unequal participation.',
      mentioned: 'Barriers are visible but still need practical design changes.',
      built: 'This is stronger because timing, venue, transport, language, safety, and accessibility are treated as design issues.',
    },
  },
  {
    id: 'womensInfluence',
    title: 'Women’s influence',
    text: 'The plan sets a target that at least 40% of participants will be women.',
    hint: 'Does the design count attendance, or does it support influence?',
    explanation: 'A participation target can help, but it does not prove influence. The design should show how women’s priorities shaped objectives, activities, budgets, indicators, and follow-up.',
    icon: module3Screen11Assets.icons.participation,
    implication: {
      missing: 'Women’s participation may be counted but not influential.',
      mentioned: 'Attendance targets are useful but incomplete without influence over priorities, resources, and follow-up.',
      built: 'This is stronger if women’s priorities can shape the activity package, budget, and monitoring.',
    },
  },
  {
    id: 'disabilityAccessibility',
    title: 'Accessibility and accommodation',
    text: 'The plan mentions ramps, but does not explain accessible information, communication support, venue checks, transport, reasonable accommodation, accessible feedback, or who will provide and monitor these measures.',
    hint: 'Does the design make accessibility practical beyond ramps?',
    explanation: 'Ramps may be useful, but disability inclusion needs more than physical access. The design should include accessible information, communication support, reasonable accommodation, accessible feedback, and responsibility for follow-up.',
    icon: module3Screen11Assets.icons.accessibility,
    implication: {
      missing: 'Disability inclusion is not yet designed. Accessibility and reasonable accommodation need to be planned and budgeted.',
      mentioned: 'Disability is visible in words, but practical access and accommodation are still weak.',
      built: 'This is stronger because accessibility, accommodation, budget, and disability representative input are included.',
    },
  },
  {
    id: 'feedbackChannels',
    title: 'Feedback channels',
    text: 'The plan includes feedback boxes, but does not explain whether women, persons with disabilities, low-income households, youth, remote residents, or informal workers can use them safely, privately, and accessibly.',
    hint: 'Is a feedback box enough for safe, accessible response?',
    explanation: 'A feedback box is not enough. The design should explain who can use the channel, how privacy is protected, who responds, how people know what changed, and whether the channel is accessible.',
    icon: module3Screen11Assets.icons.feedback,
    implication: {
      missing: 'Feedback and complaint routes are not yet planned.',
      mentioned: 'One channel may exclude people who need privacy, accessibility, distance options, or trusted intermediaries.',
      built: 'This is stronger if feedback routes are safe, accessible, trusted, and followed up.',
    },
  },
  {
    id: 'indicatorsFollowUp',
    title: 'Indicators and follow-up',
    text: 'The plan counts activities and participants but does not track whether different groups influenced decisions, accessed benefits, raised concerns safely, or received response.',
    hint: 'Does the evidence show inclusion quality, or only activity completion?',
    explanation: 'This is missing from the design. Indicators should not only count attendance or activity delivery. They should show whether different groups influenced decisions, benefited, and received follow-up safely.',
    icon: module3Screen11Assets.icons.indicators,
    implication: {
      missing: 'Indicators only show activity delivery, not inclusion quality or accountability.',
      mentioned: 'Evidence is partly visible, but it does not yet show influence, benefit, barriers, or response.',
      built: 'This is stronger if indicators track access, influence, benefit, barriers, and follow-up by relevant groups.',
    },
  },
];

const screen11Repairs: Screen11Repair[] = [
  {
    id: 'checkParticipationBarriers',
    title: 'Check participation barriers before meetings',
    explanation: 'Adapt timing, location, information channels, facilitation, safety, care-burden considerations where feasible, and follow-up.',
    whyItMatters: 'Participation is not meaningful if timing, location, information, safety, care responsibilities, or accessibility block some groups.',
    laterUse: 'Participation and accountability pathway; risk check.',
    icon: module3Screen11Assets.icons.information,
    tags: ['gender', 'disability', 'cross_cutting'],
  },
  {
    id: 'strengthenWomensInfluence',
    title: 'Strengthen women’s influence, not only attendance',
    explanation: 'Show how women’s priorities affect objectives, activities, budget choices, indicators, and follow-up.',
    whyItMatters: 'A target does not prove influence. The design should show how women’s inputs changed priorities and follow-up.',
    laterUse: 'Objective repair; activity package repair; indicators.',
    icon: module3Screen11Assets.icons.participation,
    tags: ['gender', 'indicator'],
  },
  {
    id: 'improveAccessibilityAccommodation',
    title: 'Improve accessibility and reasonable accommodation',
    explanation: 'Check venues, materials, communication, transport, service access, feedback channels, budget, and responsibility for accessibility measures.',
    whyItMatters: 'Disability inclusion needs accessible information, venues, communication, feedback, and responsibility, not only invitation or ramps.',
    laterUse: 'Activity repair; risk check; indicators.',
    icon: module3Screen11Assets.icons.accessibility,
    tags: ['disability', 'responsibility', 'indicator'],
  },
  {
    id: 'safePreConsultation',
    title: 'Use safe pre-consultation with groups facing barriers',
    explanation: 'Use safe and non-identifying ways to hear priorities before public meetings or final decisions.',
    whyItMatters: 'Some groups may not speak freely in public meetings or late-stage consultations.',
    laterUse: 'Participation/accountability pathway; risk and do-no-harm.',
    icon: module3Screen11Assets.icons.safety,
    tags: ['gender', 'disability', 'cross_cutting'],
  },
  {
    id: 'strengthenFeedbackChannels',
    title: 'Strengthen feedback channels',
    explanation: 'Make feedback safe, private, accessible, trusted, and linked to response and follow-up.',
    whyItMatters: 'Feedback must be safe, private, accessible, trusted, answered, and used.',
    laterUse: 'Participation/accountability pathway; monitoring; risk.',
    icon: module3Screen11Assets.icons.feedback,
    tags: ['feedback', 'disability', 'cross_cutting'],
  },
  {
    id: 'addInfluenceFollowUpIndicators',
    title: 'Add influence and follow-up indicators',
    explanation: 'Track whether different groups influenced decisions, accessed benefits, raised concerns safely, and received response.',
    whyItMatters: 'Activity counts do not show whether people influenced decisions, benefited, or received response.',
    laterUse: 'Intervention logic and indicators.',
    icon: module3Screen11Assets.icons.indicators,
    tags: ['indicator', 'gender', 'disability'],
  },
  {
    id: 'assignResponsibility',
    title: 'Assign responsibility for inclusion actions',
    explanation: 'Clarify who will budget, provide, monitor, and follow up on accessibility, participation, feedback, and inclusion commitments.',
    whyItMatters: 'Inclusion actions are often missed when no actor is responsible for budgeting, providing, monitoring, or following up.',
    laterUse: 'Duty-bearer/actor map; activity repair; indicators.',
    icon: module3Screen11Assets.icons.participation,
    tags: ['responsibility', 'cross_cutting'],
  },
  {
    id: 'checkOverlappingBarriers',
    title: 'Check overlapping barriers',
    explanation: 'Look at groups who may face more than one barrier, such as women with disabilities, low-income caregivers, remote residents with disabilities, or informal workers with low influence.',
    whyItMatters: 'Some people face gender, disability, income, distance, livelihood, safety, or information barriers at the same time.',
    laterUse: 'Risk check; participation/accountability; activity repair.',
    icon: module3Screen11Assets.icons.safety,
    tags: ['cross_cutting', 'gender', 'disability'],
  },
];

const screen11FeedbackText: Record<Screen11FeedbackState, { title: string; text: string }> = {
  strongerInclusionDesign: {
    title: 'Strong design check',
    text: 'You identified where gender and disability are only partly built into the design and selected practical repairs. Carry these repairs into participation, accountability, risk, activities, indicators, and follow-up.',
  },
  tokenism: {
    title: 'Token inclusion risk',
    text: 'This is still too close to token inclusion. Naming women or persons with disabilities, setting a target, or inviting people is not enough unless the design changes information, timing, accessibility, safety, influence, feedback, budget, indicators, responsibility, or follow-up.',
  },
  disabilityAccessGap: {
    title: 'Disability access gap',
    text: 'Disability inclusion needs more than invitation or a ramp. Check information formats, communication support, reasonable accommodation, accessible feedback, transport, service access, indicators, and responsibility for follow-up.',
  },
  genderInfluenceGap: {
    title: 'Gender influence gap',
    text: 'A gender target does not prove influence. Check whether women can shape priorities, attend safely and practically, raise concerns, receive response, and see how their inputs changed the plan.',
  },
  missingRepair: {
    title: 'Missing repair',
    text: 'Add at least one repair. A design check is useful only if it changes what the project will do.',
  },
  unsafeWording: {
    title: 'Unsafe wording',
    text: 'Keep this safe. Do not enter real names, disability details about specific people, medical information, complaints, exact locations, accusations, or identifiable personal information.',
  },
  mixedPattern: {
    title: 'What your dashboard suggests',
    text: 'Your dashboard shows that gender and disability are partly visible but not yet fully built into the design. Strengthen the plan by changing participation conditions, accessibility measures, feedback channels, responsibilities, indicators, and follow-up.',
  },
};

const screen11PortfolioSummary = 'You completed a Gender and Disability Design Check. You identified where gender and disability are missing, only mentioned, or built into the design, and selected repairs to strengthen participation, accessibility, feedback, responsibility, indicators, and follow-up.';

const screen11DashboardRows: Screen11DashboardRow[] = [
  {
    signalId: 'meetingInvitation',
    designArea: 'Meeting invitation',
    currentDesignSignal: 'Women, youth, and persons with disabilities are invited to the planning meeting.',
    markerResult: 'mentioned',
    whatIsWeakOrStrong: 'Invitation is a start, but it does not prove meaningful participation, safety, accessibility, or influence.',
    designRepair: 'Check whether different groups receive information early, can attend safely and practically, can communicate needs, and can influence decisions.',
    responsibilityFollowUp: 'Awra can support inclusive facilitation and non-sensitive documentation. Planning actors should ensure participation arrangements allow different groups to influence decisions.',
    carryForwardUse: 'Use in the participation and accountability pathway.',
  },
  {
    signalId: 'meetingTimeVenue',
    designArea: 'Meeting time and venue',
    currentDesignSignal: 'The plan does not explain whether meeting time, venue, transport, care responsibilities, safety, or accessibility were checked.',
    markerResult: 'missing',
    whatIsWeakOrStrong: 'The design does not yet show whether participation conditions are realistic for different groups.',
    designRepair: 'Adapt timing, location, information channels, facilitation, safety, care-burden considerations where feasible, transport access, and accessibility arrangements.',
    responsibilityFollowUp: 'Planning and service actors should adjust participation conditions. Awra can help test barriers safely and document non-sensitive findings.',
    carryForwardUse: 'Use in participation planning, risk checks, and activity repair.',
  },
  {
    signalId: 'womensInfluence',
    designArea: 'Women’s influence',
    currentDesignSignal: 'The plan sets a target that at least 40% of participants will be women.',
    markerResult: 'mentioned',
    whatIsWeakOrStrong: 'A target counts attendance but does not show whether women influence priorities, activities, budget choices, indicators, or follow-up.',
    designRepair: 'Add a process for checking how women’s priorities shape the design and how changes are communicated back.',
    responsibilityFollowUp: 'Awra can facilitate and summarize safely. Planning and service actors should show how inputs change decisions.',
    carryForwardUse: 'Use in objective repair, participation/accountability, and indicator design.',
  },
  {
    signalId: 'disabilityAccessibility',
    designArea: 'Accessibility and reasonable accommodation',
    currentDesignSignal: 'The plan mentions ramps, but does not explain accessible information, communication support, venue checks, transport, reasonable accommodation, accessible feedback, or responsibility.',
    markerResult: 'mentioned',
    whatIsWeakOrStrong: 'Physical access is only one part of disability inclusion. The design does not yet show full accessibility across information, participation, service access, feedback, and follow-up.',
    designRepair: 'Add accessibility checks, accessible formats, reasonable accommodation, disability-sensitive feedback, and a budget/responsibility line for accessibility measures.',
    responsibilityFollowUp: 'Planning and service actors should budget, provide, and monitor accessibility measures. Awra can support checks and inclusive facilitation.',
    carryForwardUse: 'Use in activity repair, risk checks, feedback design, and indicators.',
  },
  {
    signalId: 'feedbackChannels',
    designArea: 'Feedback channels',
    currentDesignSignal: 'The plan includes feedback boxes but does not explain whether different groups can use them safely, privately, and accessibly.',
    markerResult: 'mentioned',
    whatIsWeakOrStrong: 'A feedback box does not guarantee safety, access, privacy, response, or trust.',
    designRepair: 'Create safe, private, accessible feedback channels with clear response roles and communication on what changed.',
    responsibilityFollowUp: 'Project and service actors should respond to feedback. Awra can support safe channels and non-sensitive tracking.',
    carryForwardUse: 'Use in participation/accountability, risk, and monitoring design.',
  },
  {
    signalId: 'indicatorsFollowUp',
    designArea: 'Indicators and follow-up',
    currentDesignSignal: 'The plan counts activities and participants but does not track whether different groups influenced decisions, accessed benefits, raised concerns safely, or received response.',
    markerResult: 'missing',
    whatIsWeakOrStrong: 'The design tracks activity delivery more than inclusion, influence, access, benefit, and accountability.',
    designRepair: 'Add indicators and follow-up questions that show whether different groups influenced decisions, accessed benefits, raised concerns safely, and received response.',
    responsibilityFollowUp: 'MEAL and project actors should track safe, non-identifying evidence. Planning and service actors should use findings to adjust implementation.',
    carryForwardUse: 'Use in intervention logic, indicators, and final portfolio snapshot.',
  },
];

function getEmptyScreen11OwnCsoDraft(): Screen11OwnCsoDraft {
  return {
    projectIssueOrActivity: '',
    genderDesignSignal: '',
    disabilityDesignSignal: '',
    markerResult: '',
    weakOrStrong: '',
    designRepair: '',
    responsibleActor: '',
    indicatorOrFollowUpQuestion: '',
    safeEvidenceToCheck: '',
  };
}

function hasUnsafeGenderDisabilityDetail(value: string) {
  const hasLikelyFullName = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/.test(value);
  const hasSensitiveDetail = /\b(\d{2,}|survivor|rape|assault|HIV|diagnosis|medical record|disability details|complaint against|accused|killed|beaten|confidential political)\b/i.test(value);
  return hasLikelyFullName || hasSensitiveDetail;
}

const genderDisabilityDesignCheckTemplateMarkdown = `# Gender and Disability Design Check Template

Use this template after your root-cause and capacity-gap map. It helps your CSO check whether gender and disability are missing, only mentioned, or built into project design decisions.

This is a simple learning tool. It is not formal donor marker scoring.

## Safety Reminder

Do not enter real names, exact sensitive locations, complaint details, survivor stories, medical or disability details about specific people, political accusations, confidential political details, or identifiable personal information.

## 1. Project Issue Or Activity

What project issue, activity, service issue, or design area are you checking?

## 2. Gender-Related Design Signal

Where does the design mention women, girls, men, boys, gender roles, care responsibilities, safety, livelihood, participation, or influence?

## 3. Disability-Related Design Signal

Where does the design mention persons with disabilities, accessibility, accommodation, communication, transport, service access, or feedback?

## 4. Marker Result

Choose one: Missing; Mentioned only; Built into the design.

## 5. What Barrier Or Exclusion Risk Remains?

What is still weak, missing, or only partly addressed?

## 6. What Design Repair Is Needed?

What should change in information-sharing, timing, location, accessibility, reasonable accommodation, safety, participation, feedback, budget, indicators, responsibility, or follow-up?

## 7. Who Is Responsible For The Repair?

Which actor should budget, provide, monitor, respond, facilitate, or follow up?

Examples: planning office; sector office; service committee; project team; CSO facilitator; MEAL staff; accessibility support actor; community representative; partner support organization.

## 8. Indicator Or Follow-Up Question

How will the project know whether the repair worked?

Examples: Did different groups influence decisions? Were accessibility measures provided? Were feedback channels safe and accessible? Did people know what changed because of their input? Were barriers reduced for different groups?

## 9. Safe Evidence To Check

What safe, non-identifying evidence can help verify this?

Examples: anonymized feedback summaries; accessibility checklists; facilitation notes; disaggregated participation information where safe and available; service records; observation of access barriers; non-sensitive monitoring notes.

## 10. Carry-Forward

Where should this repair be used next?

Use it in the participation and accountability pathway, risk and do-no-harm board, activity package repair, intervention logic, indicators, or final project design snapshot.
`;

function buildGenderDisabilityDesignCheckTemplateHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Gender and Disability Design Check Template</title></head><body>${genderDisabilityDesignCheckTemplateMarkdown
    .split('\n')
    .map((line) => {
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('- ')) return `<p>${line}</p>`;
      return line.trim() ? `<p>${line}</p>` : '';
    })
    .join('')}</body></html>`;
}

const screen11Warnings = [
  {
    id: 'attendanceOnlyGenderRisk',
    signalId: 'womensInfluence' as M3Screen11SignalId,
    title: 'Attendance is not enough',
    text: 'Women’s participation should influence priorities, activities, budgets, monitoring, and follow-up.',
  },
  {
    id: 'accessibilityAccommodationRisk',
    signalId: 'disabilityAccessibility' as M3Screen11SignalId,
    title: 'Accessibility must be designed',
    text: 'Disability inclusion needs practical accessibility, reasonable accommodation, communication support, budget, and follow-up.',
  },
  {
    id: 'feedbackExclusionRisk',
    signalId: 'feedbackChannels' as M3Screen11SignalId,
    title: 'One feedback channel may exclude people',
    text: 'Feedback routes should be safe, private, accessible, trusted, and usable by people facing different barriers.',
  },
  {
    id: 'evidenceGapRisk',
    signalId: 'indicatorsFollowUp' as M3Screen11SignalId,
    title: 'Activity counts do not prove inclusion',
    text: 'Indicators should show who influenced decisions, who accessed activities, who benefited, what barriers remained, and whether concerns were answered.',
  },
  {
    id: 'accessBarrierRisk',
    signalId: 'meetingTimeVenue' as M3Screen11SignalId,
    title: 'Equal invitation can still produce unequal access',
    text: 'Check time, venue, transport, communication, safety, care responsibilities, and accessibility before confirming participation plans.',
  },
];

type Screen12PathwaySelection = {
  group: string;
  gap: string;
  decision: string;
  supports: string[];
  responseChannel: string;
  responsibleActor: string;
  designAdjustment: string;
  customGroup?: string;
};

type Screen12OwnCsoDraft = {
  projectIssueOrDecision: string;
  rightsHolderGroup: string;
  participationAccountabilityGap: string;
  decisionToInfluence: string;
  accessSupport: string;
  influenceMethod: string;
  responseChannel: string;
  responsibleActor: string;
  followUpMethod: string;
  designAdjustment: string;
  safeEvidenceOrIndicator: string;
};

type Screen12OwnCsoOutput = Screen12OwnCsoDraft & {
  generatedAt: string;
};

type Screen12Submission = {
  screenId: 'M3-R12';
  route: '/module-3/screen-3-12';
  title: 'Participation and Accountability Pathway';
  participationAccountabilityPathway: Screen12PathwaySelection & {
    rightsHolderGroup: string;
    participationAccountabilityGap: string;
    decisionToInfluence: string;
    accessSupport: string[];
    influenceMethod: string;
    responseChannel: string;
    responsibleActor: string;
    followUpMethod: string;
    designAdjustment: string;
    safetyNote: string;
    indicatorEvidenceQuestion: string;
    followUpMeaning: string;
    badges: string[];
  };
  feedbackMessages: string[];
  ownCsoPracticeOutput?: Screen12OwnCsoOutput;
  portfolioSummary: string;
  savedAt: string;
};

type Screen13ImpactLevel = 'low' | 'medium' | 'high';
type Screen13RiskBoardSelection = {
  riskSituation: string;
  riskCategories: string[];
  affectedGroups: string[];
  impactLevel: Screen13ImpactLevel | '';
  mitigationActions: string[];
  responsibleActor: string;
  watchSign: string;
  designAdjustment: string;
};

type Screen13OwnCsoDraft = {
  projectActivity: string;
  riskSituation: string;
  riskCategory: string;
  affectedGroup: string;
  impactLevel: Screen13ImpactLevel | '';
  mitigationAction: string;
  responsibleActor: string;
  watchSign: string;
  designAdjustment: string;
  safeEvidenceRule: string;
};

type Screen13OwnCsoOutput = Screen13OwnCsoDraft & {
  generatedAt: string;
};

type Screen13Submission = {
  screenId: 'M3-R13';
  route: '/module-3/screen-3-13';
  title: 'Risk and Do-No-Harm in Project Design';
  riskDoNoHarmBoard: {
    selection: Screen13RiskBoardSelection;
    generatedBoard: {
      riskSituation: string;
      riskCategory: string;
      whoMayBeAffected: string;
      impactLevel: string;
      mitigationAction: string;
      responsibleActor: string;
      watchSign: string;
      designAdjustment: string;
      carryForwardUse: string;
    };
    interpretationMessages: string[];
    safetyConfirmation: string;
  };
  feedbackMessages: string[];
  ownCsoPracticeOutput?: Screen13OwnCsoOutput;
  portfolioSummary: string;
  savedAt: string;
};

const m3SafeDesignMessage = 'Use the Jiru Amba learning case for this activity. If you connect this to your own CSO work, keep it general. Do not write names, exact locations, real complaints, sensitive incidents, disability details, survivor stories, accusations, or identifiable information.';

const screen12Assets = {
  hero: {
    src: '/assets/hrba/modules/module-3/m3-s12-participation-accountability-pathway.webp',
    alt: 'A local CSO team and community actors review a participation pathway that links voice, influence, response, and follow-up.',
  },
  steps: '/assets/hrba/modules/module-3/m3-s12-pathway-step-icons.svg',
  safeFeedback: '/assets/hrba/modules/module-3/m3-s12-safe-feedback-channel.svg',
  loop: '/assets/hrba/modules/module-3/m3-s12-voice-influence-response-loop.svg',
};

const screen13Assets = {
  hero: {
    src: '/assets/hrba/modules/module-3/m3-s13-risk-do-no-harm-board.webp',
    alt: 'A CSO team reviews a risk and do-no-harm board before implementation, checking exclusion, safety, data, power, and response risks.',
  },
  board: '/assets/hrba/modules/module-3/m3-s13-risk-do-no-harm-board.svg',
  empty: '/assets/hrba/modules/module-3/m3-s13-risk-board-empty-preview.svg',
  categories: '/assets/hrba/modules/module-3/m3-s13-risk-category-icons.svg',
  severity: '/assets/hrba/modules/module-3/m3-s13-risk-severity-status.svg',
};

const screen12Groups = [
  'Women vendors affected by market changes',
  'Youth invited to livelihood training',
  'Persons with disabilities',
  'Women',
  'People from remote kebeles',
  'Informal workers',
  'Another generalized group',
];

const screen12GroupClues: Record<string, string> = {
  'Women vendors affected by market changes': 'They may need earlier information, livelihood-sensitive timing, and a way to influence market priorities before decisions are finalized.',
  'Youth invited to livelihood training': 'They may need to influence which training is selected and how training connects to practical opportunities.',
  'Persons with disabilities': 'They may need accessible information, venues, communication, feedback channels, and reasonable accommodation.',
  Women: 'They may need information and response on water repair, service quality, fees, and follow-up, in the context of household water responsibilities and water-service decisions.',
  'People from remote kebeles': 'They may need information before decisions are finalized and practical ways to participate without traveling to central locations.',
  'Informal workers': 'They may need safe and flexible ways to participate without risking income, stigma, or exclusion from formal channels.',
  'Another generalized group': 'Use a generalized group label only, such as caregivers, people with limited literacy, low-income households, or people using informal transport.',
};

const screen12Gaps = [
  'Information is late, unclear, or not accessible',
  'Some actors dominate the discussion',
  'Meeting time or location excludes some people',
  'Feedback is collected but no response is given',
  'Complaint or concern channels may not feel safe',
  'Transport, care work, disability access, or language support is missing',
  'Decisions are already shaped before people can influence them',
  'Public meetings are not safe or practical for some groups',
  'People do not know what changed after consultation',
  'Representation may filter the priorities of lower-influence groups',
];

const screen12Decisions = [
  'Which market improvements are prioritized',
  'How youth training participants are selected',
  'Whether meeting venues and materials are accessible',
  'How water repair and fee information are shared',
  'How health post renovation priorities are chosen',
  'How complaints and feedback are handled',
  'How budget choices reflect rights-holder priorities',
  'Which service access barriers are addressed first',
  'How follow-up responsibilities are assigned',
  'How information is shared before activities begin',
];

const screen12Supports = [
  'Clear information before the meeting or decision',
  'Separate pre-consultation with the group',
  'Accessible venue and materials',
  'Timing adjusted for care work, travel, or work schedules',
  'Safe and non-identifying feedback channel',
  'Trusted facilitator or representative chosen by the group',
  'Plain-language explanation of what can and cannot change',
  'Transport or local meeting option where feasible',
  'Accessible communication format',
  'Follow-up summary showing how priorities changed',
];

const screen12ResponseChannels = [
  'Public summary of what was heard and what changed',
  'Small group follow-up meeting',
  'Noticeboard or community information point',
  'Audio or verbal update through local structures',
  'CSO-facilitated feedback session with safe notes',
  'Accessible summary for persons with disabilities',
  'Response through the same group that raised the concern',
  'One-to-one follow-up only when safe and appropriate',
  'Simple update explaining what cannot change and why',
  'Feedback-response log with no names or identifying details',
];

const screen12ResponsibleActors = [
  'Woreda planning office',
  'Relevant sector office',
  'Market office or market committee',
  'Water committee',
  'Health office or health post management',
  'Kebele leadership with woreda follow-up',
  'Awra as facilitator only, with duty-bearer or service actor response',
  'Community representative plus responsible service actor',
  'Training provider plus livelihood actor',
  'Project accountability focal point plus responsible public/service actor',
];

const screen12DesignAdjustments = [
  'Move participation before ranking and budgeting',
  'Add early information-sharing before decisions',
  'Add accessible formats and reasonable accommodation',
  'Add safe feedback and response roles',
  'Add follow-up explaining what changed and why',
  'Adjust timing, location, or format to reduce exclusion',
  'Add indicators showing influence, not only attendance',
  'Link feedback to responsible public or service actors',
  'Use more than one participation channel',
  'Document non-sensitive patterns and use them to revise activities',
];

const screen12PortfolioSummary = 'You completed a Participation and Accountability Pathway. You designed how a specific rights-holder group can access information, influence a decision, receive response, see what changed, and carry this pathway into risk checks and design repair.';

const screen12SafetyNote = 'Do not record names, complaints, exact locations, disability details, survivor stories, accusations, or identifying details. Use safe summaries and role categories.';

const screen13RiskSituations = [
  {
    label: 'Feedback boxes may expose who raised concerns',
    body: 'People may be seen using the box, or they may write details that identify themselves or others.',
  },
  {
    label: 'Public meetings may silence lower-influence groups',
    body: 'Women vendors, informal workers, youth, persons with disabilities, or low-income residents may avoid speaking if influential actors are present.',
  },
  {
    label: 'Persons with disabilities may be invited but still unable to participate',
    body: 'Information, venues, transport, feedback channels, or communication formats may remain inaccessible.',
  },
  {
    label: 'Remote kebele residents may receive information late',
    body: 'They may miss decisions or receive follow-up after priorities are already finalized.',
  },
  {
    label: 'Youth training may create unrealistic expectations',
    body: 'Training may be promised without a clear pathway to market access, support, or practical opportunity.',
  },
  {
    label: 'Powerful actors may filter which priorities reach the final plan',
    body: 'Some actors may shape decisions before lower-influence groups can contribute.',
  },
  {
    label: 'Awra may be expected to fix public or service issues alone',
    body: 'The CSO may be asked to solve water, market, health, accessibility, or feedback problems that need duty-bearer or service-actor response.',
  },
  {
    label: 'Disability or complaint details may be recorded unsafely',
    body: 'Learning records, portfolio entries, notes, or feedback may include sensitive or identifiable information.',
  },
  {
    label: 'Water fee or service complaints may create tension',
    body: 'If response roles are unclear, people raising concerns may face blame or frustration.',
  },
  {
    label: 'Budget or transport assumptions may make participation unrealistic',
    body: 'Low-income households, remote residents, persons with disabilities, or informal workers may be excluded by hidden costs.',
  },
  {
    label: 'A public summary may accidentally identify a group or sensitive issue',
    body: 'A summary may be too specific and expose who raised a concern.',
  },
  {
    label: 'A single participation channel may be captured by better-connected actors',
    body: 'One channel may reflect the views of the most connected groups rather than those facing the strongest barriers.',
  },
];

const screen13RiskCategories = [
  'Exclusion risk',
  'Safety or backlash risk',
  'Data or visibility risk',
  'Power or capture risk',
  'CSO role-overload risk',
  'Unrealistic assumption risk',
];

const screen13RiskCategoryDescriptions: Record<string, string> = {
  'Exclusion risk': 'Some groups may still be left out because of timing, location, information, disability access, language, care work, cost, distance, or livelihood barriers.',
  'Safety or backlash risk': 'People may face pressure, blame, retaliation, stigma, or social consequences for speaking up or participating.',
  'Data or visibility risk': 'Feedback, complaints, disability information, photos, names, stories, or portfolio entries may expose people if handled carelessly.',
  'Power or capture risk': 'Influential actors may shape decisions, filter participation, control resources, or decide what feedback is heard.',
  'CSO role-overload risk': 'The CSO may be expected to solve issues that require duty-bearer, service-actor, committee, or sector response.',
  'Unrealistic assumption risk': 'The plan may assume cooperation, attendance, budget, transport, accessibility, market linkages, service response, or follow-up that is not yet secured.',
};

const screen13AffectedGroups = [
  { label: 'Women vendors affected by market changes' },
  { label: 'Women', support: 'In the context of household water responsibilities and water-service decisions.' },
  { label: 'Youth seeking livelihood opportunities' },
  { label: 'Persons with disabilities' },
  { label: 'Low-income households' },
  { label: 'Communities in remote kebeles' },
  { label: 'Informal workers' },
  { label: 'People raising feedback or concerns' },
  { label: 'Rights-holder groups with low influence' },
  { label: 'Another generalized group', support: 'Example: caregivers, people with limited literacy, people using informal transport.' },
];

const screen13ImpactLevels: Array<{ value: Screen13ImpactLevel; label: string; body: string }> = [
  { value: 'low', label: 'Low impact', body: 'The risk may inconvenience or delay participation, but it can be corrected quickly.' },
  { value: 'medium', label: 'Medium impact', body: 'The risk may exclude a group, reduce trust, weaken accountability, or make participation less meaningful.' },
  { value: 'high', label: 'High impact', body: 'The risk may expose people, create backlash, silence concerns, worsen exclusion, cause serious harm, or damage trust.' },
];

const screen13Mitigations = [
  'Use non-identifying summaries, not personal cases.',
  'Offer more than one feedback channel.',
  'Use accessible formats and reasonable accommodation.',
  'Share information before decisions are made.',
  'Use safe pre-consultation for groups facing barriers.',
  'Clarify who responds to which type of issue.',
  'Avoid promising changes that are not funded or within the project’s control.',
  'Protect learning records and portfolio entries.',
  'Track patterns without names.',
  'Include duty-bearer or service actor response roles.',
  'Use constructive engagement with high-influence actors.',
  'Monitor whether groups become silent or stop participating.',
  'Adjust timing, location, transport, or communication before activities start.',
  'Use more than one participation channel.',
  'Explain what should not be written in feedback or portfolio entries.',
];

const screen13ResponsibleActors = [
  'Awra as safe facilitator and non-sensitive documentation support',
  'Woreda planning office',
  'Relevant sector office',
  'Market office or market committee',
  'Water committee',
  'Health office or health post management',
  'Kebele leadership with woreda follow-up',
  'Project accountability focal point',
  'Safeguarding or protection focal point, where appropriate',
  'Partner or support organization',
  'Community representative plus responsible service actor',
  'Service actor responsible for the issue',
];

const screen13WatchSigns = [
  'Only one group uses the feedback channel.',
  'Some groups stop attending or remain silent.',
  'Feedback includes names, complaint details, or sensitive information.',
  'People say they do not know what changed.',
  'A high-influence actor dominates the process.',
  'Remote groups receive information late.',
  'Persons with disabilities still cannot access information or feedback.',
  'Youth complete training but do not access opportunities.',
  'People expect the CSO to solve issues outside its role.',
  'Concerns are collected but not answered.',
  'Participation depends on one public meeting only.',
  'Budget or transport barriers continue to block participation.',
];

const screen13DesignAdjustments = [
  'Replace a single feedback box with multiple safe and accessible response channels.',
  'Move consultation before decisions are ranked or budgeted.',
  'Add clear response roles and follow-up timeline.',
  'Add accessible information, reasonable accommodation, and disability-sensitive feedback.',
  'Add safe pre-consultation for groups facing barriers.',
  'Add non-identifying evidence rules for notes, feedback, and portfolio outputs.',
  'Add duty-bearer or service actor response responsibilities.',
  'Revise activities so they do not create unrealistic expectations.',
  'Add more than one participation channel to reduce capture by one actor.',
  'Add implementation watch-points to Module 4 handoff.',
  'Adjust timing, location, transport, or communication before activities start.',
  'Add indicator or monitoring question to track whether the risk is reducing.',
];

const screen13PortfolioSummary = 'You completed a Risk and Do-No-Harm Board. You identified what could exclude, expose, silence, or harm people, who may be affected, how to reduce the risk, who should respond, what sign to watch, and what should change before implementation.';

const problemLayerIcons: Record<ProblemLayerId, { src: string; alt: string }> = {
  visible: {
    src: '/assets/hrba/modules/module-3/m3-s10-icon-visible-sign.svg',
    alt: 'Visible sign layer icon.',
  },
  direct: {
    src: '/assets/hrba/modules/module-3/m3-s10-icon-direct-cause.svg',
    alt: 'Direct cause layer icon.',
  },
  root: {
    src: '/assets/hrba/modules/module-3/m3-s10-icon-root-cause.svg',
    alt: 'Deeper or root cause layer icon.',
  },
  capacity: {
    src: '/assets/hrba/modules/module-3/m3-s10-icon-capacity-gap.svg',
    alt: 'Capacity gap layer icon.',
  },
};

const problemLayerLabels: Record<ProblemLayerId, string> = {
  visible: 'Visible sign / symptom',
  direct: 'Direct cause',
  root: 'Deeper/root cause',
  capacity: 'Capacity gap',
};

const problemLayerOutputLabels: Record<ProblemLayerId, string> = {
  visible: 'Visible signs / symptoms',
  direct: 'Direct causes',
  root: 'Deeper/root causes',
  capacity: 'Capacity gaps',
};

const problemLayerSubtitles: Record<ProblemLayerId, string> = {
  visible: 'What the plan or process shows.',
  direct: 'What directly produced the visible problem.',
  root: 'The underlying pattern that keeps the problem happening.',
  capacity: 'Who needs what capacity to respond better.',
};

const problemLayerDefinitions: Record<ProblemLayerId, string> = {
  visible: 'What can be seen in the plan or case.',
  direct: 'What immediately produced the problem.',
  root: 'The underlying pattern that keeps the problem happening.',
  capacity: 'What a rights-holder group, duty-bearer, service actor, CSO, or system needs in order to respond better.',
};

const screen10Statements: Screen10Statement[] = [
  {
    id: 'S1',
    shortLabel: 'Consultation report does not show how input changed priorities',
    statement: 'The consultation report says many groups attended, but it does not show how their input changed final priorities.',
    suggestedLayer: 'visible',
    rationale: 'This is a visible weakness in the design evidence. It shows that participation was recorded, but influence is not yet clear.',
  },
  {
    id: 'S2',
    shortLabel: 'Activity list does not show which barriers will change',
    statement: 'The plan lists ramps, training, market improvement, water repair, and feedback mechanisms, but it does not show which barriers each activity will change.',
    suggestedLayer: 'visible',
    rationale: 'This is visible in the project design. The plan lists activities, but the barrier logic is not clear.',
  },
  {
    id: 'S3',
    shortLabel: 'Prepared activity cards limited what consultation could change',
    statement: 'Activity cards were prepared before the ranking exercise, so people could choose only from options already on the table.',
    suggestedLayer: 'direct',
    rationale: 'This explains how influence was limited in the immediate design process.',
  },
  {
    id: 'S4',
    shortLabel: 'Women traders’ concerns were not tested before finalizing activities',
    statement: 'Women traders’ market concerns were not tested before activities were finalized.',
    suggestedLayer: 'direct',
    rationale: 'This is an immediate cause. It explains why market-related concerns may not have shaped the final activity package.',
  },
  {
    id: 'S5',
    shortLabel: 'Rights-holder groups may lack information and safe challenge channels',
    statement: 'Rights-holder groups may not have enough information, confidence, accessible channels, or safe ways to challenge pre-shaped priorities.',
    suggestedLayer: 'root',
    rationale: 'This points to a deeper pattern that can keep unequal influence in place.',
  },
  {
    id: 'S6',
    shortLabel: 'Planning treated attendance and validation as enough',
    statement: 'Planning practice treated attendance and validation as enough evidence of meaningful participation.',
    suggestedLayer: 'root',
    rationale: 'This shows a deeper process problem. It explains why the design may count participation without showing influence.',
  },
  {
    id: 'S7',
    shortLabel: 'Better-connected actors had more space to shape priorities',
    statement: 'Better-connected actors had more space to shape priorities than groups facing the strongest barriers.',
    suggestedLayer: 'root',
    rationale: 'This shows a power pattern that may keep exclusion in place.',
  },
  {
    id: 'S8',
    shortLabel: 'Planning teams need a method to turn findings into design',
    statement: 'Planning teams and CSO facilitators need a clearer method to turn consultation findings into objectives, budgets, indicators, and follow-up.',
    suggestedLayer: 'capacity',
    rationale: 'This names what project and facilitation actors need to do better.',
  },
  {
    id: 'S9',
    shortLabel: 'Public and service actors need clearer responsibility systems',
    statement: 'Public and service actors need clearer responsibility, resources, and follow-up systems for accessibility, complaints, and service quality.',
    suggestedLayer: 'capacity',
    rationale: 'This identifies a capacity gap for duty-bearers and service actors.',
  },
  {
    id: 'S10',
    shortLabel: 'Rights-holder groups need timely information and safe influence channels',
    statement: 'Rights-holder groups need timely information and safe ways to influence priorities before decisions are finalized.',
    suggestedLayer: 'capacity',
    rationale: 'This identifies capacity and access needs for rights-holders.',
  },
  {
    id: 'S11',
    shortLabel: 'No clear process for checking whether feedback was answered',
    statement: 'The project has no clear process for checking whether feedback was answered and whether people know what changed.',
    suggestedLayer: 'direct',
    rationale: 'This explains an immediate reason why feedback may not lead to accountability.',
  },
  {
    id: 'S12',
    shortLabel: 'Planning system may not routinely use disaggregated evidence',
    statement: 'The local planning system may not routinely use disaggregated evidence to check who benefits, who is left out, and who can influence decisions.',
    suggestedLayer: 'root',
    rationale: 'This describes a deeper system pattern that can keep exclusion invisible.',
  },
];

const screen10FeedbackText: Record<Screen10FeedbackState, string> = {
  strong: 'Strong problem layers. You moved beyond visible symptoms and identified direct causes, deeper causes, and capacity gaps. The next step is to use this diagnosis to change the design, not only describe the problem.',
  capacity_missing: 'Add a capacity gap. Ask who needs what capacity: rights-holders, duty-bearers, service actors, CSO facilitators, or coordination systems.',
  visible_heavy: 'This is still too close to visible signs. Visible problems show what happened, but HRBA design needs to ask why it happened and what capacities or systems must change.',
  root_heavy: 'Check the layers again. A root cause is the deeper pattern that keeps the problem happening. Some statements may be visible signs or direct causes instead.',
  activity_jump: 'Avoid jumping directly from problem to activity. First identify the root cause and capacity gap. Then choose the design response.',
  unsafe_wording: 'Keep root-cause analysis safe and constructive. Do not name real individuals, officials, complaints, or sensitive incidents. Describe patterns, systems, or processes.',
  needs_refinement: 'Good start. Use the suggested layer review to refine the difference between what is visible, what directly caused it, what sits underneath, and what capacity needs attention.',
};

const screen10SuggestionText: Record<Screen10FeedbackState, string> = {
  strong: 'Strong diagnosis. You separated visible signs, direct causes, deeper causes, and capacity gaps. This helps the project avoid treating symptoms only. The next step is to use this diagnosis to improve gender/disability inclusion, participation, accountability, risk, objectives, activities, indicators, and follow-up.',
  capacity_missing: 'Capacity gaps need more attention. Ask who needs what capacity: rights-holders, duty-bearers, service actors, CSO facilitators, support partners, or coordination systems.',
  visible_heavy: 'Your diagnosis is still close to visible signs. Visible signs show what can be seen, but HRBA design also needs to ask why the issue happened and what capacities or systems must change.',
  root_heavy: 'Check the layers again. A root cause is the deeper pattern that keeps the problem happening. Some statements may be visible signs or direct causes instead.',
  activity_jump: 'Avoid jumping directly from problem to activity. First identify the cause, capacity gap, and design implication.',
  unsafe_wording: 'Keep this safe and constructive. Use pattern language rather than names, sensitive incidents, complaints, or accusations.',
  needs_refinement: 'Your draft is a useful start. Strengthen it by checking whether each statement describes what is visible, what directly caused it, what sits underneath, or what capacity needs to improve.',
};

const screen10Warnings = {
  visibleHeavy: 'Visible-sign risk: if most items are visible signs, the design may jump to another meeting or activity without changing causes.',
  directMissing: 'Direct cause missing: identify what directly limited participation, access, influence, or follow-up.',
  rootMissing: 'Deeper cause missing: check the planning habit, power pattern, accountability gap, or social norm underneath the problem.',
  capacityMissing: 'Capacity gap missing: identify what an actor cannot yet do well enough and what support, authority, resources, method, or system is needed.',
  lowAlignment: 'Layer distinction needs review: compare your selected layers with the suggested layer notes before carrying this forward.',
  capacityHeavy: 'Capacity-only risk: capacity gaps matter, but not every problem is solved by training or support. Also check power, accountability, and design choices.',
};

const screen10PortfolioSummary = 'You completed a Root-Cause and Capacity-Gap Map. You looked below visible problems to identify direct causes, deeper/root causes, capacity gaps, design implications, and questions to carry into the next design checks and repair screens.';

const screen10GeneratedPatterns: Screen10Submission['generatedProblemLayersCanvas'] = [
  {
    problemPattern: 'Rights-holder priorities may not shape the final design',
    visibleSign: 'The plan records participation but does not show how rights-holder input changed priorities.',
    directCause: 'Activities and options may have been prepared before rights-holder priorities were fully tested.',
    deeperRootCause: 'Planning practice may treat attendance and validation as enough evidence of meaningful participation, while better-connected actors shape priorities earlier.',
    capacityGap: 'Planning actors and CSO facilitators need a clearer method for turning consultation findings into objectives, budget choices, indicators, and follow-up.',
    designImplication: 'The design should include a documented process showing how different rights-holder priorities changed the activity package.',
    questionForLaterDesignRepair: 'Which objective, activity, participation plan, or indicator must change because of this analysis?',
  },
  {
    problemPattern: 'Barriers are named but not linked to activities',
    visibleSign: 'The plan lists ramps, training, market improvement, water repair, and feedback mechanisms, but it does not show which barriers each activity will change.',
    directCause: 'The design may have selected familiar activities before testing which barriers most affect different rights-holder groups.',
    deeperRootCause: 'Project planning may focus on activity delivery rather than barrier removal, influence, accessibility, accountability, and follow-up.',
    capacityGap: 'Project teams need a practical method to link activities to specific barriers, affected groups, responsible actors, and expected changes.',
    designImplication: 'Each activity should show which barrier it addresses, which group it supports, who is responsible, and what evidence will show change.',
    questionForLaterDesignRepair: 'Which activity should be revised so it responds to a specific barrier instead of remaining generic?',
  },
  {
    problemPattern: 'Feedback may not lead to response',
    visibleSign: 'The plan includes feedback mechanisms, but it does not show how feedback will be answered or how people will know what changed.',
    directCause: 'The project has no clear process for checking whether feedback is received, protected, answered, and used.',
    deeperRootCause: 'Accountability may be treated as collecting feedback rather than closing the response loop with rights-holders.',
    capacityGap: 'Public, service, and project actors need a clear feedback-response process, safe handling guidance, and follow-up responsibilities.',
    designImplication: 'The design should include safe feedback channels, response roles, timelines, and a way to communicate what changed.',
    questionForLaterDesignRepair: 'What accountability pathway should be added before implementation?',
  },
  {
    problemPattern: 'Accessibility may remain visible but not operational',
    visibleSign: 'The plan may list ramps or disability inclusion but not show how accessibility is checked across meetings, services, information, and feedback.',
    directCause: 'Accessibility measures may be added as isolated activities instead of built into participation, communication, service access, and accountability.',
    deeperRootCause: 'Planning systems may lack routine accessibility checks, reasonable accommodation planning, or disability-informed feedback channels.',
    capacityGap: 'Public and service actors, CSO facilitators, and support partners need clearer knowledge, budget planning, and procedures for accessibility and accommodation.',
    designImplication: 'The design should include accessibility checks across information, venues, materials, service points, feedback, and monitoring.',
    questionForLaterDesignRepair: 'Where should accessibility be built into objectives, activities, indicators, and risk checks?',
  },
  {
    problemPattern: 'Rights-holder influence remains unequal',
    visibleSign: 'Groups facing the strongest barriers may be present but still have less influence over priorities.',
    directCause: 'Consultation may not provide enough information, time, safe channels, or follow-up for lower-influence groups.',
    deeperRootCause: 'Power relations, information control, social norms, distance, livelihood constraints, and weak representation may keep some groups from shaping decisions.',
    capacityGap: 'Rights-holder groups need timely information and safe influence channels. Planning and CSO actors need methods for strengthening voice without exposing people to risk.',
    designImplication: 'The design should include safer, earlier, and more accessible ways for lower-influence groups to shape priorities and receive response.',
    questionForLaterDesignRepair: 'Which participation and accountability design features must change to strengthen rights-holder influence?',
  },
];

function getEmptyScreen10OwnCsoDraft(): Screen10OwnCsoDraft {
  return {
    projectIssueOrBarrier: '',
    visibleSign: '',
    directCause: '',
    deeperRootCause: '',
    capacityGap: '',
    actorWhoseCapacityMatters: '',
    designImplication: '',
    questionForDesignRepair: '',
  };
}

function hasUnsafeRootCauseDetail(value: string) {
  const hasLikelyFullName = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/.test(value);
  const hasSensitiveDetail = /\b(\d{2,}|survivor|rape|assault|HIV|diagnosis|medical record|complaint against|accused|killed|beaten|confidential political)\b/i.test(value);
  return hasLikelyFullName || hasSensitiveDetail;
}

const rootCauseCapacityGapTemplateMarkdown = `# Root-Cause and Capacity-Gap Map Template

Use this template after your power and influence map. It helps your CSO look below visible problems and identify what keeps barriers in place, whose capacity needs strengthening, and what the project design should change.

## Safety Reminder

Do not enter real names, exact sensitive locations, complaint details, survivor stories, political accusations, confidential political details, or identifiable personal information.

## 1. Project Issue Or Barrier

What issue or barrier are you analyzing?

## 2. Visible Sign / Symptom

What can you see in the project idea, assessment, plan, or practice?

## 3. Direct Cause

What immediately produced this problem?

## 4. Deeper/Root Cause

What deeper pattern keeps the problem happening?

Examples: unequal influence; information control; inaccessible systems; unclear responsibility; weak feedback-response process; social norms; distance or transport barriers; livelihood constraints; weak representation; weak coordination; limited budget; unsafe participation; weak use of disaggregated evidence.

## 5. Capacity Gap

Who needs what capacity to respond better?

Check one or more: rights-holder capacity; duty-bearer capacity; service actor capacity; CSO capacity; support partner capacity; community structure capacity; coordination system capacity; accountability system capacity; evidence or data capacity; other.

## 6. Actor Whose Capacity Matters

Which actor, group, or system needs capacity strengthening?

Examples: rights-holder group; woreda planning office; relevant sector office; service committee; health post staff; water committee; market committee; CSO facilitator; support partner; coordination system.

## 7. Design Implication

What should change in the project design?

## 8. Safe Evidence To Check

What safe evidence can help verify this diagnosis?

Examples: anonymized feedback summaries; planning records; observation of access barriers; facilitation notes; service records; disaggregated participation data where available; safe discussion with trusted facilitators; public or non-sensitive documents.

## 9. Question For Design Repair

What should be repaired later?

Check one or more: objective; activity package; participation plan; accountability pathway; gender and disability design; risk and do-no-harm plan; intervention logic; indicator; evidence plan; follow-up system.
`;

function buildRootCauseCapacityGapTemplateHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Root-Cause and Capacity-Gap Map Template</title></head><body>${rootCauseCapacityGapTemplateMarkdown
    .split('\n')
    .map((line) => {
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('- ')) return `<p>${line}</p>`;
      return line.trim() ? `<p>${line}</p>` : '';
    })
    .join('')}</body></html>`;
}

const screen8BarrierIdMap: Partial<Record<BarrierTagId, Screen8BarrierId>> = {
  limited_influence: 'limited_influence',
  information_barrier: 'information_barrier',
  accessibility_accommodation: 'accessibility_barrier',
  timing_care_work: 'timing_care_work_barrier',
  distance_transport: 'distance_transport_barrier',
  safety_comfort: 'safety_comfort_barrier',
  livelihood_market_risk: 'livelihood_market_risk',
  feedback_response: 'feedback_response_gap',
  income_cost_barrier: 'income_related_barrier',
  unclear_pathway_to_benefit: 'unclear_pathway_to_benefit',
};

const screen8FallbackBarriers: Screen8BarrierOption[] = [
  {
    id: 'limited_influence',
    label: 'Limited influence',
    description: 'Some groups may be present but less able to shape decisions.',
  },
  {
    id: 'information_barrier',
    label: 'Information barrier',
    description: 'Some groups may not receive clear, timely, or accessible information.',
  },
  {
    id: 'accessibility_barrier',
    label: 'Accessibility or accommodation barrier',
    description: 'Meeting spaces, materials, transport, or feedback channels may not be accessible.',
  },
  {
    id: 'timing_care_work_barrier',
    label: 'Timing or care-work barrier',
    description: 'Meeting time or workload may limit participation.',
  },
  {
    id: 'distance_transport_barrier',
    label: 'Distance or transport barrier',
    description: 'People from remote kebeles may face distance, cost, or transport barriers.',
  },
  {
    id: 'safety_comfort_barrier',
    label: 'Safety, trust, or social-risk barrier',
    description: 'Some groups may not feel safe or comfortable raising concerns.',
  },
  {
    id: 'livelihood_market_risk',
    label: 'Livelihood or market-risk barrier',
    description: 'Livelihood activities may not connect clearly to practical opportunity or benefit.',
  },
  {
    id: 'feedback_response_gap',
    label: 'Feedback or response barrier',
    description: 'People may not know what changed after consultation or feedback.',
  },
  {
    id: 'income_related_barrier',
    label: 'Income or cost barrier',
    description: 'Low-income households may face cost, time, or access barriers.',
  },
  {
    id: 'unclear_pathway_to_benefit',
    label: 'Unclear pathway to benefit',
    description: 'The plan may list activities but not show how they lead to practical benefit.',
  },
];

const screen8PortfolioSummary =
  'You completed a Duty-Bearer and Actor Responsibility Map. You identified who has public or service responsibility, who influences access or follow-up, what role the CSO can realistically play, what capacity gap may need attention, and what question should be carried into power analysis.';

const screen8GeneratedDefaults: Record<Screen8BarrierId, {
  rightsHolderGroupAffected: string;
  primaryPublicResponsibility: string;
  serviceOrSectorActor: string;
  communityOrInfluenceActor: string;
  realisticCsoRole: string;
  supportOrAllyActor: string;
  capacityGapToCheck: string;
  safeEngagementQuestion: string;
  nextQuestion: string;
}> = {
  limited_influence: {
    rightsHolderGroupAffected: 'Groups whose priorities may be heard late or not reflected in decisions.',
    primaryPublicResponsibility: 'Woreda planning office or relevant local planning actor.',
    serviceOrSectorActor: 'Committee or sector actor connected to the decision area.',
    communityOrInfluenceActor: 'Kebele structures, committee leaders, community representatives, or informal brokers.',
    realisticCsoRole: 'Awra can facilitate more inclusive consultation, document non-sensitive participation gaps, and help show how priorities changed the plan.',
    supportOrAllyActor: 'Peer CSO, inclusion adviser, or partner support organization.',
    capacityGapToCheck: 'Weak facilitation, unclear consultation process, limited trust, or decisions shaped before consultation.',
    safeEngagementQuestion: 'How can Awra help lower-influence groups shape priorities without exposing individuals or creating confrontation?',
    nextQuestion: 'Which actor has the most influence over priority-setting, and who may resist changing the process?',
  },
  information_barrier: {
    rightsHolderGroupAffected: 'Groups who may not receive clear, timely, accessible, or trusted information.',
    primaryPublicResponsibility: 'Woreda planning office, relevant sector office, or service actor responsible for information-sharing.',
    serviceOrSectorActor: 'Service committee, health post, water committee, market committee, or training provider.',
    communityOrInfluenceActor: 'Kebele structures, community representatives, informal information brokers.',
    realisticCsoRole: 'Awra can support accessible communication, test whether messages reach different groups, and document non-sensitive information gaps.',
    supportOrAllyActor: 'Communications support actor, peer CSO, or inclusion resource person.',
    capacityGapToCheck: 'Weak communication channels, inaccessible formats, low trust, language/literacy barriers, or late information-sharing.',
    safeEngagementQuestion: 'What information can be shared earlier and more accessibly without naming complaints or sensitive cases?',
    nextQuestion: 'Who controls information flow, and whose information needs are currently ignored?',
  },
  accessibility_barrier: {
    rightsHolderGroupAffected: 'Persons with disabilities and others with access needs.',
    primaryPublicResponsibility: 'Woreda planning office or relevant sector office.',
    serviceOrSectorActor: 'Health post, water committee, market committee, venue manager, or service office.',
    communityOrInfluenceActor: 'Kebele structures, committee leaders, disability representatives, or community facilitators.',
    realisticCsoRole: 'Awra can facilitate accessibility checks, support inclusive consultation, document non-sensitive barriers, and help connect rights-holders with responsible actors.',
    supportOrAllyActor: 'Disability inclusion focal person, local disability group, technical adviser, or partner support organization.',
    capacityGapToCheck: 'Limited accessibility knowledge, no reasonable accommodation budget, weak standards, inaccessible information, or no accessible feedback process.',
    safeEngagementQuestion: 'How can the project check access barriers safely without exposing individuals?',
    nextQuestion: 'Which actor has authority and resources to make accessibility changes?',
  },
  timing_care_work_barrier: {
    rightsHolderGroupAffected: 'People whose work, care, livelihood, or household responsibilities limit participation.',
    primaryPublicResponsibility: 'Planning actor responsible for consultation and service scheduling.',
    serviceOrSectorActor: 'Sector office, service committee, training provider, or activity organizer.',
    communityOrInfluenceActor: 'Community representatives, women’s group representatives, market actors, caregivers’ networks.',
    realisticCsoRole: 'Awra can help test timing options, facilitate flexible participation, and document non-sensitive scheduling barriers.',
    supportOrAllyActor: 'Local facilitator, women’s group, peer CSO, or partner support organization.',
    capacityGapToCheck: 'Standard meeting times, limited flexibility, weak understanding of care responsibilities, or no budget for alternative participation arrangements.',
    safeEngagementQuestion: 'What timing or format would allow participation without increasing care burden or livelihood loss?',
    nextQuestion: 'Who decides meeting or activity schedules, and whose time constraints are ignored?',
  },
  distance_transport_barrier: {
    rightsHolderGroupAffected: 'Remote kebele residents, low-income households, persons with disabilities, and others facing travel constraints.',
    primaryPublicResponsibility: 'Woreda planning office, relevant sector office, or local service actor.',
    serviceOrSectorActor: 'Kebele structure, service committee, health post, water committee, mobile/outreach actor.',
    communityOrInfluenceActor: 'Community representatives, local facilitators, remote kebele representatives.',
    realisticCsoRole: 'Awra can support decentralized outreach, document non-sensitive distance barriers, and help plan safe information-sharing channels.',
    supportOrAllyActor: 'Local facilitator, transport support actor, peer CSO, or partner organization.',
    capacityGapToCheck: 'Limited outreach budget, weak transport planning, poor communication with remote areas, or centralized service design.',
    safeEngagementQuestion: 'How can the design reach remote groups before decisions are finalized?',
    nextQuestion: 'Who has influence over where activities and services are located?',
  },
  safety_comfort_barrier: {
    rightsHolderGroupAffected: 'Groups who may avoid speaking openly because of stigma, backlash, social pressure, or low trust.',
    primaryPublicResponsibility: 'Relevant public actor responsible for safe participation, protection from retaliation, or accountable response.',
    serviceOrSectorActor: 'Service provider, feedback mechanism manager, committee, or referral actor.',
    communityOrInfluenceActor: 'Community leaders, committee leaders, informal brokers, trusted representatives.',
    realisticCsoRole: 'Awra can create safer participation options, avoid exposing individuals, support confidential feedback pathways, and document issues only in generalized form.',
    supportOrAllyActor: 'Safeguarding focal person, protection adviser, trusted community facilitator, or peer CSO.',
    capacityGapToCheck: 'Weak confidentiality, low trust, unclear referral pathways, fear of backlash, or unsafe complaint handling.',
    safeEngagementQuestion: 'How can people raise concerns without being identified or exposed?',
    nextQuestion: 'Which actors create trust, and which actors may create risk or silence?',
  },
  livelihood_market_risk: {
    rightsHolderGroupAffected: 'Women traders, informal workers, youth, low-income households, and others whose participation may affect income or market access.',
    primaryPublicResponsibility: 'Relevant livelihood, market, planning, or sector actor.',
    serviceOrSectorActor: 'Market committee, training provider, livelihood office, cooperative actor, or service provider.',
    communityOrInfluenceActor: 'Market representatives, informal brokers, traders’ representatives, youth representatives.',
    realisticCsoRole: 'Awra can support livelihood-sensitive scheduling, document non-sensitive market barriers, and connect project activities to realistic opportunity pathways.',
    supportOrAllyActor: 'Livelihood adviser, market actor, training provider, peer CSO, or partner organization.',
    capacityGapToCheck: 'Weak market analysis, training not linked to opportunity, low follow-up, or limited coordination with livelihood actors.',
    safeEngagementQuestion: 'How can the project support participation without increasing income loss or market risk?',
    nextQuestion: 'Who controls access to market opportunities or livelihood support?',
  },
  feedback_response_gap: {
    rightsHolderGroupAffected: 'Groups who may give feedback but not receive response or protection.',
    primaryPublicResponsibility: 'Planning office, service actor, or project accountability actor responsible for receiving and responding to feedback.',
    serviceOrSectorActor: 'Service committee, water committee, health post, market committee, or feedback mechanism manager.',
    communityOrInfluenceActor: 'Community representatives, kebele structures, trusted facilitators.',
    realisticCsoRole: 'Awra can help design safe feedback channels, document non-sensitive feedback patterns, support response tracking, and explain what changed.',
    supportOrAllyActor: 'Accountability adviser, peer CSO, safeguarding focal person, or partner organization.',
    capacityGapToCheck: 'No response procedure, unclear responsibility, weak confidentiality, low trust, or feedback collected without follow-up.',
    safeEngagementQuestion: 'How will people know who responds and what changed, without exposing complainants?',
    nextQuestion: 'Who has the power to respond to feedback, and who may prefer silence?',
  },
  income_related_barrier: {
    rightsHolderGroupAffected: 'Low-income households, remote residents, informal workers, women traders, youth, and others facing cost barriers.',
    primaryPublicResponsibility: 'Relevant public or service actor responsible for equitable access.',
    serviceOrSectorActor: 'Service provider, committee, training provider, or activity organizer.',
    communityOrInfluenceActor: 'Community representatives, market actors, local facilitators.',
    realisticCsoRole: 'Awra can help identify cost barriers, support low-cost participation options, and document non-sensitive access constraints.',
    supportOrAllyActor: 'Partner organization, transport support actor, livelihood adviser, or peer CSO.',
    capacityGapToCheck: 'No budget for access support, hidden costs, centralized activities, weak affordability analysis.',
    safeEngagementQuestion: 'What costs may prevent participation or access, and how can they be reduced safely?',
    nextQuestion: 'Who controls decisions about cost, fees, transport, or participation support?',
  },
  unclear_pathway_to_benefit: {
    rightsHolderGroupAffected: 'Groups named in the project but not clearly connected to practical benefits.',
    primaryPublicResponsibility: 'Relevant planning, service, livelihood, or sector actor connected to the intended benefit.',
    serviceOrSectorActor: 'Training provider, market actor, health post, water committee, sector office, or service provider.',
    communityOrInfluenceActor: 'Community representatives, youth/women representatives, market actors, informal brokers.',
    realisticCsoRole: 'Awra can help clarify the pathway from activity to benefit, support follow-up, document barriers, and connect actors.',
    supportOrAllyActor: 'Technical adviser, partner support organization, training provider, or peer CSO.',
    capacityGapToCheck: 'Activities not linked to outcomes, weak follow-up, limited service coordination, or no practical opportunity pathway.',
    safeEngagementQuestion: 'What must happen after the activity for rights-holders to experience real benefit?',
    nextQuestion: 'Who controls the pathway from activity to practical outcome?',
  },
};

const dutyBearerActorResponsibilityTemplateMarkdown = `# Duty-Bearer and Actor Responsibility Map Template

Use this template after your rights-holder and barrier map. It helps your CSO clarify who has responsibility, who influences access or follow-up, what role the CSO can realistically play, and what capacity gap may need attention.

## Safety reminder

Do not enter real names, exact sensitive locations, complaint details, survivor stories, political accusations, or identifiable personal information.

## 1. Project issue or barrier

What barrier needs a response?

## 2. Rights-holder group affected

Which specific group is affected by this barrier?

## 3. Relevant standard or policy reference

Which right, HRBA principle, policy, service standard, or commitment is connected to this barrier?

## 4. Primary duty-bearer / public responsibility

Which public actor or institution has responsibility connected to this issue?

## 5. Service or sector actor

Which actor controls service access, quality, information, standards, or follow-up?

## 6. Community or influence actor

Who affects trust, information flow, participation, gatekeeping, or who is heard?

## 7. Realistic CSO role

What can the CSO do without replacing public or service responsibility?

Examples:

- facilitate participation;
- support accessible information;
- document non-sensitive barriers;
- connect rights-holders and responsible actors;
- strengthen feedback channels;
- monitor commitments;
- advocate constructively;
- support capacity development.

## 8. Support or ally actor

Who can provide technical support, resources, training, coordination, or accompaniment?

## 9. Capacity gap

What may prevent the actor from responding well?

Check any that apply:

- unclear mandate;
- limited budget;
- weak coordination;
- limited accessibility knowledge;
- no feedback procedure;
- weak trust;
- limited disaggregated evidence;
- limited technical skill;
- weak communication channels;
- unclear service standard;
- other: ______.

## 10. Safe engagement question

What question can the CSO ask safely and constructively?

## 11. Carry-forward to power analysis

What should be explored in the next power and influence analysis?
`;

function buildDutyBearerActorResponsibilityTemplateHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Duty-Bearer and Actor Responsibility Map Template</title></head><body>${dutyBearerActorResponsibilityTemplateMarkdown
    .split('\n')
    .map((line) => {
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('- ')) return `<p>${line}</p>`;
      if (!line.trim()) return '<p></p>';
      return `<p>${line}</p>`;
    })
    .join('')}</body></html>`;
}

const screen8ActorsByLane: Record<'public' | 'service' | 'voice' | 'cso', Screen8ActorOption[]> = {
  public: [
    {
      id: 'woreda_planning_office',
      label: 'Woreda planning office',
      category: 'primary_public_responsibility',
      useFor: 'participation, planning decisions, budget/priorities, follow-up.',
    },
    {
      id: 'relevant_woreda_sector_office',
      label: 'Relevant woreda sector office',
      category: 'primary_public_responsibility',
      useFor: 'sector service response, service improvement, technical follow-up.',
    },
    {
      id: 'woreda_water_service_office',
      label: 'Woreda water or service office',
      category: 'primary_public_responsibility',
      useFor: 'water/service access, service quality, water priorities, service follow-up.',
    },
    {
      id: 'woreda_women_children_social_affairs',
      label: 'Woreda women, children, or social affairs office',
      category: 'primary_public_responsibility',
      useFor: 'inclusion, protection-sensitive access, women/youth/disability support.',
    },
    {
      id: 'kebele_administration',
      label: 'Kebele administration',
      category: 'primary_public_responsibility',
      useFor: 'local coordination, information sharing, follow-up, local access.',
    },
    {
      id: 'public_service_provider_facility',
      label: 'Public service provider or facility',
      category: 'primary_public_responsibility',
      useFor: 'direct service access, accommodation, referral, service quality.',
    },
    {
      id: 'local_council_public_committee',
      label: 'Local council or public committee',
      category: 'primary_public_responsibility',
      useFor: 'local public decisions, community representation, accountability.',
    },
    {
      id: 'human_rights_accountability_body',
      label: 'Human rights or accountability body, if relevant and safe',
      category: 'primary_public_responsibility',
      useFor: 'accountability, complaint pathways, rights awareness, safe referral.',
    },
  ],
  service: [
    { id: 'local_service_water_committee', label: 'Local service or water committee', category: 'service_or_local_implementation' },
    { id: 'training_provider', label: 'Training provider', category: 'service_or_local_implementation' },
    { id: 'market_or_cooperative_office', label: 'Market or cooperative office', category: 'service_or_local_implementation' },
    { id: 'extension_worker_service_focal_point', label: 'Extension worker or service focal point', category: 'service_or_local_implementation' },
    { id: 'venue_owner_meeting_organizer', label: 'Venue owner or meeting organizer', category: 'service_or_local_implementation' },
    { id: 'community_information_focal_point', label: 'Community information focal point', category: 'service_or_local_implementation' },
    { id: 'local_transport_or_access_support_actor', label: 'Local transport or access support actor', category: 'service_or_local_implementation' },
  ],
  voice: [
    { id: 'womens_group_or_cooperative', label: 'Women’s group or cooperative', category: 'rights_holder_voice_support' },
    { id: 'youth_group', label: 'Youth group', category: 'rights_holder_voice_support' },
    { id: 'disability_representative_or_opd', label: 'Disability representative or OPD', category: 'rights_holder_voice_support' },
    { id: 'informal_worker_representative', label: 'Informal worker representative', category: 'rights_holder_voice_support' },
    { id: 'remote_kebele_representative', label: 'Remote kebele representative', category: 'rights_holder_voice_support' },
    { id: 'low_income_household_representative', label: 'Low-income household representative', category: 'rights_holder_voice_support' },
    { id: 'community_volunteers_or_facilitators', label: 'Community volunteers or facilitators', category: 'rights_holder_voice_support' },
    {
      id: 'respected_leaders_possible_gatekeeper',
      label: 'Respected community leaders or possible gatekeepers',
      category: 'rights_holder_voice_support',
      safeNote: 'Use carefully. This role may support access, but may also dominate or filter voice.',
    },
  ],
  cso: [
    { id: 'convene_safely', label: 'Convene safely', category: 'cso_role' },
    { id: 'facilitate_dialogue', label: 'Facilitate dialogue', category: 'cso_role' },
    { id: 'support_evidence_use', label: 'Support evidence use', category: 'cso_role' },
    { id: 'strengthen_rights_holder_voice', label: 'Strengthen rights-holder voice', category: 'cso_role' },
    { id: 'advocate_constructively', label: 'Advocate constructively', category: 'cso_role' },
    { id: 'monitor_commitments', label: 'Monitor commitments', category: 'cso_role' },
    { id: 'support_accessibility_planning', label: 'Support accessibility planning', category: 'cso_role' },
    { id: 'explain_information_accessibly', label: 'Explain information in accessible ways', category: 'cso_role' },
    { id: 'document_learning_safely', label: 'Document learning without exposing people', category: 'cso_role' },
    { id: 'track_response_safely', label: 'Track whether response reached rights-holders', category: 'cso_role' },
  ],
};

const screen8CommunityInfluenceActors: Screen8ActorOption[] = [
  { id: 'kebele_structure', label: 'Kebele structure', category: 'community_influence_actor', useFor: 'information flow, local trust, participation, and follow-up.' },
  { id: 'committee_leaders', label: 'Committee leaders', category: 'community_influence_actor', useFor: 'who is invited, who is heard, and how decisions are explained.' },
  { id: 'community_representatives', label: 'Community representatives', category: 'community_influence_actor', useFor: 'trust, information flow, and safe participation.' },
  { id: 'elders_or_informal_brokers', label: 'Elders or informal brokers', category: 'community_influence_actor', useFor: 'local influence, gatekeeping, and informal information channels.' },
];

const screen8ParticipationActors: Screen8ActorOption[] = [
  { id: 'womens_group_representative', label: 'Women’s group representative', category: 'participation_actor', useFor: 'safer, more specific participation and priority voice.' },
  { id: 'youth_group_representative', label: 'Youth group representative', category: 'participation_actor', useFor: 'youth priorities, livelihood pathways, and follow-up.' },
  { id: 'disability_inclusion_focal_person', label: 'Disability inclusion focal person', category: 'participation_actor', useFor: 'accessibility checks and reasonable accommodation.' },
  { id: 'market_group_representative', label: 'Market group representative', category: 'participation_actor', useFor: 'market access, livelihood timing, and practical benefit.' },
];

const screen8SupportActors: Screen8ActorOption[] = [
  { id: 'dec_partner_support', label: 'DEC or partner support organization', category: 'support_ally_actor', useFor: 'technical support, coordination, or accompaniment.' },
  { id: 'technical_adviser', label: 'Technical adviser', category: 'support_ally_actor', useFor: 'standards, accessibility, feedback, or service-quality support.' },
  { id: 'peer_cso_network', label: 'Peer CSO network', category: 'support_ally_actor', useFor: 'learning, accompaniment, or constructive advocacy support.' },
  { id: 'training_provider_support', label: 'Training provider', category: 'support_ally_actor', useFor: 'capacity development and practical pathway support.' },
];

const screen8CarefulActors: Screen8ActorOption[] = [
  { id: 'information_gatekeeper', label: 'Actor who controls information', category: 'careful_engagement_actor', useFor: 'may enable transparency or limit who receives information.' },
  { id: 'high_influence_committee_leader', label: 'High-influence committee leader', category: 'careful_engagement_actor', useFor: 'may support change or resist transparency.' },
  { id: 'informal_broker_careful', label: 'Informal broker', category: 'careful_engagement_actor', useFor: 'may shape access, trust, or participation risks.' },
];

const screen8ActorCategories = [
  {
    lane: 'public' as const,
    title: 'Primary duty-bearer / public responsibility',
    meaning: 'Public actor or institution with formal responsibility connected to the issue.',
    examples: 'Woreda planning office; relevant sector office; local public authority.',
    prompt: 'Which public actor has responsibility connected to this barrier?',
  },
  {
    lane: 'service' as const,
    title: 'Service or sector actor',
    meaning: 'Actor connected to service access, quality, information, standards, or follow-up.',
    examples: 'Water committee; health post staff; market committee; service office; training provider.',
    prompt: 'Which actor controls or supports the service, information, or practical pathway affected by the barrier?',
  },
  {
    lane: 'community' as const,
    title: 'Community structure or influence actor',
    meaning: 'Local actor that may influence information flow, trust, participation, gatekeeping, or who is heard.',
    examples: 'Kebele structure; committee leaders; community representatives; elders; informal brokers.',
    prompt: 'Who influences whether this group receives information, is trusted, participates, or is heard?',
  },
  {
    lane: 'participation' as const,
    title: 'Rights-holder representative or participation actor',
    meaning: 'Group or representative that can help voice priorities safely, without replacing the affected group’s own participation.',
    examples: 'Women’s group representative; youth representative; disability inclusion focal person; market group representative.',
    prompt: 'Who could help make participation safer, more specific, or more accessible?',
  },
  {
    lane: 'cso' as const,
    title: 'CSO role',
    meaning: 'What Awra can realistically do without replacing public or service responsibility.',
    examples: 'Facilitate participation; support accessible information; document non-sensitive barriers; connect actors; monitor commitments.',
    prompt: 'What can Awra realistically do without taking over the duty-bearer role?',
  },
  {
    lane: 'support' as const,
    title: 'Support or ally actor',
    meaning: 'Actor that can provide technical support, resources, training, coordination, or accompaniment.',
    examples: 'DEC/partner support organization; technical adviser; peer CSO network; inclusion resource person.',
    prompt: 'Who can support the response without becoming the main responsible actor?',
  },
  {
    lane: 'careful' as const,
    title: 'Actor to handle carefully',
    meaning: 'Actor with influence, gatekeeping power, possible resistance, or risk.',
    examples: 'Informal brokers; committee leaders with strong influence; actors who control information.',
    prompt: 'Which actor may need careful, constructive, risk-aware engagement?',
  },
];

const screen8CapacityGapHints: Array<{ id: CapacityGapHintId; label: string }> = [
  { id: 'mandate_unclear', label: 'Mandate unclear' },
  { id: 'limited_budget_resources', label: 'Limited budget or resources' },
  { id: 'weak_coordination', label: 'Weak coordination' },
  { id: 'limited_accessibility_capacity', label: 'Limited accessibility capacity' },
  { id: 'weak_feedback_system', label: 'Weak feedback system' },
  { id: 'limited_information_flow', label: 'Limited information flow' },
  { id: 'low_rights_holder_voice', label: 'Low rights-holder voice' },
  { id: 'limited_technical_skill', label: 'Limited technical skill' },
  { id: 'low_trust_weak_dialogue', label: 'Low trust or weak dialogue' },
  { id: 'safety_sensitivity_concern', label: 'Safety or sensitivity concern' },
];

const screen8ActionChipsByCategory: Record<ActorCategory, string[]> = {
  primary_public_responsibility: [
    'Provide accessible information',
    'Enable meaningful participation',
    'Remove access barriers',
    'Allocate or adjust budget',
    'Coordinate service response',
    'Respond to feedback',
    'Monitor fairness and inclusion',
    'Clarify criteria or decisions',
    'Improve service pathway',
  ],
  service_or_local_implementation: [
    'Share information',
    'Adjust venue or timing',
    'Support transport or access',
    'Help with accommodations',
    'Connect groups to services',
    'Support follow-up',
    'Validate whether response reached people',
  ],
  community_influence_actor: [
    'Share trusted information',
    'Support safe participation',
    'Reduce gatekeeping',
    'Help explain follow-up',
  ],
  participation_actor: [
    'Voice group priorities',
    'Check access barriers',
    'Support safer participation',
    'Validate whether response reached people',
  ],
  rights_holder_voice_support: [
    'Represent lived experience',
    'Identify hidden barriers',
    'Support safe participation',
    'Check accessibility',
    'Share group priorities',
    'Validate whether decisions changed',
    'Raise concerns safely',
  ],
  support_ally_actor: [
    'Provide technical support',
    'Support coordination',
    'Build capacity',
    'Accompany constructive engagement',
  ],
  careful_engagement_actor: [
    'Engage constructively',
    'Manage influence risk',
    'Avoid confrontation',
    'Check power dynamics',
  ],
  cso_role: [
    'Convene safely',
    'Facilitate dialogue',
    'Support evidence use',
    'Strengthen rights-holder voice',
    'Advocate constructively',
    'Monitor commitments',
    'Support accessibility or accommodations',
    'Document learning safely',
    'Track response without exposing people',
  ],
  rights_holder_group: ['Represent lived experience', 'Share group priorities', 'Raise concerns safely'],
  generalized_custom_actor: ['Support follow-up', 'Share information', 'Validate whether response reached people'],
};

const actorCategoryLabels: Record<ActorCategory, string> = {
  primary_public_responsibility: 'Public responsibility',
  service_or_local_implementation: 'Service or local implementation',
  community_influence_actor: 'Community structure or influence actor',
  participation_actor: 'Rights-holder representative or participation actor',
  rights_holder_voice_support: 'Rights-holder voice or support',
  support_ally_actor: 'Support or ally actor',
  careful_engagement_actor: 'Actor to handle carefully',
  cso_role: 'CSO role',
  rights_holder_group: 'Rights-holder group',
  generalized_custom_actor: 'Generalized actor role',
};

const screen9CustomActorCategoryOptions: Array<{ value: ActorCategory; label: string }> = [
  { value: 'primary_public_responsibility', label: 'Public responsibility' },
  { value: 'service_or_local_implementation', label: 'Service or local implementation' },
  { value: 'community_influence_actor', label: 'Community influence actor' },
  { value: 'rights_holder_group', label: 'Rights-holder group' },
  { value: 'rights_holder_voice_support', label: 'Rights-holder voice or supporting actor' },
  { value: 'support_ally_actor', label: 'Support or ally actor' },
  { value: 'cso_role', label: 'CSO role' },
  { value: 'generalized_custom_actor', label: 'Other generalized actor role' },
];

const screen9DefaultActors: Module3Actor[] = [
  { actorId: 'woreda_planning_office', label: 'Woreda planning office', category: 'primary_public_responsibility', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'relevant_sector_office', label: 'Relevant sector office', category: 'primary_public_responsibility', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'kebele_structure', label: 'Kebele structure', category: 'community_influence_actor', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'water_committee', label: 'Water committee', category: 'service_or_local_implementation', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'market_committee', label: 'Market committee', category: 'service_or_local_implementation', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'health_post_staff', label: 'Health post staff', category: 'service_or_local_implementation', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'community_representatives', label: 'Community representatives', category: 'rights_holder_voice_support', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'women_traders', label: 'Women traders', category: 'rights_holder_group', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'women_water_context', label: 'Women', category: 'rights_holder_group', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'persons_with_disabilities', label: 'Persons with disabilities', category: 'rights_holder_group', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'youth_livelihood_opportunities', label: 'Youth seeking livelihood opportunities', category: 'rights_holder_group', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'low_income_households', label: 'Low-income households', category: 'rights_holder_group', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'remote_kebele_communities', label: 'Communities in remote kebeles', category: 'rights_holder_group', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'informal_workers', label: 'Informal workers', category: 'rights_holder_group', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'awra_cso_team', label: 'Awra CSO team', category: 'cso_role', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'informal_brokers_gatekeepers', label: 'Informal brokers or gatekeepers', category: 'careful_engagement_actor', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'partner_support_organization', label: 'Partner or support organization', category: 'support_ally_actor', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
];

const likelyRoleOptions: Array<{ id: LikelyChangeRole; label: string }> = [
  { id: 'enabler', label: 'Champion' },
  { id: 'blocker', label: 'Blocker or delaying actor' },
  { id: 'gatekeeper', label: 'Gatekeeper' },
  { id: 'ally', label: 'Support actor' },
  { id: 'undecided_actor', label: 'Actor needing careful engagement' },
  { id: 'low_power_rights_holder_group', label: 'Actor needing voice strengthening' },
  { id: 'responsible_actor_needing_engagement', label: 'Actor needing careful engagement' },
  { id: 'support_actor', label: 'Support actor' },
];

const screen9InfluenceOptions: Array<{ value: Screen9InfluenceLevel; label: string }> = [
  { value: 'low', label: 'Low influence' },
  { value: 'medium', label: 'Medium influence' },
  { value: 'high', label: 'High influence' },
];

const screen9SupportOptions: Array<{ value: Screen9SupportLevel; label: string }> = [
  { value: 'low', label: 'Low support / low interest' },
  { value: 'uncertain', label: 'Uncertain or mixed' },
  { value: 'high', label: 'High support / high interest' },
];

const screen9EngagementApproachOptions: Array<{ value: Screen9EngagementApproach; label: string }> = [
  { value: 'work_closely', label: 'Work closely' },
  { value: 'engage_carefully', label: 'Engage carefully' },
  { value: 'strengthen_voice_safely', label: 'Strengthen voice safely' },
  { value: 'keep_informed', label: 'Clarify responsibility' },
  { value: 'monitor_lightly', label: 'Monitor lightly' },
  { value: 'build_interest', label: 'Build interest' },
  { value: 'reduce_risk_before_engagement', label: 'Reduce risk before engagement' },
  { value: 'support_capacity', label: 'Support capacity' },
];

const screen9PortfolioSummary = 'You completed a Power and Influence Map. You identified who can enable change, who may block or delay it, whose voice should be strengthened, what engagement approach may be needed, and what question should be carried into root-cause and capacity-gap analysis.';

function getPracticeState(state: LearningState, screenId: string): Record<string, unknown> {
  const value = state.practiceCheckState[practiceKey(screenId)];
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function getScreen7SavedOutput(state: LearningState): Screen7Submission | null {
  const record = getPracticeState(state, 'M3-R07');
  const nested = record.screen7;
  if (nested && typeof nested === 'object' && (nested as Screen7Submission).screenId === 'M3-R07') {
    return nested as Screen7Submission;
  }
  if (record.screenId === 'M3-R07') return record as Screen7Submission;
  return null;
}

function getScreen8SavedOutput(state: LearningState): Screen8Submission | null {
  const record = getPracticeState(state, 'M3-R08');
  const nested = record.screen8;
  if (nested && typeof nested === 'object' && (nested as Screen8Submission).screenId === 'M3-R08') {
    return nested as Screen8Submission;
  }
  if (record.screenId === 'M3-R08') return record as Screen8Submission;
  return null;
}

function getBarrierLabel(barrierId: Screen8BarrierId) {
  return screen8FallbackBarriers.find((barrier) => barrier.id === barrierId)?.label || barrierId;
}

function getCapacityGapLabel(hintId: CapacityGapHintId) {
  return screen8CapacityGapHints.find((hint) => hint.id === hintId)?.label || hintId;
}

function getScreen8BarrierOptions(state: LearningState): Screen8BarrierOption[] {
  const screen7Output = getScreen7SavedOutput(state);
  if (!screen7Output?.generatedMapRows?.length) return screen8FallbackBarriers;

  const imported = new Map<Screen8BarrierId, Screen8BarrierOption>();
  screen7Output.generatedMapRows.forEach((row) => {
    row.barrierIds.forEach((screen7BarrierId) => {
      const mappedId = screen8BarrierIdMap[screen7BarrierId];
      if (!mappedId) return;
      const fallback = screen8FallbackBarriers.find((barrier) => barrier.id === mappedId);
      if (!fallback) return;
      const current = imported.get(mappedId);
      imported.set(mappedId, {
        ...fallback,
        sourceGroupLabels: Array.from(new Set([...(current?.sourceGroupLabels || []), row.groupLabel])),
      });
    });
  });

  return imported.size > 0
    ? screen8FallbackBarriers.filter((barrier) => imported.has(barrier.id)).map((barrier) => imported.get(barrier.id) || barrier)
    : screen8FallbackBarriers;
}

function getAllScreen8Actors(customActors: Screen8ActorOption[] = []) {
  return [
    ...screen8ActorsByLane.public,
    ...screen8ActorsByLane.service,
    ...screen8ActorsByLane.voice,
    ...screen8ActorsByLane.cso,
    ...screen8CommunityInfluenceActors,
    ...screen8ParticipationActors,
    ...screen8SupportActors,
    ...screen8CarefulActors,
    ...customActors,
  ];
}

function getActorLabel(actorId: string, actors: Screen8ActorOption[] | Module3Actor[]) {
  const actor = actors.find((item) => ('id' in item ? item.id === actorId : item.actorId === actorId));
  if (!actor) return actorId;
  return 'id' in actor ? actor.label : actor.label;
}

function getActorCategory(actorId: string, actors: Screen8ActorOption[] | Module3Actor[]): ActorCategory {
  const actor = actors.find((item) => ('id' in item ? item.id === actorId : item.actorId === actorId));
  return actor?.category || 'generalized_custom_actor';
}

function validateGeneralActorLabel(value: string) {
  const trimmed = value.trim();
  const unsafePattern =
    /(\b\d{5,}\b)|(\b(corrupt|abusive|guilty|stole|attacked|party|political|complaint|accused|named|village|kebele\s+\w+)\b)|[@#<>[\]{}\\/]/i;
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const looksLikeName = /^[A-Z][a-z]+ [A-Z][a-z]+/.test(trimmed);
  const invalid = trimmed.length < 3 || trimmed.length > 50 || /[\r\n]/.test(trimmed) || wordCount > 6 || unsafePattern.test(trimmed) || looksLikeName;

  return {
    trimmed,
    isValid: !invalid,
    error: invalid
      ? 'Use a general actor role only. Do not enter real names, accusations, complaints, exact locations, or sensitive details.'
      : '',
  };
}

function createEmptyScreen8Mapping(): Screen8BarrierMapping {
  return {
    publicActorIds: [],
    serviceActorIds: [],
    communityActorIds: [],
    participationActorIds: [],
    voiceActorIds: [],
    supportActorIds: [],
    carefulActorIds: [],
    csoRoleIds: [],
    actionIdsByActor: {},
    capacityGapHintIds: [],
  };
}

function getScreen8Mapping(mappings: Record<string, Screen8BarrierMapping>, barrierId: Screen8BarrierId) {
  return mappings[barrierId] || createEmptyScreen8Mapping();
}

function getScreen8SelectedActorIds(mapping: Screen8BarrierMapping) {
  return [
    ...mapping.publicActorIds,
    ...mapping.serviceActorIds,
    ...mapping.communityActorIds,
    ...mapping.participationActorIds,
    ...mapping.voiceActorIds,
    ...mapping.supportActorIds,
    ...mapping.carefulActorIds,
    ...mapping.csoRoleIds,
  ];
}

function getScreen8PreviewStatus(mapping: Screen8BarrierMapping) {
  const actorCount = getScreen8SelectedActorIds(mapping).length;
  if (mapping.publicActorIds.length === 0 && mapping.csoRoleIds.length > 0) return 'CSO role only — add public responsibility';
  if (mapping.publicActorIds.length === 0) return 'No public responsibility yet';
  if (mapping.serviceActorIds.length === 0 && mapping.communityActorIds.length === 0 && mapping.participationActorIds.length === 0 && mapping.voiceActorIds.length === 0) return 'Service or influence actor missing';
  if (mapping.capacityGapHintIds.length === 0) return 'Capacity hint missing';
  if (actorCount > 8) return 'Too many actors — focus the map';
  return 'Ready';
}

function generateScreen8Rows(
  selectedBarrierIds: Screen8BarrierId[],
  mappings: Record<string, Screen8BarrierMapping>,
  actors: Screen8ActorOption[],
): Screen8GeneratedRow[] {
  return selectedBarrierIds.map((barrierId) => {
    const mapping = getScreen8Mapping(mappings, barrierId);
    const defaults = screen8GeneratedDefaults[barrierId];
    return {
      barrierId,
      barrierLabel: getBarrierLabel(barrierId),
      rightsHolderGroupAffected: defaults.rightsHolderGroupAffected,
      primaryPublicResponsibility: mapping.publicActorIds.map((actorId) => getActorLabel(actorId, actors)),
      serviceOrSectorActors: mapping.serviceActorIds.map((actorId) => getActorLabel(actorId, actors)),
      communityOrInfluenceActors: [...mapping.communityActorIds, ...mapping.participationActorIds, ...mapping.voiceActorIds, ...mapping.carefulActorIds].map((actorId) => getActorLabel(actorId, actors)),
      csoRoles: mapping.csoRoleIds.map((actorId) => getActorLabel(actorId, actors)),
      supportOrAllyActors: mapping.supportActorIds.map((actorId) => getActorLabel(actorId, actors)),
      capacityGapHints: mapping.capacityGapHintIds,
      safeEngagementQuestion: defaults.safeEngagementQuestion,
      nextQuestion: defaults.nextQuestion,
    };
  });
}

function deriveScreen8Feedback(
  selectedBarrierIds: Screen8BarrierId[],
  mappings: Record<string, Screen8BarrierMapping>,
  hasUnsafeLabel: boolean,
) {
  const selectedMappings = selectedBarrierIds.map((barrierId) => getScreen8Mapping(mappings, barrierId));
  const hasPublicResponsibility = selectedMappings.some((mapping) => mapping.publicActorIds.length > 0);
  const allHavePublicResponsibility = selectedMappings.every((mapping) => mapping.publicActorIds.length > 0);
  const hasRightsHolderVoice = selectedMappings.some((mapping) => mapping.voiceActorIds.length > 0 || mapping.participationActorIds.length > 0);
  const hasSupportingActor = selectedMappings.some((mapping) =>
    mapping.serviceActorIds.length > 0 ||
    mapping.communityActorIds.length > 0 ||
    mapping.participationActorIds.length > 0 ||
    mapping.voiceActorIds.length > 0 ||
    mapping.supportActorIds.length > 0,
  );
  const hasCsoRole = selectedMappings.some((mapping) => mapping.csoRoleIds.length > 0);
  const hasCapacityGapHint = selectedMappings.some((mapping) => mapping.capacityGapHintIds.length > 0);
  const actorCountTooHigh = selectedMappings.some((mapping) => getScreen8SelectedActorIds(mapping).length > 8);
  const actionsTooBroad = selectedMappings.reduce(
    (total, mapping) => total + Object.values(mapping.actionIdsByActor).reduce((sum, actionIds) => sum + actionIds.length, 0),
    0,
  ) > 10;
  const overloadWarning = selectedMappings.some((mapping) => mapping.csoRoleIds.length > 0 && mapping.publicActorIds.length === 0);
  const missingResponsibilityWarning = !hasPublicResponsibility || !allHavePublicResponsibility;
  const feedbackLevel: Screen8FeedbackLevel =
    actorCountTooHigh || actionsTooBroad
      ? 'too_broad'
      : overloadWarning
        ? 'cso_overload'
        : !hasPublicResponsibility
          ? 'missing_responsibility'
          : allHavePublicResponsibility && hasSupportingActor && hasCsoRole && hasCapacityGapHint && !hasUnsafeLabel
            ? 'strong'
            : 'good_with_gap';
  const warnings: string[] = [];

  if (missingResponsibilityWarning) warnings.push('Your map does not yet show a duty-bearer or responsible public/service actor. Add the actor connected to the service, decision, information, or feedback process.');
  if (overloadWarning) warnings.push('This map gives too much responsibility to the CSO. Add the actor who has responsibility for the service, decision, information, or feedback process.');
  if (!hasRightsHolderVoice) warnings.push('Add a participation or rights-holder representative actor who can help make lived experience visible safely.');
  if (!hasCapacityGapHint) warnings.push('Good start, but the map needs a capacity gap. Ask what may prevent the actor from responding well: mandate clarity, budget, coordination, accessibility knowledge, trust, or feedback procedures.');
  if (actorCountTooHigh || actionsTooBroad) warnings.push('Try to focus the map. Select the actors most directly connected to this barrier so the responsibility question remains clear.');
  if (hasUnsafeLabel) warnings.push('Keep the engagement constructive and safe. Do not name real officials, make accusations, or record sensitive complaints.');

  return {
    hasPublicResponsibility,
    hasRightsHolderVoice,
    hasCsoRole,
    hasCapacityGapHint,
    overloadWarning,
    missingResponsibilityWarning,
    feedbackLevel,
    warnings: warnings.slice(0, 3),
  };
}

function buildScreen8ActorLinks(
  selectedBarrierIds: Screen8BarrierId[],
  mappings: Record<string, Screen8BarrierMapping>,
  actors: Screen8ActorOption[],
): Screen8BarrierActorLink[] {
  return selectedBarrierIds.map((barrierId) => {
    const mapping = getScreen8Mapping(mappings, barrierId);
    return {
      barrierId,
      barrierLabel: getBarrierLabel(barrierId),
      actorSelections: getScreen8SelectedActorIds(mapping).map((actorId) => ({
        actorId,
        actorLabel: getActorLabel(actorId, actors),
        category: getActorCategory(actorId, actors),
        actionIds: mapping.actionIdsByActor[actorId] || [],
      })),
      capacityGapHintIds: mapping.capacityGapHintIds,
    };
  });
}

function buildExportedActorsForScreen9(
  selectedBarrierIds: Screen8BarrierId[],
  mappings: Record<string, Screen8BarrierMapping>,
  actors: Screen8ActorOption[],
): Module3Actor[] {
  const exported = new Map<string, Module3Actor>();
  selectedBarrierIds.forEach((barrierId) => {
    const mapping = getScreen8Mapping(mappings, barrierId);
    getScreen8SelectedActorIds(mapping).forEach((actorId) => {
      const existing = exported.get(actorId);
      exported.set(actorId, {
        actorId,
        label: getActorLabel(actorId, actors),
        category: getActorCategory(actorId, actors),
        sourceScreen: actorId.startsWith('custom_') ? 'custom' : 'screen8',
        linkedBarrierIds: Array.from(new Set([...(existing?.linkedBarrierIds || []), barrierId])),
        responsibilityActionIds: Array.from(new Set([...(existing?.responsibilityActionIds || []), ...(mapping.actionIdsByActor[actorId] || [])])),
        capacityGapHintIds: Array.from(new Set([...(existing?.capacityGapHintIds || []), ...mapping.capacityGapHintIds])),
        safeCustom: actorId.startsWith('custom_') ? true : undefined,
      });
    });
  });
  return Array.from(exported.values());
}

function getScreen9ActorOptions(state: LearningState): Module3Actor[] {
  const screen8Output = getScreen8SavedOutput(state);
  const screen7Output = getScreen7SavedOutput(state);
  const actors = new Map<string, Module3Actor>();

  if (screen8Output?.exportedActorsForScreen9?.length) {
    screen8Output.exportedActorsForScreen9.forEach((actor) => {
      actors.set(actor.actorId, actor);
    });
    screen9DefaultActors.forEach((actor) => {
      if (!actors.has(actor.actorId)) actors.set(actor.actorId, actor);
    });
  } else {
    screen9DefaultActors.forEach((actor) => {
      actors.set(actor.actorId, actor);
    });
  }

  screen7Output?.generatedMapRows?.forEach((row) => {
    actors.set(row.groupId, {
      actorId: row.groupId,
      label: row.groupLabel,
      category: 'rights_holder_group',
      sourceScreen: 'screen7',
      linkedBarrierIds: row.barrierIds.map((barrierId) => screen8BarrierIdMap[barrierId]).filter(Boolean) as string[],
    });
  });

  return Array.from(actors.values());
}

const screen9ActorContent: Record<string, { role: string; implication: string; question: string; clue: string }> = {
  woreda_planning_office: {
    clue: 'Formal public responsibility and high influence over planning priorities, coordination, and follow-up.',
    role: 'Public actor with formal responsibility for planning coordination, priority-setting, and follow-up.',
    implication: 'The project should engage the planning office early and constructively, using evidence from the context scan, policy and standards map, and rights-holder barrier map.',
    question: 'What capacity gap or root cause may explain weak or delayed response: mandate clarity, coordination, budget, participation process, or accountability system?',
  },
  relevant_sector_office: {
    clue: 'Public or sector responsibility for service standards, sector commitments, technical decisions, or follow-up.',
    role: 'Public or sector actor linked to service standards, technical decisions, or sector commitments.',
    implication: 'The design should connect activities to sector responsibilities and avoid treating service improvement as only a CSO activity.',
    question: 'What root cause or capacity gap affects the sector actor’s ability to respond?',
  },
  kebele_structure: {
    clue: 'Local governance actor that may influence information flow, participation, access, and who is recognized.',
    role: 'Local governance actor influencing information flow, access, recognition, and who is heard.',
    implication: 'The project should engage the kebele structure carefully while ensuring that rights-holder voice is not filtered through one channel only.',
    question: 'What norms, gatekeeping patterns, information flows, or representation issues shape local participation?',
  },
  water_committee: {
    clue: 'Service or committee actor with influence over water-service decisions, information, and response.',
    role: 'Service or committee actor influencing water-service information, decisions, and response.',
    implication: 'The design should clarify how water-service concerns are received, answered, and followed up.',
    question: 'What root causes affect water-service response: committee capacity, information gaps, weak feedback procedure, budget, or unclear responsibility?',
  },
  market_committee: {
    clue: 'Service or livelihood actor with influence over market priorities, access, and practical opportunities.',
    role: 'Service or livelihood actor influencing market priorities, access, and practical livelihood opportunities.',
    implication: 'The design should include market-accessible consultation, transparent priority-setting, and a clear pathway from activities to livelihood benefit.',
    question: 'What root causes limit fair market influence: information control, informal gatekeeping, time burden, weak representation, or livelihood risk?',
  },
  health_post_staff: {
    clue: 'Service actor with influence over service access, information, quality, and follow-up.',
    role: 'Service actor influencing service access, information, quality, and follow-up.',
    implication: 'The design should clarify service follow-up, accessibility, and safe feedback responsibilities.',
    question: 'What root causes affect health-service response: staffing, resources, accessibility, coordination, or feedback systems?',
  },
  community_representatives: {
    clue: 'Participation actor that may influence who is heard, whose concerns are shared, and whose priorities are represented.',
    role: 'Participation actor that may influence who is heard, whose concerns are shared, and whose priorities are represented.',
    implication: 'The project should avoid assuming that one representative voice reflects all groups. It should check whether women, youth, persons with disabilities, remote residents, low-income households, and informal workers are represented meaningfully.',
    question: 'What root causes shape representation gaps: norms, selection process, trust, information flow, or unequal influence?',
  },
  women_traders: {
    clue: 'Rights-holder group with strong interest in market-related priorities, but possibly lower influence over decisions.',
    role: 'Rights-holder group affected by market-related priorities, livelihood decisions, information, and influence.',
    implication: 'The design should strengthen women traders’ voice safely through market-accessible communication, timing that respects livelihood realities, and visible feedback on how priorities changed.',
    question: 'What root causes keep women traders’ influence low: time burden, care responsibilities, information gaps, market structures, social norms, or weak representation?',
  },
  women_water_context: {
    clue: 'Rights-holder group with strong interest in water-service access, feedback, and response, in the context of household water responsibilities and water-service decisions.',
    role: 'Rights-holder group affected by water-service access, information, feedback, and response, in the context of household water responsibilities and water-service decisions.',
    implication: 'The design should ensure women can access water-service information, raise concerns safely, and see whether feedback leads to response.',
    question: 'What root causes affect water-service accountability: care burden, information flow, committee response, safety, cost, or weak feedback channels?',
  },
  persons_with_disabilities: {
    clue: 'Rights-holder group with strong interest in accessible participation, services, information, and feedback.',
    role: 'Rights-holder group affected by accessibility, accommodation, information, service access, and feedback channels.',
    implication: 'The design should strengthen accessibility and voice through accessible formats, reasonable accommodation, safe feedback, and inclusion in decision processes.',
    question: 'What root causes keep accessibility weak: limited budget, low awareness, inaccessible venues, weak standards, no accommodation process, or exclusion from consultation?',
  },
  youth_livelihood_opportunities: {
    clue: 'Rights-holder group with strong interest in training, livelihood opportunities, market access, and follow-up.',
    role: 'Rights-holder group affected by training relevance, market access, livelihood opportunity, and follow-up.',
    implication: 'The design should strengthen youth voice in livelihood choices and clarify the pathway from training to practical opportunity.',
    question: 'What root causes weaken the livelihood pathway: weak market analysis, limited follow-up, low decision influence, resource gaps, or mismatch between training and opportunity?',
  },
  low_income_households: {
    clue: 'Rights-holder group with strong interest in affordability, access, transport, service quality, and follow-up.',
    role: 'Rights-holder group affected by affordability, transport, service access, participation costs, and follow-up.',
    implication: 'The design should reduce cost and access barriers so low-income households are not excluded by hidden participation or service costs.',
    question: 'What root causes create cost barriers: service fees, transport, distance, unpaid participation time, or lack of access support?',
  },
  remote_kebele_communities: {
    clue: 'Rights-holder group with strong interest in equal information, access, outreach, and follow-up.',
    role: 'Rights-holder group affected by distance, late information, transport barriers, indirect representation, and weak follow-up.',
    implication: 'The design should decentralize information and participation, reach remote groups before decisions are finalized, and strengthen follow-up channels.',
    question: 'What root causes keep remote communities less influential: distance, communication systems, centralized meetings, weak outreach, or representation gaps?',
  },
  informal_workers: {
    clue: 'Rights-holder group that may be affected by market or service decisions but may have low recognition or low influence.',
    role: 'Rights-holder group affected by livelihood recognition, information, market/service decisions, and safe participation.',
    implication: 'The design should recognize informal workers safely, avoid livelihood harm, and create flexible ways for them to influence relevant decisions.',
    question: 'What root causes keep informal workers outside planning: social status, informality, fear of exposure, income risk, or weak representation?',
  },
  awra_cso_team: {
    clue: 'Supportive CSO actor that can facilitate, connect, document non-sensitive barriers, support participation, monitor commitments, and advocate safely, but should not replace public or service actors.',
    role: 'CSO facilitator, connector, evidence user, monitor, capacity supporter, and safe advocate.',
    implication: 'Awra should support participation, accessibility, evidence use, and feedback without taking over the role of public or service actors.',
    question: 'What capacity does Awra need to support change safely: facilitation, accessibility, evidence handling, dialogue, advocacy, or monitoring?',
  },
  informal_brokers_gatekeepers: {
    clue: 'Informal influence actor that may control information, access, trust, or who is heard. Handle carefully.',
    role: 'Informal influence actor that may control information, access, trust, or who is heard.',
    implication: 'The design should handle this actor carefully, avoid reinforcing gatekeeping, and create safer channels for rights-holder voice.',
    question: 'What root causes give this actor influence: information control, social norms, weak transparency, dependency, or lack of alternative channels?',
  },
  partner_support_organization: {
    clue: 'Technical or resource-support actor that can help with capacity, facilitation, accessibility, or learning support.',
    role: 'Technical or resource-support actor that may support capacity, facilitation, accessibility, learning, or coordination.',
    implication: 'The design should use partner support to strengthen local actors and rights-holder voice, not to dominate the process.',
    question: 'What capacity gaps can this actor help address without weakening local ownership?',
  },
};

function getScreen9ActorContent(actor: Module3Actor) {
  return screen9ActorContent[actor.actorId] || {
    clue: 'Generalized actor role connected to the Jiru Amba design.',
    role: actorCategoryLabels[actor.category],
    implication: 'The design should clarify how this role affects decisions, information, trust, access, or follow-up.',
    question: 'What root cause or capacity gap explains this power pattern?',
  };
}

function getDefaultActorRating(actor: Module3Actor): Screen9ActorRating {
  const content = getScreen9ActorContent(actor);
  const isRightsHolder = actor.category === 'rights_holder_group';
  const isPublicOrService = actor.category === 'primary_public_responsibility' || actor.category === 'service_or_local_implementation';
  const isGatekeeper = actor.category === 'careful_engagement_actor' || actor.actorId.includes('gatekeeper');
  const isSupport = actor.category === 'cso_role' || actor.category === 'support_ally_actor' || actor.category === 'rights_holder_voice_support';
  return {
    actorId: actor.actorId,
    actorLabel: actor.label,
    category: actor.category,
    roleFromResponsibilityMap: content.role,
    influenceLevel: isPublicOrService || isGatekeeper ? 'high' : isSupport ? 'medium' : 'low',
    supportInterestLevel: isRightsHolder || isSupport ? 'high' : isGatekeeper ? 'uncertain' : 'uncertain',
    likelyChangeRole: isRightsHolder ? 'low_power_rights_holder_group' : isGatekeeper ? 'gatekeeper' : isPublicOrService ? 'responsible_actor_needing_engagement' : isSupport ? 'support_actor' : 'undecided_actor',
    engagementApproach: isRightsHolder ? 'strengthen_voice_safely' : isGatekeeper ? 'engage_carefully' : isPublicOrService ? 'work_closely' : isSupport ? 'support_capacity' : 'keep_informed',
    designImplication: content.implication,
    questionForScreen10: content.question,
  };
}

function createEmptyActorRating(actor: Module3Actor): Screen9ActorRating {
  const defaultRating = getDefaultActorRating(actor);
  return {
    actorId: actor.actorId,
    actorLabel: actor.label,
    category: actor.category,
    roleFromResponsibilityMap: defaultRating.roleFromResponsibilityMap,
    influenceLevel: '',
    supportInterestLevel: '',
    likelyChangeRole: '',
    engagementApproach: '',
    designImplication: defaultRating.designImplication,
    questionForScreen10: defaultRating.questionForScreen10,
  };
}

function isScreen9RatingComplete(rating: Screen9ActorRating) {
  return Boolean(
    rating.influenceLevel &&
      rating.supportInterestLevel &&
      rating.likelyChangeRole &&
      rating.engagementApproach,
  );
}

function influenceScore(value: Screen9InfluenceLevel | '') {
  if (value === 'high') return 3;
  if (value === 'medium') return 2;
  if (value === 'low') return 1;
  return 0;
}

function getPowerMapZone(rating: Screen9ActorRating): Screen9PowerMapZone['zoneId'] {
  const score = influenceScore(rating.influenceLevel);
  if (score === 3 && rating.supportInterestLevel === 'high') return 'work_closely';
  if (score === 3 && rating.supportInterestLevel !== 'high') return 'engage_carefully';
  if (score <= 2 && rating.supportInterestLevel === 'high') return 'strengthen_voice';
  return 'monitor_lightly';
}

const powerMapZoneLabels: Record<Screen9PowerMapZone['zoneId'], string> = {
  work_closely: 'High influence / high support or interest',
  engage_carefully: 'High influence / uncertain or low support',
  strengthen_voice: 'Low or medium influence / high support or interest',
  monitor_lightly: 'Low or medium influence / low support or interest',
};

const powerMapZoneInterpretations: Record<Screen9PowerMapZone['zoneId'], string> = {
  work_closely: 'These actors can help move change. Engage them early and clearly.',
  engage_carefully: 'These actors can block, delay, filter, or weaken change. Build interest, clarify benefits, and reduce risk.',
  strengthen_voice: 'Rights-holder groups or allies may care deeply but lack power. Support participation and collective voice safely.',
  monitor_lightly: 'Keep aware, but do not spend most effort here unless their role changes.',
};

function generatePowerMapZones(ratings: Screen9ActorRating[]): Screen9PowerMapZone[] {
  const zones: Screen9PowerMapZone[] = [
    { zoneId: 'work_closely', zoneLabel: powerMapZoneLabels.work_closely, actorIds: [] },
    { zoneId: 'engage_carefully', zoneLabel: powerMapZoneLabels.engage_carefully, actorIds: [] },
    { zoneId: 'strengthen_voice', zoneLabel: powerMapZoneLabels.strengthen_voice, actorIds: [] },
    { zoneId: 'monitor_lightly', zoneLabel: powerMapZoneLabels.monitor_lightly, actorIds: [] },
  ];

  ratings.forEach((rating) => {
    const zone = zones.find((item) => item.zoneId === getPowerMapZone(rating));
    zone?.actorIds.push(rating.actorId);
  });

  return zones;
}

function getScreen9RoleLabel(role: LikelyChangeRole | '') {
  return likelyRoleOptions.find((option) => option.id === role)?.label || 'Not selected';
}

function getScreen9ApproachLabel(approach: Screen9EngagementApproach | '') {
  return screen9EngagementApproachOptions.find((option) => option.value === approach)?.label || 'Not selected';
}

function getScreen9InfluenceLabel(value: Screen9InfluenceLevel | '') {
  return screen9InfluenceOptions.find((option) => option.value === value)?.label || 'Not rated';
}

function getScreen9SupportLabel(value: Screen9SupportLevel | '') {
  return screen9SupportOptions.find((option) => option.value === value)?.label || 'Not rated';
}

function getScreen9SummaryMessages(ratings: Screen9ActorRating[]) {
  const messages: string[] = [];
  if (ratings.some((rating) => rating.category === 'rights_holder_group' && rating.influenceLevel === 'low' && rating.supportInterestLevel === 'high')) {
    messages.push('Rights-holder voice needs strengthening. Your map shows that some affected groups care strongly about the issue but may have limited influence over decisions. The design should include safer, earlier, and more accessible ways for them to shape priorities.');
  }
  if (ratings.some((rating) => rating.influenceLevel === 'high' && rating.supportInterestLevel !== 'high')) {
    messages.push('Careful engagement is needed. Your map includes actors who can enable or block change. The design should use constructive dialogue, clear evidence, and risk-aware engagement.');
  }
  if (ratings.some((rating) => rating.likelyChangeRole === 'gatekeeper')) {
    messages.push('Gatekeeping may affect inclusion. The design should avoid relying on one channel for participation or information. It should create safer and more diverse ways for affected groups to be heard.');
  }
  if (messages.length === 0) messages.push('Your map shows where engagement can support change and where the design should strengthen safe participation.');
  return messages;
}

function deriveScreen9Feedback(ratings: Screen9ActorRating[], hasUnsafeLabel: boolean): {
  detectedInsights: Screen9Submission['detectedInsights'];
  feedbackLevel: Screen9FeedbackLevel;
  warnings: string[];
} {
  const includesPublicOrService = ratings.some((rating) => rating.category === 'primary_public_responsibility' || rating.category === 'service_or_local_implementation');
  const includesRightsHolder = ratings.some((rating) => rating.category === 'rights_holder_group');
  const includesCsoRole = ratings.some((rating) => rating.category === 'cso_role');
  const includesSupportOrCommunity = ratings.some((rating) =>
    ['cso_role', 'support_ally_actor', 'community_influence_actor', 'rights_holder_voice_support', 'careful_engagement_actor'].includes(rating.category),
  );
  const hasHighInterestLowInfluenceRightsHolder = ratings.some((rating) =>
    rating.category === 'rights_holder_group' &&
    (rating.influenceLevel === 'low' || rating.influenceLevel === 'medium') &&
    rating.supportInterestLevel === 'high',
  );
  const hasHighInfluenceLowOrUncertainSupport = ratings.some((rating) =>
    rating.influenceLevel === 'high' && rating.supportInterestLevel !== 'high',
  );
  const hasGatekeeper = ratings.some((rating) => rating.likelyChangeRole === 'gatekeeper' || rating.likelyChangeRole === 'blocker');
  const hasCsoOverloadRisk = includesCsoRole && !includesPublicOrService;
  const hasHighOrMediumInfluence = ratings.some((rating) => rating.influenceLevel === 'high' || rating.influenceLevel === 'medium');
  const missingRatings = ratings.some((rating) => !isScreen9RatingComplete(rating));

  const detectedInsights = {
    hasHighInterestLowInfluenceRightsHolder,
    hasHighInfluenceLowOrUncertainSupport,
    hasGatekeeper,
    hasCsoOverloadRisk,
    hasUnsafeLabel: hasUnsafeLabel,
  };
  const feedbackLevel: Screen9FeedbackLevel = hasUnsafeLabel
    ? 'unsafe_label'
    : hasCsoOverloadRisk
      ? 'responsibility_gap'
      : !includesRightsHolder
        ? 'voice_gap'
        : !hasHighOrMediumInfluence
          ? 'power_concentration'
          : includesPublicOrService && includesRightsHolder && includesSupportOrCommunity && !missingRatings
            ? 'strong'
            : 'good_with_gap';
  const warnings: string[] = [];

  if (!includesRightsHolder) warnings.push('Your map does not yet show the affected rights-holder group. Add the group whose voice or influence should be strengthened safely.');
  if (!includesPublicOrService) warnings.push('Your map does not yet include an actor who can change decisions, resources, information, access, or follow-up. Add the responsible public or service actor connected to this barrier.');
  if (hasCsoOverloadRisk) warnings.push('This map gives too much influence to the CSO. Awra can facilitate, connect, monitor, and advocate safely, but it may not control the service, budget, or public decision. Add the actor with formal or practical influence.');
  if (missingRatings) warnings.push('Complete influence, support or interest, likely role, and engagement approach for each selected actor.');
  if (!hasHighOrMediumInfluence) warnings.push('Your map does not yet include an actor who can change decisions, resources, information, access, or follow-up. Add the actor with practical influence over this barrier.');
  if (hasGatekeeper) warnings.push('Handle carefully. Use constructive, non-accusatory engagement and avoid exposing individuals or sensitive complaints.');
  if (hasHighInterestLowInfluenceRightsHolder) warnings.push('Strengthen voice safely. Do not treat low influence as lack of importance. It is a design issue that the project should address.');
  if (hasUnsafeLabel) warnings.push('Keep this safe. Do not name real officials, make accusations, write confidential political details, or record sensitive complaints. Use role categories and the Jiru Amba learning case.');

  return { detectedInsights, feedbackLevel, warnings: warnings.slice(0, 4) };
}

function getScreen8FeedbackCopy(feedbackLevel: Screen8FeedbackLevel) {
  if (feedbackLevel === 'strong') {
    return 'Strong responsibility map. You included public or service responsibility, supporting actors, a realistic CSO role, and a capacity gap. This helps avoid overloading the CSO and prepares the next power analysis.';
  }
  if (feedbackLevel === 'good_with_gap') {
    return 'Good start, but the map needs a capacity gap. Ask what may prevent the actor from responding well: mandate clarity, budget, coordination, accessibility knowledge, trust, or feedback procedures.';
  }
  if (feedbackLevel === 'cso_overload') {
    return 'Your map gives too much responsibility to the CSO. In HRBA design, the CSO can facilitate, support, monitor, connect, and advocate safely, but it should not replace public or service actors. Add the actor who has responsibility for the service, decision, information, or feedback process.';
  }
  if (feedbackLevel === 'missing_responsibility') {
    return 'Your map does not yet show a duty-bearer or responsible service actor. Add the public or service actor connected to this barrier before continuing.';
  }
  return 'Your map is broad. Focus on the actors whose role changes the design: who must act, who can support rights-holder voice, and what the CSO can realistically do.';
}

function getScreen9FeedbackCopy(feedbackLevel: Screen9FeedbackLevel) {
  if (feedbackLevel === 'strong') {
    return 'Strong power map. You identified actors with formal responsibility, actors with practical influence, and rights-holder groups whose voice may need strengthening. Your design should now use this analysis to engage high-influence actors safely and strengthen rights-holder participation.';
  }
  if (feedbackLevel === 'good_with_gap') {
    return 'Good start. Strengthen the map by checking whether it includes a rights-holder group, a public or service actor, and a CSO, support, or community influence actor.';
  }
  if (feedbackLevel === 'voice_gap') {
    return 'Your map focuses on actors but does not show the affected rights-holder group. Add the group whose voice should be strengthened safely.';
  }
  if (feedbackLevel === 'responsibility_gap') {
    return 'Your map gives too much influence to the CSO. Awra can facilitate, connect, monitor, and advocate safely, but it may not control the service, budget, or public decision. Add the actor with formal or practical influence.';
  }
  if (feedbackLevel === 'power_concentration') {
    return 'Your map does not yet include an actor who can change decisions, resources, information, access, or follow-up. Add the actor with practical influence over this barrier.';
  }
  if (feedbackLevel === 'unsafe_label') {
    return 'Keep this safe. Do not name real officials, make accusations, write confidential political details, or record sensitive complaints. Use role categories and the Jiru Amba learning case.';
  }
  return 'Use the map to focus: who can enable change, who may block or delay it, whose voice needs strengthening, and what should be explored next?';
}

function getEmptyScreen9OwnCsoDraft(): Screen9OwnCsoDraft {
  return {
    projectIssueOrBarrier: '',
    actorOrRoleCategory: '',
    formalResponsibility: '',
    practicalInfluence: '',
    supportOrInterest: '',
    likelyRole: '',
    safeEngagementApproach: '',
    designImplication: '',
    rootCauseQuestion: '',
    safetyNote: '',
  };
}

function hasUnsafePowerMapDetail(value: string) {
  const hasLikelyFullName = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/.test(value);
  const hasSensitiveDetail = /\b(\d{2,}|survivor|rape|assault|HIV|diagnosis|medical record|complaint against|accused|killed|beaten|confidential political)\b/i.test(value);
  return hasLikelyFullName || hasSensitiveDetail;
}

const powerInfluenceMapTemplateMarkdown = `# Power and Influence Map Template

Use this template after your duty-bearer and actor responsibility map. It helps your CSO identify who can enable change, who may block or delay it, whose voice should be strengthened, and what should be explored next.

## Safety reminder

Do not enter real names, exact sensitive locations, complaint details, survivor stories, political accusations, confidential political details, or identifiable personal information.

## 1. Project issue or barrier

What issue or barrier are you analyzing?

## 2. Actor or role category

Which actor or role category is connected to this issue?

Examples:

- public planning actor;
- sector office;
- service committee;
- community representative;
- rights-holder group;
- informal gatekeeper;
- CSO facilitator;
- support organization.

## 3. Formal responsibility, if any

Does this actor have a formal responsibility, service role, or public function connected to the issue?

## 4. Practical influence

How much can this actor shape decisions, resources, information, trust, access, or follow-up?

- Low influence
- Medium influence
- High influence

## 5. Support or interest

How likely is this actor to support change, resist it, ignore it, or be strongly affected by it?

- Low support / low interest
- Uncertain or mixed
- High support / high interest

## 6. Likely role in change

Choose the closest role:

- enabler;
- blocker;
- gatekeeper;
- ally;
- undecided actor;
- low-power rights-holder group;
- responsible actor needing engagement;
- support actor;
- other: ______.

## 7. Engagement approach

Choose the safest and most useful approach:

- work closely;
- engage carefully;
- strengthen voice safely;
- keep informed;
- monitor lightly;
- build interest;
- reduce risk before engagement;
- support capacity;
- other: ______.

## 8. Design implication

What should change in the project design because of this power pattern?

## 9. Risk or sensitivity note

What should be handled carefully?

## 10. Carry-forward question for root-cause analysis

What should be explored next?

Examples:

- Why does this group have low influence?
- Why does this actor control information?
- Why may this actor resist change?
- What capacity gap affects response?
- What local norms or systems keep the barrier in place?
`;

function buildPowerInfluenceMapTemplateHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Power and Influence Map Template</title></head><body>${powerInfluenceMapTemplateMarkdown
    .split('\n')
    .map((line) => {
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('- ')) return `<p>${line}</p>`;
      return line.trim() ? `<p>${line}</p>` : '';
    })
    .join('')}</body></html>`;
}

function getScreen10LayerCounts(selections: Record<string, ProblemLayerId | undefined>) {
  const values = screen10Statements.map((statement) => selections[statement.id]).filter(Boolean) as ProblemLayerId[];
  return {
    visibleCount: values.filter((layer) => layer === 'visible').length,
    directCount: values.filter((layer) => layer === 'direct').length,
    rootCount: values.filter((layer) => layer === 'root').length,
    capacityCount: values.filter((layer) => layer === 'capacity').length,
  };
}

function getScreen10AlignedCount(selections: Record<string, ProblemLayerId | undefined>) {
  return screen10Statements.filter((statement) => selections[statement.id] === statement.suggestedLayer).length;
}

function getScreen10FeedbackState(selections: Record<string, ProblemLayerId | undefined>): Screen10FeedbackState {
  const { visibleCount, directCount, rootCount, capacityCount } = getScreen10LayerCounts(selections);
  const alignedCount = getScreen10AlignedCount(selections);
  const hasAllLayers = visibleCount > 0 && directCount > 0 && rootCount > 0 && capacityCount > 0;

  if (capacityCount === 0) return 'capacity_missing';
  if (visibleCount >= 6) return 'visible_heavy';
  if (rootCount >= 7) return 'root_heavy';
  if (directCount === 0 || rootCount === 0) return 'activity_jump';
  if (alignedCount >= 9 && hasAllLayers === true) return 'strong';
  return 'needs_refinement';
}

function getScreen10Warnings(selections: Record<string, ProblemLayerId | undefined>) {
  const { visibleCount, directCount, rootCount, capacityCount } = getScreen10LayerCounts(selections);
  const alignedCount = getScreen10AlignedCount(selections);
  const warnings: string[] = [];

  if (visibleCount >= 6) warnings.push(screen10Warnings.visibleHeavy);
  if (directCount === 0) warnings.push(screen10Warnings.directMissing);
  if (rootCount === 0) warnings.push(screen10Warnings.rootMissing);
  if (capacityCount === 0) warnings.push(screen10Warnings.capacityMissing);
  if (alignedCount <= 6) warnings.push(screen10Warnings.lowAlignment);
  if (capacityCount >= 7) warnings.push(screen10Warnings.capacityHeavy);

  return warnings.slice(0, 3);
}

function getScreen10GroupedStatements(selections: Record<string, ProblemLayerId | undefined>) {
  return {
    visible: screen10Statements.filter((statement) => selections[statement.id] === 'visible'),
    direct: screen10Statements.filter((statement) => selections[statement.id] === 'direct'),
    root: screen10Statements.filter((statement) => selections[statement.id] === 'root'),
    capacity: screen10Statements.filter((statement) => selections[statement.id] === 'capacity'),
  };
}

function getScreen10RootCauseSummary(feedbackState: Screen10FeedbackState) {
  if (feedbackState === 'strong') {
    return 'The Jiru Amba design problem is not only a weak activity package. The case suggests visible participation gaps, direct causes in how consultation and feedback were organized, deeper power and planning patterns, and capacity gaps in turning consultation findings into design changes.';
  }
  return screen10FeedbackText[feedbackState];
}

function getScreen10ValidationMessages(selections: Record<string, ProblemLayerId | undefined>) {
  const classifiedCount = screen10Statements.filter((statement) => selections[statement.id]).length;
  const { visibleCount, directCount, rootCount, capacityCount } = getScreen10LayerCounts(selections);
  const messages: string[] = [];
  if (classifiedCount < screen10Statements.length) {
    messages.push('Please classify the Jiru Amba statements before generating the problem layers canvas. A useful diagnosis needs visible signs, direct causes, root causes, and capacity gaps.');
    return messages;
  }
  if (visibleCount === 0 || directCount === 0 || rootCount === 0 || capacityCount === 0) {
    messages.push('Your map is missing one layer. Check whether you have included at least one visible sign, one direct cause, one deeper/root cause, and one capacity gap.');
  }
  if (rootCount >= 7) {
    messages.push('Not everything is a root cause. Separate what is visible, what directly caused the problem, what keeps it in place, and what capacity must be strengthened.');
  }
  if (capacityCount === 0) {
    messages.push('Add a capacity gap. Ask who needs what capacity: rights-holders, duty-bearers, service actors, CSO facilitators, or coordination systems.');
  }
  return messages;
}

function buildScreen10Submission(
  selections: Record<string, ProblemLayerId | undefined>,
  ownCsoOutput: Screen10OwnCsoOutput | null,
): Screen10Submission {
  const grouped = getScreen10GroupedStatements(selections);
  const feedbackState = getScreen10FeedbackState(selections);
  const diagnosisInterpretation = screen10SuggestionText[feedbackState];
  const designImplications = screen10GeneratedPatterns.map((pattern) => pattern.designImplication);
  const questionsForLaterDesignRepair = screen10GeneratedPatterns.map((pattern) => pattern.questionForLaterDesignRepair);
  return {
    screenId: 'M3-R10',
    completed: true,
    submittedAt: new Date().toISOString(),
    problemLayerSelections: screen10Statements.map((statement) => ({
      statementId: statement.id,
      statement: statement.statement,
      selectedLayer: selections[statement.id] as ProblemLayerId,
      suggestedLayer: statement.suggestedLayer,
      aligned: selections[statement.id] === statement.suggestedLayer,
    })),
    problemLayers: {
      visibleSigns: grouped.visible.map((statement) => statement.statement),
      directCauses: grouped.direct.map((statement) => statement.statement),
      deeperRootCauses: grouped.root.map((statement) => statement.statement),
      capacityGaps: grouped.capacity.map((statement) => statement.statement),
    },
    generatedProblemLayersCanvas: screen10GeneratedPatterns,
    rootCauseCapacityGapMap: {
      learnerClassifications: screen10Statements.map((statement) => ({
        statementId: statement.id,
        statement: statement.statement,
        selectedLayer: selections[statement.id] as ProblemLayerId,
        suggestedLayer: statement.suggestedLayer,
        aligned: selections[statement.id] === statement.suggestedLayer,
      })),
      visibleSigns: grouped.visible.map((statement) => statement.statement),
      directCauses: grouped.direct.map((statement) => statement.statement),
      deeperRootCauses: grouped.root.map((statement) => statement.statement),
      capacityGaps: grouped.capacity.map((statement) => statement.statement),
      generatedProblemLayersCanvas: screen10GeneratedPatterns,
      designImplications,
      questionsForLaterDesignRepair,
      diagnosisInterpretation,
      safetyConfirmation: 'This learning output uses generalized Jiru Amba case statements and safe pattern language. It is not a formal assessment or investigation.',
    },
    alignedCount: getScreen10AlignedCount(selections),
    feedbackState,
    diagnosisInterpretation,
    rootCauseSummary: getScreen10RootCauseSummary(feedbackState),
    ownCsoPracticeOutput: ownCsoOutput || undefined,
    portfolioSummary: screen10PortfolioSummary,
    carryForward: {
      snapshotField: 'rootCauseCapacityGapMap',
      issue: 'The Jiru Amba design should not only add activities. It should address the patterns that keep barriers in place: unequal influence, weak feedback response, unclear responsibility, accessibility gaps, information barriers, and weak use of evidence.',
      nextUse: 'Use this diagnosis in the next screens to strengthen gender and disability design, participation and accountability, risk and do-no-harm, objectives, activities, intervention logic, indicators, and evidence.',
    },
  };
}

function getScreen11ClassifiedCount(classifications: Partial<Record<M3Screen11SignalId, InclusionStatus>>) {
  return screen11Signals.filter((signal) => classifications[signal.id]).length;
}

function getScreen11HelperText(
  classifications: Partial<Record<M3Screen11SignalId, InclusionStatus>>,
  selectedRepairs: M3Screen11RepairId[],
  limitMessage: string,
) {
  if (limitMessage) return limitMessage;
  const classifiedCount = getScreen11ClassifiedCount(classifications);
  if (classifiedCount < screen11Signals.length) return 'Please classify each design signal before generating the dashboard. A useful check needs to show what is missing, what is only mentioned, and what is built into the design.';
  if (selectedRepairs.length === 0) return 'Add at least two design repairs. A gender and disability check is useful only if it changes what the project will do.';
  if (selectedRepairs.length === 1) return 'Select at least two repairs. Try to include one repair linked to gendered barriers or influence and one repair linked to disability accessibility or reasonable accommodation.';
  const values = Object.values(classifications);
  if (values.length === screen11Signals.length && values.every((value) => value === 'built')) return 'Check again. Naming, inviting, or counting a group is not the same as building gender and disability into the design.';
  return 'Ready to generate your Gender and Disability Marker Lite Dashboard.';
}

function getScreen11GenderStatus(classifications: Record<M3Screen11SignalId, InclusionStatus>): Screen11GenderStatus {
  const relevant = ['meetingInvitation', 'meetingTimeVenue', 'womensInfluence', 'feedbackChannels', 'indicatorsFollowUp'] as M3Screen11SignalId[];
  const builtCount = relevant.filter((id) => classifications[id] === 'built').length;
  const missingCount = relevant.filter((id) => classifications[id] === 'missing').length;
  const mentionedCount = relevant.filter((id) => classifications[id] === 'mentioned').length;
  if (builtCount >= 3) return 'strongerDesign';
  if (missingCount >= 2) return 'needsDesignRepair';
  if (mentionedCount >= 2 && builtCount < 3) return 'visibleNotBuiltIn';
  return 'needsDesignRepair';
}

function getScreen11DisabilityStatus(classifications: Record<M3Screen11SignalId, InclusionStatus>): Screen11DisabilityStatus {
  const relevant = ['meetingInvitation', 'meetingTimeVenue', 'disabilityAccessibility', 'feedbackChannels', 'indicatorsFollowUp'] as M3Screen11SignalId[];
  const otherBuiltCount = relevant.filter((id) => id !== 'disabilityAccessibility' && classifications[id] === 'built').length;
  const missingCount = relevant.filter((id) => classifications[id] === 'missing').length;
  if (classifications.disabilityAccessibility !== 'built' || missingCount >= 2) return 'needsDesignRepair';
  if (otherBuiltCount >= 2) return 'strongerDesign';
  return 'partlyBuiltIn';
}

function getScreen11FeedbackState(
  classifications: Record<M3Screen11SignalId, InclusionStatus>,
  selectedRepairs: M3Screen11RepairId[],
): Screen11FeedbackState {
  const values = screen11Signals.map((signal) => classifications[signal.id]);
  const selectedRepairDetails = screen11Repairs.filter((repair) => selectedRepairs.includes(repair.id));
  const hasGenderRepair = selectedRepairDetails.some((repair) => repair.tags.includes('gender'));
  const hasDisabilityRepair = selectedRepairDetails.some((repair) => repair.tags.includes('disability'));
  const mentionedOrMissingCount = values.filter((value) => value === 'mentioned' || value === 'missing').length;
  if (selectedRepairs.length === 0) return 'missingRepair';
  if (!hasDisabilityRepair) return 'disabilityAccessGap';
  if (!hasGenderRepair) return 'genderInfluenceGap';
  if (values.every((value) => value === 'built')) return 'tokenism';
  if (mentionedOrMissingCount >= 3 && selectedRepairs.length >= 2) return 'strongerInclusionDesign';
  return 'mixedPattern';
}

function getScreen11Warnings(classifications: Record<M3Screen11SignalId, InclusionStatus>) {
  return screen11Warnings
    .filter((warning) => classifications[warning.signalId] === 'missing' || classifications[warning.signalId] === 'mentioned')
    .slice(0, 3);
}

function getScreen11StatusDescription(kind: 'gender' | 'disability', status: Screen11GenderStatus | Screen11DisabilityStatus) {
  if (kind === 'gender') {
    if (status === 'strongerDesign') return 'Gender inclusion is visible in several design areas. Keep checking whether women and girls can influence decisions, not only attend activities.';
    if (status === 'visibleNotBuiltIn') return 'Gender is named, but the design still needs stronger action on barriers, influence, budget, indicators, or follow-up.';
    return 'Gendered barriers are not yet sufficiently built into the design. Repair the design before implementation.';
  }
  if (status === 'strongerDesign') return 'Disability inclusion is built into practical design areas such as accessibility, accommodation, information, and follow-up.';
  if (status === 'partlyBuiltIn') return 'Accessibility is visible, but the design still needs stronger links to participation, feedback, indicators, or responsibility.';
  return 'Disability is not yet sufficiently built into the design. Check accessibility, reasonable accommodation, communication, feedback, and budget.';
}

function getScreen11StatusLabel(status: Screen11GenderStatus | Screen11DisabilityStatus) {
  if (status === 'strongerDesign') return 'Stronger design';
  if (status === 'visibleNotBuiltIn') return 'Visible but not yet built in';
  if (status === 'partlyBuiltIn') return 'Partly built in';
  return 'Needs design repair';
}

function buildScreen11Submission(
  classifications: Partial<Record<M3Screen11SignalId, InclusionStatus>>,
  selectedRepairs: M3Screen11RepairId[],
  ownCsoOutput: Screen11OwnCsoOutput | null,
): Screen11Submission {
  const completeClassifications = Object.fromEntries(
    screen11Signals.map((signal) => [signal.id, classifications[signal.id] as InclusionStatus]),
  ) as Record<M3Screen11SignalId, InclusionStatus>;
  const genderDesignStatus = getScreen11GenderStatus(completeClassifications);
  const disabilityDesignStatus = getScreen11DisabilityStatus(completeClassifications);
  const primaryFeedbackState = getScreen11FeedbackState(completeClassifications, selectedRepairs);
  const selectedRepairRows = screen11Repairs
    .filter((repair) => selectedRepairs.includes(repair.id))
    .map((repair) => ({
      repairSelected: repair.title,
      whyItMatters: repair.whyItMatters,
      whereToUseItNext: repair.laterUse,
    }));
  return {
    screenId: 'M3-R11',
    route: '/module-3/screen-3-11',
    title: 'Gender and Disability Design Check',
    classifications: completeClassifications,
    selectedRepairs,
    markerLiteDashboard: {
      rows: screen11DashboardRows,
      selectedRepairRows,
      dashboardInterpretation: screen11FeedbackText[primaryFeedbackState].text,
      safetyConfirmation: 'This learning output uses generalized Jiru Amba case content and safe pattern language. It is not formal donor marker scoring.',
    },
    genderDesignStatus,
    disabilityDesignStatus,
    primaryFeedbackState,
    warningIds: getScreen11Warnings(completeClassifications).map((warning) => warning.id),
    carryForwardQuestion: 'Who needs to participate, what support do they need to participate safely, how can they influence decisions, and how will they receive feedback?',
    ownCsoPracticeOutput: ownCsoOutput || undefined,
    portfolioSummary: screen11PortfolioSummary,
    savedAt: new Date().toISOString(),
  };
}

function getScreen12RequiredSignature(selection: Screen12PathwaySelection, ownCsoOutput: Screen12OwnCsoOutput | null) {
  return JSON.stringify({ selection, ownCsoOutput });
}

function isScreen12Valid(selection: Screen12PathwaySelection) {
  const hasSafeCustomGroup = selection.group !== 'Another generalized group'
    || Boolean(selection.customGroup?.trim() && !hasUnsafeLearningDetail(selection.customGroup));
  return Boolean(
    selection.group &&
    hasSafeCustomGroup &&
    selection.gap &&
    selection.decision &&
    selection.supports.length >= 1 &&
    selection.responseChannel &&
    selection.responsibleActor &&
    selection.designAdjustment
  );
}

function getScreen12HelperText(
  selection: Screen12PathwaySelection,
  submitted: boolean,
  formChanged: boolean,
  limitMessage = '',
) {
  if (submitted && formChanged) return 'Update your pathway before saving this screen.';
  if (submitted) return 'Your participation and accountability pathway is ready to save.';
  if (limitMessage) return limitMessage;
  if (!selection.group) return 'Please select a specific rights-holder group. A useful pathway starts with who needs stronger participation or accountability.';
  if (selection.group === 'Another generalized group' && !selection.customGroup?.trim()) return 'Use a generalized group label only. Do not enter real names, exact sensitive locations, complaint details, or identifiable personal information.';
  if (selection.group === 'Another generalized group' && hasUnsafeLearningDetail(selection.customGroup || '')) return 'Keep this safe. Do not enter names, complaint details, exact sensitive locations, disability details, accusations, survivor stories, or identifiable information. Use the Jiru Amba case and generalized role categories.';
  if (!selection.gap) return 'Select the participation or accountability gap this pathway should address.';
  if (!selection.decision) return 'Please select the decision this group should influence. Participation is meaningful when people shape a decision before it is finalized.';
  if (selection.supports.length === 0) return 'Please select what support makes participation realistic. Information, timing, access, safety, language, care work, transport, or accessibility barriers may need attention.';
  if (!selection.responseChannel) return 'Choose how feedback, concerns, or questions will receive a response.';
  if (!selection.responsibleActor) return 'Feedback collection is not accountability by itself. Add who responds, how they respond, and how people know what changed.';
  if (!selection.designAdjustment) return 'Choose the design adjustment this pathway should carry forward.';
  return 'Ready to generate your participation and accountability pathway.';
}

function getScreen12DisplayGroup(selection: Screen12PathwaySelection) {
  return selection.group === 'Another generalized group' && selection.customGroup?.trim()
    ? selection.customGroup.trim()
    : selection.group;
}

function getScreen12InfluenceMethod(selection: Screen12PathwaySelection) {
  const group = getScreen12DisplayGroup(selection);
  if (group === 'Women vendors affected by market changes') return 'Women vendors should review market barriers before ranking and budgeting, using timing and communication channels that fit livelihood realities.';
  if (group === 'Persons with disabilities') return 'Persons with disabilities should receive accessible information and have accessible ways to influence venue, service, feedback, and accommodation decisions.';
  if (group === 'People from remote kebeles') return 'Remote residents should receive information early and influence priorities before central-level decisions are finalized.';
  return 'The group should receive information before decisions are finalized, have a practical way to discuss priorities, and see how their input affects the final plan.';
}

function getScreen12ResponsibleActorText(selection: Screen12PathwaySelection) {
  if (selection.responsibleActor === 'Awra as facilitator only, with duty-bearer or service actor response') {
    return 'Awra can facilitate safely and document non-sensitive patterns, but the responsible public, service, committee, or sector actor connected to the decision must respond.';
  }
  return selection.responsibleActor;
}

function getScreen12FollowUpMeaning() {
  return 'The group should receive a simple update explaining what changed, what did not change, why, and what happens next.';
}

function getScreen12IndicatorQuestion(selection: Screen12PathwaySelection) {
  const group = getScreen12DisplayGroup(selection);
  if (group === 'Women vendors affected by market changes') return 'Can women vendors show at least one way their priorities changed the market improvement plan, without naming individuals?';
  if (group === 'Persons with disabilities') return 'Can persons with disabilities access information, participate, use feedback channels, and see whether accessibility concerns changed the plan?';
  if (group === 'People from remote kebeles') return 'Can remote residents receive information early enough and see whether their priorities influenced decisions before implementation?';
  if (group === 'Youth invited to livelihood training') return 'Can youth show how their livelihood priorities influenced training choices and follow-up support?';
  if (group === 'Women') return 'Can women see how water repair, fee information, or service concerns were answered, in the context of household water responsibilities and water-service decisions?';
  return 'Can the project show at least one way this group influenced the final decision, without naming individuals?';
}

function getScreen12Badges(selection: Screen12PathwaySelection) {
  const badges = ['Pathway drafted'];
  if (selection.gap.includes('Decisions are already shaped') || selection.gap.includes('dominate')) badges.push('Influence gap addressed');
  if (selection.gap.includes('Feedback is collected')) badges.push('Response loop added');
  if (selection.gap.includes('Complaint') || selection.gap.includes('safe')) badges.push('Safe channel needed');
  if (selection.supports.includes('Accessible venue and materials')) badges.push('Accessibility support included');
  if (selection.supports.includes('Separate pre-consultation with the group')) badges.push('Pre-consultation included');
  if (selection.responsibleActor === 'Awra as facilitator only, with duty-bearer or service actor response') badges.push('CSO role bounded');
  if (selection.responsibleActor && selection.responsibleActor !== 'Awra as facilitator only, with duty-bearer or service actor response') badges.push('Responsible actor named');
  return badges;
}

function getScreen12Feedback(selection: Screen12PathwaySelection) {
  const messages = ['This is a stronger HRBA design pathway because it connects voice, influence, response, and responsibility. The next step is to check whether any risks could still make this pathway unsafe, exclusionary, or unrealistic.'];
  if (selection.gap.includes('Decisions are already shaped') || selection.gap.includes('Meeting')) {
    messages.push('This is still too close to attendance unless the group influences a decision before it is finalized and receives response afterward.');
  }
  if (selection.gap.includes('Feedback is collected')) {
    messages.push('This is an accountability gap. Feedback only becomes useful when someone reviews it, responds to it, and explains what changed or why something could not change.');
  }
  if (selection.gap.includes('Complaint') || selection.responseChannel.includes('Feedback-response log')) {
    messages.push('Treat this carefully. Do not ask people to raise sensitive concerns publicly. Use safe, non-identifying channels and only collect the minimum information needed.');
  }
  if (selection.responsibleActor === 'Awra as facilitator only, with duty-bearer or service actor response') {
    messages.push('This keeps the CSO role realistic. Awra can facilitate, document, connect, and follow up, but it should not replace the duty-bearer or responsible service actor.');
  }
  return messages;
}

function getEmptyScreen12OwnCsoDraft(): Screen12OwnCsoDraft {
  return {
    projectIssueOrDecision: '',
    rightsHolderGroup: '',
    participationAccountabilityGap: '',
    decisionToInfluence: '',
    accessSupport: '',
    influenceMethod: '',
    responseChannel: '',
    responsibleActor: '',
    followUpMethod: '',
    designAdjustment: '',
    safeEvidenceOrIndicator: '',
  };
}

const participationAccountabilityPathwayTemplateMarkdown = `# Participation and Accountability Pathway Template

Use this template after your gender and disability design check. It helps your CSO design how rights-holders access information, influence decisions, receive response, and see what changed.

## Safety reminder

Do not enter real names, exact sensitive locations, complaint details, survivor stories, disability or medical details about specific people, political accusations, confidential political details, or identifiable personal information.

## 1. Project issue or decision

Which project, service, budget, activity, or follow-up decision is being designed?

## 2. Rights-holder group

Which specific group needs stronger participation or accountability?

Examples:

- women vendors;
- persons with disabilities;
- youth livelihood group;
- Women, in the context of household water responsibilities and water-service decisions;
- remote residents;
- informal workers;
- low-income households.

## 3. Participation or accountability gap

What makes participation or accountability weak?

Examples:

- information is late or unclear;
- decisions are already shaped;
- public meetings are not safe or practical;
- feedback is collected but no response is given;
- accessibility support is missing;
- people do not know what changed.

## 4. Decision they should influence

Which decision should this group influence before it is finalized?

## 5. Access support

What support makes participation realistic?

Examples:

- clear information before decisions;
- accessible materials;
- safe pre-consultation;
- timing adjusted for work, care, or travel;
- trusted facilitator;
- local participation option;
- plain-language explanation.

## 6. Influence method

How will the group shape the decision?

## 7. Response channel

How will feedback, concerns, or questions receive a response?

## 8. Responsible actor

Who should respond?

Include the actor connected to the decision, such as:

- planning office;
- sector office;
- service committee;
- market committee;
- water committee;
- health post management;
- project accountability actor;
- CSO facilitator in a support role.

## 9. Follow-up method

How will people know what changed, what did not change, why, and what happens next?

## 10. Design adjustment

What should change in the project design?

## 11. Safety note

What should be handled carefully?

## 12. Indicator or evidence question

What safe, non-identifying evidence can show whether this pathway worked?

Examples:

- Did the group influence a decision before finalization?
- Did people receive information early enough?
- Did feedback receive a response?
- Did people know what changed?
- Did the pathway work for people facing accessibility, distance, livelihood, or care-work barriers?

## 13. Carry-forward

Where should this pathway be used next?

- risk and do-no-harm board;
- activity package repair;
- intervention logic;
- indicators;
- final project design snapshot.
`;

function buildParticipationAccountabilityPathwayTemplateHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Participation and Accountability Pathway Template</title></head><body>${participationAccountabilityPathwayTemplateMarkdown
    .split('\n')
    .map((line) => {
      if (line.startsWith('# ')) return `<h1>${line.replace('# ', '')}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.replace('## ', '')}</h2>`;
      if (line.startsWith('- ')) return `<p>${line}</p>`;
      return line.trim() ? `<p>${line}</p>` : '<br>';
    })
    .join('')}</body></html>`;
}

function buildScreen12Submission(selection: Screen12PathwaySelection, ownCsoOutput: Screen12OwnCsoOutput | null): Screen12Submission {
  const displayGroup = getScreen12DisplayGroup(selection);
  return {
    screenId: 'M3-R12',
    route: '/module-3/screen-3-12',
    title: 'Participation and Accountability Pathway',
    participationAccountabilityPathway: {
      ...selection,
      rightsHolderGroup: displayGroup,
      participationAccountabilityGap: selection.gap,
      decisionToInfluence: selection.decision,
      accessSupport: selection.supports,
      influenceMethod: getScreen12InfluenceMethod(selection),
      responseChannel: selection.responseChannel,
      responsibleActor: getScreen12ResponsibleActorText(selection),
      followUpMethod: getScreen12FollowUpMeaning(),
      designAdjustment: selection.designAdjustment,
      safetyNote: screen12SafetyNote,
      indicatorEvidenceQuestion: getScreen12IndicatorQuestion(selection),
      followUpMeaning: getScreen12FollowUpMeaning(),
      badges: getScreen12Badges(selection),
    },
    feedbackMessages: getScreen12Feedback(selection),
    ownCsoPracticeOutput: ownCsoOutput || undefined,
    portfolioSummary: screen12PortfolioSummary,
    savedAt: new Date().toISOString(),
  };
}

function getEmptyRiskBoardSelection(): Screen13RiskBoardSelection {
  return {
    riskSituation: '',
    riskCategories: [],
    affectedGroups: [],
    impactLevel: '',
    mitigationActions: [],
    responsibleActor: '',
    watchSign: '',
    designAdjustment: '',
  };
}

function getEmptyScreen13OwnCsoDraft(): Screen13OwnCsoDraft {
  return {
    projectActivity: '',
    riskSituation: '',
    riskCategory: '',
    affectedGroup: '',
    impactLevel: '',
    mitigationAction: '',
    responsibleActor: '',
    watchSign: '',
    designAdjustment: '',
    safeEvidenceRule: '',
  };
}

function getScreen13RequiredSignature(selection: Screen13RiskBoardSelection, ownCsoOutput: Screen13OwnCsoOutput | null) {
  return JSON.stringify({ selection, ownCsoOutput });
}

function hasUnsafeLearningDetail(value: string) {
  return /\b([A-Z][a-z]+ [A-Z][a-z]+|\d{2,}|survivor|rape|assault|HIV|diagnosis|medical record|complaint against|accused|killed|beaten)\b/i.test(value);
}

function isScreen13ServiceOrPublicRisk(selection: Screen13RiskBoardSelection) {
  const combined = `${selection.riskSituation} ${selection.riskCategories.join(' ')} ${selection.designAdjustment}`.toLowerCase();
  return /service|public|water|market|health|accessibility|follow-up|follow up|response|committee|sector/.test(combined);
}

function isScreen13CsoOverload(selection: Screen13RiskBoardSelection) {
  return selection.responsibleActor === 'Awra as safe facilitator and non-sensitive documentation support' && isScreen13ServiceOrPublicRisk(selection);
}

function getScreen13ValidationMessages(selection: Screen13RiskBoardSelection) {
  const messages: string[] = [];
  if (!selection.riskSituation) messages.push('Please select one risk situation. A useful risk board starts with what could go wrong because of the design.');
  if (selection.riskCategories.length === 0) messages.push('Select at least one risk category so the board shows what type of harm, exclusion, or unrealistic assumption may occur.');
  if (selection.affectedGroups.length === 0) messages.push('Please identify who may be affected. A rights-based risk check should show who may face harm, exclusion, silence, or unrealistic expectations.');
  if (!selection.impactLevel) messages.push('Select an impact level. Rate impact from the rights-holder perspective, not only from the project delivery perspective.');
  if (selection.mitigationActions.length === 0) messages.push('Add a mitigation action. A risk check is useful only if it changes how the project will be designed or implemented.');
  if (!selection.responsibleActor) messages.push('Add a responsible actor. The risk board should show who acts, who responds, and who follows up.');
  if (isScreen13CsoOverload(selection)) messages.push('This mitigation gives too much responsibility to the CSO. Awra can facilitate, protect records, and support safe communication, but the public, service, committee, or sector actor connected to the issue should remain visible.');
  if (!selection.watchSign) messages.push('Add a watch sign. The project team needs to know what to monitor during implementation, such as silence from one group, repeated confusion, unsafe feedback, or exclusion from follow-up.');
  if (!selection.designAdjustment) messages.push('Add a design adjustment. Do-no-harm means changing the design before harm happens.');
  return messages;
}

function getScreen13HelperText(selection: Screen13RiskBoardSelection, submitted: boolean, formChanged: boolean) {
  if (submitted && formChanged) return 'Update risk board before saving this screen.';
  if (submitted) return 'Your risk and do-no-harm board is ready to save.';
  return getScreen13ValidationMessages(selection)[0] || 'Ready to generate your risk and do-no-harm board.';
}

function getRiskStatusLabel(impactLevel: Screen13ImpactLevel | '') {
  if (impactLevel === 'high') return 'High impact';
  if (impactLevel === 'medium') return 'Medium impact';
  if (impactLevel === 'low') return 'Low impact';
  return '';
}

function getScreen13ResponsibleActorOutput(selection: Screen13RiskBoardSelection) {
  if (selection.responsibleActor === 'Awra as safe facilitator and non-sensitive documentation support') {
    return 'Awra can facilitate safely, protect learning records, document non-sensitive patterns, and support communication. The public, service, committee, or sector actor connected to the issue should remain visible for response and follow-up.';
  }
  return 'The responsible public, service, committee, or sector actor should respond to the issue. Awra may support safe facilitation and non-sensitive documentation.';
}

function getScreen13CarryForwardUse(selection: Screen13RiskBoardSelection) {
  const uses = ['Use in objective repair', 'Use in activity package repair', 'Use in participation and accountability pathway'];
  if (selection.impactLevel === 'high') uses.push('Use in intervention logic and indicators');
  if (selection.riskCategories.includes('Data or visibility risk') || selection.riskCategories.includes('Safety or backlash risk')) uses.push('Use as a Module 4 implementation watch-point');
  uses.push('Use in final project design snapshot');
  return Array.from(new Set(uses)).join('; ') + '.';
}

function getScreen13InterpretationMessages(selection: Screen13RiskBoardSelection) {
  const messages = ['Strong risk board. You identified who may be affected, what type of harm or exclusion could happen, how to reduce the risk, who should respond, what sign to watch, and what should change before implementation.'];
  if (selection.riskCategories.includes('Data or visibility risk')) messages.push('Protect evidence and visibility. Use non-identifying summaries, avoid personal details, and make sure feedback or portfolio records do not expose people.');
  if (selection.riskCategories.includes('Power or capture risk')) messages.push('Watch influence and gatekeeping. Use more than one participation channel and avoid relying only on actors who already control information or priorities.');
  if (selection.riskCategories.includes('CSO role-overload risk')) messages.push('Clarify responsibility. Awra can facilitate and support, but service or public actors connected to the issue should remain visible.');
  if (selection.impactLevel === 'high') messages.push('Treat this as a priority design repair. High-impact risks should change the participation pathway, feedback design, activity plan, evidence handling, or implementation watch-points before implementation.');
  return messages;
}

function getScreen13Feedback(selection: Screen13RiskBoardSelection) {
  if (isScreen13CsoOverload(selection)) {
    return ['This mitigation gives too much responsibility to the CSO. Awra can facilitate, protect records, and support safe communication, but the public, service, committee, or sector actor connected to the issue should remain visible.'];
  }
  if (selection.mitigationActions.length === 0) return ['Add a mitigation action. A risk check is useful only if it changes how the project will be designed or implemented.'];
  if (!selection.watchSign) return ['Add a watch sign. The project team needs to know what to monitor during implementation, such as silence from one group, repeated confusion, unsafe feedback, or exclusion from follow-up.'];
  return ['Strong risk board. You identified who may be affected, what type of harm or exclusion could happen, how to reduce the risk, who should respond, and what sign to watch during implementation.'];
}

function buildScreen13Submission(selection: Screen13RiskBoardSelection, ownCsoOutput: Screen13OwnCsoOutput | null): Screen13Submission {
  return {
    screenId: 'M3-R13',
    route: '/module-3/screen-3-13',
    title: 'Risk and Do-No-Harm in Project Design',
    riskDoNoHarmBoard: {
      selection,
      generatedBoard: {
        riskSituation: selection.riskSituation,
        riskCategory: selection.riskCategories.join('; '),
        whoMayBeAffected: selection.affectedGroups.join('; '),
        impactLevel: getRiskStatusLabel(selection.impactLevel),
        mitigationAction: selection.mitigationActions.join('; '),
        responsibleActor: getScreen13ResponsibleActorOutput(selection),
        watchSign: selection.watchSign,
        designAdjustment: selection.designAdjustment,
        carryForwardUse: getScreen13CarryForwardUse(selection),
      },
      interpretationMessages: getScreen13InterpretationMessages(selection),
      safetyConfirmation: 'This learning output uses generalized risk patterns and should not include names, complaint details, exact sensitive locations, survivor stories, disability or medical details about specific people, accusations, or identifiable information.',
    },
    feedbackMessages: getScreen13Feedback(selection),
    ownCsoPracticeOutput: ownCsoOutput || undefined,
    portfolioSummary: screen13PortfolioSummary,
    savedAt: new Date().toISOString(),
  };
}

const riskDoNoHarmTemplateMarkdown = `# Risk and Do-No-Harm Board Template

Use this template after your participation and accountability pathway. It helps your CSO check what could exclude, expose, silence, or harm people before implementation, and what should change in the design.

## Safety reminder

Do not enter real names, exact sensitive locations, complaint details, survivor stories, disability or medical details about specific people, political accusations, confidential political details, or identifiable personal information.

## 1. Project activity or decision

Which activity, decision, participation channel, feedback process, service issue, or design feature are you checking?

## 2. Risk situation

What could go wrong because of the design?

## 3. Risk category

Choose one or more:

- exclusion risk;
- safety or backlash risk;
- data or visibility risk;
- power or capture risk;
- CSO role-overload risk;
- unrealistic assumption risk;
- other: ______.

## 4. Who may be affected?

Which group may be excluded, exposed, silenced, blamed, ignored, or given unrealistic expectations?

## 5. Impact level

Choose one:

- low impact;
- medium impact;
- high impact.

Rate impact from the rights-holder perspective, not only the project delivery perspective.

## 6. Mitigation action

What can reduce the risk?

Examples:

- use non-identifying summaries;
- offer more than one feedback channel;
- use accessible formats and reasonable accommodation;
- share information before decisions are made;
- clarify who responds;
- avoid promises outside the project’s control;
- protect notes and portfolio entries;
- use constructive engagement;
- track patterns without names.

## 7. Responsible actor

Who should act, respond, or follow up?

Examples:

- planning office;
- sector office;
- service committee;
- market committee;
- water committee;
- health post management;
- project accountability focal point;
- CSO facilitator in a support role;
- safeguarding or protection focal point, where appropriate.

## 8. Watch sign

What sign should the project watch during implementation?

Examples:

- one group becomes silent;
- feedback includes names or sensitive details;
- people do not know what changed;
- one actor dominates the process;
- remote groups receive information late;
- persons with disabilities still cannot use the channel;
- people expect the CSO to solve issues outside its role.

## 9. Design adjustment

What should change in the project design before implementation?

## 10. Safe evidence rule

What should not be collected, written, uploaded, or shared?

## 11. Carry-forward

Where should this risk point be used next?

- objective repair;
- activity package repair;
- participation and accountability pathway;
- intervention logic;
- indicators;
- final project design snapshot;
- Module 4 implementation watch-points.
`;

function buildRiskDoNoHarmTemplateHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Risk and Do-No-Harm Board Template</title></head><body>${riskDoNoHarmTemplateMarkdown
    .split('\n')
    .map((line) => {
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('- ')) return `<p>${line}</p>`;
      return line.trim() ? `<p>${line}</p>` : '';
    })
    .join('')}</body></html>`;
}


type Screen14Field = 'rightsHolders' | 'barriers' | 'responsibilities' | 'changes' | 'scope';
type Screen14Selections = Record<Screen14Field, string[]>;
type Screen14OwnCsoDraft = {
  originalObjective: string;
  rightsHolderGroups: string;
  priorityBarriers: string;
  responsibleActors: string;
  capacityAccountabilityChange: string;
  realisticProjectScope: string;
};
type Screen14OwnCsoOutput = Screen14OwnCsoDraft & { generatedObjective: string; generatedAt: string };
type Screen14Submission = {
  screenId: 'M3-R14';
  route: '/module-3/screen-3-14';
  title: 'Repair the Objective';
  repairedObjective: {
    originalWeakObjective: string;
    whatWasMissing: string;
    repairedHrbaObjective: string;
    hrbaDesignLogic: string;
    carryIntoActivityRepair: string;
    selections: Screen14Selections;
    feedbackMessages: string[];
  };
  ownCsoPracticeOutput?: Screen14OwnCsoOutput;
  portfolioSummary: string;
  savedAt: string;
};

type ActivityRepairAction = {
  id: string;
  originalActivity: string;
  weakness: string;
  barrier: string;
  rightsHolderGroup: string;
  repairedActivity: string;
  responsibleActorCsoRole: string;
  riskAccountabilityAdjustment: string;
  safeEvidenceQuestion: string;
  lane: 'Rights-holder influence' | 'Accessibility and inclusion measures' | 'Responsibility, feedback, and follow-up';
};
type Screen15OwnCsoDraft = {
  originalActivity: string;
  weakness: string;
  barrierLink: string;
  rightsHolderGroup: string;
  repairedActivity: string;
  responsibleActorCsoRole: string;
  riskAccountabilityAdjustment: string;
  safeEvidenceQuestion: string;
};
type Screen15OwnCsoOutput = Screen15OwnCsoDraft & { generatedAt: string };
type Screen15Submission = {
  screenId: 'M3-R15';
  route: '/module-3/screen-3-15';
  title: 'Repair the Activity Package';
  repairedActivityPackage: {
    selectedActionIds: string[];
    repairedActivities: ActivityRepairAction[];
    generatedSummary: string;
    feedbackMessages: string[];
    repairedObjectiveUsed: string;
  };
  ownCsoPracticeOutput?: Screen15OwnCsoOutput;
  portfolioSummary: string;
  savedAt: string;
};

type Screen16Selections = {
  barrier: string;
  repairedObjective: string;
  repairedActivity: string;
  output: string;
  outcome: string;
  indicator: string;
  safeEvidenceSource: string;
  assumptionRisk: string;
  watchPoint: string;
};
type Screen16OwnCsoDraft = {
  projectBarrierRootCause: string;
  repairedObjective: string;
  repairedActivity: string;
  output: string;
  outcome: string;
  indicator: string;
  safeEvidenceSource: string;
  assumptionRisk: string;
  implementationWatchPoint: string;
};
type Screen16OwnCsoOutput = Screen16OwnCsoDraft & { generatedAt: string };
type Screen16Submission = {
  screenId: 'M3-R16';
  route: '/module-3/screen-3-16';
  title: 'Intervention Logic and Indicators';
  interventionLogicIndicators: {
    barrierRootCause: string;
    repairedObjective: string;
    repairedActivity: string;
    output: string;
    outcome: string;
    indicator: string;
    safeEvidenceSource: string;
    assumptionRisk: string;
    implementationWatchPoint: string;
    logicQualitySummary: string;
    feedbackMessages: string[];
  };
  ownCsoPracticeOutput?: Screen16OwnCsoOutput;
  portfolioSummary: string;
  savedAt: string;
};

const designRepairStaleMessage = 'Update your design repair output before saving this screen.';

const screen14Assets = {
  hero: {
    src: '/assets/hrba/modules/module-3/m3-s14-objective-repair-scene.webp',
    alt: 'CSO team reviewing a weak project objective and turning it into a clearer rights-based objective that links rights-holders, barriers, responsible actors, participation, and expected change.',
  },
  empty: '/assets/hrba/modules/module-3/m3-s14-objective-repair-canvas-empty.svg',
};

const screen15Assets = {
  hero: {
    src: '/assets/hrba/modules/module-3/m3-s15-activity-repair-board-scene.webp',
    alt: 'CSO staff and community actors reviewing an activity package and adding actions for access, participation, responsibility, feedback, risk mitigation, and follow-up.',
  },
  empty: '/assets/hrba/modules/module-3/m3-s15-activity-repair-lanes-empty.svg',
};

const screen16Assets = {
  hero: {
    src: '/assets/hrba/modules/module-3/m3-s16-intervention-logic-pathway-scene.webp',
    alt: 'A CSO team arranging a pathway from problem and barriers to activities, outputs, outcome, indicators, safe evidence, and implementation watch-points.',
  },
  pathwayEmpty: '/assets/hrba/modules/module-3/m3-s16-logic-pathway-empty-preview.svg',
  matrixEmpty: '/assets/hrba/modules/module-3/m3-s16-indicator-mini-matrix-empty.svg',
};

const screen14WeakObjective = 'Improve community participation and service access through training, meetings, feedback, and local development activities in Jiru Amba.';
const screen14Options: Record<Screen14Field, string[]> = {
  rightsHolders: ['Women vendors affected by market-service decisions', 'Women', 'Persons with disabilities facing accessibility barriers', 'Youth seeking practical livelihood opportunities', 'Low-income households facing cost or access barriers', 'Communities in remote kebeles', 'Informal workers outside formal participation channels', 'Another generalized group'],
  barriers: ['Limited influence over priorities', 'Late, unclear, or inaccessible information', 'Accessibility or reasonable accommodation barriers', 'Weak feedback and response', 'Distance, transport, cost, timing, or care-work barriers', 'Unclear pathway from activity to practical benefit', 'Power or gatekeeping patterns', 'Unsafe or untrusted participation channels'],
  responsibilities: ['Woreda planning office', 'Relevant sector office', 'Market office or market committee', 'Water committee', 'Health office or health post management', 'Kebele structure with woreda follow-up', 'Service or committee actor connected to the issue', 'Awra as facilitator and support actor, not sole responder'],
  changes: ['More accessible participation', 'Stronger rights-holder influence before decisions are finalized', 'Safer feedback and response', 'Clearer follow-up on what changed', 'Better accessibility and reasonable accommodation', 'Better use of non-identifying evidence', 'Clearer responsible actor response', 'Stronger link between activities and practical benefit'],
  scope: ['Facilitate and support change, not replace duty-bearers', 'Improve the design before implementation', 'Strengthen participation and feedback systems', 'Support responsible actors to respond', 'Track safe evidence of influence and follow-up', 'Reduce barriers within the project’s realistic scope'],
};
const screen14FieldLabels: Record<Screen14Field, string> = {
  rightsHolders: 'Rights-holder focus',
  barriers: 'Barrier focus',
  responsibilities: 'Responsibility',
  changes: 'Capacity or accountability change',
  scope: 'Realistic scope',
};
const screen14FieldQuestions: Record<Screen14Field, string> = {
  rightsHolders: 'Which specific groups should the objective make visible?',
  barriers: 'Which exclusion pattern or barrier should the objective respond to?',
  responsibilities: 'Which public, service, committee, project, or CSO role should remain visible?',
  changes: 'What should improve: voice, access, response, follow-up, accountability, accessibility, evidence use, or service accountability?',
  scope: 'Is the objective achievable for the project without making the CSO responsible for everything?',
};

const activityRepairActions: ActivityRepairAction[] = [
  { id: 'communityMeetings', originalActivity: 'Hold community meetings', weakness: 'Meetings may happen after decisions are already shaped, and attendance does not prove influence.', repairedActivity: 'Share information before decisions, use safe pre-consultation with lower-influence groups, adapt timing and accessibility, and show how inputs changed the plan.', barrier: 'Limited influence; late information; participation barriers.', rightsHolderGroup: 'Women vendors, persons with disabilities, remote kebele residents, informal workers, low-income households.', responsibleActorCsoRole: 'Planning actor responds; Awra facilitates safe and inclusive participation.', riskAccountabilityAdjustment: 'Avoid relying on one public meeting; use non-identifying summaries and follow-up.', safeEvidenceQuestion: 'Can selected groups identify at least one way their priorities were considered before final decisions?', lane: 'Rights-holder influence' },
  { id: 'youthTraining', originalActivity: 'Conduct youth livelihood training', weakness: 'Training is listed without a clear pathway to practical opportunity.', repairedActivity: 'Co-design training priorities with youth, check market relevance, link training to practical opportunities and follow-up support, and document non-identifying evidence of access to next steps.', barrier: 'Unclear pathway to benefit; livelihood or market-risk barrier.', rightsHolderGroup: 'Youth seeking livelihood opportunities; low-income youth; informal workers.', responsibleActorCsoRole: 'Livelihood actor, training provider, or sector actor supports pathway; Awra facilitates and monitors non-sensitive follow-up.', riskAccountabilityAdjustment: 'Avoid promising jobs or income outcomes not secured by the project.', safeEvidenceQuestion: 'Do youth participants have a clear follow-up pathway after training?', lane: 'Responsibility, feedback, and follow-up' },
  { id: 'feedbackBoxes', originalActivity: 'Install feedback boxes', weakness: 'A feedback box alone may be unsafe, inaccessible, or unanswered.', repairedActivity: 'Create multiple safe and accessible feedback-response channels, explain what should not be written, protect non-identifying records, assign response roles, and communicate what changed.', barrier: 'Feedback or response barrier; data or visibility risk; accountability gap.', rightsHolderGroup: 'People raising feedback, persons with disabilities, women vendors, remote residents, low-income households.', responsibleActorCsoRole: 'Project accountability focal point or service actor responds; Awra supports safe facilitation and non-sensitive documentation.', riskAccountabilityAdjustment: 'Do not collect names, complaint details, disability details, survivor stories, or identifying information.', safeEvidenceQuestion: 'Can the project show that feedback was received, answered, and used without exposing individuals?', lane: 'Responsibility, feedback, and follow-up' },
  { id: 'marketImprovement', originalActivity: 'Support market improvement', weakness: 'Market improvement may be shaped by stronger actors without women vendors, informal workers, or low-income traders influencing priorities.', repairedActivity: 'Use market-accessible information, consultation timed around livelihood realities, transparent priority ranking, and follow-up showing how women vendors and informal workers influenced market improvements.', barrier: 'Limited influence; livelihood or market-risk barrier; information barrier.', rightsHolderGroup: 'Women vendors, informal workers, low-income households, youth.', responsibleActorCsoRole: 'Market committee or planning actor responds; Awra facilitates and documents non-sensitive patterns.', riskAccountabilityAdjustment: 'Handle informal gatekeeping carefully; avoid exposing individual concerns.', safeEvidenceQuestion: 'Is at least one market-improvement decision visibly linked to non-identifying input from lower-influence market users?', lane: 'Rights-holder influence' },
  { id: 'disabilityInclusion', originalActivity: 'Include persons with disabilities', weakness: 'Inclusion is too vague if it only means invitation or ramps.', repairedActivity: 'Conduct accessibility checks for information, venues, materials, transport, service points, and feedback channels; include reasonable accommodation and responsibility for follow-up.', barrier: 'Accessibility or accommodation barrier; information barrier; feedback barrier.', rightsHolderGroup: 'Persons with disabilities and others with access needs.', responsibleActorCsoRole: 'Planning/service actors budget and monitor accessibility; Awra supports checks and inclusive facilitation.', riskAccountabilityAdjustment: 'Do not record disability or medical details about specific people.', safeEvidenceQuestion: 'Were accessibility measures planned, provided, and monitored without recording personal disability details?', lane: 'Accessibility and inclusion measures' },
  { id: 'waterPoints', originalActivity: 'Repair water points', weakness: 'Water repair may focus on infrastructure without addressing information, fee transparency, service response, or women’s influence.', repairedActivity: 'Link water repair to clear information on service decisions, safe feedback and response, women’s influence on priorities, and follow-up through the water committee or sector actor.', barrier: 'Service response gap; information barrier; feedback barrier; gendered access barrier.', rightsHolderGroup: 'Women, in the context of household water responsibilities and water-service decisions; low-income households; remote residents.', responsibleActorCsoRole: 'Water committee or relevant sector actor responds; Awra facilitates communication and non-sensitive feedback patterns.', riskAccountabilityAdjustment: 'Avoid collecting identifiable service complaints.', safeEvidenceQuestion: 'Can users see what changed in water repair or service response after feedback?', lane: 'Responsibility, feedback, and follow-up' },
  { id: 'healthPost', originalActivity: 'Renovate health post areas', weakness: 'Renovation may improve infrastructure but not address accessibility, dignity, information, service quality, or feedback response.', repairedActivity: 'Check accessibility, privacy, dignity, information, and feedback needs before renovation priorities are finalized; ensure service actors respond to non-sensitive patterns.', barrier: 'Accessibility barrier; service quality barrier; feedback and response barrier.', rightsHolderGroup: 'Persons with disabilities, women, low-income households, remote residents.', responsibleActorCsoRole: 'Health office or health post management responds; Awra supports safe consultation and documentation.', riskAccountabilityAdjustment: 'Do not collect medical details or identifiable service complaints.', safeEvidenceQuestion: 'Does the renovation respond to accessibility, dignity, and service-feedback priorities without exposing individuals?', lane: 'Accessibility and inclusion measures' },
];

const screen16FallbackObjective = 'Strengthen meaningful and accessible participation of lower-influence rights-holder groups in Jiru Amba service-improvement decisions, while supporting responsible planning and service actors to respond to priorities, feedback, and accessibility barriers.';
const screen16FallbackActivities = ['Accessible information and pre-consultation before decisions', 'Market-accessible consultation and transparent priority ranking', 'Safe and accessible feedback-response channels', 'Accessibility checks and reasonable accommodation measures', 'Youth livelihood pathway with follow-up support', 'Water-service feedback and response process', 'Health post accessibility, dignity, and feedback check'];
const screen16Barriers = ['Lower-influence groups do not shape final priorities', 'Information is late, unclear, or inaccessible', 'Accessibility and reasonable accommodation are not built into design', 'Feedback is collected but not answered', 'Activities are listed without a pathway to practical benefit', 'Public or service actor response is unclear', 'Power or gatekeeping affects whose priorities count', 'Risk of exclusion, exposure, silence, or unrealistic expectations'];
const screen16Outputs = ['Non-identifying summary of rights-holder priorities produced', 'Accessible information shared before decisions', 'Revised activity package showing barrier links', 'Feedback-response process documented', 'Accessibility checklist completed', 'Responsible actor follow-up action agreed', 'Youth livelihood pathway documented', 'Risk watch-points added to implementation plan'];
const screen16Outcomes = ['Lower-influence groups influence final priorities more meaningfully', 'Responsible actors respond more clearly to feedback and priorities', 'Participation becomes more accessible, safe, and practical', 'Activities are better linked to barriers and rights-holder benefit', 'Feedback is safer, more accessible, and more likely to receive response', 'Accessibility and accommodation are built into implementation', 'Project team uses safer, non-identifying evidence for learning and accountability'];
const screen16Indicators = ['Number of lower-influence rights-holder groups that received information before decisions and can identify at least one way their priorities were considered, using non-identifying evidence', 'At least one activity in the final package is visibly linked to a specific rights-holder barrier and responsible actor', 'Accessibility checks completed for information, venue, feedback, and service access, with documented design adjustments and no personal disability details recorded', 'Feedback-response process includes clear response roles, safe evidence rules, and at least one follow-up update on what changed', 'Youth livelihood activity includes a documented follow-up pathway linked to realistic opportunity or service support', 'Water-service feedback is summarized without names and reviewed by the responsible service actor', 'Implementation watch-points are included for exclusion, unsafe feedback, CSO role overload, and unrealistic assumptions', 'Number of community meetings held', 'Number of people trained'];
const screen16EvidenceSources = ['Non-identifying feedback summary', 'Facilitation notes without names or sensitive details', 'Revised activity package', 'Accessibility checklist', 'Follow-up summary showing what changed', 'Meeting or consultation record with no identifying details', 'Service or committee record where safe and relevant', 'Implementation watch-point log with no personal data'];
const screen16AssumptionRisks = ['Responsible actors are willing to review and respond to priorities', 'Feedback summaries do not expose individuals', 'Participation happens before decisions are finalized', 'Accessibility measures are budgeted and provided', 'Youth livelihood support connects to practical opportunities', 'CSO role remains facilitative and does not replace duty-bearers', 'Lower-influence groups can participate safely', 'Data collection remains non-identifying and safe'];
const screen16WatchPoints = ['One group becomes silent or stops participating', 'Feedback includes names or complaint details', 'People do not know what changed', 'Responsible actor response is delayed or unclear', 'Accessibility support is not provided', 'Activities drift back to generic training or meetings', 'Awra is expected to solve public/service issues alone', 'Indicators count delivery but not influence, access, response, or benefit'];
const outputOnlyIndicatorPattern = /number of community meetings held|number of people trained|meetings held|people trained/i;

const objectiveRepairTemplateMarkdown = `# HRBA Objective Repair Template

## 1. Current objective

## 2. What is too broad or activity-based?

## 3. Specific rights-holder groups

Use "Women" as a group label. If relevant, add a supporting note: Women, in the context of household water responsibilities and water-service decisions.

## 4. Priority barriers

## 5. Responsible actors

## 6. Capacity or accountability change

## 7. Realistic project scope

## 8. Repaired HRBA objective

## 9. What this objective changes in the design

## 10. Safe evidence or follow-up point
`;
const activityRepairTemplateMarkdown = `# HRBA Activity Package Repair Template

## 1. Repaired objective used

## 2. Original activity

## 3. What is weak?

## 4. Barrier addressed

## 5. Rights-holder group

Use "Women" as a group label. If relevant, add a supporting note: Women, in the context of household water responsibilities and water-service decisions.

## 6. Repaired activity

## 7. Responsible actor / CSO role

## 8. Risk or accountability adjustment

## 9. Safe evidence question

## 10. Carry-forward to logic and indicators
`;
const logicMiniMatrixTemplateMarkdown = `# HRBA Intervention Logic Mini-Matrix Template

## 1. Barrier / root cause

## 2. Repaired objective

## 3. Repaired activity

## 4. Output

## 5. Outcome

## 6. Indicator

## 7. Safe evidence source

## 8. Assumption or risk

## 9. Implementation watch-point

## 10. Indicator quality check

Is the indicator linked to a barrier or objective, able to show change, safe and non-identifying, practical to collect, useful for accountability and learning, and disaggregated only where safe and meaningful?

## 11. Carry-forward to draft plan review
`;

function buildMarkdownTemplateHtml(title: string, markdown: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head><body>${markdown.split('\n').map((line) => {
    if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
    if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
    if (line.startsWith('- ')) return `<p>${line}</p>`;
    return line.trim() ? `<p>${line}</p>` : '<br>';
  }).join('')}</body></html>`;
}

function emptyScreen14Selections(): Screen14Selections {
  return { rightsHolders: [], barriers: [], responsibilities: [], changes: [], scope: [] };
}

function joinList(values: string[]) {
  return values.join(', ');
}

function getScreen14ValidationMessages(selections: Screen14Selections) {
  const messages: string[] = [];
  if (selections.rightsHolders.length < 2) messages.push('Please select at least two specific rights-holder groups. A strong HRBA objective should move beyond “the community.”');
  if (selections.barriers.length < 2) messages.push('Please select the barriers the objective should respond to. A repaired objective should show what exclusion pattern the project is trying to reduce.');
  if (!selections.responsibilities.some((item) => item !== 'Awra as facilitator and support actor, not sole responder')) messages.push('Please include a responsible public, service, committee, or sector actor. Awra can support and facilitate, but the objective should not make the CSO responsible for everything.');
  if (selections.changes.length === 0) messages.push('Please select what should change: influence, access, feedback, accessibility, follow-up, evidence use, or accountability.');
  if (selections.scope.length === 0) messages.push('This objective is still too broad. Add specific groups, barriers, responsible actors, and the change the project will support.');
  return messages;
}

function isScreen14Valid(selections: Screen14Selections) {
  return getScreen14ValidationMessages(selections).length === 0;
}

function getScreen14Helper(selections: Screen14Selections, submitted: boolean, stale: boolean) {
  if (submitted && stale) return designRepairStaleMessage;
  return getScreen14ValidationMessages(selections)[0] || 'Ready to generate your repaired HRBA objective.';
}

function buildScreen14Objective(selections: Screen14Selections) {
  return `Strengthen meaningful, accessible, and accountable participation of ${joinList(selections.rightsHolders)} in Jiru Amba service-improvement decisions by reducing ${joinList(selections.barriers)}, while supporting ${joinList(selections.responsibilities)} and Awra to improve ${joinList(selections.changes)} within a realistic project scope.`;
}

function getScreen14Feedback(selections: Screen14Selections) {
  const messages = ['Strong repaired objective. You moved beyond broad activity language and made rights-holder groups, barriers, responsible actors, and accountability change visible. Use this objective to guide the activity repair.'];
  if (!selections.responsibilities.some((item) => item !== 'Awra as facilitator and support actor, not sole responder')) messages.push('This objective gives too much responsibility to Awra. Awra can facilitate and support, but the objective should also show the public, service, committee, or sector actors connected to the change.');
  if (selections.rightsHolders.length > 5 || selections.barriers.length > 5) messages.push('This objective may be trying to include too much. Keep the objective focused on the main rights-holder groups, barriers, and accountability change the project can realistically influence.');
  return messages;
}

function buildScreen14Submission(selections: Screen14Selections, ownCsoOutput: Screen14OwnCsoOutput | null): Screen14Submission {
  return {
    screenId: 'M3-R14',
    route: '/module-3/screen-3-14',
    title: 'Repair the Objective',
    repairedObjective: {
      originalWeakObjective: screen14WeakObjective,
      whatWasMissing: 'The objective was too broad. It did not clearly identify specific rights-holder groups, priority barriers, responsible actors, accountability changes, accessibility needs, feedback response, or realistic CSO role boundaries.',
      repairedHrbaObjective: buildScreen14Objective(selections),
      hrbaDesignLogic: 'This objective is stronger because it moves from general community participation to specific rights-holder influence, barrier reduction, accessibility, feedback response, and responsible actor follow-up.',
      carryIntoActivityRepair: 'The next screen should repair activities so they directly respond to the selected barriers, support the selected rights-holder groups, clarify responsible actor roles, manage risk, and generate safe evidence of change.',
      selections,
      feedbackMessages: getScreen14Feedback(selections),
    },
    ownCsoPracticeOutput: ownCsoOutput || undefined,
    portfolioSummary: 'You completed a repaired HRBA objective. You moved from broad activity language to a clearer objective that names rights-holders, barriers, responsible actors, accountability change, and realistic project scope.',
    savedAt: new Date().toISOString(),
  };
}

function getEmptyScreen14OwnCsoDraft(): Screen14OwnCsoDraft {
  return { originalObjective: '', rightsHolderGroups: '', priorityBarriers: '', responsibleActors: '', capacityAccountabilityChange: '', realisticProjectScope: '' };
}

function getActivityRepairCoverage(actionIds: string[]) {
  const selected = activityRepairActions.filter((action) => actionIds.includes(action.id));
  return {
    influence: selected.some((action) => action.lane === 'Rights-holder influence'),
    inclusion: selected.some((action) => action.lane === 'Accessibility and inclusion measures'),
    accountability: selected.some((action) => action.lane === 'Responsibility, feedback, and follow-up'),
  };
}

function isScreen15Valid(actionIds: string[]) {
  const coverage = getActivityRepairCoverage(actionIds);
  return actionIds.length >= 3 && coverage.influence && coverage.inclusion && coverage.accountability;
}

function getScreen15Helper(actionIds: string[], submitted: boolean, stale: boolean, limitMessage: string) {
  if (limitMessage) return limitMessage;
  if (submitted && stale) return designRepairStaleMessage;
  if (actionIds.length < 3) return 'Please repair at least three activities. A useful package should show more than one design response.';
  const coverage = getActivityRepairCoverage(actionIds);
  if (!coverage.influence) return 'Add at least one repair that strengthens rights-holder influence before decisions are finalized.';
  if (!coverage.inclusion) return 'Add at least one repair that addresses accessibility, reasonable accommodation, information, timing, or other access barriers.';
  if (!coverage.accountability) return 'Add the risk or accountability adjustment. The activity should show how feedback, safety, response, or do-no-harm will be handled.';
  return 'Ready to generate your repaired activity package.';
}

function getScreen15Feedback(actions: ActivityRepairAction[]) {
  const messages = ['Strong activity repair. The package links activities to barriers, rights-holder groups, responsible actors, risk/accountability adjustments, and safe evidence questions.'];
  if (actions.length < 3) messages.push('Please repair at least three activities. A useful package should show more than one design response.');
  if (!actions.some((action) => /responds|actor|committee|office/i.test(action.responsibleActorCsoRole))) messages.push('Each repaired activity should show who has responsibility. Awra can facilitate and support, but public, service, committee, or sector actors should remain visible where relevant.');
  return messages;
}

function buildScreen15Submission(actionIds: string[], repairedObjectiveUsed: string, ownCsoOutput: Screen15OwnCsoOutput | null): Screen15Submission {
  const repairedActivities = activityRepairActions.filter((action) => actionIds.includes(action.id));
  return {
    screenId: 'M3-R15',
    route: '/module-3/screen-3-15',
    title: 'Repair the Activity Package',
    repairedActivityPackage: {
      selectedActionIds: actionIds,
      repairedActivities,
      repairedObjectiveUsed,
      generatedSummary: 'This activity package is stronger because it responds to barriers, supports specific rights-holder groups, keeps responsible actors visible, manages risk and accountability, and asks safe evidence questions.',
      feedbackMessages: getScreen15Feedback(repairedActivities),
    },
    ownCsoPracticeOutput: ownCsoOutput || undefined,
    portfolioSummary: 'You completed a repaired activity package. You connected activities to barriers, rights-holder groups, responsible actors, risk and accountability adjustments, and safe evidence questions.',
    savedAt: new Date().toISOString(),
  };
}

function getEmptyScreen15OwnCsoDraft(): Screen15OwnCsoDraft {
  return { originalActivity: '', weakness: '', barrierLink: '', rightsHolderGroup: '', repairedActivity: '', responsibleActorCsoRole: '', riskAccountabilityAdjustment: '', safeEvidenceQuestion: '' };
}

function getScreen14SavedOutput(state: LearningState): Screen14Submission | null {
  const record = getPracticeState(state, 'M3-R14');
  const nested = record.screen14;
  if (nested && typeof nested === 'object' && (nested as Screen14Submission).screenId === 'M3-R14') return nested as Screen14Submission;
  if (record.screenId === 'M3-R14') return record as Screen14Submission;
  return null;
}

function getScreen15SavedOutput(state: LearningState): Screen15Submission | null {
  const record = getPracticeState(state, 'M3-R15');
  const nested = record.screen15;
  if (nested && typeof nested === 'object' && (nested as Screen15Submission).screenId === 'M3-R15') return nested as Screen15Submission;
  if (record.screenId === 'M3-R15') return record as Screen15Submission;
  return null;
}

function emptyScreen16Selections(): Screen16Selections {
  return { barrier: '', repairedObjective: '', repairedActivity: '', output: '', outcome: '', indicator: '', safeEvidenceSource: '', assumptionRisk: '', watchPoint: '' };
}

function getScreen16ValidationMessages(selection: Screen16Selections) {
  const messages: string[] = [];
  if (!selection.barrier || !selection.repairedObjective || !selection.repairedActivity || !selection.output || !selection.outcome || !selection.indicator || !selection.safeEvidenceSource || !selection.assumptionRisk || !selection.watchPoint) messages.push('Please complete each part of the mini-matrix. Intervention logic needs a barrier, objective, activity, output, outcome, indicator, evidence source, assumption or risk, and watch-point.');
  if (outputOnlyIndicatorPattern.test(selection.indicator)) messages.push('This indicator mostly counts delivery. Add a way to show influence, access, response, benefit, accountability, accessibility, or capacity change.');
  if (hasUnsafeLearningDetail(Object.values(selection).join(' '))) messages.push('Keep indicators safe. Do not require names, complaint details, disability or medical details, survivor stories, exact sensitive locations, accusations, or identifiable information.');
  return messages;
}

function isScreen16Valid(selection: Screen16Selections) {
  return getScreen16ValidationMessages(selection).length === 0;
}

function getScreen16Helper(selection: Screen16Selections, submitted: boolean, stale: boolean) {
  if (submitted && stale) return designRepairStaleMessage;
  return getScreen16ValidationMessages(selection)[0] || 'Ready to generate your HRBA intervention logic mini-matrix.';
}

function getScreen16LogicQualitySummary(selection: Screen16Selections) {
  if (hasUnsafeLearningDetail(Object.values(selection).join(' '))) return 'The evidence source needs to remain safe. Use non-identifying summaries, facilitation notes, accessibility checks, revised activity records, or follow-up summaries. Do not collect names, complaints, disability details, or identifying information.';
  if (outputOnlyIndicatorPattern.test(selection.indicator)) return 'This logic is still too activity-heavy. Strengthen the outcome and indicator so they show what changes for rights-holders, responsible actors, accessibility, feedback, or accountability.';
  return 'Strong logic chain. Your objective, activity, output, outcome, indicator, safe evidence source, and watch-point fit together. The indicator shows more than delivery and helps track influence, access, response, inclusion, or accountability.';
}

function getScreen16Feedback(selection: Screen16Selections) {
  const messages = ['Strong mini-matrix. You connected the barrier, repaired objective, repaired activity, output, outcome, indicator, safe evidence, assumption or risk, and implementation watch-point.'];
  if (outputOnlyIndicatorPattern.test(selection.indicator)) messages.push('This indicator mostly counts delivery. Add a way to show influence, access, response, inclusion, benefit, accountability, or capacity change.');
  if (/Awra is expected to solve public\/service issues alone/i.test(selection.watchPoint)) messages.push('The logic may give too much responsibility to Awra. Keep responsible public, service, committee, or sector actors visible where they control decisions, services, response, or follow-up.');
  return messages;
}

function buildScreen16Submission(selection: Screen16Selections, ownCsoOutput: Screen16OwnCsoOutput | null): Screen16Submission {
  return {
    screenId: 'M3-R16',
    route: '/module-3/screen-3-16',
    title: 'Intervention Logic and Indicators',
    interventionLogicIndicators: {
      barrierRootCause: selection.barrier,
      repairedObjective: selection.repairedObjective,
      repairedActivity: selection.repairedActivity,
      output: selection.output,
      outcome: selection.outcome,
      indicator: selection.indicator,
      safeEvidenceSource: selection.safeEvidenceSource,
      assumptionRisk: selection.assumptionRisk,
      implementationWatchPoint: selection.watchPoint,
      logicQualitySummary: getScreen16LogicQualitySummary(selection),
      feedbackMessages: getScreen16Feedback(selection),
    },
    ownCsoPracticeOutput: ownCsoOutput || undefined,
    portfolioSummary: 'You completed an HRBA intervention logic mini-matrix. You connected the barrier, repaired objective, repaired activity, output, outcome, indicator, safe evidence source, assumption or risk, and implementation watch-point.',
    savedAt: new Date().toISOString(),
  };
}

function getEmptyScreen16OwnCsoDraft(): Screen16OwnCsoDraft {
  return { projectBarrierRootCause: '', repairedObjective: '', repairedActivity: '', output: '', outcome: '', indicator: '', safeEvidenceSource: '', assumptionRisk: '', implementationWatchPoint: '' };
}

type ProposalSectionId =
  | 'problem'
  | 'rightsHolders'
  | 'actors'
  | 'objectiveLogic'
  | 'activities'
  | 'inclusion'
  | 'participationAccountabilityRisk'
  | 'monitoringEvidence';
type ProposalGapId =
  | 'specificRightsHolders'
  | 'barriersVisible'
  | 'dutyBearersClear'
  | 'participationInfluence'
  | 'accountabilityResponseMentioned'
  | 'genderDisabilityBuiltIn'
  | 'riskDoNoHarm'
  | 'indicatorsShowChange'
  | 'activitiesLinkedToBarriers'
  | 'csoRoleOverloaded';
type RepairMoveId =
  | 'nameRightsHolders'
  | 'addBarriers'
  | 'clarifyDutyBearers'
  | 'protectCsoRole'
  | 'createInfluenceRoute'
  | 'addSafeFeedback'
  | 'buildInInclusion'
  | 'addRiskMitigation'
  | 'strengthenIndicators'
  | 'addImplementationWatchPoint';
type ProposalReviewStatus = 'readyForNow' | 'needsHrbaCheck';
type ProposalSection = {
  id: ProposalSectionId;
  number: number;
  title: string;
  excerpt: string;
  notice: string;
  suggestedGapIds: ProposalGapId[];
};
type ProposalGap = { id: ProposalGapId; label: string; explanation: string };
type RepairMoveGroup = 'Rights-holder and barrier repair' | 'Responsibility and CSO role repair' | 'Participation and accountability repair' | 'Inclusion and risk repair' | 'Evidence and implementation repair';
type RepairMove = { id: RepairMoveId; label: string; explanation: string; group: RepairMoveGroup };
type Screen17Submission = {
  screenId: 'M3-R17';
  route: '/module-3/screen-3-17';
  title: 'Open the Draft Plan';
  proposalReviewSections: {
    checkedSections: Record<ProposalSectionId, ProposalReviewStatus>;
    needsHrbaCheck: ProposalSectionId[];
    readyForNow: ProposalSectionId[];
    generatedAt: string;
  };
  draftPlanReviewPreview: {
    sectionsMarkedForHrbaGapCheck: ProposalSectionId[];
    sectionsReadyForNow: ProposalSectionId[];
    whyTheseSectionsNeedAttention: string;
    whatToDoNext: string;
    feedbackMessage: string;
  };
  ownCsoPracticeOutput?: Screen17OwnCsoOutput;
  safetyConfirmation: string;
  portfolioSummary: string;
};
type Screen18Submission = {
  screenId: 'M3-R18';
  route: '/module-3/screen-3-18';
  title: 'Find the HRBA Gaps Across the Plan';
  proposalGapMap: {
    gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>;
    cards: Screen18GapMapCard[];
    repairPriority: ProposalSectionId;
    generatedAt: string;
  };
  patternFeedback: string[];
  ownCsoPracticeOutput?: Screen18OwnCsoOutput;
  safetyConfirmation: string;
  portfolioSummary: string;
};
type Screen19Submission = {
  screenId: 'M3-R19';
  route: '/module-3/screen-3-19';
  title: 'Repair One Plan Section';
  proposalSectionRepair: {
    selectedSection: ProposalSectionId;
    selectedGaps: ProposalGapId[];
    selectedRepairMoves: RepairMoveId[];
    beforeText: string;
    repairedText: string;
    whyStronger: string;
    designChanges: string[];
    implementationWatchPoint: string;
    safeEvidenceNote: string;
    carryForward: string;
    generatedAt: string;
  };
  feedbackMessages: string[];
  ownCsoPracticeOutput?: Screen19OwnCsoOutput;
  safetyConfirmation: string;
  portfolioSummary: string;
};
type Screen17OwnCsoDraft = { planSection: string; summary: string; decision: ProposalReviewStatus | ''; why: string };
type Screen17OwnCsoOutput = Screen17OwnCsoDraft & { generatedNote: string };
type Screen18OwnCsoDraft = { planSection: string; summary: string; gaps: ProposalGapId[]; whyThisMatters: string; recommendedRepairMove: string };
type Screen18OwnCsoOutput = Screen18OwnCsoDraft & { generatedNote: string };
type Screen19OwnCsoDraft = { planSection: string; weakSummary: string; repairMoves: RepairMoveId[]; repairedVersion: string; designChange: string; implementationWatchPoint: string; safeEvidenceNote: string };
type Screen19OwnCsoOutput = Screen19OwnCsoDraft & { generatedNote: string };
type Screen18RepairPriority = 'High priority' | 'Medium priority' | 'Low priority';
type Screen18GapMapCard = {
  sectionId: ProposalSectionId;
  selectedGaps: ProposalGapId[];
  whyThisMatters: string;
  repairPriority: Screen18RepairPriority;
  recommendedRepairMove: string;
  carryForward: string;
};
type Screen20QuestionId = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Q5' | 'Q6';
type Screen20OptionId = 'A' | 'B' | 'C' | 'D';
type Screen20Question = {
  id: Screen20QuestionId;
  title: string;
  scenario: string;
  prompt: string;
  options: { id: Screen20OptionId; text: string }[];
  correctAnswer: Screen20OptionId;
  feedback: string;
  designReminder: string;
  strongArea: string;
  reviewFlag: string;
};
type Screen20Submission = {
  answers: Record<string, string>;
  correctAnswers: string[];
  missedQuestions: string[];
  reviewFlags: string[];
  score: number;
  completedReviewOfMissedQuestions: boolean;
  generatedAt: string;
};
type SnapshotFieldId =
  | 'projectIssueOrSection'
  | 'rightsStandards'
  | 'specificRightsHolders'
  | 'keyBarriers'
  | 'dutyBearersSupportingActors'
  | 'csoRole'
  | 'powerCapacityGaps'
  | 'genderDisabilityConsiderations'
  | 'participationAccountabilityImprovement'
  | 'riskDoNoHarmCheck'
  | 'objectiveActivityRepair'
  | 'evidenceIndicatorImprovement'
  | 'safeFirstDesignChange'
  | 'implementationWatchPoint';
type SnapshotField = {
  id: SnapshotFieldId;
  label: string;
  prompt: string;
  placeholder: string;
  source: string;
  sourceNotes: string;
  maxLength: number;
};
type SnapshotSection = {
  id: string;
  title: string;
  fields: SnapshotField[];
};
type M3PortfolioSnapshot = Record<SnapshotFieldId, string> & {
  knowledgeCheckReviewFlags: string[];
  sourceScreensUsed: string[];
  learnerEditedFields: string[];
  savedAt: string;
};

const proposalAssets = {
  screen17Hero: {
    src: '/assets/hrba/modules/module-3/m3-s17-draft-plan-review-studio-elementor-io-optimized.webp',
    alt: 'A local CSO team reviews selected sections of a draft development proposal before implementation.',
  },
  screen17Empty: '/assets/hrba/modules/module-3/m3-s17-proposal-section-viewer-empty.svg',
  sequence: '/assets/hrba/modules/module-3/m3-s17-s19-proposal-review-repair-sequence.svg',
  screen18Hero: {
    src: '/assets/hrba/modules/module-3/m3-s18-proposal-gap-map-scene-elementor-io-optimized.webp',
    alt: 'A team maps HRBA gaps across proposal sections using cards and status markers.',
  },
  screen18Empty: '/assets/hrba/modules/module-3/m3-s18-proposal-gap-map-empty.svg',
  screen19Hero: {
    src: '/assets/hrba/modules/module-3/m3-s19-before-after-repair-canvas-scene-elementor-io-optimized.webp',
    alt: 'A before-and-after repair canvas shows a weak proposal section becoming a stronger rights-based design.',
  },
  screen19Empty: '/assets/hrba/modules/module-3/m3-s19-before-after-repair-canvas-empty.svg',
  watchStrip: '/assets/hrba/modules/module-3/m3-s19-implementation-watchpoint-strip.svg',
};

const proposalSafetyText =
  'Use the Jiru Amba learning case only. For your own work, use general labels. Do not enter names, exact locations, complaints, incidents, confidential proposal details, or information that could identify people.';

const proposalSections: ProposalSection[] = [
  {
    id: 'problem',
    number: 1,
    title: 'Problem statement',
    excerpt:
      'Jiru Amba has several local service and development challenges. Community members have raised concerns about market access, water repair, youth livelihood support, and health post improvement. The project will support local planning and service improvement by bringing community members together and helping them identify priority actions.',
    notice: 'Does the problem statement explain unequal barriers and root causes, or only general needs?',
    suggestedGapIds: ['specificRightsHolders', 'barriersVisible', 'participationInfluence'],
  },
  {
    id: 'rightsHolders',
    number: 2,
    title: 'Target groups and rights-holders',
    excerpt:
      'The project will benefit the community, especially women, youth, persons with disabilities, and low-income households. These groups will be invited to participate in consultations and will be encouraged to share their views during project activities.',
    notice: 'Does this section move beyond broad groups and show specific rights-holder barriers safely?',
    suggestedGapIds: ['specificRightsHolders', 'barriersVisible', 'genderDisabilityBuiltIn'],
  },
  {
    id: 'actors',
    number: 3,
    title: 'Actors and partnerships',
    excerpt:
      'Awra will work with local stakeholders, community representatives, and service actors to implement the plan. The project will encourage collaboration among relevant offices and community groups to improve coordination and service delivery.',
    notice: 'Does this section clarify who has responsibility, who supports, and what the CSO role is?',
    suggestedGapIds: ['dutyBearersClear', 'csoRoleOverloaded', 'accountabilityResponseMentioned'],
  },
  {
    id: 'objectiveLogic',
    number: 4,
    title: 'Objective and intervention logic',
    excerpt:
      'The objective is to improve community participation and service access through training, meetings, feedback, and local development activities. The project will strengthen local engagement and contribute to better service improvement outcomes.',
    notice: 'Does the objective show rights-holders, barriers, responsibility, and realistic change?',
    suggestedGapIds: ['specificRightsHolders', 'barriersVisible', 'activitiesLinkedToBarriers'],
  },
  {
    id: 'activities',
    number: 5,
    title: 'Activity package',
    excerpt:
      'The project will hold community meetings, conduct youth livelihood training, install feedback boxes, support market improvement, include persons with disabilities, repair water points, and renovate selected health post areas.',
    notice: 'Are activities linked to barriers, rights-holder groups, responsible actors, risk, and evidence?',
    suggestedGapIds: ['activitiesLinkedToBarriers', 'dutyBearersClear', 'riskDoNoHarm'],
  },
  {
    id: 'inclusion',
    number: 6,
    title: 'Gender and disability inclusion',
    excerpt:
      'The project will ensure that at least 40% of participants are women and that persons with disabilities are invited to meetings. The plan will include ramps where possible and will encourage inclusive participation.',
    notice: 'Are gender and disability built into timing, access, information, feedback, reasonable accommodation, indicators, responsibility, and follow-up?',
    suggestedGapIds: ['genderDisabilityBuiltIn', 'participationInfluence', 'indicatorsShowChange'],
  },
  {
    id: 'participationAccountabilityRisk',
    number: 7,
    title: 'Participation, accountability, risk, and sustainability',
    excerpt:
      'Community members will participate through consultations, meetings, and feedback forms. Awra will collect feedback after activities and share summary findings with the project steering committee. The project will manage risks through regular monitoring and coordination.',
    notice: 'Does the plan show access, influence, response, follow-up, risk mitigation, and responsible actors?',
    suggestedGapIds: ['participationInfluence', 'accountabilityResponseMentioned', 'riskDoNoHarm'],
  },
  {
    id: 'monitoringEvidence',
    number: 8,
    title: 'Monitoring, evidence, and indicators',
    excerpt:
      'The project will monitor the number of meetings held, number of people trained, number of feedback forms received, number of facilities improved, and number of reports produced. The project team will prepare monitoring reports and share lessons learned.',
    notice: 'Do indicators show influence, access, benefit, response, inclusion, accountability, and safe evidence, or only activity delivery?',
    suggestedGapIds: ['indicatorsShowChange', 'accountabilityResponseMentioned', 'riskDoNoHarm'],
  },
];

const proposalGaps: ProposalGap[] = [
  { id: 'specificRightsHolders', label: 'Rights-holders are too broad', explanation: 'The proposal counts people but does not show which groups face which barriers.' },
  { id: 'barriersVisible', label: 'Barriers are not visible', explanation: 'The proposal does not explain what blocks access, voice, benefit, safety, or accountability.' },
  { id: 'dutyBearersClear', label: 'Duty-bearers or responsible actors are unclear', explanation: 'The proposal lists actors but does not show who has public responsibility or what they should do.' },
  { id: 'participationInfluence', label: 'Participation may not influence decisions', explanation: 'People may attend or be consulted, but the proposal does not show how they shape priorities, budgets, activities, or follow-up.' },
  { id: 'accountabilityResponseMentioned', label: 'Accountability or response is only mentioned', explanation: 'Feedback may be collected, but the proposal does not show response, explanation, correction, referral, or follow-up.' },
  { id: 'genderDisabilityBuiltIn', label: 'Gender and disability are not built into design', explanation: 'The proposal uses representation language but does not build in accessibility, accommodation, safety, care-work, or influence.' },
  { id: 'riskDoNoHarm', label: 'Risk and do-no-harm are weak', explanation: 'The proposal names project risks but not exclusion, backlash, privacy, capture, retaliation, or no-response risks.' },
  { id: 'activitiesLinkedToBarriers', label: 'Activities are not linked to barriers', explanation: 'Activities may be useful, but the proposal does not show which barrier, group, actor, risk, or evidence question they respond to.' },
  { id: 'indicatorsShowChange', label: 'Indicators count delivery, not change', explanation: 'The proposal counts trainings, meetings, reports, or participants but does not measure change in barriers, access, voice, or accountability.' },
  { id: 'csoRoleOverloaded', label: 'CSO role may be overloaded', explanation: 'The proposal may make Awra responsible for solving issues that require public, service, committee, or sector actor response.' },
];

const repairMoves: RepairMove[] = [
  { id: 'nameRightsHolders', group: 'Rights-holder and barrier repair', label: 'Name specific rights-holder groups safely', explanation: 'Move beyond the community or beneficiaries.' },
  { id: 'addBarriers', group: 'Rights-holder and barrier repair', label: 'Add barriers and root causes', explanation: 'Show what blocks access, influence, benefit, safety, or response.' },
  { id: 'clarifyDutyBearers', group: 'Responsibility and CSO role repair', label: 'Clarify duty-bearers or responsible actors', explanation: 'Show who should respond and what role the CSO can realistically play.' },
  { id: 'protectCsoRole', group: 'Responsibility and CSO role repair', label: 'Protect the CSO role', explanation: 'Keep Awra as facilitator/support actor and keep responsible public/service actors visible.' },
  { id: 'createInfluenceRoute', group: 'Participation and accountability repair', label: 'Create a result for influence', explanation: 'Show how rights-holders shape priorities before decisions are finalized.' },
  { id: 'addSafeFeedback', group: 'Participation and accountability repair', label: 'Add feedback and response', explanation: 'Show who receives feedback, who responds, and how people know what changed.' },
  { id: 'buildInInclusion', group: 'Inclusion and risk repair', label: 'Integrate inclusion', explanation: 'Build gender, disability, accessibility, timing, safety, language, and overlapping barriers into the design.' },
  { id: 'addRiskMitigation', group: 'Inclusion and risk repair', label: 'Add do-no-harm and safe evidence rules', explanation: 'Protect names, complaints, disability details, survivor stories, exact locations, and identifying information.' },
  { id: 'strengthenIndicators', group: 'Evidence and implementation repair', label: 'Strengthen indicators', explanation: 'Track influence, access, response, benefit, inclusion, accountability, or capacity change.' },
  { id: 'addImplementationWatchPoint', group: 'Evidence and implementation repair', label: 'Add implementation watch-point', explanation: 'Identify what the project should monitor during implementation.' },
];

const repairedProposalSections: Record<ProposalSectionId, { text: string; watchPoint: string }> = {
  problem: {
    text: 'The Jiru Amba service-improvement plan responds to barriers that affect groups differently. Women vendors, persons with disabilities, Women, in the context of household water responsibilities and water-service decisions, youth seeking livelihood opportunities, low-income households, remote kebele residents, and informal workers may face different barriers to information, participation, accessibility, service response, livelihood benefit, and follow-up. The project will therefore focus not only on general service needs, but on the barriers that limit rights-holder influence, access, accountability, and safe participation.',
    watchPoint: 'Watch whether the problem statement continues to guide barrier-focused design choices, not only general service priorities.',
  },
  rightsHolders: {
    text: 'The project will work with specific rights-holder groups who may experience the plan differently, including women vendors, Women, in the context of household water responsibilities and water-service decisions, youth seeking livelihood opportunities, persons with disabilities, low-income households, remote kebele residents, and informal workers. Each group will be linked to priority barriers such as late information, limited influence, accessibility barriers, cost, distance, livelihood risk, unsafe feedback, or unclear pathways to benefit. The project will use generalized and non-identifying evidence only.',
    watchPoint: 'Watch whether selection reaches people facing barriers, not only people already visible to committees.',
  },
  actors: {
    text: 'Awra will facilitate safe participation, support accessible information-sharing, document non-sensitive patterns, and help connect rights-holders with responsible actors. Public, service, committee, and sector actors will remain visible for decisions and responses within their roles, including planning, market, water, health, livelihood, accessibility, feedback, and follow-up responsibilities. The partnership approach will avoid making Awra responsible for solving service issues alone.',
    watchPoint: 'Watch whether responsible actors attend only events or also respond to agreed follow-up actions.',
  },
  objectiveLogic: {
    text: 'The project will strengthen meaningful, accessible, and accountable participation of lower-influence rights-holder groups in Jiru Amba service-improvement decisions, while supporting responsible planning and service actors to respond to priorities, feedback, accessibility barriers, and service-improvement commitments. Activities will be linked to specific barriers, responsible actors, safe evidence, and implementation watch-points.',
    watchPoint: 'Watch whether activities remain linked to barrier reduction and accountability, not only completed as events.',
  },
  activities: {
    text: 'The activity package will be revised so each activity responds to a specific barrier. Participation activities will share information before decisions and show how rights-holder priorities changed the plan. Youth livelihood training will be linked to realistic follow-up pathways. Feedback channels will be safe, accessible, and connected to response roles. Disability inclusion will include accessible information, reasonable accommodation, and responsibility for follow-up. Market, water, and health activities will include responsible service actors, non-identifying feedback, and evidence of change.',
    watchPoint: 'Watch whether activities change when feedback shows that some groups still cannot participate safely or meaningfully.',
  },
  inclusion: {
    text: 'Gender and disability will be built into design decisions, not only mentioned through targets or invitations. The project will check timing, care responsibilities, safety, accessibility, transport, information formats, reasonable accommodation, feedback access, and follow-up responsibilities. Inclusion actions will be linked to budget, actor responsibility, indicators, and safe non-identifying evidence. The project will also consider overlapping barriers, such as disability, gender, income, distance, and livelihood risk.',
    watchPoint: 'Watch whether women and persons with disabilities influence decisions, not only whether they are present.',
  },
  participationAccountabilityRisk: {
    text: 'Participation will begin before decisions are finalized. Specific rights-holder groups will receive accessible information, use safe participation channels, influence relevant priorities, and receive follow-up on what changed. Feedback will be collected through non-identifying, accessible, and trusted channels. Responsible public, service, committee, or sector actors will respond to issues within their roles, while Awra facilitates safe communication and documents non-sensitive patterns. Risk monitoring will include exclusion, unsafe feedback, gatekeeping, CSO role overload, and unrealistic assumptions.',
    watchPoint: 'Watch whether lower-influence groups receive information early, feedback receives response, and responsible actors follow up.',
  },
  monitoringEvidence: {
    text: 'Monitoring will track more than activity delivery. Indicators will show whether rights-holder groups received information before decisions, influenced priorities, accessed benefits, used safe feedback channels, received responses, and experienced reduced barriers. Evidence will be non-identifying and may include facilitation notes, safe feedback summaries, accessibility checks, revised activity records, follow-up summaries, and implementation watch-points. The project will not collect names, complaint details, disability or medical details, survivor stories, exact sensitive locations, or identifiable information.',
    watchPoint: 'Watch whether indicators track influence and access safely, not only meetings, trainings, forms, facilities, and reports.',
  },
};

function getProposalSection(id: ProposalSectionId) {
  return proposalSections.find((section) => section.id === id) || proposalSections[0];
}

function getProposalGap(id: ProposalGapId) {
  return proposalGaps.find((gap) => gap.id === id) || proposalGaps[0];
}

function getRepairMove(id: RepairMoveId) {
  return repairMoves.find((move) => move.id === id) || repairMoves[0];
}

const repairMoveGroups: RepairMoveGroup[] = [
  'Rights-holder and barrier repair',
  'Responsibility and CSO role repair',
  'Participation and accountability repair',
  'Inclusion and risk repair',
  'Evidence and implementation repair',
];

function hasUnsafeProposalPracticeDetail(values: string[]) {
  const combined = values.join(' ').trim();
  if (!combined) return false;
  return /\b(name|named|complaint|survivor|accusation|medical|diagnosis|confidential|exact location|real official|phone|email)\b/i.test(combined) ||
    /\b[A-Z][a-z]+ [A-Z][a-z]+\b/.test(combined);
}

function getEmptyScreen17OwnCsoDraft(): Screen17OwnCsoDraft {
  return { planSection: '', summary: '', decision: '', why: '' };
}

function getEmptyScreen18OwnCsoDraft(): Screen18OwnCsoDraft {
  return { planSection: '', summary: '', gaps: [], whyThisMatters: '', recommendedRepairMove: '' };
}

function getEmptyScreen19OwnCsoDraft(): Screen19OwnCsoDraft {
  return { planSection: '', weakSummary: '', repairMoves: [], repairedVersion: '', designChange: '', implementationWatchPoint: '', safeEvidenceNote: '' };
}

const draftPlanReviewTemplateMarkdown = `# Draft Plan Review Template

## 1. Plan Section

## 2. Short Section Summary

## 3. HRBA Review Question

## 4. Review Decision
- Ready for now
- Needs HRBA gap check

## 5. Why This Section Needs Attention

## 6. Carry-Forward to HRBA Gap Map
`;

const hrbaGapMapTemplateMarkdown = `# HRBA Gap Map Template

## 1. Proposal Section

## 2. HRBA Gap Tags

## 3. Why This Matters

## 4. Repair Priority

## 5. Recommended Repair Move

## 6. Carry-Forward to Section Repair
`;

const planSectionRepairTemplateMarkdown = `# Plan Section Repair Template

## 1. Proposal Section

## 2. Weak Version or Safe Summary

## 3. HRBA Gaps Selected

## 4. Repair Moves Selected

## 5. Repaired Version

## 6. Why This Is Stronger

## 7. What Changed in the Design

## 8. Implementation Watch-Point

## 9. Safe Evidence Note

## 10. Carry-Forward to Portfolio Snapshot
`;

function countNeedsHrbaCheck(review: Partial<Record<ProposalSectionId, ProposalReviewStatus>>) {
  return proposalSections.filter((section) => review[section.id] === 'needsHrbaCheck').length;
}

function getProposalReviewSignature(review: Partial<Record<ProposalSectionId, ProposalReviewStatus>>) {
  return proposalSections.map((section) => `${section.id}:${review[section.id] || ''}`).join('|');
}

function buildScreen17Submission(review: Record<ProposalSectionId, ProposalReviewStatus>): Screen17Submission {
  const needsHrbaCheck = proposalSections.filter((section) => review[section.id] === 'needsHrbaCheck').map((section) => section.id);
  const readyForNow = proposalSections.filter((section) => review[section.id] === 'readyForNow').map((section) => section.id);
  const feedbackMessage = needsHrbaCheck.length >= 3 && needsHrbaCheck.length <= 6
    ? 'Strong review. You identified sections that need deeper HRBA checking instead of relying only on polished wording. Use this preview in the next screen to find specific HRBA gaps across the plan.'
    : needsHrbaCheck.length > 6
      ? 'You marked many sections for checking. That is acceptable for this draft, but in the next screen prioritize the gaps that would most weaken implementation if left unchanged.'
      : 'This review may be too generous. A section can look complete but still miss barriers, responsibility, participation influence, response, risk, or safe evidence. Check whether the design logic is really visible.';
  return {
    screenId: 'M3-R17',
    route: '/module-3/screen-3-17',
    title: 'Open the Draft Plan',
    proposalReviewSections: {
      checkedSections: review,
      needsHrbaCheck,
      readyForNow,
      generatedAt: new Date().toISOString(),
    },
    draftPlanReviewPreview: {
      sectionsMarkedForHrbaGapCheck: needsHrbaCheck,
      sectionsReadyForNow: readyForNow,
      whyTheseSectionsNeedAttention: 'These sections may sound useful, but they need checking for specific rights-holder groups, barriers, responsibility, participation, accountability, inclusion, risk, safe evidence, and realistic CSO roles.',
      whatToDoNext: 'In the next screen, you will identify the specific HRBA gaps across the plan and decide which gaps are most important to repair.',
      feedbackMessage,
    },
    safetyConfirmation: proposalSafetyText,
    portfolioSummary: 'You completed a draft plan review preview. You identified which sections of the Jiru Amba draft plan need deeper HRBA gap checking before repair.',
  };
}

function getScreen17SavedOutput(state: LearningState): Screen17Submission | null {
  const record = getPracticeState(state, 'M3-R17');
  const nested = record.screen17;
  if (nested && typeof nested === 'object' && (nested as Screen17Submission).screenId === 'M3-R17') return nested as Screen17Submission;
  if (record.screenId === 'M3-R17') return record as Screen17Submission;
  return null;
}

function getScreen18SavedOutput(state: LearningState): Screen18Submission | null {
  const record = getPracticeState(state, 'M3-R18');
  const nested = record.screen18;
  if (nested && typeof nested === 'object' && (nested as Screen18Submission).screenId === 'M3-R18') return nested as Screen18Submission;
  if (record.screenId === 'M3-R18') return record as Screen18Submission;
  return null;
}

function getGapMapSignature(gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>) {
  return proposalSections
    .map((section) => `${section.id}:${[...(gapsBySection[section.id] || [])].sort().join(',')}`)
    .join('|');
}

function getSelectedGapSections(gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>) {
  return proposalSections.filter((section) => (gapsBySection[section.id] || []).length > 0);
}

function getTotalGapCount(gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>) {
  return proposalSections.reduce((count, section) => count + (gapsBySection[section.id] || []).length, 0);
}

function isScreen18Valid(gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>) {
  return getSelectedGapSections(gapsBySection).length >= 3 && getTotalGapCount(gapsBySection) >= 5 && !isScreen18OverTagged(gapsBySection);
}

function isScreen18OverTagged(gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>) {
  return getSelectedGapSections(gapsBySection).length >= 7 && getTotalGapCount(gapsBySection) >= 24;
}

function hasScreen18EvidenceGap(gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>) {
  return (gapsBySection.monitoringEvidence || []).length > 0;
}

function getRepairPriority(gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>): ProposalSectionId {
  const priorityOrder: ProposalSectionId[] = ['participationAccountabilityRisk', 'monitoringEvidence', 'inclusion', 'actors', 'activities', 'objectiveLogic', 'rightsHolders', 'problem'];
  const firstPriority = priorityOrder.find((sectionId) => getSectionRepairPriority(gapsBySection[sectionId] || []) === 'High priority');
  if (firstPriority) return firstPriority;
  const selected = getSelectedGapSections(gapsBySection);
  return selected.reduce((best, section) => ((gapsBySection[section.id] || []).length > (gapsBySection[best.id] || []).length ? section : best), selected[0] || proposalSections[0]).id;
}

function getSectionRepairPriority(gapIds: ProposalGapId[]): Screen18RepairPriority {
  const highPriority: ProposalGapId[] = ['dutyBearersClear', 'participationInfluence', 'accountabilityResponseMentioned', 'genderDisabilityBuiltIn', 'riskDoNoHarm', 'indicatorsShowChange'];
  if (gapIds.some((gapId) => highPriority.includes(gapId))) return 'High priority';
  if (gapIds.length > 0) return 'Medium priority';
  return 'Low priority';
}

const sectionGapGuidance: Record<ProposalSectionId, { whyThisMatters: string; recommendedRepairMove: string }> = {
  problem: {
    whyThisMatters: 'A problem statement that describes general needs but not unequal barriers will not guide rights-based design.',
    recommendedRepairMove: 'Add specific rights-holder groups, barriers, root causes, and safe evidence of unequal access or influence.',
  },
  rightsHolders: {
    whyThisMatters: 'Broad target-group labels can hide who is affected differently and what barriers they face.',
    recommendedRepairMove: 'Name specific groups safely and connect each group to priority barriers and design implications.',
  },
  actors: {
    whyThisMatters: 'If responsible actors are unclear, the CSO may become overloaded and accountability may weaken.',
    recommendedRepairMove: 'Clarify duty-bearers, service actors, supporting actors, Awra’s facilitation role, and follow-up responsibility.',
  },
  objectiveLogic: {
    whyThisMatters: 'A broad objective can make the project activity-based instead of change-oriented.',
    recommendedRepairMove: 'Add rights-holder focus, barrier reduction, responsible actor response, and realistic change.',
  },
  activities: {
    whyThisMatters: 'Activities that are not linked to barriers may be delivered without changing exclusion, access, influence, or accountability.',
    recommendedRepairMove: 'Link each activity to a barrier, group, responsible actor, risk adjustment, and safe evidence question.',
  },
  inclusion: {
    whyThisMatters: 'Naming women or persons with disabilities is not enough if the design does not change timing, access, communication, accommodation, feedback, indicators, or responsibility.',
    recommendedRepairMove: 'Build gender and disability into participation, accessibility, reasonable accommodation, feedback, budget, indicators, and follow-up.',
  },
  participationAccountabilityRisk: {
    whyThisMatters: 'Participation is weak if it does not influence decisions. Accountability is weak if feedback is collected but not answered. Risk is weak if harm is only monitored after implementation.',
    recommendedRepairMove: 'Add access, influence, response, follow-up, risk mitigation, responsible actors, and implementation watch-points.',
  },
  monitoringEvidence: {
    whyThisMatters: 'Counting meetings, trainings, forms, facilities, and reports does not show whether rights-holder groups influenced decisions, accessed benefits, received response, or experienced reduced barriers.',
    recommendedRepairMove: 'Add indicators for influence, access, response, inclusion, benefit, accountability, and safe non-identifying evidence.',
  },
};

function getScreen18Feedback(gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>) {
  const allGaps = proposalSections.flatMap((section) => gapsBySection[section.id] || []);
  const count = (ids: ProposalGapId[]) => allGaps.filter((gapId) => ids.includes(gapId)).length;
  const messages: string[] = [];
  if (count(['specificRightsHolders']) >= 2) messages.push('Pattern noticed: the proposal may be counting people more than analyzing rights-holders. In the repair screen, make the affected groups and their barriers more specific.');
  if (count(['dutyBearersClear', 'csoRoleOverloaded']) >= 2) messages.push('Pattern noticed: the CSO role may be carrying too much responsibility. A rights-based design should clarify what duty-bearers, supporting actors, rights-holders, and the CSO each do.');
  if (count(['participationInfluence', 'accountabilityResponseMentioned']) >= 2) messages.push('Pattern noticed: participation and feedback may be present, but not yet connected to influence, response, and follow-up.');
  if (count(['genderDisabilityBuiltIn']) > 0) messages.push('Pattern noticed: gender and disability should change design choices, not only participant numbers. Check access, timing, safety, communication, reasonable accommodation, and decision influence.');
  if (count(['riskDoNoHarm']) > 0) messages.push('Pattern noticed: the risk section may protect project delivery more than rights-holders. Add exclusion, privacy, backlash, capture, and no-response risks.');
  if (count(['indicatorsShowChange']) > 0) messages.push('Pattern noticed: the monitoring plan may count activities more than change. Stronger indicators should show whether barriers reduce and accountability improves.');
  if (!hasScreen18EvidenceGap(gapsBySection)) messages.push('Check the monitoring and evidence section. HRBA indicators should show influence, access, response, inclusion, benefit, or accountability, not only activity delivery.');
  return messages.slice(0, 3);
}

function buildScreen18Cards(gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>): Screen18GapMapCard[] {
  return getSelectedGapSections(gapsBySection).map((section) => {
    const selectedGaps = gapsBySection[section.id] || [];
    const guidance = sectionGapGuidance[section.id];
    return {
      sectionId: section.id,
      selectedGaps,
      whyThisMatters: guidance.whyThisMatters,
      repairPriority: getSectionRepairPriority(selectedGaps),
      recommendedRepairMove: guidance.recommendedRepairMove,
      carryForward: `Use this ${section.title.toLowerCase()} finding in Screen 19 if you choose this section for focused repair.`,
    };
  });
}

function buildScreen18Submission(gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>, ownCsoOutput?: Screen18OwnCsoOutput): Screen18Submission {
  const repairPriority = getRepairPriority(gapsBySection);
  return {
    screenId: 'M3-R18',
    route: '/module-3/screen-3-18',
    title: 'Find the HRBA Gaps Across the Plan',
    proposalGapMap: {
      gapsBySection,
      cards: buildScreen18Cards(gapsBySection),
      repairPriority,
      generatedAt: new Date().toISOString(),
    },
    patternFeedback: getScreen18Feedback(gapsBySection),
    ownCsoPracticeOutput: ownCsoOutput,
    safetyConfirmation: proposalSafetyText,
    portfolioSummary: 'You completed an HRBA gap map across the draft plan. You identified which proposal sections have gaps in rights-holder focus, barriers, responsibility, participation, accountability, inclusion, risk, activities, indicators, or CSO role boundaries.',
  };
}

function getRepairSelectionSignature(sectionId: ProposalSectionId, moveIds: RepairMoveId[]) {
  return `${sectionId}:${[...moveIds].sort().join(',')}`;
}

function getScreen19Feedback(moveIds: RepairMoveId[]) {
  const messages: string[] = [];
  if (moveIds.includes('clarifyDutyBearers') || moveIds.includes('protectCsoRole')) messages.push('Strong repair. Your revised section changes the design logic, not only the wording. It shows responsible actors and avoids making Awra responsible for everything.');
  if (moveIds.includes('createInfluenceRoute') || moveIds.includes('addSafeFeedback')) messages.push('Strong repair move: you connected participation to influence, response, and follow-up. That is stronger than consultation alone.');
  if (moveIds.includes('buildInInclusion')) messages.push('Strong repair move: you treated gender and disability as design issues, not only attendance numbers.');
  if (moveIds.includes('addRiskMitigation')) messages.push('Strong repair move: you checked risk to rights-holders, not only risk to project delivery.');
  if (moveIds.includes('strengthenIndicators') || moveIds.includes('addImplementationWatchPoint')) messages.push('Strong repair move: you added a way to know whether the repair is working during implementation.');
  if (messages.length === 0) messages.push('This still reads like adding HRBA words. Strengthen it by showing what changes in the project design.');
  return messages.slice(0, 3);
}

function getDesignChanges(moveIds: RepairMoveId[]) {
  const changes: Record<RepairMoveId, string> = {
    nameRightsHolders: 'Specific groups are visible.',
    addBarriers: 'Barriers are clearer.',
    clarifyDutyBearers: 'Responsible actors are named by role.',
    protectCsoRole: 'Awra’s role is realistic.',
    createInfluenceRoute: 'Participation includes influence.',
    addSafeFeedback: 'Feedback includes response.',
    buildInInclusion: 'Gender and disability are built into design.',
    addRiskMitigation: 'Risk and do-no-harm are included.',
    strengthenIndicators: 'Indicators show change, not only delivery.',
    addImplementationWatchPoint: 'Implementation watch-points are visible.',
  };
  return moveIds.map((moveId) => changes[moveId]);
}

function buildScreen19Submission(sectionId: ProposalSectionId, moveIds: RepairMoveId[], previousGaps: ProposalGapId[], ownCsoOutput?: Screen19OwnCsoOutput): Screen19Submission {
  const section = getProposalSection(sectionId);
  const repaired = repairedProposalSections[sectionId];
  return {
    screenId: 'M3-R19',
    route: '/module-3/screen-3-19',
    title: 'Repair One Plan Section',
    proposalSectionRepair: {
      selectedSection: sectionId,
      selectedGaps: previousGaps,
      selectedRepairMoves: moveIds,
      beforeText: section.excerpt,
      repairedText: repaired.text,
      whyStronger: 'The repaired version is stronger because it changes the design logic, not only the wording. It makes rights-holder groups, barriers, responsible actors, participation, response, risk, and evidence clearer.',
      designChanges: getDesignChanges(moveIds),
      implementationWatchPoint: repaired.watchPoint,
      safeEvidenceNote: 'Use non-identifying evidence only. Do not record names, complaint details, disability or medical details, survivor stories, exact sensitive locations, accusations, or identifiable information.',
      carryForward: 'Carry this repaired section into the portfolio snapshot as evidence that you can identify and repair HRBA gaps in a project plan.',
      generatedAt: new Date().toISOString(),
    },
    feedbackMessages: getScreen19Feedback(moveIds),
    ownCsoPracticeOutput: ownCsoOutput,
    safetyConfirmation: proposalSafetyText,
    portfolioSummary: 'You completed a before/after repair canvas. You repaired one draft plan section by changing the design logic, not only the wording, and carried forward a safe evidence note and implementation watch-point.',
  };
}

const screen20Questions: Screen20Question[] = [
  {
    id: 'Q1',
    title: 'Question 1 — Diagnosing the hidden HRBA gap',
    scenario:
      '“The project will support inclusive local development through training, awareness sessions, stakeholder meetings, and small grants. It will reach women, youth, persons with disabilities, and grassroots CSOs. The project includes a monitoring plan, a risk section, and a sustainability strategy.”',
    prompt: 'Which review comment is strongest?',
    options: [
      { id: 'A', text: 'The draft is already strong because it includes inclusion groups, activities, monitoring, risk, and sustainability.' },
      { id: 'B', text: 'The draft mostly needs clearer donor wording so the proposal sounds more aligned with CSF Plus / EU-style language.' },
      { id: 'C', text: 'The draft may look complete, but it still needs HRBA checking because it does not show specific barriers, duty-bearer responsibilities, participation influence, accountability, or rights-based change.' },
      { id: 'D', text: 'The draft should remove activities and focus only on legal rights language, because HRBA is mainly about standards and obligations.' },
    ],
    correctAnswer: 'C',
    feedback:
      'The strongest review looks beneath the proposal structure. A proposal can include activities, target groups, indicators, and risks but still be HRBA-weak if it does not show who is excluded, why they face barriers, who has responsibility, how people influence decisions, and how accountability works.',
    designReminder: 'A polished proposal is not the same as a rights-based design.',
    strongArea: 'Diagnosing hidden HRBA gaps beneath polished proposal language',
    reviewFlag: 'Check hidden HRBA gaps, not only proposal completeness',
  },
  {
    id: 'Q2',
    title: 'Question 2 — Target groups and rights-holder analysis',
    scenario:
      '“The project will reach 1,200 community members. At least 50% will be women and 10% will be persons with disabilities. Local committees will support participant selection.”',
    prompt: 'Which improvement would make this section more rights-based?',
    options: [
      { id: 'A', text: 'Increase the number of participants so the proposal can demonstrate wider reach.' },
      { id: 'B', text: 'Add a sentence saying women and persons with disabilities are vulnerable beneficiaries who need support.' },
      { id: 'C', text: 'Explain which women, youth, persons with disabilities, and low-income groups face which barriers; how selection criteria will be transparent; and how excluded groups can safely question or appeal selection.' },
      { id: 'D', text: 'Ask local committees to select the most active participants so activities are delivered efficiently.' },
    ],
    correctAnswer: 'C',
    feedback:
      'Numbers are useful, but they do not replace rights-holder and barrier analysis. A rights-based target-group section should show which groups face which access, information, mobility, safety, social, economic, or decision-making barriers. It should also show transparent selection and a safe way to ask questions or raise concerns.',
    designReminder:
      'Inclusion is not only “how many people are counted”; it is whether people facing barriers can access, influence, benefit, and receive response.',
    strongArea: 'Moving beyond target numbers to rights-holder and barrier analysis',
    reviewFlag: 'Strengthen rights-holder and barrier analysis',
  },
  {
    id: 'Q3',
    title: 'Question 3 — Duty-bearers, supporting actors, and CSO role',
    scenario:
      '“The CSO will improve local service responsiveness by training community members, organizing dialogue meetings, and monitoring service gaps. Local authorities will be invited to launch and closing events.”',
    prompt: 'Which repair best protects the HRBA role logic?',
    options: [
      { id: 'A', text: 'Make the CSO responsible for solving service gaps directly, because the CSO is closest to the community.' },
      { id: 'B', text: 'Name local authorities as project beneficiaries so they feel included and do not resist the project.' },
      { id: 'C', text: 'Clarify which public actors have responsibilities, what support they may need to respond, how rights-holders will raise evidence safely, and what the CSO will do as facilitator, evidence user, connector, and accountability supporter.' },
      { id: 'D', text: 'Remove duty-bearers from the design because involving public actors could make the project politically sensitive.' },
    ],
    correctAnswer: 'C',
    feedback:
      'The strongest repair keeps responsibility visible without making the CSO the substitute duty-bearer. HRBA strengthens both rights-holders and duty-bearers. A CSO can facilitate, connect, support evidence use, strengthen voice, and encourage accountability, but it should not quietly take over public responsibilities.',
    designReminder: 'A bounded CSO role is safer and more rights-based than a heroic CSO role.',
    strongArea: 'Clarifying duty-bearer responsibility and a bounded CSO role',
    reviewFlag: 'Clarify duty-bearers and bounded CSO role',
  },
  {
    id: 'Q4',
    title: 'Question 4 — Participation and accountability',
    scenario:
      '“The project will organize quarterly consultation meetings. Community representatives will attend and share priorities. A suggestion box will be placed at the CSO office.”',
    prompt: 'Which review finding is strongest?',
    options: [
      { id: 'A', text: 'The design is sufficient because regular meetings and a suggestion box show participation and accountability.' },
      { id: 'B', text: 'The design should focus on more meetings because participation improves when meeting frequency increases.' },
      { id: 'C', text: 'The design should collect more written suggestions because written feedback is easier to report to donors.' },
      { id: 'D', text: 'The design needs stronger participation and accountability because it does not show who receives information, who can attend safely, whose views influence decisions, how feedback is reviewed, and how people hear what changed.' },
    ],
    correctAnswer: 'D',
    feedback:
      'Attendance and feedback channels are not enough. HRBA asks whether participation is informed, inclusive, meaningful, and connected to decisions. Accountability also requires response: people should know how feedback is handled, what changed, what did not change, and why.',
    designReminder: 'Participation becomes meaningful when it can influence decisions and receive follow-up.',
    strongArea: 'Connecting participation to influence, response, and follow-up',
    reviewFlag: 'Strengthen participation influence and feedback response',
  },
  {
    id: 'Q5',
    title: 'Question 5 — Intervention logic and indicators',
    scenario: '“To improve participation of women, youth, and persons with disabilities in local development planning.”',
    prompt: 'Which indicator set is strongest?',
    options: [
      { id: 'A', text: 'Number of awareness sessions held; number of participants trained; number of brochures distributed.' },
      { id: 'B', text: 'Percentage of planning meetings attended by women, youth, and persons with disabilities; number of social media posts on inclusion; number of project reports submitted.' },
      { id: 'C', text: 'Evidence that selected planning decisions changed after inputs from women, youth, and persons with disabilities; percentage of feedback items receiving a response within an agreed timeframe; number of accessibility or information barriers removed before meetings.' },
      { id: 'D', text: 'Number of local officials invited; number of stakeholder workshops completed; number of participants who say the training was useful.' },
    ],
    correctAnswer: 'C',
    feedback:
      'The strongest indicator set looks for influence, response, and barrier removal. HRBA indicators should not only count activities or attendance. They should show whether people could participate meaningfully, whether duty-bearers or decision-makers responded, and whether barriers changed.',
    designReminder: 'Strong indicators show change in access, influence, accountability, and conditions — not only completed activities.',
    strongArea: 'Selecting indicators that show change in access, influence, accountability, and barriers',
    reviewFlag: 'Improve intervention logic and indicators',
  },
  {
    id: 'Q6',
    title: 'Question 6 — Safe evidence and do-no-harm',
    scenario:
      'A donor asks the CSO to include “powerful human stories” and examples of complaints in the proposal annex. The team has notes from community consultations, including sensitive concerns about exclusion and local gatekeeping.',
    prompt: 'What is the safest HRBA response?',
    options: [
      { id: 'A', text: 'Include detailed stories because real examples make the proposal more convincing.' },
      { id: 'B', text: 'Remove all community evidence because sensitive information should never influence project design.' },
      { id: 'C', text: 'Use minimum necessary evidence: aggregate patterns, anonymized or composite examples, non-identifying summaries, consented safe quotations only where appropriate, and no raw complaints or details that could identify people.' },
      { id: 'D', text: 'Ask local leaders to approve which complaint examples can be included, because they know the community context.' },
    ],
    correctAnswer: 'C',
    feedback:
      'Safe evidence should support design without exposing people. The strongest response uses patterns, anonymized or composite examples, minimum necessary detail, and consented information only where appropriate. Raw complaints, identifiable stories, or leader-approved sensitive details can create risk.',
    designReminder: 'Evidence is useful only when it is necessary, safe, and respectful.',
    strongArea: 'Using safe evidence and do-no-harm practice',
    reviewFlag: 'Use safer evidence and do-no-harm rules',
  },
];

const screen20CarryForward =
  'Use your review flags on the next screen. Your HRBA Project Design Improvement Snapshot should show how your design handles rights-holders, barriers, responsibilities, participation, accountability, risk, and evidence — not only activities.';

const screen21SafetyNote =
  'Use fictional, generalized, or non-sensitive examples. Do not include real names, exact locations, complaints, incidents, confidential proposal details, or information that could identify people. For your own work, write general section names and safe design notes.';

const implementationWatchPointOptions = [
  'participation is not influencing decisions',
  'duty-bearers are not responding',
  'excluded groups are not reached',
  'feedback is collected but not answered',
  'risk mitigation is not being followed',
  'indicators only count activities',
];

const snapshotSections: SnapshotSection[] = [
  {
    id: 'issue-standards',
    title: 'Section 1 — Issue and standards',
    fields: [
      {
        id: 'projectIssueOrSection',
        label: 'Project issue or proposal section reviewed',
        prompt: 'What project issue or proposal section did you improve?',
        placeholder: 'Example: “Participation, accountability, and risk section of a local development proposal.”',
        source: 'From your proposal repair',
        sourceNotes: 'This can draw from your repaired proposal section, context scan, or gap-map repair priority.',
        maxLength: 320,
      },
      {
        id: 'rightsStandards',
        label: 'Rights or standards connected to the issue',
        prompt: 'Which rights, standards, policies, or public commitments help explain why this issue matters?',
        placeholder: 'Example: “Participation in public decision-making, equality and non-discrimination, access to information, and accountable public service response.”',
        source: 'From your standards map',
        sourceNotes: 'This can draw from your policy and standards map and any knowledge-check review flags.',
        maxLength: 420,
      },
    ],
  },
  {
    id: 'rights-barriers',
    title: 'Section 2 — Rights-holders and barriers',
    fields: [
      {
        id: 'specificRightsHolders',
        label: 'Specific rights-holders',
        prompt: 'Which groups should the design understand more specifically?',
        placeholder: 'Example: “Women market users, youth seeking livelihood opportunities, persons with disabilities, low-income residents, and grassroots CSO members.”',
        source: 'From your barrier map',
        sourceNotes: 'This can draw from your rights-holder and barrier map, target-group review, and proposal gap map.',
        maxLength: 420,
      },
      {
        id: 'keyBarriers',
        label: 'Key barriers',
        prompt: 'What barriers affect access, participation, benefit, safety, voice, or influence?',
        placeholder: 'Example: “Information gaps, inaccessible meeting formats, care-work timing barriers, unclear selection criteria, gatekeeper influence, and weak feedback response.”',
        source: 'From your barrier map',
        sourceNotes: 'This can draw from your barrier map, root-cause canvas, and gender/disability design check.',
        maxLength: 460,
      },
    ],
  },
  {
    id: 'actors-power',
    title: 'Section 3 — Actors, responsibilities, power, and CSO role',
    fields: [
      {
        id: 'dutyBearersSupportingActors',
        label: 'Duty-bearers and supporting actors',
        prompt: 'Who has responsibilities or influence in this design?',
        placeholder: 'Example: “Relevant local public offices, service providers, local committees, community representatives, grassroots CSOs, and project partners.”',
        source: 'From your responsibility map',
        sourceNotes: 'This can draw from your actor/responsibility map, proposal review, and proposal repair.',
        maxLength: 420,
      },
      {
        id: 'csoRole',
        label: 'CSO role',
        prompt: 'What is the realistic CSO role?',
        placeholder: 'Example: “Facilitate safe participation, support evidence use, connect rights-holders and duty-bearers, monitor barriers, and help communicate follow-up without replacing public responsibilities.”',
        source: 'From your responsibility map',
        sourceNotes: 'This can draw from your CSO role analysis, repair moves, and Screen 20 review flags.',
        maxLength: 460,
      },
      {
        id: 'powerCapacityGaps',
        label: 'Power or capacity gaps',
        prompt: 'What power or capacity gap must the design watch?',
        placeholder: 'Example: “Some formal representatives have more influence than women, youth, and persons with disabilities; duty-bearers may also need clearer evidence, resources, or routines to respond.”',
        source: 'From your power and root-cause work',
        sourceNotes: 'This can draw from your power map and root-cause/capacity-gap screen.',
        maxLength: 460,
      },
    ],
  },
  {
    id: 'inclusion-accountability-risk',
    title: 'Section 4 — Inclusion, participation, accountability, and risk',
    fields: [
      {
        id: 'genderDisabilityConsiderations',
        label: 'Gender and disability considerations',
        prompt: 'How should gender and disability be built into the design, not only mentioned?',
        placeholder: 'Example: “Plan accessible information, meeting timing, transport or accommodation support, safe facilitation, disaggregated review, and budget lines for inclusion.”',
        source: 'From your inclusion check',
        sourceNotes: 'This can draw from your gender and disability design check and proposal gap map.',
        maxLength: 460,
      },
      {
        id: 'participationAccountabilityImprovement',
        label: 'Participation and accountability improvement',
        prompt: 'How will rights-holders influence decisions and receive follow-up?',
        placeholder: 'Example: “Share accessible information before meetings, create safe ways to contribute, record how inputs influence decisions, and report back on what changed and why.”',
        source: 'From your participation pathway',
        sourceNotes: 'This can draw from your participation/accountability pathway, proposal repair, and Screen 20 review flags.',
        maxLength: 460,
      },
      {
        id: 'riskDoNoHarmCheck',
        label: 'Risk and do-no-harm check',
        prompt: 'What risk needs mitigation before implementation?',
        placeholder: 'Example: “Avoid exposing sensitive feedback, prevent elite capture of selection, protect people who raise concerns, and use anonymized or aggregate evidence.”',
        source: 'From your risk board',
        sourceNotes: 'This can draw from your risk board, proposal review, and Screen 20 safe-evidence review flag.',
        maxLength: 460,
      },
    ],
  },
  {
    id: 'design-logic',
    title: 'Section 5 — Repaired design logic',
    fields: [
      {
        id: 'objectiveActivityRepair',
        label: 'Objective or activity repair',
        prompt: 'What is one concrete design repair you made?',
        placeholder: 'Example: “Shift from general awareness sessions to a participation pathway where specific rights-holders identify barriers, duty-bearers review evidence, and the project tracks response.”',
        source: 'From your proposal repair',
        sourceNotes: 'This can draw from your objective repair, activity package repair, and proposal section repair.',
        maxLength: 520,
      },
      {
        id: 'evidenceIndicatorImprovement',
        label: 'Evidence or indicator improvement',
        prompt: 'What indicator or evidence improvement will show rights-based change?',
        placeholder: 'Example: “Track whether participation changed decisions, whether feedback received response, and whether access barriers were removed.”',
        source: 'From your intervention logic',
        sourceNotes: 'This can draw from your intervention logic and indicators screen and Screen 20 review flags.',
        maxLength: 420,
      },
    ],
  },
  {
    id: 'module-4-carry',
    title: 'Section 6 — Carry forward to Module 4',
    fields: [
      {
        id: 'safeFirstDesignChange',
        label: 'One safe first design change',
        prompt: 'What is the first safe design change this project should make before implementation?',
        placeholder: 'Example: “Revise the participation and feedback plan before activities begin.”',
        source: 'From your proposal repair',
        sourceNotes: 'This can draw from the repair priority and the first change implied by your repaired section.',
        maxLength: 360,
      },
      {
        id: 'implementationWatchPoint',
        label: 'One implementation watch-point for Module 4',
        prompt: 'What should you watch during implementation to make sure the design stays rights-based?',
        placeholder: 'Example: “Check whether the people who faced barriers are actually receiving information, influencing decisions, and hearing follow-up.”',
        source: 'From your implementation watch-point',
        sourceNotes: 'This can draw from Screen 19, the risk board, and the participation/accountability pathway.',
        maxLength: 420,
      },
    ],
  },
];

function getScreen20SavedOutput(state: LearningState): Screen20Submission | null {
  const record = getPracticeState(state, 'M3-R20');
  const nested = record.appliedKnowledgeCheck;
  if (nested && typeof nested === 'object') return nested as Screen20Submission;
  return null;
}

function getScreen21SavedSnapshot(state: LearningState): M3PortfolioSnapshot | null {
  const record = getPracticeState(state, 'M3-R21');
  const nested = record.module3PortfolioSnapshot || record.m3ProjectDesignImprovementSnapshot;
  if (nested && typeof nested === 'object' && typeof (nested as M3PortfolioSnapshot).savedAt === 'string') {
    return nested as M3PortfolioSnapshot;
  }
  return null;
}

function getScreen20ScoreMessage(score: number) {
  if (score === 6) return 'Strong applied HRBA design judgment. You are ready to save your snapshot.';
  if (score === 5) return 'Strong result. Review the one point you missed and carry it into your snapshot.';
  if (score === 4) return 'Good working readiness. Your snapshot should pay attention to the review flags below.';
  return 'Review the missed areas and try again. These are core design decisions, not small details.';
}

function buildScreen20Submission(answers: Record<string, string>, completedReviewOfMissedQuestions: boolean): Screen20Submission {
  const correctAnswers = screen20Questions.filter((question) => answers[question.id] === question.correctAnswer).map((question) => question.id);
  const missedQuestions = screen20Questions.filter((question) => answers[question.id] !== question.correctAnswer).map((question) => question.id);
  return {
    answers,
    correctAnswers,
    missedQuestions,
    reviewFlags: screen20Questions.filter((question) => missedQuestions.includes(question.id)).map((question) => question.reviewFlag),
    score: correctAnswers.length,
    completedReviewOfMissedQuestions,
    generatedAt: new Date().toISOString(),
  };
}

function flattenSnapshotFields() {
  return snapshotSections.flatMap((section) => section.fields);
}

function getDefaultSnapshotValues(state: LearningState): Record<SnapshotFieldId, string> {
  const screen18 = getScreen18SavedOutput(state);
  const screen19 = (() => {
    const record = getPracticeState(state, 'M3-R19');
    const nested = record.screen19;
    if (nested && typeof nested === 'object' && (nested as Screen19Submission).screenId === 'M3-R19') return nested as Screen19Submission;
    if (record.screenId === 'M3-R19') return record as Screen19Submission;
    return null;
  })();
  const prioritySection = screen18 ? getProposalSection(screen18.proposalGapMap.repairPriority).title : '';
  const repairedSection = screen19 ? getProposalSection(screen19.proposalSectionRepair.selectedSection).title : '';
  const repairedMoves = screen19
    ? screen19.proposalSectionRepair.selectedRepairMoves.map((moveId) => getRepairMove(moveId).label).join(', ')
    : '';
  const selectedGaps = screen19 && screen19.proposalSectionRepair.selectedGaps.length > 0
    ? screen19.proposalSectionRepair.selectedGaps.map((gapId) => getProposalGap(gapId).label).join(', ')
    : '';

  return {
    projectIssueOrSection: repairedSection || prioritySection || 'Participation, accountability, and risk section of a local development proposal.',
    rightsStandards:
      'Participation in public decision-making, equality and non-discrimination, access to information, and accountable public service response.',
    specificRightsHolders:
      'Women market users, youth seeking livelihood opportunities, persons with disabilities, low-income residents, and grassroots CSO members.',
    keyBarriers:
      selectedGaps || 'Information gaps, inaccessible meeting formats, care-work timing barriers, unclear selection criteria, gatekeeper influence, and weak feedback response.',
    dutyBearersSupportingActors:
      'Relevant local public offices, service providers, local committees, community representatives, grassroots CSOs, and project partners.',
    csoRole:
      'Facilitate safe participation, support evidence use, connect rights-holders and duty-bearers, monitor barriers, and help communicate follow-up without replacing public responsibilities.',
    powerCapacityGaps:
      'Some formal representatives have more influence than women, youth, and persons with disabilities; duty-bearers may also need clearer evidence, resources, or routines to respond.',
    genderDisabilityConsiderations:
      'Plan accessible information, meeting timing, transport or accommodation support, safe facilitation, disaggregated review, and budget lines for inclusion.',
    participationAccountabilityImprovement:
      'Share accessible information before meetings, create safe ways to contribute, record how inputs influence decisions, and report back on what changed and why.',
    riskDoNoHarmCheck:
      'Avoid exposing sensitive feedback, prevent elite capture of selection, protect people who raise concerns, and use anonymized or aggregate evidence.',
    objectiveActivityRepair:
      screen19?.proposalSectionRepair.repairedText ||
      (repairedMoves
        ? `Use these repair moves in the selected section: ${repairedMoves}.`
        : 'Shift from general awareness sessions to a participation pathway where specific rights-holders identify barriers, duty-bearers review evidence, and the project tracks response.'),
    evidenceIndicatorImprovement:
      'Track whether participation changed decisions, whether feedback received response, and whether access barriers were removed.',
    safeFirstDesignChange:
      prioritySection ? `Revise the ${prioritySection.toLowerCase()} before activities begin.` : 'Revise the participation and feedback plan before activities begin.',
    implementationWatchPoint:
      screen19?.proposalSectionRepair.implementationWatchPoint ||
      'Check whether the people who faced barriers are actually receiving information, influencing decisions, and hearing follow-up.',
  };
}

function getSnapshotSourceScreensUsed(state: LearningState) {
  const sources: string[] = [];
  ['M3-R07', 'M3-R08', 'M3-R09', 'M3-R10', 'M3-R11', 'M3-R12', 'M3-R13', 'M3-R14', 'M3-R15', 'M3-R16', 'M3-R18', 'M3-R19', 'M3-R20'].forEach((screenId) => {
    if (Object.keys(getPracticeState(state, screenId)).length > 0) sources.push(screenId);
  });
  return sources;
}

function setRoute(path: string) {
  if (typeof window !== 'undefined') {
    window.history.pushState(null, '', path);
  }
}

function practiceKey(screenId: string) {
  return `module3_revised_${screenId.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
}

function completeScreen(
  screen: Module3RevisedScreen,
  onChangeState: Module3RevisedRendererProps['onChangeState'],
  value: Record<string, unknown> = {},
) {
  const isFinalScreen = screen.nextId === 'M4-PLAYER-00';

  onChangeState((prev) => {
    const progress = new Set(prev.screenProgress[MODULE_ID] || []);
    progress.add(screen.id);

    return {
      ...prev,
      currentModuleId: isFinalScreen ? 'module_04_implementation' : MODULE_ID,
      currentScreenId: screen.nextId,
      completedModules:
        isFinalScreen && !prev.completedModules.includes(MODULE_ID)
          ? [...prev.completedModules, MODULE_ID]
          : prev.completedModules,
      screenProgress: {
        ...prev.screenProgress,
        [MODULE_ID]: Array.from(progress),
      },
      practiceCheckState: {
        ...prev.practiceCheckState,
        [practiceKey(screen.id)]: {
          ...(prev.practiceCheckState[practiceKey(screen.id)] || {}),
          status: 'completed',
          completedAt: new Date().toISOString(),
          ...value,
        },
      },
    };
  });

  setRoute(isFinalScreen ? '/module-4/cover' : module3RevisedScreenRoutes[screen.nextId]);
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
    <button type="button" className="m3-primary-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <button type="button" className="m3-secondary-button" onClick={onClick}>
      {children}
    </button>
  );
}

function ScreenShell({
  screen,
  children,
  footer,
}: {
  screen: Module3RevisedScreen;
  children: ReactNode;
  footer: ReactNode;
}) {
  const titleId = `${screen.id}-title`;

  return (
    <main className="m3-screen m3-studio-screen" aria-labelledby={titleId}>
      <div className="m3-title-block">
        <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
        <p className="m3-context-label">{screen.eyebrow}</p>
        <h1 id={titleId}>{screen.title}</h1>
        <p>{screen.purpose}</p>
      </div>
      {children}
      <div className="m3-cta-panel">{footer}</div>
    </main>
  );
}

function ProgressChip({ children }: { children: ReactNode }) {
  return (
    <span className="m3-progress-chip" aria-live="polite">
      {children}
    </span>
  );
}

type GuidedWorkspaceStage = {
  id: number;
  label: string;
  complete?: boolean;
  unlocked?: boolean;
  helper?: string;
};

function GuidedWorkspaceStageNav({
  stages,
  activeStage,
  onSelect,
  className = 'm3-context-stage-nav',
}: {
  stages: GuidedWorkspaceStage[];
  activeStage: number;
  onSelect: (stageId: number) => void;
  className?: string;
}) {
  return (
    <nav className={className} aria-label="Screen stages">
      {stages.map((stage) => {
        const active = activeStage === stage.id;
        const unlocked = stage.unlocked ?? true;
        return (
          <button
            key={stage.id}
            type="button"
            className={`${active ? 'is-active' : ''}${stage.complete ? ' is-complete' : ''}${!unlocked ? ' is-locked' : ''}`}
            aria-current={active ? 'step' : undefined}
            disabled={!unlocked}
            onClick={() => onSelect(stage.id)}
          >
            <span aria-hidden="true">{stage.complete ? '✓' : stage.id}</span>
            {stage.label}
            {stage.helper && <small>{stage.helper}</small>}
          </button>
        );
      })}
    </nav>
  );
}

function PlaceholderNote({ screen }: { screen: Module3RevisedScreen }) {
  return (
    <section className="m3-note-block">
      <h2>Phase 1 scaffold</h2>
      <p>
        This placeholder preserves the finalized screen ID, order, title, purpose, interaction type,
        and route. Detailed learner-facing copy and final assets can be added here in the next
        implementation pass without changing Module 3 sequencing.
      </p>
      <p className="m3-microcopy">Interaction pattern: {screen.interactionType}</p>
    </section>
  );
}

function IntroVideoScaffold({
  screen,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  onComplete: () => void;
}) {
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const transcriptId = `${screen.id}-transcript`;

  return (
    <main className="m3-screen m3-intro-video-screen" aria-labelledby={`${screen.id}-title`}>
      <section className="m3-intro-video-card">
        <div className="m3-title-block m3-intro-video-copy">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-context-label">{screen.eyebrow}</p>
          <h1 id={`${screen.id}-title`}>{screen.title}</h1>
          <p>
            A project can look strong on paper and still miss important design questions. This
            module helps you look beneath the activity list and strengthen a project before
            implementation begins.
          </p>
        </div>

        <figure className="m3-video-frame">
          <div
            className="m3-video-placeholder"
            role="img"
            aria-label={module3IntroVideoAsset.posterAlt}
            data-video-src={module3IntroVideoAsset.video}
            data-poster-src={module3IntroVideoAsset.poster}
          >
            <span aria-hidden="true">Play</span>
            <p><strong>Intro video · 1 minute</strong></p>
            <p>
              This short video introduces Module 3: what it covers, why it matters, what you will
              practice, and what you will produce by the end.
            </p>
          </div>
        </figure>

        <div className="m3-video-transcript">
          <button
            type="button"
            className="m3-secondary-button"
            aria-expanded={transcriptOpen}
            aria-controls={transcriptId}
            onClick={() => setTranscriptOpen((current) => !current)}
          >
            Read transcript
          </button>
          {transcriptOpen && (
            <div id={transcriptId} className="m3-video-transcript__body">
              <p>{module3IntroTranscript}</p>
            </div>
          )}
        </div>

        <div className="m3-intro-video-actions">
          <PrimaryButton onClick={() => onComplete()}>{screen.continueLabel}</PrimaryButton>
        </div>
      </section>
    </main>
  );
}

function LearningRoadmapScreen({
  screen,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  onComplete: () => void;
}) {
  const [showRoadmapVisual, setShowRoadmapVisual] = useState(true);
  const [openObjectives, setOpenObjectives] = useState<string[]>([]);
  const titleId = `${screen.id}-title`;
  const introHeadingId = `${screen.id}-orientation-heading`;
  const objectivesHeadingId = `${screen.id}-objectives-heading`;
  const pathHeadingId = `${screen.id}-path-heading`;
  const allObjectivesOpen = openObjectives.length === module3LearningObjectives.length;

  const toggleObjective = (title: string) => {
    setOpenObjectives((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  };

  const toggleAllObjectives = () => {
    setOpenObjectives(allObjectivesOpen ? [] : module3LearningObjectives.map((objective) => objective.title));
  };

  return (
    <main className="m3-screen m3-roadmap-screen" aria-labelledby={titleId}>
      <article className="m3-roadmap-shell">
        <header className="m3-roadmap-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-context-label">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
        </header>

        <section className="m3-roadmap-orientation" aria-labelledby={introHeadingId}>
          <h2 id={introHeadingId}>Module orientation</h2>
          {module3RoadmapIntro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        {showRoadmapVisual && (
          <figure className="m3-roadmap-visual">
            <img
              src={module3RoadmapVisualAsset.src}
              alt={module3RoadmapVisualAsset.alt}
              onError={() => setShowRoadmapVisual(false)}
            />
          </figure>
        )}

        <section className="m3-roadmap-block" aria-labelledby={objectivesHeadingId}>
          <div className="m3-roadmap-block__header">
            <h2 id={objectivesHeadingId}>By the end of this module, you will be able to:</h2>
            <button type="button" className="m3-roadmap-toggle-all" onClick={toggleAllObjectives}>
              {allObjectivesOpen ? 'Hide all details' : 'Show all details'}
            </button>
          </div>
          <ol className="m3-roadmap-objectives">
            {module3LearningObjectives.map((objective, index) => {
              const isOpen = openObjectives.includes(objective.title);
              const detailId = `${screen.id}-objective-${index + 1}-detail`;

              return (
                <li key={objective.title} className={`m3-roadmap-objective-card ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="m3-roadmap-objective-button"
                    aria-expanded={isOpen}
                    aria-controls={detailId}
                    onClick={() => toggleObjective(objective.title)}
                  >
                    <span className="m3-roadmap-objective-number" aria-hidden="true">{index + 1}</span>
                    <span className="m3-roadmap-objective-title">{objective.title}</span>
                    <span className="m3-roadmap-objective-hint">{isOpen ? 'Hide detail' : 'View detail'}</span>
                  </button>
                  <div id={detailId} className="m3-roadmap-objective-detail" hidden={!isOpen}>
                    <p>{objective.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="m3-roadmap-block" aria-labelledby={pathHeadingId}>
          <h2 id={pathHeadingId}>You will move through the module in seven parts:</h2>
          <ol className="m3-roadmap-path-list">
            {module3RoadmapSteps.map((step, index) => (
              <li key={step} className="m3-roadmap-path-card">
                <span aria-hidden="true">{index + 1}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </section>

        <div className="m3-roadmap-actions">
          <PrimaryButton onClick={() => onComplete()}>{screen.continueLabel}</PrimaryButton>
        </div>
      </article>
    </main>
  );
}

function TextScaffold({
  screen,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  onComplete: () => void;
}) {
  return (
    <ScreenShell
      screen={screen}
      footer={<PrimaryButton onClick={onComplete}>{screen.continueLabel}</PrimaryButton>}
    >
      <section className="m3-section">
        <h2>Module path scaffold</h2>
        <ul className="m3-clean-list">
          <li>See the design problem</li>
          <li>Analyze before activities</li>
          <li>Identify rights-holders and barriers</li>
          <li>Clarify responsibility, power, and causes</li>
          <li>Check inclusion, accountability, and risk</li>
          <li>Repair the design and review the plan</li>
          <li>Save your design snapshot and prepare for implementation</li>
        </ul>
      </section>
      <PlaceholderNote screen={screen} />
    </ScreenShell>
  );
}

function CaseReaderScaffold({
  screen,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  onComplete: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <ScreenShell
      screen={screen}
      footer={<PrimaryButton onClick={onComplete}>{screen.continueLabel}</PrimaryButton>}
    >
      <section className="m3-section">
        <h2>Jiru Amba case access</h2>
        <p>
          The Jiru Amba Futures Plan case reader is scaffolded here. Final approved narrative
          text can be added as module content without changing this route.
        </p>
        <SecondaryButton onClick={() => setOpen((current) => !current)}>
          {open ? 'Close the full case narrative' : 'Read the full case narrative'}
        </SecondaryButton>
        {open && (
          <div className="m3-output-card" role="region" aria-label="Jiru Amba Futures Plan full case narrative">
            <h3>Jiru Amba Futures Plan: Invited, Counted, but Not Heard</h3>
            <p>
              Case narrative placeholder. This reader is keyboard reachable, live text, and easy
              to replace with the approved written case narrative in a later content pass.
            </p>
          </div>
        )}
      </section>
      <PlaceholderNote screen={screen} />
    </ScreenShell>
  );
}

function CaseIntroductionScreen({
  screen,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  onComplete: () => void;
}) {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);
  const [showIntroPoster, setShowIntroPoster] = useState(true);
  const [showReaderCover, setShowReaderCover] = useState(true);
  const titleId = `${screen.id}-title`;
  const summaryId = `${screen.id}-video-summary`;
  const narrativeId = `${screen.id}-case-narrative`;
  const questionId = `${screen.id}-case-question`;
  const signalsId = `${screen.id}-signals`;
  const readerTitleId = `${screen.id}-reader-title`;

  return (
    <main className="m3-screen m3-case-screen" aria-labelledby={titleId}>
      <article className="m3-case-shell">
        <header className="m3-case-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-context-label">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <div className="m3-case-intro-copy">
            {module3CaseIntroParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <section className="m3-case-feature" aria-label="Jiru Amba case introduction">
          <aside className="m3-case-video-card" aria-label="Case introduction video and summary">
            {showIntroPoster && (
              <figure className="m3-case-poster">
                <img
                  src={module3CaseAssets.introPoster.src}
                  alt={module3CaseAssets.introPoster.alt}
                  onError={() => setShowIntroPoster(false)}
                />
              </figure>
            )}
            <div className="m3-case-video-copy">
              <p className="m3-card-kicker">Case introduction video · 2 minutes</p>
              <h2>Watch the case introduction</h2>
              <p>
                Watch this short introduction to understand the Jiru Amba Futures Plan and the main
                design question you will carry through the module.
              </p>
            </div>
            <div className="m3-case-video-frame">
              <iframe
                src="https://www.youtube-nocookie.com/embed/N7T7nT5eCK4"
                title="Jiru Amba Futures Plan case introduction video"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="m3-case-video-fallback">
              If the video does not load, use the video summary and full case narrative below. You
              can continue the module without watching the video.
            </p>
            <button
              type="button"
              className="m3-case-toggle"
              aria-expanded={summaryOpen}
              aria-controls={summaryId}
              onClick={() => setSummaryOpen((current) => !current)}
            >
              {summaryOpen ? 'Hide video summary' : 'Read video summary'}
            </button>
            {summaryOpen && (
              <div id={summaryId} className="m3-case-summary-panel">
                <p>{module3VideoSummary}</p>
              </div>
            )}
          </aside>

          <div className="m3-case-support">
            <section className="m3-case-question" aria-labelledby={questionId}>
              <h2 id={questionId}>Carry this question through the module</h2>
              <p>
                The main question is not whether people were invited or counted. The question is
                whether the plan changed because different rights-holders were heard, barriers were
                understood, responsibilities were clarified, and risks were addressed before
                implementation began.
              </p>
            </section>

            <section className="m3-case-signals" aria-labelledby={signalsId}>
              <h2 id={signalsId}>As you read the case, watch for:</h2>
              <ul>
                {module3CaseSignals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        <section className="m3-case-reader" aria-labelledby={readerTitleId}>
          <div className="m3-case-reader__header">
            <div>
              <p className="m3-card-kicker">Full written case</p>
              <h2 id={readerTitleId}>Jiru Amba Futures Plan: Invited, Counted, but Not Heard</h2>
            </div>
            <button
              type="button"
              className="m3-case-toggle"
              aria-expanded={caseOpen}
              aria-controls={narrativeId}
              onClick={() => setCaseOpen((current) => !current)}
            >
              {caseOpen ? 'Close the full case narrative' : 'Read the full case narrative'}
            </button>
          </div>

          {caseOpen && (
            <div id={narrativeId} className="m3-case-reader-panel">
              {showReaderCover && (
                <figure className="m3-case-reader-cover">
                  <img
                    src={module3CaseAssets.readerCover.src}
                    alt={module3CaseAssets.readerCover.alt}
                    onError={() => setShowReaderCover(false)}
                  />
                </figure>
              )}
              <div className="m3-case-reader-copy">
                <h3>Jiru Amba Futures Plan: Invited, Counted, but Not Heard</h3>
                {module3ApprovedCaseNarrativeParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="m3-case-actions">
          <PrimaryButton onClick={() => onComplete()}>{screen.continueLabel}</PrimaryButton>
        </div>
      </article>
    </main>
  );
}

function SnapshotPreviewScreen({
  screen,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  onComplete: () => void;
}) {
  const [showPreviewVisual, setShowPreviewVisual] = useState(true);
  const titleId = `${screen.id}-title`;
  const sectionsId = `${screen.id}-sections`;

  return (
    <main className="m3-screen m3-snapshot-preview-screen" aria-labelledby={titleId}>
      <article className="m3-snapshot-preview-shell">
        <header className="m3-snapshot-preview-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-context-label">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <div className="m3-snapshot-preview-intro">
            {module3SnapshotIntroParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <section className="m3-snapshot-preview-main" aria-labelledby={sectionsId}>
          {showPreviewVisual && (
            <figure className="m3-snapshot-preview-visual">
              <img
                src={module3SnapshotPreviewAsset.src}
                alt={module3SnapshotPreviewAsset.alt}
                onError={() => setShowPreviewVisual(false)}
              />
            </figure>
          )}

          <div className="m3-snapshot-preview-sections">
            <h2 id={sectionsId}>What the snapshot will help you organize</h2>
            <ol className="m3-snapshot-preview-card-grid">
              {module3SnapshotSections.map((section, index) => (
                <li key={section.title} className="m3-snapshot-preview-section-card">
                  <span className="m3-snapshot-preview-section-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="m3-snapshot-preview-thinking" aria-labelledby={`${screen.id}-thinking`}>
          <h2 id={`${screen.id}-thinking`}>Use the snapshot as a thinking tool</h2>
          <p>
            The value of the snapshot is not the form itself. The value is the disciplined thinking
            behind it: moving from a general activity plan toward a clearer understanding of
            rights-holders, barriers, responsibilities, power, risk, accountability, and design
            repair.
          </p>
        </section>

        <section className="m3-snapshot-preview-safety" aria-labelledby={`${screen.id}-safety`}>
          <h2 id={`${screen.id}-safety`}>Safe practice note</h2>
          <p>
            When you later adapt this tool to your own work, use fictional, anonymized, or
            generalized examples. Do not enter real names, sensitive complaints, exact locations, or
            details that could identify people or expose them to risk.
          </p>
        </section>

        <div className="m3-snapshot-preview-actions">
          <PrimaryButton onClick={() => onComplete()}>{screen.continueLabel}</PrimaryButton>
        </div>
      </article>
    </main>
  );
}

function ContextInequalityScanScreen({
  screen,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  type ContextScanStageId = 1 | 2 | 3 | 4 | 5 | 6;
  type ContextScanFilter = 'influence' | 'access' | 'evidence' | 'accountability' | 'all';

  const [selected, setSelected] = useState<string[]>([]);
  const [generatedSelected, setGeneratedSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [activeStage, setActiveStage] = useState<ContextScanStageId>(1);
  const [understandComplete, setUnderstandComplete] = useState(false);
  const [audioMarked, setAudioMarked] = useState(false);
  const [exampleComplete, setExampleComplete] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ContextScanFilter>('influence');
  const [expandedSignalIds, setExpandedSignalIds] = useState<string[]>([]);
  const [checkMatches, setCheckMatches] = useState<Record<string, string>>({});
  const [bestQuestionAnswer, setBestQuestionAnswer] = useState('');
  const [unsafeEvidenceAnswer, setUnsafeEvidenceAnswer] = useState('');
  const [applyTab, setApplyTab] = useState<'own' | 'downloads'>('own');
  const [copyStatus, setCopyStatus] = useState('');
  const [ownScan, setOwnScan] = useState({
    projectIdea: '',
    visible: '',
    affectedDifferently: '',
    barriers: '',
    assumptions: '',
    safeEvidence: '',
    designChange: '',
  });
  const [ownSubmitted, setOwnSubmitted] = useState(false);
  const [ownValidationMessage, setOwnValidationMessage] = useState('');
  const outputRef = useRef<HTMLElement>(null);
  const titleId = `${screen.id}-title`;
  const taskId = `${screen.id}-practice`;
  const outputSelection = submitted ? generatedSelected : selected;
  const selectedChoices = module3ContextChoices.filter((choice) => selected.includes(choice.id));
  const outputChoices = module3ContextChoices.filter((choice) => outputSelection.includes(choice.id));
  const selectedStrong = outputChoices.filter((choice) => choice.quality === 'strong').length;
  const selectedPartial = outputChoices.filter((choice) => choice.quality === 'partial').length;
  const selectedSurfaceChoices = outputChoices.filter((choice) => choice.quality === 'surface');
  const selectedSurface = selectedSurfaceChoices.length;
  const selectedVisibleEvidence = Array.from(new Set(outputChoices.flatMap((choice) => choice.visibleEvidence || [])));
  const selectedAffectedGroups = Array.from(new Set(outputChoices.flatMap((choice) => choice.affectedGroups)));
  const selectedBarriers = Array.from(new Set(outputChoices.flatMap((choice) => choice.barriers)));
  const selectedEvidence = Array.from(new Set([
    ...outputChoices.flatMap((choice) => choice.evidence),
    ...(outputChoices.length > 0 ? ['No names, complaint details, exact sensitive locations, survivor stories, political accusations, or identifiable personal information'] : []),
  ]));
  const currentHasGroupSignal = selectedChoices.some((choice) => choice.categories.includes('group'));
  const currentHasBarrierSignal = selectedChoices.some((choice) => choice.categories.includes('barrier'));
  const currentHasEvidenceSignal = selectedChoices.some((choice) => choice.categories.includes('evidence'));
  const currentOnlySurfaceEvidence = selected.length > 0 && selectedChoices.every((choice) => choice.quality === 'surface' || choice.id === 'final-meeting');
  const outputHasGroupSignal = outputChoices.some((choice) => choice.categories.includes('group'));
  const outputHasBarrierSignal = outputChoices.some((choice) => choice.categories.includes('barrier'));
  const outputHasEvidenceSignal = outputChoices.some((choice) => choice.categories.includes('evidence'));
  const onlySurfaceEvidence = outputSelection.length > 0 && outputChoices.every((choice) => choice.quality === 'surface' || choice.id === 'final-meeting');
  const generatedSignature = generatedSelected.join('|');
  const currentSignature = selected.join('|');
  const outputIsStale = submitted && generatedSignature !== currentSignature;
  const readyToGenerate = selected.length >= 3 && currentHasGroupSignal && currentHasBarrierSignal && currentHasEvidenceSignal && !currentOnlySurfaceEvidence;
  const feedbackTone =
    selectedStrong >= 4 && outputHasGroupSignal && outputHasBarrierSignal && outputHasEvidenceSignal
      ? 'strong'
      : onlySurfaceEvidence
        ? 'support'
        : 'partial';
  const feedbackCopy = {
    strong: 'Strong scan. Your selections look deeper than visible evidence in the plan. You noticed that participation, accessibility, information flow, livelihood constraints, influence, and feedback response may not be equal for all groups.',
    partial: 'Good start. You identified some important signals, but the scan needs one more layer. A context scan is useful when it moves from observation to design decisions.',
    support: 'This scan is still too close to visible evidence. Attendance, activity lists, budget lines, or inclusion statements alone show that a plan exists, but they do not prove that the design is rights-based.',
  }[feedbackTone];
  const selectedCountLabel = selected.length === 1 ? '1 signal selected' : `${selected.length} signals selected`;
  const selectedContextSignalGroups = module3ContextOutputGroups.reduce<Record<string, string[]>>((groups, group) => {
    groups[group.id] = outputChoices
      .filter((choice) => choice.outputGroup === group.id)
      .map((choice) => choice.id);
    return groups;
  }, {});
  const designImplication =
    'This scan suggests that Awra should not finalize activities only from the visible plan. The design may need earlier outreach to lower-influence groups, more accessible information channels, adjusted meeting timing and locations, safer feedback and response arrangements, and a clearer process for showing how rights-holder priorities changed the plan.';
  const carryForwardText =
    `${module3ContextCarryForward[0].text} Carry this scan into the next tools. The standards map will help clarify which rights, policies, and public responsibilities are connected to the issue. The rights-holder and barrier map will help identify the affected groups more precisely. Later, the design repair screens will use these findings to improve objectives, activities, accountability, risk, and indicators.`;
  const contextScanSummary =
    'You completed a first HRBA context and inequality scan. You looked beyond the visible plan and identified who may be affected differently, what barriers may exist, what assumptions should be verified safely, and what this may mean for the design. You will use this scan in the next step to connect the issue to relevant rights, standards, policies, and public responsibilities.';
  const ownScanText = Object.values(ownScan).join(' ');
  const unsafeOwnDetail = /\b[A-Z][a-z]+ [A-Z][a-z]+\b|\b\d{3,}\b|complaint|survivor|abuse|assault|rape|exact location|kebele \d+|woreda office/i.test(ownScanText);
  const matchPrompts = [
    ['visible', 'Visible evidence', 'What can be seen first'],
    ['affected', 'Affected differently', 'Who may experience the issue differently'],
    ['barrier', 'Barrier', 'What blocks access, participation, benefit, influence, or follow-up'],
    ['assumption', 'Assumption', 'What the project believes but has not verified'],
    ['safe', 'Safe evidence', 'What can be checked without exposing people'],
  ];
  const matchOptions = matchPrompts.map(([, , answer]) => answer);
  const checkMatchesComplete = matchPrompts.every(([id, , answer]) => checkMatches[id] === answer);
  const checkComplete =
    checkMatchesComplete &&
    bestQuestionAnswer === 'influence' &&
    unsafeEvidenceAnswer === 'names';
  const stageDefinitions: Array<{ id: ContextScanStageId; short: string; label: string; unlocked: boolean; complete: boolean }> = [
    { id: 1, short: 'Understand', label: 'Understand the concept', unlocked: true, complete: understandComplete },
    { id: 2, short: 'Check', label: 'Check your understanding', unlocked: understandComplete, complete: checkComplete },
    { id: 3, short: 'Example', label: 'See a worked example', unlocked: checkComplete, complete: exampleComplete },
    { id: 4, short: 'Practice', label: 'Practice with Jiru Amba', unlocked: exampleComplete, complete: submitted },
    { id: 5, short: 'Review', label: 'Review your scan', unlocked: submitted, complete: submitted && !outputIsStale },
    { id: 6, short: 'Apply/Download', label: 'Apply and download', unlocked: exampleComplete, complete: submitted },
  ];
  const filterDefinitions: Array<{ id: ContextScanFilter; label: string; choiceIds?: string[] }> = [
    { id: 'influence', label: 'Influence and decision-making', choiceIds: ['influence', 'final-meeting', 'ranking-gap'] },
    { id: 'access', label: 'Access and participation barriers', choiceIds: ['women-barriers', 'disability-access', 'remote-information'] },
    { id: 'evidence', label: 'Evidence and assumptions', choiceIds: ['youth-pathway', 'admin-plan', 'consulted-claim'] },
    { id: 'accountability', label: 'Accountability and feedback', choiceIds: ['feedback-boxes', 'ranking-gap', 'consulted-claim'] },
    { id: 'all', label: 'Show all' },
  ];
  const filteredChoices = activeFilter === 'all'
    ? module3ContextChoices
    : module3ContextChoices.filter((choice) => filterDefinitions.find((filter) => filter.id === activeFilter)?.choiceIds?.includes(choice.id));

  const toggleChoice = (choiceId: string) => {
    setSelected((current) =>
      current.includes(choiceId)
        ? current.filter((item) => item !== choiceId)
        : [...current, choiceId],
    );
  };

  const submitScan = () => {
    if (selected.length < 3) {
      setValidationMessage('Select at least three context signals to generate your scan.');
      return;
    }

    if (!currentHasGroupSignal || !currentHasBarrierSignal || !currentHasEvidenceSignal) {
      setValidationMessage('Please select at least one item about affected groups, one item about possible barriers, and one item about evidence to verify. A useful context scan needs all three.');
      return;
    }

    if (currentOnlySurfaceEvidence) {
      setValidationMessage('Your selections mostly describe visible project structure. Add at least one selection that shows unequal influence, access barriers, missing evidence, or a design assumption that should be checked.');
      return;
    }

    setValidationMessage('');
    setGeneratedSelected(selected);
    setSubmitted(true);
    setActiveStage(5);
    if (typeof window !== 'undefined') {
      window.setTimeout(() => outputRef.current?.focus(), 0);
    }
  };

  const updateOwnScan = (field: keyof typeof ownScan, value: string) => {
    setOwnScan((current) => ({ ...current, [field]: value }));
    setOwnSubmitted(false);
  };

  const submitOwnScan = () => {
    if (!ownScan.affectedDifferently.trim() || !ownScan.barriers.trim() || !ownScan.assumptions.trim() || !ownScan.designChange.trim()) {
      setOwnValidationMessage('A useful HRBA context scan needs more than a project idea. Add at least one affected group, one possible barrier, one assumption to verify, and one design implication.');
      setOwnSubmitted(false);
      return;
    }

    if (unsafeOwnDetail) {
      setOwnValidationMessage('Before saving, remove any real names, exact sensitive locations, complaint details, survivor stories, or identifiable personal information. Keep this as a safe learning example.');
      setOwnSubmitted(false);
      return;
    }

    setOwnValidationMessage('');
    setOwnSubmitted(true);
  };

  const buildTemplatePdf = () => {
    const lines = [
      'Context and Inequality Scan Template',
      '1. Project idea or issue',
      '2. What is visible?',
      '3. Who may be affected differently?',
      '4. What barriers may exist?',
      '5. What is still assumed?',
      '6. What evidence can be checked safely?',
      '7. What should change in the design?',
      'Keep examples safe, generalized, and non-identifying.',
    ];
    const stream = `BT /F1 18 Tf 72 740 Td (${lines[0]}) Tj ${lines.slice(1).map((line) => `0 -28 Td (${line.replace(/[()]/g, '')}) Tj`).join(' ')} ET`;
    const objects = [
      '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
      '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
      '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj',
      '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
      `5 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`,
    ];
    let pdf = '%PDF-1.4\n';
    const offsets = objects.map((object) => {
      const offset = pdf.length;
      pdf += `${object}\n`;
      return offset;
    });
    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.map((offset) => `${String(offset).padStart(10, '0')} 00000 n `).join('\n')}\ntrailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    return pdf;
  };

  const downloadTemplate = (format: 'md' | 'docx' | 'pdf' | 'blank') => {
    if (typeof window === 'undefined') return;
    if (format === 'pdf') {
      const blob = new Blob([buildTemplatePdf()], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'context-and-inequality-scan-template-pack.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      return;
    }
    const htmlTemplate = `<!doctype html><html><head><meta charset="utf-8"><title>Context and Inequality Scan Template</title></head><body>${contextScanTemplateMarkdown
      .replace(/^# (.*)$/m, '<h1>$1</h1>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/\n/g, '<br>')}</body></html>`;
    const markdown = format === 'blank'
      ? '# Context and Inequality Scan Blank Worksheet\n\n## Project idea\n\n## What is visible?\n\n## Who may be affected differently?\n\n## What barriers may exist?\n\n## What is still assumed?\n\n## What evidence can be checked safely?\n\n## What should change in the design?\n'
      : contextScanTemplateMarkdown;
    const blob = new Blob([format === 'md' || format === 'blank' ? markdown : htmlTemplate], {
      type: format === 'md' || format === 'blank' ? 'text/markdown;charset=utf-8' : 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = format === 'md' ? 'context-and-inequality-scan-template.md' : format === 'blank' ? 'context-and-inequality-scan-blank-worksheet.md' : 'context-and-inequality-scan-template.docx';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const copyScanSummary = async () => {
    const summary = [
      'Context and Inequality Scan',
      `What the plan shows: ${selectedVisibleEvidence.length > 0 ? selectedVisibleEvidence.join(' ') : 'The plan includes activities, budget lines, indicators, and some form of consultation.'}`,
      `Who may be affected differently: ${selectedAffectedGroups.join(', ') || 'Women, youth, persons with disabilities, low-income households, and remote residents.'}`,
      `Barriers to test: ${selectedBarriers.join(', ') || 'Unequal influence, accessibility, information, timing, safety, livelihood, distance, and feedback-response barriers.'}`,
      `Evidence to verify safely: ${selectedEvidence.join(', ')}`,
      `Design implications: ${designImplication}`,
      `Carry forward: ${carryForwardText}`,
    ].join('\n\n');
    try {
      await navigator.clipboard?.writeText(summary);
      setCopyStatus('Scan summary copied.');
    } catch {
      setCopyStatus('Copy was not available in this browser.');
    }
  };

  const buildSavePayload = () => ({
    selectedContextSignals: generatedSelected,
    submitted: true,
    contextInequalityScan: {
      selectedJiruAmbaAffectedGroups: selectedAffectedGroups,
      selectedBarriers,
      safeEvidenceToVerify: selectedEvidence,
      generatedDesignImplications: designImplication,
      optionalOwnCsoScan: ownSubmitted ? ownScan : null,
      safetyConfirmation: 'Saved as a safe learning example without names, complaint details, exact sensitive locations, survivor stories, political accusations, or identifiable personal information.',
      portfolioSummaryText: contextScanSummary,
    },
    contextScanSummary,
    selectedContextSignalGroups,
    affectedGroupsToExamine: selectedAffectedGroups,
    barriersToTest: selectedBarriers,
    evidenceToVerifySafely: selectedEvidence,
    carryForward: {
      issue: 'The plan should explain who may be affected differently, what barriers shape participation and benefit, and what evidence still needs safe verification before activities are finalized.',
      nextUse: 'Use this scan in the next step to connect the issue to relevant rights, standards, policies, and public responsibilities.',
    },
    surfaceEvidenceSelected: selectedSurfaceChoices.map((choice) => choice.id),
    surfaceEvidenceSelectedCount: selectedSurface,
  });

  const goToStage = (stageId: ContextScanStageId) => {
    const stage = stageDefinitions.find((item) => item.id === stageId);
    if (stage?.unlocked) setActiveStage(stageId);
  };

  const safeEvidenceWarning = (
    <div className="m3-context-scan-safe-inline" role="note">
      <strong>Keep the scan safe.</strong>
      <span>Do not enter names, exact locations, complaints, survivor stories, political accusations, disability or medical details, or identifiable personal information.</span>
    </div>
  );

  const renderScanPanel = () => (
    <aside className="m3-context-live-panel" aria-label="Your scan so far">
      <div className="m3-context-live-head">
        <span aria-hidden="true">✓</span>
        <div>
          <h2>Your scan so far</h2>
          <p>{selected.length > 0 ? selectedCountLabel : 'Your scan will appear here'}</p>
        </div>
      </div>
      <div className="m3-context-live-chip-list">
        {selected.length > 0 ? selectedChoices.map((choice) => (
          <button key={choice.id} type="button" onClick={() => toggleChoice(choice.id)} className="m3-context-live-chip">
            <span aria-hidden="true">✓</span>
            {choice.tag}
            <span aria-hidden="true">×</span>
          </button>
        )) : <p>Select at least three context signals to generate your draft scan.</p>}
      </div>
      <div className="m3-context-live-status">
        <strong>Ready to generate: {readyToGenerate ? 'Yes' : 'Not yet'}</strong>
        <span>{readyToGenerate ? 'You have selected the minimum mix of signals.' : 'Select at least three signals, including affected groups, barriers, and safe evidence.'}</span>
      </div>
      {safeEvidenceWarning}
      <button type="button" className="m3-context-scan-submit-button" disabled={!readyToGenerate} onClick={submitScan}>
        {submitted && outputIsStale ? 'Update context and inequality scan' : submitted ? 'Regenerate context and inequality scan' : 'Generate context and inequality scan'}
      </button>
      <p aria-live="polite" className="m3-context-live-helper">{validationMessage || (submitted && !outputIsStale ? 'Draft scan generated. Review and save when ready.' : 'You can update selections later.')}</p>
    </aside>
  );

  return (
    <main className="m3-screen m3-context-scan-screen" aria-labelledby={titleId}>
      <article className="m3-context-scan-shell">
        <header className="m3-context-scan-header">
          <p className="m3-context-label">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <p className="m3-context-scan-subtitle">Look beyond visible evidence before choosing activities.</p>
          <p className="m3-context-scan-meta">{screen.phase} · <strong>Screen {screen.screenNumber} of 22</strong></p>
          <nav className="m3-context-stage-nav" aria-label="Context scan stages">
            {stageDefinitions.map((stage) => {
              const active = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  className={`m3-context-stage-tab${active ? ' is-active' : ''}${stage.complete ? ' is-complete' : ''}${!stage.unlocked ? ' is-locked' : ''}`}
                  disabled={!stage.unlocked}
                  aria-current={active ? 'step' : undefined}
                  onClick={() => goToStage(stage.id)}
                >
                  <span aria-hidden="true">{stage.complete ? '✓' : stage.unlocked ? stage.id : '□'}</span>
                  <strong>{stage.short}</strong>
                </button>
              );
            })}
          </nav>
        </header>

        {activeStage === 1 && (
          <section className="m3-context-stage-card" aria-labelledby={`${screen.id}-understand`}>
            <div className="m3-context-stage-grid">
              <div className="m3-context-stage-main">
                <h2 id={`${screen.id}-understand`}>Understand the concept</h2>
                <div className="m3-context-intro-copy">
                  {module3ContextScanIntro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <div className="m3-context-understand-grid">
                  {[
                    ['1. What this section is about', 'Check what is visible, who may be affected differently, what barriers may exist, what is still assumed, and what evidence can be checked safely.'],
                    ['2. Why this matters for CSOs', 'A project can sound useful but still miss people, barriers, power patterns, or unsafe assumptions.'],
                    ['3. What you will do', 'Learn the scan method, check understanding, see an example, practice with Jiru Amba, generate a scan, and download tools.'],
                    ['4. What you will produce', 'A draft Context and Inequality Scan for your portfolio and project design.'],
                  ].map(([heading, copy]) => (
                    <article key={heading} className="m3-context-mini-card">
                      <span aria-hidden="true">◎</span>
                      <h3>{heading}</h3>
                      <p>{copy}</p>
                    </article>
                  ))}
                </div>
                <div className="m3-context-scan-concept-chips" aria-label="Context scan guiding questions">
                  {module3ContextConceptChips.map((chip) => <span key={chip}>{chip}</span>)}
                </div>
                <div className="m3-context-method-strip" aria-label="Five-step context scan method">
                  {module3ContextEvidence.map((layer) => <article key={layer.label}><h3>{layer.label}</h3><p>{layer.items[0]}</p></article>)}
                </div>
                <p className="m3-context-scan-key-message">Take a few minutes to understand the flow. You will use it to guide your thinking throughout the scan.</p>
              </div>
              <aside className="m3-context-flow-card">
                <h2>The context scan flow</h2>
                <img src={module3ContextScanAssets.signals.src} alt={module3ContextScanAssets.signals.alt} />
                {['Visible evidence|What can be seen first', 'Different effects|Who may be affected differently', 'Barriers|What barriers may exist', 'Assumptions|What is still assumed', 'Safe evidence|What can be checked safely', 'Design change|What might need to change'].map((item) => {
                  const [title, copy] = item.split('|');
                  return <div key={title} className="m3-context-flow-step"><span aria-hidden="true">○</span><div><strong>{title}</strong><p>{copy}</p></div></div>;
                })}
              </aside>
            </div>
            <div className="m3-context-audio-card">
              <div>
                <h2>Audio deep dive: Context analysis before activities</h2>
                <p>Estimated length: 4-6 minutes</p>
              </div>
              <div className="m3-context-audio-player" aria-label="Audio narration status">
                <button type="button" disabled aria-label="Audio narration is not available in this build">▶</button>
                <div aria-hidden="true" className="m3-context-waveform" />
                <span>00:00 / 00:00</span>
              </div>
              <p className="m3-context-transcript">Audio narration is not included in this build. The complete activity guidance is available as readable text on this screen.</p>
              <button type="button" className="m3-context-scan-secondary-button" onClick={() => setAudioMarked(true)}>{audioMarked ? 'Marked as reviewed' : 'Mark as reviewed'}</button>
            </div>
            <div className="m3-context-stage-actions">
              <button type="button" className="m3-context-scan-submit-button" onClick={() => { setUnderstandComplete(true); setActiveStage(2); }}>Continue to quick understanding check</button>
            </div>
          </section>
        )}

        {activeStage === 2 && (
          <section className="m3-context-stage-card" aria-labelledby={`${screen.id}-check`}>
            <h2 id={`${screen.id}-check`}>Quick check before practice</h2>
            <p>Build confidence with a few short tasks.</p>
            <div className="m3-context-check-grid">
              <article className="m3-context-check-card">
                <h3>1. Match the scan idea</h3>
                {matchPrompts.map(([id, label]) => (
                  <label key={id} className="m3-context-match-row">
                    <span>{label}</span>
                    <select value={checkMatches[id] || ''} onChange={(event) => setCheckMatches((current) => ({ ...current, [id]: event.target.value }))}>
                      <option value="">Choose match</option>
                      {matchOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </label>
                ))}
              </article>
              <article className="m3-context-check-card">
                <h3>2. Choose the best HRBA question</h3>
                <p>A meeting was well attended. What should an HRBA context scan ask next?</p>
                {[
                  ['count', 'How many people attended?'],
                  ['influence', 'Did different groups only attend, or did they influence which priorities were chosen?'],
                  ['report', 'Was the meeting report submitted on time?'],
                ].map(([id, label]) => (
                  <label key={id} className={`m3-context-check-option${bestQuestionAnswer === id ? ' is-selected' : ''}`}>
                    <input
                      type="radio"
                      name={`${screen.id}-best-question`}
                      value={id}
                      checked={bestQuestionAnswer === id}
                      onChange={() => setBestQuestionAnswer(id)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </article>
              <article className="m3-context-check-card">
                <h3>3. Identify unsafe evidence</h3>
                <p>Which should not be entered into a learning portfolio?</p>
                {[
                  ['summary', 'Non-identifying summary of barriers'],
                  ['access', 'General observation of accessibility barriers'],
                  ['names', 'Names and complaint details'],
                  ['dates', 'Planning record showing activity dates'],
                ].map(([id, label]) => (
                  <label key={id} className={`m3-context-check-option${unsafeEvidenceAnswer === id ? ' is-selected' : ''}`}>
                    <input
                      type="radio"
                      name={`${screen.id}-unsafe-evidence`}
                      value={id}
                      checked={unsafeEvidenceAnswer === id}
                      onChange={() => setUnsafeEvidenceAnswer(id)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </article>
            </div>
            {checkComplete && <p className="m3-context-ready-note"><strong>You are ready to practice.</strong> Context analysis checks who may be affected differently, what barriers may be hidden, what assumptions need verification, and what design changes may be needed.</p>}
            <div className="m3-context-stage-actions">
              <button type="button" className="m3-context-scan-submit-button" disabled={!checkComplete} onClick={() => setActiveStage(3)}>See worked example</button>
              {!checkComplete && <p>Complete all three checks to continue.</p>}
            </div>
          </section>
        )}

        {activeStage === 3 && (
          <section className="m3-context-stage-card" aria-labelledby={`${screen.id}-worked`}>
            <h2 id={`${screen.id}-worked`}>See a worked example</h2>
            <div className="m3-context-example-flow">
              {[
                ['Visible evidence', 'The planning meeting was well attended.'],
                ['HRBA question', 'Did different groups only attend, or did they influence which priorities were chosen?'],
                ['Who may be affected differently', 'Women, persons with disabilities, youth, low-income households, informal workers, and remote residents.'],
                ['Safe evidence to verify', 'Non-identifying feedback summaries, facilitation notes, observation of accessibility barriers, and planning records.'],
                ['Design implication', 'Before activities are finalized, re-check whether excluded or lower-influence groups helped shape priorities, then adjust outreach, timing, accessibility, feedback, and follow-up arrangements.'],
              ].map(([heading, copy], index) => (
                <article key={heading} className="m3-context-example-step">
                  <span aria-hidden="true">{index + 1}</span>
                  <h3>{heading}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
            <div className="m3-context-stage-actions">
              <button type="button" className="m3-context-scan-submit-button" onClick={() => { setExampleComplete(true); setActiveStage(4); }}>Start Jiru Amba practice</button>
            </div>
          </section>
        )}

        {activeStage === 4 && (
          <section className="m3-context-stage-card m3-context-practice-layout" aria-labelledby={taskId}>
            <div className="m3-context-practice-main">
              <h2 id={taskId}>Practice with Jiru Amba</h2>
              <p>Select at least three context signals that should be checked before the Jiru Amba project design is finalized.</p>
              <div className="m3-context-filter-tabs" role="tablist" aria-label="Context signal filters">
                {filterDefinitions.map((filter) => (
                  <button key={filter.id} type="button" className={activeFilter === filter.id ? 'is-active' : ''} onClick={() => setActiveFilter(filter.id)}>
                    {filter.label}
                  </button>
                ))}
              </div>
              <div className="m3-context-signal-grid" role="group" aria-labelledby={taskId}>
                {filteredChoices.map((choice) => {
                  const isSelected = selected.includes(choice.id);
                  const expanded = expandedSignalIds.includes(choice.id);
                  return (
                    <article key={choice.id} className={`m3-context-signal-card${isSelected ? ' is-selected' : ''}`}>
                      <button type="button" className="m3-context-signal-toggle" aria-pressed={isSelected} onClick={() => toggleChoice(choice.id)}>
                        <span aria-hidden="true">{isSelected ? '✓' : '□'}</span>
                        {isSelected && <strong>Selected</strong>}
                      </button>
                      <h3>{choice.tag}</h3>
                      <p>{choice.text}</p>
                      <span className="m3-context-signal-badge">HRBA signal</span>
                      <button type="button" className="m3-context-why-button" aria-expanded={expanded} onClick={() => setExpandedSignalIds((current) => current.includes(choice.id) ? current.filter((id) => id !== choice.id) : [...current, choice.id])}>
                        Why this matters
                      </button>
                      {expanded && <p className="m3-context-signal-feedback">{choice.feedback}</p>}
                    </article>
                  );
                })}
              </div>
            </div>
            {renderScanPanel()}
            <div className="m3-context-mobile-drawer">{renderScanPanel()}</div>
          </section>
        )}

        {activeStage === 5 && (
          <section
            ref={outputRef}
            tabIndex={-1}
            className="m3-context-stage-card m3-context-review-stage"
            aria-live="polite"
            aria-labelledby={`${screen.id}-output-title`}
          >
            <div className="m3-context-review-banner">
              <span aria-hidden="true">✓</span>
              <div>
                <h2 id={`${screen.id}-output-title`}>Your Draft Context and Inequality Scan</h2>
                <p>Based on your selected Jiru Amba context signals, this scan shows what should be checked before activities, budget, participation plans, or indicators are finalized.</p>
              </div>
              <strong>{outputIsStale ? 'Scan needs update' : 'Scan generated'}</strong>
            </div>
            <div className="m3-context-review-grid">
              <article><h3>1. What the plan already shows</h3><p>{selectedVisibleEvidence.length > 0 ? selectedVisibleEvidence.join(' ') : 'The plan includes activities, budget lines, and indicators, but it does not yet show whether lower-influence groups shaped priorities.'}</p></article>
              <article><h3>2. Who may be affected differently</h3><p>{selectedAffectedGroups.length > 0 ? selectedAffectedGroups.join(', ') : 'Women, persons with disabilities, youth, low-income households, informal workers, and remote residents may face different access, information, timing, livelihood, influence, or feedback barriers.'}</p><p className="m3-context-support-note">Women — in the context of household water responsibilities and water-service decisions.</p></article>
              <article><h3>3. Barriers to test</h3><ul>{(selectedBarriers.length > 0 ? selectedBarriers : ['Unequal influence', 'Time and care-work barriers', 'Livelihood and information barriers', 'Weak feedback response', 'Safety and confidentiality concerns']).map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article><h3>4. Evidence to verify safely</h3><ul>{selectedEvidence.map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article><h3>5. Design implications</h3><p>{designImplication}</p></article>
              <article><h3>6. What to carry forward</h3><p>{carryForwardText}</p></article>
            </div>
            <div className="m3-context-quality-strip" aria-label="Scan quality check">
              <h3>Scan quality check</h3>
              {['Specific groups are visible', 'Barriers identified', 'Assumptions tested', 'Safe evidence included', 'Design change identified'].map((item) => <span key={item}><strong aria-hidden="true">✓</strong>{item}</span>)}
            </div>
            {safeEvidenceWarning}
            <div className="m3-context-review-actions">
              <button type="button" className="m3-context-scan-secondary-button" onClick={() => setActiveStage(4)}>Edit selections</button>
              <button type="button" className="m3-context-scan-secondary-button" onClick={copyScanSummary}>Copy scan summary</button>
              <button type="button" className="m3-context-scan-secondary-button" onClick={() => downloadTemplate('md')}>Download template</button>
              <PrimaryButton
                disabled={!submitted || outputIsStale}
                onClick={() => onComplete(buildSavePayload())}
              >
                Save scan and continue
              </PrimaryButton>
            </div>
            {copyStatus && <p className="m3-context-copy-status" aria-live="polite">{copyStatus}</p>}
            {selectedPartial > 0 && <p className="m3-context-ready-note">{feedbackCopy}</p>}
            {outputIsStale && <p className="m3-context-ready-note">Your selections changed after generation. Return to Practice and update the scan before saving.</p>}
          </section>
        )}

        {activeStage === 6 && (
          <section className="m3-context-stage-card m3-context-apply-stage" aria-labelledby={`${screen.id}-apply`}>
            <h2 id={`${screen.id}-apply`}>Apply and download</h2>
            <p>Use your Jiru Amba scan, try a safe version with your own CSO project, or download reusable tools.</p>
            <div className="m3-context-apply-tabs" role="tablist" aria-label="Apply and download tabs">
              <button type="button" className={applyTab === 'own' ? 'is-active' : ''} onClick={() => setApplyTab('own')}>Try with my CSO project</button>
              <button type="button" className={applyTab === 'downloads' ? 'is-active' : ''} onClick={() => setApplyTab('downloads')}>Download tools</button>
            </div>
            {applyTab === 'own' && (
              <div className="m3-context-apply-grid">
                <div className="m3-context-own-tool">
                  <p>Use this optional practice tool to test one project idea from your own CSO. Keep it safe and general.</p>
                  {safeEvidenceWarning}
                  <div className="m3-context-scan-form-grid">
                    {([
                      ['projectIdea', '1. Project idea', 'Example: Improve access to market services for low-income women vendors.'],
                      ['visible', '2. What is visible?', 'What does the project idea, proposal, report, or meeting record already show?'],
                      ['affectedDifferently', '3. Who may be affected differently?', 'Which groups may face different access, information, safety, time, mobility, livelihood, or influence barriers?'],
                      ['barriers', '4. What barriers may exist?', 'What may block people from accessing, participating, benefiting, speaking, influencing, or receiving follow-up?'],
                      ['assumptions', '5. What is still assumed?', 'What does the project team believe, but has not safely verified yet?'],
                      ['safeEvidence', '6. What evidence can be checked safely?', 'What records, observation, anonymized feedback, or safe consultation could help verify the assumption?'],
                      ['designChange', '7. What should change in the design?', 'What might need to change before activities, budget, indicators, participation plans, or feedback systems are finalized?'],
                    ] as Array<[keyof typeof ownScan, string, string]>).map(([field, label, placeholder]) => (
                      <label key={field} className="m3-context-scan-field">
                        <span>{label}</span>
                        <textarea value={ownScan[field]} placeholder={placeholder} onChange={(event) => updateOwnScan(field, event.target.value)} />
                      </label>
                    ))}
                  </div>
                  <div className="m3-context-scan-submit-row">
                    <button type="button" className="m3-context-scan-submit-button" onClick={submitOwnScan}>Generate my context scan</button>
                    <p aria-live="polite">{ownValidationMessage || (ownSubmitted ? 'Your safe self-practice scan is generated below.' : 'Optional. This helps create a draft summary based on your answers.')}</p>
                  </div>
                  {ownSubmitted && (
                    <article className="m3-context-scan-output-group">
                      <h3>My Context and Inequality Scan</h3>
                      <p><strong>Project idea:</strong> {ownScan.projectIdea || 'Not specified.'}</p>
                      <p><strong>Visible situation:</strong> {ownScan.visible || 'Not specified.'}</p>
                      <p><strong>Groups who may be affected differently:</strong> {ownScan.affectedDifferently}</p>
                      <p><strong>Possible barriers:</strong> {ownScan.barriers}</p>
                      <p><strong>Assumptions to verify:</strong> {ownScan.assumptions}</p>
                      <p><strong>Safe evidence sources:</strong> {ownScan.safeEvidence || 'Not specified.'}</p>
                      <p><strong>Possible design implication:</strong> {ownScan.designChange}</p>
                    </article>
                  )}
                </div>
                <aside className="m3-context-download-card">
                  <h3>Jiru Amba scan saved</h3>
                  <p><strong>Own-CSO practice optional</strong></p>
                  <p>You can continue now or come back later to complete your own project practice.</p>
                  <PrimaryButton disabled={!submitted || outputIsStale} onClick={() => onComplete(buildSavePayload())}>Continue to standards and policy mapping</PrimaryButton>
                  <button type="button" className="m3-context-scan-secondary-button" onClick={() => setActiveStage(5)}>Return to Review</button>
                </aside>
              </div>
            )}
            {applyTab === 'downloads' && (
              <div className="m3-context-download-card">
                <h3>Context and Inequality Scan Template Pack</h3>
                <p>Use this template before finalizing project activities. Keep all examples safe, generalized, and non-identifying.</p>
                <button type="button" className="m3-context-scan-secondary-button" onClick={() => downloadTemplate('pdf')}>Download PDF template pack</button>
                <button type="button" className="m3-context-scan-secondary-button" onClick={() => downloadTemplate('md')}>Download markdown copy</button>
                <button type="button" className="m3-context-scan-secondary-button" onClick={() => downloadTemplate('blank')}>Download blank worksheet</button>
              </div>
            )}
          </section>
        )}
      </article>
    </main>
  );
}

function PolicyStandardsMapScreen({
  screen,
  state,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  state: LearningState;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [selectedAnchorIds, setSelectedAnchorIds] = useState<PolicyAnchorId[]>([]);
  const [signalReferenceMatches, setSignalReferenceMatches] = useState<Record<JiruAmbaSignalId, PolicyAnchorId | ''>>({
    presence_without_influence: '',
    different_barriers_across_groups: '',
    disability_access_barriers: '',
    information_gaps: '',
    weak_follow_up_response: '',
    unclear_livelihood_pathway: '',
    service_improvement_uncertainty: '',
  });
  const [submittedOutput, setSubmittedOutput] = useState<Record<string, unknown> | null>(null);
  const [validationMessage, setValidationMessage] = useState('');
  const [ownMap, setOwnMap] = useState({
    projectIssue: '',
    contextSignal: '',
    referenceSource: '',
    designQuestion: '',
    responsibilityQuestion: '',
    designImplication: '',
    safeSource: '',
  });
  const [ownSubmitted, setOwnSubmitted] = useState(false);
  const [ownValidationMessage, setOwnValidationMessage] = useState('');
  const [showMainVisual, setShowMainVisual] = useState(true);
  const [showIconStrip, setShowIconStrip] = useState(true);
  const [activeStage, setActiveStage] = useState(1);
  const [applyTab, setApplyTab] = useState<'own' | 'downloads'>('own');
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const taskId = `${screen.id}-task`;
  const screen5SignalIds = getScreen5Signals(state);
  const selectedMatches: SignalReferenceMatch[] = screen6ContextSignalIds.flatMap((signalId) => {
    const anchorId = signalReferenceMatches[signalId];
    return anchorId ? [{ signalId, anchorId }] : [];
  });
  const anchorSignalMatches: AnchorSignalMatch[] = selectedMatches.map((match) => ({
    anchorId: match.anchorId,
    signalId: match.signalId,
  }));
  const selectedReferenceIdsInMatches = Array.from(new Set(selectedMatches.map((match) => match.anchorId)));
  const strongestMatches = selectedMatches.filter((match) => policySignalMatchLogic[match.signalId]?.strongest === match.anchorId);
  const acceptableMatches = selectedMatches.filter((match) => isPlausiblePolicyMatch(match.anchorId, match.signalId));
  const readyToSubmit = selectedAnchorIds.length >= 3 && selectedMatches.length >= 3 && selectedReferenceIdsInMatches.length > 0;
  const submittedAnchorIds = (submittedOutput?.selectedAnchorIds || []) as PolicyAnchorId[];
  const submittedMatches = (submittedOutput?.signalReferenceMatches || []) as SignalReferenceMatch[];
  const formChanged = Boolean(
    submittedOutput &&
      (
        submittedAnchorIds.join('|') !== selectedAnchorIds.join('|') ||
        JSON.stringify(submittedMatches) !== JSON.stringify(selectedMatches)
      ),
  );
  const canContinue = Boolean(submittedOutput && !formChanged);

  const toggleAnchor = (anchorId: PolicyAnchorId) => {
    setSelectedAnchorIds((current) => {
      if (current.includes(anchorId)) {
        setSignalReferenceMatches((matches) => {
          const next = { ...matches };
          screen6ContextSignalIds.forEach((signalId) => {
            if (next[signalId] === anchorId) next[signalId] = '';
          });
          return next;
        });
        return current.filter((id) => id !== anchorId);
      }

      return [...current, anchorId];
    });
  };

  const updateMatch = (signalId: JiruAmbaSignalId, anchorId: string) => {
    setSignalReferenceMatches((current) => ({
      ...current,
      [signalId]: policyAnchors.some((anchor) => anchor.id === anchorId) ? anchorId as PolicyAnchorId : '',
    }));
  };

  const buildSubmission = () => {
    const generatedMapRows = generateStandardsMapRows(selectedMatches);
    const feedback = calculatePolicyMapFeedback(selectedAnchorIds, anchorSignalMatches, screen5SignalIds);
    const coreAnchorCount = selectedAnchorIds.filter((id) => corePolicyAnchorIds.includes(id)).length;
    const strongMatchCount = strongestMatches.length;
    const acceptableMatchCount = acceptableMatches.length;
    const feedbackLevel: FeedbackLevel =
      strongMatchCount >= 4
        ? 'strong'
        : acceptableMatchCount >= 3
          ? 'partial'
          : 'surface';
    const designImplications = generatedMapRows.map((row) => row.designImplication);
    const portfolioSummaryText =
      'You completed a first Policy and Standards Map. You connected Jiru Amba context signals to relevant rights, standards, policies, HRBA principles, and service or project commitments. You used those references to create design questions, responsibility questions, and practical design implications. You will use this map next to identify specific rights-holders and barriers.';

    return {
      screenId: 'M3-R06',
      submitted: true,
      selectedAnchorIds,
      anchorSignalMatches,
      signalReferenceMatches: selectedMatches,
      selectedCount: selectedAnchorIds.length,
      matchedCount: selectedMatches.length,
      coreAnchorCount,
      coverageScore: feedback.coverageScore,
      relevanceScore: feedback.relevanceScore,
      usefulnessScore: feedback.usefulnessScore,
      feedbackLevel,
      missingCoreAnchorIds: feedback.missingCoreAnchorIds,
      warnings: feedback.warnings,
      generatedMapRows,
      standardsMapSummary: policyMapSummary,
      policyStandardsMap: {
        selectedReferenceCards: selectedAnchorIds,
        matchedContextSignals: selectedMatches,
        generatedPolicyAndStandardsMapRows: generatedMapRows,
        designImplications,
        ownCsoPracticeOutput: ownSubmitted ? ownMap : null,
        safetyConfirmation: 'Saved as a safe learning example without real names, exact sensitive locations, complaint details, survivor stories, accusations, or identifiable personal information.',
        portfolioSummaryText,
      },
      carryForward: {
        snapshotField: 'standardsAndPolicyAnchors',
        issue:
          'A standards map is useful only when it changes design thinking. In Jiru Amba, the references show that the plan needs clearer participation, accessibility, transparency, accountability, and service-improvement logic.',
        nextUse: 'Use these references in the next screen to identify specific rights-holders and barriers. Later, use them to repair objectives, activities, accountability pathways, risks, and indicators.',
      },
    };
  };

  const submitMap = () => {
    if (selectedAnchorIds.length < 3 || selectedMatches.length < 3 || selectedReferenceIdsInMatches.length === 0) {
      setValidationMessage(
        selectedAnchorIds.length >= 3 && selectedMatches.length === 0
          ? 'References are useful only when they help improve the design. Match them to context signals so the map can generate practical design questions and implications.'
          : 'Please select at least three useful references and match them to the Jiru Amba context signals. A useful map should connect context findings to design questions and responsibility questions.',
      );
      return;
    }

    setValidationMessage('');
    const submission = buildSubmission();
    setSubmittedOutput(submission);

    if (typeof window !== 'undefined') {
      window.setTimeout(() => outputRef.current?.focus(), 0);
    }
  };

  const generatedRows = (submittedOutput?.generatedMapRows || []) as GeneratedStandardsMapRow[];
  const warnings = (submittedOutput?.warnings || []) as string[];
  const feedbackLevel = submittedOutput?.feedbackLevel as FeedbackLevel | undefined;
  const feedbackCopy = feedbackLevel === 'strong'
    ? 'Strong start. Your map uses references as design sources, not as decoration. You connected context findings to participation, equality, accessibility, transparency, accountability, or service-improvement questions. This is the right way to use standards safely in project design.'
    : feedbackLevel === 'partial' || feedbackLevel === 'good_with_gap'
      ? 'Good start. Your map identifies useful references, but check whether each one helps answer a practical design question. A strong standards map should show what the design must check, who should respond, and what should change before activities are finalized.'
      : 'This map is still too close to citation-listing. Try again by starting from the context signal first, then choosing the reference that helps explain what the design should check or improve.';
  const insightCopy = feedbackLevel === 'strong'
    ? 'Your selections show how selected references can help turn context findings into design questions, responsibility questions, and design implications.'
    : feedbackLevel === 'partial' || feedbackLevel === 'good_with_gap'
      ? 'Your selections are useful, but some matches could be stronger. Check whether each reference source helps explain what the design should check or improve.'
      : 'Your selections need stronger matching. Start from the context signal, then choose the reference source that helps create a practical design question and implication.';
  const submitHelper = selectedAnchorIds.length === 0
    ? 'Select at least three reference cards to begin your map.'
    : readyToSubmit
      ? 'Generate a policy and standards map from your selected references and context-signal matches.'
      : validationMessage || 'Select at least three useful references and match at least three context signals before generating the map.';
  const selectedReferenceCountLabel = selectedAnchorIds.length === 1
    ? '1 reference selected'
    : `${selectedAnchorIds.length} references selected`;
  const ownMapText = Object.values(ownMap).join(' ');
  const unsafeOwnDetail = /\b[A-Z][a-z]+ [A-Z][a-z]+\b|\b\d{3,}\b|complaint|survivor|abuse|assault|rape|accusation|accuse|exact location|kebele \d+|woreda office/i.test(ownMapText);

  const updateOwnMap = (field: keyof typeof ownMap, value: string) => {
    setOwnMap((current) => ({ ...current, [field]: value }));
    setOwnSubmitted(false);
  };

  const submitOwnMap = () => {
    if (
      !ownMap.contextSignal.trim() ||
      !ownMap.referenceSource.trim() ||
      !ownMap.designQuestion.trim() ||
      !ownMap.responsibilityQuestion.trim() ||
      !ownMap.designImplication.trim()
    ) {
      setOwnValidationMessage('A useful policy and standards map needs at least one context signal, one reference source, one design question, one responsibility question, and one design implication.');
      setOwnSubmitted(false);
      return;
    }

    if (unsafeOwnDetail) {
      setOwnValidationMessage('Before saving, remove any real names, exact sensitive locations, complaint details, survivor stories, accusations, or identifiable personal information. Keep this as a safe learning example.');
      setOwnSubmitted(false);
      return;
    }

    setOwnValidationMessage('');
    setOwnSubmitted(true);
  };

  const downloadPolicyTemplate = (format: 'docx' | 'md') => {
    if (typeof window === 'undefined') return;

    if (format === 'md') {
      const link = document.createElement('a');
      link.href = '/assets/resources/module-3/policy-and-standards-map-template.md';
      link.download = 'policy-and-standards-map-template.md';
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }

    const htmlTemplate = `<!doctype html><html><head><meta charset="utf-8"><title>Policy and Standards Map Template</title></head><body>${policyMapTemplateMarkdown
      .replace(/^# (.*)$/m, '<h1>$1</h1>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/\n/g, '<br>')}</body></html>`;
    const blob = new Blob([htmlTemplate], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'policy-and-standards-map-template.docx';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const policyStages: GuidedWorkspaceStage[] = [
    { id: 1, label: 'Understand', complete: activeStage > 1 },
    { id: 2, label: 'Example', complete: activeStage > 2 },
    { id: 3, label: 'Practice', complete: Boolean(submittedOutput) || activeStage > 3 },
    { id: 4, label: 'Review map', complete: Boolean(submittedOutput) && activeStage > 4, unlocked: Boolean(submittedOutput) },
    { id: 5, label: 'Apply/Download', complete: canContinue, unlocked: Boolean(submittedOutput) },
  ];
  const selectedReferenceTitles = selectedAnchorIds
    .map((anchorId) => getAnchorById(anchorId)?.title)
    .filter(Boolean) as string[];
  const matchedSignalLabels = selectedMatches
    .map((match) => getSignalById(match.signalId)?.label)
    .filter(Boolean) as string[];
  const generatePolicyMapFromStage = () => {
    submitMap();
    if (readyToSubmit) setActiveStage(4);
  };

  return (
    <main className="m3-screen m3-policy-map-screen" aria-labelledby={titleId}>
      <article className="m3-policy-map-shell">
        <header className="m3-policy-map-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-context-label">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <p className="m3-policy-map-subtitle">
            Use rights, standards, policies, and commitments to turn context findings into design questions, responsibility questions and design implications.
          </p>
          <section className="m3-policy-map-concept" aria-labelledby={`${screen.id}-meaning`}>
            <h2 id={`${screen.id}-meaning`}>What this map does</h2>
            <p>
              A policy and standards map helps you avoid designing only from needs, assumptions,
              or activity ideas. It helps you connect a context signal to reference sources, then
              use those references to improve the project design.
            </p>
            <p>
              This map is not about accusing officials, giving legal advice, or writing formal
              legal claims. It is a safe project design tool.
            </p>
            <div className="m3-policy-map-concept-chips" aria-label="Policy and standards map guiding questions">
              {policyMapConceptChips.map((chip) => (
                <span key={chip} className="m3-policy-map-concept-chip">{chip}</span>
              ))}
            </div>
          </section>
        </header>

        <GuidedWorkspaceStageNav
          stages={policyStages}
          activeStage={activeStage}
          onSelect={setActiveStage}
        />

        {activeStage <= 2 && (
        <section className="m3-policy-map-studio m3-guided-stage-card" aria-label="Policy and standards map teaching area">
          <div className="m3-policy-map-teaching">
            <section className="m3-policy-map-card" aria-labelledby={`${screen.id}-purpose`}>
              <h2 id={`${screen.id}-purpose`}>Purpose of this activity</h2>
              <p>
                A policy and standards map is a design tool, not a legal complaint and not a list
                of citations. It helps your CSO connect a context finding to the rights, standards,
                policies, service commitments, and HRBA principles that should guide project design.
              </p>
              <p>
                Use this tool to ask which rights, standards, policies, or commitments are relevant,
                what the reference requires the design to check or improve, who should respond,
                support, explain, budget, monitor, or follow up, and what should change before
                activities are finalized.
              </p>
            </section>

            <section className="m3-policy-map-card" aria-labelledby={`${screen.id}-example`}>
              <h2 id={`${screen.id}-example`}>Worked example</h2>
              <div className="m3-policy-map-example">
                <div>
                  <span>Context signal</span>
                  <p>Persons with disabilities may be invited, but materials, venues, service points, or feedback channels may not be accessible.</p>
                </div>
                <div>
                  <span>Reference sources</span>
                  <p>Equality and non-discrimination; disability inclusion and accessibility.</p>
                </div>
                <div>
                  <span>Design question</span>
                  <p>What accessibility, reasonable accommodation, and communication measures are built into the plan?</p>
                </div>
                <div>
                  <span>Responsibility question</span>
                  <p>Which planning or service actor budgets, provides, and monitors accessibility measures?</p>
                </div>
                <div>
                  <span>Design implication</span>
                  <p>Add accessibility checks, accessible information formats, reasonable accommodation, and disability-sensitive feedback before activities are finalized.</p>
                </div>
              </div>
              <p><strong>Notice:</strong> The reference is not used as decoration. It helps turn a context finding into a practical design requirement.</p>
            </section>

            <section className="m3-policy-map-card" aria-labelledby={`${screen.id}-method`}>
              <h2 id={`${screen.id}-method`}>Use a 4-step standards map</h2>
              <div className="m3-policy-map-method">
                {[
                  ['1. Start from a context signal', 'What did the context scan reveal?', 'A barrier, gap, or design concern.'],
                  ['2. Choose a reference source', 'Which right, policy, standard, HRBA principle, or commitment applies?', 'A reference that should guide the design.'],
                  ['3. Ask a design question', 'What should the project check or change?', 'A practical design question.'],
                  ['4. Ask a responsibility question', 'Who should act, explain, budget, monitor, or follow up?', 'A clear responsibility question.'],
                ].map(([step, question, output]) => (
                  <article key={step}>
                    <strong>{step}</strong>
                    <span>{question}</span>
                    <p>{output}</p>
                  </article>
                ))}
              </div>
              <p><strong>Then write the design implication:</strong> what should change before activities, budget, indicators, participation arrangements, or feedback systems are finalized?</p>
            </section>

            <section className="m3-policy-map-safe-note" aria-labelledby={`${screen.id}-safe`}>
              <h2 id={`${screen.id}-safe`}>Safe use of rights and policy references</h2>
              <p>
                Do not enter real names, complaint details, exact sensitive locations, political
                accusations, survivor stories, or identifiable personal information. Use public
                references, generalized examples, and non-sensitive project information.
              </p>
            </section>
          </div>

          <aside className="m3-policy-map-visuals" aria-label="Screen 6 support visuals">
            {showMainVisual && (
              <figure className="m3-policy-map-visual">
                <img
                  src={module3PolicyMapAssets.main.src}
                  alt={module3PolicyMapAssets.main.alt}
                  onError={() => setShowMainVisual(false)}
                />
                <figcaption>
                  Support visual: rights and policy references help organize design questions
                  around access, accountability, livelihood benefit, services, and participation.
                </figcaption>
              </figure>
            )}
            {showIconStrip && (
              <figure className="m3-policy-map-strip">
                <img
                  src={module3PolicyMapAssets.strip.src}
                  alt={module3PolicyMapAssets.strip.alt}
                  onError={() => setShowIconStrip(false)}
                />
              </figure>
            )}
          </aside>
        </section>
        )}

        {activeStage === 3 && (
        <section className="m3-policy-map-builder m3-guided-stage-card" aria-labelledby={taskId}>
          <div className="m3-policy-map-task-header">
            <div>
              <p className="m3-card-kicker">Policy and standards map</p>
              <h2 id={taskId}>Practice mapping rights and policy references using the Jiru Amba case</h2>
              <p>
                Select the references that help explain and improve the Jiru Amba design. Then match
                each context signal to a useful reference source.
              </p>
            </div>
            <span className="m3-policy-map-count" aria-live="polite">
              {selectedAnchorIds.length === 0 ? '0 selected' : selectedReferenceCountLabel}
            </span>
          </div>

          <div className="m3-policy-map-step">
            <h3>Step 1: Select at least three reference cards that should guide the design.</h3>
            <div className="m3-policy-map-anchor-grid" role="group" aria-label="Rights and policy references">
              {policyAnchors.map((anchor) => {
                const selected = selectedAnchorIds.includes(anchor.id);
                return (
                  <button
                    key={anchor.id}
                    type="button"
                    className={`m3-policy-map-anchor-card ${selected ? 'is-selected' : ''}`}
                    aria-pressed={selected}
                    data-anchor-id={anchor.id}
                    onClick={() => toggleAnchor(anchor.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
                        event.preventDefault();
                        toggleAnchor(anchor.id);
                      }
                    }}
                  >
                    <span className="m3-policy-map-anchor-status" aria-hidden="true">
                      {selected ? '✓' : '+'}
                    </span>
                      <span className="m3-policy-map-anchor-copy">
                        <span className="m3-policy-map-badge">Reference type: {anchor.sourceLayer}</span>
                        <strong>{anchor.title}</strong>
                      <span><strong>Use when the context scan shows:</strong> {anchor.useWhen}</span>
                      <span><strong>What it protects or requires:</strong> {anchor.protectsOrRequires}</span>
                      <span><strong>Design question:</strong> {anchor.designQuestion}</span>
                      <span><strong>Responsibility question:</strong> {anchor.responsibilityQuestion}</span>
                      <span><strong>Design implication:</strong> {anchor.designImplication}</span>
                      <span className="m3-policy-map-reference-list" aria-label={`Related references for ${anchor.title}`}>
                        <span>Reference sources</span>
                        {anchor.relatedReferences.map((reference) => (
                          <small key={reference}>{reference}</small>
                        ))}
                      </span>
                      {selected && <span className="m3-policy-map-selected-label">Selected</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedAnchorIds.length > 0 && (
            <div className="m3-policy-map-step m3-policy-map-match-panel">
              <h3>Step 2: Match each context signal to a useful reference</h3>
              <p>
                For each Jiru Amba context signal, choose the reference that best helps explain what
                the design should check or improve. A good match should help you write a design
                question, a responsibility question, and a design implication.
              </p>
              <div className="m3-policy-map-match-grid">
                {screen6ContextSignalIds.map((signalId) => {
                  const signal = getSignalById(signalId);
                  const logic = policySignalMatchLogic[signalId];
                  const selectedAnchorId = signalReferenceMatches[signalId];
                  const selectedAnchor = selectedAnchorId ? getAnchorById(selectedAnchorId) : null;
                  const matchHint = selectedAnchorId
                    ? logic.strongest === selectedAnchorId
                      ? 'Strongest match'
                      : logic.acceptable.includes(selectedAnchorId)
                        ? 'Acceptable alternative'
                        : 'Weak match'
                    : '';
                  if (!signal || !logic) return null;

                  return (
                    <label key={signalId} className="m3-policy-map-match-card">
                      <span>
                        <strong>{signal.label}</strong>
                        <small>{signal.plainDescription}</small>
                        <small>Strongest match: {getAnchorById(logic.strongest)?.title}</small>
                      </span>
                      <select
                        aria-label={`Reference source for ${signal.label}`}
                        data-match-signal-id={signalId}
                        value={signalReferenceMatches[signalId]}
                        onInput={(event) => updateMatch(signalId, event.currentTarget.value)}
                        onChange={(event) => updateMatch(signalId, event.target.value)}
                      >
                        <option value="">Choose a selected reference source</option>
                        {selectedAnchorIds.map((anchorId) => (
                          <option key={anchorId} value={anchorId}>
                            {getAnchorById(anchorId)?.title}
                          </option>
                        ))}
                      </select>
                      {selectedAnchor && <em>{matchHint}: {selectedAnchor.designQuestion}</em>}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div className="m3-policy-map-submit-row">
            <button
              type="button"
              className="m3-policy-map-submit-button"
              onClick={generatePolicyMapFromStage}
            >
              {submittedOutput ? 'Update policy and standards map' : 'Generate policy and standards map'}
            </button>
            <p aria-live="polite">
              {formChanged ? 'Update your draft map before continuing so the saved output matches your latest choices.' : submitHelper}
            </p>
          </div>

          <aside className="m3-guided-live-panel" aria-labelledby={`${screen.id}-live-policy`}>
            <h2 id={`${screen.id}-live-policy`}>Standards map so far</h2>
            <p aria-live="polite">{selectedReferenceCountLabel}</p>
            <div className="m3-guided-chip-list" aria-label="Selected reference sources">
              {selectedReferenceTitles.length > 0 ? selectedReferenceTitles.map((title) => (
                <span key={title} className="m3-guided-selected-chip">✓ {title}</span>
              )) : <span className="m3-guided-muted">No reference sources selected yet.</span>}
            </div>
            <p><strong>{selectedMatches.length}</strong> context signals matched.</p>
            {matchedSignalLabels.length > 0 && (
              <div className="m3-guided-chip-list" aria-label="Matched context signals">
                {matchedSignalLabels.map((label) => <span key={label} className="m3-guided-selected-chip">{label}</span>)}
              </div>
            )}
            <p className="m3-guided-helper" aria-live="polite">{submitHelper}</p>
            <p className="m3-guided-safe-note">Use public, generalized references. Do not record names, accusations, complaint details, or sensitive identifying information.</p>
          </aside>
        </section>
        )}

        {activeStage === 4 && submittedOutput && (
          <section className="m3-policy-map-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>
              Your draft Policy and Standards Map
            </h2>
            <p>
              Based on your selections, this map shows how selected references can help turn
              context findings into design questions, responsibility questions, and design
              implications. It is a learning output, not a legal opinion or formal policy analysis.
            </p>
            <div className="m3-policy-map-output-grid">
              {generatedRows.map((row) => (
                <article key={`${row.signalId}-${row.anchorId}`} className="m3-policy-map-output-row">
                  <div>
                    <span>Context signal</span>
                    <p>{row.signalLabel}</p>
                  </div>
                  <div>
                    <span>Reference sources</span>
                    <p>{row.anchorTitle}</p>
                  </div>
                  <div>
                    <span>Design question</span>
                    <p>{row.designQuestion}</p>
                  </div>
                  <div>
                    <span>Responsibility question</span>
                    <p>{row.responsibilityQuestion}</p>
                  </div>
                  <div>
                    <span>Design implication</span>
                    <p>{row.designImplication}</p>
                  </div>
                </article>
              ))}
            </div>

            <section className="m3-policy-map-insight" aria-labelledby={`${screen.id}-insight`}>
              <h3 id={`${screen.id}-insight`}>What your selections suggest</h3>
              <p>{insightCopy}</p>
            </section>

            {warnings.length > 0 && (
              <section className="m3-policy-map-warning-section" aria-labelledby={`${screen.id}-warnings`}>
                <h3 id={`${screen.id}-warnings`}>References to check</h3>
                <div className="m3-policy-map-warning-grid">
                  {warnings.map((warning) => (
                    <p key={warning} className="m3-policy-map-warning">
                      <span aria-hidden="true">!</span>
                      {warning}
                    </p>
                  ))}
                </div>
                {warnings.length > 3 && (
                  <p className="m3-policy-map-warning-note">
                    Also check the remaining missing references before applying this approach in real project design.
                  </p>
                )}
              </section>
            )}

            <p className="m3-policy-map-output-safe">
              Use rights and policy references as design questions, not accusations. Do not name
              officials, record complaints, or enter sensitive details.
            </p>
          </section>
        )}

        {activeStage === 4 && submittedOutput && (
          <section
            className={`m3-policy-map-feedback m3-policy-map-feedback--${feedbackLevel || 'surface'}`}
            aria-live="polite"
            aria-labelledby={`${screen.id}-feedback`}
          >
            <h2 id={`${screen.id}-feedback`}>Feedback on your draft map</h2>
            <p>{feedbackCopy}</p>
          </section>
        )}

        {activeStage === 4 && submittedOutput && (
          <section className="m3-policy-map-carry-forward" aria-labelledby={`${screen.id}-carry`}>
            <h2 id={`${screen.id}-carry`}>Case-study learning to carry forward</h2>
            <div className="m3-policy-map-carry-grid">
              <div>
                <span>Learning from the Jiru Amba case</span>
                <p>
                  A standards map is useful only when it changes design thinking. In Jiru Amba, the
                  references show that the plan needs clearer participation, accessibility,
                  transparency, accountability, and service-improvement logic.
                </p>
              </div>
              <div>
                <span>References to carry forward</span>
                <p>
                  {generatedRows.length > 0
                    ? generatedRows.map((row) => row.anchorTitle).join(', ')
                    : 'Participation, equality, accessibility, transparency, accountability, and service or livelihood references.'}
                </p>
              </div>
              <div>
                <span>Next use</span>
                <p>Use these references in the next screen to identify specific rights-holders and barriers. Later, use them to repair objectives, activities, accountability pathways, risks, and indicators.</p>
              </div>
            </div>
          </section>
        )}

        {activeStage === 4 && submittedOutput && (
          <div className="m3-guided-stage-actions">
            <button type="button" className="m3-secondary-button" onClick={() => setActiveStage(3)}>Edit practice map</button>
            <button type="button" className="m3-policy-map-submit-button" onClick={() => setActiveStage(5)}>Go to Apply/Download</button>
          </div>
        )}

        {activeStage === 5 && (
        <section className="m3-policy-map-own-tool m3-guided-stage-card" aria-labelledby={`${screen.id}-own`}>
          <div className="m3-guided-tabs" role="tablist" aria-label="Apply or download">
            <button type="button" role="tab" aria-selected={applyTab === 'own'} className={applyTab === 'own' ? 'is-active' : ''} onClick={() => setApplyTab('own')}>Try with my CSO project</button>
            <button type="button" role="tab" aria-selected={applyTab === 'downloads'} className={applyTab === 'downloads' ? 'is-active' : ''} onClick={() => setApplyTab('downloads')}>Download tools</button>
          </div>
          {applyTab === 'own' && (
          <>
          <div>
            <p className="m3-card-kicker">Optional practice</p>
            <h2 id={`${screen.id}-own`}>Try this with your own CSO project idea</h2>
            <p>Use this optional practice tool to test one project idea from your own CSO. Keep it safe and general. Do not enter real names, exact sensitive locations, complaint details, accusations, survivor stories, or identifiable personal information.</p>
          </div>
          <div className="m3-policy-map-form-grid">
            {([
              ['projectIssue', 'Project issue', 'Example: Improve access to market services for low-income women vendors.'],
              ['contextSignal', 'Context signal', 'What context finding, barrier, gap, or design concern did your scan reveal?'],
              ['referenceSource', 'Reference source', 'What right, standard, policy, HRBA principle, service commitment, or project commitment is relevant?'],
              ['designQuestion', 'Design question', 'What should the project design check or change?'],
              ['responsibilityQuestion', 'Responsibility question', 'Who should act, explain, budget, monitor, respond, or follow up?'],
              ['designImplication', 'Design implication', 'What should change before activities, budget, indicators, participation arrangements, or feedback systems are finalized?'],
              ['safeSource', 'Safe source to check', 'What public document, project record, anonymized feedback, or safe source could help verify this?'],
            ] as Array<[keyof typeof ownMap, string, string]>).map(([field, label, placeholder]) => (
              <label key={field} className="m3-policy-map-field">
                <span>{label}</span>
                <textarea value={ownMap[field]} placeholder={placeholder} onChange={(event) => updateOwnMap(field, event.target.value)} />
              </label>
            ))}
          </div>
          <div className="m3-policy-map-submit-row">
            <button type="button" className="m3-policy-map-submit-button" onClick={submitOwnMap}>Generate my standards map</button>
            <p aria-live="polite">{ownValidationMessage || (ownSubmitted ? 'Your safe self-practice standards map is generated below.' : 'Optional. Complete the key fields if you want to save this with the portfolio entry.')}</p>
          </div>
          {ownSubmitted && (
            <article className="m3-policy-map-own-output">
              <h3>My Policy and Standards Map</h3>
              <p><strong>Project issue:</strong> {ownMap.projectIssue || 'Not specified.'}</p>
              <p><strong>Context signal:</strong> {ownMap.contextSignal}</p>
              <p><strong>Reference source:</strong> {ownMap.referenceSource}</p>
              <p><strong>Design question:</strong> {ownMap.designQuestion}</p>
              <p><strong>Responsibility question:</strong> {ownMap.responsibilityQuestion}</p>
              <p><strong>Design implication:</strong> {ownMap.designImplication}</p>
              <p><strong>Safe source to check:</strong> {ownMap.safeSource || 'Not specified.'}</p>
            </article>
          )}
          </>
          )}
        </section>
        )}

        {activeStage === 5 && applyTab === 'downloads' && (
        <section className="m3-policy-map-template m3-guided-stage-card" aria-labelledby={`${screen.id}-template`}>
          <div>
            <p className="m3-card-kicker">Downloadable template</p>
            <h2 id={`${screen.id}-template`}>Policy and Standards Map Template</h2>
            <p>Use this template after your context and inequality scan. Keep the map safe, general, and focused on design questions.</p>
          </div>
          <div className="m3-policy-map-template-actions">
            <button type="button" className="m3-policy-map-submit-button" onClick={() => downloadPolicyTemplate('docx')}>Download Policy and Standards Map Template</button>
            <button type="button" className="m3-policy-map-submit-button" onClick={() => downloadPolicyTemplate('md')}>Download markdown copy</button>
          </div>
        </section>
        )}

        {activeStage === 5 && (
        <div className="m3-policy-map-actions">
          {!submittedOutput && (
            <p className="m3-policy-map-continue-note">
              Generate the policy and standards map before saving this screen.
            </p>
          )}
          {formChanged && (
            <p className="m3-policy-map-continue-note">
              Your choices changed. Select “Update draft map” before continuing.
            </p>
          )}
          <PrimaryButton
            disabled={!canContinue}
            onClick={() => {
              if (!submittedOutput) return;
              const savedPolicyStandardsMap = {
                ...(submittedOutput.policyStandardsMap as Record<string, unknown>),
                ownCsoPracticeOutput: ownSubmitted ? ownMap : null,
              };
              onComplete({
                ...submittedOutput,
                policyStandardsMap: savedPolicyStandardsMap,
                module3: {
                  screen6: {
                    ...submittedOutput,
                    policyStandardsMap: savedPolicyStandardsMap,
                  },
                },
                screen6: {
                  ...submittedOutput,
                  policyStandardsMap: savedPolicyStandardsMap,
                },
              });
            }}
          >
            {screen.continueLabel}
          </PrimaryButton>
        </div>
        )}
      </article>
    </main>
  );
}

function RightsHolderBarrierMapScreen({
  screen,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [selectedGroupIds, setSelectedGroupIds] = useState<RightsHolderGroupId[]>([]);
  const [customGroupLabel, setCustomGroupLabel] = useState('');
  const [groupBarrierLinks, setGroupBarrierLinks] = useState<Record<RightsHolderGroupId, BarrierTagId[]>>(emptyBarrierMap);
  const [activeGroupId, setActiveGroupId] = useState<RightsHolderGroupId | null>(null);
  const [submittedOutput, setSubmittedOutput] = useState<Screen7Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emptyPreviewImageFailed, setEmptyPreviewImageFailed] = useState(false);
  const [ownCsoDraft, setOwnCsoDraft] = useState<Screen7OwnCsoOutput>({
    projectIdea: '',
    group: '',
    affectedBenefit: '',
    priorityBarrier: '',
    whatBarrierMayBlock: '',
    designResponse: '',
    actorQuestion: '',
  });
  const [ownCsoOutput, setOwnCsoOutput] = useState<Screen7OwnCsoOutput | null>(null);
  const [ownCsoError, setOwnCsoError] = useState('');
  const [activeStage, setActiveStage] = useState(1);
  const [applyTab, setApplyTab] = useState<'own' | 'downloads'>('own');
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const taskId = `${screen.id}-task`;
  const customValidation = validateCustomGroupLabel(customGroupLabel);
  const orderedSelectedGroupIds = orderedRightsHolderGroupIds(selectedGroupIds);
  const selectedSpecificGroupIds = getSpecificGroupIds(orderedSelectedGroupIds, customValidation.isValid);
  const selectedSpecificGroupCount = selectedSpecificGroupIds.length;
  const activeRenderableGroupId =
    activeGroupId && selectedSpecificGroupIds.includes(activeGroupId)
      ? activeGroupId
      : selectedSpecificGroupIds[0] || null;
  const groupsMissingBarriers = selectedSpecificGroupIds.filter(
    (groupId) => getGroupBarrierIds(groupBarrierLinks, groupId).length === 0,
  );
  const customSelected = orderedSelectedGroupIds.includes('custom_group');
  const hasValidCustomGroup = !customSelected || customValidation.isValid;
  const customInvalid = !hasValidCustomGroup;
  const hasAtLeastOneBarrierLink = selectedSpecificGroupIds.some(
    (groupId) => getGroupBarrierIds(groupBarrierLinks, groupId).length > 0,
  );
  const missingBarrierLabels = groupsMissingBarriers.map((groupId) =>
    getRightsHolderDisplayLabel(groupId, customGroupLabel),
  );
  const canSubmit =
    selectedSpecificGroupCount >= 2 &&
    groupsMissingBarriers.length === 0 &&
    hasValidCustomGroup &&
    hasAtLeastOneBarrierLink &&
    selectedSpecificGroupIds.every((groupId) => getGroupBarrierIds(groupBarrierLinks, groupId).length <= 3) &&
    !(selectedSpecificGroupIds.length === 1 && selectedSpecificGroupIds[0] === 'custom_group') &&
    !isSubmitting;
  const currentSignature = JSON.stringify({
    selectedGroupIds: orderedSelectedGroupIds,
    selectedSpecificGroupIds,
    customGroupLabel: customSelected && customValidation.isValid ? customValidation.trimmed : undefined,
    groupBarrierLinks: selectedSpecificGroupIds.map((groupId) => ({
      groupId,
      barrierIds: getGroupBarrierIds(groupBarrierLinks, groupId),
    })),
    ownCsoOutput,
  });
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const generatedRows = submittedOutput?.generatedMapRows || [];
  const feedbackLevel = submittedOutput?.feedbackLevel;
  const visibleWarnings = (submittedOutput?.warnings || []).slice(0, 4);
  const hiddenWarningCount = Math.max(0, (submittedOutput?.warnings || []).length - visibleWarnings.length);
  const submittedOverlapLabels = (submittedOutput?.overlapInsights || []).map((groupId) =>
    getRightsHolderDisplayLabel(groupId as RightsHolderGroupId, submittedOutput?.customGroupLabel || ''),
  );
  const selectedCountLabel =
    orderedSelectedGroupIds.length === 1 ? '1 group selected' : `${orderedSelectedGroupIds.length} groups selected`;
  const specificCountHelper =
    selectedSpecificGroupCount < 2
      ? 'Select at least two specific rights-holder groups to build the practice map.'
      : selectedSpecificGroupCount <= 5
        ? 'Good range for a focused practice map.'
        : 'This map may become too broad. Keep only the groups that most change the design question.';
  const isBuilderEmpty = selectedSpecificGroupCount === 0;
  const submitHelper =
    selectedSpecificGroupCount === 0
      ? 'Please select at least two specific rights-holder groups. HRBA design should move beyond “the community” and identify who may experience the issue differently.'
    : selectedSpecificGroupCount === 1
        ? selectedSpecificGroupIds[0] === 'custom_group'
          ? 'Add at least one specific Jiru Amba group so your map can connect to the case-study design process.'
          : 'Please select at least two specific rights-holder groups. HRBA design should move beyond “the community” and identify who may experience the issue differently.'
        : customInvalid
            ? 'Fix the generalized group label before generating the draft map.'
            : groupsMissingBarriers.length === 1
              ? `Each selected group needs at least one priority barrier. Choose the barrier most likely to change the design. Missing: ${missingBarrierLabels[0]}.`
              : groupsMissingBarriers.length >= 2
                ? `Each selected group needs at least one priority barrier. Missing: ${missingBarrierLabels.join(', ')}.`
                : selectedSpecificGroupIds.some((groupId) => getGroupBarrierIds(groupBarrierLinks, groupId).length > 3)
                  ? 'Try to prioritize. Choose the one or two barriers most likely to change the design for this group.'
                : submittedOutput
                  ? 'You can update your selections and generate the map again.'
                  : 'Ready to generate your draft rights-holder and barrier map.';
  const feedbackCopy = feedbackLevel === 'strong'
    ? 'Strong draft map. You identified specific rights-holder groups and meaningful barriers. Strengthen it by checking whether the design also needs to respond to influence, accessibility, information, livelihood benefit, safety, cost, distance, or feedback barriers.'
    : feedbackLevel === 'good_with_gap'
      ? 'Good start. You identified specific groups, but the map may still be too narrow. Check whether different groups face different types of barriers, such as information, accessibility, cost, distance, livelihood risk, or feedback and response.'
      : feedbackLevel === 'too_unfocused'
        ? 'Good start, but the map is trying to hold too many barriers. Prioritize the one or two barriers most likely to change the design for each group.'
        : 'This map is still too broad. HRBA design should not stop at naming groups. Add the priority barriers that may block access, influence, benefit, safety, or follow-up.';
  const insightCopy = feedbackLevel === 'strong'
    ? 'Your draft map identifies specific rights-holder groups and meaningful barriers. Check whether the design also needs to respond to influence, accessibility, information, livelihood benefit, safety, cost, distance, or feedback barriers.'
    : feedbackLevel === 'too_unfocused'
      ? 'The map should focus on priority barriers, not every possible barrier. Narrow each group to the barriers most likely to change the design.'
      : 'Your draft map has useful starting points. Check whether different groups face different types of barriers, such as information, accessibility, cost, distance, livelihood risk, or feedback and response.';

  const toggleGroup = (groupId: RightsHolderGroupId) => {
    setSelectedGroupIds((current) => {
      const selected = current.includes(groupId);
      const next = selected ? current.filter((id) => id !== groupId) : [...current, groupId];

      if (selected) {
        setGroupBarrierLinks((links) => ({ ...links, [groupId]: [] }));
        setActiveGroupId((currentActive) => (currentActive === groupId ? null : currentActive));
      } else if (groupId !== 'community_as_whole') {
        setActiveGroupId(groupId);
      }

      return next;
    });
  };

  const toggleBarrier = (groupId: RightsHolderGroupId, barrierId: BarrierTagId) => {
    setGroupBarrierLinks((current) => {
      const currentIds = current[groupId] || [];
      const nextIds = currentIds.includes(barrierId)
        ? currentIds.filter((id) => id !== barrierId)
        : [...currentIds, barrierId];

      return {
        ...current,
        [groupId]: barrierTags.map((barrier) => barrier.id).filter((id) => nextIds.includes(id)),
      };
    });
  };

  const buildSubmission = (): Screen7Submission => {
    const generatedMapRows = generateRightsHolderBarrierRows(selectedSpecificGroupIds, groupBarrierLinks, customGroupLabel);
    const feedback = deriveRightsHolderFeedback(orderedSelectedGroupIds, selectedSpecificGroupIds, groupBarrierLinks);
    const customLabel = customSelected && customValidation.isValid ? customValidation.trimmed : undefined;
    const barrierPatternSummary = generatedMapRows.map((row) => ({
      groupLabel: row.groupLabel,
      barrierLabels: row.barrierLabels,
      barrierCategories: row.barrierCategories,
    }));

    return {
      screenId: 'M3-R07',
      submitted: true,
      selectedGroupIds: orderedSelectedGroupIds,
      selectedSpecificGroupIds,
      ...(customLabel ? { customGroupLabel: customLabel } : {}),
      groupBarrierLinks: generatedMapRows.map((row) => ({
        groupId: row.groupId,
        groupLabel: row.groupLabel,
        barrierIds: row.barrierIds,
        barrierLabels: row.barrierLabels,
      })),
      selectedBarrierIds: feedback.selectedBarrierIds,
      selectedSpecificGroupCount: feedback.selectedSpecificGroupCount,
      barrierCategoryCount: feedback.barrierCategoryCount,
      feedbackLevel: feedback.feedbackLevel,
      warnings: feedback.warnings,
      overlapInsights: feedback.overlapInsights,
      generatedMapRows,
      barrierPatternSummary,
      rightsHolderBarrierSummary,
      ...(ownCsoOutput ? { ownCsoOutput } : {}),
      safetyConfirmation:
        'Safe learning output only: no real names, complaint details, exact sensitive locations, survivor stories, accusations, or identifiable personal information were requested.',
      portfolioSummary: rightsHolderPortfolioSummary,
      carryForward: rightsHolderCarryForward,
    };
  };

  const submitMap = () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    const submission = buildSubmission();
    setSubmittedOutput(submission);
    setSubmittedSignature(currentSignature);
    setIsSubmitting(false);

    if (typeof window !== 'undefined') {
      window.setTimeout(() => outputRef.current?.focus(), 0);
    }
  };

  const updateOwnCsoDraft = (field: keyof Screen7OwnCsoOutput, value: string) => {
    setOwnCsoDraft((current) => ({ ...current, [field]: value }));
    setOwnCsoError('');
  };

  const generateOwnCsoMap = () => {
    const requiredValues = [
      ownCsoDraft.group,
      ownCsoDraft.affectedBenefit,
      ownCsoDraft.priorityBarrier,
      ownCsoDraft.whatBarrierMayBlock,
      ownCsoDraft.designResponse,
    ];
    const hasBlankRequired = requiredValues.some((value) => !value.trim());
    const containsUnsafeDetail = Object.values(ownCsoDraft).some((value) => value.trim() && validateSafeLearningText(value));

    if (hasBlankRequired) {
      setOwnCsoError('A useful rights-holder and barrier map needs a specific group, an affected benefit, a priority barrier, what the barrier may block, and a design response.');
      return;
    }

    if (containsUnsafeDetail) {
      setOwnCsoError('Before saving, remove any real names, exact sensitive locations, complaint details, survivor stories, accusations, or identifiable personal information. Keep this as a safe learning example.');
      return;
    }

    setOwnCsoOutput({
      projectIdea: ownCsoDraft.projectIdea.trim() || 'General project idea to be clarified safely.',
      group: ownCsoDraft.group.trim(),
      affectedBenefit: ownCsoDraft.affectedBenefit.trim(),
      priorityBarrier: ownCsoDraft.priorityBarrier.trim(),
      whatBarrierMayBlock: ownCsoDraft.whatBarrierMayBlock.trim(),
      designResponse: ownCsoDraft.designResponse.trim(),
      actorQuestion: ownCsoDraft.actorQuestion.trim() || 'Who should be explored in the next actor and responsibility map?',
    });
    setOwnCsoError('');
  };

  const downloadRightsHolderTemplate = (format: 'docx' | 'md') => {
    if (typeof document === 'undefined') return;
    const link = document.createElement('a');
    if (format === 'md') {
      link.href = '/assets/resources/module-3/rights-holder-and-barrier-map-template.md';
      link.download = 'rights-holder-and-barrier-map-template.md';
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }

    const blob = new Blob([buildRightsHolderBarrierTemplateHtml()], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'rights-holder-and-barrier-map-template.docx';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const rightsMapStages: GuidedWorkspaceStage[] = [
    { id: 1, label: 'Understand', complete: activeStage > 1 },
    { id: 2, label: 'Example', complete: activeStage > 2 },
    { id: 3, label: 'Practice', complete: Boolean(submittedOutput) || activeStage > 3 },
    { id: 4, label: 'Review map', complete: Boolean(submittedOutput) && activeStage > 4, unlocked: Boolean(submittedOutput) },
    { id: 5, label: 'Apply/Download', complete: canContinue, unlocked: Boolean(submittedOutput) },
  ];
  const generateRightsMapFromStage = () => {
    submitMap();
    if (canSubmit) setActiveStage(4);
  };
  const selectedGroupChips = orderedSelectedGroupIds.map((groupId) => ({
    id: groupId,
    label: getRightsHolderDisplayLabel(groupId, customGroupLabel),
    status: groupId === 'community_as_whole'
      ? 'Broad label'
      : getPreviewStatus(getGroupBarrierIds(groupBarrierLinks, groupId)),
  }));

  return (
    <main className="m3-screen m3-rights-map-screen" aria-labelledby={titleId}>
      <article className="m3-rights-map-shell">
        <header className="m3-rights-map-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-rights-map-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Rights-Holder and Barrier Map</h1>
          <p className="m3-rights-map-subtitle">
            Move beyond “the community”: identify specific groups, the barriers they face, and what the design must change.
          </p>
          <section className="m3-rights-map-concept" aria-labelledby={`${screen.id}-meaning`}>
            <h2 id={`${screen.id}-meaning`}>Rights-holders are not just “target groups”</h2>
            <p>
              Many proposals use broad labels such as “the community,” “beneficiaries,” “women and youth,”
              or “vulnerable groups.” These labels are usually too broad for HRBA project design.
            </p>
            <p>
              An HRBA design asks which specific group may experience the issue differently, what right,
              service, benefit, decision, or follow-up is affected, what barrier may block access, voice,
              influence, safety, or benefit, what the design should change, and who should be explored in
              the next actor and responsibility map.
            </p>
            <div className="m3-rights-map-concept-chips" aria-label="Rights-holder mapping guiding questions">
              {rightsHolderConceptChips.map((chip) => (
                <span key={chip} className="m3-rights-map-concept-chip">{chip}</span>
              ))}
            </div>
            <p className="m3-rights-map-key-message">
              Do not stop at naming groups. A strong HRBA design explains the barriers each group faces and what the project must change because of those barriers.
            </p>
          </section>
        </header>

        <GuidedWorkspaceStageNav
          stages={rightsMapStages}
          activeStage={activeStage}
          onSelect={setActiveStage}
        />

        {activeStage <= 2 && (
        <section className="m3-rights-map-orientation m3-guided-stage-card" aria-label="Rights-holder mapping orientation">
          <section className="m3-rights-map-card" aria-labelledby={`${screen.id}-purpose`}>
            <h2 id={`${screen.id}-purpose`}>Purpose of this activity</h2>
            <p>
              A rights-holder is not just a target group or project participant. A rights-holder is a
              person or group with rights, claims, voice, and agency.
            </p>
            <p>
              In project design, identifying rights-holders means asking who is affected by the issue,
              who may be excluded or affected differently, what access, service, benefit, decision, or
              follow-up is affected, what barriers may block participation, information, influence,
              safety, benefit, or response, what the project design should change, and which actors or
              responsibilities should be explored next.
            </p>
            <p>
              This screen helps you create a Rights-Holder and Barrier Map for the Jiru Amba case. You
              will use this map in the next screen to identify duty-bearers, supporting actors, and
              realistic CSO roles.
            </p>
          </section>

          <section className="m3-rights-map-card" aria-labelledby={`${screen.id}-method`}>
            <h2 id={`${screen.id}-method`}>Use a 6-step rights-holder and barrier map</h2>
            <div className="m3-rights-map-method-table" role="table" aria-label="Six-step rights-holder and barrier map method">
              <div role="row" className="m3-rights-map-method-row m3-rights-map-method-row--head">
                <span role="columnheader">Step</span>
                <span role="columnheader">Question</span>
                <span role="columnheader">Example</span>
              </div>
              {[
                ['1. Name the specific group', 'Which group may experience the issue differently?', 'Women traders, not just “women.”'],
                ['2. Name the affected right, service, or benefit', 'What access, service, decision, benefit, or follow-up is affected?', 'Livelihood opportunity and influence over market priorities.'],
                ['3. Choose the priority barrier', 'What blocks access, voice, benefit, safety, or response?', 'Limited influence and information barrier.'],
                ['4. Identify what the barrier may block', 'What might not happen if the barrier is ignored?', 'Priorities may be shaped without women traders’ influence.'],
                ['5. Write a design response', 'What should change in the project design?', 'Adjust communication, timing, consultation, feedback, and follow-up.'],
                ['6. Carry forward to actors', 'Who must be explored in the next actor/responsibility map?', 'Planning office, market committee, CSO facilitator, service actors.'],
              ].map(([step, question, example]) => (
                <div key={step} role="row" className="m3-rights-map-method-row">
                  <span role="cell">{step}</span>
                  <span role="cell">{question}</span>
                  <span role="cell">{example}</span>
                </div>
              ))}
            </div>
            <p className="m3-rights-map-key-message">
              The goal is not to select every possible barrier. Choose the one or two priority barriers most likely to change the design.
            </p>
          </section>

          <section className="m3-rights-map-card" aria-labelledby={`${screen.id}-example`}>
            <h2 id={`${screen.id}-example`}>Worked example</h2>
            <p>Here is how one broad signal becomes a more useful map for design.</p>
            <div className="m3-rights-map-example">
              <div>
                <span>Specific rights-holder group</span>
                <p>Women traders in the market area.</p>
              </div>
              <div>
                <span>Affected right, service, or project benefit</span>
                <p>Livelihood participation, access to information, and influence over market-related priorities.</p>
              </div>
              <div>
                <span>Priority barriers</span>
                <p>Limited influence, timing or care-work barrier, and information barrier.</p>
              </div>
              <div>
                <span>What the barriers may block</span>
                <p>Women traders may be consulted after priorities are already shaped, may miss information because of work and care schedules, or may not see how market decisions affect their livelihood.</p>
              </div>
              <div>
                <span>Design response</span>
                <p>Share information earlier, use market-accessible communication channels, schedule consultation around livelihood realities, and show how women traders’ priorities changed the plan.</p>
              </div>
              <div>
                <span>Question for Screen 8</span>
                <p>Which planning, market, or service actor must respond to these barriers, and what role should Awra realistically play?</p>
              </div>
            </div>
            <p>
              <strong>Notice:</strong> The point is not to list every possible barrier. The point is to identify the barriers that should change the project design.
            </p>
          </section>

          <section className="m3-rights-map-safe-note" aria-labelledby={`${screen.id}-safe`}>
            <h2 id={`${screen.id}-safe`}>Safe practice</h2>
            <p>
              Use the Jiru Amba learning case. When applying this tool to your own work, use
              generalized group labels only. Do not enter real names, complaint details, exact
              sensitive locations, survivor stories, political accusations, or identifiable personal
              information.
            </p>
            <div className="m3-rights-map-safe-grid">
              <div>
                <h3>Safe examples</h3>
                <ul>
                  <li>women traders;</li>
                  <li>remote kebele residents;</li>
                  <li>informal workers;</li>
                  <li>persons with disabilities;</li>
                  <li>low-income households;</li>
                  <li>youth seeking livelihood opportunities.</li>
                </ul>
              </div>
              <div>
                <h3>Unsafe examples</h3>
                <ul>
                  <li>names of individual complainants;</li>
                  <li>exact sensitive locations;</li>
                  <li>identifiable complaint details;</li>
                  <li>survivor stories;</li>
                  <li>accusations against named officials or individuals.</li>
                </ul>
              </div>
            </div>
          </section>
        </section>
        )}

        {activeStage === 3 && (
        <section className="m3-rights-map-builder-section m3-guided-stage-card" aria-labelledby={taskId}>
          <div className="m3-rights-map-task-header">
            <div>
              <p className="m3-rights-map-kicker">Rights-Holder and Barrier Map</p>
              <h2 id={taskId}>Practice a rights-holder and barrier map using the Jiru Amba case</h2>
              <p>
                Step 1: Select specific rights-holder groups that may experience barriers differently.
                Step 2: For each selected group, choose one or two priority barriers that should change the design.
                Step 3: Generate a draft map.
              </p>
              <p>Do not select every possible barrier. Choose the barriers most likely to affect access, participation, influence, safety, benefit, or follow-up.</p>
            </div>
            <span className="m3-rights-map-count" aria-live="polite">
              {orderedSelectedGroupIds.length === 0 ? '0 groups selected' : selectedCountLabel}
            </span>
          </div>
          <p className="m3-rights-map-helper" aria-live="polite">{specificCountHelper}</p>

          <section
            className={`m3-rights-map-builder ${
              isBuilderEmpty ? 'm3-rights-map-builder--empty' : 'm3-rights-map-builder--active'
            }`}
          >
            <section className="m3-rights-map-panel m3-rights-map-groups-panel m3-rights-map-step" aria-labelledby={`${screen.id}-groups`}>
              <h3 id={`${screen.id}-groups`}>Step 1: Select specific rights-holder groups</h3>
              <p>Which specific rights-holder groups should the Jiru Amba plan examine more carefully?</p>
              <div className="m3-rights-map-group-grid" role="group" aria-labelledby={`${screen.id}-groups`}>
                {rightsHolderGroups.map((group) => {
                  const selected = orderedSelectedGroupIds.includes(group.id);
                  const isBroad = group.id === 'community_as_whole';
                  const barrierCount = getGroupBarrierIds(groupBarrierLinks, group.id).length;
                  const status = selected
                    ? isBroad
                      ? 'Too broad'
                      : getActiveGroupStatus(barrierCount)
                    : group.isSpecific
                      ? 'Specific group'
                      : 'Broad label';

                  return (
                    <button
                      key={group.id}
                      type="button"
                      className={`m3-rights-map-group-card ${selected ? 'is-selected' : ''} ${isBroad ? 'is-broad' : ''}`}
                      aria-pressed={selected}
                      data-group-id={group.id}
                      onClick={() => toggleGroup(group.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
                          event.preventDefault();
                          toggleGroup(group.id);
                        }
                      }}
                    >
                      <span className="m3-rights-map-group-status" aria-hidden="true">{selected ? '✓' : '+'}</span>
                      <span className="m3-rights-map-group-copy">
                        <strong>{group.label}</strong>
                        <span><b>Affected right, service, or project benefit:</b> {group.affectedBenefit}</span>
                        <span><b>Case clue:</b> {group.caseClue}</span>
                        <small>{status}</small>
                      </span>
                    </button>
                  );
                })}
              </div>

              {customSelected && (
                <label className="m3-rights-map-custom-label">
                  <span>General group label</span>
                  <input
                    type="text"
                    value={customGroupLabel}
                    placeholder="Example: caregivers, pastoralist households, people with limited literacy, people using informal transport."
                    aria-describedby={`${screen.id}-custom-helper ${customInvalid ? `${screen.id}-custom-error` : ''}`}
                    aria-invalid={customInvalid}
                    onInput={(event) => setCustomGroupLabel(event.currentTarget.value)}
                    onChange={(event) => setCustomGroupLabel(event.target.value)}
                  />
                  <small id={`${screen.id}-custom-helper`}>
                    Use a generalized group label only. Do not enter real names, complaint details, exact sensitive locations, or identifiable personal information.
                  </small>
                  {customInvalid && (
                    <strong id={`${screen.id}-custom-error`} role="alert">
                      {customValidation.error}
                    </strong>
                  )}
                </label>
              )}
            </section>

            {isBuilderEmpty ? (
              <section className="m3-rights-map-empty-hero" aria-label="Rights-holder map orientation">
                <div className="m3-rights-map-empty-hero-copy">
                  <p className="m3-rights-map-kicker">Start with specific groups</p>
                  <h3>Map who may face different barriers</h3>
                  <p>
                    Select at least two rights-holder groups from the Jiru Amba case. Your map will
                    appear here as you add priority barriers.
                  </p>
                  <ul>
                    <li>Move beyond “the community.”</li>
                    <li>Choose specific groups.</li>
                    <li>Add the barriers that should change the design.</li>
                  </ul>
                  {orderedSelectedGroupIds.includes('community_as_whole') && (
                    <p className="m3-rights-map-empty-note">
                      “The community as a whole” is a broad label only. Add specific groups to
                      make the map useful.
                    </p>
                  )}
                </div>
                {emptyPreviewImageFailed ? (
                  <div className="m3-rights-map-empty-hero-fallback" aria-hidden="true">
                    <span>Planning room looks full</span>
                    <span>Who speaks?</span>
                    <span>Who accesses information?</span>
                    <span>Who receives follow-up?</span>
                  </div>
                ) : (
                  <figure className="m3-rights-map-empty-hero-figure">
                    <img
                      src={module3RightsHolderBarrierAssets.defaultPreview.src}
                      alt={module3RightsHolderBarrierAssets.defaultPreview.alt}
                      loading="lazy"
                      onError={() => setEmptyPreviewImageFailed(true)}
                    />
                    <figcaption>
                      Case-study visual: a planning meeting may look inclusive, but different
                      rights-holder groups may still face different barriers.
                    </figcaption>
                  </figure>
                )}
              </section>
            ) : (
              <>
                <section className="m3-rights-map-panel m3-rights-map-barriers-panel m3-rights-map-step" aria-labelledby={`${screen.id}-barriers`}>
                  <h3 id={`${screen.id}-barriers`}>Step 2: Add priority barriers for each selected group</h3>
                  {activeRenderableGroupId && (
                <>
                  <div className="m3-rights-map-active-tabs" role="tablist" aria-label="Selected rights-holder groups">
                    {selectedSpecificGroupIds.map((groupId) => {
                      const groupLabel = getRightsHolderDisplayLabel(groupId, customGroupLabel);
                      const barrierCount = getGroupBarrierIds(groupBarrierLinks, groupId).length;
                      const active = groupId === activeRenderableGroupId;
                      const status = getActiveGroupStatus(barrierCount);

                      return (
                        <button
                          key={groupId}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          className={`m3-rights-map-active-tab ${active ? 'is-active' : ''}`}
                          onClick={() => setActiveGroupId(groupId)}
                        >
                          <span>{groupLabel} · {barrierCount === 1 ? '1 barrier' : `${barrierCount} barriers`}</span>
                          <small>{status}</small>
                        </button>
                      );
                    })}
                  </div>

                  <div className="m3-rights-map-barrier-panel">
                    <h4>Add priority barriers for: {getRightsHolderDisplayLabel(activeRenderableGroupId, customGroupLabel)}</h4>
                    <p>Choose one or two barriers that most change the design. You do not need to select everything.</p>
                    <p>Suggested barriers for this group are marked “Suggested,” but you decide what fits the Jiru Amba case.</p>
                    <div className="m3-rights-map-barrier-grid" role="group" aria-label={`Priority barriers for ${getRightsHolderDisplayLabel(activeRenderableGroupId, customGroupLabel)}`}>
                      {barrierTags.map((barrier) => {
                        const selected = getGroupBarrierIds(groupBarrierLinks, activeRenderableGroupId).includes(barrier.id);
                        const suggested = getRightsHolderGroupById(activeRenderableGroupId)?.suggestedBarrierIds.includes(barrier.id);

                        return (
                          <button
                            key={barrier.id}
                            type="button"
                            className={`m3-rights-map-barrier-chip ${selected ? 'is-selected' : ''}`}
                            aria-pressed={selected}
                            data-barrier-id={barrier.id}
                            onClick={() => toggleBarrier(activeRenderableGroupId, barrier.id)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
                                event.preventDefault();
                                toggleBarrier(activeRenderableGroupId, barrier.id);
                              }
                            }}
                          >
                            <span className="m3-rights-map-barrier-icon" aria-hidden="true">{selected ? '✓' : '+'}</span>
                            <span>
                              <strong>{barrier.label}</strong>
                              <small>{barrier.plainMeaning}</small>
                              <em>Design risk: {barrier.designRisk}</em>
                              <span className="m3-rights-map-barrier-tags">
                                {suggested && <span>Suggested</span>}
                                {selected && <span>Selected</span>}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
                  )}
                </section>

                <aside className="m3-rights-map-panel m3-rights-map-preview-panel m3-rights-map-preview" aria-labelledby={`${screen.id}-preview`}>
                  <h3 id={`${screen.id}-preview`}>Map preview</h3>
                  <p>
                    This preview updates as you select groups and barriers. Submit when each
                    selected group has at least one priority barrier.
                  </p>
                  <div className="m3-rights-map-preview-list">
                    {selectedSpecificGroupIds.map((groupId) => (
                      <p key={groupId}>
                        <strong>{getRightsHolderDisplayLabel(groupId, customGroupLabel)}</strong>
                        <span>{getPreviewStatus(getGroupBarrierIds(groupBarrierLinks, groupId))}</span>
                      </p>
                    ))}
                    {orderedSelectedGroupIds.includes('community_as_whole') && (
                      <p>
                        <strong>The community as a whole</strong>
                        <span>broad label only. Add specific groups to make the map useful.</span>
                      </p>
                    )}
                  </div>
                </aside>
              </>
            )}
          </section>

          <div className="m3-rights-map-submit-row">
            <button
              type="button"
              className="m3-rights-map-submit-button"
              disabled={!canSubmit}
              onClick={generateRightsMapFromStage}
            >
              {submittedOutput ? 'Update rights-holder and barrier map' : 'Generate rights-holder and barrier map'}
            </button>
            <p aria-live="polite">
              {formChanged ? 'Update your draft map before continuing so the saved output matches your latest choices.' : submitHelper}
            </p>
          </div>

          <aside className="m3-guided-live-panel" aria-labelledby={`${screen.id}-live-barrier`}>
            <h2 id={`${screen.id}-live-barrier`}>Barrier map so far</h2>
            <p aria-live="polite">{orderedSelectedGroupIds.length === 0 ? 'No groups selected yet.' : selectedCountLabel}</p>
            <div className="m3-guided-chip-list" aria-label="Selected rights-holder groups">
              {selectedGroupChips.length > 0 ? selectedGroupChips.map((chip) => (
                <span key={chip.id} className="m3-guided-selected-chip">✓ {chip.label} · {chip.status}</span>
              )) : <span className="m3-guided-muted">Select at least two specific groups.</span>}
            </div>
            <p><strong>{selectedSpecificGroupIds.length}</strong> specific groups ready for barrier mapping.</p>
            <p><strong>{selectedSpecificGroupIds.reduce((total, groupId) => total + getGroupBarrierIds(groupBarrierLinks, groupId).length, 0)}</strong> priority barriers linked.</p>
            <p className="m3-guided-helper" aria-live="polite">{submitHelper}</p>
            <p className="m3-guided-safe-note">Keep examples generalized. Do not enter names, complaints, exact sensitive locations, survivor stories, accusations, or identifiable personal information.</p>
          </aside>
        </section>
        )}

        {activeStage === 4 && submittedOutput && (
          <section className="m3-rights-map-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>
              Your draft Rights-Holder and Barrier Map
            </h2>
            <p>
              Based on your selections, this map shows which specific rights-holder groups may face priority
              barriers in the Jiru Amba case. It is a learning output, not a final assessment. Use it to
              prepare for the next screen, where you will identify duty-bearers, supporting actors, and
              realistic CSO roles.
            </p>

            <section className="m3-rights-map-matrix" aria-labelledby={`${screen.id}-matrix`}>
              <h3 id={`${screen.id}-matrix`}>Barrier pattern summary</h3>
              <div className="m3-rights-map-matrix-table" role="table" aria-label="Barrier pattern summary">
                <div role="row" className="m3-rights-map-matrix-row m3-rights-map-matrix-row--head">
                  <span role="columnheader">Rights-holder group</span>
                  {barrierCategoryOrder.map((category) => (
                    <span key={category} role="columnheader">{barrierCategoryLabels[category]}</span>
                  ))}
                </div>
                {generatedRows.map((row) => (
                  <div key={row.groupId} role="row" className="m3-rights-map-matrix-row">
                    <span role="rowheader">{row.groupLabel}</span>
                    {barrierCategoryOrder.map((category) => {
                      const count = row.barrierIds.filter((barrierId) => getBarrierById(barrierId)?.category === category).length;
                      return (
                        <span key={category} role="cell">{count > 0 ? `Selected (${count})` : 'Not selected'}</span>
                      );
                    })}
                  </div>
                ))}
              </div>
              {generatedRows.some((row) => generatedRows.some((other) => other.groupId !== row.groupId && other.barrierIds.some((id) => row.barrierIds.includes(id)))) && (
                <p className="m3-rights-map-overlap-note">
                  <strong>Overlapping barrier:</strong> More than one group faces this barrier. This suggests the design may need a cross-cutting response, not only a group-specific activity.
                </p>
              )}
            </section>

            <div className="m3-rights-map-generated-card-grid">
              {generatedRows.map((row) => (
                <article key={row.groupId} className="m3-rights-map-generated-card">
                  <h3>{row.groupLabel}</h3>
                  <div>
                    <span>Specific rights-holder group</span>
                    <p>{row.groupLabel}</p>
                  </div>
                  <div>
                    <span>Affected right, service, or project benefit</span>
                    <p>{row.affectedBenefit}</p>
                  </div>
                  <div>
                    <span>Priority barrier</span>
                    <p>{row.barrierLabels.join(', ')}</p>
                  </div>
                  <div>
                    <span>What the barrier may block</span>
                    <p>{row.whatBarrierMayBlock}</p>
                  </div>
                  <div>
                    <span>Design response</span>
                    <p>{row.designResponse}</p>
                  </div>
                  <div>
                    <span>Question for Screen 8</span>
                    <p>{row.screen8Question}</p>
                  </div>
                </article>
              ))}
            </div>

            <section className="m3-rights-map-insight" aria-labelledby={`${screen.id}-insight`}>
              <h3 id={`${screen.id}-insight`}>What your selections suggest</h3>
              <p>{insightCopy}</p>
            </section>

            {submittedOverlapLabels.length > 0 && (
              <section className="m3-rights-map-insight" aria-labelledby={`${screen.id}-overlap`}>
                <h3 id={`${screen.id}-overlap`}>Overlapping barriers</h3>
                <p>
                  Some groups may face more than one barrier at the same time. Where gender,
                  disability, income, distance, livelihood risk, information gaps, or weak feedback
                  overlap, the project may need more than a general invitation or one activity.
                </p>
                <ul>
                  <li>earlier and more accessible information;</li>
                  <li>safer participation channels;</li>
                  <li>adjusted timing or location;</li>
                  <li>accessibility and reasonable accommodation;</li>
                  <li>livelihood-sensitive scheduling;</li>
                  <li>clearer feedback and response;</li>
                  <li>stronger follow-up.</li>
                </ul>
                <p>
                  <strong>Your map shows overlapping barriers for:</strong> {submittedOverlapLabels.join(', ')}. <strong>What this means:</strong> The design should include cross-cutting responses, not only separate activities for each group.
                </p>
              </section>
            )}

            {submittedOutput.selectedGroupIds.includes('community_as_whole') && (
              <section className="m3-rights-map-insight" aria-labelledby={`${screen.id}-broad`}>
                <h3 id={`${screen.id}-broad`}>Broad label reminder</h3>
                <p>
                  “The community” can help orient the discussion, but it is not enough for HRBA
                  design. The specific groups in your map are what help the project team see
                  different barriers and design responses.
                </p>
              </section>
            )}

            <section className="m3-rights-map-warning-section" aria-labelledby={`${screen.id}-warnings`}>
              <h3 id={`${screen.id}-warnings`}>What to check next</h3>
              <p>
                A barrier map is not complete until the project asks who can respond. Carry this map into the next screen and explore:
              </p>
              <ul>
                <li>Which public or service actor has a responsibility linked to the barrier?</li>
                <li>Which community structure, committee, or service actor influences the barrier?</li>
                <li>What role can Awra realistically play without replacing duty-bearers?</li>
                <li>What capacity gaps may prevent actors from responding well?</li>
                <li>What should be checked safely before finalizing the design?</li>
              </ul>
              {visibleWarnings.length > 0 ? (
                <div className="m3-rights-map-warning-grid">
                  {visibleWarnings.map((warning) => (
                    <p key={warning} className="m3-rights-map-warning">
                      <span aria-hidden="true">!</span>
                      {warning}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="m3-rights-map-warning-note">
                  Use Screen 8 to connect each priority barrier to responsible public actors, supporting actors, and realistic CSO roles.
                </p>
              )}
              {hiddenWarningCount > 0 && (
                <p className="m3-rights-map-warning-note">
                  Also review the remaining gaps before applying this approach in real project design.
                </p>
              )}
            </section>
          </section>
        )}

        {activeStage === 4 && submittedOutput && (
          <section
            className={`m3-rights-map-feedback m3-rights-map-feedback--${feedbackLevel || 'too_broad'}`}
            aria-live="polite"
            aria-labelledby={`${screen.id}-feedback`}
          >
            <h2 id={`${screen.id}-feedback`}>Feedback</h2>
            <p>{feedbackCopy}</p>
          </section>
        )}

        {activeStage === 4 && submittedOutput && (
          <section className="m3-rights-map-carry-forward" aria-labelledby={`${screen.id}-carry`}>
            <h2 id={`${screen.id}-carry`}>Case-study learning to carry forward</h2>
            <div className="m3-rights-map-carry-grid">
              <div>
                <span>Learning from the Jiru Amba case</span>
                <p>
                  The plan should not treat “the community” as one group. It should identify specific rights-holder groups, the barriers they face, and what the design should change before activities are finalized.
                </p>
              </div>
              <div>
                <span>Rights-holder groups in this draft map</span>
                <p>
                  {generatedRows.length > 0
                    ? generatedRows.map((row) => row.groupLabel).join(', ')
                    : 'No specific rights-holder groups were saved.'}
                </p>
              </div>
              <div>
                <span>Next use</span>
                <p>Use this map in the next screen to identify duty-bearers, supporting actors, and realistic CSO roles.</p>
              </div>
            </div>
          </section>
        )}

        {activeStage === 4 && submittedOutput && (
          <div className="m3-guided-stage-actions">
            <button type="button" className="m3-secondary-button" onClick={() => setActiveStage(3)}>Edit barrier map</button>
            <button type="button" className="m3-rights-map-submit-button" onClick={() => setActiveStage(5)}>Go to Apply/Download</button>
          </div>
        )}

        {activeStage === 5 && (
        <section className="m3-rights-map-own-cso m3-guided-stage-card" aria-labelledby={`${screen.id}-own-cso`}>
          <div className="m3-guided-tabs" role="tablist" aria-label="Apply or download">
            <button type="button" role="tab" aria-selected={applyTab === 'own'} className={applyTab === 'own' ? 'is-active' : ''} onClick={() => setApplyTab('own')}>Try with my CSO project</button>
            <button type="button" role="tab" aria-selected={applyTab === 'downloads'} className={applyTab === 'downloads' ? 'is-active' : ''} onClick={() => setApplyTab('downloads')}>Download tools</button>
          </div>
          {applyTab === 'own' && (
          <>
          <h2 id={`${screen.id}-own-cso`}>Apply this idea to your own CSO context</h2>
          <p>
            Use this optional practice tool to test one project idea from your own CSO. Keep it safe and general.
            Do not enter real names, complaint details, exact sensitive locations, survivor stories, political accusations, or identifiable personal information.
          </p>
          <div className="m3-rights-map-own-grid">
            {[
              ['projectIdea', 'Project idea', 'Example: Improve access to market services for low-income women vendors.'],
              ['group', 'Specific rights-holder group', 'Example: women traders, remote kebele residents, informal workers, persons with disabilities.'],
              ['affectedBenefit', 'Affected right, service, or project benefit', 'What access, service, decision, benefit, or follow-up is affected?'],
              ['priorityBarrier', 'Priority barrier', 'What barrier may block access, influence, benefit, safety, or response?'],
              ['whatBarrierMayBlock', 'What the barrier may block', 'What might not happen if this barrier is ignored?'],
              ['designResponse', 'Design response', 'What should change in the project design?'],
              ['actorQuestion', 'Question for actor/responsibility mapping', 'Who should be explored in the next actor and responsibility map?'],
            ].map(([field, label, placeholder]) => (
              <label key={field}>
                <span>{label}</span>
                <textarea
                  value={ownCsoDraft[field as keyof Screen7OwnCsoOutput]}
                  onChange={(event) => updateOwnCsoDraft(field as keyof Screen7OwnCsoOutput, event.target.value)}
                  placeholder={placeholder}
                  maxLength={260}
                />
              </label>
            ))}
          </div>
          {ownCsoError && <p className="m3-rights-map-error" role="alert">{ownCsoError}</p>}
          <button type="button" className="m3-rights-map-submit-button" onClick={generateOwnCsoMap}>
            Generate my rights-holder and barrier map
          </button>
          {ownCsoOutput && (
            <section className="m3-rights-map-own-output" aria-labelledby={`${screen.id}-own-output`}>
              <h3 id={`${screen.id}-own-output`}>My Rights-Holder and Barrier Map</h3>
              {[
                ['Project idea', ownCsoOutput.projectIdea],
                ['Specific rights-holder group', ownCsoOutput.group],
                ['Affected right, service, or project benefit', ownCsoOutput.affectedBenefit],
                ['Priority barrier', ownCsoOutput.priorityBarrier],
                ['What the barrier may block', ownCsoOutput.whatBarrierMayBlock],
                ['Design response', ownCsoOutput.designResponse],
                ['Question for actor/responsibility mapping', ownCsoOutput.actorQuestion],
              ].map(([label, value]) => (
                <p key={label}><strong>{label}:</strong> {value}</p>
              ))}
            </section>
          )}
          </>
          )}
        </section>
        )}

        {activeStage === 5 && applyTab === 'downloads' && (
        <section className="m3-rights-map-template m3-guided-stage-card" aria-labelledby={`${screen.id}-template`}>
          <div>
            <p className="m3-rights-map-kicker">Downloadable template</p>
            <h2 id={`${screen.id}-template`}>Rights-Holder and Barrier Map Template</h2>
            <p>Use this template after your context and inequality scan and policy/standards map. Keep examples safe, generalized, and non-identifying.</p>
          </div>
          <div className="m3-rights-map-template-actions">
            <button type="button" className="m3-rights-map-submit-button" onClick={() => downloadRightsHolderTemplate('docx')}>
              Download Rights-Holder and Barrier Map Template
            </button>
            <button type="button" className="m3-rights-map-submit-button" onClick={() => downloadRightsHolderTemplate('md')}>
              Download markdown copy
            </button>
          </div>
        </section>
        )}

        {activeStage === 5 && (
        <div className="m3-rights-map-actions">
          {!submittedOutput && (
            <p className="m3-rights-map-continue-note">Generate a valid draft map before saving this screen.</p>
          )}
          {formChanged && (
            <p className="m3-rights-map-continue-note">Your choices changed. Select “Update rights-holder and barrier map” before continuing.</p>
          )}
          <PrimaryButton
            disabled={!canContinue}
            onClick={() => {
              if (!submittedOutput) return;
              onComplete({
                ...submittedOutput,
                rightsHolderBarrierMap: submittedOutput,
                rightsHoldersAndBarriers: submittedOutput,
                module3: {
                  screen7: submittedOutput,
                },
                screen7: submittedOutput,
              });
            }}
          >
            {screen.continueLabel}
          </PrimaryButton>
        </div>
        )}
      </article>
    </main>
  );
}

function ResponsibilityMapScreen({
  screen,
  state,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  state: LearningState;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const barrierOptions = getScreen8BarrierOptions(state);
  const [selectedBarrierIds, setSelectedBarrierIds] = useState<Screen8BarrierId[]>([]);
  const [mappings, setMappings] = useState<Record<string, Screen8BarrierMapping>>({});
  const [customActorLabel, setCustomActorLabel] = useState('');
  const [customActorCategory, setCustomActorCategory] = useState<ActorCategory>('service_or_local_implementation');
  const [customActors, setCustomActors] = useState<Screen8ActorOption[]>([]);
  const [optionalReflection, setOptionalReflection] = useState('');
  const [ownCsoDraft, setOwnCsoDraft] = useState<Screen8OwnCsoOutput>({
    projectIssueOrBarrier: '',
    rightsHolderGroupAffected: '',
    primaryDutyBearer: '',
    serviceOrSectorActor: '',
    communityOrInfluenceActor: '',
    realisticCsoRole: '',
    capacityGap: '',
    safeEngagementQuestion: '',
  });
  const [ownCsoOutput, setOwnCsoOutput] = useState<Screen8OwnCsoOutput | null>(null);
  const [ownCsoError, setOwnCsoError] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen8Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [showHeroImage, setShowHeroImage] = useState(true);
  const [activeStage, setActiveStage] = useState(1);
  const [applyTab, setApplyTab] = useState<'own' | 'downloads'>('own');
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const taskId = `${screen.id}-task`;
  const customValidation = validateGeneralActorLabel(customActorLabel);
  const allActors = getAllScreen8Actors(customActors);
  const hasUnsafeLabel = Boolean(customActorLabel.trim() && !customValidation.isValid);
  const feedbackDraft = deriveScreen8Feedback(selectedBarrierIds, mappings, hasUnsafeLabel);
  const hasSelectedBarrier = selectedBarrierIds.length > 0;
  const canSubmit =
    hasSelectedBarrier &&
    feedbackDraft.hasPublicResponsibility &&
    feedbackDraft.hasCsoRole &&
    feedbackDraft.hasCapacityGapHint &&
    !feedbackDraft.overloadWarning &&
    !hasUnsafeLabel;
  const currentSignature = JSON.stringify({
    selectedBarrierIds,
    mappings: selectedBarrierIds.map((barrierId) => [barrierId, getScreen8Mapping(mappings, barrierId)]),
    customActors,
    optionalReflection,
    ownCsoOutput,
  });
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const canContinue = Boolean(submittedOutput && !formChanged && submittedOutput.hasPublicResponsibility);
  const submitHelper =
    selectedBarrierIds.length === 0
      ? 'Please select at least one priority barrier. Responsibility mapping starts from a real barrier, not a general actor list.'
      : submittedOutput && !submittedOutput.hasPublicResponsibility
        ? submittedOutput.overloadWarning
          ? 'The CSO role is visible, but public responsibility is still missing.'
          : 'Add at least one actor with public responsibility before continuing.'
        : formChanged
          ? 'Update your responsibility map before continuing.'
          : submittedOutput
            ? 'Your responsibility map is ready to save.'
            : feedbackDraft.overloadWarning
              ? 'This map gives too much responsibility to the CSO. Add the actor who has responsibility for the service, decision, information, or feedback process.'
              : !feedbackDraft.hasPublicResponsibility
                ? 'Your map does not yet show a duty-bearer or responsible public/service actor. Add the actor connected to the service, decision, information, or feedback process.'
                : !feedbackDraft.hasCsoRole
                  ? 'Add at least one realistic CSO role.'
                  : !feedbackDraft.hasCapacityGapHint
                    ? 'Good start, but the map needs a capacity gap.'
                    : 'Generate a draft responsibility map from your selections.';
  const selectedCountLabel =
    selectedBarrierIds.length === 1 ? '1 barrier selected' : `${selectedBarrierIds.length} barriers selected`;

  const toggleBarrier = (barrierId: Screen8BarrierId) => {
    setSelectedBarrierIds((current) => {
      if (current.includes(barrierId)) return current.filter((id) => id !== barrierId);
      if (current.length >= 2) return current;
      setMappings((existing) => ({
        ...existing,
        [barrierId]: existing[barrierId] || createEmptyScreen8Mapping(),
      }));
      return [...current, barrierId];
    });
  };

  const updateBarrierMapping = (
    barrierId: Screen8BarrierId,
    updater: (mapping: Screen8BarrierMapping) => Screen8BarrierMapping,
  ) => {
    setMappings((current) => ({
      ...current,
      [barrierId]: updater(getScreen8Mapping(current, barrierId)),
    }));
  };

  const toggleActor = (
    barrierId: Screen8BarrierId,
    lane: 'public' | 'service' | 'community' | 'participation' | 'voice' | 'support' | 'careful' | 'cso',
    actorId: string,
  ) => {
    const laneKey =
      lane === 'public'
        ? 'publicActorIds'
        : lane === 'service'
          ? 'serviceActorIds'
          : lane === 'community'
            ? 'communityActorIds'
            : lane === 'participation'
              ? 'participationActorIds'
              : lane === 'voice'
                ? 'voiceActorIds'
                : lane === 'support'
                  ? 'supportActorIds'
                  : lane === 'careful'
                    ? 'carefulActorIds'
                    : 'csoRoleIds';

    updateBarrierMapping(barrierId, (mapping) => {
      const currentIds = mapping[laneKey];
      const selected = currentIds.includes(actorId);
      const nextIds = selected ? currentIds.filter((id) => id !== actorId) : [...currentIds, actorId];
      const actionIdsByActor = { ...mapping.actionIdsByActor };
      if (selected) delete actionIdsByActor[actorId];

      return {
        ...mapping,
        [laneKey]: nextIds,
        actionIdsByActor,
      };
    });
  };

  const toggleAction = (barrierId: Screen8BarrierId, actorId: string, action: string) => {
    updateBarrierMapping(barrierId, (mapping) => {
      const currentActions = mapping.actionIdsByActor[actorId] || [];
      const selected = currentActions.includes(action);
      const nextActions = selected
        ? currentActions.filter((id) => id !== action)
        : currentActions.length >= 2
          ? currentActions
          : [...currentActions, action];

      return {
        ...mapping,
        actionIdsByActor: {
          ...mapping.actionIdsByActor,
          [actorId]: nextActions,
        },
      };
    });
  };

  const toggleCapacityHint = (barrierId: Screen8BarrierId, hintId: CapacityGapHintId) => {
    updateBarrierMapping(barrierId, (mapping) => ({
      ...mapping,
      capacityGapHintIds: mapping.capacityGapHintIds.includes(hintId) ? [] : [hintId],
    }));
  };

  const addCustomActor = () => {
    if (!customValidation.isValid) return;
    const actorId = `custom_actor_${customValidation.trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
    if (customActors.some((actor) => actor.id === actorId)) return;
    setCustomActors((current) => [
      ...current,
      {
        id: actorId,
        label: customValidation.trimmed,
        category: customActorCategory,
        useFor: 'general actor role added for safe practice.',
      },
    ]);
  };

  const buildSubmission = (): Screen8Submission => {
    const generatedResponsibilityRows = generateScreen8Rows(selectedBarrierIds, mappings, allActors);
    const feedback = deriveScreen8Feedback(selectedBarrierIds, mappings, hasUnsafeLabel);
    const barrierActorLinks = buildScreen8ActorLinks(selectedBarrierIds, mappings, allActors);
    const exportedActorsForScreen9 = buildExportedActorsForScreen9(selectedBarrierIds, mappings, allActors);
    const selectedActorCategories = Array.from(new Set(barrierActorLinks.flatMap((link) => link.actorSelections.map((selection) => selection.category))));

    return {
      screenId: 'M3-R08',
      submitted: true,
      mappedBarrierIds: selectedBarrierIds,
      barrierActorLinks,
      generatedResponsibilityRows,
      hasPublicResponsibility: feedback.hasPublicResponsibility,
      hasRightsHolderVoice: feedback.hasRightsHolderVoice,
      hasCsoRole: feedback.hasCsoRole,
      hasCapacityGapHint: feedback.hasCapacityGapHint,
      overloadWarning: feedback.overloadWarning,
      missingResponsibilityWarning: feedback.missingResponsibilityWarning,
      feedbackLevel: feedback.feedbackLevel,
      warnings: feedback.warnings,
      responsibilitySummary:
        'The Jiru Amba design should separate public responsibility, service and influence actors, realistic CSO roles, and capacity gaps so barriers are not treated as work for the CSO alone.',
      dutyBearerActorResponsibilityMap: {
        selectedBarriers: selectedBarrierIds.map(getBarrierLabel),
        selectedActorCategories,
        generatedRows: generatedResponsibilityRows,
        safeEngagementQuestions: generatedResponsibilityRows.map((row) => row.safeEngagementQuestion),
        nextQuestionsForScreen9: generatedResponsibilityRows.map((row) => row.nextQuestion),
      },
      exportedActorsForScreen9,
      ...(ownCsoOutput ? { ownCsoOutput } : {}),
      safetyConfirmation:
        'Safe learning output only: no real names, exact sensitive locations, complaint details, survivor stories, accusations, or identifiable personal information were requested.',
      portfolioSummary: screen8PortfolioSummary,
      ...(optionalReflection.trim() ? { optionalReflection: optionalReflection.trim().slice(0, 220) } : {}),
      carryForward: {
        snapshotField: 'dutyBearerActorResponsibilityMap',
        issue: 'The Jiru Amba barriers cannot be solved by Awra alone. A rights-based design needs to show which public or service actors should respond, which actors influence access, and what role Awra can realistically play.',
        nextUse: 'Use this map in the next screen to analyze power and influence. Ask who has authority, who has influence, who may support change, and who may resist or delay action.',
      },
    };
  };

  const submitMap = () => {
    if (!canSubmit) return;
    const submission = buildSubmission();
    setSubmittedOutput(submission);
    setSubmittedSignature(currentSignature);
    if (typeof window !== 'undefined') {
      window.setTimeout(() => outputRef.current?.focus(), 0);
    }
  };

  const updateOwnCsoDraft = (field: keyof Screen8OwnCsoOutput, value: string) => {
    setOwnCsoDraft((current) => ({ ...current, [field]: value }));
    setOwnCsoError('');
  };

  const generateOwnCsoMap = () => {
    const requiredValues = [
      ownCsoDraft.projectIssueOrBarrier,
      ownCsoDraft.rightsHolderGroupAffected,
      ownCsoDraft.primaryDutyBearer,
      ownCsoDraft.realisticCsoRole,
      ownCsoDraft.capacityGap,
    ];
    if (requiredValues.some((value) => !value.trim())) {
      setOwnCsoError('A useful responsibility map needs a barrier, a rights-holder group, a responsible actor, a realistic CSO role, and a capacity gap.');
      return;
    }
    if (Object.values(ownCsoDraft).some((value) => value.trim() && validateSafeLearningText(value))) {
      setOwnCsoError('Before saving, remove names, exact sensitive locations, complaint details, survivor stories, accusations, or identifiable personal information. Keep this as a safe learning example.');
      return;
    }
    setOwnCsoOutput({
      projectIssueOrBarrier: ownCsoDraft.projectIssueOrBarrier.trim(),
      rightsHolderGroupAffected: ownCsoDraft.rightsHolderGroupAffected.trim(),
      primaryDutyBearer: ownCsoDraft.primaryDutyBearer.trim(),
      serviceOrSectorActor: ownCsoDraft.serviceOrSectorActor.trim() || 'To be clarified safely.',
      communityOrInfluenceActor: ownCsoDraft.communityOrInfluenceActor.trim() || 'To be clarified safely.',
      realisticCsoRole: ownCsoDraft.realisticCsoRole.trim(),
      capacityGap: ownCsoDraft.capacityGap.trim(),
      safeEngagementQuestion: ownCsoDraft.safeEngagementQuestion.trim() || 'What question can your CSO ask safely and constructively?',
    });
    setOwnCsoError('');
  };

  const downloadResponsibilityTemplate = (format: 'docx' | 'md') => {
    if (typeof document === 'undefined') return;
    const link = document.createElement('a');
    if (format === 'md') {
      link.href = '/assets/resources/module-3/duty-bearer-actor-responsibility-map-template.md';
      link.download = 'duty-bearer-actor-responsibility-map-template.md';
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }
    const blob = new Blob([buildDutyBearerActorResponsibilityTemplateHtml()], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'duty-bearer-actor-responsibility-map-template.docx';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const renderActorLane = (
    barrierId: Screen8BarrierId,
    title: string,
    explanation: string,
    lane: 'public' | 'service' | 'community' | 'participation' | 'voice' | 'support' | 'careful' | 'cso',
    actors: Screen8ActorOption[],
    prompt?: string,
  ) => {
    const mapping = getScreen8Mapping(mappings, barrierId);
    const selectedIds =
      lane === 'public'
        ? mapping.publicActorIds
        : lane === 'service'
          ? mapping.serviceActorIds
          : lane === 'community'
            ? mapping.communityActorIds
            : lane === 'participation'
              ? mapping.participationActorIds
              : lane === 'voice'
                ? mapping.voiceActorIds
                : lane === 'support'
                  ? mapping.supportActorIds
                  : lane === 'careful'
                    ? mapping.carefulActorIds
                    : mapping.csoRoleIds;

    return (
      <section className="m3-responsibility-map-lane" aria-labelledby={`${screen.id}-${barrierId}-${lane}`}>
        <h4 id={`${screen.id}-${barrierId}-${lane}`}>{title}</h4>
        <p>{explanation}</p>
        {prompt && <p className="m3-responsibility-map-lane-prompt">{prompt}</p>}
        <div className="m3-responsibility-map-chip-grid" role="group" aria-labelledby={`${screen.id}-${barrierId}-${lane}`}>
          {actors.map((actor) => {
            const selected = selectedIds.includes(actor.id);
            const actionChips = screen8ActionChipsByCategory[actor.category];
            return (
              <div key={actor.id} className={`m3-responsibility-map-actor-wrap ${selected ? 'is-selected' : ''}`}>
                <button
                  type="button"
                  className={`m3-responsibility-map-chip ${selected ? 'is-selected' : ''}`}
                  aria-pressed={selected}
                  onClick={() => toggleActor(barrierId, lane, actor.id)}
                >
                  <span aria-hidden="true">{selected ? '✓' : '+'}</span>
                  <span>
                    <strong>{actor.label}</strong>
                    {actor.useFor && <small>Use for: {actor.useFor}</small>}
                    {actor.safeNote && <small>{actor.safeNote}</small>}
                    {selected && <em>Selected</em>}
                  </span>
                </button>
                {selected && (
                  <div className="m3-responsibility-map-actions-mini" aria-label={`Actions for ${actor.label}`}>
                    {actionChips.map((action) => {
                      const actionSelected = (mapping.actionIdsByActor[actor.id] || []).includes(action);
                      return (
                        <button
                          key={action}
                          type="button"
                          className={`m3-responsibility-map-action-chip ${actionSelected ? 'is-selected' : ''}`}
                          aria-pressed={actionSelected}
                          onClick={() => toggleAction(barrierId, actor.id, action)}
                        >
                          {actionSelected ? '✓ ' : ''}{action}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  const generatedRows = submittedOutput?.generatedResponsibilityRows || [];
  const feedbackLevel = submittedOutput?.feedbackLevel || feedbackDraft.feedbackLevel;
  const feedbackCopy = getScreen8FeedbackCopy(feedbackLevel);
  const insightCopy = feedbackLevel === 'strong'
    ? 'Your selections separate public responsibility, supporting roles, and CSO roles. This helps the Jiru Amba design avoid overloading the CSO while keeping accountability, participation, and follow-up visible.'
    : feedbackLevel === 'good_with_gap'
      ? 'Your selections show useful actors, but some parts of the responsibility map are still light. Strengthen the map by checking public responsibility, supporting voice, CSO role, and capacity-gap hints for each priority barrier.'
      : feedbackLevel === 'cso_overload'
        ? 'Your selections place too much weight on the CSO. A rights-based design should not make the CSO responsible for everything. Add the public or service actors who have responsibility to act, respond, or coordinate.'
        : feedbackLevel === 'missing_responsibility'
          ? 'The map is missing public responsibility. Supporting actors and CSOs can help, but the design also needs to show who has responsibility for action, response, or service improvement.'
          : 'Your map is broad. Focus on the actors whose role changes the design: who must act, who can support rights-holder voice, and what the CSO can realistically do.';
  const getSubmittedSelections = (row: Screen8GeneratedRow, categories: ActorCategory[]) =>
    (submittedOutput?.barrierActorLinks.find((link) => link.barrierId === row.barrierId)?.actorSelections || [])
      .filter((selection) => categories.includes(selection.category));
  const renderResponsibilityLaneItems = (
    selections: Screen8BarrierActorLink['actorSelections'],
    emptyText: string,
  ) => {
    if (selections.length === 0) return <p className="m3-responsibility-map-lane-empty">{emptyText}</p>;
    return (
      <ul>
        {selections.map((selection) => (
          <li key={`${selection.actorId}-${selection.category}`}>
            <strong>{selection.actorLabel}</strong>
            {selection.actionIds.length > 0 && <span>{selection.actionIds.join(', ')}</span>}
          </li>
        ))}
      </ul>
    );
  };
  const responsibilityStages: GuidedWorkspaceStage[] = [
    { id: 1, label: 'Understand', complete: activeStage > 1 },
    { id: 2, label: 'Example', complete: activeStage > 2 },
    { id: 3, label: 'Select barriers', complete: selectedBarrierIds.length > 0 || activeStage > 3 },
    { id: 4, label: 'Map roles', complete: Boolean(submittedOutput) || activeStage > 4, unlocked: selectedBarrierIds.length > 0 },
    { id: 5, label: 'Review map', complete: Boolean(submittedOutput) && activeStage > 5, unlocked: Boolean(submittedOutput) },
    { id: 6, label: 'Apply/Download', complete: canContinue, unlocked: Boolean(submittedOutput) },
  ];
  const generateResponsibilityMapFromStage = () => {
    submitMap();
    if (canSubmit) setActiveStage(5);
  };
  const selectedBarrierSummaries = selectedBarrierIds.map((barrierId) => {
    const mapping = getScreen8Mapping(mappings, barrierId);
    return {
      id: barrierId,
      label: getBarrierLabel(barrierId),
      status: getScreen8PreviewStatus(mapping),
      publicActors: mapping.publicActorIds.length,
      csoRoles: mapping.csoRoleIds.length,
      capacityHints: mapping.capacityGapHintIds.length,
    };
  });

  return (
    <main className="m3-screen m3-responsibility-map-screen" aria-labelledby={titleId}>
      <article className="m3-responsibility-map-shell">
        <header className="m3-responsibility-map-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-responsibility-map-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Duty-Bearer and Actor Responsibility Map</h1>
          <p className="m3-responsibility-map-subtitle">
            Clarify who has responsibility, who can support change, and what role the CSO should realistically play.
          </p>
          <section className="m3-responsibility-map-concept" aria-labelledby={`${screen.id}-meaning`}>
            <h2 id={`${screen.id}-meaning`}>Not every actor has the same responsibility</h2>
            <p>
              In HRBA, duty-bearers are actors with responsibility to respect, protect, or fulfil rights.
              In project design, this usually includes public institutions and service actors linked to the issue.
            </p>
            <p>
              Other actors may influence access, information, participation, trust, or follow-up. They matter,
              but they do not all have the same responsibility. A CSO can facilitate, connect, monitor, support
              capacity, use evidence, and advocate safely, but a rights-based design should not make the CSO replace public or service actors.
            </p>
            <div className="m3-responsibility-map-concept-chips">
              {[
                'Who has responsibility?',
                'Who can support access and voice?',
                'What can the CSO realistically do?',
                'What capacity gap may need attention?',
              ].map((chip) => <span key={chip}>{chip}</span>)}
            </div>
            <p className="m3-responsibility-map-key-message">
              The map should show who must respond, who can support, and what the CSO can realistically do without taking over duty-bearer responsibility.
            </p>
          </section>
        </header>

        <GuidedWorkspaceStageNav
          stages={responsibilityStages}
          activeStage={activeStage}
          onSelect={setActiveStage}
          className="m3-power-studio-stage-nav"
        />

        {activeStage <= 2 && (
        <section className="m3-responsibility-map-orientation m3-guided-stage-card" aria-label="Responsibility mapping orientation">
          <section className="m3-responsibility-map-card" aria-labelledby={`${screen.id}-purpose`}>
            <h2 id={`${screen.id}-purpose`}>Purpose of this activity</h2>
            <p>
              After identifying rights-holder groups and barriers, the next step is to ask who is connected to those barriers.
            </p>
            <p>
              A rights-based project design should not make the CSO responsible for everything. It should clarify who has public or service responsibility, who controls access, information, quality, or follow-up, who influences whether people are heard, what role the CSO can realistically play, what capacity gaps may prevent actors from responding well, and what should be checked next in the power analysis.
            </p>
            <p>
              Use this activity to create a Duty-Bearer and Actor Responsibility Map for the Jiru Amba case.
            </p>
          </section>

          <section className="m3-responsibility-map-card" aria-labelledby={`${screen.id}-method`}>
            <h2 id={`${screen.id}-method`}>Use a 7-step responsibility map</h2>
            <div className="m3-responsibility-map-method-table" role="table" aria-label="Seven-step responsibility map method">
              <div role="row" className="m3-responsibility-map-method-row m3-responsibility-map-method-row--head">
                <span role="columnheader">Step</span>
                <span role="columnheader">Question</span>
                <span role="columnheader">Example</span>
              </div>
              {[
                ['1. Start from a barrier', 'Which barrier from the previous map needs a response?', 'Feedback channels are not accessible.'],
                ['2. Identify formal responsibility', 'Which public or service actor has responsibility connected to this?', 'Woreda planning office or relevant sector office.'],
                ['3. Identify service or sector actors', 'Who controls service access, quality, information, or follow-up?', 'Water committee, health post, market committee, sector office.'],
                ['4. Identify community influence', 'Who affects trust, information flow, or who is heard?', 'Kebele structure, community representatives, informal brokers.'],
                ['5. Define the CSO role', 'What can Awra do without replacing duty-bearers?', 'Facilitate inclusive feedback, document non-sensitive barriers, support accessible communication.'],
                ['6. Identify capacity gaps', 'What may stop the actor from responding well?', 'No clear feedback process, limited accessibility awareness, weak coordination, limited budget.'],
                ['7. Carry forward', 'What should be tested next?', 'Who has influence or resistance? What root causes keep the barrier in place?'],
              ].map(([step, question, example]) => (
                <div key={step} role="row" className="m3-responsibility-map-method-row">
                  <span role="cell">{step}</span>
                  <span role="cell">{question}</span>
                  <span role="cell">{example}</span>
                </div>
              ))}
            </div>
            <p className="m3-responsibility-map-key-message">
              The goal is not to list every actor. The goal is to clarify responsibility and avoid giving the CSO the job of solving everything alone.
            </p>
          </section>

          <section className="m3-responsibility-map-card" aria-labelledby={`${screen.id}-example`}>
            <h2 id={`${screen.id}-example`}>Worked example</h2>
            <p>Here is how one barrier can become a clearer responsibility question.</p>
            <div className="m3-responsibility-map-example">
              {[
                ['Barrier from Screen 7', 'Persons with disabilities face accessibility or accommodation barriers.'],
                ['Primary duty-bearer / public responsibility', 'The woreda planning office or relevant sector office should ensure planning and service arrangements do not exclude persons with disabilities.'],
                ['Service or sector actor', 'The health post, water committee, market committee, or relevant service office may need to adjust venues, information formats, service access, or feedback channels.'],
                ['Community influence actor', 'Kebele structures, committee leaders, or community representatives may influence who receives information and who is invited into decision spaces.'],
                ['Realistic CSO role', 'Awra can facilitate accessibility checks, support inclusive consultation, document non-sensitive barriers, and help connect rights-holders with responsible actors.'],
                ['Capacity gap to check', 'Actors may lack accessibility knowledge, budget, clear standards, coordination, or a feedback procedure.'],
                ['Next question for Screen 9', 'Which actor has enough influence and capacity to respond, and who may resist or delay change?'],
              ].map(([label, text]) => (
                <div key={label}>
                  <span>{label}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <p><strong>Notice:</strong> Awra has an important role, but it is not replacing the public or service actor. The map keeps responsibility visible.</p>
          </section>

          <section className="m3-responsibility-map-safe-note" aria-labelledby={`${screen.id}-safe`}>
            <h2 id={`${screen.id}-safe`}>Safe practice</h2>
            <p>
              Use the Jiru Amba learning case. When applying this tool to your own work, use role categories and generalized examples only.
              Do not enter real names, exact sensitive locations, complaint details, survivor stories, political accusations, identifiable personal information, or names of real officials or individuals.
            </p>
            <p><strong>Safe examples:</strong> woreda planning office; relevant sector office; kebele structure; service committee; community representatives; CSO facilitator; market committee; water committee; health post staff.</p>
          </section>
        </section>
        )}

        {(activeStage === 3 || activeStage === 4) && (
        <section className="m3-responsibility-map-builder-section m3-guided-stage-card" aria-labelledby={taskId}>
          <div className="m3-responsibility-map-task-header">
            <div>
              <p className="m3-responsibility-map-kicker">Duty-Bearer and Actor Responsibility Map</p>
              <h2 id={taskId}>Practice a responsibility map using the Jiru Amba case</h2>
              <p>
                Step 1: Choose one or two priority barriers from the rights-holder map. Step 2:
                For each barrier, identify who has responsibility, who can support, what the CSO
                can realistically do, and what capacity gap may need attention.
              </p>
              <p>Select 1 to 2 priority barriers for this practice. Keep the map focused so it can guide the next power and influence analysis.</p>
            </div>
            <span className="m3-responsibility-map-count" aria-live="polite">
              {selectedBarrierIds.length === 0 ? '0 barriers selected' : selectedCountLabel}
            </span>
          </div>
          <p className="m3-responsibility-map-helper" aria-live="polite">
            {selectedBarrierIds.length === 0
              ? 'Select one or two priority barriers to begin.'
              : selectedBarrierIds.length === 1
                ? 'Good. You can map this barrier or add one more.'
                : 'Good range for this practice map.'}
          </p>

          <section className={`m3-responsibility-map-builder ${hasSelectedBarrier ? 'm3-responsibility-map-builder--active' : 'm3-responsibility-map-builder--empty'}`}>
            <section className="m3-responsibility-map-panel m3-responsibility-map-barrier-panel" aria-labelledby={`${screen.id}-barriers`}>
              <h3 id={`${screen.id}-barriers`}>Step 1: Choose priority barriers to map first.</h3>
              <p>Select barriers that most affect participation, access, benefit, safety, information, or follow-up.</p>
              <div className="m3-responsibility-map-option-grid" role="group" aria-labelledby={`${screen.id}-barriers`}>
                {barrierOptions.map((barrier) => {
                  const selected = selectedBarrierIds.includes(barrier.id);
                  const disabled = !selected && selectedBarrierIds.length >= 2;
                  return (
                    <button
                      key={barrier.id}
                      type="button"
                      className={`m3-responsibility-map-option ${selected ? 'is-selected' : ''}`}
                      aria-pressed={selected}
                      disabled={disabled}
                      onClick={() => toggleBarrier(barrier.id)}
                    >
                      <span aria-hidden="true">{selected ? '✓' : '+'}</span>
                      <span>
                        <strong>{barrier.label}</strong>
                        <small>{barrier.description}</small>
                        {barrier.sourceGroupLabels?.length ? <em>From Screen 7: {barrier.sourceGroupLabels.join(', ')}</em> : null}
                        {selected && <em>Selected barrier</em>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {activeStage === 3 ? (
              <aside className="m3-guided-live-panel" aria-labelledby={`${screen.id}-live-responsibility-select`}>
                <h2 id={`${screen.id}-live-responsibility-select`}>Responsibility map so far</h2>
                <p aria-live="polite">{selectedCountLabel}</p>
                <div className="m3-guided-chip-list" aria-label="Selected barriers">
                  {selectedBarrierSummaries.length > 0 ? selectedBarrierSummaries.map((barrier) => (
                    <span key={barrier.id} className="m3-guided-selected-chip">✓ {barrier.label}</span>
                  )) : <span className="m3-guided-muted">Select one or two priority barriers.</span>}
                </div>
                <p className="m3-guided-helper">
                  {hasSelectedBarrier ? 'Next, map responsibility roles for each selected barrier.' : submitHelper}
                </p>
                <button
                  type="button"
                  className="m3-responsibility-map-submit-button"
                  disabled={!hasSelectedBarrier}
                  onClick={() => setActiveStage(4)}
                >
                  Continue to responsibility-role mapping
                </button>
                <p className="m3-guided-safe-note">Use generalized actor roles. Do not enter names, complaints, exact locations, or identifying details.</p>
              </aside>
            ) : !hasSelectedBarrier ? (
              <section className="m3-responsibility-map-empty-hero" aria-label="Responsibility map orientation">
                {showHeroImage && (
                  <img
                    src={module3ActorAnalysisAssets.screen8Hero.src}
                    alt={module3ActorAnalysisAssets.screen8Hero.alt}
                    onError={() => setShowHeroImage(false)}
                  />
                )}
                <div className="m3-responsibility-map-empty-card">
                  <p className="m3-responsibility-map-kicker">Start with responsibility</p>
                  <h3>Start with responsibility, not only activities</h3>
                  <p>
                    A rights-based design asks who must act, who can support, and what role the
                    CSO can realistically play. Select one or two barriers from the Jiru Amba
                    case. Your draft responsibility map will appear here.
                  </p>
                  <ul>
                    <li>Public responsibility</li>
                    <li>Supporting actors</li>
                    <li>CSO role</li>
                    <li>Capacity-gap hint</li>
                  </ul>
                </div>
              </section>
            ) : (
              <>
                <section className="m3-responsibility-map-panel m3-responsibility-map-mapping-panel" aria-label="Actor mapping cards">
                  {selectedBarrierIds.map((barrierId) => {
                    const mapping = getScreen8Mapping(mappings, barrierId);
                    const customActorsForLane = customActors;
                    return (
                      <article key={barrierId} className="m3-responsibility-map-mapping-card">
                        <h3>Map responsibility for: {getBarrierLabel(barrierId)}</h3>
                        <p>For each barrier, identify public or service responsibility, influence actors, Awra’s realistic role, and one capacity gap.</p>
                        {screen8ActorCategories.map((category) => {
                          const actorsForLane =
                            category.lane === 'public'
                              ? [...screen8ActorsByLane.public, ...customActorsForLane.filter((actor) => actor.category === 'primary_public_responsibility')]
                              : category.lane === 'service'
                                ? [...screen8ActorsByLane.service, ...customActorsForLane.filter((actor) => actor.category === 'service_or_local_implementation')]
                                : category.lane === 'community'
                                  ? [...screen8CommunityInfluenceActors, ...customActorsForLane.filter((actor) => actor.category === 'community_influence_actor')]
                                  : category.lane === 'participation'
                                    ? [...screen8ParticipationActors, ...screen8ActorsByLane.voice, ...customActorsForLane.filter((actor) => actor.category === 'participation_actor' || actor.category === 'rights_holder_voice_support')]
                                    : category.lane === 'support'
                                      ? [...screen8SupportActors, ...customActorsForLane.filter((actor) => actor.category === 'support_ally_actor')]
                                      : category.lane === 'careful'
                                        ? [...screen8CarefulActors, ...customActorsForLane.filter((actor) => actor.category === 'careful_engagement_actor')]
                                        : [...screen8ActorsByLane.cso, ...customActorsForLane.filter((actor) => actor.category === 'cso_role')];
                          return renderActorLane(barrierId, category.title, `${category.meaning} Examples: ${category.examples}`, category.lane, actorsForLane, category.prompt);
                        })}
                        <section className="m3-responsibility-map-lane" aria-labelledby={`${screen.id}-${barrierId}-capacity`}>
                          <h4 id={`${screen.id}-${barrierId}-capacity`}>Capacity gap</h4>
                          <p>What may prevent the responsible actor from responding well?</p>
                          <p className="m3-responsibility-map-lane-prompt">Choose one likely capacity gap to carry forward.</p>
                          <div className="m3-responsibility-map-chip-grid">
                            {screen8CapacityGapHints.map((hint) => {
                              const selected = mapping.capacityGapHintIds.includes(hint.id);
                              return (
                                <button
                                  key={hint.id}
                                  type="button"
                                  className={`m3-responsibility-map-action-chip ${selected ? 'is-selected' : ''}`}
                                  aria-pressed={selected}
                                  onClick={() => toggleCapacityHint(barrierId, hint.id)}
                                >
                                  {selected ? '✓ ' : ''}{hint.label}
                                </button>
                              );
                            })}
                          </div>
                        </section>
                      </article>
                    );
                  })}

                  <section className="m3-responsibility-map-custom" aria-labelledby={`${screen.id}-custom-actor`}>
                    <h3 id={`${screen.id}-custom-actor`}>+ Another generalized actor role</h3>
                    <label>
                      <span>Use a general actor role only</span>
                      <input
                        value={customActorLabel}
                        onChange={(event) => setCustomActorLabel(event.target.value)}
                        placeholder="Example: local service committee"
                        aria-invalid={hasUnsafeLabel}
                        aria-describedby={`${screen.id}-custom-help`}
                      />
                    </label>
                    <label>
                      <span>Actor category</span>
                      <select
                        value={customActorCategory}
                        onChange={(event) => setCustomActorCategory(event.target.value as ActorCategory)}
                      >
                        <option value="primary_public_responsibility">Public responsibility</option>
                        <option value="service_or_local_implementation">Service or local implementation</option>
                        <option value="community_influence_actor">Community structure or influence actor</option>
                        <option value="participation_actor">Rights-holder representative or participation actor</option>
                        <option value="rights_holder_voice_support">Rights-holder voice or supporting actor</option>
                        <option value="support_ally_actor">Support or ally actor</option>
                        <option value="careful_engagement_actor">Actor to handle carefully</option>
                        <option value="cso_role">CSO role</option>
                      </select>
                    </label>
                    <p id={`${screen.id}-custom-help`}>
                      Use only a broad role. Do not enter names, complaints, exact locations,
                      or identifying details.
                    </p>
                    {hasUnsafeLabel && <p className="m3-responsibility-map-error">{customValidation.error}</p>}
                    <button type="button" className="m3-responsibility-map-submit-button" onClick={addCustomActor} disabled={!customValidation.isValid}>
                      Add generalized actor role
                    </button>
                  </section>
                </section>

                <aside className="m3-responsibility-map-panel m3-responsibility-map-preview m3-guided-live-panel" aria-labelledby={`${screen.id}-preview`}>
                  <h3 id={`${screen.id}-preview`}>Responsibility map so far</h3>
                  {selectedBarrierIds.map((barrierId) => {
                    const mapping = getScreen8Mapping(mappings, barrierId);
                    return (
                      <article key={barrierId} className="m3-responsibility-map-preview-card">
                        <h4>Barrier: {getBarrierLabel(barrierId)}</h4>
                        <p><strong>Public responsibility:</strong> {mapping.publicActorIds.length ? mapping.publicActorIds.map((id) => getActorLabel(id, allActors)).join(', ') : 'No public responsibility actor yet'}</p>
                        <p><strong>Service or influence actors:</strong> {[...mapping.serviceActorIds, ...mapping.communityActorIds, ...mapping.participationActorIds, ...mapping.voiceActorIds, ...mapping.supportActorIds, ...mapping.carefulActorIds].length ? [...mapping.serviceActorIds, ...mapping.communityActorIds, ...mapping.participationActorIds, ...mapping.voiceActorIds, ...mapping.supportActorIds, ...mapping.carefulActorIds].map((id) => getActorLabel(id, allActors)).join(', ') : 'No service or influence actor yet'}</p>
                        <p><strong>CSO role:</strong> {mapping.csoRoleIds.length ? mapping.csoRoleIds.map((id) => getActorLabel(id, allActors)).join(', ') : 'No CSO role yet'}</p>
                        <p><strong>Capacity-gap hint:</strong> {mapping.capacityGapHintIds.length ? mapping.capacityGapHintIds.map(getCapacityGapLabel).join(', ') : 'Capacity-gap hint missing'}</p>
                        <span>{getScreen8PreviewStatus(mapping)}</span>
                      </article>
                    );
                  })}
                </aside>
              </>
            )}
          </section>

          <div className="m3-responsibility-map-submit-row">
            <button type="button" className="m3-responsibility-map-submit-button" disabled={!canSubmit} onClick={generateResponsibilityMapFromStage}>
              {submittedOutput ? 'Update responsibility map' : 'Generate responsibility map'}
            </button>
            <p aria-live="polite">{submitHelper}</p>
          </div>
        </section>
        )}

        {activeStage === 5 && submittedOutput && (
          <section className="m3-responsibility-map-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Your draft Duty-Bearer and Actor Responsibility Map</h2>
            <p>
              Based on your selections, this map shows who may have responsibility, who can support change,
              what role Awra can realistically play, and what capacity gap may need attention. It is a
              learning output, not a formal legal or accountability finding.
            </p>
            <div className="m3-responsibility-map-swimlane-legend" aria-label="Responsibility swimlane legend">
              {[
                ['Public responsibility', 'public'],
                ['Service/supporting actor', 'service'],
                ['Rights-holder voice', 'voice'],
                ['CSO role', 'cso'],
                ['Capacity-gap hint', 'capacity'],
                ['Next question', 'question'],
              ].map(([label, tone]) => (
                <span key={label} className={`m3-responsibility-map-legend-chip m3-responsibility-map-legend-chip--${tone}`}>{label}</span>
              ))}
            </div>
            <div className="m3-responsibility-map-swimlane" aria-label="Draft responsibility swimlane map">
              {generatedRows.map((row) => (
                <article key={row.barrierId} className="m3-responsibility-map-swimlane-card">
                  <section className="m3-responsibility-map-swimlane-lane m3-responsibility-map-swimlane-lane--barrier">
                    <span className="m3-responsibility-map-lane-badge">Barrier selected</span>
                    <h3>{row.barrierLabel}</h3>
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane">
                    <span className="m3-responsibility-map-lane-badge">Rights-holder group affected</span>
                    <p>{row.rightsHolderGroupAffected}</p>
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane m3-responsibility-map-swimlane-lane--public">
                    <span className="m3-responsibility-map-lane-badge">Primary duty-bearer / public responsibility</span>
                    {renderResponsibilityLaneItems(
                      getSubmittedSelections(row, ['primary_public_responsibility']),
                      screen8GeneratedDefaults[row.barrierId as Screen8BarrierId].primaryPublicResponsibility,
                    )}
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane m3-responsibility-map-swimlane-lane--service">
                    <span className="m3-responsibility-map-lane-badge">Service or sector actor</span>
                    {renderResponsibilityLaneItems(
                      getSubmittedSelections(row, ['service_or_local_implementation']),
                      screen8GeneratedDefaults[row.barrierId as Screen8BarrierId].serviceOrSectorActor,
                    )}
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane m3-responsibility-map-swimlane-lane--voice">
                    <span className="m3-responsibility-map-lane-badge">Community or influence actor</span>
                    {renderResponsibilityLaneItems(
                      getSubmittedSelections(row, ['community_influence_actor', 'participation_actor', 'rights_holder_voice_support', 'careful_engagement_actor']),
                      screen8GeneratedDefaults[row.barrierId as Screen8BarrierId].communityOrInfluenceActor,
                    )}
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane m3-responsibility-map-swimlane-lane--cso">
                    <span className="m3-responsibility-map-lane-badge">Realistic CSO role</span>
                    {renderResponsibilityLaneItems(
                      getSubmittedSelections(row, ['cso_role']),
                      screen8GeneratedDefaults[row.barrierId as Screen8BarrierId].realisticCsoRole,
                    )}
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane">
                    <span className="m3-responsibility-map-lane-badge">Support or ally actor</span>
                    {renderResponsibilityLaneItems(
                      getSubmittedSelections(row, ['support_ally_actor']),
                      screen8GeneratedDefaults[row.barrierId as Screen8BarrierId].supportOrAllyActor,
                    )}
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane m3-responsibility-map-swimlane-lane--capacity">
                    <span className="m3-responsibility-map-lane-badge">Capacity gap to check</span>
                    <p>{row.capacityGapHints.map(getCapacityGapLabel).join(', ') || screen8GeneratedDefaults[row.barrierId as Screen8BarrierId].capacityGapToCheck}</p>
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane">
                    <span className="m3-responsibility-map-lane-badge">Safe engagement question</span>
                    <p>{row.safeEngagementQuestion}</p>
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane m3-responsibility-map-swimlane-lane--question">
                    <span className="m3-responsibility-map-lane-badge">Next question for Screen 9</span>
                    <p>{row.nextQuestion}</p>
                  </section>
                </article>
              ))}
            </div>
            <section className="m3-responsibility-map-insight">
              <h3>What your selections suggest</h3>
              <p>{insightCopy}</p>
            </section>
            {submittedOutput.warnings.length > 0 && (
              <section className="m3-responsibility-map-warning-section">
                <h3>What to check next</h3>
                <div className="m3-responsibility-map-warning-grid">
                  {submittedOutput.warnings.map((warning) => (
                    <p key={warning} className="m3-responsibility-map-warning"><span aria-hidden="true">!</span>{warning}</p>
                  ))}
                </div>
              </section>
            )}
          </section>
        )}

        {activeStage === 5 && submittedOutput && (
          <section className={`m3-responsibility-map-feedback m3-responsibility-map-feedback--${submittedOutput.feedbackLevel}`} aria-live="polite">
            <h2>Feedback and warnings</h2>
            <p>{feedbackCopy}</p>
          </section>
        )}

        {activeStage === 5 && submittedOutput && (
          <section className="m3-responsibility-map-reflection">
            <h2>Optional reflection for your own CSO context</h2>
            <label>
              <span>Think about your own CSO context. For a similar issue, what type of public or service actor would usually have responsibility? Use a general role only. Do not enter names, complaints, exact locations, or sensitive details.</span>
              <textarea
                rows={3}
                maxLength={220}
                value={optionalReflection}
                onChange={(event) => setOptionalReflection(event.target.value)}
                placeholder="Example: local sector office, service committee, or public facility"
              />
            </label>
          </section>
        )}

        {activeStage === 5 && submittedOutput && (
          <section className="m3-responsibility-map-carry-forward">
            <h2>Case-study learning to carry forward</h2>
            <div className="m3-responsibility-map-carry-grid">
              <div><span>Learning from the Jiru Amba case</span><p>The Jiru Amba barriers cannot be solved by Awra alone. A rights-based design needs to show which public or service actors should respond, which actors influence access, and what role Awra can realistically play.</p></div>
              <div><span>Responsibility questions to carry forward</span><p>Carry forward your selected barriers, responsible actors, CSO role, and capacity gaps.</p></div>
              <div><span>Next use</span><p>Use this map in the next screen to analyze power and influence. Ask who has authority, who has influence, who may support change, and who may resist or delay action.</p></div>
            </div>
          </section>
        )}

        {activeStage === 5 && submittedOutput && (
          <div className="m3-guided-stage-actions">
            <button type="button" className="m3-secondary-button" onClick={() => setActiveStage(4)}>Edit responsibility roles</button>
            <button type="button" className="m3-responsibility-map-submit-button" onClick={() => setActiveStage(6)}>Go to Apply/Download</button>
          </div>
        )}

        {activeStage === 6 && (
        <section className="m3-responsibility-map-own-cso m3-guided-stage-card" aria-labelledby={`${screen.id}-own-cso`}>
          <div className="m3-guided-tabs" role="tablist" aria-label="Apply or download">
            <button type="button" role="tab" aria-selected={applyTab === 'own'} className={applyTab === 'own' ? 'is-active' : ''} onClick={() => setApplyTab('own')}>Try with my CSO context</button>
            <button type="button" role="tab" aria-selected={applyTab === 'downloads'} className={applyTab === 'downloads' ? 'is-active' : ''} onClick={() => setApplyTab('downloads')}>Download tools</button>
          </div>
          {applyTab === 'own' && (
          <>
          <h2 id={`${screen.id}-own-cso`}>Apply this idea to your own CSO context</h2>
          <p>
            Use this optional practice tool to test one barrier from your own CSO project idea. Keep it safe and general.
            Do not enter names, exact locations, complaint details, accusations, survivor stories, or identifiable personal information.
          </p>
          <div className="m3-responsibility-map-own-grid">
            {[
              ['projectIssueOrBarrier', 'Project issue or barrier', 'Example: Feedback channels are not accessible to persons with disabilities.'],
              ['rightsHolderGroupAffected', 'Rights-holder group affected', 'Example: persons with disabilities; remote kebele residents; informal workers.'],
              ['primaryDutyBearer', 'Primary duty-bearer or public responsibility', 'Which public or service actor has responsibility connected to this barrier?'],
              ['serviceOrSectorActor', 'Service or sector actor', 'Who controls service access, quality, information, or follow-up?'],
              ['communityOrInfluenceActor', 'Community or influence actor', 'Who influences trust, information flow, participation, or who is heard?'],
              ['realisticCsoRole', 'Realistic CSO role', 'What can your CSO do without replacing the responsible actor?'],
              ['capacityGap', 'Capacity gap', 'What may prevent the actor from responding well?'],
              ['safeEngagementQuestion', 'Safe engagement question', 'What question can your CSO ask safely and constructively?'],
            ].map(([field, label, placeholder]) => (
              <label key={field}>
                <span>{label}</span>
                <textarea
                  value={ownCsoDraft[field as keyof Screen8OwnCsoOutput]}
                  onChange={(event) => updateOwnCsoDraft(field as keyof Screen8OwnCsoOutput, event.target.value)}
                  placeholder={placeholder}
                  maxLength={280}
                />
              </label>
            ))}
          </div>
          {ownCsoError && <p className="m3-responsibility-map-error" role="alert">{ownCsoError}</p>}
          <button type="button" className="m3-responsibility-map-submit-button" onClick={generateOwnCsoMap}>
            Generate my responsibility map
          </button>
          {ownCsoOutput && (
            <section className="m3-responsibility-map-own-output" aria-labelledby={`${screen.id}-own-output`}>
              <h3 id={`${screen.id}-own-output`}>My Duty-Bearer and Actor Responsibility Map</h3>
              {[
                ['Project issue or barrier', ownCsoOutput.projectIssueOrBarrier],
                ['Rights-holder group affected', ownCsoOutput.rightsHolderGroupAffected],
                ['Primary duty-bearer / public responsibility', ownCsoOutput.primaryDutyBearer],
                ['Service or sector actor', ownCsoOutput.serviceOrSectorActor],
                ['Community or influence actor', ownCsoOutput.communityOrInfluenceActor],
                ['Realistic CSO role', ownCsoOutput.realisticCsoRole],
                ['Capacity gap', ownCsoOutput.capacityGap],
                ['Safe engagement question', ownCsoOutput.safeEngagementQuestion],
              ].map(([label, value]) => (
                <p key={label}><strong>{label}:</strong> {value}</p>
              ))}
            </section>
          )}
          </>
          )}
        </section>
        )}

        {activeStage === 6 && applyTab === 'downloads' && (
        <section className="m3-responsibility-map-template m3-guided-stage-card" aria-labelledby={`${screen.id}-template`}>
          <div>
            <p className="m3-responsibility-map-kicker">Downloadable template</p>
            <h2 id={`${screen.id}-template`}>Duty-Bearer and Actor Responsibility Map Template</h2>
            <p>Use this template after your rights-holder and barrier map. Keep actor examples safe, generalized, and non-identifying.</p>
          </div>
          <div className="m3-responsibility-map-template-actions">
            <button type="button" className="m3-responsibility-map-submit-button" onClick={() => downloadResponsibilityTemplate('docx')}>
              Download Duty-Bearer and Actor Responsibility Map Template
            </button>
            <button type="button" className="m3-responsibility-map-submit-button" onClick={() => downloadResponsibilityTemplate('md')}>
              Download markdown copy
            </button>
          </div>
        </section>
        )}

        {activeStage === 6 && (
        <div className="m3-responsibility-map-actions">
          {!submittedOutput && <p className="m3-responsibility-map-continue-note">Generate the responsibility map before saving this screen.</p>}
          {formChanged && <p className="m3-responsibility-map-continue-note">Your choices changed. Select “Update responsibility map” before continuing.</p>}
          {submittedOutput && !submittedOutput.hasPublicResponsibility && <p className="m3-responsibility-map-continue-note">Add public responsibility and update the map before continuing.</p>}
          <PrimaryButton
            disabled={!canContinue}
            onClick={() => {
              if (!submittedOutput) return;
              onComplete({
                ...submittedOutput,
                dutyBearerActorResponsibilityMap: submittedOutput,
                dutyBearersAndActors: submittedOutput,
                module3: { screen8: submittedOutput },
                screen8: submittedOutput,
              });
            }}
          >
            {screen.continueLabel}
          </PrimaryButton>
        </div>
        )}
      </article>
    </main>
  );
}

function PowerInfluenceMapScreen({
  screen,
  state,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  state: LearningState;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const baseActors = getScreen9ActorOptions(state);
  const [actorOptions, setActorOptions] = useState<Module3Actor[]>(baseActors);
  const [selectedActorIds, setSelectedActorIds] = useState<string[]>([]);
  const [actorRatings, setActorRatings] = useState<Record<string, Screen9ActorRating>>({});
  const [customActorLabel, setCustomActorLabel] = useState('');
  const [customActorCategory, setCustomActorCategory] = useState<ActorCategory>('service_or_local_implementation');
  const [ownCsoDraft, setOwnCsoDraft] = useState<Screen9OwnCsoDraft>(getEmptyScreen9OwnCsoDraft());
  const [ownCsoOutput, setOwnCsoOutput] = useState<Screen9OwnCsoOutput | null>(null);
  const [ownCsoError, setOwnCsoError] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen9Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [showHeroImage, setShowHeroImage] = useState(true);
  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [understandAnswer, setUnderstandAnswer] = useState('');
  const [exampleReviewed, setExampleReviewed] = useState(false);
  const [activeActorFilter, setActiveActorFilter] = useState<'public' | 'service' | 'rights' | 'community' | 'support' | 'custom' | 'all'>('public');
  const [currentActorIndex, setCurrentActorIndex] = useState(0);
  const [applyTab, setApplyTab] = useState<'own' | 'downloads'>('own');
  const [copyStatus, setCopyStatus] = useState('');
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const taskId = `${screen.id}-task`;
  const customValidation = validateGeneralActorLabel(customActorLabel);
  const hasUnsafeLabel = Boolean(customActorLabel.trim() && !customValidation.isValid);
  const selectedActors = selectedActorIds
    .map((actorId) => actorOptions.find((actor) => actor.actorId === actorId))
    .filter(Boolean) as Module3Actor[];
  const selectedRatings = selectedActorIds.flatMap((actorId) => actorRatings[actorId] ? [actorRatings[actorId]] : []);
  const completedRatings = selectedRatings.filter(isScreen9RatingComplete);
  const ratedActorCount = completedRatings.length;
  const hasRightsHolderGroup = selectedActors.some((actor) => actor.category === 'rights_holder_group');
  const hasPublicOrServiceActor = selectedActors.some((actor) => actor.category === 'primary_public_responsibility' || actor.category === 'service_or_local_implementation');
  const selectionIsManageable = selectedActorIds.length >= 3 && selectedActorIds.length <= 6;
  const actorSelectionReady = selectionIsManageable && hasRightsHolderGroup && hasPublicOrServiceActor;
  const mapReadyToGenerate = actorSelectionReady && ratedActorCount >= 3 && !hasUnsafeLabel;
  const canSubmit = mapReadyToGenerate;
  const currentSignature = JSON.stringify({
    selectedActorIds,
    actorRatings: selectedActorIds.map((actorId) => actorRatings[actorId]),
    customActorCategory,
    ownCsoOutput,
  });
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const selectedCountLabel = selectedActorIds.length === 1 ? '1 actor selected' : `${selectedActorIds.length} actors selected`;

  const toggleActor = (actor: Module3Actor) => {
    setSelectedActorIds((current) => {
      const selected = current.includes(actor.actorId);
      if (selected) {
        setActorRatings((ratings) => {
          const next = { ...ratings };
          delete next[actor.actorId];
          return next;
        });
        return current.filter((id) => id !== actor.actorId);
      }
      if (current.length >= 6) return current;
      setActorRatings((ratings) => ({
        ...ratings,
        [actor.actorId]: ratings[actor.actorId] || createEmptyActorRating(actor),
      }));
      return [...current, actor.actorId];
    });
  };

  const suggestRatingDefaults = (
    actor: Module3Actor,
    influenceLevel: Screen9InfluenceLevel | '',
    supportInterestLevel: Screen9SupportLevel | '',
  ): Pick<Screen9ActorRating, 'likelyChangeRole' | 'engagementApproach'> => {
    if (actor.category === 'rights_holder_group') {
      return {
        likelyChangeRole: 'low_power_rights_holder_group',
        engagementApproach: 'strengthen_voice_safely',
      };
    }
    if (influenceLevel === 'high' && supportInterestLevel === 'high') {
      return { likelyChangeRole: 'enabler', engagementApproach: 'work_closely' };
    }
    if (influenceLevel === 'high') {
      return { likelyChangeRole: 'gatekeeper', engagementApproach: 'engage_carefully' };
    }
    if (supportInterestLevel === 'high') {
      return { likelyChangeRole: 'support_actor', engagementApproach: 'support_capacity' };
    }
    return { likelyChangeRole: 'undecided_actor', engagementApproach: 'monitor_lightly' };
  };

  const updateRating = (actorId: string, field: keyof Screen9ActorRating, value: string) => {
    setActorRatings((current) => {
      const actor = actorOptions.find((item) => item.actorId === actorId);
      if (!actor) return current;
      const baseRating = current[actorId] || createEmptyActorRating(actor);
      const nextRating = {
        ...baseRating,
        [field]: value,
      };
      if ((field === 'influenceLevel' || field === 'supportInterestLevel') && nextRating.influenceLevel && nextRating.supportInterestLevel) {
        const suggested = suggestRatingDefaults(actor, nextRating.influenceLevel, nextRating.supportInterestLevel);
        if (!nextRating.likelyChangeRole) nextRating.likelyChangeRole = suggested.likelyChangeRole;
        if (!nextRating.engagementApproach) nextRating.engagementApproach = suggested.engagementApproach;
      }
      return {
        ...current,
        [actorId]: nextRating,
      };
    });
  };

  const addCustomActor = () => {
    if (!customValidation.isValid) return;
    const actorId = `custom_power_actor_${customValidation.trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
    if (actorOptions.some((actor) => actor.actorId === actorId)) return;
    setActorOptions((current) => [
      ...current,
      {
        actorId,
        label: customValidation.trimmed,
        category: customActorCategory,
        sourceScreen: 'custom',
        linkedBarrierIds: [],
        safeCustom: true,
      },
    ]);
    setCustomActorLabel('');
  };

  const buildSubmission = (): Screen9Submission => {
    const ratingsForOutput = completedRatings;
    const generatedPowerMapZones = generatePowerMapZones(ratingsForOutput);
    const feedback = deriveScreen9Feedback(ratingsForOutput, hasUnsafeLabel);
    const generatedActorRows = ratingsForOutput.map((rating) => ({
      actor: rating.actorLabel,
      roleFromResponsibilityMap: rating.roleFromResponsibilityMap,
      influenceLevel: getScreen9InfluenceLabel(rating.influenceLevel),
      supportInterestLevel: getScreen9SupportLabel(rating.supportInterestLevel),
      likelyRoleInChange: getScreen9RoleLabel(rating.likelyChangeRole),
      engagementApproach: getScreen9ApproachLabel(rating.engagementApproach),
      designImplication: rating.designImplication,
      questionForScreen10: rating.questionForScreen10,
    }));
    const summaryMessages = getScreen9SummaryMessages(ratingsForOutput);
    return {
      screenId: 'M3-R09',
      submitted: true,
      selectedActorIds,
      actorRatings: ratingsForOutput,
      generatedPowerMapZones,
      generatedActorRows,
      powerInfluenceMap: {
        selectedActors: ratingsForOutput.map((rating) => rating.actorLabel),
        actorRatings: ratingsForOutput,
        generatedRows: generatedActorRows,
        summaryMessages,
        safetyConfirmation: 'This learning output uses role categories and generalized examples. It is not a formal political assessment.',
      },
      detectedInsights: feedback.detectedInsights,
      feedbackLevel: feedback.feedbackLevel,
      warnings: feedback.warnings,
      powerMapSummary: summaryMessages.join(' '),
      ownCsoPracticeOutput: ownCsoOutput || undefined,
      portfolioSummary: screen9PortfolioSummary,
      carryForward: {
        snapshotField: 'powerInfluenceMap',
        issue: 'The people most affected may not be the people with the most influence. HRBA design should strengthen rights-holder voice while engaging high-influence actors safely and constructively.',
        nextUse: 'Use this map in Screen 10 to identify root causes and capacity gaps: why some groups have low influence, why some actors may delay change, and what capacities are needed for a better response.',
      },
    };
  };

  const submitMap = () => {
    if (!canSubmit) return;
    const submission = buildSubmission();
    setSubmittedOutput(submission);
    setSubmittedSignature(currentSignature);
    if (typeof window !== 'undefined') window.setTimeout(() => outputRef.current?.focus(), 0);
  };

  const updateOwnCsoDraft = (field: keyof Screen9OwnCsoDraft, value: string) => {
    setOwnCsoDraft((current) => ({ ...current, [field]: value }));
    setOwnCsoError('');
  };

  const generateOwnCsoMap = () => {
    const required = [
      ownCsoDraft.actorOrRoleCategory,
      ownCsoDraft.practicalInfluence,
      ownCsoDraft.supportOrInterest,
      ownCsoDraft.likelyRole,
      ownCsoDraft.safeEngagementApproach,
      ownCsoDraft.designImplication,
    ];
    if (required.some((value) => !String(value).trim())) {
      setOwnCsoError('A useful power and influence map needs an actor, influence level, support or interest level, likely role, engagement approach, and design implication.');
      return;
    }
    if (Object.values(ownCsoDraft).some((value) => hasUnsafePowerMapDetail(String(value)))) {
      setOwnCsoError('Before saving, remove names, exact sensitive locations, complaint details, survivor stories, accusations, confidential political details, or identifiable personal information. Keep this as a safe learning example.');
      return;
    }
    setOwnCsoOutput({ ...ownCsoDraft, generatedAt: new Date().toISOString() });
    setOwnCsoError('');
  };

  const downloadPowerTemplate = (format: 'pdf' | 'docx' | 'md' | 'blank') => {
    if (typeof window === 'undefined') return;
    const blankWorksheet = `# Blank Power and Influence Map Worksheet

## Actor or group

## Actor category

## Connected issue or barrier

## Influence level

## Support or interest

## Likely role

## Engagement approach

## Design implication

## Safety note

Use role categories and generalized group labels. Do not record names, accusations, complaint details, exact sensitive locations, or identifiable information.
`;
    const content = format === 'docx' || format === 'pdf'
      ? buildPowerInfluenceMapTemplateHtml()
      : format === 'blank'
        ? blankWorksheet
        : powerInfluenceMapTemplateMarkdown;
    const blob = new Blob([content], { type: format === 'docx' || format === 'pdf' ? 'application/msword' : 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = format === 'blank'
      ? 'power-and-influence-map-blank-worksheet.md'
      : `power-and-influence-map-template.${format === 'pdf' ? 'doc' : format}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const submittedRows = submittedOutput?.generatedActorRows || [];
  const outputZones = submittedOutput?.generatedPowerMapZones || generatePowerMapZones(completedRatings);
  const currentActor = selectedActors[Math.min(currentActorIndex, Math.max(selectedActors.length - 1, 0))];
  const currentRating = currentActor ? actorRatings[currentActor.actorId] : undefined;
  const screen9SafeNote = (
    <div className="m3-power-studio-safe-note" role="note">
      <strong>Use careful, non-accusatory actor language.</strong>
      <span>Use actor roles and generalized categories. Do not record names, accusations, complaint details, exact sensitive locations, or identifiable information.</span>
    </div>
  );
  const actorFilterDefinitions: Array<{ id: typeof activeActorFilter; label: string; categories?: ActorCategory[] }> = [
    { id: 'public', label: 'Formal public actors', categories: ['primary_public_responsibility'] },
    { id: 'service', label: 'Service and committee actors', categories: ['service_or_local_implementation'] },
    { id: 'rights', label: 'Rights-holder groups', categories: ['rights_holder_group'] },
    { id: 'community', label: 'Community influence actors', categories: ['community_influence_actor', 'rights_holder_voice_support', 'careful_engagement_actor', 'participation_actor'] },
    { id: 'support', label: 'CSO and support actors', categories: ['cso_role', 'support_ally_actor'] },
    { id: 'custom', label: 'Add another actor' },
    { id: 'all', label: 'Show all' },
  ];
  const filteredActorOptions = activeActorFilter === 'all'
    ? actorOptions
    : activeActorFilter === 'custom'
      ? []
      : actorOptions.filter((actor) => actorFilterDefinitions.find((filter) => filter.id === activeActorFilter)?.categories?.includes(actor.category));
  const understandComplete = understandAnswer === 'informal';
  const mapGenerated = Boolean(submittedOutput && !formChanged);
  const stageDefinitions: Array<{ id: 1 | 2 | 3 | 4 | 5 | 6; label: string; unlocked: boolean; complete: boolean; note?: string }> = [
    { id: 1, label: 'Understand', unlocked: true, complete: understandComplete },
    { id: 2, label: 'Example', unlocked: understandComplete, complete: exampleReviewed },
    { id: 3, label: 'Select actors', unlocked: exampleReviewed, complete: actorSelectionReady },
    { id: 4, label: 'Rate actors', unlocked: actorSelectionReady, complete: ratedActorCount >= 3 },
    { id: 5, label: 'Review map', unlocked: Boolean(submittedOutput), complete: mapGenerated },
    { id: 6, label: 'Apply/Download', unlocked: exampleReviewed, complete: mapGenerated },
  ];
  const selectionChecks = [
    { label: 'At least three actors selected', complete: selectedActorIds.length >= 3 },
    { label: 'At least one rights-holder group selected', complete: hasRightsHolderGroup },
    { label: 'At least one responsible actor selected', complete: hasPublicOrServiceActor },
    { label: 'Actor count is manageable', complete: selectedActorIds.length >= 3 && selectedActorIds.length <= 6 },
  ];
  const getActorIcon = (category: ActorCategory) => {
    if (category === 'primary_public_responsibility') return '▦';
    if (category === 'service_or_local_implementation') return '◉';
    if (category === 'rights_holder_group') return '●';
    if (category === 'cso_role' || category === 'support_ally_actor') return '◇';
    return '◎';
  };
  const getQuadrantDisplayLabel = (zoneId: Screen9PowerMapZone['zoneId']) => {
    if (zoneId === 'work_closely') return 'High influence / high support';
    if (zoneId === 'engage_carefully') return 'High influence / uncertain or low support';
    if (zoneId === 'strengthen_voice') return 'Low or medium influence / high support';
    return 'Low or medium influence / low support';
  };
  const copyMapSummary = () => {
    if (!submittedOutput) return;
    const summary = [
      'Power and Influence Map',
      ...submittedOutput.generatedActorRows.map((row) => `${row.actor}: ${row.influenceLevel}; ${row.supportInterestLevel}; ${row.likelyRoleInChange}; ${row.engagementApproach}. ${row.designImplication}`),
      `Carry forward: ${submittedOutput.carryForward.nextUse}`,
    ].join('\n');
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(summary).then(() => setCopyStatus('Map summary copied.')).catch(() => setCopyStatus('Copy was not available.'));
    } else {
      setCopyStatus('Copy was not available.');
    }
  };
  const saveAndContinue = () => {
    if (!submittedOutput || formChanged) return;
    onComplete({
      ...submittedOutput,
      module3: { screen9: submittedOutput },
      screen9: submittedOutput,
    });
  };
  const goToStage = (stageId: 1 | 2 | 3 | 4 | 5 | 6) => {
    const stage = stageDefinitions.find((item) => item.id === stageId);
    if (stage?.unlocked) setActiveStage(stageId);
  };
  const renderOptionButtons = <T extends string>(
    label: string,
    helper: string,
    value: T | '',
    options: Array<{ value: T; label: string }>,
    onSelect: (nextValue: T) => void,
  ) => (
    <fieldset className="m3-power-studio-rating-field">
      <legend>{label}</legend>
      <p>{helper}</p>
      <div className="m3-power-studio-segmented">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={value === option.value ? 'is-selected' : ''}
            aria-pressed={value === option.value}
            onClick={() => onSelect(option.value)}
          >
            <span aria-hidden="true">{value === option.value ? '●' : '○'}</span>
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
  const renderQuadrantBoard = (zones: Screen9PowerMapZone[], compact = false) => (
    <div className={compact ? 'm3-power-studio-quadrants is-compact' : 'm3-power-studio-quadrants'} aria-label="Power and influence quadrant map">
      {zones.map((zone) => (
        <section key={zone.zoneId} className={`m3-power-studio-quadrant m3-power-studio-quadrant--${zone.zoneId}`}>
          <h3>{getQuadrantDisplayLabel(zone.zoneId)}</h3>
          {!compact && <p>{powerMapZoneInterpretations[zone.zoneId]}</p>}
          <div className="m3-power-studio-quadrant-actors">
            {zone.actorIds.length > 0 ? zone.actorIds.map((actorId) => {
              const rating = (submittedOutput?.actorRatings || completedRatings).find((item) => item.actorId === actorId) || actorRatings[actorId];
              const actor = actorOptions.find((item) => item.actorId === actorId);
              if (!rating) return null;
              return (
                <article key={actorId} className="m3-power-studio-map-chip">
                  <span aria-hidden="true">{getActorIcon(actor?.category || rating.category)}</span>
                  <div>
                    <strong>{rating.actorLabel}</strong>
                    <small>{getScreen9RoleLabel(rating.likelyChangeRole)}</small>
                  </div>
                </article>
              );
            }) : <div className="m3-power-studio-empty-quadrant">No actors in this quadrant</div>}
          </div>
        </section>
      ))}
    </div>
  );
  const renderPowerPanel = () => (
    <aside className="m3-power-studio-live-panel" aria-label="Your power map so far">
      <div className="m3-power-studio-live-head">
        <span aria-hidden="true">▣</span>
        <div>
          <h2>Your power map so far</h2>
          <p>{selectedActorIds.length > 0 ? selectedCountLabel : 'Your map will appear here'}</p>
        </div>
      </div>
      <div className="m3-power-studio-live-list">
        {selectedActors.length > 0 ? selectedActors.map((actor) => (
          <button key={actor.actorId} type="button" onClick={() => toggleActor(actor)} className="m3-power-studio-live-chip">
            <span aria-hidden="true">{isScreen9RatingComplete(actorRatings[actor.actorId]) ? '✓' : '○'}</span>
            {actor.label}
            <span aria-hidden="true">×</span>
          </button>
        )) : <p>Select 3–6 actors to build a practical map.</p>}
      </div>
      {selectedActorIds.length > 0 && (
        <div className="m3-power-studio-live-status">
          <strong>{ratedActorCount} of {selectedActorIds.length} actors rated</strong>
          <span>{ratedActorCount >= 3 ? 'Enough actors are rated to generate the map.' : 'Rate influence and support/interest for at least three actors.'}</span>
        </div>
      )}
      {completedRatings.length > 0 && renderQuadrantBoard(generatePowerMapZones(completedRatings), true)}
      <button type="button" className="m3-power-studio-primary" disabled={!mapReadyToGenerate} onClick={() => { submitMap(); setActiveStage(5); }}>
        {submittedOutput ? 'Update power and influence map' : 'Generate power and influence map'}
      </button>
      {!mapReadyToGenerate && <p className="m3-power-studio-helper">Rate influence and support/interest for at least three selected actors.</p>}
      {screen9SafeNote}
    </aside>
  );

  return (
    <main className="m3-screen m3-power-map-screen" aria-labelledby={titleId}>
      <article className="m3-power-map-shell m3-power-studio-shell">
        <header className="m3-power-map-header m3-power-studio-header">
          <p className="m3-power-map-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Power and Influence Map</h1>
          <p className="m3-power-map-subtitle">See who can enable change, who may block it, and how rights-holder voice can be strengthened safely.</p>
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <nav className="m3-power-studio-stage-nav" aria-label="Power mapping stages">
            {stageDefinitions.map((stage) => (
              <button
                key={stage.id}
                type="button"
                className={`${activeStage === stage.id ? 'is-active' : ''}${stage.complete ? ' is-complete' : ''}${!stage.unlocked ? ' is-locked' : ''}`}
                disabled={!stage.unlocked}
                aria-current={activeStage === stage.id ? 'step' : undefined}
                onClick={() => goToStage(stage.id)}
              >
                <span aria-hidden="true">{stage.complete ? '✓' : stage.id}</span>
                {stage.label}
              </button>
            ))}
          </nav>
        </header>

        {activeStage === 1 && (
          <section className="m3-power-studio-stage" aria-labelledby={`${screen.id}-understand`}>
            <div className="m3-power-studio-understand-grid">
              <article className="m3-power-studio-concept-card">
                <span aria-hidden="true">⚖</span>
                <h2 id={`${screen.id}-understand`}>Responsibility and power are not the same</h2>
                <p>A project may correctly identify who has responsibility, but still miss who can influence decisions, control information, shape access, delay response, or support rights-holder voice.</p>
                <p className="m3-power-studio-key">Power analysis helps the project decide who to engage closely, who to engage carefully, whose voice to strengthen safely, and what risks to watch.</p>
              </article>
              <article className="m3-power-studio-flow-card">
                {showHeroImage && <img src={module3ActorAnalysisAssets.screen9Grid.src} alt={module3ActorAnalysisAssets.screen9Grid.alt} onError={() => setShowHeroImage(false)} />}
                {['Formal responsibility', 'Practical influence', 'Lower-influence rights-holders', 'CSO role'].map((item) => <span key={item}>{item}</span>)}
              </article>
              <article className="m3-power-studio-check-card">
                <h2>Quick check</h2>
                <p>Which statement is strongest?</p>
                {[
                  ['formal', 'The actor with formal responsibility always has the most influence.'],
                  ['informal', 'Some actors may have informal influence even without formal responsibility.'],
                  ['ignore', 'Low-influence rights-holder groups do not need engagement.'],
                ].map(([id, label]) => (
                  <button key={id} type="button" className={understandAnswer === id ? 'is-selected' : ''} onClick={() => setUnderstandAnswer(id)}>
                    <span aria-hidden="true">{understandAnswer === id ? '●' : '○'}</span>
                    {label}
                    {understandAnswer === id && id === 'informal' && <strong>Correct</strong>}
                  </button>
                ))}
                {understandComplete && <p className="m3-power-studio-ready">Good. HRBA power analysis checks formal responsibility, practical influence, support, risks, and whose voice needs to be strengthened safely.</p>}
              </article>
            </div>
            {screen9SafeNote}
            <div className="m3-power-studio-actions">
              <button type="button" className="m3-power-studio-primary" disabled={!understandComplete} onClick={() => setActiveStage(2)}>Continue to worked example</button>
              {!understandComplete && <p>Choose the strongest statement to continue.</p>}
            </div>
          </section>
        )}

        {activeStage === 2 && (
          <section className="m3-power-studio-stage" aria-labelledby={`${screen.id}-example`}>
            <h2 id={`${screen.id}-example`}>Worked example: market committee</h2>
            <div className="m3-power-studio-example-flow">
              {[
                ['Actor', 'Market committee'],
                ['Connected barrier', 'Market priorities may be shaped before women vendors and informal workers can influence decisions.'],
                ['Influence level', 'High influence'],
                ['Support or interest', 'Uncertain support'],
                ['Likely role', 'Gatekeeper or blocker'],
                ['Engagement approach', 'Engage carefully, clarify shared responsibility, use transparent consultation, and avoid relying on one actor to represent all market users.'],
                ['Design implication', 'Use more than one participation channel and check whether lower-influence market users shaped priorities before final decisions.'],
              ].map(([label, text]) => (
                <article key={label}>
                  <span>{label}</span>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <div className="m3-power-studio-actions">
              <button type="button" className="m3-power-studio-primary" onClick={() => { setExampleReviewed(true); setActiveStage(3); }}>Start actor selection</button>
            </div>
          </section>
        )}

        {activeStage === 3 && (
          <section className="m3-power-studio-stage m3-power-studio-workspace" aria-labelledby={taskId}>
            <div className="m3-power-studio-main">
              <h2 id={taskId}>Select actors connected to the Jiru Amba issue</h2>
              <p>Select 3–6 actors. Include at least one rights-holder group and at least one public, service, or committee actor.</p>
              <div className="m3-power-studio-filter-tabs" role="tablist" aria-label="Actor categories">
                {actorFilterDefinitions.map((filter) => (
                  <button key={filter.id} type="button" className={activeActorFilter === filter.id ? 'is-active' : ''} onClick={() => setActiveActorFilter(filter.id)}>
                    {filter.label}
                  </button>
                ))}
              </div>
              {activeActorFilter === 'custom' ? (
                <section className="m3-power-studio-custom">
                  <h3>Add another generalized actor role</h3>
                  <label><span>Use a general actor role only</span><input value={customActorLabel} onChange={(event) => setCustomActorLabel(event.target.value)} placeholder="Example: local service committee" aria-invalid={hasUnsafeLabel} /></label>
                  <label><span>Actor category</span><select value={customActorCategory} onChange={(event) => setCustomActorCategory(event.target.value as ActorCategory)}>{screen9CustomActorCategoryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                  {hasUnsafeLabel && <p className="m3-power-map-error">{customValidation.error}</p>}
                  <button type="button" className="m3-power-studio-primary" onClick={addCustomActor} disabled={!customValidation.isValid}>Add generalized actor role</button>
                </section>
              ) : (
                <div className="m3-power-studio-actor-grid" role="group" aria-label="Actor options">
                  {filteredActorOptions.map((actor) => {
                    const selected = selectedActorIds.includes(actor.actorId);
                    const content = getScreen9ActorContent(actor);
                    const disabled = !selected && selectedActorIds.length >= 6;
                    return (
                      <button key={actor.actorId} type="button" className={`m3-power-studio-actor-card${selected ? ' is-selected' : ''}`} aria-pressed={selected} disabled={disabled} onClick={() => toggleActor(actor)}>
                        <span aria-hidden="true" className="m3-power-studio-card-check">{selected ? '✓' : '□'}</span>
                        <strong>{actor.label}</strong>
                        <em>{actorCategoryLabels[actor.category]}</em>
                        <p>{actor.actorId === 'women_water_context' ? 'In this case, women are considered in relation to household water responsibilities and water-service decisions.' : content.clue}</p>
                        <small>{selected ? 'Selected' : disabled ? 'Six actors selected' : 'Select'}</small>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            {renderPowerPanel()}
            <div className="m3-power-studio-mobile-drawer">{renderPowerPanel()}</div>
            <div className="m3-power-studio-selection-footer">
              {selectionChecks.map((check) => <span key={check.label} className={check.complete ? 'is-complete' : ''}><strong aria-hidden="true">{check.complete ? '✓' : '○'}</strong>{check.label}</span>)}
              <button type="button" className="m3-power-studio-primary" disabled={!actorSelectionReady} onClick={() => { setCurrentActorIndex(0); setActiveStage(4); }}>Continue to rating actors</button>
            </div>
          </section>
        )}

        {activeStage === 4 && (
          <section className="m3-power-studio-stage m3-power-studio-workspace" aria-labelledby={`${screen.id}-rate`}>
            <div className="m3-power-studio-main">
              <h2 id={`${screen.id}-rate`}>Rate selected actors</h2>
              {currentActor && currentRating ? (
                <article className="m3-power-studio-rating-card">
                  <div className="m3-power-studio-rating-head">
                    <span aria-hidden="true">{getActorIcon(currentActor.category)}</span>
                    <div>
                      <p>Actor {Math.min(currentActorIndex + 1, selectedActors.length)} of {selectedActors.length}</p>
                      <h3>{currentActor.label}</h3>
                      <strong>{actorCategoryLabels[currentActor.category]}</strong>
                      <p><b>Connected issue:</b> {getScreen9ActorContent(currentActor).role}</p>
                    </div>
                  </div>
                  {renderOptionButtons('1. Influence level', 'Influence means ability to shape decisions, information, access, resources, timing, or follow-up.', currentRating.influenceLevel, screen9InfluenceOptions, (value) => updateRating(currentActor.actorId, 'influenceLevel', value))}
                  {renderOptionButtons('2. Support or interest level', 'Support means whether the actor is likely to support the project’s HRBA design direction.', currentRating.supportInterestLevel, screen9SupportOptions, (value) => updateRating(currentActor.actorId, 'supportInterestLevel', value))}
                  {renderOptionButtons('3. Likely role', 'Auto-suggested from influence and support, but you can change it.', currentRating.likelyChangeRole, likelyRoleOptions.map((option) => ({ value: option.id, label: option.label })), (value) => updateRating(currentActor.actorId, 'likelyChangeRole', value))}
                  {renderOptionButtons('4. Engagement approach', 'Choose the safest and most useful way to engage.', currentRating.engagementApproach, screen9EngagementApproachOptions, (value) => updateRating(currentActor.actorId, 'engagementApproach', value))}
                  <label className="m3-power-studio-design-field">
                    <span>5. Design implication</span>
                    <textarea value={currentRating.designImplication} onChange={(event) => updateRating(currentActor.actorId, 'designImplication', event.target.value)} />
                  </label>
                  <div className="m3-power-studio-actions">
                    <button type="button" className="m3-power-studio-secondary" disabled={currentActorIndex === 0} onClick={() => setCurrentActorIndex((value) => Math.max(0, value - 1))}>Previous actor</button>
                    <button type="button" className="m3-power-studio-secondary" onClick={() => setCurrentActorIndex((value) => Math.min(selectedActors.length - 1, value + 1))}>Save rating</button>
                    <button type="button" className="m3-power-studio-primary" onClick={() => currentActorIndex < selectedActors.length - 1 ? setCurrentActorIndex((value) => value + 1) : undefined} disabled={currentActorIndex >= selectedActors.length - 1}>Next actor</button>
                  </div>
                </article>
              ) : <p>Select actors before rating.</p>}
            </div>
            {renderPowerPanel()}
            <div className="m3-power-studio-mobile-drawer">{renderPowerPanel()}</div>
          </section>
        )}

        {activeStage === 5 && submittedOutput && (
          <section className="m3-power-studio-stage m3-power-studio-review" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <div className="m3-power-studio-review-head">
              <div>
                <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Your Draft Power and Influence Map</h2>
                <p>This map shows who may enable change, who may block or delay it, and whose voice may need to be strengthened safely.</p>
              </div>
              <strong>{formChanged ? 'Map needs update' : 'Map generated'}</strong>
            </div>
            {renderQuadrantBoard(outputZones)}
            <section className="m3-power-studio-table-wrap" aria-label="Actor engagement strategy">
              <h3>Actor engagement strategy</h3>
              <table>
                <thead><tr><th>Actor</th><th>Quadrant</th><th>Likely role</th><th>Engagement approach</th><th>Design implication</th></tr></thead>
                <tbody>
                  {submittedRows.map((row) => {
                    const rating = submittedOutput.actorRatings.find((item) => item.actorLabel === row.actor);
                    return (
                      <tr key={row.actor}>
                        <td>{row.actor}</td>
                        <td>{rating ? getQuadrantDisplayLabel(getPowerMapZone(rating)) : row.influenceLevel}</td>
                        <td>{row.likelyRoleInChange}</td>
                        <td>{row.engagementApproach}</td>
                        <td>{row.designImplication}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
            <section className="m3-power-studio-summary">
              <h3>What this power map suggests</h3>
              <ul>
                <li>Work closely with actors who can help move change.</li>
                <li>Engage high-influence uncertain actors carefully.</li>
                <li>Strengthen women’s and other rights-holder groups’ voice safely.</li>
                <li>Clarify responsibility so Awra does not replace public or service actors.</li>
                <li>Carry this map into root-cause analysis, participation pathway, risk check, and activity repair.</li>
              </ul>
              {submittedOutput.powerInfluenceMap.summaryMessages.map((message) => <p key={message}>{message}</p>)}
            </section>
            {submittedOutput.warnings.length > 0 && <section className={`m3-power-map-feedback m3-power-map-feedback--${submittedOutput.feedbackLevel}`}><h3>Feedback</h3><p>{getScreen9FeedbackCopy(submittedOutput.feedbackLevel)}</p><ul>{submittedOutput.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul></section>}
            {screen9SafeNote}
            <div className="m3-power-studio-actions">
              <button type="button" className="m3-power-studio-secondary" onClick={() => setActiveStage(4)}>Edit actor ratings</button>
              <button type="button" className="m3-power-studio-secondary" onClick={copyMapSummary}>Copy map summary</button>
              <button type="button" className="m3-power-studio-secondary" onClick={() => downloadPowerTemplate('md')}>Download template</button>
              <PrimaryButton disabled={!canContinue} onClick={saveAndContinue}>Save map and continue</PrimaryButton>
            </div>
            {copyStatus && <p className="m3-context-copy-status" aria-live="polite">{copyStatus}</p>}
            {formChanged && <p className="m3-power-studio-helper">Your choices changed. Update the power map before saving.</p>}
          </section>
        )}

        {activeStage === 6 && (
          <section className="m3-power-studio-stage m3-power-studio-apply" aria-labelledby={`${screen.id}-apply`}>
            <h2 id={`${screen.id}-apply`}>Apply and download</h2>
            <p>Use your Jiru Amba map, try a safe version with your own CSO context, or download reusable tools.</p>
            <div className="m3-power-studio-apply-tabs" role="tablist" aria-label="Apply and download tabs">
              <button type="button" className={applyTab === 'own' ? 'is-active' : ''} onClick={() => setApplyTab('own')}>Try with my CSO context</button>
              <button type="button" className={applyTab === 'downloads' ? 'is-active' : ''} onClick={() => setApplyTab('downloads')}>Download tools</button>
            </div>
            {applyTab === 'own' && (
              <div className="m3-power-studio-apply-grid">
                <section className="m3-power-studio-own-tool">
                  <h3>Try the power map with your own CSO context</h3>
                  <p>Use your roles and generalized group labels. Keep it safe and non-identifying.</p>
                  {screen9SafeNote}
                  <div className="m3-power-studio-own-grid">
                    {[
                      ['actorOrRoleCategory', '1. Actor or group', 'Example: local service committee, women, youth group, planning actor.'],
                      ['projectIssueOrBarrier', '3. Connected issue or barrier', 'What issue, barrier, or decision is this actor connected to?'],
                      ['formalResponsibility', '2. Actor category', 'Formal public actor, service actor, rights-holder group, community influence actor, CSO/support actor.'],
                      ['designImplication', '8. Design implication', 'What should change in the project design because of this actor analysis?'],
                      ['rootCauseQuestion', 'Carry-forward question', 'What should be explored next to understand this power pattern?'],
                      ['safetyNote', '9. Safety note', 'What should the team avoid recording or exposing?'],
                    ].map(([field, label, placeholder]) => (
                      <label key={field}><span>{label}</span><textarea value={String(ownCsoDraft[field as keyof Screen9OwnCsoDraft])} onChange={(event) => updateOwnCsoDraft(field as keyof Screen9OwnCsoDraft, event.target.value)} placeholder={placeholder} /></label>
                    ))}
                    <label><span>4. Influence level</span><select value={ownCsoDraft.practicalInfluence} onChange={(event) => updateOwnCsoDraft('practicalInfluence', event.target.value)}><option value="">Choose one</option>{screen9InfluenceOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                    <label><span>5. Support or interest</span><select value={ownCsoDraft.supportOrInterest} onChange={(event) => updateOwnCsoDraft('supportOrInterest', event.target.value)}><option value="">Choose one</option>{screen9SupportOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                    <label><span>6. Likely role</span><select value={ownCsoDraft.likelyRole} onChange={(event) => updateOwnCsoDraft('likelyRole', event.target.value)}><option value="">Choose one</option>{likelyRoleOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></label>
                    <label><span>7. Engagement approach</span><select value={ownCsoDraft.safeEngagementApproach} onChange={(event) => updateOwnCsoDraft('safeEngagementApproach', event.target.value)}><option value="">Choose one</option>{screen9EngagementApproachOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                  </div>
                  {ownCsoError && <p className="m3-power-map-error" role="alert">{ownCsoError}</p>}
                  <button type="button" className="m3-power-studio-primary" onClick={generateOwnCsoMap}>Generate my power and influence note</button>
                  {ownCsoOutput && (
                    <article className="m3-power-map-own-output" aria-live="polite">
                      <h3>My Power and Influence Note</h3>
                      <p><strong>Actor or group:</strong> {ownCsoOutput.actorOrRoleCategory}</p>
                      <p><strong>Influence:</strong> {getScreen9InfluenceLabel(ownCsoOutput.practicalInfluence)}</p>
                      <p><strong>Support:</strong> {getScreen9SupportLabel(ownCsoOutput.supportOrInterest)}</p>
                      <p><strong>Engagement:</strong> {getScreen9ApproachLabel(ownCsoOutput.safeEngagementApproach)}</p>
                      <p><strong>Design implication:</strong> {ownCsoOutput.designImplication}</p>
                      <p><strong>Safety note:</strong> {ownCsoOutput.safetyNote}</p>
                    </article>
                  )}
                </section>
                <aside className="m3-power-studio-download-card">
                  <h3>Jiru Amba power map saved</h3>
                  <p><strong>Own-CSO practice optional</strong></p>
                  <PrimaryButton disabled={!canContinue} onClick={saveAndContinue}>Continue to root-cause and capacity-gap map</PrimaryButton>
                  <button type="button" className="m3-power-studio-secondary" onClick={() => setActiveStage(5)}>Return to Review map</button>
                </aside>
              </div>
            )}
            {applyTab === 'downloads' && (
              <section className="m3-power-studio-download-card">
                <h3>Power and Influence Map Template Pack</h3>
                <p>Use this template to identify who can enable change, who may block or delay it, and whose voice should be strengthened safely.</p>
                <button type="button" className="m3-power-studio-secondary" onClick={() => downloadPowerTemplate('pdf')}>Download PDF template pack</button>
                <button type="button" className="m3-power-studio-secondary" onClick={() => downloadPowerTemplate('md')}>Download markdown copy</button>
                <button type="button" className="m3-power-studio-secondary" onClick={() => downloadPowerTemplate('blank')}>Download blank worksheet</button>
              </section>
            )}
          </section>
        )}
      </article>
    </main>
  );
}

function ChoiceScaffold({
  screen,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const isMulti = screen.interactionType === 'multi-select';
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const options = [
    'Use the Jiru Amba evidence to identify the design gap.',
    'Connect the gap to rights-holders, actors, barriers, or accountability.',
    'Carry the output forward into the design snapshot.',
  ];

  const toggle = (option: string) => {
    setSelected((current) => {
      if (!isMulti) return [option];
      return current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
    });
  };

  return (
    <ScreenShell
      screen={screen}
      footer={
        <PrimaryButton
          onClick={() => onComplete({ selected, submitted: true })}
          disabled={!submitted}
        >
          {submitted ? screen.continueLabel : 'Submit scaffold response to continue'}
        </PrimaryButton>
      }
    >
      <section className="m3-section">
        <h2>{screen.interactionType === 'matching' ? 'Matching scaffold' : 'Interaction scaffold'}</h2>
        <p>
          This accessible placeholder uses the intended screen pattern. Final items, answer keys,
          and coaching feedback can be added in the screen implementation phase.
        </p>
        <div className="m3-choice-grid">
          {options.map((option) => {
            const inputId = `${screen.id}-${option.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
            const checked = selected.includes(option);
            return (
              <label key={option} className={`m3-choice-card ${checked ? 'is-selected' : ''}`} htmlFor={inputId}>
                <input
                  id={inputId}
                  type={isMulti ? 'checkbox' : 'radio'}
                  name={`${screen.id}-choice`}
                  checked={checked}
                  onChange={() => toggle(option)}
                />
                <span className="m3-choice-card__mark" aria-hidden="true">{checked ? 'Selected' : ''}</span>
                <span>{option}</span>
              </label>
            );
          })}
        </div>
        <div className="m3-cta-row">
          <PrimaryButton onClick={() => setSubmitted(true)} disabled={selected.length === 0}>
            Submit response
          </PrimaryButton>
        </div>
        {submitted && (
          <div className="m3-feedback-panel is-strong" role="status">
            <h3>Scaffold feedback ready</h3>
            <p>
              This feedback area is wired and appears in reading order. Final coaching feedback
              from the specification can replace this placeholder later.
            </p>
          </div>
        )}
      </section>
      <PlaceholderNote screen={screen} />
    </ScreenShell>
  );
}

function KnowledgeCheckScaffold({
  screen,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const complete = Object.keys(answers).length === knowledgeCheckPrompts.length;

  return (
    <ScreenShell
      screen={screen}
      footer={
        <PrimaryButton
          onClick={() => onComplete({ answers, submitted: true })}
          disabled={!submitted}
        >
          {submitted ? screen.continueLabel : 'Complete the knowledge check to continue'}
        </PrimaryButton>
      }
    >
      <section className="m3-section">
        <h2>Answer the questions below</h2>
        <div className="m3-diagnostic-group-grid">
          {knowledgeCheckPrompts.map((prompt, index) => (
            <fieldset className="m3-diagnostic-group" key={prompt}>
              <legend>Question {index + 1}: {prompt}</legend>
              {['A', 'B', 'C', 'D'].map((choice) => {
                const id = `${screen.id}-q${index}-${choice}`;
                return (
                  <label key={choice} className="m3-choice-card" htmlFor={id}>
                    <input
                      id={id}
                      type="radio"
                      name={`${screen.id}-q${index}`}
                      checked={answers[prompt] === choice}
                      onChange={() => setAnswers((current) => ({ ...current, [prompt]: choice }))}
                    />
                    <span className="m3-choice-card__mark" aria-hidden="true">{choice}</span>
                    <span>Option {choice} scaffold</span>
                  </label>
                );
              })}
            </fieldset>
          ))}
        </div>
        <PrimaryButton onClick={() => setSubmitted(true)} disabled={!complete}>
          Submit knowledge check
        </PrimaryButton>
        {submitted && (
          <div className="m3-feedback-panel is-strong" role="status">
            <h3>You have completed the Module 3 knowledge check.</h3>
            <p>Final applied feedback can be inserted question by question in the next phase.</p>
          </div>
        )}
      </section>
    </ScreenShell>
  );
}

function PortfolioScaffold({
  screen,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  return (
    <ScreenShell
      screen={screen}
      footer={
        <PrimaryButton
          onClick={() => onComplete({ snapshot: values, saved: true })}
          disabled={!saved}
        >
          {saved ? screen.continueLabel : 'Save the snapshot to continue'}
        </PrimaryButton>
      }
    >
      <section className="m3-section">
        <h2>Snapshot form</h2>
        <div className="m3-note-block">
          <strong>Safe-practice reminder</strong>
          <p>Use fictional or generalized details only. Do not include sensitive real case information.</p>
        </div>
        <div className="m3-portfolio-field-grid">
          {snapshotFields.map((field, index) => {
            const id = `${screen.id}-field-${index}`;
            return (
              <label className="m3-portfolio-field-card" key={field} htmlFor={id}>
                <span>{field}</span>
                {index === 0 ? (
                  <input
                    id={id}
                    value={values[field] || ''}
                    onChange={(event) => setValues((current) => ({ ...current, [field]: event.target.value }))}
                  />
                ) : (
                  <textarea
                    id={id}
                    rows={3}
                    value={values[field] || ''}
                    onChange={(event) => setValues((current) => ({ ...current, [field]: event.target.value }))}
                  />
                )}
                <small>Keep this short and practical.</small>
              </label>
            );
          })}
        </div>
        <PrimaryButton onClick={() => setSaved(true)}>Save my snapshot</PrimaryButton>
        {saved && (
          <div className="m3-portfolio-confirmation" role="status">
            <strong>Your HRBA Project Design Improvement Snapshot has been saved.</strong>
          </div>
        )}
      </section>
    </ScreenShell>
  );
}

function GenderDisabilityDesignCheckScreen({ screen, onComplete }: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [classifications, setClassifications] = useState<Partial<Record<M3Screen11SignalId, InclusionStatus>>>({});
  const [selectedRepairs, setSelectedRepairs] = useState<M3Screen11RepairId[]>([]);
  const [ownCsoDraft, setOwnCsoDraft] = useState<Screen11OwnCsoDraft>(getEmptyScreen11OwnCsoDraft());
  const [ownCsoOutput, setOwnCsoOutput] = useState<Screen11OwnCsoOutput | null>(null);
  const [ownCsoError, setOwnCsoError] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen11Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [limitMessage, setLimitMessage] = useState('');
  const [showHero, setShowHero] = useState(true);
  const [showScale, setShowScale] = useState(true);
  const [showEmptyDashboard, setShowEmptyDashboard] = useState(true);
  const [activeStage, setActiveStage] = useState(1);
  const [applyTab, setApplyTab] = useState<'own' | 'downloads'>('own');
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const dashboardId = `${screen.id}-dashboard`;
  const classifiedCount = getScreen11ClassifiedCount(classifications);
  const allClassified = classifiedCount === screen11Signals.length;
  const canSubmit = allClassified && selectedRepairs.length >= 2;
  const currentSignature = JSON.stringify({ classifications, selectedRepairs, ownCsoOutput });
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const helperText = getScreen11HelperText(classifications, selectedRepairs, limitMessage);
  const dashboardClassifications = submittedOutput?.classifications;
  const warnings = dashboardClassifications ? getScreen11Warnings(dashboardClassifications) : [];

  const selectClassification = (signalId: M3Screen11SignalId, value: InclusionStatus) => {
    setLimitMessage('');
    setClassifications((current) => ({ ...current, [signalId]: value }));
  };

  const toggleRepair = (repairId: M3Screen11RepairId) => {
    setSelectedRepairs((current) => {
      if (current.includes(repairId)) {
        setLimitMessage('');
        return current.filter((id) => id !== repairId);
      }
      setLimitMessage('');
      return [...current, repairId];
    });
  };

  const submitDashboard = () => {
    if (!canSubmit) return;
    const submission = buildScreen11Submission(classifications, selectedRepairs, ownCsoOutput);
    setSubmittedOutput(submission);
    setSubmittedSignature(currentSignature);
    setActiveStage(4);
    if (typeof window !== 'undefined') {
      window.setTimeout(() => outputRef.current?.focus(), 0);
    }
  };

  const continueWithPayload = () => {
    if (!canContinue || !submittedOutput) return;
    onComplete({
      ...submittedOutput,
      genderDisabilityDesignCheck: submittedOutput,
      module3: { screen11: submittedOutput },
      screen11: submittedOutput,
      snapshotField: 'genderDisabilityDesignCheck',
    });
  };

  const updateOwnCsoDraft = (field: keyof Screen11OwnCsoDraft, value: string) => {
    setOwnCsoDraft((current) => ({ ...current, [field]: value }));
    setOwnCsoError('');
  };

  const generateOwnCsoCheck = () => {
    const required = [
      ownCsoDraft.genderDesignSignal || ownCsoDraft.disabilityDesignSignal,
      ownCsoDraft.markerResult,
      ownCsoDraft.designRepair,
      ownCsoDraft.responsibleActor,
      ownCsoDraft.indicatorOrFollowUpQuestion,
    ];
    if (required.some((value) => !String(value).trim())) {
      setOwnCsoError('A useful gender and disability design check needs a design signal, marker result, design repair, responsibility, and follow-up question.');
      return;
    }
    if (Object.values(ownCsoDraft).some((value) => hasUnsafeGenderDisabilityDetail(String(value)))) {
      setOwnCsoError('Before saving, remove names, exact sensitive locations, complaint details, survivor stories, medical or disability details about specific people, accusations, or identifiable personal information. Keep this as a safe learning example.');
      return;
    }
    setOwnCsoOutput({ ...ownCsoDraft, generatedAt: new Date().toISOString() });
    setOwnCsoError('');
  };

  const downloadGenderDisabilityTemplate = (format: 'docx' | 'md') => {
    if (typeof window === 'undefined') return;
    const content = format === 'docx' ? buildGenderDisabilityDesignCheckTemplateHtml() : genderDisabilityDesignCheckTemplateMarkdown;
    const blob = new Blob([content], { type: format === 'docx' ? 'application/msword' : 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gender-disability-design-check-template.${format}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };
  const genderDisabilityStages: GuidedWorkspaceStage[] = [
    { id: 1, label: 'Understand', complete: activeStage > 1 },
    { id: 2, label: 'Example', complete: activeStage > 2 },
    { id: 3, label: 'Practice', complete: Boolean(submittedOutput) || activeStage > 3 },
    { id: 4, label: 'Review dashboard', complete: Boolean(submittedOutput) && activeStage > 4, unlocked: Boolean(submittedOutput) },
    { id: 5, label: 'Apply/Download', complete: canContinue, unlocked: Boolean(submittedOutput) },
  ];
  const classifiedSignalLabels = screen11Signals
    .filter((signal) => classifications[signal.id])
    .map((signal) => `${signal.title}: ${inclusionStatusLabels[classifications[signal.id] as InclusionStatus]}`);
  const selectedRepairLabels = selectedRepairs
    .map((repairId) => screen11Repairs.find((repair) => repair.id === repairId)?.title)
    .filter(Boolean) as string[];

  return (
    <main className="m3-screen m3-s11-screen" aria-labelledby={titleId}>
      <article className="m3-s11-shell">
        <header className="m3-s11-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-s11-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Gender and Disability Design Check</h1>
          <p>Use a simple marker to see whether gender and disability are missing, only mentioned, or built into the design.</p>
        </header>

        <GuidedWorkspaceStageNav
          stages={genderDisabilityStages}
          activeStage={activeStage}
          onSelect={setActiveStage}
        />

        {activeStage <= 2 && (
        <>
        <section className="m3-s11-hero m3-guided-stage-card" aria-labelledby={`${screen.id}-scenario`}>
          <div className="m3-s11-hero-copy">
            <article className="m3-s11-scenario-card">
              <p className="m3-s11-kicker">JIRU AMBA DESIGN REVIEW</p>
              <h2 id={`${screen.id}-scenario`}>Purpose of this activity</h2>
              <p>After identifying root causes and capacity gaps, the next step is to check whether gender and disability are actually built into the project design.</p>
              <p>A project may mention women, girls, youth, or persons with disabilities and still remain weak if the design does not change.</p>
              <p className="m3-s11-bridge">This is a simple learning tool. It is not formal donor marker scoring.</p>
            </article>
            <article className="m3-s11-concept-card" aria-labelledby={`${screen.id}-meaning`}>
              <p className="m3-s11-kicker">WHAT THIS MEANS</p>
              <h2 id={`${screen.id}-meaning`}>Inclusion is stronger when it changes design</h2>
              <p>Gender and disability are not built into a project just because women, girls, youth, or persons with disabilities are named.</p>
              <p>They are built into the design when the analysis changes real decisions: who is consulted, how information is shared, when and where activities happen, what accessibility or reasonable accommodation is planned and budgeted, how feedback is handled, what risks are managed, what indicators are tracked, and who is responsible for follow-up.</p>
              <p>Gender and disability are different lenses, and they can overlap. A woman with a disability, a low-income caregiver, or a person with a disability in a remote kebele may face more than one barrier at the same time.</p>
              <p className="m3-s11-key-message">Naming a group is not enough. A strong design shows what changes because of gender and disability analysis.</p>
              <div className="m3-s11-chip-row">
                {['Missing', 'Mentioned only', 'Built into the design', 'Repair before implementation'].map((chip) => <span key={chip}>{chip}</span>)}
              </div>
            </article>
          </div>
          <figure className="m3-s11-visual">
            {showHero && <img src={module3Screen11Assets.hero.src} alt={module3Screen11Assets.hero.alt} onError={() => setShowHero(false)} />}
          </figure>
        </section>

        <section className="m3-s11-marker-levels" aria-labelledby={`${screen.id}-levels`}>
          <h2 id={`${screen.id}-levels`}>Use three marker levels</h2>
          <div className="m3-s11-marker-grid">
            {[
              ['Missing', 'Gender or disability is not visible in the design area.', 'The plan describes community participation but does not say whether women, persons with disabilities, or other groups face different barriers.'],
              ['Mentioned only', 'Gender or disability is named, counted, or invited, but the design does not change.', 'The plan says “40% of participants will be women,” but does not address timing, care responsibilities, safety, influence, feedback, or follow-up.'],
              ['Built into the design', 'Gender or disability changes how the project is planned, resourced, implemented, monitored, and followed up.', 'The plan checks participation barriers, adapts timing and information channels, includes accessibility and accommodation measures, assigns responsibility, and tracks whether different groups influenced decisions and benefited.'],
            ].map(([level, meaning, example]) => (
              <article key={level}>
                <h3>{level}</h3>
                <p>{meaning}</p>
                <p><strong>Example:</strong> {example}</p>
              </article>
            ))}
          </div>
          <p className="m3-s11-key-message">The goal is not to get a score. The goal is to identify what must be repaired before the project is implemented.</p>
        </section>

        <section className="m3-s11-method" aria-labelledby={`${screen.id}-method`}>
          <h2 id={`${screen.id}-method`}>Use a 5-step design check</h2>
          <div className="m3-s11-method-table" role="table" aria-label="Five step gender and disability design check method">
            <div className="m3-s11-method-row m3-s11-method-row--head" role="row"><span role="columnheader">Step</span><span role="columnheader">Question</span><span role="columnheader">Example</span></div>
            {[
              ['1. Find the design signal', 'Where does the plan mention gender or disability?', '“At least 40% of participants will be women.”'],
              ['2. Classify the signal', 'Is it missing, mentioned only, or built into the design?', 'Mentioned only.'],
              ['3. Identify what is weak', 'What barrier or design decision is not addressed?', 'Timing, care work, influence, safety, and follow-up are not explained.'],
              ['4. Choose a repair', 'What should change in the design?', 'Check participation barriers before meetings and adapt timing, venue, information, and feedback.'],
              ['5. Assign responsibility and follow-up', 'Who must act, and how will the project know it changed?', 'Awra facilitates; planning actor responds; indicator tracks whether women influenced priorities.'],
            ].map(([step, question, example]) => (
              <div key={step} className="m3-s11-method-row" role="row"><span role="cell">{step}</span><span role="cell">{question}</span><span role="cell">{example}</span></div>
            ))}
          </div>
          <p className="m3-s11-key-message">A gender or disability check is useful only when it leads to a practical repair.</p>
        </section>

        <section className="m3-s11-safe-note" aria-labelledby={`${screen.id}-safe`}>
          <img src={module3Screen11Assets.icons.safety} alt="" aria-hidden="true" />
          <div>
            <h2 id={`${screen.id}-safe`}>Safe practice</h2>
            <p>Use the Jiru Amba learning case. When applying this tool to your own work, use generalized and non-sensitive examples.</p>
            <p>Do not enter real names, exact sensitive locations, complaint details, survivor stories, medical or disability details about specific people, political accusations, confidential political details, names of real officials or individuals, or identifiable personal information.</p>
            <p>Use safe pattern language, such as: meeting timing may exclude people with care responsibilities; information formats may not be accessible; feedback channels may not be safe or private; targets count attendance but do not show influence; indicators do not show whether different groups benefited.</p>
          </div>
        </section>

        <section className="m3-s11-example-card" aria-labelledby={`${screen.id}-example`}>
          <div>
            <p className="m3-s11-kicker">WORKED EXAMPLE</p>
            <h2 id={`${screen.id}-example`}>Worked example</h2>
          </div>
          {showScale && <img className="m3-s11-scale-visual" src={module3Screen11Assets.scale.src} alt={module3Screen11Assets.scale.alt} onError={() => setShowScale(false)} />}
          <div className="m3-s11-example-grid">
            {[
              ['Design signal', 'The plan says at least 40% of participants will be women.'],
              ['Marker result', 'Mentioned only.'],
              ['What is weak', 'A target counts attendance but does not show whether women influence priorities, whether meeting times are safe and practical, whether care-work and livelihood barriers are addressed, or whether feedback leads to changes.'],
              ['Design repair', 'Check participation barriers before meetings. Adapt timing, location, information channels, facilitation, care-burden considerations where feasible, and feedback follow-up.'],
              ['Responsibility and follow-up', 'Awra can facilitate and document non-sensitive barriers, but planning and service actors must respond to participation and follow-up commitments.'],
              ['Better indicator or follow-up question', 'Track whether women’s inputs changed priorities, activities, budget choices, or follow-up actions, using safe and non-identifying evidence.'],
            ].map(([label, text]) => (
              <article key={label}>
                <span>{label}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="m3-s11-key-message">Notice: A target may be useful, but it does not prove influence. The design becomes stronger when the project shows what changes because of the barrier analysis.</p>
        </section>
        </>
        )}

        {activeStage === 3 && (
        <section className="m3-guided-stage-card m3-guided-practice-layout" aria-labelledby={`${screen.id}-task`}>
          <div className="m3-guided-stage-main">
        <section className="m3-s11-task">
          <div className="m3-s11-task-header">
            <div>
              <h2 id={`${screen.id}-task`}>Practice a Gender and Disability Design Check using the Jiru Amba case</h2>
              <p>Review the Jiru Amba design signals. For each signal, decide whether gender and disability are missing, mentioned only, or built into the design.</p>
              <p>Do not classify a signal as “built into the design” just because a group is named, invited, or counted. Look for whether the design changes information, timing, accessibility, safety, influence, feedback, budget, indicators, responsibility, or follow-up.</p>
            </div>
            <span className="m3-s11-count" aria-live="polite">{classifiedCount} of 6 classified</span>
          </div>
          <div className="m3-s11-signal-grid">
            {screen11Signals.map((signal) => {
              const selected = classifications[signal.id];
              return (
                <article key={signal.id} className="m3-s11-signal-card">
                  <div className="m3-s11-signal-heading">
                    <img src={signal.icon} alt="" aria-hidden="true" />
                    <div>
                      <h3>{signal.title}</h3>
                      <p>{signal.text}</p>
                    </div>
                  </div>
                  <p className="m3-s11-hint">{signal.hint}</p>
                  <div className="m3-s11-status-options" aria-label={`${signal.title} classification`}>
                    {(Object.keys(inclusionStatusLabels) as InclusionStatus[]).map((status) => (
                      <button
                        key={status}
                        type="button"
                        className={`m3-s11-status-button${selected === status ? ' m3-s11-status-button--selected' : ''}`}
                        aria-pressed={selected === status}
                        onClick={() => selectClassification(signal.id, status)}
                      >
                        <span aria-hidden="true">{selected === status ? '✓' : '○'}</span>
                        {inclusionStatusLabels[status]}
                      </button>
                    ))}
                  </div>
                  {selected && (
                    <p className="m3-s11-selection-explanation" aria-live="polite">
                      <strong>{inclusionStatusLabels[selected]}:</strong> {signal.explanation}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="m3-s11-repairs" aria-labelledby={`${screen.id}-repairs`}>
          <div className="m3-s11-task-header">
            <div>
              <h2 id={`${screen.id}-repairs`}>Choose design repairs</h2>
              <p>Select at least two repairs that would make gender and disability more meaningfully built into the Jiru Amba design. A strong selection includes at least one repair related to gendered barriers or influence and at least one repair related to disability accessibility or reasonable accommodation, or a cross-cutting repair that addresses overlapping barriers.</p>
            </div>
            <span className="m3-s11-count" aria-live="polite">{selectedRepairs.length} repairs selected</span>
          </div>
          <div className="m3-s11-repair-grid">
            {screen11Repairs.map((repair) => {
              const selected = selectedRepairs.includes(repair.id);
              return (
                <button
                  key={repair.id}
                  type="button"
                  className={`m3-s11-repair-card${selected ? ' m3-s11-repair-card--selected' : ''}`}
                  aria-pressed={selected}
                  onClick={() => toggleRepair(repair.id)}
                >
                  <img src={repair.icon} alt="" aria-hidden="true" />
                  <span>{selected ? '✓ Selected repair' : 'Select repair'}</span>
                  <strong>{repair.title}</strong>
                  <small>{repair.explanation}</small>
                </button>
              );
            })}
          </div>
          <div className="m3-s11-submit-row">
            <button type="button" className="m3-s11-submit-button" disabled={!canSubmit} onClick={submitDashboard}>
              {submittedOutput ? 'Update dashboard' : 'Generate Gender and Disability Marker Lite Dashboard'}
            </button>
            <p aria-live="polite">{helperText}</p>
          </div>
        </section>

        {!submittedOutput && (
          <aside className="m3-s11-dashboard-preview" aria-label="Gender and Disability Marker Lite Dashboard preview">
            <div>
              <h2>Gender and Disability Marker Lite Dashboard</h2>
              <p>Your dashboard will appear here after you classify all six design signals and select at least two design repairs.</p>
            </div>
            {showEmptyDashboard && <img src={module3Screen11Assets.emptyDashboard.src} alt={module3Screen11Assets.emptyDashboard.alt} onError={() => setShowEmptyDashboard(false)} />}
          </aside>
        )}
          </div>
          <aside className="m3-guided-live-panel" aria-labelledby={`${screen.id}-gender-live`}>
            <h2 id={`${screen.id}-gender-live`}>Design check so far</h2>
            <p aria-live="polite">{classifiedCount} of {screen11Signals.length} signals classified.</p>
            <div className="m3-guided-chip-list">
              {classifiedSignalLabels.length > 0 ? classifiedSignalLabels.map((label) => (
                <span key={label} className="m3-guided-selected-chip">{label}</span>
              )) : <span className="m3-guided-muted">Classify each design signal.</span>}
            </div>
            <p><strong>{selectedRepairs.length}</strong> repairs selected.</p>
            <div className="m3-guided-chip-list">
              {selectedRepairLabels.length > 0 ? selectedRepairLabels.map((label) => (
                <span key={label} className="m3-guided-selected-chip">✓ {label}</span>
              )) : <span className="m3-guided-muted">Select at least two repairs.</span>}
            </div>
            <p className="m3-guided-helper">{helperText}</p>
            <p className="m3-guided-safe-note">Use safe pattern language. Do not enter names, exact locations, medical or disability details about specific people, complaints, or identifying information.</p>
          </aside>
        </section>
        )}

        {activeStage === 4 && submittedOutput && dashboardClassifications && (
          <section className="m3-s11-dashboard" aria-live="polite" aria-labelledby={dashboardId}>
            <h2 id={dashboardId} ref={outputRef} tabIndex={-1}>Your Gender and Disability Marker Lite Dashboard</h2>
            <p>Based on your classifications, this dashboard shows where gender and disability are missing, only mentioned, or built into the Jiru Amba design. Use it to identify repairs that should be carried into participation, accountability, risk, activities, indicators, and follow-up. This is a learning output, not formal donor marker scoring.</p>
            <div className="m3-s11-dashboard-summary">
              {[
                ['Gender design status', submittedOutput.genderDesignStatus, getScreen11StatusDescription('gender', submittedOutput.genderDesignStatus)],
                ['Disability design status', submittedOutput.disabilityDesignStatus, getScreen11StatusDescription('disability', submittedOutput.disabilityDesignStatus)],
              ].map(([title, status, description]) => (
                <article key={title} className="m3-s11-status-card">
                  <span>{title}</span>
                  <h3>{getScreen11StatusLabel(status as Screen11GenderStatus | Screen11DisabilityStatus)}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <section aria-labelledby={`${screen.id}-review`}>
              <h3 id={`${screen.id}-review`}>Marker Lite summary</h3>
              <div className="m3-s11-signal-output-grid">
                {submittedOutput.markerLiteDashboard.rows.map((row) => {
                  return (
                    <article key={row.signalId}>
                      <h4>{row.designArea}</h4>
                      <dl>
                        <div><dt>Design area</dt><dd>{row.designArea}</dd></div>
                        <div><dt>Current design signal</dt><dd>{row.currentDesignSignal}</dd></div>
                        <div><dt>Marker result</dt><dd>{inclusionStatusLabels[row.markerResult]}</dd></div>
                        <div><dt>What is weak or strong</dt><dd>{row.whatIsWeakOrStrong}</dd></div>
                        <div><dt>Design repair</dt><dd>{row.designRepair}</dd></div>
                        <div><dt>Responsibility / follow-up</dt><dd>{row.responsibilityFollowUp}</dd></div>
                        <div><dt>Carry-forward use</dt><dd>{row.carryForwardUse}</dd></div>
                      </dl>
                    </article>
                  );
                })}
              </div>
            </section>
            <section aria-labelledby={`${screen.id}-selected-repairs`}>
              <h3 id={`${screen.id}-selected-repairs`}>Design repairs to carry forward</h3>
              <div className="m3-s11-selected-repair-grid">
                {submittedOutput.markerLiteDashboard.selectedRepairRows.map((repair) => (
                  <article key={repair.repairSelected}>
                    <h4>{repair.repairSelected}</h4>
                    <p><strong>Why it matters:</strong> {repair.whyItMatters}</p>
                    <p><strong>Where to use it next:</strong> {repair.whereToUseItNext}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="m3-s11-carry-forward" aria-labelledby={`${screen.id}-dashboard-suggests`}>
              <h3 id={`${screen.id}-dashboard-suggests`}>What your dashboard suggests</h3>
              <p>{submittedOutput.markerLiteDashboard.dashboardInterpretation}</p>
            </section>
            <section className="m3-s11-carry-forward" aria-labelledby={`${screen.id}-carry-question`}>
              <h3 id={`${screen.id}-carry-question`}>Carry this into Screen 12</h3>
              <p>{submittedOutput.carryForwardQuestion}</p>
            </section>
          </section>
        )}

        {activeStage === 4 && submittedOutput && (
          <>
            <section className="m3-s11-feedback" aria-labelledby={`${screen.id}-feedback`}>
              <h2 id={`${screen.id}-feedback`}>Feedback and interpretation</h2>
              <h3>{screen11FeedbackText[submittedOutput.primaryFeedbackState].title}</h3>
              <p>{screen11FeedbackText[submittedOutput.primaryFeedbackState].text}</p>
              {warnings.length > 0 && (
                <div className="m3-s11-warning-list">
                  <h3>What to check next</h3>
                  <ul>
                    {warnings.map((warning) => (
                      <li key={warning.id}>
                        <span aria-hidden="true">!</span>
                        <div>
                          <strong>{warning.title}</strong>
                          <p>{warning.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section className="m3-s11-save-confirmation" aria-labelledby={`${screen.id}-save`}>
              <h2 id={`${screen.id}-save`}>Case-study learning to carry forward</h2>
              <div className="m3-s11-save-grid">
                <article>
                  <span>Learning from the Jiru Amba case</span>
                  <p>Jiru Amba should not only mention women or persons with disabilities. The design should show how gender and disability analysis changes participation, accessibility, feedback, activities, budget, indicators, responsibility, and follow-up.</p>
                </article>
                <article>
                  <span>Repairs to carry forward</span>
                  <p>Carry forward your selected repairs, especially those related to participation barriers, women’s influence, accessibility and reasonable accommodation, safe feedback, responsibility, and indicators.</p>
                </article>
                <article>
                  <span>Next use</span>
                  <p>Use these repairs in the next screen to strengthen the participation and accountability pathway. Later, use them in risk, activity repair, intervention logic, indicators, and the final project design snapshot.</p>
                </article>
              </div>
            </section>
          </>
        )}

        {activeStage === 4 && submittedOutput && (
          <div className="m3-guided-stage-actions">
            <button type="button" className="m3-secondary-button" onClick={() => setActiveStage(3)}>Edit classifications</button>
            <button type="button" className="m3-s11-submit-button" onClick={() => setActiveStage(5)}>Go to Apply/Download</button>
          </div>
        )}

        {activeStage === 5 && (
        <section className="m3-s11-own-cso m3-guided-stage-card" aria-labelledby={`${screen.id}-own-cso`}>
          <div className="m3-guided-tabs" role="tablist" aria-label="Apply or download">
            <button type="button" role="tab" aria-selected={applyTab === 'own'} className={applyTab === 'own' ? 'is-active' : ''} onClick={() => setApplyTab('own')}>Try with my CSO project</button>
            <button type="button" role="tab" aria-selected={applyTab === 'downloads'} className={applyTab === 'downloads' ? 'is-active' : ''} onClick={() => setApplyTab('downloads')}>Download tools</button>
          </div>
          {applyTab === 'own' && (
          <>
          <h2 id={`${screen.id}-own-cso`}>Apply this idea to your own CSO project idea</h2>
          <p>Use this optional practice tool to check one project idea from your own CSO. Keep it safe and general. Do not enter names, exact locations, complaints, survivor stories, disability or medical details about specific people, accusations, or identifiable personal information.</p>
          <div className="m3-s11-own-grid">
            {[
              ['projectIssueOrActivity', 'Project issue or activity', 'Example: Community consultation for market-service improvement.'],
              ['genderDesignSignal', 'Gender-related design signal', 'Where does the design mention women, girls, men, boys, gender roles, care responsibilities, safety, participation, livelihood, or influence?'],
              ['disabilityDesignSignal', 'Disability-related design signal', 'Where does the design mention persons with disabilities, accessibility, accommodation, information formats, transport, service access, or feedback?'],
              ['weakOrStrong', 'What is weak or strong?', 'What barrier or design decision is not yet addressed?'],
              ['designRepair', 'Design repair', 'What should change in the project design?'],
              ['responsibleActor', 'Who is responsible?', 'Who should budget, provide, monitor, respond, facilitate, or follow up?'],
              ['indicatorOrFollowUpQuestion', 'Indicator or follow-up question', 'How will the project know whether the repair worked?'],
              ['safeEvidenceToCheck', 'Safe evidence to check', 'What safe, non-identifying evidence can help verify this?'],
            ].map(([field, label, placeholder]) => (
              <label key={field}><span>{label}</span><textarea value={String(ownCsoDraft[field as keyof Screen11OwnCsoDraft])} onChange={(event) => updateOwnCsoDraft(field as keyof Screen11OwnCsoDraft, event.target.value)} placeholder={placeholder} /></label>
            ))}
            <label><span>Marker result</span><select value={ownCsoDraft.markerResult} onChange={(event) => updateOwnCsoDraft('markerResult', event.target.value)}><option value="">Choose one</option>{(Object.keys(inclusionStatusLabels) as InclusionStatus[]).map((status) => <option key={status} value={status}>{inclusionStatusLabels[status]}</option>)}</select></label>
          </div>
          {ownCsoError && <p className="m3-s11-error" role="alert">{ownCsoError}</p>}
          <button type="button" className="m3-s11-submit-button" onClick={generateOwnCsoCheck}>Generate my gender and disability design check</button>
          {ownCsoOutput && (
            <article className="m3-s11-own-output" aria-live="polite">
              <h3>My Gender and Disability Design Check</h3>
              {[
                ['Project issue or activity', ownCsoOutput.projectIssueOrActivity],
                ['Gender-related design signal', ownCsoOutput.genderDesignSignal],
                ['Disability-related design signal', ownCsoOutput.disabilityDesignSignal],
                ['Marker result', ownCsoOutput.markerResult ? inclusionStatusLabels[ownCsoOutput.markerResult] : 'Not selected'],
                ['What is weak or strong', ownCsoOutput.weakOrStrong],
                ['Design repair', ownCsoOutput.designRepair],
                ['Who is responsible', ownCsoOutput.responsibleActor],
                ['Indicator or follow-up question', ownCsoOutput.indicatorOrFollowUpQuestion],
                ['Safe evidence to check', ownCsoOutput.safeEvidenceToCheck],
              ].map(([label, value]) => <div key={label}><span>{label}</span><p>{value}</p></div>)}
            </article>
          )}
          </>
          )}
        </section>
        )}

        {activeStage === 5 && applyTab === 'downloads' && (
        <section className="m3-s11-template-download m3-guided-stage-card" aria-labelledby={`${screen.id}-template`}>
          <div>
            <h2 id={`${screen.id}-template`}>Gender and Disability Design Check Template</h2>
            <p>Download a reusable template for checking whether gender and disability are missing, only mentioned, or built into project design decisions.</p>
          </div>
          <div className="m3-s11-template-actions">
            <button type="button" className="m3-s11-submit-button" onClick={() => downloadGenderDisabilityTemplate('docx')}>Download Gender and Disability Design Check Template</button>
            <button type="button" className="m3-s11-submit-button" onClick={() => downloadGenderDisabilityTemplate('md')}>Download markdown copy</button>
          </div>
        </section>
        )}

        {activeStage === 5 && (
        <div className="m3-s11-actions">
          <PrimaryButton onClick={continueWithPayload} disabled={!canContinue}>
            {screen.continueLabel}
          </PrimaryButton>
          {submittedOutput && formChanged && <p aria-live="polite">Update dashboard before continuing.</p>}
        </div>
        )}
      </article>
    </main>
  );
}

function ParticipationAccountabilityPathwayScreen({ screen, onComplete }: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [selection, setSelection] = useState<Screen12PathwaySelection>({
    group: '',
    gap: '',
    decision: '',
    supports: [],
    responseChannel: '',
    responsibleActor: '',
    designAdjustment: '',
    customGroup: '',
  });
  const [ownCsoDraft, setOwnCsoDraft] = useState<Screen12OwnCsoDraft>(getEmptyScreen12OwnCsoDraft());
  const [ownCsoOutput, setOwnCsoOutput] = useState<Screen12OwnCsoOutput | null>(null);
  const [ownCsoError, setOwnCsoError] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen12Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [limitMessage, setLimitMessage] = useState('');
  const [showHero, setShowHero] = useState(true);
  const [showLoop, setShowLoop] = useState(true);
  const [activeStage, setActiveStage] = useState(1);
  const [applyTab, setApplyTab] = useState<'own' | 'downloads'>('own');
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const currentSignature = getScreen12RequiredSignature(selection, ownCsoOutput);
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const isValid = isScreen12Valid(selection);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const helperText = getScreen12HelperText(selection, Boolean(submittedOutput), formChanged, limitMessage);
  const setSingleSelection = (field: 'group' | 'gap' | 'decision' | 'responseChannel' | 'responsibleActor' | 'designAdjustment', value: string) => {
    setLimitMessage('');
    setSelection((current) => ({
      ...current,
      [field]: value,
      ...(field === 'group' && value !== 'Another generalized group' ? { customGroup: '' } : {}),
    }));
  };
  const toggleSupport = (value: string, limit: number) => {
    setSelection((current) => {
      const values = current.supports;
      if (values.includes(value)) {
        setLimitMessage('');
        return { ...current, supports: values.filter((item) => item !== value) };
      }
      if (values.length >= limit) {
        setLimitMessage('Select up to three support actions so the pathway stays practical.');
        return current;
      }
      setLimitMessage('');
      return { ...current, supports: [...values, value] };
    });
  };
  const submitPathway = () => {
    if (!isValid) return;
    const output = buildScreen12Submission(selection, ownCsoOutput);
    setLimitMessage('');
    setSubmittedOutput(output);
    setSubmittedSignature(currentSignature);
    setActiveStage(4);
    if (typeof window !== 'undefined') window.setTimeout(() => outputRef.current?.focus(), 0);
  };
  const updateOwnCsoDraft = (field: keyof Screen12OwnCsoDraft, value: string) => {
    setOwnCsoDraft((current) => ({ ...current, [field]: value }));
    setOwnCsoError('');
  };
  const generateOwnCsoPathway = () => {
    const required = [
      ownCsoDraft.rightsHolderGroup,
      ownCsoDraft.decisionToInfluence,
      ownCsoDraft.accessSupport,
      ownCsoDraft.influenceMethod,
      ownCsoDraft.responseChannel,
      ownCsoDraft.responsibleActor,
      ownCsoDraft.followUpMethod,
      ownCsoDraft.designAdjustment,
    ];
    if (required.some((value) => !value.trim())) {
      setOwnCsoError('A useful pathway needs a rights-holder group, decision point, access support, influence method, response channel, responsible actor, follow-up method, and design adjustment.');
      return;
    }
    if (Object.values(ownCsoDraft).some((value) => hasUnsafeLearningDetail(value))) {
      setOwnCsoError('Before saving, remove names, exact sensitive locations, complaint details, survivor stories, disability or medical details about specific people, accusations, or identifiable personal information. Keep this as a safe learning example.');
      return;
    }
    setOwnCsoOutput({ ...ownCsoDraft, generatedAt: new Date().toISOString() });
    setOwnCsoError('');
  };
  const downloadParticipationTemplate = (format: 'docx' | 'md') => {
    if (typeof window === 'undefined') return;
    const content = format === 'docx' ? buildParticipationAccountabilityPathwayTemplateHtml() : participationAccountabilityPathwayTemplateMarkdown;
    const blob = new Blob([content], { type: format === 'docx' ? 'application/msword;charset=utf-8' : 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `participation-accountability-pathway-template.${format}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };
  const pathway = submittedOutput?.participationAccountabilityPathway;
  const participationStages: GuidedWorkspaceStage[] = [
    { id: 1, label: 'Understand', complete: activeStage > 1 },
    { id: 2, label: 'Example', complete: activeStage > 2 },
    { id: 3, label: 'Build pathway', complete: Boolean(submittedOutput) || activeStage > 3 },
    { id: 4, label: 'Review pathway', complete: Boolean(submittedOutput) && activeStage > 4, unlocked: Boolean(submittedOutput) },
    { id: 5, label: 'Apply/Download', complete: canContinue, unlocked: Boolean(submittedOutput) },
  ];
  const pathwayProgressItems = [
    ['Group', selection.group === 'Another generalized group' ? selection.customGroup || selection.group : selection.group],
    ['Gap', selection.gap],
    ['Decision', selection.decision],
    ['Supports', selection.supports.join('; ')],
    ['Response', selection.responseChannel],
    ['Actor', selection.responsibleActor],
    ['Adjustment', selection.designAdjustment],
  ];
  const optionButton = (value: string, selected: boolean, onClick: () => void, support?: string) => (
    <button
      key={value}
      type="button"
      className={`m3-participation-option${selected ? ' is-selected' : ''}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      <span aria-hidden="true">{selected ? '✓' : '○'}</span>
      <span><strong>{value}</strong>{support && <small>{support}</small>}{selected && <em>Selected</em>}</span>
    </button>
  );

  return (
    <main className="m3-screen m3-participation-screen" aria-labelledby={titleId}>
      <article className="m3-participation-shell">
        <header className="m3-participation-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-participation-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Participation and Accountability Pathway</h1>
          <p className="m3-participation-subtitle">Design how rights-holders access information, influence decisions, receive response, and see what changed.</p>
        </header>

        <GuidedWorkspaceStageNav
          stages={participationStages}
          activeStage={activeStage}
          onSelect={setActiveStage}
        />

        {activeStage <= 2 && (
        <>
        <section className="m3-participation-hero m3-guided-stage-card" aria-labelledby={`${screen.id}-meaning`}>
          <div className="m3-participation-hero-copy">
            <section className="m3-participation-card">
              <h2 id={`${screen.id}-meaning`}>What this means</h2>
              <p>In HRBA project design, participation is not only inviting people to a meeting. Accountability is not only collecting feedback. A stronger design shows who can influence decisions, what support they need to participate, who responds, and how people know what changed.</p>
            </section>
            <div className="m3-participation-chip-row" aria-label="Participation and accountability summary">
              {['Voice', 'Influence', 'Response', 'Follow-up', 'Safe participation'].map((chip) => <span key={chip}>{chip}</span>)}
            </div>
          </div>
          <figure className="m3-participation-visual">
            {showHero && <img src={screen12Assets.hero.src} alt={screen12Assets.hero.alt} onError={() => setShowHero(false)} />}
          </figure>
        </section>

        <section className="m3-participation-grid-two">
          <article className="m3-participation-card">
            <h2>The purpose of this section</h2>
            <p>After checking gender and disability design, the next step is to design a clear participation and accountability pathway. Use this activity to decide which group needs stronger participation, which decision they should influence, what support makes participation realistic, who responds, and how people will know what changed.</p>
            <p>This screen prepares you for the next step: checking risks and do-no-harm issues before repairing the project design.</p>
          </article>
          <article className="m3-participation-card">
            <h2>Jiru Amba case reminder</h2>
            <p>The Jiru Amba Futures Plan invited different groups to consultation meetings. But earlier analysis showed that some groups may have been present without real influence. Women vendors, youth, persons with disabilities, Women, and people from remote kebeles may need different channels, timing, information, or support to participate meaningfully.</p>
            <p>Context note: Women are considered here in the context of household water responsibilities and water-service decisions.</p>
            <p className="m3-participation-note">This screen asks: what pathway would make participation more than attendance?</p>
          </article>
        </section>

        <section className="m3-participation-card" aria-labelledby={`${screen.id}-concept`}>
          <h2 id={`${screen.id}-concept`}>Participation and accountability belong together</h2>
          <p>Participation is not only attendance. It means people can access information, shape decisions, and influence priorities before decisions are finalized.</p>
          <p>Accountability is not only collecting feedback. It means someone receives concerns safely, responds, explains what changed or why something did not change, and follows up with the people affected.</p>
          <div className="m3-participation-concept-grid">
            {[
              ['Access', 'People receive information early enough and in a form they can use.'],
              ['Influence', 'People can shape the decision, not only attend a meeting.'],
              ['Response', 'Someone answers feedback, concerns, or questions safely.'],
              ['Follow-up', 'People know what changed, what did not change, why, and what happens next.'],
            ].map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
          </div>
          <p className="m3-participation-key-message">A feedback box, public meeting, or invitation is not enough. HRBA participation becomes meaningful when rights-holders influence decisions and receive response.</p>
        </section>

        <section className="m3-participation-card" aria-labelledby={`${screen.id}-method`}>
          <h2 id={`${screen.id}-method`}>Use a 6-step participation and accountability pathway</h2>
          <div className="m3-participation-method-table" role="table" aria-label="Six-step participation and accountability pathway method">
            <div className="m3-participation-method-row m3-participation-method-row--head" role="row">
              <span role="columnheader">Step</span><span role="columnheader">Question</span><span role="columnheader">Example</span>
            </div>
            {[
              ['1. Choose a specific group', 'Whose participation or accountability is weak?', 'Women vendors affected by market changes.'],
              ['2. Choose the decision point', 'Which decision should this group influence?', 'Which market improvements are prioritized.'],
              ['3. Plan access support', 'What makes participation realistic?', 'Clear information before meetings, market-accessible timing, safe pre-consultation.'],
              ['4. Plan influence', 'How will the group shape the decision?', 'Their priorities are discussed before ranking and shown in the final plan.'],
              ['5. Plan response', 'Who responds, and through what safe channel?', 'Market office or planning team responds through CSO-facilitated follow-up and a public summary.'],
              ['6. Plan follow-up and adjustment', 'How will people know what changed?', 'A simple update explains what changed, what did not, why, and next steps.'],
            ].map(([step, question, example]) => (
              <div key={step} className="m3-participation-method-row" role="row">
                <span role="cell">{step}</span><span role="cell">{question}</span><span role="cell">{example}</span>
              </div>
            ))}
          </div>
          <p className="m3-participation-note">A useful pathway does not stop at consultation. It shows the decision, the support needed to influence it, the response channel, the responsible actor, the follow-up method, and the design adjustment.</p>
        </section>

        <section className="m3-participation-grid-two">
          <article className="m3-participation-card">
            <h2>Worked example</h2>
            <div className="m3-participation-example-grid">
              {[
                ['Decision', 'Which market improvements should be prioritized.'],
                ['Rights-holder group', 'Women vendors affected by market changes.'],
                ['Access support', 'Share clear information before decisions, use market-accessible timing, and check care-work or livelihood constraints.'],
                ['Influence method', 'Ask women vendors to rank market barriers before activity choices are finalized, and show how their priorities changed the plan.'],
                ['Response channel', 'Provide a safe group follow-up and a simple public summary that does not identify individuals.'],
                ['Responsible actor', 'Market office or planning actor responds to market-service decisions. Awra facilitates safely and documents non-sensitive patterns.'],
                ['Follow-up', 'Women vendors receive an update on what changed, what could not change, why, and what the next step is.'],
                ['Design implication', 'Participation should happen before ranking and budgeting, not only after the plan is drafted.'],
              ].map(([label, value]) => <div key={label}><span>{label}</span><p>{value}</p></div>)}
            </div>
            <p className="m3-participation-note">Notice: The example does not only say “women vendors attended.” It shows the decision they influence, the support they need, who responds, and how they know what changed.</p>
          </article>
          <article className="m3-participation-safe-note">
            <h2>Safe practice</h2>
            <p>Use the Jiru Amba learning case. When applying this tool to your own work, use generalized and non-sensitive examples.</p>
            <p>Do not enter real names, exact sensitive locations, complaint details, survivor stories, disability or medical details about specific people, political accusations, confidential political details, names of real officials or individuals, or identifiable personal information.</p>
            <p className="m3-participation-mini-path">{m3SafeDesignMessage}</p>
          </article>
        </section>
        </>
        )}

        {activeStage === 3 && (
        <section className="m3-participation-builder m3-guided-stage-card" aria-labelledby={`${screen.id}-activity`}>
          <div className="m3-guided-practice-layout">
            <div className="m3-guided-stage-main">
          <div className="m3-participation-builder-copy">
            <h2 id={`${screen.id}-activity`}>Practice a participation and accountability pathway using the Jiru Amba case</h2>
            <p>Build one pathway for the Jiru Amba case. Select a group, a gap, a decision, access and influence support, response channel, responsible actor, and design adjustment. Do not choose only a meeting or feedback channel.</p>
          </div>
          <div className="m3-participation-builder-layout">
            <section className="m3-participation-step-list">
              <fieldset className="m3-participation-fieldset">
                <legend>1. Who needs a stronger participation pathway?</legend>
                <div className="m3-participation-options">{screen12Groups.map((value) => optionButton(value, selection.group === value, () => setSingleSelection('group', value), screen12GroupClues[value]))}</div>
                {selection.group === 'Another generalized group' && (
                  <label className="m3-participation-custom-group">
                    <span>Use a generalized group label only</span>
                    <input
                      value={selection.customGroup || ''}
                      onChange={(event) => setSelection((current) => ({ ...current, customGroup: event.target.value }))}
                      placeholder="Example: caregivers, people with limited literacy, low-income households, or people using informal transport."
                      aria-invalid={Boolean(selection.customGroup && hasUnsafeLearningDetail(selection.customGroup))}
                    />
                  </label>
                )}
              </fieldset>
              <fieldset className="m3-participation-fieldset">
                <legend>2. What participation or accountability gap should this pathway address?</legend>
                <div className="m3-participation-options">{screen12Gaps.map((value) => optionButton(value, selection.gap === value, () => setSingleSelection('gap', value)))}</div>
              </fieldset>
              <fieldset className="m3-participation-fieldset">
                <legend>3. Which decision should this group influence?</legend>
                <div className="m3-participation-options">{screen12Decisions.map((value) => optionButton(value, selection.decision === value, () => setSingleSelection('decision', value)))}</div>
              </fieldset>
              <fieldset className="m3-participation-fieldset">
                <legend>4. What support makes participation realistic?</legend>
                <div className="m3-participation-options">{screen12Supports.map((value) => optionButton(value, selection.supports.includes(value), () => toggleSupport(value, 3)))}</div>
              </fieldset>
              <fieldset className="m3-participation-fieldset">
                <legend>5. How will people receive a response?</legend>
                <div className="m3-participation-options">{screen12ResponseChannels.map((value) => optionButton(value, selection.responseChannel === value, () => setSingleSelection('responseChannel', value)))}</div>
              </fieldset>
              <fieldset className="m3-participation-fieldset">
                <legend>6. Who must respond?</legend>
                <div className="m3-participation-options">{screen12ResponsibleActors.map((value) => optionButton(value, selection.responsibleActor === value, () => setSingleSelection('responsibleActor', value)))}</div>
              </fieldset>
              <fieldset className="m3-participation-fieldset">
                <legend>7. What design adjustment should carry forward?</legend>
                <div className="m3-participation-options">{screen12DesignAdjustments.map((value) => optionButton(value, selection.designAdjustment === value, () => setSingleSelection('designAdjustment', value)))}</div>
              </fieldset>
            </section>
            <aside className="m3-participation-preview">
              <h3>Draft pathway preview</h3>
              <p>Your draft pathway will appear after selections. Use this space to check the sequence from voice to influence, response, and follow-up.</p>
              {showLoop && <img src={screen12Assets.loop} alt="Support visual showing voice, influence, response, and follow-up as an accountability loop." onError={() => setShowLoop(false)} />}
              <ol>
                {['Rights-holder group', 'Participation or accountability gap', 'Decision to influence', 'Access support', 'Influence method', 'Response channel', 'Responsible actor', 'Follow-up method', 'Design adjustment'].map((item) => <li key={item}>{item}</li>)}
              </ol>
            </aside>
          </div>
          <div className="m3-participation-submit-row">
            <button type="button" className="m3-participation-submit" disabled={!isValid} onClick={submitPathway}>{submittedOutput ? 'Update pathway' : 'Generate participation and accountability pathway'}</button>
            <p aria-live="polite">{helperText}</p>
          </div>
            </div>
            <aside className="m3-guided-live-panel" aria-labelledby={`${screen.id}-pathway-live`}>
              <h2 id={`${screen.id}-pathway-live`}>Pathway so far</h2>
              <div className="m3-guided-chip-list">
                {pathwayProgressItems.map(([label, value]) => (
                  <span key={label} className={value ? 'm3-guided-selected-chip' : 'm3-guided-muted'}>
                    {label}: {value || 'Not selected'}
                  </span>
                ))}
              </div>
              <p className="m3-guided-helper">{helperText}</p>
              <p className="m3-guided-safe-note">Keep participation and accountability language generalized. Do not enter names, exact locations, complaints, medical or disability details, accusations, or identifiable information.</p>
            </aside>
          </div>
        </section>
        )}

        {activeStage === 4 && submittedOutput && pathway && (
          <section className="m3-participation-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Your Participation and Accountability Pathway</h2>
            <p>Based on your selections, this pathway shows how a specific rights-holder group can access information, influence a decision, receive response, and see what changed. It is a learning output, not a complaint record or formal accountability finding.</p>
            <div className="m3-participation-badge-row">{pathway.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
            <div className="m3-participation-pathway">
              {[
                ['Rights-holder group', pathway.rightsHolderGroup],
                ['Participation or accountability gap', pathway.participationAccountabilityGap],
                ['Decision they should influence', pathway.decisionToInfluence],
                ['Access support', pathway.accessSupport.join('; ')],
                ['Influence method', pathway.influenceMethod],
                ['Response channel', pathway.responseChannel],
                ['Responsible actor', pathway.responsibleActor],
                ['Follow-up method', pathway.followUpMethod],
                ['Design adjustment', pathway.designAdjustment],
                ['Safety note', pathway.safetyNote],
                ['Indicator or evidence question', pathway.indicatorEvidenceQuestion],
              ].map(([label, value], index) => <article key={label}><span>{index + 1}</span><h3>{label}</h3><p>{value}</p></article>)}
            </div>
            <section className="m3-participation-suggests" aria-labelledby={`${screen.id}-suggests`}>
              <h3 id={`${screen.id}-suggests`}>What your pathway suggests</h3>
              <p>{submittedOutput.feedbackMessages[0]}</p>
            </section>
          </section>
        )}

        {activeStage === 4 && submittedOutput && (
          <>
            <section className="m3-participation-feedback">
              <h2>What this pathway shows</h2>
              <ul>{submittedOutput.feedbackMessages.map((message) => <li key={message}>{message}</li>)}</ul>
            </section>
            <section className="m3-participation-carry-forward">
              <h2>Case-study learning to carry forward</h2>
              <div className="m3-participation-carry-grid">
                <article><h3>Learning from the Jiru Amba case</h3><p>Participation is not only attendance, and accountability is not only collecting feedback. Jiru Amba needs a pathway that shows how specific rights-holder groups access information, influence decisions, receive response, and see what changed.</p></article>
                <article><h3>Pathway to carry forward</h3><p>Carry forward your selected rights-holder group, decision point, access support, influence method, response channel, responsible actor, follow-up method, and design adjustment.</p></article>
                <article><h3>Next use</h3><p>Use this pathway in the next screen to check risk and do-no-harm issues. Later, use it to repair the activity package, intervention logic, indicators, and final project design snapshot.</p></article>
              </div>
            </section>
          </>
        )}

        {activeStage === 4 && submittedOutput && (
          <div className="m3-guided-stage-actions">
            <button type="button" className="m3-secondary-button" onClick={() => setActiveStage(3)}>Edit pathway</button>
            <button type="button" className="m3-participation-submit" onClick={() => setActiveStage(5)}>Go to Apply/Download</button>
          </div>
        )}

        {activeStage === 5 && (
        <section className="m3-participation-own-cso m3-guided-stage-card" aria-labelledby={`${screen.id}-own-cso`}>
          <div className="m3-guided-tabs" role="tablist" aria-label="Apply or download">
            <button type="button" role="tab" aria-selected={applyTab === 'own'} className={applyTab === 'own' ? 'is-active' : ''} onClick={() => setApplyTab('own')}>Try with my CSO context</button>
            <button type="button" role="tab" aria-selected={applyTab === 'downloads'} className={applyTab === 'downloads' ? 'is-active' : ''} onClick={() => setApplyTab('downloads')}>Download tools</button>
          </div>
          {applyTab === 'own' && (
          <>
          <h2 id={`${screen.id}-own-cso`}>Apply this idea to your own CSO context</h2>
          <p>Use this optional practice tool to design one participation and accountability pathway from your own CSO project idea. Keep it safe and general. Do not enter names, complaints, exact locations, disability or medical details, survivor stories, accusations, confidential political details, or identifiable personal information.</p>
          <div className="m3-participation-own-grid">
            {[
              ['projectIssueOrDecision', 'Project issue or decision', 'Example: Which market-service improvement priorities should be selected?'],
              ['rightsHolderGroup', 'Rights-holder group', 'Example: women vendors, persons with disabilities, youth livelihood group, remote residents.'],
              ['participationAccountabilityGap', 'Participation or accountability gap', 'What makes participation or accountability weak?'],
              ['decisionToInfluence', 'Decision they should influence', 'Which project, service, budget, activity, or follow-up decision should this group influence?'],
              ['accessSupport', 'Access support', 'What support makes participation realistic?'],
              ['influenceMethod', 'Influence method', 'How will the group shape the decision before it is finalized?'],
              ['responseChannel', 'Response channel', 'How will feedback, concerns, or questions receive a response?'],
              ['responsibleActor', 'Responsible actor', 'Who should respond? Include the public, service, committee, sector, or project actor connected to the decision.'],
              ['followUpMethod', 'Follow-up method', 'How will people know what changed, what did not, why, and next steps?'],
              ['designAdjustment', 'Design adjustment', 'What should change in the project design?'],
              ['safeEvidenceOrIndicator', 'Safe evidence or indicator', 'What safe, non-identifying evidence can show whether this pathway worked?'],
            ].map(([field, label, placeholder]) => (
              <label key={field}><span>{label}</span><textarea value={ownCsoDraft[field as keyof Screen12OwnCsoDraft]} onChange={(event) => updateOwnCsoDraft(field as keyof Screen12OwnCsoDraft, event.target.value)} placeholder={placeholder} /></label>
            ))}
          </div>
          {ownCsoError && <p className="m3-participation-error" role="alert">{ownCsoError}</p>}
          <button type="button" className="m3-participation-submit" onClick={generateOwnCsoPathway}>Generate my participation and accountability pathway</button>
          {ownCsoOutput && (
            <article className="m3-participation-own-output" aria-live="polite">
              <h3>My Participation and Accountability Pathway</h3>
              {[
                ['Project issue or decision', ownCsoOutput.projectIssueOrDecision],
                ['Rights-holder group', ownCsoOutput.rightsHolderGroup],
                ['Participation or accountability gap', ownCsoOutput.participationAccountabilityGap],
                ['Decision they should influence', ownCsoOutput.decisionToInfluence],
                ['Access support', ownCsoOutput.accessSupport],
                ['Influence method', ownCsoOutput.influenceMethod],
                ['Response channel', ownCsoOutput.responseChannel],
                ['Responsible actor', ownCsoOutput.responsibleActor],
                ['Follow-up method', ownCsoOutput.followUpMethod],
                ['Design adjustment', ownCsoOutput.designAdjustment],
                ['Safe evidence or indicator', ownCsoOutput.safeEvidenceOrIndicator],
              ].map(([label, value]) => <div key={label}><span>{label}</span><p>{value}</p></div>)}
            </article>
          )}
          </>
          )}
        </section>
        )}

        {activeStage === 5 && applyTab === 'downloads' && (
        <section className="m3-participation-template m3-guided-stage-card" aria-labelledby={`${screen.id}-template`}>
          <div>
            <h2 id={`${screen.id}-template`}>Participation and Accountability Pathway Template</h2>
            <p>Download a reusable template for designing how rights-holders access information, influence decisions, receive response, and see what changed.</p>
          </div>
          <div className="m3-participation-template-actions">
            <button type="button" className="m3-participation-submit" onClick={() => downloadParticipationTemplate('docx')}>Download Participation and Accountability Pathway Template</button>
            <button type="button" className="m3-participation-submit" onClick={() => downloadParticipationTemplate('md')}>Download markdown copy</button>
          </div>
        </section>
        )}

        {activeStage === 5 && (
        <div className="m3-participation-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ participationAccountabilityPathway: submittedOutput.participationAccountabilityPathway, screen12: submittedOutput })}>
            {screen.continueLabel}
          </PrimaryButton>
          {submittedOutput && formChanged && <p aria-live="polite">Update pathway before continuing.</p>}
        </div>
        )}
      </article>
    </main>
  );
}

function RiskDoNoHarmBoardScreen({ screen, onComplete }: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [selection, setSelection] = useState<Screen13RiskBoardSelection>(getEmptyRiskBoardSelection());
  const [ownCsoDraft, setOwnCsoDraft] = useState<Screen13OwnCsoDraft>(getEmptyScreen13OwnCsoDraft());
  const [ownCsoOutput, setOwnCsoOutput] = useState<Screen13OwnCsoOutput | null>(null);
  const [ownCsoError, setOwnCsoError] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen13Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [showHero, setShowHero] = useState(true);
  const [showEmpty, setShowEmpty] = useState(true);
  const [activeStage, setActiveStage] = useState(1);
  const [applyTab, setApplyTab] = useState<'own' | 'downloads'>('own');
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const currentSignature = getScreen13RequiredSignature(selection, ownCsoOutput);
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const validationMessages = getScreen13ValidationMessages(selection);
  const isValid = validationMessages.length === 0;
  const canContinue = Boolean(submittedOutput && !formChanged);
  const helperText = getScreen13HelperText(selection, Boolean(submittedOutput), formChanged);
  const setSingleSelection = (field: keyof Screen13RiskBoardSelection, value: string) => {
    setSelection((current) => ({ ...current, [field]: value }));
  };
  const toggleListSelection = (field: 'riskCategories' | 'affectedGroups' | 'mitigationActions', value: string) => {
    setSelection((current) => {
      const selected = current[field].includes(value);
      return {
        ...current,
        [field]: selected ? current[field].filter((item) => item !== value) : [...current[field], value],
      };
    });
  };
  const submitBoard = () => {
    if (!isValid) return;
    const output = buildScreen13Submission(selection, ownCsoOutput);
    setSubmittedOutput(output);
    setSubmittedSignature(currentSignature);
    setActiveStage(4);
    if (typeof window !== 'undefined') window.setTimeout(() => outputRef.current?.focus(), 0);
  };
  const updateOwnCsoDraft = (field: keyof Screen13OwnCsoDraft, value: string) => {
    setOwnCsoDraft((current) => ({ ...current, [field]: value }));
    setOwnCsoError('');
  };
  const generateOwnCsoBoard = () => {
    const required = [
      ownCsoDraft.riskSituation,
      ownCsoDraft.affectedGroup,
      ownCsoDraft.impactLevel,
      ownCsoDraft.mitigationAction,
      ownCsoDraft.responsibleActor,
      ownCsoDraft.watchSign,
      ownCsoDraft.designAdjustment,
    ];
    if (required.some((value) => !value.trim())) {
      setOwnCsoError('A useful risk and do-no-harm board needs a risk situation, affected group, impact level, mitigation action, responsible actor, watch sign, and design adjustment.');
      return;
    }
    if (Object.values(ownCsoDraft).some((value) => hasUnsafeLearningDetail(value))) {
      setOwnCsoError('Before saving, remove names, exact sensitive locations, complaint details, survivor stories, disability or medical details about specific people, accusations, or identifiable personal information. Keep this as a safe learning example.');
      return;
    }
    setOwnCsoOutput({ ...ownCsoDraft, generatedAt: new Date().toISOString() });
    setOwnCsoError('');
  };
  const downloadRiskTemplate = (format: 'docx' | 'md') => {
    if (typeof window === 'undefined') return;
    const content = format === 'docx' ? buildRiskDoNoHarmTemplateHtml() : riskDoNoHarmTemplateMarkdown;
    const blob = new Blob([content], { type: format === 'docx' ? 'application/msword' : 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `risk-do-no-harm-board-template.${format}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };
  const riskOption = (value: string, selected: boolean, onClick: () => void, support?: string) => (
    <button key={value} type="button" className={`m3-risk-option ${selected ? 'is-selected' : ''}`} aria-pressed={selected} onClick={onClick}>
      <span aria-hidden="true">{selected ? '✓' : '+'}</span>
      <span><strong>{value}</strong>{support && <small>{support}</small>}{selected && <em>Selected</em>}</span>
    </button>
  );
  const generatedBoard = submittedOutput?.riskDoNoHarmBoard.generatedBoard;
  const riskStages: GuidedWorkspaceStage[] = [
    { id: 1, label: 'Understand', complete: activeStage > 1 },
    { id: 2, label: 'Example', complete: activeStage > 2 },
    { id: 3, label: 'Build board', complete: Boolean(submittedOutput) || activeStage > 3 },
    { id: 4, label: 'Review board', complete: Boolean(submittedOutput) && activeStage > 4, unlocked: Boolean(submittedOutput) },
    { id: 5, label: 'Apply/Download', complete: canContinue, unlocked: Boolean(submittedOutput) },
  ];
  const riskProgressItems = [
    ['Risk situation', selection.riskSituation],
    ['Risk categories', selection.riskCategories.join('; ')],
    ['Affected groups', selection.affectedGroups.join('; ')],
    ['Impact', getRiskStatusLabel(selection.impactLevel)],
    ['Mitigations', selection.mitigationActions.join('; ')],
    ['Responsible actor', selection.responsibleActor],
    ['Watch sign', selection.watchSign],
    ['Design adjustment', selection.designAdjustment],
  ];

  return (
    <main className="m3-screen m3-risk-screen" aria-labelledby={titleId}>
      <article className="m3-risk-shell">
        <header className="m3-risk-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-risk-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Risk and Do-No-Harm in Project Design</h1>
          <p className="m3-risk-subtitle">Check what could exclude, expose, silence, or harm people before the project is implemented.</p>
        </header>

        <GuidedWorkspaceStageNav
          stages={riskStages}
          activeStage={activeStage}
          onSelect={setActiveStage}
          className="m3-power-studio-stage-nav"
        />

        {activeStage <= 2 && (
        <>
        <section className="m3-risk-hero m3-guided-stage-card">
          <div className="m3-risk-card">
            <h2>Purpose of this activity</h2>
            <p>After designing a participation and accountability pathway, the next step is to check whether the project could unintentionally create harm.</p>
            <p>A normal risk table often asks what might stop the project from delivering activities. A rights-based risk check asks who could be excluded, exposed, silenced, blamed, ignored, or given unrealistic expectations because of the design.</p>
            <div className="m3-risk-chip-row">{['What could go wrong', 'Who may be affected', 'Mitigation', 'Responsible actor', 'Watch sign', 'Design adjustment'].map((chip) => <span key={chip}>{chip}</span>)}</div>
          </div>
          <figure className="m3-risk-visual">{showHero && <img src={screen13Assets.hero.src} alt={screen13Assets.hero.alt} onError={() => setShowHero(false)} />}</figure>
        </section>

        <section className="m3-risk-card">
          <h2>Do-no-harm means changing the design before harm happens</h2>
          <p>Risk analysis is not only a proposal paragraph or a compliance table. In HRBA project design, risk analysis asks whether the design could unintentionally exclude people, expose sensitive information, silence concerns, strengthen gatekeeping, create backlash, overload the CSO, or promise changes that the project cannot deliver.</p>
          <div className="m3-risk-concept-grid m3-risk-concept-grid--two">
            <article><h3>Delivery risk asks</h3><p>“What might stop the project from completing activities?”</p></article>
            <article><h3>Rights-holder risk asks</h3><p>“Who could be excluded, exposed, silenced, blamed, ignored, or given unrealistic expectations because of the design?”</p></article>
          </div>
          <p className="m3-risk-note">A risk check is useful only if it leads to safer participation, safer evidence use, clearer responsibility, stronger feedback, realistic activities, and better implementation watch-points.</p>
        </section>

        <section className="m3-risk-card">
          <h2>Use a 7-step risk and do-no-harm board</h2>
          <div className="m3-risk-method-table" role="table" aria-label="Seven step risk and do-no-harm board method">
            <div className="m3-risk-method-row m3-risk-method-row--head" role="row"><span role="columnheader">Step</span><span role="columnheader">Question</span><span role="columnheader">Example</span></div>
            {[
              ['1. Name the risk situation', 'What could go wrong because of the design?', 'A feedback box may expose who raised concerns.'],
              ['2. Choose the risk category', 'What type of risk is it?', 'Data or visibility risk; safety or backlash risk.'],
              ['3. Identify who may be affected', 'Which group may face harm or exclusion?', 'Women vendors, youth, persons with disabilities, remote residents.'],
              ['4. Rate the impact', 'How serious could the risk be for rights-holders?', 'High if people may be exposed or stop using feedback.'],
              ['5. Choose mitigation', 'What can reduce the risk?', 'Use non-identifying feedback options and a clear response process.'],
              ['6. Assign responsibility', 'Who should act or respond?', 'Awra facilitates safely; responsible service actor responds.'],
              ['7. Define watch sign and design adjustment', 'What should be watched, and what should change now?', 'Watch whether only one group uses the channel; replace one feedback box with safer options.'],
            ].map(([step, question, example]) => (
              <div key={step} className="m3-risk-method-row" role="row"><span role="cell">{step}</span><span role="cell">{question}</span><span role="cell">{example}</span></div>
            ))}
          </div>
          <p className="m3-risk-note">Do not stop at naming a risk. A useful board shows who may be affected, how the risk will be reduced, who responds, what to watch, and what should change in the design.</p>
        </section>

        <section className="m3-risk-grid-two">
          <article className="m3-risk-card">
            <h2>Worked example</h2>
            <div className="m3-risk-example-card">
              <p><strong>Risk situation:</strong> A feedback box may look accountable, but it can create risk if people are seen using it or if sensitive concerns are written with identifying details.</p>
              <p><strong>Risk category:</strong> Data or visibility risk; safety or backlash risk.</p>
              <p><strong>Who may be affected:</strong> Women vendors, youth, persons with disabilities, remote residents, or anyone raising concerns about services.</p>
              <p><strong>Impact level:</strong> High, if people may be exposed, blamed, or discouraged from using feedback channels.</p>
              <p><strong>Mitigation action:</strong> Use safe, non-identifying feedback options; explain what should not be written; create a response process; summarize patterns rather than personal cases.</p>
              <p><strong>Responsible actor:</strong> Awra can facilitate safe feedback and protect learning records. The responsible service or planning actor should respond to service issues.</p>
              <p><strong>Watch sign:</strong> One group is silent, people avoid the channel, or feedback includes names or complaint details.</p>
              <p><strong>Design adjustment:</strong> Replace the single feedback box with multiple safe and accessible feedback-response options, and add a clear follow-up process.</p>
            </div>
            <p className="m3-risk-note">Notice: The risk check does not only say “be careful.” It changes the feedback design before implementation.</p>
          </article>
          <article className="m3-risk-safe-note">
            <h2>Safe practice</h2>
            <p>Use the Jiru Amba learning case. When applying this tool to your own work, use generalized and non-sensitive examples.</p>
            <p>Do not enter real names, exact sensitive locations, complaint details, survivor stories, disability or medical details about specific people, political accusations, confidential political details, names of real officials or individuals, or identifiable personal information.</p>
            <p>Use safe pattern language, such as “feedback may expose who raised concerns,” “some groups may stop participating if the channel is not trusted,” or “activity promises may create unrealistic expectations.”</p>
          </article>
        </section>
        </>
        )}

        {activeStage === 3 && (
        <section className="m3-risk-builder m3-guided-stage-card" aria-labelledby={`${screen.id}-activity`}>
          <div className="m3-guided-practice-layout">
            <div className="m3-guided-stage-main">
          <div className="m3-risk-builder-copy">
            <h2 id={`${screen.id}-activity`}>Practice a risk and do-no-harm board using the Jiru Amba case</h2>
            <p>Build one risk and do-no-harm board for the Jiru Amba case. Select one risk situation, the risk category, who may be affected, the impact level, a mitigation action, the responsible actor, a watch sign, and a design adjustment.</p>
            <p>Do not focus only on delivery delays. A strong HRBA risk board asks who may be excluded, exposed, silenced, blamed, ignored, or given unrealistic expectations because of the design.</p>
          </div>
          <div className="m3-risk-builder-layout">
            <section className="m3-risk-card-list">
              <fieldset className="m3-risk-risk-card">
                <legend>1. Risk situation</legend>
                <div className="m3-risk-option-grid">{screen13RiskSituations.map((item) => riskOption(item.label, selection.riskSituation === item.label, () => setSingleSelection('riskSituation', item.label), item.body))}</div>
              </fieldset>
              <fieldset className="m3-risk-risk-card">
                <legend>2. Risk category</legend>
                <div className="m3-risk-option-grid">{screen13RiskCategories.map((category) => riskOption(category, selection.riskCategories.includes(category), () => toggleListSelection('riskCategories', category), screen13RiskCategoryDescriptions[category]))}</div>
              </fieldset>
              <fieldset className="m3-risk-risk-card">
                <legend>3. Who may be affected</legend>
                <div className="m3-risk-option-grid">{screen13AffectedGroups.map((group) => riskOption(group.label, selection.affectedGroups.includes(group.label), () => toggleListSelection('affectedGroups', group.label), group.support))}</div>
              </fieldset>
              <fieldset className="m3-risk-risk-card">
                <legend>4. Impact level</legend>
                <p>Rate impact from the rights-holder perspective, not only from the project delivery perspective.</p>
                <div className="m3-risk-option-grid">{screen13ImpactLevels.map((level) => riskOption(level.label, selection.impactLevel === level.value, () => setSingleSelection('impactLevel', level.value), level.body))}</div>
              </fieldset>
              <fieldset className="m3-risk-risk-card">
                <legend>5. Mitigation action</legend>
                <div className="m3-risk-option-grid">{screen13Mitigations.map((mitigation) => riskOption(mitigation, selection.mitigationActions.includes(mitigation), () => toggleListSelection('mitigationActions', mitigation)))}</div>
              </fieldset>
              <fieldset className="m3-risk-risk-card">
                <legend>6. Responsible actor</legend>
                <select value={selection.responsibleActor} onChange={(event) => setSingleSelection('responsibleActor', event.target.value)}>
                  <option value="">Choose one</option>
                  {screen13ResponsibleActors.map((actor) => <option key={actor} value={actor}>{actor}</option>)}
                </select>
              </fieldset>
              <fieldset className="m3-risk-risk-card">
                <legend>7. Watch sign</legend>
                <select value={selection.watchSign} onChange={(event) => setSingleSelection('watchSign', event.target.value)}>
                  <option value="">Choose one</option>
                  {screen13WatchSigns.map((watchSign) => <option key={watchSign} value={watchSign}>{watchSign}</option>)}
                </select>
              </fieldset>
              <fieldset className="m3-risk-risk-card">
                <legend>8. Design adjustment</legend>
                <select value={selection.designAdjustment} onChange={(event) => setSingleSelection('designAdjustment', event.target.value)}>
                  <option value="">Choose one</option>
                  {screen13DesignAdjustments.map((adjustment) => <option key={adjustment} value={adjustment}>{adjustment}</option>)}
                </select>
              </fieldset>
            </section>
            <aside className="m3-risk-preview">
              <h3>Risk board preview</h3>
              <p>Your risk board will appear after the required selections are complete. Use this preview to check risk situation, who may be affected, mitigation, responsibility, watch sign, and design adjustment.</p>
              {showEmpty && <img src={screen13Assets.empty} alt="Support visual showing an empty risk board preview." onError={() => setShowEmpty(false)} />}
              <ul>
                <li>Risk situation: {selection.riskSituation || 'Not selected'}</li>
                <li>Categories: {selection.riskCategories.join('; ') || 'Not selected'}</li>
                <li>Affected groups: {selection.affectedGroups.join('; ') || 'Not selected'}</li>
                <li>Impact: {getRiskStatusLabel(selection.impactLevel) || 'Not selected'}</li>
              </ul>
            </aside>
          </div>
          <div className="m3-risk-submit-row">
            <button type="button" className="m3-risk-submit" disabled={!isValid} onClick={submitBoard}>{submittedOutput ? 'Update risk board' : 'Generate risk and do-no-harm board'}</button>
            <p aria-live="polite">{helperText}</p>
          </div>
          {validationMessages.length > 0 && <ul className="m3-risk-validation" aria-live="polite">{validationMessages.slice(0, 3).map((message) => <li key={message}>{message}</li>)}</ul>}
            </div>
            <aside className="m3-guided-live-panel" aria-labelledby={`${screen.id}-risk-live`}>
              <h2 id={`${screen.id}-risk-live`}>Risk board so far</h2>
              <div className="m3-guided-chip-list">
                {riskProgressItems.map(([label, value]) => (
                  <span key={label} className={value ? 'm3-guided-selected-chip' : 'm3-guided-muted'}>
                    {label}: {value || 'Not selected'}
                  </span>
                ))}
              </div>
              <p className="m3-guided-helper">{helperText}</p>
              <p className="m3-guided-safe-note">Use actor roles and generalized group labels. Do not record names, exact locations, complaint details, survivor stories, accusations, or identifiable information.</p>
            </aside>
          </div>
        </section>
        )}

        {activeStage === 4 && submittedOutput && generatedBoard && (
          <section className="m3-risk-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Your Risk and Do-No-Harm Board</h2>
            <p>Based on your selections, this board shows what could exclude, expose, silence, or harm people if the design is implemented as written. Use it to adjust the design before implementation. This is a learning output, not a complaint record or formal risk investigation.</p>
            <div className="m3-risk-output-grid m3-risk-output-grid--board">
              {[
                ['Risk situation', generatedBoard.riskSituation],
                ['Risk category', generatedBoard.riskCategory],
                ['Who may be affected', generatedBoard.whoMayBeAffected],
                ['Impact level', generatedBoard.impactLevel],
                ['Mitigation action', generatedBoard.mitigationAction],
                ['Responsible actor', generatedBoard.responsibleActor],
                ['Watch sign', generatedBoard.watchSign],
                ['Design adjustment', generatedBoard.designAdjustment],
                ['Carry-forward use', generatedBoard.carryForwardUse],
              ].map(([label, value]) => (
                <article key={label} className="m3-risk-output-card">
                  <h3>{label}</h3>
                  <p>{value}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeStage === 4 && submittedOutput && (
          <>
            <section className="m3-risk-feedback">
              <h2>What your risk board suggests</h2>
              <ul>{submittedOutput.riskDoNoHarmBoard.interpretationMessages.map((message) => <li key={message}>{message}</li>)}</ul>
            </section>
            <section className="m3-risk-feedback">
              <h2>Feedback</h2>
              <ul>{submittedOutput.feedbackMessages.map((message) => <li key={message}>{message}</li>)}</ul>
            </section>
            <section className="m3-risk-carry-forward">
              <h2>Case-study learning to carry forward</h2>
              <div className="m3-risk-carry-grid">
                <article><h3>Learning from the Jiru Amba case</h3><p>Do-no-harm is not only a warning. It should change how Jiru Amba handles participation, feedback, evidence, accessibility, actor responsibility, activities, indicators, and follow-up.</p></article>
                <article><h3>Risk points to carry forward</h3><p>Carry forward the risk situation, affected group, mitigation action, responsible actor, watch sign, and design adjustment from your board.</p></article>
                <article><h3>Next use</h3><p>Use this board in the next screens to repair the objective, activity package, intervention logic, indicators, and final project design snapshot. Also carry the watch sign into Module 4 implementation readiness.</p></article>
              </div>
            </section>
          </>
        )}

        {activeStage === 4 && submittedOutput && (
          <div className="m3-guided-stage-actions">
            <button type="button" className="m3-secondary-button" onClick={() => setActiveStage(3)}>Edit risk board</button>
            <button type="button" className="m3-risk-submit" onClick={() => setActiveStage(5)}>Go to Apply/Download</button>
          </div>
        )}

        {activeStage === 5 && (
        <section className="m3-risk-own-cso m3-guided-stage-card">
          <div className="m3-guided-tabs" role="tablist" aria-label="Apply or download">
            <button type="button" role="tab" aria-selected={applyTab === 'own'} className={applyTab === 'own' ? 'is-active' : ''} onClick={() => setApplyTab('own')}>Try with my CSO context</button>
            <button type="button" role="tab" aria-selected={applyTab === 'downloads'} className={applyTab === 'downloads' ? 'is-active' : ''} onClick={() => setApplyTab('downloads')}>Download tools</button>
          </div>
          {applyTab === 'own' && (
          <>
          <h2>Apply this idea to your own CSO context</h2>
          <p>Use this optional practice tool to check one risk from your own CSO project idea. Keep it safe and general. Do not enter names, exact locations, complaints, disability or medical details, survivor stories, accusations, confidential political details, or identifiable personal information.</p>
          <div className="m3-risk-own-grid">
            {[
              ['projectActivity', 'Project activity or decision', 'Example: Community feedback channel for service improvement.'],
              ['riskSituation', 'Risk situation', 'What could go wrong because of the design?'],
              ['affectedGroup', 'Who may be affected', 'Which group may be excluded, exposed, silenced, blamed, ignored, or given unrealistic expectations?'],
              ['mitigationAction', 'Mitigation action', 'What action can reduce the risk?'],
              ['responsibleActor', 'Responsible actor', 'Who should act, respond, or follow up?'],
              ['watchSign', 'Watch sign', 'What sign should the project watch during implementation?'],
              ['designAdjustment', 'Design adjustment', 'What should change in the project design before implementation?'],
              ['safeEvidenceRule', 'Safe evidence rule', 'What should not be collected or written?'],
            ].map(([field, label, placeholder]) => (
              <label key={field}>
                <span>{label}</span>
                <textarea value={ownCsoDraft[field as keyof Screen13OwnCsoDraft]} onChange={(event) => updateOwnCsoDraft(field as keyof Screen13OwnCsoDraft, event.target.value)} placeholder={placeholder} />
              </label>
            ))}
            <label>
              <span>Risk category</span>
              <select value={ownCsoDraft.riskCategory} onChange={(event) => updateOwnCsoDraft('riskCategory', event.target.value)}>
                <option value="">Choose one</option>
                {screen13RiskCategories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>
            <label>
              <span>Impact level</span>
              <select value={ownCsoDraft.impactLevel} onChange={(event) => updateOwnCsoDraft('impactLevel', event.target.value)}>
                <option value="">Choose one</option>
                {screen13ImpactLevels.map((level) => <option key={level.value} value={level.value}>{level.label}</option>)}
              </select>
            </label>
          </div>
          {ownCsoError && <p className="m3-risk-error" role="alert">{ownCsoError}</p>}
          <button type="button" className="m3-risk-submit" onClick={generateOwnCsoBoard}>Generate my risk and do-no-harm board</button>
          {ownCsoOutput && (
            <article className="m3-risk-own-output" aria-live="polite">
              <h3>My Risk and Do-No-Harm Board</h3>
              <dl>
                {[
                  ['Project activity or decision', ownCsoOutput.projectActivity],
                  ['Risk situation', ownCsoOutput.riskSituation],
                  ['Risk category', ownCsoOutput.riskCategory],
                  ['Who may be affected', ownCsoOutput.affectedGroup],
                  ['Impact level', getRiskStatusLabel(ownCsoOutput.impactLevel)],
                  ['Mitigation action', ownCsoOutput.mitigationAction],
                  ['Responsible actor', ownCsoOutput.responsibleActor],
                  ['Watch sign', ownCsoOutput.watchSign],
                  ['Design adjustment', ownCsoOutput.designAdjustment],
                  ['Safe evidence rule', ownCsoOutput.safeEvidenceRule],
                ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
            </article>
          )}
          </>
          )}
        </section>
        )}

        {activeStage === 5 && applyTab === 'downloads' && (
        <section className="m3-risk-template m3-guided-stage-card">
          <div>
            <h2>Risk and Do-No-Harm Board Template</h2>
            <p>Download a reusable template for checking what could exclude, expose, silence, or harm people before implementation.</p>
          </div>
          <div className="m3-risk-template-actions">
            <button type="button" className="m3-risk-submit" onClick={() => downloadRiskTemplate('docx')}>Download Risk and Do-No-Harm Board Template</button>
            <button type="button" className="m3-risk-submit" onClick={() => downloadRiskTemplate('md')}>Download markdown copy</button>
          </div>
        </section>
        )}

        {activeStage === 5 && (
        <div className="m3-risk-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ riskDoNoHarmBoard: submittedOutput.riskDoNoHarmBoard, screen13: submittedOutput })}>
            {screen.continueLabel}
          </PrimaryButton>
        </div>
        )}
      </article>
    </main>
  );
}


function downloadDesignRepairTemplate(markdown: string, filename: string, format: 'docx' | 'md') {
  if (typeof window === 'undefined') return;
  const content = format === 'docx' ? buildMarkdownTemplateHtml(filename.replace(/-/g, ' '), markdown) : markdown;
  const blob = new Blob([content], { type: format === 'docx' ? 'application/msword;charset=utf-8' : 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.${format}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function ObjectiveRepairScreen({ screen, onComplete }: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [selections, setSelections] = useState<Screen14Selections>(emptyScreen14Selections());
  const [ownCsoDraft, setOwnCsoDraft] = useState<Screen14OwnCsoDraft>(getEmptyScreen14OwnCsoDraft());
  const [ownCsoOutput, setOwnCsoOutput] = useState<Screen14OwnCsoOutput | null>(null);
  const [ownCsoError, setOwnCsoError] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen14Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [showHero, setShowHero] = useState(true);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const currentSignature = JSON.stringify({ selections, ownCsoOutput });
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const isValid = isScreen14Valid(selections);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const helperText = getScreen14Helper(selections, Boolean(submittedOutput), formChanged);
  const toggleSelection = (field: Screen14Field, value: string) => {
    setSelections((current) => {
      const values = current[field];
      return { ...current, [field]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value] };
    });
  };
  const generateObjective = () => {
    if (!isValid) return;
    const output = buildScreen14Submission(selections, ownCsoOutput);
    setSubmittedOutput(output);
    setSubmittedSignature(currentSignature);
    if (typeof window !== 'undefined') window.setTimeout(() => outputRef.current?.focus(), 0);
  };
  const updateOwnCso = (field: keyof Screen14OwnCsoDraft, value: string) => {
    setOwnCsoDraft((current) => ({ ...current, [field]: value }));
    setOwnCsoError('');
  };
  const generateOwnCso = () => {
    if (Object.values(ownCsoDraft).some((value) => !value.trim())) {
      setOwnCsoError('A useful repaired objective needs a rights-holder focus, barrier focus, responsible actor, change focus, and realistic scope.');
      return;
    }
    if (Object.values(ownCsoDraft).some((value) => hasUnsafeLearningDetail(value))) {
      setOwnCsoError('Before saving, remove names, exact sensitive locations, complaint details, survivor stories, disability or medical details about specific people, accusations, or identifiable personal information.');
      return;
    }
    setOwnCsoOutput({
      ...ownCsoDraft,
      generatedObjective: `Strengthen ${ownCsoDraft.rightsHolderGroups} to address ${ownCsoDraft.priorityBarriers}, while ${ownCsoDraft.responsibleActors} improve ${ownCsoDraft.capacityAccountabilityChange} within ${ownCsoDraft.realisticProjectScope}.`,
      generatedAt: new Date().toISOString(),
    });
    setOwnCsoError('');
  };
  const repaired = submittedOutput?.repairedObjective;

  return (
    <main className="m3-screen m3-design-repair-screen m3-objective-repair-screen" aria-labelledby={titleId}>
      <article className="m3-design-repair-shell">
        <header className="m3-design-repair-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-design-repair-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Repair the Objective</h1>
          <p className="m3-design-repair-subtitle">Turn a broad activity-based objective into an HRBA objective that shows rights-holders, barriers, responsibility, and change.</p>
        </header>

        <section className="m3-design-repair-hero">
          <div className="m3-design-repair-hero-copy">
            <p className="m3-design-repair-kicker">Purpose of this activity</p>
            <h2>After analysis, repair the project objective.</h2>
            <p>A weak objective may sound positive but still be too broad, too activity-based, or too focused on delivery. An HRBA objective should show which rights-holder groups need stronger access, influence, benefit, or response; which barriers the project is trying to reduce; which actors must respond; what condition should improve; and what is realistic for the project to influence.</p>
            <p className="m3-design-repair-safe">Use the fictional Jiru Amba case. Do not enter real names, exact sensitive locations, complaints, survivor stories, disability or medical details about specific people, accusations, or identifiable personal information.</p>
          </div>
          <figure className="m3-design-repair-visual">{showHero && <img src={screen14Assets.hero.src} alt={screen14Assets.hero.alt} onError={() => setShowHero(false)} />}</figure>
        </section>

        <section className="m3-design-repair-card">
          <h2>Repairing the objective is not copyediting</h2>
          <p>A repaired objective is not just a nicer sentence. It changes what the project is trying to achieve.</p>
          <blockquote>Improve community participation in local development planning.</blockquote>
          <p>A strong HRBA objective does not only say what the project will do. It says whose rights, voice, access, accountability, or benefit should improve, and what conditions must change.</p>
        </section>

        <section className="m3-design-repair-card">
          <h2>Use a 5-part objective repair check</h2>
          <div className="m3-design-repair-method-table">
            <div className="m3-design-repair-method-row m3-design-repair-method-row--head"><span>Objective element</span><span>Guiding question</span><span>Why it matters</span></div>
            {(Object.keys(screen14FieldLabels) as Screen14Field[]).map((field) => (
              <div key={field} className="m3-design-repair-method-row"><span>{screen14FieldLabels[field]}</span><span>{screen14FieldQuestions[field]}</span><span>Prevents cosmetic repair and keeps the objective connected to analysis.</span></div>
            ))}
          </div>
          <p className="m3-design-repair-note">A repaired objective should be clear, realistic, and connected to the analysis. It should express the main rights-based change the project will support.</p>
        </section>

        <section className="m3-design-repair-grid-two">
          <article className="m3-design-repair-card">
            <h2>Worked example</h2>
            <p><strong>Weak objective:</strong> Improve community participation in the Jiru Amba local development plan.</p>
            <p><strong>Repaired HRBA objective:</strong> Strengthen meaningful and accessible participation of women vendors, persons with disabilities, remote kebele residents, and other lower-influence groups in Jiru Amba service-improvement decisions, while supporting responsible planning and service actors to respond to priorities, feedback, and accessibility barriers.</p>
            <p className="m3-design-repair-note">Notice: The repaired objective is stronger because it makes the HRBA design logic visible.</p>
          </article>
          <article className="m3-design-repair-card">
            <h2>Women context note</h2>
            <p>Use “Women” as the rights-holder group label. Where water-service context is relevant, use supporting text: Women, in the context of household water responsibilities and water-service decisions.</p>
          </article>
        </section>

        <section className="m3-design-repair-builder" aria-labelledby={`${screen.id}-activity`}>
          <div className="m3-design-repair-builder-copy">
            <h2 id={`${screen.id}-activity`}>Practice repairing the Jiru Amba objective</h2>
            <p>Start from this weak objective: <strong>{screen14WeakObjective}</strong></p>
          </div>
          <div className="m3-objective-repair-row-list">
            {(Object.keys(screen14Options) as Screen14Field[]).map((field) => (
              <fieldset key={field} className="m3-design-repair-fieldset">
                <legend>{screen14FieldLabels[field]}</legend>
                <p>{screen14FieldQuestions[field]}</p>
                <div className="m3-design-repair-options">
                  {screen14Options[field].map((option) => {
                    const selected = selections[field].includes(option);
                    return <button key={option} type="button" className={`m3-design-repair-option${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => toggleSelection(field, option)}><span aria-hidden="true">{selected ? '✓' : '○'}</span><strong>{option}</strong>{selected && <small>Selected</small>}</button>;
                  })}
                </div>
              </fieldset>
            ))}
          </div>
          <div className="m3-design-repair-submit-row">
            <button type="button" className="m3-design-repair-submit" disabled={!isValid} onClick={generateObjective}>{submittedOutput ? 'Update repaired objective' : 'Generate repaired HRBA objective'}</button>
            <p aria-live="polite">{helperText}</p>
          </div>
        </section>

        {repaired && (
          <section className="m3-design-repair-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Your Repaired HRBA Objective</h2>
            <p>Based on your selections, this repaired objective shows a clearer rights-based design direction. It is a learning output and should be reviewed before use in a real proposal.</p>
            <div className="m3-objective-repair-canvas">
              {[
                ['Original weak objective', repaired.originalWeakObjective],
                ['What was missing', repaired.whatWasMissing],
                ['Repaired HRBA objective', repaired.repairedHrbaObjective],
                ['HRBA design logic', repaired.hrbaDesignLogic],
                ['What to carry into activity repair', repaired.carryIntoActivityRepair],
              ].map(([label, value]) => <article key={label}><span>{label}</span><p>{value}</p></article>)}
            </div>
            <ul className="m3-design-repair-checklist">{repaired.feedbackMessages.map((message) => <li key={message}>✓ {message}</li>)}</ul>
          </section>
        )}

        <section className="m3-design-repair-own-cso">
          <h2>Apply this idea to your own CSO project idea</h2>
          <div className="m3-design-repair-own-grid">
            {[
              ['originalObjective', 'Original objective', 'Write the current objective in one sentence.'],
              ['rightsHolderGroups', 'Specific rights-holder groups', 'Which groups should be visible?'],
              ['priorityBarriers', 'Priority barriers', 'Which barriers should the objective respond to?'],
              ['responsibleActors', 'Responsible actors', 'Which public, service, committee, sector, project, or CSO actors have a role?'],
              ['capacityAccountabilityChange', 'Capacity or accountability change', 'What should improve?'],
              ['realisticProjectScope', 'Realistic project scope', 'What can the project realistically influence?'],
            ].map(([field, label, placeholder]) => <label key={field}><span>{label}</span><textarea value={ownCsoDraft[field as keyof Screen14OwnCsoDraft]} onChange={(event) => updateOwnCso(field as keyof Screen14OwnCsoDraft, event.target.value)} placeholder={placeholder} /></label>)}
          </div>
          {ownCsoError && <p className="m3-design-repair-error" role="alert">{ownCsoError}</p>}
          <button type="button" className="m3-design-repair-submit" onClick={generateOwnCso}>Generate my repaired objective</button>
          {ownCsoOutput && <article className="m3-design-repair-own-output"><h3>My Repaired HRBA Objective</h3><p>{ownCsoOutput.generatedObjective}</p></article>}
        </section>

        <section className="m3-design-repair-template">
          <h2>HRBA Objective Repair Template</h2>
          <div className="m3-design-repair-template-actions">
            <button type="button" className="m3-design-repair-submit" onClick={() => downloadDesignRepairTemplate(objectiveRepairTemplateMarkdown, 'hrba-objective-repair-template', 'docx')}>Download HRBA Objective Repair Template</button>
            <button type="button" className="m3-design-repair-submit" onClick={() => downloadDesignRepairTemplate(objectiveRepairTemplateMarkdown, 'hrba-objective-repair-template', 'md')}>Download markdown copy</button>
          </div>
        </section>

        <div className="m3-design-repair-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ repairedObjective: submittedOutput.repairedObjective, screen14: submittedOutput })}>
            {screen.continueLabel}
          </PrimaryButton>
        </div>
      </article>
    </main>
  );
}

function ActivityRepairScreen({ screen, state, onComplete }: {
  screen: Module3RevisedScreen;
  state: LearningState;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const repairedObjective = getScreen14SavedOutput(state)?.repairedObjective.repairedHrbaObjective || screen16FallbackObjective;
  const [selectedActionIds, setSelectedActionIds] = useState<string[]>([]);
  const [ownCsoDraft, setOwnCsoDraft] = useState<Screen15OwnCsoDraft>(getEmptyScreen15OwnCsoDraft());
  const [ownCsoOutput, setOwnCsoOutput] = useState<Screen15OwnCsoOutput | null>(null);
  const [ownCsoError, setOwnCsoError] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen15Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [showHero, setShowHero] = useState(true);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const currentSignature = JSON.stringify({ selectedActionIds: [...selectedActionIds].sort(), ownCsoOutput });
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const isValid = isScreen15Valid(selectedActionIds);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const helperText = getScreen15Helper(selectedActionIds, Boolean(submittedOutput), formChanged, '');
  const toggleAction = (actionId: string) => setSelectedActionIds((current) => current.includes(actionId) ? current.filter((id) => id !== actionId) : [...current, actionId]);
  const generatePackage = () => {
    if (!isValid) return;
    const output = buildScreen15Submission(selectedActionIds, repairedObjective, ownCsoOutput);
    setSubmittedOutput(output);
    setSubmittedSignature(currentSignature);
    if (typeof window !== 'undefined') window.setTimeout(() => outputRef.current?.focus(), 0);
  };
  const updateOwnCso = (field: keyof Screen15OwnCsoDraft, value: string) => {
    setOwnCsoDraft((current) => ({ ...current, [field]: value }));
    setOwnCsoError('');
  };
  const generateOwnCso = () => {
    if (Object.values(ownCsoDraft).some((value) => !value.trim())) {
      setOwnCsoError('A useful repaired activity needs an original activity, weakness, barrier link, rights-holder group, repaired activity, responsible actor, risk/accountability adjustment, and safe evidence question.');
      return;
    }
    if (Object.values(ownCsoDraft).some((value) => hasUnsafeLearningDetail(value))) {
      setOwnCsoError('Before saving, remove names, exact sensitive locations, complaint details, survivor stories, disability or medical details about specific people, accusations, or identifiable personal information.');
      return;
    }
    setOwnCsoOutput({ ...ownCsoDraft, generatedAt: new Date().toISOString() });
  };
  const output = submittedOutput?.repairedActivityPackage;

  return (
    <main className="m3-screen m3-design-repair-screen m3-activity-repair-screen" aria-labelledby={titleId}>
      <article className="m3-design-repair-shell">
        <header className="m3-design-repair-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-design-repair-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Repair the Activity Package</h1>
          <p className="m3-design-repair-subtitle">Turn activity lists into design responses that reduce barriers, clarify roles, manage risk, and produce safe evidence.</p>
        </header>
        <section className="m3-design-repair-hero"><div className="m3-design-repair-hero-copy"><p className="m3-design-repair-kicker">Purpose of this activity</p><h2>Activities should respond to analysis.</h2><p>A weak activity package may list trainings, meetings, feedback boxes, grants, or renovations without showing how they reduce barriers or improve accountability. Repairing activities means changing design, not only adding more activity words.</p><p className="m3-design-repair-safe">Keep examples safe and general. Do not enter names, complaints, exact locations, or identifiable personal information.</p></div><figure className="m3-design-repair-visual">{showHero && <img src={screen15Assets.hero.src} alt={screen15Assets.hero.alt} onError={() => setShowHero(false)} />}</figure></section>
        <section className="m3-design-repair-card"><h2>Use a 6-part activity repair check</h2><div className="m3-design-repair-method-table">{['Original activity', 'What is weak?', 'Barrier link', 'Rights-holder group', 'Responsible actor / CSO role', 'Risk/accountability adjustment and safe evidence'].map((item) => <div key={item} className="m3-design-repair-method-row"><span>{item}</span><span>Check this before implementation.</span><span>Shows what changed because of HRBA analysis.</span></div>)}</div></section>
        <section className="m3-design-repair-card"><h2>Repaired objective carried forward</h2><p>{repairedObjective}</p></section>
        <section className="m3-design-repair-builder" aria-labelledby={`${screen.id}-activity`}><h2 id={`${screen.id}-activity`}>Repair at least three Jiru Amba activities</h2><div className="m3-activity-repair-card-grid">{activityRepairActions.map((action) => { const selected = selectedActionIds.includes(action.id); return <button key={action.id} type="button" className={`m3-activity-repair-choice${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => toggleAction(action.id)}><span aria-hidden="true">{selected ? '✓ Selected' : '○ Select'}</span><strong>{action.originalActivity}</strong><small>{action.weakness}</small><span>{action.lane}</span></button>; })}</div><div className="m3-design-repair-submit-row"><button type="button" className="m3-design-repair-submit" disabled={!isValid} onClick={generatePackage}>{submittedOutput ? 'Update repaired activity package' : 'Generate repaired activity package'}</button><p aria-live="polite">{helperText}</p></div></section>
        {output && <section className="m3-design-repair-output" aria-live="polite"><h2 ref={outputRef} tabIndex={-1}>Your Repaired Activity Package</h2><p>{output.generatedSummary}</p>{output.repairedActivities.map((action) => <article key={action.id} className="m3-activity-repair-output-card"><h3>{action.originalActivity}</h3><p><strong>Original activity</strong>{action.originalActivity}</p><p><strong>Weakness</strong>{action.weakness}</p><p><strong>Barrier addressed</strong>{action.barrier}</p><p><strong>Rights-holder group</strong>{action.rightsHolderGroup}</p><p><strong>Repaired activity</strong>{action.repairedActivity}</p><p><strong>Responsible actor / CSO role</strong>{action.responsibleActorCsoRole}</p><p><strong>Risk/accountability adjustment</strong>{action.riskAccountabilityAdjustment}</p><p><strong>Safe evidence question</strong>{action.safeEvidenceQuestion}</p></article>)}<ul className="m3-design-repair-checklist">{output.feedbackMessages.map((message) => <li key={message}>✓ {message}</li>)}</ul></section>}
        <section className="m3-design-repair-own-cso"><h2>Apply this idea to your own CSO project idea</h2><div className="m3-design-repair-own-grid">{[['originalActivity', 'Original activity'], ['weakness', 'What is weak?'], ['barrierLink', 'Barrier link'], ['rightsHolderGroup', 'Rights-holder group'], ['repairedActivity', 'Repaired activity'], ['responsibleActorCsoRole', 'Responsible actor / CSO role'], ['riskAccountabilityAdjustment', 'Risk/accountability adjustment'], ['safeEvidenceQuestion', 'Safe evidence question']].map(([field, label]) => <label key={field}><span>{label}</span><textarea value={ownCsoDraft[field as keyof Screen15OwnCsoDraft]} onChange={(event) => updateOwnCso(field as keyof Screen15OwnCsoDraft, event.target.value)} /></label>)}</div>{ownCsoError && <p className="m3-design-repair-error" role="alert">{ownCsoError}</p>}<button type="button" className="m3-design-repair-submit" onClick={generateOwnCso}>Generate my repaired activity</button>{ownCsoOutput && <article className="m3-design-repair-own-output"><h3>My Repaired Activity</h3><p>{ownCsoOutput.repairedActivity}</p></article>}</section>
        <section className="m3-design-repair-template"><h2>HRBA Activity Package Repair Template</h2><div className="m3-design-repair-template-actions"><button type="button" className="m3-design-repair-submit" onClick={() => downloadDesignRepairTemplate(activityRepairTemplateMarkdown, 'hrba-activity-package-repair-template', 'docx')}>Download HRBA Activity Package Repair Template</button><button type="button" className="m3-design-repair-submit" onClick={() => downloadDesignRepairTemplate(activityRepairTemplateMarkdown, 'hrba-activity-package-repair-template', 'md')}>Download markdown copy</button></div></section>
        <div className="m3-design-repair-actions"><PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ repairedActivityPackage: submittedOutput.repairedActivityPackage, screen15: submittedOutput })}>{screen.continueLabel}</PrimaryButton></div>
      </article>
    </main>
  );
}

function InterventionLogicIndicatorsScreen({ screen, state, onComplete }: {
  screen: Module3RevisedScreen;
  state: LearningState;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const carriedObjective = getScreen14SavedOutput(state)?.repairedObjective.repairedHrbaObjective || screen16FallbackObjective;
  const carriedActivities = getScreen15SavedOutput(state)?.repairedActivityPackage.repairedActivities.map((action) => action.repairedActivity) || screen16FallbackActivities;
  const [selection, setSelection] = useState<Screen16Selections>({ ...emptyScreen16Selections(), repairedObjective: carriedObjective, repairedActivity: carriedActivities[0] || '' });
  const [ownCsoDraft, setOwnCsoDraft] = useState<Screen16OwnCsoDraft>(getEmptyScreen16OwnCsoDraft());
  const [ownCsoOutput, setOwnCsoOutput] = useState<Screen16OwnCsoOutput | null>(null);
  const [ownCsoError, setOwnCsoError] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen16Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [showHero, setShowHero] = useState(true);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const currentSignature = JSON.stringify({ selection, ownCsoOutput });
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const isValid = isScreen16Valid(selection);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const helperText = getScreen16Helper(selection, Boolean(submittedOutput), formChanged);
  const setSingle = (field: keyof Screen16Selections, value: string) => setSelection((current) => ({ ...current, [field]: value }));
  const generateMatrix = () => {
    if (!isValid) return;
    const output = buildScreen16Submission(selection, ownCsoOutput);
    setSubmittedOutput(output);
    setSubmittedSignature(currentSignature);
    if (typeof window !== 'undefined') window.setTimeout(() => outputRef.current?.focus(), 0);
  };
  const updateOwnCso = (field: keyof Screen16OwnCsoDraft, value: string) => {
    setOwnCsoDraft((current) => ({ ...current, [field]: value }));
    setOwnCsoError('');
  };
  const generateOwnCso = () => {
    if (Object.values(ownCsoDraft).some((value) => !value.trim())) { setOwnCsoError('A useful mini-matrix needs a barrier, objective, activity, output, outcome, indicator, safe evidence source, assumption or risk, and watch-point.'); return; }
    if (Object.values(ownCsoDraft).some((value) => hasUnsafeLearningDetail(value))) { setOwnCsoError('Before saving, remove names, exact sensitive locations, complaint details, survivor stories, disability or medical details about specific people, accusations, or identifiable personal information.'); return; }
    setOwnCsoOutput({ ...ownCsoDraft, generatedAt: new Date().toISOString() });
  };
  const matrix = submittedOutput?.interventionLogicIndicators;

  return (
    <main className="m3-screen m3-design-repair-screen m3-logic-pathway-screen" aria-labelledby={titleId}>
      <article className="m3-design-repair-shell">
        <header className="m3-design-repair-header"><ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip><p className="m3-design-repair-eyebrow">{screen.eyebrow}</p><h1 id={titleId}>Intervention Logic and Indicators</h1><p className="m3-design-repair-subtitle">Connect the repaired objective and activities to outputs, outcome, safe indicators, assumptions, and implementation watch-points.</p></header>
        <section className="m3-design-repair-hero"><div className="m3-design-repair-hero-copy"><p className="m3-design-repair-kicker">Purpose of this activity</p><h2>This is a mini-matrix, not a full logframe.</h2><p>Good intervention logic shows how change is expected to happen. Indicators should show more than activity delivery: they should track influence, access, inclusion, response, benefit, accountability, or capacity change using safe evidence.</p><p className="m3-design-repair-safe">Do not use indicators that require names, complaint details, disability or medical details, survivor stories, exact sensitive locations, accusations, or identifiable information.</p></div><figure className="m3-design-repair-visual">{showHero && <img src={screen16Assets.hero.src} alt={screen16Assets.hero.alt} onError={() => setShowHero(false)} />}</figure></section>
        <section className="m3-design-repair-card"><h2>Use a 7-step HRBA logic check</h2><div className="m3-design-repair-method-table">{['Problem / barrier', 'Repaired objective', 'Repaired activity', 'Output', 'Outcome', 'Indicator', 'Assumption / risk'].map((item) => <div key={item} className="m3-design-repair-method-row"><span>{item}</span><span>What must be clear?</span><span>Keep the logic practical and safe.</span></div>)}</div></section>
        <section className="m3-design-repair-card"><h2>Check indicator quality</h2><p><strong>Weak indicator:</strong> Number of community meetings held.</p><p><strong>Stronger HRBA indicator:</strong> Number of lower-influence rights-holder groups that received information before decisions and can identify at least one way their priorities were considered in the final plan, using non-identifying evidence.</p><p><strong>Weak indicator:</strong> Number of youth trained.</p><p><strong>Stronger HRBA indicator:</strong> Number of youth participants whose training pathway includes follow-up support, market/service linkage, or practical opportunity step, using safe and non-identifying monitoring records.</p></section>
        <section className="m3-design-repair-card"><h2>Objective and activities carried forward</h2><p><strong>Objective:</strong> {carriedObjective}</p><ul>{carriedActivities.map((activity) => <li key={activity}>{activity}</li>)}</ul></section>
        <section className="m3-design-repair-builder" aria-labelledby={`${screen.id}-activity`}><h2 id={`${screen.id}-activity`}>Build an HRBA intervention logic mini-matrix</h2>{[
          ['barrier', 'Barrier / root cause', screen16Barriers],
          ['repairedObjective', 'Repaired objective', [carriedObjective, screen16FallbackObjective]],
          ['repairedActivity', 'Repaired activity', carriedActivities],
          ['output', 'Output', screen16Outputs],
          ['outcome', 'Outcome', screen16Outcomes],
          ['indicator', 'Indicator', screen16Indicators],
          ['safeEvidenceSource', 'Safe evidence source', screen16EvidenceSources],
          ['assumptionRisk', 'Assumption or risk', screen16AssumptionRisks],
          ['watchPoint', 'Implementation watch-point', screen16WatchPoints],
        ].map(([field, label, options]) => <fieldset key={field as string} className="m3-design-repair-fieldset"><legend>{label as string}</legend><div className="m3-design-repair-options">{(options as string[]).map((option) => { const selected = selection[field as keyof Screen16Selections] === option; return <button key={option} type="button" className={`m3-design-repair-option${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => setSingle(field as keyof Screen16Selections, option)}><span aria-hidden="true">{selected ? '✓' : '○'}</span><strong>{option}</strong></button>; })}</div></fieldset>)}<div className="m3-design-repair-submit-row"><button type="button" className="m3-design-repair-submit" disabled={!isValid} onClick={generateMatrix}>{submittedOutput ? 'Update mini-matrix' : 'Generate HRBA intervention logic mini-matrix'}</button><p aria-live="polite">{helperText}</p></div></section>
        {matrix && <section className="m3-design-repair-output" aria-live="polite"><h2 ref={outputRef} tabIndex={-1}>Your HRBA Intervention Logic Mini-Matrix</h2><p>Based on your selections, this mini-matrix shows how the repaired design is expected to create change. It is a learning output, not a full logframe.</p><div className="m3-logic-pathway-output">{[
          ['Barrier / root cause', matrix.barrierRootCause],
          ['Repaired objective', matrix.repairedObjective],
          ['Repaired activity', matrix.repairedActivity],
          ['Output', matrix.output],
          ['Outcome', matrix.outcome],
          ['Indicator', matrix.indicator],
          ['Safe evidence source', matrix.safeEvidenceSource],
          ['Assumption or risk', matrix.assumptionRisk],
          ['Implementation watch-point', matrix.implementationWatchPoint],
        ].map(([label, value], index) => <article key={label}><span>{index + 1}</span><h3>{label}</h3><p>{value}</p></article>)}</div><h3>Logic quality summary</h3><p className="m3-design-repair-note">{matrix.logicQualitySummary}</p><ul className="m3-design-repair-checklist">{matrix.feedbackMessages.map((message) => <li key={message}>✓ {message}</li>)}</ul></section>}
        <section className="m3-design-repair-own-cso"><h2>Apply this idea to your own CSO project idea</h2><div className="m3-design-repair-own-grid">{[['projectBarrierRootCause', 'Project barrier or root cause'], ['repairedObjective', 'Repaired objective'], ['repairedActivity', 'Repaired activity'], ['output', 'Output'], ['outcome', 'Outcome'], ['indicator', 'Indicator'], ['safeEvidenceSource', 'Safe evidence source'], ['assumptionRisk', 'Assumption or risk'], ['implementationWatchPoint', 'Implementation watch-point']].map(([field, label]) => <label key={field}><span>{label}</span><textarea value={ownCsoDraft[field as keyof Screen16OwnCsoDraft]} onChange={(event) => updateOwnCso(field as keyof Screen16OwnCsoDraft, event.target.value)} /></label>)}</div>{ownCsoError && <p className="m3-design-repair-error" role="alert">{ownCsoError}</p>}<button type="button" className="m3-design-repair-submit" onClick={generateOwnCso}>Generate my HRBA logic mini-matrix</button>{ownCsoOutput && <article className="m3-design-repair-own-output"><h3>My HRBA Logic Mini-Matrix</h3><p>{ownCsoOutput.indicator}</p></article>}</section>
        <section className="m3-design-repair-template"><h2>HRBA Intervention Logic Mini-Matrix Template</h2><div className="m3-design-repair-template-actions"><button type="button" className="m3-design-repair-submit" onClick={() => downloadDesignRepairTemplate(logicMiniMatrixTemplateMarkdown, 'hrba-intervention-logic-mini-matrix-template', 'docx')}>Download HRBA Intervention Logic Mini-Matrix Template</button><button type="button" className="m3-design-repair-submit" onClick={() => downloadDesignRepairTemplate(logicMiniMatrixTemplateMarkdown, 'hrba-intervention-logic-mini-matrix-template', 'md')}>Download markdown copy</button></div></section>
        <div className="m3-design-repair-actions"><PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ interventionLogicIndicators: submittedOutput.interventionLogicIndicators, screen16: submittedOutput })}>{screen.continueLabel}</PrimaryButton></div>
      </article>
    </main>
  );
}

function ClosureScaffold({
  screen,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  onComplete: () => void;
}) {
  return (
    <ScreenShell
      screen={screen}
      footer={<PrimaryButton onClick={onComplete}>{screen.continueLabel}</PrimaryButton>}
    >
      <section className="m3-output-card">
        <h2>Module 3 complete</h2>
        <p>
          You have completed the revised Module 3 scaffold. Detailed closure copy and any final
          support visual can be added later while keeping this completion route stable.
        </p>
        <p>
          Next routing point: Module 4 cover screen.
        </p>
      </section>
    </ScreenShell>
  );
}

function ProposalReviewScreen({ screen, onComplete }: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const titleId = `${screen.id}-title`;
  const outputHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const [review, setReview] = useState<Partial<Record<ProposalSectionId, ProposalReviewStatus>>>({});
  const [openHints, setOpenHints] = useState<Partial<Record<ProposalSectionId, boolean>>>({});
  const [submittedOutput, setSubmittedOutput] = useState<Screen17Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState('');
  const [helper, setHelper] = useState('Please review all draft plan sections before generating the preview.');
  const [ownCsoDraft, setOwnCsoDraft] = useState<Screen17OwnCsoDraft>(getEmptyScreen17OwnCsoDraft());
  const [ownCsoOutput, setOwnCsoOutput] = useState<Screen17OwnCsoOutput | undefined>();
  const [ownCsoError, setOwnCsoError] = useState('');
  const [showHero, setShowHero] = useState(true);
  const currentSignature = getProposalReviewSignature(review);
  const allMarked = proposalSections.every((section) => Boolean(review[section.id]));
  const needsCount = countNeedsHrbaCheck(review);
  const stale = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const canContinue = Boolean(submittedOutput && allMarked && needsCount > 0 && !stale);

  function updateReview(sectionId: ProposalSectionId, status: ProposalReviewStatus) {
    setReview((prev) => ({ ...prev, [sectionId]: status }));
    if (submittedOutput) setHelper('Your selections changed. Update your review preview before continuing.');
  }

  function submitReview() {
    if (!allMarked) {
      setHelper('Please review all draft plan sections before generating the preview.');
      return;
    }
    if (needsCount === 0) {
      setHelper('Check again. This draft is intentionally imperfect. At least some sections should need HRBA gap checking because they sound useful but do not yet show enough rights-holder focus, barrier logic, responsibility, accountability, risk, or safe evidence.');
      return;
    }
    if (needsCount < 3) {
      setHelper('A section can sound complete and still be HRBA weak. Look for design logic, not only polished wording.');
    }
    const completeReview = Object.fromEntries(proposalSections.map((section) => [section.id, review[section.id] || 'readyForNow'])) as Record<ProposalSectionId, ProposalReviewStatus>;
    const output = buildScreen17Submission(completeReview);
    if (ownCsoOutput) output.ownCsoPracticeOutput = ownCsoOutput;
    setSubmittedOutput(output);
    setSubmittedSignature(getProposalReviewSignature(completeReview));
    setReview(completeReview);
    setHelper('Your draft plan review preview is ready to save.');
    if (typeof window !== 'undefined') window.setTimeout(() => outputHeadingRef.current?.focus(), 0);
  }

  function generateOwnCsoReview() {
    const values = [ownCsoDraft.planSection, ownCsoDraft.summary, ownCsoDraft.why];
    if (!ownCsoDraft.planSection.trim() || !ownCsoDraft.summary.trim() || !ownCsoDraft.decision || !ownCsoDraft.why.trim() || hasUnsafeProposalPracticeDetail(values)) {
      setOwnCsoError('Use a safe generalized summary only. Do not paste sensitive proposal text, names, exact locations, complaint details, or identifiable information.');
      return;
    }
    const output: Screen17OwnCsoOutput = {
      ...ownCsoDraft,
      generatedNote: ownCsoDraft.decision === 'needsHrbaCheck'
        ? 'This section needs HRBA gap checking because the visible design logic is not yet strong enough.'
        : 'This section may be ready for now, but keep checking whether rights-holder focus, barriers, responsibility, and safe evidence are visible.',
    };
    setOwnCsoOutput(output);
    setOwnCsoError('');
  }

  return (
    <main className="m3-screen m3-proposal-screen" aria-labelledby={titleId}>
      <article className="m3-proposal-shell">
        <header className="m3-proposal-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-proposal-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <p>Read the Jiru Amba draft plan and decide which sections need an HRBA gap check.</p>
        </header>

        <section className="m3-proposal-hero">
          <div className="m3-proposal-card">
            <h2>Purpose of this activity</h2>
            <p>After repairing the objective, activities, intervention logic, and indicators, you will now review a fuller draft plan.</p>
            <p>A proposal section can sound complete but still be weak from an HRBA perspective. It may mention participation, inclusion, accountability, or rights, but still not show who is affected differently, what barriers matter, who has responsibility, how rights-holders influence decisions, how feedback receives response, what risks are managed, or what safe evidence will show change.</p>
          </div>
          <figure className="m3-proposal-visual">
            {showHero && <img src={proposalAssets.screen17Hero.src} alt={proposalAssets.screen17Hero.alt} onError={() => setShowHero(false)} />}
          </figure>
        </section>

        <section className="m3-proposal-grid-two">
          <article className="m3-proposal-card">
            <h2>A draft can sound complete and still need HRBA checking</h2>
            <p>This review is not about grammar or professional wording. It is about design quality.</p>
            <ul>
              <li>Is the section only descriptive, or does it show HRBA design logic?</li>
              <li>Does it name specific rights-holder groups safely?</li>
              <li>Does it explain barriers, not only needs?</li>
              <li>Does it clarify responsibility, not only activities?</li>
              <li>Does it include safe evidence and realistic indicators?</li>
            </ul>
            <p className="m3-proposal-callout"><strong>Do not mark a section as ready only because it sounds polished. A strong section should show enough HRBA logic to guide safe and meaningful implementation.</strong></p>
          </article>
          <article className="m3-proposal-card">
            <h2>Safe practice</h2>
            <p>{proposalSafetyText}</p>
          </article>
        </section>

        <figure className="m3-proposal-support-strip">
          <img src={proposalAssets.sequence} alt="" aria-hidden="true" />
        </figure>

        <section className="m3-proposal-builder" aria-labelledby={`${screen.id}-builder`}>
          <div className="m3-proposal-builder-head">
            <div>
              <h2 id={`${screen.id}-builder`}>Review the Jiru Amba draft plan</h2>
              <p>Read each section. For each section, choose <strong>Ready for now</strong> or <strong>Needs HRBA gap check</strong>.</p>
            </div>
            <div className="m3-proposal-progress" aria-live="polite">
              <strong>{proposalSections.filter((section) => review[section.id]).length} of 8 marked</strong>
              <span>{needsCount} marked Needs HRBA check</span>
            </div>
          </div>
          <div className="m3-proposal-section-list">
            {proposalSections.map((section) => {
              const selected = review[section.id];
              const hintId = `${screen.id}-${section.id}-hint`;
              return (
                <article className="m3-proposal-section-card" key={section.id}>
                  <div className="m3-proposal-section-title">
                    <span>Section {section.number}</span>
                    <h3>{section.title}</h3>
                  </div>
                  <blockquote>{section.excerpt}</blockquote>
                  <button type="button" className="m3-proposal-link-button" aria-expanded={Boolean(openHints[section.id])} aria-controls={hintId} onClick={() => setOpenHints((prev) => ({ ...prev, [section.id]: !prev[section.id] }))}>
                    {openHints[section.id] ? 'Hide What to notice' : 'Show What to notice'}
                  </button>
                  {openHints[section.id] && <p id={hintId} className="m3-proposal-hint"><strong>What to notice:</strong> {section.notice}</p>}
                  <fieldset className="m3-proposal-choice-fieldset">
                    <legend>Review choice for {section.title}</legend>
                    <div className="m3-proposal-segmented">
                      <button type="button" className={`m3-proposal-choice${selected === 'readyForNow' ? ' is-selected' : ''}`} aria-pressed={selected === 'readyForNow'} onClick={() => updateReview(section.id, 'readyForNow')}>
                        <span aria-hidden="true">{selected === 'readyForNow' ? '✓' : '○'}</span>
                        <strong>Ready for now</strong>
                      </button>
                      <button type="button" className={`m3-proposal-choice${selected === 'needsHrbaCheck' ? ' is-selected' : ''}`} aria-pressed={selected === 'needsHrbaCheck'} onClick={() => updateReview(section.id, 'needsHrbaCheck')}>
                        <span aria-hidden="true">{selected === 'needsHrbaCheck' ? '✓' : '○'}</span>
                        <strong>Needs HRBA check</strong>
                      </button>
                    </div>
                  </fieldset>
                </article>
              );
            })}
          </div>
          <div className="m3-proposal-submit-row">
            <button type="button" className="m3-proposal-submit" onClick={submitReview}>{submittedOutput && stale ? 'Update review preview' : 'Generate draft plan review preview'}</button>
            <p aria-live="polite">{stale ? 'Your selections changed. Update your review preview before continuing.' : helper}</p>
          </div>
        </section>

        {!submittedOutput && (
          <aside className="m3-proposal-empty-preview">
            <div>
              <h2>Proposal review preview</h2>
              <p>Your selected sections for HRBA gap checking will appear here after you generate the review preview.</p>
            </div>
            <img src={proposalAssets.screen17Empty} alt="" aria-hidden="true" />
          </aside>
        )}

        {submittedOutput && (
          <section className="m3-proposal-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputHeadingRef} tabIndex={-1}>Your Draft Plan Review Preview</h2>
            <p>Based on your review, this preview shows which draft plan sections need deeper HRBA gap checking in the next screen. This is a learning output, not a final proposal assessment.</p>
            <div className="m3-proposal-output-grid">
              <article>
                <h3>1. Sections marked for HRBA gap check</h3>
                {submittedOutput.proposalReviewSections.needsHrbaCheck.length > 0 ? (
                  <ul>{submittedOutput.proposalReviewSections.needsHrbaCheck.map((sectionId) => <li key={sectionId}>{getProposalSection(sectionId).title}</li>)}</ul>
                ) : (
                  <p>No sections selected.</p>
                )}
              </article>
              <article>
                <h3>2. Sections ready for now</h3>
                <ul>{submittedOutput.proposalReviewSections.readyForNow.map((sectionId) => <li key={sectionId}>{getProposalSection(sectionId).title}</li>)}</ul>
              </article>
              <article>
                <h3>3. Why these sections need attention</h3>
                <p>{submittedOutput.draftPlanReviewPreview.whyTheseSectionsNeedAttention}</p>
              </article>
              <article>
                <h3>4. What to do next in Screen 18</h3>
                <p>{submittedOutput.draftPlanReviewPreview.whatToDoNext}</p>
              </article>
            </div>
            <div className="m3-proposal-feedback-list"><p>{submittedOutput.draftPlanReviewPreview.feedbackMessage}</p></div>
          </section>
        )}

        <section className="m3-proposal-card m3-proposal-own-cso">
          <h2>Apply this idea to your own CSO draft plan</h2>
          <p>Use this optional practice tool to review one section of your own draft plan safely. Do not paste sensitive proposal text. Use a short, generalized summary.</p>
          <div className="m3-proposal-own-grid">
            <label>Plan section<input value={ownCsoDraft.planSection} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, planSection: event.target.value }))} placeholder="Example: problem statement, target group section, activity package, indicators." /></label>
            <label>Does it need HRBA gap check?<select value={ownCsoDraft.decision} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, decision: event.target.value as ProposalReviewStatus }))}><option value="">Choose one</option><option value="readyForNow">Ready for now</option><option value="needsHrbaCheck">Needs HRBA gap check</option></select></label>
            <label>Short generalized summary<textarea value={ownCsoDraft.summary} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, summary: event.target.value }))} placeholder="Summarize the section without names, exact locations, complaints, or sensitive details." /></label>
            <label>Why?<textarea value={ownCsoDraft.why} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, why: event.target.value }))} placeholder="What HRBA logic is visible or missing?" /></label>
          </div>
          <button type="button" className="m3-proposal-submit" onClick={generateOwnCsoReview}>Generate my draft section review</button>
          {ownCsoError && <p className="m3-proposal-error" role="alert">{ownCsoError}</p>}
          {ownCsoOutput && <div className="m3-proposal-own-output"><h3>My draft section review</h3><p><strong>{ownCsoOutput.planSection}:</strong> {ownCsoOutput.generatedNote}</p><p>{ownCsoOutput.why}</p></div>}
        </section>

        <section className="m3-proposal-card m3-proposal-template">
          <h2>Draft Plan Review Template</h2>
          <div className="m3-proposal-template-actions">
            <button type="button" className="m3-proposal-submit" onClick={() => downloadDesignRepairTemplate(draftPlanReviewTemplateMarkdown, 'draft-plan-review-template', 'docx')}>Download Draft Plan Review Template</button>
            <button type="button" className="m3-proposal-submit" onClick={() => downloadDesignRepairTemplate(draftPlanReviewTemplateMarkdown, 'draft-plan-review-template', 'md')}>Download markdown copy</button>
          </div>
        </section>

        <div className="m3-proposal-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ draftPlanReviewPreview: submittedOutput.draftPlanReviewPreview, proposalReviewSections: submittedOutput.proposalReviewSections, screen17: { ...submittedOutput, ownCsoPracticeOutput: ownCsoOutput } })}>
            {canContinue ? screen.continueLabel : 'Generate preview to continue'}
          </PrimaryButton>
        </div>
      </article>
    </main>
  );
}

function ProposalGapMapScreen({ screen, state, onComplete }: {
  screen: Module3RevisedScreen;
  state: LearningState;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const titleId = `${screen.id}-title`;
  const outputHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const previousReview = getScreen17SavedOutput(state);
  const [gapsBySection, setGapsBySection] = useState<Partial<Record<ProposalSectionId, ProposalGapId[]>>>({});
  const [openExcerpts, setOpenExcerpts] = useState<Partial<Record<ProposalSectionId, boolean>>>({});
  const [submittedOutput, setSubmittedOutput] = useState<Screen18Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState('');
  const [helper, setHelper] = useState('Please tag at least three proposal sections and select at least five HRBA gaps across the plan.');
  const [ownCsoDraft, setOwnCsoDraft] = useState<Screen18OwnCsoDraft>(getEmptyScreen18OwnCsoDraft());
  const [ownCsoOutput, setOwnCsoOutput] = useState<Screen18OwnCsoOutput | undefined>();
  const [ownCsoError, setOwnCsoError] = useState('');
  const [showHero, setShowHero] = useState(true);
  const currentSignature = getGapMapSignature(gapsBySection);
  const stale = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const selectedSections = getSelectedGapSections(gapsBySection);
  const totalGaps = getTotalGapCount(gapsBySection);
  const submittedGapSections = submittedOutput ? getSelectedGapSections(submittedOutput.proposalGapMap.gapsBySection) : [];
  const canContinue = Boolean(submittedOutput && isScreen18Valid(gapsBySection) && !stale);

  function toggleGap(sectionId: ProposalSectionId, gapId: ProposalGapId) {
    setGapsBySection((prev) => {
      const current = prev[sectionId] || [];
      const next = current.includes(gapId) ? current.filter((id) => id !== gapId) : [...current, gapId];
      if (next.length > 3) {
        setHelper('Choose up to three HRBA gap tags per selected section so the map stays prioritized.');
        return prev;
      }
      return { ...prev, [sectionId]: next };
    });
    if (submittedOutput) setHelper('Your gap selections changed. Update your proposal gap map before continuing.');
  }

  function submitGapMap() {
    if (selectedSections.length < 3) {
      setHelper('Please tag at least three proposal sections. HRBA gaps are often spread across the plan.');
      return;
    }
    if (totalGaps < 5) {
      setHelper('Please select at least five HRBA gaps across the plan so the gap map can identify repair priorities.');
      return;
    }
    if (isScreen18OverTagged(gapsBySection)) {
      setHelper('This map may be trying to tag everything. Choose the gaps that would most weaken the proposal if left unchanged.');
      return;
    }
    const clean = Object.fromEntries(proposalSections.map((section) => [section.id, gapsBySection[section.id] || []])) as Partial<Record<ProposalSectionId, ProposalGapId[]>>;
    const output = buildScreen18Submission(clean, ownCsoOutput);
    setSubmittedOutput(output);
    setSubmittedSignature(getGapMapSignature(clean));
    setHelper(hasScreen18EvidenceGap(clean) ? 'Your HRBA gap map is ready to save.' : 'Your map is generated. Also check the monitoring and evidence section before you use this in real design work.');
    if (typeof window !== 'undefined') window.setTimeout(() => outputHeadingRef.current?.focus(), 0);
  }

  function toggleOwnCsoGap(gapId: ProposalGapId) {
    setOwnCsoDraft((prev) => ({
      ...prev,
      gaps: prev.gaps.includes(gapId) ? prev.gaps.filter((id) => id !== gapId) : [...prev.gaps, gapId],
    }));
  }

  function generateOwnCsoGapNote() {
    const values = [ownCsoDraft.planSection, ownCsoDraft.summary, ownCsoDraft.whyThisMatters, ownCsoDraft.recommendedRepairMove];
    if (!ownCsoDraft.planSection.trim() || !ownCsoDraft.summary.trim() || ownCsoDraft.gaps.length === 0 || !ownCsoDraft.whyThisMatters.trim() || !ownCsoDraft.recommendedRepairMove.trim() || hasUnsafeProposalPracticeDetail(values)) {
      setOwnCsoError('Use a safe generalized summary only. Do not paste names, exact locations, complaint details, disability or medical details, survivor stories, accusations, or identifiable information.');
      return;
    }
    setOwnCsoOutput({ ...ownCsoDraft, generatedNote: 'This gap note can help you choose whether the section needs focused repair before implementation.' });
    setOwnCsoError('');
  }

  return (
    <main className="m3-screen m3-proposal-screen" aria-labelledby={titleId}>
      <article className="m3-proposal-shell">
        <header className="m3-proposal-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-proposal-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <p>Identify the proposal gaps that weaken rights-holder focus, responsibility, participation, accountability, risk, and evidence.</p>
        </header>

        <section className="m3-proposal-hero">
          <div className="m3-proposal-card">
            <h2>HRBA gaps are often spread across the proposal</h2>
            <p>A weak HRBA design is not always obvious. The proposal may mention women, youth, persons with disabilities, participation, and accountability, but still fail to show how rights-holders influence decisions, how duty-bearers respond, how barriers are reduced, and how risks are managed.</p>
            <p>A strong HRBA gap map helps you decide what to repair first.</p>
            <div className="m3-proposal-safe-note">
              <h3>Safe practice reminder</h3>
              <p>Use the Jiru Amba learning case only. Do not enter names, exact locations, complaints, incidents, confidential proposal details, or information that could identify people.</p>
            </div>
          </div>
          <figure className="m3-proposal-visual">
            {showHero && <img src={proposalAssets.screen18Hero.src} alt={proposalAssets.screen18Hero.alt} onError={() => setShowHero(false)} />}
          </figure>
        </section>

        <section className="m3-proposal-card">
          <h2>The purpose of this activity</h2>
          <p>HRBA gaps are often spread across the proposal. Use this activity to identify the gaps that weaken the Jiru Amba draft plan. Do not tag every possible issue. Focus on the gaps that would most weaken the proposal if left unchanged.</p>
        </section>

        <section className="m3-proposal-builder" aria-labelledby={`${screen.id}-builder`}>
          <div className="m3-proposal-builder-head">
            <div>
              <h2 id={`${screen.id}-builder`}>Tag the HRBA gaps in the Jiru Amba draft plan</h2>
              <p>For each selected section, choose up to three HRBA gap tags. Choose the gaps that would most weaken the plan if left unchanged.</p>
            </div>
            <div className="m3-proposal-progress" aria-live="polite">
              <strong>{selectedSections.length} sections tagged</strong>
              <span>{totalGaps} total gap tags</span>
            </div>
          </div>
          <div className="m3-proposal-gap-list">
            {proposalSections.map((section) => {
              const selectedGapIds = gapsBySection[section.id] || [];
              const markedPreviously = previousReview?.proposalReviewSections.needsHrbaCheck.includes(section.id);
              const excerptId = `${screen.id}-${section.id}-excerpt`;
              const gapGroupId = `${screen.id}-${section.id}-gap-tags`;
              return (
                <article key={section.id} className={`m3-proposal-gap-card${markedPreviously ? ' is-recommended' : ''}`}>
                  <div className="m3-proposal-section-title">
                    <span>Section {section.number}</span>
                    <h3>{section.title}</h3>
                  </div>
                  {markedPreviously && <p className="m3-proposal-status-label">Marked for HRBA check in previous screen.</p>}
                  <p>{openExcerpts[section.id] ? section.excerpt : `${section.excerpt.slice(0, 168)}...`}</p>
                  <p className="m3-proposal-hint"><strong>Guidance question:</strong> {section.notice}</p>
                  <p className="m3-proposal-hint"><strong>Suggested strong gap tags:</strong> {section.suggestedGapIds.map((gapId) => getProposalGap(gapId).label).join('; ')}.</p>
                  <button type="button" className="m3-proposal-link-button" aria-expanded={Boolean(openExcerpts[section.id])} aria-controls={excerptId} onClick={() => setOpenExcerpts((prev) => ({ ...prev, [section.id]: !prev[section.id] }))}>
                    {openExcerpts[section.id] ? 'Hide full excerpt' : 'Show full excerpt'}
                  </button>
                  <div id={excerptId} className="m3-proposal-sr-only">{openExcerpts[section.id] ? section.excerpt : `${section.title} excerpt is collapsed.`}</div>
                  <fieldset className="m3-proposal-gap-fieldset" aria-labelledby={gapGroupId}>
                    <legend id={gapGroupId}>Gap tags for {section.title}</legend>
                    <div className="m3-proposal-gap-chip-grid">
                    {proposalGaps.map((gap) => {
                      const selected = selectedGapIds.includes(gap.id);
                      return (
                        <button key={gap.id} type="button" className={`m3-proposal-chip${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => toggleGap(section.id, gap.id)}>
                          <span aria-hidden="true">{selected ? '✓' : '+'}</span>
                          <strong>{gap.label}</strong>
                          <small>{gap.explanation}</small>
                        </button>
                      );
                    })}
                    </div>
                  </fieldset>
                </article>
              );
            })}
          </div>
          <div className="m3-proposal-submit-row">
            <button type="button" className="m3-proposal-submit" onClick={submitGapMap}>{submittedOutput && stale ? 'Update gap map' : 'Generate HRBA gap map'}</button>
            <p aria-live="polite">{stale ? 'Your gap selections changed. Update your proposal gap map before continuing.' : helper}</p>
          </div>
        </section>

        {!submittedOutput && (
          <aside className="m3-proposal-empty-preview">
            <div>
              <h2>HRBA gap map preview</h2>
              <p>Your selected proposal sections and gap tags will appear here as a live map after generation.</p>
            </div>
            <img src={proposalAssets.screen18Empty} alt="" aria-hidden="true" />
          </aside>
        )}

        {submittedOutput && (
          <section className="m3-proposal-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputHeadingRef} tabIndex={-1}>Your HRBA Gap Map Across the Plan</h2>
            <p>Based on your tags, this gap map shows where the draft plan is weakest from an HRBA design perspective. Use it to choose one high-priority section for repair in the next screen.</p>
            <div className="m3-proposal-map">
              {submittedOutput.proposalGapMap.cards.map((card) => (
                <article key={card.sectionId} className="m3-proposal-map-card">
                  <h3>Proposal section: {getProposalSection(card.sectionId).title}</h3>
                  <h4>Selected HRBA gaps</h4>
                  <div className="m3-proposal-chip-row">
                    {card.selectedGaps.map((gapId) => (
                      <span key={gapId}><strong>{getProposalGap(gapId).label}</strong> · Needs repair</span>
                    ))}
                  </div>
                  <h4>Why this matters</h4>
                  <p>{card.whyThisMatters}</p>
                  <h4>Repair priority</h4>
                  <p><strong>{card.repairPriority}</strong></p>
                  <h4>Recommended repair move</h4>
                  <p>{card.recommendedRepairMove}</p>
                  <h4>Carry-forward to Screen 19</h4>
                  <p>{card.carryForward}</p>
                </article>
              ))}
            </div>
            <p className="m3-proposal-plain-summary">Text summary: {submittedGapSections.map((section) => `${section.title}: ${(submittedOutput.proposalGapMap.gapsBySection[section.id] || []).map((gapId) => getProposalGap(gapId).label).join(', ')}`).join('; ')}. Repair priority: {getProposalSection(submittedOutput.proposalGapMap.repairPriority).title}.</p>
            <section className="m3-proposal-priority">
              <h3>Suggested repair priority</h3>
              <p>Suggested repair priority: <strong>{getProposalSection(submittedOutput.proposalGapMap.repairPriority).title}</strong>. This section is a good repair choice because it can improve several HRBA elements at once.</p>
            </section>
            {submittedOutput.patternFeedback.length > 0 && <div className="m3-proposal-feedback-list">{submittedOutput.patternFeedback.map((message) => <p key={message}>✓ {message}</p>)}</div>}
            <section className="m3-proposal-carry-forward">
              <h3>Carry-forward</h3>
              <p>Choose one section from your gap map and repair it. Do not try to rewrite the whole proposal. A focused repair is stronger than a long unfocused rewrite.</p>
            </section>
          </section>
        )}

        <section className="m3-proposal-card m3-proposal-own-cso">
          <h2>Apply this idea to your own CSO draft plan</h2>
          <p>Use this optional practice tool to identify HRBA gaps in one safe, generalized section summary from your own draft plan. Do not paste sensitive proposal text.</p>
          <div className="m3-proposal-own-grid">
            <label>Plan section<input value={ownCsoDraft.planSection} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, planSection: event.target.value }))} placeholder="Example: activity package or monitoring section." /></label>
            <label>Short generalized section summary<textarea value={ownCsoDraft.summary} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, summary: event.target.value }))} placeholder="Summarize without names, exact locations, complaints, or sensitive details." /></label>
            <label>Why this matters<textarea value={ownCsoDraft.whyThisMatters} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, whyThisMatters: event.target.value }))} placeholder="Why would this gap weaken the plan?" /></label>
            <label>Recommended repair move<textarea value={ownCsoDraft.recommendedRepairMove} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, recommendedRepairMove: event.target.value }))} placeholder="What design repair would help?" /></label>
          </div>
          <fieldset className="m3-proposal-choice-fieldset">
            <legend>Selected HRBA gaps</legend>
            <div className="m3-proposal-gap-chip-grid">{proposalGaps.map((gap) => <button key={gap.id} type="button" className={`m3-proposal-chip${ownCsoDraft.gaps.includes(gap.id) ? ' is-selected' : ''}`} aria-pressed={ownCsoDraft.gaps.includes(gap.id)} onClick={() => toggleOwnCsoGap(gap.id)}><span aria-hidden="true">{ownCsoDraft.gaps.includes(gap.id) ? '✓' : '+'}</span><strong>{gap.label}</strong></button>)}</div>
          </fieldset>
          <button type="button" className="m3-proposal-submit" onClick={generateOwnCsoGapNote}>Generate my HRBA gap note</button>
          {ownCsoError && <p className="m3-proposal-error" role="alert">{ownCsoError}</p>}
          {ownCsoOutput && <div className="m3-proposal-own-output"><h3>My HRBA gap note</h3><p><strong>{ownCsoOutput.planSection}:</strong> {ownCsoOutput.generatedNote}</p><p>{ownCsoOutput.gaps.map((gapId) => getProposalGap(gapId).label).join(', ')}</p></div>}
        </section>

        <section className="m3-proposal-card m3-proposal-template">
          <h2>HRBA Gap Map Template</h2>
          <div className="m3-proposal-template-actions">
            <button type="button" className="m3-proposal-submit" onClick={() => downloadDesignRepairTemplate(hrbaGapMapTemplateMarkdown, 'hrba-gap-map-template', 'docx')}>Download HRBA Gap Map Template</button>
            <button type="button" className="m3-proposal-submit" onClick={() => downloadDesignRepairTemplate(hrbaGapMapTemplateMarkdown, 'hrba-gap-map-template', 'md')}>Download markdown copy</button>
          </div>
        </section>

        <div className="m3-proposal-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ hrbaGapMapAcrossPlan: submittedOutput.proposalGapMap, proposalGapMap: submittedOutput.proposalGapMap, screen18: { ...submittedOutput, ownCsoPracticeOutput: ownCsoOutput } })}>
            {canContinue ? screen.continueLabel : 'Map proposal gaps to continue'}
          </PrimaryButton>
        </div>
      </article>
    </main>
  );
}

function ProposalSectionRepairScreen({ screen, state, onComplete }: {
  screen: Module3RevisedScreen;
  state: LearningState;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const titleId = `${screen.id}-title`;
  const outputHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const previousMap = getScreen18SavedOutput(state);
  const suggestedSection = previousMap?.proposalGapMap.repairPriority || 'participationAccountabilityRisk';
  const sectionOrder = previousMap
    ? [
      ...proposalSections.filter((section) => (previousMap.proposalGapMap.gapsBySection[section.id] || []).length > 0),
      ...proposalSections.filter((section) => !(previousMap.proposalGapMap.gapsBySection[section.id] || []).length),
    ]
    : proposalSections;
  const [selectedSection, setSelectedSection] = useState<ProposalSectionId>(suggestedSection);
  const [selectedMoves, setSelectedMoves] = useState<RepairMoveId[]>([]);
  const [submittedOutput, setSubmittedOutput] = useState<Screen19Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState('');
  const [helper, setHelper] = useState('Select at least three repair moves before generating your repair canvas.');
  const [ownCsoDraft, setOwnCsoDraft] = useState<Screen19OwnCsoDraft>(getEmptyScreen19OwnCsoDraft());
  const [ownCsoOutput, setOwnCsoOutput] = useState<Screen19OwnCsoOutput | undefined>();
  const [ownCsoError, setOwnCsoError] = useState('');
  const [showHero, setShowHero] = useState(true);
  const currentSignature = getRepairSelectionSignature(selectedSection, selectedMoves);
  const stale = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const previousGaps = previousMap?.proposalGapMap.gapsBySection[selectedSection] || [];
  const hasResponsibilityRepair = selectedMoves.some((moveId) => ['clarifyDutyBearers', 'protectCsoRole', 'createInfluenceRoute', 'addSafeFeedback'].includes(moveId));
  const hasEvidenceRiskInclusionRepair = selectedMoves.some((moveId) => ['buildInInclusion', 'addRiskMitigation', 'strengthenIndicators', 'addImplementationWatchPoint'].includes(moveId));
  const canGenerate = selectedMoves.length >= 3 && hasResponsibilityRepair && hasEvidenceRiskInclusionRepair;
  const canContinue = Boolean(submittedOutput && canGenerate && !stale);

  function chooseSection(sectionId: ProposalSectionId) {
    setSelectedSection(sectionId);
    if (submittedOutput) setHelper('Your repair choices changed. Update your repair canvas before continuing.');
  }

  function toggleMove(moveId: RepairMoveId) {
    setSelectedMoves((prev) => {
      if (prev.includes(moveId)) return prev.filter((id) => id !== moveId);
      return [...prev, moveId];
    });
    if (submittedOutput) setHelper('Your repair choices changed. Update your repair canvas before continuing.');
  }

  function submitRepair() {
    if (!selectedSection) {
      setHelper('Please choose one plan section to repair. Use your gap map to select a high-priority section.');
      return;
    }
    if (selectedMoves.length < 3) {
      setHelper('Select at least three repair moves. A strong repair changes the design logic, not only the wording.');
      return;
    }
    if (!hasResponsibilityRepair) {
      setHelper('Add a responsibility or CSO role repair. The section should show who responds and avoid making Awra responsible for everything.');
      return;
    }
    if (!hasEvidenceRiskInclusionRepair) {
      setHelper('Add safe evidence, risk, inclusion, or implementation watch-point logic where relevant. A repaired section should be usable during implementation.');
      return;
    }
    const output = buildScreen19Submission(selectedSection, selectedMoves, previousGaps, ownCsoOutput);
    setSubmittedOutput(output);
    setSubmittedSignature(currentSignature);
    setHelper('Your repair canvas is ready to save.');
    if (typeof window !== 'undefined') window.setTimeout(() => outputHeadingRef.current?.focus(), 0);
  }

  function toggleOwnCsoRepairMove(moveId: RepairMoveId) {
    setOwnCsoDraft((prev) => ({
      ...prev,
      repairMoves: prev.repairMoves.includes(moveId) ? prev.repairMoves.filter((id) => id !== moveId) : [...prev.repairMoves, moveId],
    }));
  }

  function generateOwnCsoRepairCanvas() {
    const values = [ownCsoDraft.planSection, ownCsoDraft.weakSummary, ownCsoDraft.repairedVersion, ownCsoDraft.designChange, ownCsoDraft.implementationWatchPoint, ownCsoDraft.safeEvidenceNote];
    if (!ownCsoDraft.planSection.trim() || !ownCsoDraft.weakSummary.trim() || ownCsoDraft.repairMoves.length === 0 || !ownCsoDraft.repairedVersion.trim() || !ownCsoDraft.designChange.trim() || !ownCsoDraft.implementationWatchPoint.trim() || !ownCsoDraft.safeEvidenceNote.trim() || hasUnsafeProposalPracticeDetail(values)) {
      setOwnCsoError('Use a safe generalized summary only. Do not paste names, exact locations, complaint details, disability or medical details, survivor stories, accusations, or identifiable information.');
      return;
    }
    setOwnCsoOutput({ ...ownCsoDraft, generatedNote: 'This before/after canvas shows a design repair, not only wording polish.' });
    setOwnCsoError('');
  }

  return (
    <main className="m3-screen m3-proposal-screen" aria-labelledby={titleId}>
      <article className="m3-proposal-shell">
        <header className="m3-proposal-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-proposal-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <p>Choose one weak section from the draft plan and repair it using HRBA design logic. The goal is not to add rights words. The goal is to improve the design.</p>
        </header>

        <section className="m3-proposal-hero">
          <div className="m3-proposal-card">
            <h2>Repair does not mean adding HRBA words</h2>
            <p>A weak proposal section may already mention inclusion, participation, accountability, or rights. The repair is stronger when it changes the design logic.</p>
            <ul>
              <li>who holds rights;</li>
              <li>what barriers they face;</li>
              <li>who has responsibility;</li>
              <li>how rights-holders influence decisions;</li>
              <li>how feedback receives response;</li>
              <li>how gender and disability are built in;</li>
              <li>what risks are reduced;</li>
              <li>what evidence will show change.</li>
            </ul>
          </div>
          <figure className="m3-proposal-visual">
            {showHero && <img src={proposalAssets.screen19Hero.src} alt={proposalAssets.screen19Hero.alt} onError={() => setShowHero(false)} />}
          </figure>
        </section>

        <section className="m3-proposal-grid-two">
          <article className="m3-proposal-card">
            <h2>The purpose of this activity</h2>
            <p>Use your gap map to repair one section of the Jiru Amba draft plan. Keep the repair practical, safe, and realistic for a local CSO working with rights-holders, duty-bearers, and supporting actors.</p>
          </article>
          <article className="m3-proposal-card">
            <h2>Safe practice reminder</h2>
            <p>Use the Jiru Amba learning case only. Do not enter names, exact locations, complaints, incidents, confidential proposal details, or information that could identify people. Use constructive, evidence-based, risk-aware language.</p>
          </article>
        </section>

        <section className="m3-proposal-builder" aria-labelledby={`${screen.id}-builder`}>
          <div className="m3-proposal-builder-head">
            <div>
              <h2 id={`${screen.id}-builder`}>Step 1 — Choose one section</h2>
              <p>Choose one section from your gap map. Repairing one section well is better than rewriting the whole proposal.</p>
              {previousMap && (
                <p className="m3-proposal-priority-note">
                  Suggested repair priority from your gap map: <strong>{getProposalSection(suggestedSection).title}</strong>. This section is a focused place to repair because it can improve several HRBA elements at once.
                </p>
              )}
            </div>
            <div className="m3-proposal-progress" aria-live="polite">
              <strong>{selectedMoves.length} repair moves selected</strong>
              <span>Choose at least 3 moves</span>
            </div>
          </div>
          <div className="m3-proposal-section-picker">
            {sectionOrder.map((section) => {
              const selected = selectedSection === section.id;
              const suggested = section.id === suggestedSection;
              return (
                <button key={section.id} type="button" className={`m3-proposal-section-pick${selected ? ' is-selected' : ''}${suggested ? ' is-suggested' : ''}`} aria-pressed={selected} onClick={() => chooseSection(section.id)}>
                  <span aria-hidden="true">{selected ? '✓' : '○'}</span>
                  <strong>{section.title}</strong>
                  {suggested && <small>Suggested from your gap map.</small>}
                </button>
              );
            })}
          </div>

          <article className="m3-proposal-card m3-proposal-weak-version">
            <h2>Weak version from the draft</h2>
            <blockquote>{getProposalSection(selectedSection).excerpt}</blockquote>
          </article>

          <fieldset className="m3-proposal-choice-fieldset">
            <legend>Step 2 — Choose repair moves</legend>
            <p>Select at least three repair moves. Include responsibility or CSO role logic and safe evidence, risk, inclusion, or implementation watch-point logic.</p>
            <div className="m3-proposal-repair-moves">
              {repairMoveGroups.map((group) => (
                <section key={group} className="m3-proposal-repair-group">
                  <h3>{group}</h3>
                  {repairMoves.filter((move) => move.group === group).map((move) => {
                    const selected = selectedMoves.includes(move.id);
                    return (
                      <button key={move.id} type="button" className={`m3-proposal-chip m3-proposal-repair-chip${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => toggleMove(move.id)}>
                        <span aria-hidden="true">{selected ? '✓' : '+'}</span>
                        <strong>{move.label}</strong>
                        <small>{move.explanation}</small>
                      </button>
                    );
                  })}
                </section>
              ))}
            </div>
          </fieldset>

          <div className="m3-proposal-submit-row">
            <button type="button" className="m3-proposal-submit" onClick={submitRepair}>{submittedOutput && stale ? 'Update repair canvas' : 'Generate before/after repair canvas'}</button>
            <p aria-live="polite">{stale ? 'Your repair choices changed. Update your repair canvas before continuing.' : helper}</p>
          </div>
        </section>

        {!submittedOutput && (
          <aside className="m3-proposal-empty-preview">
            <div>
              <h2>Before/after repair canvas preview</h2>
              <p>Your selected section, repair moves, stronger version, and implementation watch-point will appear here after generation.</p>
            </div>
            <img src={proposalAssets.screen19Empty} alt="" aria-hidden="true" />
          </aside>
        )}

        {submittedOutput && (
          <section className="m3-proposal-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputHeadingRef} tabIndex={-1}>Your Before/After Repair Canvas</h2>
            <p>Based on your selections, this canvas shows how one draft plan section can be repaired using HRBA design logic. It is a learning output and should be reviewed before use in a real proposal.</p>
            <div className="m3-proposal-repair-canvas">
              <article><span>1. Selected proposal section</span><h3>{getProposalSection(submittedOutput.proposalSectionRepair.selectedSection).title}</h3></article>
              <article><span>2. Weak version from the draft</span><p>{submittedOutput.proposalSectionRepair.beforeText}</p></article>
              <article>
                <span>3. Selected repair moves</span>
                <div className="m3-proposal-chip-row">{submittedOutput.proposalSectionRepair.selectedRepairMoves.map((moveId) => <span key={moveId}>{getRepairMove(moveId).label}</span>)}</div>
              </article>
              <article>
                <span>HRBA gaps selected</span>
                {submittedOutput.proposalSectionRepair.selectedGaps.length > 0 ? (
                  <div className="m3-proposal-chip-row">{submittedOutput.proposalSectionRepair.selectedGaps.map((gapId) => <span key={gapId}>{getProposalGap(gapId).label}</span>)}</div>
                ) : (
                  <p>No previous gap tags were found for this section. Use your selected repair moves as the basis for this repair.</p>
                )}
              </article>
              <article className="m3-proposal-after">
                <span>4. Repaired version</span>
                <p>{submittedOutput.proposalSectionRepair.repairedText}</p>
              </article>
              <article><span>5. Why the repaired version is stronger</span><p>{submittedOutput.proposalSectionRepair.whyStronger}</p></article>
              <article><span>6. What changed in the design</span><ul>{submittedOutput.proposalSectionRepair.designChanges.map((change) => <li key={change}>{change}</li>)}</ul></article>
              <article>
                <span>7. Implementation watch-point</span>
                <p>{submittedOutput.proposalSectionRepair.implementationWatchPoint}</p>
                <img className="m3-proposal-watch-strip" src={proposalAssets.watchStrip} alt="" aria-hidden="true" />
              </article>
              <article><span>8. Safe evidence note</span><p>{submittedOutput.proposalSectionRepair.safeEvidenceNote}</p></article>
              <article><span>9. Carry-forward to portfolio snapshot</span><p>{submittedOutput.proposalSectionRepair.carryForward}</p></article>
            </div>
            <div className="m3-proposal-feedback-list">{submittedOutput.feedbackMessages.map((message) => <p key={message}>✓ {message}</p>)}</div>
          </section>
        )}

        <section className="m3-proposal-card m3-proposal-own-cso">
          <h2>Apply this idea to your own CSO plan section</h2>
          <p>Use this optional practice tool to repair one safe, generalized section from your own project plan. Do not paste sensitive proposal text.</p>
          <div className="m3-proposal-own-grid">
            <label>Plan section<input value={ownCsoDraft.planSection} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, planSection: event.target.value }))} placeholder="Example: activity package or indicators." /></label>
            <label>Safe summary of weak version<textarea value={ownCsoDraft.weakSummary} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, weakSummary: event.target.value }))} /></label>
            <label>Repaired version<textarea value={ownCsoDraft.repairedVersion} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, repairedVersion: event.target.value }))} /></label>
            <label>What changed in the design<textarea value={ownCsoDraft.designChange} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, designChange: event.target.value }))} /></label>
            <label>Implementation watch-point<textarea value={ownCsoDraft.implementationWatchPoint} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, implementationWatchPoint: event.target.value }))} /></label>
            <label>Safe evidence note<textarea value={ownCsoDraft.safeEvidenceNote} onChange={(event) => setOwnCsoDraft((prev) => ({ ...prev, safeEvidenceNote: event.target.value }))} /></label>
          </div>
          <fieldset className="m3-proposal-choice-fieldset">
            <legend>Selected repair moves</legend>
            <div className="m3-proposal-gap-chip-grid">{repairMoves.map((move) => <button key={move.id} type="button" className={`m3-proposal-chip${ownCsoDraft.repairMoves.includes(move.id) ? ' is-selected' : ''}`} aria-pressed={ownCsoDraft.repairMoves.includes(move.id)} onClick={() => toggleOwnCsoRepairMove(move.id)}><span aria-hidden="true">{ownCsoDraft.repairMoves.includes(move.id) ? '✓' : '+'}</span><strong>{move.label}</strong></button>)}</div>
          </fieldset>
          <button type="button" className="m3-proposal-submit" onClick={generateOwnCsoRepairCanvas}>Generate my before/after repair canvas</button>
          {ownCsoError && <p className="m3-proposal-error" role="alert">{ownCsoError}</p>}
          {ownCsoOutput && <div className="m3-proposal-own-output"><h3>My before/after repair canvas</h3><p><strong>{ownCsoOutput.planSection}:</strong> {ownCsoOutput.generatedNote}</p><p>{ownCsoOutput.designChange}</p></div>}
        </section>

        <section className="m3-proposal-card m3-proposal-template">
          <h2>Plan Section Repair Template</h2>
          <div className="m3-proposal-template-actions">
            <button type="button" className="m3-proposal-submit" onClick={() => downloadDesignRepairTemplate(planSectionRepairTemplateMarkdown, 'plan-section-repair-template', 'docx')}>Download Plan Section Repair Template</button>
            <button type="button" className="m3-proposal-submit" onClick={() => downloadDesignRepairTemplate(planSectionRepairTemplateMarkdown, 'plan-section-repair-template', 'md')}>Download markdown copy</button>
          </div>
        </section>

        <div className="m3-proposal-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ repairedPlanSection: submittedOutput.proposalSectionRepair, proposalSectionRepair: submittedOutput.proposalSectionRepair, screen19: { ...submittedOutput, ownCsoPracticeOutput: ownCsoOutput } })}>
            {canContinue ? screen.continueLabel : 'Repair one section to continue'}
          </PrimaryButton>
        </div>
      </article>
    </main>
  );
}

function AppliedKnowledgeCheckScreen({ screen, onComplete }: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [summary, setSummary] = useState<Screen20Submission | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewQueue, setReviewQueue] = useState<Screen20QuestionId[]>([]);
  const [completedReviewOfMissedQuestions, setCompletedReviewOfMissedQuestions] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLHeadingElement>(null);
  const question = reviewMode ? screen20Questions.find((item) => item.id === reviewQueue[currentIndex]) || screen20Questions[0] : screen20Questions[currentIndex];
  const selectedAnswer = answers[question.id] || '';
  const isChecked = Boolean(checkedQuestions[question.id]);
  const isCorrect = selectedAnswer === question.correctAnswer;
  const answeredCount = screen20Questions.filter((item) => checkedQuestions[item.id]).length;
  const allAnswered = answeredCount === screen20Questions.length;
  const currentSubmission = buildScreen20Submission(answers, completedReviewOfMissedQuestions);
  const canContinue = Boolean(summary && allAnswered && (summary.score >= 4 || summary.completedReviewOfMissedQuestions));

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    setCheckedQuestions((current) => ({ ...current, [question.id]: true }));
    window.setTimeout(() => feedbackRef.current?.focus(), 0);
  };

  const moveNext = () => {
    if (reviewMode) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < reviewQueue.length) {
        setCurrentIndex(nextIndex);
        return;
      }
      const finalSubmission = buildScreen20Submission(answers, true);
      setCompletedReviewOfMissedQuestions(true);
      setSummary({ ...finalSubmission, completedReviewOfMissedQuestions: true });
      setReviewMode(false);
      window.setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }

    if (currentIndex < screen20Questions.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }
    setSummary(currentSubmission);
    window.setTimeout(() => summaryRef.current?.focus(), 0);
  };

  const startMissedReview = () => {
    const missed = currentSubmission.missedQuestions as Screen20QuestionId[];
    setReviewQueue(missed);
    setReviewMode(true);
    setCurrentIndex(0);
    setSummary(null);
    setCheckedQuestions((current) => ({
      ...current,
      ...Object.fromEntries(missed.map((questionId) => [questionId, false])),
    }));
  };

  return (
    <main className="m3-screen m3-closing-screen" aria-labelledby={`${screen.id}-title`}>
      <article className="m3-closing-shell">
        <header className="m3-closing-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-closing-eyebrow">{screen.eyebrow}</p>
          <h1 id={`${screen.id}-title`}>Module 3 Applied Knowledge Check</h1>
          <p>You have reviewed and repaired a draft project design. Now check whether you can apply the same HRBA thinking to realistic proposal choices.</p>
          <p>This is not a memory test. Each question gives you a situation that could appear in real CSO project design work. Choose the strongest rights-based response.</p>
          <div className="m3-closing-safe-note">
            <strong>Safety note</strong>
            <p>Use the Jiru Amba learning case only. Do not enter or share real names, exact locations, complaints, incidents, confidential proposal details, or information that could identify people.</p>
          </div>
        </header>

        {!summary && (
          <section className="m3-closing-quiz-card" aria-labelledby={`${screen.id}-${question.id}`}>
            <div className="m3-closing-quiz-progress" aria-live="polite">
              {reviewMode ? `Review question ${currentIndex + 1} of ${reviewQueue.length}` : `Question ${currentIndex + 1} of 6`}
            </div>
            <h2 id={`${screen.id}-${question.id}`}>{question.title}</h2>
            <div className="m3-closing-scenario">
              <span>Scenario</span>
              <p>{question.scenario}</p>
            </div>
            <fieldset className="m3-closing-options">
              <legend>{question.prompt}</legend>
              {question.options.map((option) => {
                const selected = selectedAnswer === option.id;
                const status = isChecked && selected ? (isCorrect ? 'is-correct' : 'is-not-yet') : '';
                return (
                  <label key={option.id} className={`${selected ? 'is-selected' : ''} ${status}`}>
                    <input
                      type="radio"
                      name={`${screen.id}-${question.id}`}
                      value={option.id}
                      checked={selected}
                      disabled={isChecked}
                      onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                    />
                    <span>{option.id}. {option.text}</span>
                    {isChecked && selected && <strong>{isCorrect ? '✓ Correct' : '• Not yet'}</strong>}
                  </label>
                );
              })}
            </fieldset>

            {!isChecked ? (
              <button type="button" className="m3-closing-primary" disabled={!selectedAnswer} onClick={checkAnswer}>
                Check answer
              </button>
            ) : (
              <div className={`m3-closing-feedback ${isCorrect ? 'is-correct' : 'is-not-yet'}`} tabIndex={-1} ref={feedbackRef}>
                <h3>{isCorrect ? 'Correct' : 'Not yet'}</h3>
                <p>{question.feedback}</p>
                <p><strong>Design reminder:</strong> {question.designReminder}</p>
                <button type="button" className="m3-closing-primary" onClick={moveNext}>
                  {reviewMode && currentIndex === reviewQueue.length - 1 ? 'Finish missed-question review' : currentIndex === screen20Questions.length - 1 && !reviewMode ? 'Show summary' : 'Next question'}
                </button>
              </div>
            )}
          </section>
        )}

        {summary && (
          <section className="m3-closing-summary" aria-live="polite" aria-labelledby={`${screen.id}-summary`}>
            <h2 id={`${screen.id}-summary`} ref={summaryRef} tabIndex={-1}>Your applied knowledge check summary</h2>
            <p className="m3-closing-score">Score: {summary.score} of 6</p>
            <p>{getScreen20ScoreMessage(summary.score)}</p>
            <div className="m3-closing-summary-grid">
              <article>
                <h3>Strong areas</h3>
                {summary.correctAnswers.length > 0 ? (
                  <ul>{screen20Questions.filter((item) => summary.correctAnswers.includes(item.id)).map((item) => <li key={item.id}>{item.strongArea}</li>)}</ul>
                ) : (
                  <p>Use the missed-question review to strengthen these applied design decisions.</p>
                )}
              </article>
              <article>
                <h3>Review flags</h3>
                {summary.reviewFlags.length > 0 ? (
                  <ul>{summary.reviewFlags.map((flag) => <li key={flag}>{flag}</li>)}</ul>
                ) : (
                  <p>No review flags. Carry the full HRBA design logic into your snapshot.</p>
                )}
              </article>
            </div>
            <p className="m3-closing-carry">{screen20CarryForward}</p>
            {summary.score < 4 && !summary.completedReviewOfMissedQuestions && (
              <button type="button" className="m3-closing-secondary" onClick={startMissedReview}>
                Retry missed questions
              </button>
            )}
          </section>
        )}

        <div className="m3-closing-actions">
          <PrimaryButton
            disabled={!canContinue}
            onClick={() => summary && onComplete({ appliedKnowledgeCheck: summary, screen20: summary })}
          >
            {canContinue ? screen.continueLabel : 'Complete the applied check'}
          </PrimaryButton>
        </div>
      </article>
    </main>
  );
}

function PortfolioSnapshotScreen({
  screen,
  state,
  onSaveSnapshot,
  onComplete,
}: {
  screen: Module3RevisedScreen;
  state: LearningState;
  onSaveSnapshot: (snapshot: M3PortfolioSnapshot) => void;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const defaults = getDefaultSnapshotValues(state);
  const savedSnapshot = getScreen21SavedSnapshot(state);
  const knowledgeCheck = getScreen20SavedOutput(state);
  const [values, setValues] = useState<Record<SnapshotFieldId, string>>(() => {
    const initialValues = { ...defaults };
    if (savedSnapshot) {
      flattenSnapshotFields().forEach((field) => {
        initialValues[field.id] = savedSnapshot[field.id] || initialValues[field.id];
      });
    }
    return initialValues;
  });
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => ({ [snapshotSections[0].id]: true }));
  const [reviewedSections, setReviewedSections] = useState<string[]>(savedSnapshot ? snapshotSections.map((section) => section.id) : [snapshotSections[0].id]);
  const [implementationWatchPoint, setImplementationWatchPoint] = useState(savedSnapshot?.implementationWatchPoint || '');
  const [editedFields, setEditedFields] = useState<string[]>(savedSnapshot?.learnerEditedFields || []);
  const [localSavedSnapshot, setLocalSavedSnapshot] = useState<M3PortfolioSnapshot | null>(savedSnapshot);
  const [lastSavedSignature, setLastSavedSignature] = useState<string | null>(
    savedSnapshot ? JSON.stringify({ values, implementationWatchPoint: savedSnapshot.implementationWatchPoint }) : null,
  );
  const [saveMessage, setSaveMessage] = useState(savedSnapshot ? 'Saved to My Portfolio: Module 3 HRBA Project Design Improvement Snapshot.' : '');
  const saveRef = useRef<HTMLParagraphElement>(null);
  const currentSignature = JSON.stringify({ values, implementationWatchPoint });
  const allSectionsReviewed = snapshotSections.every((section) => reviewedSections.includes(section.id));
  const isSavedCurrent = Boolean(lastSavedSignature && lastSavedSignature === currentSignature);
  const canContinue = allSectionsReviewed && Boolean(implementationWatchPoint) && isSavedCurrent;
  const staleAfterSave = Boolean(lastSavedSignature && lastSavedSignature !== currentSignature);
  const reviewFlags = knowledgeCheck?.reviewFlags || savedSnapshot?.knowledgeCheckReviewFlags || [];

  const markReviewed = (sectionId: string) => {
    setReviewedSections((current) => current.includes(sectionId) ? current : [...current, sectionId]);
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((current) => ({ ...current, [sectionId]: !current[sectionId] }));
    markReviewed(sectionId);
  };

  const updateField = (fieldId: SnapshotFieldId, value: string) => {
    setValues((current) => ({ ...current, [fieldId]: value }));
    setEditedFields((current) => current.includes(fieldId) ? current : [...current, fieldId]);
    if (lastSavedSignature) setSaveMessage('Your snapshot changed. Save the updated version before continuing.');
  };

  const saveSnapshot = () => {
    const snapshot: M3PortfolioSnapshot = {
      projectIssueOrSection: values.projectIssueOrSection,
      rightsStandards: values.rightsStandards,
      specificRightsHolders: values.specificRightsHolders,
      keyBarriers: values.keyBarriers,
      dutyBearersSupportingActors: values.dutyBearersSupportingActors,
      csoRole: values.csoRole,
      powerCapacityGaps: values.powerCapacityGaps,
      genderDisabilityConsiderations: values.genderDisabilityConsiderations,
      participationAccountabilityImprovement: values.participationAccountabilityImprovement,
      riskDoNoHarmCheck: values.riskDoNoHarmCheck,
      objectiveActivityRepair: values.objectiveActivityRepair,
      evidenceIndicatorImprovement: values.evidenceIndicatorImprovement,
      safeFirstDesignChange: values.safeFirstDesignChange,
      implementationWatchPoint,
      knowledgeCheckReviewFlags: reviewFlags,
      sourceScreensUsed: getSnapshotSourceScreensUsed(state),
      learnerEditedFields: editedFields,
      savedAt: new Date().toISOString(),
    };
    const signature = JSON.stringify({ values, implementationWatchPoint });
    setLastSavedSignature(signature);
    setSaveMessage('Saved to My Portfolio: Module 3 HRBA Project Design Improvement Snapshot.');
    setLocalSavedSnapshot(snapshot);
    onSaveSnapshot(snapshot);
    window.setTimeout(() => saveRef.current?.focus(), 0);
  };

  return (
    <main className="m3-screen m3-closing-screen" aria-labelledby={`${screen.id}-title`}>
      <article className="m3-closing-shell m3-closing-portfolio">
        <header className="m3-closing-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-closing-eyebrow">{screen.eyebrow}</p>
          <h1 id={`${screen.id}-title`}>My HRBA Project Design Improvement Snapshot</h1>
          <p>This is your Module 3 portfolio artifact. Earlier outputs have been gathered into one editable snapshot so you can carry the strongest design-improvement points into Module 4.</p>
          <div className="m3-closing-safe-note">
            <strong>Safe-use note</strong>
            <p>{screen21SafetyNote}</p>
          </div>
        </header>

        <div className="m3-closing-snapshot-layout">
          <aside className="m3-closing-snapshot-side">
            <h2>Snapshot progress</h2>
            <p><strong>{reviewedSections.length} of 6</strong> sections reviewed</p>
            <p className={isSavedCurrent ? 'm3-closing-status is-saved' : 'm3-closing-status'}>{isSavedCurrent ? '✓ Saved' : staleAfterSave ? '• Needs save' : '• Needs review'}</p>
            {reviewFlags.length > 0 && (
              <section>
                <h3>Your knowledge check suggested paying attention to...</h3>
                <ul>{reviewFlags.map((flag) => <li key={flag}>{flag}</li>)}</ul>
              </section>
            )}
          </aside>

          <section className="m3-closing-accordion" aria-label="Portfolio snapshot sections">
            {snapshotSections.map((section) => {
              const expanded = Boolean(openSections[section.id]);
              const reviewed = reviewedSections.includes(section.id);
              const panelId = `${screen.id}-${section.id}`;
              return (
                <article key={section.id} className="m3-closing-accordion-item">
                  <button
                    type="button"
                    className="m3-closing-accordion-toggle"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => toggleSection(section.id)}
                  >
                    <span>{section.title}</span>
                    <strong>{reviewed ? 'Reviewed' : 'Needs edit'}</strong>
                  </button>
                  {expanded && (
                    <div id={panelId} className="m3-closing-accordion-panel">
                      {section.fields.map((field) => {
                        const textareaId = `${screen.id}-${field.id}`;
                        const metaId = `${textareaId}-meta`;
                        return (
                          <label key={field.id} htmlFor={textareaId} className="m3-closing-field">
                            <span>{field.label}</span>
                            <small>{field.prompt}</small>
                            <textarea
                              id={textareaId}
                              value={values[field.id]}
                              maxLength={field.maxLength}
                              placeholder={field.placeholder}
                              aria-describedby={metaId}
                              onChange={(event) => updateField(field.id, event.target.value)}
                            />
                            <span id={metaId} className="m3-closing-field-meta">{values[field.id].length}/{field.maxLength} characters · <strong>{field.source}</strong></span>
                            <details>
                              <summary>View source notes</summary>
                              <p>{field.sourceNotes}</p>
                            </details>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          </section>

          <aside className="m3-closing-save-panel" aria-live="polite">
            <h2>Implementation watch-point</h2>
            <p>Choose one final watch-point for Module 4.</p>
            <fieldset className="m3-closing-watch-options">
              <legend>One implementation watch-point for Module 4</legend>
              {implementationWatchPointOptions.map((option) => (
                <label key={option} className={implementationWatchPoint === option ? 'is-selected' : ''}>
                  <input
                    type="radio"
                    name={`${screen.id}-watch-point`}
                    value={option}
                    checked={implementationWatchPoint === option}
                    onChange={() => {
                      setImplementationWatchPoint(option);
                      if (lastSavedSignature) setSaveMessage('Your snapshot changed. Save the updated version before continuing.');
                    }}
                  />
                  <span>{implementationWatchPoint === option ? '✓ ' : ''}{option}</span>
                </label>
              ))}
            </fieldset>
            <div className="m3-closing-safe-note">
              <strong>Safe-use note</strong>
              <p>{screen21SafetyNote}</p>
            </div>
            <button type="button" className="m3-closing-primary" disabled={!allSectionsReviewed || !implementationWatchPoint} onClick={saveSnapshot}>
              Save to My Portfolio
            </button>
            <p ref={saveRef} tabIndex={-1} className="m3-closing-save-message" aria-live="polite">
              {saveMessage || (!allSectionsReviewed ? 'Open and review all six sections before saving.' : !implementationWatchPoint ? 'Select one implementation watch-point before saving.' : 'Ready to save your snapshot.')}
            </p>
          </aside>
        </div>

        <div className="m3-closing-actions">
          <PrimaryButton
            disabled={!canContinue}
            onClick={() => {
              onComplete({
                module3PortfolioSnapshot: localSavedSnapshot || {
                  ...values,
                  implementationWatchPoint,
                  knowledgeCheckReviewFlags: reviewFlags,
                  sourceScreensUsed: getSnapshotSourceScreensUsed(state),
                  learnerEditedFields: editedFields,
                  savedAt: new Date().toISOString(),
                },
              });
            }}
          >
            {canContinue ? screen.continueLabel : 'Complete your snapshot'}
          </PrimaryButton>
        </div>
      </article>
    </main>
  );
}

function Module3ClosureScreen({
  screen,
  state,
  onStartModule4,
  onReturnSnapshot,
}: {
  screen: Module3RevisedScreen;
  state: LearningState;
  onStartModule4: () => void;
  onReturnSnapshot: () => void;
}) {
  const snapshot = getScreen21SavedSnapshot(state);
  const saved = Boolean(snapshot);

  return (
    <main className="m3-screen m3-closing-screen" aria-labelledby={`${screen.id}-title`}>
      <article className="m3-closing-shell">
        <header className="m3-closing-header m3-closing-complete-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-closing-eyebrow">{screen.eyebrow}</p>
          <h1 id={`${screen.id}-title`}>Module 3 complete: ready to move from design to implementation</h1>
          <p>You have completed Module 3. You practiced reviewing a project design before implementation, finding hidden HRBA gaps, and repairing one section using rights-holders, barriers, responsibilities, participation, accountability, inclusion, risk, and evidence.</p>
          {saved ? (
            <div className="m3-closing-badges" aria-label="Module completion badges">
              <span>✓ Module 3 completed</span>
              <span>✓ HRBA Project Design Improvement Snapshot saved</span>
            </div>
          ) : (
            <div className="m3-closing-warning">
              <p><strong>Your Module 3 snapshot has not been saved yet.</strong> Return to the snapshot screen and save before starting Module 4.</p>
            </div>
          )}
        </header>

        <section className="m3-closing-achievements" aria-label="Module 3 achievements">
          {[
            ['You analyzed before activities', 'You looked beyond activities and asked who holds rights, who may be excluded, and what barriers shape the issue.'],
            ['You clarified responsibilities and risks', 'You checked duty-bearers, supporting actors, CSO role, power, capacity gaps, gender, disability, accountability, and do-no-harm.'],
            ['You repaired design logic', 'You strengthened proposal language, intervention logic, indicators, and one implementation watch-point.'],
          ].map(([title, text]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="m3-closing-transition">
          <h2>Module 4 transition</h2>
          <p>A rights-based design is only useful if it stays alive during implementation.</p>
          <p>In Module 4, you will use your design snapshot to check whether participation, accountability, inclusion, risk management, and duty-bearer engagement are actually happening during delivery.</p>
          <h3>Carry these into Module 4:</h3>
          <ul>
            <li>rights-holder and barrier analysis;</li>
            <li>duty-bearer and CSO role logic;</li>
            <li>gender and disability watch-points;</li>
            <li>participation and feedback pathway;</li>
            <li>risk and do-no-harm checks;</li>
            <li>repaired objective, activity, or proposal section;</li>
            <li>implementation watch-point.</li>
          </ul>
        </section>

        <div className="m3-closing-actions m3-closing-actions--split">
          <button type="button" className="m3-closing-primary" onClick={saved ? onStartModule4 : onReturnSnapshot}>
            {saved ? 'Start Module 4' : 'Return to snapshot'}
          </button>
          <button type="button" className="m3-closing-secondary" onClick={onReturnSnapshot}>
            Review Module 3 snapshot
          </button>
          <button type="button" className="m3-closing-secondary" onClick={onReturnSnapshot}>
            View My Portfolio
          </button>
        </div>
      </article>
    </main>
  );
}

function RootCauseCapacityGapScreen({ screen, onComplete }: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [selections, setSelections] = useState<Record<string, ProblemLayerId | undefined>>({});
  const [ownCsoDraft, setOwnCsoDraft] = useState<Screen10OwnCsoDraft>(getEmptyScreen10OwnCsoDraft());
  const [ownCsoOutput, setOwnCsoOutput] = useState<Screen10OwnCsoOutput | null>(null);
  const [ownCsoError, setOwnCsoError] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen10Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [showHeroImage, setShowHeroImage] = useState(true);
  const [showTemplateVisual, setShowTemplateVisual] = useState(true);
  const [showWorkedFlow, setShowWorkedFlow] = useState(true);
  const [activeStage, setActiveStage] = useState(1);
  const [applyTab, setApplyTab] = useState<'own' | 'downloads'>('own');
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const taskId = `${screen.id}-task`;
  const layerOrder: ProblemLayerId[] = ['visible', 'direct', 'root', 'capacity'];
  const classifiedCount = screen10Statements.filter((statement) => selections[statement.id]).length;
  const allClassified = classifiedCount === screen10Statements.length;
  const validationMessages = getScreen10ValidationMessages(selections);
  const currentSignature = JSON.stringify({ selections, ownCsoOutput });
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const previewGroups = getScreen10GroupedStatements(selections);
  const canGenerate = allClassified;
  const canContinue = Boolean(submittedOutput && allClassified && !formChanged);
  const submitLabel = submittedOutput && formChanged ? 'Update problem layers canvas' : 'Generate problem layers canvas';
  const helperText = !allClassified
    ? classifiedCount === 0
      ? 'Please classify the Jiru Amba statements before generating the problem layers canvas. A useful diagnosis needs visible signs, direct causes, root causes, and capacity gaps.'
      : `${classifiedCount} of ${screen10Statements.length} statements classified. Continue until all statements have a layer.`
    : submittedOutput && formChanged
      ? 'Update your problem layers canvas before saving this screen.'
    : submittedOutput && !formChanged
      ? 'Your problem layers canvas is ready to save.'
      : validationMessages[0] || 'Ready to generate your problem layers canvas.';
  const outputSelections = submittedOutput?.problemLayerSelections || [];
  const warnings = submittedOutput
    ? getScreen10Warnings(Object.fromEntries(submittedOutput.problemLayerSelections.map((selection) => [selection.statementId, selection.selectedLayer])))
    : [];

  const selectLayer = (statementId: string, layer: ProblemLayerId) => {
    setSelections((current) => ({ ...current, [statementId]: layer }));
  };

  const submitCanvas = () => {
    if (!canGenerate) return;
    const submission = buildScreen10Submission(selections, ownCsoOutput);
    setSubmittedOutput(submission);
    setSubmittedSignature(currentSignature);
    setActiveStage(4);
    if (typeof window !== 'undefined') {
      window.setTimeout(() => outputRef.current?.focus(), 0);
    }
  };

  const continueWithPayload = () => {
    if (!canContinue) return;
    const output = (formChanged ? buildScreen10Submission(selections, ownCsoOutput) : submittedOutput) || undefined;
    onComplete(output ? {
      ...output,
      rootCauseCapacityGapMap: output.rootCauseCapacityGapMap,
      module3: { screen10: output },
      screen10: output,
    } : undefined);
  };

  const updateOwnCsoDraft = (field: keyof Screen10OwnCsoDraft, value: string) => {
    setOwnCsoDraft((current) => ({ ...current, [field]: value }));
    setOwnCsoError('');
  };

  const generateOwnCsoMap = () => {
    const required = [
      ownCsoDraft.visibleSign,
      ownCsoDraft.directCause,
      ownCsoDraft.deeperRootCause,
      ownCsoDraft.capacityGap,
      ownCsoDraft.designImplication,
    ];
    if (required.some((value) => !value.trim())) {
      setOwnCsoError('A useful root-cause and capacity-gap map needs a visible sign, direct cause, deeper/root cause, capacity gap, and design implication.');
      return;
    }
    if (Object.values(ownCsoDraft).some((value) => hasUnsafeRootCauseDetail(value))) {
      setOwnCsoError('Before saving, remove names, exact sensitive locations, complaint details, survivor stories, accusations, confidential political details, or identifiable personal information. Keep this as a safe learning example.');
      return;
    }
    setOwnCsoOutput({ ...ownCsoDraft, generatedAt: new Date().toISOString() });
    setOwnCsoError('');
  };

  const downloadRootCauseTemplate = (format: 'docx' | 'md') => {
    if (typeof window === 'undefined') return;
    const content = format === 'docx' ? buildRootCauseCapacityGapTemplateHtml() : rootCauseCapacityGapTemplateMarkdown;
    const blob = new Blob([content], { type: format === 'docx' ? 'application/msword' : 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `root-cause-capacity-gap-map-template.${format}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const renderLayerHeading = (layer: ProblemLayerId, heading = problemLayerOutputLabels[layer]) => (
    <div className="m3-root-cause-map-layer-heading">
      <img src={problemLayerIcons[layer].src} alt={problemLayerIcons[layer].alt} />
      <span>
        <strong>{heading}</strong>
        <small>{problemLayerSubtitles[layer]}</small>
      </span>
    </div>
  );
  const rootCauseStages: GuidedWorkspaceStage[] = [
    { id: 1, label: 'Understand', complete: activeStage > 1 },
    { id: 2, label: 'Example', complete: activeStage > 2 },
    { id: 3, label: 'Practice', complete: Boolean(submittedOutput) || activeStage > 3 },
    { id: 4, label: 'Review canvas', complete: Boolean(submittedOutput) && activeStage > 4, unlocked: Boolean(submittedOutput) },
    { id: 5, label: 'Apply/Download', complete: canContinue, unlocked: Boolean(submittedOutput) },
  ];
  const selectedLayerSummaries = layerOrder.map((layer) => ({
    layer,
    label: problemLayerLabels[layer],
    count: previewGroups[layer].length,
  }));

  return (
    <main className="m3-screen m3-root-cause-map-screen" aria-labelledby={titleId}>
      <article className="m3-root-cause-map-shell">
        <header className="m3-root-cause-map-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-root-cause-map-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Root-Cause and Capacity-Gap Map</h1>
          <p className="m3-root-cause-map-subtitle">Look below visible problems to identify what keeps barriers in place and what capacities need strengthening.</p>
          <section className="m3-root-cause-map-concept" aria-labelledby={`${screen.id}-meaning`}>
            <h2 id={`${screen.id}-meaning`}>A visible problem is not always the real design problem</h2>
            <p>A visible problem tells you what you can see. A direct cause explains what produced the problem in the immediate situation. A root cause explains why the problem keeps happening. A capacity gap explains what rights-holders, duty-bearers, service actors, CSOs, or systems need in order to respond better.</p>
            <p>A strong HRBA project design should not only treat symptoms. It should strengthen the capacities, relationships, procedures, evidence, resources, and accountability conditions needed for rights-holders to participate, benefit, influence decisions, and receive response.</p>
            <p className="m3-root-cause-map-key-message">Do not jump directly from problem to activity. First ask what caused the problem, what keeps it in place, whose capacity matters, and what the design should change.</p>
            <div className="m3-root-cause-map-concept-chips">
              {['Visible sign', 'Direct cause', 'Deeper/root cause', 'Capacity gap', 'Design implication'].map((chip) => <span key={chip}>{chip}</span>)}
            </div>
          </section>
        </header>

        <GuidedWorkspaceStageNav
          stages={rootCauseStages}
          activeStage={activeStage}
          onSelect={setActiveStage}
        />

        {activeStage <= 2 && (
        <section className="m3-root-cause-map-orientation m3-guided-stage-card" aria-label="Root cause and capacity gap orientation">
          <section className="m3-root-cause-map-card m3-root-cause-map-purpose" aria-labelledby={`${screen.id}-purpose`}>
            <div>
              <h2 id={`${screen.id}-purpose`}>Purpose of this activity</h2>
              <p>After mapping rights-holder barriers, actor responsibilities, and power patterns, the next step is to ask what sits underneath the visible problem.</p>
              <p>A project may fail if it treats only the symptom. HRBA project design asks what visible problem we can see, what directly caused it, what deeper pattern keeps it happening, whose capacity needs strengthening, and what should change in the project design.</p>
              <p>Use this activity to create a Root-Cause and Capacity-Gap Map for the Jiru Amba case. This map will help you avoid jumping from problem to activity too quickly. It prepares you for the next design checks and repair screens.</p>
            </div>
            {showHeroImage && <img className="m3-root-cause-map-hero-image" src={module3RootCauseAssets.hero.src} alt={module3RootCauseAssets.hero.alt} onError={() => setShowHeroImage(false)} />}
          </section>

          <section className="m3-root-cause-map-card" aria-labelledby={`${screen.id}-method`}>
            <h2 id={`${screen.id}-method`}>Use a 6-step problem layers map</h2>
            <div className="m3-root-cause-map-method-table" role="table" aria-label="Six step problem layers method">
              <div className="m3-root-cause-map-method-row m3-root-cause-map-method-row--head" role="row"><span role="columnheader">Step</span><span role="columnheader">Question</span><span role="columnheader">Example</span></div>
              {[
                ['1. Start from a barrier', 'What barrier or problem pattern did earlier screens reveal?', 'Women traders have limited influence over market priorities.'],
                ['2. Name the visible sign', 'What can you see in the plan or case?', 'Their concerns did not clearly shape the activity package.'],
                ['3. Identify the direct cause', 'What immediately produced this problem?', 'Their concerns were not tested before activities were finalized.'],
                ['4. Identify the deeper/root cause', 'What pattern keeps this happening?', 'Market priorities may be shaped by actors with more influence.'],
                ['5. Identify the capacity gap', 'Who needs what capacity to respond better?', 'Planning and market actors need an inclusive priority-setting process; women traders need information and safe influence channels.'],
                ['6. Write the design implication', 'What should change in the project design?', 'Add market-accessible consultation, transparent prioritization, and feedback on what changed.'],
              ].map(([step, question, example]) => (
                <div key={step} className="m3-root-cause-map-method-row" role="row"><span role="cell">{step}</span><span role="cell">{question}</span><span role="cell">{example}</span></div>
              ))}
            </div>
            <p className="m3-root-cause-map-key-message">A direct cause explains what happened this time. A root cause explains why it may keep happening. A capacity gap explains what an actor, group, or system needs in order to respond better.</p>
          </section>

          <section className="m3-root-cause-map-card" aria-labelledby={`${screen.id}-example`}>
            <h2 id={`${screen.id}-example`}>Worked example</h2>
            <div className="m3-root-cause-map-example-grid">
              {[
                ['Barrier from previous screens', 'Women traders have limited influence and information barriers.'],
                ['Visible sign', 'Women traders’ market concerns did not clearly shape the final activity package.'],
                ['Direct cause', 'The project team did not test market priorities with women traders before activities were finalized.'],
                ['Deeper/root cause', 'Market-related decisions may be shaped by actors with stronger influence, while women traders have limited channels to influence planning.'],
                ['Capacity gap', 'Planning and market actors need a clearer inclusive priority-setting and feedback process. Women traders need timely information and safe ways to influence market-related decisions.'],
                ['Design implication', 'The project should include market-accessible information, consultation timed around livelihood realities, transparent priority-setting, and feedback showing how women traders’ inputs changed the plan.'],
                ['Question for later design repair', 'How should the activity package change so women traders’ livelihood priorities are not reduced to generic training?'],
              ].map(([label, text]) => (
                <div key={label}>
                  <span>{label}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <p className="m3-root-cause-map-key-message">Notice: The analysis does not stop at “women traders were not heard.” It asks what process, power pattern, and capacity gap allowed this to happen, then turns that diagnosis into a design change.</p>
            {showWorkedFlow && <img className="m3-root-cause-map-worked-flow" src={module3RootCauseAssets.workedFlow.src} alt={module3RootCauseAssets.workedFlow.alt} onError={() => setShowWorkedFlow(false)} />}
          </section>

          <section className="m3-root-cause-map-safe-note" aria-labelledby={`${screen.id}-safe`}>
            <h2 id={`${screen.id}-safe`}>Safe practice</h2>
            <p>Use the Jiru Amba learning case. When applying this tool to your own work, use generalized and non-sensitive examples.</p>
            <p>Do not enter real names, exact sensitive locations, complaint details, survivor stories, political accusations, confidential political details, names of real officials or individuals, or identifiable personal information.</p>
            <p>Use safe pattern language, such as: information does not reach all groups in time; feedback process is unclear; accessibility arrangements are not planned; priority-setting does not show how different groups influenced decisions; service actors may lack a clear follow-up process.</p>
          </section>
        </section>
        )}

        {activeStage === 3 && (
        <section className="m3-root-cause-map-builder-section m3-guided-stage-card" aria-labelledby={taskId}>
          <div className="m3-guided-practice-layout">
            <div className="m3-guided-stage-main">
          <div className="m3-root-cause-map-task-header">
            <div>
              <p className="m3-root-cause-map-kicker">PROBLEM LAYERS CANVAS</p>
              <h2 id={taskId}>Practice a problem layers map using the Jiru Amba case</h2>
              <p>Classify each Jiru Amba statement into the layer where it fits best. Use four layers: visible sign / symptom, direct cause, deeper/root cause, and capacity gap.</p>
              <p>After classifying the statements, generate your draft problem layers canvas. Do not classify everything as a root cause. A useful map separates what is visible, what directly caused it, what keeps it in place, and what capacity must be strengthened.</p>
            </div>
            <span className="m3-root-cause-map-count" aria-live="polite">{classifiedCount} of {screen10Statements.length} classified</span>
          </div>

          <div className="m3-root-cause-map-definitions" aria-label="Layer definitions">
            {layerOrder.map((layer) => (
              <article key={layer} className={`m3-root-cause-map-definition m3-root-cause-map-layer--${layer}`}>
                {renderLayerHeading(layer, problemLayerLabels[layer])}
                <p>{problemLayerDefinitions[layer]}</p>
              </article>
            ))}
          </div>

          <section className="m3-root-cause-map-builder">
            <section className="m3-root-cause-map-statements" aria-label="Case-study statements">
              {screen10Statements.map((statement) => (
                <fieldset key={statement.id} className="m3-root-cause-map-statement-card">
                  <legend><span>{statement.id}</span>{statement.statement}</legend>
                  <div className="m3-root-cause-map-options">
                    {layerOrder.map((layer) => {
                      const selected = selections[statement.id] === layer;
                      return (
                        <label key={layer} className={selected ? 'is-selected' : ''}>
                          <input type="radio" name={`${screen.id}-${statement.id}`} value={layer} checked={selected} onChange={() => selectLayer(statement.id, layer)} />
                          <span>{selected ? '✓ ' : ''}{problemLayerLabels[layer]}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </section>

            <aside className="m3-root-cause-map-preview" aria-labelledby={`${screen.id}-preview`}>
              <h3 id={`${screen.id}-preview`}>Problem layers preview</h3>
              <p>Your draft canvas will appear here as you classify the Jiru Amba case-study statements.</p>
              {showTemplateVisual && <img className="m3-root-cause-map-template" src={module3RootCauseAssets.template.src} alt={module3RootCauseAssets.template.alt} onError={() => setShowTemplateVisual(false)} />}
              <div className="m3-root-cause-map-preview-layers">
                {layerOrder.map((layer) => (
                  <section key={layer} className={`m3-root-cause-map-preview-layer m3-root-cause-map-layer--${layer}`}>
                    {renderLayerHeading(layer)}
                    {previewGroups[layer].length > 0 ? (
                      <ul>{previewGroups[layer].map((statement) => <li key={statement.id}>{statement.id} · {statement.shortLabel}</li>)}</ul>
                    ) : (
                      <p>No statements yet.</p>
                    )}
                  </section>
                ))}
              </div>
            </aside>
          </section>

          <div className="m3-root-cause-map-submit-row">
            <button type="button" className="m3-root-cause-map-submit-button" disabled={!canGenerate} title={!canGenerate ? 'Classify all statements first.' : undefined} onClick={submitCanvas}>
              {submitLabel}
            </button>
            <div aria-live="polite">
              <p>{helperText}</p>
              {allClassified && validationMessages.length > 0 && <ul>{validationMessages.map((message) => <li key={message}>{message}</li>)}</ul>}
            </div>
          </div>
            </div>
            <aside className="m3-guided-live-panel" aria-labelledby={`${screen.id}-problem-live`}>
              <h2 id={`${screen.id}-problem-live`}>Problem layers so far</h2>
              <p aria-live="polite">{classifiedCount} of {screen10Statements.length} statements classified.</p>
              <div className="m3-guided-chip-list">
                {selectedLayerSummaries.map((summary) => (
                  <span key={summary.layer} className="m3-guided-selected-chip">{summary.label}: {summary.count}</span>
                ))}
              </div>
              <p className="m3-guided-helper">{helperText}</p>
              <p className="m3-guided-safe-note">Use generalized problem patterns. Do not enter names, exact sensitive locations, complaint details, accusations, or identifiable information.</p>
            </aside>
          </div>
        </section>
        )}

        {activeStage === 4 && submittedOutput && (
          <section className="m3-root-cause-map-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Your draft Problem Layers Canvas</h2>
            <p>Based on your classifications, this canvas shows how visible problems connect to direct causes, deeper/root causes, and capacity gaps. Use it to decide what the project design should change. This is a learning output, not a formal assessment or investigation.</p>
            <h3>Problem layers summary</h3>
            <div className="m3-root-cause-map-patterns">
              {submittedOutput.generatedProblemLayersCanvas.map((pattern) => (
                <article key={pattern.problemPattern} className="m3-root-cause-map-pattern">
                  <h4>{pattern.problemPattern}</h4>
                  {[
                    ['Problem pattern', pattern.problemPattern],
                    ['Visible sign / symptom', pattern.visibleSign],
                    ['Direct cause', pattern.directCause],
                    ['Deeper/root cause', pattern.deeperRootCause],
                    ['Capacity gap', pattern.capacityGap],
                    ['Design implication', pattern.designImplication],
                    ['Question for later design repair', pattern.questionForLaterDesignRepair],
                  ].map(([label, value]) => <div key={label}><span>{label}</span><p>{value}</p></div>)}
                </article>
              ))}
            </div>
            <h3>Classification review</h3>
            <div className="m3-root-cause-map-output-cards">
              {outputSelections.map((selection) => {
                const statement = screen10Statements.find((item) => item.id === selection.statementId);
                return (
                  <article key={selection.statementId} className={selection.aligned ? 'is-useful' : 'needs-check'}>
                    <span>{selection.statementId}</span>
                    <h4>{selection.aligned ? 'Useful classification' : 'Check this layer'}</h4>
                    <p>{selection.statement}</p>
                    <dl>
                      <div><dt>Learner-selected layer</dt><dd>{problemLayerLabels[selection.selectedLayer]}</dd></div>
                      <div><dt>Suggested layer</dt><dd>{problemLayerLabels[selection.suggestedLayer]}</dd></div>
                      <div><dt>Short rationale</dt><dd>{statement?.rationale}</dd></div>
                    </dl>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {activeStage === 4 && submittedOutput && (
          <>
            <section className="m3-root-cause-map-suggestion" aria-labelledby={`${screen.id}-suggestion`}>
              <h2 id={`${screen.id}-suggestion`}>What your diagnosis suggests</h2>
              <p>{submittedOutput.diagnosisInterpretation}</p>
            </section>
            <section className="m3-root-cause-map-feedback" aria-labelledby={`${screen.id}-feedback`}>
              <h2 id={`${screen.id}-feedback`}>Feedback and warnings</h2>
              <p>{screen10FeedbackText[submittedOutput.feedbackState]}</p>
              {warnings.length > 0 && (
                <div>
                  <h3>What to check next</h3>
                  <ul>{warnings.map((warning) => <li key={warning}><span aria-hidden="true">!</span>{warning}</li>)}</ul>
                </div>
              )}
            </section>
            <section className="m3-root-cause-map-carry-forward" aria-labelledby={`${screen.id}-carry`}>
              <h2 id={`${screen.id}-carry`}>Case-study learning to carry forward</h2>
              <div className="m3-root-cause-map-carry-grid">
                <div><span>Learning from the Jiru Amba case</span><p>The Jiru Amba design should not only add activities. It should address the patterns that keep barriers in place: unequal influence, weak feedback response, unclear responsibility, accessibility gaps, information barriers, and weak use of evidence.</p></div>
                <div><span>Problem layers to carry forward</span><p>Carry forward the visible signs, direct causes, deeper/root causes, and capacity gaps from your map.</p></div>
                <div><span>Next use</span><p>Use this diagnosis in the next screens to strengthen gender and disability design, participation and accountability, risk and do-no-harm, objectives, activities, intervention logic, indicators, and evidence.</p></div>
              </div>
            </section>
          </>
        )}

        {activeStage === 4 && submittedOutput && (
          <div className="m3-guided-stage-actions">
            <button type="button" className="m3-secondary-button" onClick={() => setActiveStage(3)}>Edit classifications</button>
            <button type="button" className="m3-root-cause-map-submit-button" onClick={() => setActiveStage(5)}>Go to Apply/Download</button>
          </div>
        )}

        {activeStage === 5 && (
        <section className="m3-root-cause-map-own-cso m3-guided-stage-card" aria-labelledby={`${screen.id}-own-cso`}>
          <div className="m3-guided-tabs" role="tablist" aria-label="Apply or download">
            <button type="button" role="tab" aria-selected={applyTab === 'own'} className={applyTab === 'own' ? 'is-active' : ''} onClick={() => setApplyTab('own')}>Try with my CSO context</button>
            <button type="button" role="tab" aria-selected={applyTab === 'downloads'} className={applyTab === 'downloads' ? 'is-active' : ''} onClick={() => setApplyTab('downloads')}>Download tools</button>
          </div>
          {applyTab === 'own' && (
          <>
          <h2 id={`${screen.id}-own-cso`}>Apply this idea to your own CSO context</h2>
          <p>Use this optional practice tool to analyze one project issue or barrier from your own CSO work. Keep it safe and general. Do not enter names, exact locations, complaint details, accusations, survivor stories, confidential political details, or identifiable personal information.</p>
          <div className="m3-root-cause-map-own-grid">
            {[
              ['projectIssueOrBarrier', 'Project issue or barrier', 'Example: Women vendors’ market priorities are not shaping the project design.'],
              ['visibleSign', 'Visible sign / symptom', 'What can you see in the project idea, assessment, plan, or practice?'],
              ['directCause', 'Direct cause', 'What immediately produced this problem?'],
              ['deeperRootCause', 'Deeper/root cause', 'What deeper pattern may keep this happening?'],
              ['capacityGap', 'Capacity gap', 'Who needs what capacity to respond better?'],
              ['actorWhoseCapacityMatters', 'Actor whose capacity matters', 'Example: rights-holder group, public actor, service actor, CSO facilitator, committee, coordination system.'],
              ['designImplication', 'Design implication', 'What should change in the project design?'],
              ['questionForDesignRepair', 'Question for design repair', 'What should be repaired later in the objective, activity package, participation plan, accountability pathway, risk plan, indicator, or evidence plan?'],
            ].map(([field, label, placeholder]) => (
              <label key={field}><span>{label}</span><textarea value={ownCsoDraft[field as keyof Screen10OwnCsoDraft]} onChange={(event) => updateOwnCsoDraft(field as keyof Screen10OwnCsoDraft, event.target.value)} placeholder={placeholder} /></label>
            ))}
          </div>
          {ownCsoError && <p className="m3-root-cause-map-error" role="alert">{ownCsoError}</p>}
          <button type="button" className="m3-root-cause-map-submit-button" onClick={generateOwnCsoMap}>Generate my problem layers map</button>
          {ownCsoOutput && (
            <article className="m3-root-cause-map-own-output" aria-live="polite">
              <h3>My Root-Cause and Capacity-Gap Map</h3>
              {[
                ['Project issue or barrier', ownCsoOutput.projectIssueOrBarrier],
                ['Visible sign / symptom', ownCsoOutput.visibleSign],
                ['Direct cause', ownCsoOutput.directCause],
                ['Deeper/root cause', ownCsoOutput.deeperRootCause],
                ['Capacity gap', ownCsoOutput.capacityGap],
                ['Actor whose capacity matters', ownCsoOutput.actorWhoseCapacityMatters],
                ['Design implication', ownCsoOutput.designImplication],
                ['Question for design repair', ownCsoOutput.questionForDesignRepair],
              ].map(([label, value]) => <div key={label}><span>{label}</span><p>{value}</p></div>)}
            </article>
          )}
          </>
          )}
        </section>
        )}

        {activeStage === 5 && applyTab === 'downloads' && (
        <section className="m3-root-cause-map-template-download m3-guided-stage-card" aria-labelledby={`${screen.id}-template`}>
          <div>
            <h2 id={`${screen.id}-template`}>Root-Cause and Capacity-Gap Map Template</h2>
            <p>Download a reusable template for identifying visible signs, direct causes, deeper/root causes, capacity gaps, design implications, safe evidence, and repair questions.</p>
          </div>
          <div className="m3-root-cause-map-template-actions">
            <button type="button" className="m3-root-cause-map-submit-button" onClick={() => downloadRootCauseTemplate('docx')}>Download Root-Cause and Capacity-Gap Map Template</button>
            <button type="button" className="m3-root-cause-map-submit-button" onClick={() => downloadRootCauseTemplate('md')}>Download markdown copy</button>
          </div>
        </section>
        )}

        {activeStage === 5 && (
        <div className="m3-root-cause-map-actions">
          <PrimaryButton onClick={continueWithPayload} disabled={!canContinue}>
            {screen.continueLabel}
          </PrimaryButton>
        </div>
        )}
      </article>
    </main>
  );
}

export default function Module3RevisedRenderer({ screenId, state, onChangeState }: Module3RevisedRendererProps) {
  const screen = getModule3RevisedScreen(screenId);

  if (!screen) {
    return (
      <main className="m3-screen m3-studio-screen" aria-labelledby="m3-revised-fallback-title">
        <div className="m3-title-block">
          <h1 id="m3-revised-fallback-title">Module 3 screen unavailable</h1>
          <p>The requested revised Module 3 screen is not in the active sequence.</p>
        </div>
      </main>
    );
  }

  const completed = (state.screenProgress[MODULE_ID] || []).includes(screen.id);
  const onComplete = (value?: Record<string, unknown>) => completeScreen(screen, onChangeState, value);

  if (screen.interactionType === 'video') {
    return <IntroVideoScaffold screen={screen} onComplete={onComplete} />;
  }

  if (screen.interactionType === 'text') {
    if (screen.id === 'M3-R02') {
      return <LearningRoadmapScreen screen={screen} onComplete={onComplete} />;
    }

    return <TextScaffold screen={screen} onComplete={onComplete} />;
  }

  if (screen.interactionType === 'case-reader') {
    if (screen.id === 'M3-R03') {
      return <CaseIntroductionScreen screen={screen} onComplete={onComplete} />;
    }

    return <CaseReaderScaffold screen={screen} onComplete={onComplete} />;
  }

  if (screen.interactionType === 'snapshot-preview') {
    return <SnapshotPreviewScreen screen={screen} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R05') {
    return <ContextInequalityScanScreen screen={screen} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R06') {
    return <PolicyStandardsMapScreen screen={screen} state={state} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R07') {
    return <RightsHolderBarrierMapScreen screen={screen} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R08') {
    return <ResponsibilityMapScreen screen={screen} state={state} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R09') {
    return <PowerInfluenceMapScreen screen={screen} state={state} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R10') {
    return <RootCauseCapacityGapScreen screen={screen} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R11') {
    return <GenderDisabilityDesignCheckScreen screen={screen} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R12') {
    return <ParticipationAccountabilityPathwayScreen screen={screen} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R13') {
    return <RiskDoNoHarmBoardScreen screen={screen} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R14') {
    return <ObjectiveRepairScreen screen={screen} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R15') {
    return <ActivityRepairScreen screen={screen} state={state} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R16') {
    return <InterventionLogicIndicatorsScreen screen={screen} state={state} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R17') {
    return <ProposalReviewScreen screen={screen} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R18') {
    return <ProposalGapMapScreen screen={screen} state={state} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R19') {
    return <ProposalSectionRepairScreen screen={screen} state={state} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R20') {
    return <AppliedKnowledgeCheckScreen screen={screen} onComplete={onComplete} />;
  }

  if (screen.id === 'M3-R21') {
    return (
      <PortfolioSnapshotScreen
        screen={screen}
        state={state}
        onSaveSnapshot={(snapshot) => {
          onChangeState((prev) => ({
            ...prev,
            practiceCheckState: {
              ...prev.practiceCheckState,
              [practiceKey(screen.id)]: {
                ...(prev.practiceCheckState[practiceKey(screen.id)] || {}),
                status: 'saved',
                savedAt: snapshot.savedAt,
                module3PortfolioSnapshot: snapshot,
                m3ProjectDesignImprovementSnapshot: snapshot,
              },
            },
          }));
        }}
        onComplete={onComplete}
      />
    );
  }

  if (screen.id === 'M3-R22') {
    return (
      <Module3ClosureScreen
        screen={screen}
        state={state}
        onStartModule4={() => completeScreen(screen, onChangeState, { completed, module3PortfolioSnapshot: getScreen21SavedSnapshot(state) })}
        onReturnSnapshot={() => {
          onChangeState((prev) => ({
            ...prev,
            currentModuleId: MODULE_ID,
            currentScreenId: 'M3-R21',
          }));
          setRoute('/module-3/screen-3-21');
        }}
      />
    );
  }

  if (screen.interactionType === 'knowledge-check') {
    return <KnowledgeCheckScaffold screen={screen} onComplete={onComplete} />;
  }

  if (screen.interactionType === 'portfolio') {
    return <PortfolioScaffold screen={screen} onComplete={onComplete} />;
  }

  if (screen.interactionType === 'closure') {
    return <ClosureScaffold screen={screen} onComplete={() => completeScreen(screen, onChangeState, { completed })} />;
  }

  return <ChoiceScaffold screen={screen} onComplete={onComplete} />;
}
