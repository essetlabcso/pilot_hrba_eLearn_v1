# Design System v0.1 Callout/Card Implementation Evaluation

## Summary

| Field | Result |
| --- | --- |
| Branch | `system/hrba-clean-foundation` |
| Implementation commit evaluated | `06dff8b2f39385ef0b1be24f670450a1ea8e0ab5` |
| QA note evaluated | `docs/design-system-v0-1-callout-card-implementation-qa.md` |
| Specification evaluated | `docs/design-system-v0-1-first-mvp-component-implementation-spec.md` |
| Evaluation result | STOP |
| Recommended next task | Correct the Callout scoped CSS token-reference issue only, then rerun independent evaluation |

## Files Inspected

- `docs/design-system-v0-1-callout-card-implementation-qa.md`
- `docs/design-system-v0-1-first-mvp-component-implementation-spec.md`
- `docs/design-system-v0-1-visual-drift-prevention-plan.md`
- `docs/design-system-v0-1-qa-evidence-pack.md`
- `docs/design-system-plan-progress-alignment.md`
- `src/components/design-system/Callout.tsx`
- `src/components/design-system/Card.tsx`
- `src/components/design-system/index.ts`
- `src/components/design-system/design-system.css`
- `src/system/tokens/tokens.css`
- `src/system/tokens/tokens.ts`
- Git history for commit `06dff8b2f39385ef0b1be24f670450a1ea8e0ab5`

## Evaluation Result

STOP.

The implementation stayed bounded and the components are presentational only, but `src/components/design-system/design-system.css` uses two `var(--cso-...)` references that are not present in the token files:

- `var(--cso-callout-surface)`
- `var(--cso-callout-accent)`

These are local component custom properties assigned inside the scoped stylesheet, not approved token-layer variables. The evaluation prompt requires every `var(--cso-...)` token reference used by `design-system.css` to exist in the current token files or approved token layer, and requires STOP if any token reference is missing. No token files should be edited to resolve this; the safer correction is to remove or rename the local component intermediary variables so only actual approved `--cso-*` token references remain.

## Evaluation Questions

| # | Question | Answer |
| --- | --- | --- |
| 1 | Did the implementation stay limited to the approved files? | PASS. Commit `06dff8b2f39385ef0b1be24f670450a1ea8e0ab5` changed only `src/components/design-system/Callout.tsx`, `src/components/design-system/Card.tsx`, `src/components/design-system/index.ts`, `src/components/design-system/design-system.css`, `docs/design-system-v0-1-callout-card-implementation-qa.md`, and `docs/design-system-plan-progress-alignment.md`. |
| 2 | Was Callout implemented only as a presentational primitive? | PASS. `Callout.tsx` imports only React types and scoped CSS, renders static markup, and has no routing, progress, focus management, dismissal, animation, live region, or behavior hooks. |
| 3 | Was Card implemented only as a presentational primitive? | PASS. `Card.tsx` imports only React types and scoped CSS, renders static markup, and has no clickable-card behavior, routing, progress, completion, assessment, or behavior hooks. |
| 4 | Was Button not implemented? | PASS. No `Button.tsx` file or Button export exists in `src/components/design-system/`. |
| 5 | Were no learning blocks, screen templates, vertical slice screens, or course screens implemented or changed? | PASS. The implementation commit did not change learning block, template, course screen, route, content, or vertical slice files. |
| 6 | Were `src/styles/global.css` and token files untouched? | PASS. `src/styles/global.css`, `src/system/tokens/tokens.css`, and `src/system/tokens/tokens.ts` were not changed by the implementation commit. |
| 7 | Does `design-system.css` use only scoped `.cso-callout*` and `.cso-card*` selectors? | PASS. Selectors are limited to `.cso-callout`, `.cso-callout--info`, `.cso-callout--success`, `.cso-callout--warning`, `.cso-callout__*`, `.cso-card`, `.cso-card--soft`, and `.cso-card__*`. |
| 8 | Does `design-system.css` avoid raw hex, `rgb()`/`rgba()`, gradients, `box-shadow`, broad `.is-active`, Phase D/current-state selectors, global reset rules, and module-specific selectors? | PASS. Read-only scans found none of those patterns in `src/components/design-system/design-system.css`. |
| 9 | Do all `var(--cso-...)` references used by `design-system.css` exist in the token files or approved token layer? | STOP. All standard token references exist, but `--cso-callout-surface` and `--cso-callout-accent` are not defined in `src/system/tokens/tokens.css` or `src/system/tokens/tokens.ts`. |
| 10 | Does Callout support only approved variants, default to `div`, allow `aside` only through `as`, render optional title visibly, decorate optional icons, avoid landmark roles by default, and avoid behavior? | PASS. `CalloutVariant` is `info | success | warning`; `as` is `aside | div`; default wrapper is `div`; title renders visibly; icon wrapper has `aria-hidden="true"`; no role or behavior is added. |
| 11 | Does Card support only approved variants, default safely, allow `article` only through `as`, avoid clickable behavior, avoid role inflation, avoid heading-level assumptions, and avoid behavior? | PASS. `CardVariant` is `default | soft`; default wrapper is `section` only when title exists and `div` otherwise; `article` is allowed only through `as`; no role, click handling, heading element, or behavior is added. |
| 12 | Is Card's neutral title rendering acceptable for v0.1? | PASS WITH CAUTION. The neutral title container avoids blind heading-level selection and is acceptable for primitive-level v0.1. Future screen usage must supply or wrap heading semantics intentionally when the card title is part of page hierarchy. |
| 13 | Are imports clean and behavior-free? | PASS. Component imports are limited to `react` type imports and `./design-system.css`; no routing, progress, course/module, player, modal, drawer, help, or captions imports exist. |
| 14 | Is importing `design-system.css` from both component files acceptable for this v0.1 primitive slice? | PASS WITH CAUTION. Vite can de-duplicate CSS imports in the bundle, and the approach avoids global CSS edits. A future barrel-level CSS import strategy may be cleaner once component usage patterns are known. |
| 15 | Did `npm run build` pass according to the QA note? | PASS. The QA note records TypeScript and Vite build PASS with existing Vite warnings. |
| 16 | Did `git diff --check` pass according to the QA note? | PASS. The QA note records `git diff --check` PASS. |
| 17 | Were routing, progress, completion, assessment, certificate, accessibility toolbar, assets, content, module CSS, old HRBA files, player behavior, modal behavior, drawer behavior, HelpOverlay behavior, and Captions/transcript behavior untouched? | PASS. The implementation commit did not change those areas. |
| 18 | Is the next safe task documentation-only Button/action-button behavior-free specification, or a small component usage/demo readiness note? | STOP correction first. Because the token-reference issue blocks this evaluation, the next task should be a narrow Callout/Card CSS correction and re-evaluation. After PASS, the next planning task can be Button/action-button behavior-free specification; screen/demo readiness should wait until primitives pass independent evaluation. |

