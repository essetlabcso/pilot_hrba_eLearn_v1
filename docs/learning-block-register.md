# CSO Learning Hub Learning Block Register

## Status

Draft v0.1 — Approved learning block taxonomy for system planning

## Purpose

The Learning Block Register defines the reusable instructional blocks that future course screens may use. It exists to prevent repetitive screens, random interactivity, and AI-invented layouts.

This register ensures every interaction is tied to a clear learning purpose before any screen, component, template, or visual treatment is produced.

## Relationship To The System Charter And AI Production Contract

- The system charter requires learning purpose before interaction choice.
- The AI production contract requires AI to select from approved options instead of inventing interactions.
- This register defines those approved learning block options at the instructional level.
- This document does not implement code.

## Core Rule

No learning block should be used because it looks attractive.

Every learning block must serve a defined learning purpose.

AI may select a block only when the learning purpose, learner action, accessibility behavior, completion rule, and mobile behavior are clear.

## Block Selection Decision Guide

| Learning purpose | Recommended block type | Learner action | Good use example for HRBA/CSO courses | Avoid when |
|---|---|---|---|---|
| Explain a concept | Concept Explanation Block | Read, connect, and identify the main idea | Explain what a rights-holder is | Learners need practice or judgment |
| Highlight an important idea | Statement / Key Message Block | Notice and retain a key principle | Present "participation must influence decisions" | The idea needs comparison or evidence |
| Compare ideas or choices | Comparison Block | Compare, contrast, and choose distinctions | Compare service delivery and rights-based practice | There is only one idea to explain |
| Apply judgment | Scenario Decision Block | Choose and justify a decision | Decide how to respond to a participation dilemma | The answer is purely factual |
| Identify risks/problems | Risk-Spotting Block | Inspect a situation and mark risks | Spot exclusion risk in a project plan | The task is concept recall only |
| Explore a framework/diagram | Hotspot / Labeled Graphic Block | Select labeled parts and read details | Explore the five HRBA working principles | The image is decorative or too dense |
| Reveal layered information | Accordion / Tabs Block | Open sections in a clear sequence | Review steps in a complaints mechanism | All content must be visible at once |
| Practice improvement | Repair Lab / Tool Practice Block | Revise, improve, or classify work | Improve a weak HRBA objective | Learners only need awareness |
| Reflect personally or organizationally | Reflection / Portfolio Capture Block | Write, choose, or save a reflection | Capture a CSO accountability commitment | The response has a single correct answer |
| Check understanding | Knowledge Check Block | Answer and receive feedback | Check understanding of duty-bearer obligations | The goal is deep reflection or open judgment |
| Tell a realistic story | Case Story Block | Follow a narrative and identify learning points | Read a community exclusion case | The content is not contextual or human-centered |
| Show a sequence or process | Process / Timeline Block | Follow steps and relationships | Show HRBA project cycle steps | Steps are not ordered or process-based |
| Support action planning | Checklist / Action Plan Block | Select, plan, or confirm next actions | Plan legal and policy analysis questions | The task is exploratory rather than actionable |
| Present evidence or simple data | Chart / Data Insight Block | Interpret a simple pattern or finding | Review participation data by group | The data is too complex or not relevant |
| Summarize learning | Module Synthesis Block | Connect key ideas and next actions | Recap HRBA principles at module end | Learners have not completed the module learning |
| Transition or gate progress | Continue / Completion Transition Block | Confirm readiness or completion | Move from practice into module completion | Used as decoration or unnecessary interruption |

## Approved Block Types

### Concept Explanation Block

- Purpose: Explain a core idea in clear language.
- When to use: Use when learners need a stable concept before practice.
- When not to use: Do not use when learners need to compare, decide, or repair something.
- Typical content slots: heading, plain-language explanation, example, optional visual, key takeaway.
- Learner action: Read and connect the concept to an example.
- Accessibility requirements: Semantic heading, readable text, meaningful alt text for visuals, plain-language wording.
- Mobile behavior: Stack text and visual cleanly with the key takeaway visible.
- Completion rule: Complete after the learner views the concept and any required example.
- QA checks: Concept is accurate, concise, non-decorative, and usable without the visual.
- HRBA example: Explain the meaning of a rights-holder.

### Statement / Key Message Block

