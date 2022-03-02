<template>
  <div class="likes">
    <div class="top">
      <span
        ><i class="iconfont icon-lingxing" style="color: #bcf1e6"></i
        ><i class="iconfont icon-xiangyou" style="color: #27ba9b"></i
        >同类商品推荐</span
      >
    </div>
    <div class="bottom">
      <span @click="left"><i class="iconfont icon-xiangyou"></i></span>
      <div class="container">
        <div class="move" :style="{transform:`translateX(${-(scrollPage-1) * 1070}px)`}">
          <div class="item" v-for="item in likesList" :key="item.id" @click="goProduct(item.id)">
            <img :src="item.picture" alt="" />
            <p style="color:#666">{{ item.name }}</p>
            <p style="text-align:center;margin:10px 0;">￥{{ item.price }}</p>
          </div>
        </div>
      </div>
      <span @click="right"><i class="iconfont icon-xiangyou"></i></span>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { getGoodrelevant } from "../../api/good";
export default {
  data() {
    return {
      likesList: null,
      scrollPage: 1,
    };
  },
  mounted() {
    this.getRelevant();
  },
  methods: {
    async getRelevant() {
      const { data } = await getGoodrelevant();
      if (data.msg === "操作成功") {
        this.likesList = data.result;
      } else {
        Message({
          message: "获取同类喜欢失败",
          type: "error",
        });
      }
    },
    goProduct(id){
      this.$router.push({path:"/product/"+id});
    },
    left() {
      this.scrollPage = this.scrollPage == 1 ? this.scrollPage : this.scrollPage - 1;
    },
    right() {
      this.scrollPage = this.scrollPage == 4 ? this.scrollPage : this.scrollPage + 1;
    },
  },
};
</script>
<style lang="scss" scoped>
.likes {
  width: 100%;
  height: 400px;
  margin: 20px 0;
  background-color: white;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .top {
    height: 80px;
    > span {
      line-height: 80px;
      font-size: 20px;
      color: #333;
      > .iconfont {
        font-size: 20px;
      }
      > .icon-xiangyou {
        margin-left: -11px;
        font-weight: bold;
      }
    }
  }
  .bottom {
    flex: 1;
    display: flex;
    > span {
      width: 75px;
      height: 100%;
      color: #666;
      text-align: center;
      line-height: 315px;
      &:first-child {
        transform: rotate(180deg);
      }
      > .iconfont {
        font-size: 30px;
        color: #999;
      }
    }
    .container {
      flex: 1;
      display: flex;
      overflow: hidden;
      .move{
        display: flex;
        transition: all .5s;
      .item {
        width: 240px;
        height: 290px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-right: 30px;
        transition: all 0.5s;
        p {
          width: 200px;
          font-size: 16px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          &:last-child {
            color: #cf4444;
          }
        }
        > img {
          width: 190px;
          height: 190px;
          padding: 20px;
        }
      }
      }
    }
  }
}
</style>