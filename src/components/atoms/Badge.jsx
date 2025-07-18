import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "primary",
  size = "md",
  children,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white",
    secondary: "bg-surface text-text-primary border border-secondary/20",
    success: "bg-green-500/20 text-green-400 border border-green-500/20",
    warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20",
    error: "bg-red-500/20 text-red-400 border border-red-500/20"
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;