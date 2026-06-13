# CSO Learning Hub QA Gates

## Status

Draft v0.1 — Quality gates for system-first AI-assisted course production

## Purpose

QA Gates define how we decide whether a system decision, document, component, block, template, accessibility feature, asset, vertical slice, or course module is good enough to move forward.

These gates help the CSO Learning Hub prevent design drift, accessibility problems, repeated layouts, unsafe contrast, AI improvisation, mobile breakage, and uncontrolled migration of old HRBA pilot design debt.

## Relationship To Existing System Documents

QA Gates enforce:

- the System Charter;
- the AI Production Contract;
- the Learning Block Register;
- the Screen Template Register;
- the future Asset Migration Register;
- future token, theme, component, accessibility, and vertical slice work.

This document does not implement code.

## Core QA Principle

Quality is not a final inspection.

Quality is built into the system before screens are produced.

No screen, component, asset, or AI-generated output should move forward unless it passes the relevant gate.

## Gate 0 — Branch And Safety Gate

Checks:

- correct branch confirmed;
- working tree clean unless task expects changes;
- allowed files clearly listed;
- no unapproved edits;
- no destructive actions;
- no merge/cherry-pick/pull unless approved;
- build/test result reported;
- final git status reported;
- commit hash reported when committed.

## Gate 1 — Documentation Gate

Applies to system documents.

Checks:

- document has clear title, status, purpose, scope, and rules;
- no placeholder remnants;
- no duplicate headings;
- no contradiction with existing system documents;
- no implementation instructions that should belong in a later code task;
- build passes after documentation update;
- only the intended document changed.

## Gate 2 — AI Compliance Gate

Checks:

- AI stayed inside allowed files;
- AI did not invent tokens, components, blocks, templates, routes, progress logic, assessment logic, or certificate logic;
- AI did not create local CSS or hard-coded styling;
- AI did not copy old HRBA screen code directly;
- AI reported deviations, risks, and final status;
- AI stopped when branch, scope, or working tree conditions were unsafe.

## Gate 3 — Instructional Design Gate

Checks:

- learning purpose is clear;
- selected learning block matches the purpose;
- selected screen template matches the learning situation;
- learner action is meaningful, not decorative;
- interaction rhythm avoids repetition;
- content supports practical CSO learning;
- reflection, practice, judgment, and action are balanced where relevant;
- completion rule is clear;
- cognitive load is reasonable;
- plain-language instructions are included.

## Gate 4 — Visual Design And Design-System Gate

Checks:

- approved tokens are used once tokens exist;
- no random colors, shadows, spacing, gradients, or button styles;
- no unsafe text/background contrast;
- typography hierarchy is consistent;
- spacing and layout are consistent;
- icons follow the approved icon approach once defined;
- theme variation comes from approved theme packs;
- components inherit system styles rather than local overrides.

## Gate 5 — Accessibility Gate

Accessibility is always on and must not depend only on an accessibility button.

Checks:

- semantic HTML structure where relevant;
- real buttons and links;
- correct heading order;
- keyboard operability;
- visible focus indicators;
- meaningful alt text;
- form labels where inputs exist;
- accessible disabled, locked, completed, active, and error states;
- no color-only or position-only instructions;
- screen reader labels for interactive elements;
- status/feedback announced where relevant;
- captions/transcripts for media;
- text alternatives for images, diagrams, hotspots, matching, drag/drop, and visual scenarios;
- plain-language glossary support where technical terms appear.

## Gate 6 — Accessibility Tools Functional Gate

Accessibility tools must not be decorative.

Checks:

- Screen Reader Support improves compatibility with external assistive technologies and does not try to launch or control screen reader software;
- Read Aloud is separate from Screen Reader Support;
- Read Aloud reads clean screen-level content only, not sidebar/footer/repeated UI;
- Keyboard Help gives screen-specific keyboard instructions;
- Screen Help explains the learning task, not only controls;
- High Contrast improves readability;
- Text Size increases text without breaking layout;
- Reduce Motion stops decorative animation;
- Captions/Transcript panel supports video/audio screens;
- Focus Mode reduces clutter without hiding required content;
- Glossary gives plain-language, screen-specific terms;
- all accessibility toolbar buttons are real buttons and keyboard usable.

