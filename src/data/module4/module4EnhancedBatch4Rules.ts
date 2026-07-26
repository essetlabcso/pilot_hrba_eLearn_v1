import {
  updateModule4Field,
  type Module4EnhancedState,
  type Module4FieldKey,
  type Module4ImplementationNote,
  type Module4Workstream,
} from './module4EnhancedModel.ts';

export const MODULE4_NOTE_FIELDS = [
  'concern',
  'evidence',
  'affectedPeople',
  'response',
  'rolesAndInclusion',
  'participationAction',
  'accountBack',
  'followUpQuestion',
  'responsibleActor',
  'reviewPoint',
] as const;

export type Module4NoteField = typeof MODULE4_NOTE_FIELDS[number];
export type CompleteModule4ImplementationNote = Required<Module4ImplementationNote>;
export type Module4PracticeInsightSection =
  | 'practiceWater'
  | 'practiceYouth'
  | 'practiceConsultation';
export type Module4NoteSection = Module4NoteField | Module4PracticeInsightSection;

export const MODULE4_NOTE_LABELS: Readonly<Record<Module4NoteField, string>> = Object.freeze({
  concern: 'Selected implementation concern',
  evidence: 'Confirmed evidence and remaining uncertainty',
  affectedPeople: 'Who is affected or may be excluded',
  response: 'Chosen response',
  rolesAndInclusion: 'Awra’s role and other actors’ responsibilities',
  participationAction: 'Participation or inclusion action',
  accountBack: 'Account-back action',
  followUpQuestion: 'Follow-up question',
  responsibleActor: 'Responsible actor',
  reviewPoint: 'Review point or timing',
});

const WORKSTREAM_LABELS: Readonly<Record<Exclude<Module4Workstream, ''>, string>> = {
  market: 'Market access and layout',
  water_service: 'Water service access',
  youth_livelihoods: 'Youth livelihoods and training',
  health_post: 'Health-post accessibility',
  consultation_feedback: 'Consultation and feedback',
};

const WORKSTREAM_PROFILES: Readonly<Record<
  Exclude<Module4Workstream, ''>,
  { responsibleActor: string; awraRole: string }
>> = {
  market: {
    responsibleActor: 'Market committee or responsible local authority',
    awraRole: 'Document access barriers, support inclusive participation and follow up with the responsible authority',
  },
  water_service: {
    responsibleActor: 'Woreda Water Desk',
    awraRole: 'Document service-access concerns, communicate with affected groups and support follow-up',
  },
  youth_livelihoods: {
    responsibleActor: 'Youth livelihoods programme or training provider',
    awraRole: 'Document access barriers, support inclusive participation and follow up on agreed adjustments',
  },
  health_post: {
    responsibleActor: 'Health-post management or responsible public service actor',
    awraRole: 'Document accessibility concerns, support inclusive participation and follow up with the responsible actor',
  },
  consultation_feedback: {
    responsibleActor: 'Responsible CSO or local decision-making body',
    awraRole: 'Document participation barriers, support safe feedback and follow up on agreed changes',
  },
};

const BASE_SECTION_DEPENDENCIES: Readonly<Record<Module4NoteSection, readonly Module4FieldKey[]>> = {
  concern: ['selectedWorkstream'],
  evidence: ['evidenceClassifications', 'unresolvedQuestions'],
  affectedPeople: ['participationDecisions'],
  response: ['selectedResponsePathway', 'feedbackAccountBackActions'],
  rolesAndInclusion: ['selectedWorkstream'],
  participationAction: ['participationDecisions'],
  accountBack: ['feedbackAccountBackActions'],
  followUpQuestion: ['unresolvedQuestions'],
  responsibleActor: ['selectedWorkstream'],
  reviewPoint: ['feedbackAccountBackActions'],
  practiceWater: ['actorResponsibilities', 'engagementDecisions'],
  practiceYouth: ['supportDiagnosis'],
  practiceConsultation: ['minimumNecessaryInformation'],
};

const PATHWAY_LABELS = {
  adjust: 'Adjust now',
  engage: 'Engage and agree',
  protect: 'Protect and use another process',
} as const;

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function humanize(value: string): string {
  return value
    .replaceAll('|', ', ')
    .replaceAll('_', ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/(^|[.!?]\s+)([a-z])/g, (_match, prefix: string, letter: string) => `${prefix}${letter.toUpperCase()}`);
}

function meaningfulObjectValues(
  value: Record<string, string>,
  excluded: readonly string[] = [],
): string[] {
  const excludedValues = new Set(excluded);
  return [...new Set(
    Object.values(value)
      .flatMap((entry) => clean(entry).split('|'))
      .map(humanize)
      .filter((entry) => entry && !excludedValues.has(entry.toLowerCase())),
  )];
}

