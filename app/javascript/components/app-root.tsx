import GemstoneApp from "@/components/gemstone-app";
import { TooltipProvider } from "@/components//ui/tooltip";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { QuickSearchProvider } from "@/components/quicksearch-provider";
import { GemstoneHeader } from "@/components/gemstone-header";
import { GemstoneProvider } from "@/components/gemstone-provider";
import { LanguageProvider } from "@/components/i18n-provider";
import { Toaster } from "@/components/ui/sonner";

/**
 * Main app component
 *
 * @param  props
 *
 */
function AppRoot(): ReactNode {
  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="system" storageKey="sugilite-ui-theme">
        <TooltipProvider>
          <GemstoneProvider>
            <QuickSearchProvider>
              <GemstoneHeader />
              <GemstoneApp />
              <Toaster />
            </QuickSearchProvider>
          </GemstoneProvider>
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default AppRoot;
