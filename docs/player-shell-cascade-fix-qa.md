# Player Shell Cascade Fix QA

## Status

Draft v0.1 - Documentation-only QA note after the bounded course-shell cascade fix.

## Purpose

This QA note records a second bounded visual check of the player shell/base layout after the later `HRBA reusable course shell template` `:root` variables were aliased to CSO Learning Hub token variables in `src/styles/global.css`.

This note does not continue token migration, change CSS, change components, or approve broader token adoption.

## Source Slice Checked

Commit checked: `3e130810a350d21af2311f0db8ebb18a7595abeb`

Variables in scope:

| Variable | Intended token source |
| --- | --- |
| `--player-shell-bg` | `--cso-color-surface-inverse` |
| `--player-header-bg` | `--cso-color-surface-inverse` |
| `--player-sidebar-bg` | `--cso-color-surface-inverse-raised` |
| `--player-sidebar-border` | `--cso-color-surface-inverse-border` |
| `--player-stage-bg` | `--cso-color-background-stage` |
| `--player-card-bg` | `--cso-color-surface-primary` |

## Route Checked

Path checked: `http://127.0.0.1:5173/module-2/screen-2-2`

In a fresh browser profile, Module 2 is locked until Module 1 is complete. To render the same route as a player shell for QA, the local QA progress override was used:

`http://127.0.0.1:5173/module-2/screen-2-2?completed=module_01_hrba_foundations`

The rendered path remained `/module-2/screen-2-2`, and the player container rendered with `player-container course-shell`.

## Viewports Checked

| Viewport | Size |
| --- | --- |
| Desktop | `1440 x 900` |
| Tablet | `768 x 900` |
| Mobile | `390 x 844` |

## Build Result

`npm run build` passed.

The existing Vite large-asset/chunk warning was still present. No new build error was observed during this QA pass.

## Effective Variable Verification

The six scoped player shell variables now resolve to the intended CSO token values at runtime.

| Variable | Effective value observed | Matching CSO token | Result |
| --- | --- | --- | --- |
| `--player-shell-bg` | `#0F172A` | `--cso-color-surface-inverse` | Pass |
| `--player-header-bg` | `#0F172A` | `--cso-color-surface-inverse` | Pass |
| `--player-sidebar-bg` | `#1E293B` | `--cso-color-surface-inverse-raised` | Pass |
| `--player-sidebar-border` | `#334155` | `--cso-color-surface-inverse-border` | Pass |
| `--player-stage-bg` | `#F9FAFB` | `--cso-color-background-stage` | Pass |
| `--player-card-bg` | `#FFFFFF` | `--cso-color-surface-primary` | Pass |

This confirms that the later course-shell cascade no longer masks these six scoped variables with the previous raw values.

## Rendered Shell Observations

| Check | Observation | Result |
| --- | --- | --- |
| Dark shell/header/sidebar still look premium and consistent | The player container rendered as dark navy (`rgb(15, 23, 42)`) across all checked viewports. Header and sidebar areas remain visually integrated with the dark shell. | Pass |
| Learning stage remains light and readable | The scoped `--player-stage-bg` resolves to `#F9FAFB`. The checked screen canvas still renders with an existing soft green screen-level surface (`rgb(246, 250, 242)`), which is outside this variable-aliasing slice. | Pass with note |
| Sidebar borders/separators visible but not heavy | Sidebar separators remained visible and subtle. The sidebar element still uses an existing semi-transparent border treatment, which is outside the six-variable scope. | Pass |
| Course screen layout broken by cascade fix | No shell-level layout break or horizontal overflow was observed at desktop, tablet, or mobile sizes. | Pass |
| CTA or navigation hidden | Header controls and sidebar controls remained visible. However, the content-level `Continue to opening scenario` CTA was below the visible viewport on tablet and mobile inside non-scrollable player containers. | Fail / pre-existing responsive risk |
| Shell-caused horizontal scrolling | No document-level horizontal overflow was observed at the checked viewports. | Pass |
| Existing focus indicators | Existing focus-related CSS rules were present in the loaded stylesheets. This QA did not redesign or modify focus behavior. | Pass for unchanged behavior |

## CTA Visibility Finding

The content-level `Continue to opening scenario` button was visible on desktop, but not reachable in the initial tablet and mobile viewport checks:

| Viewport | CTA position | Container scroll behavior | Observation |
| --- | --- | --- | --- |
| Desktop `1440 x 900` | visible in viewport | shell containers fixed/non-overflowing | Pass |
| Tablet `768 x 900` | y-position about `903px` | document/body/player containers reported no vertical scroll access | CTA just below viewport |
| Mobile `390 x 844` | y-position about `1778px` | document/body/player containers reported no vertical scroll access | CTA far below viewport |

This appears to be an existing responsive layout/content issue on the checked Module 2 screen, not a direct result of the six-variable cascade fix. The cascade fix changed variable values only; it did not change selectors, layout rules, overflow rules, or screen structure.

## Risks Noticed

- The scoped cascade issue is resolved for the six player shell variables.
- Some visible shell-adjacent treatments still come from pre-existing legacy rules outside the six-variable scope, including screen canvas soft surface and semi-transparent separators.
- Tablet and mobile CTA visibility should be treated as a responsive player/screen risk before expanding token adoption.
- The hidden CTA risk should not be fixed as part of token migration unless a later task explicitly scopes that responsive layout issue.

## Recommendation

Pause before proceeding to the next token adoption slice.

The token cascade fix itself passes: the six scoped variables now resolve through the intended CSO token values. However, the tablet/mobile CTA visibility issue should be triaged as a separate responsive layout QA item before expanding styling work, so future token migration does not obscure an existing player/screen usability problem.

## Confirmation

- No CSS was edited during this QA task.
- No components were edited.
- No screens were edited.
- No module CSS files were edited.
- No token files were edited.
- No assets were copied, moved, renamed, optimized, approved, rejected, or migrated.
- No routing, progress logic, locking, assessment logic, certificate logic, or accessibility toolbar behavior was changed.
- This QA note is documentation only.
