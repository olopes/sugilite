import GemstoneDetail from "@/components/gemstone-detail";
import { AddNewGemstone } from "@/components/gemstone-add";
import { useGemstones } from "./gemstone-provider";
import { ScrollArea } from "./ui/scroll-area";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

/**
 * Renders a list of Gemstones
 *
 */
export default function GemstoneList() {
  const { gemstones } = useGemstones();
  const count = gemstones.length;
  return (
    <ScrollArea className="flex flex-1 max-h-full overflow-y-auto border border-pink-400">
      <div className="flex flex-row gap-4 flex-wrap m-8">
        {count === 0 ? (
          <div className="empty-list">
            Empty gemstone list.
            <br />
            Use the form to add a new gemstone.
          </div>
        ) : (
          gemstones.map((gemstone) => <GemstoneDetail key={gemstone.id} gemstone={gemstone} />)
        )}
        <AddNewGemstone />
      </div>
    </ScrollArea>
  );
}
