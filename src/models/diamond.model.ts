import mongoose from "mongoose"
import ApiError from "../utils/ApiError";
import {StatusCodes} from "http-status-codes";

// Name, Position in RapSheet Matrix
const SHAPES:Record<string, number> = {
    round: 0,
    princess : 1,
    cushion: 2,
    marquise: 3,
    emerald: 4,
    other: 5
}
const COLORS:Record<string, number> = {
    D: 0, E: 1, F: 2, G: 3, H: 4, I: 5, J: 6, K: 7, L: 8, 'M-Z': 9
}
const CLARITY_GRADES:Record<string, number> = {
  IF: 0, VVS1: 1, VVS2: 2, VS1: 3, VS2: 4, SI1: 5, SI2: 6, SI3: 7, I1: 8, I2: 9, I3: 10
}

const WEIGHT_GROUPS = [
  [0.01, 0.03], [0.04, 0.07], [0.08, 0.14], [0.15, 0.17], [0.18, 0.22], [0.23, 0.29],
  [0.30, 0.39], [0.40, 0.49], [0.50, 0.69], [0.70, 0.89], [0.90, 0.99], [1.00, 1.49],
  [1.50, 1.99], [2.00, 2.99], [3.00, 3.99], [4.00, 4.99], [5.00, 6.99], [7.00, 7.99],
  [8.00, 8.99], [9.00, 9.99], [10.00, 10.99]
]
const COLOR_GROUPS = [['D', 'E', 'F'], ['G', 'H'], ['I', 'J'], ['K', 'L'], ['M', 'N']]
const CLARITY_GROUPS = [['IF', 'VVS1', 'VVS2'], ['VS1', 'VS2'], ['SI1', 'SI2', 'SI3'], ['I1', 'I2', 'I3']]

const CHARACTERISTIC_LIST:string[] = ['shape', 'weight', 'color', 'clarity']

const diamondSchema = new mongoose.Schema({
    shape: {
      type: mongoose.Schema.Types.String,
      enum: Object.keys(SHAPES),
      required: true,
      index: true
    },
    weight: {
      type: mongoose.Schema.Types.Number,
      min: [0.01, 'Too small'],
      max: [10.99, 'Too big' ],
      required: true,
      index: true
    },
    color: {
      type: mongoose.Schema.Types.String,
      enum: Object.keys(COLORS),
      required: true,
      index: true
    },
    clarity: {
      type: mongoose.Schema.Types.String,
      enum: Object.keys(CLARITY_GRADES),
      required: true,
      index: true
    },
    basicPrice: {
      type: mongoose.Schema.Types.Number,
      min: [0.01, 'Too small'],
      max: [999_999_999, 'Too big' ],
    },
    estimatePrice: {
      type: mongoose.Schema.Types.Number,
      min: [0.01, 'Too small'],
      max: [999_999_999, 'Too big' ],
    },
    soldPrice: {
      type: mongoose.Schema.Types.Number,
      min: [0.01, 'Too small'],
      max: [999_999_999, 'Too big' ],
    },

  // Other fields which need to business goals ....
  },
  {
    timestamps: true,
  })

const DiamondModel = mongoose.model('Diamond', diamondSchema)

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

export {
  DiamondModel,
  SHAPES,
  COLORS,
  CLARITY_GRADES,
  CHARACTERISTIC_LIST,
  COLOR_GROUPS,
  CLARITY_GROUPS,
  WEIGHT_GROUPS,
  similarWeight,
  similarCharacteristic
}


