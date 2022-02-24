<template>
  <div class="bottom_">
    <div class="bottom_up">
      <span><i class="iconfont icon-kuaidi"></i>价格亲民</span>
      <span><i class="iconfont icon-dianzan"></i>物流快捷</span>
      <span><i class="iconfont icon-kuaidiyunshu"></i>品质新鲜</span>
    </div>
    <BottomLogin></BottomLogin>
  </div>
</template>

<script>
import BottomLogin from "../views/login/BottomLogin.vue"
export default {
  components:{
    BottomLogin
  }
};
</script>
<style lang="scss" scoped>
.bottom_ {
  height: 350px;
  background-color: #333;
  padding: 0 140px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  > .bottom_up {
    width: 100%;
    height: 180px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #434343;
    .iconfont {
      font-size: 32px;
      margin-right: 8px;
      border: 3px solid #ccc;
      border-radius: 50%;
      padding: 10px;
    }
    > span {
      flex: 1;
      color: white;
      font-size: 28px;
      line-height: 1;
      text-align: center;
    }
  }
}
</style>