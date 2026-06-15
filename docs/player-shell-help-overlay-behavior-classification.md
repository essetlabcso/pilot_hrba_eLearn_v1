# Player Shell HelpOverlay Behavior Classification

## Purpose

This documentation-only classification resolves the current Help Guide / `HelpOverlay` behavior model before any HelpOverlay ARIA, behavior implementation, current-state CSS, or broader state migration.

This document does not implement code, ARIA, CSS, tokens, focus behavior, overlay behavior, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screen behavior, module CSS, assets, content, or old HRBA file changes.

It follows the completed independent Menu drawer launcher ARIA evaluation in `docs/player-shell-menu-drawer-launcher-aria-evaluation.md`, which records PASS and identifies HelpOverlay behavior classification as the next safe documentation-only step.

## Scope

In scope:

- Help Guide / `HelpOverlay` only;
- behavior classification;
- global Enter-to-close risk decision;
- future focus behavior expectations;
- future accessible structure needs;
- current-state CSS implication for `.player-sidebar-button.is-active`;
- next-task readiness.

Out of scope:

- Menu drawer behavior;
- Menu launcher ARIA;
- Glossary, Resources, and Accessibility modals;
- Captions/transcript;
- CSS implementation;
- token work;
- React implementation;
- routing, progress, assessment, certificate logic, screen completion, `currentScreenId` behavior, accessibility toolbar behavior, course screens, module CSS, assets, content, and old HRBA files;
- active/current CSS, selected/current icon CSS, disabled, completed, locked, danger, progress strip, shell shadow, global focus, course-screen states, and module-specific states.

## Current HelpOverlay Behavior Inventory

| Question | Current finding |
| --- | --- |
| Where is HelpOverlay rendered? | `CoursePlayerShell.tsx` renders `<HelpOverlay onClose={() => handleToggleModal(null)} />` when `state.activeModal === 'help'`. |
| What opens it? | The sidebar `Help Guide` button in `PlayerSidebar.tsx` calls `onToggleModal('help')`. |
| What closes it? | `onClose` closes it by setting `activeModal` to `null`. Current close paths are Escape, global Enter, clicking the full-screen overlay backdrop, and the visible `Got it! Start Learning` button. |
| Does Escape close exist? | Yes. `HelpOverlay.tsx` listens on `window` for `keydown` and closes on `Escape`. |
| Does Enter-to-close exist? | Yes. `HelpOverlay.tsx` also closes on any global `Enter` keydown while mounted. |
| Does outside-click close exist? | Yes. The outer `.help-overlay` click handler closes the overlay. The inner prompt box stops propagation. |
| Is there a visible close affordance? | Yes. The visible button says `Got it! Start Learning`. There is no separate close icon. |
| Is there a visible title/heading? | Yes. The central prompt contains the visible heading `Focused Course Player Guide`. It does not have a stable ID or root labelling relationship. |
| Are role/dialog/overlay semantics present? | No. The root has `className="help-overlay"` and inline styles, but no `role`, `aria-modal`, `aria-labelledby`, `aria-describedby`, or stable root ID. |
| Does focus move into the overlay on open? | No focus movement was observed in the current source. |
| Is focus contained? | No focus containment or trap behavior was observed. |
| Does focus return to the Help launcher on close? | No Help-specific focus return behavior was observed. |
| Does HelpOverlay affect routing, progress, or content? | No. It is controlled only by `activeModal` and `onClose`; no routing, progress, assessment, certificate, screen completion, `currentScreenId`, or content logic changes were observed. |

## Behavior Model Decision

Classification: **coachmark/tutorial overlay with dismissible help panel behavior**.

The HelpOverlay is not a normal content modal in intent. It visually highlights the player shell controls with callouts, arrows, and explanatory copy. It is closer to a tutorial coachmark or instructional overlay than to Glossary, Resources, or Accessibility.

However, the current implementation visually blocks the player and provides overlay-wide dismissal. If the future design keeps that blocking full-screen behavior, it should use modal-like accessibility behavior: focus should move into the overlay, keyboard focus should not remain behind the overlay, Escape should close it, and focus should return to the Help Guide launcher.

This classification means:

- do not treat HelpOverlay as identical to Glossary, Resources, or Accessibility content modals;
- do not treat it as a passive non-modal tooltip;
- do not implement launcher ARIA or CSS from the current code alone;
- create a future HelpOverlay behavior implementation specification before any implementation.

## Global Enter-To-Close Decision

Global Enter-to-close is **unsafe as the long-term behavior**.

Reason:

- Enter is the standard activation key for focused buttons and controls;
- a global Enter listener can close the overlay regardless of which element receives focus;
- future focus movement into the overlay could make Enter behavior ambiguous if focus lands on a button, link, or other interactive element;
- current instructional text says Enter dismisses the guide, but that copy does not resolve the keyboard interaction risk.

Future correction should be handled in a separate behavior specification task. A safer future pattern is to keep Escape close and require explicit activation of the visible dismissal button. If Enter remains supported, it should be scoped to a clearly focused dismissal control rather than a global window listener.

No behavior correction is implemented in this classification.

## Focus Behavior Decision

Future expectations:

- Focus should move into HelpOverlay on open if it continues to visually block the player.
- First focus should land on the primary dismissal button, `Got it! Start Learning`, or on a labelled overlay container/heading only if the future implementation intentionally makes that element programmatically focusable.
- Focus should be contained while the overlay is open if background player controls are visually unavailable.
- Focus should return to the Help Guide sidebar launcher on ordinary close.
- If the Help launcher is unavailable, the fallback should be a safe player-shell control or landmark, preferably the sidebar container/first sidebar tool, then `main.player-main-content` if a course-content focus target is more appropriate.
- Focus behavior should be QA'd with keyboard open, Tab, Shift+Tab, Escape, explicit button close, and any retained outside-click close path.

