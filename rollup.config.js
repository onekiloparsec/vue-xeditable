import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import replace from 'rollup-plugin-replace'

import {minify} from 'uglify-js'
import clone from 'lodash/cloneDeep'

import {default as vueConfig, pack} from './config/rollup-plugin-vue.config'
import bubleConfig from './config/buble.config'

const plugins = [
  vue(vueConfig),
  buble(bubleConfig),
  resolve({
    jsnext: true,
    main: true,
    browser: true,
  }),
  commonjs(),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
]

if (process.env.NODE_ENV === 'development') {
  plugins.push(livereload())
  plugins.push(serve({
    contentBase: ['.', 'dist'],
    open: true
  }))
}

const config1 = {
  input: 'src/main.js',
  output: [
    {file: pack.main, format: 'cjs'},
    {file: pack.module, format: 'es'},
    {file: pack.browser, format: 'umd', name: 'VueXeditable'},
  ],
  globals: {
    vue: 'Vue',
    axios: 'axios'
  },
  sourcemap: true,
  plugins,
  external: [
    'vue',
    'axios'
  ]
}

const config2 = clone(config1)
config2.input = 'src/install.js'
config2.output = [{
  name: 'VueXeditable',
  file: `dist/${pack.name.split('/').pop()}.js`,
  format: 'iife'
}]

let configs = [config1, config2]

if (process.env.NODE_ENV === 'production') {
  const config3 = clone(config2)
  config3.plugins.push(uglify({}, minify))
  config3.output = [{
    name: 'VueXeditable',
    file: `dist/${pack.name.split('/').pop()}.min.js`,
    format: 'iife'
  }]

  configs.push(config3)
}

export default configs
