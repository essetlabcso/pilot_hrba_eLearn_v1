# Module 2 G1-G4 Implementation Plan

Date: 2026-06-17  
Branch: `system/hrba-clean-foundation`  
Control input: `docs/module-review/module-2/module-2-g1-g4-qa-evaluation.md`  
Status: Planning only. Do not implement fixes from this plan until approved.

## Executive Summary

Module 2 needs targeted repair and evidence, not broad redesign. The current implementation is conceptually strong: it covers rights as everyday claims, duty-bearers, CSO role boundaries, safe standards use, intersectionality, participation as influence, accountability, power/exclusion, portfolio transfer, and applied knowledge checks.

The safest next implementation cycle is evidence-led:

1. Prove or resolve the protected `M2-S01` to `M2-S01A` start-path concern.
2. Run a visual/readability pass before touching content.
3. Run keyboard/focus evidence across interaction families.
4. Apply small course-layer refinements only where evidence or human review requires them.
5. Verify `M2-S21` portfolio privacy/storage.
6. Run full regression QA.
7. Prepare a human review package before staging or committing.

## Issue Classification Matrix

| Issue ID | Screen ID(s) | Issue title | Priority | G relevance | Implementation layer | Likely files | Classification | Risk if not fixed | Acceptance criteria | QA evidence required |
|---|---|---|---:|---|---|---|---|---|---|---|
| M2-PROG-01 | `M2-S01`, `M2-S01A` | Start path may bypass intro screen | P1 | G2, G4 | Protected route/progress/completion | `src/components/course/Module2Renderer.tsx`; `src/data/module2/module_2_screen_sequence.json`; `src/data/module2/module2Content.ts`; possibly `src/components/player/CoursePlayerShell.tsx`; possibly `src/App.tsx` | Protected / evidence-first | Learners may skip accepted intro framing; progress state may diverge | Platform/direct cover start path is proven; `M2-S01A` is either reached or bypass is explicitly approved | Platform start, direct cover, cover CTA, player Next, refresh/resume route smoke |
| M2-PROG-02 | `M2-S23` | Completion and Module 3 transition need proof | P1 | G2, G4 | Protected route/progress/completion | `src/components/course/Module2AccountabilityPowerScreens.tsx`; `CoursePlayerShell.tsx`; `App.tsx`; state files if separately approved | Evidence-first / protected | Module completion, portfolio retention, or Module 3 unlock may regress | Start Module 3 marks Module 2 complete and preserves portfolio/progress | Completion route smoke, state inspection, refresh/resume |
| M2-VIS-01 | Module-wide | Visible text-background readability not fully proven | P1 if visible defect; P2 otherwise | G3, G4 | Visual/readability / asset / alt text | `src/components/course/Module2*.tsx`; Module 2 CSS/classes already in use; docs/screenshots | Evidence-first; fix-now only if defect found | Learners may be unable to read critical text or states | All visible text readable on desktop/mobile/high contrast/text size | Desktop/mobile screenshots, contrast spot checks, high contrast/text-size evidence |
| M2-VIS-02 | `M2-S04`, `M2-S18` | Hotspot labels and image-backed content readability | P1 | G3, G4 | Visual/readability / asset / alt text | `Module2RightsDimensionsHotspot.tsx`; `Module2AccountabilityPowerScreens.tsx` | Fix-now if evidence fails | Learners miss learning-critical image labels or cannot use hotspots | Labels readable; touch targets usable; text alternative sufficient | Hotspot screenshots, keyboard/touch tests, DOM alt audit |
| M2-VIS-03 | `M2-S06`, `M2-S09`, `M2-S15`, `M2-S16`, `M2-S17`, `M2-S19`, `M2-S22` | Selected/correct/incorrect/disabled states need non-color proof | P1 if color-only; P2 evidence-required | G3, G4 | Visual/readability / accessibility/mobile | Relevant `Module2*.tsx` files | Evidence-first | Learners may not perceive feedback or required state | States include readable text, border/icon/label cues, and focus indication | Feedback-state screenshots, keyboard checks, high contrast |
| M2-A11Y-01 | Module-wide interactions | Keyboard/focus evidence incomplete | P1 | G4 | Accessibility/mobile | `Module2*.tsx`; shared/player files only if approved | Evidence-first | Keyboard users may be blocked; hidden traps may remain | Every interaction family is operable by keyboard with visible focus and no trap | Manual or reliable browser keyboard logs |
| M2-A11Y-02 | Tablist screens | ARIA tablist semantics may not match keyboard behavior | P2 | G4 | Accessibility/mobile | `Module2WorkingPrinciples.tsx`; `Module2RightsHoldersMap.tsx`; `Module2IntersectionalityCase.tsx`; `Module2CompactRevealScreen.tsx`; `Module2ParticipationPractice.tsx` | Human-input-needed / evidence-first | Screen readers may announce tab behavior without arrow-key support | Either full tab keyboard behavior is provided or semantics are simplified | Keyboard pattern test and screen-reader/DOM review |
| M2-A11Y-03 | `M2-S21` | Textarea accessible names and focus behavior need proof | P1 | G4 | Accessibility/mobile / privacy/storage | `Module2AccountabilityPowerScreens.tsx` | Evidence-first | Learners using assistive tech may not understand portfolio fields | Each input has an accessible name and clear safe-input context | DOM accessibility audit, keyboard focus screenshots |
| M2-PRIV-01 | `M2-S21` | Portfolio privacy/storage behavior needs evidence | P1 | G1, G4 | Privacy/storage | `Module2AccountabilityPowerScreens.tsx`; state/storage files only if approved | Evidence-first | Sensitive text may be entered or stored without clear learner understanding | Safe-input warning visible; save/review/reset/persistence documented | Safe test data save, refresh/resume, localStorage/session observations |
| M2-G1-01 | `M2-S10`, `M2-S11`, `M2-S22` | Duty-bearer and CSO role trace | P2 | G1, G2 | HRBA content / safeguarding | `Module2ActorEcosystemRoles.tsx`; `Module2CSORoleEcosystem.tsx`; `Module2AccountabilityPowerScreens.tsx` | Evidence-first | Learners may still overplace responsibility on CSOs | Trace shows public duty-bearers, respect/protect/fulfil, and bounded CSO role | Content trace and HRBA review |
| M2-G1-02 | `M2-S12`, `M2-S16`, `M2-S17`, `M2-S19`, `M2-S21`, `M2-S22` | Safe standards-use habit trace | P2 | G1, G2 | HRBA content / safeguarding | `Module2SafeStandardsUse.tsx`; `Module2AccountabilityPowerScreens.tsx` | Evidence-first; small fix if gap found | Safe standards may feel isolated or legalistic | Verify evidence, assess risk, protect people, constructive route, document follow-up appear in practice/feedback/portfolio | Content trace and safeguarding review |
| M2-G1-03 | `M2-S09`, `M2-S15`, `M2-S18`, `M2-S19`, `M2-S21` | Intersectionality recurrence | P2 | G1, G2 | HRBA content / safeguarding | `Module2IntersectionalityCase.tsx`; `Module2ParticipationPractice.tsx`; `Module2AccountabilityPowerScreens.tsx` | Human-input-needed / evidence-first | Learners may treat intersectionality as one isolated case | Later practice asks about overlapping barriers where relevant | Content trace, human review |
| M2-G2-01 | `M2-S06`, `M2-S15`, `M2-S16`, `M2-S17`, `M2-S18`, `M2-S19`, `M2-S21` | Worked-example coverage before complex practice | P2 | G2 | Instructional design / block configuration | `Module2RightsCharacteristicsMatch.tsx`; `Module2ParticipationPractice.tsx`; `Module2AccountabilityPowerScreens.tsx` | Evidence-first | Learners may be asked to reason before a model | Complex practice has model -> task -> feedback -> transfer | Content trace and usability review |
| M2-G2-02 | `M2-S13` to `M2-S14` | SDG/LNOB to participation bridge | P3 | G1, G2 | Instructional design / block configuration | `Module2SdgLnobHrba.tsx`; `Module2ParticipationAttendance.tsx` | Human-input-needed | Transition may feel conceptually abrupt | Learner sees LNOB becoming participation choices | Human content review |
| M2-G2-03 | Reveal screens | Repeated "open all" gating and fatigue | P2 | G2, G4 | Instructional design / block configuration | `Module2*.tsx`; `CoursePlayerShell.tsx` if protected behavior involved | Human-input-needed / defer to learner testing | Learners may click compliantly instead of thinking | Strict gating remains only where learning evidence matters | Learner review, completion behavior QA |
| M2-G2-04 | `M2-S20` | Synthesis may be too high-friction | P3 | G2 | Instructional design / block configuration | `Module2AccountabilityPowerScreens.tsx` | Defer to learner testing | Consolidation may feel like another quiz | Synthesis is efficient and review-oriented | Usability review |
| M2-G2-05 | `M2-S21` | Portfolio output specificity | P2 | G1, G2, G4 | Instructional design / privacy/storage | `Module2AccountabilityPowerScreens.tsx` | Evidence-first / human-input-needed | Output may remain broad rather than actionable | Learner saves one safe, specific habit/action | Portfolio sample review, privacy/storage evidence |
| M2-ASSET-01 | `M2-S04`, `M2-S08`, `M2-S13`, `M2-S18` | Visual/asset ethics and text alternatives | P2 | G1, G3, G4 | Visual/readability / asset / alt text | Current Module 2 visual component files; no assets without approval | Evidence-first | Visuals may misrepresent agency, power, or local roles | Visuals support agency, responsibility, support role, safe participation | Human representation review, alt audit |
| M2-MEDIA-01 | `M2-S01A` | Final video/captions/transcript deferred | P3 | G3, G4 | Media/future video | `Module2AccountabilityPowerScreens.tsx`; assets/media only in future approval | Deferred | Intro remains interim rather than final media | No placeholder language; final media later has captions/transcript | Future media QA |
| M2-RES-01 | Resource pack | Resource pack input needs only | P3 | G1, G2, G3, G4 | Resource-pack planning | `docs/module-review/module-2/` only unless approved | Resource-pack planning | Learners may lack post-course tools | Inventory and input needs defined; no resource UI created | Planning doc review |
| M2-MAINT-01 | Dormant Module 2 files | Dormant/legacy Module 2 components may confuse maintenance | P3 | G4 | Dormant/maintenance cleanup | `Module2OpeningScenarioRightsIssue.tsx`; `Module2ActivityReportMissed.tsx`; `Module2RightsResponsibilitiesMap.tsx` | Deferred | Future edits may target inactive components | Active/dormant inventory stays clear | Maintenance inventory only |

