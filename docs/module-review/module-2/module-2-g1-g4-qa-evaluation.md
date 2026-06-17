# Module 2 G1-G4 QA Evaluation

Date: 2026-06-17  
Branch: `system/hrba-clean-foundation`  
Module reviewed: Module 2, `module_02_everyday_cso_work`  
Mode: Read-only QA/evaluation. No course source fixes were implemented. No files were staged, committed, or pushed.

## Executive Summary

Module 2 is currently a strong HRBA foundation module. The active implementation now covers rights as everyday claims, human rights characteristics, HRBA principles, rights-holders, duty-bearers, CSO role boundaries, safe standards use, SDG/LNOB linkage, meaningful participation, accountability loops, power/exclusion, portfolio transfer, and a knowledge check. It already reflects many improvements recommended by earlier Module 2 review material: duty-bearer language is clearer, "respect, protect, fulfil" appears in the duty-bearer sequence, CSO overreach is bounded, worked examples precede several complex practice screens, safe-standards language is repeated beyond one screen, participation is framed as influence rather than attendance, and portfolio prompts include safe-input warnings.

The module should not be treated as final yet. The biggest remaining risks are evidence and interaction quality rather than wholesale content failure: route/progress consistency around `M2-S01` to `M2-S01A`, keyboard/focus proof for the many tab/radio/hotspot/reveal patterns, final visual contrast/readability evidence, mobile/enlarged-text/high-contrast evidence, and learner-input storage/privacy evidence for the portfolio checkpoint.

Recommendation: run a focused Module 2 repair and evidence cycle before final learner testing. Do not broaden into a redesign. Prioritize protected route/progress confirmation, keyboard/focus/mobile evidence, then small course-layer content/visual refinements.

## Evidence Inputs Reviewed

- Current git status: branch `system/hrba-clean-foundation`; existing dirty state is Module 1 work and was not modified by this review.
- Focused review input: `C:\Users\Omen\Downloads\module-2-focused-g1-g4-review-issues-and-fixes.md`.
- Existing Module 2 QA package: `docs/qa/module-2/01-module-2-qa-summary.md` through `docs/qa/module-2/08-module-2-final-qa-checklist.md`.
- Active sequence: `src/data/module2/module_2_screen_sequence.json`.
- Content registry: `src/data/module2/module2Content.ts`.
- Active Module 2 renderer and components under `src/components/course/Module2*.tsx`.
- Route/progress surfaces: `src/App.tsx`, `src/components/player/CoursePlayerShell.tsx`, `src/state/learningState.ts`.
- Browser read-only pass across `M2-S01`, `M2-S01A`, and `M2-S02` through `M2-S23` using `http://127.0.0.1:5173/?moduleId=module_02_everyday_cso_work&screenId=<screen>&completed=module_01_hrba_foundations`.

Browser observations:

- All 24 active Module 2 screens loaded by direct query route.
- No browser console errors were captured during the direct-route pass.
- No learner-facing temporary wording was detected by visible-text scan for `placeholder`, `coming soon`, `TODO`, `transcript will be added`, `video will appear`, `interim`, or `text-first version`.
- Desktop and 390px mobile DOM checks did not show page-level horizontal overflow.
- The in-app browser automated Tab traversal did not move `document.activeElement` away from `body` on representative interactive screens. This is recorded as an automation/evidence limitation, not a proven app pass.
- Storage enumeration in the read-only browser scope was not available; privacy/storage findings rely on source review and visible portfolio text.

## Active Module 2 Screen Inventory

| Screen | Title | Active source | Completion rule / behavior | Primary interaction |
|---|---|---|---|---|
| `M2-S01` | Foundations of HRBA: Rights, Actors, Principles, and Power | `Module2Renderer.tsx`, `module2Content.ts` | Start module; sequence says move to `M2-S01A` | Cover/start CTA |
| `M2-S01A` | Before you begin | `Module2AccountabilityPowerScreens.tsx` | Continue to objectives | Intro poster/prompt |
| `M2-S02` | What you will be able to do | `Module2LearningObjectives.tsx` | All objective cards reviewed | Objective reveal cards |
| `M2-S03` | Human Rights as Everyday Claims and Responsibilities | `Module2EverydayClaimsResponsibilities.tsx` | All cards explored | Flip/reveal cards |
| `M2-S04` | What Rights Dimensions Can You See? | `Module2RightsDimensionsHotspot.tsx` | All hotspots opened | Image hotspot plus keyboard list |
| `M2-S05` | Four Characteristics of Human Rights in CSO Practice | `Module2FourCharacteristicsPractice.tsx` | All flashcards opened | Characteristic reveal cards |
| `M2-S06` | Practice: Match Rights Characteristics to Everyday CSO Situations | `Module2RightsCharacteristicsMatch.tsx` | All situations matched | Button-based matching |
| `M2-S07` | The Five HRBA Working Principles in Everyday CSO Work | `Module2WorkingPrinciples.tsx` | All principles opened | Tabbed principle cards |
| `M2-S08` | Rights-Holders: Moving Beyond "The Community" | `Module2RightsHoldersMap.tsx` | All groups opened | Actor map and tabs |
| `M2-S09` | Intersectionality: One Person, Multiple Barriers | `Module2IntersectionalityCase.tsx` | Case moments opened and strongest choice selected | Case tabs plus radio-style choice |
| `M2-S10` | Duty-Bearers, Supporting Actors, and CSO Roles | `Module2ActorEcosystemRoles.tsx`, `Module2CompactRevealScreen.tsx` | Roles opened and correct role check selected | Compact reveal plus radio-style choice |
| `M2-S11` | CSOs in the Rights-Based Ecosystem | `Module2CSORoleEcosystem.tsx`, `Module2CompactRevealScreen.tsx` | Roles reviewed and boundary choice selected | Compact reveal plus role check |
| `M2-S12` | Using Human Rights Standards Safely | `Module2SafeStandardsUse.tsx`, `Module2CompactRevealScreen.tsx` | Safe-use gates opened and safe wording selected | Compact reveal plus safe wording check |
| `M2-S13` | HRBA, SDGs, and Leave No One Behind | `Module2SdgLnobHrba.tsx`, `Module2CompactRevealScreen.tsx` | Linkages opened and integrated statement selected | Compact reveal plus infographic |
| `M2-S14` | Participation Is More Than Attendance | `Module2ParticipationAttendance.tsx`, `Module2CompactRevealScreen.tsx` | Levels explored and participation check selected | Compact reveal plus choice |
| `M2-S15` | Practice: Is This Meaningful Participation? | `Module2ParticipationPractice.tsx` | All examples rated | Participation rating practice |
| `M2-S16` | Accountability Is More Than a Complaint Box | `Module2AccountabilityPowerScreens.tsx` | All loop breaks repaired | Accountability loop repair |
| `M2-S17` | Practice: Repair the Feedback Loop | `Module2AccountabilityPowerScreens.tsx` | All cases diagnosed/repaired | Diagnose and repair workflow |
| `M2-S18` | Power and Exclusion: Who Can Participate, Speak, and Influence? | `Module2AccountabilityPowerScreens.tsx` | All pathway hotspots opened | CSS-image hotspot plus keyboard list |
| `M2-S19` | Practice: Trace the Exclusion Pathway | `Module2AccountabilityPowerScreens.tsx` | All adjustments matched | Pathway adjustment practice |
| `M2-S20` | Module 2 Synthesis: The Everyday Rights Lens | `Module2AccountabilityPowerScreens.tsx` | All lens questions reviewed | Seven-question reveal |
| `M2-S21` | Portfolio Checkpoint: My Everyday Rights Lens | `Module2AccountabilityPowerScreens.tsx` | Portfolio saved | Textareas, radio-style habit choice |
| `M2-S22` | Module 2 Knowledge Check | `Module2AccountabilityPowerScreens.tsx` | Quiz checked and summary viewed | MCQ/radio knowledge check |
| `M2-S23` | Module 2 complete | `Module2AccountabilityPowerScreens.tsx` | Start Module 3 saves completion | Completion and transition CTAs |

Note: older source components such as `Module2OpeningScenarioRightsIssue.tsx`, `Module2ActivityReportMissed.tsx`, and `Module2RightsResponsibilitiesMap.tsx` exist but are not part of the active `M2-S01` to `M2-S23` renderer path observed for this review.

## Screen-by-Screen Findings

