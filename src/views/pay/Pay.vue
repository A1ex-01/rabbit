<template>
  <div class="pay">
    <div class="curmb">
      <Curmb></Curmb>
    </div>
    <div class="orderinfo">
      <span><i class="iconfont icon-queren"></i></span>
      <span>订单提交成功！请尽快完成支付。</span>
      <span>应付金额：<b style="font-size:20px;color:#cf4444">￥{{totalMoney}}</b></span>
    </div>
    <div class="paytype">
      <span class="title">请选择支付方式付款</span>
      <div class="band">
        <span>支付平台</span>
        <div class="style">
          <a href="javascript:;"></a>
          <a :href="url" target="_blank" @click="pay"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { getListById } from "../../api/pay"
import Curmb from "../../components/Curmb.vue"
export default {
  data(){
    return {
      totalMoney:null,
      url:null
    }
  },
  mounted(){
    this.getinfo();
  },
  methods:{
    async getinfo(){
      const { data } = await getListById(this.$route.params.id);
      this.totalMoney = data.result.totalMoney;
      this.url = `https://apipc-xiaotuxian-front.itheima.net/pay/aliPay?orderId=${this.$route.params.id}&redirect=http%3A%2F%2Ferabbit.itheima.net%2F%23%2Fpay%2Fcallback`
    },
    pay(){
      Message({
        message:"请完成对应支付流程",
        type:"info"
      })
      this.$router.push({path:"/cart"})
    }
  },
  components:{
    Curmb
  }
}
</script>
<style lang="scss" scoped>
.pay{
  // width: 100%;
  padding: 20px 140px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .paytype{
    margin: 20px 0;
    display: flex;
    flex-direction: column;
      background-color: white;
      padding-left: 30px;
      box-sizing: border-box;
    >.title{
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #f5f5f5;
    }
    .band{
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 20px 0;
      >span{
        margin-bottom: 20px;
      }
      >.style{
        display: flex;
        >a{
          width: 150px;
          height: 50px;
          margin-right: 16px;
          border: 1px solid #e4e4e4;
          &:hover{
            border-color: #1dc779;
          }
          &:nth-child(1){
            background: url("../../assets/img/weixin.jpg")  no-repeat 50%/contain;
          }
          &:nth-child(2){
            background: url("../../assets/img/alipay.png") no-repeat 50%/contain;
          }
        }
      }
    }
  }
  .orderinfo{
    flex: 1;
  height: 240px;
  padding: 80px 80px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  align-items: center;
  >span{
    font-size: 20px;
    >i{
      font-size: 70px;
      color: #1dc779;
    }
    &:nth-child(2){
      flex: 1;
      margin-left: 16px;
    }
    &:last-child{
      color: #999;
      font-size: 16px;
    }
  }
}
}
</style>