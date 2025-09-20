/* eslint-disable */
/// <reference types="vitest" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with custom psychology-focused matchers
declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {
    toBeEncouraging(): T;
    toHaveTouchFriendlySize(): T;
    toRespectMotionPreferences(): T;
  }

  interface AsymmetricMatchersContaining {
    toBeEncouraging(): any;
    toHaveTouchFriendlySize(): any;
    toRespectMotionPreferences(): any;
  }
}

// Global test helpers
declare global {
  function mockReducedMotion(enabled?: boolean): void;
  function mockHighContrast(enabled?: boolean): void;
}
