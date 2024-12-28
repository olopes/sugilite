import GemstoneDetail from "@/components/gemstone-detail";
import { useGemstones } from "./gemstone-provider";
import { ScrollArea } from "./ui/scroll-area";

/**
 * Renders a list of Gemstones
 *
 */
export default function GemstoneList() {
  const { gemstones } = useGemstones();
  const count = gemstones.length;
  return (
    <ScrollArea className="h-full">
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
      </div>
    </ScrollArea>
  );
}
