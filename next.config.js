/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Ensure there's proper static export if you're not using server-side features
  // output: 'export',
}

module.exports = nextConfig
