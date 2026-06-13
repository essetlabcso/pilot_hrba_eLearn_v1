# CSO Learning Hub Screen Template Register

## Status

Draft v0.1 — Approved screen template taxonomy for system planning

## Purpose

This register defines reusable screen-level patterns for the CSO Learning Hub. It exists so that future course screens are not built from blank prompts.

Each screen should be selected from an approved template based on learning purpose, learner action, block combination, accessibility requirements, mobile behavior, and completion rule.

## Relationship To The System Charter, AI Production Contract, And Learning Block Register

- The System Charter requires system-first production and learning purpose before interaction choice.
- The AI Production Contract requires AI to select from approved options instead of inventing layouts.
- The Learning Block Register defines instructional blocks.
- This Screen Template Register defines how approved blocks are arranged into complete reusable screen patterns.
- This document does not implement code.

## Core Rule

No course screen should start from a blank prompt.

Every screen must use an approved screen template.

Every template must define its learning purpose, required blocks, optional blocks, learner action, accessibility requirements, mobile behavior, and completion rule.

## Screen Template Selection Guide

| Learning situation | Recommended screen template | Primary block types | Learner action | HRBA/CSO example | Avoid when |
|---|---|---|---|---|---|
| Starting a course or module | Orientation / Welcome Screen | Statement / Key Message Block, Continue / Completion Transition Block | Understand purpose and begin | Start an HRBA module with purpose and expectations | Learners already know the context |
| Introducing a core concept | Concept Introduction Screen | Concept Explanation Block | Read and connect the concept to practice | Introduce rights-holder language | The goal is practice or assessment |
| Explaining a framework or principle set | Framework Explanation Screen | Hotspot / Labeled Graphic Block, Accordion / Tabs Block | Explore parts of a framework | Explore five HRBA working principles | The framework is too dense or decorative |
| Presenting a realistic situation | Case Story Screen | Case Story Block | Follow a story and identify learning points | Community participation story | The story is not needed for the learning goal |
| Distinguishing two or more ideas | Comparison Screen | Comparison Block | Compare concepts or choices | Rights-holder vs duty-bearer | Only one idea needs explanation |
| Practicing judgment | Decision Scenario Screen | Scenario Decision Block | Choose and review feedback | Participation dilemma | The answer is factual recall only |
| Finding risks or missing safeguards | Risk-Spotting Screen | Risk-Spotting Block | Identify and review risks | Exclusion risk in project design | Risks are ambiguous or unsupported |
| Practicing improvement or tool use | Tool Practice / Repair Lab Screen | Repair Lab / Tool Practice Block | Improve or classify work | Root-cause tree practice | Criteria are not yet taught |
| Capturing personal or organizational reflection | Reflection / Portfolio Capture Screen | Reflection / Portfolio Capture Block | Write, choose, or save a reflection | CSO accountability commitment | A scored answer is required |
| Checking understanding | Knowledge Check Screen | Knowledge Check Block | Answer and review feedback | Check HRBA principle understanding | The goal is open reflection |
| Summarizing a module | Module Synthesis Screen | Module Synthesis Block | Connect takeaways and next action | HRBA module recap | Learners have not completed the module |
| Confirming readiness or completion | Completion Transition Screen | Continue / Completion Transition Block | Confirm readiness or completion | Finish module and return to course map | Used as filler |
| Explaining a process over time | Process / Timeline Screen | Process / Timeline Block | Follow ordered steps | HRBA project cycle | Steps are not sequential |
| Planning practical next actions | Action Planning Screen | Checklist / Action Plan Block | Select or plan next actions | Legal and policy analysis checklist | The task is exploratory only |

## Approved Screen Templates

### Orientation / Welcome Screen

- Purpose: Orient learners to a course, module, or major section.
- When to use: Use at the start of a learning unit to set purpose, expectations, and next action.
- When not to use: Do not use as a decorative splash screen with no learning value.
- Required learning blocks: Statement / Key Message Block; Continue / Completion Transition Block.
- Optional learning blocks: Concept Explanation Block; Case Story Block.
- Typical content slots: title, learning purpose, short welcome, what learners will do, start CTA.
- Learner action: Read the orientation and begin.
- Accessibility requirements: Clear heading hierarchy, plain-language instructions, accessible CTA.
- Mobile behavior: Keep intro short so the start action remains easy to reach.
- Completion rule: Complete when the learner chooses to start or continue.
- QA checks: Purpose is clear, expectations are honest, and no essential information is hidden.
- HRBA example: Welcome learners to the HRBA foundations module.

### Concept Introduction Screen

