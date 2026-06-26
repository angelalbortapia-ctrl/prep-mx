/** @type {import('next').NextConfig} */
import os from 'os';
import path from 'path';

// Fuera de ~/Documents para evitar que iCloud borre chunks/CSS en pleno dev.
const devDistDir = path.join(os.homedir(), '.cache', 'prep-mx-next-dev');

const nextConfig = {
  distDir:
    process.env.PREPMX_DIST_DIR ||
    (process.env.NODE_ENV === 'development' ? devDistDir : '.next'),
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
