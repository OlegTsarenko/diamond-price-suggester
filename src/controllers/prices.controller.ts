import {Request, Response, NextFunction} from "express";
import { StatusCodes } from 'http-status-codes'
import pick from "../utils/pick.js";
import { priceByRapSheet, averagePriceBy } from '../services/priceCalculation.service'
import { CHARACTERISTIC_LIST } from '../models/diamond.model'
import ApiError from "../utils/ApiError";

const calculate = async (req: Request, res: Response, next: NextFunction) => {
  let price = null
  let priceByDeals = null
  let priceByEstimations = null

  const params = pick(req.query, CHARACTERISTIC_LIST);
  const arg:[string,number,string,string] = [params['shape'], params['weight'], params['color'], params['clarity']]

  try {
    price = await priceByRapSheet(...arg)
    priceByDeals = await averagePriceBy('soldPrice', ...arg)
    priceByEstimations = await averagePriceBy('estimatePrice', ...arg)
  } catch (e:any) {
    if (e instanceof ApiError) {
      return next(e);
    } else {
      res.status(500).send(e.message)
    }
  }

  res.status(StatusCodes.OK).json({
    basicPrice: price,
    averagePriceByDeals: priceByDeals,
    averagePriceByEstimations: priceByEstimations,
  })
}

export  { calculate }
