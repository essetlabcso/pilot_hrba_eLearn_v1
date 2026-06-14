# Player Shell Hover-on-Dark Token/Alias Decision

## 1. Purpose and Alignment Reference

This documentation-only decision follows `docs/player-shell-interaction-state-recipe-specification.md` and is required before any player shell hover implementation. It belongs to the Interaction state recipes master plan area and the Visual System Stream: Token Foundation and Player Shell Adoption.

The current alignment status is that interaction state recipes are partial, the player shell interaction-state recipe specification is complete, and implementation remains paused. The first likely future implementation candidate is non-danger hover-on-dark only, but it is blocked until hover-on-dark surface and border token categories or an approved alias strategy are reviewed.

This document decides whether the first future player shell hover-on-dark implementation slice can use existing approved tokens as aliases, or whether new semantic hover-on-dark token categories must be added first.

## 2. Scope and Non-Scope

In scope:

- non-danger hover-on-dark surface;
- non-danger hover-on-dark border;
- whether an alias strategy is acceptable;
- whether hover transform remains allowed;
- reduced-motion relationship;
- separation from focus-visible, active/current, selected/current icon, disabled, and danger states.

Out of scope:

- CSS implementation;
- token file edits;
- React behavior changes;
- active/current state;
- disabled-on-dark;
- danger-on-dark;
- modal/accessibility UI;
- progress strip;
- shell shadow/depth;
- global focus;
- course-screen/module-specific states.

## 3. Current Baseline

The current baseline from the state/modal inventory, state recipe decision, and Phase C QA is:

- focus-visible is tokenized for the bounded player shell controls and QA passed;
- focus-visible uses `--cso-color-focus-dark-surface`;
- hover-on-dark is not tokenized;
- header hover currently uses movement only in some cases;
- sidebar hover currently uses legacy blue rgba surface and border values;
- danger/return hover currently uses legacy danger rgba values;
- hover is partly entangled with focus, active/current, and danger patterns;
- the likely first implementation candidate is non-danger hover-on-dark only.

The next implementation must not accidentally redefine active/current sidebar tools, selected/current icon markers, disabled states, danger states, modal/accessibility UI, progress strip, shell shadows, global focus, course-screen states, or module-specific states.

## 4. Existing Token Review

The following existing tokens are relevant candidates. They are reviewed only as approved current tokens, not as new token values.

