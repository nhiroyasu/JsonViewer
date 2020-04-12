<template>
  <div class="value-container px-md-3 px-2 py-1 d-inline-flex">
    <a v-if="is_url(value_data)" :href="value_data" target="_blank">{{ value_data }}</a>
    <span v-else-if="value_data === true" style="color: orange; font-weight:bold;">{{ value_data }}</span>
    <span v-else-if="value_data === false" style="color: blue; font-weight:bold;">{{ value_data }}</span>
    <span v-else-if="(typeof value_data) === 'number'" style="color: darkblue">{{ value_data }}</span>
    <span v-else-if="value_data === null" style="color: red; font-weight:bold;">{{ "NULL" }}</span>
    <span v-else>{{ value_data }}</span>
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
}
</style>