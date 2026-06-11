# CSO Learning Hub HRBA Course Design System

## 05 — Interaction Logic Patterns

## 1. Purpose

This document defines the approved interaction logic patterns for the CSO Learning Hub HRBA e-learning course.

Interaction logic means what happens when learners:

* click;
* select;
* reveal;
* sort;
* match;
* submit;
* retry;
* save;
* skip;
* complete;
* move forward;
* return to a screen;
* use keyboard or mobile navigation.

This file exists to prevent coding agents from improvising inconsistent behaviors across modules and screens.

Coding agents must use these approved interaction patterns when implementing learning blocks and screen templates.

This file builds on:

```text
docs/design-system/01_FOUNDATION_TOKENS.md
docs/design-system/02_COURSE_PLAYER_SYSTEM.md
docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
docs/design-system/04_SCREEN_TEMPLATE_LIBRARY.md
```

---

## 2. Core interaction principle

Every interaction must serve a learning purpose.

An interaction should not exist only because it looks modern or animated.

Each interaction must help the learner do at least one of the following:

| Purpose  | Learner does                                |
| -------- | ------------------------------------------- |
| Notice   | Sees something previously hidden            |
| Compare  | Distinguishes weak and strong practice      |
| Decide   | Chooses what to do in a realistic situation |
| Classify | Sorts examples into meaningful categories   |
| Sequence | Places steps in correct order               |
| Reflect  | Connects learning to safe CSO practice      |
| Apply    | Produces a practical output                 |
| Check    | Tests understanding and receives feedback   |
| Complete | Confirms progress and moves forward         |

---

## 3. Standard interaction lifecycle

Every required interaction should follow this lifecycle.

```text
Instruction
→ Learner action
→ System response
→ Feedback / reveal / state update
→ Completion state
→ Continue enabled
```

Example:

```text
Instruction: Choose the response that best reflects an HRBA lens.
→ Learner selects one answer.
→ System marks the selected answer.
→ Feedback appears explaining why the choice is strong, incomplete, or risky.
→ Screen completion state becomes complete.
→ Continue button becomes enabled.
```

Coding agents must not skip feedback for required practice or assessment interactions.

---

## 4. Interaction state model

Each screen and block may use the following state model.

```ts
type InteractionState = {
  screenId: string;
  blockId: string;
  status:
    | "not-started"
    | "in-progress"
    | "completed"
    | "optional-skipped"
    | "needs-retry";
  selectedOptionIds?: string[];
  openedPanelIds?: string[];
  viewedTabIds?: string[];
  flippedCardIds?: string[];
  viewedHotspotIds?: string[];
  sortedItems?: Record<string, string>;
  checklistResponses?: Record<string, boolean | string>;
  textResponse?: string;
  savedAt?: string;
  attemptCount?: number;
  feedbackViewed?: boolean;
};
```

Only use the state fields needed by the interaction.

---

## 5. Completion rule model

Each required screen must define a completion rule.

Use the standard rule IDs from the block and screen template libraries.

| Rule ID                              | Meaning                                         |
| ------------------------------------ | ----------------------------------------------- |
| `viewed-and-continued`               | Learner viewed screen and clicked Continue      |
| `all-panels-opened`                  | All required accordion panels opened            |
| `all-tabs-viewed`                    | All required tabs viewed                        |
| `all-cards-flipped`                  | All required flashcards flipped                 |
| `all-hotspots-viewed`                | All required hotspots viewed                    |
| `choice-selected-feedback-viewed`    | Scenario choice selected and feedback viewed    |
| `activity-submitted-feedback-viewed` | Practice activity submitted and feedback viewed |
| `answer-submitted-feedback-viewed`   | Knowledge check submitted and feedback viewed   |
| `reflection-saved-or-skipped`        | Reflection saved or optional skip selected      |
| `portfolio-required-fields-saved`    | Required portfolio fields saved                 |
| `resource-opened`                    | Required resource opened/downloaded             |
| `module-finished`                    | Module completion action selected               |
| `course-finished`                    | Course completion action selected               |

Coding agents must not invent new completion rules unless explicitly instructed.

---

# 6. Navigation and completion gating

## 6.1 Default navigation behavior

The bottom navigation must show:

* Back;
* Continue or Next;
* completion requirement where needed.

Default behavior:

