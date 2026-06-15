# Design System v0.1 First MVP Component Implementation Specification

Draft v0.1 - Documentation-only specification for the first low-risk component slice

## Purpose

This document prepares the first MVP component implementation slice for Design System v0.1.

It is not component implementation. It does not create React components, CSS, tokens, learning blocks, screen templates, screens, routes, content, assets, scripts, or QA automation.

The purpose is to define a small, bounded, reviewable future implementation task for the lowest-risk presentational primitives. The first slice should help stop blank screen-by-screen production without touching routing, progress, completion, assessment, certificate logic, player behavior, modal behavior, or Phase D/current-state CSS.

## Source Evidence Reviewed

| Source | Relevant finding |
| --- | --- |
| `docs/design-system-v0-1-component-inventory-and-priority-plan.md` | Identifies Callout / key message as Ready and low risk; Card / content panel as Ready with caution; Button / action button as Ready with caution but behavior-adjacent. Behavior-heavy option groups, reflection shells, scenario decisions, and progress/continue patterns remain gated. |
| `docs/design-system-v0-1-learning-block-template-map.md` | Recommends a Module 2 micro-slice around rights-holders, duty-bearers, and participation. The first screens need Key Message, Concept Explanation, static card/panel, and later behavior-heavy scenario, reflection, and knowledge-check blocks. |
| `docs/design-system-v0-1-visual-drift-prevention-plan.md` | Requires advisory-first drift prevention. New raw values, gradients, unapproved shadows, broad `.is-active`, Phase D/current-state selectors, and inline visual style objects in shared components should be flagged. |
| `docs/design-system-v0-1-qa-evidence-pack.md` | Defines reusable evidence requirements: changed files, explicit non-changes, build result, token/CSS compliance, visual-drift check, accessibility checks, PASS/STOP result, and recommended next step. |
| `docs/implementation-ready-token-specification.md` | Requires component code to consume named tokens, not raw hex, rgba, spacing, radius, or shadow values. Missing tokens must be documented instead of invented. Focus, contrast, state, and shadow rules remain controlled. |
| `docs/design-system-plan-progress-alignment.md` | Confirms Design System v0.1 Boundary Note and Acceleration Pack are complete. It recommends a bounded first MVP component implementation specification before coding. Phase D CSS, token edits, component implementation, block/template implementation, vertical slice implementation, and full scale-up remain blocked. |
| `docs/ai-production-contract.md` and `docs/design-system/08_AGENT_IMPLEMENTATION_RULES.md` | Require AI to operate inside approved system rules, avoid unapproved local CSS and one-off components, and return evidence after implementation. |

## First MVP Component Scope Decision

Recommended future implementation option: **Option A - Implement Callout and Card only as presentational MVP primitives.**

Reason:

- Callout / key message is the lowest-risk primitive and maps directly to the Key Message / Statement Block.
- Card / content panel is needed for concept and scenario presentation, but can remain presentational.
- Button / action button is useful, but current button usage is close to player navigation, route movement, progress, disabled states, and completion actions. It should be specified separately to avoid accidental behavior migration.

| Candidate | Classification | Decision | Rationale |
| --- | --- | --- | --- |
| Callout / key message | Ready | Include in first slice | Presentational, text-first, low behavior risk, supports early vertical-slice screens. |
| Card / content panel | Ready with caution | Include in first slice | Presentational and needed, but must avoid unapproved shadows, layout overreach, and semantic role inflation. |
| Button / action button | Ready with caution | Defer to separate slice | Must remain native and behavior-free, but in this repo button patterns are tied to navigation, progress, completion, and disabled-state risk. |

## Component Specifications

### Callout / Key Message

| Field | Specification |
| --- | --- |
| Purpose | Highlight one principle, reminder, safety note, or key message without creating a full learning block. |
| Intended v0.1 use | Orientation screen message, concept takeaway, HRBA safety note, plain-language reminder. |
| Likely future file path | `src/components/design-system/Callout.tsx` |
| Props/interface concept | `variant?: 'info' \| 'success' \| 'warning'`; `title?: ReactNode`; `children: ReactNode`; `icon?: ReactNode`; `className?: string`. |
| Semantic HTML requirements | Render as `aside` or `div` by default; use a heading element only when `title` is provided; do not add landmark roles by default. |
| Accessibility requirements | Text must be readable without color meaning; variant meaning must be supported by visible text, label, or icon when meaningful; icon must be decorative unless explicitly labelled. |
| Token usage requirements | Use approved surface/text/border tokens such as soft info, soft success, soft warning, primary/secondary text, spacing, radius, and border tokens. No raw visual values. |
| Visual drift guardrails | No gradients, no local shadows, no raw hex/rgb/rgba, no inline visual style object, no module-specific class names. |
| Responsive requirements | Content wraps naturally; no fixed width; no CTA buried by oversized text; icon/title/text stack safely on mobile. |
| Allowed variants | `info`, `success`, `warning`; optional compact density only if token-backed and approved in the implementation prompt. |
| Explicitly excluded variants | `danger`, `current`, `selected`, `completed`, `locked`, `disabled`, animated, dismissible, toast/alert, modal notice. |
| Implementation risks | Warning/success variants may imply state behavior; keep them presentational and text-supported. |
| QA requirements | Build, semantic check, contrast/token review, visual-drift advisory check, responsive smoke check if previewed. |
| Stop conditions | Stop if variant requires danger state, live-region behavior, dismissal, animation, or unapproved tokens/CSS. |

