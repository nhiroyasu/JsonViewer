export const state = () => ({
  data: null
})

export const getters = {
  data: state => {
    return state.data
  }
}

export const mutations = {
  updateData: (state, payload) => {
    state.data = payload
  }
}