## Implementation Lanes

### Lane A: Protected Route/Progress Decision and Evidence

Scope:

- `M2-S01` to `M2-S01A` start path.
- `M2-S23` completion and Module 3 transition.
- Route/progress testing before course-layer changes.

Steps:

1. Run route smoke for platform launch, `/module-2`, `/module-2/cover`, `/module-2/screen-2-1`, cover CTA, `/module-2/intro-video`, `/module-2/screen-2-1a`, and refresh/resume.
2. Decide whether bypassing `M2-S01A` is a confirmed defect or an intentional route choice.
3. If a protected fix is required, stop and request explicit approval before touching route/progress files.
4. Test `M2-S23` Start Module 3 and Review objectives.

Boundaries:

- Do not edit `CoursePlayerShell.tsx`, `App.tsx`, state/storage, route logic, or progress/completion logic unless separately approved.

### Lane B: Visual Readability and Content-Safe Surface Repair

Scope:

- Text-background readability.
- Hotspots and image-over-text labels.
- Feedback/selected/disabled states.
- Mobile, high contrast, and text-size screenshots.
- Existing content-safe/readability patterns only.

Steps:

1. Capture desktop and 390px mobile screenshots for all active Module 2 screens or all changed screens plus representative family evidence.
2. Review text on tinted/dark/image/gradient surfaces.
3. Review badges, chips, selected/correct/incorrect/disabled states, feedback panels, helper text, safety notes.
4. Fix only clear learner-facing readability failures in approved Module 2 course-layer/design-system scope.
5. Stop if a fix requires global CSS/tokens or shared components without approval.

