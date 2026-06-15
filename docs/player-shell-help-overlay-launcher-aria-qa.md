# Player Shell HelpOverlay Launcher ARIA QA

## Branch

`system/hrba-clean-foundation`

## Source Readiness Note

`docs/player-shell-help-overlay-launcher-aria-readiness.md`

## Implementation Scope

This QA verifies the bounded HelpOverlay launcher ARIA and minimum HelpOverlay root/title semantics implementation only.

Files changed:

- `src/components/player/HelpOverlay.tsx`
- `src/components/player/PlayerSidebar.tsx`

No CSS, token, visual redesign, focus behavior, close behavior, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screen, module CSS, asset, content, or old HRBA file changes were made.

## HelpOverlay Root and Title Semantics Added

The mounted HelpOverlay root now includes:

- `id="player-help-overlay"`
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby="player-help-overlay-title"`

The visible heading `Focused Course Player Guide` now includes:

- `id="player-help-overlay-title"`

Visible heading text was preserved.

## Help Guide Launcher ARIA Added

The Help Guide sidebar launcher now uses the existing modal-launcher attribute pattern with the HelpOverlay root ID.

Closed state:

- `aria-label="Open player help guide"`
- `aria-expanded="false"`
- `aria-controls` omitted
- `aria-haspopup="dialog"`
- `aria-current` absent

Open state:

- `aria-label="Close player help guide"`
- `aria-expanded="true"`
- `aria-controls="player-help-overlay"`
- `aria-haspopup="dialog"`
- `aria-current` absent

The visible launcher label remains `Help Guide`.

## Conditional `aria-controls` Behavior

PASS. `aria-controls` is omitted while HelpOverlay is closed/unmounted and is present only while HelpOverlay is open/mounted.

## Dynamic Accessible Label Behavior

PASS. The launcher accessible label changes from `Open player help guide` when closed to `Close player help guide` when open.

## `aria-haspopup` Decision

PASS. `aria-haspopup="dialog"` was added because dialog-like root semantics were implemented in the same bounded task:

- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby="player-help-overlay-title"`

This remains scoped to HelpOverlay only and does not approve broader modal styling or current-state CSS migration.

## `aria-describedby` Decision

PASS. `aria-describedby` was deferred.

Rationale: the task approved minimum root/title semantics and allowed `aria-describedby` only if a clearly stable description region could be added without content, layout, or styling changes. The implementation stayed conservative and did not add an additional description relationship beyond the required root/title semantics. The visible instructional paragraph remains unchanged and can be reviewed later if a description relationship is separately approved.

## Build Result

PASS. `npm run build` completed successfully.

Observed existing warnings:

- Vite plugin timing notice.
- Vite large-chunk warning.

No new build failure was introduced.

## Route and Viewport QA

Route checked:

`/module-2/screen-2-2?completed=module_01_hrba_foundations`

Viewports checked:

- Desktop: `1440x900`
- Tablet: `768x900`
- Mobile: `390x844`

Result: PASS at all checked viewports.

## DOM and ARIA Checks

Closed Help Guide launcher:

- PASS: `aria-expanded="false"`
- PASS: `aria-controls` omitted while HelpOverlay is unmounted
- PASS: accessible label is `Open player help guide`
- PASS: `aria-current` absent
- PASS: `aria-haspopup="dialog"` present because dialog-like root semantics are implemented
- PASS: `#player-help-overlay` absent while closed

Open Help Guide launcher:

- PASS: `aria-expanded="true"`
- PASS: `aria-controls="player-help-overlay"`
- PASS: accessible label is `Close player help guide`
- PASS: `aria-current` absent
- PASS: `aria-haspopup="dialog"` present

Mounted HelpOverlay:

- PASS: root has `id="player-help-overlay"`
- PASS: root has `role="dialog"`
- PASS: root has `aria-modal="true"`
- PASS: root has `aria-labelledby="player-help-overlay-title"`
- PASS: visible heading has `id="player-help-overlay-title"`
- PASS: visible heading text remains `Focused Course Player Guide`
- PASS: `aria-describedby` absent by conservative decision
- PASS: visible content unchanged

