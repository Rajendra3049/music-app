'use client';

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface ParallaxBgProps {
  className?: string;
  children?: React.ReactNode;
  speed?: number;
}

export function ParallaxBg({ className, children, speed = 0.5 }: ParallaxBgProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.scrollY;
      ref.current.style.transform = `translateY(${scrolled * speed}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 w-full h-full transition-transform",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
} 