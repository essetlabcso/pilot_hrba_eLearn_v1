# 00_MASTER_PRODUCT_BRIEF.md
# Master Product Brief

## Product purpose

The product is a high-fidelity recreation of a UNICEF/Agora-style e-learning platform and a specific child-rights course experience. It must reproduce:

1. the outer Agora-style learner platform;
2. the internal UNICEF/EU SCORM-style course player;
3. exact course screens and visible text;
4. modal overlays, reveal states, quiz states, feedback states, completion states, and return-to-platform behavior.

It must not become a generic LMS, a modern SaaS dashboard, a marketing website, or a redesigned course.

## Two-layer architecture

### Layer 1 — Outer Agora-style learning platform
Includes UNICEF top strip, Agora header, search, user area, breadcrumbs, dashboard, course overview, course homepage, course information cards, course instructions, module tiles, table of contents, component launch wrappers, completion indicators, locked/unlocked module states, and footer.

### Layer 2 — Internal SCORM-style course player
Includes dark blue UNICEF/EU header, thin yellow progress strip, slide counter, previous/next circular arrows, fixed left toolbar, slide content area, help overlay, modal overlays, quiz states, feedback states, summary tabs, completion screen, and Exit return behavior.

## Main course

**Child Rights Toolkit: Integrating Child Rights in International Partnerships**

The course includes an Introduction section, Module 1, additional locked modules, end-of-course assessment, course evaluation, and certificate. Only screens/states described in the source package should be implemented.

## Learner journey

Dashboard → Course Overview → Course Homepage → Introduction Launch Wrapper → Introduction Player Start → Introduction Slides → Introduction Completion → Return to Platform → Module 1 Overview → Module 1 Launch Wrapper → Module 1 Player Start → Module 1 Slides → Module Quiz → Module Summary → Module Completion → Return to Platform.

## Fidelity rules

- Use exact source text.
- Preserve visible inconsistencies.
- Do not improve grammar or punctuation.
- Do not invent missing slides, modals, quiz questions, resources, glossary terms, or post-completion states.
- Missing items must display `Pending source content`.
- Build screen/state by screen/state.

## Out of scope

Do not build admin dashboards, authoring tools, analytics, authentication, real certificates, unrelated courses, payment/donation flows beyond visible buttons, or real LMS backend.

## Success criteria

The prototype is successful only if the full learner path works, all specified text is exact, the player shell remains consistent, modals and quiz states behave correctly, pending items remain pending, Module 1 unlocks after Introduction completion, and no unregistered screens/features are added.
