<template>
  <div class="living">
    <GoodsItem :goodList="goodList"></GoodsItem>
  </div>
</template>

<script>
import GoodsItem from "../../components/GoodsItem.vue"
export default {
  props:["goodList"],
  data(){
    return {
    }
  },
  mounted(){
  },
  methods:{
    
  },
  components:{
    GoodsItem
  }

}
</script>

<style>

</style>