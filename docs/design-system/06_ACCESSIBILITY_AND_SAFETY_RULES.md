# CSO Learning Hub HRBA Course Design System

## 06 — Accessibility and Safety Rules

## 1. Purpose

This document defines the accessibility and HRBA safety rules for the CSO Learning Hub HRBA e-learning course.

The purpose is to ensure that the course is:

* usable by learners with different abilities, devices, connectivity levels, and language needs;
* safe for learners engaging with rights, power, accountability, civic space, complaints, exclusion, safeguarding, participation, and MEAL topics;
* consistent across all modules, screens, blocks, interactions, reflections, knowledge checks, and portfolio activities.

Coding agents must follow these rules when implementing course screens, components, learner input fields, media, interactive blocks, and assessment logic.

This file builds on:

```text id="hdp87y"
docs/design-system/01_FOUNDATION_TOKENS.md
docs/design-system/02_COURSE_PLAYER_SYSTEM.md
docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
docs/design-system/04_SCREEN_TEMPLATE_LIBRARY.md
docs/design-system/05_INTERACTION_LOGIC_PATTERNS.md
```

---

## 2. Core accessibility principle

The HRBA course must be designed for real local CSO learners, not ideal technical conditions.

Learners may use:

* laptops;
* low-resolution screens;
* tablets;
* mobile phones;
* unstable internet;
* assistive technology;
* keyboard navigation;
* translated/localized versions;
* low-bandwidth alternatives;
* shared devices;
* older browsers.

Every screen should remain usable, readable, and understandable under realistic conditions.

---

## 3. Core HRBA safety principle

The HRBA course must help learners think about rights, inclusion, participation, accountability, and power without exposing themselves, communities, organizations, or others to unnecessary risk.

The course must not ask learners to disclose sensitive real-world information.

Learners should be invited to use:

* fictional examples;
* general patterns;
* anonymized examples;
* non-identifiable scenarios;
* safe practice reflections;
* low-risk action commitments.

The course must never require learners to reveal:

* real complaint details;
* names of people;
* names of organizations involved in sensitive issues;
* active disputes;
* safeguarding incidents;
* confidential project data;
* politically sensitive examples;
* identifiable community stories.

---

# Part A — Accessibility Rules

---

## 4. Accessibility baseline

All learner-facing course pages, screens, and blocks must support:

| Accessibility requirement | Required behavior                                               |
| ------------------------- | --------------------------------------------------------------- |
| Keyboard access           | Learners can complete all required interactions without a mouse |
| Visible focus             | Focus indicator is clearly visible                              |
| Semantic structure        | Use headings, buttons, lists, forms, and landmarks correctly    |
| Screen-reader support     | Interactive states and labels are understandable                |
| Color contrast            | Text and controls have sufficient contrast                      |
| No color-only meaning     | State is shown through text/icon/label, not color alone         |
| Responsive layout         | Works on desktop, tablet, and mobile                            |
| Tap-friendly controls     | Interactive targets are large enough for mobile                 |
| Reduced motion            | Motion respects user preference                                 |
| Media alternatives        | Video/audio have captions, transcripts, or text alternatives    |
| Image alternatives        | Meaningful images have alt text or long descriptions            |
| Error guidance            | Errors explain what happened and how to fix it                  |
| Language clarity          | Instructions are plain, direct, and concise                     |

---

## 5. Keyboard accessibility rules

### 5.1 General keyboard behavior

All interactive elements must be reachable and usable by keyboard.

Required behavior:

| Element          | Keyboard behavior                                                      |
| ---------------- | ---------------------------------------------------------------------- |
| Button           | Enter or Space activates                                               |
| Link             | Enter activates                                                        |
| Accordion header | Enter or Space expands/collapses                                       |
| Tabs             | Tab to control; Enter/Space activates; arrow navigation where feasible |
| Flashcard        | Enter or Space reveals                                                 |
| Hotspot          | Tab to hotspot/list item; Enter/Space activates                        |
| Sorting item     | Keyboard alternative must exist                                        |
| Checkbox/radio   | Standard keyboard behavior                                             |
| Text field       | Standard typing/focus behavior                                         |
| Modal/drawer     | Focus moves inside and is trapped while open                           |
| Close button     | Enter/Space activates; Escape closes where appropriate                 |

