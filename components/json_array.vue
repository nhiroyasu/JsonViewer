<template>
  <div class="array-container">
    <div v-for="(item, index) in array" :key="index">
      <div v-if="Array.isArray(item)">
        <!-- <array-container :array="item" /> -->
      </div>
      <div v-else-if="(typeof item) === 'object'">
        <object-container :object="item" />
      </div>
      <div v-else>
        <value-container :value_data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import ValueContainer from "~/components/json_value.vue";
// import ArrayContainer from "~/components/json_array.vue";
// import ObjectContainer from "~/components/json_object.vue";

export default {
  name: "array-container",
  components: {
    ValueContainer,
    // ArrayContainer
    // ObjectContainer,
  },
  props: {
    array: Array
  },
  data() {
    return {
      values: []
    }
  },
  created () {
    
  },
}
</script>

<style lang="scss">

</style>