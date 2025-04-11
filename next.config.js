/** @type {import('next').NextConfig} */
const nextConfig = {
    // Remove all experimental flags unless absolutely necessary
    output: process.env.NEXT_OUTPUT_MODE === 'export' ? 'export' : undefined,
    images: {
      domains: ['cdn-images-1.medium.com', 'i.cbc.ca'],
    },
    // Add this new configuration
    modularizeImports: {
      'next/dist/server/future/route-modules/pages/module': {
        transform: 'next/dist/server/future/route-modules/pages/module',
      },
    },
  }
  
  module.exports = nextConfig