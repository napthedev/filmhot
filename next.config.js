/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: ["img.netpop.app"],
    minimumCacheTTL: 99999,
  },
};

module.exports = nextConfig;
