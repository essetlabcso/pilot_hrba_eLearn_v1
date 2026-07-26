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

const NOTE_DEPENDENCIES = [
  'selectedWorkstream',
  'evidenceClassifications',
  'unresolvedQuestions',
  'participationDecisions',
  'actorResponsibilities',
  'engagementDecisions',
  'feedbackAccountBackActions',
  'supportDiagnosis',
  'selectedResponsePathway',
  'minimumNecessaryInformation',
] as const satisfies readonly Module4FieldKey[];

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
  const evidenceEntries = Object.entries(fields.evidenceClassifications.value);
  const confirmedEvidence = evidenceEntries
    .filter(([, value]) => value === 'selected' || value === 'confirmed')
    .map(([key]) => humanize(key.split(':').at(-1) || key));
  const uncertainty = fields.unresolvedQuestions.value.map(humanize).filter(Boolean);
  const participation = fields.participationDecisions.value;
  const responsibilities = fields.actorResponsibilities.value;
  const engagement = fields.engagementDecisions.value;
  const accountBack = fields.feedbackAccountBackActions.value;
  const support = fields.supportDiagnosis.value;
  const minimumInformation = fields.minimumNecessaryInformation.value.map(humanize).filter(Boolean);
  const pathway = fields.selectedResponsePathway.value;

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
      minimumInformation.length ? `Use only: ${minimumInformation.join(' ')}` : '',
      uncertainty.length ? `Still to confirm: ${uncertainty.join(' ')}` : '',
    ]),
    affectedPeople: affected.length ? affected.join('; ') : '',
    response: joinParts([
      pathway ? `${PATHWAY_LABELS[pathway]}.` : '',
      support.firstResponse ? humanize(support.firstResponse) : '',
      support.conditionalAdjustments ? humanize(support.conditionalAdjustments) : '',
    ]),
    rolesAndInclusion: joinParts([
      responsibilities.awraRole ? `Awra: ${humanize(responsibilities.awraRole)}.` : '',
      responsibilities.responsibleActor
        ? `Other actor: ${humanize(responsibilities.responsibleActor)}.`
        : '',
    ]),
    participationAction: inclusion.length
      ? inclusion.join('; ')
      : clean(participation.measures)
        ? humanize(participation.measures)
        : '',
    accountBack: accountBackParts.length ? accountBackParts.join('; ') : '',
    followUpQuestion: uncertainty[0]
      || (clean(engagement.followUpPurpose) ? humanize(engagement.followUpPurpose) : ''),
    responsibleActor: clean(responsibilities.responsibleActor)
      ? humanize(responsibilities.responsibleActor)
      : '',
    reviewPoint: joinParts([
      clean(engagement.followUpWhen) ? humanize(engagement.followUpWhen) : '',
      clean(engagement.reviewTiming) ? humanize(engagement.reviewTiming) : '',
      clean(support.reviewCommitment) ? humanize(support.reviewCommitment) : '',
    ]),
  };
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
  savedNote: Module4ImplementationNote,
): Module4NoteField[] {
  if (!state.fields.implementationDecisionNote.reviewRequired) return [];
  const assembled = assembleImplementationDecisionNote(state);
  const saved = normalizeImplementationNote(savedNote);
  const changed = MODULE4_NOTE_FIELDS.filter((key) => assembled[key] !== saved[key]);
  return changed.length ? changed : ['concern', 'evidence', 'response', 'reviewPoint'];
}

export function saveImplementationDecisionNote(
  state: Module4EnhancedState,
  note: Module4ImplementationNote,
  updatedAt = new Date().toISOString(),
): Module4EnhancedState {
  const normalized = normalizeImplementationNote(note);
  if (!isImplementationDecisionNoteComplete(normalized)) return state;

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
  const dependencyRevisions = Object.fromEntries(
    NOTE_DEPENDENCIES.map((key) => [key, updated.fields[key].revision]),
  );

  return {
    ...updated,
    fields: {
      ...updated.fields,
      implementationDecisionNote: {
        ...updated.fields.implementationDecisionNote,
        dependencyRevisions,
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
    && JSON.stringify(normalizeImplementationNote(field.value))
      === JSON.stringify(normalizeImplementationNote(draft));
}
