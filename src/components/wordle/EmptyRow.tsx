import { WORD_LENGTH } from "@/configs";
import { cn } from "@/lib/utils";

export default function EmptyRow() {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array(WORD_LENGTH)
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
