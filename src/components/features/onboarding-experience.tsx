'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  emoji: string;
  animation: object;
  quote?: string;
  interactiveElement?: React.ReactNode;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Tiny Wins',
    description: 'Where small actions create big transformations',
    emoji: '🌱',
    animation: {
      y: [0, -10, 0],
      rotate: [0, 2, -2, 0],
    },
    quote: '"A journey of a thousand miles begins with a single step."',
  },
  {
    id: 'identity',
    title: 'You are what you repeatedly do',
    description:
      'Your habits shape your identity. Choose habits that align with who you want to become.',
    emoji: '🦋',
    animation: {
      x: [0, 10, -10, 0],
      y: [0, -5, 0],
      rotate: [0, 5, -5, 0],
    },
    quote:
      '"Every action you take is a vote for the type of person you wish to become."',
  },
  {
    id: 'tiny',
    title: 'Start ridiculously small',
    description:
      'The secret is starting so small that success feels inevitable.',
    emoji: '🔥',
    animation: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
    },
    quote: '"Make it so easy you can\'t say no."',
  },
  {
    id: 'showing-up',
    title: 'Showing up is enough',
    description:
      "Some days you'll do more, some days less. But showing up consistently is what builds your identity.",
    emoji: '✨',
    animation: {
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.1, 1],
    },
    quote: '"You showed up. That\'s enough. That\'s everything."',
  },
];

interface OnboardingExperienceProps {
  onComplete: () => void;
}

export function OnboardingExperience({
  onComplete,
}: OnboardingExperienceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    setShowParticles(true);
    const timer = setTimeout(() => setShowParticles(false), 3000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  const currentStepData = ONBOARDING_STEPS[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-celebration/5 flex items-center justify-center z-50 p-4"
        >
          {/* Floating particles background */}
          {showParticles && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`${currentStep}-particle-${i}`}
                  className="absolute text-2xl opacity-30"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: window.innerHeight + 50,
                    rotate: 0,
                    scale: 0,
                  }}
                  animate={{
                    y: -50,
                    rotate: 360,
                    scale: [0, 1, 0],
                    opacity: [0.3, 0.6, 0],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.2,
                    ease: 'easeOut',
                  }}
                >
                  {['✨', '🌟', '💫', '⭐', '🌠'][i % 5]}
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-background/95 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-2xl border border-primary/10"
          >
            {/* Progress indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-muted/20">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-celebration"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Step indicator dots */}
            <div className="flex justify-center space-x-2 mb-6 mt-4">
              {ONBOARDING_STEPS.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-primary' : 'bg-muted/30'
                  }`}
                  animate={
                    index === currentStep
                      ? {
                          scale: [1, 1.3, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Main emoji with animation */}
            <motion.div
              className="text-8xl mb-6 relative"
              animate={currentStepData?.animation as any}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {currentStepData?.emoji}

              {/* Sparkle effects */}
              {currentStep === 0 && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-yellow-400 text-lg"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                        repeatDelay: 4,
                      }}
                      style={{
                        left: `${20 + (i % 3) * 30}%`,
                        top: `${20 + Math.floor(i / 3) * 60}%`,
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-2xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentStepData?.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg text-muted-foreground mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentStepData?.description}
            </motion.p>

            {/* Quote */}
            {currentStepData?.quote && (
              <motion.div
                className="p-4 bg-primary/5 rounded-xl border border-primary/10 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm text-primary font-medium italic">
                  {currentStepData?.quote}
                </p>
              </motion.div>
            )}

            {/* Interactive element for identity step */}
            {currentStep === 1 && (
              <motion.div
                className="flex justify-center space-x-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {['🏃‍♂️', '📚', '🧘‍♀️', '🎨', '💪'].map((emoji, i) => (
                  <motion.div
                    key={i}
                    className="text-3xl p-2 rounded-full bg-primary/10 border border-primary/20 cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Action buttons */}
            <motion.div
              className="flex space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}

              <Button
                onClick={handleNext}
                className="bg-[rgb(72_95_72)] text-white hover:bg-[rgb(72_95_72)]/90 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg relative overflow-hidden flex-1 group"
              >
                {currentStep === ONBOARDING_STEPS.length - 1 ? (
                  <>
                    Start Journey
                    <Sparkles className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                  </>
                ) : (
                  <>
                    Next
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </motion.div>
                  </>
                )}
              </Button>
            </motion.div>

            {/* Skip option */}
            <motion.button
              className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleSkip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Skip introduction
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface WelcomeBackProps {
  userName?: string;
  lastActiveDate?: string;
  onContinue: () => void;
}

export function WelcomeBack({
  userName,
  lastActiveDate,
  onContinue,
}: WelcomeBackProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const daysSinceActive = lastActiveDate
    ? Math.floor(
        (Date.now() - new Date(lastActiveDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const getWelcomeMessage = () => {
    if (daysSinceActive === 0) return "Welcome back! Ready for today's wins?";
    if (daysSinceActive === 1)
      return 'Good to see you again! Yesterday is gone, today is yours.';
    if (daysSinceActive <= 7)
      return 'Welcome back! Every return is a new beginning.';
    return "We've missed you! Ready to start fresh?";
  };

  const getEmoji = () => {
    if (daysSinceActive === 0) return '🌟';
    if (daysSinceActive === 1) return '☀️';
    if (daysSinceActive <= 7) return '🌱';
    return '🦋';
  };

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-primary/10 to-celebration/10 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="bg-background rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-lg"
          >
            {/* Animated emoji */}
            <motion.div
              className="text-6xl mb-4"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {getEmoji()}
            </motion.div>

            {/* Welcome message */}
            <motion.h2
              className="text-2xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {getWelcomeMessage()}
            </motion.h2>

            {/* Personal touch */}
            {userName && (
              <motion.p
                className="text-lg text-muted-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Hello, {userName}! 👋
              </motion.p>
            )}

            {/* Continue button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={onContinue}
                className="bg-[rgb(72_95_72)] text-white hover:bg-[rgb(72_95_72)]/90 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg relative overflow-hidden px-8 py-6 text-lg group"
                size="lg"
              >
                Continue Journey
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>

            {/* Encouraging note */}
            <motion.p
              className="mt-6 text-sm text-primary font-medium italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              "Every expert was once a beginner. Every pro was once amateur."
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