| Screen type                     | Continue behavior                                            |
| ------------------------------- | ------------------------------------------------------------ |
| Passive concept screen          | Continue enabled                                             |
| Required reveal screen          | Continue disabled until required reveal is complete          |
| Required scenario decision      | Continue disabled until feedback is viewed                   |
| Required sorting/check activity | Continue disabled until submitted and feedback viewed        |
| Knowledge check                 | Continue disabled until answer submitted and feedback viewed |
| Optional reflection             | Continue enabled after Save or Skip                          |
| Required portfolio              | Continue disabled until required fields saved                |
| Module completion               | Finish module button enabled                                 |

## 6.2 Disabled Continue behavior

When Continue is disabled, the interface must explain why.

Examples:

```text
Open each item to continue.
```

```text
Choose a response and review the feedback to continue.
```

```text
Save your response or choose “Skip for now” to continue.
```

```text
Complete the required fields to continue.
```

Do not leave a disabled button unexplained.

## 6.3 Returning to completed screens

When a learner returns to a completed screen:

* preserve previous selections where appropriate;
* show completed state;
* keep Continue enabled;
* allow review of feedback;
* allow editing only where the interaction type supports it.

Do not reset completed screens unless the learner explicitly chooses “Try again,” “Reset,” or “Edit.”

---

# 7. Click-to-reveal pattern

## 7.1 Purpose

Use when learners reveal short pieces of information progressively.

Examples:

* accordion panels;
* tabs;
* flashcards;
* hotspots;
* process steps.

## 7.2 Standard behavior

```text
Learner selects reveal item
→ Item becomes active/open/viewed
→ Related content appears
→ Viewed state is saved
→ Completion is checked
→ Continue is enabled when required items are viewed
```

## 7.3 Required viewed-state behavior

Each reveal item must have one of these states:

| State     | Meaning                          |
| --------- | -------------------------------- |
| Default   | Not yet viewed                   |
| Active    | Currently open/selected          |
| Viewed    | Opened at least once             |
| Completed | Required item viewed and counted |

## 7.4 Completion variants

| Variant           | Completion behavior                                     |
| ----------------- | ------------------------------------------------------- |
| Required all      | All panels/tabs/cards/hotspots must be viewed           |
| Required selected | Only specified required items must be viewed            |
| Optional explore  | Continue is always enabled, but viewed state is tracked |
| Minimum count     | Learner must view at least a defined number of items    |

Default:

```text
Required all
```

unless the screen specification says otherwise.

---

# 8. Accordion interaction logic

## 8.1 Use

Use for progressive reveal of 3–6 related ideas.

## 8.2 Standard behavior

* Multiple panels may be open unless screen spec says single-open.
* Opening a panel marks it as viewed.
* Viewed panel may show a subtle check or viewed marker.
* Continue is enabled when required panels are viewed.

## 8.3 Keyboard behavior

* Each panel header must be focusable.
* Enter or Space toggles the panel.
* Expanded/collapsed state must be announced.
* Tab order must move logically through headers and open content.

## 8.4 Completion logic

```ts
completionRule = "all-panels-opened";
completed = requiredPanelIds.every(id => openedPanelIds.includes(id));
```

## 8.5 Anti-patterns

Do not:

* place long paragraphs in panels;
* use more than 6 panels;
* nest accordions;
* hide core learning in optional panels if required for assessment.

---

# 9. Tabs interaction logic

## 9.1 Use

Use for comparison between categories, actors, phases, or perspectives.

## 9.2 Standard behavior

* Selecting a tab makes it active.
* Active tab content appears.
* Viewed tab is tracked.
* Continue is enabled when required tabs are viewed.

## 9.3 Keyboard behavior

* Tabs should use accessible tab semantics where feasible.
* Left/right arrows move between tabs on desktop where implemented.
* Enter or Space activates a focused tab.
* Active tab must be visually and programmatically clear.

## 9.4 Completion logic

```ts
completionRule = "all-tabs-viewed";
completed = requiredTabIds.every(id => viewedTabIds.includes(id));
```

## 9.5 Mobile behavior

On mobile, tabs may become:

* stacked segmented buttons;
* accordion-like sections;
* horizontal scroll tabs only if labels remain readable.

Do not create tiny, hard-to-tap tab labels.

---

# 10. Flashcard interaction logic

## 10.1 Use

Use for term/example, mistake/fix, principle/action, or actor/role reveal.

## 10.2 Standard behavior

