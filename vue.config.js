module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/dsm-todos/' : '/',
  css: {
    loaderOptions: {
      less: {
        // modifyVars: {
        //   'primary-color': '#ffff00',
        //   'info-color': '#aa00ff',
        //   'success-color': '#795548',
        //   'processing-color': '#84ffff',
        //   'error-color': '#76ff03'
        // },
        javascriptEnabled: true
      }
    }
  }
}

// @highlight-color: #ff3d00;
// @warning-color: #2962ff;
// @normal-color: #f50057;
// @white: #311b92;
// @black: #e1f5fe;
// @body-background: #ffffff;
// @layout-header-background: #001529;
// @btn-primay-color: #ffffff;
// @input-placeholder-color: #bfbfbf;
// @border-color-base: #d8d8d8;
// @input-bg: #ffffff;
// @background-color-light: #f9f9f9;
// @background-color-base: #f4f4f4;
// @checkbox-check-color: #ffffff;
// @heading-color: rgba(0, 0, 0, 0.85);
// @text-color: rgba(0, 0, 0, 0.65);
// @text-color-secondary: rgba(0, 0, 0, 0.45);
// @heading-color-dark: #ffffff;
// @text-color-dark: rgba(255, 255, 255, 0.85);
// @text-color-secondary-dark: rgba(255, 255, 255, 0.65);
