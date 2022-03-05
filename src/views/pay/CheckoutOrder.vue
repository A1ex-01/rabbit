<template>
  <div class="check">
    <div class="curmb">
      <Curmb></Curmb>
    </div>
    <div class="orderinfo">
      <CheckoutShow></CheckoutShow>
    </div>
  </div>
</template>

<script>
import Curmb from "../../components/Curmb.vue"
import CheckoutShow from "./CheckoutShow.vue"
export default {
  components:{
    Curmb,
    CheckoutShow
  }
}
</script>
<style lang="scss" scoped>
.check{
  width: 100%;
  padding: 20px 140px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
</style>