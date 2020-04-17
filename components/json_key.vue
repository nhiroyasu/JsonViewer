<template>
  <div class="key-container d-inline-flex">
    <i class="fas fa-key pr-1"></i>
    {{ key_data }}
  </div>
</template>

<script>
export default {
  props: [
    'key_data'
  ],
}
</script>

<style lang="scss">
.key-container {
  position: relative;
  padding: 8px 10px;
  min-width: 60px;
  max-width: 150px;
  border: 3px solid var(--app-theme-green);
  background-color: var(--app-theme-green);
  border-radius: 5px;
  font-family: var(--app-font-rounded);
  line-height: 1rem;
  overflow: scroll;
  word-break: keep-all;
}
</style>