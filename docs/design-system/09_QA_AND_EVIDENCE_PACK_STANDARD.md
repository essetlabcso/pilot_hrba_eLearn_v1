# CSO Learning Hub HRBA Course Design System

## 09 — QA and Evidence Pack Standard

## 1. Purpose

This document defines the quality assurance and evidence pack standard for the CSO Learning Hub HRBA e-learning course.

It applies to all implementation batches involving:

* course player components;
* reusable learning blocks;
* module screens;
* interactions;
* visual assets;
* reflection activities;
* portfolio activities;
* knowledge checks;
* final assessment items;
* accessibility fixes;
* responsive layout fixes;
* QA refinements.

The purpose is to make implementation review objective, evidence-based, and consistent.

Coding agents must return an evidence pack after every implementation batch. Reviewers should use this standard to decide whether a batch is approved, needs revision, or must be blocked.

This file builds on:

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

---

## 2. Core QA principle

A screen is not approved because it “looks good.”

A screen is approved only when it meets the agreed standards for:

1. content accuracy;
2. instructional purpose;
3. template alignment;
4. visual consistency;
5. interaction behavior;
6. completion logic;
7. accessibility;
8. mobile responsiveness;
9. HRBA safety;
10. technical stability;
11. evidence completeness.

The QA process should prevent subjective redesign cycles and keep implementation aligned with the deterministic course design system.

---

## 3. QA decision states

Every implementation batch must receive one of the following decisions.

| Decision                    | Meaning                                           | Next action                               |
| --------------------------- | ------------------------------------------------- | ----------------------------------------- |
| `approved`                  | Meets acceptance criteria with no blocking issues | Mark batch/screen as approved             |
| `approved-with-minor-notes` | Usable; only minor polish remains                 | Notes may be handled later                |
| `needs-revision`            | Important issues must be fixed before approval    | Return to agent with specific fixes       |
| `blocked`                   | Critical issue prevents use or review             | Stop and resolve blocker                  |
| `locked`                    | Approved and should not be redesigned             | Do not change unless explicitly requested |

---

## 4. Issue severity levels

Use consistent severity labels.

| Severity   | Meaning                                                       | Examples                                                                                     |
| ---------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `critical` | Prevents learner use, safety, completion, or course integrity | Broken navigation, inaccessible required interaction, unsafe real-data prompt, runtime crash |
| `high`     | Seriously weakens learning, accessibility, or consistency     | Wrong template, missing feedback, mobile unusable, no keyboard path                          |
| `medium`   | Noticeable issue that should be fixed                         | Visual imbalance, unclear instruction, weak feedback, spacing inconsistency                  |
| `low`      | Minor polish issue                                            | Small alignment issue, minor wording improvement, slight spacing refinement                  |

### 4.1 Critical issue rule

A batch cannot be approved if any critical issue remains.

### 4.2 High issue rule

A batch should not be approved if high issues affect required learner actions, accessibility, HRBA safety, or completion.

---

## 5. QA layers

Every implemented batch should be checked across ten QA layers.

| QA layer                   | Core question                                                           |
| -------------------------- | ----------------------------------------------------------------------- |
| 1. Scope                   | Did the agent implement only the assigned work?                         |
| 2. Content                 | Is learner-facing content accurate and approved?                        |
| 3. Instructional design    | Does the screen create a clear learning moment?                         |
| 4. Design-system alignment | Does it use approved templates and tokens?                              |
| 5. Interaction logic       | Does learner action, feedback, and completion work?                     |
| 6. Accessibility           | Can learners use it with keyboard, screen reader, and low-vision needs? |
| 7. HRBA safety             | Does it avoid unsafe disclosure and harmful framing?                    |
| 8. Visual assets           | Are images/icons appropriate, registered, safe, and accessible?         |
| 9. Responsive behavior     | Does it work on desktop, tablet, and mobile?                            |
| 10. Technical quality      | Does it run without errors or regressions?                              |

---

# Part A — Evidence Pack Standard

---

## 6. Required evidence pack after every implementation batch

Every implementation batch must return the following evidence.

