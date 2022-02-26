<template>
  <div class="choose">
    <Curmb></Curmb>
    <ChooseCommon :filterList="filterList"></ChooseCommon>
  </div>
</template>

<script>
import Curmb from "../../components/Curmb.vue";
import ChooseCommon from "./ChooseCommon.vue";

import { Message } from 'element-ui';
import {getFilterCategory} from "../../api/category.js"
export default {
  data(){
    return {
      filterList:null
    }
  },
    mounted(){
    this.getFilterList();
  },
  watch:{
    $route:"getFilterList"
  },
  methods:{
    async getFilterList(){
      const { data } = await getFilterCategory(this.$route.params);
      if(data.msg === "操作成功") {
        this.filterList = data.result;
      }else{
        Message({
          message:"获取过滤列表失败",
          type:"error"
        })
      }
    }
  },
  components: {
    Curmb,
    ChooseCommon,
  },
};
</script>
<style lang="scss" scoped>
.choose {
  padding: 0 140px;
  background-color: #f5f5f5;
  padding-bottom: 20px;
  box-sizing: border-box;
}
</style>