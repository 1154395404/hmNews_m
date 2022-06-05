import Vue from 'vue'
import Vuex from 'vuex'
import Tool from '../utils/tool'

Vue.use(Vuex)
const TOKEN_KEY = 'HEIMA_USER_KEY'
export default new Vuex.Store({
  state: {
    userToken: Tool.getItem(TOKEN_KEY)

  },
  mutations: {
    setUserToken (state, data) {
      state.userToken = data
      Tool.setItem(TOKEN_KEY, data)
    }
  },
  actions: {},
  modules: {}
})
