import Vue from 'vue'
import Editable from './Editable.vue'
new Vue({
  el: '#app',
  components: {
    'editable': Editable
  },
  data: {
    first: 'Do not go gentle into that good night',
    second: "Do not go gentle into that good night, \n\Old age should burn and rave at close of day; \n\Rage, rage against the dying of the light.",
    third: 1,
    forth: 1,
    options: [['Gold', 1], ['Silver', 2], ['Bronze', 3]],
    fifth: 'Do not go <strong style="color: rgb(230, 0, 0);"><em>gentle</em></strong> into that good night'
  }
})
