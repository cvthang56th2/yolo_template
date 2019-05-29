import Vuex from 'vuex'
import root from './root'
import news from './news'

const createStore = () => {
  return new Vuex.Store({
    state: root.state,
    getters: root.getters,
    mutations: root.mutations,
    actions: root.actions,
    modules: {
      [news.name]: news
    }
  })
}

export default createStore
