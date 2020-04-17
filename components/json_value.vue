<template>
  <div class="value-container px-md-3 px-2 py-1 d-inline-flex">
    <!-- Type is Url -->
    <a v-if="is_url(value_data)" :href="value_data" target="_blank">{{ value_data }}</a>
    <!-- Type is Boolean -->
    <span v-else-if="value_data === true" style="color: deeppink">{{ value_data }}<span class="data-type boolean-true">Boolean</span></span>
    <span v-else-if="value_data === false" style="color: deeppink">{{ value_data }}<span class="data-type boolean-false">Boolean</span></span>
    <!-- Type is Number -->
    <span v-else-if="(typeof value_data) === 'number'" style="color:#FF6500; font-style: italic">{{ value_data }}<span class="data-type number">Number</span></span>
    <!-- Type is null -->
    <span v-else-if="value_data === null" style="color: red; font-weight:bold;">{{ "NULL" }}</span>
    <!-- Type is String -->
    <span v-else style="color: #57A257">"{{ value_data }}"<span class="data-type string">String</span></span>
  </div>
</template>

<script>
export default {
  props: ['value_data'],
  methods: {
    is_url(text) {
      if ((typeof text) === 'string') {
        const pattern = /^http[s]?:\/\/*/g
        if (text.match(pattern) === null) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }
}
</script>

<style lang="scss">
.value-container {
  // border-left: 2px solid var(--app-theme-blue);
  // border-right: 2px solid var(--app-theme-blue);
  font-family: var(--app-font-serif);
  // border-radius: 10px;
  border-bottom: 3px solid var(--app-theme-blue);
  text-align: left;

  span.data-type {
    background-color: #f0f0f0;
    font-family: var(--app-font-rounded);
    display: inline-block;
    padding: 0px 0.5rem;
    margin-left: 1rem;
    border-radius: 0.2rem;
    transition: all 0.3s ease-out;
    transform: scale(100%);

    &.boolean-true {
      color:deeppink;
      font-weight:bold;
    }
    &.boolean-false {
      color:deeppink;
      font-weight:bold;
    }
    &.number {
      color:#FF6500;
      font-style: normal;
    }
    &.string {
      color:#57A257;
    }
  }
}
</style>