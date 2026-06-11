# HRBA Design Lock — Decisions and Open Items

## Locked Decisions

1. Use two-layer architecture: platform/LMS layer + focused course-player layer.
2. Use UNICEF/Agora as design and interaction reference, not content-sequence template.
3. Preserve platform-player launch, progress, completion, and return flow.
4. Preserve fixed player shell, left toolbar, help overlay, resources, glossary, captions/transcripts, modals, quizzes, summary tabs, and completion screens.
5. Use DEC / CSO Learning Hub visual identity.
6. Do not force every HRBA module into 26 screens.
7. Module screen count follows learning purpose and storyboard.
8. HRBA production workbooks and block library control instructional design.
9. Safety and accessibility are non-negotiable.
10. Module 1 will be built first as the production standard.

## Open Items

| ID | Open Item | Impact | Proposed Approach |
|---|---|---|---|
| HRBA-OPEN-001 | Exact DEC/partner logo assets | Branding | Use approved logo files when available; use placeholders only in prototype. |
| HRBA-OPEN-002 | Final module titles and numbering | Content | Confirm from latest clean production workbook before module audit. |
| HRBA-OPEN-003 | Course platform implementation stack | Development | Confirm whether Google AI Studio, custom React/Vite, Parta, or another build route is used. |
| HRBA-OPEN-004 | Separate window/tab vs embedded focused player | UX/technical | Preserve focused-player behavior; decide implementation based on platform limits. |
| HRBA-OPEN-005 | LMS/progress persistence | Data | For prototype, local state is acceptable; later connect to real persistence. |
| HRBA-OPEN-006 | Certificate generation | Assessment | Confirm certificate engine; final test threshold should be 80%. |
| HRBA-OPEN-007 | Practical proof/portfolio pathway | Learning | Keep optional and separate from certificate unless later approved. |
| HRBA-OPEN-008 | Language/localization | Accessibility | Start in English; plan Amharic/local-language glossary support if needed. |
| HRBA-OPEN-009 | Video production vs transcript-first media | Assets | Use low-bandwidth transcript-first alternatives. |
| HRBA-OPEN-010 | Scenario depth per module | Storyboard | Decide during module audit; do not overuse branching scenarios. |
