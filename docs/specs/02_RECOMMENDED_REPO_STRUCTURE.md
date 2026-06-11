# 02 Recommended Repo Structure

This repo structure adapts the UNICEF/Agora recreation repo into a CSO Learning Hub HRBA course implementation repo.

```text
cso-learning-hub-hrba/
├── .gitignore
├── AGENTS.md
├── README.md
├── README_START_HERE.md
├── docs/
│   ├── specs/
│   │   ├── 00_MASTER_PRODUCT_BRIEF.md
│   │   ├── 00_SPECIFICATION_PACKAGE_MAP.md
│   │   ├── 01_LOCKED_DESIGN_DECISIONS.md
│   │   ├── 02_RECOMMENDED_REPO_STRUCTURE.md
│   │   ├── 03_ARCHITECTURE_AND_PLAYER_MODEL.md
│   │   ├── 04_AGORA_TO_HRBA_ADAPTATION_RULES.md
│   │   ├── 05_MODULE_SCREEN_AND_BLOCK_RULES.md
│   │   ├── 06_COMPONENT_AND_STATE_MODEL.md
│   │   ├── 07_QA_AND_ACCEPTANCE_GATES.md
│   │   ├── 08_VISUAL_DESIGN_SYSTEM.md
│   │   ├── 09_OUTER_CSO_PLATFORM_SPEC.md
│   │   ├── 10_HRBA_COURSE_PLAYER_SPEC.md
│   │   ├── 11_INTERACTION_BLOCK_LIBRARY.md
│   │   ├── 12_HRBA_CONTENT_SOURCE_OF_TRUTH.md
│   │   ├── 13_NAVIGATION_AND_STATE_FLOW.md
│   │   ├── 14_ACCESSIBILITY_AND_USABILITY_SPEC.md
│   │   ├── 15_ASSET_INVENTORY_AND_SUBSTITUTION_RULES.md
│   │   ├── 16_SCREEN_STATE_REGISTRY.md
│   │   ├── 17_FINAL_TEST_AND_CERTIFICATE_SPEC.md
│   │   └── 18_MODULE_AUDIT_MATRIX_SPEC.md
│   ├── implementation/
│   │   ├── DECISIONS_AND_OPEN_ITEMS_HRBA.md
│   │   ├── IMPLEMENTATION_SEQUENCE_HRBA.md
│   │   ├── MODULE_AUDIT_LOG.md
│   │   ├── SCREENSHOT_AUDIT.md
│   │   └── SOURCE_PACKAGE_AUDIT.md
│   ├── prompts/
│   │   ├── 00_PLAN_FIRST_CODEX_PROMPT.md
│   │   ├── 01_MODULE_AUDIT_PROMPT.md
│   │   ├── 02_MODULE_STORYBOARD_REPAIR_PROMPT.md
│   │   ├── 03_MODULE_BUILD_HANDOFF_PROMPT.md
│   │   └── 04_QA_REPAIR_PROMPT.md
│   ├── qa/
│   │   ├── QA_LOG.md
│   │   ├── ACCESSIBILITY_QA.md
│   │   ├── SAFETY_QA.md
│   │   └── MODULE_APPROVAL_LOG.md
│   └── reference/
│       ├── agora_screens/
│       │   ├── raw/
│       │   ├── normalized/
│       │   └── SCREENSHOT_MANIFEST.csv
│       ├── cso_learning_hub_screens/
│       ├── brand/
│       ├── source_docs/
│       └── examples/
├── content/
│   ├── course_overview/
│   ├── modules/
│   │   ├── module_00_opening/
│   │   │   ├── storyboard.md
│   │   │   ├── visual_storyboard.md
│   │   │   ├── interaction_logic.md
│   │   │   ├── assessment_map.md
│   │   │   └── asset_register.md
│   │   ├── module_01_hrba_foundations/
│   │   ├── module_02_rights_in_everyday_cso_work/
│   │   ├── module_03_rights_holders_and_duty_bearers/
│   │   ├── module_04_hrba_principles/
│   │   ├── module_05_hrba_project_design/
│   │   ├── module_06_hrba_implementation/
│   │   ├── module_07_hrba_meal/
│   │   ├── module_08_hrba_advocacy_and_enabling_environment/
│   │   └── module_09_synthesis_assessment_action_plan/
│   ├── glossary/
│   ├── resources/
│   └── final_test/
├── assets/
│   ├── images/
│   ├── icons/
│   ├── diagrams/
│   ├── worksheets/
│   ├── video/
│   ├── audio/
│   ├── transcripts/
│   └── reference/
├── src/
│   ├── components/
│   │   ├── platform/
│   │   ├── player/
│   │   ├── blocks/
│   │   ├── modals/
│   │   └── shared/
│   ├── content/
│   ├── data/
│   ├── state/
│   ├── styles/
│   └── utils/
└── tests/
    ├── visual/
    ├── accessibility/
    ├── interaction/
    └── state_flow/
```

## Repo Structure Rule
The specification folder is the source of truth. Implementation must not proceed from screenshots alone, isolated prompts, or partial module workbooks.

## Naming Rule
Use HRBA and CSO Learning Hub naming. Do not retain UNICEF, Agora, child-rights, Egyptian cotton, or EU-specific filenames except inside the reference folder.
