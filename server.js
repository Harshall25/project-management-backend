const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const {authRouter} = require('./routes/auth');
const {projectRouter} = require('./routes/project');
const {taskRouter} = require('./routes/task');
const {connectDB} = require('./config/db');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Connect to Database
connectDB();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Management API',
      version: '1.0.0',
      description: 'REST API for managing users, projects, and tasks with JWT authentication',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js', './schema.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use('/api/v1',authRouter);
app.use('/api/v1',projectRouter);
app.use('/api/v1',taskRouter);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown: stop accepting new connections, drain in-flight
// requests, then close the DB connection before exiting.
const shutdown = (signal) => {
    console.log(`${signal} received, shutting down gracefully`);
    server.close(async () => {
        try {
            await mongoose.connection.close();
        } catch (err) {
            console.error('Error closing MongoDB connection:', err.message);
        }
        process.exit(0);
    });

    // Force-exit if connections don't drain in time.
    setTimeout(() => {
        console.error('Forced shutdown: connections did not drain in time');
        process.exit(1);
    }, 10000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
