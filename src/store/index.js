import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
    // user: JSON.parse(window.localStorage.getItem('user'))
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 此数据不持久化,需结合本地存储
      setItem(USER_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
