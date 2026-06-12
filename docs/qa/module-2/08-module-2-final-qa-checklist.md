# Module 2 Final QA Checklist

## Purpose

Use this checklist after Module 2 improvements are implemented and before final deployment.

The goal is to confirm that Module 2 is visually polished, accessible, navigable, and ready for Vercel deployment.

## 1. Build and deployment readiness

- [ ] `npm run build` passes.
- [ ] No TypeScript errors.
- [ ] No unused variables.
- [ ] No broken imports.
- [ ] No missing image or SVG assets.
- [ ] No console errors during local preview.
- [ ] Vercel deployment succeeds after GitHub push.
- [ ] Production URL loads correctly.

## 2. Module 2 screen coverage

Confirm every Module 2 screen is reachable and functional.

- [ ] M2-S01 Module Cover
- [ ] M2-S01A Intro Video
- [ ] M2-S02
- [ ] M2-S03 Human Rights as Everyday Claims
- [ ] M2-S04 Rights Dimensions Hotspot
- [ ] M2-S05
- [ ] M2-S06 Match Rights Characteristics
- [ ] M2-S07
- [ ] M2-S08 Rights-Holders / Actor Map
- [ ] M2-S09 Intersectionality / Case Study
- [ ] M2-S10 Actor Ecosystem Roles
- [ ] M2-S11
- [ ] M2-S12
- [ ] M2-S13 SDG / LNOB Linkages
- [ ] M2-S14 Participation Spectrum
- [ ] M2-S15 Participation Practice
- [ ] M2-S16 Accountability Loop
- [ ] M2-S17 Feedback Loop Repair
- [ ] M2-S18 Power and Exclusion Hotspots
- [ ] M2-S19
- [ ] M2-S20
- [ ] M2-S21
- [ ] M2-S22 Knowledge Check
- [ ] M2-S23 Module Completion / Transition

Note: If the final implemented screen list differs, update this checklist to match the actual Module 2 route/screen list.

## 3. Contrast and readability

Check all screens for readable text and UI states.

- [ ] Disabled Continue buttons are readable and meet acceptable contrast.
- [ ] Enabled Continue buttons are visually prominent.
- [ ] Button labels are readable in normal, hover, focus, selected, and disabled states.
- [ ] Body text is readable on pale mint backgrounds.
- [ ] Body text is readable on white cards.
- [ ] Text on dark navy panels has sufficient contrast.
- [ ] Text over image backgrounds has solid or semi-transparent support.
- [ ] Helper text is not too pale.
- [ ] Kicker labels and subheadings are readable against gradients.
- [ ] Badges are readable.
- [ ] Progress tracker text is readable.
- [ ] Correct/incorrect feedback text is readable.
- [ ] Selected states are visible without relying only on color.

## 4. Typography and layout

- [ ] Titles are clear and not oversized.
- [ ] Subtitles are readable and support the main title.
- [ ] Body text has comfortable line height.
- [ ] Text blocks are not too dense.
- [ ] Cards have enough padding.
- [ ] Sections have consistent spacing.
- [ ] Main task instructions are easy to find.
- [ ] CTA placement is consistent.
- [ ] Screens do not feel overcrowded.
- [ ] Important content is not hidden below excessive scrolling.
- [ ] Layout works at common laptop widths.
- [ ] Layout works at tablet widths.
- [ ] Layout works at mobile widths if mobile support is expected.

## 5. Interaction and learning experience

- [ ] Learners understand what to do on each screen.
- [ ] Interactive screens provide immediate feedback.
- [ ] Feedback appears close to the learner’s action.
- [ ] Interaction patterns are varied enough across the module.
- [ ] “Open all to continue” is not overused unnecessarily.
- [ ] Strict gating remains only where needed for learning evidence.
- [ ] Portfolio/reflection tasks are clear.
- [ ] Practice screens feel purposeful.
- [ ] Knowledge checks are clear and fair.
- [ ] Learners cannot easily get stuck without guidance.
- [ ] Optional enrichment is clearly marked where applicable.

