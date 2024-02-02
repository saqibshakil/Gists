/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const deps = require('./package.json').dependencies
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000
  },
  output: {
    // publicPath: 'http://localhost:3001/', // Added this
    filename: '[name].js',
    chunkFilename: '[id].[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js'],
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript']
        }
      },
      {
        test: /\.(sass|scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MonacoWebpackPlugin({
      languages: ['json', 'handlebars'],
      filename: '[name].worker.[contenthash].js'
    })
  ]
}

