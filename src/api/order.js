import request from "../utils/request";
// 获取订单列表
function getAllOrderList(data) {
  return request({
    method:"GET",
    url:"/api/member/order",
    data:{
      ...data,
      pageSize:10
    }
  })
}
//添加收货地址
function addAddr(data){
  return request({
    method:"post",
    url:"/api/member/address",
    data:data
  })
}
// 删除收货地址
function deleteAddr(id){
  return request({
    method:"delete",
    url:"/api/member/address/" + id
  })
}
export {
  getAllOrderList,
  addAddr,
  deleteAddr
}