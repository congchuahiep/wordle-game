import { WordleGame } from "@/components/wordle";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center">
      <section className="size-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center">Wordle Game</h1>
        <WordleGame />
      </section>
    </main>
  );
}