- Purpose: Introduce one core idea clearly before learners practice it.
- When to use: Use when a concept is necessary for later judgment or application.
- When not to use: Do not use for multi-step frameworks or long content dumps.
- Required learning blocks: Concept Explanation Block.
- Optional learning blocks: Statement / Key Message Block; Knowledge Check Block.
- Typical content slots: concept title, plain-language explanation, example, key takeaway.
- Learner action: Read and connect the concept to a practical example.
- Accessibility requirements: Semantic headings, readable contrast, meaningful alt text for visuals.
- Mobile behavior: Stack explanation, example, and takeaway cleanly.
- Completion rule: Complete after required concept content is viewed.
- QA checks: Concept is accurate, concise, and not overloaded.
- HRBA example: Introduce the meaning of rights-holder.

### Framework Explanation Screen

- Purpose: Explain a set of related principles, parts, or dimensions.
- When to use: Use when learners need to explore a framework before applying it.
- When not to use: Do not use if the framework is not meaningful or has too many parts for one screen.
- Required learning blocks: Hotspot / Labeled Graphic Block or Accordion / Tabs Block.
- Optional learning blocks: Statement / Key Message Block; Concept Explanation Block.
- Typical content slots: framework title, intro, parts, part explanations, summary.
- Learner action: Open or review framework parts.
- Accessibility requirements: Keyboard access, text equivalents for labels, screen reader states.
- Mobile behavior: Convert dense visuals into stacked labels or sections.
- Completion rule: Complete after required framework parts are viewed.
- QA checks: Each part is necessary and the whole framework remains understandable.
- HRBA example: Explore the five HRBA working principles.

### Case Story Screen

- Purpose: Ground learning in a realistic human or organizational situation.
- When to use: Use before analysis, decision-making, or reflection.
- When not to use: Do not use for sensational, overly long, or unrelated stories.
- Required learning blocks: Case Story Block.
- Optional learning blocks: Reflection / Portfolio Capture Block; Scenario Decision Block.
- Typical content slots: story setup, actors, context, turning point, prompt.
- Learner action: Read or listen and identify relevant learning points.
- Accessibility requirements: Plain language, captions/transcripts for media, readable structure.
- Mobile behavior: Break longer stories into short sections.
- Completion rule: Complete after the story and required prompt are viewed.
- QA checks: Story is respectful, realistic, and tied to the learning purpose.
- HRBA example: A CSO realizes a consultation excluded women with disabilities.

### Comparison Screen

- Purpose: Help learners distinguish ideas, actors, approaches, or choices.
- When to use: Use when confusion between two or more ideas would affect practice.
- When not to use: Do not use for unrelated lists or a single concept.
- Required learning blocks: Comparison Block.
- Optional learning blocks: Knowledge Check Block; Statement / Key Message Block.
- Typical content slots: comparison title, criteria, items, summary distinction.
- Learner action: Compare and identify the practical difference.
- Accessibility requirements: Clear labels, no color-only meaning, semantic structure.
- Mobile behavior: Stack comparison items with repeated labels.
- Completion rule: Complete after comparison items are viewed or selected.
- QA checks: Comparison criteria are parallel and useful.
- HRBA example: Compare rights-holder and duty-bearer roles.

### Decision Scenario Screen

- Purpose: Let learners apply judgment in a realistic decision.
- When to use: Use when learners need to choose a response and understand consequences.
- When not to use: Do not use for simple recall or trick questions.
- Required learning blocks: Scenario Decision Block.
- Optional learning blocks: Reflection / Portfolio Capture Block; Knowledge Check Block.
- Typical content slots: scenario, decision prompt, options, feedback, takeaway.
- Learner action: Choose an option and review feedback.
- Accessibility requirements: Keyboard-selectable options, visible focus, clear feedback.
- Mobile behavior: Stack options with large touch targets.
- Completion rule: Complete after a decision is submitted and feedback is reviewed.
- QA checks: Options are plausible, feedback teaches, and no option is misleading.
- HRBA example: Decide how to respond to a participation dilemma.

### Risk-Spotting Screen

- Purpose: Help learners identify risks, missing safeguards, or warning signs.
- When to use: Use for project design, safeguarding, inclusion, accountability, or data/privacy risks.
- When not to use: Do not use when risks are unclear or purely subjective.
- Required learning blocks: Risk-Spotting Block.
- Optional learning blocks: Checklist / Action Plan Block; Reflection / Portfolio Capture Block.
- Typical content slots: case material, target areas, risk choices, feedback summary.
- Learner action: Identify risks and review why they matter.
- Accessibility requirements: Text fallback for visual targets, keyboard access, non-visual instructions.
- Mobile behavior: Use stacked risk choices if visual spotting is too dense.
- Completion rule: Complete after required risks are selected or reviewed.
- QA checks: Risks are evidence-based and tied to safer practice.
- HRBA example: Find exclusion risks in a project design note.

### Tool Practice / Repair Lab Screen