```text
Learner selects card
→ Card flips or reveals back content
→ Card is marked viewed
→ Completion is checked
```

## 10.3 Accessibility behavior

* Cards must be buttons or keyboard-operable controls.
* Flip state must not hide content from screen readers.
* Back content must be available to assistive technology.
* Avoid motion-heavy flip animations; respect reduced-motion preference.

## 10.4 Completion logic

```ts
completionRule = "all-cards-flipped";
completed = requiredCardIds.every(id => flippedCardIds.includes(id));
```

## 10.5 Mobile behavior

On mobile, use tap-to-reveal rather than hover.

Do not use hover-only behavior.

---

# 11. Hotspot interaction logic

## 11.1 Use

Use when learners inspect a scene, diagram, map, or model.

## 11.2 Standard behavior

```text
Learner selects hotspot
→ Hotspot becomes active
→ Reveal panel opens
→ Hotspot is marked viewed
→ Completion is checked
```

## 11.3 Required elements

Every hotspot interaction must include:

| Element                 | Requirement                  |
| ----------------------- | ---------------------------- |
| Visual image/diagram    | Required                     |
| Hotspot controls        | Required                     |
| Reveal panel            | Required                     |
| Accessible hotspot list | Required                     |
| Alt text                | Required                     |
| Long description        | Required for complex visuals |

## 11.4 Completion logic

```ts
completionRule = "all-hotspots-viewed";
completed = requiredHotspotIds.every(id => viewedHotspotIds.includes(id));
```

## 11.5 Mobile behavior

On mobile:

* show the image;
* provide a numbered or labeled hotspot list below the image;
* selecting a list item reveals the same content;
* do not require precise tapping on tiny visual points.

## 11.6 Accessibility behavior

* Hotspots must be keyboard reachable.
* Each hotspot must have an accessible label.
* Hotspot meaning must not depend on color or position alone.
* The accessible list must provide an equivalent path.

## 11.7 Anti-patterns

Do not:

* use tiny hotspots;
* use more than 6 hotspots without strong reason;
* require hover;
* use real sensitive images;
* make visual recognition the only way to complete the activity.

---

# 12. Scenario decision logic

## 12.1 Use

Use when learners make a practical HRBA judgment.

## 12.2 Standard behavior

```text
Learner reads scenario
→ Learner selects response
→ Selected response becomes visually active
→ Feedback appears
→ Feedback is marked viewed
→ Completion state becomes complete
→ Continue is enabled
```

## 12.3 Choice states

| State    | Meaning                                                 |
| -------- | ------------------------------------------------------- |
| Default  | Not selected                                            |
| Selected | Learner selected this choice                            |
| Strong   | Strong HRBA-aligned response                            |
| Partial  | Partly correct but incomplete                           |
| Risky    | Weak or unsafe response                                 |
| Disabled | Not selectable after submission unless retry is allowed |

## 12.4 Feedback structure

Each feedback response must include:

1. direct response to learner choice;
2. HRBA principle involved;
3. practical explanation;
4. better or safer practice where needed.

Example structure:

```text
This is a stronger response because it looks beyond activity delivery and asks who may be excluded. It reflects participation and non-discrimination. In practice, the CSO should check whether women, persons with disabilities, displaced households, and other less-heard groups can safely influence the process.
```

## 12.5 Completion logic

```ts
completionRule = "choice-selected-feedback-viewed";
completed = selectedOptionIds.length > 0 && feedbackViewed === true;
```

## 12.6 Retry behavior

Retry may be allowed for practice scenarios.

If retry is allowed:

* show “Try again” after feedback;
* preserve attempt count;
* do not shame the learner;
* show improved feedback after second attempt where possible.

If retry is not allowed:

* allow learner to review feedback;
* Continue remains enabled after feedback.

## 12.7 Anti-patterns

Do not:

* make the answer too obvious;
* use unrealistic choices;
* give only “Correct/Incorrect”;
* use politically sensitive identifiable scenarios;
* blame communities;
* suggest CSOs should replace duty-bearers.

---

# 13. Sorting activity logic

## 13.1 Use

Use when learners classify examples into categories.

## 13.2 Standard behavior

```text
Learner assigns each item to a category
→ Learner clicks Check / Submit
→ System evaluates responses
→ Feedback appears
→ Completion state becomes complete when feedback is viewed
```

## 13.3 Input methods

