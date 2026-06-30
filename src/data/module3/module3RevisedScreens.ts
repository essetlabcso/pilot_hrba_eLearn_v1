export type Module3RevisedInteractionType =
  | 'video'
  | 'text'
  | 'case-reader'
  | 'snapshot-preview'
  | 'builder'
  | 'classification'
  | 'matching'
  | 'multi-select'
  | 'single-select'
  | 'knowledge-check'
  | 'portfolio'
  | 'closure';

export type Module3RevisedScreen = {
  id: `M3-R${string}`;
  screenNumber: number;
  title: string;
  purpose: string;
  phase: string;
  eyebrow: string;
  interactionType: Module3RevisedInteractionType;
  continueLabel: string;
  nextId: `M3-R${string}` | 'M4-PLAYER-00';
};

export const MODULE3_REVISED_SCREENS: Module3RevisedScreen[] = [
  {
    id: 'M3-R01',
    screenNumber: 1,
    title: 'Applying HRBA in Project Design',
    purpose: 'Intro video screen that orients learners to applying HRBA before implementation begins.',
    phase: 'Part 1 of 7 · See the design problem',
    eyebrow: 'MODULE 3 · APPLYING HRBA IN PROJECT DESIGN',
    interactionType: 'video',
    continueLabel: 'Continue to the module roadmap',
    nextId: 'M3-R02',
  },
  {
    id: 'M3-R02',
    screenNumber: 2,
    title: 'What This Module Is About',
    purpose: 'Orientation screen that explains the module purpose, learning objectives, path, and final snapshot output.',
    phase: 'Part 1 of 7 · See the design problem',
    eyebrow: 'MODULE 3 · LEARNING ROADMAP',
    interactionType: 'text',
    continueLabel: 'Continue to the Jiru Amba case',
    nextId: 'M3-R03',
  },
  {
    id: 'M3-R03',
    screenNumber: 3,
    title: 'Meet the Jiru Amba Futures Plan',
    purpose: 'Anchor-case introduction with media support and access to the full written case narrative.',
    phase: 'Part 1 of 7 · See the design problem',
    eyebrow: 'MODULE 3 · SHARED PLANNING CASE',
    interactionType: 'case-reader',
    continueLabel: 'Continue to your design snapshot',
    nextId: 'M3-R04',
  },
  {
    id: 'M3-R04',
    screenNumber: 4,
    title: 'Your HRBA Project Design Improvement Snapshot',
    purpose: 'Preview the practical snapshot learners will build by the end of the module.',
    phase: 'Part 1 of 7 · See the design problem',
    eyebrow: 'MODULE 3 · DESIGN TOOL',
    interactionType: 'snapshot-preview',
    continueLabel: 'Continue to context and inequality analysis',
    nextId: 'M3-R05',
  },
  {
    id: 'M3-R05',
    screenNumber: 5,
    title: 'Context and Inequality Scan',
    purpose: 'Help learners identify context factors, inequality patterns, assumptions, and missing evidence before activities are chosen.',
    phase: 'Part 2 of 7 · Analyze before activities',
    eyebrow: 'MODULE 3 · CONTEXT AND INEQUALITY SCAN',
    interactionType: 'multi-select',
    continueLabel: 'Save scan and continue to standards and policy mapping',
    nextId: 'M3-R06',
  },
  {
    id: 'M3-R06',
    screenNumber: 6,
    title: 'Policy and Standards Map',
    purpose: 'Scaffold a standards and policy mapping step that uses HRBA commitments to ask better design questions.',
    phase: 'Part 2 of 7 · Analyze before activities',
    eyebrow: 'MODULE 3 · POLICY AND STANDARDS MAP',
    interactionType: 'matching',
    continueLabel: 'Save learning and continue to rights-holders and barriers',
    nextId: 'M3-R07',
  },
  {
    id: 'M3-R07',
    screenNumber: 7,
    title: 'Rights-Holders and Barriers',
    purpose: 'Move from broad community labels to specific rights-holders and practical, social, and power-related barriers.',
    phase: 'Part 3 of 7 · Identify rights-holders and barriers',
    eyebrow: 'MODULE 3 · RIGHTS-HOLDERS AND BARRIERS',
    interactionType: 'builder',
    continueLabel: 'Save learning and continue to duty-bearers and CSO roles',
    nextId: 'M3-R08',
  },
  {
    id: 'M3-R08',
    screenNumber: 8,
    title: 'Duty-Bearers, Supporting Actors, and CSO Roles',
    purpose: 'Practice mapping selected Jiru Amba barriers to responsible public actors, supporting actors, realistic CSO roles, and early capacity-gap hints.',
    phase: 'Part 4 of 7 · Clarify responsibility, power, and causes',
    eyebrow: 'MODULE 3 · DUTY-BEARERS AND ROLES',
    interactionType: 'builder',
    continueLabel: 'Save learning and continue to power and influence analysis',
    nextId: 'M3-R09',
  },
  {
    id: 'M3-R09',
    screenNumber: 9,
    title: 'Power and Influence Map',
    purpose: 'Practice mapping who can enable change, who may block it, and how rights-holder voice can be strengthened safely.',
    phase: 'Part 4 of 7 · Clarify responsibility, power, and causes',
    eyebrow: 'MODULE 3 · POWER AND INFLUENCE',
    interactionType: 'builder',
    continueLabel: 'Save learning and continue to root causes and capacity gaps',
    nextId: 'M3-R10',
  },
  {
    id: 'M3-R10',
    screenNumber: 10,
    title: 'Root Causes and Capacity Gaps',
    purpose: 'Move below visible problems to symptoms, immediate causes, root causes, and capacity gaps.',
    phase: 'Part 4 of 7 · Clarify responsibility, power, and causes',
    eyebrow: 'MODULE 3 · ROOT CAUSES AND CAPACITY GAPS',
    interactionType: 'classification',
    continueLabel: 'Save learning and continue to gender and disability design check',
    nextId: 'M3-R11',
  },
  {
    id: 'M3-R11',
    screenNumber: 11,
    title: 'Gender and Disability Design Check',
    purpose: 'Check whether gender and disability are missing, only mentioned, or built into the Jiru Amba design.',
    phase: 'Part 4 of 7 · Clarify responsibility, power, causes, and inclusion',
    eyebrow: 'MODULE 3 · GENDER AND DISABILITY DESIGN CHECK',
    interactionType: 'classification',
    continueLabel: 'Save learning and continue to participation and accountability pathway',
    nextId: 'M3-R12',
  },
  {
    id: 'M3-R12',
    screenNumber: 12,
    title: 'Participation and Accountability Pathway',
    purpose: 'Check whether people are only invited, or whether they can influence decisions and receive a response.',
    phase: 'Part 5 of 7 · Design participation, accountability, and safety',
    eyebrow: 'MODULE 3 · PARTICIPATION AND ACCOUNTABILITY',
    interactionType: 'builder',
    continueLabel: 'Save learning and continue to risk and do-no-harm',
    nextId: 'M3-R13',
  },
  {
    id: 'M3-R13',
    screenNumber: 13,
    title: 'Risk and Do-No-Harm in Project Design',
    purpose: 'Identify rights-based risks and mitigation actions before implementation.',
    phase: 'Part 5 of 7 · Design participation, accountability, and safety',
    eyebrow: 'MODULE 3 · RISK AND DO-NO-HARM',
    interactionType: 'builder',
    continueLabel: 'Save learning and continue to objective repair',
    nextId: 'M3-R14',
  },
  {
    id: 'M3-R14',
    screenNumber: 14,
    title: 'Repair the Objective',
    purpose: 'Choose a stronger HRBA-informed objective that responds to barriers, responsibilities, participation, and accountability.',
    phase: 'Part 5 of 7 · Repair the design',
    eyebrow: 'MODULE 3 · OBJECTIVE REPAIR',
    interactionType: 'builder',
    continueLabel: 'Save repaired objective and continue to activity repair',
    nextId: 'M3-R15',
  },
  {
    id: 'M3-R15',
    screenNumber: 15,
    title: 'Repair the Activity Package',
    purpose: 'Select an activity package that better fits the rights-based analysis and avoids activity-first design.',
    phase: 'Part 5 of 7 · Repair the design',
    eyebrow: 'MODULE 3 · ACTIVITY REPAIR',
    interactionType: 'builder',
    continueLabel: 'Save repaired activity package and continue to intervention logic',
    nextId: 'M3-R16',
  },
  {
    id: 'M3-R16',
    screenNumber: 16,
    title: 'Intervention Logic and Indicators',
    purpose: 'Connect analysis, objective, activities, outputs, outcomes, indicators, risk, and accountability.',
    phase: 'Part 5 of 7 · Repair the design',
    eyebrow: 'MODULE 3 · INTERVENTION LOGIC AND INDICATORS',
    interactionType: 'builder',
    continueLabel: 'Save intervention logic and continue to draft plan review',
    nextId: 'M3-R17',
  },
  {
    id: 'M3-R17',
    screenNumber: 17,
    title: 'Open the Draft Plan',
    purpose: 'Open selected Jiru Amba draft proposal sections and mark which sections need a closer HRBA check.',
    phase: 'Part 6 of 7 · Test the design through a realistic proposal case',
    eyebrow: 'MODULE 3 · PROPOSAL REVIEW STUDIO',
    interactionType: 'builder',
    continueLabel: 'Save review preview and continue to HRBA gap map',
    nextId: 'M3-R18',
  },
  {
    id: 'M3-R18',
    screenNumber: 18,
    title: 'Find the HRBA Gaps Across the Plan',
    purpose: 'Scan the draft plan for gaps across analysis, rights-holders, participation, accountability, inclusion, risk, logic, and indicators.',
    phase: 'Part 6 of 7 · Test the design through a realistic proposal case',
    eyebrow: 'MODULE 3 · PROPOSAL REVIEW STUDIO',
    interactionType: 'builder',
    continueLabel: 'Save HRBA gap map and continue to section repair',
    nextId: 'M3-R19',
  },
  {
    id: 'M3-R19',
    screenNumber: 19,
    title: 'Repair One Plan Section',
    purpose: 'Choose the strongest rights-based revision of one weak draft plan section.',
    phase: 'Part 6 of 7 · Test the design through a realistic proposal case',
    eyebrow: 'MODULE 3 · PROPOSAL REVIEW STUDIO',
    interactionType: 'builder',
    continueLabel: 'Save repaired section and continue to applied knowledge check',
    nextId: 'M3-R20',
  },
  {
    id: 'M3-R20',
    screenNumber: 20,
    title: 'Module 3 Applied Knowledge Check',
    purpose: 'Short applied knowledge check covering the Jiru Amba case and key design judgments from the module.',
    phase: 'Part 7 of 7 · Check, save, and carry forward',
    eyebrow: 'MODULE 3 · APPLIED CHECK',
    interactionType: 'knowledge-check',
    continueLabel: 'Continue to your design snapshot',
    nextId: 'M3-R21',
  },
  {
    id: 'M3-R21',
    screenNumber: 21,
    title: 'My HRBA Project Design Improvement Snapshot',
    purpose: 'Portfolio/output screen with eight concise fields for the final HRBA Project Design Improvement Snapshot.',
    phase: 'Part 7 of 7 · Check, save, and carry forward',
    eyebrow: 'MODULE 3 · PORTFOLIO SNAPSHOT',
    interactionType: 'portfolio',
    continueLabel: 'Save snapshot and complete Module 3',
    nextId: 'M3-R22',
  },
  {
    id: 'M3-R22',
    screenNumber: 22,
    title: 'Module 3 Closure',
    purpose: 'Confirm Module 3 completion and bridge forward to Module 4 implementation.',
    phase: 'Part 7 of 7 · Check, save, and carry forward',
    eyebrow: 'MODULE 3 · COMPLETE',
    interactionType: 'closure',
    continueLabel: 'Start Module 4',
    nextId: 'M4-PLAYER-00',
  },
];

