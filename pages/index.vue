<template>
  <div class="container my-5 root-container text-center">
    <div class="form-group form-for-json">
      <label class="py-1 px-3" for="input-for-json">JSONファイルを選択</label>
      <input
        type="file"
        class="form-control-file"
        accept=".json"
        name="json"
        id="input-for-json"
        aria-describedby="fileHelpId"
        style="display:none"
        @change="on_changed_data($event)"
      />
      <small id="fileHelpId" class="form-text text-muted">JSONファイルを選択</small>
    </div>
    <hr />

    <div v-if="json_data !== null" style="display:inline-block">
      <array-container v-if="json_is_array" :array="json_data" />
      <object-container v-else :object="json_data" />
    </div>
  </div>
</template>

<script>
// import ArrayContainer from "~/components/json_array.vue";
// import ObjectContainer from "~/components/json_object.vue";

export default {
  components: {
    // ArrayContainer,
    // ObjectContainer,
  },
  data() {
    return {
      json_data: null,
      json_is_array: false
    }
  },
  methods: {
    on_changed_data(event) {
      this.json_data = null // reset
      let files = event.target.files
      let reader = new FileReader()
      reader.onload = e => {
        this.text_to_json(e.target.result)
      }
      reader.readAsText(files[0])
    },
    text_to_json(text) {
      this.set_json_data(JSON.parse(text))
    },
    set_json_data(json) {
      console.log(json)
      this.json_data = json
      this.json_is_array = Array.isArray(this.json_data)
    }
  },
  computed: {}
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

.form-for-json {
  label {
    background-color: #0fbcf9;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 1.2rem;
    color: white;
    border-radius: 20px;
    transition: all 0.3s ease-out;

    &:hover {
      box-shadow: rgba(15, 186, 249, 0.699) 0px 0px 10px;
    }
  }
}
</style>
