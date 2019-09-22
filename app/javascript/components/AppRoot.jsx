import React from "react"
import GemstoneApp from "./gemstone-app"
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faEdit);

function AppRoot(props) {
  return (<GemstoneApp title={props.title}/>);
}


export default AppRoot
