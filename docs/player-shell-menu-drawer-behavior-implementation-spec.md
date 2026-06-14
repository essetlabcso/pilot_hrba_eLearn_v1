# Player Shell Menu Drawer Behavior Implementation Specification

## 1. Purpose

This documentation-only specification prepares Menu drawer behavior implementation only.

It follows the completed Glossary, Resources, and Accessibility modal behavior slices:

- Slice 1 modal focus return and focus containment passed QA.
- Slice 2 stable modal root ID and launcher ARIA passed QA.
- Slice 2 independent evaluation passed.

This document does not implement React, ARIA, CSS, tokens, drawer behavior, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, or old HRBA file changes.

## 2. Scope

In scope:

- Menu drawer behavior readiness only.

Out of scope:

- Glossary modal
- Resources modal
- Accessibility modal
- HelpOverlay
- Captions/transcript
- CSS
- token files
- routing
- progress logic
- assessment logic
- certificate logic
- accessibility toolbar behavior
- course screens
- module CSS
- assets
- content files
- old HRBA files
- active/current CSS
- selected/current icon CSS
- disabled, completed, locked, danger, progress strip, shell shadow, global focus, course-screen states, and module-specific states

Phase D CSS remains out of scope and blocked.

## 3. Current Menu Drawer Behavior Inventory

Read-only source inspected:

- `src/components/player/CoursePlayerShell.tsx`
- `src/components/player/PlayerSidebar.tsx`
- prior modal/drawer behavior documentation and QA notes

| Behavior area | Current finding |
| --- | --- |
| Where rendered | Inline in `CoursePlayerShell.tsx` when `state.activeModal === 'menu'`. |
| How opened | Sidebar `Menu` button in `PlayerSidebar.tsx` calls `onToggleModal('menu')` through the shared learning tools map. |
| How closed | Closed by outer overlay click, by selecting a screen, or by toggling the Menu launcher while active. |
| Outside-click close | Exists. The outer fixed overlay has `onClick={() => handleToggleModal(null)}`. |
| Escape close | No Menu-specific Escape close was found in the inspected source. |
| Dedicated close button | No dedicated close button was found. |
| Focus moves into drawer on open | No focus movement into the drawer was found. |
| Focus contained while open | No focus containment/trap was found. |
| Focus returns to Menu launcher on close | No explicit focus return behavior was found. |
| Screen selection behavior | Screen buttons call `onChangeState(prev => ({ ...prev, currentScreenId: screen['Screen/State ID'] }))`, then `handleToggleModal(null)`. |
| Screen selection closes drawer | Yes. Screen selection closes the drawer after setting `currentScreenId`. |
| Routing/progress logic touched by current screen selection | Current drawer selection appears to update `currentScreenId` only. No routing, progress, assessment, or certificate logic changes were identified in this inspection. |

The current drawer uses inline styles for the overlay, drawer panel, title, and screen buttons. This specification does not approve CSS or layout changes.

## 4. Future Behavior Model Decision

Menu should be classified as a navigation drawer.

It is not:

- a modal dialog equivalent to Glossary, Resources, or Accessibility;
- a route-current control;
- a course progress state;
- a current screen indicator by itself.

The sidebar Menu launcher must not use `aria-current`, because it opens a navigation surface and does not represent the current route or current screen.

The drawer visually overlays and intercepts the learning stage. Because it blocks normal stage interaction while open, a future behavior implementation likely needs focus movement into the drawer and focus containment while the drawer is open. However, the exact focus containment implementation should remain blocked until the close affordance and screen-selection focus destination are decided.

## 5. Future Implementation Requirements

A future bounded Menu drawer behavior implementation should eventually define or implement:

- stable drawer root ID, suggested: `player-menu-drawer`;
- stable drawer title ID, suggested: `player-menu-drawer-title`;
- preserved visible drawer title, currently `Jump to Screen`;
- dedicated close button if it can be added without CSS or layout changes;
- Escape close;
- outside-click close if retained;
- focus movement into the drawer on open;
- focus containment if the drawer continues to block/intercept the stage;
- focus return to the Menu launcher on ordinary close;
- defined focus destination after screen selection;
- preserved screen selection behavior;
- no routing or progress logic changes;
- no Menu launcher ARIA in the behavior slice unless separately approved later.

