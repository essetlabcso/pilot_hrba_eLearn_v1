# Player Shell Interaction-State Recipe Specification

## 1. Purpose and Alignment Reference

This documentation-only specification follows `docs/player-shell-state-recipe-decision.md` and is required before any further player shell interaction-state implementation.

The design-system alignment document currently pauses implementation until this recipe specification is created and reviewed. This document defines the intended meanings, selector boundaries, token categories, accessibility requirements, non-color cues, QA checks, and stop conditions for future player shell state work.

Master plan areas:

- Interaction state recipes;
- Focus/accessibility states.

Implementation stream:

- Visual System Stream: Token Foundation and Player Shell Adoption.

This specification does not implement CSS, edit token files, change React behavior, alter routing/progress/locking/assessment/certificate logic, migrate modal/accessibility UI, or touch old HRBA course files.

## 2. Scope and Non-Scope

### In Scope

- non-danger hover-on-dark for player shell buttons;
- active/current sidebar tool state;
- selected/current sidebar icon state;
- disabled-on-dark;
- danger-on-dark;
- focus-visible relationship to hover, active/current, disabled, and danger states.

### Out of Scope

- CSS implementation;
- token file edits;
- React behavior changes;
- modal/accessibility UI migration;
- progress strip migration;
- shell shadow/depth migration;
- global focus migration;
- course-screen states;
- module-specific styles.

## 3. Current State Baseline

Current known baseline from the inventory and QA:

- bounded player shell focus-visible token adoption is complete for `.player-header-button:focus-visible`, `.player-sidebar-button:focus-visible`, and `.player-sidebar-return:focus-visible`;
- Phase C QA confirmed `--cso-color-focus-dark-surface` resolves to `#FBBF24` and computes as `rgb(251, 191, 36)` on the checked route and viewports;
- hover, active/current, disabled, danger, modal/accessibility UI, progress strip, and shell shadows remain legacy or undecided;
- active/current sidebar tool state currently shares visual patterns with hover/focus in some selectors;
- danger states use separate raw red/pink patterns and require semantic treatment;
- modal/accessibility UI remains blocked pending behavior review.

## 4. State Semantics and Hierarchy

### State Meanings

- **Default:** The control is available but not currently interacted with or selected.
- **Hover:** A pointer is over an enabled non-danger control. Hover should confirm interactivity without implying current selection.
- **Focus-visible:** Keyboard focus is on a control. It must remain distinct from hover and must use the approved focus-on-dark token behavior already validated in Phase C.
- **Active/current:** A sidebar tool, modal entry, or transcript/media control represents the currently open or active player tool state.
- **Selected/current icon:** The icon marker inside an active/current sidebar tool reinforces the current state but must not be the only current-state cue.
- **Disabled:** A control is unavailable. Disabled state must not rely on opacity alone if contrast or meaning becomes weak.
- **Danger default:** Exit/return-like controls that may leave or interrupt the learning flow.
- **Danger hover:** Pointer affordance for danger controls. It must remain calmer than error feedback and must not overpower the shell.
- **Danger focus-visible:** Keyboard focus on a danger control. Focus visibility must take priority over danger styling.

### Priority When States Combine

1. Disabled takes precedence over hover, active, and danger hover. Disabled controls should not show pointer hover emphasis.
2. Focus-visible takes priority over hover and active/current backgrounds because keyboard location must remain unmistakable.
3. Danger focus-visible must show the focus token clearly, while retaining enough danger identity through text, border, label, or icon.
4. Active/current takes precedence over hover for current sidebar tools; hover may add subtle affordance only if it does not obscure current state.
5. Selected/current icon reinforces active/current state but must not replace text, border, or state label cues.

## 5. Recipe Table

