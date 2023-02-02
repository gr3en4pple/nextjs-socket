/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['xsgames.co'],
  },
  env: {
    API_URL: 'http://localhost:3001/api',
    SOCKET_URL: 'http://localhost:3001',
  },
};

module.exports = nextConfig;