| Screen | Current strengths | Issues / findings | Severity / priority | G relevance | Why it matters | Recommended fix | Layer | Disposition | Acceptance criteria | QA evidence required |
|---|---|---|---|---|---|---|---|---|---|---|
| `M2-S01` Cover | Strong module title, duration, cover image alt, clear start affordance. | Source/sequence inconsistency: sequence says start moves to `M2-S01A`, but cover CTA in `Module2Renderer.tsx` pushes `/module-2/screen-2-2` (`M2-S02`). Platform cover may route to intro separately, but direct cover behavior risks bypassing `M2-S01A`. | High / P1 | G2, G4 | Learners may skip the accepted Batch 6 intro screen and its practice lens; route/progress behavior becomes ambiguous. | Verify real start path from platform and direct cover. If confirmed, align cover CTA with `M2-S01A` through a separately approved protected route/progress fix. | Protected route/progress logic | Needs human input / protected fix approval | Starting Module 2 consistently reaches `M2-S01A` unless a deliberate product decision says otherwise. | Route smoke from platform card, `/module-2`, `/module-2/cover`, and cover CTA; progress state after start. |
| `M2-S01A` Intro | Learner-ready "Before you begin" wording; no visible placeholder/transcript language; poster has alt; Continue preserves interim intro design. | Final video, captions, transcript, and media architecture remain deferred. | Medium / P2 | G3, G4 | Current screen is acceptable interim design but not final media readiness. | Keep as-is for now; add final media package later with captions/transcript evidence. | Media/resource | Defer to media batch | No learner-facing placeholder wording; final media integration has captions/transcript/poster QA before release. | Desktop/mobile visual, media metadata, caption/transcript checks when media is added. |
| `M2-S02` Objectives | Objectives are practical and linked to later tasks; cards use buttons, `aria-expanded`, `aria-describedby`, and `aria-live`. | Requires all six cards before continuing; this may be interaction fatigue if objectives are orientation rather than assessment. | Medium / P2 | G2, G4 | Forced review can help attention but may feel like compliance clicking early in the module. | Keep if human review values explicit objective review; otherwise allow a lighter completion pattern. | Instructional design / course interaction | Human input | Learners understand objectives without unnecessary friction. | Usability review; keyboard/focus check for cards and disabled/enabled Continue. |
| `M2-S03` Everyday claims | Strong rights-as-practical-claims framing; includes information, access, voice, inclusion, responsibility, response; flip cards have focus-visible CSS and hidden back-face handling. | Needs visual contrast/readability evidence for card faces and screen-reader proof that hidden/revealed faces behave correctly. | Medium / P2 | G1, G2, G3, G4 | This is a conceptual anchor; inaccessible card behavior could hide core learning. | Evidence-first: test keyboard, screen reader/DOM exposure, mobile, high contrast, text size. Fix only if proven. | Accessibility/mobile / visual QA | Evidence required | Each card reachable, Enter/Space opens, visible focus present, hidden content not read prematurely, contrast readable. | Keyboard/focus video or log, DOM accessibility snapshot, desktop/mobile screenshots, contrast spot check. |
| `M2-S04` Rights dimensions hotspot | Strong fictional scene, meaningful image alt, sr-only text alternative, keyboard hotspot list, and practical rights dimensions. | High interaction and visual-risk screen: all hotspots required, visual labels over image need contrast proof, hotspot position/touch behavior needs mobile evidence. | High / P1 | G1, G2, G3, G4 | Hotspots carry learning-critical content; if labels or focus are weak, learners miss the rights-dimension diagnostic skill. | Run full hotspot QA; keep text alternative; adjust labels/surfaces only if evidence shows readability/focus issues. | Accessibility/mobile / visual-design | Fix now if evidence fails | All hotspots are keyboard and touch reachable, visible focus appears, labels remain readable, text alternative covers image meaning. | Desktop/mobile screenshots, focus traversal, Enter/Space activation, high contrast/text-size checks. |
| `M2-S05` Rights characteristics | Strong plain-language characteristics; cards include practice questions and progress. | All-card gating repeats earlier reveal pattern; visual state and focus evidence still needed. | Medium / P2 | G1, G2, G4 | Repetition may reduce attention before the more important matching task. | Consider lighter exploratory gating only if learner testing shows fatigue; otherwise preserve. | Instructional design / accessibility | Defer pending evidence | Learners can open cards by keyboard and understand when Continue is available. | Keyboard/focus and visual state evidence. |
| `M2-S06` Matching practice | Worked example is present; button-based choices avoid drag-only design; feedback explains reasoning; completion is practice-based. | Needs proof that radio-like/matching workflow is understandable to screen reader and keyboard users; no browser Tab pass due automation limitation. | High / P1 | G2, G4 | This is a required practice screen. If keyboard or feedback association fails, learners can be blocked. | Full manual or Playwright keyboard test in a normal browser; verify visible focus and feedback proximity. | Accessibility/mobile / technical QA | Evidence required / fix if failed | Situation rail, choices, feedback, and Continue are reachable and operable; feedback is announced or discoverable. | Keyboard log, screenshot after correct/incorrect feedback, mobile reflow, route completion test. |
| `M2-S07` Working principles | Strong practical principle framing; tablist and tabpanel semantics present. | Tablist buttons handle Enter/Space but not arrow-key navigation; this may be acceptable as buttons but incomplete for a strict ARIA tab pattern. | Medium / P2 | G2, G4 | Role semantics create expectations for keyboard behavior. | Either implement full tab keyboard behavior in a future approved accessibility pass or use button/list semantics if arrow-key tabs are not intended. | Accessibility/mobile | Fix now if strict tab pattern is required; otherwise defer | Chosen pattern has consistent semantics and keyboard support. | Keyboard pattern test; screen reader role/label review. |
| `M2-S08` Rights-holders map | Strong "beyond the community" message; includes agency/barrier groups; actor map image alt and caption mention duty-bearers and respect/protect/fulfil. | Dense visual map may be hard to inspect on small screens/enlarged text; tablist arrow-key concern repeats. | Medium / P2 | G1, G3, G4 | The screen teaches rights-holder segmentation; visual density can undermine understanding. | Evidence-first visual/accessibility check; add visible summary/long description if map detail is not readable. | Visual/design-system / accessibility | Evidence required | Map meaning is available without precise vision or pointer use. | Mobile screenshot, enlarged text, high contrast, keyboard, alt/long-description audit. |
| `M2-S09` Intersectionality | Strong overlapping-barrier case; asks for pathway review rather than one-label analysis; feedback discourages blaming individuals. | Intersectionality is strong here but should be reinforced later; tablist/radio keyboard evidence needed. | Medium / P2 | G1, G2, G4 | Learners may treat intersectionality as a single case instead of a repeated diagnostic lens. | Add or verify recurring "which overlapping barriers matter here?" cues in later feedback/portfolio during future content pass. | HRBA content / learning design | Fix now if doing content pass; otherwise defer | Later screens reuse overlapping-barrier logic. | Content trace across M2-S15, M2-S18, M2-S21; keyboard/focus evidence. |
| `M2-S10` Actor roles | Strong duty-bearer clarity; explicitly says state institutions are primary duty-bearers and must respect, protect, fulfil; bounds CSO role with local examples. | Needs evidence that the quick role check and reveal sequence remain readable and operable; tablist pattern concern repeats. | Low-Medium / P2 | G1, G2, G4 | This is the main fix point from the focused review, and current content is strong; risk is mostly technical evidence. | Preserve wording; test role check keyboard/focus/mobile. | Technical QA/evidence | Evidence only unless failed | Learner can distinguish rights-holders, duty-bearers, influencing actors, and CSO support. | Keyboard/focus and mobile evidence; human HRBA content sign-off. |
| `M2-S11` CSO ecosystem | Strong bounded-support role: facilitator, capacity-strengthener, connector, evidence holder, adaptive learner. | No major content issue found; evidence needed for reveal/radio pattern. | Low / P3 | G1, G2, G4 | Prevents CSO-as-hero or CSO-as-duty-bearer confusion. | Preserve; evidence pass. | Technical QA/evidence | Evidence only | Bounded support is clear and usable. | Keyboard/focus/mobile evidence. |
| `M2-S12` Safe standards | Strong safe-use gates: ask better questions, stay with evidence, protect people, respect CSO role; safe wording check avoids legal overclaim. | Needs reinforcement in later screens, though some later accountability and KC text already does this. | Low-Medium / P2 | G1, G2, G4 | Safe standards use must become a habit, not a one-screen warning. | Preserve current screen; trace safe-use language across feedback and portfolio, adding only small reminders if gaps remain. | HRBA content / safeguarding | Evidence / small fix if trace gap found | Safe-use habit appears in later feedback or portfolio prompts. | Content trace and human safeguarding review. |
| `M2-S13` SDG/LNOB/HRBA | Strong linkage and infographic alt; moves from slogan to practical questions. | Bridge to participation exists conceptually but could be more explicit in transition to `M2-S14`; infographic readability needs mobile/high-contrast evidence. | Medium / P2 | G1, G2, G3 | Learners need to see LNOB becoming participation design, not just terminology. | Consider one transition line during future content pass; otherwise preserve. | Learning design / visual QA | Defer unless human asks | Learner can explain how SDG/LNOB questions flow into participation choices. | Human review, mobile screenshot, alt/visual evidence. |
| `M2-S14` Participation | Strong participation-as-information/voice/influence/response framing; attendance-only answer is challenged. | Same compact reveal/radio evidence gaps. | Low-Medium / P2 | G1, G2, G4 | This screen correctly prevents "attendance equals participation" misunderstanding. | Preserve; evidence pass. | Technical QA/evidence | Evidence only | Learner can distinguish presence, informed, heard, influential. | Keyboard/focus and feedback evidence. |
| `M2-S15` Participation practice | Strong worked example; examples scaffold presence, voice, considered, influence; feedback explains stronger answer. | Needs proof selected/correct states are non-color-only and keyboard accessible. | Medium / P2 | G1, G2, G3, G4 | Practice quality depends on clear feedback and usable rating controls. | Evidence-first; strengthen state labels/icons if visual review fails. | Visual/design-system / accessibility | Fix if evidence fails | Learner can rate all examples, see feedback, and continue without mouse or color-only cues. | Feedback-state screenshots, keyboard log, mobile test. |
| `M2-S16` Accountability loop | Strong worked example and safe loop: understand, use safely, respond, adapt; feedback focuses on response/follow-up. | Role-radio button pattern needs keyboard/semantic proof; completion gating is appropriate but must be tested. | Medium / P2 | G1, G2, G4 | Accountability is a core HRBA competency. If controls are unclear, the learner may not internalize the loop. | Preserve content; run interaction evidence; consider full radio semantics only if current button-radio pattern fails. | Accessibility/mobile / technical QA | Evidence required | Loop stages and repairs are reachable, selected state is clear, Continue unlocks only after all repairs. | Keyboard/focus, screen reader semantics, route completion. |
| `M2-S17` Feedback repair | Strong applied repair cases; safe general response and adaptation are reinforced; role/img loop has accessible label. | Needs feedback-state visual and keyboard proof; selected/correct states must not rely only on color. | High / P1 | G1, G2, G3, G4 | This is one of the most important applied accountability screens. | Run full feedback-state evidence; strengthen non-color labels if needed. | Accessibility/mobile / visual QA | Fix if evidence fails | Each case can be diagnosed/repaired, feedback is readable and announced/discoverable, no keyboard trap. | Correct/incorrect screenshots, keyboard log, aria-live check. |
| `M2-S18` Power and exclusion | Strong power pathway; includes CSS-background image with `aria-label`, sr-only scene description, numbered hotspots, and separate keyboard list. | High visual/accessibility risk: hotspot label readability over image, keyboard list focus order, all-hotspot gating, and mobile layout need evidence. | High / P1 | G1, G2, G3, G4 | Power and exclusion must be perceivable without precise pointer use or strong vision. | Evidence-first; fix with content-safe labels/surfaces if labels or text alternative fail. | Visual/design-system / accessibility/mobile | Fix if evidence fails | Hotspots and keyboard list are reachable, labels readable, text alternative sufficient, no pointer-only dependency. | Desktop/mobile/high-contrast screenshots, keyboard/focus log, DOM text alternative audit. |
| `M2-S19` Trace exclusion pathway | Strong stepwise transfer from exclusion diagnosis to practical adjustment; feedback avoids blaming individuals. | Needs keyboard/focus and feedback evidence; may benefit from one explicit safe-standards reminder if future content pass occurs. | Medium / P2 | G1, G2, G4 | Reinforces transfer from concept to action. | Preserve; evidence pass; consider safe evidence/risk line only if human wants more repetition. | Learning design / technical QA | Evidence first | Learner can complete all adjustment matches and understand feedback. | Keyboard/focus, feedback screenshots, route completion. |
| `M2-S20` Synthesis | Strong seven-question everyday rights lens; includes power/responsibility, role, participation, accountability. | Another all-open reveal screen; fatigue risk and keyboard evidence gap. | Medium / P2 | G1, G2, G4 | Synthesis should feel like consolidation, not one more mandatory clicking task. | Consider reducing strict reveal gating if learner testing shows fatigue; preserve content. | Instructional design / accessibility | Defer pending learner testing | Learner reviews lens without unnecessary friction. | Usability observation and keyboard evidence. |
| `M2-S21` Portfolio | Strong safe sample; explicit privacy warning: generalized, non-sensitive, no names, exact locations, survivors, children, officials, disputes, or sensitive incidents. Wrapped labels exist for textareas; habit choices use radio-style buttons. | Portfolio writes learner text into app state/localStorage via global `practiceCheckState`; storage behavior and accessible names need evidence. Textareas lack explicit `id`/`for`/`aria-label`, though wrapping labels should provide labels. | High / P1 | G1, G2, G4 | Portfolio is the main learner-input/privacy point. It must be accessible and must not invite sensitive real details. | Run privacy/storage evidence; confirm accessible names with an accessibility tree/manual screen reader check; do not create resource-pack UI in this pass. | Privacy/storage / accessibility | Evidence required; fix if labels/storage fail | Safe guidance remains visible; textareas have accessible names; saved data behavior is understood and documented. | Screen reader/DOM labels, save/return storage test, privacy note screenshot. |
| `M2-S22` Knowledge check | Strong applied questions and feedback; safe wording question discourages unsupported legal claims; `fieldset`, `legend`, labels, and `aria-live` feedback are present. | Needs keyboard/focus and feedback announcement proof; answer-state styling needs non-color-only evidence. | Medium-High / P1 | G1, G2, G3, G4 | The knowledge check must be fair, accessible, and feedback-oriented. | Evidence-first; strengthen feedback/status announcement only if needed. | Assessment / accessibility | Evidence required | Radio choices are labelled, Check/Next flow works by keyboard, feedback is announced/discoverable, completion summary appears. | Keyboard log, feedback-state screenshots, aria-live check, route completion. |
| `M2-S23` Completion | Strong completion message, portfolio reminder, and Module 3 transition. | Completion/progress save must be route-smoked. Direct review button returns to objectives; Start Module 3 changes module and completedModules. | Medium / P2 | G2, G4 | Completion is a protected state transition. | Test only unless a defect is separately approved. | Protected route/progress logic | Evidence required | Starting Module 3 marks Module 2 complete and does not corrupt portfolio/progress. | Route/progress/completion/unlock smoke, localStorage/state inspection. |

