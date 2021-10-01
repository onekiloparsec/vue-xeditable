module.exports = {
  configureWebpack: config => {
    config.externals = {
      ...config.externals,
      'lodash': 'lodash',
      '_': 'lodash',
      'axios': 'axios',
      'vuejs-datepicker': 'vuejs-datepicker'
    }
  },
  css: {
    extract: false
  }
}