### 5.2 Focus order

Focus order must follow the visual and instructional logic of the screen:

```text id="tv5skd"
Screen title
→ instruction
→ main interaction
→ feedback
→ navigation controls
```

Do not let focus jump randomly to sidebar, footer, hidden controls, or off-screen elements.

### 5.3 Focus on screen change

When learners move to a new screen:

* focus should move to the screen title or main content heading;
* the screen change should be clear to assistive technology;
* focus should not remain on the previous screen’s Continue button.

### 5.4 Visible focus style

Use a visible focus ring.

Recommended token:

```text id="x6i43g"
--shadow-focus: 0 0 0 3px rgba(37, 99, 235, 0.35)
```

Do not remove focus outlines.

---

## 6. Screen-reader accessibility rules

### 6.1 Required labels and states

Interactive elements must have meaningful accessible names.

Examples:

| Weak label  | Strong label                                 |
| ----------- | -------------------------------------------- |
| “Button”    | “Check answer”                               |
| “Hotspot 1” | “Hotspot: Who may be excluded?”              |
| “Card”      | “Flashcard: Participation beyond attendance” |
| “Input”     | “Write one safe action commitment”           |
| “Next”      | “Continue to next screen”                    |

### 6.2 Required state communication

Screen readers should understand:

| Component       | State to communicate         |
| --------------- | ---------------------------- |
| Accordion       | Expanded/collapsed           |
| Tabs            | Selected tab                 |
| Flashcard       | Front/back or revealed state |
| Hotspot         | Selected/viewed state        |
| Checkbox/radio  | Checked/selected             |
| Knowledge check | Selected answer and feedback |
| Progress        | Completed/current/locked     |
| Drawer/modal    | Open/closed state            |
| Save status     | Saving/saved/error           |

### 6.3 Feedback announcement

When feedback appears after a learner action, it should be programmatically available and, where feasible, announced politely.

Use clear feedback headings such as:

```text id="nmttqg"
Feedback
```

```text id="blj9cw"
Why this matters
```

```text id="of3nzg"
A stronger HRBA response
```

---

## 7. Color and contrast rules

### 7.1 Contrast

Text and controls must maintain strong contrast against their backgrounds.

Use deep navy or dark ink for main text:

```text id="96knf4"
#0F172A
#111827
```

Avoid low-contrast text such as pale gray on white.

### 7.2 Color-only meaning is not allowed

Do not use color alone to communicate:

* correct/incorrect;
* selected/unselected;
* completed/not completed;
* warning;
* required field;
* progress;
* active state.

Use color plus:

* text;
* icon;
* label;
* border;
* pattern;
* state message.

Example:

Good:

```text id="lspzj5"
✓ Completed
```

Weak:

```text id="s3zuas"
Green card only
```

---

## 8. Typography and readability rules

### 8.1 Minimum readable sizes

| Text type         |                Minimum size |
| ----------------- | --------------------------: |
| Body text         |              16px preferred |
| Small helper text |                14px minimum |
| Metadata          | 12px minimum, use sparingly |
| Button text       |                     14–16px |
| Mobile body text  |              16px preferred |

### 8.2 Readability rules

Do:

* use plain language;
* use short paragraphs;
* use clear headings;
* break dense content into interactions;
* maintain generous line height.

Do not:

* use long legalistic sentences;
* use tiny helper text;
* place long text over images;
* use all caps for long text;
* overuse bold or italics.

---

## 9. Mobile accessibility rules

Mobile behavior must be designed, not treated as an afterthought.

### 9.1 Required mobile behavior

| Desktop pattern    | Mobile requirement                         |
| ------------------ | ------------------------------------------ |
| Sidebar            | Collapsible course menu                    |
| Two-column layout  | Stack content logically                    |
| Horizontal process | Vertical step list                         |
| Hotspot graphic    | Accessible hotspot list                    |
| Drag/drop sorting  | Tap-select category alternative            |
| Large card grid    | Stacked cards or swipe-free layout         |
| Tabs               | Stacked or tap-friendly segmented controls |
| Bottom navigation  | Large tap-friendly buttons                 |

