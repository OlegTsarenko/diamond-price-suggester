import RapSheet from '../models/rapSheet.model.js';
import * as Diamond from '../models/diamond.model.js';
import ApiError from '../utils/ApiError';
import round from 'lodash/round';
import DiamondCharacteristic from '../interfaces/DiamondCharacteristic';

/*
 * TODO
 *  Need to handle cases with weight bigger than 11 carats
 *  Diamonds large 3-10ct+ sizes may trade at significant different price!
 */
const suggestPrices = async (characteristic: DiamondCharacteristic) => {
  const results = await Promise.all([
    priceByRapSheet(characteristic),
    averagePriceBy('soldPrice', characteristic),
    averagePriceBy('estimatePrice', characteristic),
  ]);

  return {
    basicPrice: results[0],
    averagePriceByDeals: results[1],
    averagePriceByEstimations: results[2],
  };
};

const priceByRapSheet = async (characteristic: DiamondCharacteristic) => {
  const rapSheet = await RapSheet.findOne({
    shape: characteristic.shape,
    weightFrom: { $lte: characteristic.weight },
    weightTo: { $gte: characteristic.weight },
  }).sort({
    createdAt: -1,
  });

  if (rapSheet === null) {
    throw new ApiError(
      404,
      `Appropriate RapSheet not found. (shape: ${characteristic.shape}, weight: ${characteristic.weight})`
    );
  }

  const rate = findRate(rapSheet, characteristic);

  // To get price in USD from RapSheet need to multiplication rate to 100
  return rate * 100 * characteristic.weight;
};

const findRate = (rapSheet: any, characteristic: DiamondCharacteristic): number => {
  const normalizedRapSheet = rapSheet.normalizedPriceMatrix();
  const colorPosition: number = Diamond.COLORS[characteristic.color];
  const clarityPosition: number = Diamond.CLARITY_GRADES[characteristic.clarity];
  const rate = normalizedRapSheet[colorPosition][clarityPosition];

  return rate;
};

const averagePriceBy = async (fieldName: string, characteristic: DiamondCharacteristic) => {
  const result = await Diamond.DiamondModel.aggregate()
    .match({
      shape: characteristic.shape,
      weight: {
        $gte: Diamond.similarWeight(characteristic.weight).from,
        $lte: Diamond.similarWeight(characteristic.weight).to,
      },
      color: { $in: Diamond.similarCharacteristic(characteristic.color, characteristic.weight, Diamond.COLOR_GROUPS) },
      clarity: { $in: Diamond.similarCharacteristic(characteristic.clarity, characteristic.weight, Diamond.CLARITY_GROUPS) },
    })
    .addFields({
      rate: { $divide: [`$${fieldName}`, '$weight'] },
    })
    .group({
      _id: null,
      avgRate: { $avg: '$rate' },
    });

  return result.length ? round(result[0].avgRate * characteristic.weight, 2) : null;
};

export { suggestPrices, priceByRapSheet };
