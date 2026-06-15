# Design System v0.1 First Screen-Template Structure Readiness

## 1. Purpose

This note determines whether the first low-risk screen-template structures are ready for a later implementation specification.

It is a readiness note only. It does not approve or implement screen templates, screens, routing, progress, completion, assessment, certificate logic, storage, feedback, learner input, content, CSS, tokens, scripts, vertical slice work, or scale-up.

## 2. Current Foundation Available

- `Callout` is available as a presentational short-message primitive.
- `Card` is available as a presentational content-grouping primitive.
- `Button` is available as a native behavior-free action primitive.
- `LearningBlockFrame` is available as a presentational structural wrapper.
- `ConceptExplanationBlock` is available as a presentational and instructional concept block.
- `KeyMessageBlock` is available as a presentational and instructional key-message block.
- Primitive usage boundaries are documented.
- No screen-template implementation has happened yet.
- No screen integration has happened yet.
- No vertical slice has happened yet.

## 3. Candidate First Screen-Template Structures

| Candidate | Classification | Decision | Rationale |
| --- | --- | --- | --- |
| A. Concept Introduction screen structure | Ready with caution | Include in future specification | Safe as a read-only structure with one `ConceptExplanationBlock` and optional `KeyMessageBlock`, if the screen template owns heading hierarchy, block placement, responsive structure, and completion boundary. |
| B. Framework Explanation screen structure | Ready with caution | Include in future specification | Safe only for small frameworks or relationship explanations using one or two `ConceptExplanationBlock` instances, optional `Card` grouping, and optional `KeyMessageBlock`. It must avoid dense framework interactions, tabs, hotspots, accordions, or behavior-heavy exploration. |
| C. Key Message / Summary screen structure | Ready with caution | Include in future specification | Safe as a read-only reinforcement or transition structure using one `KeyMessageBlock` and optional short explanatory text. Variant meaning must be visible in the words, not implied by color or state. |
| D. Comparison screen structure | Ready with caution | Defer | Comparison is plausible, but it is premature before a Comparison block specification exists. Static Card support may help later, but comparison criteria, mobile repetition, and completion boundaries need a separate block/template gate. |
| E. Scenario / Case Introduction screen structure | Ready with caution | Defer | A static scenario introduction could be presentational, but scenario decision behavior is nearby. It should wait for Scenario / Case Panel readiness to prevent accidental choice, feedback, or completion behavior. |
| F. Reflection screen structure | Not ready | Defer | Reflection requires learner input, privacy, save/skip rules, persistence, completion, and safe prompt boundaries. It needs a separate behavior and data readiness gate. |
| G. Knowledge Check screen structure | Not ready | Defer | Knowledge checks require selected state, correctness, feedback, scoring, retry, validation, and completion rules. They remain behavior-heavy. |
| H. Module 2 micro-slice planning | Not ready | Defer | Direct micro-slice planning is still premature until first screen-template readiness, implementation specification, implementation, and independent evaluation gates pass. |

## 4. Recommended First Screen-Template Structure Set

Proceed next to a documentation-only first screen-template implementation specification for these low-risk structural templates only:

- Concept Introduction Screen Template;
- Framework Explanation Screen Template;
- Key Message / Summary Screen Template.

Do not implement these templates yet. The next step should be a specification that defines exact component scope, file scope, composition rules, heading hierarchy, action boundaries, completion exclusions, responsive behavior, accessibility metadata, QA plan, and stop conditions.

## 5. Screen-Level Responsibilities

Future screen templates must own responsibilities that blocks and primitives do not own:

- screen title placement;
- page or screen heading hierarchy;
- learning purpose;
- block order;
- block density;
- action hierarchy;
- responsive stacking;
- completion boundary;
- accessibility metadata;
- screen help expectations;
- QA evidence requirements.

Blocks may provide presentational and instructional content areas, but screen templates must decide how those areas become a coherent screen.

## 6. Heading Hierarchy Rules

- Each screen template must own the screen-level heading structure.
- Blocks must not become page headings automatically.
- `ConceptExplanationBlock` and `KeyMessageBlock` remain heading-neutral.
- The screen template must decide whether the screen title is `h1` or `h2` based on the course player structure.
- No heading level should be invented by blocks.
- Future implementation must not use `role="heading"` unless separately specified.
- Screen title, section title, and block title relationships must be documented before implementation.

## 7. Block Placement Rules

- Concept Introduction may include one `ConceptExplanationBlock` and optionally one `KeyMessageBlock`.
- Framework Explanation may include one or two `ConceptExplanationBlock` instances, optional `Card` grouping, and optional `KeyMessageBlock`.
- Key Message / Summary may include one `KeyMessageBlock` and optional short explanatory text.
- Avoid too many blocks on one screen.
- Avoid nested card-heavy layouts.
- Avoid mixing too many message variants.
- Do not include behavior-heavy blocks yet.
- Do not include learner input, knowledge check, reflection capture, scenario decision, selected state, feedback, scoring, or retry blocks.

## 8. Action Hierarchy And Button Rules

- `Button` must not be used for Continue, Next, routing, progress, assessment, modal launch, or player shell behavior in the first screen-template structure.
- If an action area is present, it must be inert or caller-owned in a later specification.
- No screen-template should own routing or progress behavior at this readiness stage.
- Continue and Next remain owned outside this readiness note.
- `Button` usage in first screen-template implementation should be deferred unless a later specification clearly defines non-routing, non-progress behavior.

