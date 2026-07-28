import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const renderer = readFileSync(
  new URL('../src/components/course/Module3RevisedRenderer.tsx', import.meta.url),
  'utf8',
);
const revisedCss = readFileSync(
  new URL('../src/components/course/module3-revised.css', import.meta.url),
  'utf8',
);
const batch2Renderer = readFileSync(
  new URL('../src/components/course/Module3Batch2Screens.tsx', import.meta.url),
  'utf8',
);

test('Screen 5 uses a simplified two-stage flow with context factors and affected group selection', () => {
  const screenStart = renderer.indexOf('function ContextInequalityScanScreen');
  const screenEnd = renderer.indexOf('\nexport function PolicyStandardsMapScreen', screenStart);
  const screen5 = renderer.slice(screenStart, screenEnd > screenStart ? screenEnd : screenStart + 8000);

  // Stage 1: context factors with toggle selection
  assert.ok(screen5.includes('Stage 1: Select priority context factors'));
  assert.ok(screen5.includes('contextFactorOptions'));
  assert.ok(screen5.includes('toggleFactor'));

  // Stage 2: affected group with radio-style selection
  assert.ok(screen5.includes('Stage 2: Select primary affected group'));
  assert.ok(screen5.includes('affectedGroupOptions'));
  assert.ok(screen5.includes('selectedAffectedGroup'));

  // Generated insight carries forward
  assert.ok(screen5.includes('Generated Context & Inequality Insight'));
  assert.ok(screen5.includes('keyInequalityGap'));
  assert.ok(screen5.includes('contextInsight'));

  // Save payload preserves backward-compatible structure
  assert.match(renderer, /contextInequalityScan:/);
  assert.match(renderer, /contextScanSummary:/);
  assert.match(renderer, /affectedGroupsToExamine:/);
  assert.match(renderer, /barriersToTest:/);
});

test('shared Generate panel exposes only progress, exact remaining work, readiness and one action', () => {
  const panelStart = renderer.indexOf('function GuidedGeneratePanel');
  const panelEnd = renderer.indexOf('function ScreenShell', panelStart + 1);
  const panel = renderer.slice(panelStart, panelEnd > panelStart ? panelEnd : panelStart + 5000);

  assert.match(panel, /requirements complete/);
  assert.match(panel, /remainingRequirements\.map/);
  assert.match(panel, /Ready to generate/);
  assert.match(panel, /Not ready to generate/);
  assert.equal((panel.match(/<button/g) || []).length, 1);
});

test('Screen 11 preserves five stages and provides a responsive labelled classification structure', () => {
  for (const id of [
    'm3-s11-stage-understand',
    'm3-s11-stage-example',
    'm3-s11-stage-practice',
    'm3-s11-stage-review',
    'm3-s11-stage-apply',
  ]) {
    assert.ok(renderer.includes(`'${id}'`));
  }
  assert.ok(renderer.includes('data-testid="m3-s11-responsive-classifications"'));
  assert.ok(renderer.includes('data-testid="m3-s11-classification-row"'));
  assert.match(renderer, /aria-label=\{`Classification for \$\{signal\.title\}`\}/);
  assert.ok(revisedCss.includes('.m3-s11-classification-header'));
  assert.match(revisedCss, /@media \(max-width: 900px\)[\s\S]*?\.m3-s11-classification-list label \{[\s\S]*?grid-template-columns: 1fr/);
  assert.match(revisedCss, /\.m3-s11-method-table > \* \{[\s\S]*?min-width: 0/);
});

test('Screen 4 wording distinguishes orientation review from later output status without changing progression data', () => {
  assert.match(batch2Renderer, /orientation phases reviewed/);
  assert.match(batch2Renderer, /Current action:/);
  assert.match(batch2Renderer, /Later output not started/);
  assert.match(batch2Renderer, /Later output completed/);
  assert.match(batch2Renderer, /Orientation takeaway:/);
  assert.match(batch2Renderer, /screen4Complete:complete/);
  assert.match(batch2Renderer, /outputExists\(state,output\[2\],output\[3\]\)/);
});
