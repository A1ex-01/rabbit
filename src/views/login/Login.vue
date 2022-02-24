<template>
    <div class="login">
      <TopLogin></TopLogin>
      <MidLogin></MidLogin>
      <BottomLogin></BottomLogin>
    </div>
</template>
<script>
import TopLogin from "./TopLogin.vue"
import MidLogin from "./MidLogin.vue"
import BottomLogin from "./BottomLogin.vue"
export default {
  components:{
    TopLogin,
    MidLogin,
    BottomLogin
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
}
</style>