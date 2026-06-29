/** @type {import('next').NextConfig} */
import os from 'os';
import path from 'path';
import { withSentryConfig } from '@sentry/nextjs';

// Fuera de ~/Documents para evitar que iCloud borre chunks/CSS en pleno dev.
const devDistDir = path.resolve(os.homedir(), '.cache', 'prep-mx-next-dev');

const nextConfig = {
  distDir:
    process.env.PREPMX_DIST_DIR ||
    (process.env.NODE_ENV === 'development' ? devDistDir : '.next'),
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.b-cdn.net' },
      { protocol: 'https', hostname: '**.bunnycdn.com' },
    ],
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

const sentryEnabled = Boolean(
  process.env.NEXT_PUBLIC_SENTRY_DSN?.trim() || process.env.SENTRY_DSN?.trim()
);

export default sentryEnabled
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      silent: !process.env.CI,
      widenClientFileUpload: true,
      disableLogger: true,
      automaticVercelMonitors: true,
      hideSourceMaps: true,
    })
  : nextConfig;
