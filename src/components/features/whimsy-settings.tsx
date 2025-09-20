'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useHabitStore } from '@/stores/habit-store';
import { HoverDelight } from '@/components/ui/micro-interactions';
import { Sparkles, Volume2, VolumeX, Smile, Meh, Laugh } from 'lucide-react';

export function WhimsySettings() {
  const { whimsyLevel, setWhimsyLevel } = useHabitStore();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const whimsyLevels = [
    {
      id: 'minimal' as const,
      name: 'Minimal',
      description: 'Clean and simple, just the essentials',
      icon: <Meh className="h-6 w-6" />,
      color: 'text-muted-foreground',
      preview: 'Subtle animations and gentle feedback',
    },
    {
      id: 'normal' as const,
      name: 'Normal',
      description: 'Perfect balance of function and fun',
      icon: <Smile className="h-6 w-6" />,
      color: 'text-primary',
      preview: 'Delightful micro-interactions and celebrations',
    },
    {
      id: 'maximum' as const,
      name: 'Maximum',
      description: 'Full sparkle mode! All the joy!',
      icon: <Laugh className="h-6 w-6" />,
      color: 'text-celebration',
      preview: 'Confetti, particles, and maximum celebration!',
    },
  ];

  const handleWhimsyChange = (level: 'minimal' | 'normal' | 'maximum') => {
    setWhimsyLevel(level);
    setShowPreview(true);
    setTimeout(() => setShowPreview(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Whimsy Level Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-celebration" />
            Delight Level
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Choose how much whimsy and delight you want in your experience
          </p>

          <div className="grid gap-4">
            {whimsyLevels.map((level) => (
              <HoverDelight key={level.id} delightType="glow">
                <motion.div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    whimsyLevel === level.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30'
                  }`}
                  onClick={() => handleWhimsyChange(level.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={level.color}
                      animate={
                        whimsyLevel === level.id
                          ? { rotate: [0, 10, -10, 0] }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      {level.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {level.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {level.description}
                      </p>
                      <p className="text-xs text-primary mt-1">
                        {level.preview}
                      </p>
                    </div>
                    {whimsyLevel === level.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-primary"
                      >
                        ✓
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </HoverDelight>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sound Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {soundEnabled ? (
              <Volume2 className="h-5 w-5 text-primary" />
            ) : (
              <VolumeX className="h-5 w-5 text-muted-foreground" />
            )}
            Sound Effects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable sound effects</p>
              <p className="text-sm text-muted-foreground">
                Gentle audio feedback for actions and celebrations
              </p>
            </div>
            <HoverDelight delightType="bounce">
              <Button
                onClick={() => setSoundEnabled(!soundEnabled)}
                variant={soundEnabled ? 'default' : 'outline'}
                size="sm"
              >
                {soundEnabled ? 'On' : 'Off'}
              </Button>
            </HoverDelight>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Note */}
      <Card className="bg-info/5 border-info/20">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="text-info">💡</div>
            <div>
              <h4 className="font-medium text-info-foreground mb-1">
                Accessibility Note
              </h4>
              <p className="text-sm text-info-foreground/80">
                All animations respect your system's motion preferences. If you
                have "reduce motion" enabled, animations will be minimal
                regardless of your whimsy level setting.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Mode */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-4 right-4 bg-celebration text-white px-6 py-3 rounded-full shadow-lg z-50"
        >
          <motion.div
            animate={{
              scale: whimsyLevel === 'maximum' ? [1, 1.1, 1] : [1, 1.05, 1],
            }}
            transition={{ duration: 0.5 }}
          >
            {whimsyLevel === 'minimal' && '✨ Minimal mode activated'}
            {whimsyLevel === 'normal' && '🎭 Normal whimsy engaged!'}
            {whimsyLevel === 'maximum' && '🎉 MAXIMUM SPARKLE MODE! ✨🎊⭐'}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
