<template>
  <div class="cate">
    <div class="swiper">
      <img
        :src="item.imgUrl"
        alt=""
        v-for="(item, index) in banner"
        :key="item.id"
        :class="{ checked: active == index }"
      />
      <span class="swiper_left" @click="left"
        ><i class="el-icon-arrow-left"></i
      ></span>
      <span class="swiper_right" @click="right"
        ><i class="el-icon-arrow-right"></i
      ></span>
    </div>
    <div class="allcate">
      <p>全部分类</p>
      <div class="allcate_item">
        <div v-for="item in cateList.children" :key="item.id" @click="gogoods(item)">
          <img :src="item.picture" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <CateItem :cateitem="cateList.children[0]" v-if="cateList"></CateItem>
    <CateItem :cateitem="cateList.children[1]" v-if="cateList"></CateItem>
    <CateItem :cateitem="cateList.children[2]" v-if="cateList"></CateItem>
    <CateItem :cateitem="cateList.children[3]" v-if="cateList"></CateItem>
  </div>
</template>

<script>
import { getBannerList } from "../api/home.js";
import CateItem from "./CateItem.vue";
export default {
  data() {
    return {
      banner: null,
      active: 0,
    };
  },
  props: ["cateList"],
  mounted() {
    this.getBanner();
  },
  methods: {
    async getBanner() {
      const { data } = await getBannerList();
      this.banner = data.result;
    },
    gogoods(i){
      let data = JSON.parse(localStorage.getItem("curmb"));
      data.level2 = i.name;
      localStorage.setItem("curmb", JSON.stringify({level1:data.level1,level2:i.name,level3:""}));
      this.$router.push("/category/sub/"+i.id);
    },
    left() {
      this.active = this.active == 0 ?  4 : this.active - 1;
    },
    right() {
            this.active = this.active == 4 ?  0 : this.active + 1;
    },
  },
  components: {
    CateItem,
  },
};
</script>
<style lang="scss" scoped>
.cate {
  width: 100%;
  margin-bottom: 20px;
  .swiper {
    width: 100%;
    height: 500px;
    position: relative;
    > .swiper_left,
    .swiper_right {
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba($color: #fff, $alpha: 0.5);
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      color: white;
      top: 240px;
    }
    .swiper_left {
      left: 20px;
    }
    .swiper_right {
      right: 20px;
    }
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s;
    }
    .checked {
      opacity: 1;
      transition: opacity 0.5s;
    }
  }
  .allcate {
    width: 100%;
    height: 260px;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    background-color: white;
    p {
      height: 100px;
      font-size: 32px;
      line-height: 130px;
      color: #666;
      text-align: center;
    }
    .allcate_item {
      height: 100%;
      display: flex;
      padding: 0 32px;
      > div {
        width: 168px;
        height: 140px;
        display: flex;
        flex-direction: column;
        padding: 10px;
        justify-content: center;
        align-items: center;
        &:hover {
          color: #27ba9b;
        }
        img {
          width: 100px;
          height: 100px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>