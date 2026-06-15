# Player Shell HelpOverlay Behavior Implementation Specification

## Purpose

This documentation-only specification defines the future bounded behavior implementation requirements for the player shell Help Guide / `HelpOverlay`.

It follows:

- `docs/player-shell-help-overlay-behavior-classification.md`;
- `docs/player-shell-post-help-overlay-next-path-decision.md`;
- the current alignment status in `docs/design-system-plan-progress-alignment.md`.

This document does not implement React, ARIA, CSS, tokens, focus behavior, HelpOverlay behavior, routing, progress, assessment, certificate logic, screen completion, `currentScreenId` behavior, accessibility toolbar behavior, course screens, module CSS, assets, content, or old HRBA file changes.

## Scope

In scope for this specification:

- Help Guide / `HelpOverlay` behavior only;
- future focus movement on open;
- future focus containment while open;
- future focus return on close;
- future fallback focus target;
- future close behavior;
- future global Enter-to-close correction;
- future accessible root/title structure needed for later ARIA readiness;
- future QA requirements;
- stop conditions for any implementation task.

Out of scope:

- implementation in this task;
- CSS;
- token edits;
- current-state CSS;
- HelpOverlay visual redesign;
- Menu drawer behavior;
- Menu launcher ARIA;
- Glossary, Resources, and Accessibility modals;
- Captions/transcript;
- dedicated Menu drawer close button;
- routing, progress, assessment, certificate logic, screen completion, `currentScreenId` behavior, accessibility toolbar behavior, course screens, module CSS, assets, content, and old HRBA files;
- active/current CSS, selected/current icon CSS, disabled, completed, locked, danger, progress strip, shell shadow, global focus, course-screen states, and module-specific states.

## Baseline

Current source inspection and prior classification show:

- `CoursePlayerShell.tsx` renders `HelpOverlay` only when `state.activeModal === 'help'`;
- the sidebar `Help Guide` button opens it through `onToggleModal('help')`;
- the Help launcher receives `.player-sidebar-button is-active` when open, but no Help-specific ARIA attributes;
- `HelpOverlay.tsx` closes on Escape, global Enter, overlay click, and the visible `Got it! Start Learning` button;
- the overlay has no root role, no `aria-modal`, no stable root ID, no stable title ID, and no labelled relationship;
- focus does not move into the overlay on open;
- focus is not contained inside the overlay;
- focus does not explicitly return to the Help Guide launcher on close;
- HelpOverlay does not change routing, progress, assessment, certificate logic, screen completion, `currentScreenId`, accessibility toolbar behavior, course content, assets, or old HRBA files.

## Behavior Model

Future implementation should treat HelpOverlay as a **blocking coachmark/tutorial overlay with modal-like keyboard behavior**.

This means:

- it remains conceptually different from Glossary, Resources, and Accessibility content modals;
- it may use dialog-like behavior if it continues to visually block the player;
- background player controls should not remain keyboard-reachable while the overlay is open;
- Escape should close the overlay;
- the visible dismissal button should remain the primary close action;
- focus should move into the overlay on open and return to the Help Guide launcher on close.

Do not treat HelpOverlay as:

- route/current navigation;
- a passive tooltip;
- a standard content modal identical to Glossary/Resources/Accessibility;
- a reason to apply broad `.player-sidebar-button.is-active` current-state CSS.

## Future Implementation Slice

Recommended future implementation slice:

**Bounded HelpOverlay behavior implementation only**

Allowed future implementation files, if separately approved:

- `src/components/player/HelpOverlay.tsx`;
- `src/components/player/CoursePlayerShell.tsx`;
- `src/components/player/PlayerSidebar.tsx` only if a Help launcher ref or focus return plumbing is required.

Files that must remain untouched in that future slice unless separately approved:

- `src/styles/global.css`;
- `src/system/tokens/tokens.css`;
- `src/system/tokens/tokens.ts`;
- Glossary, Resources, Accessibility, Captions/transcript, Menu drawer, course screens, module CSS, routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, and old HRBA files.

The future slice should not implement HelpOverlay launcher ARIA unless the task explicitly includes ARIA and the readiness criteria below have been met.

## Focus Behavior Requirements

Future behavior implementation should:

- store or identify the Help Guide launcher before opening the overlay;
- move focus into HelpOverlay after it opens;
- use the visible `Got it! Start Learning` button as the preferred initial focus target;
- allow a labelled overlay container or visible heading as a fallback only if it is intentionally made programmatically focusable;
- contain Tab and Shift+Tab within HelpOverlay while it is open;
- return focus to the Help Guide launcher on ordinary close;
- use a safe fallback if the launcher is unavailable.

Recommended fallback order:

1. Help Guide launcher button;
2. first player sidebar tool button;
3. `main.player-main-content`, only if returning to course content is more appropriate and remains programmatically focusable.

Focus behavior must not:

- move focus to a hidden or non-rendered element;
- leave keyboard focus behind the visually blocking overlay;
- trap focus if there are no focusable elements without providing a programmatically focusable fallback;
- change routing, progress, assessment, certificate logic, screen completion, or `currentScreenId`.

## Close Behavior Requirements

Future behavior implementation should support:

- Escape close;
- primary button close using the visible `Got it! Start Learning` button;
- outside-click close only if focus return remains reliable and QA verifies it;
- close through the Help launcher toggle only if existing launcher behavior is preserved.

Future behavior implementation should correct global Enter-to-close.

Required decision:

- remove or stop using a global `window` Enter listener for HelpOverlay dismissal;
- rely on native button activation when focus is on the visible dismissal button;
- if any non-button Enter shortcut is retained, it must be scoped to a clearly focused overlay element and justified in the QA note.

Global Enter-to-close must not remain as an unscoped window-level close behavior in an implementation-bound task.

## Accessible Structure Requirements

Future implementation should prepare structure for later ARIA readiness:

| Area | Future requirement |
| --- | --- |
| Root ID | Add or plan a stable HelpOverlay root ID, such as `player-help-overlay`, if ARIA readiness will follow. |
| Title ID | Add or plan a stable title ID for `Focused Course Player Guide`, such as `player-help-overlay-title`. |
| Description ID | Add or plan a stable description ID for the central explanatory copy if used as `aria-describedby`. |
| Root role | If the overlay remains blocking and focus-contained, future ARIA readiness may use `role="dialog"`. |
| `aria-modal` | Use only after focus containment is implemented and QA passed. |
| Launcher `aria-expanded` | Not part of the behavior implementation unless separately approved. |
| Launcher `aria-controls` | Not ready until a stable mounted HelpOverlay root ID exists and mounted/unmounted behavior is decided. |
| `aria-haspopup` | Defer until dialog-like semantics are explicitly approved. |
| `aria-current` | Do not use; Help Guide is not route/current navigation. |

The behavior implementation may add IDs only if the scoped task explicitly permits structural preparation. ARIA attributes should remain a later readiness or implementation task unless separately approved.

## Current-State CSS Implication

Future HelpOverlay behavior implementation does not make current-state CSS ready.

Broad `.player-sidebar-button.is-active` remains unsafe because it mixes:

- dialog-open;
- drawer-open;
- coachmark-open;
- disclosure-open;
- possible route-current or screen-current states.

Current-state CSS should remain blocked until a separate readiness note defines a narrower selector strategy and confirms accessible semantics.

## Future QA Requirements

Any future implementation task should include:

- `npm run build`;
- route QA on `/module-2/screen-2-2?completed=module_01_hrba_foundations` or the current approved player route;
- desktop, tablet, and mobile checks, preferably `1440x900`, `768x900`, and `390x844`;
- keyboard open from the Help Guide launcher;
- focus movement into HelpOverlay on open;
- initial focus target verification;
- Tab and Shift+Tab containment;
- Escape close;
- visible dismissal button close;
- outside-click close if retained;
- focus return to the Help Guide launcher on close;
- fallback focus behavior if the launcher is unavailable;
- verification that global Enter-to-close is removed or safely scoped;
- regression check that Menu drawer, Menu launcher ARIA, Glossary, Resources, Accessibility, and Captions/transcript behavior remain unchanged;
- confirmation that no CSS, token files, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, or old HRBA files changed.

## Stop Conditions

Future implementation must stop if:

- the task requires CSS or token changes;
- focus return to the Help Guide launcher cannot be defined;
- focus containment would require a broad modal framework rewrite;
- global Enter-to-close cannot be safely removed or scoped;
- the implementation would change Menu drawer behavior or Menu launcher ARIA;
- the implementation would touch Glossary, Resources, Accessibility, Captions/transcript, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, or old HRBA files;
- the task tries to implement HelpOverlay ARIA before root/focus behavior is implemented and QA'd;
- the task proposes broad `.player-sidebar-button.is-active` current-state CSS;
- the task combines HelpOverlay behavior implementation with broader state migration.

## Readiness Decision

Result: **Ready for a future bounded behavior implementation task after review**.

Ready:

- documentation-only behavior requirements are defined;
- the next future implementation can be scoped to HelpOverlay focus and close behavior only.

Not ready:

- HelpOverlay launcher ARIA;
- HelpOverlay CSS;
- current-state CSS;
- token changes;
- broader Phase D states.

## Recommended Next Step

After this specification is reviewed, the next controlled step may be:

**Implement bounded HelpOverlay focus and close behavior only**

That future implementation must:

- edit only separately approved React files;
- not edit CSS or token files;
- not implement launcher ARIA unless separately approved;
- not touch Menu, modal dialogs, Captions/transcript, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, or old HRBA files;
- include build and route QA.

Phase D CSS remains blocked.
