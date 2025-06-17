const SwaggerJSDoc = require('swagger-jsdoc');
const SwaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API-prova-node',
      version: '1.0.0',
      description: 'Documentação da API-prova-node'
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3030}` }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const SwaggerSpec = SwaggerJSDoc(options);

module.exports = { SwaggerUi, SwaggerSpec };