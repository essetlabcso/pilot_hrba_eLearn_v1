import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const renderer = readFileSync('src/components/course/Module3RevisedRenderer.tsx', 'utf8');
const styles = readFileSync('src/components/course/module3-revised.css', 'utf8');

test('Screen 8 retains required fields while grouping secondary guidance', () => {
  for (const label of [
    'Relevant actor with formal responsibility',
    'Supporting or implementation actor',
    'Bounded CSO role',
    'Capacity or support gap',
  ]) {
    assert.match(renderer, new RegExp(label));
  }
  assert.match(renderer, /data-testid=\{`m3-s08-\$\{lane\.lane\}-selector`\}/);
  assert.match(renderer, /data-testid="m3-s08-capacity-selector"/);
  assert.match(renderer, /m3-responsibility-map-secondary-guidance/);
  assert.match(renderer, /Optional community or voice actor/);
  assert.match(renderer, /data-testid="m3-s08-generate-panel"/);
  assert.match(renderer, /screen8CompletedRequirementCount/);
  assert.match(renderer, /screen8RemainingRequirements/);
  assert.match(renderer, /Ready to generate/);
  assert.match(renderer, /Not ready to generate/);
});

test('Screen 9 uses one responsive Generate panel and complete actor records', () => {
  assert.equal((renderer.match(/\{renderPowerPanel\(\)\}/g) || []).length, 1);
  assert.doesNotMatch(renderer, /m3-power-studio-mobile-drawer/);
  assert.match(renderer, /data-testid="m3-s09-generate-panel"/);
  assert.match(renderer, /screen9RemainingRequirements/);
  assert.match(renderer, /m3-power-studio-secondary-guidance/);
  assert.match(renderer, /Safe mapping guidance/);

  const actorRecordStart = renderer.indexOf('data-testid="m3-s09-rating-row"');
  const actorIdentity = renderer.indexOf('m3-power-studio-rating-actor', actorRecordStart);
  const authority = renderer.indexOf('m3-s09-authority-select', actorRecordStart);
  const influence = renderer.indexOf('m3-s09-influence-select', actorRecordStart);
  const support = renderer.indexOf('m3-s09-support-select', actorRecordStart);
  const engagement = renderer.indexOf('m3-s09-engagement-select', actorRecordStart);
  const implication = renderer.indexOf('m3-power-studio-row-implication', actorRecordStart);
  assert.ok(actorRecordStart > 0);
  assert.ok(actorIdentity < authority);
  assert.ok(authority < influence);
  assert.ok(influence < support);
  assert.ok(support < engagement);
  assert.ok(engagement < implication);
});

test('M3-B responsive styles keep actor units readable without broad global changes', () => {
  assert.match(styles, /\.m3-responsibility-map-role-row\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(260px,\s*1fr\)\)/);
  assert.match(styles, /\.m3-responsibility-map-row-barrier\s*\{[\s\S]*grid-column:\s*1\s*\/\s*-1/);
  assert.match(styles, /\.m3-power-studio-rating-row\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(220px,\s*1fr\)\)/);
  assert.match(styles, /@media \(max-width:\s*980px\)[\s\S]*\.m3-power-studio-rating-row\s*\{[\s\S]*grid-template-columns:\s*1fr/);
  assert.match(styles, /\.m3-responsibility-map-secondary-guidance/);
  assert.match(styles, /\.m3-power-studio-secondary-guidance/);
});

test('Module 3 routes and completion calls remain canonical', () => {
  assert.match(renderer, /screenId:\s*'M3-R08'/);
  assert.match(renderer, /screenId:\s*'M3-R09'/);
  assert.match(renderer, /module3:\s*\{\s*screen8:\s*submittedOutput\s*\}/);
  assert.match(renderer, /module3:\s*\{\s*screen9:\s*submittedOutput\s*\}/);
  assert.match(renderer, /dutyBearerActorResponsibilityMap:\s*submittedOutput/);
  assert.match(renderer, /powerInfluenceMap:\s*\{/);
});
