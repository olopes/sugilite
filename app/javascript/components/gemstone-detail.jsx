import React from "react"
import PropTypes from "prop-types"
import Gemstone from "./gemstone"
import ChemicalFormula from "./chemical-formula"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class GemstoneDetail extends React.Component {

  static propTypes = {
    gemstone: PropTypes.instanceOf(Gemstone),
    onDelete: PropTypes.func,
    onModify: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickModify = this.handleClickModify.bind(this);
  }

  handleClickDelete(event) {
    event.preventDefault();
    this.props.onDelete(this.props.gemstone);
    return false;
  }

  handleClickModify(event) {
    event.preventDefault();
    this.props.onModify(this.props.gemstone);
    return false;
  }

  render () {
    const name = this.props.gemstone.name;
    const chemFormula = this.props.gemstone.chemFormula;
    const color = this.props.gemstone.color;

    return (
      <div className="gemstone">
        <div className="name"><label>Name:</label><span>{name}</span></div>
        <div className="color"><label>Color:</label><span>{color}</span></div>
        <div className="chem-formula"><label>Chemical Formula:</label><span><ChemicalFormula formula={chemFormula}/></span></div>
        <div className="buttons"><span onClick={this.handleClickModify} title="Modify gemstone"><FontAwesomeIcon icon="edit" /></span><span onClick={this.handleClickDelete} title="Delete gemstone"><FontAwesomeIcon icon="trash" /></span></div>
      </div>
    );
  }
}

export default GemstoneDetail
