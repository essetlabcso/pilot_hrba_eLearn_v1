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

test('Screen 5 uses one responsive Generate panel and keeps the snapshot in Review only', () => {
  const practiceStart = renderer.indexOf('{activeStage === 4 && (', renderer.indexOf('function ContextInequalityScanScreen'));
  const reviewStart = renderer.indexOf('{activeStage === 5 && (', practiceStart);
  const applyStart = renderer.indexOf('{activeStage === 6 && (', reviewStart);
  const practice = renderer.slice(practiceStart, reviewStart);
  const review = renderer.slice(reviewStart, applyStart);

  assert.equal(practice.includes('<ContextInequalitySnapshot'), false);
  assert.equal(review.includes('<ContextInequalitySnapshot'), true);
  assert.equal((renderer.match(/testId="m3-s05-generate-panel"/g) || []).length, 1);
  assert.equal((practice.match(/renderScanPanel\(\)/g) || []).length, 1);
  assert.match(renderer, /Include at least one affected-group signal\./);
  assert.match(renderer, /Include at least one possible-barrier signal\./);
  assert.match(renderer, /Include at least one safe-evidence signal\./);
  assert.match(renderer, /Include at least one signal that goes beyond surface activity evidence\./);
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
