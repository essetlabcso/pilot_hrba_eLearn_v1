import { useEffect } from 'react';
import type { RefObject } from 'react';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

const playerFocusFallbackSelector =
  '.player-sidebar-button, .player-header-button, .player-sidebar-return';

function focusElement(element: Element | null | undefined) {
  if (!(element instanceof HTMLElement)) {
    return false;
  }

  element.focus();
  return document.activeElement === element;
}

export function useModalFocusContainment<
  TModal extends HTMLElement,
  TInitialFocus extends HTMLElement
>(
  modalRef: RefObject<TModal | null>,
  initialFocusRef: RefObject<TInitialFocus | null>,
  onClose: () => void
) {
  useEffect(() => {
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const modalElement = modalRef.current;

    window.setTimeout(() => {
      if (!focusElement(initialFocusRef.current)) {
        focusElement(modalElement);
      }
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !modalElement) {
        return;
      }

      const focusableElements = Array.from(
        modalElement.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((element) => !element.hasAttribute('disabled'));

      if (focusableElements.length === 0) {
        event.preventDefault();
        focusElement(modalElement);
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
        return;
      }

      if (!modalElement.contains(activeElement)) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      window.setTimeout(() => {
        if (
          previouslyFocusedElement &&
          document.contains(previouslyFocusedElement) &&
          focusElement(previouslyFocusedElement)
        ) {
          return;
        }

        focusElement(document.querySelector(playerFocusFallbackSelector));
      }, 0);
    };
  }, [initialFocusRef, modalRef, onClose]);
}
