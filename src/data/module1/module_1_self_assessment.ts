export type Module1AssessmentDomainId =
  | 'hrba_foundation'
  | 'inclusion_participation'
  | 'accountability_safe_standards'
  | 'project_design_power'
  | 'implementation_meal';

export interface Module1AssessmentDomain {
  id: Module1AssessmentDomainId;
  label: string;
  questionIds: string[];
  suggestedModuleFocus: string;
  suggestedPriority: string;
}

export const module1AssessmentQuestions = [
  { id: 'q1', domainId: 'hrba_foundation', text: 'Explain HRBA in simple words and connect it to everyday CSO project work.' },
  { id: 'q2', domainId: 'hrba_foundation', text: 'Identify who holds rights and who has responsibilities in a project or service context.' },
  { id: 'q3', domainId: 'inclusion_participation', text: 'Identify which groups may face barriers to access, participation, or being heard.' },
  { id: 'q4', domainId: 'inclusion_participation', text: 'Design participation so people can influence decisions, not only attend activities.' },
  { id: 'q5', domainId: 'accountability_safe_standards', text: 'Check whether feedback, complaints, and commitments are received, answered, and followed up safely.' },
  { id: 'q6', domainId: 'accountability_safe_standards', text: 'Use relevant human rights standards to analyse a project issue without creating safety risks.' },
  { id: 'q7', domainId: 'project_design_power', text: 'Analyse who has power and influence, and what risks this creates for project decisions.' },
  { id: 'q8', domainId: 'project_design_power', text: 'Improve a project design by linking barriers, responsible actors, activities, indicators, and participation.' },
  { id: 'q9', domainId: 'implementation_meal', text: 'Monitor whether implementation is staying inclusive, participatory, accountable, and safe.' },
  { id: 'q10', domainId: 'implementation_meal', text: 'Use MEAL evidence, feedback, reporting, and learning in ways that are useful and do not cause harm.' }
] as const;

export const module1AssessmentDomains: Module1AssessmentDomain[] = [
  {
    id: 'hrba_foundation',
    label: 'HRBA foundation',
    questionIds: ['q1', 'q2'],
    suggestedModuleFocus: 'Pay close attention to Module 2, where you will build the HRBA foundation.',
    suggestedPriority: 'I want to better understand HRBA foundations.'
  },
  {
    id: 'inclusion_participation',
    label: 'Inclusion and participation',
    questionIds: ['q3', 'q4'],
    suggestedModuleFocus: 'Pay close attention to Module 2 and Module 4, especially participation, inclusion, and who may be left out.',
    suggestedPriority: 'I want to improve participation and inclusion.'
  },
  {
    id: 'accountability_safe_standards',
    label: 'Accountability and safe standards',
    questionIds: ['q5', 'q6'],
    suggestedModuleFocus: 'Pay close attention to Module 2 and Module 5, especially accountability, feedback, safe standards use, and follow-up.',
    suggestedPriority: 'I want to strengthen advocacy and accountability.'
  },
  {
    id: 'project_design_power',
    label: 'Project design and power analysis',
    questionIds: ['q7', 'q8'],
    suggestedModuleFocus: 'Pay close attention to Module 3, especially barriers, power, actors, design choices, and indicators.',
    suggestedPriority: 'I want to improve project design.'
  },
  {
    id: 'implementation_meal',
    label: 'Implementation and MEAL',
    questionIds: ['q9', 'q10'],
    suggestedModuleFocus: 'Pay close attention to Module 4 and Module 5, especially implementation monitoring, feedback, evidence, reporting, and learning.',
    suggestedPriority: 'I want to use MEAL, evidence, feedback, and reporting more safely.'
  }
];

const confidenceBands = [
  {
    id: 'starting_point',
    label: 'Starting point',
    max: 1.7,
    feedback: 'You are at an early starting point. Use Module 2 to build the foundation slowly and practically. Focus on the questions, examples, and portfolio notes rather than trying to master everything at once.'
  },
  {
    id: 'building_confidence',
    label: 'Building confidence',
    max: 2.5,
    feedback: 'You already have some strengths. Use the course to deepen the areas where you want more confidence and connect the ideas to your CSO work.'
  },
  {
    id: 'applying_with_support',
    label: 'Applying with support',
    max: 3.3,
    feedback: 'You have a good starting base. Use the course to apply HRBA more consistently across design, implementation, MEAL, participation, and accountability.'
  },
  {
    id: 'ready_to_strengthen_practice',
    label: 'Ready to strengthen practice',
    max: 4,
    feedback: 'You are starting from a strong level of confidence. Use the course to sharpen practical application, notice gaps more carefully, and support peer learning.'
  }
] as const;

export function evaluateModule1SelfAssessment(ratings: Record<string, number>) {
  const answeredCount = module1AssessmentQuestions.filter((question) => ratings[question.id]).length;
  const isComplete = answeredCount === module1AssessmentQuestions.length;
  const averageScore = isComplete
    ? module1AssessmentQuestions.reduce((total, question) => total + Number(ratings[question.id] || 0), 0) / module1AssessmentQuestions.length
    : 0;
  const domainAverages = module1AssessmentDomains.map((domain) => ({
    ...domain,
    average: domain.questionIds.reduce((total, questionId) => total + Number(ratings[questionId] || 0), 0) / domain.questionIds.length
  }));
  const strongestDomain = domainAverages.reduce((strongest, domain) => (
    domain.average > strongest.average ? domain : strongest
  ), domainAverages[0]);
  const weakestDomain = domainAverages.reduce((weakest, domain) => (
    domain.average < weakest.average ? domain : weakest
  ), domainAverages[0]);
  const confidenceBand = confidenceBands.find((band) => averageScore <= band.max) || confidenceBands[confidenceBands.length - 1];

  return {
    answeredCount,
    isComplete,
    averageScore,
    domainAverages,
    strongestDomain,
    weakestDomain,
    confidenceBand
  };
}
