# Copy/Paste Prompt — Module 1 Prototype Build

## Role
You are the course build agent for the CSO Learning Hub HRBA course. Build the Module 1 prototype using the locked improved design specification, Module 1 audit, targeted repair package, clean Module 1 workbook, and this prototype build package.

## Plan first
First produce a concise implementation plan before coding/building. The plan must explain how you will preserve:
- the two-layer architecture;
- the Agora-inspired focused player design;
- DEC/CSO Learning Hub branding;
- accessibility and low-bandwidth support;
- safety and no-sensitive-data rules;
- completion/progress logic;
- the flexible screen-count rule.

Do not begin implementation until the plan is stated.

## Hard constraints
- Do not force Module 1 or any later module into 26 screens. Screen count is content-led.
- Preserve the existing Module 1 learner-facing storyboard unless a targeted repair explicitly adds or modifies a shell/platform/completion state.
- Do not invent learner-facing HRBA content, source references, real organizations, real locations, final filenames, or extra module requirements.
- Do not request or store sensitive personal, political, safeguarding, complaint, beneficiary, or confidential organizational data.
- Keep module practice checks formative and separate from the final certificate test.
- Ensure every interactive block has a keyboard/tap alternative and text alternative where needed.

## Required implementation
Implement or prepare the following:
1. Layer 1 Module 1 launch page.
2. Layer 2 Module 1 cover screen with Start state.
3. Reusable course-player shell:
   - fixed header;
   - left toolbar;
   - Menu, Glossary, Resources, Help, Transcript/Captions, Pause/Play, Mute/Sound, Replay, Return/Exit;
   - screen progress display;
   - previous/next controls.
4. Help overlay with Agora-style dark overlay and labelled controls.
5. Accessibility modal with keyboard, caption/transcript, screen-reader, alt-text, pause/replay, low-bandwidth, and safety guidance.
6. Existing Module 1 screens from the clean workbook.
7. Interaction states from `data/module_1_interaction_state_registry.json`.
8. Visual placeholders or assets from `data/module_1_visual_asset_prompts.json`.
9. Story/scenario handling from `data/module_1_story_scenario_register.json`.
10. Module 1 summary and completion screen.
11. Return-to-platform progress state with Module 1 completed and Continue to Module 2 CTA.

## Acceptance criteria
Verify and provide evidence that:
- the learner can launch Module 1 from Layer 1;
- the focused player opens with cover screen and Start button;
- Help, Accessibility, Resources/Glossary, transcript/caption support, replay, and return controls are reachable;
- required interactions can be completed;
- module summary is available;
- learner can finish Module 1;
- return-to-platform state shows Module 1 completed;
- Continue to Module 2 is visible;
- keyboard navigation works;
- alt text and transcript/caption alternatives are present;
- drag/drop alternatives are present;
- low-bandwidth fallbacks are present;
- no sensitive data is requested or displayed.

## Evidence pack requirements
Return an evidence pack including:
- implemented files/components list;
- screenshots or rendered previews of Layer 1 launch page, Module 1 cover, Help overlay, Accessibility modal, at least two content interactions, summary, completion, and return-to-platform state;
- interaction test results;
- accessibility checks;
- safety checks;
- known gaps or open items;
- confirmation that the 26-screen rule was not imposed as a fixed module rule.

## Source files to use
- `HRBA_Module_1_Prototype_Build_Package.xlsx`
- `data/module_1_screen_sequence.json`
- `data/module_1_interaction_state_registry.json`
- `data/module_1_visual_asset_prompts.json`
- `data/module_1_story_scenario_register.json`
- `data/module_1_objective_capacity_map.json`
- `source_inputs/Module_1_HRBA_Clean_AI_Coding_Workbook_FINAL.xlsx`
- `source_inputs/HRBA_Module_1_Targeted_Repair_Package.xlsx`
- `source_inputs/Consolidated_Design_Specification_for_HRBA_Course_REVISED.docx`
