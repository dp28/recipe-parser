module.exports = {
  entry: {
    "content-script": "./src/content-script.js",
    "background": "./src/background.js",
    "options": "./src/options.js"
  },
  output: {
    path: __dirname + "/dist/js",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader"
        ],
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          "pug-loader"
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.pug']
  }
};
