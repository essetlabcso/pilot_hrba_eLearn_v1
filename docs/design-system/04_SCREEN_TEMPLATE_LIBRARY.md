# CSO Learning Hub HRBA Course Design System

## 04 — Screen Template Library

## 1. Purpose

This document defines the approved reusable screen templates for the CSO Learning Hub HRBA e-learning course.

A screen template is a full learner-facing screen pattern inside the course player. It may contain one or more approved blocks from:

```text id="hnsl3s"
docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
```

The purpose of this file is to prevent ad hoc screen design, inconsistent layouts, repeated white-space problems, weak learner actions, and one-off visual patterns.

Coding agents must use these approved screen templates instead of inventing new full-screen layouts unless a new screen template is explicitly approved and added to this library.

This file builds on:

```text id="r9d9ur"
docs/design-system/01_FOUNDATION_TOKENS.md
docs/design-system/02_COURSE_PLAYER_SYSTEM.md
docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
```

---

## 2. Screen template principle

Every screen must be designed as a complete learning moment.

A screen is not just a container for content. Each screen must define:

1. what the learner should understand;
2. what the learner should do;
3. what interaction or reading pattern is used;
4. what feedback or completion state is expected;
5. whether the screen must fit without scrolling;
6. what accessibility behavior is required;
7. what HRBA safety rule applies, if any.

Default rule:

```text id="bhql0e"
fit-required
```

This means the screen must normally fit inside the desktop course canvas without vertical scrolling.

---

## 3. Screen template selection logic

Choose the screen template based on the learning purpose.

| Learning purpose               | Recommended screen template  |
| ------------------------------ | ---------------------------- |
| Start a course/module          | `screen-hero-cover`          |
| Orient learner to the journey  | `screen-learning-journey`    |
| Introduce a real-world problem | `screen-scenario-hook`       |
| Explain one important idea     | `screen-concept-focus`       |
| Compare two ways of thinking   | `screen-before-after-shift`  |
| Reveal layered ideas           | `screen-progressive-reveal`  |
| Explore a visual scene/model   | `screen-hotspot-exploration` |
| Practice classification        | `screen-sorting-practice`    |
| Make a judgment                | `screen-scenario-decision`   |
| Understand a process           | `screen-process-walkthrough` |
| Check understanding            | `screen-knowledge-check`     |
| Reflect safely                 | `screen-reflection-journal`  |
| Build a practical output       | `screen-portfolio-builder`   |
| Summarize learning             | `screen-synthesis-summary`   |
| Complete a module              | `screen-module-completion`   |
| Complete the course            | `screen-course-completion`   |

---

## 4. Required screen metadata

Every screen specification must include the following metadata.

```ts id="vnk29y"
type CourseScreenTemplateSpec = {
  screenId: string;
  screenTitle: string;
  moduleId: string;
  templateId: string;
  learningPurpose:
    | "structure"
    | "explain"
    | "emphasize"
    | "show"
    | "reveal"
    | "practice"
    | "decide"
    | "reflect"
    | "check"
    | "apply"
    | "safeguard"
    | "recognize";
  fitStatus:
    | "fit-required"
    | "scroll-permitted"
    | "split-required"
    | "interaction-required";
  blockTypes: string[];
  learnerAction: string;
  completionRule: string;
  assetRefs?: string[];
  accessibilityNotes: string;
  safetyNotes?: string;
};
```

No screen should be implemented without this metadata.

---

# 5. Approved Screen Templates

---

# 5.1 `screen-hero-cover`

## Purpose

Use at the beginning of a course, module, or major learning section.

This screen creates a premium entry moment, establishes relevance, and prepares learners for what they will practice.

## Best used for

* course start;
* module start;
* final assessment start;
* major section transition.

## Required blocks

| Block         | Required |
| ------------- | -------- |
| Hero Block    | Yes      |
| Image Block   | Usually  |
| Progress Note | Optional |
| Primary CTA   | Yes      |

## Layout

Desktop:

```text id="sn0xpm"
┌──────────────────────────────────────────────────────┐
│ Left: eyebrow, title, subtitle, CTA, progress cue     │
│ Right: cinematic image / module visual                │
└──────────────────────────────────────────────────────┘
```

Mobile:

```text id="e70jse"
Title and subtitle
Image
CTA
Progress cue
```

