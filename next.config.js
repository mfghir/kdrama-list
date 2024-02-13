/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.postimg.cc"],
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
    ],
  },
};

module.exports = nextConfig;
