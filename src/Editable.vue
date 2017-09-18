<template>
  <div class='vue_editable'>
    <span v-show='!editable_mode && !loading' @click='toggle_editable_mode' v-bind:class='display_class()'>{{display_value()}}</span>
    <div v-show='editable_mode && !loading' class='editable-control'>
      <input type="text"
            :value="val"
            @blur='editable_blur'
            @keydown='keydown'
            v-if='type == "text"'>
      <textarea @blur='editable_blur'
                @keydown='keydown'
                v-else-if='type == "textarea"'>{{val}}</textarea>
      <input type="number"
            :value="val"
            @blur='editable_blur'
            @keydown='keydown'
            v-if='type == "number"'>
      <select @change='editable_blur'
              v-if='type == "select"'>
        <option v-for='option in options' :value="option[1]">{{option[0]}}</option>
      </select>
    </div>
    <div class='editable-loader' v-show='loading'></div>

  </div>
</template>

<script>
export default {
  name: 'editable',
  props: {
    onblur: {
      type: Function,
      required: false,
      default: function(){}
    },
    value: {
      type: [String, Number]
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
      default: ''
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
    value(val) {
      this.val = val;
    }
  },
  created () {
  },
  methods: {
    display_class() {
      if (this.val == null || this.val == '') {
        return 'vue-editable-empty';
      }
      return '';
    },
    display_value() {
      if (this.val == null || this.val == '') {
        return this.empty;
      }
      debugger
      if (this.type == 'select') {
        for(let option of this.options) {
          if (option[1] == this.val) return option[0]
        }
      }
      return this.val;
    },
    toggle_editable_mode(e) {
      this.editable_mode = !this.editable_mode;
      if (this.editable_mode) {
        setTimeout(function() {
          let inputs = e.target.nextElementSibling.children
          for (let input of inputs) { input.focus() }
        }, 100)
      }
    },
    keydown(e) {
      if (e.keyCode == 13) this.editable_blur(e)
    },
    get_value(el) {
      switch (this.type) {
      case 'textarea':
      case 'text':
      case 'number':
      case 'select':
        return el.value;
      default:
        
      }
    },
    editable_blur(e) {
      let value = this.get_value(e.target)
      if (this.url && this.url.length) {
        this.request_url(value)
      } else {
        this.editable_mode = false;
        this.onblur();
        this.$emit('update:value', value)
        this.val = value;
      }
    },
    request_url(value) {
      if (value == this.val) { return }
      this.loading = true;
      let data = {}
      data[this.attr] = value
      if (this.resource) {
        let temp = {};
        temp[resource] = data;
        data = temp;
      }
      axios({
        method: this.method,
        url: this.url,
        data: data
      }).then(response => {
        this.loading = false;
      }).error(error =>{
        this.loading = false;
      });
    }
  }
}
</script>

<style>
  input,textarea {
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
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
    outline: none;
  }
  .vue_editable {
    width: 100%;
    color: #222;
    cursor: pointer;
    position: relative;
    display: inline-block;
  }
  .vue_editable span {
    white-space: pre-wrap;
  }
  .vue_editable:hover {
    color: #666;
  }
  .vue-editable-empty {
    color: #ea0002;
    font-style: italic;
  }
  .editable-loader,
  .editable-loader:before,
  .editable-loader:after {
    background: #220014;
    -webkit-animation: load1 1s infinite ease-in-out;
    animation: load1 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }
  .editable-loader {
    position: absolute;
    color: #220014;
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
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .editable-loader:after {
    left: 1.5em;
  }
  .editable-control {
    width: 100%;
    display: inline-block;
  }
  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 30px;
    }
    40% {
      box-shadow: 0 -2em;
      height: 40px;
    }
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
</style>
