# Contributing to Tiny Wins

Thank you for your interest in contributing to Tiny Wins! This project is built on psychology-first principles, and every contribution helps create technology that genuinely serves human psychological needs.

## 🧠 Psychology-First Development Principles

Before contributing, please understand our core principles:

### 1. No Shame-Based Language

We never use language that could make someone feel bad about themselves:

- ❌ **Avoid**: "failed", "broken", "error", "wrong", "bad", "mistake"
- ✅ **Use instead**: "incomplete", "needs attention", "in progress", "alternative", "opportunity to improve"

### 2. Celebration Over Completion

We emphasize the journey and identity transformation:

- Focus on "showing up" rather than "completion"
- Every success state must include celebration
- Progress is more important than perfection

### 3. Identity Amplification

We consistently reinforce the user's evolving identity:

- "You're becoming someone who..." language patterns
- Present tense affirmations
- Personal transformation vocabulary

### 4. Inclusive and Accessible by Default

Every feature must be accessible to all users:

- WCAG 2.1 AA compliance minimum
- Keyboard navigation for all interactions
- Screen reader compatibility
- Touch-friendly design (48px minimum targets)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+
- Git
- VS Code (recommended)

### Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd tiny-wins

# Setup development environment
npm run setup

# Start development server
npm run dev

# Run psychology compliance check
npm run psychology-check
```

### Recommended VS Code Extensions

Our `.vscode/extensions.json` includes recommended extensions. Install them for the best development experience:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Accessibility Linter
- GitLens

## 📝 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/encouraging-feature-name
```

Use encouraging, identity-focused branch names:

- ✅ `feature/celebrate-daily-progress`
- ✅ `enhance/identity-reinforcement`
- ✅ `improve/accessibility-navigation`
- ❌ `fix/broken-button`
- ❌ `bugfix/failed-login`

### 2. Follow Psychology-First Coding Standards

#### Variable and Function Naming

```typescript
// ✅ Psychology-first naming
const celebrateProgress = () => {};
const encouragingMessage = "You're making great progress!";
const isReadyToProgress = checkReadiness();
const showingUpStreak = calculateConsistency();

// ❌ Avoid shame-based naming
const handleFailure = () => {};
const errorMessage = 'Something went wrong';
const isBroken = checkStatus();
const failedAttempts = countMistakes();
```

#### Component Development

```typescript
// ✅ Psychology-compliant component
export function ProgressCelebration({ progress }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="celebrate"
    >
      <h2>You're becoming stronger every day!</h2>
      <Button variant="celebration" size="touch">
        I Showed Up Today!
      </Button>
    </motion.div>
  );
}
```

#### Accessibility Requirements

Every component must include:

```typescript
// Required accessibility features
<Button
  aria-label="Mark reading habit as completed"
  className="touch-friendly"
  onKeyDown={handleKeyboardInteraction}
>
  I Showed Up!
</Button>
```

### 3. Testing Requirements

#### Unit Tests (Psychology-Focused)

```typescript
describe('HabitCard', () => {
  it('uses encouraging language throughout', () => {
    render(<HabitCard habit={mockHabit} />);
    const content = screen.getByRole('article').textContent;
    expect(content).toBeEncouraging();
  });

  it('meets touch target size requirements', () => {
    render(<HabitCard habit={mockHabit} />);
    const button = screen.getByText('I Showed Up!');
    expect(button).toHaveTouchFriendlySize();
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<HabitCard habit={mockHabit} />);

    await user.tab();
    expect(screen.getByText('I Showed Up!')).toHaveFocus();
  });
});
```

#### Required Test Coverage

- **Psychology compliance**: No shame-based language
- **Accessibility**: ARIA labels, keyboard navigation, touch targets
- **Performance**: < 200ms interaction response times
- **Motion sensitivity**: Respect for reduced motion preferences

### 4. Quality Checks

Before committing, run:

```bash
npm run validate:quick  # Quick validation
npm run psychology-check  # Psychology compliance
npm run a11y:check  # Accessibility audit
```

Our pre-commit hooks will automatically run these checks, but it's better to catch issues early.

## 🎨 Design Guidelines

### Color Usage

- **Primary (Sage Green)**: Growth, progress, completion
- **Amber**: "Life happened" understanding (never use red)
- **Charcoal**: Grounded, trustworthy text
- **Warm White**: Fresh starts, clarity

### Typography Hierarchy

```css
.identity-text {
  @apply text-lg font-semibold text-primary;
}

.celebration-text {
  @apply text-base font-medium text-success;
}

.gentle-text {
  @apply text-sm text-muted-foreground;
}
```

### Animation Guidelines

```typescript
// Always respect motion preferences
const shouldAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)')
  .matches;

// Gentle, celebrating animations only
const celebrationVariants = {
  initial: { scale: 1 },
  celebrate: {
    scale: [1, 1.05, 1],
    transition: { duration: 1.5, ease: 'easeOut' },
  },
};
```

## 📱 Mobile-First Development

### Responsive Design Principles

1. **Design for 320px first** (iPhone SE)
2. **Touch targets minimum 48px**
3. **Thumb-friendly primary actions**
4. **Safe area inset handling**

### Testing on Mobile

```bash
# Test on various screen sizes
npm run e2e  # Includes mobile device testing
```

## 🔍 Code Review Process

### Self-Review Checklist

Before submitting a PR, verify:

#### Psychology Compliance

- [ ] No shame-based language anywhere
- [ ] Encouraging, identity-focused messaging
- [ ] Celebration animations for success states
- [ ] "Life happened" alternatives provided

#### Accessibility

