import { cn } from "@/lib/utils";

/**
 * Renders a chemical formula
 * 
 * @param {{formula: string}} props
 * 
 */
export default function ChemicalFormula({ formula, className }: { formula: string; className?: string }) {
  if (formula === null || formula === undefined || formula.trim() === '') return (<span>Preview</span>);

  return (<ul className={cn(className)}>
    {formula.split('||').map((part, idx) => <FormatFormulaPart key={`fpart-${idx}`} formulaPart={part} />)}
  </ul>);
}

/**
 * Render a part of a multipart formula
 * 
 * @param {{formulaPart: string}} props 
 * 
 */
function FormatFormulaPart({ formulaPart }: { formulaPart: string; }) {
  if (formulaPart === null || formulaPart === undefined) return null;

  const formulaElements = formulaPart
    .trim()
    .split(/(\^[^^]+\^|_[^_]+_)/)
    .filter(tok => tok.trim() !== "")
    .map((token, idx) => {
      if (token.startsWith("_") && token.endsWith("_")) {
        console.log("Sub Token =>", token);
        return <sub key={`sub-${idx}`}>{token.substring(1, token.length - 1)}</sub>;
      } else if (token.startsWith("^") && token.endsWith("^")) {
        console.log("Sup Token =>", token);
        return <sup key={`sup-${idx}`}>{token.substring(1, token.length - 1)}</sup>;
      } else {
        console.log("Span Token =>", token);
        return <span key={`span-${idx}`}>{token}</span>;
      }
    });
  return (<li className="formula-part">{formulaElements}</li>);
}
