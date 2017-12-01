<template>
  <div class='vue-xeditable'>
    <span
      class="vue-xeditable-value"
      :class="{'vue-xeditable-empty': $_VueXeditable_isValueEmpty}"
      v-show='!isEditing && !isRemoteUpdating'
      @click='$_VueXeditable_startEditing'
      v-html='$_VueXeditable_getHTMLValue()'>
    </span>

    <div
      v-show='isEditing && !isRemoteUpdating'
      class='vue-xeditable-control'
    >

      <input
        type="text"
        :value="rawValue"
        @keydown='$_VueXeditable_onKeydown'
        v-if='type === "text"'
        class='vue-form-control'
        autofocus
      >

      <textarea
        @keydown='$_VueXeditable_onKeydown'
        v-else-if='type === "textarea"'
        class='vue-form-control'
      >
        {{rawValue}}
      </textarea>

      <input
        type="number"
        :value="rawValue"
        @keydown='$_VueXeditable_onKeydown'
        v-else-if='type === "number"'
        class='vue-form-control'
      >

      <x-custom-select
        type="select"
        v-model="rawValue"
        :options="$_VueXeditable_rawOptions"
        @input='$_VueXeditable_valueDidChange'
        @keydown="$_VueXeditable_onKeydown"
        v-else-if='type === "select"'
        class='vue-form-control'
      >
      </x-custom-select>

    </div>

    <div class='editable-loader' v-show='isRemoteUpdating'></div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import XCustomSelect from './XCustomSelect.vue'

  const $_VueXeditable_emptyOptionValue = -999999999

  export default {
    name: 'vue-xeditable',
    components: {XCustomSelect},
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
    data () {
      return {
        isEditing: false,
        isRemoteUpdating: false,
        rawValue: this.value,
        initialSelectValue: this.value
      }
    },
    watch: {
      value (newValue) {
        this.rawValue = newValue
      }
    },
    computed: {
      $_VueXeditable_isValueEmpty () {
        return this.rawValue === null || this.rawValue === undefined || this.rawValue === ''
      },
      $_VueXeditable_hasRemoteUpdate () {
        return this.remote && this.remote.url && this.remote.url.length && this.remote.key && this.remote.key.length
      },
      $_VueXeditable_hasValidRemote () {
        return this.$_VueXeditable_hasRemoteUpdate() && ['PUT', 'POST'].includes(this.remote.method.toUpperCase())
      },
      $_VueXeditable_rawOptions () {
        return (this.allowEmptyOption) ? [[this.empty, $_VueXeditable_emptyOptionValue]].concat(this.options) : this.options
      }
    },
    methods: {
      $_VueXeditable_getHTMLValue () {
        if (this.$_VueXeditable_isValueEmpty) {
          return this.empty
        }
        if (this.type === 'select') {
          let opt = this.options.find(o => {
            return o === this.rawValue
          })
          return opt[0]
        }
        return this.rawValue
      },
      $_VueXeditable_onKeydown (e) {
        if (!this.isEditing) {
          return
        }
        if (e.keyCode === 13) {
          this.$_VueXeditable_stopEditing(e)
          this.$_VueXeditable_valueDidChange(e.target.value)
        }
        else if (e.keyCode === 27) {
          this.$_VueXeditable_stopEditing(e)
        }
      },
      $_VueXeditable_startEditing (e) {
        this.isEditing = true
        let that = this
        that.$emit('start-editing', this.rawValue)
        setTimeout(function () {
          let inputs = Array.from(e.target.nextElementSibling.children)
          inputs.forEach(i => {
            i.focus()
          })
        }, 100)
      },
      $_VueXeditable_stopEditing (e) {
        this.isEditing = false
        let v = (this.type === 'select') ? this.initialSelectValue : this.rawValue
        this.$emit('stop-editing', v)
      },
      $_VueXeditable_valueDidChange (newValue) {
        if (this.type === 'select') {
          this.$_VueXeditable_stopEditing() // Needed because no events can be associated with select / option?...
        }
        if (this.$_VueXeditable_hasValueChanged(newValue) || this.type === 'select') {
          let v = (this.type === 'select') ? this.initialSelectValue : this.rawValue
          this.$emit('value-will-change', v)

          if (this.$_VueXeditable_hasRemoteUpdate) {
            if (this.$_VueXeditable_hasValidRemote) {
              this.$_VueXeditable_sendRemoteUpdate(newValue)
                .then(() => {
                  this.$emit('value-did-change', newValue)
                })
                .catch((error) => {
                  this.$emit('value-remote-update-error', newValue, error)
                })
            } else {
              console.error('VueXeditable Error: Invalid Remote Update configuration.')
            }
          } else {
            this.$_VueXeditable_makeLocalUpdate(newValue)
            this.$emit('value-did-change', newValue)
          }
        }
      },
      $_VueXeditable_hasValueChanged (newValue) {
        return newValue !== this.rawValue
      },
      $_VueXeditable_makeLocalUpdate (newValue) {
        // For select types, the value has already changed...
        if (this.type === 'select') {
          if (newValue[1] === $_VueXeditable_emptyOptionValue) {
            this.rawValue = null
          }
          this.initialSelectValue = this.rawValue
        } else {
          this.rawValue = newValue
        }
      },
      $_VueXeditable_sendRemoteUpdate (newValue) {
        let payload = {}

        if (this.remote.resource && this.remote.resource.length) {
          let subpayload = {}
          subpayload[this.remote.key] = newValue
          payload[this.remote.resource] = subpayload
        } else {
          payload[this.remote.key] = newValue
        }

        return new Promise((resolve, reject) => {
          this.isRemoteUpdating = true
          axios({
            method: this.remote.method,
            url: this.remote.url,
            headers: this.remote.headers || {},
            data: payload
          })
            .then(response => {
              this.isRemoteUpdating = false
              this.$_VueXeditable_makeLocalUpdate(newValue)
              resolve(newValue)
            })
            .catch(error => {
              this.isRemoteUpdating = false
              reject(error)
            })
        })
      }
    }
  }
</script>

<style scoped>
  .vue-xeditable {
    width: auto;
    color: #222;
    cursor: pointer;
    position: relative;
    display: inline-block;
  }

  .vue-xeditable:hover {
    color: #666;
  }

  .vue-form-control {
    display: block;
    width: 100%;
    padding: 5px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    outline: none;
  }

  .vue-xeditable-value {
    white-space: pre-wrap;
  }

  .vue-xeditable-empty {
    color: #ea0002;
    font-style: italic;
  }

  .editable-loader,
  .editable-loader:before,
  .editable-loader:after {
    background: #999;
    -webkit-animation: load1 1s infinite ease-in-out;
    animation: load1 1s infinite ease-in-out;
    width: 2px;
    height: 2px;
  }

  .editable-loader {
    position: absolute;
    color: #999;
    text-indent: -9999em;
    margin: 3px;
    font-size: 1px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
    top: 0;
    left: 0;
  }

  .editable-loader:before,
  .editable-loader:after {
    position: absolute;
    top: 0;
    content: '';
  }

  .editable-loader:before {
    left: -5px;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .editable-loader:after {
    left: 5px;
  }

  .vue-xeditable-control {
    width: 100%;
    display: inline-block;
  }

  .vue-editable-button {
    display: inline-block;
    padding: 3px 5px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    background: #07c;
    float: right;
    margin-top: 10px;
  }

  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 20px;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5px;
    }
  }

  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 10px;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5px;
    }
  }
</style>
