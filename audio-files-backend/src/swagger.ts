import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Audio Files Dashboard API",
      version: "1.0.0",
      description: "API documentation for the Audio Files Dashboard",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Authentication and authorization operations",
      },
      {
        name: "Users",
        description: "Operations related to users",
      },
      {
        name: "Audio",
        description: "Operations related to audio files",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
