/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3002/api/:path*', // Proxy to Backend
        },
      ];
    },
  };
  
  export default nextConfig;
  