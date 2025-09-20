/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deployment configuration
  output: process.env.NEXT_STANDALONE === 'true' ? 'standalone' : undefined,

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Optimize images for production
    minimumCacheTTL: 60,
    formats: ['image/webp', 'image/avif'],
  },

  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Optimize for psychology-focused performance
  swcMinify: true,

  // Compression for better performance
  compress: true,

  // Bundle analyzer support
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      if (!dev && !isServer) {
        config.plugins.push(
          new (require('@next/bundle-analyzer'))({
            enabled: true,
            openAnalyzer: false,
          })
        );
      }
      return config;
    },
  }),

  // PWA support for offline habits
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Performance headers
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Cache control for static assets
          ...(process.env.NODE_ENV === 'production' ? [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ] : []),
        ],
      },
      // API routes security
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
    ];
  },

  // Health check endpoint
  async rewrites() {
    return [
      {
        source: '/health',
        destination: '/api/health',
      },
    ];
  },
};

export default nextConfig;