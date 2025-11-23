import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useWordleStore } from "@/stores";

interface CompletedRowProps {
  turn: number;
}

const colors = {
  correct: "oklch(62.7% 0.194 149.214)",
  present: "oklch(79.5% 0.184 86.047)",
  absent: "oklch(55.6% 0 0)",
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

  const statuses = getGuessStatuses(guess, settings.solution);
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

function getGuessStatuses(guess: string, solution: string) {
  const guessChars = guess.split("");
  const solutionChars = solution.split("");
  const statuses = Array(guess.length).fill("absent");

  // PASS 1: Tìm những chữ đúng vị trí (CORRECT - Xanh)
  guessChars.forEach((char, i) => {
    if (char === solutionChars[i]) {
      statuses[i] = "correct";
      solutionChars[i] = null as any; // Đánh dấu là đã xử lý trong đáp án
      guessChars[i] = null as any; // Đánh dấu là đã xử lý trong từ đoán
    }
  });

  // PASS 2: Tìm những chữ sai vị trí (PRESENT - Vàng)
  guessChars.forEach((char, i) => {
    // Chỉ xét những ô chưa phải là 'correct' (những ô null ở guessChars[i] là đã correct rồi)
    if (char !== null && statuses[i] !== "correct") {
      const indexInSolution = solutionChars.indexOf(char);
      if (indexInSolution > -1) {
        statuses[i] = "present";
        solutionChars[indexInSolution] = null as any; // "Dùng" chữ cái này trong đáp án để không dùng lại nữa
      }
    }
  });

  return statuses;
}
