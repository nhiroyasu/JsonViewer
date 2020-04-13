<template>
  <div class="form-group" @submit="on_submit">
    <div class="row justify-content-around">
      <label class="col-12 text-left" for="input-for-url">URLを入力</label>
      <input
        v-model="url"
        type="url"
        name="input-for-url"
        id="input-for-url"
        class="col-md-8 form-control"
        placeholder="URL"
        aria-describedby="helpId"
        @keyup.enter="on_submit"
      />
      <!-- <small id="helpId" class="text-muted">JSONのみ対応</small> -->
      <input type="submit" class="input-enter col-3 rounded" value="ENTER" >
    </div>
  </div>
</template>

<script>
import request from '~/plugins/request_data.js'

export default {
  data() {
    return {
      url: ''
    }
  },
  created () {
  },
  methods: {
    async on_submit() {
      this.$emit('reset')
      const data = await request.request_data(this.url)
      console.log(data);
    },
  },
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
  transition: all 0.3s ease-out;

  &:hover {
    box-shadow: 0px 0px 10px #0fbaf950;
  }
}
</style>