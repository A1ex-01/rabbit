<template>
  <div class="main">
    <div class="warp">
      <div class="tab">
        <span :class="{ checked: active == 0 }" @click="setActive(0)"
          >账户登录</span
        >
        <span :class="{ checked: active == 1 }" @click="setActive(1)"
          >扫码登录</span
        >
      </div>
      <div class="msg" v-if="account">
        <i class="iconfont icon-user"></i>

        <span @click="setAccount">使用短信登录</span>
      </div>
      <div class="msg" v-else>
        <i class="iconfont icon-user"></i>
        <span @click="setAccount">使用账号登录</span>
      </div>
      <div class="formshow" v-if="account">
        <el-form>
          <el-form-item>
            <div class="acid">
              <span> <i class="iconfont icon-user"></i> </span>
              <div>
                <el-input placeholder="请输入账号" v-model="input1"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="psw">
              <span> <i class="iconfont icon-lock"></i> </span>
              <div>
                <el-input
                  placeholder="请输入密码"
                  type="password"
                  v-model="input2"
                ></el-input>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="formshow" v-else>
        <el-form>
          <el-form-item>
            <div class="acid">
              <span> <i class="iconfont icon-user"></i> </span>
              <div>
                <el-input placeholder="请输入手机号"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="psw">
              <span> <i class="iconfont icon-anquan"></i> </span>
              <div>
                <el-input placeholder="请输入验证码"></el-input>
              </div>
              <div class="mask">发送验证码</div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="attent">
        <el-checkbox
          label="我已同意《隐私条款》和《服务条款》 "
          checked
        ></el-checkbox>
      </div>
      <div class="send" @click="login">登录</div>
      <div class="bottom">
        <img src="../../assets/img/QQ.png" alt="" />
        <div>
          <span>忘记密码</span>
          <span>免费注册</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      active: 0,
      account: true,
      input1: "xiaotuxian001",
      input2: "",
    };
  },
  methods: {
    ...mapActions("login", ["sendInfoToIndex"]),
    setActive(index) {
      this.active = index;
      if (index == 1) {
        console.log(1);
        this.$notify({
          title: "Warning",
          message: "该功能只在手机上运行",
          type: "warning",
        });
      }
    },
    setAccount() {
      this.account = !this.account;
    },
    login() {
      // this.sendInfoToIndex({
      //   account: this.input1,
      //   password: this.input2,
      // });
      this.$store.dispatch("login/sendInfoToIndex",{
        account: this.input1,
        password: this.input2,
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 448px;
  background: url("../../assets/img/banner.png") no-repeat 50% / cover;
  position: relative;
  .warp {
    position: absolute;
    right: 290px;
    top: 0;
    margin: auto 0;
    width: 380px;
    bottom: 0;
    height: 400px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .bottom {
      padding: 0 40px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      > img {
        width: 50px;
      }
      span {
        font-size: 14px;
        color: #999;
        &:nth-child(1) {
          margin-right: 5px;
        }
      }
    }
    .send {
      width: calc(100% - 80px);
      text-align: center;
      height: 40px;
      margin: 0 auto;
      font-size: 16px;
      background-color: #27ba9b;
      line-height: 40px;
      color: white;
      border-radius: 5px;
      margin-top: 15px;
    }
    .attent {
      padding: 0 40px;
      box-sizing: border-box;
    }
    .formshow {
      padding: 0px 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .acid,
      .psw {
        display: flex;
        width: 100%;
        position: relative;
        .mask {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 14px;
          background-color: #f5f5f5;
          width: 90px;
          text-align: center;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          color: #666;
        }
        span {
          font-size: 18px;
          color: white;
          background-color: #cfcdcd;
          width: 40px;
          flex-shrink: 0;
          margin-right: -3px;
          margin-top: 0.5px;
          z-index: 1;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          text-align: center;
          line-height: 40px;
          height: 40px;
        }
        > div {
          width: 100%;
          .el-input {
            width: 100%;
            margin-bottom: 12px;
          }
        }
      }
    }
    .tab {
      display: flex;
      height: 55px;
      width: 100%;
      padding: 0px 40px;
      box-sizing: border-box;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      span {
        width: 50%;
        height: 18px;
        font-weight: bold;
        font-size: 18px;
        text-align: right;
        &:nth-child(1) {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.checked {
          color: #27ba9b;
        }
      }
    }
    .msg {
      width: 100%;
      margin: 20px 0;
      padding: 0px 40px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      font-size: 14px;
      color: #27ba9b;
      > span {
        line-height: 18px;
        margin-left: 2px;
      }
    }
  }
}
.iconfont{
  font-size: 20px;
}
</style>