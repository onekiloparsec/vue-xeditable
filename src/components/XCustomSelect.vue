<template class="custom-select">
  <select
    :value="value"
    @change="onChange($event.target.value)"
    ref="$_VueXeditable_Select"
  >
    <option
      v-for="option in options"
      :key="option[1]"
      :value="option[1]"
      :selected="isSelected(option)"
      ref="options"
    >
      {{option[0]}}
    </option>
  </select>
</template>

<script>
  export default {
    template: '#custom-select',
    props: ['value', 'options'],
    mounted () {
      this.$refs.$_VueXeditable_Select.addEventListener('keydown', this.onKeyDown, false)
    },
    beforeDestroy () {
      this.$refs.$_VueXeditable_Select.removeEventListener('keydown', this.onKeyDown, false)
    },
    methods: {
      onChange (value) {
        let opt = this.options.find(o => {
          return o[1].toString() === value
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
