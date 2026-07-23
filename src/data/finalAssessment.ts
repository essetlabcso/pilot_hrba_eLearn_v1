import { createAssessmentEvidenceId } from '../integration/portalLearnerState';

export const FINAL_ASSESSMENT_MODULE_ID = 'final_assessment';
export const FINAL_ASSESSMENT_PASS_THRESHOLD = 80;
export const finalAssessmentScreenRoutes: Record<string, string> = {
  'FINAL-ASSESSMENT-PLAYER-00': '/final-assessment/cover',
  'FINAL-ASSESSMENT-QUESTIONS': '/final-assessment/questions',
  'FINAL-ASSESSMENT-COMPLETE': '/final-assessment/result',
};

export const finalAssessmentRouteTargets: Record<string, { moduleId: string; screenId: string }> = {
  '/final-assessment': { moduleId: FINAL_ASSESSMENT_MODULE_ID, screenId: 'FINAL-ASSESSMENT-PLAYER-00' },
  '/final-assessment/cover': { moduleId: FINAL_ASSESSMENT_MODULE_ID, screenId: 'FINAL-ASSESSMENT-PLAYER-00' },
  '/final-assessment/questions': { moduleId: FINAL_ASSESSMENT_MODULE_ID, screenId: 'FINAL-ASSESSMENT-QUESTIONS' },
  '/final-assessment/result': { moduleId: FINAL_ASSESSMENT_MODULE_ID, screenId: 'FINAL-ASSESSMENT-COMPLETE' },
};

export const finalAssessmentSequence = [
  {
    Layer: 'Layer 2 Player',
    'Screen/State ID': 'FINAL-ASSESSMENT-PLAYER-00',
    'Screen/State Title': 'Final Assessment Introduction',
    'Learning/Purpose': 'Review the final assessment rules, pass mark, retake option, and certificate handoff to the CSO Learning Hub.',
  },
  {
    Layer: 'Layer 2 Player',
    'Screen/State ID': 'FINAL-ASSESSMENT-QUESTIONS',
    'Screen/State Title': 'Final Assessment Questions',
    'Learning/Purpose': 'Complete 10 objective HRBA judgment questions before submitting for local scoring.',
  },
  {
    Layer: 'Layer 2 Player',
    'Screen/State ID': 'FINAL-ASSESSMENT-COMPLETE',
    'Screen/State Title': 'Final Assessment Result',
    'Learning/Purpose': 'Show the final assessment score, pass/fail feedback, and retake action if needed.',
  },
];

export type FinalAssessmentOption = {
  id: string;
  text: string;
};

export type FinalAssessmentQuestion = {
  id: string;
  topic: string;
  prompt: string;
  options: FinalAssessmentOption[];
  correctOptionId: string;
  feedback: string;
};

export type FinalAssessmentResult = {
  evidenceId: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
  attemptNumber: number;
};

