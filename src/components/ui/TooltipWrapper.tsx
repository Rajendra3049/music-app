'use client';

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface Props {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
}

export function TooltipWrapper({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 200,
}: Props) {
  if (!content) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          <span className="inline-block w-full">{children}</span>
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          align={align}
          sideOffset={8}
          className="z-[100] overflow-visible rounded-md border bg-popover/95 backdrop-blur-sm px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <p className="max-w-[300px] break-words">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 