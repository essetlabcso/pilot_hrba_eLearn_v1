# Player Shell State Recipe Decision

## 1. Purpose and Alignment Reference

This documentation-only decision bridges Phase C and the next possible implementation phase in `docs/design-system-plan-progress-alignment.md`.

Phase C completed bounded player shell focus-visible token adoption. The next step must not be another automatic CSS migration. This document uses the Phase B inventory and Phase C QA evidence to decide whether any remaining player shell interaction-state area is ready for safe implementation, or whether a recipe/specification decision is required first.

Master plan areas:

- Interaction state recipes;
- Focus/accessibility states.

Implementation stream:

- Visual System Stream: Token Foundation and Player Shell Adoption.

This document does not edit CSS, React components, token files, routing, progress logic, modal behavior, accessibility toolbar behavior, course screens, or old HRBA course files.

## 2. Summary of Completed State Work

Completed state work:

- Phase B state/modal inventory is complete in `docs/player-shell-state-modal-token-inventory.md`.
- Phase C bounded player shell focus-visible token adoption is complete.
- Phase C QA is complete in `docs/player-shell-focus-visible-token-adoption-qa.md`.
- Player shell controls now use `--cso-color-focus-dark-surface` for the bounded focus-visible selectors.
- QA confirmed the focus token resolved to `#FBBF24` and computed as `rgb(251, 191, 36)` on the checked route and viewports.

Remaining state work:

- hover-on-dark remains legacy;
- active/current sidebar tool state remains legacy;
- selected/current sidebar icon state remains legacy;
- disabled-on-dark remains legacy;
- danger-on-dark remains legacy;
- modal/accessibility UI states remain blocked pending behavior review;
- progress strip state remains legacy;
- shell shadow/depth state remains legacy;
- course-screen states remain out of scope.

## 3. State Recipe Decision Table

| State area | Selectors or selector groups from inventory | Current legacy visual pattern | Learner/accessibility purpose | Likely token category needed | Implementation readiness | Risk level | Decision | Rationale |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hover-on-dark | `.player-header-button:hover:not(:disabled)`, `.player-sidebar-button:hover`, `.player-sidebar-return:hover` | Header hover uses transform only; sidebar hover shares blue active-style rgba; return hover uses danger rgba. | Confirms controls are interactive for pointer users. | Hover-on-dark surface, hover border, motion/reduced-motion relationship. | Not ready | Medium-high | Document recipe first | Hover is currently entangled with focus, active, and danger patterns. Migrating it now could accidentally redefine active/current or danger states. |
| Active/current sidebar tool state | `.player-sidebar-button.is-active`, `PlayerSidebar.tsx` active class usage | Blue rgba border/background shared with hover/focus. | Shows which player tool/modal/transcript state is currently open. | Selected/current-on-dark surface, current border, current text/icon support. | Not ready | High | Document recipe first | Active/current state carries learner orientation and modal/tool state meaning. It needs non-color support and behavior-safe QA before implementation. |
| Selected/current sidebar icon state | `.player-sidebar-button.is-active .player-sidebar-icon` | Hard-coded `#3B99D4` icon background. | Reinforces current/open state visually. | Current icon surface token, icon contrast rule, non-color cue. | Not ready | High | Needs token update or explicit recipe | The old light blue failed prior button-text contrast checks and should not be reused blindly. The token system lacks a specific current-icon recipe. |
| Disabled-on-dark | `.player-header-button:disabled` and future sidebar disabled states | `opacity: 0.44`, `cursor: not-allowed`, `box-shadow: none`. | Communicates unavailable navigation without changing logic. | Disabled-on-dark text/surface/border recipe; non-color cue. | Not ready | High | Needs token/spec decision | Token specification says locked/disabled states must use labels and sufficient contrast, not opacity alone. Current CSS is opacity-based. |
| Danger-on-dark | `.player-header-button--exit`, `.player-header-button--exit:hover`, `.player-sidebar-return`, `.player-sidebar-return:hover` | Mixed red rgba borders/backgrounds and raw red/pink text values. | Communicates exit/return actions that may interrupt or leave the learning flow. | Danger-on-dark text, border, hover surface, focus interaction with danger state. | Not ready | High | Needs token/spec decision | Danger states need semantic clarity and contrast validation. They should not be mixed with general hover or active migration. |
| Focus-on-dark relationship to hover/active states | `.player-header-button:focus-visible`, `.player-sidebar-button:focus-visible`, `.player-sidebar-return:focus-visible` | Focus outline is now tokenized, but local focus selectors still share hover/active background rules. | Ensures keyboard users can find shell controls. | Focus token is implemented; separate focus-vs-hover recipe still needed. | Partially ready | Medium | Defer additional implementation | The focus outline passed QA, but background/border changes on focus still come from hover/active rules. Do not change them until hover and active recipes are separated. |
| Modal/accessibility UI states | `AccessibilityModal.tsx`, `GlossaryModal.tsx`, `ResourcesModal.tsx`, `HelpOverlay.tsx`, `.modal-backdrop`, `.modal-content` | Inline dark surfaces, overlays, shadows, text colors, input/card styles, and hover handlers. | Supports accessibility help, glossary, resources, and player help. | Modal overlay, modal surface, modal text, modal button, input, focus, and shadow tokens. | Needs behavior review | High | Defer | Modal/accessibility UI includes focus behavior, dialog semantics, and inline styles. It is not a CSS-only migration. |
| Progress strip state | `.player-progress-strip`, `ProgressStrip.tsx` | Hard-coded track color and blue/green gradient with `!important`; component inline values also exist. | Communicates course progress and completion status. | Progress track, progress fill, progress success/info recipe, gradient policy. | Needs token/spec update | Medium-high | Defer | Progress has semantic meaning and uses gradients/important rules. It needs a dedicated progress recipe. |
| Shell shadow/depth state | `.course-shell.player-container`, `.main-screen-canvas` | Raw box shadows and depth values remain. | Supports premium shell hierarchy and stage/card separation. | Shadow/elevation tokens and premium shell depth recipe. | Needs token decision | Medium | Defer | This is visual depth, not interaction state. It should not be mixed into state migration. |

