import mongoose from "mongoose"
import {extend} from "joi";

// TODO tests
// Strict sequences, don't change! Using in price calculator
enum Shape { Sound, Princess, Cushion, Marquise, Emerald, Other}
enum Color { D, E, F, G, H, I, J, K, L, 'M-Z'}
enum ClarityGrades{ FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3}

interface DiamondCharacteristic {
    shape: Shape,
    weight: number,
    color: Color,
    clarity: ClarityGrades
}

const diamondSchema = new mongoose.Schema({
    shape: {
      type: mongoose.Schema.Types.String,
      enum: Shape,
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
      enum: Color,
      required: true,
      index: true
    },
    clarity: {
      type: mongoose.Schema.Types.String,
      enum: ClarityGrades,
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

export { Diamond, Shape, Color, ClarityGrades, DiamondCharacteristic }


