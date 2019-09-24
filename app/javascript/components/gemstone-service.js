import Gemstone from "./gemstone"

class GemstoneService {

  async loadGemstones(search) {
    const url = search ? `/gem_stones?q=${encodeURIComponent(search)}` : '/gem_stones';
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
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

  async createGemstone(gemstone) {
    const strGemstome = JSON.stringify({
      gem_stones: {
        name: gemstone.name,
        chem_formula: gemstone.chemFormula,
        color: gemstone.color
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
      if (!response.ok) {
        this.handleResponseError(response);
      }
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

  async updateGemstone(gemstone) {
    const strGemstome = JSON.stringify({
      gem_stones: {
        name: gemstone.name,
        chem_formula: gemstone.chemFormula,
        color: gemstone.color
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
      if (!response.ok) {
        this.handleResponseError(response);
      }
      // server replies with code 204: No content
      return new Gemstone(gemstone);
    })
    .catch(error => {
      this.handleError(error);
    });
  }

  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
  }

  handleError(error) {
    console.log(`Error occured:`);
    console.log(error);
  }

}

export default GemstoneService

function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}
