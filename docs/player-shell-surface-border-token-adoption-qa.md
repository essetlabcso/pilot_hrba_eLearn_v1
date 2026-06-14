# Player Shell Surface/Border Token Adoption QA

## Status

Draft v0.1 - Post-adoption QA for commit `59942eadd94d9f7fe679075033b33169f652f2cf`

## Purpose

This QA note records a bounded check of the player shell surface and border token adoption slice. It checks the player shell only and does not continue token migration, adjust CSS, or review course screen design changes beyond confirming the target route remains usable.

## Route Checked

`/module-2/screen-2-2?completed=module_01_hrba_foundations`

## Viewports Checked

| Viewport | Size |
| --- | --- |
| Desktop | `1440 x 900` |
| Tablet | `768 x 900` |
| Mobile | `390 x 844` |

## Selectors Checked

- `.course-shell.player-container`
- `.player-header`
- `.player-header-divider`
- `.player-split-canvas`
- `.player-sidebar-aside`
- `.player-main-content`
- `.main-screen-canvas`

## Effective Token Values Observed

Across all checked viewports, the player shell variables resolved to:

| Variable | Effective value |
| --- | --- |
| `--player-shell-bg` | `#0F172A` |
| `--player-header-bg` | `#0F172A` |
| `--player-sidebar-bg` | `#1E293B` |
| `--player-sidebar-border` | `#334155` |
| `--player-stage-bg` | `#F9FAFB` |
| `--player-card-bg` | `#FFFFFF` |

## Surface and Border Observations

| Selector | Desktop observation | Tablet observation | Mobile observation | Result |
| --- | --- | --- | --- | --- |
| `.course-shell.player-container` | Dark shell surface resolved to `rgb(15, 23, 42)`; border resolved to `rgb(51, 65, 85)`. | Dark shell surface resolved to `rgb(15, 23, 42)`; outer border computed as light at full-width constrained layout. | Dark shell surface resolved to `rgb(15, 23, 42)`; outer border computed as light at full-width constrained layout. | Pass with note |
| `.player-header` | Header surface resolved to `rgb(15, 23, 42)`; bottom border resolved to `rgb(51, 65, 85)`. | Header surface and bottom separator remained stable. | Header surface and bottom separator remained stable. | Pass |
| `.player-header-divider` | Divider resolved to `rgb(51, 65, 85)` and remained subtle. | Divider resolved to `rgb(51, 65, 85)` and remained visible. | Divider is not visually present at this narrow layout, consistent with responsive header behavior. | Pass |
| `.player-split-canvas` | Stage surface resolved to `rgb(249, 250, 251)`. | Stage surface remained light and readable. | Stage surface remained light and readable. | Pass |
| `.player-sidebar-aside` | Sidebar surface resolved to `rgb(30, 41, 59)`; right border resolved to `rgb(51, 65, 85)`. | Sidebar surface and right separator remained stable. | Sidebar surface and right separator remained stable. | Pass |
| `.player-main-content` | Main stage resolved to `rgb(249, 250, 251)`. | Main stage remained light and readable. | Main stage remained light and readable. | Pass |
| `.main-screen-canvas` | Card surface resolved to `rgb(255, 255, 255)`; border resolved to `rgb(221, 226, 233)`. | Card surface and border remained stable. | Card surface and border remained stable. | Pass |

## Layout and Usability Observations

| Check | Desktop | Tablet | Mobile | Result |
| --- | --- | --- | --- | --- |
| Shell-caused horizontal scrolling | None observed. Document and body scroll width matched viewport width. | None observed. Document and body scroll width matched viewport width. | None observed. Document and body scroll width matched viewport width. | Pass |
| Module 2 S02 CTA reachability | CTA was visible in the viewport. | CTA was below the initial viewport but reachable within `.main-screen-canvas__content`, which remained the scroll owner. | CTA was below the initial viewport but reachable within `.main-screen-canvas__content`, which remained the scroll owner. | Pass |
| Header/sidebar/navigation usability | Shell navigation controls remained visible; 13 shell controls observed, 12 enabled. | Shell navigation controls remained visible; 13 shell controls observed, 12 enabled. | Shell navigation controls remained visible; 13 shell controls observed, 12 enabled. | Pass |

## Out-of-Scope Areas Confirmed

The token adoption slice did not intentionally migrate or modify:

- player header buttons;
- focus states;
- modals;
- selected, completed, locked, hover, or active states;
- course screen visuals;
- module-specific CSS;
- token files;
- React components;
- routing, progress, locking, assessment, certificate, asset, or accessibility toolbar behavior.

## Visual and Accessibility Risks

- The outer `.course-shell.player-container` border computes as a light color on tablet and mobile constrained layouts, while the header/sidebar/canvas separators remain token-driven and subtle. This does not appear to break layout or usability, but it should be watched in future shell QA.
- The main screen canvas now uses the approved primary card surface (`#FFFFFF`). This is token-consistent and readable, but future premium visual QA should confirm the shell still has enough depth after additional token adoption slices.
- The CTA remains reachable but disabled in the tested state. This QA confirms reachability and layout behavior, not completion logic.

## Build Result

`npm run build` passed.

Existing Vite chunk-size warnings were reported and are unrelated to this QA slice.

## Recommendation

Proceed to the next planned token adoption slice only after review. Do not broaden token migration into buttons, focus states, modals, selected/completed/locked states, or course screen templates until those areas receive their own bounded task and QA gate.

