'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHabitStore } from '@/stores/habit-store';
import { Habit } from '@/types/habit';
import {
  RandomEncouragement,
  CongratsExplosion,
  SuccessRipple,
  HoverDelight,
} from '@/components/ui/micro-interactions';

interface HabitCardProps {
  habit: Habit;
  className?: string;
}

export function HabitCard({ habit, className }: HabitCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const {
    markHabitComplete,
    markLifeHappened,
    getTodaysCheckIns,
    celebrationQueue,
    clearCelebration,
  } = useHabitStore();

  const [isCompleting, setIsCompleting] = useState(false);
  const [showLifeHappened, setShowLifeHappened] = useState(false);
  const [shouldCelebrate, setShouldCelebrate] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [completionCount, setCompletionCount] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showRandomEncouragement, setShowRandomEncouragement] = useState(false);
  const [showSuccessRipple, setShowSuccessRipple] = useState(false);
  const [showCongratsExplosion, setShowCongratsExplosion] = useState(false);

  const todaysCheckIns = getTodaysCheckIns();
  const todaysCheckIn = todaysCheckIns.find(
    (checkIn) => checkIn.habitId === habit.id
  );
  const isCompleted = todaysCheckIn?.completed || false;
  const isLifeHappened = todaysCheckIn?.lifeHappened || false;
  const isCheckedIn = isCompleted || isLifeHappened;

  // Handle celebration animation
  useEffect(() => {
    if (celebrationQueue.includes(habit.id)) {
      const messages = [
        'You chose to be who you want to become!',
        'Your identity is taking shape!',
        'One small step, one giant leap for your growth!',
        "The person you're becoming is proud of you!",
        'Your future self is cheering for you!',
      ];

      setCelebrationMessage(
        messages[Math.floor(Math.random() * messages.length)] || 'You did it!'
      );
      setShouldCelebrate(true);
      setShowConfetti(true);
      setShowSparkles(true);

      // Sparkles animation
      const sparkleTimer = setTimeout(() => {
        setShowSparkles(false);
      }, 1500);

      // Main celebration
      const celebrationTimer = setTimeout(() => {
        setShouldCelebrate(false);
        setShowConfetti(false);
        clearCelebration(habit.id);
      }, 3000);

      return () => {
        clearTimeout(sparkleTimer);
        clearTimeout(celebrationTimer);
      };
    }
    return undefined;
  }, [celebrationQueue, habit.id, clearCelebration]);

  // Track completion animations
  useEffect(() => {
    if (isCompleted && !shouldCelebrate) {
      setCompletionCount((prev) => prev + 1);
    }
  }, [isCompleted, shouldCelebrate]);

  const handleShowedUp = async () => {
    if (isCheckedIn) return;

    setIsCompleting(true);

    // Enhanced haptic feedback pattern
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 100]); // Success pattern
    }

    // Add slight delay for better UX feedback with anticipation
    setTimeout(() => {
      markHabitComplete(habit.id);
      setIsCompleting(false);

      // Trigger whimsical celebrations
      setShowSuccessRipple(true);

      // Random chance for extra encouragement
      if (Math.random() < 0.3) {
        setTimeout(() => setShowRandomEncouragement(true), 500);
      }

      // Special celebration for multiple completions in a row
      if (completionCount > 0 && Math.random() < 0.4) {
        setTimeout(() => setShowCongratsExplosion(true), 800);
      }

      // Play a subtle success sound if audio context is available
      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          800,
          audioContext.currentTime + 0.1
        );
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.2
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
      } catch (e) {
        // Graceful fallback - no sound
      }
    }, 300);
  };

  const handleLifeHappened = () => {
    if (isCheckedIn) return;
    markLifeHappened(habit.id);
    setShowLifeHappened(false);
  };

  const getCardStyles = () => {
    if (isCompleted) {
      return 'bg-gradient-to-br from-success/20 to-success/10 border-success/30';
    }
    if (isLifeHappened) {
      return 'bg-gradient-to-br from-amber/20 to-amber/10 border-amber/30';
    }
    return 'bg-card border-border hover:border-primary/30';
  };

  const getButtonText = () => {
    if (isCompleted) return 'You Showed Up! ✨';
    if (isLifeHappened) return 'Life Happened';
    return 'I Showed Up';
  };

  return (
    <>
      <HoverDelight delightType="glow" className="w-full">
        <Card
          role="group"
          className={cn(
            'relative overflow-hidden transition-all duration-300 hover:shadow-md',
            getCardStyles(),
            shouldCelebrate && 'animate-celebrate',
            'motion-safe:transition-all motion-reduce:transition-none',
            className
          )}
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Habit Title */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg leading-snug">
                  {habit.title}
                </h3>
                {habit.implementationIntention && (
                  <p className="text-sm text-muted-foreground italic opacity-90">
                    {habit.implementationIntention}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <HoverDelight delightType="bounce">
                  <Button
                    type="button"
                    onClick={handleShowedUp}
                    disabled={isCheckedIn || isCompleting}
                    className={cn(
                      'w-full min-h-[56px] min-w-[56px]',
                      isCompleted ? 'opacity-75 cursor-default' : '',
                      isCompleting && 'opacity-50'
                    )}
                    size="lg"
                  >
                    {isCompleting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Showing up...
                      </span>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        {getButtonText()}
                      </>
                    )}
                  </Button>
                </HoverDelight>

                {/* Life Happened Alternative */}
                {!isCheckedIn && (
                  <div className="space-y-2">
                    {!showLifeHappened ? (
                      <HoverDelight delightType="wiggle">
                        <button
                          onClick={() => setShowLifeHappened(true)}
                          className="w-full text-sm text-muted-foreground hover:text-amber transition-colors py-2 font-medium"
                        >
                          Life happened today? 🤗
                        </button>
                      </HoverDelight>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-amber text-center">
                          That&apos;s completely okay. You&apos;re human.
                        </p>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={handleLifeHappened}
                            className="flex-1 bg-[rgb(184_134_82)] text-[rgb(31_41_55)] hover:bg-[rgb(184_134_82)]/90 transform transition-all duration-200 shadow-sm hover:shadow-md"
                            size="sm"
                          >
                            <Heart className="h-4 w-4" />
                            Mark: Life Happened
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setShowLifeHappened(false)}
                            variant="outline"
                            size="sm"
                            className="px-3"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Completion Message */}
              {isCompleted && (
                <motion.div
                  initial={
                    shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }
                  }
                  animate={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                  }
                  className="text-center p-3 bg-success/10 rounded-lg"
                >
                  <p className="text-base font-medium text-[rgb(133_94_161)] leading-relaxed text-sm">
                    You chose to be who you want to become. That&apos;s
                    powerful.
                  </p>
                </motion.div>
              )}

              {isLifeHappened && (
                <motion.div
                  initial={
                    shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }
                  }
                  animate={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                  }
                  className="text-center p-3 bg-amber/10 rounded-lg"
                >
                  <p className="text-sm text-amber-foreground font-medium">
                    Tomorrow is another opportunity to show up. You&apos;ve got
                    this.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Enhanced Celebration overlay with confetti */}
            <AnimatePresence>
              {shouldCelebrate && (
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, scale: 1 }
                  }
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  className="absolute inset-0 bg-gradient-to-br from-success/95 to-celebration/95 flex items-center justify-center p-4 rounded-lg overflow-hidden"
                >
                  {/* Confetti particles */}
                  {showConfetti && (
                    <div className="absolute inset-0">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{
                            opacity: 0,
                            y: 0,
                            x: '50%',
                            rotate: 0,
                          }}
                          animate={{
                            opacity: [0, 1, 1, 0],
                            y: [0, -60, -100, -140],
                            x: `${50 + (Math.random() - 0.5) * 100}%`,
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.1,
                            ease: 'easeOut',
                          }}
                          className={`absolute w-2 h-2 ${
                            [
                              'bg-yellow-400',
                              'bg-pink-400',
                              'bg-blue-400',
                              'bg-green-400',
                              'bg-purple-400',
                            ][i % 5]
                          } rounded-full`}
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Sparkles around the content */}
                  {showSparkles && (
                    <div className="absolute inset-0">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={`sparkle-${i}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.2,
                            repeat: 1,
                          }}
                          className="absolute text-yellow-300 text-xl"
                          style={{
                            left: `${20 + (i % 4) * 20}%`,
                            top: `${20 + Math.floor(i / 4) * 60}%`,
                          }}
                        >
                          ✨
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1.05, 1],
                    }}
                    transition={{ duration: 0.8, repeat: 2 }}
                    className="text-center text-white relative z-10"
                  >
                    <motion.div
                      className="text-5xl mb-3"
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 0.5, repeat: 3 }}
                    >
                      🎉
                    </motion.div>
                    <p className="font-bold text-xl mb-2">
                      {celebrationMessage}
                    </p>
                    <motion.p
                      className="text-sm font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Your identity is growing stronger! 🌱→🌳
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </HoverDelight>

      {/* Additional whimsical interactions */}
      <RandomEncouragement
        trigger={showRandomEncouragement}
        onComplete={() => setShowRandomEncouragement(false)}
      />

      <CongratsExplosion
        trigger={showCongratsExplosion}
        onComplete={() => setShowCongratsExplosion(false)}
        intensity="gentle"
      />

      <SuccessRipple
        trigger={showSuccessRipple}
        onComplete={() => setShowSuccessRipple(false)}
        color={getCardStyles().includes('success') ? '#22C55E' : '#FB923C'}
      />
    </>
  );
}
