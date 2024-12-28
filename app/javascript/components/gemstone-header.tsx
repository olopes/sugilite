import { ModeToggle } from "@/components/mode-toggle";
import { QuickSearch } from "@/components/quicksearch";
import { Gem } from "lucide-react";
import { useEffect, useMemo } from "react";
import { AddNewGemstone } from "@/components/gemstone-add";

export function GemstoneHeader({ title }: { title: string }) {
  useEffect(() => {
    document.title = title.replace("\u{1F48E}", " \u2013 ");
  }, [title]);

  const transformedTitle = useMemo(() => {
    const parts = title.split("\u{1F48E}");
    return parts.flatMap((p, i) => [i === 0 ? null : <Gem className="text-sugilite" />, p]);
  }, [title]);

  return (
    <header className="sticky left-0 right-0 top-0  grid grid-cols-3 h-16 gap-4 border-b bg-background px-4 items-center">
      <div className="text-2xl text-medium flex gap-2 items-center">{transformedTitle}</div>
      <div className="flex justify-center">
        <QuickSearch />
      </div>
      <div className="flex justify-end gap-2">
        <AddNewGemstone />
        <ModeToggle />
      </div>
    </header>
  );
}
