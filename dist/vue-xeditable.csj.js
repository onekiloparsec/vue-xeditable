'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

var XCustomSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('select',{ref:"$_VueXeditable_Select",domProps:{"value":_vm.value},on:{"change":function($event){_vm.onChange($event.target.value);}}},_vm._l((_vm.options),function(option){return _c('option',{key:option,ref:"options",refInFor:true,domProps:{"value":option,"selected":_vm.isSelected(option)}},[_vm._v(" "+_vm._s(option)+" ")])}))},staticRenderFns: [],
  template: '#custom-select',
  props: ['value', 'options'],
  mounted: function mounted () {
    this.$refs.$_VueXeditable_Select.addEventListener('keydown', this.onKeyDown, false);
  },
  beforeDestroy: function beforeDestroy () {
    this.$refs.$_VueXeditable_Select.removeEventListener('keydown', this.onKeyDown, false);
  },
  methods: {
    onChange: function onChange (newSelection) {
      this.$emit('input', newSelection); // MUST be called 'input'
    },
    isSelected: function isSelected (option) {
      return option === this.value
    },
    onKeyDown: function onKeyDown (e) {
      this.$emit('keydown', e);
    }
  }
};

var XEditable = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-xeditable"},[(_vm.isRemoteUpdating)?_vm._t("before"):_vm._e(),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.isEditing && !_vm.isRemoteUpdating),expression:"!isEditing && !isRemoteUpdating"}],staticClass:"vue-xeditable-value",class:{'vue-xeditable-empty': _vm.$_VueXeditable_isValueEmpty},domProps:{"innerHTML":_vm._s(_vm.$_VueXeditable_getHTMLValue())},on:{"click":_vm.$_VueXeditable_startEditing}}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isEditing && !_vm.isRemoteUpdating),expression:"isEditing && !isRemoteUpdating"}],staticClass:"vue-xeditable-control"},[(_vm.type === "text")?_c('input',{ref:"$_VueXeditable_text",staticClass:"vue-xeditable-form-control",class:_vm.controlClass,attrs:{"type":"text","autofocus":""},domProps:{"value":_vm.rawValue},on:{"keydown":_vm.$_VueXeditable_onKeydown}}):(_vm.type === "textarea")?_c('textarea',{ref:"$_VueXeditable_textarea",staticClass:"vue-xeditable-form-control",class:_vm.controlClass,on:{"keydown":_vm.$_VueXeditable_onKeydown}},[_vm._v("      "+_vm._s(_vm.rawValue)+"\n    ")]):(_vm.type === "number")?_c('input',{ref:"$_VueXeditable_number",staticClass:"vue-xeditable-form-control",class:_vm.controlClass,attrs:{"type":"number"},domProps:{"value":_vm.rawValue},on:{"keydown":_vm.$_VueXeditable_onKeydown}}):(_vm.type === "select")?_c('x-custom-select',{ref:"$_VueXeditable_select",staticClass:"vue-xeditable-form-control",class:_vm.controlClass,attrs:{"options":_vm.options},on:{"input":_vm.$_VueXeditable_valueDidChange,"keydown":_vm.$_VueXeditable_onKeydown},model:{value:(_vm.rawValue),callback:function ($$v) {_vm.rawValue=$$v;},expression:"rawValue"}}):_vm._e()],1),_vm._v(" "),(_vm.isRemoteUpdating)?_vm._t("after"):_vm._e()],2)},staticRenderFns: [],_scopeId: 'data-v-cd131608',
  name: 'vue-xeditable',
  components: {XCustomSelect: XCustomSelect},
  props: {
    value: {
      type: [String, Number, Array]
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    name: {
      type: String,
      required: false,
      default: 'VueXeditable'
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
    },
    controlClass: {
      type: String,
      default: ''
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
      return this.$_VueXeditable_hasRemoteUpdate && ['PUT', 'POST'].includes(this.remote.method.toUpperCase())
    }
  },
  methods: {
    $_VueXeditable_getHTMLValue: function $_VueXeditable_getHTMLValue () {
      if (this.$_VueXeditable_isValueEmpty) {
        return this.empty
      }
      return this.rawValue || '?'
    },
    $_VueXeditable_onKeydown: function $_VueXeditable_onKeydown (event) {
      if (!this.isEditing) {
        return
      }
      if (event.keyCode === 13) {
        this.$_VueXeditable_stopEditing(event);
        this.$_VueXeditable_valueDidChange(event.target.value);
      }
      else if (event.keyCode === 27) {
        this.$_VueXeditable_stopEditing(event);
      }
    },
    $_VueXeditable_startEditing: function $_VueXeditable_startEditing (event) {
      this.isEditing = true;
      var that = this;
      that.$emit('start-editing', this.rawValue, this.name);
      setTimeout(function () {
        var inputs = Array.from(event.target.nextElementSibling.children);
        inputs.forEach(function (i) {
          i.focus();
        });
      }, 100);
    },
    $_VueXeditable_stopEditing: function $_VueXeditable_stopEditing (event) {
      this.isEditing = false;
      this.$emit('stop-editing', this.rawValue, this.name);
    },
    $_VueXeditable_valueDidChange: function $_VueXeditable_valueDidChange (newValue) {
      var this$1 = this;

      if (this.type === 'select') {
        this.$_VueXeditable_stopEditing(); // Needed because no events can be associated with select / option?...
      }
      if (this.$_VueXeditable_hasValueChanged(newValue) || this.type === 'select') {
        this.$emit('value-will-change', this.rawValue, this.name);

        if (this.$_VueXeditable_hasRemoteUpdate) {
          if (this.$_VueXeditable_hasValidRemote) {
            this.$_VueXeditable_sendRemoteUpdate(newValue)
              .then(function () {
                this$1.$emit('value-did-change', newValue, this$1.name);
              })
              .catch(function (error) {
                this$1.$emit('value-remote-update-error', newValue, error, this$1.name);
              });
          } else {
            console.error('VueXeditable Error: Invalid Remote Update configuration.');
          }
        } else {
          this.$_VueXeditable_makeLocalUpdate(newValue);
          this.$emit('value-did-change', newValue, this.name);
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

      var updateValue = newValue;

      var payload = {};
      if (this.remote.resource && this.remote.resource.length) {
        var subpayload = {};
        subpayload[this.remote.key] = updateValue;
        payload[this.remote.resource] = subpayload;
      } else {
        payload[this.remote.key] = updateValue;
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

module.exports = VueXeditable;
//# sourceMappingURL=vue-xeditable.csj.js.map
