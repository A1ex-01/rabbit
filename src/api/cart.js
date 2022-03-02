import request from "../utils/request";
// 获取购物车总数
function getCartCount() {
  return request({
    method: "get",
    url: "/api/member/cart/count"
  })
}

function getCartList() {
  return request({
    method: "get",
    url: "/api/member/cart"
  })
}
// 修改购物车商品
function goAddCart(data) {
  return request({
    method: "post",
    url: "/api/member/cart",
    data: data
  })
}

function allChooseBtn(data) {
  return request({
    method: "put",
    url: "/api/member/cart/selected",
    data: data
  })
}
//修改商品数量
function modifyGoods(data) {
  return request({
    method: "put",
    url: "/api/member/cart/" + data.id,
    data: data.info
  })
}
//通过skuid获取商品的sku信息
function getTypeBySkuId(id) {
  return request({
    method: "get",
    url: "/api/goods/sku/" + id,
  })
}
//删除购物车商品
function deleteGoodBySkuId(data) {
  return request({
    method: "delete",
    url: "/api/member/cart",
    data:data
  })
}
// 获取收藏页面

function getCollectList(data) {
  return request({
    method: "GET",
    url: "/api/member/collect",
    data:data
  })
}
export {
  getCartCount,
  getCartList,
  goAddCart,
  allChooseBtn,
  modifyGoods,
  getTypeBySkuId,
  deleteGoodBySkuId,
  getCollectList
}