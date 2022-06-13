import swaggerJsDoc from 'swagger-jsdoc';
import config from './config';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Diamonds price API',
      version: '1.0.0',
      description: 'API to calculate diamonds price and prise suggestion',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
      },
    ],
  },
  apis: ['docs/*.yml', 'src/routes/v1/*.ts'],
};

const openapiSpec = swaggerJsDoc(options);

export default openapiSpec;
