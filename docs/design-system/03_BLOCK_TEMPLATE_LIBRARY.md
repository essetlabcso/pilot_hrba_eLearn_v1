# CSO Learning Hub HRBA Course Design System

## 03 — Block Template Library

## 1. Purpose

This document defines the approved reusable block templates for the CSO Learning Hub HRBA e-learning course.

The block template library exists to prevent ad hoc screen design, repeated custom coding, inconsistent interactions, and visual drift.

Coding agents must use these approved block templates instead of inventing new block patterns unless a new block is explicitly approved and added to this library.

This file builds on:

```text
docs/design-system/01_FOUNDATION_TOKENS.md
docs/design-system/02_COURSE_PLAYER_SYSTEM.md
```

---

## 2. Core block principle

Blocks should be selected by **learning purpose**, not by visual preference.

Before choosing a block, identify what the learner needs to do:

| Learning purpose | Learner action                 | Recommended block family                          |
| ---------------- | ------------------------------ | ------------------------------------------------- |
| Structure        | Understand where they are      | Header, divider, progress note                    |
| Explain          | Understand a concept           | Concept card, short explainer                     |
| Emphasize        | Notice an important point      | Statement, callout, quote                         |
| Show             | See an example or visual model | Image, diagram, labeled graphic                   |
| Reveal           | Explore layered information    | Accordion, tabs, flashcards, hotspot              |
| Practice         | Apply a concept                | Sorting, matching, checklist, guided task         |
| Decide           | Make a judgment                | Scenario decision, dilemma card                   |
| Reflect          | Connect to CSO work safely     | Reflection journal, action commitment             |
| Check            | Test understanding             | Knowledge check, scenario quiz                    |
| Apply            | Produce a practical output     | Portfolio builder, worksheet, downloadable output |
| Safeguard        | Reduce risk                    | Safety note, do-no-harm reminder                  |
| Access           | Improve usability              | Transcript, alt text, low-bandwidth alternative   |
| Recognize        | Mark achievement               | Completion state, certificate path, badge note    |

---

## 3. Block selection rules

### 3.1 Use the lightest effective block

Do not use a complex interaction when a simple block will work.

| If the learner only needs to… | Use                      |
| ----------------------------- | ------------------------ |
| read one key idea             | Statement block          |
| compare 2–4 ideas             | Tabs or comparison cards |
| reveal 3–6 short points       | Accordion                |
| classify examples             | Sorting activity         |
| choose an action              | Scenario decision        |
| identify parts of a visual    | Hotspot graphic          |
| write a safe commitment       | Reflection block         |
| produce a tool                | Portfolio builder        |

### 3.2 Avoid repeated block monotony

Do not use the same block pattern across many consecutive screens unless the learning logic requires it.

For example:

* do not use three-card grids repeatedly;
* do not use accordions for every concept;
* do not use static quote/callout screens as filler;
* do not use knowledge checks only as recall questions.

### 3.3 Convert content overload into interaction

When text is too long, convert it into:

| Content issue             | Better block      |
| ------------------------- | ----------------- |
| Many related points       | Accordion         |
| Comparing categories      | Tabs              |
| Sequence of steps         | Process block     |
| Terms and examples        | Flashcards        |
| Hidden risks in a scene   | Hotspot graphic   |
| Many examples to classify | Sorting activity  |
| Practical judgment        | Scenario decision |
| Learner application       | Portfolio builder |

---

## 4. Required block families

The HRBA course must support the following reusable block families.

```text
src/components/learning-blocks/
HeroBlock.tsx
ConceptBlock.tsx
StatementBlock.tsx
QuoteBlock.tsx
ImageBlock.tsx
AccordionReveal.tsx
TabsCompare.tsx
FlashcardGrid.tsx
HotspotGraphic.tsx
ProcessSteps.tsx
ScenarioDecision.tsx
SortingActivity.tsx
ChecklistPractice.tsx
KnowledgeCheck.tsx
ReflectionJournal.tsx
PortfolioBuilder.tsx
SafetyNote.tsx
ResourceLinkBlock.tsx
CompletionBlock.tsx
```

---

# 5. Structure Blocks

## 5.1 Hero Block

### Purpose

Use for course starts, module starts, major section openings, and completion moments.

### Best used when

* introducing a module;
* setting emotional relevance;
* showing a strong visual metaphor;
* orienting learners to what they will practice.

### Required elements

