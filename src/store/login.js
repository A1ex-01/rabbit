import { setCookie } from "../utils/cookie"
import router from "../router/index"
import { Message } from "element-ui"
import getUserInfo from "../api/login"
export default {
    namespaced: true,
    state: {
        info: null
    },
    mutations: {
        getUserInfo(state, payload) {
            state.info = payload
        }
    },
    actions: {
        async sendInfoToIndex({ commit }, payload) {
            const res = await getUserInfo(payload)
            if (res.data.msg == "操作成功") {
                commit("getUserInfo", res.data.result);
                Message({
                    message: '登录成功',
                    type: 'success',
                })
                setCookie("token", "Bearer "+res.data.result.token, 7)
                setCookie("info", JSON.stringify(res.data.result), 7)
                router.push("/home")
            } else {
                Message({
                    message: '登陆失败',
                    type: 'error',
                })
            }
        }
    }
}