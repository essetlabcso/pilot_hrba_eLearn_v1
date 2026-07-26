import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  MODULE5_BATCH1_PRESENTATION_CONTENT_REVISION,
  MODULE5_BATCH1_PRESENTATION_SCREEN_IDS,
  MODULE5_BATCH2_PRESENTATION_SCREEN_IDS,
  MODULE5_PRESENTATION_CONTENT,
  MODULE5_PRESENTATION_CONTENT_REVISION,
  isModule5KnowledgeAnswerCorrect,
} from '../src/data/module5/module5PresentationContent.ts';
import {
  MODULE5_ID,
  MODULE5_SCREEN_ROUTES,
  createEmptyModule5PresentationState,
  ensureModule5PresentationState,
  migrateModule5PracticeState,
  migrateModule5PresentationScreenProgress,
} from '../src/data/module5/module5EnhancedModel.ts';

const expected = [
  ['M5-R01', 2, 'Why HRBA Matters in MEAL', '2F9_x3WF2sQ', '/module-5/screen-5-1'],
  ['M5-R02', 3, 'Learning Objectives and MEAL Roadmap', 'RKqECrl4PQs', '/module-5/screen-5-2'],
  ['M5-R03', 4, 'The MEAL Cycle Through an HRBA Lens', 'B0Y988AKdeg', '/module-5/screen-5-3'],
  ['M5-R04', 5, 'Planning MEAL: Define Results, Success and Learning Questions', 'VsYQSEEejv4', '/module-5/screen-5-4'],
];

const expectedBatch2 = [
  ['M5-R05', 6, 'Monitoring: Build Rights-Based Indicators', 'i6rVGG6reGo', '/module-5/screen-5-5'],
  ['M5-R06', 7, 'Data Collection: Choose the Right Methods', 'Qo4Tf5Jv9JI', '/module-5/screen-5-6'],
  ['M5-R07', 8, 'Safe Disaggregation and Ethical Data Collection', 'TtvXvb00UH0', '/module-5/screen-5-7'],
  ['M5-R08', 9, 'Data Management: Organize, Clean and Protect Evidence', 'RwnBCFx2tfI', '/module-5/screen-5-8'],
];

test('Batch 1 config preserves exact canonical IDs, routes, titles and public videos', () => {
  assert.deepEqual([...MODULE5_BATCH1_PRESENTATION_SCREEN_IDS], expected.map(([id]) => id));
  for (const [screenId, number, title, videoId, route] of expected) {
    const entry = MODULE5_PRESENTATION_CONTENT[screenId];
    assert.equal(entry.number, number);
    assert.equal(entry.title, title);
    assert.equal(entry.videoId, videoId);
    assert.equal(entry.embedUrl, `https://www.youtube-nocookie.com/embed/${videoId}`);
    assert.equal(entry.watchUrl, `https://youtu.be/${videoId}`);
    assert.equal(MODULE5_SCREEN_ROUTES[screenId], route);
    assert.ok(entry.accessibilitySummary.length > 400);
  }
});

test('every Batch 1 screen has the approved stable question IDs and exact-set validation', () => {
  for (const entry of Object.values(MODULE5_PRESENTATION_CONTENT)) {
    assert.deepEqual(
      entry.questions.map((question, index) => question.id),
      [1, 2, 3].map((number) => `M5-S${String(entry.number).padStart(2, '0')}-KC0${number}`),
    );
    for (const question of entry.questions) {
      assert.equal(isModule5KnowledgeAnswerCorrect(question, question.correctOptionIds), true);
      assert.equal(isModule5KnowledgeAnswerCorrect(question, []), false);
      assert.equal(isModule5KnowledgeAnswerCorrect(question, [question.options[0].id]), question.correctOptionIds.length === 1 && question.correctOptionIds[0] === question.options[0].id);
    }
  }
  const multiple = MODULE5_PRESENTATION_CONTENT['M5-R01'].questions[2];
  assert.equal(multiple.type, 'multiple');
  assert.deepEqual(multiple.correctOptionIds, ['B', 'C', 'D']);
  assert.equal(isModule5KnowledgeAnswerCorrect(multiple, ['B', 'C']), false);
  assert.equal(isModule5KnowledgeAnswerCorrect(multiple, ['D', 'B', 'C']), true);
  assert.equal(isModule5KnowledgeAnswerCorrect(multiple, ['A', 'B', 'C', 'D']), false);
});

