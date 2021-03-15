"use strict";

const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  node: {
    fs: "empty",
    module: "empty",
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, "example/index.html"),
    }),
  ],
  output: {
    filename: `[name].min.js`,
    library: '',
    libraryExport: '',
    libraryTarget: 'umd',
    globalObject: 'this',
  }
};