### Lane C: Accessibility and Keyboard/Focus Evidence

Scope:

- Cards, tabs, accordions/reveals, hotspots, radio-style buttons, textareas, knowledge check, Continue buttons.
- Tab/tabpanel keyboard decision.
- No shared player/accessibility-toolbar fix without approval.

Steps:

1. Run manual or reliable normal-browser keyboard checks.
2. Record first focusable element, Tab, Shift+Tab, Enter/Space activation, visible focus, CTA reachability, and traps.
3. Test `M2-S04` and `M2-S18` hotspot visual controls and keyboard/text alternatives.
4. Test `M2-S21` textareas and habit radio-style buttons.
5. Test `M2-S22` radio choices, Check answer, Next question, View completion summary, Continue.
6. Decide whether tablist arrow-key support is required. If yes, request approval for a contained accessibility pass; if no, consider simpler button/list semantics.

### Lane D: Course-Layer Content and Learning Refinements

Scope:

- Safe standards trace.
- Intersectionality recurrence.
- Optional `M2-S13` to `M2-S14` bridge.
- Optional `M2-S20` synthesis simplification.
- Optional `M2-S21` portfolio sharpening.
- No broad rewrite.

Steps:

1. Trace current safe standards and intersectionality language across feedback, practice, and portfolio.
2. Add only small microcopy where a trace gap is confirmed and human-approved.
3. Preserve existing strong content around duty-bearers, respect/protect/fulfil, bounded CSO role, safe standards, and participation as influence.
4. Do not change scoring, completion, routing, unlock, storage, assessment, LMS/LRS, or resource UI.

