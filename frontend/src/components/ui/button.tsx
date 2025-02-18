import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
          variant === 'default' && 'bg-telegram-header text-white px-8 py-3',
          variant === 'outline' && 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground px-8 py-3',
          variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground px-4 py-2',
          variant === 'link' && 'text-primary underline-offset-4 hover:underline px-0 py-0',
          variant === 'destructive' && 'bg-red-500 text-white px-8 py-3',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button }; 