- Purpose: Let learners improve weak work or practice using a tool.
- When to use: Use after criteria or a framework has been introduced.
- When not to use: Do not use before learners know what quality looks like.
- Required learning blocks: Repair Lab / Tool Practice Block.
- Optional learning blocks: Checklist / Action Plan Block; Knowledge Check Block.
- Typical content slots: flawed example, criteria, repair task, model answer, feedback.
- Learner action: Improve, classify, or choose a better version.
- Accessibility requirements: Labeled inputs or choices, keyboard operation, clear feedback.
- Mobile behavior: Avoid complex side-by-side editing; stack task and feedback.
- Completion rule: Complete after the learner submits or reviews the repair.
- QA checks: Criteria are explicit and the model answer is useful.
- HRBA example: Repair a weak root-cause analysis or project objective.

### Reflection / Portfolio Capture Screen

- Purpose: Capture personal, team, or organizational reflection.
- When to use: Use when learners should connect learning to their own CSO context.
- When not to use: Do not use when a scored factual answer is needed.
- Required learning blocks: Reflection / Portfolio Capture Block.
- Optional learning blocks: Statement / Key Message Block; Checklist / Action Plan Block.
- Typical content slots: prompt, context, optional examples, input, save/continue action.
- Learner action: Write, select, or save a reflection.
- Accessibility requirements: Input labels, clear instructions, save state, keyboard support.
- Mobile behavior: Keep entry fields usable and avoid blocking navigation.
- Completion rule: Complete after a required response, allowed skip, or review action.
- QA checks: Prompt is practical, respectful, and not unsafe.
- HRBA example: Capture a personal CSO accountability commitment.

### Knowledge Check Screen

- Purpose: Check understanding and reinforce learning with feedback.
- When to use: Use after explanation, comparison, or practice.
- When not to use: Do not use as the only activity for complex judgment or reflection.
- Required learning blocks: Knowledge Check Block.
- Optional learning blocks: Concept Explanation Block; Statement / Key Message Block.
- Typical content slots: question, options, feedback, retry or continue rule.
- Learner action: Answer and review feedback.
- Accessibility requirements: Semantic controls, keyboard operation, announced feedback.
- Mobile behavior: Options stack with readable labels and sufficient touch area.
- Completion rule: Complete after answer submission and feedback review.
- QA checks: Question maps to taught content and feedback explains why.
- HRBA example: Check which actor has responsibility in a local service example.

### Module Synthesis Screen

- Purpose: Summarize learning and connect key ideas before transition.
- When to use: Use near the end of a module or major section.
- When not to use: Do not use before the relevant learning has happened.
- Required learning blocks: Module Synthesis Block.
- Optional learning blocks: Reflection / Portfolio Capture Block; Checklist / Action Plan Block.
- Typical content slots: takeaways, connections, action prompt, next step.
- Learner action: Review, connect, and prepare to continue.
- Accessibility requirements: Clear headings, concise summary text, accessible CTA.
- Mobile behavior: Keep takeaways scannable and avoid dense recap walls.
- Completion rule: Complete after review and required action prompt.
- QA checks: Summary reflects objectives and introduces no unsupported new content.
- HRBA example: Recap participation, accountability, inclusion, and safer practice.

### Completion Transition Screen

- Purpose: Confirm readiness, completion, or transition to another learning area.
- When to use: Use when a learner reaches a gate, checkpoint, or module end.
- When not to use: Do not use as filler between ordinary screens.
- Required learning blocks: Continue / Completion Transition Block.
- Optional learning blocks: Module Synthesis Block; Statement / Key Message Block.
- Typical content slots: completion message, requirements status, next step, CTA.
- Learner action: Confirm readiness or continue.
- Accessibility requirements: Clear CTA labels and transparent disabled requirements.
- Mobile behavior: CTA must remain visible and not be buried under oversized content.
- Completion rule: Complete when requirements are met and the learner continues.
- QA checks: Gate conditions are visible, fair, and not confusing.
- HRBA example: Confirm module completion and return to the course map.

### Process / Timeline Screen

- Purpose: Explain ordered steps, stages, or development over time.
- When to use: Use when sequence and relationship between steps matter.
- When not to use: Do not use for unordered collections.
- Required learning blocks: Process / Timeline Block.
- Optional learning blocks: Knowledge Check Block; Checklist / Action Plan Block.
- Typical content slots: process title, steps, descriptions, current step, summary.
- Learner action: Follow the sequence and understand what comes next.
- Accessibility requirements: Correct reading order, semantic step structure, text fallback for visuals.
- Mobile behavior: Convert horizontal timelines to vertical steps.
- Completion rule: Complete after required steps are viewed.
- QA checks: Steps are accurate, ordered, and not overloaded.
- HRBA example: Explain the HRBA project cycle from analysis to adaptation.

### Action Planning Screen

