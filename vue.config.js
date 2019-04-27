const formattedDSMVariables = require('./utils/dsm-styles.json')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/dsm-todos/' : '/',
  css: {
    loaderOptions: {
      less: {
        modifyVars: formattedDSMVariables,
        javascriptEnabled: true
      }
    }
  }
}
