# Player Shell Hover-on-Dark Token Category Specification

## 1. Purpose and Alignment Reference

This documentation-only specification follows `docs/player-shell-hover-on-dark-token-alias-decision.md` and is required before any player shell hover CSS migration.

It belongs to the Token foundation and Interaction state recipes master plan areas, inside the Visual System Stream: Token Foundation and Player Shell Adoption.

The current alignment status is:

- hover-on-dark implementation remains blocked;
- existing structural/base inverse surface and border tokens must not be reused as hover aliases;
- semantic hover-on-dark surface and border categories are required before CSS migration;
- high-contrast hover-on-dark mapping is required before implementation;
- this task remains documentation-only.

This document defines the semantic token categories required to support future non-danger hover-on-dark implementation in the player shell. It does not assign final token values and does not change token files.

## 2. Scope and Non-Scope

In scope:

- semantic hover-on-dark surface category;
- semantic hover-on-dark border category;
- high-contrast hover-on-dark surface and border mapping categories;
- whether hover text/icon tokens are needed;
- reduced-motion and hover transform rules;
- separation from focus-visible, active/current, selected/current icon, disabled, and danger states.

Out of scope:

- CSS implementation;
- token file edits;
- final token values;
- React behavior changes;
- active/current implementation;
- selected/current icon implementation;
- disabled-on-dark;
- danger-on-dark;
- modal/accessibility UI;
- progress strip;
- shell shadow/depth;
- global focus;
- course-screen/module-specific states.

## 3. Baseline from Previous Decisions

The previous decisions establish this baseline:

- focus-visible is already tokenized for bounded player shell controls and QA passed;
- focus-visible uses the existing dark-surface focus token and must remain distinct from hover;
- hover-on-dark is not tokenized;
- sidebar hover currently uses legacy rgba patterns that should not migrate directly;
- the alias strategy was rejected because structural/base inverse surface and border tokens are not semantic hover-state tokens;
- semantic hover-on-dark categories are required;
- high-contrast hover-on-dark mapping is required;
- non-danger hover-on-dark is the likely first future implementation candidate, but implementation remains paused.

## 4. Required Semantic Token Categories

These categories define token roles only. They do not assign values and do not create code tokens.

| Category | Purpose | Intended UI use | Allowed state | Prohibited uses | Relationship to base inverse surface tokens | Relationship to focus token | Relationship to active/current tokens | Relationship to danger tokens | Contrast/high-contrast requirement | Implementation readiness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Player shell hover-on-dark surface | Provide a subtle visible surface change for non-danger pointer hover on dark shell controls. | Non-danger player header/sidebar controls on dark shell surfaces. | Hover only, for non-danger controls. | Base shell surfaces, active/current states, focus-visible states, disabled states, danger states, modal surfaces, course-screen states. | Must be distinct from `--cso-color-surface-inverse` and `--cso-color-surface-inverse-raised`; must not replace them. | Must remain lower priority than `--cso-color-focus-dark-surface` and must not obscure focus. | Must be less semantically strong than future active/current treatment. | Must not be used on exit/return danger controls. | Must preserve readable inverse text/icons and have a high-contrast equivalent. | Category required; values not ready. |
| Player shell hover-on-dark border | Provide subtle border support for non-danger pointer hover on dark shell controls. | Border or edge treatment for non-danger hovered shell buttons. | Hover only, for non-danger controls. | Structural separators, focus rings, active/current borders, disabled borders, danger borders, modal borders, progress strip. | Must not reuse structural inverse border as a state border without explicit future approval. | Must remain visually secondary to focus outline. | Must not look like selected/current state. | Must not be used for danger affordance. | Must be visible against inverse and inverse-raised surfaces and have a high-contrast equivalent. | Category required; values not ready. |
| Player shell hover-on-dark text/icon | Optional category for text/icon treatment if existing inverse text tokens are not sufficient. | Only non-danger shell text/icons on hover if contrast or affordance testing requires it. | Hover only, if needed. | Default text, muted text, danger text, active/current icon marker, disabled text, focus outline. | Should usually preserve existing inverse text tokens rather than creating new text color. | Must not replace focus as the keyboard location cue. | Must not become the current-state indicator. | Must not be used on danger controls. | Must pass contrast on hover surface and map to high contrast if introduced. | Not required by default; defer unless testing proves need. |
| High-contrast hover-on-dark surface | Provide high-contrast mode equivalent for hover surface. | High contrast mode for non-danger hovered shell controls. | Hover only in high contrast mode. | Default mode surface, focus surface, active/current surface, danger surface, modal surface. | Must map from the semantic hover category, not from base inverse surfaces. | Must not reduce visibility of high contrast focus. | Must remain distinct from current/selected high contrast treatment. | Must not be reused for danger. | Must preserve readable high contrast text and not rely on color alone. | Category required; values not ready. |
| High-contrast hover-on-dark border | Provide high-contrast mode equivalent for hover border. | High contrast mode border support for non-danger hovered shell controls. | Hover only in high contrast mode. | Focus ring, default separator, active/current border, danger border. | Must not map directly to structural separators unless explicitly approved. | Must be visibly lower priority than high contrast focus. | Must not be confused with selected/current state. | Must not be used for danger. | Must be visible and support non-color affordance. | Category required; values not ready. |

