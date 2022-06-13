import Joi from 'joi';
import { SHAPES, COLORS, CLARITY_GRADES } from '../models/diamond.model';

const diamondParams = {
  query: Joi.object().keys({
    shape: Joi.string()
      .valid(...Object.keys(SHAPES))
      .required(),
    weight: Joi.number().precision(2).greater(0.01).less(10.99).required(),
    color: Joi.string()
      .valid(...Object.keys(COLORS))
      .required(),
    clarity: Joi.string()
      .valid(...Object.keys(CLARITY_GRADES))
      .required(),
  }),
};

export { diamondParams };