- [ ] All interactive elements keyboard accessible
- [ ] ARIA labels for screen readers
- [ ] Color contrast meets WCAG AA standards
- [ ] Touch targets minimum 48px

#### Performance

- [ ] Interactions respond < 200ms
- [ ] Bundle size impact minimal
- [ ] Images optimized
- [ ] Animations respect motion preferences

#### Mobile Experience

- [ ] Works on 320px width screens
- [ ] Touch-friendly interactions
- [ ] No horizontal scrolling
- [ ] Safe area handling

### PR Requirements

1. **Descriptive title** using encouraging language
2. **Psychology compliance confirmation**
3. **Accessibility testing results**
4. **Mobile testing verification**
5. **Performance impact assessment**

### PR Template

```markdown
## Description

Brief description of changes using encouraging language.

## Psychology Compliance

- [ ] No shame-based language used
- [ ] Encouraging messaging implemented
- [ ] Identity reinforcement included
- [ ] Celebration patterns followed

## Accessibility

- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility verified
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets meet 48px minimum

## Testing

- [ ] Unit tests pass
- [ ] Accessibility tests pass
- [ ] Mobile testing completed
- [ ] Performance benchmarks met

## Mobile Experience

- [ ] Tested on 320px width
- [ ] Touch interactions work well
- [ ] Safe area handling implemented
```

## 🐛 Reporting Issues

### Issue Guidelines

When reporting issues, use encouraging language:

#### ✅ Good Issue Titles

- "Opportunity to improve button accessibility"
- "Enhancement: Add celebration animation"
- "Mobile experience needs attention on small screens"

#### ❌ Avoid These Titles

- "Button is broken"
- "App fails on mobile"
- "Login error"

### Issue Template

```markdown
## Description

Describe the enhancement opportunity or area needing attention.

## Expected Experience

What would make this experience more encouraging and accessible?

## Current Experience

What's happening now (using positive language)?

## Steps to Reproduce

1. Clear steps to recreate the situation

## Environment

- Device:
- Browser:
- Screen size:
- Accessibility tools:

## Psychology Impact

How does this affect the user's sense of progress and identity?

## Accessibility Impact

How does this affect users with disabilities?
```

## 🔄 Release Process

### Version Naming

We use encouraging version names alongside semantic versioning:

- `v1.0.0 "First Steps"` - Initial release
- `v1.1.0 "Building Momentum"` - Feature additions
- `v1.1.1 "Gentle Improvements"` - Bug fixes

### Release Checklist

- [ ] All tests pass
- [ ] Psychology audit completed
- [ ] Accessibility compliance verified
- [ ] Performance benchmarks met
- [ ] Mobile experience tested
- [ ] Documentation updated
- [ ] Celebration plan ready for users

## 💡 Feature Suggestions

### Feature Request Process

1. **Start with psychology**: How does this serve the user's identity transformation?
2. **Consider accessibility**: Will this be inclusive for all users?
3. **Think mobile-first**: How will this work on small screens?
4. **Plan celebrations**: How will we celebrate user progress?

### Feature Proposal Template

```markdown
## Psychology-First Feature Proposal

### Identity Impact

How does this feature help users build their identity?

### User Journey

Walk through the encouraging user experience.

### Accessibility Considerations

How will this be inclusive for all users?

### Mobile Experience

How will this work on touch devices?

### Celebration Opportunities

Where can we celebrate user progress?

### Success Metrics

How will we measure positive impact?
```

## 🎯 Performance Standards

### Psychology-Critical Metrics

- **Habit interaction response**: < 200ms
- **Celebration animation start**: < 100ms
- **Daily flow completion**: < 10s total
- **Page load time**: < 2.5s

### Testing Performance

```bash
npm run lighthouse  # Performance audit
npm run stats      # Bundle analysis
```

## 🌟 Recognition

Contributors who embrace our psychology-first principles will be recognized in our release notes and contributor hall of fame. We celebrate:

- **Psychology Champions**: Contributors who consistently use encouraging language
- **Accessibility Advocates**: Those who enhance inclusive design
- **Mobile Masters**: Contributors who excel at touch-friendly experiences
- **Celebration Creators**: Those who add delightful, encouraging interactions

## 📚 Learning Resources

### Psychology-First Development

- [UX Guidelines](./tiny-wins-uiux-guidelines.md)
- [Component Implementation Guide](./tiny-wins-shadcn-implementation-guide.md)
- [Technical Specifications](./technical-specifications.md)

### Web Accessibility

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Accessibility Initiative](https://www.w3.org/WAI/)
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/)

### Performance Optimization

- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Core Web Vitals](https://web.dev/vitals/)

## 🤝 Community

### Code of Conduct

We are committed to providing a welcoming, encouraging environment for everyone. Our community guidelines are built on the same psychology-first principles as our code:

- **Use encouraging language** in all interactions
- **Celebrate others' contributions** and progress
- **Assume positive intent** and provide helpful feedback
- **Be inclusive** and accessible in communication
- **Focus on growth** rather than pointing out mistakes

### Getting Help

- **Discussions**: Ask questions and share ideas
- **Issues**: Report enhancement opportunities
- **Discord**: Real-time chat with the community
- **Office Hours**: Weekly video calls for live help

## 📜 License

By contributing to Tiny Wins, you agree that your contributions will be licensed under the same license as the project.

---

## 💭 Remember

Every contribution you make helps people build their identity through small, consistent actions. When you write psychology-first code, you're not just solving technical problems - you're creating experiences that help people become who they want to be.

Thank you for helping us build technology that genuinely serves human psychological needs! 🌟

---

_"Every line of code should whisper: 'You showed up. That's enough. That's everything.'"_
