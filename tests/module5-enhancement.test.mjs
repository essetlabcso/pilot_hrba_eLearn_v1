import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import {
  MODULE5_CANONICAL_SCREEN_IDS,
  MODULE5_COMPLETION_SCREEN_TITLE,
  MODULE5_LEGACY_ID_MAP,
  areModule5Screen13DependenciesReady,
  buildModule5DownloadText,
  canonicalizeModule5ScreenId,
  containsPotentiallySensitiveModule5Text,
  getAllowedModule5ScreenId,
  invalidateModule5Screen13Dependents,
  isModule5BuilderReady,
  isModule5CurrentScreenReady,
  isModule5OrderCorrect,
  isModule5OutputReady,
  isModule5Screen13CarryForwardReady,
  mergeModule5CanvasFields,
  migrateModule5PracticeState,
  moveModule5Order,
  refreshModule5PlanFromCanvas,
} from '../src/data/module5/module5EnhancedModel.ts';
import {
  REQUIRED_HRBA_MODULE_IDS,
  canAccessCourseModule,
  enforceFinalAssessmentPrerequisites,
  hasFinalAssessmentPrerequisites,
  shouldRenderPlayerScreenImmediately,
} from '../src/state/coursePrerequisites.ts';
import {
  buildPortalContextRoute,
  buildPortalHistoryState,
  isPortalLaunchEnvironmentValid,
  parsePortalLaunchContext,
} from '../src/integration/portalContext.ts';
import {
  EXTERNAL_COURSE_EVENT_MESSAGE,
  HRBA_COURSE_SLUG,
  PORTAL_STORAGE_PREFIX,
  createAssessmentEvidenceId,
  derivePortalStorageKey,
  isCanonicalOpaque32ByteBase64Url,
  isExternalCourseLaunchContextMessage,
  isValidAssessmentEvidenceId,
} from '../src/integration/portalLearnerState.ts';

test('Final Assessment uses one fail-closed prerequisite source', () => {
  const incomplete = REQUIRED_HRBA_MODULE_IDS.slice(0, 4);
  assert.equal(hasFinalAssessmentPrerequisites(incomplete), false);
  assert.equal(canAccessCourseModule('final_assessment', incomplete), false);
  assert.equal(hasFinalAssessmentPrerequisites(REQUIRED_HRBA_MODULE_IDS), true);
  assert.equal(canAccessCourseModule('final_assessment', REQUIRED_HRBA_MODULE_IDS), true);

  const app = readFileSync('src/App.tsx', 'utf8');
  const roadmap = readFileSync('src/components/platform/CourseRoadmap.tsx', 'utf8');
  assert.match(app, /canAccessCourseModule\(moduleId, prev\.completedModules\)/);
  assert.match(roadmap, /const moduleAccessible = canAccessCourseModule\(module\.moduleId, completedModules\)/);
  assert.doesNotMatch(app, /isPortalFinalAssessment|isPortalLaunch && moduleId === 'final_assessment'/);
  assert.doesNotMatch(roadmap, /portalFinalAssessmentUnlocked/);
});

test('stale assessment state is cleared without erasing valid module history', () => {
  const staleState = {
    completedModules: [...REQUIRED_HRBA_MODULE_IDS.slice(0, 4), 'final_assessment'],
    currentLayer: 'player',
    currentModuleId: 'final_assessment',
    currentScreenId: 'FINAL-ASSESSMENT-COMPLETE',
    finalAssessmentAnswers: { q1: 'a' },
    finalAssessmentResult: { passed: true },
    screenProgress: {
      module_01_hrba_foundations: ['M1-PLAYER-COMPLETE'],
      final_assessment: ['FINAL-ASSESSMENT-COMPLETE'],
    },
  };
  const corrected = enforceFinalAssessmentPrerequisites(staleState);
  assert.deepEqual(corrected.completedModules, REQUIRED_HRBA_MODULE_IDS.slice(0, 4));
  assert.equal(corrected.currentLayer, 'platform');
  assert.equal(corrected.currentModuleId, null);
  assert.equal(corrected.currentScreenId, null);
  assert.deepEqual(corrected.finalAssessmentAnswers, {});
  assert.equal(corrected.finalAssessmentResult, null);
  assert.deepEqual(corrected.screenProgress.module_01_hrba_foundations, ['M1-PLAYER-COMPLETE']);
  assert.deepEqual(corrected.screenProgress.final_assessment, []);
});

