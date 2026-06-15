# Player Shell HelpOverlay Launcher ARIA Readiness

## Purpose

This documentation-only readiness note prepares a future bounded HelpOverlay launcher ARIA implementation task.

It follows:

- `docs/player-shell-help-overlay-behavior-evaluation.md`;
- `docs/player-shell-help-overlay-behavior-qa.md`;
- `docs/player-shell-help-overlay-behavior-implementation-spec.md`;
- `docs/player-shell-help-overlay-behavior-classification.md`;
- `docs/player-shell-post-help-overlay-next-path-decision.md`;
- `docs/design-system-plan-progress-alignment.md`.

This note does not implement React, ARIA, CSS, tokens, IDs, focus behavior, close behavior, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screen behavior, module CSS, assets, content, or old HRBA file changes.

## Scope

In scope:

- Help Guide sidebar launcher only;
- Help Guide launcher relationship to the mounted HelpOverlay;
- readiness for future HelpOverlay root/title/description IDs;
- future launcher `aria-expanded`;
- future conditional launcher `aria-controls`;
- future dynamic accessible labels;
- future `aria-haspopup` decision;
- explicit `aria-current` exclusion;
- future QA requirements and stop conditions.

Out of scope:

- implementation in this task;
- Menu drawer;
- Menu launcher ARIA;
- Glossary, Resources, and Accessibility modals or launchers;
- Captions/transcript;
- CSS;
- tokens;
- dedicated close button work;
- routing, progress, assessment, certificate logic, screen completion, `currentScreenId` behavior, accessibility toolbar behavior, course screens, module CSS, assets, content, and old HRBA files;
- active/current CSS, selected/current icon CSS, disabled, completed, locked, danger, progress strip, shell shadow, global focus, course-screen states, module-specific states, and Phase D CSS.

## Current Readiness Evidence

Evidence from QA and independent evaluation:

- HelpOverlay focus/close behavior implementation passed QA.
- Independent HelpOverlay behavior evaluation passed.
- Focus moves to the visible `Got it! Start Learning` dismissal button on open.
- `Tab` and `Shift+Tab` are contained while HelpOverlay is open.
- Escape closes HelpOverlay and returns focus to the Help Guide launcher.
- The dismissal button closes HelpOverlay and returns focus to the Help Guide launcher.
- Backdrop click closes HelpOverlay and returns focus to the Help Guide launcher.
- The previous unscoped global Enter-to-close behavior was removed.
- Fallback focus is defined: Help Guide launcher, first sidebar tool button, then `main.player-main-content`.
- No HelpOverlay launcher ARIA exists yet.
- No CSS or token work was done.

## HelpOverlay Behavior Model Reminder

HelpOverlay is a blocking coachmark/tutorial overlay with dismissible help-panel behavior.

It is not route-current navigation. It is not identical to Glossary, Resources, or Accessibility content modals.

Because it blocks the player and now contains focus, dialog-like semantics may be appropriate if carefully scoped. That decision should remain tied to the mounted HelpOverlay root and should not be used to justify broader modal styling, current-state CSS, or generic `.player-sidebar-button.is-active` migration.

## Future HelpOverlay Root Structure Readiness

| Future structure | Readiness decision |
| --- | --- |
| Stable root ID | Ready with caution. Future implementation may add `id="player-help-overlay"` to the mounted HelpOverlay root if launcher `aria-controls` is implemented. |
| Stable title ID | Ready with caution. Future implementation may add `id="player-help-overlay-title"` to the visible `Focused Course Player Guide` heading if `aria-labelledby` is implemented. |
| Optional description ID | Defer unless the main instructional paragraph is clearly scoped as the stable description. If used, prefer `id="player-help-overlay-description"`. |
| `role="dialog"` | Ready with caution if the overlay remains blocking and focus-contained. |
| `aria-modal="true"` | Ready with caution only if the dialog-like model is approved in the same bounded ARIA implementation task and focus containment remains verified. |
| `aria-labelledby` | Ready with caution if tied to `player-help-overlay-title` on the visible heading. |
| `aria-describedby` | Defer unless a stable description region is added without layout/content changes. |