```md
## Evidence Pack

### 1. Summary of work completed
[Brief summary.]

### 2. Assigned scope
[What the task asked for.]

### 3. Changed files
- [file path]
- [file path]

### 4. Screens/components affected
- [Screen ID or component name]

### 5. Design-system references followed
- 01_FOUNDATION_TOKENS.md
- 02_COURSE_PLAYER_SYSTEM.md
- 03_BLOCK_TEMPLATE_LIBRARY.md
- 04_SCREEN_TEMPLATE_LIBRARY.md
- 05_INTERACTION_LOGIC_PATTERNS.md
- 06_ACCESSIBILITY_AND_SAFETY_RULES.md
- 07_VISUAL_ASSET_RULES.md
- 08_AGENT_IMPLEMENTATION_RULES.md

### 6. Implementation notes
[Key technical/design decisions.]

### 7. Verification performed
- [Command/check]
- [Command/check]

### 8. Desktop layout check
[Pass/fail/notes.]

### 9. Mobile layout check
[Pass/fail/notes.]

### 10. Accessibility notes
[Keyboard, focus, labels, alt text, reduced motion, etc.]

### 11. HRBA safety notes
[Where relevant.]

### 12. Visual asset notes
[Assets added/used/changed and alt text notes.]

### 13. Known issues
[None known / list issues.]

### 14. Acceptance criteria checklist
- [x] ...
- [ ] ...
```

---

## 7. Evidence required by task type

### 7.1 Documentation-only task

Required evidence:

| Evidence                            | Required |
| ----------------------------------- | -------- |
| File path created/updated           | Yes      |
| Confirmation no source code changed | Yes      |
| Markdown formatting notes           | Yes      |
| Summary of documented rule/decision | Yes      |

### 7.2 Component implementation task

Required evidence:

| Evidence                 | Required |
| ------------------------ | -------- |
| Component files changed  | Yes      |
| Props/data model notes   | Yes      |
| Token usage confirmation | Yes      |
| Accessibility notes      | Yes      |
| Mobile/responsive notes  | Yes      |
| Tests/checks run         | Yes      |
| Known issues             | Yes      |

### 7.3 Screen implementation task

Required evidence:

| Evidence                          | Required       |
| --------------------------------- | -------------- |
| Screen IDs implemented            | Yes            |
| Template IDs used                 | Yes            |
| Block types used                  | Yes            |
| Completion rules implemented      | Yes            |
| Desktop screenshot or visual note | Yes            |
| Mobile screenshot or visual note  | Yes            |
| Accessibility notes               | Yes            |
| HRBA safety notes                 | Where relevant |
| Known issues                      | Yes            |
| Acceptance checklist              | Yes            |

### 7.4 Visual asset task

Required evidence:

| Evidence                 | Required           |
| ------------------------ | ------------------ |
| Assets added/changed     | Yes                |
| File paths               | Yes                |
| Screens where used       | Yes                |
| Asset register update    | Where applicable   |
| Alt text                 | Yes, if meaningful |
| Long description         | If complex visual  |
| Safety confirmation      | Yes                |
| Desktop/mobile fit notes | Yes                |

### 7.5 Interaction task

Required evidence:

| Evidence                   | Required       |
| -------------------------- | -------------- |
| Interaction type           | Yes            |
| Learner action             | Yes            |
| Feedback behavior          | Yes            |
| Completion rule            | Yes            |
| Disabled Continue behavior | Where relevant |
| Retry/reset behavior       | Where relevant |
| Keyboard behavior          | Yes            |
| Mobile alternative         | Yes            |
| State persistence notes    | Where relevant |

### 7.6 Assessment task

Required evidence:

| Evidence                             | Required         |
| ------------------------------------ | ---------------- |
| Question IDs/screens                 | Yes              |
| Assessment type                      | Yes              |
| Scoring rule                         | Yes              |
| Pass/retake rule                     | Where applicable |
| Feedback rule                        | Yes              |
| Safety check                         | Yes              |
| Completion behavior                  | Yes              |
| No sensitive disclosure confirmation | Yes              |

---

# Part B — QA Checklists

---

## 8. Scope QA checklist

| Check                                                | Pass criteria                                              |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| Assigned scope completed                             | All requested screens/components/files are addressed       |
| No unrelated changes                                 | No unrelated pages, modules, routes, or components changed |
| No broad refactor                                    | Agent did not restructure unrelated code                   |
| No unapproved dependency                             | No package added without approval                          |
| No source-code change during documentation-only task | Confirmed                                                  |
| Missing specs reported                               | Agent stopped/reported instead of guessing                 |

---

## 9. Content QA checklist