### 9.2 Tap target size

Interactive controls should be at least:

```text id="u2hcw3"
44px
```

where possible.

### 9.3 Avoid

* hover-only interactions;
* tiny hotspots;
* dense multi-column layouts;
* small tabs;
* hidden buttons;
* horizontal scrolling where avoidable.

---

## 10. Media accessibility rules

### 10.1 Video

Every video must have:

* captions or subtitles;
* transcript;
* meaningful title;
* text summary where needed;
* no essential content available only in audio/visual form.

### 10.2 Audio

Every audio item must have:

* transcript;
* title;
* short description;
* playback controls.

### 10.3 Image

Every meaningful image must have alt text.

Decorative images should be marked as decorative in code.

### 10.4 Complex visuals

Complex visuals such as diagrams, maps, hotspot graphics, and process models must have:

* short alt text;
* long description or text equivalent;
* keyboard-accessible alternative if interactive.

---

## 11. Interaction accessibility rules

### 11.1 Accordion

Must support:

* keyboard toggle;
* expanded/collapsed state;
* logical focus order;
* readable content;
* completion tracking where required.

### 11.2 Tabs

Must support:

* accessible tab labels;
* selected state;
* keyboard operation;
* mobile-friendly layout.

### 11.3 Flashcards

Must support:

* keyboard reveal;
* no hover-only behavior;
* reduced-motion alternative;
* back content available to screen readers.

### 11.4 Hotspots

Must support:

* keyboard access;
* visible focus;
* accessible label for each hotspot;
* text list alternative;
* long description;
* mobile hotspot list.

### 11.5 Sorting

Must support:

* tap-select alternative;
* keyboard alternative where feasible;
* clear categories;
* feedback;
* no drag/drop-only completion.

### 11.6 Knowledge checks

Must support:

* accessible question text;
* clear answer choices;
* selected state;
* submit/check button;
* feedback text;
* retry where specified.

### 11.7 Reflection and portfolio

Must support:

* visible labels;
* helper text;
* safety note before input;
* save status;
* clear error messages;
* keyboard focus;
* ability to edit where appropriate.

---

## 12. Reduced motion rules

If the learner prefers reduced motion:

* remove or reduce animations;
* avoid flip effects;
* avoid sliding panels where possible;
* use instant or subtle reveal;
* do not use parallax;
* do not depend on animation to communicate meaning.

Motion should support clarity, not decoration.

---

## 13. Low-bandwidth and practical access rules

The course should support low-bandwidth use where possible.

### 13.1 Required practices

Do:

* compress images;
* avoid unnecessary heavy animation;
* provide text alternatives for video/audio;
* avoid requiring large downloads for basic learning;
* allow course screens to work without unnecessary embedded media.

### 13.2 Resource alternatives

For heavy or media-rich screens, provide:

* short text summary;
* transcript;
* downloadable lightweight document where appropriate;
* static image alternative to complex interaction where needed.

---

# Part B — HRBA Safety Rules

---

## 14. HRBA safety baseline

The HRBA course deals with sensitive themes, including:

* rights violations;
* exclusion;
* discrimination;
* complaints;
* accountability;
* participation;
* power;
* civic space;
* government responsibilities;
* community feedback;
* safeguarding;
* sensitive MEAL data.

The course must create a safe learning environment.

It should strengthen judgment without asking learners to expose real people, real organizations, or sensitive situations.

---

## 15. Prohibited learner input requests

The course must not ask learners to provide:

| Prohibited request                                    | Safer alternative                                     |
| ----------------------------------------------------- | ----------------------------------------------------- |
| Name a person involved in a complaint                 | Use a fictional or anonymized example                 |
| Describe a real safeguarding incident                 | Reflect on safe response steps using a fictional case |
| Identify a government official or office causing harm | Think generally about duty-bearer responsibilities    |
| Describe an active dispute                            | Use a general pattern or fictional scenario           |
| Upload a confidential project document                | Use a blank template or fictional sample              |
| Name excluded community members                       | Identify types of barriers, not people                |
| Share politically sensitive examples                  | Use neutral, generalized practice examples            |
| Provide real complaint details                        | Map the accountability process without details        |