## G1 Synthesis: HRBA Content, Safeguarding, Ethics, Representation

Strengths:

- Rights are framed as everyday claims and responsibilities, not abstract legal slogans.
- Duty-bearer clarity is now strong on `M2-S10`, including state/public responsibility and respect/protect/fulfil.
- CSO role is bounded across `M2-S10`, `M2-S11`, `M2-S12`, `M2-S16`, `M2-S17`, and `M2-S22`.
- Safe standards use is explicit: verify evidence, avoid unsupported legal conclusions, protect people, and use constructive engagement.
- Participation is consistently framed as information, voice, influence, and response rather than attendance.
- Intersectionality and overlapping barriers are handled in practical project-flow terms.
- Portfolio safe-input language is strong and specific.

G1 issues:

- `M2-S01` route inconsistency can bypass the intro framing that sets up safe, practical use of the module.
- Intersectionality could be traced more explicitly into later practice and portfolio prompts.
- Safe standards use is present beyond `M2-S12`, but a formal trace is still needed before final sign-off.
- Asset/visual representation ethics require final human review, especially for power, participation, and rights-holder agency.

## G2 Synthesis: Learning Design and Instructional Flow

Strengths:

- The module follows a coherent progression: concept -> actor responsibility -> safe standards -> participation -> accountability -> power/exclusion -> synthesis -> portfolio -> knowledge check.
- Several complex screens now include worked examples: `M2-S06`, `M2-S15`, `M2-S16`, and `M2-S18`.
- Practice screens generally give explanatory feedback rather than simple right/wrong responses.
- Portfolio transfer is safer and more specific than a broad reflection.

G2 issues:

- Repeated "open all to continue" appears across objectives, reveal cards, compact tabs, hotspots, synthesis, and interaction screens. Some gating is justified; some may create fatigue.
- The transition from `M2-S13` SDG/LNOB/HRBA into `M2-S14` participation is conceptually sound but could use one clearer bridge if human review wants more scaffolding.
- `M2-S20` synthesis may feel like one more required reveal sequence rather than a low-friction consolidation.

## G3 Synthesis: Visual Design, Readability, UI, Accessibility, Usability

Strengths:

- Recent content-safe surface patterns are visible on several later screens.
- Core images have meaningful alt text where image elements are used.
- `M2-S18` avoids pointer-only reliance by adding a keyboard list and sr-only scene description.
- No broad desktop/mobile horizontal overflow was found in the browser DOM pass.

G3 issues:

- Visual contrast/readability still needs screenshot-based human review across all active screens.
- Hotspots and visual cards remain the highest visual risk: `M2-S04`, `M2-S08`, `M2-S13`, and `M2-S18`.
- Selected/correct/incorrect states in radio-style buttons and feedback panels need non-color-only evidence.
- Mobile checks at 390px showed no page-level horizontal overflow, but many shell containers sit near viewport edges; screenshots should verify comfortable padding and no clipped text.

## G4 Synthesis: Technical Quality, QA Readiness, Accessibility/Mobile

Strengths:

- Active direct routes exist for every `M2-S01` to `M2-S23` screen in `src/App.tsx`.
- Player locking logic explicitly treats most Module 2 screens as requiring completion before Next.
- Source uses semantic `button` elements heavily and includes `aria-live`, `aria-expanded`, `aria-pressed`, `role=tab`, `role=tabpanel`, `role=radio`, `fieldset`, and `legend` in many places.
- Browser direct-route pass captured no console errors.

G4 issues:

- Automated Tab traversal in the in-app browser did not move focus from `body`; this prevents an automated keyboard pass in this environment.
- Strict ARIA tab patterns may be incomplete because tablist buttons generally handle Enter/Space but not arrow-key navigation.
- Portfolio input is stored in global learning state and persisted through localStorage; privacy/storage behavior needs explicit evidence.
- `M2-S01` route/progress inconsistency is protected technical logic and should not be changed without approval.
- Build, TypeScript, lint, route smoke, high contrast, text-size, reduce-motion, storage, and full mobile evidence were not run as part of this read-only report and remain required before implementation acceptance.

## Recurring Pattern Issues

| Pattern | Affected screens | Severity | Why it matters | Recommended response |
|---|---|---:|---|---|
| Repeated all-items-required gating | `M2-S02`, `M2-S03`, `M2-S04`, `M2-S05`, `M2-S07`, `M2-S08`, `M2-S10`-`M2-S14`, `M2-S18`, `M2-S20` | Medium | Can create compliance clicking and fatigue. | Keep for practice/assessment; consider lighter completion for low-stakes reveal screens after human/learner review. |
| Keyboard/focus evidence gap | All interactive screens, especially `M2-S04`, `M2-S06`, `M2-S17`, `M2-S18`, `M2-S21`, `M2-S22` | High | The module is interaction-heavy and cannot be accepted by screenshots alone. | Run manual or normal-browser keyboard QA; document first focus, Tab/Shift+Tab, Enter/Space, focus visibility, traps. |
| ARIA tab pattern ambiguity | `M2-S07`, `M2-S08`, `M2-S09`, compact reveal screens, `M2-S15`, `M2-S20` | Medium | `role=tab` implies arrow-key behavior in many expectations. | Add full tablist behavior in approved accessibility pass or use simpler button/list semantics. |
| Hotspot/image meaning dependency | `M2-S04`, `M2-S08`, `M2-S13`, `M2-S18` | High | Learning-critical visuals must work without precise pointer use or strong vision. | Verify alt/long descriptions, text alternatives, mobile/touch targets, focus states, contrast. |
| Feedback/non-color state risk | `M2-S06`, `M2-S09`, `M2-S10`-`M2-S17`, `M2-S19`, `M2-S22` | Medium-High | Correct/selected/error states may be missed if conveyed mainly by color. | Verify labels/icons/borders/text cues; strengthen only where evidence fails. |
| Privacy/storage evidence gap | `M2-S21`, `M2-S23` | High | Learner-entered portfolio text must stay safe and understandable. | Confirm accessible labels, safe-input guidance, save behavior, persistence, review/edit behavior, reset behavior. |
| Protected route/progress risk | `M2-S01`, `M2-S23`, player Next/back/replay | High | Route/progress bugs can bypass learning or corrupt completion. | Regression-test only; any fix needs separate protected-layer approval. |

## Prioritized Issue / Fix Backlog

| ID | Priority | Screen(s) | Issue | Layer | Recommended fix | Disposition |
|---|---:|---|---|---|---|---|
| M2-G4-01 | P1 | `M2-S01` | Cover CTA/sequence may skip `M2-S01A` | Protected route/progress logic | Verify actual platform/direct start behavior; if confirmed, align route with approved intro path under separate approval. | Needs human input |
| M2-G4-02 | P1 | Module-wide interactions | Keyboard/focus evidence incomplete due in-app browser Tab limitation | Accessibility/mobile / QA evidence | Run manual normal-browser keyboard pass or Playwright activeElement test outside limitation. | Evidence required |
| M2-G4-03 | P1 | `M2-S04`, `M2-S18` | Hotspot accessibility/readability proof needed | Accessibility/mobile / visual-design | Verify text alternatives, touch targets, focus, label contrast, no pointer-only dependency. | Fix if evidence fails |
| M2-G4-04 | P1 | `M2-S21` | Portfolio storage/privacy and accessible input labels need evidence | Privacy/storage / accessibility | Test save, persistence, reset/review behavior; confirm accessible names and safe warning visibility. | Evidence required |
| M2-G4-05 | P1 | `M2-S22` | Knowledge-check keyboard and feedback announcement proof needed | Assessment / accessibility | Verify radio labels, Check/Next flow, aria-live feedback, non-color states. | Evidence required |
| M2-G3-01 | P2 | Module-wide | Contrast/readability evidence still needed | Visual/design-system | Screenshot review desktop/mobile/high contrast/text size; fix only visible failures. | Evidence required |
| M2-G2-01 | P2 | Reveal screens | Repeated all-open gating may create fatigue | Instructional design | Human/learner review to decide which exploratory screens can allow partial completion. | Human input |
| M2-G1-01 | P2 | `M2-S09`, `M2-S15`, `M2-S18`, `M2-S21` | Intersectionality recurrence could be more explicit | HRBA content / learning design | Add tiny repeated overlapping-barriers cue only if approved. | Optional fix |
| M2-G1-02 | P2 | `M2-S12` onward | Safe standards use needs formal trace | HRBA content / safeguarding | Trace safe-use lines across later feedback/portfolio/KC; add microcopy only where absent. | Evidence first |
| M2-G4-06 | P2 | Tablist screens | ARIA tablist arrow-key support uncertain | Accessibility/mobile | Implement full tab keyboard behavior or change semantics in an approved accessibility pass. | Defer / fix if failed |
| M2-G3-02 | P2 | `M2-S08`, `M2-S13` | Visual maps/infographics may be dense on mobile/enlarged text | Visual/design-system | Verify readability; add adjacent summaries or revise surface density if needed. | Evidence first |
| M2-G4-07 | P2 | `M2-S23` | Completion/progress/unlock evidence needed | Protected route/progress logic | Route-smoke Start Module 3 and review objectives behavior. | Evidence only |

## Implementation-Layer Classification

| Layer | Issues |
|---|---|
| Content | Intersectionality reinforcement; safe standards trace; optional `M2-S13` to `M2-S14` bridge. |
| Instructional design | Repeated gating/fatigue; synthesis friction; objective review strictness. |
| Visual/design-system | Hotspot label readability; selected/correct state visibility; mobile padding/readability; infographic density. |
| Accessibility/mobile | Keyboard/focus; tablist semantics; hotspot alternatives; radio-style controls; text size/high contrast/reduce-motion checks. |
| Technical QA/evidence | Console, route smoke, build/TypeScript/lint, DOM alt, completion/unlock, regression evidence package. |
| Privacy/storage | `M2-S21` portfolio text persistence, safe-input guidance, accessible textareas, reset/review behavior. |
| Media/resource | Final intro video/captions/transcript; Module 2 resource pack planning. |
| Protected route/progress logic | `M2-S01` to `M2-S01A` start path; `M2-S23` completion transition; player Next/back/replay behavior. |

## Protected / Deferred Issues

- Protected route/progress: `M2-S01` start-path inconsistency and `M2-S23` completion transition. Test first; do not fix without separate approval.
- Protected player/shell/accessibility toolbar behavior: keyboard/focus issues that live in shell/global focus management should be recorded as protected Batch 5-style issues unless separately approved.
- Final media: `M2-S01A` video, captions, transcript, poster metadata, and player architecture remain deferred.
- Resource-pack implementation: do not create PDFs, PPTs, downloads, links, or resource UI until a separate resource-pack lane is approved.
- Broad design-system/global CSS: only use existing content-safe patterns unless a specific Batch 4/5-style fix is approved.

## Resource-Pack / Input Needs for Module 2

Planning-only resource candidates:

1. Rights-holder / duty-bearer mapping template.
2. Participation quality checklist: presence, voice, considered, influence.
3. Overlapping-barriers worksheet: information, access, voice, benefit, safety, power.
4. Safe standards-use checklist: verify evidence, assess risk, protect people, choose constructive route, document follow-up.
5. Accountability loop worksheet: understand, use safely, review, respond, adapt.
6. Safe participation plan template.
7. One-page guide: how CSOs support accountability without replacing duty-bearers.

Input rules:

- Use generalized and fictional examples.
- Include safe-input warnings.
- Avoid names, precise locations, identifiable organizations, officials, disputes, survivors, children, or sensitive incidents.
- Provide accessible structure, alt text for visuals, and low-bandwidth file-size review before implementation.

## QA Evidence Plan

Required before Module 2 implementation acceptance:

1. `git status --short --branch --untracked-files=all` before and after.
2. `npm run build`.
3. `npx tsc -b --pretty false`.
4. `npm run lint`.
5. Route smoke for `/module-2`, `/module-2/cover`, `/module-2/intro-video`, `/module-2/screen-2-1` through `/module-2/screen-2-23`, and `/module-2/complete`.
6. Start-path test from platform module card and direct cover: confirm whether `M2-S01A` is reached or bypassed.
7. Completion/unlock test: complete `M2-S23`, verify Module 2 completion and Module 3 transition without corrupting portfolio/progress.
8. Manual or reliable browser keyboard test for all interaction families: reveal cards, tabs, hotspots, radio-style buttons, textareas, knowledge check, Continue buttons.
9. Focus evidence: first focusable, Tab, Shift+Tab, Enter/Space activation, visible focus, no trap.
10. Desktop screenshots for all active screens after any repair.
11. Mobile screenshots for all active screens after any repair, at minimum 390px width.
12. High contrast, text-size, and reduce-motion checks if current toolbar behavior is reliable; otherwise document Batch 5 dependency.
13. DOM alt/text alternative audit for all image-backed and hotspot screens.
14. Feedback-state screenshots for `M2-S06`, `M2-S09`, `M2-S15`, `M2-S16`, `M2-S17`, `M2-S19`, `M2-S22`.
15. Learner-input privacy/storage test for `M2-S21`: safe warning visible, text saved, text reviewable, reset/replay behavior understood, no sensitive example requested.
16. Console/runtime log capture during route smoke and representative interactions.