| Check                                | Pass criteria                                         |
| ------------------------------------ | ----------------------------------------------------- |
| Uses approved learner-facing content | Text matches screen spec                              |
| No invented content                  | Agent did not create unsupported HRBA explanations    |
| Plain language                       | Learner-facing text is clear and practical            |
| Local CSO relevance                  | Examples make sense for local CSO practice            |
| No excessive legalism                | Content is not unnecessarily legalistic               |
| No content truncation                | Meaning is not lost to fit layout                     |
| No placeholder text                  | No lorem ipsum or unresolved placeholders             |
| Module flow preserved                | Screen supports the previous and next learning moment |

---

## 10. Instructional design QA checklist

| Check                                 | Pass criteria                                       |
| ------------------------------------- | --------------------------------------------------- |
| Screen has one clear learning purpose | Purpose is evident                                  |
| Learner action is clear               | Learner knows what to do                            |
| Cognitive load is manageable          | No overloaded screen                                |
| Interaction supports learning         | Interaction is not decorative                       |
| Feedback supports learning            | Feedback explains why                               |
| Screen prepares next step             | Flow is coherent                                    |
| Practice is realistic                 | Activity reflects CSO work                          |
| Knowledge check tests judgment        | Not only recall or obvious answer                   |
| Reflection is safe and useful         | Prompt supports application without disclosure risk |
| Portfolio output is practical         | Output can support real learning/work               |

---

## 11. Design-system alignment QA checklist

| Check                         | Pass criteria                                              |
| ----------------------------- | ---------------------------------------------------------- |
| Foundation tokens used        | Colors, typography, spacing, radius, shadows follow tokens |
| Course player preserved       | Top bar, sidebar, canvas, bottom nav consistent            |
| Approved screen template used | Screen matches template library                            |
| Approved block templates used | Blocks match block library                                 |
| No arbitrary visual style     | No random colors, gradients, fonts, shadows                |
| No custom one-off layout      | Unless explicitly approved                                 |
| Visual hierarchy is clear     | Title, instruction, action, feedback visible               |
| Screen fit status respected   | `fit-required` or `scroll-permitted` followed              |
| White-space balanced          | No large empty areas without purpose                       |
| Button styles consistent      | Primary/secondary/disabled styles match system             |

---

## 12. Interaction QA checklist

| Check                          | Pass criteria                                           |
| ------------------------------ | ------------------------------------------------------- |
| Interaction lifecycle complete | Instruction → action → response → feedback → completion |
| Completion rule implemented    | Uses approved rule ID                                   |
| Continue gating works          | Continue enabled/disabled correctly                     |
| Disabled state explained       | Learner knows what is required                          |
| Feedback appears after action  | Required feedback is shown                              |
| Feedback is useful             | Explains HRBA reasoning/practical implication           |
| State persists                 | Returning to screen restores state where needed         |
| Retry/reset works              | Where included, behavior is safe and clear              |
| Required items tracked         | Panels/tabs/cards/hotspots tracked correctly            |
| No completion before feedback  | Required feedback must be viewed first                  |

---

## 13. Accessibility QA checklist

| Check                                  | Pass criteria                                             |
| -------------------------------------- | --------------------------------------------------------- |
| Keyboard navigation works              | Learner can complete required interaction without mouse   |
| Focus state visible                    | Clear focus ring/indicator                                |
| Focus order logical                    | Follows screen structure                                  |
| Screen transition focus works          | Focus moves to screen title/main content                  |
| Semantic HTML used                     | Buttons, headings, forms, lists are appropriate           |
| Labels present                         | Inputs, buttons, hotspots, choices have meaningful labels |
| Interactive states communicated        | Selected/expanded/checked/current states clear            |
| Feedback accessible                    | Feedback text is available to assistive tech              |
| No color-only meaning                  | Text/icon/state used with color                           |
| Images have alt/decorative handling    | Meaningful images described                               |
| Complex visuals have long descriptions | Diagrams/hotspots described                               |
| Video/audio alternatives present       | Captions/transcripts where relevant                       |
| Reduced motion respected               | No essential motion-only meaning                          |
| Tap targets usable                     | Mobile controls large enough where possible               |
| Drag/drop alternative provided         | Tap/keyboard alternative exists                           |

---

## 14. HRBA safety QA checklist

