export type JiruAmbaEntryKind = 'fact' | 'signal' | 'verificationQuestion';

export type JiruAmbaCaseEntry = {
  id: string;
  kind: JiruAmbaEntryKind;
  text: string;
  laterUse: string[];
};

export type JiruAmbaNamedItem = {
  id: string;
  label: string;
  description?: string;
};

export const jiruAmbaCase = {
  status: {
    id: 'case.status.fictional-draft-not-approved',
    fictional: true,
    approved: false,
    text: 'Jiru Amba is a fictional practice case. The final design has not yet been approved.',
  },
  setting: [
    { id: 'setting.small-town', label: 'A small town' },
    { id: 'setting.rural-kebeles', label: 'Several surrounding rural kebeles' },
    { id: 'setting.weekly-market', label: 'A weekly market' },
    { id: 'setting.water-service-points', label: 'Public water-service points' },
    { id: 'setting.health-post', label: 'A health post' },
    { id: 'setting.local-offices', label: 'Local administrative and service offices' },
    { id: 'setting.livelihood-training', label: 'Livelihood and training opportunities' },
    { id: 'setting.community-structures', label: 'Community and representative structures' },
  ] satisfies JiruAmbaNamedItem[],
  planAreas: [
    { id: 'plan.market-improvement', label: 'Market improvement', description: 'Improve parts of the weekly market area and support better conditions for local trading and small-scale livelihoods.' },
    { id: 'plan.water-service-repair', label: 'Water-service repair', description: 'Repair a public water-service point and support arrangements for its continued operation.' },
    { id: 'plan.youth-livelihood-training', label: 'Youth livelihood training', description: 'Provide livelihood-skills training for selected young people.' },
    { id: 'plan.health-post-improvement', label: 'Health-post improvement', description: 'Renovate selected parts of the health post and improve access to basic services.' },
    { id: 'plan.consultation-feedback', label: 'Consultation and feedback', description: 'Hold community consultation meetings and place feedback boxes at selected public or project locations.' },
  ] satisfies JiruAmbaNamedItem[],
  processFacts: [
    { id: 'process.draft-priorities', label: 'The first draft priorities were prepared after reviewing available service information and holding discussions with selected public actors, committee representatives, and local leaders.' },
    { id: 'process.information-channels', label: 'Information about the consultation was shared mainly through local offices, committees, and community representatives.' },
    { id: 'process.weekday-town-meeting', label: 'A consultation meeting was held in the town during a weekday.' },
    { id: 'process.attendance', label: 'Public actors, committee representatives, local leaders, and some representatives of community groups attended.' },
    { id: 'process.intended-groups', label: 'The draft refers to women, young people, persons with disabilities, market users, and residents of rural kebeles as intended participants or groups expected to benefit.' },
    { id: 'process.basic-plan-elements', label: 'The draft contains activity targets, a broad timeline, and basic output indicators.' },
    { id: 'process.feedback-arrangements', label: 'Feedback boxes and future public meetings are proposed as the main feedback arrangements.' },
    { id: 'process.details-not-agreed', label: 'Detailed responsibilities, participation methods, accessibility measures, budget implications, response arrangements, and monitoring questions have not yet been fully agreed.' },
  ] satisfies JiruAmbaNamedItem[],
  rightsHolders: [
    { id: 'rights-holder.women', label: 'Women', description: 'Including in the context of household water responsibilities and water-service decisions.' },
    { id: 'rights-holder.youth', label: 'Young people seeking fair access to livelihood opportunities' },
    { id: 'rights-holder.persons-with-disabilities', label: 'Persons with disabilities' },
    { id: 'rights-holder.market-vendors-informal-workers', label: 'Market vendors and informal workers' },
    { id: 'rights-holder.remote-rural-residents', label: 'Residents of remote rural kebeles' },
    { id: 'rights-holder.low-income-households', label: 'Low-income households' },
    { id: 'rights-holder.limited-information', label: 'People who may receive information late or through limited channels' },
  ] satisfies JiruAmbaNamedItem[],
  actors: [
    { id: 'actor.public.woreda-planning-team', label: 'Woreda planning team' },
    { id: 'actor.public.woreda-sector-services', label: 'Relevant woreda sector and service actors' },
    { id: 'actor.public.kebele-level', label: 'Kebele-level actors' },
    { id: 'actor.service.health-post-staff', label: 'Health-post staff' },
    { id: 'actor.service.water-service', label: 'Actors involved in the water service' },
    { id: 'actor.service.market-livelihood', label: 'Actors involved in market and livelihood activities' },
    { id: 'actor.community.committees', label: 'Committees with formal or practical roles' },
    { id: 'actor.community.representatives', label: 'Community representatives' },
    { id: 'actor.community.market-water-committees', label: 'Market and water committee members' },
    { id: 'actor.community.representative-structures', label: 'Women’s, youth, and disability representative structures' },
    { id: 'actor.community.elders-local-figures', label: 'Elders and respected local figures' },
    { id: 'actor.community.informal-intermediaries', label: 'Informal intermediaries' },
    { id: 'actor.community.supporting-organizations', label: 'Other local organizations and supporting actors' },
    { id: 'actor.cso.awra', label: 'Awra', description: 'The fictional local CSO supporting consultation and review of the draft design.' },
    { id: 'actor.cso.selam', label: 'Selam', description: 'An Awra programme officer who follows the case through Module 3.' },
  ] satisfies JiruAmbaNamedItem[],
  entries: [
    { id: 'case.fact.setting-mixed', kind: 'fact', text: 'Jiru Amba includes a small town and several surrounding rural kebeles.', laterUse: ['M3-R05', 'M3-R07'] },
    { id: 'case.fact.plan-five-areas', kind: 'fact', text: 'The draft proposes five main areas of work.', laterUse: ['M3-R05', 'M3-R14', 'M3-R17'] },
    { id: 'case.fact.consultation-held', kind: 'fact', text: 'A weekday consultation meeting was held in the town.', laterUse: ['M3-R05', 'M3-R12'] },
    { id: 'case.fact.design-details-incomplete', kind: 'fact', text: 'Detailed responsibilities, participation methods, accessibility measures, response arrangements, and monitoring questions have not yet been fully agreed.', laterUse: ['M3-R08', 'M3-R11', 'M3-R12', 'M3-R13'] },
    { id: 'case.fact.final-not-approved', kind: 'fact', text: 'The final design has not yet been approved.', laterUse: ['M3-R14', 'M3-R17'] },
    { id: 'case.signal.different-experiences', kind: 'signal', text: 'People may experience services, opportunities, and decision-making processes differently.', laterUse: ['M3-R05', 'M3-R07'] },
    { id: 'case.signal.information-timing', kind: 'signal', text: 'Some people may receive planning information later or through limited channels.', laterUse: ['M3-R05', 'M3-R07', 'M3-R12'] },
    { id: 'case.signal.accessibility-participation', kind: 'signal', text: 'Accessibility, distance, time, care, livelihood, and transport may affect participation.', laterUse: ['M3-R05', 'M3-R11', 'M3-R12'] },
    { id: 'case.verify.priority-barriers', kind: 'verificationQuestion', text: 'Which groups face the highest-priority barriers?', laterUse: ['M3-R05', 'M3-R07'] },
    { id: 'case.verify.actor-responsibility', kind: 'verificationQuestion', text: 'Which actor holds which specific responsibility?', laterUse: ['M3-R06', 'M3-R08'] },
    { id: 'case.verify.meaningful-participation', kind: 'verificationQuestion', text: 'Are the proposed participation and feedback arrangements meaningful, accessible, responsive, and safe?', laterUse: ['M3-R11', 'M3-R12', 'M3-R13'] },
    { id: 'case.verify.design-change', kind: 'verificationQuestion', text: 'Which findings should change the objective, activities, intervention logic, indicators, and implementation arrangements?', laterUse: ['M3-R14', 'M3-R17'] },
  ] satisfies JiruAmbaCaseEntry[],
  safetyRules: [
    { id: 'safety.fictional-first', label: 'Use the fictional Jiru Amba case first.' },
    { id: 'safety.generalized-own-context', label: 'Use only generalized, non-identifying information in optional own-context fields.' },
    { id: 'safety.no-sensitive-evidence', label: 'Do not enter sensitive or identifiable real-world evidence in the course.' },
  ] satisfies JiruAmbaNamedItem[],
} as const;

export const module3ApprovedCaseNarrativeParagraphs = [
  jiruAmbaCase.status.text,
  ...jiruAmbaCase.entries.filter((entry) => entry.kind === 'fact').map((entry) => entry.text),
];
