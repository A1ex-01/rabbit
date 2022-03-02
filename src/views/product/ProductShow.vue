<template>
  <div class="show">
    <div class="left">
      <div class="left_top" v-if="goodDetail">
        <img :src="goodDetail.mainPictures[0]" alt="" />
        <div class="minimg">
          <img
            :src="item"
            alt=""
            v-for="(item, index) in goodDetail.mainPictures"
            :key="index"
            :class="{ border: imgIndex == index }"
            @click="imgchecked(index)"
          />
        </div>
      </div>
      <div class="left_down">
        <div>
          <span>销量人气</span>
          <span>200+</span>
          <span
            ><i class="iconfont icon-qizi" style="color: #27ba9b"></i
            >销售人气</span
          >
        </div>
        <div>
          <span>商品评价</span>
          <span>400+</span>
          <span
            ><i class="iconfont icon-pinglun1" style="color: #27ba9b"></i
            >查看评价</span
          >
        </div>
        <div>
          <span>收藏人气</span>
          <span>200+</span>
          <span
            ><i class="iconfont icon-shoucang" style="color: #27ba9b"></i
            >收藏商品</span
          >
        </div>
        <div>
          <span>品牌信息</span>
          <span>苏宁电器</span>
          <span
            ><i
              class="iconfont icon-pinpaitemai-tianchong"
              style="color: #27ba9b"
            ></i
            >品牌主页</span
          >
        </div>
      </div>
    </div>
    <div class="right" v-if="goodDetail">
      <span>{{ goodDetail.name }}</span>
      <span>{{ goodDetail.desc }}</span>
      <span
        >￥{{ goodDetail.price }} <del>￥{{ goodDetail.oldPrice }}</del></span
      >
      <div class="goodssale">
        <div>
          <span>促销</span>
          <span>12月好物放送，App领券购买直降120元</span>
        </div>
        <div>
          <span>配送</span>
          <span>至北京</span>
        </div>
        <div>
          <span>服务</span>

          <ul>
            <li>无忧退货</li>
            <li>快速退款</li>
            <li>免费包邮</li>
          </ul>
        </div>
      </div>
      <div class="type" v-for="(item, index) in goodDetail.specs" :key="index">
        <span>{{ item.name }}</span>
        <div class="imgs" v-for="(i, v) in item.values" :key="v">
          <img
            :src="i.picture"
            alt=""
            v-if="i.picture"
            :class="{ border: type_1 == v }"
            @click="type_1 = v"
          />
        </div>
        <div class="size" v-for="(a, b) in item.values" :key="'_' + b">
          <span
            v-if="!a.picture"
            :class="{ border: type_2 == b }"
            @click="type_2 = b"
            >{{ a.name }}</span
          >
        </div>
      </div>
      <div class="count">
        <span>数量</span>
        <span @click="count == 0 ? 0 : count--">-</span>
        <span>{{ count }}</span>
        <span @click="count++">+</span>
      </div>
      <span @click="addCart">加入购物车</span>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { goAddCart } from "../../api/cart";
