import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('Screen 5 reduces classification repetition while preserving governed evidence state', () => {
  const source = read('src/components/course/module4/Module4EnhancedBatch1.tsx');

  assert.match(source, /Review and confirm the prepared evidence distinction/);
  assert.match(source, /Use distinction and review next area/);
  assert.match(source, /Confirmed evidence/);
  assert.match(source, /Still needs checking/);
  assert.match(source, /const preparedClassifications = Object\.fromEntries/);
  assert.match(source, /classifications:\s*\{/);
  assert.match(source, /evidenceClassifications/);
  assert.match(source, /selectedWorkstream/);
  assert.doesNotMatch(source, /Classify each statement accurately before moving on/);
});

test('Screen 8 uses four focused decisions and writes the existing pathway outputs', () => {
  const source = read('src/components/course/module4/Module4EnhancedBatch2.tsx');

  assert.match(source, /function FocusedFeedbackLoopScreen/);
  assert.match(source, /Who should own the response\?/);
  assert.match(source, /What is the most proportionate response\?/);
  assert.match(source, /What should the account-back commitment include\?/);
  assert.match(source, /What is the strongest follow-up commitment\?/);
  assert.match(source, /feedbackAccountBackActions/);
  assert.match(source, /actorResponsibilities/);
  assert.match(source, /pathwaySaved:\s*true/);
  assert.match(source, /aria-labelledby="m4-focused-feedback-summary"[\s\S]*role="status"[\s\S]*aria-live="polite"/);
  assert.match(source, /recordModule4EnhancedScreenCompletion/);
});

test('Screen 9 uses eight focused judgments and preserves responsibility outputs', () => {
  const source = read('src/components/course/module4/Module4EnhancedBatch3.tsx');

  assert.match(source, /function FocusedRolesScreen/);
  assert.match(source, /Set the responsibility boundaries/);
  assert.match(source, /Choose the proportionate response\./);
  assert.match(source, /Choose the engagement or escalation judgment\./);
  assert.match(source, /Choose the follow-up and review commitment\./);
  assert.match(source, /actorResponsibilities/);
  assert.match(source, /engagementDecisions/);
  assert.match(source, /planSaved:\s*true/);
  assert.match(source, /aria-labelledby="m4-focused-role-summary"[\s\S]*role="status"[\s\S]*aria-live="polite"/);
  assert.match(source, /recordModule4EnhancedScreenCompletion/);
});

test('first-visit and stale-output guidance are distinct on Screens 6-13', () => {
  for (const path of [
    'src/components/course/module4/Module4EnhancedBatch2.tsx',
    'src/components/course/module4/Module4EnhancedBatch3.tsx',
    'src/components/course/module4/Module4EnhancedBatch4.tsx',
  ]) {
    const source = read(path);
    assert.match(source, /Complete this activity to create your implementation output\./);
    assert.match(source, /Your earlier output needs review because related information has changed\./);
  }

  const batch2 = read('src/components/course/module4/Module4EnhancedBatch2.tsx');
  const batch3 = read('src/components/course/module4/Module4EnhancedBatch3.tsx');
  assert.match(batch2, /hasSavedOutput/);
  assert.match(batch3, /hasSavedOutput/);
});

test('Screen 4 and Screen 7 responsive rules preserve readable semantic layouts', () => {
  const source = read('src/components/course/module4/Module4EnhancedBatch1.tsx');
  const css = read('src/components/course/module4/module4-enhanced.css');

  assert.match(source, /aria-current=\{isActive \? 'step' : undefined\}/);
  assert.match(source, /aria-label=\{`\$\{stepNumber\}\. \$\{step\.title\}\. \$\{visualState\}\.`\}/);
  assert.match(source, /Current step/);
  assert.match(source, /Available next/);
  assert.match(css, /\.m4-enhanced-screen--lens \.m4-enhanced-screen__workspace\s*\{/);
  assert.match(css, /grid-template-columns:\s*minmax\(18rem,\s*0\.9fr\)\s*minmax\(0,\s*1\.5fr\)/);
  assert.match(css, /\.m4-enhanced-step-detail\s*\{[\s\S]*border-left:\s*0\.3rem solid var\(--m4-enhanced-teal\)/);
  assert.match(css, /\.m4-enhanced-screen--participation \.m4-b2-stage-path/);
  assert.match(css, /container-type:\s*inline-size/);
  assert.match(css, /@container \(min-width:\s*48rem\)/);
  assert.match(css, /grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
});

test('focused changes do not alter canonical routes or cross-course contracts', () => {
  const renderer = read('src/components/course/Module4Renderer.tsx');
  const app = read('src/App.tsx');
  const hub = read('src/integration/hubProgress.ts');

  for (const screen of ['M4-S1-03', 'M4-S1-04', 'M4-S1-06', 'M4-S1-07', 'M4-S1-08']) {
    assert.match(renderer, new RegExp(screen));
  }
  assert.match(app, /\/module-5\/screen-5-1/);
  assert.match(app, /assessment_completed/);
  assert.match(app, /course_completed/);
  assert.match(hub, /\| 'module_completed'/);
  assert.match(hub, /window\.parent\.postMessage/);
});
