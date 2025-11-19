import helmet from "helmet";

export const getHelmetConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  // Base configuration optimized for APIs with enhanced security
  const baseConfig = {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for Swagger UI
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    hidePoweredBy: true, // Remove X-Powered-By header
    noSniff: true, // Prevent MIME type sniffing
    frameguard: { action: "deny" as const }, // Prevent clickjacking
    dnsPrefetchControl: { allow: false }, // Disable DNS prefetching for privacy
    ieNoOpen: true, // Prevent IE from executing downloads in the context of the site
    permittedCrossDomainPolicies: { permittedPolicies: "none" as const }, // Prevent Adobe Flash/Acrobat from loading content
  };

  if (isDevelopment) {
    return helmet({
      ...baseConfig,
      hsts: false, // No HTTPS enforcement in development
      referrerPolicy: { policy: "no-referrer-when-downgrade" }, // Relaxed for development
    });
  }

  // Production configuration with strict security
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
