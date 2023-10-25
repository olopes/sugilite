import PropTypes from "prop-types"

/**
 * Gemstone entity
 */
class Gemstone {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    chemFormula: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    image: PropTypes.string
  };

  /**
   * 
   * @param {{
   * id: string,
   * name: string,
   * chemFormula: string,
   * color: string,
   * image: string,
   * }} props 
   */
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.chemFormula = props.chemFormula;
    this.color = props.color;
    this.image = props.image;
  }

}

export default Gemstone
