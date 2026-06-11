# 09_NEGATIVE_PROMPTING_AND_ANTI_DRIFT_RULES.md
# Negative Prompting and Anti-Drift Rules

## Binding rule

Google AI Studio must build only from the uploaded specifications. If something is missing, mark it **Pending source content**. Do not invent.

## Absolute do-not rules

Do not invent course content, slide content, modal content, quiz questions, answer options, feedback text, glossary content, resource content, transcripts, or post-completion platform states.

Do not rename the course or modules. Do not correct grammar, improve punctuation, paraphrase, summarize, shorten text, normalize inconsistent wording, change slide numbers, or change completion thresholds.

Do not redesign the outer platform or internal player. Do not modernize into SaaS UI, generic LMS, marketing landing page, scrolling lesson, mobile-first app, or gamified interface.

Do not skip or merge states: launch wrappers, start screens, base slides, modals, reveal states, selected states, solution states, feedback states, quiz result, summary tabs, completion screens, and pending states must remain distinct.

Do not use random stock images, fake logos, unrelated icons, invented resource pages, AI-generated replacement photos, or unapproved imagery.

Do not add admin, login, analytics, authoring, certificate generation, unrelated courses, extra navigation menus, or Module 2 behavior without source evidence.

## Exact text examples to preserve

- **one seating**
- **Your answer is.**
- **Which one is NOT a guiding principles in the CRC?**
- **Unforced labour laws in Egypt’s cotton industry**
- **40C degrees**
- **85% or higher** on outer course page
- **80%** in internal Module 1 quiz intro
- **Overview of Child Rights in Development Cooperation** on Module 1 completion slide

## Required prompt control sentence

Use this in every build prompt:

Build only the specified screen/state/slice. Use exact source text. Preserve visible inconsistencies. Do not invent missing content. Do not redesign. Do not modernize. Do not merge states. Do not skip wrappers, modals, feedback, reveal, quiz, summary, or completion states. Mark all missing content as Pending source content.
