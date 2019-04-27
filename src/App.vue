<template>
  <div id="app">
    <h1>@arcsecond-io/vue-xeditable</h1>
    <h3>Better editable element in Vue 2.x, made for <a href="https://www.arcsecond.io">www.arcsecond.io</a></h3>

    <div class='content'>

      <div class="node">
        <h4>Single piece of text (default: type = text)</h4>
        <pre v-pre>&lt;vue-xeditable :value.sync='{{textValue}}'&gt;&lt;/vue-xeditable&gt;</pre>
        <vue-xeditable
          type="text"
          name="textEvents"
          :value.sync='textValue'
          :enable-editing="true"
          @start-editing="sendStartEditingEvent"
          @stop-editing="sendStopEditingEvent"
          @value-will-change="sendValueWillChangeEvent"
          @value-did-change="sendValueDidChangeEvent"
        />

        <div class="events-banner" v-show="textEvents.length > 0">
          <div
            class="events-banner-event"
            v-for="event in textEvents"
            :key="event.index"
          >
            <span class="prefix">Event {{event.index}}:</span>
            <span class="content">{{event.message}}</span>
            <span class="value">'{{event.value}}'</span>
          </div>
        </div>
      </div>

      <div class="node">
        <h4>Single piece of text but disabled</h4>
        <pre v-pre>&lt;vue-xeditable :value.sync='{{textValueDisabled}}'&gt;&lt;/vue-xeditable&gt;</pre>
        <vue-xeditable
          type="text"
          name="textEvents"
          :value.sync='textValueDisabled'
          :enable-editing="false"
        />
      </div>

      <div class="node">
        <h4>Single piece of text with doubleClick</h4>
        <pre v-pre>&lt;vue-xeditable :value.sync='{{doubeTextValue}}'&gt;&lt;/vue-xeditable&gt;</pre>
        <vue-xeditable
          type="text"
          name="doubletTextEvents"
          :value.sync='doubeTextValue'
          :edit-on-double-click="true"
          @start-editing="sendStartEditingEvent"
          @stop-editing="sendStopEditingEvent"
          @value-will-change="sendValueWillChangeEvent"
          @value-did-change="sendValueDidChangeEvent"
        />

        <div class="events-banner" v-show="doubletTextEvents.length > 0">
          <div
            class="events-banner-event"
            v-for="event in doubletTextEvents"
            :key="event.index"
          >
            <span class="prefix">Event {{event.index}}:</span>
            <span class="content">{{event.message}}</span>
            <span class="value">'{{event.value}}'</span>
          </div>
        </div>

        <!-- -->

        <!--<h4>Single piece of text with null value, showing empty</h4>-->
        <!--<pre v-pre>&lt;vue-xeditable :value.sync='{{nullValue}}' empty='Custom Empty Text'&gt;&lt;/vue-xeditable&gt;</pre>-->
        <!--<vue-xeditable type="text" :value='nullValue' empty="Custom Empty Text"></vue-xeditable>-->

        <!--<h4>Mutiple lines text area</h4>-->
        <!--<pre-->
        <!--v-pre>&lt;vue-xeditable type='textarea' :value.sync='{{textareaValue}}' type='textarea'></vue-xeditable></pre>-->
        <!--<vue-xeditable :value.sync="textareaValue" type='textarea'></vue-xeditable>-->

        <!--<h4>Editable number (integers, floats)</h4>-->
        <!--<pre v-pre>&lt;editable type='number' value={{numberValue}}&gt;&lt;/editable&gt;</pre>-->
        <!--<vue-xeditable type='number' :value.sync='numberValue'></vue-xeditable>-->

      </div>

      <div class="node">
        <h4>Number</h4>
        <pre v-pre>&lt;vue-xeditable :value.sync='{{numberValue}}'&gt;&lt;/vue-xeditable&gt;</pre>
        <vue-xeditable
          type="number"
          name="numberEvents"
          :value.sync='numberValue'
          @start-editing="sendStartEditingEvent"
          @stop-editing="sendStopEditingEvent"
          @value-will-change="sendValueWillChangeEvent"
          @value-did-change="sendValueDidChangeEvent"
        />

        <div class="events-banner" v-show="numberEvents.length > 0">
          <div
            class="events-banner-event"
            v-for="event in numberEvents"
            :key="event.index"
          >
            <span class="prefix">Event {{event.index}}:</span>
            <span class="content">{{event.message}}</span>
            <span class="value">'{{event.value}}'</span>
          </div>
        </div>
      </div>

      <div class="node">
        <h4>Select</h4>
        <pre>options = {{JSON.stringify(selectOptions)}}</pre>
        <pre
          v-pre>&lt;vue-xeditable type='select' value={{selectValue}} :options='options'&gt;&lt;/vue-xeditable&gt;</pre>
        <vue-xeditable
          type='select'
          name="selectEvents"
          :value='selectValue'
          :options='selectOptions'
          @start-editing="sendStartEditingEvent"
          @stop-editing="sendStopEditingEvent"
          @value-will-change="sendValueWillChangeEvent"
          @value-did-change="sendValueDidChangeEvent"
        />

        <div class="events-banner" v-show="selectEvents.length > 0">
          <div
            class="events-banner-event"
            v-for="event in selectEvents"
            :key="event.index"
          >
            <span class="prefix">Event {{event.index}}:</span>
            <span class="content">{{event.message}}</span>
            <span class="value">'{{event.value}}'</span>
          </div>
        </div>
      </div>

      <div class="node">
        <h4>Boolean</h4>
        <pre v-pre>&lt;vue-xeditable :value.sync='{{booleanValue}}'&gt;&lt;/vue-xeditable&gt;</pre>
        <vue-xeditable
          type="boolean"
          name="booleanEvents"
          :value.sync='booleanValue'
          @start-editing="sendStartEditingEvent"
          @stop-editing="sendStopEditingEvent"
          @value-will-change="sendValueWillChangeEvent"
          @value-did-change="sendValueDidChangeEvent"
        />

        <div class="events-banner" v-show="booleanEvents.length > 0">
          <div
            class="events-banner-event"
            v-for="event in booleanEvents"
            :key="event.index"
          >
            <span class="prefix">Event {{event.index}}:</span>
            <span class="content">{{event.message}}</span>
            <span class="value">'{{event.value}}'</span>
          </div>
        </div>
      </div>

      <div class="node">
        <h4>Select "NullBoolean"</h4>
        <pre>options = {{JSON.stringify(selectOptionsWithNull)}}</pre>
        <pre v-pre>&lt;vue-xeditable type='select' value={{selectValueWithNull}} :options='options'&gt;&lt;/vue-xeditable&gt;</pre>
        <vue-xeditable
          type='select'
          name="selectWithNullEvents"
          :value='selectValueWithNull'
          :options='selectOptionsWithNull'
          empty="Unknown"
          @start-editing="sendStartEditingEvent"
          @stop-editing="sendStopEditingEvent"
          @value-will-change="sendValueWillChangeEvent"
          @value-did-change="sendValueDidChangeEvent"
        />

        <div class="events-banner" v-show="selectWithNullEvents.length > 0">
          <div
            class="events-banner-event"
            v-for="event in selectWithNullEvents"
            :key="event.index"
          >
            <span class="prefix">Event {{event.index}}:</span>
            <span class="content">{{event.message}}</span>
            <span class="value">'{{event.value}}'</span>
          </div>
        </div>
      </div>

      <div class="node">
        <h4>Date</h4>
        <pre v-pre>&lt;vue-xeditable :value.sync='{{dateValue}}'&gt;&lt;/vue-xeditable&gt;</pre>
        <vue-xeditable
          type="date"
          name="dateEvents"
          :value.sync='dateValue'
          @start-editing="sendStartEditingEvent"
          @stop-editing="sendStopEditingEvent"
          @value-will-change="sendValueWillChangeEvent"
          @value-did-change="sendValueDidChangeEvent"
        />

        <div class="events-banner" v-show="dateEvents.length > 0">
          <div
            class="events-banner-event"
            v-for="event in dateEvents"
            :key="event.index"
          >
            <span class="prefix">Event {{event.index}}:</span>
            <span class="content">{{event.message}}</span>
            <span class="value">'{{event.value}}'</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import VueXeditable from './components/XEditable.vue'

  export default {
    name: 'app',
    components: {
      VueXeditable
    },
    data () {
      return {
        display: false,
        nullValue: null,
        textValue: 'This is an editable text.',
        doubeTextValue: 'This is also an editable text with double click',
        textareaValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        numberValue: 1,
        selectValue: 'Silver',
        selectOptions: ['Gold', 'Silver', 'Bronze'],
        selectValueWithNull: null,
        selectOptionsWithNull: [[null, 'Unknown'], true, false],
        booleanValue: false,
        dateValue: new Date(),
        eventsCount: 0,
        textEvents: [],
        numberEvents: [],
        booleanEvents: [],
        doubletTextEvents: [],
        selectEvents: [],
        selectWithNullEvents: [],
        dateEvents: []
      }
    },
    methods: {
      sendStartEditingEvent (value, name) {
        this.pushEditingEvent('start-editing', value, name)
      },
      sendStopEditingEvent (value, name) {
        this.pushEditingEvent('stop-editing', value, name)
      },
      sendValueWillChangeEvent (value, name) {
        this.pushEditingEvent('value-will-change', value, name)
      },
      sendValueDidChangeEvent (value, name) {
        this.pushEditingEvent('value-did-change', value, name)
      },
      pushEditingEvent (event, value, name) {
        this.eventsCount += 1
        this[name].push({ index: this.eventsCount, message: event, value: value })
        setTimeout(() => {
          this.events.shift()
        }, 60000)
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 90%;
    padding: 15px 25px;
    margin: 60px auto;
    position: relative;
    display: block;
  }

  .node {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
    padding: 10px;
    margin: 40px;
  }

  .events-banner {
    padding: 5px;
    font-size: small;
    display: block;
  }

  .events-banner .prefix {
    color: #858585;
  }

  .events-banner .content {
    font-weight: bold;
    color: #273080;
  }

  .events-banner .value {
    color: #3a5831;
    font-size: larger;
  }

  .events-banner-event {
    background-color: #f9f9f9;
    margin: 2px;
    padding: 10px;
    display: inline-block;
    clear: left;
    width: auto;
  }

  .vue-xeditable-value {
    cursor: pointer;
    color: #17c;
    border-bottom: 1px dashed #07c;
    line-height: 22px;
  }

  h1 {
    margin: 0;
    text-align: center;
    color: #42b983;
  }

  h4 {
    margin-bottom: 0;
    color: #404040;
  }

  a {
    color: #07c;
  }

  pre code {
    margin: 0;
    padding: 0;
    white-space: pre;
    border: none;
    background: transparent;
  }

  .highlight pre {
    background-color: #f8f8f8;
    border: 1px solid #cccccc;
    font-size: 13px;
    line-height: 19px;
    overflow: auto;
    padding: 6px 10px;
    border-radius: 3px;
  }

  pre {
    background-color: #f8f8f8;
    border: 1px solid #cccccc;
    font-size: 13px;
    line-height: 19px;
    overflow: auto;
    padding: 6px 10px;
    border-radius: 3px;
  }

  pre code, pre tt {
    background-color: transparent;
    border: none;
  }
</style>
