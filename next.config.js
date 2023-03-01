/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    // for images from getNewsArticles()
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.contentstack.io",
        port: "",
        pathname: "/v3/assets/**",
      },
      {
        protocol: "https",
        hostname: "www.bungie.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
