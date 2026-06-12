# Module 2 Codex Implementation Prompts

## Purpose

This file provides focused, token-efficient prompts for Codex to implement Module 2 improvements in small, safe passes.

Do not give Codex one large vague instruction such as “fix Module 2.” Use one prompt at a time, review the result, then continue.

## Prompting strategy

Use this sequence:

1. Baseline build check
2. Contrast and readability
3. Interaction accessibility
4. Hotspot and diagram clarity
5. Interaction fatigue and learning flow
6. Visual asset integration
7. Final QA and deployment readiness

Each prompt should:
- define exact scope
- avoid broad redesign
- protect learner-facing content
- require `npm run build`
- require a clear summary of changed files
- commit only after successful build if appropriate

---

## Prompt 1 — Baseline build check

```text
Task: Run a baseline check before Module 2 improvements.

Scope: Do not change files yet.

Please:
1. Inspect the project structure.
2. Identify the Module 2 screen/component files.
3. Run `npm run build`.
4. Report any build errors.
5. Do not edit code.
6. Do not commit.

At the end, summarize:
- Module 2 files/components found
- current build status
- any existing TypeScript or build errors
- recommended order of fixes
```

---

## Prompt 2 — Contrast and readability improvements

```text
Task: Fix Module 2 contrast and readability issues identified in the QA review.

Scope: Module 2 only, but prefer fixing shared styles/components if the same issue affects multiple Module 2 screens.

Focus areas:
- disabled Continue buttons
- muted helper text
- card labels
- badges
- progress indicators
- selected/disabled states
- hotspot labels
- feedback messages
- text on pale mint, gradient, dark navy, or image backgrounds

Known issue:
Disabled Continue buttons use weak contrast, including slate text on light slate backgrounds. Update disabled button styling so text remains readable and meets WCAG AA contrast while still looking inactive.

Instructions:
1. Inspect Module 2 screens and shared button/card/progress styles.
2. Fix contrast problems at the reusable style/component level where possible.
3. Do not redesign Module 2.
4. Do not change learner-facing content unless necessary for accessibility labels.
5. Do not weaken TypeScript or accessibility standards.
6. Ensure disabled, selected, completed, correct, and incorrect states remain visually distinct.
7. Run `npm run build`.
8. Fix any build errors.
9. Summarize changed files and the contrast improvements made.

Commit message:
`Improve Module 2 contrast and readability`
```

---

## Prompt 3 — Interaction accessibility improvements

```text
Task: Improve Module 2 interaction accessibility without redesigning the module.

Scope: Module 2 only.

Review and improve accessibility for:
- M2-S03 flip cards
- M2-S06 matching activity
- M2-S16 accountability loop/progress interaction
- M2-S17 feedback loop repair radio grid
- M2-S18 hotspot interaction
- M2-S22 knowledge check

Required improvements:
1. Ensure all interactive elements are keyboard accessible.
2. Ensure visible focus states are clear and high contrast.
3. Ensure selected, correct, and incorrect states do not rely on color alone.
4. Ensure flip cards do not expose hidden back-face content incorrectly to screen readers.
5. Ensure matching activity has a clear non-drag alternative if drag-and-drop exists.
6. Ensure hotspot/reveal content has useful aria labels or focus behavior.
7. Ensure knowledge check result/feedback updates are announced appropriately, for example with aria-live where suitable.
8. Add meaningful alt text or adjacent text descriptions for learning-critical visuals.
9. Do not change the learning content or screen sequence.
10. Run `npm run build` and fix any errors.

Commit message:
`Improve Module 2 interaction accessibility`
```

---

## Prompt 4 — Hotspot and diagram clarity

```text
Task: Improve Module 2 hotspot and diagram clarity, responsiveness, and accessibility.

Scope:
- M2-S04 Rights Dimensions Hotspot
- M2-S08 Rights-Holders / Actor Map
- M2-S18 Power and Exclusion Hotspots
- Any shared hotspot/diagram component used by these screens

Required improvements:
1. Make hotspot labels readable on all backgrounds.
2. Add solid or semi-transparent label containers where text overlays images.
3. Prevent hotspot text from blending into complex images.
4. Ensure hotspot positions remain responsive and do not overlap important content on smaller screens.
5. Ensure diagrams scale cleanly on laptop/tablet/mobile widths.
6. Add meaningful alt text or adjacent long descriptions for learning-critical diagrams.
7. If existing raster images are used, do not replace them yet unless a better SVG already exists in the repo. First improve layout, overlays, responsiveness, and accessibility.
8. Do not redesign unrelated screens.
9. Run `npm run build` and fix any errors.

Commit message:
`Improve Module 2 hotspot and diagram clarity`
```

