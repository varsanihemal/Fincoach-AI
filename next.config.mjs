/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Suppress known browser extension hydration warnings
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

   logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;