- Purpose: Emphasize a principle, warning, or memorable takeaway.
- When to use: Use for a high-priority message that should guide later decisions.
- When not to use: Do not use as a substitute for explanation, practice, or evidence.
- Typical content slots: statement, short explanation, optional source/context note.
- Learner action: Read and retain the key point.
- Accessibility requirements: Text must not rely on visual emphasis alone; screen reader order must be clear.
- Mobile behavior: Keep the message short and avoid oversized text that pushes actions away.
- Completion rule: Complete after the message is viewed.
- QA checks: Message is important, brief, and connected to module purpose.
- HRBA example: State that participation must influence decisions, not only attendance.

### Comparison Block

- Purpose: Help learners distinguish concepts, choices, or approaches.
- When to use: Use when confusion between ideas is likely.
- When not to use: Do not use when items are unrelated or too many to compare clearly.
- Typical content slots: comparison title, two or more items, criteria, summary distinction.
- Learner action: Compare similarities, differences, and implications.
- Accessibility requirements: Use semantic lists or tables where appropriate; do not rely on color alone.
- Mobile behavior: Stack comparison items with repeated labels so meaning remains clear.
- Completion rule: Complete after all comparison items are viewed or selected.
- QA checks: Comparison criteria are parallel, fair, and instructionally useful.
- HRBA example: Compare rights-holder and beneficiary language.

### Scenario Decision Block

- Purpose: Let learners apply judgment in a realistic situation.
- When to use: Use when the learning goal involves choosing a response.
- When not to use: Do not use for simple recall or trick questions.
- Typical content slots: scenario, decision prompt, answer options, feedback, reflection.
- Learner action: Choose a response and review feedback.
- Accessibility requirements: Keyboard-selectable options, visible focus, screen reader labels, clear feedback.
- Mobile behavior: Options must be large enough to select and readable without horizontal scrolling.
- Completion rule: Complete after a decision is selected and feedback is viewed.
- QA checks: Scenario is realistic, options are plausible, and feedback teaches the principle.
- HRBA example: Choose how a CSO should respond when excluded groups are missing from consultation.

### Risk-Spotting Block

- Purpose: Train learners to identify problems, risks, or missing safeguards.
- When to use: Use when learners must inspect a plan, image, story, or checklist for issues.
- When not to use: Do not use when there are no clear risk indicators.
- Typical content slots: case material, risk targets, hint, selections, feedback summary.
- Learner action: Identify risks and review why they matter.
- Accessibility requirements: Provide text alternatives for visual targets and do not rely on spatial position alone.
- Mobile behavior: Convert dense visual spotting into accessible stacked targets or checklist choices.
- Completion rule: Complete after required risks are selected or reviewed.
- QA checks: Risks are evidence-based, not subjective guesses.
- HRBA example: Spot exclusion, privacy, and safeguarding risks in project design.

### Hotspot / Labeled Graphic Block

- Purpose: Let learners explore parts of a framework, diagram, or image.
- When to use: Use when visual structure supports understanding.
- When not to use: Do not use for decorative images or dense diagrams that fail on mobile.
- Typical content slots: image, labels, hotspot descriptions, summary.
- Learner action: Open labels and connect parts to the whole.
- Accessibility requirements: Keyboard access, text equivalents for all labels, meaningful alt text.
- Mobile behavior: Labels must stack or become a list if the graphic becomes too small.
- Completion rule: Complete after required labels are opened.
- QA checks: Every label adds value and the graphic is understandable without pointer-only interaction.
- HRBA example: Explore five HRBA working principles on a labeled framework.

### Accordion / Tabs Block

- Purpose: Organize layered information into manageable sections.
- When to use: Use when content can be grouped into clear sections.
- When not to use: Do not use to hide essential information needed for a decision.
- Typical content slots: section labels, section content, summary, optional progress indicator.
- Learner action: Open sections and review grouped information.
- Accessibility requirements: Correct expanded states, keyboard access, screen reader labels, visible focus.
- Mobile behavior: Sections should stack cleanly and remain easy to open.
- Completion rule: Complete after required sections are opened.
- QA checks: Labels are clear and content grouping reduces cognitive load.
- HRBA example: Present each HRBA working principle as a tab or accordion section.

### Repair Lab / Tool Practice Block

