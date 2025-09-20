# Component Generator

Automated component creation for psychology-first development.

## Generate New Component

Create a new component with psychology-first patterns:

```bash
# Usage: npm run create-component <ComponentName> <type>
# Types: feature, ui, layout, page

npm run create-component HabitCard feature
npm run create-component IdentityBadge ui
npm run create-component DashboardLayout layout
npm run create-component OnboardingPage page
```

## Component Templates

### Feature Components

Located in `src/components/features/`

- Include psychology-focused interactions
- Implement celebration animations
- Have accessibility features built-in
- Use mobile-first responsive design

### UI Components

Located in `src/components/ui/`

- Extend shadcn/ui base components
- Include psychology-focused variants
- Have consistent touch-friendly sizing
- Follow design system tokens

### Layout Components

Located in `src/components/layouts/`

- Implement safe area handling
- Include navigation patterns
- Have responsive breakpoints
- Support dark/light themes

### Page Components

Located in `src/components/pages/`

- Complete page implementations
- Include SEO optimizations
- Have loading and error states
- Follow psychology-first user flows

## Psychology-First Patterns

### Naming Conventions

- Use encouraging, identity-focused terms
- Avoid shame-based language (no "fail", "error", "broken")
- Prefer present tense ("showing up" vs "completed")
- Include celebration concepts ("celebrate", "progress", "becoming")

### Required Features

1. **Accessibility**: ARIA labels, keyboard navigation, screen reader support
2. **Mobile-First**: Touch-friendly sizing, thumb zones, responsive design
3. **Animations**: Gentle, celebrating, respectful of motion preferences
4. **Error Handling**: Encouraging messages, recovery suggestions
5. **Performance**: Optimized for < 200ms interactions

### Component Structure Template

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ComponentProps {
  // Define props with encouraging descriptions
  onCelebrate?: () => void;
  showingUp?: boolean;
  className?: string;
}

export function Component({
  onCelebrate,
  showingUp = false,
  className,
}: ComponentProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Include accessibility announcements
  const announceProgress = (message: string) => {
    // Screen reader announcement logic
  };

  return (
    <motion.div
      className={cn('touch-friendly gentle-focus', className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Component content with psychology-first patterns */}
    </motion.div>
  );
}
```

## Testing Patterns

Each component should include:

- Unit tests for psychology-focused interactions
- Accessibility tests with @testing-library/jest-dom
- Animation tests respecting motion preferences
- Mobile interaction tests with touch events

## Style Guidelines

### Colors

- Use design system tokens from `globals.css`
- No red/shame colors (use amber for warnings)
- Sage green for primary success states
- Warm whites and soft charcoals for backgrounds

### Typography

- Identity-focused text sizes (`text-identity`)
- Celebration text weights (`celebration-text`)
- Gentle supporting text (`gentle-text`)

### Spacing

- Touch-friendly minimum sizes (48px)
- Generous padding for comfort
- Safe area considerations for mobile devices
