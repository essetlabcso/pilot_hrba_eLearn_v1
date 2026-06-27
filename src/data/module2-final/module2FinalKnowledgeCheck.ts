export interface Module2FinalKnowledgeCheckQuestion {
  id: string;
  prompt: string;
  scenario?: string;
  options: Array<{
    id: string;
    text: string;
    feedback: string;
  }>;
  correctOptionId: string;
  topic:
    | 'lens'
    | 'rights-holders'
    | 'duty-bearers'
    | 'cso-role'
    | 'panel'
    | 'participation'
    | 'power'
    | 'barriers'
    | 'accountability'
    | 'standards';
}

export const module2FinalKnowledgeCheckQuestions: Module2FinalKnowledgeCheckQuestion[] = [
  {
    id: 'm2kc-lens',
    topic: 'lens',
    prompt: 'Which statement best shows the shift from a needs-based lens to a rights-holder lens?',
    options: [
      {
        id: 'A',
        text: 'The CSO delivered supplies to beneficiaries and counted the items distributed.',
        feedback: 'This describes useful service delivery, but it does not yet show rights, agency, or public responsibility.',
      },
      {
        id: 'B',
        text: 'Rights-holders organized evidence and safely requested a public response from the responsible desk.',
        feedback: 'Correct. This connects agency, claims, evidence, and duty-bearer response.',
      },
      {
        id: 'C',
        text: 'The community waited for the CSO to solve the problem again.',
        feedback: 'This keeps the community dependent on repeated CSO substitution.',
      },
    ],
    correctOptionId: 'B',
  },
  {
    id: 'm2kc-actors',
    topic: 'duty-bearers',
    prompt: 'Which pairing best reflects Module 2 actor language?',
    options: [
      {
        id: 'A',
        text: 'Rights-holder: rural women seeking safe water access. Duty-bearer: Woreda Water Desk.',
        feedback: 'Correct. This names a specific rights-holder group and a public actor with responsibility.',
      },
      {
        id: 'B',
        text: 'Rights-holder: donor agency. Duty-bearer: project beneficiary.',
        feedback: 'This reverses the actor logic from the module.',
      },
      {
        id: 'C',
        text: 'Rights-holder: the CSO. Duty-bearer: the community.',
        feedback: 'CSOs have accountability responsibilities, but the state remains the primary duty-bearer.',
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'm2kc-cso-role',
    topic: 'cso-role',
    prompt: 'A water pump breaks again. What is the strongest HRBA-aligned CSO role?',
    options: [
      {
        id: 'A',
        text: 'Replace the pump quietly every year so the public office does not need to act.',
        feedback: 'This substitutes the state and can deepen dependency.',
      },
      {
        id: 'B',
        text: 'Act as a bridge: help rights-holders organize safe evidence and support constructive engagement with the water desk.',
        feedback: 'Correct. CSOs enable connection, capacity, evidence, and response without replacing the duty-bearer.',
      },
      {
        id: 'C',
        text: 'Start with public accusations before checking facts, risks, or dialogue options.',
        feedback: 'Module 2 emphasizes safe evidence and constructive engagement before escalation.',
      },
    ],
    correctOptionId: 'B',
  },
  {
    id: 'm2kc-panel',
    topic: 'panel',
    prompt: 'Which answer correctly describes the PANEL principles?',
    options: [
      {
        id: 'A',
        text: 'Participation, Accountability, Non-Discrimination, Empowerment, and Legality guide both what we do and how we do it.',
        feedback: 'Correct. PANEL is a practical checklist for rights-based process and decisions.',
      },
      {
        id: 'B',
        text: 'PANEL is mainly a donor reporting table for counting completed activities.',
        feedback: 'PANEL is not a reporting table; it guides rights-based practice.',
      },
      {
        id: 'C',
        text: 'PANEL only matters after the project design is finished.',
        feedback: 'PANEL should shape participation, accountability, and inclusion from the beginning.',
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'm2kc-participation',
    topic: 'participation',
    prompt: 'Which sign points to meaningful participation rather than token attendance?',
    options: [
      {
        id: 'A',
        text: 'People are invited after the plan is already complete.',
        feedback: 'Late invitation is usually weak participation.',
      },
      {
        id: 'B',
        text: 'People can access information, influence decisions, and receive follow-up.',
        feedback: 'Correct. Participation includes access, voice, influence, and response.',
      },
      {
        id: 'C',
        text: 'The attendance sheet has many names, but only a few people shape the decision.',
        feedback: 'Attendance alone does not show voice, safety, agency, or influence.',
      },
    ],
    correctOptionId: 'B',
  },
  {
    id: 'm2kc-power-barriers',
    topic: 'power',
    prompt: 'A young woman is present in a meeting but does not speak because social norms and meeting design signal that planning is for older community members. What is this mainly showing?',
    options: [
      {
        id: 'A',
        text: 'Invisible power shaping confidence, safety, and voice.',
        feedback: 'Correct. Invisible power includes norms and internalized beliefs that affect whether people feel able to speak.',
      },
      {
        id: 'B',
        text: 'Only visible power, because someone has a formal title.',
        feedback: 'Formal title is visible power, but this scenario focuses on norms and safety.',
      },
      {
        id: 'C',
        text: 'No power issue, because the meeting was open.',
        feedback: 'An open meeting can still contain hidden or invisible barriers.',
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'm2kc-overlapping-barriers',
    topic: 'barriers',
    prompt: 'Why does Module 2 use Chaltu’s story about displacement, disability, gender, and age?',
    options: [
      {
        id: 'A',
        text: 'To show that one broad label like “the community” can hide overlapping barriers.',
        feedback: 'Correct. Overlapping barriers require more specific analysis and intentional inclusion.',
      },
      {
        id: 'B',
        text: 'To ask learners to collect sensitive personal stories from real people.',
        feedback: 'The course repeatedly avoids collecting identifiable or sensitive details.',
      },
      {
        id: 'C',
        text: 'To prove that only one barrier matters at a time.',
        feedback: 'The point is the opposite: barriers can combine and intensify exclusion.',
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'm2kc-accountability-standards',
    topic: 'standards',
    prompt: 'Which statement best fits constructive accountability and plain-language standards?',
    options: [
      {
        id: 'A',
        text: 'Use safe evidence and plain standards to open respectful dialogue, request response, and support follow-up.',
        feedback: 'Correct. This matches constructive accountability and safe use of recognized standards.',
      },
      {
        id: 'B',
        text: 'Use complex legal accusations first so officials feel pressured before facts are checked.',
        feedback: 'Module 2 avoids unnecessary hostility and dense legal language.',
      },
      {
        id: 'C',
        text: 'Install a complaint box and assume accountability is complete.',
        feedback: 'A feedback channel is only one piece. Accountability also needs review, response, correction, and learning.',
      },
    ],
    correctOptionId: 'A',
  },
];
