import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import pick from '../utils/pick.js';
import { CHARACTERISTIC_LIST } from '../models/diamond.model';
import { suggestDiamonds } from '../services/diamondSuggester.service';

const suggest = async (req: Request, res: Response) => {
  const params = pick(req.query, CHARACTERISTIC_LIST);
  const diamonds = await suggestDiamonds(params);

  res.status(StatusCodes.OK).json(diamonds);
};

export { suggest };
