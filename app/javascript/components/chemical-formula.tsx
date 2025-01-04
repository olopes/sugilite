import { cn } from "@/lib/utils";

/**
 * Renders a chemical formula
 *
 * @param {{formula: string}} props
 *
 */
export default function ChemicalFormula({
  label,
  formula,
  className,
  single,
}: {
  label?: string;
  formula: string;
  className?: string;
  single?: boolean;
}) {
  if (formula === null || formula === undefined || formula.trim() === "") return <span>{label}</span>;

  const tokens = formula.split("||");

  if (single) {
    return <>{parseFormulaPart(tokens[0])}</>;
  }

  return (
    <ul className={cn(className)}>
      {tokens.map((part, idx) => (
        <li key={`fpart-${idx}`} className="formula-part">
          {parseFormulaPart(part)}
        </li>
      ))}
    </ul>
  );
}

/**
 * Render a part of a multipart formula
 *
 */
function parseFormulaPart(formulaPart: string) {
  if (formulaPart === null || formulaPart === undefined) return null;

  const formulaElements = formulaPart
    .trim()
    .split(/(\^[^^]+\^|_[^_]+_)/)
    .filter((tok) => tok.trim() !== "")
    .map((token, idx) => {
      if (token.startsWith("_") && token.endsWith("_")) {
        return <sub key={`sub-${idx}`}>{token.substring(1, token.length - 1)}</sub>;
      } else if (token.startsWith("^") && token.endsWith("^")) {
        return <sup key={`sup-${idx}`}>{token.substring(1, token.length - 1)}</sup>;
      } else {
        return <span key={`span-${idx}`}>{token}</span>;
      }
    });
  return formulaElements;
}
