import {Request, Response} from "express";
import { StatusCodes } from 'http-status-codes'
import pick from "../utils/pick.js";
import { calculateByCharacteristics } from '../services/priceCalculation.service'
import { DiamondCharacteristic } from '../models/diamond.model'


const characteristicsList = ['shape', 'weight', 'color', 'clarity']

// TODO Add type diamond characteristic with TS
const calculate = async (req: Request, res: Response) => {

  // const params = pick(req.query, characteristicsList);
  // const param_values: any[] = Object.values(params)

  const params = pick(req.query, characteristicsList);

  const price = await calculateByCharacteristics(params['shape'], params['weight'], params['color'], params['clarity'])

  res.status(StatusCodes.OK).json({ price: price })
}

export  { calculate }
