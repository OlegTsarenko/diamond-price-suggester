import * as Diamond from '../models/diamond.model';
import IDiamondCharacteristic from '../interfaces/IDiamondCharacteristic';

const LIMIT = 25;

const suggestDiamonds = async (characteristic: IDiamondCharacteristic) => {
  const diamonds = await Diamond.DiamondModel.aggregate()
    .match({
      shape: characteristic.shape,
      weight: {
        $gte: Diamond.similarWeight(characteristic.weight).from,
        $lte: Diamond.similarWeight(characteristic.weight).to,
      },
      color: { $in: Diamond.similarCharacteristic(characteristic.color, characteristic.weight, Diamond.COLOR_GROUPS) },
      clarity: { $in: Diamond.similarCharacteristic(characteristic.clarity, characteristic.weight, Diamond.CLARITY_GROUPS) },
    })
    .addFields({ order: { $abs: { $subtract: ['$weight', characteristic.weight] } } })
    .project({ __v: 0, updatedAt: 0 })
    .sort({ order: 1 })
    .limit(LIMIT);

  return diamonds;
};

export { suggestDiamonds };
