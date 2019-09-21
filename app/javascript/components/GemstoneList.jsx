import React from "react"
import GemstoneDetail from './GemstoneDetail'

class GemstoneList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gemstones: []};
  }

  componentDidMount() {
    this.getGemstones();
  }

  render () {
    const renderedGemstones = (this.state.gemstones || [])
        .map((gemstone, index) => <GemstoneDetail key={index} gemstone={gemstone}></GemstoneDetail>);
    return (
      <div className="gemstone-list">
        {renderedGemstones}
      </div>
    );
  }

  getGemstones() {
    const gemstones = [{
      name: "Sugilite",
      chem_formula: "",
      color: "purple"
    },{
      name: "Ruby",
      chem_formula: "",
      color: "red"
    },{
      name: "Diamond",
      chem_formula: "",
      color: "none"
    },{
      name: "Emerald",
      chem_formula: "",
      color: "green"
    }];

    this.setState({gemstones: gemstones});
  }
}

export default GemstoneList