| Element              | Required |
| -------------------- | -------- |
| Eyebrow              | Yes      |
| Title                | Yes      |
| Subtitle             | Yes      |
| Primary action       | Yes      |
| Supporting visual    | Usually  |
| Progress/context cue | Optional |

### Visual rules

* Use premium split or cinematic layout.
* Use a strong image or visual metaphor.
* Use dark navy overlay when text appears over image.
* Keep text short.
* Leave enough negative space.

### Avoid

* generic stock workshop scenes;
* long paragraphs;
* several competing buttons;
* decorative visuals unrelated to the module.

### Completion rule

Completed when learner clicks the primary action or Continue.

---

## 5.2 Section Header Block

### Purpose

Use to introduce a new part of a lesson or screen group.

### Required elements

| Element              | Required    |
| -------------------- | ----------- |
| Short heading        | Yes         |
| One-sentence purpose | Recommended |
| Optional icon        | Optional    |

### Rules

Use sparingly. Do not make every screen start with a heavy section header.

---

## 5.3 Divider / Progress Note Block

### Purpose

Use to show transition, progress, or completion between learning moments.

### Example uses

* “You have completed the first part.”
* “Next, apply the HRBA lens to a realistic CSO situation.”
* “Before moving on, check your understanding.”

### Rules

Keep brief. Do not use as decorative filler.

---

# 6. Explain Blocks

## 6.1 Concept Block

### Purpose

Use to explain one core idea clearly.

### Best used when

* introducing a new HRBA concept;
* defining a practical distinction;
* connecting a concept to CSO work.

### Required elements

| Element           | Required    |
| ----------------- | ----------- |
| Concept title     | Yes         |
| Short explanation | Yes         |
| Practical meaning | Yes         |
| Example or visual | Recommended |
| Key takeaway      | Optional    |

### Approved variants

| Variant                | Use                                    |
| ---------------------- | -------------------------------------- |
| `concept-simple`       | One clear concept, minimal visual      |
| `concept-split`        | Concept + visual / example             |
| `concept-diagonal`     | Premium presentation-like split layout |
| `concept-card-cluster` | 3–4 short related ideas                |
| `concept-before-after` | Traditional view vs HRBA view          |

### HRBA examples

| Concept                         | Recommended variant                   |
| ------------------------------- | ------------------------------------- |
| Rights-holder                   | `concept-split`                       |
| Duty-bearer                     | `concept-split`                       |
| Participation beyond attendance | `concept-before-after`                |
| Accountability loop             | `concept-diagonal` or `process-steps` |
| Non-discrimination              | `concept-card-cluster`                |

### Completion rule

Completed when learner views the block and clicks Continue.

---

## 6.2 Definition Card

### Purpose

Use for short definitions that support practice.

### Required elements

| Element                   | Required    |
| ------------------------- | ----------- |
| Term                      | Yes         |
| Plain-language definition | Yes         |
| Practical CSO example     | Recommended |
| “Watch out” note          | Optional    |

### Rules

Definitions should be short and practical. Avoid legalistic wording unless required.

---

# 7. Emphasize Blocks

## 7.1 Statement Block

### Purpose

Use to highlight a key idea learners should remember.

### Approved variants

| Variant             | Use                           |
| ------------------- | ----------------------------- |
| `statement-key`     | Core takeaway                 |
| `statement-warning` | Caution or do-no-harm message |
| `statement-shift`   | Mindset shift                 |
| `statement-bridge`  | Connects two learning moments |

### Example

```text
HRBA does not only ask what service was delivered. It asks who was included, who had voice, who had responsibility, and what changed in people’s ability to claim their rights.
```

### Rules

Use one strong statement at a time. Do not stack multiple statement blocks.

---

## 7.2 Quote Block

### Purpose

Use only when a quote adds authority, voice, or reflection value.

### Approved variants

| Variant                 | Use                                       |
| ----------------------- | ----------------------------------------- |
| `quote-single`          | One short quote                           |
| `quote-community-voice` | Fictionalized community voice             |
| `quote-practitioner`    | Fictionalized CSO practitioner reflection |

### HRBA safety rule

Do not present real community quotes unless consent, attribution, and safeguarding are confirmed. Prefer fictionalized or composite quotes for course scenarios.

---

## 7.3 Callout Block

### Purpose

Use for short notes that support the learner.

### Approved variants

