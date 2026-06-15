# Design System v0.1 Concept Explanation + Key Message Block Implementation Specification

Draft v0.1 - Documentation-only specification for the first low-risk learning block implementation slice

## 1. Purpose

This document prepares the first low-risk learning block implementation slice for Design System v0.1.

It specifies future implementation boundaries for two instructional learning blocks:

- Concept Explanation Block;
- Key Message Block.

These are learning blocks. They are not screen templates, full course screens, route owners, progress owners, assessment components, or completion gates.

This specification does not implement React, CSS, tokens, components, blocks, templates, screens, scripts, routing, progress, assessment, certificate logic, content, assets, module CSS, old HRBA files, or course behavior.

## 2. Source Evidence Reviewed

| Source | Relevant finding |
| --- | --- |
| `docs/design-system-v0-1-block-template-readiness-decision.md` | Selects Concept Explanation + Key Message as the next documentation-only gate. It keeps actual block implementation, screen templates, screen integration, vertical slice screens, behavior-heavy blocks, routing, progress, completion, assessment, storage, feedback, CSS, tokens, scripts, and full scale-up blocked. |
| `docs/design-system-v0-1-learning-block-frame-implementation-evaluation.md` | LearningBlockFrame passed with caution as a bounded, presentational, structural primitive. Future caution remains for heading hierarchy ownership, inert action-slot usage, and screen/template/block usage boundaries. |
| `docs/design-system-v0-1-learning-block-frame-implementation-spec.md` | LearningBlockFrame may provide structure, title area, description, body, support, actions, and footer, but it must not become a learning block, completion controller, progress controller, route controller, or behavior owner. |
| `docs/design-system-v0-1-primitive-usage-boundaries.md` | Callout, Card, and Button may support later learning blocks, but they must not own course logic. Callout requires meaningful non-color-only content; Card must not be clickable or heading-owning; Button must remain behavior-free and caller-owned. |
| `docs/design-system-v0-1-learning-block-template-map.md` | Concept Explanation and Key Message are ready for implementation planning. Scenario Decision, Reflection / Portfolio Capture, and Knowledge Check are not ready for implementation without separate behavior specs. |
| `docs/learning-block-register.md` | Concept Explanation explains a stable concept; Key Message emphasizes a principle or memorable takeaway. Each block requires a clear purpose, learner action, accessibility behavior, completion rule, and mobile behavior before screen use. |
| `docs/screen-template-register.md` | Concept Introduction screens may use Concept Explanation and optional Key Message, but screen templates still own screen title, placement, heading hierarchy, completion rules, responsive stacking, and QA evidence. |
| `docs/design-system-v0-1-visual-drift-prevention-plan.md` | Future implementation must avoid raw visual values, hard-coded color functions, gradients, unapproved shadows, broad state selectors, Phase D/current selectors, global CSS drift, and module-specific selectors. |
| `docs/design-system-v0-1-qa-evidence-pack.md` | A future implementation needs build evidence, changed-file scope check, token/CSS compliance, visual-drift check, semantic/accessibility check, import check, PASS/STOP result, and alignment update. Documentation-only work requires `git diff --check`; build is not required. |
| `docs/ai-production-contract.md` | AI must document system decisions before code, use approved options, avoid one-off components, avoid unapproved behavior, and stop when routing, progress, tokens, templates, or accessibility rules are not approved. |
| `docs/design-system/08_AGENT_IMPLEMENTATION_RULES.md` | Documentation-only tasks must not change source code. Agents must not invent layouts, block templates, interaction logic, completion rules, tokens, broad CSS, or learner-facing implementation before specifications are approved. |
| `docs/design-system-plan-progress-alignment.md` | Current alignment records the block/template readiness decision and names this Concept Explanation + Key Message block implementation specification as the next safe documentation gate. |

## 3. Why Concept Explanation And Key Message Come First

Concept Explanation and Key Message are the safest first block pair because they are instructional and presentational.

They support the planned Module 2 micro-slice around rights-holders, duty-bearers, and participation without requiring learner input, storage, selected state, scoring, retries, correctness feedback, progress logic, assessment logic, or route changes.

They can use the existing primitive foundation within current boundaries:

- LearningBlockFrame may provide structural wrapping;
- Card may provide content grouping when useful;
- Callout may present meaningful supporting notes or key takeaways;
- Button is generally unnecessary for the first slice and should be avoided unless a later caller-owned, non-routing local action is explicitly approved.

They also reduce screen-by-screen production risk. By defining reusable block contracts first, future screen-template work can arrange known instructional blocks instead of inventing a new layout from a blank prompt.

## 4. Block Readiness Result

Result: PASS WITH CAUTION.

The combined future implementation is ready only if it remains instructional, presentational, and behavior-free.

The caution exists because:

- heading hierarchy must remain caller, block usage contract, or screen-template owned;
- LearningBlockFrame action slots must remain inert and must not imply Continue, Next, progress, completion, assessment, or routing;
- Button should normally be excluded from the first block slice;
- screen placement and completion rules are still template or screen concerns;
- no course content or Module 2 screen implementation is approved by this specification.

## 5. Concept Explanation Block Specification

### Purpose

The Concept Explanation Block explains one core idea in clear language before learners practice, compare, decide, or reflect.

### Intended Learner Experience

The learner reads a concise explanation, connects the concept to a practical example, and notices a key point or supporting clarification.

### Appropriate Use Cases

Use Concept Explanation for:

- introducing rights-holder language;
- introducing duty-bearer obligations;
- explaining meaningful participation;
- explaining one term or principle before a comparison or scenario;
- preparing learners to connect a concept to an example.

### Inappropriate Use Cases

Do not use Concept Explanation for:

- scenario decisions;
- reflection or portfolio capture;
- knowledge checks;
- comparison tables;
- route or progress transitions;
- long content dumps;
- assessment feedback;
- completion confirmation.

### Likely Future File Path

Potential future file path:

- `src/components/design-system/blocks/ConceptExplanationBlock.tsx`

Potential future export paths:

- `src/components/design-system/blocks/index.ts`;
- optionally `src/components/design-system/index.ts` if separately approved.

### Allowed Use Of Existing Primitives

Concept Explanation may use:

- `LearningBlockFrame` as the outer presentational structural wrapper;
- `Card` only if the explanation needs a meaningful grouped surface;
- `Callout` only for a meaningful key point, clarification, or supporting note;
- `Button` only if a later approved local, non-routing, caller-owned action exists.

The first implementation slice should avoid Button.

### Proposed Safe Interface Concept

This is a future interface concept only. Do not implement these props in this documentation task.

```ts
type ConceptExplanationBlockProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  summary?: React.ReactNode;
  children: React.ReactNode;
  keyPoint?: React.ReactNode;
  support?: React.ReactNode;
  className?: string;
};
```

### Content Slots

Allowed content slots:

- optional eyebrow or block label;
- required visible title text;
- optional short summary;
- required body content;
- optional key point;
- optional supporting note or clarification.

Do not add content slots for learner input, options, scoring, feedback, route actions, completion status, storage status, or selected/current state.

### Heading Hierarchy Ownership

The block may render a neutral visible title container.

The block must not render `h1` through `h6` blindly.

The block must not expose a `headingLevel` prop unless separately approved.

If heading semantics are needed, they must be defined later by a screen-template, block usage, or heading hierarchy contract.

### Semantic And Accessibility Rules

Future implementation must:

- preserve clear reading order;
- use plain-language structure;
- avoid inappropriate ARIA;
- avoid live regions;
- avoid focus management;
- avoid keyboard behavior unless a later local action is separately specified;
- ensure key points do not rely on color alone;
- ensure examples are understandable without decorative visuals;
- allow caller/template ownership of page-level semantics.

### Responsive Expectations

Future implementation must:

- stack cleanly on mobile;
- avoid horizontal scrolling;
- keep key points visible without oversized treatment;
- avoid layouts that push future screen actions out of reach;
- support readable line length and content rhythm.

### Token And CSS Guardrails

Future implementation must:

- use existing approved tokens only;
- use scoped class names only;
- avoid raw hex colors;
- avoid `rgb()` and `rgba()`;
- avoid gradients;
- avoid unapproved shadows;
- avoid broad `.is-active`;
- avoid Phase D/current-state selectors;
- avoid global reset selectors;
- avoid module-specific selectors;
- avoid token-file edits;
- avoid `src/styles/global.css` edits.

Possible scoped class-name concepts:

- `.cso-concept-explanation-block`;
- `.cso-concept-explanation-block__summary`;
- `.cso-concept-explanation-block__body`;
- `.cso-concept-explanation-block__key-point`;
- `.cso-concept-explanation-block__support`.

### QA Requirements

Future implementation QA must confirm:

- changed files are limited to the approved block implementation files, scoped design-system CSS if approved, QA note, and alignment update;
- `npm run build` passes;
- `git diff --check` passes;
- no routing, progress, completion, assessment, certificate, storage, feedback, selected state, learner input, or screen integration imports exist;
- no token or global CSS edits exist;
- token references resolve;
- visual-drift advisory checks pass;
- heading hierarchy remains caller/template-owned;
- no screen/template/vertical-slice implementation is included.

### Stop Conditions

Stop future implementation if Concept Explanation requires:

- route movement;
- Continue or Next behavior;
- progress or completion ownership;
- learner input;
- storage or persistence;
- selected/current/completed/locked state;
- correctness feedback;
- assessment scoring;
- token edits;
- global CSS edits;
- blind heading rendering;
- screen/template integration;
- copied old course/module code.

## 6. Key Message Block Specification

### Purpose

The Key Message Block emphasizes a high-priority principle, warning, or memorable takeaway that should guide later learner judgment.

### Intended Learner Experience

The learner notices a short message, reads any brief explanation, and retains the principle as a lens for later activities.

### Appropriate Use Cases

Use Key Message for:

- an HRBA reminder;
- a participation principle;
- a short warning about safe or respectful practice;
- a memorable takeaway after a concept explanation;
- a bridge into later comparison or scenario work.

### Inappropriate Use Cases

Do not use Key Message for:

- full explanations;
- dense evidence;
- decorative banners;
- completion state;
- correctness feedback;
- assessment results;
- route or progress transitions;
- scenario decision feedback unless a separate feedback specification approves it.

### Likely Future File Path

Potential future file path:

- `src/components/design-system/blocks/KeyMessageBlock.tsx`

Potential future export paths:

- `src/components/design-system/blocks/index.ts`;
- optionally `src/components/design-system/index.ts` if separately approved.

### Allowed Use Of Existing Primitives

Key Message may use:

- `LearningBlockFrame` as a simple structural wrapper when the message belongs inside a block frame;
- `Callout` as the primary visual message container when the message is meaningful and non-color-only;
- `Card` only if grouping is needed;
- `Button` should normally be excluded from the first Key Message implementation.

### Proposed Safe Interface Concept

This is a future interface concept only. Do not implement these props in this documentation task.

```ts
type KeyMessageBlockProps = {
  variant?: 'info' | 'success' | 'warning';
  title?: React.ReactNode;
  message: React.ReactNode;
  explanation?: React.ReactNode;
  className?: string;
};
```

### Content Slots

Allowed content slots:

- optional variant;
- optional short title;
- required message;
- optional short explanation.

Do not add content slots for learner input, option selection, correctness feedback, scoring, route actions, completion status, storage status, or selected/current state.

### Heading Hierarchy Ownership

The block may render title text as a neutral visible label.

The block must not render `h1` through `h6` blindly.

The block must not expose a `headingLevel` prop unless separately approved.

If heading semantics are needed, they must be defined later by a screen-template, block usage, or heading hierarchy contract.

### Semantic And Accessibility Rules

Future implementation must:

- keep the message readable in source order;
- avoid color-only meaning;
- avoid role inflation;
- avoid live regions by default;
- avoid alert semantics unless separately approved;
- avoid focus management;
- avoid keyboard behavior unless a later local action is separately specified;
- ensure the visible text carries the message meaning.

### Non-Color-Only Meaning Rule

The message text must communicate the meaning without relying on color, icon, border, or surface treatment.

For example, a warning variant must still include warning language or cautionary wording in visible text. A success variant must not imply screen completion, correctness, progress, or scoring unless a later specification explicitly approves that behavior.

### Length Limits

Future implementation should keep Key Message short:

- prefer one sentence for `message`;
- allow one short supporting paragraph for `explanation`;
- avoid dense lists;
- use Concept Explanation instead when the idea needs teaching, evidence, or multiple examples.

### Responsive Expectations

Future implementation must:

- stack cleanly on mobile;
- avoid oversized type that pushes future actions out of reach;
- avoid horizontal scrolling;
- keep title, message, and explanation readable as one compact unit.

### Token And CSS Guardrails

Future implementation must:

- use existing approved tokens only;
- use scoped class names only;
- avoid raw hex colors;
- avoid `rgb()` and `rgba()`;
- avoid gradients;
- avoid unapproved shadows;
- avoid broad `.is-active`;
- avoid Phase D/current-state selectors;
- avoid global reset selectors;
- avoid module-specific selectors;
- avoid token-file edits;
- avoid `src/styles/global.css` edits.

Possible scoped class-name concepts:

- `.cso-key-message-block`;
- `.cso-key-message-block__message`;
- `.cso-key-message-block__explanation`.

### QA Requirements

Future implementation QA must confirm:

- changed files are limited to the approved block implementation files, scoped design-system CSS if approved, QA note, and alignment update;
- `npm run build` passes;
- `git diff --check` passes;
- no routing, progress, completion, assessment, certificate, storage, feedback, selected state, learner input, or screen integration imports exist;
- no token or global CSS edits exist;
- token references resolve;
- visual-drift advisory checks pass;
- non-color-only meaning is preserved;
- no screen/template/vertical-slice implementation is included.

### Stop Conditions

Stop future implementation if Key Message requires:

- route movement;
- Continue or Next behavior;
- progress or completion ownership;
- learner input;
- storage or persistence;
- selected/current/completed/locked state;
- correctness feedback;
- assessment scoring;
- alert/live-region behavior;
- token edits;
- global CSS edits;
- blind heading rendering;
- screen/template integration;
- copied old course/module code.

## 7. Shared Block Rules

Both future blocks may structure instructional content.

Both future blocks must not:

- own course progress;
- change routing;
- mark screen completion;
- own assessment or scoring;
- store learner input;
- manage feedback state;
- implement selected, current, completed, locked, disabled, or progress state;
- create screen layout decisions;
- choose page-level heading hierarchy blindly;
- rely on color alone for meaning;
- import course, module, player, routing, progress, completion, assessment, certificate, storage, or behavior logic;
- copy old course/module code directly into shared blocks.

## 8. Heading Hierarchy And Semantics

Preferred cautious approach:

- a future block component may render a neutral visible title container;
- the screen template or caller owns actual heading levels;
- if heading semantics are needed, they must be specified by a later screen/template/block usage contract;
- do not add a `headingLevel` prop unless separately approved;
- do not render `h1` through `h6` blindly;
- do not add `role="heading"` unless separately approved.

This keeps the first block implementation usable across future screen templates without breaking page outlines.

## 9. Completion And Progress Decision

Concept Explanation and Key Message blocks must not own completion rules in the first implementation.

They may be treated as read-only content blocks.

Future screen or template logic may decide when a screen is complete, but that decision is not approved here.

No Continue or Next behavior is approved.

No progress state, completion marker, screen unlock, route change, certificate update, or completion persistence is approved.

## 10. Relationship To Module 2 Micro-Slice

These blocks may later support the Module 2 rights-holders, duty-bearers, and participation micro-slice.

Possible future uses, without implementing content:

- Concept Explanation for rights-holders and duty-bearers;
- Concept Explanation for meaningful participation;
- Key Message for "participation is not consultation only";
- Key Message for "duty-bearers have obligations, rights-holders have claims."

This specification does not approve Module 2 screen implementation, content implementation, route changes, progress changes, completion rules, assets, or screen-template implementation.

## 11. Relationship To Screen Templates

Future screen-template readiness must still decide:

- screen title and heading hierarchy;
- where blocks appear;
- number of blocks per screen;
- responsive stacking;
- action hierarchy;
- completion rules;
- route and progress behavior;
- QA evidence plan.

This block specification does not approve screen template implementation.

It also does not approve direct screen integration of Callout, Card, Button, LearningBlockFrame, ConceptExplanationBlock, or KeyMessageBlock.

## 12. Token And CSS Guardrails For Future Implementation

Future implementation must follow these guardrails:

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
- use scoped class names only.

Approved future scoped class-name concepts:

- `.cso-concept-explanation-block`;
- `.cso-concept-explanation-block__summary`;
- `.cso-concept-explanation-block__body`;
- `.cso-concept-explanation-block__key-point`;
- `.cso-key-message-block`;
- `.cso-key-message-block__message`;
- `.cso-key-message-block__explanation`.

## 13. Future File Architecture

Proposed cautious future architecture:

- `src/components/design-system/blocks/ConceptExplanationBlock.tsx`;
- `src/components/design-system/blocks/KeyMessageBlock.tsx`;
- `src/components/design-system/blocks/index.ts`;
- optionally export from `src/components/design-system/index.ts` if approved;
- use existing `src/components/design-system/design-system.css` only if scoped block CSS is needed and approved.

No files in this architecture are created by this documentation task.

## 14. Future Implementation Slice

The smallest safe future implementation task is:

- implement `ConceptExplanationBlock` and `KeyMessageBlock` only;
- keep both blocks presentational and instructional only;
- use existing primitives and LearningBlockFrame within documented boundaries;
- implement no behavior;
- implement no completion, progress, routing, assessment, storage, feedback, scoring, selected state, input, or screen integration;
- edit no global CSS;
- edit no token files;
- use scoped CSS only;
- create a QA note;
- update alignment;
- require independent evaluation after implementation.

The future task should remain blocked until this specification is reviewed.

## 15. QA Plan For Future Implementation

A future implementation must use the v0.1 QA evidence pack and require:

- `npm run build`;
- `git diff --check`;
- changed-file scope check;
- token-reference existence check;
- visual-drift advisory check;
- semantic/accessibility check;
- import check confirming no routing, progress, course, module, player, assessment, storage, feedback, modal, drawer, HelpOverlay, or behavior imports;
- no screen integration;
- no template implementation;
- no route, progress, or content changes;
- no global CSS or token edits;
- PASS/STOP result;
- alignment update.

## 16. Stop Conditions For Future Implementation

Stop future implementation if:

- the blocks need routing, progress, completion, assessment, or certificate behavior;
- the blocks need storage, form input, correctness, feedback, selected state, scoring, retry, validation, or learner persistence;
- token files must be edited;
- `src/styles/global.css` must be edited;
- raw visual values are needed;
- broad `.is-active` or Phase D/current-state selectors appear;
- screen, template, or vertical slice work starts;
- behavior-heavy patterns are pulled in;
- old course/module code is copied directly into shared blocks;
- heading hierarchy cannot remain caller/template-owned;
- implementation begins before this specification is reviewed.

## 17. Recommended Next Task After This Specification

Because readiness is PASS WITH CAUTION, the recommended future task after review is:

- implement `ConceptExplanationBlock` and `KeyMessageBlock` only as bounded presentational/instructional blocks.

If review finds unresolved semantics, heading, token, or block boundary issues, the next task should instead be:

- create a documentation-only block semantics/heading hierarchy readiness note before implementation.

## 18. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | PASS. It creates a specification only and changes no implementation files. |
| Are Concept Explanation and Key Message implementations still blocked until review? | PASS. Actual block implementation remains blocked until this specification is reviewed. |
| Are these blocks defined as instructional/presentational only? | PASS. Both future blocks are instructional and presentational only. |
| Is completion/progress/routing/assessment behavior excluded? | PASS. Completion, progress, routing, assessment, and certificate behavior are excluded. |
| Is storage/input/feedback/scoring excluded? | PASS. Storage, learner input, validation, feedback state, correctness, retry, and scoring are excluded. |
| Are selected/current/completed/locked/progress states excluded? | PASS. Those states are not approved for either first block implementation. |
| Is heading hierarchy caller/template-owned? | PASS WITH CAUTION. The caller, screen template, or later block usage contract must own heading hierarchy. |
| Are CSS and token edits blocked? | PASS. This task makes no CSS or token edits, and future token/global CSS edits remain blocked unless separately approved. |
| Are screen/template/vertical slice changes blocked? | PASS. Screen integration, template implementation, and vertical slice implementation remain blocked. |
| Is the recommended future implementation slice clear? | PASS. Implement only ConceptExplanationBlock and KeyMessageBlock as bounded presentational/instructional blocks after review. |
| Is Phase D CSS still blocked? | PASS. Phase D CSS remains blocked. |
| Is full scale-up still blocked? | PASS. Full scale-up remains blocked until vertical slice validation passes. |