### Lane E: Portfolio Privacy/Storage Evidence

Scope:

- `M2-S21` safe-input guidance.
- Textarea accessible names.
- Save/review/reset/persistence behavior.
- LocalStorage/session observations.
- Analytics/xAPI/LMS/LRS unknowns documented as deferred if not verifiable.

Steps:

1. Use only fictional/generalized test input.
2. Confirm privacy warning remains visible before input.
3. Confirm textareas have accessible labels/names.
4. Save the portfolio entry, refresh/resume, and verify whether text persists.
5. Replay/reset and verify expected behavior.
6. Document storage location and unknown downstream reporting boundaries.

### Lane F: Resource-Pack Planning Only

Scope:

- Resource inventory and input needs.
- No downloads, links, PDFs, PPTs, assets, or resource UI.

Resources to plan:

- Rights-holder/duty-bearer mapping template.
- Participation quality checklist.
- Overlapping-barriers worksheet.
- Safe standards-use checklist.
- Accountability loop worksheet.
- Safe participation plan template.
- One-page guide on CSOs supporting accountability without replacing duty-bearers.
- Facilitator mini-slide deck for Module 2.

Steps:

1. Keep resources in planning docs only.
2. List purpose, related screen, format, owner/input, accessibility, low-bandwidth, privacy, readiness, and QA requirements.
3. Stop if implementation would require files, links, PDFs, PPTs, downloadable resources, assets, or UI.

### Lane G: Final QA and Human Review Package

Scope:

- Commands.
- Route/progress evidence.
- Screenshots.
- Keyboard/focus logs.
- Visual contrast/readability findings.
- Protected boundaries.
- Ready/not-ready recommendation.

Required evidence:

- `npm run build`
- `npx tsc -b --pretty false`
- `npm run lint`
- Route/progress/completion/unlock checks
- Desktop/mobile screenshots
- High contrast/text-size/reduce-motion checks or documented dependency
- DOM alt/text alternative audit
- Console/runtime logs
- Learner-input privacy/storage observations
- Changed-file list and protected-boundary confirmation

## Sequencing

Recommended safest order:

1. Resolve/prove `M2-S01` start path.
2. Run visual/readability pass.
3. Run keyboard/focus interaction-family evidence.
4. Apply small course-layer refinements only where approved or clearly needed.
5. Verify portfolio privacy/storage.
6. Run full regression QA.
7. Prepare human review package.
8. Commit only after human acceptance.

Do not start source implementation before Lane A evidence is complete or explicitly accepted as a known protected-route decision.

## File Boundaries

Likely files if implementation is later approved:

- `src/components/course/Module2Renderer.tsx`
- `src/components/course/Module2*.tsx`
- `src/data/module2/module_2_screen_sequence.json`
- `src/data/module2/module2Content.ts`
- `src/components/player/CoursePlayerShell.tsx` only if protected start-path fix is separately approved
- Module 2 docs/screenshots under `docs/module-review/module-2/`

Do not touch unless separately approved:

- Global CSS.
- Tokens.
- Accessibility toolbar source.
- Storage/progress architecture.
- `App.tsx` routing.
- Unrelated modules.
- Media/assets.
- PDFs/PPTs/resources.
- LMS/LRS/xAPI/reporting.
- Assessment/certificate logic.

## Module 2 Story and Visual Asset Integration Overlay

This overlay integrates story and visual asset candidates into the existing phased plan. It does not create a new broad story rebuild lane. It does not approve asset migration, file imports, source edits, downloads, resources, PDFs, PPTs, or UI.

Available workspace inputs checked:

- `D:\Stories and visual assets\Story Asset Register.xlsx`
- `D:\Stories and visual assets\Visual Asset Register HRBA E-learning Course.docx`
- `D:\Stories and visual assets\# Story-to-Screen Mapping Matrix.docx`

The named zips `stories catalogue-001.zip` and `Story Visuals (2).zip` were not found in the recursive file check. Candidate use below is based on the provided story IDs, visual IDs, filenames, and learning-purpose mapping. Old catalogue screen numbers must be ignored unless they are remapped to the current active Module 2 screens, `M2-S01` through `M2-S23`.

### Selected Story Inputs

| Story input | Priority | Current active-screen mapping | Implementation use | Lane |
|---|---|---|---|---|
| `HRBA-STORY-10 - A Seat at the Table: Women's Participation in Local Planning` | Primary | `M2-S14`, `M2-S15`, `M2-S18`, `M2-S19`, `M2-S21` | Compact microcopy or worked-example support for participation as influence, hidden barriers, inclusive meeting redesign, women's collective voice/agency, power/exclusion, and participation/accountability improvement planning. | Lane B, Lane D, Lane F |
| `HRBA-STORY-04 - Education Cannot Wait: Safe Participation for Displaced Girls` | Supporting, use carefully | `M2-S08`, `M2-S09`, `M2-S12`, `M2-S14`, `M2-S15`, `M2-S21` | Compact generalized example for intersectionality, age/gender/displacement/safety/education barriers, anonymous voice, safe participation pathways, safe standards use, and safeguarding/do-no-harm. | Lane B, Lane D, Lane F |
| `Water is Life` | Secondary reference only | Optional continuity reference for rights-holders, duty-bearers, participation, accountability | Use only as light continuity reference. Do not make it the main Module 2 story. | Lane D only if needed |
| `The Locked Health Post` | Secondary reference only | Optional support for `M2-S10`, `M2-S16`, `M2-S17`, `M2-S22` | Use only for duty-bearer/accountability examples if needed. | Lane D only if needed |
| Cross-course reusable assets | Candidate support | Module-wide | Candidate supports for icons, feedback loop, safeguarding alert, portfolio output card. | Lane B, Lane F |

### Candidate Visual Asset Mapping

All candidate assets require human approval before migration. No implementation prompt should import, rename, optimize, compress, convert, or replace these files unless that task is explicitly approved.

