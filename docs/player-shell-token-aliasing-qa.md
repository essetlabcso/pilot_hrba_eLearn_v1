# Player Shell Token Aliasing QA

## Status

Draft v0.1 - Documentation-only QA note for the bounded player shell token-aliasing slice.

## Purpose

This QA note records a bounded visual check of the player shell/base layout after the player shell CSS variables were aliased to CSO Learning Hub token variables in `src/styles/global.css`.

This note does not continue token migration, change CSS, change components, or approve broader token adoption.

## Source Slice Checked

Commit checked: `78cccf23194390781cb28ffc84880cbb86b08155`

Variables in scope:

| Variable | Intended alias target |
| --- | --- |
| `--player-shell-bg` | `var(--cso-color-surface-inverse)` |
| `--player-header-bg` | `var(--cso-color-surface-inverse)` |
| `--player-sidebar-bg` | `var(--cso-color-surface-inverse-raised)` |
| `--player-sidebar-border` | `var(--cso-color-surface-inverse-border)` |
| `--player-stage-bg` | `var(--cso-color-background-stage)` |
| `--player-card-bg` | `var(--cso-color-surface-primary)` |

## Route Checked

`http://127.0.0.1:5173/module-2/screen-2-2`

This route was used as an existing course-player route for shell inspection. It renders the player container with the `course-shell` class.

## Viewports Checked

| Viewport | Size |
| --- | --- |
| Desktop | `1440 x 900` |
| Tablet | `768 x 900` |
| Mobile | `390 x 844` |

## What Was Checked

- Player container/shell background.
- Player header area.
- Player sidebar area.
- Sidebar border/separator.
- Learning stage/main canvas background.
- Main screen/card surface area where present.
- Visible navigation and CTA controls.
- Horizontal overflow caused by the shell.
- Existing focus-rule presence.

## Build Result

`npm run build` passed.

The existing Vite large-asset/chunk warning was still present. No new build error was observed during this QA pass.

## Visual QA Observations

| Check | Observation | Result |
| --- | --- | --- |
| Dark navy shell/header/sidebar still look premium and consistent | The rendered shell remained dark navy and visually consistent across desktop, tablet, and mobile. | Pass |
| Learning stage remains light and readable | The main learning canvas remained light and readable. | Pass |
| Sidebar border/separator visible but not heavy | The sidebar separator remained visible and subtle. | Pass |
| Course screen layout broken by aliasing | No shell-level layout break was observed at the checked route and viewport sizes. | Pass |
| CTA or navigation hidden | Header controls and sidebar controls remained visible in the checked viewports. Some content buttons on mobile were below the fold, but that appears to be normal vertical content flow, not hidden navigation or a shell aliasing issue. | Pass with note |
| Horizontal scrolling caused by shell | No document-level horizontal overflow was observed at the checked viewports. | Pass |
| Focus indicators remain available | Existing focus CSS rules were present in the loaded stylesheets. This QA did not redesign or modify focus behavior. | Pass for unchanged behavior |

## Effective Variable Finding

The rendered course-player route is still affected by a later legacy `:root` block in `src/styles/global.css` under the comment `HRBA reusable course shell template`.

That later block currently masks several earlier player-shell token aliases at runtime:

| Variable | Effective runtime value observed |
| --- | --- |
| `--player-shell-bg` | `#06182C` |
| `--player-header-bg` | `#071C33` |
| `--player-sidebar-bg` | `#071C33` |
| `--player-sidebar-border` | `rgba(183, 221, 238, 0.24)` |
| `--player-stage-bg` | `#F3F8EF` |
| `--player-card-bg` | `#FFFFFF` |

This means the aliasing slice did not visually break the player shell, but several visible shell colors are still coming from the existing later legacy course-shell variable block rather than from the new `--cso-*` token aliases.

## Risks Noticed

- The earlier player shell aliases are partially masked by the later legacy course-shell `:root` variable definitions.
- Because of that cascade order, visual QA confirms no regression but does not fully confirm token-driven shell rendering yet.
- The learning stage and shell still depend on old hard-coded values in the later course-shell variable block.
- The current mobile layout remains vertically scroll-based. No shell-caused horizontal scrolling was observed.

## Recommendation

Pause before expanding token adoption to additional areas.

The next safe decision should be whether to create a separate bounded slice for the later `HRBA reusable course shell template` variables in `src/styles/global.css`. That slice should remain variable-only, should not change selectors or component code, and should map only direct equivalents to existing `--cso-*` tokens.

Do not proceed to component-level token adoption until the visible player shell variable cascade is resolved or explicitly accepted.

## Confirmation

- No components were edited.
- No screens were edited.
- No module CSS files were edited.
- No token files were edited.
- No assets were copied, moved, renamed, optimized, approved, rejected, or migrated.
- No routing, progress logic, locking, assessment logic, certificate logic, or accessibility toolbar behavior was changed.
- This QA note is documentation only.
