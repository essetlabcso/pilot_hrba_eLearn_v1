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
const module5ParticipatoryReviewSrc = '/assets/hrba/modules/module-5-redesign/m5-participatory-review-scene.png';
const module5AdaptationDecisionTreeSrc = '/assets/hrba/modules/module-5-redesign/m5-adaptation-decision-tree.png';
const module5ReportRepairCardsSrc = '/assets/hrba/modules/module-5-redesign/m5-report-repair-cards.png';
const module5CapstoneSimulatorSrc = '/assets/hrba/modules/module-5-redesign/m5-capstone-evidence-simulator-board.png';
const module5RepairNoteWorksheetSrc = '/assets/hrba/modules/module-5-redesign/m5-repair-note-worksheet.png';
const module5ActionJourneySrc = '/assets/hrba/modules/module-5-redesign/m5-90day-action-journey.png';
const module5IntroVideoTitle = 'Module 5 intro video: The Numbers Look Good, But Who Is Missing?';
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
    title: 'Look beyond good numbers',
    text: 'Ask who benefited, who was missed, and what changed for different people when project reports show strong outputs.',
    accent: 'blue',
  },
  {
    number: '02',
    title: 'Strengthen indicators and evidence',
    text: 'Improve indicators so they capture access, inclusion, participation, accountability, and meaningful change — not only activities completed.',
    accent: 'green',
  },
  {
    number: '03',
    title: 'Use data safely',
    text: 'Apply minimum necessary data, anonymization, and safer disaggregation choices so evidence helps inclusion without exposing people, small groups, or sensitive information.',
    accent: 'gold',
  },
  {
    number: '04',
    title: 'Treat feedback as evidence',
    text: 'Use community feedback, concerns, and qualitative signals as learning evidence when they show barriers, exclusion, weak participation, or accountability gaps.',
    accent: 'blue',
  },
  {
    number: '05',
    title: 'Learn and adapt from MEAL findings',
    text: 'Use monitoring evidence to identify what needs to change and choose practical adaptations that strengthen rights-based implementation.',
    accent: 'green',
  },
  {
    number: '06',
    title: 'Report responsibly',
    text: 'Communicate progress, limitations, risks, and learning honestly without overstating results or using stories and data in ways that could harm people.',
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
    title: 'Safe and Inclusive Evidence',
    phase: 'Practice clinic · Safe evidence',
    lead: 'Choose evidence that helps the team see inclusion and barriers without exposing people to harm.',
    visualSrc: module5SafeDataTreeSrc,
    visualAlt: 'Safe and inclusive data decision tree showing when to collect, aggregate, anonymize, suppress, or avoid data.',
    block: 'Safe Evidence Decisions',
    storyTitle: 'Useful evidence must also be safe',
    story: [
      'The CSO wants to understand who is participating and who is still excluded. The team considers gender, disability, age, location, feedback themes, and access barriers.',
      'Some evidence is useful, but some details could identify people or expose them to risk. More detailed data is not always better.',
      'Useful evidence is not always more detailed evidence. HRBA MEAL uses the minimum information needed to understand access, barriers, safety, participation, change, and accountability.',
    ],
    revealTitle: 'Safe evidence decisions',
    revealItems: [
      ['Useful', 'Collect data only if it will support a clear decision or accountability action.'],
      ['Minimum necessary', 'Do not collect names, exact locations, diagnoses, or sensitive details if a safer category or theme is enough.'],
      ['Aggregate when groups are small', 'If a small group could be identified, combine categories or suppress details.'],
      ['Protect dignity and consent', 'Consent matters, but consent alone is not enough if the evidence could expose someone.'],
      ['Use barriers, not labels only', 'Inclusion evidence should show access barriers and adjustments, not just list groups.'],
      ['Small-cell risk', 'A person or small group can be recognized when details are combined, such as disability, age, location, role, quote, photo, complaint theme, or timing.'],
      ['Disability data is not diagnosis', 'Do not collect diagnosis-based details for reporting. Use functional access, communication, support, and participation barriers when useful and protected.'],
      ['Purpose limitation', 'Collect evidence only when the team knows why it is needed, how it will be protected, who will use it, and what action it can support.'],
    ],
    activityTitle: 'Choose the safest useful evidence decision',
    activityPrompt: 'Select how the team should handle each fictional evidence example.',
    options: makeOptions(['Use safe, useful, proportionate evidence decisions.', 'Collect as much detail as possible.']),
    insight: ['The safest evidence choice is the one that is useful for action and least likely to identify, label, or expose people.'],
    cta: 'Continue to Screen 5.3',
    nextId: 'M5-R07',
  }),
  'M5-R07': baseConfig({
    id: 'M5-R07',
    title: 'Feedback, Complaints, and Trust',
    phase: 'Practice clinic · Feedback loop',
    lead: 'Repair a weak feedback channel so feedback becomes safe evidence for response, referral, adaptation, and account-back.',
    visualSrc: module5FeedbackLoopSrc,
    visualAlt: 'Feedback and complaints loop visual showing receive, record safely, review, respond or refer, adapt, and report back.',
    block: 'Feedback Loop Repair',
    storyTitle: 'A box is not the same as accountability',
    story: [
      'A CSO report says a feedback box was installed and community meetings were held.',
      'The team still does not know whether people trusted the channel, whether different groups could use it, whether feedback was reviewed, whether concerns were answered or referred, or whether the community heard what changed.',
      'Feedback collection is not accountability unless feedback is safely received, reviewed by the right role, responded to or referred, used for adaptation where appropriate, and explained back to communities.',
    ],
    revealTitle: 'Accountability loop checks',
    revealItems: [
      ['Access', 'Can women, people with disabilities, young people, caregivers, and marginalized groups use the channel safely?'],
      ['Trust', 'Do people know what happens after feedback is shared, and do they believe it will be handled respectfully?'],
      ['Safe recording', 'Record only what is necessary. Avoid names and identifying details unless required by a safe protocol.'],
      ['Response and referral', 'Some concerns require referral or safeguarding pathways. CSO staff should not investigate sensitive complaints without mandate and training.'],
      ['Adaptation', 'Feedback should inform changes to timing, access, communication, targeting, referral information, or service quality.'],
      ['Account-back', 'Communities should hear what was received, what changed, what could not be solved, why, and what happens next.'],
      ['Know the concern type', 'Routine feedback may guide adaptation. Complaints may need response or referral. Sensitive protection, safeguarding, GBV, child-protection, fraud, or abuse concerns must follow the agreed safe pathway.'],
      ['Start practical', 'A local CSO can begin with clear channels, safe recording, defined roles, referral boundaries, response timelines, and account-back.'],
    ],
    activityTitle: 'Repair the feedback pathway',
    activityPrompt: 'Select the steps that make feedback safe, useful, and accountable.',
    options: makeOptions(['Build a safe response, referral, adaptation, and account-back pathway.', 'Only count complaints received.']),
    insight: ['Feedback becomes accountability evidence when it is safely received, reviewed, responded to or referred, used for adaptation where appropriate, and explained back.'],
    cta: 'Continue to Screen 5.3',
    nextId: 'M5-R08',
  }),
  'M5-R08': baseConfig({
    id: 'M5-R08',
    title: 'Ethical Stories and Responsible Data',
    phase: 'Practice clinic · Ethical reporting',
    lead: 'Choose a safe response when a report request asks for names, photos, quotes, complaint details, or raw data.',
    visualSrc: module5DonorStoryInboxSrc,
    visualAlt: 'Request inbox and safe response checklist visual for story, photo, quote, and report requests.',
    block: 'Ethical Story Response',
    storyTitle: 'A strong report request can still create risk',
    story: [
      'A donor or project team asks for a strong story, photos, direct quotes, names, and raw feedback examples to make the report more convincing.',
      'The CSO must report truthfully without exposing people or turning rights-holders into promotional evidence.',
      'A strong report should never turn people into proof material. Stories, quotes, photos, and complaint examples require consent, dignity, purpose limitation, identity protection, and the right to refuse.',
    ],
    revealTitle: 'Safe story checks',
    revealItems: [
      ['Consent is necessary, not enough', 'Even with consent, the CSO should avoid harm, pressure, stigma, or unwanted visibility.'],
      ['Minimum detail', 'Use only details needed for learning and accountability.'],
      ['Identity protection', 'Avoid names, exact locations, faces, documents, and details that make a person recognizable.'],
      ['Respect refusal', 'Participation in a project must never depend on agreeing to be photographed, quoted, or profiled.'],
      ['Use safer alternatives', 'Use anonymized themes, aggregate data, non-identifying visuals, composite learning examples clearly labeled as composite, or staff reflection on adaptations.'],
      ['Tell the truth without overclaiming', 'Report what changed, what did not change, what is still uncertain, and what the CSO will do next.'],
      ['Refuse and offer safer alternatives', 'When a request is unsafe, refuse the unsafe detail and offer anonymized themes, aggregate patterns, consent-based non-identifying examples, adaptation evidence, or an honest limitation statement.'],
      ['Responsible reporting is truthful', 'Do not fabricate stories, erase negative feedback, overclaim success, or hide evidence limits.'],
    ],
    activityTitle: 'Choose safe responses to report requests',
    activityPrompt: 'Select the safer response for each fictional request.',
    options: makeOptions(['Protect dignity and still report useful evidence.', 'Prioritize the most dramatic report material.']),
    insight: ['Responsible reporting protects people and still tells the truth: it can refuse unsafe detail while offering safe themes, adaptation evidence, and honest limits.'],
    cta: 'Continue to Screen 5.3',
    nextId: 'M5-R09',
  }),
  'M5-R09': baseConfig({
    id: 'M5-R09',
    title: 'Interpreting Evidence with Rights-Holders',
    phase: 'Synthesis clinic · Interpret evidence safely',
    lead: 'Practice a safe participatory review routine that interprets evidence with rights-holders without exposing names, complaint details, or sensitive information.',
    visualSrc: module5ParticipatoryReviewSrc,
    visualAlt: 'Participatory review scene with a diverse community group discussing evidence, what was learned, what is working, and what to do next.',
    block: 'Participatory Evidence Interpretation',
    storyTitle: 'The team has evidence, but not the meaning yet',
    story: [
      'A fictional CSO has numbers, feedback themes, access-barrier notes, and facilitator reflections. The team could write a report immediately, but the evidence still needs interpretation with rights-holders.',
      'The review should protect people. It should discuss themes, barriers, and actions, not names, exact locations, complaint details, or private stories.',
      'A small CSO can start with a simple safe review routine: prepare themes, invite diverse voices safely, check what may be missing, agree next steps, and account back.',
    ],
    revealTitle: 'Safe participatory interpretation checks',
    revealItems: [
      ['Prepare safe themes, not raw data', 'Discuss safe evidence themes and patterns. Do not share raw complaint logs, names, exact locations, photos, or rare details.'],
      ['Ask who is still missing', 'Look for groups and barriers that the numbers may hide, including timing, language, disability access, safety, care responsibilities, cost, distance, or trust.'],
      ['Use accessible ways for less powerful voices', 'Use accessible, inclusive, and safer ways for people to contribute. One public meeting does not prove full participation.'],
      ['Separate sensitive complaints from public discussion', 'Sensitive protection, safeguarding, GBV, child-protection, fraud, abuse, or retaliation concerns require agreed safe pathways.'],
      ['Agree action, limits, referral, adaptation, and account-back messages', 'Record themes, decisions, adaptations, referrals, limits, and what will be explained back to communities.'],
    ],
    activityTitle: 'Build the safe review routine',
    activityPrompt: 'Select the steps that make interpretation participatory, safe, and useful for action.',
    options: makeOptions(['Interpret safe evidence themes with rights-holders and agree next steps.', 'Share raw complaint details so everyone can judge the case.']),
    feedbackStrong: 'Strong review routine. You protected identity, asked who was missing, made space for less powerful voices, separated complaints from public review, and recorded next steps.',
    feedbackSupport: 'The routine still needs repair. Look for steps that interpret themes with rights-holders while protecting identities and routing sensitive concerns safely.',
    insight: ['Participatory interpretation is not a public investigation. It is a safe way to understand themes, barriers, meaning, action, and account-back with rights-holders.'],
    cta: 'Continue to Screen 5.3',
    nextId: 'M5-R10',
  }),
  'M5-R10': baseConfig({
    id: 'M5-R10',
    title: 'Reading the Signals: When the Plan Should Change',
    phase: 'Synthesis clinic · Choose the response',
    lead: 'Match evidence signals to responsible next actions: continue, adapt, consult, refer, engage responsible actors, pause risky claims, or account back.',
    visualSrc: module5AdaptationDecisionTreeSrc,
    visualAlt: 'Adaptation decision tree showing evidence signals leading to continue, adapt, consult, refer, engage duty-bearer, or account back actions.',
    block: 'Evidence-to-Action Decision Tree',
    storyTitle: 'The evidence is asking for different responses',
    story: [
      'Some evidence confirms that an approach is working. Other evidence shows barriers, weak participation, unanswered feedback, safety concerns, access problems, or claims that are not yet supported.',
      'The team does not need one response for every signal. HRBA-informed MEAL asks what the evidence requires and who is responsible to act safely.',
      'The CSO should act within its mandate: adapt its own practice, share safe evidence, refer safely, engage responsible actors constructively, and explain limits.',
    ],
    revealTitle: 'Evidence response options',
    revealItems: [
      ['Continue and monitor', 'If safe evidence shows the approach is working and no new barrier is visible, keep going and keep listening.'],
      ['Adapt the activity', 'If access, timing, language, disability, care, cost, safety, or trust barriers appear, adjust the approach.'],
      ['Consult safely', 'If the meaning is unclear, consult affected groups safely and use non-identifying themes.'],
      ['Refer or escalate safely', 'If a concern is sensitive or outside the team mandate, use the agreed safe pathway instead of investigating it informally.'],
      ['Engage responsible actors', 'If the barrier sits with another responsible actor, share safe evidence and ask for action without exposing people.'],
      ['Narrow or repair the claim', 'If evidence only supports attendance, outputs, or partial reach, do not report broad change or full inclusion.'],
      ['Account back', 'Explain what was heard, what changed, what remains unresolved, and what happens next.'],
    ],
    activityTitle: 'Choose the responsible action',
    activityPrompt: 'For each fictional evidence signal, select the safest action that evidence requires.',
    options: makeOptions(['Let the evidence guide a specific, safe next action.', 'Collect more names before taking any action.']),
    feedbackStrong: 'Strong decisions. You matched signals to proportionate action instead of defaulting to more data, public blame, or informal investigation.',
    feedbackSupport: 'Review the signal again. The safest action may be adaptation, consultation, referral, duty-bearer engagement, pausing a weak claim, or account-back.',
    insight: ['Evidence should change something. The responsible action depends on the signal, the risk, the team mandate, and what rights-holders need to hear back.'],
    cta: 'Continue to Screen 5.3',
    nextId: 'M5-R11',
  }),
  'M5-R11': baseConfig({
    id: 'M5-R11',
    title: 'Reporting Without Losing the Rights Lens',
    phase: 'Synthesis clinic · Repair the report',
    lead: 'Repair risky report claims so they stay truthful, evidence-based, dignity-preserving, and accountable to communities.',
    visualSrc: module5ReportRepairCardsSrc,
    visualAlt: 'Report repair cards showing risky claims transformed into safer rights-based claims with truthful reporting, dignity, consent, safe evidence, and account-back.',
    block: 'Rights-Based Report Repair',
    storyTitle: 'The report needs truth, not polish',
    story: [
      'The team has to report progress. Pressure to sound successful can lead to unsupported claims, identifying stories, erased barriers, or feedback that is described as positive when it was mixed.',
      'Rights-based reporting does not weaken the report. It makes the report more credible by showing what changed, what did not, what evidence is limited, and what action follows.',
      'If a report request asks for names, photos, direct quotes, raw logs, or a stronger success claim than the evidence supports, offer a safer alternative.',
    ],
    revealTitle: 'Safer reporting checks',
    revealItems: [
      ['Do not overclaim reach', 'Avoid saying everyone was reached if some groups faced barriers or were not represented in the evidence.'],
      ['Report feedback honestly', 'Do not flatten mixed or critical feedback into a positive story. Show themes and response actions.'],
      ['Protect identity and dignity', 'Avoid names, faces, exact locations, rare details, and story material that could identify or pressure people.'],
      ['Name limits and learning', 'Say what evidence can and cannot show, and what the team learned from the gaps.'],
      ['Connect evidence to adaptation', 'A strong report explains what changed in practice, what remains unresolved, and what will be accounted back.'],
      ['Report back to rights-holders too', 'Reporting upward to donors is not enough. Communities should hear what was heard, what changed, what did not, and what happens next.'],
    ],
    activityTitle: 'Repair the risky claims',
    activityPrompt: 'Choose the safer rights-based claim for each risky report sentence.',
    options: makeOptions(['Repair each claim using safe, truthful, evidence-based language.', 'Make the report sound successful even when evidence is thin.']),
    feedbackStrong: 'Strong report repair. The safer claims protect dignity, avoid overclaiming, name evidence limits, and show adaptation or account-back.',
    feedbackSupport: 'Some claims still need repair. Look for truthful language that avoids identifying people, unsupported reach claims, and erased limitations.',
    insight: ['Responsible reporting protects people and strengthens credibility. It tells the truth about progress, barriers, limits, adaptation, and account-back.'],
    cta: 'Continue to Screen 5.3',
    nextId: 'M5-R12',
  }),
  'M5-R12': baseConfig({
    id: 'M5-R12',
    title: 'Capstone: Evidence-to-Action Simulator',
    phase: 'Synthesis clinic · Full HRBA MEAL cycle',
    lead: 'Work through a guided seven-step simulator that turns fictional evidence into safer action, truthful reporting, and community account-back.',
    visualSrc: module5CapstoneSimulatorSrc,
    visualAlt: 'Capstone evidence-to-action simulator board with steps for report numbers, who was missed, feedback themes, safe data choice, adaptation decision, and account-back.',
    block: 'Evidence-to-Action Simulator',
    storyTitle: 'One fictional review, seven decisions',
    story: [
      'A fictional project report shows outputs, attendance, feedback themes, and access-barrier notes. The team has to decide what the evidence shows, who may be missing, what is unsafe to share, what action should change, and how to report back.',
      'The simulator uses only generic examples. Do not add real names, exact locations, complaint details, survivor information, child data, diagnoses, officials, organizations, or confidential documents.',
      'The next screen turns this simulator into your structured HRBA MEAL repair note, so keep one weak indicator, one evidence gap, one safe-data choice, one adaptation, one reporting repair, and one account-back action in mind.',
    ],
    revealTitle: 'Simulator stages',
    revealItems: [
      ['Read outputs, but ask what they hide', 'Start with outputs and reach, then ask what is still missing.'],
      ['Identify who may be missing', 'Look for barriers and groups whose experience is hidden by aggregate numbers.'],
      ['Choose the safest evidence use', 'Remove identifying, sensitive, rare, or unnecessary details.'],
      ['Use feedback for response, referral, adaptation, and account-back', 'Review, respond, refer, adapt, and explain back.'],
      ['Choose responsible action based on the signal', 'Change timing, access, communication, referral information, or responsible actor engagement based on the signal.'],
      ['Repair the report claim', 'Use truthful language with limits, safe evidence, and no overclaiming.'],
      ['Account back safely', 'Explain what was heard, what changed, what is not solved, and next steps.'],
    ],
    activityTitle: 'Complete the simulator',
    activityPrompt: 'Choose the safest action for each step in the fictional evidence-to-action pathway.',
    options: makeOptions(['Turn safe evidence into adaptation, truthful reporting, and account-back.', 'Use the strongest story and skip account-back.']),
    feedbackStrong: 'Strong capstone pathway. You moved from evidence to safe action, truthful reporting, and account-back without collecting sensitive free text.',
    feedbackSupport: 'Review the pathway. Each step should protect people, avoid overclaiming, use feedback responsibly, adapt where needed, and account back.',
    insight: ['The capstone brings the Module 5 practice together: evidence is useful when it is safe, interpreted with rights-holders, acted on, reported truthfully, and explained back.'],
    cta: 'Continue to Screen 5.3',
    nextId: 'M5-R13',
  }),
  'M5-R13': baseConfig({
    id: 'M5-R13',
    title: 'My HRBA MEAL, Accountability, and Learning Repair Note',
    lead: 'Create a safe, structured repair note from choices only: one practical improvement, one honest limit, and one account-back action.',
    visualSrc: module5RepairNoteWorksheetSrc,
    visualAlt: 'Structured HRBA MEAL repair note worksheet with sections for practice improvement, rights-based question, who may be missed, safe data choice, feedback repair, adaptation trigger, account-back action, and 90-day next step.',
    block: 'Structured Repair Note',
    storyTitle: 'A repair note should be useful without collecting sensitive details',
    story: [
      'After the capstone, the learner chooses one realistic repair that a local CSO team could test safely. The note should guide practice, not collect private stories or complaint details.',
      'The repair note uses structured choices only. It connects evidence to inclusion, safe data, feedback, adaptation, responsible reporting, and account-back.',
    ],
    revealTitle: 'Safe repair note checks',
    revealItems: [
      ['Choose one focused repair', 'A practical note improves one weak MEAL, feedback, reporting, or account-back practice instead of promising a full system redesign.'],
      ['Use safe evidence', 'Use themes, aggregate patterns, and non-identifying barriers. Do not add names, exact locations, complaint details, diagnoses, or confidential records.'],
      ['Name who should be involved safely', 'Involve the right colleagues and rights-holders through safe, accessible, and non-coercive methods.'],
      ['State limits honestly', 'A strong note says what is not known, what cannot be promised yet, and what risk must be managed.'],
      ['Close with account-back', 'The repair should end with how the team will explain what was heard, what changed, what did not, and next steps.'],
    ],
    activityTitle: 'Build a safe repair note',
    activityPrompt: 'Choose one structured option for each part of the repair note.',
    options: makeOptions(['Generate a safe repair note from structured choices.', 'Write sensitive examples into a free-text reflection.']),
    feedbackStrong: 'The repair note is useful because it is practical, safe, honest about limits, and connected to account-back.',
    feedbackSupport: 'Complete each structured choice so the repair note is practical, safe, honest, and accountable.',
    insight: ['A good repair note helps a team improve one or two realistic practices without collecting sensitive details or overpromising change.'],
    cta: 'Continue to Screen 5.3',
    nextId: 'M5-R14',
  }),
  'M5-R14': baseConfig({
    id: 'M5-R14',
    title: '90-Day Practice Bridge and Account-Back Commitment',
    lead: 'Turn the repair note into a realistic 30/60/90-day practice bridge and finish Module 5 with an account-back commitment.',
    visualSrc: module5ActionJourneySrc,
    visualAlt: '90-day action journey visual showing start small, choose one repair by 30 days, test with team by 60 days, review and account back by 90 days, and keep improving HRBA MEAL practice.',
    block: '90-Day Practice Bridge',
    storyTitle: 'From course learning to team practice',
    story: [
      'The final screen turns the repair note into a short 90-day practice bridge. It asks the learner to choose one safe review action, one repair to test, and one account-back step.',
      'The goal is not perfect data. The goal is to use evidence safely, learn with rights-holders, adapt practice, engage responsible actors where needed, and report truthfully.',
    ],
    revealTitle: '30/60/90-day bridge',
    revealItems: [
      ['First 30 days: review safely', 'Review indicators, feedback themes, evidence gaps, missing groups, sensitive details, and safe roles or pathways.'],
      ['By 60 days: test one repair', 'Repair one indicator, feedback step, access barrier, communication approach, referral pathway, or responsible actor engagement.'],
      ['By 90 days: report and account back', 'Report what is known and not known, explain adaptations and limits, account back to communities, and document learning for the next cycle.'],
    ],
    activityTitle: 'Choose the practice bridge',
    activityPrompt: 'Select at least one safe action for each stage of the 90-day bridge.',
    options: makeOptions(['Choose one realistic action for 30, 60, and 90 days.', 'Collect more personal data before acting.']),
    feedbackStrong: 'You have completed Module 5 by moving from evidence to safer action, truthful reporting, adaptation, and account-back.',
    feedbackSupport: 'Choose at least one action for each stage so the bridge is realistic, safe, and accountable.',
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
    strong: 'Number of meeting changes made after participants raised access, safety, timing, or priority concerns.',
    reveal: 'participation',
    counts: 'Attendance: people present in meetings.',
    why: 'whether participation influenced decisions, not only whether people attended',
    trigger: 'Change facilitation, meeting design, follow-up actions, or decision records.',
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

const safeEvidenceOptions = [
  { id: 'collect', label: 'Collect safely', summary: 'Collect only useful, non-identifying evidence.' },
  { id: 'aggregate', label: 'Aggregate', summary: 'Combine categories to show patterns instead of people.' },
  { id: 'anonymize', label: 'Anonymize', summary: 'Remove or mask identifying details.' },
  { id: 'suppress', label: 'Suppress', summary: 'Hide details when small cells could identify someone.' },
  { id: 'do-not-collect', label: 'Do not collect', summary: 'Avoid collecting data that is not necessary or safe.' },
  { id: 'refer', label: 'Refer through safe pathway', summary: 'Handle sensitive concerns through agreed protection or safeguarding pathways.' },
];

const safeEvidenceItems = [
  {
    id: 'broad-attendance',
    text: 'Attendance by broad age group and gender for a large training group.',
    answers: ['collect', 'aggregate'],
    explanation: 'Broad, non-identifying categories can be useful for inclusion monitoring when the group is large enough.',
  },
  {
    id: 'small-cell',
    text: 'A table showing two women with disabilities from one small village and their exact access concern.',
    answers: ['aggregate', 'suppress', 'anonymize'],
    explanation: 'This is small-cell information. Combine categories, suppress detail, or anonymize so people cannot be identified.',
  },
  {
    id: 'children-names',
    text: 'A donor asks for the names of children with disabilities who missed school support activities.',
    answers: ['do-not-collect'],
    explanation: 'Do not collect or share names. Use safe aggregate access-barrier evidence if a decision requires it.',
  },
  {
    id: 'caregiver-theme',
    text: 'Participants report that meeting times exclude caregivers and market-day workers.',
    answers: ['collect'],
    explanation: 'Collect safely as a theme and use it to adapt timing. Names and exact locations are not needed.',
  },
  {
    id: 'protection-concern',
    text: 'One person reports a sensitive protection concern through a feedback channel.',
    answers: ['refer'],
    explanation: 'Handle through the agreed safe pathway. Do not publish details or investigate without mandate and training.',
  },
  {
    id: 'accessibility-indicator',
    text: 'A disability inclusion indicator asks whether the venue, communication, and support arrangements were accessible.',
    answers: ['collect'],
    explanation: 'This can be collected safely when it is non-identifying, useful, and focused on barriers and adjustments.',
  },
];

const feedbackLoopChoices = [
  { id: 'accessible', label: 'Accessible channels', body: 'Offer channels different groups can use safely.', correct: true },
  { id: 'safe-recording', label: 'Safe recording', body: 'Record only minimum necessary information and protect identity.', correct: true },
  { id: 'responsible-review', label: 'Review by responsible role', body: 'Route feedback to the right role or mechanism.', correct: true },
  { id: 'response-referral', label: 'Response or referral', body: 'Respond, refer, or escalate through an agreed safe pathway.', correct: true },
  { id: 'adaptation', label: 'Adaptation decision', body: 'Use feedback themes to improve timing, access, communication, targeting, or quality.', correct: true },
  { id: 'account-back', label: 'Account-back to community', body: 'Explain what was heard, what changed, what was not solved, and next steps.', correct: true },
  { id: 'more-names', label: 'Collect more names so follow-up is easier.', body: 'This can create identification and safety risk.', correct: false },
  { id: 'publish-examples', label: 'Publish complaint examples to prove transparency.', body: 'Complaint details can expose people and should not be used as proof material.', correct: false },
  { id: 'count-only', label: 'Only report the number of complaints received.', body: 'Counting feedback does not show response, referral, adaptation, or account-back.', correct: false },
  { id: 'staff-investigate', label: 'Ask facilitators to investigate all sensitive complaints themselves.', body: 'Sensitive concerns require agreed safe pathways, mandate, and training.', correct: false },
];

const storyResponseItems = [
  {
    id: 'names-photos',
    request: 'Please send names and photos of the most vulnerable participants for the report.',
    answer: 'decline-identifying',
    explanation: 'Decline names and faces. Offer consent-based, non-identifying themes or visuals instead.',
  },
  {
    id: 'negative-quote',
    request: 'Add a direct quote from a person who gave negative feedback so the report feels real.',
    answer: 'anonymized-theme',
    explanation: 'Use an anonymized feedback theme and explain response or adaptation. Do not expose the person.',
  },
  {
    id: 'raw-log',
    request: 'Send the raw feedback log so we can see all complaints.',
    answer: 'summary-review',
    explanation: 'Do not share raw logs. Provide a reviewed aggregate summary with sensitive details removed.',
  },
  {
    id: 'strong-story',
    request: 'Give one strong story showing the project changed someone’s life.',
    answer: 'truthful-consent',
    explanation: 'Use consent-based, non-identifying evidence, explain limits honestly, and avoid overclaiming.',
  },
  {
    id: 'adaptation-evidence',
    request: 'Include evidence that barriers were found and activities were adapted.',
    answer: 'safe-adaptation',
    explanation: 'Share safe barrier themes, adaptation decisions, and account-back actions without identifying people.',
  },
];

const storyResponseOptions = [
  { id: 'decline-identifying', label: 'Decline identifying details', summary: 'Decline names and faces; offer non-identifying themes or visuals.' },
  { id: 'anonymized-theme', label: 'Use anonymized theme', summary: 'Use an anonymized feedback theme and describe the response or adaptation.' },
  { id: 'summary-review', label: 'Share reviewed summary', summary: 'Provide a reviewed aggregate summary, not raw complaint data.' },
  { id: 'truthful-consent', label: 'Use consent-based evidence', summary: 'Use consent-based, non-identifying evidence and explain limits honestly.' },
  { id: 'safe-adaptation', label: 'Report safe adaptation evidence', summary: 'Report safe barrier themes, adaptations, and account-back actions.' },
  { id: 'blur-keep-details', label: 'Blur faces only', summary: 'Weak choice: blurred faces still leave names and village details exposed.' },
  { id: 'support-means-consent', label: 'Assume support means consent', summary: 'Weak choice: receiving support is not consent to be profiled.' },
  { id: 'private-raw-log', label: 'Send raw log privately', summary: 'Weak choice: raw complaint data should not be sent without review.' },
  { id: 'rare-details', label: 'Keep rare details', summary: 'Weak choice: exact role, location, and rare details can still identify someone.' },
  { id: 'invent-story', label: 'Invent stronger story', summary: 'Unsafe choice: do not fabricate evidence.' },
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
    why: 'A complaint box or meeting is not accountability unless something safe and visible happens after feedback is received.',
    carry: 'Carry forward: later, your repair note should name one practical feedback-loop repair, not a real complaint or identifying detail.',
  },
  'M5-R08': {
    why: 'A strong report can protect people and still tell the truth through safe themes, adaptation evidence, and honest limits.',
    carry: 'Carry forward: your repair note should show how to report safely, truthfully, and without exposing people.',
  },
  'M5-R09': {
    why: 'Numbers and feedback themes do not explain themselves. A safe review with rights-holders can help the team understand what the evidence means, who may still be missing, what barriers remain, and what action should follow.',
    carry: 'Carry forward: your repair note should include one safe way to interpret evidence with rights-holders without exposing people.',
  },
  'M5-R10': {
    why: 'An HRBA MEAL signal should lead to a responsible next step. The answer is not always more data; sometimes it is adaptation, safe consultation, referral, responsible actor engagement, honest reporting, or account-back.',
    carry: 'Carry forward: your repair note should show one evidence signal and the safest next action it requires.',
  },
  'M5-R11': {
    why: 'Rights-based reporting is stronger because it tells the truth about who was reached, who may be missing, what changed, what did not change, what evidence can show, and what the team will do next.',
    carry: 'Carry forward: your repair note should include one truthful reporting repair that protects people, avoids overclaiming, and names what happens next.',
  },
  'M5-R12': {
    why: 'A strong HRBA MEAL cycle protects people, learns from evidence, changes practice when needed, and explains back what happened.',
    carry: 'Carry forward: on the next screen, you will turn this cycle into one practical repair note for your own CSO practice.',
  },
};

const participatoryReviewChoices = [
  { id: 'safe-themes', label: 'Prepare safe themes, not raw data', body: 'Use non-identifying evidence themes, patterns, and access barriers.', correct: true },
  { id: 'missing-barriers', label: 'Ask who may still be missing', body: 'Look for groups, barriers, and voices hidden by attendance numbers.', correct: true },
  { id: 'inclusive-space', label: 'Use accessible ways for less powerful voices', body: 'Use accessible formats and safer spaces for less powerful groups to contribute.', correct: true },
  { id: 'separate-complaints', label: 'Separate sensitive complaints from public discussion', body: 'Route sensitive concerns through agreed safe pathways instead of discussing details publicly.', correct: true },
  { id: 'next-steps', label: 'Agree action, limits, referral, adaptation, and account-back', body: 'Document themes, adaptations, referral actions, limits, and account-back messages.', correct: true },
  { id: 'raw-complaints', label: 'Share raw complaint details so the group can judge', body: 'Unsafe: complaint details can identify people or create retaliation risk.', correct: false },
  { id: 'one-meeting', label: 'Use one public meeting as proof of full participation', body: 'Weak: public attendance does not show influence, safety, or inclusion.', correct: false },
  { id: 'collect-names', label: 'Ask who gave negative feedback', body: 'Unsafe: interpretation usually needs themes, not identifiable personal records.', correct: false },
  { id: 'untrained-investigation', label: 'Let untrained staff investigate all sensitive concerns', body: 'Unsafe: sensitive concerns require agreed pathways, mandate, and trained roles.', correct: false },
];

const signalActionOptions = [
  { id: 'continue-monitor', label: 'Continue and monitor', summary: 'Keep the approach while continuing to listen for barriers or unintended harm.' },
  { id: 'adapt-access', label: 'Adapt access or delivery', summary: 'Change timing, venue, communication, format, support, or outreach to remove a barrier.' },
  { id: 'consult-safely', label: 'Consult safely', summary: 'Ask affected groups about the pattern using safe, non-identifying methods.' },
  { id: 'refer-safe-pathway', label: 'Refer through safe pathway', summary: 'Use the agreed protection, safeguarding, or complaint pathway instead of informal investigation.' },
  { id: 'engage-responsible-actor', label: 'Engage responsible actor', summary: 'Share safe evidence with the actor responsible to remove the barrier or improve response.' },
  { id: 'pause-public-claim', label: 'Pause or narrow public claim', summary: 'Do not report a broad claim until evidence is safer and strong enough.' },
  { id: 'account-back', label: 'Account back', summary: 'Explain what was heard, what changed, what remains unresolved, and next steps.' },
];

const signalDecisionItems = [
  {
    id: 'timing-barrier',
    signal: 'Attendance is high, but women with care responsibilities are rarely present.',
    answers: ['adapt-access', 'consult-safely'],
    explanation: 'This is an access signal. Adapt timing, venue, childcare or support arrangements, outreach, or consult safely on what would work better.',
  },
  {
    id: 'sensitive-concern',
    signal: 'A small group reports a sensitive protection concern through the feedback channel.',
    answers: ['refer-safe-pathway'],
    explanation: 'Sensitive concerns require a safe referral or safeguarding pathway, not informal staff investigation.',
  },
  {
    id: 'low-trust',
    signal: 'People say they do not know what happened after they gave feedback.',
    answers: ['account-back'],
    explanation: 'Trust requires account-back: explain what was heard, what changed, what remains unresolved, and what happens next.',
  },
  {
    id: 'disability-access',
    signal: 'The team cannot explain why persons with disabilities are underrepresented.',
    answers: ['consult-safely', 'adapt-access'],
    explanation: 'Consult safely and review access barriers before adding more personal detail or making assumptions.',
  },
  {
    id: 'external-barrier',
    signal: 'The barrier is linked to a public service or responsible institution outside the CSO mandate.',
    answers: ['engage-responsible-actor'],
    explanation: 'Use safe, non-identifying evidence to engage responsible actors while explaining what the CSO can and cannot do.',
  },
  {
    id: 'thin-evidence',
    signal: 'The report claim says the project changed community attitudes, but evidence only shows attendance.',
    answers: ['pause-public-claim'],
    explanation: 'Do not overclaim. Narrow or repair the claim so it matches what the evidence can actually show.',
  },
];

const reportRepairOptions = [
  { id: 'barriers-remained', label: 'Reached some groups; barriers need follow-up', summary: 'Truthful reach claim that names timing, access, or communication barriers without identifying people.' },
  { id: 'feedback-access-concerns', label: 'Feedback reviewed; response and referral continue', summary: 'Uses feedback themes as evidence and names response, referral, follow-up, and account-back.' },
  { id: 'consent-anonymized-story', label: 'Consent-based non-identifying example', summary: 'Protects identity while using evidence respectfully.' },
  { id: 'limits-and-next-steps', label: 'Progress with unresolved gaps and next safe review', summary: 'Reports what is known, what is uncertain, and what the team will do next.' },
  { id: 'cso-mandate-action', label: 'CSO adapted and shared safe evidence', summary: 'Shows what the CSO changed and where responsible actors need safe evidence.' },
  { id: 'reached-everyone', label: 'Project reached everyone', summary: 'Risky: overclaims reach when evidence is incomplete.' },
  { id: 'all-positive', label: 'All feedback was positive', summary: 'Risky: erases concerns and mixed feedback.' },
  { id: 'named-photo-proof', label: 'Name and photo prove success', summary: 'Risky: exposes identity and turns people into proof material.' },
  { id: 'activities-completed', label: 'Activities completed', summary: 'Incomplete: counts outputs without explaining inclusion, change, or accountability.' },
  { id: 'cso-solved-gap', label: 'CSO solved the service gap', summary: 'Risky: overclaims what the CSO can control when action also sits with responsible actors.' },
];

const reportRepairItems = [
  {
    id: 'full-participation',
    risky: 'All women and persons with disabilities fully participated.',
    answer: 'barriers-remained',
    explanation: 'If some groups were missed or evidence is incomplete, report the barrier honestly instead of claiming full participation.',
  },
  {
    id: 'complaint-box',
    risky: 'The complaint box proves communities are satisfied.',
    answer: 'feedback-access-concerns',
    explanation: 'A feedback mechanism is not proof of satisfaction. Report reviewed themes, response, referral, follow-up, and account-back.',
  },
  {
    id: 'named-participant',
    risky: 'A named participant said the project changed her life.',
    answer: 'consent-anonymized-story',
    explanation: 'Use consent-based, non-identifying evidence and avoid details that could expose people.',
  },
  {
    id: 'no-barriers',
    risky: 'No barriers remain.',
    answer: 'limits-and-next-steps',
    explanation: 'If the evidence did not reach some groups, say what is known, what is not known, and how the team will check safely.',
  },
  {
    id: 'service-gap',
    risky: 'The CSO solved the service gap.',
    answer: 'cso-mandate-action',
    explanation: 'Report what the CSO adapted and where safe evidence was shared with responsible actors for action beyond the CSO mandate.',
  },
];

const capstoneSteps = [
  {
    id: 'shows',
    title: '1. Read outputs, but ask what they hide',
    prompt: 'Outputs and attendance are strong, but participation evidence is uneven.',
    answer: 'outputs-plus-gaps',
    options: [
      { id: 'outputs-plus-gaps', label: 'Outputs are useful, but gaps remain', summary: 'Start with outputs and reach, then ask what is missing.' },
      { id: 'outputs-only', label: 'Outputs prove full success', summary: 'Weak: outputs do not prove inclusion, safety, or change.' },
      { id: 'ignore-numbers', label: 'Ignore the numbers entirely', summary: 'Weak: numbers are useful when interpreted with other evidence.' },
    ],
    explanation: 'HRBA MEAL keeps the numbers but asks what they do not show.',
  },
  {
    id: 'missing',
    title: '2. Identify who may be missing',
    prompt: 'Attendance is lower among caregivers, people facing access barriers, and people who work on market days.',
    answer: 'barriers-groups',
    options: [
      { id: 'barriers-groups', label: 'Identify groups and access barriers', summary: 'Use broad, non-identifying barriers to guide adaptation.' },
      { id: 'individual-list', label: 'Make a list of names', summary: 'Unsafe: names are usually unnecessary and can create risk.' },
      { id: 'ignore-small-numbers', label: 'Ignore the smaller groups', summary: 'Weak: smaller groups may reveal exclusion.' },
    ],
    explanation: 'Look for barriers and missing voices without collecting unnecessary personal data.',
  },
  {
    id: 'unsafe',
    title: '3. Choose the safest evidence use',
    prompt: 'The team has quotes, exact locations, photos, and one sensitive complaint detail.',
    answer: 'remove-identifiers',
    options: [
      { id: 'remove-identifiers', label: 'Remove identifiers and sensitive details', summary: 'Use anonymized themes, aggregate patterns, and safe referral notes.' },
      { id: 'share-privately', label: 'Share privately with the donor', summary: 'Unsafe: private sharing can still expose people.' },
      { id: 'ask-community-to-judge', label: 'Discuss details in a public meeting', summary: 'Unsafe: complaint details should not be public review material.' },
    ],
    explanation: 'Safe evidence protects dignity and uses minimum necessary detail.',
  },
  {
    id: 'feedback',
    title: '4. Use feedback for response, referral, adaptation, and account-back',
    prompt: 'Feedback themes include timing barriers, access concerns, and one sensitive protection concern.',
    answer: 'review-respond-refer',
    options: [
      { id: 'review-respond-refer', label: 'Review, respond, refer, and account back', summary: 'Use themes for adaptation and refer sensitive concerns safely.' },
      { id: 'count-complaints', label: 'Only count how many comments arrived', summary: 'Weak: counting feedback does not close the loop.' },
      { id: 'staff-investigate', label: 'Ask facilitators to investigate everything', summary: 'Unsafe: sensitive issues require mandate, training, and safe pathways.' },
    ],
    explanation: 'Feedback becomes accountability evidence only when it is safely reviewed and acted on.',
  },
  {
    id: 'adapt',
    title: '5. Choose responsible action based on the signal',
    prompt: 'The evidence points to timing, access, communication, and referral-information barriers.',
    answer: 'adapt-practice',
    options: [
      { id: 'adapt-practice', label: 'Adapt timing, access, communication, and referral information', summary: 'Choose practical changes connected to the evidence.' },
      { id: 'wait-report', label: 'Wait until the next donor report', summary: 'Weak: learning evidence should guide action during implementation.' },
      { id: 'collect-more-detail', label: 'Collect more personal detail first', summary: 'Unsafe: adaptation can often use broad themes.' },
    ],
    explanation: 'Evidence should guide realistic adaptation and responsible actor engagement.',
  },
  {
    id: 'report',
    title: '6. Repair the report claim',
    prompt: 'Draft claim: The project reached everyone and feedback was positive.',
    answer: 'truthful-limits',
    options: [
      { id: 'truthful-limits', label: 'Report progress, barriers, limits, and adaptation', summary: 'Tell the truth without identifying people or overclaiming.' },
      { id: 'keep-success', label: 'Keep the success claim unchanged', summary: 'Weak: unsupported claims reduce credibility and accountability.' },
      { id: 'add-photo', label: 'Add a strong photo to prove impact', summary: 'Unsafe: photos can expose people and do not prove change.' },
    ],
    explanation: 'Responsible reporting is evidence-based, modest, safe, and honest about limits.',
  },
  {
    id: 'account-back',
    title: '7. Account back safely',
    prompt: 'The team has agreed adaptations and knows some concerns remain unresolved.',
    answer: 'heard-changed-next',
    options: [
      { id: 'heard-changed-next', label: 'What was heard, what changed, what is unresolved, and next steps', summary: 'Close the loop with a safe account-back message.' },
      { id: 'donor-only', label: 'Only report upward to the donor', summary: 'Weak: accountability also runs back to rights-holders.' },
      { id: 'full-complaint-detail', label: 'Share full complaint details for transparency', summary: 'Unsafe: transparency does not mean exposing sensitive details.' },
    ],
    explanation: 'Account-back builds trust when it is honest, safe, and specific about action and limits.',
  },
];

const repairNoteSteps = [
  {
    id: 'area',
    title: '1. MEAL area to repair',
    prompt: 'Choose the practice area that most needs a realistic improvement.',
    options: [
      { id: 'weak-indicator', label: 'Weak indicator', summary: 'Repair an activity count so it can show access, safety, response, or change.' },
      { id: 'unsafe-data', label: 'Unsafe data detail', summary: 'Reduce identifying or sensitive data and use safer aggregate evidence.' },
      { id: 'missing-group', label: 'Missing group or access barrier', summary: 'Look for who may be missed and what barrier needs practical adjustment.' },
      { id: 'weak-feedback', label: 'Weak feedback loop', summary: 'Improve how feedback is received, reviewed, answered, referred, and reported back.' },
      { id: 'no-adaptation', label: 'No adaptation from evidence', summary: 'Use monitoring evidence to change timing, venue, communication, outreach, or referral information.' },
      { id: 'overclaimed-report', label: 'Overclaimed report', summary: 'Repair reporting language so it is truthful about limits, barriers, and evidence strength.' },
      { id: 'unclear-account-back', label: 'Unclear account-back', summary: 'Clarify how rights-holders will hear what was learned, changed, not solved, and next.' },
    ],
  },
  {
    id: 'gap',
    title: '2. Evidence gap or safety risk',
    prompt: 'Choose the gap or risk the team noticed.',
    options: [
      { id: 'who-missed', label: 'The evidence does not show who was missed', summary: 'The team needs safe barrier themes, not names.' },
      { id: 'raw-detail', label: 'The evidence includes too much raw detail', summary: 'The team should remove identifiers and use minimum necessary information.' },
      { id: 'feedback-unanswered', label: 'Feedback was collected but not answered', summary: 'The team needs response, referral, adaptation, and account-back steps.' },
      { id: 'claim-too-broad', label: 'The report claim is broader than the evidence', summary: 'The team should name limits and avoid saying everyone benefited.' },
      { id: 'no-change-link', label: 'The report does not show what changed', summary: 'The team needs evidence of access, response, adaptation, or learning.' },
    ],
  },
  {
    id: 'repair',
    title: '3. Practical repair action',
    prompt: 'Choose one repair action the team could test safely.',
    options: [
      { id: 'repair-indicator', label: 'Improve one indicator', summary: 'Revise it to show access, safety, response, influence, or change.' },
      { id: 'aggregate-evidence', label: 'Use safe aggregate evidence', summary: 'Replace names, raw logs, or rare details with safe patterns and themes.' },
      { id: 'consult-safely', label: 'Consult safely with groups who may be missing', summary: 'Use accessible, non-coercive, non-identifying methods.' },
      { id: 'route-concerns', label: 'Route sensitive concerns through agreed pathways', summary: 'Do not investigate sensitive complaints informally.' },
      { id: 'adapt-delivery', label: 'Adapt timing, communication, venue, outreach, or referral information', summary: 'Connect the change to the evidence signal.' },
      { id: 'repair-report', label: 'Report limits honestly', summary: 'Say what is known, what is not known, and what action follows.' },
      { id: 'account-back', label: 'Account back on what changed and what did not', summary: 'Close the loop with rights-holders using safe, clear messages.' },
    ],
  },
  {
    id: 'involve',
    title: '4. Who should be involved safely',
    prompt: 'Choose the safest involvement pattern.',
    options: [
      { id: 'meal-focal-team', label: 'MEAL focal point and implementation team', summary: 'Use internal roles to review indicators, feedback themes, and adaptation decisions.' },
      { id: 'community-reps', label: 'Rights-holder representatives through safe channels', summary: 'Invite participation through accessible, non-identifying, and voluntary methods.' },
      { id: 'feedback-role', label: 'Responsible feedback or safeguarding role', summary: 'Use trained roles and agreed pathways for sensitive concerns.' },
      { id: 'responsible-actors', label: 'Relevant responsible actors with safe evidence only', summary: 'Engage duty-bearers or service actors without exposing people.' },
    ],
  },
  {
    id: 'limit',
    title: '5. Limit or risk to state honestly',
    prompt: 'Choose the limitation the note should name.',
    options: [
      { id: 'not-everyone-heard', label: 'Not everyone has been heard yet', summary: 'Avoid claiming full participation until missing voices are checked safely.' },
      { id: 'small-cell-risk', label: 'Some detail could identify people or small groups', summary: 'Use aggregation, anonymization, or suppression where needed.' },
      { id: 'feedback-not-fully-resolved', label: 'Some feedback is not fully resolved', summary: 'Explain what was referred, pending, outside mandate, or still being addressed.' },
      { id: 'change-not-proven', label: 'Change is not fully proven yet', summary: 'Report the evidence available and what will be checked next.' },
    ],
  },
  {
    id: 'accountBack',
    title: '6. Account-back action',
    prompt: 'Choose how the team will account back.',
    options: [
      { id: 'share-themes-actions', label: 'Share safe themes, actions, limits, and next steps', summary: 'Tell communities what was heard, what changed, what did not, and what happens next.' },
      { id: 'team-review-message', label: 'Prepare a clear account-back message with the team', summary: 'Use plain, safe language that does not identify people or complaints.' },
      { id: 'accessible-channel', label: 'Use an accessible channel for different groups', summary: 'Choose timing, language, format, and channel based on who may be missed.' },
      { id: 'follow-up-cycle', label: 'Document learning for the next MEAL cycle', summary: 'Carry unresolved limits and adaptations into the next review.' },
    ],
  },
];

const bridgeActionGroups = [
  {
    id: 'day30',
    title: 'First 30 days - Review safely',
    prompt: 'Choose at least one safe review action.',
    options: [
      { id: 'review-indicators', label: 'Review current indicators and evidence gaps', summary: 'Check whether indicators show inclusion, response, safety, and change.' },
      { id: 'identify-missing', label: 'Identify who may be missing', summary: 'Use broad barrier themes and avoid collecting names.' },
      { id: 'check-sensitive', label: 'Check for sensitive or identifying data', summary: 'Remove or aggregate details that could expose people.' },
      { id: 'agree-pathways', label: 'Agree safe roles and pathways', summary: 'Clarify who handles feedback, referrals, and safeguarding concerns.' },
    ],
  },
  {
    id: 'day60',
    title: 'By 60 days - Test one repair',
    prompt: 'Choose at least one repair to test.',
    options: [
      { id: 'repair-indicator', label: 'Repair one indicator', summary: 'Make it show access, safety, response, influence, or change.' },
      { id: 'improve-feedback', label: 'Improve one feedback/accountability step', summary: 'Strengthen review, response, referral, adaptation, or account-back.' },
      { id: 'adapt-access', label: 'Adapt timing, venue, communication, referral, or outreach', summary: 'Make a practical change based on evidence.' },
      { id: 'consult-safely', label: 'Consult safely with affected groups', summary: 'Use accessible, voluntary, non-identifying methods.' },
      { id: 'engage-actors', label: 'Engage responsible actors constructively', summary: 'Share safe evidence and ask for action where relevant.' },
    ],
  },
  {
    id: 'day90',
    title: 'By 90 days - Report and account back',
    prompt: 'Choose at least one account-back and reporting action.',
    options: [
      { id: 'report-limits', label: 'Report what is known and not known', summary: 'Avoid overclaiming and name evidence limits honestly.' },
      { id: 'explain-adaptations', label: 'Explain adaptations and unresolved limits', summary: 'Show what changed and what still needs follow-up.' },
      { id: 'account-back-community', label: 'Account back to communities', summary: 'Share what was heard, what changed, what did not, and next steps.' },
      { id: 'document-learning', label: 'Document learning for the next cycle', summary: 'Carry safe evidence and unresolved issues into the next MEAL review.' },
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
          <ProgressChip>See the problem</ProgressChip>
          <ScreenTitle
            id="m5-intro-video-title"
            lead="The report looks strong at first. This opening asks what the numbers do not show, and how evidence can support accountability and learning."
          >
            The Numbers Look Good, But Who Is Missing?
          </ScreenTitle>
          <article className="m5-video-note" aria-label="Module 5 focus">
            <span aria-hidden="true">MEAL</span>
            <p>
              Good numbers are useful, but incomplete on their own. HRBA MEAL asks who was
              missed, whether feedback was answered, whether evidence was safe, what changed,
              and what the CSO should account back.
            </p>
          </article>
          <article className="m5-video-note m5-video-note--bridge" aria-label="Concept bridge">
            <span aria-hidden="true">Lens</span>
            <div>
              <p>
                HRBA-informed MEAL uses evidence to ask what numbers show, what they hide,
                who was missed, what changed, and what must be explained back to rights-holders.
              </p>
              <p>
                Next, you will see what this module helps you practice and what you will build by the end.
              </p>
            </div>
          </article>
        </div>

        <section className="m5-video-card" aria-labelledby="m5-video-placeholder-label">
          <div className="m5-video-card__header">
            <p className="m5-card-kicker" id="m5-video-placeholder-label">Intro video</p>
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
                  alt="Illustrated Module 5 poster showing a project team reviewing numbers, feedback, access barriers, notes, and adaptation decisions."
                />
                <span aria-hidden="true">Video</span>
                <p>
                  Before reviewing numbers, ask whether the evidence shows inclusion, feedback, safety,
                  change, and adaptation for the people the project is meant to serve.
                </p>
              </div>
            )}
          </div>
          <figure className="m5-video-poster-fallback">
            <img
              src={module5IntroPosterSrc}
              alt="Illustrated Module 5 poster showing a project team reviewing numbers, feedback, access barriers, notes, and adaptation decisions."
            />
            <figcaption>
              Poster fallback: the same opening idea is available through this visual and the transcript below.
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
            Continue to Screen 5.2
          </PrimaryButton>
        </footer>
      </section>
    </main>
  );
}

