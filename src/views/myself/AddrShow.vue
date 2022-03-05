<template>
  <div class="addr">
    <div class="head">地址管理</div>
    <div class="title">我的地址</div>
    <div class="myaddr">
      <div class="add" @click="addAddr">添加地址</div>
      <AddrCard
        :useraddr="useraddr[index]"
        v-for="(item, index) in useraddr"
        :key="index"
        @deleteAddrAction = "getaddr"
      ></AddrCard>
    </div>
    <div class="dialog">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
        <div class="main">
          <div class="item" v-for="(item, index) in formData" :key="index">
            <span>{{ item.title }}：</span>
            <el-input v-if="item.title !== '地区'" v-model="item.value">
            </el-input>
            <div class="case" v-else style="width: 300px">
              <el-cascader
                :options="addrList"
                :show-all-levels="false"
                v-model="formData[2].value"
                :props="{ value: 'code', label: 'name', children: 'areaList' }"
              ></el-cascader>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { createOrder } from "../../api/pay";
import { addrList } from "../../api/staticData";
import { addAddr } from "../../api/order";
import { Message } from "element-ui";
import AddrCard from "../../components/AddrCard.vue";
export default {
  data() {
    return {
      useraddr: null,
      dialogVisible: false,
      addrList,
      formData: [
        { value: "", title: "收货人" },
        { value: "", title: "手机号" },
        { value: "", title: "地区" },
        { value: "", title: "地址" },
        { value: "", title: "邮政编码" },
        { value: "", title: "地址标签" },
      ],
    };
  },
  mounted() {
    this.getaddr();
    this.changeIndex("0_4");
  },
  inject:["changeIndex"],
  methods: {
    async getaddr() {
      const { data } = await createOrder();
      this.useraddr = data.result.userAddresses;
    },
    addAddr() {
      this.dialogVisible = true;
    },
    async confirm() {
      const data = this.formData.filter((item) => {
        if (item.title == "地址标签") {
          return true;
        }
        if (item.title == "手机号") {
          if (item.value.length == 11) {
            return true;
          } else {
            Message({
              message: "手机号不合法",
              type: "warning",
            });
            return false;
          }
        } else {
          return item.value;
        }
      });
      if (data.length === 6) {
        const info = {
          receiver: this.formData[0].value,
          contact: this.formData[1].value,
          provinceCode: this.formData[2].value[0],
          cityCode: this.formData[2].value[1],
          countyCode: this.formData[2].value[2],
          address: this.formData[3].value,
          postalCode: this.formData[4].value,
          addressTags: this.formData[5].value,
          isDefault: 0,
        };
        await addAddr(info);
        await this.getaddr();
        this.formData.map(item => {
          item.value = ""
        })
        Message({
          message:"添加地址成功",
          type:"success"
        })
        this.dialogVisible = false;
      } else {
        Message({
          message: "内容不能为空",
          type: "warning",
        });
      }
    },
  },
  components: {
    AddrCard,
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/reset.scss";
.addr {
  background-color: white;
  > .myaddr {
    width: 100%;
    > .add {
      display: block;
      width: 140px;
      margin-top: 16px;
      margin-bottom: 20px;
      margin-left: 16px;
      height: 50px;
      border-radius: 5px;
      font-size: 17px;
      color: white;
      text-align: center;
      line-height: 50px;
      background-color: $base-color;
    }
  }
  .title {
    font-size: 18px;
    color: #333;
    width: 100%;
    height: 60px;
    padding: 0 30px;
    box-sizing: border-box;
    line-height: 60px;
    border-bottom: 1px solid #f5f5f5;
  }
  .head {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    padding-left: 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #f5f5f5;
    color: $base-color;
  }
}
.dialog {
  display: flex;
  flex-direction: column;
  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    > .item {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      > span {
        flex-shrink: 0;
        font-size: 16px;
        width: 80px;
        vertical-align: bottom;
        text-align: right;
      }
      > .el-input {
        width: 300px;
      }
      .el-cascader {
        width: 300px;
      }
    }
  }
}
</style>