/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://34.134.16.242:3001/api/:path*', // Proxy to Backend
        },
      ];
    },
  };
  
  export default nextConfig;
  