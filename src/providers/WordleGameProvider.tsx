"use client";

import { useRef } from "react";
import { WordleContext } from "@/contexts";
import { createWordleStore } from "@/stores/useWordleStore";
import type { GameSetting } from "@/types";

export default function WordleProvider({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: GameSetting;
}) {
  // Dùng useRef để đảm bảo store chỉ được tạo 1 lần duy nhất khi component mount
  const storeRef = useRef<ReturnType<typeof createWordleStore>>(undefined);

  if (!storeRef.current) {
    storeRef.current = createWordleStore(settings);
  }

  return (
    <WordleContext.Provider value={storeRef.current}>
      {children}
    </WordleContext.Provider>
  );
}
