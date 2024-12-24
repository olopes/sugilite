import React from "react";
import GemstoneApp from "./gemstone-app";

/**
 * Main app component
 *
 * @param  props 
 * 
 */
function AppRoot({ title }: { title: string }): React.JSX.Element {
  return (
    <div className="gemstone-app">
      <div className="header">{title}</div>
      <div className="content">
        <GemstoneApp />
      </div>
    </div>);
}


export default AppRoot
