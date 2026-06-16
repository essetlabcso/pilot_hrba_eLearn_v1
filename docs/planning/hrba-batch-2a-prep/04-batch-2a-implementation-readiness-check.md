# Batch 2A Implementation Readiness Check

| Item | Ready? | Notes |
| ---- | ------ | ----- |
| Target screens identified | Yes | 33 target screens or clusters are listed in `01-batch-2a-target-screen-list.md`. |
| Worked examples drafted | Yes, for human review | 21 concise examples are drafted by cluster in `02-worked-example-library-draft.md`. |
| Safeguarding language included | Yes, draft | Each example includes a safety/safeguarding note; safeguarding reviewer should approve before source edits. |
| HRBA concepts checked | Partly | Drafts use barriers, rights-holders, duty-bearers, participation, accountability, evidence, and bounded CSO role. HRBA reviewer still required. |
| No sensitive real-world examples used | Yes | Examples are fictional, generalized, and avoid real organizations, officials, locations, incidents, survivors, children, disputes, or identifiable groups. |
| Implementation layer confirmed | Yes | Intended implementation layer is editable course layer only. |
| Protected files to avoid | Yes | Avoid production source outside targeted course-layer files; do not edit CSS, tokens, themes, routing, progress, assessment, certificate, accessibility toolbar, shared components, or visual assets. |
| Screenshots needed after implementation | Yes | Each changed screen needs desktop screenshot; high-load screens should also receive tablet/mobile evidence in later QA if layout risk is visible. |
| Build/TypeScript/lint required after implementation | Yes | Run `npm run build`, `npx tsc -b --pretty false`, and `npm run lint` after any source implementation. |
| Human review required before implementation | Yes | Examples need HRBA, safeguarding, and instructional design approval before Codex edits source files. |
| First implementation slice selected | No | Human owner should choose whether Batch 2A starts with Module 2 only, a cross-module sample, or highest-priority P1 targets across Modules 2-5. |
| Source files identified for implementation | Partly | Likely module renderer/content files only, but exact files should be confirmed during implementation planning. |
| Mobile/accessibility QA protocol ready | No | Batch 2A can require screenshots and smoke checks, but full mobile/accessibility protocol belongs to later QA/technical batches. |

## Readiness Decision

Batch 2A preparation is ready for human review. It is not yet ready for source implementation until the target slice and worked-example wording are approved.