---

## 16. Required safety note patterns

### 16.1 General safe reflection note

Use before standard reflection prompts:

```text id="nbr6jv"
Use a fictional, general, or anonymized example. Do not include names, complaint details, active disputes, or sensitive information.
```

### 16.2 Strong civic-space safety note

Use for topics involving advocacy, power, civic space, accountability, or government actors:

```text id="r2tipj"
Keep your response general and safe. Do not name people, organizations, officials, locations, active disputes, or sensitive incidents.
```

### 16.3 Safeguarding safety note

Use for safeguarding-related topics:

```text id="o53s0l"
Do not describe real safeguarding incidents. Use the fictional scenario provided and focus on safe next steps.
```

### 16.4 MEAL/data safety note

Use for data, evidence, reporting, complaints, or feedback topics:

```text id="pf4udm"
Do not enter real names, complaint details, or identifiable community information. Use fictional or anonymized examples only.
```

### 16.5 Portfolio safety note

Use before portfolio-builder fields:

```text id="yebqnp"
This is a learning worksheet. Use fictional, general, or anonymized information. Do not include confidential project data or identifying details.
```

---

## 17. Safe scenario design rules

### 17.1 Scenario content should be fictional

All HRBA course scenarios should be fictional or composite.

They may be realistic, but must not be traceable to real people, organizations, cases, communities, or disputes.

### 17.2 Scenario tone

Scenarios should:

* be respectful;
* avoid blame;
* avoid stereotypes;
* avoid sensational harm;
* avoid political accusation;
* show realistic constraints;
* make HRBA practice possible and practical.

### 17.3 Scenario actor rules

Use neutral actor labels where possible:

| Preferred                    | Avoid unless needed             |
| ---------------------------- | ------------------------------- |
| community member             | named individual                |
| local official               | named officeholder              |
| CSO project officer          | real organization name          |
| women’s group representative | identifiable person             |
| youth representative         | real activist                   |
| person with disability       | tokenized or pity-based framing |

### 17.4 Scenario risk levels

| Risk level | Use                                              |
| ---------- | ------------------------------------------------ |
| Low        | General project inclusion issue                  |
| Moderate   | Complaints, exclusion, accountability            |
| High       | Safeguarding, civic space, political sensitivity |

High-risk scenarios require extra safety review before implementation.

---

## 18. Safe reflection design rules

Reflection should help learners internalize and apply learning safely.

### 18.1 Preferred reflection prompts

Use prompts like:

```text id="9ruzzw"
What is one general pattern your CSO could pay more attention to?
```

```text id="133mnz"
What is one small, safe action your team could take to improve participation?
```

```text id="lhxc54"
Think of a fictional project. What is one group that might be missed if the team does not check carefully?
```

```text id="rzhsuj"
What question could you ask in your next planning discussion to bring an HRBA lens?
```

### 18.2 Avoid reflection prompts

Do not use prompts like:

```text id="m75999"
Describe a real rights violation from your work.
```

```text id="rrijhu"
Name a duty-bearer who failed to act.
```

```text id="ek6qyg"
Share a complaint your CSO received.
```

```text id="ghxjdy"
Write about a real community member who was excluded.
```

---

## 19. Safe portfolio design rules

Portfolio outputs must be useful but safe.

### 19.1 Allowed portfolio outputs

Allowed:

* fictional HRBA mapping worksheet;
* anonymized participation checklist;
* general action commitment;
* safe accountability process map;
* draft questions for team discussion;
* blank or sample tool completion;
* non-identifying reflection.

### 19.2 Prohibited portfolio requirements

Do not require:

* real complaints;
* names of community members;
* real staff names;
* real government actors;
* confidential donor/project data;
* sensitive case details;
* real safeguarding incidents;
* real advocacy risks.

### 19.3 Portfolio storage principle

Collect the minimum information needed for learning.

Do not store sensitive data if it is not necessary.

---

## 20. Safe feedback rules

Feedback must build confidence and judgment.

### 20.1 Feedback should

* explain why a response is strong, incomplete, or risky;
* connect to HRBA principles;
* suggest safer practice;
* avoid blaming the learner;
* avoid legal threats or accusatory language;
* avoid implying CSOs must solve all structural problems alone.

