import { cn } from "@/lib/utils";
import { useWordleStore } from "@/stores";

export default function EmptyRow() {
  const settings = useWordleStore((state) => state.settings);

  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${settings.wordLength}, 1fr)` }}
    >
      {Array(settings.wordLength)
        .fill("")
        .map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Static element
            key={i}
            className={cn("size-14 border-2", "select-none")}
          ></div>
        ))}
    </div>
  );
}
