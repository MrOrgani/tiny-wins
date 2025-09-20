/* eslint-disable */
/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with custom psychology-focused matchers
declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {
    toBeEncouraging(): T;
    toHaveTouchFriendlySize(): T;
    toRespectMotionPreferences(): T;
    toHaveFocus(): T;
  }

  interface AsymmetricMatchersContaining {
    toBeEncouraging(): any;
    toHaveTouchFriendlySize(): any;
    toRespectMotionPreferences(): any;
    toHaveFocus(): any;
  }
}

// Global test helpers
declare global {
  function mockReducedMotion(_enabled?: boolean): void;
  function mockHighContrast(_enabled?: boolean): void;
}