## 4. Recommended Next Implementation Slice

Recommendation: pause implementation.

No remaining interaction-state area is ready for safe CSS implementation without a prior recipe/specification decision.

The next safest step is documentation-only:

- create a player shell interaction-state recipe specification for hover-on-dark, active/current, selected/current icon, disabled-on-dark, and danger-on-dark;
- do not implement CSS in that step;
- decide state semantics, token categories, non-color cues, and QA requirements first.

If a future implementation slice is approved after that recipe, the smallest likely implementation candidate should be **hover-on-dark for non-danger player shell buttons only**. That should happen only after the recipe separates hover from focus and active/current states.

## 5. Draft Recipe for the Recommended Next Slice

No implementation slice is ready yet.

Draft recipe scope for the next documentation-only decision:

Allowed selector families to analyze:

- `.player-header-button:hover:not(:disabled)` for non-danger header buttons;
- `.player-sidebar-button:hover` for non-danger sidebar tool buttons;
- `.player-sidebar-button--media:hover` if media hover remains visually distinct;
- exclude `.player-header-button--exit` and `.player-sidebar-return` until danger-on-dark is decided.

Allowed token categories to define in the recipe:

- hover-on-dark surface;
- hover-on-dark border;
- hover-on-dark text/icon if needed;
- motion/reduced-motion relationship;
- distinction between hover, focus-visible, active/current, and disabled.

Prohibited changes for the eventual implementation slice:

- no React component edits;
- no token file edits unless a separate approved token task exists;
- no danger-on-dark migration;
- no selected/current migration;
- no disabled migration;
- no modal/accessibility UI migration;
- no progress strip migration;
- no shell shadow/depth migration;
- no course-screen or module-specific selectors;
- no raw hex, rgba, gradients, shadows, spacing, typography, or border values.

Acceptance criteria for a future hover-on-dark implementation:

- hover remains visually clear on dark shell surfaces;
- focus-visible remains visibly distinct and tokenized;
- active/current sidebar state remains unchanged unless explicitly scoped;
- disabled state remains unchanged unless explicitly scoped;
- danger exit/return states remain unchanged unless explicitly scoped;
- build passes;
- desktop, tablet, and mobile route QA passes;
- no shell-caused horizontal scrolling appears;
- Module 2 S02 CTA remains visible or reachable.

QA requirements for a future hover-on-dark implementation:

- route: `/module-2/screen-2-2?completed=module_01_hrba_foundations`;
- viewports: `1440 x 900`, `768 x 900`, `390 x 844`;
- compare pointer hover and keyboard focus so hover does not become the only visible affordance;
- verify focus still resolves to `--cso-color-focus-dark-surface`;
- verify active/current sidebar state is not accidentally changed.

Stop conditions for a future hover-on-dark implementation:

- stop if hover requires a new token value not already approved;
- stop if hover cannot be separated from active/current selectors without selector changes;
- stop if danger-on-dark styles would be affected;
- stop if disabled styles would be affected;
- stop if implementation requires React behavior changes;
- stop if changes touch course-screen, modal/accessibility UI, progress, shell shadow, or module-specific selectors.

## 6. Items Explicitly Deferred

Deferred state areas:

- active/current sidebar tool state: needs current-state recipe and behavior-safe QA because it maps to open tools and transcript state;
- selected/current sidebar icon state: needs a current-icon token or explicit recipe and contrast validation;
- disabled-on-dark: needs a non-opacity-based accessible disabled recipe;
- danger-on-dark: needs semantic danger recipe, contrast validation, and separation from normal hover;
- modal/accessibility UI states: requires behavior review because dialogs, focus, inline styles, and accessibility content are involved;
- progress strip state: needs progress semantics, gradient policy, and possible token updates;
- shell shadow/depth: belongs to premium depth/elevation work, not interaction-state migration;
- global focus: remains out of scope because Phase C intentionally targeted only player shell focus-visible controls;
- course-screen and module-specific states: remain out of scope until template/block/component planning allows them.

## 7. Token/Spec Gaps

State recipe or token/spec decisions still needed:

- hover-on-dark surface and border recipe;
- active/current-on-dark surface, border, text, and icon recipe;
- selected/current icon surface recipe;
- disabled-on-dark text/surface/border recipe that does not rely on opacity alone;
- danger-on-dark text, border, surface, and hover recipe;
- high contrast equivalents for hover, active/current, disabled, and danger states;
- non-color cue requirements for current, disabled, completed, locked, and danger states;
- reduced-motion rule for hover transform or movement;
- progress track/fill/gradient policy;
- modal overlay/surface/input/button recipe after behavior review;
- shell depth/elevation recipe for player frame and main canvas.

## 8. Alignment Update Requirement

`docs/design-system-plan-progress-alignment.md` should be updated after this decision document is reviewed and accepted.

Recommended alignment changes after review:

- mark the state recipe decision document as completed evidence;
- keep Interaction state recipes as Not started or Partial until a full recipe is approved;
- keep Modal/accessibility UI as Not started and High risk;
- set the next recommended action to a documentation-only player shell interaction-state recipe specification;
- keep implementation paused until the recipe document is approved.

This decision document does not change implementation status by itself. It only prevents the next implementation slice from starting before the missing state recipe decisions are made.
