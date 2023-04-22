/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/*/**',
      },
      {
        protocol: 'https',
        hostname: 'google.com',
        port: '',
        pathname: '/*/**',
      },
    ],
  },
  output: 'standalone',
  // webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      tls: false,
      net: false,
      fs: false,
    };

    return config;
  },
};

module.exports = nextConfig;
