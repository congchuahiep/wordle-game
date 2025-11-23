/** biome-ignore-all lint/suspicious/noArrayIndexKey: Static element */
"use client";

import { useEffect } from "react";
import { useWordleStore } from "@/stores";
import CompletedRow from "./CompleteRow";
import CurrentRow from "./CurrentRow";
import EmptyRow from "./EmptyRow";

export default function WordleGame() {
  const { guesses, settings, gameStatus, isShake, handleKeyup, resetShake } =
    useWordleStore();

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
    <div className="min-h-screen flex flex-col items-center justify-center font-bold">
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

      <div className="mt-8 text-gray-500 text-sm">
        Trạng thái: {gameStatus.toUpperCase()}
      </div>
    </div>
  );
}