## Content rules

Use:

* short title;
* one practical promise;
* one primary action;
* optional module progress cue.

Avoid:

* long introductions;
* many buttons;
* generic stock-photo framing;
* dense learning objectives.

## Completion rule

```text id="zjhyp2"
viewed-and-continued
```

## Fit status

```text id="bophqk"
fit-required
```

---

# 5.2 `screen-learning-journey`

## Purpose

Use to show what the learner will do across a course or module.

This screen should make the learning path feel clear, practical, and achievable.

## Best used for

* Module 1 learning journey;
* course orientation;
* module roadmap;
* final assessment path.

## Required blocks

| Block                            | Required    |
| -------------------------------- | ----------- |
| Process Steps or Journey Roadmap | Yes         |
| Icon/Image Blocks                | Recommended |
| Short Instruction                | Yes         |
| Progress Note                    | Optional    |

## Layout

Desktop:

```text id="njjcfc"
Header
Horizontal roadmap or 5-step journey cards
Short note / CTA
```

Mobile:

```text id="e5mg47"
Header
Vertical step list
CTA
```

## Approved variants

| Variant                 | Use                                  |
| ----------------------- | ------------------------------------ |
| `journey-icons`         | Simple learning path with icons      |
| `journey-roadmap`       | Sequential path with visual movement |
| `journey-module-map`    | Module-by-module course overview     |
| `journey-practice-path` | Practice/output-focused journey      |

## Completion rule

```text id="4v5uv8"
viewed-and-continued
```

## Fit status

```text id="qmtszj"
fit-required
```

---

# 5.3 `screen-scenario-hook`

## Purpose

Use to open a concept through a realistic CSO situation before giving definitions.

This is useful for “try first, then learn” instruction.

## Best used for

* Module 1 water point story;
* Module 2 everyday rights situation;
* Module 3 project design dilemma;
* Module 4 implementation challenge;
* Module 5 MEAL/data-use dilemma.

## Required blocks

| Block                               | Required                    |
| ----------------------------------- | --------------------------- |
| Scenario Decision or Scenario Setup | Yes                         |
| Image Block                         | Recommended                 |
| Statement or Callout                | Optional                    |
| Feedback                            | Optional, if decision-based |

## Layout

Desktop:

```text id="latp00"
┌──────────────────────────────────────────────────────┐
│ Left: scenario context / learner role                 │
│ Right: visual scene or decision prompt                │
└──────────────────────────────────────────────────────┘
```

## Approved variants

| Variant                           | Use                                          |
| --------------------------------- | -------------------------------------------- |
| `scenario-hook-read`              | Learner reads a short scenario and continues |
| `scenario-hook-first-choice`      | Learner makes an initial judgment            |
| `scenario-hook-hidden-risk`       | Scenario reveals hidden HRBA questions       |
| `scenario-hook-before-definition` | Learner experiences problem before concept   |

## Completion rule

Use one of:

```text id="nsr7y0"
viewed-and-continued
choice-selected-feedback-viewed
```

## Fit status

```text id="q65uzf"
fit-required
```

---

# 5.4 `screen-concept-focus`

## Purpose

Use to explain one important HRBA concept clearly and practically.

## Best used for

* rights-holder;
* duty-bearer;
* accountability;
* participation;
* non-discrimination;
* empowerment;
* legality;
* HRBA lens.

## Required blocks

| Block           | Required    |
| --------------- | ----------- |
| Concept Block   | Yes         |
| Image/Diagram   | Optional    |
| Statement Block | Optional    |
| Example Card    | Recommended |

## Layout

Approved desktop layouts:

```text id="94y6i0"
Option A: Centered concept card
Option B: Two-column concept + visual
Option C: Diagonal split concept + visual/example
```

## Content rules

Each concept screen must include:

1. plain-language meaning;
2. practical CSO meaning;
3. one example or implication;
4. one clear takeaway.

Avoid long textbook definitions.

## Completion rule

```text id="y8aswa"
viewed-and-continued
```

## Fit status

```text id="3ogb4v"
fit-required
```

---

# 5.5 `screen-before-after-shift`

## Purpose

Use to show a mindset shift.

This template is important for HRBA because many concepts require learners to move from a service-delivery lens to a rights-based lens.

