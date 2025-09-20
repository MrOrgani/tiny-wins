import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Habit,
  HabitCheckIn,
  Identity,
  UserProgress,
  EncouragingMessage,
  ENCOURAGING_MESSAGES,
} from '@/types/habit';

interface HabitStore {
  // State
  selectedIdentity: Identity | null;
  activeHabits: Habit[];
  checkIns: HabitCheckIn[];
  userProgress: UserProgress;
  todaysMessage: EncouragingMessage | null;
  celebrationQueue: string[]; // habit IDs to celebrate
  streakMilestones: Record<string, number[]>; // habit ID -> achieved milestones
  lastCelebrationTime: number;
  whimsyLevel: 'minimal' | 'normal' | 'maximum';

  // Identity actions
  selectIdentity: (_identity: Identity) => void;

  // Habit actions
  createHabit: (_habitData: Omit<Habit, 'id' | 'createdAt'>) => void;
  updateHabit: (_habitId: string, _updates: Partial<Habit>) => void;
  deactivateHabit: (_habitId: string) => void;

  // Check-in actions
  markHabitComplete: (_habitId: string) => void;
  markLifeHappened: (_habitId: string) => void;
  clearCelebration: (_habitId: string) => void;

  // Recovery actions
  pauseProgress: (_days: number) => void;
  resumeProgress: () => void;

  // Utility functions
  getTodaysCheckIns: () => HabitCheckIn[];
  getHabitStreak: (_habitId: string) => number;
  getIdentityStreak: (_identityId: string) => number;
  getDaysUntilRecovery: () => number;
  getEncouragingMessage: () => EncouragingMessage;
  getIdentityDayCount: () => number;
  shouldShowExtraEncouragement: () => boolean;
  getRandomCelebrationMessage: () => string;
  setWhimsyLevel: (_level: 'minimal' | 'normal' | 'maximum') => void;
}

const today = () => new Date().toISOString().split('T')[0] || '';

