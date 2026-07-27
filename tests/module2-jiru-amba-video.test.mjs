import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const renderer = readFileSync(
  new URL('../src/components/course/module2-final/Module2FinalRenderer.tsx', import.meta.url),
  'utf8',
);
const assets = readFileSync(
  new URL('../src/data/module2-final/module2FinalAssets.ts', import.meta.url),
  'utf8',
);
const screens = readFileSync(
  new URL('../src/data/module2-final/module2FinalScreens.ts', import.meta.url),
  'utf8',
);
const styles = readFileSync(
  new URL('../src/components/course/module2-final/module2Final.css', import.meta.url),
  'utf8',
);

const introStart = renderer.indexOf('function IntroScreen');
const introEnd = renderer.indexOf('function ObjectivesScreen', introStart);
const intro = renderer.slice(introStart, introEnd);

test('Screen 2 uses the approved privacy-enhanced public video configuration', () => {
  assert.match(assets, /embedUrl: 'https:\/\/www\.youtube-nocookie\.com\/embed\/A-60i7LvlBM'/);
  assert.match(assets, /publicUrl: 'https:\/\/youtu\.be\/A-60i7LvlBM'/);
  assert.equal(assets.includes('autoplay'), false);
  assert.match(intro, /title=\{module2FinalIntroVideo\.iframeTitle\}/);
  assert.match(intro, /loading="lazy"/);
  assert.match(intro, /allowFullScreen/);
  assert.match(intro, /watch the Jiru Amba case introduction on YouTube/);
});

test('Screen 2 presents the approved transcript, story summary and learner transition', () => {
  assert.match(assets, /Welcome to Jiru Amba, a fictional Ethiopian local development setting created for this course\./);
  assert.match(assets, /In Module 2, Jiru Amba helps you begin seeing everyday issues through a rights lens\./);
  assert.match(intro, /<summary id="m2-final-intro-transcript-title">Video transcript<\/summary>/);
  assert.match(intro, /module2FinalIntroVideo\.transcript\.map/);
  assert.match(intro, /Jiru Amba story summary/);
  assert.match(intro, /Prefer to read or have limited internet access\? Use this illustrated summary to follow the same case introduction\./);
  assert.match(intro, /Four illustrated Jiru Amba scenes:/);
  assert.match(intro, /As you continue, notice who may be excluded, who holds rights, who has responsibilities, whose voice influences decisions, and what should happen after people provide feedback\./);
});

test('Screen 2 removes temporary production language and preserves its route and navigation contract', () => {
  for (const temporaryText of [
    'final video will be produced later',
    'placeholder',
    'approved narration script',
    'storyboard',
    'stable fallback',
    'Caption and transcript area',
  ]) {
    assert.equal(intro.toLowerCase().includes(temporaryText.toLowerCase()), false);
  }
  assert.match(intro, /eyebrow="Module 2 intro"/);
  assert.equal(intro.includes('Screen 1.1'), false);
  assert.match(intro, /ContinueButton label="Continue to Module 2 Content" onClick=\{onNext\}/);
  assert.match(screens, /id: 'M2-Intro'[\s\S]*?route: '\/module-2\/intro-video'/);
  assert.match(screens, /id: 'M2-Intro'[\s\S]*?title: 'The Jiru Amba Initiative: A New Perspective'/);
});

test('Screen 6 gains only the approved presentation label and Jiru Amba case bridge', () => {
  assert.match(renderer, /eyebrow="Module 2 · Screen 6"/);
  assert.match(renderer, /From the Jiru Amba case: Water-service repair is one activity in the Jiru Amba Futures Plan\. Compare how the same water challenge looks through a Needs Lens and a Rights Lens\./);
  assert.match(renderer, /Drag the blue divider left or right to compare the Needs Lens and the Rights Lens\./);
  assert.match(renderer, /type="range"[\s\S]*?setSliderInteracted\(true\)/);
  assert.match(renderer, /ContinueButton label="Next: Identifying the Actors" onClick=\{onNext\} disabled=\{!canContinue\}/);
});

test('Screen 2 video and support sections use responsive, accessible presentation rules', () => {
  assert.match(styles, /\.m2-final-intro-video__frame \{[\s\S]*?aspect-ratio: 16 \/ 9/);
  assert.match(styles, /\.m2-final-intro-video__frame iframe \{[\s\S]*?width: 100%[\s\S]*?height: 100%/);
  assert.match(styles, /\.m2-final-intro-video__fallback a:focus-visible/);
  assert.match(styles, /@media \(max-width: 760px\)[\s\S]*?\.m2-final-intro-transition,[\s\S]*?grid-template-columns: 1fr/);
  assert.match(styles, /\.m2-final-intro-story img \{[\s\S]*?width: 100%[\s\S]*?height: auto/);
});
