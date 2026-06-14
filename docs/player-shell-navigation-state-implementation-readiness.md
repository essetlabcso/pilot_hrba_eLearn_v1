# Player Shell Navigation-State Implementation Readiness

## 1. Scope Definition

This documentation-only readiness note prepares Phase D: Navigation State Adoption for the Visual token / player shell adoption stream.

Phase D navigation states means the player shell and closely related navigation surfaces that communicate where the learner is, what can be opened, what is unavailable, and what has been completed.

In scope for readiness:

- active/current player shell tool state;
- selected/current player shell icon state;
- completed navigation state;
- locked navigation state;
- disabled player shell navigation state;
- related accessible state questions such as `disabled`, `aria-disabled`, `aria-current`, status labels, and locked/completed text.

Out of scope for implementation and this first readiness path:

- danger-on-dark;
- modal/accessibility UI migration;
- progress strip migration;
- shell shadow/depth migration;
- global focus migration;
- course-screen states;
- module-specific states;
- routing, progress, locking, assessment, certificate, accessibility toolbar, modal behavior, asset, content, or old HRBA file changes.

This note does not implement CSS, edit token files, edit React components, or change behavior.

## 2. Selector and Component Inventory

| Area | Component or source | Relevant selectors or state source | Current role | Readiness boundary |
| --- | --- | --- | --- | --- |
| Header navigation | `src/components/player/PlayerHeader.tsx`; logic from `src/components/player/CoursePlayerShell.tsx` | `.player-header-button`, `.player-header-button--secondary`, `.player-header-button--primary`, `.player-header-button:disabled` | Previous and Next buttons communicate available/unavailable screen movement. | Disabled state is logic-sensitive because `nextDisabled` depends on screen completion requirements. CSS migration should not change logic or perceived unlock rules. |
| Sidebar tool navigation | `src/components/player/PlayerSidebar.tsx` | `.player-sidebar-button`, `.player-sidebar-button--media`, `.player-sidebar-button.is-active` | Learning tools and media controls. `is-active` indicates an open tool/modal or visible transcript. | Active/current is the narrowest likely future implementation candidate after token decisions. |
| Sidebar current icon marker | `src/components/player/PlayerSidebar.tsx` | `.player-sidebar-button.is-active .player-sidebar-icon` | Reinforces active/current sidebar state. | Must not be migrated alone; icon treatment should support the active/current button state. |
| Sidebar return control | `src/components/player/PlayerSidebar.tsx` | `.player-sidebar-return`, `.player-sidebar-return:hover`, `.player-sidebar-return:focus-visible` | Return to LMS / exit-like action. | Out of scope for Phase D navigation states because it is danger/return behavior. |
| Header exit/course control | `src/components/player/PlayerHeader.tsx` | `.player-header-button--exit`, `.player-header-button--exit:hover`, `.player-header-button--exit:focus-visible` | Course/return action. | Out of scope because danger-on-dark is a separate recipe. |
| Menu drawer screen list | `src/components/player/CoursePlayerShell.tsx` | Inline active style inside menu drawer: active screen border/background/text | Jump-to-screen menu state. | Needs behavior review and likely component/inline-style strategy; not safe as CSS-only first slice. |
| Course roadmap module states | `src/components/platform/CourseRoadmap.tsx`; `src/components/platform/ModuleLaunchCard.tsx` | `.module-launch-card--completed`, `.module-launch-card--in-progress`, `.module-launch-card--locked`, `.module-launch-card__status--completed`, `.module-launch-card__status--in-progress`, `.module-launch-card__status--locked`, `.module-launch-card__cta:disabled` | Platform-level module navigation states for completed, in-progress, locked, and disabled launch CTA. | Relevant to Phase D planning, but not part of the first player shell CSS migration. It touches platform roadmap, not the bounded player shell. |
| Progress strip | `src/components/player/ProgressStrip.tsx`; `src/styles/global.css` | `.player-progress-strip`, inline progress width/background | Indicates current screen progression. | Explicitly out of scope; progress strip migration remains blocked. |

## 3. Current Behavior and Risk

