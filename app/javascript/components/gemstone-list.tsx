import GemstoneCard from "@/components/gemstone-card";
import { useGemstones } from "@/components/gemstone-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuicksearch } from "@/components/quicksearch-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

/**
 * Renders a list of Gemstones
 *
 */
export default function GemstoneList() {
  const { t } = useTranslation();
  const { quicksearch } = useQuicksearch();
  const { gemstones, loading } = useGemstones();
  const count = gemstones.length;
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-row gap-10 flex-wrap m-10 justify-normal">
        {loading && [...new Array(40)].map((_, i) => <Skeleton key={i} className="w-40 h-60" />)}
        {!loading && count === 0 ? (
          quicksearch ? (
            <div className="empty-list">{t("not found")}</div>
          ) : (
            <div className="empty-list">
              {t("empty list")}
              <br />
              {t("empty list extra")}
            </div>
          )
        ) : (
          gemstones.map((gemstone) => <GemstoneCard key={gemstone.id} gemstone={gemstone} />)
        )}
      </div>
    </ScrollArea>
  );
}
