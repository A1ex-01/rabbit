<template>
  <div class="cateitem">
    <div class="title">
      <span v-if="cateitem">-{{ cateitem.name }}-</span>
      <span>温柔柔软，品质之选</span>
      <div class="mask">
        <span @click="goAll"
          >查看全部<i
            class="el-icon-arrow-right"
            style="color: #ccc; margin-left: 5px"
          ></i
        ></span>
      </div>
    </div>
    <!-- <div v-for="item in cateitem.goods" :key="item.id">
        <img :src="item.picture" alt="" />
        <p>{{ item.name }}</p>
        <p>{{ item.desc }}</p>
        <p>￥{{ item.price }}</p>
      </div> -->
    <GoodCard :cateitem="cateitem.goods" v-if="cateitem"></GoodCard>
  </div>
</template>

<script>
import GoodCard from "./GoodCard.vue";
export default {
  props: ["cateitem"],
  components: {
    GoodCard,
  },
  methods: {
    goAll() {
      console.log(this.cateitem);
      let curmb = JSON.parse(localStorage.getItem("curmb"));
      curmb.level2 = this.cateitem.name;
      localStorage.setItem("curmb", JSON.stringify(curmb));
      this.$router.push("/category/sub/" + this.cateitem.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.cateitem {
  width: 100%;
  height: 457px;
  background-color: white;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    height: 128px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .mask {
      position: absolute;
      right: 0;
      top: 0;
      padding: 20px;
      span {
        font-size: 16px;
        color: #999;
      }
    }
    span {
      font-size: 28px;
      color: #666;
      &:nth-child(2) {
        font-size: 20px;
        color: #999;
        margin-top: 20px;
      }
    }
  }
  // .goods {
  //   height: 100%;
  //   width: 100%;
  //   padding: 0 65px;
  //   padding-bottom: 30px;
  //   box-sizing: border-box;
  //   display: flex;
  //   justify-content: space-between;
  //   div {
  //     width: 220px;
  //     height: 300px;
  //     padding: 20px 30px;
  //     box-sizing: border-box;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: space-between;
  //     align-items: center;
  //     transition: transform 0.5s;
  //     &:hover {
  //       transform: translate3d(0, -3px, 0);
  //       box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  //       transition: transform 0.5s;
  //     }
  //     img {
  //       width: 160px;
  //       height: 160px;
  //     }
  //     p {
  //       font-size: 16px;
  //       overflow: hidden;
  //       white-space: nowrap;
  //       text-overflow: ellipsis;
  //       width: 100%;
  //       &:nth-child(3) {
  //         color: #999;
  //         margin: 10px 0;
  //       }
  //       &:nth-child(4) {
  //         color: #cf4444;
  //         font-size: 20px;
  //         width: 100px;
  //         text-align: center;
  //       }
  //     }
  //   }
  // }
}
</style>