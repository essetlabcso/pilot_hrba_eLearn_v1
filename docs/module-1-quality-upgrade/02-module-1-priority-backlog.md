# 02 — Module 1 Priority Backlog

## Purpose

Provide a concise implementation backlog for upgrading Module 1 based on the QA findings.

## Scope

Module 1 only.

Use this backlog to sequence implementation work.

---

## Priority Backlog

| Priority | Screen / Area | Category | Issue | Required Improvement | Effort |
|---|---|---|---|---|---|
| High | M1-S1-05 — Investigate the HRBA Lens | Contrast | Active/selected clue cards risk poor contrast on pale mint/green backgrounds. | Ensure active card text uses deep navy or another high-contrast dark color. Add stronger selected border/check state. | Small |
| High | M1-S1-06 — So, What Is HRBA? | Contrast | Feedback panel supporting text may be too muted on dark/navy backgrounds. | Use high-contrast white/near-white text on dark panels, or dark text on light panels. | Small |
| High | M1-S1-07 — Rights Are Connected | Contrast / Interaction | Ripple nodes and modal states may have readability or placement issues. | Improve text contrast, selected/focus states, and ensure modal does not obscure key context on smaller screens. | Medium |
| High | Global Module 1 / FocusModal | Accessibility | Modal focus management and focus return need verification and strengthening. | Ensure focus moves into modal, traps correctly, and returns to the triggering element on close. | Small |
| High | M1-S2-01 — Who Has Responsibility? | Visual learning | Concept is abstract and text-heavy. | Add a clear accountability actor map showing rights-holders, duty-bearers, and CSO role. | Medium |
| Medium | M1-S2-03 — From Services to Rights | Visual learning | HRBA shift is abstract and needs clearer visual scaffolding. | Add services-to-rights pathway infographic. | Medium |
| Medium | M1-S1-04 — Water Project Story | Visual support | Scenario relies heavily on text and needs stronger contextual grounding. | Add water story visual placeholder/image slot. | Medium |
| Medium | M1-S2-02 — Participation Is More Than Attendance | UX / Contrast | Disabled continue button may be unclear or low contrast. | Improve disabled state readability and add helper text explaining what remains. | Small |
| Medium | Survey / priority screens | Accessibility | Radio/check/touch targets may be too small. | Increase hit area and spacing for survey and checklist interactions. | Small |
| Medium | Global Module 1 | Progress clarity | Sub-progress indicators are useful but too subtle. | Make “2 of 4 explored” and similar indicators more visible. | Small |
| Medium | Portfolio/reflection moments | UX | Save confirmation may not be clear enough. | Add visible saved/completed confirmation where portfolio saving exists. | Small |
| Low | M1-PLAYER-00 — Introduction | Visual polish | Intro background could feel plain. | Add subtle thematic watermark or texture only if it does not distract. | Small |
| Low | M1-PLAYER-COMPLETE | Navigation clarity | “Review Module” and “Return to Course Page” need clear distinction. | Strengthen primary/secondary CTA styling and labels if needed. | Small |
| Low | M1-S1-07 — Rights Are Connected | Engagement polish | Ripple interaction could feel more alive. | Add subtle ripple animation only after core issues are fixed. | Medium |

---

## Phase Mapping

### Phase 1 — Contrast and accessibility fixes

Use:

```text
03-module-1-contrast-accessibility-fixes.md
```

Focus items:

- M1-S1-05 contrast
- M1-S1-06 feedback readability
- M1-S1-07 contrast/focus/modal behavior
- FocusModal behavior
- disabled states
- touch targets
- progress readability

### Phase 2 — Visual learning supports

Use:

```text
04-module-1-visual-assets-plan.md
```

Focus items:

- M1-S2-01 accountability actor map
- M1-S2-03 services-to-rights pathway
- M1-S1-04 water story visual placeholder/image slot

### Phase 3 — UX polish

Use:

```text
05-module-1-ux-polish-plan.md
```

Focus items:

- disabled-button guidance
- explored/completed states
- sub-progress indicators
- portfolio save feedback
- modal placement
- responsive behavior
- completion screen CTA clarity

---

## Implementation Rules

For every backlog implementation task:

- keep scope to Module 1
- avoid unrelated module changes
- preserve learner-facing content unless a short helper message is needed
- run `npm run build`
- fix build errors before committing
- commit each phase separately
- do not force push

---

## Recommended Commit Messages

```text
Improve Module 1 contrast and accessibility
Add Module 1 visual learning supports
Polish Module 1 learner experience
```
