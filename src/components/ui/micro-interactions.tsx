'use client';

import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Heart, Sparkles, Zap, Sun, Moon } from 'lucide-react';

interface FloatingHeartProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function FloatingHeart({ trigger, onComplete }: FloatingHeartProps) {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  useEffect(() => {
    if (trigger) {
      const newHearts = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 50 + 25,
      }));
      setHearts(newHearts);

      const timer = setTimeout(() => {
        setHearts([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [trigger, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              opacity: 0,
              scale: 0,
              x: `${heart.x}vw`,
              y: `${heart.y}vh`,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1.2, 0],
              y: `${heart.y - 30}vh`,
              rotate: [0, 10, -10, 0],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 3,
              ease: 'easeOut',
            }}
            className="absolute"
          >
            <Heart className="h-6 w-6 text-pink-500 fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface WiggleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
}

export function WiggleButton({
  children,
  onClick,
  className = '',
  intensity = 'medium',
}: WiggleButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const wiggleIntensity = {
    subtle: { rotate: [-1, 1, -1, 0], scale: [1, 1.02, 1] },
    medium: { rotate: [-2, 2, -2, 0], scale: [1, 1.05, 1] },
    strong: { rotate: [-5, 5, -5, 0], scale: [1, 1.1, 1] },
  };

  return (
    <motion.button
      className={`transition-all duration-200 ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={isHovered ? wiggleIntensity[intensity] : {}}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

interface BouncyIconProps {
  icon: React.ReactNode;
  delay?: number;
  duration?: number;
  bounce?: 'gentle' | 'medium' | 'enthusiastic';
}

export function BouncyIcon({
  icon,
  delay = 0,
  duration = 2,
  bounce = 'medium',
}: BouncyIconProps) {
  const bounceIntensity = {
    gentle: [-2, 0],
    medium: [-5, 0],
    enthusiastic: [-10, 0],
  };

  return (
    <motion.div
      animate={{
        y: bounceIntensity[bounce],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      {icon}
    </motion.div>
  );
}

interface PulsingDotProps {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  speed?: 'slow' | 'medium' | 'fast';
}

export function PulsingDot({
  color = 'primary',
  size = 'md',
  speed = 'medium',
}: PulsingDotProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const speedDuration = {
    slow: 3,
    medium: 2,
    fast: 1,
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} bg-${color} rounded-full`}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: speedDuration[speed],
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

interface ShakeOnErrorProps {
  children: React.ReactNode;
  shake: boolean;
  onShakeComplete?: () => void;
}

export function ShakeOnError({
  children,
  shake,
  onShakeComplete,
}: ShakeOnErrorProps) {
  return (
    <motion.div
      animate={
        shake
          ? {
              x: [-10, 10, -10, 10, 0],
              rotate: [-1, 1, -1, 1, 0],
            }
          : {}
      }
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        onComplete: onShakeComplete,
      }}
    >
      {children}
    </motion.div>
  );
}

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className = '',
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(
        () => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        },
        currentIndex === 0 ? delay : speed
      );

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
    return undefined;
  }, [currentIndex, text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  magnetStrength?: number;
}

