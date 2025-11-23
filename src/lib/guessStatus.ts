import type { CellStatus } from "@/types";

/**
 * Trả về mảng trạng thái CellStatus[]
 */
export function guessStatuses(guess: string, solution: string): CellStatus[] {
  const guessChars = guess.split("");
  const solutionChars = solution.split("");

  // Khởi tạo mảng status mặc định là "X" (Sai)
  const statuses: CellStatus[] = Array(guess.length).fill("X");

  // PASS 1: Tìm chữ đúng (G)
  guessChars.forEach((char, i) => {
    if (char === solutionChars[i]) {
      statuses[i] = "G";
      solutionChars[i] = null as any;
      guessChars[i] = null as any;
    }
  });

  // PASS 2: Tìm chữ sai vị trí (Y)
  guessChars.forEach((char, i) => {
    if (char !== null && statuses[i] !== "G") {
      const indexInSolution = solutionChars.indexOf(char);
      if (indexInSolution > -1) {
        statuses[i] = "Y";
        solutionChars[indexInSolution] = null as any;
      }
    }
  });

  return statuses;
}
