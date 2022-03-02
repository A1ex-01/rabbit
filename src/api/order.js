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
export {
  getAllOrderList
}