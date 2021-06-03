import React from "react"
import PropTypes from "prop-types"

class ChemicalFormula extends React.Component {
  static propTypes = {
    formula: PropTypes.string
  }

  formatFormula(formula) {
    if (!formula) return null;
    return formula
      .trim()
      .split(/_(\d+)_/)
      .map((str, idx) => (idx % 2) ? (<sub key={idx}>{str}</sub>) : (<span key={idx}>{str}</span>));
  }


  formatFormulas(formula) {
    if (!formula) return null;
    const formulas = formula.split('\|\|');
    return formulas.map((s, i) => [(i === 0) ? null : <br key={i} />, this.formatFormula(s)]);
  }


  render() {
    return (
      <React.Fragment>
        {this.formatFormulas(this.props.formula)}
      </React.Fragment>
    );
  }
}

export default ChemicalFormula