test('Batch 2 config preserves exact canonical IDs, routes, titles, videos and question IDs', () => {
  assert.deepEqual([...MODULE5_BATCH2_PRESENTATION_SCREEN_IDS], expectedBatch2.map(([id]) => id));
  for (const [screenId, number, title, videoId, route] of expectedBatch2) {
    const entry = MODULE5_PRESENTATION_CONTENT[screenId];
    assert.equal(entry.number, number);
    assert.equal(entry.title, title);
    assert.equal(entry.videoId, videoId);
    assert.equal(entry.embedUrl, `https://www.youtube-nocookie.com/embed/${videoId}`);
    assert.equal(entry.watchUrl, `https://youtu.be/${videoId}`);
    assert.equal(MODULE5_SCREEN_ROUTES[screenId], route);
    assert.deepEqual(
      entry.questions.map((question, index) => question.id),
      [1, 2, 3].map((questionNumber) => `M5-S${String(number).padStart(2, '0')}-KC0${questionNumber}`),
    );
    assert.ok(entry.accessibilitySummary.length > 400);
  }
});

test('Batch 2 knowledge checks require exact reviewed answers and retain approved feedback', () => {
  for (const screenId of MODULE5_BATCH2_PRESENTATION_SCREEN_IDS) {
    const entry = MODULE5_PRESENTATION_CONTENT[screenId];
    for (const question of entry.questions) {
      assert.equal(question.type, 'single');
      assert.equal(question.options.length, 4);
      assert.equal(isModule5KnowledgeAnswerCorrect(question, question.correctOptionIds), true);
      assert.equal(isModule5KnowledgeAnswerCorrect(question, []), false);
      const incorrect = question.options.find((item) => !question.correctOptionIds.includes(item.id));
      assert.equal(isModule5KnowledgeAnswerCorrect(question, [incorrect.id]), false);
      assert.ok(question.options.every((item) => item.feedback.length > 20));
    }
  }
});

test('only core carry-forward reflections are required', () => {
  const expectedRequired = {
    'M5-R01': ['M5-S02-R01', 'M5-S02-R02'],
    'M5-R02': ['M5-S03-R01', 'M5-S03-R03'],
    'M5-R03': ['M5-S04-R01', 'M5-S04-R02'],
    'M5-R04': ['M5-S05-R01', 'M5-S05-R02', 'M5-S05-R03', 'M5-S05-R04'],
  };
  for (const screenId of MODULE5_BATCH1_PRESENTATION_SCREEN_IDS) {
    const entry = MODULE5_PRESENTATION_CONTENT[screenId];
    assert.deepEqual(entry.reflections.filter((item) => item.required).map((item) => item.id), expectedRequired[screenId]);
    for (const reflection of entry.reflections) {
      assert.equal(reflection.required, Boolean(reflection.carryForwardField));
    }
  }
  assert.equal(MODULE5_PRESENTATION_CONTENT['M5-R02'].reflections.find((item) => item.id === 'M5-S03-R02').required, false);
  assert.equal(MODULE5_PRESENTATION_CONTENT['M5-R03'].reflections.find((item) => item.id === 'M5-S04-R03').required, false);
});

test('Batch 2 requires only carry-forward reflections and uses constrained text where no source options exist', () => {
  const expectedRequired = {
    'M5-R05': ['M5-S06-R01', 'M5-S06-R02'],
    'M5-R06': ['M5-S07-R02', 'M5-S07-R03'],
    'M5-R07': ['M5-S08-R01', 'M5-S08-R02', 'M5-S08-R03'],
    'M5-R08': ['M5-S09-R01', 'M5-S09-R02', 'M5-S09-R03'],
  };
  for (const screenId of MODULE5_BATCH2_PRESENTATION_SCREEN_IDS) {
    const entry = MODULE5_PRESENTATION_CONTENT[screenId];
    assert.deepEqual(entry.reflections.filter((item) => item.required).map((item) => item.id), expectedRequired[screenId]);
    for (const reflection of entry.reflections) {
      assert.equal(reflection.required, Boolean(reflection.carryForwardField));
    }
  }
  assert.equal(MODULE5_PRESENTATION_CONTENT['M5-R07'].reflections[0].control, 'short-text');
  assert.equal(MODULE5_PRESENTATION_CONTENT['M5-R08'].reflections[1].control, 'short-text');
  assert.match(MODULE5_PRESENTATION_CONTENT['M5-R07'].safeInputGuidance, /raw organisational datasets/);
  assert.match(MODULE5_PRESENTATION_CONTENT['M5-R08'].safeInputGuidance, /confidential complaints/);
});

test('new presentation state is additive, versioned and contains no duplicate completion flag', () => {
  const state = createEmptyModule5PresentationState();
  assert.equal(state.contentRevision, MODULE5_PRESENTATION_CONTENT_REVISION);
  assert.deepEqual(state.screens, {});
  assert.equal('moduleCompleted' in state, false);
  assert.equal('enhancedJourneyCompleted' in state, false);
  assert.equal(state.finalKnowledgeCheck.revision, 'pending-content-approval');
});

