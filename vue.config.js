// module.exports = {
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://api.douban.com',
//         ws: true,
//         changeOrigin: true
//       }
//     }
//   }
// }
module.exports = {
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