| Asset ID | Proposed filename | Related story | Current active Module 2 screen | Learning purpose | Asset type | Current status | Alt-text guidance | Representation/safeguarding note | Implementation lane |
|---|---|---|---|---|---|---|---|---|---|
| `VA-012` | `hrba-m2-s03-seat-table-anchor-scene.png` | A Seat at the Table | `M2-S14` / `M2-S15` | Participation as influence, not attendance | PNG scene | Candidate only / needs human approval | Fictional planning discussion where different groups can speak and influence decisions. | Rights-holders are active; CSO facilitates; no identifiable people/place. | Lane B / Lane D |
| `VA-013` | `hrba-m2-s03-seat-table-hidden-barriers.svg` | A Seat at the Table | `M2-S18` | Hidden participation barriers | SVG diagram | Candidate only / needs human approval | Timing, childcare, information, language, venue, safety, agenda control. | Show process barriers, not blame; avoid sensitive detail. | Lane B / Lane D |
| `VA-014` | `hrba-m2-s04-token-meaningful-participation.svg` | A Seat at the Table | `M2-S14`, `M2-S15` | Token vs meaningful participation | SVG comparison | Candidate only / needs human approval | Contrast presence with influence, response, and changed practice. | Avoid passive crowd imagery. | Lane B / Lane D |
| `VA-015` | `hrba-m2-s05-inclusive-meeting-builder.png` | A Seat at the Table | `M2-S15`, `M2-S19`, `M2-S21` | Inclusive meeting redesign | PNG planning visual | Candidate only / needs human approval | Accessible venue, timing, language, childcare-aware option, safe feedback, response. | Generalized fictional scene only. | Lane B / Lane D / Lane F |
| `VA-016` | `hrba-story-10-womens-preconsultation-scene.png` | A Seat at the Table | `M2-S15`, `M2-S18`, `M2-S21` | Women's collective voice and agency | PNG scene | Candidate only / needs human approval | Fictional pre-consultation where women identify priorities and plan safe voice. | Agency-centered; no sensitive personal stories. | Lane B / Lane D |
| `VA-017` | `hrba-m2-s07-education-anchor-scene.png` | Education Cannot Wait | `M2-S08`, `M2-S09` | Intersectional education participation barriers | PNG scene | Candidate only / needs human approval | Generalized barriers across age, gender, displacement, safety, education. | High safeguarding caution; no identifiable children or sites. | Lane B / Lane D |
| `VA-018` | `hrba-m2-s07-safe-participation-pathways.svg` | Education Cannot Wait | `M2-S09`, `M2-S12`, `M2-S14` | Safe participation pathways | SVG pathway | Candidate only / needs human approval | Anonymous, consent-aware pathways for voice, referral, information, response. | Avoid trauma detail; emphasize safety and choice. | Lane B / Lane D / Lane F |
| `VA-019` | `hrba-m2-s08-anonymous-priority-cards.svg` | Education Cannot Wait | `M2-S12`, `M2-S21` | Anonymous voice and safe input | SVG cards | Candidate only / needs human approval | Anonymous priority cards without identities. | Must not suggest collecting sensitive identifiable data. | Lane D / Lane F |
| `VA-020` | `hrba-m2-s09-participation-risk-map.svg` | Education Cannot Wait | `M2-S09`, `M2-S18`, `M2-S21` | Participation risk mapping | SVG risk map | Candidate only / needs human approval | Risk points and mitigations in a fictional participation process. | No child, survivor, official, location, or incident detail. | Lane B / Lane D / Lane F |
| `VA-021` | `hrba-story-04-education-video-poster.png` | Education Cannot Wait | `M2-S09` / future media only | Optional safe participation poster | PNG poster | Candidate only / needs human approval | Generalized safe education participation lens. | No final media use without caption/transcript approval. | Lane B / deferred media |
| `VA-065` | `hrba-global-rightsholder-dutybearer-icons.svg` | Cross-course | `M2-S08`, `M2-S10`, `M2-S22` | Role clarity | SVG icon set | Candidate only / needs human approval | Use visible text labels; icons can be decorative. | Duty-bearers responsible, not caricatured; CSO not hero. | Lane B / Lane F |
| `VA-066` | `hrba-global-panel-principles-icons.svg` | Cross-course | `M2-S07`, `M2-S12`, `M2-S20` | HRBA principle recall | SVG icon set | Candidate only / needs human approval | Text labels carry meaning. | Avoid unexplained abstractions. | Lane B / Lane F |
| `VA-068` | `hrba-global-safeguarding-alert-card.svg` | Cross-course | `M2-S12`, `M2-S21` | Safe standards and safe-input warning | SVG/card | Candidate only / needs human approval | Warning text must be readable and not color-only. | Calm and practical; not alarmist or trauma-triggering. | Lane B / Lane D / Lane F |
| `VA-070` | `hrba-global-portfolio-output-card.svg` | Cross-course | `M2-S21`, `M2-S23` | Portfolio output/reminder | SVG/card | Candidate only / needs human approval | Generic portfolio card with safe generalized fields. | Do not imply downloadable resource exists. | Lane B / Lane F |
| `VA-071` | `hrba-global-feedback-loop-diagram.svg` | Cross-course | `M2-S16`, `M2-S17`, `M2-S22` | Accountability loop | SVG diagram | Candidate only / needs human approval | Receive, review, respond, adapt, follow up safely. | Do not show complainants or sensitive incidents. | Lane B / Lane D / Lane F |
| `VA-073` | `hrba-global-accessibility-check-icons.svg` | Cross-course | `M2-S04`, `M2-S08`, `M2-S15`, `M2-S21` | Accessibility/inclusion cues | SVG icon set | Candidate only / needs human approval | Visible labels or decorative icons beside text. | Avoid tokenistic representation. | Lane B / Lane F |

