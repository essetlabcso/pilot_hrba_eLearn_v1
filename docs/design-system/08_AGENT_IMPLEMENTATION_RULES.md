# CSO Learning Hub HRBA Course Design System

## 08 — Agent Implementation Rules

## 1. Purpose

This document defines the implementation rules for AI coding agents working on the CSO Learning Hub HRBA e-learning course.

It applies to Codex, Antigravity, Claude Code, or any other AI-assisted coding agent used to implement learner-facing course screens, reusable components, design-system files, module content, interactions, visual assets, assessments, and QA fixes.

The purpose is to prevent:

* design drift;
* inconsistent layouts;
* unapproved visual styles;
* improvised interactions;
* unsafe HRBA reflection prompts;
* accessibility regressions;
* uncontrolled one-off components;
* repeated rework;
* token waste;
* coding before specifications are ready.

Coding agents must implement the approved system. They must not redesign the course from scratch.

---

## 2. Required source-of-truth files

Before implementing any learner-facing HRBA course work, agents must read and follow these files:

```text
docs/design-system/01_FOUNDATION_TOKENS.md
docs/design-system/02_COURSE_PLAYER_SYSTEM.md
docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
docs/design-system/04_SCREEN_TEMPLATE_LIBRARY.md
docs/design-system/05_INTERACTION_LOGIC_PATTERNS.md
docs/design-system/06_ACCESSIBILITY_AND_SAFETY_RULES.md
docs/design-system/07_VISUAL_ASSET_RULES.md
docs/design-system/08_AGENT_IMPLEMENTATION_RULES.md
```

When available, agents must also follow:

```text
docs/design-system/09_QA_AND_EVIDENCE_PACK_STANDARD.md
docs/assets/hrba-course-asset-register.md
docs/modules/module-[number]-screen-inventory.md
docs/modules/module-[number]-template-mapping.md
docs/modules/module-[number]-screen-specs.md
docs/modules/module-[number]-qa-checklist.md
AGENTS.md
```

If these files conflict, apply this priority order:

| Priority | Source                                          |
| -------: | ----------------------------------------------- |
|        1 | Specific user instruction for the current task  |
|        2 | Current module screen specification             |
|        3 | QA or bug-fix instruction for the current batch |
|        4 | Agent implementation rules                      |
|        5 | Accessibility and safety rules                  |
|        6 | Interaction logic patterns                      |
|        7 | Screen template library                         |
|        8 | Block template library                          |
|        9 | Course player system                            |
|       10 | Foundation tokens                               |
|       11 | Existing code conventions                       |

If a conflict is unclear, stop and report the conflict instead of guessing.

---

## 3. Core implementation principle

The agent’s role is to **assemble and implement approved learning experiences**, not to invent new designs.

Agents must:

```text
Use approved tokens.
Use approved course-player structure.
Use approved screen templates.
Use approved block templates.
Use approved interaction logic.
Use assigned visual assets.
Use exact learner-facing content from screen specs.
Use accessibility and safety rules.
Return evidence after implementation.
```

Agents must not:

```text
Invent layouts.
Invent colors.
Invent content.
Invent interaction rules.
Invent completion rules.
Invent visual assets.
Invent final assessment scoring.
Invent safety or legal advice.
```

---

## 4. Plan-first rule

Before modifying files, the agent must provide a short implementation plan.

The plan must include:

1. files it expects to modify;
2. components it will create or update;
3. screen IDs or templates affected;
4. design-system rules it will follow;
5. tests or checks it will run;
6. risks or missing specifications.

The agent should not start coding until the plan matches the assigned task.

### Required plan format

```md
## Implementation Plan

### Scope
[What will be implemented.]

### Files expected to change
- [file path]
- [file path]

### Design-system references
- 01_FOUNDATION_TOKENS.md
- 02_COURSE_PLAYER_SYSTEM.md
- ...

### Implementation steps
1. ...
2. ...
3. ...

### Verification steps
1. ...
2. ...

### Risks / missing information
- ...
```

---

## 5. Scope-control rule

Agents must implement only the assigned task.

If the task says:

```text
Implement Module 2 screens M2-S01 to M2-S05.
```

The agent must not:

* redesign Module 1;
* modify unrelated modules;
* rewrite global navigation unless required;
* change public landing page;
* refactor unrelated components;
* change tokens unless instructed;
* add new libraries unless approved.

### Allowed scope changes

The agent may make small supporting changes only when necessary, such as:

* adding a reusable component required by the assigned screen;
* updating an import;
* fixing a local type error caused by the implementation;
* adding test data for the assigned screen;
* adding alt text required by the assigned asset.

All supporting changes must be reported in the evidence pack.

---

## 6. Documentation-only task rule

When the task is documentation-only, the agent must not change source code.

Documentation-only tasks include:

* creating design-system markdown files;
* updating screen inventories;
* updating asset registers;
* creating QA checklists;
* writing implementation prompts;
* documenting template rules.

For documentation-only tasks, the agent must return:

1. file path created or changed;
2. confirmation that no source code was changed;
3. any formatting issues noticed;
4. short summary of the rule or decision documented.

---

## 7. Design token rule

Agents must use approved tokens from:

```text
docs/design-system/01_FOUNDATION_TOKENS.md
```

Agents must not introduce arbitrary values for:

* colors;
* fonts;
* spacing;
* radius;
* shadows;
* button styles;
* card styles;
* breakpoints;
* motion durations;
* focus styles.

### Allowed token behavior

If a needed token is missing, the agent must:

1. report the missing token;
2. propose a token name and value;
3. explain where it is needed;
4. wait for approval before adding it, unless the user explicitly asked the agent to extend tokens.

---

## 8. Course player rule

Agents must preserve the course player system from:

```text
docs/design-system/02_COURSE_PLAYER_SYSTEM.md
```

Agents must not redesign:

* top app bar;
* left sidebar;
* bottom navigation;
* course progress;
* screen wrapper;
* mobile course menu;
* resource drawer;
* completion states.

Any course-player change must be explicitly requested.

---

## 9. Block template rule

Agents must use approved block templates from:

```text
docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
```

Agents must not create one-off alternatives for common block patterns such as:

* accordions;
* tabs;
* flashcards;
* hotspots;
* sorting activities;
* scenario decisions;
* knowledge checks;
* reflections;
* portfolio builders;
* completion blocks.

If a new block type is truly needed, the agent must report:

```md
## Missing Block Pattern

### Needed block
[Name]

### Why existing blocks are insufficient
[Explanation]

### Proposed behavior
[Behavior]

### Accessibility requirements
[Requirements]

### Completion rule
[Rule]

### Recommendation
[Add to block library / adapt existing block]
```

---

## 10. Screen template rule

Agents must use approved screen templates from:

```text
docs/design-system/04_SCREEN_TEMPLATE_LIBRARY.md
```

Agents must not invent a new screen layout because a screen “looks better” another way.

Each implemented screen must map to a `templateId`.

Example:

```ts
{
  screenId: "M2-S20",
  templateId: "screen-hotspot-exploration",
  completionRule: "all-hotspots-viewed"
}
```

If a screen spec lacks a template ID, stop and request clarification.

---

## 11. Interaction logic rule

Agents must implement interaction behavior from:

```text
docs/design-system/05_INTERACTION_LOGIC_PATTERNS.md
```

Agents must not improvise:

* completion gates;
* feedback behavior;
* retry behavior;
* save behavior;
* disabled Continue behavior;
* final assessment scoring;
* progress tracking;
* mobile alternatives.

### Required interaction lifecycle

```text
Instruction
→ Learner action
→ System response
→ Feedback / reveal / state update
→ Completion state
→ Continue enabled
```

Agents must not mark required practice, scenario, or assessment screens complete before learners view feedback.

---

## 12. Accessibility rule

Agents must follow:

```text
docs/design-system/06_ACCESSIBILITY_AND_SAFETY_RULES.md
```

Every learner-facing implementation must support:

* keyboard access;
* visible focus state;
* semantic HTML;
* screen-reader labels and states;
* no color-only meaning;
* mobile-friendly controls;
* alt text or decorative image handling;
* reduced-motion behavior where motion exists;
* accessible alternatives for hotspots and drag/drop.

### Required accessibility behavior

| Interaction     | Required behavior                                               |
| --------------- | --------------------------------------------------------------- |
| Accordion       | Keyboard toggle and expanded/collapsed state                    |
| Tabs            | Selected state and keyboard operation                           |
| Flashcard       | Keyboard reveal and reduced-motion support                      |
| Hotspot         | Keyboard hotspot list and long description                      |
| Sorting         | Tap/keyboard alternative to drag/drop                           |
| Knowledge check | Accessible question, choices, selected state, feedback          |
| Reflection      | Labeled input, safety note, save status                         |
| Portfolio       | Labeled fields, helper text, required state, safe save behavior |

---

