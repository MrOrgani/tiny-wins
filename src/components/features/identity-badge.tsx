'use client';

import { useHabitStore } from '@/stores/habit-store';
import { cn } from '@/lib/utils';

interface IdentityBadgeProps {
  className?: string;
  showDayCount?: boolean;
}

export function IdentityBadge({
  className,
  showDayCount = true,
}: IdentityBadgeProps) {
  const { selectedIdentity, getIdentityDayCount } = useHabitStore();

  if (!selectedIdentity) {
    return (
      <div className={cn('text-center p-4 rounded-lg bg-muted/30', className)}>
        <p className="text-sm text-[rgb(55_65_81)] leading-relaxed">
          Choose an identity to begin your journey
        </p>
      </div>
    );
  }

  const dayCount = showDayCount ? getIdentityDayCount() : 0;

  return (
    <div
      className={cn(
        'text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20',
        'transform transition-all duration-300 hover:scale-[1.02]',
        className
      )}
    >
      <div
        className="text-4xl mb-2"
        role="img"
        aria-label={selectedIdentity.name}
      >
        {selectedIdentity.emoji}
      </div>

      {showDayCount && dayCount > 0 ? (
        <h2 className="text-lg font-semibold text-[rgb(72_95_72)] leading-relaxed mb-1">
          Day {dayCount} as a {selectedIdentity.name}
        </h2>
      ) : (
        <h2 className="text-lg font-semibold text-[rgb(72_95_72)] leading-relaxed mb-1">
          You are a {selectedIdentity.name}
        </h2>
      )}

      <p className="text-sm text-[rgb(55_65_81)] leading-relaxed max-w-[200px] mx-auto">
        {selectedIdentity.description}
      </p>

      {showDayCount && dayCount > 0 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs font-medium text-primary">
            Building your identity
          </span>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
}
