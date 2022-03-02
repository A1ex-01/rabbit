<template>
  <div class="ordercard">
    <div class="title">
      <span>下单时间：{{ orderList.createTime }}</span>
      <span>订单编号：{{ orderList.id }}</span>
      <p class="mask">删除</p>
    </div>
    <div class="ordercontent">
      <div class="good">
        <div class="good_item" v-for="item in orderList.skus" :key="item.id">
          <img :src="item.image" alt="" />
          <div class="good_name">
            <span>{{ item.name }}</span>
            <span>{{ item.attrsText }}</span>
          </div>
          <span class="good_price">￥{{ item.curPrice }}</span>
          <span class="good_count">x{{ item.quantity }}</span>
        </div>
      </div>
      <div class="state">{{ orderList.orderState | filterState }}</div>
      <div class="price">
        <p style="color: #cf4444">￥{{ orderList.totalMoney }}</p>
        <p>（含运费：￥{{ orderList.postFee }}）</p>
        <p>在线支付</p>
      </div>
      <div class="reset">
        <p v-if="orderList.orderState == 1" class="pay">立即付款</p>
        <p v-if="orderList.orderState == 3" class="pay">确定收货</p>
        <p style="margin:10px 0">查看详情</p>
        <p v-if="orderList.orderState == 4">再次购买</p>
        <p v-if="orderList.orderState == 4" style="margin-top:10px">申请售后</p>
        <p v-if="orderList.orderState == 1">取消订单</p>
        <p v-if="orderList.orderState == 2">再次购买</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  props: ["orderList"],
  filters: {
    filterState(val) {
      let stateList =  ["待付款", "待发货", "待收货", "待评价", "已完成", "已取消"];
      return stateList[val - 1];
    },
  },
};
</script>
<style lang="scss" scoped>
.ordercard {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  > .ordercontent {
    display: flex;
    > .good {
      width: 500px;
      display: flex;
      flex-direction: column;
      border: 1px solid #f5f5f5;
      > .good_item {
        height: 90px;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f5f5f5;
        &:last-child {
          border: 0;
        }
        img {
          width: 68px;
          height: 68px;
        }
        .good_name {
          width: 200px;
          padding: 0 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          > span {
            font-size: 14px;
            color: #333;
            line-height: 20px;
            &:last-child {
              font-size: 12px;
              color: #999;
              margin-top: 8px;
            }
          }
        }
        .good_price,
        .good_count {
          color: #333;
          font-size: 14px;
          flex: 1;
          text-align: center;
        }
      }
    }
    > .state {
      width: 120px;
      text-align: center;
      border: 1px solid #f5f5f5;
      padding: 20px;
      box-sizing: border-box;
    }
    > .price {
      width: 200px;
      text-align: center;
      border: 1px solid #f5f5f5;
      padding: 10px;
      box-sizing: border-box;
      line-height: 20px;
      > p {
        font-size: 14px;
        color: #333;
      }
    }
    > .reset {
      flex: 1;
      text-align: center;
      font-size: 14px;
      border: 1px solid #f5f5f5;
      padding: 20px;
      box-sizing: border-box;
      .pay{
        background-color: #27ba9b;
        width: 100px;
        height: 30px;
        box-sizing: border-box;
        line-height: 30px;
        border-radius: 4px;
        margin-bottom: 16px;
        color: white;
      }
    }
  }
  .title {
    background-color: #f5f5f5;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    position: relative;
    padding-left: 20px;
    box-sizing: border-box;
    > .mask {
      position: absolute;
      right: 20px;
      top: 0;
      color: #666;
    }
    > span {
      margin-right: 20px;
    }
  }
}
</style>