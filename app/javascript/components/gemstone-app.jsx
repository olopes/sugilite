import React from "react"
import PropTypes from "prop-types"
import Gemstone from "./gemstone"
import GemstoneForm from "./gemstone-form"
import GemstoneList from "./gemstone-list"
import GemstoneService from "./gemstone-service"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const emptyPromise = () => new Promise((resolve,reject) => resolve(true));

const Mode = Object.freeze({
  LIST:   Symbol("list"),
  MODIFY:  Symbol("modify"),
  CREATE: Symbol("create")
});

class GemstoneApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gemstones: [],
      gemstone: null,
      quicksearch: '',
      mode: Mode.LIST
    };
    this.gemstoneService = new GemstoneService();

    this.getGemstones = this.getGemstones.bind(this);
    this.handleSaveNew = this.handleSaveNew.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSaveExisting = this.handleSaveExisting.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getGemstones();
  }

  getGemstones() {
    if(arguments.length) {
      const event = arguments[0];
      event.preventDefault();
      event.stopPropagation();
    }
    this.gemstoneService
      .loadGemstones(this.state.quicksearch)
      .then(gemstones => this.setState({gemstones: gemstones, mode: Mode.LIST}));
    return false;
  }

  handleSaveNew(gemstone) {
    return this.gemstoneService.createGemstone(gemstone).then(_ => this.getGemstones());
  }

  handleCancel() {
    this.setState({mode:Mode.LIST});
  }

  handleCreate(gemstone) {
    console.log("APP: Modify gemstone");
    console.log(gemstone);
    this.setState({gemstone: new Gemstone({
      id: -1,
      name: '',
      chemFormula: '',
      color: ''
    }), mode: Mode.CREATE});
  }

  handleModify(gemstone) {
    console.log("APP: Modify gemstone");
    console.log(gemstone);
    this.setState({gemstone: gemstone, mode: Mode.MODIFY});
  }

  handleSaveExisting(gemstone) {
    console.log("APP: Modify gemstone");
    console.log(gemstone);
    return this.gemstoneService.updateGemstone(gemstone).then(updatedGemstone => {
      const id = updatedGemstone.id;
      const gemstones = this.state.gemstones.map((g) => g.id == id ? updatedGemstone : g);
      this.setState({gemstones: gemstones, mode: Mode.LIST});
    });
  }

  handleDelete(gemstone) {
    if(confirm(`Do you really want to delete "${gemstone.name}" (${gemstone.id}) ?`)) {
      return this.gemstoneService.deleteGemstone(gemstone).then((success) => {
        if(success) {
          const gemstones = this.state.gemstones.filter(g => g.id !== gemstone.id);
          this.setState({ gemstones });
        }
        return success;
      });
    } else {
      return emptyPromise();
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  render () {
    if(this.state.mode === Mode.CREATE) {
      return (
        <React.Fragment>
          <GemstoneForm gemstone={this.state.gemstone} onSave={this.handleSaveNew} onCancel={this.handleCancel}></GemstoneForm>
        </React.Fragment>
      );
    }
    if(this.state.mode === Mode.MODIFY) {
      return (
        <React.Fragment>
          <GemstoneForm gemstone={this.state.gemstone} onSave={this.handleSaveExisting} onCancel={this.handleCancel}></GemstoneForm>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className="filter">
          <form onSubmit={this.getGemstones}>
          <input id="quicksearch" name="quicksearch" type="text" placeholder="Quick search" value={this.state.quicksearch} onChange={this.handleChange} /><FontAwesomeIcon icon="search" title="Search" onClick={this.getGemstones} />
          </form>
        </div>
        <GemstoneList gemstones={this.state.gemstones} onDelete={this.handleDelete} onModify={this.handleModify} onCreate={this.handleCreate}></GemstoneList>
      </React.Fragment>
    );

  }
}

export default GemstoneApp
