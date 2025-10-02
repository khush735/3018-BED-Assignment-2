import express from "express";
import morgan from "morgan";
import apiV1Router from "./api/v1/routes";

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).send("Server is healthy");
});

app.use("/api/v1", apiV1Router);

export default app;
