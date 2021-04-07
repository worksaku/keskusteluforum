const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: { path: path.join(__dirname, 'build'), filename: '[name].js' },
  mode: process.env.NODE_ENV || 'development',
  devtool: 'inline-source-map',
  devServer: { contentBase: path.join(__dirname, 'src'), port: 3000 },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
};
