# Design System v0.1 Learning Block Frame Implementation Specification

Draft v0.1 - Documentation-only specification for a future presentational structural primitive

## 1. Purpose

This document prepares a future Learning Block Frame implementation for Design System v0.1.

The Learning Block Frame is not a learning block by itself. It is a structural wrapper that may later help approved learning blocks share consistent layout, headings, support text, body content, and optional local action areas.

This specification does not implement React, CSS, tokens, components, blocks, templates, screens, scripts, routing, progress, assessment, certificate logic, content, assets, module CSS, old HRBA files, or course behavior.

## 2. Source Evidence Reviewed

| Source | Relevant finding |
| --- | --- |
| `docs/design-system-v0-1-primitive-usage-boundaries.md` | Callout, Card, and Button have usage boundaries, but they must remain primitive-level tools. They do not own routing, progress, completion, assessment, screen integration, or learning-block behavior. |
| `docs/design-system-v0-1-next-component-readiness-decision.md` | Learning Block Frame was classified as ready with caution after primitive usage boundaries, provided it stays presentational and does not imply completion or progress behavior. |
| `docs/design-system-v0-1-component-inventory-and-priority-plan.md` | Learning block frame is a medium-risk candidate intended to create consistent wrappers for block title, instruction, body, and completion affordance areas. The behavior boundary must be explicit. |
| `docs/design-system-v0-1-learning-block-template-map.md` | Concept Explanation and Key Message are the safest early block candidates. Comparison and Completion Transition require caution. Scenario Decision, Reflection / Portfolio, and Knowledge Check remain blocked until behavior-specific specs exist. |
| `docs/learning-block-register.md` | Learning blocks must be selected for learning purpose, learner action, accessibility, completion, and mobile behavior. A frame can support structure, but it cannot create a block merely because the layout looks useful. |
| `docs/screen-template-register.md` | Screen templates own screen anatomy, placement, sequencing, responsive behavior, and completion rules. A frame spec cannot approve screen or template implementation. |
| `docs/design-system-v0-1-visual-drift-prevention-plan.md` | Future implementation must avoid raw visual values, broad state selectors, Phase D/current selectors, gradients, unapproved shadows, and global or module-specific CSS drift. |
| `docs/design-system-v0-1-qa-evidence-pack.md` | A future implementation needs changed-file scope, build evidence, token/CSS compliance, visual-drift checks, accessibility checks, PASS/STOP result, and alignment update. Documentation-only work requires `git diff --check`; build is not required. |
| `docs/ai-production-contract.md` | AI must operate inside approved structures, document decisions before code, avoid one-off components, and stop when behavior, routing, progress, tokens, templates, or accessibility rules are not approved. |
| `docs/design-system/08_AGENT_IMPLEMENTATION_RULES.md` | Documentation-only tasks must not change source code. Agents must not invent layouts, blocks, templates, interaction logic, completion rules, tokens, or broad CSS. |
| `docs/design-system-plan-progress-alignment.md` | Current alignment identifies the Learning Block Frame implementation specification as the next safe gate, while screen integration, behavior-heavy components, Phase D CSS, vertical slice implementation, and full scale-up remain blocked. |

## 3. Why Learning Block Frame Comes Next

Learning Block Frame is the safest next gate after Callout, Card, and Button usage boundaries because it creates a bridge between primitive components and future learning blocks without jumping directly into course screens.

It reduces blank screen-by-screen production by defining a common structural vocabulary before a vertical slice begins. It helps future block specs describe title, instruction, body, support, action, and footer areas without each screen inventing a local layout.

It also avoids behavior-heavy implementation too early. Scenario decisions, reflection capture, knowledge checks, completion transitions, and progress gates all need separate behavior specifications. The frame can prepare those future blocks, but it must not own completion, progress, routing, scoring, input, feedback, or storage.

## 4. Learning Block Frame Scope Decision

Readiness result: PASS WITH CAUTION.

The Learning Block Frame is ready only if a future implementation remains structural, presentational, and behavior-free. It may define a consistent wrapper pattern for approved block content, but it must not become a learning block, screen template, progress controller, assessment component, state manager, or course-player control.

## 5. What The Learning Block Frame May Do

A future Learning Block Frame may safely provide:

- outer block container;
- optional eyebrow or block label;
- optional title area;
- optional short instruction or description area;
- body/content slot;
- optional support area;
- optional local action area;
- optional footer/meta area;
- consistent spacing and visual grouping;
- semantic wrapper selected by caller or simple safe default.

These affordances are layout and composition affordances only. They do not approve any block behavior.

