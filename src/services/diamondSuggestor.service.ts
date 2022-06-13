import * as Diamond from "../models/diamond.model.js"

const LIMIT = 25

const suggestDiamonds = async (shape: string, weight: number, color: string, clarity: string) => {
  const diamonds = await Diamond.DiamondModel
    .aggregate()
    .match({
      shape: shape,
      weight: {'$gte': Diamond.similarWeight(weight).from, '$lte': Diamond.similarWeight(weight).to},
      color: {'$in': Diamond.similarCharacteristic(color, weight, Diamond.COLOR_GROUPS)},
      clarity: {'$in': Diamond.similarCharacteristic(clarity, weight, Diamond.CLARITY_GROUPS)}})
    .addFields({ order: { $abs: { $subtract: [ "$weight", weight ] } }})
    .project({ __v: 0, updatedAt: 0 })
    .sort({order: 1})
    .limit(LIMIT)

  return diamonds
}

export { suggestDiamonds }
