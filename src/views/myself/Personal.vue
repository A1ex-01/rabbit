<template>
  <div class="per">
    <div class="personInfo">
      <div class="info_left" v-if="userInfo">
        <img :src="userInfo.avatar" alt="" />
        <span>{{ userInfo.nickname }}</span>
      </div>
      <div class="info_right">
        <div class="info_right_item">
          <i class="iconfont icon-diamond"></i>
          <span>会员中心</span>
        </div>
        <div class="info_right_item">
          <i class="iconfont icon-shezhi"></i>
          <span>安全设置</span>
        </div>
        <div class="info_right_item" @click="$router.push({path:'/member/addr'})">
          <i class="iconfont icon-position"></i>
          <span>地址管理</span>
        </div>
      </div>
    </div>
    <div class="collectTab">
      <MyCollect></MyCollect>
    </div>
    <div class="history">
      <MyHistory></MyHistory>
    </div>
    <div class="likeProduct">
      <ProductLike></ProductLike>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductLike from "../product/ProductLike.vue";
import MyCollect from "./MyCollect.vue";
import MyHistory from "./MyHistory.vue";
export default {
  computed: {
    ...mapState({
      userInfo: (state) => state.login.info,
    }),
  },
  mounted() {
    this.changeIndex("0_0");
  },
  inject:["changeIndex"],
  methods: {},
  components: {
    ProductLike,
    MyCollect,
    MyHistory,
  },
};
</script>
<style lang="scss" scoped>
.per {
  width: 100%;
  display: flex;
  flex-direction: column;
  > .personInfo {
    height: 132px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    background-image: url("../../assets/img/personalBg.png");
    > .info_left {
      width: 260px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      > img {
        width: 85px;
        height: 85px;
        border-radius: 50%;
        margin: 0 20px;
      }
      > span {
        font-size: 18px;
        color: white;
      }
    }
    .info_right {
      width: 500px;
      display: flex;
      .info_right_item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        > .iconfont {
          font-size: 28px;
          margin-bottom: 16px;
        }
      }
    }
  }
  > .collectTab {
    width: 100%;
    background-color: white;
    margin: 20px 0;
  }
  > .history {
    width: 100%;
    background-color: white;
    margin: 20px 0;
  }
  > .likeProduct {
    width: 1000px;
  }
}
</style>