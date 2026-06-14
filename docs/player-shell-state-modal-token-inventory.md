# Player Shell State and Modal Token Inventory

## 1. Purpose and Alignment Reference

This documentation-only inventory implements Phase B: State and Modal Inventory from `docs/design-system-plan-progress-alignment.md`.

It supports the next validated design-system phase by documenting the remaining player shell/platform-level interaction states, focus states, modal surfaces, and accessibility UI visual patterns before any further token migration. The goal is to prevent state-by-state drift, modal/accessibility regressions, and uncontrolled styling changes after the completed base player shell surface, text/icon, and button base color adoption slices.

This inventory is part of the Visual System Stream: Token Foundation and Player Shell Adoption. It does not implement token migration, edit CSS, change React components, change behavior, or fix any issue.

## 2. Inventory Summary

Read-only inspection found these relevant selector and component groups:

- 6 player header/sidebar button state selector groups;
- 4 player navigation/active state selector groups;
- 2 shell-level focus visibility groups;
- 5 player modal/accessibility UI groups;
- 5 remaining shell-level hard-coded visual value groups connected to color, background, border, outline, shadow, rgba overlays, or gradients.

The lowest-risk future implementation candidate is a bounded player shell focus-visible token adoption slice. Active/current/selected states, danger-on-dark states, disabled states, and modal/accessibility UI should wait for explicit state recipes or behavior review.

## 3. State/Modal Inventory Table

