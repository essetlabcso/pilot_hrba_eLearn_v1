import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { LearningState } from '../../state/learningState';

type Module5RendererProps = {
  screenId: string;
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
};

type RevealItem = {
  id: string;
  title: string;
  body: string;
  tag?: string;
};

type ChoiceOption = {
  id: string;
  label: string;
  body: string;
  correct?: boolean;
};

type ScreenMode = 'multi' | 'single';

type Module5ScreenConfig = {
  screenId: string;
  context: string;
  title: string;
  lead: string;
  phase?: string;
  visualSrc?: string;
  visualAlt?: string;
  blockType: string;
  storyTitle: string;
  story: string[];
  startButton: string;
  revealTitle: string;
  revealIntro: string;
  revealItems: RevealItem[];
  activityTitle: string;
  activityPrompt: string;
  activityMode: ScreenMode;
  options: ChoiceOption[];
  feedbackStrong: string;
  feedbackSupport: string;
  insightTitle: string;
  insight: string[];
  ctaButton: string;
  nextId: string;
};

const MODULE_ID = 'module_05_hrba_meal';

export const module5IntroVideoUrl = 'https://www.youtube-nocookie.com/embed/xSHR5q_i1hU';
const module5IntroPosterSrc = '/assets/hrba/modules/module-5-redesign/m5-intro-good-numbers-poster.png';
const module5LearningReviewBoardSrc = '/assets/hrba/modules/module-5-redesign/m5-learning-review-case-board.png';
const module5MealLensMapSrc = '/assets/hrba/modules/module-5-redesign/m5-hrba-meal-lens-map.png';
const module5EvidenceLadderSrc = '/assets/hrba/modules/module-5-redesign/m5-evidence-ladder.png';
const module5IndicatorRepairSrc = '/assets/hrba/modules/module-5-redesign/m5-indicator-repair-cards.png';
const module5SafeDataTreeSrc = '/assets/hrba/modules/module-5-redesign/m5-safe-inclusive-data-tree.png';
const module5FeedbackLoopSrc = '/assets/hrba/modules/module-5-redesign/m5-feedback-complaints-loop.png';
const module5DonorStoryInboxSrc = '/assets/hrba/modules/module-5-redesign/m5-donor-story-request-inbox.png';
const module5AdaptationDecisionTreeSrc = '/assets/hrba/modules/module-5-redesign/m5-adaptation-decision-tree.png';
const module5ReportRepairCardsSrc = '/assets/hrba/modules/module-5-redesign/m5-report-repair-cards.png';
const module5CapstoneSimulatorSrc = '/assets/hrba/modules/module-5-redesign/m5-capstone-evidence-simulator-board.png';
const module5RepairNoteWorksheetSrc = '/assets/hrba/modules/module-5-redesign/m5-repair-note-worksheet.png';
const module5ActionJourneySrc = '/assets/hrba/modules/module-5-redesign/m5-90day-action-journey.png';
const module5IntroVideoTitle = 'The Numbers Look Good, But Who Is Missing?';
const module5IntroBridgeCards = [
  {
    title: 'What the numbers show',
    body: 'Activities completed, people reached, meetings held, forms collected, reports prepared.',
  },
  {
    title: 'What the numbers may hide',
    body: 'Unequal access, quiet voices, missing groups, unsafe feedback, unanswered concerns, or weak change.',
  },
  {
    title: 'What HRBA MEAL adds',
    body: 'Evidence is used to improve inclusion, response, adaptation, truthful reporting, and account-back.',
  },
];
const module5IntroTranscript = `At first, the report looked strong.

Activities were completed. People were reached. Meetings were held. Feedback was collected. The report was almost ready.

But then one question changed the review:

What do the numbers not show?

The team looked again.

Who was missed? Who had voice? Was feedback answered? Was evidence collected safely? What changed for people? And what still needs to change?

This is where HRBA-informed MEAL begins.

It does not reject numbers. It asks better questions around them.

It tracks inclusion. It listens safely. It interprets evidence with rights-holders. It uses feedback to guide action.

When evidence shows a barrier, the team adapts. When feedback raises a concern, the team responds or refers. When reporting progress, the team protects dignity and tells the truth.

And accountability does not end with a donor report.

The CSO also accounts back to the community: what was heard, what changed, what is not solved yet, and what happens next.

In Module 5, you will practice using evidence for accountability, learning, and safer rights-based action.`;

const module5Routes: Record<string, string> = {
  'M5-R01': '/module-5/screen-5-1',
  'M5-R02': '/module-5/screen-5-2',
  'M5-R03': '/module-5/screen-5-3',
  'M5-R04': '/module-5/screen-5-4',
  'M5-R05': '/module-5/screen-5-5',
  'M5-R06': '/module-5/screen-5-6',
  'M5-R07': '/module-5/screen-5-7',
  'M5-R08': '/module-5/screen-5-8',
  'M5-R09': '/module-5/screen-5-9',
  'M5-R10': '/module-5/screen-5-10',
  'M5-R11': '/module-5/screen-5-11',
  'M5-R12': '/module-5/screen-5-12',
  'M5-R13': '/module-5/screen-5-13',
  'M5-R14': '/module-5/screen-5-14',
  'M5-S1-01': '/module-5/screen-5-1',
  'M5-S1-02': '/module-5/screen-5-2',
  'M5-S1-03': '/module-5/screen-5-3',
  'M5-S1-04': '/module-5/screen-5-4',
  'M5-S1-05': '/module-5/screen-5-5',
  'M5-S1-06': '/module-5/screen-5-6',
  'M5-S1-07': '/module-5/screen-5-7',
  'M5-S1-07A': '/module-5/screen-5-7a',
  'M5-S1-07B': '/module-5/screen-5-7b',
  'M5-S1-07C': '/module-5/screen-5-7c',
  'M5-S1-08': '/module-5/screen-5-8',
  'M5-S1-09': '/module-5/screen-5-9',
  'M5-S1-09A': '/module-5/screen-5-9a',
  'M5-S1-09B': '/module-5/screen-5-9b',
  'M5-S1-09C': '/module-5/screen-5-9c',
  'M5-S1-09D': '/module-5/screen-5-9d',
  'M5-S1-10': '/module-5/screen-5-10',
  'M5-S1-11': '/module-5/screen-5-11',
  'M5-S1-12': '/module-5/screen-5-12',
  'M5-S1-13': '/module-5/screen-5-13',
  'M5-S1-14': '/module-5/screen-5-14',
  'M5-S1-15': '/module-5/screen-5-15',
  'M5-S1-15A': '/module-5/screen-5-15a',
  'M5-S1-16': '/module-5/screen-5-16',
  'M5-S1-17': '/module-5/screen-5-17',
  'M5-S1-18': '/module-5/screen-5-18',
  'M5-S1-19': '/module-5/screen-5-19',
  'M5-S1-20': '/module-5/screen-5-20',
  'M5-S1-21': '/module-5/screen-5-21',
  'M5-S1-22': '/module-5/screen-5-22',
  'M5-S1-23': '/module-5/screen-5-23',
  'M5-S1-24': '/module-5/screen-5-24',
  'M5-S1-25': '/module-5/screen-5-25',
  'M5-PLAYER-COMPLETE': '/module-5/complete',
};

const polishedLabScreenThemes: Record<string, string> = {
  'M5-S1-04': 'm5-screen--evidence-shift',
  'M5-S1-05': 'm5-screen--evidence-classify',
  'M5-S1-06': 'm5-screen--indicator-repair',
  'M5-S1-07': 'm5-screen--indicator-set',
  'M5-S1-07A': 'm5-screen--gender-evidence',
  'M5-S1-07B': 'm5-screen--gender-marker',
  'M5-S1-07C': 'm5-screen--gender-repair',
  'M5-S1-08': 'm5-screen--data-safety',
  'M5-S1-09': 'm5-screen--safe-disaggregation',
  'M5-S1-09A': 'm5-screen--disability-evidence',
  'M5-S1-09B': 'm5-screen--disability-marker',
  'M5-S1-09C': 'm5-screen--disability-data',
  'M5-S1-09D': 'm5-screen--disability-practice',
  'M5-S1-10': 'm5-screen--feedback-evidence',
  'M5-S1-11': 'm5-screen--feedback-action',
};

function setRoute(path: string) {
  if (typeof window !== 'undefined') window.history.pushState(null, '', path);
}

function practiceKey(screenId: string) {
  return `module5_${screenId.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
}

function updatePracticeState(prev: LearningState, key: string, value: Record<string, unknown>) {
  return {
    ...prev.practiceCheckState,
    [key]: {
      ...(prev.practiceCheckState[key] || {}),
      ...value,
    },
  };
}

function completeSimpleScreen(
  currentId: string,
  nextId: string,
  nextRoute: string,
  onChangeState: Module5RendererProps['onChangeState'],
  practiceKeyName: string,
  value: Record<string, unknown> = {},
) {
  onChangeState((prev) => {
    const progress = new Set(prev.screenProgress[MODULE_ID] || []);
    progress.add(currentId);

    return {
      ...prev,
      currentScreenId: nextId,
      screenProgress: {
        ...prev.screenProgress,
        [MODULE_ID]: Array.from(progress),
      },
      practiceCheckState: updatePracticeState(prev, practiceKeyName, {
        status: 'completed',
        completedAt: new Date().toISOString(),
        ...value,
      }),
    };
  });
  setRoute(nextRoute);
}

function ModuleContextLabel({ children }: { children: string }) {
  return <p className="m5-context-label">{children}</p>;
}

function ScreenTitle({ id, children, lead }: { id: string; children: string; lead: string }) {
  return (
    <div className="m5-title-block">
      <h1 id={id}>{children}</h1>
      <p>{lead}</p>
    </div>
  );
}

function ProgressChip({ children }: { children: ReactNode }) {
  return (
    <span className="m5-progress-chip" aria-live="polite">
      {children}
    </span>
  );
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
    <button type="button" className="m5-primary-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

const module5ObjectiveCards = [
  {
    number: '01',
    title: 'Diagnose evidence gaps in a MEAL report',
    text: 'Look beyond activities completed, people reached, and meetings held to ask who may be missing, what evidence is incomplete, and what accountability questions remain.',
    accent: 'blue',
  },
  {
    number: '02',
    title: 'Repair indicators and logframe evidence',
    text: 'Improve weak activity-count indicators so they can show access, participation, feedback response, safety, accountability, and change.',
    accent: 'green',
  },
  {
    number: '03',
    title: 'Choose safe and inclusive evidence',
    text: 'Use enough evidence to see barriers and exclusion, but avoid unnecessary names, exact locations, sensitive details, or small-cell information that could identify people.',
    accent: 'gold',
  },
  {
    number: '04',
    title: 'Strengthen feedback and response mechanisms',
    text: 'Treat feedback as accountability evidence only when it is safely received, reviewed, responded to or referred, used for adaptation, and explained back.',
    accent: 'blue',
  },
  {
    number: '05',
    title: 'Interpret evidence and adapt action',
    text: 'Use monitoring data, feedback, and qualitative evidence to decide what should continue, change, be discussed safely, be referred, or be reported with limits.',
    accent: 'green',
  },
  {
    number: '06',
    title: 'Report truthfully and build a repair note',
    text: 'Avoid overclaiming. Report progress, limits, barriers, adaptations, and next steps, then create a practical HRBA MEAL repair note for future CSO practice.',
    accent: 'gold',
  },
];

const reportGapOptions: ChoiceOption[] = [
  {
    id: 'missed',
    label: 'Who was missed or excluded?',
    body: 'The report does not show who could not attend or who may have been left out because of distance, timing, disability, language, safety, stigma, gender roles, displacement, poverty, or local power dynamics.',
    correct: true,
  },
  {
    id: 'influence',
    label: 'Whether participation influenced decisions',
    body: 'The report counts community meetings, but it does not show whether community input changed the activity plan, venue, facilitation method, messages, referral information, or follow-up actions.',
    correct: true,
  },
  {
    id: 'painted',
    label: 'Whether the feedback box was painted clearly',
    body: 'The color of the box is an administrative detail. It is not the main HRBA evidence gap.',
  },
  {
    id: 'feedback',
    label: 'Whether feedback was received, analyzed, answered, and reported back',
    body: 'The report mentions a feedback box, but it does not show what feedback came in, who could access the channel, what the team did with the feedback, or whether communities heard back.',
    correct: true,
  },
  {
    id: 'gender',
    label: 'Whether different groups experienced different barriers or benefits',
    body: 'The report does not show whether gender roles, safety concerns, time burden, care responsibilities, decision-making power, or social norms affected participation and benefits.',
    correct: true,
  },
  {
    id: 'disability',
    label: 'Whether persons with disabilities could access and influence the activities',
    body: 'The report does not show whether persons with disabilities could access the venue, information, facilitation, communication channels, feedback system, or follow-up support.',
    correct: true,
  },
  {
    id: 'template',
    label: 'Whether the team used the newest reporting template',
    body: 'A good template can help, but using the newest template does not prove inclusion, accountability, safe evidence, or rights-based change.',
  },
  {
    id: 'safety',
    label: 'Whether stories and data were collected safely',
    body: 'The report mentions success stories, but it does not show whether people gave informed consent, whether details were anonymized, or whether sharing the story could create risk.',
    correct: true,
  },
  {
    id: 'change',
    label: 'Whether anything changed beyond attendance',
    body: 'The report says awareness improved, but it does not show what changed in knowledge, confidence, access, participation, accountability, duty-bearer response, or practice.',
    correct: true,
  },
  {
    id: 'adapted',
    label: 'Whether the project team adapted based on evidence',
    body: 'The report does not show whether the team changed anything after noticing barriers, feedback, exclusion, risk, or weak participation.',
    correct: true,
  },
];

const m5R03EvidenceGapOptions = [
  {
    id: 'missing-groups',
    label: 'Which Jiru Amba groups were reached and which may still be missing',
    meaning: 'Attendance is useful, but the team still needs to know whether some groups were not reached or not able to participate.',
    correct: true,
  },
  {
    id: 'different-barriers',
    label: 'Whether different groups faced different barriers',
    meaning: 'The report should check barriers for women vendors, persons with disabilities, women water users, youth, remote kebeles, older people, or low-income households.',
    correct: true,
  },
  {
    id: 'participation-influence',
    label: 'Whether participation influenced decisions',
    meaning: 'Attendance is not the same as voice, agency, or influence over priorities, timing, service issues, or follow-up decisions.',
    correct: true,
  },
  {
    id: 'feedback-answered',
    label: 'Whether feedback was reviewed and answered',
    meaning: 'A feedback box is not accountability unless feedback is safely reviewed, responded to, referred, used for adaptation, and explained back.',
    correct: true,
  },
  {
    id: 'safe-evidence',
    label: 'Whether evidence was collected and reported safely',
    meaning: 'Stories, complaint themes, disability-related information, and small-group details may expose people if handled carelessly.',
    correct: true,
  },
  {
    id: 'changed-beyond-attendance',
    label: 'Whether anything changed beyond attendance',
    meaning: 'The report should show changes in access, service response, participation quality, confidence, practice, or accountability.',
    correct: true,
  },
  {
    id: 'account-back',
    label: 'Whether communities heard what happened next',
    meaning: 'Account-back should explain what was heard, what changed, what did not change, why, and next steps.',
    correct: true,
  },
  {
    id: 'positive-stories',
    label: 'Whether the report has enough positive stories',
    meaning: 'More positive stories do not make the report more rights-based and can create pressure for unsafe evidence.',
    correct: false,
    unsafe: true,
  },
  {
    id: 'bigger-attendance',
    label: 'Whether the attendance number can be made bigger',
    meaning: 'Bigger numbers alone do not show inclusion, influence, safety, response, or change.',
    correct: false,
    unsafe: true,
  },
  {
    id: 'donor-polish',
    label: 'Whether the report sounds successful enough for the donor',
    meaning: 'HRBA reporting should be truthful, safe, and useful for learning and accountability, not only polished.',
    correct: false,
    unsafe: true,
  },
];

const m5R04LensQuestions = [
  {
    id: 'rights-holders',
    label: 'Rights-holders',
    question: 'Who is affected, and who may still be missing?',
    check: 'Whether MEAL evidence identifies specific groups, not only “the community.”',
    awra: 'Awra should not only report “240 people attended.” It should check which groups were reached and which may still be missing, such as informal women vendors, persons with disabilities, women water users, youth, remote kebele residents, older people, or low-income households.',
  },
  {
    id: 'barriers',
    label: 'Barriers',
    question: 'What barriers affect access, voice, safety, or benefit?',
    check: 'Whether evidence explains why some groups participate less or benefit differently.',
    awra: 'Awra should look for timing, venue, mobility, language, cost, information, safety, stigma, and local power barriers that may shape who attends and who benefits.',
  },
  {
    id: 'participation',
    label: 'Participation',
    question: 'Did participation influence decisions?',
    check: 'Whether participation means agency and influence, not only attendance.',
    awra: 'Awra should ask whether women water users, youth, remote kebele residents, persons with disabilities, and other rights-holders influenced priorities, timing, service issues, or follow-up decisions.',
  },
  {
    id: 'feedback',
    label: 'Feedback',
    question: 'Was feedback reviewed, answered, referred, or used?',
    check: 'Whether feedback becomes accountability evidence, not just a box or count.',
    awra: 'Awra should check whether feedback was safely reviewed, whether concerns were answered or referred, and whether feedback changed facilitation, access, service engagement, or account-back.',
  },
  {
    id: 'safety',
    label: 'Safety',
    question: 'Can this evidence be used without exposing people?',
    check: 'Whether data, stories, complaints, and small-group details are handled safely.',
    awra: 'Awra should avoid names, exact locations, complaint details, identifiable stories, disability diagnoses, or small-cell details that could expose people or create pressure to share positive stories.',
  },
  {
    id: 'change',
    label: 'Change',
    question: 'What changed beyond activities completed?',
    check: 'Whether evidence shows access, quality, confidence, response, inclusion, or accountability change.',
    awra: 'Awra should look beyond meetings completed and attendance to ask what changed in access, confidence, participation quality, service response, accountability, or team practice.',
  },
  {
    id: 'responsible-actors',
    label: 'Responsible actors',
    question: 'Who needs to respond, adapt, or follow up?',
    check: 'Whether the report connects evidence to CSO action, partner action, referral, or duty-bearer responsibility.',
    awra: 'Awra can improve evidence, facilitation, feedback response, safe reporting, referral, adaptation, and constructive engagement with relevant actors, while not replacing duty-bearer obligations.',
  },
  {
    id: 'account-back',
    label: 'Account-back',
    question: 'What should be explained back to rights-holders and communities?',
    check: 'Whether the team communicates what was heard, what changed, what did not, why, and next steps.',
    awra: 'Awra should explain what the team heard, what changed, what could not be changed yet, why, and what will happen next in a safe, accessible way.',
  },
];

const hrbaMealLens = [
  ['Inclusion', 'Who was reached, who was missed, and which groups need intentional attention?'],
  ['Participation and influence', 'Did people only attend, or did their views shape decisions and adaptation?'],
  ['Feedback and accountability', 'Was feedback received, analyzed, answered, and reported back?'],
  ['Gender and disability', 'Did evidence make gendered barriers and accessibility barriers visible enough to respond?'],
  ['Safety and dignity', 'Was data collected and reported with consent, minimum detail, and protection from harm?'],
  ['Change and learning', 'What changed beyond activities, and what should the project adapt next?'],
];

const indicatorDimensions = [
  ['Inclusion', 'Does the indicator help the team see who was reached and who may have been missed?'],
  ['Meaningful participation', 'Does it show whether people only attended or whether their views influenced decisions?'],
  ['Accountability', 'Does it show whether feedback, complaints, or concerns were reviewed, answered, and reported back?'],
  ['Gender sensitivity', 'Does it help the team understand gendered barriers, risks, participation patterns, benefits, or changes?'],
  ['Disability inclusion', 'Does it show whether persons with disabilities could access, participate, give feedback, and benefit?'],
  ['Safety and dignity', 'Does it avoid pushing the team to collect unsafe personal details?'],
  ['Change', 'Does it show whether something changed beyond attendance?'],
  ['AAAQ', 'Where services or support are involved, does it help ask whether these are available, accessible, acceptable, and quality-assured?'],
];

const safetyStoryDetails = [
  ['Name and exact small community', 'These details can make a person identifiable, especially in small-cell situations or when combined with age, displacement, disability information, photos, or quotes.'],
  ['Disability-related detail', 'Only collect and report disability-related information when it has a clear access or inclusion purpose and can be protected.'],
  ['Direct quote about fear', 'A quote can create risk if it points to power dynamics, criticism, or private safety concerns.'],
  ['Photo from the session', 'Images can identify people and link them to sensitive experiences unless informed consent, safe refusal, and safe use are clear.'],
];

function makeReveal(items: string[][]): RevealItem[] {
  return items.map(([title, body], index) => ({
    id: `${index + 1}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title,
    body,
  }));
}

function makeOptions(items: string[], correctIndex = 0): ChoiceOption[] {
  return items.map((label, index) => ({
    id: `option-${index + 1}`,
    label,
    body: index === correctIndex
      ? 'This choice keeps the evidence useful, respectful, and connected to learning and adaptation.'
      : 'This choice may be incomplete, too focused on activity counting, or not safe enough for HRBA MEAL.',
    correct: index === correctIndex,
  }));
}

function baseConfig(spec: {
  id: string;
  title: string;
  lead?: string;
  phase?: string;
  visualSrc?: string;
  visualAlt?: string;
  block: string;
  storyTitle: string;
  story: string[];
  revealTitle: string;
  revealItems: string[][];
  activityTitle: string;
  activityPrompt: string;
  options: ChoiceOption[];
  mode?: ScreenMode;
  feedbackStrong?: string;
  feedbackSupport?: string;
  insight: string[];
  cta: string;
  nextId: string;
}): Module5ScreenConfig {
  return {
    screenId: spec.id,
    context: 'Module 5 · HRBA in MEAL',
    title: spec.title,
    lead: spec.lead || 'Use this focused MEAL canvas to look beyond activity numbers and decide what evidence should guide responsible learning.',
    phase: spec.phase,
    visualSrc: spec.visualSrc,
    visualAlt: spec.visualAlt,
    blockType: spec.block,
    storyTitle: spec.storyTitle,
    story: spec.story,
    startButton: 'Open the learning canvas',
    revealTitle: spec.revealTitle,
    revealIntro: 'Open each item, then make the MEAL judgment.',
    revealItems: makeReveal(spec.revealItems),
    activityTitle: spec.activityTitle,
    activityPrompt: spec.activityPrompt,
    activityMode: spec.mode || 'single',
    options: spec.options,
    feedbackStrong: spec.feedbackStrong || 'Good judgment. You looked for evidence that is useful, respectful, safe, and able to guide adaptation.',
    feedbackSupport: spec.feedbackSupport || 'Look again for the option that best protects people, explains barriers, answers feedback, and supports learning.',
    insightTitle: 'HRBA MEAL insight',
    insight: spec.insight,
    ctaButton: spec.cta,
    nextId: spec.nextId,
  };
}

