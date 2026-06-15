# Design System v0.1 Block/Template Readiness Decision

Draft v0.1 - Documentation-only decision gate for the post-LearningBlockFrame path

## 1. Purpose

This note decides the next safe Design System v0.1 path after LearningBlockFrame passed independent evaluation with PASS WITH CAUTION.

It is a decision gate only. It does not approve or implement learning blocks, screen templates, screens, routing, progress, completion, assessment, certificate logic, storage, feedback, selected state, content, CSS, tokens, scripts, or scale-up.

The goal is to move from primitive readiness toward reusable learning-block readiness without jumping into screen-by-screen production.

## 2. Current Foundation Now Available

The approved primitive foundation is now strong enough for the next documentation gate:

| Primitive or guide | Current status | Boundary |
| --- | --- | --- |
| Callout | Presentational short-message primitive; PASS WITH CAUTION after independent re-evaluation. | Meaningful support message only; not decorative, not color-only, and not a feedback/completion/status engine. |
| Card | Presentational content grouping primitive; PASS WITH CAUTION after independent re-evaluation. | Groups related content without clickable, route-owning, heading-owning, progress, or modal behavior. |
| Button | Behavior-free native action primitive; PASS WITH CAUTION after independent evaluation. | Native button only; caller owns behavior; no routing, progress, assessment, modal launcher, Continue, or Next ownership. |
| LearningBlockFrame | Presentational structural wrapper; PASS WITH CAUTION after independent evaluation. | Structural wrapper only; not a learning block; no heading hierarchy ownership, completion, progress, storage, feedback, or screen integration. |
| Primitive usage boundaries | Complete. | Defines safe and unsafe uses for Callout, Card, and Button before screen integration. |

No screen integration has happened yet.

No learning block implementation has happened yet.

No screen template implementation has happened yet.

## 3. Key Cautions Shaping This Decision

These cautions remain active:

- heading hierarchy must remain caller, template, or block-owned;
- LearningBlockFrame action slot must remain inert;
- Button must not become routing, progress, assessment, modal launcher, Continue, or Next behavior;
- Card must not become clickable or route-owning;
- Callout must not become decorative or color-only;
- blocks must not own progress or completion unless separately specified;
- screen templates must not be created from blank prompts;
- vertical slice implementation is still premature until block/template readiness is clearer.

## 4. Options Considered

| Option | Classification | Decision | Rationale |
| --- | --- | --- | --- |
| Option A - Concept Explanation + Key Message block specification | Ready | Select | These are the lowest-risk first learning block specs. They can remain presentational/instructional, use existing primitives within boundaries, and avoid learner input, scoring, selected state, feedback, storage, routing, progress, and screen integration. |
| Option B - Screen template structure readiness note | Ready with caution | Defer | Screen-template readiness is useful soon, but it should follow at least one first block specification so the template note has concrete block contracts for heading hierarchy, placement, and action hierarchy. |
| Option C - Scenario / Case Panel block readiness | Ready with caution for static panel; not ready for decisions | Defer | A static scenario/case panel may be presentational, but scenario decision behavior touches choice, selected state, feedback, and completion. It should follow the first low-risk block specs. |
| Option D - Reflection / Portfolio Capture readiness | Not ready for implementation; documentation-only readiness later | Defer | Reflection touches learner input, HRBA safety, privacy, save/skip, persistence, completion, and validation. It needs a separate behavior and safety readiness gate. |
| Option E - Knowledge Check readiness | Not ready for implementation; documentation-only readiness later | Defer | Knowledge checks require selected state, correctness, feedback, scoring, retry, keyboard behavior, and completion rules. This is too behavior-heavy for the immediate next task. |
| Option F - Move directly to Module 2 vertical slice planning | Not ready | Defer | The Module 2 micro-slice is useful, but direct planning is still premature until low-risk block specs and first screen-template readiness are clearer. |
| Option G - Hard-coded visual prevention implementation | Ready with caution, but not next | Defer | Advisory visual-drift checks will help later, but implementing a script now would interrupt the block/template path and is not required before a documentation-only block specification. |
| Option H - STOP | Not selected | Do not stop | A safe documentation-only next gate exists. There is no need to stop the acceleration path. |

## 5. Recommended Next Task

Create a documentation-only Concept Explanation + Key Message block implementation specification.

The specification should cover:

