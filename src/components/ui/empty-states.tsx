'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Sparkles } from 'lucide-react';
import { HoverDelight } from './micro-interactions';

interface EmptyStateProps {
  variant: 'habits' | 'identity' | 'streak' | 'today' | 'recovery';
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  illustration?: 'plant' | 'target' | 'mountain' | 'sunrise' | 'butterfly';
}

const ILLUSTRATIONS = {
  plant: {
    emoji: '🌱',
    animation: {
      y: [0, -5, 0],
      rotate: [0, 2, -2, 0],
    },
    particles: ['🌿', '💚', '✨'],
  },
  target: {
    emoji: '🎯',
    animation: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
    },
    particles: ['⭐', '🎪', '🎭'],
  },
  mountain: {
    emoji: '🏔️',
    animation: {
      y: [0, -3, 0],
    },
    particles: ['☁️', '🌟', '⛰️'],
  },
  sunrise: {
    emoji: '🌅',
    animation: {
      scale: [1, 1.05, 1],
      rotate: [0, 1, -1, 0],
    },
    particles: ['☀️', '🌈', '✨'],
  },
  butterfly: {
    emoji: '🦋',
    animation: {
      x: [0, 10, -10, 0],
      y: [0, -5, 0],
      rotate: [0, 5, -5, 0],
    },
    particles: ['🌸', '💫', '🌺'],
  },
};

const EMPTY_STATE_CONTENT = {
  habits: {
    title: 'Your journey starts here',
    description:
      'Every expert was once a beginner. Every pro was once an amateur. Every icon was once an unknown.',
    actionText: 'Create Your First Habit',
    actionHref: '/create-habit',
    illustration: 'plant' as const,
  },
  identity: {
    title: 'Who are you becoming?',
    description:
      'Your identity emerges from your actions. Choose who you want to be, then prove it to yourself with small wins.',
    actionText: 'Choose Your Identity',
    actionHref: '/create-habit',
    illustration: 'butterfly' as const,
  },
  streak: {
    title: 'Your streak begins today',
    description:
      'Consistency is the mother of mastery. One day at a time, one choice at a time.',
    actionText: 'Start Building',
    actionHref: '/create-habit',
    illustration: 'mountain' as const,
  },
  today: {
    title: 'Today is full of possibilities',
    description:
      'What if today is the day you take one small step toward who you want to become?',
    actionText: 'Show Up Today',
    illustration: 'sunrise' as const,
  },
  recovery: {
    title: 'Rest is part of growth',
    description:
      "Even the strongest trees bend in the storm. Take the time you need - your habits will be here when you're ready.",
    actionText: "I'm Ready to Return",
    illustration: 'plant' as const,
  },
};

export function EmptyState({
  variant,
  title,
  description,
  actionText,
  actionHref,
  onAction,
  illustration,
}: EmptyStateProps) {
  const content = EMPTY_STATE_CONTENT[variant];
  const illustrationData = ILLUSTRATIONS[illustration || content.illustration];

  const finalTitle = title || content.title;
  const finalDescription = description || content.description;
  const finalActionText = actionText || content.actionText;
  const finalActionHref = actionHref || (content as any).actionHref;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center space-y-6">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {illustrationData.particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 2,
            }}
            style={{
              left: `${10 + i * 25}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          >
            {particle}
          </motion.div>
        ))}
      </div>

      {/* Main illustration */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-8xl mb-4 relative z-10"
          animate={illustrationData.animation}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {illustrationData.emoji}
        </motion.div>

        {/* Enhanced sparkle effects around main illustration */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400 text-lg"
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              rotate: [0, 180, 360],
              x: [0, (Math.random() - 0.5) * 20],
              y: [0, (Math.random() - 0.5) * 20],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
            }}
            style={{
              left: `${15 + (i % 4) * 25}%`,
              top: `${15 + Math.floor(i / 4) * 35}%`,
            }}
          >
            {['✨', '🌟', '💫', '⭐'][i % 4]}
          </motion.div>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        className="space-y-4 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold leading-snug text-foreground">
          {finalTitle}
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
          {finalDescription}
        </p>
      </motion.div>

      {/* Action button */}
      {(finalActionHref || onAction) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {finalActionHref ? (
            <Link href={finalActionHref}>
              <HoverDelight delightType="bounce">
                <Button
                  className="bg-[rgb(72_95_72)] text-white hover:bg-[rgb(72_95_72)]/90 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg relative overflow-hidden text-lg px-8 py-6 min-h-[48px] min-w-[48px] group"
                  size="lg"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  </motion.div>
                  {finalActionText}
                  <motion.div
                    className="ml-2"
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    ✨
                  </motion.div>
                </Button>
              </HoverDelight>
            </Link>
          ) : (
            <HoverDelight delightType="bounce">
              <Button
                onClick={onAction}
                className="bg-[rgb(72_95_72)] text-white hover:bg-[rgb(72_95_72)]/90 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg relative overflow-hidden text-lg px-8 py-6 min-h-[48px] min-w-[48px]"
                size="lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                {finalActionText}
              </Button>
            </HoverDelight>
          )}
        </motion.div>
      )}

      {/* Encouraging quote with gentle glow */}
      <motion.div
        className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10 max-w-md relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {/* Subtle shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
          animate={{ x: [-100, 400] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'easeInOut',
          }}
        />
        <p className="text-sm text-primary font-medium italic relative z-10">
          {variant === 'habits' &&
            '"You do not rise to the level of your goals. You fall to the level of your systems."'}
          {variant === 'identity' &&
            '"Every action you take is a vote for the type of person you wish to become."'}
          {variant === 'streak' &&
            '"Success is the sum of small efforts repeated day in and day out."'}
          {variant === 'today' &&
            '"A year from now you may wish you had started today."'}
          {variant === 'recovery' &&
            '"Be gentle with yourself. You are a child of the universe, no less than the trees and stars."'}
        </p>
      </motion.div>
    </div>
  );
}

interface QuickEmptyStateProps {
  icon: React.ReactNode;
  message: string;
  className?: string;
}

export function QuickEmptyState({
  icon,
  message,
  className = '',
}: QuickEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center p-8 text-center space-y-3 ${className}`}
    >
      <motion.div
        className="text-4xl text-muted-foreground/60"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {icon}
      </motion.div>
      <p className="text-sm text-[rgb(55_65_81)] leading-relaxed">{message}</p>
    </motion.div>
  );
}