const initialProgress: UserProgress = {
  identityStreaks: {},
  totalShowUps: 0,
  lastActiveDate: today(),
  recoveryState: 'active',
};

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      selectedIdentity: null,
      activeHabits: [],
      checkIns: [],
      userProgress: initialProgress,
      todaysMessage: null,
      celebrationQueue: [],
      streakMilestones: {},
      lastCelebrationTime: 0,
      whimsyLevel: 'normal',

      selectIdentity: (identity) => {
        set({ selectedIdentity: identity });

        // Initialize identity streak if not exists
        const { userProgress } = get();
        if (!userProgress.identityStreaks[identity.id]) {
          set((state) => ({
            userProgress: {
              ...state.userProgress,
              identityStreaks: {
                ...state.userProgress.identityStreaks,
                [identity.id]: 0,
              },
            },
          }));
        }
      },

      createHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: `habit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
        };

        set((state) => ({
          activeHabits: [...state.activeHabits, newHabit],
        }));
      },

      updateHabit: (habitId, updates) => {
        set((state) => ({
          activeHabits: state.activeHabits.map((habit) =>
            habit.id === habitId ? { ...habit, ...updates } : habit
          ),
        }));
      },

      deactivateHabit: (habitId) => {
        set((state) => ({
          activeHabits: state.activeHabits.map((habit) =>
            habit.id === habitId ? { ...habit, isActive: false } : habit
          ),
        }));
      },

      markHabitComplete: (habitId) => {
        const { checkIns, userProgress, selectedIdentity } = get();
        const todayStr = today();

        // Check if already checked in today
        const existingCheckIn = checkIns.find(
          (checkIn) => checkIn.habitId === habitId && checkIn.date === todayStr
        );

        if (existingCheckIn) return; // Already completed today

        // Create new check-in
        const newCheckIn: HabitCheckIn = {
          id: `checkin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          habitId,
          date: todayStr,
          completed: true,
          lifeHappened: false,
          celebrationShown: false,
          timestamp: new Date(),
        };

        // Update streaks and progress
        const updatedProgress = { ...userProgress };
        updatedProgress.totalShowUps += 1;
        updatedProgress.lastActiveDate = todayStr;
        updatedProgress.recoveryState = 'active';

        if (selectedIdentity) {
          updatedProgress.identityStreaks[selectedIdentity.id] =
            (updatedProgress.identityStreaks[selectedIdentity.id] || 0) + 1;
        }

        set((state) => ({
          checkIns: [...state.checkIns, newCheckIn],
          userProgress: updatedProgress,
          celebrationQueue: [...state.celebrationQueue, habitId],
          lastCelebrationTime: Date.now(),
        }));
      },

      markLifeHappened: (habitId) => {
        const { checkIns } = get();
        const todayStr = today();

        // Check if already marked today
        const existingCheckIn = checkIns.find(
          (checkIn) => checkIn.habitId === habitId && checkIn.date === todayStr
        );

        if (existingCheckIn) return;

        const newCheckIn: HabitCheckIn = {
          id: `checkin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          habitId,
          date: todayStr,
          completed: false,
          lifeHappened: true,
          celebrationShown: false,
          timestamp: new Date(),
        };

        set((state) => ({
          checkIns: [...state.checkIns, newCheckIn],
        }));
      },

      clearCelebration: (habitId) => {
        set((state) => ({
          celebrationQueue: state.celebrationQueue.filter(
            (id) => id !== habitId
          ),
        }));
      },

      pauseProgress: (days) => {
        const pauseUntil = new Date();
        pauseUntil.setDate(pauseUntil.getDate() + days);

        set((state) => ({
          userProgress: {
            ...state.userProgress,
            recoveryState: 'paused',
            pausedUntil: pauseUntil,
          },
        }));
      },

      resumeProgress: () => {
        set((state) => {
          // eslint-disable-next-line no-unused-vars
          const { pausedUntil, ...restProgress } = state.userProgress;
          return {
            userProgress: {
              ...restProgress,
              recoveryState: 'active',
            },
          };
        });
      },

      getTodaysCheckIns: () => {
        const { checkIns } = get();
        const todayStr = today();
        return checkIns.filter((checkIn) => checkIn.date === todayStr);
      },

      getHabitStreak: (habitId) => {
        const { checkIns } = get();
        let streak = 0;
        // eslint-disable-next-line prefer-const
        let checkDate = new Date();

        while (true) {
          const dateStr = checkDate.toISOString().split('T')[0];
          const checkIn = checkIns.find(
            (c) => c.habitId === habitId && c.date === dateStr && c.completed
          );

          if (checkIn) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }

        return streak;
      },

      getIdentityStreak: (identityId) => {
        const { userProgress } = get();
        return userProgress.identityStreaks[identityId] || 0;
      },

      getDaysUntilRecovery: () => {
        const { userProgress } = get();
        if (userProgress.pausedUntil) {
          const now = new Date();
          const pauseEnd = new Date(userProgress.pausedUntil);
          const diffTime = pauseEnd.getTime() - now.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return Math.max(0, diffDays);
        }
        return 0;
      },

      getEncouragingMessage: () => {
        const { userProgress, selectedIdentity } = get();
        const context =
          userProgress.recoveryState === 'active' ? 'morning' : 'recovery';

        const relevantMessages = ENCOURAGING_MESSAGES.filter(
          (msg) =>
            msg.context === context &&
            (!msg.identityId || msg.identityId === selectedIdentity?.id)
        );

        if (relevantMessages.length === 0) {
          return (
            ENCOURAGING_MESSAGES[0] || {
              id: '1',
              text: "You showed up. That's what matters.",
              context: 'morning',
            }
          ); // Fallback
        }

        return (
          relevantMessages[
            Math.floor(Math.random() * relevantMessages.length)
          ] ||
          ENCOURAGING_MESSAGES[0] || {
            id: '1',
            text: "You showed up. That's what matters.",
            context: 'morning',
          }
        );
      },

      getIdentityDayCount: () => {
        const { selectedIdentity, checkIns } = get();
        if (!selectedIdentity) return 0;

        // Count unique days with completed check-ins for this identity's habits
        const { activeHabits } = get();
        const identityHabitIds = activeHabits
          .filter((habit) => habit.identityId === selectedIdentity.id)
          .map((habit) => habit.id);

        const uniqueDates = new Set(
          checkIns
            .filter(
              (checkIn) =>
                identityHabitIds.includes(checkIn.habitId) && checkIn.completed
            )
            .map((checkIn) => checkIn.date)
        );

        return uniqueDates.size;
      },

      shouldShowExtraEncouragement: () => {
        const { lastCelebrationTime, whimsyLevel } = get();
        const now = Date.now();
        const timeSinceLastCelebration = now - lastCelebrationTime;

        // Base cooldown depends on whimsy level
        const cooldownMs = {
          minimal: 60000 * 30, // 30 minutes
          normal: 60000 * 15, // 15 minutes
          maximum: 60000 * 5, // 5 minutes
        }[whimsyLevel];

        return timeSinceLastCelebration > cooldownMs;
      },

      getRandomCelebrationMessage: () => {
        const { whimsyLevel } = get();

        const messages = {
          minimal: ['Good job!', 'Well done!', 'Nice work!'],
          normal: [
            "You're building something amazing! ✨",
            'Look at you go! 🚀',
            'Your consistency is inspiring! 🌟',
            'Another step forward! 💪',
            "You're becoming who you want to be! 🦋",
          ],
          maximum: [
            "WOOHOO! You're absolutely crushing it! 🎉🚀✨",
            'Incredible! Your future self is doing a happy dance! 💃🕺',
            "BOOM! That's what I call showing up! 💥⭐🔥",
            'You magnificent habit-building machine! 🤖✨🏆',
            "Plot twist: You're the main character of your own success story! 📚🌟🎭",
          ],
        };

        const levelMessages = messages[whimsyLevel];
        return (
          levelMessages[Math.floor(Math.random() * levelMessages.length)] ||
          'Great job!'
        );
      },

      setWhimsyLevel: (level) => {
        set({ whimsyLevel: level });
      },
    }),
    {
      name: 'tiny-wins-storage',
      version: 1,
    }
  )
);