export function MagneticButton({
  children,
  onClick,
  className = '',
  magnetStrength = 20,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) / magnetStrength;
    const distanceY = (e.clientY - centerY) / magnetStrength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

interface ParticleEffectProps {
  trigger: boolean;
  particleCount?: number;
  colors?: string[];
  duration?: number;
  onComplete?: () => void;
}

export function ParticleEffect({
  trigger,
  particleCount = 10,
  colors = ['#fbbf24', '#f59e0b', '#d97706', '#92400e'],
  duration = 2,
  onComplete,
}: ParticleEffectProps) {
  const [particles, setParticles] = useState<
    { id: number; color: string; x: number; y: number }[]
  >([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: Date.now() + i,
        color: colors[Math.floor(Math.random() * colors.length)] || '#000000',
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));

      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, duration * 1000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [trigger, particleCount, colors, duration, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: particle.color,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{
              opacity: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 360],
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface EasterEggProps {
  trigger: string; // sequence of keys to trigger
  onActivate: () => void;
}

export function EasterEgg({ trigger, onActivate }: EasterEggProps) {
  const [, setKeySequence] = useState('');
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setKeySequence((prev) => {
        const newSequence = (prev + e.key).slice(-trigger.length);
        if (newSequence === trigger) {
          setIsActivated(true);
          onActivate();
          // Reset after animation
          setTimeout(() => setIsActivated(false), 3000);
          return '';
        }
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [trigger, onActivate]);

  return (
    <AnimatePresence>
      {isActivated && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <motion.div
            className="text-6xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            🎉
          </motion.div>
          <motion.p
            className="text-center text-primary font-bold mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Easter Egg Found!
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface TimeBasedGreetingProps {
  className?: string;
}

export function TimeBasedGreeting({ className = '' }: TimeBasedGreetingProps) {
  const [greeting, setGreeting] = useState('');
  const [icon, setIcon] = useState<React.ReactNode>(null);
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    const isWeekend = day === 0 || day === 6;

    if (hour < 6) {
      setGreeting("Still up? You're dedicated! 🌙");
      setIcon(<Moon className="h-4 w-4 text-blue-400" />);
    } else if (hour < 12) {
      const morningGreetings = [
        'Good morning, habit builder! ☀️',
        "Rise and shine! Today's your day! ✨",
        'Morning motivation activated! 🚀',
        'Another chance to be amazing! 🌅',
      ];
      setGreeting(
        isWeekend
          ? 'Weekend warrior mode! 💪'
          : morningGreetings[
              Math.floor(Math.random() * morningGreetings.length)
            ] || 'Good morning!'
      );
      setIcon(<Sun className="h-4 w-4 text-yellow-500" />);
    } else if (hour < 17) {
      const afternoonGreetings = [
        'Good afternoon! Time to show up! ⚡',
        'Afternoon energy boost! 🔋',
        "Halfway through - you've got this! 💪",
        'Momentum building mode! 🌟',
      ];
      setGreeting(
        afternoonGreetings[
          Math.floor(Math.random() * afternoonGreetings.length)
        ] || 'Good afternoon!'
      );
      setIcon(<Zap className="h-4 w-4 text-orange-500" />);
    } else if (hour < 21) {
      setGreeting("Good evening! Let's wrap up strong! 🌅");
      setIcon(<Sparkles className="h-4 w-4 text-purple-500" />);
    } else {
      setGreeting('Good night! Rest well, winner! 🌙');
      setIcon(<Moon className="h-4 w-4 text-blue-400" />);
    }

    // Special messages for certain times
    if (hour === 11 && now.getMinutes() >= 11 && now.getMinutes() <= 13) {
      setShowSpecialMessage(true);
      setGreeting('11:11 - Make a habit wish! ✨');
    }
  }, []);

  return (
    <motion.div
      className={`flex items-center space-x-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BouncyIcon
        icon={icon}
        bounce={showSpecialMessage ? 'enthusiastic' : 'medium'}
      />
      <TypewriterText
        text={greeting}
        speed={showSpecialMessage ? 20 : 30}
        className={
          showSpecialMessage ? 'text-celebration font-bold' : 'system-quote'
        }
      />
    </motion.div>
  );
}

// New whimsical components to enhance the app

interface RandomEncouragementProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function RandomEncouragement({
  trigger,
  onComplete,
}: RandomEncouragementProps) {
  const encouragements = useMemo(
    () => [
      { text: "You're doing amazing!", emoji: '🌟', color: 'text-yellow-500' },
      { text: 'Keep being awesome!', emoji: '🚀', color: 'text-blue-500' },
      { text: "You're unstoppable!", emoji: '💪', color: 'text-green-500' },
      { text: 'Believe in yourself!', emoji: '✨', color: 'text-purple-500' },
      { text: "You've got this!", emoji: '🔥', color: 'text-orange-500' },
      { text: 'Proud of you!', emoji: '🏆', color: 'text-amber-500' },
      { text: "You're growing!", emoji: '🌱', color: 'text-green-600' },
      { text: 'Stay consistent!', emoji: '⚡', color: 'text-blue-400' },
    ],
    []
  );

  const [currentEncouragement, setCurrentEncouragement] = useState(
    encouragements[0]
  );

  useEffect(() => {
    if (trigger) {
      const randomEncouragement =
        encouragements[Math.floor(Math.random() * encouragements.length)];
      setCurrentEncouragement(randomEncouragement);

      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, onComplete, encouragements]);

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: -50 }}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
        >
          <motion.div
            className="bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm flex items-center space-x-2"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="text-2xl">{currentEncouragement?.emoji}</span>
            <span className="font-medium">{currentEncouragement?.text}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface CongratsExplosionProps {
  trigger: boolean;
  onComplete?: () => void;
  intensity?: 'gentle' | 'medium' | 'intense';
}

export function CongratsExplosion({
  trigger,
  onComplete,
  intensity = 'medium',
}: CongratsExplosionProps) {
  const getParticleCount = useCallback(() => {
    switch (intensity) {
      case 'gentle':
        return 8;
      case 'medium':
        return 15;
      case 'intense':
        return 25;
      default:
        return 15;
    }
  }, [intensity]);

  const getEmojis = useCallback(() => {
    const emojiSets = {
      gentle: ['🌟', '✨', '💫'],
      medium: ['🎉', '🎊', '✨', '🌟', '💫', '🎈'],
      intense: ['🎉', '🎊', '✨', '🌟', '💫', '🎈', '🏆', '👏', '🚀', '💎'],
    };
    return emojiSets[intensity];
  }, [intensity]);

  const [particles, setParticles] = useState<
    Array<{ id: number; emoji: string; x: number; y: number; delay: number }>
  >([]);

  useEffect(() => {
    if (trigger) {
      const emojis = getEmojis();
      const newParticles = Array.from(
        { length: getParticleCount() },
        (_, i) => ({
          id: Date.now() + i,
          emoji: emojis[Math.floor(Math.random() * emojis.length)] || '🎉',
          x: 50 + (Math.random() - 0.5) * 60,
          y: 50 + (Math.random() - 0.5) * 40,
          delay: i * 0.1,
        })
      );

      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 4000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [trigger, intensity, onComplete, getEmojis, getParticleCount]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-4xl"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{
              opacity: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1.5, 1, 0],
              rotate: [0, 360, 720],
              x: [(Math.random() - 0.5) * 200],
              y: [0, -100, -200],
            }}
            transition={{
              duration: 3,
              delay: particle.delay,
              ease: 'easeOut',
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ProgressCheerProps {
  progress: number;
  milestone?: number;
  className?: string;
}

export function ProgressCheer({
  progress,
  milestone = 50,
  className = '',
}: ProgressCheerProps) {
  const [showCheer, setShowCheer] = useState(false);
  const [lastMilestone, setLastMilestone] = useState(0);

  useEffect(() => {
    if (progress >= milestone && lastMilestone < milestone) {
      setShowCheer(true);
      setLastMilestone(milestone);

      const timer = setTimeout(() => {
        setShowCheer(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [progress, milestone, lastMilestone]);

  const getCheerMessage = () => {
    if (progress >= 100) return 'You did it! 🎉';
    if (progress >= 75) return 'Almost there! 🚀';
    if (progress >= 50) return 'Halfway hero! ⭐';
    if (progress >= 25) return 'Great start! 🌟';
    return 'Keep going! 💪';
  };

  return (
    <div className={`relative ${className}`}>
      <div className="w-full bg-muted/20 h-3 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-celebration rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      <AnimatePresence>
        {showCheer && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -30, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-celebration text-white px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap shadow-lg"
          >
            {getCheerMessage()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SuccessRippleProps {
  trigger: boolean;
  onComplete?: () => void;
  color?: string;
}

export function SuccessRipple({
  trigger,
  onComplete: _onComplete,
  color = '#22C55E',
}: SuccessRippleProps) {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 rounded-full border-2"
              style={{
                borderColor: color,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{
                width: 0,
                height: 0,
                opacity: 0.8,
              }}
              animate={{
                width: `${200 + i * 100}vw`,
                height: `${200 + i * 100}vw`,
                opacity: 0,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface HoverDelightProps {
  children: React.ReactNode;
  delightType?: 'sparkle' | 'bounce' | 'glow' | 'wiggle';
  className?: string;
}

export function HoverDelight({
  children,
  delightType = 'sparkle',
  className = '',
}: HoverDelightProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (delightType === 'sparkle') {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
    }
  };

  const getAnimation = () => {
    switch (delightType) {
      case 'bounce':
        return isHovered ? { y: [-2, 2, -2] } : {};
      case 'glow':
        return isHovered ? { scale: [1, 1.02, 1] } : {};
      case 'wiggle':
        return isHovered ? { rotate: [-1, 1, -1, 0] } : {};
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      animate={getAnimation()}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}

      {delightType === 'sparkle' && showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-400 text-xs"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}

      {delightType === 'glow' && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-primary/20 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ filter: 'blur(8px)' }}
        />
      )}
    </motion.div>
  );
}
