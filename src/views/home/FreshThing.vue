<template>
  <div class="fresh">
    <!-- <div class="top">
      <div class="left">
        <span>新鲜好物</span>
        <span>新鲜出炉&nbsp;&nbsp;品质靠谱</span>
      </div>
      <div class="right">查看全部<i class="el-icon-arrow-right"></i></div>
    </div> -->
    <HotTop>
      <template #left>
        <span>新鲜好物</span>
        <span>新鲜出炉&nbsp;&nbsp;品质靠谱</span></template
      >
      <template #right> 查看全部<i class="el-icon-arrow-right"></i> </template>
    </HotTop>
    <div class="goods">
      <div class="goodsitem" v-for="item in freshShow" :key="item.id">
        <img :src="item.picture" alt="" />
        <p>{{ item.name }}</p>
        <p>￥{{ item.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { getFreshThiing } from "../../api/home.js";
import HotTop from "../../components/HotTop.vue";
export default {
  data() {
    return {
      freshList: null,
    };
  },
  mounted() {
    this.getFresh();
  },
  computed: {
    freshShow() {
      if (this.freshList) {
        return this.freshList.filter((item, index) => index < 4);
      } else {
        return null;
      }
    },
  },
  methods: {
    async getFresh() {
      const { data } = await getFreshThiing();
      if (data.msg === "操作成功") {
        this.freshList = data.result.newProduct;
      } else {
        Message({
          message: "获取新鲜好物列表失败",
          type: "error",
        });
      }
    },
  },
  components: {
    HotTop,
  },
};
</script>
<style lang="scss" scoped>
.fresh {
  width: 100%;
  padding: 0 140px;
  box-sizing: border-box;
  .goods {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    > .goodsitem {
      width: 306px;
      height: 406px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #f0f9f4;
      align-items: center;
      > img {
        width: 306px;
        height: 306px;
      }
      p {
        width: 250px;
        font-size: 22px;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:last-child {
          color: #cf4444;
          padding-bottom: 20px;
          text-align: center;
        }
      }
      &:hover {
        transform: translate3d(0, -3px, 0);
        transition: all 0.5s;
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }
    }
  }
  // .top {
  //   width: 100%;
  //   height: 115px;
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   span {
  //     font-size: 32px;
  //     color: #333;
  //     margin-right: 10px;
  //     &:last-child {
  //       font-size: 16px;
  //       color: #999;
  //     }
  //   }
  // }
  .right {
    font-size: 16px;
    color: #999;
  }
}
</style>