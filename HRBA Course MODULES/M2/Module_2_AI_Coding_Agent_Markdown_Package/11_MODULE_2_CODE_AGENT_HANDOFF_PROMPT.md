# Copy/Paste Prompt for Coding Agent — Module 2

You are implementing **Module 2: Human Rights in Everyday CSO Work** for the CSO Learning Hub course **Applying the Human Rights-Based Approach (HRBA) in CSO Practice**.

Use this Markdown package as the controlled source of truth. Do not use the original production workbook directly unless specifically instructed. Build the learner-facing Module 2 course-player experience only.

## Plan first

Before editing code, produce a short implementation plan that identifies:

1. routes/components/files you will update;
2. how you will represent the 7 Module 2 sections and 36 screens/blocks;
3. how you will implement matching, sorting, flashcards, tabs, timeline, process block, worksheets, portfolio checkpoint, scenario decision, and quiz;
4. how privacy and data-saving will work;
5. how certificate logic will remain untouched;
6. how accessibility and low-bandwidth requirements will be met;
7. any missing assets and how placeholder components will be used.

Do not proceed with code until the plan is clear.

## Source files in this package

Use these files:

- `01_MODULE_2_OVERVIEW.md`
- `02_MODULE_2_SCREEN_BY_SCREEN_CONTENT.md`
- `03_MODULE_2_BLOCK_STORYBOARD.md`
- `04_MODULE_2_INTERACTION_LOGIC.md`
- `05_MODULE_2_REFLECTION_PORTFOLIO_LOGIC.md`
- `06_MODULE_2_ASSESSMENT_AND_FEEDBACK.md`
- `07_MODULE_2_DESIGN_AND_VISUAL_SPEC.md`
- `08_MODULE_2_SAFETY_ACCESSIBILITY_DATA_RULES.md`
- `09_MODULE_2_ASSET_PLACEHOLDERS_AND_ALT_TEXT.md`
- `10_MODULE_2_BUILD_ACCEPTANCE_CRITERIA.md`

## Required implementation

Implement Module 2 with:

1. approved title: **Human Rights in Everyday CSO Work**;
2. approved 7-section sequence;
3. 36 learner-facing screens/blocks;
4. exact learner-facing text from `02_MODULE_2_SCREEN_BY_SCREEN_CONTENT.md`;
5. formative checks and feedback from `06_MODULE_2_ASSESSMENT_AND_FEEDBACK.md`;
6. deterministic logic from `04_MODULE_2_INTERACTION_LOGIC.md`;
7. private portfolio behavior from `05_MODULE_2_REFLECTION_PORTFOLIO_LOGIC.md`;
8. visual design rules from `07_MODULE_2_DESIGN_AND_VISUAL_SPEC.md`;
9. safety/accessibility rules from `08_MODULE_2_SAFETY_ACCESSIBILITY_DATA_RULES.md`;
10. asset references from `09_MODULE_2_ASSET_PLACEHOLDERS_AND_ALT_TEXT.md`.

## Hard constraints

Do not:

- expose screen IDs, block IDs, source IDs, evidence IDs, QA notes, or implementation metadata to learners;
- include source inventories, evidence packs, change logs, approval locks, or review history;
- create early human-rights knowledge quizzes in Section 1;
- use “Incorrect,” “Wrong,” “Failed,” or pass/fail language;
- imply Module 2 checks affect the certificate;
- issue or unlock certificates from Module 2;
- request names, real cases, active complaints, safeguarding details, beneficiary lists, confidential documents, political details, legal disputes, raw organizational data, or uploads;
- send raw reflections, worksheet entries, optional notes, or portfolio content to AI services;
- make worksheets download-only;
- use drag-and-drop-only interactions;
- invent asset filenames;
- present standards as legal advice.

Must:

- use “Not quite” for weaker responses;
- use “That’s right” or “Good choice” for best responses;
- keep all Module 2 checks formative;
- state certificate eligibility remains tied to final course test score of 80% or above;
- include the non-legal-advice notice in Section 6;
- implement `My Everyday Rights Lens` portfolio checkpoint;
- keep portfolio and worksheet data private by default;
- provide downloadable and in-platform worksheet options;
- ensure keyboard, tap, screen-reader, and low-bandwidth support;
- use DEC/CSO Learning Hub colors and premium card-based course-player design.

## Acceptance criteria

Use `10_MODULE_2_BUILD_ACCEPTANCE_CRITERIA.md` as the final QA checklist. The implementation is not complete until every acceptance check passes.

## Evidence pack required after implementation

After completing the work, provide:

1. summary of implementation;
2. files changed;
3. routes/screens affected;
4. components created or updated;
5. data/schema changes, if any;
6. role/permission changes, if any;
7. certificate logic confirmation;
8. safety/privacy confirmation;
9. accessibility and low-bandwidth confirmation;
10. asset handling summary;
11. tests/checks run and results;
12. known gaps or missing assets;
13. manual verification steps.

## Final verification

Verify at minimum:

- Module 2 route loads;
- all 7 sections appear;
- all 36 screens/blocks are reachable;
- matching works with non-drag alternative;
- sorting works with non-drag alternative;
- flashcards/tabs/timeline/process blocks are keyboard accessible;
- worksheets have in-platform and download options;
- `My Everyday Rights Lens` saves privately or uses the existing private portfolio mechanism;
- final quiz has exactly 5 MCQs;
- feedback uses “Not quite,” “That’s right,” and “Good choice” as specified;
- no Module 2 activity triggers certificate logic;
- no sensitive fields or uploads are requested;
- missing assets render as placeholders using approved references.
