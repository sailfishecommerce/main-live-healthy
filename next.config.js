/**
 * @type {import('next').NextConfig}
 */

const withNextPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const ifdefOpts = {
  DEV: process.env.NODE_ENV === 'development',
  PROD: process.env.NODE_ENV === 'production',
  TEST: process.env.NODE_ENV === 'test',
}

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `script-src 'self' maps.googleapis.com 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com *.google.com https://*.ggpht.com *.googleusercontent.com;
    img-src 'self' maps.gstatic.com *.googleapis.com *.ggpht.com https://*.googleapis.com https://*.gstatic.com *.google.com  *.googleusercontent.com data:;
    frame-src *.google.com;
    connect-src 'self' https://*.googleapis.com *.google.com https://*.gstatic.com  data: blob:;
    font-src https://fonts.gstatic.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
  },
]
module.exports = withNextPlugins([withBundleAnalyzer], {

  async header() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  generateBuildId: () => 'build',
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'components', 'config', 'layouts', 'lib', 'utils', 'hooks'],
  },
  images: {
    formats: ['image/webp'],
    domains: ['res.cloudinary.com', 'cdn.schema.io', 'www.livehealthy.hk'],
    deviceSizes: [320, 375, 425, 640, 768, 828, 1024, 1200, 1440, 1920, 2560],
    minimumCacheTTL: 60 * 60 * 24,
  },
  webpack: (config) => {
    const rules = config.module.rules

    // Ifdef loader
    rules.push({
      test: /\.tsx$/,
      use: [
        {
          loader: 'ifdef-loader',
          options: ifdefOpts,
        },
      ],
    })

    // SVGR loader
    rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            svgProps: {
              fill: 'currentColor',
            },
          },
        },
      ],
    })

    return config
  },
})
