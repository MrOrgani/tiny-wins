'use client';
/* eslint-disable no-restricted-syntax */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Heart, Coffee, Lightbulb, Smile } from 'lucide-react';

interface ErrorStateProps {
  type: 'network' | 'validation' | 'generic' | 'maintenance' | 'permission';
  title?: string;
  message?: string;
  onRetry?: () => void;
  onSupport?: () => void;
  showSuggestions?: boolean;
}

const ERROR_CONTENT = {
  network: {
    emoji: '📡',
    title: "Oops! We're having trouble connecting",
    message:
      "Don't worry, it happens to the best of us. Let's try again in a moment.",
    suggestions: [
      'Check your internet connection',
      'Try refreshing the page',
      'Maybe grab a coffee while we sort this out ☕',
    ],
    encouragement:
      "Your habits are safe with us - we'll get you back on track!",
  },
  validation: {
    emoji: '🤔',
    title: "Hmm, something doesn't look quite right",
    message:
      "No worries! We all make little mistakes. Let's fix this together.",
    suggestions: [
      'Double-check the information you entered',
      'Make sure all required fields are filled',
      "Try a different approach if this one isn't working",
    ],
    encouragement:
      'Every expert was once a beginner who made mistakes and learned!',
  },
  generic: {
    emoji: '🌈',
    title: 'Something unexpected happened',
    message:
      "Even the best-laid plans sometimes go awry. Let's try a different path.",
    suggestions: [
      'Try refreshing the page',
      'Come back in a few minutes',
      'Contact us if this keeps happening',
    ],
    encouragement:
      'Resilience is built through overcoming little obstacles like this!',
  },
  maintenance: {
    emoji: '🔧',
    title: "We're making things even better!",
    message: "We're currently improving your experience. Be right back!",
    suggestions: [
      'Take a quick break',
      'Come back in a few minutes',
      'Use this time to plan your next habit',
    ],
    encouragement: 'Great things take time - just like building habits!',
  },
  permission: {
    emoji: '🔐',
    title: 'Access needed',
    message: 'We need a little permission to help you build amazing habits.',
    suggestions: [
      'Check your browser settings',
      'Allow the necessary permissions',
      'Try signing in again',
    ],
    encouragement: 'Security is important - thanks for being careful!',
  },
};

export function ErrorState({
  type,
  title,
  message,
  onRetry,
  onSupport,
  showSuggestions = true,
}: ErrorStateProps) {
  const [showEncouragement, setShowEncouragement] = useState(false);
  const content = ERROR_CONTENT[type];

  useEffect(() => {
    const timer = setTimeout(() => setShowEncouragement(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center space-y-6">
      {/* Floating comfort particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-lg opacity-20"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + Math.sin(i) * 20}%`,
            }}
          >
            {['💫', '🌟', '✨', '💝', '🍀', '🌻', '🦋', '🌈'][i]}
          </motion.div>
        ))}
      </div>

      {/* Main emoji with comforting animation */}
      <motion.div
        className="text-8xl mb-4 relative z-10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {content.emoji}

        {/* Gentle glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background:
              'radial-gradient(circle, rgba(118, 158, 84, 0.3) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Error title */}
      <motion.h2
        className="text-2xl font-bold text-foreground max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title || content.title}
      </motion.h2>

      {/* Error message */}
      <motion.p
        className="text-lg text-muted-foreground max-w-md leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {message || content.message}
      </motion.p>

      {/* Helpful suggestions */}
      {showSuggestions && content.suggestions && (
        <motion.div
          className="p-4 bg-amber/10 rounded-xl border border-amber/20 max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center mb-3">
            <Lightbulb className="h-5 w-5 text-amber mr-2" />
            <h3 className="font-medium text-amber-foreground">
              Here's what you can try:
            </h3>
          </div>
          <ul className="text-sm text-amber-foreground space-y-1 text-left">
            {content.suggestions.map((suggestion, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <span className="text-amber mr-2">•</span>
                {suggestion}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Action buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-[rgb(72_95_72)] text-white hover:bg-[rgb(72_95_72)]/90 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg relative overflow-hidden group"
            size="lg"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
            </motion.div>
            Try Again
          </Button>
        )}

        {onSupport && (
          <Button
            onClick={onSupport}
            variant="outline"
            size="lg"
            className="group"
          >
            <Heart className="h-4 w-4 mr-2 text-pink-500 group-hover:scale-110 transition-transform" />
            Get Help
          </Button>
        )}
      </motion.div>

      {/* Encouraging message */}
      <AnimatePresence>
        {showEncouragement && (
          <motion.div
            className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10 max-w-md"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.3 }}
          >
            <div className="flex items-center justify-center mb-2">
              <Smile className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">
                A gentle reminder
              </span>
            </div>
            <p className="text-sm text-primary/80 italic">
              {content.encouragement}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle breathing animation for zen effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl border border-primary/5"
        animate={{
          scale: [1, 1.01, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

interface ToastErrorProps {
  message: string;
  onClose: () => void;
  duration?: number;
  type?: 'gentle' | 'understanding' | 'encouraging';
}

export function ToastError({
  message,
  onClose,
  duration = 5000,
  type = 'gentle',
}: ToastErrorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    gentle: {
      bg: 'bg-amber/90',
      border: 'border-amber/30',
      text: 'text-amber-foreground',
      icon: <Heart className="h-4 w-4" />,
    },
    understanding: {
      bg: 'bg-blue/90',
      border: 'border-blue/30',
      text: 'text-blue-foreground',
      icon: <Coffee className="h-4 w-4" />,
    },
    encouraging: {
      bg: 'bg-primary/90',
      border: 'border-primary/30',
      text: 'text-primary-foreground',
      icon: <Lightbulb className="h-4 w-4" />,
    },
  };

  const style = typeStyles[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg ${style.bg} ${style.border} border backdrop-blur-sm shadow-lg max-w-sm`}
        >
          <div className={`flex items-start space-x-3 ${style.text}`}>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {style.icon}
            </motion.div>
            <div className="flex-1">
              <p className="text-sm font-medium leading-relaxed">{message}</p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-current/60 hover:text-current transition-colors"
            >
              <span className="sr-only">Close</span>×
            </button>
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-current/20 rounded-b-lg"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface InlineErrorProps {
  message: string;
  icon?: React.ReactNode;
  className?: string;
  shake?: boolean;
}

export function InlineError({
  message,
  icon,
  className = '',
  shake = false,
}: InlineErrorProps) {
  return (
    <motion.div
      className={`flex items-center space-x-2 p-3 bg-amber/10 border border-amber/20 rounded-lg ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        shake
          ? {
              opacity: 1,
              scale: 1,
              x: [-5, 5, -5, 5, 0],
            }
          : {
              opacity: 1,
              scale: 1,
            }
      }
      transition={{
        duration: shake ? 0.4 : 0.3,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {icon || <Heart className="h-4 w-4 text-amber flex-shrink-0" />}
      </motion.div>
      <p className="text-sm text-amber-foreground leading-relaxed">{message}</p>
    </motion.div>
  );
}
