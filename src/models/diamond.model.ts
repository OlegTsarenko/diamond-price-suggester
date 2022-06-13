import mongoose from "mongoose"

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

const Diamond = mongoose.model('Diamond', diamondSchema)

export { Diamond, SHAPES, COLORS, CLARITY_GRADES, CHARACTERISTIC_LIST }


