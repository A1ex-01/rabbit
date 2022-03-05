<template>
  <div class="goodcart">
    <div class="goods">
      <div class="title">
        <label for=""
          ><input
            type="checkbox"
            v-model="allchoose"
            @click.prevent="changeAll"
          />全选</label
        >
        <span>商品信息</span>
        <span>单价</span>
        <span>数量</span>
        <span>小计</span>
        <span>操作</span>
      </div>
      <div class="content">
        <div class="item" v-for="(item, index) in cartList" :key="index">
          <div class="input">
            <input
              type="checkbox"
              :checked="item.selected"
              @click.prevent="evenChoose(item)"
            />
          </div>
          <div class="goodsInfo">
            <img :src="item.picture" alt="" />
            <div class="goodRight">
              <span>{{ item.name }}</span>
              <span
                >{{ item.attrsText
                }}<i
                  class="el-icon-arrow-down"
                  @click="showSkuId(item.skuId, index)"
                ></i
              ></span>
              <div class="catemask" v-if="maskActive == index">
                <div
                  class="maskitem"
                  v-for="(item, index) in maskContent.specs"
                  :key="index"
                >
                  <span>{{ item.name }}</span>
                  <div class="isImg" v-if="item.values[0].picture">
                    <img
                      :src="v.picture"
                      alt=""
                      v-for="(v, i) in item.values"
                      :key="i"
                      :class="{ checked: type_1 == i }"
                      @click="type_1 = i"
                    />
                  </div>
                  <div class="noImg" v-if="!item.values[0].picture">
                    <span
                      v-for="(v, i) in item.values"
                      :key="i"
                      :class="{ checked: type_2 == i }"
                      @click="type_2 = i"
                      >{{ v.name }}</span
                    >
                  </div>
                </div>
                <span class="confirm" @click="confirm(item)">确认</span>
              </div>
            </div>
          </div>
          <span class="price">￥{{ item.price }}</span>
          <div class="count">
            <span @click="subNum(item)">-</span>
            <span>{{ item.count }}</span>
            <span @click="addNum(item)">+</span>
          </div>
          <span class="allprice">￥{{ item.price * item.count }}</span>
          <div class="set">
            <span>移入收藏夹</span>
            <span @click="deleteGood(item)">删除</span>
            <span>找相似</span>
          </div>
        </div>
      </div>
    </div>
    <div class="choose">
      <div class="sleft">
        <label for=""
          ><input
            type="checkbox"
            v-model="allchoose"
            @click.prevent="changeAll"
          />全选</label
        >
        <el-popconfirm
          title="你确定要删除所选商品吗？"
          trigger="click"
          @confirm="deleteCheckedGood"
        >
          <span slot="reference">删除商品</span>
        </el-popconfirm>
        <span>移入收藏夹</span>
        <span>清空失效商品</span>
      </div>
      <div class="sright">
        <span class="info"
          >共{{ count }}件商品，已选择{{ checkedCount }}件，商品合计：<strong
            style="color: #cf4444; font-weight: bold"
            >￥{{ total }}</strong
          ></span
        >
        <span class="pay" @click="goCheckout">下单结算</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { goAddCart, deleteGoodBySkuId } from "../../api/cart";
