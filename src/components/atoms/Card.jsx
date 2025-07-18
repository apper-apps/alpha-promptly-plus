import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  children,
  gradient = false,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border transition-all duration-300 hover:shadow-lg",
        gradient 
          ? "bg-gradient-to-br from-surface to-surface/60 border-secondary/30 hover:shadow-primary/10" 
          : "bg-surface border-secondary/20 hover:shadow-secondary/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;