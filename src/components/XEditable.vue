<template>
  <div class='vue-xeditable'>
    <span
      class="value"
      :class="{'empty': $_VueXeditable_isValueEmpty}"
      v-show='!editable_mode && !loading'
      @click='toggle_editable_mode'
      v-html='display_value()'>
    </span>

    <div
      v-show='editable_mode && !loading'
      class='vue-xeditable-control'
    >

      <input
        type="text"
        :value="val"
        @blur='editable_changed'
        @keydown='keydown'
        v-if='type == "text"'
        class='vue-form-control'
        autofocus
      >

      <textarea
        @blur='editable_changed'
        @keydown='keydown'
        v-else-if='type == "textarea"'
        class='vue-form-control'
      >
        {{val}}
      </textarea>

      <input
        type="number"
        :value="val"
        @blur='editable_changed'
        @keydown='keydown'
        v-if='type == "number"'
        class='vue-form-control'
      >

      <select
        @change='editable_changed'
        v-if='type == "select"'
        class='vue-form-control'
      >
        <option
          v-for='option in options'
          :value="option[1]"
        >
          {{option[0]}}
        </option>
      </select>

    </div>

    <div class='editable-loader' v-show='loading'></div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
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
    data () {
      return {
        editable_mode: false,
        loading: false,
        val: this.value
      }
    },
    watch: {
      value (val) {
        this.val = val
      }
    },
    computed: {
      $_VueXeditable_isValueEmpty () {
        return this.val === null || this.val === ''
      }
    },
    methods: {
      display_value () {
        if (this.$_VueXeditable_isValueEmpty) {
          return this.empty
        }
        if (this.type === 'select') {
          let opt = this.options.find(o => {
            return option[1] === this.val
          })
          return opt[0]
        }
        return this.val
      },
      toggle_editable_mode (e) {
        this.editable_mode = !this.editable_mode
        let that = this
        if (this.editable_mode) {
          setTimeout(function () {
            let inputs = e.target.nextElementSibling.children
            inputs.forEach(i => {
              i.focus()
            })
            that.$emit('show')
          }, 100)
        } else {
          this.$emit('hide')
        }
      },
      keydown (e) {
        if (e.keyCode === 13) this.editable_changed(e)
      },
      get_value (el) {
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
      editable_changed (e) {
        let value = this.get_value(e.target)
        if (this.url && this.url.length && value !== this.val) {
          this.send_request(value)
        } else {
          this.value_did_changed(value)
        }
        this.$emit('change', value)
      },
      value_did_changed (value) {
        this.editable_mode = false
        this.onblur()
        this.$emit('update:value', value)
        this.val = value
        this.loading = false
      },
      value_change_error (value) {
        this.onblur()
        this.loading = false
      },
      send_request (value) {
        this.loading = true
        let data = {}
        data[this.attr] = value
        if (this.resource) {
          let temp = {}
          temp[this.resource] = data
          data = temp
        }
        axios({
          method: this.method,
          url: this.url,
          data: data,
          headers: this.headers || {}
        }).then(response => {
          this.value_did_changed(value)
        }).catch(error => {
          this.loading = false
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

  .vue-xeditable .value {
    white-space: pre-wrap;
  }

  .vue-xeditable .empty {
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
