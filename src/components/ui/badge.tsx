import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}

function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
  const baseClasses = 'badge';
  const variantClasses = {
    default: 'badge-secondary',
    secondary: 'badge-secondary',
    destructive: 'badge-destructive',
    outline: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return <div className={classes} {...props} />;
}

export { Badge };
