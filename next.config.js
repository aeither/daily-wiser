/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  images: {
    domains: ["res.cloudinary.com", "fal.ai", "fal.media"],
  },
  experimental: {
    esmExternals: 'loose',
  },
  transpilePackages: ["debug", "supports-color"],
};

module.exports = nextConfig;