## Best used for

* beneficiary → rights-holder;
* activity count → accountability and change;
* attendance → meaningful participation;
* needs → rights and responsibilities;
* consultation → influence;
* data collection → safe evidence use.

## Required blocks

| Block                      | Required    |
| -------------------------- | ----------- |
| Concept Before/After Block | Yes         |
| Statement Block            | Recommended |
| Example                    | Recommended |

## Layout

Desktop:

```text id="wv5onf"
┌─────────────────────────────┬─────────────────────────────┐
│ Before / common weak view    │ After / stronger HRBA view   │
└─────────────────────────────┴─────────────────────────────┘
Key takeaway below
```

Mobile:

```text id="xxhaap"
Before card
After card
Key takeaway
```

## Completion rule

```text id="trce2f"
viewed-and-continued
```

## Fit status

```text id="gjqe9r"
fit-required
```

---

# 5.6 `screen-progressive-reveal`

## Purpose

Use when learners need to explore layered ideas gradually.

## Best used for

* HRBA principles;
* hidden HRBA questions;
* misconceptions;
* practical guidance;
* standards/practice/caution;
* common mistakes and better practice.

## Required blocks

| Block                                             | Required |
| ------------------------------------------------- | -------- |
| Accordion Reveal, Tabs Compare, or Flashcard Grid | Yes      |
| Short instruction                                 | Yes      |
| Completion state                                  | Yes      |

## Approved variants

| Variant               | Use                               |
| --------------------- | --------------------------------- |
| `reveal-accordion`    | 3–6 related items                 |
| `reveal-tabs`         | Compare categories                |
| `reveal-flashcards`   | Terms, examples, mistakes/fixes   |
| `reveal-layered-case` | Reveal case details progressively |

## Completion rule

Use one of:

```text id="j10ntv"
all-panels-opened
all-tabs-viewed
all-cards-flipped
```

## Fit status

```text id="bgeqbr"
fit-required
```

## Accessibility

Must support keyboard access and communicate expanded/selected/flipped states.

---

# 5.7 `screen-hotspot-exploration`

## Purpose

Use when learners need to inspect a visual scene, map, diagram, or model.

## Best used for

* power lens;
* hidden exclusion;
* accountability loop;
* rights-holder/duty-bearer ecosystem;
* project-cycle map;
* participation barriers.

## Required blocks

| Block                            | Required |
| -------------------------------- | -------- |
| Hotspot Graphic                  | Yes      |
| Instruction                      | Yes      |
| Keyboard-accessible hotspot list | Yes      |
| Long description / alt text      | Yes      |
| Feedback/reveal content          | Yes      |

## Layout

Desktop:

```text id="q6c25l"
Header
Large visual hotspot area
Side or bottom reveal panel
Completion cue
```

Mobile:

```text id="7j7lkz"
Header
Image
Accessible hotspot list
Reveal panel
Completion cue
```

## Completion rule

```text id="2y0e9r"
all-hotspots-viewed
```

## Fit status

```text id="cdb7iz"
fit-required
```

## Safety

Use fictional or generalized scenes. Do not use real sensitive community images.

---

# 5.8 `screen-sorting-practice`

## Purpose

Use when learners classify examples into categories.

## Best used for

* need / right / duty / barrier / accountability gap;
* rights-holder / duty-bearer / supporting actor;
* participation / tokenism / information sharing / co-creation;
* safe / unsafe data practice;
* output / outcome / process indicator.

## Required blocks

| Block               | Required    |
| ------------------- | ----------- |
| Sorting Activity    | Yes         |
| Instruction         | Yes         |
| Submit/check button | Yes         |
| Feedback            | Yes         |
| Retry behavior      | Recommended |

## Layout

Desktop:

```text id="5z4377"
Header
Cards/items area
Category targets
Submit/check feedback panel
```

Mobile:

```text id="z230fo"
Header
Tap-select item
Choose category
Feedback
```

## Completion rule

```text id="ie0x7w"
activity-submitted-feedback-viewed
```

## Fit status

```text id="3v8a8k"
fit-required
```

## Accessibility

Must not rely on drag-and-drop only. Provide tap and keyboard alternative.

---

# 5.9 `screen-scenario-decision`

## Purpose

Use when learners make a judgment in a realistic CSO situation and receive HRBA feedback.

