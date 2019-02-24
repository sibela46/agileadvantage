const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html"
});


module.exports = {
  watch: true,
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
  },
  module: {
    rules: [
      {
          test: /\.js$/,         // Match both .js and .jsx files
          exclude: /node_modules/,
          loader: "babel-loader",
          query:
            {
              presets:['es2015', 'stage-0', 'react']
            }
      },
      {
          test: /\.scss$/,
          include: [
              path.resolve(__dirname, "scss")
          ],
          use: [
               { loader: "style-loader" },
               { loader: "css-loader" },
               { loader: "sass-loader" }
          ]
      },
      {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
      },
      {
          enforce: 'pre',
          test: /\.tsx?$/,
          use: "source-map-loader"
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        // Exclude `js` files to keep "css" loader working as it injects
        // it's runtime that would otherwise processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        exclude: [/\.js$/, /\.html$/, /\.json$/, /\.ejs$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ]
  },
  resolve: {
      extensions: [".tsx", ".ts", ".js", "scss", ".html"]
  },
  devtool: 'inline-source-map',
  plugins: [
    htmlPlugin
  ]
};
