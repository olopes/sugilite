import React from "react"
import PropTypes from "prop-types"
import Gemstone from "./gemstone"
import GemstoneDetail from "./gemstone-detail"

class GemstoneList extends React.Component {
  static propTypes = {
    gemstones: PropTypes.arrayOf(PropTypes.instanceOf(Gemstone)),
    onDelete: PropTypes.func,
    onModify: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  render () {
    const renderedGemstones = this.props.gemstones.map((gemstone, index) => <GemstoneDetail key={gemstone.id} gemstone={gemstone} onDelete={this.props.onDelete} onModify={this.props.onModify}></GemstoneDetail>);
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

