# Player Shell Menu Drawer Launcher ARIA Readiness

## 1. Purpose

This documentation-only readiness note prepares a future bounded Menu drawer launcher ARIA implementation task.

It follows the completed Menu drawer behavior implementation, QA, and independent evaluation. It does not implement React, ARIA, CSS, tokens, focus behavior, drawer behavior, routing, progress, assessment, certificate logic, screen completion, accessibility toolbar behavior, course screens, module CSS, assets, content, or old HRBA file changes.

## 2. Scope

In scope:

- the sidebar Menu launcher only;
- the launcher's relationship to the already implemented Menu drawer behavior;
- future `aria-expanded` readiness;
- future conditional `aria-controls` readiness;
- future dynamic accessible label readiness;
- `aria-haspopup` decision for the Menu drawer launcher;
- explicit exclusion of `aria-current`.

Out of scope:

- dedicated close button;
- Menu drawer behavior changes;
- HelpOverlay;
- Glossary, Resources, and Accessibility modals;
- Captions/transcript;
- CSS and token work;
- routing, progress, assessment, certificate logic, screen completion, and accessibility toolbar behavior;
- course screens, module CSS, assets, content, and old HRBA files;
- active/current CSS, selected/current icon CSS, disabled, completed, locked, danger, progress strip, shell shadow, global focus, course-screen states, and module-specific states.

Phase D CSS remains blocked.

## 3. Current Readiness Evidence

Source evidence reviewed:

- `docs/player-shell-menu-drawer-behavior-qa.md`
- `docs/player-shell-menu-drawer-behavior-evaluation.md`
- `docs/player-shell-menu-drawer-close-affordance-focus-destination-decision.md`
- `docs/player-shell-menu-drawer-behavior-implementation-spec.md`
- `docs/design-system-plan-progress-alignment.md`
- read-only inspection of `src/components/player/CoursePlayerShell.tsx`, `src/components/player/PlayerSidebar.tsx`, and `src/components/player/MainScreenCanvas.tsx`

Current evidence:

- Menu drawer behavior implementation passed QA.
- Independent Menu drawer behavior evaluation passed.
- Escape closes the drawer.
- Focus moves into the drawer on open.
- Focus moves to the visible `Jump to Screen` heading with `tabIndex={-1}`.
- `Tab` and `Shift+Tab` are contained inside the drawer.
- Ordinary close returns focus to the Menu launcher.
- Selecting a screen closes the drawer and moves focus to `main.player-main-content`.
- `main.player-main-content` preserves `aria-label="Course screen content"` and uses `tabIndex={-1}` for programmatic focus only.
- No dedicated close button was added.
- No Menu launcher ARIA has been added yet.
- The Menu launcher currently has no `modalRootId`, no `closeAriaLabel`, no `aria-expanded`, no `aria-controls`, no `aria-haspopup`, no `aria-current`, and no dynamic accessible label.

## 4. Candidate Menu Launcher ARIA Pattern

Future implementation should add only drawer-appropriate launcher ARIA:

- `aria-expanded` based on whether the Menu drawer is open.
- Conditional `aria-controls` only while the drawer is mounted/open.
- Dynamic accessible label:
  - closed: `Open module menu`
  - open: `Close module menu`
- No `aria-current`.
- No `aria-haspopup` for the first Menu launcher ARIA slice.

The visible label `Menu` should not change unless a separate design/content task approves it.

## 5. `aria-current` Decision

Decision: `aria-current` must not be used on the sidebar Menu launcher.

Reason:

- Menu opens a navigation drawer/tool panel.
- The Menu launcher is not itself the current page, route, module, or screen.
- Prior documentation classifies Menu as a navigation drawer, not a route-current control.
- Adding `aria-current` to the Menu launcher would confuse drawer-open state with learner location.

If `aria-current` is proposed for the Menu launcher in a future task, work must stop.

## 6. `aria-haspopup` Decision

Decision: omit `aria-haspopup` for the first bounded Menu launcher ARIA implementation.

Reason:

- Prior documentation classifies Menu as a navigation drawer, not a modal dialog.
- `aria-haspopup="dialog"` is appropriate for the scoped Glossary, Resources, and Accessibility modal launchers, but the Menu drawer is intentionally not being treated as a dialog.
- `aria-haspopup="menu"` would imply an ARIA menu pattern that is not implemented and would be misleading for a screen-navigation drawer.
- `aria-haspopup` is not required for a button that expands a drawer-like panel when `aria-expanded` and conditional `aria-controls` are available.

Future use of `aria-haspopup` should remain deferred unless the Menu drawer model is changed and reviewed.

## 7. `aria-controls` Strategy

Because the drawer is conditionally rendered, future implementation should use conditional `aria-controls` only while the drawer is open and mounted.

Recommended drawer root ID:

- `player-menu-drawer`

Current source state:

- A stable Menu drawer root ID is recommended by earlier documentation but is not implemented yet.

Readiness decision:

- Future implementation is ready only if it adds `id="player-menu-drawer"` to the mounted Menu drawer root/panel in the same bounded ARIA task.
- Closed state should omit `aria-controls` because the controlled drawer is unmounted.
- Open state should set `aria-controls="player-menu-drawer"` and the mounted drawer root must have the matching ID.

Stop if the future implementation cannot add or verify a stable mounted drawer root ID.

## 8. `aria-expanded` Strategy

Future implementation should set `aria-expanded={true}` when the Menu drawer is open and `aria-expanded={false}` when it is closed.

This is appropriate because the Menu launcher is a button that opens and closes a drawer-like panel. The expanded state communicates the open/closed relationship without implying route-current state or dialog semantics.

## 9. Dynamic Accessible Label Strategy

