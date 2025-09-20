// Whimsical UI Components for Tiny Wins
// These components add delightful micro-interactions and positive psychology elements
/* eslint-disable no-restricted-syntax */

// Core UI Components
export { Button } from './button';
export { Card, CardHeader, CardTitle, CardContent } from './card';
export { Input } from './input';
export { Textarea } from './textarea';

// Delightful Loading States
export {
  DelightfulLoading,
  SkeletonHabitCard,
  PulsingDots,
} from './loading-states';

// Encouraging Empty States
export { EmptyState, QuickEmptyState } from './empty-states';

// Understanding Error States
export { ErrorState, ToastError, InlineError } from './error-states';

// Whimsical Micro-Interactions
export {
  FloatingHeart,
  WiggleButton,
  BouncyIcon,
  PulsingDot,
  ShakeOnError,
  TypewriterText,
  MagneticButton,
  ParticleEffect,
  EasterEgg,
  TimeBasedGreeting,
  RandomEncouragement,
  CongratsExplosion,
  ProgressCheer,
  SuccessRipple,
  HoverDelight,
} from './micro-interactions';

// Sound Effects & Audio
export {
  SoundEffects,
  useSoundEffects,
  SoundUtils,
  WithSound,
} from './sound-effects';

// Type exports
export type { SoundType } from './sound-effects';
