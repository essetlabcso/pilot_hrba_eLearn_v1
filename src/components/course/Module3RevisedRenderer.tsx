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
  'Context and inequality analysis is the first reality check before choosing activities. It helps a CSO understand what is happening, who is affected differently, who may be left furthest behind, and which barriers or root causes may shape participation, access, safety, information, and benefit.',
  'In this activity, you will practice this using the Jiru Amba case study. The aim is not to make a final conclusion. The aim is to notice case-study signals that should be checked safely before the project design is finalized.',
];

const module3ContextConceptChips = [
  'What is happening?',
  'Who is affected differently?',
  'What barriers may exist?',
  'What evidence should be verified safely?',
];

const module3ContextEvidence = [
  {
    label: 'Visible plan evidence',
    items: [
      'Attendance was recorded',
      'Priorities were ranked',
      'Activities, budget, and indicators were prepared',
    ],
  },
  {
    label: 'Who may be affected differently?',
    items: [
      'Women traders',
      'Women who rely on water services',
      'Youth',
      'Persons with disabilities',
      'Low-income households',
      'Communities in remote kebeles',
      'Informal workers',
    ],
  },
  {
    label: 'Barriers to test',
    items: [
      'Unequal influence',
      'Information gaps',
      'Accessibility barriers',
      'Timing, safety, and livelihood risks',
      'Weak follow-up or response',
    ],
  },
  {
    label: 'Evidence to verify safely',
    items: [
      'Disaggregated evidence where available',
      'Safe feedback from different groups',
      'CSO/community observations',
      'Service or planning records',
      'No names or sensitive details',
    ],
  },
];

const module3ContextChoices = [
  {
    id: 'influence',
    text: 'Some people were present but did not meaningfully influence the priorities.',
    strong: true,
    outputGroup: 'voice',
    affectedGroups: ['Groups present but less able to shape decisions'],
    barriers: ['Unequal influence'],
    evidence: ['Evidence on whether participation influenced decisions'],
  },
  {
    id: 'women-barriers',
    text: 'Women traders and women who rely on water services may face time, location, safety, livelihood, or information barriers.',
    strong: true,
    outputGroup: 'livelihood',
    affectedGroups: ['Women traders', 'Women who rely on water services'],
    barriers: ['Timing barriers', 'Safety concerns', 'Livelihood risk', 'Information gaps'],
    evidence: ['Safe feedback from different groups', 'CSO/community observations'],
  },
  {
    id: 'disability-access',
    text: 'Persons with disabilities may be invited but still face inaccessible meetings, materials, facilities, or feedback channels.',
    strong: true,
    outputGroup: 'access',
    affectedGroups: ['Persons with disabilities'],
    barriers: ['Accessibility barriers', 'Information gaps', 'Weak follow-up or response'],
    evidence: ['Safe feedback from different groups', 'Service or planning records'],
  },
  {
    id: 'youth-pathway',
    text: 'Youth livelihood activities are listed, but the pathway from training to practical opportunity is unclear.',
    strong: true,
    outputGroup: 'livelihood',
    affectedGroups: ['Youth'],
    barriers: ['Livelihood risk'],
    evidence: ['Service or planning records', 'CSO/community observations'],
  },
  {
    id: 'remote-poor',
    text: 'Communities in remote kebeles and low-income households may be counted but less able to shape decisions.',
    strong: true,
    outputGroup: 'poverty',
    affectedGroups: ['Low-income households', 'Communities in remote kebeles', 'Informal workers'],
    barriers: ['Income-related barriers', 'Distance or location barriers', 'Unequal influence'],
    evidence: ['Disaggregated evidence where available', 'Safe feedback from different groups'],
  },
  {
    id: 'participation-report',
    text: 'The consultation report says the community actively participated.',
    strong: false,
    outputGroup: 'surface',
    affectedGroups: [],
    barriers: [],
    evidence: ['Service or planning records'],
  },
  {
    id: 'admin-plan',
    text: 'The plan includes activities, budgets, and indicators.',
    strong: false,
    outputGroup: 'surface',
    affectedGroups: [],
    barriers: [],
    evidence: ['Service or planning records'],
  },
];

const module3ContextOutputGroups = [
  {
    id: 'voice',
    label: 'Unequal influence and voice',
    emptyText: 'No influence or voice signals selected yet.',
  },
  {
    id: 'access',
    label: 'Access and accommodation barriers',
    emptyText: 'No access or accommodation signals selected yet.',
  },
  {
    id: 'livelihood',
    label: 'Livelihood, safety, and information barriers',
    emptyText: 'No livelihood, safety, or information signals selected yet.',
  },
  {
    id: 'poverty',
    label: 'Income, location, and follow-up barriers',
    emptyText: 'No income, location, or follow-up signals selected yet.',
  },
  {
    id: 'surface',
    label: 'Surface evidence selected',
    emptyText: 'No surface-only evidence selected.',
    note: 'Useful evidence, but it does not by itself show meaningful participation, barrier removal, or rights-holder influence.',
  },
];

const module3ContextCarryForward = [
  {
    label: 'Learning from the Jiru Amba case',
    text: 'The plan should not only record attendance, ranked priorities, activities, and budgets. It should explain who may be affected differently, what barriers shape participation and benefit, and what evidence still needs safe verification.',
  },
  {
    label: 'Groups to examine further',
    text: 'Women traders, women who rely on water services, youth, persons with disabilities, low-income households, communities in remote kebeles, and informal workers.',
  },
  {
    label: 'Barriers to test next',
    text: 'Influence, information, accessibility, timing, safety, livelihood risk, income-related barriers, distance, and feedback response.',
  },
];

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
  | 'HRBA principle + constitutional reference'
  | 'HRBA principle + rights reference'
  | 'Rights / standards reference'
  | 'HRBA principle + public accountability reference'
  | 'HRBA principle + responsibility reference'
  | 'Policy / service commitment';
type FeedbackLevel = 'strong' | 'good_with_gap' | 'partial' | 'surface';

type PolicyAnchor = {
  id: PolicyAnchorId;
  title: string;
  sourceLayer: SourceLayer;
  plainMeaning: string;
  relatedReferences: string[];
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

type GeneratedStandardsMapRow = {
  anchorId: PolicyAnchorId;
  anchorTitle: string;
  sourceLayer: SourceLayer;
  relatedReferences: string[];
  signalId: JiruAmbaSignalId;
  signalLabel: string;
  designQuestion: string;
  responsibilityQuestion: string;
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
    sourceLayer: 'HRBA principle + constitutional reference',
    plainMeaning: 'People should influence decisions, not only attend meetings.',
    relatedReferences: [
      'HRBA working principle: meaningful participation',
      'FDRE Constitution: participation in development and consultation on projects affecting communities',
      'Relevant local planning or service-committee commitments',
    ],
    designQuestionPreview: 'Who shaped the priorities, and how will the plan change before implementation?',
    relatedSignalIds: ['presence_without_influence', 'weak_follow_up_response'],
    defaultSignalId: 'presence_without_influence',
    designQuestion: 'How will people influence the plan before activities and budgets are finalized?',
    responsibilityQuestion: 'Which planning or service actor must respond if priorities change?',
    snapshotTag: 'Participation and consultation reference',
    priority: 'core',
  },
  {
    id: 'non_discrimination_equality',
    title: 'Equality and non-discrimination',
    sourceLayer: 'HRBA principle + rights reference',
    plainMeaning: 'The design should respond to different barriers faced by different groups.',
    relatedReferences: [
      'HRBA working principle: non-discrimination and equality',
      'FDRE Constitution: equality before the law',
      'CEDAW, CRC, CRPD, and other relevant human rights treaties where applicable',
    ],
    designQuestionPreview: 'Which groups face different barriers, and what design changes respond to those barriers?',
    relatedSignalIds: ['different_barriers_across_groups', 'service_improvement_uncertainty'],
    defaultSignalId: 'different_barriers_across_groups',
    designQuestion: 'Which groups need different access, timing, safety, livelihood, or information measures?',
    responsibilityQuestion: 'Who must check whether the design responds differently to different barriers?',
    snapshotTag: 'Equality and non-discrimination reference',
    priority: 'core',
  },
  {
    id: 'disability_accessibility',
    title: 'Disability inclusion and accessibility',
    sourceLayer: 'Rights / standards reference',
    plainMeaning: 'Participation, information, venues, materials, and feedback must be accessible.',
    relatedReferences: [
      'CRPD: rights of persons with disabilities',
      'FDRE Constitution: support and social services for persons with disabilities',
      'Relevant accessibility, service, or inclusion commitments',
    ],
    designQuestionPreview: 'What accommodations, accessible formats, and budget lines are built into the plan?',
    relatedSignalIds: ['disability_access_barriers', 'information_gaps', 'weak_follow_up_response'],
    defaultSignalId: 'disability_access_barriers',
    designQuestion: 'What accommodations, accessible formats, venues, and feedback channels are built into the plan?',
    responsibilityQuestion: 'Who budgets, provides, and monitors accessibility measures?',
    snapshotTag: 'Disability accessibility reference',
    priority: 'core',
  },
  {
    id: 'transparency_information',
    title: 'Transparency and access to information',
    sourceLayer: 'HRBA principle + public accountability reference',
    plainMeaning: 'People need clear, timely, and accessible information to participate and follow up.',
    relatedReferences: [
      'HRBA working principle: transparency and access to information',
      'FDRE Constitution: transparent conduct of government',
      'Relevant public-information, consultation, or service-notice commitments',
    ],
    designQuestionPreview: 'What information will be shared, when, in what format, and with whom?',
    relatedSignalIds: ['information_gaps', 'presence_without_influence'],
    defaultSignalId: 'information_gaps',
    designQuestion: 'What information will be shared, when, in what format, and with whom?',
    responsibilityQuestion: 'Who is responsible for making information clear, timely, and accessible?',
    snapshotTag: 'Transparency and information reference',
    priority: 'core',
  },
  {
    id: 'accountability_response',
    title: 'Accountability and response',
    sourceLayer: 'HRBA principle + responsibility reference',
    plainMeaning: 'The plan should show who responds to concerns, feedback, exclusion risks, or service gaps.',
    relatedReferences: [
      'HRBA working principle: accountability and rule of law',
      'FDRE Constitution: public officials are accountable for official duties',
      'Relevant grievance, feedback, service-response, or follow-up commitments',
    ],
    designQuestionPreview: 'Who must respond, what may change, and how will people know?',
    relatedSignalIds: ['weak_follow_up_response', 'service_improvement_uncertainty'],
    defaultSignalId: 'weak_follow_up_response',
    designQuestion: 'How will feedback change decisions, and how will people know what changed?',
    responsibilityQuestion: 'Who responds, by when, and through what follow-up channel?',
    snapshotTag: 'Accountability and response reference',
    priority: 'core',
  },
  {
    id: 'livelihood_service_commitment',
    title: 'Livelihood and service-improvement commitments',
    sourceLayer: 'Policy / service commitment',
    plainMeaning: 'Activities should connect to real service improvement or practical livelihood benefit.',
    relatedReferences: [
      'FDRE Constitution: improved living standards, livelihood, and publicly funded social services',
      'Relevant water, livelihood, market, youth, or local development plans',
      'Project or donor commitments on practical benefit and service improvement',
    ],
    designQuestionPreview: 'How do training, market support, water access, or service activities lead to practical benefit?',
    relatedSignalIds: ['unclear_livelihood_pathway', 'service_improvement_uncertainty'],
    defaultSignalId: 'unclear_livelihood_pathway',
    designQuestion: 'How will training, market support, water access, or service activities lead to practical benefit?',
    responsibilityQuestion: 'Which service or livelihood actor must support the pathway from activity to benefit?',
    snapshotTag: 'Service and livelihood commitment reference',
    priority: 'supporting',
  },
];

