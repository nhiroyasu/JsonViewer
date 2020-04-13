<template>
  <div class="d-inline-block" @click.right.prevent.stop="switch_display">
    <div
      v-show="is_show"
      class="array-container"
      :class="{ 'visibility-hidden': !is_show_for_anim, 'visibility-show': is_show_for_anim }"
    >
      <div class="px-3 pt-4 pb-2 d-flex flex-column align-items-start">
        <div class="array-badge badge">array</div>
        <div class="array-hidden-icon mr-2 p-1" @click="switch_display">
          <i class="fas fa-times"></i>
        </div>
        <div v-for="(item, index) in array" :key="index">
          <array-container v-if="Array.isArray(item)" class="my-1" :array="item" />
          <object-container
            v-else-if="(typeof item) === 'object' && item !== null"
            class="my-1"
            :object="item"
          />
          <value-container v-else class="my-md-1" :value_data="item" />
        </div>
      </div>
    </div>
    <div v-show="!is_show" class="zip-array py-1 px-3 rounded" @click="switch_display">
      <i class="fas fa-ellipsis-h"></i>
    </div>
  </div>
</template>

<script>
import ValueContainer from '~/components/json_value.vue'
// import ArrayContainer from "~/components/json_array.vue";
// import ObjectContainer from "~/components/json_object.vue";

export default {
  name: 'array-container',
  components: {
    ValueContainer
    // ArrayContainer
    // ObjectContainer,
  },
  props: {
    array: Array
  },
  data() {
    return {
      is_show: true,
      is_show_for_anim: true
    }
  },
  created() {},
  methods: {
    switch_display() {
      if (this.is_show) {
        setTimeout(() => {
          this.is_show = !this.is_show
        }, 300)
      } else {
        this.is_show = !this.is_show
      }
      this.is_show_for_anim = !this.is_show_for_anim
    }
  }
}
</script>

<style lang="scss">
.array-container {
  position: relative;
  border: 5px solid var(--app-theme-red);
  border-radius: 15px;

  .array-badge {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 0px 5px 3px 5px;
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    border-radius: 0px 0px 5px 0px;
    background-color: var(--app-theme-red);
  }

  .array-hidden-icon {
    position: absolute;
    top: 0px;
    right: 0px;
    color: var(--app-theme-red);
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease-out;

    &:hover {
      transform: scale(130%);
    }
  }
}
.zip-array {
  color: var(--app-theme-red);
  background-color: rgb(236, 236, 236);
  font-size: 1.2rem;
  cursor: pointer;
  animation: fade_in 0.3s ease-out forwards;
  -webkit-animation: fade_in 0.3s ease-out forwards;
}
@keyframes fade_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>