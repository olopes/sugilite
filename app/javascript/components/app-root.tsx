import GemstoneApp from "@/components/gemstone-app";
import { TooltipProvider } from "@/components//ui/tooltip";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { QuickSearchProvider } from "@/components/quicksearch-provider";
import { GemstoneHeader } from "@/components/gemstone-header";
import { GemstoneProvider } from "@/components/gemstone-provider";
import { LanguageProvider } from "@/components/i18n-provider";

/**
 * Main app component
 *
 * @param  props
 *
 */
function AppRoot({ title }: { title: string }): ReactNode {
  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="system" storageKey="sugilite-ui-theme">
        <TooltipProvider>
          <GemstoneProvider>
            <QuickSearchProvider>
              <GemstoneHeader title={title} />
              <GemstoneApp />
            </QuickSearchProvider>
          </GemstoneProvider>
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default AppRoot;
