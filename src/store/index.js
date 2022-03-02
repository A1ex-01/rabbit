import Vue from 'vue'
import Vuex from 'vuex'
import login from "./login.js"
import home from "./home"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    home
  }
})
