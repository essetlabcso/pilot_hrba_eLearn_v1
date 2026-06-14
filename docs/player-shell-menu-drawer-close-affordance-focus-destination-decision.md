# Player Shell Menu Drawer Close Affordance and Focus Destination Decision

## 1. Purpose

This documentation-only decision resolves two blockers before any Menu drawer behavior implementation:

- whether a dedicated Menu drawer close affordance can be implemented without CSS or layout changes;
- where focus should move after a learner selects a screen from the Menu drawer.

This note does not implement React, ARIA, CSS, tokens, focus behavior, drawer behavior, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, or old HRBA file changes.

## 2. Scope

In scope:

- Menu drawer close affordance decision;
- Menu drawer post-screen-selection focus destination decision.

Out of scope:

- Menu launcher ARIA;
- Menu drawer behavior implementation;
- HelpOverlay;
- Glossary, Resources, and Accessibility modals;
- Captions/transcript;
- CSS and token work;
- routing, progress, assessment, certificate logic, and accessibility toolbar behavior;
- course screens, module CSS, assets, content files, and old HRBA files.

Phase D CSS remains blocked.

## 3. Current Menu Drawer Structure

Read-only source inspected:

- `src/components/player/CoursePlayerShell.tsx`
- `src/components/player/PlayerSidebar.tsx`
- `src/components/player/MainScreenCanvas.tsx`
- `src/styles/global.css`
- prior modal/drawer behavior documentation and alignment notes

Current structure:

- The Menu drawer renders inline in `CoursePlayerShell.tsx` when `state.activeModal === 'menu'`.
- The outer overlay is a fixed `div` with inline styles and `onClick={() => handleToggleModal(null)}`.
- The inner drawer panel is a child `div` with inline styles for width, height, background, border, padding, overflow, flex column layout, and gap.
- The drawer has a visible `h3` title: `Jump to Screen`.
- The drawer body contains a vertical list of screen buttons generated from `playerScreens`.
- Each screen button updates `currentScreenId` and then closes the drawer with `handleToggleModal(null)`.
- The current close methods are outside-click, selecting a screen, and toggling the sidebar Menu launcher while active.
- No dedicated close button exists inside the drawer.
- No existing drawer-internal button pattern exists that can be reused for a close button without creating new markup.
- The screen-list buttons have inline visual styles intended for navigation items, not for a close affordance.
- Adding a visible close button would require at least new markup and a placement decision. A polished, non-drifting close affordance would likely require new class names, CSS, or inline visual styling unless a separate design decision approves using plain unstyled text/button behavior.

The main learning content is rendered by `MainScreenCanvas` as:

- `main.player-main-content` with `aria-label="Course screen content"`;
- nested `.main-screen-canvas`;
- nested `.main-screen-canvas__content`.

The main landmark exists, but it is not currently focusable.

## 4. Close Affordance Decision

Decision: Option B - Not ready.

A dedicated close button should not be implemented yet because a no-CSS, no-layout-change path is not sufficiently clear.

Reasoning:

- The drawer title area currently contains only an `h3`.
- There is no existing close button pattern inside the Menu drawer.
- Reusing the screen-list button styling for a close affordance would mix navigation item styling with drawer control styling.
- Adding a close button before or beside `Jump to Screen` would need a header layout decision.
- Adding a close button after the title would be simpler structurally but still needs a visual treatment decision to avoid an unpolished or confusing control.
- Inline styling would violate the intent of avoiding local visual patches.

Required design/CSS decision:

- approve a drawer header pattern with title plus close control;
- define whether the close control is text-only, icon-only with accessible name, or icon plus text;
- define whether the control uses existing player shell button classes or needs a new drawer-specific class;
- define placement and tab order.

Recommended future placement if later approved:

- in the drawer header area adjacent to `Jump to Screen`;
- visually aligned to the far edge of the drawer header;
- in DOM order after the title if the title remains first, so initial focus can move to the drawer heading or first screen item before the close control only if that is deliberately chosen;
- or in DOM order before the screen list if the close button becomes the first interactive control.

Recommended visible label and accessible name if later approved:

- visible label: `Close menu`;
- accessible name: `Close menu`.

Menu behavior implementation remains blocked for any slice that requires a dedicated close button. A future behavior-only slice may proceed only if it does not add the close button, or if a separate close-affordance design/CSS decision approves the needed markup and styling boundary first.

## 5. Focus Destination After Screen Selection

Possible destinations assessed:

| Destination | Assessment |
| --- | --- |
| Current/new screen heading | Best learner orientation when a stable heading exists, but screen implementations vary and no single stable heading target was confirmed across all screens. |
| Main learning content container or stage landmark | Strongest stable target. `main.player-main-content` already exists and is labeled `Course screen content`, but it is not focusable yet. |
| Player stage/card container | Possible fallback, but less semantically useful than the main landmark. |
| Menu launcher button | Appropriate for ordinary drawer close, but confusing after screen selection because the learner expects to land in the newly selected screen. |
| No explicit focus movement | Safer than focusing a bad target, but inferior once a stable main content target can be made focusable. |

Decision:

