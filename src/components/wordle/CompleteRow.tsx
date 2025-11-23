import { motion } from "motion/react";
import { useWordleStore } from "@/stores";
import { cn } from "@/lib/utils";

interface CompletedRowProps {
  turn: number;
}

const colors = {
  correct: "oklch(62.7% 0.194 149.214)", // green-500
  present: "oklch(79.5% 0.184 86.047)", // yellow-500
  absent: "oklch(43.9% 0 0)", // gray-600
};

/**
 * Các ô đã đoán
 *
 * @prop turn - Lượt đoán của ô này
 * @returns
 */
export default function CompletedRow({ turn }: CompletedRowProps) {
  const { guesses, settings } = useWordleStore();

  const splitGuess = guesses[turn].split("");

  return (
    <div className="grid grid-cols-5 gap-2">
      {splitGuess.map((char, i) => {
        const status = getStatus(char, i, settings.solution);
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
                "oklch(55.6% 0 0 / 100%)",
                "oklch(55.6% 0 0 / 100%)",
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

/**
 * Lấy trạng thái của một ký tự trong từ đoán
 */
function getStatus(char: string, index: number, solution: string) {
  if (char === solution[index]) return "correct";
  if (solution.includes(char)) return "present";
  return "absent";
}
