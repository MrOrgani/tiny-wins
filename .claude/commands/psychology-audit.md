# Psychology Audit Commands

Automated checks to ensure psychology-first development principles.

## Run Complete Psychology Audit

```bash
npm run psychology-check
```

This runs:

- Language pattern analysis
- Accessibility compliance check
- Animation respect for motion preferences
- Mobile-first design validation
- Performance benchmarks for psychology-critical interactions

## Individual Audit Commands

### Language Pattern Analysis

Check for shame-based language in code:

```bash
npm run audit:language
```

Searches for and flags:

- Shame-based terms (fail, broken, error, wrong, bad)
- Negative identity language
- Discouraging messaging patterns

### Accessibility Audit

Comprehensive accessibility check:

```bash
npm run a11y:check
```

Validates:

- WCAG 2.1 AA compliance
- Keyboard navigation patterns
- Screen reader compatibility
- Color contrast ratios
- Touch target sizes (minimum 48px)

### Animation Audit

Check motion sensitivity compliance:

```bash
npm run audit:motion
```

Ensures:

- Respect for `prefers-reduced-motion`
- Gentle, non-jarring animations
- Celebration animations are opt-in
- No seizure-inducing patterns

### Performance Audit

Psychology-critical performance checks:

```bash
npm run audit:performance
```

Measures:

- Habit check-in response time (< 200ms target)
- Celebration animation start time (< 100ms)
- Daily flow completion time (< 10s total)
- Core Web Vitals compliance

## Fixing Common Issues

### Shame-Based Language

**Problem**: Using discouraging language in UI or code

```typescript
// ❌ Avoid
const errorMessage = 'You failed to complete this task';
const isBroken = checkStatus();

// ✅ Use instead
const encouragementMessage = 'Ready to try again?';
const needsAttention = checkStatus();
```

### Accessibility Issues

**Problem**: Missing accessibility features

```typescript
// ❌ Avoid
<button onClick={handleClick}>Click me</button>

// ✅ Use instead
<button
  onClick={handleClick}
  aria-label="Mark habit as completed"
  className="touch-friendly"
>
  I Showed Up!
</button>
```

### Motion Sensitivity

**Problem**: Forced animations without user preference check

```typescript
// ❌ Avoid
<motion.div animate={{ scale: [1, 1.2, 1] }} />

// ✅ Use instead
<motion.div
  animate={!prefersReducedMotion() ? { scale: [1, 1.2, 1] } : {}}
/>
```

### Non-Mobile-First Design

**Problem**: Desktop-first responsive design

```css
/* ❌ Avoid */
.component {
  padding: 2rem;
}
@media (max-width: 768px) {
  .component {
    padding: 1rem;
  }
}

/* ✅ Use instead */
.component {
  padding: 1rem;
}
@media (min-width: 768px) {
  .component {
    padding: 2rem;
  }
}
```

## Psychology Compliance Checklist

For each new feature, verify:

### 🎯 Psychology Principles

- [ ] Uses encouraging, identity-focused language
- [ ] Celebrates showing up over completion
- [ ] Provides "life happened" alternatives
- [ ] Reinforces positive identity transformation

### ♿ Accessibility

- [ ] Keyboard navigation works completely
- [ ] Screen reader announcements are clear
- [ ] Color contrast meets WCAG AA standards
- [ ] Touch targets are minimum 48px

### 📱 Mobile-First

- [ ] Design works on 320px width screens
- [ ] Touch interactions are thumb-friendly
- [ ] Safe area insets are handled
- [ ] Horizontal scrolling is avoided

### ⚡ Performance

- [ ] Habit interactions respond < 200ms
- [ ] Animations start < 100ms
- [ ] Bundle size impact is minimal
- [ ] Loading states are encouraging

### 🎨 Visual Design

- [ ] Uses psychology-informed color palette
- [ ] No red/shame colors anywhere
- [ ] Consistent with design system
- [ ] Celebrates progress visually

## Automated Checks Integration

These checks run automatically:

- **Pre-commit**: Language and basic accessibility
- **Pre-push**: Full test suite and performance benchmarks
- **CI/CD**: Complete psychology audit and accessibility testing
- **Pull Request**: Psychology compliance review and user flow validation

## Custom ESLint Rules

The project includes custom rules for psychology compliance:

### no-shame-language

Prevents shame-based terms in code and comments.

### require-celebration

Warns when success states lack celebration features.

### touch-friendly-sizing

Ensures interactive elements meet minimum touch targets.

### motion-sensitivity

Requires motion preference checks for animations.
