var path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "frontend/src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "frontend/dist"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
