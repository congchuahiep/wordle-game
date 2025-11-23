import { redirect } from "next/navigation";
import { WordleGame } from "@/components/wordle";
import { decodeSolution } from "@/lib/utils";
import { WordleGameProvider } from "@/providers";

// Next.js 15/16: Page props là Promise
type Props = {
  searchParams: Promise<{
    wordLength?: string;
    maxGuesses?: string;
    solution?: string;
  }>;
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;

  const wordLength = Number(searchParams.wordLength) || 5;
  const maxGuesses = Number(searchParams.maxGuesses) || 6;
  const rawSolution = searchParams.solution;

  // Nếu không có solution trên URL, đá về trang chủ
  if (!rawSolution) {
    redirect("/");
  }

  const solution = decodeSolution(rawSolution);

  // Tạo object settings để inject vào Provider
  const gameSettings = {
    wordLength,
    maxGuesses,
    solution,
  };

  return (
    <WordleGameProvider settings={gameSettings}>
      <main className="size-full max-w-5xl">
        <WordleGame />
      </main>
    </WordleGameProvider>
  );
}
