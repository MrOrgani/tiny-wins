'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useHabitStore } from '@/stores/habit-store';
import { Flame, Star, Trophy, Crown, Zap } from 'lucide-react';

interface StreakCelebrationProps {
  habitId?: string;
  currentStreak: number;
  onClose?: () => void;
}

const STREAK_MILESTONES = [
  {
    days: 3,
    title: 'First Steps!',
    emoji: '🌱',
    color: 'text-green-500',
    bg: 'bg-green-100',
    message: "You're building momentum!",
  },
  {
    days: 7,
    title: 'One Week Strong!',
    emoji: '🔥',
    color: 'text-orange-500',
    bg: 'bg-orange-100',
    message: "You're on fire!",
  },
  {
    days: 14,
    title: 'Two Weeks!',
    emoji: '⚡',
    color: 'text-blue-500',
    bg: 'bg-blue-100',
    message: "You're unstoppable!",
  },
  {
    days: 21,
    title: 'Habit Former!',
    emoji: '🏆',
    color: 'text-purple-500',
    bg: 'bg-purple-100',
    message: 'This is becoming who you are!',
  },
  {
    days: 30,
    title: 'One Month!',
    emoji: '👑',
    color: 'text-yellow-500',
    bg: 'bg-yellow-100',
    message: "You're a habit champion!",
  },
  {
    days: 60,
    title: 'Two Months!',
    emoji: '🌟',
    color: 'text-indigo-500',
    bg: 'bg-indigo-100',
    message: 'Your identity is transforming!',
  },
  {
    days: 90,
    title: 'Three Months!',
    emoji: '💎',
    color: 'text-cyan-500',
    bg: 'bg-cyan-100',
    message: "You're a diamond now!",
  },
  {
    days: 100,
    title: 'Century Club!',
    emoji: '🎯',
    color: 'text-emerald-500',
    bg: 'bg-emerald-100',
    message: '100 days of showing up!',
  },
  {
    days: 365,
    title: 'One Year!',
    emoji: '🎊',
    color: 'text-pink-500',
    bg: 'bg-pink-100',
    message: "You've become who you set out to be!",
  },
];

export function StreakCelebration({
  habitId: _habitId,
  currentStreak,
  onClose,
}: StreakCelebrationProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<
    (typeof STREAK_MILESTONES)[0] | null
  >(null);

  useEffect(() => {
    const milestone = STREAK_MILESTONES.find((m) => m.days === currentStreak);
    if (milestone) {
      setCurrentMilestone(milestone);
      setShowCelebration(true);
    }
  }, [currentStreak]);

  const handleClose = () => {
    setShowCelebration(false);
    setTimeout(() => {
      setCurrentMilestone(null);
      onClose?.();
    }, 300);
  };

  if (!currentMilestone || !showCelebration) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="bg-background rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#fbbf24', '#f59e0b', '#d97706', '#92400e'][
                    i % 4
                  ],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10">
            {/* Streak flame icon with animation */}
            <motion.div
              className="text-6xl mb-4"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {currentMilestone.emoji}
            </motion.div>

            {/* Streak count with fire effect */}
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
            >
              <Flame className={`h-8 w-8 ${currentMilestone.color} mr-2`} />
              <span className="text-4xl font-bold text-foreground">
                {currentStreak}
              </span>
              <Flame
                className={`h-8 w-8 ${currentMilestone.color} ml-2 scale-x-[-1]`}
              />
            </motion.div>

            {/* Milestone title */}
            <motion.h2
              className="text-2xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentMilestone.title}
            </motion.h2>

            {/* Encouraging message */}
            <motion.p
              className="text-lg text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {currentMilestone.message}
            </motion.p>

            {/* Special effects for major milestones */}
            {currentStreak >= 21 && (
              <motion.div
                className="flex justify-center space-x-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[Star, Trophy, Crown, Zap].map((Icon, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  >
                    <Icon className={`h-6 w-6 ${currentMilestone.color}`} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Progress towards next milestone */}
            {currentStreak < 365 && (
              <motion.div
                className="mt-6 p-4 bg-muted/10 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm text-muted-foreground mb-2">
                  Next milestone:{' '}
                  {STREAK_MILESTONES.find((m) => m.days > currentStreak)?.title}
                </p>
                <div className="w-full bg-muted/20 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentStreak % (STREAK_MILESTONES.find((m) => m.days > currentStreak)?.days || 100)) / (STREAK_MILESTONES.find((m) => m.days > currentStreak)?.days || 100)) * 100}%`,
                    }}
                    transition={{ delay: 1.2, duration: 1 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Close button */}
            <motion.button
              className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Keep Going! 🚀
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

interface StreakCounterProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
  showAnimation?: boolean;
}

export function StreakCounter({
  streak,
  size = 'md',
  showAnimation = true,
}: StreakCounterProps) {
  const sizeClasses = {
    sm: { flame: 'h-4 w-4', text: 'text-sm' },
    md: { flame: 'h-5 w-5', text: 'text-base' },
    lg: { flame: 'h-6 w-6', text: 'text-lg' },
  };

  const getStreakColor = (days: number) => {
    if (days >= 100) return 'text-purple-500';
    if (days >= 30) return 'text-yellow-500';
    if (days >= 21) return 'text-blue-500';
    if (days >= 7) return 'text-orange-500';
    if (days >= 3) return 'text-green-500';
    return 'text-muted-foreground';
  };

  const getStreakBackground = (days: number) => {
    if (days >= 100) return 'bg-purple-100';
    if (days >= 30) return 'bg-yellow-100';
    if (days >= 21) return 'bg-blue-100';
    if (days >= 7) return 'bg-orange-100';
    if (days >= 3) return 'bg-green-100';
    return 'bg-muted/10';
  };

  return (
    <motion.div
      className={`inline-flex items-center px-3 py-1 rounded-full ${getStreakBackground(streak)} border border-current/20`}
      animate={
        showAnimation
          ? {
              scale: streak > 0 ? [1, 1.1, 1] : 1,
            }
          : {}
      }
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={
          showAnimation && streak > 0
            ? {
                rotate: [0, 10, -10, 0],
              }
            : {}
        }
        transition={{
          duration: 0.5,
          repeat: streak > 7 ? Infinity : 0,
          repeatDelay: 3,
        }}
      >
        <Flame
          className={`${sizeClasses[size].flame} ${getStreakColor(streak)} mr-1`}
        />
      </motion.div>
      <span
        className={`${sizeClasses[size].text} font-semibold ${getStreakColor(streak)}`}
      >
        {streak}
      </span>
    </motion.div>
  );
}

export function useStreakCelebration() {
  const { getHabitStreak } = useHabitStore();
  const [lastCelebratedStreak, setLastCelebratedStreak] = useState<
    Record<string, number>
  >({});

  const checkAndCelebrate = (habitId: string) => {
    const currentStreak = getHabitStreak(habitId);
    const lastCelebrated = lastCelebratedStreak[habitId] || 0;

    const milestone = STREAK_MILESTONES.find(
      (m) => m.days === currentStreak && m.days > lastCelebrated
    );

    if (milestone) {
      setLastCelebratedStreak((prev) => ({
        ...prev,
        [habitId]: currentStreak,
      }));
      return { shouldCelebrate: true, milestone, currentStreak };
    }

    return { shouldCelebrate: false, milestone: null, currentStreak };
  };

  return { checkAndCelebrate };
}
