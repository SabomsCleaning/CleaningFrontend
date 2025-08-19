import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  reactStrictMode: true,
  allowedDevOrigins: ["local-origin.dev", "192.168.1.168:3000", "*.local-origin.dev"],
};

export default nextConfig;
