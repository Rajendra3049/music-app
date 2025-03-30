'use client';

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function AnimatedText({ text, className, speed = 50, delay = 0 }: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= text.length) {
            clearInterval(timer);
            return prev;
          }
          setDisplayText(text.slice(0, prev + 1));
          return prev + 1;
        });
      }, speed);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return (
    <span className={cn("inline-block", className)}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
} 