import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{
      source: '/:path*',
      has: [{ type: 'host', value: 'www.ahmedabozahra.me' }],
      destination: 'https://ahmedabozahra.me/:path*',
      permanent: true,
    }];
  },
  async headers() {
    return [{
      source: '/:path*',
      missing: [{ type: 'host', value: 'ahmedabozahra.me' }],
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    }];
  },
};

export default nextConfig;
