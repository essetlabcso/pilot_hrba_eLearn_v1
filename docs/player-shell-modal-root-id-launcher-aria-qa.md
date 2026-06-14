# Player Shell Modal Root ID and Launcher ARIA QA

## Branch

`system/hrba-clean-foundation`

## Source Readiness Note

`docs/player-shell-modal-root-id-launcher-aria-readiness.md`

## Implementation Scope

Slice 2 was implemented only for the scoped player shell modal launchers and dialogs:

- Glossary
- Resources
- Accessibility

No Menu drawer, HelpOverlay, Captions/transcript, CSS, token, routing, progress, assessment, certificate, accessibility toolbar behavior, course screen, module CSS, asset, content, or old HRBA file changes were included.

## Files Changed

- `src/components/player/GlossaryModal.tsx`
- `src/components/player/ResourcesModal.tsx`
- `src/components/player/AccessibilityModal.tsx`
- `src/components/player/PlayerSidebar.tsx`

## Root IDs Added

| Modal | Root ID added | Existing title ID preserved |
| --- | --- | --- |
| Glossary | `player-glossary-modal` | `glossary-modal-title` |
| Resources | `player-resources-modal` | `resources-modal-title` |
| Accessibility | `player-accessibility-modal` | `a11y-modal-title` |

Existing `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` semantics were preserved.

## Launcher ARIA Added

| Launcher | Added attributes | Dynamic accessible label |
| --- | --- | --- |
| Glossary | `aria-expanded`, conditional `aria-controls`, `aria-haspopup="dialog"` | `Open course glossary` / `Close course glossary` |
| Resources | `aria-expanded`, conditional `aria-controls`, `aria-haspopup="dialog"` | `Open resources list` / `Close resources list` |
| Accessibility | `aria-expanded`, conditional `aria-controls`, `aria-haspopup="dialog"` | `Open accessibility options` / `Close accessibility options` |

`aria-controls` is emitted only while the corresponding modal is mounted:

- Glossary: `activeModal === 'glossary' ? 'player-glossary-modal' : undefined`
- Resources: `activeModal === 'resources' ? 'player-resources-modal' : undefined`
- Accessibility: `activeModal === 'accessibility' ? 'player-accessibility-modal' : undefined`

No `aria-current` was added.

## Build Result

`npm run build` passed.

Observed warning:

- Existing Vite large-chunk warning after minification.

## Route and Viewport QA

Route checked:

`/module-2/screen-2-2?completed=module_01_hrba_foundations`

Viewports checked:

- Desktop: `1440x900`
- Tablet: `768x900`
- Mobile: `390x844`

## Per-Modal DOM and ARIA Checks

| Viewport | Modal | Closed state | Open state | Dialog semantics | Result |
| --- | --- | --- | --- | --- | --- |
| `1440x900` | Glossary | `aria-expanded="false"`, no `aria-controls`, `aria-haspopup="dialog"` | `aria-expanded="true"`, `aria-controls="player-glossary-modal"` | `role="dialog"`, `aria-modal="true"`, `aria-labelledby="glossary-modal-title"` | Pass |
| `1440x900` | Resources | `aria-expanded="false"`, no `aria-controls`, `aria-haspopup="dialog"` | `aria-expanded="true"`, `aria-controls="player-resources-modal"` | `role="dialog"`, `aria-modal="true"`, `aria-labelledby="resources-modal-title"` | Pass |
| `1440x900` | Accessibility | `aria-expanded="false"`, no `aria-controls`, `aria-haspopup="dialog"` | `aria-expanded="true"`, `aria-controls="player-accessibility-modal"` | `role="dialog"`, `aria-modal="true"`, `aria-labelledby="a11y-modal-title"` | Pass |
| `768x900` | Glossary | `aria-expanded="false"`, no `aria-controls`, `aria-haspopup="dialog"` | `aria-expanded="true"`, `aria-controls="player-glossary-modal"` | Existing dialog semantics preserved | Pass |
| `768x900` | Resources | `aria-expanded="false"`, no `aria-controls`, `aria-haspopup="dialog"` | `aria-expanded="true"`, `aria-controls="player-resources-modal"` | Existing dialog semantics preserved | Pass |
| `768x900` | Accessibility | `aria-expanded="false"`, no `aria-controls`, `aria-haspopup="dialog"` | `aria-expanded="true"`, `aria-controls="player-accessibility-modal"` | Existing dialog semantics preserved | Pass |
| `390x844` | Glossary | `aria-expanded="false"`, no `aria-controls`, `aria-haspopup="dialog"` | `aria-expanded="true"`, `aria-controls="player-glossary-modal"` | Existing dialog semantics preserved | Pass |
| `390x844` | Resources | `aria-expanded="false"`, no `aria-controls`, `aria-haspopup="dialog"` | `aria-expanded="true"`, `aria-controls="player-resources-modal"` | Existing dialog semantics preserved | Pass |
| `390x844` | Accessibility | `aria-expanded="false"`, no `aria-controls`, `aria-haspopup="dialog"` | `aria-expanded="true"`, `aria-controls="player-accessibility-modal"` | Existing dialog semantics preserved | Pass |

