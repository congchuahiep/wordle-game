import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useWordleStore } from "@/stores";

export default function CurrentRow() {
  const { currentGuess, isShake, settings } = useWordleStore();

  const splitGuess = currentGuess.split("");
  const emptyCells = Array(settings.wordLength - splitGuess.length).fill("");

  const shakeVariants = {
    shake: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5 } },
    idle: { x: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-5 gap-2"
      variants={shakeVariants}
      animate={isShake ? "shake" : "idle"}
    >
      {splitGuess.map((char, i) => (
        <motion.div
          // biome-ignore lint/suspicious/noArrayIndexKey: Static element
          key={i}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.2,
          }}
          className={cn(
            "w-14 h-14 border-2 border-neutral-500 flex items-center justify-center text-3xl uppercase select-none text-foreground",
          )}
        >
          {char}
        </motion.div>
      ))}
      {emptyCells.map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: Static element
          key={i}
          className="w-14 h-14 border-2 flex items-center justify-center text-3xl select-none"
        ></div>
      ))}
    </motion.div>
  );
}
