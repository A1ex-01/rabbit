<template>
  <div class="product">
    <Curmb></Curmb>
    <ProductShow :goodDetail="goodDetail"></ProductShow>
    <ProductLike></ProductLike>
    <ProductDetail :details="goodDetail.details" v-if="goodDetail"></ProductDetail>
  </div>
</template>

<script>
import Curmb from "../../components/Curmb.vue";
import ProductShow from "./ProductShow.vue";
import ProductLike from "./ProductLike.vue";
import ProductDetail from "./ProductDetail.vue";
import { getGoodDetailInfo } from "../../api/good.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      goodDetail: null,
    };
  },
  components: {
    Curmb,
    ProductShow,
    ProductLike,
    ProductDetail
  },
  mounted() {
    this.getGoodDetail();
  },
  methods: {
    async getGoodDetail() {
      const { data } = await getGoodDetailInfo(this.$route.params);
      if (data.msg === "操作成功") {
        this.goodDetail = data.result;
      } else {
        Message({
          message: "获取商品详情失败",
          type: "error",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.product {
  width: 100%;
  padding: 0 140px;
  padding-bottom: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
</style>