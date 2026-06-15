# Design System v0.1 Screen-Template Usage And Heading Ownership Readiness

## 1. Purpose

This note decides whether the first three Design System v0.1 screen-template components are ready for a later screen integration implementation specification:

- `ConceptIntroductionTemplate`
- `FrameworkExplanationTemplate`
- `KeyMessageSummaryTemplate`

The decision focuses on route-level heading ownership, the `h1`/`h2` relationship, `screenTitle` ownership, route wrapper and template usage boundaries, and safe integration prerequisites.

This note does not approve or implement screen integration, Module 2 micro-slice work, vertical slice screens, routing, progress, content migration, CSS, tokens, scripts, additional templates, behavior-heavy components, or scale-up.

## 2. Current Foundation Now Available

The current Design System v0.1 foundation includes:

- `Callout` as a presentational short-message primitive.
- `Card` as a presentational content-grouping primitive.
- `Button` as a native, behavior-free action primitive.
- `LearningBlockFrame` as a presentational structural wrapper.
- `ConceptExplanationBlock` as a presentational/instructional concept block.
- `KeyMessageBlock` as a presentational/instructional key-message block.
- `ConceptIntroductionTemplate` as a structural/read-only screen-template component.
- `FrameworkExplanationTemplate` as a structural/read-only screen-template component.
- `KeyMessageSummaryTemplate` as a structural/read-only screen-template component.

No course-screen integration has happened. No vertical slice has happened. No behavior-heavy blocks have been implemented.

## 3. Evidence Reviewed

This readiness decision reviewed the following documentation and read-only source patterns:

- `docs/design-system-v0-1-post-template-evaluation-decision.md`
- `docs/design-system-v0-1-first-screen-template-implementation-evaluation.md`
- `docs/design-system-v0-1-first-screen-template-implementation-qa.md`
- `docs/design-system-v0-1-first-screen-template-implementation-spec.md`
- `docs/design-system-v0-1-first-screen-template-structure-readiness.md`
- `docs/design-system-v0-1-primitive-usage-boundaries.md`
- `docs/design-system-v0-1-concept-key-message-block-implementation-evaluation.md`
- `docs/design-system-v0-1-learning-block-frame-implementation-evaluation.md`
- `docs/design-system-v0-1-learning-block-template-map.md`
- `docs/learning-block-register.md`
- `docs/screen-template-register.md`
- `docs/design-system-plan-progress-alignment.md`
- Read-only inspection of current player, route, screen heading, and landmark patterns.

The post-template decision selected this readiness note as the next safe documentation gate. The independent screen-template implementation evaluation accepted the first three templates with `PASS WITH CAUTION`, with the active caution that the templates currently render `screenTitle` as `h2` and need route-level heading ownership review before integration.

## 4. Current Heading Caution

The first three templates currently render `screenTitle` as `h2`. That is acceptable for the isolated component layer because the templates are structural/read-only and are not yet route-level screens.

The same `h2` choice is not automatically safe for route-level integration. Current route-level screens may already own an `h1`, or a future route wrapper may need to own a page-level `h1`. Future integration must avoid duplicate page headings, skipped heading levels, and missing primary headings.

Blocks remain heading-neutral. `ConceptExplanationBlock`, `KeyMessageBlock`, and `LearningBlockFrame` must not become the place where screen-level heading ownership is solved.

## 5. Read-Only Route/Player/Screen Heading Pattern Findings

Read-only inspection found that current heading ownership is mixed but coherent enough to support a cautious future route-wrapper strategy.

| Finding area | Read-only finding | Readiness impact |
| --- | --- | --- |
| Player header | `PlayerHeader` renders the module title as `h2` and renders `screenTitle` as non-heading text inside the header. | The course shell/player does not currently provide a route-level screen `h1`. The header cannot be treated as the primary screen heading without a separate spec. |
| Main content landmark | `MainScreenCanvas` renders a `main` element with `aria-label="Course screen content"` and `tabIndex={-1}`. | There is a meaningful main content landmark, but it is generically labelled and not tied to the current screen title by `aria-labelledby`. |
| Current screen headings | Many current course screens render their own `h1` inside the screen component and use `aria-labelledby` on a `section` or `main`. | Current app practice often puts primary screen identity inside the screen content, not in the player header. |
| Subheadings | Current screens commonly use `h2` for panels, recap cards, questions, feedback, and subsection titles. | A template-level `h2` could fit under a wrapper-owned `h1`, but direct route usage could create ambiguity if no `h1` exists. |
| Nested landmarks | Some current screen components render their own `main` while already being placed inside `MainScreenCanvas`'s `main`. | Landmark ownership also needs specification. Future integration must avoid adding another accidental nested `main` pattern. |
| Competing title patterns | Current patterns include player header module `h2`, header screen-title text, screen-owned `h1`, screen-owned `h2` subsections, and labelled `section`/`main` containers. | Heading ownership is not safe to infer ad hoc during implementation. It must be specified per integration wrapper/target screen. |

