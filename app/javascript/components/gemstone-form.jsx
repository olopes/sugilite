import React from "react"
import PropTypes from "prop-types"
import ChemicalFormula from "./chemical-formula"
import Gemstone from "./gemstone"

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
      color: props.gemstone.color
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
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

  render() {
    return (
      <React.Fragment>
      <div className="gemstone-form visible">
        <form onSubmit={this.handleSubmit}>
          <div className="name"><label htmlFor="name">Name:</label><input id="name" name="name" type="text" placeholder="Type the gemstone name" value={this.state.name} onChange={this.handleChange} /></div>
          <div className="color"><label htmlFor="color">Color:</label><input id="color" name="color" type="text" placeholder="Type the gemstone color" value={this.state.color} onChange={this.handleChange} /></div>
          <div className="chem-formula"><label htmlFor="chemFormula">Chemical Formula:</label><input id="chemFormula" placeholder="Type the gemstone chemical formula" name="chemFormula" type="text" value={this.state.chemFormula} onChange={this.handleChange} /></div>
          <div className="formula-preview">{this.state.chemFormula ? <ChemicalFormula formula={this.state.chemFormula} /> : "Preview"}</div>
          <div className="buttons"><button type="submit">Save</button><button type="button" onClick={this.handleCancel}>Cancel</button></div>
        </form>
      </div>
      </React.Fragment>
    );
  }
}

export default GemstoneForm
