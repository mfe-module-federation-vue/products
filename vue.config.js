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
          root: process.env.REMOTE_ROOT
        },
        shared: require("./package.json").dependencies,
      }),
    ],
  },
  devServer: {
    port: 3002,
    progress: false,
  },
};
