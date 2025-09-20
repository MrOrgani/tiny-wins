# Tiny Wins - Psychology-First Micro-Habits App

> _"Every pixel whispers: 'You showed up. That's enough. That's everything.'"_

A psychology-informed micro-habits application that builds identity through showing up. This project uses **Next.js 14**, **shadcn/ui**, and **TypeScript** with a comprehensive developer experience setup focused on accessibility, performance, and psychological principles.

## 🧠 Psychology-First Development

This codebase enforces psychology-first principles through every aspect of development:

- **No shame-based language** anywhere in the code, UI, or documentation
- **Celebration-focused** animations and interactions
- **Identity amplification** through consistent positive reinforcement
- **Accessibility-first** development with automated compliance checks
- **Mobile-first** responsive design for universal access

## 🚀 Quick Start

Get up and running in under 5 minutes:

```bash
# Clone and setup
git clone <repository-url>
cd tiny-wins
npm run setup

# Start development
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

## 📋 Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm 9+** (comes with Node.js)
- **Git** for version control
- **VS Code** (recommended) with suggested extensions

## 🛠️ Development Commands

### Essential Commands

```bash
npm run dev              # Start development server
npm run psychology-check # Run all psychology compliance checks
npm run validate:quick   # Quick validation (lint + type-check + unit tests)
npm run fresh:dev        # Clean restart of development server
```

### Testing Commands

```bash
npm run test            # Run unit tests
npm run test:watch      # Run tests in watch mode
npm run test:ui         # Open Vitest UI
npm run test:coverage   # Generate coverage report
npm run e2e            # Run end-to-end tests
npm run a11y:check     # Accessibility compliance check
```

### Quality Assurance

```bash
npm run lint           # ESLint code quality check
npm run format         # Format code with Prettier
npm run type-check     # TypeScript type checking
npm run psychology-audit # Comprehensive psychology compliance audit
npm run validate:full  # Complete validation suite
```

### Component Development

```bash
npm run component:add [name]  # Add new shadcn/ui component
npm run component:list        # List available components
```

### Performance & Analysis

```bash
npm run lighthouse     # Performance audit
npm run stats          # Bundle size analysis
npm run deploy:check   # Pre-deployment validation
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main application routes
│   ├── api/               # API endpoints
│   ├── globals.css        # Global styles with psychology-focused CSS variables
│   ├── layout.tsx         # Root layout with accessibility features
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn/ui base components (with psychology modifications)
│   ├── features/          # Feature-specific components
│   ├── layouts/           # Layout components
│   └── pages/             # Page-level components
├── lib/
│   ├── db/                # Database schemas and queries
│   ├── services/          # Business logic services
│   ├── utils.ts           # Utility functions (psychology-focused helpers)
│   └── validations/       # Input validation schemas
├── hooks/                 # Custom React hooks
├── stores/                # Zustand state stores
├── types/                 # TypeScript type definitions
├── constants/             # App constants and configs
└── test/                  # Test utilities and setup
```

## 🎨 Design System

The app uses a psychology-informed design system with:

### Color Palette

- **Primary**: Sage Green `#87A96B` - Growth, calm progression
- **Background**: Warm White `#FEFDF8` - Fresh start, clarity
- **Amber**: `#F6AD55` - "Life happened" understanding (replaces shame-based red)
- **Charcoal**: `#2D3748` - Grounded, trustworthy text

### Typography

- **Identity text**: Bold, prominent for identity reinforcement
- **Celebration text**: Medium weight for positive feedback
- **Gentle text**: Softer styling for supportive content

### Spacing & Sizing

- **Touch targets**: Minimum 48px for accessibility
- **Safe areas**: Automatic handling for all devices
- **Generous padding**: Comfortable, non-cramped interfaces

## 🧪 Testing Strategy

### Unit Tests (Vitest + React Testing Library)

- **Psychology compliance** - No shame-based language
- **Accessibility** - ARIA labels, keyboard navigation, touch targets
- **Motion sensitivity** - Respect for reduced motion preferences
- **Performance** - < 200ms interaction response times

### Integration Tests

- **User flows** - Complete psychological journeys
- **Component interactions** - Celebration animations and state changes
- **API integration** - Error handling with encouraging messages

### End-to-End Tests (Playwright)

- **Cross-browser compatibility** - Chrome, Firefox, Safari
- **Mobile responsiveness** - Touch-friendly on all devices
- **Accessibility compliance** - WCAG 2.1 AA standards
- **Performance benchmarks** - Real-world usage scenarios

## ♿ Accessibility Features

This app is built accessibility-first:

