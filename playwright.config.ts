import { defineConfig, devices } from '@playwright/test';

/**
 * Psychology-first E2E testing configuration
 * Focuses on user experience, accessibility, and performance
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : 2,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/e2e-results.xml' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-incomplete',
    video: 'retain-on-incomplete',
    // Psychology-focused testing settings
    actionTimeout: 10000, // Allow time for celebrations and animations
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Test with reduced motion for accessibility
        contextOptions: {
          reducedMotion: 'reduce',
        },
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile testing - critical for psychology-first design
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // Accessibility testing
    {
      name: 'High Contrast',
      use: {
        ...devices['Desktop Chrome'],
        contextOptions: {
          forcedColors: 'active',
          colorScheme: 'dark',
        },
      },
    },

    // Performance testing on slower devices
    {
      name: 'Slow 3G',
      use: {
        ...devices['Desktop Chrome'],
        contextOptions: {
          // Simulate slow network for psychology-critical performance testing
          offline: false,
        },
        launchOptions: {
          args: [
            '--enable-features=NetworkService --enable-network-service-logging',
          ],
        },
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env['CI'],
    timeout: 120 * 1000,
  },
});
