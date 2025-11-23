import { create } from "zustand";
import { MAX_GUESSES, SOLUTION, WORD_LENGTH } from "@/configs";
import type { GameStatus, WordleActions, WordleState } from "@/types";

const useWordleStore = create<WordleState & WordleActions>((set, get) => ({
  settings: {
    solution: SOLUTION,
    wordLength: WORD_LENGTH,
    maxGuesses: MAX_GUESSES,
  },

  guesses: [],
  currentGuess: "",
  gameStatus: "playing",
  isShake: false,

  handleKeyup: (key) => {
    const { gameStatus, currentGuess, guesses, settings } = get();

    if (gameStatus !== "playing") return;

    // Xử lý Enter
    if (key === "Enter") {
      if (currentGuess.length !== settings.wordLength) {
        // Kích hoạt rung lắc nếu chưa đủ chữ
        set({ isShake: true });
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      let newStatus: GameStatus = "playing";

      if (currentGuess === settings.solution) {
        newStatus = "won";
      } else if (newGuesses.length >= settings.maxGuesses) {
        newStatus = "lost";
      }

      set({
        guesses: newGuesses,
        currentGuess: "",
        gameStatus: newStatus,
      });
    }

    // Xử lý Backspace
    else if (key === "Backspace") {
      set({ currentGuess: currentGuess.slice(0, -1) });
    }

    // Xử lý nhập chữ cái (A-Z)
    else if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < settings.wordLength) {
        set({ currentGuess: currentGuess + key.toUpperCase() });
      }
    }
  },

  resetShake: () => set({ isShake: false }),

  resetGame: () =>
    set({
      guesses: [],
      currentGuess: "",
      gameStatus: "playing",
      isShake: false,
    }),
}));

export default useWordleStore;