### Card / Content Panel

| Field | Specification |
| --- | --- |
| Purpose | Provide a reusable content surface for concept explanations, short scenarios, summaries, and static panel content. |
| Intended v0.1 use | Concept Introduction, Comparison intro, static Scenario / case panel context, Completion Transition summary. |
| Likely future file path | `src/components/design-system/Card.tsx` |
| Props/interface concept | `variant?: 'default' \| 'soft'`; `title?: ReactNode`; `eyebrow?: ReactNode`; `children: ReactNode`; `footer?: ReactNode`; `className?: string`; `as?: 'section' \| 'article' \| 'div'`. |
| Semantic HTML requirements | Default to `section` when a title is present and `div` when not; title should be a real heading supplied by caller or rendered with an appropriate level only if a safe heading-level prop is approved. |
| Accessibility requirements | Preserve heading hierarchy; no clickable card behavior in this slice; no nested interactive card pattern; no role inflation; content must remain readable without layout-only cues. |
| Token usage requirements | Use approved surface, border, text, spacing, radius, and shadow tokens only. If a shadow token is unavailable or not accepted, use border/surface hierarchy instead of inventing a shadow. |
| Visual drift guardrails | No hard-coded shadow, no raw colors, no gradients, no local spacing/radius values, no inline visual style object, no full-width page section styling. |
| Responsive requirements | Fluid width; content wraps; no fixed-height card; no desktop-only two-column assumption; footer stacks on mobile. |
| Allowed variants | `default`, `soft`; optional `withFooter` structure through `footer` prop. |
| Explicitly excluded variants | Clickable card, selectable card, active/current card, completed/locked/disabled card, danger card, modal card, dashboard/stat card, image card. |
| Implementation risks | Card can become a catch-all layout abstraction; keep it as a simple content panel only. |
| QA requirements | Build, semantic heading review, token/CSS compliance, visual-drift advisory check, responsive smoke check if previewed. |
| Stop conditions | Stop if implementation needs broad CSS, image handling, selectable state, nested card layout, or old module screen code copied into the component. |

### Button / Action Button

| Field | Specification |
| --- | --- |
| Purpose | Standardize native action button presentation in a later slice. |
| Intended v0.1 use | Future start/continue/secondary actions only after behavior boundaries are explicit. |
| Likely future file path | `src/components/design-system/Button.tsx`, only after separate approval. |
| Props/interface concept | `variant?: 'primary' \| 'secondary'`; `type?: 'button' \| 'submit' \| 'reset'`; `children: ReactNode`; native button props; no routing prop. |
| Semantic HTML requirements | Must render a native `button`; no link/navigation abstraction; no ARIA role needed for ordinary buttons. |
| Accessibility requirements | Clear accessible name, visible focus, no inappropriate ARIA, disabled behavior only if separately specified. |
| Token usage requirements | Existing action, text, focus, border, spacing, and radius tokens. Hover/focus may need scoped CSS approval. |
| Visual drift guardrails | No raw values, no local hover colors, no gradients, no broad state selectors, no `.is-active`, no player button class reuse. |
| Responsive requirements | Touch target must remain usable; label wraps or layout adapts without hidden text. |
| Allowed variants | Future `primary` and `secondary` only. |
| Explicitly excluded variants | Navigation button, route link, progress/continue gate, disabled-state migration, loading state, danger button, icon-only button, player header/sidebar replacement. |
| Implementation risks | High adjacency to routing, progress, completion, assessment, and disabled/current states. |
| QA requirements | Separate future QA with keyboard/focus and no route/progress changes. |
| Stop conditions | Stop if Button starts using player navigation behavior, progress/completion state, routing props, disabled migration, or Phase D/current-state styling. |

Button is not included in the recommended first implementation slice.

## Recommended File Architecture

Future minimal structure for Option A:

- `src/components/design-system/Callout.tsx`
- `src/components/design-system/Card.tsx`
- `src/components/design-system/index.ts`

Future structure only if Button is separately approved:

- `src/components/design-system/Button.tsx`

Do not create these files during this specification task.

Component CSS recommendation:

- Avoid broad global CSS additions.
- Do not edit `src/styles/global.css` for the first slice unless a future prompt explicitly approves a scoped selector addition.
- Prefer semantic component markup plus minimal, stable component class names.
- If visual styling is required in implementation, use a future scoped design-system CSS file only if separately approved, for example `src/components/design-system/design-system.css`, and import it through an approved entry point.
- If scoped CSS is not approved, the implementation must stop rather than use inline visual style objects or raw values.

## Token And Style Rules

Future components must:

- use existing approved tokens where available;
- document missing tokens instead of inventing values;
- introduce no raw hex colors;
- introduce no hard-coded `rgb()` or `rgba()` unless explicitly approved;
- introduce no new shadows unless tokenized or already approved;
- introduce no gradients;
- introduce no broad `.is-active`;
- introduce no Phase D/current-state selectors;
- introduce no selected/current, disabled, completed, locked, danger, or progress state styling;
- introduce no inline visual style objects in shared components unless explicitly justified and documented;
- avoid copying old module CSS or renderer styles into shared components.

## Accessibility And Semantic Rules

For Callout and Card:

- preserve heading hierarchy;
- do not choose heading level blindly if the parent screen owns heading structure;
- maintain readable text and contrast;
- do not rely on color alone for meaning;
- use decorative icons only with `aria-hidden="true"` unless the icon adds unique meaning;
- avoid inappropriate ARIA and role inflation;
- do not create keyboard trap behavior;
- do not add live regions, focus management, or modal behavior;
- do not make cards clickable in this slice.

If Button is later included:

- use native `button`;
- preserve visible focus;
- do not use ARIA roles for ordinary button behavior;
- do not combine with routing, progress, completion, assessment, or player navigation behavior.

## Exclusions

This specification explicitly excludes:

- knowledge check option group;
- reflection / portfolio prompt shell;
- scenario decision behavior;
- progress/continue gating;
- selected/current state CSS;
- disabled, completed, locked, danger, and progress state migration;
- routing, progress, completion, assessment, and certificate changes;
- modal/accessibility styling;
- Menu drawer close button;
- vertical slice screen implementation;
- full component library implementation;
- full HRBA course rebuild;
- Phase D CSS;
- hard-coded value prevention scripts;
- broad state migration;
- full scale-up.

## Future Implementation Prompt Outline

Recommended next implementation task title:

**Implement Callout and Card only as presentational MVP primitives**

Recommended scope:

- Create `src/components/design-system/Callout.tsx`.
- Create `src/components/design-system/Card.tsx`.
- Create `src/components/design-system/index.ts` only if useful for exports.
- Do not implement Button.
- Do not edit routing, progress, assessment, certificate logic, screen completion, `currentScreenId`, accessibility toolbar behavior, assets, content, module CSS, old HRBA files, course screens, player behavior, modal styling, or Phase D/current-state CSS.
- Stop if styling requires raw values, `src/styles/global.css`, token edits, or broad CSS without explicit approval.

Selected option: **Option A**.

Option B, Callout + Card + Button, is deferred because Button needs a separate behavior-free specification and QA gate.

Option C is not required because token and CSS boundaries are clear enough for Callout and Card, provided the future prompt explicitly handles scoped CSS or stops before visual drift.

## QA Plan For Future Implementation

Use `docs/design-system-v0-1-qa-evidence-pack.md`.

Required checks:

- `npm run build`;
- changed files list;
- explicit files not changed list;
- token/CSS compliance review;
- visual-drift advisory check for changed files;
- semantic/accessibility checks for Callout and Card;
- responsive smoke check if components are previewed or used in a demo route;
- confirmation that no routing, progress, completion, assessment, certificate, accessibility toolbar, asset, content, module CSS, old HRBA, or course-screen changes occurred;
- PASS/STOP result;
- recommended next step.

Build is required for the future implementation task, even though it is not required for this documentation-only specification.

## Stop Conditions For Future Implementation

Stop if:

- raw visual values are introduced;
- CSS or token files must be edited without explicit approval;
- routing, progress, completion, assessment, or certificate behavior is touched;
- a component requires behavior-heavy state;
- Button implementation starts using player navigation or progress behavior;
- knowledge check, reflection, scenario decision, or vertical slice screens are pulled into the same task;
- broad `.is-active` or Phase D/current-state CSS appears;
- old course module code is copied directly into shared components;
- implementation begins before this specification is reviewed;
- component styling cannot be implemented without violating the visual drift prevention plan.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | PASS. It creates a specification only and does not implement files outside documentation. |
| Does it identify the first safe MVP component slice? | PASS. The recommended first slice is Callout and Card only. |
| Does it keep behavior-heavy components gated? | PASS. Button, knowledge check, reflection, scenario decision, and progress/continue gating are deferred. |
| Does it avoid CSS/token edits? | PASS. It does not edit CSS or tokens and requires future explicit approval for any scoped CSS. |
| Does it avoid route/progress/content changes? | PASS. Those areas are explicitly excluded. |
| Does it prevent blank screen-by-screen production? | PASS. It prepares reusable presentational primitives for later block/template implementation. |
| Does it define clear stop conditions? | PASS. Future implementation must stop for raw values, unapproved CSS/tokens, behavior drift, copied module code, or Phase D/current-state work. |
| Does it recommend the exact next task? | PASS. Next task is `Implement Callout and Card only as presentational MVP primitives`, after review. |
| Is Phase D CSS still blocked? | PASS. Phase D CSS remains blocked. |
| Is vertical slice implementation still blocked? | PASS. Vertical slice implementation remains blocked until later validation gates. |
