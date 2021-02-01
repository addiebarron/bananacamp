const path = require('path');
const SizePlugin = require('size-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    content: './source/content',
    background: './source/background',
    // options: './source/options',
  },
  output: {
    path: path.join(__dirname, 'distribution'),
    filename: '[name]/index.js',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new SizePlugin(),
    new CopyWebpackPlugin(
      [
        {
          from: '**/*',
          context: 'source',
          copyUnmodified: true,
        },
      ],
      { ignore: ['*.js', '__tests__/**'] }
    ),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          compress: false,
          output: {
            beautify: true,
            indent_level: 2, // eslint-disable-line camelcase
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devtool: 'source-map',
  stats: 'errors-only',
};