| Variant           | Use            |
| ----------------- | -------------- |
| `callout-tip`     | Practical tip  |
| `callout-note`    | Neutral note   |
| `callout-caution` | Safety or risk |
| `callout-example` | Mini example   |

---

# 8. Show Blocks

## 8.1 Image Block

### Purpose

Use images when they clarify context, emotion, scenario, or concept.

### Approved variants

| Variant                    | Use                             |
| -------------------------- | ------------------------------- |
| `image-full-bleed`         | Cover or hero screens           |
| `image-card`               | Concept or scenario support     |
| `image-side-panel`         | Split layouts                   |
| `image-with-caption`       | Visual explanation              |
| `image-background-overlay` | Hero only, with strong contrast |

### Rules

Images must:

* be locally grounded and respectful;
* support the screen’s learning purpose;
* include alt text if meaningful;
* avoid readable text, logos, and sensitive details;
* use approved radius and cropping.

---

## 8.2 Diagram / Visual Model Block

### Purpose

Use for conceptual models such as HRBA lens, accountability loop, stakeholder map, or project-cycle flow.

### Approved variants

| Variant           | Use                                 |
| ----------------- | ----------------------------------- |
| `diagram-static`  | Simple visual model                 |
| `diagram-labeled` | Labeled graphic without interaction |
| `diagram-hotspot` | Interactive visual exploration      |
| `diagram-process` | Step-by-step visual flow            |

### Rules

Use clean visual hierarchy. Avoid cluttered infographics.

---

# 9. Reveal Blocks

## 9.1 Accordion Reveal

### Purpose

Use when learners need to explore related points progressively.

### Best used for

* HRBA principles;
* hidden questions;
* common mistakes;
* practical guidance;
* “what this means in CSO work.”

### Approved variants

| Variant                              | Use                               |
| ------------------------------------ | --------------------------------- |
| `accordion-concept-reveal`           | Reveal one concept at a time      |
| `accordion-misconception-correction` | Myth/mistake → better HRBA view   |
| `accordion-case-evidence`            | Reveal case details progressively |
| `accordion-principle-application`    | Principle → practical application |
| `accordion-faq`                      | Frequently asked questions        |

### Required elements

| Element               | Required    |
| --------------------- | ----------- |
| Intro instruction     | Yes         |
| 3–6 panels            | Recommended |
| Short panel titles    | Yes         |
| Concise panel content | Yes         |
| Completion behavior   | Yes         |

### Completion rule

Default: completed when all required panels are opened.

Optional: completed when learner opens at least one panel, if the screen spec allows.

### Accessibility behavior

* Panels must be keyboard accessible.
* Expanded/collapsed state must be announced.
* Focus order must be logical.

### Avoid

* more than 6 panels;
* long paragraphs inside panels;
* using accordion only to hide excessive content;
* nested accordions.

---

## 9.2 Tabs Compare

### Purpose

Use when learners compare categories or perspectives.

### Best used for

* rights-holder vs duty-bearer vs CSO role;
* principle vs practice;
* participation levels;
* project cycle phases;
* types of rights.

### Approved variants

| Variant                          | Use                               |
| -------------------------------- | --------------------------------- |
| `tabs-category-compare`          | Compare 3–5 categories            |
| `tabs-actor-roles`               | Compare actor roles               |
| `tabs-before-during-after`       | Compare phases                    |
| `tabs-standard-practice-caution` | Standard → practice → caution     |
| `tabs-rights-dimensions`         | Different human rights dimensions |

### Completion rule

Completed when all required tabs are viewed.

### Accessibility behavior

* Use proper tab semantics.
* Arrow keys should move between tabs where feasible.
* Selected tab must be visually and programmatically clear.

---

## 9.3 Flashcard Grid

### Purpose

Use for quick reveal of terms, examples, or practice distinctions.

### Best used for

* HRBA terms;
* principle → example;
* weak practice → stronger practice;
* actor → responsibility;
* risk → safer response.

### Approved variants

| Variant                      | Use                                             |
| ---------------------------- | ----------------------------------------------- |
| `flashcard-term-example`     | Term on front, example on back                  |
| `flashcard-mistake-fix`      | Weak practice on front, better practice on back |
| `flashcard-principle-action` | Principle on front, action on back              |
| `flashcard-actor-role`       | Actor on front, role on back                    |

### Completion rule

Completed when all required cards are flipped.

### Accessibility behavior

