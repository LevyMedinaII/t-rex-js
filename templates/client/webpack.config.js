const HtmlWebPackPlugin = require("html-webpack-plugin")
const config = require("./../config.json")

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
})

module.exports = {
  devServer: {
    inline: true,
    contentBase: './dist',
    port: `${config.frontend_port}`,
    proxy: {
      '/api/**': {
        target: `http://localhost:${config.backend_port}`,
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true
      }
    }
  },
  entry: './src/App.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
}