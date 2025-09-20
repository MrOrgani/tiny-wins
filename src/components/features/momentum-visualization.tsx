'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHabitStore } from '@/stores/habit-store';
import { cn } from '@/lib/utils';

interface MomentumVisualizationProps {
  className?: string;
}

interface DayData {
  date: string;
  hasActivity: boolean;
  isToday: boolean;
  dayOfWeek: string;
}

export function MomentumVisualization({
  className,
}: MomentumVisualizationProps) {
  const { checkIns, activeHabits } = useHabitStore();
  const [weekData, setWeekData] = useState<DayData[]>([]);

  useEffect(() => {
    const generateWeekData = () => {
      const today = new Date();
      const data: DayData[] = [];

      // Generate last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        const dateStr = date.toISOString().split('T')[0] || '';
        const dayOfWeek = date.toLocaleDateString('en-US', {
          weekday: 'short',
        });

        // Check if there was any activity on this day
        const hasActivity = checkIns.some(
          (checkIn) =>
            checkIn.date === dateStr &&
            (checkIn.completed || checkIn.lifeHappened) &&
            activeHabits.some((habit) => habit.id === checkIn.habitId)
        );

        data.push({
          date: dateStr,
          hasActivity,
          isToday: i === 0,
          dayOfWeek,
        });
      }

      return data;
    };

    setWeekData(generateWeekData());
  }, [checkIns, activeHabits]);

  const getDayStyle = (day: DayData) => {
    if (day.isToday) {
      return day.hasActivity
        ? 'bg-primary border-primary scale-110 shadow-lg'
        : 'bg-primary/30 border-primary border-2 scale-110';
    }

    return day.hasActivity
      ? 'bg-primary/80 border-primary/60'
      : 'bg-muted/30 border-muted';
  };

  const getDayAriaLabel = (day: DayData) => {
    const activityText = day.hasActivity ? 'completed' : 'no activity';
    const todayText = day.isToday ? ' (today)' : '';
    return `${day.dayOfWeek}${todayText}: ${activityText}`;
  };

  const completedDays = weekData.filter((day) => day.hasActivity).length;
  const streakText =
    completedDays === 7
      ? 'Perfect week! 🔥'
      : completedDays >= 5
        ? 'Strong momentum! 💪'
        : completedDays >= 3
          ? 'Building habits! 📈'
          : completedDays >= 1
            ? 'Good start! 🌱'
            : 'Your journey begins! ✨';

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="text-center">
        <h3 className="font-medium text-foreground mb-1">7-Day Momentum</h3>
        <p className="text-sm text-muted-foreground">{streakText}</p>
      </div>

      {/* Visualization */}
      <div className="flex justify-center items-center gap-2 px-4">
        {weekData.map((day, index) => (
          <div key={day.date} className="flex flex-col items-center gap-1">
            {/* Day label */}
            <span className="text-xs text-muted-foreground font-medium">
              {day.dayOfWeek}
            </span>

            {/* Activity circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={cn(
                'w-8 h-8 rounded-full border-2 transition-all duration-300',
                'flex items-center justify-center',
                getDayStyle(day)
              )}
              aria-label={getDayAriaLabel(day)}
              role="img"
            >
              {day.hasActivity && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.2 }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              )}

              {day.isToday && !day.hasActivity && (
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
              )}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="px-4">
        <div className="w-full bg-muted/30 h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedDays / 7) * 100}%` }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
          <span>0 days</span>
          <span className="font-medium text-primary">
            {completedDays} of 7 days
          </span>
          <span>7 days</span>
        </div>
      </div>

      {/* Encouraging message for progress */}
      {completedDays > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center p-3 bg-primary/5 rounded-lg border border-primary/10"
        >
          <p className="text-sm text-primary font-medium">
            Every circle represents a choice to become who you want to be
          </p>
        </motion.div>
      )}
    </div>
  );
}
