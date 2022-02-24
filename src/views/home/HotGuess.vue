<template>
  <div class="hot">
    <!-- <div class="top">
      <div class="left">
        <span>人气推荐</span>
        <span>人气爆款&nbsp;&nbsp;不容错过</span>
      </div>
      <div class="right">查看全部<i class="el-icon-arrow-right"></i></div>
    </div> -->
    <HotGuess>
      <template #left>
        <span>人气推荐</span>
        <span>人气爆款&nbsp;&nbsp;不容错过</span>
      </template>
      <template #right> 查看全部<i class="el-icon-arrow-right"></i> </template>
    </HotGuess>
    <div class="goods">
      <div class="goodsitem" v-for="item in hotList" :key="item.id">
        <img :src="item.picture" alt="" />
        <p>{{ item.title }}</p>
        <p>{{ item.alt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { getHotList } from "../../api/home.js";
import HotGuess from "../../components/HotTop.vue";
export default {
  data() {
    return {
      hotList: null,
    };
  },
  mounted() {
    this.getHot();
  },
  computed: {},
  methods: {
    async getHot() {
      const { data } = await getHotList();
      if (data.msg === "操作成功") {
        this.hotList = data.result;
      } else {
        Message({
          message: "获取新鲜好物列表失败",
          type: "error",
        });
      }
    },
  },
  components: {
    HotGuess,
  },
};
</script>
<style lang="scss" scoped>
.hot {
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
      background-color: #fff;
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
        text-align: center;
        &:last-child {
          color: #999;
          font-size: 18px;
          padding-bottom: 20px;
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