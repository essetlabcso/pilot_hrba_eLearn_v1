# Player Shell Focus-Visible Token Adoption QA

## QA Scope

Implementation commit verified: `79c62192e938580ad1af1a3dd26574691d3d5261`

Master plan area: Focus/accessibility states

Implementation stream: Visual System Stream: Token Foundation and Player Shell Adoption

Route checked:

- `/module-2/screen-2-2?completed=module_01_hrba_foundations`

Selectors checked:

- `.player-header-button:focus-visible`
- `.player-sidebar-button:focus-visible`
- `.player-sidebar-return:focus-visible`

This QA note verifies only the bounded Phase C focus-visible token adoption slice. It does not approve hover, active, selected/current, completed, locked, disabled, danger-on-dark, modal/accessibility UI, progress strip, shell shadow, course-screen, or module-specific style migration.

## Build Result

`npm run build` passed.

Known existing Vite warning remained:

- some chunks are larger than 500 kB after minification.

No build-breaking issue was found.

## Runtime Focus Token Value

Runtime token checked:

- `--cso-color-focus-dark-surface`

Observed runtime value at all tested viewport sizes:

- `#FBBF24`

Observed computed focus outline color on player shell controls:

- `rgb(251, 191, 36)`

This matches the intended dark-surface focus token value.

## Viewports Checked

| Viewport | Size | Route loaded | Runtime token | Shell focus outline | CTA visibility | Horizontal overflow |
| --- | --- | --- | --- | --- | --- | --- |
| Desktop | `1440 x 900` | Pass | `#FBBF24` | Pass: `rgb(251, 191, 36)` | Pass: visible | Pass: none observed |
| Tablet | `768 x 900` | Pass | `#FBBF24` | Pass: `rgb(251, 191, 36)` | Pass: visible | Pass: none observed |
| Mobile | `390 x 844` | Pass | `#FBBF24` | Pass: `rgb(251, 191, 36)` | Pass: visible | Pass: none observed |

## Keyboard Focus Observations

Keyboard Tab testing reached the player shell controls at all tested viewport sizes.

Observed focused shell control groups:

- enabled header buttons, including Previous and Course/Exit where visible;
- sidebar tool buttons, including Menu, Glossary, Resources, Help Guide, Accessibility, Captions, Playing, Audio, and Reload State where visible;
- sidebar return button.

The Next button was disabled on the checked route and was not expected to receive keyboard focus.

For focused player shell controls:

- outline style resolved to `solid`;
- outline width resolved to `2px`;
- outline color resolved to `rgb(251, 191, 36)`;
- outlines were not clipped;
- focus did not rely on hover only.

## Pass/Fail Findings

| Check | Result | Notes |
| --- | --- | --- |
| Focus outline resolves to intended token value | Pass | `--cso-color-focus-dark-surface` resolved to `#FBBF24`; focused controls computed `rgb(251, 191, 36)`. |
| Focus is visible on dark shell surfaces | Pass | Gold focus outline was visible on header/sidebar surfaces. |
| Focus outline is not clipped | Pass | No focused shell controls reported clipping at desktop, tablet, or mobile sizes. |
| Keyboard Tab order reaches shell controls | Pass | Header and sidebar shell controls were reached by keyboard at all tested viewports. |
| No shell-caused horizontal scrolling | Pass | No horizontal overflow observed at tested viewports. |
| Module 2 S02 CTA remains visible/reachable | Pass | CTA remained visible in the tested viewports. |
| Header/sidebar/navigation remain usable | Pass | Controls remained reachable and visually stable during QA. |
| No unrelated migration detected | Pass | QA scope found no indication that hover, active, selected/current, completed, locked, disabled, danger-on-dark, modal/accessibility UI, progress strip, shell shadow, course-screen, or module-specific styles were migrated in this slice. |

## Visual and Accessibility Risks

Remaining risks are outside this Phase C slice:

- hover, active, selected/current, completed, locked, disabled, and danger-on-dark state recipes remain legacy or undecided;
- modal/accessibility UI still includes inline style clusters and requires behavior review before migration;
- progress strip and shell shadows remain outside token adoption for now;
- the global `*:focus-visible` rule still uses the older focus variable and was intentionally not changed in this slice;
- this QA covered one route and three viewport sizes, not the full course.

## Recommendation

Proceed.

The bounded player shell focus-visible token adoption passed the narrow QA checks for the target route and viewports. The next safe step should be to update `docs/design-system-plan-progress-alignment.md` to record Phase C implementation and QA completion, then choose the next bounded phase only after review.

Do not continue into hover, active, selected/current, completed, locked, disabled, danger-on-dark, modal/accessibility UI, progress strip, shell shadow, course-screen, or module-specific migration without a separate approved task.
