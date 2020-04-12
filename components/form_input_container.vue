<template>
  <div class="form-group form-for-json">
    <label class="py-1 px-3 rounded" for="input-for-json">JSONファイルを選択</label>
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
    <!-- <small id="fileHelpId" class="form-text text-muted">JSONファイルを選択</small> -->
  </div>
</template>

<script>
import JsonManager from '~/plugins/json_manager.js'

export default {
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
    font-size: 1.2rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease-out;

    &:hover {
      box-shadow: 0px 0px 10px #0fbaf950;
    }
  }
}
</style>