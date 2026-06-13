# CSO Learning Hub Asset Migration Register

## Status

Draft v0.1 — Asset and content migration rules for the clean HRBA system branch

## Purpose

The old HRBA pilot contains useful content, images, visual direction, and learning ideas. It also contains screen-level design debt.

This register defines how to review and approve only the useful assets and content for migration into the clean system while preventing old design debt from entering the new design-system-based course.

## Relationship To Existing System Documents

This register must follow:

- the System Charter;
- the AI Production Contract;
- the Learning Block Register;
- the Screen Template Register;
- the QA Gates.

This document does not migrate assets or implement code.

## Core Migration Rule

Assets and content may migrate after review.

Screen-level design debt must not migrate.

Nothing from the old HRBA pilot should be copied directly into the clean system unless it is reviewed, approved, renamed if needed, documented, and assigned to an approved use.

## What May Be Considered For Migration

- course/module cover images;
- approved illustrations;
- selected icons only after icon consistency review;
- useful diagrams;
- useful HRBA examples;
- useful case stories;
- useful scenario ideas;
- useful quiz questions;
- useful reflection prompts;
- useful content structure;
- useful module sequencing;
- useful accessibility text or plain-language explanations;
- useful visual direction translated into future tokens/themes, not copied as hard-coded style.

## What Must Not Migrate Directly

- old screen-level React code;
- old local CSS fixes;
- hard-coded colors;
- hard-coded gradients;
- inconsistent icon sets;
- unsafe text/background combinations;
- repeated layouts;
- improvised one-off interactions;
- old spacing hacks;
- old button styles;
- old assessment/progress/routing logic unless separately reviewed and approved;
- decorative images without purpose;
- large unoptimized image files;
- assets without alt text where alt text is needed.

## Migration Review Categories

- Approved for migration;
- Approved after minor cleanup;
- Needs review;
- Needs redesign;
- Reject / do not migrate;
- Archive as reference only.

## Asset/Content Register Fields

Use this table structure when recording migration candidates:

| Register ID | Source branch/reference | Source file or location | Asset/content type | Original name/title | Proposed clean-system name | Intended use | Related course/module/screen | Related learning block or screen template | Migration status | Accessibility requirement | Alt text or text alternative | Caption/transcript requirement | File size / optimization note | Visual consistency note | Design debt risk | Safeguarding/sensitivity note | Decision | Reviewer | Date | Follow-up action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

## Naming Convention Rules

- use lowercase kebab-case for files;
- include course prefix where relevant, such as `hrba-`;
- include module/screen reference where useful, such as `m2-s04`;
- use descriptive names, not generic names;
- avoid spaces and unclear names;
- keep extensions accurate;
- do not rename in code until migration is approved.

Example:

- Old name: `module2cover-final-new.png`
- Clean name: `hrba-m2-rights-accountability-cover.png`

## Accessibility And Inclusion Requirements

- meaningful images must have alt text;
- decorative images must be marked decorative when implemented;
- diagrams must have text alternatives;
- video/audio must have transcripts or captions;
- icons must not be the only way meaning is communicated;
- visual examples must avoid stereotypes, charity framing, and sensationalism;
- sensitive HRBA stories must protect dignity and safeguarding;
- examples should use respectful, locally relevant, human-centered language.

## Visual Consistency Requirements

- asset must fit the approved visual direction;
- asset must not conflict with future theme packs;
- icon style must be consistent;
- image should support the learning purpose;
- asset must work with overlays if overlays are expected;
- asset must remain readable on mobile;
- asset should not contain tiny unreadable text;
- asset should be usable in low-bandwidth conditions after optimization.

## Low-Bandwidth And Performance Requirements

- image-heavy assets must be optimized before implementation;
- avoid unnecessary large files;
- prefer scalable/vector assets where appropriate;
- provide text fallback for media-heavy learning;
- do not migrate heavy video-first assets without explicit approval;
- record file size and optimization needs before approval.

## Content Migration Requirements

Content must be remapped into approved learning blocks and screen templates.

- old content should not be pasted into new screens without restructuring;
- long text should be chunked into appropriate blocks;
- examples should be checked for accuracy and relevance;
- HRBA concepts should be practical and plain-language;
- scenario content should include learner action and feedback;
- reflection prompts should be safe, respectful, and not overly personal;
- quiz items should align with taught content.

## HRBA-Specific Migration Guidance

HRBA content can support the first pilot but must not make the design system subject-specific.

- rights-holder vs duty-bearer material → Comparison Block / Comparison Screen;
- five HRBA principles → Framework Explanation Screen;
- participation dilemma → Decision Scenario Screen;
- exclusion risk example → Risk-Spotting Screen;
- root-cause analysis tool → Tool Practice / Repair Lab Screen;
- legal and policy analysis checklist → Action Planning Screen;
- module recap content → Module Synthesis Screen.

## Asset Migration Workflow

1. Identify candidate asset/content from old HRBA pilot.
2. Record it in the register.
3. Classify type and intended use.
4. Check design debt risk.
5. Check accessibility needs.
6. Check visual consistency.
7. Check mobile and low-bandwidth suitability.
8. Approve, redesign, reject, or archive.
9. Only after approval, copy into the approved assets/content location.
10. Record final clean-system name and use.

## What AI May Do With This Register

AI may:

- suggest candidate assets/content for review;
- draft alt text;
- suggest clean file names;
- classify assets by type;
- identify possible design debt risks;
- map content to approved blocks/templates;
- recommend approve/review/reject status for human review.

AI must not:

- move or copy assets without approval;
- silently rename files;
- migrate old screen code;
- copy local CSS;
- approve its own migration decision without review;
- treat decorative images as meaningful content;
- bypass accessibility requirements.

## Initial Empty Register Table

| Register ID | Source branch/reference | Source file or location | Asset/content type | Original name/title | Proposed clean-system name | Intended use | Related course/module/screen | Related learning block or screen template | Migration status | Accessibility requirement | Alt text or text alternative | Caption/transcript requirement | File size / optimization note | Visual consistency note | Design debt risk | Safeguarding/sensitivity note | Decision | Reviewer | Date | Follow-up action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Example only — not an approved migrated asset | legacy/hrba-pilot-v1 | Example source path only | Example image/content | Example original title | example-clean-system-name.png | Example intended use | Example course/module/screen | Example block/template | Needs review | Example accessibility requirement | Example alt text or text alternative | Example caption/transcript note | Example file size note | Example visual consistency note | Example design debt risk | Example sensitivity note | Example decision pending | Example reviewer | Example date | Example follow-up action |

## Stop Conditions

Work must stop if:

- asset source is unclear;
- approval status is unclear;
- asset appears to contain old design debt;
- alt text or text alternative is needed but missing;
- asset may create accessibility or safeguarding risk;
- migration would require editing old HRBA files;
- migration would require code changes not approved in the current task;
- asset would require unapproved token/theme/component/template decisions.

## Final Commitment

Asset migration must protect the value of the old HRBA pilot while preventing old design debt from entering the clean system. The clean system should reuse what is useful, reject what is risky, and document every migration decision before implementation.