## 13. HRBA safety rule

Agents must preserve HRBA safety rules from:

```text
docs/design-system/06_ACCESSIBILITY_AND_SAFETY_RULES.md
```

Agents must not create prompts, fields, examples, or assessment items that ask learners for:

* real complaint details;
* names of people;
* names of organizations involved in sensitive issues;
* active disputes;
* safeguarding incidents;
* confidential project data;
* politically sensitive examples;
* identifiable community stories.

### Required safety note for learner input

Use this standard note where learners reflect or write:

```text
Use a fictional, general, or anonymized example. Do not include names, complaint details, active disputes, or sensitive information.
```

For civic-space, power, advocacy, government actor, or accountability topics, use:

```text
Keep your response general and safe. Do not name people, organizations, officials, locations, active disputes, or sensitive incidents.
```

---

## 14. Visual asset rule

Agents must follow:

```text
docs/design-system/07_VISUAL_ASSET_RULES.md
```

Agents must:

* use approved asset paths;
* preserve file names;
* preserve aspect ratios;
* provide alt text;
* provide long descriptions for complex visuals;
* provide hotspot text alternatives;
* avoid unsafe/identifiable imagery;
* update asset register when applicable.

Agents must not:

* insert random placeholder images;
* use external image URLs without approval;
* silently replace approved assets;
* stretch or distort images;
* crop important learning cues;
* use images with readable text/logos unless approved;
* add decorative images only to fill space.

---

## 15. Content fidelity rule

Agents must use exact learner-facing content from approved screen specs.

Agents must not rewrite HRBA content unless the task explicitly asks for content editing.

If content appears too long for the screen, the agent must not randomly shorten it. Instead, report:

```md
## Content Fit Issue

### Screen
[Screen ID]

### Issue
[Text does not fit approved no-scroll layout.]

### Recommended solution
- Split into two screens, or
- Convert to accordion/tabs, or
- Move secondary detail to resource drawer, or
- Request approved shortened copy.
```

---

## 16. No-scroll desktop rule

Default screen fit status:

```text
fit-required
```

Agents must not implement scroll-heavy screens unless the screen spec explicitly states:

```text
scrollPermitted: true
```

If a screen does not fit, agents must report it instead of forcing it into scroll.

Acceptable solutions:

* split screen;
* shorten content with approval;
* convert content to reveal interaction;
* reduce visual size;
* move secondary details to drawer/resource;
* change to an approved template that fits the learning purpose.

---

## 17. Mobile implementation rule

Every implemented learner-facing screen must work on mobile.

Agents must provide mobile alternatives for:

| Desktop pattern    | Mobile alternative            |
| ------------------ | ----------------------------- |
| Sidebar            | Course menu drawer            |
| Two-column layout  | Stacked layout                |
| Horizontal process | Vertical process              |
| Hotspot image      | Hotspot list                  |
| Drag/drop sorting  | Tap-select category           |
| Large tabs         | Stacked or segmented controls |
| Card grid          | Stacked cards                 |
| Hover reveal       | Tap reveal                    |

Agents must not rely on hover-only behavior.

---

## 18. State and persistence rule

Agents must preserve learner state where required.

State may include:

* current screen;
* completed screens;
* viewed panels;
* viewed tabs;
* flipped cards;
* viewed hotspots;
* selected scenario choices;
* submitted answers;
* feedback viewed;
* reflection saved/skipped;
* portfolio fields saved.

Agents must not reset learner work unless:

* the learner clicks Try again;
* the learner confirms Reset;
* the screen spec requires reset;
* the task explicitly asks for reset behavior.

---

## 19. Assessment rule

Agents must not improvise final assessment logic.

Final assessment rules must come from:

* final assessment specification;
* screen specs;
* course certificate rules;
* user instruction.

Agents must not independently decide:

* pass score;
* retake rules;
* question weighting;
* feedback visibility;
* certificate eligibility;
* scoring formula.

For the HRBA course, if no later specification overrides it, the standard certificate rule is:

```text
Certificate available after passing the final test with 80% or above.
```

---

## 20. File and component naming rules

Use deterministic, readable names.

### Component names

Use PascalCase.

Examples:

```text
CourseShell.tsx
ScenarioDecision.tsx
HotspotGraphic.tsx
KnowledgeCheck.tsx
ReflectionJournal.tsx
PortfolioBuilder.tsx
CompletionBlock.tsx
```

### Data/config names

Use camelCase.

Examples:

```text
moduleTwoScreens
completionRule
viewedHotspotIds
selectedOptionIds
```