## 9. Completion Boundary

- These first template structures should be read-only and instructional.
- No completion logic is approved.
- No progress movement is approved.
- No screen completion marker is approved.
- No lock or unlock behavior is approved.
- No assessment or scoring is approved.
- Future screen or course-shell logic may determine completion separately, but this readiness note does not approve it.

## 10. Responsive Structure Expectations

Future implementation specifications must require:

- mobile-first readable layout;
- no horizontal scrolling;
- no fixed heights that cut content;
- clean block stacking on narrow screens;
- reachable action areas if later approved;
- readable screen title and block title relationships;
- key messages that remain visible without dominating the screen;
- desktop, tablet, and mobile QA.

## 11. Accessibility And Screen Help Expectations

Future screen-template specifications must require:

- readable title and content order;
- visible focus preservation for any future interactive element;
- no keyboard traps;
- no alert or live-region behavior for `KeyMessageBlock` unless separately specified;
- no color-only meaning;
- screen help metadata that later defines what the screen is about, what the learner needs to do, and alternative ways to understand the screen if needed;
- high contrast and text-size compatibility checks in later implementation QA if available.

## 12. Relationship To Module 2 Micro-Slice

These first templates may later support the Module 2 rights-holders, duty-bearers, and participation micro-slice without planning or implementing that slice now.

Possible later examples:

- Concept Introduction for rights-holders;
- Framework Explanation for the relationship between rights-holders and duty-bearers;
- Key Message / Summary for meaningful participation as more than consultation.

Module 2 micro-slice planning remains blocked until template specification, template implementation, and template evaluation gates pass.

## 13. Token And CSS Guardrails For Future Implementation

Future implementation must follow these guardrails:

- no raw hex colors;
- no `rgb()` or `rgba()`;
- no gradients;
- no unapproved shadows;
- no broad `.is-active`;
- no Phase D or current-state selectors;
- no global reset selectors;
- no module-specific selectors;
- no token-file edits unless separately approved;
- no `src/styles/global.css` edits unless a future task explicitly approves it;
- use only existing approved tokens;
- if a needed token is missing, stop and document it instead of inventing values;
- scoped class names only if future template components are implemented;
- no screen-specific local styling.

## 14. Future File Architecture Options

Possible future implementation paths, if a later specification approves implementation:

- `src/components/design-system/templates/ConceptIntroductionTemplate.tsx`
- `src/components/design-system/templates/FrameworkExplanationTemplate.tsx`
- `src/components/design-system/templates/KeyMessageSummaryTemplate.tsx`
- `src/components/design-system/templates/index.ts`

Possible export path:

- `src/components/design-system/index.ts`

Possible styling:

- `src/components/design-system/design-system.css` only if scoped and separately approved.

No files are created by this readiness task except this readiness note.

## 15. Readiness Result

PASS WITH CAUTION.

The first screen-template structure set is ready only for a documentation-only implementation specification, not implementation. Concept Introduction, Framework Explanation, and Key Message / Summary are sufficiently bounded to specify next. Screen-template implementation, screen integration, vertical slice planning, behavior-heavy blocks, completion logic, progress logic, assessment logic, CSS edits, token edits, and scale-up remain blocked.

## 16. Recommended Next Task After This Readiness Note

Create a documentation-only first screen-template implementation specification for Concept Introduction, Framework Explanation, and Key Message / Summary templates.

Do not implement templates yet.

## 17. QA Requirements For A Future Implementation Specification

Any future implementation specification must define:

- exact templates to implement;
- allowed block composition;
- heading hierarchy;
- responsive behavior;
- action hierarchy;
- completion boundary;
- accessibility metadata expectations;
- files allowed to edit;
- token and CSS guardrails;
- QA plan;
- stop conditions;
- independent evaluation gate.

## 18. Stop Conditions

Stop if a future task or decision:

- recommends screen-template implementation without a specification;
- recommends screen integration before template implementation and evaluation;
- recommends vertical slice work before screen-template gates;
- approves Continue/Next, routing, progress, completion, assessment, storage, feedback, scoring, selected state, or retry logic;
- approves behavior-heavy blocks;
- approves token or global CSS edits;
- approves Phase D CSS or current-state CSS;
- treats Design System v0.1 as the full design system;
- removes QA or independent evaluation gates.

## 19. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | Yes. |
| Does it assess first screen-template structure readiness? | Yes. |
| Does it keep screen-template implementation blocked? | Yes. |
| Does it keep screen integration blocked? | Yes. |
| Does it keep vertical slice implementation blocked? | Yes. |
| Does it keep behavior-heavy blocks blocked? | Yes. |
| Does it keep routing/progress/completion/assessment/storage/feedback/scoring blocked? | Yes. |
| Does it define heading hierarchy responsibilities? | Yes. |
| Does it define block placement rules? | Yes. |
| Does it define action hierarchy boundaries? | Yes. |
| Does it define responsive expectations? | Yes. |
| Does it define accessibility/screen help expectations? | Yes. |
| Are CSS and token edits still blocked? | Yes. |
| Is Phase D CSS still blocked? | Yes. |
| Is the recommended next task clear? | Yes. Create a documentation-only first screen-template implementation specification for the three selected templates. |
| Is full scale-up still blocked? | Yes. |
