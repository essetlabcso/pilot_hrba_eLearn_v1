# Player Header/Sidebar Button Base Token Adoption QA

## Status

Draft v0.1 - Post-adoption QA for commit `f278cd5c73e18fd890fdef4b62dc67e774a5a87a`

## Purpose

This QA note records a bounded check of the player header/sidebar button base color token adoption slice. It checks only the targeted shell-level button base selectors and does not continue token migration, change CSS, or review unrelated course screen visuals.

## Route Checked

`/module-2/screen-2-2?completed=module_01_hrba_foundations`

## Viewports Checked

| Viewport | Size |
| --- | --- |
| Desktop | `1440 x 900` |
| Tablet | `768 x 900` |
| Mobile | `390 x 844` |

## Runtime Token Values

| Token | Runtime value | Intended use in this slice |
| --- | --- | --- |
| `--cso-color-text-inverse` | `#F9FAFB` | Header/sidebar button base text on dark shell surfaces |
| `--cso-color-text-inverse-muted` | `#CBD5E1` | Secondary/media sidebar button text |
| `--cso-color-surface-inverse-border` | `#334155` | Subtle base borders on dark shell buttons |
| `--cso-color-action-primary` | `#0E6F9F` | Primary header button base background and border |
| `--cso-color-accent-danger` | `#B91C1C` | Return/danger button base border |

## Effective Button Base Observations

| Selector | Desktop `1440 x 900` | Tablet `768 x 900` | Mobile `390 x 844` | Result |
| --- | --- | --- | --- | --- |
| `.player-header-button` | Text `rgb(249, 250, 251)`; border `rgb(51, 65, 85)`; visible. | Text and border remained visible. | Text and border remained visible. | Pass |
| `.player-header-button--secondary` | Text `rgb(249, 250, 251)`; border `rgb(51, 65, 85)`; base fill unchanged. | Text and border remained visible. | Text and border remained visible. | Pass |
| `.player-header-button--primary` | Background/border `rgb(14, 111, 159)`; text `rgb(249, 250, 251)`; visible. | Primary button remained visible and consistent. | Primary button remained visible and consistent. | Pass |
| `.player-sidebar-button` | Text `rgb(249, 250, 251)`; border `rgb(51, 65, 85)`; visible on dark sidebar. | Text and border remained visible. | Text and border remained visible. | Pass |
| `.player-sidebar-button--media` | Text `rgb(203, 213, 225)`; border `rgb(51, 65, 85)`; visible but secondary. | Text remained visible but secondary. | Text remained visible but secondary. | Pass |
| `.player-sidebar-return` | Border `rgb(185, 28, 28)`; existing danger text/fill remained understandable. | Return/danger button remained visible and not visually disruptive. | Return/danger button remained visible and not visually disruptive. | Pass |

## Layout and Usability Observations

| Check | Desktop | Tablet | Mobile | Result |
| --- | --- | --- | --- | --- |
| Shell-caused horizontal scrolling | None observed; document/body width matched viewport width. | None observed; document/body width matched viewport width. | None observed; document/body width matched viewport width. | Pass |
| Module 2 S02 CTA reachability | CTA was visible in the viewport. | CTA was below the initial viewport but reachable through `.main-screen-canvas__content`. | CTA was below the initial viewport but reachable through `.main-screen-canvas__content`. | Pass |
| Header/sidebar/navigation usability | 13 shell controls observed; 12 enabled and all visible. | 13 shell controls observed; 12 enabled and all visible. | 13 shell controls observed; 12 enabled and all visible. | Pass |

## Out-of-Scope Areas Confirmed

This QA task did not change or inspect for migration of:

- hover states;
- focus states;
- active states;
- selected, completed, locked, or disabled states;
- modal styles;
- course screen templates;
- module-specific CSS;
- React components;
- token files;
- routing, progress, locking, assessment, certificate, asset, or accessibility toolbar behavior.

## Visual and Accessibility Risks

- No new readability issue was observed for the targeted base button selectors.
- Primary header button contrast remains visually strong with the approved action token.
- Base borders are visible but subtle on dark shell surfaces.
- The return/danger button still contains legacy base text and translucent fill values because this slice had no approved dark-shell danger fill/text recipe. That should remain a separate bounded task.
- Hover, focus, active, selected, completed, locked, disabled, and modal states still contain legacy values and require separate review before migration.
- The Module 2 S02 CTA remains disabled in the tested state, so this QA confirms visibility/reachability and not completion logic.

## Build Result

`npm run build` passed.

Existing Vite chunk-size warnings were reported and are unrelated to this QA slice.

## Recommendation

Proceed to the next bounded token adoption slice only after review. Do not broaden migration into focus, hover, active, selected/completed/locked/disabled states, modals, or course screen visuals without a separate scoped task and QA pass.