### Asset names

Use lowercase snake_case.

Examples:

```text
m2_s20_power_lens_hotspot_scene_v1.png
m1_s04_learning_journey_pathway_v1.png
```

---

## 21. Dependency rule

Agents must not add new packages or dependencies unless necessary and approved.

Before adding a dependency, the agent must report:

```md
## Proposed Dependency

### Package
[Name]

### Why it is needed
[Reason]

### Existing alternative considered
[Alternative]

### Risks
[Bundle size, maintenance, accessibility, security]

### Recommendation
[Add / do not add]
```

Prefer simple, maintainable implementation using existing project stack.

---

## 22. Refactoring rule

Agents must not perform broad refactors during screen implementation unless explicitly instructed.

Allowed:

* local refactor required for assigned component;
* extraction of reusable block used by assigned screens;
* minor cleanup directly related to the implementation.

Not allowed:

* reworking unrelated architecture;
* changing routing globally;
* changing authentication;
* changing public pages;
* renaming many files without need;
* formatting unrelated files.

---

## 23. Error handling rule

Learner-facing errors must be clear and safe.

Use:

```text
Something went wrong. Please try again or contact support if the problem continues.
```

For save failure:

```text
Could not save your response. Please try again.
```

Do not show raw technical errors to learners.

Do not delete learner input after save failure.

---

## 24. Evidence pack rule

After every implementation batch, the agent must return an evidence pack.

Required evidence:

| Evidence item                            | Required             |
| ---------------------------------------- | -------------------- |
| Summary of work completed                | Yes                  |
| Changed files                            | Yes                  |
| Screens/components implemented           | Yes                  |
| Design-system files followed             | Yes                  |
| Screenshots or visual verification notes | Yes, where available |
| Desktop layout check                     | Yes                  |
| Mobile layout check                      | Yes                  |
| Accessibility notes                      | Yes                  |
| HRBA safety notes                        | Where relevant       |
| Tests/checks run                         | Yes                  |
| Known issues                             | Yes                  |
| Acceptance criteria checklist            | Yes                  |

Evidence pack format:

```md
## Evidence Pack

### Summary
[What was implemented.]

### Changed files
- [file path]
- [file path]

### Screens/components affected
- [Screen/component]

### Design-system references followed
- 01_FOUNDATION_TOKENS.md
- ...

### Verification performed
- [Check]

### Accessibility notes
- [Notes]

### HRBA safety notes
- [Notes]

### Known issues
- [Issue or “None known”]

### Acceptance criteria
- [x] ...
- [x] ...
```

---

## 25. Stop-and-report conditions

Agents must stop and report before coding if:

| Condition                                 | Required action            |
| ----------------------------------------- | -------------------------- |
| Screen has no template ID                 | Request template mapping   |
| Screen has no completion rule             | Request completion rule    |
| Required asset is missing                 | Report missing asset       |
| Content does not fit no-scroll layout     | Report content fit issue   |
| Interaction is unclear                    | Request interaction logic  |
| Safety risk appears                       | Report HRBA safety concern |
| Accessibility alternative is missing      | Report accessibility gap   |
| Task requires new dependency              | Request approval           |
| Task conflicts with design system         | Report conflict            |
| Final assessment scoring is unspecified   | Request assessment rule    |
| User asks to modify broad unrelated areas | Clarify scope              |

Agents should not “do their best” when core specifications are missing.

---

## 26. Standard implementation prompt structure

When asking a coding agent to implement a batch, use this structure.

```text
Plan first.

Use the approved CSO Learning Hub HRBA design system.

Read and follow:
- docs/design-system/01_FOUNDATION_TOKENS.md
- docs/design-system/02_COURSE_PLAYER_SYSTEM.md
- docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
- docs/design-system/04_SCREEN_TEMPLATE_LIBRARY.md
- docs/design-system/05_INTERACTION_LOGIC_PATTERNS.md
- docs/design-system/06_ACCESSIBILITY_AND_SAFETY_RULES.md
- docs/design-system/07_VISUAL_ASSET_RULES.md
- docs/design-system/08_AGENT_IMPLEMENTATION_RULES.md

Task:
[Specific task]

Scope:
[Exact files/screens/components]

Do not:
- invent layouts, colors, typography, content, or interaction patterns;
- modify unrelated modules or source files;
- make scroll-heavy screens unless explicitly permitted;
- ask learners for sensitive real-world examples.

Acceptance criteria:
[Specific criteria]

Verification:
[Tests/checks to run]

Evidence pack required:
Return changed files, screenshots/visual notes, accessibility notes, HRBA safety notes, tests run, known issues, and acceptance criteria checklist.
```

