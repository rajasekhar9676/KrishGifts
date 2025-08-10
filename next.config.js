/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
   
  },
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
  // Ensure proper output for Vercel
  output: 'standalone',
  // Disable telemetry
  telemetry: false,
}

module.exports = nextConfig 