const formattedDSMVariables = require('./src/assets/dsm-styles.json')

module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      less: {
        modifyVars: formattedDSMVariables,
        javascriptEnabled: true
      }
    }
  }
}
