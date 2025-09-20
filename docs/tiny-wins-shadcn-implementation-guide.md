# Tiny Wins: shadcn/ui Implementation Guide

_Precise component specifications for the micro-habits app that builds identity_

---

## Table of Contents

1. [Theme Configuration](#theme-configuration)
2. [Component Customizations](#component-customizations)
3. [Page Implementations](#page-implementations)
4. [Custom Components](#custom-components)
5. [Animation System](#animation-system)
6. [Accessibility Implementation](#accessibility-implementation)
7. [Mobile-First Utilities](#mobile-first-utilities)
8. [Code Examples](#code-examples)

---

## Theme Configuration

### CSS Variables Setup

Create `/styles/globals.css` with psychology-informed design tokens:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Primary Colors - Psychology-Informed */
    --primary: 135 169 107; /* Sage Green #87A96B - Growth, calm progression */
    --primary-foreground: 254 253 248; /* Warm White text on sage */

    /* Background Colors */
    --background: 254 253 248; /* Warm White #FEFDF8 - Fresh start, clarity */
    --foreground: 45 55 72; /* Soft Charcoal #2D3748 - Grounded, trustworthy */

    /* Supporting Colors */
    --muted: 113 128 150; /* Gentle Gray #718096 - Calm, supportive */
    --muted-foreground: 45 55 72;
    --card: 254 253 248; /* Same as background for seamless feel */
    --card-foreground: 45 55 72;

    /* Special Psychology Colors */
    --amber: 246 173 85; /* Warm Amber #F6AD55 - "Life happened" understanding */
    --amber-foreground: 45 55 72;
    --info: 99 179 237; /* Soft Blue #63B3ED - Trust, encouragement */
    --info-foreground: 45 55 72;

    /* Interactive States */
    --accent: 135 169 107; /* Same as primary for consistency */
    --accent-foreground: 254 253 248;

    /* Border and Ring */
    --border: 226 232 240; /* Very light gray for subtle definition */
    --ring: 135 169 107; /* Sage green for focus states */

    /* Spacing Scale - 8px grid system */
    --space-xxs: 0.25rem; /* 4px */
    --space-xs: 0.5rem; /* 8px */
    --space-sm: 1rem; /* 16px */
    --space-md: 1.5rem; /* 24px */
    --space-lg: 2rem; /* 32px */
    --space-xl: 3rem; /* 48px */
    --space-xxl: 4rem; /* 64px */

    /* Border Radius - Gentle, encouraging curves */
    --radius-sm: 0.5rem; /* 8px - small components */
    --radius-md: 0.75rem; /* 12px - cards, main components */
    --radius-lg: 1rem; /* 16px - containers, modals */

    /* Animation Timings - Gentle, never jarring */
    --duration-fast: 150ms;
    --duration-normal: 300ms;
    --duration-slow: 500ms;
    --duration-celebration: 1500ms;

    /* Shadows - Subtle elevation */
    --shadow-gentle: 0 2px 8px rgba(0, 0, 0, 0.05);
    --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
}

/* Custom utilities for psychology-focused design */
@layer utilities {
  .touch-friendly {
    @apply min-h-[48px] min-w-[48px];
  }

  .thumb-zone {
    @apply mb-safe-bottom-4 mx-4;
  }

  .gentle-transition {
    @apply transition-all duration-300 ease-out;
  }

  .celebration-scale {
    animation: celebration 1.5s ease-out;
  }

  .pulse-gentle {
    animation: pulse-gentle 2s infinite;
  }
}

@keyframes celebration {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes pulse-gentle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}
```

### Tailwind Config Extension

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f8f4',
          100: '#e9f0e4',
          500: '#87a96b', // Primary sage green
          600: '#7a9960',
          700: '#6b8553',
        },
        amber: {
          400: '#f6ad55', // "Life happened" color
        },
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        xxs: '0.25rem',
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        xxl: '4rem',
      },
      fontSize: {
        headline: ['1.75rem', { lineHeight: '2rem', fontWeight: '700' }], // 28px
        title: ['1.5rem', { lineHeight: '1.75rem', fontWeight: '600' }], // 24px
        body: ['1.0625rem', { lineHeight: '1.5rem', fontWeight: '400' }], // 17px
        caption: ['0.9375rem', { lineHeight: '1.25rem', fontWeight: '500' }], // 15px
        small: ['0.8125rem', { lineHeight: '1rem', fontWeight: '400' }], // 13px
      },
    },
  },
};
```

---

## Component Customizations

### 1. Button Component Variants

#### Primary "I Showed Up" Button

```tsx
// components/ui/button.tsx - Add to existing variants
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Existing variants...

        'showed-up': cn(
          'bg-sage-500 text-white hover:bg-sage-600',
          'touch-friendly gentle-transition',
          'shadow-md hover:shadow-lg',
          'active:scale-[0.98] active:shadow-sm',
          'focus-visible:ring-sage-500',
          'font-medium text-body'
        ),

        'life-happened': cn(
          'bg-amber-400 text-foreground hover:bg-amber-400/90',
          'touch-friendly gentle-transition',
          'shadow-sm hover:shadow-md',
          'active:scale-[0.98]',
          'focus-visible:ring-amber-400',
          'font-medium text-body'
        ),

        completed: cn(
          'bg-sage-500 text-white cursor-default',
          'touch-friendly',
          'shadow-md',
          'celebration-scale',
          'font-medium text-body'
        ),
      },
      size: {
        // Existing sizes...
        'habit-card': 'h-12 px-6 py-3 rounded-lg', // 48px height for touch
        'daily-action': 'h-14 px-8 py-4 rounded-xl w-full', // Primary CTA
      },
    },
  }
);
```

#### Usage Examples

```tsx
// Primary check-in button
<Button variant="showed-up" size="daily-action">
  I Showed Up
</Button>

// Alternative for difficult days
<Button variant="life-happened" size="habit-card">
  Life Happened
</Button>

// Completed state with celebration
<Button variant="completed" size="daily-action" disabled>
  ✓ You showed up!
</Button>
```

### 2. Card Component for Habit Cards

```tsx
// components/ui/habit-card.tsx
interface HabitCardProps {
  habitName: string;
  icon?: string;
  isCompleted?: boolean;
  onComplete?: () => void;
  onLifeHappened?: () => void;
  isToday?: boolean;
}

export function HabitCard({
  habitName,
  icon,
  isCompleted,
  onComplete,
  onLifeHappened,
  isToday = true,
}: HabitCardProps) {
  return (
    <Card
      className={cn(
        'gentle-transition border-0 shadow-gentle',
        'hover:shadow-card active:scale-[0.99]',
        isCompleted && 'bg-sage-50 border border-sage-200'
      )}
    >
      <CardContent className="p-md flex items-center justify-between">
        {/* Left side - Habit info */}
        <div className="flex items-center gap-sm">
          {icon && (
            <span className="text-title" role="img" aria-hidden="true">
              {icon}
            </span>
          )}
          <div>
            <h3 className="font-semibold text-title text-foreground">
              {habitName}
            </h3>
            {isToday && (
              <p className="text-caption text-muted-foreground">
                Today's tiny win
              </p>
            )}
          </div>
        </div>

        {/* Right side - Action button */}
        <div className="flex flex-col gap-xs">
          {!isCompleted ? (
            <>
              <Button
                variant="showed-up"
                size="habit-card"
                onClick={onComplete}
                className="min-w-[120px]"
              >
                I Showed Up
              </Button>
              {isToday && (
                <Button
                  variant="life-happened"
                  size="sm"
                  onClick={onLifeHappened}
                  className="text-xs"
                >
                  Life happened
                </Button>
              )}
            </>
          ) : (
            <div className="flex items-center gap-xs min-w-[120px] justify-center">
              <span className="text-sage-500">✓</span>
              <span className="text-caption font-medium text-sage-600">
                You showed up!
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

### 3. Identity Badge Component

```tsx
// components/ui/identity-badge.tsx
interface IdentityBadgeProps {
  identity: string;
  dayCount: number;
  className?: string;
}

export function IdentityBadge({
  identity,
  dayCount,
  className,
}: IdentityBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'bg-info/20 text-info-foreground border-info/30',
        'px-md py-xs rounded-lg',
        'font-medium text-caption',
        'gentle-transition hover:bg-info/25',
        'pulse-gentle', // Gentle attention-drawing
        className
      )}
    >
      Day {dayCount} as a {identity}
    </Badge>
  );
}
```

---

## Page Implementations

### 1. Home Screen (Daily Hub)

```tsx
// app/page.tsx or components/pages/home-page.tsx
export function HomePage() {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Read 1 page', icon: '📚', completed: false },
  ]);
  const weekMomentum = [true, false, true, true, false, true, false]; // M-S

  return (
    <div className="min-h-screen bg-background">
      {/* Safe area handling */}
      <div className="pt-safe-top pb-safe-bottom px-lg">
        {/* Identity Badge Section */}
        <div className="flex justify-center pt-xl pb-lg">
          <IdentityBadge identity="Reader" dayCount={47} />
        </div>

        {/* Today's Habits Section */}
        <section className="space-y-md mb-xl">
          <h2 className="text-title font-semibold text-foreground">
            Today's Habits
          </h2>

          <div className="space-y-sm">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habitName={habit.name}
                icon={habit.icon}
                isCompleted={habit.completed}
                onComplete={() => handleHabitComplete(habit.id)}
                onLifeHappened={() => handleLifeHappened(habit.id)}
              />
            ))}
          </div>

          {/* Add habit button - only show if less than 3 habits */}
          {habits.length < 3 && (
            <Button
              variant="outline"
              className="w-full h-16 border-dashed border-2 border-muted-foreground/30 hover:border-sage-500/50"
              onClick={() => router.push('/create-habit')}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add a tiny habit
            </Button>
          )}
        </section>

        {/* This Week Section */}
        <section className="space-y-md mb-xl">
          <h3 className="text-title font-semibold text-foreground">
            This Week
          </h3>

          <MomentumVisualization weekData={weekMomentum} className="mb-sm" />

          <p className="text-center text-caption text-muted-foreground">
            {weekMomentum.filter(Boolean).length}/7 days • Great momentum!
          </p>
        </section>

        {/* Encouragement Section */}
        <section className="text-center py-lg">
          <p className="text-body text-muted-foreground italic">
            "Small steps, big identity changes"
          </p>
        </section>

        {/* Settings Access */}
        <div className="fixed top-safe-top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/settings')}
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### 2. Habit Creation Flow

```tsx
// components/pages/create-habit-page.tsx
export function CreateHabitPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIdentity, setSelectedIdentity] = useState('');
  const [habitInput, setHabitInput] = useState('');
  const [shrinkCount, setShrinkCount] = useState(0);
  const [implementation, setImplementation] = useState({
    trigger: '',
    habit: '',
  });

  const identityOptions = [
    { id: 'writer', label: 'Writer', icon: '✍️' },
    { id: 'runner', label: 'Runner', icon: '🏃' },
    { id: 'artist', label: 'Artist', icon: '🎨' },
    { id: 'learner', label: 'Learner', icon: '📚' },
    { id: 'healthy', label: 'Healthy Person', icon: '🌱' },
    { id: 'custom', label: 'Something else', icon: '✨' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-safe-top pb-safe-bottom px-lg">
        {/* Progress Indicator */}
        <div className="flex justify-center pt-lg pb-xl">
          <div className="flex gap-xs">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={cn(
                  'w-3 h-3 rounded-full gentle-transition',
                  step <= currentStep ? 'bg-sage-500' : 'bg-muted'
                )}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-xl">
          {currentStep === 1 && (
            <IdentitySelectionStep
              options={identityOptions}
              selected={selectedIdentity}
              onSelect={setSelectedIdentity}
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <HabitInputStep
              identity={selectedIdentity}
              value={habitInput}
              onChange={setHabitInput}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <ShrinkingStep
              currentHabit={habitInput}
              shrinkCount={shrinkCount}
              onShrink={(newHabit) => {
                setHabitInput(newHabit);
                setShrinkCount((prev) => prev + 1);
              }}
              onNext={() => setCurrentStep(4)}
              canProceed={shrinkCount >= 2} // Force minimum 3 shrinks
            />
          )}

          {currentStep === 4 && (
            <ImplementationStep
              habit={habitInput}
              implementation={implementation}
              onChange={setImplementation}
              onComplete={handleCreateHabit}
              onBack={() => setCurrentStep(3)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Individual step components
function ShrinkingStep({
  currentHabit,
  shrinkCount,
  onShrink,
  onNext,
  canProceed,
}) {
  const [suggestions] = useState([
    'Just open the book',
    'Read one sentence',
    'Read one word',
  ]);

  return (
    <div className="space-y-lg text-center">
      <div className="space-y-md">
        <h2 className="text-headline font-bold text-foreground">
          Let's make it even smaller
        </h2>
        <p className="text-body text-muted-foreground">
          The goal is to make it impossible to say no
        </p>
      </div>

      <Card className="p-lg border-dashed border-2 border-sage-500/30">
        <p className="text-caption text-muted-foreground mb-xs">
          Current habit:
        </p>
        <p className="text-title font-semibold text-foreground mb-lg">
          "{currentHabit}"
        </p>

        <div className="space-y-sm">
          <p className="text-caption text-muted-foreground">
            Try this instead:
          </p>
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full h-auto py-md px-lg text-left"
              onClick={() => onShrink(suggestion)}
            >
              <div className="text-body font-medium">"{suggestion}"</div>
            </Button>
          ))}
        </div>
      </Card>

      <div className="space-y-md">
        <Button
          variant="showed-up"
          size="daily-action"
          onClick={onShrink}
          className="w-full"
        >
          Shrink It More ({shrinkCount}/3)
        </Button>

        {canProceed && (
          <Button
            variant="outline"
            size="daily-action"
            onClick={onNext}
            className="w-full"
          >
            This is perfect!
          </Button>
        )}

        {!canProceed && (
          <p className="text-caption text-muted-foreground">
            Please shrink your habit at least 3 times to continue
          </p>
        )}
      </div>
    </div>
  );
}
```

### 3. Recovery Screen (Missed Days)

```tsx
// components/pages/recovery-page.tsx
export function RecoveryPage() {
  const daysMissed = 3; // Calculate actual missed days

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="px-lg py-xl max-w-md w-full text-center space-y-xl">
        {/* Welcome Back Message */}
        <div className="space-y-md">
          <h1 className="text-headline font-bold text-foreground">
            Welcome Back!
          </h1>
          <p className="text-body text-muted-foreground leading-relaxed">
            Life happened, and that's completely normal. You're here now, and
            that's what matters.
          </p>
        </div>

        {/* Gentle Statistics */}
        <Card className="p-lg bg-sage-50 border-sage-200">
          <p className="text-caption text-muted-foreground mb-xs">
            You've been away for {daysMissed} days
          </p>
          <p className="text-body font-medium text-foreground">
            Ready to show up again today?
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-md">
          <Button
            variant="showed-up"
            size="daily-action"
            onClick={() => router.push('/')}
            className="w-full"
          >
            Yes, I'm Ready
          </Button>

          <Button
            variant="life-happened"
            size="daily-action"
            onClick={() => handlePauseHabits()}
            className="w-full"
          >
            Life is Still Crazy
            <span className="block text-xs mt-1 opacity-80">
              Pause for a few days
            </span>
          </Button>
        </div>

        {/* Encouraging Philosophy */}
        <div className="pt-lg border-t border-muted">
          <p className="text-body text-muted-foreground italic">
            "Consistency isn't perfection. It's always coming back."
          </p>
        </div>

        {/* Help Option */}
        <Button
          variant="ghost"
          onClick={() => router.push('/support')}
          className="text-caption"
        >
          Need help adjusting your habits?
        </Button>
      </div>
    </div>
  );
}
```

---

## Custom Components

### 1. Momentum Visualization (7-Day Circles)

```tsx
// components/ui/momentum-visualization.tsx
interface MomentumVisualizationProps {
  weekData: boolean[]; // 7 boolean values for M-S
  className?: string;
}

export function MomentumVisualization({
  weekData,
  className,
}: MomentumVisualizationProps) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const todayIndex = today === 0 ? 6 : today - 1; // Convert to M-S index

  return (
    <div className={cn('space-y-sm', className)}>
      {/* Circles */}
      <div className="flex justify-center gap-xs">
        {weekData.map((completed, index) => {
          const isToday = index === todayIndex;
          const isPast = index < todayIndex;
          const isFuture = index > todayIndex;

          return (
            <div
              key={index}
              className={cn(
                'relative flex items-center justify-center rounded-full gentle-transition',
                {
                  // Size
                  'w-10 h-10': isToday, // 40px for today
                  'w-8 h-8': !isToday, // 32px for other days

                  // Colors and states
                  'bg-sage-500': completed && isPast,
                  'bg-sage-500 pulse-gentle': completed && isToday,
                  'bg-amber-400': !completed && isPast, // "Life happened" days
                  'border-2 border-sage-500 bg-background':
                    !completed && isToday,
                  'border-2 border-muted bg-background': isFuture,

                  // Special animations
                  'celebration-scale': completed && isToday,
                }
              )}
            >
              {completed && (
                <span className="text-white text-xs font-semibold">✓</span>
              )}
              {isToday && !completed && (
                <span className="text-sage-500 text-xs font-bold">•</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Day Labels */}
      <div className="flex justify-center gap-xs">
        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              'w-8 h-4 flex items-center justify-center text-xs font-medium',
              index === todayIndex ? 'text-sage-600' : 'text-muted-foreground'
            )}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 2. Celebration Component

```tsx
// components/ui/celebration.tsx
import { useState, useEffect } from 'react';

interface CelebrationProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function Celebration({ trigger, onComplete }: CelebrationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="celebration-scale">
        <div className="bg-sage-500 rounded-full p-lg shadow-xl">
          <span className="text-white text-4xl">✓</span>
        </div>
      </div>

      {/* Confetti particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(
              'absolute w-2 h-2 bg-sage-400 rounded-full',
              'animate-bounce'
            )}
            style={{
              left: `${45 + Math.random() * 10}%`,
              top: `${45 + Math.random() * 10}%`,
              animationDelay: `${i * 100}ms`,
              animationDuration: '1s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## Animation System

### Haptic Feedback Integration

```tsx
// hooks/use-haptics.ts
export function useHaptics() {
  const triggerSuccess = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100]); // Single gentle vibration
    }
  };

  const triggerCelebration = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]); // Success pattern
    }
  };

  return { triggerSuccess, triggerCelebration };
}

// Usage in components
function HabitCompleteButton() {
  const { triggerCelebration } = useHaptics();

  const handleComplete = () => {
    triggerCelebration();
    // ... handle completion logic
  };

  return (
    <Button variant="showed-up" onClick={handleComplete}>
      I Showed Up
    </Button>
  );
}
```

### Gentle Transitions

```css
/* Add to globals.css */
@layer utilities {
  .enter-from-right {
    animation: enterFromRight 300ms ease-out;
  }

  .exit-to-left {
    animation: exitToLeft 300ms ease-out;
  }
}

@keyframes enterFromRight {
  from {
    opacity: 0;
    transform: translateX(16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes exitToLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-16px);
  }
}
```

---

## Accessibility Implementation

### Screen Reader Support

```tsx
// components/ui/accessible-habit-card.tsx
export function AccessibleHabitCard({ habit, isCompleted, onComplete }) {
  const announceCompletion = () => {
    const announcement = `${habit.name} marked as completed. Great job showing up!`;

    // Create live region announcement
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = announcement;

    document.body.appendChild(liveRegion);

    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 1000);
  };

  return (
    <Card role="article" aria-labelledby={`habit-${habit.id}`}>
      <CardContent className="p-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 id={`habit-${habit.id}`} className="font-semibold">
              {habit.name}
            </h3>
            <p className="text-caption text-muted-foreground">
              {isCompleted ? 'Completed today' : 'Not completed yet'}
            </p>
          </div>

          <Button
            variant={isCompleted ? 'completed' : 'showed-up'}
            onClick={
              !isCompleted
                ? () => {
                    onComplete();
                    announceCompletion();
                  }
                : undefined
            }
            disabled={isCompleted}
            aria-describedby={`habit-${habit.id}-status`}
          >
            {isCompleted ? '✓ Completed' : 'I Showed Up'}
          </Button>
        </div>

        <div id={`habit-${habit.id}-status`} className="sr-only">
          {isCompleted
            ? `${habit.name} has been completed for today`
            : `Press to mark ${habit.name} as completed`}
        </div>
      </CardContent>
    </Card>
  );
}
```

### Keyboard Navigation

```tsx
// components/ui/keyboard-navigation.tsx
export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Space or Enter to activate focused button
      if (event.code === 'Space' || event.code === 'Enter') {
        const focusedElement = document.activeElement as HTMLElement;
        if (
          focusedElement?.role === 'button' ||
          focusedElement?.tagName === 'BUTTON'
        ) {
          event.preventDefault();
          focusedElement.click();
        }
      }

      // Escape to go back or close modals
      if (event.code === 'Escape') {
        // Handle escape logic
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}
```

---

## Mobile-First Utilities

### Safe Area Handling

```css
/* Add to globals.css */
@layer utilities {
  .pt-safe-top {
    padding-top: env(safe-area-inset-top);
  }

  .pb-safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }

  .pl-safe-left {
    padding-left: env(safe-area-inset-left);
  }

  .pr-safe-right {
    padding-right: env(safe-area-inset-right);
  }

  /* Combined safe area classes */
  .pt-safe-top-4 {
    padding-top: calc(env(safe-area-inset-top) + 1rem);
  }

  .mb-safe-bottom-4 {
    margin-bottom: calc(env(safe-area-inset-bottom) + 1rem);
  }
}
```

### Touch Optimization

```tsx
// components/ui/touch-optimized.tsx
export function TouchOptimizedButton({ children, ...props }) {
  return (
    <Button
      {...props}
      className={cn(
        'touch-friendly', // Minimum 48px height/width
        'active:scale-[0.98]', // Visual feedback on press
        'select-none', // Prevent text selection on touch
        props.className
      )}
      onTouchStart={(e) => {
        // Prevent iOS double-tap zoom
        e.preventDefault();
        props.onTouchStart?.(e);
      }}
    >
      {children}
    </Button>
  );
}
```

### Responsive Layout Hook

```tsx
// hooks/use-responsive.ts
export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>(
    'mobile'
  );

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) setBreakpoint('mobile');
      else if (width < 1024) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
  };
}
```

---

## Code Examples

### Complete Home Page Implementation

```tsx
// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { HabitCard } from '@/components/ui/habit-card';
import { IdentityBadge } from '@/components/ui/identity-badge';
import { MomentumVisualization } from '@/components/ui/momentum-visualization';
import { Celebration } from '@/components/ui/celebration';
import { useHaptics } from '@/hooks/use-haptics';

