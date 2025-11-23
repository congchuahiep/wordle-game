"use client";

import { createContext } from "react";
import type { createWordleStore } from "@/stores/useWordleStore";

const WordleContext = createContext<ReturnType<
  typeof createWordleStore
> | null>(null);

export default WordleContext;
