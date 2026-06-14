# Player Shell Modal Root ID and Launcher ARIA Readiness

## 1. Purpose

This documentation-only readiness note prepares Slice 2 from `docs/player-shell-modal-drawer-behavior-implementation-spec.md`: stable modal root IDs and launcher ARIA preparation for the player shell Glossary, Resources, and Accessibility modals.

This note does not implement React, ARIA, CSS, tokens, root IDs, focus behavior, modal behavior, routing, progress logic, assessment logic, certificate logic, accessibility toolbar behavior, content, assets, course screens, module CSS, or old HRBA course files.

## 2. Scope

In scope:

- Glossary modal
- Resources modal
- Accessibility modal

Out of scope:

- Menu drawer
- HelpOverlay
- Captions/transcript
- current-state CSS
- token work
- route, progress, assessment, or certificate logic
- accessibility toolbar behavior
- course screens, module CSS, assets, content files, and old HRBA files
- active/current CSS, selected/current icon CSS, disabled, completed, locked, danger, progress strip, shell shadow, global focus, course-screen states, and module-specific states

## 3. Current Readiness After Slice 1

`docs/player-shell-modal-focus-return-containment-qa.md` confirms that Glossary, Resources, and Accessibility now have:

- focus movement into the modal on open;
- focus containment with `Tab` and `Shift+Tab`;
- Escape close;
- close icon close;
- footer close button close;
- outside-click close;
- focus return to the launching sidebar button;
- desktop, tablet, and mobile route QA on `/module-2/screen-2-2?completed=module_01_hrba_foundations`.

Remaining Slice 2 gaps before launcher ARIA can be implemented:

- stable modal root IDs;
- launcher `aria-expanded`;
- launcher `aria-controls`;
- launcher `aria-haspopup="dialog"`;
- dynamic launcher labels if the future implementation chooses to expose open/close state through the accessible name.

## 4. Proposed Stable Modal Root IDs

| Modal | Proposed future root ID | Existing title ID to preserve | Readiness |
| --- | --- | --- | --- |
| Glossary | `player-glossary-modal` | `glossary-modal-title` | Ready for bounded implementation after review |
| Resources | `player-resources-modal` | `resources-modal-title` | Ready for bounded implementation after review |
| Accessibility | `player-accessibility-modal` | `a11y-modal-title` | Ready with caution after review |

The existing title IDs should remain unchanged because current dialog labels already reference them through `aria-labelledby`.

## 5. Launcher ARIA Preparation

| Launcher | Current accessible name | Future candidate `aria-expanded` | Future candidate `aria-controls` | Future candidate `aria-haspopup` | Future dynamic label pattern |
| --- | --- | --- | --- | --- | --- |
| Glossary sidebar button | `Open course glossary` | `activeModal === 'glossary'` | `activeModal === 'glossary' ? 'player-glossary-modal' : undefined` | `dialog` | `Open course glossary` / `Close course glossary` |
| Resources sidebar button | `Open resources list` | `activeModal === 'resources'` | `activeModal === 'resources' ? 'player-resources-modal' : undefined` | `dialog` | `Open resources list` / `Close resources list` |
| Accessibility sidebar button | `Open accessibility options` | `activeModal === 'accessibility'` | `activeModal === 'accessibility' ? 'player-accessibility-modal' : undefined` | `dialog` | `Open accessibility options` / `Close accessibility options` |

These attributes are candidates for a future bounded implementation only. They are not implemented by this note.

## 6. Conditional `aria-controls` Decision

The scoped modals are currently conditionally rendered in `CoursePlayerShell` with checks against `state.activeModal`.

Recommended future approach:

- use `aria-expanded` on each scoped launcher at all times;
- use `aria-controls` only while the corresponding modal is mounted;
- follow the existing Captions/transcript pattern, where `aria-controls` is omitted while the controlled panel is unmounted;
- avoid referencing an unmounted controlled element unless a future task intentionally keeps these modals mounted while hidden.

Reasoning:

- conditional `aria-controls` avoids stale references to DOM nodes that do not exist while a modal is hidden;
- it matches the current conditional rendering model;
- it avoids changing rendering behavior just to support ARIA;
- it keeps Slice 2 bounded to IDs and launcher attributes.

