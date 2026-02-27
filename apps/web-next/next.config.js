/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/shared"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.hunqz.com",
        pathname: "/img/usr/original/**",
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