This should be one of the main templates across the HRBA course.

## Best used for

* identifying rights issue;
* choosing inclusive action;
* choosing duty-bearer engagement approach;
* responding to exclusion;
* handling accountability safely;
* deciding what to do first.

## Required blocks

| Block             | Required |
| ----------------- | -------- |
| Scenario Decision | Yes      |
| Feedback panel    | Yes      |
| HRBA explanation  | Yes      |
| Continue behavior | Yes      |

## Layout

Desktop:

```text id="hd6ifd"
┌──────────────────────────────────────────────────────┐
│ Scenario context / learner role                       │
├──────────────────────────────────────────────────────┤
│ Decision prompt                                       │
│ Choice cards                                          │
│ Feedback panel after selection                        │
└──────────────────────────────────────────────────────┘
```

Optional split variant:

```text id="6tse8j"
Left: scenario story
Right: choices and feedback
```

## Approved variants

| Variant                     | Use                              |
| --------------------------- | -------------------------------- |
| `decision-single-best`      | Choose strongest response        |
| `decision-multiple-actions` | Select all appropriate actions   |
| `decision-first-step`       | Choose what to do first          |
| `decision-risk-response`    | Choose safest responsible action |
| `decision-dilemma`          | Weigh trade-offs                 |

## Completion rule

```text id="s45z17"
choice-selected-feedback-viewed
```

## Fit status

```text id="567frz"
fit-required
```

## Feedback rule

Feedback must explain:

1. what the learner noticed or missed;
2. which HRBA principle applies;
3. what a stronger CSO practice would look like.

---

# 5.10 `screen-process-walkthrough`

## Purpose

Use to explain a sequence or cycle.

## Best used for

* HRBA analysis steps;
* participation planning;
* accountability loop;
* safe feedback response;
* project design process;
* MEAL learning loop.

## Required blocks

| Block             | Required |
| ----------------- | -------- |
| Process Steps     | Yes      |
| Short explanation | Yes      |
| Completion cue    | Yes      |

## Layout

Desktop:

```text id="o4up69"
Header
Horizontal or circular process
Step reveal panel
```

Mobile:

```text id="gah9tz"
Header
Vertical step sequence
Step reveal
```

## Approved variants

| Variant                | Use                                   |
| ---------------------- | ------------------------------------- |
| `process-linear`       | Ordered steps                         |
| `process-loop`         | Accountability or learning cycle      |
| `process-click-reveal` | Click each step for detail            |
| `process-compare`      | Weak process vs stronger HRBA process |

## Completion rule

Use one of:

```text id="mxxobl"
viewed-and-continued
all-steps-viewed
```

If interactive, define `all-steps-viewed` in the screen spec.

## Fit status

```text id="bywcag"
fit-required
```

---

# 5.11 `screen-checklist-practice`

## Purpose

Use when learners apply a practical quality or safety check.

## Best used for

* inclusion risk checklist;
* participation quality checklist;
* safe consultation checklist;
* accountability channel checklist;
* HRBA project design review;
* safe MEAL data checklist.

## Required blocks

| Block               | Required       |
| ------------------- | -------------- |
| Checklist Practice  | Yes            |
| Scenario/context    | Optional       |
| Safety Note         | Where relevant |
| Feedback or summary | Recommended    |

## Layout

Desktop:

```text id="k56nh2"
Header
Left: scenario or checklist purpose
Right: checklist items
Bottom: feedback/summary
```

Mobile:

```text id="8n6ros"
Header
Purpose
Checklist
Feedback
```

## Completion rule

Use one of:

```text id="kkfu4s"
viewed-and-continued
activity-submitted-feedback-viewed
```

## Fit status

```text id="jp5me5"
fit-required
```

---

# 5.12 `screen-knowledge-check`

## Purpose

Use to test understanding and practical judgment.

## Best used for

* scenario-based MCQ;
* multiple-response practice;
* matching;
* sequencing;
* misconception correction.

## Required blocks

| Block           | Required |
| --------------- | -------- |
| Knowledge Check | Yes      |
| Feedback        | Yes      |
| Explanation     | Yes      |
| Retry behavior  | Optional |

## Layout

Desktop:

```text id="ejqh0k"
Centered question panel
Answer choices
Check answer button
Feedback panel
Continue
```

