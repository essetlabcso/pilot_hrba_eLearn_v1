import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const shell = readFileSync(
  new URL('../src/components/player/CoursePlayerShell.tsx', import.meta.url),
  'utf8',
);
const sidebar = readFileSync(
  new URL('../src/components/player/PlayerSidebar.tsx', import.meta.url),
  'utf8',
);
const styles = readFileSync(
  new URL('../src/styles/global.css', import.meta.url),
  'utf8',
);
const module2Assets = readFileSync(
  new URL('../src/data/module2-final/module2FinalAssets.ts', import.meta.url),
  'utf8',
);
const module2Renderer = readFileSync(
  new URL('../src/components/course/module2-final/Module2FinalRenderer.tsx', import.meta.url),
  'utf8',
);

test('the shared player exposes one accessible mobile tools disclosure before main content', () => {
  assert.equal((shell.match(/<PlayerSidebar/g) || []).length, 1);
  assert.match(shell, /className="player-mobile-tools-toggle"/);
  assert.match(shell, /aria-expanded=\{mobileToolsOpen\}/);
  assert.match(shell, /aria-controls="player-mobile-tools-panel"/);
  assert.ok(shell.indexOf('player-mobile-tools-toggle') < shell.indexOf('<PlayerSidebar'));
  assert.ok(shell.indexOf('<PlayerSidebar') < shell.indexOf('<MainScreenCanvas'));
  assert.match(sidebar, /id="player-mobile-tools-panel"/);
  assert.match(sidebar, /mobileExpanded \? 'is-mobile-open' : ''/);
});

test('mobile CSS collapses the shared sidebar while desktop presentation remains unchanged', () => {
  assert.match(styles, /\.player-mobile-tools-toggle \{\s*display: none;/);
  assert.match(styles, /@media \(max-width: 640px\)[\s\S]*?\.player-mobile-tools-toggle \{[\s\S]*?display: flex/);
  assert.match(styles, /@media \(max-width: 640px\)[\s\S]*?\.player-sidebar-aside \{[\s\S]*?display: none/);
  assert.match(styles, /\.player-sidebar-aside\.is-mobile-open \{\s*display: grid;/);
  assert.match(styles, /\.player-mobile-tools-toggle:focus-visible/);
});

test('Escape closes mobile tools and returns focus to the disclosure control', () => {
  assert.match(shell, /event\.key !== 'Escape'/);
  assert.match(shell, /setMobileToolsOpen\(false\)/);
  assert.match(shell, /mobileToolsToggleRef\.current\?\.focus\(\)/);
});

test('the accepted Module 2 video and Screen 6 content remain unchanged', () => {
  assert.match(module2Assets, /https:\/\/www\.youtube-nocookie\.com\/embed\/A-60i7LvlBM/);
  assert.match(module2Assets, /iframeTitle: 'Jiru Amba case introduction video'/);
  assert.match(module2Renderer, /Video transcript/);
  assert.match(module2Renderer, /Jiru Amba story summary/);
  assert.match(module2Renderer, /From the Jiru Amba case: Water-service repair is one activity in the Jiru Amba Futures Plan\./);
  assert.match(module2Renderer, /Drag the blue divider left or right to compare the Needs Lens and the Rights Lens\./);
});
