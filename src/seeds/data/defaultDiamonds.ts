import { SHAPES, COLORS, CLARITY_GRADES } from '../../models/diamond.model';
import { priceByRapSheet } from '../../services/priceSuggester.service';
import DiamondCharacteristic from '../../interfaces/DiamondCharacteristic';
import _ from 'lodash';

const maxValueFor = (source: Record<string, number>): number => {
  return _.keys(source).length - 1;
};

const randomKeyFor = (source: Record<string, number>): string => {
  const randomIndex = _.random(0, maxValueFor(source));
  return _.keys(source)[randomIndex];
};

const generateDiamonds = async (count: number) => {
  const diamonds = [];

  for (let i = 0; i < count; i++) {
    const characteristic: DiamondCharacteristic = {
      shape: randomKeyFor(SHAPES),
      weight: _.round(_.random(0.01, 10.99, true), 2),
      color: randomKeyFor(COLORS),
      clarity: randomKeyFor(CLARITY_GRADES),
    };
    const basicPrice = await priceByRapSheet(characteristic);
    const estimatePrice = basicPrice + basicPrice * _.random(-0.3, 0.3, true);

    const diamond = {
      ...characteristic,
      basicPrice: _.round(basicPrice, 2),
      estimatePrice: _.round(estimatePrice, 2),
      soldPrice: _.round(estimatePrice + estimatePrice * _.random(-0.3, 0.3, true), 2),
    };
    diamonds.push(diamond);
  }

  return diamonds;
};

export default generateDiamonds;