const module5RevisedScreens: Record<string, Module5ScreenConfig> = {
  'M5-R01': baseConfig({
    id: 'M5-R01',
    title: 'The Numbers Look Good, But Who Is Missing?',
    phase: 'See the problem',
    block: 'Video / Transcript',
    storyTitle: 'A report that looks strong',
    story: [
      'The opening video introduces a familiar MEAL moment: activities are complete, attendance is high, meetings were held, feedback was collected, and the report is nearly ready.',
      'The numbers are useful. They show what the CSO did. But they do not yet show who was missed, who had voice, whether feedback was answered, whether evidence was safe, or what changed.',
      'In Module 5, you will practice using evidence for accountability and learning, not only for reporting upward.',
    ],
    revealTitle: 'Opening questions',
    revealItems: [
      ['Good numbers are useful', 'Outputs, attendance, meetings, and story counts help the team understand what happened. HRBA MEAL keeps them, but does not stop there.'],
      ['Numbers can hide gaps', 'A report can look successful while still missing exclusion, weak participation, unanswered feedback, unsafe evidence, or unclear change.'],
      ['Evidence should guide action', 'Rights-based MEAL asks what the evidence shows, what it hides, what should adapt, and what the CSO should explain back.'],
    ],
    activityTitle: 'Begin the module',
    activityPrompt: 'What is the main shift in this module?',
    options: makeOptions([
      'Use evidence to understand inclusion, accountability, safety, learning, and change.',
      'Replace all numbers with stories.',
      'Focus only on the donor reporting template.',
    ]),
    insight: ['HRBA MEAL does not reject numbers. It asks better questions around them so evidence can guide safer action, adaptation, and account-back.'],
    cta: 'Continue to Screen 5.2',
    nextId: 'M5-R02',
  }),
  'M5-R02': baseConfig({
    id: 'M5-R02',
    title: 'What Is Missing from the Report?',
    phase: 'See the problem · Diagnose the gap',
    lead: 'Diagnose what a strong-looking activity report still does not show about inclusion, participation, feedback, safety, and change.',
    visualSrc: module5LearningReviewBoardSrc,
    visualAlt: 'Illustrated evidence review board with activity numbers, participation notes, feedback themes, access barriers, facilitator notes, and an adapt-next area.',
    block: 'Multi-select Evidence Gap Diagnosis',
    storyTitle: 'The report almost looks ready',
    story: [
      'Birhan Community Action\'s report is not false. It is incomplete. The team needs to ask what the evidence does not yet show.',
      'A fictional local CSO report says activities were completed, attendance was high, meetings were held, a feedback box was installed, and stories were collected.',
      'The report is not useless. It can show outputs. But before the team submits it, they need to ask what the evidence does not yet show.',
      'Look for gaps about inclusion, influence, feedback response, safe evidence, change, and account-back.',
    ],
    revealTitle: 'What output reporting can miss',
    revealItems: [
      ['Who was excluded', 'Attendance totals do not show who could not attend, who did not feel safe to speak, or who was blocked by timing, mobility, language, stigma, or cost.'],
      ['Who had influence', 'Meeting counts do not show whether rights-holders shaped decisions or only listened.'],
      ['Whether feedback was answered', 'Installing a feedback box does not prove that feedback was received, analyzed, answered, referred, acted on, or reported back.'],
      ['Whether evidence was safe', 'Stories, quotes, photos, and small-group data can expose people if consent, anonymity, and minimum detail are not handled carefully.'],
      ['What changed', 'Outputs do not show whether knowledge, access, confidence, service response, participation, or accountability changed.'],
    ],
    activityTitle: 'Diagnose the report gaps',
    activityPrompt: 'Which important HRBA evidence gaps are missing from this report?',
    mode: 'multi',
    options: [
      { id: 'gap-missed', label: 'Who was missed or excluded?', body: 'This looks beyond attendance totals to barriers and exclusion.', correct: true },
      { id: 'gap-influence', label: 'Whether participation influenced decisions', body: 'This asks whether people had voice and influence, not only attendance.', correct: true },
      { id: 'gap-feedback', label: 'Whether feedback was received, analyzed, answered, and reported back', body: 'This checks whether feedback became accountability evidence.', correct: true },
      { id: 'gap-different-barriers', label: 'Whether different groups experienced different barriers or benefits', body: 'This makes gendered, age-related, displacement, and other patterns visible without identifying people.', correct: true },
      { id: 'gap-disability', label: 'Whether persons with disabilities could access and influence activities', body: 'This checks accessibility, participation, reasonable accommodation, and influence.', correct: true },
      { id: 'gap-safe-evidence', label: 'Whether stories and data were collected safely', body: 'This protects people from harm through consent, privacy, and minimum necessary detail.', correct: true },
      { id: 'gap-change', label: 'Whether anything changed beyond attendance', body: 'This looks for learning, adaptation, and changes in practice or access.', correct: true },
      { id: 'gap-painted-box', label: 'Whether the feedback box was painted clearly', body: 'Presentation may help visibility, but it does not prove feedback was answered.', correct: false },
      { id: 'gap-template', label: 'Whether the team used the newest reporting template', body: 'Templates can help structure reporting, but they do not prove rights-based change.', correct: false },
      { id: 'gap-photos', label: 'Whether the report has enough photos', body: 'Photos may create risk and do not prove accountability, safety, or change.', correct: false },
    ],
    feedbackStrong: 'Strong diagnosis. You selected the main HRBA gaps and avoided administrative distractors. Your choices covered inclusion, participation, feedback response, safe evidence, change, and adaptation.',
    feedbackSupport: 'Useful start. Check whether your answer covers the full evidence picture: inclusion, participation influence, feedback response, safe stories and data, different barriers for different groups, disability access, and change beyond attendance.',
    insight: ['A strong-looking report may still be incomplete. HRBA MEAL asks what the report shows, what it hides, what evidence is safe to use, and what action should follow.'],
    cta: 'Continue to Screen 5.3',
    nextId: 'M5-R03',
  }),
  'M5-R03': baseConfig({
    id: 'M5-R03',
    title: 'The HRBA MEAL Lens',
    phase: 'Learn the tool · HRBA MEAL lens',
    lead: 'Use six practical questions to review whether evidence supports accountability and learning, not only activity reporting.',
    visualSrc: module5MealLensMapSrc,
    visualAlt: 'Diagram of the HRBA MEAL lens with six areas: inclusion, participation, feedback, safety, change, and account back.',
    block: 'Six-Part HRBA MEAL Lens',
    storyTitle: 'A practical review tool',
    story: [
      'The team needs a simple way to review reports, indicators, feedback, stories, and learning notes. The HRBA MEAL lens keeps six questions visible.',
      'Each question helps the CSO decide what the evidence means, what may need to change, and what should be explained back to communities.',
      'Tool note: This lens translates HRBA principles into MEAL questions: inclusion, participation, non-discrimination, accountability, transparency, safety, and meaningful influence.',
      'The CSO does not replace duty-bearers. It uses evidence to support participation, responsible engagement, learning, and accountability.',
    ],
    revealTitle: 'Open all six lens questions',
    revealItems: [
      ['Inclusion', 'Who was reached, who was missed, and what barriers explain the difference?'],
      ['Participation', 'Who only attended, and who influenced decisions?'],
      ['Feedback', 'What feedback or complaints were received, answered, referred, or acted on?'],
      ['Safety', 'What data, stories, or details could expose people to harm?'],
      ['Change', 'What changed for people beyond activities completed?'],
      ['Account Back', 'What will the CSO explain back to communities about what was heard, changed, not solved, and next?'],
    ],
    activityTitle: 'Use the lens',
    activityPrompt: 'Which question best turns monitoring into HRBA-informed learning?',
    options: makeOptions([
      'What does the evidence show about exclusion, feedback, adaptation, and what we must account back?',
      'How can we make the report shorter?',
      'How many photos can we add to show activity?',
    ]),
    feedbackStrong: 'Yes. HRBA-informed learning connects evidence to exclusion, feedback, adaptation, and account-back.',
    feedbackSupport: 'Look for the question that links evidence to who may be excluded, what feedback requires, what should adapt, and what the CSO should explain back.',
    insight: ['The HRBA MEAL lens is a practical review tool. It turns monitoring evidence into questions about people, barriers, safety, change, learning, and account-back.'],
    cta: 'Continue to Screen 5.3',
    nextId: 'M5-R04',
  }),
  'M5-R04': baseConfig({
    id: 'M5-R04',
    title: 'From Counting to Learning About Change',
    phase: 'Learn the tool · Evidence ladder',
    lead: 'Classify evidence examples on the ladder from outputs toward reach, quality, change, and learning/accountability.',
    visualSrc: module5EvidenceLadderSrc,
    visualAlt: 'Evidence ladder showing outputs, reach, quality, change, and learning and accountability.',
    block: 'Evidence Ladder Classification',
    storyTitle: 'The evidence ladder',
    story: [
      'Counting activities is useful. It tells the team what was done. But HRBA MEAL also asks who participated, how people experienced activities, what changed, and what the CSO learned or explained back.',
    ],
    revealTitle: 'Evidence ladder levels',
    revealItems: [
      ['Outputs', 'What was done: sessions, meetings, materials, referrals, tools installed, or stories collected.'],
      ['Reach', 'Who accessed or participated, including who may have been missed.'],
      ['Quality / inclusion barrier', 'How people experienced the activity, including access, dignity, safety, language, timing, and relevance.'],
      ['Change', 'What changed in knowledge, access, confidence, behavior, service response, or participation.'],
      ['Learning / accountability', 'What the CSO adapted, answered, referred, or explained back.'],
    ],
    activityTitle: 'Classify each evidence example on the ladder',
    activityPrompt: 'Choose the strongest ladder level for each example.',
    options: makeOptions(['Classify all examples using the evidence ladder.', 'Count only the activities completed.']),
    insight: [
      'Output evidence is not bad. It is incomplete without reach, quality, change, learning, and accountability evidence.',
      'Counting is not wrong. It becomes stronger when the CSO also checks reach, access quality, barriers, change, learning, and accountability back to rights-holders.',
      'Reflect: which level is usually weakest in your current reporting practice?',
    ],
    cta: 'Continue to Screen 5.3',
    nextId: 'M5-R05',
  }),
  'M5-R05': baseConfig({
    id: 'M5-R05',
    title: 'Indicator Repair Lab',
    phase: 'Practice clinic · Repair indicators',
    lead: 'Repair weak activity indicators into signals that can show inclusion, participation, feedback, safety, and change.',
    visualSrc: module5IndicatorRepairSrc,
    visualAlt: 'Indicator repair lab visual showing weak activity indicators converted into stronger HRBA-informed indicators.',
    block: 'Indicator Repair Lab',
    storyTitle: 'A stronger-looking MEAL table still needs repair',
    story: [
      'A local CSO has a strong-looking MEAL table. It counts sessions delivered, people reached, forms collected, and stories gathered.',
      'The team now needs to improve the indicators so they can learn whether the project is inclusive, safe, accountable, and changing practice.',
      'A stronger HRBA indicator should help the team see more than activity completion. It should show access, barriers, participation influence, feedback response, safety, change, or learning.',
    ],
    revealTitle: 'Indicator repair checks',
    revealItems: [
      ['Count is useful, but incomplete', 'Counting sessions and attendance helps, but does not show who was excluded, what changed, or what the team should adapt.'],
      ['Reach must include barriers', 'Reached numbers should be connected to barriers such as timing, cost, distance, language, communication, disability access, safety, or care responsibilities.'],
      ['Participation means influence', 'Attendance is not enough. The indicator should show whether people influenced decisions or changes.'],
      ['Feedback needs response', 'A feedback box is not accountability unless feedback is reviewed, answered, referred, acted on, and explained back.'],
      ['Safety is part of quality', 'Evidence should avoid names, exact locations, sensitive details, or anything that could expose people to harm.'],
      ['Know the CSO boundary', 'The CSO should adapt its own work, engage a responsible actor, refer safely, or explain limits honestly when a rights issue is beyond its mandate.'],
      ['Use minimum necessary data', 'Do not repair an indicator by asking for unnecessary names, diagnoses, exact locations, complaint details, or identifiable stories.'],
    ],
    activityTitle: 'Repair the weak indicators',
    activityPrompt: 'Choose the stronger HRBA-informed indicator and what it reveals.',
    options: makeOptions(['Repair each indicator so it can show inclusion, participation, feedback, safety, and change.', 'Keep the activity counts as the main evidence.']),
    insight: ['A stronger indicator is useful because it can trigger action: adapt the activity, engage a responsible actor, refer safely, account back, or name limits honestly.'],
    cta: 'Continue to Screen 5.3',
    nextId: 'M5-R06',
  }),
  'M5-R06': baseConfig({
    id: 'M5-R06',
    title: 'Strengthening Indicators and Logframe Evidence',
    phase: 'Practice screen · Indicators and logframe evidence',
    lead: 'Indicators help a CSO decide what evidence to collect and how progress will be judged. But some indicators only count activities. HRBA-informed indicators also help the team see whether people can access services or activities, participate meaningfully, give feedback safely, receive a response, and experience change.',
    visualSrc: module5IndicatorRepairSrc,
    visualAlt: 'Visual showing weak activity indicators being improved into stronger HRBA-informed indicators linked to inclusion, participation, accountability, safety, and dignity.',
    block: 'Indicator Improvement',
    storyTitle: 'From evidence gaps to stronger indicators',
    story: [
      'Awra’s Jiru Amba report counted meetings, attendance, feedback boxes, and stories. Those numbers are useful, but they do not tell the full MEAL story.',
      'Stronger indicators should help Awra see who was included, what barriers remained, whether feedback was answered, and what changed.',
    ],
    revealTitle: 'Indicator improvement rule',
    revealItems: [
      ['What are we counting?', 'Activity, reach, access, participation, response, safety, or change?'],
      ['Who should we be able to see safely?', 'Which groups may experience the activity differently, and what can be shown without identifying people?'],
      ['What evidence source is realistic?', 'Attendance record, feedback theme, observation note, short survey, review meeting, referral log, or account-back record?'],
      ['What decision will this evidence guide?', 'Continue, adapt, refer, engage responsible actors, improve access, or report limits honestly?'],
    ],
    activityTitle: 'Improve the weak indicators',
    activityPrompt: 'For each weak indicator, choose the improved HRBA-informed indicator and what it helps the team understand.',
    options: makeOptions(['Improve weak activity indicators into useful, safe, decision-oriented HRBA MEAL indicators.', 'Keep activity counts as the only evidence.']),
    insight: ['A stronger HRBA MEAL indicator is useful because it connects to a decision. It helps the team know whether to continue, adapt timing or access, improve participation, respond to feedback, protect people’s information, or explain limits back to communities.'],
    cta: 'Continue to Designing Safe Data Collection and Disaggregation',
    nextId: 'M5-R07',
  }),
  'M5-R07': baseConfig({
    id: 'M5-R07',
    title: 'Designing Safe Data Collection and Disaggregation',
    phase: 'Practice screen · Safe data collection and disaggregation',
    lead: 'Good MEAL evidence helps a CSO see who is reached, who may be missing, and what barriers remain. But more detail is not always better. HRBA-informed data collection should reveal exclusion without exposing people to risk.',
    visualSrc: module5SafeDataTreeSrc,
    visualAlt: 'Decision tree showing how a CSO can choose whether to collect, aggregate, anonymize, suppress, refer, or avoid collecting data so evidence reveals exclusion without exposing people.',
    block: 'Safe Data Decisions',
    storyTitle: 'From stronger indicators to safer evidence',
    story: [
      'Awra improved its indicators so they can show access, participation, feedback response, safety, accountability, and change.',
      'Now the team must decide what evidence is safe and useful enough to collect. Some evidence can guide action. Some evidence should be grouped. Some details should be removed. Some sensitive information should not be collected by the project team at all.',
    ],
    revealTitle: 'The safe evidence rule',
    revealItems: [
      ['Is it useful?', 'Will this evidence help Awra understand inclusion, barriers, feedback, response, or change?'],
      ['Is it necessary?', 'Is this level of detail needed for a decision, or is a broader theme enough?'],
      ['Can it be protected?', 'Could names, exact locations, photos, rare details, or small groups identify someone?'],
      ['Can it guide action safely?', 'Can Awra use the evidence to adapt, refer, engage responsible actors, or account back without exposing people?'],
    ],
    activityTitle: 'Choose the safest data decision',
    activityPrompt: 'For each Jiru Amba evidence example, choose the safest decision.',
    options: makeOptions(['Collect the minimum useful evidence needed for safe action.', 'Collect more personal detail whenever a report asks for it.']),
    insight: ['Evidence should reveal exclusion without exposing people. Safe HRBA MEAL evidence is useful, necessary, protected, explainable, and linked to a decision.'],
    cta: 'Continue to Planning Feedback and Response Mechanisms',
    nextId: 'M5-R08',
  }),
  'M5-R08': baseConfig({
    id: 'M5-R08',
    title: 'Planning Feedback and Response Mechanisms',
    phase: 'Practice screen · Feedback, response, and accountability',
    lead: 'A feedback box can collect comments, but it does not automatically create accountability. HRBA-informed MEAL asks whether people know how to give feedback, can do so safely, trust the process, receive a response or referral, and hear what changed or what still needs follow-up.',
    visualSrc: module5FeedbackLoopSrc,
    visualAlt: 'Feedback response loop showing that feedback should be received safely, recorded with minimum detail, reviewed, responded to or referred, used for adaptation, and explained back to communities.',
    block: 'Feedback Response Mechanism',
    storyTitle: 'From safer evidence to accountable feedback',
    story: [
      'In the previous screen, Awra decided how to collect useful evidence without exposing people. Feedback needs the same care.',
      'Some feedback can guide practical adaptation. Some concerns require referral. Some issues should be discussed with responsible actors. All feedback systems need a way to account back.',
    ],
    revealTitle: 'What makes a feedback mechanism accountable?',
    revealItems: [
      ['Inform people', 'People know what the channel is for, what can be reported, and what happens next.'],
      ['Make it accessible', 'Different groups can use the channel safely, including people with low literacy, limited mobility, care responsibilities, or distance barriers.'],
      ['Receive safely', 'Feedback can be shared without exposing people or creating retaliation risk.'],
      ['Record minimum necessary information', 'The team records themes and action needs, not unnecessary names or sensitive details.'],
      ['Review by the right role', 'Feedback is reviewed by people with the responsibility and skills to handle it.'],
      ['Respond or refer', 'Feedback receives an answer, action, referral, or escalation through an agreed pathway.'],
      ['Adapt practice', 'The team uses feedback themes to improve timing, access, communication, facilitation, quality, or follow-up.'],
      ['Account back', 'Communities hear what was heard, what changed, what did not change, why, and next steps.'],
    ],
    activityTitle: 'Build the feedback and response pathway',
    activityPrompt: 'Select the actions that should be part of Awra’s safe and accountable feedback mechanism.',
    options: makeOptions(['Build a safe response, referral, adaptation, and account-back pathway.', 'Only count feedback comments received.']),
    insight: ['Feedback is not accountability unless something happens next. A channel becomes accountable only when people can use it safely, the team reviews it responsibly, action or referral follows, and communities hear what happened next.'],
    cta: 'Continue to Using Qualitative Evidence Ethically',
    nextId: 'M5-R09',
  }),
  'M5-R09': baseConfig({
    id: 'M5-R09',
    title: 'Using Qualitative Evidence Ethically',
    phase: 'Practice screen · Ethical qualitative evidence',
    lead: 'Stories, quotes, photos, and case examples can help a CSO understand what changed and why. But qualitative evidence can also expose people, create pressure, or make rights-holders look like proof material. HRBA-informed MEAL uses qualitative evidence with dignity, consent, anonymity, accuracy, and care.',
    visualSrc: module5DonorStoryInboxSrc,
    visualAlt: 'Visual showing report evidence requests being checked against a safe response checklist for consent, identity protection, minimum detail, safer alternatives, and respect for refusal.',
    block: 'Ethical Qualitative Evidence',
    storyTitle: 'From feedback response to ethical evidence use',
    story: [
      'Awra has strengthened its feedback pathway. Now the team wants to use what it learned in reports and communication.',
      'Some evidence can be shared safely as themes or non-identifying examples. Some evidence should be protected, summarized, referred, or not shared at all.',
    ],
    revealTitle: 'Five checks before using a story, quote, photo, or case example',
    revealItems: [
      ['Purpose', 'Why is this evidence needed? What decision, learning, reporting, or account-back purpose does it serve?'],
      ['Consent and refusal', 'Did the person understand the use and freely agree? Can they refuse without losing support, access, or respect?'],
      ['Identity protection', 'Could names, faces, exact locations, rare details, or combinations of details identify someone?'],
      ['Dignity and accuracy', 'Does the evidence respect the person’s agency and avoid pity, sensationalism, or unsupported claims?'],
      ['Safer alternative', 'Can the same learning be shared through anonymized themes, aggregate findings, composite examples, or non-identifying evidence?'],
    ],
    activityTitle: 'Choose the safer evidence response',
    activityPrompt: 'For each request, choose the safest professional response Awra should give.',
    options: makeOptions(['Use the safest evidence that still tells the truth.', 'Use powerful stories as the default proof of impact.']),
    feedbackStrong: 'Strong evidence judgment. The report can be truthful and safe.',
    feedbackSupport: 'Review any request involving names, faces, direct quotes, raw logs, complaint details, children, disability-related details, or strong transformation claims.',
    insight: ['Qualitative evidence can make learning visible, but it must never expose people, pressure them, or turn rights-holders into proof material.'],
    cta: 'Continue to Interpreting MEAL Evidence and Deciding Adaptations',
    nextId: 'M5-R10',
  }),
  'M5-R10': baseConfig({
    id: 'M5-R10',
    title: 'Interpreting MEAL Evidence and Deciding Adaptations',
    phase: 'Analysis and use screen · Evidence interpretation and adaptation',
    lead: 'MEAL evidence becomes useful when the team asks what it means and what should happen next. HRBA-informed interpretation looks beyond numbers to ask who may still be missing, what barriers remain, whether feedback needs response, what can be adapted, what needs referral, and what should be explained back.',
    visualSrc: module5AdaptationDecisionTreeSrc,
    visualAlt: 'Decision-tree visual showing how different MEAL evidence signals can lead to different actions: continue, adapt, consult safely, refer, engage responsible actors, narrow claims, or account back.',
    block: 'Evidence-to-Action Interpretation',
    storyTitle: 'From ethical evidence to responsible action',
    story: [
      'Awra has improved how it uses stories, quotes, feedback themes, and access evidence.',
      'Now the team needs to interpret what the evidence is saying. Some signals show the project can continue. Some show a need to adapt. Some require safe consultation, referral, responsible-actor engagement, or more cautious reporting.',
    ],
    revealTitle: 'From evidence signal to next action',
    revealItems: [
      ['What does the evidence show?', 'Is it about reach, access, participation, feedback, safety, quality, response, or change?'],
      ['Who may still be missing?', 'Are any groups absent, under-represented, or only counted broadly?'],
      ['What can Awra improve directly?', 'Can the team adapt timing, venue, communication, facilitation, data collection, or feedback response?'],
      ['What needs a safe pathway?', 'Does the evidence involve protection, safeguarding, complaint, referral, or confidentiality concerns?'],
      ['Who else has responsibility?', 'Does the issue require a service provider, committee, woreda office, or other responsible actor?'],
      ['What should be explained back?', 'What was heard, what changed, what did not, why, and what happens next?'],
    ],
    activityTitle: 'Choose the responsible next action',
    activityPrompt: 'For each Jiru Amba evidence signal, choose what Awra should do next.',
    options: makeOptions(['Let the evidence guide a specific, safe next action.', 'Collect more names before taking any action.']),
    feedbackStrong: 'Strong interpretation: evidence is guiding action.',
    feedbackSupport: 'Good start: review what each signal requires.',
    insight: ['Evidence should lead to a responsible decision, not only a report paragraph.'],
    cta: 'Continue to Reporting Results, Limits, and Accountability',
    nextId: 'M5-R11',
  }),
  'M5-R11': baseConfig({
    id: 'M5-R11',
    title: 'Reporting Results, Limits, and Accountability',
    phase: 'Reporting screen · MEAL reporting and communication',
    lead: 'A report can sound strong and still be misleading. HRBA-informed MEAL reporting should tell the truth about progress, evidence limits, barriers, feedback response, adaptations, unresolved issues, and next steps-without exposing people or claiming more than the evidence can support.',
    visualSrc: module5ReportRepairCardsSrc,
    visualAlt: 'Visual showing risky report claims being improved into safer rights-based claims that report progress, limits, evidence, adaptation, and account-back.',
    block: 'Reporting Results, Limits, and Accountability',
    storyTitle: 'From evidence interpretation to responsible reporting',
    story: [
      'In the previous screen, Awra interpreted evidence signals and decided what should continue, what should adapt, what needs referral, what requires responsible-actor engagement, and what should be explained back.',
      'Now the team needs to report those decisions honestly and safely.',
    ],
    revealTitle: 'What makes reporting rights-based?',
    revealItems: [
      ['Report what is known', 'Use evidence, not assumptions or polished wording.'],
      ['Name limits safely', 'Say what the evidence does not show yet, without exposing people.'],
      ['Avoid overclaiming', 'Do not say "everyone," "all," or "fully achieved" unless the evidence supports it.'],
      ['Protect people', 'Do not include names, faces, raw complaints, exact locations, child data, diagnoses, or identifying stories.'],
      ['Show adaptation', 'Explain what changed because of evidence or feedback.'],
      ['Include unresolved issues', 'Say what has not changed yet and what follow-up is planned.'],
      ['Account back', 'Explain what communities should hear: what was heard, what changed, what did not, why, and next steps.'],
    ],
    activityTitle: 'Improve the risky report claims',
    activityPrompt: 'For each risky Jiru Amba report claim, choose the safer HRBA-informed reporting statement.',
    options: makeOptions(['Improve claims with truthful, safe, evidence-based language.', 'Make the report sound successful even when evidence is thin.']),
    feedbackStrong: 'Strong reporting: truthful, safe, and accountable.',
    feedbackSupport: 'Good start: strengthen the reporting judgment.',
    insight: ['Truthful limits make a report more credible, not weaker.'],
    cta: 'Continue to Module Knowledge Check: Evidence-to-Action Decisions',
    nextId: 'M5-R12',
  }),
  'M5-R12': baseConfig({
    id: 'M5-R12',
    title: 'Module Knowledge Check: Evidence-to-Action Decisions',
    phase: 'Knowledge check · Integrated knowledge check',
    lead: 'You have practiced using MEAL evidence to look beyond activity counts. This knowledge check brings the full pathway together: improving indicators, choosing safe evidence, responding to feedback, using qualitative evidence ethically, deciding adaptations, reporting truthfully, and accounting back.',
    visualSrc: module5CapstoneSimulatorSrc,
    visualAlt: 'Knowledge check visual showing MEAL evidence moving through indicator improvement, safe evidence, feedback response, adaptation, reporting, and account-back.',
    block: 'Module Knowledge Check',
    storyTitle: 'Jiru Amba case: Final MEAL review before reporting back',
    story: [
      'Awra has completed a monthly MEAL review for its Jiru Amba work. The team has activity numbers, attendance records, feedback themes, access-barrier notes, safe qualitative evidence, and some adaptation decisions.',
      'Before finalizing the report and account-back message, Awra needs to check whether the evidence supports safe, rights-based action.',
      'Answer six applied questions. Each question checks one part of the evidence-to-action pathway.',
    ],
    revealTitle: 'Knowledge check pathway',
    revealItems: [
      ['Indicators', 'Check meaningful participation, not only activity completion.'],
      ['Safe evidence', 'Use useful data while protecting people from identification risk.'],
      ['Feedback response', 'Turn feedback themes into review, adaptation, and account-back.'],
      ['Qualitative evidence', 'Use stories and photos ethically, safely, and truthfully.'],
      ['Adaptation', 'Use partial progress evidence to decide what should continue and what still needs attention.'],
      ['Reporting and account-back', 'Report progress, limits, adaptation, and next steps without overclaiming.'],
    ],
    activityTitle: 'Answer the evidence-to-action decisions',
    activityPrompt: 'Read Awra’s Jiru Amba scenario. For each question, choose the answer that best fits the HRBA-MEAL purpose named in the question.',
    options: makeOptions(['Use evidence safely and choose the action that supports accountability.', 'Choose the option that makes the report sound strongest.']),
    feedbackStrong: 'You are ready to build your improvement note.',
    feedbackSupport: 'Good progress. Review the decisions that carried risk.',
    insight: ['HRBA-informed MEAL protects people, explains limits, responds to feedback, adapts practice, and accounts back.'],
    cta: 'Continue to My HRBA MEAL, Accountability, and Learning Improvement Note',
    nextId: 'M5-R13',
  }),
  'M5-R13': baseConfig({
    id: 'M5-R13',
    title: 'Portfolio: My HRBA MEAL, Accountability, and Learning Note',
    phase: 'Portfolio screen · Portfolio note',
    lead: 'You have practiced using MEAL evidence to move beyond activity counts. Now create a short portfolio note that captures one practical improvement: what evidence you will strengthen, how you will protect people, what action should follow, and how the team will account back.',
    visualSrc: module5RepairNoteWorksheetSrc,
    visualAlt: 'Structured HRBA MEAL portfolio note worksheet with sections for practice focus, HRBA MEAL question, safe evidence, safety boundary, action, and account-back.',
    block: 'Portfolio Note',
    storyTitle: 'Jiru Amba case: From learning to a practical MEAL note',
    story: [
      'Awra has reviewed its Jiru Amba evidence. The team has activity numbers, feedback themes, access-barrier notes, safe qualitative evidence, and decisions about adaptation and reporting.',
      'The portfolio note helps Awra turn that learning into one safe, practical MEAL improvement that can guide the next review cycle.',
      'Choose one focus area, one HRBA-MEAL question, one safe evidence source, one safety boundary, one adaptation action, and one account-back step.',
    ],
    revealTitle: 'Portfolio note sections',
    revealItems: [
      ['Practice focus', 'Choose the MEAL practice the team will improve.'],
      ['Guiding question', 'Choose the HRBA-MEAL question that should guide review.'],
      ['Safe evidence', 'Choose evidence that is useful, necessary, non-identifying, and protected.'],
      ['Safety boundary', 'Choose the boundary that protects rights-holders.'],
      ['Action', 'Choose one practical action linked to the evidence.'],
      ['Account-back', 'Choose how the team will explain back safely.'],
    ],
    activityTitle: 'Build your portfolio note',
    activityPrompt: 'Use structured choices only. Do not enter real names, exact locations, complaint details, survivor stories, child data, disability diagnoses, or identifiable examples.',
    options: makeOptions(['Generate a safe portfolio note from structured choices.', 'Write real project details into a free-text note.']),
    feedbackStrong: 'Your portfolio note is ready.',
    feedbackSupport: 'Complete each structured choice and confirm the note is safe to save.',
    insight: ['A useful portfolio note connects evidence, action, protection, and account-back without collecting sensitive details.'],
    cta: 'Continue to 90-Day MEAL Learning and Account-Back Plan',
    nextId: 'M5-R14',
  }),
  'M5-R14': baseConfig({
    id: 'M5-R14',
    title: '90-Day MEAL Learning and Account-Back Plan',
    phase: 'MODULE 5 · HRBA IN MEAL',
    lead: 'You have created your HRBA MEAL improvement note. Now turn it into a simple 90-day practice bridge: one step to prepare, one step to test, and one step to learn and account back.',
    visualSrc: module5ActionJourneySrc,
    visualAlt: '90-day action journey visual showing a team preparing one improvement, testing one change, learning, and accounting back safely.',
    block: 'MEAL step: Practice bridge and account-back',
    storyTitle: 'Jiru Amba case: From improvement note to practice',
    story: [
      'Awra has identified one MEAL improvement from the Jiru Amba review. The team does not need to redesign its whole MEAL system at once.',
      'It can start with one realistic action, test it safely, review what changed, and explain back what was learned.',
      'Create a simple 30/60/90-day plan that connects evidence, action, learning, and account-back.',
    ],
    revealTitle: '90-day practice bridge',
    revealItems: [
      ['Prepare', 'Choose one realistic improvement and define the evidence, pathway, or safety boundary the team will prepare.'],
      ['Test', 'Try one small change in normal MEAL practice without collecting unnecessary or identifying details.'],
      ['Learn and account back', 'Review what changed, explain limits truthfully, and share back what was heard and what happens next.'],
    ],
    activityTitle: 'Build your 90-day plan',
    activityPrompt: 'Choose practical actions for the next 30, 60, and 90 days. Keep the plan realistic, safe, and focused on one improvement your team could test in normal MEAL practice.',
    options: makeOptions(['Choose one realistic action for 30, 60, and 90 days.', 'Collect more personal data before acting.']),
    feedbackStrong: 'Your 90-day practice bridge is ready.',
    feedbackSupport: 'Complete each section and confirm the plan is safe to save.',
    insight: ['HRBA-informed MEAL is not only about better reports. It is about using evidence safely, adapting practice, engaging responsible actors, and accounting back.'],
    cta: 'Complete Module 5',
    nextId: 'M5-PLAYER-COMPLETE',
  }),
};

Object.values(module5RevisedScreens).forEach((screen) => {
  const nextMatch = /^M5-R(\d{2})$/.exec(screen.nextId);
  if (nextMatch) {
    screen.ctaButton = `Continue to Screen 5.${Number(nextMatch[1])}`;
  }
});

module5RevisedScreens['M5-R05'].ctaButton = 'Continue to Strengthening Indicators and Logframe Evidence';
module5RevisedScreens['M5-R06'].ctaButton = 'Continue to Designing Safe Data Collection and Disaggregation';
module5RevisedScreens['M5-R07'].ctaButton = 'Continue to Planning Feedback and Response Mechanisms';
module5RevisedScreens['M5-R08'].ctaButton = 'Continue to Using Qualitative Evidence Ethically';
module5RevisedScreens['M5-R09'].ctaButton = 'Continue to Interpreting MEAL Evidence and Deciding Adaptations';
module5RevisedScreens['M5-R10'].ctaButton = 'Continue to Reporting Results, Limits, and Accountability';
module5RevisedScreens['M5-R11'].ctaButton = 'Continue to Module Knowledge Check: Evidence-to-Action Decisions';
module5RevisedScreens['M5-R12'].ctaButton = 'Continue to My HRBA MEAL, Accountability, and Learning Improvement Note';
module5RevisedScreens['M5-R13'].ctaButton = 'Continue to 90-Day MEAL Learning and Account-Back Plan';