### 20.2 Feedback should not

* shame learners;
* say “you failed”;
* accuse learners of rights violations;
* encourage confrontation without safety consideration;
* tell CSOs to replace duty-bearers;
* use legalistic fear-based language.

Preferred wording:

```text id="65xort"
This response is stronger because it looks for who may be excluded and how they can safely influence the decision.
```

Avoid:

```text id="ad4l2v"
This is wrong because your CSO violated rights.
```

---

## 21. Duty-bearer and CSO role safety rules

The course should clearly distinguish roles.

### 21.1 Required framing

Use:

```text id="otsgk6"
CSOs can support rights-holders, facilitate participation, strengthen evidence, engage duty-bearers, and improve accountability, but they do not replace the legal responsibilities of duty-bearers.
```

### 21.2 Avoid

Do not imply:

* CSOs alone are responsible for fulfilling all rights;
* CSOs should replace government duty-bearers;
* CSOs should confront authorities without risk analysis;
* communities are passive beneficiaries;
* accountability is only complaint handling.

---

## 22. Language safety and dignity rules

Use dignity-based language.

### 22.1 Prefer

* rights-holders;
* community members;
* people facing barriers;
* persons with disabilities;
* women-headed households;
* displaced households;
* less-heard groups;
* people affected by the issue;
* communities with limited access.

### 22.2 Avoid

* victims unless contextually necessary;
* vulnerable people as a fixed identity;
* beneficiaries as the only framing;
* helpless communities;
* target groups in a dehumanizing way;
* people as data points only.

### 22.3 Practical rule

When using “beneficiaries,” explain the HRBA shift:

```text id="50w3f0"
In HRBA, people may receive services, but they are not passive beneficiaries. They are rights-holders with dignity, voice, and claims.
```

---

## 23. Visual safety rules

Images and illustrations must not:

* expose identifiable people in sensitive contexts;
* show distressing rights violations;
* portray poverty or exclusion in a sensational way;
* use stereotypes;
* show political symbols;
* show real complaint documents;
* show names, addresses, phone numbers, signatures, or identifiable records;
* imply surveillance or investigation.

Use visuals that are:

* respectful;
* warm;
* participatory;
* locally grounded;
* professional;
* fictionalized where sensitive;
* focused on learning and practice.

---

## 24. Assessment safety rules

Knowledge checks and final assessment items must not require sensitive disclosure.

### 24.1 Assessment questions should

* use fictional scenarios;
* test practical judgment;
* avoid political sensitivity;
* avoid naming real actors;
* avoid asking learners to reveal real cases;
* include safe HRBA reasoning.

### 24.2 Assessment questions should not

* ask learners to provide real examples;
* require confidential organizational information;
* include graphic harm;
* include identifiable complaints;
* punish learners for choosing cautious options in high-risk scenarios.

---

## 25. Localization and language accessibility

The course should be ready for future translation/localization.

### 25.1 Writing rules

Use:

* short sentences;
* consistent terms;
* simple structure;
* clear action verbs;
* minimal idioms;
* direct instructions;
* plain HRBA explanations.

Avoid:

* complex legal wording unless needed;
* wordplay that is hard to translate;
* culturally specific metaphors that may not work across regions;
* long nested sentences.

### 25.2 Term consistency

Keep key terms consistent:

| Term               | Use consistently                               |
| ------------------ | ---------------------------------------------- |
| HRBA               | Human Rights-Based Approach                    |
| rights-holder      | person or group with rights and claims         |
| duty-bearer        | actor with responsibility or obligation        |
| participation      | influence, not only attendance                 |
| accountability     | inform, listen, respond, follow up, adapt      |
| non-discrimination | deliberate attention to exclusion and barriers |
| empowerment        | capacity, voice, confidence, and agency        |

---

# Part C — Review and QA

---

## 26. Accessibility review checklist

Before approving any screen, check:

