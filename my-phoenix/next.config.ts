import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["antd", "@ant-design/icons", "rc-util", "rc-picker", "rc-pagination"],
};

export default nextConfig;
