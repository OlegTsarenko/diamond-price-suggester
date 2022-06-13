import mongoose from 'mongoose';
import { SHAPES } from './diamond.model';

const rapSheetSchema = new mongoose.Schema(
  {
    reportIdentifier: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
    shape: {
      type: mongoose.Schema.Types.String,
      enum: Object.keys(SHAPES),
      required: true,
      index: true,
    },
    weightFrom: {
      type: mongoose.Schema.Types.Number,
      required: true,
      index: true,
    },
    weightTo: {
      type: mongoose.Schema.Types.Number,
      required: true,
      index: true,
    },
    priceMatrix: {
      type: mongoose.Schema.Types.Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

rapSheetSchema.index({ createdAt: 1, type: -1 });

const SMALL_COLOR_PATTERN = [3, 2, 2, 2, 1];
const SMALL_CLARITY_PATTERN = [3, 2, 1, 1, 1, 1, 1, 1];

rapSheetSchema.methods.normalizedPriceMatrix = function () {
  if (this.priceMatrix.length > 5) {
    return this.priceMatrix;
  }

  const normalizedMatrix = this.priceMatrix.reduce((acc: Array<Array<number>>, value: Array<number>, index: number) => {
    const fullRow: Array<number> = value.reduce((rAcc: Array<number>, rValue: number, rIndex: number) => {
      for (let j = 0; j < SMALL_CLARITY_PATTERN[rIndex]; j++) {
        rAcc.push(rValue);
      }
      return rAcc;
    }, []);

    for (let i = 0; i < SMALL_COLOR_PATTERN[index]; i++) {
      acc.push(fullRow);
    }
    return acc;
  }, []);

  return normalizedMatrix;
};

export default mongoose.model('RapSheet', rapSheetSchema);