export const finalAssessmentQuestions: FinalAssessmentQuestion[] = [
  {
    id: 'q1_hrba_shift',
    topic: 'HRBA purpose',
    prompt: 'A CSO team says, "Our project is successful because we delivered all planned activities." Which response best applies an HRBA lens?',
    options: [
      { id: 'a', text: 'Check whether the activities strengthened rights-holder voice, addressed barriers, and improved accountability.' },
      { id: 'b', text: 'Count only the number of people reached and compare it with the original target.' },
      { id: 'c', text: 'Avoid asking rights questions because the CSO is not a government body.' },
      { id: 'd', text: 'Report the activities as complete if attendance lists are signed.' },
    ],
    correctOptionId: 'a',
    feedback: 'HRBA asks whether activities changed access, voice, barriers, and accountability, not only whether outputs were delivered.',
  },
  {
    id: 'q2_actor_roles',
    topic: 'Rights-holders and duty-bearers',
    prompt: 'In a water access project, which actor mapping is strongest?',
    options: [
      { id: 'a', text: 'Community members are rights-holders, local public authorities are duty-bearers, and the CSO supports engagement and accountability.' },
      { id: 'b', text: 'The CSO is the duty-bearer because it is implementing the project.' },
      { id: 'c', text: 'Donors are the only duty-bearers because they fund the work.' },
      { id: 'd', text: 'Community members are beneficiaries, so actor roles are not needed.' },
    ],
    correctOptionId: 'a',
    feedback: 'A practical HRBA keeps role clarity: rights-holders hold rights, duty-bearers hold obligations, and CSOs usually support voice, access, and accountability.',
  },
  {
    id: 'q3_participation',
    topic: 'Meaningful participation',
    prompt: 'Which participation choice is most rights-based?',
    options: [
      { id: 'a', text: 'Invite community representatives after decisions are made so they can hear the final plan.' },
      { id: 'b', text: 'Involve affected groups early, share accessible information, and show how their input can influence decisions.' },
      { id: 'c', text: 'Ask only the most available leaders because they are easiest to reach.' },
      { id: 'd', text: 'Use attendance at a public meeting as the only proof of participation.' },
    ],
    correctOptionId: 'b',
    feedback: 'Participation is meaningful when people can understand, influence, and safely engage before decisions are locked.',
  },
  {
    id: 'q4_inclusion',
    topic: 'Inclusion and non-discrimination',
    prompt: 'A project meeting has equal invitations, but women with care responsibilities and persons with disabilities are not attending. What is the best next step?',
    options: [
      { id: 'a', text: 'Keep the same meeting because everyone was invited equally.' },
      { id: 'b', text: 'Record non-attendance as lack of interest.' },
      { id: 'c', text: 'Adjust timing, venue, communication, and support so different groups can participate safely and practically.' },
      { id: 'd', text: 'Ask one leader to speak for all missing groups.' },
    ],
    correctOptionId: 'c',
    feedback: 'Equal invitation is not equal access. HRBA requires practical adjustments that make participation safer and more inclusive.',
  },
  {
    id: 'q5_accountability',
    topic: 'Accountability and feedback',
    prompt: 'A feedback box receives complaints about selection criteria. What turns feedback collection into accountability?',
    options: [
      { id: 'a', text: 'Count the number of complaints and file them with project records.' },
      { id: 'b', text: 'Respond safely, review whether criteria are fair, correct problems where possible, and account back to the community.' },
      { id: 'c', text: 'Ignore anonymous complaints because they cannot be verified.' },
      { id: 'd', text: 'Share names of complainants with local leaders so they can investigate.' },
    ],
    correctOptionId: 'b',
    feedback: 'Accountability requires safe response, correction or referral where needed, and account-back, not only collection.',
  },
  {
    id: 'q6_power_barriers',
    topic: 'Power and barriers',
    prompt: 'A project team learns that informal gatekeepers discourage some youth from attending activities. Which analysis is most useful?',
    options: [
      { id: 'a', text: 'Treat the issue as a personal motivation problem.' },
      { id: 'b', text: 'Look only at written rules because informal power is outside project control.' },
      { id: 'c', text: 'Identify visible, hidden, and invisible power dynamics and plan safer ways to reduce exclusion.' },
      { id: 'd', text: 'Ask gatekeepers to choose participants more quickly.' },
    ],
    correctOptionId: 'c',
    feedback: 'HRBA practice looks at formal and informal power, including hidden barriers that shape who can participate.',
  },
  {
    id: 'q7_safe_evidence',
    topic: 'Safe evidence and do no harm',
    prompt: 'A donor asks for individual stories from people who reported sensitive rights concerns. What is the safest HRBA response?',
    options: [
      { id: 'a', text: 'Collect names and photos so the report feels credible.' },
      { id: 'b', text: 'Use the minimum necessary evidence, seek informed consent where stories are used, anonymize or aggregate details, and avoid exposing people.' },
      { id: 'c', text: 'Refuse to report any evidence about barriers.' },
      { id: 'd', text: 'Ask local officials to approve which stories can be shared.' },
    ],
    correctOptionId: 'b',
    feedback: 'Safe evidence protects dignity, privacy, consent, and do-no-harm while still making barriers visible.',
  },
  {
    id: 'q8_design_repair',
    topic: 'Project design repair',
    prompt: 'Which objective is the strongest HRBA repair of "Train 200 people on service rights"?',
    options: [
      { id: 'a', text: 'Train 250 people on service rights.' },
      { id: 'b', text: 'Increase awareness through two workshops and a radio message.' },
      { id: 'c', text: 'Strengthen rights-holder ability to access information, raise concerns safely, and receive response from relevant duty-bearers.' },
      { id: 'd', text: 'Complete all training activities by the end of the quarter.' },
    ],
    correctOptionId: 'c',
    feedback: 'The strongest objective connects knowledge, access, safe voice, and duty-bearer response rather than only activity delivery.',
  },
  {
    id: 'q9_adaptation',
    topic: 'Responsible implementation adaptation',
    prompt: 'During implementation, monitoring shows a minority group is being excluded from service access. What should the team do first?',
    options: [
      { id: 'a', text: 'Wait until the final evaluation to avoid disrupting the plan.' },
      { id: 'b', text: 'Quietly remove the group from reporting targets.' },
      { id: 'c', text: 'Pause to understand the barrier safely, adjust delivery with affected people where possible, and document the adaptation.' },
      { id: 'd', text: 'Tell participants they must attend more consistently.' },
    ],
    correctOptionId: 'c',
    feedback: 'HRBA implementation requires responsible adaptation when evidence shows exclusion or harm risk.',
  },
  {
    id: 'q10_meal_reporting',
    topic: 'HRBA MEAL and reporting',
    prompt: 'Which reporting statement best reflects HRBA MEAL?',
    options: [
      { id: 'a', text: 'The project reached its target, so all groups benefited equally.' },
      { id: 'b', text: 'The project reports who was reached and missed, what barriers emerged, what changed, and what response or account-back actions followed.' },
      { id: 'c', text: 'The project reports only success stories to maintain trust with partners.' },
      { id: 'd', text: 'The project avoids discussing exclusions because they may look negative.' },
    ],
    correctOptionId: 'b',
    feedback: 'HRBA MEAL reports evidence honestly, including who may have been missed and what the team did in response.',
  },
];

export function scoreFinalAssessment(answers: Record<string, string>, attemptNumber: number): FinalAssessmentResult {
  const score = finalAssessmentQuestions.reduce((total, question) => (
    answers[question.id] === question.correctOptionId ? total + 1 : total
  ), 0);
  const maxScore = finalAssessmentQuestions.length;
  const percentage = Math.round((score / maxScore) * 100);

  return {
    evidenceId: createAssessmentEvidenceId(),
    score,
    maxScore,
    percentage,
    passed: percentage >= FINAL_ASSESSMENT_PASS_THRESHOLD,
    submittedAt: new Date().toISOString(),
    attemptNumber,
  };
}