## Recommended Implementation Sequence

1. Close the `M2-S01` start-path decision first. This is protected route/progress logic and should be handled before course-layer polishing if it is a real defect.
2. Run keyboard/focus evidence on representative interaction families. If a real protected-layer focus defect appears, stop and classify it separately rather than patching course content.
3. Run visual/readability evidence for all active Module 2 screens. Fix only clear learner-facing contrast, clipping, or low-readability issues using existing patterns.
4. Apply small course-layer content refinements only where evidence or human review requires them: intersectionality recurrence, safe-standards trace, `M2-S13` bridge, and optional lighter reveal gating.
5. Verify portfolio privacy/storage and accessible labels before accepting `M2-S21`.
6. Run full command and route evidence: build, TypeScript, lint, route/progress/completion/unlock, console, desktop/mobile, high contrast/text-size/reduce-motion as available.
7. Prepare human review package with changed files, screenshots, evidence, remaining protected/deferred issues, and a commit/no-commit recommendation.

## Strategic Addendum: Missing Priorities and Implementation Readiness

This addendum strengthens the Module 2 review from a findings report into an implementation-readiness control note. It does not approve source changes. It defines what must be proved, decided, or separately approved before Module 2 repair begins.

### 1. Visual Readability and Contrast Priority

Visible text-background readability is a critical Module 2 acceptance item, not only a general evidence gap. Because Module 2 relies on tinted cards, dark cards, image-backed hotspots, badges, chips, selected states, disabled states, feedback panels, helper text, and mobile card stacking, every active screen needs visual review in desktop and mobile contexts.

Current classification:

- If a visible contrast/readability issue is apparent from live screenshots or human visual review, classify it as `P1` and fix within the smallest approved course-layer/design-system scope.
- If not yet proven, classify it as `P2 evidence-required` and capture screenshots before deciding.
- If the fix requires global CSS, tokens, shell/player layout, accessibility toolbar behavior, or shared component behavior outside approved scope, stop and request explicit approval.

Screen-by-screen visual/readability requirements:

| Screen(s) | Visual/readability targets | Priority rule | Evidence required |
|---|---|---|---|
| `M2-S01`, `M2-S01A` | Cover/intro image text support, dark or tinted panels, CTA states, poster/play-card text, mobile stacking | `P1` if title/CTA/helper text is hard to read; otherwise `P2 evidence-required` | Desktop/mobile screenshots; high contrast and text-size check if toolbar works |
| `M2-S02`-`M2-S03` | Objective cards, flip/reveal card front/back text, progress chips, disabled Continue, muted helper text | `P1` if card text or disabled state is visibly weak; otherwise `P2 evidence-required` | Normal, selected/revealed, disabled/enabled screenshots |
| `M2-S04` | Image hotspot labels, numbered buttons, selected hotspot panel, text alternative visibility, progress bar | `P1` if hotspot labels blend into image or touch targets are unclear | Desktop/mobile hotspot screenshots; high contrast/text-size; focus-visible check |
| `M2-S05`-`M2-S09` | Reveal cards, tab/radio states, progress chips, feedback panels, hidden/revealed state text | `P1` if selected/correct/incorrect states rely only on subtle color | State screenshots; non-color cue review; mobile stacking |
| `M2-S10`-`M2-S14` | Compact reveal surface contrast, tinted panel text, role-check radio-style options, infographic text/alt support | `P1` for unreadable infographic/card text; otherwise `P2 evidence-required` | Desktop/mobile screenshots; enlarged text; alt/text alternative audit |
| `M2-S15`-`M2-S17` | Spectrum cards, rating buttons, loop map, feedback states, disabled/required states | `P1` if feedback/selected states are hard to distinguish | Correct/incorrect/selected screenshots; mobile; keyboard focus screenshot |
| `M2-S18` | Image-backed hotspot labels, keyboard list, selected hotspot text, readable chip surfaces | `P1` if image-over-text or labels are low contrast | Desktop/mobile hotspot screenshots; high contrast; text-size; touch target review |
| `M2-S19`-`M2-S20` | Adjustment options, synthesis reveals, progress states, feedback panels | `P1` if disabled/selected/feedback text is hard to read | State screenshots and mobile stacking |
| `M2-S21` | Privacy note, safety helper text, textarea labels, habit radio states, save strip, required/disabled states | `P1` if safe-input guidance or labels are difficult to read | Desktop/mobile screenshots; text-size; focus-visible; accessible-name audit |
| `M2-S22` | MCQ labels, selected answer, feedback panels, disabled Check/Next, completion summary | `P1` if selected/correct feedback is color-only or unreadable | Feedback-state screenshots; keyboard/focus; aria-live check |
| `M2-S23` | Completion badge, CTA hierarchy, transition panel, progress-saved copy | `P1` if Start Module 3 CTA or completion state is unclear | Desktop/mobile screenshots; completion route smoke |

### 2. Route/Progress Clarification

`M2-S01` to `M2-S01A` remains a protected route/progress issue. It is not yet a fully confirmed learner-facing defect because the previous review found source inconsistency and direct-route behavior, but did not complete the full route-smoke path from platform launch, direct cover, cover CTA, sidebar/player Next, refresh/resume, and review mode.

Current status:

- Classification: `P1 protected evidence-first`.
- Known source concern: `src/data/module2/module_2_screen_sequence.json` says `M2-S01` should move to `M2-S01A`, while the cover CTA path observed in `src/components/course/Module2Renderer.tsx` appears to push to `/module-2/screen-2-2` (`M2-S02`).
- Risk: `M2-S01A` intro could be bypassed even though Batch 6 accepted it as the learner-ready intro screen.

Routes and paths that must be tested:

1. Platform Module 2 card/start action.
2. `/module-2`.
3. `/module-2/cover`.
4. `/module-2/screen-2-1`.
5. `M2-S01` cover CTA.
6. Player Next from `M2-S01`, if available.
7. Direct `/module-2/intro-video`.
8. Direct `/module-2/screen-2-1a`.
9. Refresh/resume after landing on `M2-S01`.
10. Review-mode launch if applicable.

Likely files if a protected fix is later approved:

- `src/components/course/Module2Renderer.tsx`
- `src/data/module2/module_2_screen_sequence.json`
- `src/data/module2/module2Content.ts`
- `src/components/player/CoursePlayerShell.tsx`
- `src/App.tsx`

No protected fix should happen in this planning task. Route/progress/completion logic controls learner state, module unlock, sidebar state, review/replay behavior, and Module 3 transition. Any change there requires explicit implementation approval and regression evidence.

### 3. G1 Content and Safeguarding Trace Requirements

Current QA sufficiently identifies these as present in the implementation:

- State/public institutions as primary duty-bearers: present most clearly on `M2-S10`.
- Respect/protect/fulfil: present on `M2-S10` and in actor-map caption context.
- Bounded CSO support role: present on `M2-S10`, `M2-S11`, `M2-S12`, `M2-S16`, `M2-S17`, `M2-S22`.
- Safe standards use beyond `M2-S12`: present in accountability and knowledge-check areas, but not yet formally traced.
- Safe standards habit: verify evidence, assess risk, protect people, choose constructive route, document follow-up: present in several lines, but needs trace evidence.
- Intersectionality recurrence in later practice: conceptually present through power/exclusion and portfolio, but needs trace evidence.
- Safe-input guidance in `M2-S21`: strongly present and specific.

Trace requirements and acceptance criteria:

| G1 item | Current status | Required trace | Acceptance criteria |
|---|---|---|---|
| Primary duty-bearers | Present | Trace across `M2-S10`, `M2-S11`, `M2-S22`, and any portfolio/resource planning | Learner can distinguish rights-holders, public duty-bearers, influencing actors, and CSO support role. |
| Respect/protect/fulfil | Present but concentrated | Trace on `M2-S10`; confirm whether later feedback needs repetition | Language is accurate, concise, and not overlegalized. |
| Bounded CSO role | Present | Trace through actor, standards, accountability, KC, portfolio | CSO is facilitator/support actor, not hero, substitute duty-bearer, court, or complaint authority. |
| Safe standards-use repetition | Present but unverified | Trace from `M2-S12` into `M2-S16`, `M2-S17`, `M2-S19`, `M2-S21`, `M2-S22` | Safe-use habit appears where learners make judgments or write outputs. |
| Safe standards habit | Present but unverified | Verify exact coverage of verify evidence, assess risk, protect people, constructive route, document follow-up | Learners see a repeatable safe action sequence, not a one-time warning. |
| Intersectionality recurrence | Partly present | Trace from `M2-S09` into `M2-S15`, `M2-S18`, `M2-S19`, `M2-S21` | Later practice asks which overlapping barriers matter, not only who attended. |
| Safe-input guidance | Strong on `M2-S21` | Verify privacy note, textarea context, save behavior, and any portfolio carry-forward | Learners are told not to enter names, exact locations, officials, organizations, survivors, children, disputes, or sensitive incidents. |

