# Player Shell Current-On-Inverse Token Value Proposal

## 1. Purpose

This documentation-only proposal defines reviewable candidate values for persistent active/current state on inverse player sidebar surfaces.

It follows:

- `docs/player-shell-current-on-inverse-token-category-decision.md`;
- `docs/player-shell-active-current-sidebar-accessibility-semantics-review.md`;
- `docs/player-shell-navigation-state-implementation-readiness.md`;
- `docs/player-shell-hover-on-dark-token-value-proposal.md`;
- `docs/implementation-ready-token-specification.md`.

This is not:

- token-file implementation;
- CSS implementation;
- React implementation;
- behavior implementation;
- approval for Phase D CSS migration.

The proposed values are for human review only.

## 2. Scope

This proposal is limited to bounded player sidebar active/current tool state.

Expected future selector family:

- `.player-sidebar-button.is-active`
- possibly `.player-sidebar-button.is-active .player-sidebar-icon`

The active/current state is persistent. It communicates that a player shell tool, drawer, modal, or transcript panel is currently open or visible.

Out of scope:

- header buttons;
- return and exit controls;
- menu drawer active screen state;
- roadmap states;
- progress strip;
- disabled states;
- locked states;
- completed states;
- danger states;
- modal/accessibility UI implementation;
- course-screen states;
- module-specific states.

## 3. Proposed Token Names and Candidate Values

These names and values are proposed for review only. They are not implemented in token files.

| Proposed token name | Candidate value | Proposed role | Implementation status |
| --- | --- | --- | --- |
| `--cso-color-state-current-on-inverse-surface` | `#064E5F` | Persistent current-state surface on inverse sidebar controls. | Proposed for review only. |
| `--cso-color-state-current-on-inverse-border` | `#38BDF8` | Persistent current-state border/non-color cue on inverse sidebar controls. | Proposed for review only. |
| `--cso-color-state-current-icon-on-inverse-surface` | `#38BDF8` | Icon badge surface that reinforces active/current state. | Proposed for review only. |
| `--cso-color-state-current-icon-on-inverse-foreground` | `#0F172A` | Icon text/foreground on the current icon surface. | Proposed for review only. |
| `--cso-color-high-contrast-current-on-inverse-surface` | `#002B36` | High-contrast current-state surface. | Proposed for review only. |
| `--cso-color-high-contrast-current-on-inverse-border` | `#A7F3D0` | High-contrast current-state border/non-color cue. | Proposed for review only. |
| `--cso-color-high-contrast-current-icon-on-inverse-surface` | `#A7F3D0` | High-contrast current icon badge surface. | Proposed for review only. |
| `--cso-color-high-contrast-current-icon-on-inverse-foreground` | `#000000` | High-contrast current icon foreground. | Proposed for review only. |

No separate current text token is proposed for the first slice. Existing inverse text tokens should remain unless implementation QA proves a separate token is needed.

## 4. Value Rationale

The proposed current-state set is intentionally stronger and more persistent than hover, but less visually dominant than focus-visible.

Relationship to hover-on-dark:

- existing hover surface: `#253449`;
- existing hover border: `#64748B`;
- proposed current surface: `#064E5F`;
- proposed current border: `#38BDF8`.

The proposed current surface is more teal and more assertive than the hover surface. The proposed current border and icon surface are brighter than the hover border so the learner can distinguish persistent open/current state from temporary pointer feedback.

Relationship to focus-visible:

- existing focus on dark surface: `#FBBF24`;
- proposed current border/icon surface: `#38BDF8`;
- proposed high-contrast current border/icon surface: `#A7F3D0`;
- existing high-contrast focus: `#FFD60A`.

The proposed current values avoid amber/yellow so focus-visible remains visually higher priority. Current state should never obscure the focus ring when a current control receives keyboard focus.

Relationship to other states:

- values avoid danger red;
- values avoid muted/disabled gray treatment;
- values avoid success green as the default meaning;
- values avoid progress/completion semantics;
- values use a premium blue-teal direction already present in the approved visual system.

The current surface alone is not enough as a state cue. The border and optional icon treatment are required so current state does not rely on color fill alone.

## 5. Accessibility and Contrast Checks

One-off planning contrast calculations were run locally without creating files. These ratios should be re-tested during implementation and QA.

