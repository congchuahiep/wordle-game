import { cn } from "@/lib/utils";
import Timer from "./Timer";

export default function Header() {
  return (
    <header
      className={cn(
        "fixed h-12 border-b w-full top-0 flex items-center justify-between",
        "bg-background px-4",
      )}
    >
      <div className="flex-1 basis-0" />
      <h1 className="text-2xl font-bold">Wordle with Uy^^n</h1>
      <Timer className="flex-1 basis-0 justify-end" />
    </header>
  );
}
