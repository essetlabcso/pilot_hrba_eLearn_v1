import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const renderer = readFileSync(
  new URL('../src/components/course/module2-final/Module2FinalRenderer.tsx', import.meta.url),
  'utf8',
);
const styles = readFileSync(
  new URL('../src/components/course/module2-final/module2Final.css', import.meta.url),
  'utf8',
);

test('Screen 6 exposes exact visible and programmatic divider guidance', () => {
  assert.match(renderer, /Drag the blue divider left or right to compare the Needs Lens and the Rights Lens\./);
  assert.match(renderer, /id="m2-final-water-compare-instruction"/);
  assert.match(renderer, /className="m2-final-compare m2-final-water-compare"[\s\S]*?aria-describedby="m2-final-water-compare-instruction"/);
  assert.match(renderer, /type="range"[\s\S]*?aria-describedby="m2-final-water-compare-instruction"/);
  assert.match(renderer, /setSliderInteracted\(true\)/);
  assert.match(renderer, /event\.key === 'ArrowLeft'[\s\S]*?event\.key === 'ArrowRight'/);
  assert.match(styles, /\.m2-final-slider-label input:focus-visible/);
  assert.match(styles, /\.m2-final-compare__handle::after \{[\s\S]*?content: '↔'/);
  assert.match(styles, /\.m2-final-interaction-instruction \{[\s\S]*?background: #EEF7FC/);
  assert.equal(styles.includes('outline: 3px solid var(--focus-ring);'), false);
});

test('Screen 7 exposes exact visible card guidance without changing its reveal gate', () => {
  assert.match(renderer, /Select each group card to reveal why the group holds rights\./);
  assert.match(renderer, /id="m2-final-rights-card-instruction"/);
  assert.match(renderer, /className="m2-final-card-grid m2-final-rights-grid"[\s\S]*?aria-describedby="m2-final-rights-card-instruction"/);
  assert.match(renderer, /const allOpen = cards\.every\(\(card\) => opened\[card\.id\]\)/);
  assert.match(renderer, /aria-expanded=\{isOpen\}/);
  assert.match(renderer, /\{isOpen \? 'Viewed' : 'Reveal'\}/);
  assert.match(renderer, /disabled=\{!allOpen\}/);
});

test('existing PANEL and knowledge-check guidance and semantics remain protected', () => {
  assert.match(renderer, /Open each card to review the practical rule\./);
  assert.match(renderer, /m2-final-panel-card[\s\S]*?<button[\s\S]*?aria-expanded=\{isOpen\}/);
  assert.match(renderer, /<fieldset key=\{question\.id\} className="m2-final-kc-question">/);
  assert.match(renderer, /<legend>[\s\S]*?\{question\.prompt\}/);
  assert.match(renderer, /type="radio"/);
  assert.match(renderer, /isCompleted && option\.id === question\.correctOptionId \? 'is-correct'/);
  assert.match(renderer, /aria-live="polite"/);
});
