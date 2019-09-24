import React from "react"
import GemstoneApp from "./gemstone-app"
import {library} from "@fortawesome/fontawesome-svg-core"
import {faTrash, faEdit, faSyncAlt, faSearch} from "@fortawesome/free-solid-svg-icons"
library.add(faTrash, faEdit, faSyncAlt, faSearch);

function AppRoot(props) {
  return (
    <div className="gemstone-app">
      <h1>{props.title}</h1>
      <GemstoneApp />
    </div>);
}


export default AppRoot
