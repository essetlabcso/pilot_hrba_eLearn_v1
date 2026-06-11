# Module 1 Prototype Build Control

## Purpose
This package converts the Module 1 audit and targeted repair package into a build-ready prototype package for the CSO Learning Hub HRBA course.

## Binding design direction
- Preserve the UNICEF/Agora-inspired **two-layer architecture**:
  - **Layer 1: Course platform / LMS layer** for launch, progress, table of contents, completion, next-module navigation, and certificate pathway.
  - **Layer 2: Focused course-player layer** for slide-like learning screens, player shell, help, glossary, resources, transcript/captions, accessibility, interactions, practice checks, summary, and completion.
- Preserve the Agora-inspired design strengths: split-screen module cover, fixed player header, left toolbar, help overlay, modal interactions, practice checks, feedback states, summary tabs, completion screen, and return-to-platform flow.
- Do **not** force Module 1 or future modules into 26 screens. Screen count is content-led and module-specific.
- Preserve the existing Module 1 learner-facing content unless the targeted repair package explicitly adds shell/platform/completion states or objective-capacity mapping.
- Use DEC/CSO Learning Hub visual identity and safe HRBA learning rules.

## Prototype scope
The Module 1 prototype must implement:
1. Layer 1 Module 1 launch page.
2. Layer 2 Module 1 cover screen.
3. Reusable focused player shell.
4. Help overlay.
5. Accessibility modal.
6. Existing Module 1 learner-facing content screens.
7. Interaction states from the interaction registry.
8. Visual asset placeholders/prompts from the asset register.
9. Module 1 completion screen.
10. Layer 1 return-to-platform progress state and Continue to Module 2 CTA.

## Package contents
- `HRBA_Module_1_Prototype_Build_Package.xlsx`
- `docs/Module_1_Prototype_Build_Prompt.md`
- `docs/Module_1_Prototype_QA_Checklist.md`
- `data/module_1_screen_sequence.csv`
- `data/module_1_screen_sequence.json`
- `data/module_1_interaction_state_registry.csv`
- `data/module_1_interaction_state_registry.json`
- `data/module_1_visual_asset_prompts.csv`
- `data/module_1_visual_asset_prompts.json`
- `data/module_1_story_scenario_register.csv`
- `data/module_1_story_scenario_register.json`
- `data/module_1_objective_capacity_map.csv`
- `data/module_1_objective_capacity_map.json`
- `source_inputs/` with supporting source files.

## Build gate
The package is ready for Module 1 prototype implementation when the builder can demonstrate:
- launch → focused player → interactions → summary → completion → return to platform;
- Module 1 completed state and Continue to Module 2;
- keyboard accessibility, alt text, transcript/caption support, non-drag alternatives, and low-bandwidth options;
- no collection of sensitive real-world data;
- evidence pack with screenshots/previews and test results.
