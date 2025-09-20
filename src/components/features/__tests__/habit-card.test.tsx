import { describe, it, expect, vi } from 'vitest';
import {
  render,
  screen,
  userEvent,
  psychologyTestHelpers,
} from '@/test/test-utils';
import { HabitCard } from '../habit-card';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const mockHabit = {
  id: 'test-habit-1',
  name: 'Read',
  icon: '📚',
  identity: 'Reader',
};

describe('HabitCard', () => {
  describe('Psychology-First Principles', () => {
    it('uses encouraging language throughout', () => {
      const mockOnComplete = vi.fn();
      const mockOnLifeHappened = vi.fn();

      render(
        <HabitCard
          habit={mockHabit}
          isCompleted={false}
          onComplete={mockOnComplete}
          onLifeHappened={mockOnLifeHappened}
        />
      );

      // Check for encouraging button text
      expect(screen.getByText('I Showed Up!')).toBeInTheDocument();
      expect(screen.getByText('Life Happened')).toBeInTheDocument();

      // Check for identity-focused language
      expect(screen.getByText('Becoming: Reader')).toBeInTheDocument();

      // Ensure no shame-based language
      const cardText =
        screen.getByRole('article', { hidden: true }).textContent || '';
      expect(cardText).toBeEncouraging();
    });

    it('celebrates showing up with positive reinforcement', async () => {
      const mockOnComplete = vi.fn();
      const mockOnLifeHappened = vi.fn();
      const user = userEvent.setup();

      render(
        <HabitCard
          habit={mockHabit}
          isCompleted={false}
          onComplete={mockOnComplete}
          onLifeHappened={mockOnLifeHappened}
        />
      );

      const showedUpButton = screen.getByText('I Showed Up!');
      await user.click(showedUpButton);

      expect(mockOnComplete).toHaveBeenCalledWith('test-habit-1');

      // Should show celebration message
      await psychologyTestHelpers.waitForCelebration();
    });

    it('provides compassionate "life happened" alternative', async () => {
      const mockOnComplete = vi.fn();
      const mockOnLifeHappened = vi.fn();
      const user = userEvent.setup();

      render(
        <HabitCard
          habit={mockHabit}
          isCompleted={false}
          onComplete={mockOnComplete}
          onLifeHappened={mockOnLifeHappened}
        />
      );

      const lifeHappenedButton = screen.getByText('Life Happened');
      await user.click(lifeHappenedButton);

      expect(mockOnLifeHappened).toHaveBeenCalledWith('test-habit-1');
    });
  });

  describe('Accessibility Compliance', () => {
    it('has proper ARIA labels for screen readers', () => {
      const mockOnComplete = vi.fn();
      const mockOnLifeHappened = vi.fn();

      render(
        <HabitCard
          habit={mockHabit}
          isCompleted={false}
          onComplete={mockOnComplete}
          onLifeHappened={mockOnLifeHappened}
        />
      );

      // Check for accessible button labels
      expect(
        screen.getByLabelText('Mark Read as completed')
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText('Mark that life happened today')
      ).toBeInTheDocument();

      // Check for icon accessibility
      expect(screen.getByLabelText('Read icon')).toBeInTheDocument();
    });

    it('meets touch target size requirements', () => {
      const mockOnComplete = vi.fn();
      const mockOnLifeHappened = vi.fn();

      render(
        <HabitCard
          habit={mockHabit}
          isCompleted={false}
          onComplete={mockOnComplete}
          onLifeHappened={mockOnLifeHappened}
        />
      );

      const showedUpButton = screen.getByText('I Showed Up!');
      const lifeHappenedButton = screen.getByText('Life Happened');

      expect(showedUpButton).toHaveTouchFriendlySize();
      expect(lifeHappenedButton).toHaveTouchFriendlySize();
    });

    it('supports keyboard navigation', async () => {
      const mockOnComplete = vi.fn();
      const mockOnLifeHappened = vi.fn();
      const user = userEvent.setup();

      render(
        <HabitCard
          habit={mockHabit}
          isCompleted={false}
          onComplete={mockOnComplete}
          onLifeHappened={mockOnLifeHappened}
        />
      );

      const showedUpButton = screen.getByText('I Showed Up!');

      // Tab to the button and press Enter
      await user.tab();
      expect(showedUpButton).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(mockOnComplete).toHaveBeenCalledWith('test-habit-1');
    });
  });

  describe('Motion Sensitivity', () => {
    it('respects reduced motion preferences', () => {
      psychologyTestHelpers.mockReducedMotion(true);

      const mockOnComplete = vi.fn();
      const mockOnLifeHappened = vi.fn();

      render(
        <HabitCard
          habit={mockHabit}
          isCompleted={false}
          onComplete={mockOnComplete}
          onLifeHappened={mockOnLifeHappened}
        />
      );

      // Component should render without accessibility warnings
      // and respect motion preferences in its CSS classes
      const card = screen.getByRole('article', { hidden: true });
      expect(card).toRespectMotionPreferences();
    });
  });

  describe('Performance Requirements', () => {
    it('responds to interaction within 200ms', async () => {
      const mockOnComplete = vi.fn();
      const mockOnLifeHappened = vi.fn();
      const user = userEvent.setup();

      render(
        <HabitCard
          habit={mockHabit}
          isCompleted={false}
          onComplete={mockOnComplete}
          onLifeHappened={mockOnLifeHappened}
        />
      );

      const showedUpButton = screen.getByText('I Showed Up!');

      const interactionTime =
        await psychologyTestHelpers.measureInteractionTime(async () => {
          await user.click(showedUpButton);
        });

      // Should respond quickly for psychology-critical interaction
      expect(interactionTime).toBeLessThan(200);
    });
  });

  describe('Completed State', () => {
    it('shows encouraging completion message', () => {
      const mockOnComplete = vi.fn();
      const mockOnLifeHappened = vi.fn();

      render(
        <HabitCard
          habit={mockHabit}
          isCompleted={true}
          onComplete={mockOnComplete}
          onLifeHappened={mockOnLifeHappened}
        />
      );

      expect(
        screen.getByText('You showed up! Your identity is growing stronger.')
      ).toBeInTheDocument();
      expect(screen.queryByText('I Showed Up!')).not.toBeInTheDocument();
      expect(screen.queryByText('Life Happened')).not.toBeInTheDocument();
    });

    it('displays completion icon', () => {
      const mockOnComplete = vi.fn();
      const mockOnLifeHappened = vi.fn();

      render(
        <HabitCard
          habit={mockHabit}
          isCompleted={true}
          onComplete={mockOnComplete}
          onLifeHappened={mockOnLifeHappened}
        />
      );

      // Check for completion indicator (CheckCircle icon)
      const completionIcon =
        document.querySelector('[data-testid="check-circle"]') ||
        document.querySelector('svg');
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

      const mockOnComplete = vi.fn();
      const mockOnLifeHappened = vi.fn();
      const user = userEvent.setup();

      render(
        <HabitCard
          habit={mockHabit}
          isCompleted={false}
          onComplete={mockOnComplete}
          onLifeHappened={mockOnLifeHappened}
        />
      );

      const showedUpButton = screen.getByText('I Showed Up!');
      await user.click(showedUpButton);

      expect(mockVibrate).toHaveBeenCalledWith(100);
    });
  });
});
