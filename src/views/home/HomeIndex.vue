<template>
  <div>
    <SwiperHome :tabList="cateList"></SwiperHome>
    <FreshThing></FreshThing>
    <HotGuess></HotGuess>
    <HotBrand></HotBrand>
    <LivingHome :goodList="goodList[0]" v-if="goodList"></LivingHome>
    <GoodFood :goodList="goodList[1]" v-if="goodList"></GoodFood>
    <Cloth :goodList="goodList[2]" v-if="goodList"></Cloth>
    <MotherBaby :goodList="goodList[3]" v-if="goodList"></MotherBaby>
    <NewSpecial></NewSpecial>
  </div>
</template>

<script>
import SwiperHome from "./SwiperHome.vue";
import FreshThing from "./FreshThing.vue";
import HotGuess from "./HotGuess.vue";
import HotBrand from "./HotBrand.vue";
import LivingHome from "./LivingHome.vue";
import GoodFood from "./GoodFood.vue";
import MotherBaby from "./MotherBaby.vue";
import NewSpecial from "./NewSpecial.vue";
import Cloth from "./Cloth.vue";
import { getCategoryList, getGoodsList } from "../../api/home";
import { Message } from "element-ui"
export default {
  data(){
    return {
      goodList:null,
      cateList:null
    }
  },
  mounted(){
    this.getGoods();
    this.getCateList();
  },
  methods:{
        async getGoods() {
      const { data } = await getGoodsList();
      if (data.msg === "操作成功") {
        this.goodList = data.result;
      } else {
        Message({
          message: "获取分类详细信息失败",
          type: "error",
        });
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
  },
  components:{
    SwiperHome,
    FreshThing,
    HotGuess,
    HotBrand,
    LivingHome,
    GoodFood,
    MotherBaby,
    NewSpecial,
    Cloth
  }
};
</script>

<style>
</style>