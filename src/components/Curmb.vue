<template>
  <div class="crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="curmb && curmb.level1">{{
        curmb.level1
      }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="curmb && curmb.level2">{{
        curmb.level2
      }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="curmb && curmb.level3">{{
        curmb.level3
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      curmb: null,
    };
  },
  mounted() {
    this.getCurmb();
  },
  watch: {
    $route: "getCurmb",
  },
  methods: {
    getCurmb() {
      this.curmb = JSON.parse(localStorage.getItem("curmb"));
    },
  },
};
</script>
<style lang="scss" scoped>
.crumb {
  padding: 20px 0;
}
</style>