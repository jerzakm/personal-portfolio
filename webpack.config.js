const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require('copy-webpack-plugin')


module.exports = {
    mode: "production",
    entry: {
        main: "./src/index.ts"
    },

    devtool: "eval-source-map",
    devServer: {
       contentBase: '.',
       hot: true
    },

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss", ".css"]
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },

    module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.html$/,
            use: [{ loader: "html-loader", options: { minimize: true } }]
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader',
            ],
          },
          { test: /\.(png|woff|woff2|eot|ttf|otf|svg)$/, use: ['url-loader?limit=100000'] }
        ]
      },

      plugins: [
        new MiniCssExtractPlugin({
          // filename: 'style.[contenthash].css',
          filename: 'style.css',
        }),
        new HtmlWebPackPlugin({
          template: "src/index.html",
          filename: "./index.html"
        }),
        // new CopyPlugin([
        //   { from: 'assets/fonts', to: 'fonts' },
        // ])
      ]
}