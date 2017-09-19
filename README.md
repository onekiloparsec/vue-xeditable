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

## Editable with Request
```
<editable value='resource_title' url='resource_url' attr='title' resource='resource_name' method='PUT'></editable>
```
if you finish a edit,you will send a request like:
```
Request URL:[resource_url]
Request Method:PUT

--------
Request Payload
resource:
    title: 'your edit'

```

# Support Types
**text**, **textarea**, **number**, **text**, **quill(rich text editor)**