### 4. G2 Learning-Design Readiness

| Learning-design issue | Current readiness | Classification | Implementation note |
|---|---|---|---|
| Worked examples before complex practice | Present for `M2-S06`, `M2-S15`, `M2-S16`, `M2-S18`; needs trace for `M2-S17`, `M2-S19`, `M2-S21` | Evidence-first | Preserve existing worked examples; add only small model-entry copy where a complex task lacks a model. |
| `M2-S13` to `M2-S14` bridge | Conceptually present but not explicit enough for all learners | Human-input-needed | Optional one-line bridge: LNOB becomes real through participation choices: information, access, voice, influence, response. |
| Repeated "open all" gating | Widespread | Human-input-needed / defer to learner testing | Keep strict gating for practice, KC, and portfolio; consider lighter completion only for exploratory reveal screens if human/learner review confirms fatigue. |
| `M2-S20` synthesis friction | Possible all-open fatigue | Defer to learner testing | Could become lower-friction review or optional enrichment; do not change without evidence. |
| `M2-S21` portfolio specificity | Safer and more specific than before, but acceptance depends on output quality | Evidence-first | Verify whether output produces one concrete safe habit/action, not only broad reflection. Add microcopy only if human review finds it too broad. |

### 5. G3 Visual / Asset Strategy

| Screen ID | Current visual or visual type | Learning purpose | Classification | Current alt/text alternative status | Representation risk | Local relevance risk | Contrast/readability risk | Recommended action | New asset input needed |
|---|---|---|---|---|---|---|---|---|---|
| `M2-S01` | Module cover image | Establish module identity and topic | Informative | Image alt present | Low; generic module framing | Medium; confirm locally appropriate | Medium on dark/tinted cover surfaces | Screenshot review; preserve unless issue found | No |
| `M2-S01A` | Intro poster/play-card | Prime module lens before objectives | Informative / future media | Poster alt present; no transcript claim | Low if poster stays generalized | Medium; final media later | Medium on poster/card text | Keep interim treatment; verify readability | Final media later only |
| `M2-S02` | Objective cards | Preview learning path | Functional | Text-native | Low | Low | Medium for cards/chips/disabled states | Visual state screenshots | No |
| `M2-S03` | Flip/reveal cards | Convert rights into everyday dimensions | Functional | Text-native; hidden/revealed state needs DOM proof | Low | Low | Medium for front/back cards | Contrast and screen-reader state evidence | No |
| `M2-S04` | Community meeting hotspot image | Diagnose rights dimensions in a scene | Complex / functional | Image alt and sr-only alternative present | Medium; must show agency and avoid stereotypes | Medium; local meeting norms need review | High for hotspot labels | P1 visual/accessibility evidence; adjust labels if needed | No unless visual fails |
| `M2-S05` | Characteristic cards/icons | Explain universal/inalienable/indivisible/interdependent | Functional | SVG icons decorative; text carries meaning | Low | Low | Medium for card states | State screenshots | No |
| `M2-S06` | Matching board | Practice characteristic judgment | Functional | Text-native | Low | Low | Medium for selected/feedback states | Feedback/readability evidence | No |
| `M2-S07` | Principle tabs/cards | Connect principles to practice | Functional | Text-native | Low | Low | Medium for tab selected states | State/focus evidence | No |
| `M2-S08` | Actor/rights-holder map | Show roles, agency, barriers, responsibility | Complex / informative | Image alt and caption present | High: rights-holders must have agency, duty-bearers not caricatured, CSO not hero | High; local actors must be plausible | High on dense map/mobile | Human representation review; mobile/alt evidence | Maybe, only if map fails |
| `M2-S09` | Case pathway cards | Show overlapping barriers over time | Functional | Text-native | Medium; avoid reducing women to passive beneficiaries | Medium | Medium | Review copy and card readability | No |
| `M2-S10` | Actor role reveal | Clarify rights-holders, duty-bearers, influence, CSO role | Functional | Text-native | Medium; avoid caricaturing public actors | Medium; local examples present | Medium | Preserve; evidence check | No |
| `M2-S11` | CSO role reveal | Show CSO as facilitator/support actor | Functional | Text-native | Medium; avoid CSO-as-hero framing | Low-Medium | Medium | Preserve; evidence check | No |
| `M2-S12` | Safe standards reveal | Teach careful use of standards | Functional | Text-native | Low | Low | Medium | Preserve; evidence check | No |
| `M2-S13` | SDG/LNOB/HRBA infographic | Link frameworks to practical questions | Complex / informative | Alt and caption present | Medium; inclusion should not be slogan-only | Medium | High if infographic text is dense | Mobile/enlarged text and alt audit | Maybe, only if unreadable |
| `M2-S14` | Participation levels | Show participation as influence, not attendance | Functional | Text-native | Medium; must avoid token participation | Low | Medium | Preserve; state evidence | No |
| `M2-S15` | Spectrum/rating cards | Practice participation quality | Functional | Text-native | Medium; examples must show women/youth/others as actors | Low-Medium | Medium-High for selected/feedback states | Feedback/state screenshots | No |
| `M2-S16` | Accountability loop | Show complete response loop | Functional / complex | Text-native; loop meaning in text | Low-Medium | Low | Medium | Responsive/feedback evidence | No |
| `M2-S17` | Feedback loop map/options | Repair accountability process | Functional / complex | `role=img` label for loop; text feedback | Medium; safe response must avoid exposing people | Low-Medium | Medium-High for feedback states | Feedback-state evidence | No |
| `M2-S18` | Power/exclusion hotspot scene | Analyze power before visible decision | Complex / functional | CSS image has aria-label and sr-only scene text; keyboard list present | High; must show agency and avoid passive/crowd framing | Medium-High | High for hotspot labels/image surface | P1 visual and keyboard evidence; representation review | Maybe, only if current image fails |
| `M2-S19` | Pathway adjustment board | Transfer exclusion analysis to action | Functional | Text-native | Medium | Low-Medium | Medium | State/feedback evidence | No |
| `M2-S20` | Seven-question synthesis | Consolidate reusable lens | Functional | Text-native | Low | Low | Medium | Reduce friction only if testing supports | No |
| `M2-S21` | Portfolio summary/habit cards | Safe learner transfer | Functional / privacy-sensitive | Text-native; labels need accessible-name proof | Medium; safe-input framing strong | Medium | High for helper/safety text | P1 privacy/readability/accessibility evidence | No resource UI |
| `M2-S22` | Knowledge check | Confirm applied understanding | Functional | Fieldset/legend/labels present | Medium; scenarios must avoid overclaim/harm | Medium | Medium-High for selected/feedback states | Feedback and keyboard evidence | No |
| `M2-S23` | Completion/transition panel | Confirm progress and transition | Functional | Text-native | Low | Low | Medium for CTA hierarchy | Completion screenshot and route smoke | No |

Visual strategy acceptance checks:

- Participation visuals show influence, response, and changed practice, not only attendance.
- Power/exclusion visuals show barriers and decision influence without exposing sensitive identities.
- Rights-holders appear as actors and decision-makers, not passive recipients.
- Duty-bearers are shown as responsible actors without caricature.
- CSOs are facilitators/support actors, not heroes or substitute duty-bearers.
- Women, youth, persons with disabilities, displaced/newly arrived, and marginalized groups are represented with agency where relevant.
- Safe participation is shown through generalized fictional scenes only.

### 6. G4 Evidence Additions

Implementation-ready QA must include:

| Evidence area | Required checks | Notes |
|---|---|---|
| Commands | `npm run build`, `npx tsc -b --pretty false`, `npm run lint` | Run after any implementation and before human review. |
| Route smoke | `/module-2`, `/module-2/cover`, `/module-2/intro-video`, `/module-2/screen-2-1` through `/module-2/screen-2-23`, `/module-2/complete` | Include direct URL/deep-link checks. |
| Start path | Platform card, direct cover, cover CTA, player Next, refresh/resume | Prove whether `M2-S01A` is bypassed. |
| Completion | `M2-S23` Start Module 3, review objectives, completedModules, Module 3 unlock | Protected logic; regression-test before any fix. |
| Refresh/resume | Refresh mid-interaction and after completion where safe | Confirm state consistency. |
| Console/runtime | Capture console errors/warnings during route smoke and representative interactions | Existing direct-route pass had no errors, but full pass needed. |
| Keyboard-only families | Cards, tabs, compact reveals, hotspots, radio-style buttons, textareas, KC, Continue buttons | Record first focus, Tab, Shift+Tab, Enter/Space, visible focus, no trap. |
| ARIA/tablist decision | Decide full tab arrow-key behavior vs simpler button semantics | Do not leave strict tab roles with incomplete expectations if evidence fails. |
| Hotspot touch/keyboard | `M2-S04`, `M2-S18` visual hotspots and text/keyboard alternatives | Verify no precision-only dependency. |
| Accessibility modes | High contrast, text size, reduce motion | If toolbar behavior is unreliable, document Batch 5 dependency. |
| Mobile | 390px screenshots for all changed screens, and all active screens for final package | Include card stacking, CTA reachability, no clipped text. |
| Enlarged text | Browser/text-size mode screenshots for dense screens | Prioritize `M2-S04`, `M2-S08`, `M2-S13`, `M2-S18`, `M2-S21`, `M2-S22`. |
| DOM alt/text alternatives | Images, CSS image maps, hotspot alternatives, icon-only state cues | Confirm learning-critical visual meaning has text. |
| Privacy/storage | `M2-S21` save, edit, reset/replay, refresh/resume; localStorage/session observations | Do not test with sensitive real data. |