## 6. What The Learning Block Frame Must Not Do

A future Learning Block Frame must not implement or own:

- completion logic;
- progress movement;
- routing;
- assessment scoring;
- correctness feedback;
- selected/current state;
- completed, locked, disabled, or progress state migration;
- storage or portfolio capture;
- form validation;
- knowledge-check option behavior;
- scenario decision behavior;
- reflection input behavior;
- Continue or Next ownership;
- screen integration;
- template implementation;
- modal, dialog, drawer, help, or accessibility toolbar behavior;
- player shell replacement;
- animation or reveal behavior.

## 7. Relationship To Existing Primitives

Card may inform the Learning Block Frame's surface and grouping model, but the frame should not blindly become Card unless the semantics fit the future block use.

Callout may appear inside a frame only when it carries meaningful supporting guidance, warning, reminder, or explanatory content. It must not be used as decoration or as color-only meaning.

Button may appear in an optional action area only when the behavior is owned by the caller or by a separate approved block specification. The frame must not use Button to own routing, progress, completion, navigation, or assessment behavior.

Primitive composition must not be used to create unapproved interactive blocks. A Card plus Button plus Callout inside a frame is still not a scenario decision, reflection capture, knowledge check, or completion gate unless those patterns have their own approved specifications.

## 8. Future Component Concept

This section describes a future component concept only. It does not implement these files or props.

Potential future file path:

- `src/components/design-system/LearningBlockFrame.tsx`

Potential future export:

- `src/components/design-system/index.ts`

Potential future styling location:

- `src/components/design-system/design-system.css` only if scoped and separately approved in a future implementation task.

Potential minimal interface concept:

```ts
type LearningBlockFrameProps = {
  variant?: 'default' | 'soft';
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  support?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  as?: 'section' | 'div';
};
```

The first implementation slice should avoid a `headingLevel` prop. Heading hierarchy should be owned by the caller, template, or block specification rather than guessed by the frame.

## 9. Semantic And Accessibility Requirements

A future implementation must keep semantics simple and intentional:

- default semantic wrapper should not choose heading levels blindly;
- if a title is provided, heading hierarchy must be owned by the caller, template, or block specification;
- avoid role inflation;
- avoid inappropriate ARIA;
- no live regions by default;
- no keyboard trap;
- no focus management;
- no automatic focus movement;
- no color-only meaning;
- clear reading order;
- support visible structure without implying status or completion;
- action area must not imply navigation or progress unless a later block specification approves it.

The frame should expose structure, not behavior. It should not create hidden state relationships that assistive technology cannot verify from the visible content.

## 10. Visual And Token Guardrails

A future implementation must follow the v0.1 token and visual drift guardrails:

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
- if a needed token is missing, stop and document the gap instead of inventing values.

Approved future scoped class-name concept:

- `.cso-learning-block-frame`;
- `.cso-learning-block-frame--default`;
- `.cso-learning-block-frame--soft`;
- `.cso-learning-block-frame__eyebrow`;
- `.cso-learning-block-frame__title`;
- `.cso-learning-block-frame__description`;
- `.cso-learning-block-frame__body`;
- `.cso-learning-block-frame__support`;
- `.cso-learning-block-frame__actions`;
- `.cso-learning-block-frame__footer`.

## 11. Variant Decision

Recommended cautious scope for a future implementation:

- `default`;
- `soft`.

Defer these variants:

- success;
- warning;
- danger;
- selected/current;
- completed;
- locked;
- disabled;
- progress;
- assessment;
- scenario;
- reflection;
- knowledge-check.

Learning purpose should come from the block type and approved block specification, not from visual variants alone. A green, warning, completed, or assessment-looking frame would imply behavior and state that the frame is not allowed to own.

## 12. Relationship To Learning Block Register