export default {
  props: ["goodDetail"],
  data() {
    return {
      imgIndex: 0,
      type_1: -1,
      type_2: -1,
      count: 1,
    };
  },
  methods: {
    addCart() {
      this.getSkusId();
    },
    async getSkusId() {
      var first, second;
      if (this.type_1 != -1 && this.type_2 != -1) {
        first = this.goodDetail.specs[0].values[this.type_1].name;
        second = this.goodDetail.specs[1].values[this.type_2].name;
      }
      if (this.type_1 != -1 && this.type_2 == -1) {
        first = this.goodDetail.specs[0].values[this.type_1].name;
      }
      if (this.type_2 != -1 && this.type_1 == -1) {
        second = this.goodDetail.specs[0].values[this.type_2].name;
      }
      const data = this.goodDetail.skus.filter((item) => {
        if (this.type_1 != -1 && this.type_2 != -1) {
          return (
            item.specs[0].valueName == first &&
            item.specs[1].valueName == second
          );
        } else {
          return (
            item.specs[0].valueName == first ||
            item.specs[0].valueName == second
          );
        }
      });
      const res = await goAddCart({ skuId: data[0].id, count: this.count });
      if (res.data.msg === "操作成功") {
        Message({
          message: "添加成功",
          type: "success",
        });
        this.$store.dispatch("home/getProductionCount");
      }
    },
    imgchecked(i) {
      this.imgIndex = i;
    },
  },
};
</script>
<style lang="scss" scoped>
.show {
  width: 100%;
  height: 600px;
  display: flex;
  background-color: white;
  .right {
    flex: 1;
    padding: 30px 0;
    padding-right: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .count {
      height: 30px;
      width: 100%;
      display: flex;
      margin: 20px 0;
      span {
        color: #999;
        display: block;
        font-size: 16px;
        line-height: 28px;
        text-align: center;
        &:nth-child(1) {
          margin-left: 12px;
          margin-right: 15px;
        }
        &:nth-child(2n) {
          width: 28px;
          height: 28px;
          border: 1px solid #e4e4e4;
          background-color: #f5f5f5;
        }
        &:nth-child(3) {
          border: 1px solid #e4e4e4;
          width: 50px;
        }
      }
    }
    .type {
      height: 65px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .size {
        display: flex;
        flex-shrink: 0;
        flex-wrap: wrap;
        > span {
          flex-shrink: 0;
          border: 1px solid #f5f5f5;
          padding: 4px 16px;
        }
      }
      > .checked {
        display: none;
      }
      span {
        font-size: 14px;
        color: #999;
        margin-right: 15px;
        padding-left: 12px;
      }
      > .imgs {
        > img {
          width: 48px;
          height: 48px;
          border: 1px solid #e4e4e4;
          margin-right: 12px;
        }
      }
    }
    .goodssale {
      width: 480px;
      margin: 12px 0;
      height: 130px;
      padding-left: 8px;
      background-color: #f5f5f5;
      display: flex;
      flex-direction: column;
      > div {
        flex: 1;
        line-height: 42px;
        &:last-child {
          display: flex;
          > ul {
            display: flex;
            li {
              margin-left: 15px;
              color: #666;
              font-size: 14px;
              position: relative;
              &::after {
                content: "";
                display: block;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: #27ba9b;
                position: absolute;
                left: -10px;
                top: 20px;
              }
            }
          }
        }
        > span {
          color: #999;
          margin-right: 12px;
          &:nth-child(2) {
            color: #666;
            font-size: 15px;
          }
        }
      }
    }
    > span {
      font-size: 22px;
      color: #333;
      &:nth-child(2) {
        color: #999;
        font-size: 14px;
        margin: 15px 0;
      }
      &:nth-child(3) {
        color: #cf4444;
        > del {
          font-size: 16px;
          color: #999;
          margin-left: 5px;
        }
      }
      &:last-child {
        width: 180px;
        color: white;
        height: 48px;
        background-color: #27ba9b;
        text-align: center;
        line-height: 48px;
        border-radius: 3px;
        font-size: 16px;
      }
    }
  }
  .left {
    width: 580px;
    height: 600px;
    display: flex;
    flex-direction: column;
    padding: 30px 50px;
    box-sizing: border-box;
    .left_top {
      width: 100%;
      height: 400px;
      display: flex;
      > img {
        width: 400px;
        height: 100%;
      }
      .minimg {
        flex: 1;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        > img {
          width: 68px;
          height: 68px;
        }
      }
    }
    .left_down {
      flex: 1;
      display: flex;
      align-items: center;
      > div {
        width: 100px;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        position: relative;
        &::after {
          position: absolute;
          right: 0;
          top: 10px;
          content: "";
          width: 1px;
          height: 60px;
          border-left: 1px solid #e4e4e4;
        }
        &:nth-child(4)::after {
          display: none;
        }
        > span {
          font-size: 14px;
          color: #999;
          &:nth-child(2) {
            color: #cf4444;
          }
          &:nth-child(3) {
            color: #666;
          }
        }
      }
    }
  }
}
.border {
  border: 1px solid #27ba9b !important;
}
</style>