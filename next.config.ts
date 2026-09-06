import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Set the API image hostname here or via NEXT_PUBLIC_IMAGE_HOST
const imageHost = process.env.NEXT_PUBLIC_IMAGE_HOST;

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "https",
    hostname: "spa.g-homes.net",
  },
];

if (imageHost && imageHost !== "spa.g-homes.net") {
  remotePatterns.push({
    protocol: "https",
    hostname: imageHost,
  });
}

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns,
  },
};

export default withNextIntl(nextConfig);
