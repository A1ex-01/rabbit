<template>
  <div class="top">
    <div class="item" v-for="item in filterList" :key="item.id">
      <span>{{ item.name }}:</span>
      <div class="item_cont">
        <span class="checked">全部</span>
        <span v-for="v in item.properties" :key="v.id">{{ v.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["filterList"],
};
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  background-color: white;
  padding: 25px;
  box-sizing: border-box;
  .item {
    display: flex;
    width: 100%;
    > span {
      width: 80px;
      height: 44px;
      color: #999;
    }
    .item_cont {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .checked {
        color: #27ba9b;
      }
      > span {
        margin-right: 36px;
        height: 44px;
        font-size: 14px;
        color: #333;
      }
    }
  }
}
</style>