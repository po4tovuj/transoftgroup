export const state = () => ({
  error: false,
})

export const getters = {
  getCounter(state) {
    return state.counter
  },
}

export const mutations = {
  increment(state, data) {
    state.error = data
  },
}

export const actions = {
  setError({ commit }, data) {
    // make request
    commit('increment', data)
  },
}
