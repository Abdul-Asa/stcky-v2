/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/login",
      has: [{ type: "cookie", key: "token" }],
      destination: "/space",
      permanent: false,
    },
    {
      source: "/space",
      missing: [{ type: "cookie", key: "token" }],
      destination: "/login",
      permanent: false,
    },
  ],
};

module.exports = nextConfig;
