import React from "react"
import PropTypes from "prop-types"
import Gemstone from "./gemstone"
import GemstoneDetail from './gemstone-detail'

class GemstoneList extends React.Component {
  static propTypes = {
    gemstones: PropTypes.arrayOf(PropTypes.instanceOf(Gemstone)),
    onDelete: PropTypes.func,
    onModify: PropTypes.func
  }

  static defaultProps = {
    onDelete: () => new Promise((resolve, _) => resolve(true)),
    onModify: () => new Promise((resolve, _) => resolve(true))
  }

  constructor(props) {
    super(props);
    this.handleModify = this.handleModify.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleModify(gemstone) {
    return this.props.onModify();
  }

  handleDelete(gemstone) {
    return this.props.onDelete().then(() => {
      const gemstones = this.state.gemstones.filter(g => g.id !== gemstone.id);
      this.setState({ gemstones });
    });
  }

  render () {
    const renderedGemstones = this.props.gemstones.map((gemstone, index) => <GemstoneDetail key={gemstone.id} gemstone={gemstone}></GemstoneDetail>);
    return (
      <React.Fragment>
        <div className="gemstone-list">
          {renderedGemstones.length ? renderedGemstones : <div className="empty-list">Empty gemstone list.<br/>Use the form to add a new gemstone.</div>}
        </div>
      </React.Fragment>
    );
  }

}

export default GemstoneList

