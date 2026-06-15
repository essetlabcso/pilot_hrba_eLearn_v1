# Design System v0.1 First Screen-Template Implementation Specification

## 1. Purpose

This document prepares a future bounded implementation slice for three low-risk screen-template structural components:

- Concept Introduction Screen Template;
- Framework Explanation Screen Template;
- Key Message / Summary Screen Template.

These are screen-template structures. They are not full course screens, not route-level implementations, and not Module 2 vertical slice screens.

This document does not implement React, CSS, tokens, components, templates, screens, scripts, routing, progress, assessment, certificate logic, content, assets, module CSS, old HRBA files, or course behavior.

## 2. Source Evidence Reviewed

- `docs/design-system-v0-1-first-screen-template-structure-readiness.md` records PASS WITH CAUTION and selects Concept Introduction, Framework Explanation, and Key Message / Summary as the first low-risk structures ready for specification.
- `docs/design-system-v0-1-post-block-evaluation-decision.md` selects screen-template structure readiness as the safe post-block path and keeps implementation, screen integration, and vertical slice work blocked.
- `docs/design-system-v0-1-concept-key-message-block-implementation-evaluation.md` confirms `ConceptExplanationBlock` and `KeyMessageBlock` are presentational, instructional, behavior-free, heading-neutral, and not integrated with screens or templates.
- `docs/design-system-v0-1-learning-block-frame-implementation-evaluation.md` confirms `LearningBlockFrame` is presentational, structural, behavior-free, heading-neutral, and that its `actions` slot must remain caller-owned.
- `docs/design-system-v0-1-primitive-usage-boundaries.md` defines safe use of `Callout`, `Card`, and `Button`, including non-color-only message meaning, Card heading caution, and Button exclusion from routing/progress/assessment/launcher behavior.
- `docs/design-system-v0-1-learning-block-template-map.md` identifies the later Module 2 micro-slice candidate but keeps behavior-heavy blocks, comparison, completion/progress, and vertical slice implementation gated.
- `docs/learning-block-register.md` defines learning-block expectations and reinforces that blocks need learning purpose, learner action, accessibility behavior, completion boundaries, and mobile behavior before use.
- `docs/screen-template-register.md` defines screen-template taxonomy and confirms Concept Introduction and Framework Explanation as reusable screen patterns, with completion and learner-action rules still requiring implementation-specific gates.
- `docs/design-system-v0-1-visual-drift-prevention-plan.md` keeps hard-coded visual prevention advisory and requires future implementation to avoid new raw visual values.
- `docs/design-system-v0-1-qa-evidence-pack.md` defines future implementation QA evidence, including changed-file scope, build, token/CSS compliance, accessibility, responsive checks, PASS/STOP result, and independent evaluation.
- `docs/design-system-plan-progress-alignment.md` records the current stream status and states that the next safe task is this documentation-only specification while implementation, integration, Phase D CSS, vertical slice work, and scale-up remain blocked.

## 3. Why These Three Templates Come First

These three templates are the safest first implementation candidates because:

- they can remain read-only and instructional;
- they use already-approved presentational and instructional blocks;
- they avoid learner input, storage, selected state, scoring, retries, correctness feedback, progress logic, assessment logic, and routing;
- they prepare for later Module 2 micro-slice planning without implementing it;
- they prevent blank screen-by-screen production by defining reusable screen structures first;
- they exercise heading, density, responsive, and accessibility boundaries without entering behavior-heavy territory.

## 4. Specification Readiness Result

PASS WITH CAUTION.

The future implementation slice is ready only if it remains structural, instructional, read-only, and behavior-free. The implementation must not include routing, progress, completion, assessment, scoring, storage, feedback state, selected/current/completed/locked/progress state, learner input, screen integration, course content migration, token edits, global CSS edits, Phase D CSS, or vertical slice work.

## 5. Shared Template Principles

All three future templates must follow these rules:

- templates structure a screen but do not own route behavior;
- templates do not own progress or completion;
- templates do not own assessment or scoring;
- templates do not store learner input;
- templates do not manage feedback state;
- templates do not implement selected, current, completed, locked, or progress states;
- templates do not implement Continue or Next behavior;
- templates do not change `currentScreenId`;
- templates do not import course, module, player, routing, progress, assessment, certificate, storage, feedback, modal, drawer, HelpOverlay, or accessibility toolbar logic;
- templates use approved blocks and primitives only within documented boundaries;
- templates keep heading hierarchy explicit and screen-owned;
- templates remain reusable and subject-agnostic.

## 6. Concept Introduction Screen Template Specification

