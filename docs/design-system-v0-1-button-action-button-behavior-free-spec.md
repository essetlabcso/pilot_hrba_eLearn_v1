# Design System v0.1 Button / Action Button Behavior-Free Specification

Draft v0.1 - Documentation-only specification for a future Button primitive

## Purpose

This document prepares a future Button / action-button primitive implementation for Design System v0.1.

It does not implement Button. It does not create React components, CSS, tokens, learning blocks, screen templates, screens, routes, content, assets, scripts, or QA automation.

The future Button primitive must be behavior-free. It may provide native button semantics, accessible structure, token-backed visual variants, and safe sizing, but it must not own routing, progress, completion, assessment, certificate, screen navigation, player state, modal/drawer/help behavior, accessibility toolbar behavior, course logic, or vertical-slice flow.

## Source Evidence Reviewed

| Source | Relevant finding |
| --- | --- |
| `docs/design-system-v0-1-callout-card-implementation-reevaluation.md` | Callout/Card re-evaluation records PASS WITH CAUTION. The previous token-reference STOP defect is resolved. It recommends this documentation-only Button / action-button behavior-free specification before any Button implementation. |
| `docs/design-system-v0-1-first-mvp-component-implementation-spec.md` | Button was deferred from the first implementation slice because existing button patterns are adjacent to navigation, progress, completion, disabled states, and player behavior. |
| `docs/design-system-v0-1-component-inventory-and-priority-plan.md` | Button / action button is useful for v0.1 and classified as Ready with caution, but behavior-heavy option groups, reflection shells, scenario decisions, and progress/continue patterns remain gated. |
| `docs/design-system-v0-1-visual-drift-prevention-plan.md` | Future shared components must avoid raw values, gradients, unapproved shadows, broad `.is-active`, Phase D/current-state selectors, inline visual drift, and copied module CSS. |
| `docs/design-system-v0-1-qa-evidence-pack.md` | Future implementation must include build, changed files, explicit non-changes, token/CSS compliance, visual-drift checks, accessibility checks, PASS/STOP result, and alignment update. |
| `docs/implementation-ready-token-specification.md` | Component code must consume named tokens, not raw hex, rgba, spacing, radius, or shadow values. Missing tokens must stop work and be documented instead of invented. Existing action, focus, spacing, radius, border, font-size, line-height, and font-weight tokens support a limited Button primitive. |
| `docs/ai-production-contract.md` and `docs/design-system/08_AGENT_IMPLEMENTATION_RULES.md` | System decisions must be documented before implementation. Agents must use approved tokens, approved components, approved interaction logic, and must not invent component behavior. |
| `docs/design-system-plan-progress-alignment.md` | Current status records Callout/Card as implemented, corrected, and re-evaluated with PASS WITH CAUTION. The next safe task is this documentation-only Button / action-button behavior-free specification; Button implementation, Phase D CSS, vertical slice implementation, and full scale-up remain blocked. |
| `src/components/player/PlayerHeader.tsx` | Existing player header buttons are tied to previous/next/exit screen navigation and disabled gates. They are behavior evidence only, not a source to copy. |
| `src/components/player/PlayerSidebar.tsx` | Existing sidebar buttons include modal/drawer/help launchers, `aria-expanded`, conditional `aria-controls`, media controls, and broad `.is-active` state. These patterns must remain excluded from the first Button primitive. |
| `src/components/platform/ModuleLaunchCard.tsx` and `src/components/platform/PlatformShell.tsx` | Existing platform CTAs are tied to module launch, progress, locked/completed status, final assessment access, and reset behavior. They are behavior-adjacent and must not be generalized into the first Button primitive. |

## Why Button Is Higher-Risk Than Callout/Card

Callout and Card are presentational primitives. Button is more sensitive because button-like UI in this repo is often connected to:

- navigation;
- progress;
- continue actions;
- completion gates;
- disabled/locked states;
- assessment submission;
- player shell actions;
- modal, drawer, help, transcript, media, and launcher controls;
- route changes;
- course reset and module launch behavior.

Therefore the v0.1 Button primitive must separate visual and semantic button structure from application behavior. The primitive may expose native button attributes and accept caller-provided handlers, but it must not import, compute, or own application behavior.

## Button Scope Decision