const jiruAmbaSignalOptions: SignalOption[] = [
  {
    id: 'presence_without_influence',
    label: 'Presence without influence',
    plainDescription: 'Some people were present but did not meaningfully influence priorities.',
  },
  {
    id: 'different_barriers_across_groups',
    label: 'Different barriers across groups',
    plainDescription: 'Women traders, women who rely on water services, low-income households, communities in remote kebeles, and informal workers may face different barriers.',
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
    label: 'Unclear livelihood pathway',
    plainDescription: 'Youth livelihood activities are listed, but the pathway from training to practical opportunity is unclear.',
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

const screen5SignalMap: Record<string, JiruAmbaSignalId[]> = {
  influence: ['presence_without_influence'],
  'women-barriers': ['different_barriers_across_groups', 'information_gaps'],
  'disability-access': ['disability_access_barriers'],
  'youth-pathway': ['unclear_livelihood_pathway'],
  'remote-poor': ['different_barriers_across_groups'],
  'participation-report': ['presence_without_influence'],
  'admin-plan': ['service_improvement_uncertainty'],
};

const policyMapSummary =
  'Based on the Jiru Amba case selections, the draft map links case-study signals to practical rights and policy references for participation, equality, accessibility, transparency, accountability, and service or livelihood benefit.';

function isJiruAmbaSignalId(value: unknown): value is JiruAmbaSignalId {
  return typeof value === 'string' && defaultJiruAmbaSignalIds.includes(value as JiruAmbaSignalId);
}

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
  return Boolean(policyAnchors.find((anchor) => anchor.id === anchorId)?.relatedSignalIds.includes(signalId));
}

function getAnchorById(anchorId: PolicyAnchorId) {
  return policyAnchors.find((anchor) => anchor.id === anchorId);
}

function getSignalById(signalId: JiruAmbaSignalId) {
  return jiruAmbaSignalOptions.find((signal) => signal.id === signalId);
}

function generateStandardsMapRows(
  selectedAnchorIds: PolicyAnchorId[],
  anchorSignalMatches: AnchorSignalMatch[],
): GeneratedStandardsMapRow[] {
  return selectedAnchorIds.flatMap((anchorId) => {
    const anchor = getAnchorById(anchorId);
    const signalId = anchorSignalMatches.find((match) => match.anchorId === anchorId)?.signalId;
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
  plainDescription: string;
  isSpecific: boolean;
  suggestedBarrierIds: BarrierTagId[];
  designEnablement: string;
  isCustom?: boolean;
};

type BarrierTag = {
  id: BarrierTagId;
  label: string;
  category: BarrierCategory;
  plainMeaning: string;
  relatedReference: string;
};

type GeneratedRightsHolderBarrierRow = {
  groupId: RightsHolderGroupId;
  groupLabel: string;
  barrierIds: BarrierTagId[];
  barrierLabels: string[];
  barrierCategories: BarrierCategory[];
  designEnablement: string;
  designQuestion: string;
  screen8Question: string;
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
  rightsHolderBarrierSummary: string;
  carryForward: {
    snapshotField: 'rightsHoldersAndBarriers';
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
    plainDescription: 'Women whose livelihoods may be affected by market access, timing, safety, income, or information barriers.',
    isSpecific: true,
    suggestedBarrierIds: [
      'timing_care_work',
      'safety_comfort',
      'livelihood_market_risk',
      'information_barrier',
      'limited_influence',
      'income_cost_barrier',
    ],
    designEnablement:
      'The design should enable women traders to influence market-related decisions, access information, participate safely, and benefit from livelihood or market support.',
  },
  {
    id: 'women_rely_water_services',
    label: 'Women who rely on water services',
    plainDescription: 'Women who rely on and manage daily water access but may have limited influence over water-service priorities.',
    isSpecific: true,
    suggestedBarrierIds: ['limited_influence', 'timing_care_work', 'information_barrier', 'feedback_response', 'safety_comfort'],
    designEnablement:
      'The design should enable women who rely on water services to influence priorities, receive information, participate safely, and know how water-service concerns will be followed up.',
  },
  {
    id: 'youth_livelihood',
    label: 'Youth seeking livelihood opportunities',
    plainDescription: 'Young people included in activities but facing an unclear path from training to practical opportunity.',
    isSpecific: true,
    suggestedBarrierIds: ['livelihood_market_risk', 'unclear_pathway_to_benefit', 'limited_influence', 'information_barrier'],
    designEnablement:
      'The design should enable youth to see a clear pathway from training or participation to practical livelihood opportunity.',
  },
  {
    id: 'persons_with_disabilities',
    label: 'Persons with disabilities',
    plainDescription: 'People who may be invited but still face inaccessible venues, materials, communication, transport, or feedback channels.',
    isSpecific: true,
    suggestedBarrierIds: [
      'accessibility_accommodation',
      'information_barrier',
      'distance_transport',
      'feedback_response',
      'limited_influence',
    ],
    designEnablement:
      'The design should enable persons with disabilities to participate through accessible venues, materials, communication, transport, and feedback channels.',
  },
  {
    id: 'low_income_households',
    label: 'Low-income households',
    plainDescription: 'Households whose costs, lost time, transport needs, or income pressure may limit participation and benefit.',
    isSpecific: true,
    suggestedBarrierIds: [
      'income_cost_barrier',
      'distance_transport',
      'information_barrier',
      'livelihood_market_risk',
      'timing_care_work',
    ],
    designEnablement:
      'The design should enable low-income households to participate and benefit without unrealistic cost, time, transport, or income burdens.',
  },
  {
    id: 'remote_kebele_residents',
    label: 'Communities in remote kebeles',
    plainDescription: 'People living farther from meetings, information channels, services, and follow-up processes.',
    isSpecific: true,
    suggestedBarrierIds: [
      'distance_transport',
      'information_barrier',
      'feedback_response',
      'limited_influence',
      'income_cost_barrier',
    ],
    designEnablement:
      'The design should enable communities in remote kebeles to receive information, participate, access services, and receive follow-up despite distance and transport barriers.',
  },
  {
    id: 'informal_workers',
    label: 'Informal workers',
    plainDescription: 'People whose work patterns, income insecurity, or lack of formal representation may reduce voice and benefit.',
    isSpecific: true,
    suggestedBarrierIds: [
      'timing_care_work',
      'livelihood_market_risk',
      'limited_influence',
      'information_barrier',
      'income_cost_barrier',
    ],
    designEnablement:
      'The design should enable informal workers to participate without losing livelihood time and to influence decisions that affect practical benefit.',
  },
  {
    id: 'community_as_whole',
    label: 'The community as a whole',
    plainDescription: 'Useful as a broad starting label, but not enough for HRBA barrier analysis by itself.',
    isSpecific: false,
    suggestedBarrierIds: [],
    designEnablement: 'Use this only as a broad orientation label. The map becomes useful when specific groups are added.',
  },
  {
    id: 'custom_group',
    label: 'Another generalized group',
    plainDescription: 'Use only a broad, safe group label. Do not enter names, complaints, exact locations, or identifying details.',
    isSpecific: true,
    isCustom: true,
    suggestedBarrierIds: [],
    designEnablement:
      'The design should examine what this generalized group needs in order to participate, access information, benefit, and receive follow-up safely.',
  },
];

const barrierTags: BarrierTag[] = [
  {
    id: 'limited_influence',
    label: 'Limited influence',
    category: 'voice_influence',
    plainMeaning: 'People may attend but not shape priorities, budgets, or decisions.',
    relatedReference: 'Participation and consultation',
  },
  {
    id: 'information_barrier',
    label: 'Information barrier',
    category: 'information',
    plainMeaning: 'People may not receive clear, timely, or accessible information.',
    relatedReference: 'Transparency and access to information',
  },
  {
    id: 'accessibility_accommodation',
    label: 'Accessibility or accommodation barrier',
    category: 'accessibility',
    plainMeaning: 'Meetings, materials, venues, transport, or feedback channels may not be accessible.',
    relatedReference: 'Disability inclusion and accessibility',
  },
  {
    id: 'timing_care_work',
    label: 'Timing or care-work barrier',
    category: 'timing_distance_cost',
    plainMeaning: 'Meeting times or activity schedules may exclude people with work or care responsibilities.',
    relatedReference: 'Equality and meaningful participation',
  },
  {
    id: 'distance_transport',
    label: 'Distance or transport barrier',
    category: 'timing_distance_cost',
    plainMeaning: 'Location, travel time, cost, or transport may limit participation and follow-up.',
    relatedReference: 'Equality and access',
  },
  {
    id: 'safety_comfort',
    label: 'Safety or comfort barrier',
    category: 'safety',
    plainMeaning: 'Some people may not feel safe or comfortable speaking freely.',
    relatedReference: 'Safe and meaningful participation',
  },
  {
    id: 'livelihood_market_risk',
    label: 'Livelihood or market-risk barrier',
    category: 'livelihood_benefit',
    plainMeaning: 'People may join activities but not gain practical livelihood or market benefit.',
    relatedReference: 'Livelihood and service-improvement commitments',
  },
  {
    id: 'feedback_response',
    label: 'Feedback or response barrier',
    category: 'feedback_response',
    plainMeaning: 'People may give feedback without knowing who responds or what changes.',
    relatedReference: 'Accountability and response',
  },
  {
    id: 'income_cost_barrier',
    label: 'Income or cost barrier',
    category: 'timing_distance_cost',
    plainMeaning: 'Costs, lost time, or income pressure may prevent participation or benefit.',
    relatedReference: 'Equality and non-discrimination',
  },
  {
    id: 'unclear_pathway_to_benefit',
    label: 'Unclear pathway to benefit',
    category: 'livelihood_benefit',
    plainMeaning: 'The activity is listed, but the path from activity to real change is unclear.',
    relatedReference: 'Practical benefit and accountability',
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
  'Based on the Jiru Amba case selections, the draft map identifies specific rights-holder groups, priority barriers, design questions, and questions to carry into responsibility mapping.';

const rightsHolderCarryForward = {
  snapshotField: 'rightsHoldersAndBarriers' as const,
  issue:
    'The plan should not treat “the community” as one group. It should identify which rights-holder groups may face which barriers and what the design should enable.',
  nextUse: 'Use this case-study map on the next screen to identify duty-bearers, supporting actors, and the CSO role.',
};

function getRightsHolderGroupById(groupId: RightsHolderGroupId) {
  return rightsHolderGroups.find((group) => group.id === groupId);
}

function getBarrierById(barrierId: BarrierTagId) {
  return barrierTags.find((barrier) => barrier.id === barrierId);
}

function validateCustomGroupLabel(value: string) {
  const trimmed = value.trim();
  const blockedCharacters = ['@', '#', '/', '\\', '<', '>', '{', '}', '[', ']'];
  const invalid =
    trimmed.length < 3 ||
    trimmed.length > 50 ||
    /[\r\n]/.test(trimmed) ||
    blockedCharacters.some((character) => trimmed.includes(character)) ||
    trimmed.split(/\s+/).filter(Boolean).length > 6;

  return {
    trimmed,
    isValid: !invalid,
    error: invalid
      ? 'Use a short general group label only. Do not include names, complaints, exact locations, or identifying details.'
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
  if (barrierIds.length <= 4) return `Ready · ${barrierLabels.join(', ')}`;
  if (barrierIds.length <= 7) return 'Broad · consider focusing priority barriers';
  return 'Too broad — focus priority barriers';
}

function getActiveGroupStatus(barrierCount: number, isBroad = false) {
  if (isBroad) return 'Too broad';
  if (barrierCount === 0) return 'Needs at least 1 barrier';
  if (barrierCount <= 4) return 'Ready';
  if (barrierCount <= 7) return 'Broad';
  return 'Too broad';
}

function generateDesignQuestion(groupLabel: string, barrierIds: BarrierTagId[]) {
  if (barrierIds.includes('accessibility_accommodation')) {
    return `What accommodations, accessible formats, venues, transport, or feedback channels must be built in so ${groupLabel} can participate, access information, and receive follow-up?`;
  }

  if (barrierIds.includes('livelihood_market_risk') || barrierIds.includes('unclear_pathway_to_benefit')) {
    return `How will the design connect activities to practical benefit for ${groupLabel}, not only attendance?`;
  }

  if (barrierIds.includes('limited_influence') || barrierIds.includes('feedback_response')) {
    return `How will ${groupLabel} influence decisions and know what changed after feedback?`;
  }

  if (barrierIds.includes('information_barrier')) {
    return `What information does ${groupLabel} need, when, and in what accessible format?`;
  }

  if (
    barrierIds.includes('timing_care_work') ||
    barrierIds.includes('distance_transport') ||
    barrierIds.includes('income_cost_barrier')
  ) {
    return `How should timing, location, cost, or support arrangements change so ${groupLabel} can participate and benefit?`;
  }

  if (barrierIds.includes('safety_comfort')) {
    return `What safe participation options are needed so ${groupLabel} can speak freely and take part without avoidable risk?`;
  }

  return `How will the design respond to the selected barriers for ${groupLabel}?`;
}

function generateScreen8Question(groupLabel: string, barrierIds: BarrierTagId[]) {
  if (barrierIds.includes('accessibility_accommodation')) {
    return `Who must budget, provide, and monitor accessibility measures for ${groupLabel}?`;
  }

  if (barrierIds.includes('feedback_response')) {
    return `Who must respond to feedback from ${groupLabel}, and how will they know what changed?`;
  }

  if (barrierIds.includes('livelihood_market_risk') || barrierIds.includes('unclear_pathway_to_benefit')) {
    return `Which service, market, or livelihood actor must support practical benefit for ${groupLabel}?`;
  }

  if (barrierIds.includes('limited_influence')) {
    return `Who must respond if ${groupLabel} priorities need to change the plan?`;
  }

  if (barrierIds.includes('information_barrier')) {
    return `Who is responsible for making information clear, timely, and accessible for ${groupLabel}?`;
  }

  if (
    barrierIds.includes('timing_care_work') ||
    barrierIds.includes('distance_transport') ||
    barrierIds.includes('income_cost_barrier')
  ) {
    return `Who can help reduce timing, distance, transport, cost, or participation burdens for ${groupLabel}?`;
  }

  if (barrierIds.includes('safety_comfort')) {
    return `Who must help create safe and respectful participation conditions for ${groupLabel}?`;
  }

  return `Who has responsibility to help reduce these barriers for ${groupLabel}?`;
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
      barrierIds,
      barrierLabels,
      barrierCategories,
      designEnablement: group.designEnablement,
      designQuestion: generateDesignQuestion(groupLabel, barrierIds),
      screen8Question: generateScreen8Question(groupLabel, barrierIds),
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
  const groupsWithFiveOrMoreBarriers = selectedSpecificGroupIds.filter(
    (groupId) => getGroupBarrierIds(groupBarrierLinks, groupId).length >= 5,
  ).length;
  const groupsWithEightOrMoreBarriers = selectedSpecificGroupIds.filter(
    (groupId) => getGroupBarrierIds(groupBarrierLinks, groupId).length >= 8,
  ).length;
  const tooUnfocused =
    groupsWithEightOrMoreBarriers > 0 ||
    averageBarriersPerGroup > 5 ||
    groupsWithFiveOrMoreBarriers >= Math.ceil(selectedSpecificGroupCount * 0.6);
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
        : selectedSpecificGroupCount >= 3 && allSelectedSpecificGroupsHaveBarrier
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
    warnings.push('Many barriers are selected. Check whether each one changes the design. Keep the map focused on what the project must respond to.');
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
    return barrierCount >= 3 ? [groupId] : [];
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
  | 'rights_holder_voice_support'
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
  voiceActorIds: string[];
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
  primaryPublicResponsibility: string[];
  serviceOrSupportingActors: string[];
  rightsHolderVoiceActors: string[];
  csoRoles: string[];
  capacityGapHints: CapacityGapHintId[];
  nextQuestion: string;
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
  exportedActorsForScreen9: Module3Actor[];
  optionalReflection?: string;
  carryForward: {
    snapshotField: 'dutyBearersAndActors';
    issue: string;
    nextUse: string;
  };
};

type RatingValue = 'lower' | 'medium' | 'higher';
type LikelyChangeRole =
  | 'enabling_role'
  | 'support_needed'
  | 'voice_gap'
  | 'possible_gatekeeping'
  | 'responsibility_not_active'
  | 'cso_support_role';

type Screen9ActorRating = {
  actorId: string;
  actorLabel: string;
  category: ActorCategory;
  powerToShapeDecisions: RatingValue | '';
  currentInfluence: RatingValue | '';
  livedKnowledge: RatingValue | '';
  likelyChangeRole: LikelyChangeRole | '';
};

type Screen9PowerMapZone = {
  zoneId:
    | 'shape_decisions_now'
    | 'bring_responsibility_into_design'
    | 'strengthen_voice_safely'
    | 'do_not_leave_out'
    | 'center_band';
  zoneLabel: string;
  actorIds: string[];
};

type ProblemLayerId = 'visible' | 'direct' | 'root' | 'capacity';
type Screen10FeedbackState =
  | 'strong'
  | 'capacity_missing'
  | 'surface_heavy'
  | 'root_heavy'
  | 'direct_cause_missing'
  | 'needs_refinement';

type Screen10Statement = {
  id: string;
  shortLabel: string;
  statement: string;
  suggestedLayer: ProblemLayerId;
  rationale: string;
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
  alignedCount: number;
  feedbackState: Screen10FeedbackState;
  rootCauseSummary: string;
  optionalReflection: string | null;
  carryForward: {
    snapshotField: 'Barriers, root causes, and capacity gaps';
    issue: 'The Jiru Amba design may rely on visible participation and activity lists without showing the deeper causes and capacity gaps that shape access, voice, accountability, and benefit.';
    nextUse: 'Use this in Screen 11 to check whether gender and disability are built into the design, not only mentioned.';
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
  | 'budgetAccessibilityAccommodation'
  | 'safePreConsultation'
  | 'strengthenFeedbackChannels'
  | 'addInfluenceFollowUpIndicators'
  | 'assignResponsibility';
type Screen11GenderStatus = 'strongerDesign' | 'visibleNotBuiltIn' | 'needsDesignRepair';
type Screen11DisabilityStatus = 'strongerDesign' | 'partlyBuiltIn' | 'needsDesignRepair';
type Screen11FeedbackState = 'strongerInclusionDesign' | 'mentionedNotBuiltIn' | 'needsDesignRepair' | 'mixedPattern';

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
  laterUse: string;
  icon: string;
};

type Screen11Submission = {
  screenId: 'M3-R11';
  route: '/module-3/screen-3-11';
  title: 'Gender and Disability Design Check';
  classifications: Record<M3Screen11SignalId, InclusionStatus>;
  selectedRepairs: M3Screen11RepairId[];
  genderDesignStatus: Screen11GenderStatus;
  disabilityDesignStatus: Screen11DisabilityStatus;
  primaryFeedbackState: Screen11FeedbackState;
  warningIds: string[];
  carryForwardQuestion: 'Who needs to participate, what support do they need to participate safely, how can they influence decisions, and how will they receive feedback?';
  optionalReflection?: string;
  savedAt: string;
};

type Screen9Submission = {
  screenId: 'M3-R09';
  submitted: true;
  selectedActorIds: string[];
  actorRatings: Screen9ActorRating[];
  generatedPowerMapZones: Screen9PowerMapZone[];
  detectedInsights: {
    hasVoiceGap: boolean;
    hasResponsibilityGap: boolean;
    hasPowerConcentration: boolean;
    hasCsoOverloadRisk: boolean;
    hasUnsafeLabel: boolean;
  };
  feedbackLevel: Screen9FeedbackLevel;
  warnings: string[];
  powerMapSummary: string;
  optionalReflection?: string;
  carryForward: {
    snapshotField: 'powerInfluenceAndCapacityGaps';
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
    text: 'The plan says women, youth, and persons with disabilities will be invited to community meetings.',
    hint: 'Does the design only invite people, or does it remove barriers to participation?',
    explanation: 'This names groups, but it does not yet show how timing, venue, information, accessibility, safety, or influence will be handled.',
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
    text: 'The plan does not check whether meeting time, location, seating, transport, language, or accessibility may prevent some people from joining.',
    hint: 'What design barriers could make equal invitation unequal in practice?',
    explanation: 'This is a design gap. Without checking practical access barriers, some rights-holders may be invited but still unable to participate.',
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
    text: 'The plan includes a target for women’s attendance but does not show whether women’s priorities can change the activity package or budget.',
    hint: 'Does the design count attendance, or does it support influence?',
    explanation: 'Attendance is visible, but meaningful participation requires influence over decisions, priorities, resources, and follow-up.',
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
    text: 'The plan budgets for accessible meeting venues, transport support where needed, accessible materials, and facilitation support after consulting local disability representatives.',
    hint: 'Does the design make participation more accessible in practical ways?',
    explanation: 'This is stronger because accessibility and reasonable accommodation are planned, budgeted, and linked to input from disability representatives.',
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
    text: 'The plan uses one suggestion box at the kebele office as the main feedback channel.',
    hint: 'Can different groups use this safely, privately, and realistically?',
    explanation: 'A feedback channel exists, but it may not be safe, accessible, trusted, or usable for women, youth, persons with disabilities, remote residents, or people with low literacy.',
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
    text: 'The plan tracks the number of people trained but does not track who influenced decisions, who faced barriers, who benefited, or whether complaints were answered.',
    hint: 'Does the evidence show inclusion quality, or only activity completion?',
    explanation: 'This is a gap. Activity counts do not show whether gender and disability inclusion changed access, influence, benefit, or accountability.',
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
    explanation: 'Review timing, venue, transport, safety, language, care-work, seating, and accessibility before confirming participation plans.',
    laterUse: 'Use this later to improve the participation pathway in Screen 12.',
    icon: module3Screen11Assets.icons.information,
  },
  {
    id: 'budgetAccessibilityAccommodation',
    title: 'Budget accessibility and reasonable accommodation',
    explanation: 'Include accessible venues, transport support where needed, accessible materials, sign or communication support where relevant, and facilitation adjustments.',
    laterUse: 'Use this later when repairing activities, budget assumptions, and implementation watch-points.',
    icon: module3Screen11Assets.icons.accessibility,
  },
  {
    id: 'safePreConsultation',
    title: 'Use safe pre-consultation with groups facing barriers',
    explanation: 'Speak with women’s groups, youth, OPDs, older persons, and remote community representatives in safe and appropriate ways before finalizing priorities.',
    laterUse: 'Use this later to strengthen meaningful participation and reduce token consultation.',
    icon: module3Screen11Assets.icons.safety,
  },
  {
    id: 'strengthenFeedbackChannels',
    title: 'Strengthen feedback channels',
    explanation: 'Add more than one feedback route so people can raise concerns safely, privately, accessibly, and without fear of retaliation.',
    laterUse: 'Use this later to design accountability routes that different groups can actually use.',
    icon: module3Screen11Assets.icons.feedback,
  },
  {
    id: 'addInfluenceFollowUpIndicators',
    title: 'Add influence and follow-up indicators',
    explanation: 'Track whether different groups influenced decisions, accessed activities, benefited, and received responses to concerns.',
    laterUse: 'Use this later when building intervention logic and indicators.',
    icon: module3Screen11Assets.icons.indicators,
  },
  {
    id: 'assignResponsibility',
    title: 'Assign responsibility for inclusion actions',
    explanation: 'Clarify which duty-bearer, supporting actor, or CSO role will act on accessibility, participation, information, feedback, and follow-up.',
    laterUse: 'Use this later to connect inclusion actions to duty-bearers, supporting actors, and CSO roles.',
    icon: module3Screen11Assets.icons.participation,
  },
];

const screen11FeedbackText: Record<Screen11FeedbackState, { title: string; text: string }> = {
  strongerInclusionDesign: {
    title: 'Good. You are moving from inclusion language to inclusion design.',
    text: 'Your selections show that gender and disability are not only being named. Several parts of the design now point toward practical changes in access, participation, accessibility, evidence, or follow-up. Keep checking whether rights-holders can influence decisions, not only attend activities.',
  },
  mentionedNotBuiltIn: {
    title: 'This design is visible, but not yet strong enough.',
    text: 'Your dashboard shows a common proposal pattern: women, youth, or persons with disabilities are mentioned, but the design does not yet show enough practical changes. Strengthen access, accommodation, influence, budget, feedback, and indicators before implementation.',
  },
  needsDesignRepair: {
    title: 'This design needs repair before implementation.',
    text: 'Your selections show that inclusion is not yet sufficiently built into the design. Use your two repair actions to make participation, accessibility, feedback, responsibility, and evidence more concrete.',
  },
  mixedPattern: {
    title: 'You found a mixed inclusion pattern.',
    text: 'Some parts of the design are stronger, while others only mention inclusion or leave it missing. This is realistic. Many proposals improve when teams check whether gender and disability affect access, influence, benefit, and follow-up.',
  },
};

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
  barriers: string[];
  decision: string;
  supports: string[];
  responseChannel: string;
  responsibleActor: string;
};

type Screen12Submission = {
  screenId: 'M3-R12';
  route: '/module-3/screen-3-12';
  title: 'Participation and Accountability Pathway';
  participationAccountabilityPathway: Screen12PathwaySelection & {
    followUpMeaning: string;
    badges: string[];
  };
  feedbackMessages: string[];
  optionalReflection?: string;
  savedAt: string;
};

type Screen13ImpactLevel = 'high' | 'medium' | 'lower';
type Screen13RiskCard = {
  riskCategory: string;
  affectedGroup: string;
  impactLevel: Screen13ImpactLevel | '';
  mitigationAction: string;
  responsibleActor: string;
  watchSign: string;
};

type Screen13Submission = {
  screenId: 'M3-R13';
  route: '/module-3/screen-3-13';
  title: 'Risk and Do-No-Harm in Project Design';
  riskDoNoHarmBoard: {
    cards: Array<Screen13RiskCard & { statusLabel: string }>;
    overallSummary: string;
    badges: string[];
  };
  feedbackMessages: string[];
  optionalReflection?: string;
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
  'Youth invited to training but unsure how priorities were chosen',
  'Persons with disabilities facing inaccessible meetings and materials',
  'Women who rely on water services affected by water fee and repair decisions',
  'People from remote kebeles who cannot easily attend central meetings',
];

const screen12Barriers = [
  'Information is late, unclear, or not accessible',
  'Meeting time or location excludes some people',
  'Some actors dominate the discussion',
  'People can speak but cannot influence decisions',
  'Feedback is collected but no response is given',
  'Complaint or concern channels may not feel safe',
  'Transport, care work, disability access, or language support is missing',
];

const screen12Decisions = [
  'Which market improvements are prioritized',
  'How youth training participants are selected',
  'Whether meeting venues and materials are accessible',
  'How water repair and fee information are shared',
  'How health post renovation priorities are decided',
  'How complaints and feedback are handled',
  'How budget choices are explained to the community',
];

const screen12Supports = [
  'Clear information before the meeting',
  'Separate pre-consultation with the group',
  'Accessible venue and materials',
  'Timing adjusted for care work, travel, or work schedules',
  'Transport or local meeting option',
  'Safe and non-identifying feedback channel',
  'Trusted facilitator or representative chosen by the group',
  'Plain-language explanation of what can and cannot change',
];

const screen12ResponseChannels = [
  'Public summary of what was heard and what changed',
  'Small group follow-up meeting',
  'Noticeboard or community information point',
  'Audio or verbal update through local structures',
  'CSO-facilitated feedback session with safe notes',
  'Accessible summary for persons with disabilities',
  'Response through the same group that raised the concern',
];

const screen12ResponsibleActors = [
  'Woreda planning office',
  'Relevant sector office',
  'Market office or committee',
  'Water committee and responsible public office',
  'Health office or health post management',
  'Kebele leadership with woreda follow-up',
  'Awra as facilitator only, with duty-bearer response required',
];

const screen13RiskCategories = [
  'Exclusion risk — some groups may still be left out',
  'Safety or backlash risk — people may face pressure for speaking up',
  'Data or visibility risk — information may expose people',
  'Power or capture risk — influential actors may shape benefits or priorities',
  'CSO overload risk — Awra may be expected to replace responsible actors',
  'Unrealistic assumption risk — the plan assumes resources or cooperation not yet secured',
  'No-response risk — feedback is collected but not answered',
];

const screen13AffectedGroups = [
  'Women vendors',
  'Youth',
  'Persons with disabilities',
  'Women who rely on water services',
  'People from remote kebeles',
  'Mixed rights-holder groups',
  'Awra staff and local facilitators',
  'Responsible public or service actors',
];

const screen13ImpactLevels: Array<{ value: Screen13ImpactLevel; label: string }> = [
  { value: 'high', label: 'High — needs design change before implementation' },
  { value: 'medium', label: 'Medium — mitigation needed before implementation' },
  { value: 'lower', label: 'Lower — monitor during implementation' },
];

const screen13Mitigations = [
  'Adjust meeting time, location, information, or accessibility',
  'Use a safe, non-identifying feedback or complaint channel',
  'Clarify selection criteria and explain decisions publicly',
  'Add separate pre-consultation for groups with less influence',
  'Assign a responsible duty-bearer or service actor for response',
  'Limit sensitive data collection to the minimum needed',
  'Add transparent follow-up on what changed and why',
  'Review power influence before finalizing priorities',
  'Confirm resources, transport, accessibility, or staff capacity before launch',
  'Reduce CSO overload by clarifying Awra’s facilitation role',
];

const screen13ResponsibleActors = [
  'Woreda planning office',
  'Relevant sector office',
  'Market office or committee',
  'Water committee and responsible public office',
  'Health office or health post management',
  'Kebele leadership with woreda follow-up',
  'Awra as facilitator, not substitute duty-bearer',
  'Joint response: Awra facilitates; responsible actor responds',
];

const screen13WatchSigns = [
  'One group stops attending or remains silent',
  'Feedback is low or comes from only powerful actors',
  'People report confusion about criteria or decisions',
  'Persons with disabilities cannot access meetings or information',
  'Women or youth say timing or location prevents participation',
  'Complaints are collected but no response is shared',
  'Budget or priority decisions are not explained',
  'Awra is asked to solve issues beyond its role',
  'Sensitive details appear in notes, reports, photos, or stories',
  'Planned resources or responsible actors are not available',
];

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
  root: 'What sits underneath the problem.',
  capacity: 'What actors need to do better.',
};

const problemLayerDefinitions: Record<ProblemLayerId, string> = {
  visible: 'What we can see in the plan or process.',
  direct: 'What directly produced the visible problem.',
  root: 'The pattern underneath, such as power, planning habits, social norms, weak accountability, or unclear responsibility.',
  capacity: 'What an actor cannot yet do well enough, because of limited information, authority, resources, coordination, skill, system, or safe space.',
};

const screen10Statements: Screen10Statement[] = [
  {
    id: 'S1',
    shortLabel: 'Consultation report does not show how input changed priorities',
    statement: 'The consultation report says many groups attended, but it does not show how their input changed final priorities.',
    suggestedLayer: 'visible',
    rationale: 'This is a visible sign because it shows what the report says and what it leaves unclear. It does not yet explain why this happened.',
  },
  {
    id: 'S2',
    shortLabel: 'Activity list does not show which barriers will change',
    statement: 'The plan lists ramps, training, market improvement, water repair, and feedback mechanisms, but it does not show which barriers each activity will change.',
    suggestedLayer: 'visible',
    rationale: 'This is a visible design sign because activities are present, but the link to barriers and rights-holder change is unclear.',
  },
  {
    id: 'S3',
    shortLabel: 'Prepared activity cards limited what consultation could change',
    statement: 'Activity cards were prepared before the ranking exercise, so people could choose only from options already on the table.',
    suggestedLayer: 'direct',
    rationale: 'This is a direct cause because pre-set choices directly limited what the consultation could change.',
  },
  {
    id: 'S4',
    shortLabel: 'Venue, timing, and materials limited full participation',
    statement: 'The meeting venue, timing, and printed materials made it harder for some people to participate fully.',
    suggestedLayer: 'direct',
    rationale: 'This is a direct cause because the way the meeting was organized directly limited access, voice, and participation.',
  },
  {
    id: 'S5',
    shortLabel: 'Planning treated attendance and validation as enough',
    statement: 'Planning practice treated attendance and validation as enough evidence of meaningful participation.',
    suggestedLayer: 'root',
    rationale: 'This is a deeper/root cause because it shows a planning habit underneath the weak process.',
  },
  {
    id: 'S6',
    shortLabel: 'Better-connected actors had more space to shape priorities',
    statement: 'Better-connected actors had more space to shape priorities than groups facing the strongest barriers.',
    suggestedLayer: 'root',
    rationale: 'This is a deeper/root cause because it describes a power pattern that affects whose priorities shape the plan.',
  },
  {
    id: 'S7',
    shortLabel: 'Planning teams need a method to turn findings into design',
    statement: 'Planning teams and CSO facilitators need a clearer method to turn consultation findings into objectives, budgets, indicators, and follow-up.',
    suggestedLayer: 'capacity',
    rationale: 'This is a capacity gap because it names what planning and facilitation actors need to do better.',
  },
  {
    id: 'S8',
    shortLabel: 'Public and service actors need clearer responsibility systems',
    statement: 'Public and service actors need clearer responsibility, resources, and follow-up systems for accessibility, complaints, and service quality.',
    suggestedLayer: 'capacity',
    rationale: 'This is a capacity gap because it identifies missing responsibility, resources, and systems needed for implementation.',
  },
];

const screen10FeedbackText: Record<Screen10FeedbackState, string> = {
  strong: 'Strong layered analysis. You separated visible signs, direct causes, deeper causes, and capacity gaps. This helps the project team avoid surface fixes and prepare stronger design changes.',
  capacity_missing: 'Capacity gaps are missing. A rights-based design should ask what different actors need in order to act, respond, coordinate, communicate, include, resource, or follow up.',
  surface_heavy: 'Your draft focuses mostly on visible signs. This is a good starting point, but surface signs alone can lead to weak fixes. Add the causes and capacity gaps that explain why the problem keeps happening.',
  root_heavy: 'Your draft treats many issues as deeper/root causes. Some issues may be visible signs or direct causes. A useful problem analysis separates the layers so the design team knows what to fix first.',
  direct_cause_missing: 'Direct causes are not visible enough. Try to identify what directly produced the visible problem before moving to deeper/root causes or capacity gaps.',
  needs_refinement: 'Good start. Use the suggested layer review to refine the difference between what is visible, what directly caused it, what sits underneath, and what capacity needs attention.',
};

const screen10SuggestionText: Record<Screen10FeedbackState, string> = {
  strong: 'Your draft separates what is visible from what causes it and what capacity needs attention. This gives the Jiru Amba design team a stronger basis for design repair than simply adding more activities or another consultation meeting.',
  capacity_missing: 'Your draft shows problems and causes, but capacity gaps are not visible enough. A stronger HRBA design asks what rights-holders, public actors, service actors, supporting actors, and CSO facilitators need in order to act, respond, coordinate, influence, or follow up.',
  surface_heavy: 'Your draft identifies several visible problems. To strengthen the analysis, also ask why those problems happened and what capacity or responsibility needs attention. A rights-based design should not stop at what appears in the report or activity list.',
  root_heavy: 'Your draft places many issues at the deeper/root-cause level. Strengthen the analysis by separating what is visible, what directly caused it, what sits underneath, and what capacity needs attention.',
  direct_cause_missing: 'Your draft is a useful start. Strengthen it by checking whether each statement describes what is visible, what directly caused it, what sits underneath, or what capacity needs to improve.',
  needs_refinement: 'Your draft is a useful start. Strengthen it by checking whether each statement describes what is visible, what directly caused it, what sits underneath, or what capacity needs to improve.',
};

const screen10Warnings = {
  surfaceHeavy: 'Surface fix risk: if most items are visible signs, the design may jump to another meeting or activity without changing causes.',
  directMissing: 'Direct cause missing: identify what directly limited participation, access, influence, or follow-up.',
  rootMissing: 'Deeper cause missing: check the planning habit, power pattern, accountability gap, or social norm underneath the problem.',
  capacityMissing: 'Capacity gap missing: identify what an actor cannot yet do well enough and what support, authority, resources, method, or system is needed.',
  lowAlignment: 'Layer distinction needs review: compare your selected layers with the suggested layer notes before carrying this forward.',
  capacityHeavy: 'Capacity-only risk: capacity gaps matter, but not every problem is solved by training or support. Also check power, accountability, and design choices.',
};

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
    label: 'Safety or comfort barrier',
    description: 'Some groups may not feel safe or comfortable raising concerns.',
  },
  {
    id: 'livelihood_market_risk',
    label: 'Livelihood or market-risk barrier',
    description: 'Livelihood activities may not connect clearly to practical opportunity or benefit.',
  },
  {
    id: 'feedback_response_gap',
    label: 'Feedback or response gap',
    description: 'People may not know what changed after consultation or feedback.',
  },
  {
    id: 'income_related_barrier',
    label: 'Income-related barrier',
    description: 'Low-income households may face cost, time, or access barriers.',
  },
  {
    id: 'unclear_pathway_to_benefit',
    label: 'Unclear pathway to benefit',
    description: 'The plan may list activities but not show how they lead to practical benefit.',
  },
];

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
  rights_holder_voice_support: [
    'Represent lived experience',
    'Identify hidden barriers',
    'Support safe participation',
    'Check accessibility',
    'Share group priorities',
    'Validate whether decisions changed',
    'Raise concerns safely',
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

const screen8NextQuestionByBarrier: Record<Screen8BarrierId, string> = {
  limited_influence: 'Who currently influences the plan, and whose voice needs stronger influence?',
  information_barrier: 'Who controls information flow, and who needs clearer or more accessible information?',
  accessibility_barrier: 'Who has power to budget, provide, and monitor accessibility measures?',
  timing_care_work_barrier: 'Who can change timing, venue, or participation arrangements?',
  distance_transport_barrier: 'Who can reduce distance, transport, or cost barriers?',
  safety_comfort_barrier: 'Who can create safer participation and feedback channels?',
  livelihood_market_risk: 'Who can connect activities to practical livelihood or market benefit?',
  feedback_response_gap: 'Who responds by when, and how will people know what changed?',
  income_related_barrier: 'Who can reduce cost barriers or adjust support so low-income households can participate and benefit?',
  unclear_pathway_to_benefit: 'Who can clarify the pathway from activity to practical benefit?',
};

const actorCategoryLabels: Record<ActorCategory, string> = {
  primary_public_responsibility: 'Public responsibility',
  service_or_local_implementation: 'Service or local implementation',
  rights_holder_voice_support: 'Rights-holder voice or support',
  cso_role: 'CSO role',
  rights_holder_group: 'Rights-holder group',
  generalized_custom_actor: 'Generalized actor role',
};

const screen9CustomActorCategoryOptions: Array<{ value: ActorCategory; label: string }> = [
  { value: 'primary_public_responsibility', label: 'Public responsibility' },
  { value: 'service_or_local_implementation', label: 'Service or local implementation' },
  { value: 'rights_holder_voice_support', label: 'Rights-holder voice or supporting actor' },
  { value: 'cso_role', label: 'CSO role' },
  { value: 'generalized_custom_actor', label: 'Other generalized actor role' },
];

const screen9DefaultActors: Module3Actor[] = [
  { actorId: 'woreda_planning_office', label: 'Woreda planning office', category: 'primary_public_responsibility', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'relevant_woreda_sector_office', label: 'Relevant woreda sector office', category: 'primary_public_responsibility', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'woreda_water_service_office', label: 'Woreda water or service office', category: 'primary_public_responsibility', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'kebele_administration', label: 'Kebele administration', category: 'primary_public_responsibility', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'public_service_provider_facility', label: 'Public service provider or facility', category: 'primary_public_responsibility', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'local_service_water_committee', label: 'Local service or water committee', category: 'service_or_local_implementation', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'training_provider', label: 'Training provider', category: 'service_or_local_implementation', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'market_or_cooperative_office', label: 'Market or cooperative office', category: 'service_or_local_implementation', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'community_information_focal_point', label: 'Community information focal point', category: 'service_or_local_implementation', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'womens_group_or_cooperative', label: 'Women’s group or cooperative', category: 'rights_holder_voice_support', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'youth_group', label: 'Youth group', category: 'rights_holder_voice_support', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'disability_representative_or_opd', label: 'Disability representative or OPD', category: 'rights_holder_voice_support', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'remote_kebele_representative', label: 'Remote kebele representative', category: 'rights_holder_voice_support', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'low_income_household_representative', label: 'Low-income household representative', category: 'rights_holder_voice_support', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'respected_leaders_possible_gatekeeper', label: 'Respected community leaders or possible gatekeepers', category: 'rights_holder_voice_support', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'women_traders', label: 'Women traders', category: 'rights_holder_group', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'women_rely_water_services', label: 'Women who rely on water services', category: 'rights_holder_group', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'youth_livelihood_opportunities', label: 'Youth seeking livelihood opportunities', category: 'rights_holder_group', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'persons_with_disabilities', label: 'Persons with disabilities', category: 'rights_holder_group', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'remote_kebele_communities', label: 'Communities in remote kebeles', category: 'rights_holder_group', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'local_cso_facilitator', label: 'Local CSO facilitator', category: 'cso_role', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
  { actorId: 'local_cso_network', label: 'Local CSO network', category: 'cso_role', sourceScreen: 'screen9_default', linkedBarrierIds: [] },
];

const likelyRoleOptions: Array<{ id: LikelyChangeRole; label: string }> = [
  { id: 'enabling_role', label: 'Can enable change' },
  { id: 'support_needed', label: 'Needs support to engage' },
  { id: 'voice_gap', label: 'Has lived knowledge but low influence' },
  { id: 'possible_gatekeeping', label: 'May shape or limit access' },
  { id: 'responsibility_not_active', label: 'Has responsibility but not yet active' },
  { id: 'cso_support_role', label: 'CSO support role' },
];

const ratingOptions: RatingValue[] = ['lower', 'medium', 'higher'];

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
    voiceActorIds: [],
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
    ...mapping.voiceActorIds,
    ...mapping.csoRoleIds,
  ];
}

function getScreen8PreviewStatus(mapping: Screen8BarrierMapping) {
  const actorCount = getScreen8SelectedActorIds(mapping).length;
  if (mapping.publicActorIds.length === 0 && mapping.csoRoleIds.length > 0) return 'CSO role only — add public responsibility';
  if (mapping.publicActorIds.length === 0) return 'No public responsibility yet';
  if (mapping.serviceActorIds.length === 0 && mapping.voiceActorIds.length === 0) return 'Supporting voice missing';
  if (mapping.capacityGapHintIds.length === 0) return 'Capacity hint missing';
  if (actorCount > 5) return 'Too many actors — focus the map';
  return 'Ready';
}

function generateScreen8Rows(
  selectedBarrierIds: Screen8BarrierId[],
  mappings: Record<string, Screen8BarrierMapping>,
  actors: Screen8ActorOption[],
): Screen8GeneratedRow[] {
  return selectedBarrierIds.map((barrierId) => {
    const mapping = getScreen8Mapping(mappings, barrierId);
    return {
      barrierId,
      barrierLabel: getBarrierLabel(barrierId),
      primaryPublicResponsibility: mapping.publicActorIds.map((actorId) => getActorLabel(actorId, actors)),
      serviceOrSupportingActors: [...mapping.serviceActorIds, ...mapping.voiceActorIds].map((actorId) => getActorLabel(actorId, actors)),
      rightsHolderVoiceActors: mapping.voiceActorIds.map((actorId) => getActorLabel(actorId, actors)),
      csoRoles: mapping.csoRoleIds.map((actorId) => getActorLabel(actorId, actors)),
      capacityGapHints: mapping.capacityGapHintIds,
      nextQuestion: screen8NextQuestionByBarrier[barrierId],
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
  const hasRightsHolderVoice = selectedMappings.some((mapping) => mapping.voiceActorIds.length > 0);
  const hasSupportingActor = selectedMappings.some((mapping) => mapping.serviceActorIds.length > 0 || mapping.voiceActorIds.length > 0);
  const hasCsoRole = selectedMappings.some((mapping) => mapping.csoRoleIds.length > 0);
  const hasCapacityGapHint = selectedMappings.some((mapping) => mapping.capacityGapHintIds.length > 0);
  const actorCountTooHigh = selectedMappings.some((mapping) => getScreen8SelectedActorIds(mapping).length > 5);
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

  if (missingResponsibilityWarning) warnings.push('Missing responsibility: add a public or mandated actor for this barrier.');
  if (overloadWarning) warnings.push('CSO overload risk: the CSO is carrying the action without a visible public or service actor.');
  if (!hasRightsHolderVoice) warnings.push('Rights-holder voice missing: add an actor who can help represent lived experience or check whether response reached people.');
  if (!hasCapacityGapHint) warnings.push('Capacity-gap hint missing: choose what might explain weak response so the next screen can examine it.');
  if (actorCountTooHigh || actionsTooBroad) warnings.push('The map is becoming broad. Keep only actors whose role changes the design.');
  if (hasUnsafeLabel) warnings.push('Use general actor roles only. Do not enter real names, accusations, complaints, exact locations, or sensitive details.');

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

function getDefaultActorRating(actor: Module3Actor): Screen9ActorRating {
  if (actor.actorId === 'respected_leaders_possible_gatekeeper') {
    return {
      actorId: actor.actorId,
      actorLabel: actor.label,
      category: actor.category,
      powerToShapeDecisions: 'medium',
      currentInfluence: 'higher',
      livedKnowledge: 'medium',
      likelyChangeRole: 'possible_gatekeeping',
    };
  }

  if (actor.category === 'primary_public_responsibility') {
    return {
      actorId: actor.actorId,
      actorLabel: actor.label,
      category: actor.category,
      powerToShapeDecisions: 'higher',
      currentInfluence: 'medium',
      livedKnowledge: 'lower',
      likelyChangeRole: 'responsibility_not_active',
    };
  }

  if (actor.category === 'service_or_local_implementation') {
    return {
      actorId: actor.actorId,
      actorLabel: actor.label,
      category: actor.category,
      powerToShapeDecisions: 'medium',
      currentInfluence: 'medium',
      livedKnowledge: 'medium',
      likelyChangeRole: 'enabling_role',
    };
  }

  if (actor.category === 'rights_holder_voice_support' || actor.category === 'rights_holder_group') {
    return {
      actorId: actor.actorId,
      actorLabel: actor.label,
      category: actor.category,
      powerToShapeDecisions: 'lower',
      currentInfluence: 'lower',
      livedKnowledge: 'higher',
      likelyChangeRole: 'voice_gap',
    };
  }

  return {
    actorId: actor.actorId,
    actorLabel: actor.label,
    category: actor.category,
    powerToShapeDecisions: 'medium',
    currentInfluence: 'medium',
    livedKnowledge: 'medium',
    likelyChangeRole: 'cso_support_role',
  };
}

function createEmptyActorRating(actor: Module3Actor): Screen9ActorRating {
  return {
    actorId: actor.actorId,
    actorLabel: actor.label,
    category: actor.category,
    powerToShapeDecisions: '',
    currentInfluence: '',
    livedKnowledge: '',
    likelyChangeRole: '',
  };
}

function isScreen9RatingComplete(rating: Screen9ActorRating) {
  return Boolean(
    rating.powerToShapeDecisions &&
      rating.currentInfluence &&
      rating.livedKnowledge &&
      rating.likelyChangeRole,
  );
}

function ratingScore(value: RatingValue | '') {
  if (value === 'higher') return 3;
  if (value === 'medium') return 2;
  if (value === 'lower') return 1;
  return 0;
}

function getPowerMapZone(rating: Screen9ActorRating): Screen9PowerMapZone['zoneId'] {
  const powerScore = ratingScore(rating.powerToShapeDecisions);
  const influenceScore = ratingScore(rating.currentInfluence);
  const livedKnowledgeScore = ratingScore(rating.livedKnowledge);
  let zone: Screen9PowerMapZone['zoneId'];

  if (powerScore === 3 && influenceScore === 3) {
    zone = 'shape_decisions_now';
  } else if (powerScore === 3 && influenceScore <= 2) {
    zone = 'bring_responsibility_into_design';
  } else if (livedKnowledgeScore === 3 && influenceScore <= 2) {
    zone = 'strengthen_voice_safely';
  } else if (powerScore <= 2 && influenceScore <= 1) {
    zone = 'do_not_leave_out';
  } else {
    zone = 'center_band';
  }

  if (rating.likelyChangeRole === 'voice_gap') return 'strengthen_voice_safely';
  if (rating.likelyChangeRole === 'responsibility_not_active' && powerScore >= 2) return 'bring_responsibility_into_design';
  if (rating.likelyChangeRole === 'possible_gatekeeping' && influenceScore >= 2) {
    return powerScore >= 2 ? 'shape_decisions_now' : 'center_band';
  }
  if (rating.likelyChangeRole === 'cso_support_role' && zone === 'shape_decisions_now' && powerScore < 3) return 'center_band';

  return zone;
}

const powerMapZoneLabels: Record<Screen9PowerMapZone['zoneId'], string> = {
  shape_decisions_now: 'Shape decisions now',
  bring_responsibility_into_design: 'Bring responsibility into the design',
  strengthen_voice_safely: 'Strengthen voice safely',
  do_not_leave_out: 'Do not leave out',
  center_band: 'Center band',
};

const powerMapZoneInterpretations: Record<Screen9PowerMapZone['zoneId'], string> = {
  shape_decisions_now: 'Actors who can shape decisions and already influence the plan.',
  bring_responsibility_into_design: 'Actors with responsibility or authority who may need clearer engagement.',
  strengthen_voice_safely: 'Actors or groups with lived knowledge whose influence may need strengthening.',
  do_not_leave_out: 'Actors or groups who may be affected or relevant but are not yet visible.',
  center_band: 'Actors with mixed or medium ratings. Check what would move them toward stronger accountability or safer voice.',
};

function generatePowerMapZones(ratings: Screen9ActorRating[]): Screen9PowerMapZone[] {
  const zones: Screen9PowerMapZone[] = [
    { zoneId: 'shape_decisions_now', zoneLabel: powerMapZoneLabels.shape_decisions_now, actorIds: [] },
    { zoneId: 'bring_responsibility_into_design', zoneLabel: powerMapZoneLabels.bring_responsibility_into_design, actorIds: [] },
    { zoneId: 'strengthen_voice_safely', zoneLabel: powerMapZoneLabels.strengthen_voice_safely, actorIds: [] },
    { zoneId: 'do_not_leave_out', zoneLabel: powerMapZoneLabels.do_not_leave_out, actorIds: [] },
    { zoneId: 'center_band', zoneLabel: powerMapZoneLabels.center_band, actorIds: [] },
  ];

  ratings.forEach((rating) => {
    const zone = zones.find((item) => item.zoneId === getPowerMapZone(rating));
    zone?.actorIds.push(rating.actorId);
  });

  return zones;
}

function getEngagementQuestion(role: LikelyChangeRole | '') {
  if (role === 'enabling_role') return 'How can this actor support practical design change?';
  if (role === 'support_needed') return 'What support or information does this actor need to engage constructively?';
  if (role === 'voice_gap') return 'How can this group’s lived knowledge influence decisions safely?';
  if (role === 'possible_gatekeeping') return 'How can the design reduce gatekeeping and widen safe participation?';
  if (role === 'responsibility_not_active') return 'How can responsibility become visible in the design before implementation?';
  if (role === 'cso_support_role') return 'How can the CSO support voice and accountability without replacing duty-bearers?';
  return 'What engagement question should the design team ask next?';
}

function deriveScreen9Feedback(ratings: Screen9ActorRating[], hasUnsafeLabel: boolean): {
  detectedInsights: Screen9Submission['detectedInsights'];
  feedbackLevel: Screen9FeedbackLevel;
  warnings: string[];
} {
  const includesPublic = ratings.some((rating) => rating.category === 'primary_public_responsibility');
  const includesVoice = ratings.some((rating) => rating.category === 'rights_holder_group' || rating.category === 'rights_holder_voice_support');
  const includesServiceSupport = ratings.some((rating) => rating.category === 'service_or_local_implementation');
  const includesCsoRole = ratings.some((rating) => rating.category === 'cso_role');
  const includesCso = includesServiceSupport || includesCsoRole;
  const hasVoiceGap = ratings.some((rating) =>
    (rating.category === 'rights_holder_group' || rating.category === 'rights_holder_voice_support') &&
    rating.livedKnowledge === 'higher' &&
    (rating.currentInfluence === 'lower' || rating.currentInfluence === 'medium'),
  );
  const hasResponsibilityGap = ratings.some((rating) =>
    rating.category === 'primary_public_responsibility' &&
    rating.powerToShapeDecisions === 'higher' &&
    rating.currentInfluence === 'lower',
  );
  const highPowerHighInfluence = ratings.filter((rating) =>
    rating.powerToShapeDecisions === 'higher' && rating.currentInfluence === 'higher',
  );
  const hasRightsHolderInHighZone = highPowerHighInfluence.some((rating) =>
    rating.category === 'rights_holder_group' || rating.category === 'rights_holder_voice_support',
  );
  const hasPowerConcentration = highPowerHighInfluence.length >= 3 && !hasRightsHolderInHighZone;
  const hasCsoOverloadRisk = ratings.some((rating) =>
    rating.category === 'cso_role' &&
    rating.powerToShapeDecisions === 'higher' &&
    rating.currentInfluence === 'higher',
  );
  const tooManyHighRatings = ratings.length > 0 && ratings.every((rating) =>
    rating.powerToShapeDecisions === 'higher' || rating.currentInfluence === 'higher',
  );
  const missingRatings = ratings.some((rating) => !isScreen9RatingComplete(rating));
  const actorMixMissing = !includesPublic || !includesVoice || !includesCso;

  const detectedInsights = {
    hasVoiceGap,
    hasResponsibilityGap,
    hasPowerConcentration,
    hasCsoOverloadRisk,
    hasUnsafeLabel: hasUnsafeLabel,
  };
  const strongReady =
    ratings.length >= 4 &&
    ratings.length <= 7 &&
    includesPublic &&
    includesVoice &&
    includesCso &&
    includesServiceSupport &&
    includesCsoRole &&
    hasVoiceGap &&
    !hasUnsafeLabel &&
    !hasResponsibilityGap &&
    !hasPowerConcentration;
  const feedbackLevel: Screen9FeedbackLevel = hasUnsafeLabel
    ? 'unsafe_label'
    : hasResponsibilityGap
      ? 'responsibility_gap'
      : hasPowerConcentration
          ? 'power_concentration'
        : strongReady
            ? 'strong'
          : hasVoiceGap
            ? 'voice_gap'
            : actorMixMissing || !hasVoiceGap
              ? 'good_with_gap'
              : 'too_broad';
  const warnings: string[] = [];

  if (actorMixMissing) {
    warnings.push('Actor mix missing: include at least one public responsibility actor, one rights-holder voice or rights-holder group, and one CSO/support role.');
  }
  if (missingRatings) {
    warnings.push('Ratings missing: rate power, current influence, lived knowledge, and likely change role for each selected actor.');
  }
  if (!hasVoiceGap) {
    warnings.push('Voice gap not visible: include at least one actor or group with lived knowledge that may have lower current influence.');
  }
  if (hasResponsibilityGap) {
    warnings.push('Responsibility gap: a public actor has responsibility or power but low current influence. Check how they will be engaged.');
  }
  if (hasPowerConcentration) {
    warnings.push('Power concentration: influence may sit with actors who are already powerful. Check whether rights-holder voice can shape decisions.');
  }
  if (tooManyHighRatings) {
    warnings.push('Too many high ratings: if everyone is high power and high influence, the map will not show useful differences.');
  }
  if (hasUnsafeLabel) {
    warnings.push('Use general actor roles only. Do not enter real names, accusations, complaints, exact locations, or sensitive details.');
  }

  return { detectedInsights, feedbackLevel, warnings: warnings.slice(0, 4) };
}

function getScreen8FeedbackCopy(feedbackLevel: Screen8FeedbackLevel) {
  if (feedbackLevel === 'strong') {
    return 'Strong responsibility map. You separated public responsibility from supporting roles and CSO roles. This helps avoid overloading the CSO while keeping accountability, participation, and follow-up visible.';
  }
  if (feedbackLevel === 'good_with_gap') {
    return 'Good start. Strengthen the map by checking whether each barrier has a responsible public actor, a supporting actor or rights-holder voice, a realistic CSO role, and a capacity-gap hint.';
  }
  if (feedbackLevel === 'cso_overload') {
    return 'The CSO role is too heavy. A rights-based design should not make the CSO responsible for everything. Add the public or service actors who have responsibility to act, respond, or coordinate.';
  }
  if (feedbackLevel === 'missing_responsibility') {
    return 'The map is missing public responsibility. Supporting actors and CSOs can help, but the design also needs to show who has responsibility for action, response, or service improvement.';
  }
  return 'Your map is broad. Focus on the actors whose role changes the design: who must act, who can support rights-holder voice, and what the CSO can realistically do.';
}

function getScreen9FeedbackCopy(feedbackLevel: Screen9FeedbackLevel) {
  if (feedbackLevel === 'strong') {
    return 'Strong power and influence map. You showed that responsibility, influence, and lived knowledge may sit with different actors. This helps the design plan safer participation, realistic engagement, and clearer accountability.';
  }
  if (feedbackLevel === 'good_with_gap') {
    return 'Good start. Strengthen the map by checking whether it includes public responsibility, rights-holder voice, CSO support, and at least one group with lived knowledge that may need stronger influence.';
  }
  if (feedbackLevel === 'voice_gap') {
    return 'Your map shows a voice gap. The design should not only consult these groups. It should show how their lived knowledge can safely influence priorities, activities, and follow-up.';
  }
  if (feedbackLevel === 'responsibility_gap') {
    return 'Your map shows a responsibility gap. A public or service actor may have responsibility but is not yet strongly engaged in the plan. The design should clarify how that actor will respond or follow up.';
  }
  if (feedbackLevel === 'power_concentration') {
    return 'Your map suggests influence may be concentrated. Check whether decisions are being shaped without enough voice from the groups most affected by the barriers.';
  }
  if (feedbackLevel === 'unsafe_label') {
    return 'Use general actor roles only. Do not enter names, accusations, complaints, exact locations, or sensitive details.';
  }
  return 'Your map is broad. Use the map to focus: who can shape decisions, who needs stronger voice, and who must be engaged before implementation?';
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
  if (visibleCount >= 4) return 'surface_heavy';
  if (rootCount >= 5) return 'root_heavy';
  if (directCount === 0) return 'direct_cause_missing';
  if (alignedCount >= 6 && hasAllLayers === true) return 'strong';
  return 'needs_refinement';
}

function getScreen10Warnings(selections: Record<string, ProblemLayerId | undefined>) {
  const { visibleCount, directCount, rootCount, capacityCount } = getScreen10LayerCounts(selections);
  const alignedCount = getScreen10AlignedCount(selections);
  const warnings: string[] = [];

  if (visibleCount >= 4) warnings.push(screen10Warnings.surfaceHeavy);
  if (directCount === 0) warnings.push(screen10Warnings.directMissing);
  if (rootCount === 0) warnings.push(screen10Warnings.rootMissing);
  if (capacityCount === 0) warnings.push(screen10Warnings.capacityMissing);
  if (alignedCount <= 4) warnings.push(screen10Warnings.lowAlignment);
  if (capacityCount >= 4) warnings.push(screen10Warnings.capacityHeavy);

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
    return 'The Jiru Amba design problem is not only a weak activity package. The case suggests visible participation gaps, direct barriers in how consultation was organized, deeper power and planning patterns, and capacity gaps in turning consultation findings into design changes.';
  }
  return screen10FeedbackText[feedbackState];
}

function buildScreen10Submission(
  selections: Record<string, ProblemLayerId | undefined>,
  optionalReflection: string,
): Screen10Submission {
  const grouped = getScreen10GroupedStatements(selections);
  const feedbackState = getScreen10FeedbackState(selections);
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
    alignedCount: getScreen10AlignedCount(selections),
    feedbackState,
    rootCauseSummary: getScreen10RootCauseSummary(feedbackState),
    optionalReflection: optionalReflection.trim() ? optionalReflection.trim().slice(0, 220) : null,
    carryForward: {
      snapshotField: 'Barriers, root causes, and capacity gaps',
      issue: 'The Jiru Amba design may rely on visible participation and activity lists without showing the deeper causes and capacity gaps that shape access, voice, accountability, and benefit.',
      nextUse: 'Use this in Screen 11 to check whether gender and disability are built into the design, not only mentioned.',
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
  if (classifiedCount === 0) return 'Classify all six design signals before saving your dashboard.';
  if (classifiedCount < screen11Signals.length) return 'You still need to classify all six design signals.';
  if (selectedRepairs.length === 0) return 'Choose two design repairs before saving your dashboard.';
  if (selectedRepairs.length === 1) return 'Choose one more repair action before saving your dashboard.';
  return 'Ready to save your gender and disability design check.';
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
  if (values.filter((value) => value === 'built').length >= 3 && selectedRepairs.length === 2) return 'strongerInclusionDesign';
  if (values.filter((value) => value === 'mentioned').length >= 3) return 'mentionedNotBuiltIn';
  if (values.filter((value) => value === 'missing').length >= 3) return 'needsDesignRepair';
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
  optionalReflection: string,
): Screen11Submission {
  const completeClassifications = Object.fromEntries(
    screen11Signals.map((signal) => [signal.id, classifications[signal.id] as InclusionStatus]),
  ) as Record<M3Screen11SignalId, InclusionStatus>;
  const genderDesignStatus = getScreen11GenderStatus(completeClassifications);
  const disabilityDesignStatus = getScreen11DisabilityStatus(completeClassifications);
  const primaryFeedbackState = getScreen11FeedbackState(completeClassifications, selectedRepairs);
  return {
    screenId: 'M3-R11',
    route: '/module-3/screen-3-11',
    title: 'Gender and Disability Design Check',
    classifications: completeClassifications,
    selectedRepairs,
    genderDesignStatus,
    disabilityDesignStatus,
    primaryFeedbackState,
    warningIds: getScreen11Warnings(completeClassifications).map((warning) => warning.id),
    carryForwardQuestion: 'Who needs to participate, what support do they need to participate safely, how can they influence decisions, and how will they receive feedback?',
    optionalReflection: optionalReflection.trim() ? optionalReflection.trim().slice(0, 280) : undefined,
    savedAt: new Date().toISOString(),
  };
}

function getScreen12RequiredSignature(selection: Screen12PathwaySelection) {
  return JSON.stringify(selection);
}

function isScreen12Valid(selection: Screen12PathwaySelection) {
  return Boolean(
    selection.group &&
    selection.barriers.length >= 1 &&
    selection.barriers.length <= 2 &&
    selection.decision &&
    selection.supports.length >= 1 &&
    selection.supports.length <= 3 &&
    selection.responseChannel &&
    selection.responsibleActor,
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
  if (!selection.group) return 'Choose one rights-holder group first.';
  if (selection.barriers.length === 0) return 'Select at least one participation barrier.';
  if (selection.barriers.length > 2) return 'Keep this pathway focused. Select no more than two barriers.';
  if (!selection.decision) return 'Choose the decision this group should influence.';
  if (selection.supports.length === 0) return 'Select at least one support action that makes participation realistic.';
  if (selection.supports.length > 3) return 'Select up to three support actions so the pathway stays practical.';
  if (!selection.responseChannel) return 'Choose how people will receive a response.';
  if (!selection.responsibleActor) return 'Choose who must respond.';
  return 'Ready to build your participation and accountability pathway.';
}

function getScreen12FollowUpMeaning(selection: Screen12PathwaySelection) {
  if (selection.responsibleActor === 'Awra as facilitator only, with duty-bearer response required') {
    return 'This pathway keeps Awra in a facilitation role. Awra can help document and share feedback safely, but a responsible public or service actor must still respond to the issue.';
  }
  return `This pathway moves from invitation to accountability because ${selection.group} can influence ${selection.decision} with ${selection.supports.join(', ')}. The response should come through ${selection.responseChannel}, and ${selection.responsibleActor} must explain what changed, what did not change, and why.`;
}

function getScreen12Badges(selection: Screen12PathwaySelection) {
  const badges = ['Pathway drafted'];
  if (selection.barriers.includes('People can speak but cannot influence decisions')) badges.push('Influence gap addressed');
  if (selection.barriers.includes('Feedback is collected but no response is given')) badges.push('Response loop added');
  if (selection.barriers.includes('Complaint or concern channels may not feel safe')) badges.push('Safe channel needed');
  if (selection.supports.includes('Accessible venue and materials')) badges.push('Accessibility support included');
  if (selection.supports.includes('Separate pre-consultation with the group')) badges.push('Pre-consultation included');
  if (selection.responsibleActor === 'Awra as facilitator only, with duty-bearer response required') badges.push('CSO role bounded');
  if (selection.responsibleActor && selection.responsibleActor !== 'Awra as facilitator only, with duty-bearer response required') badges.push('Responsible actor named');
  return badges;
}

function getScreen12Feedback(selection: Screen12PathwaySelection) {
  const messages = ['This is a stronger HRBA design pathway because it connects voice, influence, response, and responsibility. The next step is to check whether any risks could still make this pathway unsafe, exclusionary, or unrealistic.'];
  if (selection.barriers.includes('People can speak but cannot influence decisions')) {
    messages.push('Good catch. This is the common attendance-only risk: people may be present, but the plan does not show what decision they can shape. Your pathway should protect a real influence point.');
  }
  if (selection.barriers.includes('Feedback is collected but no response is given')) {
    messages.push('This is an accountability gap. Feedback only becomes useful when someone reviews it, responds to it, and explains what changed or why something could not change.');
  }
  if (selection.barriers.includes('Complaint or concern channels may not feel safe')) {
    messages.push('Treat this carefully. Do not ask people to raise sensitive concerns publicly. Use safe, non-identifying channels and only collect the minimum information needed.');
  }
  if (selection.responsibleActor === 'Awra as facilitator only, with duty-bearer response required') {
    messages.push('This keeps the CSO role realistic. Awra can facilitate, document, connect, and follow up, but it should not replace the duty-bearer or responsible service actor.');
  }
  return messages;
}

function buildScreen12Submission(selection: Screen12PathwaySelection, optionalReflection: string): Screen12Submission {
  return {
    screenId: 'M3-R12',
    route: '/module-3/screen-3-12',
    title: 'Participation and Accountability Pathway',
    participationAccountabilityPathway: {
      ...selection,
      followUpMeaning: getScreen12FollowUpMeaning(selection),
      badges: getScreen12Badges(selection),
    },
    feedbackMessages: getScreen12Feedback(selection),
    optionalReflection: optionalReflection.trim() ? optionalReflection.trim().slice(0, 350) : undefined,
    savedAt: new Date().toISOString(),
  };
}

function getEmptyRiskCard(): Screen13RiskCard {
  return {
    riskCategory: '',
    affectedGroup: '',
    impactLevel: '',
    mitigationAction: '',
    responsibleActor: '',
    watchSign: '',
  };
}

function getScreen13RequiredSignature(cards: Screen13RiskCard[]) {
  return JSON.stringify(cards);
}

function isScreen13CardComplete(card: Screen13RiskCard) {
  return Boolean(card.riskCategory && card.affectedGroup && card.impactLevel && card.mitigationAction && card.responsibleActor && card.watchSign);
}

function isScreen13Valid(cards: Screen13RiskCard[]) {
  return cards.length === 3 && cards.every(isScreen13CardComplete);
}

function getScreen13HelperText(cards: Screen13RiskCard[], submitted: boolean, formChanged: boolean) {
  if (submitted && formChanged) return 'Update your risk board before saving this screen.';
  if (submitted) return 'Your risk and do-no-harm board is ready to save.';
  for (let index = 0; index < 3; index += 1) {
    const card = cards[index];
    if (!card.riskCategory) return index === 0 ? 'Complete Risk 1 first. Choose a risk category.' : `Complete Risk ${index + 1}. Choose a risk category.`;
    if (!isScreen13CardComplete(card)) return `Complete all fields for Risk ${index + 1} before building the board.`;
  }
  return 'Ready to build your risk and do-no-harm board.';
}

function getRiskStatusLabel(impactLevel: Screen13ImpactLevel | '') {
  if (impactLevel === 'high') return 'High risk · design change needed';
  if (impactLevel === 'medium') return 'Medium risk · mitigation needed';
  return 'Lower risk · monitor during implementation';
}

function getScreen13OverallSummary(cards: Screen13RiskCard[]) {
  if (cards.some((card) => card.impactLevel === 'high')) {
    return 'Overall risk pattern: Design repair needed before implementation. At least one risk could harm inclusion, safety, accountability, or trust if the design moves forward unchanged.';
  }
  if (cards.some((card) => card.impactLevel === 'medium')) {
    return 'Overall risk pattern: Mitigation needed before implementation. The design can move forward only if the selected safeguards are built into the plan.';
  }
  return 'Overall risk pattern: Monitor during implementation. No high risk is selected, but the watch signs should still be tracked during delivery.';
}

function getScreen13Badges(cards: Screen13RiskCard[]) {
  const categories = cards.map((card) => card.riskCategory);
  const badges = ['Risk board drafted'];
  if (categories.includes('Exclusion risk — some groups may still be left out')) badges.push('Exclusion checked');
  if (categories.includes('Safety or backlash risk — people may face pressure for speaking up')) badges.push('Safety risk checked');
  if (categories.includes('Data or visibility risk — information may expose people')) badges.push('Data protection checked');
  if (categories.includes('Power or capture risk — influential actors may shape benefits or priorities')) badges.push('Power risk checked');
  if (categories.includes('CSO overload risk — Awra may be expected to replace responsible actors')) badges.push('CSO role checked');
  if (categories.includes('No-response risk — feedback is collected but not answered')) badges.push('Accountability response checked');
  if (cards.some((card) => card.mitigationAction === 'Limit sensitive data collection to the minimum needed')) badges.push('Minimum data safeguard added');
  if (cards.some((card) => card.responsibleActor.includes('Awra as facilitator') || card.responsibleActor.includes('Awra facilitates'))) badges.push('CSO role bounded');
  if (categories.length === 3 && categories.every((category) => category === categories[0])) badges.push('Consider checking another risk type');
  return badges;
}

function getScreen13Feedback(cards: Screen13RiskCard[]) {
  const messages: string[] = [];
  const categories = cards.map((card) => card.riskCategory);
  if (cards.some((card) => card.impactLevel === 'high')) {
    messages.push('At least one risk needs design repair before implementation. A rights-based project should not move forward with a known high risk unless the mitigation is realistic, assigned, and monitored.');
  } else if (cards.some((card) => card.impactLevel === 'medium')) {
    messages.push('Your risk board shows risks that can be managed if mitigation actions are built into the design before launch. Do not leave these safeguards as informal intentions.');
  } else {
    messages.push('You selected lower risks. That may be reasonable, but check whether any exclusion, safety, data, power, or accountability risk is hidden. Low risk does not mean no monitoring.');
  }
  if (categories.length === 3 && categories.every((category) => category === categories[0])) {
    messages.push('You focused on one risk type. That can be useful, but a stronger HRBA design usually checks more than one risk pattern: exclusion, safety, data, power, responsibility, and response.');
  }
  if (categories.includes('Data or visibility risk — information may expose people')) {
    messages.push('Handle this carefully. Do not collect names, sensitive stories, disability details, complaints, or photos unless they are necessary, safe, consented, and protected. Use the minimum information needed.');
  }
  if (categories.includes('CSO overload risk — Awra may be expected to replace responsible actors')) {
    messages.push('This is an important design warning. Awra can facilitate, document, connect, and follow up, but it should not replace public or service actors that hold responsibility.');
  }
  if (categories.includes('No-response risk — feedback is collected but not answered')) {
    messages.push('Feedback without response weakens trust. The design should name who reviews feedback, who responds, what can change, and how people will know the result.');
  }
  return messages;
}

function buildScreen13Submission(cards: Screen13RiskCard[], optionalReflection: string): Screen13Submission {
  const outputCards = cards.map((card) => ({ ...card, statusLabel: getRiskStatusLabel(card.impactLevel) }));
  return {
    screenId: 'M3-R13',
    route: '/module-3/screen-3-13',
    title: 'Risk and Do-No-Harm in Project Design',
    riskDoNoHarmBoard: {
      cards: outputCards,
      overallSummary: getScreen13OverallSummary(cards),
      badges: getScreen13Badges(cards),
    },
    feedbackMessages: getScreen13Feedback(cards),
    optionalReflection: optionalReflection.trim() ? optionalReflection.trim().slice(0, 350) : undefined,
    savedAt: new Date().toISOString(),
  };
}

type Screen14RowId = 'rightsHolder' | 'barrier' | 'responsibility' | 'inclusionCondition' | 'participationInfluence' | 'intendedChange';
type Screen14Selections = Record<Screen14RowId, string>;
type Screen14Option = { id: string; label: string; support: string; phrase?: string };
type Screen14Row = { id: Screen14RowId; prompt: string; missing: string; options: Screen14Option[] };
type Screen14Submission = {
  screenId: 'M3-R14';
  route: '/module-3/screen-3-14';
  title: 'Repair the Objective';
  repairedObjective: {
    weakObjective: string;
    objective: string;
    selections: Record<Screen14RowId, Screen14Option>;
    improvements: string[];
    warnings: string[];
  };
  screen14OptionalObjectiveReflection?: string;
  savedAt: string;
};

type ActivityRepairTag = 'rightsHolderParticipation' | 'responsibleActor' | 'inclusionAccess' | 'accountabilityFeedback' | 'riskFollowUp';
type ActivityRepairLane = 'Add before implementation' | 'Add during implementation' | 'Monitor and follow up';
type ActivityRepairAction = {
  id: string;
  label: string;
  description: string;
  lane: ActivityRepairLane;
  tags: ActivityRepairTag[];
  barrier: string;
  actor: string;
  role: string;
  note: string;
};
type Screen15Submission = {
  screenId: 'M3-R15';
  route: '/module-3/screen-3-15';
  title: 'Repair the Activity Package';
  repairedActivityPackage: {
    selectedActionIds: string[];
    selectedActions: ActivityRepairAction[];
    categoryCoverage: Record<ActivityRepairTag, boolean>;
    warnings: string[];
    summary: string;
  };
  screen15OptionalActivityReflection?: string;
  savedAt: string;
};

type LogicIndicatorStrength = 'weak' | 'strong';
type Screen16IndicatorType =
  | 'Activity count'
  | 'Output count'
  | 'Information access'
  | 'Influence and decision-making'
  | 'Accountability and response'
  | 'Inclusion and access'
  | 'Duty-bearer or responsible actor response'
  | 'Barrier change'
  | 'Safe and meaningful participation';
type Screen16Indicator = {
  id: string;
  label: string;
  type: Screen16IndicatorType;
  strength: LogicIndicatorStrength;
  reason?: string;
  evidence?: string;
  safety?: string;
};
type Screen16Selections = {
  outcome: string;
  outputs: string[];
  indicators: string[];
  watchPoint: string;
};
type Screen16Submission = {
  screenId: 'M3-R16';
  route: '/module-3/screen-3-16';
  title: 'Intervention Logic and Indicators';
  interventionLogicIndicators: {
    repairedObjective: string;
    repairedActivities: string[];
    outcome: string;
    outputs: string[];
    strongIndicators: Screen16Indicator[];
    weakIndicators: Screen16Indicator[];
    watchPoint: string;
    messages: string[];
  };
  screen16OptionalIndicatorReflection?: string;
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

const screen14WeakObjective = 'To improve participation and livelihood opportunities for women, youth, and persons with disabilities in Jiru Amba through trainings, awareness sessions, and community meetings.';

const screen14Rows: Screen14Row[] = [
  {
    id: 'rightsHolder',
    prompt: 'Who should the objective make more visible?',
    missing: 'Select a rights-holder focus.',
    options: [
      { id: 'womenVendors', label: 'Women vendors', support: 'Market access, fee transparency, timing, and decision influence matter.', phrase: 'women vendors' },
      { id: 'youthLivelihood', label: 'Youth seeking livelihood opportunities', support: 'Training must connect to realistic opportunity and follow-up.', phrase: 'youth seeking livelihood opportunities' },
      { id: 'personsWithDisabilities', label: 'Persons with disabilities', support: 'Accessibility, accommodation, and representation must be designed in.', phrase: 'persons with disabilities' },
      { id: 'remoteKebeles', label: 'Residents from remote kebeles', support: 'Distance, information access, and meeting location affect participation.', phrase: 'residents from remote kebeles' },
      { id: 'womenWaterUsers', label: 'Women who rely on water services', support: 'Water access, fee transparency, care work, and complaint safety matter.', phrase: 'women who rely on water services' },
    ],
  },
  {
    id: 'barrier',
    prompt: 'Which barrier should the objective address?',
    missing: 'Select the main barrier the objective should address.',
    options: [
      { id: 'informationBarrier', label: 'Information reaches people late or unevenly.', support: 'Information gaps can shape who arrives prepared.', phrase: 'information that reaches people late or unevenly' },
      { id: 'accessBarrier', label: 'Venue, timing, transport, or materials exclude some groups.', support: 'Access barriers can make participation unequal.', phrase: 'venue, timing, transport, or materials that exclude some groups' },
      { id: 'decisionBarrier', label: 'Some people attend but do not influence decisions.', support: 'Attendance is not the same as influence.', phrase: 'attendance that does not lead to influence over decisions' },
      { id: 'accountabilityBarrier', label: 'Feedback is collected but response is unclear.', support: 'Feedback needs a response loop.', phrase: 'feedback that is collected without a clear response' },
      { id: 'serviceBarrier', label: 'Service or livelihood priorities do not reflect lived barriers.', support: 'Priorities should reflect lived realities.', phrase: 'service or livelihood priorities that do not reflect lived barriers' },
      { id: 'powerBarrier', label: 'Gatekeepers or dominant actors shape priorities before others can influence them.', support: 'Power patterns can pre-shape decisions.', phrase: 'gatekeeping or dominant influence before others can shape priorities' },
    ],
  },
  {
    id: 'responsibility',
    prompt: 'Which responsibility issue should remain visible?',
    missing: 'Select a responsibility or accountability issue.',
    options: [
      { id: 'woredaPlanning', label: 'Woreda planners should explain how priorities are selected.', support: 'Planning responsibility stays visible.', phrase: 'woreda planners explain how priorities are selected' },
      { id: 'serviceOffices', label: 'Sector or service offices should respond to access and quality barriers.', support: 'Service actors need a response role.', phrase: 'sector or service offices respond to access and quality barriers' },
      { id: 'waterCommittee', label: 'Water committee actors should clarify fees, repair follow-up, and complaint response.', support: 'Water governance needs transparency.', phrase: 'water committee actors clarify fees, repair follow-up, and complaint response' },
      { id: 'marketCommittee', label: 'Market actors should address fair access, information, and exclusion risks.', support: 'Market actors affect access and fairness.', phrase: 'market actors address fair access, information, and exclusion risks' },
      { id: 'kebeleStructures', label: 'Kebele structures should support inclusive information and safe participation.', support: 'Local structures can support reach and safety.', phrase: 'kebele structures support inclusive information and safe participation' },
      { id: 'awraFacilitation', label: 'Awra should facilitate evidence, dialogue, and follow-up without replacing duty-bearers.', support: 'The CSO role should stay bounded.', phrase: 'Awra facilitates evidence, dialogue, and follow-up without replacing duty-bearers' },
    ],
  },
  {
    id: 'inclusionCondition',
    prompt: 'What condition must change for inclusion to be real?',
    missing: 'Select an inclusion or access condition.',
    options: [
      { id: 'accessibleMaterials', label: 'Information is available in accessible and understandable formats.', support: 'Information access makes participation realistic.', phrase: 'information is available in accessible and understandable formats' },
      { id: 'meetingAdjustments', label: 'Meeting time, place, seating, and materials are adjusted for participation.', support: 'The meeting design shapes who can speak.', phrase: 'meeting time, place, seating, and materials are adjusted for participation' },
      { id: 'accommodationBudget', label: 'Accommodation costs are planned, budgeted, and monitored.', support: 'Inclusion needs resources.', phrase: 'accommodation costs are planned, budgeted, and monitored' },
      { id: 'safeParticipation', label: 'People can speak without exposure, pressure, or retaliation.', support: 'Safe participation is part of design quality.', phrase: 'people can speak without exposure, pressure, or retaliation' },
      { id: 'representativePreparation', label: 'Rights-holder groups prepare their priorities before formal meetings.', support: 'Preparation can strengthen influence.', phrase: 'rights-holder groups prepare their priorities before formal meetings' },
      { id: 'disaggregatedFollowUp', label: 'Follow-up checks whether different groups could access and benefit.', support: 'Follow-up should check unequal outcomes.', phrase: 'follow-up checks whether different groups could access and benefit' },
    ],
  },
  {
    id: 'participationInfluence',
    prompt: 'How should participation influence the plan?',
    missing: 'Select how participation should influence the plan.',
    options: [
      { id: 'priorityRevision', label: 'Rights-holder input changes at least one priority.', support: 'Influence means decisions can change.', phrase: 'rights-holder input changes at least one priority' },
      { id: 'budgetDiscussion', label: 'Budget choices are explained and discussed.', support: 'Budget transparency supports accountability.', phrase: 'budget choices are explained and discussed' },
      { id: 'responseLoop', label: 'Feedback receives a visible response.', support: 'Response closes the loop.', phrase: 'feedback receives a visible response' },
      { id: 'jointReview', label: 'Rights-holders and responsible actors review progress together.', support: 'Joint review keeps accountability active.', phrase: 'rights-holders and responsible actors review progress together' },
      { id: 'transparentSelection', label: 'Selection criteria are shared and corrected if exclusion appears.', support: 'Transparent criteria reduce hidden exclusion.', phrase: 'selection criteria are shared and corrected if exclusion appears' },
      { id: 'implementationWatch', label: 'The design includes watch-points for implementation.', support: 'Watch-points help the plan adapt.', phrase: 'the design includes watch-points for implementation' },
    ],
  },
  {
    id: 'intendedChange',
    prompt: 'What change should the objective point toward?',
    missing: 'Select the intended change.',
    options: [
      { id: 'influenceChange', label: 'People facing barriers influence decisions that affect them.', support: 'Influence is a rights-based change.', phrase: 'influence decisions that affect them' },
      { id: 'accessChange', label: 'People facing barriers can access project opportunities more fairly.', support: 'Access must be practical, not only promised.', phrase: 'access project opportunities more fairly' },
      { id: 'responseChange', label: 'Responsible actors respond to barriers and feedback.', support: 'Response keeps duty visible.', phrase: 'receive responses from responsible actors on barriers and feedback' },
      { id: 'accountabilityChange', label: 'The plan becomes more transparent and accountable.', support: 'Accountability should be visible in design.', phrase: 'make the plan more transparent and accountable' },
      { id: 'inclusionChange', label: 'Gender and disability barriers are addressed in the design.', support: 'Inclusion must be built into the design.', phrase: 'address gender and disability barriers in the design' },
      { id: 'serviceChange', label: 'Service or livelihood priorities better reflect lived realities.', support: 'Priorities should be shaped by lived barriers.', phrase: 'shape service or livelihood priorities so they better reflect lived realities' },
    ],
  },
];

const screen14Improvements = [
  'Rights-holder focus: Your objective names a specific group instead of only saying “the community.”',
  'Barrier: Your objective makes the barrier visible.',
  'Responsibility: Your objective keeps responsible actors in the design.',
  'Inclusion: Your objective includes a condition that makes participation more realistic.',
  'Follow-up: Your objective links participation to influence or response.',
  'Change: Your objective points to a rights-based change, not only an activity.',
];

const activityRepairActions: ActivityRepairAction[] = [
  { id: 'preConsultationPrep', label: 'Prepare rights-holder groups before formal meetings', description: 'Hold small preparation sessions so women vendors, youth, persons with disabilities, women who rely on water services, and remote-kebele residents can identify priorities before the formal planning space.', lane: 'Add before implementation', tags: ['rightsHolderParticipation', 'inclusionAccess'], barrier: 'People attend but do not influence decisions.', actor: 'Awra facilitates; group representatives validate priorities.', role: 'Rights-holders define priorities before the formal meeting.', note: 'Use general group priorities only; do not document personal complaints.' },
  { id: 'accessibleInfoPack', label: 'Share accessible information before decisions', description: 'Provide short, understandable information about the plan, selection criteria, budget choices, and meeting purpose before consultation.', lane: 'Add before implementation', tags: ['inclusionAccess', 'accountabilityFeedback'], barrier: 'Information reaches people late or unevenly.', actor: 'Awra and kebele structures support accessible communication.', role: 'Rights-holders arrive informed.', note: 'Keep materials general and non-identifying.' },
  { id: 'meetingAccessAdjustments', label: 'Adjust meeting time, venue, seating, and materials', description: 'Plan meeting conditions that support women with care responsibilities, persons with disabilities, remote residents, and quieter participants.', lane: 'Add before implementation', tags: ['inclusionAccess'], barrier: 'Venue, timing, transport, or materials exclude some groups.', actor: 'Awra coordinates; venue hosts and local structures support access.', role: 'People can participate more fairly.', note: 'Do not single out individuals publicly for accommodation needs.' },
  { id: 'dutyBearerBarrierReview', label: 'Hold a barrier review with responsible actors', description: 'Bring woreda planners, service offices, water or market committee actors, and Awra together to review the barriers identified by rights-holder groups.', lane: 'Add during implementation', tags: ['responsibleActor', 'accountabilityFeedback'], barrier: 'Responsible actors are not linked to the barriers.', actor: 'Woreda planners and relevant service or committee actors.', role: 'Rights-holder priorities are presented as design evidence.', note: 'Present themes, not personal stories or identifiable complaints.' },
  { id: 'transparentSelectionBudget', label: 'Explain selection and budget choices', description: 'Share simple selection criteria and explain which priorities can be funded, delayed, or referred to another responsible actor.', lane: 'Add during implementation', tags: ['accountabilityFeedback', 'responsibleActor'], barrier: 'Budget and selection decisions are unclear.', actor: 'Woreda planners and Awra.', role: 'Rights-holders can question and understand choices.', note: 'Do not publish personal eligibility details.' },
  { id: 'safeFeedbackResponseLog', label: 'Create a safe feedback and response log', description: 'Track feedback themes, responsible actor responses, and follow-up actions without names, exact locations, or sensitive details.', lane: 'Monitor and follow up', tags: ['accountabilityFeedback', 'riskFollowUp'], barrier: 'Feedback is collected but response is unclear.', actor: 'Awra maintains the log; responsible actors respond.', role: 'Rights-holders see what changed or why it did not change.', note: 'Use aggregated, non-identifying themes only.' },
  { id: 'accommodationBudgetLine', label: 'Add an accommodation and access budget line', description: 'Budget for accessibility, transport support where appropriate, communication formats, meeting adjustments, and reasonable accommodation.', lane: 'Add before implementation', tags: ['inclusionAccess', 'riskFollowUp'], barrier: 'Inclusion is promised but not resourced.', actor: 'Awra and project budget holder.', role: 'Rights-holders facing access barriers can participate.', note: 'Keep accommodation requests private.' },
  { id: 'powerCaptureMitigation', label: 'Reduce power capture in selection and meetings', description: 'Use transparent criteria, mixed participation channels, separate preparation spaces, and facilitator checks so dominant actors do not pre-shape all priorities.', lane: 'Monitor and follow up', tags: ['riskFollowUp', 'rightsHolderParticipation'], barrier: 'Gatekeepers or dominant actors shape priorities.', actor: 'Awra facilitator with local accountability actors.', role: 'Less-heard groups have safer channels to contribute.', note: 'Avoid public blame; focus on process safeguards.' },
  { id: 'serviceActionTracker', label: 'Track responsible actor action points', description: 'Record agreed actions by woreda planners, water committee, market actors, or service offices and review progress with rights-holder representatives.', lane: 'Monitor and follow up', tags: ['responsibleActor', 'accountabilityFeedback', 'riskFollowUp'], barrier: 'Responsible actors agree verbally but follow-up is weak.', actor: 'Responsible actor named per action point.', role: 'Rights-holders can see whether commitments move.', note: 'Track actions and roles, not personal complaints.' },
  { id: 'learningReviewCycle', label: 'Review and adjust after the first implementation cycle', description: 'After the first activity cycle, check who participated, who did not, what barriers remained, and what must change before scaling.', lane: 'Monitor and follow up', tags: ['riskFollowUp', 'accountabilityFeedback', 'inclusionAccess'], barrier: 'The design does not adapt when exclusion appears.', actor: 'Awra, rights-holder representatives, and relevant responsible actors.', role: 'Rights-holders help interpret what needs to change.', note: 'Use non-identifying feedback summaries.' },
];

const activityRepairTagLabels: Record<ActivityRepairTag, string> = {
  rightsHolderParticipation: 'Rights-holder participation',
  responsibleActor: 'Responsible actor',
  inclusionAccess: 'Inclusion and access',
  accountabilityFeedback: 'Feedback and response',
  riskFollowUp: 'Risk and follow-up',
};

const screen16FallbackObjective = 'To strengthen the ability of rights-holder groups facing barriers in Jiru Amba to influence selected service and livelihood priorities, while responsible local actors use accessible information, safe participation, and transparent follow-up to address barriers identified in the planning process.';
const screen16FallbackActivities = [
  'Prepare rights-holder groups before formal meetings.',
  'Share accessible information before decisions.',
  'Hold a barrier review with responsible actors.',
  'Create a safe feedback and response log.',
  'Review and adjust after the first implementation cycle.',
];

const screen16Outcomes = [
  { id: 'influenceOutcome', label: 'Rights-holder input influences at least one planning or implementation decision.', type: 'Participation and influence' },
  { id: 'accessOutcome', label: 'People facing access barriers can participate in and benefit from selected project opportunities more fairly.', type: 'Inclusion and access' },
  { id: 'responseOutcome', label: 'Responsible actors respond to barriers, feedback, and agreed action points.', type: 'Accountability and response' },
  { id: 'inclusionOutcome', label: 'Gender and disability-related barriers are addressed through practical design adjustments.', type: 'Non-discrimination and inclusion' },
  { id: 'serviceOutcome', label: 'Selected service or livelihood priorities better reflect lived barriers and safe evidence.', type: 'Service or livelihood relevance' },
];

const screen16Outputs = [
  'Non-identifying rights-holder priority themes are documented and reviewed.',
  'Access and accommodation measures are planned, budgeted, and used.',
  'Responsible actor action points are agreed and tracked.',
  'Feedback themes receive visible responses.',
  'Participation arrangements are adjusted after early learning.',
  'Selection, budget, and priority criteria are shared in understandable formats.',
];

const screen16Indicators: Screen16Indicator[] = [
  { id: 'trainingCountWeak', label: 'Number of trainings held', type: 'Activity count', strength: 'weak', reason: 'Counts delivery but not rights-based change.' },
  { id: 'meetingCountWeak', label: 'Number of meetings conducted', type: 'Activity count', strength: 'weak', reason: 'Counts events but not influence or response.' },
  { id: 'participantCountWeak', label: 'Number of people attending activities', type: 'Output count', strength: 'weak', reason: 'Counts attendance but not whether participation was meaningful or inclusive.' },
  { id: 'accessibleInfoIndicator', label: 'Evidence that selected rights-holder groups received understandable information before decisions.', type: 'Information access', strength: 'strong', evidence: 'Distribution checklist and non-identifying group confirmation.', safety: 'Check whether different groups received information in ways they could understand.' },
  { id: 'influenceIndicator', label: 'Evidence that rights-holder input changed at least one priority, activity, criterion, or follow-up action.', type: 'Influence and decision-making', strength: 'strong', evidence: 'Before/after decision note and action tracker.', safety: 'Use non-identifying before/after notes. Do not attribute sensitive comments to individuals.' },
  { id: 'responseIndicator', label: 'Percentage of feedback themes acknowledged and responded to within an agreed timeframe.', type: 'Accountability and response', strength: 'strong', evidence: 'Non-identifying feedback and response log.', safety: 'Track themes and responses without names, exact locations, or complaint details.' },
  { id: 'accommodationIndicator', label: 'Number and type of accessibility or accommodation measures budgeted and used.', type: 'Inclusion and access', strength: 'strong', evidence: 'Budget line, activity checklist, and non-identifying accessibility review.', safety: 'Track accommodation measures without exposing personal disability information.' },
  { id: 'dutyBearerActionIndicator', label: 'Number of agreed action points completed by responsible actors.', type: 'Duty-bearer or responsible actor response', strength: 'strong', evidence: 'Responsible actor action tracker.', safety: 'Track responsible actor actions, not personal blame.' },
  { id: 'barrierChangeIndicator', label: 'Summary of whether selected barriers reduced after the first implementation cycle.', type: 'Barrier change', strength: 'strong', evidence: 'Non-identifying follow-up summary with broad group patterns.', safety: 'Use broad group patterns and non-identifying summaries.' },
  { id: 'safeParticipationIndicator', label: 'Evidence that participation channels were adjusted when exclusion or power capture appeared.', type: 'Safe and meaningful participation', strength: 'strong', evidence: 'Facilitator learning note and adjustment log.', safety: 'Record process adjustments without naming people who felt unsafe or excluded.' },
];

const screen16WatchPoints = [
  'The same representatives may dominate every meeting.',
  'Accessibility measures may be promised but not budgeted or used.',
  'Feedback may be collected without a visible response.',
  'Responsible actors may agree verbally but not act.',
  'Feedback or evidence may expose personal or sensitive details.',
  'The project may drift back to trainings and meetings without design change.',
];

function emptyScreen14Selections(): Screen14Selections {
  return {
    rightsHolder: '',
    barrier: '',
    responsibility: '',
    inclusionCondition: '',
    participationInfluence: '',
    intendedChange: '',
  };
}

function isScreen14Valid(selections: Screen14Selections) {
  return screen14Rows.every((row) => Boolean(selections[row.id]));
}

function getScreen14Helper(selections: Screen14Selections, submitted: boolean, stale: boolean) {
  if (submitted && stale) return designRepairStaleMessage;
  const missing = screen14Rows.find((row) => !selections[row.id]);
  return missing ? missing.missing : 'Ready to generate your repaired objective.';
}

function getScreen14Option(rowId: Screen14RowId, optionId: string) {
  return screen14Rows.find((row) => row.id === rowId)?.options.find((option) => option.id === optionId);
}

function buildScreen14Objective(selections: Screen14Selections) {
  const picked = Object.fromEntries(screen14Rows.map((row) => [row.id, getScreen14Option(row.id, selections[row.id]) || row.options[0]])) as Record<Screen14RowId, Screen14Option>;
  return `To strengthen the ability of ${picked.rightsHolder.phrase} in Jiru Amba to ${picked.intendedChange.phrase}, by addressing ${picked.barrier.phrase}, while ${picked.responsibility.phrase} and the project design ensures ${picked.inclusionCondition.phrase} and ${picked.participationInfluence.phrase}.`;
}

function getScreen14Warnings(selections: Screen14Selections) {
  const warnings: string[] = [];
  if (selections.responsibility === 'awraFacilitation') warnings.push('Watch point: Awra’s role is important, but the objective should not make the CSO responsible for everything. In the next screen, add activities that bring responsible public, service, or committee actors into the design.');
  if (selections.intendedChange === 'accessChange' && !['accessibleMaterials', 'meetingAdjustments', 'accommodationBudget'].includes(selections.inclusionCondition)) warnings.push('Watch point: You selected fair access as the intended change. Check whether the inclusion condition is practical enough to support access.');
  if (selections.barrier === 'accountabilityBarrier' && !['responseLoop', 'jointReview', 'implementationWatch'].includes(selections.participationInfluence)) warnings.push('Watch point: You selected an accountability barrier. Add response or follow-up in the activity package.');
  return warnings;
}

function buildScreen14Submission(selections: Screen14Selections, optionalReflection = ''): Screen14Submission {
  const selectedOptions = Object.fromEntries(screen14Rows.map((row) => [row.id, getScreen14Option(row.id, selections[row.id]) || row.options[0]])) as Record<Screen14RowId, Screen14Option>;
  return {
    screenId: 'M3-R14',
    route: '/module-3/screen-3-14',
    title: 'Repair the Objective',
    repairedObjective: {
      weakObjective: screen14WeakObjective,
      objective: buildScreen14Objective(selections),
      selections: selectedOptions,
      improvements: screen14Improvements,
      warnings: getScreen14Warnings(selections),
    },
    screen14OptionalObjectiveReflection: optionalReflection.trim() || undefined,
    savedAt: new Date().toISOString(),
  };
}

function getActivityRepairCoverage(actionIds: string[]) {
  const selected = activityRepairActions.filter((action) => actionIds.includes(action.id));
  return (Object.keys(activityRepairTagLabels) as ActivityRepairTag[]).reduce((coverage, tag) => {
    coverage[tag] = selected.some((action) => action.tags.includes(tag));
    return coverage;
  }, {} as Record<ActivityRepairTag, boolean>);
}

function isScreen15Valid(actionIds: string[]) {
  if (actionIds.length !== 5) return false;
  return Object.values(getActivityRepairCoverage(actionIds)).every(Boolean);
}

function getScreen15Helper(actionIds: string[], submitted: boolean, stale: boolean, limitMessage: string) {
  if (limitMessage) return limitMessage;
  if (submitted && stale) return designRepairStaleMessage;
  if (actionIds.length !== 5) return 'Select five repair actions to complete the package.';
  const coverage = getActivityRepairCoverage(actionIds);
  if (!coverage.rightsHolderParticipation) return 'Add one action that prepares or strengthens rights-holder participation.';
  if (!coverage.responsibleActor) return 'Add one action that brings a duty-bearer or responsible actor into the design.';
  if (!coverage.inclusionAccess) return 'Add one action that addresses accessibility, accommodation, information, timing, or other access barriers.';
  if (!coverage.accountabilityFeedback) return 'Add one action that creates feedback, response, transparency, or follow-up.';
  if (!coverage.riskFollowUp) return 'Add one action that checks risk, power capture, exclusion, privacy, or adaptation.';
  return 'Ready to generate your activity repair board.';
}

function getScreen15Warnings(actions: ActivityRepairAction[]) {
  const warnings: string[] = [];
  if (actions.filter((action) => action.lane !== 'Add before implementation').length < 2) warnings.push('Watch point: Your package may still be front-loaded. Make sure activities also include response, follow-up, and adaptation during implementation.');
  if (actions.filter((action) => action.tags.includes('responsibleActor')).length <= 1) warnings.push('Watch point: The CSO role may still be too heavy. In the intervention logic, check whether responsible actors have clear action points.');
  if (!actions.some((action) => action.id === 'accommodationBudgetLine')) warnings.push('Watch point: Inclusion often fails when it is not resourced. Check whether your budget and implementation plan include access and accommodation measures.');
  if (!actions.some((action) => ['safeFeedbackResponseLog', 'serviceActionTracker'].includes(action.id))) warnings.push('Watch point: Feedback is stronger when response is tracked. Consider how the project will show what changed after people participate.');
  return warnings;
}

function buildScreen15Submission(actionIds: string[], optionalReflection = ''): Screen15Submission {
  const selectedActions = activityRepairActions.filter((action) => actionIds.includes(action.id));
  return {
    screenId: 'M3-R15',
    route: '/module-3/screen-3-15',
    title: 'Repair the Activity Package',
    repairedActivityPackage: {
      selectedActionIds: actionIds,
      selectedActions,
      categoryCoverage: getActivityRepairCoverage(actionIds),
      warnings: getScreen15Warnings(selectedActions),
      summary: 'This activity package is stronger because it does more than deliver trainings or meetings. It prepares rights-holders, keeps responsible actors visible, addresses access barriers, creates feedback and response, and checks risks during implementation.',
    },
    screen15OptionalActivityReflection: optionalReflection.trim() || undefined,
    savedAt: new Date().toISOString(),
  };
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
  return { outcome: '', outputs: [], indicators: [], watchPoint: '' };
}

function getIndicator(id: string) {
  return screen16Indicators.find((indicator) => indicator.id === id);
}

function getScreen16StrongIndicators(selection: Screen16Selections) {
  return selection.indicators.map(getIndicator).filter((indicator): indicator is Screen16Indicator => Boolean(indicator && indicator.strength === 'strong'));
}

function getScreen16WeakIndicators(selection: Screen16Selections) {
  return selection.indicators.map(getIndicator).filter((indicator): indicator is Screen16Indicator => Boolean(indicator && indicator.strength === 'weak'));
}

function hasScreen16AccountabilityCoverage(indicators: Screen16Indicator[]) {
  return indicators.some((indicator) => ['Accountability and response', 'Duty-bearer or responsible actor response', 'Influence and decision-making'].includes(indicator.type));
}

function hasScreen16InclusionCoverage(indicators: Screen16Indicator[]) {
  return indicators.some((indicator) => ['Inclusion and access', 'Information access', 'Safe and meaningful participation', 'Barrier change'].includes(indicator.type));
}

function isScreen16Valid(selection: Screen16Selections) {
  const strong = getScreen16StrongIndicators(selection);
  return Boolean(selection.outcome)
    && selection.outputs.length === 2
    && strong.length >= 3
    && hasScreen16AccountabilityCoverage(strong)
    && hasScreen16InclusionCoverage(strong)
    && Boolean(selection.watchPoint);
}

function getScreen16Helper(selection: Screen16Selections, submitted: boolean, stale: boolean, limitMessage: string) {
  if (limitMessage) return limitMessage;
  if (submitted && stale) return designRepairStaleMessage;
  if (!selection.outcome) return 'Select one outcome/change.';
  if (selection.outputs.length !== 2) return 'Select exactly two outputs.';
  const strong = getScreen16StrongIndicators(selection);
  if (strong.length < 3) {
    return getScreen16WeakIndicators(selection).length > 0
      ? 'Activity counts can support monitoring, but they do not show HRBA change. Select at least three indicators that check access, influence, response, inclusion, barrier change, or responsible action.'
      : 'Select at least three strong indicators. Activity counts alone are not enough.';
  }
  if (!hasScreen16AccountabilityCoverage(strong)) return 'Add at least one indicator that checks influence, response, accountability, or responsible actor action.';
  if (!hasScreen16InclusionCoverage(strong)) return 'Add at least one indicator that checks access, inclusion, safe participation, or barrier change.';
  if (!selection.watchPoint) return 'Select one implementation watch-point.';
  return 'Ready to generate your logic pathway and indicators.';
}

function buildScreen16Submission(selection: Screen16Selections, objective: string, activities: string[], optionalReflection = ''): Screen16Submission {
  const outcome = screen16Outcomes.find((item) => item.id === selection.outcome)?.label || selection.outcome;
  const strongIndicators = getScreen16StrongIndicators(selection);
  const weakIndicators = getScreen16WeakIndicators(selection);
  const messages = [
    'Analysis-to-design connection: Your pathway links barriers to activities and outcome.',
    'Output-to-outcome logic: Your selected outputs show what must be produced before change can be expected.',
    'HRBA indicator quality: Your strong indicators check more than activity delivery.',
    'Safe evidence: Your evidence sources avoid names, sensitive complaints, and exact locations.',
    'Implementation readiness: Your watch-point identifies what could weaken the design during implementation.',
  ];
  if (weakIndicators.length > 0) messages.push('You selected one or more useful activity counts. Keep them as supporting counts, but do not rely on them alone. The stronger indicators check whether access, influence, response, inclusion, responsible action, or barrier change is happening.');
  if (selection.watchPoint === 'The project may drift back to trainings and meetings without design change.') messages.push('Good watch-point. This is the main risk in many project designs: the plan may return to trainings and meetings without checking whether the design logic changed.');
  if (selection.watchPoint === 'Feedback or evidence may expose personal or sensitive details.') messages.push('Good watch-point. Safe evidence is part of HRBA practice. Useful evidence should not expose people who gave feedback or faced barriers.');
  if (selection.watchPoint === 'Responsible actors may agree verbally but not act.') messages.push('Good watch-point. HRBA design keeps responsible actors visible and checks whether commitments become action.');
  return {
    screenId: 'M3-R16',
    route: '/module-3/screen-3-16',
    title: 'Intervention Logic and Indicators',
    interventionLogicIndicators: {
      repairedObjective: objective,
      repairedActivities: activities,
      outcome,
      outputs: selection.outputs,
      strongIndicators,
      weakIndicators,
      watchPoint: selection.watchPoint,
      messages,
    },
    screen16OptionalIndicatorReflection: optionalReflection.trim() || undefined,
    savedAt: new Date().toISOString(),
  };
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
  | 'genderDisabilityBuiltIn'
  | 'riskDoNoHarm'
  | 'accountabilityFeedback'
  | 'indicatorsShowChange'
  | 'localOwnershipCsoRole';
type RepairMoveId =
  | 'nameRightsHolders'
  | 'addBarriers'
  | 'clarifyDutyBearers'
  | 'createInfluenceRoute'
  | 'buildInInclusion'
  | 'addSafeFeedback'
  | 'addRiskMitigation'
  | 'strengthenIndicators'
  | 'protectCsoRole';
type ProposalReviewStatus = 'looksComplete' | 'needsHrbaCheck';
type ProposalSection = {
  id: ProposalSectionId;
  number: number;
  title: string;
  excerpt: string;
  notice: string;
};
type ProposalGap = { id: ProposalGapId; label: string; explanation: string };
type RepairMove = { id: RepairMoveId; label: string; explanation: string };
type Screen17Submission = {
  screenId: 'M3-R17';
  route: '/module-3/screen-3-17';
  title: 'Open the Draft Plan';
  proposalReviewSections: {
    checkedSections: Record<ProposalSectionId, ProposalReviewStatus>;
    needsHrbaCheck: ProposalSectionId[];
    generatedAt: string;
  };
  reviewSuggestion: string;
  carryForward: string;
};
type Screen18Submission = {
  screenId: 'M3-R18';
  route: '/module-3/screen-3-18';
  title: 'Find the HRBA Gaps Across the Plan';
  proposalGapMap: {
    gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>;
    overallPattern: string;
    repairPriority: ProposalSectionId;
    generatedAt: string;
  };
  patternFeedback: string[];
  carryForward: string;
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
    implementationWatchPoint: string;
    generatedAt: string;
  };
  feedbackMessages: string[];
  optionalReflection?: string;
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
      'Jiru Amba district faces service delivery and livelihood challenges affecting community development. Women, youth, persons with disabilities, and low-income residents have limited opportunities to participate in local planning and benefit from development activities. The project will improve awareness, strengthen local CSO capacity, and support constructive dialogue with local authorities.',
    notice: 'Does the section name the rights issue clearly, or does it stay at broad development language?',
  },
  {
    id: 'rightsHolders',
    number: 2,
    title: 'Target groups and rights-holders',
    excerpt:
      'The project will target 1,200 community members, including women, youth, persons with disabilities, and grassroots CSO representatives. At least 50% of participants will be women and 10% will be persons with disabilities. Selection will be coordinated through local committees and community representatives.',
    notice: 'Does the section analyze different barriers, or only count participant categories?',
  },
  {
    id: 'actors',
    number: 3,
    title: 'Actors and partnerships',
    excerpt:
      'Awra will coordinate with local administration, sector offices, kebele representatives, community leaders, women and youth associations, and grassroots CSOs. A steering committee will guide the project and review progress every quarter. Local authorities will be invited to validation workshops and public dialogue events.',
    notice: 'Does the section distinguish duty-bearers, supporting actors, community actors, and CSO roles?',
  },
  {
    id: 'objectiveLogic',
    number: 4,
    title: 'Objective and intervention logic',
    excerpt:
      'The project objective is to strengthen inclusive local development by building community awareness, supporting CSO engagement, and improving dialogue between citizens and local authorities. The project will deliver trainings, community meetings, policy-dialogue sessions, and awareness activities to improve participation and accountability.',
    notice: 'Does the objective describe changed rights-based conditions, or mainly list activities?',
  },
  {
    id: 'activities',
    number: 5,
    title: 'Activity package',
    excerpt:
      'Main activities include awareness sessions on participation, training for grassroots CSOs, community consultations, policy dialogue meetings, visibility materials, small grants for selected CSO initiatives, and quarterly learning events. The project will also organize inclusive forums for women, youth, and persons with disabilities.',
    notice: 'Do the activities respond to barriers and responsibilities, or are they standard project activities?',
  },
  {
    id: 'inclusion',
    number: 6,
    title: 'Gender and disability inclusion',
    excerpt:
      'The project will promote gender equality and disability inclusion by ensuring representation of women and persons with disabilities in trainings, consultations, and dialogue events. Venues will be selected with attention to accessibility where possible. The project team will encourage women and persons with disabilities to speak during meetings.',
    notice: 'Is gender and disability inclusion built into design choices, or mostly mentioned through representation?',
  },
  {
    id: 'participationAccountabilityRisk',
    number: 7,
    title: 'Participation, accountability, risk, and sustainability',
    excerpt:
      'Community members will participate through consultations, meetings, and feedback forms. Awra will collect feedback after activities and share summary findings with the project steering committee. Main project risks include delays, staff turnover, and limited availability of local officials. Sustainability will be supported by training local CSOs and maintaining dialogue platforms.',
    notice: 'Can rights-holders influence decisions and receive responses, or only provide feedback?',
  },
  {
    id: 'monitoringEvidence',
    number: 8,
    title: 'Monitoring, evidence, and indicators',
    excerpt:
      'The project will monitor the number of trainings delivered, participants reached, dialogue meetings conducted, CSOs supported, small grants awarded, and reports submitted. Data will be disaggregated by sex, age, and disability where possible. Success stories will be collected to show project impact.',
    notice: 'Do indicators show change in access, voice, barriers, accountability, and safety, or mainly count activities?',
  },
];

const proposalGaps: ProposalGap[] = [
  { id: 'specificRightsHolders', label: 'Rights-holders are too broad', explanation: 'The proposal counts people but does not show which groups face which barriers.' },
  { id: 'barriersVisible', label: 'Barriers are not visible', explanation: 'The proposal does not explain what blocks access, voice, benefit, safety, or accountability.' },
  { id: 'dutyBearersClear', label: 'Duty-bearers are unclear', explanation: 'The proposal lists actors but does not show who has public responsibility or what they should do.' },
  { id: 'participationInfluence', label: 'Participation may not influence decisions', explanation: 'People may attend or be consulted, but the proposal does not show how they shape priorities, budgets, activities, or follow-up.' },
  { id: 'genderDisabilityBuiltIn', label: 'Gender/disability is only mentioned', explanation: 'The proposal uses representation language but does not build in accessibility, accommodation, safety, care-burden, or influence.' },
  { id: 'riskDoNoHarm', label: 'Risk to rights-holders is missing', explanation: 'The proposal names project risks but not exclusion, backlash, privacy, capture, retaliation, or no-response risks.' },
  { id: 'accountabilityFeedback', label: 'Feedback does not lead to response', explanation: 'The proposal collects feedback but does not show response, explanation, referral, correction, or follow-up.' },
  { id: 'indicatorsShowChange', label: 'Indicators count activities only', explanation: 'The proposal counts trainings, meetings, reports, or participants but does not measure change in barriers, access, voice, or accountability.' },
  { id: 'localOwnershipCsoRole', label: 'Local ownership and CSO role need clarity', explanation: 'The proposal may make the CSO implement everything without clarifying rights-holder influence, local CSO leadership, and duty-bearer responsibilities.' },
];

const repairMoves: RepairMove[] = [
  { id: 'nameRightsHolders', label: 'Name specific rights-holders', explanation: 'Show which groups face which barriers, not only broad categories.' },
  { id: 'addBarriers', label: 'Add barriers', explanation: 'Make access, information, mobility, care-work, safety, voice, or accountability barriers visible.' },
  { id: 'clarifyDutyBearers', label: 'Clarify duty-bearers', explanation: 'Show who has responsibility and what role they should play.' },
  { id: 'createInfluenceRoute', label: 'Create a route for influence', explanation: 'Show how people can shape priorities, budgets, activities, monitoring, or follow-up.' },
  { id: 'buildInInclusion', label: 'Build in gender and disability inclusion', explanation: 'Add accessibility, accommodation, communication, timing, safety, and decision influence.' },
  { id: 'addSafeFeedback', label: 'Add feedback and response', explanation: 'Show how feedback is received, reviewed, answered, and used.' },
  { id: 'addRiskMitigation', label: 'Add do-no-harm mitigation', explanation: 'Reduce exclusion, backlash, privacy, capture, retaliation, and no-response risks.' },
  { id: 'strengthenIndicators', label: 'Strengthen indicators', explanation: 'Measure change in barriers, access, voice, accountability, or response, not only activities.' },
  { id: 'protectCsoRole', label: 'Protect the CSO role', explanation: 'Keep the CSO as facilitator, connector, capacity-strengthener, and evidence user, not substitute duty-bearer.' },
];

const repairedProposalSections: Record<ProposalSectionId, { text: string; watchPoint: string }> = {
  problem: {
    text: 'In Jiru Amba, some rights-holders are not able to influence local service and livelihood decisions on equal terms. Women traders, youth seeking livelihood opportunities, persons with disabilities, women who rely on water services, and people from remote kebeles face different barriers, including inaccessible information, meeting times that conflict with care and work responsibilities, limited influence over priorities, weak feedback response, and unclear duty-bearer follow-up. The project will support Awra and local partners to strengthen safe participation, clarify responsibilities, and improve response to identified barriers before and during implementation.',
    watchPoint: 'During implementation, check whether the project continues to name specific barriers and not only broad community needs.',
  },
  rightsHolders: {
    text: 'The project will work with specific rights-holder groups affected by different barriers: women traders facing market and information barriers, youth seeking livelihood opportunities, persons with disabilities facing access and communication barriers, women who rely on water services and carry care responsibilities, and residents of remote kebeles who may be missed by central meetings. Selection will use clear, shared criteria and will be checked with women’s groups, youth representatives, disability representatives, grassroots CSOs, and local service actors to reduce gatekeeping and ensure that people facing higher barriers are not missed.',
    watchPoint: 'During implementation, check whether participant selection reaches people facing barriers, not only those already visible to committees.',
  },
  actors: {
    text: 'Awra will facilitate coordination but will not replace public responsibilities. Woreda and sector offices will be engaged as duty-bearers responsible for explaining relevant decisions, responding to feasible service issues, and participating in follow-up. Grassroots CSOs, women’s groups, youth representatives, disability representatives, kebele structures, and service committees will support outreach, barrier identification, and safe feedback. The steering committee will include clear roles and will review not only activity progress but also whether rights-holder feedback has influenced decisions.',
    watchPoint: 'During implementation, check whether duty-bearers attend only events or also respond to agreed follow-up actions.',
  },
  objectiveLogic: {
    text: 'The project objective is to strengthen rights-based local development planning in Jiru Amba by improving the ability of specific rights-holder groups to influence priorities, strengthening local CSO facilitation and evidence use, and supporting duty-bearers to respond more clearly to identified barriers. Activities will contribute to this objective when they improve access to information, create safer participation routes, clarify responsibilities, support feedback response, and generate evidence that barriers are being reduced.',
    watchPoint: 'During implementation, check whether activities are still linked to barrier reduction and accountability, not only completed as events.',
  },
  activities: {
    text: 'Activities will be organized around the barriers identified in the HRBA analysis. Accessible information sessions will explain the plan and selection criteria. Separate and mixed consultation spaces will be used where needed so women traders, youth, persons with disabilities, women who rely on water services, and remote kebele residents can raise priorities safely. Dialogue meetings will include duty-bearer response points, not only discussion. Small grants will use transparent criteria and include simple accommodation and feedback requirements. Quarterly learning events will review what changed in access, participation, accountability, and risk management.',
    watchPoint: 'During implementation, check whether activities change when feedback shows that some groups still cannot participate safely or meaningfully.',
  },
  inclusion: {
    text: 'Gender and disability inclusion will be built into the design, not limited to attendance targets. Meeting times, locations, communication formats, facilitation methods, and feedback channels will be checked for accessibility and safety. Reasonable accommodation will be planned for persons with disabilities, including accessible venues, clear information, and support for participation where needed. Women’s care and work responsibilities will be considered when scheduling activities. The project will track whether women and persons with disabilities influence decisions and receive responses, not only whether they attend events.',
    watchPoint: 'During implementation, check whether women and persons with disabilities influence decisions, not only whether they are present.',
  },
  participationAccountabilityRisk: {
    text: 'Participation will include clear information before activities, accessible ways to raise priorities, and follow-up after decisions. Rights-holders will be told what feedback was received, what can change, what cannot change, and why. Feedback channels will include safe options for people who may not want to speak publicly. Awra will track risks of exclusion, backlash, privacy loss, gatekeeper capture, and no-response fatigue. Risk mitigation will include transparent selection criteria, confidentiality rules, referral for sensitive concerns where appropriate, and regular review of whether feedback leads to action.',
    watchPoint: 'During implementation, check whether people receive a response after giving feedback and whether any group faces risk for speaking.',
  },
  monitoringEvidence: {
    text: 'Monitoring will track both activities and HRBA changes. In addition to counting trainings, meetings, grants, and reports, the project will monitor whether specific rights-holder groups received accessible information, participated safely, influenced priorities, received feedback responses, and saw selected barriers reduced. Disability-related data will be collected only when necessary, safely, and with clear purpose. Success stories will not be collected from people facing sensitive risks unless consent, dignity, confidentiality, and safer alternatives are in place.',
    watchPoint: 'During implementation, check whether evidence shows changes in access, voice, barriers, response, and safety, not only activity completion.',
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

function countNeedsHrbaCheck(review: Partial<Record<ProposalSectionId, ProposalReviewStatus>>) {
  return proposalSections.filter((section) => review[section.id] === 'needsHrbaCheck').length;
}

function getProposalReviewSignature(review: Partial<Record<ProposalSectionId, ProposalReviewStatus>>) {
  return proposalSections.map((section) => `${section.id}:${review[section.id] || ''}`).join('|');
}

function buildScreen17Submission(review: Record<ProposalSectionId, ProposalReviewStatus>): Screen17Submission {
  const needsHrbaCheck = proposalSections.filter((section) => review[section.id] === 'needsHrbaCheck').map((section) => section.id);
  return {
    screenId: 'M3-R17',
    route: '/module-3/screen-3-17',
    title: 'Open the Draft Plan',
    proposalReviewSections: {
      checkedSections: review,
      needsHrbaCheck,
      generatedAt: new Date().toISOString(),
    },
    reviewSuggestion:
      needsHrbaCheck.length >= 5
        ? 'You noticed that HRBA gaps can appear across many proposal sections, not only in the inclusion paragraph. In the next screen, you will map the pattern.'
        : 'You found several areas that need closer review. In the next screen, you will map the gaps more precisely across the proposal.',
    carryForward:
      'Carry this into the next screen: a strong HRBA review checks the whole proposal, not just the paragraph that mentions women, youth, persons with disabilities, or participation.',
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
  return getSelectedGapSections(gapsBySection).length >= 4 && getTotalGapCount(gapsBySection) >= 6;
}

function getRepairPriority(gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>): ProposalSectionId {
  const priorityOrder: ProposalSectionId[] = ['participationAccountabilityRisk', 'inclusion', 'objectiveLogic', 'rightsHolders'];
  const firstPriority = priorityOrder.find((sectionId) => (gapsBySection[sectionId] || []).length > 0);
  if (firstPriority) return firstPriority;
  const selected = getSelectedGapSections(gapsBySection);
  return selected.reduce((best, section) => ((gapsBySection[section.id] || []).length > (gapsBySection[best.id] || []).length ? section : best), selected[0] || proposalSections[0]).id;
}

function getScreen18Feedback(gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>) {
  const allGaps = proposalSections.flatMap((section) => gapsBySection[section.id] || []);
  const count = (ids: ProposalGapId[]) => allGaps.filter((gapId) => ids.includes(gapId)).length;
  const messages: string[] = [];
  if (count(['specificRightsHolders']) >= 2) messages.push('Pattern noticed: the proposal may be counting people more than analyzing rights-holders. In the repair screen, make the affected groups and their barriers more specific.');
  if (count(['dutyBearersClear', 'localOwnershipCsoRole']) >= 2) messages.push('Pattern noticed: the CSO role may be carrying too much responsibility. A rights-based design should clarify what duty-bearers, supporting actors, rights-holders, and the CSO each do.');
  if (count(['participationInfluence', 'accountabilityFeedback']) >= 2) messages.push('Pattern noticed: participation and feedback may be present, but not yet connected to influence, response, and follow-up.');
  if (count(['genderDisabilityBuiltIn']) > 0) messages.push('Pattern noticed: gender and disability should change design choices, not only participant numbers. Check access, timing, safety, communication, reasonable accommodation, and decision influence.');
  if (count(['riskDoNoHarm']) > 0) messages.push('Pattern noticed: the risk section may protect project delivery more than rights-holders. Add exclusion, privacy, backlash, capture, and no-response risks.');
  if (count(['indicatorsShowChange']) > 0) messages.push('Pattern noticed: the monitoring plan may count activities more than change. Stronger indicators should show whether barriers reduce and accountability improves.');
  return messages.slice(0, 3);
}

function buildScreen18Submission(gapsBySection: Partial<Record<ProposalSectionId, ProposalGapId[]>>): Screen18Submission {
  const repairPriority = getRepairPriority(gapsBySection);
  return {
    screenId: 'M3-R18',
    route: '/module-3/screen-3-18',
    title: 'Find the HRBA Gaps Across the Plan',
    proposalGapMap: {
      gapsBySection,
      overallPattern:
        'Your review shows where the draft plan needs HRBA repair. A strong repair should not only improve wording. It should change the design logic: who participates, who has responsibility, what barriers are addressed, how risks are reduced, and what evidence shows change.',
      repairPriority,
      generatedAt: new Date().toISOString(),
    },
    patternFeedback: getScreen18Feedback(gapsBySection),
    carryForward:
      'Carry this into the next screen: choose one section from your gap map and repair it. Do not try to rewrite the whole proposal. A focused repair is stronger than a long unfocused rewrite.',
  };
}

function getRepairSelectionSignature(sectionId: ProposalSectionId, moveIds: RepairMoveId[]) {
  return `${sectionId}:${[...moveIds].sort().join(',')}`;
}

function getScreen19Feedback(moveIds: RepairMoveId[]) {
  const messages: string[] = [];
  if (moveIds.includes('clarifyDutyBearers')) messages.push('Strong repair move: you clarified that the CSO should not replace duty-bearers. This helps keep accountability visible.');
  if (moveIds.includes('createInfluenceRoute') || moveIds.includes('addSafeFeedback')) messages.push('Strong repair move: you connected participation to influence, response, and follow-up. That is stronger than consultation alone.');
  if (moveIds.includes('buildInInclusion')) messages.push('Strong repair move: you treated gender and disability as design issues, not only attendance numbers.');
  if (moveIds.includes('addRiskMitigation')) messages.push('Strong repair move: you checked risk to rights-holders, not only risk to project delivery.');
  if (moveIds.includes('strengthenIndicators')) messages.push('Strong repair move: you moved monitoring toward evidence of change, not only activity counts.');
  if (messages.length === 0) messages.push('Your repair is stronger because it uses HRBA analysis to improve design logic. In the next screen, you will test this judgment through an applied knowledge check.');
  return messages.slice(0, 2);
}

function buildScreen19Submission(sectionId: ProposalSectionId, moveIds: RepairMoveId[], previousGaps: ProposalGapId[], optionalReflection = ''): Screen19Submission {
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
      implementationWatchPoint: repaired.watchPoint,
      generatedAt: new Date().toISOString(),
    },
    feedbackMessages: getScreen19Feedback(moveIds),
    optionalReflection: optionalReflection.trim() || undefined,
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
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showReviewImage, setShowReviewImage] = useState(true);
  const outputRef = useRef<HTMLElement>(null);
  const titleId = `${screen.id}-title`;
  const taskId = `${screen.id}-task`;
  const feedbackId = `${screen.id}-feedback`;
  const selectedChoices = module3ContextChoices.filter((choice) => selected.includes(choice.id));
  const selectedStrong = selectedChoices.filter((choice) => choice.strong).length;
  const selectedSurfaceChoices = selectedChoices.filter((choice) => !choice.strong);
  const selectedSurface = selectedSurfaceChoices.length;
  const strongTotal = module3ContextChoices.filter((choice) => choice.strong).length;
  const selectedAffectedGroups = Array.from(new Set(selectedChoices.flatMap((choice) => choice.affectedGroups)));
  const selectedBarriers = Array.from(new Set(selectedChoices.flatMap((choice) => choice.barriers)));
  const selectedEvidence = Array.from(new Set([
    ...selectedChoices.flatMap((choice) => choice.evidence),
    'No names, complaints, exact locations, or sensitive details',
  ]));
  const hasInfluenceSignal = selected.includes('influence');
  const hasGroupSpecificSignal = selected.some((choiceId) =>
    ['women-barriers', 'disability-access', 'youth-pathway', 'remote-poor'].includes(choiceId),
  );
  const hasAccessibilitySignal = selected.includes('disability-access');
  const hasLivelihoodSignal = selected.includes('youth-pathway');
  const onlySurfaceEvidence = selected.length > 0 && selectedStrong === 0;
  const feedbackTone =
    selectedStrong >= strongTotal - 1 && selectedSurface === 0
      ? 'strong'
      : selectedStrong >= strongTotal - 1 && selectedSurface > 0
        ? 'caution'
        : selectedStrong > 0
          ? 'partial'
          : 'support';
  const feedbackCopy = {
    strong:
      'Strong draft scan. Based on your selections from the Jiru Amba case, the design should check unequal influence, different barriers across groups, accessibility, information, livelihood pathways, location or income-related barriers, and follow-up before activities are finalized.',
    caution:
      'Strong draft scan. Based on your selections from the Jiru Amba case, the design should check unequal influence, different barriers across groups, accessibility, information, livelihood pathways, location or income-related barriers, and follow-up before activities are finalized. You also selected surface evidence. Keep it as useful background, but do not treat it as proof that barriers were understood or removed.',
    partial:
      selectedStrong === 1
        ? 'Good start. This selection points to one issue in the case. A stronger context scan also checks who may be furthest behind, what barriers are structural, and what evidence should be verified safely.'
        : 'Good draft scan. You identified useful context issues from the case. Strengthen it by also checking who had less influence, which groups may face different barriers, and what evidence still needs safe verification.',
    support:
      'This is useful administrative evidence, but it is not yet a rights-based context scan. Add signals that show who may be affected differently, what barriers may exist, and whether participation changed the design.',
  }[feedbackTone];
  const generatedInsight =
    feedbackTone === 'strong' || feedbackTone === 'caution'
      ? 'Your selections suggest that the Jiru Amba design should not rely only on attendance, ranked priorities, activities, budgets, or indicators. It should check unequal influence, different barriers, accessibility, information, livelihood pathways, location, income-related barriers, and follow-up before implementation.'
      : feedbackTone === 'support'
        ? 'Your selections mostly show that the plan looks organized. That is useful, but a rights-based context scan also asks who may be excluded, what barriers exist, and whether participation changed decisions.'
        : 'Your selections identify useful context issues from the case. Strengthen the scan by also checking who may be affected differently, which barriers differ across groups, and what evidence still needs safe verification.';
  const contextWarnings = [
    onlySurfaceEvidence
      ? 'Surface evidence selected: reports, budgets, and indicators are useful, but they do not by themselves show who may be left behind or what barriers shaped the design.'
      : '',
    !hasInfluenceSignal
      ? 'Influence check missing: the scan does not yet test whether participation changed priorities.'
      : '',
    !hasGroupSpecificSignal
      ? 'Differentiated barriers missing: the scan does not yet show which groups may face different barriers.'
      : '',
    !hasAccessibilitySignal
      ? 'Accessibility check missing: disability inclusion may remain a mention rather than a design requirement.'
      : '',
    !hasLivelihoodSignal
      ? 'Livelihood pathway check missing: the scan does not yet test whether activities lead to practical opportunity.'
      : '',
  ].filter(Boolean);
  const visibleContextWarnings = contextWarnings.slice(0, 3);
  const selectedCountLabel = selected.length === 1 ? '1 signal selected' : `${selected.length} signals selected`;
  const selectedContextSignalGroups = module3ContextOutputGroups.reduce<Record<string, string[]>>((groups, group) => {
    groups[group.id] = selectedChoices
      .filter((choice) => choice.outputGroup === group.id)
      .map((choice) => choice.id);
    return groups;
  }, {});
  const contextScanSummary =
    'Based on the Jiru Amba case selections, the draft scan highlights groups who may be affected differently, barriers to test, and evidence to verify safely before activities are finalized.';

  const toggleChoice = (choiceId: string) => {
    setSelected((current) =>
      current.includes(choiceId)
        ? current.filter((item) => item !== choiceId)
        : [...current, choiceId],
    );
  };

  const submitScan = () => {
    if (selected.length > 0) {
      setSubmitted(true);
      if (typeof window !== 'undefined') {
        window.setTimeout(() => outputRef.current?.focus(), 0);
      }
    }
  };

  return (
    <main className="m3-screen m3-context-scan-screen" aria-labelledby={titleId}>
      <article className="m3-context-scan-shell">
        <header className="m3-context-scan-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-context-label">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <section className="m3-context-scan-intro" aria-labelledby={`${screen.id}-meaning`}>
            <h2 id={`${screen.id}-meaning`}>What this means</h2>
            {module3ContextScanIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="m3-context-scan-concept-chips" aria-label="Context scan guiding questions">
              {module3ContextConceptChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </section>
        </header>

        <section className="m3-context-scan-studio" aria-labelledby={`${screen.id}-model`}>
          <div className="m3-context-scan-model">
            <div className="m3-context-scan-model-heading">
              <h2 id={`${screen.id}-model`}>Purpose of this activity</h2>
              <p>
                The purpose of this activity is to practice reading a project plan beneath the
                surface. Attendance records, ranked priorities, activities, budgets, and indicators
                are useful, but they do not automatically show who influenced decisions or who
                faced barriers.
              </p>
              <p>
                A rights-based context scan helps a CSO ask: who may be affected differently,
                which barriers or root causes need attention, and what evidence should be verified
                safely before implementation?
              </p>
              <h3>Read the Jiru Amba plan beneath the surface</h3>
            </div>
            <div className="m3-context-scan-layers">
              {module3ContextEvidence.map((layer) => (
                <div key={layer.label} className="m3-context-scan-layer">
                  <h3>{layer.label}</h3>
                  <ul>
                    {layer.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {showReviewImage && (
            <figure className="m3-context-scan-hero">
              <img
                src={module3ContextScanAssets.review.src}
                alt={module3ContextScanAssets.review.alt}
                onError={() => setShowReviewImage(false)}
              />
              <figcaption>
                Support visual: the Jiru Amba process looks active, but the evidence scan asks
                whose influence, access, safety, and benefit remain uncertain.
              </figcaption>
            </figure>
          )}
        </section>

        <section className="m3-context-scan-task" aria-labelledby={taskId}>
          <div className="m3-context-scan-task-header">
            <div>
              <p className="m3-card-kicker">Context and inequality scan</p>
              <h2 id={taskId}>Practice a context scan using the Jiru Amba case</h2>
              <p>
                Select the Jiru Amba signals that should be checked before implementation. Focus
                on signals that suggest who may be affected differently, what barriers may exist,
                and what evidence would need safe verification.
              </p>
            </div>
            <span className="m3-context-scan-selection-count" aria-live="polite">
              {selected.length === 0 ? '0 selected' : selectedCountLabel}
            </span>
          </div>
          <div className="m3-context-scan-choice-grid" role="group" aria-labelledby={taskId}>
            {module3ContextChoices.map((choice) => {
              const isSelected = selected.includes(choice.id);
              return (
                <button
                  key={choice.id}
                  type="button"
                  className={`m3-context-scan-choice ${isSelected ? 'is-selected' : ''}`}
                  data-choice-id={choice.id}
                  aria-pressed={isSelected}
                  onClick={() => toggleChoice(choice.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
                      event.preventDefault();
                      toggleChoice(choice.id);
                    }
                  }}
                >
                  <span className="m3-context-scan-check" aria-hidden="true">
                    {isSelected ? '✓' : '+'}
                  </span>
                  <span className="m3-context-scan-choice-copy">
                    <span>{choice.text}</span>
                    {submitted && (
                      <span className="m3-context-scan-choice-label">
                        {isSelected
                          ? choice.strong
                            ? 'Selected signal'
                            : 'Surface evidence selected'
                          : choice.strong
                            ? 'Barrier signal'
                            : 'Surface evidence — useful, but not enough by itself'}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="m3-context-scan-submit-row">
            <button
              type="button"
              className="m3-context-scan-submit-button"
              onClick={submitScan}
              disabled={selected.length === 0}
            >
              {submitted ? 'Update draft scan' : 'Generate draft scan'}
            </button>
            <p>
              {selected.length === 0
                ? 'Select at least one signal from the case study to generate a draft scan.'
                : submitted
                  ? 'You can update your selections and regenerate the draft scan.'
                  : 'Generate a draft scan from your case-study selections.'}
            </p>
          </div>
        </section>

        {submitted && (
          <section
            ref={outputRef}
            tabIndex={-1}
            className="m3-context-scan-output"
            aria-live="polite"
            aria-labelledby={`${screen.id}-output-title`}
          >
            <h2 id={`${screen.id}-output-title`}>Draft context scan from your selections</h2>
            <p>
              Based on your selections from the Jiru Amba case, this draft scan suggests issues
              to check before activities are finalized. It is a learning output, not a final
              assessment. In real project work, verify evidence safely and avoid names,
              complaints, exact locations, or sensitive details.
            </p>
            <div className="m3-context-scan-output-grid">
              <div className="m3-context-scan-output-group">
                <h3>What your selections suggest</h3>
                <p>{generatedInsight}</p>
              </div>
              <div className="m3-context-scan-output-group">
                <h3>Groups to examine further</h3>
                {selectedAffectedGroups.length > 0 ? (
                  <ul>
                    {selectedAffectedGroups.map((group) => (
                      <li key={group}>{group}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Women traders, women who rely on water services, youth, persons with disabilities, low-income households, communities in remote kebeles, and informal workers.</p>
                )}
              </div>
              <div className="m3-context-scan-output-group">
                <h3>Barriers to test</h3>
                {selectedBarriers.length > 0 ? (
                  <ul>
                    {selectedBarriers.map((barrier) => (
                      <li key={barrier}>{barrier}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Unequal influence, accessibility barriers, information gaps, timing barriers, safety concerns, livelihood risk, income-related barriers, distance or location barriers, and weak follow-up or response.</p>
                )}
              </div>
              <div className="m3-context-scan-output-group">
                <h3>Evidence to verify safely</h3>
                <ul>
                  {selectedEvidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              {selectedSurface > 0 && (
                <div className="m3-context-scan-output-group m3-context-scan-output-group--surface">
                  <h3>Surface evidence selected</h3>
                  <p>
                    Useful evidence, but it does not by itself show meaningful participation,
                    barrier removal, or rights-holder influence.
                  </p>
                  <ul>
                    {selectedSurfaceChoices.map((choice) => (
                      <li key={choice.id}>{choice.text}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {submitted && (
          <section
            id={feedbackId}
            className={`m3-context-scan-feedback m3-context-scan-feedback--${feedbackTone}`}
            aria-live="polite"
            aria-labelledby={`${screen.id}-feedback-title`}
          >
            <h2 id={`${screen.id}-feedback-title`}>Feedback on your scan</h2>
            <p>{feedbackCopy}</p>
            {visibleContextWarnings.length > 0 && (
              <section className="m3-context-scan-warning-section" aria-labelledby={`${screen.id}-warnings`}>
                <h3 id={`${screen.id}-warnings`}>What to check next</h3>
                <div className="m3-context-scan-warning-grid">
                  {visibleContextWarnings.map((warning) => (
                    <p key={warning} className="m3-context-scan-warning">
                      <span aria-hidden="true">!</span>
                      {warning}
                    </p>
                  ))}
                </div>
                {contextWarnings.length > visibleContextWarnings.length && (
                  <p className="m3-context-scan-warning-note">
                    Also review the remaining context gaps before applying this approach in real
                    project design.
                  </p>
                )}
              </section>
            )}
          </section>
        )}

        {submitted && (
          <section className="m3-context-scan-carry" aria-labelledby={`${screen.id}-carry`}>
            <h2 id={`${screen.id}-carry`}>Case-study learning to carry forward</h2>
            <div className="m3-context-scan-carry-grid">
              <div className="m3-context-scan-carry-item">
                <h3>Learning from the Jiru Amba case</h3>
                <p>{module3ContextCarryForward[0].text}</p>
              </div>
              <div className="m3-context-scan-carry-item">
                <h3>Groups to examine further</h3>
                <p>
                  {selectedAffectedGroups.length > 0
                    ? selectedAffectedGroups.join(', ')
                    : module3ContextCarryForward[1].text}
                </p>
              </div>
              <div className="m3-context-scan-carry-item">
                <h3>Barriers to test next</h3>
                <p>
                  {selectedBarriers.length > 0
                    ? selectedBarriers.join(', ')
                    : module3ContextCarryForward[2].text}
                </p>
              </div>
            </div>
            <div className="m3-context-scan-reflection">
              <h3>Apply the idea to your own CSO context</h3>
              <p>
                In your own work, which group might be affected differently, and what evidence
                would you need to verify safely before designing activities?
              </p>
            </div>
          </section>
        )}

        <section className="m3-context-scan-safe-note" aria-labelledby={`${screen.id}-safe`}>
          <h2 id={`${screen.id}-safe`}>Safe context analysis</h2>
          <p>
            Use fictional, anonymized, or generalized examples during training. Do not enter
            names, complaints, exact locations, or sensitive details. In real work, use safe and
            appropriate evidence, such as disaggregated information where available,
            rights-holder perspectives, CSO observations, and service or planning records.
          </p>
        </section>

        <div className="m3-context-scan-actions">
          {!submitted && (
            <p className="m3-context-scan-continue-note">
              Generate the draft case-study scan to save this learning and continue.
            </p>
          )}
          <PrimaryButton
            disabled={!submitted || selected.length === 0}
            onClick={() =>
              onComplete({
                selectedContextSignals: selected,
                submitted: true,
                contextScanSummary,
                selectedContextSignalGroups,
                affectedGroupsToExamine: selectedAffectedGroups,
                barriersToTest: selectedBarriers,
                evidenceToVerifySafely: selectedEvidence,
                carryForward: {
                  issue:
                    'The plan should explain who may be affected differently, what barriers shape participation and benefit, and what evidence still needs safe verification before activities are finalized.',
                  nextUse: 'Use this case-study scan to practice selecting rights and policy references on the next screen.',
                },
                surfaceEvidenceSelected: selectedSurfaceChoices.map((choice) => choice.id),
                surfaceEvidenceSelectedCount: selectedSurface,
              })
            }
          >
            {screen.continueLabel}
          </PrimaryButton>
        </div>
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
  const [anchorSignalMatches, setAnchorSignalMatches] = useState<Record<PolicyAnchorId, JiruAmbaSignalId | ''>>({
    meaningful_participation: '',
    non_discrimination_equality: '',
    disability_accessibility: '',
    transparency_information: '',
    accountability_response: '',
    livelihood_service_commitment: '',
  });
  const [submittedOutput, setSubmittedOutput] = useState<Record<string, unknown> | null>(null);
  const [showMainVisual, setShowMainVisual] = useState(true);
  const [showIconStrip, setShowIconStrip] = useState(true);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const taskId = `${screen.id}-task`;
  const screen5SignalIds = getScreen5Signals(state);
  const selectedMatches: AnchorSignalMatch[] = selectedAnchorIds.flatMap((anchorId) => {
    const signalId = anchorSignalMatches[anchorId];
    return isJiruAmbaSignalId(signalId) ? [{ anchorId, signalId }] : [];
  });
  const readyToSubmit = selectedAnchorIds.length > 0 && selectedMatches.length === selectedAnchorIds.length;
  const submittedAnchorIds = (submittedOutput?.selectedAnchorIds || []) as PolicyAnchorId[];
  const submittedMatches = (submittedOutput?.anchorSignalMatches || []) as AnchorSignalMatch[];
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
        setAnchorSignalMatches((matches) => ({ ...matches, [anchorId]: '' }));
        return current.filter((id) => id !== anchorId);
      }

      return [...current, anchorId];
    });
  };

  const updateMatch = (anchorId: PolicyAnchorId, signalId: string) => {
    setAnchorSignalMatches((current) => ({
      ...current,
      [anchorId]: isJiruAmbaSignalId(signalId) ? signalId : '',
    }));
  };

  const buildSubmission = () => {
    const generatedMapRows = generateStandardsMapRows(selectedAnchorIds, selectedMatches);
    const feedback = calculatePolicyMapFeedback(selectedAnchorIds, selectedMatches, screen5SignalIds);
    const coreAnchorCount = selectedAnchorIds.filter((id) => corePolicyAnchorIds.includes(id)).length;

    return {
      screenId: 'M3-R06',
      submitted: true,
      selectedAnchorIds,
      anchorSignalMatches: selectedMatches,
      selectedCount: selectedAnchorIds.length,
      matchedCount: selectedMatches.length,
      coreAnchorCount,
      coverageScore: feedback.coverageScore,
      relevanceScore: feedback.relevanceScore,
      usefulnessScore: feedback.usefulnessScore,
      feedbackLevel: feedback.feedbackLevel,
      missingCoreAnchorIds: feedback.missingCoreAnchorIds,
      warnings: feedback.warnings,
      generatedMapRows,
      standardsMapSummary: policyMapSummary,
      carryForward: {
        snapshotField: 'standardsAndPolicyAnchors',
        issue:
          'The case shows that a plan should not only document consultation. It should be linked to rights, standards, policies, and public commitments that help test participation, equality, accessibility, transparency, accountability, and practical benefit.',
        nextUse: 'Use this case-study practice to examine rights-holders and barriers on the next screen.',
      },
    };
  };

  const submitMap = () => {
    if (!readyToSubmit) return;
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
    ? 'Strong draft map. Based on your selections from the Jiru Amba case, you connected the signals to practical HRBA references: participation, equality, accessibility, transparency, accountability, and service or livelihood commitments. This gives the design team stronger questions before activities are finalized.'
    : feedbackLevel === 'good_with_gap'
      ? 'Good draft map. You selected several useful references and connected them to the case. Strengthen it by checking which important reference is still missing: participation, equality, accessibility, transparency, accountability, or practical benefit.'
      : feedbackLevel === 'partial'
        ? 'Good start. Your selections create a focused draft map, but it may not yet guide the whole design. Add references that test whether people influenced decisions, whether barriers differ across groups, whether information is accessible, and whether there is a response mechanism.'
        : 'This is not yet a strong policy and standards map. HRBA references are not decoration. They help the design team ask who holds rights, who may be excluded, who has responsibility, and what must change before implementation.';
  const insightCopy = feedbackLevel === 'strong'
    ? 'Your selections create a broad draft map. They connect the Jiru Amba case signals to participation, equality, accessibility, transparency, accountability, and service or livelihood references. This helps the design team check the plan before activities are finalized.'
    : 'Your selections create a useful draft map, but some references are still missing. Check whether the plan also needs participation, equality, accessibility, information, accountability, and practical benefit references.';
  const submitHelper = selectedAnchorIds.length === 0
    ? 'Select at least one rights or policy reference from the case-study activity to begin your draft map.'
    : readyToSubmit
      ? 'Generate a draft map from your case-study matches.'
      : 'Match each selected reference to a Jiru Amba signal before generating the draft map.';
  const selectedReferenceCountLabel = selectedAnchorIds.length === 1
    ? '1 reference selected'
    : `${selectedAnchorIds.length} references selected`;

  return (
    <main className="m3-screen m3-policy-map-screen" aria-labelledby={titleId}>
      <article className="m3-policy-map-shell">
        <header className="m3-policy-map-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-context-label">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <section className="m3-policy-map-concept" aria-labelledby={`${screen.id}-meaning`}>
            <h2 id={`${screen.id}-meaning`}>What this means</h2>
            <p>
              A policy and standards map helps a CSO connect a project issue to the rights,
              standards, laws, policies, service commitments, and public responsibilities that
              should guide the design. It helps the team ask better questions before choosing
              activities.
            </p>
            <p>
              In this activity, you will practice this using the Jiru Amba case study. You do not
              need to become a legal expert. The aim is to use relevant references to check
              participation, equality, accessibility, information, accountability, and practical
              benefit before implementation.
            </p>
            <div className="m3-policy-map-concept-chips" aria-label="Policy and standards map guiding questions">
              {policyMapConceptChips.map((chip) => (
                <span key={chip} className="m3-policy-map-concept-chip">{chip}</span>
              ))}
            </div>
          </section>
        </header>

        <section className="m3-policy-map-studio" aria-label="Policy and standards map teaching area">
          <div className="m3-policy-map-teaching">
            <section className="m3-policy-map-card" aria-labelledby={`${screen.id}-purpose`}>
              <h2 id={`${screen.id}-purpose`}>Purpose of this activity</h2>
              <p>
                The purpose of this activity is to practice linking case-study signals to practical
                rights and policy references. The aim is not to quote laws or make legal conclusions.
                The aim is to use relevant references to improve project design questions before
                activities start.
              </p>
              <p>
                A stronger HRBA design asks which rights, standards, policies, or commitments help
                test participation, equality, accessibility, information, accountability, and
                practical service or livelihood benefit.
              </p>
            </section>

            <section className="m3-policy-map-card" aria-labelledby={`${screen.id}-example`}>
              <h2 id={`${screen.id}-example`}>Worked example</h2>
              <div className="m3-policy-map-example">
                <div>
                  <span>Context signal</span>
                  <p>Women who rely on water services were present but may not have shaped priorities.</p>
                </div>
                <div>
                  <span>HRBA design question</span>
                  <p>Did they influence decisions, or only attend the meeting?</p>
                </div>
                <div>
                  <span>Rights / policy reference</span>
                  <p>Participation and consultation</p>
                  <small>Example references: HRBA participation principle; constitutional consultation and development commitments.</small>
                </div>
                <div>
                  <span>Responsibility question</span>
                  <p>Which planning or service actor must respond if priorities change?</p>
                </div>
              </div>
            </section>

            <section className="m3-policy-map-safe-note" aria-labelledby={`${screen.id}-safe`}>
              <h2 id={`${screen.id}-safe`}>Safe use of rights and policy references</h2>
              <p>
                Use rights, standards, laws, and policies as design references, not accusations.
                Do not name officials, record complaints, or enter sensitive details. In real work,
                verify current laws, policies, and commitments before citing them externally.
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

        <section className="m3-policy-map-builder" aria-labelledby={taskId}>
          <div className="m3-policy-map-task-header">
            <div>
              <p className="m3-card-kicker">Policy and standards map</p>
              <h2 id={taskId}>Practice mapping rights and policy references using the Jiru Amba case</h2>
              <p>
                Select the rights and policy references that should help test the Jiru Amba design.
                Then match each selected reference to the case-study signal it helps you examine.
              </p>
            </div>
            <span className="m3-policy-map-count" aria-live="polite">
              {selectedAnchorIds.length === 0 ? '0 selected' : selectedReferenceCountLabel}
            </span>
          </div>

          <div className="m3-policy-map-step">
            <h3>Step 1: Select the rights and policy references that should guide the design.</h3>
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
                      <span>{anchor.plainMeaning}</span>
                      <span className="m3-policy-map-reference-list" aria-label={`Related references for ${anchor.title}`}>
                        <span>Related references</span>
                        {anchor.relatedReferences.map((reference) => (
                          <small key={reference}>{reference}</small>
                        ))}
                      </span>
                      <small>{anchor.designQuestionPreview}</small>
                      {selected && <span className="m3-policy-map-selected-label">Selected</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedAnchorIds.length > 0 && (
            <div className="m3-policy-map-step m3-policy-map-match-panel">
              <h3>Step 2: Match each selected reference to the Jiru Amba signal it helps examine.</h3>
              <div className="m3-policy-map-match-grid">
                {selectedAnchorIds.map((anchorId) => {
                  const anchor = getAnchorById(anchorId);
                  if (!anchor) return null;

                  return (
                    <label key={anchorId} className="m3-policy-map-match-card">
                      <span>
                        <strong>{anchor.title}</strong>
                        <small>Recommended: {getSignalById(anchor.defaultSignalId)?.label}</small>
                      </span>
                      <select
                        data-match-anchor-id={anchorId}
                        value={anchorSignalMatches[anchorId]}
                        onInput={(event) => updateMatch(anchorId, event.currentTarget.value)}
                        onChange={(event) => updateMatch(anchorId, event.target.value)}
                      >
                        <option value="">Choose a Jiru Amba signal</option>
                        {jiruAmbaSignalOptions.map((signal) => (
                          <option key={signal.id} value={signal.id}>
                            {signal.label}
                          </option>
                        ))}
                      </select>
                      {isJiruAmbaSignalId(anchorSignalMatches[anchorId]) && (
                        <em>
                          {getSignalById(anchorSignalMatches[anchorId] as JiruAmbaSignalId)?.plainDescription}
                        </em>
                      )}
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
              disabled={!readyToSubmit}
              onClick={submitMap}
            >
              {submittedOutput ? 'Update draft map' : 'Generate draft map'}
            </button>
            <p aria-live="polite">
              {formChanged ? 'Update your draft map before continuing so the saved output matches your latest choices.' : submitHelper}
            </p>
          </div>
        </section>

        {submittedOutput && (
          <section className="m3-policy-map-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>
              Your draft Policy and Standards Map
            </h2>
            <p>
              Based on your selections from the Jiru Amba case, this draft map shows which rights
              and policy references can help test the project design. It is a learning output, not
              a final legal or policy analysis. In real work, verify references before using them
              externally.
            </p>
            <div className="m3-policy-map-output-grid">
              {generatedRows.map((row) => (
                <article key={row.anchorId} className="m3-policy-map-output-row">
                  <div>
                    <span>Context signal</span>
                    <p>{row.signalLabel}</p>
                  </div>
                  <div>
                    <span>Reference type</span>
                    <p>{row.sourceLayer}</p>
                  </div>
                  <div>
                    <span>Rights / policy reference</span>
                    <p>{row.anchorTitle}</p>
                    <span className="m3-policy-map-output-references">
                      Related references
                      {row.relatedReferences.map((reference) => (
                        <small key={reference}>{reference}</small>
                      ))}
                    </span>
                  </div>
                  <div>
                    <span>Design question</span>
                    <p>{row.designQuestion}</p>
                  </div>
                  <div>
                    <span>Responsibility question</span>
                    <p>{row.responsibilityQuestion}</p>
                  </div>
                  <strong>{row.snapshotTag}</strong>
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
              officials, record complaints, or enter sensitive details. In real work, verify the
              relevant laws, policies, and commitments before citing them externally.
            </p>
          </section>
        )}

        {submittedOutput && (
          <section
            className={`m3-policy-map-feedback m3-policy-map-feedback--${feedbackLevel || 'surface'}`}
            aria-live="polite"
            aria-labelledby={`${screen.id}-feedback`}
          >
            <h2 id={`${screen.id}-feedback`}>Feedback on your draft map</h2>
            <p>{feedbackCopy}</p>
          </section>
        )}

        {submittedOutput && (
          <section className="m3-policy-map-carry-forward" aria-labelledby={`${screen.id}-carry`}>
            <h2 id={`${screen.id}-carry`}>Case-study learning to carry forward</h2>
            <div className="m3-policy-map-carry-grid">
              <div>
                <span>Learning from the Jiru Amba case</span>
                <p>
                  The plan should not only document consultation. It should be linked to rights,
                  standards, policies, and public commitments that require meaningful participation,
                  non-discrimination, accessibility, transparency, accountability, and practical
                  service or livelihood benefit.
                </p>
              </div>
              <div>
                <span>References to check</span>
                <p>
                  {generatedRows.length > 0
                    ? generatedRows.map((row) => row.anchorTitle).join(', ')
                    : 'Participation, equality, accessibility, transparency, accountability, and service or livelihood references.'}
                </p>
              </div>
              <div>
                <span>Next use</span>
                <p>Use this case-study practice to examine rights-holders and barriers on the next screen.</p>
              </div>
            </div>
            <div className="m3-policy-map-reflection">
              <h3>Apply the idea to your own CSO context</h3>
              <p>
                In your own work, which rights or policy reference would you check before
                finalizing activities? Do not enter names, complaints, exact locations, or
                sensitive details.
              </p>
            </div>
          </section>
        )}

        <div className="m3-policy-map-actions">
          {!submittedOutput && (
            <p className="m3-policy-map-continue-note">
              Generate the draft map before saving this screen.
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
              onComplete({
                ...submittedOutput,
                module3: {
                  screen6: submittedOutput,
                },
                screen6: submittedOutput,
              });
            }}
          >
            {screen.continueLabel}
          </PrimaryButton>
        </div>
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
    selectedSpecificGroupCount >= 3 &&
    groupsMissingBarriers.length === 0 &&
    hasValidCustomGroup &&
    hasAtLeastOneBarrierLink &&
    !isSubmitting;
  const currentSignature = JSON.stringify({
    selectedGroupIds: orderedSelectedGroupIds,
    selectedSpecificGroupIds,
    customGroupLabel: customSelected && customValidation.isValid ? customValidation.trimmed : undefined,
    groupBarrierLinks: selectedSpecificGroupIds.map((groupId) => ({
      groupId,
      barrierIds: getGroupBarrierIds(groupBarrierLinks, groupId),
    })),
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
    selectedSpecificGroupCount < 3
      ? 'Select at least 3 specific rights-holder groups to build a strong practice map.'
      : selectedSpecificGroupCount <= 5
        ? 'Good range for a focused practice map.'
        : 'This map may become too broad. Keep only the groups that most change the design question.';
  const isBuilderEmpty = selectedSpecificGroupCount === 0;
  const submitHelper =
    selectedSpecificGroupCount === 0
      ? 'Select at least 3 specific rights-holder groups to build a strong practice map.'
      : selectedSpecificGroupCount === 1
        ? 'Select 2 more specific rights-holder groups before generating the draft map.'
        : selectedSpecificGroupCount === 2
          ? 'Select 1 more specific rights-holder group before generating the draft map.'
          : customInvalid
            ? 'Fix the generalized group label before generating the draft map.'
            : groupsMissingBarriers.length === 1
              ? `Add at least one priority barrier for: ${missingBarrierLabels[0]}.`
              : groupsMissingBarriers.length >= 2
                ? `Add at least one priority barrier for each of these groups: ${missingBarrierLabels.join(', ')}.`
                : submittedOutput
                  ? 'You can update your selections and generate the map again.'
                  : 'Ready to generate your draft rights-holder and barrier map.';
  const feedbackCopy = feedbackLevel === 'strong'
    ? 'Strong draft map. Based on your selections from the Jiru Amba case, you moved beyond “the community” and identified specific rights-holder groups and priority barriers. This gives the design team stronger questions about participation, access, safety, information, livelihood benefit, and follow-up before activities are finalized.'
    : feedbackLevel === 'good_with_gap'
      ? 'Good draft map. You identified specific rights-holder groups and some important barriers. Strengthen it by checking whether any group also faces barriers to influence, accessibility, information, safety, cost, livelihood benefit, or feedback response.'
      : feedbackLevel === 'too_unfocused'
        ? 'Your draft map is very broad. A useful HRBA map focuses on the barriers that most change the design. Review each group and keep the barriers the project must actively respond to.'
        : 'This is still too broad for HRBA design. “The community” is not one experience. Strengthen the map by identifying specific groups and the barriers they face to voice, access, safety, information, benefit, or follow-up.';
  const insightCopy = feedbackLevel === 'strong'
    ? 'Your draft map identifies specific rights-holder groups and barriers that may affect voice, access, safety, information, livelihood benefit, and follow-up. This gives the design team a clearer basis for improving the Jiru Amba plan before implementation.'
    : feedbackLevel === 'too_unfocused'
      ? 'Your draft map is very broad. A useful HRBA map focuses on the barriers that most change the design, not every possible barrier.'
      : 'Your draft map has useful starting points. Strengthen it by checking whether the design also needs to respond to influence, accessibility, information, livelihood benefit, safety, cost, distance, or feedback barriers.';

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
      rightsHolderBarrierSummary,
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

  return (
    <main className="m3-screen m3-rights-map-screen" aria-labelledby={titleId}>
      <article className="m3-rights-map-shell">
        <header className="m3-rights-map-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-rights-map-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <section className="m3-rights-map-concept" aria-labelledby={`${screen.id}-meaning`}>
            <h2 id={`${screen.id}-meaning`}>What this means</h2>
            <p>
              A rights-holder is a person or group whose rights are affected by the project issue.
              In HRBA project design, we do not only say “the community.” We ask which groups are
              affected differently, what barriers they face, what voice they have, and what must
              change in the design.
            </p>
            <p>
              In this activity, you will practice this using the Jiru Amba case study. The aim is
              not to make a final assessment. The aim is to create a draft map that helps the
              project team check participation, access, safety, information, livelihood benefit,
              and follow-up before implementation.
            </p>
            <div className="m3-rights-map-concept-chips" aria-label="Rights-holder mapping guiding questions">
              {rightsHolderConceptChips.map((chip) => (
                <span key={chip} className="m3-rights-map-concept-chip">{chip}</span>
              ))}
            </div>
          </section>
        </header>

        <section className="m3-rights-map-orientation" aria-label="Rights-holder mapping orientation">
          <section className="m3-rights-map-card" aria-labelledby={`${screen.id}-purpose`}>
            <h2 id={`${screen.id}-purpose`}>Purpose of this activity</h2>
            <p>
              The purpose of this activity is to practice moving from a broad community label to
              specific rights-holder groups. A project can say “the community participated” and
              still miss who could not influence decisions, access information, attend safely,
              benefit from activities, or receive follow-up.
            </p>
            <p>
              A rights-holder and barrier map helps a CSO ask better design questions before
              activities are finalized: who may be left out, what barriers matter most, what
              support is needed, and what question should be carried into responsibility mapping.
            </p>
          </section>

          <section className="m3-rights-map-card" aria-labelledby={`${screen.id}-example`}>
            <h2 id={`${screen.id}-example`}>Worked example</h2>
            <p>Here is how one broad signal becomes a more useful design question.</p>
            <div className="m3-rights-map-example">
              <div>
                <span>Rights-holder group</span>
                <p>Women who rely on water services</p>
              </div>
              <div>
                <span>Priority barriers</span>
                <p>Timing, information, and limited influence</p>
              </div>
              <div>
                <span>Design question</span>
                <p>How will women who rely on water services help shape water-service priorities before activities and budgets are finalized?</p>
              </div>
              <div>
                <span>Question for Screen 8</span>
                <p>Who must respond if water-service priorities need to change?</p>
              </div>
            </div>
            <p>
              The point is not to list every possible barrier. The point is to identify the
              barriers that should change the design.
            </p>
          </section>

          <section className="m3-rights-map-safe-note" aria-labelledby={`${screen.id}-safe`}>
            <h2 id={`${screen.id}-safe`}>Safe practice</h2>
            <p>
              Use the Jiru Amba learning case. When applying this tool to your own work, use
              generalized group labels only. Do not enter names, complaints, exact locations, or
              details that could identify or expose people.
            </p>
          </section>
        </section>

        <section className="m3-rights-map-builder-section" aria-labelledby={taskId}>
          <div className="m3-rights-map-task-header">
            <div>
              <p className="m3-rights-map-kicker">Rights-Holder and Barrier Map</p>
              <h2 id={taskId}>Practice a rights-holder and barrier map using the Jiru Amba case</h2>
              <p>
                Step 1: Select the rights-holder groups that may experience barriers differently.
                Step 2: Add the priority barriers each selected group may face. Then generate a
                draft map from your selections.
              </p>
              <p>Select 3 to 5 specific groups for this practice map. Add more only if they change the design question.</p>
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
              <p>Which rights-holder groups should the Jiru Amba plan examine more carefully?</p>
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
                        <span>{group.plainDescription}</span>
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
                    placeholder="Example: older people, caregivers, people far from services"
                    aria-describedby={`${screen.id}-custom-helper ${customInvalid ? `${screen.id}-custom-error` : ''}`}
                    aria-invalid={customInvalid}
                    onInput={(event) => setCustomGroupLabel(event.currentTarget.value)}
                    onChange={(event) => setCustomGroupLabel(event.target.value)}
                  />
                  <small id={`${screen.id}-custom-helper`}>
                    Use a general label only. Do not enter names, complaints, exact locations, or sensitive details.
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
                    Select 3 to 5 rights-holder groups from the Jiru Amba case. Your map will
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
                    <p>Choose the barriers that most change the design. You do not need to select everything.</p>
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
                              <em>{barrier.relatedReference}</em>
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
              onClick={submitMap}
            >
              {submittedOutput ? 'Update draft map' : 'Generate draft map'}
            </button>
            <p aria-live="polite">
              {formChanged ? 'Update your draft map before continuing so the saved output matches your latest choices.' : submitHelper}
            </p>
          </div>
        </section>

        {submittedOutput && (
          <section className="m3-rights-map-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>
              Draft rights-holder and barrier map from your selections
            </h2>
            <p>
              Based on your selections from the Jiru Amba case, this draft map shows which rights-holder
              groups may face which barriers. It is a learning output, not a final assessment. In real
              project work, verify safely with appropriate, non-identifying evidence.
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
                        <span key={category} role="cell">{count > 0 ? `✓ ${count}` : '—'}</span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </section>

            <div className="m3-rights-map-generated-card-grid">
              {generatedRows.map((row) => (
                <article key={row.groupId} className="m3-rights-map-generated-card">
                  <h3>{row.groupLabel}</h3>
                  <div>
                    <span>Priority barriers</span>
                    <p>{row.barrierLabels.join(', ')}</p>
                  </div>
                  <div>
                    <span>What the design should enable</span>
                    <p>{row.designEnablement}</p>
                  </div>
                  <div>
                    <span>Design question</span>
                    <p>{row.designQuestion}</p>
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
                  overlap, the project may need more than a general invitation.
                </p>
                <p>Groups with overlapping barriers: {submittedOverlapLabels.join(', ')}</p>
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

            {visibleWarnings.length > 0 && (
              <section className="m3-rights-map-warning-section" aria-labelledby={`${screen.id}-warnings`}>
                <h3 id={`${screen.id}-warnings`}>What to check next</h3>
                <div className="m3-rights-map-warning-grid">
                  {visibleWarnings.map((warning) => (
                    <p key={warning} className="m3-rights-map-warning">
                      <span aria-hidden="true">!</span>
                      {warning}
                    </p>
                  ))}
                </div>
                {hiddenWarningCount > 0 && (
                  <p className="m3-rights-map-warning-note">
                    Also review the remaining gaps before applying this approach in real project design.
                  </p>
                )}
              </section>
            )}
          </section>
        )}

        {submittedOutput && (
          <section
            className={`m3-rights-map-feedback m3-rights-map-feedback--${feedbackLevel || 'too_broad'}`}
            aria-live="polite"
            aria-labelledby={`${screen.id}-feedback`}
          >
            <h2 id={`${screen.id}-feedback`}>Feedback</h2>
            <p>{feedbackCopy}</p>
          </section>
        )}

        {submittedOutput && (
          <section className="m3-rights-map-carry-forward" aria-labelledby={`${screen.id}-carry`}>
            <h2 id={`${screen.id}-carry`}>Case-study learning to carry forward</h2>
            <div className="m3-rights-map-carry-grid">
              <div>
                <span>Learning from the Jiru Amba case</span>
                <p>
                  The plan should not treat “the community” as one group. It should identify which
                  rights-holder groups may face which barriers and what the design should enable
                  for participation, access, information, safety, livelihood benefit, and follow-up.
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
                <p>Use this case-study map on the next screen to identify duty-bearers, supporting actors, and the CSO role.</p>
              </div>
            </div>
            <div className="m3-rights-map-reflection">
              <h3>Apply the idea to your own CSO context</h3>
              <p>
                Think of one project where you use a broad label such as “the community,” “women,”
                “youth,” or “beneficiaries.” Which specific groups might need to be examined more
                carefully? Keep your reflection general. Do not enter names, complaints, exact
                locations, or sensitive details.
              </p>
            </div>
          </section>
        )}

        <div className="m3-rights-map-actions">
          {!submittedOutput && (
            <p className="m3-rights-map-continue-note">Generate a valid draft map before saving this screen.</p>
          )}
          {formChanged && (
            <p className="m3-rights-map-continue-note">Your choices changed. Select “Update draft map” before continuing.</p>
          )}
          <PrimaryButton
            disabled={!canContinue}
            onClick={() => {
              if (!submittedOutput) return;
              onComplete({
                ...submittedOutput,
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
  const [submittedOutput, setSubmittedOutput] = useState<Screen8Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [showHeroImage, setShowHeroImage] = useState(true);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const taskId = `${screen.id}-task`;
  const customValidation = validateGeneralActorLabel(customActorLabel);
  const allActors = getAllScreen8Actors(customActors);
  const hasUnsafeLabel = Boolean(customActorLabel.trim() && !customValidation.isValid);
  const feedbackDraft = deriveScreen8Feedback(selectedBarrierIds, mappings, hasUnsafeLabel);
  const hasSelectedBarrier = selectedBarrierIds.length > 0;
  const canSubmit = hasSelectedBarrier;
  const currentSignature = JSON.stringify({
    selectedBarrierIds,
    mappings: selectedBarrierIds.map((barrierId) => [barrierId, getScreen8Mapping(mappings, barrierId)]),
    customActors,
    optionalReflection,
  });
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const canContinue = Boolean(submittedOutput && !formChanged && submittedOutput.hasPublicResponsibility);
  const submitHelper =
    selectedBarrierIds.length === 0
      ? 'Select one or two priority barriers to begin.'
      : submittedOutput && !submittedOutput.hasPublicResponsibility
        ? submittedOutput.overloadWarning
          ? 'The CSO role is visible, but public responsibility is still missing.'
          : 'Add at least one actor with public responsibility before continuing.'
        : formChanged
          ? 'Update your responsibility map before continuing.'
          : submittedOutput
            ? 'Your responsibility map is ready to save.'
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

  const toggleActor = (barrierId: Screen8BarrierId, lane: 'public' | 'service' | 'voice' | 'cso', actorId: string) => {
    const laneKey =
      lane === 'public'
        ? 'publicActorIds'
        : lane === 'service'
          ? 'serviceActorIds'
          : lane === 'voice'
            ? 'voiceActorIds'
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
        'The Jiru Amba design should separate public responsibility, supporting actors, rights-holder voice, and CSO roles so barriers are not treated as activities for the CSO alone.',
      exportedActorsForScreen9,
      ...(optionalReflection.trim() ? { optionalReflection: optionalReflection.trim().slice(0, 220) } : {}),
      carryForward: {
        snapshotField: 'dutyBearersAndActors',
        issue: 'The design should show who has responsibility to act, who can support, and what the CSO can realistically do without replacing duty-bearers.',
        nextUse: 'Use these actors in the power and influence analysis on the next screen.',
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

  const renderActorLane = (
    barrierId: Screen8BarrierId,
    title: string,
    explanation: string,
    lane: 'public' | 'service' | 'voice' | 'cso',
    actors: Screen8ActorOption[],
  ) => {
    const mapping = getScreen8Mapping(mappings, barrierId);
    const selectedIds =
      lane === 'public'
        ? mapping.publicActorIds
        : lane === 'service'
          ? mapping.serviceActorIds
          : lane === 'voice'
            ? mapping.voiceActorIds
            : mapping.csoRoleIds;

    return (
      <section className="m3-responsibility-map-lane" aria-labelledby={`${screen.id}-${barrierId}-${lane}`}>
        <h4 id={`${screen.id}-${barrierId}-${lane}`}>{title}</h4>
        <p>{explanation}</p>
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

  return (
    <main className="m3-screen m3-responsibility-map-screen" aria-labelledby={titleId}>
      <article className="m3-responsibility-map-shell">
        <header className="m3-responsibility-map-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-responsibility-map-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <section className="m3-responsibility-map-concept" aria-labelledby={`${screen.id}-meaning`}>
            <h2 id={`${screen.id}-meaning`}>What this means</h2>
            <p>
              A responsibility map helps a CSO connect a barrier to the actors around it. It asks
              who has public responsibility, who can support rights-holder voice and access, and
              what the CSO can realistically do without replacing duty-bearers.
            </p>
            <p>
              In this activity, you will practice this using the Jiru Amba case study. The aim is
              not to make a final institutional assessment. The aim is to create a draft map that
              helps the project team ask clearer responsibility and follow-up questions before
              implementation.
            </p>
            <div className="m3-responsibility-map-concept-chips">
              {[
                'Who has responsibility?',
                'Who can support access and voice?',
                'What can the CSO realistically do?',
                'What capacity gap may need attention?',
              ].map((chip) => <span key={chip}>{chip}</span>)}
            </div>
          </section>
        </header>

        <section className="m3-responsibility-map-orientation" aria-label="Responsibility mapping orientation">
          <section className="m3-responsibility-map-card" aria-labelledby={`${screen.id}-purpose`}>
            <h2 id={`${screen.id}-purpose`}>Purpose of this activity</h2>
            <p>
              The purpose of this activity is to practice moving from “the CSO will do activities”
              to “the design shows who must act, who can support, and how the CSO can help safely.”
            </p>
            <p>
              A rights-based design does not make the CSO responsible for everything. It shows
              public responsibility, supporting roles, rights-holder voice, and realistic CSO action.
            </p>
          </section>

          <section className="m3-responsibility-map-card" aria-labelledby={`${screen.id}-example`}>
            <h2 id={`${screen.id}-example`}>Worked example</h2>
            <p>Here is how one barrier can become a clearer responsibility question.</p>
            <div className="m3-responsibility-map-example">
              {[
                ['Barrier from Screen 7', 'Women who rely on water services may have limited influence over water-service priorities.'],
                ['Public responsibility', 'Woreda water or service office — enable meaningful participation and explain decisions.'],
                ['Supporting actors', 'Women’s group, local service committee, kebele representatives.'],
                ['CSO role', 'Convene safely, support evidence use, and track whether response reached the group.'],
                ['Capacity-gap hint', 'Weak follow-up or limited participation process.'],
                ['Next question', 'Who must respond if priorities change, and how will people know what changed?'],
              ].map(([label, text]) => (
                <div key={label}>
                  <span>{label}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="m3-responsibility-map-safe-note" aria-labelledby={`${screen.id}-safe`}>
            <h2 id={`${screen.id}-safe`}>Safe actor-analysis note</h2>
            <p>
              Use general actor roles only. Do not enter real names, accusations, complaints,
              exact locations, or sensitive details. This tool is for safe design practice, not
              public accusation.
            </p>
          </section>
        </section>

        <section className="m3-responsibility-map-builder-section" aria-labelledby={taskId}>
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

            {!hasSelectedBarrier ? (
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
                        <p>Choose at least one public responsibility actor. Then add supporting actors, CSO role, and one capacity-gap hint.</p>
                        {renderActorLane(
                          barrierId,
                          'Public responsibility',
                          'Actors with formal or public responsibility to act, coordinate, resource, respond, or improve services.',
                          'public',
                          [...screen8ActorsByLane.public, ...customActorsForLane.filter((actor) => actor.category === 'primary_public_responsibility')],
                        )}
                        {mapping.publicActorIds.length > 0 && (
                          <>
                            {renderActorLane(
                              barrierId,
                              'Service or local implementation actor',
                              'Actors involved in delivery, access, coordination, venue management, information sharing, or follow-up.',
                              'service',
                              [...screen8ActorsByLane.service, ...customActorsForLane.filter((actor) => actor.category === 'service_or_local_implementation')],
                            )}
                            {renderActorLane(
                              barrierId,
                              'Rights-holder voice or supporting actor',
                              'Actors who can help make lived experience, exclusion, accessibility, or follow-up issues visible.',
                              'voice',
                              [...screen8ActorsByLane.voice, ...customActorsForLane.filter((actor) => actor.category === 'rights_holder_voice_support')],
                            )}
                            {renderActorLane(
                              barrierId,
                              'CSO role',
                              'What the CSO can realistically do without replacing public responsibility.',
                              'cso',
                              [...screen8ActorsByLane.cso, ...customActorsForLane.filter((actor) => actor.category === 'cso_role')],
                            )}
                          </>
                        )}
                        {mapping.csoRoleIds.length > 0 && (
                          <section className="m3-responsibility-map-lane" aria-labelledby={`${screen.id}-${barrierId}-capacity`}>
                            <h4 id={`${screen.id}-${barrierId}-capacity`}>What might explain weak response to this barrier?</h4>
                            <p>Choose one likely capacity-gap hint to examine later.</p>
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
                        )}
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
                        <option value="rights_holder_voice_support">Rights-holder voice or supporting actor</option>
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

                <aside className="m3-responsibility-map-panel m3-responsibility-map-preview" aria-labelledby={`${screen.id}-preview`}>
                  <h3 id={`${screen.id}-preview`}>Responsibility map preview</h3>
                  {selectedBarrierIds.map((barrierId) => {
                    const mapping = getScreen8Mapping(mappings, barrierId);
                    return (
                      <article key={barrierId} className="m3-responsibility-map-preview-card">
                        <h4>Barrier: {getBarrierLabel(barrierId)}</h4>
                        <p><strong>Public responsibility:</strong> {mapping.publicActorIds.length ? mapping.publicActorIds.map((id) => getActorLabel(id, allActors)).join(', ') : 'No public responsibility actor yet'}</p>
                        <p><strong>Supporting actors:</strong> {[...mapping.serviceActorIds, ...mapping.voiceActorIds].length ? [...mapping.serviceActorIds, ...mapping.voiceActorIds].map((id) => getActorLabel(id, allActors)).join(', ') : 'No supporting actor yet'}</p>
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
            <button type="button" className="m3-responsibility-map-submit-button" disabled={!canSubmit} onClick={submitMap}>
              {submittedOutput ? 'Update responsibility map' : 'Generate my responsibility map'}
            </button>
            <p aria-live="polite">{submitHelper}</p>
          </div>
        </section>

        {submittedOutput && (
          <section className="m3-responsibility-map-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Draft responsibility map from your selections</h2>
            <p>
              Based on your selections from the Jiru Amba case, this draft map suggests who may
              have responsibility, who can support, and what the CSO can realistically do. It is a
              learning output, not a final institutional assessment. In real project work, verify
              roles safely and avoid names, accusations, complaints, exact locations, or sensitive details.
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
                    <span className="m3-responsibility-map-lane-badge">Barrier</span>
                    <h3>{row.barrierLabel}</h3>
                    <p>Priority barrier selected from the Jiru Amba practice map.</p>
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane m3-responsibility-map-swimlane-lane--public">
                    <span className="m3-responsibility-map-lane-badge">Public responsibility</span>
                    {renderResponsibilityLaneItems(
                      getSubmittedSelections(row, ['primary_public_responsibility']),
                      'No public responsibility actor yet',
                    )}
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane m3-responsibility-map-swimlane-lane--service">
                    <span className="m3-responsibility-map-lane-badge">Service / supporting actor</span>
                    {renderResponsibilityLaneItems(
                      getSubmittedSelections(row, ['service_or_local_implementation']),
                      'No service or supporting actor yet',
                    )}
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane m3-responsibility-map-swimlane-lane--voice">
                    <span className="m3-responsibility-map-lane-badge">Rights-holder voice</span>
                    {renderResponsibilityLaneItems(
                      getSubmittedSelections(row, ['rights_holder_voice_support']),
                      'No rights-holder voice actor yet',
                    )}
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane m3-responsibility-map-swimlane-lane--cso">
                    <span className="m3-responsibility-map-lane-badge">CSO role</span>
                    {renderResponsibilityLaneItems(
                      getSubmittedSelections(row, ['cso_role']),
                      'No CSO role yet',
                    )}
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane m3-responsibility-map-swimlane-lane--capacity">
                    <span className="m3-responsibility-map-lane-badge">Capacity-gap hint</span>
                    <p>{row.capacityGapHints.map(getCapacityGapLabel).join(', ') || 'Capacity-gap hint missing'}</p>
                  </section>
                  <section className="m3-responsibility-map-swimlane-lane m3-responsibility-map-swimlane-lane--question">
                    <span className="m3-responsibility-map-lane-badge">Question for Screen 9</span>
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

        {submittedOutput && (
          <section className={`m3-responsibility-map-feedback m3-responsibility-map-feedback--${submittedOutput.feedbackLevel}`} aria-live="polite">
            <h2>Feedback and warnings</h2>
            <p>{feedbackCopy}</p>
          </section>
        )}

        {submittedOutput && (
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

        {submittedOutput && (
          <section className="m3-responsibility-map-carry-forward">
            <h2>Case-study learning to carry forward</h2>
            <div className="m3-responsibility-map-carry-grid">
              <div><span>Snapshot field</span><p>Duty-bearers and actor roles</p></div>
              <div><span>Issue</span><p>The design should show who has responsibility to act, who can support, and what the CSO can realistically do without replacing duty-bearers.</p></div>
              <div><span>Use on the next screen</span><p>Use these actors in the power and influence analysis to check who can shape decisions, who already influences the plan, and whose voice needs stronger influence.</p></div>
            </div>
          </section>
        )}

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
                module3: { screen8: submittedOutput },
                screen8: submittedOutput,
              });
            }}
          >
            {screen.continueLabel}
          </PrimaryButton>
        </div>
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
  const [optionalReflection, setOptionalReflection] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen9Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [showHeroImage, setShowHeroImage] = useState(true);
  const [showGridVisual, setShowGridVisual] = useState(true);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const taskId = `${screen.id}-task`;
  const customValidation = validateGeneralActorLabel(customActorLabel);
  const hasUnsafeLabel = Boolean(customActorLabel.trim() && !customValidation.isValid);
  const selectedActors = selectedActorIds
    .map((actorId) => actorOptions.find((actor) => actor.actorId === actorId))
    .filter(Boolean) as Module3Actor[];
  const selectedRatings = selectedActorIds.flatMap((actorId) => actorRatings[actorId] ? [actorRatings[actorId]] : []);
  const allRatingsComplete = selectedActorIds.length > 0 && selectedRatings.length === selectedActorIds.length && selectedRatings.every(isScreen9RatingComplete);
  const hasPublicResponsibilityActor = selectedActors.some(
    (actor) => actor.category === 'primary_public_responsibility',
  );
  const hasRightsHolderVoiceOrGroup = selectedActors.some(
    (actor) => actor.category === 'rights_holder_voice_support' || actor.category === 'rights_holder_group',
  );
  const hasCsoOrSupportActor = selectedActors.some(
    (actor) => actor.category === 'cso_role' || actor.category === 'service_or_local_implementation',
  );
  const hasRequiredActorMix = hasPublicResponsibilityActor && hasRightsHolderVoiceOrGroup && hasCsoOrSupportActor;
  const missingActorMixMessages = [
    !hasPublicResponsibilityActor ? 'Add at least one public responsibility actor.' : '',
    !hasRightsHolderVoiceOrGroup ? 'Add at least one rights-holder voice or rights-holder group.' : '',
    !hasCsoOrSupportActor ? 'Add at least one CSO or supporting actor role.' : '',
  ].filter(Boolean);
  const hasBlockingSubmitGap =
    selectedActorIds.length < 4 ||
    selectedActorIds.length > 7 ||
    !hasRequiredActorMix ||
    !allRatingsComplete ||
    hasUnsafeLabel;
  const canSubmit = !hasBlockingSubmitGap;
  const currentSignature = JSON.stringify({
    selectedActorIds,
    actorRatings: selectedActorIds.map((actorId) => actorRatings[actorId]),
    customActorCategory,
    optionalReflection,
  });
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const canShowSubmittedOutput = Boolean(
    submittedOutput &&
      selectedActorIds.length >= 4 &&
      selectedActorIds.length <= 7 &&
      allRatingsComplete &&
      hasRequiredActorMix &&
      !hasUnsafeLabel,
  );
  const selectedCountLabel =
    selectedActorIds.length === 1 ? '1 actor selected' : `${selectedActorIds.length} actors selected`;
  const submitMessages =
    selectedActorIds.length < 4
      ? ['Select at least 4 actors for a useful power and influence map.']
      : selectedActorIds.length > 7
        ? ['Keep this practice map to 4 to 7 actors.']
        : hasUnsafeLabel
          ? ['Use a general actor role only before generating your map.']
          : missingActorMixMessages.length > 0
            ? missingActorMixMessages
            : !allRatingsComplete
              ? ['Complete the ratings for each selected actor before generating the map.']
              : formChanged
                ? ['Update your power and influence map before continuing.']
                : submittedOutput
                  ? ['Ready to generate your draft power and influence map.']
                  : ['Ready to generate your draft power and influence map.'];

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
      if (current.length >= 7) return current;
      setActorRatings((ratings) => ({
        ...ratings,
        [actor.actorId]: ratings[actor.actorId] || createEmptyActorRating(actor),
      }));
      return [...current, actor.actorId];
    });
  };

  const updateRating = (actorId: string, field: keyof Screen9ActorRating, value: string) => {
    setActorRatings((current) => {
      const actor = actorOptions.find((item) => item.actorId === actorId);
      if (!actor) return current;
      return {
        ...current,
        [actorId]: {
          ...(current[actorId] || createEmptyActorRating(actor)),
          [field]: value,
        },
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
    const generatedPowerMapZones = generatePowerMapZones(selectedRatings);
    const feedback = deriveScreen9Feedback(selectedRatings, hasUnsafeLabel);

    return {
      screenId: 'M3-R09',
      submitted: true,
      selectedActorIds,
      actorRatings: selectedRatings,
      generatedPowerMapZones,
      detectedInsights: feedback.detectedInsights,
      feedbackLevel: feedback.feedbackLevel,
      warnings: feedback.warnings,
      powerMapSummary:
        'The Jiru Amba design should check who can shape decisions, who already influences the plan, and whose lived knowledge needs stronger influence before activities are finalized.',
      ...(optionalReflection.trim() ? { optionalReflection: optionalReflection.trim().slice(0, 220) } : {}),
      carryForward: {
        snapshotField: 'powerInfluenceAndCapacityGaps',
        issue: 'The design should check decision power, current influence, lived knowledge, and possible voice gaps before finalizing activities.',
        nextUse: 'Use these power and influence patterns in the root-cause and capacity-gap analysis on the next screen.',
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

  const renderRatingControl = (
    actorId: string,
    legend: string,
    helper: string,
    field: 'powerToShapeDecisions' | 'currentInfluence' | 'livedKnowledge',
  ) => {
    const rating = actorRatings[actorId];
    const actor = actorOptions.find((item) => item.actorId === actorId);
    const suggestedRating = actor ? getDefaultActorRating(actor) : null;
    return (
      <fieldset className="m3-power-map-rating-field">
        <legend>{legend}</legend>
        <p>{helper}</p>
        <div className="m3-power-map-rating-options">
          {ratingOptions.map((option) => (
            <label key={option} className={rating?.[field] === option ? 'is-selected' : ''}>
              <input
                type="radio"
                name={`${screen.id}-${actorId}-${field}`}
                value={option}
                checked={rating?.[field] === option}
                onChange={() => updateRating(actorId, field, option)}
                />
                <span>{option}{suggestedRating?.[field] === option ? ' · Suggested' : ''}</span>
              </label>
            ))}
        </div>
      </fieldset>
    );
  };

  const zones = generatePowerMapZones(selectedRatings.filter(isScreen9RatingComplete));
  const outputZones = submittedOutput?.generatedPowerMapZones || zones;
  const submittedRatings = submittedOutput?.actorRatings || selectedRatings;
  const submittedRatingById = Object.fromEntries(submittedRatings.map((rating) => [rating.actorId, rating]));
  const feedbackLevel = submittedOutput?.feedbackLevel;
  const insightCopy = feedbackLevel === 'strong'
    ? 'Your selections show responsibility, influence, and lived knowledge in different places. This helps the Jiru Amba design plan realistic engagement, strengthen voice safely, and carry capacity-gap questions into the next screen.'
    : feedbackLevel === 'voice_gap'
      ? 'Your selections suggest a voice gap. Some groups may have strong lived knowledge of the barriers but lower current influence in the plan. The design should create safer ways for their priorities to shape decisions.'
      : feedbackLevel === 'responsibility_gap'
        ? 'Your selections suggest a responsibility gap. Some actors may have public responsibility but lower current engagement. The design should show how those actors will be brought into follow-up, response, or service improvement.'
        : feedbackLevel === 'power_concentration'
          ? 'Your selections suggest that influence may be concentrated among a few actors. The design should check whether this limits the voice of groups most affected by barriers.'
          : feedbackLevel === 'unsafe_label'
            ? 'Some actor labels may be too specific or sensitive. Use broad role labels only and avoid names, accusations, complaints, exact locations, or identifying details.'
            : 'Your map includes mixed signals. Focus on the actors whose power, influence, responsibility, or lived knowledge should change the design.';

  const renderActorCard = (rating: Screen9ActorRating) => (
    <article key={rating.actorId} className={`m3-power-map-actor-card m3-power-map-actor-card--${rating.category}`}>
      <h4>{rating.actorLabel}</h4>
      <div className="m3-power-map-actor-badges">
        <span className={`m3-power-map-badge m3-power-map-badge--${rating.category}`}>{actorCategoryLabels[rating.category]}</span>
        <span className={`m3-power-map-badge m3-power-map-badge--role-${rating.likelyChangeRole || 'unrated'}`}>
          {likelyRoleOptions.find((role) => role.id === rating.likelyChangeRole)?.label || 'Likely role not rated'}
        </span>
      </div>
      <p><strong>Power to shape decisions:</strong> {rating.powerToShapeDecisions || 'Not rated'}</p>
      <p><strong>Current influence in the plan:</strong> {rating.currentInfluence || 'Not rated'}</p>
      <p><strong>Lived knowledge:</strong> {rating.livedKnowledge || 'Not rated'}</p>
      <p><strong>Engagement question:</strong> {getEngagementQuestion(rating.likelyChangeRole)}</p>
    </article>
  );

  return (
    <main className="m3-screen m3-power-map-screen" aria-labelledby={titleId}>
      <article className="m3-power-map-shell">
        <header className="m3-power-map-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-power-map-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <section className="m3-power-map-concept" aria-labelledby={`${screen.id}-meaning`}>
            <h2 id={`${screen.id}-meaning`}>What this means</h2>
            <p>
              A power and influence map helps a CSO see who can shape decisions, who already
              influences the plan, who has lived knowledge of the barriers, and whose voice needs
              stronger and safer influence.
            </p>
            <p>
              In this activity, you will practice this using the Jiru Amba case study. The aim is
              not to label people as good or bad. The aim is to create a draft map that helps the
              project team plan safer participation, realistic engagement, and clearer accountability.
            </p>
            <div className="m3-power-map-concept-chips">
              {[
                'Who can shape decisions?',
                'Who already influences the plan?',
                'Who has lived knowledge?',
                'Whose voice needs stronger influence?',
              ].map((chip) => <span key={chip}>{chip}</span>)}
            </div>
          </section>
        </header>

        <section className="m3-power-map-orientation" aria-label="Power and influence orientation">
          <section className="m3-power-map-card" aria-labelledby={`${screen.id}-purpose`}>
            <h2 id={`${screen.id}-purpose`}>Purpose of this activity</h2>
            <p>
              The purpose of this activity is to practice reading the actor environment before
              finalizing activities. A stakeholder list is not enough. A rights-based design checks
              power, influence, lived knowledge, and voice gaps so participation and accountability
              can be planned more safely.
            </p>
          </section>

          <section className="m3-power-map-card" aria-labelledby={`${screen.id}-example`}>
            <h2 id={`${screen.id}-example`}>Worked example</h2>
            <p>Here is how responsibility and influence can differ.</p>
            <div className="m3-power-map-example">
              {[
                ['Actor', 'Woreda water or service office'],
                ['Responsibility', 'Public responsibility for service priorities and follow-up.'],
                ['Power to shape decisions', 'Higher'],
                ['Current influence in the plan', 'Medium'],
                ['Lived knowledge', 'Lower'],
                ['Design meaning', 'Engage this actor for response and follow-up, but also strengthen the voice of women who rely on water services.'],
              ].map(([label, text]) => (
                <div key={label}>
                  <span>{label}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="m3-power-map-safe-note" aria-labelledby={`${screen.id}-safe`}>
            <h2 id={`${screen.id}-safe`}>Safe power-analysis note</h2>
            <p>
              Use general actor roles only. Do not enter real names, accusations, complaints,
              exact locations, or sensitive details. This tool is for safe design practice, not
              public accusation.
            </p>
          </section>
        </section>

        <section className="m3-power-map-builder-section" aria-labelledby={taskId}>
          <div className="m3-power-map-task-header">
            <div>
              <p className="m3-power-map-kicker">Stakeholder Power and Capacity Grid</p>
              <h2 id={taskId}>Practice a power and influence map using the Jiru Amba case</h2>
              <p>
                Select 4 to 7 actors from your responsibility map or from the Jiru Amba actor list.
                Then rate each actor by power to shape decisions, current influence in the planning
                process, lived knowledge of the barrier, and likely change role.
              </p>
              <p>Choose a mixed set of actors. Include at least one public responsibility actor, one rights-holder voice or supporting actor, and one CSO role.</p>
            </div>
            <span className="m3-power-map-count" aria-live="polite">
              {selectedActorIds.length === 0 ? '0 actors selected' : selectedCountLabel}
            </span>
          </div>
          <p className="m3-power-map-helper" aria-live="polite">
            {selectedActorIds.length < 4 ? 'Select at least 4 actors for a useful map.' : 'Good range for this practice map.'}
          </p>

          <section className={`m3-power-map-builder ${selectedActorIds.length > 0 ? 'm3-power-map-builder--active' : 'm3-power-map-builder--empty'}`}>
            <section className="m3-power-map-panel m3-power-map-actor-panel" aria-labelledby={`${screen.id}-actors`}>
              <h3 id={`${screen.id}-actors`}>Select 4–7 actors</h3>
              <p>Select actors from the Jiru Amba case. Your ratings will appear after selection.</p>
              <div className="m3-power-map-actor-list" role="group" aria-labelledby={`${screen.id}-actors`}>
                {actorOptions.map((actor) => {
                  const selected = selectedActorIds.includes(actor.actorId);
                  const disabled = !selected && selectedActorIds.length >= 7;
                  return (
                    <button
                      key={actor.actorId}
                      type="button"
                      className={`m3-power-map-actor-option ${selected ? 'is-selected' : ''}`}
                      aria-pressed={selected}
                      disabled={disabled}
                      onClick={() => toggleActor(actor)}
                    >
                      <span aria-hidden="true">{selected ? '✓' : '+'}</span>
                      <span>
                        <strong>{actor.label}</strong>
                        <small>{actorCategoryLabels[actor.category]}</small>
                        {selected && <em>Selected actor</em>}
                      </span>
                    </button>
                  );
                })}
              </div>
              <section className="m3-power-map-custom" aria-labelledby={`${screen.id}-custom-actor`}>
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
                    {screen9CustomActorCategoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>
                <p id={`${screen.id}-custom-help`}>
                  Use only a broad role. Do not enter names, complaints, exact locations,
                  or identifying details.
                </p>
                {hasUnsafeLabel && <p className="m3-power-map-error">{customValidation.error}</p>}
                <button type="button" className="m3-power-map-submit-button" onClick={addCustomActor} disabled={!customValidation.isValid}>
                  Add generalized actor role
                </button>
              </section>
            </section>

            {selectedActorIds.length === 0 ? (
              <section className="m3-power-map-empty-hero" aria-label="Power map orientation">
                {showHeroImage && (
                  <img
                    src={module3ActorAnalysisAssets.screen9Hero.src}
                    alt={module3ActorAnalysisAssets.screen9Hero.alt}
                    onError={() => setShowHeroImage(false)}
                  />
                )}
                <div className="m3-power-map-empty-card">
                  <p className="m3-power-map-kicker">Power and influence</p>
                  <h3>Map influence before finalizing activities</h3>
                  <p>
                    Some actors have responsibility. Some have influence. Some have lived knowledge
                    but less voice. Select 4 to 7 actors from the Jiru Amba case. Your draft power
                    and influence map will appear here.
                  </p>
                  <div className="m3-power-map-mini-matrix" aria-label="Power and influence mini matrix">
                    <span>High power / high influence</span>
                    <span>High power / lower current influence</span>
                    <span>Lower power / high lived knowledge</span>
                    <span>Lower power / lower influence</span>
                  </div>
                  {showGridVisual && (
                    <img
                      className="m3-power-map-grid-support"
                      src={module3ActorAnalysisAssets.screen9Grid.src}
                      alt={module3ActorAnalysisAssets.screen9Grid.alt}
                      onError={() => setShowGridVisual(false)}
                    />
                  )}
                </div>
              </section>
            ) : (
              <>
                <section className="m3-power-map-panel m3-power-map-rating-panel" aria-label="Actor rating cards">
                  {selectedActorIds.map((actorId) => {
                    const actor = actorOptions.find((item) => item.actorId === actorId);
                    const rating = actorRatings[actorId];
                    if (!actor || !rating) return null;
                    const suggestedRating = getDefaultActorRating(actor);
                    const ratingComplete = isScreen9RatingComplete(rating);
                    return (
                      <article key={actorId} className="m3-power-map-rating-card">
                        <h3>{actor.label}</h3>
                        <span className={`m3-power-map-badge m3-power-map-badge--${actor.category}`}>
                          {actorCategoryLabels[actor.category]}
                        </span>
                        {renderRatingControl(
                          actorId,
                          'Power to shape decisions',
                          'Can this actor approve, resource, delay, coordinate, or change decisions?',
                          'powerToShapeDecisions',
                        )}
                        {renderRatingControl(
                          actorId,
                          'Current influence in the plan',
                          'Is this actor already being heard or shaping the plan now?',
                          'currentInfluence',
                        )}
                        {renderRatingControl(
                          actorId,
                          'Lived knowledge of the barrier',
                          'Does this actor directly understand the barrier from lived experience or close daily contact?',
                          'livedKnowledge',
                        )}
                        <fieldset className="m3-power-map-rating-field">
                          <legend>Likely change role</legend>
                          <p>How might this actor affect the design change?</p>
                          <div className="m3-power-map-role-options">
                            {likelyRoleOptions.map((role) => (
                              <label key={role.id} className={rating.likelyChangeRole === role.id ? 'is-selected' : ''}>
                                <input
                                  type="radio"
                                  name={`${screen.id}-${actorId}-role`}
                                  value={role.id}
                                  checked={rating.likelyChangeRole === role.id}
                                  onChange={() => updateRating(actorId, 'likelyChangeRole', role.id)}
                                />
                                <span>{role.label}{suggestedRating.likelyChangeRole === role.id ? ' · Suggested' : ''}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                        <section className="m3-power-map-current-meaning" aria-label={`Current map meaning for ${actor.label}`}>
                          {ratingComplete ? (
                            <>
                              <h4>Current map meaning</h4>
                              <p><strong>Selected zone:</strong> {powerMapZoneLabels[getPowerMapZone(rating)]}</p>
                              <p><strong>Engagement question:</strong> {getEngagementQuestion(rating.likelyChangeRole)}</p>
                            </>
                          ) : (
                            <>
                              <h4>Ratings needed</h4>
                              <p>Choose ratings for this actor. Suggested options are guidance only.</p>
                            </>
                          )}
                        </section>
                      </article>
                    );
                  })}
                </section>

                <aside className="m3-power-map-panel m3-power-map-preview" aria-labelledby={`${screen.id}-preview`}>
                  <h3 id={`${screen.id}-preview`}>Power and influence preview</h3>
                  <p>Power to shape decisions is horizontal. Current influence in the planning process is vertical.</p>
                  <div className="m3-power-map-preview-matrix">
                    {zones.map((zone) => (
                      <section key={zone.zoneId} className={`m3-power-map-zone m3-power-map-zone--${zone.zoneId}`}>
                        <h4>{zone.zoneLabel}</h4>
                        {zone.actorIds.length > 0 ? (
                          zone.actorIds.map((actorId) => {
                            const rating = actorRatings[actorId];
                            return rating ? <span key={actorId}>{rating.actorLabel}</span> : null;
                          })
                        ) : (
                          <p>No actors yet</p>
                        )}
                      </section>
                    ))}
                  </div>
                </aside>
              </>
            )}
          </section>

          <div className="m3-power-map-submit-row">
            <button type="button" className="m3-power-map-submit-button" disabled={!canSubmit} onClick={submitMap}>
              {submittedOutput ? 'Update power and influence map' : 'Generate my power and influence map'}
            </button>
            <div className="m3-power-map-submit-messages" aria-live="polite">
              {submitMessages.map((message) => <p key={message}>{message}</p>)}
            </div>
          </div>
        </section>

        {canShowSubmittedOutput && submittedOutput && (
          <section className="m3-power-map-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Draft power and influence map from your selections</h2>
            <p>
              Based on your selections from the Jiru Amba case, this draft map suggests who may
              shape decisions, who currently influences the plan, and whose lived knowledge may
              need stronger voice. It is a learning output, not a final political or institutional
              analysis. In real project work, verify safely and avoid names, accusations,
                complaints, exact locations, or sensitive details.
            </p>
            <div className="m3-power-map-axis-note" aria-hidden="true">
              <span>Power to shape decisions: lower to higher</span>
              <span>Current influence in the plan: lower to higher</span>
            </div>
            <div className="m3-power-map-generated-matrix" aria-label="Generated power and influence map">
              {outputZones.map((zone) => (
                <section key={zone.zoneId} className={`m3-power-map-zone m3-power-map-zone--${zone.zoneId}`}>
                  <h3>{zone.zoneLabel}</h3>
                  <p>{powerMapZoneInterpretations[zone.zoneId]}</p>
                  {zone.actorIds.length > 0 ? (
                    zone.actorIds.map((actorId) => {
                      const rating = submittedRatingById[actorId];
                      return rating ? renderActorCard(rating) : null;
                    })
                  ) : (
                    <p>No actors in this zone.</p>
                  )}
                </section>
              ))}
            </div>
            <div className="m3-power-map-generated-stack">
              {['shape_decisions_now', 'bring_responsibility_into_design', 'strengthen_voice_safely', 'do_not_leave_out', 'center_band'].map((zoneId) => {
                const zone = outputZones.find((item) => item.zoneId === zoneId);
                const zoneRatings = (zone?.actorIds || []).flatMap((actorId) => submittedRatingById[actorId] ? [submittedRatingById[actorId]] : []);
                return (
                  <section key={zoneId}>
                    <h3>{powerMapZoneLabels[zoneId as Screen9PowerMapZone['zoneId']]}</h3>
                    <p>{powerMapZoneInterpretations[zoneId as Screen9PowerMapZone['zoneId']]}</p>
                    {zoneRatings.length > 0 ? zoneRatings.map(renderActorCard) : <p>No actors in this group.</p>}
                  </section>
                );
              })}
            </div>
            <section className="m3-power-map-insight">
              <h3>What your selections suggest</h3>
              <p>{insightCopy}</p>
            </section>
            {submittedOutput.warnings.length > 0 && (
              <section className="m3-power-map-warning-section">
                <h3>What to check next</h3>
                <div className="m3-power-map-warning-grid">
                  {submittedOutput.warnings.map((warning) => (
                    <p key={warning} className="m3-power-map-warning"><span aria-hidden="true">!</span>{warning}</p>
                  ))}
                </div>
              </section>
            )}
          </section>
        )}

        {canShowSubmittedOutput && submittedOutput && (
          <section className={`m3-power-map-feedback m3-power-map-feedback--${submittedOutput.feedbackLevel}`} aria-live="polite">
            <h2>Feedback and warnings</h2>
            <p>{getScreen9FeedbackCopy(submittedOutput.feedbackLevel)}</p>
          </section>
        )}

        {canShowSubmittedOutput && submittedOutput && (
          <section className="m3-power-map-reflection">
            <h2>Optional reflection for your own CSO context</h2>
            <label>
              <span>Think about your own CSO context. Which type of group often has lived knowledge of a problem but less influence over decisions? Use a general group label only.</span>
              <textarea
                rows={3}
                maxLength={220}
                value={optionalReflection}
                onChange={(event) => setOptionalReflection(event.target.value)}
                placeholder="Example: women traders, youth group, persons with disabilities, remote community members"
              />
            </label>
          </section>
        )}

        {canShowSubmittedOutput && submittedOutput && (
          <section className="m3-power-map-carry-forward">
            <h2>Case-study learning to carry forward</h2>
            <div className="m3-power-map-carry-grid">
              <div><span>Snapshot field</span><p>Power, influence, and capacity-gap hints</p></div>
              <div><span>Issue</span><p>The design should check who can shape decisions, who already influences the plan, and whose lived knowledge needs stronger and safer influence.</p></div>
              <div><span>Use on the next screen</span><p>Use this map in Screen 10 to examine root causes and capacity gaps: weak coordination, unclear mandate, limited resources, low rights-holder voice, accessibility gaps, weak feedback systems, or low trust.</p></div>
            </div>
          </section>
        )}

        <div className="m3-power-map-actions">
          {!submittedOutput && <p className="m3-power-map-continue-note">Generate the power and influence map before saving this screen.</p>}
          {formChanged && <p className="m3-power-map-continue-note">Your choices changed. Select “Update power and influence map” before continuing.</p>}
          <PrimaryButton
            disabled={!canContinue}
            onClick={() => {
              if (!submittedOutput) return;
              onComplete({
                ...submittedOutput,
                module3: { screen9: submittedOutput },
                screen9: submittedOutput,
              });
            }}
          >
            {screen.continueLabel}
          </PrimaryButton>
        </div>
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
  const [optionalReflection, setOptionalReflection] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen11Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [limitMessage, setLimitMessage] = useState('');
  const [showHero, setShowHero] = useState(true);
  const [showScale, setShowScale] = useState(true);
  const [showEmptyDashboard, setShowEmptyDashboard] = useState(true);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const dashboardId = `${screen.id}-dashboard`;
  const classifiedCount = getScreen11ClassifiedCount(classifications);
  const allClassified = classifiedCount === screen11Signals.length;
  const canSubmit = allClassified && selectedRepairs.length === 2;
  const currentSignature = JSON.stringify({ classifications, selectedRepairs, optionalReflection });
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const helperText = getScreen11HelperText(classifications, selectedRepairs, limitMessage);
  const dashboardClassifications = submittedOutput?.classifications;
  const warnings = dashboardClassifications ? getScreen11Warnings(dashboardClassifications) : [];
  const selectedRepairDetails = submittedOutput
    ? screen11Repairs.filter((repair) => submittedOutput.selectedRepairs.includes(repair.id))
    : [];

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
      if (current.length >= 2) {
        setLimitMessage('Keep this focused. Select only two priority repairs for now.');
        return current;
      }
      setLimitMessage('');
      return [...current, repairId];
    });
  };

  const submitDashboard = () => {
    if (!canSubmit) return;
    const submission = buildScreen11Submission(classifications, selectedRepairs, optionalReflection);
    setSubmittedOutput(submission);
    setSubmittedSignature(currentSignature);
    if (typeof window !== 'undefined') {
      window.setTimeout(() => outputRef.current?.focus(), 0);
    }
  };

  const continueWithPayload = () => {
    if (!canContinue || !submittedOutput) return;
    onComplete({
      genderDisabilityDesignCheck: submittedOutput,
      snapshotField: 'genderDisabilityDesignCheck',
    });
  };

  return (
    <main className="m3-screen m3-s11-screen" aria-labelledby={titleId}>
      <article className="m3-s11-shell">
        <header className="m3-s11-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-s11-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Gender and Disability Design Check</h1>
          <p>Check whether gender and disability are missing, only mentioned, or built into the Jiru Amba design.</p>
        </header>

        <section className="m3-s11-hero" aria-labelledby={`${screen.id}-scenario`}>
          <div className="m3-s11-hero-copy">
            <article className="m3-s11-scenario-card">
              <p className="m3-s11-kicker">JIRU AMBA DESIGN REVIEW</p>
              <h2 id={`${screen.id}-scenario`}>The plan mentions inclusion. Now check whether the design changed.</h2>
              <p>The Jiru Amba plan says women, youth, and persons with disabilities will be included. That is a good start, but HRBA asks a deeper design question: did the project change how information is shared, how meetings are organized, how barriers are removed, how budgets are planned, and how feedback is followed up?</p>
              <p className="m3-s11-bridge">Use this screen to check whether gender and disability are missing, only mentioned, or built into the design.</p>
            </article>
            <article className="m3-s11-concept-card" aria-labelledby={`${screen.id}-meaning`}>
              <p className="m3-s11-kicker">WHAT THIS MEANS</p>
              <h2 id={`${screen.id}-meaning`}>Inclusion is stronger when it changes the design.</h2>
              <p>A rights-based design does not stop at naming groups or setting attendance targets. It asks whether different people can access information, participate safely, influence decisions, receive support where needed, benefit from activities, and get a response when something is not working.</p>
              <div className="m3-s11-chip-row">
                {['Who may be affected differently?', 'What gendered barriers exist?', 'What accessibility barriers exist?', 'What must change in the design?'].map((chip) => <span key={chip}>{chip}</span>)}
              </div>
            </article>
          </div>
          <figure className="m3-s11-visual">
            {showHero && <img src={module3Screen11Assets.hero.src} alt={module3Screen11Assets.hero.alt} onError={() => setShowHero(false)} />}
          </figure>
        </section>

        <section className="m3-s11-safe-note" aria-labelledby={`${screen.id}-safe`}>
          <img src={module3Screen11Assets.icons.safety} alt="" aria-hidden="true" />
          <div>
            <h2 id={`${screen.id}-safe`}>Safe practice note</h2>
            <p>Use the Jiru Amba learning case. When applying this tool to your own work, use general group labels only. Do not enter real names, disability details, complaints, exact locations, organizations, officials, or identifying details.</p>
          </div>
        </section>

        <section className="m3-s11-example-card" aria-labelledby={`${screen.id}-example`}>
          <div>
            <p className="m3-s11-kicker">WORKED EXAMPLE</p>
            <h2 id={`${screen.id}-example`}>Mentioned is not the same as built in.</h2>
          </div>
          {showScale && <img className="m3-s11-scale-visual" src={module3Screen11Assets.scale.src} alt={module3Screen11Assets.scale.alt} onError={() => setShowScale(false)} />}
          <div className="m3-s11-example-grid">
            {[
              ['“Women and persons with disabilities will be invited.”', 'Inclusion is mentioned.', 'Check timing, venue, transport, communication, care-work barriers, accessibility, facilitation, budget, and feedback.'],
              ['“At least 40% of participants will be women.”', 'A target is included.', 'Ask whether women influence priorities, budgets, activity design, monitoring, and follow-up.'],
              ['“Persons with disabilities will be encouraged to attend.”', 'Disability is named.', 'Check accessible venues, reasonable accommodation, accessible information, OPD input, transport, safe feedback, and disability-sensitive indicators.'],
            ].map(([signal, weak, strong]) => (
              <article key={signal}>
                <span>Design signal</span>
                <h3>{signal}</h3>
                <p><strong>Weak reading:</strong> {weak}</p>
                <p><strong>Stronger HRBA reading:</strong> {strong}</p>
              </article>
            ))}
          </div>
          <p>A stronger HRBA design shows what will change so that people can participate, influence decisions, benefit, and raise concerns safely.</p>
        </section>

        <section className="m3-s11-task" aria-labelledby={`${screen.id}-task`}>
          <div className="m3-s11-task-header">
            <div>
              <h2 id={`${screen.id}-task`}>Classify the design signals</h2>
              <p>Review each Jiru Amba design signal. For each one, choose whether gender and disability are missing, only mentioned, or built into the design.</p>
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
              <h2 id={`${screen.id}-repairs`}>Choose two design repairs</h2>
              <p>Now choose two practical changes that would make the Jiru Amba design more inclusive and rights-based.</p>
            </div>
            <span className="m3-s11-count" aria-live="polite">{selectedRepairs.length} of 2 repairs selected</span>
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
              {submittedOutput ? 'Update gender and disability dashboard' : 'Generate gender and disability dashboard'}
            </button>
            <p aria-live="polite">{helperText}</p>
          </div>
        </section>

        {!submittedOutput && (
          <aside className="m3-s11-dashboard-preview" aria-label="Gender and Disability Marker Lite Dashboard preview">
            <div>
              <h2>Gender and Disability Marker Lite Dashboard</h2>
              <p>Your dashboard will appear here after you classify all six design signals and select two design repairs.</p>
            </div>
            {showEmptyDashboard && <img src={module3Screen11Assets.emptyDashboard.src} alt={module3Screen11Assets.emptyDashboard.alt} onError={() => setShowEmptyDashboard(false)} />}
          </aside>
        )}

        {submittedOutput && dashboardClassifications && (
          <section className="m3-s11-dashboard" aria-live="polite" aria-labelledby={dashboardId}>
            <h2 id={dashboardId} ref={outputRef} tabIndex={-1}>Draft gender and disability design check from your selections</h2>
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
              <h3 id={`${screen.id}-review`}>Design signal review</h3>
              <div className="m3-s11-signal-output-grid">
                {screen11Signals.map((signal) => {
                  const selected = dashboardClassifications[signal.id];
                  return (
                    <article key={signal.id}>
                      <div className="m3-s11-output-heading">
                        <img src={signal.icon} alt="" aria-hidden="true" />
                        <h4>{signal.title}</h4>
                      </div>
                      <dl>
                        <div><dt>Learner classification</dt><dd>{inclusionStatusLabels[selected]}</dd></div>
                        <div><dt>Interpretation</dt><dd>{signal.explanation}</dd></div>
                        <div><dt>Design implication</dt><dd>{signal.implication[selected]}</dd></div>
                      </dl>
                    </article>
                  );
                })}
              </div>
            </section>
            <section aria-labelledby={`${screen.id}-selected-repairs`}>
              <h3 id={`${screen.id}-selected-repairs`}>Priority design repairs selected</h3>
              <div className="m3-s11-selected-repair-grid">
                {selectedRepairDetails.map((repair) => (
                  <article key={repair.id}>
                    <img src={repair.icon} alt="" aria-hidden="true" />
                    <h4>{repair.title}</h4>
                    <p>{repair.explanation}</p>
                    <p><strong>Use this later:</strong> {repair.laterUse}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="m3-s11-carry-forward" aria-labelledby={`${screen.id}-carry-question`}>
              <h3 id={`${screen.id}-carry-question`}>Carry this into Screen 12</h3>
              <p>{submittedOutput.carryForwardQuestion}</p>
            </section>
          </section>
        )}

        {submittedOutput && (
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

            <section className="m3-s11-reflection" aria-labelledby={`${screen.id}-reflection`}>
              <h2 id={`${screen.id}-reflection`}>Optional reflection for your own CSO</h2>
              <label htmlFor={`${screen.id}-reflection-input`}>
                Think about your own CSO context. What is one gender or disability inclusion issue that may be mentioned in a proposal but not yet built into the design?
              </label>
              <p>Use a general description only. Do not enter names, disability details, complaints, exact locations, organizations, officials, or identifying details.</p>
              <textarea
                id={`${screen.id}-reflection-input`}
                value={optionalReflection}
                onChange={(event) => setOptionalReflection(event.target.value)}
                placeholder="Example: The proposal says women and persons with disabilities will attend, but it does not budget accessible venues, transport support, or feedback channels."
                maxLength={340}
              />
              <p>{optionalReflection.length > 280 ? 'Keep this reflection short and general.' : 'Optional. This reflection does not block completion.'}</p>
            </section>

            <section className="m3-s11-save-confirmation" aria-labelledby={`${screen.id}-save`}>
              <h2 id={`${screen.id}-save`}>Snapshot save confirmation and carry-forward to Screen 12</h2>
              <div className="m3-s11-save-grid">
                <article>
                  <span>Snapshot field</span>
                  <p>genderDisabilityDesignCheck</p>
                </article>
                <article>
                  <span>Saved output</span>
                  <p>Gender and disability design status, six signal classifications, two repair actions, feedback, warnings, and the carry-forward question.</p>
                </article>
                <article>
                  <span>Next use</span>
                  <p>Use this in Screen 12 to strengthen participation, influence, safe support, and feedback.</p>
                </article>
              </div>
            </section>
          </>
        )}

        <div className="m3-s11-actions">
          <PrimaryButton onClick={continueWithPayload} disabled={!canContinue}>
            {screen.continueLabel}
          </PrimaryButton>
          {submittedOutput && formChanged && <p aria-live="polite">Update gender and disability dashboard before continuing.</p>}
        </div>
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
    barriers: [],
    decision: '',
    supports: [],
    responseChannel: '',
    responsibleActor: '',
  });
  const [optionalReflection, setOptionalReflection] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen12Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [limitMessage, setLimitMessage] = useState('');
  const [showHero, setShowHero] = useState(true);
  const [showLoop, setShowLoop] = useState(true);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const currentSignature = getScreen12RequiredSignature(selection);
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const isValid = isScreen12Valid(selection);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const helperText = getScreen12HelperText(selection, Boolean(submittedOutput), formChanged, limitMessage);
  const setSingleSelection = (field: 'group' | 'decision' | 'responseChannel' | 'responsibleActor', value: string) => {
    setLimitMessage('');
    setSelection((current) => ({ ...current, [field]: value }));
  };
  const toggleListValue = (field: 'barriers' | 'supports', value: string, limit: number) => {
    setSelection((current) => {
      const values = current[field];
      if (values.includes(value)) {
        setLimitMessage('');
        return { ...current, [field]: values.filter((item) => item !== value) };
      }
      if (values.length >= limit) {
        setLimitMessage(
          field === 'barriers'
            ? 'Keep this pathway focused. Select no more than two barriers.'
            : 'Select up to three support actions so the pathway stays practical.',
        );
        return current;
      }
      setLimitMessage('');
      const nextValues = [...values, value];
      return { ...current, [field]: nextValues };
    });
  };
  const submitPathway = () => {
    if (!isValid) return;
    const output = buildScreen12Submission(selection, optionalReflection);
    setLimitMessage('');
    setSubmittedOutput(output);
    setSubmittedSignature(currentSignature);
    if (typeof window !== 'undefined') window.setTimeout(() => outputRef.current?.focus(), 0);
  };
  const pathway = submittedOutput?.participationAccountabilityPathway;
  const optionButton = (value: string, selected: boolean, onClick: () => void) => (
    <button
      key={value}
      type="button"
      className={`m3-participation-option${selected ? ' is-selected' : ''}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      <span aria-hidden="true">{selected ? '✓' : '○'}</span>
      <span>{value}</span>
    </button>
  );

  return (
    <main className="m3-screen m3-participation-screen" aria-labelledby={titleId}>
      <article className="m3-participation-shell">
        <header className="m3-participation-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-participation-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Participation and Accountability Pathway</h1>
        </header>

        <section className="m3-participation-hero" aria-labelledby={`${screen.id}-meaning`}>
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
            <p>The purpose of this section is to test whether the Jiru Amba plan creates a real pathway from participation to response. A rights-based design should make it possible for rights-holders to understand the plan, raise priorities safely, influence decisions, and see how duty-bearers or responsible actors respond.</p>
          </article>
          <article className="m3-participation-card">
            <h2>Jiru Amba case reminder</h2>
            <p>The Jiru Amba Futures Plan invited different groups to consultation meetings. But earlier analysis showed that some groups may have been present without real influence. Women vendors, youth, persons with disabilities, women who rely on water services, and people from remote kebeles may need different channels, timing, information, or support to participate meaningfully.</p>
            <p className="m3-participation-note">This screen asks: what pathway would make participation more than attendance?</p>
          </article>
        </section>

        <section className="m3-participation-card" aria-labelledby={`${screen.id}-concept`}>
          <h2 id={`${screen.id}-concept`}>From attendance to accountability</h2>
          <div className="m3-participation-concept-grid">
            {[
              ['1. Access', 'People receive information in a way they can understand and can take part without avoidable barriers.'],
              ['2. Influence', 'Participation is linked to a real project decision, not only general discussion.'],
              ['3. Response', 'A responsible actor reviews the concern, explains what can change, and gives a clear response.'],
              ['4. Follow-up', 'People can see what changed, what did not change, and why.'],
            ].map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </section>

        <section className="m3-participation-grid-two">
          <article className="m3-participation-card">
            <h2>Worked example: market improvement decision</h2>
            <p>If women vendors are invited to a meeting but cannot influence where market improvements happen, participation remains weak. A stronger pathway would ask women vendors about market access, timing, safety, fees, and layout before the activity is finalized. The woreda planning office or market office should respond, and Awra can help document the feedback safely and share what changed.</p>
            <p className="m3-participation-mini-path">Women vendors → market access barrier → influence market improvement priorities → women-only pre-discussion and clear information → feedback summary → market office and woreda planning office respond → Awra shares what changed</p>
          </article>
          <article className="m3-participation-safe-note">
            <h2>Safe practice reminder</h2>
            <p>{m3SafeDesignMessage}</p>
          </article>
        </section>

        <section className="m3-participation-builder" aria-labelledby={`${screen.id}-activity`}>
          <div className="m3-participation-builder-copy">
            <h2 id={`${screen.id}-activity`}>Build one participation and accountability pathway</h2>
            <p>Choose one rights-holder group and design a pathway that shows how they can influence one project decision and receive a response.</p>
          </div>
          <div className="m3-participation-builder-layout">
            <section className="m3-participation-step-list">
              <fieldset className="m3-participation-fieldset">
                <legend>1. Who needs a stronger participation pathway?</legend>
                <div className="m3-participation-options">{screen12Groups.map((value) => optionButton(value, selection.group === value, () => setSingleSelection('group', value)))}</div>
              </fieldset>
              <fieldset className="m3-participation-fieldset">
                <legend>2. What makes participation weak or unequal?</legend>
                <div className="m3-participation-options">{screen12Barriers.map((value) => optionButton(value, selection.barriers.includes(value), () => toggleListValue('barriers', value, 2)))}</div>
              </fieldset>
              <fieldset className="m3-participation-fieldset">
                <legend>3. Which decision should this group influence?</legend>
                <div className="m3-participation-options">{screen12Decisions.map((value) => optionButton(value, selection.decision === value, () => setSingleSelection('decision', value)))}</div>
              </fieldset>
              <fieldset className="m3-participation-fieldset">
                <legend>4. What support makes participation realistic?</legend>
                <div className="m3-participation-options">{screen12Supports.map((value) => optionButton(value, selection.supports.includes(value), () => toggleListValue('supports', value, 3)))}</div>
              </fieldset>
              <fieldset className="m3-participation-fieldset">
                <legend>5. How will people receive a response?</legend>
                <div className="m3-participation-options">{screen12ResponseChannels.map((value) => optionButton(value, selection.responseChannel === value, () => setSingleSelection('responseChannel', value)))}</div>
              </fieldset>
              <fieldset className="m3-participation-fieldset">
                <legend>6. Who must respond?</legend>
                <div className="m3-participation-options">{screen12ResponsibleActors.map((value) => optionButton(value, selection.responsibleActor === value, () => setSingleSelection('responsibleActor', value)))}</div>
              </fieldset>
            </section>
            <aside className="m3-participation-preview">
              <h3>Draft pathway preview</h3>
              <p>Your draft pathway will appear after selections. Use this space to check the sequence from voice to influence, response, and follow-up.</p>
              {showLoop && <img src={screen12Assets.loop} alt="Support visual showing voice, influence, response, and follow-up as an accountability loop." onError={() => setShowLoop(false)} />}
              <ol>
                {['Rights-holder group', 'Participation barrier', 'Decision to influence', 'Support needed', 'Response channel', 'Responsible actor'].map((item) => <li key={item}>{item}</li>)}
              </ol>
            </aside>
          </div>
          <div className="m3-participation-submit-row">
            <button type="button" className="m3-participation-submit" disabled={!isValid} onClick={submitPathway}>{submittedOutput ? 'Update pathway' : 'Build pathway'}</button>
            <p aria-live="polite">{helperText}</p>
          </div>
        </section>

        {submittedOutput && pathway && (
          <section className="m3-participation-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Your draft participation and accountability pathway</h2>
            <div className="m3-participation-badge-row">{pathway.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
            <div className="m3-participation-pathway">
              {[
                ['Rights-holder group', pathway.group],
                ['Participation barrier', pathway.barriers.join('; ')],
                ['Decision to influence', pathway.decision],
                ['Support needed', pathway.supports.join('; ')],
                ['Response channel', pathway.responseChannel],
                ['Responsible actor', pathway.responsibleActor],
                ['Follow-up meaning', pathway.followUpMeaning],
              ].map(([label, value], index) => <article key={label}><span>{index + 1}</span><h3>{label}</h3><p>{value}</p></article>)}
            </div>
          </section>
        )}

        {submittedOutput && (
          <>
            <section className="m3-participation-feedback">
              <h2>What this pathway shows</h2>
              <ul>{submittedOutput.feedbackMessages.map((message) => <li key={message}>{message}</li>)}</ul>
            </section>
            <section className="m3-participation-reflection">
              <h2>Optional reflection for your own CSO</h2>
              <label htmlFor={`${screen.id}-reflection`}>Think about one project your CSO has designed or may design. Where could participation become only attendance? Write a general note about what would need to change.</label>
              <textarea id={`${screen.id}-reflection`} maxLength={420} value={optionalReflection} onChange={(event) => setOptionalReflection(event.target.value)} placeholder="Example: “We may need to explain decisions back to participants after consultation, not only collect their views.”" />
              <p>{optionalReflection.length > 350 ? 'Keep this reflection short and general.' : 'Keep this general. Do not write real names, exact locations, complaints, accusations, or sensitive details.'}</p>
            </section>
            <section className="m3-participation-carry-forward">
              <h2>Carry this forward</h2>
              <p>You have now drafted one participation and accountability pathway. On the next screen, you will test the design for risks: who could still be excluded, pressured, exposed, or left without response if the project moves forward too quickly?</p>
            </section>
          </>
        )}

        <div className="m3-participation-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ participationAccountabilityPathway: { ...submittedOutput.participationAccountabilityPathway, optionalReflection: optionalReflection.trim() || undefined }, screen12: submittedOutput })}>
            {screen.continueLabel}
          </PrimaryButton>
        </div>
      </article>
    </main>
  );
}

function RiskDoNoHarmBoardScreen({ screen, onComplete }: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [cards, setCards] = useState<Screen13RiskCard[]>([getEmptyRiskCard(), getEmptyRiskCard(), getEmptyRiskCard()]);
  const [optionalReflection, setOptionalReflection] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen13Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [showHero, setShowHero] = useState(true);
  const [showEmpty, setShowEmpty] = useState(true);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const currentSignature = getScreen13RequiredSignature(cards);
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const isValid = isScreen13Valid(cards);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const helperText = getScreen13HelperText(cards, Boolean(submittedOutput), formChanged);
  const updateCard = (index: number, field: keyof Screen13RiskCard, value: string) => {
    setCards((current) => current.map((card, cardIndex) => cardIndex === index ? { ...card, [field]: value } : card));
  };
  const submitBoard = () => {
    if (!isValid) return;
    const output = buildScreen13Submission(cards, optionalReflection);
    setSubmittedOutput(output);
    setSubmittedSignature(currentSignature);
    if (typeof window !== 'undefined') window.setTimeout(() => outputRef.current?.focus(), 0);
  };
  const renderSelect = (index: number, field: keyof Screen13RiskCard, label: string, options: Array<string | { value: Screen13ImpactLevel; label: string }>) => (
    <label>
      <span>{label}</span>
      <select value={cards[index][field]} onChange={(event) => updateCard(index, field, event.target.value)}>
        <option value="">Choose one</option>
        {options.map((option) => typeof option === 'string'
          ? <option key={option} value={option}>{option}</option>
          : <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );

  return (
    <main className="m3-screen m3-risk-screen" aria-labelledby={titleId}>
      <article className="m3-risk-shell">
        <header className="m3-risk-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-risk-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Risk and Do-No-Harm in Project Design</h1>
        </header>

        <section className="m3-risk-hero">
          <div className="m3-risk-card">
            <h2>What this means</h2>
            <p>A project can have good intentions and still create harm. In HRBA project design, risk analysis should ask who may be excluded, exposed, pressured, ignored, or left without response — and what must change before implementation.</p>
            <div className="m3-risk-chip-row">{['Exclusion risk', 'Safety risk', 'Data risk', 'Power risk', 'Mitigation'].map((chip) => <span key={chip}>{chip}</span>)}</div>
          </div>
          <figure className="m3-risk-visual">{showHero && <img src={screen13Assets.hero.src} alt={screen13Assets.hero.alt} onError={() => setShowHero(false)} />}</figure>
        </section>

        <section className="m3-risk-grid-two">
          <article className="m3-risk-card">
            <h2>The purpose of this section</h2>
            <p>The purpose of this section is to test the Jiru Amba design before moving into repair. You will identify three rights-based risks and choose mitigation actions so the project does not unintentionally reinforce exclusion, unsafe participation, power capture, or weak accountability.</p>
          </article>
          <article className="m3-risk-card">
            <h2>Jiru Amba case reminder</h2>
            <p>The plan includes meetings, training, market improvement, health post renovation, water repair, and feedback channels. These may look useful, but each can create risk if participation is unsafe, selection is unclear, materials are inaccessible, feedback is not answered, or powerful actors shape benefits.</p>
            <p className="m3-risk-note">Do-no-harm means changing the design before avoidable harm happens.</p>
          </article>
        </section>

        <section className="m3-risk-card">
          <h2>Rights-based risk is more than delivery risk</h2>
          <div className="m3-risk-concept-grid">
            {[
              ['Exclusion risk', 'Some groups may still be left out because of timing, location, information, disability access, language, care work, or cost.'],
              ['Safety or backlash risk', 'People may face pressure, blame, retaliation, or social consequences for speaking up.'],
              ['Data or visibility risk', 'Feedback, complaints, disability information, stories, or photos may expose people if handled carelessly.'],
              ['Power or capture risk', 'Influential actors may shape selection, priorities, budgets, or benefits in ways that exclude others.'],
              ['CSO overload risk', 'The CSO may be expected to solve issues that require duty-bearer or service-actor response.'],
              ['Unrealistic assumption risk', 'The plan may assume cooperation, attendance, budget, transport, accessibility, or follow-up that is not yet secured.'],
            ].map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </section>

        <section className="m3-risk-grid-two">
          <article className="m3-risk-card">
            <h2>Worked example: unsafe feedback channel</h2>
            <p>A feedback box may look accountable, but it can create risk if people fear being identified, if no one responds, or if complaints are collected without a safe process. A stronger design would use a non-identifying channel, limit the information collected, assign a responsible actor to review feedback, and explain what action was taken.</p>
            <div className="m3-risk-example-card">
              <p><strong>Risk:</strong> People may not use the feedback channel because it feels unsafe.</p>
              <p><strong>Who may be affected:</strong> women vendors, youth, persons with disabilities, or people from remote kebeles.</p>
              <p><strong>Mitigation:</strong> use a safe, non-identifying channel and clear response process.</p>
              <p><strong>Responsible actor:</strong> Awra facilitates safe collection; responsible office responds.</p>
              <p><strong>Watch sign:</strong> feedback is low, one group is silent, or people say they fear consequences.</p>
            </div>
          </article>
          <article className="m3-risk-safe-note">
            <h2>Safe practice reminder</h2>
            <p>{m3SafeDesignMessage}</p>
          </article>
        </section>

        <section className="m3-risk-builder" aria-labelledby={`${screen.id}-activity`}>
          <div className="m3-risk-builder-copy">
            <h2 id={`${screen.id}-activity`}>Build a risk and do-no-harm board</h2>
            <p>Choose three risks in the Jiru Amba plan. For each risk, choose who may be affected, how serious it is, what mitigation is needed, who should act, and what sign should be watched during implementation.</p>
          </div>
          <div className="m3-risk-builder-layout">
            <section className="m3-risk-card-list">
              {cards.map((_, index) => (
                <fieldset key={index} className="m3-risk-risk-card">
                  <legend>Risk {index + 1}</legend>
                  {renderSelect(index, 'riskCategory', 'Risk category', screen13RiskCategories)}
                  {renderSelect(index, 'affectedGroup', 'Who may be affected', screen13AffectedGroups)}
                  {renderSelect(index, 'impactLevel', 'Impact level', screen13ImpactLevels)}
                  {renderSelect(index, 'mitigationAction', 'Mitigation action', screen13Mitigations)}
                  {renderSelect(index, 'responsibleActor', 'Responsible actor', screen13ResponsibleActors)}
                  {renderSelect(index, 'watchSign', 'Watch sign', screen13WatchSigns)}
                </fieldset>
              ))}
            </section>
            <aside className="m3-risk-preview">
              <h3>Risk board preview</h3>
              <p>Your risk board will appear after all three cards are complete. Use this preview to check risk category, affected group, mitigation, responsibility, and watch sign.</p>
              {showEmpty && <img src={screen13Assets.empty} alt="Support visual showing an empty risk board preview." onError={() => setShowEmpty(false)} />}
            </aside>
          </div>
          <div className="m3-risk-submit-row">
            <button type="button" className="m3-risk-submit" disabled={!isValid} onClick={submitBoard}>{submittedOutput ? 'Update risk board' : 'Build risk board'}</button>
            <p aria-live="polite">{helperText}</p>
          </div>
        </section>

        {submittedOutput && (
          <section className="m3-risk-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Your draft risk and do-no-harm board</h2>
            <p className="m3-risk-summary-strip">{submittedOutput.riskDoNoHarmBoard.overallSummary}</p>
            <div className="m3-risk-badge-row">{submittedOutput.riskDoNoHarmBoard.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
            <div className="m3-risk-output-grid">
              {submittedOutput.riskDoNoHarmBoard.cards.map((card, index) => (
                <article key={index} className={`m3-risk-output-card m3-risk-output-card--${card.impactLevel}`}>
                  <span>{card.statusLabel}</span>
                  <h3>Risk {index + 1}</h3>
                  <dl>
                    <div><dt>Risk category</dt><dd>{card.riskCategory}</dd></div>
                    <div><dt>Affected group</dt><dd>{card.affectedGroup}</dd></div>
                    <div><dt>Impact level</dt><dd>{getRiskStatusLabel(card.impactLevel)}</dd></div>
                    <div><dt>Mitigation action</dt><dd>{card.mitigationAction}</dd></div>
                    <div><dt>Responsible actor</dt><dd>{card.responsibleActor}</dd></div>
                    <div><dt>Watch sign</dt><dd>{card.watchSign}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        )}

        {submittedOutput && (
          <>
            <section className="m3-risk-feedback">
              <h2>What this risk board shows</h2>
              <ul>{submittedOutput.feedbackMessages.map((message) => <li key={message}>{message}</li>)}</ul>
            </section>
            <section className="m3-risk-reflection">
              <h2>Optional reflection for your own CSO</h2>
              <label htmlFor={`${screen.id}-reflection`}>Think about one project your CSO has designed or may design. What is one risk you should check before implementation?</label>
              <textarea id={`${screen.id}-reflection`} maxLength={420} value={optionalReflection} onChange={(event) => setOptionalReflection(event.target.value)} placeholder="Example: “We should check whether our feedback process is safe and whether someone is assigned to respond.”" />
              <p>{optionalReflection.length > 350 ? 'Keep this reflection short and general.' : 'Keep this general. Do not write real names, exact locations, complaints, accusations, sensitive incidents, disability details, or identifiable information.'}</p>
            </section>
            <section className="m3-risk-carry-forward">
              <h2>Carry this forward</h2>
              <p>You have now checked participation, accountability, risk, and do-no-harm before implementation. Next, you will start repairing the project design itself, beginning with the objective. The repaired objective should reflect rights-holders, barriers, responsibilities, inclusion, accountability, and safe change.</p>
            </section>
          </>
        )}

        <div className="m3-risk-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ riskDoNoHarmBoard: { ...submittedOutput.riskDoNoHarmBoard, optionalReflection: optionalReflection.trim() || undefined }, screen13: submittedOutput })}>
            {screen.continueLabel}
          </PrimaryButton>
        </div>
      </article>
    </main>
  );
}

function ObjectiveRepairScreen({ screen, onComplete }: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [selections, setSelections] = useState<Screen14Selections>(emptyScreen14Selections());
  const [optionalReflection, setOptionalReflection] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen14Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [showHero, setShowHero] = useState(true);
  const [showEmpty, setShowEmpty] = useState(true);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const currentSignature = JSON.stringify(selections);
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const isValid = isScreen14Valid(selections);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const helperText = getScreen14Helper(selections, Boolean(submittedOutput), formChanged);
  const chooseOption = (rowId: Screen14RowId, optionId: string) => {
    setSelections((current) => ({ ...current, [rowId]: optionId }));
  };
  const submitOutput = () => {
    if (!isValid) return;
    const output = buildScreen14Submission(selections, optionalReflection);
    setSubmittedOutput(output);
    setSubmittedSignature(currentSignature);
    if (typeof window !== 'undefined') window.setTimeout(() => outputRef.current?.focus(), 0);
  };

  return (
    <main className="m3-screen m3-design-repair-screen m3-objective-repair-screen" aria-labelledby={titleId}>
      <article className="m3-design-repair-shell">
        <header className="m3-design-repair-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-design-repair-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Repair the Objective</h1>
        </header>

        <section className="m3-design-repair-hero">
          <div className="m3-design-repair-hero-copy">
            <p className="m3-design-repair-kicker">Design repair</p>
            <h2>A better objective changes the design, not only the wording.</h2>
            <p>The Jiru Amba plan already mentions inclusion, participation, women, youth, and persons with disabilities. But the objective still sounds activity-based if it only promises trainings, meetings, awareness sessions, or general participation. In HRBA project design, the objective should show the rights-based change the project is trying to support.</p>
            <p className="m3-design-repair-safe">Work only with the fictional Jiru Amba case. Do not enter real names, complaints, exact locations, organizations, or sensitive details.</p>
          </div>
          <figure className="m3-design-repair-visual">{showHero && <img src={screen14Assets.hero.src} alt={screen14Assets.hero.alt} onError={() => setShowHero(false)} />}</figure>
        </section>

        <section className="m3-design-repair-card">
          <h2>What this means</h2>
          <div className="m3-design-repair-concept-grid">
            {[
              ['Not only activities', 'A weak objective often says what the project will do: train, meet, consult, raise awareness, or report.'],
              ['Name the change', 'A stronger objective says what should change for rights-holders and what barrier or accountability issue the design will address.'],
              ['Keep responsibility visible', 'The CSO can facilitate and support, but the design should not make the CSO responsible for everything.'],
              ['Check inclusion and influence', 'The objective should show how people who face barriers can access information, participate safely, influence decisions, and receive follow-up.'],
            ].map(([heading, body]) => <article key={heading}><h3>{heading}</h3><p>{body}</p></article>)}
          </div>
        </section>

        <section className="m3-design-repair-grid-two">
          <article className="m3-design-repair-card">
            <h2>Weak objective from the Jiru Amba draft</h2>
            <blockquote>{screen14WeakObjective}</blockquote>
            <h3>What is weak?</h3>
            <div className="m3-design-repair-chip-list">
              {[
                'Activity-heavy: Trainings and meetings dominate the change logic.',
                'Broad groups: The objective names groups but does not show different barriers.',
                'Weak responsibility: Duty-bearer or service responsibility is unclear.',
                'Weak accountability: There is no clear influence, response, or follow-up.',
              ].map((chip) => <span key={chip}>{chip}</span>)}
            </div>
          </article>
          <article className="m3-design-repair-card">
            <h2>Worked example: how the objective improves</h2>
            <p><strong>Before:</strong> To improve participation through community meetings.</p>
            <p><strong>After:</strong> To strengthen the ability of women vendors, youth, persons with disabilities, and residents from remote kebeles to influence selected Jiru Amba service and livelihood priorities, while responsible local actors use accessible information, safe participation, and transparent follow-up to address barriers identified in the planning process.</p>
            <ul>
              {['It names the groups facing barriers.', 'It identifies the barrier.', 'It keeps responsible actors visible.', 'It shows participation and follow-up.', 'It describes the change expected.'].map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="m3-design-repair-note">This is still a draft learning objective. In real project work, the wording should be refined with rights-holders, responsible actors, and safe evidence.</p>
          </article>
        </section>

        <section className="m3-design-repair-builder" aria-labelledby={`${screen.id}-activity`}>
          <div className="m3-design-repair-builder-copy">
            <h2 id={`${screen.id}-activity`}>In the Jiru Amba case, repair the objective</h2>
            <p>Select one option in each row. Your selections will generate a draft rights-based objective. The goal is not to write a perfect logframe objective. The goal is to make the rights-based design logic visible.</p>
          </div>
          <div className="m3-design-repair-builder-layout">
            <div className="m3-objective-repair-row-list">
              {screen14Rows.map((row) => (
                <fieldset key={row.id} className="m3-design-repair-fieldset">
                  <legend>{row.prompt}</legend>
                  <div className="m3-design-repair-options">
                    {row.options.map((option) => {
                      const selected = selections[row.id] === option.id;
                      return (
                        <button key={option.id} type="button" className={`m3-design-repair-option${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => chooseOption(row.id, option.id)}>
                          <span aria-hidden="true">{selected ? '✓' : '○'}</span>
                          <strong>{option.label}</strong>
                          <small>{option.support}</small>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
            <aside className="m3-design-repair-preview">
              <h3>Objective Repair Canvas preview</h3>
              <p>Your before/after objective canvas will appear after all six rows are selected.</p>
              {showEmpty && <img src={screen14Assets.empty} alt="Support visual showing an empty objective repair canvas." onError={() => setShowEmpty(false)} />}
            </aside>
          </div>
          <div className="m3-design-repair-submit-row">
            <button type="button" className="m3-design-repair-submit" disabled={!isValid} onClick={submitOutput}>{submittedOutput ? (formChanged ? 'Update design repair output' : 'Generate repaired objective') : 'Generate repaired objective'}</button>
            <p aria-live="polite">{helperText}</p>
          </div>
        </section>

        {submittedOutput && (
          <section className="m3-design-repair-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Draft repaired HRBA objective</h2>
            <div className="m3-objective-repair-canvas">
              <article>
                <span>Before: activity-based objective</span>
                <p>{submittedOutput.repairedObjective.weakObjective}</p>
              </article>
              <article>
                <span>After: rights-based objective</span>
                <p>{submittedOutput.repairedObjective.objective}</p>
              </article>
            </div>
            <h3>What your repair improved</h3>
            <ul className="m3-design-repair-checklist">{submittedOutput.repairedObjective.improvements.map((item) => <li key={item}>✓ {item}</li>)}</ul>
            {submittedOutput.repairedObjective.warnings.length > 0 && <div className="m3-design-repair-warning-list">{submittedOutput.repairedObjective.warnings.map((warning) => <p key={warning}>⚠ {warning}</p>)}</div>}
          </section>
        )}

        {submittedOutput && (
          <>
            <section className="m3-design-repair-reflection">
              <h2>Optional reflection for your own CSO practice</h2>
              <label htmlFor={`${screen.id}-reflection`}>In your own CSO context, what type of objective often becomes too activity-focused?</label>
              <textarea id={`${screen.id}-reflection`} maxLength={360} value={optionalReflection} onChange={(event) => setOptionalReflection(event.target.value)} placeholder="Example: “Objectives that only promise training or awareness without saying what should change.”" />
              <p>Use general wording only. Do not enter names, complaints, exact locations, organizations, sensitive incidents, or identifiable details.</p>
            </section>
            <section className="m3-design-repair-carry-forward">
              <h2>Carry this forward</h2>
              <p>You now have a draft objective that makes rights-holders, barriers, responsibility, inclusion, participation, and change more visible. Next, you will repair the activity package so the activities actually support this objective.</p>
              <p><strong>Saved to your HRBA Project Design Improvement Snapshot:</strong> Repaired objective draft.</p>
            </section>
          </>
        )}

        <div className="m3-design-repair-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ repairedObjective: { ...submittedOutput.repairedObjective, optionalReflection: optionalReflection.trim() || undefined }, screen14: submittedOutput })}>
            {screen.continueLabel}
          </PrimaryButton>
        </div>
      </article>
    </main>
  );
}

function ActivityRepairScreen({ screen, onComplete }: {
  screen: Module3RevisedScreen;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [selectedActionIds, setSelectedActionIds] = useState<string[]>([]);
  const [optionalReflection, setOptionalReflection] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen15Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [limitMessage, setLimitMessage] = useState('');
  const [showHero, setShowHero] = useState(true);
  const [showEmpty, setShowEmpty] = useState(true);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const currentSignature = JSON.stringify([...selectedActionIds].sort());
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const isValid = isScreen15Valid(selectedActionIds);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const helperText = getScreen15Helper(selectedActionIds, Boolean(submittedOutput), formChanged, limitMessage);
  const toggleAction = (actionId: string) => {
    setSelectedActionIds((current) => {
      if (current.includes(actionId)) {
        setLimitMessage('');
        return current.filter((id) => id !== actionId);
      }
      if (current.length >= 5) {
        setLimitMessage('You already selected five actions. Remove one before adding another.');
        return current;
      }
      setLimitMessage('');
      return [...current, actionId];
    });
  };
  const submitOutput = () => {
    if (!isValid) return;
    const output = buildScreen15Submission(selectedActionIds, optionalReflection);
    setSubmittedOutput(output);
    setSubmittedSignature(currentSignature);
    setLimitMessage('');
    if (typeof window !== 'undefined') window.setTimeout(() => outputRef.current?.focus(), 0);
  };
  const outputActions = submittedOutput?.repairedActivityPackage.selectedActions || [];

  return (
    <main className="m3-screen m3-design-repair-screen m3-activity-repair-screen" aria-labelledby={titleId}>
      <article className="m3-design-repair-shell">
        <header className="m3-design-repair-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-design-repair-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Repair the Activity Package</h1>
        </header>

        <section className="m3-design-repair-hero">
          <div className="m3-design-repair-hero-copy">
            <p className="m3-design-repair-kicker">Design repair</p>
            <h2>Activities are only rights-based when they respond to the barriers.</h2>
            <p>The Jiru Amba draft includes trainings, meetings, awareness sessions, and a final report. Those activities may be useful, but they are not enough if they do not change access, influence, responsibility, feedback, safety, or follow-up.</p>
            <p className="m3-design-repair-safe">Use only the fictional Jiru Amba case. Do not enter real names, complaints, exact locations, organizations, or sensitive details.</p>
          </div>
          <figure className="m3-design-repair-visual">{showHero && <img src={screen15Assets.hero.src} alt={screen15Assets.hero.alt} onError={() => setShowHero(false)} />}</figure>
        </section>

        <section className="m3-design-repair-card">
          <h2>What this means</h2>
          <div className="m3-design-repair-concept-grid">
            {[
              ['Training is not enough', 'Training can support capacity, but it does not automatically remove barriers or change accountability.'],
              ['Add enabling conditions', 'A rights-based package includes access, information, accommodation, safe participation, response, and follow-up.'],
              ['Keep responsible actors in the plan', 'Activities should involve duty-bearers or responsible actors where their action is needed.'],
              ['Check risks before implementation', 'Activities should reduce exclusion, backlash, privacy, power capture, and no-response risks.'],
            ].map(([heading, body]) => <article key={heading}><h3>{heading}</h3><p>{body}</p></article>)}
          </div>
        </section>

        <section className="m3-design-repair-grid-two">
          <article className="m3-design-repair-card">
            <h2>Weak activity package from the Jiru Amba draft</h2>
            <ol>
              {['Conduct three training sessions for women and youth.', 'Hold awareness meetings in selected kebeles.', 'Provide small start-up grants.', 'Organize one public consultation.', 'Produce a final report.'].map((item) => <li key={item}>{item}</li>)}
            </ol>
            <h3>What is weak?</h3>
            <div className="m3-design-repair-chip-list">
              {['Training-heavy: The package assumes activities create change by themselves.', 'Access unclear: Timing, venue, materials, transport, and accommodation are not addressed.', 'Responsibility weak: Public, service, or committee actors are not clearly engaged.', 'Feedback weak: There is no visible response loop.', 'Risk weak: Exclusion, power capture, and privacy risks are not mitigated.'].map((chip) => <span key={chip}>{chip}</span>)}
            </div>
          </article>
          <article className="m3-design-repair-card">
            <h2>Worked repair example</h2>
            <p><strong>Before:</strong> Hold one consultation meeting with community representatives.</p>
            <p><strong>Why weak:</strong> People may attend but not influence decisions. Some groups may not receive information early enough. Persons with disabilities may face access barriers. Feedback may not receive a response.</p>
            <p><strong>After:</strong> Prepare rights-holder groups before the meeting, share accessible information in advance, adjust timing and venue, invite responsible actors to respond to specific barriers, document non-identifying feedback themes, and share what changed after the consultation.</p>
            <ul>
              {['Participation became prepared and informed.', 'Accessibility was built into the activity.', 'Responsible actors had a response role.', 'Feedback became part of accountability.', 'Evidence stayed non-identifying.'].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </section>

        <section className="m3-design-repair-builder" aria-labelledby={`${screen.id}-activity`}>
          <div className="m3-design-repair-builder-copy">
            <h2 id={`${screen.id}-activity`}>In the Jiru Amba case, repair the activity package</h2>
            <p>Choose five repair actions. Your package should include preparation before implementation, responsible actor engagement, inclusion or accessibility, safe feedback, and follow-up. The board will show whether your activity package is still activity-heavy or ready to support the repaired objective.</p>
          </div>
          <div className="m3-design-repair-builder-layout">
            <div className="m3-activity-repair-card-grid">
              {activityRepairActions.map((action) => {
                const selected = selectedActionIds.includes(action.id);
                return (
                  <button key={action.id} type="button" className={`m3-activity-repair-choice${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => toggleAction(action.id)}>
                    <span aria-hidden="true">{selected ? '✓ Selected' : '○ Select'}</span>
                    <strong>{action.label}</strong>
                    <small>{action.description}</small>
                    <span>{action.lane}</span>
                    <span>{action.tags.map((tag) => activityRepairTagLabels[tag]).join(' · ')}</span>
                  </button>
                );
              })}
            </div>
            <aside className="m3-design-repair-preview">
              <h3>Activity Package Repair Board preview</h3>
              <p>Your repaired activity board will appear after exactly five actions are selected and all required categories are covered.</p>
              {showEmpty && <img src={screen15Assets.empty} alt="Support visual showing empty activity repair lanes." onError={() => setShowEmpty(false)} />}
            </aside>
          </div>
          <div className="m3-design-repair-submit-row">
            <button type="button" className="m3-design-repair-submit" disabled={!isValid} onClick={submitOutput}>{submittedOutput ? (formChanged ? 'Update design repair output' : 'Generate activity repair board') : 'Generate activity repair board'}</button>
            <p aria-live="polite">{helperText}</p>
          </div>
        </section>

        {submittedOutput && (
          <section className="m3-design-repair-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Repaired activity package board</h2>
            <div className="m3-activity-repair-lanes">
              {(['Add before implementation', 'Add during implementation', 'Monitor and follow up'] as ActivityRepairLane[]).map((lane) => (
                <article key={lane}>
                  <h3>{lane}</h3>
                  {outputActions.filter((action) => action.lane === lane).map((action) => (
                    <div key={action.id} className="m3-activity-repair-output-card">
                      <h4>{action.label}</h4>
                      <p><strong>Barrier addressed:</strong> {action.barrier}</p>
                      <p><strong>Responsible/supporting actor:</strong> {action.actor}</p>
                      <p><strong>Rights-holder participation role:</strong> {action.role}</p>
                      <p><strong>Safety or inclusion note:</strong> {action.note}</p>
                      <div>{action.tags.map((tag) => <span key={tag}>{activityRepairTagLabels[tag]}</span>)}</div>
                    </div>
                  ))}
                </article>
              ))}
            </div>
            <h3>What your package now covers</h3>
            <ul className="m3-design-repair-checklist">{(Object.keys(activityRepairTagLabels) as ActivityRepairTag[]).map((tag) => <li key={tag}>{submittedOutput.repairedActivityPackage.categoryCoverage[tag] ? '✓' : '○'} {activityRepairTagLabels[tag]}: {submittedOutput.repairedActivityPackage.categoryCoverage[tag] ? 'Included' : 'Missing'}</li>)}</ul>
            <p className="m3-design-repair-note">{submittedOutput.repairedActivityPackage.summary}</p>
            {submittedOutput.repairedActivityPackage.warnings.length > 0 && <div className="m3-design-repair-warning-list">{submittedOutput.repairedActivityPackage.warnings.map((warning) => <p key={warning}>⚠ {warning}</p>)}</div>}
          </section>
        )}

        {submittedOutput && (
          <>
            <section className="m3-design-repair-reflection">
              <h2>Optional reflection for your own CSO practice</h2>
              <label htmlFor={`${screen.id}-reflection`}>What type of activity is often overused in project designs you have seen?</label>
              <textarea id={`${screen.id}-reflection`} maxLength={360} value={optionalReflection} onChange={(event) => setOptionalReflection(event.target.value)} placeholder="Example: “Many designs rely on training or awareness sessions without changing access, responsibility, or follow-up.”" />
              <p>Use general wording only. Do not enter names, complaints, exact locations, organizations, sensitive incidents, or identifiable details.</p>
            </section>
            <section className="m3-design-repair-carry-forward">
              <h2>Carry this forward</h2>
              <p>You now have a repaired activity package. Next, you will connect the objective and activities into a simple logic pathway with indicators that check change, access, influence, response, inclusion, and safe evidence.</p>
              <p><strong>Saved to your HRBA Project Design Improvement Snapshot:</strong> Repaired activity package.</p>
            </section>
          </>
        )}

        <div className="m3-design-repair-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ repairedActivityPackage: { ...submittedOutput.repairedActivityPackage, optionalReflection: optionalReflection.trim() || undefined }, screen15: submittedOutput })}>
            {screen.continueLabel}
          </PrimaryButton>
        </div>
      </article>
    </main>
  );
}

function InterventionLogicIndicatorsScreen({ screen, state, onComplete }: {
  screen: Module3RevisedScreen;
  state: LearningState;
  onComplete: (value?: Record<string, unknown>) => void;
}) {
  const [selection, setSelection] = useState<Screen16Selections>(emptyScreen16Selections());
  const [optionalReflection, setOptionalReflection] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen16Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [limitMessage, setLimitMessage] = useState('');
  const [showHero, setShowHero] = useState(true);
  const [showPathwayEmpty, setShowPathwayEmpty] = useState(true);
  const [showMatrixEmpty, setShowMatrixEmpty] = useState(true);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const carriedObjective = getScreen14SavedOutput(state)?.repairedObjective.objective || screen16FallbackObjective;
  const carriedActivities = getScreen15SavedOutput(state)?.repairedActivityPackage.selectedActions.map((action) => action.label) || screen16FallbackActivities;
  const currentSignature = JSON.stringify(selection);
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const isValid = isScreen16Valid(selection);
  const canContinue = Boolean(submittedOutput && !formChanged);
  const helperText = getScreen16Helper(selection, Boolean(submittedOutput), formChanged, limitMessage);
  const toggleArrayValue = (field: 'outputs' | 'indicators', value: string, limit?: number) => {
    setSelection((current) => {
      const values = current[field];
      if (values.includes(value)) {
        setLimitMessage('');
        return { ...current, [field]: values.filter((item) => item !== value) };
      }
      if (limit && values.length >= limit) {
        setLimitMessage(field === 'outputs' ? 'You already selected two outputs. Remove one before adding another.' : '');
        return current;
      }
      setLimitMessage('');
      return { ...current, [field]: [...values, value] };
    });
  };
  const setSingle = (field: 'outcome' | 'watchPoint', value: string) => {
    setLimitMessage('');
    setSelection((current) => ({ ...current, [field]: value }));
  };
  const submitOutput = () => {
    if (!isValid) return;
    const output = buildScreen16Submission(selection, carriedObjective, carriedActivities, optionalReflection);
    setSubmittedOutput(output);
    setSubmittedSignature(currentSignature);
    setLimitMessage('');
    if (typeof window !== 'undefined') window.setTimeout(() => outputRef.current?.focus(), 0);
  };
  const output = submittedOutput?.interventionLogicIndicators;

  return (
    <main className="m3-screen m3-design-repair-screen m3-logic-pathway-screen" aria-labelledby={titleId}>
      <article className="m3-design-repair-shell">
        <header className="m3-design-repair-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-design-repair-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Intervention Logic and Indicators</h1>
        </header>

        <section className="m3-design-repair-hero">
          <div className="m3-design-repair-hero-copy">
            <p className="m3-design-repair-kicker">Design repair</p>
            <h2>A logic pathway should show how the design is expected to change rights-based conditions.</h2>
            <p>The repaired objective and activity package are stronger, but the design still needs a simple logic. The logic should connect the barrier, activities, outputs, outcome, indicators, evidence, and one implementation watch-point.</p>
            <p className="m3-design-repair-safe">Use only the fictional Jiru Amba case. Do not enter real names, complaints, exact locations, organizations, or sensitive details.</p>
          </div>
          <figure className="m3-design-repair-visual">{showHero && <img src={screen16Assets.hero.src} alt={screen16Assets.hero.alt} onError={() => setShowHero(false)} />}</figure>
        </section>

        <section className="m3-design-repair-card">
          <h2>What this means</h2>
          <div className="m3-design-repair-concept-grid">
            {[
              ['Problem to action', 'Activities should respond to the barriers and responsibility gaps identified earlier.'],
              ['Action to change', 'Outputs show what the project produces. Outcomes show what changes for rights-holders, responsible actors, or the accountability process.'],
              ['Indicators that matter', 'Useful HRBA indicators check access, influence, response, inclusion, barrier reduction, and responsible action.'],
              ['Safe evidence', 'Evidence should be useful without exposing names, complaints, exact locations, or sensitive personal details.'],
            ].map(([heading, body]) => <article key={heading}><h3>{heading}</h3><p>{body}</p></article>)}
          </div>
        </section>

        <section className="m3-design-repair-grid-two">
          <article className="m3-design-repair-card">
            <h2>Simple logic pathway explanation</h2>
            <p className="m3-logic-pathway-line">Problem/barrier → Activities → Outputs → Outcome/change → Indicators/evidence → Watch-point</p>
            <p>This is not a full logframe. It is a simple design logic check before the proposal review section.</p>
          </article>
          <article className="m3-design-repair-card">
            <h2>Worked example</h2>
            <dl className="m3-logic-pathway-example">
              <div><dt>Problem/barrier</dt><dd>Women vendors attend consultations but do not influence market-related decisions.</dd></div>
              <div><dt>Activity</dt><dd>Prepare women vendors before meetings, share accessible information, and hold a response session with market and woreda actors.</dd></div>
              <div><dt>Output</dt><dd>Women vendors’ priority issues are documented as non-identifying themes and reviewed with responsible actors.</dd></div>
              <div><dt>Outcome/change</dt><dd>Market improvement decisions better reflect women vendors’ access and accountability concerns.</dd></div>
              <div><dt>Indicator</dt><dd>Evidence that at least one market-related decision or action point changed after women vendors’ input.</dd></div>
              <div><dt>Evidence source</dt><dd>Non-identifying meeting summary, action tracker, and follow-up note.</dd></div>
              <div><dt>Watch-point</dt><dd>Check whether the same representatives dominate each meeting.</dd></div>
            </dl>
          </article>
        </section>

        <section className="m3-design-repair-card">
          <h2>Objective and activities carried forward</h2>
          <p><strong>Objective carried forward:</strong> {carriedObjective}</p>
          <ul>{carriedActivities.map((activity) => <li key={activity}>{activity}</li>)}</ul>
        </section>

        <section className="m3-design-repair-builder" aria-labelledby={`${screen.id}-activity`}>
          <div className="m3-design-repair-builder-copy">
            <h2 id={`${screen.id}-activity`}>In the Jiru Amba case, build a simple logic pathway</h2>
            <p>Use your repaired objective and activity package. Select one outcome, two outputs, three strong indicators, and one implementation watch-point. Your indicators should check change, inclusion, response, or responsible action — not only count meetings or trainings.</p>
          </div>
          <div className="m3-design-repair-builder-layout">
            <div className="m3-logic-pathway-builder-list">
              <fieldset className="m3-design-repair-fieldset">
                <legend>1. Outcome/change</legend>
                <div className="m3-design-repair-options">{screen16Outcomes.map((outcome) => {
                  const selected = selection.outcome === outcome.id;
                  return <button key={outcome.id} type="button" className={`m3-design-repair-option${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => setSingle('outcome', outcome.id)}><span aria-hidden="true">{selected ? '✓' : '○'}</span><strong>{outcome.label}</strong><small>{outcome.type}</small></button>;
                })}</div>
              </fieldset>
              <fieldset className="m3-design-repair-fieldset">
                <legend>2. Outputs</legend>
                <div className="m3-design-repair-options">{screen16Outputs.map((outputOption) => {
                  const selected = selection.outputs.includes(outputOption);
                  return <button key={outputOption} type="button" className={`m3-design-repair-option${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => toggleArrayValue('outputs', outputOption, 2)}><span aria-hidden="true">{selected ? '✓' : '○'}</span><strong>{outputOption}</strong></button>;
                })}</div>
              </fieldset>
              <fieldset className="m3-design-repair-fieldset">
                <legend>3. Indicators</legend>
                <div className="m3-design-repair-options">{screen16Indicators.map((indicator) => {
                  const selected = selection.indicators.includes(indicator.id);
                  return <button key={indicator.id} type="button" className={`m3-design-repair-option${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => toggleArrayValue('indicators', indicator.id)}><span aria-hidden="true">{selected ? '✓' : '○'}</span><strong>{indicator.label}</strong><small>{indicator.strength === 'weak' ? `Not enough alone · ${indicator.reason}` : `${indicator.type} · ${indicator.evidence}`}</small></button>;
                })}</div>
              </fieldset>
              <fieldset className="m3-design-repair-fieldset">
                <legend>4. Implementation watch-point</legend>
                <div className="m3-design-repair-options">{screen16WatchPoints.map((watchPoint) => {
                  const selected = selection.watchPoint === watchPoint;
                  return <button key={watchPoint} type="button" className={`m3-design-repair-option${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => setSingle('watchPoint', watchPoint)}><span aria-hidden="true">{selected ? '✓' : '○'}</span><strong>{watchPoint}</strong></button>;
                })}</div>
              </fieldset>
            </div>
            <aside className="m3-design-repair-preview m3-logic-pathway-preview">
              <h3>Logic pathway and indicator preview</h3>
              <p>Your pathway and mini-matrix will appear after the required selections are complete.</p>
              {showPathwayEmpty && <img src={screen16Assets.pathwayEmpty} alt="Support visual showing an empty intervention logic pathway preview." onError={() => setShowPathwayEmpty(false)} />}
              {showMatrixEmpty && <img src={screen16Assets.matrixEmpty} alt="Support visual showing an empty indicator mini-matrix preview." onError={() => setShowMatrixEmpty(false)} />}
            </aside>
          </div>
          <div className="m3-design-repair-submit-row">
            <button type="button" className="m3-design-repair-submit" disabled={!isValid} onClick={submitOutput}>{submittedOutput ? (formChanged ? 'Update design repair output' : 'Generate logic pathway and indicators') : 'Generate logic pathway and indicators'}</button>
            <p aria-live="polite">{helperText}</p>
          </div>
        </section>

        {output && (
          <section className="m3-design-repair-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Draft HRBA intervention logic pathway</h2>
            <div className="m3-logic-pathway-output">
              {[
                ['Problem/barrier', 'The Jiru Amba design risk is that activities may look inclusive while rights-holder influence, responsible actor response, access, accountability, and safe follow-up remain weak.'],
                ['Repaired objective', output.repairedObjective],
                ['Repaired activities', output.repairedActivities.join('; ')],
                ['Outputs', output.outputs.join('; ')],
                ['Outcome/change', output.outcome],
                ['Indicators and evidence', output.strongIndicators.map((indicator) => `${indicator.label} Evidence source: ${indicator.evidence}`).join(' ')],
                ['Implementation watch-point', output.watchPoint],
              ].map(([label, value], index) => <article key={label}><span>{index + 1}</span><h3>{label}</h3><p>{value}</p></article>)}
            </div>
            {output.weakIndicators.length > 0 && <div className="m3-logic-pathway-supporting"><h3>Supporting counts — not enough alone</h3>{output.weakIndicators.map((indicator) => <p key={indicator.id}>{indicator.label}: {indicator.reason}</p>)}</div>}
            <h3>Indicator Mini-Matrix</h3>
            <div className="m3-logic-pathway-matrix">
              {output.strongIndicators.map((indicator) => <article key={indicator.id}><h4>{indicator.label}</h4><p><strong>What it measures:</strong> {indicator.type}</p><p><strong>Evidence source:</strong> {indicator.evidence}</p><p><strong>Inclusion/safety check:</strong> {indicator.safety}</p></article>)}
            </div>
            <h3>What your logic now checks</h3>
            <ul className="m3-design-repair-checklist">{output.messages.map((message) => <li key={message}>✓ {message}</li>)}</ul>
          </section>
        )}

        {submittedOutput && (
          <>
            <section className="m3-design-repair-reflection">
              <h2>Optional reflection for your own CSO practice</h2>
              <label htmlFor={`${screen.id}-reflection`}>What kind of indicator do you often see that counts activities but does not show rights-based change?</label>
              <textarea id={`${screen.id}-reflection`} maxLength={360} value={optionalReflection} onChange={(event) => setOptionalReflection(event.target.value)} placeholder="Example: “Number of trainings held, without checking whether people used the training or whether barriers changed.”" />
              <p>Use general wording only. Do not enter names, complaints, exact locations, organizations, sensitive incidents, or identifiable details.</p>
            </section>
            <section className="m3-design-repair-carry-forward">
              <h2>Next: open the draft plan</h2>
              <p>You have now repaired the objective, activity package, and simple logic. Next, you will open a draft plan that looks complete and use these same checks to find hidden HRBA gaps across the plan.</p>
              <p><strong>Saved to your HRBA Project Design Improvement Snapshot:</strong> Intervention logic and indicator mini-matrix.</p>
            </section>
          </>
        )}

        <div className="m3-design-repair-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ interventionLogicIndicators: { ...submittedOutput.interventionLogicIndicators, optionalReflection: optionalReflection.trim() || undefined }, screen16: submittedOutput })}>
            {screen.continueLabel}
          </PrimaryButton>
        </div>
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
  const [helper, setHelper] = useState('Review all eight proposal sections, then generate your plan review.');
  const [showHero, setShowHero] = useState(true);
  const currentSignature = getProposalReviewSignature(review);
  const allMarked = proposalSections.every((section) => Boolean(review[section.id]));
  const needsCount = countNeedsHrbaCheck(review);
  const stale = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const canContinue = Boolean(submittedOutput && allMarked && needsCount >= 3 && !stale);

  function updateReview(sectionId: ProposalSectionId, status: ProposalReviewStatus) {
    setReview((prev) => ({ ...prev, [sectionId]: status }));
    if (submittedOutput) setHelper('Your selections changed. Update your plan review before continuing.');
  }

  function submitReview() {
    if (!allMarked) {
      setHelper('Review all eight proposal sections before generating your plan review.');
      return;
    }
    const completeReview = Object.fromEntries(proposalSections.map((section) => [section.id, review[section.id] || 'looksComplete'])) as Record<ProposalSectionId, ProposalReviewStatus>;
    const output = buildScreen17Submission(completeReview);
    setSubmittedOutput(output);
    setSubmittedSignature(getProposalReviewSignature(completeReview));
    setReview(completeReview);
    setHelper(output.proposalReviewSections.needsHrbaCheck.length < 3
      ? 'You marked fewer than three sections for HRBA check. This learning draft is designed to contain hidden HRBA gaps. Re-open the sections and check whether rights-holders, barriers, duty-bearers, participation, accountability, risk, and indicators are visible.'
      : 'Your plan review is ready to save.');
    if (typeof window !== 'undefined') window.setTimeout(() => outputHeadingRef.current?.focus(), 0);
  }

  return (
    <main className="m3-screen m3-proposal-screen" aria-labelledby={titleId}>
      <article className="m3-proposal-shell">
        <header className="m3-proposal-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-proposal-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <p>A proposal can look complete and still hide HRBA gaps. Read selected sections of the Jiru Amba draft plan and decide which sections need a closer rights-based check.</p>
        </header>

        <section className="m3-proposal-hero">
          <div className="m3-proposal-card">
            <h2>You are now reviewing the draft plan</h2>
            <p>Awra has prepared a polished draft proposal for the Jiru Amba Futures Plan. It includes a problem statement, target groups, actors, activities, inclusion language, risk notes, and indicators.</p>
            <p>That is useful. But HRBA asks a deeper design question:</p>
            <p className="m3-proposal-callout"><strong>Does the proposal show who holds rights, who bears duties, what barriers exist, how people influence decisions, and how accountability will happen?</strong></p>
            <p>In this screen, do not fix the proposal yet. First, open the draft sections and mark where a closer HRBA check is needed.</p>
          </div>
          <figure className="m3-proposal-visual">
            {showHero && <img src={proposalAssets.screen17Hero.src} alt={proposalAssets.screen17Hero.alt} onError={() => setShowHero(false)} />}
          </figure>
        </section>

        <section className="m3-proposal-grid-two">
          <article className="m3-proposal-card">
            <h2>Safe practice reminder</h2>
            <p>{proposalSafetyText}</p>
          </article>
          <article className="m3-proposal-card">
            <h2>Jiru Amba Futures Plan — Draft Proposal Excerpts</h2>
            <p>This is a simplified learning version inspired by common CSF Plus / EU-style proposal review areas such as relevance, inclusion, stakeholder engagement, intervention logic, risk, accountability, and local ownership.</p>
            <p>The draft is intentionally mixed: some parts look strong, while other parts need HRBA checking.</p>
          </article>
        </section>

        <figure className="m3-proposal-support-strip">
          <img src={proposalAssets.sequence} alt="" aria-hidden="true" />
        </figure>

        <section className="m3-proposal-builder" aria-labelledby={`${screen.id}-builder`}>
          <div className="m3-proposal-builder-head">
            <div>
              <h2 id={`${screen.id}-builder`}>Review the draft sections</h2>
              <p>Open each proposal section. For each one, choose whether it <strong>looks complete for now</strong> or <strong>needs HRBA check</strong>.</p>
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
                      <button type="button" className={`m3-proposal-choice${selected === 'looksComplete' ? ' is-selected' : ''}`} aria-pressed={selected === 'looksComplete'} onClick={() => updateReview(section.id, 'looksComplete')}>
                        <span aria-hidden="true">{selected === 'looksComplete' ? '✓' : '○'}</span>
                        <strong>Looks complete for now</strong>
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
            <button type="button" className="m3-proposal-submit" onClick={submitReview}>{submittedOutput && stale ? 'Update plan review' : 'Generate plan review'}</button>
            <p aria-live="polite">{stale ? 'Your selections changed. Update your plan review before continuing.' : helper}</p>
          </div>
        </section>

        {!submittedOutput && (
          <aside className="m3-proposal-empty-preview">
            <div>
              <h2>Proposal review preview</h2>
              <p>Your selected sections for HRBA checking will appear here after you generate the plan review.</p>
            </div>
            <img src={proposalAssets.screen17Empty} alt="" aria-hidden="true" />
          </aside>
        )}

        {submittedOutput && (
          <section className="m3-proposal-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputHeadingRef} tabIndex={-1}>Your plan review: sections to check next</h2>
            <div className="m3-proposal-output-grid">
              <article>
                <h3>Sections you marked for HRBA check</h3>
                {submittedOutput.proposalReviewSections.needsHrbaCheck.length > 0 ? (
                  <ul>{submittedOutput.proposalReviewSections.needsHrbaCheck.map((sectionId) => <li key={sectionId}>{getProposalSection(sectionId).title}</li>)}</ul>
                ) : (
                  <p>You marked no sections for HRBA check. In a real review, that may be possible, but this learning draft is designed to contain hidden HRBA gaps. Re-open the sections and check whether rights-holders, barriers, duty-bearers, participation, accountability, risk, and indicators are visible.</p>
                )}
              </article>
              <article>
                <h3>What your review suggests</h3>
                <p>{submittedOutput.reviewSuggestion}</p>
              </article>
              <article>
                <h3>Carry-forward</h3>
                <p>{submittedOutput.carryForward}</p>
              </article>
            </div>
          </section>
        )}

        <div className="m3-proposal-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ proposalReviewSections: submittedOutput.proposalReviewSections, screen17: submittedOutput })}>
            {canContinue ? screen.continueLabel : 'Select sections to continue'}
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
  const [helper, setHelper] = useState('Select gaps in at least four proposal sections, with at least six gap tags in total, before generating your proposal gap map.');
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
      return { ...prev, [sectionId]: next };
    });
    if (submittedOutput) setHelper('Your gap selections changed. Update your proposal gap map before continuing.');
  }

  function submitGapMap() {
    if (!isScreen18Valid(gapsBySection)) {
      setHelper('Select gaps in at least four proposal sections, with at least six gap tags in total, before generating your proposal gap map.');
      return;
    }
    const clean = Object.fromEntries(proposalSections.map((section) => [section.id, gapsBySection[section.id] || []])) as Partial<Record<ProposalSectionId, ProposalGapId[]>>;
    const output = buildScreen18Submission(clean);
    setSubmittedOutput(output);
    setSubmittedSignature(getGapMapSignature(clean));
    setHelper('Your proposal gap map is ready to save.');
    if (typeof window !== 'undefined') window.setTimeout(() => outputHeadingRef.current?.focus(), 0);
  }

  return (
    <main className="m3-screen m3-proposal-screen" aria-labelledby={titleId}>
      <article className="m3-proposal-shell">
        <header className="m3-proposal-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-proposal-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>{screen.title}</h1>
          <p>Now map where the draft proposal is HRBA-weak. The gap may sit in the problem statement, target groups, activities, risk section, indicators, or accountability logic.</p>
        </header>

        <section className="m3-proposal-hero">
          <div className="m3-proposal-card">
            <h2>HRBA gaps are often spread across the proposal</h2>
            <p>A weak HRBA design is not always obvious. The proposal may mention women, youth, persons with disabilities, participation, and accountability, but still fail to show how rights-holders influence decisions, how duty-bearers respond, how barriers are reduced, and how risks are managed.</p>
            <p>Use the gap map to check the pattern.</p>
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
          <p>This activity helps you review the draft plan like a rights-based project designer. You will mark which HRBA elements are missing, superficial, partly visible, or stronger across the proposal sections.</p>
        </section>

        <section className="m3-proposal-builder" aria-labelledby={`${screen.id}-builder`}>
          <div className="m3-proposal-builder-head">
            <div>
              <h2 id={`${screen.id}-builder`}>Select the HRBA gaps you see</h2>
              <p>For each proposal section that needs review, select the gap tags that best describe what is weak. Choose at least four proposal sections and at least one gap in each selected section.</p>
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
            <button type="button" className="m3-proposal-submit" onClick={submitGapMap}>{submittedOutput && stale ? 'Update proposal gap map' : 'Generate proposal gap map'}</button>
            <p aria-live="polite">{stale ? 'Your gap selections changed. Update your proposal gap map before continuing.' : helper}</p>
          </div>
        </section>

        {!submittedOutput && (
          <aside className="m3-proposal-empty-preview">
            <div>
              <h2>Proposal gap map preview</h2>
              <p>Your selected proposal sections and gap tags will appear here as a live map after generation.</p>
            </div>
            <img src={proposalAssets.screen18Empty} alt="" aria-hidden="true" />
          </aside>
        )}

        {submittedOutput && (
          <section className="m3-proposal-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputHeadingRef} tabIndex={-1}>Your HRBA Proposal Gap Map</h2>
            <p>{submittedOutput.proposalGapMap.overallPattern}</p>
            <div className="m3-proposal-map">
              {submittedGapSections.map((section) => (
                <article key={section.id} className="m3-proposal-map-card">
                  <h3>{section.title}</h3>
                  <div className="m3-proposal-chip-row">
                    {(submittedOutput.proposalGapMap.gapsBySection[section.id] || []).map((gapId) => (
                      <span key={gapId}><strong>{getProposalGap(gapId).label}</strong> · Needs repair</span>
                    ))}
                  </div>
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
              <p>{submittedOutput.carryForward}</p>
            </section>
          </section>
        )}

        <div className="m3-proposal-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ proposalGapMap: submittedOutput.proposalGapMap, screen18: submittedOutput })}>
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
  const [helper, setHelper] = useState('Select at least four repair moves before generating your repair canvas.');
  const [optionalReflection, setOptionalReflection] = useState('');
  const [showHero, setShowHero] = useState(true);
  const currentSignature = getRepairSelectionSignature(selectedSection, selectedMoves);
  const stale = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const previousGaps = previousMap?.proposalGapMap.gapsBySection[selectedSection] || [];
  const canGenerate = selectedMoves.length >= 4 && selectedMoves.length <= 6;
  const canContinue = Boolean(submittedOutput && canGenerate && !stale);

  function chooseSection(sectionId: ProposalSectionId) {
    setSelectedSection(sectionId);
    if (submittedOutput) setHelper('Your repair choices changed. Update your repair canvas before continuing.');
  }

  function toggleMove(moveId: RepairMoveId) {
    setSelectedMoves((prev) => {
      if (prev.includes(moveId)) return prev.filter((id) => id !== moveId);
      if (prev.length >= 6) {
        setHelper('Choose up to six repair moves so the repair stays focused.');
        return prev;
      }
      return [...prev, moveId];
    });
    if (submittedOutput) setHelper('Your repair choices changed. Update your repair canvas before continuing.');
  }

  function submitRepair() {
    if (selectedMoves.length < 4) {
      setHelper('Select at least four repair moves before generating your repair canvas.');
      return;
    }
    if (selectedMoves.length > 6) {
      setHelper('Choose up to six repair moves so the repair stays focused.');
      return;
    }
    const output = buildScreen19Submission(selectedSection, selectedMoves, previousGaps, optionalReflection);
    setSubmittedOutput(output);
    setSubmittedSignature(currentSignature);
    setHelper('Your repair canvas is ready to save.');
    if (typeof window !== 'undefined') window.setTimeout(() => outputHeadingRef.current?.focus(), 0);
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
              <span>Choose 4–6 moves</span>
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
            <p>Select 4–6 repair moves that would make this section more rights-based.</p>
            <div className="m3-proposal-repair-moves">
              {repairMoves.map((move) => {
                const selected = selectedMoves.includes(move.id);
                return (
                  <button key={move.id} type="button" className={`m3-proposal-chip m3-proposal-repair-chip${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => toggleMove(move.id)}>
                    <span aria-hidden="true">{selected ? '✓' : '+'}</span>
                    <strong>{move.label}</strong>
                    <small>{move.explanation}</small>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="m3-proposal-submit-row">
            <button type="button" className="m3-proposal-submit" onClick={submitRepair}>{submittedOutput && stale ? 'Update repair canvas' : 'Generate repair canvas'}</button>
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
            <h2 id={`${screen.id}-output`} ref={outputHeadingRef} tabIndex={-1}>Your Before/After HRBA Repair Canvas</h2>
            <div className="m3-proposal-repair-canvas">
              <article><span>Section repaired</span><h3>{getProposalSection(submittedOutput.proposalSectionRepair.selectedSection).title}</h3></article>
              <article><span>Before: draft version</span><p>{submittedOutput.proposalSectionRepair.beforeText}</p></article>
              <article>
                <span>Gaps addressed</span>
                {submittedOutput.proposalSectionRepair.selectedGaps.length > 0 ? (
                  <div className="m3-proposal-chip-row">{submittedOutput.proposalSectionRepair.selectedGaps.map((gapId) => <span key={gapId}>{getProposalGap(gapId).label}</span>)}</div>
                ) : (
                  <p>No previous gap tags were found for this section. Use your selected repair moves as the basis for this repair.</p>
                )}
              </article>
              <article><span>Repair moves selected</span><div className="m3-proposal-chip-row">{submittedOutput.proposalSectionRepair.selectedRepairMoves.map((moveId) => <span key={moveId}>{getRepairMove(moveId).label}</span>)}</div></article>
              <article className="m3-proposal-after">
                <span>After: stronger HRBA version</span>
                <p>{submittedOutput.proposalSectionRepair.repairedText}</p>
                <div className="m3-proposal-chip-row">{submittedOutput.proposalSectionRepair.selectedRepairMoves.map((moveId) => <span key={moveId}>What changed: {getRepairMove(moveId).label}</span>)}</div>
              </article>
              <article>
                <span>Implementation watch-point</span>
                <p>{submittedOutput.proposalSectionRepair.implementationWatchPoint}</p>
                <img className="m3-proposal-watch-strip" src={proposalAssets.watchStrip} alt="" aria-hidden="true" />
              </article>
            </div>
            <div className="m3-proposal-feedback-list">{submittedOutput.feedbackMessages.map((message) => <p key={message}>✓ {message}</p>)}</div>
            <section className="m3-proposal-reflection">
              <label htmlFor={`${screen.id}-reflection`}>Optional reflection</label>
              <p>In your own CSO work, which proposal section often looks complete but needs stronger HRBA checking? Use a general section name only. Do not include real project details.</p>
              <textarea id={`${screen.id}-reflection`} maxLength={220} value={optionalReflection} onChange={(event) => setOptionalReflection(event.target.value)} placeholder="Example: “The activity section often needs stronger links to barriers and accountability.”" />
              <small>{optionalReflection.length}/220 characters. This reflection is not required to continue.</small>
            </section>
            <section className="m3-proposal-carry-forward">
              <h3>Carry-forward</h3>
              <p>Carry this forward: your repaired section will feed the final HRBA Project Design Improvement Snapshot. In Module 4, the implementation watch-point will help you check whether the design repair is actually happening in practice.</p>
            </section>
          </section>
        )}

        <div className="m3-proposal-actions">
          <PrimaryButton disabled={!canContinue} onClick={() => submittedOutput && onComplete({ proposalSectionRepair: { ...submittedOutput.proposalSectionRepair, optionalReflection: optionalReflection.trim() || undefined }, screen19: { ...submittedOutput, optionalReflection: optionalReflection.trim() || undefined } })}>
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
  const [optionalReflection, setOptionalReflection] = useState('');
  const [submittedOutput, setSubmittedOutput] = useState<Screen10Submission | null>(null);
  const [submittedSignature, setSubmittedSignature] = useState<string | null>(null);
  const [showHeroImage, setShowHeroImage] = useState(true);
  const [showTemplateVisual, setShowTemplateVisual] = useState(true);
  const [showWorkedFlow, setShowWorkedFlow] = useState(true);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const titleId = `${screen.id}-title`;
  const taskId = `${screen.id}-task`;
  const layerOrder: ProblemLayerId[] = ['visible', 'direct', 'root', 'capacity'];
  const classifiedCount = screen10Statements.filter((statement) => selections[statement.id]).length;
  const allClassified = classifiedCount === screen10Statements.length;
  const currentSignature = JSON.stringify({ selections, optionalReflection });
  const formChanged = Boolean(submittedOutput && submittedSignature !== currentSignature);
  const previewGroups = getScreen10GroupedStatements(selections);
  const canGenerate = allClassified;
  const canContinue = Boolean(submittedOutput && allClassified && !formChanged);
  const submitLabel = submittedOutput && formChanged ? 'Update problem layers canvas' : 'Generate draft problem layers canvas';
  const helperText = !allClassified
    ? classifiedCount === 0
      ? 'Classify all eight statements to generate a useful draft problem layers canvas.'
      : 'Classify all eight statements first.'
    : submittedOutput && formChanged
      ? 'Update your problem layers canvas before saving this screen.'
    : submittedOutput && !formChanged
      ? 'Your problem layers canvas is ready to save.'
      : 'Ready to generate your draft problem layers canvas.';
  const outputSelections = submittedOutput?.problemLayerSelections || [];
  const outputLayerGroups = submittedOutput
    ? {
        visible: outputSelections.filter((selection) => selection.selectedLayer === 'visible'),
        direct: outputSelections.filter((selection) => selection.selectedLayer === 'direct'),
        root: outputSelections.filter((selection) => selection.selectedLayer === 'root'),
        capacity: outputSelections.filter((selection) => selection.selectedLayer === 'capacity'),
      }
    : null;
  const warnings = submittedOutput
    ? getScreen10Warnings(Object.fromEntries(submittedOutput.problemLayerSelections.map((selection) => [selection.statementId, selection.selectedLayer])))
    : [];

  const selectLayer = (statementId: string, layer: ProblemLayerId) => {
    setSelections((current) => ({ ...current, [statementId]: layer }));
  };

  const submitCanvas = () => {
    if (!canGenerate) return;
    const submission = buildScreen10Submission(selections, optionalReflection);
    setSubmittedOutput(submission);
    setSubmittedSignature(currentSignature);
    if (typeof window !== 'undefined') {
      window.setTimeout(() => outputRef.current?.focus(), 0);
    }
  };

  const continueWithPayload = () => {
    if (!canContinue) return;
    onComplete((formChanged ? buildScreen10Submission(selections, optionalReflection) : submittedOutput) || undefined);
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

  return (
    <main className="m3-screen m3-root-cause-map-screen" aria-labelledby={titleId}>
      <article className="m3-root-cause-map-shell">
        <header className="m3-root-cause-map-header">
          <ProgressChip>{screen.phase} · Screen {screen.screenNumber} of 22</ProgressChip>
          <p className="m3-root-cause-map-eyebrow">{screen.eyebrow}</p>
          <h1 id={titleId}>Root Cause and Capacity Gap Analysis</h1>
          <section className="m3-root-cause-map-concept" aria-labelledby={`${screen.id}-meaning`}>
            <h2 id={`${screen.id}-meaning`}>What this means</h2>
            <p>Root cause and capacity gap analysis helps a CSO move from what is visible to why the problem keeps happening. A visible sign is what we can see in the plan or process. A direct cause explains what produced that visible problem. A deeper or root cause shows the pattern underneath, such as unequal influence, weak accountability, planning habits, social norms, or unclear responsibility.</p>
            <p>A capacity gap shows what a rights-holder group, public actor, service actor, supporting actor, or CSO is not yet able, ready, resourced, or organized to do well enough.</p>
            <p>In this activity, you will practice this using the Jiru Amba case study. The aim is not to make a final assessment. The aim is to create a draft problem layers canvas that helps the project team avoid surface fixes and prepare stronger design questions.</p>
            <div className="m3-root-cause-map-concept-chips">
              {['What is visible?', 'What directly caused it?', 'What sits underneath?', 'What capacity needs attention?'].map((chip) => <span key={chip}>{chip}</span>)}
            </div>
          </section>
        </header>

        <section className="m3-root-cause-map-orientation" aria-label="Root cause and capacity gap orientation">
          <section className="m3-root-cause-map-card m3-root-cause-map-purpose" aria-labelledby={`${screen.id}-purpose`}>
            <div>
              <h2 id={`${screen.id}-purpose`}>Purpose of this activity</h2>
              <p>The purpose of this activity is to practice reading a project design problem in layers before choosing fixes.</p>
              <p>A surface fix may add another meeting, another training, or another line in the plan. A rights-based fix asks what barrier, power pattern, responsibility gap, or capacity gap must change so that rights-holders can participate, access information, influence decisions, benefit safely, and receive follow-up.</p>
              <p>Use the Jiru Amba case. Your draft is a learning output, not a final problem analysis.</p>
            </div>
            {showHeroImage && <img className="m3-root-cause-map-hero-image" src={module3RootCauseAssets.hero.src} alt={module3RootCauseAssets.hero.alt} onError={() => setShowHeroImage(false)} />}
          </section>

          <section className="m3-root-cause-map-card" aria-labelledby={`${screen.id}-example`}>
            <h2 id={`${screen.id}-example`}>Worked example</h2>
            <p>Here is how one case signal can be read in layers.</p>
            <blockquote>Women traders raised concerns about market access, but their concerns did not clearly shape the final market activity.</blockquote>
            <div className="m3-root-cause-map-example-grid">
              {[
                ['Visible sign / symptom', 'Market improvement is included, but the concerns of small traders are not clearly reflected.'],
                ['Direct cause', 'Market questions were not tested with women traders before the activity was finalized.'],
                ['Deeper/root cause', 'Market priorities may be shaped more by actors with stronger influence than by small traders who face exclusion risks.'],
                ['Capacity gap', 'The planning team and market actors need a clearer way to protect small-trader participation and turn their concerns into design changes.'],
                ['Design question', 'How will small traders influence market decisions before stalls, fees, or support activities are finalized?'],
              ].map(([label, text]) => (
                <div key={label}>
                  <span>{label}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            {showWorkedFlow && <img className="m3-root-cause-map-worked-flow" src={module3RootCauseAssets.workedFlow.src} alt={module3RootCauseAssets.workedFlow.alt} onError={() => setShowWorkedFlow(false)} />}
          </section>

          <section className="m3-root-cause-map-safe-note" aria-labelledby={`${screen.id}-safe`}>
            <h2 id={`${screen.id}-safe`}>Safe practice</h2>
            <p>Use the Jiru Amba learning case. When applying this tool to your own work, use generalized group labels only. Do not enter names, complaints, exact locations, organizations, officials, or identifying details.</p>
          </section>
        </section>

        <section className="m3-root-cause-map-builder-section" aria-labelledby={taskId}>
          <div className="m3-root-cause-map-task-header">
            <div>
              <p className="m3-root-cause-map-kicker">PROBLEM LAYERS CANVAS</p>
              <h2 id={taskId}>Practice a problem layers analysis using the Jiru Amba case</h2>
              <p>Classify all eight case-study statements. Choose one layer for each statement: Visible sign / symptom, Direct cause, Deeper/root cause, or Capacity gap. Then generate a draft problem layers canvas from your selections.</p>
              <p>This is not a memory test. The purpose is to practice separating what is visible from what causes it and what capacity needs attention.</p>
            </div>
            <span className="m3-root-cause-map-count" aria-live="polite">{classifiedCount} of 8 classified</span>
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
            <button type="button" className="m3-root-cause-map-submit-button" disabled={!canGenerate} title={!canGenerate ? 'Classify all eight statements first.' : undefined} onClick={submitCanvas}>
              {submitLabel}
            </button>
            <p aria-live="polite">{helperText}</p>
          </div>
        </section>

        {submittedOutput && outputLayerGroups && (
          <section className="m3-root-cause-map-output" aria-live="polite" aria-labelledby={`${screen.id}-output`}>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Draft problem layers canvas from your selections</h2>
            <p>Based on your selections from the Jiru Amba case, this draft canvas shows how the visible design problem connects to direct causes, deeper causes, and capacity gaps. It is a learning output, not a final problem analysis. In real project work, verify safely and avoid names, accusations, complaints, exact locations, or sensitive details.</p>
            <div className="m3-root-cause-map-output-layers">
              {layerOrder.map((layer) => (
                <section key={layer} className={`m3-root-cause-map-output-layer m3-root-cause-map-layer--${layer}`}>
                  {renderLayerHeading(layer)}
                  {outputLayerGroups[layer].length > 0 ? (
                    <div className="m3-root-cause-map-output-cards">
                      {outputLayerGroups[layer].map((selection) => {
                        const statement = screen10Statements.find((item) => item.id === selection.statementId);
                        return (
                          <article key={selection.statementId} className={selection.aligned ? 'is-useful' : 'needs-check'}>
                            <span>{selection.statementId}</span>
                            <h3>{selection.aligned ? 'Useful classification' : 'Check this layer'}</h3>
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
                  ) : <p>No statements in this layer.</p>}
                </section>
              ))}
            </div>
          </section>
        )}

        {submittedOutput && (
          <>
            <section className="m3-root-cause-map-suggestion" aria-labelledby={`${screen.id}-suggestion`}>
              <h2 id={`${screen.id}-suggestion`}>What your selections suggest</h2>
              <p>{screen10SuggestionText[submittedOutput.feedbackState]}</p>
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
            <section className="m3-root-cause-map-reflection" aria-labelledby={`${screen.id}-reflection`}>
              <h2 id={`${screen.id}-reflection`}>Optional reflection for your own CSO context</h2>
              <label>
                <span>Think about your own CSO context. What is one visible project problem that may have a deeper cause? Use a general description only. Do not enter names, complaints, exact locations, organizations, officials, or identifying details.</span>
                <textarea value={optionalReflection} onChange={(event) => setOptionalReflection(event.target.value)} placeholder="Example: women attend meetings, but their priorities do not change the activity plan." maxLength={220} />
              </label>
              <p>Keep it short. One general sentence is enough.</p>
              {optionalReflection.trim() && <p className="m3-root-cause-map-reflection-warning">Use only a general example. Do not include names, complaints, exact locations, organizations, officials, or identifying details.</p>}
            </section>
            <section className="m3-root-cause-map-carry-forward" aria-labelledby={`${screen.id}-carry`}>
              <h2 id={`${screen.id}-carry`}>Case-study learning to carry forward</h2>
              <div className="m3-root-cause-map-carry-grid">
                <div><span>Snapshot field</span><p>Barriers, root causes, and capacity gaps</p></div>
                <div><span>Issue</span><p>The Jiru Amba design may rely on visible participation and activity lists without showing the deeper causes and capacity gaps that shape access, voice, accountability, and benefit.</p></div>
                <div><span>Use on the next screen</span><p>Use this in Screen 11 to check whether gender and disability are built into the design, not only mentioned.</p></div>
              </div>
            </section>
          </>
        )}

        <div className="m3-root-cause-map-actions">
          <PrimaryButton onClick={continueWithPayload} disabled={!canContinue}>
            {screen.continueLabel}
          </PrimaryButton>
        </div>
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
    return <ActivityRepairScreen screen={screen} onComplete={onComplete} />;
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
