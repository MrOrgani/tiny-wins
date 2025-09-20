'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHabitStore } from '@/stores/habit-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  User,
  Palette,
  Bell,
  Shield,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { WhimsySettings } from '@/components/features/whimsy-settings';

export default function SettingsPage() {
  const router = useRouter();
  const { selectedIdentity, activeHabits, userProgress } = useHabitStore();
  const [showWhimsySettings, setShowWhimsySettings] = useState(false);

  const settingsOptions = [
    {
      icon: User,
      title: 'Identity & Habits',
      description: 'Manage your identity and habits',
      badge: `${activeHabits.length} habits`,
      action: () => router.push('/'),
    },
    {
      icon: Sparkles,
      title: 'Whimsy & Delight',
      description: 'Control your level of joy and celebration',
      badge: 'New!',
      action: 'whimsy',
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize your experience',
      badge: 'Coming soon',
      action: () => {},
      disabled: true,
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Gentle reminders to show up',
      badge: 'Coming soon',
      action: () => {},
      disabled: true,
    },
    {
      icon: Shield,
      title: 'Privacy',
      description: 'Your data stays on your device',
      badge: 'Offline first',
      action: () => {},
      disabled: true,
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Learn more about Tiny Wins',
      badge: '',
      action: () => {},
      disabled: true,
    },
  ];

  return (
    <main className="[padding-top:env(safe-area-inset-top)] [padding-bottom:env(safe-area-inset-bottom)] [padding-left:env(safe-area-inset-left)] [padding-right:env(safe-area-inset-right)] min-h-screen bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-4 p-4 border-b border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className=""
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        </header>

        <div className="flex-1 p-4 space-y-6">
          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">
                    {selectedIdentity?.emoji || '🌱'}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">
                      {selectedIdentity
                        ? `${selectedIdentity.name}`
                        : 'Getting Started'}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {userProgress.totalShowUps} total show-ups
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Settings Options */}
          <div className="space-y-4">
            {settingsOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-200 ${
                    option.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:shadow-md hover:border-primary/30'
                  }`}
                  onClick={
                    option.disabled
                      ? undefined
                      : option.action === 'whimsy'
                        ? () => setShowWhimsySettings(true)
                        : typeof option.action === 'function'
                          ? option.action
                          : undefined
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <option.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {option.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      {option.badge && (
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {option.badge}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* App Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center space-y-4 pt-8"
          >
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Tiny Wins</p>
              <p>Psychology-first habit building</p>
              <p className="mt-2 italic">
                &quot;You showed up. That&apos;s enough. That&apos;s
                everything.&quot;
              </p>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <p className="text-sm text-primary font-medium">
                Your data stays on your device
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                No servers, no tracking, just your growth
              </p>
            </div>
          </motion.div>

          {/* Whimsy Settings */}
          {showWhimsySettings && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Whimsy & Delight Settings
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowWhimsySettings(false)}
                >
                  ×
                </Button>
              </div>
              <WhimsySettings />
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
