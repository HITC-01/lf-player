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
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
        include: [
          path.resolve(__dirname, './client'),
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
        include: [
          path.resolve(__dirname, './public/assets/styles'),
        ],
      },
    ],
    // plugins: [
    //   new StaticSiteGeneratorPlugin('main', locals.routes),
    //   new ExtractTextPlugin('styles.css'),
    // ],
  },
};
