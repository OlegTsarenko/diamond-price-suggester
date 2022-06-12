import express from "express"
import validate from "../../middleware/validate"
import { diamondParams } from "../../validations/diamond.validation"
import { calculate } from "../../controllers/prices.controller"

const router = express.Router()

router
  .get('/prices/calculate', validate(diamondParams), calculate);

export default router


/**
 * @swagger
 * tags:
 *   name: Prices
 *   description: Price API to get different types of price for diamonds
 */

/**
 * @swagger
 * /prices/calculate:
 *   get:
 *     summary: Returns prices calculation by different methods according to the given parameters
 *     tags: [Prices]
 *     parameters:
 *       - in: path
 *         name: shape
 *         schema:
 *           type: string
 *           enum: [round, princess, cushion, marquise, emerald, other]
 *         required: true
 *         description: Shape of th diamond
 *       - in: path
 *         name: weight
 *         schema:
 *           type: number
 *           minimum: 0.01
 *           maximum: 10.99
 *         required: true
 *         description: Weight of Diamond (0.01-10.99)
 *       - in: path
 *         name: color
 *         schema:
 *           type: string
 *           enum: [D, E, F, G, H, I, J, K, L, M-Z]
 *         required: true
 *         description: Color of the diamond
 *       - in: path
 *         name: clarity
 *         schema:
 *           type: string
 *           enum: [FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3]
 *         required: true
 *         description: Clarity of the diamond
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PriceSuggestion'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 */
