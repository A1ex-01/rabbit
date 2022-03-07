<template>
  <div class="collect">
    <div class="title">
      <HotTop>
        <template #left>
          <span style="font-size:26px;color:#000;">周榜热销</span></template
        >
        <template #right> 查看全部<i class="el-icon-arrow-right"></i> </template
      ></HotTop>
    </div>
      <GoodCard :cateitem="collectList"></GoodCard>
  </div>
</template>

<script>
import HotTop from "../../components/HotTop.vue";
import GoodCard from "../../components/GoodCard.vue";
import { getHotGood } from "../../api/good"
import { getMyHistory } from "../../api/home"
export default {
  components: {
    HotTop,
    GoodCard
  },
  data(){
    return {
      collectList:null
    }
  },
  mounted(){
    this.getNeedList();
    this.getHistory();
  },
  methods:{
    async getNeedList(){
      const {data:{result}} = await getHotGood({type:2});
        this.collectList = result;
    },
    async getHistory(){
      const data = await getMyHistory();
      console.log(data)
    }
  }
};
</script>
<style lang="scss" scoped>
.collect {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  >.goods{
    flex: 1;
  }
}
</style>