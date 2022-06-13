import express from 'express';
const router = express.Router();
import { StatusCodes } from 'http-status-codes';

router.get('/', function (req, res, next) {
  res.status(StatusCodes.OK).json({ status: 'ok' });
});

export default router;
