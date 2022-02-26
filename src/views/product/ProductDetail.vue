<template>
  <div class="prodetail">
    <div class="left">
      <div class="title">
        <span @click="active = 1">商品详情</span>
        <span @click="active = 2">商品评价</span>
        <div class="mask" :style="{ left: active * 150 - 110 + 'px' }"></div>
      </div>
      <div class="goodsDetail" v-if="details">
        <div class="goodinfo">
          <div v-for="(item, index) in details.properties" :key="index">
            <span>{{ item.name }}</span>
            <span>{{ item.value }}</span>
          </div>
        </div>
        <div class="imgshow">
          <img
            :src="item"
            alt=""
            v-for="(item, index) in details.pictures"
            :key="index"
          />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="hot">
        <span>24小时热销榜</span>
      </div>
      <div class="hotitem">
        <div v-for="item in hotList" :key="item.id">
          <img :src="item.picture" alt="" />
          <p>{{ item.name }}</p>
          <p>{{ item.desc }}</p>
          <p>￥{{ item.price }}</p>
        </div>
      </div>
            <div class="hot">
        <span>周热销榜</span>
      </div>
      <div class="hotitem">
        <div v-for="item in hotListByWeek" :key="item.id">
          <img :src="item.picture" alt="" />
          <p>{{ item.name }}</p>
          <p>{{ item.desc }}</p>
          <p>￥{{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { getHotGood } from "../../api/good"
export default {
  props: ["details"],
  data() {
    return {
      active: 1,
      hotList:null,
      hotListByWeek:null
    };
  },
  mounted(){
    this.getHot();
    this.getHotWeek();
  },
  methods:{
    async getHot(){
      const { data } = await getHotGood({type:1});
      if(data.msg === "操作成功") {
        this.hotList= data.result;
      }else{
        Message({
          message:"获取热榜失败"
        })
      }
    },
        async getHotWeek(){
      const { data } = await getHotGood({type:2});
      if(data.msg === "操作成功") {
        this.hotListByWeek= data.result;
      }else{
        Message({
          message:"获取热榜失败"
        })
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.prodetail {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  .left {
    width: 940px;
    background-color: white;
    > .title {
      height: 70px;
      width: 100%;
      display: flex;
      border-bottom: 1px solid #f5f5f5;
      position: relative;
      > .mask {
        position: absolute;
        bottom: 0;
        width: 72px;
        height: 4px;
        border-radius: 2px;
        background-color: #27ba9b;
        transition: left 0.5s;
      }
      > span {
        font-size: 18px;
        padding: 0 40px;
        line-height: 70px;
        color: #333;
        height: 100%;
        &:nth-child(1) {
          border-right: 1px solid #f5f5f5;
        }
      }
    }
  }
  .right {
    width: 280px;
    margin-left: 20px;
    .hot {
      height: 70px;
      padding: 25px;
      box-sizing: border-box;
      background-color: #e26237;
      color: #fff;
      font-size: 18px;
    }
    .hotitem {
      width: 100%;
      div {
        width: 100%;
        height: 300px;
        padding: 20px 30px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        transition: transform 0.5s;
        margin: 20px 0;
        background-color: white;
        img {
          width: 160px;
          height: 160px;
        }
        p {
          font-size: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 100%;
          text-align: center;
          &:nth-child(3) {
            color: #999;
            margin: 10px 0;
          }
          &:nth-child(4) {
            color: #cf4444;
            font-size: 20px;
            width: 100px;
            text-align: center;
          }
        }
      }
    }
  }
}
.goodsDetail {
  width: 100%;
  .imgshow {
    width: 100%;
    img {
      width: 100%;
      display: block;
    }
  }
  .goodinfo {
    width: 100%;
    display: flex;
    padding-left: 40px;
    padding-top: 50px;
    box-sizing: border-box;
    flex-wrap: wrap;
    > div {
      width: 50%;
      display: flex;
      line-height: 30px;
      span {
        font-size: 14px;
        flex-shrink: 0;
        color: #999;
        &:last-child {
          color: #666;
          margin-left: 20px;
          width: 360px;
        }
      }
    }
  }
}
</style>