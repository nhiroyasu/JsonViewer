<template>
  <div v-if="is_show" class="object-container px-3 pt-4 pb-2 d-flex flex-column">
    <div class="object-badge badge">object</div>
    <div class="object-hidden-icon mr-2 p-1" @click="on_clicked_icon">
      <i class="fas fa-times"></i>
    </div>
    <div class="my-md-1 d-flex flex-row align-items-start" v-for="(k, index) in keys" :key="index">
      <key-container :key_data="k" />
      <array-container v-if="Array.isArray(object[k])" class="mx-2" :array="object[k]" />
      <object-container v-else-if="typeof object[k] === 'object'" class="mx-2" :object="object[k]" />
      <value-container v-else class="ml-2" :value_data="object[k]" />
    </div>
  </div>
  <div v-else class="hidden-object py-1 px-3 rounded" @click="on_clicked_icon">
    <i class="fas fa-ellipsis-h"></i>
  </div>
</template>

<script>
import KeyContainer from '~/components/json_key.vue'
import ValueContainer from '~/components/json_value.vue'
// import ArrayContainer from '~/components/json_array.vue'
// import ObjectContainer from '~/components/json_object.vue'

export default {
  name: 'object-container',
  components: {
    KeyContainer,
    ValueContainer
    // ArrayContainer,
    // ObjectContainer
  },
  props: {
    object: Object
  },
  data() {
    return {
      is_show: true
    }
  },
  created() {
    this.keys = Object.keys(this.object)
  },
  methods: {
    on_clicked_icon() {
      this.is_show = !this.is_show
    }
  }
}
</script>

<style lang="scss">
.object-container {
  position: relative;
  border: 5px solid var(--app-theme-yellow);
  border-radius: 15px;
  min-width: 300px;
  overflow: scroll;

  .object-badge {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 0px 5px 3px 5px;
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    border-radius: 0px 0px 5px 0px;
    background-color: var(--app-theme-yellow);
  }

  .object-hidden-icon {
    position: absolute;
    top: 0px;
    right: 0px;
    color: var(--app-theme-yellow);
    font-size: 1.2rem;
    transition: all 0.3s ease-out;

    &:hover {
      transform: scale(130%);
    }
  }
}

.hidden-object {
  color: var(--app-theme-yellow);
  background-color: rgb(236, 236, 236);
  font-size: 1.2rem;
}
</style>