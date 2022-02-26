<template>
  <div>
    <CategoryTop :filterList="filterList.saleProperties" v-if="filterList"></CategoryTop>
    <GoodsList></GoodsList>
  </div>
</template>

<script>
import CategoryTop from "./CategoryTop.vue"
import GoodsList from "./GoodsList.vue"
export default {
  props:["filterList"],
  components:{
    CategoryTop,
    GoodsList
  }
}
</script>

<style>

</style>