## Gate 7 — Screen Accessibility Metadata Gate

Every screen should define:

- screen type;
- screen summary;
- required learner action;
- keyboard instructions;
- screen reader instructions;
- alternatives where needed;
- glossary terms where useful;
- read aloud content where useful;
- transcript metadata for audio/video;
- captions metadata where relevant;
- text alternatives for visual interactions.

## Gate 8 — Mobile And Low-Bandwidth Gate

Checks:

- screen stacks cleanly on mobile;
- no hidden CTA;
- no blocked navigation;
- no overlapping cards, buttons, or text;
- no horizontal scrolling unless explicitly approved;
- touch targets are usable;
- image-heavy screens use optimized assets;
- video/audio has text fallback;
- interactions remain usable on small screens;
- text enlargement does not break layout;
- avoid heavy custom interactions unless approved.

## Gate 9 — Content And HRBA Relevance Gate

Checks:

- HRBA content is accurate and practical;
- examples are respectful and locally relevant;
- rights-holder/duty-bearer language is used carefully;
- participation, accountability, non-discrimination, empowerment, legality, transparency, and access to information are treated as practical behaviors, not only abstract principles;
- content does not reinforce stereotypes or charity framing;
- sensitive scenarios include safeguarding and dignity considerations;
- HRBA examples support the course but do not make the design system subject-specific.

## Gate 10 — Asset Migration Gate

This will be expanded in `asset-migration-register.md`.

Initial checks:

- asset source is recorded;
- intended use is recorded;
- approval status is recorded;
- alt text is provided;
- image quality is sufficient;
- file size is reasonable;
- visual style fits the approved direction;
- asset does not carry old design debt;
- inconsistent icons are not migrated blindly;
- decorative assets are not treated as meaningful content.

## Gate 11 — Component/Block/Template Implementation Gate

For future implementation only.

Checks:

- relevant document rule exists before coding;
- only approved token/component/block/template behavior is implemented;
- accessibility behavior is built in from the start;
- component works with keyboard;
- component works on mobile;
- component does not require local CSS overrides;
- component can be reused beyond HRBA;
- implementation includes QA evidence.

## Gate 12 — Vertical Slice Gate

Before scaling, the vertical slice must test:

- course home or module orientation;
- module roadmap/progress;
- concept introduction;
- comparison or framework screen;
- scenario decision;
- reflection/portfolio capture;
- knowledge check;
- module synthesis/completion;
- accessibility tools;
- mobile responsiveness;
- AI compliance;
- content practicality.

The full HRBA course should not be rebuilt until the vertical slice passes.

## Gate 13 — Build And Regression Gate

Checks:

- npm run build passes;
- known warnings are reported;
- new warnings are explained;
- no unrelated files changed;
- no unrelated behavior affected;
- previous committed state remains recoverable;
- final git status is clean.

## Definition Of Done For Any Future Implementation Task

A task is done only when:

- scoped files only were changed;
- relevant QA gate was applied;
- build/test passed or failure was clearly explained;
- accessibility impact was checked;
- mobile impact was checked;
- AI compliance was checked;
- final status was reported;
- commit hash was provided if committed;
- remaining risks were reported.

## QA Evidence Template

- Task name:
- Branch:
- Commit:
- Files changed:
- Gate applied:
- Build result:
- Accessibility checks:
- Mobile checks:
- AI compliance checks:
- Issues found:
- Fixes made:
- Remaining risks:
- Reviewer decision: pass / revise / stop

## Stop Conditions

Work must stop if:

- branch is wrong;
- working tree is unexpectedly dirty;
- task requires files outside the allowed scope;
- required rule/document does not exist;
- implementation would require unapproved tokens, components, blocks, templates, accessibility behavior, routing, progress logic, assessment logic, or certificate logic;
- build fails for unclear reasons;
- accessibility requirement cannot be met;
- mobile layout breaks;
- old HRBA design debt would be copied directly.

## Final Commitment

QA Gates protect the CSO Learning Hub from repeating known failure patterns. They allow the team to move carefully, build confidence, prevent irreversible mistakes, and scale only after the system proves it can produce consistent, accessible, practical, and varied learning experiences.
