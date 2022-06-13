import { StatusCodes } from 'http-status-codes'
import { ErrorRequestHandler } from 'express';

const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  const defaultError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || 'Something went wrong, try again later',
  }

  if (error.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.message = Object.values(error.errors)
      .map((item: any) => item.message)
      .join(',')
  }

  res.status(defaultError.statusCode).json({ message: defaultError.message })
}

export default errorHandlerMiddleware
