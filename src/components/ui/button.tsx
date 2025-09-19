import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = 'btn';
    const variantClasses = {
      default: 'btn-primary',
      destructive: 'btn-destructive',
      outline: 'btn-outline',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
      link: 'btn-link'
    };

    const sizeClasses = {
      default: '',
      sm: 'text-sm px-3 h-9',
      lg: 'text-base px-8 h-11',
      icon: 'h-10 w-10'
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Legacy export for compatibility
const buttonVariants = (params?: any) => '';

export { Button };
export type { ButtonProps };
export { buttonVariants };