Optional scenario variant:

```text id="y7eyy2"
Scenario context
Question
Choices
Feedback
```

## Approved variants

| Variant                | Use                   |
| ---------------------- | --------------------- |
| `kc-single-choice`     | One best answer       |
| `kc-multiple-response` | Select all that apply |
| `kc-match`             | Match concepts/actors |
| `kc-sequence`          | Order steps           |
| `kc-scenario-judgment` | Apply HRBA to a case  |

## Completion rule

```text id="3ua6l6"
answer-submitted-feedback-viewed
```

## Fit status

```text id="n89cam"
fit-required
```

## Quality rule

Knowledge checks must not be too obvious. They should test practical HRBA judgment.

---

# 5.13 `screen-reflection-journal`

## Purpose

Use when learners connect learning to their own practice safely.

## Best used for

* confidence check;
* personal learning plan;
* small action commitment;
* “what would you notice differently?”;
* safe organizational reflection;
* module-end reflection.

## Required blocks

| Block                | Required                          |
| -------------------- | --------------------------------- |
| Reflection Journal   | Yes                               |
| Safety Note          | Required when asking for examples |
| Save/skip behavior   | Yes                               |
| Encouraging feedback | Optional                          |

## Layout

Desktop:

```text id="jcybvo"
Header
Calm reflection panel
Safety note
Text field / scale / commitment input
Save or skip action
```

## Approved variants

| Variant                        | Use                         |
| ------------------------------ | --------------------------- |
| `reflection-short-answer`      | One short response          |
| `reflection-confidence-scale`  | Readiness/confidence rating |
| `reflection-action-commitment` | One safe action             |
| `reflection-before-after`      | Change in thinking          |
| `reflection-private-note`      | Private note                |

## Completion rule

```text id="bka5kl"
reflection-saved-or-skipped
```

## Fit status

```text id="lv6a4a"
fit-required
```

## Safety

Use standard safety note when needed:

```text id="s1apx2"
Use a fictional, general, or anonymized example. Do not include names, complaint details, active disputes, or sensitive information.
```

---

# 5.14 `screen-portfolio-builder`

## Purpose

Use when learners create a practical HRBA output.

## Best used for

* HRBA lens worksheet;
* everyday rights mapping worksheet;
* rights-holder/duty-bearer map;
* participation risk checklist;
* accountability action plan;
* HRBA MEAL improvement plan;
* final practical output.

## Required blocks

| Block                    | Required    |
| ------------------------ | ----------- |
| Portfolio Builder        | Yes         |
| Safety Note              | Yes         |
| Save behavior            | Yes         |
| Edit behavior            | Recommended |
| Export/download behavior | Optional    |

## Layout

Desktop:

```text id="xlxajp"
Header
Purpose and safety note
Guided worksheet fields
Save/progress state
Optional output preview
```

Optional split variant:

```text id="7v25k9"
Left: guidance and example
Right: learner worksheet
```

## Approved variants

| Variant                      | Use                           |
| ---------------------------- | ----------------------------- |
| `portfolio-guided-worksheet` | Multi-field output            |
| `portfolio-map-builder`      | Actor/rights/barrier map      |
| `portfolio-action-plan`      | Small action plan             |
| `portfolio-checklist-output` | Checklist converted to output |
| `portfolio-summary-export`   | Downloadable summary          |

## Completion rule

```text id="3mho15"
portfolio-required-fields-saved
```

## Fit status

Usually:

```text id="jyarj2"
fit-required
```

May be:

```text id="t9dsdq"
scroll-permitted
```

only when the screen spec explicitly permits scrolling.

## Safety

Must not require identifiable real-world project, complaint, or community data.

---

# 5.15 `screen-synthesis-summary`

## Purpose

Use to summarize what learners have just learned and prepare them for the next part.

## Best used for

* end of lesson;
* end of concept group;
* before knowledge check;
* before portfolio output;
* before module completion.

## Required blocks

| Block                      | Required |
| -------------------------- | -------- |
| Summary cards or statement | Yes      |
| Next-step note             | Yes      |
| Optional checklist         | Optional |

## Layout

Desktop:

```text id="3uw4ob"
Header
3–5 concise takeaways
Next step panel
```

## Content rules