## 5. Naming Recommendation

The existing CSS variable naming uses `--cso-color-[group]-[role]` and already includes inverse surface, inverse text, focus, and high contrast categories. Future state token names should stay traceable to that convention while making the state purpose explicit.

Recommended future CSS variable names:

- `--cso-color-state-hover-on-inverse-surface`;
- `--cso-color-state-hover-on-inverse-border`;
- `--cso-color-state-hover-on-inverse-text`, only if needed after testing;
- `--cso-color-high-contrast-hover-surface`;
- `--cso-color-high-contrast-hover-border`.

Recommended future TypeScript token path shape, if the existing token object is expanded:

- `color.state.hoverOnInverse.surface`;
- `color.state.hoverOnInverse.border`;
- `color.state.hoverOnInverse.text`, only if needed;
- `color.highContrast.hover.surface`;
- `color.highContrast.hover.border`.

The names should remain semantic. They should not encode a color family, old HRBA visual value, module name, or component-specific selector.

## 6. Token Value Decision Rule

Final token values must be selected only after:

- contrast review on header/sidebar dark surfaces;
- high-contrast mapping review;
- visual check against focus-visible, active/current, and danger states;
- review against the Premium Visual Experience Standard;
- confirmation that hover remains visible but less prominent than focus-visible;
- confirmation that hover does not look like active/current state;
- confirmation that hover does not reuse danger semantics;
- confirmation that no value is copied blindly from old HRBA CSS.

This document does not assign final values. Any future value proposal must be documented and reviewed before token files or CSS selectors are changed.

## 7. Hover Text/Icon Decision

Future hover should **preserve existing inverse text/icon tokens by default**.

Preferred rule:

- keep normal player shell text/icons on `--cso-color-text-inverse`;
- keep secondary text/icons on `--cso-color-text-inverse-muted` where already appropriate;
- use hover-on-dark surface and border as the primary pointer affordance;
- do not change text/icon color on hover unless contrast or affordance testing proves a separate token is needed.

Reason:

- changing text/icon color can blur hover with active/current or danger states;
- the existing inverse text tokens already support readability on dark shell surfaces;
- hover should not become a color-only cue;
- focus-visible already provides the keyboard cue and must remain visually stronger.

If testing later proves a text/icon hover token is needed, it must be introduced as a semantic optional category, not as a raw value or old CSS carryover.

## 8. Motion and Reduced-Motion Rule

Existing hover transform behavior may remain temporarily as legacy behavior until a scoped implementation task decides otherwise.

Rules for future implementation:

- hover motion must not be the only affordance;
- hover must include an approved semantic surface and/or border treatment before it is considered complete;
- new motion values must not be introduced in the first hover-on-dark implementation slice;
- existing transform behavior should not be expanded;
- reduced-motion behavior must be checked before any motion is added, broadened, or refactored;
- focus-visible must not depend on hover motion;
- any future reduced-motion adjustment requires its own scoped task if it changes behavior beyond tokenized color/border hover.

## 9. First Future Implementation Readiness

Non-danger hover-on-dark is **still blocked** after this specification.

This document makes the required categories clearer, but it does not make CSS implementation ready because:

- final token values are not selected;
- token files are not updated;
- high-contrast hover values are not selected;
- contrast and visual QA have not been run for proposed values;
- reduced-motion behavior has not been validated for any future implementation change.

Non-danger hover-on-dark should not move to CSS implementation until final token values or another approved strategy are added to the token specification and token files through a separate approved task.

## 10. Future Implementation Guardrails

After token values are approved in a separate task, the future implementation guardrails are:

- edit only `src/styles/global.css` unless separately approved;
- target only non-danger hover selectors;
- exclude exit/return danger selectors;
- exclude active/current selectors;
- exclude selected/current icon selectors;
- exclude disabled selectors;
- exclude focus-visible selectors;
- exclude modal/accessibility UI selectors;
- exclude progress strip selectors;
- exclude shell shadow/depth selectors;
- exclude course-screen and module-specific selectors;
- make no React behavior changes;
- introduce no raw hex, rgba, gradient, shadow, spacing, typography, or border values;
- use only approved semantic hover-on-dark tokens;
- preserve Phase C focus-visible behavior;
- keep Module 2 S02 CTA reachable on tablet/mobile;
- QA desktop, tablet, and mobile route checks on `/module-2/screen-2-2?completed=module_01_hrba_foundations`;
- stop if hover cannot be separated from active/current or danger selectors without selector redesign.

## 11. Deferred Items

Deferred items remain:

- active/current sidebar tool state;
- selected/current sidebar icon state;
- disabled-on-dark;
- danger-on-dark;
- modal/accessibility UI;
- progress strip;
- shell shadow/depth;
- global/course-screen/module-specific states.

These must not be combined with semantic hover-on-dark token-category work or the first future hover implementation slice.

## 12. Recommended Next Step After This Document

Recommended next controlled step:

1. Update `docs/design-system-plan-progress-alignment.md` to record this category specification.
2. Then create a documentation-only token value proposal or documentation-only update to `docs/implementation-ready-token-specification.md`.
3. Keep CSS implementation paused until the proposed values are reviewed, token files are updated in a separate approved token task, and QA requirements are defined.

No CSS migration should begin from this document alone.
