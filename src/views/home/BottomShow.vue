<template>
  <div class="link">
    <div class="top">
      <div class="item">
        <p>客户服务</p>
        <div class="question">
          <div>
            <i class="iconfont icon-kefu"></i>
            <span>在线客服</span>
          </div>
          <div>
            <i class="iconfont icon-wenti"></i>
            <span>问题反馈</span>
          </div>
        </div>
      </div>
      <div class="item">
        <p>关注我们</p>
        <div class="question">
          <div>
            <i class="iconfont icon-WeChat"></i>
            <span>公众号</span>
          </div>
          <div>
            <i class="iconfont icon-xinlangweibo"></i>
            <span>微博</span>
          </div>
        </div>
      </div>
      <div class="item">
        <p>下载APP</p>
        <div class="dowload">
          <div class="erweima">
            <img src="../../assets/img/erweima.jpg" alt="" />
          </div>
          <div class="dow_right">
            <span>扫描二维码</span>
            <span>立即下载APP</span>
            <span>下载页面</span>
          </div>
        </div>
      </div>
      <div class="item">
        <p>服务热线</p>
        <div class="server">
          <span>400-0000-000</span>
          <span>周一至周日 8:00-18:00</span>
        </div>
      </div>
    </div>
  <BottomContent></BottomContent>
    <!-- <div class="bottom_">
      <div class="bottom_up">
        <span><i class="iconfont icon-kuaidi"></i>价格亲民</span>
        <span><i class="iconfont icon-dianzan"></i>物流快捷</span>
        <span><i class="iconfont icon-kuaidiyunshu"></i>品质新鲜</span>
      </div>
        <BottomLogin></BottomLogin>
    </div> -->
  </div>
</template>

<script>
// import BottomLogin from "../login/BottomLogin.vue";
import BottomContent from "../../components/BottomContent.vue"
export default {
  components: {
    BottomContent,
  },
};
</script>
<style lang="scss" scoped>
.link {
  // .bottom_ {
  //   height: 350px;
  //   background-color: #333;
  //   padding: 0 140px;
  //   box-sizing: border-box;
  //   display: flex;
  //   flex-direction: column;
  //   >.bottom_up {
  //     width: 100%;
  //     height: 180px;
  //     display: flex;
  //     align-items: center;
  //     border-bottom: 1px solid #434343;
  //     .iconfont{
  //       font-size: 32px;
  //       margin-right: 8px;
  //       border: 3px solid #ccc;
  //       border-radius: 50%;
  //       padding: 10px;
  //     }
  //     > span {
  //       flex: 1;
  //       color: white;
  //       font-size: 28px;
  //       line-height: 1;
  //       text-align: center;
  //     }
  //   }
  // }
  .top {
    width: 100%;
    height: 290px;
    display: flex;
    align-items: center;
    padding: 0 140px;
    box-sizing: border-box;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 190px;
      border-right: 1px solid #ededed;
      &:last-child {
        border: 0;
      }
      > .server {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 39px 0px;
        span {
          font-size: 22px;
          color: #666;
          &:last-child {
            font-size: 16px;
            margin-top: 10px;
            color: #999;
          }
        }
      }
      > .dowload {
        display: flex;
        margin-top: 30px;
        > .erweima {
          width: 90px;
          height: 90px;
          border: 1px solid #ededed;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          > img {
            width: 76px;
            height: 76px;
          }
        }
        > .dow_right {
          width: 105px;
          height: 90px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          span {
            font-size: 16px;
            color: #999;
            &:last-child {
              width: 100%;
              height: 34px;
              background-color: #27ba9b;
              margin-bottom: 5px;
              border-radius: 2px;
              color: white;
              text-align: center;
              line-height: 34px;
            }
          }
        }
      }
      > p {
        font-size: 18px;
        color: #999;
      }
      .question {
        display: flex;
        margin-top: 30px;
        > div {
          width: 90px;
          height: 90px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid #ededed;
          margin-right: 10px;
          .iconfont {
            font-size: 36px;
            color: #666;
          }
          > span {
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>