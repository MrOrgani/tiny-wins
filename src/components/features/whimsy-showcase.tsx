'use client';
/* eslint-disable no-restricted-syntax */

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  WiggleButton,
  BouncyIcon,
  PulsingDot,
  MagneticButton,
  FloatingHeart,
  ParticleEffect,
} from '@/components/ui/micro-interactions';
import {
  DelightfulLoading,
  SkeletonHabitCard,
} from '@/components/ui/loading-states';
import { EmptyState, QuickEmptyState } from '@/components/ui/empty-states';
import {
  ErrorState,
  ToastError,
  InlineError,
} from '@/components/ui/error-states';
import {
  StreakCounter,
  StreakCelebration,
} from '@/components/features/streak-celebration';
import { SoundUtils } from '@/components/ui/sound-effects';
import { Heart, Star, Zap, Coffee, Sparkles, Target } from 'lucide-react';

interface WhimsyShowcaseProps {
  onClose: () => void;
}

type DemoSection =
  | 'micro-interactions'
  | 'loading-states'
  | 'empty-states'
  | 'error-states'
  | 'celebrations'
  | 'sounds';

export function WhimsyShowcase({ onClose }: WhimsyShowcaseProps) {
  const [activeSection, setActiveSection] =
    useState<DemoSection>('micro-interactions');
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(7);

  const sections = [
    {
      id: 'micro-interactions',
      label: 'Micro-Interactions',
      icon: <Star className="h-4 w-4" />,
    },
    {
      id: 'loading-states',
      label: 'Loading States',
      icon: <Zap className="h-4 w-4" />,
    },
    {
      id: 'empty-states',
      label: 'Empty States',
      icon: <Target className="h-4 w-4" />,
    },
    {
      id: 'error-states',
      label: 'Error States',
      icon: <Heart className="h-4 w-4" />,
    },
    {
      id: 'celebrations',
      label: 'Celebrations',
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      id: 'sounds',
      label: 'Sound Effects',
      icon: <Coffee className="h-4 w-4" />,
    },
  ] as const;

  const renderMicroInteractions = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Wiggle Button</CardTitle>
          </CardHeader>
          <CardContent>
            <WiggleButton
              className="bg-[rgb(72_95_72)] text-white hover:bg-[rgb(72_95_72)]/90 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg relative overflow-hidden"
              onClick={() => SoundUtils.playClick()}
            >
              Hover me! 🎭
            </WiggleButton>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bouncy Icon</CardTitle>
          </CardHeader>
          <CardContent>
            <BouncyIcon
              icon={<Heart className="h-8 w-8 text-pink-500" />}
              bounce="enthusiastic"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pulsing Dot</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <PulsingDot size="lg" speed="fast" />
            <span className="text-sm text-muted-foreground">
              Live indicator
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Magnetic Button</CardTitle>
          </CardHeader>
          <CardContent>
            <MagneticButton
              className="bg-[rgb(72_95_72)] text-white hover:bg-[rgb(72_95_72)]/90 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg relative overflow-hidden"
              onClick={() => {
                SoundUtils.playSparkle();
                setShowFloatingHearts(true);
              }}
            >
              Follow your cursor! ✨
            </MagneticButton>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Particle Effects</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setShowParticles(true)}
            className="bg-[rgb(133_94_161)] text-white hover:bg-[rgb(133_94_161)]/90 transform transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Trigger Particles! 🎊
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderLoadingStates = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Delightful Loading</CardTitle>
        </CardHeader>
        <CardContent>
          <DelightfulLoading
            variant="habit"
            size="md"
            messages={[
              'Building your identity... 🌱',
              'Your future self is getting excited... ✨',
              'Making magic happen... 🎭',
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Skeleton Loading</CardTitle>
        </CardHeader>
        <CardContent>
          <SkeletonHabitCard count={2} />
        </CardContent>
      </Card>
    </div>
  );

  const renderEmptyStates = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Encouraging Empty State</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState variant="habits" illustration="plant" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Empty State</CardTitle>
        </CardHeader>
        <CardContent>
          <QuickEmptyState
            icon={<Coffee className="h-8 w-8" />}
            message="Take a break, you've earned it! ☕"
          />
        </CardContent>
      </Card>
    </div>
  );

  const renderErrorStates = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Understanding Error</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorState
            type="validation"
            onRetry={() => SoundUtils.playNotification()}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Inline Error</CardTitle>
        </CardHeader>
        <CardContent>
          <InlineError
            message="Oops! Let's try that again. No worries - we all make mistakes! 💝"
            shake={true}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Toast Error</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShowToastError(true)} variant="outline">
            Show Toast Error
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderCelebrations = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Streak Counter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <StreakCounter streak={currentStreak} size="lg" />
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() =>
                  setCurrentStreak((prev) => Math.max(0, prev - 1))
                }
              >
                -
              </Button>
              <Button
                size="sm"
                onClick={() => setCurrentStreak((prev) => prev + 1)}
              >
                +
              </Button>
            </div>
          </div>
          <Button
            onClick={() => setShowStreakCelebration(true)}
            className="bg-[rgb(133_94_161)] text-white hover:bg-[rgb(133_94_161)]/90 transform transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Celebrate Streak! 🏆
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Achievement Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            {['🌱', '🔥', '⚡', '🏆', '👑'].map((emoji, i) => (
              <motion.div
                key={i}
                className="text-4xl cursor-pointer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  SoundUtils.playCelebration();
                  setShowFloatingHearts(true);
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSounds = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sound Effects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button onClick={SoundUtils.playSuccess} variant="outline">
              Success 🎵
            </Button>
            <Button onClick={SoundUtils.playCelebration} variant="outline">
              Celebration 🎉
            </Button>
            <Button onClick={SoundUtils.playNotification} variant="outline">
              Notification 🔔
            </Button>
            <Button onClick={SoundUtils.playNeedsAttention} variant="outline">
              Needs Attention 🤔
            </Button>
            <Button onClick={SoundUtils.playClick} variant="outline">
              Click 👆
            </Button>
            <Button onClick={SoundUtils.playSparkle} variant="outline">
              Sparkle ✨
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Note: Sounds include gentle haptic feedback when supported by your
            device.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'micro-interactions':
        return renderMicroInteractions();
      case 'loading-states':
        return renderLoadingStates();
      case 'empty-states':
        return renderEmptyStates();
      case 'error-states':
        return renderErrorStates();
      case 'celebrations':
        return renderCelebrations();
      case 'sounds':
        return renderSounds();
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-background rounded-2xl p-6 max-w-4xl max-h-[90vh] w-full overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Whimsy Showcase
              </h2>
              <p className="text-muted-foreground">
                Explore the delightful interactions in Tiny Wins
              </p>
            </div>
            <Button onClick={onClose} variant="ghost" size="icon">
              ×
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {sections.map((section) => (
              <Button
                key={section.id}
                onClick={() => setActiveSection(section.id as DemoSection)}
                variant={activeSection === section.id ? 'default' : 'outline'}
                size="sm"
                className={`${activeSection === section.id ? 'bg-[rgb(72_95_72)] text-white hover:bg-[rgb(72_95_72)]/90 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg relative overflow-hidden' : ''} flex items-center space-x-2`}
              >
                {section.icon}
                <span>{section.label}</span>
              </Button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveSection()}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Effects */}
      <FloatingHeart
        trigger={showFloatingHearts}
        onComplete={() => setShowFloatingHearts(false)}
      />

      <ParticleEffect
        trigger={showParticles}
        onComplete={() => setShowParticles(false)}
        particleCount={15}
        duration={3}
      />

      <AnimatePresence>
        {showToastError && (
          <ToastError
            message="This is a gentle, understanding error message that doesn't make you feel bad! 💝"
            onClose={() => setShowToastError(false)}
            type="understanding"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showStreakCelebration && (
          <StreakCelebration
            currentStreak={currentStreak}
            onClose={() => setShowStreakCelebration(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