Summaries must be short, practical, and action-oriented.

Avoid repeating the full lesson.

## Completion rule

```text id="cw93n0"
viewed-and-continued
```

## Fit status

```text id="j8b6x3"
fit-required
```

---

# 5.16 `screen-module-completion`

## Purpose

Use at the end of each module.

This screen should feel like a clear, satisfying completion moment without exaggerated gamification.

## Best used for

* Module 1 completion;
* Module 2 completion;
* end of each module.

## Required blocks

| Block              | Required |
| ------------------ | -------- |
| Completion Block   | Yes      |
| Progress cue       | Yes      |
| What you practiced | Yes      |
| Next step          | Yes      |
| Primary CTA        | Yes      |

## Layout

Desktop:

```text id="pb2mc2"
Centered premium completion panel
Progress / completed module cue
What you practiced
Next step button
```

Optional visual:

* subtle celebratory illustration;
* module-themed icon;
* progress badge.

## Completion rule

```text id="sqln0u"
module-finished
```

## Fit status

```text id="xi8mca"
fit-required
```

---

# 5.17 `screen-course-completion`

## Purpose

Use at the end of the full course after final assessment or course wrap-up.

## Required blocks

| Block                     | Required    |
| ------------------------- | ----------- |
| Completion Block          | Yes         |
| Certificate path note     | Yes         |
| Course progress summary   | Yes         |
| Feedback/survey CTA       | Recommended |
| Next learning/action step | Recommended |

## Layout

Desktop:

```text id="5189r6"
Course completion hero
Certificate status
Next step cards
Feedback CTA
```

## Completion rule

```text id="09aqrl"
course-finished
```

## Fit status

May be:

```text id="4t4glb"
fit-required
```

or:

```text id="jvvc3t"
scroll-permitted
```

depending on certificate and feedback content.

---

# 5.18 `screen-final-assessment`

## Purpose

Use for scored final assessment screens.

## Best used for

* final scenario-based MCQs;
* matching questions;
* sequencing questions;
* HRBA judgment questions;
* completion score review.

## Required blocks

| Block                 | Required                    |
| --------------------- | --------------------------- |
| Final Assessment Item | Yes                         |
| Progress indicator    | Yes                         |
| Submit/check behavior | Yes                         |
| Score handling        | Yes                         |
| Feedback              | Depends on assessment rules |

## Layout

Desktop:

```text id="t2mky0"
Assessment header
Question panel
Answer interaction
Assessment navigation
```

## Rules

Final assessment screens must:

* align to learning outcomes;
* use scenario-based judgment where possible;
* avoid unsafe disclosure;
* avoid trick wording;
* follow scoring and certificate rules;
* avoid teaching too much inside the assessment unless feedback is intended.

## Completion rule

Defined by final assessment specification.

Common rule:

```text id="llh5jz"
answer-submitted
```

## Fit status

```text id="4bphko"
fit-required
```

---

# 6. Screen template anti-patterns

Avoid these screen patterns.

| Anti-pattern                                  | Why it is a problem         |
| --------------------------------------------- | --------------------------- |
| Long scrolling concept screen                 | Feels like a PDF/manual     |
| Repeated three-card layout                    | Creates visual monotony     |
| Text-only slide                               | Weak engagement             |
| Image-only decorative screen                  | Weak learning value         |
| Quiz with obvious answer                      | Does not build judgment     |
| Scenario without feedback                     | Missed learning opportunity |
| Reflection asking for real sensitive examples | HRBA safety risk            |
| Hotspot without text alternative              | Accessibility failure       |
| Drag/drop-only activity                       | Accessibility failure       |
| Overloaded screen with many actions           | Cognitive overload          |
| Large unused white space                      | Weak visual design          |
| Hidden next button                            | Navigation confusion        |
| Custom layout for one simple idea             | Maintenance burden          |

---

# 7. Screen fit rules

Every screen must be assigned one fit status.

| Fit status             | Meaning                                                  |
| ---------------------- | -------------------------------------------------------- |
| `fit-required`         | Must fit desktop course canvas without vertical scroll   |
| `scroll-permitted`     | Scrolling allowed because content type requires it       |
| `split-required`       | Content is too heavy and must be split before coding     |
| `interaction-required` | Content must be converted into interaction before coding |

Default:

