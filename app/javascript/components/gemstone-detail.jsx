import React from "react"
import Gemstone from "./gemstone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


/**
 * Renders a Gemstone card
 * 
 * @param {{
 * gemstone: Gemstone,
 * onDelete: (gemstone: Gemstone) => void,
 * onModify: (gemstone: Gemstone) => void,
 * }} props 
 * 
 * @returns {React.JSX.Element} 
 */
export default function GemstoneDetail({ gemstone, onModify, onDelete }) {

  const clickDelete = (event) => {
    event.stopPropagation();
    onDelete(gemstone);
  };


  return (<div className="gemstone compact" onClick={() => onModify(gemstone)}>
    <div className="actions"><span onClick={clickDelete} title="Delete gemstone"><FontAwesomeIcon icon="trash" /></span></div>
    <div className="preview">{gemstone.image ? (<img src={gemstone.image} />) : (<FontAwesomeIcon icon="camera" style={{ width: 128, height: 128 }} />)}</div>
    <div className="name" title="Name">{gemstone.name}</div>
  </div>);

}