---

## 27. Standard documentation-only prompt structure

Use this for creating or updating design-system markdown files.

```text
Create or update the markdown file:

[File path]

Use the provided content exactly.

This is documentation-only. Do not modify source code.

After completing, return:
1. file path created or updated,
2. confirmation that no source code was changed,
3. any markdown formatting issues noticed,
4. short summary of the rule or decision documented.
```

---

## 28. Standard QA/refinement prompt structure

Use this for checking implemented screens.

```text
Review the implemented screens against the approved CSO Learning Hub HRBA design system.

Check:
- foundation tokens;
- course player system;
- screen template;
- block template;
- interaction logic;
- accessibility;
- HRBA safety;
- visual asset rules;
- no-scroll desktop fit;
- mobile behavior;
- completion rules.

For each issue, report:
1. screen/component;
2. issue;
3. violated rule;
4. recommended fix;
5. whether it is critical, high, medium, or low.

Do not redesign beyond the approved system.
```

---

## 29. Acceptance criteria for agent work

Agent work is acceptable only when:

| Criterion                        | Required |
| -------------------------------- | -------- |
| Assigned scope completed         | Yes      |
| No unrelated changes             | Yes      |
| Approved templates used          | Yes      |
| Approved tokens used             | Yes      |
| Completion rules implemented     | Yes      |
| Accessibility behavior preserved | Yes      |
| HRBA safety preserved            | Yes      |
| Mobile behavior works            | Yes      |
| No console/runtime errors        | Yes      |
| Evidence pack returned           | Yes      |
| Known issues disclosed           | Yes      |

If any required criterion fails, the batch is not ready for approval.

---

## 30. Agent anti-patterns

Agents must avoid these behaviors.

| Anti-pattern                                  | Why it is a problem              |
| --------------------------------------------- | -------------------------------- |
| “I improved the design” without specification | Causes drift                     |
| Creating a new layout for one screen          | Breaks template system           |
| Changing colors/fonts casually                | Breaks visual identity           |
| Adding a package without approval             | Creates maintenance risk         |
| Refactoring unrelated code                    | Increases regression risk        |
| Shortening learner content without approval   | May change instructional meaning |
| Creating scroll-heavy screens by default      | Breaks course-player rule        |
| Using drag/drop only                          | Accessibility failure            |
| Adding placeholder images                     | Weakens visual quality           |
| Asking for real sensitive examples            | HRBA safety risk                 |
| Returning no evidence                         | Makes QA impossible              |
| Hiding known issues                           | Reduces trust                    |

---

## 31. Recommended AGENTS.md summary

The repo may also include a short root-level `AGENTS.md` that points to these rules.

Suggested content:

```md
# Agent Rules for CSO Learning Hub HRBA Course

Before modifying HRBA learner-facing course files, read:

- docs/design-system/01_FOUNDATION_TOKENS.md
- docs/design-system/02_COURSE_PLAYER_SYSTEM.md
- docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
- docs/design-system/04_SCREEN_TEMPLATE_LIBRARY.md
- docs/design-system/05_INTERACTION_LOGIC_PATTERNS.md
- docs/design-system/06_ACCESSIBILITY_AND_SAFETY_RULES.md
- docs/design-system/07_VISUAL_ASSET_RULES.md
- docs/design-system/08_AGENT_IMPLEMENTATION_RULES.md

Plan first. Implement only assigned scope. Do not invent layouts, colors, typography, interactions, content, assets, completion rules, or assessment scoring. Preserve accessibility, mobile behavior, and HRBA safety. Return an evidence pack after implementation.
```

---

## 32. Approval status

Status: Draft v1
Applies to: AI coding agents implementing the CSO Learning Hub HRBA course
Depends on:

```text
docs/design-system/01_FOUNDATION_TOKENS.md
docs/design-system/02_COURSE_PLAYER_SYSTEM.md
docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
docs/design-system/04_SCREEN_TEMPLATE_LIBRARY.md
docs/design-system/05_INTERACTION_LOGIC_PATTERNS.md
docs/design-system/06_ACCESSIBILITY_AND_SAFETY_RULES.md
docs/design-system/07_VISUAL_ASSET_RULES.md
```

Next file:

```text
docs/design-system/09_QA_AND_EVIDENCE_PACK_STANDARD.md
```
