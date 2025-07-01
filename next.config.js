/** @type {import('next').NextConfig} */
const nextConfig = {
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