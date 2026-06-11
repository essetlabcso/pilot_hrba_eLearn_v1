# 08_ACCESSIBILITY_AND_USABILITY_SPEC.md
# Accessibility and Usability Specification

## Core principle

Preserve visual fidelity while ensuring the prototype is readable, navigable, keyboard-accessible, and understandable.

## Scope

Desktop landscape fidelity is the first priority. Mobile responsiveness is secondary and must not redesign the interface.

## Keyboard access

All interactive controls must be keyboard-accessible: platform buttons, links, module tiles, manual launch links, Start, Previous/Next, toolbar buttons, Help OK, Accessibility, modal X, plus buttons, cards, links, speech bubbles, timeline nodes, radio options, Check your answer, Send your answer, Continue, Back to start, Review the quiz, summary tabs, and Exit.

## Focus behavior

Every focusable element must show a visible focus state. Modals must trap focus and return focus to the triggering element after close.

## Semantics

Use button semantics for buttons, link semantics for links, radio groups for quiz options, and dialog semantics for modals. Slide counters must be accessible text.

## Color and contrast

Maintain readable contrast for white on dark blue, dark text on pale blue/peach/green, and blue links. Correct/incorrect feedback must use both color and icon.

## Toolbar usability

Toolbar labels must remain visible and in exact order. Captions state must visibly change to **Hide captions**. Audio state may change to **Sound on**.

## Modal usability

Modals must have clear title, close X, readable content, and dimmed background. Long modals may scroll while keeping close/continue controls accessible.

## Quiz usability

Radio options must allow only one selected answer. Label text must be clickable. Submit/check buttons must trigger only specified feedback/solution/next states.

## Pending content usability

Pending states must not look broken. They must preserve shell/context and display **Pending source content** clearly.

## Resource view usability

Resource views must provide a return/back option and must not invent missing document content.

## Final rule

Accessibility improvements support the specified interface; they must not redesign it.
