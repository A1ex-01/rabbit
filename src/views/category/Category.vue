<template>
  <div class="category">
    <Curmb></Curmb>
    <CateCommon :cateList="cateList" v-if="cateList"></CateCommon>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { getCategory } from "../../api/category.js";
import CateCommon from "../../components/CateCommon.vue";
import Curmb from "../../components/Curmb.vue";
export default {
  data() {
    return {
      cateList: null,
    };
  },
  mounted() {
    this.getCategoryList();
  },
  components: {
    CateCommon,
    Curmb,
  },
  watch: {
    $route: "getCategoryList",
  },
  methods: {
    async getCategoryList() {
      const { data } = await getCategory(this.$route.params);
      if (data.msg === "操作成功") {
        this.cateList = data.result;
      } else {
        Message({
          message: "获取分类失败",
          type: "warning",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.category {
  padding: 0 140px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
</style>