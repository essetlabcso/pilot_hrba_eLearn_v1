# Player Shell Active/Current Sidebar React Accessibility Implementation Specification

## 1. Purpose

This documentation-only specification defines an implementation-ready React/accessibility plan for future player sidebar active/current controls.

It follows:

- `docs/player-shell-active-current-sidebar-accessibility-semantics-review.md`;
- `docs/player-shell-current-on-inverse-token-file-qa.md`;
- `docs/player-shell-current-on-inverse-token-value-proposal.md`;
- `docs/player-shell-current-on-inverse-token-category-decision.md`;
- `docs/player-shell-navigation-state-implementation-readiness.md`;
- `docs/design-system-plan-progress-alignment.md`.

The purpose is to define how future React work should expose the active/open state of sidebar controls to assistive technologies before any Phase D CSS migration uses the current-on-inverse tokens.

This document does not implement:

- React changes;
- ARIA attributes;
- CSS selectors;
- token values or token files;
- modal behavior;
- routing, progress, assessment, or certificate logic;
- accessibility toolbar behavior;
- course screens, assets, content, module CSS, or old HRBA files.

## 2. In-Scope Controls

Read-only inspection of `src/components/player/PlayerSidebar.tsx` and `src/components/player/CoursePlayerShell.tsx` shows the following sidebar controls currently use `.is-active`.

| Control | Current active source | Controlled surface | Current type | In scope for future ARIA spec |
| --- | --- | --- | --- | --- |
| Menu | `activeModal === 'menu'` | Inline menu drawer in `CoursePlayerShell`. | Drawer/disclosure/navigation drawer. | Yes, but not first slice. |
| Glossary | `activeModal === 'glossary'` | `GlossaryModal`. | Dialog-like modal launcher. | Yes, after modal review confirms dialog behavior. |
| Resources | `activeModal === 'resources'` | `ResourcesModal`. | Dialog-like modal launcher. | Yes, after modal review confirms dialog behavior. |
| Help Guide | `activeModal === 'help'` | `HelpOverlay`. | Overlay/help guide; partially modal-like. | Yes, but needs modal behavior review first. |
| Accessibility | `activeModal === 'accessibility'` | `AccessibilityModal`. | Dialog-like modal launcher tied to accessibility UI. | Yes, after modal/accessibility review. |
| Captions | `transcriptVisible === true` | Inline `.player-transcript-panel`. | Transcript panel disclosure. | Yes; recommended first slice. |

Out of scope:

- Play/Pause;
- Audio;
- Reload State;
- Return to LMS;
- header Previous/Next/Course buttons;
- menu drawer screen list buttons;
- roadmap/module cards;
- progress strip;
- disabled, locked, completed, danger, modal CSS, shell shadow, global focus, course-screen, and module-specific states.

These controls either do not currently use `.is-active`, carry different behavior semantics, or require separate component and behavior review.

## 3. Proposed Future ARIA Pattern by Control

### Menu

Recommended future pattern:

- Treat as a drawer/disclosure/navigation drawer, not as a route-current sidebar item.
- Add `aria-expanded={activeModal === 'menu'}` to the Menu button.
- Add `aria-controls="player-menu-drawer"` if the drawer receives a stable matching ID.
- Consider `aria-haspopup` only after deciding whether the menu drawer is a dialog, menu, or navigation drawer. Do not assume `aria-haspopup="dialog"` until the behavior model is reviewed.
- Improve the label to communicate toggle behavior consistently, such as `aria-label={activeModal === 'menu' ? 'Close module menu' : 'Open module menu'}`.
- Do not use `aria-current` on the Menu sidebar button.

Dependencies:

- Stable ID on the drawer container in `CoursePlayerShell`.
- Behavior review for outside click, focus movement, Escape behavior, and drawer labelling.

### Glossary

Recommended future pattern:

- Treat as a dialog launcher after modal behavior review confirms dialog semantics.
- Add `aria-expanded={activeModal === 'glossary'}` to the Glossary button only if the project chooses an expanded/open-state pattern for modal launchers.
- Add `aria-controls="player-glossary-modal"` if the modal root receives a stable ID.
- Add `aria-haspopup="dialog"` if the modal remains a dialog with `role="dialog"` and `aria-modal="true"`.
- Improve the label to communicate state, such as `aria-label={activeModal === 'glossary' ? 'Close course glossary' : 'Open course glossary'}`.
- Do not use `aria-current`.

Dependencies:

- Stable ID on `GlossaryModal` dialog root.
- Modal behavior review for focus trap, focus return, Escape close, labelling, and outside-click behavior.

### Resources

Recommended future pattern:

- Treat as a dialog launcher after modal behavior review confirms dialog semantics.
- Add `aria-expanded={activeModal === 'resources'}` if modal launchers use expanded/open-state semantics.
- Add `aria-controls="player-resources-modal"` if the modal root receives a stable ID.
- Add `aria-haspopup="dialog"` if dialog semantics are confirmed.
- Improve the label to communicate state, such as `aria-label={activeModal === 'resources' ? 'Close resources list' : 'Open resources list'}`.
- Do not use `aria-current`.

Dependencies:

- Stable ID on `ResourcesModal` dialog root.
- Modal behavior review for focus management, close behavior, and download placeholder behavior.

### Help Guide

Recommended future pattern:

- Defer final ARIA pattern until help overlay behavior is reviewed.
- If treated as a dialog, add `aria-haspopup="dialog"`, `aria-expanded`, and `aria-controls="player-help-overlay"` after the overlay receives proper dialog labelling.
- If treated as a non-modal coachmark/help overlay, define a separate pattern before implementation.
- Improve the label to communicate state, such as `aria-label={activeModal === 'help' ? 'Close player help guide' : 'Open player help guide'}`.
- Do not use `aria-current`.

Dependencies:

- Help overlay behavior review.
- Decision on whether Enter should close the overlay globally.
- Dialog role/labelling/focus model review.

### Accessibility

Recommended future pattern:

- Treat as a dialog launcher only after accessibility modal behavior is reviewed.
- Add `aria-expanded={activeModal === 'accessibility'}` if modal launchers use expanded/open-state semantics.
- Add `aria-controls="player-accessibility-modal"` if the modal root receives a stable ID.
- Add `aria-haspopup="dialog"` if dialog semantics are confirmed.
- Improve the label to communicate state, such as `aria-label={activeModal === 'accessibility' ? 'Close accessibility options' : 'Open accessibility options'}`.
- Do not use `aria-current`.

Dependencies:

- Stable ID on `AccessibilityModal` dialog root.
- Modal/accessibility UI behavior review because this control is part of accessibility support itself.

### Captions / Transcript

Recommended future pattern:

- Treat as the first future implementation candidate because it controls an inline transcript panel and is less modal-dependent than the overlay controls.
- Use `aria-expanded={transcriptVisible}`.
- Use `aria-controls="player-transcript-panel"` after the transcript panel receives that stable ID.
- Keep the existing visible state text `Captions: ON/OFF`.
- Keep or improve the dynamic label, such as `aria-label={transcriptVisible ? 'Hide transcript panel' : 'Show transcript panel'}`.
- Do not use `aria-current`.
- Do not use `aria-haspopup`.
- Do not use `aria-pressed` for the first slice unless the team explicitly decides the control is a pure toggle rather than a disclosure. `aria-expanded` better matches a visible controlled panel.

Dependencies:

- Stable ID on the transcript panel in `CoursePlayerShell`.
- Confirmation that the panel remains mounted only while visible; `aria-controls` may reference an element only when present, or implementation must decide whether the controlled element remains in the DOM while hidden.

## 4. Stable ID and Controlled-Region Requirements

Future implementation should use stable, descriptive IDs if `aria-controls` is used.

| Controlled region | Proposed stable ID | Likely file/component | Notes |
| --- | --- | --- | --- |
| Transcript panel | `player-transcript-panel` | `CoursePlayerShell.tsx` inline transcript panel markup. | Recommended first slice. Pair with Captions button `aria-controls`. |
| Menu drawer | `player-menu-drawer` | `CoursePlayerShell.tsx` inline menu drawer container. | Requires drawer behavior review before implementation. |
| Glossary modal | `player-glossary-modal` | `GlossaryModal.tsx` dialog root. | Existing title ID `glossary-modal-title` can remain for labelling. |
| Resources modal | `player-resources-modal` | `ResourcesModal.tsx` dialog root. | Existing title ID `resources-modal-title` can remain for labelling. |
| Help overlay | `player-help-overlay` | `HelpOverlay.tsx` root or dialog root after behavior review. | Needs role/labelling decision first. |
| Accessibility modal | `player-accessibility-modal` | `AccessibilityModal.tsx` dialog root. | Existing title ID `a11y-modal-title` can remain for labelling. |

Stable IDs should be added in the component that renders the controlled region, not in `PlayerSidebar`, unless the controlled element is also rendered there.

`PlayerSidebar` should receive enough state to set the button ARIA attributes, but it should not invent IDs that do not exist in the rendered DOM.

## 5. Modal/Accessibility Behavior Dependencies

The following controls require modal or overlay behavior review before ARIA implementation:

- Glossary;
- Resources;
- Help Guide;
- Accessibility;
- Menu, if treated as modal/drawer overlay rather than simple disclosure.

Behavior questions to resolve:

- Does each modal/drawer have a stable labelled root?
- Does each modal/drawer use `role="dialog"` where appropriate?
- Does `aria-modal="true"` match actual behavior?
- Does focus move into the modal/drawer on open?
- Does focus return to the launching sidebar button on close?
- Is focus trapped where appropriate?
- Does Escape close the surface?
- Is outside-click close accessible and not the only close method?
- Are close buttons labelled clearly?
- Does the Help overlay's Enter-to-close behavior conflict with keyboard interaction?
- Does the Accessibility modal require extra caution because it is itself an accessibility UI?

What can be specified now:

- Captions/transcript can use a disclosure pattern with `aria-expanded` and `aria-controls` after a stable panel ID is added.
- Sidebar modal launcher buttons should not use `aria-current`.
- Modal launcher buttons may use `aria-expanded`, `aria-controls`, and `aria-haspopup="dialog"` only after corresponding controlled regions and dialog behavior are confirmed.

What must wait:

- final ARIA pattern for Help overlay;
- final modal launcher implementation for Glossary, Resources, Accessibility, and possibly Menu;
- focus return and trapping behavior;
- modal close behavior changes;
- CSS active/current styling.

## 6. Future Implementation Slice Proposal

Recommended smallest safe future React/accessibility implementation slice:

**Captions/transcript semantics only.**

Allowed future files for that slice, if approved:

- `src/components/player/PlayerSidebar.tsx`;
- `src/components/player/CoursePlayerShell.tsx`.

Recommended future changes:

- Add `aria-expanded={transcriptVisible}` to the Captions button.
- Add `aria-controls="player-transcript-panel"` to the Captions button.
- Add `id="player-transcript-panel"` to the transcript panel container.
- Keep visible text `Captions: ON/OFF`.
- Keep dynamic label or refine it without changing behavior.

Prohibited in that first slice:

- CSS changes;
- token changes;
- modal launcher ARIA changes;
- menu drawer changes;
- focus management changes;
- routing/progress/assessment/certificate/accessibility toolbar changes;
- active/current visual styling;
- selected/current icon styling;
- disabled, completed, locked, danger, progress strip, shell shadow, global focus, course-screen, or module-specific migration.

Reason:

Captions/transcript is an inline controlled panel and has the clearest relationship between button state and controlled region. It avoids modal-specific behavior questions while establishing the first accessible active/current state path.

## 7. QA Plan for Future React/Accessibility Implementation

Any future React/accessibility implementation slice should include:

- `npm run build`;
- manual route QA on `/module-2/screen-2-2?completed=module_01_hrba_foundations`;
- keyboard navigation check to the Captions/sidebar control;
- DOM/attribute check for `aria-expanded`, `aria-controls`, and matching stable ID;
- check that visible labels still match state;
- check that toggling the control updates `aria-expanded`;
- check that no visual CSS changed;
- check that `src/styles/global.css` was not changed;
- check that token files were not changed;
- check that no routing, progress, assessment, certificate, accessibility toolbar behavior, modal behavior, assets, content, or old HRBA files changed.

For later modal/drawer slices, QA must also include:

- dialog/drawer role and label checks;
- focus movement on open;
- focus return on close;
- Escape close behavior;
- close button label checks;
- outside-click close behavior review;
- screen reader/DOM inspection for `aria-haspopup`, `aria-expanded`, and `aria-controls`.

## 8. Stop Conditions

Future implementation must stop if:

- implementation would require modal behavior changes;
- stable controlled-region IDs are unclear;
- `aria-expanded` or `aria-controls` would reference missing or unstable elements;
- one ARIA pattern would incorrectly cover both modal launchers and transcript/disclosure controls;
- implementation would touch CSS;
- implementation would touch token files;
- implementation would touch routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, or old HRBA files;
- the work starts combining React/accessibility with current-state CSS;
- `aria-current` is proposed for sidebar tool buttons that are not route/page navigation;
- modal behavior questions are solved implicitly inside the first Captions/transcript slice.

## 9. Recommendation

A future React/accessibility implementation task is ready only for the smallest Captions/transcript semantics slice.

Recommended first implementation slice:

- add `aria-expanded` and `aria-controls` to the Captions button;
- add a matching stable ID to the transcript panel;
- keep all visual styling unchanged.

Remain blocked:

- modal launcher ARIA implementation until modal/accessibility behavior review is complete;
- Menu drawer ARIA implementation until drawer behavior is reviewed;
- Phase D active/current CSS implementation;
- selected/current icon CSS;
- disabled, completed, locked, danger, modal/accessibility UI, progress strip, shell shadow, global focus, course-screen, and module-specific state migration.

Phase D CSS remains blocked until React/accessibility implementation and any required modal behavior review are complete and separately QA'd.

## 10. Alignment Update Requirement

`docs/design-system-plan-progress-alignment.md` should record that this specification exists, that no React/ARIA/CSS/token/behavior implementation was done, that the recommended first future React/accessibility implementation slice is Captions/transcript semantics only, and that Phase D CSS remains blocked.