Sorting must support at least one accessible alternative to drag-and-drop:

| Input method                           | Required?                         |
| -------------------------------------- | --------------------------------- |
| Drag-and-drop                          | Optional                          |
| Tap item → choose category             | Required for mobile/accessibility |
| Keyboard select item → choose category | Required where feasible           |
| Dropdown category per item             | Acceptable alternative            |

## 13.4 Feedback types

| Feedback type    | Use                                |
| ---------------- | ---------------------------------- |
| Full feedback    | Explains each item                 |
| Summary feedback | Shows categories correct/incorrect |
| Corrected model  | Shows recommended classification   |
| Retry feedback   | Allows learner to revise           |

## 13.5 Completion logic

```ts
completionRule = "activity-submitted-feedback-viewed";
completed = submitted === true && feedbackViewed === true;
```

## 13.6 Partial correctness

For practice activities, partial correctness should be treated as learning.

Use feedback such as:

```text
You identified some important elements. Review the items marked for improvement and notice how HRBA connects needs, rights, responsibilities, and barriers.
```

## 13.7 Anti-patterns

Do not:

* require drag-and-drop only;
* reset all answers without warning;
* use categories that overlap too much unless the learning purpose is to discuss ambiguity;
* mark completion before feedback is viewed.

---

# 14. Checklist practice logic

## 14.1 Use

Use when learners review a plan, scenario, or practice against HRBA quality criteria.

## 14.2 Standard behavior

```text
Learner reviews checklist items
→ Learner selects yes/no/not sure or checks relevant items
→ System shows summary or guidance
→ Completion state updates
```

## 14.3 Response options

Approved response patterns:

| Pattern                                    | Use                 |
| ------------------------------------------ | ------------------- |
| Checkbox                                   | Simple confirmation |
| Yes / No / Not sure                        | Quality review      |
| Strong / Needs improvement / Missing       | Scenario review     |
| Risk present / Risk not clear              | Risk review         |
| Included / Not included / Needs adaptation | Inclusion review    |

## 14.4 Completion logic

Use one of:

```text
viewed-and-continued
activity-submitted-feedback-viewed
```

If checklist is reflective and non-scored:

```ts
completed = learnerReviewed === true || continueClicked === true;
```

If checklist requires submission:

```ts
completed = submitted === true && feedbackViewed === true;
```

## 14.5 Safety logic

If the checklist asks learners to think about their own CSO practice, include:

```text
Use a general or anonymized example. Do not include names, complaint details, active disputes, or sensitive information.
```

## 14.6 Anti-patterns

Do not:

* make checklist items too vague;
* require disclosure of sensitive organizational details;
* use checklists as decoration;
* include too many items on one screen.

---

# 15. Process step logic

## 15.1 Use

Use for sequences, cycles, and loops.

## 15.2 Standard behavior

For static process:

```text
Learner views process
→ Continue is enabled
```

For interactive process:

```text
Learner selects step
→ Step detail appears
→ Step is marked viewed
→ Completion is checked
```

## 15.3 Completion logic

Static process:

```text
viewed-and-continued
```

Interactive process:

```ts
completionRule = "all-steps-viewed";
completed = requiredStepIds.every(id => viewedStepIds.includes(id));
```

## 15.4 Mobile behavior

Horizontal desktop processes should become vertical step lists on mobile.

## 15.5 Anti-patterns

Do not:

* overload a process with long paragraphs;
* use many steps when a checklist would be better;
* animate steps in a way that hides content.

---

# 16. Knowledge check logic

## 16.1 Use

Use to check understanding and practical HRBA judgment.

## 16.2 Standard behavior

```text
Learner reads question
→ Learner selects answer(s)
→ Learner clicks Check answer
→ Feedback appears
→ Completion state updates after feedback is viewed
→ Continue is enabled
```

## 16.3 Question types

Approved types:

| Type                | Use                      |
| ------------------- | ------------------------ |
| Single choice       | One best answer          |
| Multiple response   | Select all that apply    |
| Matching            | Match concepts or actors |
| Sequencing          | Order steps              |
| Scenario judgment   | Apply HRBA to situation  |
| Misconception check | Identify weak assumption |

## 16.4 Feedback rules

Every knowledge check must include:

* correct/incorrect or strength indication;
* explanation;
* HRBA link;
* practical takeaway.

Do not use feedback that only says:

