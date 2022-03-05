import request from "../utils/request";
// 获取收货地址信息
function getPayAddrList() {
  return request({
    method:"GET",
    url:"/api/member/address"
  })
}
//生成订单
function createOrder() {
  return request({
    method:"GET",
    url:"/api/member/order/pre"
  })
}
// 提交订单
function sendOrder(data) {
  return request({
    method:"post",
    url:"/api/member/order",
    data:data
  })
}
function getAlipayUrl(data){
  return request({
    method:"get",
    url:"/api/pay/aliPay",
    data:data
  })
}

function getListById(id){
  return request({
    method:"get",
    url:"/api/member/order/" + id
  })
}
export {
  getPayAddrList,
  createOrder,
  sendOrder,
  getAlipayUrl,
  getListById
}