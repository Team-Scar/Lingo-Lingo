const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./client/src/index.jsx",
  target: 'web',
  output: {
    path: path.join(__dirname, './client/public'),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  },
  plugins: [new ESLintPlugin(), new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }), new NodePolyfillPlugin()],
  // [devtool] this is an additional source map that will let the browser know what files are running our code.
  // Helps with error tracing. Without it we will not know where our errors are coming from because it will state that everything inside the bundle file.
  devtool: "eval-cheap-module-source-map",
  // 'inline-source-map'
  // [devServer] configuration for the live server including port
  devServer: {
    // [static] config for how what to serve
    static: {
      directory: path.join(__dirname, './client/public'),
    },
    compress: true,
    // [port] what port on our local machine to run the dev server
    port: 3000,
  },
  externals: [
  "child_process",
  "dns",
  "fs",
  "net",
  "tls",
  {
    express: 'express',
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
  },
],
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      assert: false,

    }
  },
}