# Player Shell Hover-on-Dark CSS Implementation QA

## Branch

`system/hrba-clean-foundation`

## Implementation Scope

This QA note verifies the bounded non-danger player shell hover-on-dark CSS implementation.

The implementation applied the approved semantic hover-on-dark tokens to non-danger player shell hover selectors only. It did not migrate active/current, selected/current, disabled, locked, completed, danger, modal/accessibility UI, progress strip, shell shadow, global focus, course-screen, or module-specific states.

## Selectors Changed

| Selector | Change |
| --- | --- |
| `.player-header-button:hover:not(:disabled):not(.player-header-button--exit)` | Added tokenized hover border and hover surface for non-danger header buttons. |
| `.player-sidebar-button:hover:not(.is-active)` | Added tokenized hover border and hover surface for non-active, non-danger sidebar buttons. |

The existing `.player-header-button:focus-visible`, `.player-sidebar-button:focus-visible`, and `.player-sidebar-return:focus-visible` focus-visible behavior remains unchanged.

## Tokens Used

| Token | Purpose |
| --- | --- |
| `var(--cso-color-state-hover-on-inverse-surface)` | Non-danger hover surface on dark player shell surfaces. |
| `var(--cso-color-state-hover-on-inverse-border)` | Non-danger hover border on dark player shell surfaces. |

Existing inverse text/icon tokens were preserved. No new raw color, border, shadow, spacing, typography, gradient, or motion values were introduced.

## Files Changed

| File | Purpose |
| --- | --- |
| `src/styles/global.css` | Bounded non-danger player shell hover selector implementation. |
| `docs/player-shell-hover-on-dark-css-implementation-qa.md` | This QA note. |
| `docs/design-system-plan-progress-alignment.md` | Alignment status update after successful QA. |

No token files, React components, course screens, module CSS files, routing, progress logic, assessment logic, certificate logic, accessibility toolbar behavior, modal behavior, assets, content files, or old HRBA files were changed.

## Build Result

`npm run build` passed.

The existing Vite large-chunk warning may appear and is not introduced by this slice.

## Route QA

Route checked:

`/module-2/screen-2-2?completed=module_01_hrba_foundations`

| Viewport | Header hover result | Sidebar hover result | CTA result | Shell overflow |
| --- | --- | --- | --- | --- |
| Desktop `1440 x 900` | Pass: hover background resolved to `rgb(37, 52, 73)` and border resolved to `rgb(100, 116, 139)`. | Pass: hover background resolved to `rgb(37, 52, 73)` and border resolved to `rgb(100, 116, 139)`. | CTA found and visible in viewport. | No shell-caused horizontal overflow observed. |
| Tablet `768 x 900` | Pass: hover background resolved to `rgb(37, 52, 73)` and border resolved to `rgb(100, 116, 139)`. | Pass: hover background resolved to `rgb(37, 52, 73)` and border resolved to `rgb(100, 116, 139)`. | CTA found and reachable by scroll. | No shell-caused horizontal overflow observed. |
| Mobile `390 x 844` | Pass: hover background resolved to `rgb(37, 52, 73)` and border resolved to `rgb(100, 116, 139)`. | Pass: hover background resolved to `rgb(37, 52, 73)` and border resolved to `rgb(100, 116, 139)`. | CTA found and reachable by scroll. | No shell-caused horizontal overflow observed. |

Runtime token values observed:

| Token | Runtime value |
| --- | --- |
| `--cso-color-state-hover-on-inverse-surface` | `#253449` |
| `--cso-color-state-hover-on-inverse-border` | `#64748B` |
| `--cso-color-focus-dark-surface` | `#FBBF24` |
| `--cso-color-high-contrast-hover-surface` | `#1A1A1A` |
| `--cso-color-high-contrast-hover-border` | `#7DD3FC` |

## Focus-Visible Confirmation

Phase C focus-visible behavior remains unchanged.

The bounded hover implementation did not alter:

- `.player-header-button:focus-visible`;
- `.player-sidebar-button:focus-visible`;
- `.player-sidebar-return:focus-visible`;
- the global `*:focus-visible` rule.

Focus-visible continues to use the existing approved dark-surface focus token behavior.

## Deferred State Confirmation

The following areas were not migrated:

- active/current state;
- selected/current icon state;
- disabled state;
- locked state;
- completed state;
- danger-on-dark state;
- modal/accessibility UI;
- progress strip;
- shell shadow/depth;
- global focus;
- course-screen states;
- module-specific states.

Existing danger button and return/danger styling remained separate and unchanged.

## High-Contrast Handling

The approved high-contrast hover token values exist in the token layer, but no existing scoped high-contrast hover selectors were found for this bounded player shell hover area.

No broad high-contrast migration was created in this task. High-contrast state application remains deferred until a separate scoped high-contrast implementation task is approved.

## Recommendation

Pass.

Proceed only to alignment update and push for this bounded slice. Broader interaction-state migration remains blocked until separately specified, implemented, and QA-tested.
