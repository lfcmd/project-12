/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v3.fal.media',
        port: '',
        pathname: '/files/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
  // 允许提供静态HTML文件
  async rewrites() {
    return [
      {
        source: '/test.html',
        destination: '/test.html',
      },
    ];
  },
};

module.exports = nextConfig;