No shell-caused horizontal scrolling was observed at the checked viewports.

## Behavior Regression Checks

PASS at `1440x900`, `768x900`, and `390x844`.

- Keyboard can open HelpOverlay from the Help Guide launcher.
- Focus still moves to `Got it! Start Learning` on open.
- `Tab` remains contained while HelpOverlay is open.
- `Shift+Tab` remains contained while HelpOverlay is open.
- Escape closes HelpOverlay and returns focus to the Help Guide launcher.
- The dismissal button closes HelpOverlay and returns focus to the Help Guide launcher.
- Backdrop click closes HelpOverlay and returns focus to the Help Guide launcher.
- Global Enter-to-close remains removed. Pressing Enter while focus is on the non-button prompt container did not close HelpOverlay.
- Fallback focus behavior remains unchanged.

## Guardrail Confirmation

PASS.

- No CSS files changed.
- No token files changed.
- No HelpOverlay visual redesign was done.
- No HelpOverlay focus behavior was changed.
- No HelpOverlay close behavior was changed.
- Menu drawer behavior was unchanged.
- Menu launcher ARIA was unchanged.
- GlossaryModal, ResourcesModal, AccessibilityModal, and their launcher ARIA were unchanged.
- Captions/transcript was unchanged.
- Routing, progress, assessment, certificate logic, screen completion, `currentScreenId` behavior, accessibility toolbar behavior, course screens, module CSS, assets, content, and old HRBA files were unchanged.
- Active/current CSS, selected/current icon CSS, disabled, completed, locked, danger, progress strip, shell shadow, global focus, course-screen states, module-specific states, and Phase D CSS remain blocked.

## Result

PASS.

The implementation stayed within the approved bounded HelpOverlay launcher ARIA and minimum HelpOverlay root/title semantics scope.

## Recommended Next Step

Run an independent HelpOverlay launcher ARIA evaluation before any further HelpOverlay, modal/accessibility UI, current-state CSS, Phase D CSS, or broader state migration.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| 1. Did the implementation stay limited to HelpOverlay launcher ARIA and minimum HelpOverlay root/title semantics? | PASS. Only `HelpOverlay.tsx` and `PlayerSidebar.tsx` changed. |
| 2. Was `id="player-help-overlay"` added to the mounted HelpOverlay root? | PASS. |
| 3. Was `id="player-help-overlay-title"` added to the visible heading? | PASS. |
| 4. Were `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` added only if safe? | PASS. They were added to the mounted HelpOverlay root, which already has focus containment and blocking behavior verified. |
| 5. Was `aria-describedby` deferred or safely added with a stable ID? | PASS. It was deferred. |
| 6. Was `aria-expanded` correct in closed and open states? | PASS. Closed is `false`; open is `true`. |
| 7. Was `aria-controls` omitted while HelpOverlay was unmounted? | PASS. |
| 8. Did `aria-controls` point to `player-help-overlay` only when HelpOverlay was mounted? | PASS. |
| 9. Were dynamic accessible labels correct? | PASS. Closed is `Open player help guide`; open is `Close player help guide`. |
| 10. Was `aria-current` absent? | PASS. |
| 11. Was `aria-haspopup` added only if dialog-like root semantics were implemented? | PASS. It was added with `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`. |
| 12. Were CSS and token files untouched? | PASS. |
| 13. Was HelpOverlay focus/close behavior unchanged? | PASS. |
| 14. Was global Enter-to-close still removed? | PASS. |
| 15. Were Menu drawer, Menu launcher ARIA, modal dialogs, and Captions/transcript untouched? | PASS. |
| 16. Did routing, progress, assessment, certificate, screen completion, `currentScreenId`, accessibility toolbar behavior, assets, content, module CSS, and old HRBA files remain unchanged? | PASS. |
| 17. Is it safe to move to an independent HelpOverlay launcher ARIA evaluation task? | PASS. |
| 18. Does Phase D CSS remain blocked? | PASS. |
