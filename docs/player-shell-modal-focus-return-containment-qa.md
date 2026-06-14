# Player Shell Modal Focus Return and Containment QA

## Branch

`system/hrba-clean-foundation`

## Implementation Scope

Implemented Slice 1 from `docs/player-shell-modal-drawer-behavior-implementation-spec.md`: shared focus movement, focus containment, Escape close handling, and focus return for the three scoped player shell modal dialogs only:

- `GlossaryModal`
- `ResourcesModal`
- `AccessibilityModal`

## Files Changed

- `src/components/player/GlossaryModal.tsx`
- `src/components/player/ResourcesModal.tsx`
- `src/components/player/AccessibilityModal.tsx`
- `src/components/player/useModalFocusContainment.ts`

No CSS, token files, React routing, course screen logic, module CSS, assets, content files, old HRBA files, accessibility toolbar behavior, modal styling, menu drawer behavior, HelpOverlay behavior, or captions/transcript behavior were changed.

## Behavior Implemented

- Focus moves into the modal on open using the existing close button as the first focus target.
- `Tab` and `Shift+Tab` are contained inside the active modal.
- `Escape` closes the modal.
- Focus returns to the launching sidebar button after close.
- A player-shell fallback focus target is available if the original launcher is unavailable.
- Existing outside-click close, close icon, and footer close behavior are preserved.

## Route QA

Route checked:

`/module-2/screen-2-2?completed=module_01_hrba_foundations`

Viewports checked:

- Desktop: `1440 x 900`
- Tablet: `768 x 900`
- Mobile: `390 x 844`

## Modal QA Results

| Modal | Open from sidebar | Focus on open | Focus containment | Escape close | Close icon | Footer close | Outside click | Focus return |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Glossary | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Resources | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Accessibility | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |

Focus containment was checked at the dialog boundaries: `Shift+Tab` from the first close control stayed inside the dialog and moved to the footer close control, and `Tab` from the footer close control stayed inside the dialog and returned to the first close control.

## Resource Button Check

The Resources modal resource buttons were left unchanged. Source review confirms resource buttons still call the existing placeholder `simulateDownload` action and do not call `onClose`, so they do not intentionally close the modal.

## Build Result

`npm run build` passed.

The only build warning was the existing Vite large-chunk warning.

## Regression Guardrails Confirmed

- Existing `role="dialog"` and `aria-modal="true"` were preserved.
- Existing `aria-labelledby` values were preserved.
- Existing close labels were preserved.
- Existing close icon, footer close, outside-click, and Escape close behavior were preserved.
- Phase C focus-visible behavior was not changed.
- No CSS selectors were changed.
- No token files were changed.
- No launcher ARIA was added.
- No stable modal root IDs were added.
- Menu drawer behavior was not changed.
- HelpOverlay behavior was not changed.
- Captions/transcript behavior was not changed.
- Phase D CSS implementation remains blocked.

## High-Contrast Handling

No high-contrast selector or style changes were made in this behavior-only slice.

## Remaining Risks

- Launcher ARIA and stable modal root IDs are still not implemented.
- Menu drawer behavior remains separate.
- HelpOverlay remains deferred until its coachmark/instructional overlay model is resolved.
- Modal visual styling remains legacy and should not be tokenized until behavior and ARIA slices are stable.
- Phase D navigation-state CSS remains blocked.

## Recommendation

Proceed to a separate Slice 2 readiness/specification task for stable modal root IDs and launcher ARIA preparation for Glossary, Resources, and Accessibility.

Do not start CSS modal styling, Menu drawer implementation, HelpOverlay implementation, Phase D navigation-state CSS, or broader state migration from this QA result alone.