Decision: approve a dynamic accessible label for the future bounded Menu launcher ARIA slice.

Recommended labels:

- closed: `Open module menu`
- open: `Close module menu`

Reason:

- The current visible label `Menu` can remain stable.
- The accessible label can communicate the action available from the launcher.
- This mirrors the existing dynamic label pattern used for scoped modal launchers while keeping Menu-specific semantics separate.

The visible label should not change unless separately approved.

## 10. Implementation Readiness Classification

Classification: PASS WITH CAUTION.

Rationale:

- Menu drawer behavior has passed QA and independent evaluation.
- `aria-expanded` is appropriate for the drawer launcher.
- Conditional `aria-controls` is safe if the future task adds a stable `player-menu-drawer` ID to the mounted drawer root.
- A dynamic accessible label is appropriate.
- `aria-current` is explicitly excluded.
- `aria-haspopup` should be omitted for this first bounded slice.
- The dedicated close button remains blocked pending drawer header/design/CSS approval.

The future implementation must remain narrowly bounded. It must not alter focus behavior, drawer behavior, CSS, tokens, routing, progress, screen completion, HelpOverlay, modal dialogs, Captions/transcript, or broader state migration.

## 11. Future Implementation Scope If PASS WITH CAUTION

Smallest safe future implementation slice:

- Menu launcher ARIA only.
- Add stable Menu drawer root ID `player-menu-drawer` only as needed for `aria-controls`.
- Add `aria-expanded` to the Menu launcher.
- Add conditional `aria-controls` to the Menu launcher only while the drawer is open/mounted.
- Add dynamic accessible label:
  - `Open module menu`
  - `Close module menu`
- Omit `aria-haspopup`.
- Do not add `aria-current`.
- Do not add CSS.
- Do not edit token files.
- Do not add a dedicated close button.
- Do not change drawer behavior.
- Do not change HelpOverlay, modal dialogs, Captions/transcript, routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, module CSS, old HRBA files, or Phase D CSS.

Likely future implementation files, if separately approved:

- `src/components/player/PlayerSidebar.tsx`
- `src/components/player/CoursePlayerShell.tsx` only to add the stable mounted drawer root ID

## 12. QA Plan for Future Implementation

Any future Menu launcher ARIA implementation must include:

- `npm run build`;
- route QA on `/module-2/screen-2-2?completed=module_01_hrba_foundations`;
- viewport QA at `1440x900`, `768x900`, and `390x844`;
- DOM check that closed Menu launcher has `aria-expanded="false"`;
- DOM check that open Menu launcher has `aria-expanded="true"`;
- DOM check that closed Menu launcher omits `aria-controls` while the drawer is unmounted;
- DOM check that open Menu launcher has `aria-controls="player-menu-drawer"`;
- DOM check that mounted drawer root has `id="player-menu-drawer"`;
- DOM check for dynamic accessible label if implemented:
  - closed: `Open module menu`
  - open: `Close module menu`
- confirmation that `aria-current` is absent;
- confirmation that `aria-haspopup` is omitted;
- regression checks for Escape close, focus movement into the drawer, focus containment, ordinary close focus return, and post-screen-selection focus to `main.player-main-content`;
- confirmation that no CSS, token, dedicated close button, HelpOverlay, modal dialog, Captions/transcript, routing, progress, assessment, certificate, accessibility toolbar, asset, content, module CSS, or old HRBA files changed.

## 13. Stop Conditions

Stop if:

- the drawer root ID is missing or unstable;
- `aria-controls` would reference an unmounted drawer while closed without conditional handling;
- `aria-current` is proposed;
- `aria-haspopup` is proposed without a new reviewed justification;
- implementation would require CSS;
- implementation would require token changes;
- implementation would require a dedicated close button;
- implementation would change drawer behavior or focus behavior;
- implementation would change routing, progress, assessment, certificate logic, screen completion, HelpOverlay, modal dialogs, Captions/transcript, accessibility toolbar behavior, content, course screens, module CSS, assets, or old HRBA files;
- work drifts toward current-state CSS or broader state migration.

## 14. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is Menu launcher ARIA ready? | PASS WITH CAUTION. It is ready only as a narrow future ARIA slice with a stable mounted drawer root ID. |
| Is `aria-expanded` appropriate? | Yes. It should reflect whether the Menu drawer is open. |
| Is conditional `aria-controls` safe? | Yes, only while the drawer is open/mounted and only if the mounted drawer root has `id="player-menu-drawer"`. |
| Is a stable drawer root ID available? | Not in current source. It is clearly recommended as `player-menu-drawer` and must be added in the future bounded ARIA task if `aria-controls` is implemented. |
| Is `aria-current` explicitly excluded? | Yes. Menu is not the current page, route, module, or screen. |
| Is `aria-haspopup` approved, omitted, or deferred? | Omitted for the first bounded slice. Future use is deferred unless the drawer model is re-reviewed. |
| Is a dynamic accessible label approved? | Yes: `Open module menu` when closed and `Close module menu` when open. |
| Are CSS and tokens still out of scope? | Yes. |
| Is the dedicated close button still blocked? | Yes. It remains blocked pending drawer header/design/CSS approval. |
| Is HelpOverlay still deferred? | Yes. |
| Is Phase D CSS still blocked? | Yes. |
| What is the exact recommended next task? | If reviewed and accepted, create a bounded Menu launcher ARIA implementation task only: add stable mounted drawer root ID, `aria-expanded`, conditional `aria-controls`, and dynamic accessible labels; omit `aria-haspopup`; do not add `aria-current`; do not change CSS, tokens, focus behavior, drawer behavior, close button, HelpOverlay, modal dialogs, Captions/transcript, routing, progress, or Phase D CSS. |
