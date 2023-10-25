import Gemstone from "./gemstone"

/**
 * REST client to Gemstones API
 */
class GemstoneService {

  /**
   * List/Query gemstones
   * 
   * @param {string} search filter by name
   * 
   * @returns {Promise<Gemstone[]>} list of gemstones found
   */
  async loadGemstones(search) {
    const url = search ? `/gem_stones?q=${encodeURIComponent(search)}` : '/gem_stones';
    return fetch(url)
      .then(response => {
        this.validateResponse(response);
        return response.json();
      })
      .then(json => json.map(gemstone => new Gemstone({
          chemFormula: gemstone.chem_formula,
          ...gemstone
      })))
      .catch(error => {
        this.handleError(error);
      });
  }

  /**
   * Create a new gemstone
   * 
   * @param {Gemstone} gemstone the gemstone to instert in the database
   * 
   * @returns {Promise<Gemstone>} the new gemstone entity
   */
  async createGemstone(gemstone) {
    const strGemstome = JSON.stringify({
      gem_stone: {
        name: gemstone.name,
        chem_formula: gemstone.chemFormula,
        color: gemstone.color,
        image: gemstone.image
      }
    });

    return fetch('/gem_stones', {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin 
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "X-CSRF-TOKEN": getCSRFToken(),
        "Content-Type": "application/json"
      },
      body: strGemstome
    })
    .then(response => {
      this.validateResponse(response);
      return response.json();
    })
    .then(json => new Gemstone({
      chemFormula: json.chem_formula,
      ...json
    }))
    .catch(error => {
      this.handleError(error);
    });
  }

  /**
   * Delete an existing gemstone
   * 
   * @param {Gemstone} gemstone the gemstone to delete
   * 
   * @returns {Promise<boolean>} true if the gemstone was deleted, false otherwise
   */
  deleteGemstone(gemstone) {
    return fetch(`/gem_stones/${gemstone.id}`, {
      method: "DELETE",
      mode: "cors", // no-cors, *cors, same-origin 
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "X-CSRF-TOKEN": getCSRFToken()
      }
    })
    .then(response => {
      return response.ok;
    })
    .catch(error => {
      this.handleError(error);
    });
  }

  /**
   * Updates a gemstone
   * 
   * @param {Gemstone} gemstone the gemstone data to save
   * 
   * @returns {Promise<Gemstone>} the updated gemstone entity
   */
  async updateGemstone(gemstone) {
    const strGemstome = JSON.stringify({
      gem_stone: {
        name: gemstone.name,
        chem_formula: gemstone.chemFormula,
        color: gemstone.color,
        image: gemstone.image
      }
    });

    return fetch(`/gem_stones/${gemstone.id}`, {
      method: "PUT",
      mode: "cors", // no-cors, *cors, same-origin 
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "X-CSRF-TOKEN": getCSRFToken(),
        "Content-Type": "application/json"
      },
      body: strGemstome
    })
    .then(response => {
      this.validateResponse(response);
      // server replies with code 204: No content
      return new Gemstone(gemstone);
    })
    .catch(error => {
      this.handleError(error);
    });
  }

  /**
   * Checks if the given response finished successfuly, otherwitse throws an exception.
   * 
   * @param {Response} response fetch() response
   * 
   * @returns {Response} successful response
   * 
   * @throws {Error} response was not successful
   */
  validateResponse(response) {
    if (response.ok) {
      return response;
    } else {
      throw new Error("HTTP error, status = " + response.status);
    }
  }

  /**
   * Displays the captured error
   * 
   * @param {Error} error Exception thrown
   */
  handleError(error) {
    console.log(`Error occured:`);
    console.log(error);
  }

}

export default GemstoneService

function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}