## Slice 1 Focus Regression Checks

| Viewport | Modal | Initial focus on open | `Shift+Tab` containment | `Tab` containment | Escape close | Close icon | Footer close | Outside click | Focus return | Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `1440x900` | Glossary | `Close glossary` | `Close Glossary` | `Close glossary` | Pass | Pass | Pass | Pass | Launcher | Pass |
| `1440x900` | Resources | `Close resources` | `Close Resources` | `Close resources` | Pass | Pass | Pass | Pass | Launcher | Pass |
| `1440x900` | Accessibility | `Close modal` | `Close Settings` | `Close modal` | Pass | Pass | Pass | Pass | Launcher | Pass |
| `768x900` | Glossary | `Close glossary` | `Close Glossary` | `Close glossary` | Pass | Pass | Pass | Pass | Launcher | Pass |
| `768x900` | Resources | `Close resources` | `Close Resources` | `Close resources` | Pass | Pass | Pass | Pass | Launcher | Pass |
| `768x900` | Accessibility | `Close modal` | `Close Settings` | `Close modal` | Pass | Pass | Pass | Pass | Launcher | Pass |
| `390x844` | Glossary | `Close glossary` | `Close Glossary` | `Close glossary` | Pass | Pass | Pass | Pass | Launcher | Pass |
| `390x844` | Resources | `Close resources` | `Close Resources` | `Close resources` | Pass | Pass | Pass | Pass | Launcher | Pass |
| `390x844` | Accessibility | `Close modal` | `Close Settings` | `Close modal` | Pass | Pass | Pass | Pass | Launcher | Pass |

No shell-caused horizontal overflow was observed during the checked states.

## Guardrail Confirmation

- CSS files were not changed.
- Token files were not changed.
- Menu drawer was not changed.
- HelpOverlay was not changed.
- Captions/transcript was not changed.
- Resources placeholder download behavior was not changed.
- Routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, and old HRBA files were not changed.
- Phase D CSS remains blocked.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Did the implementation stay limited to Glossary, Resources, and Accessibility? | Yes |
| Did all root IDs match launcher `aria-controls` when open? | Yes |
| Was `aria-controls` omitted while each modal was unmounted? | Yes |
| Did Slice 1 focus containment and focus return still pass? | Yes |
| Were CSS and token files untouched? | Yes |
| Were Menu drawer, HelpOverlay, and Captions/transcript untouched? | Yes |
| Is it safe to move to an independent Slice 2 evaluation task? | Yes |
| Does Phase D CSS remain blocked? | Yes |

## Recommendation

PASS. The bounded Slice 2 implementation is ready for independent Slice 2 evaluation. Phase D CSS and broader state migration remain blocked.
