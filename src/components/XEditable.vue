<template>
  <div :class="{'enabled': enableEditing}" class='vue-xeditable'>
    <slot v-if="isRemoteUpdating" name="before"></slot>

    <span
      v-show='(!isEditing && !isRemoteUpdating) || !enableEditing'
      :class="{'vue-xeditable-empty': $_VueXeditable_isValueEmpty, 'vue-xeditable-value': enableEditing}"
      :title='(enableEditing) ? titleEnabled : titleDisabled'
      v-on:click='$_VueXeditable_maybeStartEditing(1, $event)'
      v-on:dblclick='$_VueXeditable_maybeStartEditing(2, $event)'
      v-html='$_VueXeditable_getHTMLValue()'>
    </span>

    <div
      v-show='isEditing && !isRemoteUpdating && enableEditing'
      class='vue-xeditable-control'
    >

      <input
        v-if='type === "text"'
        :value="rawValue"
        autofocus
        class='vue-xeditable-form-control'
        type="text"
        @blur="$_VueXeditable_stopEditing"
        @keydown='$_VueXeditable_onKeydown'
      >

      <textarea
        v-else-if='type === "textarea"'
        v-model="rawValue"
        class='vue-xeditable-form-control'
        @blur="$_VueXeditable_stopEditing"
        @keydown='$_VueXeditable_onKeydown'
      >
      </textarea>

      <input
        v-else-if='type === "number"'
        :value="rawValue"
        class='vue-xeditable-form-control'
        type="number"
        @blur="$_VueXeditable_stopEditing"
        @keydown='$_VueXeditable_onKeydown'
      >

      <input
        v-else-if='type === "boolean"'
        :value="rawValue"
        class='vue-xeditable-form-control'
        type="checkbox"
        @change='$_VueXeditable_valueDidChange'
      >

      <x-custom-select
        v-else-if='type === "select"'
        :options="options"
        :value="rawValue"
        class='vue-xeditable-form-control'
        @blur="$_VueXeditable_stopEditing"
        @input='$_VueXeditable_valueDidChange'
        @keydown="$_VueXeditable_onKeydown"
      >
      </x-custom-select>

      <date-picker
        v-else-if='type === "date"'
        :value="rawValue"
        input-class="vue-xeditable-form-control"
        placeholder="pick a date"
        @selected="$_VueXeditable_valueDidChange"
      >
      </date-picker>

    </div>

    <slot v-if="isRemoteUpdating" name="after"></slot>
  </div>
</template>