| Pair | Approximate ratio | Planning note |
| --- | --- | --- |
| `#F9FAFB` on `#064E5F` | 8.88:1 | Pass for inverse primary text on proposed current surface. |
| `#CBD5E1` on `#064E5F` | 6.25:1 | Pass for inverse muted text on proposed current surface. |
| `#064E5F` against `#0F172A` | 1.36:1 | Surface shift is visible by hue but not enough alone. Border/icon support is required. |
| `#064E5F` against `#1E293B` | 1.58:1 | Surface shift is visible by hue but not enough alone. Border/icon support is required. |
| `#38BDF8` against `#0F172A` | 8.33:1 | Current border/icon cue is highly visible on shell surface. |
| `#38BDF8` against `#1E293B` | 6.83:1 | Current border/icon cue is highly visible on sidebar surface. |
| `#38BDF8` against `#064E5F` | 4.33:1 | Current icon surface is visible against proposed current surface. |
| `#0F172A` on `#38BDF8` | 8.33:1 | Proposed icon foreground is readable on current icon surface. |
| `#FFFFFF` on `#38BDF8` | 2.14:1 | White should not be used as the current icon foreground on this surface. |
| `#FBBF24` against `#064E5F` | 5.56:1 | Focus-visible remains strong on current surface. |
| `#FFFFFF` on `#002B36` | 15.01:1 | High-contrast text remains readable on proposed high-contrast current surface. |
| `#A7F3D0` against `#000000` | 16.37:1 | High-contrast current border/icon is highly visible against black. |
| `#A7F3D0` against `#111111` | 14.72:1 | High-contrast current border/icon is highly visible against high-contrast surface. |
| `#000000` on `#A7F3D0` | 16.37:1 | High-contrast icon foreground is readable on current icon surface. |
| `#FFD60A` against `#002B36` | 10.63:1 | High-contrast focus remains strong on high-contrast current surface. |

Accessibility notes:

- Current state must not rely on color alone.
- Button-level surface and border should be paired with visible text and, if implemented, icon treatment.
- Icon treatment must reinforce current state but must not be the only cue.
- Focus-visible must remain visually higher priority than current state.
- High-contrast mapping is required before any CSS implementation.
- These calculations are planning evidence, not a full accessibility compliance claim.

## 6. Relationship to Existing Tokens

Hover-on-inverse tokens should not be reused.

Reason:

- hover is temporary pointer feedback;
- current is persistent open/selected state;
- reusing hover values would make learner orientation ambiguous.

Focus-visible tokens should not be reused.

Reason:

- focus-visible communicates keyboard location;
- current communicates persistent tool/panel state;
- reusing focus color or outline would weaken keyboard accessibility.

Existing tokens that influenced the proposal:

| Existing token | Value | Influence |
| --- | --- | --- |
| `--cso-color-surface-inverse` | `#0F172A` | Current surface must read against the dark shell. |
| `--cso-color-surface-inverse-raised` | `#1E293B` | Current surface and border must read against the dark sidebar. |
| `--cso-color-text-inverse` | `#F9FAFB` | Existing text token remains readable on proposed current surface. |
| `--cso-color-text-inverse-muted` | `#CBD5E1` | Existing muted inverse text remains readable on proposed current surface. |
| `--cso-color-focus-dark-surface` | `#FBBF24` | Current values avoid yellow/amber so focus stays distinct. |
| `--cso-color-accent-info` / `--cso-color-action-primary` | `#0E6F9F` | Influenced the blue-teal direction, but is not reused directly for current state. |
| `--cso-color-state-hover-on-inverse-surface` | `#253449` | Current surface must be semantically and visually distinct from hover. |
| `--cso-color-state-hover-on-inverse-border` | `#64748B` | Current border must be more persistent and clearer than hover border. |

Existing action, accent, hover, focus, and structural inverse tokens are not approved for current-state reuse by this proposal.

## 7. Recommendation

The proposed values are ready for human review as documentation-only candidate values.

Recommended candidate set:

- `--cso-color-state-current-on-inverse-surface: #064E5F`;
- `--cso-color-state-current-on-inverse-border: #38BDF8`;
- `--cso-color-state-current-icon-on-inverse-surface: #38BDF8`;
- `--cso-color-state-current-icon-on-inverse-foreground: #0F172A`;
- `--cso-color-high-contrast-current-on-inverse-surface: #002B36`;
- `--cso-color-high-contrast-current-on-inverse-border: #A7F3D0`;
- `--cso-color-high-contrast-current-icon-on-inverse-surface: #A7F3D0`;
- `--cso-color-high-contrast-current-icon-on-inverse-foreground: #000000`.

Token-file implementation remains blocked until this proposal is reviewed and approved.

Phase D CSS remains blocked until:

1. token values are approved and implemented in token files;
2. a React/accessibility implementation specification is approved;
3. any required modal/accessibility behavior review is complete.

## 8. Stop Conditions for Future Work

Future work must stop if:

- current-state values look too similar to hover or focus;
- current-state values depend on color alone;
- high-contrast values are undefined;
- current icon treatment becomes the only cue;
- focus-visible would be obscured by current-state styling;
- React/accessibility semantics are unresolved at the point of CSS implementation;
- implementation would touch CSS, React, token files, routing, progress, assessment, modal behavior, accessibility toolbar behavior, assets, content, or old HRBA files without separate approval;
- implementation would migrate selected/current icon, disabled, completed, locked, danger, modal/accessibility UI, progress strip, shell shadow, global focus, course-screen, or module-specific states without separate approval.

## 9. Recommended Next Step

After human review, the next safe step should be a separate bounded token-file implementation task for these current-on-inverse values only, if approved.

That future task should edit only `src/system/tokens/tokens.css` and `src/system/tokens/tokens.ts`, and should not implement CSS selectors.

Phase D CSS implementation must remain blocked until token files are updated and QA'd, React/accessibility implementation specification is approved, and any required modal/accessibility behavior review is complete.
