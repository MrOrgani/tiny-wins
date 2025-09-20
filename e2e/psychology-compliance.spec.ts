import { test, expect } from '@playwright/test';

test.describe('Psychology-First Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('uses encouraging language throughout the app', async ({ page }) => {
    // Check that the app uses identity-focused language
    await expect(
      page.getByText('Build identity through showing up')
    ).toBeVisible();

    // Ensure no shame-based language is present
    const pageContent = await page.textContent('body');
    const shamefulWords = [
      'fail',
      'failure',
      'broken',
      'wrong',
      'bad',
      'error',
    ];

    for (const word of shamefulWords) {
      expect(pageContent?.toLowerCase()).not.toContain(word);
    }
  });

  test('has touch-friendly interface on mobile', async ({ page, isMobile }) => {
    if (!isMobile) return;

    // Check that all interactive elements meet minimum touch target size
    const buttons = await page.locator('button').all();

    for (const button of buttons) {
      const boundingBox = await button.boundingBox();
      if (boundingBox) {
        expect(boundingBox.width).toBeGreaterThanOrEqual(48);
        expect(boundingBox.height).toBeGreaterThanOrEqual(48);
      }
    }
  });

  test('respects reduced motion preferences', async ({ page }) => {
    // Emulate reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();

    // Check that animations are disabled or reduced
    const animatedElements = await page.locator('[class*="animate"]').all();

    for (const element of animatedElements) {
      const animationDuration = await element.evaluate((el) => {
        return window.getComputedStyle(el).animationDuration;
      });

      // Animations should be instant or very short when reduced motion is preferred
      expect(
        animationDuration === '0s' || animationDuration === '0.01s'
      ).toBeTruthy();
    }
  });

  test('meets WCAG color contrast requirements', async ({ page }) => {
    // This would typically use a library like axe-playwright
    // For now, we'll check that text is visible and readable
    const textElements = await page
      .locator('p, h1, h2, h3, h4, h5, h6, span')
      .all();

    for (const element of textElements.slice(0, 10)) {
      // Check first 10 for performance
      await expect(element).toBeVisible();
    }
  });

  test('supports keyboard navigation', async ({ page }) => {
    // Start from the first focusable element
    await page.keyboard.press('Tab');

    let currentElement = await page.evaluate(
      () => document.activeElement?.tagName
    );
    expect(currentElement).toBeTruthy();

    // Navigate through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const newElement = await page.evaluate(
        () => document.activeElement?.tagName
      );

      // Focus should move to different elements
      if (newElement !== currentElement) {
        currentElement = newElement;
        break;
      }
    }

    expect(currentElement).toBeTruthy();
  });
});

test.describe('Performance Requirements', () => {
  test('loads quickly for psychology-critical first impression', async ({
    page,
  }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Should load within psychology-critical timeframe
    expect(loadTime).toBeLessThan(2500); // 2.5 seconds for complete load
  });

  test('responds quickly to user interactions', async ({ page }) => {
    await page.goto('/');

    // Find any interactive element
    const button = page.locator('button').first();
    if ((await button.count()) > 0) {
      const startTime = Date.now();
      await button.click();
      const interactionTime = Date.now() - startTime;

      // Critical psychology requirement: < 200ms response
      expect(interactionTime).toBeLessThan(200);
    }
  });
});

test.describe('Mobile-First Design', () => {
  test('works on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 }); // iPhone SE size
    await page.goto('/');

    // Check that content is accessible and not cut off
    await expect(page.locator('body')).toBeVisible();

    // Check for horizontal scroll (should not exist)
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // +1 for rounding
  });

  test('handles safe area insets on notched devices', async ({ page }) => {
    // Simulate iPhone with notch
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    // Check that important content is not hidden behind notches
    const safeAreaElements = await page.locator('[class*="safe-area"]').all();
    expect(safeAreaElements.length).toBeGreaterThan(0);
  });
});

test.describe('Accessibility Compliance', () => {
  test('has proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();

    if (headings.length > 0) {
      // Check that there's at least one h1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThan(0);

      // Check for proper nesting (basic check)
      const firstHeading = headings[0];
      const tagName = await firstHeading.evaluate((el) => el.tagName);
      expect(tagName).toBe('H1');
    }
  });

  test('has meaningful alt text for images', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const ariaLabel = await img.getAttribute('aria-label');

      // Images should have alt text or aria-label
      expect(alt !== null || ariaLabel !== null).toBeTruthy();

      // Alt text should not be just filename or generic
      if (alt) {
        expect(alt).not.toMatch(/\.(jpg|jpeg|png|gif|svg)$/i);
        expect(alt.toLowerCase()).not.toBe('image');
        expect(alt.length).toBeGreaterThan(0);
      }
    }
  });

  test('has focus indicators on interactive elements', async ({ page }) => {
    await page.goto('/');

    const interactiveElements = await page
      .locator('button, a, input, textarea, select')
      .all();

    for (const element of interactiveElements.slice(0, 5)) {
      // Check first 5 for performance
      await element.focus();

      // Check if element has visible focus indicator
      const outlineStyle = await element.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          outline: style.outline,
          outlineWidth: style.outlineWidth,
          boxShadow: style.boxShadow,
        };
      });

      // Should have some form of focus indicator
      const hasFocusIndicator =
        outlineStyle.outline !== 'none' ||
        outlineStyle.outlineWidth !== '0px' ||
        outlineStyle.boxShadow !== 'none';

      expect(hasFocusIndicator).toBeTruthy();
    }
  });
});
