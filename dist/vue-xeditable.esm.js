(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
import vue from 'vue';
import axios from 'axios';

var XCustomSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('select',{ref:"$_VueXeditable_Select",domProps:{"value":_vm.value},on:{"change":function($event){_vm.onChange($event.target.value);}}},_vm._l((_vm.options),function(option){return _c('option',{key:option[1],ref:"options",refInFor:true,domProps:{"value":option[1],"selected":_vm.isSelected(option)}},[_vm._v(" "+_vm._s(option[0])+" ")])}))},staticRenderFns: [],
  template: '#custom-select',
  props: ['value', 'options'],
  mounted: function mounted () {
    this.$refs.$_VueXeditable_Select.addEventListener('keydown', this.onKeyDown, false);
  },
  beforeDestroy: function beforeDestroy () {
    this.$refs.$_VueXeditable_Select.removeEventListener('keydown', this.onKeyDown, false);
  },
  methods: {
    onChange: function onChange (value) {
      var opt = this.options.find(function (o) {
        return o[1].toString() === value
      });
      this.$emit('input', opt); // MUST be called 'input'
    },
    isSelected: function isSelected (option) {
      return option === this.value
    },
    onKeyDown: function onKeyDown (e) {
      this.$emit('keydown', e);
    }
  }
};

var $_VueXeditable_emptyOptionValue = -999999999;

var XEditable = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-xeditable"},[_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.isEditing && !_vm.isRemoteUpdating),expression:"!isEditing && !isRemoteUpdating"}],staticClass:"vue-xeditable-value",class:{'vue-xeditable-empty': _vm.$_VueXeditable_isValueEmpty},domProps:{"innerHTML":_vm._s(_vm.$_VueXeditable_getHTMLValue())},on:{"click":_vm.$_VueXeditable_startEditing}}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isEditing && !_vm.isRemoteUpdating),expression:"isEditing && !isRemoteUpdating"}],staticClass:"vue-xeditable-control"},[(_vm.type === "text")?_c('input',{staticClass:"vue-form-control",attrs:{"type":"text","autofocus":""},domProps:{"value":_vm.rawValue},on:{"keydown":_vm.$_VueXeditable_onKeydown}}):(_vm.type === "textarea")?_c('textarea',{staticClass:"vue-form-control",on:{"keydown":_vm.$_VueXeditable_onKeydown}},[_vm._v("      "+_vm._s(_vm.rawValue)+"\n    ")]):(_vm.type === "number")?_c('input',{staticClass:"vue-form-control",attrs:{"type":"number"},domProps:{"value":_vm.rawValue},on:{"keydown":_vm.$_VueXeditable_onKeydown}}):(_vm.type === "select")?_c('x-custom-select',{staticClass:"vue-form-control",attrs:{"type":"select","options":_vm.$_VueXeditable_rawOptions},on:{"input":_vm.$_VueXeditable_valueDidChange,"keydown":_vm.$_VueXeditable_onKeydown},model:{value:(_vm.rawValue),callback:function ($$v) {_vm.rawValue=$$v;},expression:"rawValue"}}):_vm._e()],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isRemoteUpdating),expression:"isRemoteUpdating"}],staticClass:"editable-loader"})])},staticRenderFns: [],_scopeId: 'data-v-cd131608',
  name: 'vue-xeditable',
  components: {XCustomSelect: XCustomSelect},
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
      type: Array,
      default: function () {
        return []
      }
    },
    allowEmptyOption: {
      type: Boolean,
      default: true
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
      rawValue: this.value,
      initialSelectValue: this.value
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
    },
    $_VueXeditable_rawOptions: function $_VueXeditable_rawOptions () {
      return (this.allowEmptyOption) ? [[this.empty, $_VueXeditable_emptyOptionValue]].concat(this.options) : this.options
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
          return o === this$1.rawValue
        });
        return opt[0]
      }
      return this.rawValue
    },
    $_VueXeditable_onKeydown: function $_VueXeditable_onKeydown (e) {
      if (e.keyCode === 13) {
        this.$_VueXeditable_stopEditing(e);
        this.$_VueXeditable_valueDidChange(e.target.value);
      }
      else if (e.keyCode === 27) {
        this.$_VueXeditable_stopEditing(e);
      }
    },
    $_VueXeditable_startEditing: function $_VueXeditable_startEditing (e) {
      this.isEditing = true;
      var that = this;
      that.$emit('start-editing', this.rawValue);
      setTimeout(function () {
        var inputs = Array.from(e.target.nextElementSibling.children);
        inputs.forEach(function (i) {
          i.focus();
        });
      }, 100);
    },
    $_VueXeditable_stopEditing: function $_VueXeditable_stopEditing (e) {
      this.isEditing = false;
      var v = (this.type === 'select') ? this.initialSelectValue : this.rawValue;
      this.$emit('stop-editing', v);
    },
    $_VueXeditable_valueDidChange: function $_VueXeditable_valueDidChange (newValue) {
      var this$1 = this;

      if (this.type === 'select') {
        this.$_VueXeditable_stopEditing(); // Needed because no events can be associated with select / option?...
      }
      if (this.$_VueXeditable_hasValueChanged(newValue) || this.type === 'select') {
        var v = (this.type === 'select') ? this.initialSelectValue : this.rawValue;
        this.$emit('value-will-change', v);

        if (this.$_VueXeditable_hasRemoteUpdate) {
          if (this.$_VueXeditable_hasValidRemote) {
            this.$_VueXeditable_sendRemoteUpdate(newValue)
              .then(function () {
                this$1.$emit('value-did-change', newValue);
              })
              .catch(function (error) {
                this$1.$emit('value-remote-update-error', newValue, error);
              });
          } else {
            console.error('VueXeditable Error: Invalid Remote Update configuration.');
          }
        } else {
          this.$_VueXeditable_makeLocalUpdate(newValue);
          this.$emit('value-did-change', newValue);
        }
      }
    },
    $_VueXeditable_hasValueChanged: function $_VueXeditable_hasValueChanged (newValue) {
      return newValue !== this.rawValue
    },
    $_VueXeditable_makeLocalUpdate: function $_VueXeditable_makeLocalUpdate (newValue) {
      // For select types, the value has already changed...
      if (this.type === 'select') {
        if (newValue[1] === $_VueXeditable_emptyOptionValue) {
          this.rawValue = null;
        }
        this.initialSelectValue = this.rawValue;
      } else {
        this.rawValue = newValue;
      }
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

var VueXeditable = {};

VueXeditable.install = function (Vue, options) {
  Vue.component('VueXeditable', XEditable);
};

export default VueXeditable;
//# sourceMappingURL=vue-xeditable.esm.js.map
