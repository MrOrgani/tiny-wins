export interface Identity {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export interface Habit {
  id: string;
  identityId: string;
  title: string;
  originalTitle: string; // For tracking the shrinking process
  implementationIntention: string; // "After I..., I will..."
  minimumAction: string; // The absolute smallest version
  createdAt: Date;
  isActive: boolean;
}

export interface HabitCheckIn {
  id: string;
  habitId: string;
  date: string; // ISO date string (YYYY-MM-DD)
  completed: boolean;
  lifeHappened: boolean; // Alternative to completion
  celebrationShown: boolean;
  timestamp: Date;
}

export interface UserProgress {
  identityStreaks: Record<string, number>; // identityId -> current streak
  totalShowUps: number;
  lastActiveDate: string;
  recoveryState:
    | 'active'
    | 'missed_1_day'
    | 'missed_2_days'
    | 'missed_3_plus'
    | 'paused';
  pausedUntil?: Date;
}

export interface EncouragingMessage {
  id: string;
  text: string;
  context: 'morning' | 'evening' | 'streak' | 'recovery' | 'first_time';
  identityId?: string; // For identity-specific messages
}

// Predefined identities that users can choose from
export const PREDEFINED_IDENTITIES: Identity[] = [
  {
    id: 'reader',
    name: 'Reader',
    description: 'Someone who reads daily',
    emoji: '📚',
  },
  {
    id: 'writer',
    name: 'Writer',
    description: 'Someone who writes consistently',
    emoji: '✍️',
  },
  {
    id: 'runner',
    name: 'Runner',
    description: 'Someone who moves their body',
    emoji: '🏃',
  },
  {
    id: 'artist',
    name: 'Artist',
    description: 'Someone who creates art',
    emoji: '🎨',
  },
  {
    id: 'learner',
    name: 'Learner',
    description: 'Someone who studies new things',
    emoji: '🧠',
  },
  {
    id: 'meditator',
    name: 'Meditator',
    description: 'Someone who practices mindfulness',
    emoji: '🧘',
  },
  {
    id: 'musician',
    name: 'Musician',
    description: 'Someone who practices music',
    emoji: '🎵',
  },
  {
    id: 'gardener',
    name: 'Gardener',
    description: 'Someone who tends to growing things',
    emoji: '🌱',
  },
  {
    id: 'cook',
    name: 'Cook',
    description: 'Someone who prepares nourishing meals',
    emoji: '👨‍🍳',
  },
  {
    id: 'organizer',
    name: 'Organizer',
    description: 'Someone who creates order and clarity',
    emoji: '📋',
  },
];

// Encouraging messages that reinforce identity
export const ENCOURAGING_MESSAGES: EncouragingMessage[] = [
  { id: '1', text: "You showed up. That's what matters.", context: 'morning' },
  {
    id: '2',
    text: "Every small action builds who you're becoming.",
    context: 'morning',
  },
  { id: '3', text: 'Progress, not perfection.', context: 'streak' },
  {
    id: '4',
    text: "You're proving to yourself who you are.",
    context: 'streak',
  },
  { id: '5', text: 'Welcome back. You belong here.', context: 'recovery' },
  {
    id: '6',
    text: 'Today is a new opportunity to show up.',
    context: 'recovery',
  },
  {
    id: '7',
    text: 'You did it. You chose to be who you want to become.',
    context: 'evening',
  },
  {
    id: '8',
    text: "Each day you show up, you're building evidence of who you are.",
    context: 'evening',
  },
  {
    id: '9',
    text: 'This is how transformation happens - one small action at a time.',
    context: 'first_time',
  },
  {
    id: '10',
    text: "You're not just doing, you're becoming.",
    context: 'first_time',
  },
];
