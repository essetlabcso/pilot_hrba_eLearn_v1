# CSO Learning Hub AI Production Contract

## Status

Draft v0.1 — Governance and operating rules for AI-assisted production

## Purpose

This contract defines how AI agents must support CSO Learning Hub development without creating design drift, accessibility problems, repeated layouts, unsafe styling, or unapproved system changes.

It sets boundaries for AI-assisted production before tokens, themes, components, blocks, templates, accessibility logic, or screens are built.

## Scope

This contract applies to:

- Codex coding tasks;
- ChatGPT planning and content-generation tasks;
- image-prompt generation tasks;
- QA and review prompts;
- future AI-assisted course production workflows.

## Core Rule

AI must not invent the system.

AI must operate inside the system.

AI may configure approved options.

AI may generate content inside approved structures.

AI must stop and ask when the system does not yet define what is needed.

## Closed Areas — AI Must Not Invent Or Change

AI must not invent or change:

- brand foundations;
- color tokens;
- typography rules;
- spacing rules;
- layout grid;
- breakpoints;
- button styles;
- component behavior;
- accessibility behavior;
- navigation structure;
- progress logic;
- locking/unlocking rules;
- certificate rules;
- assessment scoring logic;
- routing;
- file structure unless explicitly approved;
- global styling;
- local CSS overrides;
- hard-coded hex colors;
- one-off components;
- unapproved icons;
- unapproved interaction patterns.

## Configurable Areas — AI May Select Only After Options Are Approved

AI may select from approved options for:

- course theme pack;
- course player layout;
- screen template;
- learning block type;
- block variant;
- interaction type;
- feedback style;
- content density;
- reflection format;
- visual asset treatment;
- completion rule;
- mobile behavior.

## Generative Areas — AI May Draft Or Propose

AI may draft or propose:

- screen text;
- local CSO examples;
- HRBA scenarios;
- case story adaptations;
- quiz questions;
- answer feedback;
- glossary definitions;
- read aloud scripts;
- alt text;
- image prompts;
- reflection questions;
- learner instructions;
- facilitator notes;
- QA checklists;
- alternative plain-language explanations.

## Required Prompt Structure For Future Codex Tasks

Future Codex prompts must include:

- branch name;
- task purpose;
- files allowed to edit;
- files not allowed to edit;
- safety rules;
- system references to follow;
- exact expected output;
- build/test requirement;
- reporting requirement;
- stop conditions.

## Stop Conditions

AI must stop and report before acting if:

- the working tree is dirty and the task did not expect it;
- the branch is not the expected branch;
- the task requires editing files outside the allowed list;
- a required system rule is missing;
- the task would require new tokens, components, blocks, templates, or accessibility behavior not yet approved;
- the task would require deleting, moving, or refactoring old course files;
- the task would affect routing, progress, assessment, certificate, or locking logic without explicit approval;
- build/test failure appears unrelated to the permitted change.

## Documentation-Before-Code Rule

System decisions must be documented before implementation.

No token, component, block, template, theme, or accessibility behavior should be coded before its rule is defined in the appropriate document.

## One-Change-At-A-Time Rule

Each Codex task should normally change one system area only. For example:

- one document only;
- one token file only;
- one component only;
- one block only;
- one QA check only.

Any broader change must be explicitly approved.

## Reporting Requirement

Every Codex update must report:

- starting branch;
- final branch;
- files changed;
- files not touched;
- build/test result;
- commit hash if committed;
- final git status;
- whether any safety rule was triggered;
- whether any deviation was made;
- whether any follow-up risk remains.

## Prohibited Shortcuts

The following shortcuts are prohibited:

- no "quick visual fixes" using local CSS;
- no hard-coded colors;
- no copying old screen code directly into the clean system;
- no adding new libraries without approval;
- no replacing global styles casually;
- no implementing screens before templates and blocks are approved;
- no accessibility patching after the fact;
- no silent fixes outside the requested file;
- no hidden refactors;
- no "while I was there" changes.

## Relationship To The Old HRBA Pilot

- The old HRBA pilot is a protected reference.
- The WIP branch is also preserved separately.
- Useful content, images, visual direction, and learning ideas may be reviewed.
- Old local CSS, screen-level layouts, inconsistent icons, hard-coded styling, and repeated layout logic must not be copied directly.

## Future Production Flow

1. Charter approved.
2. AI production contract approved.
3. Learning block register approved.
4. Screen template register approved.
5. QA gates approved.
6. Asset migration register approved.
7. Tokens and themes defined.
8. Base accessible components built.
9. One vertical slice built.
10. QA review before scaling.

## Final Commitment

AI should accelerate disciplined system production, not reactive screen production.
