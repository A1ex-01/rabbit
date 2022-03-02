<template>
  <div class="cart">
    <Curmb></Curmb>
    <GoodsCart></GoodsCart>
    <ProductLike></ProductLike>
  </div>
</template>

<script>
import Curmb from "../../components/Curmb.vue"
import GoodsCart from "./GoodsCart.vue"
import ProductLike from "../product/ProductLike.vue"
export default {
  components:{
    Curmb,
    GoodsCart,
    ProductLike
  },
  mounted(){
    this.$store.dispatch("home/getProductionCount");
  }
}
</script>
<style lang="scss" scoped>
.cart{
  padding: 0 140px;
  padding-bottom: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
</style>