| Candidate | Classification | Decision | Rationale |
| --- | --- | --- | --- |
| Basic Button primitive | Ready with caution | Include in future first Button slice | Safe only as a native `button` with token-backed variants, default `type="button"`, and no internal behavior ownership. |
| Action Button visual variant | Ready with caution | Include as visual variants only | Primary/secondary/ghost visual treatments can be useful if they do not imply navigation, progress, completion, or gating. |
| Link-looking button | Not ready | Defer | Link rendering mixes navigation semantics with button semantics and needs a separate LinkButton or ActionLink specification. |
| Icon button | Not ready | Defer | Icon-only buttons require accessible-name, target-size, tooltip/label, and state rules beyond this first slice. |
| Continue/Next button | Not ready | Defer | Continue/Next is tied to screen navigation, progress, completion gates, and player rules. |
| Submit/Check answer button | Not ready | Defer | Assessment and knowledge-check submission require form/group semantics, feedback, scoring, and state rules. |
| Disabled button | Ready with caution for native disabled only | Include only as native `disabled` support | Native disabled may be allowed, but this does not approve disabled-state migration, locked styling, completed styling, progress gating, or opacity-only state design. |
| Loading button | Not ready | Defer | Loading state needs async behavior, status semantics, possible live-region rules, and visual state tokens. |
| Destructive/danger button | Not ready | Defer | Danger/destructive treatment needs separate token, contrast, copy, and confirmation rules. |
| Player shell button replacement | Not ready | Defer | Player shell buttons are tied to routing, modal/drawer/help/media behavior, current state, focus return, and Phase D risks. |

## Future Button Primitive Design

Future file path, if separately approved:

- `src/components/design-system/Button.tsx`

Optional CSS location, only if separately approved by the implementation task:

- `src/components/design-system/design-system.css`

Future export location:

- `src/components/design-system/index.ts`

Safe interface concept:

```ts
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}
```

Future implementation requirements:

- render a native `button`;
- default `type` to `"button"`;
- pass caller-provided `onClick` through without adding internal routing/progress logic;
- allow native `disabled` only as ordinary HTML disabled behavior;
- import React types and scoped CSS only;
- do not import routing, progress, completion, assessment, certificate, player state, modal/drawer/help logic, course modules, or platform state;
- do not create a link or route abstraction.

## Link/Button Decision

The first v0.1 Button primitive should not support link rendering.

Link support is deferred because it can mix navigation semantics with button semantics. A future `LinkButton` or `ActionLink` specification should decide routing, link styling, active/current state, focus behavior, and visited/external-link rules separately.

The future Button implementation must not render React Router `Link`, `NavLink`, anchor elements, or route-aware wrappers.

## Disabled-State Decision

Native `disabled` may be acceptable for a basic button only.

This does not approve:

- disabled-state token migration;
- locked-state styling;
- completed-state styling;
- selected/current styling;
- progress gating;
- opacity-only state design;
- player navigation disabled logic;
- course completion rules.

The first future Button implementation should not define completed, locked, selected, current, loading, danger, or progress state recipes.

## Visual Variant Decision

Approved for the first future Button implementation slice:

- `primary`;
- `secondary`;
- `ghost`.

Deferred:

- danger;
- success;
- warning;
- selected/current;
- completed;
- locked;
- loading;
- icon-only;
- full-width continue/progress button;
- player-shell button variants.

## Token And CSS Guardrails

Future implementation rules:

- no raw hex colors;
- no `rgb()` or `rgba()`;
- no gradients;
- no unapproved shadows;
- no broad `.is-active`;
- no Phase D/current-state selectors;
- no global reset selectors;
- no module-specific selectors;
- no token-file edits unless separately approved;
- no `src/styles/global.css` edits;
- use only existing approved tokens;
- if a needed token is missing, stop and document it instead of inventing values;
- keep scoped class names only.

Approved future class-name shape:

- `.cso-button`;
- `.cso-button--primary`;
- `.cso-button--secondary`;
- `.cso-button--ghost`;
- `.cso-button--sm`;
- `.cso-button--md`.

Do not reuse player, platform, module, course, or old HRBA button class names.

## Accessibility And Semantic Requirements

Future implementation expectations:

- use a native `button` element;
- default `type` to `"button"`;
- preserve visible focus using approved focus tokens;
- preserve accessible name from `children`;
- allow `aria-label` only through native button props if a later approved interface extends the concept;
- no role inflation;
- no inappropriate ARIA;
- no keyboard trap;
- no live region;
- no automatic focus management;
- no color-only meaning;
- disabled uses native `disabled` only if included;
- no `aria-current`;
- no `aria-pressed` unless a separate toggle-button specification is approved;
- no `aria-expanded` or `aria-controls` unless a separate disclosure/launcher specification is approved;
- no internal tooltip, status, busy, or loading semantics in the first slice.

