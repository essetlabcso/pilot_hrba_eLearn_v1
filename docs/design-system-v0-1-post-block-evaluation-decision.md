# Design System v0.1 Post-Block Evaluation Decision

## 1. Purpose

This note decides the next safe Design System v0.1 step after `ConceptExplanationBlock` and `KeyMessageBlock` passed independent evaluation with PASS WITH CAUTION.

It is a decision gate only. It does not approve or implement blocks, templates, screens, routing, progress, completion, assessment, certificate logic, storage, feedback, learner input, content, CSS, tokens, scripts, or scale-up.

## 2. Current Foundation Now Available

- `Callout` exists as a presentational short-message primitive.
- `Card` exists as a presentational content-grouping primitive.
- `Button` exists as a native behavior-free action primitive.
- `LearningBlockFrame` exists as a presentational structural wrapper.
- `ConceptExplanationBlock` exists as a presentational and instructional concept block.
- `KeyMessageBlock` exists as a presentational and instructional key-message block.
- Primitive usage boundaries are documented.
- No screen integration has happened yet.
- No screen template has been implemented yet.
- No vertical slice has been implemented yet.

## 3. Active Cautions That Shape the Next Decision

- Heading hierarchy must remain caller-owned or screen-template-owned.
- `KeyMessageBlock` `success` and `warning` variants must depend on visible wording and must not imply completion, correctness, progress, scoring, assessment, validation, or alert behavior.
- `LearningBlockFrame` actions slot must remain inert unless a later screen-template or behavior specification explicitly owns the action.
- `Button` must not become routing, progress, assessment, modal launcher, Continue, or Next behavior.
- `Card` must not become clickable or route-owning.
- `Callout` must not become decorative or color-only.
- `ConceptExplanationBlock` and `KeyMessageBlock` are not screen templates.
- Screen integration remains unsafe until screen-template rules exist.

## 4. Options Considered

| Option | Classification | Decision | Rationale |
| --- | --- | --- | --- |
| Option A - First screen-template structure readiness note | Ready | Select | The existing primitives and two presentational blocks are enough to define screen-level structure rules before implementation. This keeps the work documentation-only while resolving heading hierarchy, block placement, action hierarchy, responsive structure, completion boundary, and QA expectations. |
| Option B - First screen-template implementation specification | Ready with caution | Defer | A specification may be safe after a readiness note, but it is premature until screen-level heading, action, completion, and responsive boundaries are documented. |
| Option C - Additional low-risk block specification | Ready with caution | Defer | A presentational Comparison block may be useful later, but adding more blocks before defining first screen-template structure would increase the number of pieces without governing their screen use. |
| Option D - Static Scenario / Case Panel readiness | Ready with caution | Defer | A static scenario or case panel could remain presentational, but scenario decision behavior is nearby and risky. It should wait until the first screen-template structure path is clearer. |
| Option E - Reflection / Portfolio Capture readiness | Not ready | Defer | Reflection and portfolio capture involve learner input, storage, privacy, persistence, completion, and later review risks. They need a separate behavior and data boundary before implementation planning. |
| Option F - Knowledge Check readiness | Not ready | Defer | Knowledge checks involve selected state, correctness, feedback, scoring, retries, validation, and completion. They are behavior-heavy and not ready for implementation planning. |
| Option G - Move directly to Module 2 vertical slice planning | Not ready | Defer | Module 2 micro-slice planning still needs screen-template readiness, completion boundaries, behavior decisions, and screen usage rules before it can be safe. |
| Option H - Hard-coded visual prevention implementation | Ready with caution | Defer | An advisory visual-drift check may be useful, but it should be a separate implementation task. It should not displace the screen-template readiness gate that now protects block usage. |
| Option I - STOP | Not selected | Do not select | At least one safe documentation-only next step exists, so stopping the stream is not necessary. |

## 5. Recommended Next Task

Create a documentation-only first screen-template structure readiness note, likely for Concept Introduction / Framework Explanation / Key Message screen structure.

That readiness note should define screen-level heading hierarchy, block placement, action hierarchy, responsive structure, completion boundary, and QA expectations before any screen-template implementation or screen integration.

Do not create a screen-template implementation specification yet. Do not implement screen templates. Do not plan or implement a vertical slice yet.

## 6. Why This Next Step Is Safest

- It moves from reusable primitives and blocks toward screen structure without jumping into real screens.
- It prevents blank screen-by-screen production by defining a screen-template gate first.
- It defines heading hierarchy before `ConceptExplanationBlock` and `KeyMessageBlock` appear inside any real screen.
- It defines how `ConceptExplanationBlock` and `KeyMessageBlock` may appear together.
- It prevents `Button` misuse as Continue, Next, routing, progress, assessment, or modal behavior.
- It keeps completion, progress, assessment, scoring, storage, and feedback logic outside the block layer.
- It prepares for the later Module 2 micro-slice without implementing it.

## 7. What Remains Blocked

- Screen-template implementation.
- Vertical slice screen implementation.
- Screen integration of `Callout`, `Card`, `Button`, `LearningBlockFrame`, `ConceptExplanationBlock`, or `KeyMessageBlock`.
- Additional block implementation unless separately specified and reviewed.
- Behavior-heavy blocks.
- Routing, progress, completion, assessment, certificate, and current-screen changes.
- Learner input, storage, feedback, scoring, validation, selected state, and retries.
- Scenario decision behavior.
- Reflection and portfolio capture behavior.
- Knowledge check behavior.
- Global CSS.
- Token edits.
- Current-state CSS.
- Phase D CSS.
- Hard-coded visual prevention script implementation.
- Modal/accessibility styling.
- Full scale-up.

## 8. Future Sequence Proposal

1. Create a documentation-only first screen-template structure readiness note.
2. Create a documentation-only first screen-template implementation specification if readiness passes.
3. Implement one or two low-risk screen-template structural components only, bounded by that specification.
4. Independently evaluate those screen-template components.
5. Create documentation-only Module 2 micro-slice planning using approved blocks and templates.
6. Implement one Module 2 micro-slice only after planning passes.
7. Independently evaluate the vertical slice before any scale-up.

## 9. Stop Conditions

Stop if a future decision or prompt:

- recommends implementation without a reviewed specification;
- recommends screen integration before screen-template readiness;
- recommends vertical slice implementation before screen-template gates;
- approves behavior-heavy blocks too early;
- approves completion, progress, assessment, storage, feedback, scoring, validation, selected state, or retry logic;
- approves routing or Continue/Next behavior;
- approves token or global CSS edits;
- approves Phase D CSS or current-state CSS;
- treats Design System v0.1 as the full design system;
- removes QA or independent evaluation gates.

## 10. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | Yes. It creates a decision note only. |
| Does it decide the next safe post-block task? | Yes. It selects a documentation-only first screen-template structure readiness note. |
| Are actual screen-template implementations still blocked? | Yes. |
| Are vertical slice screens still blocked? | Yes. |
| Is screen integration still blocked? | Yes. |
| Are behavior-heavy blocks still blocked? | Yes. |
| Are routing/progress/completion/assessment/storage/feedback/scoring changes still blocked? | Yes. |
| Are CSS and token edits still blocked? | Yes. |
| Is Phase D CSS still blocked? | Yes. |
| Does the recommended next task reduce risk? | Yes. It resolves screen-level structure boundaries before implementation or integration. |
| Is full scale-up still blocked? | Yes. |
