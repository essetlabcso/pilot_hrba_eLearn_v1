# Player Shell Modal/Drawer Behavior Review

## 1. Purpose

This documentation-only review determines whether player sidebar modal and drawer controls are ready for ARIA implementation or current-state CSS migration.

It follows the current alignment status in `docs/design-system-plan-progress-alignment.md`: the Captions/transcript disclosure semantics slice is implemented and QA passed, while Phase D CSS remains blocked and modal launcher/menu drawer ARIA requires separate behavior review.

This review does not implement code, ARIA, CSS, tokens, or behavior. It records current behavior and readiness only.

## 2. In-Scope Controls

In scope:

- Menu drawer
- Glossary modal
- Resources modal
- Help Guide / `HelpOverlay`
- Accessibility modal

Out of scope:

- Captions/transcript, because it has already been implemented and QA'd separately in `docs/player-shell-captions-transcript-accessibility-qa.md`
- Play/Pause, Audio, Reload, Return to LMS, header buttons, progress strip, course-screen states, and module-specific states

## 3. Current Behavior Inventory

| Control | Rendered in | Opened by | Closed by | Surface type | Role/dialog semantics | Title/label | Escape close | Outside-click close | Close button/label | Focus moves into surface | Focus returns to launcher | Focus trapped/contained |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Menu | `CoursePlayerShell.tsx`, inline conditional block when `state.activeModal === 'menu'` | Sidebar `Menu` button calls `onToggleModal('menu')` | Backdrop click, selecting a screen, or toggling active modal to `null` | Drawer-like panel inside fixed overlay; mixed drawer/modal behavior | No `role="dialog"`, no `aria-modal`, no labelled root | Visible `h3` text: `Jump to Screen`; no stable label ID | No Escape handler observed | Yes, outer fixed overlay click closes | No dedicated close button; screen selection closes | No focus movement observed | No focus return logic observed | No focus trap/containment observed |
| Glossary | `GlossaryModal.tsx`, rendered from `CoursePlayerShell.tsx` when `state.activeModal === 'glossary'` | Sidebar `Glossary` button calls `onToggleModal('glossary')` | Escape, backdrop click, close icon, `Close Glossary` button | Modal dialog | `role="dialog"`, `aria-modal="true"`, `aria-labelledby="glossary-modal-title"` | `h3 id="glossary-modal-title"` | Yes | Yes | Yes; close icon has `aria-label="Close glossary"` and footer button says `Close Glossary` | Yes, close button receives focus on mount | No focus return logic observed | No focus trap/containment observed |
| Resources | `ResourcesModal.tsx`, rendered from `CoursePlayerShell.tsx` when `state.activeModal === 'resources'` | Sidebar `Resources` button calls `onToggleModal('resources')` | Escape, backdrop click, close icon, `Close Resources` button | Modal dialog | `role="dialog"`, `aria-modal="true"`, `aria-labelledby="resources-modal-title"` | `h3 id="resources-modal-title"` | Yes | Yes | Yes; close icon has `aria-label="Close resources"` and footer button says `Close Resources` | Yes, close button receives focus on mount | No focus return logic observed | No focus trap/containment observed |
| Help Guide | `HelpOverlay.tsx`, rendered from `CoursePlayerShell.tsx` when `state.activeModal === 'help'` | Sidebar `Help Guide` button calls `onToggleModal('help')` | Escape, Enter, backdrop click, `Got it! Start Learning` button | Full-screen help overlay/coachmark; mixed overlay behavior | No `role="dialog"`, no `aria-modal`, no labelled root | Visible `Focused Course Player Guide` heading, but no stable ID or dialog label relationship | Yes; Enter also closes globally | Yes | Yes, visible button text closes; no explicit close-label pattern beyond text | No focus movement observed | No focus return logic observed | No focus trap/containment observed |
| Accessibility | `AccessibilityModal.tsx`, rendered from `CoursePlayerShell.tsx` when `state.activeModal === 'accessibility'` | Sidebar `Accessibility` button calls `onToggleModal('accessibility')` | Escape, backdrop click, close icon, `Close Settings` button | Modal dialog | `role="dialog"`, `aria-modal="true"`, `aria-labelledby="a11y-modal-title"` | `h3 id="a11y-modal-title"` | Yes | Yes | Yes; close icon has `aria-label="Close modal"` and footer button says `Close Settings` | Yes, close button receives focus on mount | No focus return logic observed | No focus trap/containment observed |

## 4. Behavior Classification

