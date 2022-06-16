import * as Diamond from '../models/diamond.model.js';
import ApiError from '../utils/ApiError';
import round from 'lodash/round';
import IDiamondCharacteristic from '../interfaces/IDiamondCharacteristic';
import RapSheetService from './rapSheet.service';

/*
 * TODO
 *  Need to handle cases with weight bigger than 11 carats
 *  Diamonds large 3-10ct+ sizes may trade at significant different price!
 */
const suggestPrices = async (characteristic: IDiamondCharacteristic) => {
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

const priceByRapSheet = async (characteristic: IDiamondCharacteristic) => {
  const rapSheet = await RapSheetService.findByDiamondCharacteristic(characteristic);

  if (rapSheet === null) {
    throw new ApiError(
      500,
      `Appropriate RapSheet not found. (shape: ${characteristic.shape}, weight: ${characteristic.weight})`
    );
  }

  const rate = findRate(rapSheet, characteristic);

  // To get price in USD from RapSheet need to multiplication rate to 100
  return rate * 100 * characteristic.weight;
};

const findRate = (rapSheet: any, characteristic: IDiamondCharacteristic): number => {
  const normalizedRapSheet = rapSheet.normalizedPriceMatrix();
  const colorPosition: number = Diamond.COLORS[characteristic.color];
  const clarityPosition: number = Diamond.CLARITY_GRADES[characteristic.clarity];
  const rate = normalizedRapSheet[colorPosition][clarityPosition];

  return rate;
};

const averagePriceBy = async (fieldName: string, characteristic: IDiamondCharacteristic) => {
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
