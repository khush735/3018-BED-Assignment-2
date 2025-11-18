import helmet from "helmet";

export const getHelmetConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  // Base configuration optimized for APIs
  const baseConfig = {
    contentSecurityPolicy: false, // Disabled for JSON APIs
    crossOriginEmbedderPolicy: false,
    hidePoweredBy: true, // Remove X-Powered-By header
    noSniff: true, // Prevent MIME type sniffing
    frameguard: { action: "deny" as const }, // Prevent clickjacking
  };

  if (isDevelopment) {
    return helmet({
      ...baseConfig,
      hsts: false, // No HTTPS enforcement in development
    });
  }

  // Production configuration
  return helmet({
    ...baseConfig,
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  });
};