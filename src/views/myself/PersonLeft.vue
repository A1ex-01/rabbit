<template>
  <div class="left">
    <div class="account" v-for="(item, index) in leftNavList" :key="index">
      <h2>{{ item.title }}</h2>
      <span
        v-for="(v, i) in item.children"
        :key="i"
        @click="itemclick(index, i)"
        :class="{ checked: active === `${index}_${i}` }"
        >{{ v }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftNavList: [
        {
          title: "我的账户",
          children: [
            "个人中心",
            "消息通知",
            "个人信息",
            "安全设置",
            "地址管理",
            "我的积分",
            "我的足迹",
            "邀请有礼",
            "幸运抽奖",
          ],
        },
        {
          title: "交易管理",
          children: ["我的订单", "优惠券", "礼品卡", "评论晒单", "售后服务"],
        },
        {
          title: "我的收藏",
          children: ["收藏的商品", "收藏的专题", "关注的品牌"],
        },
        {
          title: "帮助中心",
          children: ["帮助中心", "在线客服"],
        },
      ],
      active: "0_0",
    };
  },
  computed: {},
  methods: {
    itemclick(index, i) {
      this.active = `${index}_${i}`;
      if (this.active == "0_0") {
        this.$router.push("/member/personal");
      }
      if (this.active == "1_0") {
        this.$router.push("/member/order");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/reset.scss";
.left {
  width: 100%;
  .account {
    padding: 0 52px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #f5f5f5;
    .checked {
      color: $base-color;
    }
    &:last-child {
      border: 0;
    }
    > h2 {
      width: 100%;
      font-size: 18px;
      color: #333;
      height: 50px;
      line-height: 50px;
    }
    > span {
      width: 100%;
      height: 45px;
      font-size: 14px;
      color: #666;
      line-height: 45px;
    }
  }
}
</style>