- Concept Explanation block;
- Key Message block;
- allowed use of LearningBlockFrame, Card, Callout, and Button only within existing primitive boundaries;
- heading hierarchy ownership;
- content slots;
- semantic and accessibility expectations;
- mobile expectations;
- visual/token guardrails;
- QA plan;
- stop conditions.

It must not approve actual block implementation yet.

It must not approve completion, progress, routing, assessment, storage, learner input, feedback, scoring, selected state, or screen integration.

## 6. Why This Next Step Is Safest

The recommended task reduces risk because it:

- moves from primitives toward reusable learning blocks without jumping into screens;
- tests how LearningBlockFrame, Callout, Card, and Button may support learning content;
- avoids behavior-heavy patterns;
- prepares for the Module 2 rights-holders, duty-bearers, and participation micro-slice without implementing it;
- prevents screen-by-screen production by defining block contracts first;
- keeps completion, progress, routing, assessment, storage, feedback, and scoring out of the block layer for now.

Concept Explanation and Key Message are the simplest useful bridge between primitives and screen templates because their learner action is primarily read, connect, and retain. They do not require choice behavior, learner input, persistence, scoring, retry, or feedback state.

## 7. What Remains Blocked

The following remain blocked:

- actual Concept Explanation block implementation;
- actual Key Message block implementation;
- all other learning block implementation;
- screen template implementation;
- vertical slice screen implementation;
- screen integration of Callout, Card, Button, or LearningBlockFrame;
- routing, progress, completion, assessment, and certificate changes;
- learner input, storage, feedback, scoring, validation, selected state, and retries;
- scenario decision behavior;
- reflection/portfolio capture behavior;
- knowledge check behavior;
- global CSS;
- token edits;
- current-state CSS;
- Phase D CSS;
- hard-coded visual prevention script implementation;
- modal/accessibility styling;
- full scale-up.

## 8. Future Sequence Proposal

Recommended safe sequence:

1. Create a documentation-only Concept Explanation + Key Message block implementation specification.
2. If that specification passes, implement only Concept Explanation + Key Message blocks in a bounded task.
3. Independently evaluate those block implementations.
4. Create a documentation-only first screen-template structure readiness note, likely for Concept Introduction / Framework Explanation boundaries.
5. If readiness passes, implement only the first low-risk screen-template structure in a bounded task.
6. Begin Module 2 micro-slice planning only after block and template gates pass.

This sequence may be revised if the first block specification finds unresolved heading, semantic, completion, token, or usage-boundary issues.

## 9. Stop Conditions

Stop future work if:

- a decision recommends implementation without a reviewed specification;
- a decision recommends vertical slice or screen integration before block/template readiness;
- a decision approves behavior-heavy blocks too early;
- a decision approves completion, progress, assessment, storage, feedback, or scoring logic;
- a decision approves routing or Continue/Next behavior;
- a decision approves token or global CSS edits;
- a decision approves Phase D CSS or current-state CSS;
- a decision treats v0.1 as the full design system;
- a decision removes QA or independent evaluation gates.

## 10. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | PASS. It creates a decision note only and changes no implementation files. |
| Does it decide the next safe post-LearningBlockFrame task? | PASS. The next task is a documentation-only Concept Explanation + Key Message block implementation specification. |
| Are actual block implementations still blocked? | PASS. Concept Explanation, Key Message, and all other block implementation remain blocked. |
| Are screen templates still blocked? | PASS. Screen template implementation remains blocked. |
| Are vertical slice screens still blocked? | PASS. Vertical slice screens remain blocked. |
| Is screen integration still blocked? | PASS. Callout, Card, Button, and LearningBlockFrame screen integration remains blocked. |
| Are behavior-heavy components still blocked? | PASS. Scenario Decision, Reflection / Portfolio, Knowledge Check, and similar behavior-heavy patterns remain gated. |
| Are routing/progress/completion/assessment/storage/feedback/scoring changes still blocked? | PASS. Those changes remain blocked. |
| Are CSS and token edits still blocked? | PASS. CSS and token edits remain blocked unless separately approved. |
| Is Phase D CSS still blocked? | PASS. Phase D CSS remains blocked. |
| Does the recommended next task reduce risk? | PASS. It specifies the lowest-risk first learning blocks before any implementation or screen work. |
| Is full scale-up still blocked? | PASS. Full scale-up remains blocked until vertical slice validation passes. |