| QA item                                            | Required result |
| -------------------------------------------------- | --------------- |
| Screen has clear heading                           | Pass            |
| Reading order is logical                           | Pass            |
| Text is readable                                   | Pass            |
| Color contrast is sufficient                       | Pass            |
| No color-only meaning                              | Pass            |
| Keyboard navigation works                          | Pass            |
| Focus state is visible                             | Pass            |
| Interactive controls have labels                   | Pass            |
| Feedback is accessible                             | Pass            |
| Images have alt text or decorative handling        | Pass            |
| Complex visuals have text alternatives             | Pass            |
| Video/audio have transcript/captions               | Pass            |
| Mobile layout works                                | Pass            |
| Tap targets are usable                             | Pass            |
| Reduced motion is respected                        | Pass            |
| Disabled buttons explain requirement               | Pass            |
| No console/accessibility errors obvious in testing | Pass            |

---

## 27. HRBA safety review checklist

Before approving any HRBA screen, check:

| QA item                                          | Required result |
| ------------------------------------------------ | --------------- |
| Scenario is fictional or safely generalized      | Pass            |
| No real names are requested                      | Pass            |
| No complaint details are requested               | Pass            |
| No safeguarding incident details are requested   | Pass            |
| No politically sensitive details are requested   | Pass            |
| Safety note appears before sensitive input       | Pass            |
| Reflection prompt is safe                        | Pass            |
| Portfolio fields are safe                        | Pass            |
| Feedback is constructive and non-shaming         | Pass            |
| CSO role does not replace duty-bearer role       | Pass            |
| Communities are framed with dignity              | Pass            |
| Visuals are respectful and non-identifying       | Pass            |
| Assessment does not require sensitive disclosure | Pass            |
| Language is practical and non-accusatory         | Pass            |

---

## 28. High-risk screen review

A screen requires extra review if it includes:

* complaints;
* safeguarding;
* civic space;
* power analysis involving authorities;
* discrimination;
* legal obligations;
* conflict-affected communities;
* real data collection;
* advocacy;
* community feedback;
* sensitive MEAL evidence.

High-risk screens must be checked for:

1. fictionalization;
2. safe wording;
3. learner input safety;
4. visual safety;
5. role clarity;
6. do-no-harm framing;
7. accessibility;
8. mobile usability.

---

## 29. Implementation rules for coding agents

Coding agents must:

1. preserve all visible focus states;
2. ensure all required interactions work by keyboard;
3. provide mobile alternatives for drag/drop and hotspots;
4. add alt text or decorative marking for images;
5. support captions/transcripts where media exists;
6. include safety notes before sensitive input;
7. avoid storing sensitive learner input unnecessarily;
8. use safe reflection and portfolio wording;
9. avoid real names, real complaints, or identifiable scenarios;
10. report any accessibility or safety gap before implementation.

Coding agents must not:

1. remove keyboard behavior;
2. hide focus outlines;
3. use hover-only interaction;
4. use drag/drop-only interaction;
5. rely on color alone;
6. create inaccessible hotspots;
7. request sensitive real-world examples;
8. require confidential information for completion;
9. use unsafe scenario wording;
10. improvise legal or safeguarding advice.

---

## 30. Required evidence after implementation

For any batch that includes learner-facing screens, the implementation evidence pack must include:

| Evidence                                               | Required       |
| ------------------------------------------------------ | -------------- |
| Screens implemented                                    | Yes            |
| Changed files                                          | Yes            |
| Desktop screenshot                                     | Yes            |
| Mobile screenshot                                      | Yes            |
| Keyboard navigation notes                              | Yes            |
| Accessibility notes                                    | Yes            |
| Safety notes for reflection/portfolio/scenario screens | Where relevant |
| Known issues                                           | Yes            |
| Confirmation of no sensitive disclosure required       | Yes            |
| Acceptance checklist                                   | Yes            |

---

## 31. Approval status

Status: Draft v1
Applies to: CSO Learning Hub HRBA course accessibility and safety
Depends on:

```text id="9p2mnk"
docs/design-system/01_FOUNDATION_TOKENS.md
docs/design-system/02_COURSE_PLAYER_SYSTEM.md
docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
docs/design-system/04_SCREEN_TEMPLATE_LIBRARY.md
docs/design-system/05_INTERACTION_LOGIC_PATTERNS.md
```

Next file:

```text id="ljfg90"
docs/design-system/07_VISUAL_ASSET_RULES.md
```
