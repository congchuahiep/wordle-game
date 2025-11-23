"use client";

import { Clock, PauseCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTimerStore } from "@/stores"; // Import store mới
import { Button } from "../ui/button";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export default function Timer({ className }: { className?: string }) {
  const isActivate = useTimerStore((state) => state.isActivate);
  const timeElapsed = useTimerStore((state) => state.timeElapsed);
  const isRunning = useTimerStore((state) => state.isRunning);
  const stopTimer = useTimerStore((state) => state.stopTimer);
  const startTimer = useTimerStore((state) => state.startTimer);

  const handleClick = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        variant="ghost"
        className={cn(
          "py-2 rounded-full font-mono",
          "cursor-pointer text-lg font-medium",
          !isActivate && "hidden",
        )}
        onClick={handleClick}
      >
        {isRunning ? (
          <Clock className="size-5" />
        ) : (
          <PauseCircleIcon className="size-5" />
        )}
        <span>{formatTime(timeElapsed)}</span>
      </Button>
    </div>
  );
}
