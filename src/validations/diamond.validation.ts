import Joi from 'joi'
import { Shape, Color, ClarityGrades } from "../models/diamond.model"

const diamondParams = {
  query: Joi.object().keys({
    shape: Joi.string().valid(...Object.values(Shape)).required(),
    weight: Joi.number().precision(2).greater(0.01).less(10.99).required(),
    color: Joi.string().valid(...Object.values(Color)).required(),
    clarity: Joi.string().valid(...Object.values(ClarityGrades)).required()
  }),
};

export { diamondParams }