test('incomplete legacy learners retain old work but receive empty current answers', () => {
  const practice = {
    module3_unrelated: { keep: true },
    m5_s02: { answers: { old: ['answer'] }, status: 'completed' },
  };
  const migrated = migrateModule5PracticeState({
    practiceCheckState: practice,
    screenProgress: { [MODULE5_ID]: ['M5-R01', 'M5-R02', 'M5-R05'] },
    completedModules: [],
  });
  assert.deepEqual(migrated.m5_s02, practice.m5_s02);
  assert.deepEqual(migrated.module3_unrelated, { keep: true });
  assert.equal(migrated.module5Presentation.migration.legacyWorkspacePresent, true);
  assert.deepEqual(migrated.module5Presentation.screens, {});
  assert.equal(JSON.stringify(migrated.module5Presentation).includes('old'), false);

  const progress = migrateModule5PresentationScreenProgress({
    practiceCheckState: practice,
    screenProgress: { [MODULE5_ID]: ['M5-R01', 'M5-R02', 'M5-R05'] },
    completedModules: [],
  });
  assert.deepEqual(progress[MODULE5_ID], []);
});

test('historically completed Module 5 remains complete and keeps its canonical progress', () => {
  const input = {
    practiceCheckState: { m5_s16: { status: 'completed', completedAt: '2026-07-01T00:00:00.000Z' } },
    screenProgress: { [MODULE5_ID]: ['M5-R01', 'M5-R02', 'M5-PLAYER-COMPLETE'] },
    completedModules: [MODULE5_ID],
  };
  const migrated = migrateModule5PracticeState(input);
  const progress = migrateModule5PresentationScreenProgress(input);
  assert.equal(migrated.module5Presentation.migration.historicalCompletionPreserved, true);
  assert.deepEqual(progress, input.screenProgress);
  assert.equal(input.completedModules.includes(MODULE5_ID), true);
});

test('current migration is idempotent and content revision invalidates only incomplete gates', () => {
  const current = createEmptyModule5PresentationState();
  current.screens['M5-R01'] = {
    answers: { 'M5-S02-KC01': ['B'] },
    checkedIds: ['M5-S02-KC01'],
    correctIds: ['M5-S02-KC01'],
    reflectionValues: { 'M5-S02-R01': 'Participation' },
    reflectionDetails: {},
    reflectionRevision: 2,
    gateSatisfied: true,
    status: 'completed',
    completedAt: '2026-07-27T09:00:00.000Z',
    updatedAt: '2026-07-27T09:00:00.000Z',
  };
  const first = ensureModule5PresentationState({ module5Presentation: current }, []);
  const second = ensureModule5PresentationState({ module5Presentation: first }, []);
  assert.deepEqual(second, first);

  const stale = { ...current, contentRevision: 'older-revision' };
  const invalidated = ensureModule5PresentationState({ module5Presentation: stale }, []);
  assert.deepEqual(invalidated.screens['M5-R01'].answers, { 'M5-S02-KC01': ['B'] });
  assert.deepEqual(invalidated.screens['M5-R01'].reflectionValues, { 'M5-S02-R01': 'Participation' });
  assert.deepEqual(invalidated.screens['M5-R01'].checkedIds, []);
  assert.equal(invalidated.screens['M5-R01'].gateSatisfied, false);
  assert.equal(invalidated.screens['M5-R01'].status, 'needs_review');

  const preserved = ensureModule5PresentationState({ module5Presentation: stale }, [MODULE5_ID]);
  assert.equal(preserved.screens['M5-R01'].gateSatisfied, true);
  assert.equal(preserved.migration.historicalCompletionPreserved, true);
});

