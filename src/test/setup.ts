/* eslint-disable */
import '@testing-library/jest-dom';
import { expect, afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock navigator.vibrate for haptic feedback tests
Object.defineProperty(navigator, 'vibrate', {
  writable: true,
  value: vi.fn(),
});

// Mock performance API for psychology-focused timing tests
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByName: vi.fn(() => []),
    getEntriesByType: vi.fn(() => []),
  },
});

// Psychology-focused test helpers
global.mockReducedMotion = (enabled: boolean = true) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return {
          matches: enabled,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        };
      }
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    }),
  });
};

global.mockHighContrast = (enabled: boolean = true) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => {
      if (query === '(prefers-contrast: high)') {
        return {
          matches: enabled,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        };
      }
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    }),
  });
};

// Custom matchers for psychology-focused testing
expect.extend({
  toBeEncouraging(received: string) {
    const discouragingWords = [
      'incomplete',
      'needs-attention',
      'requires-improvement',
      'alternative',
      'opportunity',
      'attention',
      'reconsider',
    ];
    const containsDiscouraingLanguage = discouragingWords.some((word) =>
      received.toLowerCase().includes(word.toLowerCase())
    );

    return {
      message: () =>
        `Expected "${received}" ${this.isNot ? 'to contain' : 'not to contain'} discouraging language`,
      pass: !containsDiscouraingLanguage,
    };
  },

  toHaveTouchFriendlySize(received: HTMLElement) {
    // Check computed styles since getBoundingClientRect may not work in test env
    const styles = window.getComputedStyle(received);
    const minHeight = styles.minHeight;
    const minWidth = styles.minWidth;
    const height = styles.height;
    const width = styles.width;

    // Check for Tailwind classes that indicate proper sizing
    const hasMinHeightClass =
      received.className.includes('min-h-[56px]') ||
      received.className.includes('h-14') ||
      received.className.includes('h-12');
    const hasMinWidthClass =
      received.className.includes('min-w-[56px]') ||
      received.className.includes('w-full');

    const rect = received.getBoundingClientRect();
    const minSize = 48; // WCAG AA minimum touch target size

    // Pass if either dimensions are good OR if classes indicate proper sizing
    const isTouchFriendly =
      (rect.width >= minSize && rect.height >= minSize) ||
      (hasMinHeightClass && hasMinWidthClass);

    return {
      message: () =>
        `Expected element to have touch-friendly size (min ${minSize}px), but got ${rect.width}x${rect.height}`,
      pass: isTouchFriendly,
    };
  },

  toRespectMotionPreferences(received: HTMLElement) {
    const hasReducedMotionClass =
      received.classList.contains('motion-safe') ||
      received.classList.contains('motion-reduce') ||
      received.className.includes('motion-safe:') ||
      received.className.includes('motion-reduce:');
    const hasInlineStyles =
      received.style.animationDuration || received.style.transitionDuration;

    return {
      message: () =>
        `Expected element to respect motion preferences with appropriate classes or styles`,
      pass: hasReducedMotionClass || hasInlineStyles,
    };
  },

  toHaveFocus(received: HTMLElement) {
    const isFocused = document.activeElement === received;

    return {
      message: () =>
        `Expected element ${this.isNot ? 'not ' : ''}to have focus`,
      pass: isFocused,
    };
  },
});

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Global test environment setup
beforeEach(() => {
  // Reset motion preference mock
  global.mockReducedMotion(false);

  // Reset high contrast mock
  global.mockHighContrast(false);

  // Clear local storage
  localStorage.clear();

  // Clear session storage
  sessionStorage.clear();
});
