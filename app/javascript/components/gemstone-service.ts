import { Gemstone } from "@/components/gemstone";

type BackendGem = Omit<Gemstone, "chemFormula" | "createdAt" | "updatedAt"> & {
  chem_formula: string;
  created_at: string;
  updated_at: string;
};

/**
 * REST client to Gemstones API
 */
class GemstoneService {
  public static rootPath: string;
  static {
    const root = document.getElementById("sugilite-root")?.dataset?.root ?? "";
    this.rootPath = root.endsWith("/") ? root.substring(0, root.length - 1) : root;
    console.log("Root path", this.rootPath);
  }

  private get rootPath(): string {
    return GemstoneService.rootPath;
  }

  /**
   * List/Query gemstones
   *
   * @param {string} search filter by name
   *
   */
  async loadGemstones(search?: string): Promise<Gemstone[]> {
    const urlParams = search ? `?q=${encodeURIComponent(search)}` : "";
    const url = `${this.rootPath}/gem_stones${urlParams}`;
    try {
      const response = this.validateResponse(await fetch(url));
      const gemstones = (await response.json()) as BackendGem[];
      return gemstones.map((gem) => ({
        id: gem.id,
        name: gem.name,
        color: gem.color,
        chemFormula: gem.chem_formula,
        image: gem.image,
        createdAt: new Date(gem.created_at),
        updatedAt: new Date(gem.updated_at),
      }));
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
  async createGemstone(gemstone: Gemstone): Promise<Gemstone> {
    try {
      const strGemstome = JSON.stringify({
        gem_stone: {
          name: gemstone.name,
          chem_formula: gemstone.chemFormula,
          color: gemstone.color,
          image: gemstone.image,
        },
      });

      const response = this.validateResponse(
        await fetch(`${this.rootPath}/gem_stones`, {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          credentials: "same-origin", // include, *same-origin, omit
          headers: this.getHeaders(),
          body: strGemstome,
        })
      );
      const data = (await response.json()) as BackendGem;
      return {
        id: data.id,
        name: data.name,
        color: data.color,
        chemFormula: data.chem_formula,
        image: data.image,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };
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
  async deleteGemstone(gemstone: Gemstone): Promise<boolean> {
    return fetch(`${this.rootPath}/gem_stones/${encodeURIComponent(gemstone.id!)}`, {
      method: "DELETE",
      mode: "cors", // no-cors, *cors, same-origin
      credentials: "same-origin", // include, *same-origin, omit
      headers: this.getHeaders(),
    })
      .then((response) => !!response.ok)
      .catch((error) => {
        this.handleError(error);
        return false;
      });
  }

  /**
   * Updates a gemstone
   *
   * @param {Gemstone} gemstone the gemstone data to save
   *
   * @returns {Promise<Gemstone>} the updated gemstone entity
   */
  async updateGemstone(gemstone: Gemstone): Promise<Gemstone> {
    try {
      const strGemstome = JSON.stringify({
        gem_stone: {
          name: gemstone.name,
          chem_formula: gemstone.chemFormula,
          color: gemstone.color,
          image: gemstone.image,
        },
      });

      this.validateResponse(
        await fetch(`${this.rootPath}/gem_stones/${encodeURIComponent(gemstone.id!)}`, {
          method: "PUT",
          mode: "cors", // no-cors, *cors, same-origin
          credentials: "same-origin", // include, *same-origin, omit
          headers: this.getHeaders(),
          body: strGemstome,
        })
      );
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
      "Content-Type": "application/json",
    });
    const token = getCSRFToken();
    if (token) {
      headers.set("X-CSRF-TOKEN", token);
    }
    return headers;
  }
}

export default GemstoneService;

function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
}
