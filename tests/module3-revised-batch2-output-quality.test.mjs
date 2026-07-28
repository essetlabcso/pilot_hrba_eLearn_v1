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
  buildCanonicalCausalCapacityPathway,
  buildCanonicalRiskMatrix,
  buildInclusionDesignScorecard,
  module3Batch2RubricTargets,
} = await vite.ssrLoadModule('/src/components/course/Module3Batch2OutputQuality.tsx');

const context = {
  priorityAffectedGroup: 'Women market vendors and traders',
  selectedContextualConditions: ['Market infrastructure and trading space', 'Public water-service access and timing'],
  sourceSignature: 'context-1',
};
const rightsHolder = {
  selectedGroups: ['Women market vendors and traders', 'Residents of remote rural kebeles'],
  selectedBarriers: ['Distance, time, or transport cost', 'Late or inaccessible information'],
  rightsHolderBarrierMap: { sourceSignature: 'rights-1' },
};
const actors = {
  selectedDutyBearers: ['Woreda Water & Energy Office'],
  actorRelationshipMap: {
    primaryDutyBearer: 'Woreda Water & Energy Office',
    sourceSignature: 'actors-1',
  },
};
const power = {
  actorPowerInsight: {
    selectedBlocker: 'District Finance & Allocation Committee',
    recommendation: 'Use non-identifying evidence and a safe joint review.',
    sourceSignature: 'power-1',
  },
};

test('Revised Batch 2 builders preserve analytical depth with reduced learner input', async (t) => {
  const causal = buildCanonicalCausalCapacityPathway(
    'late-information',
    'unequal-influence',
    'coordination',
    'roles-review',
    'Optional learner note',
    { context, rightsHolder, actors, power },
  );

  await t.test('R10 contains all eight required sections and distinguishes evidence status', () => {
    const required = [
      'observedIssue',
      'caseEvidence',
      'likelyDirectCause',
      'possibleDeeperFactor',
      'capacityResponseGap',
      'responsibleRelevantActor',
      'practicalDesignResponse',
      'issueRequiringVerification',
    ];
    for (const field of required) assert.ok(causal[field], field);
    assert.deepEqual(causal.evidenceStatuses.map((item) => item.label), [
      'Observed',
      'Likely',
      'Possible',
      'Requires verification',
    ]);
    assert.match(causal.issueRequiringVerification, /verify/i);
    assert.doesNotMatch(causal.possibleDeeperFactor, /confirmed/i);
  });

  const scorecard = buildInclusionDesignScorecard(
    { participation: 'partial', accessibility: 'improve', influence: 'adequate' },
    '',
    { context, rightsHolder, actors, causal },
  );

  await t.test('R11 produces three separate substantive domain adaptations without an overall score', () => {
    assert.equal(scorecard.domains.length, 3);
    assert.deepEqual(scorecard.domains.map((item) => item.title), [
      'Meaningful participation',
      'Accessibility',
      'Roles, power, and decision influence',
    ]);
    for (const row of scorecard.domains) {
      assert.ok(row.status);
      assert.ok(row.relevantCaseEvidence);
      assert.ok(row.currentGap);
      assert.ok(row.recommendedAdaptation);
      assert.ok(row.responsibleActorRole);
      assert.ok(row.monitoringSignal);
    }
    assert.equal(Object.hasOwn(scorecard, 'overallScore'), false);
  });

  await t.test('R13 creates two operational pathways with responders and signals, without safety guarantees', () => {
    const risk = buildCanonicalRiskMatrix(
      ['exclusion', 'exposure'],
      { exclusion: 'multi-channel', exposure: 'non-identifying' },
      {
        rightsHolder,
        actors,
        power,
        inclusion: { inclusionDesignScorecard: scorecard },
        pathway: {
          responseMethod: 'Public response log',
          sourceSignature: 'pathway-1',
        },
      },
    );
    assert.equal(risk.rows.length, 2);
    for (const row of risk.rows) {
      assert.ok(row.whoMayBeAffected);
      assert.ok(row.triggerWarningCondition);
      assert.ok(row.mitigation);
      assert.ok(row.monitoringSignal);
      assert.ok(row.responsibleResponder);
      assert.ok(row.safeFollowUpAction);
      assert.ok(row.remainingUncertainty);
    }
    assert.match(risk.rows[1].remainingUncertainty, /No process can guarantee/i);
    assert.doesNotMatch(risk.rows.map((row) => row.safeFollowUpAction).join(' '), /guarantee(?:d)? safety/i);
  });

  await t.test('dependency signatures vary only when governed inputs vary', () => {
    const same = buildCanonicalCausalCapacityPathway(
      'late-information',
      'unequal-influence',
      'coordination',
      'roles-review',
      'Different optional note',
      { context, rightsHolder, actors, power },
    );
    assert.equal(causal.sourceSignature, same.sourceSignature, 'optional notes do not invalidate the governed analytical output');
    const changed = buildCanonicalCausalCapacityPathway(
      'access-cost',
      'unequal-influence',
      'coordination',
      'roles-review',
      '',
      { context, rightsHolder, actors, power },
    );
    assert.notEqual(causal.sourceSignature, changed.sourceSignature);
  });

  await t.test('rubric targets satisfy every acceptance floor', () => {
    for (const [name, scores] of Object.entries(module3Batch2RubricTargets)) {
      assert.ok(scores.every((score) => score >= 2), name);
      assert.ok(scores[0] >= 3, `${name} accuracy`);
      assert.ok(scores[1] >= 3, `${name} HRBA relevance`);
      assert.ok(scores[10] >= 3, `${name} accessibility`);
      assert.ok(scores[5] >= 3, `${name} analytical depth`);
      assert.ok(scores[8] >= 3, `${name} visual structure`);
      assert.ok(scores[11] >= 3, `${name} portfolio usefulness`);
      assert.ok(scores.reduce((sum, value) => sum + value, 0) / scores.length >= 3);
    }
  });

  await t.test('only canonical Screens 9–14 are routed through the revised output-quality sequence', () => {
    const source = readFileSync(new URL('../src/components/course/Module3RevisedRenderer.tsx', import.meta.url), 'utf8');
    assert.match(source, /M3-R09'[\s\S]*PowerInfluencePrototype/);
    assert.match(source, /M3-R10'[\s\S]*RootCauseCapacityOutputScreen/);
    assert.match(source, /M3-R11'[\s\S]*InclusionDesignScorecardScreen/);
    assert.match(source, /M3-R12'[\s\S]*ParticipationPathwayPrototype/);
    assert.match(source, /M3-R13'[\s\S]*RiskDoNoHarmMatrixScreen/);
    assert.match(source, /M3-R14'[\s\S]*RepairedDesignPrototype/);
  });
});