| Selector or group | Current purpose | Current hard-coded or legacy visual values | Accessibility or learner-experience role | Likely token category needed | Risk level | Migration readiness | Recommended future migration slice |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `.player-header-button:hover:not(:disabled)`, `.player-header-button:focus-visible:not(:disabled)` | Shared header button hover/focus movement. | `transform: translateY(-1px)` with no local outline; relies on global `*:focus-visible`. | Gives affordance that Previous/Next/Exit controls are interactive. | Motion token plus focus token; behavior review for reduced motion. | Medium | Needs behavior review | Defer until focus slice decides whether transform remains separate from focus ring. |
| `.player-header-button--exit:hover`, `.player-header-button--exit:focus-visible` | Exit button hover/focus danger affordance. | `border-color: rgba(239, 68, 68, 0.9)`, `background: rgba(239, 68, 68, 0.18)`. | Signals a potentially disruptive exit action. | Danger-on-dark state recipe; focus token; danger surface/border token. | High | Needs token decision | Defer until danger-on-dark recipe exists. |
| `.player-header-button:disabled` | Disabled header button treatment. | `opacity: 0.44`, `cursor: not-allowed`, `box-shadow: none`. | Communicates unavailable previous/next action without changing logic. | Disabled-on-dark state token/recipe, cursor policy, non-color-only support if needed. | High | Needs token decision | Defer until disabled state recipe exists. |
| `.player-sidebar-button:hover`, `.player-sidebar-button:focus-visible` | Sidebar tool hover/focus affordance. | `border-color: rgba(59, 153, 212, 0.66)`, `background: rgba(59, 153, 212, 0.18)`. | Helps learners identify Help, Accessibility, Glossary, Resources, Transcript, Screen Help, and media controls. | Focus-on-dark token; hover-on-dark recipe; active/selected token. | High | Needs token decision | Split: adopt focus ring first; defer hover/active background. |
| `.player-sidebar-return:hover`, `.player-sidebar-return:focus-visible` | Sidebar return/exit-like action hover/focus state. | `background: rgba(239, 68, 68, 0.16)`. | Makes the return control discoverable, but danger semantics are possible. | Danger-on-dark state recipe; focus token. | High | Needs token decision | Defer until danger-on-dark recipe exists. |
| `.player-sidebar-button--media` | Secondary media/help-like sidebar button state. | Base color is tokenized with `var(--cso-color-text-inverse-muted)`, but hover/focus shares active blue rgba state. | Makes secondary media functions visible but less prominent. | Muted-on-dark text plus hover/focus recipe. | Medium | Needs token decision | Defer until sidebar state recipe separates active, hover, and muted media states. |
| `.player-sidebar-button.is-active` | Active modal/tool state in sidebar. | `border-color: rgba(59, 153, 212, 0.66)`, `background: rgba(59, 153, 212, 0.18)`. | Shows the currently open player tool such as Help, Accessibility, Glossary, or Resources. | Selected/current-on-dark state token; active background token; border token. | High | Needs token decision | Future navigation state adoption after focus slice. |
| `.player-sidebar-button.is-active .player-sidebar-icon` | Active sidebar icon marker. | `background: #3B99D4`. | Reinforces current/open state visually. | Selected/current icon surface token; non-color-only support if possible. | High | Needs token decision | Future navigation state adoption after active/current recipe. |
| `PlayerSidebar.tsx` active class usage | Applies `.is-active` when `activeModal === tool.modal` or transcript is visible. | Class behavior in React; visual values in CSS. | Connects visual active state to modal/transcript state. | No new token alone; needs state recipe and behavior-safe QA. | Medium | Needs behavior review | Inventory only; do not alter React in next CSS slice. |
| `CoursePlayerShell.tsx` menu overlay active module list | Mobile/menu module list overlay with active module button styles. | Inline `rgba(15,23,42,0.6)`, `rgba(59, 153, 212, 0.15)`, `#fff`, `#cbd5e1`, `1px solid var(--color-primary)`. | Provides compact menu/navigation state and modal-like overlay behavior. | Overlay modal token, active/current token, inverse text token, border token. | High | Needs behavior review | Defer to modal/accessibility UI phase; not part of next CSS-only shell slice. |
| Global `*:focus-visible` | Global keyboard focus indicator. | `outline: 2px solid var(--color-primary)`, `outline-offset: 2px`. | Provides keyboard visibility across shell and course screens. | `--cso-color-focus-light-surface`, `--cso-color-focus-dark-surface`, focus width/offset token. | High | Ready with caution | Recommended next smallest implementation slice: bounded player shell focus-visible token adoption, not global replacement. |
| Player shell focus-visible selectors | Header/sidebar focus currently inherits global focus plus local hover/focus background. | Local button focus uses hover values; global outline uses legacy `--color-primary`. | Critical for keyboard users navigating header and sidebar. | Focus-on-dark token; possibly focus halo token. | High | Ready with caution | Start with `.player-header-button:focus-visible`, `.player-sidebar-button:focus-visible`, `.player-sidebar-return:focus-visible` only. |
| `.modal-backdrop`, `.modal-content` class usage in `AccessibilityModal.tsx`, `GlossaryModal.tsx`, `ResourcesModal.tsx` | Platform modal surfaces for accessibility, glossary, and resources. | Inline `rgba(15, 23, 42, 0.85)`, `var(--color-surface-player)`, `var(--color-border-dark)`, `12px`, `0 25px 50px -12px rgba(0,0,0,0.5)`, `#fff`, `#94a3b8`. | Must preserve dialog readability, keyboard focus, and screen reader semantics. | Modal overlay, surface, inverse text, muted text, border, radius, modal shadow tokens. | High | Needs behavior review | Defer until modal/accessibility UI token adoption phase. |
| `AccessibilityModal.tsx` content and controls | Accessibility help content, close button, keyboard hints, privacy section, and primary close CTA. | Inline `#fff`, `#94a3b8`, `#334155`, `var(--color-primary)`, `var(--color-accent-green)`, `var(--color-secondary-text)`, `var(--color-border-dark)`. | Accessibility content itself must be clear, readable, and keyboard usable. | Inverse text, inverse muted text, accent, action, border, keyboard hint surface tokens. | High | Needs behavior review | Defer; any change must verify modal focus and readability. |
| `GlossaryModal.tsx` content and search field | Glossary dialog, search input, category chips, result cards, and close CTA. | Inline `#0f172a`, `#1e293b`, `#fff`, `#94a3b8`, `rgba(59, 153, 212, 0.1)`, `var(--color-primary)`, `var(--color-primary-light)`. | Supports plain-language learning access and search. | Modal surface, input surface, chip, action, inverse text, muted text tokens. | High | Needs behavior review | Defer; search/input states need separate review. |
| `ResourcesModal.tsx` content and download buttons | Resources dialog, item cards, meta text, hover handlers, and close CTA. | Inline `#1e293b`, `#fff`, `#94a3b8`, `#64748b`, `var(--color-primary)`, hover handlers mutate colors. | Supports resource access and visible download actions. | Modal card, resource meta, action outline, hover state, muted text tokens. | High | Needs behavior review | Defer; inline hover handlers may need component strategy, not CSS-only migration. |
| `HelpOverlay.tsx` | Player help overlay with instructional callouts and dismiss button. | Inline `rgba(15, 23, 42, 0.95)`, `#fff`, `#94a3b8`, `#1e293b`, `var(--color-primary)`, shadow rgba. | Helps learners understand the shell; overlay must not block keyboard use. | Overlay, modal card, inverse text, focus, action, shadow tokens. | High | Needs behavior review | Defer to modal/accessibility UI phase. |
| `ProgressStrip.tsx` and `.player-progress-strip` | Top progress indicator. | CSS `#041222`, `linear-gradient(90deg, #3B99D4, #91C852) !important`; component inline `#1e293b`, `var(--color-primary-light)`. | Indicates course progress and completion affordance. | Progress track/fill token; success/info gradient policy. | Medium | Needs token decision | Defer; gradient and `!important` need separate progress-state recipe. |
| `.course-shell.player-container` | Player shell structural frame. | Remaining raw `box-shadow: 0 26px 80px rgba(0, 0, 0, 0.36)` and `color: var(--text-on-dark)`. | Defines premium shell depth and default inverse text inheritance. | Shadow panel/shell token; inverse text token. | Medium | Needs token decision | Defer until shell shadow/depth slice. |
| `body:has(.course-shell)` | Course shell page background outside player frame. | `linear-gradient(135deg, #020b16 0%, #071c33 52%, #0b2138 100%)`. | Creates premium dark environment around player. | Page/shell background recipe; gradient policy. | Medium | Needs token decision | Defer; gradients need visual foundation decision. |
| `.main-screen-canvas` | Main learning card/canvas frame. | Border tokenized; remaining `box-shadow: 0 20px 50px rgba(7, 28, 51, 0.14)` and `border-radius: var(--player-canvas-radius)`. | Provides light card depth and learning stage containment. | Card/panel shadow token; radius token or player alias. | Low | Needs token decision | Later shell depth/radius slice, not state/modal phase. |