| Future block type | May the frame be useful? | Frame may provide | Remains blocked | Additional specification needed |
| --- | --- | --- | --- | --- |
| Concept Explanation | Yes | Title, description, body slot, support area for clarification. | Completion, sequencing, and screen placement. | Concept Explanation block usage/specification and screen-template placement. |
| Key Message | Yes | Strong structural wrapper for short message, support text, and optional non-progress local action. | Decorative-only callouts, completion state, and navigation ownership. | Key Message block usage/specification and non-color-only meaning rules. |
| Comparison | Yes, with caution | Title, instruction, body slot for comparison content, support/footer areas. | Comparison interaction, reveal behavior, selected state, scoring, and responsive comparison rules. | Comparison block semantics, mobile stacking, and completion rules. |
| Scenario / Case Panel | Yes, only for static scenario framing | Scenario title, setup text, body slot, support guidance. | Choice behavior, decision state, feedback, scoring, consequence reveal, and completion. | Scenario Decision behavior specification before any interactive scenario use. |
| Reflection / Portfolio Capture | Yes, for surrounding context only | Prompt title, instruction text, support/safety note area. | Input, save/skip, validation, storage, portfolio capture, and completion. | Reflection / Portfolio behavior, persistence, HRBA safety, and completion specification. |
| Knowledge Check | Yes, for question shell context only | Question title, instruction, body slot, support/footer areas. | Options, selected state, correctness, retry, feedback, scoring, and completion. | Knowledge Check option, feedback, scoring, keyboard, and completion specification. |
| Completion Transition | Yes, with caution | Structural wrapper for summary text, support area, and externally owned action slot. | Continue/Next ownership, progress movement, route change, lock/unlock, and certificate behavior. | Completion Transition and progress/navigation ownership specification. |

## 13. Relationship To Screen Templates

Future screen templates must decide:

- where the frame appears;
- how many frames are allowed on a screen;
- heading hierarchy;
- responsive stacking;
- completion rules;
- action hierarchy;
- block sequencing;
- QA evidence.

This Learning Block Frame specification does not approve screen or template implementation. It also does not approve direct use of Callout, Card, Button, or Learning Block Frame in course screens.

## 14. Future Implementation Scope If PASS Or PASS WITH CAUTION

The smallest safe future implementation task is:

- implement `LearningBlockFrame` only as a presentational structural primitive;
- include `default` and `soft` variants only;
- implement no behavior;
- implement no completion, progress, routing, assessment, or storage logic;
- perform no screen integration;
- implement no learning blocks;
- edit no global CSS;
- edit no token files;
- use scoped CSS only if separately approved in the task;
- create a QA note and update alignment after implementation;
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
- import check confirming no routing, progress, course, player, assessment, storage, modal, drawer, or HelpOverlay behavior imports;
- no screen integration;
- no block/template implementation;
- no route/progress/content changes;
- no global CSS or token edits;
- PASS/STOP result;
- alignment update.

## 16. Stop Conditions For Future Implementation

Stop future implementation if:

- the frame needs routing, progress, completion, assessment, or certificate behavior;
- the frame needs storage, form input, correctness, feedback, selected state, or scoring;
- token files must be edited;
- `src/styles/global.css` must be edited;
- raw visual values are needed;
- broad `.is-active` or Phase D/current-state selectors appear;
- screen, template, or block implementation starts;
- behavior-heavy patterns are pulled in;
- old course/module code is copied directly into the shared frame;
- heading hierarchy is unclear;
- implementation begins before this specification is reviewed.

## 17. Recommended Next Task After This Specification

Because readiness is PASS WITH CAUTION, the recommended future task after review is:

- implement `LearningBlockFrame` only as a presentational structural primitive.

If review finds unresolved semantics, heading, token, or block boundary issues, the next task should instead be:

- create a documentation-only block semantics/heading hierarchy readiness note before implementation.

## 18. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | PASS. It creates a specification only and changes no implementation files. |
| Is Learning Block Frame implementation still blocked until review? | PASS. Implementation remains blocked until this specification is reviewed. |
| Is Learning Block Frame clearly not a learning block by itself? | PASS. It is defined only as a structural wrapper. |
| Is completion/progress/routing/assessment behavior excluded? | PASS. Completion, progress, routing, assessment, and certificate behavior are excluded. |
| Is storage/input/feedback/scoring excluded? | PASS. Storage, input, validation, feedback, selected state, correctness, retry, and scoring remain out of scope. |
| Are heading hierarchy responsibilities clear? | PASS WITH CAUTION. The caller, template, or block specification must own heading hierarchy; the frame must not guess it. |
| Are CSS and token edits blocked? | PASS. This task makes no CSS or token edits; future token/global CSS edits are blocked unless separately approved. |
| Are behavior-heavy components still blocked? | PASS. Scenario Decision, Reflection / Portfolio, Knowledge Check, and Completion Transition behavior remain gated. |
| Are screen/template/vertical slice changes blocked? | PASS. Screen integration, template implementation, and vertical slice implementation remain blocked. |
| Is the recommended future implementation slice clear? | PASS. Implement only a presentational structural primitive with `default` and `soft` variants after review. |
| Is Phase D CSS still blocked? | PASS. Phase D CSS remains blocked. |
| Is full scale-up still blocked? | PASS. Full scale-up remains blocked until vertical slice validation passes. |