No attributes or IDs are implemented by this readiness note.

## Future Help Launcher ARIA Pattern

Future Help Guide launcher ARIA can be considered if it stays scoped to HelpOverlay only:

- `aria-expanded` based on `activeModal === 'help'`;
- conditional `aria-controls` only while HelpOverlay is mounted/open;
- dynamic accessible labels if approved below;
- `aria-haspopup` only if dialog-like HelpOverlay semantics are implemented;
- no `aria-current`.

The future implementation must not modify Menu launcher ARIA, modal dialog launcher ARIA, Captions/transcript, CSS, tokens, routing, progress, or course content.

## `aria-current` Decision

`aria-current` must not be used on the Help Guide launcher.

Reason:

- Help Guide opens instructional support;
- it does not represent the current route;
- it does not represent the current page, module, or screen;
- it should not imply learner progress, completion, selection, or route position.

## `aria-expanded` Decision

`aria-expanded` is appropriate for the Help Guide launcher in a future bounded implementation.

Recommended future pattern:

- closed: `aria-expanded="false"`;
- open: `aria-expanded="true"`.

This communicates the HelpOverlay open/closed relationship without implying route-current state.

## `aria-controls` Strategy

Because HelpOverlay is conditionally rendered, future `aria-controls` should be conditional.

Recommended future pattern:

- open: `aria-controls="player-help-overlay"` only if the mounted HelpOverlay root has `id="player-help-overlay"`;
- closed: omit `aria-controls` if HelpOverlay is unmounted.

Future implementation must stop if `aria-controls` would reference an unmounted overlay while closed.

## `aria-haspopup` Decision

Decision: **defer for the first bounded launcher ARIA slice unless dialog-like root semantics are implemented in the same scoped task.**

Reason:

- HelpOverlay is a blocking coachmark/tutorial overlay with modal-like keyboard behavior;
- it is not a standard content modal;
- `aria-haspopup="dialog"` should not be added unless the mounted HelpOverlay root is also given a dialog-like role and label relationship.

If the future task includes `role="dialog"`, `aria-labelledby`, and verified focus containment, then `aria-haspopup="dialog"` may be included. If the future task only adds launcher open/closed state, omit `aria-haspopup`.

## Dynamic Accessible Label Strategy

Dynamic accessible labels are approved for a future bounded implementation.

Recommended future labels:

- closed: `Open player help guide`;
- open: `Close player help guide`.

The visible label `Help Guide` should not change unless separately approved.

## Implementation Readiness Classification

Result: **PASS WITH CAUTION**

Ready:

- future Help Guide launcher `aria-expanded`;
- future conditional `aria-controls`, if a mounted root ID is added;
- future dynamic accessible label;
- future stable root ID and title ID if used for scoped ARIA relationships;
- future `role="dialog"` / `aria-modal="true"` only if retained within the bounded HelpOverlay ARIA task and QA verifies behavior remains intact.

Not ready:

- current-state CSS;
- broad `.player-sidebar-button.is-active` styling;
- HelpOverlay visual redesign;
- dedicated close button work;
- CSS or token changes;
- Phase D CSS or broader state migration.

Deferred:

- `aria-describedby`, unless the future implementation can add a stable description ID without content/layout change;
- `aria-haspopup`, unless dialog-like root semantics are implemented in the same scoped task.

## Future Implementation Scope If Approved

Smallest safe future implementation slice:

- HelpOverlay launcher ARIA only;
- stable HelpOverlay root ID only if required for `aria-controls`;
- stable title ID only if required for `aria-labelledby`;
- optional description ID only if clearly scoped;
- `aria-expanded`;
- conditional `aria-controls`;
- dynamic accessible label;
- `aria-haspopup` only if dialog-like root semantics are implemented;
- no `aria-current`;
- no CSS;
- no tokens;
- no HelpOverlay visual redesign;
- no HelpOverlay focus/close behavior changes;
- no Menu, modal dialog, Captions/transcript, routing, progress, assessment, certificate, accessibility toolbar, asset, content, module CSS, or old HRBA changes.

