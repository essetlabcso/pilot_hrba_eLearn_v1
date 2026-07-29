import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const renderer = readFileSync(
  new URL('../src/components/course/Module3RevisedRenderer.tsx', import.meta.url),
  'utf8',
);
const styles = readFileSync(
  new URL('../src/components/course/module3-revised.css', import.meta.url),
  'utf8',
);
const metadata = readFileSync(
  new URL('../src/data/hrbaCourseModules.ts', import.meta.url),
  'utf8',
);

test('Module 3 final release-gate correction preserves approved content and contracts', async (t) => {
  await t.test('R01 records the unavailable approved source without substituting unrelated media', () => {
    assert.match(renderer, /videoWatch: 'https:\/\/youtu\.be\/dpZv6wTuSQU'/);
    assert.match(renderer, /videoEmbed: 'https:\/\/www\.youtube\.com\/embed\/dpZv6wTuSQU'/);
    assert.match(renderer, /availability: 'unavailable'/);
    assert.match(renderer, /role="status" aria-live="polite"/);
    assert.match(renderer, /Continue with the accessible transcript/);
    assert.match(renderer, /aria-controls=\{`\$\{screen\.id\}-transcript`\}/);
  });

  await t.test('R01 media CSS constrains a future approved iframe to a real 16:9 container', () => {
    assert.match(styles, /\.m3-video-container-169\s*\{[\s\S]*width:\s*100%/);
    assert.match(styles, /\.m3-video-container-169\s*\{[\s\S]*max-width:\s*100%/);
    assert.match(styles, /\.m3-video-container-169\s*\{[\s\S]*aspect-ratio:\s*16\s*\/\s*9/);
    assert.match(styles, /\.m3-video-container-169 iframe\s*\{[\s\S]*width:\s*100%/);
    assert.match(styles, /\.m3-video-container-169 iframe\s*\{[\s\S]*height:\s*100%/);
    assert.match(styles, /\.m3-video-container-169 iframe\s*\{[\s\S]*box-sizing:\s*border-box/);
  });

  await t.test('R02 duration is explicitly linked to authoritative Module 3 metadata', () => {
    assert.match(metadata, /moduleId: 'module_03_project_design'[\s\S]*duration: 'Approx\. 90-105 min'/);
    assert.match(renderer, /Estimated time for this module: approximately 90–105 minutes/);
    assert.doesNotMatch(renderer, /Estimated time: ~15–20 minutes/);
  });

  await t.test('R02-R04 retain semantic and canonical presentation contracts', () => {
    assert.match(renderer, /<ol className="m3-roadmap-pathway-grid" aria-label="Module 3 learning journey">/);
    assert.match(renderer, /“Invited, Counted, but Not Heard”/);
    for (const name of [
      'Context and Inequality Insight',
      'Actor and Power Insight',
      'Repaired Project-Design Element',
      'Proposal-Review Insight',
    ]) {
      assert.match(renderer, new RegExp(name));
    }
    assert.match(renderer, /m3-snapshot-preview-grid m3-b1-portfolio-preview/);
  });
});