export const module3RevisedRouteTargets = Object.fromEntries([
  ['/module-3', { moduleId: 'module_03_project_design', screenId: 'M3-PLAYER-00' }],
  ['/module-3/cover', { moduleId: 'module_03_project_design', screenId: 'M3-PLAYER-00' }],
  ...MODULE3_REVISED_SCREENS.map((screen) => [
    `/module-3/screen-3-${screen.screenNumber}`,
    { moduleId: 'module_03_project_design', screenId: screen.id },
  ]),
]);

export const module3RevisedScreenRoutes: Record<string, string> = {
  'M3-PLAYER-00': '/module-3/cover',
  ...Object.fromEntries(
    MODULE3_REVISED_SCREENS.map((screen) => [screen.id, `/module-3/screen-3-${screen.screenNumber}`]),
  ),
};

export const module3PlayerSequence = [
  {
    Layer: 'Layer 2 Player',
    'Screen/State ID': 'M3-PLAYER-00',
    'Screen/State Title': 'Module 3 Cover Screen',
    'Learning/Purpose': 'Launch Module 3: Applying HRBA in Project Design.',
  },
  ...MODULE3_REVISED_SCREENS.map((screen) => ({
    Layer: 'Layer 2 Player',
    'Screen/State ID': screen.id,
    'Screen/State Title': screen.title,
    'Learning/Purpose': screen.purpose,
  })),
];

export function getModule3RevisedScreen(screenId: string | null | undefined) {
  return MODULE3_REVISED_SCREENS.find((screen) => screen.id === screenId);
}
