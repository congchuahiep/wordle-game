"use client";

import { Delete } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useWordleStore } from "@/stores";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

const COLORS = {
  correct: "oklch(62.7% 0.194 149.214)", // green-500
  present: "oklch(79.5% 0.184 86.047)", // yellow-500
  absent: "oklch(55.6% 0 0)", // gray-600
  default: "oklch(92.3% 0.003 48.717)", // gray-800 (màu nền phím mặc định)
};

export default function Keyboard() {
  const guesses = useWordleStore((state) => state.guesses);
  const handleKeyup = useWordleStore((state) => state.handleKeyup);
  const settings = useWordleStore((state) => state.settings);

  // Tính toán trạng thái màu sắc cho từng phím
  const keyStatuses = useMemo(() => {
    const statuses: Record<string, "correct" | "present" | "absent"> = {};

    guesses.forEach((guess) => {
      guess.split("").forEach((char, i) => {
        const solutionChar = settings.solution[i];

        if (char === solutionChar) {
          statuses[char] = "correct";
          return;
        }

        if (settings.solution.includes(char)) {
          if (statuses[char] !== "correct") {
            statuses[char] = "present";
          }
          return;
        }

        if (statuses[char] !== "correct" && statuses[char] !== "present") {
          statuses[char] = "absent";
        }
      });
    });

    return statuses;
  }, [guesses, settings.solution]);

  const onKeyClick = (key: string) => {
    handleKeyup(key);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-2">
      {KEYS.map((row, rowIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Static element
        <div key={rowIndex} className="flex justify-center gap-1.5 mb-2">
          {row.map((key) => {
            const status = keyStatuses[key] || "default";
            // Các phím đặc biệt khác, như enter hoặc backspace
            const isSpecial = key.length > 1;

            let bgColor = COLORS.default;
            let textColor = "oklch(0.145 0 0)";
            if (status === "correct") {
              bgColor = COLORS.correct;
              textColor = "oklch(100% 0 0)";
            } else if (status === "present") {
              bgColor = COLORS.present;
              textColor = "oklch(100% 0 0)";
            } else if (status === "absent") {
              bgColor = COLORS.absent;
              textColor = "oklch(100% 0 0)";
            }

            return (
              <motion.button
                whileTap={{ scale: 0.9 }}
                key={key}
                onClick={() => onKeyClick(key)}
                className={cn(
                  "h-14 flex items-center justify-center rounded font-bold",
                  "text-sm select-none transition-colors duration-200",
                  isSpecial ? "px-3 text-xs" : "flex-1 max-w-[45px] text-lg",
                )}
                style={{ backgroundColor: bgColor, color: textColor }}
              >
                {key === "Backspace" ? <Delete className="size-6" /> : key}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
