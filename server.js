const express = require("express");
const axios = require("axios");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customSiteTitle: 'Profile API with Cat Facts',
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    docExpansion: 'none',
    filter: true,
    showRequestDuration: true
  }
}));

// Serve swagger.json
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Root - Welcome message
 *     description: Returns a welcome message for the API
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to Profile API with Cat Facts
 *                 documentation:
 *                   type: string
 *                   example: /api-docs
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Profile API with Cat Facts',
    documentation: '/api-docs',
    endpoints: [
      {
        path: '/me',
        method: 'GET',
        description: 'Get user profile with cat fact'
      },
      {
        path: '/api-docs',
        method: 'GET',
        description: 'Interactive API documentation'
      }
    ]
  });
});

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get user profile information
 *     description: Returns the user's profile information (from environment variables) along with a random cat fact from an external API
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Successful response with user profile and cat fact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *         examples:
 *           success:
 *             summary: Example successful response
 *             value:
 *               status: "success"
 *               user:
 *                 email: "john.doe@example.com"
 *                 name: "John Doe"
 *                 stack: "Full Stack Development"
 *               timestamp: "2024-01-01T12:00:00.000Z"
 *               fact: "Cats sleep for 70% of their lives."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *         examples:
 *           error:
 *             summary: Example error response
 *             value:
 *               status: "error"
 *               message: "Something went wrong"
 */
app.get('/me', async (req, res) => {
  try {
    const timestamp = new Date().toISOString();

    let catFact;
    try {
      const response = await axios.get('https://catfact.ninja/fact', {
        timeout: 5000
      });
      catFact = response.data.fact;
    } catch (error) {
      catFact = "Cats sleep for 70% of their lives. (Fallback fact)";
    }

    const responseData = {
      status: "success",
      user: {
        email: process.env.USER_EMAIL,
        name: process.env.USER_NAME,
        stack: process.env.USER_STACK
      },
      timestamp: timestamp,
      fact: catFact,
      note: process.env.USER_EMAIL ? "User data loaded from environment variables" : "Using default environment variables"
    };
    
    res.json(responseData);
  } catch (error) {
    console.error('Error in /me endpoint:', error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check if the API is running properly
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "healthy"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   example: 123.45
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`API Documentation available at http://0.0.0.0:${PORT}/api-docs`);
  console.log(`Health check: http://0.0.0.0:${PORT}/health`);
});