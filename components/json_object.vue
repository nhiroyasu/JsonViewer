<template>
  <div class="object-container">
    <div v-for="(k, index) in keys" :key="index">
      <key-container :key_data="k" />
      <div v-if="Array.isArray(object[k])">
        <array-container :array="object[k]" />
        <!-- <div v-for="(item, index) in object[k]" :key="index">
          <div v-if="Array.isArray(item)">
            <object-container :array="item" />
          </div>
          <div v-else-if="typeof item === 'object'">
            <object-container :object="item" />
          </div>
          <div v-else>
            <value-container :value_data="item" />
          </div>
        </div> -->
      </div>
      <div v-else-if="typeof object[k] === 'object'">
        <object-container :object="object[k]" />
      </div>
      <div v-else>
        <value-container :value_data="object[k]" />
      </div>
    </div>
  </div>
</template>

<script>
import KeyContainer from '~/components/json_key.vue'
import ValueContainer from '~/components/json_value.vue'
import ArrayContainer from '~/components/json_array.vue'
// import ObjectContainer from '~/components/json_object.vue'

export default {
  name: 'object-container',
  components: {
    KeyContainer,
    ValueContainer,
    ArrayContainer,
    // ObjectContainer
  },
  props: {
    object: Object
  },
  data() {
    return {
      keys: []
    }
  },
  created() {
    this.keys = Object.keys(this.object)
  }
}
</script>

<style lang="scss"></style>
