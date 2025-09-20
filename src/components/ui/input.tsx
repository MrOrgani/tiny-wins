import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-md border-2 border-border bg-input px-4 py-3 text-base text-foreground placeholder:text-muted-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:border-primary focus:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
          'sm:h-10 sm:px-3 sm:py-2 sm:text-sm', // Smaller on desktop
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
