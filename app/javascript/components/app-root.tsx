import GemstoneApp from "@/components/gemstone-app";
import { TooltipProvider } from "@/components//ui/tooltip";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { QuickSearchProvider } from "@/components/quicksearch-provider";
import { GemstoneHeader } from "@/components/gemstone-header";
import { GemstoneProvider } from "@/components/gemstone-provider";

/**
 * Main app component
 *
 * @param  props
 *
 */
function AppRoot({ title }: { title: string }): ReactNode {
  return (
    <GemstoneProvider>
      <ThemeProvider defaultTheme="system" storageKey="sugilite-ui-theme">
        <TooltipProvider>
          <QuickSearchProvider>
            <GemstoneHeader title={title} />
            <GemstoneApp />
          </QuickSearchProvider>
        </TooltipProvider>
      </ThemeProvider>
    </GemstoneProvider>
  );
}

export default AppRoot;
