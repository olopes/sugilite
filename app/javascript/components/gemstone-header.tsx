import { useEffect, useMemo } from "react";
import { Gem } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { QuickSearch } from "@/components/quicksearch";
import { AddNewGemstone } from "@/components/gemstone-add";
import { LanguageToggle } from "@/components/language-toggle";
import { useTranslation } from "react-i18next";

export function GemstoneHeader() {
  const {t} = useTranslation();
  const title = t("title");
  useEffect(() => {
    document.title = title.replace("\u{1F48E}", " \u2013 ");
  }, [title]);

  const transformedTitle = useMemo(() => {
    const parts = title.split("\u{1F48E}");
    return parts.flatMap((p, i) => [
      i === 0 ? null : <Gem key={`s${i}`} className="text-sugilite" />,
      <span key={`t${i}`}>{p}</span>,
    ]);
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
        <LanguageToggle />
      </div>
    </header>
  );
}
