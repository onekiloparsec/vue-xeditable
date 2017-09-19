# vue-xeditable
Better editable element in Vue

# Example
[DEMO PAGE](https://kar-wai-wong.github.io/vue-xeditable/)

# Use Setup

install vue-editable
```
npm install vue-xeditable --save
```

## Vue mount
```
import Editable from './Editable.vue'

new Vue({
  el: '#app',
  components: {
    'editable': Editable
  }
})


<editable value.sync='Do not go gentle into that good night'></editable>

```

# Support Types
**text**, **textarea**, **number**, **text**, **quill(rich text editor)**
