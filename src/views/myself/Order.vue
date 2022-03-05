<template>
  <div class="order">
    <div class="tablist">
      <ul>
        <li
          v-for="(item, index) in tabshow"
          @click="tabClick(index)"
          :class="{ checked: active == index }"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="orderlist">
      <OrderCard
        :orderList="item"
        v-for="(item, index) in orderList"
        :key="index"
      ></OrderCard>
    </div>
    <div class="pagenav">
      <PageNav :count="count" @changepage="chpage"></PageNav>
    </div>
  </div>
</template>

<script>
import { getAllOrderList } from "../../api/order";
import OrderCard from "../../components/OrderCard.vue";
import PageNav from "./PageNav.vue";
export default {
  mounted() {
    this.getOrderList();
    this.changeIndex("1_0");
  },
  inject:["changeIndex"],
  data() {
    return {
      active: 0,
      tabshow: [
        "全部订单",
        "待付款",
        "待发货",
        "待收货",
        "待评价",
        "已完成",
        "已取消",
      ],
      page: 1,
      count: 0,
      orderList: null,
    };
  },
  components: {
    OrderCard,
    PageNav,
  },
  methods: {
    async tabClick(index) {
      this.active = index;
      this.page = 1;
      const {
        data: { result },
      } = await getAllOrderList({ page: this.page, orderState: this.active });
      this.count = result.counts;
      this.orderList = result.items;
    },
    async getOrderList() {
      const {
        data: { result },
      } = await getAllOrderList({ page: this.page, orderState: this.active });
      this.count = result.counts;
      this.orderList = result.items;
    },
    chpage(val) {
      this.page = val;
      this.getOrderList();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.order {
  background-color: white;
  display: flex;
  flex-direction: column;
  .tablist {
    width: 100%;
    > ul {
      width: 100%;
      display: flex;
      > li {
        height: 58px;
        width: 110px;
        text-align: center;
        line-height: 58px;
        color: #333;
        border: 1px solid #f5f5f5;
        &.checked {
          border-top: 2px solid #27ba9b;
          border-bottom: 0;
        }
      }
    }
  }
  .orderlist {
    width: 100%;
  }
  .pagenav {
    width: 100%;
  }
}
</style>