# Player Shell Modal/Drawer Behavior Implementation Specification

## 1. Purpose

This documentation-only specification prepares future bounded behavior implementation for player shell modals and the Menu drawer. It translates the behavior decisions in `docs/player-shell-modal-accessibility-behavior-specification.md` into implementation slices that can later be reviewed, implemented, and QA'd separately.

This document does not change React, ARIA, CSS, tokens, focus behavior, modal behavior, drawer behavior, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content files, or old HRBA files.

## 2. Scope

In scope:

- Glossary modal
- Resources modal
- Accessibility modal
- Menu drawer

Out of scope:

- HelpOverlay, because its coachmark/instructional overlay model remains unresolved
- Captions/transcript, because it has already been implemented and QA'd separately
- current-state CSS
- selected/current icon CSS
- disabled, completed, locked, danger, progress strip, shell shadow, global focus, course-screen states, and module-specific states
- token work
- routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content files, and old HRBA files

## 3. Future Implementation Slices

| Slice | Name | Scope | Ready for implementation after review? | Must not include |
| --- | --- | --- | --- | --- |
| Slice 1 | Shared modal focus return and focus containment pattern | Glossary, Resources, and Accessibility only | Yes, if accepted as a bounded behavior implementation task | CSS, token files, launcher ARIA, Menu drawer, HelpOverlay, routing/progress logic |
| Slice 2 | Stable modal root IDs and launcher ARIA preparation | Glossary, Resources, and Accessibility only | Documentation/implementation-ready after Slice 1 passes QA | CSS, current-state styles, Menu drawer, HelpOverlay |
| Slice 3 | Menu drawer behavior specification and implementation readiness | Menu drawer only | Needs a separate drawer-specific behavior implementation task | Modal dialog implementation, HelpOverlay, CSS, token files |
| Slice 4 | Launcher ARIA implementation | Modal launchers first; Menu launcher only after drawer behavior passes | Not ready until behavior slices pass | CSS current-state styling, token migration, modal behavior changes beyond scoped ARIA |
| Later | Current-state CSS readiness check | Selector strategy only | Not ready | Any CSS implementation before behavior and launcher ARIA are complete |

The first recommended future implementation slice is Slice 1: shared modal focus return and focus containment for Glossary, Resources, and Accessibility only.

## 4. Glossary Modal Behavior Implementation Requirements

Future behavior implementation for Glossary should:

- preserve the existing modal/dialog model;
- preserve existing `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="glossary-modal-title"`;
- preserve the existing visible title and title ID;
- move focus into the modal on open;
- use the existing close button as the first focus target unless a better target is explicitly approved;
- contain keyboard focus inside the modal while it is open;
- preserve Escape close;
- preserve outside-click close if focus return remains reliable;
- preserve close icon behavior and `Close Glossary` footer button behavior;
- return focus to the Glossary sidebar launcher on close;
- define a fallback focus target if the launcher is unavailable;
- add or prepare a stable modal root ID in a later scoped slice;
- keep future launcher ARIA blocked until focus return and containment are implemented and QA'd.

The implementation must not change glossary content, search behavior, styling, tokens, routing, or course logic.

## 5. Resources Modal Behavior Implementation Requirements

Future behavior implementation for Resources should follow the Glossary modal requirements and additionally:

- preserve resource item content and ordering;
- ensure resource buttons do not unexpectedly close the modal;
- preserve the existing placeholder download behavior;
- keep focus order predictable across close icon, resource buttons, and footer close button;
- return focus to the Resources sidebar launcher after Escape, outside-click, close icon, or footer close button close;
- avoid changing resource download alert behavior in the behavior slice.

The implementation must not change resource content, placeholder download behavior, styling, tokens, routing, or course logic.

## 6. Accessibility Modal Behavior Implementation Requirements

Future behavior implementation for Accessibility should follow the Glossary modal requirements and additionally:

