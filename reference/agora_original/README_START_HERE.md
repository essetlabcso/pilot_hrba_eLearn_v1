# UNICEF / Agora-Style E-Learning Platform Recreation
## Clean Google AI Studio Implementation Package

This package consolidates the specification set for implementing a high-fidelity UNICEF/Agora-style e-learning platform and internal SCORM-style course player in Google AI Studio.

The product must recreate the reviewed learner-facing platform and course experience using a deterministic, screen/state-based approach. It is not a generic LMS, not a redesigned course portal, and not a content-generation task.

## Core rule

Build only what is specified. Use exact source text. Preserve visible inconsistencies. Do not invent missing content. Do not redesign. Do not modernize. Do not merge states. Do not skip launch wrappers, modals, reveal states, quiz states, feedback states, summary states, completion states, or pending states. Mark all missing content as `Pending source content`.

## Package contents

### Foundation and product definition
1. `00_MASTER_SPECIFICATION_PACKAGE_MAP.md`
2. `00_MASTER_PRODUCT_BRIEF.md`
3. `01_VISUAL_DESIGN_SYSTEM.md`

### Platform and player specifications
4. `02_OUTER_AGORA_PLATFORM_SPEC.md`
5. `03_INTERNAL_COURSE_PLAYER_SPEC.md`
6. `04_INTERACTION_BLOCK_LIBRARY.md`

### Content, state, and behavior control
7. `05_COURSE_CONTENT_SOURCE_OF_TRUTH.md`
8. `14_SCREEN_STATE_REGISTRY.md`
9. `15_FUNCTIONAL_STATE_MACHINE.md`
10. `06_NAVIGATION_AND_STATE_FLOW.md`
11. `16_MISSING_CONTENT_REGISTER.md`

### Assets, implementation model, QA, and anti-drift control
12. `11_ASSET_INVENTORY_AND_SUBSTITUTION_RULES.md`
13. `07_COMPONENT_AND_DATA_MODEL.md`
14. `08_ACCESSIBILITY_AND_USABILITY_SPEC.md`
15. `09_NEGATIVE_PROMPTING_AND_ANTI_DRIFT_RULES.md`
16. `12_QA_ACCEPTANCE_CHECKLIST.md`
17. `10_SCREEN_IMPLEMENTATION_WORKBOOK.md`
18. `13_GOOGLE_AI_STUDIO_PROMPT_PACK.md`
19. `99_PACKAGE_QA_READINESS_CHECKLIST.md`

## Recommended Google AI Studio upload order

Upload the full package if possible. If upload limits require batching, use this order:

### Batch 1 — Control and visual foundation
- `00_MASTER_PRODUCT_BRIEF.md`
- `01_VISUAL_DESIGN_SYSTEM.md`
- `02_OUTER_AGORA_PLATFORM_SPEC.md`
- `03_INTERNAL_COURSE_PLAYER_SPEC.md`
- `04_INTERACTION_BLOCK_LIBRARY.md`
- `09_NEGATIVE_PROMPTING_AND_ANTI_DRIFT_RULES.md`

### Batch 2 — Content, states, and behavior
- `05_COURSE_CONTENT_SOURCE_OF_TRUTH.md`
- `14_SCREEN_STATE_REGISTRY.md`
- `15_FUNCTIONAL_STATE_MACHINE.md`
- `06_NAVIGATION_AND_STATE_FLOW.md`
- `16_MISSING_CONTENT_REGISTER.md`

### Batch 3 — Assets, implementation model, QA, and prompts
- `11_ASSET_INVENTORY_AND_SUBSTITUTION_RULES.md`
- `07_COMPONENT_AND_DATA_MODEL.md`
- `08_ACCESSIBILITY_AND_USABILITY_SPEC.md`
- `12_QA_ACCEPTANCE_CHECKLIST.md`
- `10_SCREEN_IMPLEMENTATION_WORKBOOK.md`
- `13_GOOGLE_AI_STUDIO_PROMPT_PACK.md`
- `99_PACKAGE_QA_READINESS_CHECKLIST.md`

## First action in Google AI Studio

Use Prompt 1 from `13_GOOGLE_AI_STUDIO_PROMPT_PACK.md`. Do not allow coding during the first AI Studio response. The first AI Studio response must only produce an implementation plan, architecture summary, missing-content confirmation, asset-placeholder confirmation, and slice order.

## Implementation sequence

1. Slice 1 — Foundation Shell
2. Slice 2 — Outer Platform Flow
3. Slice 3 — Introduction Vertical Slice
4. Slice 4 — Full Introduction Module
5. Slice 5 — Module 1 Slides 1–5
6. Slice 6 — Module 1 Slides 6–10
7. Slice 7 — Module 1 Analysis and CCA Section
8. Slice 8 — Module 1 Case Study Section
9. Slice 9 — Module 1 Quiz and Completion
10. Slice 10 — Full QA and Drift Repair
