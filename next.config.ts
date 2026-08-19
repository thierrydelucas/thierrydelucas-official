import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/shared/infrastructure/i18n/request.ts",
);

const nextConfig: NextConfig = {
  experimental: {
    rootParams: true,
  },
  images: {
    // 75 = default for icons/UI; 100 = photos (max fidelity for dark gradients)
    qualities: [75, 100],
    // AVIF preserves shadow detail better than WebP at similar sizes
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