---

## Prompt 5 — Reduce interaction fatigue

```text
Task: Improve Module 2 learning flow by reducing repetitive interaction fatigue.

Scope: Module 2 only.

Known issue:
Many Module 2 screens use repeated “open all to continue” or “click all cards/hotspots/reveals before continuing” mechanics. This can frustrate learners.

Instructions:
1. Identify Module 2 screens using forced reveal/open-all completion logic.
2. Keep strict gating for true practice, matching, repair, portfolio, and knowledge check screens.
3. For lower-stakes concept exploration screens, allow continuation after a meaningful minimum has been explored.
4. Keep optional “Explore all” behavior available where useful.
5. Add or improve progress messaging such as “2 of 5 explored.”
6. Ensure learners always know what to do next.
7. Do not remove learner-facing content.
8. Do not weaken learning objectives.
9. Do not redesign unrelated screens.
10. Run `npm run build` and fix any errors.

Commit message:
`Refine Module 2 interaction flow`
```

---

## Prompt 6 — Visual asset integration

```text
Task: Integrate provided Module 2 visual assets into the course.

Scope: Module 2 only.

Use only assets that are already provided in the repo or uploaded for this task. Do not invent large realistic illustrations.

Recommended asset locations:
- `src/assets/images/module-2/`
- `src/assets/illustrations/module-2/`
- `src/assets/icons/module-2/`

Integrate assets if available for:
- M2-S01A intro video poster
- M2-S04 rights dimensions hotspot
- M2-S08 rights-holders actor map
- M2-S13 SDG/LNOB linkage infographic
- M2-S16 accountability loop
- M2-S17 feedback repair visual
- M2-S18 power and exclusion hotspot background
- M2-S22 knowledge check icon set
- M2-S23 completion transition visual

Instructions:
1. Place assets in a clean folder structure.
2. Use descriptive filenames.
3. Import assets using existing project conventions.
4. Add meaningful alt text for learning-critical images.
5. Treat decorative images appropriately.
6. Ensure responsive sizing.
7. Do not break existing screen content.
8. Run `npm run build` and fix any errors.

Commit message:
`Integrate Module 2 visual assets`
```

---

## Prompt 7 — Final Module 2 QA pass

```text
Task: Run a final QA pass for Module 2 after improvements.

Scope: Review and test only unless small fixes are required for build-breaking or obvious issues.

Check:
1. `npm run build` passes.
2. All Module 2 screens are reachable.
3. Next/back navigation works.
4. Sidebar/current screen state works.
5. Progress tracker works.
6. Disabled/enabled Continue states behave correctly.
7. Contrast improvements are visible.
8. Keyboard navigation works for interactive screens.
9. Focus states are visible.
10. Hotspots and diagrams are readable.
11. No broken image imports.
12. No missing assets.
13. No TypeScript errors.
14. No unused variables.
15. Vercel deployment should be able to succeed after push.

If small fixes are needed, make them carefully. Do not redesign.

Run `npm run build` again after any fix.

Commit message:
`Finalize Module 2 QA fixes`
```

---

## Token-efficient usage notes

Use one prompt per Codex session or one prompt per commit.

Do not paste the full QA report every time. Instead, attach the relevant markdown file:

- For contrast: `03-module-2-contrast-accessibility-fixes.md`
- For diagrams: `04-module-2-hotspot-diagram-upgrade-brief.md`
- For learning flow: `05-module-2-interaction-learning-experience-fixes.md`
- For assets: `06-module-2-visual-asset-briefs.md`
- For final QA: `08-module-2-final-qa-checklist.md`

Best order:
1. Contrast/readability
2. Accessibility
3. Hotspots/diagrams
4. Interaction fatigue
5. Assets
6. Final QA
