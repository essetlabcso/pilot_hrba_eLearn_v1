# 00_MASTER_SPECIFICATION_PACKAGE_MAP.md
# Master Specification Package Map

## Purpose

This package guides Google AI Studio in recreating a UNICEF/Agora-style e-learning platform and course player based on detailed screen descriptions. It defines product scope, design system, platform shell, internal player shell, exact course content, screen/state behavior, missing content handling, asset rules, QA, and deterministic prompts.

## Package groups

### Group A — Product and design foundation
- `00_MASTER_PRODUCT_BRIEF.md`: product purpose, scope, architecture, learner journey, implementation boundaries.
- `01_VISUAL_DESIGN_SYSTEM.md`: colors, typography, layout, buttons, cards, modals, slide styles, anti-modernization rules.

### Group B — Platform and player specifications
- `02_OUTER_AGORA_PLATFORM_SPEC.md`: dashboard, course overview, course homepage, launch wrapper, section pages, table of contents, locked/unlocked states.
- `03_INTERNAL_COURSE_PLAYER_SPEC.md`: SCORM-style shell, header, progress strip, left toolbar, slide counter, help overlay, quiz/completion behavior.
- `04_INTERACTION_BLOCK_LIBRARY.md`: reusable page/slide/modal/quiz/feedback/reveal/completion patterns.

### Group C — Content, screens, states, and behavior
- `05_COURSE_CONTENT_SOURCE_OF_TRUTH.md`: exact visible text, modal text, quiz text, feedback text, button labels, known inconsistencies.
- `14_SCREEN_STATE_REGISTRY.md`: every outer platform state, player slide, modal, reveal, quiz, feedback, summary tab, resource, completion, and pending state.
- `15_FUNCTIONAL_STATE_MACHINE.md`: state variables and transitions controlling learner behavior.
- `06_NAVIGATION_AND_STATE_FLOW.md`: full forward/backward navigation and modal/reveal/quiz flows.
- `16_MISSING_CONTENT_REGISTER.md`: all content that must remain pending.

### Group D — Assets, implementation quality, and QA
- `11_ASSET_INVENTORY_AND_SUBSTITUTION_RULES.md`: exact/proxy/pending asset rules.
- `07_COMPONENT_AND_DATA_MODEL.md`: recommended component/data architecture.
- `08_ACCESSIBILITY_AND_USABILITY_SPEC.md`: keyboard, focus, modals, captions, audio, contrast, radio groups.
- `09_NEGATIVE_PROMPTING_AND_ANTI_DRIFT_RULES.md`: strict do-not rules.
- `12_QA_ACCEPTANCE_CHECKLIST.md`: QA checks for every slice.
- `10_SCREEN_IMPLEMENTATION_WORKBOOK.md`: production tracker.

### Group E — Prompting and production control
- `13_GOOGLE_AI_STUDIO_PROMPT_PACK.md`: ready-to-use prompts for each implementation slice, QA, and repair.
- `99_PACKAGE_QA_READINESS_CHECKLIST.md`: final package readiness checklist before upload.

## Binding implementation principle

Narrative descriptions define what each screen looks like and says. The screen/state registry defines how each screen behaves. The state machine defines how learner actions change the interface. The missing content register prevents invention. The prompt pack enforces slice-by-slice implementation.
