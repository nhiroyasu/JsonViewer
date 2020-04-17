<template>
  <div v-if="show_sidebar" class="form-group form-for-json col-12 p-0 text-center">
    <label class="py-2 px-2 my-2 rounded my-button" for="input-for-json">JSONファイルを選択</label>
    <input
      type="file"
      class="form-control-file m-0"
      accept=".json"
      name="json"
      id="input-for-json"
      aria-describedby="fileHelpId"
      style="display:none"
      @change="on_changed_data($event)"
    />
    <!-- <small id="fileHelpId" class="form-text text-muted">JSONファイルを選択</small> -->
  </div>
  <div v-else class="form-icon">
    <button class=""><i class="far fa-file-alt"></i></button>
  </div>
</template>

<script>
import JsonManager from '~/plugins/json_manager.js'

export default {
  props: {
    show_sidebar: Boolean,
  },
  methods: {
    on_changed_data(event) {
      this.$emit('reset')
      let files = event.target.files
      let reader = new FileReader()
      reader.onload = e => {
        const text = e.target.result
        const data = JsonManager.text_to_json(text)
        if (data != null) {
          this.$store.commit('json_data/updateData', data)
        } else {
          alert('JSONデータの形式が正しくありません')
        }
      }
      reader.readAsText(files[0])
    }
  }
}
</script>

<style lang="scss">
.form-for-json {
  label {
    background-color: #0fbcf9;
    font-family: var(--app-font-rounded);
    font-size: 1rem;
    color: white;
    cursor: pointer;
  }
}

.form-icon {
  padding: 0px;
  button {
    border: solid 0px white;
    width: 100%;
    color: var(--my-cyan);
    font-size: 1.2rem;
    line-height: 1.5rem;
    padding: 10px 0px;
    transition-duration: 0.3s;
    &:hover {
      background-color: #9be4ff;
    }
  }
}
</style>