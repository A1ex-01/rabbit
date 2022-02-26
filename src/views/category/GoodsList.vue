<template>
  <div class="goodlist">
    <div class="title">
      <span class="checked">默认排序</span>
      <span>最新商品</span>
      <span>最高人气</span>
      <span>评论最多</span>
      <span>价格排序</span>
      <div class="right">
        <div class="right_item">
          <input type="checkbox" />
          <span>仅显示有货商品</span>
        </div>
        <div class="right_item">
          <input type="checkbox" />
          <span>仅显示特惠商品</span>
        </div>
      </div>
    </div>
    <GoodCard :cateitem="goodList" v-if="goodList"></GoodCard>
    <div class="loading" v-if="flag">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import GoodCard from "../../components/GoodCard.vue";
import { getGoodList } from "../../api/category.js";
export default {
  data() {
    return {
      goodList: null,
      page: 1,
      flag: false,
      full: false,
      p1: null,
      p2: null,
    };
  },
  watch: {
    $route() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.page = 1;
      this.goodList = null;
      this.getGood();
      this.full = false;
    },
  },
  mounted() {
    this.getGood();
    this.p1 = setTimeout(() => {
      window.addEventListener("scroll", this.scrollEvent);
    }, 1000);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollEvent);
    clearTimeout(this.p1);
    clearTimeout(this.p2);
  },
  methods: {
    scrollEvent() {
      const html = document.documentElement;
      const height = document.body.scrollHeight;
      // console.log(html.scrollTop);
      if (height - html.scrollTop < 1400) {
        if (!this.flag && !this.full) {
          this.getMoreGood();
        }
      }
    },
    async getGood() {
      const { data } = await getGoodList({
        page: this.page,
        categoryId: this.$route.params.id,
        ...this.$route.params,
      });
      if (data.msg === "操作成功") {
        this.goodList = data.result.items;
      } else {
        Message({
          message: "获取商品项失败",
          type: "error",
        });
      }
    },
    async getMoreGood() {
      this.flag = true;
      this.page++;
      const { data } = await getGoodList({
        page: this.page,
        ...this.$route.params,
        categoryId: this.$route.params.id,
      });
      if (data.msg === "操作成功") {
        if (data.result.items.length != 20) {
          this.full = true;
        }
        this.p2 = setTimeout(() => {
          this.goodList = this.goodList.concat(data.result.items);
          this.flag = false;
        }, 1000);
      } else {
        Message({
          message: "获取商品项失败",
          type: "error",
        });
      }
    },
  },
  components: {
    GoodCard,
  },
};
</script>
<style lang="scss" scoped>
.goodlist {
  width: 100%;
  padding: 0 25px;
  box-sizing: border-box;
  background-color: white;
  margin: 20px 0;
  .loading {
    width: 100%;
    height: 40px;
    text-align: center;
    margin-top: 10px;
    > div {
      background-color: #67cf22;
      height: 80%;
      width: 6px;
      margin-right: 5px;
      display: inline-block;
      -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
      animation: stretchdelay 1.2s infinite ease-in-out;
    }
    .rect2 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }

    .rect3 {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }

    .rect4 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }

    .rect5 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }

    @-webkit-keyframes stretchdelay {
      0%,
      40%,
      100% {
        -webkit-transform: scaleY(0.4);
      }
      20% {
        -webkit-transform: scaleY(1);
      }
    }

    @keyframes stretchdelay {
      0%,
      40%,
      100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
      }
      20% {
        transform: scaleY(1);
        -webkit-transform: scaleY(1);
      }
    }
  }
  .goodsshow {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .title {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;

    .checked {
      background-color: #27ba9b;
      color: white;
    }
    > span {
      height: 28px;
      padding: 0 20px;
      line-height: 28px;
      margin-right: 20px;
      color: #999;
      border: 1px solid #f5f5f5;
      flex-shrink: 0;
    }
    .right {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .right_item {
        margin-left: 10px;
        color: #999;
        input {
          vertical-align: middle;
        }
      }
    }
  }
}
</style>