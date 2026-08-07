import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import {
  isPortalLaunchEnvironmentValid,
  parsePortalLaunchContext,
} from '../src/integration/portalContext.ts';
import {
  isCanonicalOpaque32ByteBase64Url,
  isExternalCourseLaunchContextMessage,
  isValidAssessmentResultContract,
} from '../src/integration/portalLearnerState.ts';

const COURSE_SLUG = 'applying-human-rights-based-approach-in-cso-practice';
const PORTAL_ORIGIN = 'https://pilot-dec-fj4c3eet9-esset-lab.vercel.app';
const LEARNER_STATE_KEY = Buffer.alloc(32, 0x5a).toString('base64url');
const REQUIRED_MODULES = [
  'module_01_hrba_foundations',
  'module_02_everyday_cso_work',
  'module_03_project_design',
  'module_04_implementation',
  'module_05_hrba_meal',
];

function launchSearch(overrides = {}) {
  const params = new URLSearchParams({
    courseSlug: COURSE_SLUG,
    embed: 'portal',
    launchToken: 'opaque-launch-token',
    portalOrigin: PORTAL_ORIGIN,
    ...overrides,
  });
  return `?${params.toString()}`;
}

function assessment(overrides = {}) {
  return {
    attemptNumber: 1,
    evidenceId: '123e4567-e89b-42d3-a456-426614174000',
    maxScore: 10,
    passed: true,
    percentage: 80,
    score: 8,
    submittedAt: '2026-07-23T12:00:00.000Z',
    ...overrides,
  };
}

test('portal launch parsing accepts only the structurally valid exact-origin contract', () => {
  const context = parsePortalLaunchContext(launchSearch());

  assert.deepEqual(context, {
    courseSlug: COURSE_SLUG,
    embed: 'portal',
    launchToken: 'opaque-launch-token',
    portalOrigin: PORTAL_ORIGIN,
  });
  assert.equal(parsePortalLaunchContext(launchSearch({ embed: 'standalone' })), null);
  assert.equal(parsePortalLaunchContext(launchSearch({ courseSlug: 'another-course' })), null);
  assert.equal(parsePortalLaunchContext(launchSearch({ launchToken: '' })), null);
  assert.equal(
    parsePortalLaunchContext(launchSearch({ portalOrigin: `${PORTAL_ORIGIN}/path` })),
    null,
  );
});

test('portal launch environment requires an iframe and exact referrer origin', () => {
  const context = parsePortalLaunchContext(launchSearch());
  assert.ok(context);

  assert.equal(isPortalLaunchEnvironmentValid(context, {
    isEmbedded: true,
    referrer: `${PORTAL_ORIGIN}/learn/courses/${COURSE_SLUG}/external`,
  }), true);
  assert.equal(isPortalLaunchEnvironmentValid(context, {
    isEmbedded: false,
    referrer: `${PORTAL_ORIGIN}/learn/courses/${COURSE_SLUG}/external`,
  }), false);
  assert.equal(isPortalLaunchEnvironmentValid(context, {
    isEmbedded: true,
    referrer: 'https://unexpected.example/launch',
  }), false);
  assert.equal(isPortalLaunchEnvironmentValid(context, {
    isEmbedded: true,
    referrer: '',
  }), false);

  const mismatchedDeclaration = parsePortalLaunchContext(launchSearch({
    portalOrigin: `${PORTAL_ORIGIN}.attacker.example`,
  }));
  assert.ok(mismatchedDeclaration);
  assert.equal(isPortalLaunchEnvironmentValid(mismatchedDeclaration, {
    isEmbedded: true,
    referrer: `${PORTAL_ORIGIN}/learn/courses/${COURSE_SLUG}/external`,
  }), false);
});

