# Player Shell Menu Drawer Behavior QA

## Summary

Branch: `system/hrba-clean-foundation`

Source decision document: `docs/player-shell-menu-drawer-close-affordance-focus-destination-decision.md`

Result: PASS

This QA verifies the bounded Menu drawer behavior implementation. The implementation stayed within the PASS WITH CAUTION guardrails: Menu drawer behavior only, no dedicated close button, no Menu launcher ARIA, no CSS, no token work, and no routing/progress/assessment/certificate/content changes.

## Files Changed

- `src/components/player/CoursePlayerShell.tsx`
- `src/components/player/PlayerSidebar.tsx`
- `src/components/player/MainScreenCanvas.tsx`

Documentation created:

- `docs/player-shell-menu-drawer-behavior-qa.md`

## Exact Behavior Changes Made

- Added Menu-specific Escape close while the Menu drawer is open.
- Added focus movement into the Menu drawer on open.
- Added Menu-specific Tab and Shift+Tab focus containment while the drawer is open.
- Added focus return to the Menu launcher after ordinary close.
- Added post-screen-selection focus movement to the existing `main.player-main-content` landmark.
- Made the existing `main.player-main-content` landmark programmatically focusable with `tabIndex={-1}` while preserving `aria-label="Course screen content"`.
- Passed a ref to the existing Menu launcher button so ordinary close can return focus safely.

No helper or hook was created. The implementation stayed local to the existing player shell files because the existing modal focus hook always returns focus to the launcher, while Menu screen selection needs focus to move to the main course content landmark.

## Build Result

Command: `npm run build`

Result: PASS

Notes:

- TypeScript build passed.
- Vite production build passed.
- Existing Vite large-chunk warning appeared.

## Route and Viewport QA

Route checked:

- `/module-2/screen-2-2?completed=module_01_hrba_foundations`

Viewports checked with local browser automation:

- `1440x900`
- `768x900`
- `390x844`

## Behavior QA Results

| Check | Result |
| --- | --- |
| Keyboard can open Menu drawer | PASS |
| Focus moves into drawer on open | PASS. Focus moved to the visible `Jump to Screen` heading with `tabIndex="-1"`. |
| Tab containment | PASS. `Tab` remained inside the drawer. |
| Shift+Tab containment | PASS. `Shift+Tab` remained inside the drawer. |
| Escape close | PASS. Escape closed the drawer at all checked viewports. |
| Ordinary close focus return | PASS. Escape close and launcher toggle close returned focus to the Menu launcher. |
| Outside-click close | PASS where an exposed overlay area exists at desktop and tablet sizes. On mobile, the existing drawer geometry leaves no exposed overlay area; this is a pre-existing layout limitation, not a behavior regression. The outside-click handler remains preserved in source. |
| Launcher toggle close | PASS. Toggling the Menu launcher still opens and closes the drawer. |
| Screen selection closes drawer | PASS. |
| Screen selection focus destination | PASS. Focus moved to `main.player-main-content`. |
| Main landmark label | PASS. `aria-label="Course screen content"` remains on `main.player-main-content`. |
| Main landmark tab order | PASS. `tabIndex="-1"` makes the landmark programmatically focusable without adding it to normal tab order. |

## Screen Selection Behavior Check

Selecting a screen from the drawer still:

- updates `currentScreenId` using the existing screen selection behavior;
- closes the drawer;
- does not unlock screens;
- does not complete screens;
- does not change route logic;
- does not change routing, progress, assessment, certificate logic, screen completion, or content behavior.

After screen selection, focus moves to `main.player-main-content`.

## Guardrail Confirmation

Confirmed:

- no CSS files changed;
- no token files changed;
- no dedicated close button was added;
- no Menu launcher ARIA was added;
- no `aria-expanded`, `aria-controls`, `aria-haspopup`, `aria-current`, or dynamic launcher labels were added to the Menu button;
- `GlossaryModal`, `ResourcesModal`, and `AccessibilityModal` were not changed;
- HelpOverlay was not changed;
- Captions/transcript was not changed;
- routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content files, and old HRBA files were not changed;
- active/current CSS, selected/current icon CSS, disabled, completed, locked, danger, progress strip, shell shadow, global focus, course-screen states, and module-specific states were not implemented;
- Phase D CSS remains blocked.

## Recommended Next Step

Create an independent Menu drawer behavior evaluation task before Menu launcher ARIA, dedicated close button work, CSS, tokens, HelpOverlay work, or broader state migration.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Did the implementation stay Menu drawer behavior-only? | Yes. |
| Was no dedicated close button added? | Yes. |
| Were CSS and token files untouched? | Yes. |
| Was Menu launcher ARIA not added? | Yes. |
| Did Escape close pass? | Yes. |
| Did focus move into the drawer on open? | Yes. |
| Did focus containment pass or was it clearly documented as unnecessary? | Yes, focus containment passed. |
| Did ordinary close return focus to the Menu launcher? | Yes. |
| Did screen selection move focus to `main.player-main-content`? | Yes. |
| Did screen selection preserve `currentScreenId`, routing, progress, assessment, certificate, completion, and content behavior? | Yes. It preserved existing `currentScreenId` selection behavior and did not change routing, progress, assessment, certificate, completion, or content behavior. |
| Were HelpOverlay, modal dialogs, and Captions/transcript untouched? | Yes. |
| Is it safe to move to an independent Menu drawer behavior evaluation task? | Yes. |
| Does Phase D CSS remain blocked? | Yes. |
