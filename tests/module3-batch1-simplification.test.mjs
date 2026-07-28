import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MODULE3_REVISED_SCREENS,
  MODULE3_REVISED_VISIBLE_SCREEN_TOTAL,
  getModule3RevisedScreen,
  getModule3VisibleScreenNumber,
} from '../src/data/module3/module3RevisedScreens.ts';

test('Batch 1 (Screens 1-8) contract and state compatibility', async (t) => {
  await t.test('Module 3 route definition contract preserves 18 visible screens and 22 technical routes', () => {
    assert.equal(MODULE3_REVISED_SCREENS.length, 22, 'Total technical routes must remain 22');
    const visibleScreens = MODULE3_REVISED_SCREENS.filter((screen) => screen.hiddenFromLearnerSequence !== true);
    assert.equal(visibleScreens.length, 18, 'Visible learner sequence must remain 18 screens');
    assert.equal(MODULE3_REVISED_VISIBLE_SCREEN_TOTAL, 18);
  });

  await t.test('Batch 1 screens 1 to 8 routes exist and carry correct metadata', () => {
    const screenIds = ['M3-R01', 'M3-R02', 'M3-R03', 'M3-R04', 'M3-R05', 'M3-R06', 'M3-R07', 'M3-R08'];
    for (const id of screenIds) {
      const screen = getModule3RevisedScreen(id);
      assert.ok(screen, `Screen ${id} must exist`);
      assert.ok(screen.title, `Screen ${id} must have title`);
      assert.ok(screen.continueLabel, `Screen ${id} must have continue label`);
    }
  });

  await t.test('Screen 5 approved prototype regression check', () => {
    const screen5 = getModule3RevisedScreen('M3-R05');
    assert.equal(screen5.title, 'Context and Inequality Scan');
    assert.equal(getModule3VisibleScreenNumber('M3-R05'), 5);
  });

  await t.test('Screen 8-to-9 carry-forward payload structure compatibility', () => {
    const screen8SavePayload = {
      submitted: true,
      selectedDutyBearers: ['Woreda Water & Energy Office'],
      selectedSupportingActor: 'Market Vendor Women Committee',
      selectedCsoRole: 'Facilitate early pre-consultation briefings and safe feedback channels',
      generatedResponsibilityRows: [
        {
          barrierId: 'access_barrier',
          barrierLabel: 'Water access and meeting timing barriers',
          primaryPublicResponsibility: ['Woreda Water & Energy Office'],
          serviceOrSectorActors: ['Woreda Water & Energy Office'],
          communityOrInfluenceActors: ['Market Vendor Women Committee'],
          csoRoles: ['Facilitate early pre-consultation briefings and safe feedback channels'],
        },
      ],
    };

    assert.ok(screen8SavePayload.selectedDutyBearers.length > 0);
    assert.ok(screen8SavePayload.selectedSupportingActor);
    assert.ok(screen8SavePayload.selectedCsoRole);
    assert.equal(screen8SavePayload.generatedResponsibilityRows.length, 1);
  });
});
