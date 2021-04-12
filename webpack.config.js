/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",

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
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: "index.js",
    library: "jestLite",
    libraryTarget: "umd",
  },
};
