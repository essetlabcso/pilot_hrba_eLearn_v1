# Batch 2A Slice 1 Human Review Evidence Index

## 1. Summary

- Repo folder: `D:\eLearn_CDP_Lg`
- Branch: `system/hrba-clean-foundation`
- Current commit: `d3624b30b93c8e8a466689437f211bf3cfc774ad`
- Task type: screenshot/evidence only
- Screenshot method: desktop viewport capture at 1280x720 using local Chrome headless against `http://127.0.0.1:5173` with localhost QA unlock `completed=module_01_hrba_foundations`.
- Confirmation: no production source code was modified during this evidence package task.
- Confirmation: nothing was staged, committed, or pushed.
- Build/test status:
  - `npm run build`: passed; existing large chunk/asset and plugin timing warnings remain.
  - `npx tsc -b --pretty false`: passed with no output.
  - `npm run lint`: passed with warnings only; existing warnings remain in `src/components/course/Module1Renderer.tsx` and `src/components/player/CoursePlayerShell.tsx`.

## 2. Screenshot index

| Screen | Screenshot filename | Worked example visible? | Layout intact? | CTA visible? | Density concern? | Notes |
| ------ | ------------------- | ----------------------- | -------------- | ------------ | ---------------- | ----- |
| M2-S06 / Practice: Match Rights Characteristics | `screenshots/batch2a-m2-s06-rights-characteristics-worked-example.png` | Yes, but compressed | Mostly | Yes | Yes | Worked example appears in the title card but the long single-line note is visually tight and appears clipped/truncated near the progress card. Human review should decide whether this needs a shorter line break or tighter wording later. |
| M2-S15 / Practice: Is This Meaningful Participation? | `screenshots/batch2a-m2-s15-participation-before-you-try.png` | Yes | Yes | Yes | Low | Before-you-try panel is visible near the top and clarifies weak participation versus stronger participation. Some right-side feedback text is partially offscreen due the existing dense layout. |
| M2-S16 / Accountability Is More Than a Complaint Box | `screenshots/batch2a-m2-s16-accountability-loop-model.png` | Yes | Yes | Yes | Low | Worked example loop is visible and readable above the loop stages. CTA remains visible. |
| M2-S17 / Practice: Repair the Feedback Loop | `screenshots/batch2a-m2-s17-feedback-loop-repair-example.png` | Yes | Yes | Yes | Low | Before-you-try example is visible before the learner task and does not appear to push the CTA out of view. |
| M2-S18 / Power and Exclusion | `screenshots/batch2a-m2-s18-power-exclusion-demo.png` | Yes | Mostly | Yes | Moderate | Barrier-to-effect demo is visible in the left meeting snapshot column, but the text is small and dense. Existing hotspot/side-panel area remains visually busy. |
| M2-S19 / Practice: Trace the Exclusion Pathway | `screenshots/batch2a-m2-s19-exclusion-pathway-demo.png` | Yes | Yes | Yes | Low | Pathway demo is visible before the pathway activity and the CTA remains visible. |
| M2-S21 / Everyday Rights Lens Portfolio | `screenshots/batch2a-m2-s21-portfolio-safe-sample.png` | Yes | Yes | Yes | Low | Safe sample is visible separately from the privacy warning and the save/continue CTA remains visible. |

## 3. Human-review checklist

| Screen | Checklist result |
| ------ | ---------------- |
| M2-S06 | Worked example is visible without scrolling, but may be too compressed. It clarifies the task and respects safety/non-identification rules. CTA is visible. Main concern: possible clipping/truncation and high density in the title card. |
| M2-S15 | Worked example is visible without scrolling, clarifies the learner task, and stays short enough. Safety rules are respected. CTA is visible. Existing screen density remains manageable. |
| M2-S16 | Worked example loop is visible without scrolling and clarifies the accountability model. It is short enough, safety-aware, and the CTA remains visible. No obvious layout break. |
| M2-S17 | Before-you-try example is visible without scrolling and supports the repair task. It is concise and non-identifying. CTA remains visible. No obvious layout break. |
| M2-S18 | Demo is visible without scrolling and clarifies barrier-to-effect logic, but the left-column text is small/dense. Safety rules are respected. CTA remains visible. Existing visual crowding should be reviewed. |
| M2-S19 | Pathway demo is visible without scrolling and clarifies the task. It is short, safe, and CTA remains visible. No obvious layout break. |
| M2-S21 | Safe sample is visible without scrolling, separate from the privacy warning, and gives a practical model. It is short enough and non-identifying. CTA remains visible. |

## 4. Open concerns

- M2-S06: worked-example note is visible but appears compressed into a single line and may be clipped/truncated by the adjacent progress card.
- M2-S18: barrier-to-effect demo is visible but small and dense in the left column; existing hotspot layout remains visually busy.
- M2-S15: the added example is readable, but existing right-side feedback content appears partially clipped in the desktop viewport.
- The screenshots are desktop viewport captures, not full-page captures. They are suitable for first-viewport readability and CTA review but do not replace later mobile/tablet evidence.

## 5. Final evidence decision

Evidence package complete with concerns.