| State area | Intended learner meaning | Allowed selector family | Allowed token category | Prohibited changes | Accessibility requirements | Non-color cue requirements | Readiness | Risk level |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Non-danger hover-on-dark | The control is interactive under pointer. | `.player-header-button:hover:not(:disabled)` excluding `.player-header-button--exit`; `.player-sidebar-button:hover` excluding danger/return controls. | Missing: hover-on-dark surface and hover-on-dark border. Existing text tokens may remain unchanged. | No focus, active/current, disabled, danger, modal, layout, spacing, shadow, or React changes. | Hover must not replace keyboard focus; reduced-motion behavior must be respected if transform remains. | Hover should use surface/border change, not color-only text change. | Needs token decision | Medium-high |
| Active/current sidebar tool | This tool/modal/transcript state is currently open or active. | `.player-sidebar-button.is-active`; `PlayerSidebar.tsx` class usage is behavior reference only, not edit scope. | Missing: active/current-on-dark surface, border, text/icon support. | No React behavior changes; no modal behavior changes; no hover or focus rewrite. | Current state must remain visible on dark surfaces and high contrast mode. | Must include at least two cues where possible: surface/border plus icon, label, weight, or shape. | Needs token decision and behavior review | High |
| Selected/current sidebar icon | The icon reinforces the active/current sidebar tool. | `.player-sidebar-button.is-active .player-sidebar-icon`. | Missing: current icon surface; token may require contrast validation. | Do not reuse old raw `#3B99D4` blindly; do not make icon the only state cue. | Icon contrast must pass against text/icon foreground and surrounding surface. | Icon must be paired with active/current button treatment. | Needs token decision | High |
| Disabled-on-dark | A shell control is unavailable. | `.player-header-button:disabled`; future sidebar disabled selectors only if they already exist and are explicitly scoped. | Missing: disabled-on-dark text, border, and surface categories. | No progress/locking logic changes; no route/behavior changes. | Disabled state must remain readable and understandable, and must not rely on opacity alone if contrast weakens. | Use text, label, cursor, surface, border, or icon support; avoid opacity-only meaning. | Needs token/spec update | High |
| Danger-on-dark | Exit/return controls may interrupt or leave learning. | `.player-header-button--exit`; `.player-header-button--exit:hover`; `.player-sidebar-return`; `.player-sidebar-return:hover`. | Missing: danger-on-dark text, border, default surface, hover surface, and focus relationship categories. Existing `--cso-color-accent-danger` may support borders only after contrast review. | No normal hover migration; no active/current migration; no behavior changes. | Danger must be understandable, contrast-safe, and not visually overwhelming. Focus-visible must remain primary for keyboard users. | Danger must use text/label and border or icon support, not red alone. | Needs token/spec update | High |
| Focus-visible relationship rule | Keyboard users can identify the focused shell control. | `.player-header-button:focus-visible`; `.player-sidebar-button:focus-visible`; `.player-sidebar-return:focus-visible`. | Existing: `--cso-color-focus-dark-surface`; possible missing: focus width/offset/halo categories. | Do not replace global `*:focus-visible`; do not remove existing Phase C rule without QA. | Focus must remain visible, unclipped, and separate from hover. | Focus outline is the primary cue; state text/icon can support but not replace it. | Ready for preservation, not further migration | Medium |

## 6. Token Category Mapping

No new token values are created in this document.

| Needed category | Existing approved token available? | Current mapping decision | Gap or validation need |
| --- | --- | --- | --- |
| hover-on-dark surface | No | Do not implement yet. | Define a semantic token or approved alias before CSS migration. |
| hover-on-dark border | No | Do not implement yet. | Define a semantic token or approved alias before CSS migration. |
| active/current-on-dark surface | No | Do not implement yet. | Needs semantic current-state token and high contrast mapping. |
| active/current-on-dark border | No | Do not implement yet. | Needs border token or approved alias with contrast validation. |
| current icon surface | No | Do not implement yet. | Needs icon-surface token and contrast validation; old `#3B99D4` is not approved for direct reuse. |
| disabled-on-dark text | No | Do not implement yet. | Needs readable disabled text rule that does not rely on opacity alone. |
| disabled-on-dark border | No | Do not implement yet. | Needs dark-surface disabled border recipe. |
| disabled-on-dark surface | No | Do not implement yet. | Needs disabled surface recipe and high contrast equivalent. |
| danger-on-dark text | No | Do not implement yet. | Existing danger tokens are not enough for inverse/dark shell text without validation. |
| danger-on-dark border | Partial | `--cso-color-accent-danger` exists, but requires dark-surface validation. | Validate on dark shell and high contrast mode before implementation. |
| danger-on-dark hover surface | No | Do not implement yet. | Needs semantic hover surface recipe. |
| focus-on-dark outline | Yes | `--cso-color-focus-dark-surface` is approved and implemented for bounded shell focus-visible. | Preserve Phase C behavior; do not broaden scope without QA. |
| focus width/offset/halo | Partial/missing | Existing global width/offset remain inherited. | Tokenize only in a separate focus recipe if needed. |

## 7. Accessibility Rules

- Keyboard focus must remain distinct from hover.
- Focus-visible must remain visible on dark shell surfaces and must not be obscured by hover, active/current, disabled, or danger styles.
- Active/current state should not rely on color alone where possible.
- Selected/current icon state must not be the only current-state cue.
- Disabled state must not rely on opacity alone if text contrast or learner meaning becomes weak.
- Danger state must remain understandable, contrast-safe, and not visually overwhelming.
- Reduced-motion behavior must be considered before keeping hover transforms as state feedback.
- High contrast mode must define equivalents for hover, active/current, selected/current icon, disabled, danger, and focus-visible.
- State changes must not alter navigation, routing, progress, locking, assessment, certificate, modal, or accessibility toolbar behavior.

