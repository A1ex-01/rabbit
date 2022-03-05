<template>
  <div class="paydetail">
    <div class="top">
      <div class="top_left">
        <i class="iconfont icon-shuyi_jinqian-jiage"></i>
        <span>待发货</span>
      </div>
      <div class="top_mid">
        <span>订单编号：{{info.id}}</span>
        <span>下单时间：{{info.createTime}}</span>
      </div>
      <div class="top_right">
        <span v-if="info.orderState == 1" @click="$router.push({path:'/pay/'+info.id})">立即付款</span>
        <span v-else @click="$router.push({path:'/cart'})">再次购买</span>
      </div>
    </div>
    <div class="steps">
      <el-steps :active="info.orderState" v-if="info" align-center>
        <el-step title="提交订单" :description="info.createTime"></el-step>
        <el-step title="付款成功" description=""></el-step>
        <el-step title="商品发货" description=""></el-step>
        <el-step title="确认收货" description=""></el-step>
        <el-step title="订单完成" description=""></el-step>
      </el-steps>
    </div>
    <div class="title">
      <span>订单商品</span>
    </div>
    <div class="product">
      <OrderPorductInfo :goods="goods"></OrderPorductInfo>
    </div>
    <div class="title">
      <span>收货信息</span>
    </div>
    <div class="addr">
      <AddrCard
        :useraddr="{
          receiver: info.receiverContact,
          contact: info.receiverMobile,
          fullLocation: '',
          address: info.receiverAddress,
        }"
      ></AddrCard>
    </div>
    <div class="title">
      <span>订单信息</span>
    </div>
    <div class="pricelist">
      <div>
        <span>商品件数：{{ goods.length }}：</span>
        <span>商品总价：<b style="font-size:20px;color:#cf4444">￥{{ allprice }}</b></span>
        <span>商品运费：￥0</span>
        <span>应付金额：￥{{ allprice }}：</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import OrderPorductInfo from "./OrderPorductInfo.vue";
import { getListById } from "../../api/pay";
import AddrCard from "../../components/AddrCard.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: null,
      goods: [],
    };
  },
  computed:{
    allprice(){
      return this.goods.reduce((total, curr) => {
        return total + curr.price;
      },0)
    }
  },
  components: {
    OrderPorductInfo,
    AddrCard,
  },
  mounted() {
    this.getDetailInfo();
  },
  methods: {
    async getDetailInfo() {
      const { data } = await getListById(this.id);
      if (data.msg === "操作成功") {
        this.info = data.result;
        for (let j = 0; j < this.info.skus.length; j++) {
          let obj = {};
          for (let i in this.info.skus[0]) {
            if (
              [
                "image",
                "attrsText",
                "id",
                "name",
                "curPrice",
                "quantity",
              ].indexOf(i) != -1
            ) {
              obj[
                i == "image"
                  ? "picture"
                  : i == "curPrice"
                  ? "price"
                  : i == "quantity"
                  ? "count"
                  : i
              ] = this.info.skus[0][i];
            }
          }
          obj.totalPrice = obj.totalPayPrice = obj.price * obj.count;
          this.goods.push(obj);
        }
        Message({
          message: "获取订单详情成功",
          type: "success",
        });
      } else {
        Message({
          message: "获取订单详情失败",
          type: "error",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/reset.scss";
.paydetail {
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  .addr {
    width: 100%;
    height: 160px;
  }
  .pricelist{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 60px 0;
    >div{
      width: 250px;
      height: 160px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .product {
    padding: 0 35px;
    box-sizing: border-box;
  }
  .title {
    width: 100%;
    font-size: 16px;
    padding: 35px 0;
    padding-left: 35px;
  }
  .steps {
    width: 100%;
    padding: 25px 20px;
    box-sizing: border-box;
  }
  .top {
    height: 180px;
    width: 100%;
    display: flex;
    > .top_left {
      width: 220px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > i {
        font-size: 32px;
        color: $base-color;
      }
      > span {
        font-size: 18px;
        color: #666;
        margin-top: 16px;
      }
    }
    > .top_mid {
      height: 100%;
      width: 600px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      > span {
        color: #999;
        font-size: 14px;
        margin-bottom: 16px;
      }
    }
    > .top_right {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      padding-right: 100px;
      box-sizing: border-box;
      align-items: center;
      > span {
        font-size: 14px;
        color: white;
        background-color: $base-color;
        padding: 7px 16px;
        border-radius: 4px;
      }
    }
  }
}
</style>