- Purpose: Help learners improve weak or incomplete work.
- When to use: Use when learners need to practice revision, classification, or tool use.
- When not to use: Do not use before learners understand the criteria for improvement.
- Typical content slots: flawed example, criteria, repair options, model improvement, feedback.
- Learner action: Revise or select improvements.
- Accessibility requirements: Editable or selectable elements must be keyboard accessible and clearly labeled.
- Mobile behavior: Keep tasks short and avoid complex side-by-side editing on small screens.
- Completion rule: Complete after the learner submits or reviews the repair.
- QA checks: Repair criteria are explicit and feedback explains why the improvement works.
- HRBA example: Improve a project objective so it reflects participation and accountability.

### Reflection / Portfolio Capture Block

- Purpose: Support personal, team, or organizational reflection.
- When to use: Use when learners should connect content to their own CSO practice.
- When not to use: Do not use when the task requires a scored factual answer.
- Typical content slots: reflection prompt, optional examples, text or choice input, save/summary area.
- Learner action: Write, select, or capture a reflection.
- Accessibility requirements: Inputs must have labels, instructions, and clear save/continue behavior.
- Mobile behavior: Text entry must be comfortable and not block navigation.
- Completion rule: Complete after the learner enters or intentionally skips an allowed reflection.
- QA checks: Prompt is practical, respectful, and not overly personal or unsafe.
- HRBA example: Capture one accountability practice the learner's CSO can strengthen.

### Knowledge Check Block

- Purpose: Check understanding and reinforce feedback.
- When to use: Use after concept explanation or practice.
- When not to use: Do not use as the only learning activity for complex judgment.
- Typical content slots: question, options, correct answer, feedback, retry rule.
- Learner action: Answer and review feedback.
- Accessibility requirements: Keyboard operation, semantic controls, feedback announced clearly.
- Mobile behavior: Options stack with sufficient touch area.
- Completion rule: Complete after answer submission and feedback review.
- QA checks: Question maps to taught content and feedback explains the reasoning.
- HRBA example: Check which actor has an obligation in a local service example.

### Case Story Block

- Purpose: Present a realistic story that grounds learning in context.
- When to use: Use when learners need human context before analysis.
- When not to use: Do not use if the story is too long, sensational, or disconnected from learning goals.
- Typical content slots: story setup, characters, context, turning point, learning prompt.
- Learner action: Read or listen and identify relevant learning points.
- Accessibility requirements: Plain language, readable structure, media fallback if audio/video is used.
- Mobile behavior: Break long stories into short sections.
- Completion rule: Complete after the story and required prompt are viewed.
- QA checks: Story is respectful, realistic, and avoids harmful stereotypes.
- HRBA example: A local CSO discovers that women with disabilities are missing from meetings.

### Process / Timeline Block

- Purpose: Show ordered steps, stages, or process relationships.
- When to use: Use when sequence matters.
- When not to use: Do not use for unordered collections.
- Typical content slots: step labels, descriptions, current step, summary, optional check.
- Learner action: Follow the sequence and understand what happens next.
- Accessibility requirements: Preserve step order in semantic structure and screen reader reading order.
- Mobile behavior: Convert horizontal timelines to vertical steps.
- Completion rule: Complete after required steps are viewed.
- QA checks: Steps are accurate, ordered, and not overloaded.
- HRBA example: Show HRBA project cycle steps from analysis to adaptation.

### Checklist / Action Plan Block

- Purpose: Support planning, review, or practical application.
- When to use: Use when learners need to confirm actions or build a next-step plan.
- When not to use: Do not use for content that is exploratory or uncertain.
- Typical content slots: checklist items, guidance, optional notes, action summary.
- Learner action: Select, review, or plan actions.
- Accessibility requirements: Form controls must have labels and clear selected states.
- Mobile behavior: Items stack and remain easy to tap.
- Completion rule: Complete after required selections or review steps are done.
- QA checks: Items are actionable, realistic, and aligned with course guidance.
- HRBA example: Select legal and policy analysis questions before project design.

### Chart / Data Insight Block

- Purpose: Present simple evidence or a data pattern for interpretation.
- When to use: Use when a simple data point supports learning.
- When not to use: Do not use for complex dashboards or unsupported claims.
- Typical content slots: chart or data display, plain-language insight, source/context, interpretation prompt.
- Learner action: Interpret the insight and connect it to action.
- Accessibility requirements: Text summary of the data, labels, and no color-only meaning.
- Mobile behavior: Use simple charts or stacked data summaries.
- Completion rule: Complete after the insight and interpretation prompt are viewed.
- QA checks: Data is accurate, understandable, and not misleading.
- HRBA example: Review participation data showing who is missing from project meetings.