- Purpose: Help learners turn learning into practical next actions.
- When to use: Use when learners need to plan, select, or confirm actions.
- When not to use: Do not use when the task is exploratory or not actionable.
- Required learning blocks: Checklist / Action Plan Block.
- Optional learning blocks: Reflection / Portfolio Capture Block; Statement / Key Message Block.
- Typical content slots: action prompt, checklist items, optional notes, next-step summary.
- Learner action: Select or plan practical actions.
- Accessibility requirements: Labeled controls, clear selected states, keyboard support.
- Mobile behavior: Stack actions and keep the CTA visible.
- Completion rule: Complete after required selections or review steps.
- QA checks: Actions are realistic, useful, and aligned with the course guidance.
- HRBA example: Create a legal and policy analysis checklist.

## Screen Anatomy Standard

Every CSO Learning Hub screen should define:

- screen ID;
- module ID;
- screen title;
- learning purpose;
- template type;
- primary learning block;
- optional supporting block;
- learner instruction;
- accessibility metadata;
- media/asset reference if any;
- completion rule;
- mobile behavior;
- QA notes.

## Interaction Rhythm Rule

Modules should not repeat the same screen type too often. A good module should normally include a rhythm such as:

- orientation or hook;
- concept explanation;
- example or story;
- comparison or framework;
- scenario or practice;
- reflection or portfolio capture;
- knowledge check;
- synthesis or completion transition.

This rhythm is a guide, not a rigid sequence.

## Minimum Accessibility Requirements For Every Screen

- clear heading hierarchy;
- readable contrast;
- keyboard navigation where interactive;
- visible focus states;
- screen reader labels for interactive elements;
- no color-only or position-only instructions;
- alt text for meaningful images;
- captions/transcripts for media;
- text fallback for visual interactions;
- plain-language instructions;
- CTA visible on mobile;
- no hidden navigation or blocked progress.

## Mobile And Low-Bandwidth Requirements

- screen must stack cleanly on mobile;
- no horizontal scrolling unless explicitly approved;
- no CTA hidden below oversized content;
- no overlapping cards, buttons, or text;
- image-heavy screens require optimized assets;
- video/audio must have text fallback;
- interactions must remain usable on small screens;
- avoid heavy custom interactions unless approved.

## HRBA-Specific Examples Without Making The System Subject-Specific

HRBA is the first pilot, but the templates must remain reusable for future CSO courses.

- Rights-holder vs duty-bearer → Comparison Screen
- Five HRBA working principles → Framework Explanation Screen
- Participation dilemma → Decision Scenario Screen
- Exclusion risk in project design → Risk-Spotting Screen
- Root-cause tree practice → Tool Practice / Repair Lab Screen
- Legal and policy analysis checklist → Action Planning Screen
- Personal CSO accountability commitment → Reflection / Portfolio Capture Screen
- HRBA module recap → Module Synthesis Screen

## Templates Requiring Extra Approval

These require explicit approval before use:

- complex branching scenario screens;
- full assessment/exam screens;
- certificate generation screens;
- custom dashboard screens;
- third-party embedded tool screens;
- heavy video-first screens;
- new screen templates not listed in this register.

## What AI May Do With This Register

AI may:

- recommend a screen template based on learning purpose;
- draft screen content inside approved template slots;
- suggest a primary and optional learning block;
- draft learner instructions and feedback;
- propose accessibility metadata;
- propose HRBA examples and scenarios;
- propose a new template only as a recommendation, not as implementation.

AI must not:

- invent unapproved screen templates;
- implement screen template code before approval;
- create local CSS for a screen;
- copy old screen layout logic directly;
- bypass accessibility requirements;
- repeat the same screen pattern without a learning rhythm reason;
- change routing, progress, locking, assessment, or certificate logic.

## QA Checklist For Screen Template Selection

- Yes/No: Is the learning purpose clear?
- Yes/No: Is this the simplest effective screen template?
- Yes/No: Does the screen use approved learning blocks?
- Yes/No: Is the learner action meaningful?
- Yes/No: Is the instruction clear and plain-language?
- Yes/No: Is accessibility built in?
- Yes/No: Does it work on mobile?
- Yes/No: Does it avoid unnecessary cognitive load?
- Yes/No: Does it fit the module interaction rhythm?
- Yes/No: Is the completion rule clear?
- Yes/No: Is media or visual content necessary and accessible?
- Yes/No: Is this reusable beyond HRBA?

## Relationship To Future Implementation

This register is documentation only. Actual screen template components must not be coded until:

- this register is reviewed;
- QA gates are defined;
- asset migration rules are defined;
- tokens and themes are defined;
- base accessible components are approved.

## Final Commitment

Screen templates must make course production more disciplined, varied, accessible, and reusable. They should prevent blank-prompt screen production while allowing CSO courses to feel practical, human-centered, and locally relevant.
