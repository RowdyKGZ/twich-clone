/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["img.clerk.com"] },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
};

module.exports = nextConfig;
