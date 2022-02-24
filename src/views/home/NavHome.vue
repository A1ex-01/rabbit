<template>
  <div class="nav" v-if="navList">
    <img src="../../assets/img/logo.png" alt="" />
    <ul class="list">
      <li>首页</li>
      <li
        v-for="(item, index) in navList"
        :key="index"
        @mouseenter="hoverNav(index)"
        @mouseleave="leaveNav()"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="search">
      <input type="text" placeholder="搜一搜" />
      <div class="mask">
        <i class="el-icon-search"></i>
      </div>
    </div>
    <div class="shop">
      <i class="el-icon-shopping-cart-2"></i>
    </div>
    <div
      :class="{ slider: true, checked: active == index }"
      v-for="(item, index) in navList"
      :key="index"
      @mouseenter="hoverItem(active)"
      @mouseleave="leaveNav()"
    >
      <div class="item" v-for="v in item.children" :key="v.id">
        <img :src="v.picture" alt="" />
        <span>{{ v.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:["navList"],
  data() {
    return {
      active: -1,
      p1: null,
      p2: null,
    };
  },
  methods: {
    hoverNav(item) {
      console.log(item);
      clearTimeout(this.p1);
      clearTimeout(this.p2);
      this.p1 = setTimeout(() => {
        this.active = item;
        this.p1 = null;
      }, 200);
    },
    leaveNav() {
      clearTimeout(this.p1);
      clearTimeout(this.p2);
      this.p2 = setTimeout(() => {
        this.active = -1;
        this.p2 = null;
      }, 200);
    },
    hoverItem(item) {
      clearTimeout(this.p1);
      clearTimeout(this.p2);
      this.active = item;
    },
  },
};
</script>
<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 132px;
  display: flex;
  padding: 0 140px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .slider {
    width: 1240px;
    height: 0px;
    position: absolute;
    left: 140px;
    top: 100px;
    padding-left: 100px;
    box-sizing: border-box;
    background-color: white;
    z-index: 1;
    box-shadow: 0 0 5px #ccc;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: all 0.5s;

    .item {
      width: 110px;
      height: 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:hover {
        color: #27ba9b;
      }
      img {
        width: 60px;
        height: 60px;
        margin-bottom: 10px;
      }
      span {
        font-size: 14px;
      }
    }
  }
  .checked {
    height: 132px;
    opacity: 1;
    transition: all 0.5s;
  }
  > img {
    width: 200px;
    height: 80px;
  }
  .list {
    width: 800px;
    display: flex;
    li {
      width: 80px;
      height: 132px;
      line-height: 132px;
      text-align: center;
      &:hover {
        color: #27ba9b;
      }
    }
  }
  .search {
    border-bottom: 1px solid #f5f5f5;
    position: relative;
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 24px;
      height: 24px;
      font-size: 20px;
      > .el-icon {
        vertical-align: middle;
        color: #333;
      }
    }
    input {
      width: 150px;
      height: 24px;
      outline: 0;
      color: #333;
      border: 0;
      padding-left: 24px;
    }
  }
  .shop {
    width: 50px;
    height: 32px;
    .el-icon-shopping-cart-2 {
      font-size: 26px;
      text-align: center;
    }
  }
}
</style>