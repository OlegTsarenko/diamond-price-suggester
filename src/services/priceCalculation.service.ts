import RapSheet from "../models/rapSheet.model.js";
import { Shape, Color, ClarityGrades } from "../models/diamond.model.js"

/**
 * Calculate price
 * TODO
 *  Need to handle cases with weight bigger than 11 carats
 *  Diamonds large 3-10ct+ sizes may trade at significant different price!
 *
 * @param {string} shape
 * @param {number} weight
 * @param {string} color
 * @param {string} clarity
 * @returns {number}
 */

const  calculateByCharacteristics = async (shape: Shape, weight: number, color: Color, clarity: ClarityGrades) => {
  // TODO Use shape
  const rapSheet = await RapSheet
    .findOne({ weightFrom: { $lte: weight }, weightTo: { $gte: weight } })
    .sort({ createdAt: -1 })

  const normalizedRapSheet = rapSheet.normalizedPriceMatrix()
  const colorIndex = Color[color]
  const clarityIndex = ClarityGrades[clarity]
  const rate = normalizedRapSheet[colorIndex][clarityIndex]

  return rate * 100 * weight;
};

export { calculateByCharacteristics }
