# Design System v0.1 Callout/Card Implementation Re-Evaluation

## Summary

| Field | Result |
| --- | --- |
| Branch | `system/hrba-clean-foundation` |
| Original implementation commit evaluated | `06dff8b2f39385ef0b1be24f670450a1ea8e0ab5` |
| Correction commit evaluated | `a3e2cb1d50ce6e7c9252e027722b23667edd4fb2` |
| Implementation QA note evaluated | `docs/design-system-v0-1-callout-card-implementation-qa.md` |
| Correction QA note evaluated | `docs/design-system-v0-1-callout-card-css-correction-qa.md` |
| Original evaluation reviewed | `docs/design-system-v0-1-callout-card-implementation-evaluation.md` |
| Specification evaluated | `docs/design-system-v0-1-first-mvp-component-implementation-spec.md` |
| Re-evaluation result | PASS WITH CAUTION |
| Previous STOP defect | Resolved |
| Recommended next task | Documentation-only Button / action-button behavior-free specification |

## Files Inspected

- `docs/design-system-v0-1-callout-card-implementation-qa.md`
- `docs/design-system-v0-1-callout-card-implementation-evaluation.md`
- `docs/design-system-v0-1-callout-card-css-correction-qa.md`
- `docs/design-system-v0-1-first-mvp-component-implementation-spec.md`
- `docs/design-system-v0-1-component-inventory-and-priority-plan.md`
- `docs/design-system-v0-1-visual-drift-prevention-plan.md`
- `docs/design-system-v0-1-qa-evidence-pack.md`
- `docs/design-system-plan-progress-alignment.md`
- `src/components/design-system/Callout.tsx`
- `src/components/design-system/Card.tsx`
- `src/components/design-system/index.ts`
- `src/components/design-system/design-system.css`
- `src/system/tokens/tokens.css`
- `src/system/tokens/tokens.ts`
- Git history for `06dff8b2f39385ef0b1be24f670450a1ea8e0ab5`
- Git history for `a3e2cb1d50ce6e7c9252e027722b23667edd4fb2`

## Re-Evaluation Result

PASS WITH CAUTION.

The original implementation stayed bounded, the correction stayed bounded, and the previous STOP defect is resolved. `src/components/design-system/design-system.css` no longer references `var(--cso-callout-surface)` or `var(--cso-callout-accent)`. The local component custom properties now use non-token names, `--callout-surface` and `--callout-accent`, while their assigned values remain backed by approved `var(--cso-...)` tokens.

The caution is not a blocker for the primitive slice. It records two future-use concerns:

- Card title rendering is neutral and acceptable at primitive level, but future screen usage must deliberately preserve heading hierarchy.
- Importing `design-system.css` from both primitive component files is acceptable in this Vite app and avoids global CSS edits, but a future package/barrel-level CSS import strategy may be cleaner once usage patterns are known.

No STOP defects were found.

## Re-Evaluation Questions

