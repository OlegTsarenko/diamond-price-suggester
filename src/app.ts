import express, { Express } from 'express';

import notFoundMiddleware from './middleware/notFound'
import errorHandlerMiddleware from './middleware/errorHandler'

import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'

import homeRouter from './routes/index'
import priceRouter from './routes/v1/prices.route'

// import swaggerUI from "swagger-ui-express";
// import openapiSpec from "./config/swagger.js";

const app: Express = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(helmet())
app.use(mongoSanitize())


// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpec));

app.use('/', homeRouter)
app.use('/api/v1', priceRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export default app
