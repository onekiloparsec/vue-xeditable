# vue-xeditable

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/onekiloparsec/vue-xeditable/master/LICENSE)


Even better editable element in Vue. Original code from https://kar-wai-wong.github.io

# Use Setup

install @onekiloparsec/vue-xeditable

```
npm install @onekiloparsec/vue-xeditable --save
```

## Vue mount

```
import { XEditable } from '@onekiloparsec/vue-xeditable'

new Vue({
  el: '#app',
  components: {
    'vue-xeditable': vue-xeditable
  }
})
```

# Support Types

**text**, **textarea**, **number**, **date**, **select**

In particular, a lot of work has been done to make the select widget work perfectly. It handles
null values, has a correctly selected value, and can respond to escape key to end editing.
