# Design System v0.1 Next Component Readiness Decision

Draft v0.1 - Documentation-only decision gate after Callout, Card, and Button primitives

## Purpose

This note decides the next safe Design System v0.1 step after the scoped Callout, Card, and Button primitives.

It is a decision gate only. It does not implement code, CSS, tokens, React components, learning blocks, screen templates, screens, routing, progress, assessment, certificate logic, content, assets, scripts, module CSS, old HRBA files, or course behavior.

The goal is to keep acceleration moving without turning the new primitives into premature screen integration or behavior-heavy components.

## Current Completed Primitive Foundation

The current v0.1 primitive foundation is usable for planning but not yet ready for screen integration.

Completed primitive evidence:

- Callout is implemented as a scoped presentational primitive and independently re-evaluated with PASS WITH CAUTION in `docs/design-system-v0-1-callout-card-implementation-reevaluation.md`.
- Card is implemented as a scoped presentational primitive and independently re-evaluated with PASS WITH CAUTION in `docs/design-system-v0-1-callout-card-implementation-reevaluation.md`.
- Button is implemented as a scoped native behavior-free primitive and independently evaluated with PASS WITH CAUTION in `docs/design-system-v0-1-button-implementation-evaluation.md`.
- All three primitives are presentational or behavior-free and do not own routing, progress, completion, assessment, certificate, player, modal, drawer, HelpOverlay, Captions/transcript, platform, course, module, or screen behavior.
- No Callout, Card, or Button screen integration has happened yet.
- Phase D CSS remains blocked.
- Vertical slice implementation remains blocked.

## Cautions Carried Forward

The following cautions remain active and must shape the next task:

- Card title rendering is acceptable at primitive level, but future screen use must preserve heading hierarchy intentionally.
- Button usage boundaries are not yet documented for action hierarchy, placement, button-versus-link decisions, and behavior ownership.
- Native Button `disabled` pass-through exists, but disabled, locked, completed, current, selected, loading, and progress state migration remains blocked.
- The current scoped `design-system.css` import strategy is acceptable for v0.1, but may need future package-entry cleanup after usage patterns are known.
- No primitive has yet been validated inside a real screen or vertical slice.
- Callout must not become a decorative color panel or a substitute for content structure; future use must avoid color-only meaning and overuse.

## Next-Path Options

| Option | Classification | Decision | Rationale |
| --- | --- | --- | --- |
| Option A - Component usage boundaries note | Ready | Select as next task | This is the safest next gate because it documents how Callout, Card, and Button may be used before any screen integration. It can resolve the active cautions around heading hierarchy, action hierarchy, button-versus-link boundaries, disabled usage, Callout meaning, examples, and non-examples without changing implementation files. |
| Option B - Learning Block Frame specification | Ready with caution | Defer until after Option A | A presentational Learning Block Frame could be a safe next implementation candidate later, but it should depend on primitive usage boundaries so it does not misuse Card, Callout, or Button or imply completion/progress behavior. |
| Option C - Reflection / portfolio prompt shell specification | Ready with caution for documentation only; not ready for implementation | Defer | A documentation-only shell spec can be useful later, but the pattern touches learner input, persistence, save/skip behavior, HRBA safety notes, portfolio capture, validation, and completion rules. It should not precede primitive usage boundaries. |
| Option D - Knowledge Check option group specification | Ready with caution for documentation only; not ready for implementation | Defer | A documentation-only spec will be needed, but the pattern involves selected state, feedback, correctness, retry, assessment adjacency, keyboard behavior, and completion rules. Selected/current and progress state migration remain blocked. |
| Option E - Scenario / case panel specification | Ready with caution | Defer | A static scenario/case panel can likely stay presentational, but scenario decision behavior must remain separate. This should follow primitive usage boundaries and possibly Learning Block Frame rules. |
| Option F - Vertical slice planning | Not ready | Defer | Moving directly to vertical slice planning is premature because primitive usage boundaries, block frame rules, behavior-heavy block readiness, completion rules, and screen/template usage controls are not yet sufficient. |
| Option G - STOP | Not selected | Do not stop | The path is clear enough to proceed with documentation-only usage boundaries. No implementation should begin, but a STOP is not required because the next safe documentation gate is well defined. |