## 7. Accessibility Modal Caution

The Accessibility modal supports accessibility and safe-learning guidance. Its launcher ARIA should be verified with extra care so the accessibility support surface remains predictable.

Future implementation must not:

- change accessibility guidance content;
- change accessibility toolbar behavior;
- change focus containment or focus return behavior from Slice 1;
- change global accessibility settings behavior;
- use launcher ARIA as a reason to start modal styling, token, or toolbar migration.

## 8. Implementation Readiness Classification

| Modal | Classification | Reason |
| --- | --- | --- |
| Glossary | Ready for bounded root ID and launcher ARIA implementation | Slice 1 focus behavior passed QA; stable root ID can map directly to existing conditional modal rendering. |
| Resources | Ready for bounded root ID and launcher ARIA implementation | Slice 1 focus behavior passed QA; resource buttons remain inside the dialog and should not alter launcher ARIA. |
| Accessibility | Ready with caution | Slice 1 focus behavior passed QA, but this modal supports accessibility guidance and requires extra QA to confirm no accessibility toolbar or support behavior is disrupted. |

No scoped modal is blocked for the proposed Slice 2 readiness path, provided the future task remains limited to root IDs and launcher ARIA.

## 9. Future Implementation Slice Recommendation

Recommended smallest future implementation slice:

- add stable modal root IDs to Glossary, Resources, and Accessibility modal roots;
- add bounded launcher ARIA to those three sidebar buttons only;
- use `aria-expanded` based on `activeModal`;
- use conditional `aria-controls` only while the matching modal is mounted;
- add `aria-haspopup="dialog"` for the three scoped modal launchers;
- consider dynamic open/close launcher labels only if the implementation can remain bounded and QA confirms no confusion.

The future implementation must not include:

- CSS;
- token changes;
- Menu drawer;
- HelpOverlay;
- Captions/transcript changes;
- modal behavior changes beyond attributes and IDs;
- current-state CSS;
- routing, progress, assessment, certificate, accessibility toolbar, asset, content, course screen, module CSS, or old HRBA file changes.

## 10. QA Plan for Future Slice 2 Implementation

Future Slice 2 implementation QA should include:

- `npm run build`;
- route QA on `/module-2/screen-2-2?completed=module_01_hrba_foundations`;
- desktop, tablet, and mobile checks;
- keyboard open/close checks for all three scoped launchers;
- DOM checks that modal root IDs exist only when corresponding modals are mounted;
- DOM checks for `aria-expanded="true"` and `aria-expanded="false"`;
- DOM checks for conditional `aria-controls`;
- DOM checks for `aria-haspopup="dialog"`;
- confirmation that Slice 1 focus containment and focus return still pass;
- confirmation that no CSS, token, Menu drawer, HelpOverlay, Captions/transcript, routing, progress, assessment, certificate, accessibility toolbar, content, asset, course screen, module CSS, or old HRBA file changed.

## 11. Stop Conditions

Future work must stop if:

- stable modal root IDs conflict with existing IDs;
- `aria-controls` would reference an unmounted element while hidden without an explicit conditional strategy;
- launcher ARIA requires changing modal rendering behavior;
- implementation would touch CSS, token files, Menu drawer, HelpOverlay, Captions/transcript, routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, course screens, module CSS, or old HRBA files;
- current-state CSS is proposed;
- the implementation would change Slice 1 focus behavior.

## 12. Recommendation

A future Slice 2 implementation task is ready if it remains bounded to stable modal root IDs and launcher ARIA for Glossary, Resources, and Accessibility only.

Allowed implementation files for that future task should be limited to:

- `src/components/player/GlossaryModal.tsx`
- `src/components/player/ResourcesModal.tsx`
- `src/components/player/AccessibilityModal.tsx`
- `src/components/player/PlayerSidebar.tsx`

`src/components/player/CoursePlayerShell.tsx` should remain read-only unless the future implementation proves that conditional mounting or ID wiring cannot be completed without a narrowly scoped shell change.

Phase D CSS remains blocked.
