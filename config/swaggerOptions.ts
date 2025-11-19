import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API Documentation",
      version: "1.0.0",
      description: "This is the API documentation for the Task Management application.",
      contact: {
        name: "API Support",
        email: "support@example.com"
      }
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1",
        description: process.env.NODE_ENV === "production" ? "Production server" : "Development server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error type"
            },
            message: {
              type: "string",
              description: "Error description"
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validations/*.ts"]
};

export const generateSwaggerSpec = (): object => {
  return swaggerJsdoc(swaggerOptions);
};