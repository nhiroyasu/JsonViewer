<template>
  <div class="my-3 root-container text-center">
    <div class="container">
      <div class="row justify-content-center align-items-center py-3">
        <div class="form-group col-6 col-md-4">
          <label for="input-form-select">入力形式を選択</label>
          <select class="custom-select" id="input-form-select" v-model="select_value">
            <option value="FILE">FILE</option>
            <!-- <option>URL</option> -->
            <option value="INPUT">INPUT</option>
          </select>
        </div>
        <form-input-container
          v-if="select_value === 'FILE'"
          class="col-12 col-md-4"
          @reset="on_reset"
        />
        <!-- <form-url-container v-else-if="select_value === 'URL'" class="col-12 col-md-4" @reset="on_reset" /> -->
        <form-textarea-container
          v-else-if="select_value === 'INPUT'"
          class="col-12 col-md-4"
          @reset="on_reset"
        />
      </div>
    </div>
    <hr class="mx-5" />
    <div class="mt-3 px-5" v-if="json_data !== null && is_loaded" style="display:inline-block">
      <array-container v-if="Array.isArray(json_data)" :array="json_data" />
      <object-container v-else :object="json_data" />
    </div>
    <loading v-else-if="is_loading" />
    <div v-else>NO DATA</div>
  </div>
</template>

<script>
// import ArrayContainer from "~/components/json_array.vue";
// import ObjectContainer from "~/components/json_object.vue";
import FormInputContainer from '~/components/form_input_container.vue'
import FormTextareaContainer from '~/components/form_textarea_container.vue'
import FormUrlContainer from '~/components/form_url_container.vue'
import Loading from '~/components/loading.vue'

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
      }
    }
  },
  methods: {
    on_reset() {
      this.$store.commit('json_data/updateData', null)
    }
  }
}
</script>

<style lang="scss">
/* font-family: 'M PLUS Rounded 1c', sans-serif; */
@import url('https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:700&display=swap');
/* font-family: 'Noto Sans JP', sans-serif; */
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP:400&display=swap');

:root {
  --app-theme-red: #ff7f6e;
  --app-theme-blue: #7ac5ff;
  --app-theme-green: #a1ff8a;
  --app-theme-yellow: #ffd849;
  --app-theme-purple: #c977ff;

  --app-font-serif: 'Noto Sans JP', sans-serif;
  --app-font-rounded: 'M PLUS Rounded 1c', sans-serif;
}

.root-container {
  color: #2d3436;
  font-size: 1rem;
  overflow: scroll;
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
</style>
