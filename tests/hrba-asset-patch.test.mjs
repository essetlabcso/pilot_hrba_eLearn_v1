import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const modules = readFileSync(new URL('../src/data/hrbaCourseModules.ts', import.meta.url), 'utf8');
const module1 = readFileSync(new URL('../src/components/course/Module1Renderer.tsx', import.meta.url), 'utf8');
const module2 = readFileSync(new URL('../src/components/course/Module2Renderer.tsx', import.meta.url), 'utf8');
const module2Assets = readFileSync(new URL('../src/data/module2-final/module2FinalAssets.ts', import.meta.url), 'utf8');
const module3 = readFileSync(new URL('../src/components/course/Module3RevisedRenderer.tsx', import.meta.url), 'utf8');
const module3Styles = readFileSync(new URL('../src/components/course/module3-revised.css', import.meta.url), 'utf8');
const launchCard = readFileSync(new URL('../src/components/platform/ModuleLaunchCard.tsx', import.meta.url), 'utf8');

const expectedCovers = [
  ['module-1-cover.webp', '3961874d4a01155e2832257d0fece69d0f63b85854d8e5bfde2d2d812a0c9668'],
  ['module-2-cover.webp', '2177e3f48a7df7a6dd029cced4685d97922ba4146abe005842a1fdfcb5694fcb'],
  ['module-3-cover.webp', 'd18f619d1bf0ec79d051605cfebb8ca3869728f9d98543ab7adb2c12c55ef189'],
  ['module-4-cover.webp', 'c7019a0acede363699c12e4a22adea559b0d8e5535d1431716f9c36c48613ba4'],
  ['module-5-cover.webp', '9c70eea16455222a62f2c24c88059fcf5d3f290dd1a28edc901e19e9e07d309b'],
];

const retiredCovers = [
  '../public/assets/hrba/modules/module-1-hrba-learning-journey.png',
  '../public/assets/hrba/modules/module-1.png',
  '../public/assets/hrba/modules/module-1.webp',
  '../public/assets/hrba/modules/module-2-cover-teamwork.png',
  '../public/assets/hrba/modules/module-2-foundations-hrba.png',
  '../public/assets/hrba/modules/module-2.png',
  '../public/assets/images/module-2/final/module-2-final-cover.webp',
  '../public/assets/hrba/modules/module-3-cover-design.png',
  '../public/assets/hrba/modules/module-3-project-design.png',
  '../public/assets/hrba/modules/module-3.png',
  '../public/assets/hrba/modules/module-4-implementation.png',
  '../public/assets/hrba/modules/module-4.png',
  '../public/assets/hrba/modules/module-5-cover-meal.png',
  '../public/assets/hrba/modules/module-5-hrba-meal.png',
  '../public/assets/hrba/modules/module-5.png',
];

test('the uploaded WebPs are the authoritative module cover assets', () => {
  for (const [fileName, expectedHash] of expectedCovers) {
    const url = new URL(`../public/assets/hrba/modules/${fileName}`, import.meta.url);
    const bytes = readFileSync(url);
    assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF');
    assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP');
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expectedHash);
    assert.ok(modules.includes(`thumbnailSrc: '/assets/hrba/modules/${fileName}'`));
  }

  assert.match(module1, /src="\/assets\/hrba\/modules\/module-1-cover\.webp"/);
  assert.match(module2, /src="\/assets\/hrba\/modules\/module-2-cover\.webp"/);
  assert.match(module2Assets, /src: '\/assets\/hrba\/modules\/module-2-cover\.webp'/);
});

test('retired module cover assets and course-page thumbnails are gone', () => {
  for (const relativePath of retiredCovers) {
    assert.equal(existsSync(new URL(relativePath, import.meta.url)), false, relativePath);
  }

  assert.doesNotMatch(launchCard, /module-launch-card__media/);
  assert.doesNotMatch(launchCard, /<img/);
});

test('the four optional Module 3 support videos are isolated from progress handlers', () => {
  for (const [screenId, videoId] of [
    ['M3-R05', '1lm4e7v1aLE'],
    ['M3-R09', 'L_C-p01fyT0'],
    ['M3-R11', 'p13LHt0n_Ck'],
    ['M3-R14', 'pi-aD_N2CUA'],
  ]) {
    assert.match(module3, new RegExp(`'${screenId}': '${videoId}'`));
  }

  assert.equal((module3.match(/<Module3SupportVideo screen=\{screen\}>/g) || []).length, 4);
  assert.match(module3, /https:\/\/www\.youtube-nocookie\.com\/embed\/\$\{videoId\}/);
  assert.match(module3, /Optional support video/);
  assert.match(module3Styles, /\.m3-support-video__frame \{[\s\S]*?aspect-ratio: 16 \/ 9/);
});
