import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const APP_PORT = 43199;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;
const STORAGE_KEY = 'hrba-course-progress-v1';

const moduleCases = [
  {
    label: 'Module 1',
    moduleId: 'module_01_hrba_foundations',
    screenId: 'M1-PLAYER-00',
    route: '/?moduleId=module_01_hrba_foundations&screenId=M1-PLAYER-00',
    heading: 'Module 1: Starting the HRBA Learning Journey',
    completedModules: [],
    completedScreens: [],
  },
  {
    label: 'Module 2',
    moduleId: 'module_02_everyday_cso_work',
    screenId: 'M2-Intro',
    route: '/module-2/intro-video',
    heading: 'The Jiru Amba Initiative: A New Perspective',
    completedModules: ['module_01_hrba_foundations'],
    completedScreens: ['M2-00'],
  },
  {
    label: 'Module 3',
    moduleId: 'module_03_project_design',
    screenId: 'M3-R01',
    route: '/module-3/screen-3-1',
    heading: 'Module 3 Orientation',
    completedModules: ['module_01_hrba_foundations', 'module_02_everyday_cso_work'],
    completedScreens: ['M3-PLAYER-00'],
  },
  {
    label: 'Module 4',
    moduleId: 'module_04_implementation',
    screenId: 'M4-S1-01',
    route: '/module-4/screen-4-1',
    heading: 'From Design to Responsible Implementation',
    completedModules: ['module_01_hrba_foundations', 'module_02_everyday_cso_work', 'module_03_project_design'],
    completedScreens: ['M4-PLAYER-00'],
  },
  {
    label: 'Module 5',
    moduleId: 'module_05_hrba_meal',
    screenId: 'M5-R01',
    route: '/module-5/screen-5-1',
    heading: 'Monitoring Is Not Yet a Rights-Based System',
    completedModules: ['module_01_hrba_foundations', 'module_02_everyday_cso_work', 'module_03_project_design', 'module_04_implementation'],
    completedScreens: ['M5-PLAYER-00'],
  },
];

async function waitForApp() {
  const deadline = Date.now() + 30_000;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(APP_ORIGIN);
      if (response.ok) return;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw lastError || new Error('Timed out waiting for the mobile shell test server.');
}

async function seedModule(page, moduleCase) {
  await page.goto(APP_ORIGIN);
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(({ storageKey, currentModuleId, currentScreenId, completedModules, completedScreens }) => {
    const current = JSON.parse(localStorage.getItem(storageKey)) || {};
    localStorage.setItem(storageKey, JSON.stringify({
      ...current,
      storageVersion: 'hrba-course-progress-v1',
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId,
      currentScreenId,
      completedModules,
      screenProgress: {
        ...current.screenProgress,
        [currentModuleId]: completedScreens,
      },
    }));
  }, {
    storageKey: STORAGE_KEY,
    currentModuleId: moduleCase.moduleId,
    currentScreenId: moduleCase.screenId,
    completedModules: moduleCase.completedModules,
    completedScreens: moduleCase.completedScreens,
  });
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    body: document.body.scrollWidth - document.body.clientWidth,
  }));
  assert.ok(overflow.document <= 1, `${label}: document overflow was ${overflow.document}px`);
  assert.ok(overflow.body <= 1, `${label}: body overflow was ${overflow.body}px`);
}

