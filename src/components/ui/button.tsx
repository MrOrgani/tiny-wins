import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95',
        // Psychology-focused variants
        'showed-up':
          'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl',
        'life-happened':
          'bg-amber text-amber-foreground hover:bg-amber/90 hover:scale-105 active:scale-95',
        celebration:
          'bg-success text-success-foreground hover:bg-success/90 animate-gentle-bounce',
        // Standard variants (no destructive - psychology-first)
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:scale-105',
        secondary:
          'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105',
        ghost: 'hover:bg-accent hover:text-accent-foreground hover:scale-105',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-6 py-3 text-base', // Larger for better touch
        sm: 'h-10 rounded-md px-4 text-sm',
        lg: 'h-14 rounded-md px-8 text-lg min-h-[56px] min-w-[56px]', // More generous sizing
        icon: 'h-12 w-12', // Touch-friendly icon buttons
        touch: 'h-14 w-full px-6 py-4 text-lg', // Optimal for mobile
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, type = 'button', ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={asChild ? undefined : type}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
