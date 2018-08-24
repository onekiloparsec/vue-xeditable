module.exports = {
  configureWebpack: config => {
    config.externals = {
      'lodash': 'lodash',
      '_': 'lodash',
      'axios': 'axios'
    }
  },
  css: {
    extract: false
  },

}