const module5Screens: Record<string, Module5ScreenConfig> = {
  ...module5RevisedScreens,
  'M5-S1-01': {
    screenId: 'M5-S1-01',
    context: 'Module 5 · HRBA in MEAL',
    title: 'The Numbers Looked Good, But the Story Was Incomplete',
    lead: 'A local CSO team is preparing its progress report. At first, everything looks successful. But one question changes the room.',
    blockType: 'Interactive Scenario',
    storyTitle: 'A report that looked ready',
    story: [
      'The project team at Birhan Community Action has just finished a six-month community awareness project. The project officer, finance officer, field facilitator, and MEAL focal person are sitting together to finalize the report.',
      'The numbers look strong: 12 awareness sessions completed, 300 people reached, 85% average attendance, 4 community meetings held, 1 feedback box installed, and 20 success stories collected.',
      'The draft conclusion says: “The project successfully reached vulnerable community members and improved awareness of rights and available services.”',
      'Hana, the MEAL focal person, asks whether these numbers show who was reached, who was missed, whose voice influenced decisions, whether feedback was answered, whether persons with disabilities had access, whether gender barriers changed, and whether stories were collected safely.',
    ],
    startButton: 'Review the evidence gaps',
    revealTitle: 'What the numbers do not yet show',
    revealIntro: 'The report is not wrong. But it does not yet tell the full rights-based story.',
    revealItems: makeReveal([
      ['Who was reached?', 'The report says 300 people attended. But it does not show whether women, men, youth, older people, persons with disabilities, displaced people, or other groups participated meaningfully and safely.'],
      ['Who was missed?', 'The report does not ask who could not attend, who did not receive information, or who may have been excluded by timing, language, location, mobility, safety, stigma, or local power dynamics.'],
      ['Did participation influence decisions?', 'The report counts meetings. But it does not show whether community input changed the activity plan, venue, messages, referral information, or follow-up actions.'],
      ['Was feedback answered?', 'A feedback box was installed. But the report does not show what feedback was received, who raised concerns, how the team responded, or whether communities heard back.'],
      ['Were gender barriers understood?', 'The report says awareness improved. But it does not show whether women, girls, men, boys, or different groups faced different barriers, risks, responsibilities, or decision-making constraints.'],
      ['Were persons with disabilities included?', 'The report does not show whether persons with disabilities could access sessions, information, venues, facilitation methods, feedback channels, or follow-up support.'],
      ['Was evidence collected safely?', 'The report includes success stories. But it is unclear whether people gave informed consent, whether identifying details were removed, and whether sharing the story could create risk.'],
      ['What changed?', 'The report says awareness improved. But it does not yet show what changed in knowledge, confidence, access, participation, accountability, duty-bearer response, or practice.'],
    ]),
    activityTitle: 'Pause and think',
    activityPrompt: 'In many CSO reports, activity numbers are necessary. Which missing question most helps the team look beyond numbers?',
    activityMode: 'single',
    options: makeOptions([
      'What changed for people, and who may still be excluded?',
      'Can we make the table shorter?',
      'Can we add more photos to make the report attractive?',
    ]),
    feedbackStrong: 'Yes. HRBA MEAL does not reject numbers. It asks better questions around the numbers.',
    feedbackSupport: 'The useful question is not only about report format. It is about inclusion, accountability, safety, change, and adaptation.',
    insightTitle: 'The story is incomplete',
    insight: [
      'HRBA MEAL does not reject numbers. It asks better questions around the numbers: who was included, who was missed, who influenced decisions, whether feedback was answered, whether evidence was collected safely, what changed, and what should adapt.',
      'In the next screen, you will help the team identify what is missing from the report.',
    ],
    ctaButton: 'Continue to Screen 5.2',
    nextId: 'M5-S1-02',
  },
  'M5-S1-02': {
    screenId: 'M5-S1-02',
    context: 'Module 5 · HRBA in MEAL',
    title: 'What Is Missing from the Report?',
    lead: 'The Birhan Community Action team has strong activity numbers. Now review the report like an HRBA MEAL practitioner.',
    blockType: 'Multi-Select Knowledge Check',
    storyTitle: 'Report snapshot',
    story: [
      'The project report says: 12 awareness sessions completed; 300 people reached; 85% average attendance; 4 community meetings held; 1 feedback box installed; 20 success stories collected.',
      'The draft conclusion says: “The project successfully reached vulnerable community members and improved awareness of rights and available services.”',
      'The report may be useful. But it is not yet enough.',
    ],
    startButton: 'Diagnose the gaps',
    revealTitle: 'Evidence gaps to notice',
    revealIntro: 'Select all the questions that are still not answered by the report.',
    revealItems: makeReveal([
      ['Activity numbers answer “how many.”', 'They can show sessions, attendance, meetings, feedback tools, and story counts.'],
      ['HRBA MEAL asks “who, how, and what changed.”', 'It asks who was reached, who was missed, who influenced decisions, whether feedback was answered, whether evidence was safe, and what changed.'],
      ['Useful detail is not the same as rights-based evidence.', 'The newest template or the color of a feedback box may matter administratively, but it does not prove inclusion, accountability, safety, or change.'],
    ]),
    activityTitle: 'Select all the evidence gaps you notice',
    activityPrompt: 'Which questions are still not answered by this report?',
    activityMode: 'multi',
    options: reportGapOptions,
    feedbackStrong: 'Strong noticing. You looked beyond activity numbers and identified the key HRBA MEAL evidence gaps.',
    feedbackSupport: 'Good start. Look for the questions numbers often hide: who was missed, who influenced decisions, whether feedback was answered, whether barriers were understood, whether evidence was safe, what changed, and whether the team adapted.',
    insightTitle: 'Key insight',
    insight: [
      'Activity numbers can answer how many sessions, people, meetings, and stories. HRBA MEAL also asks who was reached, who was missed, what changed, whether feedback was answered, and what should adapt.',
    ],
    ctaButton: 'Continue to the HRBA MEAL lens',
    nextId: 'M5-S1-03',
  },
  'M5-S1-03': baseConfig({
    id: 'M5-S1-03',
    title: 'The HRBA MEAL Lens',
    block: 'Interactive Reveal / Lens Card Grid',
    storyTitle: 'A practical lens for reviewing evidence',
    story: ['Hana turns the report discussion into a simple lens the team can use in future monitoring, evaluation, accountability, and learning work.'],
    revealTitle: 'Six questions the lens keeps visible',
    revealItems: hrbaMealLens,
    activityTitle: 'Choose the strongest use of the lens',
    activityPrompt: 'What should the team do when a report has strong numbers but weak rights-based evidence?',
    options: makeOptions(['Use the lens to ask what the numbers do not yet show and what action is needed.', 'Add more totals so the report looks more complete.', 'Avoid feedback evidence because it may complicate reporting.']),
    insight: ['The HRBA MEAL lens helps a CSO use evidence for inclusion, accountability, safety, learning, and adaptation, not only for counting activities.'],
    cta: 'Continue to evidence for change',
    nextId: 'M5-S1-04',
  }),
  'M5-S1-04': baseConfig({
    id: 'M5-S1-04',
    title: 'From Counting Activities to Learning About Change',
    block: 'Image Comparison / Before-After Evidence Shift',
    storyTitle: 'The team compares two evidence views',
    story: ['One view shows completed activities. The other asks what changed for people, which barriers moved, and what still needs attention.'],
    revealTitle: 'The evidence ladder',
    revealItems: [
      ['Output evidence', 'What the project delivered: sessions, meetings, materials, referrals, story notes, and attendance.'],
      ['Reach evidence', 'Who participated, who could not participate, and which groups were reached or missed.'],
      ['Quality evidence', 'Whether information, venues, facilitation, feedback channels, and referral support were accessible and acceptable.'],
      ['Change evidence', 'What changed in knowledge, confidence, access, participation, response, or practice.'],
      ['Learning evidence', 'What the team should keep, change, stop, or test next.'],
    ],
    activityTitle: 'Classify the evidence shift',
    activityPrompt: 'Which evidence view best supports HRBA learning?',
    options: makeOptions(['A combined view that keeps outputs but adds reach, quality, change, and adaptation evidence.', 'Only a large attendance total.', 'Only a narrative success story without consent or context.']),
    insight: ['Counting activities is useful, but it is the beginning of learning, not the end. HRBA MEAL asks what the evidence means for people and action.'],
    cta: 'Continue to evidence classification',
    nextId: 'M5-S1-05',
  }),
  'M5-S1-05': baseConfig({
    id: 'M5-S1-05',
    title: 'Practice: Classify the Evidence',
    block: 'Sorting Activity',
    storyTitle: 'A mixed evidence folder',
    story: ['The team has attendance sheets, feedback themes, facilitator notes, access observations, referral questions, and draft stories. Each piece of evidence can answer a different HRBA MEAL question.'],
    revealTitle: 'Evidence categories',
    revealItems: [
      ['Reach and inclusion', 'Evidence about who participated, who was missed, and which groups need intentional follow-up.'],
      ['Participation and influence', 'Evidence about whose views shaped decisions or adaptations.'],
      ['Feedback and accountability', 'Evidence about what concerns were raised, answered, and reported back.'],
      ['Gender and disability barriers', 'Evidence about different experiences, access needs, safety, care responsibilities, and reasonable accommodation.'],
      ['Safety and dignity', 'Evidence about consent, anonymization, minimum detail, and safe story use.'],
      ['Change and adaptation', 'Evidence about what changed and what the team changed in response.'],
    ],
    activityTitle: 'Choose the strongest classification',
    activityPrompt: 'A note says “women with care responsibilities attended less often in afternoon sessions.” What category best fits?',
    options: makeOptions(['Gender-sensitive access barrier evidence.', 'Only output evidence.', 'Only donor visibility evidence.']),
    insight: ['Classifying evidence helps the team see what it can claim, what it cannot claim yet, and what action may be needed.'],
    cta: 'Continue to the indicator repair lab',
    nextId: 'M5-S1-06',
  }),
  'M5-S1-06': baseConfig({
    id: 'M5-S1-06',
    title: 'Indicator Repair Lab: From Output Indicator to HRBA Indicator',
    block: 'Tool Activity / Indicator Repair Lab',
    storyTitle: 'A weak indicator can produce a weak report',
    story: [
      'Birhan Community Action used this indicator: “Number of people trained on rights and available services.”',
      'This indicator is not useless. It helps the team count reach. But by itself, it does not show who was reached, who was missed, whether people participated meaningfully, whether barriers were reduced, whether feedback was used, or whether anything changed.',
      'Hana says: “Maybe the problem did not start when we wrote the report. Maybe it started when we chose the indicators.”',
    ],
    revealTitle: 'What makes an indicator more HRBA-informed?',
    revealItems: indicatorDimensions,
    activityTitle: 'Repair the indicator',
    activityPrompt: 'Which replacement indicator gives the team a stronger HRBA MEAL signal?',
    options: makeOptions(['Percentage of participants, disaggregated safely, who report that they understood referral steps and could ask questions through an accessible feedback channel.', 'Number of people trained.', 'Number of printed handouts distributed.']),
    insight: ['A stronger HRBA indicator does not need to include everything, but it should help the team see at least one important rights-based dimension.'],
    cta: 'Continue to indicator set practice',
    nextId: 'M5-S1-07',
  }),
  'M5-S1-07': baseConfig({
    id: 'M5-S1-07',
    title: 'Practice: Strengthen the Indicator Set',
    block: 'Interactive Table / Indicator Set Repair Activity',
    storyTitle: 'The team reviews a weak set',
    story: ['The current indicator set counts sessions, attendance, meetings, feedback boxes, and stories. It needs a balanced set that can guide learning.'],
    revealTitle: 'What is missing from the set?',
    revealItems: [
      ['Inclusion indicator', 'The set needs a way to see who was reached and who may have been missed.'],
      ['Participation indicator', 'The set needs a way to see whether people influenced decisions.'],
      ['Feedback indicator', 'The set needs a way to see whether feedback was reviewed, answered, and reported back.'],
      ['Change indicator', 'The set needs a way to see what changed beyond attendance.'],
    ],
    activityTitle: 'Choose the strongest repair',
    activityPrompt: 'Which addition would most improve the set?',
    options: makeOptions(['Add indicators on inclusion, participation influence, feedback response, gender/disability barriers, safe evidence, and change.', 'Add only more activity targets.', 'Remove feedback evidence so reporting is easier.']),
    insight: ['A balanced indicator set helps the team notice exclusion, respond to feedback, protect people, and adapt.'],
    cta: 'Continue to gender-sensitive evidence',
    nextId: 'M5-S1-07A',
  }),
  'M5-S1-07A': baseConfig({
    id: 'M5-S1-07A',
    title: 'Gender-Sensitive Evidence and Indicators',
    block: 'Tabs + Worked Example',
    storyTitle: 'Gender-sensitive MEAL makes difference visible',
    story: ['The team counted women and men in attendance sheets, but counting alone did not show barriers, risks, time burdens, voice, or benefit.'],
    revealTitle: 'What gender-sensitive evidence should show',
    revealItems: [
      ['Access', 'Who could attend, at what time, with what safety, mobility, and care responsibilities?'],
      ['Voice', 'Who spoke, who stayed quiet, and whose input influenced decisions?'],
      ['Benefits', 'Who benefited, how, and whether benefits were equal or different across groups?'],
      ['Risks', 'Whether participation, visibility, travel, or story collection created different risks.'],
    ],
    activityTitle: 'Choose the stronger gender-sensitive indicator',
    activityPrompt: 'Which indicator goes beyond counting women and men?',
    options: makeOptions(['Percentage of women and men who report that session timing, venue, and facilitation allowed them to participate safely and influence discussion.', 'Number of women attending.', 'Number of photos showing women at sessions.']),
    insight: ['Gender-sensitive evidence helps the team understand different barriers and design better responses.'],
    cta: 'Continue to gender marker readiness',
    nextId: 'M5-S1-07B',
  }),
  'M5-S1-07B': baseConfig({
    id: 'M5-S1-07B',
    title: 'Gender Marker Readiness in Plain Language',
    block: 'Interactive Checklist / Marker Readiness Tool',
    storyTitle: 'Readiness means there is an evidence trail',
    story: ['A gender marker should not be a label added at the end. It should be supported by analysis, objectives, activities, indicators, budget, risk thinking, and learning.'],
    revealTitle: 'Gender marker readiness checks',
    revealItems: [
      ['Analysis', 'Does the project explain gendered barriers, risks, roles, access, and decision-making power?'],
      ['Objective and activities', 'Do objectives and activities respond to those barriers?'],
      ['Indicators and evidence', 'Will MEAL show access, voice, benefits, risks, feedback, and adaptation?'],
      ['Resources and accountability', 'Are responsibilities, budget, safeguarding, and reporting arrangements clear?'],
    ],
    activityTitle: 'Readiness judgment',
    activityPrompt: 'When is the project more ready to use a gender marker responsibly?',
    options: makeOptions(['When the marker is supported by analysis, activities, indicators, safeguards, resources, and learning evidence.', 'When the report mentions women once.', 'When the attendance sheet includes a gender column only.']),
    insight: ['Gender marker readiness is practical evidence that gender commitments are built into the project logic and MEAL system.'],
    cta: 'Continue to gender indicator repair',
    nextId: 'M5-S1-07C',
  }),
  'M5-S1-07C': baseConfig({
    id: 'M5-S1-07C',
    title: 'Practice: Repair a Gender-Blind Indicator Set',
    block: 'Indicator Repair Practice',
    storyTitle: 'A gender-blind set can hide unequal experience',
    story: ['The team has indicators that count participants and sessions, but do not show gendered access, voice, benefit, safety, or feedback response.'],
    revealTitle: 'Repair moves',
    revealItems: [
      ['Add access evidence', 'Track whether timing, location, care responsibilities, and safety affected participation.'],
      ['Add voice evidence', 'Track whether women, men, youth, and other groups influenced decisions.'],
      ['Add benefit evidence', 'Track whether different groups experienced different benefits or barriers.'],
      ['Add safe feedback evidence', 'Track whether feedback channels were accessible, trusted, and answered.'],
    ],
    activityTitle: 'Repair the gender-blind set',
    activityPrompt: 'Which repaired set is strongest?',
    options: makeOptions(['A set that combines safe disaggregation with access, voice, benefit, feedback, safety, and adaptation indicators.', 'A set that only counts women and men.', 'A set that removes gender evidence to avoid complexity.']),
    insight: ['This set is stronger because it helps the team understand more than activity completion and can guide better adaptation.'],
    cta: 'Continue to data safety',
    nextId: 'M5-S1-08',
  }),
  'M5-S1-08': baseConfig({
    id: 'M5-S1-08',
    title: 'The Danger of Too Much Detail',
    block: 'Hotspot / Data Safety Scenario',
    storyTitle: 'Useful evidence can become unsafe',
    story: ['The team wants to show who was missed, but very detailed disaggregation and story details can identify people or create stigma, retaliation, or privacy risks.'],
    revealTitle: 'Unsafe detail hotspots',
    revealItems: safetyStoryDetails,
    activityTitle: 'Choose the safer data approach',
    activityPrompt: 'How should the team report exclusion without exposing people?',
    options: makeOptions(['Use minimum necessary, aggregated, anonymized evidence and explain barriers without identifying individuals or small groups.', 'Publish all personal details to prove the case.', 'Avoid all inclusion evidence.']),
    insight: ['HRBA MEAL makes exclusion visible while protecting people from avoidable harm.'],
    cta: 'Continue to safer disaggregation practice',
    nextId: 'M5-S1-09',
  }),
  'M5-S1-09': baseConfig({
    id: 'M5-S1-09',
    title: 'Practice: Choose Safer Disaggregation',
    block: 'Scenario-Based Decision Activity',
    storyTitle: 'Choosing useful and safe levels of detail',
    story: ['The team needs evidence by group, but it must decide what level of detail is useful, safe, and necessary for action.'],
    revealTitle: 'Data safety decisions',
    revealItems: [
      ['Aggregate when groups are small', 'Small counts can identify people, especially in small communities, small-cell combinations, or sensitive categories.'],
      ['Collect detail only for a purpose', 'Disaggregation should connect to access, inclusion, adaptation, or accountability decisions.'],
      ['Protect sensitive combinations', 'Age, location, disability, displacement, and quotes can identify someone when combined.'],
      ['Report barriers, not identities', 'The team can describe exclusion patterns without exposing individuals.'],
    ],
    activityTitle: 'Select the safer disaggregation',
    activityPrompt: 'Which approach best balances visibility and protection?',
    options: makeOptions(['Report aggregated patterns and barriers, keep sensitive detail protected, and use detail internally only when needed for safe follow-up with consent and safeguards.', 'Publish individual-level details by name and location.', 'Remove all group analysis from the report.']),
    insight: ['Safe disaggregation is a judgment: enough detail to act, not so much detail that people can be harmed.'],
    cta: 'Continue to disability inclusion',
    nextId: 'M5-S1-09A',
  }),
  'M5-S1-09A': baseConfig({
    id: 'M5-S1-09A',
    title: 'Disability Inclusion in HRBA MEAL',
    block: 'Interactive Reveal + Accessibility Lens Cards',
    storyTitle: 'Accessibility evidence should guide adaptation',
    story: ['The team counted some participants with disabilities, but it did not consistently track access barriers or adjustments.'],
    revealTitle: 'Disability-inclusive evidence lens',
    revealItems: [
      ['Access to information', 'Could people receive information in accessible formats and channels?'],
      ['Access to venues and facilitation', 'Were venues, seating, timing, communication, and facilitation accessible?'],
      ['Participation and voice', 'Could persons with disabilities ask questions, influence decisions, and provide feedback?'],
      ['Reasonable accommodation', 'Were adjustments identified, budgeted, provided, and followed up?'],
      ['Benefits and response', 'Did evidence show whether barriers reduced and support improved?'],
    ],
    activityTitle: 'Choose the stronger disability-inclusive evidence',
    activityPrompt: 'Which evidence helps the team adapt?',
    options: makeOptions(['Evidence on access barriers, reasonable accommodation, accessible feedback, participation influence, and follow-up action.', 'Only a count of persons with disabilities.', 'Medical diagnosis details for every participant.']),
    insight: ['Disability-inclusive MEAL is about access, participation, reasonable accommodation, feedback, and response, not diagnosis.'],
    cta: 'Continue to disability marker readiness',
    nextId: 'M5-S1-09B',
  }),
  'M5-S1-09B': baseConfig({
    id: 'M5-S1-09B',
    title: 'Disability Marker Readiness in Plain Language',
    block: 'Interactive Checklist / Marker Readiness Tool',
    storyTitle: 'A marker needs practical evidence',
    story: ['A disability marker should be supported by accessibility analysis, activities, indicators, budgets, responsibilities, reasonable accommodation, and learning evidence.'],
    revealTitle: 'Disability marker readiness checks',
    revealItems: [
      ['Barrier analysis', 'Has the project identified communication, physical, attitudinal, institutional, and digital barriers?'],
      ['Accessible design', 'Are activities, venues, materials, feedback channels, and referral pathways accessible?'],
      ['Indicators and data safety', 'Do indicators focus on access, participation, accommodation, and response without unnecessary diagnosis?'],
      ['Resources and responsibilities', 'Are budget, roles, follow-up, and adaptation decisions clear?'],
    ],
    activityTitle: 'Readiness judgment',
    activityPrompt: 'Which readiness evidence is strongest?',
    options: makeOptions(['The project has evidence on barriers, adjustments, accessible feedback, responsible roles, resources, and adaptation.', 'The proposal says disability inclusion is important.', 'The team asks for diagnoses without a clear purpose.']),
    insight: ['Disability marker readiness means the project can show how accessibility and inclusion are designed, monitored, and improved.'],
    cta: 'Continue to safe disability data',
    nextId: 'M5-S1-09C',
  }),
  'M5-S1-09C': baseConfig({
    id: 'M5-S1-09C',
    title: 'Disability Data Is Not Diagnosis',
    block: 'Safety Note + Decision Tree',
    storyTitle: 'Purpose matters',
    story: ['The team should not collect disability-related data as if it were medical diagnosis. The purpose is accessibility, participation, reasonable accommodation, safe feedback, and adaptation.'],
    revealTitle: 'Decision tree checks',
    revealItems: [
      ['Why collect it?', 'Is the purpose clear, necessary, and connected to access or inclusion action?'],
      ['What is the minimum?', 'Can the team collect less sensitive information and still make the needed adjustment?'],
      ['Who can access it?', 'Is sensitive data protected, limited, and not exposed in public reports?'],
      ['How will it be used?', 'Will the evidence lead to accommodation, barrier removal, response, or learning?'],
    ],
    activityTitle: 'Choose safe disability data practice',
    activityPrompt: 'Which practice fits HRBA MEAL?',
    options: makeOptions(['Ask about access needs and barriers for accommodation and adaptation, protect sensitive details, and avoid unnecessary diagnosis.', 'Ask everyone for medical diagnoses.', 'Publish disability details to show transparency.']),
    insight: ['Disability-related data should support accessibility and inclusion, not label or expose people.'],
    cta: 'Continue to disability data practice',
    nextId: 'M5-S1-09D',
  }),
  'M5-S1-09D': baseConfig({
    id: 'M5-S1-09D',
    title: 'Practice: Choose Safe Disability Data Options',
    block: 'Scenario Decision + Feedback Panel',
    storyTitle: 'Data choices affect dignity and action',
    story: ['The team must decide what disability-related information to collect, revise, avoid, or report in different MEAL situations.'],
    revealTitle: 'Safe disability data options',
    revealItems: [
      ['Collect access needs', 'Ask what support or adjustments are needed to participate.'],
      ['Track barriers and responses', 'Document barriers identified and actions taken.'],
      ['Avoid diagnosis details', 'Do not collect medical diagnosis when the purpose is participation support.'],
      ['Report safely', 'Use aggregate, non-identifying language unless individual consent and safety are clear.'],
    ],
    activityTitle: 'Choose the safest option',
    activityPrompt: 'The venue has accessibility complaints. What should the team collect and report?',
    options: makeOptions(['Collect access barrier themes, needed adjustments, response actions, and aggregate non-identifying updates.', 'Collect names, diagnoses, and exact homes of participants.', 'Report no disability information at all.']),
    insight: ['Safe disability data is useful because it leads to access improvements without unnecessary exposure.'],
    cta: 'Continue to feedback evidence',
    nextId: 'M5-S1-10',
  }),
  'M5-S1-10': baseConfig({
    id: 'M5-S1-10',
    title: 'Feedback Data Is Evidence Too',
    block: 'Feedback-to-Learning Loop',
    storyTitle: 'Feedback is not only a box',
    story: ['The report says one feedback box was installed, but that does not show whether feedback was accessible, trusted, analyzed, answered, reported back, or used for learning.'],
    revealTitle: 'Feedback-to-learning loop',
    revealItems: [
      ['Receive', 'Make channels accessible, safe, and known.'],
      ['Analyze', 'Look for themes, barriers, risks, and who may be missing.'],
      ['Respond', 'Decide what action, referral, clarification, or adaptation is needed.'],
      ['Report back', 'Tell communities what was heard and what will happen next.'],
      ['Learn', 'Use the feedback to improve activities, indicators, and reporting.'],
    ],
    activityTitle: 'Choose the accountable response',
    activityPrompt: 'What should happen after feedback themes are reviewed?',
    options: makeOptions(['Act on feasible issues, refer sensitive concerns safely, and report back to communities on what was heard and done.', 'Count the number of comments only.', 'Keep feedback internal and never respond.']),
    insight: ['Feedback data becomes HRBA MEAL evidence when it informs response, accountability, and adaptation.'],
    cta: 'Continue to feedback decision practice',
    nextId: 'M5-S1-11',
  }),
  'M5-S1-11': baseConfig({
    id: 'M5-S1-11',
    title: 'Practice: Turn Feedback into an Action Decision',
    block: 'Synthetic Feedback Dashboard',
    storyTitle: 'The dashboard shows patterns',
    story: ['Feedback themes include difficult session timing, unclear referral steps, written forms that are hard to use, discomfort speaking with leaders present, venue access difficulty, and one private safety concern.'],
    revealTitle: 'Dashboard signals',
    revealItems: [
      ['Timing barrier', 'Repeated comments about timing suggest an access issue, not only preference.'],
      ['Referral confusion', 'Unclear steps mean information quality may be weak.'],
      ['Form difficulty', 'A written-only channel may exclude people with literacy, language, or disability barriers.'],
      ['Power and safety', 'Discomfort speaking with leaders present points to voice and protection concerns.'],
      ['Venue access', 'Access issues require practical adjustment.'],
      ['Private safety concern', 'This needs careful, confidential handling and referral pathways.'],
    ],
    activityTitle: 'Choose the action decision',
    activityPrompt: 'Which response best uses the feedback responsibly?',
    options: makeOptions(['Adjust session timing and venue, add verbal and accessible feedback options, clarify referral steps, handle safety concerns confidentially, and report back.', 'Mention the feedback box in the report and continue as planned.', 'Ignore feedback that creates extra work.']),
    insight: ['Responsible MEAL turns feedback themes into decisions, action, and report-back.'],
    cta: 'Continue to ethical storytelling',
    nextId: 'M5-S1-12',
  }),
  'M5-S1-12': baseConfig({
    id: 'M5-S1-12',
    title: 'Ethical Storytelling and Qualitative Evidence',
    block: 'Case Study + Safety Checklist',
    storyTitle: 'Stories are evidence, but they can create risk',
    story: ['The team has 20 story notes. A story can help explain change, but it must be collected and shared with dignity, consent, accuracy, and safety.'],
    revealTitle: 'Ethical storytelling checklist',
    revealItems: [
      ['Consent', 'The person understands how the story may be used and can refuse without losing support, pressure, or loss of services.'],
      ['Minimum detail', 'Only use details necessary for learning and reporting.'],
      ['Anonymization', 'Remove names, exact locations, small-cell clues, and identifying combinations unless safe consent is explicit.'],
      ['Dignity', 'Avoid pity, sensationalism, or claims the evidence cannot support.'],
      ['Verification', 'Do not overstate what the project caused.'],
    ],
    activityTitle: 'Choose the safer story practice',
    activityPrompt: 'Which approach protects dignity and usefulness?',
    options: makeOptions(['Use anonymized, consented, non-identifying story themes or safe composite learning and avoid unsupported “changed her life” claims.', 'Publish full names and photos to make the report powerful.', 'Use the story without checking consent because it is positive.']),
    insight: ['Qualitative evidence is strongest when it is respectful, safe, accurate, and connected to learning.'],
    cta: 'Continue to donor story request',
    nextId: 'M5-S1-13',
  }),
  'M5-S1-13': baseConfig({
    id: 'M5-S1-13',
    title: 'Practice: Respond to a Risky Donor Story Request',
    block: 'Branching Scenario / Donor Inbox Simulator',
    storyTitle: 'A risky request arrives',
    story: ['A donor or communications colleague asks for a named story, photo, exact location, and a strong transformation claim for a public update. The team needs a professional response that protects people and still offers useful evidence.'],
    revealTitle: 'What makes the request risky?',
    revealItems: [
      ['Identification risk', 'Name, photo, exact location, and sensitive details can identify someone.'],
      ['Consent risk', 'Consent must be informed, voluntary, and specific to use.'],
      ['Unsupported claim risk', 'A transformation claim may overstate what the evidence shows.'],
      ['Alternative evidence', 'Aggregated themes, anonymized quotes, safe composite learning, and evidence-backed non-identifying examples can still communicate value.'],
    ],
    activityTitle: 'Choose the professional response',
    activityPrompt: 'How should the team respond?',
    options: makeOptions(['Explain the safety concern, decline identifying details, and offer anonymized themes, consented non-identifying quotes, safe composite learning, and evidence-backed claims.', 'Send the full story because the donor asked.', 'Say no without offering any safer alternative.']),
    insight: ['A strong response protects people while still helping partners understand evidence and learning.'],
    cta: 'Continue to evidence signals',
    nextId: 'M5-S1-14',
  }),
  'M5-S1-14': baseConfig({
    id: 'M5-S1-14',
    title: 'Reading the Signals: When Evidence Says the Plan Should Change',
    block: 'Chart + Evidence Signal Triage',
    storyTitle: 'Mixed signals are normal',
    story: ['Attendance is high overall, but remote attendance drops, feedback mentions timing and venue barriers, and some groups speak less in mixed meetings.'],
    revealTitle: 'Evidence signal triage',
    revealItems: [
      ['Green signal', 'Planned activities are happening and reach is visible.'],
      ['Amber signal', 'Some groups participate less or face barriers that need adjustment.'],
      ['Red signal', 'Safety concerns, exclusion, or unanswered feedback require prompt action.'],
      ['Learning signal', 'Evidence should lead to practical adaptation, not only explanation.'],
    ],
    activityTitle: 'Choose the adaptation judgment',
    activityPrompt: 'What does HRBA MEAL do with mixed evidence?',
    options: makeOptions(['Keep what works, adjust barriers, respond to safety and feedback issues, and explain the adaptation honestly.', 'Judge only by activity completion.', 'Hide weak signals so the report stays positive.']),
    insight: ['HRBA MEAL treats evidence as signals for learning and adaptation, not only proof of completion.'],
    cta: 'Continue to adaptation practice',
    nextId: 'M5-S1-15',
  }),
  'M5-S1-15': baseConfig({
    id: 'M5-S1-15',
    title: 'Practice: Adapt Based on Evidence',
    block: 'Decision Scenario',
    storyTitle: 'The evidence asks for a decision',
    story: ['The team sees barriers in timing, venue accessibility, referral clarity, feedback channels, and voice in meetings. It must decide what to adapt before claiming success.'],
    revealTitle: 'Adaptation options',
    revealItems: [
      ['Timing', 'Try alternative session times and check whether attendance patterns improve.'],
      ['Venue access', 'Move sessions or adjust seating, entry, signage, and support.'],
      ['Referral clarity', 'Revise messages and use formats people understand.'],
      ['Feedback channels', 'Add verbal and accessible options, then report back.'],
      ['Participation safety', 'Create spaces where youth, women, persons with disabilities, and others can speak safely.'],
    ],
    activityTitle: 'Choose the responsible adaptation package',
    activityPrompt: 'Which package best fits the evidence?',
    options: makeOptions(['Adjust timing and venues, clarify referral steps, diversify feedback channels, handle safety concerns, and consult affected groups before finalizing changes.', 'Run more of the same sessions.', 'Stop collecting feedback.']),
    insight: ['Adaptation should be evidence-based, consulted, safe, and documented.'],
    cta: 'Continue to logframe review',
    nextId: 'M5-S1-15A',
  }),
  'M5-S1-15A': baseConfig({
    id: 'M5-S1-15A',
    title: 'Light HRBA Logframe Review: Does the Evidence Match the Logic?',
    block: 'Logframe Review Tool Activity',
    storyTitle: 'The logframe guides what the team sees',
    story: ['The logframe can track activity completion, but it does not yet guide the team to collect evidence on inclusion, voice, feedback response, safety, gender, disability, and adaptation.'],
    revealTitle: 'Light logframe review checks',
    revealItems: [
      ['Outcome', 'Does the outcome describe meaningful change, not only activity completion?'],
      ['Indicators', 'Do indicators capture inclusion, participation, feedback, safety, change, and adaptation?'],
      ['Evidence sources', 'Are sources practical, safe, and sufficient?'],
      ['Assumptions and risks', 'Do assumptions include access barriers, power dynamics, and data safety?'],
      ['Gender and disability', 'Are commitments visible in indicators, activities, budget, and evidence?'],
    ],
    activityTitle: 'Choose the strongest logframe repair',
    activityPrompt: 'What should the team repair first?',
    options: makeOptions(['Align outcome, indicators, evidence sources, risks, gender/disability checks, and learning decisions with the rights problem.', 'Only update the output numbers.', 'Remove assumptions because they are hard to monitor.']),
    insight: ['A light HRBA logframe review checks whether the evidence matches the logic the project claims.'],
    cta: 'Continue to responsible reporting',
    nextId: 'M5-S1-16',
  }),
  'M5-S1-16': baseConfig({
    id: 'M5-S1-16',
    title: 'Responsible Reporting: Tell the Truth Safely',
    block: 'Report Repair / Before-After Comparison',
    storyTitle: 'The report needs honest, safe language',
    story: ['The draft says the project successfully reached vulnerable community members and improved awareness. That claim is too broad unless the evidence supports inclusion, safety, change, and adaptation.'],
    revealTitle: 'Risky reporting phrases',
    revealItems: [
      ['Successfully reached vulnerable community members', 'This overclaims if the evidence does not show who was reached, who was missed, and whether participation was meaningful.'],
      ['Improved awareness', 'This needs evidence of understanding, confidence, referral knowledge, or practice change.'],
      ['Changed lives', 'This is often too broad and unsupported by short project evidence.'],
      ['No challenges reported', 'Silence does not prove no barriers; it may mean feedback channels were inaccessible or unsafe.'],
    ],
    activityTitle: 'Repair the reporting claim',
    activityPrompt: 'Which claim is more responsible?',
    options: makeOptions(['The project completed planned sessions and reached many participants; feedback and participation evidence also showed barriers in timing, access, referral clarity, and voice, which the team began to address.', 'The project changed the lives of all vulnerable people.', 'No issues occurred because attendance was high.']),
    insight: ['Responsible reporting tells the truth safely: what happened, what evidence shows, what remains uncertain, what risks were managed, and what will adapt.'],
    cta: 'Continue to risky claims practice',
    nextId: 'M5-S1-17',
  }),
  'M5-S1-17': baseConfig({
    id: 'M5-S1-17',
    title: 'Practice: Spot Risky Reporting Claims',
    block: 'Knowledge Check / Claim Diagnosis',
    storyTitle: 'Not every positive claim is safe or supported',
    story: ['The team reviews several draft claims before submitting the report. Some are too broad, unsupported, identifying, or activity-focused.'],
    revealTitle: 'Risky claim types',
    revealItems: [
      ['Unsupported impact claim', 'Claims large change without enough evidence.'],
      ['Unsafe detail claim', 'Uses personal or identifying information that can create risk.'],
      ['Activity-only claim', 'Treats completed sessions as proof of inclusion or change.'],
      ['No-feedback claim', 'Equates low complaint numbers with satisfaction.'],
    ],
    activityTitle: 'Diagnose the risky claim',
    activityPrompt: 'Which claim is safest and most evidence-based?',
    options: makeOptions(['The evidence suggests improved reach, but also shows barriers that require response; the team will adapt timing, access, feedback, and referral communication.', 'All participants are empowered now.', 'The named participant from a small community proves the project worked.']),
    insight: ['Safer claims are specific, evidence-based, anonymized, and honest about limitations and next steps.'],
    cta: 'Continue to capstone evidence simulator',
    nextId: 'M5-S1-18',
  }),
  'M5-S1-18': {
    screenId: 'M5-S1-18',
    context: 'Module 5 · HRBA in MEAL',
    title: 'Capstone Evidence Simulator',
    lead: 'Bring the Module 5 skills together in one realistic project evidence review.',
    blockType: 'Scenario-Based Evidence Lab',
    storyTitle: 'Before we submit the report',
    story: [
      'Birhan Community Action is preparing a six-month report for its community awareness project. The project aimed to help community members understand their rights and know where to seek information or support.',
      'The team completed many planned activities, but the evidence file shows a more complex picture.',
      'Hana turns to you and says: “Before we submit the report, help us make the evidence honest, safe, and useful.”',
    ],
    startButton: 'Open the evidence file',
    revealTitle: 'Tabbed case file',
    revealIntro: 'Open each evidence tab before making your decisions.',
    revealItems: makeReveal([
      ['Activity and reach evidence', '12 awareness sessions completed; 300 participants attended; 4 meetings held; 1 feedback box installed; 20 story notes collected; 85% average attendance. Initial draft claim: “The project successfully reached vulnerable community members and improved awareness.”'],
      ['Inclusion and participation evidence', 'Attendance declined among participants from remote areas. Women with care responsibilities attended less often in afternoon sessions. Youth attended but rarely spoke during mixed meetings. Participants asked more questions when local leaders were not present.'],
      ['Feedback evidence', 'Feedback themes include difficult timing, unclear referral steps, difficult written forms, discomfort speaking with leaders present, venue access difficulty, and one private safety concern. The team has not yet reported back.'],
      ['Gender and disability evidence', 'Women and men were counted, but gender barriers were not part of the original indicators. Disability access barriers were not tracked consistently. One session moved to a ground-floor room after feedback.'],
      ['Story and data safety evidence', 'One draft story includes name, exact small community, age, displacement status, disability-related detail, a quote about fear, a photo, and an unsupported claim that the project “changed her life.”'],
    ]),
    activityTitle: 'Decision 1: What is missing from the evidence?',
    activityPrompt: 'Select the evidence gaps that should be addressed before the team makes strong claims.',
    activityMode: 'multi',
    options: [
      'Whether participants understood where to seek information or support',
      'Who may have been missed or excluded',
      'Whether community input influenced decisions',
      'Whether feedback was reviewed, acted on, and reported back',
      'Whether gender-related barriers affected access, voice, or benefit',
      'Whether disability access barriers were identified and adjusted',
      'Whether stories were collected and reported safely',
      'Whether adaptations were made based on evidence',
      'Whether the report has enough photos',
      'Whether the feedback box was visible enough in the photo',
    ].map((label, index) => ({
      id: `capstone-${index + 1}`,
      label,
      body: index < 8
        ? 'This is a key HRBA MEAL evidence gap that should shape the final report and adaptation decisions.'
        : 'This may be an administrative or communications detail, but it is not the core HRBA evidence gap.',
      correct: index < 8,
    })),
    feedbackStrong: 'Strong evidence review. The report has useful activity and reach evidence, but the team still needs evidence about understanding, inclusion, participation influence, feedback response, gender and disability barriers, safe stories, and adaptation.',
    feedbackSupport: 'Look again. The strongest choices focus on evidence gaps that affect inclusion, accountability, safety, change, and adaptation.',
    insightTitle: 'Capstone synthesis',
    insight: [
      'A responsible HRBA MEAL decision reviews evidence gaps, unsafe details, feedback requiring action, needed adaptations, and the final reporting claim before submission.',
      'The strongest report is honest, safe, specific, and useful for learning.',
    ],
    ctaButton: 'Continue to Module 5 synthesis',
    nextId: 'M5-S1-19',
  },
  'M5-S1-19': baseConfig({
    id: 'M5-S1-19',
    title: 'Module 5 Synthesis: What HRBA MEAL Adds',
    block: 'Summary Cards / Concept Map',
    storyTitle: 'From numbers to rights-aware learning',
    story: ['Module 5 has moved from output reporting toward evidence that supports inclusion, accountability, safety, change, and adaptation.'],
    revealTitle: 'What HRBA MEAL adds',
    revealItems: hrbaMealLens,
    activityTitle: 'Choose the synthesis statement',
    activityPrompt: 'Which sentence best captures Module 5?',
    options: makeOptions(['Numbers matter, but HRBA MEAL asks what the numbers show and hide, and what the team should adapt.', 'MEAL is only for donor reporting.', 'Stories are always better than numbers.']),
    insight: ['HRBA MEAL strengthens evidence so CSOs can learn with rights-holders and report responsibly.'],
    cta: 'Continue to portfolio checkpoint',
    nextId: 'M5-S1-20',
  }),
  'M5-S1-20': baseConfig({
    id: 'M5-S1-20',
    title: 'Portfolio Checkpoint: HRBA MEAL Improvement Plan',
    block: 'Tool Activity / Portfolio Output',
    storyTitle: 'Turn learning into an improvement plan',
    story: ['The learner now identifies one practical MEAL improvement to take back to their organization. This portfolio is for learning. Keep it private and safe. Use a generalized issue rather than a real sensitive case.'],
    revealTitle: 'Improvement plan prompts',
    revealItems: [
      ['Evidence gap', 'What important HRBA evidence is currently missing or weak?'],
      ['Indicator repair', 'Which indicator or evidence source needs strengthening?'],
      ['Feedback response', 'How will feedback be analyzed, answered, and reported back?'],
      ['Safety check', 'What data or story detail should be protected, anonymized, aggregated, or not collected?'],
      ['Adaptation habit', 'How will the team use evidence to change practice?'],
    ],
    activityTitle: 'Choose a first improvement',
    activityPrompt: 'Which first step is practical and rights-aware?',
    options: makeOptions(['Repair one indicator and add one safer feedback-response routine for the next reporting cycle using fictional, generalized, or non-sensitive examples.', 'Rewrite every tool immediately without consultation.', 'Collect more personal detail to make the report stronger.']),
    insight: ['A small practical improvement can shift MEAL from counting activities toward learning and accountability.'],
    cta: 'Continue to portfolio synthesis',
    nextId: 'M5-S1-21',
  }),
  'M5-S1-21': baseConfig({
    id: 'M5-S1-21',
    title: 'Final Course Portfolio Synthesis',
    block: 'Portfolio Review Checklist',
    storyTitle: 'Connect the full HRBA practice portfolio',
    story: ['Module 5 outputs now connect with the full Modules 1-5 HRBA practice portfolio. This portfolio is for learning; keep it private and safe and do not add names, exact locations, identifiable stories, survivor details, children\'s details, officials\' names, organizational disputes, or sensitive incidents.'],
    revealTitle: 'Portfolio review checklist',
    revealItems: [
      ['Rights issue', 'Can you describe the rights issue behind the service or project problem?'],
      ['Design logic', 'Can you explain how activities respond to barriers, actors, risks, and evidence needs?'],
      ['MEAL evidence', 'Can you show evidence on inclusion, feedback, safety, change, and adaptation?'],
      ['Responsible reporting', 'Can you tell the truth safely and avoid unsupported claims?'],
    ],
    activityTitle: 'Choose the strongest portfolio habit',
    activityPrompt: 'What should the learner carry forward?',
    options: makeOptions(['Use the portfolio as a living practice tool: review, update, adapt, and discuss safely with the team.', 'Treat the portfolio as a one-time course assignment.', 'Use it to collect sensitive personal complaints.']),
    insight: ['The course portfolio is strongest when it helps a team make better, safer, more accountable decisions without collecting sensitive personal details.'],
    cta: 'Continue to 90-day action plan',
    nextId: 'M5-S1-22',
  }),
  'M5-S1-22': baseConfig({
    id: 'M5-S1-22',
    title: '90-Day HRBA MEAL Action Plan',
    block: 'Action Commitment / Reflection',
    storyTitle: 'A short plan for practice',
    story: ['The learner commits to one concrete HRBA MEAL action that can be started in the next 90 days.'],
    revealTitle: '90-day action plan areas',
    revealItems: [
      ['Review one report', 'Check what activity numbers show and what they hide.'],
      ['Repair one indicator', 'Add inclusion, feedback, safety, or change evidence.'],
      ['Improve feedback response', 'Clarify analysis, action, and report-back.'],
      ['Strengthen safe story use', 'Review consent, safe refusal, anonymization, small-cell identification risk, and claim accuracy.'],
    ],
    activityTitle: 'Choose a realistic action',
    activityPrompt: 'Which action is strongest for a 90-day commitment?',
    options: makeOptions(['Choose one report or indicator, review it with the HRBA MEAL lens, and agree one practical adaptation with colleagues.', 'Promise to redesign the entire MEAL system next week.', 'Wait until the next donor deadline.']),
    insight: ['A realistic action plan is specific, safe, owned by the team, and possible within normal work.'],
    cta: 'Continue to resource pack',
    nextId: 'M5-S1-23',
  }),
  'M5-S1-23': baseConfig({
    id: 'M5-S1-23',
    title: 'Module 5 Resource Pack',
    block: 'Resource and Download Blocks',
    storyTitle: 'Tools to keep using',
    story: ['This resource screen groups the practical Module 5 tools by the decision they help you make, so the pack is easier to use after the module.'],
    revealTitle: 'Resource pack items',
    revealItems: [
      ['Review evidence quality', 'HRBA MEAL lens questions on inclusion, participation, feedback, gender, disability, safety, change, and adaptation.'],
      ['Repair indicators', 'Prompts for strengthening weak output indicators so they show access, voice, feedback, and change.'],
      ['Protect data and stories', 'A quick check for useful, minimum, aggregated, anonymized, and protected evidence.'],
      ['Report responsibly', 'A checklist for evidence-based, safe, honest claims and clear adaptation decisions.'],
    ],
    activityTitle: 'Choose how to use the pack',
    activityPrompt: 'Which use is most practical?',
    options: makeOptions(['Use one tool in the next team reporting or reflection meeting.', 'Store the tools without discussing them.', 'Use the tools to collect identifying complaint details.']),
    insight: ['Resources are useful when they help a team make a safer decision, repair weak evidence, or explain an adaptation honestly.'],
    cta: 'Continue to peer exchange',
    nextId: 'M5-S1-24',
  }),
  'M5-S1-24': baseConfig({
    id: 'M5-S1-24',
    title: 'Peer Exchange and Practice Clinics',
    block: 'Peer Discussion Prompt / Assignment Link',
    storyTitle: 'Use the tools together',
    story: ['Peer exchange helps teams test MEAL judgments, but examples must remain safe, fictionalized, and non-identifying.'],
    revealTitle: 'Peer exchange prompts',
    revealItems: [
      ['One useful number', 'Share one number your organization often reports.'],
      ['One hidden question', 'Ask what that number does not show.'],
      ['One safe improvement', 'Suggest a safe evidence or indicator repair.'],
      ['One adaptation', 'Name what action could change based on the evidence.'],
    ],
    activityTitle: 'Choose the safest exchange practice',
    activityPrompt: 'Which peer exchange approach fits the course safeguards?',
    options: makeOptions(['Use fictionalized, non-identifying examples and focus on learning decisions, not sensitive personal data, disputes, survivor details, children\'s details, or officials\' names.', 'Share real complaints and names to make the discussion concrete.', 'Avoid peer learning altogether.']),
    insight: ['Peer practice is strongest when it is practical, respectful, and safe.'],
    cta: 'Continue to final completion bridge',
    nextId: 'M5-S1-25',
  }),
  'M5-S1-25': baseConfig({
    id: 'M5-S1-25',
    title: 'Final Completion Bridge: From Course to Practice',
    block: 'Closing Scenario + CTA',
    storyTitle: 'From course screen to team practice',
    story: ['The final bridge returns to the course’s practical purpose: helping CSOs use HRBA in real decisions, not only in training screens.'],
    revealTitle: 'Carry-forward commitments',
    revealItems: [
      ['Look beyond completion', 'Ask what activity reports show and what they miss.'],
      ['Design with rights in mind', 'Connect activities to barriers, responsibilities, risks, and evidence.'],
      ['Listen and respond', 'Treat feedback as evidence and report back.'],
      ['Tell the truth safely', 'Use honest, non-identifying, evidence-based reporting.'],
    ],
    activityTitle: 'Choose the final practice commitment',
    activityPrompt: 'What is the best next step after the course?',
    options: makeOptions(['Apply one HRBA MEAL tool to a real team discussion using safe, non-identifying evidence and generalized examples.', 'Wait for perfect data before acting.', 'Use HRBA only in proposal language.']),
    insight: ['The course ends, but HRBA practice continues in everyday choices about design, implementation, evidence, feedback, and reporting.'],
    cta: 'Complete Module 5',
    nextId: 'M5-PLAYER-COMPLETE',
  }),
};

const evidenceLadderLevels = [
  {
    id: 'outputs',
    label: 'Outputs',
    help: 'What was done or produced.',
  },
  {
    id: 'reach',
    label: 'Reach',
    help: 'Who accessed or participated.',
  },
  {
    id: 'quality',
    label: 'Quality / Inclusion barrier',
    help: 'How people experienced access, dignity, safety, timing, language, or relevance.',
  },
  {
    id: 'change',
    label: 'Change',
    help: 'What changed beyond activity completion.',
  },
  {
    id: 'learning',
    label: 'Learning & Accountability',
    help: 'What the CSO adapted, answered, referred, or explained back.',
  },
];

