// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['m.media-amazon.com', 'ik.imagekit.io', 'placehold.co'],
    remotePatterns: [
      { protocol: 'https', hostname: 'm.media-amazon.com', pathname: '/**' },
      { protocol: 'https', hostname: 'ik.imagekit.io', pathname: '/**' },
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname : 'ik.imagekit.io', pathname: '/**' },
    ],
  },

  typscript :{
    ignoreBuildErrors : true,
  },
  eslint :{
    ignoreDuringBuilds : true,
  }
};

export default nextConfig;
