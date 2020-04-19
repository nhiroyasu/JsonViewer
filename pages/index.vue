<template>
  <div class="root-container container m-0">
    <div class="row" style="width: 100vw; overflow:hidden;">
      <div
        class="col-12 bg-light main-container main-cotntainer-scroll"
        :class="{ 'col-md-3 col-xl-2 py-3': show_sidebar, 'col-md-1 p-0': !show_sidebar }"
      >
        <div
          class="switch-forms col-12 p-0 my-3 flex-fill d-none d-md-block"
          :class="{ 'd-none': !show_sidebar}"
        >
          <button class="my-button" @click="on_switch_sidebar">
            <i class="fas fa-times"></i>
            <!-- <i v-else class="fas fa-chevron-right"></i> -->
          </button>
        </div>
        <form-input-container
          class="col-md-12"
          :show_sidebar="show_sidebar"
          @reset="on_reset"
          @click-icon="on_switch_sidebar"
        />
        <form-url-container
          class="col-md-12"
          :show_sidebar="show_sidebar"
          @reset="on_reset"
          @click-icon="on_switch_sidebar"
        />
        <form-textarea-container
          class="col-md-12 d-none d-md-block"
          :show_sidebar="show_sidebar"
          @reset="on_reset"
          @click-icon="on_switch_sidebar"
        />
      </div>

      <div
        class="p-3 main-container main-cotntainer-scroll"
        :class="{ 'col-md-11': !show_sidebar, 'col-md-9 col-xl-10': show_sidebar }"
        v-if="json_data !== null && is_loaded"
      >
        <array-container v-if="Array.isArray(json_data)" :array="json_data" />
        <object-container v-else :object="json_data" />
      </div>
      <div
        class="d-flex align-items-center justify-content-center"
        :class="{ 'col-md-11': !show_sidebar, 'col-md-9': show_sidebar }"
        v-else-if="is_loading"
      >
        <loading class="" />
      </div>
      <div
        class="d-flex align-items-center justify-content-center"
        :class="{ 'col-md-11': !show_sidebar, 'col-md-9': show_sidebar }"
        v-else
      >
        <div class="col-12 text-center">
          <img class src="/icon.png" alt="#" width="300" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ArrayContainer from "~/components/json_array.vue";
// import ObjectContainer from "~/components/json_object.vue";
import FormInputContainer from '~/components/form_input_container.vue'
import FormTextareaContainer from '~/components/form_textarea_container.vue'
import FormUrlContainer from '~/components/form_url_container.vue'
import Loading from '~/components/loading.vue'

import axios from 'axios'

export default {
  components: {
    // ArrayContainer,
    // ObjectContainer,
    FormInputContainer,
    FormTextareaContainer,
    FormUrlContainer,
    Loading
  },
  data() {
    return {
      is_loading: false,
      is_loaded: false,
      show_sidebar: true,
      select_value: 'ファイル'
    }
  },
  created() {
    this.select_value = 'FILE'
  },
  updated() {
    this.$nextTick(function() {
      // ビュー全体が再レンダリングされた後にのみ実行されるコード
      console.log('update', this.$store.state.json_data.data !== null)
    })
  },
  async asyncData({ params }) {},
  computed: {
    json_data() {
      return this.$store.state.json_data.data
    }
  },
  watch: {
    json_data(newValue, oldValue) {
      if (newValue !== null) {
        this.is_loading = true
        setTimeout(() => {
          this.is_loaded = true
        }, 500)
      } else {
        this.is_loaded = false
      }
    }
  },
  methods: {
    on_reset() {
      this.$store.commit('json_data/updateData', null)
    },
    on_switch_sidebar() {
      this.show_sidebar = !this.show_sidebar
    }
  }
}
</script>

<style lang="scss">
/* font-family: 'M PLUS Rounded 1c', sans-serif; */
@import url('https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:700&display=swap');
/* font-family: 'Noto Sans JP', sans-serif; */
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP:400&display=swap');

$tab: 768px; // タブレット
$sp: 544px; // スマホ

@mixin tab {
  @media (max-width: ($tab)) {
    @content;
  }
}
@mixin sp {
  @media (max-width: ($sp)) {
    @content;
  }
}

:root {
  --app-theme-red: #ff7f6e;
  --app-theme-blue: #7ac5ff;
  --app-theme-green: #a1ff8a;
  --app-theme-yellow: #ffd849;
  --app-theme-purple: #c977ff;
  --my-cyan: #0fbcf9;

  --app-font-serif: 'Noto Sans JP', sans-serif;
  --app-font-rounded: 'M PLUS Rounded 1c', sans-serif;
}

.root-container {
  color: #2d3436;
  font-size: 1rem;
}

.switch-forms {
  position: relative;

  button {
    background-color: #0fbcf9;
    height: 40px;
    width: 40px;
    color: white;
    border: solid 0px white;
    border-radius: 20px;
  }
}

.main-container {
  height: 100vh;
  @include tab {
    height: auto;
  }
}
.main-cotntainer-scroll {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.threshold {
  width: 5px;
  background-color: #2d3436;
  border-radius: 2.5px;
}

// animations
.visibility-hidden {
  transform-origin: top left;
  animation: frame_out 300ms ease-out 0s normal forwards;
}
@keyframes frame_out {
  0% {
    transform: scaleX(100%) scaleY(100%);
  }
  100% {
    transform: scaleX(0%) scaleY(0%);
  }
}
.visibility-show {
  transform-origin: top left;
  animation-name: frame_in;
  animation-delay: 0s;
  animation-duration: 300ms;
  animation-fill-mode: forwards;
  animation: frame_in 300ms ease-out 0s 1 normal forwards;
}
@keyframes frame_in {
  0% {
    transform: scaleX(0%) scaleY(0%);
  }
  100% {
    transform: scaleX(100%) scaleY(100%);
  }
}

.my-button {
  box-shadow: 0px 1px 3px grey;
  transition-duration: 0.3s;
  &:hover {
    box-shadow: 0px 3px 5px grey;
  }
}
</style>
