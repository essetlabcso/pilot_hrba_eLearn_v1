# Module 2 QA Summary — HRBA E-learning Course

## Purpose of this file

This file summarizes the Module 2 QA review findings and translates them into clear improvement implications for the HRBA e-learning course.

Module 2 focuses on:

- foundations of HRBA
- rights, actors, principles, and power
- actor ecosystems
- participation
- accountability loops
- power and exclusion
- practical application through scenarios and interactive screens

## Overall QA conclusion

Module 2 has a strong learning foundation. It moves learners from the introductory mindset of Module 1 into more practical and structural HRBA concepts. The module uses case studies, hotspot screens, flip-card reveals, matching activities, role checks, and knowledge checks to help learners apply concepts rather than only read definitions.

The strongest elements are:

- use of practical HRBA scenarios
- connection between concepts and learner decisions
- interaction-based learning design
- effective sequence from explanation to practice
- strong screens around participation, accountability, feedback repair, and power analysis

However, the QA review found several issues that should be addressed before the module is treated as final/premium.

The most important improvement areas are:

1. Text/background contrast and readability
2. Accessibility of interactive elements
3. Clarity and scalability of hotspot/diagram visuals
4. Repetition and interaction fatigue
5. Missing or weak visual assets in selected screens
6. Responsive behavior on smaller screens
7. Navigation, completion, and progress clarity

## Top risks before deployment

### 1. Contrast and readability risk

Some text and UI states have insufficient contrast, especially disabled Continue buttons, muted labels, progress indicators, and hotspot labels placed on complex visual backgrounds.

This affects accessibility and may make learners feel the course is visually unfinished.

### 2. Interaction accessibility risk

Some interaction types may be difficult for keyboard users, screen reader users, or mobile users.

Screens requiring careful review include:

- M2-S03 flip cards
- M2-S06 matching activity
- M2-S17 feedback loop repair radio grid
- M2-S18 hotspot interaction
- M2-S22 knowledge check

### 3. Diagram and hotspot clarity risk

Screens that rely on complex visuals or hotspots need stronger responsive behavior, clearer labels, better overlays, and meaningful alt text or long descriptions.

Priority screens:

- M2-S04 Rights Dimensions Hotspot
- M2-S08 Rights-Holders / Actor Map
- M2-S18 Power and Exclusion Hotspots

### 4. Interaction fatigue risk

The module uses many “open all to continue” or “click all cards/hotspots” patterns. This is useful in moderation, but overuse may frustrate learners and make the course feel repetitive.

Affected screens include:

- M2-S02
- M2-S03
- M2-S04
- M2-S05
- M2-S07
- M2-S08
- M2-S16
- M2-S18

### 5. Visual asset gap

Some screens would feel more premium and easier to understand with stronger visual support.

Priority asset needs include:

- M2-S01A intro video poster image
- M2-S04 rights dimensions hotspot visual
- M2-S08 actor ecosystem map
- M2-S13 SDG/LNOB linkage infographic
- M2-S18 power and exclusion hotspot background
- M2-S16 accountability loop diagram refinement

## Implementation implication

The improvement work should not be done as one large “redesign Module 2” task.

The safest and most efficient approach is to implement improvements in focused passes:

1. Global contrast/readability fixes
2. Interaction accessibility fixes
3. Hotspot and diagram clarity improvements
4. Interaction fatigue and gating improvements
5. Visual asset integration
6. Final build/deployment QA

## Recommended first action

Start with the highest-impact and lowest-effort work:

**Fix global contrast and readability issues first.**

This should include:

- disabled Continue buttons
- muted helper text
- low-contrast labels
- progress indicators
- selected/disabled states
- hotspot labels
- feedback messages

This will improve many screens at once and reduce accessibility risk quickly.

## Summary of priority screens

| Screen | Main issue | Priority |
|---|---|---|
| M2-S03 | Disabled button contrast, flip-card accessibility | High |
| M2-S04 | Hotspot/diagram clarity and responsive scaling | High |
| M2-S06 | Matching activity keyboard accessibility | High |
| M2-S08 | Actor map clarity and alt text | High |
| M2-S10 | Dense layout and disabled button contrast | Medium |
| M2-S13 | Opportunity for SDG/LNOB linkage visual | Medium |
| M2-S16 | Accountability loop responsiveness and contrast | Medium |
| M2-S17 | Radio grid contrast and non-color-only feedback | Medium |
| M2-S18 | Hotspot text readability and custom visual need | High |
| M2-S22 | Knowledge check feedback accessibility | Medium |
| M2-S23 | Completion CTA prominence | Low/Medium |

## Quality target

After improvement, Module 2 should feel:

- visually premium
- accessible
- readable
- responsive
- coherent from screen to screen
- less repetitive
- stronger in visual learning support
- ready for Vercel deployment and learner testing
