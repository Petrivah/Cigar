const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'assets', 'js', 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/bundle/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/bundle/bundle.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/index.html', to: 'index.html' },
        { from: './src/checkdir.php', to: 'checkdir.php' },
        { from: './src/include', to: 'include' },
      ],
    }),
    new WebpackObfuscator(),
  ],
};
