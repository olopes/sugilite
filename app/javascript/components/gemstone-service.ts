import { Gemstone } from "@/components/gemstone"

type BackendGem = Omit<Gemstone, "chemFormula"> & { chem_formula?: string | null };
/**
 * REST client to Gemstones API
 */
class GemstoneService {

  /**
   * List/Query gemstones
   * 
   * @param {string} search filter by name
   * 
   */
  async loadGemstones(search?: string) {
    const url = search ? `/gem_stones?q=${encodeURIComponent(search)}` : '/gem_stones';
    try {
      const response = this.validateResponse(await fetch(url));
      const gemstones = await response.json() as BackendGem[]
      return gemstones.map((gem) => ({ ...gem, chemFormula: gem.chem_formula })) as Gemstone[];
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Create a new gemstone
   * 
   * @param {Gemstone} gemstone the gemstone to instert in the database
   * 
   */
  async createGemstone(gemstone: Gemstone) {
    try {
      const strGemstome = JSON.stringify({
        gem_stone: {
          name: gemstone.name,
          chem_formula: gemstone.chemFormula,
          color: gemstone.color,
          image: gemstone.image
        }
      });

      const response = this.validateResponse(await fetch('/gem_stones', {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin 
        credentials: "same-origin", // include, *same-origin, omit
        headers: this.getHeaders(),
        body: strGemstome
      }));
      const data = await response.json() as BackendGem;
      return { ...data, chemFormula: data.chem_formula } as Gemstone;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Delete an existing gemstone
   * 
   * @param {Gemstone} gemstone the gemstone to delete
   * 
   * @returns {Promise<boolean>} true if the gemstone was deleted, false otherwise
   */
  deleteGemstone(gemstone: Gemstone) {
    return fetch(`/gem_stones/${gemstone.id}`, {
      method: "DELETE",
      mode: "cors", // no-cors, *cors, same-origin 
      credentials: "same-origin", // include, *same-origin, omit
      headers: this.getHeaders()
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
  async updateGemstone(gemstone: Gemstone) {
    try {
      const strGemstome = JSON.stringify({
        gem_stone: {
          name: gemstone.name,
          chem_formula: gemstone.chemFormula,
          color: gemstone.color,
          image: gemstone.image
        }
      });

      this.validateResponse(await fetch(`/gem_stones/${gemstone.id}`, {
        method: "PUT",
        mode: "cors", // no-cors, *cors, same-origin 
        credentials: "same-origin", // include, *same-origin, omit
        headers: this.getHeaders(),
        body: strGemstome
      }));
      return gemstone;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
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
  validateResponse(response: Response): Response {
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
  handleError(error: unknown) {
    console.error(`Error occured:`, error);
  }


  getHeaders(): Headers {
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    const token = getCSRFToken();
    if (token) {
      headers.set("X-CSRF-TOKEN", token);
    }
    return headers;
  }
}

export default GemstoneService

function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
}
