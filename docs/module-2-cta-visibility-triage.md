# Module 2 CTA Visibility Triage

## Status

Draft v0.1 - Documentation-only triage for the Module 2 player route CTA visibility issue.

## Purpose

This note investigates the pre-existing responsive CTA visibility issue recorded in `docs/player-shell-cascade-fix-qa.md`.

This triage does not fix the issue, continue token migration, edit CSS, edit React components, or change course behavior.

## Route Checked

Path checked: `/module-2/screen-2-2`

Local QA route used to unlock Module 2 in a fresh browser profile:

`http://127.0.0.1:5173/module-2/screen-2-2?completed=module_01_hrba_foundations`

Screen title rendered: `What you will be able to do`

CTA checked: `Continue to opening scenario`

## Viewports Checked

| Viewport | Size |
| --- | --- |
| Desktop | `1440 x 900` |
| Tablet | `768 x 900` |
| Mobile | `390 x 844` |

## Build Result

`npm run build` passed.

The existing Vite large-asset/chunk warning was still present. No new build error was observed during this triage.

## Containers Inspected

Shell and page containers:

- `html`
- `body`
- `#root`
- `.player-container.course-shell`
- `.player-split-canvas`
- `.player-header`
- `.player-sidebar-aside`
- `.player-main-content`
- `.main-screen-canvas`
- `.main-screen-canvas__content`

Module 2 screen containers:

- `.m2-s02-screen`
- `.m2-s02-canvas`
- `.m2-s02-card-grid`
- `.m2-s02-footer`
- `.m2-s02-completion`
- `.m2-s02-continue`

Relevant component source:

- `src/components/course/Module2LearningObjectives.tsx`

Relevant style source:

- `src/styles/global.css`

## Observed Scroll and Overflow Behavior

| Viewport | Page/shell scroll | Inner content scroll | CTA initial visibility | CTA after inner scroll |
| --- | --- | --- | --- | --- |
| Desktop `1440 x 900` | No document scroll; shell fixed | Not needed for CTA | Visible at about `y=716`, bottom `748` | Visible |
| Tablet `768 x 900` | No document scroll; shell fixed | `.main-screen-canvas__content` scrolls | Just below viewport at about `y=903`, bottom `947` | Visible after scrolling `.main-screen-canvas__content` |
| Mobile `390 x 844` | No document scroll; shell fixed | `.m2-s02-screen` and `.main-screen-canvas__content` can scroll | Far below viewport at about `y=1778`, bottom `1862` | Visible after scrolling inner screen/content |

The page and shell intentionally do not provide document-level scrolling:

- `body` reports `overflow-y: hidden`.
- `.player-container.course-shell` is fixed to the viewport height.
- `.player-split-canvas`, `.player-main-content`, and `.main-screen-canvas` use hidden overflow in the player layout.

The reachable scroll area is inside the screen/canvas content, not the page.

## Root-Cause Hypothesis

This is a mixed player/screen responsive issue, with the strongest cause at the Module 2 screen level.

The player shell is designed as a fixed viewport application shell. That is expected for the course player. However, the Module 2 S02 screen content does not fit cleanly inside the available fixed player stage at tablet and mobile sizes.

Likely contributing factors:

- `.player-container.course-shell` and the surrounding shell keep the app locked to the viewport.
- `.main-screen-canvas` clips overflow.
- `.main-screen-canvas__content` provides the actual inner scroll area.
- `.m2-s02-canvas` contains a header, objective card grid, and footer/completion panel in one screen.
- At tablet width, the footer stacks to one column and places the completion CTA just below the viewport.
- At mobile width, objective cards stack to one column, making the screen very tall and pushing the completion CTA far below the first view.
- On mobile, `.m2-s02-screen` also has `max-height: calc(100vh - 82px)` and `overflow-y: auto`, which can create nested scroll behavior with `.main-screen-canvas__content`.

The issue is not caused by the recent token cascade fix. The cascade fix changed only shell variable aliases and did not change selectors, layout, overflow, routing, or component structure.

## Classification

