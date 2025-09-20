import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  render,
  screen,
  userEvent,
  psychologyTestHelpers,
  act,
} from '@/test/test-utils';
import { HabitCard } from '../habit-card';
import type { Habit, HabitCheckIn } from '@/types/habit';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
  useReducedMotion: vi.fn(() => false),
}));

// Mock the habit store
const mockHabitStore = {
  markHabitComplete: vi.fn(),
  markLifeHappened: vi.fn(),
  getTodaysCheckIns: vi.fn(),
  celebrationQueue: [],
  clearCelebration: vi.fn(),
};

vi.mock('@/stores/habit-store', () => ({
  useHabitStore: () => mockHabitStore,
}));

const mockHabit: Habit = {
  id: 'test-habit-1',
  identityId: 'reader',
  title: 'Read',
  originalTitle: 'Read for 1 hour',
  implementationIntention: 'After I wake up, I will read for 5 minutes',
  minimumAction: 'Read one paragraph',
  createdAt: new Date('2024-01-01'),
  isActive: true,
};

describe('HabitCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mocks to default state
    mockHabitStore.getTodaysCheckIns.mockReturnValue([]);
  });

  describe('Psychology-First Principles', () => {
    it('uses encouraging language throughout', async () => {
      await act(async () => {
        render(<HabitCard habit={mockHabit} />);
      });

      // Check for encouraging button text
      expect(screen.getByText('I Showed Up')).toBeInTheDocument();

      // Check for identity-focused language
      expect(screen.getByText('Read')).toBeInTheDocument();

      // Ensure no shame-based language
      const cardElement =
        screen.getByRole('group') || screen.getByText('Read').closest('div');
      const cardText = cardElement?.textContent || '';
      expect(cardText).toBeEncouraging();
    });

    it('celebrates showing up with positive reinforcement', async () => {
      const user = userEvent.setup();

      render(<HabitCard habit={mockHabit} />);

      const showedUpButton = screen.getByText('I Showed Up');
      await user.click(showedUpButton);

      // Wait for the setTimeout in handleShowedUp (300ms)
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 350));
      });

      expect(mockHabitStore.markHabitComplete).toHaveBeenCalledWith(
        'test-habit-1'
      );

      // Should show celebration message
      await psychologyTestHelpers.waitForCelebration();
    });

    it('provides compassionate "life happened" alternative', async () => {
      const user = userEvent.setup();

      await act(async () => {
        render(<HabitCard habit={mockHabit} />);
      });

      // First click to show the life happened option
      const lifeHappenedTrigger = screen.getByText(/Life happened today\?/);
      await act(async () => {
        await user.click(lifeHappenedTrigger);
      });

      // Then click the actual button
      const lifeHappenedButton = screen.getByText('Mark: Life Happened');
      await act(async () => {
        await user.click(lifeHappenedButton);
      });

      expect(mockHabitStore.markLifeHappened).toHaveBeenCalledWith(
        'test-habit-1'
      );
    });
  });

  describe('Accessibility Compliance', () => {
    it('has proper accessibility features for screen readers', async () => {
      await act(async () => {
        render(<HabitCard habit={mockHabit} />);
      });

      // Check for the main button
      const showUpButton = screen.getByRole('button', { name: /I Showed Up/i });
      expect(showUpButton).toBeInTheDocument();

      // Check for habit title accessibility
      expect(screen.getByText('Read')).toBeInTheDocument();

      // Check that buttons are properly focusable
      expect(showUpButton).toHaveAttribute('type', 'button');
    });

    it('meets touch target size requirements', async () => {
      await act(async () => {
        render(<HabitCard habit={mockHabit} />);
      });

      const showedUpButton = screen.getByRole('button', {
        name: /I Showed Up/i,
      });
      expect(showedUpButton).toHaveTouchFriendlySize();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();

      await act(async () => {
        render(<HabitCard habit={mockHabit} />);
      });

      const showedUpButton = screen.getByRole('button', {
        name: /I Showed Up/i,
      });

      // Tab to the button and press Enter
      await act(async () => {
        await user.tab();
      });
      expect(showedUpButton).toHaveFocus();

      await act(async () => {
        await user.keyboard('{Enter}');
      });

      // Wait for the setTimeout in handleShowedUp (300ms)
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 350));
      });

      expect(mockHabitStore.markHabitComplete).toHaveBeenCalledWith(
        'test-habit-1'
      );
    });
  });

  describe('Motion Sensitivity', () => {
    it('respects reduced motion preferences', async () => {
      psychologyTestHelpers.mockReducedMotion(true);

      await act(async () => {
        render(<HabitCard habit={mockHabit} />);
      });

      // Component should render without accessibility warnings
      // and respect motion preferences in its CSS classes
      // Look for the Card component by its role="group" attribute
      const card = screen.getByRole('group');
      expect(card).toRespectMotionPreferences();
    });
  });

  describe('Performance Requirements', () => {
    it('responds to interaction within 200ms', async () => {
      const user = userEvent.setup();

      await act(async () => {
        render(<HabitCard habit={mockHabit} />);
      });

      const showedUpButton = screen.getByRole('button', {
        name: /I Showed Up/i,
      });

      const interactionTime =
        await psychologyTestHelpers.measureInteractionTime(async () => {
          await act(async () => {
            await user.click(showedUpButton);
          });
        });

      // Should respond quickly for psychology-critical interaction
      expect(interactionTime).toBeLessThan(200);
    });
  });

  describe('Completed State', () => {
    it('shows encouraging completion message', async () => {
      // Mock the store to return a completed check-in
      const mockCheckIn: HabitCheckIn = {
        id: 'checkin-1',
        habitId: 'test-habit-1',
        date: new Date().toISOString().split('T')[0] || '2024-01-01',
        completed: true,
        lifeHappened: false,
        celebrationShown: false,
        timestamp: new Date(),
      };
      mockHabitStore.getTodaysCheckIns.mockReturnValue([mockCheckIn]);

      await act(async () => {
        render(<HabitCard habit={mockHabit} />);
      });

      expect(
        screen.getByText(/You chose to be who you want to become/)
      ).toBeInTheDocument();
      expect(screen.getByText('You Showed Up! ✨')).toBeInTheDocument();
    });

    it('displays completion icon', async () => {
      // Mock the store to return a completed check-in
      const mockCheckIn: HabitCheckIn = {
        id: 'checkin-1',
        habitId: 'test-habit-1',
        date: new Date().toISOString().split('T')[0] || '2024-01-01',
        completed: true,
        lifeHappened: false,
        celebrationShown: false,
        timestamp: new Date(),
      };
      mockHabitStore.getTodaysCheckIns.mockReturnValue([mockCheckIn]);

      await act(async () => {
        render(<HabitCard habit={mockHabit} />);
      });

      // Check for completion indicator (CheckCircle icon in button)
      const completionIcon = document.querySelector('svg');
      expect(completionIcon).toBeInTheDocument();
    });
  });

  describe('Haptic Feedback', () => {
    it('triggers haptic feedback on completion', async () => {
      const mockVibrate = vi.fn();
      Object.defineProperty(navigator, 'vibrate', {
        value: mockVibrate,
        writable: true,
      });

      const user = userEvent.setup();

      await act(async () => {
        render(<HabitCard habit={mockHabit} />);
      });

      const showedUpButton = screen.getByRole('button', {
        name: /I Showed Up/i,
      });
      await act(async () => {
        await user.click(showedUpButton);
      });

      expect(mockVibrate).toHaveBeenCalledWith([50, 30, 100]);
    });
  });
});
