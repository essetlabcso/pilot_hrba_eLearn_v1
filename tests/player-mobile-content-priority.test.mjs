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

test('the shared player exposes one accessible Learning Tools disclosure before main content', () => {
  assert.equal((shell.match(/<PlayerSidebar/g) || []).length, 1);
  assert.match(shell, /className="player-tools-toggle"/);
  assert.match(shell, /aria-expanded=\{toolsOpen\}/);
  assert.match(shell, /aria-controls="player-tools-panel"/);
  assert.match(shell, /aria-label=\{toolsOpen \? 'Collapse Learning Tools' : 'Expand Learning Tools'\}/);
  assert.ok(shell.indexOf('player-tools-toggle') < shell.indexOf('<PlayerSidebar'));
  assert.ok(shell.indexOf('<PlayerSidebar') < shell.indexOf('<MainScreenCanvas'));
  assert.match(sidebar, /id="player-tools-panel"/);
  assert.match(sidebar, /expanded \? 'is-open' : ''/);
});

test('desktop CSS releases content width and mobile CSS presents the tools as a drawer', () => {
  assert.match(styles, /\.player-split-canvas \{[\s\S]*?grid-template-columns: 68px minmax\(0, 1fr\)/);
  assert.match(styles, /\.player-split-canvas--tools-open \{\s*grid-template-columns: minmax\(164px, 14\.5%\) minmax\(0, 1fr\)/);
  assert.match(styles, /\.player-tools-rail:not\(\.is-open\) \.player-sidebar-aside \{\s*display: none;/);
  assert.match(styles, /\.player-tools-toggle:focus-visible/);
  assert.match(styles, /@media \(max-width: 640px\)[\s\S]*?\.player-tools-rail\.is-open \{[\s\S]*?position: absolute;[\s\S]*?width: min\(90%, 360px\)/);
  assert.match(styles, /@media \(max-width: 640px\)[\s\S]*?\.player-sidebar-aside\.is-open \{\s*display: grid;/);
});

test('Escape closes Learning Tools and returns focus to the disclosure control', () => {
  assert.match(shell, /event\.key !== 'Escape'/);
  assert.match(shell, /setToolsOpen\(false\)/);
  assert.match(shell, /toolsToggleRef\.current\?\.focus\(\)/);
});

test('the accepted Module 2 video and Screen 6 content remain unchanged', () => {
  assert.match(module2Assets, /https:\/\/www\.youtube-nocookie\.com\/embed\/A-60i7LvlBM/);
  assert.match(module2Assets, /iframeTitle: 'Jiru Amba case introduction video'/);
  assert.match(module2Renderer, /Video transcript/);
  assert.match(module2Renderer, /Jiru Amba story summary/);
  assert.match(module2Renderer, /From the Jiru Amba case: Water-service repair is one activity in the Jiru Amba Futures Plan\./);
  assert.match(module2Renderer, /Drag the blue divider left or right to compare the Needs Lens and the Rights Lens\./);
});