Classification: mixed, but primarily screen-level.

Shell-level:

- The fixed shell and hidden page overflow define the environment.
- This is probably intentional for the player.

Screen-level:

- The Module 2 S02 layout places required content and the CTA below the visible area on tablet/mobile.
- The responsive rules for `.m2-s02-screen`, `.m2-s02-canvas`, `.m2-s02-card-grid`, and `.m2-s02-footer` determine how far below the viewport the CTA sits.
- The CTA is technically reachable through inner scrolling, but it is not visible in the initial tablet/mobile view and the nested scroll model may not be obvious to learners.

## Recommended Smallest Future Fix

Recommended smallest future fix: make Module 2 S02 own its responsive vertical scrolling and CTA access deliberately, without changing global player shell behavior.

Future implementation should prefer a narrowly scoped CSS-only fix in `src/styles/global.css` around the existing `.m2-s02-*` responsive rules. The safest likely direction is:

- keep the player shell fixed;
- avoid changing routing, state, or component logic;
- ensure the visible scroll container is clear and singular for this screen;
- reduce or remove nested-scroll ambiguity between `.main-screen-canvas__content` and `.m2-s02-screen`;
- ensure the completion/CTA area can be reached predictably on tablet and mobile;
- consider a screen-scoped sticky or always-visible completion footer only if it does not cover content, hide focus, or create new mobile overlap.

Do not solve this as part of token adoption. Treat it as a separate responsive layout/accessibility fix.

## Files Likely Involved in a Future Fix

Likely primary file:

- `src/styles/global.css`

Likely selectors:

- `.m2-s02-screen`
- `.m2-s02-canvas`
- `.m2-s02-card-grid`
- `.m2-s02-footer`
- `.m2-s02-completion`
- `.m2-s02-continue`
- possibly `.main-screen-canvas__content:has(.m2-s02-screen)` if the fix must coordinate the screen with the player canvas scroll area

Possible secondary file only if a CSS-only fix is not enough:

- `src/components/course/Module2LearningObjectives.tsx`

Any React change should be avoided unless the future fix requires moving the CTA, adding clearer screen instructions, or changing focus/scroll behavior in a way CSS cannot handle safely.

## Files That Must Not Be Touched for This Issue Unless Explicitly Approved

- Token files in `src/system/tokens/`
- Theme files
- Global token definitions
- Routing files
- Progress, locking, assessment, or certificate logic
- Accessibility toolbar behavior
- Old HRBA course files outside the scoped Module 2 S02 fix
- Assets
- Module patch CSS unrelated to Module 2 S02
- Course screens unrelated to `/module-2/screen-2-2`

## Stop Conditions for a Future Fix

Stop before implementation if:

- the proposed fix requires changing player routing, locking, progress, assessment, or certificate behavior;
- the proposed fix requires broad player shell refactoring;
- the proposed fix would continue token migration;
- the proposed fix requires new tokens or raw visual values;
- the proposed fix creates horizontal scrolling;
- the proposed fix hides the CTA behind a sticky element or overlay;
- the proposed fix makes keyboard focus move into clipped content;
- the proposed fix makes the sidebar or header unusable on mobile;
- the proposed fix affects other Module 2 screens without explicit review;
- the proposed fix requires changing old HRBA files outside the scoped screen.

## Triage Summary

The CTA is not visible in the initial tablet/mobile viewport, but it can become visible by scrolling the inner screen/canvas content. The learner experience risk is that the page itself does not scroll and the required scroll area is nested inside the player, so the CTA can feel hidden.

Smallest future fix: a scoped responsive layout/accessibility fix for Module 2 S02, most likely in `src/styles/global.css`, focused on making the screen’s vertical scroll and CTA access obvious and reliable. Do not combine that fix with token migration.

## Confirmation

- No CSS was edited.
- No React components were edited.
- No screens were edited.
- No module CSS was edited.
- No token files were edited.
- No assets, routing, progress logic, locking, assessment logic, certificate logic, accessibility toolbar behavior, or old HRBA course files were changed.
- This triage note is documentation only.
