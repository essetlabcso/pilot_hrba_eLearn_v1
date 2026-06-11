# 04 — Module 1 Visual Assets Plan

## Purpose

Define the priority visual assets needed to upgrade Module 1 without redesigning the full course.

## Scope

Module 1 only.

Do not implement unrelated module visuals.

Do not replace the course design system.

Focus on targeted visual learning support where the QA review identified high learning value.

---

## Priority Visual Assets

| Priority | Screen | Asset Type | Asset Name | Purpose | Recommended Format |
|---|---|---|---|---|---|
| High | M1-S2-01 — Who Has Responsibility? | Diagram / actor map | Accountability Actor Map | Help learners see the relationship between rights-holders, duty-bearers, and CSOs as support/facilitation actors. | SVG or React visual component |
| Medium | M1-S2-03 — From Services to Rights | Pathway infographic | Services-to-Rights Shift Pathway | Show the shift from activity/service delivery to dignity, inclusion, participation, responsibility, and accountability. | SVG or React visual component |
| Medium | M1-S1-04 — Water Project Story | Scenario visual placeholder or illustration slot | Water Project Story Visual | Give the story stronger emotional/contextual grounding and reduce reliance on text only. | Image slot, placeholder card, or future PNG/WebP illustration |
| Low | M1-S1-07 — Rights Are Connected | Micro-animation / ripple effect | Connected Rights Ripple Motion | Strengthen the idea that one rights issue can affect others. | CSS animation or lightweight SVG animation |
| Low | M1-PLAYER-00 — Introduction | Background texture / watermark | HRBA Course Intro Watermark | Add subtle thematic identity without distracting from the introduction. | SVG background or CSS pseudo-element |

---

## Required Asset Details

### 1. Accountability Actor Map

**Screen:** M1-S2-01 — Who Has Responsibility?

**Purpose:**  
Make the duty-bearer / rights-holder / CSO relationship visible and easier to understand.

**Must show:**

- Rights-holders
- Duty-bearers
- CSO as facilitator, bridge, supporter, or accountability enabler
- Feedback and accountability relationship
- Responsibility beyond direct service delivery

**Design direction:**

- Clean, instructional, not decorative
- Consistent with HRBA course colors
- Responsive for laptop and tablet screens
- Works on pale mint / white content panels
- Accessible with text alternative

**Recommended implementation:**

- Create as reusable SVG or React component.
- Avoid external icon libraries unless already used in the project.
- Use accessible labels or visually hidden description.

---

### 2. Services-to-Rights Shift Pathway

**Screen:** M1-S2-03 — From Services to Rights

**Purpose:**  
Help learners understand the HRBA shift from delivering activities to strengthening rights, voice, inclusion, accountability, and dignity.

**Must show progression from:**

1. Activity / service delivery
2. Access and inclusion
3. Participation and voice
4. Responsibility and accountability
5. Dignity and rights outcomes

**Design direction:**

- Pathway, bridge, or before/after flow
- Clear labels
- Minimal text inside graphic
- Strong contrast
- No reliance on color alone

**Recommended implementation:**

- SVG or React visual component.
- Use structural indicators such as arrows, steps, borders, or checkmarks.
- Add accessible description.

---

### 3. Water Project Story Visual

**Screen:** M1-S1-04 — Water Project Story

**Purpose:**  
Strengthen emotional/contextual engagement with the scenario.

**Recommended visual idea:**

A polished placeholder or image area showing a community water-point dilemma, such as:

- water point / hand pump context
- community discussion
- people affected differently by access, timing, distance, safety, or information
- no identifiable real person
- respectful, non-stereotyped representation

**Implementation option now:**

If no final illustration is available, create a refined placeholder card that can later be replaced with a real image.

**Placeholder should include:**

- clear visual frame
- caption/label
- accessible alt text
- no unfinished-looking blank area
- consistent size and responsive behavior

---

## Asset Folder Recommendation

Use existing repo conventions if they already exist.

If no clear structure exists, use:

```text
src/components/visuals/module1/
src/assets/module-1/visuals/
```

Suggested files:

```text
src/components/visuals/module1/AccountabilityActorMap.tsx
src/components/visuals/module1/ServicesToRightsPathway.tsx
src/components/visuals/module1/WaterStoryVisualPlaceholder.tsx
```

Optional asset folder:

```text
src/assets/module-1/visuals/
```

---

## Accessibility Requirements

All visual assets must:

- have sufficient contrast
- not communicate meaning through color alone
- include accessible labels or descriptions if informational
- use `aria-hidden="true"` only for decorative elements
- scale responsively
- remain readable on smaller screens

---

## Codex Implementation Note

Implement only the priority visual supports listed above.

Do not redesign Module 1.

Do not add large image dependencies.

Run build after implementation.