| Check                                         | Pass criteria                                   |
| --------------------------------------------- | ----------------------------------------------- |
| Scenario is fictional/generalized             | No identifiable real situation                  |
| No real names requested                       | People/organizations not requested              |
| No complaint details requested                | Learner is not asked to disclose complaints     |
| No safeguarding incident details requested    | Real incidents not requested                    |
| No politically sensitive disclosure requested | Prompt avoids naming actors/disputes            |
| Safety note appears before sensitive input    | Visible and clear                               |
| Reflection prompt is safe                     | Allows fictional/general/anonymized response    |
| Portfolio fields are safe                     | No confidential project/community data required |
| Feedback is non-shaming                       | Constructive and practical                      |
| CSO role is clear                             | Does not replace duty-bearers                   |
| Communities framed with dignity               | No passive/pity framing                         |
| Visuals are safe                              | No identifiable/sensitive imagery               |
| Assessment is safe                            | No sensitive disclosure required                |
| Language is non-accusatory                    | Avoids legalistic blame                         |

---

## 15. Visual asset QA checklist

| Check                             | Pass criteria                               |
| --------------------------------- | ------------------------------------------- |
| Asset supports learning purpose   | Not decorative filler                       |
| Asset path correct                | File loads correctly                        |
| Asset naming follows rules        | Lowercase snake_case/versioning             |
| Asset registered                  | Included in asset register where applicable |
| Visual style consistent           | Matches premium HRBA course direction       |
| Local relevance appropriate       | Respectful and non-stereotyped              |
| No unsafe content                 | No sensitive/identifiable details           |
| No unintended readable text/logos | Image is clean                              |
| Aspect ratio preserved            | No stretching/distortion                    |
| Cropping intentional              | Learning cues remain visible                |
| Alt text provided                 | If meaningful                               |
| Long description provided         | If complex                                  |
| Hotspot alternative provided      | If interactive                              |
| File size reasonable              | Does not harm performance                   |
| Mobile layout works               | Image remains usable on small screen        |

---

## 16. Responsive QA checklist

| Check                          | Desktop | Tablet | Mobile |
| ------------------------------ | ------- | ------ | ------ |
| Layout fits intended canvas    | Pass    | Pass   | Pass   |
| Text readable                  | Pass    | Pass   | Pass   |
| Buttons usable                 | Pass    | Pass   | Pass   |
| Navigation works               | Pass    | Pass   | Pass   |
| Sidebar/drawer behavior works  | Pass    | Pass   | Pass   |
| Interaction usable             | Pass    | Pass   | Pass   |
| Hotspot/list alternative works | Pass    | Pass   | Pass   |
| Sorting/tap alternative works  | Pass    | Pass   | Pass   |
| No horizontal overflow         | Pass    | Pass   | Pass   |
| No hidden primary action       | Pass    | Pass   | Pass   |
| Visuals crop correctly         | Pass    | Pass   | Pass   |

---

## 17. Technical QA checklist

| Check                          | Pass criteria                                  |
| ------------------------------ | ---------------------------------------------- |
| App builds                     | Build command passes                           |
| Type check passes              | No TypeScript/type errors if applicable        |
| Lint passes                    | No lint errors if configured                   |
| No console errors              | Browser console clean for tested screens       |
| No broken imports              | Components/assets import correctly             |
| No broken routes               | Screen routes/navigation work                  |
| No missing assets              | Assets load correctly                          |
| No hydration/runtime errors    | UI renders properly                            |
| State works                    | Completion/progress state updates              |
| Existing screens not regressed | Previously approved screens still work         |
| Performance acceptable         | No obviously oversized assets or slow behavior |

---

# Part C — Screen-Level QA Report Format

---

## 18. Required screen QA report format

Use this format when reviewing implemented screens.

```md
## Screen QA Report

### Screen ID
[M2-S20]

### Screen title
[Power lens: what may be hidden?]

### Template expected
[screen-hotspot-exploration]

### Template implemented
[screen-hotspot-exploration]

### Decision
[approved / approved-with-minor-notes / needs-revision / blocked]

### Issues found
| Severity | Issue | Violated rule | Recommended fix |
|---|---|---|---|
| high | Continue enables before all hotspots viewed | 05_INTERACTION_LOGIC_PATTERNS.md | Gate Continue until required hotspots are viewed |

### QA checklist summary
| Layer | Result | Notes |
|---|---|---|
| Content | Pass |  |
| Instructional design | Pass |  |
| Design-system alignment | Pass |  |
| Interaction | Needs revision | Continue gating issue |
| Accessibility | Pass | Keyboard hotspot list works |
| HRBA safety | Pass | Fictional scenario |
| Visual assets | Pass | Alt text included |
| Responsive | Pass | Mobile list alternative works |
| Technical | Pass | No console errors |

### Final recommendation
[Fix high issue and resubmit.]
```

---

## 19. Batch QA report format

Use this format when reviewing a full implementation batch.

