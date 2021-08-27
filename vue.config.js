const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;

module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "products",
        filename: "remoteEntry.js",
        exposes: {
          "./Products": "./src/components/Products",
        },
        remotes: {
          ds: process.env.REMOTE_DS,
        },
        shared: {
          vuetify: {
            singleton: true,
          },
          vue: {
            singleton: true,
          },
        },
      }),
    ],
  },
  devServer: {
    port: 3002,
    progress: false,
  },
};
