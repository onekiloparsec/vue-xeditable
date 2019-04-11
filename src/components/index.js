import XEditable from './XEditable.vue'
import XCustomSelect from './XCustomSelect.vue'

function plugin (Vue) {
  Vue.component('x-editable', XEditable)
  Vue.component('x-custom-select', XCustomSelect)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export {
  XEditable,
  XCustomSelect
}