const evidenceLadderExamples = [
  {
    id: 'sessions-completed',
    text: '12 awareness sessions were completed.',
    answer: 'outputs',
    explanation: 'This counts what was delivered.',
  },
  {
    id: 'people-attended',
    text: '300 people attended sessions across four kebeles.',
    answer: 'reach',
    explanation: 'This begins to show who accessed the activity, but not yet who was missed.',
  },
  {
    id: 'care-timing',
    text: 'Women with care responsibilities said the afternoon timing excluded them.',
    answer: 'quality',
    explanation: 'This shows an inclusion and access barrier in the way the activity was experienced.',
  },
  {
    id: 'disability-venue',
    text: 'Persons with disabilities reported that the venue entrance was not accessible.',
    answer: 'quality',
    explanation: 'This is quality and inclusion evidence because it identifies a barrier to dignified access.',
  },
  {
    id: 'referral-steps',
    text: 'Participants could describe the referral steps after the session.',
    answer: 'change',
    explanation: 'This shows a change in knowledge or confidence beyond attendance.',
  },
  {
    id: 'session-time-changed',
    text: 'The team changed session times after reviewing feedback.',
    answer: 'learning',
    explanation: 'This shows evidence being used for adaptation.',
  },
  {
    id: 'feedback-answered',
    text: 'Feedback themes were reviewed, answered, and shared back within two weeks.',
    answer: 'learning',
    explanation: 'This is accountability evidence because the feedback loop was closed.',
  },
  {
    id: 'account-back',
    text: 'Community representatives heard what changed, what was not solved, and what happens next.',
    answer: 'learning',
    explanation: 'This shows account-back and ongoing learning.',
  },
];

const indicatorRevealOptions = [
  { id: 'inclusion', label: 'Inclusion and access quality' },
  { id: 'participation', label: 'Participation and influence' },
  { id: 'accountability', label: 'Accountability and response' },
  { id: 'safety', label: 'Safe learning and adaptation' },
  { id: 'accessibility', label: 'Accessibility and meaningful participation' },
];

const indicatorRepairItems = [
  {
    id: 'sessions',
    weak: 'Number of awareness sessions held.',
    strongLabel: 'Access quality indicator',
    strong: 'Percentage of participants from groups facing access barriers who report that timing, location, language, and communication support allowed them to participate.',
    reveal: 'inclusion',
    counts: 'Activity completion: sessions held.',
    why: 'whether access conditions allowed different groups to participate meaningfully',
    trigger: 'Adapt timing, venue, language, communication support, or outreach.',
    distractorLabel: 'Output-only poster count',
    distractor: 'Number of posters printed for awareness sessions.',
  },
  {
    id: 'meetings',
    weak: 'Number of people attending consultation meetings.',
    strongLabel: 'Influence indicator',
    strong: 'Number of meeting decisions or follow-up actions changed after participants raised access, safety, timing, or priority concerns.',
    reveal: 'participation',
    counts: 'Attendance: people present in meetings.',
    why: 'whether participation influenced decisions, not only whether people attended',
    trigger: 'Change facilitation, meeting design, decision records, or follow-up actions.',
    distractorLabel: 'Report-photo count',
    distractor: 'Number of meeting photos added to the report.',
  },
  {
    id: 'feedback',
    weak: 'Number of feedback boxes installed.',
    strongLabel: 'Feedback response indicator',
    strong: 'Percentage of feedback themes reviewed, answered, referred, or acted on within an agreed timeframe, with safe account-back to communities.',
    reveal: 'accountability',
    counts: 'Feedback tool installation.',
    why: 'accountability and response after feedback is received',
    trigger: 'Review themes, refer safely, act on feasible issues, and account back.',
    distractorLabel: 'Form-printing count',
    distractor: 'Number of feedback forms printed and stored.',
  },
  {
    id: 'stories',
    weak: 'Number of success stories collected.',
    strongLabel: 'Safe learning indicator',
    strong: 'Number of safe, consent-based evidence themes used to adapt activities, without identifying people or exposing sensitive details.',
    reveal: 'safety',
    counts: 'Story collection volume.',
    why: 'safe learning and adaptation without turning people into proof material',
    trigger: 'Use themes to adapt practice and report limits without identifying people.',
    distractorLabel: 'Named story count',
    distractor: 'Number of named stories with photos collected.',
  },
  {
    id: 'disability',
    weak: 'Number of persons with disabilities reached.',
    strongLabel: 'Meaningful access indicator',
    strong: 'Number or percentage of participants reporting that venue access, communication, timing, and support arrangements allowed meaningful participation.',
    reveal: 'accessibility',
    counts: 'Participant count by disability label.',
    why: 'accessibility and meaningful participation instead of diagnosis or token reach',
    trigger: 'Improve venue access, communication, support arrangements, and accessible feedback.',
    distractorLabel: 'Diagnosis count',
    distractor: 'Number of participant diagnoses recorded by facilitators.',
  },
];

const m5R06LogframeEvidence = [
  {
    element: 'Outcome or result',
    explanation: 'What change the project is trying to support',
    example: 'More inclusive and accountable participation in local service decisions',
  },
  {
    element: 'Indicator',
    explanation: 'What evidence will show progress',
    example: 'Feedback themes reviewed, answered, referred, or acted on within an agreed timeframe',
  },
  {
    element: 'Baseline',
    explanation: 'What the starting point is',
    example: 'How often feedback was reviewed and answered before the improvement',
  },
  {
    element: 'Target',
    explanation: 'What realistic improvement is expected',
    example: 'A defined share of feedback themes reviewed and answered within the agreed timeframe',
  },
  {
    element: 'Disaggregation',
    explanation: 'Which differences should be visible safely',
    example: 'By broad group or barrier type where useful and non-identifying',
  },
  {
    element: 'Data source',
    explanation: 'Where the evidence comes from',
    example: 'Feedback theme log, response tracker, account-back record',
  },
  {
    element: 'Use',
    explanation: 'What decision the evidence should guide',
    example: 'Adapt action, refer safely, and report back to communities',
  },
];

const safeDataDecisionOptions = [
  { id: 'collect', label: 'Collect safely', summary: 'Use when evidence is useful, necessary, non-identifying, and can guide action.' },
  { id: 'aggregate', label: 'Aggregate', summary: 'Use when patterns matter more than individual detail.' },
  { id: 'anonymize', label: 'Anonymize', summary: 'Remove names, faces, exact locations, and identifying details before use.' },
  { id: 'suppress-combine', label: 'Suppress or combine', summary: 'Use when a small number or rare combination could identify a person or very small group.' },
  { id: 'refer', label: 'Refer through safe pathway', summary: 'Use when the issue needs a protection, safeguarding, complaint, or referral process.' },
  { id: 'do-not-collect', label: 'Do not collect', summary: 'Use when information is unnecessary, unsafe, outside Awra\'s role, or likely to expose people.' },
];

const safeDataDecisionItems = [
  {
    id: 'broad-attendance',
    title: 'Broad attendance pattern',
    example: 'Attendance by broad age group and gender for a large community meeting.',
    answer: 'collect',
    meaning: 'Collect only useful, non-identifying categories.',
    feedback: 'Safe and useful. Broad categories can help Awra see participation patterns when the group is large enough and the data will guide inclusion decisions.',
    unsafeChoices: [],
  },
  {
    id: 'small-cell-disability',
    title: 'Small-cell disability access detail',
    example: 'A table showing two women with disabilities from one small village and their exact access concerns.',
    answer: 'suppress-combine',
    meaning: 'Combine categories or remove detail to prevent identification.',
    feedback: 'This is small-cell information. Even without names, the combination of disability, gender, location, and specific concern may identify people. Combine categories, remove exact location, or report the access barrier as a broader theme.',
    unsafeChoices: ['collect'],
  },
  {
    id: 'children-names',
    title: 'Request for children\'s names',
    example: 'A donor asks for the names of children with disabilities who missed school support activities.',
    answer: 'do-not-collect',
    meaning: 'Avoid collecting data that is not necessary or safe.',
    feedback: 'Do not collect or share names. Awra can use safe aggregate evidence on access barriers, support needs, or missed participation without identifying children.',
    unsafeChoices: ['collect', 'anonymize'],
  },
  {
    id: 'timing-barrier',
    title: 'Meeting timing barrier',
    example: 'Participants report that meeting times exclude caregivers and market-day workers.',
    answer: 'collect',
    meaning: 'Collect this as a non-identifying access-barrier theme.',
    feedback: 'Safe and useful. Awra can collect this as a theme and use it to adapt timing, communication, or outreach. Names and exact household details are not needed.',
    unsafeChoices: [],
  },
  {
    id: 'protection-concern',
    title: 'Sensitive protection concern',
    example: 'One person reports a sensitive protection concern through a feedback channel.',
    answer: 'refer',
    meaning: 'Handle sensitive concerns through agreed protection, safeguarding, or complaint pathways.',
    feedback: 'Do not discuss this publicly or use it as a report example. Record only minimum necessary information according to the agreed pathway and refer safely where appropriate.',
    unsafeChoices: ['collect', 'aggregate', 'anonymize'],
  },
  {
    id: 'accessible-venue',
    title: 'Accessible venue evidence',
    example: 'A disability inclusion indicator asks whether the venue, communication, and support arrangements were accessible.',
    answer: 'collect',
    meaning: 'Collect non-identifying evidence on access conditions and support arrangements.',
    feedback: 'Safe and useful when collected respectfully. Focus on accessibility barriers and support arrangements, not diagnoses or labels that are not needed for action.',
    unsafeChoices: [],
  },
];

const feedbackPathwayChoices = [
  {
    id: 'inform-clearly',
    label: 'Inform people clearly',
    body: 'Explain the feedback channel, what can be shared, and what happens next.',
    why: 'People cannot use a channel they do not understand or trust.',
    correct: true,
  },
  {
    id: 'accessible-options',
    label: 'Offer accessible options',
    body: 'Use more than one channel where possible: meeting explanation, trusted focal point, phone/SMS/WhatsApp, feedback desk, or community representative route.',
    why: 'One box at one venue may exclude people.',
    correct: true,
  },
  {
    id: 'receive-safely',
    label: 'Receive feedback safely',
    body: 'Allow feedback without public exposure or unnecessary personal detail.',
    why: 'Feedback can create risk if identity is exposed.',
    correct: true,
  },
  {
    id: 'minimum-recording',
    label: 'Record only what is needed',
    body: 'Record themes, urgency, referral need, and follow-up action; avoid unnecessary names or sensitive details.',
    why: 'Minimum necessary recording protects people.',
    correct: true,
  },
  {
    id: 'responsible-review',
    label: 'Review by responsible role',
    body: 'Route feedback to the person or mechanism able to review it safely.',
    why: 'Not every staff member should handle every concern.',
    correct: true,
  },
  {
    id: 'respond-refer',
    label: 'Respond or refer',
    body: 'Provide an answer, take action, refer, or escalate through the agreed pathway.',
    why: 'Feedback must lead to a response, not just storage.',
    correct: true,
  },
  {
    id: 'adapt-feedback',
    label: 'Adapt based on feedback',
    body: 'Use feedback themes to improve timing, venue, communication, facilitation, targeting, or service linkage.',
    why: 'Feedback becomes learning when it changes practice.',
    correct: true,
  },
  {
    id: 'account-back',
    label: 'Account back to communities',
    body: 'Explain what was heard, what changed, what did not, why, and next steps.',
    why: 'Account-back closes the loop and builds trust.',
    correct: true,
  },
  {
    id: 'count-only',
    label: 'Only count the number of feedback comments received',
    body: 'Counts do not show whether feedback was reviewed, answered, referred, or used.',
    why: 'Counting feedback is not the same as accountability.',
    correct: false,
  },
  {
    id: 'publish-complaints',
    label: 'Publish complaint examples to prove transparency',
    body: 'Complaint details may identify people or create retaliation risk.',
    why: 'Transparency should not expose people.',
    correct: false,
    unsafe: true,
  },
  {
    id: 'facilitators-investigate',
    label: 'Ask facilitators to investigate all sensitive complaints themselves',
    body: 'Sensitive concerns require agreed roles, mandate, training, and referral pathways.',
    why: 'Untrained investigation can make harm worse.',
    correct: false,
    unsafe: true,
  },
  {
    id: 'collect-all-names',
    label: 'Collect names for every feedback item so follow-up is easier',
    body: 'Names are not always necessary and may expose people.',
    why: 'Minimum necessary information is safer.',
    correct: false,
    unsafe: true,
  },
  {
    id: 'silence-satisfaction',
    label: 'Assume no feedback means everyone is satisfied',
    body: 'Silence may reflect fear, lack of trust, low access, or unclear information.',
    why: 'No feedback is not proof of trust or satisfaction.',
    correct: false,
  },
  {
    id: 'public-discussion',
    label: 'Discuss all complaints publicly in a community meeting',
    body: 'Public discussion can expose people and make unsafe concerns worse.',
    why: 'Sensitive feedback needs a safe pathway.',
    correct: false,
    unsafe: true,
  },
];

const clinicPracticeNotes = {
  'M5-R05': {
    why: 'Indicator repair is not only better wording. It changes what the CSO can learn, adapt, refer, engage on, and account back.',
    carry: 'Carry forward: choose one weak indicator pattern you may want to repair later in your HRBA MEAL repair note.',
  },
  'M5-R06': {
    why: 'Safe evidence is useful for action and uses the least detail needed to see access, barriers, participation, safety, change, and accountability.',
    carry: 'Carry forward: the safest evidence choice is the one that is useful for action and least likely to identify or expose people.',
  },
  'M5-R07': {
    why: 'Collect the minimum useful evidence needed for safe action. More detail is not always better evidence.',
    carry: 'Next, you will use the same safety logic to strengthen how feedback and complaints are received, reviewed, responded to, referred, adapted from, and explained back.',
  },
  'M5-R08': {
    why: 'A feedback channel becomes accountability only when people can use it safely, the team reviews it responsibly, action or referral follows, and communities hear what happened next.',
    carry: 'Next, you will use the same safety and accountability logic to handle stories, quotes, photos, and qualitative evidence ethically.',
  },
  'M5-R09': {
    why: 'Use the safest evidence that still tells the truth. Qualitative evidence should support learning and accountability without exposing people, creating pressure, or overclaiming results.',
    carry: 'Next, you will interpret the evidence Awra has and decide what should continue, what should adapt, what needs referral, and what should be explained back.',
  },
  'M5-R10': {
    why: 'MEAL evidence should guide action. Different evidence signals call for different decisions: continue, adapt, consult safely, refer, engage responsible actors, pause a claim, or account back.',
    carry: 'Next, you will use this interpretation to improve report claims so they are truthful, safe, accountable, and useful for learning.',
  },
  'M5-R11': {
    why: 'Rights-based reporting is stronger because it tells the truth about who was reached, who may be missing, what changed, what did not change, what evidence can show, and what the team will do next.',
    carry: 'Next, you will complete a module knowledge check that brings together indicator improvement, safe evidence, feedback response, ethical qualitative evidence, adaptation, reporting, and account-back.',
  },
  'M5-R12': {
    why: 'A strong HRBA MEAL cycle protects people, learns from evidence, changes practice when needed, and explains back what happened.',
    carry: 'Carry forward: on the next screen, you will turn this cycle into one practical repair note for your own CSO practice.',
  },
};

const ethicalEvidenceResponseOptions = [
  { id: 'decline-identifying', label: 'Decline names/faces and offer anonymized themes', summary: 'Protect identity and offer non-identifying evidence instead.' },
  { id: 'non-identifying-example', label: 'Use a consent-based, non-identifying example', summary: 'Use only non-identifying evidence with informed and voluntary consent.' },
  { id: 'aggregate-summary', label: 'Share a reviewed aggregate summary', summary: 'Share themes and actions, not raw complaint details.' },
  { id: 'protect-complaint', label: 'Refer or protect sensitive complaint details', summary: 'Sensitive complaint evidence should not be used as public proof.' },
  { id: 'explain-limits', label: 'Explain evidence limits honestly', summary: 'Avoid overclaiming and report what the evidence can support.' },
  { id: 'do-not-share', label: 'Do not share or collect this evidence', summary: 'Avoid identifiable child or disability-related evidence unless there is a clear, safe, necessary, consent-based, and approved purpose.' },
];

const ethicalEvidenceItems = [
  {
    id: 'names-photos',
    title: 'Names and photos request',
    request: 'Please send names and photos of people facing the biggest barriers so the report feels real.',
    answer: 'decline-identifying',
    feedback: 'Safer response. Awra should not share names or faces to make the report more powerful. It can share anonymized themes about barriers and explain what action it took.',
    unsafeChoices: ['non-identifying-example', 'aggregate-summary', 'explain-limits'],
  },
  {
    id: 'negative-quote',
    title: 'Direct quote from negative feedback',
    request: 'Add a direct quote from someone who gave negative feedback so the problem is clear.',
    answer: 'non-identifying-example',
    feedback: 'Safer response. A direct quote can identify a person through wording, location, role, or context. Awra can paraphrase the theme, remove identifying detail, or use a consent-based non-identifying quote where safe.',
    unsafeChoices: ['decline-identifying'],
  },
  {
    id: 'raw-log',
    title: 'Raw feedback log request',
    request: 'Send the raw feedback log so the donor can see all complaints.',
    answer: 'aggregate-summary',
    feedback: 'Safer response. Raw feedback logs may contain names, contact details, sensitive concerns, or identifying combinations. Awra should provide a reviewed summary of themes, response actions, referrals, and unresolved issues.',
    unsafeChoices: ['non-identifying-example', 'explain-limits'],
  },
  {
    id: 'success-story',
    title: 'Strong success story request',
    request: 'Give one strong story showing the project changed someone’s life.',
    answer: 'explain-limits',
    feedback: 'Safer response. A single story can be useful, but it should not overstate causality or turn a person into proof material. Awra can provide a non-identifying example and state what the evidence shows and what remains uncertain.',
    unsafeChoices: ['non-identifying-example'],
  },
  {
    id: 'complaint-example',
    title: 'Sensitive complaint example',
    request: 'Include one complaint example to prove Awra is transparent.',
    answer: 'protect-complaint',
    feedback: 'Safer response. Transparency does not mean exposing people. Complaint details should be protected, reviewed through the right pathway, summarized safely, and reported only as non-identifying themes and response actions.',
    unsafeChoices: ['non-identifying-example', 'aggregate-summary', 'explain-limits'],
  },
  {
    id: 'child-disability-story',
    title: 'Child or disability-related story',
    request: 'Can we include a story about a child with a disability who missed the activity, with enough details to show the barrier?',
    answer: 'do-not-share',
    feedback: 'Safer response. Children’s data and disability-related details need extra care. Awra can report the access barrier as an anonymized theme and explain the adaptation, without identifying the child or household.',
    unsafeChoices: ['decline-identifying', 'non-identifying-example', 'aggregate-summary', 'explain-limits'],
  },
];

const signalActionOptions = [
  { id: 'continue-monitor', label: 'Continue and monitor', summary: 'Keep the approach while continuing to listen for barriers or unintended harm.' },
  { id: 'adapt-access', label: 'Adapt Awra’s practice', summary: 'Change timing, access, communication, facilitation, feedback response, or follow-up based on the evidence.' },
  { id: 'consult-safely', label: 'Consult safely with affected groups', summary: 'Understand a barrier or missing voice without exposing people.' },
  { id: 'refer-safe-pathway', label: 'Refer through safe pathway', summary: 'Use the agreed protection, safeguarding, or complaint pathway instead of informal investigation.' },
  { id: 'engage-responsible-actor', label: 'Engage responsible actors constructively', summary: 'Share safe evidence with the actor responsible for helping remove the barrier or improve response.' },
  { id: 'pause-public-claim', label: 'Pause or narrow the claim', summary: 'Do not report a broad claim until evidence is safer and strong enough.' },
  { id: 'account-back', label: 'Account back to communities', summary: 'Explain what was heard, what changed, what remains unresolved, and next steps.' },
];

const signalDecisionItems = [
  {
    id: 'missing-groups',
    signal: 'Attendance was high, but informal women vendors and people from remote kebeles were rarely present.',
    answers: ['consult-safely'],
    explanation: 'Responsible action. High attendance does not prove inclusive reach. Awra should consult safely, review information routes, timing, location, and participation barriers, and avoid blaming people for not attending.',
  },
  {
    id: 'meeting-time',
    signal: 'Several participants said the meeting time excluded caregivers and market-day workers.',
    answers: ['adapt-access'],
    explanation: 'Responsible action. This is a practical barrier Awra can improve. The team can adjust meeting times, offer alternative information routes, and account back on what changed.',
  },
  {
    id: 'sensitive-concern',
    signal: 'A feedback theme suggests a sensitive protection concern that the project team is not trained to investigate.',
    answers: ['refer-safe-pathway'],
    explanation: 'Responsible action. Sensitive concerns require confidentiality, minimum necessary recording, and the right role or referral pathway. They should not be discussed in public meetings or used as report examples.',
  },
  {
    id: 'service-access',
    signal: 'Transport cost is blocking participation, and the barrier depends partly on a local service provider and a kebele committee.',
    answers: ['engage-responsible-actor'],
    explanation: 'Responsible action. Awra can adapt what it controls, but some barriers need constructive engagement with responsible actors. Use safe, non-identifying evidence and avoid public accusation without risk review.',
  },
  {
    id: 'feedback-trust',
    signal: 'Few people use the feedback channel because they do not know what happens after they submit concerns.',
    answers: ['account-back'],
    explanation: 'Responsible action. Trust requires account-back. Awra should explain the feedback process clearly, protect confidentiality, and show how feedback is reviewed and used.',
  },
  {
    id: 'broad-claim',
    signal: 'The team wants to report that everyone was reached, but the evidence does not include people who missed sessions.',
    answers: ['pause-public-claim'],
    explanation: 'Responsible action. Do not overclaim. Report what is known, name evidence limits safely, and explain what the team will check next.',
  },
];

const reportRepairItems = [
  {
    id: 'reach-claim',
    title: 'Reach claim',
    risky: 'The project reached everyone in Jiru Amba.',
    answer: 'reach-with-limits',
    selectedMeaning: 'Report reach honestly and name the evidence limit.',
    explanation: 'Safer claim. HRBA-informed reporting does not turn attendance into universal reach. It reports what is known and checks who may still be missing.',
    options: [
      { id: 'reach-with-limits', label: 'The project reached 240 participants, but the evidence does not yet show whether some groups were missed.', summary: 'Report reach honestly and name the evidence limit.' },
      { id: 'whole-community', label: 'The project reached the whole community because attendance was high.', summary: 'Risky: high attendance does not prove universal reach.' },
      { id: 'hide-missing-groups', label: 'Do not mention missing groups because it may make the report look weak.', summary: 'Risky: hiding limits weakens accountability and learning.', unsafe: true },
    ],
  },
  {
    id: 'feedback-claim',
    title: 'Feedback claim',
    risky: 'All feedback was positive.',
    answer: 'mixed-feedback-actions',
    selectedMeaning: 'Report mixed evidence and show response.',
    explanation: 'Safer claim. Feedback should not be flattened into "positive" if it includes concerns. A stronger report shows themes, response, adaptation, and follow-up.',
    options: [
      { id: 'mixed-feedback-actions', label: 'Feedback included useful positive comments and access concerns; the team reviewed themes and identified actions.', summary: 'Report mixed evidence and show response.' },
      { id: 'positive-only', label: 'Only report the positive feedback because the project is still ongoing.', summary: 'Risky: this hides concerns and weakens accountability.', unsafe: true },
      { id: 'detailed-negative-quote', label: 'Add a negative quote with details so the donor sees the issue clearly.', summary: 'Risky: direct detailed quotes can expose people.', unsafe: true },
    ],
  },
  {
    id: 'success-story-claim',
    title: 'Success story claim',
    risky: 'A named success story with a photo proves the project changed lives.',
    answer: 'non-identifying-story-limits',
    selectedMeaning: 'Use qualitative evidence safely and state limits.',
    explanation: 'Safer claim. A story can support learning, but it should not expose a person or prove more than the evidence can support.',
    options: [
      { id: 'non-identifying-story-limits', label: 'A consent-based, non-identifying example and feedback themes suggest useful changes, but the report avoids identifying people or overclaiming impact.', summary: 'Use qualitative evidence safely and state limits.' },
      { id: 'name-photo-consent', label: 'Use the name and photo because consent was given.', summary: 'Risky: consent alone does not remove identification or pressure risks.', unsafe: true },
      { id: 'emotional-detail', label: 'Add more emotional detail so the story is stronger.', summary: 'Risky: emotional detail can identify or pressure people.', unsafe: true },
    ],
  },
  {
    id: 'activity-completion-claim',
    title: 'Activity completion claim',
    risky: 'Activities were completed successfully.',
    answer: 'completion-with-adaptation',
    selectedMeaning: 'Move from completion to learning and adaptation.',
    explanation: 'Safer claim. Reporting completion is useful, but HRBA MEAL also reports what the team learned and what changed because of evidence.',
    options: [
      { id: 'completion-with-adaptation', label: 'Activities were completed, and evidence led to adaptations in meeting timing, communication, and feedback follow-up.', summary: 'Move from completion to learning and adaptation.' },
      { id: 'no-analysis-needed', label: 'Activities were completed, so no further MEAL analysis is needed.', summary: 'Weak: completion alone does not show inclusion, response, or change.' },
      { id: 'meetings-main-success', label: 'Success should be measured mainly by the number of meetings held.', summary: 'Weak: meeting counts are not enough evidence of accountable change.' },
    ],
  },
  {
    id: 'inclusion-claim',
    title: 'Inclusion claim',
    risky: 'No major inclusion gaps were found.',
    answer: 'limits-check-barriers',
    selectedMeaning: 'Avoid claiming absence of gaps when evidence is incomplete.',
    explanation: 'Safer claim. If the evidence did not reach some groups, the report should not say gaps were absent. It should state what is known, what remains uncertain, and what the team will check next.',
    options: [
      { id: 'limits-check-barriers', label: 'No major gaps were confirmed yet, but the evidence has limits and the team will check participation barriers safely.', summary: 'Avoid claiming absence of gaps when evidence is incomplete.' },
      { id: 'no-complaints-no-problems', label: 'No complaints means there were no inclusion problems.', summary: 'Risky: silence or low feedback use does not prove inclusion.' },
      { id: 'hide-uncertainty', label: 'Do not mention uncertainty because it may reduce confidence in the project.', summary: 'Risky: hiding uncertainty undermines credible reporting.', unsafe: true },
    ],
  },
  {
    id: 'community-communication-claim',
    title: 'Community communication claim',
    risky: 'Communities were informed about the project.',
    answer: 'account-back-next-steps',
    selectedMeaning: 'Move from information sharing to account-back.',
    explanation: 'Safer claim. Information sharing is important, but accountability also requires explaining decisions, changes, unresolved issues, and next steps.',
    options: [
      { id: 'account-back-next-steps', label: 'Communities received information, and Awra will account back on what was heard, what changed, what did not change, and next steps.', summary: 'Move from information sharing to account-back.' },
      { id: 'one-information-sharing', label: 'Providing information once is enough for accountability.', summary: 'Weak: accountability requires response and account-back, not one-way information.' },
      { id: 'donor-only-account-back', label: 'Only report account-back to the donor, not to communities.', summary: 'Risky: communities also need to hear what happened next.', unsafe: true },
    ],
  },
];

const capstoneSteps = [
  {
    id: 'meaningful-participation',
    title: 'Which indicator best checks meaningful participation?',
    scenario: 'Awra wants to know whether participation meetings were useful for HRBA-informed MEAL, not only whether meetings happened.',
    prompt: 'Which indicator best checks whether people could participate meaningfully?',
    answer: 'A',
    options: [
      { id: 'A', label: 'Percentage of participants from groups facing access barriers who report that meeting timing, location, communication, and support arrangements allowed meaningful participation.', summary: 'Correct. This indicator checks participation quality and access conditions, not only the number of meetings held.' },
      { id: 'B', label: 'Number of consultation meetings held.', summary: 'Not quite. This counts activity completion. It does not show whether different groups could participate meaningfully.' },
      { id: 'C', label: 'Number of photos showing community participation.', summary: 'Not quite. Photos may support communication, but they do not show access, influence, inclusion, or safe participation.', unsafe: true },
    ],
    takeaway: 'Meaningful participation requires evidence about access, support, timing, communication, and influence.',
  },
  {
    id: 'small-cell-data',
    title: 'How should Awra handle small-cell data safely?',
    scenario: 'Awra’s monitoring form shows that two women with disabilities from one small village raised the same access concern.',
    prompt: 'What should Awra do with this evidence?',
    answer: 'A',
    options: [
      { id: 'A', label: 'Combine or suppress the identifying details and report the access concern as a broader non-identifying theme.', summary: 'Correct. The access concern is useful, but the small number and specific details could identify people. A broader theme can still guide action safely.' },
      { id: 'B', label: 'Report the village and exact concern because names are removed.', summary: 'Not quite. Removing names is not always enough. A small number, exact location, and specific access concern can still identify people.', unsafe: true },
      { id: 'C', label: 'Delete all disability-related evidence because it is always unsafe.', summary: 'Not quite. Disability-related evidence can be useful when it is collected safely and focused on access barriers, not on identifying people or diagnoses.' },
    ],
    takeaway: 'Safe disaggregation uses the minimum detail needed to see barriers without identifying people.',
  },
  {
    id: 'feedback-accountability',
    title: 'What should Awra do after receiving feedback?',
    scenario: 'Several feedback themes show that women vendors did not receive meeting information early enough to influence local service priorities.',
    prompt: 'Which response best turns feedback into accountability?',
    answer: 'A',
    options: [
      { id: 'A', label: 'Review the feedback themes, adapt the information route and timing, and account back on what changed.', summary: 'Correct. Feedback becomes accountability evidence when it is reviewed, acted on where possible, and explained back to communities.' },
      { id: 'B', label: 'Count the feedback comments and include the total in the donor report.', summary: 'Not quite. Counting feedback is useful, but not enough. The report should also show response, adaptation, and account-back.' },
      { id: 'C', label: 'Ask women vendors to submit names so Awra can verify who complained.', summary: 'Not quite. Names are not needed to act on a non-identifying feedback theme. Asking for names may create exposure or reduce trust.', unsafe: true },
    ],
    takeaway: 'Feedback becomes accountability when it is reviewed, acted on, and explained back.',
  },
  {
    id: 'story-photo-pressure',
    title: 'How should Awra respond to story and photo pressure?',
    scenario: 'A communications colleague asks for a named story and photo to show that the project changed someone’s life.',
    prompt: 'What is the safest professional response?',
    answer: 'A',
    options: [
      { id: 'A', label: 'Offer an anonymized theme or consent-based non-identifying example, and explain what the evidence can and cannot claim.', summary: 'Correct. This protects identity and dignity while still allowing Awra to report useful learning and avoid overclaiming.' },
      { id: 'B', label: 'Use the name and photo if the person agreed once during the activity.', summary: 'Not quite. Consent must be informed, voluntary, specific, and safe. Consent alone does not remove all risk.', unsafe: true },
      { id: 'C', label: 'Avoid all qualitative evidence because stories are always too risky.', summary: 'Not quite. Qualitative evidence can be useful. The issue is to use it ethically, safely, and truthfully.' },
    ],
    takeaway: 'Qualitative evidence can support learning when it protects identity, dignity, and evidence limits.',
  },
  {
    id: 'partial-progress',
    title: 'What should Awra do when evidence shows partial progress?',
    scenario: 'Attendance improved after Awra changed the meeting time, but remote kebele residents are still under-represented.',
    prompt: 'Which action best uses the evidence for adaptation?',
    answer: 'A',
    options: [
      { id: 'A', label: 'Continue the improved timing and consult safely with remote kebele residents about remaining access barriers.', summary: 'Correct. The evidence shows that one change helped, but also that another group may still be missing. Awra should keep what works and safely investigate the remaining barrier.' },
      { id: 'B', label: 'Report that the participation problem is solved because attendance improved.', summary: 'Not quite. Improved attendance is positive, but it does not prove that all groups were reached or that all barriers are solved.' },
      { id: 'C', label: 'Collect exact household locations of remote residents who missed the meeting.', summary: 'Not quite. Exact household locations are usually unnecessary and may create risk. Broader access-barrier evidence is safer.', unsafe: true },
    ],
    takeaway: 'Partial progress should guide continued adaptation and safe consultation, not overclaiming.',
  },
  {
    id: 'report-account-back',
    title: 'What should the report and account-back say?',
    scenario: 'Awra needs to report progress and explain back to communities what happened after the MEAL review.',
    prompt: 'Which statement best reports progress and limits truthfully?',
    answer: 'A',
    options: [
      { id: 'A', label: 'Awra reached many participants, identified access and feedback barriers, adapted timing and information routes, still needs to check remote participation, and will explain what changed and what remains unresolved.', summary: 'Correct. This statement reports progress, names limits, shows adaptation, avoids overclaiming, and includes account-back.' },
      { id: 'B', label: 'Awra reached the whole community and all feedback was positive.', summary: 'Not quite. This overclaims. The evidence shows progress, but also barriers, mixed feedback, and groups that may still be missing.', unsafe: true },
      { id: 'C', label: 'Awra should report the positive numbers and keep unresolved issues internal.', summary: 'Not quite. A rights-based report should not hide limits. It should state limits safely and explain next steps.', unsafe: true },
    ],
    takeaway: 'Responsible reporting names progress, limits, adaptation, unresolved issues, and account-back.',
  },
];

