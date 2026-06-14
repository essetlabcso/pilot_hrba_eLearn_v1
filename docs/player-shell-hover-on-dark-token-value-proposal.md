# Player Shell Hover-on-Dark Token Value Proposal

## 1. Purpose and Alignment Reference

This documentation-only proposal follows `docs/player-shell-hover-on-dark-token-category-specification.md` and is required before token files or CSS can be changed.

It belongs to the Token foundation and Interaction state recipes master plan areas, inside the Visual System Stream: Token Foundation and Player Shell Adoption.

The current alignment status is:

- semantic hover-on-dark token categories are specified;
- no hover-on-dark values have been approved;
- no token variables have been created;
- non-danger hover-on-dark CSS implementation remains blocked;
- this task remains documentation-only.

This document proposes candidate values for semantic non-danger player shell hover-on-dark token categories, with contrast and accessibility reasoning, before any token-file or CSS implementation.

## 2. Scope and Non-Scope

In scope:

- proposed hover-on-dark surface value;
- proposed hover-on-dark border value;
- proposed high-contrast hover-on-dark surface value;
- proposed high-contrast hover-on-dark border value;
- decision on whether hover text/icon token is needed;
- contrast and visual relationship to dark header/sidebar surfaces;
- relationship to focus-visible, active/current, disabled, and danger states.

Out of scope:

- CSS implementation;
- token file edits;
- implementation-ready token spec edits;
- React behavior changes;
- active/current implementation;
- selected/current icon implementation;
- disabled-on-dark implementation;
- danger-on-dark implementation;
- modal/accessibility UI;
- progress strip;
- shell shadow/depth;
- global focus;
- course-screen/module-specific states.

## 3. Baseline Token Values

Current relevant values from `src/system/tokens/tokens.css`, `src/system/tokens/tokens.ts`, and `docs/implementation-ready-token-specification.md`:

| Current token | Current value | Current role | Proposal relevance |
| --- | --- | --- | --- |
| `--cso-color-surface-inverse` | `#0F172A` | Dark shell/header surface. | Hover surface must remain distinct from this base surface. |
| `--cso-color-surface-inverse-raised` | `#1E293B` | Dark sidebar/raised surface. | Hover surface must remain distinct from this base sidebar surface. |
| `--cso-color-surface-inverse-border` | `#334155` | Structural dark separator/border. | Must not be reused as the hover border because it is structural, not state-specific. |
| `--cso-color-text-inverse` | `#F9FAFB` | Primary text on dark surfaces. | Should remain readable on any hover surface. |
| `--cso-color-text-inverse-muted` | `#CBD5E1` | Secondary text on dark surfaces. | Should remain readable where secondary labels/icons are used. |
| `--cso-color-focus-dark-surface` | `#FBBF24` | Focus ring on dark surfaces. | Hover must remain lower priority and must not obscure focus. |
| `--cso-color-action-primary` | `#0E6F9F` | Primary action background. | Should not be used for generic hover because it may imply CTA or active/current meaning. |
| `--cso-color-action-primary-hover` | `#075985` | Primary action hover. | Should remain action-specific, not shell hover. |
| `--cso-color-accent-danger` | `#B91C1C` | Danger accent/border. | Out of scope for non-danger hover. |
| `--cso-color-high-contrast-background` | `#000000` | High contrast background. | High contrast hover must work against this base. |
| `--cso-color-high-contrast-surface` | `#111111` | High contrast surface. | High contrast hover surface must remain readable. |
| `--cso-color-high-contrast-text` | `#FFFFFF` | High contrast text. | High contrast hover surface must preserve readability. |
| `--cso-color-high-contrast-focus` | `#FFD60A` | High contrast focus. | High contrast hover must remain visually distinct from focus. |
| `--cso-color-high-contrast-link` | `#7DD3FC` | High contrast link/action. | Candidate for high contrast hover border because it is visible and distinct from focus by hue. |

## 4. Proposal Criteria

Proposed values must satisfy these criteria:

- hover must be visible on both header and sidebar dark surfaces;
- hover must not look like active/current;
- hover must be visually lower priority than focus-visible;
- hover must not use danger semantics;
- inverse text/icons must remain readable;
- hover border must support a visible non-text affordance;
- high-contrast values must remain distinct from focus and text;
- no value should be copied blindly from legacy HRBA CSS;
- values should support premium shell refinement without making the UI noisy.

Planning contrast targets:

