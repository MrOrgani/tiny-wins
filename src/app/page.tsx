'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useHabitStore } from '@/stores/habit-store';
// eslint-disable-next-line no-restricted-syntax
import { IdentityBadge } from '@/components/features/identity-badge';
import { HabitCard } from '@/components/features/habit-card';
import { MomentumVisualization } from '@/components/features/momentum-visualization';
import { OnboardingExperience } from '@/components/features/onboarding-experience';
import { EmptyState } from '@/components/ui/empty-states';
import {
  TimeBasedGreeting,
  EasterEgg,
  FloatingHeart,
  HoverDelight,
  ProgressCheer,
} from '@/components/ui/micro-interactions';
import {
  SurpriseButton,
  SurpriseEasterEgg,
} from '@/components/features/surprise-button';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Sparkles } from 'lucide-react';

export default function HomePage() {
  const {
    selectedIdentity,
    activeHabits,
    getEncouragingMessage,
    getTodaysCheckIns,
  } = useHabitStore();

  const [encouragingMessage, setEncouragingMessage] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);
  const [easterEggActivated, setEasterEggActivated] = useState(false);
  const [showDailyProgress, setShowDailyProgress] = useState(true);

  // Filter active habits for today
  const todaysHabits = activeHabits.filter((habit) => habit.isActive);
  const completedTodayCount = todaysHabits.filter((habit) => {
    const todaysCheckIns = getTodaysCheckIns();
    return todaysCheckIns.find(
      (checkIn) => checkIn.habitId === habit.id && checkIn.completed
    );
  }).length;

  useEffect(() => {
    // Check if user needs onboarding
    if (!selectedIdentity && activeHabits.length === 0) {
      setShowOnboarding(true);
    }

    // Set daily encouraging message
    const message = getEncouragingMessage();
    setEncouragingMessage(message.text);

    // Show progress celebration for good days
    if (
      completedTodayCount > 0 &&
      completedTodayCount === todaysHabits.length
    ) {
      setShowDailyProgress(true);
    }
  }, [
    selectedIdentity,
    activeHabits.length,
    getEncouragingMessage,
    completedTodayCount,
    todaysHabits.length,
  ]);

  const dailyProgress =
    todaysHabits.length > 0
      ? (completedTodayCount / todaysHabits.length) * 100
      : 0;

  if (showOnboarding) {
    return (
      <>
        <OnboardingExperience onComplete={() => setShowOnboarding(false)} />
        <FloatingHeart
          trigger={showFloatingHearts}
          onComplete={() => setShowFloatingHearts(false)}
        />
      </>
    );
  }

  return (
    <main className="[padding-top:env(safe-area-inset-top)] [padding-bottom:env(safe-area-inset-bottom)] [padding-left:env(safe-area-inset-left)] [padding-right:env(safe-area-inset-right)] min-h-screen bg-background [-webkit-overflow-scrolling:touch] [scroll-behavior:smooth] [-webkit-user-select:none] [-moz-user-select:none] [user-select:none]">
      <div className="max-w-2xl mx-auto transition-all duration-300 ease-out">
        {/* Header */}
        <header className="[padding-top:max(env(safe-area-inset-top),0.5rem)] [padding-left:max(env(safe-area-inset-left),1rem)] [padding-right:max(env(safe-area-inset-right),1rem)] flex justify-between items-center p-4 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <motion.h1
              className="text-xl sm:text-2xl font-semibold leading-snug text-foreground cursor-pointer"
              onClick={() => setShowFloatingHearts(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tiny Wins
            </motion.h1>
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <TimeBasedGreeting className="hidden sm:flex" />
            <Link href="/settings">
              <Button
                variant="ghost"
                size="icon"
                className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200 min-h-[48px] min-w-[48px] p-2 relative group"
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Settings className="h-5 w-5 group-hover:text-primary transition-colors" />
                </motion.div>
              </Button>
            </Link>
          </div>
        </header>

        <div className="flex-1 p-4 pb-20 space-y-6">
          {/* Identity Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HoverDelight delightType="glow">
              <IdentityBadge />
            </HoverDelight>
          </motion.div>

          {/* Daily Progress */}
          {todaysHabits.length > 0 && showDailyProgress && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-card rounded-xl p-4 border border-border/50"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <span className="text-lg">🎥</span>
                  Today&apos;s Progress
                </h3>
                <span className="text-sm text-muted-foreground">
                  {completedTodayCount} of {todaysHabits.length}
                </span>
              </div>
              <ProgressCheer
                progress={dailyProgress}
                milestone={50}
                className="mb-2"
              />
              {dailyProgress === 100 && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center text-celebration font-medium mt-3"
                >
                  Perfect day! You&apos;re unstoppable! 🎆
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Encouraging Message */}
          {encouragingMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-4 bg-info/10 rounded-xl border border-info/20 relative overflow-hidden"
            >
              {/* Gentle sparkle effect */}
              <motion.div
                className="absolute top-2 right-2 text-info/40"
                animate={{
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
              <p className="text-[rgb(67_94_140)] font-medium leading-relaxed text-base relative z-10">
                {encouragingMessage}
              </p>
            </motion.div>
          )}

          {/* Today's Habits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <motion.span
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  🎯
                </motion.span>
                Today&apos;s Habits
              </h2>
              <span className="text-sm text-muted-foreground">
                {todaysHabits.length}{' '}
                {todaysHabits.length === 1 ? 'habit' : 'habits'}
              </span>
            </div>

            {todaysHabits.length > 0 ? (
              <div className="space-y-4">
                {todaysHabits.map((habit, index) => (
                  <motion.div
                    key={habit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <HabitCard habit={habit} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState variant="habits" illustration="target" />
            )}
          </motion.div>

          {/* Momentum Visualization */}
          {todaysHabits.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <HoverDelight delightType="sparkle">
                <MomentumVisualization />
              </HoverDelight>
            </motion.div>
          )}
        </div>

        {/* Floating Action Button */}
        {todaysHabits.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 p-4 [padding-bottom:calc(1rem+env(safe-area-inset-bottom))] bg-gradient-to-t from-background/95 via-background/80 to-transparent backdrop-blur-sm border-t border-border/30">
            <Link href="/create-habit">
              <HoverDelight delightType="bounce">
                <Button
                  className="w-full bg-[rgb(72_95_72)] text-white hover:bg-[rgb(72_95_72)]/90 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg relative overflow-hidden text-lg py-6 group"
                  size="lg"
                >
                  {/* Subtle glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: [-100, 400] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                  <motion.div
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Plus className="h-5 w-5" />
                  </motion.div>
                  Add Another Habit
                  <motion.div
                    className="ml-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    ✨
                  </motion.div>
                </Button>
              </HoverDelight>
            </Link>
          </div>
        )}
      </div>

      {/* Easter Eggs and Micro-interactions */}
      <EasterEgg
        trigger="tinywins"
        onActivate={() => {
          setEasterEggActivated(true);
          setShowFloatingHearts(true);
        }}
      />

      <FloatingHeart
        trigger={showFloatingHearts || easterEggActivated}
        onComplete={() => {
          setShowFloatingHearts(false);
          setEasterEggActivated(false);
        }}
      />

      {/* Floating Surprise Button */}
      <SurpriseButton variant="floating" />

      {/* Time-based Easter Eggs */}
      <SurpriseEasterEgg />
    </main>
  );
}
