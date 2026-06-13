/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    return [
      {
        source: '/proyecto/login',
        destination: '/proyecto',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
