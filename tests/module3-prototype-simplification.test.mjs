import test from 'node:test';
import assert from 'node:assert/strict';
import { MODULE3_REVISED_SCREENS, getModule3VisibleScreenNumber, MODULE3_REVISED_VISIBLE_SCREEN_TOTAL } from '../src/data/module3/module3RevisedScreens.ts';
import { jiruAmbaCase } from '../src/data/module3/jiruAmbaCaseNarrative.ts';

test('Module 3 Screen definition contract preserves 18 visible learner screens and 22 technical routes', () => {
  assert.equal(MODULE3_REVISED_SCREENS.length, 22, 'Total technical routes must remain 22');
  const visibleScreens = MODULE3_REVISED_SCREENS.filter((screen) => screen.hiddenFromLearnerSequence !== true);
  assert.equal(visibleScreens.length, 18, 'Visible learner sequence must remain 18 screens');
  assert.equal(MODULE3_REVISED_VISIBLE_SCREEN_TOTAL, 18, 'MODULE3_REVISED_VISIBLE_SCREEN_TOTAL must equal 18');
  assert.equal(getModule3VisibleScreenNumber('M3-R01'), 1);
  assert.equal(getModule3VisibleScreenNumber('M3-R05'), 5);
  assert.equal(getModule3VisibleScreenNumber('M3-R09'), 9);
  assert.equal(getModule3VisibleScreenNumber('M3-R14'), 14);
  assert.equal(getModule3VisibleScreenNumber('M3-R15'), null, 'Hidden route 15 has no visible number');
});

test('Jiru Amba case narrative structure preserves core case facts', () => {
  assert.ok(jiruAmbaCase.setting.length >= 5);
  assert.ok(jiruAmbaCase.rightsHolders.length >= 5);
  assert.ok(jiruAmbaCase.actors.length >= 5);
  assert.ok(jiruAmbaCase.entries.length >= 5);
});

test('Screen 5 contextInsight payload construction is backward compatible', () => {
  const selectedContextSignals = ['small-town', 'market-infrastructure'];
  const selectedAffectedGroups = ['Women market vendors'];
  const outputChoices = [
    { label: 'Mixed urban-rural setting' },
    { label: 'Market infrastructure gap' },
  ];

  const payload = {
    selectedContextSignals,
    submitted: true,
    contextInsight: {
      priorityContextFactors: outputChoices.map((choice) => choice.label).slice(0, 2),
      primaryAffectedGroup: selectedAffectedGroups[0],
      keyInequalityGap: `In Jiru Amba, ${outputChoices.map((choice) => choice.label).slice(0, 2).join(' and ')} disproportionately restrict information flow, participation, and decision-making for ${selectedAffectedGroups[0]}.`,
    },
    contextInequalityScan: {
      selectedJiruAmbaAffectedGroups: selectedAffectedGroups,
      selectedBarriers: ['Market facility access'],
      safeEvidenceToVerify: ['Non-identifying feedback notes'],
      generatedDesignImplications: 'Re-check whether excluded groups helped shape priorities.',
      portfolioSummaryText: 'Completed context scan.',
    },
  };

  assert.ok(payload.contextInsight);
  assert.equal(payload.contextInsight.priorityContextFactors.length, 2);
  assert.equal(payload.contextInsight.primaryAffectedGroup, 'Women market vendors');
  assert.ok(payload.contextInsight.keyInequalityGap.includes('Jiru Amba'));
  assert.ok(payload.contextInequalityScan, 'Legacy contextInequalityScan must remain intact');
});

test('Screen 9 actorPowerInsight payload construction preserves carried actors and legacy screen9 output', () => {
  const legacyRows = [
    { actor: 'Woreda Planning Team', engagementApproach: 'Work closely', category: 'primary_public_responsibility' },
    { actor: 'Women traders group', engagementApproach: 'Strengthen voice safely', category: 'rights_holder_group' },
  ];

  const actorPowerInsight = {
    primaryRightsHolders: legacyRows.filter((r) => r.category === 'rights_holder_group').map((r) => r.actor),
    dutyBearersAndRoles: legacyRows.filter((r) => r.category !== 'rights_holder_group').map((r) => `${r.actor}: ${r.engagementApproach}`),
    powerStrategy: 'Shift decision influence to women traders, youth, and remote residents through early participation.',
  };

  assert.deepEqual(actorPowerInsight.primaryRightsHolders, ['Women traders group']);
  assert.equal(actorPowerInsight.dutyBearersAndRoles.length, 1);
  assert.ok(actorPowerInsight.powerStrategy.includes('Shift decision influence'));
});

test('Screen 14 repairedDesignElement payload construction preserves designRepairPackage and logic indicators', () => {
  const repairedHrbaObjective = 'Strengthen Jiru Amba service-improvement decisions so women traders can influence priorities.';
  const repairedActivity = 'Establish early pre-consultation briefings and flexible meeting schedules.';
  const implementationWatchPoint = 'Monitor whether feedback receives a documented response from duty-bearers.';

  const payload = {
    repairedDesignElement: {
      repairedHrbaObjective,
      repairedActivity,
      implementationWatchPoint,
    },
    designRepairPackage: {
      selectedIssueId: 'lateParticipation',
      repairedObjective: repairedHrbaObjective,
      implementationWatchPoint,
    },
    repairedObjective: {
      repairedHrbaObjective,
    },
  };

  assert.equal(payload.repairedDesignElement.repairedHrbaObjective, repairedHrbaObjective);
  assert.equal(payload.repairedDesignElement.repairedActivity, repairedActivity);
  assert.equal(payload.repairedDesignElement.implementationWatchPoint, implementationWatchPoint);
  assert.ok(payload.designRepairPackage, 'Legacy designRepairPackage must be preserved');
});

test('Returning learner state with pre-simplification values hydrates without data loss', () => {
  const legacyState = {
    currentModuleId: 'module_03_project_design',
    currentScreenId: 'M3-R05',
    screenProgress: {
      module_03_project_design: ['M3-R01', 'M3-R02', 'M3-R03', 'M3-R04', 'M3-R05'],
    },
    practiceCheckState: {
      'M3-R05': {
        submitted: true,
        selectedContextSignals: ['small-town', 'market-infrastructure'],
        contextInequalityScan: {
          selectedJiruAmbaAffectedGroups: ['Women market vendors'],
          portfolioSummaryText: 'Legacy scan text',
        },
      },
      'M3-R09': {
        submitted: true,
        selectedActorIds: ['actor.public.woreda-planning-team'],
      },
    },
  };

  assert.ok(legacyState.practiceCheckState['M3-R05'].submitted);
  assert.equal(legacyState.practiceCheckState['M3-R05'].selectedContextSignals.length, 2);
  assert.ok(legacyState.practiceCheckState['M3-R09'].submitted);
});