### Lane Integration

Lane B - Visual Readability and Content-Safe Surface Repair:

- Use selected visual assets only as candidate alternatives if current visuals fail readability, contrast, representation, or instructional clarity checks.
- Do not replace or import assets automatically.
- Record asset migration as a later human-approved step.
- Candidate asset use must include alt-text guidance, representation review, safeguarding review, and mobile/readability evidence.

Lane D - Course-Layer Content and Learning Refinements:

- Use story snippets only as compact microcopy or worked-example support.
- Do not add long story pages.
- Suggested uses:
  - `M2-S14`: A Seat at the Table as participation-as-influence example.
  - `M2-S15`: token vs meaningful participation worked example.
  - `M2-S18`: hidden barriers from meeting time, information access, childcare, language, venue, safety, and agenda control.
  - `M2-S21`: participation/accountability improvement plan model.
  - `M2-S09`: Education Cannot Wait as intersectionality and safe voice example.

Lane F - Resource-Pack Planning Only:

- Use story assets to plan future Module 2 resources.
- Do not create PDFs, PPTs, downloads, links, resources, or UI.
- Add resource-pack items:
  - Participation quality checklist.
  - Hidden barriers worksheet.
  - Token vs meaningful participation handout.
  - Safe participation plan.
  - Anonymous priority-card template.
  - Participation risk map.
  - Accountability loop worksheet.

## Acceptance Criteria

Final Module 2 acceptance requires:

- `M2-S01` start path is proven or fixed with explicit approval.
- `M2-S01A` intro is not bypassed unless deliberately approved.
- All visible text surfaces are readable on desktop and mobile.
- Hotspot labels and feedback states are readable and not color-only.
- Keyboard-only use is proven for every interaction family.
- Focus is visible and no traps occur.
- Tab/tabpanel semantics are consistent with keyboard behavior.
- `M2-S21` input labels and privacy/storage behavior are documented.
- `M2-S22` feedback and knowledge-check flow are accessible.
- Module 2 completion and Module 3 transition are proven.
- Build, TypeScript, and lint pass.
- No protected or unrelated files are changed without approval.
- Resource-pack planning remains separate from code implementation.
- Story inputs strengthen existing screens without broad redesign.
- Old story-screen numbers are remapped to current active screen IDs.
- No new asset is migrated without human approval.
- No story introduces names, precise locations, real organizations, officials, children, survivors, complainants, disputes, or sensitive incidents.
- Visuals show rights-holders as actors and decision-makers, duty-bearers as responsible actors without caricature, and CSOs as facilitators/support actors rather than heroes.
- Participation visuals show influence and response, not attendance only.
- Safe participation visuals avoid exposure, trauma, or identifiable sensitive details.
- Every candidate visual has alt-text guidance and representation/safeguarding notes.

## Stop Conditions

Stop future implementation if:

- A fix requires protected route/progress/storage/shell/accessibility-toolbar changes without approval.
- Route/progress/completion or Module 3 transition breaks.
- Keyboard/focus defects are found in shared components.
- Contrast/readability requires global CSS/tokens instead of contained Module 2 fixes.
- Resource-pack work requires creating downloads, links, PDFs, PPTs, or assets.
- Build, TypeScript, or lint fails with new errors.
- The task expands into broad redesign or unrelated module changes.
- Asset use requires importing, renaming, optimizing, compressing, or converting files.
- A story change would require a broad rewrite of Module 2.
- A story or visual introduces safeguarding risk or identifiable sensitive details.
- A visual replacement requires global CSS/tokens/shared component changes.
- Resource-pack work moves from planning into implementation.

## Human Review Gate

Before implementation starts, human review should confirm:

- Whether `M2-S01A` must always be reached from Module 2 start.
- Whether low-stakes reveal screens may reduce all-open gating.
- Whether strict ARIA tab arrow-key behavior is required.
- Whether optional content microcopy is approved for `M2-S13`, `M2-S20`, and `M2-S21`.
- Whether any protected route/progress fix is approved.

Implementation should remain paused until those decisions are accepted or intentionally deferred.