## Recommended Next Step

Create a documentation-only Design System v0.1 primitive usage boundaries guide for Callout, Card, and Button before any screen integration or new component implementation.

The guide should define:

- when to use Callout, Card, and Button;
- when not to use each primitive;
- Card heading hierarchy requirements;
- Button action hierarchy;
- Button-versus-link boundaries;
- disabled usage boundaries;
- Callout meaning, variant use, and non-color-only requirements;
- examples and non-examples;
- how primitives may support later learning blocks without owning behavior;
- stop conditions for screen integration.

## Why This Next Step Is Safest

This next task reduces risk before building blocks, templates, or screens.

It prevents misuse of Button as routing, progress, completion, player, modal, drawer, help, or course-control logic by documenting exactly where behavior ownership must live.

It prevents Card heading hierarchy problems by requiring future screens or templates to own semantic heading levels intentionally instead of letting a primitive choose them blindly.

It prevents Callout overuse and color-only meaning by defining when variants are instructional and how visible text must carry the meaning.

It prevents blank screen-by-screen production by giving future block and template specifications a small approved primitive vocabulary instead of letting screens improvise one-off structures.

It prepares Learning Block Frame, scenario, reflection, knowledge check, and vertical slice work without rushing into interactive behavior, completion rules, or screen integration before those gates exist.

## What Remains Blocked

The following remain blocked:

- Button screen integration;
- Callout/Card screen integration;
- learning block implementation;
- screen template implementation;
- vertical slice screen implementation;
- routing, progress, completion, assessment, and certificate changes;
- disabled, locked, current, selected, completed, loading, and progress state migration;
- behavior-heavy components;
- current-state CSS;
- Phase D CSS;
- global CSS;
- token edits;
- modal/accessibility styling;
- hard-coded value prevention script implementation;
- full scale-up.

## Future Sequence Proposal

Recommended sequence after this decision:

1. Create the primitive usage boundaries guide for Callout, Card, and Button.
2. Create a Learning Block Frame implementation specification that remains presentational and does not own completion logic.
3. Create behavior readiness notes for Scenario Decision, Reflection / Portfolio Capture, and Knowledge Check patterns.
4. Create HRBA Module 2 micro-slice screen/template readiness mapping, including exact completion rules and QA evidence expectations.
5. Implement a vertical slice only after the usage, block, template, behavior, completion, and QA gates pass.

## Stop Conditions

Stop future work if:

- a decision recommends implementation without a reviewed specification;
- a decision recommends screen integration before primitive usage boundaries;
- a decision recommends vertical slice implementation before block/template readiness;
- a decision approves routing, progress, completion, assessment, certificate, or storage behavior;
- a decision approves broad current-state CSS or Phase D CSS;
- a decision approves token edits or global CSS edits;
- a decision treats v0.1 as the full design system;
- a decision removes QA or independent evaluation gates.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | PASS. It creates a decision note only and changes no source implementation files. |
| Does it decide the next safe task? | PASS. The next task is a documentation-only primitive usage boundaries guide for Callout, Card, and Button. |
| Are Callout/Card/Button screen integrations still blocked? | PASS. Screen integration remains blocked. |
| Are behavior-heavy components still blocked? | PASS. Reflection, knowledge check, scenario decision, progress/continue behavior, and similar behavior-heavy components remain gated. |
| Are blocks/templates/vertical slice screens still blocked? | PASS. Learning block implementation, screen template implementation, and vertical slice screens remain blocked. |
| Are routing/progress/completion/assessment changes still blocked? | PASS. Routing, progress, completion, assessment, certificate, storage, and course behavior changes remain blocked. |
| Are CSS and token edits still blocked? | PASS. Global CSS, token edits, current-state CSS, and Phase D CSS remain blocked. |
| Is Phase D CSS still blocked? | PASS. Phase D CSS remains blocked. |
| Does the recommended next task reduce risk? | PASS. It resolves primitive usage risks before block, template, screen, or behavior implementation. |
| Is full scale-up still blocked until vertical slice validation? | PASS. Full scale-up remains blocked until a validated vertical slice passes its gates. |
