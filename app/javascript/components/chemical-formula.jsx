import React from "react"
import PropTypes from "prop-types"

class ChemicalFormula extends React.Component {
  static propTypes = {
    formula: PropTypes.string
  }

  render () {
    const formula = this.props.formula
      .split(/_(\d+)_/)
      .map((str, idx) => (idx % 2) ? (<sub key={idx}>{str}</sub>) : (<span key={idx}>{str}</span>));
    return (
      <React.Fragment>
        {formula}
      </React.Fragment>
    );
  }
}

export default ChemicalFormula
