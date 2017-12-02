<template class="custom-select">
  <select
    :value="value"
    @change="onChange($event.target.value)"
    ref="$_VueXeditable_Select"
  >
    <option
      v-for="option in options"
      :key="(isKeyFirst) ? option[0] : option[1]"
      :value="(isKeyFirst) ? option[0] : option[1]"
      :selected="isSelected(option)"
      ref="options"
    >
      {{ (isKeyFirst) ? option[1] : option[0] }}
    </option>
  </select>
</template>

<script>
  export default {
    template: '#custom-select',
    props: ['value', 'options', 'isKeyFirst'],
    mounted () {
      this.$refs.$_VueXeditable_Select.addEventListener('keydown', this.onKeyDown, false)
    },
    beforeDestroy () {
      this.$refs.$_VueXeditable_Select.removeEventListener('keydown', this.onKeyDown, false)
    },
    methods: {
      onChange (keyValue) {
        let opt = this.options.find(o => {
          let optKey = (this.isKeyFirst) ? o[0] : o[1]
          return optKey.toString() === keyValue
        })
        this.$emit('input', opt) // MUST be called 'input'
      },
      isSelected (option) {
        return option === this.value
      },
      onKeyDown (e) {
        this.$emit('keydown', e)
      }
    }
  }
</script>
