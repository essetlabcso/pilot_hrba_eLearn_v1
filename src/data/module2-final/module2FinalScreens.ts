import type {
  Module2FinalScreen,
  Module2FinalScreenId,
  Module2FinalSequenceItem,
} from './module2FinalTypes';

export const MODULE2_FINAL_TITLE = 'Module 2: HRBA Foundations — The Everyday Rights Lens';
export const MODULE2_FINAL_SUBTITLE =
  'Learn how to see community work through rights-holders, duty-bearers, participation, power, accountability, and safe standards.';

export const module2FinalScreens: Module2FinalScreen[] = [
  {
    id: 'M2-00',
    title: 'Module 2 Cover Screen',
    purpose: 'Provide a clean module entry screen with the final Module 2 title, cover image, subtitle, and start action.',
    kind: 'cover',
    route: '/module-2',
    buttonLabel: 'Start Module 2',
  },
  {
    id: 'M2-Intro',
    title: 'The Jiru Amba Initiative: A New Perspective',
    purpose: 'Introduce the opening Jiru Amba story through a stable video placeholder, transcript, and story-strip fallback.',
    kind: 'intro',
    route: '/module-2/intro-video',
    buttonLabel: 'Continue to Module 2 Content',
  },
  {
    id: 'M2-Objectives',
    title: 'Module 2 Learning Objectives',
    purpose: 'Orient learners to the final Module 2 objectives before the first numbered lesson screen.',
    kind: 'objectives',
    route: '/module-2/objectives',
    buttonLabel: 'Start the first lesson',
  },
  { id: '1.1', title: 'Welcome to Module 2', purpose: 'Begin the first approved numbered content screen after the module shell screens.', kind: 'lesson-placeholder', route: '/module-2/screen-1-1' },
  { id: '1.2', title: 'Evolving Our Approach', purpose: 'Introduce the shift from a needs-based lens to a human rights-based lens.', kind: 'lesson-placeholder', route: '/module-2/screen-1-2' },
  { id: '1.3', title: 'A Tale of Two Water Projects', purpose: 'Compare service-delivery and HRBA-informed ways of describing community work.', kind: 'lesson-placeholder', route: '/module-2/screen-1-3' },
  { id: '2.1', title: 'Who Holds the Rights?', purpose: 'Identify rights-holders and avoid broad beneficiary labels.', kind: 'lesson-placeholder', route: '/module-2/screen-2-1' },
  { id: '2.2', title: 'Who Bears the Duty?', purpose: 'Explain duty-bearers and the obligations to respect, protect, and fulfil rights.', kind: 'lesson-placeholder', route: '/module-2/screen-2-2' },
  { id: '2.3', title: 'CSOs as Enablers', purpose: 'Clarify CSO roles as enablers that support rights-holders and duty-bearer accountability.', kind: 'lesson-placeholder', route: '/module-2/screen-2-3' },
  { id: '3.1', title: 'The PANEL Principles', purpose: 'Introduce participation, accountability, non-discrimination, empowerment, and legality in practical CSO language.', kind: 'lesson-placeholder', route: '/module-2/screen-3-1' },
  { id: '3.2', title: 'Beyond the Roster', purpose: 'Distinguish meaningful participation from attendance or token representation.', kind: 'lesson-placeholder', route: '/module-2/screen-3-2' },
  { id: '3.3', title: 'Designing for Inclusion', purpose: 'Recognize barriers that block meaningful inclusion.', kind: 'lesson-placeholder', route: '/module-2/screen-3-3' },
  { id: '4.1', title: 'Unmasking Power', purpose: 'Introduce visible, hidden, and invisible power using an agricultural subsidy scenario.', kind: 'lesson-placeholder', route: '/module-2/screen-4-1' },
  { id: '4.2', title: 'Overlapping Barriers', purpose: 'Recognize how exclusion can compound for one rights-holder.', kind: 'lesson-placeholder', route: '/module-2/screen-4-2' },
  { id: '4.3', title: 'Navigating Customary Power', purpose: 'Plan respectful and safe engagement with informal power, including context-validated customary communication practices.', kind: 'lesson-placeholder', route: '/module-2/screen-4-3' },
  { id: '5.1', title: 'What is Accountability?', purpose: 'Explain accountability as more than a complaint box.', kind: 'lesson-placeholder', route: '/module-2/screen-5-1' },
  { id: '5.2', title: 'Constructive Engagement', purpose: 'Use safe evidence for constructive duty-bearer engagement rather than blame.', kind: 'lesson-placeholder', route: '/module-2/screen-5-2' },
  { id: '5.3', title: 'Simple-to-Understand Standards', purpose: 'Use rights standards safely, constructively, and in simple-to-understand language.', kind: 'lesson-placeholder', route: '/module-2/screen-5-3' },
  { id: '6.1', title: 'The Everyday Rights Lens', purpose: 'Synthesize the five foundational questions learners will carry forward.', kind: 'lesson-placeholder', route: '/module-2/screen-6-1' },
  { id: '6.2', title: 'Your Portfolio Snapshot', purpose: 'Retrieve saved Module 2 entries and prepare the Everyday Rights Lens Summary and offline card.', kind: 'portfolio-snapshot', route: '/module-2/portfolio-snapshot' },
  { id: 'M2-KC', title: 'Module 2 Knowledge Check', purpose: 'Assess the final Module 2 foundations before closure and handoff.', kind: 'knowledge-check', route: '/module-2/knowledge-check' },
  { id: 'M2-Close', title: 'Next Steps: Module 3', purpose: 'Use approved Screen 6.3 content as the final closure and Module 3 handoff after the knowledge check.', kind: 'close', route: '/module-2/close' },
];

export const module2FinalScreenIds = module2FinalScreens.map((screen) => screen.id);

export const module2FinalScreenById = Object.fromEntries(
  module2FinalScreens.map((screen) => [screen.id, screen]),
) as Record<Module2FinalScreenId, Module2FinalScreen>;

export const module2FinalRouteTargets = {
  ...Object.fromEntries(
    module2FinalScreens.map((screen) => [screen.route, {
      moduleId: 'module_02_everyday_cso_work',
      screenId: screen.id,
    }]),
  ),
  '/module-2/cover': {
    moduleId: 'module_02_everyday_cso_work',
    screenId: 'M2-00',
  },
} as Record<string, { moduleId: string; screenId: Module2FinalScreenId }>;

export const module2FinalScreenRoutes = Object.fromEntries(
  module2FinalScreens.map((screen) => [screen.id, screen.route]),
) as Record<Module2FinalScreenId, string>;

export const module2FinalSequence: Module2FinalSequenceItem[] = module2FinalScreens.map((screen, index) => ({
  Seq: index + 1,
  Layer: 'Layer 2 Player',
  'Screen/State ID': screen.id,
  'Screen/State Title': screen.title,
  'Learning/Purpose': screen.purpose,
  'Asset/Component': 'Module2FinalRenderer',
}));
