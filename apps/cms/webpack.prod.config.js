const webpack= require('./webpack.config')

const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  ...webpack,
  optimization: {
    minimizer: [
      new TerserPlugin({
        /* additional options here */
      })
    ]
  },

}

