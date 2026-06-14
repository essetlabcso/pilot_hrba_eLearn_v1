# Player Shell Menu Drawer Launcher ARIA QA

## Summary

Branch: `system/hrba-clean-foundation`

Source readiness note: `docs/player-shell-menu-drawer-launcher-aria-readiness.md`

Result: PASS

This QA verifies the bounded Menu drawer launcher ARIA implementation. The implementation stayed limited to Menu launcher ARIA plus the stable mounted Menu drawer root ID required for `aria-controls`.

## Files Changed

Implementation files changed:

- `src/components/player/PlayerSidebar.tsx`
- `src/components/player/CoursePlayerShell.tsx`

Documentation created:

- `docs/player-shell-menu-drawer-launcher-aria-qa.md`

No CSS files, token files, modal dialog components, HelpOverlay, Captions/transcript, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, or old HRBA files changed.

## Exact ARIA and ID Changes

Added stable mounted drawer root ID:

- `id="player-menu-drawer"` on the mounted Menu drawer panel in `CoursePlayerShell.tsx`.

Added Menu launcher ARIA in `PlayerSidebar.tsx`:

- `aria-expanded={false}` when the Menu drawer is closed.
- `aria-expanded={true}` when the Menu drawer is open.
- `aria-controls="player-menu-drawer"` only when the Menu drawer is open/mounted.
- Dynamic accessible label:
  - closed: `Open module menu`
  - open: `Close module menu`

Explicit exclusions confirmed:

- no `aria-current` added;
- no `aria-haspopup` added;
- visible label `Menu` unchanged;
- no dedicated close button added.

## Build Result

Command: `npm run build`

Result: PASS

Notes:

- TypeScript build passed.
- Vite production build passed.
- Existing plugin timing notice appeared.
- Existing Vite large-chunk warning appeared.

## Route and Viewport QA

Route checked:

- `/module-2/screen-2-2?completed=module_01_hrba_foundations`

Viewports checked with local browser automation:

- `1440x900`
- `768x900`
- `390x844`

## DOM and ARIA Checks

| Check | Desktop 1440x900 | Tablet 768x900 | Mobile 390x844 |
| --- | --- | --- | --- |
| Closed Menu launcher has `aria-expanded="false"` | PASS | PASS | PASS |
| Closed Menu launcher omits `aria-controls` while drawer is unmounted | PASS | PASS | PASS |
| Closed accessible label is `Open module menu` | PASS | PASS | PASS |
| Open Menu launcher has `aria-expanded="true"` | PASS | PASS | PASS |
| Open Menu launcher has `aria-controls="player-menu-drawer"` | PASS | PASS | PASS |
| Open drawer panel has `id="player-menu-drawer"` | PASS | PASS | PASS |
| Open accessible label is `Close module menu` | PASS | PASS | PASS |
| `aria-current` is absent | PASS | PASS | PASS |
| `aria-haspopup` is absent | PASS | PASS | PASS |
| Visible label remains `Menu` | PASS | PASS | PASS |

## Behavior Regression Checks

| Check | Result |
| --- | --- |
| Keyboard can open the Menu drawer | PASS |
| Focus still moves into the drawer on open | PASS. Focus moved to the visible `Jump to Screen` heading with `tabIndex="-1"`. |
| Tab remains contained inside the drawer | PASS |
| Shift+Tab remains contained inside the drawer | PASS |
| Escape still closes the drawer | PASS |
| Ordinary launcher toggle close still returns focus to the Menu launcher | PASS |
| Outside-click close remains preserved | PASS where exposed overlay area exists at desktop and tablet sizes. On mobile, existing drawer geometry leaves no useful exposed overlay area; the source handler remains preserved and this condition is unchanged. |
| Selecting a screen still closes the drawer | PASS |
| Selecting a screen still moves focus to `main.player-main-content` | PASS |
| `main.player-main-content` still has `aria-label="Course screen content"` | PASS |
| `main.player-main-content` still uses `tabIndex="-1"` for programmatic focus only | PASS |

Screen selection still uses the existing `currentScreenId` update behavior and does not change routing, progress, assessment, certificate logic, screen completion, or content behavior.

## Guardrail Confirmation

Confirmed:

- no CSS files changed;
- no token files changed;
- no dedicated close button was added;
- no Menu drawer keyboard/focus behavior changed;
- no HelpOverlay changes were made;
- `GlossaryModal`, `ResourcesModal`, and `AccessibilityModal` were untouched;
- Glossary, Resources, and Accessibility launcher ARIA was not changed;
- Captions/transcript was untouched;
- routing, progress, assessment, certificate logic, screen completion, accessibility toolbar behavior, course screens, module CSS, assets, content files, and old HRBA files were untouched;
- active/current CSS, selected/current icon CSS, disabled, completed, locked, danger, progress strip, shell shadow, global focus, course-screen states, and module-specific states were not implemented;
- Phase D CSS remains blocked.

## Recommended Next Step

Create an independent Menu launcher ARIA evaluation task before any dedicated close button work, CSS, tokens, HelpOverlay work, modal dialog changes, Captions/transcript changes, Phase D CSS, or broader state migration.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Did the implementation stay limited to Menu launcher ARIA and the stable mounted drawer root ID? | Yes. |
| Was `aria-expanded` correct in closed and open states? | Yes. Closed state is `false`; open state is `true`. |
| Was `aria-controls` omitted while the drawer was unmounted? | Yes. |
| Did `aria-controls` point to `player-menu-drawer` only when the drawer was mounted? | Yes. |
| Was `id="player-menu-drawer"` added to the mounted drawer root/panel? | Yes. |
| Were dynamic accessible labels correct? | Yes. Closed: `Open module menu`; open: `Close module menu`. |
| Was `aria-current` absent? | Yes. |
| Was `aria-haspopup` absent? | Yes. |
| Were CSS and token files untouched? | Yes. |
| Was no dedicated close button added? | Yes. |
| Was Menu drawer behavior unchanged? | Yes. The existing focus, close, containment, outside-click, and screen-selection behavior remained intact. |
| Were HelpOverlay, modal dialogs, and Captions/transcript untouched? | Yes. |
| Did routing, progress, assessment, certificate, completion, `currentScreenId`, and content behavior remain unchanged? | Yes. |
| Is it safe to move to an independent Menu launcher ARIA evaluation task? | Yes. |
| Does Phase D CSS remain blocked? | Yes. |
