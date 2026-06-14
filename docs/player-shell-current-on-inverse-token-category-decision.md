# Player Shell Current-On-Inverse Token Category Decision

## 1. Purpose

This documentation-only decision follows `docs/player-shell-navigation-state-implementation-readiness.md` and prepares the next Phase D decision point for player shell navigation states.

It decides the semantic token categories needed for persistent active/current states on inverse player shell surfaces before any CSS migration.

This document is not:

- a token value proposal;
- a token-file implementation;
- a CSS implementation;
- a React behavior change;
- approval to migrate active/current styles.

## 2. State Distinction

Active/current state is a persistent state. It tells the learner that a player shell tool is currently open, visible, or selected.

It is different from:

- **hover**, which is a temporary pointer affordance;
- **focus-visible**, which shows keyboard location;
- **selected/current icon**, which reinforces active/current state but must not be the only cue;
- **disabled**, which communicates unavailable controls;
- **locked**, which communicates access rules;
- **completed**, which communicates progress status;
- **danger**, which communicates exit or destructive/leave context;
- **modal/accessibility UI**, which requires behavior-sensitive dialog review.

The existing hover-on-dark tokens must not be reused for active/current state. Hover is transient; active/current is persistent.

The existing focus-visible token must not be reused for active/current state. Focus is a keyboard navigation affordance; active/current is a selection/open-state affordance.

## 3. In-Scope State

The only in-scope future state family for this decision is bounded player sidebar active/current tool state.

Potential future selector families:

- `.player-sidebar-button.is-active`
- `.player-sidebar-button.is-active .player-sidebar-icon`

This scope covers player sidebar tool buttons that show an open tool/modal or visible transcript state.

Out of scope:

- header navigation buttons;
- return and exit controls;
- menu drawer active screen state;
- roadmap/module cards;
- progress strip;
- disabled states;
- locked states;
- completed states;
- danger states;
- modal/accessibility UI styles;
- global focus;
- course-screen states;
- module-specific styles.

## 4. Recommended Semantic Token Categories

These categories are recommended for future token specification. No values are assigned here.

| Category | Purpose | Allowed use | Prohibited use | Readiness |
| --- | --- | --- | --- | --- |
| current-on-inverse surface | Persistent active/current surface on dark player shell controls. | Button-level active/current state on inverse shell surfaces. | Hover, focus, disabled, danger, modal, or course-screen state. | Needs value proposal and contrast testing. |
| current-on-inverse border | Persistent active/current border on dark player shell controls. | Button-level active/current border where a non-color shape cue is needed. | Base shell border, hover border, focus outline, or danger border. | Needs value proposal and high-contrast mapping. |
| current-on-inverse text/icon | Optional text/icon treatment if existing inverse text tokens are not sufficient. | Only if contrast or affordance testing proves a separate token is needed. | Routine text color changes, hover text, danger text, or muted text. | Prefer existing inverse text tokens unless testing requires otherwise. |
| current-icon-on-inverse surface | Icon reinforcement for active/current sidebar tool state. | `.player-sidebar-button.is-active .player-sidebar-icon` only after button-level state is defined. | Icon-only current cue, hover icon, danger icon, or unrelated badge state. | Needs value proposal and must remain secondary to button-level state. |
| current-icon-on-inverse foreground | Optional foreground for active/current icon treatment. | Only if the current icon surface needs a distinct readable foreground. | Base icon text, hover text, focus outline, or danger text. | Needs contrast testing if used. |
| high-contrast current-on-inverse surface | High-contrast equivalent of active/current surface. | High-contrast mode current state on inverse shell controls. | Default-mode hover, focus, danger, disabled, or modal state. | Required before CSS implementation. |
| high-contrast current-on-inverse border | High-contrast equivalent of active/current border. | High-contrast mode current state border/non-color support. | Default-mode border, focus outline, or link/action token. | Required before CSS implementation. |
| high-contrast current-icon mapping | High-contrast equivalent for current icon treatment. | Only if current icon tokens are implemented. | Icon-only state cue or unrelated status icon. | Required if current icon treatment is implemented. |

## 5. Existing Token Assessment

Existing inverse surface and border tokens are structural tokens. They define shell and sidebar base surfaces and separators. They should not become active/current state tokens.

Existing hover-on-inverse tokens are state tokens, but they are for temporary pointer hover only. Reusing them for active/current would make persistent current state look like hover and would weaken learner orientation.

Existing focus-on-dark tokens are for keyboard focus only. Reusing focus styling for active/current would blur the difference between "this control has keyboard focus" and "this tool is currently open."

Existing action and accent tokens may be useful candidates for current icon or accent treatment only after contrast, high-contrast, and visual hierarchy review. They are not approved as current-state values by this decision.

## 6. Accessibility Semantics Decision

CSS-only active/current implementation is not safe while accessible state semantics remain unresolved.

The current player sidebar uses `.is-active` visually when:

- a learning tool modal is open; or
- the transcript panel is visible.

The inspected sidebar buttons have dynamic labels and visible text, but the active/current state is not yet documented as an accessible state pattern. Before CSS implementation, the project should decide whether these buttons should expose state using a pattern such as:

- `aria-pressed` for toggle-like controls;
- `aria-expanded` when a button opens an associated disclosure/modal/panel;
- another accessible disclosure/dialog relationship if the modal structure requires it.

`aria-current` is not recommended for these sidebar tool buttons because they are not page or route navigation items. It may be relevant for the menu drawer current screen state, but that is explicitly out of scope for this decision.

This creates a behavior/accessibility review blocker for CSS migration. React and behavior files must not be edited in this task.

## 7. High-Contrast Decision

High-contrast current-state mapping must be defined before any active/current CSS implementation.

The high-contrast mapping must ensure:

- current state remains distinct from focus-visible;
- current state remains distinct from hover;
- current icon treatment does not become the only cue;
- current state remains readable against high-contrast dark surfaces;
- high-contrast focus remains visually higher priority than current state.

This document does not assign high-contrast values or implement high-contrast selectors.

## 8. Recommended Next Step

The semantic token categories are now defined enough for review, but active/current CSS implementation should remain blocked.

Recommended next controlled step:

Create a documentation-only active/current sidebar accessibility and behavior semantics review before any token value proposal or CSS migration.

That review should decide the accessible state pattern for active sidebar tool buttons and transcript visibility, including whether `aria-pressed`, `aria-expanded`, or another relationship is appropriate.

Only after that review should the project create a current-on-inverse token value proposal.

## 9. Stop Conditions

Future work must stop if:

- active/current implementation would reuse hover tokens;
- active/current implementation would reuse focus tokens;
- current state would rely on color alone;
- high-contrast current-state mapping is undefined;
- accessible state semantics are unresolved;
- `.is-active` selector boundaries are mixed with danger, disabled, locked, completed, modal, progress strip, menu drawer, roadmap, course-screen, or module-specific selectors;
- implementation would require routing, progress, locking, assessment, certificate, modal, accessibility toolbar, asset, content, or old HRBA file changes;
- implementation would change React behavior without a separate approved behavior task.

## 10. Alignment Update Requirement

`docs/design-system-plan-progress-alignment.md` should record that this decision note exists, that no CSS/token-file/React/behavior implementation was done, that Phase D CSS remains blocked, and that the next step should be a documentation-only active/current sidebar accessibility and behavior semantics review before token value proposal or CSS migration.