function joinParts(parts: Array<string | undefined>): string {
  return parts.map((part) => clean(part)).filter(Boolean).join(' ');
}

export function normalizeImplementationNote(
  value: Module4ImplementationNote,
): CompleteModule4ImplementationNote {
  return {
    concern: clean(value.concern),
    evidence: clean(value.evidence),
    affectedPeople: clean(value.affectedPeople),
    response: clean(value.response),
    rolesAndInclusion: clean(value.rolesAndInclusion),
    participationAction: clean(value.participationAction),
    accountBack: clean(value.accountBack),
    followUpQuestion: clean(value.followUpQuestion),
    responsibleActor: clean(value.responsibleActor),
    reviewPoint: clean(value.reviewPoint),
  };
}

export function assembleImplementationDecisionNote(
  state: Module4EnhancedState,
): CompleteModule4ImplementationNote {
  const fields = state.fields;
  const workstream = fields.selectedWorkstream.value;
  const workstreamLabel = workstream ? WORKSTREAM_LABELS[workstream] : '';
  const evidenceEntries = fields.evidenceClassifications.reviewRequired
    ? []
    : Object.entries(fields.evidenceClassifications.value);
  const confirmedEvidence = evidenceEntries
    .filter(([, value]) => value === 'selected' || value === 'confirmed')
    .map(([key]) => humanize(key.split(':').at(-1) || key));
  const uncertainty = fields.unresolvedQuestions.reviewRequired
    ? []
    : fields.unresolvedQuestions.value.map(humanize).filter(Boolean);
  const participation = fields.participationDecisions.reviewRequired
    ? {}
    : fields.participationDecisions.value;
  const accountBack = fields.feedbackAccountBackActions.reviewRequired
    ? {}
    : fields.feedbackAccountBackActions.value;
  const pathway = fields.selectedResponsePathway.reviewRequired
    ? ''
    : fields.selectedResponsePathway.value;
  const profile = workstream ? WORKSTREAM_PROFILES[workstream] : undefined;
  const waterResponsibilities = workstream === 'water_service'
    && !fields.actorResponsibilities.reviewRequired
    ? fields.actorResponsibilities.value
    : undefined;
  const responsibleActor = clean(waterResponsibilities?.responsibleActor)
    ? humanize(waterResponsibilities?.responsibleActor || '')
    : profile?.responsibleActor || '';
  const awraRole = clean(waterResponsibilities?.awraRole)
    ? humanize(waterResponsibilities?.awraRole || '')
    : profile?.awraRole || '';

  const affected = meaningfulObjectValues(participation, [
    'selected',
    'not selected',
    'responsible supported',
  ]).slice(0, 3);
  const inclusion = meaningfulObjectValues(participation, [
    'selected',
    'not selected',
    'responsible supported',
  ]).slice(3, 6);
  const accountBackParts = meaningfulObjectValues(accountBack).slice(0, 3);

  return {
    concern: workstreamLabel
      ? `${workstreamLabel}: confirm that implementation matches the agreed rights-based design.`
      : '',
    evidence: joinParts([
      confirmedEvidence.length ? `Confirmed: ${confirmedEvidence.join(', ')}.` : '',
      uncertainty.length ? `Still to confirm: ${uncertainty.join(' ')}` : '',
    ]),
    affectedPeople: affected.length ? affected.join('; ') : '',
    response: joinParts([
      pathway ? `${PATHWAY_LABELS[pathway]}.` : '',
      clean(accountBack.response) ? humanize(accountBack.response) : '',
    ]),
    rolesAndInclusion: joinParts([
      awraRole ? `Awra: ${awraRole}.` : '',
      responsibleActor ? `Other actor: ${responsibleActor}.` : '',
    ]),
    participationAction: inclusion.length
      ? inclusion.join('; ')
      : clean(participation.measures)
        ? humanize(participation.measures)
        : '',
    accountBack: accountBackParts.length ? accountBackParts.join('; ') : '',
    followUpQuestion: uncertainty[0] || '',
    responsibleActor,
    reviewPoint: clean(accountBack.followUp) ? humanize(accountBack.followUp) : '',
  };
}

export const MODULE4_PRACTICE_INSIGHTS = Object.freeze([
  {
    section: 'practiceWater',
    label: 'Practice insight from the Water Service example',
    text: 'Clarify responsibility boundaries, engage the duty-bearer constructively and agree a documented follow-up point.',
  },
  {
    section: 'practiceYouth',
    label: 'Practice insight from the Youth Livelihoods example',
    text: 'Diagnose access and communication barriers before adding capacity support, then review whether adjustments work.',
  },
  {
    section: 'practiceConsultation',
    label: 'Practice insight from the Consultation and Feedback example',
    text: 'Use only the minimum information needed to assign, explain and follow up; do not collect unnecessary personal details.',
  },
] as const satisfies ReadonlyArray<{
  section: Module4PracticeInsightSection;
  label: string;
  text: string;
}>);

