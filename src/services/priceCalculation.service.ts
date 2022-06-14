import RapSheet from '../models/rapSheet.model.js';
import * as Diamond from '../models/diamond.model.js';
import ApiError from '../utils/ApiError';
import { round } from 'lodash';

/**
 * TODO
 *  Need to handle cases with weight bigger than 11 carats
 *  Diamonds large 3-10ct+ sizes may trade at significant different price!
 */
const suggestPrices = async (...arg: [string, number, string, string]) => {
  const priceByRapSheets = await priceByRapSheet(...arg);
  const priceByDeals = await averagePriceBy('soldPrice', ...arg);
  const priceByEstimations = await averagePriceBy('estimatePrice', ...arg);

  return {
    basicPrice: priceByRapSheets,
    averagePriceByDeals: priceByDeals,
    averagePriceByEstimations: priceByEstimations,
  };
};

const priceByRapSheet = async (shape: string, weight: number, color: string, clarity: string) => {
  const rapSheet = await RapSheet.findOne({ shape: shape, weightFrom: { $lte: weight }, weightTo: { $gte: weight } }).sort({
    createdAt: -1,
  });

  if (rapSheet === null) {
    throw new ApiError(404, `Appropriate RapSheet not found. (shape: ${shape}, weight: ${weight})`);
  }

  const rate = findRate(rapSheet, color, clarity);

  // To get price in USD from RapSheet need to multiplication rate to 100
  return rate * 100 * weight;
};

const findRate = (rapSheet: any, color: string, clarity: string): number => {
  const normalizedRapSheet = rapSheet.normalizedPriceMatrix();
  const colorPosition: number = Diamond.COLORS[color];
  const clarityPosition: number = Diamond.CLARITY_GRADES[clarity];
  const rate = normalizedRapSheet[colorPosition][clarityPosition];

  return rate;
};

const averagePriceBy = async (fieldName: string, shape: string, weight: number, color: string, clarity: string) => {
  const result = await Diamond.DiamondModel.aggregate()
    .match({
      shape: shape,
      weight: { $gte: Diamond.similarWeight(weight).from, $lte: Diamond.similarWeight(weight).to },
      color: { $in: Diamond.similarCharacteristic(color, weight, Diamond.COLOR_GROUPS) },
      clarity: { $in: Diamond.similarCharacteristic(clarity, weight, Diamond.CLARITY_GROUPS) },
    })
    .addFields({
      rate: { $divide: [`$${fieldName}`, '$weight'] },
    })
    .group({
      _id: null,
      avgRate: { $avg: '$rate' },
    });

  return result.length ? round(result[0].avgRate * weight, 2) : null;
};

export { suggestPrices, priceByRapSheet };
