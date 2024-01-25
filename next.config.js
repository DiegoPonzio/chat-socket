/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias['components'] = path.resolve(__dirname, 'components');
    return config;
  },
}

module.exports = nextConfig
