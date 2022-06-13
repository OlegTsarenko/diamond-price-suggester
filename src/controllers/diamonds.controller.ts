import {Request, Response, NextFunction} from "express";
import { StatusCodes } from 'http-status-codes'
import pick from "../utils/pick.js";
import { CHARACTERISTIC_LIST } from '../models/diamond.model'
import { suggestDiamonds } from '../services/diamondSuggestor.service'

const suggest = async (req: Request, res: Response) => {
  const params = pick(req.query, CHARACTERISTIC_LIST);
  const arg:[string,number,string,string] = [params['shape'], params['weight'], params['color'], params['clarity']]

  const diamonds = await suggestDiamonds(...arg)

  res.status(StatusCodes.OK).json(diamonds)
}

export  { suggest }
