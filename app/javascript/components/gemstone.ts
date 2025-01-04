
/**
 * Gemstone entity
 */
export interface Gemstone {

  /**
   * Id
   */
  id?: number;
  /**
   * Name
   */
  name: string;
  /**
   * Chemical formula
   */
  chemFormula: string;
  /**
   * Common colors
   */
  color: string;
  /**
   * Picture
   */
  image?: string | null;

  /**
   * Creation date
   */
  readonly createdAt: Date;

  /**
   * Creation date
   */
  readonly updatedAt: Date;

}

