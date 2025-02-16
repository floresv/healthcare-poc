require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        pathname: '/**',
      },
    ],
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
}

module.exports = nextConfig 