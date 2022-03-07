import request from "../utils/request";

function getCategoryList() {
  return request({
    url: "api/home/category/head",
    method: "get",
  })
}
function getBannerList() {
  return request({
    url: "api/home/banner",
    method: "get"
  })
}
function getFreshThiing() {
  return request({
    url: "api/home/new/simple",
    method: "get"
  })
}
function getHotList() {
  return request({
    url: "api/home/hot",
    method: "get"
  })
}
function getBrandList() {
  return request({
    url: "api/home/brand",
    method: "get",
    limit: "4"
  })
}
function getGoodsList() {
  return request({
    url: "api/home/goods",
    method: "get"
  })
}
function getSpecial() {
  return request({
    url: "api/home/special",
    limit: 3,
    method: "get"
  })
}

// 获取我的足迹
function getMyHistory(){
  return request({
    method:"get",
    url:"/api/member/browseHistory",
    data:{
      page:1,
      pageSize:4
    }
  })
}

export { getCategoryList, getBannerList, getFreshThiing, getHotList, getBrandList, getGoodsList, getSpecial,getMyHistory }