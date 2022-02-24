<template>
  <div class="top">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 115px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 32px;
    color: #333;
    margin-right: 10px;
    &:last-child {
      font-size: 16px;
      color: #999;
    }
  }
}
.right{
  color: #999;
}
</style>