import React from "react"
import PropTypes from "prop-types"
import ChemicalFormula from "./chemical-formula"

class GemstoneForm extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    chemFormula: PropTypes.string,
    color: PropTypes.string,
    onSave: PropTypes.func
  }

  static defaultProps = {
    name: '',
    chemFormula: '',
    color: '',
    onSave: () => new Promise((resolve,_) => resolve(true))
  }

  constructor(props) {
    super(props);
    this.state = {
      name: props.name || '',
      chemFormula: props.chemFormula || '',
      color: props.color || '',
      visible: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSave(this.state).then(this.hideForm);
    return false;
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  showForm() {
    this.setState({
      name: '',
      chemFormula: '',
      color: '', 
      visible:true
    });
  }

  hideForm() {
    this.setState({ visible: false });
  }

  render() {
    if(this.state.visible) {
      return (
        <React.Fragment>
        <div className="gemstone-form visible">
          <form onSubmit={this.handleSubmit}>
            <div className="name"><label htmlFor="name">Name:</label><input id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} /></div>
            <div className="color"><label htmlFor="color">Color:</label><input id="color" name="color" type="text" value={this.state.color} onChange={this.handleChange} /></div>
            <div className="chem-formula"><label htmlFor="chemFormula">Chemical Formula:</label><input id="chemFormula" name="chemFormula" type="text" value={this.state.chemFormula} onChange={this.handleChange} /></div>
            <div className="formula-preview">{this.state.chemFormula ? <ChemicalFormula formula={this.state.chemFormula} /> : "Preview"}</div>
            <div className="buttons"><button type="submit">Save</button><button type="button" onClick={this.hideForm}>Cancel</button></div>
          </form>
        </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
        <div className="gemstone-form hidden">
          <div className="buttons"><button type="button" onClick={this.showForm}>Add Gemstone</button></div>
        </div>
        </React.Fragment>
      );
      }
  }
}

export default GemstoneForm
