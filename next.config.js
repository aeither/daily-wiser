/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "fal.ai",
      "fal.media",
      "gateway.pinata.cloud",
      "ipfs.io",
      "gateway.irys.xyz",
      "utfs.io",
    ],
  },
  experimental: {
    esmExternals: true,
  },
  transpilePackages: ["debug", "supports-color"],
};

module.exports = nextConfig;