* Cards must be operable by keyboard.
* Flip state must be communicated.
* Back content must be readable by screen readers.

---

## 9.4 Hotspot Graphic

### Purpose

Use when learners need to inspect a scene, diagram, map, or visual model.

### Best used for

* power lens scenes;
* hidden exclusion;
* stakeholder ecosystem;
* accountability loop;
* rights-holder/duty-bearer map;
* project cycle diagram.

### Approved variants

| Variant             | Use                                               |
| ------------------- | ------------------------------------------------- |
| `hotspot-scene`     | Learner explores a realistic or illustrated scene |
| `hotspot-diagram`   | Learner explores labeled parts of a model         |
| `hotspot-risk-lens` | Learner reveals hidden barriers or risks          |
| `hotspot-actor-map` | Learner identifies actors and relationships       |

### Required elements

| Element                              | Required |
| ------------------------------------ | -------- |
| Image/diagram                        | Yes      |
| Hotspot labels                       | Yes      |
| Reveal content                       | Yes      |
| Keyboard-accessible list alternative | Yes      |
| Alt text / long description          | Yes      |
| Completion rule                      | Yes      |

### Completion rule

Completed when all required hotspots are viewed.

### Accessibility behavior

* Hotspots must be reachable by keyboard.
* Each hotspot must have an accessible label.
* Provide a text list alternative below or beside the visual.
* Do not rely on precise mouse movement only.

### Avoid

* tiny hotspot targets;
* too many hotspots;
* unlabeled visual clues;
* complex diagrams without text alternative.

---

# 10. Practice Blocks

## 10.1 Sorting Activity

### Purpose

Use when learners need to classify examples.

### Best used for

* need vs right vs duty vs barrier;
* participation vs tokenism;
* output vs outcome;
* rights-holder vs duty-bearer;
* safe vs unsafe data practice;
* accountability step classification.

### Approved variants

| Variant                    | Use                            |
| -------------------------- | ------------------------------ |
| `sort-cards-to-categories` | Drag/tap cards into categories |
| `sort-binary`              | Sort into two groups           |
| `sort-sequence`            | Put steps in order             |
| `sort-match`               | Match item to category         |

### Required elements

| Element             | Required    |
| ------------------- | ----------- |
| Clear instruction   | Yes         |
| Items/cards         | Yes         |
| Categories          | Yes         |
| Submit/check button | Yes         |
| Feedback            | Yes         |
| Retry behavior      | Recommended |

### Completion rule

Completed when learner submits and views feedback.

### Accessibility behavior

* Must support keyboard/tap alternative.
* Do not require drag-and-drop only.
* Cards and categories must have accessible labels.

---

## 10.2 Checklist Practice

### Purpose

Use when learners apply a practical HRBA quality check.

### Best used for

* inclusion risk review;
* participation quality check;
* safe consultation planning;
* accessible feedback channel check;
* project design HRBA review;
* MEAL data safety check.

### Approved variants

| Variant                     | Use                                |
| --------------------------- | ---------------------------------- |
| `checklist-self-check`      | Learner checks their own plan      |
| `checklist-scenario-review` | Learner reviews fictional scenario |
| `checklist-readiness`       | Learner assesses preparedness      |
| `checklist-risk-safety`     | Learner checks risk/safety factors |

### Completion rule

Completed when learner reviews all required items and clicks Continue, or when required checks are selected if specified.

### HRBA safety rule

For self-checks, include a reminder not to enter sensitive details.

---

## 10.3 Process Steps

### Purpose

Use when learners need to understand a sequence.

### Best used for

* HRBA analysis steps;
* accountability loop;
* project design flow;
* safe participation planning;
* feedback response cycle;
* MEAL learning loop.

### Approved variants

| Variant                   | Use                                                 |
| ------------------------- | --------------------------------------------------- |
| `process-horizontal`      | 3–5 steps on desktop                                |
| `process-vertical`        | Mobile or more detailed flow                        |
| `process-click-to-reveal` | Step explanation revealed progressively             |
| `process-loop`            | Cyclical process such as accountability or learning |

### Completion rule

Completed when all required steps are viewed where interaction exists.

---

# 11. Decide Blocks

## 11.1 Scenario Decision

### Purpose

Use when learners must make a practical judgment in a realistic CSO situation.

This is a core HRBA block and should be used frequently across modules.

### Best used for

