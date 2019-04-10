module.exports = {
  configureWebpack: config => {
    config.externals = {
      ...config.externals,
      'lodash': 'lodash',
      '_': 'lodash'
    }
  },
  css: {
    extract: false
  },

}
