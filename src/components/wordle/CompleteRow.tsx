import { motion } from "motion/react";
import { guessStatuses } from "@/lib/guessStatus";
import { cn } from "@/lib/utils";
import { useWordleStore } from "@/stores";
import type { CellStatus } from "@/types";

interface CompletedRowProps {
  turn: number;
}

const colors: Record<CellStatus, string> = {
  G: "oklch(62.7% 0.194 149.214)", // Green
  Y: "oklch(79.5% 0.184 86.047)", // Yellow
  X: "oklch(55.6% 0 0)", // Grey
};

/**
 * Các ô đã đoán
 *
 * @prop turn - Lượt đoán của ô này
 * @returns
 */
export default function CompletedRow({ turn }: CompletedRowProps) {
  const guesses = useWordleStore((state) => state.guesses);
  const settings = useWordleStore((state) => state.settings);

  const guess = guesses[turn];

  const statuses = guessStatuses(guess, settings.solution);
  const splitGuess = guesses[turn].split("");

  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${settings.wordLength}, 1fr)` }}
    >
      {splitGuess.map((char, i) => {
        const status = statuses[i];
        const targetColor = colors[status as keyof typeof colors];

        return (
          <motion.div
            // biome-ignore lint/suspicious/noArrayIndexKey: Static element
            key={i}
            className={cn(
              "size-14 border-2 flex items-center justify-center text-3xl",
              "uppercase font-bold select-none",
            )}
            initial={{
              rotateX: 0,
              color: "oklch(0.145 0 0)",
              backgroundColor: "oklch(100% 0 0 / 0%)",
              borderColor: "oklch(55.6% 0 0)",
            }}
            animate={{
              rotateX: [0, 90, 0],
              color: [
                "oklch(0.145 0 0)",
                "oklch(0.145 0 0)",
                "oklch(100% 0 0)",
              ],
              backgroundColor: [
                "oklch(100% 0 0 / 0%)",
                "oklch(100% 0 0 / 0%)",
                targetColor,
              ],
              borderColor: [
                "oklch(55.6% 0 0)",
                "oklch(55.6% 0 0)",
                targetColor,
              ],
            }}
            transition={{ duration: 0.6, delay: i * 0.2, ease: "easeInOut" }}
          >
            {char}
          </motion.div>
        );
      })}
    </div>
  );
}
