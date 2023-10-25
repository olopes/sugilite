import React from "react"

/**
 * Renders a chemical formula
 * 
 * @param {{formula: string}} props
 * 
 * @returns {React.JSX.Element} 
 */
export default function ChemicalFormula({ formula }) {
  if (formula === null || formula === undefined || formula.trim() === '') return (<span>Preview</span>);

  return (<ul className="formula-group">
    {formula.split('||').map((part, idx) => <FormatFormulaPart key={`fpart-${idx}`} formulaPart={part} />)}
  </ul>);
}

/**
 * Render a part of a multipart formula
 * 
 * @param {{formulaPart: string}} props 
 * 
 * @returns {React.JSX.Element} 
 */
function FormatFormulaPart({ formulaPart }) {
  if (formulaPart === null || formulaPart === undefined) return null;

  return (<li className="formula-part">
    {
      formulaPart
        .trim()
        .split(/_(\d+)_/)
        .map((str, idx) => (idx % 2) ? (<sub key={`sub-${idx}`}>{str}</sub>) : (<span key={`span-${idx}`}>{str}</span>))
    }
  </li>);
}