```text
Correct.
```

or:

```text
Incorrect.
```

## 16.5 Completion logic

```ts
completionRule = "answer-submitted-feedback-viewed";
completed = submitted === true && feedbackViewed === true;
```

## 16.6 Retry logic

For ungraded knowledge checks:

* retry may be allowed;
* feedback should support learning;
* score should not feel punitive.

For final assessment:

* retry rules must follow final assessment specification;
* do not improvise retake logic inside the component.

## 16.7 Anti-patterns

Do not:

* ask only recall questions;
* make wrong answers silly or obvious;
* provide no explanation;
* use trick wording;
* ask for sensitive real-world examples.

---

# 17. Reflection logic

## 17.1 Use

Use when learners connect content to their own work safely.

## 17.2 Standard behavior

```text
Learner reads prompt and safety note
→ Learner writes response or selects rating
→ Learner clicks Save reflection
→ Save status appears
→ Completion state updates
→ Continue is enabled
```

If optional:

```text
Learner may choose Skip for now
→ Screen state becomes optional-skipped
→ Continue is enabled
```

## 17.3 Safe reflection pattern

Reflection prompts must avoid sensitive disclosure.

Use:

```text
Think of a general pattern you have seen. You may use a fictional or anonymized example.
```

Do not use:

```text
Describe a real complaint from your organization.
```

## 17.4 Completion logic

```ts
completionRule = "reflection-saved-or-skipped";
completed = responseSaved === true || optionalSkipped === true;
```

## 17.5 Save behavior

When saved, show:

```text
Saved. You can return and edit this later.
```

If not saved, show:

```text
Your response is not saved yet.
```

## 17.6 Character guidance

Reflection fields should usually be short.

Recommended:

| Reflection type              | Suggested length         |
| ---------------------------- | ------------------------ |
| Short note                   | 250–400 characters       |
| Action commitment            | 1–2 sentences            |
| Portfolio-related reflection | 500–800 characters       |
| Private journal              | Flexible, but still safe |

## 17.7 Anti-patterns

Do not:

* require personal trauma stories;
* require complaint details;
* require politically sensitive examples;
* make certificate completion depend on sensitive disclosure;
* show learner text publicly unless explicitly designed and consented.

---

# 18. Portfolio builder logic

## 18.1 Use

Use when learners create a practical output.

## 18.2 Standard behavior

```text
Learner reads purpose and safety note
→ Learner completes guided fields
→ Learner saves draft or required output
→ System shows saved state
→ Completion updates when required fields are saved
```

## 18.3 Required fields

Each portfolio builder must define:

```ts
type PortfolioField = {
  fieldId: string;
  label: string;
  helperText?: string;
  required: boolean;
  safetyNote?: string;
  maxLength?: number;
};
```

## 18.4 Completion logic

```ts
completionRule = "portfolio-required-fields-saved";
completed = requiredFields.every(field => savedResponses[field.fieldId]?.trim().length > 0);
```

## 18.5 Draft behavior

If draft saving is allowed:

* learner can save incomplete work;
* screen may show “Draft saved”;
* Continue may remain disabled if required completion is not met;
* or Continue may be enabled if screen spec allows draft completion.

The screen spec must define which behavior applies.

## 18.6 Export behavior

If export/download is implemented:

* export only learner-approved content;
* include safety reminder;
* avoid storing sensitive details;
* use clear file naming.

Example file name:

```text
hrba-rights-mapping-worksheet.pdf
```

## 18.7 Anti-patterns

Do not:

* require real names or organizations;
* require confidential project documents;
* force long writing;
* make export the only way to complete the screen;
* collect more data than needed for learning.

---

# 19. Safety note logic

## 19.1 Use

Use before any interaction that may invite sensitive thinking or writing.

## 19.2 Standard behavior

Safety notes should be visible before the learner writes or chooses.

They should not be hidden in a tooltip.

## 19.3 Standard text

```text
Use a fictional, general, or anonymized example. Do not include names, complaint details, active disputes, or sensitive information.
```

## 19.4 Stronger civic-space caution

Use when the topic involves power, advocacy, civic space, complaints, or accountability risks.

```text
Keep your response general and safe. Do not name people, organizations, officials, locations, active disputes, or sensitive incidents.
```

## 19.5 Completion logic

Safety notes usually do not define completion.

They support safe completion of another block.

---

# 20. Feedback panel logic

