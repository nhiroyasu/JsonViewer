<template>
  <div class="key-container px-2 py-1 d-inline-flex">
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
  max-width: 120px;
  border: 3px solid var(--app-theme-green);
  background-color: var(--app-theme-green);
  border-radius: 5px;
  font-family: var(--app-font-rounded);
  line-height: 1rem;
  overflow: scroll;
  word-break: keep-all;
}
</style>