```md
## Batch QA Report

### Batch name
[Module 2 Screens M2-S01 to M2-S05]

### Date
[YYYY-MM-DD]

### Reviewer
[Name/role]

### Overall decision
[approved / approved-with-minor-notes / needs-revision / blocked]

### Scope reviewed
- [Screen/component]
- [Screen/component]

### Summary
[Short summary of findings.]

### Critical issues
| Screen/component | Issue | Required fix |
|---|---|---|

### High issues
| Screen/component | Issue | Required fix |
|---|---|---|

### Medium issues
| Screen/component | Issue | Recommended fix |
|---|---|---|

### Low issues
| Screen/component | Issue | Optional polish |
|---|---|---|

### Approval conditions
- [Condition 1]
- [Condition 2]

### Screens/components approved
- [Screen/component]

### Screens/components not approved
- [Screen/component]

### Next action
[Return to agent / approve and lock / continue to next batch.]
```

---

# Part D — Acceptance Criteria

---

## 20. Standard acceptance criteria for documentation files

A documentation file is accepted when:

| Criterion                   | Required                         |
| --------------------------- | -------------------------------- |
| Correct file path           | Yes                              |
| Content included completely | Yes                              |
| Markdown renders cleanly    | Yes                              |
| No unrelated files changed  | Yes                              |
| No source code changed      | Yes, unless explicitly requested |
| Summary returned            | Yes                              |

---

## 21. Standard acceptance criteria for reusable components

A reusable component is accepted when:

| Criterion                             | Required |
| ------------------------------------- | -------- |
| Uses approved tokens                  | Yes      |
| Matches approved block/screen pattern | Yes      |
| Has clear props/data structure        | Yes      |
| Supports required interaction         | Yes      |
| Supports keyboard access              | Yes      |
| Supports mobile behavior              | Yes      |
| Handles disabled/empty/error states   | Yes      |
| Does not introduce arbitrary styling  | Yes      |
| Does not break existing screens       | Yes      |
| Evidence pack returned                | Yes      |

---

## 22. Standard acceptance criteria for module screens

A module screen is accepted when:

| Criterion                         | Required |
| --------------------------------- | -------- |
| Uses approved screen template     | Yes      |
| Uses approved block templates     | Yes      |
| Uses exact learner-facing content | Yes      |
| Fits required canvas status       | Yes      |
| Learner action is clear           | Yes      |
| Completion rule works             | Yes      |
| Feedback works where required     | Yes      |
| Desktop layout works              | Yes      |
| Mobile layout works               | Yes      |
| Keyboard interaction works        | Yes      |
| HRBA safety rules followed        | Yes      |
| Visual assets handled correctly   | Yes      |
| No console/runtime errors         | Yes      |
| Evidence pack returned            | Yes      |

---

## 23. Standard acceptance criteria for knowledge checks

A knowledge check is accepted when:

| Criterion                                         | Required         |
| ------------------------------------------------- | ---------------- |
| Question aligns with learning objective           | Yes              |
| Question tests practical reasoning where possible | Yes              |
| Choices are plausible                             | Yes              |
| Correct answer is accurate                        | Yes              |
| Feedback explains why                             | Yes              |
| Completion rule works                             | Yes              |
| Retry behavior follows spec                       | Where applicable |
| Keyboard access works                             | Yes              |
| Mobile layout works                               | Yes              |
| No unsafe disclosure required                     | Yes              |

---

## 24. Standard acceptance criteria for portfolio screens

A portfolio screen is accepted when:

| Criterion                        | Required |
| -------------------------------- | -------- |
| Output purpose is clear          | Yes      |
| Safety note appears before input | Yes      |
| Fields are labeled               | Yes      |
| Required fields are clear        | Yes      |
| Save behavior works              | Yes      |
| Completion rule works            | Yes      |
| Learner can edit where specified | Yes      |
| No sensitive real data required  | Yes      |
| Mobile layout works              | Yes      |
| Evidence pack confirms safety    | Yes      |

---

## 25. Standard acceptance criteria for final assessment

A final assessment batch is accepted when:

| Criterion                               | Required          |
| --------------------------------------- | ----------------- |
| Questions align with course outcomes    | Yes               |
| Scoring rule follows approved spec      | Yes               |
| Pass threshold follows approved spec    | Yes               |
| Retake rules follow approved spec       | Yes               |
| Feedback behavior follows approved spec | Yes               |
| No sensitive disclosure required        | Yes               |
| Navigation/progress works               | Yes               |
| Accessibility works                     | Yes               |
| Mobile layout works                     | Yes               |
| Certificate eligibility behavior works  | Where implemented |
| Evidence pack returned                  | Yes               |

