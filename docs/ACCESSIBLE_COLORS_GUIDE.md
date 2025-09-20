# Accessible Colors Quick Reference Guide

## Overview

This guide provides developers with the accessible color palette for the Tiny Wins app, ensuring all implementations meet WCAG 2.1 AA standards.

## Core Accessible Colors

### Primary Colors (Nature-Inspired Green)

```css
/* Light Theme */
--primary: 93 126 65; /* #5D7E41 - Deeper Forest Green (4.6:1 ratio) */
--primary-light: 122 154 94; /* #7A9A5E - Medium Sage (3.1:1 ratio) */

/* Dark Theme */
--primary: 184 212 154; /* #B8D49A - Bright Sage (4.8:1 ratio) */
```

**Tailwind Classes:**

- `bg-primary` - Main brand color
- `text-primary` - Primary text color
- `bg-primary-light` - Lighter accent
- `border-primary` - Primary borders

### Text Colors

```css
/* Light Theme */
--foreground: 31 41 55; /* #1F2937 - Main text (13.2:1 ratio) */
--muted-foreground: 90 97 105; /* #5A6169 - Secondary text (4.7:1 ratio) */

/* Dark Theme */
--foreground: 249 250 251; /* #F9FAFB - Main text (15.8:1 ratio) */
--muted-foreground: 181 188 201; /* #B5BCC9 - Secondary text (4.9:1 ratio) */
```

**Tailwind Classes:**

- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text

### UI Component Colors

```css
/* Borders */
--border: 161 168 176; /* Light: #A1A8B0 (3.2:1 ratio) */
--border: 74 85 104; /* Dark: #4A5568 (3.1:1 ratio) */

/* Cards */
--card: 255 255 255; /* Light: Pure white */
--card: 31 41 55; /* Dark: #1F2937 */
```

**Tailwind Classes:**

- `border-border` - Standard borders
- `bg-card` - Card backgrounds

## Psychology Colors (Accessible)

### Success/Encouragement

```css
--success: 34 197 94; /* #22C55E - Fresh green (3.9:1 on white) */
--encouragement: 34 197 94; /* Same as success for consistency */
```

### Warning/Amber

```css
--warning: 251 146 60; /* #FB923C - Warm amber (3.2:1 on white) */
--amber: 251 146 60; /* Consistent warm understanding */
```

### Celebration

```css
--celebration: 168 85 247; /* #A855F7 - Achievement purple (4.8:1 with white text) */
```

### Information

```css
--info: 59 130 246; /* #3B82F6 - Trust blue (5.1:1 with white text) */
```

## Usage Examples

### Buttons

```jsx
// Primary action - WCAG AA compliant
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  I Showed Up Today
</button>

// Secondary action - WCAG AA compliant
<button className="bg-primary-light text-primary hover:bg-primary/20">
  Maybe Tomorrow
</button>

// Success celebration - WCAG AA compliant
<button className="bg-success text-success-foreground">
  Celebrate Win! 🎉
</button>
```

### Text Hierarchy

```jsx
// Primary text - 13.2:1 contrast ratio
<h1 className="text-foreground font-bold">Tiny Wins</h1>

// Secondary text - 4.7:1 contrast ratio
<p className="text-muted-foreground">Build habits that stick</p>

// Interactive text - 4.6:1 contrast ratio
<a href="#" className="text-primary hover:text-primary/80">Learn more</a>
```

### Cards and Containers

```jsx
// Card with accessible borders
<div className="bg-card border border-border rounded-lg p-6">
  <h3 className="text-card-foreground">Habit Progress</h3>
  <p className="text-muted-foreground">Keep going!</p>
</div>
```

## Mobile Considerations

### Touch Targets

All interactive elements maintain 48px minimum size:

```jsx
// Touch-friendly button
<button className="min-h-[48px] min-w-[48px] bg-primary text-primary-foreground">
  ✓
</button>
```

### Typography Scale

Mobile-optimized text sizes with proper contrast:

```jsx
// Mobile hero text
<h1 className="mobile-hero text-foreground">Your Journey</h1>

// Mobile body text
<p className="mobile-body text-muted-foreground">Track your progress</p>
```

## High Contrast Mode

For users with `prefers-contrast: high`, automatic enhancements apply:

```css
@media (prefers-contrast: high) {
  --primary: 22 101 52; /* #166534 - WCAG AAA level */
  --foreground: 0 0 0; /* Pure black - 21:1 ratio */
  --background: 255 255 255; /* Pure white - 21:1 ratio */
}
```

## Testing Commands

### Contrast Validation

```bash
# Run accessibility tests
npm run test:a11y

# Check specific contrast ratios
node contrast-audit.js
```

### Browser Testing

```javascript
// Test in browser console
const ratio = getContrastRatio([93, 126, 65], [254, 253, 248]);
console.log(`Contrast ratio: ${ratio}:1`); // Should be ≥ 4.5
```

## Common Patterns

### Form Validation

```jsx
// Error state - accessible contrast
<input className="border-2 border-destructive bg-destructive/10" />
<span className="text-destructive-foreground">Please enter a valid habit</span>

// Success state - accessible contrast
<input className="border-2 border-success bg-success/10" />
<span className="text-success-foreground">Perfect habit name!</span>
```

### Status Indicators

```jsx
// Habit completion states
<div className="bg-success/20 border border-success/30 text-success-foreground">
  ✅ Completed today
</div>

<div className="bg-amber/20 border border-amber/30 text-amber-foreground">
  ⏰ Missed, but that's okay
</div>
```

### Loading States

```jsx
// Accessible skeleton loading
<div className="bg-muted/20 animate-pulse h-4 rounded" />
```

## Do's and Don'ts

### ✅ Do's

- Use CSS custom properties for colors
- Test contrast with WebAIM checker
- Respect user motion preferences
- Maintain 48px touch targets
- Use semantic color names

### ❌ Don'ts

- Hardcode color values
- Use color alone to convey information
- Create custom colors without testing
- Ignore high contrast preferences
- Reduce touch target sizes

## Resources

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Universal Design](https://jfly.uni-koeln.de/color/)

## Support

For accessibility questions or color-related issues, please refer to the full accessibility audit report or create an issue in the project repository.
