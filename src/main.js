import XEditable from './components/XEditable.vue'

let VueXeditable = {}

VueXeditable.install = function (Vue, options) {
  Vue.component('VueXeditable', XEditable)
}

export default VueXeditable