const repairNoteSteps = [
  {
    id: 'area',
    title: 'What MEAL practice will you improve?',
    outputLabel: 'Practice focus',
    sentenceLabel: 'I will improve',
    prompt: 'Choose one area where the team can improve its MEAL practice.',
    options: [
      { id: 'improve-indicator', label: 'Improve an indicator', summary: 'Use an indicator that shows access, participation, feedback response, safety, or change.' },
      { id: 'improve-safe-data', label: 'Improve safe data collection', summary: 'Collect only useful, necessary, protected, and explainable evidence.' },
      { id: 'improve-feedback', label: 'Improve feedback response', summary: 'Move from receiving feedback to reviewing, responding, referring, adapting, and accounting back.' },
      { id: 'improve-qualitative', label: 'Improve qualitative evidence use', summary: 'Use stories, quotes, examples, and feedback themes ethically and safely.' },
      { id: 'improve-interpretation', label: 'Improve evidence interpretation', summary: 'Use MEAL evidence to decide what should continue, adapt, be referred, or be followed up.' },
      { id: 'improve-reporting', label: 'Improve reporting and account-back', summary: 'Report progress, limits, adaptations, unresolved issues, and next steps truthfully.' },
    ],
  },
  {
    id: 'gap',
    title: 'Which HRBA-MEAL question will guide the improvement?',
    outputLabel: 'Guiding HRBA-MEAL question',
    sentenceLabel: 'I will keep asking',
    prompt: 'Choose the question the team should keep asking during MEAL review.',
    options: [
      { id: 'who-missing', label: 'Who may still be missing?', summary: 'Check whether activity numbers hide groups who were not reached or heard.' },
      { id: 'barriers', label: 'What barriers affected access or participation?', summary: 'Look for timing, distance, disability access, information, language, trust, cost, or safety barriers.' },
      { id: 'feedback-response', label: 'Did feedback receive a response?', summary: 'Check whether feedback was reviewed, answered, referred, or used for adaptation.' },
      { id: 'what-changed', label: 'What changed because of the evidence?', summary: 'Look for adaptation, improved access, better information, safer participation, or follow-up.' },
      { id: 'safe-evidence-question', label: 'What evidence is safe enough to use?', summary: 'Check whether the evidence is useful, necessary, non-identifying, and protected.' },
      { id: 'explain-back', label: 'What should be explained back?', summary: 'Tell communities what was heard, what changed, what did not change, why, and what happens next.' },
    ],
  },
  {
    id: 'repair',
    title: 'What evidence will you use safely?',
    outputLabel: 'Safe evidence to use',
    sentenceLabel: 'I will use',
    prompt: 'Choose the safest evidence source for the improvement.',
    options: [
      { id: 'broad-patterns', label: 'Broad participation patterns', summary: 'Use non-identifying attendance or participation patterns by broad groups where safe.' },
      { id: 'barrier-themes', label: 'Access-barrier themes', summary: 'Use non-identifying themes about timing, distance, disability access, information, language, trust, cost, or safety.' },
      { id: 'feedback-themes', label: 'Feedback themes and response actions', summary: 'Use summarized feedback themes, what was reviewed, what was answered, what was referred, and what changed.' },
      { id: 'qualitative-themes', label: 'Safe qualitative themes', summary: 'Use anonymized themes or consent-based non-identifying examples, without names, faces, or exact locations.' },
      { id: 'adaptation-records', label: 'Adaptation records', summary: 'Use notes showing what the team changed because of evidence or feedback.' },
      { id: 'account-back-records', label: 'Account-back records', summary: 'Use evidence that communities were told what was heard, what changed, what did not, and next steps.' },
    ],
  },
  {
    id: 'involve',
    title: 'What safety boundary will you keep?',
    outputLabel: 'Safety boundary',
    sentenceLabel: 'I will protect people by applying this boundary',
    prompt: 'Choose the safety boundary that protects rights-holders.',
    options: [
      { id: 'no-names-faces', label: 'No names or faces', summary: 'Do not use names, photos, or identifying images.' },
      { id: 'no-exact-rare', label: 'No exact locations or rare details', summary: 'Avoid details that could identify a person, household, or small group.' },
      { id: 'no-raw-logs', label: 'No raw complaint logs', summary: 'Use reviewed themes and response actions instead of raw feedback or complaint records.' },
      { id: 'no-child-disability-identifying', label: 'No child or disability-identifying details', summary: 'Use safe access-barrier themes instead of identifiable child or disability-related information.' },
      { id: 'no-overclaims', label: 'No unsupported success claims', summary: 'Avoid claiming impact or full reach when the evidence does not support it.' },
      { id: 'referral-pathways', label: 'Use referral pathways for sensitive concerns', summary: 'Handle sensitive feedback through agreed safeguarding, protection, complaint, or referral pathways.' },
    ],
  },
  {
    id: 'limit',
    title: 'What action should follow?',
    outputLabel: 'Action to take',
    sentenceLabel: 'The next practical action is',
    prompt: 'Choose one practical action linked to the evidence.',
    options: [
      { id: 'adjust-access', label: 'Adjust timing, venue, or communication', summary: 'Change how activities are organized so more people can access and participate.' },
      { id: 'improve-one-indicator', label: 'Improve one indicator', summary: 'Revise an indicator so it shows access, participation, response, safety, or change.' },
      { id: 'strengthen-feedback', label: 'Strengthen the feedback pathway', summary: 'Clarify how feedback is received, reviewed, responded to, referred, adapted from, and explained back.' },
      { id: 'consult-affected', label: 'Consult safely with affected groups', summary: 'Use accessible, voluntary, non-identifying methods to understand remaining barriers.' },
      { id: 'engage-actors', label: 'Engage responsible actors constructively', summary: 'Share safe evidence with the actor responsible for helping remove a barrier or improve response.' },
      { id: 'revise-report-claim', label: 'Revise a report claim', summary: 'Report progress and limits honestly, without exposing people or overclaiming.' },
    ],
  },
  {
    id: 'accountBack',
    title: 'How will the team account back?',
    outputLabel: 'Account-back step',
    sentenceLabel: 'The team should account back by',
    prompt: 'Choose how the team will explain back safely.',
    options: [
      { id: 'heard-and-changed', label: 'Share what was heard and what changed', summary: 'Explain the main feedback or evidence themes and the changes made.' },
      { id: 'not-changed-why', label: 'Share what did not change and why', summary: 'Explain unresolved issues, limits, or decisions the project could not make.' },
      { id: 'next-steps', label: 'Share next steps', summary: 'Tell communities what the team will check, adapt, refer, or follow up next.' },
      { id: 'accessible-routes', label: 'Use accessible communication routes', summary: 'Use formats and channels that different groups can access safely.' },
      { id: 'protect-identities', label: 'Protect identities while sharing themes', summary: 'Report non-identifying themes instead of names, quotes, complaint details, or photos.' },
      { id: 'next-meal-cycle', label: 'Link account-back to the next MEAL review', summary: 'Use community account-back as part of the next monitoring and learning cycle.' },
    ],
  },
];

const bridgeActionGroups = [
  {
    id: 'day30',
    outputLabel: 'First 30 days: prepare',
    title: 'In the first 30 days: prepare one improvement',
    prompt: 'Choose one preparation action.',
    options: [
      { id: 'review-indicator', label: 'Review one indicator', summary: 'Check whether one indicator shows access, participation, feedback response, safety, or change.' },
      { id: 'review-data-source', label: 'Review one data source', summary: 'Check whether one form, list, log, or report collects only useful and safe evidence.' },
      { id: 'map-feedback-pathway', label: 'Map one feedback pathway', summary: 'Clarify who receives feedback, who reviews it, who responds or refers, and how account-back happens.' },
      { id: 'identify-missing-group', label: 'Identify one group that may be missing', summary: 'Use safe, non-identifying evidence to check whether one group is under-represented.' },
      { id: 'agree-safety-boundary', label: 'Agree one safety boundary', summary: 'Decide what the team will not collect or report, such as names, exact locations, raw complaints, photos, or identifying stories.' },
      { id: 'prepare-account-back-message', label: 'Prepare one account-back message', summary: 'Draft a simple message explaining what was heard, what changed, what did not change, and next steps.' },
    ],
  },
  {
    id: 'day60',
    outputLabel: 'Next 60 days: test',
    title: 'In the next 60 days: test one change',
    prompt: 'Choose one action to test.',
    options: [
      { id: 'use-improved-indicator', label: 'Use an improved indicator', summary: 'Test one indicator that shows access, participation, feedback response, safety, or change.' },
      { id: 'use-safer-categories', label: 'Use safer evidence categories', summary: 'Use broad, non-identifying categories to review who participated and who may still be missing.' },
      { id: 'test-feedback-response', label: 'Test a feedback response step', summary: 'Track whether feedback was reviewed, answered, referred, or used for adaptation.' },
      { id: 'adjust-access', label: 'Adjust timing, venue, or communication', summary: 'Change one practical barrier that affects participation or access.' },
      { id: 'use-safer-qualitative', label: 'Use safer qualitative evidence', summary: 'Replace names, photos, raw quotes, or complaint details with anonymized themes or non-identifying examples.' },
      { id: 'consult-safely', label: 'Consult safely with affected groups', summary: 'Use accessible, voluntary, non-identifying methods to understand remaining barriers.' },
    ],
  },
  {
    id: 'day90',
    outputLabel: 'By 90 days: learn and account back',
    title: 'By 90 days: learn and account back',
    prompt: 'Choose one learning and account-back action.',
    options: [
      { id: 'review-change', label: 'Review what changed and what did not', summary: 'Compare the evidence before and after the improvement.' },
      { id: 'summarize-feedback', label: 'Summarize feedback themes and responses', summary: 'Show what was heard, what was answered, what was referred, and what still needs follow-up.' },
      { id: 'improve-report-claim', label: 'Improve one report claim', summary: 'Report progress and limits truthfully, without overclaiming or exposing people.' },
      { id: 'share-account-back', label: 'Share an account-back message', summary: 'Explain what was heard, what changed, what did not change, why, and next steps.' },
      { id: 'engage-actors-safe-evidence', label: 'Engage responsible actors with safe evidence', summary: 'Use non-identifying evidence to discuss follow-up with a service actor, committee, partner, or public duty-bearer.' },
      { id: 'choose-next-improvement', label: 'Choose the next MEAL improvement', summary: 'Use the learning review to decide what the team should improve next.' },
    ],
  },
  {
    id: 'accountBackRoute',
    outputLabel: 'Account-back route',
    title: 'How will the team account back safely?',
    prompt: 'Choose one account-back route.',
    options: [
      { id: 'community-update', label: 'Short community update', summary: 'Share a simple non-sensitive update during the next community meeting or activity.' },
      { id: 'partner-briefing', label: 'Partner or representative briefing', summary: 'Share a safe summary through trusted partners or community representatives.' },
      { id: 'accessible-message', label: 'Accessible notice or audio message', summary: 'Use a format that people with different literacy, language, mobility, or access needs can understand.' },
      { id: 'feedback-channel-update', label: 'Feedback-channel update', summary: 'Use the feedback channel to explain what was heard and what happened next.' },
      { id: 'next-activity-message', label: 'Next activity opening message', summary: 'Begin the next activity by explaining what changed because of previous feedback or evidence.' },
      { id: 'small-group-discussion', label: 'Small-group safe discussion', summary: 'Use a small, voluntary, non-identifying discussion where a public update could expose people.' },
    ],
  },
  {
    id: 'safetyRule',
    outputLabel: 'Safety rule',
    title: 'What safety rule will guide the plan?',
    prompt: 'Choose one rule the team will keep throughout the 90 days.',
    options: [
      { id: 'minimum-evidence', label: 'Use minimum necessary evidence', summary: 'Collect only what is needed to guide a safe and useful decision.' },
      { id: 'protect-identities', label: 'Protect identities', summary: 'Do not use names, faces, exact locations, rare details, or identifying combinations.' },
      { id: 'themes-not-details', label: 'Use themes instead of raw details', summary: 'Report feedback, complaints, and stories as non-identifying themes.' },
      { id: 'avoid-unsupported-claims', label: 'Avoid unsupported claims', summary: 'Do not claim "everyone was reached" or "all feedback was positive" unless evidence supports it.' },
      { id: 'safe-referrals', label: 'Use safe referral pathways', summary: 'Do not handle sensitive concerns informally or publicly.' },
      { id: 'account-back-without-exposure', label: 'Account back without exposing people', summary: 'Explain themes, actions, limits, and next steps without sharing identifying details.' },
    ],
  },
];

function getIndicatorChoiceSummary(
  item: (typeof indicatorRepairItems)[number],
  value: string | undefined,
) {
  if (value === 'strong') {
    return item.strong;
  }

  if (value === 'distractor') {
    return item.distractor;
  }

  return '';
}

function getOptionSummary(options: Array<{ id: string; label: string; summary?: string }>, value: string | undefined) {
  return options.find((option) => option.id === value)?.summary || '';
}

function getModule5Feedback(config: Module5ScreenConfig, selectedIds: string[], strongAnswer: boolean) {
  if (config.screenId !== 'M5-R02') {
    return {
      kicker: strongAnswer ? 'Strong judgment' : 'Keep looking deeper',
      title: strongAnswer ? 'This is the HRBA MEAL move.' : 'A useful start.',
      body: strongAnswer ? config.feedbackStrong : config.feedbackSupport,
    };
  }

  const selectedCorrect = selectedIds.filter((id) => config.options.find((option) => option.id === id)?.correct);
  const missed = config.options
    .filter((option) => option.correct && !selectedIds.includes(option.id))
    .map((option) => option.label);
  const selectedDistractors = selectedIds.filter(
    (id) => !config.options.find((option) => option.id === id)?.correct,
  );

  if (strongAnswer) {
    return {
      kicker: 'Strong judgment',
      title: 'You found the main rights-based evidence gaps.',
      body: config.feedbackStrong,
    };
  }

  if (selectedCorrect.length === 0 && selectedDistractors.length > 0) {
    return {
      kicker: 'Weak evidence diagnosis',
      title: 'Formatting is not the same as accountability evidence.',
      body: 'You selected mainly administrative or visibility issues. Look again for rights-based evidence gaps: who was missed, who influenced decisions, whether feedback was answered, whether stories and data were safe, and whether anything changed beyond attendance.',
    };
  }

  return {
    kicker: 'Partial evidence diagnosis',
    title: 'You noticed some gaps; widen the evidence lens.',
    body: missed.length > 0
      ? `You selected some useful gaps, but still missed: ${missed.join('; ')}. Strong HRBA MEAL checks inclusion, participation, feedback response, safe evidence, disability access, different barriers, change, and adaptation.`
      : config.feedbackSupport,
  };
}