### Purpose

The Concept Introduction Screen Template introduces one core concept clearly before later practice, comparison, reflection, or assessment.

### Intended Learner Experience

The learner reads a concise screen title, reviews one concept explanation, and optionally sees one key message that reinforces the concept in visible wording.

### Appropriate Use Cases

- introducing a required term;
- explaining a single idea before a later activity;
- connecting a concept to a short practical example;
- supporting a later comparison or scenario without implementing that later behavior.

### Inappropriate Use Cases

- multi-step frameworks;
- side-by-side comparisons;
- knowledge checks;
- reflection capture;
- scenario decisions;
- long content dumps;
- route transitions or progress gates.

### Future File Path

Likely future path:

- `src/components/design-system/templates/ConceptIntroductionTemplate.tsx`

Possible export path:

- `src/components/design-system/index.ts`

### Allowed Composition

- one `ConceptExplanationBlock` required;
- optional one `KeyMessageBlock`;
- no `Button` in the first implementation;
- no learner input;
- no knowledge check;
- no scenario decision;
- no completion, progress, routing, assessment, storage, feedback, selected state, or scoring logic.

### Proposed Safe Interface Concept

Do not implement these props in this documentation task.

```ts
type ConceptIntroductionTemplateProps = {
  screenTitle: React.ReactNode;
  eyebrow?: React.ReactNode;
  conceptTitle: React.ReactNode;
  summary?: React.ReactNode;
  children: React.ReactNode;
  keyMessage?: React.ReactNode;
  keyMessageTitle?: React.ReactNode;
  className?: string;
};
```

### Heading Hierarchy Ownership

- The template owns the screen title relationship.
- `ConceptExplanationBlock` remains heading-neutral.
- `KeyMessageBlock` remains heading-neutral.
- The future implementation must verify whether the course player expects `screenTitle` to render as `h1`, `h2`, or a caller-controlled heading component.
- If uncertain, the implementation should use the conservative heading strategy approved by the future implementation prompt, not block-level headings.

### Content Density Rules

- Keep one concept per template instance.
- Keep supporting explanation concise.
- Use one optional key message only when it reinforces the concept.
- Do not combine this template with comparison, scenario, reflection, or knowledge-check blocks.

### Responsive Behavior

- Stack title, concept explanation, and optional key message vertically on narrow screens.
- Avoid fixed heights.
- Avoid horizontal scrolling.
- Preserve readable line length on wider screens.
- Keep the key message visible without allowing it to dominate the viewport.

### Accessibility Expectations

- Screen title appears before the concept block in reading order.
- Visible text carries all meaning.
- No alert or live-region behavior is introduced.
- No color-only meaning is introduced.
- No focus management is introduced.

### Completion/Progress Exclusions

The template does not mark the screen complete, move progress, unlock content, change current screen state, or provide Continue/Next behavior.

### Token And CSS Guardrails

Use scoped design-system CSS only if the future implementation task explicitly approves CSS. Use existing tokens only. Stop if raw values, token edits, or global CSS edits appear necessary.

### QA Requirements

Future QA must check changed-file scope, build, token references, visual drift, semantic order, heading behavior, import purity, no behavior ownership, responsive layout, and alignment updates.

### Stop Conditions

Stop if this template needs Button, routing, progress, completion, screen integration, behavior-heavy blocks, learner input, token edits, global CSS, raw visual values, or unclear heading hierarchy.

## 7. Framework Explanation Screen Template Specification

### Purpose

The Framework Explanation Screen Template explains a small framework, relationship, or principle set through one or two concept explanations.

### Intended Learner Experience

The learner reads a screen title, optionally reads a short introduction, then reviews one or two related concepts in a controlled sequence, followed by an optional key message.

### Appropriate Use Cases

- explaining a small relationship between two ideas;
- introducing two parts of a simple framework;
- summarizing a principle set before later practice;
- preparing for later comparison or scenario work without implementing that behavior.

### Inappropriate Use Cases

- dense multi-part frameworks;
- tabs, accordions, hotspots, or labeled graphics;
- branching exploration;
- behavior-heavy framework interactions;
- knowledge checks;
- scenario decisions;
- reflection capture;
- route transitions or progress gates.

### Future File Path

Likely future path:

- `src/components/design-system/templates/FrameworkExplanationTemplate.tsx`

Possible export path:

- `src/components/design-system/index.ts`

### Allowed Composition