test('Batch 1 to Batch 2 migration preserves accepted Batch 1 state and clears only incomplete Batch 2 gates', () => {
  const current = createEmptyModule5PresentationState();
  current.contentRevision = MODULE5_BATCH1_PRESENTATION_CONTENT_REVISION;
  current.screens['M5-R01'] = {
    answers: { 'M5-S02-KC01': ['B'] },
    checkedIds: ['M5-S02-KC01'],
    correctIds: ['M5-S02-KC01'],
    reflectionValues: { 'M5-S02-R01': 'Participation' },
    reflectionDetails: {},
    reflectionRevision: 2,
    gateSatisfied: true,
    status: 'completed',
    completedAt: '2026-07-27T09:00:00.000Z',
    updatedAt: '2026-07-27T09:00:00.000Z',
  };
  current.screens['M5-R05'] = {
    answers: { 'M5-S06-KC01': ['B'] },
    checkedIds: ['M5-S06-KC01'],
    correctIds: ['M5-S06-KC01'],
    reflectionValues: { 'M5-S06-R01': 'Attendance' },
    reflectionDetails: {},
    reflectionRevision: 1,
    gateSatisfied: true,
    status: 'completed',
    completedAt: '2026-07-27T10:00:00.000Z',
    updatedAt: '2026-07-27T10:00:00.000Z',
  };
  const migrated = ensureModule5PresentationState({ module5Presentation: current }, []);
  assert.equal(migrated.screens['M5-R01'].gateSatisfied, true);
  assert.deepEqual(migrated.screens['M5-R01'].answers, { 'M5-S02-KC01': ['B'] });
  assert.equal(migrated.screens['M5-R05'].gateSatisfied, false);
  assert.equal(migrated.screens['M5-R05'].status, 'needs_review');
  assert.deepEqual(migrated.screens['M5-R05'].answers, { 'M5-S06-KC01': ['B'] });

  const progress = migrateModule5PresentationScreenProgress({
    practiceCheckState: { module5Presentation: current },
    screenProgress: { [MODULE5_ID]: ['M5-R01', 'M5-R02', 'M5-R03', 'M5-R04', 'M5-R05'] },
    completedModules: [],
  });
  assert.deepEqual(progress[MODULE5_ID], ['M5-R01', 'M5-R02', 'M5-R03', 'M5-R04']);
});

test('renderer activates presentation flow only for Screens 2–9', () => {
  const renderer = readFileSync('src/components/course/Module5Renderer.tsx', 'utf8');
  assert.match(renderer, /isModule5PresentationScreenId\(screenId\)/);
  assert.match(renderer, /<Module5PresentationScreen/);
  assert.match(renderer, /<Module5EnhancedJourney/);
  const source = readFileSync('src/data/module5/module5PresentationContent.ts', 'utf8');
  for (const id of ['M5-R01', 'M5-R02', 'M5-R03', 'M5-R04', 'M5-R05', 'M5-R06', 'M5-R07', 'M5-R08']) assert.match(source, new RegExp(`'${id}'`));
  for (const id of ['M5-R09', 'M5-R13', 'M5-R14', 'M5-PLAYER-COMPLETE']) {
    assert.equal(Object.hasOwn(MODULE5_PRESENTATION_CONTENT, id), false);
  }
});

test('video and control components preserve the approved accessibility contract', () => {
  const video = readFileSync('src/components/course/module5/ResponsiveYouTubePresentation.tsx', 'utf8');
  const knowledge = readFileSync('src/components/course/module5/Module5KnowledgeCheck.tsx', 'utf8');
  const reflection = readFileSync('src/components/course/module5/Module5Reflection.tsx', 'utf8');
  const screen = readFileSync('src/components/course/module5/Module5PresentationScreen.tsx', 'utf8');
  const css = readFileSync('src/components/course/module5/module5-presentation.css', 'utf8');
  assert.match(video, /loading="lazy"/);
  assert.match(video, /allowFullScreen/);
  assert.match(video, /title={title}/);
  assert.match(video, /open the presentation on YouTube/);
  assert.doesNotMatch(video, /autoplay=1|onTimeUpdate|watchTime/);
  assert.match(knowledge, /<fieldset/);
  assert.match(knowledge, /<legend>/);
  assert.match(knowledge, /type={question\.type === 'multiple' \? 'checkbox' : 'radio'}/);
  assert.match(reflection, /Remove possible identifying or sensitive detail/);
  assert.match(screen, /Progress is recorded only when the complete screen gate is satisfied/);
  assert.match(css, /aspect-ratio:\s*16\s*\/\s*9/);
  assert.match(css, /@media \(max-width: 38rem\)/);
  assert.doesNotMatch(css, /overflow-x:\s*auto/);
});

test('Batch 1 does not introduce Module 5, assessment, course or certificate completion events', () => {
  const screen = readFileSync('src/components/course/module5/Module5PresentationScreen.tsx', 'utf8');
  assert.doesNotMatch(screen, /completedModules:/);
  assert.doesNotMatch(screen, /assessment_completed|course_completed|certificate/i);
  const shell = readFileSync('src/components/player/CoursePlayerShell.tsx', 'utf8');
  assert.match(shell, /const isModule5CompletionTarget = false/);
  const hub = readFileSync('src/integration/hubProgress.ts', 'utf8');
  assert.match(hub, /progress_updated/);
  assert.doesNotMatch(screen, /postMessage/);
});