test('Learning Tools collapse on desktop and use an accessible mobile drawer while every module remains functional', {
  timeout: 180_000,
}, async (t) => {
  const vite = spawn(
    process.execPath,
    [
      resolve('node_modules/vite/bin/vite.js'),
      '--host',
      '127.0.0.1',
      '--port',
      String(APP_PORT),
      '--strictPort',
    ],
    { cwd: process.cwd(), env: { ...process.env, BROWSER: 'none' }, stdio: 'ignore' },
  );
  t.after(() => vite.kill());
  await waitForApp();

  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());
  const context = await browser.newContext({ viewport: { width: 390, height: 900 } });
  t.after(() => context.close());
  await context.route('https://fonts.googleapis.com/**', (route) => route.fulfill({
    contentType: 'text/css',
    body: '',
  }));
  await context.route('https://www.youtube-nocookie.com/**', (route) => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><html><body><main>Video available</main></body></html>',
  }));

  const page = await context.newPage();
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const moduleCase of moduleCases) {
      await seedModule(page, moduleCase);
      await page.goto(`${APP_ORIGIN}${moduleCase.route}`);
      const playerTitle = page.locator('.player-header-title');
      await playerTitle.waitFor();
      assert.match(await playerTitle.innerText(), new RegExp(moduleCase.label));

      const toggle = page.getByRole('button', { name: 'Expand Learning Tools' });
      const sidebar = page.locator('.player-sidebar-aside');
      const main = page.getByRole('main', { name: 'Course screen content' });
      assert.equal(await toggle.count(), 1, `${moduleCase.label} must expose one Learning Tools toggle.`);
      assert.equal(await sidebar.count(), 1, `${moduleCase.label} must retain one shared tools panel.`);
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      assert.equal(await sidebar.isVisible(), false, `${moduleCase.label} tools must start collapsed at ${width}px.`);

      const positions = await page.evaluate(() => {
        const toggleElement = document.querySelector('.player-tools-toggle');
        const mainElement = document.querySelector('.player-main-content');
        const footerElement = document.querySelector('.partner-logo-strip');
        if (!toggleElement || !mainElement || !footerElement) throw new Error('Shared player shell elements are missing.');
        return {
          toggleBottom: toggleElement.getBoundingClientRect().bottom,
          mainTop: mainElement.getBoundingClientRect().top,
          mainBottom: mainElement.getBoundingClientRect().bottom,
          footerTop: footerElement.getBoundingClientRect().top,
          viewportHeight: document.documentElement.clientHeight,
        };
      });
      assert.ok(positions.mainTop <= positions.toggleBottom + 1, `${moduleCase.label} content must immediately follow the toggle.`);
      assert.ok(positions.mainTop < positions.viewportHeight * 0.25, `${moduleCase.label} content must begin early in the initial viewport.`);
      assert.ok(positions.mainBottom <= positions.footerTop + 1, `${moduleCase.label} content must not overlap the footer.`);
      await assertNoHorizontalOverflow(page, `${moduleCase.label} ${width}px`);
      assert.ok(await main.isVisible(), `${moduleCase.label} main content must remain visible.`);
      assert.ok(
        await main.locator('h1, h2').count() > 0,
        `${moduleCase.label} must retain visible learner-facing heading content.`,
      );
    }
  }

  await page.setViewportSize({ width: 390, height: 900 });
  const module2 = moduleCases[1];
  await seedModule(page, module2);
  await page.goto(`${APP_ORIGIN}${module2.route}`);
  await page.getByRole('heading', { level: 1, name: module2.heading }).waitFor();

  const mobileToggle = page.locator('.player-tools-toggle');
  const mobileSidebar = page.locator('.player-sidebar-aside');
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    document.body.tabIndex = -1;
    document.body.focus();
  });
  const focusSequence = [];
  for (let index = 0; index < 8; index += 1) {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => ({
      label: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim(),
      isToggle: document.activeElement?.classList.contains('player-tools-toggle') || false,
      inSidebar: document.activeElement?.closest('.player-sidebar-aside') !== null,
    }));
    focusSequence.push(focused);
    if (focused.isToggle) break;
  }
  assert.equal(focusSequence.at(-1)?.isToggle, true, `Focus sequence did not reach the Learning Tools toggle: ${JSON.stringify(focusSequence)}`);
  assert.equal(focusSequence.some((item) => item.inSidebar), false);
  assert.ok(focusSequence.length <= 4, 'Learning Tools must follow only the three header navigation actions.');
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement?.closest('.player-main-content') !== null), true);

  await mobileToggle.click();
  assert.equal(await mobileToggle.getAttribute('aria-expanded'), 'true');
  assert.equal(await mobileSidebar.isVisible(), true);
  const mobileDrawer = await page.evaluate(() => {
    const rail = document.querySelector('.player-tools-rail');
    const main = document.querySelector('.player-main-content');
    const railBox = rail?.getBoundingClientRect();
    const mainBox = main?.getBoundingClientRect();
    return {
      position: rail ? getComputedStyle(rail).position : null,
      railLeft: railBox?.left,
      railRight: railBox?.right,
      mainWidth: mainBox?.width,
      viewportWidth: document.documentElement.clientWidth,
    };
  });
  assert.equal(mobileDrawer.position, 'absolute');
  assert.ok(mobileDrawer.railLeft >= -1);
  assert.ok(mobileDrawer.railRight <= mobileDrawer.viewportWidth + 1);

  for (const [toolName, accessibleName] of [
    ['Menu', 'Open module menu'],
    ['Glossary', 'Open course glossary'],
    ['Resources', 'Open resources list'],
    ['Help Guide', 'Open player help guide'],
    ['Accessibility', 'Open accessibility options'],
    ['captions/transcript', /^(?:Show|Hide) transcript panel$/],
    ['play/pause', /^(?:Play|Pause) screen$/],
    ['audio', /^(?:Mute|Unmute) audio$/],
    ['reload', 'Reload current screen'],
    ['Return to LMS', 'Return to LMS'],
  ]) {
    assert.equal(
      await mobileSidebar.getByRole('button', { name: accessibleName, exact: true }).count(),
      1,
      `The mobile drawer must preserve ${toolName}.`,
    );
  }
  const firstTool = mobileSidebar.getByRole('button', { name: 'Open module menu' });
  await firstTool.focus();
  await firstTool.press('Escape');
  assert.equal(await mobileSidebar.isVisible(), false);
  await page.waitForTimeout(50);
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('player-tools-toggle')), true);

  const video = page.getByTitle('Jiru Amba case introduction video');
  assert.equal(await video.getAttribute('src'), 'https://www.youtube-nocookie.com/embed/A-60i7LvlBM');
  assert.equal((await video.getAttribute('src')).includes('autoplay'), false);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();
  await page.getByRole('heading', { level: 1, name: module2.heading }).waitFor();
  const desktopToggle = page.locator('.player-tools-toggle');
  const desktopSidebar = page.getByRole('complementary', { name: 'Course tools and media controls' });
  assert.equal(await desktopToggle.isVisible(), true);
  assert.equal(await desktopToggle.getAttribute('aria-label'), 'Expand Learning Tools');
  assert.equal(await desktopToggle.getAttribute('aria-expanded'), 'false');
  assert.equal(await desktopSidebar.isVisible(), false);
  const collapsedDesktop = await page.evaluate(() => {
    const rail = document.querySelector('.player-tools-rail')?.getBoundingClientRect();
    const main = document.querySelector('.player-main-content')?.getBoundingClientRect();
    return { railRight: rail?.right, railWidth: rail?.width, mainLeft: main?.left, mainWidth: main?.width };
  });
  assert.ok(collapsedDesktop.mainLeft >= collapsedDesktop.railRight - 1);
  assert.ok(collapsedDesktop.railWidth <= 70);

  await desktopToggle.click();
  assert.equal(await desktopToggle.getAttribute('aria-expanded'), 'true');
  assert.equal(await desktopSidebar.isVisible(), true);
  const expandedDesktop = await page.evaluate(() => {
    const rail = document.querySelector('.player-tools-rail')?.getBoundingClientRect();
    const main = document.querySelector('.player-main-content')?.getBoundingClientRect();
    return { railRight: rail?.right, mainLeft: main?.left, mainWidth: main?.width };
  });
  assert.ok(expandedDesktop.mainLeft >= expandedDesktop.railRight - 1);
  assert.ok(collapsedDesktop.mainWidth >= expandedDesktop.mainWidth + 90);

  await page.getByRole('button', { name: 'Collapse Learning Tools' }).click();
  assert.equal(await desktopSidebar.isVisible(), false);
  await assertNoHorizontalOverflow(page, 'Module 2 desktop');

  assert.deepEqual(browserErrors, [], `Browser console errors: ${browserErrors.join(' | ')}`);
});
