import { useEffect } from "react";
import { useTimerStore, useWordleStore } from "@/stores";

export default function useWordleTimer() {
  const gameStatus = useWordleStore((state) => state.gameStatus);
  const {
    startTimer,
    stopTimer,
    resetTimer,
    tick,
    isRunning,
    activateTimer,
    terminateTimer,
  } = useTimerStore();

  /**
   * Khởi tạo timer khi component được mount (khi vào game mới), và cleanup khi
   * component bị unmount
   */
  useEffect(() => {
    activateTimer();
    resetTimer();
    return () => {
      stopTimer();
      terminateTimer();
    };
  }, [resetTimer, stopTimer, activateTimer, terminateTimer]);

  /**
   * Đồng bộ thời gian với trạng thái chơi
   */
  useEffect(() => {
    if (gameStatus === "playing") {
      startTimer();
    } else {
      stopTimer();
    }
  }, [gameStatus, startTimer, stopTimer]);

  /**
   * Logic đếm giờ (Interval)
   */
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, tick]);
}