---

# Part E — Locking and Change Control

---

## 26. Lock rule

Once a template, component, or screen is approved, it may be marked:

```text
locked
```

A locked item should not be redesigned or refactored unless:

* the user explicitly requests a change;
* a critical accessibility issue is discovered;
* a safety issue is discovered;
* a technical regression is discovered;
* the design system is formally updated.

---

## 27. Approved/locked status notation

Use this notation in module QA files or screen inventories.

```md
| Screen ID | Status | Notes |
|---|---|---|
| M1-S04 | locked | Learning journey screen approved after responsive QA |
| M2-S20 | needs-revision | Hotspot keyboard alternative missing |
| M2-S25 | approved | Everyday rights lens screen approved |
```

---

## 28. Change request format for locked items

If a locked item needs change, use this format.

```md
## Change Request

### Item
[Screen/component/template]

### Current status
Locked

### Reason for change
[Accessibility issue / safety issue / content correction / visual improvement / technical regression]

### Proposed change
[Specific change]

### Risk
[What could break]

### Required QA after change
[Checks required]

### Approval
[Pending / approved]
```

---

# Part F — Agent Response Standards

---

## 29. Required response after documentation-only task

```md
## Documentation Task Complete

### File created/updated
[Path]

### Source code changed?
No.

### Formatting notes
[None / notes]

### Summary
[Short summary.]
```

---

## 30. Required response after implementation task

```md
## Implementation Complete

### Summary
[What was implemented.]

### Changed files
- [file]
- [file]

### Screens/components affected
- [item]

### Verification performed
- [command/check]

### Evidence
[Desktop/mobile/accessibility/safety notes.]

### Known issues
[None known / list]

### Acceptance criteria
- [x] Assigned scope completed
- [x] Approved templates used
- [x] Approved tokens used
- [x] Accessibility checked
- [x] HRBA safety checked
- [x] Evidence pack returned
```

---

## 31. Required response when blocked

```md
## Implementation Blocked

### Reason
[Why implementation cannot proceed.]

### Missing or conflicting information
- [Missing item]

### Relevant rule
[Design-system file/rule]

### Recommendation
[What is needed before coding.]
```

---

# Part G — QA Prompts

---

## 32. Standard QA prompt for Codex/Antigravity

```text
Review the implemented HRBA course screens/components against the approved CSO Learning Hub design system.

Read and apply:
- docs/design-system/01_FOUNDATION_TOKENS.md
- docs/design-system/02_COURSE_PLAYER_SYSTEM.md
- docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
- docs/design-system/04_SCREEN_TEMPLATE_LIBRARY.md
- docs/design-system/05_INTERACTION_LOGIC_PATTERNS.md
- docs/design-system/06_ACCESSIBILITY_AND_SAFETY_RULES.md
- docs/design-system/07_VISUAL_ASSET_RULES.md
- docs/design-system/08_AGENT_IMPLEMENTATION_RULES.md
- docs/design-system/09_QA_AND_EVIDENCE_PACK_STANDARD.md

Check:
1. scope control,
2. content accuracy,
3. instructional design,
4. template alignment,
5. token usage,
6. interaction behavior,
7. completion logic,
8. accessibility,
9. HRBA safety,
10. visual assets,
11. desktop/tablet/mobile responsiveness,
12. technical errors.

For each issue, report:
- screen/component,
- issue,
- severity,
- violated rule,
- recommended fix.

Do not redesign beyond the approved system.
```

---

## 33. Standard implementation evidence prompt

```text
After implementation, return an evidence pack using:

docs/design-system/09_QA_AND_EVIDENCE_PACK_STANDARD.md

Your evidence pack must include:
1. summary of work completed,
2. assigned scope,
3. changed files,
4. screens/components affected,
5. design-system references followed,
6. verification performed,
7. desktop layout check,
8. mobile layout check,
9. accessibility notes,
10. HRBA safety notes,
11. visual asset notes,
12. known issues,
13. acceptance criteria checklist.
```

---

## 34. Approval status

Status: Draft v1
Applies to: CSO Learning Hub HRBA course QA, implementation review, and evidence packs
Depends on:

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

Next recommended files:

```text
docs/assets/hrba-course-asset-register.md
docs/modules/module-1-screen-inventory.md
docs/modules/module-2-screen-inventory.md
```
