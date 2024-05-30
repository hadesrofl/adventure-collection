/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.system-matters.de",
      },
    ],
  },
};

module.exports = nextConfig;
