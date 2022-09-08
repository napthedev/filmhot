const withAnalyzer = require("@next/bundle-analyzer")({
  enabled:
    process.env.ANALYZE === "true" && process.env.NODE_ENV !== "development",
});
const { withSuperjson } = require("next-superjson");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: [
      "img.netpop.app",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
    ],
    minimumCacheTTL: 3600,
  },
};

module.exports = withSuperjson()(withAnalyzer(nextConfig));
