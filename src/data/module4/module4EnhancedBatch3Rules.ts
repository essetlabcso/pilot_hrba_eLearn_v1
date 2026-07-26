export const BATCH3_ROLE_ASSIGNMENTS: Readonly<Record<string, string>> = Object.freeze({
  info_share: 'coordinate',
  interim_agree: 'coordinate',
  tech_inspect: 'duty_bearer',
  replace_desk: 'avoid',
  doc_request: 'cso_directly',
});

export const BATCH3_SUPPORT_CLASSIFICATIONS: Readonly<Record<string, string>> = Object.freeze({
  sig1: 'access_scheduling',
  sig2: 'communication_understanding',
  sig3: 'follow_up_inclusion',
  sig4: 'follow_up_inclusion',
  sig5: 'communication_understanding',
});

export const BATCH3_PATHWAY_MATCHES: Readonly<Record<string, string>> = Object.freeze({
  sit1: 'adjust',
  sit2: 'engage',
  sit3: 'protect',
});

export const BATCH3_PATHWAY_DECISIONS: Readonly<Record<string, string>> = Object.freeze({
  adjust: 'change_timing_format',
  engage: 'agree_action_role_date',
  protect: 'pause_protect_process',
});

export function matchesExpected(
  actual: Record<string, string>,
  expected: Readonly<Record<string, string>>,
) {
  const entries = Object.entries(expected);
  return entries.every(([key, value]) => actual[key] === value);
}

export function isScreen9RoleMappingCorrect(assignments: Record<string, string>) {
  return matchesExpected(assignments, BATCH3_ROLE_ASSIGNMENTS);
}

export function isScreen9FollowUpComplete(values: {
  followUpWho: string;
  followUpWhen: string;
  followUpPurpose: string;
  followUpDocumented: string;
  followUpInformed: string;
  formalTriggers: string[];
}) {
  return values.followUpWho === 'water_desk'
    && values.followUpWhen === '14_days'
    && values.followUpPurpose === 'confirm_time'
    && values.followUpDocumented === 'follow_up_note'
    && values.followUpInformed === 'meeting_update'
    && sameStringSet(values.formalTriggers, ['repeated_fail', 'impacts_continue', 'remedy_required']);
}

export function isScreen10DiagnosisCorrect(classifications: Record<string, string>) {
  return matchesExpected(classifications, BATCH3_SUPPORT_CLASSIFICATIONS);
}

export function isScreen10ConditionalSupportCorrect(values: {
  condition1: string;
  condition2: string;
  condition3: string;
}) {
  return values.condition1 === 'clearer_example'
    && values.condition2 === 'send_message'
    && values.condition3 === 'review_strengthen';
}

export function isScreen11MatchCorrect(matches: Record<string, string>) {
  return matchesExpected(matches, BATCH3_PATHWAY_MATCHES);
}

export function isScreen11DecisionPracticeCorrect(decisions: Record<string, string>) {
  return matchesExpected(decisions, BATCH3_PATHWAY_DECISIONS);
}

export function isScreen12MinimumInformationCorrect(values: string[]) {
  return sameStringSet(values, ['reviewed', 'assigned', 'explained', 'followed_up']);
}

export function isScreen12NoteCorrect(values: {
  improveFields: string[];
  limitation: string;
  nextSteps: string[];
}) {
  return sameStringSet(values.improveFields, ['owner', 'explanation', 'follow_up'])
    && values.limitation === 'loop_completed'
    && sameStringSet(values.nextSteps, ['review_updated', 'explain_group']);
}

export function canCompleteBatch3Screen(saved: boolean, reviewRequired: boolean) {
  return saved && !reviewRequired;
}

export function shouldRestartBatch3Review(reviewRequired: boolean, saved: boolean) {
  return reviewRequired && saved;
}

function sameStringSet(values: string[], expected: readonly string[]) {
  return values.length === expected.length && expected.every((item) => values.includes(item));
}
