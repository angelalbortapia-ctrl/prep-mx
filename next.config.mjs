/** @type {import('next').NextConfig} */
const nextConfig = {
  // El proyecto vive en ~/Documents (sincronizado con iCloud), e iCloud borra
  // los archivos de build de .next mientras corre el dev server (assets 404) o
  // incluso durante `next build` local (manifests desaparecen a media generación).
  // En dev usamos una carpeta con sufijo .nosync que iCloud ignora.
  // Para builds locales puedes exportar PREPMX_DIST_DIR=.next-build.nosync.
  // En Vercel (sin iCloud) no se define la env y se usa el .next estándar.
  distDir:
    process.env.PREPMX_DIST_DIR ||
    (process.env.NODE_ENV === 'development' ? '.next-dev.nosync' : '.next'),
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