The future behavior slice should not include:

- Menu launcher `aria-expanded`;
- Menu launcher `aria-controls`;
- Menu launcher `aria-haspopup`;
- Menu launcher dynamic label changes;
- current-state CSS;
- token changes;
- visual redesign.

## 6. Close Button and CSS Risk Decision

Current state:

- The drawer has no dedicated close button.
- Existing close paths are outside-click, screen selection, and toggling the Menu launcher.

Risk decision:

- A dedicated close button is desirable for keyboard and screen reader clarity.
- Adding a close button may require layout, placement, visual styling, and responsive treatment decisions.
- Because this task does not approve CSS or layout changes, close-button implementation is blocked until a separate bounded close-affordance decision confirms whether it can use existing button patterns without new CSS or visual drift.

This specification does not approve CSS.

## 7. Screen Selection Focus Destination

Current state:

- Selecting a screen updates `currentScreenId` and closes the drawer.
- No explicit post-selection focus destination was found.

Recommended future focus destination:

- Prefer moving focus to a stable, existing main learning content target for the newly selected screen, such as a main screen heading, main screen canvas landmark/container, or another existing focusable player-shell target.
- Do not change routing or progress behavior to create this focus destination.

Readiness decision:

- The exact destination is not clear from the approved inspection scope.
- Menu behavior implementation is therefore not ready.
- A separate documentation-only focus destination decision is needed before implementation.

## 8. Future QA Plan

Any later Menu drawer behavior implementation must include:

- `npm run build`;
- route QA on `/module-2/screen-2-2?completed=module_01_hrba_foundations`;
- desktop, tablet, and mobile checks at `1440x900`, `768x900`, and `390x844`;
- keyboard open and close;
- Escape close;
- close button close if added;
- outside-click close if retained;
- focus movement into drawer;
- focus containment if required;
- focus return to Menu launcher on ordinary close;
- screen selection close behavior and focus destination;
- confirmation that no CSS, token, modal, HelpOverlay, Captions/transcript, routing, progress, assessment, accessibility toolbar, asset, content, or old HRBA changes were made.

## 9. Stop Conditions

Future work must stop if:

- close button implementation would require CSS or layout changes;
- focus destination after screen selection is unclear;
- focus containment would require a broad drawer/modal framework rewrite;
- implementation would require routing or progress changes;
- Menu drawer is forced into the same pattern as modal dialogs without justification;
- launcher ARIA is mixed into the behavior implementation slice;
- current-state CSS is proposed;
- HelpOverlay, modal dialogs, Captions/transcript, tokens, or course-screen behavior are pulled into the task.

## 10. Recommendation

STOP.

Menu drawer behavior implementation is not ready.

Blockers:

- no dedicated close-button implementation path is approved without CSS/layout risk;
- focus destination after screen selection is unclear;
- focus containment requirements need a bounded drawer-specific implementation plan;
- Menu launcher ARIA must remain separate from the behavior slice.

Recommended next task:

Create a documentation-only Menu drawer close affordance and focus destination decision. That decision should determine whether a no-CSS close button path is acceptable and identify a safe existing focus destination after screen selection.

Menu launcher ARIA remains separate.

HelpOverlay remains deferred.

Phase D CSS remains blocked.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is Menu drawer behavior implementation ready? | No |
| Can the recommended implementation be done without CSS? | Not confirmed; close button placement may require CSS/layout decisions. |
| Is the focus return target clear? | Yes for ordinary close: return focus to the Menu launcher. |
| Is the focus destination after screen selection clear? | No |
| Are routing and progress changes unnecessary? | Yes, current screen selection appears to require only the existing `currentScreenId` update. |
| Is Menu launcher ARIA still separate? | Yes |
| Are HelpOverlay and modal dialogs out of scope? | Yes |
| Is Phase D CSS still blocked? | Yes |