## Token Reference Existence Check

STOP.

Existing token references confirmed in `src/system/tokens/tokens.css`:

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

Missing from the token files:

- `--cso-callout-surface`
- `--cso-callout-accent`

These missing names are component-local custom properties, but their `--cso-` prefix makes them look like token-layer variables and triggers the evaluation STOP rule.

## Semantic And Accessibility Findings

- Callout is presentational, defaults to `div`, and supports `aside` only by explicit `as` prop.
- Callout icon handling is decorative by default through `aria-hidden="true"`.
- Callout variant meaning still needs visible text support in future screen usage; this is correctly left to content/title usage.
- Card is presentational and defaults to `section` only when a title is present.
- Card does not render a heading level blindly. This is acceptable at primitive level, with a future-use caution that screen implementations must preserve heading hierarchy deliberately.
- No ARIA role inflation, live regions, focus management, keyboard trap behavior, routing, progress, completion, assessment, certificate, player, modal, drawer, HelpOverlay, or Captions/transcript behavior was found.

## Risks Or Defects Found

Defect:

- `design-system.css` includes two `var(--cso-...)` references that are not approved token variables: `--cso-callout-surface` and `--cso-callout-accent`.

Minor future-use cautions:

- Card title rendering is neutral; future screen usage must intentionally handle heading hierarchy.
- Importing `design-system.css` in both component files is acceptable for this v0.1 slice, but a future package-level import strategy may be cleaner once consumption patterns are known.

## Evaluation Non-Implementation Confirmation

No React, CSS, token, component, block, template, route, progress, assessment, certificate, accessibility toolbar, asset, content, module CSS, old HRBA, player behavior, modal behavior, drawer behavior, HelpOverlay behavior, Captions/transcript behavior, Button, or vertical slice implementation was done during this evaluation.

## Blocked Work Confirmation

- Phase D CSS remains blocked.
- Vertical slice implementation remains blocked.
- Button remains deferred until a separate behavior-free specification and until the Callout/Card primitive correction passes evaluation.
- Behavior-heavy components remain gated.
- Full scale-up remains blocked until vertical slice validation passes.

## Recommended Next Task

Run a narrow correction task for `src/components/design-system/design-system.css` only:

- remove the missing `var(--cso-callout-surface)` and `var(--cso-callout-accent)` references, or rename those local component custom properties so they do not use the token-layer `--cso-` prefix;
- keep all actual visual values backed by existing approved `--cso-*` tokens;
- do not edit token files;
- do not edit `src/styles/global.css`;
- do not implement Button, behavior-heavy components, blocks, templates, screens, routing, progress, content, module CSS, Phase D CSS, or vertical slice work;
- rerun the Callout/Card independent evaluation after the correction.
