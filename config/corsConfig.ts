import cors from "cors";

export const getCorsConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const baseConfig = {
    origin: isDevelopment
      ? ["http://localhost:3000", "http://localhost:3001"] // Allow local development origins
      : process.env.CORS_ORIGIN?.split(",") || false, // In production, use env var or disable
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers)
    maxAge: 86400, // Cache preflight response for 24 hours
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  };

  return cors(baseConfig);
};
