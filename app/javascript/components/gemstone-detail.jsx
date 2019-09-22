import React from "react"
import PropTypes from "prop-types"
import Gemstone from "./gemstone"
import ChemicalFormula from "./chemical-formula"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class GemstoneDetail extends React.Component {

  static propTypes = {
    gemstone: PropTypes.instanceOf(Gemstone)
  }

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleModify = this.handleModify.bind(this);
  }

  handleDelete(event) {
    const id = this.props.gemstone.id;
    const name = this.props.gemstone.name;
    console.log("Delete gemstone");
    console.log(event);
    if(confirm(`Do you really want to delete ${name} (${id}) ?`)) {
      console.log('bye bye!!');
    }
  }

  handleModify(event) {
    console.log("Edit gemstone");
    console.log(event);
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
        <div className="buttons"><span onClick={this.handleModify}><FontAwesomeIcon icon="edit" /></span><span onClick={this.handleDelete}><FontAwesomeIcon icon="trash" /></span></div>
      </div>
    );
  }
}

export default GemstoneDetail
