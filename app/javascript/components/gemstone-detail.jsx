import React from "react"
import PropTypes from "prop-types"
import Gemstone from "./gemstone"
import ChemicalFormula from "./chemical-formula"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { relative } from "path"

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
    event.stopPropagation();
    this.props.onDelete(this.props.gemstone);
    return false;
  }

  handleClickModify(event) {
    event.stopPropagation();
    this.props.onModify(this.props.gemstone);
    return false;
  }

  render () {
    const name = this.props.gemstone.name;
    const image = this.props.gemstone.image;

    /*if(this.state.expanded) {
      return (
        <div className="gemstone expanded" onClick={this.toggleExpandedView}>
          <div className="name"><label>Name:</label><span>{name}</span></div>
          <div className="color"><label>Color:</label><span>{color}</span></div>
          <div className="chem-formula"><label>Chemical Formula:</label><span><ChemicalFormula formula={chemFormula}/></span></div>
          <div className="buttons"><span onClick={this.handleClickModify} title="Modify gemstone"><FontAwesomeIcon icon="edit" /></span><span onClick={this.handleClickDelete} title="Delete gemstone"><FontAwesomeIcon icon="trash" /></span></div>
        </div>
      );
      } else { */
      return (
        <div className="gemstone compact" onClick={this.handleClickModify}>
          <div className="actions"><span onClick={this.handleClickDelete} title="Delete gemstone"><FontAwesomeIcon icon="trash" /></span></div>
          <div className="preview">{image ? (<img src={image} />) : (<FontAwesomeIcon icon="camera" style={{width:128, height: 128}} />)}</div>
          <div className="name" title="Name">{name}</div>
        </div>
      );
    //}

  }
}

export default GemstoneDetail
