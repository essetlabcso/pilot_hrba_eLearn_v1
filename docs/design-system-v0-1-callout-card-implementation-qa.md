# Design System v0.1 Callout/Card Implementation QA

## Summary

| Field | Result |
| --- | --- |
| Branch | `system/hrba-clean-foundation` |
| Source specification | `docs/design-system-v0-1-first-mvp-component-implementation-spec.md` |
| QA result | PASS |
| Recommended next step | Independent Callout/Card implementation evaluation |

## Files Changed

Implementation files created:

- `src/components/design-system/Callout.tsx`
- `src/components/design-system/Card.tsx`
- `src/components/design-system/index.ts`
- `src/components/design-system/design-system.css`

Documentation files:

- `docs/design-system-v0-1-callout-card-implementation-qa.md`
- `docs/design-system-plan-progress-alignment.md`

## Components Implemented

### Callout

`Callout` is a typed presentational primitive with:

- `variant?: 'info' | 'success' | 'warning'`
- `title?: ReactNode`
- `children: ReactNode`
- `icon?: ReactNode`
- `className?: string`
- `as?: 'aside' | 'div'`

It defaults to `div`, renders an optional visible title, wraps optional icons in an `aria-hidden="true"` container, and does not add landmark roles, dismissal, animation, live-region behavior, routing, progress, focus management, or other interaction behavior.

### Card

`Card` is a typed presentational primitive with:

- `variant?: 'default' | 'soft'`
- `title?: ReactNode`
- `eyebrow?: ReactNode`
- `children: ReactNode`
- `footer?: ReactNode`
- `className?: string`
- `as?: 'section' | 'article' | 'div'`

It defaults to `section` when `title` is present and `div` when no title is present. `article` is available only through the `as` prop. It uses neutral title/eyebrow containers, does not choose page-level heading levels, and does not add clickable card behavior.

## Styling Approach

Scoped component styling was added in `src/components/design-system/design-system.css`.

The stylesheet uses only scoped `.cso-callout*` and `.cso-card*` selectors. It does not edit `src/styles/global.css`, does not edit token files, does not create global reset rules, does not create `.is-active` selectors, and does not create Phase D/current-state selectors.

Component files import the scoped stylesheet directly so future consumers can use the primitives without global CSS edits.

## Token/CSS Compliance

PASS.

The scoped stylesheet uses existing token references only:

- surface tokens such as `var(--cso-color-surface-primary)`, `var(--cso-color-surface-soft-info)`, `var(--cso-color-surface-soft-success)`, and `var(--cso-color-surface-soft-warning)`;
- text tokens such as `var(--cso-color-text-primary)`, `var(--cso-color-text-strong)`, and `var(--cso-color-text-muted)`;
- accent tokens such as `var(--cso-color-accent-info)`, `var(--cso-color-accent-success)`, and `var(--cso-color-accent-warning)`;
- spacing, radius, border, font-size, line-height, and font-weight tokens.

No raw colors, `rgb()`, `rgba()`, gradients, unapproved shadows, token-file edits, or global CSS edits were introduced.

## Visual-Drift Advisory Result

PASS.

Changed-file scans found no matches for:

- raw hex colors;
- `rgb()` or `rgba()`;
- gradients;
- `box-shadow`;
- broad `.is-active`;
- Phase D/current-state selector patterns;
- inline visual style objects;
- copied old module code or module-specific imports.

## Accessibility And Semantic Checks

PASS.

- Callout defaults to `div`, with optional `aside` only when requested.
- Callout icons are decorative by default through an `aria-hidden="true"` wrapper.
- Callout variant meaning must remain supported by visible text/title/content rather than color alone.
- Card uses `section` only when a title is present unless the caller chooses `article` or `div`.
- Card does not render page-level headings blindly.
- No inappropriate ARIA, role inflation, keyboard trap behavior, focus management, live regions, routing, progress, completion, assessment, certificate, player, modal, drawer, HelpOverlay, or Captions/transcript behavior was added.

## Build Result

PASS.

Command:

```powershell
npm run build
```

Result:

- TypeScript build passed.
- Vite production build passed.
- Existing Vite plugin timing and large chunk warnings were reported.

## Git Diff Check Result

PASS.

Command:

```powershell
git diff --check
```

Result: no whitespace errors.

## Explicit Non-Changes

The implementation did not change:

- Button component or `Button.tsx`;
- learning blocks;
- screen templates;
- vertical slice screens;
- course screens;
- routing;
- progress;
- completion;
- assessment;
- certificate logic;
- `currentScreenId` behavior;
- accessibility toolbar behavior;
- player behavior;
- modal behavior;
- drawer behavior;
- HelpOverlay behavior;
- Captions/transcript behavior;
- assets;
- content;
- module CSS;
- old HRBA files;
- `src/styles/global.css`;
- token files;
- Phase D CSS;
- current/selected/disabled/completed/locked/danger/progress state migration.

## Risks Or Defects Found

No defects were found within the approved scope.

Residual risks:

- The primitives are not yet integrated into screens, so visual validation is limited to build and code review.
- Independent evaluation should verify that the scoped CSS and component semantics remain acceptable before any vertical-slice usage.
- Button remains behavior-adjacent and must stay deferred until a separate behavior-free specification and QA gate.

## PASS/STOP Result

PASS.

The implementation stayed limited to Callout and Card presentational primitives, used scoped token-backed CSS, passed build, passed `git diff --check`, avoided raw visual values, avoided global CSS/token edits, avoided Button and behavior-heavy components, and left Phase D CSS and vertical slice implementation blocked.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Did implementation stay limited to Callout and Card? | PASS. Only Callout and Card primitives were implemented. |
| Was Button not implemented? | PASS. No Button component or Button export was created. |
| Were no learning blocks, templates, or vertical slice screens implemented? | PASS. None were implemented. |
| Were `src/styles/global.css` and token files untouched? | PASS. They were not edited. |
| Were only scoped design-system component files created? | PASS. Implementation files are limited to `src/components/design-system/`. |
| Were raw visual values avoided? | PASS. Styling uses existing `var(--cso-...)` tokens and no raw colors, gradients, or shadows. |
| Were broad `.is-active` and Phase D/current-state selectors avoided? | PASS. No such selectors were added. |
| Are Callout and Card presentational only? | PASS. They have no routing, progress, assessment, certificate, player, modal, drawer, HelpOverlay, Captions/transcript, focus-management, or live-region behavior. |
| Were routing, progress, completion, assessment, certificate, accessibility toolbar, content, assets, module CSS, and old HRBA files untouched? | PASS. Those areas were untouched. |
| Did `npm run build` pass? | PASS. TypeScript and Vite build completed successfully with existing warnings. |
| Did `git diff --check` pass? | PASS. No whitespace errors were reported. |
| Is it safe to move to an independent Callout/Card implementation evaluation? | PASS. Independent evaluation is the recommended next task. |
| Does Phase D CSS remain blocked? | PASS. Phase D CSS remains blocked. |
| Does vertical slice implementation remain blocked? | PASS. Vertical slice implementation remains blocked. |