import {
  getCartList,
  allChooseBtn,
  modifyGoods,
  getTypeBySkuId,
} from "../../api/cart";
export default {
  data() {
    return {
      cartList: null,
      allchoose: false,
      maskActive: -1,
      maskContent: null,
      type_1: -1,
      type_2: -1,
    };
  },
  computed: {
    count() {
      let count = 0;
      if (this.cartList) {
        count = this.cartList.reduce((total, curr) => {
          return total + curr.count;
        }, 0);
      }
      return count;
    },
    checkedCount() {
      let count = 0;
      if (this.cartList) {
        count = this.cartList.reduce((total, curr) => {
          if (curr.selected) {
            return total + curr.count;
          } else {
            return total;
          }
        }, 0);
      }
      return count;
    },
    total() {
      let price = 0;
      if (this.cartList) {
        price = this.cartList.reduce((total, curr) => {
          if (curr.selected) {
            return total + curr.price * curr.count;
          } else {
            return total;
          }
        }, 0);
      }
      return price.toFixed(2);
    },
  },
  mounted() {
    this.getList();
    window.addEventListener("click", (e) => {
      if (this.maskActive != -1) {
        if (
          e.target.parentElement.className != "isImg" &&
          e.target.parentElement.className != "goodRight" &&
          e.target.parentElement.className != "maskitem" &&
          e.target.className != "maskitem"
        ) {
          this.maskActive = -1;
        }
      }
    });
  },
  methods: {
    goCheckout(){
      localStorage.setItem("curmb",JSON.stringify({level1:"购物车",level2:"填写订单",level3:""}))
      this.$router.push({path:"/checkout"})
    },
    async deleteCheckedGood() {
      let list = this.cartList.filter((item) => item.selected);
      const arr = list.map((item) => item.skuId);
      console.log(arr);
      await deleteGoodBySkuId({ ids: arr });
      Message({
        message: "删除成功",
        type: "success",
      });
      this.getList();
    },
    async confirm(item) {
      this.maskActive = -1;
      var one = null;
      var two = null;
      var result = "";
      if (this.maskContent.specs[0].values[0].picture) {
        one = this.maskContent.specs[0].values[this.type_1];
        if (this.maskContent.specs[1]) {
          two = this.maskContent.specs[1].values[this.type_2];
        }
      }
      // console.log(one, two);
      if (two) {
        result = this.maskContent.skus.filter(
          (item) =>
            item.specs[0].valueName == one.name &&
            item.specs[1].valueName == two.name
        );
      } else {
        result = this.maskContent.skus.filter(
          (item) => item.specs[0].valueName == one.name
        );
      }
      console.log(item);
      await deleteGoodBySkuId({ ids: [item.skuId] });
      await goAddCart({ skuId: result[0].id, count: item.count });
      this.getList();
    },
    async getList() {
      const { data } = await getCartList();
      if (data.msg === "操作成功") {
        this.cartList = data.result;
        this.allchoose = this.isAllChoose();
      } else {
        Message({
          message: "获取购物车列表失败",
          type: "error",
        });
      }
    },
    async showSkuId(item, index) {
      const { data } = await getTypeBySkuId(item);
      this.maskContent = data.result;
      this.maskActive = index;
      const idx = this.maskContent.skus.filter((item) => {
        return item.id == this.cartList[index].skuId;
      });
      const check = idx[0].specs;
      for (let k in check) {
        if (this.maskContent.specs[k].values[0]) {
          this[`type_${+k + 1}`] = this.maskContent.specs[k].values
            .map((it) => check[k].valueName == it.name)
            .indexOf(true);
        } else {
          this[`type_${1 - k}`] = this.maskContent.specs[k].values
            .map((it) => check[k].valueName == it.name)
            .indexOf(true);
        }
      }
    },
    async addNum(item) {
      console.log(item);
      await modifyGoods({ id: item.skuId, info: { count: item.count + 1 } });
      this.$store.dispatch("home/getProductionCount");
      this.getList();
    },
    async deleteGood(item) {
      await deleteGoodBySkuId({ ids: [item.skuId] });
      this.$store.dispatch("home/getProductionCount");
      this.getList();
    },
    async subNum(item) {
      if (item.count > 1) {
        await modifyGoods({ id: item.skuId, info: { count: item.count - 1 } });
        this.$store.dispatch("home/getProductionCount");
      } else {
        Message({
          message: "数量不能为零",
          type: "info",
        });
      }
      this.getList();
    },
    evenChoose(item) {
      allChooseBtn({ selected: !item.selected, ids: [item.skuId] });
      this.getList();
    },
    async changeAll() {
      await allChooseBtn({ selected: !this.allchoose });
      this.getList();
    },
    isAllChoose() {
      const count = this.cartList.filter((item) => !item.selected);
      if (count.length || !this.cartList.length) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.goodcart {
  width: 100%;
  .goods {
    width: 100%;
    background-color: white;
    .content {
      width: 100%;
      .item {
        width: 100%;
        height: 120px;
        padding: 10px 0;
        box-sizing: border-box;
        display: flex;
        > .input {
          width: 120px;
          height: 100%;
          line-height: 100px;
          padding-left: 30px;
          box-sizing: border-box;
          > input {
            width: 16px;
            height: 16px;
          }
        }
        .goodsInfo {
          width: 380px;
          height: 100%;
          display: flex;
          > img {
            width: 100px;
            height: 100px;
          }
          .goodRight {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-left: 10px;
            position: relative;
            .catemask {
              position: absolute;
              left: 0;
              top: 90px;
              width: 400px;
              padding: 20px;
              box-sizing: border-box;
              background-color: white;
              z-index: 1;
              border: 1px solid #27ba9b;
              > .confirm {
                background-color: #27ba9b;
                padding: 5px 10px;
                border-radius: 4px;
                color: white;
              }
              > .maskitem {
                width: 100%;
                display: flex;
                margin-bottom: 10px;
                > span {
                  font-size: 14px;
                  color: #999;
                  width: 50px;
                  height: 40px;
                  line-height: 40px;
                }
                > .isImg {
                  flex: 1;
                  display: flex;
                  flex-wrap: wrap;
                  > img {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                    border: 1px solid #e5e5e5;
                    margin-bottom: 10px;
                  }
                }
                .noImg {
                  flex: 1;
                  display: flex;
                  flex-wrap: wrap;
                  > span {
                    padding: 6px 8px;
                    margin-bottom: 10px;
                    margin-right: 10px;
                    border: 1px solid #e4e4e4;
                    font-size: 14px;
                  }
                }
              }
              &::after {
                position: absolute;
                content: "";
                width: 12px;
                top: -7px;
                left: 10px;
                transform: scaleX(0.8) rotate(45deg);
                background-color: white;
                height: 12px;
                border-left: 1px solid #27ba9b;
                border-top: 1px solid #27ba9b;
              }
            }
            > span {
              font-size: 16px;
              color: #666;
              &:nth-child(2) {
                font-size: 14px;
                color: #999;
                margin-top: 12px;
                border: 1px solid #f5f5f5;
                padding: 4px 6px;
              }
            }
          }
        }
        .price {
          width: 215px;
          line-height: 100px;
          text-align: center;
          height: 100%;
          color: #666;
        }
        .allprice {
          width: 180px;
          color: #cf4444;
          text-align: center;
          line-height: 100px;
        }
        .set {
          width: 120px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 15px 0;
          font-size: 14px;
          color: #333;
          box-sizing: border-box;
          text-align: center;
          > span:nth-child(2n) {
            color: #27ba9b;
          }
        }
        .count {
          width: 180px;
          text-align: center;
          line-height: 28px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666;
          span {
            height: 30px;
            &:nth-child(2n + 1) {
              width: 30px;
              background-color: #f8f8f8;
              border: 1px solid #e4e4e4;
              box-sizing: border-box;
            }
            &:nth-child(2n) {
              width: 50px;
              border-top: 1px solid #e4e4e4;
              border-bottom: 1px solid #e4e4e4;
              box-sizing: border-box;
            }
          }
        }
      }
    }
    .title {
      width: 100%;
      height: 70px;
      font-size: 16px;
      border-bottom: 1px solid #e4e4e4;
      color: #666;
      display: flex;
      > label {
        width: 120px;
        height: 100%;
        line-height: 70px;
        text-align: center;
      }
      > span {
        line-height: 70px;
        text-align: center;
        height: 100%;
        &:nth-child(2) {
          width: 400px;
        }
        &:nth-child(3) {
          width: 220px;
        }
        &:nth-child(4) {
          width: 180px;
        }
        &:nth-child(5) {
          width: 180px;
        }
        &:nth-child(6) {
          width: 180px;
        }
      }
    }
  }
  .choose {
    width: 100%;
    height: 80px;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    background-color: white;
    .sleft {
      width: 360px;
      display: flex;
      font-size: 16px;
      color: #333;
      align-items: center;
      justify-content: space-between;
      > label {
        color: #999;
      }
    }
    .sright {
      width: 560px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .info {
        color: #333;
        flex-shrink: 0;
      }
      .pay {
        width: 180px;
        margin-left: 20px;
        height: 48px;
        background-color: #27ba9b;
        text-align: center;
        border-radius: 4px;
        color: white;
        line-height: 48px;
      }
    }
  }
}
.checked {
  border: 1px solid #27ba9b !important;
}
</style>