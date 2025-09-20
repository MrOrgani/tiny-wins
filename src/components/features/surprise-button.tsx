'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useHabitStore } from '@/stores/habit-store';
import {
  CongratsExplosion,
  RandomEncouragement,
  SuccessRipple,
  FloatingHeart,
} from '@/components/ui/micro-interactions';
import { SoundUtils } from '@/components/ui/sound-effects';
import { Gift } from 'lucide-react';

interface SurpriseButtonProps {
  className?: string;
  variant?: 'floating' | 'inline';
}

export function SurpriseButton({
  className = '',
  variant = 'inline',
}: SurpriseButtonProps) {
  const { whimsyLevel, getRandomCelebrationMessage } = useHabitStore();
  const [isActive, setIsActive] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [lastSurpriseTime, setLastSurpriseTime] = useState(0);

  const surpriseEffects = [
    {
      id: 'explosion',
      component: CongratsExplosion,
      trigger: showExplosion,
      setter: setShowExplosion,
    },
    {
      id: 'encouragement',
      component: RandomEncouragement,
      trigger: showEncouragement,
      setter: setShowEncouragement,
    },
    {
      id: 'ripple',
      component: SuccessRipple,
      trigger: showRipple,
      setter: setShowRipple,
    },
    {
      id: 'hearts',
      component: FloatingHeart,
      trigger: showHearts,
      setter: setShowHearts,
    },
  ];

  const handleSurprise = () => {
    const now = Date.now();

    // Prevent spam clicking (minimum 3 seconds between surprises)
    if (now - lastSurpriseTime < 3000) {
      return;
    }

    setLastSurpriseTime(now);
    setIsActive(true);

    // Play celebration sound
    SoundUtils.playCelebration();

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }

    // Trigger random effects based on whimsy level
    const effectCount =
      whimsyLevel === 'minimal' ? 1 : whimsyLevel === 'normal' ? 2 : 3;
    const availableEffects = [...surpriseEffects];

    for (let i = 0; i < effectCount; i++) {
      if (availableEffects.length === 0) break;

      const randomIndex = Math.floor(Math.random() * availableEffects.length);
      const effect = availableEffects.splice(randomIndex, 1)[0];

      setTimeout(() => {
        effect?.setter(true);
      }, i * 300);
    }

    // Show celebration message in console for power users
    if (whimsyLevel === 'maximum') {
      // Celebration message for power users
      // eslint-disable-next-line no-console
      console.log(`🎉 SURPRISE! ${getRandomCelebrationMessage()}`);
    }

    // Reset active state
    setTimeout(() => {
      setIsActive(false);
    }, 2000);
  };

  // Reset effects function available for future use
  // const resetEffects = () => {
  //   setShowExplosion(false);
  //   setShowEncouragement(false);
  //   setShowRipple(false);
  //   setShowHearts(false);
  // };

  const buttonContent = (
    <>
      <motion.div
        animate={
          isActive
            ? {
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
              }
            : {}
        }
        transition={{ duration: 0.8 }}
      >
        <Gift className="h-5 w-5" />
      </motion.div>
      <span>Surprise Me!</span>
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ✨
      </motion.div>
    </>
  );

  if (variant === 'floating') {
    return (
      <>
        <motion.div
          className="fixed bottom-20 right-4 z-40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            bounce: 0.5,
            delay: 2, // Appear after other elements
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Button
              onClick={handleSurprise}
              disabled={isActive}
              className={`bg-[rgb(133_94_161)] text-white hover:bg-[rgb(133_94_161)]/90 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl ${className}`}
              size="lg"
            >
              {buttonContent}
            </Button>
          </motion.div>
        </motion.div>

        {/* Effects */}
        <CongratsExplosion
          trigger={showExplosion}
          onComplete={() => setShowExplosion(false)}
          intensity={
            whimsyLevel === 'minimal'
              ? 'gentle'
              : whimsyLevel === 'normal'
                ? 'medium'
                : 'intense'
          }
        />

        <RandomEncouragement
          trigger={showEncouragement}
          onComplete={() => setShowEncouragement(false)}
        />

        <SuccessRipple
          trigger={showRipple}
          onComplete={() => setShowRipple(false)}
          color="#A855F7"
        />

        <FloatingHeart
          trigger={showHearts}
          onComplete={() => setShowHearts(false)}
        />
      </>
    );
  }

  return (
    <>
      <Button
        onClick={handleSurprise}
        disabled={isActive}
        className={`bg-[rgb(133_94_161)] text-white hover:bg-[rgb(133_94_161)]/90 transform transition-all duration-200 hover:scale-105 shadow-lg relative overflow-hidden ${isActive ? 'animate-pulse' : ''} ${className}`}
        size="lg"
      >
        {/* Shimmer effect when active */}
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: [-100, 300] }}
            transition={{ duration: 1, repeat: 2 }}
          />
        )}

        {buttonContent}
      </Button>

      {/* Effects */}
      <CongratsExplosion
        trigger={showExplosion}
        onComplete={() => setShowExplosion(false)}
        intensity={
          whimsyLevel === 'minimal'
            ? 'gentle'
            : whimsyLevel === 'normal'
              ? 'medium'
              : 'intense'
        }
      />

      <RandomEncouragement
        trigger={showEncouragement}
        onComplete={() => setShowEncouragement(false)}
      />

      <SuccessRipple
        trigger={showRipple}
        onComplete={() => setShowRipple(false)}
        color="#A855F7"
      />

      <FloatingHeart
        trigger={showHearts}
        onComplete={() => setShowHearts(false)}
      />
    </>
  );
}

// Easter egg component that appears on special occasions
export function SurpriseEasterEgg() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggMessage, setEasterEggMessage] = useState('');

  const checkForEasterEgg = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const day = now.getDay();

    // Special times for easter eggs
    if (hour === 11 && minute === 11) {
      setEasterEggMessage('11:11 - Make a wish! 🌟');
      setShowEasterEgg(true);
    } else if (hour === 0 && minute === 0) {
      setEasterEggMessage('Midnight magic! ✨🌙');
      setShowEasterEgg(true);
    } else if (day === 0 && hour === 10) {
      setEasterEggMessage('Sunday vibes! 🌈☀️');
      setShowEasterEgg(true);
    } else if (day === 5 && hour >= 17) {
      setEasterEggMessage('Friday feeling! 🎉');
      setShowEasterEgg(true);
    }

    if (showEasterEgg) {
      setTimeout(() => {
        setShowEasterEgg(false);
      }, 5000);
    }
  };

  // Check every minute
  useState(() => {
    const interval = setInterval(checkForEasterEgg, 60000);
    checkForEasterEgg(); // Check immediately
    return () => clearInterval(interval);
  });

  if (!showEasterEgg) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      className="fixed top-20 right-4 bg-gradient-to-r from-celebration to-primary text-white px-6 py-4 rounded-2xl shadow-lg z-50 max-w-xs"
    >
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <p className="font-medium text-center">{easterEggMessage}</p>
      </motion.div>
    </motion.div>
  );
}
