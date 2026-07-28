import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const renderer = readFileSync('src/components/course/Module3RevisedRenderer.tsx', 'utf8');
const styles = readFileSync('src/components/course/module3-revised.css', 'utf8');

test('Screen 8 retains duty-bearer, supporting actor and CSO role selection', () => {
  const screenStart = renderer.indexOf('function ResponsibilityMapScreen');
  const screenEnd = renderer.indexOf('\nfunction PowerInfluenceMapScreen', screenStart);
  const screen8 = renderer.slice(screenStart, screenEnd > screenStart ? screenEnd : screenStart + 8000);

  // Three actor-section cards with the simplified architecture
  assert.ok(screen8.includes('Section 1: Who has formal responsibility?'));
  assert.ok(screen8.includes('Section 2: Who can support or influence change?'));
  assert.ok(screen8.includes('Section 3: What can Awra (CSO) realistically do?'));

  // Key state variables for the simplified flow
  assert.ok(screen8.includes('selectedDutyBearers'));
  assert.ok(screen8.includes('selectedSupportingActor'));
  assert.ok(screen8.includes('selectedCsoRole'));

  // Actor options are present
  assert.ok(screen8.includes('Woreda Water & Energy Office'));
  assert.ok(screen8.includes('Market Vendor Women Committee'));

  // Save payload preserves backward-compatible structure
  assert.ok(screen8.includes('generatedResponsibilityRows'));
  assert.ok(screen8.includes('dutyBearerActorMap'));
});

test('Screen 9 uses a three-section enabler, blocker and safe strategy flow', () => {
  const screenStart = renderer.indexOf('function PowerInfluenceMapScreen');
  const screenEnd = renderer.indexOf('\nfunction ChoiceScaffold', screenStart);
  const screen9 = renderer.slice(screenStart, screenEnd > screenStart ? screenEnd : screenStart + 8000);

  // Three sections with simplified card-based selection
  assert.ok(screen9.includes('1. Primary Enabler Actor'));
  assert.ok(screen9.includes('2. Potential Blocker or Risk Actor'));
  assert.ok(screen9.includes('3. Safe Influence Strategy'));

  // Key state variables
  assert.ok(screen9.includes('selectedEnabler'));
  assert.ok(screen9.includes('selectedBlocker'));
  assert.ok(screen9.includes('selectedSafeStrategy'));

  // Save payload preserves backward-compatible structure
  assert.ok(screen9.includes('actorPowerInsight'));
  assert.ok(screen9.includes('powerInfluenceMap'));
  assert.ok(screen9.includes('primaryRightsHolders'));
  assert.ok(screen9.includes('dutyBearersAndRoles'));
  assert.ok(screen9.includes('powerStrategy'));

  // No old mobile drawer pattern
  assert.doesNotMatch(renderer, /m3-power-studio-mobile-drawer/);
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
  // Screen IDs are still referenced in the renderer dispatch
  assert.match(renderer, /screen\.id === 'M3-R08'/);
  assert.match(renderer, /screen\.id === 'M3-R09'/);

  // Screen 8 save payload contains duty-bearer actor map
  assert.match(renderer, /dutyBearerActorMap:/);
  assert.match(renderer, /generatedResponsibilityRows:/);

  // Screen 9 save payload contains power and influence map
  assert.match(renderer, /actorPowerInsight:/);
  assert.match(renderer, /powerInfluenceMap:\s*\{/);
});
