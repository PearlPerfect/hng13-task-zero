// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Profile API with Cat Facts',
      version: '1.0.0',
      description: 'A simple API that returns user profile information along with a random cat fact',
      contact: {
        name: process.env.USER_NAME || 'Developer',
        email: process.env.USER_EMAIL || 'developer@example.com'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? `https://${process.env.FLY_APP_NAME}.fly.dev` 
          : `http://localhost:${process.env.PORT || 3000}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ],
    tags: [
      {
        name: 'Profile',
        description: 'User profile operations'
      }
    ],
    components: {
      schemas: {
        UserProfile: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'success',
              description: 'Response status'
            },
            user: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  example: 'user@example.com',
                  description: 'User email address'
                },
                name: {
                  type: 'string',
                  example: 'John Doe',
                  description: 'User full name'
                },
                stack: {
                  type: 'string',
                  example: 'Backend Development',
                  description: 'User technical stack/specialization'
                }
              }
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T12:00:00.000Z',
              description: 'ISO timestamp of the request'
            },
            fact: {
              type: 'string',
              example: 'Cats can jump up to six times their length.',
              description: 'Random cat fact from external API or fallback fact'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error',
              description: 'Error status'
            },
            message: {
              type: 'string',
              example: 'Something went wrong',
              description: 'Error message'
            }
          }
        }
      }
    }
  },
  apis: ['./server.js'] // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;