import React from "react"
import PropTypes from "prop-types"
import ChemicalFormula from "./chemical-formula"
import Gemstone from "./gemstone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class GemstoneForm extends React.Component {
  static propTypes = {
    gemstone: PropTypes.instanceOf(Gemstone),
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      id: props.gemstone.id,
      name: props.gemstone.name,
      chemFormula: props.gemstone.chemFormula,
      color: props.gemstone.color,
      image: props.gemstone.image
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSave(this.state).then(this.hideForm);
    return false;
  }

  handleCancel() {
    this.props.onCancel();
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleOpenImage(event) {
    document.getElementById('image').click();
  }

  /**
   * This is an event
   * 
   * This event is very eventful
   * 
   * @param {Event} event 
   */
  handleImageChange(event) {
    const input = event.target;
    const canvas = document.getElementById('image-preview');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const url = window.URL || window.webkitURL;
    const src = url.createObjectURL(input.files[0]);

    img.onload = () => {
      // get the scale
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      // get the top left position of the image
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      url.revokeObjectURL(src);
      const imageData = canvas.toDataURL("image/jpeg", 0.7);
      this.setState({image: imageData});
    };
    img.src = src;

  }

  render() {
    return (
      <React.Fragment>
      <div className="gemstone-form visible">
        <form onSubmit={this.handleSubmit}>
          <div className="name"><label htmlFor="name">Name:</label><input id="name" name="name" type="text" placeholder="Type the gemstone name" value={this.state.name} onChange={this.handleChange} /></div>
          <div className="color"><label htmlFor="color">Color:</label><input id="color" name="color" type="text" placeholder="Type the gemstone color" value={this.state.color} onChange={this.handleChange} /></div>
          <div className="chem-formula"><label htmlFor="chemFormula">Chemical Formula:</label><input id="chemFormula" placeholder="Type the gemstone chemical formula" name="chemFormula" type="text" value={this.state.chemFormula} onChange={this.handleChange} /></div>
          <div className="formula-preview">{this.state.chemFormula ? <ChemicalFormula formula={this.state.chemFormula} /> : "Preview"}</div>

          <div className="image">
            <div className="image-manipulation"><input id="image" name="image" type="file" accept="image/*" placeholder="Choose a gemstone picture" onChange={this.handleImageChange}/><canvas id="image-preview" width="128" height="128"></canvas></div>
            <div className="image-preview" title="Click to change image" onClick={this.handleOpenImage}>{this.state.image ? (<img src={this.state.image} />) : (<FontAwesomeIcon icon="camera" style={{width:128, height: 128}} />) }</div>
          </div>


          <div className="buttons"><button type="submit">Save</button><button type="button" onClick={this.handleCancel}>Cancel</button></div>
        </form>
      </div>
      </React.Fragment>
    );
  }
}

export default GemstoneForm
