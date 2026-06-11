# Module 1 Batch 3 Evidence Pack

## Scope Completed

Batch 3 upgraded only:

- M1-S05 — Water Project Story
- M1-S06 — Investigate the HRBA Lens
- M1-S07 — So, What Is HRBA?

No Batch 4 work was started. M1-S08 through M1-S19 were not redesigned. Module 2 and other modules were not modified. The Batch 2C external Module 1 cover launch behavior was preserved.

## Files Changed

Source and styling:

- `src/components/course/Module1Renderer.tsx`
- `src/components/player/CoursePlayerShell.tsx`
- `src/styles/global.css`

Evidence:

- `docs/refinement/evidence/module-1-batch-3/evidence-pack.md`
- `docs/refinement/evidence/module-1-batch-3/browser-check-results.json`
- `docs/refinement/evidence/module-1-batch-3/course-page-launch-point.png`
- `docs/refinement/evidence/module-1-batch-3/module-1-cover-launch-1280x720.png`
- `docs/refinement/evidence/module-1-batch-3/after-start-module-1-player-m1-s02.png`
- `docs/refinement/evidence/module-1-batch-3/m1-s05-1280x720.png`
- `docs/refinement/evidence/module-1-batch-3/m1-s06-initial-1280x720.png`
- `docs/refinement/evidence/module-1-batch-3/m1-s06-all-clues-1280x720.png`
- `docs/refinement/evidence/module-1-batch-3/m1-s07-initial-question-1280x720.png`
- `docs/refinement/evidence/module-1-batch-3/m1-s07-feedback-1280x720.png`
- `docs/refinement/evidence/module-1-batch-3/module-1-menu-open.png`

## Scope Confirmation

Only M1-S05 to M1-S07 were redesigned. The change in `CoursePlayerShell.tsx` only updates the M1-S07 completion guard to match the new feedback-panel interaction model.

## Active 19-Screen Order Confirmation

The Module 1 menu still reports 19 active screens:

1. Introduction to HRBA for Local CSOs
2. What You Will Be Able to Do
3. Why This Module Matters
4. Your Learning Journey
5. Water Project Story
6. Investigate the HRBA Lens
7. So, What Is HRBA?
8. Everyday CSO Work
9. Who Might Be Invisible?
10. Rights Are Connected
11. From Beneficiaries to Rights-Holders
12. Who Has Responsibility?
13. Participation Is More Than Attendance
14. From Services to Rights, Power, and Accountability
15. Module 1 Knowledge Check
16. Self-Assessment
17. Priority and Action Commitment
18. Key Takeaways and Module 1 Completion Preview
19. Module 1 Completion Screen

## No-Scroll Verification

Viewport: 1280 x 720.

| View | Result | Notes |
| --- | --- | --- |
| M1-S05 | Pass | Slide, main player area, image, bottom strip, and CTA fit without vertical scroll. |
| M1-S06 initial | Pass | Four clue cards, progress indicator, fixed reveal panel, visual, and locked Continue fit without vertical scroll. |
| M1-S06 all clues explored | Pass | All explored states and unlocked Continue fit without vertical scroll. |
| M1-S07 initial question | Pass | Definition, three choices, feedback placeholder, and locked Continue fit without vertical scroll. |
| M1-S07 feedback | Pass | Correct feedback state and unlocked Continue fit without vertical scroll. |

## M1-S06 Interaction Behavior

- Four clue cards are native buttons.
- Clicking a clue marks it explored, updates the visible check state, updates the progress indicator, and updates a fixed reveal panel.
- Continue is disabled until all four clues are explored.
- The top Next control is also disabled until all four clues are explored.
- Explored state uses a visible check mark and not color alone.

## M1-S07 Interaction Behavior

- Three answer choices are native buttons.
- Selecting a choice writes the selected answer and shows feedback in a fixed feedback panel.
- Continue activates after feedback is viewed. This follows the Batch 3 allowance that the CTA may activate after the correct choice or after feedback is viewed.
- The verified feedback screenshot uses the correct answer: `C. Look at the project through rights, people, power, participation, and responsibility.`
- Selected state includes a visible `Selected` label and `aria-pressed`.

## Asset Usage Notes

- M1-S05 and M1-S06 use the registered water-point scenario image: `/assets/hrba/module-1/images/m1_s05_water_point_scenario_v1.png`.
- A PNG fallback path remains wired for the water-point visual.
- M1-S06 and M1-S07 use the registered HRBA lens icon, preferring PNG and falling back to SVG.
- Browser verification reported no broken images.

## Accessibility Notes

- M1-S05 image has meaningful alt text.
- M1-S05 quote is rendered as real text, not embedded in an image.
- M1-S06 clue controls and M1-S07 choice controls are keyboard-accessible buttons.
- Focus-visible styling is present for Batch 3 buttons/cards.
- Progress and feedback use visible text and `aria-live`.
- Status does not rely on color alone.
- No autoplay motion or keyboard traps were introduced.

## Routing Sanity Check

Verified:

- Course page `Start Module 1` opens the external Module 1 cover launch screen.
- The external cover screen has no player header/sidebar/tools.
- Cover `Start Module 1` enters the player shell at M1-S02: `What You Will Be Able to Do`, Screen 2 of 19.
- Prev, Next, and Exit remain visible in the player shell.

## Build Result

`npm run build` completed successfully.

Observed existing warning:

- Vite reports that some chunks are larger than 500 kB after minification. This remains a bundle-size warning, not a build failure.

## Console Result

Browser verification reported:

- `consoleIssues: []`

## Browser Check Notes

The in-app browser screenshot call timed out during this run, matching the behavior seen in Batch 2C. Verification screenshots and measurements were captured through a clean temporary Chrome DevTools Protocol session instead.

The course page itself is taller than 720px, as expected for the course catalog. The target no-scroll checks apply to the Module 1 cover/player screens and M1-S05 to M1-S07.

## Screenshots

- Course launch point: `course-page-launch-point.png`
- Module 1 cover launch: `module-1-cover-launch-1280x720.png`
- Player entry at M1-S02: `after-start-module-1-player-m1-s02.png`
- M1-S05: `m1-s05-1280x720.png`
- M1-S06 initial: `m1-s06-initial-1280x720.png`
- M1-S06 all clues explored: `m1-s06-all-clues-1280x720.png`
- M1-S07 initial question: `m1-s07-initial-question-1280x720.png`
- M1-S07 feedback: `m1-s07-feedback-1280x720.png`
- Module 1 menu: `module-1-menu-open.png`

## Unresolved Issues

- Existing Vite chunk-size warning remains.
- In-app browser screenshot capture timed out, but the Chrome CDP fallback completed the verification with clean results.

## Recommendation for Batch 4

Continue with the next controlled group only after preserving the Batch 2C cover route and the Batch 3 interaction guard behavior. Keep the same 1280 x 720 no-scroll verification standard and avoid changes to unrelated modules.