- treat focus behavior with extra caution because this modal supports accessibility guidance;
- preserve the current accessibility guidance content;
- preserve predictable keyboard traversal through the modal content;
- return focus to the Accessibility sidebar launcher on close;
- avoid disrupting any existing accessibility toolbar behavior;
- consider improving the close icon label from `Close modal` to a more specific label such as `Close accessibility options` only in a separate approved scoped task or explicitly included implementation slice.

The implementation must not change accessibility toolbar behavior, global accessibility preferences, styling, tokens, routing, or course logic.

## 7. Menu Drawer Behavior Implementation Requirements

Future Menu drawer work should be separate from the modal behavior slice.

Menu should be treated as a navigation drawer, not as the current route and not as the same pattern as Glossary/Resources/Accessibility modals.

Future Menu drawer requirements:

- define a stable drawer root ID;
- preserve the visible drawer title `Jump to Screen` or an approved equivalent;
- add or preserve a stable title ID for the drawer title in a future scoped implementation;
- add a dedicated visible close button before launcher ARIA is implemented, unless a documented drawer model justifies another accessible close pattern;
- support Escape close if the drawer overlays or blocks the stage;
- preserve outside-click close if retained by the drawer model;
- preserve screen selection close behavior after applying the screen change;
- move focus into the drawer on open;
- return focus to the Menu launcher on ordinary close;
- define an alternative focus destination after screen selection, such as the newly selected screen heading or a safe player-shell landmark/control;
- use conditional `aria-controls` in a later launcher ARIA slice if the drawer remains unmounted while closed;
- never use `aria-current` on the sidebar Menu button because it opens a navigation surface rather than representing the current route.

Menu drawer implementation remains blocked until a drawer-specific behavior implementation task is approved.

## 8. Shared Implementation Considerations

Future implementation may consider a small shared modal behavior utility or hook for:

- storing the launcher element before open;
- moving initial focus into the modal;
- containing Tab/Shift+Tab within the active modal;
- returning focus to the launcher on close;
- handling Escape close consistently;
- defining fallback focus when the launcher is unavailable.

This should remain small and player-shell-specific. Do not introduce a broad modal framework rewrite. Do not refactor unrelated modals, course screens, module CSS, routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, or old HRBA files.

If a shared helper would require a broad component restructure, stop and split the work into a new planning task.

## 9. Future QA Plan

Any future behavior implementation must include:

- `npm run build`;
- route QA on `/module-2/screen-2-2?completed=module_01_hrba_foundations`;
- desktop, tablet, and mobile checks;
- keyboard open/close checks for each scoped launcher;
- focus movement on open;
- focus containment while open;
- focus return on close;
- Escape close;
- outside-click close if retained;
- close button label checks;
- resource button behavior checks for Resources;
- confirmation that HelpOverlay was not changed;
- confirmation that Menu drawer was not changed unless the task explicitly scopes Menu;
- confirmation that no CSS, token, routing, progress, assessment, certificate, accessibility toolbar, asset, content, or old HRBA file changed unless explicitly scoped.

## 10. Stop Conditions

Future work must stop if:

- the implementation would require CSS;
- the implementation would require token changes;
- HelpOverlay behavior is pulled into the modal behavior slice;
- Menu drawer and modal dialogs are forced into one inappropriate pattern;
- the focus return target is unclear;
- focus containment would require a broad modal rewrite;
- routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, or old HRBA files would be touched;
- the implementation cannot remain bounded to player shell modal/drawer behavior.

## 11. Recommendation

Recommended next implementation step after review:

Implement Slice 1 only: a bounded behavior implementation for Glossary, Resources, and Accessibility that adds or standardizes focus return and focus containment without changing CSS, tokens, launcher ARIA, content, routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, or old HRBA files.

Menu drawer implementation should remain separate unless a future task explicitly scopes it. HelpOverlay remains deferred until its coachmark/instructional overlay model is resolved.

Phase D CSS remains blocked.
