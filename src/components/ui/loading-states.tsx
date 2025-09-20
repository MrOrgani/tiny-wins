'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface DelightfulLoadingProps {
  messages?: string[];
  duration?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'habit' | 'identity' | 'general';
}

const DEFAULT_MESSAGES = {
  habit: [
    'Growing your tiny win... 🌱',
    'Building momentum... 🚀',
    'Your future self is getting excited... ✨',
    'Adding another brick to your identity... 🧱',
    'Showing up for yourself... 💪',
    'Making magic happen... ✨',
  ],
  identity: [
    "Discovering who you're becoming... 🦋",
    'Your identity is taking shape... 🎨',
    'Building the person you want to be... 🏗️',
    'Every moment shapes your story... 📖',
    'Your journey is unique and beautiful... 🌟',
  ],
  general: [
    'Working behind the scenes... 🎭',
    'Sprinkling some magic... ✨',
    'Almost there... 🏃‍♀️',
    'Good things are coming... 🌈',
    'Just a moment more... ⏰',
  ],
};

export function DelightfulLoading({
  messages,
  duration = 3000,
  size = 'md',
  variant = 'general',
}: DelightfulLoadingProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const loadingMessages = messages || DEFAULT_MESSAGES[variant];

  useEffect(() => {
    if (loadingMessages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, duration / loadingMessages.length);

    return () => clearInterval(interval);
  }, [loadingMessages.length, duration]);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      {/* Animated loading spinner with personality */}
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} rounded-full border-4 border-primary/20`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-4 border-transparent border-t-primary`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating particles around spinner */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full"
            animate={{
              x: [0, Math.cos((i * Math.PI) / 3) * 24, 0],
              y: [0, Math.sin((i * Math.PI) / 3) * 24, 0],
              opacity: [0.5, 1, 0.5],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Rotating messages */}
      <motion.div
        key={currentMessageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-center min-h-[1.5rem]"
      >
        <p className="text-sm text-muted-foreground font-medium">
          {loadingMessages[currentMessageIndex]}
        </p>
      </motion.div>

      {/* Progress dots */}
      <div className="flex space-x-1">
        {loadingMessages.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentMessageIndex ? 'bg-primary' : 'bg-primary/20'
            }`}
            animate={
              index === currentMessageIndex
                ? {
                    scale: [1, 1.2, 1],
                  }
                : {}
            }
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
    </div>
  );
}

interface SkeletonHabitCardProps {
  count?: number;
}

export function SkeletonHabitCard({ count = 1 }: SkeletonHabitCardProps) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-6 bg-card border rounded-lg space-y-3"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-muted/20 animate-pulse rounded w-8 h-8 rounded-full" />
            <div className="h-4 bg-muted/20 rounded animate-pulse flex-1" />
          </div>
          <div className="h-4 bg-muted/20 rounded animate-pulse w-3/4 mb-4" />
          <div className="h-12 bg-muted/20 rounded animate-pulse" />
        </motion.div>
      ))}
    </div>
  );
}

interface PulsingDotsProps {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PulsingDots({
  color = 'primary',
  size = 'md',
}: PulsingDotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className="flex space-x-1 items-center">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`${sizeClasses[size]} bg-${color} rounded-full`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
