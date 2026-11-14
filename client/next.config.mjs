
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate static files for GitHub Pages
  output: "export",

  // Disable the Next.js identification header
  poweredByHeader: false,

  // Disable production browser source maps
  productionBrowserSourceMaps: false,

  // GitHub Pages does not support Next.js image optimization
  images: {
    unoptimized: true,
  },

  // Remove unnecessary console output in production
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default nextConfig;