No focus behavior is implemented in this classification.

## Accessible Structure Decision

Future needs depend on whether the full-screen blocking overlay is retained:

| Structure area | Future decision |
| --- | --- |
| Root role | If the overlay remains blocking, use a dialog-like root such as `role="dialog"` because background controls should not remain keyboard-reachable. If the design changes to a non-blocking coachmark, define a separate non-modal pattern first. |
| `aria-modal` | Use only if the overlay behaves as a modal/blocking surface with focus containment. Do not add it while focus remains behind the overlay. |
| Labelled root/title ID | Required before ARIA implementation. The visible `Focused Course Player Guide` heading should receive a stable ID if used as the accessible label. |
| Description | The main instructional copy can be associated with the root if a stable description ID is added in a future scoped task. |
| Close affordance | The visible `Got it! Start Learning` dismissal button is acceptable as the primary close affordance if it receives focus and has clear button text. A separate close icon is not required by this classification. |
| Escape close | Should remain supported if the overlay is dismissible. |
| Launcher `aria-expanded` / `aria-controls` | Not ready until the root ID, mounted/unmounted behavior, focus movement, and focus return are specified. If implemented later, `aria-controls` should be conditional while the overlay is mounted unless the overlay remains mounted when hidden. |
| `aria-haspopup` | Use only if the future implementation confirms a dialog-like overlay. Do not add it before the behavior model and root semantics are approved. |
| `aria-current` | Do not use. Help Guide opens instructional support and does not represent the current route or page. |

## Current-State CSS Implication

HelpOverlay should **not** be included in broad `.player-sidebar-button.is-active` current-state CSS.

Reasons:

- `.is-active` currently represents several different meanings: open modal, open drawer, open HelpOverlay, and disclosure-open states;
- HelpOverlay is a coachmark/tutorial overlay, not route-current navigation;
- broad active/current styling could make Help Guide look like a selected route or completed navigation state;
- HelpOverlay lacks finalized root semantics, launcher ARIA, focus movement, focus containment, and focus return;
- current-state CSS should not imply a resolved accessibility state.

Future consideration only:

- a narrower selector or data attribute may be needed to distinguish `dialog-open`, `drawer-open`, `coachmark-open`, `disclosure-open`, and route-current states;
- that selector strategy should be documented before any Phase D CSS work.

Phase D current-state CSS remains blocked.

## Readiness Classification

Result: **PASS WITH CAUTION**

The HelpOverlay behavior model is sufficiently classified for the next documentation step, but it is not ready for ARIA, React behavior implementation, or CSS migration.

What can proceed:

- a documentation-only HelpOverlay behavior implementation specification.

What remains blocked:

- HelpOverlay ARIA implementation;
- HelpOverlay focus behavior implementation;
- HelpOverlay global Enter behavior correction;
- HelpOverlay CSS or token work;
- broad `.player-sidebar-button.is-active` CSS;
- active/current, selected/current icon, disabled, completed, locked, danger, progress strip, shell shadow, global focus, course-screen states, and module-specific states.

## Recommended Next Task

Recommended next task: **documentation-only HelpOverlay behavior implementation specification**.

That specification should decide:

- whether the future implementation will use dialog-like root semantics for the blocking coachmark overlay;
- exact root ID and title ID needs;
- whether `aria-modal` is appropriate after focus containment is implemented;
- focus movement on open;
- focus containment while open;
- focus return to the Help Guide launcher on close;
- fallback focus target if the launcher is unavailable;
- whether global Enter-to-close should be removed, narrowed, or replaced;
- whether outside-click close remains acceptable;
- launcher ARIA readiness after behavior is specified.

Do not proceed directly to CSS, token, ARIA, or React implementation from this classification alone.

## Stop Conditions

Future work must stop if:

- HelpOverlay model becomes unclear or changes from blocking coachmark/tutorial overlay;
- global Enter-to-close remains unsafe and unresolved;
- focus destination or focus return is unclear;
- implementation would require CSS or visual layout changes;
- implementation would touch Menu drawer, Menu launcher ARIA, GlossaryModal, ResourcesModal, AccessibilityModal, Captions/transcript, routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, module CSS, or old HRBA files;
- current-state CSS is proposed before HelpOverlay status and selector strategy are resolved;
- one broad `.player-sidebar-button.is-active` selector is used to represent modal, drawer, coachmark, disclosure, and route-current states.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is HelpOverlay behavior model resolved? | PASS WITH CAUTION. It is classified as a coachmark/tutorial overlay with dismissible help panel behavior, requiring modal-like accessibility behavior if it remains full-screen and blocking. |
| Is HelpOverlay implementation ready? | No. A documentation-only behavior implementation specification is needed first. |
| Is HelpOverlay launcher ARIA ready? | No. Root ID, title ID, focus movement, focus containment, focus return, and mounted/unmounted behavior must be specified first. |
| Is global Enter-to-close safe? | No. It is unsafe as a long-term global behavior and needs a future behavior correction decision. |
| Is focus behavior clear? | Clear enough to specify next, but not implemented: focus should move into the overlay, remain contained if blocking, and return to the Help Guide launcher on close. |
| Is broad `.player-sidebar-button.is-active` CSS still unsafe? | Yes. HelpOverlay still contributes to mixed `.is-active` meanings, so broad current-state CSS remains blocked. |
| What is the exact recommended next task? | Create a documentation-only HelpOverlay behavior implementation specification. |
| Are CSS and tokens still out of scope? | Yes. CSS and tokens remain out of scope. |
| Is Phase D CSS still blocked? | Yes. Phase D CSS remains blocked until behavior, ARIA readiness, selector strategy, and QA gates are separately approved. |
