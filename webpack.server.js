const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './backend/index.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve(__dirname, 'backend/dist'),
    filename: 'bundle.server.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
