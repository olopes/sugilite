import GemstoneList from "@/components/gemstone-list";

export default function GemstoneApp() {
  return (
    <main className="h-[calc(100vh-theme(spacing.16))]">
      <div className="flex flex-1 grow justify-center items-center h-full">
        <GemstoneList />
      </div>
    </main>
  );
}
