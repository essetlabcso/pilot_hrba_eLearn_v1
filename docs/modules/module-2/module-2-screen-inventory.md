# Module 2 Screen Inventory  
## Foundations of HRBA: Rights, Actors, Principles, and Power

### Subtitle / practical focus

Rights in Everyday CSO Work

## Purpose

This inventory defines the clean Module 2 screen sequence for implementation using the approved CSO Learning Hub HRBA design system.

The current source of truth for design and implementation is:

- docs/design-system/01_FOUNDATION_TOKENS.md
- docs/design-system/02_COURSE_PLAYER_SYSTEM.md
- docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
- docs/design-system/04_SCREEN_TEMPLATE_LIBRARY.md
- docs/design-system/05_INTERACTION_LOGIC_PATTERNS.md
- docs/design-system/06_ACCESSIBILITY_AND_SAFETY_RULES.md
- docs/design-system/07_VISUAL_ASSET_RULES.md
- docs/design-system/08_AGENT_IMPLEMENTATION_RULES.md
- docs/design-system/09_QA_AND_EVIDENCE_PACK_STANDARD.md

Older Module 2 packages may be used as content/storyboard input only. They must not override the new design system.

---

## Clean Module 2 opening sequence

| Screen ID | Screen title | Screen type | Template | Status | Design file | Notes |
|---|---|---|---|---|---|---|
| M2-S01 | Foundations of HRBA: Rights, Actors, Principles, and Power | Module cover | screen-hero-cover | Planned | To create | Cover subtitle / practical focus: Rights in Everyday CSO Work |
| M2-S02 | What you will be able to do | Learning objectives / module orientation | screen-learning-journey | Design package created | docs/modules/module-2/screens/M2-S02_DESIGN.md | Appears immediately after cover screen |
| M2-S03 | When a Service Problem Is Also a Rights Issue | Opening scenario | screen-scenario-hook or screen-scenario-decision | Planned | To create | Previously referred to as M2-S02; renumbered to M2-S03 after inserting learning objectives screen |

---

## Module naming rule

Use the formal module title and subtitle consistently:

```text
Module 2 title:
Foundations of HRBA: Rights, Actors, Principles, and Power

Module 2 subtitle / practical focus:
Rights in Everyday CSO Work
```

Do not use “Human Rights in Everyday CSO Work” as the formal Module 2 title.

---

## Renumbering note

The opening scenario previously planned as:

```text
M2-S02 — Opening Scenario: When a Service Problem Is Also a Rights Issue
```

is now renumbered as:

```text
M2-S03 — Opening Scenario: When a Service Problem Is Also a Rights Issue
```

because the Learning Objectives screen is now the standard second screen after the module cover.

This same pattern should be applied to all modules:

```text
Module cover → Learning objectives → Opening scenario / first practice hook
```

---

## Implementation rule

Do not implement any Module 2 screen unless it has a screen-specific design file in:

```text
docs/modules/module-2/screens/
```

Each screen design file must define:

* screen identity;
* approved template;
* approved block types;
* exact learner-facing content;
* interaction logic;
* completion rule;
* asset requirements;
* accessibility requirements;
* HRBA safety requirements;
* acceptance criteria.
