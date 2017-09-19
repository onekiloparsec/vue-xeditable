<template>
  <div class='vue_editable'>
    <span v-show='!editable_mode && !loading' @click='toggle_editable_mode' v-bind:class='display_class()' v-html='display_value()'></span>
    <div v-show='editable_mode && !loading' class='editable-control'>
      <input type="text"
            :value="val"
            @blur='editable_changed'
            @keydown='keydown'
            v-if='type == "text"'
            class='vue-form-control'>
      <textarea @blur='editable_changed'
                @keydown='keydown'
                v-else-if='type == "textarea"'
                class='vue-form-control'>{{val}}</textarea>
      <input type="number"
            :value="val"
            @blur='editable_changed'
            @keydown='keydown'
            v-if='type == "number"'
            class='vue-form-control'>
      <select @change='editable_changed'
              v-if='type == "select"'
              class='vue-form-control'>
        <option v-for='option in options' :value="option[1]">{{option[0]}}</option>
      </select>
      <quill-editor v-model="val"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="editable_changed"
                    v-if='type == "quill"'>
      </quill-editor>
    </div>
    <div class='editable-loader' v-show='loading'></div>

  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Quill from 'quill'
import VueQuillEditor from 'vue-quill-editor'

export default {
  name: 'editable',
  editor() {
    return this.$refs.myQuillEditor.quill
  },
  components: {
    'quill-editor': VueQuillEditor.quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  props: {
    onblur: {
      type: Function,
      required: false,
      default: function(){}
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
    },
    editorOption: {
      type: Object,
      default: function () {
        return {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              ['clean']
            ]
          }
        }
      }
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
  methods: {
    display_class() {
      if (this.val == null || this.val == '') {
        return 'vue-editable-empty vue-editable-value';
      }
      return 'vue-editable-value';
    },
    display_value() {
      if (this.val == null || this.val == '') {
        return this.empty;
      }
      if (this.type == 'select') {
        for(let option of this.options) {
          if (option[1] == this.val) return option[0]
        }
      }
      return this.val;
    },
    toggle_editable_mode(e) {
      this.editable_mode = !this.editable_mode;
      let that = this;
      if (this.editable_mode) {
        setTimeout(function() {
          let inputs = e.target.nextElementSibling.children
          if (this.type == 'quill') {
            this.editor.focus()
          } else {
            for (let input of inputs) { input.focus() }
          }
          that.$emit('show');
        }, 100)
      } else {
        this.$emit('hide');
      }
    },
    keydown(e) {
      if (e.keyCode == 13) this.editable_changed(e)
    },
    get_value(el) {
      switch (this.type) {
      case 'textarea':
      case 'text':
      case 'number':
      case 'select':
        return el.value;
      case 'quill':
        return this.editor.root.innerHTML;
      default:
        return ''
      }
    },
    quill_blur_check(e) {
      let not_bluring = this.type == 'quill' && this.editor.selection.savedRange.length;
      return not_bluring || document.getElementsByClassName('ql-expanded').length;
    },
    editable_changed(e) {
      if (this.quill_blur_check(e)) {
        this.editor.focus();
        return
      }
      let value = this.get_value(e.target)
      if (this.url && this.url.length) {
        this.send_request(value)
      } else {
        this.value_did_changed(value)
      }
      this.$emit('change', value);
    },
    value_did_changed(value) {
      this.editable_mode = false;
      this.onblur();
      this.$emit('update:value', value)
      this.val = value;
      this.loading = false;
    },
    value_change_error(value) {
      this.onblur();
      this.loading = false;
    },
    send_request(value) {
      if (value == this.val) { return }
      this.loading = true;
      let data = {}
      data[this.attr] = value
      if (this.resource) {
        let temp = {};
        temp[this.resource] = data;
        data = temp;
      }
      axios({
        method: this.method,
        url: this.url,
        data: data
      }).then(response => {
        this.value_did_changed(value)
      }).catch(error =>{
        this.loading = false;
      });
    }
  }
}
</script>

<style>
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
  .vue_editable .vue-editable-value {
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
  .editable-control {
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
