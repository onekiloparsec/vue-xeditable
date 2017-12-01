(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('axios')) :
	typeof define === 'function' && define.amd ? define(['vue', 'axios'], factory) :
	(global.VueXEditable = factory(global.Vue,global.axios));
}(this, (function (vue,axios) { 'use strict';

vue = vue && vue.hasOwnProperty('default') ? vue['default'] : vue;
axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

var XEditable = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-xeditable"},[_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.isEditing && !_vm.isRemoteUpdating),expression:"!isEditing && !isRemoteUpdating"}],staticClass:"vue-xeditable-value",class:{'vue-xeditable-empty': _vm.$_VueXeditable_isValueEmpty},domProps:{"innerHTML":_vm._s(_vm.$_VueXeditable_getHTMLValue())},on:{"click":_vm.$_VueXeditable_startEditing}}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isEditing && !_vm.isRemoteUpdating),expression:"isEditing && !isRemoteUpdating"}],staticClass:"vue-xeditable-control"},[(_vm.type === "text")?_c('input',{staticClass:"vue-form-control",attrs:{"type":"text","autofocus":""},domProps:{"value":_vm.rawValue},on:{"keydown":_vm.$_VueXeditable_onKeydown}}):(_vm.type === "textarea")?_c('textarea',{staticClass:"vue-form-control",on:{"keydown":_vm.$_VueXeditable_onKeydown}},[_vm._v("      "+_vm._s(_vm.rawValue)+"\n    ")]):(_vm.type === "number")?_c('input',{staticClass:"vue-form-control",attrs:{"type":"number"},domProps:{"value":_vm.rawValue},on:{"keydown":_vm.$_VueXeditable_onKeydown}}):(_vm.type === "select")?_c('select',{staticClass:"vue-form-control",on:{"change":_vm.$_VueXeditable_valueDidChange}},_vm._l((_vm.options),function(option){return _c('option',{domProps:{"value":option[1]}},[_vm._v(" "+_vm._s(option[0])+" ")])})):_vm._e()]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isRemoteUpdating),expression:"isRemoteUpdating"}],staticClass:"editable-loader"})])},staticRenderFns: [],_scopeId: 'data-v-cd131608',
  name: 'vue-xeditable',
  props: {
    value: {
      type: [String, Number]
    },
    type: {
      type: String,
      required: false,
      default: 'text'
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
    },
    options: {
      type: Array
    },
    remote: {
      type: Object,
      required: false,
      default: function () {
        return {
          url: null,
          method: 'PUT',
          key: null,
          resource: null,
          headers: null
        }
      }
    }
  },
  data: function data () {
    return {
      isEditing: false,
      isRemoteUpdating: false,
      rawValue: this.value
    }
  },
  watch: {
    value: function value (newValue) {
      this.rawValue = newValue;
    }
  },
  computed: {
    $_VueXeditable_isValueEmpty: function $_VueXeditable_isValueEmpty () {
      return this.rawValue === null || this.rawValue === undefined || this.rawValue === ''
    },
    $_VueXeditable_hasRemoteUpdate: function $_VueXeditable_hasRemoteUpdate () {
      return this.remote && this.remote.url && this.remote.url.length && this.remote.key && this.remote.key.length
    },
    $_VueXeditable_hasValidRemote: function $_VueXeditable_hasValidRemote () {
      return this.$_VueXeditable_hasRemoteUpdate() && ['PUT', 'POST'].includes(this.remote.method.toUpperCase())
    }
  },
  methods: {
    $_VueXeditable_getHTMLValue: function $_VueXeditable_getHTMLValue () {
      var this$1 = this;

      if (this.$_VueXeditable_isValueEmpty) {
        return this.empty
      }
      if (this.type === 'select') {
        var opt = this.options.find(function (o) {
          return option[1] === this$1.rawValue
        });
        return opt[0]
      }
      return this.rawValue
    },
    $_VueXeditable_onKeydown: function $_VueXeditable_onKeydown (e) {
      if (e.keyCode === 13) {
        this.$_VueXeditable_stopEditing(e);
        this.$_VueXeditable_valueDidChange(e);
      }
      else if (e.keyCode === 27) {
        this.$_VueXeditable_stopEditing(e);
      }
    },
    $_VueXeditable_startEditing: function $_VueXeditable_startEditing (e) {
      this.isEditing = true;
      var that = this;
      that.$emit('start-editing', e, this.rawValue);
      setTimeout(function () {
        var inputs = Array.from(e.target.nextElementSibling.children);
        inputs.forEach(function (i) {
          i.focus();
        });
      }, 100);
    },
    $_VueXeditable_stopEditing: function $_VueXeditable_stopEditing (e) {
      this.isEditing = false;
      this.$emit('stop-editing', e, this.rawValue);
    },
    $_VueXeditable_valueDidChange: function $_VueXeditable_valueDidChange (e) {
      var this$1 = this;

      var newValue = e.target.value;
      if (this.$_VueXeditable_hasValueChanged(newValue)) {
        this.$emit('value-will-change', e, this.rawValue);

        if (this.$_VueXeditable_hasRemoteUpdate) {
          if (this.$_VueXeditable_hasValidRemote) {
            this.$_VueXeditable_sendRemoteUpdate(newValue)
              .then(function () {
                this$1.$emit('value-did-change', e, newValue);
              })
              .catch(function (error) {
                this$1.$emit('value-remote-update-error', e, newValue, error);
              });
          } else {
            console.error('VueXEditable Error: Invalid Remote Update configuration.');
          }
        } else {
          this.$_VueXeditable_makeLocalUpdate(newValue);
          this.$emit('value-did-change', e, newValue);
        }
      }
    },
    $_VueXeditable_hasValueChanged: function $_VueXeditable_hasValueChanged (newValue) {
      return newValue !== this.rawValue
    },
    $_VueXeditable_makeLocalUpdate: function $_VueXeditable_makeLocalUpdate (newValue) {
      this.rawValue = newValue;
    },
    $_VueXeditable_sendRemoteUpdate: function $_VueXeditable_sendRemoteUpdate (newValue) {
      var this$1 = this;

      var payload = {};

      if (this.remote.resource && this.remote.resource.length) {
        var subpayload = {};
        subpayload[this.remote.key] = newValue;
        payload[this.remote.resource] = subpayload;
      } else {
        payload[this.remote.key] = newValue;
      }

      return new Promise(function (resolve, reject) {
        this$1.isRemoteUpdating = true;
        axios({
          method: this$1.remote.method,
          url: this$1.remote.url,
          headers: this$1.remote.headers || {},
          data: payload
        })
          .then(function (response) {
            this$1.isRemoteUpdating = false;
            this$1.$_VueXeditable_makeLocalUpdate(newValue);
            resolve(newValue);
          })
          .catch(function (error) {
            this$1.isRemoteUpdating = false;
            reject(error);
          });
      })
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
