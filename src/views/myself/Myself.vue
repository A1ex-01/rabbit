<template>
  <div class="mine">
    <div class="left">
      <PersonLeft></PersonLeft>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import PersonLeft from "./PersonLeft.vue"
export default {
  components:{
    PersonLeft
  },
  mounted(){
    this.$store.dispatch("home/getProductionCount");
  }
};
</script>
<style lang="scss" scoped>
.mine {
  padding: 20px 140px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  display: flex;
  align-items: flex-start;
  >.left{
    width: 220px;
    background-color: white;
    flex-shrink: 0;
  }
    >.right{
    flex: 1;
    margin-left: 20px;
    background-color: #f5f5f5;
  }
}
</style>