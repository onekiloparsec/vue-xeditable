(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('axios')) :
	typeof define === 'function' && define.amd ? define(['vue', 'axios'], factory) :
	(global.VueXEditable = factory(global.Vue,global.axios));
}(this, (function (vue,axios) { 'use strict';

vue = vue && vue.hasOwnProperty('default') ? vue['default'] : vue;
axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

var XEditable = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-xeditable"},[_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.editable_mode && !_vm.loading),expression:"!editable_mode && !loading"}],staticClass:"value",class:{'empty': _vm.$_VueXeditable_isValueEmpty},domProps:{"innerHTML":_vm._s(_vm.display_value())},on:{"click":_vm.toggle_editable_mode}}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.editable_mode && !_vm.loading),expression:"editable_mode && !loading"}],staticClass:"vue-xeditable-control"},[(_vm.type == "text")?_c('input',{staticClass:"vue-form-control",attrs:{"type":"text","autofocus":""},domProps:{"value":_vm.val},on:{"blur":_vm.editable_changed,"keydown":_vm.keydown}}):(_vm.type == "textarea")?_c('textarea',{staticClass:"vue-form-control",on:{"blur":_vm.editable_changed,"keydown":_vm.keydown}},[_vm._v("      "+_vm._s(_vm.val)+"\n    ")]):_vm._e(),_vm._v(" "),(_vm.type == "number")?_c('input',{staticClass:"vue-form-control",attrs:{"type":"number"},domProps:{"value":_vm.val},on:{"blur":_vm.editable_changed,"keydown":_vm.keydown}}):_vm._e(),_vm._v(" "),(_vm.type == "select")?_c('select',{staticClass:"vue-form-control",on:{"change":_vm.editable_changed}},_vm._l((_vm.options),function(option){return _c('option',{domProps:{"value":option[1]}},[_vm._v(" "+_vm._s(option[0])+" ")])})):_vm._e()]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.loading),expression:"loading"}],staticClass:"editable-loader"})])},staticRenderFns: [],_scopeId: 'data-v-cd131608',
  name: 'vue-xeditable',
  props: {
    onblur: {
      type: Function,
      required: false,
      default: function () {
      }
    },
    value: {
      type: [String, Number]
    },
    height: {
      type: Number,
      default: 350
    },
    attr: {
      type: String,
      required: false,
      default: ''
    },
    method: {
      type: String,
      required: false,
      default: 'POST'
    },
    options: {
      type: Array
    },
    resource: {
      type: String,
      required: false,
      default: null
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    url: {
      type: String,
      required: false,
    },
    headers: {
      type: Object,
      required: false,
      default: null
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    empty: {
      type: String,
      required: false,
      default: 'Empty'
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: function data () {
    return {
      editable_mode: false,
      loading: false,
      val: this.value
    }
  },
  watch: {
    value: function value (val) {
      this.val = val;
    }
  },
  computed: {
    $_VueXeditable_isValueEmpty: function $_VueXeditable_isValueEmpty () {
      return this.val === null || this.val === ''
    }
  },
  methods: {
    display_value: function display_value () {
      var this$1 = this;

      if (this.$_VueXeditable_isValueEmpty) {
        return this.empty
      }
      if (this.type === 'select') {
        var opt = this.options.find(function (o) {
          return option[1] === this$1.val
        });
        return opt[0]
      }
      return this.val
    },
    toggle_editable_mode: function toggle_editable_mode (e) {
      this.editable_mode = !this.editable_mode;
      var that = this;
      if (this.editable_mode) {
        setTimeout(function () {
          var inputs = e.target.nextElementSibling.children;
          inputs.forEach(function (i) {
            i.focus();
          });
          that.$emit('show');
        }, 100);
      } else {
        this.$emit('hide');
      }
    },
    keydown: function keydown (e) {
      if (e.keyCode === 13) { this.editable_changed(e); }
    },
    get_value: function get_value (el) {
      switch (this.type) {
        case 'textarea':
        case 'text':
        case 'number':
        case 'select':
          return el.value
        default:
          return ''
      }
    },
    editable_changed: function editable_changed (e) {
      var value = this.get_value(e.target);
      if (this.url && this.url.length && value !== this.val) {
        this.send_request(value);
      } else {
        this.value_did_changed(value);
      }
      this.$emit('change', value);
    },
    value_did_changed: function value_did_changed (value) {
      this.editable_mode = false;
      this.onblur();
      this.$emit('update:value', value);
      this.val = value;
      this.loading = false;
    },
    value_change_error: function value_change_error (value) {
      this.onblur();
      this.loading = false;
    },
    send_request: function send_request (value) {
      var this$1 = this;

      this.loading = true;
      var data = {};
      data[this.attr] = value;
      if (this.resource) {
        var temp = {};
        temp[this.resource] = data;
        data = temp;
      }
      axios({
        method: this.method,
        url: this.url,
        data: data,
        headers: this.headers || {}
      }).then(function (response) {
        this$1.value_did_changed(value);
      }).catch(function (error) {
        this$1.loading = false;
      });
    }
  }
};

var VueXEditable = {};

VueXEditable.install = function (Vue, options) {
  Vue.component('VueXEditable', XEditable);
};

return VueXEditable;

})));
//# sourceMappingURL=vue-xeditable.umd.js.map
