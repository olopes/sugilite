import PropTypes from "prop-types"

class Gemstone {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    chemFormula: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  };

  constructor(props) {
    this.id = props.id,
    this.name = props.name;
    this.chemFormula = props.chemFormula;
    this.color = props.color;
  }
  
}

export default Gemstone