## 20.1 Use

Use after learner choices, checks, scenario responses, and practice activities.

## 20.2 Feedback panel states

| State              | Use                                         |
| ------------------ | ------------------------------------------- |
| `feedback-success` | Strong/correct response                     |
| `feedback-partial` | Partly correct/incomplete                   |
| `feedback-caution` | Risky or unsafe response                    |
| `feedback-info`    | Neutral explanation                         |
| `feedback-error`   | Technical error or clearly incorrect answer |

## 20.3 Feedback structure

Use this format where possible:

```text
[Direct response]
[Why this matters]
[HRBA principle or practice link]
[What to do next]
```

## 20.4 Visual behavior

* Feedback appears near the interaction.
* Feedback should not push the main button below the fold where possible.
* Feedback must be readable.
* Feedback must be available to screen readers.
* Use icon + text, not color alone.

---

# 21. Retry and reset logic

## 21.1 Try again

Use when practice is formative.

Behavior:

```text
Learner clicks Try again
→ Previous answer remains visible or resets depending on activity
→ Attempt count increases
→ Feedback may collapse or remain as guidance
```

## 21.2 Reset

Use only when learner clearly wants to clear all responses.

Behavior:

```text
Learner clicks Reset
→ Confirmation appears if data will be lost
→ Responses clear only after confirmation
```

## 21.3 Attempt count

Track attempt count for:

* knowledge checks;
* sorting activities;
* scenario practice where retry is enabled.

Do not use attempt count to shame learners.

## 21.4 Anti-patterns

Do not:

* reset without warning;
* hide previous feedback if it is needed for learning;
* punish repeated attempts in ungraded practice.

---

# 22. Save and persistence logic

## 22.1 What should persist

Persist:

* completed screens;
* viewed reveal items;
* selected scenario responses;
* knowledge check attempts where useful;
* reflection responses;
* portfolio outputs;
* progress state.

## 22.2 Save status

Use clear save status labels:

| State       | Label                      |
| ----------- | -------------------------- |
| Unsaved     | Not saved yet              |
| Saving      | Saving…                    |
| Saved       | Saved                      |
| Save failed | Could not save. Try again. |

## 22.3 Returning to saved screens

When learner returns:

* restore saved state;
* show completion status;
* allow editing where appropriate;
* do not force repeated completion unless explicitly required.

---

# 23. Mobile interaction alternatives

Every interactive block must work on mobile.

| Desktop interaction   | Mobile alternative                |
| --------------------- | --------------------------------- |
| Sidebar navigation    | Course menu drawer                |
| Horizontal tabs       | Segmented buttons or stacked tabs |
| Drag-and-drop sorting | Tap item → choose category        |
| Hotspot image         | Hotspot list below image          |
| Large process diagram | Vertical step list                |
| Two-column scenario   | Stacked scenario + choices        |
| Large card grid       | Swipe/stacked cards if accessible |
| Hover reveal          | Tap reveal                        |

Do not use hover-only interactions.

Do not require precise drag movement.

---

# 24. Keyboard interaction baseline

All interactions must be usable with keyboard.

Minimum keyboard rules:

| Control          | Keyboard behavior                                         |
| ---------------- | --------------------------------------------------------- |
| Button           | Enter/Space activates                                     |
| Accordion header | Enter/Space toggles                                       |
| Tabs             | Arrow keys and/or Tab + Enter/Space                       |
| Flashcard        | Enter/Space reveals                                       |
| Hotspot          | Tab to hotspot, Enter/Space activates                     |
| Sorting          | Select item, choose category via keyboard                 |
| Checkbox/radio   | Standard keyboard behavior                                |
| Text input       | Standard typing and focus                                 |
| Modal/drawer     | Focus trapped while open; Escape closes where appropriate |

Visible focus states are required.

---

# 25. Screen-reader behavior baseline

Interactive components must provide:

* meaningful labels;
* role/state where needed;
* selected/expanded/checked state;
* feedback announcements where feasible;
* logical heading structure;
* alt text and long descriptions for visuals.

Examples:

| Component       | Required screen-reader support                |
| --------------- | --------------------------------------------- |
| Accordion       | Expanded/collapsed state                      |
| Tabs            | Selected tab                                  |
| Hotspot         | Hotspot label and reveal content              |
| Sorting         | Item label and selected category              |
| Knowledge check | Question, choices, selected state, feedback   |
| Reflection      | Prompt, safety note, input label, save status |
| Portfolio       | Field labels, helper text, required state     |

