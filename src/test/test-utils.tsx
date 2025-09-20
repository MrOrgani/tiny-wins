import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

// Psychology-focused test wrapper that includes common providers
const PsychologyTestProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="psychology-test-wrapper">
      {/* Add future providers here (theme, state management, etc.) */}
      {children}
    </div>
  );
};

// Custom render function that includes psychology-focused setup
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const user = userEvent.setup();

  return {
    user,
    ...render(ui, { wrapper: PsychologyTestProvider, ...options }),
  };
};

// Psychology-focused test helpers
const psychologyTestHelpers = {
  // Wait for celebration animations to complete
  waitForCelebration: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Standard celebration duration
  },

  // Simulate reduced motion preference
  mockReducedMotion: (enabled = true) => {
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
  },

  // Simulate touch interaction
  simulateTouch: async (element: HTMLElement, user: any) => {
    await user.pointer([
      { target: element, keys: '[TouchA>]' },
      { keys: '[/TouchA]' },
    ]);
  },

  // Check if element supports psychology-first patterns
  checkPsychologyCompliance: (element: HTMLElement) => {
    const aria =
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby');
    const hasAccessibleName = aria || element.textContent;
    const hasTouchFriendlySize =
      element.offsetWidth >= 48 && element.offsetHeight >= 48;
    const hasEncouragingText =
      element.textContent &&
      !/(fail|error|wrong|bad|broken)/i.test(element.textContent);

    return {
      hasAccessibleName: !!hasAccessibleName,
      hasTouchFriendlySize,
      hasEncouragingText,
      isCompliant:
        !!hasAccessibleName && hasTouchFriendlySize && hasEncouragingText,
    };
  },

  // Measure interaction timing (for psychology-critical responsiveness)
  measureInteractionTime: async (interaction: () => Promise<void>) => {
    const start = performance.now();
    await interaction();
    const end = performance.now();
    return end - start;
  },

  // Mock celebration animation
  mockCelebrationAnimation: () => {
    const originalAnimate = Element.prototype.animate;
    Element.prototype.animate = vi.fn().mockImplementation(() => ({
      finished: Promise.resolve(),
      cancel: vi.fn(),
      pause: vi.fn(),
      play: vi.fn(),
    }));

    return () => {
      Element.prototype.animate = originalAnimate;
    };
  },
};

// Export everything
export * from '@testing-library/react';
export { customRender as render };
export { userEvent };
export { psychologyTestHelpers };

// Also export the helpers individually for convenience
export const {
  waitForCelebration,
  mockReducedMotion,
  simulateTouch,
  checkPsychologyCompliance,
  measureInteractionTime,
  mockCelebrationAnimation,
} = psychologyTestHelpers;
