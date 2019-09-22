import React from "react"
import PropTypes from "prop-types"
import Gemstone from "./gemstone"

class GemstoneService {

  async loadGemstones() {
    return fetch('/gem_stones')
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
    const csrfParam = document.querySelector('meta[name="csrf-param"]').getAttribute('content');
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const strGemstome = JSON.stringify({
      [csrfParam]: csrfToken,
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

  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
  }

  handleError(error) {
    console.log(`Error occured:`);
    console.log(error);
  }

}

export default GemstoneService