- one or two `ConceptExplanationBlock` instances;
- optional `Card` grouping if meaningful and not decorative;
- optional one `KeyMessageBlock`;
- no `Button` in the first implementation;
- no tabs, accordions, hotspots, branching, or behavior-heavy exploration;
- no completion, progress, routing, assessment, storage, feedback, selected state, or scoring logic.

### Proposed Safe Interface Concept

Do not implement these props in this documentation task.

```ts
type FrameworkExplanationTemplateProps = {
  screenTitle: React.ReactNode;
  eyebrow?: React.ReactNode;
  introduction?: React.ReactNode;
  concepts: Array<{
    title: React.ReactNode;
    summary?: React.ReactNode;
    body: React.ReactNode;
    keyPoint?: React.ReactNode;
    support?: React.ReactNode;
  }>;
  keyMessage?: React.ReactNode;
  keyMessageTitle?: React.ReactNode;
  className?: string;
};
```

The first implementation slice must limit `concepts` to one or two items.

### Heading Hierarchy Ownership

- The template owns the screen title relationship.
- Each concept title is passed to `ConceptExplanationBlock` as block text, not as an automatic heading.
- If concept titles must participate in the document outline, the future implementation task must specify that explicitly before coding.
- `Card` title text must not become a heading unless the future specification defines the heading relationship.

### Block Sequencing Rules

- Introduction, if present, appears before concept blocks.
- Concept blocks appear in the provided order.
- Optional key message appears after the concept sequence.
- Do not interleave unrelated blocks or local actions.

### Density Limits

- One or two concept items only.
- No nested card-heavy layouts.
- No more than one key message.
- Avoid long introductions.
- Avoid using `Card` when the concept sequence is already clear.

### Responsive Behavior

- Stack all concept blocks vertically on narrow screens.
- Avoid side-by-side comparison in the first slice unless a later task explicitly proves responsive safety.
- Avoid fixed heights and horizontal scrolling.
- Keep each concept section scannable.

### Accessibility Expectations

- Reading order follows screen title, introduction, concept sequence, key message.
- Visible text carries framework relationships.
- No ARIA role inflation.
- No focus management.
- No keyboard traps.
- No alert or live-region behavior.

### Completion/Progress Exclusions

The template does not determine whether framework parts have been viewed, does not track view state, and does not mark completion or move progress.

### Token And CSS Guardrails

Use existing approved tokens only. Any future `Card` or layout styling must be scoped and must not use raw visual values, token edits, global CSS, module CSS, or Phase D/current-state selectors.

### QA Requirements

Future QA must check concept-count limits, changed-file scope, build, token references, visual drift, heading behavior, semantic reading order, import purity, responsive layout, no behavior ownership, and alignment updates.

### Stop Conditions

Stop if the template needs more than two concept items, tabs, accordions, hotspots, interaction state, Button, routing, progress, completion, behavior-heavy blocks, token edits, global CSS, raw visual values, or screen integration.

## 8. Key Message / Summary Screen Template Specification

### Purpose

The Key Message / Summary Screen Template reinforces a short takeaway, transition message, or summary without implying completion, correctness, scoring, alert behavior, or progress state.

### Intended Learner Experience

The learner reads a screen title, reviews one key message, and optionally reads a short supporting explanation.

### Appropriate Use Cases

- reinforcing a key takeaway;
- closing a short instructional sequence;
- introducing a transition idea;
- emphasizing a caution or safe-practice reminder in visible wording.

### Inappropriate Use Cases

- completion confirmation;
- scored correctness feedback;
- assessment feedback;
- urgent alerts or live notices;
- module completion transitions;
- route movement or progress gates;
- long summaries that need multiple sections.

### Future File Path

Likely future path:

- `src/components/design-system/templates/KeyMessageSummaryTemplate.tsx`

Possible export path:

- `src/components/design-system/index.ts`

### Allowed Composition

- one `KeyMessageBlock` required;
- optional short supporting explanation;
- no `Button` in the first implementation;
- no completion, correctness, scoring, warning alert, or progress implication;
- no learner input;
- no knowledge check;
- no scenario decision.

### Proposed Safe Interface Concept

Do not implement these props in this documentation task.

```ts
type KeyMessageSummaryTemplateProps = {
  screenTitle: React.ReactNode;
  eyebrow?: React.ReactNode;
  variant?: 'info' | 'success' | 'warning';
  messageTitle?: React.ReactNode;
  message: React.ReactNode;
  explanation?: React.ReactNode;
  className?: string;
};
```

### Heading Hierarchy Ownership

- The template owns the screen title relationship.
- `KeyMessageBlock` remains heading-neutral.
- Message title text is not a page heading unless a future implementation task specifies the relationship.
- Avoid duplicate page headings.

