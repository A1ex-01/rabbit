<template>
  <div class="top">
    <span v-if="userInfo" @click="goMember"
      ><el-icon><user /></el-icon><i class="iconfont icon-user"></i>{{ userInfo.nickname }}</span
    >
    <span v-else @click="goLogin">请先登录</span>
    <span v-if="userInfo" @click="exitAcciunt">退出登录</span>
    <span v-else>免费注册</span>
    <span @click="goOrder">我的订单</span>
    <span>会员中心</span>
    <span>帮助中心</span>
    <span>关于我们</span>
    <span
      ><i class="iconfont icon-shouji"></i>手机版</span
    >
  </div>
</template>
<script>
import { Message } from 'element-ui';
import { delCookie, getCookie } from "../../utils/cookie";
export default {
  data() {
    return {
      userInfo:null
    };
  },
  computed: {
  },
  mounted() {
    if (getCookie("token")) {
      this.userInfo = JSON.parse(getCookie("info"))
    }else{
      Message({
        message:"获取用户信息失败",
        type:"success"
      })
    }
  },
  methods: {
    goMember(){
      this.$router.push("/member");
    },
    goLogin() {
      this.$router.push("/login");
    },
    goOrder(){
      this.$router.push({path:"/member/order"})
    },
    exitAcciunt() {
      delCookie("token");
      delCookie("info");
      this.$router.push({path:"/login"});
    },
  },
};
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 53px;
  padding: 0 140px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  background-color: #333;
  align-items: center;
  > span {
    font-size: 14px;
    border-right: 1px solid #f5f5f5;
    padding: 0 15px;
    height: 14px;
    color: #cdcdcd;
    line-height: 14px;
    &:last-child {
      border: 0;
    }
    &:hover {
      color: #27ba9b;
    }
  }
}
.el-icon {
  margin-right: 5px;
  font-size: 14px;
  vertical-align: top;
}
</style>