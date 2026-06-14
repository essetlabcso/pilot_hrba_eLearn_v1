# Player Shell Modal Accessibility Behavior Specification

## 1. Purpose

This documentation-only specification defines the expected accessibility behavior for player shell modal, overlay, and drawer surfaces before any launcher ARIA implementation or current-state CSS migration.

It follows `docs/player-shell-modal-drawer-behavior-review.md`, which found that modal launcher and Menu drawer ARIA are not ready for implementation and that Phase D current-state CSS remains blocked.

This document does not implement code, ARIA, CSS, tokens, focus behavior, modal behavior, or drawer behavior.

## 2. Scope

In scope:

- Glossary modal
- Resources modal
- Accessibility modal
- Help Guide / `HelpOverlay`
- Menu drawer

Out of scope:

- Captions/transcript, because that slice is already implemented and QA'd in `docs/player-shell-captions-transcript-accessibility-qa.md`
- current-state CSS
- token work
- course screens
- module CSS
- routing
- progress logic
- assessment logic
- certificate logic
- assets
- content files
- old HRBA files

## 3. Behavior Model Decision by Surface

| Surface | Future behavior model | Decision | Rationale |
| --- | --- | --- | --- |
| Glossary | Dialog/modal | Treat as a modal dialog. | It already uses `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, Escape close, outside-click close, close controls, and initial focus to the close button. |
| Resources | Dialog/modal | Treat as a modal dialog. | It follows the same modal pattern as Glossary and contains interactive resource controls, so dialog semantics and focus containment are appropriate. |
| Accessibility | Dialog/modal | Treat as a modal dialog with extra caution. | It already uses dialog semantics and initial focus, but because it supports accessibility guidance, focus behavior must be especially predictable. |
| Help Guide / `HelpOverlay` | Dismissible instructional overlay / coachmark, not yet a confirmed dialog | Defer dialog semantics until the overlay role is intentionally decided. | It is a full-screen instructional overlay with target callouts, global Enter-to-close behavior, no labelled root, and no initial focus movement. Treating it as a normal modal now would be premature. |
| Menu | Navigation drawer | Treat as a navigation drawer, not a route-current control. | It provides jump navigation inside a fixed overlay. It is not the current page itself and should not make the sidebar Menu button use `aria-current`. |

## 4. Required Accessible Structure

| Surface | Root role | `aria-modal` | Label/title | Stable root ID for future `aria-controls` | Close button label | Dynamic launcher label | `aria-haspopup="dialog"` |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Glossary | `role="dialog"` | Yes | Keep visible heading and `aria-labelledby`; title ID should remain stable. | Required before launcher `aria-controls`. Suggested category: glossary modal root ID. | Keep explicit `Close glossary`; footer close text should remain visible. | Should communicate open/close intent, for example open/close glossary. | Appropriate after focus return and containment behavior are specified. |
| Resources | `role="dialog"` | Yes | Keep visible heading and `aria-labelledby`; title ID should remain stable. | Required before launcher `aria-controls`. Suggested category: resources modal root ID. | Keep explicit `Close resources`; footer close text should remain visible. | Should communicate open/close resources list. | Appropriate after focus return and containment behavior are specified. |
| Accessibility | `role="dialog"` | Yes | Keep visible heading and `aria-labelledby`; title ID should remain stable. | Required before launcher `aria-controls`. Suggested category: accessibility modal root ID. | Improve close icon label in a future task if needed; current `Close modal` is understandable but less specific than `Close accessibility options`. | Should communicate open/close accessibility options. | Appropriate after focus return and containment behavior are specified. |
| Help Guide | Needs decision | Needs decision | Needs a labelled root if treated as a dialog; if treated as coachmark overlay, define an equivalent accessible label pattern. | Required before launcher `aria-controls`, but only after model is decided. | Visible dismissal button exists; future close label should be explicit if an icon/close affordance is added. | Should communicate open/close help guide only after role model is decided. | Defer. Do not apply until the overlay is confirmed as a dialog-like surface. |
| Menu | Drawer role/model needs decision; likely labelled navigation drawer or dialog-like drawer | Only if treated as modal dialog/drawer | Needs visible title with stable title ID, such as `Jump to Screen`. | Required before launcher `aria-controls`; should represent the drawer root. | Required. Add a dedicated visible close button in a future behavior implementation if the drawer remains overlay-like. | Should communicate open/close module menu. | Defer unless the drawer is implemented as a dialog-like modal drawer. |

## 5. Focus Behavior Requirements

| Surface | Move focus on open | Initial focus target | Trap or contain focus | Return focus on close | If launcher unavailable/unmounted | Current behavior sufficiency |
| --- | --- | --- | --- | --- | --- | --- |
| Glossary | Yes | Close button or first meaningful control; current close-button focus is acceptable as a first candidate. | Required if `aria-modal="true"` remains. | Required: return to the Glossary sidebar launcher when closed. | Return to sidebar container or a safe player-shell landmark/control. | Incomplete: initial focus exists, but focus trap and focus return are not documented/implemented. |
| Resources | Yes | Close button or first meaningful resource control; close-button focus is acceptable as a first candidate. | Required if `aria-modal="true"` remains. | Required: return to the Resources sidebar launcher when closed. | Return to sidebar container or a safe player-shell landmark/control. | Incomplete: initial focus exists, but focus trap and focus return are not documented/implemented. |
| Accessibility | Yes | Close button or first accessibility heading/control; close-button focus is acceptable as a first candidate. | Required if `aria-modal="true"` remains. | Required: return to the Accessibility sidebar launcher when closed. | Return to sidebar container or a safe player-shell landmark/control. | Incomplete: initial focus exists, but focus trap and focus return are not documented/implemented. |
| Help Guide | Required if treated as dialog; otherwise specify coachmark focus strategy. | If dialog-like, focus the primary dismissal button or labelled overlay container. | Required if treated as modal dialog; otherwise define whether background controls remain reachable. | Required: return to Help Guide launcher. | Return to sidebar container or a safe player-shell landmark/control. | Incomplete: no initial focus, no containment, no return behavior. |
| Menu | Yes if overlay drawer is keyboard-modal; otherwise specify navigation drawer focus policy. | Dedicated close button, drawer heading, or first screen-jump item depending on final drawer model. | Required if drawer blocks background interaction; otherwise containment requirements must be explicitly justified. | Required: return to Menu launcher unless a screen item was selected and route/state change makes another focus target more appropriate. | Return to sidebar container, current screen heading, or safe player-shell landmark/control. | Incomplete: no initial focus, no Escape close, no close button, no containment, no return behavior. |

## 6. Close Behavior Requirements

| Surface | Escape behavior | Outside-click behavior | Close button behavior | Item selection close | Enter-to-close | Risk notes |
| --- | --- | --- | --- | --- | --- | --- |
| Glossary | Should close. Current behavior matches this. | May remain if focus return and announcement behavior are handled. | Must remain explicit and keyboard reachable. | Not applicable. | Not needed globally. | Add focus return and containment before launcher ARIA. |
| Resources | Should close. Current behavior matches this. | May remain if focus return and announcement behavior are handled. | Must remain explicit and keyboard reachable. | Resource download buttons should not close the modal unless separately specified. | Not needed globally. | Placeholder download alert behavior is not part of this spec and should not be changed here. |
| Accessibility | Should close. Current behavior matches this. | May remain if focus return and announcement behavior are handled. | Must remain explicit and keyboard reachable. | Not applicable. | Not needed globally. | Close icon label should be reviewed for specificity in a future task. |
| Help Guide | Escape should close if overlay remains dismissible. | May remain, but only if the overlay model documents it. | Primary dismissal button should remain clear and keyboard reachable. | Not applicable. | Global Enter-to-close is risky because it may close while a learner expects Enter to activate a focused control. A future behavior task should review or replace it. | Role model and focus behavior are unresolved. |
| Menu | Escape should close if the drawer blocks or overlays the stage. | May remain if drawer model permits outside-click close. | A dedicated close button is recommended before ARIA implementation. | Screen selection should close the drawer after the selection is applied. | Not needed globally. | If selecting a screen closes the drawer, focus destination after selection must be defined. |

## 7. Launcher ARIA Readiness

| Launcher | `aria-expanded` | `aria-controls` | `aria-haspopup="dialog"` | Dynamic `aria-label` | Stable controlled-region ID | Readiness classification |
| --- | --- | --- | --- | --- | --- | --- |
| Glossary | Ready for implementation specification after focus return/trap behavior is specified. | Needs root ID decision first. | Ready for implementation specification after modal behavior spec. | Ready for implementation specification. | Needs root ID. | Needs behavior implementation first. |
| Resources | Ready for implementation specification after focus return/trap behavior is specified. | Needs root ID decision first. | Ready for implementation specification after modal behavior spec. | Ready for implementation specification. | Needs root ID. | Needs behavior implementation first. |
| Accessibility | Ready for implementation specification after focus return/trap behavior is specified. | Needs root ID decision first. | Ready for implementation specification after modal behavior spec. | Ready for implementation specification. | Needs root ID. | Needs behavior implementation first. |
| Help Guide | Needs additional decision. | Needs additional decision. | Needs additional decision. | Needs additional decision. | Needs model-specific root ID. | Needs additional decision. |
| Menu | Ready for implementation specification only after drawer model is confirmed. | Needs drawer root ID. | Needs additional decision; use only if dialog-like drawer. | Ready for implementation specification after drawer model. | Needs drawer root ID. | Needs drawer behavior implementation specification first. |

Because these surfaces are conditionally rendered, future `aria-controls` may need to be conditional while hidden, following the Captions/transcript pattern, unless a future task intentionally keeps the controlled surface mounted.

## 8. Menu Drawer Behavior Subsection

The Menu should be specified as a navigation drawer unless a future behavior task deliberately chooses a dialog-like drawer model.

Future Menu requirements:

- It should not use `aria-current` on the sidebar Menu button because the Menu button opens a navigation surface; it does not represent the current route.
- It should have a stable drawer root ID before launcher `aria-controls`.
- It should have a visible title with a stable title ID.
- It should have a dedicated visible close button if it remains overlay-like.
- Escape should close it if it blocks or overlays the stage.
- Focus should move into it on open.
- Focus should return to the Menu button on close unless a screen selection changes the learner's location and a different focus target is intentionally specified.
- Screen selection should close the drawer after applying the screen change.
- `aria-expanded` should reflect whether the drawer is open.
- `aria-controls` should be conditional while hidden if the drawer remains unmounted while closed.
- `aria-haspopup="dialog"` should be deferred unless the drawer is specified as a dialog-like modal drawer.

Menu remains blocked for ARIA implementation until a drawer behavior implementation specification defines these details.

## 9. HelpOverlay Behavior Subsection

The Help Guide should not automatically be treated as a standard modal dialog.

Future Help requirements:

- Decide whether Help is a dialog, coachmark overlay, dismissible instructional overlay, or another pattern.
- Review global Enter-to-close. It may be unsafe because Enter is also a standard activation key for focused controls.
- Define whether focus must move into the overlay on open. If background controls are visually blocked, focus should not remain behind the overlay.
- Escape close is acceptable for a dismissible overlay, but it is not sufficient by itself.
- A labelled root is needed if the surface is dialog-like; if not dialog-like, define an accessible naming and reading strategy.
- `aria-haspopup="dialog"` should be deferred until the behavior model is resolved.
- Focus return to the Help Guide launcher should be specified before launcher ARIA.

Help remains blocked for launcher ARIA and current-state CSS until its overlay model is resolved.

## 10. Future Implementation Order

Recommended future task order:

1. Documentation-only modal behavior implementation specification for Glossary, Resources, and Accessibility.
2. Documentation-only Menu drawer behavior implementation specification, or a combined specification with a clearly separate Menu drawer section.
3. Documentation-only HelpOverlay behavior classification/specification.
4. Bounded modal behavior implementation only after a specification is approved.
5. Bounded Menu drawer behavior implementation only after a specification is approved.
6. Bounded modal launcher ARIA implementation.
7. Bounded Menu drawer launcher ARIA implementation.
8. Token/CSS readiness review for active/current sidebar states.
9. Only later, current-state CSS implementation.

Each task should stay separate and bounded.

## 11. CSS Readiness Implication

`.player-sidebar-button.is-active` current-state CSS should not proceed after this specification alone.

Remaining blockers:

- Modal focus return and containment are specified here as requirements, but not implemented.
- Menu drawer behavior is specified at the expectation level, but not implemented.
- HelpOverlay behavior model remains deferred.
- Stable controlled-region IDs are not implemented.
- Launcher ARIA is not implemented.
- `.is-active` still mixes modal-open, drawer-open, and disclosure-open meanings.

A future CSS task may need narrower selector families or data attributes to distinguish dialog-open, drawer-open, disclosure-open, and route-current states. This document does not implement selectors or data attributes.

Phase D CSS remains blocked.

## 12. QA Plan for Future Implementation

Any future implementation task must include:

- `npm run build`;
- route QA on `/module-2/screen-2-2?completed=module_01_hrba_foundations`;
- desktop, tablet, and mobile viewport checks;
- keyboard navigation into launcher controls;
- focus movement on open;
- focus return on close;
- focus containment or trap verification where appropriate;
- Escape close verification;
- close button label verification;
- outside-click close verification if retained;
- DOM/ARIA checks for root role, title ID, root ID, `aria-modal`, `aria-expanded`, `aria-controls`, and `aria-haspopup` where scoped;
- confirmation that visible labels still match behavior;
- confirmation that no CSS, token, routing, progress, assessment, certificate, accessibility toolbar, asset, content, or old HRBA file changed unless explicitly scoped.

## 13. Stop Conditions

Future work must stop if:

- focus return cannot be defined;
- focus containment expectations are unclear;
- Help and Menu behavior models are unresolved;
- one ARIA pattern is used for both drawer and modal surfaces without justification;
- implementation would touch CSS, token files, routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, or old HRBA files outside the approved scope;
- work starts implementing behavior instead of specifying it.

## 14. Final Recommendation

The next safe step is not current-state CSS.

The next safe step is a documentation-only modal behavior implementation specification for Glossary, Resources, and Accessibility, with Menu drawer behavior either covered in a separate section or split into its own documentation-only drawer specification. HelpOverlay should remain deferred until its coachmark/dialog model is decided.
