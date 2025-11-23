import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encodeSolution = (str: string) => {
  if (typeof window === "undefined") return Buffer.from(str).toString("base64");
  return btoa(str);
};

export const decodeSolution = (str: string) => {
  try {
    if (typeof window === "undefined")
      return Buffer.from(str, "base64").toString("utf-8");
    return atob(str);
  } catch {
    return "ERROR"; // Fallback nếu chuỗi bị lỗi
  }
};
