import mongoose from "mongoose"
import app from "./app"
import logger from "./config/logger"
import config from "./config/config"

try {
  mongoose.connect(config.mongoose.url).then(() => {
    logger.info('Connected to MongoDB');
    app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  });
} catch (error) {
  logger.info(error)
}



// import express, { Express, Request, Response } from 'express';
//
// const app: Express = express();
// const port = 3000;
//
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });
//
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
