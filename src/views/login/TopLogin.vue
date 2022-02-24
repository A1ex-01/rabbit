<template>
  <div class="top">
    <img src="../../assets/img/logo.png" alt="" />
    <div class="welcome">
      <span>欢迎登录</span>
    </div>
    <div class="enter">
      <span @click="goHome">进入网站首页</span>
      <i class="el-icon-d-arrow-right"></i>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    goHome() {
      this.$router.push("/home");
    }
  }
};
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 132px;
  display: flex;
  padding: 0px 140px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  img {
    width: 200px;
    margin-bottom: 12px;
  }
  .welcome {
    font-size: 24px;
    flex: 1;
    padding-top: 30px;
    padding-left: 20px;
    color: #666;
  }
  .enter {
    font-size: 16px;
    color: #333;
    margin-top: 30px;
    margin-right: 10px;
    display: flex;
    > .el-icon {
      color: #27ba9b;
      margin-top: 2px;
      margin-left: 5px;
    }
  }
}
</style>