## 6. Navigation and progress tracking

- [ ] Next button works.
- [ ] Back button works.
- [ ] Continue button state is correct.
- [ ] Disabled Continue button explains or implies what is required.
- [ ] Screen progress tracker is accurate.
- [ ] Sidebar/current screen state is accurate.
- [ ] Completed screens are marked correctly.
- [ ] Learners can return to previous screens.
- [ ] Learners cannot accidentally skip required interactions.
- [ ] Module completion screen appears after the final required screen.
- [ ] “Start Module 3” CTA is prominent on the completion screen.

## 7. Accessibility

- [ ] All interactive elements are keyboard accessible.
- [ ] Focus states are visible and high contrast.
- [ ] Focus order is logical.
- [ ] Buttons have clear accessible names.
- [ ] Icons that convey meaning have accessible labels.
- [ ] Decorative icons/images are hidden from assistive technologies where appropriate.
- [ ] Learning-critical images have meaningful alt text or adjacent descriptions.
- [ ] Hotspot content can be accessed without a mouse.
- [ ] Matching activity has a non-drag alternative if drag-and-drop exists.
- [ ] Flip cards do not expose hidden content incorrectly to screen readers.
- [ ] Radio grids are grouped and labelled clearly.
- [ ] Correct/incorrect states do not rely only on color.
- [ ] Knowledge check results are announced clearly, using aria-live or similar behavior where appropriate.
- [ ] Touch targets are large enough.
- [ ] Heading order is logical.

## 8. Hotspot and diagram checks

### M2-S04 Rights Dimensions Hotspot

- [ ] Hotspot labels are readable.
- [ ] Hotspot markers do not overlap important visual content.
- [ ] Diagram scales well.
- [ ] Instructions are clear.
- [ ] Long description or alt text is available.

### M2-S08 Rights-Holders / Actor Map

- [ ] Actor labels are readable.
- [ ] Relationship arrows are understandable.
- [ ] Diagram does not become too dense on smaller screens.
- [ ] Text alternative is available.

### M2-S18 Power and Exclusion Hotspots

- [ ] Hotspot label text does not blend into the image.
- [ ] Label containers provide enough contrast.
- [ ] Hotspot content is accessible by keyboard.
- [ ] Hotspot content is readable on smaller screens.
- [ ] Scene description or long description is available.

## 9. Visual asset checks

- [ ] M2-S01A has a professional intro video poster or acceptable placeholder.
- [ ] M2-S04 has a clear rights-dimensions visual.
- [ ] M2-S08 has a clear actor map.
- [ ] M2-S13 has a helpful SDG/LNOB linkage visual if implemented.
- [ ] M2-S16 accountability loop is responsive.
- [ ] M2-S17 feedback repair visual supports the task if implemented.
- [ ] M2-S18 has a suitable hotspot background or improved overlay treatment.
- [ ] M2-S22 has clear knowledge check feedback visuals if implemented.
- [ ] M2-S23 completion screen feels conclusive and motivating.

## 10. Final acceptance criteria

Module 2 can be considered ready when:

- [ ] The build passes.
- [ ] All Module 2 screens are reachable.
- [ ] Major contrast issues are fixed.
- [ ] Key interactions are keyboard accessible.
- [ ] Hotspots and diagrams are readable.
- [ ] Progress and navigation are reliable.
- [ ] No major accessibility blockers remain.
- [ ] No missing or broken assets remain.
- [ ] The module feels visually polished and learning-focused.
- [ ] Vercel deployment succeeds.

## 11. Final reviewer notes

Use this section to record any remaining issues:

```text
Remaining issue:
Affected screen:
Priority:
Recommended follow-up:
```

```text
Remaining issue:
Affected screen:
Priority:
Recommended follow-up:
```

```text
Remaining issue:
Affected screen:
Priority:
Recommended follow-up:
```
