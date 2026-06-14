# Player Shell Active/Current Sidebar Accessibility Semantics Review

## 1. Purpose

This documentation-only review examines accessible state semantics for active/current player sidebar tool buttons before any current-on-inverse token value proposal or Phase D CSS migration.

It follows:

- `docs/player-shell-navigation-state-implementation-readiness.md`;
- `docs/player-shell-current-on-inverse-token-category-decision.md`;
- `docs/player-shell-interaction-state-recipe-specification.md`;
- `docs/design-system-plan-progress-alignment.md`.

This review does not implement React, CSS, tokens, ARIA attributes, modal behavior, routing, progress logic, accessibility toolbar behavior, or course behavior.

## 2. Current Implementation Inventory

Read-only inspection focused on `src/components/player/PlayerSidebar.tsx`, `src/components/player/CoursePlayerShell.tsx`, and the relevant player shell selectors in `src/styles/global.css`.

| Control | Current `.is-active` condition | Current behavior pattern | Current accessibility signal | Semantics classification |
| --- | --- | --- | --- | --- |
| Menu | `activeModal === 'menu'` | Toggles a menu drawer overlay for jumping to screens. | `aria-label="Toggle module menu"` only. | Mixed disclosure/modal launcher; not route-current. |
| Glossary | `activeModal === 'glossary'` | Opens or closes the glossary modal. | `aria-label="Open course glossary"` only. | Modal/dialog launcher with toggled open state. |
| Resources | `activeModal === 'resources'` | Opens or closes the resources modal. | `aria-label="Open resources list"` only. | Modal/dialog launcher with toggled open state. |
| Help Guide | `activeModal === 'help'` | Opens or closes the help overlay. | `aria-label="Open player help guide"` only. | Modal/dialog launcher with toggled open state. |
| Accessibility | `activeModal === 'accessibility'` | Opens or closes the accessibility options modal. | `aria-label="Open accessibility options"` only. | Modal/dialog launcher; tied to accessibility UI behavior. |
| Captions | `transcriptVisible === true` | Shows or hides the transcript panel. | Dynamic `aria-label` of `Hide transcript panel` or `Show transcript panel`; visible text changes between `Captions: ON` and `Captions: OFF`. | Disclosure/panel toggle. |
| Play/Pause | No `.is-active` class. | Toggles play/caption state using dynamic icon/text. | Dynamic `aria-label` of `Pause screen` or `Play screen`; visible text changes between `Playing` and `Paused`. | Media toggle, but out of current `.is-active` scope. |
| Audio | No `.is-active` class. | Toggles sound state using dynamic icon/text. | Dynamic `aria-label` of `Mute audio` or `Unmute audio`; visible text changes between `Audio: ON` and `Audio: OFF`. | Media toggle, but out of current `.is-active` scope. |
| Reload State | No `.is-active` class. | Triggers screen-state reset/reload behavior. | `aria-label="Reload current screen"`. | Command button, not active/current. |
| Return to LMS | No `.is-active` class. | Exit/return action. | `aria-label="Return to LMS"`. | Danger/return control, out of scope. |

The current CSS groups `.player-sidebar-button.is-active` with `.player-sidebar-button:focus-visible` for legacy visual treatment. That coupling is already documented as a migration risk because focus-visible and active/current communicate different things.

## 3. Accessible Semantics Assessment

### `aria-current`

`aria-current` should not be used for player sidebar tool buttons unless they become route/page navigation items.

The active sidebar tools currently represent open overlays, visible panels, or tool state. They do not represent the current page, route, screen, step, or location in a navigation set.

`aria-current` may be relevant later for the menu drawer current screen list, but that drawer uses inline styles and route behavior and remains out of scope for this review.

### `aria-expanded`

`aria-expanded` is a strong candidate when a sidebar button opens or reveals a controlled panel, drawer, or modal-like overlay.

Potential use:

- Menu button: `aria-expanded` could communicate whether the menu drawer is open.
- Captions button: `aria-expanded` could communicate whether the transcript panel is visible.
- Glossary, Resources, Help, and Accessibility buttons: `aria-expanded` may communicate whether the associated overlay is open if the project treats these as controlled disclosure/dialog launchers.

If `aria-expanded` is used, `aria-controls` should be considered when the controlled region has a stable element ID. This requires React and markup review and is not a CSS-only task.

### `aria-controls`

`aria-controls` may be appropriate if each controlled drawer, modal, or transcript panel receives a stable ID.

Potential controlled regions:

- menu drawer;
- glossary modal;
- resources modal;
- help overlay;
- accessibility modal;
- transcript panel.

This requires implementation planning because some controlled regions are separate modal components and some are inline conditional panels. It should not be added casually as part of a CSS migration.

### `aria-haspopup`

`aria-haspopup="dialog"` may be appropriate for buttons that open dialog/modal surfaces if the corresponding modal components expose suitable dialog semantics.

Potential candidates:

- Glossary;
- Resources;
- Help Guide;
- Accessibility.

The menu drawer may be closer to a disclosure/navigation drawer than a dialog, depending on the final modal semantics.

This depends on modal/accessibility UI review and should not be bundled into the first current-state CSS slice.

### `aria-pressed`

`aria-pressed` is appropriate for toggle buttons whose pressed state is the primary semantic state of the control.

Potential candidates:

