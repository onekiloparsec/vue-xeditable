<template class="custom-select">
  <select
    @change="$emit('input', $event.target.value)"
    ref="$_VueXeditable_Select"
  >
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="internalOptionValue(option)"
      :selected="isSelected(option)"
      ref="options"
    >
      {{ displayedOptionValue(option) }}
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
      displayedOptionValue (option) {
        if (Array.isArray(option)) {
          return option[option.length - 1]
        } else {
          return option
        }
      },
      internalOptionValue (option) {
        if (Array.isArray(option)) {
          return option[0]
        } else {
          return option
        }
      },
      isSelected (option) {
        return this.internalOptionValue(option) === this.value
      },
      onKeyDown (e) {
        this.$emit('keydown', e)
      }
    }
  }
</script>
