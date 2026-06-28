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
    id: 'm2kc-needs-rights-lens',
    topic: 'lens',
    prompt: 'A local CSO notices that a specific neighborhood is suffering from severe food insecurity after a drought. How would a CSO applying a rights-holder lens respond?',
    options: [
      {
        id: 'A',
        text: 'Quickly divert internal CSO funds to purchase and distribute food rations until the drought ends.',
        feedback: "Partial/Risky. This is a needs-based charity response. While it provides urgent relief, it does not build the community's capacity to claim their rights from duty-bearers.",
      },
      {
        id: 'B',
        text: 'Support the affected households to organize and present a formal request for emergency agricultural extension support from the local administration.',
        feedback: 'Strong HRBA choice. A rights-holder lens empowers the community to actively claim their entitlements.',
      },
      {
        id: 'C',
        text: 'Conduct a rapid needs assessment to measure exactly how much food is missing to request emergency relief supplies from international donors.',
        feedback: 'Partial. While assessing needs for donors is common practice, a rights-based approach focuses on empowering rights-holders to engage duty-bearers for structural solutions.',
      },
    ],
    correctOptionId: 'B',
  },
  {
    id: 'm2kc-rights-duty-bearers',
    topic: 'duty-bearers',
    prompt: "A community's only primary school lacks safe sanitation facilities for girls. The parents' committee wants to fix this. In an HRBA framework, who is the primary duty-bearer responsible for ensuring the school meets health and safety standards?",
    options: [
      {
        id: 'A',
        text: 'The Woreda Education Desk and regional public authorities.',
        feedback: 'Strong HRBA choice. The State and its public institutions are the primary duty-bearers responsible for respecting, protecting, and fulfilling human rights.',
      },
      {
        id: 'B',
        text: 'An international NGO that frequently funds education projects in the area.',
        feedback: 'Needs adjustment. NGOs, CSOs, and parents are supporting actors or rights-holders, not the primary duty-bearers.',
      },
      {
        id: 'C',
        text: 'The parents’ committee and local community members.',
        feedback: 'Needs adjustment. NGOs, CSOs, and parents are supporting actors or rights-holders, not the primary duty-bearers.',
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'm2kc-cso-enablers',
    topic: 'cso-role',
    prompt: 'A vital bridge connecting a rural village to the local market is washed away. The Kebele administration currently has no budget to fix it. What is the most constructive way for a CSO to act as an enabler?',
    options: [
      {
        id: 'A',
        text: 'Hire a private construction company to rebuild the bridge immediately using CSO donor funds.',
        feedback: 'Risky if used alone. This substitutes the state and relieves the duty-bearer of their responsibility.',
      },
      {
        id: 'B',
        text: 'Submit a formal written complaint demanding the local administration repair the bridge immediately, without checking their current budget status.',
        feedback: 'Risky. Submitting a firm demand without checking facts or constraints can create hostility.',
      },
      {
        id: 'C',
        text: 'Offer technical support to the Kebele administration to help them draft an emergency infrastructure budget request to higher regional authorities.',
        feedback: 'Strong HRBA choice. By offering technical support to overwhelmed officials, the CSO builds duty-bearer capacity and acts as a constructive bridge.',
      },
    ],
    correctOptionId: 'C',
  },
  {
    id: 'm2kc-panel-non-discrimination',
    topic: 'panel',
    prompt: 'A CSO is launching a new public health awareness campaign. How can they best apply the HRBA principle of Non-Discrimination and Equality?',
    options: [
      {
        id: 'A',
        text: "Deliver the campaign in the region's most widely spoken language so it reaches the maximum number of people quickly.",
        feedback: 'Needs adjustment. Serving the majority while overlooking groups facing barriers deepens inequality. Equal treatment does not mean identical treatment.',
      },
      {
        id: 'B',
        text: 'Actively identify groups facing barriers, such as linguistic minorities or persons with hearing impairments, and design tailored communication methods for them.',
        feedback: 'Strong HRBA choice. True equality requires proactive steps to remove barriers for groups historically excluded.',
      },
      {
        id: 'C',
        text: 'Distribute the exact same standardized health brochure to every household to ensure everyone receives equal treatment.',
        feedback: 'Needs adjustment. Serving the majority while overlooking groups facing barriers deepens inequality. Equal treatment does not mean identical treatment.',
      },
    ],
    correctOptionId: 'B',
  },
  {
    id: 'm2kc-token-meaningful',
    topic: 'participation',
    prompt: 'A local health office invites 50 community members to a meeting about a new clinic. The officials present the finalized blueprints and ask the community to sign an attendance sheet. What level of participation is this?',
    options: [
      {
        id: 'A',
        text: 'Meaningful influence, because diverse groups were physically present in the room when the project was launched.',
        feedback: 'Needs adjustment. Physical presence and one-way information sharing do not guarantee voice.',
      },
      {
        id: 'B',
        text: 'Token attendance, because the community had no early opportunity to safely shape or alter the decisions.',
        feedback: 'Strong HRBA choice. Informing people of a pre-made decision is tokenism. Meaningful participation requires safe, early involvement where people can actually influence the project.',
      },
      {
        id: 'C',
        text: 'Consultation, because the officials successfully shared their technical plans directly with the public.',
        feedback: 'Needs adjustment. Physical presence and one-way information sharing do not guarantee voice.',
      },
    ],
    correctOptionId: 'B',
  },
  {
    id: 'm2kc-power-types',
    topic: 'power',
    prompt: 'A new woreda agricultural training program is formally open to everyone. However, a female farmer does not attend because she has grown up believing that managing farm business is "men\'s work" and feels she has no authority to participate. What type of power dynamic is keeping her away?',
    options: [
      {
        id: 'A',
        text: 'Visible Power.',
        feedback: 'Needs adjustment. Visible power involves formal rules.',
      },
      {
        id: 'B',
        text: 'Hidden Power.',
        feedback: 'Needs adjustment. Hidden power involves informal networks and gatekeepers.',
      },
      {
        id: 'C',
        text: 'Invisible Power.',
        feedback: 'Strong HRBA choice. Invisible power involves long-standing social expectations and internalized beliefs that cause people to censor themselves.',
      },
    ],
    correctOptionId: 'C',
  },
  {
    id: 'm2kc-overlapping-barriers',
    topic: 'barriers',
    prompt: 'A young man living in a remote village has a physical mobility impairment. Which statement best reflects an HRBA understanding of his situation?',
    options: [
      {
        id: 'A',
        text: 'Providing a wheelchair should be the main response, because mobility is the most visible barrier.',
        feedback: 'Needs adjustment. Treating only one barrier ignores how multiple barriers combine to prevent access.',
      },
      {
        id: 'B',
        text: 'His distance from services, his age, and his physical impairment overlap to create a compounded experience of exclusion.',
        feedback: 'Strong HRBA choice. Intersectionality means recognizing that multiple barriers, like geography, age, and disability, combine and overlap.',
      },
      {
        id: 'C',
        text: 'His geographic location is a general community issue and should be addressed separately from his specific disability needs.',
        feedback: 'Needs adjustment. Treating only one barrier ignores how multiple barriers combine to prevent access.',
      },
    ],
    correctOptionId: 'B',
  },
  {
    id: 'm2kc-customary-influence',
    topic: 'power',
    prompt: 'A CSO wants to ensure the voices of young women are heard regarding a local water project, but community decisions are traditionally guided by a respected community council where older men often lead discussions. What is the most HRBA-aligned approach?',
    options: [
      {
        id: 'A',
        text: 'Work only through formal woreda administration channels to bypass the community council and reduce the risk of exclusion.',
        feedback: 'Risky if used alone. Bypassing customary systems misses immense social capital and can create defensiveness.',
      },
      {
        id: 'B',
        text: 'Rely on the community council to guide who speaks at the gathering to ensure smooth project implementation and avoid local friction.',
        feedback: 'Risky if used alone. Relying solely on informal gatekeepers risks hidden exclusion.',
      },
      {
        id: 'C',
        text: 'Respectfully engage the community council as allies, while actively establishing context-validated, safe channels for the young women to share their input directly.',
        feedback: 'Strong HRBA choice. A strong HRBA approach bridges formal and informal systems while intentionally safeguarding inclusion.',
      },
    ],
    correctOptionId: 'C',
  },
  {
    id: 'm2kc-constructive-accountability',
    topic: 'accountability',
    prompt: 'A community realizes that subsidized seeds meant for their kebele were misallocated. How should a CSO support constructive accountability?',
    options: [
      {
        id: 'A',
        text: 'Help the community use a simple scorecard tool to organize safe, objective evidence and request a formal review from the agriculture desk.',
        feedback: 'Strong HRBA choice. Constructive accountability uses safe evidence to open productive dialogue, helping duty-bearers correct gaps.',
      },
      {
        id: 'B',
        text: 'Escalate the issue directly to the regional or federal government level to force a fast intervention from higher authorities.',
        feedback: 'Risky. Escalating without organizing local evidence or pursuing dialogue can break down relationships.',
      },
      {
        id: 'C',
        text: 'Place a suggestion box outside the kebele office so farmers can drop in their complaints, without setting a specific timeline for response.',
        feedback: 'Partial. A suggestion box without a process for closing the loop, including review, response, and correction, does not create real accountability.',
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'm2kc-simple-standards',
    topic: 'standards',
    prompt: 'A CSO is helping a community write a letter to the local health bureau requesting maternal care services. Which phrasing represents the best use of simple-to-understand rights standards?',
    options: [
      {
        id: 'A',
        text: '"We hope you can find it in your heart to grant some medical supplies to help the mothers in our village survive this difficult time."',
        feedback: 'Needs adjustment. This relies on a charity/needs-based lens and strips rights-holders of their agency.',
      },
      {
        id: 'B',
        text: '"We request equitable access to maternal care in line with the recognized public service responsibilities of the health bureau."',
        feedback: "Strong HRBA choice. This frames the request respectfully but firmly connects it to the duty-bearer's recognized responsibilities.",
      },
      {
        id: 'C',
        text: '"We formally declare non-compliance with recognized legal standards and request immediate corrective action."',
        feedback: 'Needs adjustment. Using overly technical or adversarial legal jargon can create a roadblock.',
      },
    ],
    correctOptionId: 'B',
  },
];
