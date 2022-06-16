import { priceByRapSheet, suggestPrices } from '../../src/services/priceSuggester.service';
import rapSheetService from '../../src/services/rapSheet.service';
import IDiamondCharacteristic from '../../src/interfaces/IDiamondCharacteristic';
import { smallRapSheet } from '../fixtures/rapSheet.fixture';
import ApiError from '../../src/utils/ApiError';

jest.mock('../../src/services/rapSheet.service');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Price suggester service', () => {
  it('success suggestPrices', async () => {
    const mockDbRequest = jest.fn().mockReturnValue(smallRapSheet());
    rapSheetService.findByDiamondCharacteristic = mockDbRequest;

    const params: IDiamondCharacteristic = { shape: 'round', weight: 1.0, color: 'D', clarity: 'IF' };
    const price = await priceByRapSheet(params);

    expect(mockDbRequest).toBeCalledTimes(1);
    expect(price).toBe(800.0);
  });

  it('should throw ApiError with message "Appropriate RapSheet not found. (shape: round, weight: 1)" when no found RapSheet', async () => {
    const mockDbRequest = jest.fn().mockReturnValue(null);
    rapSheetService.findByDiamondCharacteristic = mockDbRequest;

    const params: IDiamondCharacteristic = { shape: 'round', weight: 1.0, color: 'D', clarity: 'IF' };

    try {
      await priceByRapSheet(params);
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.message).toBe('Appropriate RapSheet not found. (shape: round, weight: 1)');
      expect(error).toBeInstanceOf(ApiError);
      expect(error).toHaveProperty('statusCode', 500);
    }
  });

  // it('mockss', async () => {
  //   const modulePath = '../../src/services/priceSuggester.service';
  //   const expectedResult = {
  //     basicPrice: 1.11,
  //     averagePriceByDeals: 1.22,
  //     averagePriceByEstimations: 1.22,
  //   };
  //
  //   jest.doMock(modulePath, () => {
  //     const originalModule = jest.requireActual(modulePath);
  //     return {
  //       ...originalModule,
  //       ...{
  //         suggestPrices: jest.fn().mockImplementation((...arg) => Promise.resolve(expectedResult)),
  //         // not working for invoke inside module
  //         priceByRapSheet: jest.fn().mockImplementation((...arg) => Promise.resolve(1.11)),
  //         averagePriceBy: jest.fn().mockImplementation((...arg) => Promise.resolve(1.11)),
  //       },
  //     };
  //   });
  //
  //   const module = await import(modulePath);
  //   const { suggestPrices } = module;
  //
  //   await expect(suggestPrices('test', 1.4, 'test', 'test')).resolves.toEqual(expectedResult);
  // });
});
