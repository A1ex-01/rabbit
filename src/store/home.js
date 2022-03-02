import { getCartCount } from "../api/cart"
export default {
  namespaced: true,
  state: {
    cartNum: null
  },
  mutations: {
    getNum(state, payload) {
      state.cartNum = payload
    }
  },
  actions: {
    async getProductionCount({commit}) {
      const { data } = await getCartCount();
      commit("getNum",data.result.count)
    }
  }
}