### 7. Resource-Pack Planning Additions

Resource-pack planning remains separate from code implementation. Do not create resources, downloads, PDFs, PPTs, assets, links, or resource UI in Module 2 repair without separate approval.

| Resource | Purpose | Related screen | Format | Owner/input needed | Accessibility requirement | Low-bandwidth/file-size requirement | Privacy/safe-input note | Implementation readiness | QA requirement |
|---|---|---|---|---|---|---|---|---|---|
| Rights-holder / duty-bearer mapping template | Help learners separate affected people, public responsibilities, influencing actors, and bounded CSO role | `M2-S08`, `M2-S10`, `M2-S21` | Fillable worksheet later; planning now | HRBA reviewer and local CSO advisor | Structured headings, labelled fields, plain language | Lightweight PDF/docx only if later approved | Use generalized actors; no names, exact locations, officials, organizations, disputes | Planning only | Accessibility review, HRBA accuracy, safe-input check |
| Participation quality checklist | Distinguish attendance, voice, considered input, influence, response | `M2-S14`, `M2-S15` | Checklist later; planning now | Learning designer | Checklist with text cues, not color-only | One-page low-size file if approved | Do not document real sensitive meetings | Planning only | Screen-reader order, contrast, examples review |
| Overlapping-barriers worksheet | Apply intersectionality across information, access, voice, benefit, safety, power | `M2-S09`, `M2-S18`, `M2-S19` | Worksheet later; planning now | HRBA/safeguarding reviewer | Clear field labels; examples are fictional | Lightweight; printable grayscale | Avoid identifiable people or protected details | Planning only | Safeguarding review and accessibility check |
| Safe standards-use checklist | Reinforce verify evidence, assess risk, protect people, constructive route, document follow-up | `M2-S12`, `M2-S16`, `M2-S17`, `M2-S22` | Checklist later; planning now | HRBA/legal-safety reviewer | Plain-language, warnings exposed in text | One-page low-size | Do not make legal claims or record sensitive allegations | Planning only | Safe wording review |
| Accountability loop worksheet | Map understand, use safely, review, respond, adapt | `M2-S16`, `M2-S17` | Worksheet later; planning now | Accountability/MEAL reviewer | Sequential headings; no color-only loop | Low-size, printable | Use anonymized patterns only | Planning only | Keyboard/screen-reader structure if digital |
| Safe participation plan template | Plan information, access, voice, influence, response, risk mitigation | `M2-S14`, `M2-S15`, `M2-S18`, `M2-S21` | Template later; planning now | Safeguarding and participation advisor | Plain language, accessible table alternative | Low-size | Do not record survivor/child/sensitive incident details | Planning only | Safeguarding and accessibility review |
| One-page CSO accountability support guide | Explain how CSOs support accountability without replacing duty-bearers | `M2-S10`, `M2-S11`, `M2-S12`, `M2-S22` | One-page guide later; planning now | HRBA reviewer | Headings, bullets, readable contrast | Low-size, mobile-readable | Generalized examples only | Planning only | HRBA role-boundary sign-off |
| Facilitator mini-slide deck | Support facilitated Module 2 review or blended delivery | Module-wide | Slide deck later; planning now | Facilitator/training lead | Large readable text, speaker notes, alt text | Optimized PPT/PDF if approved | No real cases or identifiable examples | Planning only | Slide accessibility, file-size, visual ethics review |

## Module 2 Story and Visual Asset Integration Overlay

This overlay adds story and visual asset inputs to the existing Module 2 QA plan without approving implementation, asset migration, or source edits. The available workspace inputs checked for this overlay were:

- `D:\Stories and visual assets\Story Asset Register.xlsx`
- `D:\Stories and visual assets\Visual Asset Register HRBA E-learning Course.docx`
- `D:\Stories and visual assets\# Story-to-Screen Mapping Matrix.docx`

The named zip packages `stories catalogue-001.zip` and `Story Visuals (2).zip` were not found in the recursive file check. The story and asset references below are therefore treated as candidate-only planning inputs using the provided IDs, filenames, and learning purposes. Old story-catalogue screen numbers must not be used as implementation targets; every candidate is remapped to the current active Module 2 sequence, `M2-S01` through `M2-S23`.

### Selected Story Inputs

| Story input | Role in Module 2 | Current active-screen mapping | QA use | Safeguarding constraints |
|---|---|---|---|---|
| `HRBA-STORY-10 - A Seat at the Table: Women's Participation in Local Planning` | Primary story input | `M2-S14`, `M2-S15`, `M2-S18`, `M2-S19`, `M2-S21` | Use as candidate support for participation as influence, hidden participation barriers, power/exclusion, inclusive meeting redesign, women's collective voice and agency, and participation/accountability improvement planning. | Keep generalized and fictional. Do not add names, precise locations, organizations, officials, disputes, complainants, survivors, children, or sensitive incidents. |
| `HRBA-STORY-04 - Education Cannot Wait: Safe Participation for Displaced Girls` | Supporting story input | `M2-S08`, `M2-S09`, `M2-S12`, `M2-S14`, `M2-S15`, `M2-S21` | Use carefully for intersectionality, age/gender/displacement/safety/education barriers, anonymous voice, safe participation pathways, safe standards use, and safeguarding/do-no-harm. | Extra safeguarding caution. Use only fictional/generalized examples; avoid child-identifying or displacement-sensitive detail. Do not create learner prompts that ask for real cases. |
| `Water is Life` | Secondary continuity reference only | Optional light reference across rights-holders, duty-bearers, participation, accountability | Do not make it the main Module 2 story. Use only if continuity helps a short explanation. | Keep secondary; avoid expanding Module 2 around it. |
| `The Locked Health Post` | Secondary duty-bearer/accountability reference only | Optional support for `M2-S10`, `M2-S16`, `M2-S17`, `M2-S22` | Use only if a duty-bearer/accountability example is needed. | Avoid caricaturing duty-bearers or implying unsupported legal conclusions. |
| Cross-course reusable story/visual assets | Candidate support assets | Module-wide as needed | Candidate supports for rights-holder/duty-bearer icons, HRBA principles icons, feedback loop, safeguarding alert, and portfolio output card. | Candidate only; no migration without human approval. |

### Active-Screen Story Use Guidance

| Active screen | Candidate story use | Allowed use | Not allowed |
|---|---|---|---|
| `M2-S08` | `HRBA-STORY-04` | Microcopy or visual planning for rights-holders beyond "the community": age, gender, displacement, safety, education access, anonymous voice. | Do not use identifiable children, real locations, or real school/community details. |
| `M2-S09` | `HRBA-STORY-04` | Compact example of overlapping barriers across age, gender, displacement, safety, and education. | Do not introduce a long story page or trauma detail. |
| `M2-S12` | `HRBA-STORY-04` | Safe standards-use example: verify evidence, assess risk, protect people, use constructive route, document follow-up. | Do not invite legal conclusions about a specific real incident. |
| `M2-S14` | `HRBA-STORY-10`; supporting `HRBA-STORY-04` if needed | Participation-as-influence example: attendance is not enough unless information, access, voice, influence, and response exist. | Do not turn participation into headcount or passive crowd imagery. |
| `M2-S15` | `HRBA-STORY-10` | Token vs meaningful participation worked example; inclusive meeting redesign. | Do not add a broad story rewrite or extra assessment logic. |
| `M2-S18` | `HRBA-STORY-10` | Hidden barriers: meeting time, information access, childcare, language, venue, safety, agenda control, who can influence. | Do not use visuals that expose real people or sensitive community conflict. |
| `M2-S19` | `HRBA-STORY-10` | Exclusion pathway repair: identify where participation narrowed and what adjustment opens influence. | Do not overprescribe one political solution. |
| `M2-S21` | `HRBA-STORY-10`; supporting `HRBA-STORY-04` | Fictional/generalized participation or accountability improvement plan model; safe participation plan example. | Do not ask learners to enter real sensitive stories, names, locations, officials, organizations, disputes, survivors, children, or incidents. |

### Candidate Visual Asset Mapping

All assets in this table are candidate-only planning inputs. Do not import, rename, optimize, compress, convert, or replace any asset without human approval and a separate implementation prompt.

