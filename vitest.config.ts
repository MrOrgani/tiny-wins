/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: [
      'node_modules/**',
      'dist/**',
      '.next/**',
      'coverage/**',
      'e2e/**',
    ],
    globals: true,
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'src/test/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/.next/**',
        '**/dist/**',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    // Psychology-focused testing configuration
    testTimeout: 10000, // Allow time for animations and user interactions
    hookTimeout: 10000,
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
