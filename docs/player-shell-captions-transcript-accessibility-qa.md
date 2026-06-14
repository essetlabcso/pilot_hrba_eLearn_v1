# Player Shell Captions/Transcript Accessibility QA

## Branch

`system/hrba-clean-foundation`

## Implementation Source Spec

`docs/player-shell-active-current-sidebar-react-accessibility-implementation-spec.md`

## Implementation Scope

This QA verifies the bounded Captions/transcript React/accessibility semantics slice only.

## Files Changed

- `src/components/player/PlayerSidebar.tsx`
- `src/components/player/CoursePlayerShell.tsx`
- `docs/player-shell-captions-transcript-accessibility-qa.md`
- `docs/design-system-plan-progress-alignment.md`

No CSS, token, modal, menu drawer, routing, progress, assessment, certificate, accessibility toolbar, asset, content, or old HRBA files were changed.

## Exact React/Accessibility Changes

- Added `aria-expanded={transcriptVisible}` to the Captions/transcript button.
- Added conditional `aria-controls={transcriptVisible ? 'player-transcript-panel' : undefined}` to the Captions/transcript button.
- Added `id="player-transcript-panel"` to the transcript panel container.
- Preserved the visible label pattern: `Captions: ON/OFF`.
- Preserved the existing dynamic `aria-label`: `Show transcript panel` / `Hide transcript panel`.

## Aria-Controls Behavior

`aria-controls` is conditional while hidden. This is intentional because the transcript panel is currently conditionally rendered only when `transcriptVisible` is true. The panel was not kept mounted because that would change existing rendering behavior.

When hidden:

- Captions button has `aria-expanded="false"`.
- `aria-controls` is omitted.
- `#player-transcript-panel` is not mounted.

When visible:

- Captions button has `aria-expanded="true"`.
- `aria-controls="player-transcript-panel"`.
- Transcript panel has `id="player-transcript-panel"`.

## Build Result

`npm run build` passed.

Observed existing Vite large-chunk warning:

- Some chunks are larger than 500 kB after minification.

No new build errors were introduced.

## Route QA Result

Route checked:

`/module-2/screen-2-2?completed=module_01_hrba_foundations`

Viewports checked:

- Desktop: `1440x900`
- Tablet: `768x900`
- Mobile: `390x844`

Result: Pass.

## Keyboard Navigation Result

The Captions button was reachable by keyboard Tab navigation at all checked viewports.

## DOM/Attribute Checks

Hidden state at all checked viewports:

- Button exists.
- Visible label: `Captions: OFF`.
- Accessible label: `Show transcript panel`.
- `aria-expanded="false"`.
- `aria-controls` omitted.
- Transcript panel not mounted.

Visible state at all checked viewports:

- Button exists.
- Visible label: `Captions: ON`.
- Accessible label: `Hide transcript panel`.
- `aria-expanded="true"`.
- `aria-controls="player-transcript-panel"`.
- Transcript panel mounted with `id="player-transcript-panel"`.

## Behavior and Visual Checks

- Transcript toggle behavior remained unchanged.
- Transcript panel content remained unchanged.
- No visual styling changed.
- No CSS selector changes were made.
- No token file changes were made.

## Out-of-Scope Confirmation

This task did not change:

- CSS implementation;
- token files;
- active/current visual styling;
- modal launcher ARIA;
- menu drawer ARIA;
- modal behavior;
- routing;
- progress logic;
- assessment logic;
- certificate logic;
- accessibility toolbar behavior;
- course screens;
- module CSS files;
- assets;
- content files;
- old HRBA files.

## Phase D Status

Phase D CSS implementation remains blocked. Modal launcher and menu drawer ARIA remain blocked pending separate modal/drawer behavior review.

## Recommendation

Proceed to a documentation-only modal/drawer behavior review, or a token/CSS readiness check, before any current-state CSS task. Do not begin Phase D CSS migration from this slice alone.
