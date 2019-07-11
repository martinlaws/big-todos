const formattedDSMVariables = require('./src/assets/dsm-styles.json')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  css: {
    loaderOptions: {
      less: {
        modifyVars: formattedDSMVariables,
        javascriptEnabled: true
      }
    }
  }
}