export default function HomePage() {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: 'Read 1 page',
      icon: '📚',
      completed: false,
      identity: 'Reader',
    },
  ]);
  const [showCelebration, setShowCelebration] = useState(false);
  const { triggerCelebration } = useHaptics();

  // Mock data - replace with real data fetching
  const weekMomentum = [true, false, true, true, false, true, false];
  const identityDays = 47;

  const handleHabitComplete = (habitId: number) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId ? { ...habit, completed: true } : habit
      )
    );

    // Trigger celebration
    setShowCelebration(true);
    triggerCelebration();
  };

  const handleLifeHappened = (habitId: number) => {
    // Handle "life happened" scenario
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? { ...habit, completed: true, lifeHappened: true }
          : habit
      )
    );
  };

  const completedToday = habits.filter((h) => h.completed).length;
  const totalHabits = habits.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-safe-top pb-safe-bottom px-lg">
        {/* Identity Badge */}
        <div className="flex justify-center pt-xl pb-lg">
          <IdentityBadge
            identity={habits[0]?.identity || 'Person'}
            dayCount={identityDays}
          />
        </div>

        {/* Today's Habits */}
        <section className="space-y-md mb-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-title font-semibold text-foreground">
              Today's Habits
            </h2>
            {completedToday > 0 && (
              <span className="text-caption text-sage-600 font-medium">
                {completedToday}/{totalHabits} completed
              </span>
            )}
          </div>

          <div className="space-y-sm">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habitName={habit.name}
                icon={habit.icon}
                isCompleted={habit.completed}
                onComplete={() => handleHabitComplete(habit.id)}
                onLifeHappened={() => handleLifeHappened(habit.id)}
              />
            ))}
          </div>
        </section>

        {/* Momentum Visualization */}
        <section className="space-y-md mb-xl">
          <h3 className="text-title font-semibold text-foreground">
            This Week
          </h3>

          <MomentumVisualization weekData={weekMomentum} className="mb-sm" />

          <p className="text-center text-caption text-muted-foreground">
            {weekMomentum.filter(Boolean).length}/7 days •
            <span className="text-sage-600 font-medium ml-1">
              Great momentum!
            </span>
          </p>
        </section>

        {/* Daily Encouragement */}
        <section className="text-center py-lg">
          <p className="text-body text-muted-foreground italic">
            "Small steps, big identity changes"
          </p>
        </section>
      </div>

      {/* Celebration Overlay */}
      <Celebration
        trigger={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />
    </div>
  );
}
```

### Habit Creation with Forced Shrinking

```tsx
// components/pages/create-habit/shrinking-step.tsx
export function ShrinkingStep({
  currentHabit,
  shrinkCount,
  onShrink,
  onNext,
  identity,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [customShrink, setCustomShrink] = useState('');

  // Generate contextual suggestions based on identity and current habit
  useEffect(() => {
    const generateSuggestions = () => {
      if (identity === 'writer') {
        return [
          'Write one word',
          'Open your writing app',
          'Sit at your writing space',
        ];
      }
      if (identity === 'runner') {
        return ['Put on running shoes', 'Step outside', 'Walk to the door'];
      }
      // Default suggestions
      return ['Just start', 'Do the first step', 'Show up for 10 seconds'];
    };

    setSuggestions(generateSuggestions());
  }, [identity]);

  const canProceed = shrinkCount >= 2; // Minimum 3 total shrinks required

  return (
    <div className="space-y-lg">
      {/* Header */}
      <div className="text-center space-y-md">
        <h2 className="text-headline font-bold text-foreground">
          Let's make it even smaller
        </h2>
        <p className="text-body text-muted-foreground">
          The goal is to make it impossible to say no
        </p>
        <div className="flex justify-center">
          <Badge variant="outline" className="text-xs">
            Shrink attempt {shrinkCount + 1} of 3 minimum
          </Badge>
        </div>
      </div>

      {/* Current Habit Display */}
      <Card className="p-lg border-dashed border-2 border-sage-500/30 bg-sage-50/30">
        <div className="text-center">
          <p className="text-caption text-muted-foreground mb-xs">
            Current habit:
          </p>
          <p className="text-title font-semibold text-foreground mb-lg">
            "{currentHabit}"
          </p>

          {shrinkCount < 2 && (
            <p className="text-caption text-amber-600 bg-amber-50 px-sm py-xs rounded">
              Still too big! Let's shrink it more.
            </p>
          )}
        </div>
      </Card>

      {/* Suggestions */}
      <div className="space-y-md">
        <p className="text-caption font-medium text-center text-muted-foreground">
          Try one of these instead:
        </p>

        <div className="space-y-sm">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full h-auto py-md px-lg text-left justify-start hover:bg-sage-50 hover:border-sage-300"
              onClick={() => onShrink(suggestion)}
            >
              <div className="text-body font-medium">"{suggestion}"</div>
            </Button>
          ))}
        </div>

        {/* Custom shrinking */}
        <div className="space-y-sm">
          <Label
            htmlFor="custom-shrink"
            className="text-caption text-muted-foreground"
          >
            Or write your own smaller version:
          </Label>
          <div className="flex gap-sm">
            <Input
              id="custom-shrink"
              value={customShrink}
              onChange={(e) => setCustomShrink(e.target.value)}
              placeholder="Make it even tinier..."
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={() => {
                if (customShrink.trim()) {
                  onShrink(customShrink.trim());
                  setCustomShrink('');
                }
              }}
              disabled={!customShrink.trim()}
            >
              Use This
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-md pt-lg">
        {canProceed ? (
          <Button
            variant="showed-up"
            size="daily-action"
            onClick={onNext}
            className="w-full"
          >
            Perfect! This is small enough
          </Button>
        ) : (
          <div className="text-center space-y-md">
            <p className="text-caption text-muted-foreground">
              Please shrink your habit at least 3 times to continue
            </p>
            <p className="text-xs text-amber-600">
              Remember: the smaller, the better for building consistency!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## Final Notes

This implementation guide ensures that every component and interaction supports the core psychological principles of the "Tiny Wins" app:

1. **Effortless Entry**: Large touch targets, simple interactions, minimal cognitive load
2. **Identity Amplification**: Consistent reinforcement through badges, language, and celebrations
3. **Gentle Persistence**: Encouraging design that never shames or pressures

The shadcn/ui components are carefully customized to maintain the gentle, encouraging aesthetic while providing the robust functionality needed for habit formation. Every animation, color choice, and interaction pattern is designed to make showing up feel effortless and meaningful.

Remember: **"Every pixel should whisper: 'You showed up. That's enough. That's everything.'"**