## CSS And Current-State Implication

HelpOverlay launcher ARIA readiness does not approve current-state CSS.

Broad `.player-sidebar-button.is-active` remains unsafe unless a later readiness note creates a narrower selector strategy. The class still mixes modal-open, drawer-open, coachmark-open, disclosure-open, and possible route-current meanings.

Current-on-inverse tokens remain implemented in token files but unused by selectors.

Phase D CSS remains blocked.

## QA Plan For Future Implementation

Any future implementation should include:

- `npm run build`;
- route QA on `/module-2/screen-2-2?completed=module_01_hrba_foundations`;
- viewport QA at `1440x900`, `768x900`, and `390x844`;
- DOM checks for closed/open `aria-expanded`;
- DOM checks for conditional `aria-controls`;
- DOM checks for root/title/description IDs if implemented;
- DOM checks for `role`, `aria-modal`, `aria-labelledby`, and `aria-describedby` if implemented;
- DOM checks for dynamic accessible label if implemented;
- confirmation that `aria-current` is absent;
- confirmation that `aria-haspopup` follows this readiness decision;
- regression checks that focus still moves into HelpOverlay, remains contained, closes with Escape/button/backdrop, returns focus to Help Guide, and does not restore global Enter-to-close;
- confirmation that no CSS, token, Menu, modal dialog, Captions/transcript, routing, progress, assessment, certificate, accessibility toolbar, asset, content, module CSS, or old HRBA files changed.

## Stop Conditions

Future work must stop if:

- HelpOverlay root ID or mounted/unmounted strategy is unclear;
- `aria-controls` would reference an unmounted overlay while closed;
- `aria-current` is proposed;
- `aria-haspopup` cannot be justified by a dialog-like root pattern;
- root role, `aria-modal`, title ID, or description ID would require layout/content changes beyond a bounded ARIA task;
- implementation would require CSS or token changes;
- HelpOverlay focus/close behavior would change;
- Menu drawer, Menu launcher ARIA, modal dialogs, Captions/transcript, routing, progress, assessment, certificate, accessibility toolbar behavior, assets, content, module CSS, or old HRBA files would be touched;
- work drifts toward current-state CSS or broader state migration.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is HelpOverlay launcher ARIA ready? | PASS WITH CAUTION. It is ready only as a bounded future task with root/label relationships and conditional controls kept narrow. |
| Is `aria-expanded` appropriate? | Yes. Use `false` when closed and `true` when open. |
| Is conditional `aria-controls` safe? | Yes, only while HelpOverlay is mounted/open and only if the mounted root has `id="player-help-overlay"`. |
| Is a stable HelpOverlay root ID recommended? | Yes. Recommend `player-help-overlay` in the future implementation if `aria-controls` is used. |
| Is a stable title ID recommended? | Yes. Recommend `player-help-overlay-title` on the visible `Focused Course Player Guide` heading if `aria-labelledby` is used. |
| Is a description ID recommended or deferred? | Deferred unless the main instructional copy can receive a stable ID without content/layout change. |
| Is `aria-current` explicitly excluded? | Yes. Help Guide is not route-current navigation. |
| Is `aria-haspopup` approved, omitted, or deferred? | Deferred for the first slice unless dialog-like root semantics are implemented in the same scoped task. |
| Are dynamic accessible labels approved? | Yes. Use `Open player help guide` when closed and `Close player help guide` when open. |
| Are CSS and tokens still out of scope? | Yes. No CSS or token changes are approved. |
| Is HelpOverlay focus/close behavior unchanged? | Yes. Future launcher ARIA must preserve the completed behavior. |
| Is broad `.player-sidebar-button.is-active` CSS still unsafe? | Yes. Current-state CSS remains blocked. |
| Is Phase D CSS still blocked? | Yes. |
| What is the exact recommended next task? | If this readiness note is accepted, implement bounded HelpOverlay launcher ARIA only, with no CSS, token, behavior, routing, progress, or content changes. |