### Module Synthesis Block

- Purpose: Summarize and connect learning across a module.
- When to use: Use near the end of a module or major section.
- When not to use: Do not use before learners have completed the relevant learning.
- Typical content slots: key takeaways, concept connections, action prompt, next step.
- Learner action: Review, connect, and prepare to continue.
- Accessibility requirements: Clear heading structure and concise summary text.
- Mobile behavior: Keep takeaways scannable and avoid dense recap walls.
- Completion rule: Complete after review and any required action prompt.
- QA checks: Synthesis reflects the module objectives and does not introduce new unsupported content.
- HRBA example: Recap how participation, accountability, and inclusion work together.

### Continue / Completion Transition Block

- Purpose: Mark readiness, transition, or completion.
- When to use: Use when learners need a clear checkpoint or gate.
- When not to use: Do not use as decorative filler between ordinary screens.
- Typical content slots: completion message, readiness statement, next step, optional requirements list.
- Learner action: Confirm readiness or continue.
- Accessibility requirements: Button labels must be clear and state requirements if disabled.
- Mobile behavior: CTA must remain visible and not be hidden below oversized content.
- Completion rule: Complete when requirements are met and the learner chooses to continue.
- QA checks: Gate conditions are transparent and not frustrating.
- HRBA example: Confirm module completion and return to the course map.

## Minimum Accessibility Requirements For Every Block

- readable contrast;
- keyboard navigation where interactive;
- visible focus states where interactive;
- semantic heading structure;
- screen reader labels where interactive;
- no instruction that relies only on color, position, or visual appearance;
- alt text for meaningful images;
- captions/transcripts for media;
- reduced-motion respect for animated interactions;
- plain-language instructions.

## Mobile And Low-Bandwidth Requirements

- block must stack cleanly on mobile;
- no hidden CTA or blocked navigation;
- no horizontal scrolling unless explicitly approved;
- image-heavy blocks require optimized assets;
- video/audio must have text fallback;
- interactions should remain usable on small screens;
- avoid unnecessarily heavy custom interactions.

## HRBA-Specific Learning Examples

This register supports HRBA learning without making the design system subject-specific. HRBA examples should use approved learning blocks in ways that remain reusable for future CSO courses.

- Rights-holder vs duty-bearer comparison → Comparison Block
- Participation dilemma → Scenario Decision Block
- Exclusion risk in project design → Risk-Spotting Block
- HRBA project cycle steps → Process / Timeline Block
- Legal and policy analysis questions → Checklist / Action Plan Block
- Root-cause tree practice → Repair Lab / Tool Practice Block
- Personal CSO accountability reflection → Reflection / Portfolio Capture Block
- Five HRBA working principles → Hotspot / Labeled Graphic Block or Accordion / Tabs Block
- Module recap → Module Synthesis Block

## Blocks That Require Extra Approval

These require explicit approval before use:

- custom code interactions;
- complex branching scenarios;
- data dashboards;
- embedded third-party tools;
- heavy video-first blocks;
- new block types not listed in this register.

## What AI May Do With This Register

AI may:

- recommend a block based on learning purpose;
- draft content for approved block slots;
- create HRBA examples and scenarios;
- draft feedback and reflection prompts;
- propose accessibility metadata;
- propose a new block only as a recommendation, not as implementation.

AI must not:

- invent unapproved block types;
- implement block code before approval;
- create local CSS for a block;
- copy old screen layout logic directly;
- bypass accessibility requirements;
- use the same block repeatedly without an interaction rhythm reason.

## QA Checklist For Block Selection

- Yes/No: Is the learning purpose clear?
- Yes/No: Is this the simplest effective block?
- Yes/No: Does the block require learner action?
- Yes/No: Is the action meaningful, not decorative?
- Yes/No: Is the block accessible?
- Yes/No: Does it work on mobile?
- Yes/No: Does it avoid unnecessary cognitive load?
- Yes/No: Does it fit the module interaction rhythm?
- Yes/No: Is the completion rule clear?
- Yes/No: Is there a plain-language instruction?

## Relationship To Future Screen Templates

This register defines instructional blocks, not full screens. The next document, `screen-template-register.md`, will define how blocks are arranged into reusable screen templates.

## Final Commitment

Learning blocks must create practical understanding, reflection, judgment, and action for CSO learners. They must prevent repetitive screens while keeping the system consistent, accessible, and reusable.
