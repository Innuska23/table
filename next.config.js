const nextConfig = {
  basePath: "/test-task-next",
  output: "export",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        domains: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};
