import { create } from "zustand";

interface TimerState {
  timeElapsed: number;
  isActivate: boolean;
  isRunning: boolean;

  // Actions
  tick: () => void;
  resetTimer: () => void;
  startTimer: () => void;
  stopTimer: () => void;

  activateTimer: () => void;
  terminateTimer: () => void;
}

/**
 * Store cho bộ đếm thời gian khi chơi
 */
const useTimerStore = create<TimerState>((set) => ({
  timeElapsed: 0,
  isRunning: false,
  isActivate: false,

  tick: () => set((state) => ({ timeElapsed: state.timeElapsed + 1 })),
  resetTimer: () => set({ timeElapsed: 0, isRunning: false }),
  startTimer: () => set({ isRunning: true }),
  stopTimer: () => set({ isRunning: false }),

  activateTimer: () => set({ isActivate: true }),
  terminateTimer: () => set({ isActivate: false }),
}));

export default useTimerStore;