| Asset ID | Proposed filename | Related story | Current active Module 2 screen | Learning purpose | Asset type | Current status | Alt-text guidance | Representation/safeguarding note | Implementation lane |
|---|---|---|---|---|---|---|---|---|---|
| `VA-012` | `hrba-m2-s03-seat-table-anchor-scene.png` | A Seat at the Table | `M2-S14` or `M2-S15` | Anchor participation as influence, not attendance | PNG scene | Candidate only / needs human approval | Describe a fictional local planning discussion where different groups can see, speak, and influence decisions; avoid naming people or place. | Show women and other rights-holders as active decision contributors; CSO facilitates rather than dominates. | Lane B / Lane D |
| `VA-013` | `hrba-m2-s03-seat-table-hidden-barriers.svg` | A Seat at the Table | `M2-S18` | Make hidden participation barriers visible | SVG diagram | Candidate only / needs human approval | Describe barriers such as timing, childcare, information, language, venue access, safety, and agenda control. | Avoid blaming individuals; show process barriers and safe adjustments. | Lane B / Lane D |
| `VA-014` | `hrba-m2-s04-token-meaningful-participation.svg` | A Seat at the Table | `M2-S14`, `M2-S15` | Compare token attendance with meaningful influence | SVG comparison | Candidate only / needs human approval | Explain the contrast between being present and shaping a decision with response/follow-up. | Do not depict rights-holders as passive crowd; include influence and response. | Lane B / Lane D |
| `VA-015` | `hrba-m2-s05-inclusive-meeting-builder.png` | A Seat at the Table | `M2-S15`, `M2-S19`, `M2-S21` | Show inclusive meeting redesign choices | PNG scene/tool visual | Candidate only / needs human approval | Describe practical redesign elements: accessible venue, timing, language support, childcare-aware option, safe feedback, and response. | Avoid real meeting locations or identifiable groups. | Lane B / Lane D / Lane F |
| `VA-016` | `hrba-story-10-womens-preconsultation-scene.png` | A Seat at the Table | `M2-S15`, `M2-S18`, `M2-S21` | Show women's collective voice and preparation before formal decision space | PNG scene | Candidate only / needs human approval | Describe a fictional pre-consultation where women identify priorities and plan how to raise them safely. | Show agency and collective voice; avoid sensitive personal stories. | Lane B / Lane D |
| `VA-017` | `hrba-m2-s07-education-anchor-scene.png` | Education Cannot Wait | `M2-S08`, `M2-S09` | Anchor overlapping barriers for displaced girls' safe participation | PNG scene | Candidate only / needs human approval | Describe generalized education participation barriers without identifying children or places. | High safeguarding caution: no identifiable children, displacement sites, uniforms, or real school details. | Lane B / Lane D |
| `VA-018` | `hrba-m2-s07-safe-participation-pathways.svg` | Education Cannot Wait | `M2-S09`, `M2-S12`, `M2-S14` | Show safe participation pathways and do-no-harm choices | SVG pathway | Candidate only / needs human approval | Describe anonymous, consent-aware pathways for voice, referral, information, and response. | Avoid trauma detail; emphasize choice, safety, and trusted channels. | Lane B / Lane D / Lane F |
| `VA-019` | `hrba-m2-s08-anonymous-priority-cards.svg` | Education Cannot Wait | `M2-S12`, `M2-S21` | Support anonymous voice and safe portfolio planning | SVG cards | Candidate only / needs human approval | Describe anonymous priority cards used to gather concerns without exposing identities. | Must not suggest collecting sensitive identifiable data. | Lane D / Lane F |
| `VA-020` | `hrba-m2-s09-participation-risk-map.svg` | Education Cannot Wait | `M2-S09`, `M2-S18`, `M2-S21` | Map participation risks and safe adjustments | SVG risk map | Candidate only / needs human approval | Describe risk points and mitigations in a fictional participation process. | Keep generalized; no child/survivor/official/incident detail. | Lane B / Lane D / Lane F |
| `VA-021` | `hrba-story-04-education-video-poster.png` | Education Cannot Wait | `M2-S09` or future media only | Optional supporting poster for safe participation story | PNG poster | Candidate only / needs human approval | Describe a generalized safe education participation lens without identifying people or location. | Do not use as final media asset without separate media/caption/transcript approval. | Lane B / deferred media |
| `VA-065` | `hrba-global-rightsholder-dutybearer-icons.svg` | Cross-course | `M2-S08`, `M2-S10`, `M2-S22` | Clarify rights-holder/duty-bearer/support actor roles | SVG icon set | Candidate only / needs human approval | Icons should be named with visible text labels; alt can be decorative if labels carry meaning. | Avoid making duty-bearers look villainous or CSOs heroic. | Lane B / Lane F |
| `VA-066` | `hrba-global-panel-principles-icons.svg` | Cross-course | `M2-S07`, `M2-S12`, `M2-S20` | Support HRBA principle recall | SVG icon set | Candidate only / needs human approval | Use text labels for principles; icons are supportive. | Avoid abstract icons without explanation. | Lane B / Lane F |
| `VA-068` | `hrba-global-safeguarding-alert-card.svg` | Cross-course | `M2-S12`, `M2-S21` | Reinforce safe standards and safe-input warnings | SVG/card | Candidate only / needs human approval | Describe safe-input warning in text; do not rely on alert color alone. | Warning must be calm and practical, not alarmist or trauma-triggering. | Lane B / Lane D / Lane F |
| `VA-070` | `hrba-global-portfolio-output-card.svg` | Cross-course | `M2-S21`, `M2-S23` | Support portfolio output and completion reminder | SVG/card | Candidate only / needs human approval | Describe a generic portfolio card with safe, generalized output fields. | Must not imply uploaded/downloaded resource exists unless implemented later. | Lane B / Lane F |
| `VA-071` | `hrba-global-feedback-loop-diagram.svg` | Cross-course | `M2-S16`, `M2-S17`, `M2-S22` | Clarify accountability loop | SVG diagram | Candidate only / needs human approval | Explain receive, review, respond, adapt, follow up safely. | Do not show complainants or sensitive incidents. | Lane B / Lane D / Lane F |
| `VA-073` | `hrba-global-accessibility-check-icons.svg` | Cross-course | `M2-S04`, `M2-S08`, `M2-S15`, `M2-S21` | Support accessibility and inclusion cues | SVG icon set | Candidate only / needs human approval | Icons should have visible labels or be decorative beside text. | Avoid tokenistic representation; include access, language, timing, safety, information. | Lane B / Lane F |

### Lane Integration

Lane B - Visual Readability and Content-Safe Surface Repair:

- Use selected visual assets only as candidate alternatives if current visuals fail readability, contrast, representation, or instructional clarity checks.
- Do not replace or import assets automatically.
- Record any asset migration as a later human-approved step.
- Candidate assets most relevant to Lane B: `VA-012`, `VA-013`, `VA-014`, `VA-015`, `VA-017`, `VA-018`, `VA-020`, `VA-065`, `VA-066`, `VA-068`, `VA-071`, `VA-073`.

Lane D - Course-Layer Content and Learning Refinements:

- Use story snippets only as compact microcopy or worked-example support.
- Do not add long story pages or broad story rebuilds.
- Suggested microcopy uses:
  - `M2-S14`: A Seat at the Table as participation-as-influence example.
  - `M2-S15`: token vs meaningful participation worked example.
  - `M2-S18`: hidden barriers from meeting time, information access, childcare, language, venue, safety, and agenda control.
  - `M2-S19`: exclusion pathway repair from hidden barrier to practical adjustment.
  - `M2-S21`: participation/accountability improvement plan model.
  - `M2-S09`: Education Cannot Wait as intersectionality and safe voice example.

Lane F - Resource-Pack Planning Only:

- Use story assets to plan future Module 2 resources.
- Do not create PDFs, PPTs, downloads, links, resources, assets, or UI.
- Add resource-pack candidates:
  - Participation quality checklist.
  - Hidden barriers worksheet.
  - Token vs meaningful participation handout.
  - Safe participation plan.
  - Anonymous priority-card template.
  - Participation risk map.
  - Accountability loop worksheet.

### Overlay Acceptance Criteria

- Story inputs strengthen existing screens without broad redesign.
- Old story-screen numbers are remapped to current active screen IDs.
- No new asset is migrated without human approval.
- No story introduces names, precise locations, real organizations, officials, children, survivors, complainants, disputes, or sensitive incidents.
- Visuals show rights-holders as actors and decision-makers, duty-bearers as responsible actors without caricature, and CSOs as facilitators/support actors rather than heroes.
- Participation visuals show influence and response, not attendance only.
- Safe participation visuals avoid exposure, trauma, or identifiable sensitive details.
- Every candidate visual has alt-text guidance and representation/safeguarding notes.
- Resource-pack planning remains separate from code implementation.

### Overlay Stop Conditions

- Stop if asset use requires importing, renaming, optimizing, compressing, or converting files.
- Stop if a story change would require a broad rewrite of Module 2.
- Stop if a story or visual introduces safeguarding risk or identifiable sensitive details.
- Stop if a visual replacement requires global CSS/tokens/shared component changes.
- Stop if resource-pack work moves from planning into implementation.

## Final Recommendation

Proceed to a focused Module 2 repair/evidence planning step, not a broad redesign.

Stop/go status for implementation: GO for a targeted Module 2 QA-driven repair batch after human approval of the protected `M2-S01` route/progress question and the keyboard evidence strategy. STOP on any source change that touches protected route/progress, shell/player, storage, accessibility toolbar, global CSS/tokens, media architecture, or resource-pack implementation without separate approval.