- The safest future focus destination after screen selection is the existing `main.player-main-content` course content landmark.
- A future implementation may add a narrow ref plus `tabIndex={-1}` to that existing main landmark, then move focus there after the selected screen is rendered and the drawer closes.
- The target should preserve the existing accessible label `Course screen content`.
- This focus destination does not require routing, progress, assessment, certificate, or screen completion changes.
- It should not alter `currentScreenId` logic beyond the current screen-selection behavior.

Why this is appropriate:

- It is stable across screens because `MainScreenCanvas` wraps all rendered screens.
- It avoids relying on inconsistent screen-level heading structure.
- It orients keyboard and screen reader users to the newly selected learning area.
- It avoids returning focus to the Menu launcher after screen selection, which could imply the learner is still operating the drawer rather than the selected screen.

Implementation requirements for a future task:

- add focusability only to the existing main landmark or a stable equivalent;
- use programmatic focus after screen selection closes the drawer;
- do not make the main landmark part of the normal tab order;
- do not change routing, progress, assessment, certificate, content, or completion behavior.

## 6. No-Routing/Progress Decision

The future focus destination can be implemented without changing routing, progress, screen completion, assessment, certificate, or `currentScreenId` logic.

The existing screen selection already updates `currentScreenId` and closes the drawer. Future focus movement should run after that existing behavior and should not change what screen is selected, whether the learner progresses, or how completion is calculated.

If implementation cannot preserve that boundary, Menu drawer behavior implementation must stop.

## 7. Implementation Readiness Classification

Classification: PASS WITH CAUTION.

Rationale:

- The post-screen-selection focus destination is now clear: focus the existing `main.player-main-content` course content landmark after making it programmatically focusable in a narrow future task.
- Ordinary close focus return remains clear: return focus to the Menu launcher.
- The close button remains not ready without CSS/layout/design approval.
- Therefore, a future behavior implementation can proceed only if it excludes adding a dedicated close button, or if a separate close-affordance design/CSS decision is completed first.

## 8. Future Implementation Scope If PASS WITH CAUTION

Smallest future implementation slice:

- Menu drawer behavior only;
- no dedicated close button unless separately approved;
- Escape close;
- focus movement into drawer on open;
- focus containment if the drawer blocks the stage;
- focus return to the Menu launcher on ordinary close;
- focus movement to `main.player-main-content` after screen selection;
- preserve outside-click close;
- preserve screen selection behavior;
- no Menu launcher ARIA;
- no CSS;
- no tokens.

The future task may add a narrow ref and `tabIndex={-1}` to an existing stable focus target only if it does not change layout, styling, routing, progress, assessment, certificate logic, content, or course behavior.

## 9. Stop Conditions for Any Future Implementation

Stop if:

- close button implementation needs CSS or layout changes not approved here;
- focus destination after screen selection is changed away from the existing main course content landmark without a new decision;
- implementation would change routing, progress, `currentScreenId` logic beyond existing selection behavior, assessment, certificate logic, or content;
- focus containment requires a broad modal/drawer framework rewrite;
- Menu launcher ARIA is added in the behavior slice;
- HelpOverlay, modal dialogs, Captions/transcript, CSS, or token files would be touched;
- current-state CSS is proposed.

## 10. QA Plan for Future Implementation

Any future Menu drawer behavior implementation must include:

- `npm run build`;
- route QA on `/module-2/screen-2-2?completed=module_01_hrba_foundations`;
- viewport QA at `1440x900`, `768x900`, and `390x844`;
- keyboard open and close;
- Escape close;
- close button close only if separately approved;
- outside-click close if retained;
- focus movement into drawer;
- focus containment if required;
- focus return to Menu launcher on ordinary close;
- focus destination after screen selection;
- screen selection behavior unchanged;
- no CSS, token, modal, HelpOverlay, Captions/transcript, routing, progress, assessment, certificate, accessibility toolbar, asset, content, module CSS, or old HRBA changes.

## 11. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is a dedicated close affordance ready without CSS/layout changes? | No. |
| Is the close button placement clear? | Not fully. A drawer header pattern must be approved first. |
| Is the close button label/accessibility name clear? | Yes, if later approved: `Close menu`. |
| Is the post-screen-selection focus destination clear? | Yes. Use the existing `main.player-main-content` course content landmark after making it programmatically focusable in a narrow future task. |
| Can the focus destination be implemented without routing/progress changes? | Yes, if it only adds programmatic focus after the existing `currentScreenId` update and drawer close. |
| Is Menu drawer behavior implementation now PASS, PASS WITH CAUTION, or STOP? | PASS WITH CAUTION. |
| Is Menu launcher ARIA still separate? | Yes. |
| Are HelpOverlay and modal dialogs out of scope? | Yes. |
| Is Phase D CSS still blocked? | Yes. |

## 12. Recommended Next Task

Create a bounded Menu drawer behavior implementation task only if it explicitly excludes the dedicated close button, Menu launcher ARIA, CSS, tokens, HelpOverlay, modal dialogs, Captions/transcript, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, old HRBA files, and Phase D CSS.

If a dedicated close button is required before behavior implementation, create a separate documentation-only drawer close affordance design/CSS readiness note first.
