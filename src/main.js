import XEditable from './components/XEditable.vue'

let VueXEditable = {}

VueXEditable.install = function (Vue, options) {
  Vue.component('VueXEditable', XEditable)
}

export default VueXEditable