export function implementationNoteSectionDependencies(
  state: Module4EnhancedState,
): Readonly<Record<Module4NoteSection, readonly Module4FieldKey[]>> {
  if (state.fields.selectedWorkstream.value !== 'water_service') {
    return BASE_SECTION_DEPENDENCIES;
  }
  return {
    ...BASE_SECTION_DEPENDENCIES,
    rolesAndInclusion: ['selectedWorkstream', 'actorResponsibilities'],
    responsibleActor: ['selectedWorkstream', 'actorResponsibilities'],
  };
}

function hasMeaningfulSavedNote(state: Module4EnhancedState): boolean {
  const field = state.fields.implementationDecisionNote;
  return Boolean(field.updatedAt) && isImplementationDecisionNoteComplete(field.value);
}

function sectionRevisionSnapshot(
  state: Module4EnhancedState,
): Partial<Record<Module4NoteSection, Partial<Record<Module4FieldKey, number>>>> {
  const dependencies = implementationNoteSectionDependencies(state);
  return Object.fromEntries(
    Object.entries(dependencies).map(([section, keys]) => [
      section,
      Object.fromEntries(keys.map((key) => [key, state.fields[key].revision])),
    ]),
  );
}

export function missingImplementationNoteFields(
  note: Module4ImplementationNote,
): Module4NoteField[] {
  const normalized = normalizeImplementationNote(note);
  return MODULE4_NOTE_FIELDS.filter((key) => !normalized[key]);
}

export function isImplementationDecisionNoteComplete(
  note: Module4ImplementationNote,
): boolean {
  return missingImplementationNoteFields(note).length === 0;
}

export function affectedImplementationNoteSections(
  state: Module4EnhancedState,
): Module4NoteSection[] {
  const dependencies = implementationNoteSectionDependencies(state);
  if (!hasMeaningfulSavedNote(state)) {
    return (Object.keys(dependencies) as Module4NoteSection[]).filter((section) =>
      dependencies[section].some((key) => state.fields[key].reviewRequired));
  }
  const stored = state.fields.implementationDecisionNote.sectionDependencyRevisions;
  if (!stored) return Object.keys(dependencies) as Module4NoteSection[];
  return (Object.keys(dependencies) as Module4NoteSection[]).filter((section) =>
    dependencies[section].some((key) =>
      stored[section]?.[key] !== state.fields[key].revision));
}

export type SaveImplementationNoteOptions = {
  updatedAt?: string;
  learnerEditedSections?: readonly Module4NoteField[];
  resolvedSections?: readonly Module4NoteSection[];
};

export function saveImplementationDecisionNote(
  state: Module4EnhancedState,
  note: Module4ImplementationNote,
  options: string | SaveImplementationNoteOptions = {},
): Module4EnhancedState {
  const normalized = normalizeImplementationNote(note);
  if (!isImplementationDecisionNoteComplete(normalized)) return state;
  const normalizedOptions = typeof options === 'string' ? { updatedAt: options } : options;
  const affected = affectedImplementationNoteSections(state);
  const resolved = new Set(normalizedOptions.resolvedSections || []);
  if (affected.some((section) => !resolved.has(section))) return state;
  const updatedAt = normalizedOptions.updatedAt || new Date().toISOString();

  const updated = updateModule4Field(
    state,
    'implementationDecisionNote',
    normalized,
    {
      learnerEdited: true,
      sourceScreenId: 'M4-S1-12',
      updatedAt,
    },
  );
  const sectionDependencyRevisions = sectionRevisionSnapshot(updated);
  const dependencyRevisions = Object.fromEntries(
    [...new Set(Object.values(implementationNoteSectionDependencies(updated)).flat())]
      .map((key) => [key, updated.fields[key].revision]),
  );

  return {
    ...updated,
    fields: {
      ...updated.fields,
      implementationDecisionNote: {
        ...updated.fields.implementationDecisionNote,
        dependencyRevisions,
        sectionDependencyRevisions,
        learnerEditedSections: [...new Set(normalizedOptions.learnerEditedSections || [])],
      },
    },
  };
}

export function canContinueFromImplementationNote(
  state: Module4EnhancedState,
  draft: Module4ImplementationNote,
): boolean {
  const field = state.fields.implementationDecisionNote;
  return isImplementationDecisionNoteComplete(draft)
    && !field.reviewRequired
    && affectedImplementationNoteSections(state).length === 0
    && JSON.stringify(normalizeImplementationNote(field.value))
      === JSON.stringify(normalizeImplementationNote(draft));
}
