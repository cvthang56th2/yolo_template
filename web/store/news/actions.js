export default {
  setItem ({ commit }, data) {
    commit('SET_ITEM', data)
  },
  getItem ({ commit }, { _id, params }) {
    try {
      const data = {}
      commit('SET_ITEM', data)
    } catch (error) {
      throw new Error(error)
    }
  }
}
