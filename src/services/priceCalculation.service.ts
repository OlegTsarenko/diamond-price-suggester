import RapSheet from "../models/rapSheet.model.js";
import {COLORS, CLARITY_GRADES, Diamond} from "../models/diamond.model.js"
import ApiError from "../utils/ApiError";
import {round} from "lodash";
import {StatusCodes} from "http-status-codes";

const WEIGHT_GROUPS = [
  [0.01, 0.03], [0.04, 0.07], [0.08, 0.14], [0.15, 0.17], [0.18, 0.22], [0.23, 0.29],
  [0.30, 0.39], [0.40, 0.49], [0.50, 0.69], [0.70, 0.89], [0.90, 0.99], [1.00, 1.49],
  [1.50, 1.99], [2.00, 2.99], [3.00, 3.99], [4.00, 4.99], [5.00, 6.99], [7.00, 7.99],
  [8.00, 8.99], [9.00, 9.99], [10.00, 10.99]
]
const COLOR_GROUPS = [['D', 'E', 'F'], ['G', 'H'], ['I', 'J'], ['K', 'L'], ['M', 'N']]
const CLARITY_GROUPS = [['IF', 'VVS1', 'VVS2'], ['VS1', 'VS2'], ['SI1', 'SI2', 'SI3'], ['I1', 'I2', 'I3']]

/**
 * TODO
 *  Need to handle cases with weight bigger than 11 carats
 *  Diamonds large 3-10ct+ sizes may trade at significant different price!
 */

const priceByRapSheet = async (shape: string, weight: number, color: string, clarity: string) => {
  const rapSheet = await RapSheet
    .findOne({shape: shape, weightFrom: {$lte: weight}, weightTo: {$gte: weight}})
    .sort({createdAt: -1})

  if (rapSheet === null) {
    throw new ApiError(404, `Appropriate RapSheet not found. (shape: ${shape}, weight: ${weight})`)
  }

  const rate = findRate(rapSheet, color, clarity)

  // To get price in USD from RapSheet need to multiplication rate to 100
  return rate * 100 * weight;
}

const findRate = (rapSheet: any, color: string, clarity: string): number => {
  const normalizedRapSheet = rapSheet.normalizedPriceMatrix()
  const colorPosition: number = COLORS[color]
  const clarityPosition: number = CLARITY_GRADES[clarity]
  const rate = normalizedRapSheet[colorPosition][clarityPosition]

  return rate
}

const averagePriceBy = async (fieldName: string, shape: string, weight: number, color: string, clarity: string) => {
  const result = await Diamond.aggregate([
    {
      $match: {
        shape: shape,
        weight: {'$gte': similarWeight(weight).from, '$lte': similarWeight(weight).to},
        color: {'$in': similarCharacteristic(color, weight, COLOR_GROUPS)},
        clarity: {'$in': similarCharacteristic(clarity, weight, CLARITY_GROUPS)}
      }
    }, {
      $addFields: {
        rate: {$divide: [`$${fieldName}`, "$weight"]}
      }
    }, {
      $group: {
        _id: null,
        avgRate: {$avg: '$rate'}
      }
    }
  ])

  return result ? round(result[0].avgRate * weight, 2) : null
}

const similarWeight = (weight: number): { from: number, to: number } => {
  const basicGroup = WEIGHT_GROUPS.find((x) => {
    return x[0] <= weight && weight <= x[1]
  })
  if (!basicGroup) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Weight range not found')
  }
  return {from: basicGroup[0], to: basicGroup[1]}
}

const similarCharacteristic = (color: string, weight: number, groups: string[][]): string[] => {
  let group: string[] = []
  if (weight < 0.3) {
    const result = groups.find((x) => x.includes(color))
    group = result ? result : group
  } else {
    group.push(color)
  }

  return group
}


export {priceByRapSheet, averagePriceBy}