---

# 26. Reduced motion behavior

If the learner prefers reduced motion:

* disable flip animations;
* reduce transitions;
* avoid sliding/zooming effects;
* keep reveal behavior instant or very subtle;
* preserve all information.

Motion must never be required to understand content.

---

# 27. HRBA-specific interaction safeguards

The following topics require extra caution:

| Topic                     | Required safeguard                           |
| ------------------------- | -------------------------------------------- |
| Complaints/accountability | Do not ask for real complaint details        |
| Exclusion/discrimination  | Use fictional/anonymized examples            |
| Civic space/advocacy      | Avoid naming actors or active disputes       |
| Power analysis            | Keep reflection general and safe             |
| Community feedback        | Avoid identifiable community stories         |
| Safeguarding              | Do not collect incident details              |
| MEAL data                 | Use safe, minimal, non-identifiable examples |

Use a safety note before learner input.

---

# 28. Standard interaction copy patterns

## 28.1 Instructions

Use:

```text
Choose the response that best reflects an HRBA lens.
```

```text
Explore each point to reveal what may be hidden.
```

```text
Sort each example into the category where it best fits.
```

```text
Review the scenario, then choose the safest responsible next step.
```

```text
Write one small, safe action your CSO could take.
```

Avoid:

```text
Click here.
```

```text
Read below.
```

```text
Submit your real organizational example.
```

## 28.2 Completion prompts

Use:

```text
You have viewed all required points. Continue when you are ready.
```

```text
Feedback reviewed. You can continue.
```

```text
Saved. You can return and edit this later.
```

```text
Complete the required fields to continue.
```

Avoid:

```text
Done.
```

```text
You failed.
```

```text
Invalid.
```

---

# 29. Error handling

## 29.1 Save failure

Use:

```text
Could not save your response. Please try again.
```

Do not delete learner input after save failure.

## 29.2 Missing required action

Use:

```text
Complete this step to continue.
```

or more specific:

```text
Open each required item to continue.
```

## 29.3 Technical error

Use:

```text
Something went wrong. Please try again or contact support if the problem continues.
```

Do not show raw technical errors to learners.

---

# 30. Implementation rules for coding agents

Coding agents must:

1. implement the exact interaction lifecycle;
2. use approved completion rule IDs;
3. preserve disabled Continue explanations;
4. save and restore state where required;
5. show feedback after learner actions;
6. support keyboard interaction;
7. support mobile alternatives;
8. use safety notes before sensitive reflection or portfolio input;
9. respect reduced-motion preferences;
10. report missing interaction logic before coding.

Coding agents must not:

1. invent new completion logic;
2. mark screens complete before required action and feedback;
3. use hover-only interactions;
4. use drag-and-drop only;
5. reset learner work without confirmation;
6. hide feedback below the fold;
7. ask for sensitive real examples;
8. use color alone to communicate state;
9. remove focus states;
10. improvise final assessment scoring rules.

---

# 31. QA checklist for interaction logic

Before approving an interaction, check:

| QA item                             | Required result |
| ----------------------------------- | --------------- |
| Learner instruction is clear        | Pass            |
| Learner action works                | Pass            |
| Feedback appears after action       | Pass            |
| Completion rule works               | Pass            |
| Continue gating works               | Pass            |
| Disabled Continue has explanation   | Pass            |
| State persists on return            | Pass            |
| Retry/reset works where included    | Pass            |
| Keyboard interaction works          | Pass            |
| Focus state is visible              | Pass            |
| Screen-reader labels/states present | Pass            |
| Mobile alternative works            | Pass            |
| Reduced motion respected            | Pass            |
| Safety note appears where needed    | Pass            |
| No sensitive disclosure required    | Pass            |
| No console errors                   | Pass            |

---

# 32. Approval status

Status: Draft v1
Applies to: CSO Learning Hub HRBA course interactions
Depends on:

```text
docs/design-system/01_FOUNDATION_TOKENS.md
docs/design-system/02_COURSE_PLAYER_SYSTEM.md
docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
docs/design-system/04_SCREEN_TEMPLATE_LIBRARY.md
```

Next file:

```text
docs/design-system/06_ACCESSIBILITY_AND_SAFETY_RULES.md
```
