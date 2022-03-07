<template>
  <div class="home">
    <TopHome></TopHome>
    <keep-alive>
    <NavHome :navList="cateList"></NavHome>
    </keep-alive>
    <!-- <SwiperHome :tabList="cateList"></SwiperHome>
    <FreshThing></FreshThing>
    <HotGuess></HotGuess>
    <HotBrand></HotBrand>
    <LivingHome :goodList="goodList[0]" v-if="goodList"></LivingHome>
    <GoodFood :goodList="goodList[1]" v-if="goodList"></GoodFood>
    <Cloth :goodList="goodList[2]" v-if="goodList"></Cloth>
    <MotherBaby :goodList="goodList[3]" v-if="goodList"></MotherBaby>
    <NewSpecial></NewSpecial> -->
    <router-view></router-view>
    <BottomShow></BottomShow>
    <div :class="{ mask: true, show: show }">
      <NavHome :navList="cateList"></NavHome>
    </div>
  </div>
</template>
<script>
import TopHome from "./TopHome.vue";
// import SwiperHome from "./SwiperHome.vue";
import NavHome from "./NavHome.vue";
// import FreshThing from "./FreshThing.vue";
// import HotGuess from "./HotGuess.vue";
// import HotBrand from "./HotBrand.vue";
// import LivingHome from "./LivingHome.vue";
// import GoodFood from "./GoodFood.vue";
// import MotherBaby from "./MotherBaby.vue";
// import NewSpecial from "./NewSpecial.vue";
import BottomShow from "./BottomShow.vue";
// import Cloth from "./Cloth.vue";
import { Message } from "element-ui";
import { getCategoryList } from "../../api/home";
import { getCookie } from "../../utils/cookie";
export default {
  data() {
    return {
      cateList: null,
      goodList: null,
      show: false,
      listen: null,
    };
  },
  mounted() {
    this.getCateList();
    this.$store.commit("login/getUserInfo", JSON.stringify(getCookie("info")));
    // this.getGoods();
    this.listen = window.addEventListener("scroll", this.getScrollY);
    this.$store.dispatch("home/getProductionCount");
  },
  destroyed() {
    window.removeEventListener(this.listen);
  },
  methods: {
    getScrollY() {
      if (window.pageYOffset > 100) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    async getCateList() {
      const { data } = await getCategoryList();
      if (data.msg === "操作成功") {
        this.cateList = data.result;
        Message({
          message: "获取列表成功",
          type: "success",
        });
      } else {
        Message({
          message: "获取列表失败",
          type: "error",
        });
      }
    },
    // async getGoods() {
    //   const { data } = await getGoodsList();
    //   if (data.msg === "操作成功") {
    //     this.goodList = data.result;
    //   } else {
    //     Message({
    //       message: "获取分类详细信息失败",
    //       type: "error",
    //     });
    //   }
    // },
  },
  components: {
    TopHome,
    // SwiperHome,
    NavHome,
    // FreshThing,
    // HotGuess,
    // HotBrand,
    // LivingHome,
    // GoodFood,
    // MotherBaby,
    // Cloth,
    // NewSpecial,
    BottomShow,
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 0px;
    background-color: white;
    transition: height 0.5s;
    display: none;
    > .nav {
      height: 80px;
    }
  }
  .show {
    height: 80px;
    display: block;
    transition: height 0.5s;
  }
}
</style>