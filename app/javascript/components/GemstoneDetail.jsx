import React from "react"
import PropTypes from "prop-types"

class GemstoneDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const gemstone = this.props.gemstone;
    return (
      <div className="gemstone">
        <div className="name"><span>Name:</span><span>{gemstone.name}</span></div>
        <div className="chem-formula"><span>Chemical Formula:</span><span>{gemstone.chem_formula}</span></div>
        <div className="color"><span>Color:</span><span>{gemstone.color}</span></div>
      </div>
    );
  }
}

export default GemstoneDetail
