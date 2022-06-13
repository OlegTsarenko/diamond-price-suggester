import RapSheet from '../../src/models/rapSheet.model';
import parse from '../../src/utils/parseTestMatrix';

describe('RapSheet normalizedPriceMatrix', () => {
  it('should add rows and cols to fill matrix', () => {
    const model = new RapSheet({
      reportIdentifier: 'default',
      weightFrom: 0.01,
      weightTo: 0.03,
      priceMatrix: parse(
        `8.0 7.2 6.3 5.6 4.7 4.1 3.5 2.8
7.2 6.4 5.7 5.0 4.3 3.7 3.1 2.6
6.6 5.9 5.2 4.6 3.9 3.3 2.8 2.4
4.6 4.1 3.6 3.2 2.8 2.5 2.0 1.6
3.1 2.7 2.4 2.0 1.8 1.6 1.4 1.2`
      ),
    });

    expect(model.normalizedPriceMatrix().length).toBe(10);
  });

  xit('should duplicate correct rows', () => {});

  xit('should duplicate correct cols', () => {});
});
