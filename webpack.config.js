module.exports = {
  entry: {
    "content_script": "./src/content_script.js",
    "popup": "./src/popup.js",
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
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};