| # | Question | Answer |
| --- | --- | --- |
| 1 | Did the original implementation stay limited to the approved files? | PASS. Commit `06dff8b2f39385ef0b1be24f670450a1ea8e0ab5` changed only `src/components/design-system/Callout.tsx`, `src/components/design-system/Card.tsx`, `src/components/design-system/index.ts`, `src/components/design-system/design-system.css`, `docs/design-system-v0-1-callout-card-implementation-qa.md`, and `docs/design-system-plan-progress-alignment.md`. |
| 2 | Did the correction stay limited to the approved correction files? | PASS. Commit `a3e2cb1d50ce6e7c9252e027722b23667edd4fb2` changed only `src/components/design-system/design-system.css`, `docs/design-system-v0-1-callout-card-css-correction-qa.md`, and `docs/design-system-plan-progress-alignment.md`. |
| 3 | Was Callout implemented only as a presentational primitive? | PASS. `Callout.tsx` renders static markup, imports only React types plus scoped CSS, and has no routing, progress, focus management, dismissal, animation, live-region, or behavior logic. |
| 4 | Was Card implemented only as a presentational primitive? | PASS. `Card.tsx` renders static markup, imports only React types plus scoped CSS, and has no clickable-card behavior, routing, progress, completion, assessment, or behavior logic. |
| 5 | Was Button not implemented? | PASS. No `Button.tsx` file, Button export, or Button implementation exists in `src/components/design-system/`. |
| 6 | Were no learning blocks, screen templates, vertical slice screens, or course screens implemented or changed? | PASS. The implementation and correction commits did not change block, template, course screen, route, content, or vertical slice files. |
| 7 | Were `src/styles/global.css` and token files untouched? | PASS. `src/styles/global.css`, `src/system/tokens/tokens.css`, and `src/system/tokens/tokens.ts` were not changed by either commit. |
| 8 | Does `design-system.css` use only scoped `.cso-callout*` and `.cso-card*` selectors? | PASS. Selectors are limited to `.cso-callout`, `.cso-callout--*`, `.cso-callout__*`, `.cso-card`, `.cso-card--soft`, and `.cso-card__*`. |
| 9 | Does `design-system.css` avoid raw hex colors, `rgb()`/`rgba()`, gradients, `box-shadow`, broad `.is-active`, Phase D/current-state selectors, global reset rules, and module-specific selectors? | PASS. The advisory scan found no disallowed patterns. It matched `.cso-callout__body` and `--cso-line-height-body` only because the scan includes the substring `body`; these are scoped component/token references, not global `body` rules. |
| 10 | Do all remaining `var(--cso-...)` references used by `design-system.css` exist in the current token files or approved token layer? | PASS. Every remaining `var(--cso-...)` reference was found in `src/system/tokens/tokens.css` or `src/system/tokens/tokens.ts`. |
| 11 | Is the previous STOP defect resolved? | PASS. No `var(--cso-callout-surface)` or `var(--cso-callout-accent)` reference remains. Local custom properties now use `--callout-surface` and `--callout-accent`, and all assigned visual values remain backed by approved `var(--cso-...)` tokens. |
| 12 | Does Callout meet the approved semantic and behavior boundaries? | PASS. It supports only `info`, `success`, and `warning`; defaults to `div`; allows `aside` only through `as`; renders optional title visibly; wraps optional icon with `aria-hidden="true"`; avoids landmark roles by default; and adds no live region, dismissal, animation, focus management, routing, progress, or behavior. |
| 13 | Does Card meet the approved semantic and behavior boundaries? | PASS. It supports only `default` and `soft`; defaults to `section` when title exists and `div` when no title exists; allows `article` only through `as`; avoids clickable-card behavior, role inflation, blind heading-level selection, routing, progress, completion, assessment, and behavior. |
| 14 | Is Card's neutral title rendering acceptable for v0.1? | PASS WITH CAUTION. It is acceptable because the primitive avoids choosing page-level heading levels blindly. Future screen usage must supply or wrap heading semantics intentionally when the title participates in page hierarchy. |
| 15 | Are imports clean and behavior-free? | PASS. Imports are limited to React type imports, scoped CSS imports, and local design-system exports. There are no routing, progress, course/module, player behavior, modal/drawer/help, or captions imports. |
| 16 | Is importing `design-system.css` from both component files acceptable for this v0.1 primitive slice? | PASS WITH CAUTION. It is acceptable in this Vite app and avoids global CSS edits. A future barrel-level or package-level stylesheet import strategy may be cleaner once component consumption patterns are established. |
| 17 | Did `npm run build` pass according to the implementation QA and correction QA? | PASS. Both QA notes record TypeScript and Vite build PASS with existing Vite warnings. Build was not rerun during this documentation-only re-evaluation. |
| 18 | Did `git diff --check` pass according to the implementation QA and correction QA? | PASS. Both QA notes record `git diff --check` PASS. |
| 19 | Were routing, progress, completion, assessment, certificate, accessibility toolbar, assets, content, module CSS, old HRBA files, player behavior, modal behavior, drawer behavior, HelpOverlay behavior, and Captions/transcript behavior untouched? | PASS. Those areas were untouched by the implementation commit, correction commit, and this re-evaluation. |
| 20 | Is the next safe task documentation-only Button / action-button behavior-free specification, or should another readiness note come first? | PASS WITH CAUTION. The next safe task can be a documentation-only Button / action-button behavior-free specification. No additional Callout/Card readiness note is required before that, but future screen/template usage must preserve Card heading hierarchy and carry the CSS import caution forward. |

