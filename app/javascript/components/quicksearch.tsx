import { useQuicksearch } from "@/components/quicksearch-provider";
import { Input } from "@/components/ui/input";
import { useGemstoneActions } from "@/components/gemstone-provider";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const DEBOUNCE_TIMEOUT = 300; // ms

export function QuickSearch() {
  const { t } = useTranslation();
  const { quicksearch, setQuicksearch } = useQuicksearch();
  const [debounced, setDebounced] = useState(quicksearch);
  const { searchGemstones } = useGemstoneActions();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === "k" && ev.ctrlKey) {
        ev.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(quicksearch);
    }, DEBOUNCE_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, [quicksearch]);

  useEffect(() => {
    searchGemstones(debounced);
  }, [debounced, searchGemstones]);

  return (
    <div className="flex w-96">
      <Input
        ref={inputRef}
        id="quicksearch"
        name="quicksearch"
        type="text"
        placeholder={t("quick search")}
        className="grow"
        value={quicksearch}
        onChange={(ev) => setQuicksearch(ev.target.value)}
      />
    </div>
  );
}