* identifying hidden rights issues;
* choosing inclusive participation steps;
* responding to exclusion;
* choosing accountable communication;
* handling complaints safely;
* deciding whether a practice is HRBA-aligned.

### Approved variants

| Variant                      | Use                                          |
| ---------------------------- | -------------------------------------------- |
| `scenario-single-choice`     | Choose best response                         |
| `scenario-multiple-response` | Select all appropriate actions               |
| `scenario-branch-lite`       | Choice reveals different consequence         |
| `scenario-dilemma`           | No perfect answer; choose strongest judgment |
| `scenario-first-step`        | Choose what to do first                      |
| `scenario-risk-response`     | Choose safer action under risk               |

### Required elements

| Element             | Required    |
| ------------------- | ----------- |
| Scenario title      | Yes         |
| Scenario setup      | Yes         |
| Learner role        | Recommended |
| Decision prompt     | Yes         |
| Choices             | Yes         |
| Feedback per choice | Yes         |
| HRBA explanation    | Yes         |
| Continue behavior   | Yes         |

### Feedback quality

Feedback must explain:

* why the response is strong, incomplete, or risky;
* what HRBA principle is involved;
* what a safer or more inclusive practice would look like.

### Completion rule

Completed when learner selects a choice and views feedback.

### Avoid

* obvious “right answer” choices;
* unrealistic donor jargon;
* scenarios that blame communities;
* politically sensitive or identifiable situations;
* feedback that only says correct/incorrect.

---

## 11.2 Dilemma Card

### Purpose

Use when learners need to weigh trade-offs.

### Best used for

* participation vs urgency;
* transparency vs safety;
* data collection vs confidentiality;
* advocacy vs civic-space risk;
* accountability vs do-no-harm.

### Completion rule

Completed when learner selects a position and reviews feedback.

---

# 12. Reflect Blocks

## 12.1 Reflection Journal

### Purpose

Use when learners connect learning to their own CSO practice safely.

### Approved variants

| Variant                           | Use                       |
| --------------------------------- | ------------------------- |
| `reflection-private-note`         | Private learner note      |
| `reflection-guided-prompt`        | Short guided response     |
| `reflection-confidence-scale`     | Rate confidence/readiness |
| `reflection-action-commitment`    | One small safe action     |
| `reflection-compare-before-after` | How thinking changed      |

### Required elements

| Element                      | Required                          |
| ---------------------------- | --------------------------------- |
| Prompt                       | Yes                               |
| Safety note                  | Required when asking for examples |
| Text box or response control | Yes                               |
| Save/skip behavior           | Yes                               |
| Encouraging feedback         | Recommended                       |

### Standard safety note

```text
Use a fictional, general, or anonymized example. Do not include names, complaint details, active disputes, or sensitive information.
```

### Completion rule

Default: completed when learner saves a response or chooses “Skip for now” if optional.

### Do not ask

* “Describe a real complaint from your organization.”
* “Name a group that was excluded.”
* “Identify a government office/person causing the problem.”
* “Upload a real project document with sensitive information.”

---

# 13. Check Blocks

## 13.1 Knowledge Check

### Purpose

Use to check understanding and judgment.

### Best used for

* scenario-based MCQs;
* multiple-response judgment;
* matching actors and responsibilities;
* sequencing HRBA steps;
* identifying weak vs strong practice.

### Approved variants

| Variant                  | Use                           |
| ------------------------ | ----------------------------- |
| `kc-single-choice`       | One best answer               |
| `kc-multiple-response`   | Select all that apply         |
| `kc-match`               | Match concepts/actors         |
| `kc-sequence`            | Put steps in order            |
| `kc-scenario-judgment`   | Apply HRBA to a case          |
| `kc-misconception-check` | Identify incorrect assumption |

### Required elements

| Element             | Required |
| ------------------- | -------- |
| Question            | Yes      |
| Answer choices      | Yes      |
| Submit/check button | Yes      |
| Feedback            | Yes      |
| Retry behavior      | Optional |
| Explanation         | Yes      |

### Question quality rules

Knowledge checks should test practical reasoning, not only memorization.

Weak:

```text
What does HRBA stand for?
```

Stronger:

```text
A CSO invites only community leaders to select project participants. What is the strongest HRBA concern?
```

### Completion rule

Completed when learner submits and views feedback.

---

## 13.2 Final Assessment Item

### Purpose

Use only inside final assessment or scored module tests.

### Rules

Final assessment items should:

* be scenario-based;
* align to course learning outcomes;
* avoid trick questions;
* include clear scoring;
* support certificate rules;
* avoid unsafe real-world disclosure.

Completion and scoring rules should be defined in the assessment specification, not improvised inside block code.

---

# 14. Apply Blocks

## 14.1 Portfolio Builder

### Purpose

Use when the learner produces a practical HRBA output.

### Best used for

* HRBA lens reflection;
* rights-holder/duty-bearer map;
* participation quality checklist;
* inclusion risk note;
* accountability action plan;
* MEAL indicator reflection;
* course-end improvement plan.

### Approved variants

| Variant                      | Use                               |
| ---------------------------- | --------------------------------- |
| `portfolio-guided-worksheet` | Multi-field guided output         |
| `portfolio-action-plan`      | Small action commitment           |
| `portfolio-map-builder`      | Map actors/rights/barriers        |
| `portfolio-checklist-output` | Checklist converted to output     |
| `portfolio-summary-export`   | Generate/download learner summary |

### Required elements

| Element                  | Required    |
| ------------------------ | ----------- |
| Purpose statement        | Yes         |
| Safe-use note            | Yes         |
| Guided fields            | Yes         |
| Save behavior            | Yes         |
| Edit behavior            | Recommended |
| Export/download behavior | Optional    |
| Completion rule          | Yes         |

### HRBA safety rule

Portfolio outputs must allow fictional, generalized, or anonymized responses.

Do not require identifiable real project data.

### Completion rule

Completed when required fields are saved, or when draft save is accepted by screen specification.

---

## 14.2 Resource Link / Download Block

### Purpose

Use to provide templates, worksheets, reading, or tools.

### Required elements

| Element                     | Required     |
| --------------------------- | ------------ |
| Resource title              | Yes          |
| Short description           | Yes          |
| File/link action            | Yes          |
| Format/size where available | Recommended  |
| Accessibility alternative   | Where needed |

### Rules

Resources should support practical application. Do not turn the course into a file repository.

---

# 15. Safeguard Blocks

## 15.1 Safety Note

### Purpose

Use to prevent unsafe disclosure or harmful application.

### Best used for

* reflection prompts;
* portfolio fields;
* complaint/accountability topics;
* civic-space/power analysis;
* case-based discussion;
* data collection guidance.

### Approved variants

| Variant              | Use                                |
| -------------------- | ---------------------------------- |
| `safety-general`     | General safe learning reminder     |
| `safety-reflection`  | Before learner writes              |
| `safety-data`        | Data/confidentiality caution       |
| `safety-civic-space` | Advocacy/power/civic-space caution |
| `safety-do-no-harm`  | Sensitive practice caution         |

### Standard wording

```text
Use a fictional, general, or anonymized example. Do not include names, complaint details, active disputes, or sensitive information.
```

### Completion rule

Safety notes do not usually define completion. They support safe interaction.

---

# 16. Access Blocks

## 16.1 Transcript / Text Alternative Block

### Purpose

Use for video, audio, image-heavy diagrams, hotspots, and complex visuals.

### Required when

* video is used;
* audio is used;
* image contains meaningful information;
* hotspot interaction depends on visual recognition;
* diagram is complex.

### Rules

The text alternative must provide equivalent learning value, not just a vague description.

---

## 16.2 Low-Bandwidth Alternative

### Purpose

Use when learners may have limited connectivity.

### Examples

* text summary instead of video;
* downloadable PDF instead of interactive diagram;
* static image plus list instead of heavy animation.

---

# 17. Recognize Blocks

## 17.1 Completion Block

### Purpose

Use at the end of a module or major section.

### Required elements

| Element                  | Required |
| ------------------------ | -------- |
| Completion heading       | Yes      |
| Short celebration        | Yes      |
| What learner practiced   | Yes      |
| Next step                | Yes      |
| Progress/certificate cue | Optional |
| Action button            | Yes      |

### Approved variants

| Variant                       | Use                  |
| ----------------------------- | -------------------- |
| `completion-module`           | End of module        |
| `completion-section`          | End of section       |
| `completion-course`           | End of course        |
| `completion-certificate-path` | Certificate guidance |

### Tone

Celebrate progress, but keep it professional and grounded.

Avoid exaggerated gamification.

---

# 18. Block metadata requirements

Every block used in a screen specification should include:

