/** biome-ignore-all lint/suspicious/noArrayIndexKey: Static element */
"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useWordleStore } from "@/stores";
import CompletedRow from "./CompleteRow";
import CurrentRow from "./CurrentRow";
import EmptyRow from "./EmptyRow";
import Keyboard from "./Keyboard";

export default function WordleGame() {
  const guesses = useWordleStore((state) => state.guesses);
  const gameStatus = useWordleStore((state) => state.gameStatus);
  const handleKeyup = useWordleStore((state) => state.handleKeyup);
  const isShake = useWordleStore((state) => state.isShake);
  const settings = useWordleStore((state) => state.settings);
  const resetShake = useWordleStore((state) => state.resetShake);

  /**
   * Đăng ký sự kiện bàn phím
   */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => handleKeyup(e.key);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKeyup]);

  /**
   * Xử lý thông báo kết quả
   */
  useEffect(() => {
    if (gameStatus === "won") {
      setTimeout(() => alert("Chiến thắng!"), 1600);
    } else if (gameStatus === "lost") {
      setTimeout(() => alert("Thua cuộc!"), 1600);
    }
  }, [gameStatus]);

  /**
   * Khi hiệu ứng rung lắc được bật, sẽ tự động tắt trong 600ms
   */
  useEffect(() => {
    if (isShake) {
      const timer = setTimeout(() => resetShake(), 600);
      return () => clearTimeout(timer);
    }
  }, [isShake, resetShake]);

  return (
    <section
      className={cn(
        "h-full flex flex-col items-center justify-between font-bold",
        "gap-4 py-12",
      )}
    >
      <h1 className="text-4xl font-bold text-center">Wordle Game</h1>

      <div className="grid grid-rows-6 gap-2 p-4">
        {[...Array(settings.maxGuesses)].map((_, i) => {
          switch (true) {
            // Hàng của các từ đã đoán
            case i < guesses.length:
              return <CompletedRow key={i} turn={i} />;

            // Hàng của từ hiện tại
            case i === guesses.length:
              return <CurrentRow key={i} />;

            // Hàng của từ chưa đoán
            default:
              return <EmptyRow key={i} />;
          }
        })}
      </div>

      {/* Phần bàn phím ảo */}
      <div className="w-full px-2">
        <Keyboard />
      </div>

      <div className="mt-8 text-gray-500 text-sm">
        Trạng thái: {gameStatus.toUpperCase()}
      </div>
    </section>
  );
}
