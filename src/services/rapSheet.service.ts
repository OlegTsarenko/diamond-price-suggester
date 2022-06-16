import RapSheet from '../models/rapSheet.model';
import IDiamondCharacteristic from '../interfaces/IDiamondCharacteristic';

const findByDiamondCharacteristic = async (characteristic: IDiamondCharacteristic) => {
  const rapSheet = await RapSheet.findOne({
    shape: characteristic.shape,
    weightFrom: { $lte: characteristic.weight },
    weightTo: { $gte: characteristic.weight },
  }).sort({
    createdAt: -1,
  });

  return rapSheet;
};

export default { findByDiamondCharacteristic };