- inverse text on hover surface should comfortably exceed 4.5:1;
- muted inverse text on hover surface should comfortably exceed 4.5:1 where used;
- hover border should be visible against both `#0F172A` and `#1E293B`;
- focus should remain clearly visible against the hover surface.

Contrast calculations in this document are planning evidence and should be re-tested during implementation.

## 5. Candidate Value Options

### Option A: Conservative/Subtle Hover

| Proposed token category | Candidate value |
| --- | --- |
| Hover-on-dark surface | `#253449` |
| Hover-on-dark border | `#64748B` |
| High-contrast hover surface | `#1A1A1A` |
| High-contrast hover border | `#7DD3FC` |

Expected visual behavior:

- creates a slightly lifted dark surface without turning hover into active/current;
- keeps text and muted text readable;
- uses the border as the main visible affordance;
- leaves amber focus visibly stronger than hover;
- high contrast uses a simple dark surface plus a bright cyan border distinct from the yellow focus token.

Planning contrast evidence:

| Pair | Approximate ratio | Note |
| --- | --- | --- |
| `#F9FAFB` on `#253449` | 12.06:1 | Pass for inverse primary text. |
| `#CBD5E1` on `#253449` | 8.49:1 | Pass for inverse muted text. |
| `#253449` against `#0F172A` | 1.42:1 | Surface shift is subtle; border must carry the main affordance. |
| `#253449` against `#1E293B` | 1.16:1 | Surface shift is subtle on sidebar; border is required. |
| `#64748B` against `#0F172A` | 3.75:1 | Border is visible on header/shell. |
| `#64748B` against `#1E293B` | 3.07:1 | Border is visible on sidebar. |
| `#FBBF24` against `#253449` | 7.55:1 | Focus remains strong on hover surface. |
| `#FFFFFF` on `#1A1A1A` | 17.40:1 | High contrast text remains readable. |
| `#7DD3FC` against `#000000` | 12.60:1 | High contrast border is highly visible. |

Benefits:

- strong readability;
- controlled premium feel;
- avoids action/danger semantics;
- keeps focus clearly dominant;
- border provides the visible non-text affordance.

Risks:

- surface shift alone is subtle, especially on the sidebar;
- QA must confirm border visibility on real controls;
- high contrast hover surface also needs border support because surface contrast against black is subtle.

Recommendation: **recommended candidate set for review**.

### Option B: Stronger/Clearer Affordance

| Proposed token category | Candidate value |
| --- | --- |
| Hover-on-dark surface | `#0B3A53` |
| Hover-on-dark border | `#38BDF8` |
| High-contrast hover surface | `#1A1A1A` |
| High-contrast hover border | `#7DD3FC` |

Expected visual behavior:

- produces a clearer blue-teal hover feel;
- strongly signals pointer affordance;
- may feel closer to action, info, or selected/current treatment.

Planning contrast evidence:

| Pair | Approximate ratio | Note |
| --- | --- | --- |
| `#F9FAFB` on `#0B3A53` | 11.52:1 | Pass for inverse primary text. |
| `#CBD5E1` on `#0B3A53` | 8.11:1 | Pass for inverse muted text. |
| `#0B3A53` against `#0F172A` | 1.48:1 | Surface shift is still subtle but more chromatic. |
| `#0B3A53` against `#1E293B` | 1.22:1 | Surface shift is still subtle on sidebar. |
| `#38BDF8` against `#0F172A` | 8.33:1 | Border is very visible. |
| `#38BDF8` against `#1E293B` | 6.83:1 | Border is very visible. |
| `#FBBF24` against `#0B3A53` | 7.21:1 | Focus remains strong on hover surface. |

Benefits:

- strong affordance;
- premium teal/blue energy;
- border is easy to see on both dark surfaces.

Risks:

- may look too much like active/current or info/action state;
- may overemphasize hover compared with default state;
- could create visual noise across many sidebar controls;
- high chroma may need stronger QA against future active/current tokens.

Recommendation: **defer/reject for first implementation slice**. It may be useful later for active/current or info-related state review, but it is too assertive for generic non-danger hover.

## 6. Recommended Value Set

Recommended candidate set for review: **Option A: Conservative/Subtle Hover**.

These are proposed candidate values only. They are not approved implementation values and are not token-file changes.