| State | Current behavior | Logic sensitivity | Learner/accessibility risk |
| --- | --- | --- | --- |
| Header disabled | `.player-header-button:disabled` uses opacity, `cursor: not-allowed`, and removes shadow. `PlayerHeader` receives `prevDisabled` and `nextDisabled` from `CoursePlayerShell`. | High. Next button disabled state is tied to screen completion requirements, current screen ID, and progress arrays. | Opacity-only treatment may reduce contrast or make essential navigation state unclear. CSS-only changes could imply progress rules changed when they did not. |
| Sidebar active/current | `.player-sidebar-button.is-active` currently shares the same raw blue border/background pattern as focus-visible. `PlayerSidebar` applies `is-active` when a modal tool is open or transcript is visible. | Medium-high. It reflects modal/tool state, not course progress. | Current/open state can be confused with hover or focus because patterns overlap. Needs a distinct current recipe that does not hide focus. |
| Sidebar selected/current icon | `.player-sidebar-button.is-active .player-sidebar-icon` uses raw `#3B99D4`. | Medium. It is visual-only reinforcement of active/current. | Icon-only current cues are insufficient. Any change must remain paired with button-level active/current treatment. |
| Completed module | `ModuleLaunchCard` uses `status === 'completed'`, class `module-launch-card--completed`, status label `Completed`, status icon, and review CTA. | High. It is based on `completedModules` and drives review mode. | Incorrect visual treatment could make learners think a module is incomplete or still required. Needs text/icon support and should not be mixed with player sidebar tool state. |
| Locked module | `ModuleLaunchCard` uses `status === 'locked'`, class `module-launch-card--locked`, disabled CTA, `aria-disabled`, lock message, and status label `Locked`. | High. It is based on previous-module completion and controls launch availability. | CSS alone could mislead learners if locked state appears clickable or low-contrast. Accessible disabled semantics are already present and must not be changed casually. |
| Disabled roadmap CTA | `.module-launch-card__cta:disabled` and `disabled={isLocked}` are used for locked modules. | High. Disabled behavior blocks launch. | Needs sufficient contrast and a clear label; opacity-only or weak color would fail. |
| Menu drawer active screen | Inline style uses active border/background/text for current screen inside the menu drawer. | High. It changes current screen when clicked and closes the drawer. | Inline styles and route behavior make this unsafe for CSS-only migration without behavior review. |

## 4. Token Readiness

| State area | Existing tokens that may help | Missing semantic token categories | Classification | Notes |
| --- | --- | --- | --- | --- |
| Header disabled on dark | `--cso-color-text-inverse-muted`, `--cso-color-surface-inverse-border`, high contrast base tokens | disabled-on-inverse surface, disabled-on-inverse border, disabled-on-inverse text, high-contrast disabled equivalents | Needs token decision | Current opacity-only recipe should not be migrated until contrast and non-color cues are specified. |
| Sidebar active/current button | `--cso-color-text-inverse`, `--cso-color-focus-dark-surface`, `--cso-color-state-hover-on-inverse-*` for hover only | current-on-inverse surface, current-on-inverse border, current-on-inverse text/icon if needed, high-contrast current mapping | Needs token decision | Do not reuse hover tokens for current; current carries persistent state, not pointer affordance. |
| Sidebar selected/current icon | `--cso-color-text-inverse`, `--cso-color-accent-info` as a candidate only after validation | current-icon-on-inverse surface, current-icon-on-inverse text/icon, high-contrast current icon mapping | Needs token decision | Old raw `#3B99D4` should not be copied blindly. |
| Completed roadmap/module state | `--cso-color-surface-soft-success`, `--cso-color-accent-success`, `--cso-color-text-strong`, `--cso-color-text-secondary` | completed surface, completed border, completed text/icon, high-contrast completed mapping | Needs token decision | Platform roadmap is adjacent to player shell but should be a separate implementation stream or later slice. |
| Locked roadmap/module state | `--cso-color-text-muted` only for nonessential text, `--cso-color-border-color-soft` equivalent exists as `--cso-border-color-soft` | locked surface, locked border, locked text, locked icon, high-contrast locked mapping | Needs token decision and behavior review | Locked/disabled states must not rely on muted text or opacity alone. |
| Menu drawer active screen | Some inverse text/surface tokens exist | drawer current surface, drawer current border, drawer current text, overlay/menu token decision | Needs behavior review | Inline styles should not be treated as a simple CSS selector migration. |
| Progress strip | `--cso-color-accent-info`, `--cso-color-accent-success` | progress track, progress fill, progress completed/current mapping | Should remain out of scope | Progress strip migration is explicitly deferred. |
| Danger/return navigation | `--cso-color-accent-danger` and `--cso-color-text-danger` exist for other contexts | danger-on-inverse surface, border, text, hover, focus relationship | Should remain out of scope | Danger-on-dark requires its own recipe. |

No new token values are proposed in this readiness note. Missing categories require a separate token/category proposal before implementation.

## 5. Accessibility Readiness