| Existing token | Current role | Hover-on-dark surface support | Hover-on-dark border support | Text/icon preservation | High contrast mapping | Contrast and dark-shell safety | Decision note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--cso-color-surface-inverse` | Primary dark shell/header surface. | Not suitable as a hover alias because it is the base shell surface. | Not suitable as a border alias. | Supports existing inverse text contrast as a background. | High contrast equivalent exists through high contrast background/surface tokens, but not as hover. | Strong inverse text contrast. | Preserve as base surface only. |
| `--cso-color-surface-inverse-raised` | Secondary dark navigation/sidebar surface. | Not sufficient as a hover alias where the sidebar already uses this value. | Not suitable as a border alias. | Supports existing inverse text contrast as a background. | High contrast equivalent exists through high contrast surface token, but not as hover. | Strong inverse text contrast. | Preserve as raised/base sidebar surface only. |
| `--cso-color-surface-inverse-border` | Subtle dark separator/border. | Not suitable as a hover surface alias because the token is documented as border/separator structure. | Possible border candidate, but not approved as a state border. | Does not affect text/icon color. | No explicit high contrast hover-border mapping. | Useful separator value, but not enough as the only hover cue. | Do not use for hover until an alias strategy is explicitly approved. |
| `--cso-border-color-inverse` | Dark inverse border token matching inverse border value. | Not suitable as a surface alias. | Possible border candidate, but not semantically a hover state token. | Does not affect text/icon color. | No explicit high contrast hover-border mapping. | Same structural limitation as inverse border. | Do not use for hover until an alias strategy is explicitly approved. |
| `--cso-color-text-inverse` | Primary text on dark surfaces. | Not a surface token. | Not a border token. | Should remain the default readable text/icon color for non-danger hover unless a future recipe says otherwise. | High contrast text token exists. | Strong contrast on inverse and inverse-raised surfaces. | Preserve text/icon color; do not use hover to change text alone. |
| `--cso-color-text-inverse-muted` | Secondary text on dark surfaces. | Not a surface token. | Not a border token. | Can preserve secondary labels, but should not become the sole hover cue. | High contrast mapping needs state review. | Suitable for secondary text when contrast is validated. | Preserve existing secondary role. |
| `--cso-color-focus-dark-surface` | Focus ring on dark surfaces. | Not a hover surface token. | Not a hover border token. | Focus must remain visually distinct from hover. | High contrast focus token exists separately. | QA passed for bounded player shell focus-visible. | Preserve for keyboard focus only. |
| `--cso-color-action-primary` / `--cso-color-accent-info` | Primary action/info accent. | Not approved for player shell hover surfaces. | Not approved for player shell hover border in this decision. | Could create confusion with active/current or primary CTA meaning. | Requires state-specific high contrast mapping. | Good CTA color, but semantically too strong for generic hover. | Do not use for hover-on-dark in the first slice. |
| `--cso-color-accent-danger` | Danger accent/border. | Out of scope for non-danger hover. | Out of scope for non-danger hover. | Danger states need separate recipe. | Requires danger high contrast mapping. | Must be validated on dark shell before danger use. | Defer to danger-on-dark decision. |
| `--cso-color-high-contrast-background`, `--cso-color-high-contrast-surface`, `--cso-color-high-contrast-text`, `--cso-color-high-contrast-focus`, `--cso-color-high-contrast-link` | High contrast base layer. | No specific hover-on-dark surface token exists. | No specific hover-on-dark border token exists. | Text and focus equivalents exist, but state equivalents do not. | Base high contrast layer exists. | State mapping is incomplete. | High contrast hover equivalents must be defined before implementation. |
| `--cso-motion-reduce` | Reduced-motion planning variable. | Not a visual state token. | Not a border token. | Does not affect color. | Supports motion policy, not state color. | Motion policy still needs implementation recipe. | Use as planning evidence only; do not implement motion changes here. |

Review conclusion: existing base inverse surface, border, text, focus, and high contrast tokens are useful evidence, but they do not provide a complete semantic hover-on-dark recipe. Reusing structural inverse border or base inverse surfaces as hover aliases would be easy, but it would blur token intent and may create weak or invisible hover affordance on the current dark sidebar.

## 5. Alias Strategy Options

| Option | Benefits | Risks | Accessibility implications | Implementation readiness | Premium visual system impact |
| --- | --- | --- | --- | --- | --- |
| Option A: use existing inverse border/surface tokens as hover aliases | No token file edits; uses already approved values; keeps scope small. | `--cso-color-surface-inverse-raised` may match the current sidebar base and produce no visible hover; inverse border is structural, not a state token; high contrast hover mapping remains undefined. | Hover affordance may be too subtle or color-only; keyboard focus remains separate, but pointer affordance may be weak. | Not ready without explicit alias approval and QA criteria. | Risk of making the premium shell feel inert or under-specified. |
| Option B: require new semantic hover-on-dark categories before implementation | Preserves token meaning; creates clear state semantics; supports high contrast planning; avoids overloading structural tokens. | Requires a later token-spec or token-file update before CSS implementation; slows migration. | Best path for readable, visible, non-color-only, high contrast-aware hover behavior. | Documentation-ready, but implementation remains blocked until categories are approved and later implemented. | Strongest fit with the premium visual system because state treatment can be intentional and reusable. |
| Option C: defer hover implementation and proceed to another documentation-only planning task | Avoids unsafe implementation; keeps CSS stable. | Leaves hover-on-dark legacy values in place longer; may delay visible state cleanup. | Safe short-term because Phase C focus-visible already protects keyboard users, but pointer hover remains legacy. | Ready as a planning fallback only. | Preserves stability but does not advance visual refinement. |

## 6. Decision

Decision: **new semantic hover-on-dark token categories are required before implementation.**

An alias strategy is **not approved** for the first non-danger hover-on-dark implementation slice at this time.

Reason:

- existing inverse surface tokens are base surface tokens, not hover state tokens;
- existing inverse border tokens are structural border/separator tokens, not state border tokens;
- reusing `--cso-color-surface-inverse-raised` as hover surface may be invisible where it matches the sidebar base;
- reusing `--cso-color-surface-inverse-border` as hover border may be too subtle and color-only;
- high contrast hover equivalents are not defined;
- the interaction-state recipe specification requires hover to remain distinct from focus-visible, active/current, disabled, and danger states.

Implementation remains paused. The next safe step after review is to update the token specification or create a token-category decision for semantic hover-on-dark state tokens, still documentation-only unless a separate implementation task is approved.

## 7. If Alias Strategy Is Approved

No alias strategy is approved by this decision.

If a future reviewer overrides this decision and approves an alias strategy, the future implementation guardrails must include:

- allowed alias tokens must be named explicitly before CSS changes;
- selector scope must be limited to non-danger player shell hover selectors only;
- active/current, selected/current icon, disabled, danger, focus-visible, modal/accessibility UI, progress strip, shell shadow/depth, global focus, course-screen, and module-specific selectors must remain unchanged;
- text/icon colors should remain on existing inverse text tokens unless a separate text/icon state decision exists;
- hover must not rely on text color change alone;
- QA must verify desktop, tablet, and mobile behavior on `/module-2/screen-2-2?completed=module_01_hrba_foundations`;
- QA must verify that Phase C focus-visible remains visually distinct and visible;
- QA must verify no active/current or danger state was unintentionally changed.

Because this document does not approve aliases, these guardrails are reference-only.

## 8. If New Token Categories Are Required

The following semantic token categories are required before hover-on-dark implementation. No values are assigned here.

| Needed category | Purpose | Notes |
| --- | --- | --- |
| `hover-on-dark surface` | Subtle surface change for non-danger hover on dark shell controls. | Must be visible against inverse and inverse-raised backgrounds without becoming active/current. |
| `hover-on-dark border` | Border or outline-adjacent support for non-danger hover on dark shell controls. | Must be visible but lower priority than focus-visible. |
| `hover-on-dark text/icon` | Optional text/icon adjustment if the base inverse text tokens are not sufficient. | Prefer preserving existing inverse text/icon tokens unless contrast testing requires otherwise. |
| `high contrast hover-on-dark surface` | High contrast equivalent for hover surface. | Must not reduce readability or conflict with focus. |
| `high contrast hover-on-dark border` | High contrast equivalent for hover border. | Must remain distinct from high contrast focus. |

These categories should be added to the implementation-ready token specification before token files or CSS selectors are changed.

## 9. Motion and Reduced-Motion Decision

Existing hover transforms may remain temporarily as legacy behavior, but they should not be expanded or treated as the final hover recipe.

Future hover implementation should follow these rules:

- hover motion must not be the only affordance;
- hover must include an approved surface and/or border treatment;
- focus-visible must not depend on hover motion;
- any transform or movement must respect reduced-motion rules;
- if reduced-motion handling cannot be verified without broader behavior changes, the hover implementation should preserve current motion behavior and only migrate approved color/border values after review;
- do not add new transitions, transforms, timing, easing, or motion values in the first hover-on-dark CSS slice.

## 10. Deferred Items

Deferred until separate decisions or implementation scopes:

- active/current sidebar tool state;
- selected/current sidebar icon state;
- disabled-on-dark;
- danger-on-dark;
- modal/accessibility UI;
- progress strip;
- shell shadow/depth;
- global/course-screen/module-specific states.

These items must not be combined with the first non-danger hover-on-dark implementation slice.

## 11. First Future Implementation Readiness

Non-danger hover-on-dark is **not ready** for a bounded implementation slice yet.

Blocking decision:

- alias strategy is not approved;
- semantic hover-on-dark surface and border token categories are required;
- high contrast hover-on-dark mapping is required;
- reduced-motion relationship must be accepted as part of the state recipe before implementation.

Future implementation guardrails after the token/spec gap is resolved:

- edit only `src/styles/global.css` unless a later approved task says otherwise;
- target only non-danger hover selectors approved by the recipe specification;
- exclude `.player-header-button--exit`, `.player-sidebar-return`, active/current selectors, selected/current icon selectors, disabled selectors, focus-visible selectors, modal/accessibility UI selectors, progress strip selectors, shell shadow/depth selectors, course-screen selectors, and module-specific selectors;
- do not change layout, spacing, dimensions, shadows, gradients, routing, React behavior, or course logic;
- run `npm run build`;
- QA desktop, tablet, and mobile on `/module-2/screen-2-2?completed=module_01_hrba_foundations`;
- verify focus-visible remains tokenized and visually distinct;
- verify Module 2 S02 CTA remains reachable on tablet/mobile;
- verify no shell-caused horizontal scrolling appears.

## 12. Alignment Update Requirement

After this decision is reviewed and accepted, `docs/design-system-plan-progress-alignment.md` should be updated before any implementation begins.

The alignment update should record:

- this decision document exists;
- non-danger hover-on-dark remains blocked for implementation;
- new semantic hover-on-dark token categories are required before CSS migration;
- implementation remains paused;
- the next recommended step should be documentation-only token specification update or token-category decision work, not CSS implementation.