function Module5LearningObjectivesScreen({ onChangeState }: Module5RendererProps) {
  const [flippedCards, setFlippedCards] = useState<string[]>([]);

  const toggleCard = (number: string) => {
    setFlippedCards((prev) =>
      prev.includes(number) ? prev.filter((item) => item !== number) : [...prev, number],
    );
  };

  return (
    <main className="m5-screen m5-objectives-screen" aria-labelledby="m5-objectives-title">
      <section className="m5-objectives-shell">
        <section className="m5-objectives-copy">
          <ModuleContextLabel>MODULE 5 · APPLYING HRBA IN MEAL</ModuleContextLabel>
          <div className="m5-objectives-title">
            <h1 id="m5-objectives-title">Learning Objectives</h1>
            <p>What you will be able to do</p>
          </div>
          <p className="m5-objectives-orientation">
            In this module, you will practice how to use MEAL to see whether rights-based practice is actually happening. Each objective connects to a practical evidence check: who benefited, who may be missing, what changed, what feedback shows, and how evidence can guide safer adaptation and reporting.
          </p>
          <article className="m5-objectives-lens" aria-label="Module 5 visual accent">
            <span aria-hidden="true">↗</span>
            <div>
              <h2>Evidence for learning</h2>
              <p>Use indicators, feedback, data, stories, and reports to support safer decisions and show what should change next.</p>
            </div>
          </article>
          <article className="m5-objectives-closing">
            <p>
              HRBA in MEAL means asking what the evidence really shows: who was reached, who was missed, what changed, what risks appeared, and what the CSO should learn or adjust, while using minimum necessary data and protecting privacy.
            </p>
          </article>
        </section>

        <section className="m5-objective-grid" aria-label="Module 5 learning objectives">
          {module5ObjectiveCards.map((objective) => (
            <button
              key={objective.number}
              type="button"
              className={`m5-objective-card m5-objective-card--${objective.accent} ${flippedCards.includes(objective.number) ? 'is-flipped' : ''}`}
              onClick={() => toggleCard(objective.number)}
              aria-pressed={flippedCards.includes(objective.number)}
              aria-label={`${objective.title}. ${flippedCards.includes(objective.number) ? 'Showing details. Activate to return to the headline.' : 'Activate to show details.'}`}
            >
              <div className="m5-objective-card__inner">
                <div className="m5-objective-card__face m5-objective-card__front">
                  <span>{objective.number}</span>
                  <h2>{objective.title}</h2>
                  <small>Click to reveal</small>
                </div>
                <div className="m5-objective-card__face m5-objective-card__back">
                  <span>{objective.number}</span>
                  <p>{objective.text}</p>
                  <small>Click to return</small>
                </div>
              </div>
            </button>
          ))}
        </section>

        <footer className="m5-objectives-actions">
          <PrimaryButton
            onClick={() =>
              completeSimpleScreen(
                'M5-S1-02',
                'M5-S1-03',
                module5Routes['M5-S1-03'],
                onChangeState,
                'module5LearningObjectives',
                { reviewed: true },
              )
            }
          >
            Continue
          </PrimaryButton>
        </footer>
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

function Module5EvidenceLadderScreen({ state, onChangeState }: Module5RendererProps) {
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
    <main className="m5-screen m5-screen--asset-visual m5-clinic-screen" aria-labelledby="M5-R05-title">
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
            <p>Review all five repair checks, then choose the stronger indicator and what it reveals.</p>
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
  const allRevealIds = config.revealItems.map((item) => item.id);
  const [openedIds, setOpenedIds] = useState<string[]>(completed ? allRevealIds : (stored.openedIds as string[]) || []);
  const [answers, setAnswers] = useState<Record<string, string>>((stored.answers as Record<string, string>) || {});
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const openReveal = (id: string) => {
    const next = openedIds.includes(id) ? openedIds : [...openedIds, id];
    setOpenedIds(next);
    onChangeState((prev) => ({ ...prev, practiceCheckState: updatePracticeState(prev, key, { openedIds: next, status: 'in_progress' }) }));
  };
  const choose = (id: string, value: string) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    setSubmitted(false);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R06');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { answers: next, submitted: false, status: 'in_progress' }) };
    });
  };
  const allAnswered = safeEvidenceItems.every((item) => answers[item.id]);
  const allReviewed = openedIds.length === allRevealIds.length;
  const correctCount = safeEvidenceItems.filter((item) => item.answers.includes(answers[item.id])).length;
  const canSubmit = allAnswered && allReviewed;
  const canContinue = completed || submitted;
  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R06');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { openedIds, answers, submitted: true, correctCount, status: 'completed' }) };
    });
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-clinic-screen" aria-labelledby="M5-R06-title">
      <Module5ClinicHero config={config} />
      <section className="m5-canvas m5-clinic-canvas" aria-labelledby="m5-r06-practice">
        <div className="m5-safety-warning">
          <strong>Use fictional or generalized examples only.</strong>
          <span>Do not enter real names, exact locations, complaint details, survivor information, disability diagnoses, or confidential data.</span>
        </div>
        <article className="m5-practice-point">
          <p className="m5-card-kicker">Safe evidence rule</p>
          <p>{clinicPracticeNotes['M5-R06'].why}</p>
        </article>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Safe data clinic</p>
            <h2 id="m5-r06-practice">Choose the safest useful decision</h2>
            <p>Review all five safety checks, then decide how to handle each fictional evidence example.</p>
          </div>
          <ProgressChip>{openedIds.length} of {allRevealIds.length} checks reviewed</ProgressChip>
        </div>
        <Module5ClinicRevealCards config={config} openedIds={openedIds} onOpen={openReveal} />
        <div className="m5-decision-grid">
          {safeEvidenceItems.map((item) => {
            const selected = answers[item.id] || '';
            const correct = submitted && item.answers.includes(selected);
            const incorrect = submitted && selected && !correct;
            return (
              <article key={item.id} className={`m5-classification-card ${correct ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`}>
                <label>
                  <span>{item.text}</span>
                  <select value={selected} onChange={(event) => choose(item.id, event.target.value)}>
                    <option value="">Choose a decision</option>
                    {safeEvidenceOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </label>
                {selected && (
                  <p className="m5-selected-summary">
                    <strong>Selected meaning:</strong> {getOptionSummary(safeEvidenceOptions, selected)}
                  </p>
                )}
                {submitted && (
                  <p className="m5-classification-feedback">
                    <strong>{correct ? 'Safe and useful.' : `Better decision: ${item.answers.map((answer) => safeEvidenceOptions.find((option) => option.id === answer)?.label).join(' or ')}.`}</strong>{' '}
                    {item.explanation}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        <footer className="m5-ladder-actions">
          <div>
            <h3>{submitted ? `${correctCount} of ${safeEvidenceItems.length} safe decisions matched` : 'Complete all safe-data decisions to continue'}</h3>
            <p>{submitted ? 'The reasoning is visible before you continue. Revise any choice that collected too much detail or suppressed a useful safe theme.' : 'Use minimum necessary, protected, explainable evidence.'}</p>
            <p className="m5-carry-forward-note">{clinicPracticeNotes['M5-R06'].carry}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check safe-data decisions' : 'Review all checks and decide each example'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R06', 'M5-R07', module5Routes['M5-R07'], onChangeState, key, { answers, correctCount, submitted: true })} disabled={!canContinue}>{config.ctaButton}</PrimaryButton>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Module5FeedbackLoopScreen({ state, onChangeState }: Module5RendererProps) {
  const config = module5Screens['M5-R07'];
  const key = practiceKey('M5-R07');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R07');
  const allRevealIds = config.revealItems.map((item) => item.id);
  const [openedIds, setOpenedIds] = useState<string[]>(completed ? allRevealIds : (stored.openedIds as string[]) || []);
  const [selectedIds, setSelectedIds] = useState<string[]>((stored.selectedIds as string[]) || []);
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const openReveal = (id: string) => {
    const next = openedIds.includes(id) ? openedIds : [...openedIds, id];
    setOpenedIds(next);
    onChangeState((prev) => ({ ...prev, practiceCheckState: updatePracticeState(prev, key, { openedIds: next, status: 'in_progress' }) }));
  };
  const toggle = (id: string) => {
    const next = selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id];
    setSelectedIds(next);
    setSubmitted(false);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R07');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { selectedIds: next, submitted: false, status: 'in_progress' }) };
    });
  };
  const correctIds = feedbackLoopChoices.filter((choice) => choice.correct).map((choice) => choice.id);
  const selectedCorrect = selectedIds.filter((id) => correctIds.includes(id)).length;
  const hasUnsafe = selectedIds.some((id) => !correctIds.includes(id));
  const strong = selectedCorrect === correctIds.length && !hasUnsafe;
  const partial = selectedCorrect > 0 && !strong;
  const canSubmit = openedIds.length === allRevealIds.length && selectedIds.length > 0;
  const canContinue = completed || submitted;
  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R07');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { openedIds, selectedIds, submitted: true, strong, status: 'completed' }) };
    });
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-clinic-screen" aria-labelledby="M5-R07-title">
      <Module5ClinicHero config={config} />
      <section className="m5-canvas m5-clinic-canvas" aria-labelledby="m5-r07-practice">
        <article className="m5-practice-point">
          <p className="m5-card-kicker">Accountability point</p>
          <p>{clinicPracticeNotes['M5-R07'].why}</p>
        </article>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Feedback loop repair</p>
            <h2 id="m5-r07-practice">Repair the weak pathway</h2>
            <p>Weak path: feedback box installed → complaints collected → report says feedback received.</p>
          </div>
          <ProgressChip>{openedIds.length} of {allRevealIds.length} loop checks reviewed</ProgressChip>
        </div>
        <Module5ClinicRevealCards config={config} openedIds={openedIds} onOpen={openReveal} />
        <div className="m5-choice-grid">
          {feedbackLoopChoices.map((choice) => {
            const selected = selectedIds.includes(choice.id);
            return (
              <label key={choice.id} className={`m5-choice-card ${selected ? 'is-selected' : ''}`}>
                <input type="checkbox" checked={selected} onChange={() => toggle(choice.id)} />
                <span className="m5-choice-card__mark" aria-hidden="true">{selected ? '✓' : '•'}</span>
                <span><strong>{choice.label}</strong><small>{choice.body}</small></span>
              </label>
            );
          })}
        </div>
        {submitted && (
          <article className={`m5-feedback-card ${strong ? 'is-strong' : 'is-support'}`} aria-live="polite">
            <p className="m5-card-kicker">{strong ? 'Strong feedback pathway' : partial ? 'Partial pathway' : 'Weak pathway'}</p>
            <h3>{strong ? 'Feedback became accountability evidence.' : 'The loop still needs repair.'}</h3>
            <p>{strong ? 'You included accessible channels, safe recording, responsible review, response or referral, adaptation, and account-back.' : 'Look for the full safe pathway. Avoid collecting more names, publishing complaint examples, counting only complaints, or asking untrained staff to investigate sensitive complaints.'}</p>
          </article>
        )}
        <footer className="m5-ladder-actions">
          <div>
            <h3>{submitted ? `${selectedCorrect} of ${correctIds.length} strong pathway steps selected` : 'Select the repaired pathway steps'}</h3>
            <p>Use respond, refer, escalate through agreed safe pathway, protect identity, and record only minimum necessary information.</p>
            <p className="m5-carry-forward-note">{clinicPracticeNotes['M5-R07'].carry}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check pathway' : 'Review all checks and select steps'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R07', 'M5-R08', module5Routes['M5-R08'], onChangeState, key, { selectedIds, strong, submitted: true })} disabled={!canContinue}>{config.ctaButton}</PrimaryButton>
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
  const allRevealIds = config.revealItems.map((item) => item.id);
  const [openedIds, setOpenedIds] = useState<string[]>(completed ? allRevealIds : (stored.openedIds as string[]) || []);
  const [answers, setAnswers] = useState<Record<string, string>>((stored.answers as Record<string, string>) || {});
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const openReveal = (id: string) => {
    const next = openedIds.includes(id) ? openedIds : [...openedIds, id];
    setOpenedIds(next);
    onChangeState((prev) => ({ ...prev, practiceCheckState: updatePracticeState(prev, key, { openedIds: next, status: 'in_progress' }) }));
  };
  const choose = (id: string, value: string) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    setSubmitted(false);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R08');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { answers: next, submitted: false, status: 'in_progress' }) };
    });
  };
  const allAnswered = storyResponseItems.every((item) => answers[item.id]);
  const correctCount = storyResponseItems.filter((item) => answers[item.id] === item.answer).length;
  const canSubmit = allAnswered && openedIds.length === allRevealIds.length;
  const canContinue = completed || submitted;
  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R08');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { openedIds, answers, submitted: true, correctCount, status: 'completed' }) };
    });
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-clinic-screen" aria-labelledby="M5-R08-title">
      <Module5ClinicHero config={config} />
      <section className="m5-canvas m5-clinic-canvas" aria-labelledby="m5-r08-practice">
        <div className="m5-safety-warning">
          <strong>Protect dignity and truth.</strong>
          <span>Do not use real names, faces, complaint details, child data, survivor information, raw logs, or rare identifying details.</span>
        </div>
        <article className="m5-practice-point">
          <p className="m5-card-kicker">Responsible reporting point</p>
          <p>{clinicPracticeNotes['M5-R08'].why}</p>
        </article>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Request inbox</p>
            <h2 id="m5-r08-practice">Choose safe responses</h2>
            <p>Review all six story checks, then choose a safer response to each fictional report request.</p>
          </div>
          <ProgressChip>{openedIds.length} of {allRevealIds.length} story checks reviewed</ProgressChip>
        </div>
        <Module5ClinicRevealCards config={config} openedIds={openedIds} onOpen={openReveal} />
        <div className="m5-decision-grid">
          {storyResponseItems.map((item) => {
            const selected = answers[item.id] || '';
            const correct = submitted && selected === item.answer;
            const incorrect = submitted && selected && !correct;
            const correctLabel = storyResponseOptions.find((option) => option.id === item.answer)?.label;
            return (
              <article key={item.id} className={`m5-classification-card ${correct ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`}>
                <label>
                  <span>{item.request}</span>
                  <select value={selected} onChange={(event) => choose(item.id, event.target.value)}>
                    <option value="">Choose a response</option>
                    {storyResponseOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </label>
                {selected && (
                  <p className="m5-selected-summary">
                    <strong>Selected meaning:</strong> {getOptionSummary(storyResponseOptions, selected)}
                  </p>
                )}
                {submitted && (
                  <p className="m5-classification-feedback">
                    <strong>{correct ? 'Safer response.' : `Better response: ${correctLabel}.`}</strong>{' '}
                    {item.explanation}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        <footer className="m5-ladder-actions">
          <div>
            <h3>{submitted ? `${correctCount} of ${storyResponseItems.length} safer responses selected` : 'Respond safely to every request'}</h3>
            <p>{submitted ? 'Useful evidence can still protect consent, refusal, identity, dignity, truth, and minimum necessary detail.' : 'Composite examples must be clearly labeled as composite and based on safe, non-identifying themes.'}</p>
            <p className="m5-carry-forward-note">{clinicPracticeNotes['M5-R08'].carry}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check responses' : 'Review all checks and answer each request'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R08', 'M5-R09', module5Routes['M5-R09'], onChangeState, key, { answers, correctCount, submitted: true })} disabled={!canContinue}>{config.ctaButton}</PrimaryButton>
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
  const allRevealIds = config.revealItems.map((item) => item.id);
  const [openedIds, setOpenedIds] = useState<string[]>(completed ? allRevealIds : (stored.openedIds as string[]) || []);
  const [selectedIds, setSelectedIds] = useState<string[]>((stored.selectedIds as string[]) || []);
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const openReveal = (id: string) => {
    const next = openedIds.includes(id) ? openedIds : [...openedIds, id];
    setOpenedIds(next);
    onChangeState((prev) => ({ ...prev, practiceCheckState: updatePracticeState(prev, key, { openedIds: next, status: 'in_progress' }) }));
  };
  const toggle = (id: string) => {
    const next = selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id];
    setSelectedIds(next);
    setSubmitted(false);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R09');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { selectedIds: next, submitted: false, status: 'in_progress' }) };
    });
  };

  const correctIds = participatoryReviewChoices.filter((choice) => choice.correct).map((choice) => choice.id);
  const selectedCorrect = selectedIds.filter((id) => correctIds.includes(id)).length;
  const hasUnsafe = selectedIds.some((id) => !correctIds.includes(id));
  const strong = selectedCorrect === correctIds.length && !hasUnsafe;
  const partial = selectedCorrect > 0 && !strong;
  const canSubmit = openedIds.length === allRevealIds.length && selectedIds.length > 0;
  const canContinue = completed || submitted;

  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R09');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { openedIds, selectedIds, submitted: true, strong, status: 'completed' }) };
    });
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-clinic-screen" aria-labelledby="M5-R09-title">
      <Module5ClinicHero config={config} />
      <section className="m5-canvas m5-clinic-canvas" aria-labelledby="m5-r10-practice">
        <div className="m5-safety-warning">
          <strong>Interpret themes, not identities.</strong>
          <span>Do not use names, exact locations, complaint details, photos, survivor information, child data, diagnoses, or raw feedback logs.</span>
        </div>
        <article className="m5-practice-point" aria-label="Why this decision matters">
          <p className="m5-card-kicker">Why this matters</p>
          <p>{practiceNote.why}</p>
        </article>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Participatory interpretation</p>
            <h2 id="m5-r10-practice">Build the safe review routine</h2>
            <p>Review all five checks, then select the steps that make interpretation safe, inclusive, and action-oriented.</p>
          </div>
          <ProgressChip>{openedIds.length} of {allRevealIds.length} checks reviewed</ProgressChip>
        </div>
        <Module5ClinicRevealCards config={config} openedIds={openedIds} onOpen={openReveal} />
        <div className="m5-choice-grid">
          {participatoryReviewChoices.map((choice) => {
            const selected = selectedIds.includes(choice.id);
            return (
              <label key={choice.id} className={`m5-choice-card ${selected ? 'is-selected' : ''}`}>
                <input type="checkbox" checked={selected} onChange={() => toggle(choice.id)} />
                <span className="m5-choice-card__mark" aria-hidden="true">{selected ? '✓' : '•'}</span>
                <span><strong>{choice.label}</strong><small>{choice.body}</small></span>
              </label>
            );
          })}
        </div>
        {submitted && (
          <article className={`m5-feedback-card ${strong ? 'is-strong' : 'is-support'}`} aria-live="polite">
            <p className="m5-card-kicker">{strong ? 'Safe interpretation routine' : partial ? 'Partial routine' : 'Routine needs repair'}</p>
            <h3>{strong ? 'The review protects people and still guides action.' : 'Some unsafe or incomplete steps remain.'}</h3>
            <p>{strong ? config.feedbackStrong : config.feedbackSupport}</p>
          </article>
        )}
        <footer className="m5-ladder-actions">
          <div>
            <h3>{submitted ? `${selectedCorrect} of ${correctIds.length} safe routine steps selected` : 'Select the safe routine steps'}</h3>
            <p>Keep community interpretation separate from complaint investigation and record themes, decisions, adaptations, referrals, limits, and account-back messages.</p>
            <p className="m5-carry-forward-note">{practiceNote.carry}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check review routine' : 'Review all checks and choose steps'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R09', 'M5-R10', module5Routes['M5-R10'], onChangeState, key, { selectedIds, strong, submitted: true })} disabled={!canContinue}>{config.ctaButton}</PrimaryButton>
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
  const allRevealIds = config.revealItems.map((item) => item.id);
  const [openedIds, setOpenedIds] = useState<string[]>(completed ? allRevealIds : (stored.openedIds as string[]) || []);
  const [answers, setAnswers] = useState<Record<string, string>>((stored.answers as Record<string, string>) || {});
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const openReveal = (id: string) => {
    const next = openedIds.includes(id) ? openedIds : [...openedIds, id];
    setOpenedIds(next);
    onChangeState((prev) => ({ ...prev, practiceCheckState: updatePracticeState(prev, key, { openedIds: next, status: 'in_progress' }) }));
  };
  const choose = (id: string, value: string) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    setSubmitted(false);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R10');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { answers: next, submitted: false, status: 'in_progress' }) };
    });
  };

  const allAnswered = signalDecisionItems.every((item) => answers[item.id]);
  const correctCount = signalDecisionItems.filter((item) => item.answers.includes(answers[item.id])).length;
  const canSubmit = openedIds.length === allRevealIds.length && allAnswered;
  const canContinue = completed || submitted;
  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R10');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { openedIds, answers, submitted: true, correctCount, status: 'completed' }) };
    });
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-clinic-screen" aria-labelledby="M5-R10-title">
      <Module5ClinicHero config={config} />
      <section className="m5-canvas m5-clinic-canvas" aria-labelledby="m5-r11-practice">
        <div className="m5-safety-warning">
          <strong>Do not default to more personal data.</strong>
          <span>Signals can require adaptation, safe consultation, referral, responsible actor engagement, account-back, or a narrower claim.</span>
        </div>
        <article className="m5-practice-point" aria-label="Why this decision matters">
          <p className="m5-card-kicker">Why this matters</p>
          <p>{practiceNote.why}</p>
        </article>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Evidence response tree</p>
            <h2 id="m5-r11-practice">Read each signal and choose a responsible action</h2>
            <p>Review all response options, then match each fictional signal to the safest action.</p>
          </div>
          <ProgressChip>{openedIds.length} of {allRevealIds.length} options reviewed</ProgressChip>
        </div>
        <Module5ClinicRevealCards config={config} openedIds={openedIds} onOpen={openReveal} />
        <div className="m5-decision-grid">
          {signalDecisionItems.map((item) => {
            const selected = answers[item.id] || '';
            const correct = submitted && item.answers.includes(selected);
            const incorrect = submitted && selected && !correct;
            const correctLabels = item.answers.map((answer) => signalActionOptions.find((option) => option.id === answer)?.label).join(' or ');
            return (
              <article key={item.id} className={`m5-classification-card ${correct ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`}>
                <label>
                  <span>{item.signal}</span>
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
                  <p className="m5-classification-feedback">
                    <strong>{correct ? 'Responsible action.' : `Better action: ${correctLabels}.`}</strong>{' '}
                    {item.explanation}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        <footer className="m5-ladder-actions">
          <div>
            <h3>{submitted ? `${correctCount} of ${signalDecisionItems.length} signals matched` : 'Choose an action for every signal'}</h3>
            <p>{submitted ? 'The feedback shows why each signal calls for a specific response.' : 'Avoid public accusations, untrained investigations, and unnecessary identifying details.'}</p>
            <p className="m5-carry-forward-note">{practiceNote.carry}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check signal decisions' : 'Review all options and answer each signal'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R10', 'M5-R11', module5Routes['M5-R11'], onChangeState, key, { answers, correctCount, submitted: true })} disabled={!canContinue}>{config.ctaButton}</PrimaryButton>
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
  const allRevealIds = config.revealItems.map((item) => item.id);
  const [openedIds, setOpenedIds] = useState<string[]>(completed ? allRevealIds : (stored.openedIds as string[]) || []);
  const [answers, setAnswers] = useState<Record<string, string>>((stored.answers as Record<string, string>) || {});
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const openReveal = (id: string) => {
    const next = openedIds.includes(id) ? openedIds : [...openedIds, id];
    setOpenedIds(next);
    onChangeState((prev) => ({ ...prev, practiceCheckState: updatePracticeState(prev, key, { openedIds: next, status: 'in_progress' }) }));
  };
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
  const canSubmit = openedIds.length === allRevealIds.length && allAnswered;
  const canContinue = completed || submitted;
  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R11');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { openedIds, answers, submitted: true, correctCount, status: 'completed' }) };
    });
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-clinic-screen" aria-labelledby="M5-R11-title">
      <Module5ClinicHero config={config} />
      <section className="m5-canvas m5-clinic-canvas" aria-labelledby="m5-r12-practice">
        <div className="m5-safety-warning">
          <strong>Repair claims without exposing people.</strong>
          <span>Use truthful, non-identifying language. Do not add names, photos, raw quotes, exact locations, or unsupported success claims.</span>
        </div>
        <article className="m5-practice-point" aria-label="Why this decision matters">
          <p className="m5-card-kicker">Why this matters</p>
          <p>{practiceNote.why}</p>
        </article>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Report repair lab</p>
            <h2 id="m5-r12-practice">Turn risky claims into rights-based claims</h2>
            <p>Review all reporting checks, then choose the safer claim for each risky sentence.</p>
          </div>
          <ProgressChip>{openedIds.length} of {allRevealIds.length} checks reviewed</ProgressChip>
        </div>
        <Module5ClinicRevealCards config={config} openedIds={openedIds} onOpen={openReveal} />
        <div className="m5-decision-grid">
          {reportRepairItems.map((item) => {
            const selected = answers[item.id] || '';
            const correct = submitted && selected === item.answer;
            const incorrect = submitted && selected && !correct;
            const correctLabel = reportRepairOptions.find((option) => option.id === item.answer)?.label;
            return (
              <article key={item.id} className={`m5-classification-card ${correct ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`}>
                <label>
                  <span>{item.risky}</span>
                  <select value={selected} onChange={(event) => choose(item.id, event.target.value)}>
                    <option value="">Choose a safer claim</option>
                    {reportRepairOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </label>
                {selected && (
                  <p className="m5-selected-summary">
                    <strong>Selected meaning:</strong> {getOptionSummary(reportRepairOptions, selected)}
                  </p>
                )}
                {submitted && (
                  <p className="m5-classification-feedback">
                    <strong>{correct ? 'Safer claim.' : `Better claim: ${correctLabel}.`}</strong>{' '}
                    {item.explanation}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        <footer className="m5-ladder-actions">
          <div>
            <h3>{submitted ? `${correctCount} of ${reportRepairItems.length} claims repaired` : 'Repair every risky claim to continue'}</h3>
            <p>{submitted ? 'Rights-based reporting is stronger when it is truthful about progress, limits, barriers, adaptation, and account-back.' : 'The repaired claim should be safe, modest, evidence-based, and accountable.'}</p>
            <p className="m5-carry-forward-note">{practiceNote.carry}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check repaired claims' : 'Review all checks and repair each claim'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R11', 'M5-R12', module5Routes['M5-R12'], onChangeState, key, { answers, correctCount, submitted: true })} disabled={!canContinue}>{config.ctaButton}</PrimaryButton>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Module5CapstoneSimulatorScreen({ state, onChangeState }: Module5RendererProps) {
  const config = module5Screens['M5-R12'];
  const practiceNote = clinicPracticeNotes['M5-R12'];
  const key = practiceKey('M5-R12');
  const stored = state.practiceCheckState[key] || {};
  const completed = (state.screenProgress[MODULE_ID] || []).includes('M5-R12');
  const allRevealIds = config.revealItems.map((item) => item.id);
  const [openedIds, setOpenedIds] = useState<string[]>(completed ? allRevealIds : (stored.openedIds as string[]) || []);
  const [answers, setAnswers] = useState<Record<string, string>>((stored.answers as Record<string, string>) || {});
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const openReveal = (id: string) => {
    const next = openedIds.includes(id) ? openedIds : [...openedIds, id];
    setOpenedIds(next);
    onChangeState((prev) => ({ ...prev, practiceCheckState: updatePracticeState(prev, key, { openedIds: next, status: 'in_progress' }) }));
  };
  const choose = (id: string, value: string) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    setSubmitted(false);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R12');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { answers: next, submitted: false, status: 'in_progress' }) };
    });
  };

  const allAnswered = capstoneSteps.every((step) => answers[step.id]);
  const correctCount = capstoneSteps.filter((step) => answers[step.id] === step.answer).length;
  const canSubmit = openedIds.length === allRevealIds.length && allAnswered;
  const canContinue = completed || submitted;
  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R12');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { openedIds, answers, submitted: true, correctCount, status: 'completed' }) };
    });
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-clinic-screen" aria-labelledby="M5-R12-title">
      <Module5ClinicHero config={config} />
      <section className="m5-canvas m5-clinic-canvas" aria-labelledby="m5-r13-practice">
        <div className="m5-safety-warning">
          <strong>Capstone uses safe fictional evidence only.</strong>
          <span>All choices are structured. Do not enter or upload real names, exact locations, complaint details, child data, diagnoses, officials, organizations, or confidential documents.</span>
        </div>
        <article className="m5-practice-point" aria-label="Why this decision matters">
          <p className="m5-card-kicker">Why this matters</p>
          <p>{practiceNote.why}</p>
        </article>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Evidence-to-action simulator</p>
            <h2 id="m5-r13-practice">Complete all seven decisions</h2>
            <p>Review all simulator stages, then choose the safest pathway for each step.</p>
          </div>
          <ProgressChip>{openedIds.length} of {allRevealIds.length} stages reviewed</ProgressChip>
        </div>
        <Module5ClinicRevealCards config={config} openedIds={openedIds} onOpen={openReveal} />
        <div className="m5-capstone-steps">
          {capstoneSteps.map((step) => {
            const selected = answers[step.id] || '';
            const selectedOption = step.options.find((option) => option.id === selected);
            const correct = submitted && selected === step.answer;
            const incorrect = submitted && selected && !correct;
            const correctLabel = step.options.find((option) => option.id === step.answer)?.label;
            return (
              <article key={step.id} className={`m5-classification-card m5-capstone-step ${correct ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`}>
                <label>
                  <span>{step.title}</span>
                  <small>{step.prompt}</small>
                  <select value={selected} onChange={(event) => choose(step.id, event.target.value)}>
                    <option value="">Choose a pathway</option>
                    {step.options.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </label>
                {selectedOption && (
                  <p className="m5-selected-summary">
                    <strong>Selected meaning:</strong> {selectedOption.summary}
                  </p>
                )}
                {submitted && (
                  <p className="m5-classification-feedback">
                    <strong>{correct ? 'Strong step.' : `Better step: ${correctLabel}.`}</strong>{' '}
                    {step.explanation}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        {submitted && (
          <article className="m5-feedback-card is-strong" aria-live="polite">
            <p className="m5-card-kicker">Capstone summary</p>
            <h3>{correctCount} of {capstoneSteps.length} decisions matched the safer pathway</h3>
            <p>You have practiced the full HRBA MEAL cycle: repair weak indicators, use the minimum necessary data, protect identities, interpret themes safely, respond to feedback, adapt based on evidence, report truthfully, and account back.</p>
            <ol className="m5-capstone-summary">
              <li>Keep useful numbers, then ask what they hide.</li>
              <li>Identify missing groups and barriers without collecting names.</li>
              <li>Remove identifiers, sensitive details, and unsafe story material.</li>
              <li>Use feedback for response, referral, adaptation, and account-back.</li>
              <li>Adapt practice based on evidence signals.</li>
              <li>Repair report claims so they are truthful and safe.</li>
              <li>Account back to communities about what changed and what remains unresolved.</li>
            </ol>
          </article>
        )}
        <footer className="m5-ladder-actions">
          <div>
            <h3>{submitted ? 'Simulator completed' : 'Complete all seven capstone steps'}</h3>
            <p>{submitted ? 'The next screen turns this cycle into your structured HRBA MEAL repair note.' : 'The simulator has no free-text fields and uses only fictional evidence choices.'}</p>
            <p className="m5-carry-forward-note">{practiceNote.carry}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check simulator pathway' : 'Review stages and answer all steps'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R12', 'M5-R13', module5Routes['M5-R13'], onChangeState, key, { answers, correctCount, submitted: true })} disabled={!canContinue}>{config.ctaButton}</PrimaryButton>
          </div>
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
  const allRevealIds = config.revealItems.map((item) => item.id);
  const [openedIds, setOpenedIds] = useState<string[]>(completed ? allRevealIds : (stored.openedIds as string[]) || []);
  const [answers, setAnswers] = useState<Record<string, string>>((stored.answers as Record<string, string>) || {});
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const openReveal = (id: string) => {
    const next = openedIds.includes(id) ? openedIds : [...openedIds, id];
    setOpenedIds(next);
    onChangeState((prev) => ({ ...prev, practiceCheckState: updatePracticeState(prev, key, { openedIds: next, status: 'in_progress' }) }));
  };

  const choose = (id: string, value: string) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    setSubmitted(false);
    setCopyStatus('idle');
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R13');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { answers: next, submitted: false, status: 'in_progress' }) };
    });
  };

  const allAnswered = repairNoteSteps.every((step) => answers[step.id]);
  const allReviewed = openedIds.length === allRevealIds.length;
  const canSubmit = allAnswered && allReviewed;
  const canContinue = completed || submitted;
  const selectedSummaries = repairNoteSteps.map((step) => ({
    title: step.title.replace(/^\d+\.\s*/, ''),
    label: step.options.find((option) => option.id === answers[step.id])?.label || '',
    summary: step.options.find((option) => option.id === answers[step.id])?.summary || '',
  }));
  const repairNoteText = [
    'Safe HRBA MEAL repair note',
    ...selectedSummaries.map((item) => `${item.title}: ${item.label}. ${item.summary}`),
    'Safeguard: This note uses only structured, non-identifying choices. It does not include names, exact locations, complaint details, survivor information, child data, diagnoses, official names, organization names, or confidential records.',
  ].join('\n');

  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    setCopyStatus('idle');
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R13');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { openedIds, answers, submitted: true, repairNoteText, status: 'completed' }) };
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
    <main className="m5-screen m5-screen--asset-visual m5-clinic-screen" aria-labelledby="M5-R13-title">
      <Module5ClinicHero config={config} />
      <section className="m5-canvas m5-clinic-canvas" aria-labelledby="m5-r13-practice">
        <div className="m5-safety-warning">
          <strong>No sensitive free text.</strong>
          <span>The repair note is generated from structured choices only. Do not add names, exact locations, complaint details, survivor information, child data, diagnoses, officials, organizations, or confidential records.</span>
        </div>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">Structured repair note</p>
            <h2 id="m5-r13-practice">Choose each part of the repair note</h2>
            <p>Review all safe note checks, then choose one option for each repair-note field.</p>
          </div>
          <ProgressChip>{openedIds.length} of {allRevealIds.length} checks reviewed</ProgressChip>
        </div>
        <Module5ClinicRevealCards config={config} openedIds={openedIds} onOpen={openReveal} />
        <div className="m5-decision-grid">
          {repairNoteSteps.map((step) => {
            const selected = answers[step.id] || '';
            return (
              <article key={step.id} className="m5-classification-card">
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
        {submitted && (
          <article className="m5-feedback-card is-strong m5-repair-note-output" aria-live="polite">
            <p className="m5-card-kicker">Generated safe repair note</p>
            <h3>The note is practical, safe, honest, and connected to account-back.</h3>
            <pre tabIndex={0}>{repairNoteText}</pre>
            <PrimaryButton onClick={copySummary}>{copyStatus === 'copied' ? 'Safe summary copied' : 'Copy safe summary'}</PrimaryButton>
            {copyStatus !== 'idle' && (
              <p className="m5-selected-summary" role="status" aria-live="polite">
                {copyStatus === 'copied'
                  ? 'Safe summary copied.'
                  : 'Copy did not complete. Select and copy the summary manually.'}
              </p>
            )}
          </article>
        )}
        <footer className="m5-ladder-actions">
          <div>
            <h3>{submitted ? 'Repair note generated' : 'Complete all six structured choices'}</h3>
            <p>{submitted ? config.feedbackStrong : 'The summary will be generated only from safe structured choices.'}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Generate repair note' : 'Review checks and answer all fields'}</PrimaryButton>
            <PrimaryButton onClick={() => completeSimpleScreen('M5-R13', 'M5-R14', module5Routes['M5-R14'], onChangeState, key, { answers, repairNoteText, submitted: true })} disabled={!canContinue}>{config.ctaButton}</PrimaryButton>
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
  const [selected, setSelected] = useState<Record<string, string[]>>((stored.selected as Record<string, string[]>) || {});
  const [submitted, setSubmitted] = useState(Boolean(stored.submitted || completed));

  const openReveal = (id: string) => {
    const next = openedIds.includes(id) ? openedIds : [...openedIds, id];
    setOpenedIds(next);
    onChangeState((prev) => ({ ...prev, practiceCheckState: updatePracticeState(prev, key, { openedIds: next, status: 'in_progress' }) }));
  };

  const toggle = (groupId: string, optionId: string) => {
    const groupValues = selected[groupId] || [];
    const nextGroup = groupValues.includes(optionId)
      ? groupValues.filter((item) => item !== optionId)
      : [...groupValues, optionId];
    const next = { ...selected, [groupId]: nextGroup };
    setSelected(next);
    setSubmitted(false);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.delete('M5-R14');
      progress.delete('M5-PLAYER-COMPLETE');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { selected: next, submitted: false, status: 'in_progress' }) };
    });
  };

  const allReviewed = openedIds.length === allRevealIds.length;
  const allStagesSelected = bridgeActionGroups.every((group) => (selected[group.id] || []).length > 0);
  const canSubmit = allReviewed && allStagesSelected;
  const canComplete = completed || submitted;
  const commitmentText = [
    '90-day HRBA MEAL practice bridge',
    ...bridgeActionGroups.map((group) => {
      const choices = (selected[group.id] || [])
        .map((id) => group.options.find((option) => option.id === id))
        .filter(Boolean)
        .map((option) => `${option?.label}: ${option?.summary}`)
        .join(' ');
      return `${group.title}: ${choices}`;
    }),
    'Account-back commitment: Share what was heard, what changed, what remains unresolved, and next steps without identifying people or exposing sensitive details.',
  ].join('\n');

  const submit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R14');
      return { ...prev, screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) }, practiceCheckState: updatePracticeState(prev, key, { openedIds, selected, submitted: true, commitmentText, status: 'completed' }) };
    });
  };

  const completeModule = () => {
    onChangeState((prev) => {
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      progress.add('M5-R14');
      progress.add('M5-PLAYER-COMPLETE');
      return {
        ...prev,
        currentScreenId: 'M5-PLAYER-COMPLETE',
        completedModules: prev.completedModules.includes(MODULE_ID) ? prev.completedModules : [...prev.completedModules, MODULE_ID],
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(progress) },
        practiceCheckState: updatePracticeState(prev, key, { openedIds, selected, submitted: true, commitmentText, status: 'completed' }),
      };
    });
    setRoute(module5Routes['M5-PLAYER-COMPLETE']);
  };

  return (
    <main className="m5-screen m5-screen--asset-visual m5-clinic-screen" aria-labelledby="M5-R14-title">
      <Module5ClinicHero config={config} />
      <section className="m5-canvas m5-clinic-canvas" aria-labelledby="m5-r14-practice">
        <div className="m5-safety-warning">
          <strong>Start small and account back.</strong>
          <span>Choose realistic team actions. Do not default to collecting more personal data or asking untrained staff to investigate sensitive concerns.</span>
        </div>
        <div className="m5-canvas__header">
          <div>
            <p className="m5-card-kicker">90-day practice bridge</p>
            <h2 id="m5-r14-practice">Select at least one action for each stage</h2>
            <p>Review the three bridge stages, then choose practical actions for 30, 60, and 90 days.</p>
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
                const isSelected = (selected[group.id] || []).includes(option.id);
                return (
                  <label key={option.id} className={`m5-choice-card ${isSelected ? 'is-selected' : ''}`}>
                    <input type="checkbox" checked={isSelected} onChange={() => toggle(group.id, option.id)} />
                    <span className="m5-choice-card__mark" aria-hidden="true">{isSelected ? '✓' : '•'}</span>
                    <span><strong>{option.label}</strong><small>{option.summary}</small></span>
                  </label>
                );
              })}
            </fieldset>
          ))}
        </div>
        {submitted && (
          <article className="m5-feedback-card is-strong m5-repair-note-output" aria-live="polite">
            <p className="m5-card-kicker">Final practice commitment</p>
            <h3>{config.feedbackStrong}</h3>
            <pre tabIndex={0}>{commitmentText}</pre>
          </article>
        )}
        <footer className="m5-ladder-actions">
          <div>
            <h3>{submitted ? '90-day bridge ready' : 'Choose at least one action for each stage'}</h3>
            <p>{submitted ? 'You can now complete Module 5.' : 'The bridge should be realistic, safe, and specific enough to guide action without identifying people.'}</p>
          </div>
          <div className="m5-ladder-actions__buttons">
            <PrimaryButton onClick={submit} disabled={!canSubmit}>{canSubmit ? 'Check 90-day bridge' : 'Review stages and select actions'}</PrimaryButton>
            <PrimaryButton onClick={completeModule} disabled={!canComplete}>Complete Module 5</PrimaryButton>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Module5CompleteScreen({ onChangeState }: { onChangeState: Module5RendererProps['onChangeState'] }) {
  return (
    <main className="m5-screen m5-screen--complete" aria-labelledby="m5-complete-title">
      <section className="m5-hero-panel">
        <div className="m5-hero-panel__copy">
          <ModuleContextLabel>Module 5 · HRBA in MEAL</ModuleContextLabel>
          <ScreenTitle
            id="m5-complete-title"
            lead="You have completed the HRBA in Monitoring, Evaluation, Accountability and Learning pathway."
          >
            Module 5 Complete
          </ScreenTitle>
          <article className="m5-insight-card m5-insight-card--dark">
            <p className="m5-card-kicker">Course-to-practice bridge</p>
            <h2>Use evidence to learn safely and respond well</h2>
            <p>
              You have practiced looking beyond activity numbers, repairing indicators, using gender-sensitive
              and disability-inclusive evidence, choosing safer data, responding to feedback, adapting based on
              signals, and reporting truthfully.
            </p>
          </article>
          <PrimaryButton
            onClick={() =>
              onChangeState((prev) => ({
                ...prev,
                currentLayer: 'platform',
                currentSubState: null,
                activeModal: null,
              }))
            }
          >
            Return to course page
          </PrimaryButton>
        </div>
        <EvidenceVisual config={{
          ...module5Screens['M5-S1-25'],
          blockType: 'Module completion',
        }} />
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


  if (props.screenId === 'M5-R04') {
    return <Module5EvidenceLadderScreen {...props} />;
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

  if (props.screenId === 'M5-S1-02') {
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
