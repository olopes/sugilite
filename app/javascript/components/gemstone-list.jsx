import React from "react"
import PropTypes from "prop-types"
import Gemstone from "./gemstone"
import GemstoneDetail from "./gemstone-detail"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class GemstoneList extends React.Component {
  static propTypes = {
    gemstones: PropTypes.arrayOf(PropTypes.instanceOf(Gemstone)),
    onDelete: PropTypes.func,
    onModify: PropTypes.func,
    onCreate: PropTypes.func
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
          <div className="gemstone compact add" onClick={this.props.onCreate}>
            <div className="preview"><FontAwesomeIcon icon="plus" style={{width:128, height: 128}} /></div>
            <div className="name">Add new</div>
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export default GemstoneList

