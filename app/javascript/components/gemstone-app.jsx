import React from "react"
import PropTypes from 'prop-types'
import Gemstone from './gemstone'
import GemstoneForm from './gemstone-form'
import GemstoneList from './gemstone-list'
import GemstoneService from "./gemstone-service";

class GemstoneApp extends React.Component {
  static propTypes = {
    gemstones: PropTypes.arrayOf(PropTypes.instanceOf(Gemstone)),
    title: PropTypes.string
  }

  static defaultProps = {
    gemstones: []
  }

  constructor(props) {
    super(props);
    this.state = {gemstones: props.gemstones};
    this.gemstoneService = new GemstoneService();
    this.handleSaveGemstone = this.handleSaveGemstone.bind(this);
  }

  componentDidMount() {
    this.getGemstones();
  }

  getGemstones() {
    this.gemstoneService.loadGemstones().then(gemstones => this.setState({gemstones}));
  }

  handleSaveGemstone(gemstone) {
    return this.gemstoneService.createGemstone(gemstone).then(_ => this.getGemstones());
  }

  render () {
    return (
      <React.Fragment>
        <div className="gemstone-app">
          <h1>{this.props.title}</h1>
          <GemstoneList gemstones={this.state.gemstones}></GemstoneList>
          <GemstoneForm onSave={this.handleSaveGemstone}></GemstoneForm>
        </div>
      </React.Fragment>
    );
  }
}

export default GemstoneApp
