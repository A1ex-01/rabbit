import request from "../utils/request"

function getGoodDetailInfo(data) {
  return request({
    url: "api/goods",
    data:data,
    method: "get",
  })
}
function getGoodrelevant() {
  return request({
    url: "api/goods/relevant",
    data:{
      limit:16
    },
    method: "get",
  })
}
function getHotGood(data) {
  return request({
    url: "api/goods/hot",
    data:data,
    method: "get",
  })
}
export {
  getGoodDetailInfo,
  getGoodrelevant,
  getHotGood
}