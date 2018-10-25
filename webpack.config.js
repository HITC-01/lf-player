const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './client/index.jsx'),
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: 'player-bundle.min.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, './client'),
        ],
      },
    ],
  },
};
