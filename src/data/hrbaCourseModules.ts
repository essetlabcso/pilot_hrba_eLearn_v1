export type HRBAModuleDefinition = {
  moduleId: string;
  moduleSeq: number;
  itemLabel: string;
  title: string;
  subtitle?: string;
  description: string;
  coverFocus: string;
  duration: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  startScreenId: string;
  completionScreenId: string;
  contentAvailable: boolean;
};

export const HRBA_COURSE_MODULES: HRBAModuleDefinition[] = [
  {
    moduleId: 'module_01_hrba_foundations',
    moduleSeq: 1,
    itemLabel: 'Module 1',
    title: 'Starting the HRBA Learning Journey',
    subtitle: 'Introduction to HRBA for Local and Grassroots CSOs',
    description: 'Begin safely, explore the course pathway, practice a simple HRBA noticing habit, and choose one private action commitment to carry forward.',
    coverFocus: 'Start with a safe, practical HRBA lens for everyday CSO work without needing legal expertise.',
    duration: '20-25 minutes',
    thumbnailSrc: '/assets/hrba/modules/module-1.webp',
    thumbnailAlt: 'Learners walking along a glowing pathway through a fictional Ethiopian highland landscape at sunrise.',
    startScreenId: 'M1-PLAYER-00',
    completionScreenId: 'M1-PLAYER-COMPLETE',
    contentAvailable: true,
  },
  {
    moduleId: 'module_02_everyday_cso_work',
    moduleSeq: 2,
    itemLabel: 'Module 2',
    title: 'HRBA Foundations — The Everyday Rights Lens',
    subtitle: 'Learn how to see community work through rights-holders, duty-bearers, participation, power, accountability, and safe standards.',
    description: 'Learn how to see community work through rights-holders, duty-bearers, participation, power, accountability, and safe standards.',
    coverFocus: 'The Everyday Rights Lens',
    duration: 'Approx. 75-90 min',
    thumbnailSrc: '/assets/images/module-2/final/module-2-final-cover.webp',
    thumbnailAlt: 'Module 2 cover image for HRBA Foundations and the Everyday Rights Lens.',
    startScreenId: 'M2-00',
    completionScreenId: 'M2-Close',
    contentAvailable: true,
  },
  {
    moduleId: 'module_03_project_design',
    moduleSeq: 3,
    itemLabel: 'Module 3',
    title: 'Applying HRBA in Project Design',
    description: 'Turn a project idea into a stronger HRBA-aligned design with clearer analysis, objectives, actors, risks, participation, and evidence choices.',
    coverFocus: 'Designing Projects with a Practical Rights Lens',
    duration: 'Approx. 90-105 min',
    thumbnailSrc: '/assets/hrba/modules/module-3.png',
    thumbnailAlt: 'Module 3 cover image showing project design choices shaped by rights-holder analysis, duty-bearer roles, participation, risk, and evidence.',
    startScreenId: 'M3-PLAYER-00',
    completionScreenId: 'M3-R22',
    contentAvailable: true,
  },
  {
    moduleId: 'module_04_implementation',
    moduleSeq: 4,
    itemLabel: 'Module 4',
    title: 'Applying HRBA During Implementation',
    description: 'Apply HRBA principles during implementation through fair access, meaningful participation, accountability, clear roles, safe information, and a safe portfolio note.',
    coverFocus: 'Applying HRBA During Implementation',
    duration: 'Approx. 75-90 min',
    thumbnailSrc: '/assets/hrba/modules/module-4.png',
    thumbnailAlt: 'Module 4 cover image showing rights-based implementation through participation, feedback, accountability, safe adaptation, and follow-up.',
    startScreenId: 'M4-PLAYER-00',
    completionScreenId: 'M4-S1-14',
    contentAvailable: true,
  },
  {
    moduleId: 'module_05_hrba_meal',
    moduleSeq: 5,
    itemLabel: 'Module 5',
    title: 'HRBA in Monitoring, Evaluation, Accountability, and Learning',
    subtitle: 'Using Evidence for Accountability and Learning',
    description: 'Use safe evidence, feedback, indicators, stories, and reporting to support inclusion, learning, responsible adaptation, account-back, and honest claims. You will finish with a concise learning and future-support summary.',
    coverFocus: 'Practice using evidence to ask who was missed, what changed, what must be handled safely, how to account back, and what learning and support to carry forward.',
    duration: 'Approx. 60-75 min',
    thumbnailSrc: '/assets/hrba/modules/module-5.png',
    thumbnailAlt: 'Module 5 cover image showing HRBA MEAL through safe evidence, feedback response, ethical reporting, and responsible learning.',
    startScreenId: 'M5-PLAYER-00',
    completionScreenId: 'M5-PLAYER-COMPLETE',
    contentAvailable: true,
  },
  {
    moduleId: 'final_assessment',
    moduleSeq: 6,
    itemLabel: 'Final Assessment',
    title: 'Final Assessment',
    description: 'Complete a 10-question HRBA judgment assessment after finishing the five-module learning pathway. A score of 80% or higher marks the assessment complete locally.',
    coverFocus: 'Final HRBA Judgment Checkpoint',
    duration: 'Approx. 15-20 min',
    thumbnailSrc: '/assets/hrba/modules/final-assessment.png',
    thumbnailAlt: 'Final assessment cover image showing an applied HRBA checkpoint after the five-module learning pathway.',
    startScreenId: 'FINAL-ASSESSMENT-PLAYER-00',
    completionScreenId: 'FINAL-ASSESSMENT-COMPLETE',
    contentAvailable: true,
  },
];

export function getHRBAModuleById(moduleId: string | null): HRBAModuleDefinition | undefined {
  return HRBA_COURSE_MODULES.find((module) => module.moduleId === moduleId);
}
