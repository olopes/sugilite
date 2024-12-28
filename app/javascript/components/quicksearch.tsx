import { useQuicksearch } from "@/components/quicksearch-provider";
import { Input } from "@/components/ui/input";
import { useGemstoneActions } from "./gemstone-provider";
import { useEffect, useState } from "react";

const DEBOUNCE_TIMEOUT = 300; // ms

export function QuickSearch() {
  const { quicksearch, setQuicksearch } = useQuicksearch();
  const [debounced, setDebounced] = useState(quicksearch);
  const { searchGemstones } = useGemstoneActions();

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
        id="quicksearch"
        name="quicksearch"
        type="text"
        placeholder="Quick search"
        className="grow"
        value={quicksearch}
        onChange={(ev) => setQuicksearch(ev.target.value)}
      />
    </div>
  );
}