- **WCAG 2.1 AA compliance** - Verified through automated testing
- **Keyboard navigation** - All features accessible without mouse
- **Screen reader support** - Comprehensive ARIA labels and live regions
- **Touch-friendly design** - 48px minimum touch targets
- **High contrast support** - Readable in all contrast modes
- **Motion sensitivity** - Respects `prefers-reduced-motion`

## 🔧 Developer Experience Features

### VS Code Integration

- **Auto-formatting** on save with Prettier
- **ESLint integration** with psychology-focused rules
- **TypeScript IntelliSense** with strict type checking
- **Debugging configurations** for Next.js and tests
- **Task runner integration** for common development workflows

### Git Hooks (Husky)

- **Pre-commit**: Code formatting, linting, type checking
- **Pre-push**: Full test suite and accessibility checks
- **Commit message**: Psychology-focused language validation

### Quality Gates

- **Psychology compliance** checks prevent shame-based language
- **Accessibility audits** ensure inclusive design
- **Performance monitoring** maintains psychology-critical response times
- **Bundle size limits** keep the app fast and responsive

## 🌟 Psychology-First Development Principles

### 1. Encouraging Language

```typescript
// ❌ Avoid
const errorMessage = 'Failed to save';
const isBroken = checkStatus();

// ✅ Use instead
const encouragementMessage = "Let's try that again";
const needsAttention = checkStatus();
```

### 2. Celebration-Focused Interactions

```typescript
// Every success state must include celebration
const handleSuccess = () => {
  triggerCelebrationAnimation();
  showEncouragingMessage();
  announceToScreenReader('Great job showing up!');
};
```

### 3. Identity Amplification

```typescript
// Consistently reinforce user's evolving identity
const identityMessage = "You're becoming someone who reads daily";
const progressMessage = 'Day 7 - Your reader identity is growing stronger';
```

### 4. Graceful Alternatives

```typescript
// Always provide "life happened" alternatives
<Button variant="life-happened" onClick={handleLifeHappened}>
  Life Happened
</Button>
```

## 📱 Mobile-First Development

### Responsive Breakpoints

- **Mobile**: 320px - 767px (primary focus)
- **Tablet**: 768px - 1023px (enhanced features)
- **Desktop**: 1024px+ (centered content, max 480px width)

### Touch Interactions

- **Minimum touch targets**: 48px × 48px
- **Thumb-friendly zones** for primary actions
- **Haptic feedback** on supported devices
- **Gesture support** for natural interactions

## 🚢 Deployment

### Pre-Deployment Checklist

```bash
npm run deploy:check  # Comprehensive validation
```

This runs:

- Build process validation
- Full test suite
- Accessibility audit
- Performance benchmarks
- Psychology compliance checks

### Environment Configuration

- **Development**: Full debugging, no analytics
- **Staging**: Production-like, limited analytics
- **Production**: Optimized, privacy-compliant analytics

## 🤝 Contributing

### Getting Started

1. Read the psychology-first principles above
2. Install recommended VS Code extensions
3. Run `npm run setup` to configure your environment
4. Create a feature branch: `git checkout -b feature/encouraging-feature-name`

### Development Workflow

1. **Write psychology-compliant code** - Use encouraging language
2. **Test accessibility** - Ensure keyboard navigation and screen reader support
3. **Test on mobile** - Verify touch-friendly interactions
4. **Run validation** - `npm run validate:quick` before committing
5. **Create encouraging commit messages** - Follow conventional commits with positive language

### Code Review Guidelines

- **Psychology compliance** - No shame-based language anywhere
- **Accessibility** - All interactions must be inclusive
- **Performance** - Maintain < 200ms response times for critical interactions
- **Mobile-first** - Ensure excellent experience on small screens

## 📚 Resources

### Psychology-First Development

- [UX Guidelines](./tiny-wins-uiux-guidelines.md) - Complete design philosophy
- [shadcn Implementation Guide](./tiny-wins-shadcn-implementation-guide.md) - Component customizations
- [Technical Specifications](./technical-specifications.md) - Architecture details

### Development Tools

- [Commands Documentation](./.claude/commands/) - Development automation scripts
- [VS Code Settings](./.vscode/) - Optimal editor configuration
- [Testing Guide](./src/test/) - Psychology-focused testing patterns

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Accessibility Initiative](https://www.w3.org/WAI/)

---

## 💭 Philosophy

Remember: **Every line of code should whisper: "You showed up. That's enough. That's everything."**

This project exists to help people build their identity through small, consistent actions. As developers, we have the privilege and responsibility to create technology that genuinely serves human psychological needs.

When you contribute to this codebase, you're not just writing code - you're crafting experiences that help people become who they want to be, one small action at a time.

---

_Built with ❤️ and psychology-first principles_
