import RapSheet from "../models/rapSheet.model.js";
import { SHAPES, COLORS, CLARITY_GRADES } from "../models/diamond.model.js"
import ApiError from "../utils/ApiError";
/**
 * Calculate price
 * TODO
 *  Need to handle cases with weight bigger than 11 carats
 *  Diamonds large 3-10ct+ sizes may trade at significant different price!
 */

const  calculateByCharacteristics = async (shape: string, weight: number, color: string, clarity: string) => {
  const rapSheet = await RapSheet
    .findOne({ shape: shape, weightFrom: { $lte: weight }, weightTo: { $gte: weight } })
    .sort({ createdAt: -1 })

  if (rapSheet === null) {
    throw new ApiError(404, `Appropriate RapSheet not found. (shape: ${shape}, weight: ${weight}, color: ${color}), clarity: ${clarity}`)
  }

  const rate = findRate(rapSheet, color, clarity)
  return rate * 100 * weight;
}

const findRate = (rapSheet:any, color:string, clarity:string):number =>{
  const normalizedRapSheet = rapSheet.normalizedPriceMatrix()
  const colorPosition: number = COLORS[color]
  const clarityPosition: number = CLARITY_GRADES[clarity]
  const rate = normalizedRapSheet[colorPosition][clarityPosition]

  return rate
}

export { calculateByCharacteristics }