<script>
  import axios from 'axios'
  import XCustomSelect from './XCustomSelect.vue'
  import DatePicker from 'vuejs-datepicker'

  export default {
    name: 'vue-xeditable',
    components: { XCustomSelect, DatePicker },
    props: {
      value: {
        type: [String, Number, Array, Boolean, Date]
      },
      type: {
        type: String,
        required: false,
        default: 'text'
      },
      name: {
        type: String,
        required: false,
        default: 'VueXeditableDefaultName'
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
      editOnDoubleClick: {
        type: Boolean,
        required: false,
        default: false
      },
      remote: {
        type: Object,
        required: false,
        default: function () {
          return {
            url: null,
            method: 'PATCH',
            key: null,
            resource: null,
            headers: null
          }
        }
      },
      enableEditing: {
        type: Boolean,
        required: false,
        default: true
      },
      titleEnabled: {
        type: String,
        required: false,
        default: ''
      },
      titleDisabled: {
        type: String,
        required: false,
        default: ''
      }
    },
    data () {
      return {
        isEditing: false,
        isRemoteUpdating: false,
        rawValue: this.value
      }
    },
    watch: {
      value (newValue) {
        this.rawValue = newValue
      },
      options (newOptions) {
        this.rawValue = newOptions.find((o) => {
          const v = (Array.isArray(o)) ? o[0] : o
          return v === this.rawValue
        })
      }
    },
    computed: {
      $_VueXeditable_isValueEmpty () {
        return (this.rawValue === null || this.rawValue === undefined || this.rawValue === '')
      },
      $_VueXeditable_hasRemoteUpdate () {
        return this.remote && this.remote.url && this.remote.url.length && this.remote.key && this.remote.key.length
      },
      $_VueXeditable_hasValidRemote () {
        return this.$_VueXeditable_hasRemoteUpdate && ['PATCH', 'PUT', 'POST'].includes(this.remote.method.toUpperCase())
      }
    },
    methods: {
      $_VueXeditable_getHTMLValue () {
        if (this.$_VueXeditable_isValueEmpty) {
          return this.empty
        } else if (this.type === 'select' && Array.isArray(this.rawValue)) {
          return this.rawValue[this.rawValue.length - 1]
        } else if (this.rawValue === undefined || this.rawValue === null) {
          return '?'
        } else if (this.type === 'date') {
          return this.rawValue.toLocaleString()
        } else if (this.type === 'number') {
          return this.rawValue.toString()
        }
        return this.rawValue
      },
      $_VueXeditable_onKeydown (event) {
        if (!this.isEditing) {
          return
        }
        if (event.keyCode === 13) {
          this.$_VueXeditable_stopEditing(event)
          this.$_VueXeditable_valueDidChange(event.target.value)
        } else if (event.keyCode === 27) {
          this.$_VueXeditable_stopEditing(event)
        }
      },
      $_VueXeditable_maybeStartEditing (value, event) {
        if (this.enableEditing && (value === 1 && !this.editOnDoubleClick) || (value === 2 && this.editOnDoubleClick)) {
          this.$_VueXeditable_startEditing(event)
        }
      },
      $_VueXeditable_startEditing (event) {
        this.isEditing = true
        let that = this
        that.$emit('start-editing', this.rawValue, this.name)
        setTimeout(function () {
          let inputs = Array.from(event.target.nextElementSibling.children)
          inputs.forEach(i => i.focus())
        }, 100)
      },
      $_VueXeditable_stopEditing (event) {
        this.isEditing = false
        this.$emit('stop-editing', this.rawValue, this.name, event)
      },
      $_VueXeditable_valueDidChange (newValue) {
        if (this.type === 'select' || this.type === 'boolean' || this.type === 'date') {
          this.$_VueXeditable_stopEditing() // Needed because no events can be associated with select / option?...
        }
        if (this.type === 'boolean') {
          newValue = !this.rawValue
        }
        if (this.$_VueXeditable_hasValueChanged(newValue) || this.type === 'select') {
          this.$emit('value-will-change', this.rawValue, this.name)

          if (this.$_VueXeditable_hasRemoteUpdate) {
            if (this.$_VueXeditable_hasValidRemote) {
              this.$_VueXeditable_sendRemoteUpdate(newValue)
                .then(() => {
                  this.$emit('value-did-change', newValue, this.name)
                })
                .catch((error) => {
                  this.$emit('value-remote-update-error', newValue, error, this.name)
                })
            } else {
              this.$emit('value-remote-error', 'Invalid Remote Update configuration.')
            }
          } else {
            this.$_VueXeditable_makeLocalUpdate(newValue)
            this.$emit('value-did-change', newValue, this.name)
          }
        }
      },
      $_VueXeditable_hasValueChanged (newValue) {
        return newValue !== this.rawValue
      },
      $_VueXeditable_makeLocalUpdate (newValue) {
        this.rawValue = newValue
      },
      $_VueXeditable_sendRemoteUpdate (newValue) {
        let updateValue = null
        if (this.type === 'number') {
          updateValue = parseFloat(newValue)
        } else if (this.type === 'select') {
          updateValue = (Array.isArray(newValue)) ? newValue[0] : newValue
        } else {
          updateValue = newValue.toString()
        }

        let payload = {}
        if (this.remote.resource && this.remote.resource.length) {
          let subpayload = {}
          subpayload[this.remote.key] = updateValue
          payload[this.remote.resource] = subpayload
        } else {
          payload[this.remote.key] = updateValue
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
              resolve(newValue, response)
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

<style>
  .vue-xeditable {
    color: #222;
    line-height: 2.0em;
  }

  .vue-xeditable.enabled {
    cursor: pointer;
  }

  .vue-xeditable:hover {
    color: #666;
  }

  .vue-xeditable-value {
    white-space: pre-wrap;
    user-select: none;
  }

  .vue-xeditable-empty {
    color: #ea0002;
    font-style: italic;
  }

  .vue-xeditable-control {
    width: auto;
    display: inline-block;
  }

  .vue-xeditable-form-control {
    padding: 5px;
    box-sizing: content-box;
    color: #555;
    background-color: #fff;
    background-image: none;
    outline: none;
  }
</style>