| Field                   | Required            |
| ----------------------- | ------------------- |
| `blockId`               | Yes                 |
| `blockType`             | Yes                 |
| `variant`               | Yes                 |
| `learningPurpose`       | Yes                 |
| `requiredForCompletion` | Yes                 |
| `completionRule`        | Yes, if required    |
| `accessibilityNotes`    | Yes                 |
| `safetyNotes`           | Yes, where relevant |
| `assetRefs`             | Where relevant      |

Example:

```ts
const block = {
  blockId: "m2-s20-hotspot-power-lens",
  blockType: "HotspotGraphic",
  variant: "hotspot-risk-lens",
  learningPurpose: "Reveal hidden power and exclusion risks",
  requiredForCompletion: true,
  completionRule: "all-required-hotspots-viewed",
  assetRefs: ["m2_s20_power_lens_hotspot_scene_v1.png"],
  accessibilityNotes: "Provide keyboard-accessible hotspot list and long description.",
  safetyNotes: "Use fictional scenario only. Do not ask learner to name real actors."
};
```

---

# 19. Standard completion rule IDs

Use these completion rule IDs consistently.

| Rule ID                              | Meaning                                              |
| ------------------------------------ | ---------------------------------------------------- |
| `viewed-and-continued`               | Learner viewed screen and clicked Continue           |
| `all-panels-opened`                  | All required accordion panels opened                 |
| `all-tabs-viewed`                    | All required tabs viewed                             |
| `all-cards-flipped`                  | All required flashcards flipped                      |
| `all-hotspots-viewed`                | All required hotspots viewed                         |
| `choice-selected-feedback-viewed`    | Scenario choice selected and feedback viewed         |
| `activity-submitted-feedback-viewed` | Sorting/check activity submitted and feedback viewed |
| `answer-submitted-feedback-viewed`   | Knowledge check submitted and feedback viewed        |
| `reflection-saved-or-skipped`        | Reflection saved or optional skip selected           |
| `portfolio-required-fields-saved`    | Required portfolio fields saved                      |
| `resource-opened`                    | Resource opened/downloaded where required            |
| `module-finished`                    | Module completion action selected                    |

---

# 20. Accessibility baseline for all blocks

All blocks must support:

* keyboard navigation;
* visible focus state;
* semantic HTML;
* screen-reader labels where needed;
* text alternatives for images/diagrams;
* captions/transcripts for media;
* reduced motion where animation is used;
* tap-first alternatives on mobile;
* no color-only meaning.

For interactive blocks:

* learner must be able to complete the interaction without a mouse;
* completion state must be communicated clearly;
* feedback must be readable and announced where appropriate;
* disabled states must explain what is required.

---

# 21. HRBA safety baseline for all blocks

Blocks must not require learners to disclose:

* real complaint details;
* names of people;
* names of organizations involved in sensitive issues;
* active disputes;
* safeguarding incidents;
* confidential project data;
* politically sensitive examples;
* identifiable community stories.

Whenever reflection or portfolio input is requested, use safe wording.

Preferred:

```text
Use a fictional, general, or anonymized example.
```

Avoid:

```text
Describe a real case from your organization.
```

---

# 22. Block anti-patterns

Coding agents and designers must avoid these patterns.

| Anti-pattern                                  | Why it is a problem          |
| --------------------------------------------- | ---------------------------- |
| Long text inside one card                     | Causes cognitive overload    |
| Same three-card layout repeatedly             | Makes course feel repetitive |
| Accordion used to hide too much content       | Learners may miss key ideas  |
| Scenario with obvious answer                  | Does not build judgment      |
| Quiz without explanation                      | Weak learning feedback       |
| Drag/drop without keyboard alternative        | Accessibility failure        |
| Reflection asking for real sensitive examples | HRBA safety risk             |
| Decorative image unrelated to learning        | Visual noise                 |
| Large visual causing white-space imbalance    | Poor screen composition      |
| Custom one-off component for common pattern   | Maintenance problem          |
| Color-only feedback                           | Accessibility problem        |
| Too many interactions on one screen           | Cognitive overload           |

---

# 23. Recommended block mix by module

## Module 1 — Starting the HRBA Learning Journey