- Captions, if treated as a true on/off toggle.
- Play/Pause and Audio, but they do not currently use `.is-active` and are out of scope for the bounded active/current sidebar CSS slice.

`aria-pressed` is less appropriate for modal/dialog launcher buttons because their active state means "this controlled surface is open," not "this option is pressed."

### Modal/Dialog Semantics

The modal-related buttons are coupled to overlay behavior:

- Menu uses an inline overlay/drawer in `CoursePlayerShell`.
- Help, Accessibility, Glossary, and Resources render separate overlay/modal components.

Modal/dialog semantics, focus management, labelling, close behavior, and escape/outside-click behavior need a separate modal/accessibility behavior review. This review should inform but not replace that later work.

## 4. Recommended Semantic Pattern

### Sidebar Tool Buttons That Open Modals or Drawers

Controls:

- Menu;
- Glossary;
- Resources;
- Help Guide;
- Accessibility.

Recommended future semantic pattern:

- Use `aria-expanded` to expose whether the controlled surface is open, if the implementation confirms these controls behave as expandable/disclosure/dialog launchers.
- Use `aria-controls` only if each controlled surface has a stable ID.
- Consider `aria-haspopup="dialog"` for true dialog/modal surfaces after modal semantics are reviewed.
- Do not use `aria-current`.
- Do not use `aria-pressed` as the default pattern for modal launchers.

Implementation dependency:

- Requires a separate React/accessibility implementation specification before code changes.
- Modal-related controls may also require modal accessibility review before final ARIA implementation.

### Transcript / Captions Button

Control:

- Captions.

Recommended future semantic pattern:

- Prefer `aria-expanded` plus `aria-controls` if the transcript panel is treated as a revealed controlled panel.
- `aria-pressed` may be acceptable if the project chooses to treat Captions as a pure on/off toggle, but that pattern should be chosen explicitly and consistently.
- Keep the existing visible `Captions: ON/OFF` text and dynamic label pattern or improve it through a behavior task.
- Do not use `aria-current`.

Implementation dependency:

- Requires a separate React/accessibility implementation specification before code changes.

### Buttons That Should Remain Out of Scope

Out of scope for the smallest active/current sidebar state slice:

- Play/Pause;
- Audio;
- Reload State;
- Return to LMS;
- header Previous/Next/Course buttons;
- menu drawer current screen buttons;
- roadmap/module completed, locked, current, and disabled states.

These controls either do not currently use `.is-active`, carry different media/danger/navigation semantics, or belong to a separate component/behavior area.

## 5. Blockers and Dependencies

Future CSS-only active/current implementation is not safe yet.

Reasons:

- `.is-active` combines modal/drawer open state and transcript panel visibility.
- Active sidebar buttons do not yet expose a documented accessible state pattern.
- Modal/dialog launchers and transcript disclosure controls may need different ARIA patterns.
- Modal/accessibility UI behavior may influence which ARIA relationships are correct.

CSS migration remains blocked until at least one of the following is approved:

- a React/accessibility implementation specification for sidebar active/current controls; or
- a decision that token value proposal may proceed as documentation-only while ARIA implementation remains a separate prerequisite before CSS.

This review recommends the second path: a documentation-only current-on-inverse token value proposal can proceed next because token values can be reviewed without changing behavior. However, CSS implementation must remain blocked until a separate React/accessibility implementation specification and any required modal behavior review are complete.

## 6. Design-System Rule

Visual active/current styling must not imply a semantic state that is not exposed to assistive technologies.

Current state must not rely on color alone. It should use a combination of surface, border, icon, text, or state label support where appropriate.

Focus-visible must remain visually distinct from current state and should remain higher priority when a current control receives keyboard focus.

Hover must remain temporary and must not be visually identical to persistent current state.

## 7. Recommended Next Step

Recommended next step: **A. documentation-only current-on-inverse token value proposal can proceed next, while React semantics remain a separate prerequisite before CSS.**

Rationale:

- The current-on-inverse token categories are already defined.
- The visual value proposal can be reviewed without editing token files, CSS, React, behavior, or modal logic.
- CSS implementation still must not proceed because accessible state semantics are not implemented or specified.
- A separate React/accessibility implementation specification should be created before any CSS migration task is approved.

Do not recommend Phase D CSS implementation yet.

## 8. Stop Conditions for Future Implementation

Future work must stop if:

- the active state would be visual-only;
- CSS would imply selected/current state without ARIA or equivalent semantics where needed;
- `.is-active` combines modal, transcript, and tool states in a way that cannot safely share one visual or semantic pattern;
- implementation would touch routing, progress, assessment, certificate logic, accessibility toolbar behavior, modal behavior, assets, content, or old HRBA files without separate approval;
- focus-visible would be obscured by current-state styling;
- active/current styling would reuse hover tokens or focus tokens;
- `aria-current` would be applied to sidebar tool buttons that are not route/page navigation;
- modal/dialog behavior questions would be solved inside a CSS task;
- token values or token files would be changed without a separate approved task.

## 9. Alignment Update Requirement

`docs/design-system-plan-progress-alignment.md` should record that this review note exists, that no CSS, token-file, React, or behavior implementation was done, that a documentation-only current-on-inverse token value proposal can proceed next, and that Phase D CSS remains blocked until a separate React/accessibility implementation specification and any required modal/accessibility behavior review are complete.
