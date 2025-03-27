import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