### Message Wording Rules

- Visible wording must carry all meaning.
- `success` wording must not imply screen completion, correctness, score, progress, or assessment success.
- `warning` wording must not imply error, danger, destructive state, assessment failure, or urgent alert behavior.
- Use `info` for neutral takeaways and transitions.

### Non-Color-Only Meaning Rule

Color, icon, border, or variant must never be the only signal. The `message` and optional title must explain why the message matters.

### Responsive Behavior

- Stack the screen title and key message vertically.
- Keep the message prominent but not viewport-filling.
- Avoid fixed heights and horizontal scrolling.
- Keep explanation short and readable below or near the message.

### Accessibility Expectations

- Screen title precedes message content in reading order.
- No alert role.
- No live region.
- No focus management.
- No keyboard trap.
- No color-only meaning.

### Completion/Progress Exclusions

The template does not mark anything complete, move progress, unlock content, set current state, or provide Continue/Next behavior.

### Token And CSS Guardrails

Use existing approved tokens only. Stop if additional status colors, alert styling, raw values, token edits, global CSS, or Phase D/current-state selectors appear necessary.

### QA Requirements

Future QA must check variant wording, changed-file scope, build, token references, visual drift, semantic reading order, no alert/live-region behavior, import purity, responsive layout, and alignment updates.

### Stop Conditions

Stop if the template needs completion state, correctness feedback, scoring, warning alert behavior, Button, routing, progress, token edits, global CSS, raw visual values, or screen integration.

## 9. Heading Hierarchy And Semantics

Future implementation expectations:

- each template may render the screen title with an explicit heading element;
- the future implementation task must verify the current course shell heading structure before choosing `h1` or `h2`;
- if the correct heading level is uncertain, use a conservative `h2` default or caller-controlled heading component only if the future implementation prompt approves it;
- blocks remain heading-neutral;
- no block title should become `h1` through `h6` automatically;
- do not add `role="heading"` unless separately specified;
- ensure readable title-to-block order;
- avoid duplicate page headings.

The heading level cannot be fully determined from this documentation-only specification alone, so this remains PASS WITH CAUTION and must be verified during the future implementation task before rendering `h1` or `h2`.

## 10. Action Hierarchy And Button Exclusion

- `Button` must be excluded from the first template implementation slice.
- No Continue or Next behavior is approved.
- No routing action is approved.
- No progress movement is approved.
- No assessment submit or check-answer action is approved.
- No modal, drawer, or help launcher action is approved.
- Any future action area requires a separate behavior specification.

## 11. Completion And Progress Boundary

- These templates are read-only and instructional.
- No completion logic is approved.
- No screen completion marker is approved.
- No progress movement is approved.
- No lock or unlock logic is approved.
- No `currentScreenId` behavior is approved.
- No assessment, score, retry, validation, selected state, feedback, or certificate behavior is approved.
- Completion remains outside the template layer.

## 12. Responsive Behavior Specification

Future implementation expectations:

- mobile-first readable structure;
- no fixed heights that cut content;
- no horizontal scrolling;
- templates stack blocks vertically on narrow screens;
- Framework Explanation avoids side-by-side comparison in the first slice unless responsive behavior is explicitly safe;
- Key Message / Summary does not dominate the entire viewport;
- spacing uses existing tokens only;
- desktop, tablet, and mobile QA is required.

## 13. Accessibility And Screen-Help Metadata Expectations

Future implementation expectations:

- readable title and content order;
- no keyboard traps;
- no focus management by templates in the first implementation;
- no alert or live-region behavior for `KeyMessageBlock`;
- no color-only meaning;
- no ARIA role inflation;
- templates may allow future screen-help metadata, but must not implement HelpOverlay or accessibility toolbar behavior;
- future QA must include high contrast and text-size compatibility checks where available.

## 14. Relationship To Module 2 Micro-Slice

These templates may later support the Module 2 rights-holders, duty-bearers, and participation micro-slice.

Examples only:

- Concept Introduction for rights-holders;
- Concept Introduction for duty-bearers;
- Framework Explanation for the rights-holders and duty-bearers relationship;
- Key Message / Summary for meaningful participation.

This specification does not approve Module 2 planning, content migration, route changes, or vertical slice implementation.

## 15. Token And CSS Guardrails For Future Implementation

Future implementation rules:

- no raw hex colors;
- no `rgb()` or `rgba()`;
- no gradients;
- no unapproved shadows;
- no broad `.is-active`;
- no Phase D or current-state selectors;
- no global reset selectors;
- no module-specific selectors;
- no token-file edits unless separately approved;
- no `src/styles/global.css` edits unless separately approved;
- use only existing approved tokens;
- if a needed token is missing, stop and document it instead of inventing values;
- scoped class names only;
- no screen-specific local styling.

Approved future class-name concepts, if a later implementation approves CSS:

- `.cso-screen-template`
- `.cso-concept-introduction-template`
- `.cso-framework-explanation-template`
- `.cso-key-message-summary-template`
- `.cso-screen-template__header`
- `.cso-screen-template__eyebrow`
- `.cso-screen-template__title`
- `.cso-screen-template__body`
- `.cso-screen-template__blocks`
- `.cso-screen-template__summary`

## 16. Future File Architecture

Proposed future architecture:

- `src/components/design-system/templates/ConceptIntroductionTemplate.tsx`
- `src/components/design-system/templates/FrameworkExplanationTemplate.tsx`
- `src/components/design-system/templates/KeyMessageSummaryTemplate.tsx`
- `src/components/design-system/templates/index.ts`
- optional export from `src/components/design-system/index.ts` if approved;
- scoped styling in `src/components/design-system/design-system.css` only if approved in the future implementation prompt.

This documentation task creates no template files.

## 17. Future Implementation Slice

The smallest safe future implementation task is:

- implement only `ConceptIntroductionTemplate`, `FrameworkExplanationTemplate`, and `KeyMessageSummaryTemplate`;
- keep them structural, read-only, and instructional only;
- use existing approved blocks and primitives;
- exclude `Button`;
- exclude behavior, completion, progress, routing, assessment, storage, feedback, scoring, selected state, input, and screen integration;
- avoid global CSS;
- avoid token edits;
- use scoped CSS only if needed and explicitly approved;
- create a QA note and update alignment;
- require independent evaluation after implementation.

## 18. QA Plan For Future Implementation

Future implementation QA must include:

- `npm run build`;
- `git diff --check`;
- `git diff --cached --check`;
- changed-file scope check;
- token-reference existence check;
- visual-drift advisory check;
- semantic/accessibility check;
- import check confirming no routing, progress, course, module, player, assessment, certificate, storage, modal, drawer, HelpOverlay, or accessibility toolbar behavior imports;
- no screen integration;
- no route, progress, content, or asset changes;
- no global CSS or token edits;
- desktop, tablet, and mobile responsive QA if a demoable route or test harness is available;
- PASS/STOP result;
- alignment update;
- independent evaluation after implementation.

## 19. Stop Conditions For Future Implementation

Stop if:

- templates require routing, progress, completion, assessment, or certificate behavior;
- templates require storage, form input, correctness, feedback, selected state, scoring, retry, validation, or learner persistence;
- templates need `Button` or Continue/Next behavior;
- token files must be edited;
- `src/styles/global.css` must be edited;
- raw visual values are needed;
- broad `.is-active` or Phase D/current-state selectors appear;
- screen integration or vertical slice work starts;
- old course/module code is copied directly into shared templates;
- heading hierarchy cannot be kept screen-template-owned and evidence-based;
- implementation begins before this specification is reviewed.

## 20. Recommended Next Task After This Specification

If this specification is reviewed and accepted, implement `ConceptIntroductionTemplate`, `FrameworkExplanationTemplate`, and `KeyMessageSummaryTemplate` only as bounded structural/read-only screen-template components.

If heading hierarchy remains unresolved during implementation planning, create a documentation-only heading hierarchy readiness note before implementation.

Do not recommend screen integration or Module 2 vertical slice planning yet.

## 21. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | Yes. |
| Are template implementations still blocked until review? | Yes. |
| Are the three selected templates specified? | Yes. Concept Introduction, Framework Explanation, and Key Message / Summary are specified. |
| Are these templates structural/read-only/instructional only? | Yes. |
| Is routing/progress/completion/assessment behavior excluded? | Yes. |
| Is storage/input/feedback/scoring excluded? | Yes. |
| Are selected/current/completed/locked/progress states excluded? | Yes. |
| Is Button excluded from the first implementation slice? | Yes. |
| Is heading hierarchy screen-template-owned? | Yes, with future implementation verification required for exact heading level. |
| Are CSS and token edits blocked? | Yes. |
| Are screen integration and vertical slice changes blocked? | Yes. |
| Is the recommended future implementation slice clear? | Yes. Implement only the three bounded structural templates after review. |
| Is Phase D CSS still blocked? | Yes. |
| Is full scale-up still blocked? | Yes. |
