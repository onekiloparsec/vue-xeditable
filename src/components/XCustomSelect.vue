<template class="custom-select">
  <select
    :value="value"
    @change="onChange($event.target.value)"
    ref="$_VueXeditable_Select"
  >
    <option
      v-for="option in options"
      :key="option"
      :value="option"
      :selected="isSelected(option)"
      ref="options"
    >
      {{ option }}
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
      onChange (newSelection) {
        this.$emit('input', newSelection) // MUST be called 'input'
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
