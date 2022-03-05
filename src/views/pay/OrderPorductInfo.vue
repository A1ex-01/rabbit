<template>
  <div class="info">
    <table>
      <thead>
        <tr height="60">
          <th width="520">商品信息</th>
          <th width="170">单价</th>
          <th width="170">数量</th>
          <th width="170">小计</th>
          <th width="170">实付</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in goods" :key="item.id">
          <td class="gooditeminfo">
            <div>
              <img :src="item.picture" alt="">
              <div class="name">
                <span>{{item.name}}</span>
                <span style="text-align:left">{{item.attrsText}}</span>
              </div>
            </div>
          </td>
          <td><span>￥{{ item.price }}</span></td>
          <td><span>{{item.count}}</span></td>
          <td><span>￥{{ item.totalPrice }}</span></td>
          <td><span>￥{{ item.totalPayPrice }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["goods"],
};
</script>
<style lang="scss" scoped>
.info {
  padding: 10px 0;
  box-sizing: border-box;
  > table {
    font-size: 14px;

    > thead {
      background-color: #f5f5f5;
      > tr {
        > th {
          line-height: 60px;
        }
      }
    }
  }
}
.gooditeminfo{
  >div{
    width: 520px;
    display: flex;
    >img{
      width: 70px;
      height: 70px;
      margin-right: 12px;
    }
    >.name{
      line-height: 24px;
      display: flex;
      flex-direction: column;
      >span{
       font-size: 14px;
       &:last-child{
         color: #999;
       }
      }
    }
  }
}
tbody{
  >tr{
    >td{
      text-align: center;
      padding: 20px;
      vertical-align: middle;
      box-sizing: border-box;
    }
}
}
</style>