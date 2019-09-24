import React from "react"
import GemstoneApp from "./gemstone-app"
import {library} from "@fortawesome/fontawesome-svg-core"
import {faTrash, faEdit, faSyncAlt, faSearch, faCamera, faPlus} from "@fortawesome/free-solid-svg-icons"
library.add(faTrash, faEdit, faSyncAlt, faSearch, faCamera, faPlus);

function AppRoot(props) {
  return (
    <div className="gemstone-app">
      <div className="header">{props.title}</div>
      <div className="content">
        <GemstoneApp />
      </div>
    </div>);
}


export default AppRoot