| State | Non-color cue status | Accessible state exposure questions | CSS implementation blocker |
| --- | --- | --- | --- |
| Sidebar active/current | Text label remains visible; icon changes visually, but no `aria-current` or `aria-pressed` is currently documented for tool buttons. | Should active modal/tool buttons expose pressed/current state with `aria-pressed`, `aria-expanded`, or another pattern? This is behavior/accessibility review, not CSS. | Yes, for any state recipe that could imply semantic current/selected state beyond visual styling. |
| Header disabled | Native `disabled` is present on buttons. | Native disabled state is exposed, but visual treatment must remain readable. | Needs disabled-on-dark token/contrast decision before CSS migration. |
| Roadmap locked | CTA uses `disabled`, `aria-disabled`, `aria-describedby`, and lock message. | Existing accessible state appears richer than CSS; do not alter behavior. | Needs behavior review and separate platform roadmap scope. |
| Roadmap completed | Status label and icon are visible; review CTA label changes. | Does not appear to use `aria-current`; completed state is communicated by label and icon. | Needs component/state review before token migration. |
| Menu drawer active screen | Active screen is visual only in inline styles. | May need `aria-current="page"` or similar if the drawer is treated as navigation. | Behavior/accessibility question blocks CSS-only migration. |

Accessibility questions must be resolved before a CSS task if the visual change would imply a semantic state that is not exposed to assistive technology.

## 6. Recommended Implementation Order

1. **Documentation-only token/category decision for active/current-on-inverse**
   - Define semantic current-state categories before CSS migration.
   - Include high-contrast mapping and relationship to focus-visible.

2. **Bounded active/current sidebar tool state**
   - Future allowed selectors should be limited to `.player-sidebar-button.is-active` and possibly `.player-sidebar-button.is-active .player-sidebar-icon`.
   - Do not include disabled, locked, completed, danger, menu drawer, roadmap cards, progress strip, or modal styles.

3. **Selected/current icon support**
   - Implement only after button-level active/current recipe is approved.
   - Icon must reinforce current state and must not be the only cue.

4. **Header disabled-on-dark**
   - Requires disabled-on-inverse tokens and contrast review.
   - Must not change `prevDisabled`/`nextDisabled` logic or screen completion gating.

5. **Platform roadmap completed/locked/disabled readiness**
   - Treat as a separate platform/navigation readiness note or implementation stream.
   - Includes `CourseRoadmap` and `ModuleLaunchCard`, not only the player shell.

6. **Menu drawer active screen readiness**
   - Requires inline-style and accessibility behavior review before any visual migration.

Remain blocked:

- danger-on-dark;
- modal/accessibility UI;
- progress strip;
- shell shadow/depth;
- global focus;
- course-screen states;
- module-specific states;
- any routing/progress/locking behavior changes.

## 7. Stop Conditions for Future CSS Task

Future CSS work must stop if:

- CSS change requires progress, locking, routing, assessment, certificate, modal, accessibility toolbar, or React behavior changes;
- selector boundaries are unclear or combine active/current with hover/focus/danger;
- a state lacks a safe semantic token category;
- accessible state semantics are missing and CSS alone could mislead users;
- current state would rely on color alone;
- disabled or locked state would rely on opacity alone;
- active/current treatment would obscure the Phase C focus-visible token behavior;
- high-contrast mapping is undefined for the state being implemented;
- platform roadmap, menu drawer, progress strip, global/course/module styles, or module-specific selectors would be touched unintentionally.

## 8. QA Plan for Future Implementation

Any future Phase D implementation slice should include:

- `npm run build`;
- desktop, tablet, and mobile route QA on `/module-2/screen-2-2?completed=module_01_hrba_foundations`;
- keyboard navigation and Phase C focus-visible regression check;
- active/current sidebar state visual check when a tool/modal or transcript is open;
- disabled header button readability check at first screen and gated screens;
- completed/locked/disabled roadmap readability check only if a later platform roadmap slice is explicitly approved;
- confirmation that progress logic, routing, locking, assessment, certificate, modal behavior, accessibility toolbar behavior, assets, content, and old HRBA files did not change;
- confirmation that no danger, modal/accessibility UI, progress strip, shell shadow, global focus, course-screen, or module-specific styles were migrated.

## 9. Readiness Finding

Phase D is not ready for CSS migration yet.

The smallest likely future implementation slice is bounded active/current sidebar tool state, but it needs a separate semantic token/category decision first:

- current-on-inverse surface;
- current-on-inverse border;
- current icon surface;
- high-contrast current-state mapping;
- relationship to the existing focus-visible token and hover-on-dark tokens.

Header disabled, roadmap completed/locked/disabled, and menu drawer active-screen states should remain deferred until their token and accessibility semantics are reviewed separately.

## 10. Alignment Update Requirement

`docs/design-system-plan-progress-alignment.md` should record that this Phase D readiness note exists, that no CSS or code implementation was done, that broader state migration remains blocked, and that the next step depends on these readiness findings.
