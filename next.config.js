/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "fal.ai", "fal.media"],
  },
  experimental: {
    esmExternals: true,
  },
  transpilePackages: ["debug", "supports-color"],
};

module.exports = nextConfig;