## 4. Safe Next Implementation Candidates

Smallest low-risk implementation candidate after this inventory is reviewed:

**Bounded player shell focus-visible token adoption only.**

Recommended scope:

- edit only `src/styles/global.css`;
- target only player shell controls:
  - `.player-header-button:focus-visible`;
  - `.player-sidebar-button:focus-visible`;
  - `.player-sidebar-return:focus-visible`;
- use existing focus tokens such as `--cso-color-focus-dark-surface`;
- preserve existing hover, active, selected, disabled, modal, and layout behavior;
- do not replace the global `*:focus-visible` rule in the same slice;
- run build and viewport QA on `/module-2/screen-2-2?completed=module_01_hrba_foundations`.

This is safer than migrating hover/active/current states because focus visibility is an accessibility gate and already has explicit token support.

## 5. Items Requiring Token/Spec Decisions First

These items need a state recipe or behavior review before implementation:

- danger-on-dark for `.player-header-button--exit` and `.player-sidebar-return`;
- disabled-on-dark for `.player-header-button:disabled` and any future sidebar disabled state;
- selected/current-on-dark for `.player-sidebar-button.is-active`;
- selected/current icon surface for `.player-sidebar-button.is-active .player-sidebar-icon`;
- hover-on-dark versus focus-on-dark distinction for sidebar buttons;
- modal overlay opacity and whether current `rgba(15, 23, 42, 0.85)` should map to `--cso-color-overlay-modal` or a stronger modal variant;
- modal surface mapping from legacy `--color-surface-player` to CSO surface tokens;
- modal input/search/inline hover handler strategy;
- progress strip gradient policy and whether progress states need dedicated tokens;
- shell shadow/depth tokens for frame and canvas shadows;
- whether a focus width/offset token is needed in addition to focus color tokens.

## 6. Items That Must Remain Untouched Until Later

Do not mix these into the next token slice:

- Module 1, Module 2, Module 3, Module 4, or Module 5 course screen selectors;
- module-specific patch CSS;
- course screen renderers;
- screen-level modals such as Module 1 water modals and Module 2 story dialogs;
- progress, locking, completion, assessment, certificate, or routing logic;
- accessibility toolbar behavior or modal focus-trap behavior;
- token files;
- story visuals or assets;
- broad global focus replacement across all screens;
- course-screen selected/completed/locked/disabled states.

## 7. Recommended Next Phase

After this inventory is reviewed, proceed to Phase C: Focus State Token Adoption as a bounded implementation task.

Recommended next implementation prompt:

- master plan area: Focus/accessibility states;
- implementation stream: Visual System Stream: Token Foundation and Player Shell Adoption;
- scope: player shell focus-visible selectors only;
- allowed file: `src/styles/global.css`;
- out of scope: hover, active, selected, completed, locked, disabled, modal, course screen, token, and component changes;
- validation: build plus desktop/tablet/mobile route QA;
- alignment update: update `docs/design-system-plan-progress-alignment.md` only after focus implementation and QA are complete.

## 8. Alignment Update Requirement

`docs/design-system-plan-progress-alignment.md` should be updated after this inventory is committed and reviewed.

Suggested alignment revisions after review:

- mark Phase B: State and Modal Inventory as complete;
- update Focus/accessibility states from Partial to In progress only after the next implementation slice begins;
- keep Interaction state recipes as Not started until hover/active/current/disabled recipes are defined;
- keep Modal/accessibility UI as Not started until behavior review and modal token adoption begin;
- keep risk level High for accessibility states and modal/accessibility UI until QA confirms tokenized states remain readable and keyboard usable;
- add a risk note that player modal/accessibility UI includes inline styles and should not be treated as a CSS-only migration without behavior review.

This inventory does not change implementation status by itself. It only prepares the next safe implementation decision.
