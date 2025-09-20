'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CongratsExplosion } from '@/components/ui/micro-interactions';
import { cn } from '@/lib/utils';
import { useHabitStore } from '@/stores/habit-store';
import { Identity, PREDEFINED_IDENTITIES } from '@/types/habit';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Step = 'identity' | 'habit' | 'shrink' | 'intention';

export default function CreateHabitPage() {
  const router = useRouter();
  const { selectedIdentity, selectIdentity, createHabit } = useHabitStore();

  // Form state
  const [currentStep, setCurrentStep] = useState<Step>('identity');
  const [selectedNewIdentity, setSelectedNewIdentity] =
    useState<Identity | null>(selectedIdentity);
  const [habitTitle, setHabitTitle] = useState('');
  const [originalHabitTitle, setOriginalHabitTitle] = useState('');
  const [shrinkCount, setShrinkCount] = useState(0);
  const [afterAction, setAfterAction] = useState('');
  const [willAction, setWillAction] = useState('');

  // Validation state
  const [isValid, setIsValid] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (selectedIdentity && !selectedNewIdentity) {
      setSelectedNewIdentity(selectedIdentity);
    }
  }, [selectedIdentity, selectedNewIdentity]);

  useEffect(() => {
    const validateCurrentStep = () => {
      switch (currentStep) {
        case 'identity':
          setIsValid(!!selectedNewIdentity);
          break;
        case 'habit':
          setIsValid(habitTitle.trim().length > 0);
          break;
        case 'shrink':
          setIsValid(shrinkCount >= 3 && habitTitle.trim().length > 0);
          break;
        case 'intention':
          setIsValid(
            afterAction.trim().length > 0 && willAction.trim().length > 0
          );
          break;
        default:
          setIsValid(false);
      }
    };

    validateCurrentStep();
  }, [
    currentStep,
    selectedNewIdentity,
    habitTitle,
    shrinkCount,
    afterAction,
    willAction,
  ]);

  const getStepProgress = () => {
    const steps: Step[] = ['identity', 'habit', 'shrink', 'intention'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  const handleNext = () => {
    if (!isValid) {
      setShowValidation(true);
      return;
    }

    switch (currentStep) {
      case 'identity':
        if (selectedNewIdentity) {
          selectIdentity(selectedNewIdentity);
          setCurrentStep('habit');
        }
        break;
      case 'habit':
        setOriginalHabitTitle(habitTitle);
        setCurrentStep('shrink');
        break;
      case 'shrink':
        setCurrentStep('intention');
        break;
      case 'intention':
        handleCreateHabit();
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'habit':
        setCurrentStep('identity');
        break;
      case 'shrink':
        setCurrentStep('habit');
        break;
      case 'intention':
        setCurrentStep('shrink');
        break;
    }
  };

  const handleShrinkHabit = () => {
    if (!habitTitle) return;

    // Simple shrinking logic - can be enhanced with AI later
    const words = habitTitle.split(' ');
    if (words.length > 2) {
      // Remove adjectives and keep core action
      const essentials = words.filter(
        (word) =>
          ![
            'daily',
            'every',
            'regularly',
            'consistently',
            'always',
            'often',
          ].includes(word.toLowerCase())
      );
      setHabitTitle(
        essentials.slice(0, Math.max(1, essentials.length - 1)).join(' ')
      );
    } else if (habitTitle.includes('for')) {
      // Remove time qualifiers
      const parts = habitTitle.split('for');
      setHabitTitle(parts[0]?.trim() || habitTitle);
    } else {
      // Make it even smaller
      setHabitTitle(
        habitTitle
          .replace(/\d+/g, '1')
          .replace(/minutes?|hours?|pages?/, 'minute')
      );
    }

    setShrinkCount((prev) => prev + 1);
  };

  const handleCreateHabit = () => {
    if (!selectedNewIdentity) return;

    const finalImplementationIntention = `After I ${afterAction}, I will ${willAction}`;

    createHabit({
      identityId: selectedNewIdentity.id,
      title: habitTitle,
      originalTitle: originalHabitTitle,
      implementationIntention: finalImplementationIntention,
      minimumAction: habitTitle,
      isActive: true,
    });

    // Show celebration before navigating
    setShowCelebration(true);
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  const canShrinkMore = () => {
    return habitTitle.split(' ').length > 1 || habitTitle.length > 10;
  };

  const renderIdentityStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <Users className="h-12 w-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold text-foreground">
          Who do you want to become?
        </h2>
        <p className="text-muted-foreground">
          Choose an identity that resonates with your goals. This isn&apos;t
          about what you do—it&apos;s about who you are.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {PREDEFINED_IDENTITIES.map((identity) => (
          <Card
            key={identity.id}
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-md',
              selectedNewIdentity?.id === identity.id
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:border-primary/30'
            )}
            onClick={() => setSelectedNewIdentity(identity)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl" role="img" aria-label={identity.name}>
                  {identity.emoji}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {identity.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {identity.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );

  const renderHabitStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <Target className="h-12 w-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold text-foreground">
          What habit supports this identity?
        </h2>
        <p className="text-muted-foreground">
          Start big if you want—we&apos;ll help you make it tiny in the next
          step.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="habit"
            className="block text-sm font-medium mb-2 text-foreground"
          >
            I want to be a {selectedNewIdentity?.name.toLowerCase()} by...
          </label>
          <Input
            id="habit"
            value={habitTitle}
            onChange={(e) => setHabitTitle(e.target.value)}
            placeholder="reading for 30 minutes"
            className="text-lg p-4"
          />
        </div>

        {showValidation && !isValid && (
          <p className="text-amber text-sm">Please enter a habit to continue</p>
        )}

        <div className="bg-info/10 p-4 rounded-lg border border-info/20">
          <p className="text-sm text-info">
            💡 Don&apos;t worry about making it perfect—we&apos;ll shrink it
            together!
          </p>
        </div>
      </div>
    </motion.div>
  );

  const renderShrinkStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <Sparkles className="h-12 w-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold text-foreground">
          Let&apos;s shrink it!
        </h2>
        <p className="text-muted-foreground">
          Make it so small you can&apos;t say no. You must shrink it at least 3
          times.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-card border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Current habit:
            </span>
            <span className="text-sm text-primary font-medium">
              Shrunk {shrinkCount} times
            </span>
          </div>
          <p className="text-lg font-medium">{habitTitle}</p>
        </div>

        {originalHabitTitle !== habitTitle && (
          <div className="bg-muted/20 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Original:</span>{' '}
              {originalHabitTitle}
            </p>
          </div>
        )}

        <Button
          onClick={handleShrinkHabit}
          disabled={!canShrinkMore()}
          className="w-full bg-[rgb(72_95_72)] text-white hover:bg-[rgb(72_95_72)]/90 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg relative overflow-hidden"
          size="lg"
        >
          <Sparkles className="h-4 w-4" />
          Shrink It More
        </Button>

        {shrinkCount >= 3 && (
          <div className="bg-success/10 p-4 rounded-lg border border-success/20">
            <p className="text-success font-medium text-center">
              Perfect! This is tiny enough to build consistency.
            </p>
          </div>
        )}

        {shrinkCount < 3 && (
          <div className="bg-amber/10 p-4 rounded-lg border border-amber/20">
            <p className="text-amber text-center">
              Keep shrinking! You need {3 - shrinkCount} more{' '}
              {shrinkCount === 2 ? 'shrink' : 'shrinks'}.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderIntentionStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <Clock className="h-12 w-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold text-foreground">
          When will you do this?
        </h2>
        <p className="text-muted-foreground">
          Link your new habit to something you already do. This makes it
          automatic.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-card border rounded-lg p-4">
          <p className="text-lg font-medium mb-4">Your tiny habit:</p>
          <p className="text-primary font-semibold">{habitTitle}</p>
        </div>

        <div className="space-y-3">
          <div>
            <label
              htmlFor="after"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              After I...
            </label>
            <Input
              id="after"
              value={afterAction}
              onChange={(e) => setAfterAction(e.target.value)}
              placeholder="brush my teeth"
              className="text-lg p-4"
            />
          </div>

          <div className="text-center">
            <span className="text-2xl font-bold text-primary">I WILL</span>
          </div>

          <div>
            <Input
              value={willAction}
              onChange={(e) => setWillAction(e.target.value)}
              placeholder={habitTitle}
              className="text-lg p-4"
            />
          </div>
        </div>

        {afterAction && willAction && (
          <div className="bg-success/10 p-4 rounded-lg border border-success/20">
            <p className="text-success">
              <span className="font-medium">Implementation intention:</span>
              <br />
              &quot;After I {afterAction}, I will {willAction}&quot;
            </p>
          </div>
        )}

        {showValidation && !isValid && (
          <p className="text-amber text-sm">
            Please fill in both fields to continue
          </p>
        )}
      </div>
    </motion.div>
  );

  return (
    <main className="[padding-top:env(safe-area-inset-top)] [padding-bottom:env(safe-area-inset-bottom)] [padding-left:env(safe-area-inset-left)] [padding-right:env(safe-area-inset-right)] min-h-screen bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="[padding-top:max(env(safe-area-inset-top),0.5rem)] [padding-left:max(env(safe-area-inset-left),1rem)] [padding-right:max(env(safe-area-inset-right),1rem)] flex items-center justify-between p-4 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={
              currentStep === 'identity' ? () => router.back() : handleBack
            }
            className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200 min-h-[48px] min-w-[48px] p-2 relative"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex-1 mx-4">
            <div className="w-full bg-muted/30 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getStepProgress()}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Step{' '}
            {['identity', 'habit', 'shrink', 'intention'].indexOf(currentStep) +
              1}{' '}
            of 4
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 pb-20">
          <AnimatePresence mode="wait">
            {currentStep === 'identity' && renderIdentityStep()}
            {currentStep === 'habit' && renderHabitStep()}
            {currentStep === 'shrink' && renderShrinkStep()}
            {currentStep === 'intention' && renderIntentionStep()}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 p-4 [padding-bottom:calc(1rem+env(safe-area-inset-bottom))] bg-gradient-to-t from-background/95 via-background/80 to-transparent backdrop-blur-sm border-t border-border/30">
          <Button
            onClick={handleNext}
            disabled={!isValid}
            className={cn(
              'w-full text-lg py-6 shadow-lg text-white',
              isValid ? '' : 'opacity-50 cursor-not-allowed'
            )}
            size="lg"
          >
            {currentStep === 'intention' ? (
              <>
                <Sparkles className="h-5 w-5" />
                Create My Habit
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Celebration when habit is created */}
      <CongratsExplosion
        trigger={showCelebration}
        onComplete={() => setShowCelebration(false)}
        intensity="intense"
      />
    </main>
  );
}
