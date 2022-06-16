import { SHAPES, COLORS, CLARITY_GRADES } from '../../src/models/diamond.model';

describe('Diamond characteristic', () => {
  it('Shape should has proper position', () => {
    const result = { round: 0, princess: 1, cushion: 2, marquise: 3, emerald: 4, other: 5 };
    expect(SHAPES).toEqual(result);
  });

  it('Color should has proper position', () => {
    const result = { D: 0, E: 1, F: 2, G: 3, H: 4, I: 5, J: 6, K: 7, L: 8, M: 9 };
    expect(COLORS).toEqual(result);
  });

  it('Clarity should has proper position', () => {
    const result = { IF: 0, VVS1: 1, VVS2: 2, VS1: 3, VS2: 4, SI1: 5, SI2: 6, SI3: 7, I1: 8, I2: 9, I3: 10 };
    expect(CLARITY_GRADES).toEqual(result);
  });
});
