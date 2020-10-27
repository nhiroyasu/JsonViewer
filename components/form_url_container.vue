<template>
  <div v-if="show_sidebar" class="form-group p-0">
    <label class="col-12 text-left" for="input-for-url">URLを入力</label>
    <input
      v-model="url"
      type="url"
      name="input-for-url"
      id="input-for-url"
      class="form-control"
      placeholder="URL"
      aria-describedby="helpId"
      @keyup.enter="on_submit"
    />
    <!-- <small id="helpId" class="text-muted">JSONのみ対応</small> -->
    <input
      type="submit"
      class="input-enter my-button my-1 rounded"
      value="ENTER"
      @click="on_submit"
    />
  </div>
  <div v-else class="form-icon">
    <button @click="$emit('click-icon')">
      <i class="fas fa-link"></i>
    </button>
  </div>
</template>

<script>
import request from '~/plugins/request_data.js'

export default {
  data() {
    return {
      url: 'https://qiita.com/api/v2/items?page=1&per_page=5'
    }
  },
  props: {
    show_sidebar: Boolean
  },
  created() {},
  methods: {
    async on_submit() {
      this.$emit('reset')
      const res = await request.request_data(this.url)
      if (res !== null) {
        const data = res.data 
        this.$store.commit('json_data/updateData', data)
      } else {
        alert('ネットワークエラー')
      }
    }
  }
}
</script>

<style lang="scss">
.input-enter {
  font-family: var(--app-font-rounded);
  font-weight: bold;
}
</style>

<style lang="scss" scoped>
.input-enter {
  background-color: #0fbcf9;
  border: 0px solid white;
  color: white;
}
</style>
