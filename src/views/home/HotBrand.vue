<template>
  <div class="brand">
    <HotTop>
      <template #left>
        <span>热门品牌</span>
        <span>国际经典&nbsp;&nbsp;品质保证</span></template
      >
      <template #right>
        <i
          :class="{ 'el-icon-arrow-left': true, checked: active === 1 }"
          @click="leftBtn"
        ></i>
        <i
          :class="{ 'el-icon-arrow-right': true, checked: active == 0 }"
          @click="rightBtn"
        ></i>
      </template>
    </HotTop>
    <div class="brandList">
      <div
        v-for="(item, index) in brandList"
        :key="item.id"
        :class="{ move: index == 0 && active == 1 }"
        @click="goBrand"
      >
        <img :src="item.picture" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import HotTop from "../../components/HotTop.vue";
import { getBrandList } from "../../api/home.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      brandList: null,
      active: 0,
    };
  },
  computed: {},
  mounted() {
    this.getBrand();
  },
  methods: {
    async getBrand() {
      const { data } = await getBrandList();
      if (data.msg === "操作成功") {
        this.brandList = data.result;
      } else {
        Message({
          message: "获取品牌列表失败",
          type: "error",
        });
      }
    },
    goBrand(){
      this.$notify({
        title:"提示",
        message:"暂未开放该功能！"
      })
    },
    leftBtn() {
      if (this.active == 1) {
        this.active = 0;
      }
    },
    rightBtn() {
      if (this.active == 0) {
        this.active = 1;
      }
    },
  },
  components: {
    HotTop,
  },
};
</script>
<style lang="scss" scoped>
.brand {
  padding: 0 140px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  .brandList {
    display: flex;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
    > div {
      flex: 1;
      margin-right: 8px;
      &:nth-child(1) {
        transition: all 0.8s;
      }
      > img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
.el-icon-arrow-left,
.el-icon-arrow-right {
  width: 20px;
  height: 20px;
  background-color: #ccc;
  margin-left: 5px;
  line-height: 20px;
  text-align: center;
  color: white;
}
.checked {
  background-color: #27ba9b;
}
.move {
  margin-left: -1240px;
  transition: all 0.8s;
}
</style>