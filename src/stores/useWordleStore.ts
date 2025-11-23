"use client";

import { useContext } from "react";
import { createStore, useStore } from "zustand";
import { WordleContext } from "@/contexts";
import { celebration } from "@/lib/celebration";
import type {
  GameSetting,
  GameStatus,
  WordleActions,
  WordleState,
} from "@/types";

type WordleStore = WordleState & WordleActions;

export const createWordleStore = (initSettings: GameSetting) =>
  createStore<WordleStore>((set, get) => ({
    settings: initSettings,

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

        celebration(
          newStatus === "won" ? "good" : newStatus === "lost" ? "bad" : "nah",
        );

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

export function useWordleStore<T>(selector: (state: WordleStore) => T): T {
  const store = useContext(WordleContext);

  if (!store) {
    throw new Error("Missing WordleProvider");
  }

  // Nếu có selector thì trả về phần data đó, nếu không thì trả về full state
  return useStore(store, selector);
}

export default useWordleStore;
