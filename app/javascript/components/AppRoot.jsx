import React from "react"
import GemstoneApp from "./gemstone-app"
import {library} from "@fortawesome/fontawesome-svg-core"
import {faTrash, faEdit, faSyncAlt, faSearch, faCamera, faPlus, faSpinner} from "@fortawesome/free-solid-svg-icons"
library.add(faTrash, faEdit, faSyncAlt, faSearch, faCamera, faPlus, faSpinner);

/**
 * Main app component
 *
 * @param {{title:string}} props 
 * 
 * @returns {React.JSX.Element}
 */
function AppRoot({title}) {
  return (
    <div className="gemstone-app">
      <div className="header">{title}</div>
      <div className="content">
        <GemstoneApp />
      </div>
    </div>);
}


export default AppRoot
