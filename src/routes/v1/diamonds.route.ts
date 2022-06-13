import express from "express"
import validate from "../../middleware/validate"
import { diamondParams } from "../../validations/diamond.validation"
import { suggest } from "../../controllers/diamonds.controller"

const router = express.Router()

router
  .get('/diamonds/suggestion', validate(diamondParams), suggest);

export default router

/**
 * @swagger
 * tags:
 *   name: Diamonds
 *   description: Diamonds API
 */

/**
 * @swagger
 * /diamonds/suggestion
 *   get:
 *     summary: Returns list of 25 similar diamonds
 *     tags: [Diamonds]
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
 *           enum: [IF, VVS1, VVS2, VS1, VS2, SI1, SI2, SI3, I1, I2, I3]
 *         required: true
 *         description: Clarity of the diamond
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiamondSuggestion'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 */
