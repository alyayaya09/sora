/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Mencegah error rename pack cache karena sinkronisasi OneDrive / Windows Defender
      config.cache = {
        type: "memory",
      };
    }
    return config;
  },
};

module.exports = nextConfig;
