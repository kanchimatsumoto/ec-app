const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts", "page.tsx"],
  webpack(config, options) {
    // svg
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    // image
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          fallback: {
            loader: "file-loader",
            options: {
              publicPath: "/_next/static/images",
              outputPath: "static/images",
            },
          },
        },
      },
    });

    // ailias
    config.resolve.alias["@"] = __dirname;

    return config;
  },
};

module.exports = nextConfig;
