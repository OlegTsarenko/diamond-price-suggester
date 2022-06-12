import {Request, Response, NextFunction} from "express";
import { StatusCodes } from 'http-status-codes'
import pick from "../utils/pick.js";
import { calculateByCharacteristics } from '../services/priceCalculation.service'
import { CHARACTERISTIC_LIST } from '../models/diamond.model'
import ApiError from "../utils/ApiError";

const calculate = async (req: Request, res: Response, next: NextFunction) => {
  const params = pick(req.query, CHARACTERISTIC_LIST);
  let price = 0

  try {
    price = await calculateByCharacteristics(params['shape'], params['weight'], params['color'], params['clarity'])
  } catch (e) {
    if (e instanceof ApiError) {
      return next(e);
    } else {
      res.status(500).send('Something went wrong')
    }
  }

  res.status(StatusCodes.OK).json({
    basicPrice: price,
    averagePriceByDeals: 0,
    averagePriceByEstimation: 0,
  })
}

export  { calculate }
