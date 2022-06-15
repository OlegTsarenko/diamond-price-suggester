import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import pick from '../utils/pick.js';
import { suggestPrices } from '../services/priceSuggester.service';
import { CHARACTERISTIC_LIST } from '../models/diamond.model';
import ApiError from '../utils/ApiError';

/**
 * TODO
 * Add new type with diamond characteristics
 */

const suggest = async (req: Request, res: Response, next: NextFunction) => {
  const params = pick(req.query, CHARACTERISTIC_LIST);
  const arg: [string, number, string, string] = [params['shape'], params['weight'], params['color'], params['clarity']];
  const prices = await suggestPrices(...arg);

  res.status(StatusCodes.OK).json(prices);
};

export { suggest };