function EvidenceVisual({ config }: { config: Module5ScreenConfig }) {
  if (config.visualSrc) {
    return (
      <figure className="m5-visual-card m5-visual-card--asset">
        <img src={config.visualSrc} alt={config.visualAlt || `${config.title} visual support.`} />
        <figcaption>
          <span className="cso-readable-label-chip">{config.blockType}</span>
          <span className="cso-readable-label-chip">Text alternative is provided in the screen content.</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <div
      className="m5-visual-card"
      role="img"
      aria-label="Illustrated MEAL workspace with report cards, evidence signals, feedback notes, and adaptation decisions."
    >
      <div className="m5-visual-card__screen">
        <span className="cso-readable-label-chip">Report</span>
        <span className="cso-readable-label-chip">Feedback</span>
        <span className="cso-readable-label-chip">Evidence</span>
      </div>
      <div className="m5-visual-card__signals">
        <span className="cso-readable-label-chip">{config.blockType}</span>
        <span className="cso-readable-label-chip">Inclusion</span>
        <span className="cso-readable-label-chip">Safety</span>
        <span className="cso-readable-label-chip">Adaptation</span>
      </div>
    </div>
  );
}

function Module5IntroVideoScreen({ onChangeState }: Module5RendererProps) {
  return (
    <main className="m5-screen m5-intro-video-screen" aria-labelledby="m5-intro-video-title">
      <section className="m5-video-shell">
        <div className="m5-video-copy">
          <ModuleContextLabel>MODULE 5 · APPLYING HRBA IN MEAL</ModuleContextLabel>
          <ProgressChip>MEAL step: Monitoring and reporting problem</ProgressChip>
          <ScreenTitle
            id="m5-intro-video-title"
            lead="A project report can look strong when activities are completed, people are reached, meetings are held, and feedback is collected. These numbers are useful, but they do not always show whether the project is becoming more inclusive, accountable, safe, and responsive."
          >
            Why HRBA MEAL Goes Beyond Activity Counts
          </ScreenTitle>
          <article className="m5-video-note m5-video-note--watch" aria-label="Watch instruction">
            <p>
              Watch the short story. As you watch, ask: <strong>What do the numbers show - and what do they still hide?</strong>
            </p>
          </article>
          <article className="m5-video-note m5-video-note--bridge" aria-label="Concept bridge">
            <div>
              <h2>The first HRBA MEAL question</h2>
              <p>
                Activity counts help a CSO know what was done. HRBA MEAL asks the next questions: <strong>Who was reached? Who was missed? What barriers affected participation? Was feedback answered? What changed? What should the team adapt or explain back?</strong>
              </p>
            </div>
          </article>
          <div className="m5-bridge-card-grid" aria-label="What HRBA MEAL asks around the numbers">
            {module5IntroBridgeCards.map((card) => (
              <article className="m5-bridge-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
          <p className="m5-carry-forward-note">
            In the next screen, you will see the full Module 5 roadmap and the practical MEAL decisions you will practice.
          </p>
        </div>

        <section className="m5-video-card" aria-labelledby="m5-video-placeholder-label">
          <div className="m5-video-card__header">
            <p className="m5-card-kicker" id="m5-video-placeholder-label">Intro video: The Numbers Look Good, But Who Is Missing?</p>
            <span>No autoplay</span>
          </div>
          <div className="m5-video-frame">
            {module5IntroVideoUrl ? (
              <iframe
                src={module5IntroVideoUrl}
                title={module5IntroVideoTitle}
                allow="encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ width: '100%', aspectRatio: '16 / 9', border: 0 }}
              />
            ) : (
              <div className="m5-video-placeholder">
                <img
                  src={module5IntroPosterSrc}
                  alt="Illustration of a CSO team reviewing a strong-looking report and asking what the activity numbers do not show."
                />
                <span aria-hidden="true">Video</span>
                <p>
                  Use the transcript below. The same learning point is available even if the video cannot load.
                </p>
              </div>
            )}
          </div>
          <figure className="m5-video-poster-fallback">
            <img
              src={module5IntroPosterSrc}
              alt="Illustration of a CSO team reviewing a strong-looking report and asking what the activity numbers do not show."
            />
            <figcaption>
              Use the transcript below. The same learning point is available even if the video cannot load.
            </figcaption>
          </figure>
          <details className="m5-transcript-placeholder">
            <summary>Transcript available</summary>
            {module5IntroTranscript.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </details>
        </section>

        <footer className="m5-video-actions">
          <PrimaryButton
            onClick={() =>
              completeSimpleScreen(
                'M5-R01',
                'M5-R02',
                module5Routes['M5-R02'],
                onChangeState,
                'module5IntroVideo',
                { videoUrlConfigured: Boolean(module5IntroVideoUrl) },
              )
            }
          >
            Continue to Learning Objectives and MEAL Roadmap
          </PrimaryButton>
        </footer>
      </section>
    </main>
  );
}

function Module5LearningObjectivesScreen({ onChangeState }: Module5RendererProps) {
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const reviewedCount = flippedCards.length;

  const toggleCard = (number: string) => {
    setFlippedCards((prev) =>
      prev.includes(number) ? prev.filter((item) => item !== number) : [...prev, number],
    );
  };

  return (
    <main className="m5-screen m5-objectives-screen" aria-labelledby="m5-objectives-title">
      <section className="m5-objectives-shell">
        <section className="m5-objectives-copy">
          <ModuleContextLabel>MODULE 5 · HRBA IN MEAL</ModuleContextLabel>
          <ProgressChip>MEAL step: Roadmap and learning objectives</ProgressChip>
          <div className="m5-objectives-title">
            <h1 id="m5-objectives-title">Learning Objectives and MEAL Roadmap</h1>
          </div>
          <p className="m5-objectives-orientation">
            In this module, you will practice using MEAL as a rights-based learning and accountability process. You will move from activity counts and polished reports to evidence that helps a CSO see who may be missing, what barriers remain, what feedback requires response, what should change, and what must be explained back to rights-holders.
          </p>
          <article className="m5-objectives-lens" aria-label="Module 5 visual accent">
            <span aria-hidden="true">MEAL</span>
            <div>
              <h2>Standard MEAL plus HRBA</h2>
              <p>
                Standard MEAL helps a CSO plan indicators, collect and analyze data, use evidence, report results, and learn. HRBA adds sharper questions: <strong>whose rights are affected, who is excluded, who has responsibility, whether participation is meaningful, whether evidence is safe, and whether feedback leads to response or adaptation.</strong>
              </p>
            </div>
          </article>
        </section>

        <section className="m5-objectives-lower" aria-label="Module 5 objectives and final output preview">
          <div className="m5-section-heading">
            <p className="m5-card-kicker">Learning objectives</p>
            <h2>By the end of this module, you will be able to...</h2>
            <p>{reviewedCount} of 6 objectives reviewed. Review each objective, then continue when ready.</p>
          </div>
          <section className="m5-objective-grid" aria-label="Module 5 learning objectives">
            {module5ObjectiveCards.map((objective) => (
              <button
                key={objective.number}
                type="button"
                className={`m5-objective-card m5-objective-card--${objective.accent} ${flippedCards.includes(objective.number) ? 'is-flipped' : ''}`}
                onClick={() => toggleCard(objective.number)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleCard(objective.number);
                  }
                }}
                aria-pressed={flippedCards.includes(objective.number)}
                aria-label={`${objective.title}. ${flippedCards.includes(objective.number) ? 'Showing details. Activate to return to the headline.' : 'Activate to show details.'}`}
              >
                <div className="m5-objective-card__inner">
                  <div className="m5-objective-card__face m5-objective-card__front">
                    <span>{objective.number}</span>
                    <h3>{objective.title}</h3>
                    <small>{flippedCards.includes(objective.number) ? 'Reviewed' : 'Activate to reveal'}</small>
                  </div>
                  <div className="m5-objective-card__face m5-objective-card__back">
                    <span>{objective.number}</span>
                    <p>{objective.text}</p>
                    <small>Activate to return</small>
                  </div>
                </div>
              </button>
            ))}
          </section>
          <div className="m5-output-note-grid">
            <article className="m5-output-preview" aria-labelledby="m5-final-output-title">
              <p className="m5-card-kicker">Your final output</p>
              <h2 id="m5-final-output-title">Portfolio: My HRBA MEAL, Accountability, and Learning Repair Note</h2>
              <p>By the end of the module, you will create a short repair note that includes:</p>
              <ul>
                <li>one MEAL area to improve;</li>
                <li>one repaired indicator or evidence question;</li>
                <li>one evidence gap or safety risk;</li>
                <li>one feedback or accountability improvement;</li>
                <li>one adaptation or learning action;</li>
                <li>one account-back action.</li>
              </ul>
              <p className="m5-output-preview__footer">
                This portfolio output is not a donor report. It is a practical learning note that helps a CSO improve how it uses evidence safely, inclusively, and accountably.
              </p>
            </article>
            <article className="m5-safe-practice-note" aria-labelledby="m5-safe-practice-title">
              <p className="m5-card-kicker">Safe practice note</p>
              <h2 id="m5-safe-practice-title">Safe practice note</h2>
              <p>
                Use fictional, generalized, or non-sensitive examples only. Do not enter real names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, or official names in any practice task.
              </p>
            </article>
          </div>
        </section>

        <footer className="m5-objectives-actions">
          <p className="m5-carry-forward-note">
            Next, you will practice diagnosing a MEAL report that looks strong but still hides important evidence gaps.
          </p>
          <PrimaryButton
            onClick={() =>
              completeSimpleScreen(
                'M5-R02',
                'M5-R03',
                module5Routes['M5-R03'],
                onChangeState,
                'module5LearningObjectives',
                { reviewedObjectives: flippedCards },
              )
            }
            disabled={reviewedCount < module5ObjectiveCards.length}
          >
            Continue to Diagnosing Evidence Gaps in a MEAL Report
          </PrimaryButton>
        </footer>
      </section>
    </main>
  );
}

function Module5EvidenceGapDiagnosticScreen({ state, onChangeState }: Module5RendererProps) {
  const key = practiceKey('M5-R03');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R03');
  const [selectedIds, setSelectedIds] = useState<string[]>(stored.selectedIds || []);
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));
  const correctSelected = selectedIds.filter((id) => m5R03EvidenceGapOptions.find((option) => option.id === id)?.correct).length;
  const unsafeSelected = selectedIds.some((id) => m5R03EvidenceGapOptions.find((option) => option.id === id)?.unsafe);
  const weakSelected = selectedIds.filter((id) => !m5R03EvidenceGapOptions.find((option) => option.id === id)?.correct).length;
  const diagnosisLevel = correctSelected >= 6 && weakSelected === 0
    ? 'strong'
    : correctSelected >= 3 && (correctSelected <= 5 || weakSelected <= 1)
      ? 'partial'
      : 'weak';
  const feedback = diagnosisLevel === 'strong'
    ? {
        heading: 'Strong diagnosis: the report needs more than activity evidence.',
        text: 'You noticed that Awra\'s report should show who may still be missing, what barriers remain, whether participation influenced decisions, whether feedback was answered, whether evidence is safe, what changed, and what should be explained back. This is the move from activity reporting to HRBA-informed MEAL.',
      }
    : diagnosisLevel === 'partial'
      ? {
          heading: 'Good start: widen the evidence lens.',
          text: 'You identified some important gaps. Now check whether the report also shows missing groups, barriers, influence, feedback response, safe evidence, change, and account-back. A strong HRBA MEAL report does not only show what happened; it shows what the team learned and what needs to change.',
        }
      : {
          heading: 'Try again: the report is still too output-focused.',
          text: 'The activity numbers are useful, but they do not yet show enough about inclusion, barriers, participation quality, feedback response, safe evidence, change, or account-back. Review the Jiru Amba report excerpt again and select the gaps that would help Awra make a better MEAL judgment.',
        };

  const persist = (value: Record<string, unknown>) => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: updatePracticeState(prev, key, value),
    }));
  };

  const toggleOption = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    setSelectedIds(next);
    setSubmitted(false);
    persist({ selectedIds: next, submitted: false });
  };

  const checkGaps = () => {
    setSubmitted(true);
    persist({ selectedIds, submitted: true, correctSelected, weakSelected, unsafeSelected, diagnosisLevel });
  };

  const continueToLens = () => {
    completeSimpleScreen(
      'M5-R03',
      'M5-R04',
      module5Routes['M5-R04'],
      onChangeState,
      key,
      { selectedIds, submitted: true, correctSelected, weakSelected, unsafeSelected, diagnosisLevel },
    );
  };

  return (
    <main className="m5-screen m5-diagnostic-screen" aria-labelledby="m5-r03-title">
      <section className="m5-diagnostic-shell">
        <section className="m5-diagnostic-case">
          <ModuleContextLabel>MODULE 5 · HRBA IN MEAL</ModuleContextLabel>
          <ProgressChip>MEAL step: Report diagnosis and evidence completeness</ProgressChip>
          <ScreenTitle
            id="m5-r03-title"
            lead="A MEAL report can look complete because activities were delivered, attendance was high, feedback was collected, and the report was submitted on time. HRBA-informed MEAL asks one more question: does the evidence show who may be missing, what barriers remain, whether feedback was answered, what changed, and what should be explained back?"
          >
            Diagnosing Evidence Gaps in a MEAL Report
          </ScreenTitle>
          <p className="m5-diagnostic-instruction">
            Review Awra's Jiru Amba report excerpt. Then select the evidence gaps the team should check before treating the report as complete.
          </p>

          <article className="m5-report-excerpt-card" aria-labelledby="m5-r03-case-title">
            <p className="m5-card-kicker">Jiru Amba case</p>
            <h2 id="m5-r03-case-title">Jiru Amba case: A strong-looking MEAL report</h2>
            <p className="m5-report-subtitle">Awra's fictional monthly MEAL update</p>
            <p className="m5-case-note">
              This is a fictional learning case. Use it to practice report diagnosis; do not enter or imagine real names, exact locations, or real complaints.
            </p>
            <p>Awra supported community dialogue sessions in Jiru Amba on local service access and participation. The monthly report says:</p>
            <ul>
              <li>6 community dialogue meetings were completed.</li>
              <li>240 people attended across town and rural kebele sessions.</li>
              <li>54% of participants were women.</li>
              <li>Youth representatives attended three meetings.</li>
              <li>A feedback box was placed at the meeting venue.</li>
              <li>Facilitators collected several positive stories.</li>
              <li>The team submitted the monthly report on time.</li>
            </ul>
            <blockquote>
              “The activity reached the community and improved participation in local service decisions.”
            </blockquote>
            <p className="m5-report-prompt">
              Before Awra treats this as a complete HRBA MEAL report, what does the evidence still need to show?
            </p>
          </article>

          <article className="m5-worked-example-card" aria-labelledby="m5-r03-example-title">
            <p className="m5-card-kicker">Worked example</p>
            <h2 id="m5-r03-example-title">Example: why one number is not enough</h2>
            <p>
              “240 people attended” is useful reach evidence. But it does not show whether informal women vendors received information on time, whether persons with disabilities could access the venue, whether women water users or remote kebele residents could attend, whether youth had real influence, whether feedback was answered, or whether anything changed in the way decisions were made.
            </p>
          </article>
        </section>

        <section className="m5-diagnostic-task" aria-labelledby="m5-r03-task-title">
          <div className="m5-section-heading">
            <p className="m5-card-kicker">Diagnostic checklist</p>
            <h2 id="m5-r03-task-title">Select the evidence gaps Awra should check</h2>
            <p>Select all gaps that are still important for an HRBA-informed MEAL report.</p>
          </div>

          <fieldset className="m5-evidence-checklist">
            <legend className="sr-only">Evidence gaps Awra should check</legend>
            {m5R03EvidenceGapOptions.map((option) => {
              const selected = selectedIds.includes(option.id);
              return (
                <label key={option.id} className={`m5-evidence-option ${selected ? 'is-selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleOption(option.id)}
                  />
                  <span className="m5-evidence-option__mark" aria-hidden="true">{selected ? '✓' : ''}</span>
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.meaning}</small>
                  </span>
                </label>
              );
            })}
          </fieldset>

          <div className="m5-diagnostic-actions">
            <PrimaryButton onClick={checkGaps} disabled={selectedIds.length === 0}>
              Check evidence gaps
            </PrimaryButton>
          </div>

          {submitted && (
            <article className={`m5-diagnostic-feedback is-${diagnosisLevel}`} aria-live="polite">
              <p className="m5-card-kicker">{diagnosisLevel === 'strong' ? 'Strong diagnosis' : diagnosisLevel === 'partial' ? 'Partial diagnosis' : 'Output-focused diagnosis'}</p>
              <h3>{feedback.heading}</h3>
              <p>{feedback.text}</p>
              {unsafeSelected && (
                <p className="m5-unsafe-caution">
                  <strong>Caution:</strong> Making a report sound stronger is not the same as making it more credible. HRBA-informed reporting should be truthful, safe, and useful for learning, adaptation, and accountability.
                </p>
              )}
            </article>
          )}

          {submitted && (
            <article className="m5-evidence-summary" aria-labelledby="m5-r03-summary-title">
              <p className="m5-card-kicker">Carry forward</p>
              <h3 id="m5-r03-summary-title">Evidence gap diagnosis</h3>
              <p>A stronger Jiru Amba HRBA MEAL report should add evidence on:</p>
              <ul>
                <li>who was reached and who may still be missing;</li>
                <li>barriers affecting access and participation;</li>
                <li>whether participation influenced decisions;</li>
                <li>whether feedback was reviewed, answered, referred, or used for adaptation;</li>
                <li>whether evidence was collected and reported safely;</li>
                <li>what changed and what did not;</li>
                <li>what should be explained back to rights-holders and communities.</li>
              </ul>
              <p className="m5-carry-forward-note">
                You will use this diagnosis in the next screens to apply the HRBA MEAL lens, repair indicators, choose safer evidence, and strengthen feedback response.
              </p>
            </article>
          )}

          <article className="m5-safe-practice-note m5-safe-practice-note--compact" aria-labelledby="m5-r03-safe-title">
            <p className="m5-card-kicker">Safe practice note</p>
            <h3 id="m5-r03-safe-title">Safe practice note</h3>
            <p>
              Use fictional or generalized examples only. Do not enter real names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, or official names in any practice task.
            </p>
          </article>

          <div className="m5-diagnostic-continue">
            <PrimaryButton onClick={submitted ? continueToLens : checkGaps} disabled={!submitted && selectedIds.length === 0}>
              {submitted ? 'Continue to Applying the HRBA Lens to the MEAL Cycle' : 'Review the report and check evidence gaps'}
            </PrimaryButton>
          </div>
        </section>
      </section>
    </main>
  );
}

function Module5HrbaMealLensCycleScreen({ state, onChangeState }: Module5RendererProps) {
  const key = practiceKey('M5-R04');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R04');
  const [openedIds, setOpenedIds] = useState<string[]>(completed ? m5R04LensQuestions.map((item) => item.id) : stored.openedIds || []);
  const [prompt, setPrompt] = useState('');
  const openedCount = openedIds.length;
  const allReviewed = openedCount === m5R04LensQuestions.length;

  const persist = (value: Record<string, unknown>) => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: updatePracticeState(prev, key, value),
    }));
  };

  const toggleCard = (id: string) => {
    setPrompt('');
    const next = openedIds.includes(id)
      ? openedIds.filter((openedId) => openedId !== id)
      : [...openedIds, id];
    setOpenedIds(next);
    persist({ openedIds: next, status: next.length === m5R04LensQuestions.length ? 'reviewed' : 'in_progress' });
  };

  const continueToEvidenceLadder = () => {
    if (!allReviewed) {
      setPrompt('Review each lens question before continuing.');
      return;
    }

    completeSimpleScreen(
      'M5-R04',
      'M5-R05',
      module5Routes['M5-R05'],
      onChangeState,
      key,
      { openedIds, reviewedAll: true },
    );
  };

  return (
    <main className="m5-screen m5-lens-cycle-screen" aria-labelledby="m5-r04-title">
      <section className="m5-lens-cycle-shell">
        <section className="m5-lens-cycle-tool">
          <ModuleContextLabel>MODULE 5 · HRBA IN MEAL</ModuleContextLabel>
          <ProgressChip>MEAL step: HRBA lens for the MEAL cycle</ProgressChip>
          <ScreenTitle
            id="m5-r04-title"
            lead="Standard MEAL helps a CSO plan indicators, collect data, analyze evidence, report results, and learn. The HRBA lens adds sharper questions: whose rights are affected, who may be excluded, what barriers remain, who has responsibility, whether participation is meaningful, whether evidence is safe, what changed, and what must be explained back."
          >
            Applying the HRBA Lens to the MEAL Cycle
          </ScreenTitle>
          <p className="m5-lens-instruction">
            Explore the eight HRBA MEAL questions. Then connect them back to Awra's Jiru Amba report diagnosis.
          </p>
          <article className="m5-lens-bridge" aria-labelledby="m5-r04-bridge-title">
            <p className="m5-card-kicker">Bridge from the report diagnosis</p>
            <h2 id="m5-r04-bridge-title">From evidence gaps to better MEAL questions</h2>
            <p>
              In the previous screen, Awra's report looked strong because activities were completed and people attended. The HRBA MEAL lens helps the team ask what the report still needs to show before making claims, adapting action, or reporting back to communities.
            </p>
          </article>

          <section className="m5-lens-card-section" aria-labelledby="m5-r04-tool-title">
            <div className="m5-section-heading">
              <p className="m5-card-kicker">Reusable tool</p>
              <h2 id="m5-r04-tool-title">Eight questions to keep MEAL rights-based</h2>
              <p>{openedCount} of 8 lens questions reviewed.</p>
            </div>
            <div className="m5-lens-card-grid">
              {m5R04LensQuestions.map((item, index) => {
                const opened = openedIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`m5-lens-card ${opened ? 'is-opened' : ''}`}
                    onClick={() => toggleCard(item.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        toggleCard(item.id);
                      }
                    }}
                    aria-pressed={opened}
                    aria-label={`${item.label}. ${item.question}. ${opened ? 'Showing Awra application. Activate to collapse.' : 'Activate to reveal Awra application.'}`}
                  >
                    <span className="m5-lens-card__number">{index + 1}</span>
                    <span className="m5-lens-card__body">
                      <strong>{item.label}</strong>
                      <span>{item.question}</span>
                      <small>{item.check}</small>
                      {opened && <em>{item.awra}</em>}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </section>

        <aside className="m5-lens-cycle-application" aria-label="Jiru Amba application and safety notes">
          <figure className="m5-lens-visual-card">
            <img
              src={module5MealLensMapSrc}
              alt="Concept visual showing an HRBA MEAL lens connected to inclusion, participation, feedback, safety, change, response, and account-back."
            />
            <figcaption>
              Supportive visual only. Use the live-text cards for the full eight-question lens.
            </figcaption>
          </figure>

          {allReviewed && (
            <article className="m5-lens-application-panel" aria-labelledby="m5-r04-application-title">
              <p className="m5-card-kicker">Jiru Amba application</p>
              <h2 id="m5-r04-application-title">Apply the lens to Awra's report</h2>
              <p>Using the HRBA MEAL lens, Awra's report should not stop at activities, attendance, and positive stories. A stronger report would also check:</p>
              <ul>
                <li>which Jiru Amba groups were reached and which may still be missing;</li>
                <li>what barriers affected access, voice, safety, or benefit;</li>
                <li>whether participation influenced local service decisions;</li>
                <li>whether feedback was reviewed, answered, referred, or used;</li>
                <li>whether evidence was safe and non-identifying;</li>
                <li>what changed beyond attendance;</li>
                <li>who needs to respond or follow up;</li>
                <li>what Awra should explain back to communities.</li>
              </ul>
              <p className="m5-carry-forward-note">
                Next, you will use this lens to move from activity counts toward stronger evidence about reach, quality, change, learning, and accountability.
              </p>
            </article>
          )}

          <article className="m5-safe-practice-note m5-safe-practice-note--compact" aria-labelledby="m5-r04-safe-title">
            <p className="m5-card-kicker">Safe practice note</p>
            <h2 id="m5-r04-safe-title">Safe practice note</h2>
            <p>
              When using the HRBA MEAL lens, do not collect more detail than needed. Use fictional or generalized examples in this course. Do not enter real names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, or official names.
            </p>
          </article>

          {prompt && <p className="m5-lens-review-prompt" role="status">{prompt}</p>}
          <div className="m5-lens-actions">
            <PrimaryButton onClick={continueToEvidenceLadder} disabled={!allReviewed}>
              {allReviewed ? 'Continue to From Outputs to Outcomes: Reading the Evidence Ladder' : 'Review each HRBA MEAL lens question'}
            </PrimaryButton>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Module5CanvasScreen({
  config,
  state,
  onChangeState,
}: {
  config: Module5ScreenConfig;
  state: LearningState;
  onChangeState: Module5RendererProps['onChangeState'];
}) {
  const key = practiceKey(config.screenId);
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes(config.screenId);
  const allRevealIds = config.revealItems.map((item) => item.id);
  const [started, setStarted] = useState(Boolean(stored.started || completed));
  const [activePanel, setActivePanel] = useState<'reveal' | 'practice' | 'insight'>(
    stored.activePanel || 'reveal',
  );
  const [openedIds, setOpenedIds] = useState<string[]>(
    completed ? allRevealIds : stored.openedIds || [],
  );
  const [activeRevealId, setActiveRevealId] = useState<string>(
    stored.activeRevealId || config.revealItems[0]?.id || '',
  );
  const [selectedIds, setSelectedIds] = useState<string[]>(stored.selectedIds || []);
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));
  const isLensScreen = config.screenId === 'M5-S1-03' || config.screenId === 'M5-R03';
  const screenThemeClass = polishedLabScreenThemes[config.screenId] || '';
  const isPolishedLabScreen = Boolean(screenThemeClass);

  const activeReveal = config.revealItems.find((item) => item.id === activeRevealId) || config.revealItems[0];
  const openedCount = openedIds.length;
  const selectedCorrect = selectedIds.filter((id) => config.options.find((option) => option.id === id)?.correct).length;
  const incorrectSelected = selectedIds.some((id) => !config.options.find((option) => option.id === id)?.correct);
  const correctTotal = config.options.filter((option) => option.correct).length;
  const strongAnswer = config.activityMode === 'multi'
    ? selectedCorrect === correctTotal && !incorrectSelected
    : Boolean(config.options.find((option) => option.id === selectedIds[0])?.correct);
  const feedback = getModule5Feedback(config, selectedIds, strongAnswer);
  const canSubmit = openedCount === allRevealIds.length && selectedIds.length > 0;
  const canContinue = completed || (openedCount === allRevealIds.length && submitted);
  const submitButtonLabel = openedCount < allRevealIds.length
    ? 'Open all evidence cards first'
    : selectedIds.length === 0
      ? 'Choose a response first'
      : 'Check my judgment';

  const persist = (value: Record<string, unknown>) => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: updatePracticeState(prev, key, value),
    }));
  };

  const start = () => {
    setStarted(true);
    persist({ started: true, activePanel: 'reveal' });
  };

  const openReveal = (id: string) => {
    setActiveRevealId(id);
    const next = openedIds.includes(id) ? openedIds : [...openedIds, id];
    setOpenedIds(next);
    persist({ openedIds: next, activeRevealId: id, started: true, activePanel: 'reveal' });
  };

  const selectOption = (id: string) => {
    const next = config.activityMode === 'multi'
      ? selectedIds.includes(id)
        ? selectedIds.filter((item) => item !== id)
        : [...selectedIds, id]
      : [id];
    setSelectedIds(next);
    setSubmitted(false);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete(config.screenId);

      return {
        ...prev,
        screenProgress: {
          ...prev.screenProgress,
          [MODULE_ID]: Array.from(progress),
        },
        practiceCheckState: updatePracticeState(prev, key, {
          selectedIds: next,
          submitted: false,
          activePanel: 'practice',
          status: 'in_progress',
        }),
      };
    });
  };

  const submit = () => {
    setSubmitted(true);
    setActivePanel('insight');
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add(config.screenId);

      return {
        ...prev,
        screenProgress: {
          ...prev.screenProgress,
          [MODULE_ID]: Array.from(progress),
        },
        practiceCheckState: updatePracticeState(prev, key, {
          started: true,
          openedIds,
          activeRevealId,
          selectedIds,
          submitted: true,
          activePanel: 'insight',
          status: 'completed',
        }),
      };
    });
  };

  const finish = () => {
    const nextRoute = module5Routes[config.nextId] || '/module-5/complete';
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add(config.screenId);
      if (config.nextId === 'M5-PLAYER-COMPLETE') {
        progress.add('M5-PLAYER-COMPLETE');
      }

      return {
        ...prev,
        currentScreenId: config.nextId,
        completedModules:
          config.nextId === 'M5-PLAYER-COMPLETE' && !prev.completedModules.includes(MODULE_ID)
            ? [...prev.completedModules, MODULE_ID]
            : prev.completedModules,
        screenProgress: {
          ...prev.screenProgress,
          [MODULE_ID]: Array.from(progress),
        },
        practiceCheckState: updatePracticeState(prev, key, {
          started: true,
          openedIds: allRevealIds,
          activeRevealId,
          selectedIds,
          submitted: true,
          activePanel: 'insight',
          status: 'completed',
        }),
      };
    });
    setRoute(nextRoute);
  };

  return (
    <main
      className={[
        'm5-screen',
        config.visualSrc ? 'm5-screen--asset-visual' : '',
        isLensScreen ? 'm5-screen--meal-lens' : '',
        isPolishedLabScreen ? 'm5-screen--polished-lab' : '',
        screenThemeClass,
      ].filter(Boolean).join(' ')}
      aria-labelledby={`${config.screenId}-title`}
    >
      <section className="m5-hero-panel">
        <div className="m5-hero-panel__copy cso-content-safe-header">
          <ModuleContextLabel>{config.context}</ModuleContextLabel>
          {config.phase && <ProgressChip>{config.phase}</ProgressChip>}
          <ScreenTitle id={`${config.screenId}-title`} lead={config.lead}>
            {config.title}
          </ScreenTitle>
          <article className="m5-story-card">
            <p className="m5-card-kicker">Fictional CSO case</p>
            <h2>{config.storyTitle}</h2>
            {config.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {!started && (
              <PrimaryButton onClick={start}>
                {isLensScreen ? 'Explore six questions the lens keeps visible' : config.startButton}
              </PrimaryButton>
            )}
          </article>
        </div>
        <EvidenceVisual config={config} />
      </section>

      {started && (
        <section className="m5-canvas" aria-labelledby={`${config.screenId}-canvas`}>
          <div className="m5-canvas__header">
            <div>
              <p className="m5-card-kicker">{isLensScreen ? 'HRBA MEAL lens practice' : 'Practice canvas'}</p>
              <h2 id={`${config.screenId}-canvas`}>{activePanel === 'practice' ? config.activityTitle : activePanel === 'insight' ? config.insightTitle : config.revealTitle}</h2>
              <p>{activePanel === 'practice' ? config.activityPrompt : activePanel === 'insight' ? 'Review the insight, then continue when ready.' : config.revealIntro}</p>
            </div>
            <ProgressChip>{openedCount} of {allRevealIds.length} evidence cards opened</ProgressChip>
          </div>

          <div className="m5-tabs" role="tablist" aria-label="Module 5 screen steps">
            {[
              ['reveal', 'Explore evidence'],
              ['practice', 'Make judgment'],
              ['insight', 'Insight'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={activePanel === id}
                className={[
                  activePanel === id ? 'is-active' : '',
                  id === 'reveal' && openedCount === allRevealIds.length ? 'is-complete' : '',
                  id === 'practice' && submitted ? 'is-complete' : '',
                  id === 'insight' && canContinue ? 'is-complete' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => {
                  setActivePanel(id as 'reveal' | 'practice' | 'insight');
                  persist({ activePanel: id });
                }}
              >
                {(isLensScreen || isPolishedLabScreen) && (
                  <span aria-hidden="true">
                    {id === 'reveal' ? '◈' : id === 'practice' ? '✓' : '→'}
                  </span>
                )}
                {label}
              </button>
            ))}
          </div>

          {activePanel === 'reveal' && (
            <div className="m5-workspace">
              <div className="m5-reveal-grid">
                {config.revealItems.map((item, index) => {
                  const opened = openedIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`m5-reveal-card ${opened ? 'is-opened' : ''}`}
                      onClick={() => openReveal(item.id)}
                      aria-pressed={opened}
                    >
                      <span className="m5-reveal-card__mark" aria-hidden="true">
                        {opened ? '✓' : index + 1}
                      </span>
                      <span>
                        <strong>{item.title}</strong>
                        {item.tag && <small>{item.tag}</small>}
                      </span>
                    </button>
                  );
                })}
              </div>
              <article className="m5-detail-card" aria-live="polite">
                <p className="m5-card-kicker">Evidence note</p>
                <h3>{activeReveal.title}</h3>
                <p>{activeReveal.body}</p>
              </article>
            </div>
          )}

          {activePanel === 'practice' && (
            <div className="m5-practice-panel">
              <div className="m5-choice-grid">
                {config.options.map((option) => {
                  const selected = selectedIds.includes(option.id);
                  return (
                    <label key={option.id} className={`m5-choice-card ${selected ? 'is-selected' : ''}`}>
                      <input
                        type={config.activityMode === 'multi' ? 'checkbox' : 'radio'}
                        name={`${config.screenId}-choice`}
                        checked={selected}
                        onChange={() => selectOption(option.id)}
                      />
                      <span className="m5-choice-card__mark" aria-hidden="true">{selected ? '✓' : option.id.replace(/[^0-9]+/g, '') || '•'}</span>
                      <span>
                        <strong>{option.label}</strong>
                        <small>{option.body}</small>
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className="m5-practice-actions">
                <PrimaryButton onClick={submit} disabled={!canSubmit}>
                  {submitButtonLabel}
                </PrimaryButton>
              </div>
            </div>
          )}

          {activePanel === 'insight' && (
            <div className="m5-insight-panel">
              {submitted && (
                <article className={`m5-feedback-card ${strongAnswer ? 'is-strong' : 'is-support'}`} aria-live="polite">
                  <p className="m5-card-kicker">{feedback.kicker}</p>
                  <h3>{feedback.title}</h3>
                  <p>{feedback.body}</p>
                </article>
              )}
              <article className="m5-insight-card">
                <p className="m5-card-kicker">Key learning</p>
                <h3>{config.insightTitle}</h3>
                {config.insight.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
              {config.screenId === 'M5-R02' && (
                <article className="m5-feedback-card is-strong">
                  <p className="m5-card-kicker">Carry forward</p>
                  <h3>Keep one gap in view.</h3>
                  <p>
                    The gap you noticed here becomes the anchor case for the next screens:
                    use it to test the HRBA MEAL lens, climb the evidence ladder, and later
                    shape a safe repair note.
                  </p>
                </article>
              )}
              <div className="m5-cta-panel">
                <div>
                  <h3>{canContinue ? 'Ready to continue' : 'Complete this canvas to continue'}</h3>
                  <p>
                    {canContinue
                      ? 'This screen will be marked complete when you continue.'
                      : 'Open every evidence card and complete the judgment first.'}
                  </p>
                </div>
                <PrimaryButton onClick={finish} disabled={!canContinue}>
                  {canContinue ? config.ctaButton : 'Complete this canvas to continue'}
                </PrimaryButton>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export function Module5EvidenceLadderScreen({ state, onChangeState }: Module5RendererProps) {
  const config = module5Screens['M5-R04'];
  const key = practiceKey('M5-R04');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R04');
  const [answers, setAnswers] = useState<Record<string, string>>(
    (stored.answers as Record<string, string>) || {},
  );
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const answeredCount = evidenceLadderExamples.filter((example) => answers[example.id]).length;
  const allAnswered = answeredCount === evidenceLadderExamples.length;
  const correctCount = evidenceLadderExamples.filter(
    (example) => answers[example.id] === example.answer,
  ).length;
  const canContinue = completed || submitted;

  const saveAnswers = (nextAnswers: Record<string, string>, nextSubmitted = false) => {
    setAnswers(nextAnswers);
    setSubmitted(nextSubmitted);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      if (nextSubmitted) {
        progress.add('M5-R04');
      } else {
        progress.delete('M5-R04');
      }

      return {
        ...prev,
        screenProgress: {
          ...prev.screenProgress,
          [MODULE_ID]: Array.from(progress),
        },
        practiceCheckState: updatePracticeState(prev, key, {
          answers: nextAnswers,
          submitted: nextSubmitted,
          status: nextSubmitted ? 'completed' : 'in_progress',
        }),
      };
    });
  };

  const chooseLevel = (exampleId: string, value: string) => {
    saveAnswers({ ...answers, [exampleId]: value }, false);
  };

  const submit = () => {
    if (!allAnswered) return;
    saveAnswers(answers, true);
  };

  const finish = () => {
    completeSimpleScreen(
      'M5-R04',
      'M5-R05',
      module5Routes['M5-R05'],
      onChangeState,
      key,
      {
        answers,
        correctCount,
        submitted: true,
      },
    );
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-evidence-ladder-screen" aria-labelledby="M5-R04-title">
      <section className="m5-hero-panel">
        <div className="m5-hero-panel__copy cso-content-safe-header">
          <ModuleContextLabel>{config.context}</ModuleContextLabel>
          <ScreenTitle id="M5-R04-title" lead={config.lead}>
            {config.title}
          </ScreenTitle>
          <article className="m5-story-card">
            <p className="m5-card-kicker">Fictional CSO case</p>
            <h2>{config.storyTitle}</h2>
            {config.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
        <EvidenceVisual config={config} />
      </section>

      <section className="m5-canvas m5-ladder-canvas" aria-labelledby="m5-ladder-practice-title">
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Evidence ladder practice</p>
            <h2 id="m5-ladder-practice-title">Classify each evidence example</h2>
            <p>
              Use the dropdowns to place each fictional evidence note on the strongest ladder level.
              Do not enter real names, stories, or personal details.
            </p>
          </div>
          <ProgressChip>{answeredCount} of {evidenceLadderExamples.length} classified</ProgressChip>
        </div>

        <div className="m5-ladder-layout">
          <aside className="m5-ladder-levels" aria-label="Evidence ladder levels">
            {evidenceLadderLevels.map((level, index) => (
              <article key={level.id}>
                <span aria-hidden="true">{index + 1}</span>
                <div>
                  <h3>{level.label}</h3>
                  <p>{level.help}</p>
                </div>
              </article>
            ))}
          </aside>

          <div className="m5-classification-grid">
            {evidenceLadderExamples.map((example) => {
              const selected = answers[example.id] || '';
              const isCorrect = submitted && selected === example.answer;
              const isIncorrect = submitted && selected && selected !== example.answer;
              const correctLabel = evidenceLadderLevels.find((level) => level.id === example.answer)?.label;

              return (
                <article
                  key={example.id}
                  className={[
                    'm5-classification-card',
                    isCorrect ? 'is-correct' : '',
                    isIncorrect ? 'is-incorrect' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <label htmlFor={`m5-ladder-${example.id}`}>
                    <span>{example.text}</span>
                    <select
                      id={`m5-ladder-${example.id}`}
                      value={selected}
                      onChange={(event) => chooseLevel(example.id, event.target.value)}
                    >
                      <option value="">Choose a ladder level</option>
                      {evidenceLadderLevels.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  {submitted && (
                    <p className="m5-classification-feedback" aria-live="polite">
                      <strong>{isCorrect ? 'Good classification.' : `Best fit: ${correctLabel}.`}</strong>{' '}
                      {example.explanation}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <footer className="m5-ladder-actions">
          <div>
            <h3>{submitted ? `${correctCount} of ${evidenceLadderExamples.length} matched the intended level` : 'Classify all examples to continue'}</h3>
            <p>
              {submitted
                ? 'You can continue after classifying all examples. The feedback shows where output evidence becomes reach, quality, change, learning, and account-back evidence.'
                : 'This practice uses only fictional, non-identifying examples.'}
            </p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!allAnswered}>
              {allAnswered ? 'Check classifications' : 'Classify all examples first'}
            </PrimaryButton>
            <PrimaryButton onClick={finish} disabled={!canContinue}>
              {config.ctaButton}
            </PrimaryButton>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Module5ClinicRevealCards({
  config,
  openedIds,
  onOpen,
}: {
  config: Module5ScreenConfig;
  openedIds: string[];
  onOpen: (id: string) => void;
}) {
  const activeReveal = config.revealItems.find((item) => openedIds.includes(item.id)) || config.revealItems[0];

  return (
    <div className="m5-clinic-reveal">
      <div className="m5-reveal-grid">
        {config.revealItems.map((item, index) => {
          const opened = openedIds.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              className={`m5-reveal-card ${opened ? 'is-opened' : ''}`}
              onClick={() => onOpen(item.id)}
              aria-pressed={opened}
            >
              <span className="m5-reveal-card__mark" aria-hidden="true">{opened ? '✓' : index + 1}</span>
              <span><strong>{item.title}</strong></span>
            </button>
          );
        })}
      </div>
      <article className="m5-detail-card" aria-live="polite">
        <p className="m5-card-kicker">Review note</p>
        <h3>{activeReveal.title}</h3>
        <p>{activeReveal.body}</p>
      </article>
    </div>
  );
}

function Module5ClinicHero({ config }: { config: Module5ScreenConfig }) {
  return (
    <section className="m5-hero-panel">
      <div className="m5-hero-panel__copy cso-content-safe-header">
        <ModuleContextLabel>{config.context}</ModuleContextLabel>
        <ScreenTitle id={`${config.screenId}-title`} lead={config.lead}>
          {config.title}
        </ScreenTitle>
        <article className="m5-story-card">
          <p className="m5-card-kicker">Fictional CSO case</p>
          <h2>{config.storyTitle}</h2>
          {config.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </div>
      <EvidenceVisual config={config} />
    </section>
  );
}

function Module5IndicatorRepairScreen({ state, onChangeState }: Module5RendererProps) {
  const config = module5Screens['M5-R05'];
  const key = practiceKey('M5-R05');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R05');
  const allRevealIds = config.revealItems.map((item) => item.id);
  const [openedIds, setOpenedIds] = useState<string[]>(completed ? allRevealIds : (stored.openedIds as string[]) || []);
  const [answers, setAnswers] = useState<Record<string, { indicator?: string; reveal?: string }>>(
    (stored.answers as Record<string, { indicator?: string; reveal?: string }>) || {},
  );
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const openReveal = (id: string) => {
    const next = openedIds.includes(id) ? openedIds : [...openedIds, id];
    setOpenedIds(next);
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: updatePracticeState(prev, key, { openedIds: next, status: 'in_progress' }),
    }));
  };

  const updateAnswer = (itemId: string, field: 'indicator' | 'reveal', value: string) => {
    setSubmitted(false);
    const next = {
      ...answers,
      [itemId]: {
        ...(answers[itemId] || {}),
        [field]: value,
      },
    };
    setAnswers(next);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R05');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { answers: next, submitted: false, status: 'in_progress' }),
      };
    });
  };

  const allAnswered = indicatorRepairItems.every((item) => answers[item.id]?.indicator && answers[item.id]?.reveal);
  const allReviewed = openedIds.length === allRevealIds.length;
  const correctCount = indicatorRepairItems.filter((item) => answers[item.id]?.indicator === 'strong' && answers[item.id]?.reveal === item.reveal).length;
  const canSubmit = allReviewed && allAnswered;
  const canContinue = completed || submitted;

  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R05');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { openedIds, answers, submitted: true, correctCount, status: 'completed' }),
      };
    });
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-clinic-screen m5-indicator-repair-screen" aria-labelledby="M5-R05-title">
      <Module5ClinicHero config={config} />
      <section className="m5-canvas m5-clinic-canvas" aria-labelledby="m5-r05-practice">
        <article className="m5-practice-point">
          <p className="m5-card-kicker">Why this matters</p>
          <p>{clinicPracticeNotes['M5-R05'].why}</p>
        </article>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Indicator repair clinic</p>
            <h2 id="m5-r05-practice">Repair weak indicators</h2>
            <p>Review all seven repair checks, then choose the stronger indicator and what it reveals.</p>
          </div>
          <ProgressChip>{openedIds.length} of {allRevealIds.length} checks reviewed</ProgressChip>
        </div>
        <Module5ClinicRevealCards config={config} openedIds={openedIds} onOpen={openReveal} />
        <div className="m5-repair-grid">
          {indicatorRepairItems.map((item) => {
            const answer = answers[item.id] || {};
            const correct = submitted && answer.indicator === 'strong' && answer.reveal === item.reveal;
            const incorrect = submitted && !correct;
            return (
              <article key={item.id} className={`m5-repair-card ${correct ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`}>
                <p className="m5-card-kicker">Weak indicator</p>
                <h3>{item.weak}</h3>
                <label>
                  <span>Choose the better indicator</span>
                  <select value={answer.indicator || ''} onChange={(event) => updateAnswer(item.id, 'indicator', event.target.value)}>
                    <option value="">Select one</option>
                    <option value="strong">{item.strongLabel}</option>
                    <option value="distractor">{item.distractorLabel}</option>
                  </select>
                </label>
                {answer.indicator && (
                  <p className="m5-selected-summary">
                    <strong>Selected meaning:</strong> {getIndicatorChoiceSummary(item, answer.indicator)}
                  </p>
                )}
                <label>
                  <span>What does it reveal?</span>
                  <select value={answer.reveal || ''} onChange={(event) => updateAnswer(item.id, 'reveal', event.target.value)}>
                    <option value="">Select one</option>
                    {indicatorRevealOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </label>
                {submitted && (
                  <p className="m5-classification-feedback">
                    <strong>{correct ? 'Strong repair.' : 'Repair still needed.'}</strong>{' '}
                    This weak indicator counts {item.counts.toLowerCase()} A stronger option reveals {item.why}. It could trigger: {item.trigger}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        <footer className="m5-ladder-actions">
          <div>
            <h3>{submitted ? `${correctCount} of ${indicatorRepairItems.length} fully repaired` : 'Complete all repairs to continue'}</h3>
            <p>{submitted ? 'You may continue after reviewing the reasoning. Revise any selections if you want to improve the repair.' : 'No real project data is needed. Use only the fictional indicators on this screen.'}</p>
            <p className="m5-carry-forward-note">{clinicPracticeNotes['M5-R05'].carry}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check repairs' : 'Review all checks and repair each indicator'}</PrimaryButton>
            <PrimaryButton
              onClick={() => completeSimpleScreen('M5-R05', 'M5-R06', module5Routes['M5-R06'], onChangeState, key, { answers, correctCount, submitted: true })}
              disabled={!canContinue}
            >
              {config.ctaButton}
            </PrimaryButton>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Module5SafeEvidenceScreen({ state, onChangeState }: Module5RendererProps) {
  const config = module5Screens['M5-R06'];
  const key = practiceKey('M5-R06');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R06');
  const [answers, setAnswers] = useState<Record<string, { indicator?: string; reveal?: string }>>(
    (stored.answers as Record<string, { indicator?: string; reveal?: string }>) || {},
  );
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const updateAnswer = (itemId: string, field: 'indicator' | 'reveal', value: string) => {
    const next = {
      ...answers,
      [itemId]: {
        ...(answers[itemId] || {}),
        [field]: value,
      },
    };
    setAnswers(next);
    setSubmitted(false);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R06');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { answers: next, submitted: false, status: 'in_progress' }),
      };
    });
  };
  const allAnswered = indicatorRepairItems.every((item) => answers[item.id]?.indicator && answers[item.id]?.reveal);
  const correctCount = indicatorRepairItems.filter((item) => answers[item.id]?.indicator === 'strong' && answers[item.id]?.reveal === item.reveal).length;
  const hasUnsafeChoice = indicatorRepairItems.some((item) => ['stories', 'disability'].includes(item.id) && answers[item.id]?.indicator === 'distractor');
  const canSubmit = allAnswered;
  const canContinue = completed || submitted;
  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R06');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { answers, submitted: true, correctCount, hasUnsafeChoice, status: 'completed' }),
      };
    });
  };
  const feedback = correctCount === indicatorRepairItems.length
    ? {
        className: 'is-strong',
        heading: 'Strong improvement: the indicators now support HRBA MEAL.',
        body: 'You strengthened the indicators so they can show access, participation, feedback response, safety, accountability, and change. These indicators can guide decisions, not only fill a report.',
      }
    : correctCount > 0
      ? {
          className: 'is-partial',
          heading: 'Good start: some indicators still count activities only.',
          body: 'You improved part of the MEAL logic. Review any indicator that still counts tools, meetings, forms, photos, or stories without showing whether people could participate, feedback was answered, or anything changed.',
        }
      : {
          className: 'is-weak',
          heading: 'Try again: the indicators still do not show HRBA change.',
          body: 'The weak options count activities or create unsafe evidence pressure. A stronger HRBA MEAL indicator should help Awra see inclusion, barriers, participation quality, feedback response, safe evidence, adaptation, or change.',
        };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-indicator-improvement-screen" aria-labelledby="M5-R06-title">
      <section className="m5-hero-panel m5-indicator-improvement-hero">
        <div className="m5-hero-panel__copy cso-content-safe-header">
          <ModuleContextLabel>{config.context}</ModuleContextLabel>
          <ProgressChip>MEAL step: Indicators and logframe evidence</ProgressChip>
          <ScreenTitle id="M5-R06-title" lead={config.lead}>
            {config.title}
          </ScreenTitle>
          <p className="m5-r06-instruction">
            Improve weak activity indicators from Awra's Jiru Amba case. For each one, choose the improved indicator and what it helps the team understand.
          </p>
          <article className="m5-story-card">
            <p className="m5-card-kicker">Jiru Amba case bridge</p>
            <h2>{config.storyTitle}</h2>
            {config.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
        <EvidenceVisual config={config} />
      </section>

      <section className="m5-canvas m5-indicator-improvement-canvas" aria-labelledby="m5-r06-practice">
        <article className="m5-practice-point">
          <p className="m5-card-kicker">What makes an indicator stronger?</p>
          <p>{config.insight[0]}</p>
        </article>
        <div className="m5-r06-rule-grid" aria-label="Four-part indicator improvement rule">
          {config.revealItems.map((item) => (
            <article key={item.id} className="m5-r06-rule-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Indicator improvement activity</p>
            <h2 id="m5-r06-practice">{config.activityTitle}</h2>
            <p>{config.activityPrompt}</p>
          </div>
          <ProgressChip>{Object.values(answers).filter((answer) => answer.indicator && answer.reveal).length} of {indicatorRepairItems.length} tasks complete</ProgressChip>
        </div>
        <div className="m5-r06-improvement-grid">
          {indicatorRepairItems.map((item, index) => {
            const answer = answers[item.id] || {};
            const correct = submitted && answer.indicator === 'strong' && answer.reveal === item.reveal;
            const incorrect = submitted && !correct;
            return (
              <article key={item.id} className={`m5-r06-improvement-card ${correct ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`}>
                <p className="m5-card-kicker">Task {index + 1}</p>
                <h3>{item.weak}</h3>
                <p><strong>What it currently counts:</strong> {item.counts}</p>
                <label>
                  <span>Choose the improved indicator</span>
                  <select value={answer.indicator || ''} onChange={(event) => updateAnswer(item.id, 'indicator', event.target.value)}>
                    <option value="">Select one</option>
                    <option value="strong">{item.strong}</option>
                    <option value="distractor">{item.distractor}</option>
                  </select>
                </label>
                {answer.indicator && (
                  <p className="m5-selected-summary">
                    <strong>Selected meaning:</strong> {getIndicatorChoiceSummary(item, answer.indicator)}
                  </p>
                )}
                <label>
                  <span>What does it reveal?</span>
                  <select value={answer.reveal || ''} onChange={(event) => updateAnswer(item.id, 'reveal', event.target.value)}>
                    <option value="">Select one</option>
                    {indicatorRevealOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </label>
                {submitted && (
                  <p className="m5-r06-card-feedback">
                    <strong>{correct ? 'Strong improvement.' : 'Choose the improved indicator and matching meaning.'}</strong>{' '}
                    A stronger indicator does not only count {item.counts.toLowerCase()} It helps the team understand {item.why} and can guide this decision: {item.trigger}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        <footer className="m5-ladder-actions m5-r06-actions">
          <div>
            <h3>{submitted ? `${correctCount} of ${indicatorRepairItems.length} indicator improvements matched` : 'Complete the indicator improvements'}</h3>
            <p>{submitted ? 'The reasoning is visible before you continue. Revise any choice that still only counts activities or creates unsafe evidence pressure.' : 'No real project data is needed. Use only the fictional Awra examples on this screen.'}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check indicator improvements' : 'Complete the indicator improvements'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R06', 'M5-R07', module5Routes['M5-R07'], onChangeState, key, { answers, correctCount, submitted: true, hasUnsafeChoice })} disabled={!canContinue}>
              {submitted ? config.ctaButton : 'Complete the indicator improvements'}
            </PrimaryButton>
          </div>
        </footer>
        {submitted && (
          <section className={`m5-r06-feedback ${feedback.className}`} aria-live="polite" tabIndex={-1}>
            <h2>{feedback.heading}</h2>
            <p>{feedback.body}</p>
            {hasUnsafeChoice && (
              <p>
                <strong>Caution:</strong> Avoid indicators that push teams to collect identifying stories, photos, diagnoses, complaint details, or other sensitive information unless there is a clear, safe, necessary, and consent-based reason.
              </p>
            )}
          </section>
        )}
        {submitted && (
          <section className="m5-r06-logframe-strip" aria-labelledby="m5-r06-logframe-heading">
            <h2 id="m5-r06-logframe-heading">How an improved indicator fits into a logframe</h2>
            <div className="m5-r06-logframe-grid">
              {m5R06LogframeEvidence.map((item) => (
                <article key={item.element} className="m5-r06-logframe-card">
                  <h3>{item.element}</h3>
                  <p>{item.explanation}</p>
                  <strong>{item.example}</strong>
                </article>
              ))}
            </div>
          </section>
        )}
        {submitted && (
          <section className="m5-r06-summary-panel" aria-labelledby="m5-r06-summary-heading">
            <h2 id="m5-r06-summary-heading">Indicator improvement summary</h2>
            <p>Awra's improved indicators should help the team see:</p>
            <ul>
              <li>whether people facing access barriers could participate meaningfully;</li>
              <li>whether participation influenced decisions or follow-up actions;</li>
              <li>whether feedback was reviewed, answered, referred, or acted on;</li>
              <li>whether learning evidence was safe and consent-based;</li>
              <li>whether accessibility and support arrangements allowed meaningful participation.</li>
            </ul>
            <p className="m5-carry-forward-note">
              Next, you will decide what evidence can be collected safely and what should be aggregated, anonymized, suppressed, referred, or not collected.
            </p>
          </section>
        )}
        <article className="m5-r06-portfolio-bridge">
          <p>
            Later, you will choose one indicator improvement to include in your <strong>HRBA MEAL, Accountability, and Learning Improvement Note</strong>. For now, focus on what makes an indicator useful, safe, and decision-oriented.
          </p>
        </article>
        <article className="m5-safety-warning">
          <strong>Safe practice note</strong>
          <span>Do not create indicators that require names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, or identifiable photos. Use the minimum evidence needed to guide a safe and useful decision.</span>
        </article>
      </section>
    </main>
  );
}

function Module5FeedbackLoopScreen({ state, onChangeState }: Module5RendererProps) {
  const config = module5Screens['M5-R07'];
  const key = practiceKey('M5-R07');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R07');
  const [answers, setAnswers] = useState<Record<string, string>>((stored.answers as Record<string, string>) || {});
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const choose = (id: string, value: string) => {
    setSubmitted(false);
    const next = { ...answers, [id]: value };
    setAnswers(next);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R07');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { answers: next, submitted: false, status: 'in_progress' }),
      };
    });
  };
  const allAnswered = safeDataDecisionItems.every((item) => answers[item.id]);
  const correctCount = safeDataDecisionItems.filter((item) => answers[item.id] === item.answer).length;
  const hasUnsafe = safeDataDecisionItems.some((item) => item.unsafeChoices.includes(answers[item.id] || ''));
  const feedback = correctCount >= 5
    ? {
        className: 'is-strong',
        heading: 'Strong safe-data decisions.',
        body: 'You chose evidence that can reveal barriers without exposing people. This is the HRBA MEAL balance: collect enough to see exclusion and guide action, but avoid names, diagnoses, exact locations, raw complaints, or small-cell details that could identify people.',
      }
    : correctCount >= 3
      ? {
          className: 'is-partial',
          heading: 'Good start: review the riskier evidence choices.',
          body: 'Some choices protect people and still support learning. Review any example where individual detail, small groups, children, disability information, complaint details, or exact locations could expose someone.',
        }
      : {
          className: 'is-weak',
          heading: 'Try again: more detail is not always better evidence.',
          body: 'HRBA MEAL evidence should be useful, necessary, protected, and linked to safe action. Avoid collecting details that Awra does not need or cannot protect.',
        };
  const canSubmit = allAnswered;
  const canContinue = completed || submitted;
  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R07');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { answers, submitted: true, correctCount, hasUnsafe, status: 'completed' }),
      };
    });
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-safe-data-screen" aria-labelledby="M5-R07-title">
      <section className="m5-hero-panel m5-safe-data-hero">
        <div className="m5-hero-panel__copy cso-content-safe-header">
          <ModuleContextLabel>{config.context}</ModuleContextLabel>
          <ProgressChip>MEAL step: Safe data collection and disaggregation</ProgressChip>
          <ScreenTitle id="M5-R07-title" lead={config.lead}>
            {config.title}
          </ScreenTitle>
          <p className="m5-r07-instruction">
            Use Awra's Jiru Amba case to decide how different types of evidence should be handled: collect safely, aggregate, anonymize, suppress or combine, refer through a safe pathway, or avoid collecting.
          </p>
          <article className="m5-story-card">
            <p className="m5-card-kicker">Jiru Amba case bridge</p>
            <h2>{config.storyTitle}</h2>
            {config.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
        <EvidenceVisual config={config} />
      </section>

      <section className="m5-canvas m5-safe-data-canvas" aria-labelledby="m5-r07-practice">
        <article className="m5-practice-point">
          <p className="m5-card-kicker">The safe evidence rule</p>
          <p>{clinicPracticeNotes['M5-R07'].why}</p>
          <p><strong>Collect the minimum useful evidence needed for safe action.</strong></p>
        </article>
        <div className="m5-r07-rule-grid" aria-label="Safe evidence questions">
          {config.revealItems.map((item) => (
            <article key={item.id} className="m5-r07-rule-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Safe data decision activity</p>
            <h2 id="m5-r07-practice">{config.activityTitle}</h2>
            <p>{config.activityPrompt}</p>
          </div>
          <ProgressChip>{Object.values(answers).filter(Boolean).length} of {safeDataDecisionItems.length} decisions complete</ProgressChip>
        </div>
        <div className="m5-r07-decision-options" aria-label="Safe data decision choices">
          {safeDataDecisionOptions.map((option) => (
            <article key={option.id}>
              <h3>{option.label}</h3>
              <p>{option.summary}</p>
            </article>
          ))}
        </div>
        <div className="m5-r07-decision-grid">
          {safeDataDecisionItems.map((item, index) => {
            const selected = answers[item.id] || '';
            const correct = submitted && selected === item.answer;
            const incorrect = submitted && selected && selected !== item.answer;
            return (
              <article key={item.id} className={`m5-r07-decision-card ${correct ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`}>
                <p className="m5-card-kicker">Task {index + 1}: {item.title}</p>
                <h3>Evidence example</h3>
                <p>{item.example}</p>
                <label>
                  <span>Choose the safest decision</span>
                  <select value={selected} onChange={(event) => choose(item.id, event.target.value)} aria-label={`Safest data decision for ${item.title}`}>
                    <option value="">Select one</option>
                    {safeDataDecisionOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </label>
                {selected && (
                  <p className="m5-selected-summary">
                    <strong>Selected meaning:</strong> {getOptionSummary(safeDataDecisionOptions, selected)}
                  </p>
                )}
                {submitted && (
                  <p className="m5-r07-card-feedback">
                    <strong>{correct ? 'Safe decision.' : `Safer decision: ${safeDataDecisionOptions.find((option) => option.id === item.answer)?.label}.`}</strong>{' '}
                    {item.feedback}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        {submitted && (
          <article className={`m5-r07-feedback ${feedback.className}`} aria-live="polite" tabIndex={-1}>
            <h2>{feedback.heading}</h2>
            <p>{feedback.body}</p>
            {hasUnsafe && (
              <p>
                <strong>Caution:</strong> Do not collect or report identifiable or sensitive data just to make evidence look stronger. Use safe themes, aggregation, anonymization, suppression, or referral instead.
              </p>
            )}
          </article>
        )}
        {submitted && (
          <section className="m5-r07-summary-panel" aria-labelledby="m5-r07-summary-heading">
            <h2 id="m5-r07-summary-heading">Safe data collection summary</h2>
            <p>Awra's safer data approach should:</p>
            <ul>
              <li>collect only evidence that is useful for inclusion, feedback, response, or change;</li>
              <li>use broad categories when detailed data is not necessary;</li>
              <li>anonymize names, faces, exact locations, and identifying combinations;</li>
              <li>suppress or combine small-cell data that could identify people;</li>
              <li>refer sensitive concerns through agreed safe pathways;</li>
              <li>avoid collecting names, diagnoses, raw complaints, or identifiable stories when they are not necessary.</li>
            </ul>
            <p className="m5-carry-forward-note">{clinicPracticeNotes['M5-R07'].carry}</p>
          </section>
        )}
        <article className="m5-r07-portfolio-bridge">
          <p>
            Later, you will choose one safe evidence decision to include in your <strong>HRBA MEAL, Accountability, and Learning Improvement Note</strong>. For now, focus on how to collect enough evidence for action without exposing people.
          </p>
        </article>
        <article className="m5-safety-warning">
          <strong>Safe practice note</strong>
          <span>Use fictional or generalized examples only. Do not enter real names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, or official names. In real MEAL work, follow your organization&apos;s data protection, safeguarding, referral, and consent procedures.</span>
        </article>
        <footer className="m5-ladder-actions m5-r07-actions">
          <div>
            <h3>{submitted ? `${correctCount} of ${safeDataDecisionItems.length} safe decisions matched` : 'Complete the safe-data decisions'}</h3>
            <p>{submitted ? 'Review the feedback before continuing. Any risky choice can be changed and checked again.' : 'No real project data is needed. Use only the fictional Jiru Amba examples on this screen.'}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check safe-data decisions' : 'Complete the safe-data decisions'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R07', 'M5-R08', module5Routes['M5-R08'], onChangeState, key, { answers, correctCount, hasUnsafe, submitted: true })} disabled={!canContinue}>
              {submitted ? config.ctaButton : 'Complete the safe-data decisions'}
            </PrimaryButton>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Module5EthicalStoriesScreen({ state, onChangeState }: Module5RendererProps) {
  const config = module5Screens['M5-R08'];
  const key = practiceKey('M5-R08');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R08');
  const correctIds = feedbackPathwayChoices.filter((choice) => choice.correct).map((choice) => choice.id);
  const [selectedIds, setSelectedIds] = useState<string[]>((stored.selectedIds as string[]) || []);
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const toggle = (id: string) => {
    setSubmitted(false);
    const next = selectedIds.includes(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];
    setSelectedIds(next);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R08');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { selectedIds: next, submitted: false, status: 'in_progress' }),
      };
    });
  };

  const selectedCorrect = selectedIds.filter((id) => correctIds.includes(id)).length;
  const hasWeak = selectedIds.some((id) => !feedbackPathwayChoices.find((choice) => choice.id === id)?.correct);
  const hasUnsafe = selectedIds.some((id) => feedbackPathwayChoices.find((choice) => choice.id === id)?.unsafe);
  const strong = selectedCorrect >= 7 && !hasWeak;
  const partial = selectedCorrect >= 3 && !strong;
  const feedback = strong
    ? {
        className: 'is-strong',
        heading: 'Strong pathway: feedback can become accountability evidence.',
        body: 'You included clear information, accessible channels, safe recording, responsible review, response or referral, adaptation, and account-back. This turns feedback from a box or count into a MEAL pathway for learning, response, and accountability.',
      }
    : partial
      ? {
          className: 'is-partial',
          heading: 'Good start: the pathway still needs a stronger response loop.',
          body: 'You selected some useful steps. Now check whether the mechanism also informs people, protects identity, records only what is needed, routes feedback to the right role, responds or refers, adapts practice, and explains back what happened.',
        }
      : {
          className: 'is-weak',
          heading: 'Try again: collecting feedback is not enough.',
          body: 'A feedback channel is not accountable if it only collects comments, counts complaints, or stores forms. Review the pathway and choose steps that help Awra receive feedback safely, respond responsibly, adapt action, and account back.',
        };
  const canSubmit = selectedIds.length > 0;
  const canContinue = completed || submitted;
  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R08');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { selectedIds, submitted: true, selectedCorrect, hasUnsafe, strong, status: 'completed' }),
      };
    });
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-feedback-pathway-screen" aria-labelledby="M5-R08-title">
      <section className="m5-hero-panel m5-feedback-pathway-hero">
        <div className="m5-hero-panel__copy cso-content-safe-header">
          <ModuleContextLabel>{config.context}</ModuleContextLabel>
          <ProgressChip>MEAL step: Feedback, response, and accountability</ProgressChip>
          <ScreenTitle id="M5-R08-title" lead={config.lead}>
            {config.title}
          </ScreenTitle>
          <p className="m5-r08-instruction">
            Use Awra's Jiru Amba case to strengthen a weak feedback channel into a safer response pathway.
          </p>
          <article className="m5-story-card">
            <p className="m5-card-kicker">Case bridge</p>
            <h2>{config.storyTitle}</h2>
            {config.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
        <EvidenceVisual config={config} />
      </section>

      <section className="m5-canvas m5-feedback-pathway-canvas" aria-labelledby="m5-r08-practice">
        <article className="m5-r08-case-card">
          <p className="m5-card-kicker">Jiru Amba case: A feedback box is not enough</p>
          <h2>Awra's weak feedback channel</h2>
          <blockquote>"A feedback box was placed at the meeting venue."</blockquote>
          <p>
            This is useful, but incomplete. The report does not show whether women vendors, persons with disabilities, youth, women water users, remote kebele residents, or older people knew about the box, trusted it, could use it safely, or received any response.
          </p>
          <p><strong>What should Awra add so the feedback channel becomes a safe and accountable response pathway?</strong></p>
        </article>
        <div className="m5-r08-example-grid">
          <article>
            <p className="m5-card-kicker">Example: when feedback leads to adaptation</p>
            <h3>Adapt the activity, not only the report</h3>
            <p>If several people say the meeting time excludes caregivers and market-day workers, Awra should not only count the comments. The team should review the feedback, adapt the meeting time or information route where possible, and explain back what changed and why.</p>
          </article>
          <article>
            <p className="m5-card-kicker">Example: when feedback needs a safe pathway</p>
            <h3>Refer sensitive concerns safely</h3>
            <p>If one person reports a sensitive protection or safeguarding concern, Awra should not discuss it in a community meeting or publish it as evidence. The team should follow the agreed safe pathway, record only the minimum necessary information, and refer or escalate through the right role.</p>
          </article>
        </div>
        <article className="m5-practice-point">
          <p className="m5-card-kicker">What makes a feedback mechanism accountable?</p>
          <p>{clinicPracticeNotes['M5-R08'].why}</p>
          <p><strong>Feedback is not accountability unless something happens next.</strong></p>
        </article>
        <div className="m5-r08-pathway-grid" aria-label="Feedback mechanism pathway steps">
          {config.revealItems.map((item) => (
            <article key={item.id} className="m5-r08-pathway-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Feedback pathway activity</p>
            <h2 id="m5-r08-practice">{config.activityTitle}</h2>
            <p>{config.activityPrompt}</p>
          </div>
          <ProgressChip>{selectedCorrect} of {correctIds.length} strong actions selected</ProgressChip>
        </div>
        <div className="m5-r08-choice-grid">
          {feedbackPathwayChoices.map((choice) => {
            const selected = selectedIds.includes(choice.id);
            const correct = submitted && selected && choice.correct;
            const incorrect = submitted && selected && !choice.correct;
            return (
              <label key={choice.id} className={`m5-r08-choice-card ${selected ? 'is-selected' : ''} ${correct ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`}>
                <input type="checkbox" checked={selected} onChange={() => toggle(choice.id)} />
                <span className="m5-choice-card__mark" aria-hidden="true">{selected ? '✓' : '•'}</span>
                <span>
                  <strong>{choice.label}</strong>
                  <small>{choice.body}</small>
                  <em>{choice.why}</em>
                </span>
              </label>
            );
          })}
        </div>
        {submitted && (
          <article className={`m5-r08-feedback ${feedback.className}`} aria-live="polite" tabIndex={-1}>
            <h2>{feedback.heading}</h2>
            <p>{feedback.body}</p>
            {hasUnsafe && (
              <p>
                <strong>Caution:</strong> Do not expose people to prove transparency. Sensitive feedback should be handled through agreed safe pathways, with minimum necessary information and the right responsible role.
              </p>
            )}
          </article>
        )}
        {submitted && (
          <section className="m5-r08-summary-panel" aria-labelledby="m5-r08-summary-heading">
            <h2 id="m5-r08-summary-heading">Feedback and response pathway summary</h2>
            <p>Awra's stronger feedback mechanism should:</p>
            <ul>
              <li>explain the channel clearly before and during activities;</li>
              <li>make feedback options accessible to different groups;</li>
              <li>receive feedback safely and protect identity;</li>
              <li>record only minimum necessary information;</li>
              <li>review feedback through the right role or mechanism;</li>
              <li>respond, refer, or escalate where needed;</li>
              <li>adapt activities when feedback shows barriers;</li>
              <li>account back to communities on what was heard, what changed, what did not, why, and next steps.</li>
            </ul>
            <p className="m5-carry-forward-note">{clinicPracticeNotes['M5-R08'].carry}</p>
          </section>
        )}
        <article className="m5-r08-portfolio-bridge">
          <p>
            Later, you will choose one feedback or accountability improvement to include in your <strong>HRBA MEAL, Accountability, and Learning Improvement Note</strong>. For now, focus on how feedback moves from collection to safe response, adaptation, and account-back.
          </p>
        </article>
        <article className="m5-safety-warning">
          <strong>Safe practice note</strong>
          <span>Use fictional or generalized examples only. Do not enter real names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, or official names. In real work, sensitive concerns should follow your organization&apos;s safeguarding, protection, complaint, referral, and data-protection procedures.</span>
        </article>
        <footer className="m5-ladder-actions m5-r08-actions">
          <div>
            <h3>{submitted ? `${selectedCorrect} of ${correctIds.length} strong pathway actions selected` : 'Complete the feedback pathway'}</h3>
            <p>{submitted ? 'Review the response loop before continuing. Any weak or unsafe option can be changed and checked again.' : 'Select the actions that make the feedback mechanism safe, useful, and accountable.'}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check feedback pathway' : 'Complete the feedback pathway'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R08', 'M5-R09', module5Routes['M5-R09'], onChangeState, key, { selectedIds, selectedCorrect, hasUnsafe, strong, submitted: true })} disabled={!canContinue}>
              {submitted ? config.ctaButton : 'Complete the feedback pathway'}
            </PrimaryButton>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Module5ParticipatoryReviewScreen({ state, onChangeState }: Module5RendererProps) {
  const config = module5Screens['M5-R09'];
  const practiceNote = clinicPracticeNotes['M5-R09'];
  const key = practiceKey('M5-R09');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R09');
  const [answers, setAnswers] = useState<Record<string, string>>((stored.answers as Record<string, string>) || {});
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const choose = (id: string, value: string) => {
    setSubmitted(false);
    const next = { ...answers, [id]: value };
    setAnswers(next);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R09');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { answers: next, submitted: false, status: 'in_progress' }),
      };
    });
  };

  const allAnswered = ethicalEvidenceItems.every((item) => answers[item.id]);
  const correctCount = ethicalEvidenceItems.filter((item) => answers[item.id] === item.answer).length;
  const hasUnsafe = ethicalEvidenceItems.some((item) => item.unsafeChoices.includes(answers[item.id] || ''));
  const feedback = correctCount >= 5 && !hasUnsafe
    ? {
        className: 'is-strong',
        heading: 'Strong evidence judgment: the report can be truthful and safe.',
        body: 'You protected identity, avoided overclaiming, respected consent and refusal, and offered safer alternatives. This is ethical HRBA MEAL: qualitative evidence can support learning and accountability without exposing people.',
      }
    : correctCount >= 3
      ? {
          className: 'is-partial',
          heading: 'Good start: strengthen the protection choices.',
          body: 'Some responses are safe and useful. Review any request involving names, faces, direct quotes, raw logs, complaint details, children, disability-related details, or strong transformation claims. Ask whether the same learning can be shared through safer themes or non-identifying evidence.',
        }
      : {
          className: 'is-weak',
          heading: 'Try again: the evidence request could expose people.',
          body: 'Qualitative evidence should not create pressure, expose identity, or make unsupported claims. Choose responses that protect dignity, use minimum necessary detail, and offer safer alternatives.',
        };
  const canSubmit = allAnswered;
  const canContinue = completed || submitted;

  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R09');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { answers, submitted: true, correctCount, hasUnsafe, status: 'completed' }),
      };
    });
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-ethical-evidence-screen" aria-labelledby="M5-R09-title">
      <section className="m5-hero-panel m5-ethical-evidence-hero">
        <div className="m5-hero-panel__copy cso-content-safe-header">
          <ModuleContextLabel>{config.context}</ModuleContextLabel>
          <ProgressChip>MEAL step: Ethical qualitative evidence</ProgressChip>
          <ScreenTitle id="M5-R09-title" lead={config.lead}>
            {config.title}
          </ScreenTitle>
          <p className="m5-r09-instruction">
            Use Awra's Jiru Amba case to choose safer responses to requests for names, photos, quotes, stories, or raw feedback data.
          </p>
          <article className="m5-story-card">
            <p className="m5-card-kicker">Case bridge</p>
            <h2>{config.storyTitle}</h2>
            {config.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
        <EvidenceVisual config={config} />
      </section>

      <section className="m5-canvas m5-ethical-evidence-canvas" aria-labelledby="m5-r09-practice">
        <article className="m5-r09-case-card">
          <p className="m5-card-kicker">Jiru Amba case: A strong report request can still create risk</p>
          <h2>Awra is asked for more "human" evidence</h2>
          <p>Awra's report now includes activity numbers, feedback themes, and access-barrier evidence. A donor or communications colleague asks for stronger human evidence: names, photos, direct quotes, success stories, complaint examples, and raw feedback notes.</p>
          <p>Awra wants to report truthfully and show learning. But it must not expose people, exaggerate change, or use rights-holders as promotional evidence.</p>
          <p><strong>How should Awra respond to these evidence requests safely and professionally?</strong></p>
        </article>
        <article className="m5-r09-worked-example">
          <p className="m5-card-kicker">Example: a safer alternative to an identifying story</p>
          <h3>Risky request</h3>
          <p>"Please send a named story with a photo showing how the project changed someone's life."</p>
          <h3>Safer response</h3>
          <p>"We cannot share names, faces, or identifying details. We can provide anonymized themes from feedback, a consent-based non-identifying example, and a clear statement about what the evidence shows and what it does not show."</p>
          <p>This response protects dignity and privacy while still giving useful evidence. It also avoids overclaiming that the project alone caused a person's full life change.</p>
        </article>
        <article className="m5-practice-point" aria-label="Why this decision matters">
          <p className="m5-card-kicker">Five checks before using a story, quote, photo, or case example</p>
          <p>{practiceNote.why}</p>
          <p><strong>Use the safest evidence that still tells the truth.</strong></p>
        </article>
        <div className="m5-r09-check-grid" aria-label="Ethical qualitative evidence checks">
          {config.revealItems.map((item) => (
            <article key={item.id} className="m5-r09-check-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Ethical evidence response activity</p>
            <h2 id="m5-r09-practice">{config.activityTitle}</h2>
            <p>{config.activityPrompt}</p>
          </div>
          <ProgressChip>{Object.values(answers).filter(Boolean).length} of {ethicalEvidenceItems.length} responses complete</ProgressChip>
        </div>
        <div className="m5-r09-response-options" aria-label="Safer evidence response choices">
          {ethicalEvidenceResponseOptions.map((option) => (
            <article key={option.id}>
              <h3>{option.label}</h3>
              <p>{option.summary}</p>
            </article>
          ))}
        </div>
        <div className="m5-r09-decision-grid">
          {ethicalEvidenceItems.map((item, index) => {
            const selected = answers[item.id] || '';
            const correct = submitted && selected === item.answer;
            const incorrect = submitted && selected && selected !== item.answer;
            return (
              <article key={item.id} className={`m5-r09-decision-card ${correct ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`}>
                <p className="m5-card-kicker">Task {index + 1}: {item.title}</p>
                <h3>Request</h3>
                <p>{item.request}</p>
                <label>
                  <span>Choose the safer evidence response</span>
                  <select value={selected} onChange={(event) => choose(item.id, event.target.value)} aria-label={`Safer evidence response for ${item.title}`}>
                    <option value="">Select one</option>
                    {ethicalEvidenceResponseOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </label>
                {selected && (
                  <p className="m5-selected-summary">
                    <strong>Selected meaning:</strong> {getOptionSummary(ethicalEvidenceResponseOptions, selected)}
                  </p>
                )}
                {submitted && (
                  <p className="m5-r09-card-feedback">
                    <strong>{correct ? 'Safer response.' : `Safer response: ${ethicalEvidenceResponseOptions.find((option) => option.id === item.answer)?.label}.`}</strong>{' '}
                    {item.feedback}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        {submitted && (
          <article className={`m5-r09-feedback ${feedback.className}`} aria-live="polite" tabIndex={-1}>
            <h2>{feedback.heading}</h2>
            <p>{feedback.body}</p>
            {hasUnsafe && (
              <p>
                <strong>Caution:</strong> Do not share names, faces, raw complaint logs, exact locations, child data, disability diagnoses, or identifiable stories to make a report stronger. Strong reporting protects people and tells the truth.
              </p>
            )}
          </article>
        )}
        {submitted && (
          <section className="m5-r09-summary-panel" aria-labelledby="m5-r09-summary-heading">
            <h2 id="m5-r09-summary-heading">Ethical qualitative evidence summary</h2>
            <p>Awra's safer approach should:</p>
            <ul>
              <li>use stories, quotes, photos, and case examples only for a clear purpose;</li>
              <li>confirm informed, voluntary, specific consent where evidence is used;</li>
              <li>respect refusal without pressure or loss of support;</li>
              <li>remove names, faces, exact locations, rare details, and identifying combinations;</li>
              <li>avoid raw complaint logs and sensitive case details;</li>
              <li>use anonymized themes, aggregate summaries, composite examples, or non-identifying examples where possible;</li>
              <li>report evidence limits honestly and avoid exaggerated success claims.</li>
            </ul>
            <p className="m5-carry-forward-note">{practiceNote.carry}</p>
          </section>
        )}
        <article className="m5-r09-portfolio-bridge">
          <p>
            Later, you will choose one ethical evidence decision to include in your <strong>HRBA MEAL, Accountability, and Learning Improvement Note</strong>. For now, focus on how to use qualitative evidence without exposing people or overclaiming results.
          </p>
        </article>
        <article className="m5-safety-warning">
          <strong>Safe practice note</strong>
          <span>Use fictional or generalized examples only. Do not enter real names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, official names, or identifiable photos. In real work, follow your organization&apos;s consent, safeguarding, referral, communications, and data-protection procedures.</span>
        </article>
        <footer className="m5-ladder-actions m5-r09-actions">
          <div>
            <h3>{submitted ? `${correctCount} of ${ethicalEvidenceItems.length} safer responses selected` : 'Complete the safer evidence responses'}</h3>
            <p>{submitted ? 'Review the response feedback before continuing. Any risky response can be changed and checked again.' : 'No real stories or project examples are needed. Use only the fictional requests on this screen.'}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check safer evidence responses' : 'Complete the safer evidence responses'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R09', 'M5-R10', module5Routes['M5-R10'], onChangeState, key, { answers, correctCount, hasUnsafe, submitted: true })} disabled={!canContinue}>
              {submitted ? config.ctaButton : 'Complete the safer evidence responses'}
            </PrimaryButton>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Module5SignalDecisionScreen({ state, onChangeState }: Module5RendererProps) {
  const config = module5Screens['M5-R10'];
  const practiceNote = clinicPracticeNotes['M5-R10'];
  const key = practiceKey('M5-R10');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R10');
  const [answers, setAnswers] = useState<Record<string, string>>((stored.answers as Record<string, string>) || {});
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const choose = (id: string, value: string) => {
    setSubmitted(false);
    const next = { ...answers, [id]: value };
    setAnswers(next);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R10');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { answers: next, submitted: false, status: 'in_progress' }),
      };
    });
  };

  const allAnswered = signalDecisionItems.every((item) => answers[item.id]);
  const correctCount = signalDecisionItems.filter((item) => item.answers.includes(answers[item.id])).length;
  const hasUnsafe = answers['sensitive-concern'] === 'pause-public-claim'
    || answers['sensitive-concern'] === 'engage-responsible-actor'
    || answers['sensitive-concern'] === 'adapt-access';
  const feedback = correctCount >= 5
    ? {
        className: 'is-strong',
        heading: 'Strong interpretation: evidence is guiding action.',
        body: 'You matched the evidence signals to responsible next actions. You adapted what Awra can change, protected sensitive concerns, consulted safely where voices may be missing, engaged responsible actors where needed, avoided overclaiming, and included account-back.',
      }
    : correctCount >= 3
      ? {
          className: 'is-partial',
          heading: 'Good start: review what each signal requires.',
          body: 'Some decisions are strong. Now check whether any signal needs a safer pathway, a responsible actor, a narrower claim, or account-back. HRBA-informed MEAL asks not only what the evidence shows, but what should happen next.',
        }
      : {
          className: 'is-weak',
          heading: 'Try again: different evidence signals need different responses.',
          body: 'Not every signal should lead to the same action. Some evidence calls for adaptation, some for safe consultation, some for referral, some for responsible-actor engagement, and some for more cautious reporting.',
        };
  const canSubmit = allAnswered;
  const canContinue = completed || submitted;
  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R10');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { answers, submitted: true, correctCount, hasUnsafe, status: 'completed' }),
      };
    });
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-evidence-action-screen" aria-labelledby="M5-R10-title">
      <section className="m5-hero-panel m5-evidence-action-hero">
        <div className="m5-hero-panel__copy cso-content-safe-header">
          <ModuleContextLabel>{config.context}</ModuleContextLabel>
          <ProgressChip>MEAL step: Evidence interpretation and adaptation</ProgressChip>
          <ScreenTitle id="M5-R10-title" lead={config.lead}>
            {config.title}
          </ScreenTitle>
          <p className="m5-r10-instruction">
            Use Awra's Jiru Amba evidence signals to choose the most responsible next action.
          </p>
          <article className="m5-story-card">
            <p className="m5-card-kicker">Case bridge</p>
            <h2>{config.storyTitle}</h2>
            {config.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
        <EvidenceVisual config={config} />
      </section>

      <section className="m5-canvas m5-evidence-action-canvas" aria-labelledby="m5-r10-practice">
        <article className="m5-r10-case-card">
          <p className="m5-card-kicker">Jiru Amba case: The evidence is asking for different responses</p>
          <h2>Awra's monthly MEAL review</h2>
          <p>Awra reviews its Jiru Amba evidence board. The team sees useful activity numbers, feedback themes, attendance patterns, access-barrier notes, and safe qualitative evidence. But the signals do not all point to the same action.</p>
          <p>Some can be addressed by Awra. Some require safe referral. Some require discussion with responsible actors such as a kebele committee, service provider, or woreda office. Some claims should be narrowed until the evidence is stronger.</p>
          <p><strong>What should Awra do next for each evidence signal?</strong></p>
        </article>
        <div className="m5-r10-example-grid">
          <article>
            <p className="m5-card-kicker">Example: one signal, one responsible next action</p>
            <h3>Signal</h3>
            <p>Several participants say meeting times exclude caregivers and market-day workers.</p>
            <h3>Better interpretation</h3>
            <p>This is not only a participation count issue. It shows an access and timing barrier.</p>
            <h3>Responsible next action</h3>
            <p>Awra can adapt meeting times, adjust information routes, and explain back what changed.</p>
          </article>
          <article>
            <p className="m5-card-kicker">Example: when adaptation is not enough</p>
            <h3>Signal</h3>
            <p>One person reports a sensitive protection or safeguarding concern through a feedback channel.</p>
            <h3>Better interpretation</h3>
            <p>This is not a normal program-improvement comment and should not be discussed publicly.</p>
            <h3>Responsible next action</h3>
            <p>Awra should follow the agreed safe pathway, record only minimum necessary information, and refer or escalate through the right role.</p>
          </article>
        </div>
        <article className="m5-practice-point" aria-label="Why this decision matters">
          <p className="m5-card-kicker">From evidence signal to next action</p>
          <p>{practiceNote.why}</p>
          <p><strong>Evidence should lead to a responsible decision, not only a report paragraph.</strong></p>
        </article>
        <div className="m5-r10-concept-grid" aria-label="Evidence interpretation questions">
          {config.revealItems.map((item) => (
            <article key={item.id} className="m5-r10-concept-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="m5-r10-action-options" aria-label="Responsible next action options">
          {signalActionOptions.map((option) => (
            <article key={option.id}>
              <h3>{option.label}</h3>
              <p>{option.summary}</p>
            </article>
          ))}
        </div>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Evidence signal decision activity</p>
            <h2 id="m5-r10-practice">{config.activityTitle}</h2>
            <p>{config.activityPrompt}</p>
          </div>
          <ProgressChip>{Object.values(answers).filter(Boolean).length} of {signalDecisionItems.length} decisions complete</ProgressChip>
        </div>
        <div className="m5-r10-decision-grid">
          {signalDecisionItems.map((item, index) => {
            const selected = answers[item.id] || '';
            const correct = submitted && item.answers.includes(selected);
            const incorrect = submitted && selected && !correct;
            const correctLabels = item.answers.map((answer) => signalActionOptions.find((option) => option.id === answer)?.label).join(' or ');
            return (
              <article key={item.id} className={`m5-r10-decision-card ${correct ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`}>
                <p className="m5-card-kicker">Task {index + 1}</p>
                <h3>Evidence signal</h3>
                <p>{item.signal}</p>
                <label>
                  <span>Choose the responsible next action</span>
                  <select value={selected} onChange={(event) => choose(item.id, event.target.value)}>
                    <option value="">Choose an action</option>
                    {signalActionOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </label>
                {selected && (
                  <p className="m5-selected-summary">
                    <strong>Selected meaning:</strong> {getOptionSummary(signalActionOptions, selected)}
                  </p>
                )}
                {submitted && (
                  <p className="m5-r10-card-feedback">
                    <strong>{correct ? 'Responsible action.' : `Better action: ${correctLabels}.`}</strong>{' '}
                    {item.explanation}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        {submitted && (
          <article className={`m5-r10-feedback ${feedback.className}`} aria-live="polite" tabIndex={-1}>
            <h2>{feedback.heading}</h2>
            <p>{feedback.body}</p>
            {hasUnsafe && (
              <p>
                <strong>Caution:</strong> Do not turn sensitive evidence into public proof or informal investigation. First protect rights-holders, use the agreed pathway, and document follow-up safely.
              </p>
            )}
          </article>
        )}
        {submitted && (
          <section className="m5-r10-summary-panel" aria-labelledby="m5-r10-summary-heading">
            <h2 id="m5-r10-summary-heading">Evidence-to-action summary</h2>
            <p>Awra's MEAL interpretation should:</p>
            <ul>
              <li>check whether high numbers still hide missing groups;</li>
              <li>adapt timing, venue, communication, facilitation, or feedback processes where the team can act;</li>
              <li>consult safely when evidence suggests missing voices or unclear barriers;</li>
              <li>refer sensitive concerns through agreed safe pathways;</li>
              <li>engage responsible actors constructively when the issue is beyond Awra's direct control;</li>
              <li>pause or narrow claims when evidence is incomplete;</li>
              <li>account back to communities on what was heard, what changed, what did not, why, and next steps.</li>
            </ul>
            <p className="m5-carry-forward-note">{practiceNote.carry}</p>
          </section>
        )}
        <article className="m5-r10-portfolio-bridge">
          <p>
            Later, you will choose one evidence-to-action decision to include in your <strong>HRBA MEAL, Accountability, and Learning Improvement Note</strong>. For now, focus on how evidence should guide responsible adaptation and follow-up.
          </p>
        </article>
        <article className="m5-safety-warning">
          <strong>Safe practice note</strong>
          <span>Use fictional or generalized examples only. Do not enter real names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, official names, or identifying evidence. In real work, discuss sensitive evidence only through agreed safeguarding, protection, complaint, referral, and data-protection procedures.</span>
        </article>
        <footer className="m5-ladder-actions m5-r10-actions">
          <div>
            <h3>{submitted ? `${correctCount} of ${signalDecisionItems.length} signal decisions matched` : 'Complete the evidence-to-action decisions'}</h3>
            <p>{submitted ? 'Review why each signal calls for a specific response before continuing.' : 'Avoid public accusations, untrained investigations, and unnecessary identifying details.'}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check signal decisions' : 'Complete the evidence-to-action decisions'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R10', 'M5-R11', module5Routes['M5-R11'], onChangeState, key, { answers, correctCount, hasUnsafe, submitted: true })} disabled={!canContinue}>
              {submitted ? config.ctaButton : 'Complete the evidence-to-action decisions'}
            </PrimaryButton>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Module5ReportRepairScreen({ state, onChangeState }: Module5RendererProps) {
  const config = module5Screens['M5-R11'];
  const practiceNote = clinicPracticeNotes['M5-R11'];
  const key = practiceKey('M5-R11');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R11');
  const [answers, setAnswers] = useState<Record<string, string>>((stored.answers as Record<string, string>) || {});
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const choose = (id: string, value: string) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    setSubmitted(false);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R11');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { answers: next, submitted: false, status: 'in_progress' }) };
    });
  };

  const allAnswered = reportRepairItems.every((item) => answers[item.id]);
  const correctCount = reportRepairItems.filter((item) => answers[item.id] === item.answer).length;
  const hasUnsafe = reportRepairItems.some((item) => {
    const selected = answers[item.id];
    return item.options.some((option) => option.id === selected && option.unsafe);
  });
  const feedback = correctCount >= 5 && !hasUnsafe
    ? {
        className: 'is-strong',
        heading: 'Strong reporting: truthful, safe, and accountable.',
        body: 'You improved the report claims by reporting progress, naming evidence limits, protecting people, showing adaptation, and including account-back. This makes the report more credible and more useful for learning.',
      }
    : correctCount >= 3
      ? {
          className: 'is-partial',
          heading: 'Good start: strengthen the reporting judgment.',
          body: 'Some claims are safer now. Review any statement that says "everyone," hides mixed feedback, uses identifying stories, treats activities as success by themselves, or avoids naming evidence limits.',
        }
      : {
          className: 'is-weak',
          heading: 'Try again: the report still sounds stronger than the evidence.',
          body: 'HRBA-informed reporting should not polish away barriers, uncertainty, or feedback concerns. Choose claims that tell the truth, protect people, explain what changed, and show what still needs follow-up.',
        };
  const canSubmit = allAnswered;
  const canContinue = completed || submitted;
  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R11');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { answers, submitted: true, correctCount, hasUnsafe, status: 'completed' }) };
    });
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-reporting-screen" aria-labelledby="M5-R11-title">
      <section className="m5-hero-panel m5-reporting-hero">
        <div className="m5-hero-panel__copy cso-content-safe-header">
          <ModuleContextLabel>{config.context}</ModuleContextLabel>
          <ProgressChip>MEAL step: Reporting, limits, and account-back</ProgressChip>
          <ScreenTitle id="M5-R11-title" lead={config.lead}>
            {config.title}
          </ScreenTitle>
          <p className="m5-r11-instruction">
            Use Awra's Jiru Amba case to improve risky report claims so they are truthful, safe, and accountable.
          </p>
          <article className="m5-story-card">
            <p className="m5-card-kicker">Case bridge</p>
            <h2>{config.storyTitle}</h2>
            {config.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
        <EvidenceVisual config={config} />
      </section>

      <section className="m5-canvas m5-reporting-canvas" aria-labelledby="m5-r11-practice">
        <article className="m5-r11-case-card">
          <p className="m5-card-kicker">Jiru Amba case: The report needs truth, not polish</p>
          <h2>Awra prepares a monthly MEAL report</h2>
          <p>Awra has useful evidence: attendance numbers, feedback themes, access-barrier notes, safe qualitative evidence, and adaptation decisions. The team wants the report to show progress. But pressure to sound successful could lead to broad claims, hidden limits, identifying stories, or feedback described as positive when it was mixed.</p>
          <p><strong>How should Awra improve each risky claim so the report is evidence-based, safe, and accountable?</strong></p>
        </article>
        <div className="m5-r11-example-grid">
          <article>
            <p className="m5-card-kicker">Example: improving an overclaim</p>
            <h3>Risky claim</h3>
            <p>"Awra reached the whole community."</p>
            <h3>Safer report claim</h3>
            <p>"Awra reached 240 participants through six meetings. The evidence does not yet show whether informal women vendors, remote kebele residents, persons with disabilities, and women water users were reached equally, so the team will check barriers and adjust outreach."</p>
            <h3>Why this is stronger</h3>
            <p>The safer claim still reports progress. It also names the evidence limit, avoids pretending everyone was reached, and points to a next MEAL action.</p>
          </article>
          <article>
            <p className="m5-card-kicker">Example: reporting feedback without exposing people</p>
            <h3>Risky claim</h3>
            <p>"The report includes complaint examples to prove transparency."</p>
            <h3>Safer report claim</h3>
            <p>"Feedback themes were reviewed. Some concerns were addressed through timing changes, some require referral or follow-up, and no identifiable complaint details are shared."</p>
            <h3>Why this is safer</h3>
            <p>Transparency does not require exposing people. A safer report can explain themes, actions, limits, and next steps without publishing complaint details.</p>
          </article>
        </div>
        <article className="m5-practice-point" aria-label="What makes reporting rights-based">
          <p className="m5-card-kicker">What makes reporting rights-based?</p>
          <p>Before finalizing a MEAL report, check what is known, what limits should be named safely, who must be protected, what changed because of evidence, what remains unresolved, and what should be explained back.</p>
          <p><strong>Truthful limits make a report more credible, not weaker.</strong></p>
        </article>
        <div className="m5-r11-check-grid" aria-label="Rights-based reporting checks">
          {config.revealItems.map((item) => (
            <article key={item.id} className="m5-r11-check-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Reporting claim activity</p>
            <h2 id="m5-r11-practice">{config.activityTitle}</h2>
            <p>{config.activityPrompt}</p>
          </div>
          <ProgressChip>{Object.values(answers).filter(Boolean).length} of {reportRepairItems.length} claims complete</ProgressChip>
        </div>
        <div className="m5-r11-decision-grid">
          {reportRepairItems.map((item, index) => {
            const selected = answers[item.id] || '';
            const correct = submitted && selected === item.answer;
            const incorrect = submitted && selected && !correct;
            const selectedOption = item.options.find((option) => option.id === selected);
            const correctLabel = item.options.find((option) => option.id === item.answer)?.label;
            return (
              <article key={item.id} className={`m5-r11-decision-card ${correct ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`}>
                <p className="m5-card-kicker">Task {index + 1}: {item.title}</p>
                <h3>Risky claim</h3>
                <p>{item.risky}</p>
                <label>
                  <span>Choose the safer HRBA-informed reporting statement</span>
                  <select value={selected} onChange={(event) => choose(item.id, event.target.value)}>
                    <option value="">Choose an improved claim</option>
                    {item.options.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </label>
                {selected && (
                  <p className="m5-selected-summary">
                    <strong>Selected meaning:</strong> {selectedOption?.summary || item.selectedMeaning}
                  </p>
                )}
                {submitted && (
                  <p className="m5-r11-card-feedback">
                    <strong>{correct ? 'Safer claim.' : `Better claim: ${correctLabel}.`}</strong>{' '}
                    {item.explanation}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        {submitted && (
          <article className={`m5-r11-feedback ${feedback.className}`} aria-live="polite" tabIndex={-1}>
            <h2>{feedback.heading}</h2>
            <p>{feedback.body}</p>
            {hasUnsafe && (
              <p>
                <strong>Caution:</strong> Do not expose people or hide evidence limits to make a report look stronger. Safe reporting protects dignity, explains uncertainty, and tells communities what happened next.
              </p>
            )}
          </article>
        )}
        {submitted && (
          <section className="m5-r11-summary-panel" aria-labelledby="m5-r11-summary-heading">
            <h2 id="m5-r11-summary-heading">Responsible reporting summary</h2>
            <p>Awra's HRBA MEAL report should:</p>
            <ul>
              <li>report what the evidence actually shows;</li>
              <li>avoid claiming that everyone was reached unless evidence supports it;</li>
              <li>name evidence gaps and limits safely;</li>
              <li>protect identities, complaint details, child data, disability-related details, and exact locations;</li>
              <li>report feedback themes, response, referral, adaptation, and unresolved issues;</li>
              <li>show what changed because of evidence;</li>
              <li>explain what communities should hear back;</li>
              <li>distinguish Awra's own actions from issues requiring responsible-actor follow-up.</li>
            </ul>
            <p className="m5-carry-forward-note">{practiceNote.carry}</p>
          </section>
        )}
        <article className="m5-r11-portfolio-bridge">
          <p>
            Later, you will include one improved reporting or account-back statement in your <strong>HRBA MEAL, Accountability, and Learning Improvement Note</strong>. For now, focus on how truthful reporting can show progress and limits at the same time.
          </p>
        </article>
        <article className="m5-safety-warning">
          <strong>Safe practice note</strong>
          <span>Use fictional or generalized examples only. Do not enter real names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, official names, or identifiable photos. In real work, follow your organization&apos;s reporting, communications, safeguarding, referral, consent, and data-protection procedures.</span>
        </article>
        <footer className="m5-ladder-actions m5-r11-actions">
          <div>
            <h3>{submitted ? `${correctCount} of ${reportRepairItems.length} improved claims selected` : 'Complete the improved report claims'}</h3>
            <p>{submitted ? 'Review the claim feedback before continuing. Any risky statement can be changed and checked again.' : 'Choose the claim that reports evidence, limits, adaptation, and account-back without exposing people.'}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check improved report claims' : 'Complete the improved report claims'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R11', 'M5-R12', module5Routes['M5-R12'], onChangeState, key, { answers, correctCount, hasUnsafe, submitted: true })} disabled={!canContinue}>
              {submitted ? config.ctaButton : 'Complete the improved report claims'}
            </PrimaryButton>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Module5CapstoneSimulatorScreen({ state, onChangeState }: Module5RendererProps) {
  const config = module5Screens['M5-R12'];
  const key = practiceKey('M5-R12');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R12');
  const [answers, setAnswers] = useState<Record<string, string>>((stored.answers as Record<string, string>) || {});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>((stored.checkedQuestions as Record<string, boolean>) || {});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(typeof stored.activeQuestionIndex === 'number' ? stored.activeQuestionIndex : 0);
  const [summaryViewed, setSummaryViewed] = useState(Boolean(stored.summaryViewed || completed));
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));
  const activeQuestion = capstoneSteps[activeQuestionIndex] || capstoneSteps[0];
  const selectedAnswer = answers[activeQuestion.id] || '';
  const selectedOption = activeQuestion.options.find((option) => option.id === selectedAnswer);
  const isChecked = checkedQuestions[activeQuestion.id] === true;
  const answeredCount = capstoneSteps.filter((step) => answers[step.id]).length;
  const checkedCount = capstoneSteps.filter((step) => checkedQuestions[step.id]).length;
  const correctCount = capstoneSteps.filter((step) => checkedQuestions[step.id] && answers[step.id] === step.answer).length;
  const hasUnsafe = capstoneSteps.some((step) => {
    const selected = answers[step.id];
    return step.options.some((option) => option.id === selected && option.unsafe);
  });
  const allAnswered = answeredCount === capstoneSteps.length;
  const allChecked = checkedCount === capstoneSteps.length;
  const result = correctCount >= 5
    ? {
        heading: 'You are ready to build your improvement note.',
        body: 'You applied the HRBA-MEAL pathway well. Your answers used evidence to improve indicators, protect people, respond to feedback, adapt action, report truthfully, and account back.',
      }
    : correctCount >= 3
      ? {
          heading: 'Good progress. Review the decisions that carried risk.',
          body: 'You made several useful MEAL decisions. Review any answer that only counts activities, collects unnecessary detail, treats feedback as a number, shares identifying evidence, overclaims results, or hides limits.',
        }
      : {
          heading: 'Review the pathway before continuing.',
          body: 'Look again for the option that uses evidence safely and leads to action. HRBA-informed MEAL protects people, explains limits, responds to feedback, adapts practice, and accounts back.',
        };
  const persist = (patch: Record<string, unknown>) => {
    setSubmitted(false);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R12');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { answers, checkedQuestions, activeQuestionIndex, summaryViewed, submitted: false, status: 'in_progress', ...patch }),
      };
    });
  };
  const choose = (id: string, value: string) => {
    const nextAnswers = { ...answers, [id]: value };
    const nextChecked = { ...checkedQuestions, [id]: false };
    setAnswers(nextAnswers);
    setCheckedQuestions(nextChecked);
    setSummaryViewed(false);
    persist({ answers: nextAnswers, checkedQuestions: nextChecked, summaryViewed: false });
  };
  const checkAnswer = () => {
    if (!selectedAnswer) return;
    const nextChecked = { ...checkedQuestions, [activeQuestion.id]: true };
    setCheckedQuestions(nextChecked);
    persist({ checkedQuestions: nextChecked });
  };
  const moveQuestion = (nextIndex: number) => {
    const bounded = Math.max(0, Math.min(capstoneSteps.length - 1, nextIndex));
    setActiveQuestionIndex(bounded);
    persist({ activeQuestionIndex: bounded });
  };
  const viewSummary = () => {
    if (!allChecked) return;
    setSummaryViewed(true);
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R12');
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { answers, checkedQuestions, activeQuestionIndex, summaryViewed: true, submitted: true, correctCount, hasUnsafe, status: 'completed' }),
      };
    });
  };
  const canContinue = completed || (submitted && summaryViewed);

  return (
    <main className="m2-s22-kc-screen m5-knowledge-check-screen" aria-labelledby="M5-R12-title">
      <section className="m2-s22-kc-shell m5-knowledge-check-shell">
        <header className="m2-s22-kc-header">
          <div className="m2-s22-kc-title">
            <p className="m2-s22-kc-kicker">MODULE 5 · HRBA IN MEAL</p>
            <ProgressChip>MEAL step: Integrated knowledge check</ProgressChip>
            <h1 id="M5-R12-title">{config.title}</h1>
            <p>{config.lead}</p>
            <p>Read Awra’s Jiru Amba scenario. For each question, choose the answer that best fits the HRBA-MEAL purpose named in the question.</p>
          </div>
          <aside className="m2-s22-kc-note m5-kc-scenario-card">
            <strong>{config.storyTitle}</strong>
            {config.story.map((paragraph) => (
              <span key={paragraph}>{paragraph}</span>
            ))}
          </aside>
        </header>

        {summaryViewed ? (
          <section className="m2-s22-kc-complete m5-kc-complete" aria-live="polite">
            <p className="m2-s22-kc-kicker">Final result summary</p>
            <h2>{result.heading}</h2>
            <p>{result.body}</p>
            <div>
              <strong>{correctCount} of {capstoneSteps.length}</strong>
              <span>evidence-to-action decisions correct</span>
            </div>
            {hasUnsafe && (
              <article className="m5-kc-caution">
                <h3>Check the safety risk.</h3>
                <p>Do not make evidence look stronger by exposing people or hiding uncertainty. Avoid names, exact locations, raw logs, identifying stories, unnecessary personal detail, and unsupported claims.</p>
              </article>
            )}
            <article className="m5-kc-carry-forward">
              <h3>What this prepares you to do next</h3>
              <p>Next, you will create your <strong>HRBA MEAL, Accountability, and Learning Improvement Note</strong>. The note will help you capture one practical MEAL improvement, one safer evidence decision, one feedback or accountability improvement, one adaptation action, and one account-back step.</p>
            </article>
            <article className="m5-safety-warning">
              <strong>Safe practice note</strong>
              <span>Use fictional or generalized examples only. Do not enter real names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, official names, or identifiable photos. In real work, follow your organization&apos;s consent, safeguarding, referral, reporting, and data-protection procedures.</span>
            </article>
          </section>
        ) : (
          <section className="m2-s22-kc-board">
            <aside className="m2-s22-kc-progress">
              <span>Question {activeQuestionIndex + 1} of {capstoneSteps.length}</span>
              <strong>{checkedCount} of {capstoneSteps.length} checked</strong>
              <div>
                {capstoneSteps.map((question, index) => (
                  <button
                    key={question.id}
                    type="button"
                    className={`${index === activeQuestionIndex ? 'is-active' : ''} ${checkedQuestions[question.id] ? 'is-checked' : ''}`}
                    aria-label={`Go to question ${index + 1}: ${question.title}`}
                    onClick={() => moveQuestion(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </aside>

            <article className="m2-s22-kc-question">
              <p className="m2-s22-kc-kicker">Question {activeQuestionIndex + 1} of {capstoneSteps.length}</p>
              <h2>{activeQuestion.title}</h2>
              <p>{activeQuestion.scenario}</p>
              <p><strong>{activeQuestion.prompt}</strong></p>
              <fieldset className="m2-s22-kc-options">
                <legend className="sr-only">{activeQuestion.prompt}</legend>
                {activeQuestion.options.map((option) => {
                  const selected = selectedAnswer === option.id;
                  const checked = isChecked && selected;
                  return (
                    <label key={option.id} className={`${selected ? 'is-selected' : ''} ${checked && option.id === activeQuestion.answer ? 'is-correct' : ''} ${checked && option.id !== activeQuestion.answer ? 'is-incorrect' : ''}`}>
                      <input
                        type="radio"
                        name={activeQuestion.id}
                        checked={selected}
                        onChange={() => choose(activeQuestion.id, option.id)}
                      />
                      <span>{option.id}</span>
                      <strong>{option.label}</strong>
                    </label>
                  );
                })}
              </fieldset>
            </article>

            <aside className={`m2-s22-kc-feedback ${isChecked ? 'is-visible' : ''}`} aria-live="polite">
              <p className="m2-s22-kc-kicker">Feedback</p>
              {isChecked && selectedOption ? (
                <>
                  <h2>{selectedAnswer === activeQuestion.answer ? 'Correct.' : 'Not quite.'}</h2>
                  <p>{selectedOption.summary}</p>
                  <div>
                    <strong>Pathway reminder</strong>
                    <span>{activeQuestion.takeaway}</span>
                  </div>
                </>
              ) : (
                <>
                  <h2>Choose the best HRBA-MEAL decision.</h2>
                  <p>Some options may sound practical, but only one best fits the evidence-to-action purpose in this question.</p>
                </>
              )}
            </aside>
          </section>
        )}

        <footer className="m2-s22-kc-footer">
          {summaryViewed ? (
            <button type="button" onClick={() => completeSimpleScreen('M5-R12', 'M5-R13', module5Routes['M5-R13'], onChangeState, key, { answers, checkedQuestions, activeQuestionIndex, summaryViewed: true, correctCount, hasUnsafe, submitted: true })} disabled={!canContinue}>
              {config.ctaButton}
            </button>
          ) : allChecked ? (
            <button type="button" onClick={viewSummary}>View final result summary</button>
          ) : (
            <>
              <button type="button" className="m2-s22-kc-secondary" disabled={activeQuestionIndex === 0} onClick={() => moveQuestion(activeQuestionIndex - 1)}>Previous</button>
              <button type="button" disabled={!selectedAnswer || isChecked} onClick={checkAnswer}>
                {allAnswered ? 'Check my evidence-to-action decisions' : 'Answer all six decisions to continue'}
              </button>
              <button type="button" className="m2-s22-kc-secondary" disabled={!isChecked || activeQuestionIndex === capstoneSteps.length - 1} onClick={() => moveQuestion(activeQuestionIndex + 1)}>Next question</button>
            </>
          )}
        </footer>
      </section>
    </main>
  );
}

function Module5RepairNoteScreen({ state, onChangeState }: Module5RendererProps) {
  const config = module5Screens['M5-R13'];
  const key = practiceKey('M5-R13');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R13');
  const [answers, setAnswers] = useState<Record<string, string>>((stored.answers as Record<string, string>) || {});
  const [confirmedSafe, setConfirmedSafe] = useState(Boolean(stored.confirmedSafe || completed));
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const choose = (id: string, value: string) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    setConfirmedSafe(false);
    setCopyStatus('idle');
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R13');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { answers: next, confirmedSafe: false, submitted: false, status: 'in_progress' }) };
    });
  };

  const allAnswered = repairNoteSteps.every((step) => answers[step.id]);
  const canContinue = completed || (allAnswered && confirmedSafe);
  const selectedSummaries = repairNoteSteps.map((step) => ({
    id: step.id,
    title: step.outputLabel,
    sentenceLabel: step.sentenceLabel,
    label: step.options.find((option) => option.id === answers[step.id])?.label || '',
    summary: step.options.find((option) => option.id === answers[step.id])?.summary || '',
  }));
  const selectedById = Object.fromEntries(selectedSummaries.map((item) => [item.id, item.label]));
  const repairNoteText = [
    'My HRBA MEAL, Accountability, and Learning Note',
    'This note captures one safe and practical MEAL improvement from Module 5.',
    ...selectedSummaries.map((item) => `${item.title}: ${item.sentenceLabel}: ${item.label}`),
    `My improvement note: In the next MEAL review, the team will improve ${selectedById.area || '[practice focus]'} by using ${selectedById.repair || '[safe evidence]'} to answer ${selectedById.gap || '[guiding HRBA-MEAL question]'}. The team will protect rights-holders by applying ${selectedById.involve || '[safety boundary]'}. Based on the evidence, the team will ${selectedById.limit || '[action to take]'} and will account back by ${selectedById.accountBack || '[account-back step]'}.`,
  ].join('\n');

  const setSafetyConfirmation = (checked: boolean) => {
    setConfirmedSafe(checked);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      if (checked && allAnswered) {
        progress.add('M5-R13');
      } else {
        progress.delete('M5-R13');
      }
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { answers, confirmedSafe: checked, repairNoteText, submitted: checked && allAnswered, status: checked && allAnswered ? 'completed' : 'in_progress' }),
      };
    });
  };

  const copySummary = async () => {
    if (!repairNoteText) {
      return;
    }

    setCopyStatus('idle');
    let copiedToClipboard = false;

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(repairNoteText);
        copiedToClipboard = true;
      } catch {
        copiedToClipboard = false;
      }
    }

    if (!copiedToClipboard && typeof document !== 'undefined') {
      const textArea = document.createElement('textarea');
      textArea.value = repairNoteText;
      textArea.setAttribute('readonly', 'true');
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, repairNoteText.length);
      try {
        copiedToClipboard = document.execCommand('copy');
      } catch {
        copiedToClipboard = false;
      }
      document.body.removeChild(textArea);
    }

    setCopyStatus(copiedToClipboard ? 'copied' : 'failed');
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-portfolio-note-screen" aria-labelledby="M5-R13-title">
      <section className="m5-hero-panel m5-portfolio-note-hero">
        <div className="m5-hero-panel__copy cso-content-safe-header">
          <ModuleContextLabel>{config.context}</ModuleContextLabel>
          <ProgressChip>MEAL step: Portfolio note</ProgressChip>
          <ScreenTitle id="M5-R13-title" lead={config.lead}>
            {config.title}
          </ScreenTitle>
          <p className="m5-r13-instruction">
            Use the structured choices below. Do not enter real names, exact locations, complaint details, survivor stories, child data, disability diagnoses, or identifiable examples.
          </p>
          <article className="m5-story-card">
            <p className="m5-card-kicker">Scenario</p>
            <h2>{config.storyTitle}</h2>
            {config.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
        <EvidenceVisual config={config} />
      </section>

      <section className="m5-canvas m5-portfolio-note-canvas" aria-labelledby="m5-r13-practice">
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Structured portfolio builder</p>
            <h2 id="m5-r13-practice">{config.activityTitle}</h2>
            <p>{config.activityPrompt}</p>
          </div>
          <ProgressChip>{Object.values(answers).filter(Boolean).length} of {repairNoteSteps.length} choices complete</ProgressChip>
        </div>
        <div className="m5-r13-builder-grid">
          {repairNoteSteps.map((step) => {
            const selected = answers[step.id] || '';
            return (
              <article key={step.id} className="m5-r13-builder-card">
                <label>
                  <span>{step.title}</span>
                  <small>{step.prompt}</small>
                  <select value={selected} onChange={(event) => choose(step.id, event.target.value)}>
                    <option value="">Choose one</option>
                    {step.options.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </label>
                {selected && (
                  <p className="m5-selected-summary">
                    <strong>Selected meaning:</strong> {getOptionSummary(step.options, selected)}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        {allAnswered && (
          <article className="m5-r13-generated-note" aria-live="polite">
            <p className="m5-card-kicker">Generated portfolio note</p>
            <h2>My HRBA MEAL, Accountability, and Learning Note</h2>
            <p>This note captures one safe and practical MEAL improvement from Module 5.</p>
            <dl>
              {selectedSummaries.map((item) => (
                <div key={item.id}>
                  <dt>{item.title}</dt>
                  <dd><strong>{item.sentenceLabel}:</strong> {item.label}</dd>
                </div>
              ))}
            </dl>
            <article className="m5-r13-generated-paragraph">
              <h3>My improvement note:</h3>
              <p>
                In the next MEAL review, the team will improve <strong>{selectedById.area}</strong> by using <strong>{selectedById.repair}</strong> to answer <strong>{selectedById.gap}</strong>. The team will protect rights-holders by applying <strong>{selectedById.involve}</strong>. Based on the evidence, the team will <strong>{selectedById.limit}</strong> and will account back by <strong>{selectedById.accountBack}</strong>.
              </p>
            </article>
            <PrimaryButton onClick={copySummary}>{copyStatus === 'copied' ? 'Portfolio note copied' : 'Copy portfolio note'}</PrimaryButton>
            {copyStatus !== 'idle' && (
              <p className="m5-selected-summary" role="status" aria-live="polite">
                {copyStatus === 'copied'
                  ? 'Portfolio note copied.'
                  : 'Copy did not complete. Select and copy the note manually.'}
              </p>
            )}
          </article>
        )}
        <article className="m5-r13-confirmation">
          <h2>Before you continue</h2>
          <p>Confirm that your portfolio note uses fictional or generalized learning only and does not include names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, official names, or identifiable photos.</p>
          <label>
            <input
              type="checkbox"
              checked={confirmedSafe}
              disabled={!allAnswered}
              onChange={(event) => setSafetyConfirmation(event.target.checked)}
            />
            <span>I confirm this note is safe to save and does not include identifying or sensitive details.</span>
          </label>
        </article>
        {confirmedSafe && allAnswered && (
          <article className="m5-r13-ready" aria-live="polite">
            <h2>Your portfolio note is ready.</h2>
            <p>You have created a safe HRBA MEAL note that connects evidence, action, protection, and account-back. In the next screen, you will turn this note into a simple 30/60/90-day practice bridge.</p>
          </article>
        )}
        <article className="m5-safety-warning">
          <strong>Safe practice note</strong>
          <span>Use fictional or generalized examples only. Do not enter real names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, official names, or identifiable photos. In real work, follow your organization&apos;s consent, safeguarding, referral, reporting, and data-protection procedures.</span>
        </article>
        <footer className="m5-ladder-actions m5-r13-actions">
          <div>
            <h3>{!allAnswered ? 'Complete your portfolio note' : confirmedSafe ? 'Your portfolio note is ready' : 'Confirm the note is safe to save'}</h3>
            <p>{confirmedSafe && allAnswered ? config.feedbackStrong : 'The note is generated only from structured choices and must be confirmed safe before you continue.'}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R13', 'M5-R14', module5Routes['M5-R14'], onChangeState, key, { answers, confirmedSafe, repairNoteText, submitted: true })} disabled={!canContinue}>
              {!allAnswered ? 'Complete your portfolio note' : confirmedSafe ? config.ctaButton : 'Confirm the note is safe to save'}
            </PrimaryButton>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Module5PracticeBridgeScreen({ state, onChangeState }: Module5RendererProps) {
  const config = module5Screens['M5-R14'];
  const key = practiceKey('M5-R14');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R14');
  const allRevealIds = config.revealItems.map((item) => item.id);
  const [openedIds, setOpenedIds] = useState<string[]>(completed ? allRevealIds : (stored.openedIds as string[]) || []);
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const storedSelected = (stored.selected as Record<string, string | string[]>) || {};
    return Object.fromEntries(
      Object.entries(storedSelected).map(([groupId, value]) => [groupId, Array.isArray(value) ? value[0] || '' : value]),
    );
  });
  const [confirmedSafe, setConfirmedSafe] = useState(Boolean(stored.confirmedSafe || completed));

  const openReveal = (id: string) => {
    const next = openedIds.includes(id) ? openedIds : [...openedIds, id];
    setOpenedIds(next);
    onChangeState((prev) => ({ ...prev, practiceCheckState: updatePracticeState(prev, key, { openedIds: next, status: 'in_progress' }) }));
  };

  const toggle = (groupId: string, optionId: string) => {
    const next = { ...selected, [groupId]: optionId };
    setSelected(next);
    setConfirmedSafe(false);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R14');
      progress.delete('M5-PLAYER-COMPLETE');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { selected: next, confirmedSafe: false, status: 'in_progress' }) };
    });
  };

  const allReviewed = openedIds.length === allRevealIds.length;
  const allStagesSelected = bridgeActionGroups.every((group) => Boolean(selected[group.id]));
  const canConfirm = allReviewed && allStagesSelected;
  const canComplete = completed || (allStagesSelected && confirmedSafe);
  const selectedOptions = Object.fromEntries(
    bridgeActionGroups.map((group) => [group.id, group.options.find((option) => option.id === selected[group.id])]),
  );
  const day30 = selectedOptions.day30?.label || '[selected Section 1 option]';
  const day60 = selectedOptions.day60?.label || '[selected Section 2 option]';
  const day90 = selectedOptions.day90?.label || '[selected Section 3 option]';
  const accountBackRoute = selectedOptions.accountBackRoute?.label || '[selected Section 4 option]';
  const safetyRule = selectedOptions.safetyRule?.label || '[selected Section 5 option]';
  const commitmentText = `My 90-day practice bridge: In the first 30 days, the team will ${day30.toLowerCase()}. By 60 days, the team will ${day60.toLowerCase()}. By 90 days, the team will ${day90.toLowerCase()}. The team will account back through ${accountBackRoute.toLowerCase()} and will protect rights-holders by applying ${safetyRule.toLowerCase()}.`;

  const updateConfirmation = (checked: boolean) => {
    if (!canConfirm) return;
    setConfirmedSafe(checked);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-PLAYER-COMPLETE');
      if (checked) {
        progress.add('M5-R14');
      } else {
        progress.delete('M5-R14');
      }
      return {
        ...prev,
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { openedIds, selected, confirmedSafe: checked, commitmentText, status: checked ? 'completed' : 'in_progress' }),
      };
    });
  };

  const completeModule = () => {
    if (!canComplete) return;
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R14');
      progress.add('M5-PLAYER-COMPLETE');
      return {
        ...prev,
        currentScreenId: 'M5-PLAYER-COMPLETE',
        completedModules: prev.completedModules.includes(MODULE_ID) ? prev.completedModules : [...prev.completedModules, MODULE_ID],
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { openedIds, selected, confirmedSafe: true, commitmentText, status: 'completed' }),
      };
    });
    setRoute(module5Routes['M5-PLAYER-COMPLETE']);
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-clinic-screen m5-practice-bridge-screen" aria-labelledby="M5-R14-title">
      <Module5ClinicHero config={config} />
      <section className="m5-canvas m5-clinic-canvas m5-r14-canvas" aria-labelledby="m5-r14-practice">
        <div className="m5-safety-warning">
          <strong>Choose realistic actions.</strong>
          <span>Choose practical actions for the next 30, 60, and 90 days. Keep the plan realistic, safe, and focused on one improvement your team could test in normal MEAL practice.</span>
        </div>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">90-day plan builder</p>
            <h2 id="m5-r14-practice">Build one safe practice bridge</h2>
            <p>Review the bridge, then choose one preparation action, one test, one learning action, one account-back route, and one safety rule.</p>
          </div>
          <ProgressChip>{openedIds.length} of {allRevealIds.length} stages reviewed</ProgressChip>
        </div>
        <Module5ClinicRevealCards config={config} openedIds={openedIds} onOpen={openReveal} />
        <div className="m5-bridge-grid">
          {bridgeActionGroups.map((group) => (
            <fieldset key={group.id} className="m5-bridge-stage">
              <legend>{group.title}</legend>
              <p>{group.prompt}</p>
              {group.options.map((option) => {
                const isSelected = selected[group.id] === option.id;
                return (
                  <label key={option.id} className={`m5-choice-card ${isSelected ? 'is-selected' : ''}`}>
                    <input type="radio" name={`m5-r14-${group.id}`} checked={isSelected} onChange={() => toggle(group.id, option.id)} />
                    <span className="m5-choice-card__mark" aria-hidden="true">{isSelected ? '✓' : '•'}</span>
                    <span><strong>{option.label}</strong><small>{option.summary}</small></span>
                  </label>
                );
              })}
            </fieldset>
          ))}
        </div>
        <article className={`m5-r14-generated-plan ${allStagesSelected ? 'is-ready' : ''}`} aria-live="polite">
          <p className="m5-card-kicker">My 90-Day MEAL Learning and Account-Back Plan</p>
          <h2>My 90-Day MEAL Learning and Account-Back Plan</h2>
          <p>This plan turns one HRBA MEAL improvement into a practical 90-day action.</p>
          <dl>
            {bridgeActionGroups.map((group) => {
              const option = selectedOptions[group.id];
              return (
                <div key={group.id}>
                  <dt>{group.outputLabel}</dt>
                  <dd>{option ? <>I will: <strong>{option.label}</strong></> : 'Choose one option above.'}</dd>
                </div>
              );
            })}
          </dl>
          <div className="m5-r14-summary">
            <h3>My 90-day practice bridge:</h3>
            <p>{commitmentText}</p>
          </div>
        </article>
        <article className="m5-r14-confirmation">
          <h2>Before completing Module 5</h2>
          <p>Confirm that your 90-day plan uses fictional or generalized learning only and does not include names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, official names, or identifiable photos.</p>
          <label>
            <input type="checkbox" checked={confirmedSafe} disabled={!canConfirm} onChange={(event) => updateConfirmation(event.target.checked)} />
            <span>I confirm this plan is safe to save and does not include identifying or sensitive details.</span>
          </label>
        </article>
        {confirmedSafe && allStagesSelected && (
          <article className="m5-r14-ready" aria-live="polite">
            <h2>Your 90-day practice bridge is ready.</h2>
            <p>You have connected HRBA MEAL evidence to practical action, learning, and account-back. This plan can help a CSO test one realistic improvement without exposing people or overclaiming results.</p>
          </article>
        )}
        <article className="m5-safety-warning">
          <strong>Safe practice note</strong>
          <span>Use fictional or generalized examples only. Do not enter real names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, official names, or identifiable photos. In real work, follow your organization&apos;s MEAL, safeguarding, referral, reporting, consent, and data-protection procedures.</span>
        </article>
        <footer className="m5-ladder-actions m5-r14-actions">
          <div>
            <h3>{!allStagesSelected ? 'Complete your 90-day plan' : confirmedSafe ? 'Your 90-day practice bridge is ready' : 'Confirm the plan is safe to complete'}</h3>
            <p>{confirmedSafe && allStagesSelected ? config.feedbackStrong : 'The plan is generated only from structured choices and must be confirmed safe before completion.'}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={completeModule} disabled={!canComplete}>
              {!allStagesSelected ? 'Complete your 90-day plan' : confirmedSafe ? 'Complete Module 5' : 'Confirm the plan is safe to complete'}
            </PrimaryButton>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Module5CompleteScreen({ onChangeState }: { onChangeState: Module5RendererProps['onChangeState'] }) {
  const returnToCourse = () => {
    onChangeState((prev) => ({
      ...prev,
      currentLayer: 'platform',
      currentSubState: null,
      activeModal: null,
    }));
  };

  const practicedCards = [
    ['Evidence beyond activity counts', 'You looked beyond meetings, attendance, forms, and reports to ask what the evidence shows and what it may still hide.'],
    ['Indicators and logframe evidence', 'You improved indicators so they can show access, participation, feedback response, safety, accountability, and change.'],
    ['Safe data and disaggregation', 'You practiced collecting enough evidence to reveal exclusion without exposing people.'],
    ['Feedback and response', 'You strengthened feedback as a response pathway: receive safely, review, respond or refer, adapt, and account back.'],
    ['Ethical qualitative evidence', 'You practiced using stories, quotes, photos, and feedback themes with dignity, consent, anonymity, and truthful limits.'],
    ['Evidence-to-action learning', 'You used evidence to decide what should continue, adapt, be referred, be discussed with responsible actors, be reported with limits, or be explained back.'],
  ];
  const outputCards = [
    ['HRBA MEAL, Accountability, and Learning Note', 'A structured note that connects one MEAL improvement with safe evidence, action, and account-back.'],
    ['90-Day MEAL Learning and Account-Back Plan', 'A practical bridge for preparing, testing, learning, and explaining back over the next 90 days.'],
  ];

  return (
    <main className="m5-screen m5-screen--complete" aria-labelledby="m5-complete-title">
      <section className="m5-complete-shell">
        <header className="m5-complete-hero">
          <div>
            <ModuleContextLabel>MODULE 5 COMPLETE</ModuleContextLabel>
            <ScreenTitle
              id="m5-complete-title"
              lead="You have completed Module 5. You practiced how to use MEAL evidence to look beyond activity counts, identify who may be missing, protect people, respond to feedback, adapt action, report truthfully, and account back."
            >
              Module 5 Complete: HRBA MEAL Practice Bridge
            </ScreenTitle>
          </div>
          <div className="m5-complete-badge" aria-hidden="true">
            <span>✓</span>
            <strong>Module 5 complete</strong>
          </div>
        </header>

        <section className="m5-complete-section" aria-labelledby="m5-complete-practiced">
          <div className="m5-canvas__header">
            <div>
              <p className="m5-card-kicker">What you practiced</p>
              <h2 id="m5-complete-practiced">What you practiced</h2>
            </div>
          </div>
          <div className="m5-complete-grid">
            {practicedCards.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="m5-complete-section m5-complete-outputs" aria-labelledby="m5-complete-outputs">
          <div>
            <p className="m5-card-kicker">Your Module 5 outputs</p>
            <h2 id="m5-complete-outputs">Your Module 5 outputs</h2>
          </div>
          <div className="m5-complete-output-grid">
            {outputCards.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="m5-complete-takeaway" aria-labelledby="m5-complete-takeaway">
          <article>
            <h2 id="m5-complete-takeaway">Key takeaway</h2>
            <p>HRBA-informed MEAL is not only about collecting data or proving results. It is about using evidence to see exclusion, protect people, respond responsibly, adapt practice, report truthfully, and account back to rights-holders and communities.</p>
          </article>
          <article>
            <h2>Apply this safely</h2>
            <p>When applying this learning in real CSO work, use your organization&apos;s MEAL, safeguarding, consent, referral, reporting, and data-protection procedures. Do not include names, exact locations, complaint details, survivor stories, child data, disability diagnoses, confidential records, organization names, official names, or identifiable photos in unsafe formats.</p>
          </article>
        </section>

        <footer className="m5-complete-actions">
          <ScreenTitle
            id="m5-complete-next"
            lead="Your Module 5 outputs are ready for safe review in the course flow."
          >
            Ready for the next step
          </ScreenTitle>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={returnToCourse}>Return to course</PrimaryButton>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default function Module5Renderer(props: Module5RendererProps) {
  useEffect(() => {
    if (!props.screenId.startsWith('M5-R')) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document
      .querySelectorAll<HTMLElement>('.main-screen-canvas__content, .course-player-shell__content, .course-player__content')
      .forEach((element) => {
        element.scrollTop = 0;
        element.scrollLeft = 0;
      });
  }, [props.screenId]);

  if (props.screenId === 'M5-PLAYER-COMPLETE') {
    return <Module5CompleteScreen onChangeState={props.onChangeState} />;
  }

  if (props.screenId === 'M5-R01' || props.screenId === 'M5-S1-01') {
    return <Module5IntroVideoScreen {...props} />;
  }

  if (props.screenId === 'M5-R03') {
    return <Module5EvidenceGapDiagnosticScreen {...props} />;
  }

  if (props.screenId === 'M5-R04') {
    return <Module5HrbaMealLensCycleScreen {...props} />;
  }

  if (props.screenId === 'M5-R05') {
    return <Module5IndicatorRepairScreen {...props} />;
  }

  if (props.screenId === 'M5-R06') {
    return <Module5SafeEvidenceScreen {...props} />;
  }

  if (props.screenId === 'M5-R07') {
    return <Module5FeedbackLoopScreen {...props} />;
  }

  if (props.screenId === 'M5-R08') {
    return <Module5EthicalStoriesScreen {...props} />;
  }

  if (props.screenId === 'M5-R09') {
    return <Module5ParticipatoryReviewScreen {...props} />;
  }

  if (props.screenId === 'M5-R10') {
    return <Module5SignalDecisionScreen {...props} />;
  }

  if (props.screenId === 'M5-R11') {
    return <Module5ReportRepairScreen {...props} />;
  }

  if (props.screenId === 'M5-R12') {
    return <Module5CapstoneSimulatorScreen {...props} />;
  }

  if (props.screenId === 'M5-R13') {
    return <Module5RepairNoteScreen {...props} />;
  }

  if (props.screenId === 'M5-R14') {
    return <Module5PracticeBridgeScreen {...props} />;
  }

  if (props.screenId === 'M5-R02' || props.screenId === 'M5-S1-02') {
    return <Module5LearningObjectivesScreen {...props} />;
  }

  const config = module5Screens[props.screenId];
  if (!config) {
    return (
      <main className="m5-screen" aria-labelledby="m5-placeholder-title">
        <section className="m5-canvas">
          <ModuleContextLabel>Module 5 · HRBA in MEAL</ModuleContextLabel>
          <h1 id="m5-placeholder-title">Module 5 screen coming soon</h1>
          <p>This Module 5 screen has not been configured yet.</p>
        </section>
      </main>
    );
  }

  return (
    <Module5CanvasScreen
      config={config}
      state={props.state}
      onChangeState={props.onChangeState}
    />
  );
}
