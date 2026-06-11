# Module 1 Targeted Repair Build Control

**Course:** Applying the Human Rights-Based Approach (HRBA) in CSO Practice  
**Module:** Module 1 — Starting Your HRBA Learning Journey: From Good Intentions to Rights-Based Practice  
**Package date:** 2026-06-02 08:24  

## Purpose

This package converts the Module 1 audit and improvement report into the targeted repair inputs needed before prototype build. It keeps the UNICEF/Agora-inspired two-layer architecture intact:

1. **Layer 1: Course platform / LMS layer** — course roadmap, module launch page, progress state, completion checkmark, next-module CTA, certificate pathway.
2. **Layer 2: Focused course-player layer** — module cover, fixed player shell, top header, left toolbar, help overlay, accessibility modal, glossary/resources, captions/transcript, interactions, feedback, summary, completion screen, return-to-platform flow.

The 26-screen UNICEF/Agora example is a design inspiration only. Module 1 currently preserves the existing HRBA workbook sequence of 44 learner-facing blocks/screens, with shell states added around the module. Later modules must use content-led screen counts.

## Targeted Repairs Locked for Module 1

### M1-R01 — Module Cover / Launch State

Add:
- LMS launch page before the player opens.
- Player cover screen before the welcome video.
- Split-screen Agora-inspired cover layout:
  - left: deep navy title area, course title, module title, duration, Start button;
  - right: local CSO learning visual;
  - DEC / CSO Learning Hub branding;
  - no autoplay;
  - accessible Start button and image alt text.

### M1-R02 — Help Overlay + Accessibility Modal

Add reusable player-shell states:
- Help overlay with dark background and arrows/labels for Menu, Glossary, Resources, Help, Transcript/Captions, Pause/Play, Sound, Replay, Exit, progress, Previous/Next.
- Accessibility modal covering keyboard navigation, captions/transcripts, screen-reader labels, alt text, low-bandwidth alternatives, pause/replay, and safe learning.

### M1-R03 — Completion / Return-to-Platform State

Add:
- Module 1 completion screen inside the player.
- Return to Course Page button.
- LMS return state with:
  - Module 1 completed checkmark;
  - progress saved message;
  - Module 2 highlighted/unlocked;
  - Continue to Module 2 button;
  - Review Module 1 option.

### M1-R04 — Objective-Capacity Mapping

Use the objective-capacity map in the workbook to link each Module 1 objective to:
- CSO capacity area;
- CSO practice area;
- HRBA concept/principle;
- K/S/M/E route;
- learning block(s);
- assessment/check;
- portfolio/practical output;
- measurement evidence.

### M1-R05 — Story/Scenario Register

Use the story register to implement:
- Ayele portfolio demo story;
- Good Intentions Are Not Always Enough micro-story;
- Ask Better Questions Before Acting scenario decision;
- Fictional Local CSO Scenario for actor-role matching;
- What You Have Started wrap-up reflection.

Use the course-level fictional/composite disclaimer. Do not title every story “fictional.”

### M1-R06 — Visual Asset Prompt Register

Use the asset prompt register to produce or commission:
- cover hero;
- welcome video placeholder;
- course roadmap;
- portfolio illustration;
- Ayele persona;
- safe learning graphic;
- HRBA relevance icons;
- rights-holder shift visual;
- scenario graphic;
- sorting icons;
- rights-holder/duty-bearer map;
- self-assessment scale;
- wrap-up image.

### M1-R07 — Interaction State Registry

Implement default, selected, feedback, completed, and returned states for:
- module cover;
- help overlay;
- accessibility modal;
- safe learning agreement;
- orientation check;
- relevance cards;
- scenario decision;
- reveal block;
- sorting activity;
- shift selector;
- matching activity;
- actor map;
- self-assessment;
- result summary;
- priority selector;
- portfolio save;
- quiz;
- summary tabs;
- completion.

### M1-R08 — Summary Tabs

Convert or implement Module 1 summary as an Agora-inspired tab/card recap. Suggested tabs:
- HRBA mindset;
- rights-holder shift;
- actor roles;
- safe portfolio;
- next action.

## Next Step

Create the **Module 1 Prototype Build Package** using:
- this targeted repair workbook;
- the existing Module 1 clean AI coding workbook;
- the consolidated design specification;
- the design lock package;
- the Module 1 improvement report.

## Copy/Paste Prompt for Coding or Course-Build Agent

You are the course build agent for the CSO Learning Hub HRBA course. Build Module 1 using the locked improved design specification, the Module 1 audit, the improvement report, and the Module 1 targeted repair package.

### Plan first

First produce a brief implementation plan. Do not start coding/building until the plan confirms how you will preserve:
- the two-layer architecture;
- Agora-inspired player design;
- DEC branding;
- accessibility;
- safety;
- completion/progress logic;
- flexible screen-count rule.

### Hard constraints

Do not force Module 1 or any later module into 26 screens. The screen count is content-led. Preserve the existing Module 1 learner-facing storyboard unless a targeted repair explicitly changes it. Do not invent learner content, final filenames, external references, or real organizations. Do not ask learners for sensitive personal, political, safeguarding, complaint, beneficiary, or confidential organizational data.

### Required implementation

Add or implement:
- Layer 1 Module 1 launch page;
- Layer 2 Module 1 cover screen;
- reusable help overlay;
- accessibility modal;
- resources/glossary support states;
- completion screen;
- return-to-platform progress state;
- objective-capacity mapping;
- story/scenario register;
- visual assets according to prompt register;
- interaction states according to the registry.

### Acceptance criteria

Verify that the learner can:
- launch Module 1;
- start the player;
- access help/accessibility/resources/glossary;
- complete required interactions;
- view summary;
- finish the module;
- return to platform;
- see Module 1 completed;
- continue to Module 2.

Verify:
- keyboard navigation;
- transcripts;
- alt text;
- non-drag alternatives;
- low-bandwidth fallbacks;
- safety warnings;
- no sensitive data collection.

### Evidence pack

Return an evidence pack listing:
- implemented files/components;
- screenshots or rendered previews;
- interaction test results;
- accessibility checks;
- safety checks;
- open items.

Do not claim completion without evidence.
