import express from "express";
import morgan from "morgan";
import apiV1Router from "./api/v1/routes";
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Logging middleware
app.use(morgan("combined"));

// Parse incoming JSON
app.use(express.json());

// Health check route
app.get("/health", (_req, res) => {
  res.status(200).send("Server is healthy");
});

// API v1 routes
app.use("/api/v1", apiV1Router);

// Middleware (after routes)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