## Explicit Exclusions

The first future Button implementation excludes:

- routing links;
- React Router `Link` or `NavLink`;
- progress/continue buttons;
- assessment submit/check-answer buttons;
- certificate actions;
- completion gating;
- locked/completed/selected/current states;
- loading state;
- danger/destructive button;
- icon-only button;
- toggle button;
- disclosure button;
- modal/drawer/help launchers;
- player shell button replacement;
- old course/module button refactor;
- Callout/Card screen integration;
- learning block implementation;
- screen template implementation;
- vertical slice screen work.

## Future Implementation Readiness Classification

PASS WITH CAUTION.

A future Button primitive is ready only if implementation remains behavior-free, native-button-only, variant-limited, token-backed, scoped, and isolated from routing/progress/course/player behavior.

This is not approval to implement Button in this task. Button implementation remains blocked until this specification is reviewed and a separate bounded implementation task is approved.

## Recommended Future Implementation Slice

Smallest safe future implementation task:

Implement Button as a behavior-free primitive only, with:

- `primary`, `secondary`, and `ghost` variants;
- `sm` and `md` sizes;
- native `button` semantics;
- default `type="button"`;
- native `disabled` pass-through only;
- caller-provided `onClick` pass-through only;
- scoped `.cso-button*` CSS;
- no link support;
- no routing/progress logic;
- no state migration;
- no screen integration;
- no global CSS edits;
- no token edits.

## QA Plan For Future Button Implementation

Use `docs/design-system-v0-1-qa-evidence-pack.md`.

Required checks:

- `npm run build`;
- `git diff --check`;
- changed-file visual-drift advisory check;
- token-reference existence check;
- semantic/accessibility check for native button behavior and visible focus;
- import check confirming no routing, progress, course, platform, player behavior, modal, drawer, help, or captions imports;
- confirmation that no screen integration occurred;
- confirmation that no route, progress, content, module, assessment, certificate, accessibility toolbar, asset, or old HRBA files changed;
- confirmation that no global CSS or token files changed;
- PASS/STOP result;
- alignment update.

## Stop Conditions For Future Implementation

Stop if:

- Button requires routing, progress, completion, assessment, certificate, or player behavior;
- link support is pulled into the first implementation;
- icon-only, toggle, disclosure, launcher, danger, loading, selected/current, completed, locked, or progress states are pulled in;
- token files must be edited;
- `src/styles/global.css` must be edited;
- raw visual values are needed;
- broad `.is-active` or Phase D/current-state selectors appear;
- screen, template, block, or vertical slice work starts;
- old course button code is copied directly into the shared primitive;
- heading, Card, or Callout issues are pulled into the Button task;
- implementation begins before this specification is reviewed.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | PASS. It creates a specification only and does not implement Button or source files. |
| Is Button implementation still blocked? | PASS. Button implementation remains blocked until this specification is reviewed and a separate bounded implementation task is approved. |
| Is a behavior-free Button primitive ready? | PASS WITH CAUTION. It is ready only as a native, behavior-free, variant-limited primitive. |
| Are routing/progress/completion/assessment behaviors excluded? | PASS. They are explicitly excluded from the primitive. |
| Is link support deferred? | PASS. Link rendering is deferred to a future LinkButton or ActionLink specification. |
| Are disabled/current/selected/completed/locked/danger/loading states deferred? | PASS. Native `disabled` pass-through may be allowed, but state migration and all listed state variants are deferred. |
| Are modal/drawer/help launcher patterns excluded? | PASS. Launcher/disclosure patterns are excluded and require separate specifications. |
| Are CSS and token edits blocked? | PASS. Token edits and global CSS edits are blocked; scoped CSS is allowed only in a future approved implementation task. |
| Are screen/template/block/vertical slice changes blocked? | PASS. Those changes remain blocked. |
| Is the recommended future implementation slice clear? | PASS. Implement a behavior-free native Button with `primary`, `secondary`, `ghost`, `sm`, and `md` only. |
| Is Phase D CSS still blocked? | PASS. Phase D CSS remains blocked. |
| Is full scale-up still blocked? | PASS. Full scale-up remains blocked until vertical slice validation passes. |
