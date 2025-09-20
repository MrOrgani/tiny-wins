'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useHabitStore } from '@/stores/habit-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Heart, Calendar, Pause } from 'lucide-react';

export default function RecoveryPage() {
  const router = useRouter();
  const {
    userProgress,
    resumeProgress,
    pauseProgress,
    selectedIdentity,
    activeHabits,
  } = useHabitStore();

  const [selectedPauseDuration, setSelectedPauseDuration] = useState<
    number | null
  >(null);

  const getDaysUntilRecovery = () => {
    if (userProgress.pausedUntil) {
      const now = new Date();
      const pauseEnd = new Date(userProgress.pausedUntil);
      const diffTime = pauseEnd.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(0, diffDays);
    }
    return 0;
  };

  const pauseOptions = [
    { days: 3, label: '3 days', description: 'Just need a quick break' },
    { days: 7, label: '1 week', description: 'Taking care of priorities' },
    {
      days: 14,
      label: '2 weeks',
      description: 'Life needs attention right now',
    },
    { days: 30, label: '1 month', description: 'Major life changes happening' },
  ];

  const handleResume = () => {
    resumeProgress();
    router.push('/');
  };

  const handlePause = () => {
    if (selectedPauseDuration) {
      pauseProgress(selectedPauseDuration);
      router.push('/');
    }
  };

  const isPaused = userProgress.recoveryState === 'paused';
  const daysUntilResume = getDaysUntilRecovery();

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
          <h1 className="text-xl font-semibold text-foreground">
            {isPaused ? 'Welcome Back' : 'Life Happened'}
          </h1>
        </header>

        <div className="flex-1 p-4 space-y-6">
          {isPaused ? (
            // Paused state - welcome back
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">🌅</div>
                <h2 className="text-2xl font-bold text-foreground">
                  Welcome back, {selectedIdentity?.name || 'friend'}!
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You took {userProgress.pausedUntil ? 'some time' : 'time'} to
                  focus on what mattered. That takes wisdom.
                </p>
              </div>

              {daysUntilResume > 0 ? (
                <Card className="bg-info/10 border-info/20">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 text-info mx-auto mb-3" />
                    <h3 className="font-semibold text-info mb-2">
                      Still in pause mode
                    </h3>
                    <p className="text-info/80 text-sm">
                      {daysUntilResume} {daysUntilResume === 1 ? 'day' : 'days'}{' '}
                      left in your pause period.
                    </p>
                    <p className="text-info/60 text-xs mt-2">
                      You can resume anytime you&apos;re ready.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-primary/10 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-primary mb-2">
                      Ready to return?
                    </h3>
                    <p className="text-primary/80 text-sm">
                      Your habits are waiting for you. No judgment, just
                      opportunity.
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-3">
                <Button
                  onClick={handleResume}
                  className="w-full bg-[rgb(72_95_72)] text-white hover:bg-[rgb(72_95_72)]/90 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg relative overflow-hidden text-lg py-6"
                  size="lg"
                >
                  <Heart className="h-5 w-5" />
                  I&apos;m Ready to Return
                </Button>

                {daysUntilResume === 0 && (
                  <p className="text-center text-sm text-muted-foreground">
                    Start fresh with your {activeHabits.length}{' '}
                    {activeHabits.length === 1 ? 'habit' : 'habits'}
                  </p>
                )}
              </div>

              <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                <p className="text-success text-center text-sm">
                  Remember: Progress isn&apos;t about perfect consistency.
                  It&apos;s about showing up when you can.
                </p>
              </div>
            </motion.div>
          ) : (
            // Recovery options for missed days
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">🤗</div>
                <h2 className="text-2xl font-bold text-foreground">
                  Life is still crazy?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Sometimes we need to pause our habits to focus on what&apos;s
                  most important. That&apos;s not giving up—that&apos;s being
                  human.
                </p>
              </div>

              <Card className="bg-amber/10 border-amber/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Heart className="h-6 w-6 text-amber mt-1" />
                    <div>
                      <h3 className="font-semibold text-amber mb-1">
                        It&apos;s okay to pause
                      </h3>
                      <p className="text-amber/80 text-sm">
                        Taking a break doesn&apos;t erase your progress. Your
                        identity as a{' '}
                        {selectedIdentity?.name.toLowerCase() || 'person'}
                        who shows up is still growing, even during rest.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  How long do you need?
                </h3>

                <div className="space-y-3">
                  {pauseOptions.map((option) => (
                    <Card
                      key={option.days}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedPauseDuration === option.days
                          ? 'ring-2 ring-primary bg-primary/5'
                          : 'hover:border-primary/30'
                      }`}
                      onClick={() => setSelectedPauseDuration(option.days)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">
                              {option.label}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {option.description}
                            </p>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              selectedPauseDuration === option.days
                                ? 'bg-primary border-primary'
                                : 'border-muted'
                            }`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handlePause}
                  disabled={!selectedPauseDuration}
                  className={`w-full text-lg py-6 ${
                    selectedPauseDuration ? '' : 'opacity-50 cursor-not-allowed'
                  }`}
                  size="lg"
                >
                  <Pause className="h-5 w-5" />
                  Pause My Habits
                </Button>

                <Button
                  onClick={() => router.push('/')}
                  variant="outline"
                  className="w-full"
                >
                  Actually, I&apos;m ready to continue
                </Button>
              </div>

              <div className="bg-info/10 p-4 rounded-lg border border-info/20">
                <p className="text-info text-center text-sm">
                  Your habits will be here when you return. Take the time you
                  need.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
