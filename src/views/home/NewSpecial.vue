<template>
  <div class="special">
    <HotTop>
      <template #left>
        <span style="font-size: 32px; color: #333">最新专题</span></template
      >
      <template #right> 查看全部<i class="el-icon-arrow-right"></i> </template>
    </HotTop>
    <div class="main">
      <div class="special_item" v-for="item in specialList" :key="item.id">
        <div class="img">
          <img :src="item.cover" alt="" />
          <div class="mask">
            <div class="mask_left">
              <span>{{ item.title }}</span>
              <span>{{ item.summary }}</span>
            </div>
            <div class="mask_right">
              <span>￥{{ item.lowestPrice }}起</span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <span><i class="el-icon-s-tools"></i>{{ item.collectNum }}</span>
          <span><i class="el-icon-s-tools"></i>{{ item.viewNum }}</span>
          <span><i class="el-icon-s-tools"></i>{{ item.replyNum }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
import { getSpecial } from "../../api/home.js";
import HotTop from "../../components/HotTop.vue";
export default {
  data() {
    return {
      specialList: null,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const { data } = await getSpecial();
      if (data.msg === "操作成功") {
        this.specialList = data.result;
      } else {
        Message({
          message: "获取最新专题列表失败",
          type: "error",
        });
      }
    },
  },
  components: {
    HotTop,
  },
};
</script>
<style lang="scss" scoped>
.special {
  width: 100%;
  height: 495px;
  background-color: #f5f5f5;
  padding: 0 140px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .special_item {
    width: 404px;
    height: 360px;
    background-color: white;
    &:hover {
      transform: translate3d(0, -3px, 0);
      transition: all 0.5s;
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }
    > .img {
      width: 404px;
      height: 288px;
      position: relative;
      .mask {
        width: 404px;
        height: 140px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        display: flex;
        align-items: flex-end;
        .mask_left {
          width: 280px;
          height: 70px;
          display: flex;
          flex-direction: column;
          padding-left: 16px;
          > span {
            color: #fff;
            font-size: 22px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &:last-child {
              color: #999;
              font-size: 19px;
              margin-top: 5px;
            }
          }
        }
        .mask_right {
          flex: 1;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            width: 72px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            color: #cf4444;
            background-color: #fff;
            border-radius: 2px;
          }
        }
      }
      > img {
        width: 404px;
        height: 288px;
        object-fit: cover;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 20px;
      box-sizing: border-box;
      height: 72px;
      span {
        font-size: 16px;
        color: #333;
        &:nth-child(2) {
          flex: 1;
          padding-left: 20px;
        }
      }
    }
  }
}
.main {
  display: flex;
  justify-content: space-between;
}
</style>