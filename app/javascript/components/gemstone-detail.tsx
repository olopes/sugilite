import * as React from "react";
import { Gemstone } from "./gemstone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "./ui/card";
import { faTrash, faCamera } from "@fortawesome/free-solid-svg-icons";


/**
 * Renders a Gemstone card
 * 
 * @param props 
 * 
 */
export default function GemstoneDetail({ gemstone, onModify, onDelete }: { gemstone: Gemstone, onModify: (gemstone: Gemstone) => void, onDelete: (gemstone: Gemstone) => void }) {

  const clickDelete = React.useCallback((event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    onDelete(gemstone);
  }, [gemstone, onDelete]);


  return (<div className="gemstone compact" onClick={() => onModify(gemstone)}>
    <Card>
      <div>Tomaaaa</div>
    </Card>
    <div className="actions"><span onClick={clickDelete} title="Delete gemstone"><FontAwesomeIcon icon={faTrash} /></span></div>
    <div className="preview">{gemstone.image ? (<img src={gemstone.image} />) : (<FontAwesomeIcon icon={faCamera} className="w-64 h 64" />)}</div>
    <div className="name" title="Name">{gemstone.name}</div>
  </div>);

}
