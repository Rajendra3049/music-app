'use client';

import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedGradient({ className, children }: AnimatedGradientProps) {
  return (
    <div className={cn(
      "relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-xy",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 