| Learning need                      | Recommended blocks             |
| ---------------------------------- | ------------------------------ |
| Orientation                        | Hero, journey roadmap          |
| Water point story                  | Scenario decision, image block |
| Hidden HRBA questions              | Accordion reveal, hotspot      |
| Basic concepts                     | Concept split, statement       |
| Beneficiary to rights-holder shift | Before/after concept block     |
| Responsibility                     | Actor-role flashcards          |
| Knowledge check                    | Scenario judgment MCQ          |
| Confidence check                   | Reflection confidence scale    |
| Action commitment                  | Reflection action commitment   |
| Completion                         | Completion block               |

## Module 2 — Foundations: Rights, Actors, Principles, and Power

| Learning need                   | Recommended blocks                   |
| ------------------------------- | ------------------------------------ |
| Everyday rights                 | Sorting, scenario decision           |
| Rights dimensions               | Tabs compare                         |
| Rights-holders and duty-bearers | Actor map, flashcards                |
| Power and exclusion             | Hotspot risk lens                    |
| HRBA principles                 | Accordion principle application      |
| Standards in practice           | Tabs standard-practice-caution       |
| Knowledge check                 | Scenario-based MCQ/multiple response |
| Portfolio output                | Rights mapping worksheet             |
| Completion                      | Completion block                     |

## Module 3 — Applying HRBA in Project Design

| Learning need             | Recommended blocks               |
| ------------------------- | -------------------------------- |
| Context analysis          | Hotspot, process steps           |
| Stakeholder analysis      | Actor map, portfolio map builder |
| Problem analysis          | Sorting, scenario decision       |
| Design choices            | Scenario branch-lite             |
| Objectives and indicators | Concept before/after, checklist  |
| Portfolio output          | HRBA project design checklist    |

## Module 4 — Applying HRBA During Implementation

| Learning need            | Recommended blocks                           |
| ------------------------ | -------------------------------------------- |
| Participation quality    | Checklist practice                           |
| Inclusion barriers       | Hotspot risk lens                            |
| Accountability in action | Process loop                                 |
| Field decision-making    | Scenario decision                            |
| Feedback response        | Scenario risk-response                       |
| Portfolio output         | Participation and accountability action plan |

## Module 5 — HRBA in MEAL

| Learning need           | Recommended blocks               |
| ----------------------- | -------------------------------- |
| HRBA indicators         | Concept split, sorting           |
| Feedback loops          | Process loop                     |
| Safe data               | Scenario decision, safety note   |
| Learning and adaptation | Checklist practice               |
| Portfolio output        | HRBA MEAL reflection/action plan |

## Final Assessment

| Learning need                | Recommended blocks      |
| ---------------------------- | ----------------------- |
| Scenario judgment            | Final assessment item   |
| Actor/responsibility mapping | Matching                |
| HRBA principle application   | Multiple response       |
| Safe practice                | Scenario decision       |
| Completion                   | Course completion block |

---

# 24. Implementation rules for coding agents

Coding agents must:

1. use this block library;
2. use approved variants;
3. preserve tokenized styling;
4. implement accessibility behavior;
5. implement completion rules exactly;
6. keep HRBA safety rules visible where needed;
7. report when a needed block pattern is missing;
8. avoid creating one-off block styles.

Coding agents must not:

1. invent new block families;
2. create custom interaction patterns without approval;
3. change the visual style of a block per screen;
4. use drag/drop without alternatives;
5. mark blocks complete before feedback is viewed;
6. ask learners for sensitive real examples;
7. introduce unapproved colors, typography, or card styles;
8. overuse one block type across many screens.

---

# 25. QA checklist for block implementation

Before approving a block component, check:

| QA item                          | Required result |
| -------------------------------- | --------------- |
| Uses approved token styles       | Pass            |
| Matches approved block variant   | Pass            |
| Learner action is clear          | Pass            |
| Completion rule works            | Pass            |
| Feedback appears where required  | Pass            |
| Keyboard navigation works        | Pass            |
| Focus state is visible           | Pass            |
| Screen-reader labels are present | Pass            |
| Mobile behavior works            | Pass            |
| No color-only meaning            | Pass            |
| Safety note appears where needed | Pass            |
| No sensitive disclosure required | Pass            |
| No console errors                | Pass            |
| Visual layout fits course canvas | Pass            |

---

# 26. Approval status

Status: Draft v1
Applies to: CSO Learning Hub HRBA course block library
Depends on:

```text
docs/design-system/01_FOUNDATION_TOKENS.md
docs/design-system/02_COURSE_PLAYER_SYSTEM.md
```

Next file:

```text
docs/design-system/04_SCREEN_TEMPLATE_LIBRARY.md
```
