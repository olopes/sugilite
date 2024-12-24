import React from "react";
import GemstoneApp from "@/components/gemstone-app";
import { TooltipProvider } from "@/components//ui/tooltip";

/**
 * Main app component
 *
 * @param  props 
 * 
 */
function AppRoot({ title }: { title: string }): React.JSX.Element {
  return (
    <TooltipProvider >
      <div className="gemstone-app">
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <div className="text-xl text-medium">{title}</div>
        </header>
        <div className="content">
          <GemstoneApp />
        </div>
      </div></TooltipProvider>
  );
}


export default AppRoot
