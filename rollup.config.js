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

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify({}, minify))
}

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
    {file: pack.browser, format: 'umd', name: 'VueXEditable'},
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
  name: 'VueXEditable',
  file: `dist/${pack.name}.min.js`,
  format: 'iife'
}]

export default [config1, config2]
