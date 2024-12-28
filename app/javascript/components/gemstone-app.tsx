import GemstoneList from "@/components/gemstone-list";
import { LoaderCircle } from "lucide-react";
import { useGemstones } from "@/components/gemstone-provider";

export default function GemstoneApp() {
  const { loading } = useGemstones();

  return (
    <main className="flex flex-1 border border-green-400 h-[calc(100vh-theme(spacing.16))]">
      <div className="flex flex-1 grow border border-blue-700">
        {loading ? <LoaderCircle className="w-40 h-40 animate-spin text-accent-foreground" /> : <GemstoneList />}
      </div>
    </main>
  );
}
