# Development Setup Commands

Quick setup commands for the Tiny Wins development environment.

## Quick Start

```bash
# Install dependencies and setup hooks
npm run setup

# Start development server
npm run dev

# Run psychology compliance check
npm run psychology-check
```

## Development Workflow Commands

### Fresh Start

Cleans everything and reinstalls:

```bash
npm run fresh
```

### Code Quality

Run all quality checks before committing:

```bash
npm run psychology-check
```

### Testing

```bash
# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run accessibility tests
npm run a11y:check

# Run end-to-end tests
npm run e2e
```

### Formatting

```bash
# Format all code
npm run format

# Check formatting without changes
npm run format:check
```

## Psychology-First Development

This project enforces psychology-first principles through tooling:

- **No shame-based language** in code, comments, or commits
- **Celebration-focused** success states and animations
- **Accessibility-first** development with automated checks
- **Mobile-first** responsive design patterns
- **Identity-focused** component and variable naming

## Component Development

### Adding shadcn/ui Components

```bash
# Add a new component
npx shadcn@latest add [component-name]

# List available components
npx shadcn@latest list
```

### Creating Custom Components

1. Use psychology-focused naming conventions
2. Include celebration animations for success states
3. Ensure accessibility compliance
4. Follow mobile-first design patterns

## Quality Gates

Before every commit, the following checks run automatically:

- ESLint for code quality and psychology compliance
- Prettier for consistent formatting
- TypeScript for type safety
- Accessibility checks with axe-core
- Test suite execution

## Performance Monitoring

Core Web Vitals targets:

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

Habit interaction targets:

- Habit check-in response: < 200ms
- Celebration animation start: < 100ms
- Daily flow completion: < 10s total
