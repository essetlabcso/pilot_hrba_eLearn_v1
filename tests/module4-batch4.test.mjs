import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  createInitialModule4EnhancedState,
  migrateModule4EnhancedState,
  recordModule4EnhancedScreenCompletion,
  updateModule4Field,
} from '../src/data/module4/module4EnhancedModel.ts';
import {
  MODULE4_NOTE_FIELDS,
  MODULE4_PRACTICE_INSIGHTS,
  affectedImplementationNoteSections,
  assembleImplementationDecisionNote,
  canContinueFromImplementationNote,
  implementationNoteSectionDependencies,
  isImplementationDecisionNoteComplete,
  missingImplementationNoteFields,
  saveImplementationDecisionNote,
} from '../src/data/module4/module4EnhancedBatch4Rules.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

function read(relativePath) {
  return readFileSync(resolve(repoRoot, relativePath), 'utf8');
}

function completedUpstreamState(workstream = 'water_service') {
  let state = createInitialModule4EnhancedState('2026-07-26T08:00:00.000Z');
  state = updateModule4Field(state, 'selectedWorkstream', workstream, {
    learnerEdited: true,
    sourceScreenId: 'M4-S1-04',
  });
  state = updateModule4Field(state, 'evidenceClassifications', {
    [`screen6:${workstream}:published_criteria`]: 'selected',
    [`screen6:${workstream}:rumour`]: 'not_selected',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-05' });
  state = updateModule4Field(state, 'unresolvedQuestions', [
    'Confirm why the service schedule changed.',
    'Confirm the responsible actor and review date.',
  ], { learnerEdited: true, sourceScreenId: 'M4-S1-05' });
  state = updateModule4Field(state, 'participationDecisions', {
    perspectives: 'women_caregivers|persons_with_disabilities|remote_households',
    measures: 'accessible_meeting|transport_support|plain_language_update',
    explanationChannels: 'community_meeting|notice_board',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-06' });
  state = updateModule4Field(state, 'feedbackAccountBackActions', {
    response: 'Explain the agreed action and its limits',
    accountBack: 'Update affected groups through accessible channels',
    followUp: 'Record the response and next review point',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-07' });
  state = updateModule4Field(state, 'actorResponsibilities', {
    responsibleActor: 'Woreda Water Desk',
    awraRole: 'Coordinate communication, document the issue and support follow-up',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-08' });
  state = updateModule4Field(state, 'engagementDecisions', {
    followUpPurpose: 'Confirm the repair commitment and access arrangements',
    followUpWhen: 'After the agreed update date',
    reviewTiming: 'Review again within fourteen days',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-08' });
  state = updateModule4Field(state, 'supportDiagnosis', {
    firstResponse: 'Adjust access arrangements now',
    conditionalAdjustments: 'Engage the responsible actor if the barrier remains',
    reviewCommitment: 'Review access after the next service update',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-09' });
  state = updateModule4Field(state, 'selectedResponsePathway', 'engage', {
    learnerEdited: true,
    sourceScreenId: 'M4-S1-10',
  });
  return updateModule4Field(state, 'minimumNecessaryInformation', [
    'Record whether the concern was reviewed, assigned and explained back.',
    'Do not collect names or personal histories.',
  ], { learnerEdited: true, sourceScreenId: 'M4-S1-11' });
}

test('Batch 4 remains on canonical Screen 13 beside the approved final-screen renderers', () => {
  const renderer = read('src/components/course/Module4Renderer.tsx');
  assert.match(renderer, /Module4EnhancedBatch4/);
  assert.match(renderer, /screenId === 'M4-S1-12'.*Module4EnhancedBatch4/);
  assert.match(renderer, /screenId === 'M4-S1-13'.*Module4EnhancedKnowledgeCheck/);
  assert.match(renderer, /screenId === 'M4-S1-14'.*Module4EnhancedCompletion/);
});

test('complete Screens 5-12 state assembles every required note section', () => {
  const state = completedUpstreamState();
  const note = assembleImplementationDecisionNote(state);

  assert.deepEqual(missingImplementationNoteFields(note), []);
  assert.equal(isImplementationDecisionNoteComplete(note), true);
  assert.match(note.concern, /Water service access/);
  assert.match(note.evidence, /Published criteria/);
  assert.match(note.evidence, /Still to confirm/);
  assert.match(note.affectedPeople, /Women caregivers/);
  assert.match(note.response, /Engage and agree/);
  assert.match(note.rolesAndInclusion, /Awra:/);
  assert.match(note.participationAction, /Accessible meeting/);
  assert.match(note.accountBack, /Explain the agreed action/);
  assert.match(note.followUpQuestion, /Confirm why the service schedule changed/);
  assert.match(note.responsibleActor, /Woreda Water Desk/);
  assert.match(note.reviewPoint, /next review point/i);
  assert.doesNotMatch(note.evidence, /minimum-information|personal histories/i);
  assert.doesNotMatch(note.response, /access arrangements|barrier remains/i);
});

test('Health Post, Market and Water Service produce coherent main notes', () => {
  const expectations = [
    ['health_post', /Health-post accessibility/, /Health-post management/, /accessibility concerns/],
    ['market', /Market access and layout/, /Market committee/, /access barriers/],
    ['water_service', /Water service access/, /Woreda Water Desk/, /document the issue/],
  ];
  for (const [workstream, concern, actor, role] of expectations) {
    const state = completedUpstreamState(workstream);
    const note = assembleImplementationDecisionNote(state);
    assert.match(note.concern, concern);
    assert.match(note.responsibleActor, actor);
    assert.match(note.rolesAndInclusion, role);
    if (workstream !== 'water_service') assert.doesNotMatch(JSON.stringify(note), /Woreda Water Desk/);
    if (workstream !== 'youth_livelihoods') assert.doesNotMatch(JSON.stringify(note), /training provider/);
    assert.equal(isImplementationDecisionNoteComplete(note), true);
    assert.doesNotMatch(JSON.stringify(note), /minimum-information|personal histories/i);
  }
});

test('fixed scenarios are exposed only as brief labelled practice insights', () => {
  assert.deepEqual(
    MODULE4_PRACTICE_INSIGHTS.map(({ label }) => label),
    [
      'Practice insight from the Water Service example',
      'Practice insight from the Youth Livelihoods example',
      'Practice insight from the Consultation and Feedback example',
    ],
  );
  assert.ok(MODULE4_PRACTICE_INSIGHTS.every(({ text }) => text.length < 180));
  const healthNote = assembleImplementationDecisionNote(
    updateModule4Field(completedUpstreamState(), 'selectedWorkstream', 'health_post', {
      learnerEdited: true,
      sourceScreenId: 'M4-S1-04',
    }),
  );
  assert.doesNotMatch(JSON.stringify(healthNote), /Water Desk|training|minimum information/i);
});

test('missing upstream information is identified and can be completed without new analysis state', () => {
  const state = createInitialModule4EnhancedState('2026-07-26T08:00:00.000Z');
  const assembled = assembleImplementationDecisionNote(state);
  assert.deepEqual(missingImplementationNoteFields(assembled), MODULE4_NOTE_FIELDS);

  const completed = Object.fromEntries(
    MODULE4_NOTE_FIELDS.map((key) => [key, `Safe concise ${key}`]),
  );
  assert.equal(isImplementationDecisionNoteComplete(completed), true);
});

test('learner edits save without recording progress and survive hydration', () => {
  const upstream = completedUpstreamState();
  const note = {
    ...assembleImplementationDecisionNote(upstream),
    followUpQuestion: 'Learner-authored question about access after repair.',
    responsibleActor: 'Learner-confirmed Water Desk focal point',
    reviewPoint: 'Learner-selected review at the next community update',
  };
  const saved = saveImplementationDecisionNote(
    upstream,
    note,
    {
      updatedAt: '2026-07-26T08:30:00.000Z',
      learnerEditedSections: ['followUpQuestion', 'responsibleActor', 'reviewPoint'],
    },
  );

  assert.equal(saved.fields.implementationDecisionNote.reviewRequired, false);
  assert.equal(saved.fields.implementationDecisionNote.learnerEdited, true);
  assert.deepEqual(saved.fields.implementationDecisionNote.value, note);
  assert.deepEqual(saved.fields.implementationDecisionNote.learnerEditedSections, [
    'followUpQuestion',
    'responsibleActor',
    'reviewPoint',
  ]);
  assert.equal(saved.screens['M4-S1-12'].gateSatisfied, false);
  assert.equal(canContinueFromImplementationNote(saved, note), true);

  const migrated = migrateModule4EnhancedState({
    practiceCheckState: { module4Enhanced: saved },
    screenProgress: { module_04_implementation: [] },
    completedModules: [],
    appliedAt: '2026-07-26T08:35:00.000Z',
  });
  const hydrated = migrated.practiceCheckState.module4Enhanced;
  assert.deepEqual(hydrated.fields.implementationDecisionNote.value, note);
  assert.equal(hydrated.fields.implementationDecisionNote.reviewRequired, false);
  assert.equal(canContinueFromImplementationNote(hydrated, note), true);
});

test('minimum-information revision affects only its practice insight and preserves authored follow-up', () => {
  const upstream = completedUpstreamState();
  const note = {
    ...assembleImplementationDecisionNote(upstream),
    followUpQuestion: 'Preserve this learner-authored follow-up question.',
  };
  const saved = saveImplementationDecisionNote(upstream, note);
  const changed = updateModule4Field(saved, 'minimumNecessaryInformation', [
    'Use the updated minimum-information record only.',
  ], { learnerEdited: true, sourceScreenId: 'M4-S1-11' });

  assert.equal(changed.fields.implementationDecisionNote.reviewRequired, true);
  assert.equal(
    changed.fields.implementationDecisionNote.value.followUpQuestion,
    'Preserve this learner-authored follow-up question.',
  );
  assert.equal(canContinueFromImplementationNote(changed, note), false);
  assert.deepEqual(affectedImplementationNoteSections(changed), ['practiceConsultation']);
});

test('stale sections cannot be reconfirmed and snapshots advance only after every affected section resolves', () => {
  const upstream = completedUpstreamState();
  const original = {
    ...assembleImplementationDecisionNote(upstream),
    reviewPoint: 'Learner-authored review point',
  };
  const saved = saveImplementationDecisionNote(upstream, original);
  const changed = updateModule4Field(saved, 'selectedWorkstream', 'health_post', {
    learnerEdited: true,
    sourceScreenId: 'M4-S1-04',
  });
  assert.equal(changed.fields.implementationDecisionNote.reviewRequired, true);
  const affected = affectedImplementationNoteSections(changed);
  assert.deepEqual(affected, ['concern', 'rolesAndInclusion', 'responsibleActor']);

  const reconfirmedNote = {
    ...original,
    concern: assembleImplementationDecisionNote(changed).concern,
    rolesAndInclusion: assembleImplementationDecisionNote(changed).rolesAndInclusion,
    responsibleActor: assembleImplementationDecisionNote(changed).responsibleActor,
  };
  const staleAttempt = saveImplementationDecisionNote(
    changed,
    reconfirmedNote,
    {
      updatedAt: '2026-07-26T09:00:00.000Z',
      learnerEditedSections: ['reviewPoint'],
    },
  );
  assert.equal(staleAttempt.fields.implementationDecisionNote.reviewRequired, true);
  assert.equal(
    staleAttempt.fields.implementationDecisionNote.sectionDependencyRevisions.concern.selectedWorkstream,
    saved.fields.selectedWorkstream.revision,
  );

  const partiallyResolved = saveImplementationDecisionNote(
    changed,
    reconfirmedNote,
    { resolvedSections: ['concern', 'rolesAndInclusion'] },
  );
  assert.equal(partiallyResolved.fields.implementationDecisionNote.reviewRequired, true);

  const reconfirmed = saveImplementationDecisionNote(
    changed,
    reconfirmedNote,
    {
      updatedAt: '2026-07-26T09:00:00.000Z',
      learnerEditedSections: ['reviewPoint'],
      resolvedSections: affected,
    },
  );
  assert.equal(reconfirmed.fields.implementationDecisionNote.reviewRequired, false);
  assert.equal(
    reconfirmed.fields.implementationDecisionNote.dependencyRevisions.selectedWorkstream,
    reconfirmed.fields.selectedWorkstream.revision,
  );
  assert.equal(reconfirmed.fields.implementationDecisionNote.value.reviewPoint, original.reviewPoint);
  assert.equal(canContinueFromImplementationNote(reconfirmed, reconfirmedNote), true);
});

test('responsibility revisions affect only responsibility-related sections for the selected scenario', () => {
  const water = completedUpstreamState();
  const note = assembleImplementationDecisionNote(water);
  const saved = saveImplementationDecisionNote(water, note, {
    learnerEditedSections: ['followUpQuestion'],
  });
  const changed = updateModule4Field(saved, 'actorResponsibilities', {
    responsibleActor: 'Updated Water Desk focal role',
    awraRole: 'Preserved coordination role',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-08' });
  assert.deepEqual(affectedImplementationNoteSections(changed), [
    'rolesAndInclusion',
    'responsibleActor',
    'practiceWater',
  ]);
  assert.equal(
    changed.fields.implementationDecisionNote.value.followUpQuestion,
    note.followUpQuestion,
  );

  const market = completedUpstreamState('market');
  const marketSaved = saveImplementationDecisionNote(market, assembleImplementationDecisionNote(market));
  const marketChanged = updateModule4Field(marketSaved, 'actorResponsibilities', {
    responsibleActor: 'Changed fixed water actor',
  }, { learnerEdited: true, sourceScreenId: 'M4-S1-08' });
  assert.deepEqual(affectedImplementationNoteSections(marketChanged), ['practiceWater']);
});

test('section provenance mapping is explicit and unrelated edits remain valid', () => {
  const state = completedUpstreamState();
  const mapping = implementationNoteSectionDependencies(state);
  assert.deepEqual(mapping.evidence, ['evidenceClassifications', 'unresolvedQuestions']);
  assert.deepEqual(mapping.response, ['selectedResponsePathway', 'feedbackAccountBackActions']);
  assert.deepEqual(mapping.practiceConsultation, ['minimumNecessaryInformation']);
  assert.ok(!mapping.followUpQuestion.includes('minimumNecessaryInformation'));
});

test('progress is recorded only at the final validated Continue gate', () => {
  const upstream = completedUpstreamState();
  const note = assembleImplementationDecisionNote(upstream);
  const saved = saveImplementationDecisionNote(upstream, note);
  const container = {
    screenProgress: { module_04_implementation: [] },
    module4Enhanced: saved,
  };

  const beforeGate = recordModule4EnhancedScreenCompletion(
    container,
    'M4-S1-12',
    false,
  );
  assert.deepEqual(beforeGate.screenProgress.module_04_implementation, []);
  assert.equal(beforeGate.module4Enhanced.screens['M4-S1-12'].gateSatisfied, false);

  const afterGate = recordModule4EnhancedScreenCompletion(
    container,
    'M4-S1-12',
    canContinueFromImplementationNote(saved, note),
  );
  assert.deepEqual(afterGate.screenProgress.module_04_implementation, ['M4-S1-12']);
  assert.equal(afterGate.module4Enhanced.screens['M4-S1-12'].gateSatisfied, true);

  const repeatedGate = recordModule4EnhancedScreenCompletion(
    afterGate,
    'M4-S1-12',
    canContinueFromImplementationNote(afterGate.module4Enhanced, note),
  );
  assert.deepEqual(repeatedGate.screenProgress.module_04_implementation, ['M4-S1-12']);
});

test('Screen 13 uses three semantic stages, no runtime image, and responsive scoped CSS', () => {
  const component = read('src/components/course/module4/Module4EnhancedBatch4.tsx');
  const css = read('src/components/course/module4/module4-enhanced.css');

  assert.match(component, /Stage 1 of 3/);
  assert.match(component, /Stage 2 of 3/);
  assert.match(component, /Stage 3 of 3/);
  assert.match(component, /role="alert"/);
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /type="checkbox"/);
  assert.match(component, /Carried forward/);
  assert.match(component, /Learner edited/);
  assert.match(component, /Practice insight/);
  assert.match(component, /Needs review/);
  assert.doesNotMatch(component, /<img|MODULE4_ENHANCED_ASSETS/);
  assert.match(css, /\.m4-enhanced-screen--batch4/);
  assert.match(css, /@media \(max-width: 390px\)/);
  assert.match(css, /grid-template-columns: 1fr/);
  assert.match(css, /overflow-wrap: anywhere/);
  assert.match(css, /@media \(forced-colors: active\)/);
});
