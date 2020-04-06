const Versions = require(__dirname + "/versions.js");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const path = require('path');const {
  NODE_ENV = 'development',
} = process.env;

module.exports = {
  entry:{
    "yotsuba-kissu-b": './stylesheets/src/yotsu-kissu-b.scss',
    "dark-kissu": './stylesheets/src/dark-kissu.scss',
    "kissu": './stylesheets/src/kissu.scss',
  },
mode: NODE_ENV,
plugins: [

  new MiniCssExtractPlugin({filename: `./../pub/stylesheets/[name](${Versions.stylesheet_version_num}).css`}),
  new FixStyleOnlyEntriesPlugin(),

],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,

          // Translates CSS into CommonJS
          'css-loader'
        ],
      },
    ],
  },
};