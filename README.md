# vue-xeditable
[![](https://badge.juejin.im/entry/59c08ef5f265da065d2b6821/likes.svg?style=flat-square)](https://juejin.im/post/59c08ed2f265da06611f67c4)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/Kar-Wai-Wong/vue-xeditable/master/LICENSE)


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
