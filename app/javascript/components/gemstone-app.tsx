import GemstoneList from "@/components/gemstone-list";
import { LoaderCircle } from "lucide-react";
import { useGemstones } from "@/components/gemstone-provider";

export default function GemstoneApp() {
  const { loading } = useGemstones();

  return (
    <main className="h-[calc(100vh-theme(spacing.16))]">
      <div className="flex flex-1 grow justify-center items-center h-full">
        {loading ? <LoaderCircle className="w-40 h-40 animate-spin text-muted-foreground" /> : <GemstoneList />}
      </div>
    </main>
  );
}
