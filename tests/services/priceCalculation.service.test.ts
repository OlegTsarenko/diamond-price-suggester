import { priceByRapSheet, suggestPrices } from '../../src/services/priceSuggester.service';

describe('Sample Test', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('mockss', async () => {
    const modulePath = '../../src/services/priceSuggester.service';
    const expectedResult = {
      basicPrice: 1.11,
      averagePriceByDeals: 1.22,
      averagePriceByEstimations: 1.22,
    };

    jest.doMock(modulePath, () => {
      const originalModule = jest.requireActual(modulePath);
      return {
        ...originalModule,
        ...{
          suggestPrices: jest.fn().mockImplementation((...arg) => Promise.resolve(expectedResult)),
          // not working for invoke inside module
          priceByRapSheet: jest.fn().mockImplementation((...arg) => Promise.resolve(1.11)),
          averagePriceBy: jest.fn().mockImplementation((...arg) => Promise.resolve(1.11)),
        },
      };
    });

    const module = await import(modulePath);
    const { suggestPrices } = module;

    await expect(suggestPrices('test', 1.4, 'test', 'test')).resolves.toEqual(expectedResult);
  });
});
