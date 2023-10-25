import React from "react"
import Gemstone from "./gemstone"
import GemstoneDetail from "./gemstone-detail"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


/**
 * Renders a list of Gemstones
 * 
 * @param {{
 * gemstones: Gemstone[],
 * onCreate: () => void,
 * onDelete: (gemstone: Gemstone) => void,
 * onModify: (gemstone: Gemstone) => void,
 * }} props
 * 
 * @returns {React.JSX.Element}
 */
export default function GemstoneList({ gemstones, onCreate, onModify, onDelete }) {

  return (
    <React.Fragment>
      <div className="gemstone-list">
        <GemstoneListItems gemstones={gemstones} onDelete={onDelete} onModify={onModify} />
        <div className="gemstone compact add" onClick={onCreate}>
          <div className="preview"><FontAwesomeIcon icon="plus" style={{ width: 128, height: 128 }} /></div>
          <div className="name">Add new</div>
        </div>
      </div>
    </React.Fragment>
  );
}

/**
 * Renders the list items for each Gemstone
 * 
 * @param {{
 * gemstones: Gemstone[],
 * onDelete: (gemstone: Gemstone) => void,
 * onModify: (gemstone: Gemstone) => void,
 * }} props 
 * @returns {React.JSX.Element}
 */
function GemstoneListItems({ gemstones, onDelete, onModify } ) {
  if (gemstones.length === 0) {
    return (<div className="empty-list">Empty gemstone list.<br />Use the form to add a new gemstone.</div>);
  }
  return (
    <React.Fragment>
      {gemstones.map(gemstone => <GemstoneDetail key={`gem-${gemstone.id}`} gemstone={gemstone} onDelete={onDelete} onModify={onModify} />)}
    </React.Fragment>
  );
}