```text id="f476pt"
fit-required
```

Coding agents must not create a scroll-heavy screen unless the screen specification explicitly says:

```text id="n8u8je"
scrollPermitted: true
```

---

# 8. Recommended screen mix by module

## Module 1 — Starting the HRBA Learning Journey

| Screen need                  | Recommended template                                        |
| ---------------------------- | ----------------------------------------------------------- |
| Module cover                 | `screen-hero-cover`                                         |
| Learning journey             | `screen-learning-journey`                                   |
| Water point story            | `screen-scenario-hook`                                      |
| Hidden HRBA questions        | `screen-progressive-reveal`                                 |
| Simple HRBA definition       | `screen-concept-focus`                                      |
| Everyday rights              | `screen-concept-focus` or `screen-scenario-decision`        |
| Invisible groups             | `screen-hotspot-exploration`                                |
| Rights are connected         | `screen-concept-focus`                                      |
| Beneficiary to rights-holder | `screen-before-after-shift`                                 |
| Responsibility               | `screen-progressive-reveal` or `screen-hotspot-exploration` |
| Participation                | `screen-before-after-shift`                                 |
| Knowledge check              | `screen-knowledge-check`                                    |
| Self-assessment              | `screen-reflection-journal`                                 |
| Action commitment            | `screen-reflection-journal`                                 |
| Key takeaways                | `screen-synthesis-summary`                                  |
| Completion                   | `screen-module-completion`                                  |

## Module 2 — Foundations: Rights, Actors, Principles, and Power

| Screen need                     | Recommended template                                        |
| ------------------------------- | ----------------------------------------------------------- |
| Module cover                    | `screen-hero-cover`                                         |
| Module roadmap                  | `screen-learning-journey`                                   |
| Everyday rights scenario        | `screen-scenario-hook`                                      |
| Rights dimensions               | `screen-progressive-reveal` using tabs                      |
| Rights-holder/duty-bearer roles | `screen-progressive-reveal` or `screen-hotspot-exploration` |
| Actor map                       | `screen-hotspot-exploration`                                |
| Power lens                      | `screen-hotspot-exploration`                                |
| HRBA principles                 | `screen-progressive-reveal`                                 |
| Standards in practice           | `screen-progressive-reveal` using tabs                      |
| Need/right/duty/barrier sorting | `screen-sorting-practice`                                   |
| Scenario judgment               | `screen-scenario-decision`                                  |
| Knowledge check                 | `screen-knowledge-check`                                    |
| Rights mapping worksheet        | `screen-portfolio-builder`                                  |
| Completion                      | `screen-module-completion`                                  |

## Module 3 — Applying HRBA in Project Design

| Screen need               | Recommended template         |
| ------------------------- | ---------------------------- |
| Module cover              | `screen-hero-cover`          |
| Design dilemma            | `screen-scenario-hook`       |
| Context analysis          | `screen-process-walkthrough` |
| Stakeholder analysis      | `screen-hotspot-exploration` |
| Duty-bearer map           | `screen-portfolio-builder`   |
| Problem analysis          | `screen-sorting-practice`    |
| Design decision           | `screen-scenario-decision`   |
| Objective/indicator shift | `screen-before-after-shift`  |
| Project design checklist  | `screen-checklist-practice`  |
| Portfolio output          | `screen-portfolio-builder`   |
| Completion                | `screen-module-completion`   |

## Module 4 — Applying HRBA During Implementation

| Screen need                | Recommended template         |
| -------------------------- | ---------------------------- |
| Module cover               | `screen-hero-cover`          |
| Implementation scenario    | `screen-scenario-hook`       |
| Participation quality      | `screen-checklist-practice`  |
| Inclusion barriers         | `screen-hotspot-exploration` |
| Field decision             | `screen-scenario-decision`   |
| Accountability loop        | `screen-process-walkthrough` |
| Feedback response          | `screen-scenario-decision`   |
| Risk/safety reflection     | `screen-reflection-journal`  |
| Implementation action plan | `screen-portfolio-builder`   |
| Completion                 | `screen-module-completion`   |

## Module 5 — HRBA in MEAL

