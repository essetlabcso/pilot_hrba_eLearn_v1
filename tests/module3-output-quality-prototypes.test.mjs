import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

const testVite = await createServer({
  appType: 'custom',
  logLevel: 'silent',
  server: { middlewareMode: true },
});

after(() => testVite.close());

const {
  buildActorPowerInsight,
  buildContextInsight,
  buildParticipationPathway,
  buildRepairedDesignElement,
  module3PrototypeRubricTargets,
  outputHasRequiredSections,
} = await testVite.ssrLoadModule('/src/components/course/Module3OutputQualityPrototypes.tsx');

test('Screen 5 generates a six-part evidence-based Context and Inequality Insight', () => {
  const first = buildContextInsight(
    ['Kebele distance and transport costs', 'Public water-service access and timing'],
    'Women market vendors and traders',
  );
  const second = buildContextInsight(
    ['Health-post renovation and accessibility', 'Youth livelihood training entry barriers'],
    'Persons with disabilities',
  );

  assert.equal(first.selectedContextualConditions.length, 2);
  assert.equal(first.caseEvidence.length, 2);
  assert.ok(outputHasRequiredSections(first, [
    'priorityAffectedGroup',
    'selectedContextualConditions',
    'caseEvidence',
    'inequalityPattern',
    'accessParticipationEffect',
    'evidenceGap',
    'projectDesignImplication',
    'sourceSignature',
  ]));
  assert.match(first.evidenceGap, /verify/i);
  assert.notEqual(first.sourceSignature, second.sourceSignature);
  assert.notEqual(first.projectDesignImplication, second.projectDesignImplication);
});

test('Screen 9 keeps formal authority distinct from practical influence', () => {
  const screen8 = {
    selectedDutyBearers: ['Woreda Water & Energy Office'],
    selectedSupportingActor: 'Market Vendor Women Committee',
    selectedCsoRole: 'Facilitate accessible evidence and follow-up',
  };
  const first = buildActorPowerInsight(
    'Woreda Water & Energy Office focal point',
    'District Finance & Allocation Committee',
    'Pre-consultation alignment and non-identifying evidence briefings',
    screen8,
  );
  const second = buildActorPowerInsight(
    'Market Vendor Women Committee representatives',
    'Informal Water Truck Operators',
    'Parallel feedback channels and quiet diplomacy',
    screen8,
  );

  assert.ok(first.actors.length >= 6);
  assert.ok(first.actors.some((actor) => actor.authority === 'Formal authority' && actor.influence === 'Higher'));
  assert.ok(second.actors.some((actor) => actor.authority === 'No formal authority' && actor.influence === 'Higher'));
  assert.ok(first.actors.every((actor) => actor.role && actor.position && actor.engagement && actor.risk));
  assert.notEqual(first.sourceSignature, second.sourceSignature);
  assert.notEqual(first.recommendation, second.recommendation);
});

test('Screen 12 generates four complete phases from three learner decisions and carried data', () => {
  const pathway = buildParticipationPathway(
    'Early accessible briefings in kebeles and the market',
    'Small-group priority setting before the public meeting',
    'Public response log with accessible explanation and follow-up date',
    {
      groups: ['Women traders', 'remote kebele residents'],
      barriers: ['Late information', 'transport cost'],
      dutyBearers: ['Woreda planning office'],
      inclusion: ['Accessible formats', 'reasonable accommodation'],
    },
  );

  assert.equal(pathway.phases.length, 4);
  assert.deepEqual(pathway.phases.map((phase) => phase.title), [
    'Prepare access and information',
    'Enable participation and influence',
    'Receive, respond and explain',
    'Adapt, follow up and monitor',
  ]);
  assert.ok(pathway.phases.every((phase) => phase.steps.length >= 2 && phase.responsibleActors.length > 0));
  assert.match(JSON.stringify(pathway), /Women traders/);
  assert.match(JSON.stringify(pathway), /Woreda planning office/);
});

test('Screen 14 generates all ten required design-repair elements', () => {
  const output = buildRepairedDesignElement(
    'Enable priority groups to influence decisions and receive a response.',
    'Provide early accessible briefings and documented responses.',
    'Check whether priorities lead to a documented adjustment.',
    'Review this at the first quarterly meeting.',
    {
      context: { priorityAffectedGroup: 'Women traders' },
      power: {
        selectedEnabler: 'Woreda Water Office',
        selectedBlocker: 'Finance Committee',
      },
      participation: {
        participationMethod: 'Small-group priority setting',
        responseMethod: 'Public response log',
      },
      risk: { monitoringSignal: 'unanswered feedback' },
    },
  );

  assert.ok(outputHasRequiredSections(output, [
    'originalDesignWeakness',
    'repairedHrbaObjective',
    'rightsResponsiveActivityPackage',
    'participationMechanism',
    'accountabilityFeedbackMechanism',
    'inclusionAccessibilityFeature',
    'riskSafeguard',
    'indicatorWatchPoint',
    'implementationImplication',
    'hrbaReasoning',
    'sourceSignature',
  ]));
  assert.equal(output.rightsResponsiveActivityPackage.length, 3);
  assert.match(output.hrbaReasoning, /responsibility/i);
  assert.match(output.riskSafeguard, /pause or adapt/i);
});

test('Screen 14 uses container-aware reflow and natural generated-text wrapping', async () => {
  const css = await import('node:fs/promises').then(({ readFile }) => (
    readFile(new URL('../src/components/course/module3-output-quality.css', import.meta.url), 'utf8')
  ));

  assert.match(css, /\.m3-oq-output\s*\{[^}]*container-name:\s*m3-output-quality;/s);
  assert.match(css, /@container m3-output-quality \(max-width: 46rem\)/);
  assert.match(
    css,
    /@container m3-output-quality[\s\S]*?\.m3-oq-before-after\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/,
  );
  assert.match(
    css,
    /@container m3-output-quality[\s\S]*?\.m3-oq-before-after \.m3-oq-repair-details > div\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/,
  );
  assert.match(
    css,
    /\.m3-oq-output \.m3-oq-before-after :is\([^)]*\)\s*\{[^}]*overflow-wrap:\s*break-word;[^}]*word-break:\s*normal;/s,
  );
});

test('prototype rubric targets meet the approved acceptance floor', () => {
  for (const [name, scores] of Object.entries(module3PrototypeRubricTargets)) {
    assert.equal(scores.length, 12, `${name} must cover all twelve rubric dimensions`);
    assert.ok(scores.every((score) => score >= 2), `${name} has a score below 2`);
    assert.ok(scores[0] >= 3 && scores[1] >= 3 && scores[10] >= 3, `${name} misses an essential floor`);
    assert.ok(scores[5] >= 3 && scores[8] >= 3 && scores[11] >= 3, `${name} misses an output-quality floor`);
    assert.ok(scores.reduce((sum, score) => sum + score, 0) / scores.length >= 3);
  }
});

test('hidden compatibility routes are intercepted before legacy workflow renderers', async () => {
  const source = await import('node:fs/promises').then(({ readFile }) => (
    readFile(new URL('../src/components/course/Module3RevisedRenderer.tsx', import.meta.url), 'utf8')
  ));
  const compatibilityIndex = source.indexOf('screen.hiddenFromLearnerSequence');
  const legacyScreen15Index = source.indexOf("if (screen.id === 'M3-R15')");
  assert.ok(compatibilityIndex > 0);
  assert.equal(legacyScreen15Index, -1);
  assert.match(source, /CompatibilityIntegratedScreen/);
});
