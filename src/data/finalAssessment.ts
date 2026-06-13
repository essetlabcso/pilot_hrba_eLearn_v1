export type FinalAssessmentOption = {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
};

export type FinalAssessmentQuestion = {
  id: string;
  question: string;
  options: FinalAssessmentOption[];
  correctAnswer: FinalAssessmentOption['id'];
};

export const FINAL_ASSESSMENT_PASSING_SCORE = 16;
export const FINAL_ASSESSMENT_TOTAL = 20;

export const finalAssessmentQuestions: FinalAssessmentQuestion[] = [
  {
    id: 'q1',
    question: 'What is the strongest description of HRBA for local CSO practice?',
    options: [
      { id: 'A', text: 'A legal vocabulary exercise only' },
      { id: 'B', text: 'A way of designing and implementing work that strengthens rights, participation, inclusion, accountability, and safe change' },
      { id: 'C', text: 'A replacement for all service delivery' },
      { id: 'D', text: 'A donor reporting format only' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'q2',
    question: 'Which shift best reflects HRBA?',
    options: [
      { id: 'A', text: 'From communities as passive beneficiaries to people as rights-holders' },
      { id: 'B', text: 'From participation to faster decisions' },
      { id: 'C', text: 'From accountability to activity counts' },
      { id: 'D', text: 'From inclusion to treating everyone exactly the same' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 'q3',
    question: 'In HRBA, what is the best meaning of a rights-holder?',
    options: [
      { id: 'A', text: 'A person who receives project support but has no role in decisions' },
      { id: 'B', text: 'A person or group with rights, dignity, voice, agency, and legitimate claims' },
      { id: 'C', text: 'Only a person who has formal legal training' },
      { id: 'D', text: 'Only a person who submits a court complaint' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'q4',
    question: 'Which is a realistic benefit of applying HRBA?',
    options: [
      { id: 'A', text: 'It automatically solves all funding problems' },
      { id: 'B', text: 'It removes the need for project management' },
      { id: 'C', text: 'It strengthens inclusion, accountability, trust, and project relevance' },
      { id: 'D', text: 'It allows CSOs to avoid engaging responsible actors' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 'q5',
    question: 'Which statement best shows the difference between service delivery and rights-based practice?',
    options: [
      { id: 'A', text: 'Service delivery gives support quickly; rights-based practice also asks about exclusion, responsibility, participation, and accountability' },
      { id: 'B', text: 'Service delivery is always wrong and should stop' },
      { id: 'C', text: 'Rights-based practice means CSOs replace government institutions' },
      { id: 'D', text: 'Rights-based practice means only writing legal reports' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 'q6',
    question: 'Human rights are best understood as:',
    options: [
      { id: 'A', text: 'Optional project values' },
      { id: 'B', text: 'Standards linked to dignity, equality, freedom, safety, participation, and opportunity' },
      { id: 'C', text: 'Only court cases' },
      { id: 'D', text: 'Only political issues' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'q7',
    question: 'Which set best describes key characteristics of human rights?',
    options: [
      { id: 'A', text: 'Universal, inalienable, indivisible, and interdependent' },
      { id: 'B', text: 'Optional, temporary, selective, and donor-defined' },
      { id: 'C', text: 'Urban, legal, political, and technical only' },
      { id: 'D', text: 'Individual only, never connected to groups or systems' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 'q8',
    question: 'Why should a livelihood project consider human rights?',
    options: [
      { id: 'A', text: 'Livelihoods can relate to dignity, non-discrimination, participation, and access to opportunity' },
      { id: 'B', text: 'Human rights only apply to courts' },
      { id: 'C', text: 'Livelihoods are never rights-related' },
      { id: 'D', text: 'Only legal organizations can use HRBA' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 'q9',
    question: 'Which is the strongest example of meaningful participation?',
    options: [
      { id: 'A', text: 'Informing people after the project is already designed' },
      { id: 'B', text: 'Asking people to attend a launch event' },
      { id: 'C', text: 'Involving affected people early enough to influence decisions' },
      { id: 'D', text: 'Collecting signatures only' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 'q10',
    question: 'A CSO notices that women with disabilities rarely attend community meetings. What is the most HRBA-aligned first response?',
    options: [
      { id: 'A', text: 'Assume they are not interested' },
      { id: 'B', text: 'Ask what barriers exist and adapt access, timing, communication, and support' },
      { id: 'C', text: 'Remove them from the target group' },
      { id: 'D', text: 'Report only the number of people who attended' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'q11',
    question: 'Which action best shows accountability?',
    options: [
      { id: 'A', text: 'Collect feedback but never respond' },
      { id: 'B', text: 'Explain decisions, listen to feedback, respond, and make corrections where needed' },
      { id: 'C', text: 'Hide project decisions to avoid criticism' },
      { id: 'D', text: 'Report only to donors' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'q12',
    question: 'A team wants to publish identifiable photos of vulnerable community members to show project impact. What is the safest response?',
    options: [
      { id: 'A', text: 'Publish quickly while the story is fresh' },
      { id: 'B', text: 'Publish only if the photo looks positive' },
      { id: 'C', text: 'Check consent, dignity, risk, and safer alternatives; use non-identifying evidence if needed' },
      { id: 'D', text: 'Avoid all communication forever' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 'q13',
    question: 'What is the safest way for a CSO to use legal or policy standards in a course activity or project discussion?',
    options: [
      { id: 'A', text: 'Make strong legal claims without checking' },
      { id: 'B', text: 'Use relevant standards carefully and seek updated legal guidance where needed' },
      { id: 'C', text: 'Ignore all standards' },
      { id: 'D', text: 'Use law only for fundraising' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'q14',
    question: 'What question best supports power and exclusion analysis?',
    options: [
      { id: 'A', text: 'Who attended the workshop?' },
      { id: 'B', text: 'Who influences decisions, who is missing, and who faces barriers?' },
      { id: 'C', text: 'How many pages is the report?' },
      { id: 'D', text: 'What is easiest to count?' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'q15',
    question: 'Which option best links the HRBA concepts of claim, obligation, capacity gap, and CSO role?',
    options: [
      { id: 'A', text: 'Claim means donor request; obligation means CSO branding; capacity gap means low visibility; CSO role means replacing duty-bearers' },
      { id: 'B', text: 'Claim means what rights-holders can legitimately ask for; obligation means what duty-bearers are responsible to do; capacity gap means what prevents action; CSO role means supporting dialogue, service, advocacy, and accountability' },
      { id: 'C', text: 'Claim means complaint only; obligation means training attendance; capacity gap means project delay; CSO role means collecting forms' },
      { id: 'D', text: 'Claim means service request; obligation means budget line; capacity gap means staffing only; CSO role means reporting numbers' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'q16',
    question: 'Which stakeholder map is most useful for HRBA?',
    options: [
      { id: 'A', text: 'Only donor and CSO staff' },
      { id: 'B', text: 'Rights-holders, duty-bearers, allies, blockers, risks, influence, and participation entry points' },
      { id: 'C', text: 'Only people who attend training' },
      { id: 'D', text: 'Only government actors' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'q17',
    question: 'A project problem is written as “community members lack awareness.” What is a better HRBA problem-analysis question?',
    options: [
      { id: 'A', text: 'Who lacks awareness only?' },
      { id: 'B', text: 'What rights are affected, what barriers exist, who has responsibilities, and who is excluded?' },
      { id: 'C', text: 'How many brochures should we print?' },
      { id: 'D', text: 'How can we avoid asking difficult questions?' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'q18',
    question: 'Which objective is more rights-based?',
    options: [
      { id: 'A', text: 'Train 50 participants' },
      { id: 'B', text: 'Strengthen the ability of excluded community members to participate in local service decisions and improve duty-bearer responsiveness' },
      { id: 'C', text: 'Complete activities on time' },
      { id: 'D', text: 'Distribute materials only' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'q19',
    question: 'Which risks should HRBA project design consider first?',
    options: [
      { id: 'A', text: 'Exclusion, safeguarding, data/privacy, and civic-space/context risks' },
      { id: 'B', text: 'Only budget formatting risk' },
      { id: 'C', text: 'Only visibility and branding risk' },
      { id: 'D', text: 'Only whether the activity is easy to count' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 'q20',
    question: 'Which implementation practice is strongest from an HRBA perspective?',
    options: [
      { id: 'A', text: 'Consult once and never return' },
      { id: 'B', text: 'Keep participation and feedback open, track exclusion risks, adapt safely, and explain decisions to affected people' },
      { id: 'C', text: 'Continue exactly as planned even when feedback shows harm or exclusion' },
      { id: 'D', text: 'Ask only staff whether the project is working' },
    ],
    correctAnswer: 'B',
  },
];

export function scoreFinalAssessment(answers: Record<string, string>) {
  return finalAssessmentQuestions.reduce((score, question) => {
    return answers[question.id] === question.correctAnswer ? score + 1 : score;
  }, 0);
}