| Screen need                            | Recommended template                                     |
| -------------------------------------- | -------------------------------------------------------- |
| Module cover                           | `screen-hero-cover`                                      |
| MEAL dilemma                           | `screen-scenario-hook`                                   |
| Indicators concept                     | `screen-concept-focus`                                   |
| Structural/process/outcome distinction | `screen-progressive-reveal` or `screen-sorting-practice` |
| Feedback loop                          | `screen-process-walkthrough`                             |
| Safe data decision                     | `screen-scenario-decision`                               |
| Accountability and learning            | `screen-checklist-practice`                              |
| HRBA MEAL worksheet                    | `screen-portfolio-builder`                               |
| Completion                             | `screen-module-completion`                               |

## Final Assessment

| Screen need              | Recommended template       |
| ------------------------ | -------------------------- |
| Assessment intro         | `screen-hero-cover`        |
| Scenario-based questions | `screen-final-assessment`  |
| Matching/sequencing      | `screen-final-assessment`  |
| Score review             | `screen-synthesis-summary` |
| Course completion        | `screen-course-completion` |

---

# 9. Required screen specification format

Every screen must be documented before coding using this format.

```md id="fv27jk"
## Screen ID: M2-S20

### Screen title
Power lens: what may be hidden?

### Template
screen-hotspot-exploration

### Learning purpose
Reveal hidden power and exclusion risks in a CSO scenario.

### Fit status
fit-required

### Learner-facing content
[Exact text here.]

### Blocks used
- HotspotGraphic
- SafetyNote
- CompletionState

### Learner action
Learner clicks or tabs through hotspots to reveal hidden risks.

### Interaction logic
- Show image.
- Display five hotspots.
- Reveal short explanation when hotspot is selected.
- Mark hotspot as viewed.
- Enable Continue when all required hotspots are viewed.

### Completion rule
all-hotspots-viewed

### Visual assets
- m2_s20_power_lens_hotspot_scene_v1.png

### Accessibility
Provide keyboard-accessible hotspot list and long description.

### HRBA safety
Use fictional scenario only. Do not ask learner to identify real actors.

### QA acceptance criteria
- Screen fits desktop canvas.
- All hotspots are reachable by keyboard.
- Continue remains disabled until required hotspots are viewed.
- Mobile layout provides hotspot list alternative.
- No console errors.
```

---

# 10. Implementation rules for coding agents

Coding agents must:

1. use only approved screen templates;
2. use only approved block templates inside screens;
3. follow foundation tokens;
4. follow course player system;
5. implement screen fit status exactly;
6. implement completion rules exactly;
7. preserve accessibility requirements;
8. preserve HRBA safety rules;
9. report missing specifications before coding;
10. return evidence after implementation.

Coding agents must not:

1. invent new screen layouts;
2. make scroll-heavy screens without approval;
3. create new block combinations without screen specification;
4. use unapproved visual styles;
5. hide learner actions below the fold;
6. use vague placeholder text;
7. ask for sensitive real-world examples;
8. mark screens complete before required feedback/action;
9. redesign locked templates;
10. change navigation patterns.

---

# 11. QA checklist for screen templates

Before approving a screen implementation, check:

| QA item                                | Required result |
| -------------------------------------- | --------------- |
| Approved screen template used          | Pass            |
| Approved block templates used          | Pass            |
| Screen fits required layout status     | Pass            |
| Learner action is clear                | Pass            |
| Completion rule works                  | Pass            |
| Feedback appears where required        | Pass            |
| Visual hierarchy is strong             | Pass            |
| No large empty white-space imbalance   | Pass            |
| Text is concise and readable           | Pass            |
| Mobile behavior works                  | Pass            |
| Keyboard navigation works              | Pass            |
| Focus state is visible                 | Pass            |
| Screen-reader labels/alt text included | Pass            |
| HRBA safety rules followed             | Pass            |
| No sensitive disclosure required       | Pass            |
| No unapproved colors/fonts/shadows     | Pass            |
| No console errors                      | Pass            |

---

# 12. Approval status

Status: Draft v1
Applies to: CSO Learning Hub HRBA course screen templates
Depends on:

```text id="aohaz0"
docs/design-system/01_FOUNDATION_TOKENS.md
docs/design-system/02_COURSE_PLAYER_SYSTEM.md
docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
```

Next file:

```text id="tz4tay"
docs/design-system/05_INTERACTION_LOGIC_PATTERNS.md
```
