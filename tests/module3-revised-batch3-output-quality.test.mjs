import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'vite';

const vite = await createServer({
  appType: 'custom',
  logLevel: 'silent',
  server: { middlewareMode: true },
});

after(() => vite.close());

const {
  batch3Questions,
  buildAppliedCheckResult,
  buildFourPortfolioProducts,
  buildFourProductSnapshot,
  buildProposalReviewInsight,
  module3Batch3RubricEvidence,
} = await vite.ssrLoadModule('/src/components/course/Module3Batch3OutputQuality.tsx');

const key = (id) => `module3_revised_${id.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

function fixture() {
  return {
    completedModules: [],
    screenProgress: { module_03_project_design: [] },
    practiceCheckState: {
      [key('M3-R05')]: {
        contextInsight: {
          priorityAffectedGroup: 'Women market vendors and traders',
          contextFactors: ['late information', 'distance and timing'],
          inequalityPattern: 'Lower-influence groups receive information later.',
          accessParticipationEffect: 'Late information limits preparation and influence.',
          evidenceGap: 'Verify which groups receive notices before decisions.',
          designImplication: 'Use accessible early information and supported preparation.',
          sourceSignature: 'context-current',
        },
      },
      [key('M3-R09')]: {
        actorPowerInsight: {
          actorRelationships: 'The planning office holds authority; local gatekeepers shape access.',
          formalResponsibility: 'The woreda planning office retains the planning decision.',
          practicalInfluence: 'Local gatekeepers influence who receives information.',
          likelyPosition: 'The focal point may enable an early review.',
          recommendation: 'Use accessible information, non-identifying evidence and an alternative route.',
          sourceSignature: 'actor-current',
        },
      },
      [key('M3-R10')]: {
        canonicalCausalCapacityPathway: {
          capacityResponseGap: 'Coordination and response timing are not assigned.',
          issueRequiringVerification: 'Verify the responsible review point.',
          sourceSignature: 'capacity-current',
        },
      },
      [key('M3-R11')]: {
        inclusionDesignScorecard: { sourceSignature: 'inclusion-current' },
      },
      [key('M3-R12')]: {
        canonicalPathwaySummary: { sourceSignature: 'pathway-current' },
      },
      [key('M3-R13')]: {
        canonicalRiskMatrix: { sourceSignature: 'risk-current' },
      },
      [key('M3-R14')]: {
        repairedDesignElement: {
          originalWeakness: 'Participation occurs after decisions.',
          repairedObjective: 'Priority groups influence planning decisions.',
          activityPackage: 'Early accessible information and supported preparation.',
          participationMechanism: 'Small-group preparation before the decision meeting.',
          accountabilityMechanism: 'Response, explanation and follow-up by the responsible office.',
          inclusionAccessibilityFeature: 'Accessible formats and reasonable accommodation.',
          riskSafeguard: 'Non-identifying evidence and alternative channels.',
          indicatorWatchPoint: 'Evidence that priorities changed the plan.',
          implementationImplication: 'Review whether the mechanism works and adapt.',
          sourceSignature: 'repair-current',
        },
      },
    },
  };
}

test('Revised Batch 3 preserves assessment quality while reducing final-stage burden', async (t) => {
  await t.test('R17 needs two decisions and generates all eight substantive insight sections', () => {
    const state = fixture();
    const insight = buildProposalReviewInsight(state, 'late-participation', 'early-influence', 'Record priorities before approval.', '2026-07-29T00:00:00.000Z');
    for (const field of [
      'priorityProposalGap',
      'relevantHrbaPrinciple',
      'caseAndLearnerEvidence',
      'whyGapMatters',
      'proposedRepair',
      'expectedImprovement',
      'implementationWatchPoint',
      'repairedDesignLink',
    ]) assert.ok(insight[field], field);
    assert.equal(insight.learnerEditedRepair, 'Record priorities before approval.');
    const changed = buildProposalReviewInsight(state, 'capacity-gap', 'capacity-response');
    assert.notEqual(insight.sourceSignature, changed.sourceSignature);
  });

  await t.test('R20 keeps exactly ten stable domains and produces targeted formative review', () => {
    assert.equal(batch3Questions.length, 10);
    assert.deepEqual(batch3Questions.map((question) => question.id), Array.from({ length: 10 }, (_, index) => `m3-akc-q${String(index + 1).padStart(2, '0')}`));
    assert.equal(new Set(batch3Questions.map((question) => question.domain)).size, 10);
    assert.ok(batch3Questions.every((question) => question.options.length === 4));
    const answers = Object.fromEntries(batch3Questions.map((question, index) => [question.id, index < 8 ? question.correct : 'a']));
    const result = buildAppliedCheckResult(answers, 1, '2026-07-29T00:00:00.000Z');
    assert.equal(result.totalQuestions, 10);
    assert.equal(result.score, 8);
    assert.equal(result.targetedReviewTopics.length, 2);
    assert.equal(Object.hasOwn(result, 'passed'), false, 'no new pass/fail gate');
  });

  await t.test('R21 renders exactly four authoritative products and no legacy micro-artifact set', () => {
    const state = fixture();
    const proposal = buildProposalReviewInsight(state, 'late-participation', 'early-influence');
    state.practiceCheckState[key('M3-R17')] = { proposalReviewInsight: proposal };
    const products = buildFourPortfolioProducts(state);
    assert.deepEqual(products.map((product) => product.key), [
      'contextInsight',
      'actorPowerInsight',
      'repairedDesignElement',
      'proposalReviewInsight',
    ]);
    assert.equal(products.length, 4);
    assert.ok(products.every((product) => product.status === 'Current'));
    assert.ok(products.every((product) => product.fields.length >= 6));
  });

  await t.test('R21 reports current, stale, missing and earlier-version states in learner language', () => {
    const state = fixture();
    state.practiceCheckState[key('M3-R17')] = { draftPlanReviewNote: 'Earlier proposal review note' };
    let products = buildFourPortfolioProducts(state);
    assert.equal(products.find((product) => product.key === 'proposalReviewInsight').status, 'Based on earlier course version');
    delete state.practiceCheckState[key('M3-R17')];
    products = buildFourPortfolioProducts(state);
    assert.equal(products.find((product) => product.key === 'proposalReviewInsight').status, 'Missing source');
    const proposal = buildProposalReviewInsight(state, 'late-participation', 'early-influence');
    state.practiceCheckState[key('M3-R17')] = { proposalReviewInsight: proposal };
    state.practiceCheckState[key('M3-R21')] = { finalSnapshot: { sourceSignatures: { contextInsight: 'older-context' } } };
    products = buildFourPortfolioProducts(state);
    assert.equal(products.find((product) => product.key === 'contextInsight').status, 'Updated source available');
  });

  await t.test('snapshot save is idempotent and retains version 3 and the learner note', () => {
    const state = fixture();
    state.practiceCheckState[key('M3-R17')] = { proposalReviewInsight: buildProposalReviewInsight(state, 'late-participation', 'early-influence') };
    const products = buildFourPortfolioProducts(state);
    const assessment = buildAppliedCheckResult(Object.fromEntries(batch3Questions.map((question) => [question.id, question.correct])), 1);
    const first = buildFourProductSnapshot(products, assessment, 'Generalized reflection', null, '2026-07-29T01:00:00.000Z');
    const second = buildFourProductSnapshot(products, assessment, 'Generalized reflection', first, '2026-07-29T02:00:00.000Z');
    assert.equal(second, first);
    assert.equal(second.savedAt, '2026-07-29T01:00:00.000Z');
    assert.equal(second.modelVersion, 3);
    assert.equal(second.products.length, 4);
  });

  await t.test('rubric evidence meets every required floor without claiming unsupported uniform perfection', () => {
    for (const scores of Object.values(module3Batch3RubricEvidence)) {
      assert.ok(scores.every((score) => score >= 2));
      assert.ok(scores[0] >= 3);
      assert.ok(scores[1] >= 3);
      assert.ok(scores[10] >= 3);
      assert.ok(scores[5] >= 3);
      assert.ok(scores[8] >= 3);
      assert.ok(scores[11] >= 3);
      assert.ok(scores.reduce((sum, value) => sum + value, 0) / scores.length >= 3);
    }
    assert.ok(Object.values(module3Batch3RubricEvidence).some((scores) => scores.includes(3)));
  });

  await t.test('renderer routes only R17 and R20-R22 to Batch 3 and preserves hidden compatibility routes', () => {
    const renderer = readFileSync(new URL('../src/components/course/Module3RevisedRenderer.tsx', import.meta.url), 'utf8');
    const compatibility = readFileSync(new URL('../src/components/course/Module3OutputQualityPrototypes.tsx', import.meta.url), 'utf8');
    assert.match(renderer, /M3-R17'[\s\S]*ProposalReviewOutputScreen/);
    assert.match(renderer, /M3-R20'[\s\S]*AppliedKnowledgeCheckOutputScreen/);
    assert.match(renderer, /M3-R21'[\s\S]*FourProductPortfolioScreen/);
    assert.match(renderer, /M3-R22'[\s\S]*Module3CompletionScreen/);
    assert.match(compatibility, /M3-R19'[\s\S]*screen-3-20/);
    assert.match(compatibility, /does not record\s+progress/);
  });
});