## 8. Recommended Implementation Order

1. **Non-danger hover-on-dark only**
   - Comes first because it is the least semantic state if it is limited to pointer affordance and excludes active/current, disabled, and danger.
   - It is not ready until hover-on-dark surface and border token categories are approved.

2. **Active/current sidebar tool state**
   - Comes after hover because active/current carries orientation and tool/modal meaning.
   - It requires non-color cues and behavior-safe QA.

3. **Selected/current sidebar icon state**
   - Comes after active/current button treatment because the icon must reinforce, not replace, the current-state cue.
   - It requires an approved current icon surface token or alias.

4. **Disabled-on-dark**
   - Comes after current-state semantics because disabled state may intersect with navigation availability.
   - It requires a non-opacity-only recipe.

5. **Danger-on-dark**
   - Comes after disabled/current recipes because danger controls carry exit/return semantics and should not be mixed with normal hover.
   - It requires contrast validation and focus relationship rules.

6. **Broader/global/course states only later**
   - Comes after player shell recipes are proven and QA evidence exists.
   - Course-screen and module-specific states must wait for component/template governance.

## 9. First Implementation Candidate

The first future implementation candidate is **not ready yet**.

Likely candidate after approval:

- non-danger hover-on-dark for player shell buttons only.

Blocked until these decisions are approved:

- hover-on-dark surface category;
- hover-on-dark border category;
- whether hover transform remains allowed and how reduced motion affects it;
- clear separation from focus-visible, active/current, disabled, and danger states.

### Future Allowed Selectors After Approval

- `.player-header-button:hover:not(:disabled)` only when excluding `.player-header-button--exit`;
- `.player-sidebar-button:hover` only for non-danger sidebar tool buttons;
- `.player-sidebar-button--media:hover` only if media hover is explicitly included.

### Future Prohibited Changes

- no `.player-header-button--exit` migration;
- no `.player-sidebar-return` migration;
- no `.player-sidebar-button.is-active` migration;
- no `.player-sidebar-button.is-active .player-sidebar-icon` migration;
- no `.player-header-button:disabled` migration;
- no modal/accessibility UI migration;
- no progress strip migration;
- no shell shadow/depth migration;
- no global focus migration;
- no course-screen or module-specific selectors;
- no React, token file, routing, progress, assessment, or old course file changes.

### Future Validation Route and Viewports

Route:

- `/module-2/screen-2-2?completed=module_01_hrba_foundations`

Viewports:

- `1440 x 900`;
- `768 x 900`;
- `390 x 844`.

### Future QA Requirements

- build passes;
- hover affordance is visible on dark shell surfaces;
- focus-visible remains `--cso-color-focus-dark-surface`;
- active/current sidebar state is unchanged unless explicitly scoped;
- disabled state is unchanged unless explicitly scoped;
- danger controls are unchanged unless explicitly scoped;
- no shell-caused horizontal scrolling appears;
- Module 2 S02 CTA remains visible or reachable.

### Future Stop Conditions

- stop if a required hover token does not exist;
- stop if hover cannot be separated from active/current selectors;
- stop if danger controls would be affected;
- stop if disabled controls would be affected;
- stop if React behavior changes are required;
- stop if modal/accessibility UI, progress strip, shell shadow, course-screen, or module-specific selectors would be touched.

## 10. Deferred Items

Deferred until separate approval:

- modal/accessibility UI;
- progress strip;
- shell shadow/depth;
- global focus;
- course-screen states;
- module-specific states;
- React behavior changes;
- routing/progress/locking/assessment/certificate behavior;
- accessibility toolbar behavior;
- asset or old HRBA course file changes.

## 11. Acceptance Criteria for This Specification

Reviewers should check that this specification:

- preserves Phase C focus-visible behavior;
- separates hover from focus-visible and active/current;
- treats danger-on-dark separately from normal hover;
- treats disabled-on-dark as an accessibility state, not an opacity-only visual state;
- requires non-color cues for active/current and selected/current icon states where possible;
- documents missing token categories instead of inventing token values;
- keeps modal/accessibility UI blocked pending behavior review;
- keeps progress strip and shell depth out of interaction-state migration;
- keeps course-screen and module-specific states out of scope;
- defines clear stop conditions before implementation.

## 12. Alignment Update Requirement

`docs/design-system-plan-progress-alignment.md` should be updated after this specification is reviewed and accepted, before any implementation begins.

Recommended alignment update after review:

- add this specification to completed evidence;
- move Interaction state recipes from Not started to Partial only if the specification is accepted;
- keep implementation paused until the missing hover/current/disabled/danger token categories are resolved or an approved alias strategy is documented;
- keep modal/accessibility UI blocked pending behavior review.

No implementation should begin until this specification is reviewed and the required token/spec gaps for the selected first slice are accepted.
