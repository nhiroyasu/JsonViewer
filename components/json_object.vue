<template>
  <div class="d-inline-block" @click.right.prevent.stop="switch_display">
    <div
      v-show="is_show"
      class="object-container"
      :class="{ 'visibility-hidden': !is_show_for_anim, 'visibility-show': is_show_for_anim }"
    >
      <div class="px-3 pt-4 pb-2 d-flex flex-column">
        <div class="object-badge badge">object</div>
        <div class="object-hidden-icon mr-2 p-1" @click="switch_display">
          <i class="fas fa-times"></i>
        </div>
        <div class="my-1 d-flex flex-row align-items-start" v-for="(k, index) in keys" :key="index">
          <key-container :key_data="k" />
          <array-container v-if="Array.isArray(object[k])" class="mx-2" :array="object[k]" />
          <object-container
            v-else-if="typeof object[k] === 'object'"
            class="mx-2"
            :object="object[k]"
          />
          <value-container v-else class="ml-2" :value_data="object[k]" />
        </div>
      </div>
    </div>
    <div v-show="!is_show" class="zip-object py-1 px-3 rounded" @click="switch_display">
      <i class="fas fa-ellipsis-h"></i>
    </div>
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
      is_show: true,
      is_show_for_anim: true,
      keys: [],
      render_obj: {}
    }
  },
  created() {
    this.keys = Object.keys(this.object)
  },
  
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
    },
    render() {
      const self = this
      self.list = []
      const list = this.keys
      const ite = (function*() {
        // NOTE: 100アイテムづつsetTimeoutでレンダリング
        while (true) {
          const items = list.splice(0, 100) // Get items 100 by 100
          if (items.length <= 0) break
          yield setTimeout(() => {
            for (let len = items.length, i = 0; i < len; i++) {
              const item = items[i]
              self.list.push(item)
            }
            ite.next()
          })
        }
      })()
      ite.next()
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
    cursor: pointer;
    transition: all 0.3s ease-out;

    &:hover {
      transform: scale(130%);
    }
  }
}

.zip-object {
  color: var(--app-theme-yellow);
  background-color: rgb(236, 236, 236);
  font-size: 1.2rem;
  cursor: pointer;
  animation: fade_in 0.3s ease-out forwards;
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