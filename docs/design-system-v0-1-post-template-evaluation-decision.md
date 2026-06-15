# Design System v0.1 Post-Template Evaluation Decision

## 1. Purpose

This documentation-only decision note selects the next safe Design System v0.1 step after `ConceptIntroductionTemplate`, `FrameworkExplanationTemplate`, and `KeyMessageSummaryTemplate` passed independent implementation evaluation.

The independent evaluation in `docs/design-system-v0-1-first-screen-template-implementation-evaluation.md` records PASS WITH CAUTION. The implementation is bounded and safe, but route-level heading ownership still needs to be resolved before any course-screen integration because the first three templates render `screenTitle` as `h2`.

This note does not approve or implement screen integration, vertical slice screens, Module 2 micro-slice implementation, routing, progress, completion, assessment, certificate logic, storage, feedback behavior, learner input, content migration, CSS, tokens, scripts, additional templates, behavior-heavy components, current-state CSS, Phase D CSS, or scale-up.

## 2. Current Foundation Now Available

- `Callout` is available as a presentational short-message primitive.
- `Card` is available as a presentational content-grouping primitive.
- `Button` is available as a native behavior-free action primitive.
- `LearningBlockFrame` is available as a presentational structural wrapper.
- `ConceptExplanationBlock` is available as a presentational/instructional concept block.
- `KeyMessageBlock` is available as a presentational/instructional key-message block.
- `ConceptIntroductionTemplate` is available as a structural/read-only screen-template component.
- `FrameworkExplanationTemplate` is available as a structural/read-only screen-template component.
- `KeyMessageSummaryTemplate` is available as a structural/read-only screen-template component.
- Primitive, block, and template boundaries are documented.
- No screen integration has happened yet.
- No vertical slice has happened yet.
- No behavior-heavy blocks have been implemented yet.

## 3. Active Cautions That Shape The Next Decision

- Route-level heading ownership must be confirmed before any course-screen integration because the first three templates currently render `screenTitle` as `h2`.
- Blocks must remain heading-neutral.
- Templates are not route-level screens.
- Templates do not own completion, progress, routing, assessment, certificate logic, storage, feedback, learner input, selected/current state, or screen completion behavior.
- Key Message `success` and `warning` variants must depend on visible wording and must not imply completion, correctness, progress, scoring, assessment success, warning-alert behavior, or live-region behavior.
- `Button` must remain excluded from these first templates.
- Screen integration remains unsafe until a screen usage and heading ownership gate exists.
- Module 2 micro-slice work remains premature until screen usage rules are explicit.

## 4. Options Considered

| Option | Classification | Decision | Rationale |
| --- | --- | --- | --- |
| A. Screen-template usage and heading ownership readiness note | Ready | Selected | This directly addresses the only active caution from the independent template evaluation. It can define how the three templates may later sit inside route-level screens, whether the route or template owns the primary heading, which wrappers are allowed, and which integration stop conditions remain active. It does not implement screen integration. |
| B. First screen integration implementation specification | Ready with caution | Defer | A documentation-only integration specification is plausible, but it is premature before heading ownership, screen wrappers, `h1`/`h2` relationships, and template usage boundaries are resolved. |
| C. Module 2 micro-slice planning note | Ready with caution | Defer | Module 2 planning is valuable, but planning against templates before usage rules are explicit could bake in heading or completion assumptions too early. |
| D. Additional low-risk template specification | Ready with caution | Defer | Comparison or static Scenario/Case Introduction may be useful later, but adding templates before defining how current templates are used in real screens would widen the surface area before closing the active caution. |
| E. Additional low-risk block specification | Ready with caution | Defer | A ComparisonBlock or StaticCasePanel specification may be useful, but it should not outrun screen-template usage rules now that the first template set exists. |
| F. Behavior-heavy block readiness | Not ready | Defer | Knowledge Check, Reflection / Portfolio Capture, and Scenario Decision require learner input, selected state, scoring, feedback, storage, retry, privacy, completion, and assessment rules. |
| G. Hard-coded visual prevention implementation | Ready with caution | Defer | Advisory prevention remains valuable, but implementation of scripts/checks is separate from the active screen-template heading and usage caution. It can be revisited after this decision path or separately approved. |
| H. Phase D/current-state CSS readiness | Not ready | Defer | Current-state CSS and Phase D work remain separate, high-risk state migration work and are not unlocked by screen-template evaluation. |
| I. STOP | Not selected | Not needed | A safe documentation-only next gate exists. |

