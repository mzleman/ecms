// 
const path = require('path');
const webpack = require('webpack');

function resolve(url) {
    return path.resolve(__dirname, url)
}


module.exports = {
  assetsDir: 'static',
  configureWebpack: {
    resolve: {
      alias: {
          '@views': resolve('src/views'),
          '@components': resolve('src/components'),
          '@images': resolve('src/assets/images'),
          '@css': resolve('src/assets/css'),
          '@network': resolve('src/network')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
      })
    ]
  }
}