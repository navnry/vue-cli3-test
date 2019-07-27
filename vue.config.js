module.exports = {
  publicPath: './',

  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://api.douban.com/',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
}
