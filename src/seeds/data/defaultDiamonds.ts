import { SHAPES, COLORS, CLARITY_GRADES } from '../../models/diamond.model';
import { priceByRapSheet } from '../../services/priceSuggester.service';
import { round, random } from 'lodash';

const maxValueFor = (source: Record<string, number>): number => {
  return Object.keys(source).length - 1;
};

const randomKeyFor = (source: Record<string, number>): string => {
  const random_index = random(0, maxValueFor(source));
  return Object.keys(source)[random_index];
};

const generateDiamonds = async (count: number) => {
  const diamonds = [];

  for (let i = 0; i < count; i++) {
    const shape = randomKeyFor(SHAPES);
    const weight = round(random(0.01, 10.99, true), 2);
    const color = randomKeyFor(COLORS);
    const clarity = randomKeyFor(CLARITY_GRADES);
    const basicPrice = await priceByRapSheet(shape, weight, color, clarity);
    const estimatePrice = basicPrice + basicPrice * random(-0.3, 0.3, true);

    const diamond = {
      shape,
      weight,
      color,
      clarity,
      basicPrice: round(basicPrice, 2),
      estimatePrice: round(estimatePrice, 2),
      soldPrice: round(estimatePrice + estimatePrice * random(-0.3, 0.3, true), 2),
    };
    diamonds.push(diamond);
  }

  return diamonds;
};

export default generateDiamonds;
