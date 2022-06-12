import { StatusCodes } from 'http-status-codes'
import { ErrorRequestHandler } from 'express';

const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  const defaultError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || 'Something went wrong, try again later',
  }

  if (error.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    // defaultError.msg = err.message
    defaultError.message = Object.values(error.errors)
      .map((item: any) => item.message)
      .join(',')
  }
  // if (err.code && err.code === 11000) {
  //   defaultError.statusCode = StatusCodes.BAD_REQUEST
  //   defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
  // }

  res.status(defaultError.statusCode).json({ message: defaultError.message })
}

export default errorHandlerMiddleware