| Proposed CSS variable name | Proposed value | Rationale | Expected use | Prohibited uses |
| --- | --- | --- | --- | --- |
| `--cso-color-state-hover-on-inverse-surface` | `#253449` | Preserves readable inverse text while adding a subtle state surface. | Non-danger player shell hover surface only. | Base shell surface, active/current, disabled, danger, modal, course-screen, module-specific styles. |
| `--cso-color-state-hover-on-inverse-border` | `#64748B` | Provides visible affordance on both header and sidebar dark surfaces. | Non-danger player shell hover border only. | Structural separators, focus ring, active/current border, danger border. |
| `--cso-color-high-contrast-hover-surface` | `#1A1A1A` | Keeps high contrast hover surface dark and text-readable. | High contrast non-danger hover surface only. | Default high contrast surface, focus, active/current, danger. |
| `--cso-color-high-contrast-hover-border` | `#7DD3FC` | Provides a bright hover border distinct by hue from yellow focus. | High contrast non-danger hover border only. | Focus ring, link-only semantics, active/current border, danger border. |

Contrast notes:

- inverse primary text on the proposed hover surface is about 12.06:1;
- inverse muted text on the proposed hover surface is about 8.49:1;
- proposed border is about 3.75:1 against the dark shell and 3.07:1 against the raised sidebar;
- focus token remains about 7.55:1 against the proposed hover surface.

High-contrast notes:

- high contrast hover must use both surface and border;
- the high contrast border should not replace focus;
- high contrast focus remains `#FFD60A`;
- high contrast hover border candidate `#7DD3FC` is highly visible against black, but must be QA-tested to ensure it does not look like focus or selected/current.

## 7. Hover Text/Icon Decision

A separate hover text/icon token is **not recommended for the first implementation slice**.

Decision:

- preserve existing inverse text/icon tokens;
- keep primary text/icons on `--cso-color-text-inverse`;
- keep secondary text/icons on `--cso-color-text-inverse-muted` where already appropriate;
- use the hover surface and border as the pointer affordance.

Reason:

- existing inverse text has strong readability on the proposed surface;
- changing text/icon color could make hover look like active/current or danger;
- hover should not rely on color-only text change;
- Phase C focus-visible must remain the strongest keyboard cue.

If implementation QA later shows text/icon affordance is insufficient, a separate hover text/icon token should be proposed in a new documentation-only decision.

## 8. Motion and Reduced-Motion Note

No new motion values are proposed.

Motion guidance:

- existing hover transform may remain temporarily;
- hover must not rely on motion alone;
- the proposed surface/border values should carry the pointer affordance;
- no new transition, transform, timing, or easing values should be introduced in the first hover implementation;
- reduced-motion behavior should be checked during implementation QA before any motion behavior is expanded or refactored.

## 9. Future Token Implementation Guardrails

If these values are accepted in a later approved task, the token-file implementation task should:

- edit only token files and related token docs if separately approved;
- not edit CSS;
- not implement hover selectors;
- not touch React components or screens;
- add token variables only for the approved semantic hover categories;
- preserve existing tokens;
- avoid renaming current token variables;
- add TypeScript token object entries that match CSS variable naming;
- keep high contrast hover values grouped with high contrast/state values;
- run `npm run build`;
- confirm no raw hover values are added outside token files.

## 10. Future CSS Implementation Guardrails

CSS implementation remains blocked until token values are approved and token files are updated.

When later approved, CSS must:

- edit only `src/styles/global.css` unless separately approved;
- target only non-danger hover selectors;
- exclude exit/return danger selectors;
- exclude active/current, selected/current icon, disabled, focus-visible, modal/accessibility UI, progress strip, shell shadow/depth, course-screen, and module-specific selectors;
- introduce no raw hex, rgba, gradient, shadow, spacing, typography, or border values;
- use only the approved semantic hover tokens;
- preserve Phase C focus-visible behavior;
- keep Module 2 S02 CTA reachable on tablet/mobile;
- run desktop, tablet, and mobile QA on `/module-2/screen-2-2?completed=module_01_hrba_foundations`.

## 11. Deferred Items

Deferred areas remain:

- active/current sidebar tool state;
- selected/current sidebar icon state;
- disabled-on-dark;
- danger-on-dark;
- modal/accessibility UI;
- progress strip;
- shell shadow/depth;
- global/course-screen/module-specific states.

These areas must not be combined with the first hover token-file implementation or first hover CSS implementation slice.

## 12. Recommended Next Step

Recommended next controlled step after this proposal is reviewed:

1. Update `docs/design-system-plan-progress-alignment.md` to record this value proposal.
2. If accepted, create a bounded token-file implementation task for approved hover-on-dark tokens only.
3. Keep CSS implementation blocked until after token files are updated and token-specific QA is complete.

No CSS implementation should begin from this proposal alone.
