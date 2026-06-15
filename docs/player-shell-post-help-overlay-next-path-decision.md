# Player Shell Post-HelpOverlay Next Path Decision

## Purpose

This documentation-only gatekeeping decision follows `docs/player-shell-help-overlay-behavior-classification.md` and decides the next safe path before any HelpOverlay ARIA, HelpOverlay behavior implementation, current-state CSS, or broader state migration.

This document does not implement React, ARIA, CSS, tokens, focus behavior, HelpOverlay behavior, Menu drawer behavior, modal behavior, routing, progress, assessment, certificate logic, screen completion, `currentScreenId` behavior, accessibility toolbar behavior, course screens, module CSS, assets, content, or old HRBA file changes.

## Current Completed Accessibility And State Evidence

| Evidence area | Current status | Source |
| --- | --- | --- |
| Captions/transcript semantics | Complete and QA passed. Captions has `aria-expanded` and conditional `aria-controls` tied to the mounted transcript panel. | `docs/player-shell-captions-transcript-accessibility-qa.md` |
| Glossary, Resources, and Accessibility focus behavior | Complete for the bounded slice. Focus movement, containment, Escape close, close paths, and focus return passed QA. | Alignment evidence and modal behavior QA references |
| Glossary, Resources, and Accessibility root IDs and launcher ARIA | Complete and independently evaluated as PASS. Scoped modal launchers have conditional `aria-controls`, `aria-expanded`, `aria-haspopup="dialog"`, dynamic labels, and stable modal root IDs. | `docs/player-shell-modal-root-id-launcher-aria-evaluation.md` |
| Menu drawer behavior | Complete and independently evaluated as PASS. Menu now has Escape close, focus movement into the drawer, containment, ordinary-close focus return, and post-selection focus to `main.player-main-content`. | `docs/player-shell-menu-drawer-behavior-evaluation.md` |
| Menu launcher ARIA | Complete and independently evaluated as PASS. Menu launcher has correct `aria-expanded`, conditional valid `aria-controls`, dynamic labels, no `aria-current`, and no `aria-haspopup`. | `docs/player-shell-menu-drawer-launcher-aria-evaluation.md` |
| Current-on-inverse token files | Complete at token-file level only. No selector usage exists yet. | `docs/player-shell-current-on-inverse-token-file-qa.md` |
| HelpOverlay behavior classification | Complete with PASS WITH CAUTION. HelpOverlay is classified as a coachmark/tutorial overlay with dismissible help panel behavior. | `docs/player-shell-help-overlay-behavior-classification.md` |

## Remaining Blockers

| Area | Blocker |
| --- | --- |
| HelpOverlay behavior | Focus movement, focus containment, focus return, fallback focus, labelled root/title strategy, outside-click policy, and global Enter-to-close correction are not specified for implementation. |
| HelpOverlay launcher ARIA | Not ready. Root ID, title ID, mounted/unmounted behavior, focus behavior, and whether dialog-like semantics are approved must be specified first. |
| Dedicated Menu drawer close button | Still blocked pending drawer header/design/CSS approval. Menu behavior and launcher ARIA are complete without adding the close button. |
| Current-state CSS | Blocked. Current-state CSS cannot proceed while `.is-active` still mixes modal-open, drawer-open, coachmark-open, disclosure-open, and possible route/current meanings. |
| Broad `.player-sidebar-button.is-active` selector | Unsafe. It would style HelpOverlay, modals, Menu drawer, and Captions/transcript as if they were the same state. |
| High-contrast current-state CSS | Blocked until state semantics and selector strategy are approved. |
| Disabled/completed/locked/danger/progress states | Out of scope and still unresolved. These need separate state decisions, token mapping, and QA gates. |

## Path Decision

Selected path: **Option A - HelpOverlay behavior implementation specification**.

Rationale:

- HelpOverlay behavior classification is resolved enough to specify the next behavior requirements.
- HelpOverlay is not ready for ARIA implementation because root semantics, focus behavior, and mounted/unmounted relationships are not specified.
- Current-state CSS is not ready because broad `.player-sidebar-button.is-active` remains unsafe and HelpOverlay still participates in that mixed state class.
- A documentation-only behavior implementation specification is the narrowest next step that can resolve the remaining HelpOverlay blockers without touching code, CSS, tokens, routing, progress, or content.

Rejected paths:

| Option | Decision | Reason |
| --- | --- | --- |
| Option B - HelpOverlay ARIA readiness | Reject for now | Launcher ARIA depends on behavior decisions: root role, root ID, title ID, focus movement, focus containment, focus return, and mounted/unmounted strategy. |
| Option C - Current-state CSS readiness check | Reject for now | HelpOverlay has been classified, but selector strategy is still not safe. A current-state CSS readiness check would be premature until HelpOverlay behavior is specified or explicitly separated from the state selector strategy. |
| Option D - STOP | Reject | HelpOverlay is not ready for implementation, but its model is resolved enough to create a documentation-only behavior implementation specification. |

## Current-State CSS Safety Decision

Broad `.player-sidebar-button.is-active` CSS is **not safe**.

Reasons:

- HelpOverlay uses the same `.is-active` sidebar button class when open, but it is a coachmark/tutorial overlay, not route-current navigation.
- Glossary, Resources, Accessibility, Menu, Captions/transcript, and Help do not share the same semantic state.
- Styling all active sidebar buttons as current/selected could mislead learners about navigation, completion, or route position.
- Current-state CSS should not be used to imply accessible state semantics before those semantics are explicitly assigned.

A narrower selector strategy may be considered later, but only after behavior and ARIA readiness work separates at least these meanings:

- dialog-open;
- drawer-open;
- coachmark-open;
- disclosure-open;
- route-current or screen-current;
- completed;
- locked;
- disabled;
- danger.

No CSS is approved by this decision.

## Recommended Next Task

Exact next task title:

**Create a documentation-only HelpOverlay behavior implementation specification**

Recommended scope:

- HelpOverlay only;
- future root role decision;
- root ID and title ID strategy;
- whether `aria-modal` is appropriate after focus containment;
- focus movement target on open;
- focus containment expectations;
- focus return target on close;
- fallback focus target if the Help launcher is unavailable;
- global Enter-to-close correction decision;
- outside-click close policy;
- launcher ARIA readiness after behavior is specified;
- QA requirements and stop conditions.

Out of scope for that next task:

- React implementation;
- ARIA implementation;
- CSS implementation;
- token edits;
- current-state CSS;
- Menu drawer, Menu launcher ARIA, Glossary, Resources, Accessibility, Captions/transcript;
- routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, and old HRBA files.

## Stop Conditions

Future work must stop if:

- broad current-state CSS is proposed;
- HelpOverlay remains unresolved but CSS is recommended;
- the next work would touch CSS, tokens, routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, module CSS, or old HRBA files without separate approval;
- the task tries to combine HelpOverlay, CSS, and broader state migration;
- HelpOverlay ARIA is proposed before focus behavior, root semantics, and mounted/unmounted strategy are specified;
- global Enter-to-close remains unsafe and unresolved in an implementation-bound task.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is HelpOverlay resolved enough for next work? | Yes, for documentation-only behavior implementation specification. No, for ARIA or React implementation. |
| Is current-state CSS ready? | No. Current-state CSS remains blocked. |
| Is broad `.is-active` safe? | No. It still mixes modal-open, drawer-open, coachmark-open, disclosure-open, and potential current-state meanings. |
| Is a narrower selector strategy needed? | Yes, later. It should separate dialog-open, drawer-open, coachmark-open, disclosure-open, route-current, completed, locked, disabled, and danger states. |
| Are CSS and token changes still blocked? | Yes. No CSS or token work is approved by this decision. |
| What is the exact next safe task? | Create a documentation-only HelpOverlay behavior implementation specification. |
| Does Phase D CSS remain blocked? | Yes. Phase D CSS remains blocked unless explicitly superseded by a later approved readiness task. |
