import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'vite';

const testVite = await createServer({
  appType: 'custom',
  logLevel: 'silent',
  server: { middlewareMode: true },
});

after(() => testVite.close());

const {
  buildActorRelationshipMap,
  buildRightsHolderBarrierMap,
  buildStandardsPracticeMap,
  outputIsSubstantive,
  revisedBatch1RubricTargets,
} = await testVite.ssrLoadModule('/src/components/course/Module3Batch1OutputQuality.tsx');

const contextOne = {
  priorityAffectedGroup: 'Women market vendors and traders',
  selectedContextualConditions: [
    'Market infrastructure and trading space',
    'Public water-service access and timing',
  ],
  sourceSignature: 'context-one',
};

const contextTwo = {
  priorityAffectedGroup: 'Residents of remote rural kebeles',
  selectedContextualConditions: [
    'Kebele distance and transport costs',
    'Health-post renovation and accessibility',
  ],
  sourceSignature: 'context-two',
};

const correctMatches = {
  'non-discrimination': 'unequal-access',
  participation: 'influence-before-decision',
  accountability: 'response-explanation',
};

test('revised Module 3 Batch 1 produces substantive, carried, compatible outputs', async (t) => {
  await t.test('Screen 6 generates three standards-to-practice relationships, not correctness labels', () => {
    const first = buildStandardsPracticeMap(correctMatches, contextOne);
    const second = buildStandardsPracticeMap(correctMatches, contextTwo);

    assert.equal(first.rows.length, 3);
    assert.deepEqual(first.rows.map((row) => row.standard), [
      'Non-discrimination and equality',
      'Participation',
      'Accountability',
    ]);
    assert.ok(first.rows.every((row) => outputIsSubstantive(row, [
      'jiruAmbaEvidence',
      'practicalRequirement',
      'designImplication',
    ])));
    assert.notEqual(first.contextPriority, second.contextPriority);
    assert.notEqual(first.rows[0].designImplication, second.rows[0].designImplication);
  });

  await t.test('Screen 7 generates two evidence-based group-to-response relationships', () => {
    const standardsMap = buildStandardsPracticeMap(correctMatches, contextOne);
    const map = buildRightsHolderBarrierMap(
      ['women-vendors', 'remote-residents'],
      {
        'women-vendors': 'distance-time',
        'remote-residents': 'information',
      },
      contextOne,
      standardsMap,
    );

    assert.equal(map.rows.length, 2);
    assert.ok(map.rows.every((row) => outputIsSubstantive(row, [
      'primaryBarrier',
      'reinforcingBarrier',
      'likelyEffect',
      'designResponse',
    ])));
    assert.notEqual(map.rows[0].reinforcingBarrier, map.rows[1].reinforcingBarrier);
    assert.ok(map.standardsUsed.includes('Participation'));
    assert.deepEqual(map.contextFactorsUsed, contextOne.selectedContextualConditions);
  });

  await t.test('Screen 8 preserves responsibility boundaries and creates the Screen 9 carry-forward fields', () => {
    const standardsMap = buildStandardsPracticeMap(correctMatches, contextOne);
    const rightsHolderMap = buildRightsHolderBarrierMap(
      ['women-vendors', 'remote-residents'],
      {
        'women-vendors': 'distance-time',
        'remote-residents': 'information',
      },
      contextOne,
      standardsMap,
    );
    const output = buildActorRelationshipMap(
      'water-office',
      'municipality',
      'women-committee',
      'facilitate',
      rightsHolderMap,
      standardsMap,
    );

    assert.equal(output.primaryDutyBearer, 'Woreda Water & Energy Office');
    assert.equal(output.linkedDutyBearer, 'Municipal Market Administration');
    assert.equal(output.supportingActor, 'Market Vendor Women Committee');
    assert.equal(output.awraRole, 'Facilitate accessible evidence and early participation');
    assert.match(output.relationship, /retains the mandate and response responsibility/i);
    assert.doesNotMatch(output.formalResponsibility, /Awra/i);
    assert.ok(outputIsSubstantive(output, [
      'formalResponsibility',
      'supportingInfluence',
      'relationship',
      'accountabilityImplication',
      'safeEngagementImplication',
    ]));
  });

  await t.test('rubric targets meet the approved acceptance floor', () => {
    for (const [name, scores] of Object.entries(revisedBatch1RubricTargets)) {
      assert.ok(scores.every((score) => score >= 2), `${name}: no score may be below 2`);
      assert.ok(scores[0] >= 3, `${name}: accuracy must be at least 3`);
      assert.ok(scores[1] >= 3, `${name}: HRBA relevance must be at least 3`);
      assert.ok(scores[10] >= 3, `${name}: accessibility must be at least 3`);
      assert.ok(scores[5] >= 3, `${name}: analytical depth must be at least 3`);
      assert.ok(scores[8] >= 3, `${name}: visual structure must be at least 3`);
      assert.ok(scores[11] >= 3, `${name}: portfolio usefulness must be at least 3`);
      assert.ok(scores.reduce((sum, score) => sum + score, 0) / scores.length >= 3);
    }
  });

  await t.test('only Screens 6–8 are rerouted to new Batch 1 analytical components', () => {
    const source = readFileSync(
      new URL('../src/components/course/Module3RevisedRenderer.tsx', import.meta.url),
      'utf8',
    );
    assert.match(source, /screen\.id === 'M3-R06'[\s\S]*StandardsPracticeMapScreen/);
    assert.match(source, /screen\.id === 'M3-R07'[\s\S]*RightsHolderBarrierOutputScreen/);
    assert.match(source, /screen\.id === 'M3-R08'[\s\S]*ActorResponsibilityOutputScreen/);
    assert.match(source, /screen\.id === 'M3-R09'[\s\S]*PowerInfluencePrototype/);
    assert.match(source, /screen\.id === 'M3-R14'[\s\S]*RepairedDesignPrototype/);
    assert.match(source, /hiddenFromLearnerSequence[\s\S]*CompatibilityIntegratedScreen/);
  });
});