test('launch context accepts only the expected course and canonical learner-state key', () => {
  const context = parsePortalLaunchContext(launchSearch());
  assert.ok(context);
  assert.equal(isCanonicalOpaque32ByteBase64Url(LEARNER_STATE_KEY), true);
  assert.equal(isExternalCourseLaunchContextMessage({
    courseSlug: COURSE_SLUG,
    learnerStateKey: LEARNER_STATE_KEY,
    type: 'cso-learning-hub:external-course-launch-context',
    version: 1,
  }, context), true);
  assert.equal(isExternalCourseLaunchContextMessage({
    courseSlug: COURSE_SLUG,
    learnerStateKey: `${LEARNER_STATE_KEY}=`,
    type: 'cso-learning-hub:external-course-launch-context',
    version: 1,
  }, context), false);
  assert.equal(isExternalCourseLaunchContextMessage({
    courseSlug: 'another-course',
    learnerStateKey: LEARNER_STATE_KEY,
    type: 'cso-learning-hub:external-course-launch-context',
    version: 1,
  }, context), false);
});

test('assessment contract enforces score, pass threshold, evidence and timestamp invariants', () => {
  assert.equal(isValidAssessmentResultContract(assessment(), 80), true);
  assert.equal(isValidAssessmentResultContract(assessment({ passed: false }), 80), false);
  assert.equal(isValidAssessmentResultContract(assessment({ percentage: 90 }), 80), false);
  assert.equal(isValidAssessmentResultContract(assessment({ score: 7, percentage: 70, passed: false }), 80), true);
  assert.equal(isValidAssessmentResultContract(assessment({ score: 8.5, percentage: 85 }), 80), false);
  assert.equal(isValidAssessmentResultContract(assessment({ evidenceId: 'not-evidence' }), 80), false);
  assert.equal(isValidAssessmentResultContract(assessment({ submittedAt: 'not-a-date' }), 80), false);
});

test('Hub event sender rejects invalid completion claims and omits launch credentials', async (t) => {
  const vite = await createServer({
    appType: 'custom',
    configFile: false,
    logLevel: 'silent',
    server: { middlewareMode: true },
  });
  t.after(() => vite.close());
  const { sendHubProgressEvent } = await vite.ssrLoadModule('/src/integration/hubProgress.ts');
  const posted = [];
  const parent = {
    postMessage(message, targetOrigin) {
      posted.push({ message, targetOrigin });
    },
  };
  globalThis.window = { parent };
  t.after(() => {
    delete globalThis.window;
  });

  const portalContext = {
    courseSlug: COURSE_SLUG,
    embed: 'portal',
    launchToken: 'must-not-be-emitted',
    portalOrigin: PORTAL_ORIGIN,
  };
  const completedModuleIds = [...REQUIRED_MODULES, 'final_assessment'];
  const validCompletion = {
    assessment: assessment(),
    completedModuleIds,
    currentModuleId: 'final_assessment',
    currentScreenId: 'FINAL-ASSESSMENT-COMPLETE',
    progressPercent: 100,
  };

  assert.equal(sendHubProgressEvent(
    portalContext,
    LEARNER_STATE_KEY,
    'course_completed',
    validCompletion,
  ), true);
  assert.equal(posted.length, 1);
  assert.equal(posted[0].targetOrigin, PORTAL_ORIGIN);
  assert.equal(posted[0].message.progressPercent, 100);
  assert.equal(posted[0].message.courseSlug, COURSE_SLUG);
  assert.equal(posted[0].message.learnerStateKey, LEARNER_STATE_KEY);
  assert.equal('launchToken' in posted[0].message, false);
  assert.equal('portalOrigin' in posted[0].message, false);

  assert.equal(sendHubProgressEvent(
    portalContext,
    LEARNER_STATE_KEY,
    'course_completed',
    { ...validCompletion, assessment: assessment({ passed: false }) },
  ), false);
  assert.equal(sendHubProgressEvent(
    portalContext,
    LEARNER_STATE_KEY,
    'course_completed',
    { ...validCompletion, completedModuleIds: REQUIRED_MODULES },
  ), false);
  assert.equal(sendHubProgressEvent(
    portalContext,
    LEARNER_STATE_KEY,
    'progress_updated',
    {
      completedModuleIds: ['unexpected-module'],
      currentModuleId: null,
      currentScreenId: null,
      progressPercent: 10,
    },
  ), false);
  assert.equal(sendHubProgressEvent(
    portalContext,
    LEARNER_STATE_KEY,
    'progress_updated',
    {
      completedModuleIds: [],
      currentModuleId: null,
      currentScreenId: null,
      progressPercent: Number.NaN,
    },
  ), false);
  assert.equal(posted.length, 1);
});