test('assessment submission and rendering retain defense in depth', () => {
  const renderer = readFileSync('src/components/course/FinalAssessmentRenderer.tsx', 'utf8');
  assert.match(renderer, /if \(!allAnswered \|\| !prerequisitesMet\) return/);
  assert.match(renderer, /if \(!hasFinalAssessmentPrerequisites\(prev\.completedModules\)\) return prev/);
  assert.match(renderer, /Complete Modules 1–5 first/);
  const shell = readFileSync('src/components/player/CoursePlayerShell.tsx', 'utf8');
  assert.match(shell, /state\.currentModuleId === 'final_assessment'[\s\S]*!hasFinalAssessmentPrerequisites\(state\.completedModules\)/);
});

test('Final Assessment screens bypass the hiding stabilization overlay', () => {
  assert.equal(shouldRenderPlayerScreenImmediately('final_assessment'), true);
  assert.equal(shouldRenderPlayerScreenImmediately('module_05_hrba_meal'), false);

  const shell = readFileSync('src/components/player/CoursePlayerShell.tsx', 'utf8');
  assert.match(shell, /const screenStabilized = renderScreenImmediately \|\|/);
  assert.match(shell, /state\.currentModuleId !== 'final_assessment'/);
});

test('Hub postMessage contract and validated target origin remain unchanged', () => {
  const bridge = readFileSync('src/integration/hubProgress.ts', 'utf8');
  assert.match(bridge, /window\.parent\.postMessage\(message, portalContext\.portalOrigin\)/);
  assert.match(bridge, /EXTERNAL_COURSE_EVENT_MESSAGE/);
  assert.match(bridge, /learnerStateKey/);
  assert.doesNotMatch(bridge, /launchToken/);
  assert.doesNotMatch(bridge, /postMessage\([^)]*, ['"]\*['"]\)/);
});

test('portal routes retain only validated integration context', () => {
  const context = parsePortalLaunchContext(
    '?embed=portal'
      + '&portalOrigin=https%3A%2F%2Fhub.example.org'
      + `&courseSlug=${HRBA_COURSE_SLUG}`
      + '&launchToken=opaque-launch'
      + '&learnerId=raw-learner'
      + '&organizationId=raw-organization',
  );
  assert.ok(context);
  assert.equal(isPortalLaunchEnvironmentValid(context, {
    isEmbedded: true,
    referrer: 'https://hub.example.org/course/launch',
  }), true);
  assert.equal(isPortalLaunchEnvironmentValid(context, {
    isEmbedded: false,
    referrer: 'https://hub.example.org/course/launch',
  }), false);
  assert.equal(isPortalLaunchEnvironmentValid(context, {
    isEmbedded: true,
    referrer: 'https://unapproved.example.org/course/launch',
  }), false);

  const route = buildPortalContextRoute('/final-assessment/questions', context);
  const routedUrl = new URL(route, 'https://course.example.org');
  assert.deepEqual([...routedUrl.searchParams.keys()].sort(), [
    'courseSlug',
    'embed',
    'launchToken',
    'portalOrigin',
  ]);
  assert.equal(routedUrl.searchParams.get('portalOrigin'), 'https://hub.example.org');
  assert.equal(routedUrl.searchParams.has('learnerId'), false);
  assert.equal(routedUrl.searchParams.has('organizationId'), false);
  assert.deepEqual(buildPortalHistoryState(context), {
    hrbaPortalContextV1: {
      embed: 'portal',
      portalOrigin: 'https://hub.example.org',
      courseSlug: HRBA_COURSE_SLUG,
      launchToken: 'opaque-launch',
    },
  });
});

test('learner-state keys and namespaces enforce canonical 32-byte base64url isolation', async () => {
  const keyA = Buffer.alloc(32, 0x11).toString('base64url');
  const keyB = Buffer.alloc(32, 0x22).toString('base64url');
  assert.equal(keyA.length, 43);
  assert.equal(isCanonicalOpaque32ByteBase64Url(keyA), true);
  assert.equal(isCanonicalOpaque32ByteBase64Url(`${keyA}=`), false);
  assert.equal(isCanonicalOpaque32ByteBase64Url(keyA.slice(0, 42)), false);
  assert.equal(isCanonicalOpaque32ByteBase64Url(`${keyA.slice(0, 42)}B`), false);

  const namespaceA1 = await derivePortalStorageKey(keyA);
  const namespaceA2 = await derivePortalStorageKey(keyA);
  const namespaceB = await derivePortalStorageKey(keyB);
  assert.equal(namespaceA1, namespaceA2);
  assert.notEqual(namespaceA1, namespaceB);
  assert.match(namespaceA1, new RegExp(`^${PORTAL_STORAGE_PREFIX}[0-9a-f]{64}$`));
  assert.equal(namespaceA1.includes(keyA), false);
});

test('launch context and assessment evidence conform to the approved Hub contract', () => {
  const learnerStateKey = Buffer.alloc(32, 0x33).toString('base64url');
  const portalContext = parsePortalLaunchContext(
    `?embed=portal&portalOrigin=https%3A%2F%2Fhub.example.org&courseSlug=${HRBA_COURSE_SLUG}&launchToken=opaque`,
  );
  assert.ok(portalContext);
  assert.equal(isExternalCourseLaunchContextMessage({
    type: 'cso-learning-hub:external-course-launch-context',
    version: 1,
    courseSlug: HRBA_COURSE_SLUG,
    learnerStateKey,
  }, portalContext), true);
  assert.equal(isExternalCourseLaunchContextMessage({
    type: 'cso-learning-hub:external-course-launch-context',
    version: 1,
    courseSlug: HRBA_COURSE_SLUG,
    learnerStateKey: `${learnerStateKey}=`,
  }, portalContext), false);

  const evidenceId = createAssessmentEvidenceId();
  assert.equal(isValidAssessmentEvidenceId(evidenceId), true);
  assert.equal(isValidAssessmentEvidenceId('550e8400-e29b-41d4-a716-446655440000'), true);
  assert.equal(isValidAssessmentEvidenceId(Buffer.alloc(32, 0x44).toString('base64url')), true);
  assert.equal(isValidAssessmentEvidenceId('short-arbitrary-evidence'), false);
  assert.equal(isValidAssessmentEvidenceId(`${Buffer.alloc(32, 0x44).toString('base64url')}=`), false);
  assert.equal(EXTERNAL_COURSE_EVENT_MESSAGE, 'cso-learning-hub:external-course-event');
});

test('all canonical Module 5 screen IDs remain canonical', () => {
  for (const id of MODULE5_CANONICAL_SCREEN_IDS) assert.equal(canonicalizeModule5ScreenId(id), id);
  assert.equal(canonicalizeModule5ScreenId('M5-PLAYER-00'), 'M5-PLAYER-00');
});

test('legacy IDs have one deterministic canonical route and unknown IDs fail closed', () => {
  for (const [legacy, canonical] of Object.entries(MODULE5_LEGACY_ID_MAP)) {
    assert.equal(canonicalizeModule5ScreenId(legacy), canonical);
  }
  assert.equal(canonicalizeModule5ScreenId('M5-UNKNOWN'), 'M5-R01');
  assert.equal(canonicalizeModule5ScreenId(null), 'M5-R01');
});

test('direct-route locking returns the first incomplete screen', () => {
  assert.equal(getAllowedModule5ScreenId('M5-R06', []), 'M5-R01');
  assert.equal(getAllowedModule5ScreenId('M5-R06', ['M5-R01', 'M5-R02']), 'M5-R03');
  assert.equal(
    getAllowedModule5ScreenId('M5-R06', ['M5-R01', 'M5-R02', 'M5-R03', 'M5-R04', 'M5-R05']),
    'M5-R06',
  );
  assert.equal(getAllowedModule5ScreenId('M5-S1-25', []), 'M5-R01');
});

test('legacy completed learners retain access when canonical screen progress is absent', () => {
  assert.equal(getAllowedModule5ScreenId('M5-PLAYER-COMPLETE', [], true), 'M5-PLAYER-COMPLETE');
  assert.equal(getAllowedModule5ScreenId('M5-R14', [], true), 'M5-R14');
});

test('unrelated state is unchanged when Module 5 has never been touched', () => {
  const practice = { module3_value: { answer: 'preserve me' } };
  const migrated = migrateModule5PracticeState({
    practiceCheckState: practice,
    screenProgress: {},
    completedModules: [],
  });
  assert.deepEqual(migrated, practice);
  assert.notEqual(migrated, practice);
});

test('partial legacy state is recovered as review-required without inventing answers', () => {
  const migrated = migrateModule5PracticeState({
    practiceCheckState: {
      module3_value: { answer: 'preserve me' },
      module5_m5_r13: { repairNoteText: 'Generalized earlier learning note', selectedIds: ['a', 'b'] },
    },
    screenProgress: { module_05_hrba_meal: ['M5-R01'] },
    completedModules: [],
  });
  assert.deepEqual(migrated.module3_value, { answer: 'preserve me' });
  assert.equal(migrated.m5_s15.status, 'needs_review');
  assert.equal(migrated.m5_s15.migration.sourceKey, 'module5_m5_r13');
  assert.equal(migrated.m5_s15.migration.recoveredSelectionCount, 2);
  assert.equal(migrated.m5_s15.recoveredLearningNote, 'Generalized earlier learning note');
  assert.equal('answers' in migrated.m5_s15, false);
});

test('migration is idempotent and never overwrites revised state', () => {
  const first = migrateModule5PracticeState({
    practiceCheckState: {
      module5_m5_r13: { repairNoteText: 'Earlier note' },
      m5_s15: { schemaVersion: 2, fields: { learning: 'Revised note' }, status: 'completed' },
    },
    screenProgress: { module_05_hrba_meal: ['M5-R14'] },
    completedModules: [],
  });
  const second = migrateModule5PracticeState({
    practiceCheckState: first,
    screenProgress: { module_05_hrba_meal: ['M5-R14'] },
    completedModules: [],
  });
  assert.deepEqual(second.m5_s15, { schemaVersion: 2, fields: { learning: 'Revised note' }, status: 'completed' });
  assert.deepEqual(second, first);
});

test('prior Module 5 completion is preserved additively', () => {
  const migrated = migrateModule5PracticeState({
    practiceCheckState: { module5_m5_r14: { commitmentText: 'Earlier generalized commitment' } },
    screenProgress: { module_05_hrba_meal: ['M5-R14'] },
    completedModules: ['module_05_hrba_meal'],
  });
  assert.equal(migrated.m5_s16.status, 'completed');
  assert.equal(migrated.m5_s16.legacyCompletionPreserved, true);
  assert.equal(migrated.m5_s16.recoveredPlanSummary, 'Earlier generalized commitment');
});

test('malformed practice data degrades safely without changing unrelated values', () => {
  const migrated = migrateModule5PracticeState({
    practiceCheckState: 'bad data',
    screenProgress: { module_03_project_design: ['M3-R01'] },
    completedModules: [],
  });
  assert.deepEqual(migrated, {});
});

test('download output labels missing work honestly and contains no offline-app claim', () => {
  const text = buildModule5DownloadText(
    [{ label: 'Priority result', value: '', sourceLabel: 'Module 5 Screen 5' }],
    { adaptation: '', responsibility: 'MEAL role', nearTermAction: '', followUp: '' },
  );
  assert.match(text, /Priority result: Not yet completed/);
  assert.match(text, /Responsible role or institution: MEAL role/);
  assert.doesNotMatch(text, /works offline|offline application/i);
});

test('current output safety readiness cannot be bypassed by historical completion', () => {
  const safePlan = { days30: 'Prepare tools', days60: 'Test evidence', days90: 'Account back' };
  const required = ['days30', 'days60', 'days90'];
  assert.equal(isModule5OutputReady(safePlan, required, [true, true, true]), true);
  assert.equal(isModule5OutputReady(safePlan, required, [true, true, false]), false);
  assert.equal(isModule5OutputReady({ ...safePlan, days60: 'complainant name Alice' }, required, [true, true, true]), false);
  assert.equal(containsPotentiallySensitiveModule5Text('complainant name Alice'), true);

  const journey = readFileSync('src/components/course/Module5EnhancedJourney.tsx', 'utf8');
  assert.doesNotMatch(journey, /const ready = alreadyCompleted \|\|/);
  assert.match(journey, /Save reviewed Module 5 output/);
  assert.match(journey, /role={messageIsAlert \? 'alert' : 'status'}/);
  assert.match(journey, /Remove possible identifying or sensitive detail from the highlighted field/);
});

test('historical completion preserves access but cannot satisfy current Screen 13 readiness', () => {
  const historicalCompletion = true;
  const incompleteBuilder = { heard: '', change: '', limit: '', nextUpdate: '' };
  assert.equal(historicalCompletion, true);
  assert.equal(isModule5BuilderReady(incompleteBuilder, Object.keys(incompleteBuilder)), false);
  assert.equal(isModule5CurrentScreenReady(false, false), false);
  assert.equal(isModule5CurrentScreenReady(true, false), false);
  assert.equal(isModule5CurrentScreenReady(true, true), true);

  const journey = readFileSync('src/components/course/Module5EnhancedJourney.tsx', 'utf8');
  assert.match(journey, /const canContinue = isModule5CurrentScreenReady\(taskComplete, allReviewed\)/);
  assert.doesNotMatch(journey, /const canContinue =[^;]*(previouslyCompleted|moduleCompleted)/);
});

test('Screens 9–11 use the authoritative data-management, analysis and evaluation sequence', () => {
  const journey = readFileSync('src/components/course/Module5EnhancedJourney.tsx', 'utf8');
  assert.match(journey, /Data Management: Organize, Clean and Protect Evidence/);
  assert.match(journey, /Analysis: Combine Numbers, Feedback and Stories/);
  assert.match(journey, /Evaluation: Understand Change, Equity and Contribution/);
  for (const taskId of ['duplicate', 'category', 'missing', 'identifier', 'smallCell', 'comment1', 'comment6', 'mixed', 'sensemaking', 'change', 'equity', 'process', 'influence', 'contribution']) {
    assert.match(journey, new RegExp(`id: '${taskId}'`));
  }
});

test('Screens 3, 4 and 6–8 retain the required authority structures', () => {
  const journey = readFileSync('src/components/course/Module5EnhancedJourney.tsx', 'utf8');
  for (const requiredText of [
    'Learning objective 6',
    "id: 'safeRoute'",
    "id: 'lensMonitoring'",
    "id: 'lensEvaluation'",
    "id: 'lensAccountability'",
    "id: 'lensLearning'",
    "id: 'priorityDecision'",
    "id: 'decision'",
    "id: 'rightsQuestion'",
    "id: 'source'",
    "id: 'layers'",
    'Project record or monitoring log',
    'Change story or qualitative interview',
    "dataDecisionChoices('collect'",
    "dataDecisionChoices('suppress'",
    "dataDecisionChoices('aggregate'",
    "dataDecisionChoices('refer'",
    "dataDecisionChoices('doNotCollect'",
  ]) assert.match(journey, new RegExp(requiredText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('Screens 12–13 restore the accountability loop, scorecard and six evidence-to-action signals', () => {
  const journey = readFileSync('src/components/course/Module5EnhancedJourney.tsx', 'utf8');
  for (const taskId of ['scorecardIssue', 'jointAction', 'responsibleActor', 'reviewDate', 'accountBack', 'underrepresented', 'timing', 'overdueSignal', 'sensitiveRecord', 'publicActor', 'mixedClaim', 'heard', 'change', 'limit', 'nextUpdate']) {
    assert.match(journey, new RegExp(`id: '${taskId}'`));
  }
  assert.match(journey, /Eight-step feedback loop/);
  assert.match(journey, /Reach and access/);
  assert.match(journey, /Move up/);
  assert.match(journey, /Check order/);
  assert.match(journey, /Review account-back message/);
  assert.match(journey, /textarea/);
});

test('Screen 12 ordering interaction reaches and validates the authoritative sequence', () => {
  const correct = ['inform', 'receive', 'minimum', 'assign', 'respond', 'adapt', 'account', 'track'];
  let order = ['receive', 'inform', 'assign', 'minimum', 'adapt', 'respond', 'track', 'account'];
  assert.equal(isModule5OrderCorrect(order, correct), false);
  order = moveModule5Order(order, 1, -1);
  order = moveModule5Order(order, 3, -1);
  order = moveModule5Order(order, 5, -1);
  order = moveModule5Order(order, 7, -1);
  assert.deepEqual(order, correct);
  assert.equal(isModule5OrderCorrect(order, correct), true);
  assert.deepEqual(moveModule5Order(order, 0, -1), correct);
});

test('Screen 13 four-field account-back builder requires complete safe wording', () => {
  const keys = ['heard', 'change', 'limit', 'nextUpdate'];
  const safe = {
    heard: 'Access improved for some participants while timing remains difficult.',
    change: 'The activity lead will adjust timing and follow up with the service role.',
    limit: 'The evidence cannot represent people who did not participate.',
    nextUpdate: 'A generalized written and audio update will follow the next review.',
  };
  assert.equal(isModule5BuilderReady(safe, keys), true);
  assert.equal(isModule5BuilderReady({ ...safe, limit: '' }, keys), false);
  assert.equal(isModule5BuilderReady({ ...safe, heard: 'complainant name Alice' }, keys), false);
});

test('Screen 13 edits clear downstream confirmations and mark both outputs Needs review', () => {
  const invalidated = invalidateModule5Screen13Dependents({
    m5_s13: { status: 'completed' },
    m5_s15: { status: 'completed', fields: { adaptation: 'Old action', followup: 'Old review' }, previewReviewed: true, confirmedSafe: true },
    m5_s16: { status: 'completed', plan: { days90: 'Old action' }, dashboardReviewed: true, carryReviewed: true, confirmedSafe: true },
    module3_unrelated: { keep: true },
  });
  assert.equal(invalidated.m5_s15.status, 'needs_review');
  assert.equal(invalidated.m5_s15.previewReviewed, false);
  assert.equal(invalidated.m5_s15.confirmedSafe, false);
  assert.equal(invalidated.m5_s15.fields.adaptation, '');
  assert.equal(invalidated.m5_s15.fields.followup, '');
  assert.deepEqual(invalidated.m5_s15.dependencyReview.fields, ['adaptation', 'followup']);
  assert.equal(invalidated.m5_s16.status, 'needs_review');
  assert.equal(invalidated.m5_s16.dashboardReviewed, false);
  assert.equal(invalidated.m5_s16.carryReviewed, false);
  assert.equal(invalidated.m5_s16.confirmedSafe, false);
  assert.equal(invalidated.m5_s16.plan.days90, '');
  assert.equal(invalidated.m5_s16.plan.trigger, '');
  assert.deepEqual(invalidated.module3_unrelated, { keep: true });
});

test('cleared Screen 13 values clear dependent outputs and block reconfirmation', () => {
  const projected = { adaptation: 'Current action', followup: '' };
  const stored = { adaptation: 'Old action', followup: 'Old follow-up' };
  const refreshed = mergeModule5CanvasFields(projected, stored, ['adaptation', 'followup']);
  assert.deepEqual(refreshed, { adaptation: 'Current action', followup: '' });
  assert.equal(areModule5Screen13DependenciesReady(refreshed), false);
  assert.equal(areModule5Screen13DependenciesReady({ adaptation: 'Current action', followup: 'Review after two cycles' }), true);
  assert.equal(areModule5Screen13DependenciesReady({ adaptation: 'complainant name Alice', followup: 'Review later' }), false);
  assert.equal(isModule5Screen13CarryForwardReady({ adaptation: 'Current action', followup: 'Review after two cycles' }, 'in_progress'), false);
  assert.equal(isModule5Screen13CarryForwardReady({ adaptation: 'Current action', followup: 'Review after two cycles' }, 'completed'), true);

  const refreshedPlan = refreshModule5PlanFromCanvas({ days90: 'Old action', trigger: 'Old trigger' }, { adaptation: '', followup: '' });
  assert.equal(refreshedPlan.days90, '');
  assert.equal(refreshedPlan.trigger, '');

  const journey = readFileSync('src/components/course/Module5EnhancedJourney.tsx', 'utf8');
  assert.match(journey, /const ready = dependenciesReady && isModule5OutputReady/);
  assert.match(journey, /disabled={!dependenciesReady}/);
});

test('dependent Canvas fields refresh and final-plan values require re-review', () => {
  const projected = { adaptation: 'Adjust the meeting schedule', followup: 'Review access after two cycles', learning: 'Keep this learning note' };
  const stored = { adaptation: 'Old action', followup: 'Old review', learning: 'Learner-edited note' };
  const refreshedCanvas = mergeModule5CanvasFields(projected, stored, ['adaptation', 'followup']);
  assert.deepEqual(refreshedCanvas, {
    adaptation: 'Adjust the meeting schedule',
    followup: 'Review access after two cycles',
    learning: 'Learner-edited note',
  });
  const refreshedPlan = refreshModule5PlanFromCanvas({ days90: 'Old action', trigger: 'Old trigger', participation: 'Accessible review' }, refreshedCanvas);
  assert.equal(refreshedPlan.days90, 'Adjust the meeting schedule');
  assert.equal(refreshedPlan.trigger, 'Adjust the meeting schedule');
  assert.equal(refreshedPlan.participation, 'Accessible review');
});

test('Screen 15 canvas and Screen 16 plan retain the approved carry-forward structure', () => {
  const journey = readFileSync('src/components/course/Module5EnhancedJourney.tsx', 'utf8');
  for (const fieldId of ['project', 'decision', 'question', 'groups', 'dutyBearer', 'existingEvidence', 'evidenceLayers', 'methodMix', 'disaggregation', 'participatoryRole', 'safetyEthics', 'synthesis', 'finding', 'uncertainty', 'responsibleActor', 'closure', 'adaptation', 'followup', 'learning', 'peerQuestion']) {
    assert.match(journey, new RegExp(`\\['${fieldId}'`));
  }
  for (const planId of ['days30', 'days60', 'days90', 'participation', 'trigger', 'communication', 'referral', 'stopCondition', 'reviewDate', 'learningNote']) {
    assert.match(journey, new RegExp(`\\['${planId}'`));
  }
});

test('Screen 16 shell language does not announce completion before confirmation', () => {
  assert.equal(MODULE5_COMPLETION_SCREEN_TITLE, 'Portfolio Review and Module Closure');
  const app = readFileSync('src/App.tsx', 'utf8');
  assert.match(app, /\['M5-PLAYER-COMPLETE', MODULE5_COMPLETION_SCREEN_TITLE/);
  assert.doesNotMatch(app, /\['M5-PLAYER-COMPLETE', 'Module 5 Complete'/);
});

test('Module 5 Screen 1 and Module 3 sources are byte-identical to approved release', () => {
  const protectedFiles = [
    'src/components/course/ScreenRenderer.tsx',
    'src/components/course/Module3Batch2Screens.tsx',
    'src/components/course/Module3Renderer.tsx',
    'src/components/course/Module3RevisedRenderer.tsx',
  ];
  assert.doesNotThrow(() => execFileSync('git', ['diff', '--exit-code', '4644156', '--', ...protectedFiles]));
});

test('Module 4 Batch 0 cannot change the active Module 5 renderer contract', () => {
  const renderer = readFileSync('src/components/course/ScreenRenderer.tsx', 'utf8');
  assert.match(renderer, /import Module4Renderer from '\.\/Module4Renderer'/);
  assert.match(renderer, /import Module5Renderer from '\.\/Module5Renderer'/);
  assert.match(renderer, /if \(isModule4BuiltScreen\)[\s\S]*<Module4Renderer/);
  assert.match(renderer, /if \(isModule5BuiltScreen\)[\s\S]*<Module5Renderer/);
  assert.doesNotMatch(renderer, /Module4EnhancedFoundation/);
});

test('Module5Renderer uses the approved presentation flow for Batch 1 and retains the enhanced flow for later screens', () => {
  const renderer = readFileSync('src/components/course/Module5Renderer.tsx', 'utf8');
  assert.match(renderer, /isModule5PresentationScreenId\(screenId\)/);
  assert.match(renderer, /Module5PresentationScreen/);
  assert.match(renderer, /Module5EnhancedJourney/);
  assert.doesNotMatch(renderer, /Module5IntroVideoScreen|Module5CanvasScreen|coming soon/);
});

test('the player shell cannot auto-complete Module 5 on route entry', () => {
  const shell = readFileSync('src/components/player/CoursePlayerShell.tsx', 'utf8');
  assert.match(shell, /const isModule5CompletionTarget = false/);
  assert.match(shell, /explicit confirmation on Screen 16/);
});
