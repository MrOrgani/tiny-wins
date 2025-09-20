import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Psychology-focused utility functions
 */

// Format identity progress in an encouraging way
export function formatIdentityDays(days: number): string {
  if (days === 0) return 'Starting your journey';
  if (days === 1) return 'Day 1 - You showed up!';
  if (days < 7) return `Day ${days} - Building momentum`;
  if (days < 30) return `${days} days - Forming your identity`;
  if (days < 100) return `${days} days - Living your identity`;
  return `${days} days - Identity transformed`;
}

// Format celebration messages
export function getCelebrationMessage(habitName: string): string {
  const messages = [
    `You showed up for ${habitName}!`,
    `Your identity as someone who ${habitName.toLowerCase()} is growing stronger!`,
    `Every time you ${habitName.toLowerCase()}, you become more of who you want to be.`,
    `This is how change happens - one small action at a time.`,
    `You're not just doing ${habitName.toLowerCase()}, you're becoming someone who does this.`,
  ];
  return (
    messages[Math.floor(Math.random() * messages.length)] || 'You showed up!'
  );
}

// Format compassionate "life happened" messages
export function getLifeHappenedMessage(): string {
  const messages = [
    "Life happened. That's completely okay.",
    "Some days are harder than others. You're still on track.",
    "Taking a break doesn't erase your progress.",
    'Tomorrow is a fresh start to show up again.',
    "You're human. This doesn't change who you're becoming.",
  ];
  return (
    messages[Math.floor(Math.random() * messages.length)] ||
    "Life happened. That's completely okay."
  );
}

// Check if reduced motion is preferred
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Safe date formatting for different locales
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Calculate momentum score (psychology-informed)
export function calculateMomentumScore(completions: boolean[]): number {
  if (completions.length === 0) return 0;

  const recentWeight = 1.5; // Recent days count more
  const weights = completions.map((_, index) =>
    index >= completions.length - 3 ? recentWeight : 1
  );

  const weightedScore = completions.reduce(
    (sum, completed, index) => sum + (completed ? weights[index] || 0 : 0),
    0
  );

  const maxPossibleScore = weights.reduce((sum, weight) => sum + weight, 0);

  return Math.round((weightedScore / maxPossibleScore) * 100);
}

// Generate encouraging insights based on patterns
export function generateEncouragingInsight(completions: boolean[]): string {
  const totalDays = completions.length;
  const completedDays = completions.filter(Boolean).length;
  const completionRate = totalDays > 0 ? completedDays / totalDays : 0;

  if (completionRate >= 0.8) {
    return "You're building incredible consistency! Your identity is transforming.";
  } else if (completionRate >= 0.6) {
    return "Great momentum! Every time you show up, you strengthen who you're becoming.";
  } else if (completionRate >= 0.4) {
    return "You're making progress! Remember, it's about becoming, not perfection.";
  } else if (completedDays > 0) {
    return "You've started showing up! That's the hardest part. Keep going.";
  } else {
    return 'Today is a perfect day to start becoming who you want to be.';
  }
}