## Token Reference Existence Check

PASS.

All remaining `var(--cso-...)` references in `src/components/design-system/design-system.css` were found in `src/system/tokens/tokens.css` or `src/system/tokens/tokens.ts`:

- `--cso-border-color-default`
- `--cso-border-color-soft`
- `--cso-border-width-hairline`
- `--cso-border-width-strong`
- `--cso-color-accent-info`
- `--cso-color-accent-success`
- `--cso-color-accent-warning`
- `--cso-color-background-stage`
- `--cso-color-surface-primary`
- `--cso-color-surface-soft-info`
- `--cso-color-surface-soft-success`
- `--cso-color-surface-soft-warning`
- `--cso-color-text-muted`
- `--cso-color-text-primary`
- `--cso-color-text-strong`
- `--cso-font-size-lg`
- `--cso-font-size-sm`
- `--cso-font-weight-bold`
- `--cso-font-weight-semibold`
- `--cso-line-height-body`
- `--cso-line-height-heading`
- `--cso-radius-md`
- `--cso-space-0`
- `--cso-space-2`
- `--cso-space-3`
- `--cso-space-4`
- `--cso-space-5`

No missing token reference remains.

## Previous STOP Defect Resolution

Resolved.

The original STOP defect was caused by local component custom properties using token-layer-looking names:

- `--cso-callout-surface`
- `--cso-callout-accent`

The correction renamed them to:

- `--callout-surface`
- `--callout-accent`

The stylesheet no longer contains `var(--cso-callout-surface)` or `var(--cso-callout-accent)`. The local properties are still assigned approved token-backed values such as `var(--cso-color-surface-soft-info)` and `var(--cso-color-accent-info)`.

## Semantic And Accessibility Findings

- Callout is presentational and defaults to `div`.
- Callout supports `aside` only through an explicit `as` prop.
- Callout title is visible when provided.
- Callout icon is decorative by default through `aria-hidden="true"`.
- Callout does not add landmark roles, live regions, focus management, dismissal behavior, animation, routing, progress, or state behavior.
- Card is presentational and defaults to `section` only when title exists, otherwise `div`.
- Card supports `article` only through an explicit `as` prop.
- Card does not render heading elements blindly, avoiding primitive-level heading hierarchy mistakes.
- Card does not add click handling, role inflation, routing, progress, completion, assessment, or state behavior.
- Future screen usage must handle heading hierarchy intentionally when a Card title is part of page structure.

## Risks Or Defects Found

No STOP defects were found.

Future-use cautions:

- Card title rendering is neutral; future screen/template usage must intentionally preserve heading hierarchy.
- `design-system.css` is imported by both primitive component files. This is acceptable for v0.1 in the current Vite app, but future packaging may prefer one explicit stylesheet entry point.

## Build And Diff-Check Evidence

- `npm run build` passed according to both the implementation QA note and the correction QA note. Build was not rerun during this documentation-only re-evaluation.
- `git diff --check` passed according to both QA notes.
- `git diff --check` must be rerun after this documentation-only re-evaluation note and alignment update are created.

## Re-Evaluation Non-Implementation Confirmation

No React, CSS, token, component, block, template, route, progress, assessment, certificate, accessibility toolbar, asset, content, module CSS, old HRBA, player behavior, modal behavior, drawer behavior, HelpOverlay behavior, Captions/transcript behavior, Button, or vertical slice implementation was done during this re-evaluation.

## Blocked Work Confirmation

- Button remains deferred until a separate behavior-free specification.
- Behavior-heavy components remain gated.
- Phase D CSS remains blocked.
- Current-state CSS remains blocked.
- Vertical slice implementation remains blocked.
- Full scale-up remains blocked until vertical slice validation passes.

## Recommended Next Task

Create a documentation-only Button / action-button behavior-free specification.

That next task should keep Button separate from routing, progress, completion, assessment, disabled/current state migration, player navigation, Phase D CSS, blocks, templates, vertical slice screens, and full scale-up.