This evidence supports keeping template `screenTitle` as `h2` only below a confirmed route/screen `h1`. It does not support using these templates directly as route-level screens without a wrapper or explicit usage rule.

## 6. Heading Ownership Options

| Option | Classification | Decision notes |
| --- | --- | --- |
| Option A - Route owns `h1`, template keeps `h2` | Ready with caution | Preferred future integration path. A route/screen wrapper owns the primary `h1`; templates keep `screenTitle` as `h2`; blocks remain heading-neutral. The future integration specification must verify the target route and landmark structure before implementation. |
| Option B - Template owns `h1` | Not ready | This conflicts with the current template implementation and could create duplicate `h1` or inconsistent hierarchy when a route wrapper or existing screen already owns primary identity. |
| Option C - Caller-owned heading component | Ready with caution | This may be a cleaner long-term template API if wrapper-owned `h1` is not reliable, but it would require a separate template/interface change and is not approved by this note. |
| Option D - Keep current `h2` temporarily with integration caution | Ready with caution | Acceptable as the current isolated component stance. It must remain temporary until the future screen integration specification confirms route-level `h1` ownership. |
| Option E - Stop and require heading refactor before integration | Not selected | Current evidence is not unsafe enough to stop the documentation path. It is unsafe enough to block implementation until a screen integration specification documents the final hierarchy. |

## 7. Recommended Heading Ownership Decision

Readiness result: **PASS WITH CAUTION**.

The recommended path is Option A, guarded by Option D until a future implementation specification is reviewed. A future route/screen wrapper should own page-level identity and the primary `h1`; the three templates may keep `screenTitle` as `h2` only when the wrapper-owned `h1` is confirmed.

If a target route lacks a valid primary `h1`, if the wrapper cannot own `h1`, or if landmark ownership remains unclear, future implementation must stop and create a route-level heading/landmark specification or refactor readiness note before integration.

## 8. Screen-Template Usage Boundaries

`ConceptIntroductionTemplate` may later be used only for read-only concept introduction screens with one concept explanation and an optional key message.

`FrameworkExplanationTemplate` may later be used only for read-only explanation screens with one or two concept blocks and an optional key message.

`KeyMessageSummaryTemplate` may later be used only for read-only summary or transition screens with one key message and an optional explanation.

For all three templates:

- No `Button` usage.
- No Continue or Next behavior.
- No routing, progress, or completion ownership.
- No assessment or scoring.
- No learner input or storage.
- No feedback state.
- No selected, current, completed, or locked state.
- No screen completion marker.
- No behavior-heavy blocks.
- No direct old screen code copy-paste.
- No template may be used as a route without a wrapper and usage rule.

## 9. Allowed Future Route Wrapper Pattern

A future route-level screen integration specification may define a wrapper pattern with these boundaries:

- The route/screen wrapper owns page-level identity.
- The route/screen wrapper may own `h1` if current app structure requires it.
- The template sits below the route/screen wrapper.
- The template may keep `screenTitle` as `h2` only if wrapper `h1` is confirmed.
- Blocks remain heading-neutral.
- The route wrapper owns progress, completion, and routing decisions only if separately approved.
- Templates remain structural, read-only, and behavior-free.

This note does not create or implement a wrapper.

## 10. Screen Integration Prerequisites

Before any screen integration implementation, require:

- A documentation-only screen integration implementation specification.
- Exact target screens or micro-slice screens identified.
- Route-level heading strategy documented.
- Allowed templates selected per screen.
- Content mapping documented.
- Completion/progress boundary documented.
- QA plan documented.
- Stop conditions documented.
- No behavior-heavy blocks unless separately approved.
- No token or global CSS edits unless separately approved.

## 11. Relationship To Module 2 Micro-Slice

These usage and heading rules prepare for later Module 2 micro-slice planning, but they do not approve it.

Examples only:

- `ConceptIntroductionTemplate` could support a later rights-holders introduction screen.
- `ConceptIntroductionTemplate` could support a later duty-bearers introduction screen.
- `FrameworkExplanationTemplate` could support a later rights-holder/duty-bearer relationship explanation.
- `KeyMessageSummaryTemplate` could support a later meaningful participation summary or transition.

Module 2 micro-slice planning remains blocked until this readiness note is reviewed and a screen integration specification gate is complete or explicitly selected next. Module 2 implementation remains blocked. Module 2 content migration remains blocked.

## 12. Accessibility Expectations For Future Integration

Future integration must preserve:

- One clear primary page/screen heading pattern.
- No duplicate page headings.
- No skipped heading levels without a documented reason.
- A meaningful main content landmark.
- Reading order of route/screen title, template content, then blocks.
- Heading-neutral blocks.
- No alert or live-region behavior for `KeyMessageBlock`.
- No focus management by these templates.
- No keyboard traps.
- No color-only meaning.
- Screen help metadata as a future separate concern unless specified.

## 13. Token, CSS, And Visual Drift Boundaries

This readiness note approves no token edits, no global CSS edits, and no template CSS edits.

Future integration must not introduce raw colors, gradients, shadows, broad `.is-active` selectors, Phase D/current-state selectors, global reset selectors, or module-specific selectors. Future integration should use existing template/component CSS only unless separately approved.

If new visual styling is needed, stop and create a separate CSS/token readiness note.

## 14. Options For Next Task After This Readiness Note

| Option | Classification | Notes |
| --- | --- | --- |
| Option A - Documentation-only first screen integration implementation specification | Ready with caution | Recommended next task. It should specify exact target route/screen usage, heading strategy, wrapper relationship, content mapping, QA, and stop conditions. |
| Option B - Documentation-only Module 2 micro-slice planning note | Ready with caution, deferred | May be safe only after the integration specification path is selected or if planning stays strictly documentation-only. |
| Option C - Additional template/block specification | Ready with caution, deferred | Useful later, but the first integration path should become clearer before expanding templates or blocks. |
| Option D - STOP / heading refactor readiness | Not selected | Use only if a future target route cannot provide a safe `h1`/landmark strategy. |

## 15. Recommended Next Task

Create a documentation-only first screen integration implementation specification for a very small set of screens or a pre-micro-slice integration plan. It must still not implement screens.

That specification should define the route wrapper relationship, route-level `h1`, template `h2`, main/landmark handling, exact target screens, content mapping, completion/progress boundaries, QA checks, and stop conditions.

If future inspection cannot confirm route-level heading and landmark ownership for the selected targets, create a documentation-only route-level heading structure audit before any integration specification proceeds to implementation.

## 16. Stop Conditions

Stop if a future decision or task:

- Recommends implementation without a reviewed specification.
- Recommends screen integration before heading ownership is documented.
- Recommends vertical slice implementation before screen integration gates.
- Approves behavior-heavy blocks too early.
- Approves completion, progress, assessment, storage, feedback, or scoring logic.
- Approves routing or Continue/Next behavior.
- Approves token or global CSS edits.
- Approves Phase D CSS or current-state CSS.
- Treats Design System v0.1 as the full design system.
- Removes QA or independent evaluation gates.

## 17. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | Yes. |
| Does it address the `h2`/route-level heading caution? | Yes. It keeps template `h2` acceptable only below a confirmed wrapper-owned `h1`. |
| Does it inspect route/player/screen heading patterns read-only? | Yes. It records read-only findings from `PlayerHeader`, `MainScreenCanvas`, and current screen patterns. |
| Does it define heading ownership options? | Yes. Options A through E are classified. |
| Does it recommend a safe heading ownership path? | Yes. Option A is preferred with Option D caution until the integration specification verifies targets. |
| Are blocks still heading-neutral? | Yes. |
| Are templates still read-only and behavior-free? | Yes. |
| Is screen integration still blocked? | Yes. |
| Is vertical slice implementation still blocked? | Yes. |
| Is Module 2 micro-slice implementation still blocked? | Yes. |
| Are additional templates still gated? | Yes. |
| Are behavior-heavy blocks still blocked? | Yes. |
| Are routing/progress/completion/assessment/storage/feedback/scoring changes still blocked? | Yes. |
| Are CSS and token edits still blocked? | Yes. |
| Is Phase D CSS still blocked? | Yes. |
| Is the recommended next task clear? | Yes. Create a documentation-only first screen integration implementation specification for a very small target set or pre-micro-slice integration plan. |
| Is full scale-up still blocked? | Yes. |
