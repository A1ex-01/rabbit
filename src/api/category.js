import request from "../utils/request";
function getCategory(data) {
  return request({
    url: "api/category",
    data: data,
    method: "get"
  })
}
function getFilterCategory(data) {
  return request({
    url: "api/category/sub/filter",
    data: data,
    method: "get"
  })
}
function getGoodList(data) {
  return request({
    url: "api/category/goods/temporary",
    data: {...data,pageSize:20},
    method: "post"
  })
}
export {
  getCategory,
  getFilterCategory,
  getGoodList
}