| Control | Classification | Rationale |
| --- | --- | --- |
| Menu | Needs drawer behavior specification first | It behaves like a drawer over the stage, has outside-click close and item-selection close, but lacks role semantics, Escape handling, focus movement, focus return, a close button, and clear drawer-vs-dialog classification. |
| Glossary | Needs modal behavior specification first | It already has dialog role semantics, title, Escape close, outside-click close, close controls, and initial focus, but lacks documented focus return and focus containment/trap behavior. |
| Resources | Needs modal behavior specification first | It follows the same partial dialog pattern as Glossary, with added inner resource buttons and placeholder download behavior. Launcher ARIA should wait until modal focus behavior is specified. |
| Help Guide | Unsafe for ARIA/CSS migration until behavior is clarified | It is a full-screen overlay/coachmark with no dialog role, no labelled root, no initial focus movement, no focus trap, global Enter-to-close behavior, and mixed instructional overlay semantics. |
| Accessibility | Needs modal behavior specification first | It has dialog semantics and initial focus, but it affects accessibility support itself and still lacks focus return and focus containment/trap review. |

## 5. Stable ID and ARIA Readiness

| Control | `aria-expanded` readiness | `aria-controls` readiness | `aria-haspopup="dialog"` readiness | Stable controlled-region ID readiness | Dynamic aria-label readiness | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Menu | Not ready | Not ready | Not ready | Needs drawer ID decision | Needs review | The surface may be a drawer rather than a dialog. It needs a drawer behavior specification before launcher ARIA. |
| Glossary | Potentially ready after modal behavior spec | Needs modal root ID | Potentially appropriate after modal behavior spec | Needs root ID; title ID exists | Ready in principle | Because the modal is conditionally rendered, future `aria-controls` may need the same conditional strategy used for Captions unless the modal remains mounted. |
| Resources | Potentially ready after modal behavior spec | Needs modal root ID | Potentially appropriate after modal behavior spec | Needs root ID; title ID exists | Ready in principle | Placeholder download buttons add behavior complexity, so modal focus containment should be specified before launcher ARIA. |
| Help Guide | Not ready | Not ready | Not ready | Needs overlay/coachmark role decision | Needs review | The surface may not be a true dialog. It needs a help overlay behavior specification before ARIA can be assigned safely. |
| Accessibility | Potentially ready after modal behavior spec | Needs modal root ID | Potentially appropriate after modal behavior spec | Needs root ID; title ID exists | Ready in principle | Because this modal represents accessibility support, behavior and focus rules should be reviewed before adding launcher ARIA. |

Do not implement any of these ARIA attributes from this review alone.

## 6. CSS Readiness Implication

Current-state CSS should not yet be applied broadly to `.player-sidebar-button.is-active` for player sidebar modal/drawer controls.

Reasons:

- `.is-active` currently represents different meanings: open modal, open drawer, and the already-handled Captions/transcript disclosure state.
- Menu, Help, Glossary, Resources, and Accessibility do not yet share a single confirmed ARIA or behavior pattern.
- Applying current-state CSS to all active sidebar buttons could imply a resolved current/selected state while accessible state semantics remain incomplete.
- Menu drawer and modal launchers may need separate selector families or future data attributes so drawer-open, dialog-open, and route-current states are not visually conflated.

Phase D current-state CSS remains blocked.

## 7. Recommended Next Step

Recommended next step:

Create a documentation-only modal accessibility behavior specification for Glossary, Resources, Help, and Accessibility, with a separate Menu drawer behavior subsection or separate Menu drawer behavior specification.

The next document should decide:

- whether Menu is a drawer, dialog, disclosure, or navigation overlay;
- whether Help is a dialog, coachmark overlay, or dismissible instructional overlay;
- whether modal launchers should use `aria-haspopup="dialog"`;
- how `aria-expanded` and conditional `aria-controls` should behave for conditionally rendered surfaces;
- stable root IDs for each controlled surface;
- focus movement on open;
- focus return to the launching sidebar button on close;
- focus trap or containment expectations;
- Escape behavior consistency;
- whether outside-click close remains appropriate for each surface.

Do not proceed to CSS implementation until this behavior specification is complete and reviewed.

## 8. Stop Conditions for Future Work

Future work must stop if:

- focus management is unclear;
- dialog/drawer semantics are inconsistent;
- stable controlled-region IDs are unclear;
- one ARIA pattern would incorrectly cover drawer and modal surfaces;
- CSS would style active/current modal controls before accessible state semantics are ready;
- implementation would touch CSS, token files, routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, or old HRBA files outside a separately approved scope.

## 9. Final Readiness Finding

The modal/drawer controls are not ready for Phase D current-state CSS.

Glossary, Resources, and Accessibility are closest to ARIA readiness because they already have dialog semantics and initial focus movement, but they still need modal focus return and containment decisions. Menu and Help need behavior classification before ARIA or CSS migration.
