# 13_GOOGLE_AI_STUDIO_PROMPT_PACK.md
# Google AI Studio Prompt Pack

## Global instruction for every prompt

Use the uploaded specification documents as the binding source of truth. Build only the requested screen/state/slice. Use exact source text. Preserve visible inconsistencies. Do not invent missing content. Do not redesign. Do not modernize. Do not merge states. Do not skip launch wrappers, modals, reveal states, quiz states, feedback states, summary states, completion states, or pending states. If content, asset, modal, quiz question, resource, or platform state is missing, mark it clearly as “Pending source content” or “Pending source asset”.

## Prompt 1 — Load, read, and produce implementation plan only

Do not write code yet. Read the uploaded documents and produce: architecture summary, component structure, state-management structure, slice order, states per slice, missing content to keep pending, asset placeholders, fidelity risks, QA strategy, and first implementation recommendation.

## Prompt 2 — Slice 1: Foundation Shell only

Build global visual tokens, outer platform shell, course player shell, toolbar states, shared modals, feedback modal, pending content pattern, asset placeholder system, and state engine foundation. Do not build full pages/slides yet. Provide evidence pack.

## Prompt 3 — Slice 2: Outer Platform Flow

Implement `OP-DASH-01-base`, `OP-COURSE-01-overview`, `OP-COURSE-02-homepage`, `OP-LAUNCH-INTRO-01-failure`, `OP-INTRO-01-completed`, `OP-MOD1-01-overview`, `OP-LAUNCH-MOD1-01-failure`, `OP-MOD1-02-completed-pending`. Use exact text and pending placeholders. Provide evidence pack.

## Prompt 4 — Slice 3: Introduction Vertical Slice

Implement `OP-LAUNCH-INTRO-01-failure`, `INT-START-base`, `INT-S01-base`, `INT-S01-help`, `INT-S06-complete`, `OP-INTRO-01-completed`. Prove platform-player-platform loop. Provide evidence pack.

## Prompt 5 — Slice 4: Full Introduction Module

Implement all Introduction states from `INT-START-base` through `INT-S06-complete`, including Slide 4 audience modals and Slide 5 reveal/pending states. Provide evidence pack.

## Prompt 6 — Slice 5: Module 1 Slides 1–5

Implement Module 1 start, Slides 1–5, Help overlay, Slide 3 pending link modals, Slide 4 cards and modals, Slide 5 speech-bubble modals. Do not invent missing modals. Provide evidence pack.

## Prompt 7 — Slice 6: Module 1 Slides 6–10

Implement CRC overview, treaty timeline, SDG modal, EU obligations question and feedback, EU Strategy, GMIs, CRC_GMIs resource view. Do not invent treaty nodes, thematic areas, external resources, or table details. Provide evidence pack.

## Prompt 8 — Slice 7: Module 1 Analysis and CCA

Implement Slide 11 pending, Slide 12 sticky notes and pending details, Slide 13 CCA process and pending resource/substep states. Provide evidence pack.

## Prompt 9 — Slice 8: Module 1 Case Study

Implement Slides 14–18, case description modal reuse, case question selected states, solution state, correct feedback, pending Slides 16–17, case summary, National Action Plan pending state. Provide evidence pack.

## Prompt 10 — Slice 9: Module 1 Quiz and Completion

Implement Slides 19–26, Question 1, pending Questions 2–4, 75% result, review pending state, summary tabs, completion, and post-Module-1 pending platform return. Provide evidence pack.

## Prompt 11 — Slice 10: Full QA and Drift Repair

Audit all implemented states against the full package. Repair text, visual, state, navigation, modal, quiz, asset, pending content, and accessibility drift. Do not add features or invent content. Provide full QA summary and final readiness verdict.

## Repair prompts

### Repair text fidelity drift
Compare visible text against `05_COURSE_CONTENT_SOURCE_OF_TRUTH.md`; repair exact mismatches. Preserve 85%, 80%, “Development Cooperation,” “Your answer is.”, “Which one is NOT a guiding principles in the CRC?”, and “Unforced labour laws in Egypt’s cotton industry”.

### Repair missing-content invention
Remove invented content from anything listed in `16_MISSING_CONTENT_REGISTER.md` and replace with **Pending source content**.

### Repair state/navigation drift
Audit against `14_SCREEN_STATE_REGISTRY.md`, `15_FUNCTIONAL_STATE_MACHINE.md`, and `06_NAVIGATION_AND_STATE_FLOW.md`; repair skipped wrappers, merged states, bad modal close, wrong completion/unlock behavior.

### Repair visual/layout drift
Audit against the design system, platform spec, player spec, block library, and asset rules. Restore UNICEF/Agora platform and SCORM-style player fidelity.

### Repair asset drift
Replace random/invented assets with exact assets, screenshot crops, or labeled placeholders.

## Evidence pack request

If AI Studio says “done” vaguely, ask it to provide: slice name, state IDs implemented, components changed, data/state structures, source docs and sections, interactions, pending states, asset placeholders, accessibility checks, QA result, deviations, repairs, risks, and next slice.