## 5. Recommended Next Task

Create a documentation-only screen-template usage and route-level heading ownership readiness note for `ConceptIntroductionTemplate`, `FrameworkExplanationTemplate`, and `KeyMessageSummaryTemplate`.

The note should resolve or explicitly frame:

- whether route-level screens own the primary `h1`;
- whether the template `screenTitle` remains `h2`, becomes caller-owned, or needs a wrapper-level pattern;
- how templates may safely sit inside existing route/player structures;
- which screen wrappers and content slots are allowed;
- how blocks remain heading-neutral;
- how template usage avoids routing, progress, completion, assessment, storage, feedback, learner input, selected/current state, and Continue/Next behavior;
- stop conditions for any later screen integration specification.

Do not recommend implementation yet.

Do not recommend direct screen integration yet.

Do not recommend Module 2 vertical slice planning yet.

## 6. Why This Next Step Is Safest

This next step is safest because it:

- addresses the only active caution from the independent template evaluation;
- prevents heading hierarchy mistakes before course-screen use;
- defines how templates may safely sit inside route-level screens;
- prevents templates from becoming route, progress, completion, assessment, storage, feedback, or state owners;
- prevents blank screen-by-screen production by requiring usage rules before screen construction;
- prepares for Module 2 micro-slice planning without implementing or planning that slice prematurely;
- keeps behavior-heavy work, current-state CSS, and Phase D CSS separate from template usage readiness.

## 7. What Remains Blocked

- screen integration;
- vertical slice screen implementation;
- Module 2 micro-slice implementation;
- Module 2 content migration;
- additional template implementation;
- additional block implementation unless separately specified;
- behavior-heavy blocks;
- routing, progress, completion, assessment, or certificate changes;
- learner input, storage, feedback, scoring, validation, selected state, or retries;
- scenario decision behavior;
- reflection/portfolio capture behavior;
- knowledge check behavior;
- global CSS;
- token edits;
- current-state CSS;
- Phase D CSS;
- hard-coded visual prevention script implementation unless separately approved;
- modal/accessibility styling;
- dedicated close button work;
- full scale-up.

## 8. Future Sequence Proposal

1. Create a documentation-only screen-template usage and route-level heading ownership readiness note.
2. Create a documentation-only screen integration implementation specification if usage readiness passes.
3. Create a documentation-only Module 2 micro-slice planning note using approved blocks/templates and screen usage rules.
4. Implement one very small Module 2 micro-slice only after planning passes and implementation scope is separately approved.
5. Run independent vertical slice QA/evaluation.
6. Make bounded corrections if vertical slice QA finds issues.
7. Scale up only after vertical slice gates pass.

## 9. Stop Conditions

Stop if a future decision or task:

- recommends implementation without a reviewed specification;
- recommends screen integration before heading ownership and template usage readiness;
- recommends vertical slice implementation before screen integration gates;
- approves behavior-heavy blocks too early;
- approves completion, progress, assessment, storage, feedback, scoring, selected state, or retry logic;
- approves routing or Continue/Next behavior;
- approves token or global CSS edits;
- approves Phase D CSS or current-state CSS;
- treats Design System v0.1 as the full design system;
- removes QA or independent evaluation gates.

## 10. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | Yes. |
| Does it decide the next safe post-template task? | Yes. |
| Are screen integration and vertical slice implementation still blocked? | Yes. |
| Is Module 2 micro-slice implementation still blocked? | Yes. |
| Are additional templates still blocked? | Yes. |
| Are behavior-heavy blocks still blocked? | Yes. |
| Are routing/progress/completion/assessment/storage/feedback/scoring changes still blocked? | Yes. |
| Are CSS and token edits still blocked? | Yes. |
| Is Phase D CSS still blocked? | Yes. |
| Does the recommended next task address the h2/route-level heading caution? | Yes. |
| Does the recommended next task reduce risk? | Yes. |
| Is full scale-up still blocked? | Yes. |
